'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, SlidersHorizontal, X, Check, ChevronDown, ArrowUpRight, ArrowDown } from 'lucide-react';
import { CollectionControls } from './collection-controls';
import type { Product } from './ui';
import { MotionControl } from './home-v2';
import { GalleryWork, useGalleryPurchase } from './gallery-work';
import { GalleryAtmosphere } from './gallery-motion';
import { buildEntries, EMPTY_FILTERS, filterEntries, filterURL, readFilters, SORT_OPTIONS, STYLE_OPTIONS, type Filters } from './collection-model';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.6 };
const PAGE_SIZE = 18;

export function CollectionV2({ products, initialSearch = '' }: { products: Product[]; initialSearch?: string }) {
    const root = useRef<HTMLElement>(null), loadButton = useRef<HTMLButtonElement>(null);
    const pendingFocus = useRef(false);
    const [filters, setFilters] = useState<Filters>(() => readFilters(initialSearch)), [limit, setLimit] = useState(PAGE_SIZE);
    const { purchaseError, buy } = useGalleryPurchase();
    const entries = useMemo(() => buildEntries(products), [products]);
    const filtered = useMemo(() => filterEntries(entries, filters), [entries, filters]);
    const visible = filtered.slice(0, limit);
    const categories = [...new Set(entries.map(e => e.category))];
    const active = filters.categories.length + filters.styles.length + Number(!!filters.min || !!filters.max) + Number(filters.fresh) + Number(filters.purchased);
    const signature = visible.map(e => e.id).join('|');
    useEffect(() => {
        const host = root.current;
        if (!host) return;
        const sync = () => { host.dataset.galleryScrolled = String(window.scrollY > 120); };
        sync(); window.addEventListener('scroll', sync, { passive: true });
        return () => { window.removeEventListener('scroll', sync); delete host.dataset.galleryScrolled; };
    }, []);
    useEffect(() => {
        const read = () => { setFilters(readFilters(location.search)); setLimit(PAGE_SIZE); };
        read(); window.addEventListener('popstate', read);
        return () => window.removeEventListener('popstate', read);
    }, []);
    useEffect(() => {
        if (pendingFocus.current) { root.current?.querySelector<HTMLAnchorElement>(`[data-work="${filtered[limit - PAGE_SIZE]?.id}"] .exhibit-preview`)?.focus(); pendingFocus.current = false; }
    }, [limit, filtered]);
    function update(patch: Partial<Filters>) {
        const next = { ...filters, ...patch }; setFilters(next); setLimit(PAGE_SIZE);
        history.replaceState(history.state, '', filterURL(next));
    }
    function toggle(key: 'categories' | 'styles', value: string) { update({ [key]: filters[key].includes(value) ? filters[key].filter(x => x !== value) : [...filters[key], value] }); }
    function reset() { update({ ...EMPTY_FILTERS }); }
    return <main id="main" ref={root} className="collection-v2 collection-gallery-page collection-shelf gallery-surface expressive-shell">
        <GalleryAtmosphere scope={root} signature={signature}/>
        <header className="collection-editorial-intro"><div><h1>Explore Our<br className="collection-title-break"/> Collection<span aria-hidden="true">✳</span></h1></div><CollectionControls filters={filters} categories={categories} active={active} update={update} toggle={toggle} reset={reset}/></header>
        <section className="collection-tools gallery-tools" aria-label="Selected filters">
            {filters.query && <div className="active-filters"><button onClick={() => update({ query: '' })}>Search: {filters.query}<X {...ip}/><span className="visually-hidden">Clear search</span></button></div>}
            {active > 0 && <div className="active-filters">{filters.categories.map(c => <button key={c} onClick={() => toggle('categories', c)}>{c}<X {...ip}/><span className="visually-hidden">Remove category</span></button>)}{filters.styles.map(style => <button key={style} onClick={() => toggle('styles', style)}>{style}<X {...ip}/><span className="visually-hidden">Remove style</span></button>)}{(filters.min || filters.max) && <button onClick={() => update({ min: '', max: '' })}>{filters.min || '0'}–{filters.max || 'Any'} CAD<X {...ip}/><span className="visually-hidden">Remove price filter</span></button>}{filters.fresh && <button onClick={() => update({ fresh: false })}>New this month<X {...ip}/><span className="visually-hidden">Remove newest filter</span></button>}{filters.purchased && <button onClick={() => update({ purchased: false })}>Purchased<X {...ip}/><span className="visually-hidden">Remove popularity filter</span></button>}<button className="clear-all" onClick={reset}>Clear all</button></div>}
        </section>
        <div className="collection-results-meta gallery-results-meta"><MotionControl/></div>
        {purchaseError && <p role="alert" className="error">{purchaseError} <a href="/cart">View bag</a></p>}
        {visible.length > 0 && <section className="editorial-gallery" data-count={visible.length} aria-label="Website projects">{visible.map(entry => <GalleryWork key={entry.id} entry={entry} onBuy={buy}/>)}</section>}
        {!filtered.length && <div className="gallery-no-results"><Search {...ip}/><h2>No websites match this mix.</h2><p>Try another name, style or category, or open up your budget.</p><button className="pill-link" onClick={reset}>Clear search & filters<X {...ip}/></button></div>}
        <div className="gallery-load-more"><p className="visually-hidden" role="status" aria-live="polite">Showing {visible.length} of {filtered.length} projects</p>{visible.length < filtered.length ? <button ref={loadButton} className="pill-link filled" onClick={e => { pendingFocus.current = e.detail === 0; setLimit(n => n + PAGE_SIZE); }}>Load more designs<ArrowDown {...ip}/></button> : filtered.length > 0 && <a className="gallery-custom-link" href="/personalize/custom">A different idea in mind? Let’s make it.<ArrowUpRight {...ip}/></a>}</div>
    </main>;
}
