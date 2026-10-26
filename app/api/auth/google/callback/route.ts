import { env } from 'cloudflare:workers';
import { OAUTH_COOKIE, SESSION_COOKIE, authConfig, googleEnabled, cookie, readCookie, createSession, findIdentity, createAccount, linkIdentity, safeReturn } from '../../../../auth';
const DB = () => (env as unknown as { DB: D1Database }).DB;
type GoogleClaims = { iss?: string; aud?: string; sub?: string; email?: string; email_verified?: boolean | string; name?: string; exp?: number };
const back = (origin: string, error: string, request: Request) => new Response(null, { status: 302, headers: { Location: `${origin}/login?error=${error}`, 'Set-Cookie': cookie(OAUTH_COOKIE, '', request, 0) } });
export async function GET(request: Request) {
    const url = new URL(request.url), origin = url.origin;
    if (!googleEnabled()) return back(origin, 'google-unavailable', request);
    let saved: { state?: string; verifier?: string; returnTo?: string } = {};
    try { saved = JSON.parse(readCookie(request.headers.get('cookie'), OAUTH_COOKIE) || '{}'); } catch { /* treated as missing */ }
    const code = url.searchParams.get('code');
    // The state must match the one this browser started with; otherwise the response is not ours.
    if (!code || !saved.state || !saved.verifier || url.searchParams.get('state') !== saved.state) return back(origin, 'google-failed', request);
    try {
        const exchange = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: authConfig('GOOGLE_CLIENT_ID'), client_secret: authConfig('GOOGLE_CLIENT_SECRET'), redirect_uri: `${origin}/api/auth/google/callback`, grant_type: 'authorization_code', code_verifier: saved.verifier }) });
        const tokens = await exchange.json() as { id_token?: string };
        if (!exchange.ok || !tokens.id_token) return back(origin, 'google-failed', request);
        // The ID token comes straight from Google's token endpoint over TLS; its claims are still checked.
        const claims = JSON.parse(atob(tokens.id_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as GoogleClaims;
        const verified = claims.email_verified === true || claims.email_verified === 'true';
        if (!['accounts.google.com', 'https://accounts.google.com'].includes(claims.iss || '') || claims.aud !== authConfig('GOOGLE_CLIENT_ID') || !claims.sub || !claims.email || !verified || !claims.exp || claims.exp * 1000 < Date.now()) return back(origin, 'google-failed', request);
        const email = claims.email.toLowerCase();
        let userId = (await findIdentity('google', claims.sub))?.user_id;
        if (!userId) {
            // Same person, same verified email: join the existing email + password account.
            const owner = await DB().prepare("SELECT i.user_id, i.email_verified FROM auth_identities i JOIN users u ON u.id=i.user_id WHERE lower(u.email)=? AND i.provider='password' LIMIT 1").bind(email).first<{ user_id: string; email_verified: number }>();
            if (owner) {
                await linkIdentity(owner.user_id, 'google', claims.sub);
                // An unverified password set by someone else must not keep access to this person's account.
                if (!owner.email_verified) await DB().batch([DB().prepare("UPDATE auth_identities SET password_hash=NULL WHERE user_id=? AND provider='password' AND email_verified=0").bind(owner.user_id), DB().prepare('DELETE FROM auth_sessions WHERE user_id=?').bind(owner.user_id)]);
                userId = owner.user_id;
            }
            else userId = await createAccount({ email, name: claims.name || email, provider: 'google', subject: claims.sub, verified: true });
        }
        const session = await createSession(userId);
        const headers = new Headers({ Location: `${origin}${safeReturn(saved.returnTo)}`, 'Cache-Control': 'no-store' });
        headers.append('Set-Cookie', cookie(SESSION_COOKIE, session.token, request, session.maxAge));
        headers.append('Set-Cookie', cookie(OAUTH_COOKIE, '', request, 0));
        return new Response(null, { status: 302, headers });
    }
    catch { return back(origin, 'google-failed', request); }
}
