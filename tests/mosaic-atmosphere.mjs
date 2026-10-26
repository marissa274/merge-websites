import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { model } from './collection-model.mjs';
const code=ts.transpileModule(fs.readFileSync('app/gallery-motion.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
function setup(motion=true){
 const nodes=[{dataset:{work:'large',tone:'pink'}},{dataset:{work:'small',tone:'violet'}}];
 const host={dataset:{},querySelectorAll:()=>nodes};
 const observers=[],mutations=[],animations=[];let stateIndex=0,refIndex=0,cleanup;
 class IntersectionObserver{constructor(callback,options){this.callback=callback;this.options=options;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
 class MutationObserver{constructor(callback){this.callback=callback;mutations.push(this);}observe(target,options){this.options=options;}disconnect(){this.disconnected=true;}}
 const exports={};
 vm.runInNewContext(code,{exports,IntersectionObserver,MutationObserver,require(name){
  if(name==='react')return {useRef:initial=>({current:initial}),useState:()=>[motion,()=>{}],useEffect(){},useMemo:fn=>fn()};
  if(name==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
  if(name==='@gsap/react')return {useGSAP:fn=>{cleanup=fn({},f=>f);}};
  if(name==='gsap')return {gsap:{registerPlugin(){},from(node){animations.push(node.dataset.work);}}};
  if(name==='lucide-react')return new Proxy({}, {get:()=>()=>null});
  if(name==='./collection-model')return model;
  if(name==='./ui')return {money:()=>'$0'};
  if(name==='./home-v2')return {MotionControl:()=>null};
  if(name==='./collection-preview')return {MosaicStudyPreview:()=>null};
  throw Error(name);
 }});
 exports.GalleryAtmosphere({scope:{current:host},signature:'large|small'});
 const event=(index,area,visible=true)=>({target:nodes[index],isIntersecting:visible,intersectionRect:{top:0,width:area,height:1},rootBounds:null});
 return {host,nodes,observer:observers[0],mutation:mutations[0],animations,cleanup,event};
}
const x=setup();x.observer.callback([x.event(0,900),x.event(1,300)]);
assert.equal(x.host.dataset.atmosphere,'pink');assert.equal(x.animations.length,2);
x.observer.callback([x.event(0,0,false),x.event(1,800)]);assert.equal(x.host.dataset.atmosphere,'violet','scrolling selects newly dominant visible project');
x.nodes[1].dataset.tone='yellow';x.mutation.callback();assert.equal(x.host.dataset.atmosphere,'yellow','image sampling can update the visible atmosphere without extra scrolling');
x.observer.callback([x.event(1,800)]);assert.equal(x.animations.length,2,'repeated intersection updates do not replay entrances');
assert.equal(x.mutation.options.attributeFilter.join(','),'data-tone','atmosphere writes cannot trigger an observer loop');
x.observer.callback([x.event(1,0,false)]);assert.equal(x.host.dataset.atmosphere,'neutral');
x.cleanup();assert.ok(x.observer.disconnected&&x.mutation.disconnected);assert.equal(x.host.dataset.atmosphere,undefined);
const reduced=setup(false);reduced.observer.callback([reduced.event(0,1000)]);assert.equal(reduced.host.dataset.atmosphere,'neutral');assert.equal(reduced.animations.length,0);reduced.cleanup();
console.log('PASS scroll dominance, late image palette updates, reveal-once behavior, feedback-loop prevention, reduced motion and observer cleanup');
