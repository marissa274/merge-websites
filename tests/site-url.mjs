import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const env = {}, exported = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/site-url.ts', 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText, {
 exports:exported, URL,
 require(name) { if(name==='cloudflare:workers')return {env};throw Error(name); }
});
assert.equal(exported.siteUrl().origin, 'http://localhost:5173');
env.SITE_URL = 'https://studio.example.test/some-path';
assert.equal(exported.siteUrl().origin, 'https://studio.example.test');
env.SITE_URL = 'http://localhost:8787';
assert.equal(exported.siteUrl().origin, 'http://localhost:8787');
for(const value of ['javascript:alert(1)', 'https://user:secret@example.test', 'not a URL']) {
 env.SITE_URL=value;assert.throws(()=>exported.siteUrl());
}
console.log('PASS local origin by default, configurable self-hosted origin, unsafe origins refused.');
