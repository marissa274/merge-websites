// Personalization brief: what a customer can ask for and how the estimate is built.
// No price is invented here. A priced option uses the studio's own price from the admin setting `personalizationPricing`;
// without one it is shown as quoted. Complex options are always quoted, and the server recomputes every estimate.
export type ChoiceKind = 'included' | 'priced' | 'quote';
export type Choice = { id: string; label: string; hint?: string; kind: ChoiceKind };
export type Model = { kind: 'product' | 'concept'; slug: string; name: string; category: string; image?: string; price?: number | null; productId?: string; palette?: { background: string; ink: string; accent: string; accentInk: string } };
export const SINGLE = {
    logo: { legend: 'Logo', choices: [{ id: 'logo-own', label: 'Use my logo', hint: 'You send the files', kind: 'included' }, { id: 'logo-design', label: 'Design a new logo', hint: 'A simple wordmark or symbol', kind: 'priced' }] },
    colors: { legend: 'Colors', choices: [{ id: 'colors-template', label: 'Keep the template colors', kind: 'included' }, { id: 'colors-brand', label: 'Apply my brand colors', hint: 'Choose up to three below', kind: 'priced' }] },
    type: { legend: 'Typography', choices: [{ id: 'type-template', label: 'Keep the template fonts', kind: 'included' }, { id: 'type-brand', label: 'Use my brand fonts', hint: 'Licensed web fonts you own', kind: 'priced' }] },
    images: { legend: 'Images', choices: [{ id: 'images-own', label: 'I’ll provide my images', kind: 'included' }, { id: 'images-stock', label: 'Source licensed stock images', kind: 'priced' }, { id: 'images-shoot', label: 'Arrange a photo shoot', hint: 'Planned with you', kind: 'quote' }] },
    copy: { legend: 'Texts', choices: [{ id: 'copy-own', label: 'I’ll provide all texts', kind: 'included' }, { id: 'copy-edit', label: 'Edit and adapt my texts', kind: 'priced' }, { id: 'copy-write', label: 'Write the texts for me', kind: 'priced' }] },
} satisfies Record<string, { legend: string; choices: Choice[] }>;
export type SingleKey = keyof typeof SINGLE;
export const PAGE: Choice = { id: 'pages-extra', label: 'Additional page', kind: 'priced' };
export const MAX_PAGES = 10;
export const FEATURES: Choice[] = [
    { id: 'feature-forms', label: 'Contact & quote forms', kind: 'priced' },
    { id: 'feature-newsletter', label: 'Newsletter sign-up', kind: 'priced' },
    { id: 'feature-booking', label: 'Online booking', hint: 'Calendar, services, reminders', kind: 'quote' },
    { id: 'feature-payments', label: 'Online payments or shop', hint: 'Products, checkout, taxes', kind: 'quote' },
    { id: 'feature-multilingual', label: 'Multilingual website', kind: 'quote' },
    { id: 'feature-other', label: 'Another integration', hint: 'Describe it below', kind: 'quote' },
];
export const BUDGETS = ['Under $1,500', '$1,500 – $3,000', '$3,000 – $6,000', '$6,000 and more', 'Not sure yet'] as const;
export const ALL_CHOICES: Choice[] = [...Object.values(SINGLE).flatMap(group => group.choices as Choice[]), PAGE, ...FEATURES];
export const PRICED = ALL_CHOICES.filter(choice => choice.kind === 'priced');
export type Pricing = Record<string, number>;
export type Brief = {
    model: { kind: Model['kind']; slug: string } | null;
    choices: Record<SingleKey, string>;
    palette: string[];
    pages: number; pageNames: string;
    business: { company: string; sector: string; info: string };
    features: string[]; featureNotes: string;
    budget: string;
    contact: { name: string; email: string; notes: string };
};
export const emptyBrief = (model: Brief['model'] = null, contact: Partial<Brief['contact']> = {}): Brief => ({
    model, choices: Object.fromEntries(Object.entries(SINGLE).map(([key, group]) => [key, group.choices[0].id])) as Record<SingleKey, string>,
    palette: ['#572739', '#f1c3cd', '#fff8fb'], pages: 0, pageNames: '', business: { company: '', sector: '', info: '' }, features: [], featureNotes: '', budget: '',
    contact: { name: contact.name || '', email: contact.email || '', notes: '' },
});
const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const hex = (value: unknown) => typeof value === 'string' && /^#[\da-f]{6}$/i.test(value) ? value.toLowerCase() : '';
export const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// Accepts only known choices and bounded text, whatever the client sends.
const field = (value: unknown, key: string): unknown => value && typeof value === 'object' ? (value as Record<string, unknown>)[key] : undefined;
export function sanitizeBrief(raw: unknown): Brief {
    const base = emptyBrief(), get = (key: string) => field(raw, key);
    const kind = field(get('model'), 'kind'), slug = text(field(get('model'), 'slug'), 100);
    const model = (kind === 'product' || kind === 'concept') && slug ? { kind, slug } as Brief['model'] : null;
    const choices = Object.fromEntries((Object.keys(SINGLE) as SingleKey[]).map(key => { const wanted = field(get('choices'), key); return [key, (SINGLE[key].choices as Choice[]).some(c => c.id === wanted) ? wanted : base.choices[key]]; })) as Record<SingleKey, string>;
    const pages = Math.min(MAX_PAGES, Math.max(0, Math.floor(Number(get('pages')) || 0)));
    const list = (value: unknown) => Array.isArray(value) ? value as unknown[] : [];
    const budget = get('budget');
    return {
        model, choices, palette: list(get('palette')).map(hex).filter(Boolean).slice(0, 3), pages, pageNames: pages ? text(get('pageNames'), 500) : '',
        business: { company: text(field(get('business'), 'company'), 120), sector: text(field(get('business'), 'sector'), 120), info: text(field(get('business'), 'info'), 2000) },
        features: [...new Set(list(get('features')).filter((id): id is string => FEATURES.some(f => f.id === id)))],
        featureNotes: text(get('featureNotes'), 1500), budget: (BUDGETS as readonly unknown[]).includes(budget) ? budget as string : '',
        contact: { name: text(field(get('contact'), 'name'), 100), email: text(field(get('contact'), 'email'), 200), notes: text(field(get('contact'), 'notes'), 3000) },
    };
}
export function parsePricing(value: string | undefined): Pricing {
    try { const raw = JSON.parse(value || '{}'); return Object.fromEntries(PRICED.flatMap(choice => { const cents = Math.round(Number(raw?.[choice.id])); return Number.isFinite(cents) && cents > 0 ? [[choice.id, cents]] : []; })); }
    catch { return {}; }
}
export type Line = { id: string; label: string; amount: number | null };
export type Estimate = { lines: Line[]; total: number; quoted: boolean };
const find = (id: string) => ALL_CHOICES.find(choice => choice.id === id)!;
// Known amounts add up; anything quoted, or priced without a studio price, makes the result a starting estimate.
export function estimate(brief: Brief, pricing: Pricing, base: number, model?: Model | null): Estimate {
    const lines: Line[] = [];
    if (model) lines.push({ id: 'template', label: `${model.name} template`, amount: model.kind === 'product' && model.price ? model.price : null });
    lines.push({ id: 'base', label: 'Personalization setup', amount: base > 0 ? base : null });
    const add = (choice: Choice, count = 1) => { if (choice.kind === 'included') return; const unit = choice.kind === 'priced' ? pricing[choice.id] : undefined; lines.push({ id: choice.id, label: count > 1 ? `${choice.label} × ${count}` : choice.label, amount: unit ? unit * count : null }); };
    (Object.keys(SINGLE) as SingleKey[]).forEach(key => add(find(brief.choices[key])));
    if (brief.pages > 0) add(PAGE, brief.pages);
    brief.features.forEach(id => add(find(id)));
    return { lines, total: lines.reduce((sum, line) => sum + (line.amount || 0), 0), quoted: lines.some(line => line.amount === null) };
}
const cad = (cents: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);
export const formatAmount = (amount: number | null) => amount === null ? 'On quote' : cad(amount);
// A plain-text brief for the studio, stored with the request and shown in the account and admin.
export function describeBrief(brief: Brief, result: Estimate, model?: Model | null) {
    const label = (id: string) => find(id).label;
    const rows = [
        `Model: ${model ? `${model.name} (${model.kind === 'product' ? 'website' : 'concept'})` : 'Not chosen'}`,
        `Logo: ${label(brief.choices.logo)}`, `Colors: ${label(brief.choices.colors)}${brief.choices.colors === 'colors-brand' && brief.palette.length ? ` ${brief.palette.join(', ')}` : ''}`,
        `Typography: ${label(brief.choices.type)}`, `Images: ${label(brief.choices.images)}`, `Texts: ${label(brief.choices.copy)}`,
        `Additional pages: ${brief.pages}${brief.pageNames ? ` (${brief.pageNames})` : ''}`,
        brief.business.company && `Company: ${brief.business.company}`, brief.business.sector && `Activity: ${brief.business.sector}`, brief.business.info && `Business details: ${brief.business.info}`,
        `Features: ${brief.features.length ? brief.features.map(label).join(', ') : 'None'}`, brief.featureNotes && `Feature notes: ${brief.featureNotes}`,
        `Budget: ${brief.budget || 'Not given'}`,
        `Estimate: ${result.total ? `${cad(result.total)}${result.quoted ? ' + quoted items' : ''}` : 'On quote'}`,
        `Contact: ${brief.contact.name} <${brief.contact.email}>`, brief.contact.notes && `Notes: ${brief.contact.notes}`,
    ];
    return rows.filter(Boolean).join('\n');
}
