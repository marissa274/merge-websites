import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('app/water-model.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
export const model=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
export const layoutFor=width=>({width,viewport:width<640?780:900,heroBottom:width<640?530:820,galleryTop:width<640?530:820,galleryBottom:width<640?2500:2260,aboutTop:width<640?3250:3050,aboutHeight:width<640?610:760,finalTop:width<640?3860:3810,finalHeight:width<640?950:1080});
const {waterFrame,footerWater,surfaceWave,splashFan}=model;
for(const width of [320,375,414,768,1024,1280,1440]){
 const l=layoutFor(width),phases=new Set();let prev;
 const first=waterFrame(0,l);assert.equal(first.opacity,0);assert.equal(first.hero,1);assert.equal(first.spread,0);
 for(let s=0;s<l.finalTop+200;s+=2){
  const f=waterFrame(s,l);phases.add(f.phase);
  Object.values(f).filter(v=>typeof v==='number').forEach(v=>assert.ok(Number.isFinite(v)));
  if(prev){assert.ok(Math.hypot(f.x-prev.x,f.y-prev.y)<30,'continuous drop position');assert.ok(Math.abs(f.height-prev.height)<5,'no scale cut');if(f.phase==='emerge')assert.ok(f.y>=prev.y,'emergence travels downward through the page')}
  assert.ok(f.height>f.width,'the narrative object remains an elongated drop');
  const path=footerWater(l,f.spread,0,s);assert.ok(!/NaN|Infinity/.test(path));prev=f;
 }
 for(const p of ['surface','emerge','collection','about','fall','splash','footer'])assert.ok(phases.has(p),p);
 const final=waterFrame(l.finalTop,l);assert.equal(final.opacity,0);assert.equal(final.spread,1);
 assert.deepEqual(waterFrame(0,l,true),waterFrame(l.finalTop,l,true),'reduced motion is a static final surface');
 const fall=[];for(let s=0;s<l.finalTop;s++)if(waterFrame(s,l).phase==='fall')fall.push(waterFrame(s,l));
 const a=fall[Math.floor(fall.length*.2)],b=fall[Math.floor(fall.length*.4)],c=fall[Math.floor(fall.length*.6)],d=fall[Math.floor(fall.length*.8)];
 assert.ok(d.y-c.y>b.y-a.y,'fall accelerates toward impact');
 const path=footerWater(l,1,0,0);assert.ok(path.startsWith('M-48.00'),'settled footer covers both gutters');
 assert.ok(path.includes(String((l.finalTop+64-24+l.finalHeight+90).toFixed(2))),'water covers footer height');
}
assert.notEqual(surfaceWave(120,100,.1),surfaceWave(120,100,.8),'waves propagate from a fixed contact');
assert.notEqual(splashFan(120,100,80),splashFan(120,100,400),'impact spreads outward');
console.log('PASS seven-width single-drop journey, emergence, acceleration, splash coverage, fixed-origin waves and reduced motion');
