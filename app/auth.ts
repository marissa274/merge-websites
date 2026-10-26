// Server-only account sign-in: email + password and Google, alongside the host's ChatGPT sign-in.
// Passwords use PBKDF2-SHA256; sessions and email-link tokens are random and stored only as SHA-256 hashes.
import { env } from 'cloudflare:workers';
import type { ChatGPTUser } from './chatgpt-auth';
export type AccountUser = ChatGPTUser & { provider: 'chatgpt' | 'password' | 'google'; verified: boolean };
export const SESSION_COOKIE = 'mk_session';
export const OAUTH_COOKIE = 'mk_oauth';
const SESSION_DAYS = 30, ITERATIONS = 100_000;
const DB = () => { const db = (env as unknown as { DB?: D1Database }).DB; if (!db) throw new Error('Database is unavailable. Please try again later.'); return db; };
export const authConfig = (key: 'GOOGLE_CLIENT_ID' | 'GOOGLE_CLIENT_SECRET' | 'RESEND_API_KEY' | 'MAIL_FROM') => (env as unknown as Record<string, string | undefined>)[key] || '';
export const googleEnabled = () => !!authConfig('GOOGLE_CLIENT_ID') && !!authConfig('GOOGLE_CLIENT_SECRET');
export const mailEnabled = () => !!authConfig('RESEND_API_KEY') && !!authConfig('MAIL_FROM');

const bytes = (n: number) => crypto.getRandomValues(new Uint8Array(n));
export const b64url = (data: Uint8Array | ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(data))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (value: string) => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
export const randomToken = () => b64url(bytes(32));
export async function sha256(value: string) { return b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))); }
function sameBytes(a: Uint8Array, b: Uint8Array) { if (a.length !== b.length) return false; let diff = 0; for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]; return diff === 0; }
async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number) {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256));
}
export async function hashPassword(password: string) { const salt = bytes(16); return `pbkdf2$${ITERATIONS}$${b64url(salt)}$${b64url(await pbkdf2(password, salt, ITERATIONS))}`; }
export async function verifyPassword(password: string, stored: string | null) {
    const [scheme, rounds, salt, hash] = (stored || '').split('$');
    if (scheme !== 'pbkdf2' || !salt || !hash) return false;
    return sameBytes(await pbkdf2(password, fromB64url(salt), Number(rounds)), fromB64url(hash));
}
export function passwordProblem(password: string, email: string) {
    if (password.length < 10) return 'Use at least 10 characters for your password.';
    if (password.length > 200) return 'Use at most 200 characters for your password.';
    if (password.trim().toLowerCase() === email.trim().toLowerCase()) return 'Choose a password that is different from your email.';
    return '';
}
export const normalEmail = (value: unknown) => typeof value === 'string' ? value.trim().toLowerCase().slice(0, 200) : '';
export const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// Only same-site paths are accepted as destinations after signing in.
export const safeReturn = (value: unknown, fallback = '/account') => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') ? value.slice(0, 500) : fallback;

