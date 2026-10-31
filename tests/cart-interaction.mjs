import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function fixture(initial=['one','two']) {
 const states=[],effects=[],listeners=new Map(),store=new Map([['mek-bag',JSON.stringify(initial)]]),navigation=[];let cursor=0,initialized=false,blocked=false,requests=[],response={ok:true,json:async()=>({url:'https://checkout.stripe.com/session'})};
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/ui.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{
  exports,Intl,JSON,Set,Error,Event:class{constructor(type){this.type=type;}},location:{assign:url=>navigation.push(url)},fetch:async(url,options)=>{requests.push(JSON.parse(options.body));return response;},
  localStorage:{getItem:key=>store.get(key)||null,setItem:(key,value)=>{if(blocked)throw Error('blocked');store.set(key,value);}},
  window:{addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name),dispatchEvent:event=>listeners.get(event.type)?.()},
  require(name){
   if(name==='react')return {useState(initial){const i=cursor++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return[states[i],value=>states[i]=typeof value==='function'?value(states[i]):value];},useEffect(fn){if(!initialized){effects.push(fn);initialized=true;}},useRef:initial=>({current:initial})};
   if(name==='react/jsx-runtime')return{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
   if(name==='lucide-react')return new Proxy({},{get:()=>()=>null});
   if(name==='./home-v2')return {HomeV2:()=>null,NavV2:()=>null};
   if(name==='./site-footer')return {SiteFooter:()=>null};
   if(name==='./auth-form')return {SignOutButton:()=>null};
   if(name==='./website-detail')return {WebsiteDetail:()=>null};
   if(name==='./product-presentation')return {normalizePresentation:x=>x};
   if(name==='./collection-v2')return {CollectionV2:()=>null};
   throw Error(name);
  }
 });
 const products=[{id:'one',slug:'first',name:'First website',category:'Creative',license:'One website',price:10000,image_id:'preview'},{id:'two',slug:'second',name:'Second website',category:'Business',license:'One website',price:25000,image_id:null}];
 const render=(props={})=>{cursor=0;return exports.Cart({products,user:{userId:'u'},...props});};
 return {render,effects,listeners,store,navigation,requests,block:()=>blocked=true,fail:()=>{response={ok:false,json:async()=>({error:'Payment is unavailable.'})};}};
}
const walk=n=>!n||typeof n!=='object'?[]:[n,...[n.props?.children].flat(Infinity).flatMap(walk)];
const find=(tree,predicate)=>walk(tree).find(predicate);
const text=n=>typeof n==='string'||typeof n==='number'?String(n):n&&typeof n==='object'?[n.props?.children].flat(Infinity).map(text).join(''):'';
const byClass=(tree,name)=>find(tree,n=>n.props?.className===name);
const f=fixture();let tree=f.render();assert.ok(byClass(tree,'cart-loading'));const cleanup=f.effects[0]();tree=f.render();
assert.equal(walk(tree).filter(n=>n.props?.className==='cart-item').length,2);assert.ok(text(byClass(tree,'cart-total')).includes('$350.00'));
assert.ok(find(tree,n=>n.type==='img'&&n.props.src==='/api/media/preview'));
assert.equal(byClass(tree,'cart-checkout').props.href,'/checkout');
find(tree,n=>n.props?.['aria-label']==='Remove First website from bag').props.onClick();tree=f.render();assert.equal(JSON.parse(f.store.get('mek-bag')).join(','),'two');assert.ok(text(byClass(tree,'cart-total')).includes('$250.00'));
find(tree,n=>n.type==='button'&&text(n)==='Undo').props.onClick();tree=f.render();assert.equal(JSON.parse(f.store.get('mek-bag')).join(','),'one,two','Undo restores original order');
f.block();find(tree,n=>n.props?.['aria-label']==='Remove First website from bag').props.onClick();tree=f.render();assert.equal(walk(tree).filter(n=>n.props?.className==='cart-item').length,2,'blocked storage never pretends to remove a website');assert.ok(text(byClass(tree,'cart-error')).includes('not been changed'));
cleanup();assert.equal(f.listeners.size,0);
const last=fixture(['one']);last.render();last.effects[0]();tree=last.render();find(tree,n=>n.props?.['aria-label']==='Remove First website from bag').props.onClick();tree=last.render();assert.ok(byClass(tree,'cart-empty'));find(tree,n=>n.type==='button'&&text(n)==='Undo').props.onClick();tree=last.render();assert.ok(byClass(tree,'cart-item'),'Undo is available even after removing the last item');
const unavailable=fixture(['one','missing']);unavailable.render();unavailable.effects[0]();tree=unavailable.render();assert.ok(byClass(tree,'cart-unavailable'));assert.ok(text(byClass(tree,'cart-total')).includes('$100.00'));find(tree,n=>n.type==='button'&&text(n)==='Remove unavailable items').props.onClick();assert.equal(unavailable.store.get('mek-bag'),'["one"]');
const c=fixture();c.render();c.effects[0]();tree=c.render({checkout:true,user:null});assert.equal(byClass(tree,'cart-checkout').props.href,'/login?return_to=%2Fcheckout');
tree=c.render({checkout:true,ready:false});assert.equal(byClass(tree,'cart-checkout').props.disabled,true);
tree=c.render({checkout:true,ready:true});await byClass(tree,'cart-checkout').props.onClick();assert.equal(c.navigation[0],'https://checkout.stripe.com/session');assert.deepEqual(c.requests[0],{items:['one','two']});
const failure=fixture();failure.render();failure.effects[0]();failure.fail();tree=failure.render({checkout:true,ready:true});await byClass(tree,'cart-checkout').props.onClick();tree=failure.render({checkout:true,ready:true});assert.ok(text(byClass(tree,'cart-error')).includes('Payment is unavailable'));assert.equal(byClass(tree,'cart-checkout').props.disabled,false);
console.log('PASS bag images/totals, remove/Undo including last item, storage failures, unavailable products, auth/payment gating, verified checkout redirect and retry.');
