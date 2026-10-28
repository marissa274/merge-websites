import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const require=createRequire(import.meta.url);
const load=(file,stubs={})=>{const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,Intl,Response,URL,crypto,console,require:name=>stubs[name]??require(name)});return exports;};
const model=load('app/personalize-model.ts');
const {emptyBrief,estimate,sanitizeBrief,parsePricing,describeBrief,PRICED,FEATURES}=model;
const product={kind:'product',slug:'bloom',name:'Bloom Studio',category:'Beauty',price:125000,productId:'p1'};

// Estimate: known studio prices add up; anything without a price, or complex, stays on quote.
let brief=emptyBrief({kind:'product',slug:'bloom'});
let result=estimate(brief,{},0,product);
assert.deepEqual([...result.lines.map(l=>l.amount)],[125000,null]);assert.equal(result.total,125000);assert.ok(result.quoted,'no setup price set yet: quoted');
const pricing=parsePricing(JSON.stringify({'logo-design':40000,'pages-extra':15000,'feature-forms':10000,'feature-booking':99999,unknown:5,'copy-edit':-3}));
assert.deepEqual({...pricing},{'logo-design':40000,'pages-extra':15000,'feature-forms':10000},'only known priced options with positive prices; complex options cannot be priced');
brief={...brief,choices:{...brief.choices,logo:'logo-design'},pages:2,features:['feature-forms']};
result=estimate(brief,pricing,90000,product);
assert.equal(result.total,125000+90000+40000+30000+10000);assert.equal(result.quoted,false,'everything chosen has a price');
result=estimate({...brief,features:['feature-forms','feature-booking']},pricing,90000,product);
assert.ok(result.quoted,'booking is always quoted');assert.equal(result.lines.find(l=>l.id==='feature-booking').amount,null);
assert.equal(estimate(brief,pricing,90000,{kind:'concept',slug:'muse',name:'MUSE',category:'Beauty'}).lines[0].amount,null,'concept templates are priced by quote');
assert.ok(PRICED.every(c=>c.kind==='priced')&&FEATURES.filter(f=>f.kind==='quote').length===4);
console.log('PASS estimate: studio prices only, per-page pricing, complex options always quoted, concepts on quote');

// Sanitize: unknown choices, oversized text, bad colors and fake features are dropped.
const clean=sanitizeBrief({model:{kind:'product',slug:'bloom'},choices:{logo:'logo-gold-plated',colors:'colors-brand'},palette:['#AABBCC','red','#123456','#000000','#ffffff'],pages:99,pageNames:'x'.repeat(900),features:['feature-forms','feature-forms','feature-hack'],budget:'A million',contact:{name:' Ana ',email:'ana@example.test',notes:'n'}});
assert.equal(clean.choices.logo,'logo-own');assert.equal(clean.choices.colors,'colors-brand');assert.deepEqual([...clean.palette],['#aabbcc','#123456','#000000']);
assert.equal(clean.pages,10);assert.equal(clean.pageNames.length,500);assert.deepEqual([...clean.features],['feature-forms']);assert.equal(clean.budget,'');assert.equal(clean.contact.name,'Ana');
assert.equal(sanitizeBrief({model:{kind:'admin',slug:'x'}}).model,null);assert.equal(sanitizeBrief('nonsense').choices.copy,'copy-own');
const text=describeBrief(clean,estimate(clean,pricing,0,product),product);
for(const part of ['Model: Bloom Studio (website)','Colors: Apply my brand colors #aabbcc, #123456, #000000','Additional pages: 10','Features: Contact & quote forms','Contact: Ana <ana@example.test>'])assert.ok(text.includes(part),part);
console.log('PASS brief sanitizing (choices, palette, pages, features, budget, text bounds) and readable studio summary');

