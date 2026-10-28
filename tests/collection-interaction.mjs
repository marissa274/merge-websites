// Exercises component handlers without claiming browser layout or pointer verification.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { model, products } from './collection-model.mjs';
const states = [], refs = [], storage = new Map(), navigation = [], urls = [], events = [];
let cursor = 0, refCursor = 0, storageFails = false;
const exports = {};
const environment={
    exports, URLSearchParams, Event: class { constructor(type){this.type=type;} },
    location: { assign: url => navigation.push(url) },
    history: { state: { retained: true }, replaceState(state, unused, url){ assert.equal(state.retained,true); urls.push(url); } },
    localStorage: { getItem:key=>storage.get(key)||null, setItem(key,value){if(storageFails)throw Error('blocked');storage.set(key,value);} },
    window: { dispatchEvent:event=>events.push(event.type) },
    require(name){
        if(name==='react')return {
            useState(initial){ const index=cursor++; if(!(index in states))states[index]=typeof initial==='function'?initial():initial; return [states[index],value=>{states[index]=typeof value==='function'?value(states[index]):value;}]; },
            useRef(){ const index=refCursor++; return refs[index] ||= {current:null}; }, useMemo: fn=>fn(), useEffect(){},
        };
        if(name==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
        if(name==='lucide-react')return new Proxy({}, {get:()=>()=>null});
        if(name==='gsap')return {gsap:{registerPlugin(){}}};
        if(name==='@gsap/react')return {useGSAP(){}};
        if(name==='./collection-controls')return {CollectionControls:function CollectionControls(){}};
        if(name==='./collection-model')return model;
        if(name==='./ui')return {Concept:()=>null,money:n=>`$${n/100}`};
        if(name==='./home-v2')return {MotionControl:()=>null};
        if(name==='./bento-preview')return {AnimatedPreview:()=>null};
        if(name==='./collection-preview')return {MosaicStudyPreview:()=>null};
        if(name==='./gallery-motion')return {GalleryAtmosphere:()=>null};
        if(name==='./gallery-work'){
            const shared={};
            vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/gallery-work.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,{...environment,exports:shared});
            return shared;
        }
        throw Error(name);
    },
};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/collection-v2.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,environment);
const render=()=>{cursor=0;refCursor=0;return exports.CollectionV2({products});};
const walk=node=>!node||typeof node!=='object'?[]:[node,...[node.props?.children].flat(Infinity).flatMap(walk)];
const text=node=>typeof node==='string'||typeof node==='number'?String(node):node&&typeof node==='object'?[node.props?.children].flat(Infinity).map(text).join(''):'';
const find=(tree,predicate)=>walk(tree).find(predicate);
const button=(tree,label)=>find(tree,node=>node.type==='button'&&text(node)===label);
let tree=render();
assert.equal(walk(tree).filter(node=>node.type?.name==='GalleryWork').length,18,'the first page shows eighteen projects');
assert.equal(walk(tree).filter(node=>node.props?.className==='editorial-gallery').length,1,'products and concepts share one project gallery');
for(const label of ['A starting point','Original directions','websites available','design studies','From the playground']) assert.ok(!text(tree).includes(label),`collection omits ${label}`);
button(tree,'Load more designs').props.onClick({detail:1}); tree=render();
assert.equal(walk(tree).filter(node=>node.type?.name==='GalleryWork').length,21,'load more appends every remaining entry');
assert.equal(button(tree,'Load more designs'),undefined,'load button disappears at end');
find(tree,node=>node.type?.name==='CollectionControls').props.update({query:'skincare'}); tree=render();
assert.equal(walk(tree).filter(node=>node.type?.name==='GalleryWork').length,1); assert.equal(urls.at(-1),'/collection?q=skincare');
find(tree,node=>node.type?.name==='CollectionControls').props.reset(); tree=render();
find(tree,node=>node.type?.name==='CollectionControls').props.toggle('categories','Music'); tree=render();
assert.equal(walk(tree).filter(node=>node.type?.name==='GalleryWork').length,1); assert.equal(urls.at(-1),'/collection?category=Music');
find(tree,node=>node.type?.name==='CollectionControls').props.reset(); tree=render();
const work=find(tree,node=>node.type?.name==='GalleryWork');
storage.set('mek-bag',JSON.stringify(['existing']));work.props.onBuy(products[0]);
assert.equal(storage.get('mek-bag'),'["existing","one"]');assert.equal(navigation.at(-1),'/checkout');assert.equal(events.at(-1),'mek-bag');
work.props.onBuy(products[0]);assert.equal(storage.get('mek-bag'),'["existing","one"]','buy never duplicates a bag item');
storage.set('mek-bag',JSON.stringify(Array.from({length:20},(_,i)=>String(i))));const navigations=navigation.length;
work.props.onBuy(products[0]);assert.equal(navigation.length,navigations,'full bag does not silently discard items');
storageFails=true;storage.set('mek-bag','[]');work.props.onBuy(products[0]);assert.equal(navigation.length,navigations,'blocked storage never falsely navigates to checkout');
tree=render();assert.ok(text(find(tree,node=>node.props?.role==='alert')).includes('could not save'));
console.log('PASS load more, search URL state, category filtering, bag preservation/deduplication and purchase error handling');
