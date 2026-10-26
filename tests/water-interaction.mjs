import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {model} from './water-model.mjs';
// Execute component events and scheduling against a simulated DOM; not browser rendering.
const events=()=>({handlers:new Map(),addEventListener(n,f){this.handlers.set(n,f)},removeEventListener(n){this.handlers.delete(n)},fire(n,e){this.handlers.get(n)?.(e)}});
let time=1000,next=0,reads=0,cleanup;
const raf=new Map(),observers=[];
const window={...events(),scrollY:0,innerHeight:900};
const el=()=>({...events(),dataset:{},attrs:{},style:{setProperty(){}},setAttribute(n,v){this.attrs[n]=v}});
const node=(top,height)=>({...el(),getBoundingClientRect(){reads++;return {top:top-window.scrollY,bottom:top+height-window.scrollY,left:0,width:1280,height}},contains(n){return this===n}});
const hero=node(0,820),gallery=node(820,1440),about=node(3050,760),footer=node(3810,1080),main=node(0,4890);
const sections={'.magnetic-hero':hero,'.bento-section':gallery,'.studio-declaration':about,'.water-finale':footer};
main.querySelector=s=>sections[s];footer.querySelectorAll=()=>[];
const selectors=['[data-story-drop]','[data-footer-water]','[data-footer-mask]','[data-splash-fan]','[data-hero-clip]','text'];
const nodes=Object.fromEntries(selectors.map(s=>[s,el()]));
const waves=Array.from({length:8},()=>({...el(),paths:[el(),el()],querySelectorAll(){return this.paths}}));
const impact=Array.from({length:3},el);
const svg={...el(),closest:()=>main,querySelector:s=>nodes[s],querySelectorAll:s=>s==='[data-water-wave]'?waves:impact};
const document={...events(),hidden:false,documentElement:{dataset:{}},fonts:{ready:Promise.resolve()}};
const media={...events(),matches:false},coarse={...events(),matches:false};
class Observer{constructor(callback){this.callback=callback;observers.push(this)}observe(){}unobserve(){}disconnect(){this.disconnected=true}}
const exports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/water-story.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,{
 exports,window,document,performance:{now:()=>time},matchMedia:q=>q.includes('coarse')?coarse:media,
 ResizeObserver:Observer,IntersectionObserver:Observer,MutationObserver:Observer,
 requestAnimationFrame(f){const id=++next;raf.set(id,f);return id},cancelAnimationFrame:id=>raf.delete(id),
 require(n){if(n==='react')return {useRef:()=>({current:svg}),useId:()=>':test:',useEffect:f=>{cleanup=f()}};if(n==='react/jsx-runtime')return {jsx:()=>null,jsxs:()=>null};if(n==='./water-model')return model;throw new Error(n)},
});
const tick=(dt=32)=>{time+=dt;const pending=[...raf.values()];raf.clear();pending.forEach(f=>f(time))};
const gesture=(target,type,x,y,pointerType='mouse')=>target.fire(type,{type,target,clientX:x,clientY:y,pointerType});
exports.WaterStory();await Promise.resolve();tick();
assert.equal(nodes['[data-story-drop]'].attrs.opacity,'0');assert.equal(nodes['[data-footer-water]'].attrs.opacity,'0');assert.equal(raf.size,0);
const boundsReads=reads,initialDrop=nodes['[data-story-drop]'].attrs.transform;
gesture(hero,'pointerdown',280,340,'touch');tick();
assert.ok(waves.some(n=>Number(n.attrs.opacity)>0),'touch produces water-surface waves');
for(let i=0;i<16;i++){gesture(hero,'pointermove',300+i*22,340);assert.equal(raf.size,1);tick()}
assert.equal(nodes['[data-story-drop]'].attrs.transform,initialDrop,'the drop never follows the cursor');
assert.equal(reads,boundsReads,'gesture and animation do not measure layout');
for(let i=0;i<100;i++)tick();assert.equal(raf.size,0,'water surface settles');
gesture(hero,'pointermove',500,340,'touch');assert.equal(raf.size,0,'touch scrolling is not hover');
window.scrollY=950;window.fire('scroll');tick();assert.equal(svg.dataset.phase,'collection');assert.equal(nodes['[data-story-drop]'].attrs.opacity,'1');
window.scrollY=2900;window.fire('scroll');tick();assert.equal(svg.dataset.phase,'about');
window.scrollY=3200;window.fire('scroll');tick();assert.equal(svg.dataset.phase,'fall');
window.scrollY=3400;window.fire('scroll');tick();assert.equal(svg.dataset.phase,'splash');
for(let i=0;i<8;i++)tick();assert.ok(Number(nodes['[data-splash-fan]'].attrs.opacity)>0,'impact has a visible fan');
for(let i=0;i<36;i++)tick();assert.equal(nodes['[data-story-drop]'].attrs.opacity,'0');assert.equal(nodes['[data-footer-water]'].attrs.opacity,'1','footer forms after the impact even if scrolling stops');assert.equal(nodes['[data-splash-fan]'].attrs.opacity,'0','splash disappears after impact');
window.scrollY=3288;window.fire('scroll');tick();assert.equal(nodes['[data-footer-water]'].attrs.opacity,'1','small reverse scroll retains the settled material');assert.ok(Number(nodes['[data-story-drop]'].attrs.opacity)<.01,'reverse scroll does not suddenly reintroduce the drop');
assert.equal(reads,boundsReads,'scroll choreography uses cached geometry');
document.documentElement.dataset.motion='reduced';observers[2].callback();tick();
assert.equal(svg.dataset.phase,'footer');assert.equal(nodes['[data-story-drop]'].attrs.opacity,'0');assert.equal(raf.size,0);
assert.equal(nodes['[data-splash-fan]'].attrs.opacity,'0','reduced motion hides the splash');
document.hidden=true;document.fire('visibilitychange');assert.equal(raf.size,0);
cleanup();assert.equal(window.handlers.size,0);assert.equal(hero.handlers.size,0);assert.equal(footer.handlers.size,0);assert.equal(document.handlers.size,0);assert.ok(observers.every(o=>o.disconnected));assert.equal(main.dataset.waterReady,undefined);
console.log('PASS fixed-contact touch/mouse waves, no cursor follower, single RAF, scroll story, timed splash, reduced motion and teardown');
