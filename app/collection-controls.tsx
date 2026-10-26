'use client';
import { useRef, useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import { Search, SlidersHorizontal, X, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { SORT_OPTIONS, STYLE_OPTIONS, type Filters } from './collection-model';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.6 };
type Panel = 'Category' | 'Style' | 'Price' | 'Discover' | 'Sort';
export function CollectionControls({ filters, categories, active, update, toggle, reset }: { filters: Filters; categories: string[]; active: number; update: (patch: Partial<Filters>) => void; toggle: (key: 'categories' | 'styles', value: string) => void; reset: () => void }) {
    const [searchOpen, setSearchOpen] = useState(!!filters.query), [open, setOpen] = useState(false), [panel, setPanel] = useState<Panel | null>(null);
    const input = useRef<HTMLInputElement>(null), searchButton = useRef<HTMLButtonElement>(null);
    const invalid = Number(filters.min) < 0 || Number(filters.max) < 0 || (!!filters.min && !!filters.max && Number(filters.min) > Number(filters.max));
    function closeSearch() { setSearchOpen(false); searchButton.current?.focus(); }
    const summaries = { Category: filters.categories.length ? `${filters.categories.length} selected` : 'All', Style: filters.styles.length ? `${filters.styles.length} selected` : 'All', Price: filters.min || filters.max ? `${filters.min || '0'}–${filters.max || 'Any'}` : 'Any budget', Discover: filters.fresh || filters.purchased ? 'Selected' : 'All designs', Sort: SORT_OPTIONS.find(([key]) => key === filters.sort)?.[1] || 'Curated order' };
    return <div className="collection-discovery" aria-label="Collection search and filters">
        <div className="icon-search" data-open={searchOpen} onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); closeSearch(); } }}>
            <div className="search-reveal" inert={!searchOpen}><label className="visually-hidden" htmlFor="v2-search">Search by name, niche, or vibe</label><input ref={input} id="v2-search" type="search" autoComplete="off" value={filters.query} placeholder="Find your website…" onChange={e => update({ query: e.target.value })}/>{filters.query && <button className="nav-icon" aria-label="Clear search" onClick={() => update({ query: '' })}><X {...ip}/></button>}</div>
            <button ref={searchButton} className="discovery-icon" aria-label={searchOpen ? 'Close search' : 'Open search'} aria-expanded={searchOpen} aria-controls="v2-search" onClick={() => { if (searchOpen) closeSearch(); else { setSearchOpen(true); requestAnimationFrame(() => input.current?.focus()); } }}>{searchOpen ? <X {...ip}/> : <Search {...ip}/>}</button>
        </div>
        <Popover.Root open={open} onOpenChange={value => { setOpen(value); if (!value) setPanel(null); }}>
            <Popover.Trigger className="discovery-icon filter-icon" aria-label={active ? `Filters, ${active} active` : 'Filters'}><SlidersHorizontal {...ip}/>{active > 0 && <span>{active}</span>}</Popover.Trigger>
            <Popover.Portal><Popover.Positioner align="end" sideOffset={12} className="discovery-positioner"><Popover.Popup className="discovery-menu">
                <div className="discovery-menu-heading">{panel && <button className="nav-icon" aria-label="Back to filter options" onClick={() => setPanel(null)}><ArrowLeft {...ip}/></button>}<Popover.Title>{panel || 'Make it yours'}</Popover.Title><Popover.Close className="nav-icon" aria-label="Close filters"><X {...ip}/></Popover.Close></div>
                <div className="discovery-menu-body" key={panel || 'root'}>
                    {!panel && (Object.keys(summaries) as Panel[]).map(item => <button className="discovery-row" key={item} onClick={() => setPanel(item)}><span>{item}<small>{summaries[item]}</small></span><ChevronRight {...ip}/></button>)}
                    {(panel === 'Category' || panel === 'Style') && (panel === 'Category' ? categories : STYLE_OPTIONS).map(value => { const key = panel === 'Category' ? 'categories' : 'styles'; const selected = filters[key].includes(value); return <button className="discovery-row discovery-choice" key={value} aria-pressed={selected} onClick={() => toggle(key, value)}>{value}<span className="discovery-tick">{selected && <Check {...ip}/>}</span></button>; })}
                    {panel === 'Sort' && SORT_OPTIONS.map(([value, label]) => <button key={value} className="discovery-row discovery-choice" aria-pressed={filters.sort === value} onClick={() => update({ sort: value })}>{label}<span className="discovery-tick">{filters.sort === value && <Check {...ip}/>}</span></button>)}
                    {panel === 'Price' && <div className="discovery-budget"><div className="gallery-price-fields">{(['min', 'max'] as const).map(key => <div className="field" key={key}><label htmlFor={`${key}-price`}>{key === 'min' ? 'From' : 'To'} · CAD</label><input id={`${key}-price`} type="number" min="0" step="0.01" inputMode="decimal" placeholder={key === 'min' ? '0' : 'Any'} value={filters[key]} aria-invalid={invalid} aria-describedby="budget-note" onChange={e => update({ [key]: e.target.value })}/></div>)}</div><p id="budget-note" className={invalid ? 'error' : 'filter-note'}>{invalid ? 'Maximum must be at least the minimum. Use positive amounts.' : 'Applies to websites with a listed price.'}</p></div>}
                    {panel === 'Discover' && <div className="discovery-budget"><label className="gallery-check"><input type="checkbox" checked={filters.fresh} onChange={e => update({ fresh: e.target.checked })}/>New in the last 30 days</label><label className="gallery-check"><input type="checkbox" checked={filters.purchased} onChange={e => update({ purchased: e.target.checked })}/>With confirmed purchases</label></div>}
                </div>
                <div className="discovery-menu-footer"><button className="plain" onClick={reset}>Clear all</button><Popover.Close className="discovery-done">Done<Check {...ip}/></Popover.Close></div>
            </Popover.Popup></Popover.Positioner></Popover.Portal>
        </Popover.Root>
    </div>;
}
