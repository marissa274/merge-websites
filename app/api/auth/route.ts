import { env } from 'cloudflare:workers';
import { SESSION_COOKIE, cookie, createSession, endSession, readCookie, findIdentity, createAccount, hashPassword, verifyPassword, passwordProblem, normalEmail, validEmail, safeReturn, tooManyAttempts, clearAttempts, issueToken, consumeToken, sendMail, mailEnabled, escapeHtml } from '../../auth';
const json = (v: unknown, status = 200, headers: Record<string, string> = {}) => Response.json(v, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
const DB = () => (env as unknown as { DB: D1Database }).DB;
// Spent on unknown emails too, so response time does not reveal which accounts exist.
const DUMMY_HASH = 'pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
async function signedIn(request: Request, userId: string, body: Record<string, unknown>) {
    const session = await createSession(userId);
    return json({ ok: true, ...body }, 200, { 'Set-Cookie': cookie(SESSION_COOKIE, session.token, request, session.maxAge) });
}
async function verificationMail(request: Request, userId: string, email: string) {
    if (!mailEnabled()) return;
    const link = `${new URL(request.url).origin}/verify-email?token=${await issueToken(userId, 'verify', 60 * 24)}`;
    await sendMail(email, 'Confirm your MK lab email', `Confirm your email for MK lab: ${link}\n\nThis link expires in 24 hours.`, `<p>Confirm your email for MK lab.</p><p><a href="${escapeHtml(link)}">Confirm my email</a></p><p>This link expires in 24 hours.</p>`);
}
export async function POST(request: Request) {
    // Same-origin requests only.
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'Request blocked.' }, 403);
    let b: Record<string, unknown>;
    try { b = await request.json() as Record<string, unknown>; } catch { return json({ error: 'Invalid request.' }, 400); }
    const ip = request.headers.get('cf-connecting-ip') || 'local';
    const email = normalEmail(b.email), password = typeof b.password === 'string' ? b.password : '', returnTo = safeReturn(b.returnTo);
    try {
        if (b.action === 'signup') {
            const name = typeof b.name === 'string' ? b.name.trim().slice(0, 100) : '';
            if (!name) return json({ error: 'Add your name.', field: 'name' }, 400);
            if (!validEmail(email)) return json({ error: 'Enter a valid email address.', field: 'email' }, 400);
            const problem = passwordProblem(password, email); if (problem) return json({ error: problem, field: 'password' }, 400);
            if (await tooManyAttempts(`signup:${ip}`, 5, 60)) return json({ error: 'Too many new accounts from this connection. Try again in an hour.' }, 429);
            const existing = await DB().prepare("SELECT i.provider FROM auth_identities i JOIN users u ON u.id=i.user_id WHERE lower(u.email)=? AND i.provider IN ('password','google') LIMIT 1").bind(email).first<{ provider: string }>();
            if (existing) return json({ error: existing.provider === 'google' ? 'An account already uses this email. Sign in with Google.' : 'An account already uses this email. Sign in, or reset your password.', field: 'email' }, 409);
            const userId = await createAccount({ email, name, provider: 'password', subject: email, passwordHash: await hashPassword(password), verified: false });
            await verificationMail(request, userId, email);
            return signedIn(request, userId, { redirect: returnTo });
        }
        if (b.action === 'login') {
            if (!validEmail(email) || !password) return json({ error: 'Enter your email and password.' }, 400);
            if (await tooManyAttempts(`login-ip:${ip}`, 30, 15) || await tooManyAttempts(`login:${email}`, 8, 15)) return json({ error: 'Too many attempts. Wait 15 minutes, or reset your password.' }, 429);
            const identity = await findIdentity('password', email);
            const valid = await verifyPassword(password, identity?.password_hash || DUMMY_HASH);
            if (!identity || !valid) return json({ error: 'Email or password is incorrect.' }, 401);
            await clearAttempts(`login:${email}`);
            return signedIn(request, identity.user_id, { redirect: returnTo });
        }
        if (b.action === 'forgot') {
            if (!mailEnabled()) return json({ error: 'Password reset by email is not available yet. Contact the studio and we will help you sign in.' }, 503);
            if (!validEmail(email)) return json({ error: 'Enter a valid email address.', field: 'email' }, 400);
            const sent = { ok: true, message: 'If an account uses this email, a reset link is on its way. It expires in 1 hour.' };
            if (await tooManyAttempts(`reset:${email}`, 3, 60)) return json(sent);
            const identity = await DB().prepare("SELECT u.id FROM users u JOIN auth_identities i ON i.user_id=u.id WHERE lower(u.email)=? AND i.provider='password' LIMIT 1").bind(email).first<{ id: string }>();
            if (identity) {
                const link = `${new URL(request.url).origin}/reset-password?token=${await issueToken(identity.id, 'reset', 60)}`;
                await sendMail(email, 'Reset your MK lab password', `Choose a new MK lab password: ${link}\n\nThis link expires in 1 hour. If you did not ask for it, ignore this email.`, `<p>Choose a new MK lab password.</p><p><a href="${escapeHtml(link)}">Reset my password</a></p><p>This link expires in 1 hour. If you did not ask for it, ignore this email.</p>`);
            }
            return json(sent);
        }
        if (b.action === 'reset') {
            const userId = await consumeToken(typeof b.token === 'string' ? b.token : '', 'reset');
            if (!userId) return json({ error: 'This reset link is invalid or has expired. Ask for a new one.' }, 400);
            const user = await DB().prepare('SELECT email FROM users WHERE id=?').bind(userId).first<{ email: string }>();
            const problem = passwordProblem(password, user?.email || ''); if (problem) return json({ error: problem, field: 'password' }, 400);
            // The emailed link proves the address; every other session is signed out.
            await DB().batch([
                DB().prepare("UPDATE auth_identities SET password_hash=?, email_verified=1 WHERE user_id=? AND provider='password'").bind(await hashPassword(password), userId),
                DB().prepare('DELETE FROM auth_sessions WHERE user_id=?').bind(userId),
            ]);
            return signedIn(request, userId, { redirect: '/account' });
        }
        if (b.action === 'signout') {
            await endSession(readCookie(request.headers.get('cookie'), SESSION_COOKIE));
            return json({ ok: true, redirect: '/' }, 200, { 'Set-Cookie': cookie(SESSION_COOKIE, '', request, 0) });
        }
        return json({ error: 'Unknown action.' }, 400);
    }
    catch { return json({ error: 'Sign-in is unavailable right now. Please try again.' }, 500); }
}
