'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger);

function Portrait({ placement }: { placement: 'top' | 'bottom' }) {
    const top = placement === 'top';
    const source = `/portraits/marissa-${placement}.png?v=20261027-2`;
    return <figure className={`about-portrait-stage about-portrait-stage--${placement}`}>
        <div className="about-portrait-reveal" data-about-portrait>
            <div className="about-portrait-drift" data-portrait-drift>
                <div className="about-portrait-art" style={{ '--portrait-cutout': `url("${source}")` } as CSSProperties}>
                    <img src={source} width={1024} height={1536} alt={top ? 'Full-body portrait of Marissa crouching in a black business suit and heels, with her phone and laptop.' : 'Marissa taking a mirror selfie in a burgundy and gold patterned dress.'} loading={top ? 'eager' : 'lazy'} fetchPriority={top ? 'high' : 'auto'}/>
                </div>
            </div>
        </div>
    </figure>;
}

export function AboutPage({ story }: { story?: string }) {
    const root = useRef<HTMLElement>(null);
    const [motion, setMotion] = useState(false);

    useEffect(() => {
        const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (!meta) return;
        const sync = () => { if (meta.content !== '#000000') meta.content = '#000000'; };
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(meta, { attributes: true, attributeFilter: ['content'] });
        return () => {
            observer.disconnect();
            meta.content = document.documentElement.dataset.theme === 'light' ? '#fff1f5' : '#09090b';
        };
    }, []);

    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setMotion(!preference.matches && document.documentElement.dataset.motion !== 'reduced');
        sync();
        preference.addEventListener('change', sync);
        window.addEventListener('mk-motion', sync);
        return () => {
            preference.removeEventListener('change', sync);
            window.removeEventListener('mk-motion', sync);
        };
    }, []);

    useGSAP(() => {
        if (!motion || !root.current) return;
        const host = root.current;
        host.querySelectorAll<HTMLElement>('[data-about-portrait]').forEach(portrait => {
            gsap.from(portrait, { opacity: 0, duration: .8, ease: 'power2.out', clearProps: 'opacity', scrollTrigger: { trigger: portrait, start: 'top 94%', once: true } });
        });
        const blocks = host.querySelectorAll<HTMLElement>('[data-about-reveal]');
        blocks.forEach(block => {
            gsap.from(block.children, { opacity: 0, y: 12, filter: 'blur(4px)', duration: .3, stagger: .1, ease: 'power2.out', clearProps: 'transform,opacity,filter', scrollTrigger: { trigger: block, start: 'top 90%', once: true } });
        });
        const media = gsap.matchMedia();
        media.add('(min-width: 768px)', () => {
            host.querySelectorAll<HTMLElement>('[data-portrait-drift]').forEach((portrait, index) => {
                gsap.fromTo(portrait, { y: index ? 12 : -12 }, { y: index ? -12 : 12, ease: 'none', scrollTrigger: { trigger: portrait.closest('figure'), start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
            });
        });
        return () => media.revert();
    }, { scope: root, dependencies: [motion], revertOnUpdate: true });

    return <main id="main" ref={root} className="about-editorial">
        <div className="about-orbit about-orbit--top" aria-hidden="true"/>
        <div className="about-opening">
            <Portrait placement="top"/>
            <header className="about-heading" data-about-reveal>
                <p className="about-label">ABOUT</p>
                <h1>The Mind<br/>Behind <span translate="no">MK LAB</span></h1>
                <p className="about-intro">I’m Marissa, the creative mind behind MK LAB. I bring together design, personality and a little unexpected detail to create websites that feel like <em>someone</em>.</p>
            </header>
        </div>
        <div className="about-center">
            <div className="about-narrative">
                <section className="about-chapter" aria-labelledby="about-story" data-about-reveal>
                    <h2 id="about-story">My <span>Story</span></h2>
                    <p className={story?.trim() ? 'about-custom-story' : undefined}>{story?.trim() || 'MK LAB is my space to bring ideas into focus. It brings together the things I care about in design: a clear point of view, expressive details and room for individuality. Each website begins as a direction, ready to become part of someone else’s story.'}</p>
                </section>
                <section className="about-chapter" aria-labelledby="about-philosophy" data-about-reveal>
                    <h2 id="about-philosophy">My <span>Philosophy</span></h2>
                    <p>A website should feel personal before it says a word. I look for the balance between expression and ease: typography with character, color with intention, and an experience that gives people room to explore.</p>
                </section>
            </div>
        </div>
        <div className="about-closing">
            <Portrait placement="bottom"/>
            <div className="about-closing-copy">
                <section className="about-chapter" aria-labelledby="about-process" data-about-reveal>
                    <h2 id="about-process">My <span>Process</span></h2>
                    <p>I start with the feeling and the purpose. Then I shape the visual direction, build the experience, and refine the details. From the first composition to the smallest interaction, every choice should belong to the same idea.</p>
                </section>
            <nav className="about-actions" aria-label="Explore MK LAB" data-about-reveal>
                <a className="about-cta about-cta--primary" href="/collection">Explore My Work<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a>
                <a className="about-cta about-cta--secondary" href="/contact">Contact Me<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a>
            </nav>
            </div>
        </div>
        <div className="about-orbit about-orbit--bottom" aria-hidden="true"/>
    </main>;
}
