'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
export type FormMode = 'login' | 'signup' | 'forgot' | 'reset';
const SUBMIT: Record<FormMode, [string, string]> = { login: ['Login', 'Signing in…'], signup: ['Create account', 'Creating your account…'], forgot: ['Send reset link', 'Sending…'], reset: ['Save new password', 'Saving…'] };
function Password({ id, label, autoComplete, invalid, hint }: { id: string; label: string; autoComplete: string; invalid: boolean; hint?: string }) {
    const [shown, setShown] = useState(false);
    return <div className="auth-field"><label className="visually-hidden" htmlFor={id}>{label}</label><div className="auth-password"><input id={id} name={id} type={shown ? 'text' : 'password'} placeholder={label} autoComplete={autoComplete} required maxLength={200} aria-invalid={invalid || undefined} aria-describedby={hint ? `${id}-hint` : undefined}/><button type="button" className="auth-reveal" aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown} onClick={() => setShown(!shown)}>{shown ? <EyeOff {...ip}/> : <Eye {...ip}/>}</button></div>{hint && <small id={`${id}-hint`}>{hint}</small>}</div>;
}
export function AuthForm({ mode, returnTo, token }: { mode: FormMode; returnTo: string; token?: string }) {
    const [error, setError] = useState(''), [field, setField] = useState(''), [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
    const errorRef = useRef<HTMLParagraphElement>(null);
    // Move focus to the message once it is on screen, so it is announced and the next fix is one tab away.
    useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const f = new FormData(event.currentTarget), value = (key: string) => String(f.get(key) || '');
        setError(''); setField(''); setMessage('');
        if (mode === 'reset' && value('password') !== value('confirm')) { setError('The two passwords do not match.'); setField('confirm'); return; }
        setBusy(true);
        try {
            const r = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: mode, name: value('name'), email: value('email'), password: value('password'), token, returnTo }) });
            const d = await r.json() as { error?: string; field?: string; message?: string; redirect?: string };
            if (!r.ok) { setError(d.error || 'Something went wrong. Try again.'); setField(d.field || ''); return; }
            if (d.redirect) { location.assign(d.redirect); return; }
            setMessage(d.message || 'Done.');
        }
        catch { setError('You appear to be offline. Check your connection and try again.'); }
        finally { setBusy(false); }
    }
    const input = (id: string, type: string, label: string, autoComplete: string) => <div className="auth-field"><label className="visually-hidden" htmlFor={id}>{label}</label><input id={id} name={id} type={type} placeholder={label} autoComplete={autoComplete} required spellCheck={false} maxLength={id === 'name' ? 100 : 200} aria-invalid={field === id || undefined}/></div>;
    return <form className="auth-form" onSubmit={submit} noValidate>
        {mode === 'signup' && input('name', 'text', 'Full name', 'name')}
        {mode !== 'reset' && input('email', 'email', 'Email address', 'email')}
        {mode === 'login' && <Password id="password" label="Password" autoComplete="current-password" invalid={field === 'password'}/>}
        {(mode === 'signup' || mode === 'reset') && <Password id="password" label={mode === 'reset' ? 'New password' : 'Password'} autoComplete="new-password" invalid={field === 'password'} hint="At least 10 characters."/>}
        {mode === 'reset' && <Password id="confirm" label="Confirm new password" autoComplete="new-password" invalid={field === 'confirm'}/>}
        {mode === 'login' && <a className="auth-forgot" href={`/forgot-password?return_to=${encodeURIComponent(returnTo)}`}>Forgot the password?</a>}
        <p ref={errorRef} tabIndex={-1} role="alert" className="auth-error">{error}</p>
        {message ? <p role="status" className="auth-message">{message}</p> : <button className="auth-submit" type="submit" disabled={busy}>{busy ? SUBMIT[mode][1] : SUBMIT[mode][0]}</button>}
    </form>;
}
export function SignOutButton() {
    const [busy, setBusy] = useState(false);
    return <button type="button" className="auth-secondary auth-signout" disabled={busy} onClick={async () => { setBusy(true); try { const r = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'signout' }) }); const d = await r.json() as { redirect?: string }; location.assign(d.redirect || '/'); } catch { setBusy(false); } }}>{busy ? 'Signing out…' : 'Sign out'}</button>;
}
