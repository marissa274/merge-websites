'use client';
import { MosaicStudyPreview } from './collection-preview';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, ShoppingBag, UserRound, Sun, Moon, X, Menu, Pause, Play, Plus } from 'lucide-react';
import { faqItems, type Product } from './ui';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.6 };
const cad = (v: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(v / 100);
import { studies } from './studies';
import { CinematicMotion } from './cinematic-motion';
import { VibePill } from './vibe-pill';
import { AnimatedPreview } from './bento-preview';
import { HomeMosaic } from './home-mosaic';
export function NavV2() {
    const [light, setLight] = useState(false), [count, setCount] = useState(0), [compact, setCompact] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null), sentinel = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setLight(document.documentElement.dataset.theme === 'light');
        const bag = () => {
            try {
                const v = JSON.parse(localStorage.getItem('mek-bag') || '[]');
                setCount(Array.isArray(v) ? v.length : 0);
            }
            catch {
                setCount(0);
            }
        };
        bag();
        window.addEventListener('mek-bag', bag);
        window.addEventListener('storage', bag);
        const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
        if (sentinel.current)
            observer.observe(sentinel.current);
        return () => { window.removeEventListener('mek-bag', bag); window.removeEventListener('storage', bag); observer.disconnect(); };
    }, []);
    function theme() {
        const root = document.documentElement;
        root.classList.add('theme-changing');
        const next = light ? 'dark' : 'light';
        root.dataset.theme = next;
        setLight(!light);
        try {
            localStorage.setItem('mk-theme', next);
        }
        catch { }
        void root.offsetHeight;
        requestAnimationFrame(() => root.classList.remove('theme-changing'));
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#09090b' : '#fff1f5');
    }
    return <><div ref={sentinel} className="nav-sentinel" aria-hidden="true"/><header className="floating-header" data-compact={compact}><nav className="nav-capsule" aria-label="Main navigation"><a className="mk-wordmark" href="/" translate="no" aria-label="MK lab home">MK lab</a><div className="capsule-links"><a href="/collection">Collection</a><a className="nav-studio" href="/about">Studio</a><a className="nav-pricing" href="/pricing">Pricing</a><a className="nav-contact" href="/contact">Contact</a></div><div className="capsule-actions"><a className="nav-icon nav-account" href="/account" aria-label="My account"><UserRound {...ip}/></a><a className="nav-icon nav-bag" href="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag {...ip}/>{count > 0 && <span>{count}</span>}</a><button className="nav-icon theme-toggle" onClick={theme} aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} aria-pressed={light}>{light ? <Moon {...ip}/> : <Sun {...ip}/>}</button><div className="nav-motion"><MotionControl /></div><button className="nav-icon mobile-menu" aria-label="Open navigation" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Menu {...ip}/></button></div></nav></header><dialog ref={dialog} className="menu-dialog v2-menu" aria-label="Navigation menu"><header><a href="/" className="mk-wordmark">MK lab</a><button className="nav-icon" aria-label="Close navigation" onClick={() => dialog.current?.close()}><X {...ip}/></button></header><nav>{[['Collection', '/collection'], ['Studio', '/about'], ['Pricing', '/pricing'], ['Care plans', '/subscriptions'], ['Contact', '/contact'], ['My account', '/account']].map(([label, url]) => <a key={url} href={url} onClick={() => dialog.current?.close()}>{label}<ArrowUpRight {...ip}/></a>)}</nav></dialog></>;
}
export function MotionControl() {
    const [paused, setPaused] = useState(false), [systemReduced, setSystemReduced] = useState(false);
    useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const sync = () => { setSystemReduced(media.matches); setPaused(media.matches || document.documentElement.dataset.motion === 'reduced'); }; sync(); window.addEventListener('mk-motion', sync); media.addEventListener('change', sync); return () => { window.removeEventListener('mk-motion', sync); media.removeEventListener('change', sync); }; }, []);
    return <button className="motion-control" aria-label={systemReduced ? 'Reduced motion follows your system settings' : paused ? 'Resume motion' : 'Pause motion'} aria-pressed={paused} disabled={systemReduced} onClick={() => {
            const next = !paused;
            document.documentElement.dataset.motion = next ? 'reduced' : 'full';
            try {
                localStorage.setItem('mk-motion', next ? 'reduced' : 'full');
            }
            catch { }
            window.dispatchEvent(new Event('mk-motion'));
        }}>{paused ? <Play {...ip}/> : <Pause {...ip}/>}<span>{systemReduced ? 'Reduced motion' : paused ? 'Motion paused' : 'Pause motion'}</span></button>;
}
export function WebsiteStudy({ slug, large = false }: {
    slug: string;
    large?: boolean;
}) { return ['muse', 'offgrid', 'sunday', 'studio-09'].includes(slug) ? <AnimatedPreview slug={slug} large={large}/> : <div className="expanded-study-preview"><MosaicStudyPreview slug={slug}/></div>; }
function MagneticProjectArrow({ href, label }: {
    href: string;
    label: string;
}) {
    return <a className="project-arrow" href={href} aria-label={label} onPointerMove={e => {
            if (e.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced')
                return;
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--magnet-x', `${(e.clientX - r.left - r.width / 2) * .16}px`);
            e.currentTarget.style.setProperty('--magnet-y', `${(e.clientY - r.top - r.height / 2) * .16}px`);
        }} onPointerLeave={e => { e.currentTarget.style.setProperty('--magnet-x', '0px'); e.currentTarget.style.setProperty('--magnet-y', '0px'); }}><ArrowUpRight {...ip}/></a>;
}
export function StudyTile({ slug }: {
    slug: string;
}) { const s = studies.find(x => x.slug === slug)!; return <article className={`bento-project bento-${s.tone}`} data-project-reveal><a className="project-art" href={`/concepts/${slug}`} aria-label={`Explore ${s.name} concept`}><WebsiteStudy slug={slug}/></a><div className="bento-caption"><div><h3><a href={`/concepts/${slug}`}>{s.name}</a></h3><span>Concept · price pending</span></div><MagneticProjectArrow href={`/concepts/${slug}`} label={`View ${s.name}`}/></div></article>; }
function RealTile({ product: p }: {
    product: Product;
}) { return <article className="bento-project bento-real" data-project-reveal><a className="project-art" href={`/collection/${p.slug}`}>{p.image_id ? <img src={`/api/media/${p.image_id}`} alt={`${p.name} website preview`} width={1200} height={900} loading="lazy"/> : <div className="real-placeholder"><h3>{p.name}</h3><span>Preview coming soon</span></div>}</a><div className="bento-caption"><div><h3><a href={`/collection/${p.slug}`}>{p.name}</a></h3><span>{cad(p.price)} CAD</span></div><MagneticProjectArrow href={`/collection/${p.slug}`} label={`View ${p.name}`}/></div></article>; }
function VibeEqualizer() { return <section className="vibe-section expressive-shell" data-reveal><div className="vibe-heading"><h2>Find your vibe.</h2><p>Different worlds.<br />The same obsession with detail.</p></div><div className="vibe-equalizer" data-vibe-reveal>{[['Beauty', 'beauty', 'Feel good'], ['Gaming', 'gaming', 'Play bold'], ['Food & drink', 'food', 'Good taste'], ['Fashion', 'fashion', 'Be yourself'], ['Creative', 'creative', 'Make waves'], ['Business', 'business', 'Think big']].map(([label, tone, sub], i) => <VibePill key={tone} label={label} tone={tone} sub={sub} index={i}/>)}</div></section>; }
function HomeFAQ({ custom }: {
    custom?: string;
}) { return <section className="home-faq expressive-shell" aria-labelledby="home-faq-title"><div className="home-faq-heading"><p className="home-faq-label">FAQ</p><h2 id="home-faq-title">Questions?<br /><span>We’ve got answers.</span></h2><a className="pill-link" href="/faq">See all questions<ArrowUpRight {...ip}/></a></div><div className="home-faq-list">{faqItems(custom).slice(0, 6).map(([q, a], i) => <details key={q} data-tone={['pink', 'coral', 'lime', 'violet'][i % 4]} open={i === 0}><summary>{q}<Plus {...ip}/></summary><p>{a}</p></details>)}</div></section>; }
function FinalCanvas({ contactEmail }: {
    contactEmail?: string;
}) { return <section className="final-playground water-finale" data-reveal><div className="final-content"><h2>Good design<br />deserves to be seen.</h2><a className="round-cta" href="/contact">Request your website<ArrowUpRight {...ip}/></a></div><footer className="water-footer"><a className="water-wordmark" href="/" translate="no">MK lab</a><nav aria-label="Footer navigation">{[['Home', '/'], ['Collection', '/collection'], ['About', '/about'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="water-footer-base">{contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : <a href="/contact">Start a conversation<ArrowUpRight {...ip}/></a>}<div><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/licenses">Licenses</a></div><span>© {new Date().getFullYear()} MK lab</span></div></footer></section>; }
export function HomeV2({ products, settings }: {
    products: Product[];
    settings: Record<string, string>;
}) {
    const refs = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const host = refs.current;
        if (!host)
            return;
        const observer = new IntersectionObserver(entries => entries.forEach(e => {
            if (e.target.hasAttribute('data-project-reveal')) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    observer.unobserve(e.target);
                }
            }
            else {
                e.target.classList.toggle('is-visible', e.isIntersecting);
                if (e.isIntersecting)
                    (e.target as HTMLElement).dataset.entered = 'true';
            }
        }), { threshold: .15 });
        host.querySelectorAll('[data-reveal],[data-project-reveal],[data-vibe-reveal]').forEach(e => observer.observe(e));
        return () => observer.disconnect();
    }, []);
    return <main id="main" className="expressive-home cinematic-home" ref={refs}><CinematicMotion scope={refs} />
 <section className="magnetic-hero"><h1 aria-label="Websites that make you look twice."><span className="hero-line-mask" aria-hidden="true"><span className="hero-line">Websites that</span></span><span className="hero-line-mask" aria-hidden="true"><span className="hero-line">make you</span></span><span className="hero-line-mask twice-line" aria-hidden="true"><span className="hero-line">look twice.</span></span></h1><div className="hero-v2-bottom"><p>{settings.homeDescription || 'Big personality. Thoughtful design. A website that feels like you, before you say a word.'}</p><a href="#project-collage" className="hero-discover">Meet your next website<ArrowDown {...ip}/></a><div className="hero-motion-tools"><MotionControl /></div></div></section>
 <section className="bento-section home-mosaic expressive-shell" id="project-collage" aria-label="Selected website designs"><HomeMosaic products={products}/>{!products.length && <p className="concept-disclosure">Design studies, for now. A taste of what’s possible. Concepts are not currently for sale.</p>}<a className="explore-more" href="/collection"><span>Explore More</span><span className="explore-sub">View Our Collection</span><span className="explore-circle"><ArrowUpRight {...ip}/></span></a></section>
 <VibeEqualizer />
 <section className="studio-declaration expressive-shell" data-reveal><h2 className="water-about-type"><span>We create websites</span><span>that make ideas</span><span className="word-spectrum">impossible to ignore.</span></h2><p className="studio-description">We turn “I have an idea” into “that’s so you.” Original websites, expressive identities, and a healthy disregard for ordinary.</p><div className="studio-actions"><a className="pill-link" href="/about">About MK lab<ArrowUpRight {...ip}/></a><a className="pill-link filled" href="/personalize/custom">Request a Custom Website<ArrowUpRight {...ip}/></a></div></section>
 <HomeFAQ custom={settings.faq}/>
 <FinalCanvas contactEmail={settings.contactEmail}/>
 </main>;
}
export function NewConceptPage({ slug }: {
    slug: string;
}) { const s = studies.find(x => x.slug === slug)!; return <main id="main" className={`new-concept-page expressive-shell concept-${s.tone}`}><a className="back" href="/collection"><ArrowRight style={{ transform: 'rotate(180deg)' }} {...ip}/>Back to collection</a><div className="concept-page-heading"><h1>{s.name}</h1><p>{s.description}</p></div><div className="concept-preview-full"><WebsiteStudy slug={slug} large/></div><div className="concept-page-note"><p>Design concept · illustrative photography · price pending.<br />This limited preview is not a purchasable product.</p><a href={`/personalize/custom?concept=${encodeURIComponent(slug)}`} className="pill-link">Make this direction yours<ArrowUpRight {...ip}/></a></div></main>; }
