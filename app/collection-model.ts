import type { Product } from './ui';
import { studies } from './studies';

export const TONES = ['pink', 'violet', 'coral', 'lime', 'turquoise', 'yellow', 'neutral'] as const;
export type Tone = typeof TONES[number];
export function dominantTone(samples: { tone: Tone; area: number; centrality: number }[], current: Tone = 'neutral'): Tone {
    const scores = new Map<Tone, number>();
    for (const sample of samples) {
        if (!Number.isFinite(sample.area) || sample.area <= 0 || !Number.isFinite(sample.centrality)) continue;
        const score = sample.area * Math.max(0, Math.min(1, sample.centrality));
        scores.set(sample.tone, (scores.get(sample.tone) || 0) + score);
    }
    const winner = [...scores].sort((a, b) => b[1] - a[1])[0];
    if (!winner || winner[1] <= 0) return 'neutral';
    // Keep the current color through near-ties instead of flickering at row boundaries.
    return (scores.get(current) || 0) >= winner[1] * .9 ? current : winner[0];
}
export const STYLE_OPTIONS = ['Minimal', 'Bold', 'Editorial', 'Playful', 'Elegant', 'Immersive'] as const;
export const SORT_OPTIONS = [['featured', 'Curated order'], ['newest', 'Newest first'], ['popular', 'Most popular'], ['price-low', 'Price: low to high'], ['price-high', 'Price: high to low'], ['name', 'Name: A–Z']] as const;
export type Filters = { query: string; categories: string[]; styles: string[]; min: string; max: string; sort: string; fresh: boolean; purchased: boolean };
export const EMPTY_FILTERS: Filters = { query: '', categories: [], styles: [], min: '', max: '', sort: 'featured', fresh: false, purchased: false };
export type Entry = { id: string; slug: string; name: string; category: string; description: string; styles: string[]; tone: Tone; kind: 'product' | 'study'; price: number | null; created: number | null; popularity: number; featured: number; legacy?: boolean; product?: Product };
const fold = (s: string) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function tagsFor(raw: string): string[] { try { const tags: unknown = JSON.parse(raw); return Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string') : []; } catch { return []; } }
export function buildEntries(products: Product[]): Entry[] {
    const tones: Tone[] = ['pink', 'violet', 'coral', 'turquoise', 'pink', 'violet', 'yellow', 'lime', 'turquoise', 'coral', 'pink', 'turquoise', 'yellow', 'violet', 'coral', 'lime'];
    const styles = [['Elegant', 'Minimal'], ['Bold', 'Immersive'], ['Playful', 'Editorial'], ['Bold', 'Editorial'], ['Elegant', 'Minimal'], ['Bold', 'Immersive'], ['Playful', 'Editorial'], ['Bold', 'Minimal'], ['Editorial', 'Immersive'], ['Elegant', 'Playful'], ['Elegant', 'Minimal'], ['Editorial', 'Elegant'], ['Minimal', 'Editorial'], ['Bold', 'Editorial'], ['Elegant', 'Playful'], ['Bold', 'Immersive']];
    const concepts = studies.map((s, i) => ({ ...s, id: `study-${s.slug}`, styles: styles[i], tone: tones[i], kind: 'study' as const, price: null, created: null, popularity: 0, featured: 0 }));
    return [
        ...products.map(p => ({ id: `product-${p.id}`, slug: p.slug, name: p.name, category: p.category, description: `${p.description} ${tagsFor(p.tags).join(' ')}`, styles: STYLE_OPTIONS.filter(style => tagsFor(p.tags).some(tag => fold(tag.replace(/^style:/i, '').trim()) === fold(style))), tone: 'neutral' as Tone, kind: 'product' as const, price: p.price, created: p.created_at || null, popularity: p.purchase_count || 0, featured: p.featured, product: p })),
        ...concepts.slice(0, 4),
        { id: 'study-forma', slug: 'forma', name: 'Forma', category: 'Business', description: 'Architecture, interiors and thoughtful spaces. A quietly confident editorial concept.', styles: ['Minimal', 'Elegant'], tone: 'yellow', kind: 'study', price: null, created: null, popularity: 0, featured: 0, legacy: true },
        { id: 'study-still-life', slug: 'still-life', name: 'Still / Life', category: 'Creative', description: 'Objects, stories and the art of the everyday. An independent lifestyle journal.', styles: ['Editorial', 'Minimal'], tone: 'coral', kind: 'study', price: null, created: null, popularity: 0, featured: 0, legacy: true },
        ...concepts.slice(4),
    ];
}
function budget(value: string | null) { return value && /^\d+(\.\d{0,2})?$/.test(value) && Number.isFinite(Number(value)) ? value : ''; }
export function readFilters(search: string): Filters {
    const q = new URLSearchParams(search);
    return { query: q.get('q') || '', categories: (q.get('category') || '').split(',').filter(Boolean), styles: (q.get('style') || '').split(',').filter(s => STYLE_OPTIONS.some(x => x === s)), min: budget(q.get('min')), max: budget(q.get('max')), sort: SORT_OPTIONS.some(([key]) => key === q.get('sort')) ? q.get('sort')! : 'featured', fresh: q.get('new') === '1', purchased: q.get('purchased') === '1' };
}
export function filterURL(f: Filters) {
    const q = new URLSearchParams();
    if (f.query) q.set('q', f.query);
    if (f.categories.length) q.set('category', f.categories.join(','));
    if (f.styles.length) q.set('style', f.styles.join(','));
    if (f.min) q.set('min', f.min);
    if (f.max) q.set('max', f.max);
    if (f.sort !== 'featured') q.set('sort', f.sort);
    if (f.fresh) q.set('new', '1');
    if (f.purchased) q.set('purchased', '1');
    return `/collection${q.size ? `?${q}` : ''}`;
}
export function filterEntries(entries: Entry[], f: Filters, now = Date.now()) {
    const min = Number(f.min) * 100, max = Number(f.max) * 100;
    if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) return [];
    if (f.min && f.max && min > max) return [];
    return entries.filter(e => (!f.categories.length || f.categories.includes(e.category)) && (!f.styles.length || f.styles.some(s => e.styles.includes(s))) && fold(`${e.name} ${e.category} ${e.description} ${e.styles.join(' ')}`).includes(fold(f.query.trim())) && (!f.min || (e.price !== null && e.price >= min)) && (!f.max || (e.price !== null && e.price <= max)) && (!f.fresh || (e.created !== null && e.created >= now - 30 * 86400000 && e.created <= now)) && (!f.purchased || e.popularity > 0)).sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'product' ? -1 : 1;
        const tie = a.name.localeCompare(b.name);
        switch (f.sort) {
            case 'newest': return (b.created || 0) - (a.created || 0) || tie;
            case 'popular': return b.popularity - a.popularity || b.featured - a.featured || tie;
            case 'price-low': return (a.price ?? Infinity) - (b.price ?? Infinity) || tie;
            case 'price-high': return (b.price ?? -Infinity) - (a.price ?? -Infinity) || tie;
            case 'name': return tie;
            default: return b.featured - a.featured;
        }
    });
}
// Sample only loaded, same-origin artwork. Neutral imagery keeps a neutral surround.
export function artworkTone(data: ArrayLike<number>): Tone {
    const buckets = new Map<number, number>();
    for (let i = 0; i + 3 < data.length; i += 4) {
        const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        if (data[i + 3] < 128 || d < .15 || max < .22) continue;
        let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h = (h * 60 + 360) % 360;
        const bucket = Math.floor(h / 30);
        buckets.set(bucket, (buckets.get(bucket) || 0) + d);
    }
    const hue = [...buckets].sort((a, b) => b[1] - a[1])[0]?.[0];
    return hue === undefined ? 'neutral' : hue < 1 ? 'coral' : hue < 3 ? 'yellow' : hue < 5 ? 'lime' : hue < 8 ? 'turquoise' : hue < 10 ? 'violet' : 'pink';
}
