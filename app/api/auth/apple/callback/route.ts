import { env } from 'cloudflare:workers';
import { APPLE_COOKIE, appleEnabled, appleClientId, appleClientSecret, appleCookie, verifyAppleToken } from '../../../../auth-apple';
import { SESSION_COOKIE, cookie, readCookie, createSession, findIdentity, createAccount, linkIdentity, safeReturn, validEmail } from '../../../../auth';
const DB=()=> (env as unknown as {DB:D1Database}).DB;
const fail=(origin:string,returnTo='/account')=>new Response(null,{status:303,headers:{Location:`${origin}/login?error=apple-failed&return_to=${encodeURIComponent(safeReturn(returnTo))}`,'Cache-Control':'no-store','Set-Cookie':appleCookie('',0)}});
export async function POST(request:Request) {
    const origin=new URL(request.url).origin;
    let saved:{state?:string;nonce?:string;returnTo?:string;created?:number}={};
    try {
        if(!appleEnabled()||Number(request.headers.get('content-length')||0)>16384||!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return fail(origin);
        saved=JSON.parse(readCookie(request.headers.get('cookie'),APPLE_COOKIE)||'{}');
        if(!saved.state||!saved.nonce||!saved.created||saved.created>Date.now()||Date.now()-saved.created>600000) return fail(origin);
        const raw=await request.text();if(raw.length>16384) return fail(origin,saved.returnTo);
        const form=new URLSearchParams(raw),code=form.get('code');
        if(!code||code.length>4096||form.get('state')!==saved.state||form.has('error')) return fail(origin,saved.returnTo);
        const response=await fetch('https://appleid.apple.com/auth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:appleClientId(),client_secret:await appleClientSecret(),code,grant_type:'authorization_code',redirect_uri:`${origin}/api/auth/apple/callback`})});
        const tokens=await response.json() as {id_token?:string};
        if(!response.ok||!tokens.id_token) return fail(origin,saved.returnTo);
        const claims=await verifyAppleToken(tokens.id_token,saved.nonce);
        let userId=(await findIdentity('apple',claims.sub))?.user_id;
        if(!userId){
            if(typeof claims.email!=='string'||!validEmail(claims.email)||(claims.email_verified!==true&&claims.email_verified!=='true')) return fail(origin,saved.returnTo);
            const email=claims.email.toLowerCase();
            const owner=await DB().prepare("SELECT u.id AS user_id, EXISTS(SELECT 1 FROM auth_identities i WHERE i.user_id=u.id AND i.provider='password' AND i.email_verified=0) AS unsafe_password FROM users u WHERE lower(u.email)=? LIMIT 1").bind(email).first<{user_id:string;unsafe_password:number}>();
            if(owner){
                await linkIdentity(owner.user_id,'apple',claims.sub);userId=owner.user_id;
                if(owner.unsafe_password) await DB().batch([DB().prepare("UPDATE auth_identities SET password_hash=NULL WHERE user_id=? AND provider='password' AND email_verified=0").bind(userId),DB().prepare('DELETE FROM auth_sessions WHERE user_id=?').bind(userId)]);
            }else{
                let name=email;
                try{const user=JSON.parse(form.get('user')||'{}') as {name?:{firstName?:unknown;lastName?:unknown}};name=[user.name?.firstName,user.name?.lastName].filter(v=>typeof v==='string').join(' ').slice(0,100)||email;}catch{/* Apple only returns a display name on first consent. */}
                userId=await createAccount({email,name,provider:'apple',subject:claims.sub,verified:true});
            }
        }
        const session=await createSession(userId);
        const headers=new Headers({Location:`${origin}${safeReturn(saved.returnTo)}`,'Cache-Control':'no-store'});
        headers.append('Set-Cookie',cookie(SESSION_COOKIE,session.token,request,session.maxAge));headers.append('Set-Cookie',appleCookie('',0));
        return new Response(null,{status:303,headers});
    }catch{return fail(origin,saved.returnTo);}
}
