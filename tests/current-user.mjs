import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
let local = null;
const exported = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/data.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, {
 exports: exported,
 require(name) {
  if (name === 'cloudflare:workers') return { env: {} };
  if (name === 'next/headers') return { headers: async () => new Headers({ cookie: 'mk_session=local-session', 'oai-authenticated-user-id': 'forged-admin', 'oai-authenticated-user-email': 'admin@example.test' }) };
  if (name === './chatgpt-auth') return { getChatGPTUser: async () => ({ userId: 'forged-admin', email: 'admin@example.test' }) };
  if (name === './auth') return { sessionUser: async () => local };
  throw Error(name);
 }
});
local = { userId: 'customer', email: 'customer@example.test', provider: 'apple' };
assert.equal((await exported.currentUser()).userId, 'customer');
local = null;
assert.equal(await exported.currentUser(), null, 'hosting headers must never authenticate a visitor on a self-hosted site');
console.log('PASS website sessions work and forged hosting identity headers are ignored.');
