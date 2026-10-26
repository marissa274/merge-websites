// Component handler checks; real dialog focus trapping still needs a browser.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const states=[],refs=[],effects=[];let cursor=0,rc=0,context;let paused=0,focused=0;
const exported={},popover=Object.fromEntries(['Root','Trigger','Portal','Backdrop','Popup','Title','Description','Close'].map(key=>[key,`Dialog.${key}`]));
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/website-demos.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports:exported,require(name){
 if(name==='react')return{createContext:()=>({Provider:'Context.Provider'}),useContext:()=>context,useState(initial){const i=cursor++;if(!(i in states))states[i]=initial;return[states[i],v=>states[i]=v];},useRef(){return refs[rc++]||=({current:{pause(){paused++;},focus(){focused++;}}});},useEffect:fn=>effects.push(fn)};
 if(name==='@base-ui/react/dialog')return{Dialog:popover};
 if(name==='lucide-react')return new Proxy({},{get:()=>()=>null});
 if(name==='react/jsx-runtime')return{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
 throw Error(name);
}});
const videos=Array.from({length:6},(_,i)=>({id:'video-'+i,title:'Demo '+i,posterId:'poster-'+i,transcript:i===2?'Descriptive walkthrough':''}));
const walk=n=>!n||typeof n!=='object'?[]:[n,...[n.props?.children].flat(Infinity).flatMap(walk)];
const find=(tree,fn)=>walk(tree).find(fn);
const render=()=>{cursor=rc=0;effects.length=0;const result=exported.WebsiteDemos({videos,name:'Test website',children:null});context=result.props.value;effects.forEach(fn=>fn());return result;};
let tree=render();assert.ok(!find(tree,n=>n.type==='video'));
const trigger=exported.DemoTrigger();trigger.props.onClick();find(tree,n=>n.type===popover.Root).props.onOpenChange(true);tree=render();assert.ok(!find(tree,n=>n.type==='video'),'hero action opens gallery without fetching all videos');
let grid=exported.DemoGrid();assert.equal(walk(grid).filter(n=>n.type===popover.Trigger).length,6);
walk(grid).filter(n=>n.type===popover.Trigger)[2].props.onClick();tree=render();
const player=find(tree,n=>n.type==='video');assert.ok(player);assert.equal(player.props.preload,'metadata');assert.equal(find(tree,n=>n.type==='source').props.src,'/api/media/video-2');assert.equal(walk(tree).filter(n=>n.type==='video').length,1);assert.ok(focused>0);
player.props.onError();tree=render();assert.ok(find(tree,n=>n.props?.role==='alert'),'playback failure has visible feedback');
find(tree,n=>n.props?.className==='demo-back').props.onClick();tree=render();assert.ok(!find(tree,n=>n.type==='video'));assert.ok(paused>0);
context.select(3);tree=render();find(tree,n=>n.type===popover.Root).props.onOpenChange(false);tree=render();assert.ok(!find(tree,n=>n.type==='video'),'close unmounts playback');
context={videos:[],select(){}};assert.equal(exported.DemoTrigger().props.disabled,true);assert.equal(exported.DemoGrid(),null);
console.log('PASS gallery-first action, six individually selected demos, one player, explicit loading, focus transfer, stop on back/close and honest empty state');