// Page: the website chosen on its Personalize button is the one personalized; no picker.
const page=load('app/personalize.tsx',{'./personalize-model':model,'./concept-site':{ConceptSite:p=>React.createElement('div',{className:'concept-site-stub'},p.slug+'@'+p.viewport)}});
const muse={kind:'concept',slug:'muse',name:'MUSE',category:'Beauty',image:'/beauty.jpg',palette:{background:'#f1c3cd',ink:'#572739',accent:'#572739',accentInk:'#fff8fb'}};
const render=props=>renderToStaticMarkup(React.createElement(page.Personalize,{model:{...product,image:'/api/media/hero'},pricing,base:90000,user:{fullName:'Ana',email:'ana@example.test'},...props}));
let html=render();
for(const title of ['Visual identity','Content','Features','Budget &amp; estimate','Your details','Review'])assert.ok(html.includes('>'+title+'</h2>'),title);
assert.equal((html.match(/class="pz-step" hidden=""/g)||[]).length,5,'only one of six stages is visible');
assert.ok(!html.includes('name="model"')&&!html.includes('MUSE'),'no website picker: only the chosen website');
assert.ok(html.includes('/api/media/hero')&&html.includes('Bloom Studio')&&html.includes('href="/collection/bloom"')&&html.includes('Change website'));
assert.ok(html.includes('Request Customization')&&!html.includes('Sign in to request'));
assert.ok(html.includes('+$400.00')&&html.includes('On quote')&&html.includes('Included'),'each option shows its price, quote or inclusion');
assert.ok(html.includes('$2,150.00'),'estimate = template + setup');assert.ok(html.includes('value="Ana"')&&html.includes('value="ana@example.test"'));
html=render({user:null,base:0,model:muse});
assert.ok(html.includes('muse@desktop'),'a concept shows its own live website');assert.ok(html.includes('href="/concepts/muse"'));
assert.ok(html.includes('Sign in to request')&&html.includes(encodeURIComponent('/personalize/custom?concept=muse')),'sign-in returns to the same website');
assert.ok(html.includes('Every item is priced by the studio'),'a concept with no setup price is fully quoted');
html=render({model:null});
assert.ok(html.includes('Choose a website first.')&&html.includes('href="/collection"')&&!html.includes('Request Customization'),'without a website, the visitor is sent to the collection');
console.log('PASS Personalize page: the chosen website only, live concept preview, per-option prices, live estimate, sign-in return and no-website state');

// API: the server recomputes the estimate from settings and stores a readable brief.
const inserts=[];let user={userId:'u1',email:'ana@example.test'};
const database={prepare(sql){return{sql,args:[],bind(...a){this.args=a;return this;},async first(){return sql.includes('FROM products')&&this.args[0]==='bloom'?{id:'p1',slug:'bloom',name:'Bloom Studio',category:'Beauty',price:125000}:null;},async run(){if(sql.startsWith('INSERT INTO customizations'))inserts.push(this.args);},async all(){return{results:[]};}};},async batch(){return[];}};
const route=load('app/api/market/route.ts',{'../../product-presentation':{normalizePresentation:x=>x,presentationKey:x=>x},'cloudflare:workers':{env:{}},'../../personalize-model':model,'../../collection-model':{buildEntries:()=>[{kind:'study',slug:'muse',name:'MUSE',category:'Beauty'}]},'../../data':{db:()=>database,currentUser:async()=>user,upsertUser:async()=>{},isAdmin:()=>false,getSettings:async()=>({personalizationPrice:'900',personalizationPricing:JSON.stringify(pricing)})}});
const post=body=>route.POST({url:'https://mk.test/api/market',headers:new Headers({'content-type':'application/json',origin:'https://mk.test'}),json:async()=>body});
let response=await post({action:'customize',brief:{...brief,model:{kind:'product',slug:'bloom'},contact:{name:'Ana',email:'ana@example.test'}}});
assert.equal(response.status,200);assert.equal(inserts.length,1);
const [, owner, productId, name, details, options]=inserts[0];
assert.equal(owner,'u1');assert.equal(productId,'p1');assert.equal(name,'Bloom Studio');assert.ok(details.includes('Estimate: $2,950.00'),'server estimate from studio settings');
assert.equal(JSON.parse(options).estimate.total,295000);
response=await post({action:'customize',brief:{...brief,model:{kind:'concept',slug:'muse'},contact:{name:'Ana',email:'ana@example.test'}}});assert.equal(response.status,200);assert.equal(inserts[1][2],null,'concepts are not products');
response=await post({action:'customize',brief:{model:{kind:'product',slug:'draft-or-missing'},contact:{name:'Ana',email:'ana@example.test'}}});assert.equal(response.status,400);
response=await post({action:'customize',brief:{model:{kind:'product',slug:'bloom'},contact:{name:'Ana',email:'not-an-email'}}});assert.equal(response.status,400);
user=null;response=await post({action:'customize',brief:{model:{kind:'product',slug:'bloom'}}});assert.equal(response.status,401);assert.equal(inserts.length,2);
console.log('PASS customize API: server-side estimate, product/concept models, unpublished models, email validation and sign-in boundary');
