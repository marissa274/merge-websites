'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { dominantTone, TONES, type Tone } from './collection-model';
// Browser only: registering wakes the GSAP ticker, and Workers forbid timers outside a request.
if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP);

export function GalleryAtmosphere({ scope, signature }: { scope: RefObject<HTMLElement | null>; signature: string }) {
    const root = scope;
    const seen = useRef(new Set<string>());
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setEnabled(!preference.matches && document.documentElement.dataset.motion !== 'reduced');
        sync(); window.addEventListener('mk-motion', sync); preference.addEventListener('change', sync);
        return () => { window.removeEventListener('mk-motion', sync); preference.removeEventListener('change', sync); };
    }, []);
    useGSAP((_context, contextSafe) => {
        const host = root.current; if (!host || !contextSafe) return;
        const works = Array.from(host.querySelectorAll<HTMLElement>('[data-work]'));
        const visibleWorks = new Map<HTMLElement, { area: number; centrality: number }>();
        const syncAtmosphere = () => {
            const samples = [...visibleWorks].map(([element, weight]) => ({ ...weight, tone: (element.dataset.tone || 'neutral') as Tone }));
            host.dataset.atmosphere = enabled ? dominantTone(samples, host.dataset.atmosphere as Tone) : 'neutral';
        };
        const reveal = contextSafe((element: HTMLElement, index: number) => {
            const id = element.dataset.work!;
            if (seen.current.has(id)) return;
            seen.current.add(id);
            if (enabled) gsap.from(element, { y: 16, x: index % 2 ? 5 : -5, opacity: .35, duration: .55, delay: Math.min(index, 2) * .05, ease: 'power3.out', clearProps: 'transform,opacity', overwrite: 'auto' });
        });
        const observer = new IntersectionObserver(changes => {
            changes.forEach((entry, index) => {
                const element = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    const rect = entry.intersectionRect, band = entry.rootBounds;
                    const distance = band ? Math.abs(rect.top + rect.height / 2 - (band.top + band.height / 2)) / Math.max(1, band.height) : 0;
                    visibleWorks.set(element, { area: rect.width * rect.height, centrality: 1 / (1 + distance) });
                    reveal(element, index);
                }
                else visibleWorks.delete(element);
            });
            syncAtmosphere();
        }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20), rootMargin: '-18% 0px -18% 0px' });
        works.forEach(work => observer.observe(work));
        const colors = new MutationObserver(syncAtmosphere);
        colors.observe(host, { subtree: true, attributes: true, attributeFilter: ['data-tone'] });
        return () => { observer.disconnect(); colors.disconnect(); delete host.dataset.atmosphere; };
    }, { scope: root, dependencies: [signature, enabled], revertOnUpdate: true });
    return <div className="collection-atmosphere" aria-hidden="true">{TONES.filter(t => t !== 'neutral').map(t => <span key={t} data-glow={t}/>)}</div>;
}
