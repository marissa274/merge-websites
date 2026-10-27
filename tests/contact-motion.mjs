import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function fixture() {
    const refs = [], effects = [], pending = [], timelines = [], observers = [], events = new Map();
    let refIndex = 0, effectIndex = 0, initialized = false, cleanup, focused = 0;
    const document = { hidden: false, addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name) };
    const scene = {}, handset = {}, base = {}, cords = [{ setAttribute() {} }], waves = [{}];
    const panel = { querySelectorAll: () => [{}], querySelector: () => ({ focus() { focused++; } }) };
    const host = { querySelector: selector => selector.endsWith('h2') ? panel.querySelector() : selector.includes('data-phone-scene') ? scene : selector.includes('data-handset') ? handset : selector.includes('data-phone-base') ? base : panel, querySelectorAll: selector => selector.includes('data-phone-cord') ? cords : waves };
    class Timeline {
        constructor() { this.position = 0; this.running = false; this.callbacks = {}; this.steps = []; timelines.push(this); }
        to(...step) { this.steps.push(step); return this; }
        fromTo(...step) { this.steps.push(step); return this; }
        eventCallback(name, fn) { this.callbacks[name] = fn; return this; }
        progress(value) { if (value === undefined) return this.position; this.position = value; return this; }
        pause() { this.running = false; return this; }
        resume() { this.running = true; return this; }
        restart() { this.position = 0; this.running = true; return this; }
        play() { this.running = true; this.direction = 'forward'; return this; }
        reverse() { this.running = true; this.direction = 'reverse'; return this; }
        timeScale() { return this; }
        kill() { this.running = false; this.killed = true; }
    }
    class Observer { constructor(callback) { this.callback = callback; observers.push(this); } observe(node) { this.node = node; } disconnect() { this.disconnected = true; } }
    const gsap = { timeline: () => new Timeline(), set() {}, matchMedia: () => { let dispose; return { add: (conditions, callback) => { dispose = callback({ conditions: { desktop: true } }); }, revert: () => dispose?.() }; } };
    const exports = {};
    vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/contact-motion.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, {
        exports, document, IntersectionObserver: Observer,
        require(name) {
            if (name === 'gsap') return { gsap };
            if (name === '@gsap/react') return { useGSAP: fn => { if (!initialized) { initialized = true; cleanup = fn(); } } };
            if (name === 'react') return {
                useRef: initial => refs[refIndex++] ||= { current: initial },
                useLayoutEffect: fn => fn(),
                useEffect(fn, deps) { const index = effectIndex++; if (!effects[index] || deps.some((value, i) => value !== effects[index][i])) { effects[index] = deps; pending.push(fn); } },
            };
            throw Error(name);
        },
    });
    const scope = { current: host };
    const render = (open = false, motion = true, ringing = true) => { refIndex = 0; effectIndex = 0; exports.useTelephoneMotion(scope, open, motion, ringing); pending.splice(0).forEach(fn => fn()); };
    return { render, timelines, observers, events, document, scene, handset, cleanup: () => cleanup?.(), focused: () => focused };
}
const f = fixture(); f.render();
const [ring, pickup] = f.timelines;
assert.equal(ring.running, true, 'ringing starts after mounting and initial closed-state synchronization');
assert.equal(f.observers[0].node, f.scene, 'only the visible telephone controls ringing');
f.render(true);
assert.equal(ring.running, false);
assert.equal(pickup.direction, 'forward');
assert.ok(pickup.steps.some(([node, vars]) => node === f.handset && vars.xPercent < 0 && vars.rotation === -90), 'the floating handset arranges itself vertically on the left');
pickup.progress(.4); f.render(false);
assert.equal(pickup.direction, 'reverse', 'closing mid-lift reverses the same transition');
assert.equal(f.timelines.length, 2, 'state changes do not duplicate timelines');
pickup.progress(0); pickup.callbacks.onReverseComplete();
assert.equal(ring.running, true);
f.render(false, true, false); assert.equal(ring.running, false, 'pause control stops ringing');
f.render(false, true, true); assert.equal(ring.running, true);
f.observers[0].callback([{ isIntersecting: false }]); assert.equal(ring.running, false);
f.observers[0].callback([{ isIntersecting: true }]); assert.equal(ring.running, true);
f.document.hidden = true; f.events.get('visibilitychange')(); assert.equal(ring.running, false);
f.cleanup(); assert.ok(ring.killed && pickup.killed && f.observers[0].disconnected); assert.equal(f.events.size, 0);
const reduced = fixture(); reduced.render(true, false);
assert.equal(reduced.timelines.length, 0, 'reduced motion creates no ringing or pickup animation');
assert.equal(reduced.focused(), 1, 'reduced-motion opening focuses the form immediately');
console.log('PASS telephone motion: initial ring, independent lift, interrupted reverse, pause/resume, offscreen and hidden-tab suspension, cleanup and reduced-motion focus.');
