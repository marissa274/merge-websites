import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
function load(path, extra = {}) {
    const exports = {};
    vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText, { exports, require: name => extra[name] || require(name) });
    return exports;
}
const personalization = load('app/personalize-model.ts');
const model = load('app/pricing-model.ts', { './personalize-model': personalization });
const products = [{ price: 125000, published: 1 }, { price: 79000, published: 1 }, { price: 100, published: 0 }, { price: -100, published: 1 }, { price: NaN, published: 1 }];
const settings = { personalizationPrice: '250', personalizationPricing: JSON.stringify({ 'pages-extra': 15000, 'logo-design': 40000, 'feature-booking': 99999 }) };
const prices = model.pricingOverview(products, settings);
assert.equal(prices.template, 79000, 'starting price comes only from valid published websites');
assert.equal(prices.setup, 25000, 'configured setup dollars are converted to cents');
assert.equal(prices.addons.find(item => item.id === 'pages-extra').amount, 15000);
assert.equal(prices.addons.find(item => item.id === 'feature-booking').amount, null, 'complex integrations stay quoted');
assert.equal(model.pricingOverview([], {}).template, null);
assert.equal(model.pricingOverview([], { personalizationPrice: '-4' }).setup, null);
assert.equal(model.pricingOverview([], { personalizationPrice: 'not a price' }).setup, null);

const page = load('app/pricing-page.tsx', { './pricing-model': model, './personalize-model': personalization });
const html = renderToStaticMarkup(React.createElement(page.PricingPage, { products, settings }));
assert.equal((html.match(/data-pricing-offer=/g) || []).length, 3);
assert.ok(html.includes('$790.00') && html.includes('$250.00') && html.includes('$150.00'));
assert.ok(html.includes('Template price and selected extras are separate'), 'personalization setup cannot be mistaken for an all-in website price');
assert.ok(html.includes('<table') && html.includes('scope="row"') && html.includes('<caption'));
for (const text of ['Ready-made', 'Personalized', 'Custom-made', 'Simple Pricing.', 'Beautiful Results.', 'Delivery', 'Hosting', 'License', 'Maintenance', 'Choose Your Website', 'Get a Quote']) assert.ok(html.includes(text), text);
for (const href of ['/collection', '/personalize/custom', '/contact']) assert.ok(html.includes(`href="${href}"`), href);
const empty = renderToStaticMarkup(React.createElement(page.PricingPage, { products: [], settings: {} }));
assert.ok(!/\$\d/.test(empty), 'missing business prices never turn into invented fees');
assert.ok(empty.includes('Per design') && empty.includes('On quote'));
console.log('PASS pricing: published price floor, configured setup/add-ons, quote-only integrations, transparent exclusions, semantic comparison and empty-price behavior.');
