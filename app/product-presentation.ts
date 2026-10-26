// Public presentation data only. Media IDs are resolved against approved product media on the server.
export const PRESENTATION_ROLES = ['hero', 'desktop', 'mobile', 'tablet', 'detail'] as const;
export type PreviewRole = typeof PRESENTATION_ROLES[number];
export type Preview = { id: string; role: PreviewRole; alt: string; caption: string; framing?: 'screen' | 'composed'; mime?: string };
export type DemoVideo = { id: string; title: string; posterId: string; transcript: string };
export type Presentation = {
    palette: { background: string; ink: string; accent: string; accentInk: string };
    typography: 'editorial' | 'soft' | 'bold'; motion: 'calm' | 'crisp';
    statement: string; firstHeading: string; firstBody: string; detailHeading: string; detailBody: string; brandBody: string;
    pages: string[]; features: string[]; technologies: string[]; customization: string[];
    compatibility: string; deliveryFormat: string; delivery: string; hosting: string; deployment: string; documentation: string; recurring: string; licenseDetails: string;
    previews: Preview[]; videos: DemoVideo[]; videoId: string;
};
export const PALETTES = {
    pink: { background: '#f1c3cd', ink: '#572739', accent: '#572739', accentInk: '#fff8fb' },
    violet: { background: '#20162f', ink: '#f9f6f7', accent: '#ac91f5', accentInk: '#20162f' },
    coral: { background: '#ed7452', ink: '#422b22', accent: '#422b22', accentInk: '#fff8fb' },
    turquoise: { background: '#a9d9cd', ink: '#182c29', accent: '#182c29', accentInk: '#fff8fb' },
    lime: { background: '#d0f371', ink: '#09090b', accent: '#09090b', accentInk: '#d0f371' },
    yellow: { background: '#f7dc70', ink: '#422b22', accent: '#422b22', accentInk: '#fff8fb' },
    neutral: { background: '#17171b', ink: '#f9f6f7', accent: '#f6b6cd', accentInk: '#20201f' },
};
const string = (v: unknown, max = 1800) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const list = (v: unknown) => Array.isArray(v) ? [...new Set(v.map(x => string(x, 180)).filter(Boolean))].slice(0, 20) : [];
const hex = (v: unknown) => typeof v === 'string' && /^#[\da-f]{6}$/i.test(v) ? v : '';
export function contrast(a: string, b: string) {
    const luminance = (color: string) => { const rgb = color.slice(1).match(/../g)!.map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4); return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722; };
    const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
export function readable(background: string, proposed: string) { return contrast(background, proposed) >= 4.5 ? proposed : contrast(background, '#09090b') > contrast(background, '#fff8fb') ? '#09090b' : '#fff8fb'; }
export function normalizePresentation(raw: unknown, category = '', tone?: string): Presentation {
    const x = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
    const fallback = tone && Object.hasOwn(PALETTES, tone) ? PALETTES[tone as keyof typeof PALETTES] : /beauty|wellness/i.test(category) ? PALETTES.pink : /gaming|music/i.test(category) ? PALETTES.violet : /food|restaurant/i.test(category) ? PALETTES.coral : /fashion/i.test(category) ? PALETTES.turquoise : PALETTES.neutral;
    const palette = x.palette && typeof x.palette === 'object' ? x.palette as Record<string, unknown> : {};
    const background = hex(palette.background) || fallback.background, accent = hex(palette.accent) || fallback.accent;
    const videos: DemoVideo[] = (Array.isArray(x.videos) ? x.videos : x.videoId ? [{ id: x.videoId, title: 'Website walkthrough' }] : []).slice(0, 6).flatMap((value: unknown) => { if (!value || typeof value !== 'object') return []; const v = value as Record<string, unknown>; const id = string(v.id, 100); return id ? [{ id, title: string(v.title, 100) || 'Website walkthrough', posterId: string(v.posterId, 100), transcript: string(v.transcript, 5000) }] : []; });
    return {
        palette: { background, ink: readable(background, hex(palette.ink) || fallback.ink), accent, accentInk: readable(accent, hex(palette.accentInk) || fallback.accentInk) },
        typography: x.typography === 'soft' || x.typography === 'bold' || x.typography === 'editorial' ? x.typography : /beauty|wellness|food/i.test(category) ? 'soft' : /gaming/i.test(category) ? 'bold' : 'editorial', motion: x.motion === 'crisp' ? 'crisp' : 'calm',
        statement: string(x.statement, 300), firstHeading: string(x.firstHeading, 120), firstBody: string(x.firstBody), detailHeading: string(x.detailHeading, 120), detailBody: string(x.detailBody), brandBody: string(x.brandBody),
        pages: list(x.pages), features: list(x.features), technologies: list(x.technologies), customization: list(x.customization),
        compatibility: string(x.compatibility), deliveryFormat: string(x.deliveryFormat), delivery: string(x.delivery), hosting: string(x.hosting), deployment: string(x.deployment), documentation: string(x.documentation), recurring: string(x.recurring), licenseDetails: string(x.licenseDetails),
        previews: Array.isArray(x.previews) ? x.previews.slice(0, 12).flatMap((value: unknown) => { if (!value || typeof value !== 'object') return []; const p = value as Record<string, unknown>; return string(p.id, 100) && PRESENTATION_ROLES.includes(p.role as PreviewRole) ? [{ id: string(p.id, 100), role: p.role as PreviewRole, alt: string(p.alt, 300), caption: string(p.caption, 300), framing: p.framing === 'composed' ? 'composed' as const : 'screen' as const }] : []; }) : [],
        videos, videoId: videos[0]?.id || '',
    };
}
export function parsePresentation(value: string | undefined, category = '', tone?: string) { try { return normalizePresentation(JSON.parse(value || '{}'), category, tone); } catch { return normalizePresentation({}, category, tone); } }
export function presentationKey(id: string) { return `product:${id}:presentation`; }
export function resolvePreviews(presentation: Presentation, media: { id: string; mime: string }[], primary: string | null): Presentation {
    const images = new Map(media.filter(m => /^image\/(jpeg|png|webp|avif)$/.test(m.mime)).map(m => [m.id, m.mime]));
    const previews = presentation.previews.filter(p => images.has(p.id)).map(p => ({ ...p, mime: images.get(p.id)! }));
    if (!previews.some(p => p.role === 'hero') && primary && images.has(primary)) previews.unshift({ id: primary, role: 'hero', alt: '', caption: '', mime: images.get(primary)! });
    const videos = presentation.videos.filter(v => media.some(m => m.id === v.id && /^video\/(mp4|webm)$/.test(m.mime))).map(v => ({ ...v, posterId: images.has(v.posterId) ? v.posterId : '' }));
    return { ...presentation, previews, videos, videoId: videos[0]?.id || '' };
}
export function purchaseGaps(p: Presentation) {
    return [!p.delivery && 'Delivery timing', !p.deliveryFormat && 'Delivery format', !p.hosting && 'Hosting requirements', !p.recurring && 'Recurring costs', !p.licenseDetails && 'License terms', !p.pages.length && 'Included pages', !p.features.length && 'Included functionality'].filter((x): x is string => !!x);
}
