'use client';
import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { VibeIcons } from './bento-preview';
export function VibePill({ label, tone, sub, index }: {
    label: string;
    tone: string;
    sub: string;
    index: number;
}) {
    const rect = useRef<DOMRect | null>(null), ripple = useRef<HTMLSpanElement>(null);
    const Icon = VibeIcons[index];
    const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    function move(e: PointerEvent<HTMLAnchorElement>) {
        if (e.pointerType === 'touch' || reduced() || !rect.current)
            return;
        const r = rect.current;
        const x = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1));
        e.currentTarget.style.setProperty('--pill-x', `${x * 3}px`);
        e.currentTarget.style.setProperty('--pill-y', `${y * 4}px`);
        e.currentTarget.style.setProperty('--pill-tilt', `${x * .8}deg`);
    }
    function press(e: PointerEvent<HTMLAnchorElement>) {
        const r = e.currentTarget.getBoundingClientRect(), node = ripple.current;
        if (!node)
            return;
        node.style.left = `${e.clientX - r.left}px`;
        node.style.top = `${e.clientY - r.top}px`;
        node.getAnimations().forEach(animation => animation.cancel());
        node.animate(reduced() ? [{ opacity: .2 }, { opacity: 0 }] : [{ transform: 'translate(-50%,-50%) scale(.1)', opacity: .25 }, { transform: 'translate(-50%,-50%) scale(6)', opacity: 0 }], { duration: reduced() ? 150 : 450, easing: 'cubic-bezier(.2,0,0,1)' });
    }
    function reset(e: PointerEvent<HTMLAnchorElement>) {
        rect.current = null;
        ['--pill-x', '--pill-y', '--pill-tilt'].forEach(p => e.currentTarget.style.removeProperty(p));
    }
    return <a className={`vibe-bar vibe-${tone}`} href={`/collection?category=${encodeURIComponent(label)}`} style={{ '--bar-i': index, '--pill-direction': index % 2 ? -1 : 1 } as CSSProperties} onPointerEnter={e => { rect.current = e.currentTarget.getBoundingClientRect(); }} onPointerMove={move} onPointerDown={press} onPointerLeave={reset} onPointerCancel={reset}>
        <span className="vibe-arrive"><span className="vibe-float"><span className="vibe-surface">
            <span ref={ripple} className="vibe-touchwave" aria-hidden="true"/>
            <span className="vibe-symbol"><Icon aria-hidden="true" strokeWidth={1.6}/></span>
            <span className="vibe-bar-copy"><strong>{label}</strong><small>{sub}</small></span>
            <span className="vibe-arrow"><ArrowUpRight aria-hidden="true" strokeWidth={1.6}/></span>
        </span></span></span>
    </a>;
}
