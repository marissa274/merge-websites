import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('app/detail-motion.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
async function run(enabled=true,desktop=true){
 const exports={},cleanup=[],timelines=[],tweens=[],listeners=new Map();let refreshes=0,reverted=false;
 const canvas={querySelector:selector=>({name:selector})};
 const devices=['desktop','mobile','tablet'].map(device=>({dataset:{device},closest:()=>({stage:device})}));
 const target={querySelector:()=>({}),querySelectorAll:selector=>selector==='[data-device]'?devices:selector==='[data-detail-act]'?[{querySelector:()=>({}),querySelectorAll:selector=>selector==='[data-device]'?[]:[{},{}]}]:[{},{}],addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
 const gsap={registerPlugin(){},fromTo:(...args)=>tweens.push(args),to:(...args)=>tweens.push(args),timeline(options){const t={options,steps:[],from(...args){this.steps.push(args);return this;},fromTo(...args){this.steps.push(args);return this;}};timelines.push(t);return t;},matchMedia(){return{add(q,fn){fn({conditions:{desktop,small:!desktop}});},revert(){reverted=true;}};}};
 vm.runInNewContext(code,{exports,window:{scrollY:0,addEventListener(){},removeEventListener(){}},document:{documentElement:{dataset:{motion:enabled?'full':'reduced'}},fonts:{ready:Promise.resolve()}},matchMedia:()=>({matches:!enabled,addEventListener(){},removeEventListener(){}}),require(name){if(name==='react')return{useState:()=>[enabled,()=>{}],useEffect:fn=>cleanup.push(fn())};if(name==='@gsap/react')return{useGSAP:fn=>cleanup.push(fn())};if(name==='gsap')return{gsap};if(name==='gsap/ScrollTrigger')return{ScrollTrigger:{refresh(){refreshes++;}}};throw Error(name);}});
 exports.DetailMotion({scope:{current:target},rhythm:'calm'});
 cleanup.reverse().forEach(fn=>fn?.());await Promise.resolve();
 assert.equal(listeners.size,0);assert.equal(refreshes,0,'late font completion cannot refresh an unmounted page');
 return{timelines,tweens,reverted};
}
const desktop=await run();assert.equal(desktop.timelines.length,2);assert.equal(desktop.tweens.length,4);assert.ok(desktop.reverted);assert.ok(desktop.timelines.every(t=>!t.options.scrollTrigger?.pin));
const mobile=await run(true,false);assert.equal(mobile.tweens.length,3,'small screens keep only the three device settles, no hero parallax');assert.equal(mobile.timelines.length,2);
const reduced=await run(false);assert.equal(reduced.timelines.length,0);assert.equal(reduced.tweens.length,0);
console.log('PASS coordinated entrance/act sequencing, native unpinned scrolling, lightweight mobile, reduced motion and cleanup including late fonts');

assert.ok([...desktop.timelines,...mobile.timelines].every(t=>!t.options.scrollTrigger?.scrub),'no scrubbed collage timeline remains');
console.log('PASS collage motion removed; entrances unpinned');

const [laptop,phone,tablet]=desktop.tweens.slice(1);
assert.deepEqual({...laptop[1]},{scale:.92,y:64});assert.equal(laptop[2].scale,1);assert.equal(laptop[2].y,0);assert.equal(laptop[2].ease,'power3.out');
assert.ok(phone[1].xPercent<0&&phone[1].rotation<0&&phone[1].scale<1&&phone[1].opacity<1);assert.equal(phone[2].rotation,0);assert.equal(phone[2].opacity,1);
assert.ok(tablet[1].xPercent>0&&tablet[1].rotationY&&tablet[1].scale<1);assert.equal(tablet[2].xPercent,0);assert.equal(tablet[2].rotationY,0);
assert.ok(desktop.tweens.slice(1).every(t=>t[2].scrollTrigger.scrub&&!t[2].scrollTrigger.pin&&t[2].scrollTrigger.trigger.stage),'each device settles with its own stage, without pinning');
const [,smallPhone]=mobile.tweens;assert.ok(Math.abs(smallPhone[1].xPercent)<Math.abs(phone[1].xPercent),'small screens travel less');
console.log('PASS device choreography: laptop .92 scale rise, phone from left with rotation, tablet from right with depth, all settling to neutral');
