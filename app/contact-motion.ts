'use client';
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP);

export function telephoneCord(progress: number) {
    // Attachment point follows the handset's actual center, percent translation and rotation.
    // The 1000 × 820 scene and 68%-wide, 3:1 handset match contact.css.
    const angle = -90 * progress * Math.PI / 180;
    const startY = 445 + 495 * progress;
    const end = {
        x: 500 - 204 * progress - 270 * Math.cos(angle) - 35.666667 * Math.sin(angle),
        y: 14.933333 + 362.666667 * progress - 270 * Math.sin(angle) + 35.666667 * Math.cos(angle),
    };
    const control = { x: 18 - 65 * progress, y: 660 + 250 * progress };
    const points = Array.from({ length: 121 }, (_, index) => {
        const t = index / 120, u = 1 - t;
        const x = u * u * 175 + 2 * u * t * control.x + t * t * end.x;
        const y = u * u * startY + 2 * u * t * control.y + t * t * end.y;
        const dx = 2 * u * (control.x - 175) + 2 * t * (end.x - control.x);
        const dy = 2 * u * (control.y - startY) + 2 * t * (end.y - control.y);
        const length = Math.hypot(dx, dy) || 1;
        const wave = Math.sin(t * Math.PI * 44) * Math.sin(t * Math.PI) * 8;
        return `${(x - dy / length * wave).toFixed(2)},${(y + dx / length * wave).toFixed(2)}`;
    });
    return `M${points.join(' L')}`;
}

type Controller = { open: (value: boolean) => void; ringing: () => void; boost: (value: boolean) => void };

export function useTelephoneMotion(scope: RefObject<HTMLElement | null>, open: boolean, motion: boolean, ringing: boolean) {
    const state = useRef({ open, ringing });
    // Synced before useGSAP's layout effect so a responsive rebuild restores the latest pose.
    useLayoutEffect(() => { state.current = { open, ringing }; });
    const controller = useRef<Controller | null>(null);

    useGSAP(() => {
        const host = scope.current;
        if (!host || !motion) return;
        const scene = host.querySelector<HTMLElement>('[data-phone-scene]')!;
        const handset = host.querySelector<HTMLElement>('[data-handset]')!;
        const panel = host.querySelector<HTMLElement>('[data-contact-panel]')!;
        const base = host.querySelector<HTMLElement>('[data-phone-base]')!;
        const cords = host.querySelectorAll<SVGPathElement>('[data-phone-cord]');
        const waves = host.querySelectorAll('[data-ring-wave]');
        let visible = true;
        const media = gsap.matchMedia();
        media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, context => {
            const desktop = !!context.conditions?.desktop;
            const deformation = { value: 0 };
            const drawCord = () => cords.forEach(path => path.setAttribute('d', telephoneCord(deformation.value)));
            const ring = gsap.timeline({ repeat: -1, repeatDelay: 2.2, paused: true });
            ring.to(handset, { rotation: 1.4, x: 2, y: -4, duration: .07, repeat: 7, yoyo: true, ease: 'sine.inOut' }, 0)
                .to(base, { x: 1, duration: .1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 0)
                .to(cords, { x: 1, y: -2, duration: .1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 0)
                .fromTo(waves, { opacity: 0, scale: .8 }, { opacity: .65, scale: 1.12, duration: .35, repeat: 1, yoyo: true, stagger: .05 }, 0)
                .to(handset, { x: 0, y: 0, rotation: 0, duration: .12 }, .65);
            const pickup = gsap.timeline({ paused: true });
            pickup.to(scene, { xPercent: desktop ? -5 : 0, scale: desktop ? 1 : .92, transformOrigin: 'left center', duration: .65, ease: 'power3.inOut' }, 0)
                .to(handset, { xPercent: -30, yPercent: 160, rotation: -90, duration: .65, ease: 'power3.inOut' }, 0)
                .to(base, { autoAlpha: 0, duration: .3, ease: 'power2.out' }, .15)
                .to(deformation, { value: 1, duration: .65, ease: 'power3.inOut', onUpdate: drawCord }, 0)
                .fromTo(panel, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .3, ease: 'power2.out' }, .2)
                .fromTo(panel.querySelectorAll('[data-contact-reveal]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3, stagger: .06, ease: 'power2.out' }, .25);
            const syncRing = () => {
                if (!state.current.open && state.current.ringing && !document.hidden && visible && pickup.progress() === 0) ring.resume();
                else ring.pause();
            };
            pickup.eventCallback('onReverseComplete', () => { ring.restart().pause(); syncRing(); });
            pickup.eventCallback('onComplete', () => panel.querySelector<HTMLElement>('h2')?.focus({ preventScroll: desktop }));
            controller.current = {
                open(value) {
                    if (!value && pickup.progress() === 0) { syncRing(); return; }
                    ring.pause();
                    if (pickup.progress() === 0) gsap.set(handset, { rotation: 0, x: 0, y: 0 });
                    gsap.set(waves, { opacity: 0 });
                    if (value) pickup.timeScale(1).play(); else pickup.timeScale(1.5).reverse();
                },
                ringing: syncRing,
                boost: value => ring.timeScale(value ? 1.4 : 1),
            };
            // Responsive reinitialization restores the pose without moving keyboard focus.
            pickup.progress(state.current.open ? 1 : 0, true).pause();
            drawCord(); syncRing();
            document.addEventListener('visibilitychange', syncRing);
            const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; syncRing(); });
            observer.observe(scene);
            return () => { observer.disconnect(); document.removeEventListener('visibilitychange', syncRing); ring.kill(); pickup.kill(); controller.current = null; cords.forEach(path => path.setAttribute('d', telephoneCord(0))); };
        });
        return () => media.revert();
    }, { scope, dependencies: [motion], revertOnUpdate: true });

    useEffect(() => {
        controller.current?.open(open);
        if (open && !motion) scope.current?.querySelector<HTMLElement>('[data-contact-panel] h2')?.focus();
    }, [open, motion, scope]);
    useEffect(() => { controller.current?.ringing(); }, [ringing]);
    return { boost: (value: boolean) => controller.current?.boost(value) };
}
