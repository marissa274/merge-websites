'use client';
import { useEffect, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Browser only: registering wakes the GSAP ticker, and Workers forbid timers outside a request.
if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger);
export function DetailMotion({ scope, rhythm }: { scope: RefObject<HTMLElement | null>; rhythm: 'calm' | 'crisp' }) {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setEnabled(!preference.matches && document.documentElement.dataset.motion !== 'reduced');
        sync(); preference.addEventListener('change', sync); window.addEventListener('mk-motion', sync);
        return () => { preference.removeEventListener('change', sync); window.removeEventListener('mk-motion', sync); };
    }, []);
    useGSAP(() => {
        const root = scope.current; if (!root || !enabled) return;
        const media = gsap.matchMedia();
        let disposed = false;
        media.add({ desktop: '(min-width: 1024px)', small: '(max-width: 1023px)' }, context => {
            const duration = rhythm === 'crisp' ? .55 : .8;
            if (window.scrollY < 80) {
                const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
                intro.from(root.querySelectorAll('[data-title-line]'), { yPercent: 105, duration, stagger: .1 })
                    .from(root.querySelector('[data-detail-hero-art]'), { scale: 1.04, opacity: 0, duration }, .15);
            }
            // Native scrolling stays untouched. The image alone travels inside its fixed crop.
            if (context.conditions?.desktop) {
                gsap.fromTo(root.querySelector('[data-detail-hero-zoom]'), { scale: 1 }, { scale: 1.025, ease: 'none', scrollTrigger: { trigger: root.querySelector('.detail-hero'), start: 'top top', end: 'bottom top', scrub: .6 } });

            }
            // Each act is one coordinated reveal, in document order, instead of scattered loops.
            root.querySelectorAll<HTMLElement>('[data-detail-act]').forEach(act => {
                const sequence = gsap.timeline({ defaults: { duration: duration * .75, ease: 'power3.out' }, scrollTrigger: { trigger: act, start: 'top 86%', once: true } });
                const heading = act.querySelector('[data-act-heading]');
                if (heading) sequence.from(heading, { y: 18, opacity: 0 });
                const visuals = act.querySelectorAll('[data-act-visual]');
                if (visuals.length) sequence.from(visuals, { yPercent: context.conditions?.desktop ? 7 : 3, scale: 1.015, opacity: 0, stagger: .1 }, heading ? '-=.2' : 0);
                const content = act.querySelectorAll('[data-act-content]');
                if (content.length) sequence.from(content, { y: 12, opacity: 0, stagger: .1 }, '-=.15');
            });
            // Devices settle with the scroll: the laptop scales up from .92 and rises; the phone and tablet arrive from opposite sides; companion phones rise in last.
            // Only the device body moves, its colored stage stays put, so each screenshot is fully legible once it lands.
            root.querySelectorAll<HTMLElement>('[data-device]').forEach(device => {
                const kind = device.dataset.device, wide = !!context.conditions?.desktop;
                const from: gsap.TweenVars = kind === 'mobile' ? { xPercent: wide ? -14 : -6, rotation: wide ? -7 : -3, scale: .94, opacity: .35 }
                    : kind === 'companion' ? { yPercent: wide ? 24 : 10, opacity: 0 }
                    : kind === 'tablet' ? { xPercent: wide ? 12 : 5, rotationY: wide ? -14 : -6, scale: .92, opacity: .35 }
                    : { scale: .92, y: wide ? 64 : 24 };
                const to: gsap.TweenVars = Object.fromEntries(Object.keys(from).map(key => [key, key === 'scale' || key === 'opacity' ? 1 : 0]));
                gsap.fromTo(device, from, { ...to, ease: 'power3.out', scrollTrigger: { trigger: device.closest('.device-stage') || device, start: 'top 88%', end: 'center 58%', scrub: .8 } });
            });
        });
        const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
        root.addEventListener('load', refresh, true);
        document.fonts?.ready.then(refresh);
        return () => { disposed = true; root.removeEventListener('load', refresh, true); media.revert(); };
    }, { scope, dependencies: [enabled, rhythm], revertOnUpdate: true });
    return null;
}
