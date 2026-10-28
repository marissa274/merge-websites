import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const model = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/personalize-model.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:model,Intl});
const states=[],refs=[],dependencies=[],pending=[],drafts=new Map();let cursor=0,refCursor=0,effectCursor=0,requests=0;
const exported={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/personalize.tsx','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{
 exports:exported,Intl,sessionStorage:{getItem:key=>drafts.get(key)||null,setItem:(key,value)=>drafts.set(key,value),removeItem:key=>drafts.delete(key)},
 fetch:async()=>{requests++;return {ok:true,json:async()=>({message:'Your request was saved.'})};},
 require(name){
  if(name==='react')return {
   useState(initial){const i=cursor++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return [states[i],value=>{states[i]=typeof value==='function'?value(states[i]):value;}];},
   useRef(initial){return refs[refCursor++]||={current:initial};},
   useEffect(fn,deps){const i=effectCursor++;if(!dependencies[i]||deps.some((v,j)=>v!==dependencies[i][j])){dependencies[i]=deps;pending.push(fn);}},
  };
  if(name==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
  if(name==='lucide-react')return new Proxy({},{get:()=>()=>null});
  if(name==='./concept-site')return {ConceptSite:()=>null};
  if(name==='./personalize-model')return model;
  return require(name);
 }
});
const walk=node=>!node||typeof node!=='object'?[]:[node,...[node.props?.children].flat(Infinity).flatMap(walk)];
const find=(tree,predicate)=>walk(tree).find(predicate);
const byClass=(tree,name)=>find(tree,node=>node.props?.className===name);
const site={kind:'concept',slug:'studio-09',name:'Studio 09',category:'Fashion',palette:{background:'#a9d9cd',ink:'#182c29',accent:'#182c29',accentInk:'#fff8fb'}};
const render=()=>{cursor=refCursor=effectCursor=0;const tree=exported.Personalize({model:site,pricing:{'colors-brand':10000},base:50000,user:{fullName:'',email:''}});pending.splice(0).forEach(fn=>fn());return tree;};
const active=tree=>find(tree,node=>node.type?.name==='Step'&&node.props.active).props.n;
const go=(tree,i)=>find(tree,node=>node.props?.['aria-controls']===['pz-identity','pz-content','pz-features','pz-budget','pz-contact','pz-review'][i]).props.onClick();
let tree=render();assert.equal(active(tree),1);
find(tree,node=>node.props?.value==='colors-brand').props.onChange();tree=render();
byClass(tree,'pz-next btn'); // Buttons are selected below by their actual class.
find(tree,node=>node.props?.className==='btn pz-next').props.onClick();tree=render();assert.equal(active(tree),2);
find(tree,node=>node.props?.['aria-label']==='Add a page').props.onClick();tree=render();
go(tree,0);tree=render();assert.equal(find(tree,node=>node.props?.value==='colors-brand').props.checked,true,'chosen colors survive going back');
go(tree,1);tree=render();assert.equal(find(tree,node=>node.type==='output').props.children,1,'page count survives stage navigation');
await find(tree,node=>node.type==='form').props.onSubmit({preventDefault(){}});tree=render();assert.equal(active(tree),3);assert.equal(requests,0,'Enter before review advances without submitting a request');
go(tree,4);tree=render();find(tree,node=>node.props?.className==='btn pz-next').props.onClick();tree=render();assert.equal(active(tree),5);assert.ok(byClass(tree,'pz-errors').props.children,'missing contact details block Continue');
find(tree,node=>node.props?.id==='pz-name').props.onChange({target:{value:'Marissa'}});tree=render();
find(tree,node=>node.props?.id==='pz-email').props.onChange({target:{value:'marissa@example.test'}});tree=render();
find(tree,node=>node.props?.className==='btn pz-next').props.onClick();tree=render();assert.equal(active(tree),6);
assert.ok(drafts.size,'choices are saved as a draft');
await find(tree,node=>node.type==='form').props.onSubmit({preventDefault(){}});tree=render();assert.equal(requests,1);assert.equal(drafts.size,0,'a saved request clears the draft');assert.ok(byClass(tree,'pz-sent'),'success appears only after the server saves the request');
console.log('PASS six-stage navigation, preserved choices/page count, Enter guard, contact validation, draft and successful submission.');
