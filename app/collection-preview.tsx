import { Gamepad2, ArrowUpRight, AudioLines, Flower2, MoveUpRight, Coffee, Gem, Leaf, Camera, Palette, Scissors, Orbit } from 'lucide-react';

const conceptArt: Record<string, typeof Gem> = { eclat: Gem, terra: Leaf, frame: Camera, atelier: Palette, bloom: Scissors, orbit: Orbit };
const newCovers: Record<string, { name: string; line: string; action: string; nav: string; accent: string }> = {
    eclat: { name: 'éclat', line: 'A little\nbrilliance.', action: 'Discover the pieces', nav: 'Objects / Stories', accent: 'Jewelry with a sculptural soul.' },
    terra: { name: 'terra', line: 'Naturally\nyours.', action: 'Find your flowers', nav: 'Flowers / Studio', accent: 'Seasonal stems. Lasting impressions.' },
    frame: { name: 'FRAME', line: 'Look\na little closer.', action: 'View selected work', nav: 'Portraits / Places', accent: 'Ordinary moments. Another perspective.' },
    atelier: { name: 'ATELIER', line: 'Ideas,\nwith form.', action: 'Explore the projects', nav: 'Work / Studio', accent: 'Independent minds. Expressive identities.' },
    bloom: { name: 'bloom', line: 'Your kind\nof beautiful.', action: 'Explore the services', nav: 'Services / Salon', accent: 'A fresh cut. A new feeling.' },
    orbit: { name: 'ORBIT', line: 'Make your\nnext move.', action: 'Meet the studio', nav: 'Products / Approach', accent: 'Digital ideas, brought into focus.' },
    aura: { name: 'aura', line: 'A little space.\nAll for you.', action: 'Find your ritual', nav: 'Practice / Retreats', accent: 'Slow down. Come back to yourself.' },
    mono: { name: 'MONO®', line: 'For the\nfeeling.', action: 'Explore the sounds', nav: 'Artists / Releases', accent: 'Independent sounds. Shared frequencies.' },
    roam: { name: 'roam.', line: 'Somewhere\nout there.', action: 'Find your next story', nav: 'Places / Journal', accent: 'Less itinerary. More possibility.' },
    pulse: { name: 'PULSE', line: 'YOUR\nNEXT\nLEVEL.', action: 'Find a session', nav: 'Training / Studio', accent: 'Show up for yourself.' },
    'gallery-18': { name: 'GALLERY 18', line: 'A different\nway to see.', action: 'View exhibitions', nav: 'Artists / Visit', accent: 'New perspectives. Open doors.' },
    casa: { name: 'casa', line: 'Stay a\nlittle longer.', action: 'Explore the menu', nav: 'Menu / Our place', accent: 'Good coffee. Better company.' },
};

const covers: Record<string, { name: string; type: string; image?: string; alt?: string }> = {
    muse: { name: 'muse.', type: 'Soft is|powerful.', image: '/beauty.jpg', alt: 'Beauty products in warm light' },
    offgrid: { name: 'OFFGRID®', type: 'Play|your way.' },
    sunday: { name: 'sunday', type: 'Made|to share.', image: '/food.jpg', alt: 'A colorful dish prepared to share' },
    'studio-09': { name: 'STUDIO 09', type: 'Wear|your|mood.', image: '/fashion.jpg', alt: 'Independent fashion portrait' },
    forma: { name: 'forma®', type: 'Considered|spaces.', image: '/architecture.jpg', alt: 'Sculptural timber staircase in a light-filled interior' },
    'still-life': { name: 'still / life', type: 'Objects.|With stories.', image: '/still-life.jpg', alt: 'Sunlit interior with plants and carefully arranged books' },
};

// Original project covers, not screenshots of the external reference studio.
export function MosaicStudyPreview({ slug }: { slug: string }) {
    const fresh = newCovers[slug];
    const Art = conceptArt[slug];
    if (fresh) return <div className={`mosaic-site mockup-site mockup-${slug}`}>
        <div className="mockup-browser" aria-hidden="true"><i/><i/><i/><span>{slug}.studio</span></div>
        <div className="mockup-navigation"><b>{fresh.name}</b><span>{fresh.nav}</span></div>
        <div className="mockup-art" aria-hidden="true">{Art ? <Art/> : slug === 'aura' ? <Flower2/> : slug === 'mono' ? <div className="mockup-record"><AudioLines/></div> : slug === 'roam' ? <div className="mockup-sun"/> : slug === 'pulse' ? <MoveUpRight/> : slug === 'gallery-18' ? <div className="mockup-sculpture"><i/><i/><i/></div> : <Coffee/>}</div>
        <div className="mockup-headline">{fresh.line.split('\n').map(line => <span key={line}>{line}</span>)}</div>
        <p className="mockup-subtitle">{fresh.accent}</p>
        <span className="mockup-action">{fresh.action}<ArrowUpRight aria-hidden="true"/></span>
        <div className="mockup-bottom"><span>{fresh.name}</span><span>Scroll to explore ↓</span></div>
    </div>;
    const cover = covers[slug];
    if (!cover) return null;
    return <div className={`mosaic-site mosaic-site-${slug}`}>
        {cover.image && <img src={cover.image} alt={cover.alt || ''} width={1200} height={1000} loading="lazy"/>}
        <span className="mosaic-site-brand" translate="no">{cover.name}</span>
        <span className="mosaic-site-copy" aria-hidden="true">{cover.type.split('|').map(line => <span key={line}>{line}</span>)}</span>
        {slug === 'offgrid' && <Gamepad2 className="mosaic-gamepad" aria-hidden="true" strokeWidth={1.15}/>}
        {slug === 'muse' && <span className="mosaic-site-note" aria-hidden="true">Care / Rituals / About</span>}
    </div>;
}
