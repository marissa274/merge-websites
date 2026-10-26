// Lifecycle/interaction simulation, not a substitute for browser rendering.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync('app/cinematic-motion.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function run({ enabled = true, desktop = true, withoutStage = false } = {}) {
    const cleanups = [], timelines = [], observers = [], listeners = new Map();
    function target(name) {
        return { name, dataset: {}, hovered: false, focused: false,
            addEventListener(type, fn) { const key = `${name}:${type}`; if (!listeners.has(key)) listeners.set(key, new Set()); listeners.get(key).add(fn); },
            removeEventListener(type, fn) { listeners.get(`${name}:${type}`)?.delete(fn); },
            emit(type) { for (const fn of listeners.get(`${name}:${type}`) || []) fn(); },
            matches() { return this.hovered; }, contains(node) { return node === this; },
        };
    }
    const document = { ...target('document'), hidden: false, activeElement: null, documentElement: { dataset: { motion: enabled ? 'full' : 'reduced' } }, fonts: { ready: Promise.resolve() } };
    const window = { ...target('window'), scrollY: 0, innerHeight: 900 };
    const art = { getBoundingClientRect: () => ({ left: 20, top: 120, width: 600, height: 550 }) };
    const cards = Array.from({ length: 3 }, (_, i) => ({ name: `card${i}`, querySelector: () => art }));
    const stage = { ...target('stage'), querySelectorAll: selector => selector === '.bento-project' ? cards : [], getBoundingClientRect: () => ({ left: 20, top: 120, width: 1100, height: 600 }) };
    const notes = Array.from({ length: 6 }, (_, i) => ({ ...target(`note${i}`), querySelector: () => target(`float${i}`) }));
    const equalizer = target('equalizer');
    const root = { querySelector: selector => selector === '.cinema-stage' && withoutStage ? null : ({ '.cinema-stage': stage, '.vibe-equalizer': equalizer })[selector] || target(selector), querySelectorAll: selector => selector === '.vibe-bar' ? notes : [] };
    const gsap = { registerPlugin() {}, set() {}, from() {},
        timeline(options = {}) {
            const timeline = { options, steps: [], stopped: !!options.paused,
                from(...args) { this.steps.push(args); return this; },
                fromTo(...args) { this.steps.push(args); return this; },
                to(...args) { this.steps.push(args); return this; },
                totalTime(value) { this.phase = value; return this; },
                paused(value) { this.stopped = value; return this; },
                progress(value) { this.position = value; return this; },
                scrollTrigger: options.scrollTrigger ? { kill() { timeline.killed = true; } } : undefined,
            }; timelines.push(timeline); return timeline;
        },
        matchMedia() { return { add(queries, callback) { const cleanup = callback({ conditions: { desktop, mobile: !desktop, short: false } }); this.cleanup = cleanup; }, revert() { this.cleanup?.(); timelines.forEach(t => t.reverted = true); } }; },
    };
    class IntersectionObserver { constructor(callback) { this.callback = callback; observers.push(this); } observe() {} disconnect() { this.disconnected = true; } }
    const exports = {};
    vm.runInNewContext(code, { exports, window, document, IntersectionObserver,
        matchMedia: query => ({ matches: query.includes('hover: hover'), addEventListener() {}, removeEventListener() {} }),
        require(name) {
            if (name === 'react') return { useState: () => [enabled, () => {}], useRef: () => ({ current: false }), useEffect: fn => cleanups.push(fn()) };
            if (name === 'gsap') return { gsap };
            if (name === '@gsap/react') return { useGSAP: fn => cleanups.push(fn()) };
            if (name === 'gsap/ScrollTrigger') return { ScrollTrigger: { refresh() {} } };
            throw Error(name);
        },
    });
    exports.CinematicMotion({ scope: { current: root } });
    return { timelines, observers, notes, stage, document, window, listeners, cleanup: () => cleanups.reverse().forEach(fn => fn?.()) };
}
const desktop = run();
const notes = desktop.timelines.filter(t => t.options.repeat === -1);
assert.equal(notes.length, 6);
assert.equal(new Set(notes.map(t => t.phase)).size, 6, 'independent starting phases');
assert.equal(new Set(notes.map(t => t.steps.reduce((sum, step) => sum + step[1].duration, 0) + stepRest(t))).size, 6, 'independent phrase lengths');
function stepRest(t) { return t.steps[0][2]; }
assert.ok(notes.every(t => t.stopped), 'off-screen notes do not consume animation work');
desktop.observers[0].callback([{ isIntersecting: true }]);
assert.ok(notes.every(t => !t.stopped));
desktop.notes[2].hovered = true; desktop.notes[2].emit('pointerenter');
assert.equal(notes[2].stopped, true); assert.equal(notes[1].stopped, false);
desktop.document.activeElement = desktop.notes[1]; desktop.notes[1].emit('focusin');
assert.equal(notes[1].stopped, true, 'keyboard target remains still');
desktop.document.hidden = true; desktop.document.emit('visibilitychange');
assert.ok(notes.every(t => t.stopped), 'hidden-tab animation is suspended');
const scene = desktop.timelines.find(t => t.options.scrollTrigger?.pin);
assert.ok(scene); desktop.stage.emit('focusin'); assert.equal(scene.killed, true); assert.equal(scene.position, 1, 'keyboard entry settles pinned scene');
desktop.cleanup();
assert.ok(desktop.observers.every(o => o.disconnected));
assert.ok([...desktop.listeners.values()].every(set => set.size === 0), 'no leaked interaction listeners');
assert.ok(desktop.timelines.every(t => t.reverted));
const reduced = run({ enabled: false }); assert.equal(reduced.timelines.length, 0, 'reduced motion creates no scene or loops'); reduced.cleanup();
const mobile = run({ desktop: false }); assert.ok(mobile.timelines.every(t => !t.options.scrollTrigger?.pin), 'mobile retains native unpinned scrolling'); mobile.cleanup();
console.log('PASS musical independence, visibility pause, individual focus/hover pause, keyboard escape from pin, cleanup, reduced motion and unpinned mobile');

const mosaicHome = run({ withoutStage: true });
assert.equal(mosaicHome.timelines.filter(t => t.options.repeat === -1).length,6,'musical capsules survive moving the mosaic under the hero');
assert.ok(mosaicHome.timelines.every(t => !t.options.scrollTrigger?.pin),'new Home mosaic does not mount the former pinned scene');
mosaicHome.cleanup();
console.log('PASS hero and musical capsules without the former cinema stage');
