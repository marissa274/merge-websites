import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
let local=null,host=null;
const exported={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/data.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exported,require(name){
 if(name==='cloudflare:workers')return {env:{}};
 if(name==='next/headers')return {headers:async()=>new Headers({cookie:'mk_session=local-session'})};
 if(name==='./chatgpt-auth')return {getChatGPTUser:async()=>host};
 if(name==='./auth')return {sessionUser:async()=>local};
 throw Error(name);
}});
host={userId:'host',email:'host@example.test'};local={userId:'customer',email:'customer@example.test',provider:'apple'};
assert.equal((await exported.currentUser()).userId,'customer','an explicit website sign-in takes priority over the host identity');
local=null;assert.equal((await exported.currentUser()).userId,'host','existing host access still works without a local session');
host=null;assert.equal(await exported.currentUser(),null,'anonymous visitors stay anonymous');
console.log('PASS explicit website session priority, preserved host fallback and anonymous state.');
