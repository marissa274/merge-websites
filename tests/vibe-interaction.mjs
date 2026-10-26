import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
let reads=0,cancelled=0,animation,refIndex=0;
const rect={left:100,top:200,width:100,height:300};
const vars=new Map();
const anchor={getBoundingClientRect(){reads++;return rect},style:{setProperty:(n,v)=>vars.set(n,v),removeProperty:n=>vars.delete(n)}};
const ripple={style:{},getAnimations:()=>[{cancel(){cancelled++}}],animate(frames,options){animation={frames,options}}};
const document={documentElement:{dataset:{}}},media={matches:false};
const exports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/vibe-pill.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,{
 exports,document,matchMedia:()=>media,
 require(name){
  if(name==='react')return {useRef:()=>({current:refIndex++===0?null:ripple})};
  if(name==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
  if(name==='lucide-react')return {ArrowUpRight:()=>null};
  if(name==='./bento-preview')return {VibeIcons:Array.from({length:6},()=>()=>null)};
  throw new Error(name);
 },
});
const pill=exports.VibePill({label:'Food & drink',tone:'food',sub:'Good taste',index:2});
assert.equal(pill.type,'a');assert.equal(pill.props.href,'/collection?category=Food%20%26%20drink');
const event={currentTarget:anchor,clientX:190,clientY:480,pointerType:'mouse'};
pill.props.onPointerEnter(event);
for(let i=0;i<100;i++)pill.props.onPointerMove(event);
assert.equal(reads,1,'magnetic tracking caches the stable anchor bounds');
assert.ok(Math.abs(parseFloat(vars.get('--pill-x')))<=5&&Math.abs(parseFloat(vars.get('--pill-y')))<=7);
pill.props.onPointerLeave(event);assert.equal(vars.size,0);
pill.props.onPointerEnter(event);pill.props.onPointerMove(event);pill.props.onPointerCancel(event);assert.equal(vars.size,0,'cancelled gestures clear pointer offsets');
pill.props.onPointerEnter(event);pill.props.onPointerMove({...event,pointerType:'touch'});assert.equal(vars.size,0,'touch does not inherit hover tracking');
pill.props.onPointerDown(event);assert.equal(cancelled,1);assert.equal(animation.options.duration,450);
assert.equal(ripple.style.left,'90px');assert.equal(ripple.style.top,'280px');
document.documentElement.dataset.motion='reduced';pill.props.onPointerMove(event);assert.equal(vars.size,0);
pill.props.onPointerDown(event);assert.equal(animation.options.duration,150);
assert.ok(animation.frames.every(frame=>!('transform' in frame)),'reduced press uses opacity only');
console.log('PASS native category navigation, bounded magnetism, cached targets, touch feedback and reduced-motion press');
