'use client';
import { useEffect, useRef, useState } from 'react';
import { TelephoneContactForm } from './contact-form';
import { telephoneCord, useTelephoneMotion } from './contact-motion';

export function ContactPage({ prefill }: { prefill?: { name?: string; email?: string; message?: string } }) {
    const root = useRef<HTMLElement>(null);
    const handset = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [motion, setMotion] = useState(false);
    const { boost } = useTelephoneMotion(root, open, motion, true);

    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setMotion(!preference.matches && document.documentElement.dataset.motion !== 'reduced');
        sync(); preference.addEventListener('change', sync); window.addEventListener('mk-motion', sync);
        return () => { preference.removeEventListener('change', sync); window.removeEventListener('mk-motion', sync); };
    }, []);
    useEffect(() => {
        const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (!meta) return;
        const sync = () => { if (meta.content !== '#080709') meta.content = '#080709'; };
        sync(); const observer = new MutationObserver(sync); observer.observe(meta, { attributes: true, attributeFilter: ['content'] });
        return () => { observer.disconnect(); meta.content = document.documentElement.dataset.theme === 'light' ? '#fff1f5' : '#09090b'; };
    }, []);
    function close() { setOpen(false); handset.current?.focus({ preventScroll: true }); }

    return <main id="main" className="contact-experience" ref={root} data-open={open} data-animated={motion}>
        <header className="contact-heading">
            <p className="contact-eyebrow">LET’S TALK</p>
            <h1>Contact <span>Me</span></h1>
            <button className="contact-access visually-hidden" type="button" aria-label="Open contact form" aria-expanded={open} aria-controls="contact-conversation" onClick={() => setOpen(true)}>Open contact form</button>
        </header>
        <div className="contact-layout">
            <div className="telephone-scene" data-phone-scene>
                <div className="telephone-ground" aria-hidden="true"/>
                <img className="telephone-base" data-phone-base src="/contact/telephone-base.png" width={1536} height={1024} alt="Glossy burgundy vintage telephone base with a pink push-button keypad." fetchPriority="high"/>
                <svg className="telephone-cable" viewBox="0 0 1000 820" aria-hidden="true"><path className="telephone-cord-shadow" data-phone-cord d={telephoneCord(open && !motion ? 1 : 0)}/><path className="telephone-cord-highlight" data-phone-cord d={telephoneCord(open && !motion ? 1 : 0)}/></svg>
                <div className="telephone-ring-waves" aria-hidden="true"><i data-ring-wave/><i data-ring-wave/><i data-ring-wave/><i data-ring-wave/></div>
                <button ref={handset} data-handset className="telephone-handset" type="button" aria-label={open ? 'Put down phone' : 'Pick up the phone'} aria-expanded={open} aria-controls="contact-conversation" onClick={() => open ? close() : setOpen(true)} onPointerEnter={() => boost(true)} onPointerLeave={() => boost(false)}>
                    <img src="/contact/telephone-handset.png" width={2172} height={724} alt="" fetchPriority="high"/>
                    <span className="telephone-hover-label">{open ? 'Put down phone' : 'Pick up the phone'}</span>
                </button>
            </div>
            <section id="contact-conversation" className="contact-form-panel" data-contact-panel inert={!open} aria-hidden={!open} aria-labelledby="contact-form-heading">
                <TelephoneContactForm onClose={close} prefill={prefill}/>
            </section>
        </div>
    </main>;
}
