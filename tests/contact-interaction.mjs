// Component handlers and motion geometry; does not claim browser/pixel verification.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';

function compile(path, require, globals = {}) {
    const exports = {};
    vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, require, ...globals });
    return exports;
}
const jsx = { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
const model = compile('app/contact-model.ts', () => { throw Error('Unexpected import'); });
const states = [], refs = []; let cursor = 0, refCursor = 0;
const react = { useRef: value => refs[refCursor++] ||= { current: value }, useState: initial => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], value => states[index] = typeof value === 'function' ? value(states[index]) : value]; }, useEffect() {} };
const motion = compile('app/contact-motion.ts', name => name === 'react' ? react : name === 'gsap' ? { gsap: {} } : { useGSAP() {} });
assert.equal(motion.telephoneCord(0).split(' L').length, 121);
assert.ok(motion.telephoneCord(0).startsWith('M175.00,445.00'));
const attachment = motion.telephoneCord(1).split(' L').at(-1).split(',').map(Number);
assert.ok(attachment[0] > 330 && attachment[0] < 334 && attachment[1] > 645 && attachment[1] < 650, 'cord stays attached to the bottom of the vertical receiver');
assert.ok(!/NaN|Infinity/.test(motion.telephoneCord(.5)));
const imports = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return jsx;
    if (name === 'lucide-react') return new Proxy({}, { get: () => () => null });
    if (name === './contact-motion') return { telephoneCord: motion.telephoneCord, useTelephoneMotion: () => ({ boost() {} }) };
    if (name === './contact-form') return { TelephoneContactForm: function TelephoneContactForm() {} };
    if (name === './contact-model') return model;
    throw Error(name);
};
const page = compile('app/contact-page.tsx', imports);
const walk = node => !node || typeof node !== 'object' ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(walk)];
const render = () => { cursor = 0; refCursor = 0; return page.ContactPage({}); };
let tree = render();
const find = predicate => walk(tree).find(predicate);
assert.equal(find(n => n.props?.['data-contact-panel'] === true).props.inert, true);
find(n => n.props?.['aria-label'] === 'Open contact form').props.onClick(); tree = render();
assert.equal(tree.props['data-open'], true);
assert.equal(find(n => n.props?.['data-contact-panel'] === true).props.inert, false);
find(n => n.props?.['data-handset'] === true).props.onClick(); tree = render();
assert.equal(tree.props['data-open'], false);
find(n => n.props?.['data-handset'] === true).props.onClick(); tree = render();
assert.equal(tree.props['data-open'], true, 'the visual handset opens the same conversation as the explicit button');
find(n => n.type?.name === 'TelephoneContactForm').props.onClose(); tree = render();
assert.equal(tree.props['data-open'], false, 'putting down the phone closes the form');

states.length = 0; refs.length = 0;
let response = { ok: false, json: async () => ({ error: 'Inbox unavailable.' }) }, requests = 0;
const payload = { name: 'Visitor Name', email: 'visitor@example.com', subject: 'General Question', message: 'A real question for the studio.', website: '' };
const formModule = compile('app/contact-form.tsx', imports, {
    FormData: class { entries() { return Object.entries(payload)[Symbol.iterator](); } },
    fetch: async () => { requests++; return response; },
    requestAnimationFrame: fn => fn(),
});
const renderForm = () => { cursor = 0; refCursor = 0; return formModule.TelephoneContactForm({ onClose() {} }); };
tree = renderForm();
let resets = 0;
const event = { preventDefault() {}, currentTarget: { reset() { resets++; }, querySelector() { return null; } } };
await walk(tree).find(n => n.type === 'form').props.onSubmit(event); tree = renderForm();
assert.equal(resets, 0, 'failed submissions keep the message');
assert.ok(walk(tree).some(n => n.props?.role === 'alert' && n.props.children === 'Inbox unavailable.'));
response = { ok: true, json: async () => ({ ok: true, message: 'Saved in the studio inbox.' }) };
await walk(tree).find(n => n.type === 'form').props.onSubmit(event); tree = renderForm();
assert.equal(resets, 1);
assert.ok(walk(tree).some(n => n.props?.role === 'status'));
assert.equal(requests, 2);
for (const part of ['base', 'handset']) {
    const image = sharp(`public/contact/telephone-${part}.png`);
    assert.equal((await image.metadata()).hasAlpha, true);
    assert.equal((await image.stats()).channels[3].min, 0);
}
console.log('PASS telephone open/close buttons, inactive closed form, cable geometry, honest form failure/success, message retention and separate transparent telephone assets.');