export function readCookie(header: string | null, name: string) {
    for (const part of (header || '').split(';')) { const [key, ...rest] = part.trim().split('='); if (key === name) return decodeURIComponent(rest.join('=')); }
    return '';
}
export function cookie(name: string, value: string, request: Request, maxAge: number) {
    const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
    return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

// Sessions
export async function createSession(userId: string) {
    const token = randomToken(), now = Date.now();
    await DB().prepare('INSERT INTO auth_sessions (id,user_id,expires_at,created_at) VALUES (?,?,?,?)').bind(await sha256(token), userId, now + SESSION_DAYS * 86_400_000, now).run();
    return { token, maxAge: SESSION_DAYS * 86_400 };
}
export async function endSession(token: string) { if (token) await DB().prepare('DELETE FROM auth_sessions WHERE id=?').bind(await sha256(token)).run(); }
export async function sessionUser(cookieHeader: string | null): Promise<AccountUser | null> {
    const token = readCookie(cookieHeader, SESSION_COOKIE);
    if (!token || token.length > 100) return null;
    const row = await DB().prepare(`SELECT u.id,u.email,u.name,s.expires_at,
        (SELECT provider FROM auth_identities WHERE user_id=u.id ORDER BY email_verified DESC LIMIT 1) AS provider,
        (SELECT MAX(email_verified) FROM auth_identities WHERE user_id=u.id) AS verified
        FROM auth_sessions s JOIN users u ON u.id=s.user_id WHERE s.id=?`).bind(await sha256(token)).first<{ id: string; email: string; name: string; expires_at: number; provider: string | null; verified: number | null }>();
    if (!row || row.expires_at < Date.now()) return null;
    return { userId: row.id, email: row.email, displayName: row.name || row.email, fullName: row.name || null, provider: row.provider === 'google' ? 'google' : 'password', verified: row.verified === 1 };
}

// Accounts
export async function findIdentity(provider: 'password' | 'google', subject: string) {
    return DB().prepare('SELECT i.id,i.user_id,i.password_hash,i.email_verified,u.email,u.name FROM auth_identities i JOIN users u ON u.id=i.user_id WHERE i.provider=? AND i.subject=?').bind(provider, subject).first<{ id: string; user_id: string; password_hash: string | null; email_verified: number; email: string; name: string }>();
}
export async function createAccount(input: { email: string; name: string; provider: 'password' | 'google'; subject: string; passwordHash?: string; verified: boolean }) {
    const userId = `u_${crypto.randomUUID()}`, now = Date.now();
    await DB().batch([
        DB().prepare('INSERT INTO users (id,email,name,created_at) VALUES (?,?,?,?)').bind(userId, input.email, input.name.slice(0, 100) || input.email, now),
        DB().prepare('INSERT INTO auth_identities (id,user_id,provider,subject,password_hash,email_verified,created_at) VALUES (?,?,?,?,?,?,?)').bind(crypto.randomUUID(), userId, input.provider, input.subject, input.passwordHash || null, input.verified ? 1 : 0, now),
    ]);
    return userId;
}
export async function linkIdentity(userId: string, provider: 'google', subject: string) {
    await DB().prepare('INSERT INTO auth_identities (id,user_id,provider,subject,email_verified,created_at) VALUES (?,?,?,?,1,?)').bind(crypto.randomUUID(), userId, provider, subject, Date.now()).run();
}

// Single-use email-link tokens (password reset, email verification)
export async function issueToken(userId: string, purpose: 'reset' | 'verify', minutes: number) {
    const token = randomToken();
    await DB().prepare('INSERT INTO auth_tokens (id,user_id,purpose,expires_at) VALUES (?,?,?,?)').bind(await sha256(token), userId, purpose, Date.now() + minutes * 60_000).run();
    return token;
}
export async function consumeToken(token: string, purpose: 'reset' | 'verify') {
    if (!token || token.length > 100) return null;
    const id = await sha256(token);
    const row = await DB().prepare('SELECT user_id,expires_at,used_at FROM auth_tokens WHERE id=? AND purpose=?').bind(id, purpose).first<{ user_id: string; expires_at: number; used_at: number | null }>();
    if (!row || row.used_at || row.expires_at < Date.now()) return null;
    const claimed = await DB().prepare('UPDATE auth_tokens SET used_at=? WHERE id=? AND used_at IS NULL').bind(Date.now(), id).run();
    return claimed.meta?.changes === 0 ? null : row.user_id;
}

// Attempt limiting: counts recent attempts for a key and records this one.
export async function tooManyAttempts(key: string, limit: number, minutes: number) {
    const since = Date.now() - minutes * 60_000;
    const recent = await DB().prepare('SELECT COUNT(*) AS n FROM auth_attempts WHERE key=? AND created_at>?').bind(key, since).first<{ n: number }>();
    if ((recent?.n || 0) >= limit) return true;
    await DB().prepare('INSERT INTO auth_attempts (id,key,created_at) VALUES (?,?,?)').bind(crypto.randomUUID(), key, Date.now()).run();
    return false;
}
export async function clearAttempts(key: string) { await DB().prepare('DELETE FROM auth_attempts WHERE key=?').bind(key).run(); }

// Transactional email through Resend, when the studio has configured it.
export async function sendMail(to: string, subject: string, text: string, html: string) {
    if (!mailEnabled()) return false;
    const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${authConfig('RESEND_API_KEY')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: authConfig('MAIL_FROM'), to: [to], subject, text, html }) });
    return r.ok;
}
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
