import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function moduleAt(path) {
    const exports = {};
    vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, URLSearchParams, require: name => { if (name === './studies') return moduleAt('app/studies.ts'); throw Error(name); } });
    return exports;
}
export const model = moduleAt('app/collection-model.ts');
const { buildEntries, EMPTY_FILTERS, filterEntries, readFilters, filterURL, artworkTone, tagsFor } = model;
const now = Date.UTC(2026, 9, 25);
export const products = [
    { id:'one',slug:'rose',name:'Rosé',category:'Beauty',description:'A quiet skincare studio',tags:'["style:Elegant","Minimal"]',price:9000,featured:1,published:1,image_id:'rose',created_at:now-86400000,purchase_count:2 },
    { id:'two',slug:'play',name:'Play',category:'Gaming',description:'A bold gaming world',tags:'["Bold","Immersive"]',price:15000,featured:0,published:1,image_id:'play',created_at:now-60*86400000,purchase_count:12 },
    { id:'three',slug:'fresh',name:'Fresh',category:'Food & drink',description:'Restaurant launch',tags:'malformed JSON',price:5000,featured:0,published:1,image_id:null,created_at:now-10*86400000,purchase_count:0 },
];
const entries = buildEntries(products);
assert.equal(entries.length,21); assert.equal(entries.filter(e=>e.kind==='study').length,18);
const find = patch => filterEntries(entries,{...EMPTY_FILTERS,...patch},now);
assert.equal(find({query:'rose'})[0].name,'Rosé','accent-insensitive search');
assert.equal(find({query:'immersive'})[0].name,'Play','search includes style tags');
assert.equal(find({categories:['Food & drink'],styles:['Editorial']})[0].slug,'sunday','category AND style; study styles are curated');
assert.ok(find({min:'50',max:'90'}).every(e=>e.price!==null&&e.price>=5000&&e.price<=9000),'unknown concept prices are never treated as zero');
assert.equal(find({min:'100',max:'20'}).length,0); assert.equal(find({min:'-5'}).length,0);
assert.equal(find({fresh:true}).length,2,'newest uses actual dates; undated concepts excluded');
assert.equal(find({purchased:true}).length,2,'purchased filter uses positive counts');
assert.equal(find({sort:'popular'})[0].slug,'play'); assert.equal(find({sort:'newest'})[0].slug,'rose');
assert.equal(find({sort:'price-low'})[0].slug,'fresh'); assert.equal(find({sort:'price-high'})[0].slug,'play');
assert.equal(tagsFor('[]').length,0); assert.equal(tagsFor('{"not":"an array"}').length,0);
const state={...EMPTY_FILTERS,query:'pink & bold',categories:['Food & drink','Beauty'],styles:['Editorial'],min:'25.50',max:'200',sort:'popular',fresh:true,purchased:true};
assert.equal(JSON.stringify(readFilters(filterURL(state).split('?')[1])),JSON.stringify(state),'shareable filter URL round trip');
assert.equal(readFilters('?sort=unknown&min=-20&max=NaN&style=unknown').sort,'featured');
assert.equal(readFilters('?min=-20').min,'');
assert.equal(artworkTone([246,182,205,255]),'pink','pink artwork does not get an orange surround');
assert.equal(artworkTone([255,100,60,255]),'coral');
assert.equal(artworkTone([90,55,200,255]),'violet');
assert.equal(artworkTone([128,128,128,255]),'neutral');
assert.equal(artworkTone([255,0,0,0]),'neutral','transparent pixels do not tint cards');
console.log('PASS catalog completeness, accent/style search, combined filters, real-date/popularity sorting, unknown prices, invalid budgets, URL state and artwork palette');
const {dominantTone}=model;
assert.equal(dominantTone([{tone:'pink',area:900,centrality:1},{tone:'violet',area:300,centrality:1}]),'pink','large visible surface outweighs small fully-visible card');
assert.equal(dominantTone([{tone:'pink',area:300,centrality:.3},{tone:'coral',area:240,centrality:1}]),'coral','central artwork has priority over a departing edge');
assert.equal(dominantTone([{tone:'pink',area:300,centrality:1},{tone:'pink',area:300,centrality:1},{tone:'violet',area:500,centrality:1}]),'pink','same-color projects contribute together');
assert.equal(dominantTone([{tone:'pink',area:95,centrality:1},{tone:'violet',area:100,centrality:1}],'pink'),'pink','near-ties do not flicker');
assert.equal(dominantTone([{tone:'pink',area:80,centrality:1},{tone:'violet',area:100,centrality:1}],'pink'),'violet','clear changes advance the atmosphere');
assert.equal(dominantTone([{tone:'pink',area:NaN,centrality:1}]),'neutral');
assert.equal(dominantTone([],'pink'),'neutral','no stale color after empty filtering');
console.log('PASS dominant atmosphere by visible area/centrality, grouped colors, hysteresis and empty-state reset');

assert.deepEqual(Array.from(buildEntries([]).slice(0,6), e=>e.slug), ['muse','offgrid','sunday','studio-09','forma','still-life']);
assert.ok(entries.filter(e=>e.kind==='study').every(e=>e.tone && e.styles.length));
