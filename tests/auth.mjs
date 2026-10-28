import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {DatabaseSync} from 'node:sqlite';
// A real SQLite database with the project's migrations, behind a minimal D1-shaped API.
const sqlite=new DatabaseSync(':memory:');
for(const file of fs.readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())for(const statement of fs.readFileSync('drizzle/'+file,'utf8').split('--> statement-breakpoint'))if(statement.trim())sqlite.exec(statement);
const stmt=(sql,args=[])=>({sql,args,bind:(...a)=>stmt(sql,a),async first(){return sqlite.prepare(sql).get(...args)??null;},async all(){return{results:sqlite.prepare(sql).all(...args)};},async run(){const r=sqlite.prepare(sql).run(...args);return{meta:{changes:Number(r.changes)}};}});
const DB={prepare:sql=>stmt(sql),async batch(list){sqlite.exec('BEGIN');try{const out=[];for(const s of list)out.push(await s.run());sqlite.exec('COMMIT');return out;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
const env={DB,ADMIN_EMAILS:'owner@mk.test'};let sent=[],googleResponse=null;
const fetchStub=async(url,init)=>{if(String(url).startsWith('https://api.resend.com')){sent.push(JSON.parse(init.body));return new Response('{}',{status:200});}if(String(url).startsWith('https://oauth2.googleapis.com/token'))return Response.json(googleResponse,{status:googleResponse?200:400});throw Error('unexpected fetch '+url);};
const load=(file,stubs)=>{const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,require:n=>{if(n in stubs)return stubs[n];throw Error('unexpected import '+n);},crypto,TextEncoder,btoa,atob,URL,URLSearchParams,Response,Headers,fetch:fetchStub,Date,JSON,Math,Number,String,Uint8Array,Array,Object,Promise,Error,encodeURIComponent,decodeURIComponent});return exports;};
const auth=load('app/auth.ts',{'cloudflare:workers':{env}});
const api=load('app/api/auth/route.ts',{'cloudflare:workers':{env},'../../auth':auth});
const start=load('app/api/auth/google/route.ts',{'../../../auth':auth});
const callback=load('app/api/auth/google/callback/route.ts',{'cloudflare:workers':{env},'../../../../auth':auth});
const post=(body,{origin='https://mk.test',cookie='',ip='1.1.1.1'}={})=>api.POST(new Request('https://mk.test/api/auth',{method:'POST',headers:{'content-type':'application/json',origin,cookie,'cf-connecting-ip':ip},body:JSON.stringify(body)}));
const sessionCookie=r=>(r.headers.get('set-cookie')||'').match(/mk_session=([^;]*)/)?.[1]||'';
const row=(sql,...a)=>sqlite.prepare(sql).get(...a);

// Hashing
const hash=await auth.hashPassword('correct horse battery');
assert.match(hash,/^pbkdf2\$100000\$[\w-]{22}\$[\w-]{43}$/);assert.ok(await auth.verifyPassword('correct horse battery',hash));assert.ok(!await auth.verifyPassword('wrong horse battery',hash));
assert.notEqual(hash,await auth.hashPassword('correct horse battery'),'unique salt per password');
assert.equal(auth.safeReturn('//evil.example'),'/account');assert.equal(auth.safeReturn('/\\evil'),'/account');assert.equal(auth.safeReturn('/personalize/custom?concept=muse'),'/personalize/custom?concept=muse');
console.log('PASS PBKDF2 hashing with unique salts and same-site return paths only');

// Sign up
let r=await post({action:'signup',name:'Ana',email:'Ana@Example.test',password:'short'});assert.equal(r.status,400);assert.equal((await r.json()).field,'password');
r=await post({action:'signup',name:'Ana',email:'Ana@Example.test',password:'a long enough secret',returnTo:'/personalize/custom?concept=muse'});assert.equal(r.status,200);
assert.equal((await r.json()).redirect,'/personalize/custom?concept=muse');
const setCookie=r.headers.get('set-cookie');assert.match(setCookie,/HttpOnly/);assert.match(setCookie,/SameSite=Lax/);assert.match(setCookie,/Secure/);
let token=decodeURIComponent(sessionCookie(r));
assert.equal(row('SELECT COUNT(*) n FROM auth_sessions WHERE id=?',token).n,0,'raw session tokens are never stored');
const identity=row("SELECT * FROM auth_identities WHERE subject='ana@example.test'");assert.equal(identity.provider,'password');assert.equal(identity.email_verified,0);assert.ok(identity.password_hash.startsWith('pbkdf2$'));
let user=await auth.sessionUser('mk_session='+encodeURIComponent(token));assert.equal(user.email,'ana@example.test');assert.equal(user.provider,'password');assert.equal(user.verified,false);
r=await post({action:'signup',name:'Other',email:'ana@example.test',password:'another long secret'});assert.equal(r.status,409,'one account per email');
console.log('PASS sign up: validation, hashed password, hashed session in a secure HttpOnly cookie, unverified email, duplicate email refused');

// Log in and attempt limiting
r=await post({action:'login',email:'ana@example.test',password:'wrong password!!'});assert.equal(r.status,401);assert.equal((await r.json()).error,'Email or password is incorrect.');
r=await post({action:'login',email:'nobody@example.test',password:'whatever password'});assert.equal((await r.json()).error,'Email or password is incorrect.','unknown and wrong look the same');
r=await post({action:'login',email:'ana@example.test',password:'a long enough secret'});assert.equal(r.status,200);assert.ok(sessionCookie(r));
for(let i=0;i<8;i++)await post({action:'login',email:'ana@example.test',password:'guess number '+i});
r=await post({action:'login',email:'ana@example.test',password:'a long enough secret'});assert.equal(r.status,429,'locked after repeated failures, even with the right password');
console.log('PASS log in: generic errors, correct password signs in, 8 failures lock the email for 15 minutes');

// Password reset by email
r=await post({action:'forgot',email:'ana@example.test'});assert.equal(r.status,503,'no email service: honest message');
env.RESEND_API_KEY='re_test';env.MAIL_FROM='MK lab <hello@mk.test>';
r=await post({action:'forgot',email:'nobody@example.test'});assert.equal(r.status,200);assert.equal(sent.length,0,'no email for unknown accounts, same answer');
r=await post({action:'forgot',email:'ana@example.test'});assert.equal(r.status,200);assert.equal(sent.length,1);
const link=sent[0].text.match(/https:\/\/mk\.test\/reset-password\?token=([\w-]+)/);assert.ok(link,'reset link');
r=await post({action:'reset',token:link[1],password:'a brand new secret'});assert.equal(r.status,200);
assert.equal(await auth.sessionUser('mk_session='+encodeURIComponent(token)),null,'older sessions are signed out');
assert.equal(row("SELECT email_verified FROM auth_identities WHERE subject='ana@example.test'").email_verified,1,'the emailed link verifies the address');
r=await post({action:'reset',token:link[1],password:'yet another secret'});assert.equal(r.status,400,'reset links work once');
sqlite.exec('DELETE FROM auth_attempts');
r=await post({action:'login',email:'ana@example.test',password:'a brand new secret'});assert.equal(r.status,200);token=decodeURIComponent(sessionCookie(r));
console.log('PASS password reset: requires email service, no account disclosure, single-use 1-hour link, verifies email, signs out other sessions');

// Sign out and cross-site requests
r=await post({action:'signout'},{cookie:'mk_session='+encodeURIComponent(token)});assert.match(r.headers.get('set-cookie'),/Max-Age=0/);
assert.equal(await auth.sessionUser('mk_session='+encodeURIComponent(token)),null);
r=await post({action:'login',email:'ana@example.test',password:'a brand new secret'},{origin:'https://evil.example'});assert.equal(r.status,403);
console.log('PASS sign out removes the session; cross-site requests are refused');

// Admin access needs a verified email
const data=load('app/data.ts',{'cloudflare:workers':{env},'next/headers':{headers:async()=>new Headers()},'./chatgpt-auth':{getChatGPTUser:async()=>null},'./auth':auth});
assert.equal(data.isAdmin({email:'owner@mk.test',verified:false}),false,'an unverified sign-up with the owner email is not admin');
assert.equal(data.isAdmin({email:'owner@mk.test',verified:true}),true);assert.equal(data.isAdmin({email:'owner@mk.test'}),true,'ChatGPT users stay admins');
console.log('PASS admin access requires a verified email');

// Google
const startGoogle=async()=>{const s=await start.GET(new Request('https://mk.test/api/auth/google?return_to=/account/customizations'));return{location:new URL(s.headers.get('location')),cookie:s.headers.get('set-cookie')};};
let s=await start.GET(new Request('https://mk.test/api/auth/google'));assert.match(s.headers.get('location'),/\/login\?error=google-unavailable/);
env.GOOGLE_CLIENT_ID='client-123';env.GOOGLE_CLIENT_SECRET='secret';
const begun=await startGoogle();assert.equal(begun.location.host,'accounts.google.com');assert.equal(begun.location.searchParams.get('code_challenge_method'),'S256');assert.equal(begun.location.searchParams.get('redirect_uri'),'https://mk.test/api/auth/google/callback');
const oauthCookie=begun.cookie.match(/mk_oauth=([^;]*)/)[1],state=begun.location.searchParams.get('state');
const idToken=claims=>'x.'+Buffer.from(JSON.stringify(claims)).toString('base64url')+'.sig';
const finish=(claims,{st=state}={})=>{googleResponse={id_token:idToken(claims)};return callback.GET(new Request(`https://mk.test/api/auth/google/callback?code=abc&state=${st}`,{headers:{cookie:'mk_oauth='+oauthCookie}}));};
const good={iss:'https://accounts.google.com',aud:'client-123',sub:'g-1',email:'Lea@Example.test',email_verified:true,name:'Léa',exp:Math.floor(Date.now()/1000)+600};
r=await finish(good,{st:'forged'});assert.match(r.headers.get('location'),/error=google-failed/,'state must match');
r=await finish({...good,aud:'someone-else'});assert.match(r.headers.get('location'),/error=google-failed/,'token must be for this app');
r=await finish({...good,email_verified:false});assert.match(r.headers.get('location'),/error=google-failed/,'Google email must be verified');
r=await finish(good);assert.equal(r.headers.get('location'),'https://mk.test/account/customizations');
user=await auth.sessionUser('mk_session='+r.headers.get('set-cookie').match(/mk_session=([^;]*)/)[1]);assert.equal(user.email,'lea@example.test');assert.equal(user.provider,'google');assert.equal(user.verified,true);
// Someone pre-registered this person's email with a password they never verified: Google proves ownership and that password stops working.
await post({action:'signup',name:'Squatter',email:'kim@example.test',password:'attacker secret 1'},{ip:'2.2.2.2'});
r=await finish({...good,sub:'g-2',email:'kim@example.test'});
const kim=row("SELECT user_id,password_hash FROM auth_identities WHERE subject='kim@example.test'");assert.equal(kim.password_hash,null);
assert.equal(row("SELECT user_id FROM auth_identities WHERE provider='google' AND subject='g-2'").user_id,kim.user_id,'Google joins the same account');
r=await post({action:'login',email:'kim@example.test',password:'attacker secret 1'});assert.equal(r.status,401,'the unverified password no longer opens the account');
console.log('PASS Google: unavailable without keys, PKCE + state, audience and verified-email checks, return path, safe linking to an existing email');
