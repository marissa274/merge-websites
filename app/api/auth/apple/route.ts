import { appleEnabled, appleClientId, appleCookie } from '../../../auth-apple';
import { randomToken, safeReturn } from '../../../auth';
export async function GET(request: Request) {
    const url=new URL(request.url),returnTo=safeReturn(url.searchParams.get('return_to'));
    if(!appleEnabled()||url.protocol!=='https:') return Response.redirect(`${url.origin}/login?error=apple-unavailable&return_to=${encodeURIComponent(returnTo)}`,302);
    const state=randomToken(),nonce=randomToken();
    const apple=new URL('https://appleid.apple.com/auth/authorize');
    apple.search=new URLSearchParams({client_id:appleClientId(),redirect_uri:`${url.origin}/api/auth/apple/callback`,response_type:'code',response_mode:'form_post',scope:'name email',state,nonce}).toString();
    return new Response(null,{status:302,headers:{Location:apple.toString(),'Cache-Control':'no-store','Set-Cookie':appleCookie(JSON.stringify({state,nonce,returnTo,created:Date.now()}),600)}});
}
