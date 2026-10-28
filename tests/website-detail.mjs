import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {presentation,complete} from './product-presentation.mjs';
const require=createRequire(import.meta.url), exported={};let buyCount=0;
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/website-detail.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports:exported,Intl,require(name){
 if(name==='./website-demos'){const e={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/website-demos.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports:e,require});return e;}
 if(name==='./concept-site'){const e={},studies={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/studies.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:studies});vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/concept-site.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports:e,require:n=>n==='./studies'?studies:require(n)});return e;}
 if(name==='./product-presentation')return presentation;
 if(name==='./detail-motion')return {DetailMotion:()=>null};
 if(name==='./home-v2')return {MotionControl:()=>React.createElement('button',null,'Pause motion')};
 if(name==='./bento-preview')return {AnimatedPreview:()=>React.createElement('div',null,'Concept artwork')};
 if(name==='./collection-preview')return {MosaicStudyPreview:()=>React.createElement('div',null,'Concept artwork')};
 if(name==='./gallery-work')return {useGalleryPurchase:()=>({purchaseError:'',buy:()=>buyCount++})};
 return require(name);
}});
const product={id:'test',name:'Test Design',slug:'test-design',category:'Beauty',description:'An original website.',price:125000,license:'Single website',published:1,featured:0,image_id:'hero',tags:'[]'};
const project={...product,product,presentation:presentation.normalizePresentation({...complete,previews:[...complete.previews,{id:'tablet',role:'tablet',alt:'Tablet website screenshot'}],videos:Array.from({length:6},(_,i)=>({id:'demo-'+i,title:'Demonstration '+i,posterId:'poster-'+i}))})};
const render=(patch={},props={})=>renderToStaticMarkup(React.createElement(exported.WebsiteDetail,{project:{...project,...patch},...props}));
let html=render({}, {commerceReady:true,related:[{...product,id:'other',slug:'other',name:'Other design'},product,{...product,id:'draft',name:'Draft',published:0}]});
for(const text of ['One Website.','Three Devices.','Fully Responsive.','About This Website.','Included pages','Shop integration','React','Single website','Hosting','Make it yours.','Buy Now','Personalize','Watch Website Demo','You Might','Other design'])assert.ok(html.includes(text),text);
assert.ok(html.indexOf('detail-hero-purchase')<html.indexOf('website-demos'));
assert.ok(!html.includes('>Draft<'));assert.ok(!/<button[^>]*disabled[^>]*>Buy Now/.test(html));assert.ok(html.includes('/personalize/test-design'));assert.ok(html.includes('/contact?demo=test-design'));
assert.ok(html.includes('Review Homepage screenshot'));assert.ok(html.includes('data-detail-act'));assert.ok(html.includes('$1,250.00'));
assert.ok(render({}, {commerceReady:false}).includes('disabled=""'));
assert.ok(render({presentation:presentation.normalizePresentation({})},{commerceReady:true}).includes('Still to confirm:'));
html=render({concept:true,product:undefined,slug:'muse'},{commerceReady:true});
assert.ok(/<button[^>]*disabled[^>]*>Buy Now/.test(html));assert.ok(html.includes('not for sale'));assert.ok(html.includes('/personalize/custom?concept=muse'));assert.ok(!html.includes('private/'));
assert.equal(buyCount,0,'rendering never starts a purchase');
console.log('PASS editorial content order, screenshot controls, actual related products only, purchase readiness, concept disclosure and contextual action links');

assert.equal((render().match(/class="demo-card"/g)||[]).length,6);
assert.ok(!render().includes('<video'),'video payloads are not rendered until a demo is selected');
for(const role of ['desktop','mobile','tablet'])assert.ok(render().includes('data-device="'+role+'"'));
const ordered=['detail-hero-layout','detail-demo-section','detail-devices','detail-about','detail-included','detail-purchase-information','detail-purchase detail-shell','detail-related'];
const full=render({}, {related:[{...product,id:'other'}]});
for(let i=1;i<ordered.length;i++)assert.ok(full.indexOf(ordered[i-1])<full.indexOf(ordered[i]),ordered[i]);
assert.ok(!render().includes('Step inside'));assert.ok(!render().includes('Public screenshots can be visually recreated'));
console.log('PASS immediate hero purchase, six lazy demos, actual device roles, revised section order and reduced microcopy');

