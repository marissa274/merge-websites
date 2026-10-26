'use client';
import { useMemo, useRef } from 'react';
import type { Product } from './ui';
import { buildEntries } from './collection-model';
import { GalleryWork, useGalleryPurchase } from './gallery-work';

export function HomeMosaic({ products }: { products: Product[] }) {
    const root = useRef<HTMLDivElement>(null);
    const entries = useMemo(() => buildEntries(products).filter(entry => !products.length || entry.kind === 'product').slice(0, 6), [products]);
    const { purchaseError, buy } = useGalleryPurchase();
    return <div ref={root} className="home-mosaic-gallery gallery-surface">
        {purchaseError && <p className="error" role="alert">{purchaseError} <a href="/cart">View bag</a></p>}
        <div className="editorial-gallery" data-count={entries.length} aria-label="Featured website designs">
            {entries.map(entry => <GalleryWork key={entry.id} entry={entry} onBuy={buy}/>)}
        </div>
    </div>;
}
