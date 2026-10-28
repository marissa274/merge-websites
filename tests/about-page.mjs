import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const exports = {};
const code = ts.transpileModule(fs.readFileSync('app/about-page.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
vm.runInNewContext(code, { exports, require });
const html = renderToStaticMarkup(React.createElement(exports.AboutPage, { story: 'My own story. <script>alert(1)</script>' }));
const top = html.indexOf('<figure');
const heading = html.indexOf('<h1');
const bottom = html.indexOf('<figure', top + 1);
assert.ok(top >= 0 && top < heading && heading < bottom, 'portraits bracket the text vertically in reading order');
assert.equal((html.match(/<figure/g) || []).length, 2);
assert.equal((html.match(/<h1/g) || []).length, 1);
for (const text of ['ABOUT', 'The Mind', 'MK lab', 'My ', 'Story', 'Philosophy', 'Process', 'Explore My Work', 'Contact Me']) assert.ok(html.includes(text), text);
assert.ok(html.includes('href="/collection"') && html.includes('href="/contact"'));
assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'the admin story remains escaped text');
assert.ok(!html.includes('<script>'));
const defaultHtml = renderToStaticMarkup(React.createElement(exports.AboutPage, {}));
assert.ok(defaultHtml.includes('MK lab is my space'), 'an empty admin story has readable content');
for (const placement of ['top', 'bottom']) {
    const path = `public/portraits/marissa-${placement}.png`;
    assert.ok(html.includes(`/portraits/marissa-${placement}.png`));
    const metadata = await sharp(path).metadata();
    const stats = await sharp(path).stats();
    assert.equal(metadata.hasAlpha, true, `${placement} portrait has real transparency`);
    assert.equal(stats.channels[3].min, 0);
    assert.ok(stats.channels[3].max > 250, 'the person is not erased by extraction');
    assert.equal(metadata.width / metadata.height, 2 / 3);
}
console.log('PASS About portrait order, headings, CTA routes, custom story escaping, fallback content and actual image transparency.');