for(const markup of [render(),render({concept:true,product:undefined,slug:'muse'})])assert.ok(!markup.includes('collage')&&!markup.includes('scroll-composition'),'the overlapping screenshot collage is removed');

const devicePart=(markup,kind)=>{const start=markup.indexOf('data-device="'+kind+'"');assert.ok(start>0,kind);const end=markup.indexOf('</figure>',start);return markup.slice(start,end);};
html=render();
assert.ok(devicePart(html,'desktop').includes('/api/media/desktop')&&devicePart(html,'desktop').includes('laptop-base'),'laptop shows the dedicated desktop screenshot');
assert.ok(devicePart(html,'mobile').includes('/api/media/mobile'),'phone shows its own mobile preview beside the tablet');
assert.ok(devicePart(html,'tablet').includes('/api/media/tablet'),'tablet shows the dedicated tablet screenshot');
// Each device's own screen holds only its screenshot; the decorative companion phones repeat the same product's mobile capture.
const ownScreen=(markup,kind)=>{const part=devicePart(markup,kind),cut=part.indexOf('device-companion');return cut<0?part:part.slice(0,cut);};
for(const kind of ['desktop','mobile','tablet'])assert.ok(!new RegExp('/api/media/(?!'+kind+'\\b)').test(ownScreen(html,kind)),'no other screenshot inside '+kind);
const companions=html.match(/device-companion-(desktop|tablet)[\s\S]*?<\/div><\/div><\/div>/g)||[];
assert.equal(companions.length,1,'only the laptop has a decorative companion phone');
assert.ok(!devicePart(html,'tablet').includes('device-companion-tablet'),'no phone is overlaid on the tablet');
assert.ok(companions.every(c=>c.includes('/api/media/mobile')&&!/\/api\/media\/(?!mobile)/.test(c)&&c.includes('aria-hidden="true"')&&!c.includes('<button')),'companions repeat only the mobile capture, decoratively');
assert.ok(companions[0].includes('9:41')&&devicePart(html,'tablet').includes('tablet-home'),'laptop companion status bar and tablet home button');
assert.ok(html.indexOf('data-device="desktop"')<html.indexOf('device-pair')&&html.indexOf('data-device="mobile"')<html.indexOf('data-device="tablet"'),'laptop first, then mobile and tablet');
assert.ok(html.includes('>Mobile</figcaption>')&&html.includes('>Tablet</figcaption>'));
assert.ok(html.includes('Enlarge Test Design tablet preview')&&html.includes('draggable="false"'),'devices open a protected preview');
const heroOnly=render({presentation:presentation.normalizePresentation({previews:[{id:'hero',role:'hero',alt:'Homepage'}]})});
assert.ok(devicePart(heroOnly,'desktop').includes('/api/media/hero'),'desktop falls back to the same product hero');
assert.ok(!heroOnly.includes('device-companion'),'no companion phone without a mobile capture');
assert.ok(devicePart(heroOnly,'mobile').includes('Mobile screenshot coming soon'),'missing mobile capture keeps its honest placeholder');
assert.ok(devicePart(heroOnly,'tablet').includes('Tablet screenshot coming soon')&&!devicePart(heroOnly,'tablet').includes('/api/media/'));
assert.ok(render({presentation:presentation.normalizePresentation({})}).includes('Desktop screenshot coming soon'),'showcase still renders with no media');
const conceptHtml=render({concept:true,product:undefined,slug:'muse',presentation:presentation.normalizePresentation({})});
for(const kind of ['desktop','mobile','tablet'])assert.ok(devicePart(conceptHtml,kind).includes('concept-site')&&devicePart(conceptHtml,kind).includes('muse.')&&!devicePart(conceptHtml,kind).includes('/api/media/')&&!devicePart(conceptHtml,kind).includes('coming soon'),'concept renders its own live site on '+kind);
assert.equal((conceptHtml.match(/device-companion-/g)||[]).length,1,'only the laptop shows a companion concept phone');
assert.ok(conceptHtml.includes('9:41'));
const composed=render({presentation:presentation.normalizePresentation({previews:[{id:'tablet-art',role:'tablet',framing:'composed'}]})});
assert.ok(composed.includes('device-stage-composed')&&!devicePart(composed,'tablet').includes('device-body'),'finished mockups are not framed twice');
console.log('PASS laptop, phone and tablet each show only this product\'s own screenshot, with marked placeholders, concept honesty and protected enlargement');
