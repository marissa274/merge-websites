'use client';
import { useEffect, useId, useRef } from 'react';
import { DROP_OUTLINE, clamp, footerWater, smooth, splashFan, surfaceWave, waterFrame, type WaterLayout } from './water-model';
export function WaterStory() {
    const id = useId().replace(/:/g, ''), root = useRef<SVGSVGElement>(null);
    useEffect(() => {
        const svg = root.current;
        if (!svg)
            return;
        const main = svg.closest<HTMLElement>('main')!;
        const hero = main.querySelector<HTMLElement>('.magnetic-hero')!, gallery = main.querySelector<HTMLElement>('.bento-section')!, about = main.querySelector<HTMLElement>('.studio-declaration')!, footer = main.querySelector<HTMLElement>('.water-finale')!;
        const drop = svg.querySelector<SVGGElement>('[data-story-drop]')!, surface = svg.querySelector<SVGPathElement>('[data-footer-water]')!, mask = svg.querySelector<SVGPathElement>('[data-footer-mask]')!, fan = svg.querySelector<SVGPathElement>('[data-splash-fan]')!;
        const waveNodes = Array.from(svg.querySelectorAll<SVGGElement>('[data-water-wave]'));
        const impactNodes = Array.from(svg.querySelectorAll<SVGPathElement>('[data-impact-wave]'));
        const caption = svg.querySelector<SVGTextElement>('text')!, heroClip = svg.querySelector<SVGRectElement>('[data-hero-clip]')!;
        const preference = matchMedia('(prefers-reduced-motion: reduce)'), coarse = matchMedia('(pointer: coarse)');
        let l: WaterLayout = { width: 1, viewport: 1, heroBottom: 1, galleryTop: 1, galleryBottom: 1, aboutTop: 1, aboutHeight: 1, finalTop: 1, finalHeight: 1 };
        let mainTop = 0, mainBottom = 0, mainLeft = 0, frame = 0, lastDraw = 0, last = 0, clock = 0, activeUntil = 0, activity = 0, impactAt = -1, lastEmit = -1000, lastPointer = { x: 0, y: 0, at: 0 };
        let disposed = false, visible = true, footerVisible = false;
        let waves: {
            x: number;
            y: number;
            at: number;
            strength: number;
            zone: 'hero' | 'footer';
        }[] = [];
        const reduced = () => preference.matches || document.documentElement.dataset.motion === 'reduced';
        function request() { if (!frame && !disposed && visible && !document.hidden)
            frame = requestAnimationFrame(draw); }
        function measure() {
            const m = main.getBoundingClientRect(), h = hero.getBoundingClientRect(), g = gallery.getBoundingClientRect(), a = about.getBoundingClientRect(), f = footer.getBoundingClientRect();
            mainTop = m.top + window.scrollY;
            mainBottom = mainTop + m.height;
            mainLeft = m.left;
            l = { width: m.width, viewport: window.innerHeight, heroBottom: h.bottom - m.top, galleryTop: g.top - m.top, galleryBottom: g.bottom - m.top, aboutTop: a.top - m.top, aboutHeight: a.height, finalTop: f.top - m.top, finalHeight: f.height };
            svg!.setAttribute('viewBox', `0 0 ${l.width} ${l.viewport}`);
            heroClip.setAttribute('width', String(l.width));
            heroClip.setAttribute('height', String(l.heroBottom));
            request();
        }
        function onScroll() { activity = 1; activeUntil = performance.now() + 750; request(); }
        function touch(event?: PointerEvent) {
            if (event?.type === 'pointermove' && event.pointerType === 'touch')
                return;
            const now = performance.now();
            if (now - lastEmit < (coarse.matches ? 230 : 120) && event?.type !== 'pointerdown')
                return;
            const zone = event && footer.contains(event.target as Node) ? 'footer' : 'hero';
            const x = event ? event.clientX - mainLeft : l.width * .52;
            const y = event ? event.clientY + window.scrollY - mainTop : Math.min(l.heroBottom * .58, l.viewport * .55);
            const speed = lastPointer.at ? Math.hypot(x - lastPointer.x, y - lastPointer.y) / Math.max(16, now - lastPointer.at) : 0;
            const strength = event?.type === 'pointerdown' ? 1 : clamp(.25 + speed * .18, .25, 1);
            const count = event?.type === 'pointerdown' || !event ? 3 : 1;
            for (let i = 0; i < count; i++)
                waves.push({ x, y, at: now + i * 110, strength: strength * (1 - i * .2), zone });
            waves = waves.slice(-(coarse.matches ? 4 : 8));
            lastPointer = { x, y, at: now };
            lastEmit = now;
            activeUntil = now + 1900;
            request();
        }
        const reveal = () => touch();
        function draw(now: number) {
            frame = 0;
            if (disposed || !visible || document.hidden) {
                last = 0;
                return;
            }
            const still = reduced(), interval = coarse.matches ? 1000 / 30 : 1000 / 60 - .5;
            if (!still && now - lastDraw < interval) {
                request();
                return;
            }
            const dt = Math.min(.05, Math.max(0, (now - (last || now)) / 1000));
            last = lastDraw = now;
            activity *= Math.exp(-dt * 4);
            if (!still)
                clock += dt;
            const stageTop = Math.min(Math.max(window.scrollY, mainTop), Math.max(mainTop, mainBottom - l.viewport)), scroll = stageTop - mainTop;
            const f = waterFrame(window.scrollY - mainTop, l, still);
            if ((f.phase === 'splash' || f.phase === 'footer') && impactAt < 0 && !still && window.scrollY - mainTop < l.finalTop) {
                impactAt = now;
                footer.dataset.landed = 'true';
            }
            const age = impactAt < 0 ? 10000 : now - impactAt, envelope = still ? 0 : Math.exp(-age / 420), energy = envelope * Math.cos(age / 82);
            const returnGate = smooth((f.fall - .65) / .35);
            const spread = still ? 1 : Math.max(f.spread, impactAt < 0 ? 0 : smooth(age / 950) * returnGate);
            const height = f.height * (1 + (f.phase === 'about' ? Math.sin(clock * 19) * activity * .008 : 0));
            drop.setAttribute('transform', `translate(${f.x} ${f.y - scroll}) rotate(${f.tilt}) scale(${f.width / 120} ${height / 150}) translate(-55 -70)`);
            drop.setAttribute('opacity', String(still ? 0 : f.opacity * (1 - smooth(spread / .30))));
            const d = footerWater(l, spread, energy, scroll);
            surface.setAttribute('d', d);
            mask.setAttribute('d', d);
            surface.setAttribute('opacity', String(spread > 0 ? 1 : 0));
            fan.setAttribute('d', splashFan(l.width * .5, l.finalTop + 64 - scroll, age, coarse.matches));
            fan.setAttribute('opacity', String(!still && age < 850 ? Math.sin(clamp(age / 850) * Math.PI) * .8 : 0));
            impactNodes.forEach((node, i) => {
                const t = (age - i * 100) / 1000;
                node.setAttribute('opacity', String(!still && t > 0 && t < 1.6 ? Math.pow(1 - t / 1.6, 2) * .6 : 0));
                if (t > 0 && t < 1.6)
                    node.setAttribute('d', surfaceWave(l.width * .5, l.finalTop + 64 - scroll, t * 1.7, 1, coarse.matches));
            });
            waves = waves.filter(w => now - w.at < 1800);
            waveNodes.forEach((node, i) => {
                const w = waves[i], t = w ? (now - w.at) / 1000 : -1;
                const calm = w?.zone === 'hero' ? f.hero : 1;
                node.setAttribute('opacity', String(!still && w && t >= 0 ? Math.pow(Math.max(0, 1 - t / 1.8), 2) * w.strength * calm : 0));
                if (w && t >= 0) {
                    node.setAttribute('clip-path', `url(#${id}-${w.zone === 'hero' ? 'hero' : 'footer'}-clip)`);
                    node.querySelectorAll('path').forEach(path => path.setAttribute('d', surfaceWave(w.x, w.y - scroll, t, w.strength, coarse.matches)));
                }
            });
            heroClip.setAttribute('y', String(-scroll));
            caption.setAttribute('x', String(Math.max(16, l.width - 191)));
            caption.setAttribute('y', String(f.y - scroll + f.height * .6 + 20));
            caption.setAttribute('opacity', String(still ? 0 : f.label));
            svg!.dataset.phase = f.phase;
            main.style.setProperty('--about-progress', String(f.about));
            main.dataset.waterReady = 'true';
            if (!still && (now < activeUntil || waves.length > 0 || age < 1900 || (footerVisible && f.spread > 0 && age < 2500)))
                request();
            else
                last = 0;
        }
        function sync() { cancelAnimationFrame(frame); frame = 0; last = 0; waves = []; request(); }
        const resize = new ResizeObserver(measure);
        [main, hero, gallery, about, footer].forEach(n => resize.observe(n));
        const intersection = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.target === main)
                visible = e.isIntersecting;
            else if (e.target === footer)
                footerVisible = e.isIntersecting;
            else if (e.isIntersecting) {
                (e.target as HTMLElement).dataset.entered = 'true';
                intersection.unobserve(e.target);
            } });
            if (!visible) {
                cancelAnimationFrame(frame);
                frame = 0;
                last = 0;
            }
            else
                request();
        });
        intersection.observe(main);
        intersection.observe(footer);
        footer.querySelectorAll('.water-wordmark,.water-footer nav,.water-footer-base').forEach(n => intersection.observe(n));
        const mutation = new MutationObserver(sync);
        mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure, { passive: true });
        window.addEventListener('mk-water-touch', reveal);
        [hero, footer].forEach(n => { n.addEventListener('pointermove', touch, { passive: true }); n.addEventListener('pointerdown', touch, { passive: true }); });
        preference.addEventListener('change', sync);
        coarse.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        document.fonts.ready.then(() => { if (!disposed)
            measure(); });
        measure();
        return () => { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect(); mutation.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); window.removeEventListener('mk-water-touch', reveal); [hero, footer].forEach(n => { n.removeEventListener('pointermove', touch); n.removeEventListener('pointerdown', touch); }); preference.removeEventListener('change', sync); coarse.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); delete main.dataset.waterReady; };
    }, [id]);
    return <div className="water-layer" aria-hidden="true"><svg ref={root} className="water-stage" focusable="false" preserveAspectRatio="none">
        <defs>
            <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2=".8">
                <stop offset="0" className="water-stop-glint" stopOpacity=".85"/><stop offset=".18" className="water-stop-pink" stopOpacity=".52"/>
                <stop offset=".39" className="water-stop-pink" stopOpacity=".06"/><stop offset=".6" className="water-stop-orange" stopOpacity=".10"/>
                <stop offset=".82" className="water-stop-pink" stopOpacity=".34"/><stop offset="1" className="water-stop-orange" stopOpacity=".7"/>
            </linearGradient>
            <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1"><stop className="water-stop-glint"/><stop offset=".45" className="water-stop-pink"/><stop offset="1" className="water-stop-orange"/></linearGradient>
            <linearGradient id={`${id}-warm`}><stop className="water-stop-pink"/><stop offset="1" className="water-stop-orange"/></linearGradient>
            <linearGradient id={`${id}-light`} x1="0" y1="0" x2=".4" y2="1"><stop className="water-stop-glint" stopOpacity=".1"/><stop offset=".35" className="water-stop-glint" stopOpacity=".8"/><stop offset="1" className="water-stop-glint" stopOpacity=".15"/></linearGradient>
            <linearGradient id={`${id}-footer`} x1="0" y1="0" x2=".9" y2="1"><stop className="water-stop-rose"/><stop offset="1" className="water-stop-peach"/></linearGradient>
            <clipPath id={`${id}-drop-clip`}><path d={DROP_OUTLINE}/></clipPath>
            <clipPath id={`${id}-hero-clip`}><rect data-hero-clip x="0" y="0"/></clipPath>
            <clipPath id={`${id}-footer-clip`}><path data-footer-mask/></clipPath>
        </defs>
        <path data-footer-water fill={`url(#${id}-footer)`} opacity="0"/>
        {Array.from({ length: 8 }, (_, i) => <g key={i} data-water-wave opacity="0"><path className="water-wave-halo" stroke={`url(#${id}-warm)`}/><path className="water-wave-line" stroke={`url(#${id}-warm)`}/></g>)}
        <path data-splash-fan className="water-splash-fan" stroke={`url(#${id}-rim)`} opacity="0"/>
        {Array.from({ length: 3 }, (_, i) => <path key={i} data-impact-wave className="water-impact-wave" opacity="0"/>)}
        <g data-story-drop opacity="0">
            <path d={DROP_OUTLINE} fill={`url(#${id}-glass)`} stroke={`url(#${id}-rim)`} strokeWidth="1.1"/>
            <g clipPath={`url(#${id}-drop-clip)`}>
                <path fill={`url(#${id}-light)`} d="M47 49C32 66 25 82 26 98C27 109 33 118 40 122C29 119 22 107 22 96C21 79 32 60 47 49Z"/>
                <path className="water-drop-glint" d="M57 26C54 40 60 48 65 56"/>
                <path className="water-drop-reflect" d="M83 83C91 104 76 124 57 128"/>
                <path className="water-drop-refract" d="M19 101C34 93 51 111 67 104S88 96 98 102M20 112C38 104 57 123 78 111"/>
            </g>
        </g>
        <text opacity="0">OUR WEBSITES</text>
    </svg></div>;
}
