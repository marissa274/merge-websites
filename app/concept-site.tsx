'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Menu, Gamepad2, Flower2, AudioLines, Sun, MoveUpRight, Shapes, Coffee } from 'lucide-react';
import type { Presentation } from './product-presentation';
import { conceptCovers } from './studies';
const icon = { 'aria-hidden': true as const, strokeWidth: 1.5 };
// One small responsive homepage per design concept, written from the concept's existing cover copy and imagery.
// It is rendered live at each device's CSS viewport and reflows with container queries, so the laptop, tablet and phone show the same site in its own layout.
type Site = { brand: string; nav: string[]; title: string[]; intro: string; action: string; items: string[]; image?: string; alt?: string; art?: typeof Sun };
const SITES: Record<string, Site> = {
    muse: { brand: 'muse.', nav: ['Rituals', 'Care', 'About'], title: ['Soft is', 'powerful.'], intro: 'A little care. A lot of you. Feel-good essentials for every day.', action: 'Find your ritual', items: ['Cleanse gently', 'Hydrate deeply', 'Glow naturally'], image: conceptCovers['muse'], alt: 'Beauty products in warm light' },
    offgrid: { brand: 'OFFGRID®', nav: ['Worlds', 'Modes', 'Community'], title: ['Play', 'your way.'], intro: 'Your world. Your rules. Make your next move.', action: 'Press play', items: ['Explore', 'Compete', 'Create'], art: Gamepad2 },
    sunday: { brand: 'sunday', nav: ['Menu', 'Visit', 'Events'], title: ['Made', 'to share.'], intro: 'Good food. Good company. A table for your people.', action: 'Book a table', items: ['Something fresh', 'Something crispy', 'Something sweet'], image: conceptCovers['sunday'], alt: 'A colorful dish prepared to share' },
    'studio-09': { brand: 'STUDIO 09', nav: ['New edit', 'Collection', 'Lookbook'], title: ['Wear', 'your mood.'], intro: 'Independent by nature. Nothing ordinary, all personality.', action: 'Shop the edit', items: ['Everyday layers', 'Statement pieces', 'The finishing touch'], image: conceptCovers['studio-09'], alt: 'Independent fashion portrait' },
    forma: { brand: 'forma®', nav: ['Projects', 'Studio', 'Journal'], title: ['Considered', 'spaces.'], intro: 'Architecture, interiors and thoughtful spaces, quietly made.', action: 'View projects', items: ['Residential', 'Interiors', 'Objects'], image: conceptCovers['forma'], alt: 'Sculptural timber staircase in a light-filled interior' },
    'still-life': { brand: 'still / life', nav: ['Journal', 'Objects', 'Stories'], title: ['Objects.', 'With stories.'], intro: 'Objects, stories and the art of the everyday.', action: 'Read the journal', items: ['Morning light', 'Kept things', 'Slow rooms'], image: conceptCovers['still-life'], alt: 'Sunlit interior with plants and arranged books' },
    aura: { brand: 'aura', nav: ['Practice', 'Retreats', 'Journal'], title: ['A little space.', 'All for you.'], intro: 'Slow down. Come back to yourself.', action: 'Find your ritual', items: ['Breathwork', 'Yoga', 'Retreats'], art: Flower2 },
    mono: { brand: 'MONO®', nav: ['Artists', 'Releases', 'Live'], title: ['For the', 'feeling.'], intro: 'Independent sounds. Shared frequencies.', action: 'Explore the sounds', items: ['New releases', 'Live sessions', 'Label roster'], art: AudioLines },
    roam: { brand: 'roam.', nav: ['Places', 'Journal', 'Guides'], title: ['Somewhere', 'out there.'], intro: 'Less itinerary. More possibility.', action: 'Find your next story', items: ['Coastlines', 'Cities', 'Slow trails'], art: Sun },
    pulse: { brand: 'PULSE', nav: ['Training', 'Studio', 'Coaches'], title: ['Your next', 'level.'], intro: 'Show up for yourself.', action: 'Find a session', items: ['Strength', 'Conditioning', 'Recovery'], art: MoveUpRight },
    'gallery-18': { brand: 'GALLERY 18', nav: ['Artists', 'Exhibitions', 'Visit'], title: ['A different', 'way to see.'], intro: 'New perspectives. Open doors.', action: 'View exhibitions', items: ['Now showing', 'Upcoming', 'Archive'], art: Shapes },
    casa: { brand: 'casa', nav: ['Menu', 'Our place', 'Events'], title: ['Stay a', 'little longer.'], intro: 'Good coffee. Better company.', action: 'Explore the menu', items: ['Coffee', 'Pastries', 'Brunch'], art: Coffee },
};
export const CONCEPT_VIEWPORTS = { desktop: 1440, tablet: 834, mobile: 390 } as const;
export function hasConceptSite(slug: string) { return Object.hasOwn(SITES, slug); }
export function ConceptSite({ slug, palette, viewport }: { slug: string; palette: Presentation['palette']; viewport: keyof typeof CONCEPT_VIEWPORTS }) {
    const host = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    const width = CONCEPT_VIEWPORTS[viewport];
    // The page is laid out at the device's real CSS width, then scaled to the screen it sits in.
    useEffect(() => {
        const node = host.current; if (!node) return;
        const fit = () => { if (node.clientWidth) setScale(node.clientWidth / width); };
        fit(); const observer = new ResizeObserver(fit); observer.observe(node);
        return () => observer.disconnect();
    }, [width]);
    const site = SITES[slug]; if (!site) return null;
    const Art = site.art;
    const style = { '--cs-paper': palette.background, '--cs-ink': palette.ink, '--cs-accent': palette.accent, '--cs-accent-ink': palette.accentInk, '--cs-width': `${width}px`, '--cs-scale': scale || 1 } as CSSProperties;
    return <div ref={host} className="concept-viewport" style={style} aria-hidden="true">
        <div className={`concept-site${scale ? ' is-fitted' : ''}`}>
            <div className="cs-nav"><span className="cs-brand" translate="no">{site.brand}</span><span className="cs-links">{site.nav.map(item => <span key={item}>{item}</span>)}</span><span className="cs-cta">{site.action}</span><span className="cs-menu">Menu<Menu {...icon}/></span></div>
            <div className="cs-hero"><div><p className="cs-title">{site.title.map(line => <span key={line}>{line}</span>)}</p><p className="cs-intro">{site.intro}</p><span className="cs-action">{site.action}<ArrowUpRight {...icon}/></span></div>
                <div className="cs-media">{site.image ? <img src={site.image} alt="" width={1200} height={1000} loading="lazy" decoding="async"/> : Art && <Art {...icon}/>}</div></div>
            <ul className="cs-items">{site.items.map(item => <li key={item}><span>{item}</span><ArrowUpRight {...icon}/></li>)}</ul>
        </div>
    </div>;
}
