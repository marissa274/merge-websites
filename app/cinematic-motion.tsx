'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Browser only: registering wakes the GSAP ticker, and Workers forbid timers outside a request.
if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger);

// Separate phrases, rests and phases: the notes never share a master beat.
export const NOTE_PHRASES = [
    { lift: -19, drift: 3, tilt: -1.2, attack: .72, release: 1.25, rest: 2.1, phase: .4 },
    { lift: 14, drift: -2, tilt: .8, attack: 1.1, release: 1.65, rest: 3.4, phase: 2.8 },
    { lift: -25, drift: -3, tilt: 1.1, attack: .85, release: 1.4, rest: 2.8, phase: 1.5 },
    { lift: -12, drift: 2, tilt: -.65, attack: 1.35, release: 1.8, rest: 1.7, phase: 4.2 },
    { lift: 21, drift: 3, tilt: -.9, attack: .95, release: 1.55, rest: 3.9, phase: 3.1 },
    { lift: -16, drift: -2, tilt: 1.3, attack: .65, release: 1.3, rest: 4.6, phase: 5.2 },
] as const;

export function CinematicMotion({ scope }: { scope: RefObject<HTMLDivElement | null> }) {
    const [enabled, setEnabled] = useState(false);
    const introduced = useRef(false);
    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setEnabled(!preference.matches && document.documentElement.dataset.motion !== 'reduced');
        sync();
        preference.addEventListener('change', sync);
        window.addEventListener('mk-motion', sync);
        return () => { preference.removeEventListener('change', sync); window.removeEventListener('mk-motion', sync); };
    }, []);

    useGSAP(() => {
        const root = scope.current;
        if (!root || !enabled) return;
        const media = gsap.matchMedia();
        let disposed = false;
        media.add({ desktop: '(min-width: 1024px) and (min-height: 700px)', mobile: '(max-width: 1023px)', short: '(max-height: 699px)' }, context => {
            const desktop = context.conditions?.desktop;
            const stage = root.querySelector<HTMLElement>('.cinema-stage');
            const cards = stage ? Array.from(stage.querySelectorAll<HTMLElement>('.bento-project')) : [];
            const art = cards[0]?.querySelector<HTMLElement>('.project-art');
            const captions = stage?.querySelectorAll('.bento-caption') || [];
            const listeners: (() => void)[] = [];

            if (!introduced.current && window.scrollY < 80) {
                introduced.current = true;
                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .from(root.querySelectorAll('.hero-line'), { yPercent: 110, rotation: 2, duration: .85, stagger: .1 })
                    .from(root.querySelector('.hero-v2-bottom'), { y: 12, opacity: .15, duration: .4 }, '-=.38');
            }

            if (desktop && stage && art && cards.length >= 3) {
                const fit = () => {
                    // ScrollTrigger reverts transforms before refresh measurement.
                    const box = art.getBoundingClientRect();
                    const frame = stage.getBoundingClientRect();
                    return { scale: frame.width / box.width, x: frame.left + frame.width / 2 - (box.left + box.width / 2), y: frame.top + frame.height / 2 - (box.top + box.height / 2) };
                };
                let framing = fit();
                const scene = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: { trigger: stage, start: 'top 120px', end: () => `+=${Math.round(window.innerHeight * .8)}`, pin: true, scrub: .65, invalidateOnRefresh: true,
                        onRefreshInit: () => { gsap.set(art, { clearProps: 'transform' }); framing = fit(); } },
                });
                scene.fromTo(art, { scale: () => framing.scale, x: () => framing.x, y: () => framing.y }, { scale: 1, x: 0, y: 0, duration: 1.4 }, 0)
                    .fromTo(cards.slice(1), { x: 42, scale: .96, opacity: .12 }, { x: 0, scale: 1, opacity: 1, duration: .65, stagger: .16 }, .65)
                    .fromTo(captions, { opacity: .2, y: 8 }, { opacity: 1, y: 0, duration: .4, stagger: .07 }, 1.1);
                stage.dataset.scene = 'active';
                // Keyboard navigation must reach stable targets, even mid-scrub.
                const settle = () => { scene.scrollTrigger?.kill(true); scene.progress(1); delete stage.dataset.scene; };
                stage.addEventListener('focusin', settle);
                listeners.push(() => { stage.removeEventListener('focusin', settle); delete stage.dataset.scene; });
            } else {
                // Native mobile scrolling: no pinning, zoom or forced horizontal travel.
                cards.forEach((card, i) => gsap.from(card, { y: 12, opacity: .6, duration: .4, delay: i * .06, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 94%', once: true } }));
            }

            const notes = Array.from(root.querySelectorAll<HTMLElement>('.vibe-bar'));
            const equalizer = root.querySelector<HTMLElement>('.vibe-equalizer')!;
            const phrases = notes.map((note, i) => {
                const p = NOTE_PHRASES[i % NOTE_PHRASES.length];
                const float = note.querySelector<HTMLElement>('.vibe-float')!;
                const scale = desktop ? 1 : .55;
                const phrase = gsap.timeline({ paused: true, repeat: -1 });
                phrase.to(float, { y: p.lift * scale, x: p.drift, rotation: p.tilt, duration: p.attack, ease: 'sine.inOut' }, p.rest)
                    .to(float, { y: p.lift * .35 * scale, x: -p.drift, rotation: -p.tilt * .3, duration: p.release, ease: 'sine.inOut' })
                    .to(float, { y: 0, x: 0, rotation: 0, duration: .9, ease: 'sine.inOut' })
                    .to({}, { duration: p.rest * .6 });
                phrase.totalTime(p.phase, true);
                return phrase;
            });
            let visible = false;
            const syncNotes = () => phrases.forEach((phrase, i) => {
                const held = notes[i].matches(':hover') && matchMedia('(hover: hover) and (pointer: fine)').matches;
                const focused = notes[i].contains(document.activeElement);
                phrase.paused(!visible || document.hidden || held || focused);
            });
            const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncNotes(); }, { threshold: .05 });
            observer.observe(equalizer);
            document.addEventListener('visibilitychange', syncNotes);
            notes.forEach(note => {
                ['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach(type => {
                    note.addEventListener(type, syncNotes);
                    listeners.push(() => note.removeEventListener(type, syncNotes));
                });
            });
            listeners.push(() => { observer.disconnect(); document.removeEventListener('visibilitychange', syncNotes); });
            return () => listeners.forEach(remove => remove());
        }, root);
        // Asset completion changes the scene's dimensions; never refresh per scroll frame.
        const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
        const pendingImages = Array.from(root.querySelectorAll('img')).filter(image => !image.complete);
        pendingImages.forEach(image => { image.addEventListener('load', refresh, { once: true }); image.addEventListener('error', refresh, { once: true }); });
        document.fonts.ready.then(refresh);
        return () => { disposed = true; media.revert(); pendingImages.forEach(image => { image.removeEventListener('load', refresh); image.removeEventListener('error', refresh); }); };
    }, { scope, dependencies: [enabled], revertOnUpdate: true });
    return null;
}
