import { OAUTH_COOKIE, authConfig, googleEnabled, cookie, randomToken, sha256, safeReturn } from '../../../auth';
// Starts Google sign-in: a random state and PKCE verifier are kept in a short-lived HttpOnly cookie and checked on return.
export async function GET(request: Request) {
    const url = new URL(request.url), returnTo = safeReturn(url.searchParams.get('return_to'));
    if (!googleEnabled()) return Response.redirect(`${url.origin}/login?error=google-unavailable&return_to=${encodeURIComponent(returnTo)}`, 302);
    const state = randomToken(), verifier = randomToken();
    const google = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    google.search = new URLSearchParams({ client_id: authConfig('GOOGLE_CLIENT_ID'), redirect_uri: `${url.origin}/api/auth/google/callback`, response_type: 'code', scope: 'openid email profile', state, code_challenge: await sha256(verifier), code_challenge_method: 'S256', prompt: 'select_account' }).toString();
    return new Response(null, { status: 302, headers: { Location: google.toString(), 'Set-Cookie': cookie(OAUTH_COOKIE, JSON.stringify({ state, verifier, returnTo }), request, 600), 'Cache-Control': 'no-store' } });
}
