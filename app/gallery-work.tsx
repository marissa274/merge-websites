'use client';
import { useEffect, useRef, useState } from 'react';
import { Eye, ShoppingBag, Paintbrush, ArrowUpRight } from 'lucide-react';
import type { Product } from './ui';
import { MosaicStudyPreview } from './collection-preview';
import { artworkTone, type Entry, type Tone } from './collection-model';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.6 };
const money = (cents: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);

export function GalleryWork({ entry, onBuy }: { entry: Entry; onBuy: (p: Product) => void }) {
    const [tone, setTone] = useState<Tone>(entry.tone);
    const image = useRef<HTMLImageElement>(null);
    const href = entry.kind === 'study' ? `/concepts/${entry.slug}` : `/collection/${entry.slug}`;
    function sampleImage(image: HTMLImageElement) {
        try {
            const canvas = document.createElement('canvas'); canvas.width = 24; canvas.height = 24;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (!context) return;
            context.drawImage(image, 0, 0, 24, 24);
            setTone(artworkTone(context.getImageData(0, 0, 24, 24).data));
        } catch { /* The neutral surround remains safe when artwork cannot be sampled. */ }
    }
    useEffect(() => { if (image.current?.complete && image.current.naturalWidth) sampleImage(image.current); }, [entry.id]);
    return <article className={`exhibit-work${entry.legacy ? ' exhibit-legacy' : ''}`} data-work={entry.id} data-tone={tone} aria-labelledby={`${entry.id}-name`}>
        <div className="exhibit-card">
        <div className="exhibit-visual">
            <a className="exhibit-preview" href={href} aria-label={`Preview ${entry.name}`}>
                {entry.product ? entry.product.image_id ? <img ref={image} src={`/api/media/${entry.product.image_id}`} alt={`${entry.name} website preview`} width={1200} height={900} loading="lazy" onLoad={event => sampleImage(event.currentTarget)}/> : <div className="exhibit-placeholder"><strong>{entry.name}</strong><span>Preview image coming soon</span></div> : <MosaicStudyPreview slug={entry.slug}/>}
            </a>
            <div className="exhibit-actions" aria-label={`${entry.name} actions`}>
                <a href={href}><Eye {...ip}/><span>Preview</span></a>
                {entry.product ? <button onClick={() => onBuy(entry.product!)}><ShoppingBag {...ip}/><span>Buy now</span></button> : <button disabled aria-describedby={`${entry.id}-status`}><ShoppingBag {...ip}/><span>Buy now</span></button>}
                <a href={entry.product ? `/personalize/${entry.slug}` : `/personalize/custom?concept=${encodeURIComponent(entry.slug)}`} aria-label={`Personalize ${entry.name}`}><Paintbrush {...ip}/><span>Personalize</span></a>
            </div>
        </div>
        <div className="exhibit-caption"><div><h3 id={`${entry.id}-name`}><a href={href}>{entry.name}</a></h3><p>{entry.category}<span aria-hidden="true"> / </span><span>{entry.styles[0] || 'Website'}</span></p></div><div className="exhibit-price"><span id={`${entry.id}-status`}>{entry.price === null ? 'Concept · preview only' : `${money(entry.price)} CAD`}</span><a href={href} className="exhibit-arrow" aria-label={`Explore ${entry.name}`}><ArrowUpRight {...ip}/></a></div></div>
        </div>
    </article>;
}

export function useGalleryPurchase() {
    const [purchaseError, setPurchaseError] = useState('');
    function buy(product: Product) {
        try {
            const stored: unknown = JSON.parse(localStorage.getItem('mek-bag') || '[]');
            const bag = Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : [];
            if (!bag.includes(product.id) && bag.length >= 20) { setPurchaseError('Your bag is full. Review it before adding another website.'); return; }
            if (!bag.includes(product.id)) bag.push(product.id);
            localStorage.setItem('mek-bag', JSON.stringify(bag)); window.dispatchEvent(new Event('mek-bag')); location.assign('/checkout');
        } catch { setPurchaseError('Your browser could not save this website to your bag. Open its preview to try again.'); }
    }
    return { purchaseError, buy };
}
