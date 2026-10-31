// Sign in with Apple: server-only configuration, client assertion and signed ID-token validation.
import { env } from 'cloudflare:workers';
import { b64url } from './auth';
const config = (key: string) => (env as unknown as Record<string, string | undefined>)[key] || '';
export const appleEnabled = () => ['APPLE_CLIENT_ID','APPLE_TEAM_ID','APPLE_KEY_ID','APPLE_PRIVATE_KEY'].every(key => !!config(key));
export const appleClientId = () => config('APPLE_CLIENT_ID');
export const APPLE_COOKIE = 'mk_apple_oauth';
export function appleCookie(value: string, maxAge: number) {
    // Apple posts the callback cross-site; Lax would omit this request-binding cookie.
    return `${APPLE_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${maxAge}`;
}
const decode = (part: string) => Uint8Array.from(atob(part.replace(/-/g,'+').replace(/_/g,'/')), char => char.charCodeAt(0));
const encode = (value: unknown) => b64url(new TextEncoder().encode(JSON.stringify(value)));
export async function appleClientSecret() {
    const now = Math.floor(Date.now()/1000);
    const header = encode({alg:'ES256',kid:config('APPLE_KEY_ID')});
    const claims = encode({iss:config('APPLE_TEAM_ID'),iat:now,exp:now+300,aud:'https://appleid.apple.com',sub:appleClientId()});
    const pem = config('APPLE_PRIVATE_KEY').replace(/\\n/g,'\n').replace(/-----[^-]+-----/g,'').replace(/\s/g,'');
    const key = await crypto.subtle.importKey('pkcs8',decode(pem),{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
    const signature = await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,new TextEncoder().encode(`${header}.${claims}`));
    return `${header}.${claims}.${b64url(signature)}`;
}
type Claims = {iss:string;aud:string;sub:string;exp:number;iat:number;nonce:string;email?:string;email_verified?:boolean|string};
export async function verifyAppleToken(token: string, nonce: string): Promise<Claims> {
    if (!nonce || token.length>16000) throw Error('Invalid identity token');
    const parts = token.split('.'); if(parts.length!==3) throw Error('Invalid identity token');
    const header = JSON.parse(new TextDecoder().decode(decode(parts[0]))) as {alg?:string;kid?:string};
    if(header.alg!=='RS256'||!header.kid) throw Error('Unsupported identity signature');
    const response=await fetch('https://appleid.apple.com/auth/keys');
    if(!response.ok) throw Error('Identity keys unavailable');
    const {keys}=await response.json() as {keys:(JsonWebKey&{kid?:string;alg?:string})[]};
    const jwk=keys.find(key=>key.kid===header.kid&&key.kty==='RSA'&&key.alg==='RS256');
    if(!jwk) throw Error('Unknown identity key');
    const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
    if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(parts[2]),new TextEncoder().encode(`${parts[0]}.${parts[1]}`))) throw Error('Invalid identity signature');
    const claims=JSON.parse(new TextDecoder().decode(decode(parts[1]))) as Claims;
    const now=Math.floor(Date.now()/1000);
    if(claims.iss!=='https://appleid.apple.com'||claims.aud!==appleClientId()||typeof claims.sub!=='string'||!claims.sub||claims.sub.length>255||typeof claims.exp!=='number'||claims.exp<=now||typeof claims.iat!=='number'||claims.iat>now+30||claims.nonce!==nonce) throw Error('Invalid identity claims');
    return claims;
}
