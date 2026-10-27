'use client';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, PhoneOff } from 'lucide-react';
import { CONTACT_SUBJECTS, validateContact, type ContactErrors } from './contact-model';

type Prefill = { name?: string; email?: string; message?: string };

export function TelephoneContactForm({ onClose, prefill }: { onClose: () => void; prefill?: Prefill }) {
    const form = useRef<HTMLFormElement>(null);
    const result = useRef<HTMLDivElement>(null);
    const [busy, setBusy] = useState(false);
    const [errors, setErrors] = useState<ContactErrors>({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const submitting = useRef(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting.current) return;
        const current = event.currentTarget;
        const input = Object.fromEntries(new FormData(current).entries());
        const checked = validateContact(input);
        setErrors(checked.errors); setError('');
        if (Object.keys(checked.errors).length) {
            requestAnimationFrame(() => current.querySelector<HTMLElement>(`[name="${Object.keys(checked.errors)[0]}"]`)?.focus());
            return;
        }
        submitting.current = true; setBusy(true);
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checked.values) });
            const data = await response.json() as { ok?: boolean; message?: string; error?: string; errors?: ContactErrors };
            if (!response.ok || data.ok !== true) {
                setErrors(data.errors || {});
                setError(data.error || 'Your message was not sent. Please try again.');
                requestAnimationFrame(() => {
                    const first = Object.keys(data.errors || {})[0];
                    if (first) current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
                    else result.current?.focus();
                });
                return;
            }
            setSuccess(data.message || 'Your message has been saved in the studio inbox.');
            current.reset();
            requestAnimationFrame(() => result.current?.focus());
        } catch {
            setError('Your message was not sent. Check your connection and try again.');
            requestAnimationFrame(() => result.current?.focus());
        } finally { setBusy(false); submitting.current = false; }
    }

    const feedback = (name: keyof ContactErrors) => errors[name] ? <span className="contact-field-error" id={`contact-${name}-error`}>{errors[name]}</span> : null;
    return <>
        <div className="contact-form-top" data-contact-reveal><span className="contact-line-status"><i aria-hidden="true"/>The line is open.</span><button type="button" className="contact-close" onClick={onClose}><PhoneOff aria-hidden="true" size={16}/>Put Down Phone</button></div>
        <h2 id="contact-form-heading" tabIndex={-1} data-contact-reveal>Tell me about<br/>your <span>idea.</span></h2>
        {success ? <div ref={result} className="contact-confirmation" tabIndex={-1} role="status"><Check aria-hidden="true"/><h3>Conversation started.</h3><p>{success}</p><button type="button" className="contact-text-button" onClick={() => { setSuccess(''); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('input')?.focus()); }}>Write another message</button></div> :
            <form ref={form} className="telephone-contact-form" onSubmit={submit} noValidate aria-busy={busy}>
                <div className="contact-two-fields" data-contact-reveal>
                    <div className="contact-field"><label htmlFor="contact-name">Your Name</label><input id="contact-name" name="name" autoComplete="name" defaultValue={prefill?.name} required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined}/>{feedback('name')}</div>
                    <div className="contact-field"><label htmlFor="contact-email">Email Address</label><input id="contact-email" name="email" type="email" autoComplete="email" spellCheck={false} defaultValue={prefill?.email} required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined}/>{feedback('email')}</div>
                </div>
                <div className="contact-field" data-contact-reveal><label htmlFor="contact-subject">What can I help you with?</label><select id="contact-subject" name="subject" required defaultValue="" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'contact-subject-error' : undefined}><option value="" disabled>Choose a topic</option>{CONTACT_SUBJECTS.map(subject => <option key={subject}>{subject}</option>)}</select>{feedback('subject')}</div>
                <div className="contact-field" data-contact-reveal><label htmlFor="contact-message">Your Message</label><textarea id="contact-message" name="message" autoComplete="off" defaultValue={prefill?.message} required minLength={10} maxLength={5000} rows={4} aria-invalid={!!errors.message} aria-describedby={`contact-message-help${errors.message ? ' contact-message-error' : ''}`} placeholder="A little context, a big idea…"/><small id="contact-message-help">10–5,000 characters. Leave an email where the studio can reach you.</small>{feedback('message')}</div>
                <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
                <button className="contact-send" type="submit" disabled={busy} data-contact-reveal>{busy ? 'Sending Message…' : 'Send Message'}<ArrowUpRight aria-hidden="true"/></button>
                <p className="contact-form-note" data-contact-reveal>Your message is saved in the MK LAB studio inbox.</p>
                <div ref={result} tabIndex={-1} role="alert" className="contact-submit-error">{error}</div>
            </form>}
    </>;
}
