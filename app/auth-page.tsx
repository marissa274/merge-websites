import { ArrowRight, Check } from 'lucide-react';
import { AuthForm, SignOutButton } from './auth-form';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
export type AuthMode = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-email';
type Tile = { kind: 'photo'; src: string; grow: number } | { kind: 'brand'; name: string; tone: string; grow: number } | { kind: 'fact'; figure: string; text: string; tone: string; grow: number };
// The mosaic is decorative and uses only MK lab's own material: studio photography, concept identities and two true facts.
function columns(concepts: number): Tile[][] {
    return [
        [{ kind: 'photo', src: '/still-life.jpg', grow: 3 }, { kind: 'brand', name: 'OFFGRID®', tone: 'violet', grow: 2 }, { kind: 'photo', src: '/architecture.jpg', grow: 3 }],
        [{ kind: 'fact', figure: String(concepts), text: 'original website concepts, ready to make your own.', tone: 'coral', grow: 3 }, { kind: 'photo', src: '/beauty.jpg', grow: 3 }, { kind: 'brand', name: 'casa', tone: 'yellow', grow: 2 }],
        [{ kind: 'brand', name: 'PULSE', tone: 'lime', grow: 2 }, { kind: 'photo', src: '/fashion.jpg', grow: 3 }, { kind: 'fact', figure: '1', text: 'account for your purchases, downloads and conversations with the studio.', tone: 'turquoise', grow: 3 }],
        [{ kind: 'photo', src: '/food.jpg', grow: 3 }, { kind: 'brand', name: 'aura', tone: 'pink', grow: 2 }, { kind: 'photo', src: '/still-life.jpg', grow: 3 }],
    ];
}
const COPY: Record<AuthMode, { title: [string, string]; lead: string }> = {
    login: { title: ['Sign in to', 'MK lab'], lead: 'Welcome back. Enter your details to reach your purchases, downloads and projects.' },
    signup: { title: ['Create your', 'MK lab account'], lead: 'One account for your purchases, downloads and conversations with the studio.' },
    'forgot-password': { title: ['Reset your', 'password'], lead: 'Enter the email of your account. We will send you a link to choose a new password.' },
    'reset-password': { title: ['Choose a new', 'password'], lead: 'Your new password signs you out everywhere else.' },
    'verify-email': { title: ['Confirm your', 'email'], lead: '' },
};
const ERRORS: Record<string, string> = { 'google-unavailable': 'Google sign-in is not available yet. Use your email and password instead.', 'google-failed': 'Google sign-in did not complete. Try again, or use your email and password.' };
type Props = { mode: AuthMode; returnTo: string; concepts: number; user: { email: string; displayName: string; provider?: string; verified?: boolean } | null; google: boolean; mail: boolean; error?: string; token?: string; verified?: boolean };
export function AuthPage({ mode, returnTo, concepts, user, google, mail, error, token, verified }: Props) {
    const copy = COPY[mode], back = encodeURIComponent(returnTo);
    const other = mode === 'signup' ? { prompt: 'Already have an account?', label: 'Sign in', href: `/login?return_to=${back}` } : { prompt: 'Don’t have an account?', label: 'Sign up', href: `/signup?return_to=${back}` };
    const alternatives = <><div className="auth-or" role="separator"><span>OR</span></div>
        {google && <a className="auth-provider" href={`/api/auth/google?return_to=${back}`}><GoogleMark/>Sign in with Google</a>}
        <a className="auth-provider auth-provider-quiet" href={`/signin-with-chatgpt?return_to=${back}`} target="_top">Continue with ChatGPT</a></>;
    let body;
    if (mode === 'verify-email') body = <><p className="auth-lead">{verified ? 'Thank you, your email is confirmed.' : 'This confirmation link is invalid or has expired. Sign in to receive a new one.'}</p><a className="auth-submit" href={verified ? '/account' : '/login'}>{verified ? 'Go to my account' : 'Sign in'}<ArrowRight {...ip}/></a></>;
    else if (user && mode !== 'reset-password') body = <div className="auth-signed"><p><Check {...ip}/>Signed in as <b>{user.email}</b></p><a className="auth-submit" href="/account">Go to my account<ArrowRight {...ip}/></a>{user.provider === 'chatgpt' ? <a className="auth-secondary" href="/signout-with-chatgpt?return_to=%2F" target="_top">Sign out</a> : <SignOutButton/>}</div>;
    else if (mode === 'forgot-password' && !mail) body = <><p className="auth-lead">Password reset by email is not available yet. Contact the studio and we will help you sign in.</p><a className="auth-submit" href="/contact">Contact the studio<ArrowRight {...ip}/></a><a className="auth-secondary" href={`/login?return_to=${back}`}>Back to sign in</a></>;
    else if (mode === 'reset-password' && !token) body = <><p className="auth-lead">This reset link is incomplete. Ask for a new one.</p><a className="auth-submit" href="/forgot-password">Ask for a new link<ArrowRight {...ip}/></a></>;
    else body = <><AuthForm mode={mode === 'forgot-password' ? 'forgot' : mode === 'reset-password' ? 'reset' : mode} returnTo={returnTo} token={token}/>{(mode === 'login' || mode === 'signup') && alternatives}{mode === 'forgot-password' && <a className="auth-secondary" href={`/login?return_to=${back}`}>Back to sign in</a>}</>;
    return <main id="main" className="auth">
        <div className="auth-card">
            <div className="auth-mosaic" aria-hidden="true">{columns(concepts).map((column, i) => <div className={`auth-col auth-col-${i + 1}`} key={i}>{column.map((tile, j) => <div key={j} className={`auth-tile auth-tile-${tile.kind}${'tone' in tile ? ` auth-tone-${tile.tone}` : ''}`} style={{ flexGrow: tile.grow }}>
                {tile.kind === 'photo' ? <img src={tile.src} alt="" width={800} height={1000} decoding="async"/> : tile.kind === 'brand' ? <span translate="no">{tile.name}</span> : <><strong>{tile.figure}</strong><p>{tile.text}</p></>}
            </div>)}</div>)}</div>
            <section className="auth-panel" aria-labelledby="auth-title">
                <div className="auth-top"><a className="brand mk-wordmark auth-home" href="/" aria-label="MK lab home" translate="no">MK lab</a>{!user && <p className="auth-switch">{other.prompt}<a href={other.href}>{other.label}</a></p>}</div>
                <div className="auth-body">
                    <h1 id="auth-title">{copy.title[0]} <span className="auth-brand">{copy.title[1]}</span></h1>
                    {copy.lead && !(user && mode !== 'reset-password') && <p className="auth-lead">{copy.lead}</p>}
                    {error && ERRORS[error] && <p className="auth-error auth-error-page" role="alert">{ERRORS[error]}</p>}
                    {body}
                    {(mode === 'login' || mode === 'signup') && !user && <p className="auth-legal">By continuing you agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy policy</a>.</p>}
                </div>
            </section>
        </div>
    </main>;
}
// Google's multicolor "G", as Google's sign-in branding guidelines require for this button.
function GoogleMark() {
    return <svg className="auth-google" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>;
}
