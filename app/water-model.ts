export type WaterLayout = {
    width: number;
    viewport: number;
    heroBottom: number;
    galleryTop: number;
    galleryBottom: number;
    aboutTop: number;
    aboutHeight: number;
    finalTop: number;
    finalHeight: number;
};
export type WaterFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    opacity: number;
    hero: number;
    about: number;
    fall: number;
    spread: number;
    label: number;
    phase: 'surface' | 'emerge' | 'collection' | 'about' | 'fall' | 'splash' | 'footer';
};
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (v: number) => { v = clamp(v); return v * v * (3 - 2 * v); };
export const DROP_OUTLINE = 'M58 4C59 29 94 58 96 87C99 115 81 137 55 137C28 137 12 116 15 89C17 64 48 36 58 4Z';
/** A single teardrop. The hero surface never follows the cursor or has a filled contour. */
export function waterFrame(scroll: number, l: WaterLayout, reduced = false): WaterFrame {
    const mobile = l.width < 640, baseHeight = mobile ? 80 : 112;
    const start = Math.max(32, l.heroBottom - l.viewport * .88);
    const emerged = Math.max(start + 140, l.heroBottom - l.viewport * .43);
    const entrance = smooth((scroll - start) / (emerged - start));
    const aboutStart = Math.max(emerged + 1, l.aboutTop - l.viewport * .82);
    const aboutEnd = Math.max(aboutStart + 1, l.aboutTop - l.viewport * .24);
    const about = smooth((scroll - aboutStart) / (aboutEnd - aboutStart));
    const fallStart = Math.max(aboutEnd + 1, l.aboutTop + l.aboutHeight * .08);
    const impact = Math.max(fallStart + 180, l.finalTop - l.viewport * .65);
    const settled = Math.max(impact + 180, l.finalTop - l.viewport * .04);
    const fall = clamp((scroll - fallStart) / (impact - fallStart));
    const spread = smooth((scroll - impact) / (settled - impact));
    const side = mobile ? 26 : 40, aboutX = mobile ? 34 : Math.max(48, l.width * .075);
    let x = mix(l.width * .76, l.width - side, entrance);
    let y = scroll < emerged ? mix(l.heroBottom - 76, emerged + l.viewport * .43, entrance) : scroll + l.viewport * .43;
    let height = baseHeight, width = baseHeight * .64, tilt = mix(-9, 4, entrance);
    x = mix(x, aboutX, about);
    y = mix(y, scroll + l.viewport * .36, about);
    tilt = mix(tilt, -6, about);
    if (fall > 0) {
        x = mix(aboutX, l.width * .5, smooth(fall));
        height = baseHeight * (1 + .28 * Math.sin(fall * Math.PI * .5));
        width = baseHeight * .64 * (1 - .14 * fall);
        const impactCenter = l.finalTop + 64 - baseHeight * 1.28 * .5;
        y = mix(fallStart + l.viewport * .36, impactCenter, fall * fall);
        tilt = mix(-6, 0, smooth(fall));
    }
    const label = smooth((scroll - l.galleryTop + l.viewport * .3) / 180) * (1 - about);
    const phase = spread >= 1 ? 'footer' : spread > 0 ? 'splash' : fall > 0 ? 'fall' : about > 0 ? 'about' : entrance >= 1 ? 'collection' : entrance > 0 ? 'emerge' : 'surface';
    if (reduced)
        return { x: l.width * .5, y: l.finalTop, width: 0, height: 0, tilt: 0, opacity: 0, hero: 0, about: 1, fall: 1, spread: 1, label: 0, phase: 'footer' };
    return { x, y, width, height, tilt, opacity: entrance * (1 - smooth(spread / .24)), hero: 1 - entrance, about, fall, spread, label, phase };
}
/** Unfilled wave fronts expand from a fixed point of contact, never track a cursor. */
export function surfaceWave(x: number, y: number, age: number, strength = 1, mobile = false): string {
    const radius = (mobile ? 14 : 20) + age * (mobile ? 74 : 125) * (.75 + strength * .25);
    const points = Array.from({ length: 32 }, (_, i) => {
        const a = i / 32 * Math.PI * 2;
        const ripple = Math.sin(a * 5 - age * 5) * Math.exp(-age) * (1 + strength);
        return { x: x + Math.cos(a) * (radius + ripple), y: y + Math.sin(a) * radius * .30 + Math.sin(a * 3 + age * 2) * .7 };
    });
    return closedWave(points);
}
function closedWave(points: {
    x: number;
    y: number;
}[]) {
    const fmt = (n: number) => n.toFixed(2), n = points.length;
    let d = `M${fmt(points[0].x)} ${fmt(points[0].y)}`;
    for (let i = 0; i < n; i++) {
        const a = points[(i - 1 + n) % n], b = points[i], c = points[(i + 1) % n], e = points[(i + 2) % n];
        d += `C${fmt(b.x + (c.x - a.x) / 6)} ${fmt(b.y + (c.y - a.y) / 6)} ${fmt(c.x - (e.x - b.x) / 6)} ${fmt(c.y - (e.y - b.y) / 6)} ${fmt(c.x)} ${fmt(c.y)}`;
    }
    return d + 'Z';
}
/** Accumulated water is a restrained horizontal surface; only the impact creates a crest. */
export function footerWater(l: WaterLayout, spread: number, energy: number, scroll: number): string {
    const p = clamp(spread), half = mix(30, l.width * .5 + 48, 1 - Math.pow(1 - p, 3));
    const left = l.width * .5 - half, right = l.width * .5 + half;
    const top = l.finalTop + 64 - scroll - 24 * p, bottom = top + mix(6, l.finalHeight + 90, p);
    const wave = (u: number) => top + Math.sin(u * Math.PI * 2 - .6) * (3 + energy * 6) + Math.sin(u * Math.PI * 4) * energy * 3;
    let d = `M${left.toFixed(2)} ${wave(0).toFixed(2)}`;
    for (let i = 0; i < 8; i++) {
        const u = i / 8, v = (i + 1) / 8, x = left + half * 2 * u, nx = left + half * 2 * v, step = (nx - x) / 3;
        d += `C${(x + step).toFixed(2)} ${wave(u + (v - u) / 3).toFixed(2)} ${(nx - step).toFixed(2)} ${wave(v - (v - u) / 3).toFixed(2)} ${nx.toFixed(2)} ${wave(v).toFixed(2)}`;
    }
    return d + `L${right.toFixed(2)} ${bottom.toFixed(2)}H${left.toFixed(2)}Z`;
}
export function splashFan(x: number, y: number, age: number, mobile = false): string {
    const t = clamp(age / 850), r = (mobile ? 120 : 260) * (1 - Math.pow(1 - t, 3)), h = Math.sin(t * Math.PI) * (mobile ? 30 : 55);
    return `M${x - r} ${y}C${x - r * .70} ${y - 4} ${x - r * .48} ${y - h} ${x - r * .32} ${y - h}C${x - r * .20} ${y - h} ${x - r * .15} ${y - h * .14} ${x} ${y - h * .14}C${x + r * .15} ${y - h * .14} ${x + r * .20} ${y - h} ${x + r * .32} ${y - h}C${x + r * .48} ${y - h} ${x + r * .70} ${y - 4} ${x + r} ${y}`;
}
