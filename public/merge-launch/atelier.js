function wd(i,e){i.indexOf(e)===-1&&i.push(e)}function vs(i,e){let t=i.indexOf(e);t>-1&&i.splice(t,1)}var Ln=(i,e,t)=>t>e?e:t<i?i:t;var Fi=()=>{},qn=()=>{};var Fn={};var Ya=i=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i);var Ed=i=>typeof i=="object"&&i!==null;var Za=i=>/^0[^.\s]+$/u.test(i);function Ka(i){let e;return()=>(e===void 0&&(e=i()),e)}var ri=i=>i;var Ms=(...i)=>i.reduce((e,t)=>n=>t(e(n)));var Ss=(i,e,t)=>{let n=e-i;return n?(t-i)/n:1};var bs=class{constructor(){this.subscriptions=[]}add(e){return wd(this.subscriptions,e),()=>vs(this.subscriptions,e)}notify(e,t,n){let r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,t,n);else for(let s=0;s<r;s++){let o=this.subscriptions[s];o&&o(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};var Jt=i=>i*1e3,xn=i=>i/1e3;var $a=(i,e)=>e?i*(1e3/e):0;var Qg=(i,e,t)=>{let n=e-i;return((t-i)%n+n)%n+i};var jg=(i,e,t)=>(((1-3*t+3*e)*i+(3*t-6*e))*i+3*e)*i,HM=1e-7,GM=12;function WM(i,e,t,n,r){let s,o,a=0;do o=e+(t-e)/2,s=jg(o,n,r)-i,s>0?t=o:e=o;while(Math.abs(s)>HM&&++a<GM);return o}function Br(i,e,t,n){if(i===e&&t===n)return ri;let r=s=>WM(s,0,1,i,t);return s=>s===0||s===1?s:jg(r(s),e,n)}var $c=i=>e=>e<=.5?i(2*e)/2:(2-i(2*(1-e)))/2;var Ts=i=>e=>1-i(1-e);var Jc=Br(.33,1.53,.69,.99),So=Ts(Jc),Ja=$c(So);var Qa=i=>i>=1?1:(i*=2)<1?.5*So(i):.5*(2-Math.pow(2,-10*(i-1)));var ja=i=>1-Math.sin(Math.acos(i)),Ad=Ts(ja),el=$c(ja);var Cd=Br(.42,0,1,1),Rd=Br(0,0,.58,1),tl=Br(.42,0,.58,1);var nl=i=>Array.isArray(i)&&typeof i[0]!="number";function il(i,e){return nl(i)?i[Qg(0,i.length,e)]:i}var rl=i=>Array.isArray(i)&&typeof i[0]=="number";var e_={linear:ri,easeIn:Cd,easeInOut:tl,easeOut:Rd,circIn:ja,circInOut:el,circOut:Ad,backIn:So,backInOut:Ja,backOut:Jc,anticipate:Qa},XM=i=>typeof i=="string",Qc=i=>{if(rl(i)){qn(i.length===4,"Cubic bezier arrays must contain four numerical values.","cubic-bezier-length");let[e,t,n,r]=i;return Br(e,t,n,r)}else if(XM(i))return qn(e_[i]!==void 0,`Invalid easing type '${i}'`,"invalid-easing-type"),e_[i];return i};var sl=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function t_(i){let e=new Set,t=new Set,n=!1,r=!1,s=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){s.has(c)&&(l.schedule(c),i()),c(o)}let l={schedule:(c,u=!1,h=!1)=>{let f=h&&n?e:t;return u&&s.add(c),f.add(c),c},cancel:c=>{t.delete(c),s.delete(c)},process:c=>{if(o=c,n){r=!0;return}n=!0;let u=e;e=t,t=u,e.forEach(a),e.clear(),n=!1,r&&(r=!1,l.process(c))}};return l}var qM=40;function jc(i,e){let t=!1,n=!0,r={delta:0,timestamp:0,isProcessing:!1},s=()=>t=!0,o=sl.reduce((M,x)=>(M[x]=t_(s),M),{}),{setup:a,read:l,resolveKeyframes:c,preUpdate:u,update:h,preRender:d,render:f,postRender:g}=o,_=()=>{let M=Fn.useManualTiming,x=M?r.timestamp:performance.now();t=!1,M||(r.delta=n?1e3/60:Math.max(Math.min(x-r.timestamp,qM),1)),r.timestamp=x,r.isProcessing=!0,a.process(r),l.process(r),c.process(r),u.process(r),h.process(r),d.process(r),f.process(r),g.process(r),r.isProcessing=!1,t&&e&&(n=!1,i(_))},m=()=>{t=!0,n=!0,r.isProcessing||i(_)};return{schedule:sl.reduce((M,x)=>{let b=o[x];return M[x]=(w,T=!1,C=!1)=>(t||m(),b.schedule(w,T,C)),M},{}),cancel:M=>{for(let x=0;x<sl.length;x++)o[sl[x]].cancel(M)},state:r,steps:o}}var{schedule:yn,cancel:ol,state:bo,steps:bI}=jc(typeof requestAnimationFrame<"u"?requestAnimationFrame:ri,!0);var eu;function YM(){eu=void 0}var nn={now:()=>(eu===void 0&&nn.set(bo.isProcessing||Fn.useManualTiming?bo.timestamp:performance.now()),eu),set:i=>{eu=i,queueMicrotask(YM)}};var n_=i=>e=>typeof e=="string"&&e.startsWith(i),tu=n_("--"),ZM=n_("var(--"),To=i=>ZM(i)?KM.test(i.split("/*")[0].trim()):!1,KM=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Pd(i){return typeof i!="string"?!1:i.split("/*")[0].includes("var(--")}var Yi={test:i=>typeof i=="number",parse:parseFloat,transform:i=>i},cr={...Yi,transform:i=>Ln(0,1,i)},al={...Yi,default:1};var kr=i=>Math.round(i*1e5)/1e5;var wo=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function i_(i){return i==null}var r_=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Eo=(i,e)=>t=>!!(typeof t=="string"&&r_.test(t)&&t.startsWith(i)||e&&!i_(t)&&Object.prototype.hasOwnProperty.call(t,e)),nu=(i,e,t)=>n=>{if(typeof n!="string")return n;let[r,s,o,a]=n.match(wo);return{[i]:parseFloat(r),[e]:parseFloat(s),[t]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var $M=i=>Ln(0,255,i),Id={...Yi,transform:i=>Math.round($M(i))},Zi={test:Eo("rgb","red"),parse:nu("red","green","blue"),transform:({red:i,green:e,blue:t,alpha:n=1})=>"rgba("+Id.transform(i)+", "+Id.transform(e)+", "+Id.transform(t)+", "+kr(cr.transform(n))+")"};function JM(i){let e="",t="",n="",r="";return i.length>5?(e=i.substring(1,3),t=i.substring(3,5),n=i.substring(5,7),r=i.substring(7,9)):(e=i.substring(1,2),t=i.substring(2,3),n=i.substring(3,4),r=i.substring(4,5),e+=e,t+=t,n+=n,r+=r),{red:parseInt(e,16),green:parseInt(t,16),blue:parseInt(n,16),alpha:r?parseInt(r,16)/255:1}}var ll={test:Eo("#"),parse:JM,transform:Zi.transform};var cl=i=>({test:e=>typeof e=="string"&&e.endsWith(i)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${i}`}),Ni=cl("deg"),Vr=cl("%"),be=cl("px"),s_=cl("vh"),o_=cl("vw"),Dd={...Vr,parse:i=>Vr.parse(i)/100,transform:i=>Vr.transform(i*100)};var zr={test:Eo("hsl","hue"),parse:nu("hue","saturation","lightness"),transform:({hue:i,saturation:e,lightness:t,alpha:n=1})=>"hsla("+Math.round(i)+", "+Vr.transform(kr(e))+", "+Vr.transform(kr(t))+", "+kr(cr.transform(n))+")"};var Ft={test:i=>Zi.test(i)||ll.test(i)||zr.test(i),parse:i=>Zi.test(i)?Zi.parse(i):zr.test(i)?zr.parse(i):ll.parse(i),transform:i=>typeof i=="string"?i:i.hasOwnProperty("red")?Zi.transform(i):zr.transform(i),getAnimatableNone:i=>{let e=Ft.parse(i);return e.alpha=0,Ft.transform(e)}};var a_=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function QM(i){return isNaN(i)&&typeof i=="string"&&(i.match(wo)?.length||0)+(i.match(a_)?.length||0)>0}var c_="number",u_="color",jM="var",eS="var(",l_="${}",tS=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Hr(i){let e=i.toString(),t=[],n={color:[],number:[],var:[]},r=[],s=0,a=e.replace(tS,l=>(Ft.test(l)?(n.color.push(s),r.push(u_),t.push(Ft.parse(l))):l.startsWith(eS)?(n.var.push(s),r.push(jM),t.push(l)):(n.number.push(s),r.push(c_),t.push(parseFloat(l))),++s,l_)).split(l_);return{values:t,split:a,indexes:n,types:r}}function nS(i){return Hr(i).values}function h_({split:i,types:e}){let t=i.length;return n=>{let r="";for(let s=0;s<t;s++)if(r+=i[s],n[s]!==void 0){let o=e[s];o===c_?r+=kr(n[s]):o===u_?r+=Ft.transform(n[s]):r+=n[s]}return r}}function iS(i){return h_(Hr(i))}var rS=i=>typeof i=="number"?0:Ft.test(i)?Ft.getAnimatableNone(i):i,sS=(i,e)=>typeof i=="number"?e?.trim().endsWith("/")?i:0:rS(i);function oS(i){let e=Hr(i);return h_(e)(e.values.map((n,r)=>sS(n,e.split[r])))}var rn={test:QM,parse:nS,createTransformer:iS,getAnimatableNone:oS};function Ld(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*(2/3-t)*6:i}function f_({hue:i,saturation:e,lightness:t,alpha:n}){i/=360,e/=100,t/=100;let r=0,s=0,o=0;if(!e)r=s=o=t;else{let a=t<.5?t*(1+e):t+e-t*e,l=2*t-a;r=Ld(l,a,i+1/3),s=Ld(l,a,i),o=Ld(l,a,i-1/3)}return{red:Math.round(r*255),green:Math.round(s*255),blue:Math.round(o*255),alpha:n}}function Ao(i,e){return t=>t>0?e:i}var si=(i,e,t)=>i+(e-i)*t;var Fd=(i,e,t)=>{let n=i*i,r=t*(e*e-n)+n;return r<0?0:Math.sqrt(r)},aS=[ll,Zi,zr],lS=i=>aS.find(e=>e.test(i));function d_(i){let e=lS(i);if(Fi(!!e,`'${i}' is not an animatable color. Use the equivalent color code instead.`,"color-not-animatable"),!e)return!1;let t=e.parse(i);return e===zr&&(t=f_(t)),t}var Nd=(i,e)=>{let t=d_(i),n=d_(e);if(!t||!n)return Ao(i,e);let r={...t};return s=>(r.red=Fd(t.red,n.red,s),r.green=Fd(t.green,n.green,s),r.blue=Fd(t.blue,n.blue,s),r.alpha=si(t.alpha,n.alpha,s),Zi.transform(r))};var iu=new Set(["none","hidden"]);function p_(i,e){return iu.has(i)?t=>t<=0?i:e:t=>t>=1?e:i}function cS(i,e){return t=>si(i,e,t)}function ru(i){return typeof i=="number"?cS:typeof i=="string"?To(i)?Ao:Ft.test(i)?Nd:fS:Array.isArray(i)?m_:typeof i=="object"?Ft.test(i)?Nd:uS:Ao}function m_(i,e){let t=[...i],n=t.length,r=i.map((s,o)=>ru(s)(s,e[o]));return s=>{for(let o=0;o<n;o++)t[o]=r[o](s);return t}}function uS(i,e){let t={...i,...e},n={};for(let r in t)i[r]!==void 0&&e[r]!==void 0&&(n[r]=ru(i[r])(i[r],e[r]));return r=>{for(let s in n)t[s]=n[s](r);return t}}function hS(i,e){let t=[],n={color:0,var:0,number:0};for(let r=0;r<e.values.length;r++){let s=e.types[r],o=i.indexes[s][n[s]],a=i.values[o]??0;t[r]=a,n[s]++}return t}var fS=(i,e)=>{let t=rn.createTransformer(e),n=Hr(i),r=Hr(e);return n.indexes.var.length===r.indexes.var.length&&n.indexes.color.length===r.indexes.color.length&&n.indexes.number.length>=r.indexes.number.length?iu.has(i)&&!r.values.length||iu.has(e)&&!n.values.length?p_(i,e):Ms(m_(hS(n,r),r.values),t):(Fi(!0,`Complex values '${i}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,"complex-values-different"),Ao(i,e))};function su(i,e,t){return typeof i=="number"&&typeof e=="number"&&typeof t=="number"?si(i,e,t):ru(i)(i,e)}var g_=i=>{let e=({timestamp:t})=>i(t);return{start:(t=!0)=>yn.update(e,t),stop:()=>ol(e),now:()=>bo.isProcessing?bo.timestamp:nn.now()}};var ou=(i,e,t=10)=>{let n="",r=Math.max(Math.round(e/t),2);for(let s=0;s<r;s++)n+=Math.round(i(s/(r-1))*1e4)/1e4+", ";return`linear(${n.substring(0,n.length-2)})`};function Co(i){let e=0,t=50,n=i.next(e);for(;!n.done&&e<2e4;)e+=t,n=i.next(e);return e>=2e4?1/0:e}function ul(i,e=100,t){let n=t({...i,keyframes:[0,e]}),r=Math.min(Co(n),2e4);return{type:"keyframes",ease:s=>n.next(r*s).value/e,duration:xn(r)}}var Bt={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Bd(i,e){return i*Math.sqrt(1-e*e)}var dS=12;function pS(i,e,t){let n=t;for(let r=1;r<dS;r++)n=n-i(n)/e(n);return n}var Od=.001;function mS({duration:i=Bt.duration,bounce:e=Bt.bounce,velocity:t=Bt.velocity,mass:n=Bt.mass}){let r,s;Fi(i<=Jt(Bt.maxDuration),"Spring duration must be 10 seconds or less","spring-duration-limit");let o=1-e;o=Ln(Bt.minDamping,Bt.maxDamping,o),i=Ln(Bt.minDuration,Bt.maxDuration,xn(i)),o<1?(r=c=>{let u=c*o,h=u*i,d=u-t,f=Bd(c,o),g=Math.exp(-h);return Od-d/f*g},s=c=>{let h=c*o*i,d=h*t+t,f=Math.pow(o,2)*Math.pow(c,2)*i,g=Math.exp(-h),_=Bd(Math.pow(c,2),o);return(-r(c)+Od>0?-1:1)*((d-f)*g)/_}):(r=c=>{let u=Math.exp(-c*i),h=(c-t)*i+1;return-Od+u*h},s=c=>{let u=Math.exp(-c*i),h=(t-c)*(i*i);return u*h});let a=5/i,l=pS(r,s,a);if(i=Jt(i),isNaN(l))return{stiffness:Bt.stiffness,damping:Bt.damping,duration:i};{let c=Math.pow(l,2)*n;return{stiffness:c,damping:o*2*Math.sqrt(n*c),duration:i}}}var gS=["duration","bounce"],_S=["stiffness","damping","mass"];function __(i,e){return e.some(t=>i[t]!==void 0)}function xS(i){let e={velocity:Bt.velocity,stiffness:Bt.stiffness,damping:Bt.damping,mass:Bt.mass,isResolvedFromDuration:!1,...i};if(!__(i,_S)&&__(i,gS))if(e.velocity=0,i.visualDuration){let t=i.visualDuration,n=2*Math.PI/(t*1.2),r=n*n,s=2*Ln(.05,1,1-(i.bounce||0))*Math.sqrt(r);e={...e,mass:Bt.mass,stiffness:r,damping:s}}else{let t=mS({...i,velocity:0});e={...e,...t,mass:Bt.mass},e.isResolvedFromDuration=!0}return e}function ur(i=Bt.visualDuration,e=Bt.bounce){let t=typeof i!="object"?{visualDuration:i,keyframes:[0,1],bounce:e}:i,{restSpeed:n,restDelta:r}=t,s=t.keyframes[0],o=t.keyframes[t.keyframes.length-1],a={done:!1,value:s},{stiffness:l,damping:c,mass:u,duration:h,velocity:d,isResolvedFromDuration:f}=xS({...t,velocity:-xn(t.velocity||0)}),g=d||0,_=c/(2*Math.sqrt(l*u)),m=o-s,p=xn(Math.sqrt(l/u)),S=Math.abs(m)<5;n||(n=S?Bt.restSpeed.granular:Bt.restSpeed.default),r||(r=S?Bt.restDelta.granular:Bt.restDelta.default);let M,x,b,w,T,C;if(_<1)b=Bd(p,_),w=(g+_*p*m)/b,M=y=>{let R=Math.exp(-_*p*y);return o-R*(w*Math.sin(b*y)+m*Math.cos(b*y))},T=_*p*w+m*b,C=_*p*m-w*b,x=y=>Math.exp(-_*p*y)*(T*Math.sin(b*y)+C*Math.cos(b*y));else if(_===1){M=R=>o-Math.exp(-p*R)*(m+(g+p*m)*R);let y=g+p*m;x=R=>Math.exp(-p*R)*(p*y*R-g)}else{let y=p*Math.sqrt(_*_-1);M=V=>{let W=Math.exp(-_*p*V),G=Math.min(y*V,300);return o-W*((g+_*p*m)*Math.sinh(G)+y*m*Math.cosh(G))/y};let R=(g+_*p*m)/y,D=_*p*R-m*y,U=_*p*m-R*y;x=V=>{let W=Math.exp(-_*p*V),G=Math.min(y*V,300);return W*(D*Math.sinh(G)+U*Math.cosh(G))}}let v={calculatedDuration:f&&h||null,velocity:y=>Jt(x(y)),next:y=>{if(!f&&_<1){let D=Math.exp(-_*p*y),U=Math.sin(b*y),V=Math.cos(b*y),W=o-D*(w*U+m*V),G=Jt(D*(T*U+C*V));return a.done=Math.abs(G)<=n&&Math.abs(o-W)<=r,a.value=a.done?o:W,a}let R=M(y);if(f)a.done=y>=h;else{let D=Jt(x(y));a.done=Math.abs(D)<=n&&Math.abs(o-R)<=r}return a.value=a.done?o:R,a},toString:()=>{let y=Math.min(Co(v),2e4),R=ou(D=>v.next(y*D).value,y,30);return y+"ms "+R},toTransition:()=>{}};return v}ur.applyToOptions=i=>{let e=ul(i,100,ur);return i.ease=e.ease,i.duration=Jt(e.duration),i.type="keyframes",i};var yS=5;function au(i,e,t){let n=Math.max(e-yS,0);return $a(t-i(n),e-n)}function hl({keyframes:i,velocity:e=0,power:t=.8,timeConstant:n=325,bounceDamping:r=10,bounceStiffness:s=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:u}){let h=i[0],d={done:!1,value:h},f=C=>a!==void 0&&C<a||l!==void 0&&C>l,g=C=>a===void 0?l:l===void 0||Math.abs(a-C)<Math.abs(l-C)?a:l,_=t*e,m=h+_,p=o===void 0?m:o(m);p!==m&&(_=p-h);let S=C=>-_*Math.exp(-C/n),M=C=>p+S(C),x=C=>{let v=S(C),y=M(C);d.done=Math.abs(v)<=c,d.value=d.done?p:y},b,w,T=C=>{f(d.value)&&(b=C,w=ur({keyframes:[d.value,g(d.value)],velocity:au(M,C,d.value),damping:r,stiffness:s,restDelta:c,restSpeed:u}))};return T(0),{calculatedDuration:null,next:C=>{let v=!1;return!w&&b===void 0&&(v=!0,x(C),T(C)),b!==void 0&&C>=b?w.next(C-b):(!v&&x(C),d)}}}function vS(i,e,t){let n=[],r=t||Fn.mix||su,s=i.length-1;for(let o=0;o<s;o++){let a=r(i[o],i[o+1]);if(e){let l=Array.isArray(e)?e[o]||ri:e;a=Ms(l,a)}n.push(a)}return n}function x_(i,e,{clamp:t=!0,ease:n,mixer:r}={}){let s=i.length;if(qn(s===e.length,"Both input and output ranges must be the same length","range-length"),s===1)return()=>e[0];if(s===2&&e[0]===e[1])return()=>e[1];let o=i[0]===i[1];i[0]>i[s-1]&&(i=[...i].reverse(),e=[...e].reverse());let a=vS(e,n,r),l=a.length,c=u=>{if(o&&u<i[0])return e[0];let h=0;if(l>1)for(;h<i.length-2&&!(u<i[h+1]);h++);let d=Ss(i[h],i[h+1],u);return a[h](d)};return t?u=>c(Ln(i[0],i[s-1],u)):c}function fl(i,e){let t=i[i.length-1];for(let n=1;n<=e;n++){let r=Ss(0,e,n);i.push(si(t,1,r))}}function dl(i){let e=[0];return fl(e,i.length-1),e}function y_(i,e){return i.map(t=>t*e)}function MS(i,e){return i.map(()=>e||tl).splice(0,i.length-1)}function ws({duration:i=300,keyframes:e,times:t,ease:n="easeInOut"}){let r=nl(n)?n.map(Qc):Qc(n),s={done:!1,value:e[0]},o=y_(t&&t.length===e.length?t:dl(e),i),a=x_(o,e,{ease:Array.isArray(r)?r:MS(e,r)});return{calculatedDuration:i,next:l=>(s.value=a(l),s.done=l>=i,s)}}var SS=i=>i!==null;function Gr(i,{repeat:e,repeatType:t="loop"},n,r=1){let s=i.filter(SS),a=r<0||e&&t!=="loop"&&e%2===1?0:s.length-1;return!a||n===void 0?s[a]:n}var bS={decay:hl,inertia:hl,tween:ws,keyframes:ws,spring:ur};function lu(i){typeof i.type=="string"&&(i.type=bS[i.type])}var Wr=class{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}};var TS=i=>i/100,hr=class extends Wr{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:t}=this.options;t&&t.updatedAt!==nn.now()&&this.tick(nn.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){let{options:e}=this;lu(e);let{type:t=ws,repeat:n=0,repeatDelay:r=0,repeatType:s,velocity:o=0}=e,{keyframes:a}=e,l=t||ws;l!==ws&&typeof a[0]!="number"&&(this.mixKeyframes=Ms(TS,su(a[0],a[1])),a=[0,100]);let c=l({...e,keyframes:a});s==="mirror"&&(this.mirroredGenerator=l({...e,keyframes:[...a].reverse(),velocity:-o})),c.calculatedDuration===null&&(c.calculatedDuration=Co(c));let{calculatedDuration:u}=c;this.calculatedDuration=u,this.resolvedDuration=u+r,this.totalDuration=this.resolvedDuration*(n+1)-r,this.generator=c}updateTime(e){let t=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=t}tick(e,t=!1){let{generator:n,totalDuration:r,mixKeyframes:s,mirroredGenerator:o,resolvedDuration:a,calculatedDuration:l}=this;if(this.startTime===null)return n.next(0);let{delay:c=0,keyframes:u,repeat:h,repeatType:d,repeatDelay:f,type:g,onUpdate:_,finalKeyframe:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let p=this.currentTime-c*(this.playbackSpeed>=0?1:-1),S=this.playbackSpeed>=0?p<0:p>r;this.currentTime=Math.max(p,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=r);let M=this.currentTime,x=n;if(h){let C=Math.min(this.currentTime,r)/a,v=Math.floor(C),y=C%1;!y&&C>=1&&(y=1),y===1&&v--,v=Math.min(v,h+1),v%2&&(d==="reverse"?(y=1-y,f&&(y-=f/a)):d==="mirror"&&(x=o)),M=Ln(0,1,y)*a}let b;S?(this.delayState.value=u[0],b=this.delayState):b=x.next(M),s&&!S&&(b.value=s(b.value));let{done:w}=b;!S&&l!==null&&(w=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let T=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&w);return T&&g!==hl&&(b.value=Gr(u,this.options,m,this.speed)),_&&_(b.value),T&&this.finish(),b}then(e,t){return this.finished.then(e,t)}get duration(){return xn(this.calculatedDuration)}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+xn(e)}get time(){return xn(this.currentTime)}set time(e){e=Jt(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){let e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);let t=this.generator.next(e).value;return au(n=>this.generator.next(n).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(nn.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=xn(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=g_,startTime:t}=this.options;this.driver||(this.driver=e(r=>this.tick(r))),this.options.onPlay?.();let n=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=n):this.holdTime!==null?this.startTime=n-this.holdTime:this.startTime||(this.startTime=t??n),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(nn.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}};function v_(i){for(let e=1;e<i.length;e++)i[e]??(i[e]=i[e-1])}var Es=i=>i*180/Math.PI,kd=i=>{let e=Es(Math.atan2(i[1],i[0]));return Vd(e)},wS={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:i=>(Math.abs(i[0])+Math.abs(i[3]))/2,rotate:kd,rotateZ:kd,skewX:i=>Es(Math.atan(i[1])),skewY:i=>Es(Math.atan(i[2])),skew:i=>(Math.abs(i[1])+Math.abs(i[2]))/2},Vd=i=>(i=i%360,i<0&&(i+=360),i),M_=kd,S_=i=>Math.sqrt(i[0]*i[0]+i[1]*i[1]),b_=i=>Math.sqrt(i[4]*i[4]+i[5]*i[5]),ES={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:S_,scaleY:b_,scale:i=>(S_(i)+b_(i))/2,rotateX:i=>Vd(Es(Math.atan2(i[6],i[5]))),rotateY:i=>Vd(Es(Math.atan2(-i[2],i[0]))),rotateZ:M_,rotate:M_,skewX:i=>Es(Math.atan(i[4])),skewY:i=>Es(Math.atan(i[1])),skew:i=>(Math.abs(i[1])+Math.abs(i[4]))/2};function cu(i){return i.includes("scale")?1:0}function uu(i,e){if(!i||i==="none")return cu(e);let t=i.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),n,r;if(t)n=ES,r=t;else{let a=i.match(/^matrix\(([-\d.e\s,]+)\)$/u);n=wS,r=a}if(!r)return cu(e);let s=n[e],o=r[1].split(",").map(AS);return typeof s=="function"?s(o):o[s]}var T_=(i,e)=>{let{transform:t="none"}=getComputedStyle(i);return uu(t,e)};function AS(i){return parseFloat(i.trim())}var Ki=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Si=new Set([...Ki,"pathRotation"]);var zd=i=>i===Yi||i===be,CS=new Set(["x","y","z"]),RS=Ki.filter(i=>!CS.has(i));function w_(i){let e=[];return RS.forEach(t=>{let n=i.getValue(t);n!==void 0&&(e.push([t,n.get()]),n.set(t.startsWith("scale")?1:0))}),e}var fr={width:({x:i},{paddingLeft:e="0",paddingRight:t="0",boxSizing:n})=>{let r=i.max-i.min;return n==="border-box"?r:r-parseFloat(e)-parseFloat(t)},height:({y:i},{paddingTop:e="0",paddingBottom:t="0",boxSizing:n})=>{let r=i.max-i.min;return n==="border-box"?r:r-parseFloat(e)-parseFloat(t)},top:(i,{top:e})=>parseFloat(e),left:(i,{left:e})=>parseFloat(e),bottom:({y:i},{top:e})=>parseFloat(e)+(i.max-i.min),right:({x:i},{left:e})=>parseFloat(e)+(i.max-i.min),x:(i,{transform:e})=>uu(e,"x"),y:(i,{transform:e})=>uu(e,"y")};fr.translateX=fr.x;fr.translateY=fr.y;var As=new Set,Hd=!1,Gd=!1,Wd=!1;function E_(){if(Gd){let i=Array.from(As).filter(n=>n.needsMeasurement),e=new Set(i.map(n=>n.element)),t=new Map;e.forEach(n=>{let r=w_(n);r.length&&(t.set(n,r),n.render())}),i.forEach(n=>n.measureInitialState()),e.forEach(n=>{n.render();let r=t.get(n);r&&r.forEach(([s,o])=>{n.getValue(s)?.set(o)})}),i.forEach(n=>n.measureEndState()),i.forEach(n=>{n.suspendedScrollY!==void 0&&window.scrollTo(0,n.suspendedScrollY)})}Gd=!1,Hd=!1,As.forEach(i=>i.complete(Wd)),As.clear()}function A_(){As.forEach(i=>{i.readKeyframes(),i.needsMeasurement&&(Gd=!0)})}function C_(){Wd=!0,A_(),E_(),Wd=!1}var Xr=class{constructor(e,t,n,r,s,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=r,this.element=s,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(As.add(this),Hd||(Hd=!0,yn.read(A_),yn.resolveKeyframes(E_))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:r}=this;if(e[0]===null){let s=r?.get(),o=e[e.length-1];if(s!==void 0)e[0]=s;else if(n&&t){let a=n.readValue(t,o);a!=null&&(e[0]=a)}e[0]===void 0&&(e[0]=o),r&&s===void 0&&r.set(e[0])}v_(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),As.delete(this)}cancel(){this.state==="scheduled"&&(As.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}};var R_=i=>i.startsWith("--");function hu(i,e,t){R_(e)?i.style.setProperty(e,t):i.style[e]=t}var P_={};function fu(i,e){let t=Ka(i);return()=>P_[e]??t()}var I_=fu(()=>window.ScrollTimeline!==void 0,"scrollTimeline");var du=fu(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");var Cs=([i,e,t,n])=>`cubic-bezier(${i}, ${e}, ${t}, ${n})`;var Xd={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Cs([0,.65,.55,1]),circOut:Cs([.55,0,1,.45]),backIn:Cs([.31,.01,.66,-.59]),backOut:Cs([.33,1.53,.69,.99])};function qd(i,e){if(i)return typeof i=="function"?du()?ou(i,e):"ease-out":rl(i)?Cs(i):Array.isArray(i)?i.map(t=>qd(t,e)||Xd.easeOut):Xd[i]}function D_(i,e,t,{delay:n=0,duration:r=300,repeat:s=0,repeatType:o="loop",ease:a="easeOut",times:l}={},c=void 0){let u={[e]:t};l&&(u.offset=l);let h=qd(a,r);Array.isArray(h)&&(u.easing=h);let d={delay:n,duration:r,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:s+1,direction:o==="reverse"?"alternate":"normal"};return c&&(d.pseudoElement=c),i.animate(u,d)}function Rs(i){return typeof i=="function"&&"applyToOptions"in i}function L_({type:i,...e}){return Rs(i)&&du()?i.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}var Ro=class extends Wr{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:n,keyframes:r,pseudoElement:s,allowFlatten:o=!1,finalKeyframe:a,onComplete:l}=e;this.isPseudoElement=!!s,this.allowFlatten=o,this.options=e,qn(typeof e.type!="string",`Mini animate() doesn't support "type" as a string.`,"mini-spring");let c=L_(e);this.animation=D_(t,n,r,c,s),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!s){let u=Gr(r,this.options,a,this.speed);this.updateMotionValue&&this.updateMotionValue(u),hu(t,n,u),this.animation.cancel()}l?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return xn(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+xn(e)}get time(){return xn(Number(this.animation.currentTime)||0)}set time(e){let t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Jt(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:n,observe:r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,e&&I_()?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),n&&(this.animation.rangeEnd=n),ri):r(this)}};var F_={anticipate:Qa,backInOut:Ja,circInOut:el};function PS(i){return i in F_}function N_(i){typeof i.ease=="string"&&PS(i.ease)&&(i.ease=F_[i.ease])}var Yd=10,pu=class extends Ro{constructor(e){N_(e),lu(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:t,onUpdate:n,onComplete:r,element:s,...o}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}let a=new hr({...o,autoplay:!1}),l=Math.max(Yd,nn.now()-this.startTime),c=Ln(0,Yd,l-Yd),u=a.sample(l).value,{name:h}=this.options;s&&h&&hu(s,h,u),t.setWithVelocity(a.sample(Math.max(0,l-c)).value,u,c),a.stop()}};var Zd=(i,e)=>e==="zIndex"?!1:!!(typeof i=="number"||Array.isArray(i)||typeof i=="string"&&(rn.test(i)||i==="0")&&!i.startsWith("url("));function IS(i){let e=i[0];if(i.length===1)return!0;for(let t=0;t<i.length;t++)if(i[t]!==e)return!0}function U_(i,e,t,n){let r=i[0];if(r===null)return!1;if(e==="display"||e==="visibility")return!0;let s=i[i.length-1],o=Zd(r,e),a=Zd(s,e);return Fi(o===a,`You are trying to animate ${e} from "${r}" to "${s}". "${o?s:r}" is not an animatable value.`,"value-not-animatable"),!o||!a?!1:IS(i)||(t==="spring"||Rs(t))&&n}function pl(i){i.duration=0,i.type="keyframes"}var mu=new Set(["opacity","clipPath","filter","transform","backgroundColor"]);var DS=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function O_(i){for(let e=0;e<i.length;e++)if(typeof i[e]=="string"&&DS.test(i[e]))return!0;return!1}var LS=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),FS=Ka(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function B_(i){let{motionValue:e,name:t,repeatDelay:n,repeatType:r,damping:s,type:o,keyframes:a}=i,l=e?.owner?.current;if(!(l instanceof HTMLElement)&&!(l instanceof SVGElement))return!1;let{onUpdate:c,transformTemplate:u}=e.owner.getProps();return FS()&&t&&(mu.has(t)||LS.has(t)&&O_(a))&&(t!=="transform"||!u)&&!c&&!n&&r!=="mirror"&&s!==0&&o!=="inertia"}var NS=40,gu=class extends Wr{constructor({autoplay:e=!0,delay:t=0,type:n="keyframes",repeat:r=0,repeatDelay:s=0,repeatType:o="loop",keyframes:a,name:l,motionValue:c,element:u,...h}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=nn.now();let d={autoplay:e,delay:t,type:n,repeat:r,repeatDelay:s,repeatType:o,name:l,motionValue:c,element:u,...h},f=u?.KeyframeResolver||Xr;this.keyframeResolver=new f(a,(g,_,m)=>this.onKeyframesResolved(g,_,d,!m),l,c,u),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,n,r){this.keyframeResolver=void 0;let{name:s,type:o,velocity:a,delay:l,isHandoff:c,onUpdate:u}=n;this.resolvedAt=nn.now();let h=!0;U_(e,s,o,a)||(h=!1,(Fn.instantAnimations||!l)&&u?.(Gr(e,n,t)),e[0]=e[e.length-1],pl(n),n.repeat=0);let f={startTime:r?this.resolvedAt?this.resolvedAt-this.createdAt>NS?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:t,...n,keyframes:e},g=h&&!c&&B_(f),_=f.motionValue?.owner?.current,m;if(g)try{m=new pu({...f,element:_})}catch{m=new hr(f)}else m=new hr(f);m.finished.then(()=>{this.notifyFinished()}).catch(ri),this.pendingTimeline&&(this.stopTimeline=m.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=m}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),C_()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}};var _u=class{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>e.finished))}getAll(e){return this.animations[0][e]}setAll(e,t){for(let n=0;n<this.animations.length;n++)this.animations[n][e]=t}attachTimeline(e){let t=this.animations.map(n=>n.attachTimeline(e));return()=>{t.forEach((n,r)=>{n&&n(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get state(){return this.getAll("state")}get startTime(){return this.getAll("startTime")}get duration(){return k_(this.animations,"duration")}get iterationDuration(){return k_(this.animations,"iterationDuration")}runAll(e){this.animations.forEach(t=>t[e]())}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};function k_(i,e){let t=0;for(let n=0;n<i.length;n++){let r=i[n][e];r!==null&&r>t&&(t=r)}return t}var ml=class extends _u{then(e,t){return this.finished.finally(e).then(()=>{})}};var V_=30,US=i=>!isNaN(parseFloat(i)),Kd={current:void 0},xu=class{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=n=>{let r=nn.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(n),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let s of this.dependents)s.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=nn.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=US(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new bs);let n=this.events[e].add(t);return e==="change"?()=>{n(),yn.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return Kd.current&&Kd.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=nn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>V_)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,V_);return $a(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function bi(i,e){return new xu(i,e)}function yu(i,e){if(i?.inherit&&e){let{inherit:t,...n}=i;return{...e,...n}}return i}function vu(i,e){let t=i?.[e]??i?.default??i;return t!==i?yu(t,i):t}var OS={type:"spring",stiffness:500,damping:25,restSpeed:10},BS=i=>({type:"spring",stiffness:550,damping:i===0?2*Math.sqrt(550):30,restSpeed:10}),kS={type:"keyframes",duration:.8},VS={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},z_=(i,{keyframes:e})=>e.length>2?kS:Si.has(i)?i.startsWith("scale")?BS(e[1]):OS:VS;var zS=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function H_(i){for(let e in i)if(!zS.has(e))return!0;return!1}var Mu=(i,e,t,n={},r,s)=>o=>{let a=vu(n,i)||{},l=a.delay||n.delay||0,{elapsed:c=0}=n;c=c-Jt(l);let u={keyframes:Array.isArray(t)?t:[null,t],ease:"easeOut",velocity:e.getVelocity(),...a,delay:-c,onUpdate:d=>{e.set(d),a.onUpdate&&a.onUpdate(d)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:i,motionValue:e,element:s?void 0:r};H_(a)||Object.assign(u,z_(i,u)),u.duration&&(u.duration=Jt(u.duration)),u.repeatDelay&&(u.repeatDelay=Jt(u.repeatDelay)),u.from!==void 0&&(u.keyframes[0]=u.from);let h=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(pl(u),u.delay===0&&(h=!0)),(Fn.instantAnimations||Fn.skipAnimations||r?.shouldSkipAnimations||a.skipAnimations)&&(h=!0,pl(u),u.delay=0),u.allowFlatten=!a.type&&!a.ease,h&&!s&&e.get()!==void 0){let d=Gr(u.keyframes,a);if(d!==void 0){yn.update(()=>{u.onUpdate(d),u.onComplete()});return}}return a.isSync?new hr(u):new gu(u)};var HS=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function GS(i){let e=HS.exec(i);if(!e)return[,];let[,t,n,r]=e;return[`--${t??n}`,r]}var WS=4;function $d(i,e,t=1){qn(t<=WS,`Max CSS variable fallback depth detected in property "${i}". This may indicate a circular fallback dependency.`,"max-css-var-depth");let[n,r]=GS(i);if(!n)return;let s=window.getComputedStyle(e).getPropertyValue(n);if(s){let o=s.trim();return Ya(o)?parseFloat(o):o}return To(r)?$d(r,e,t+1):r}function G_(i){let e=[{},{}];return i?.values.forEach((t,n)=>{e[0][n]=t.get(),e[1][n]=t.getVelocity()}),e}function Su(i,e,t,n){if(typeof e=="function"){let[r,s]=G_(n);e=e(t!==void 0?t:i.custom,r,s)}if(typeof e=="string"&&(e=i.variants&&i.variants[e]),typeof e=="function"){let[r,s]=G_(n);e=e(t!==void 0?t:i.custom,r,s)}return e}function W_(i,e,t){let n=i.getProps();return Su(n,e,t!==void 0?t:n.custom,i)}var bu=new Set(["width","height","top","left","right","bottom",...Ki]);var X_=i=>Array.isArray(i);function XS(i,e,t){i.hasValue(e)?i.getValue(e).set(t):i.addValue(e,bi(t))}function qS(i){return X_(i)?i[i.length-1]||0:i}function q_(i,e){let t=W_(i,e),{transitionEnd:n={},transition:r={},...s}=t||{};s={...s,...n};for(let o in s){let a=qS(s[o]);XS(i,o,a)}}var Rt=i=>!!(i&&i.getVelocity);function Y_(i){return!!(Rt(i)&&i.add)}function Z_(i,e){let t=i.getValue("willChange");if(Y_(t))return t.add(e);if(!t&&Fn.WillChange){let n=new Fn.WillChange("auto");i.addValue("willChange",n),n.add(e)}}function Po(i){return i.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}var YS="framerAppearId",K_="data-"+Po(YS);function $_(i){return i.props[K_]}function ZS({protectedKeys:i,needsAnimating:e},t){let n=i.hasOwnProperty(t)&&e[t]!==!0;return e[t]=!1,n}function Jd(i,e,{delay:t=0,transitionOverride:n,type:r}={}){let{transition:s,transitionEnd:o,...a}=e,l=i.getDefaultTransition();s=s?yu(s,l):l;let c=s?.reduceMotion,u=s?.skipAnimations;n&&(s=n);let h=[],d=r&&i.animationState&&i.animationState.getState()[r],f=s?.path;f&&f.animateVisualElement(i,a,s,t,h);for(let g in a){let _=i.getValue(g,i.latestValues[g]??null),m=a[g];if(m===void 0||d&&ZS(d,g))continue;let p={delay:t,...vu(s||{},g)};u&&(p.skipAnimations=!0);let S=_.get();if(S!==void 0&&!_.isAnimating()&&!Array.isArray(m)&&m===S&&!p.velocity){yn.update(()=>_.set(m));continue}let M=!1;if(window.MotionHandoffAnimation){let w=$_(i);if(w){let T=window.MotionHandoffAnimation(w,g,yn);T!==null&&(p.startTime=T,M=!0)}}Z_(i,g);let x=c??i.shouldReduceMotion;_.start(Mu(g,_,m,x&&bu.has(g)?{type:!1}:p,i,M));let b=_.animation;b&&h.push(b)}if(o){let g=()=>yn.update(()=>{o&&q_(i,o)});h.length?Promise.all(h).then(g):g()}return h}var J_={test:i=>i==="auto",parse:i=>i};var Tu=i=>e=>e.test(i);var Qd=[Yi,be,Vr,Ni,o_,s_,J_],jd=i=>Qd.find(Tu(i));function Q_(i){return typeof i=="number"?i===0:i!==null?i==="none"||i==="0"||Za(i):!0}var KS=new Set(["brightness","contrast","saturate","opacity"]);function $S(i){let[e,t]=i.slice(0,-1).split("(");if(e==="drop-shadow")return i;let[n]=t.match(wo)||[];if(!n)return i;let r=t.replace(n,""),s=KS.has(e)?1:0;return n!==t&&(s*=100),e+"("+s+r+")"}var JS=/\b([a-z-]*)\(.*?\)/gu,gl={...rn,getAnimatableNone:i=>{let e=i.match(JS);return e?e.map($S).join(" "):i}};var _l={...rn,getAnimatableNone:i=>{let e=rn.parse(i);return rn.createTransformer(i)(e.map(n=>typeof n=="number"?0:typeof n=="object"?{...n,alpha:1}:n))}};var ep={...Yi,transform:Math.round};var j_={rotate:Ni,pathRotation:Ni,rotateX:Ni,rotateY:Ni,rotateZ:Ni,scale:al,scaleX:al,scaleY:al,scaleZ:al,skew:Ni,skewX:Ni,skewY:Ni,distance:be,translateX:be,translateY:be,translateZ:be,x:be,y:be,z:be,perspective:be,transformPerspective:be,opacity:cr,originX:Dd,originY:Dd,originZ:be};var Ps={borderWidth:be,borderTopWidth:be,borderRightWidth:be,borderBottomWidth:be,borderLeftWidth:be,borderRadius:be,borderTopLeftRadius:be,borderTopRightRadius:be,borderBottomRightRadius:be,borderBottomLeftRadius:be,width:be,maxWidth:be,height:be,maxHeight:be,top:be,right:be,bottom:be,left:be,inset:be,insetBlock:be,insetBlockStart:be,insetBlockEnd:be,insetInline:be,insetInlineStart:be,insetInlineEnd:be,padding:be,paddingTop:be,paddingRight:be,paddingBottom:be,paddingLeft:be,paddingBlock:be,paddingBlockStart:be,paddingBlockEnd:be,paddingInline:be,paddingInlineStart:be,paddingInlineEnd:be,margin:be,marginTop:be,marginRight:be,marginBottom:be,marginLeft:be,marginBlock:be,marginBlockStart:be,marginBlockEnd:be,marginInline:be,marginInlineStart:be,marginInlineEnd:be,fontSize:be,backgroundPositionX:be,backgroundPositionY:be,...j_,zIndex:ep,fillOpacity:cr,strokeOpacity:cr,numOctaves:ep};var QS={...Ps,color:Ft,backgroundColor:Ft,outlineColor:Ft,fill:Ft,stroke:Ft,borderColor:Ft,borderTopColor:Ft,borderRightColor:Ft,borderBottomColor:Ft,borderLeftColor:Ft,filter:gl,WebkitFilter:gl,mask:_l,WebkitMask:_l},wu=i=>QS[i];var jS=new Set([gl,_l]);function Eu(i,e){let t=wu(i);return jS.has(t)||(t=rn),t.getAnimatableNone?t.getAnimatableNone(e):void 0}var eb=new Set(["auto","none","0"]);function e0(i,e,t){let n=0,r;for(;n<i.length&&!r;){let s=i[n];typeof s=="string"&&!eb.has(s)&&Hr(s).values.length&&(r=i[n]),n++}if(r&&t)for(let s of e)i[s]=Eu(t,r)}var Au=class extends Xr{constructor(e,t,n,r,s){super(e,t,n,r,s,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t||!t.current)return;super.readKeyframes();for(let u=0;u<e.length;u++){let h=e[u];if(typeof h=="string"&&(h=h.trim(),To(h))){let d=$d(h,t.current);d!==void 0&&(e[u]=d),u===e.length-1&&(this.finalKeyframe=h)}}if(this.resolveNoneKeyframes(),!bu.has(n)||e.length!==2)return;let[r,s]=e,o=jd(r),a=jd(s),l=Pd(r),c=Pd(s);if(l!==c&&fr[n]){this.needsMeasurement=!0;return}if(o!==a)if(zd(o)&&zd(a))for(let u=0;u<e.length;u++){let h=e[u];typeof h=="string"&&(e[u]=parseFloat(h))}else fr[n]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let r=0;r<e.length;r++)(e[r]===null||Q_(e[r]))&&n.push(r);n.length&&e0(e,n,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e||!e.current)return;n==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=fr[n](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let r=t[t.length-1];r!==void 0&&e.getValue(n,r).jump(r,!1)}measureEndState(){let{element:e,name:t,unresolvedKeyframes:n}=this;if(!e||!e.current)return;let r=e.getValue(t);r&&r.jump(this.measuredOrigin,!1);let s=n.length-1,o=n[s];n[s]=fr[t](e.measureViewportBox(),window.getComputedStyle(e.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),this.removedTransforms?.length&&this.removedTransforms.forEach(([a,l])=>{e.getValue(a).set(l)}),this.resolveNoneKeyframes()}};var t0=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function xl(i,e,t){if(i==null)return[];if(i instanceof EventTarget)return[i];if(typeof i=="string"){let n=document;e&&(n=e.current);let r=t?.[i]??n.querySelectorAll(i);return r?Array.from(r):[]}return Array.from(i).filter(n=>n!=null)}var yl=(i,e)=>e&&typeof i=="number"?e.transform(i):i;var{schedule:n0,cancel:tN}=jc(queueMicrotask,!1);function vl(i){return Ed(i)&&"ownerSVGElement"in i}function tp(i){return vl(i)&&i.tagName==="svg"}var tb=[...Qd,Ft,rn],i0=i=>tb.find(Tu(i));var r0=()=>({min:0,max:0}),Io=()=>({x:r0(),y:r0()});var dr=new WeakMap;function s0(i){return i!==null&&typeof i=="object"&&typeof i.start=="function"}function o0(i){return typeof i=="string"||Array.isArray(i)}var nb=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],a0=["initial",...nb];function np(i){return s0(i.animate)||a0.some(e=>o0(i[e]))}function l0(i){return!!(np(i)||i.variants)}function c0(i,e,t){for(let n in e){let r=e[n],s=t[n];if(Rt(r))i.addValue(n,r);else if(Rt(s))i.addValue(n,bi(r,{owner:i}));else if(s!==r)if(i.hasValue(n)){let o=i.getValue(n);o.liveStyle===!0?o.jump(r):o.hasAnimated||o.set(r)}else{let o=i.getStaticValue(n);i.addValue(n,bi(o!==void 0?o:r,{owner:i}))}}for(let n in t)e[n]===void 0&&i.removeValue(n);return e}var Ml={current:null},Cu={current:!1};var ib=typeof window<"u";function u0(){if(Cu.current=!0,!!ib)if(window.matchMedia){let i=window.matchMedia("(prefers-reduced-motion)"),e=()=>Ml.current=i.matches;i.addEventListener("change",e),e()}else Ml.current=!1}var h0=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],f0={};var Do=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:r,skipAnimations:s,blockInitialAnimation:o,visualState:a},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Xr,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let f=nn.now();this.renderScheduledAt<f&&(this.renderScheduledAt=f,yn.render(this.render,!1,!0))};let{latestValues:c,renderState:u}=a;this.latestValues=c,this.baseTarget={...c},this.initialValues=t.initial?{...c}:{},this.renderState=u,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=s,this.options=l,this.blockInitialAnimation=!!o,this.isControllingVariants=np(t),this.isVariantNode=l0(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:h,...d}=this.scrapeMotionValuesFromProps(t,{},this);for(let f in d){let g=d[f];c[f]!==void 0&&Rt(g)&&g.set(c[f])}}mount(e){if(this.hasBeenMounted)for(let t in this.initialValues)this.values.get(t)?.jump(this.initialValues[t]),this.latestValues[t]=this.initialValues[t];this.current=e,dr.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,n)=>this.bindToMotionValue(n,t)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Cu.current||u0(),this.shouldReduceMotion=Ml.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),ol(this.notifyUpdate),ol(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&mu.has(e)&&this.current instanceof HTMLElement){let{factory:o,keyframes:a,times:l,ease:c,duration:u}=t.accelerate,h=new Ro({element:this.current,name:e,keyframes:a,times:l,ease:c,duration:Jt(u)}),d=o(h);this.valueSubscriptions.set(e,()=>{d(),h.cancel()});return}let n=Si.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on("change",o=>{this.latestValues[e]=o,this.props.onUpdate&&yn.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()}),s;typeof window<"u"&&window.MotionCheckAppearSync&&(s=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),s&&s()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in f0){let t=f0[e];if(!t)continue;let{isEnabled:n,Feature:r}=t;if(!this.features[e]&&r&&n(this.props)&&(this.features[e]=new r(this)),this.features[e]){let s=this.features[e];s.isMounted?s.update():(s.mount(),s.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Io()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let n=0;n<h0.length;n++){let r=h0[n];this.propEventSubscriptions[r]&&(this.propEventSubscriptions[r](),delete this.propEventSubscriptions[r]);let s="on"+r,o=e[s];o&&(this.propEventSubscriptions[r]=this.on(r,o))}this.prevMotionValues=c0(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let n=this.values.get(e);t!==n&&(n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return n===void 0&&t!==void 0&&(n=bi(t===null?void 0:t,{owner:this}),this.addValue(e,n)),n}readValue(e,t){let n=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return n!=null&&(typeof n=="string"&&(Ya(n)||Za(n))?n=parseFloat(n):!i0(n)&&rn.test(t)&&(n=Eu(e,t)),this.setBaseTarget(e,Rt(n)?n.get():n)),Rt(n)?n.get():n}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){let{initial:t}=this.props,n;if(typeof t=="string"||typeof t=="object"){let s=Su(this.props,t,this.presenceContext?.custom);s&&(n=s[e])}if(t&&n!==void 0)return n;let r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!Rt(r)?r:this.initialValues[e]!==void 0&&n===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new bs),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){n0.render(this.render)}};var Lo=class extends Do{constructor(){super(...arguments),this.KeyframeResolver=Au}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){let n=e.style;return n?n[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;Rt(e)&&(this.childSubscription=e.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}};function d0({top:i,left:e,right:t,bottom:n}){return{x:{min:e,max:t},y:{min:i,max:n}}}function p0(i,e){if(!e)return i;let t=e({x:i.left,y:i.top}),n=e({x:i.right,y:i.bottom});return{top:t.y,left:t.x,bottom:n.y,right:n.x}}function m0(i,e){return d0(p0(i.getBoundingClientRect(),e))}var rb={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},sb=Ki.length;function g0(i,e,t){let n="",r=!0;for(let o=0;o<sb;o++){let a=Ki[o],l=i[a];if(l===void 0)continue;let c=!0;if(typeof l=="number")c=l===(a.startsWith("scale")?1:0);else{let u=parseFloat(l);c=a.startsWith("scale")?u===1:u===0}if(!c||t){let u=yl(l,Ps[a]);if(!c){r=!1;let h=rb[a]||a;n+=`${h}(${u}) `}t&&(e[a]=u)}}let s=i.pathRotation;return s&&(r=!1,n+=`rotate(${yl(s,Ps.pathRotation)}) `),n=n.trim(),t?n=t(e,r?"":n):r&&(n="none"),n}function Ru(i,e,t){let{style:n,vars:r,transformOrigin:s}=i,o=!1,a=!1;for(let l in e){let c=e[l];if(Si.has(l)){o=!0;continue}else if(tu(l)){r[l]=c;continue}else{let u=yl(c,Ps[l]);l.startsWith("origin")?(a=!0,s[l]=u):n[l]=u}}if(e.transform||(o||t?n.transform=g0(e,i.transform,t):n.transform&&(n.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:u=0}=s;n.transformOrigin=`${l} ${c} ${u}`}}function Pu(i,{style:e,vars:t},n,r){let s=i.style,o;for(o in e)s[o]=e[o];r?.applyProjectionStyles(s,n);for(o in t)s.setProperty(o,t[o])}function _0(i,e){return e.max===e.min?0:i/(e.max-e.min)*100}var Fo={correct:(i,e)=>{if(!e.target)return i;if(typeof i=="string")if(be.test(i))i=parseFloat(i);else return i;let t=_0(i,e.target.x),n=_0(i,e.target.y);return`${t}% ${n}%`}};var x0={correct:(i,{treeScale:e,projectionDelta:t})=>{let n=i,r=rn.parse(i);if(r.length>5)return n;let s=rn.createTransformer(i),o=typeof r[0]!="number"?1:0,a=t.x.scale*e.x,l=t.y.scale*e.y;r[0+o]/=a,r[1+o]/=l;let c=si(a,l,.5);return typeof r[2+o]=="number"&&(r[2+o]/=c),typeof r[3+o]=="number"&&(r[3+o]/=c),s(r)}};var y0={borderRadius:{...Fo,applyTo:[...t0]},borderTopLeftRadius:Fo,borderTopRightRadius:Fo,borderBottomLeftRadius:Fo,borderBottomRightRadius:Fo,boxShadow:x0};function v0(i,{layout:e,layoutId:t}){return Si.has(i)||i.startsWith("origin")||(e||t!==void 0)&&(!!y0[i]||i==="opacity")}function Iu(i,e,t){let n=i.style,r=e?.style,s={};if(!n)return s;for(let o in n)(Rt(n[o])||r&&Rt(r[o])||v0(o,i)||t?.getValue(o)?.liveStyle!==void 0)&&(s[o]=n[o]);return s}function ob(i){return window.getComputedStyle(i)}var Sl=class extends Lo{constructor(){super(...arguments),this.type="html",this.renderInstance=Pu}mount(e){qn(!!e.style,"motion.create() components must forward their ref to a HTML or SVG element","custom-component-ref"),super.mount(e)}readValueFromInstance(e,t){if(Si.has(t))return this.projection?.isProjecting?cu(t):T_(e,t);{let n=ob(e),r=(tu(t)?n.getPropertyValue(t):n[t])||0;return typeof r=="string"?r.trim():r}}measureInstanceViewportBox(e,{transformPagePoint:t}){return m0(e,t)}build(e,t,n){Ru(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return Iu(e,t,n)}};function ab(i,e){return i in e}var bl=class extends Do{constructor(){super(...arguments),this.type="object"}readValueFromInstance(e,t){if(ab(t,e)){let n=e[t];if(typeof n=="string"||typeof n=="number")return n}}getBaseTargetFromProps(){}removeValueFromRenderState(e,t){delete t.output[e]}measureInstanceViewportBox(){return Io()}build(e,t){Object.assign(e.output,t)}renderInstance(e,{output:t}){Object.assign(e,t)}sortInstanceNodePosition(){return 0}};var lb={offset:"stroke-dashoffset",array:"stroke-dasharray"},cb={offset:"strokeDashoffset",array:"strokeDasharray"};function M0(i,e,t=1,n=0,r=!0){i.pathLength=1;let s=r?lb:cb;i[s.offset]=`${-n}`,i[s.array]=`${e} ${t}`}var ub=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function S0(i,{attrX:e,attrY:t,attrScale:n,pathLength:r,pathSpacing:s=1,pathOffset:o=0,...a},l,c,u){if(Ru(i,a,c),l){i.style.viewBox&&(i.attrs.viewBox=i.style.viewBox);return}i.attrs=i.style,i.style={};let{attrs:h,style:d}=i;h.transform&&(d.transform=h.transform,delete h.transform),(d.transform||h.transformOrigin)&&(d.transformOrigin=h.transformOrigin??"50% 50%",delete h.transformOrigin),d.transform&&(d.transformBox=u?.transformBox??"fill-box",delete h.transformBox);for(let f of ub)h[f]!==void 0&&(d[f]=h[f],delete h[f]);e!==void 0&&(h.x=e),t!==void 0&&(h.y=t),n!==void 0&&(h.scale=n),r!==void 0&&M0(h,r,s,o,!1)}var Du=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);var b0=i=>typeof i=="string"&&i.toLowerCase()==="svg";function T0(i,e,t,n){Pu(i,e,void 0,n);for(let r in e.attrs)i.setAttribute(Du.has(r)?r:Po(r),e.attrs[r])}function w0(i,e,t){let n=Iu(i,e,t);for(let r in i)if(Rt(i[r])||Rt(e[r])){let s=Ki.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;n[s]=i[r]}return n}var Tl=class extends Lo{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Io}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Si.has(t)){let n=wu(t);return n&&n.default||0}return t=Du.has(t)?t:Po(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return w0(e,t,n)}build(e,t,n){S0(e,t,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(e,t,n,r){T0(e,t,n,r)}mount(e){this.isSVGTag=b0(e.tagName),super.mount(e)}};function ip(i,e,t){let n=Rt(i)?i:bi(i);return n.start(Mu("",n,e,t)),n.animation}function wl(i){return typeof i=="object"&&!Array.isArray(i)}function Lu(i,e,t,n){return i==null?[]:typeof i=="string"&&wl(e)?xl(i,t,n):i instanceof NodeList?Array.from(i):Array.isArray(i)?i.filter(r=>r!=null):[i]}function E0(i,e,t){return i*(e+1)+t*e}function rp(i,e,t,n){return typeof e=="number"?e:e.startsWith("-")||e.startsWith("+")?Math.max(0,i+parseFloat(e)):e==="<"?t:e.startsWith("<")?Math.max(0,t+parseFloat(e.slice(1))):n.get(e)??i}function hb(i,e,t){for(let n=0;n<i.length;n++){let r=i[n];r.at>e&&r.at<t&&(vs(i,r),n--)}}function A0(i,e,t,n,r,s){hb(i,r,s);for(let o=0;o<e.length;o++)i.push({value:e[o],at:si(r,s,n[o]),easing:il(t,o)})}function C0(i,e,t=0){let n=e+1+e*t;for(let r=0;r<i.length;r++)i[r]=i[r]/n}function R0(i,e){return i.at===e.at?i.value===null?1:e.value===null?-1:0:i.at-e.at}var fb="easeInOut",sp=20;function D0(i,{defaultTransition:e={},...t}={},n,r){let s=e.duration||.3,o=new Map,a=new Map,l={},c=new Map,u=0,h=0,d=0;for(let f=0;f<i.length;f++){let g=i[f];if(typeof g=="string"){c.set(g,h);continue}else if(!Array.isArray(g)){c.set(g.name,rp(h,g.at,u,c));continue}let[_,m,p={}]=g;p.at!==void 0&&(h=rp(h,p.at,u,c));let S=0,M=(x,b,w,T=0,C=0)=>{let v=db(x),{delay:y=0,times:R=dl(v),type:D=e.type||"keyframes",repeat:U,repeatType:V,repeatDelay:W=0,...G}=b,{ease:X=e.ease||"easeOut",duration:z}=b,te=typeof y=="function"?y(T,C):y,L=v.length,ce=Rs(D)?D:r?.[D||"keyframes"];if(L<=2&&ce){let Ae=100;if(L===2&&gb(v)){let se=v[1]-v[0];Ae=Math.abs(se)}let Z={...e,...G};z!==void 0&&(Z.duration=Jt(z));let $=ul(Z,Ae,ce);X=$.ease,z=$.duration}z??(z=s);let De=h+te;R.length===1&&R[0]===0&&(R[1]=1);let Ke=R.length-v.length;if(Ke>0&&fl(R,Ke),v.length===1&&v.unshift(null),U&&Fi(U<sp,`Sequence segments can't repeat ${U} times \u2014 ignoring repeat option. Use a value below ${sp} or apply repeat at the sequence level instead.`),U&&U<sp){let Ae=z>0?W/z:0;z=E0(z,U,W);let Z=[...v],$=[...R];X=Array.isArray(X)?[...X]:[X];let se=[...X],Me=V==="reverse"||V==="mirror",ye=Z,Oe=se;Me&&(ye=[...Z].reverse(),V==="reverse"&&(Oe=[...se].reverse().map($e=>typeof $e=="function"?Ts($e):$e)));for(let $e=0;$e<U;$e++){let I=Me&&$e%2===0,Ge=I?ye:Z,Ee=I?Oe:se,Te=($e+1)*(1+Ae);Ae>0&&(v.push(v[v.length-1]),R.push(Te),X.push("linear")),v.push(...Ge);for(let N=0;N<Ge.length;N++)R.push($[N]+Te),X.push(N===0?"linear":il(Ee,N-1))}C0(R,U,Ae)}let He=De+z;A0(w,v,X,R,De,He),S=Math.max(te+z,S),d=Math.max(He,d)};if(Rt(_)){let x=P0(_,a);M(m,p,I0("default",x))}else{let x=Lu(_,m,n,l),b=x.length;for(let w=0;w<b;w++){m=m,p=p;let T=x[w],C=P0(T,a);for(let v in m)M(m[v],pb(p,v),I0(v,C),w,b)}}u=h,h+=S}return a.forEach((f,g)=>{for(let _ in f){let m=f[_];m.sort(R0);let p=[],S=[],M=[];for(let T=0;T<m.length;T++){let{at:C,value:v,easing:y}=m[T];p.push(v),S.push(Ss(0,d,C)),M.push(y||"easeOut")}S[0]!==0&&(S.unshift(0),p.unshift(p[0]),M.unshift(fb)),S[S.length-1]!==1&&(S.push(1),p.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let x=o.get(g);x.keyframes[_]=p;let{type:b,...w}=e;x.transition[_]={...w,duration:d,ease:M,times:S,...t}}}),o}function P0(i,e){return!e.has(i)&&e.set(i,{}),e.get(i)}function I0(i,e){return e[i]||(e[i]=[]),e[i]}function db(i){return Array.isArray(i)?i:[i]}function pb(i,e){return i&&i[e]?{...i,...i[e]}:{...i}}var mb=i=>typeof i=="number",gb=i=>i.every(mb);function L0(i){let e={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},t=vl(i)&&!tp(i)?new Tl(e):new Sl(e);t.mount(i),dr.set(i,t)}function F0(i){let e={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},t=new bl(e);t.mount(i),dr.set(i,t)}function _b(i,e){return Rt(i)||typeof i=="number"||typeof i=="string"&&!wl(e)}function Fu(i,e,t,n){let r=[];if(_b(i,e))r.push(ip(i,wl(e)&&e.default||e,t&&(t.default||t)));else{if(i==null)return r;let s=Lu(i,e,n),o=s.length;qn(!!o,"No valid elements provided.","no-valid-elements");for(let a=0;a<o;a++){let l=s[a],c=l instanceof Element?L0:F0;dr.has(l)||c(l);let u=dr.get(l),h={...t};"delay"in h&&typeof h.delay=="function"&&(h.delay=h.delay(a,o)),r.push(...Jd(u,{...e,transition:h},{}))}}return r}function N0(i,e,t){let n=[],r=i.map(o=>{if(Array.isArray(o)&&typeof o[0]=="function"){let a=o[0],l=bi(0);return l.on("change",a),o.length===1?[l,[0,1]]:o.length===2?[l,[0,1],o[1]]:[l,o[1],o[2]]}return o});return D0(r,e,t,{spring:ur}).forEach(({keyframes:o,transition:a},l)=>{n.push(...Fu(l,o,a))}),n}function xb(i){return Array.isArray(i)&&i.some(Array.isArray)}function U0(i={}){let{scope:e,reduceMotion:t,skipAnimations:n}=i;function r(s,o,a){let l=[],c,u={};if(t!==void 0&&(u.reduceMotion=t),n!==void 0&&(u.skipAnimations=n),xb(s)){let{onComplete:d,...f}=o||{};typeof d=="function"&&(c=d),l=N0(s,{...u,...f},e)}else{let{onComplete:d,...f}=a||{};typeof d=="function"&&(c=d),l=Fu(s,o,{...u,...f},e)}let h=new ml(l);return c&&h.finished.then(c),e&&(e.animations.push(h),h.finished.then(()=>{vs(e.animations,h)})),h}return r}var Is=U0();var yb={some:0,all:1};function op(i,e,{root:t,margin:n,amount:r="some"}={}){let s=xl(i),o=new WeakMap,a=c=>{c.forEach(u=>{let h=o.get(u.target);if(u.isIntersecting!==!!h)if(u.isIntersecting){let d=e(u.target,u);typeof d=="function"?o.set(u.target,d):l.unobserve(u.target)}else typeof h=="function"&&(h(u),o.delete(u.target))})},l=new IntersectionObserver(a,{root:t,rootMargin:n,threshold:typeof r=="number"?r:yb[r]});return s.forEach(c=>l.observe(c)),()=>l.disconnect()}var O0=window.matchMedia("(prefers-reduced-motion: reduce)"),ap=null;try{let i=sessionStorage.getItem("merge-motion-choice");(i==="on"||i==="off")&&(ap=i==="on")}catch{}function Gt(){return ap??!O0.matches}function B0(i){ap=i;try{sessionStorage.setItem("merge-motion-choice",i?"on":"off")}catch{}document.documentElement.dataset.motion=i?"on":"off",window.dispatchEvent(new CustomEvent("merge:motion-preference"))}function k0(){document.documentElement.dataset.motion=Gt()?"on":"off"}k0();O0.addEventListener("change",()=>{k0(),window.dispatchEvent(new CustomEvent("merge:motion-preference"))});function pr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function Z0(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var $n={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Il={duration:.5,overwrite:!1,delay:0},wp,fn,Nt,wi=1e8,Tt=1/wi,mp=Math.PI*2,vb=mp/4,Mb=0,K0=Math.sqrt,Sb=Math.cos,bb=Math.sin,sn=function(e){return typeof e=="string"},Wt=function(e){return typeof e=="function"},gr=function(e){return typeof e=="number"},Wu=function(e){return typeof e>"u"},Qi=function(e){return typeof e=="object"},Kn=function(e){return e!==!1},Ep=function(){return typeof window<"u"},Nu=function(e){return Wt(e)||sn(e)},$0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Mn=Array.isArray,Tb=/random\([^)]+\)/g,wb=/,\s*/g,V0=/(?:-?\.?\d|\.)+/gi,Ap=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ns=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,lp=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Cp=/[+-]=-?[.\d]+/,Eb=/[^,'"\[\]\s]+/gi,Ab=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Vt,$i,gp,Rp,ai={},ku={},J0,Q0=function(e){return(ku=Uo(e,ai))&&Sn},Xu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Dl=function(e,t){return!t&&console.warn(e)},j0=function(e,t){return e&&(ai[e]=t)&&ku&&(ku[e]=t)||ai},Ll=function(){return 0},Cb={suppressEvents:!0,isStart:!0,kill:!1},Uu={suppressEvents:!0,kill:!1},Rb={suppressEvents:!0},Pp={},Yr=[],_p={},ex,Yn={},cp={},z0=30,Ou=[],Ip="",Dp=function(e){var t=e[0],n,r;if(Qi(t)||Wt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Ou.length;r--&&!Ou[r].targetTest(t););n=Ou[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Up(e[r],n)))||e.splice(r,1);return e},Zr=function(e){return e._gsap||Dp(Ei(e))[0]._gsap},Lp=function(e,t,n){return(n=e[t])&&Wt(n)?e[t]():Wu(n)&&e.getAttribute&&e.getAttribute(t)||n},Nn=function(e,t){return(e=e.split(",")).forEach(t)||e},Xt=function(e){return Math.round(e*1e5)/1e5||0},kt=function(e){return Math.round(e*1e7)/1e7||0},Us=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},Pb=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Vu=function(){var e=Yr.length,t=Yr.slice(0),n,r;for(_p={},Yr.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Fp=function(e){return!!(e._initted||e._startAt||e.add)},tx=function(e,t,n,r){Yr.length&&!fn&&Vu(),e.render(t,n,r||!!(fn&&t<0&&Fp(e))),Yr.length&&!fn&&Vu()},nx=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Eb).length<2?t:sn(e)?e.trim():e},ix=function(e){return e},li=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ib=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},Uo=function(e,t){for(var n in t)e[n]=t[n];return e},H0=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Qi(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},zu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Cl=function(e){var t=e.parent||Vt,n=e.keyframes?Ib(Mn(e.keyframes)):li;if(Kn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Db=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},rx=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},qu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Kr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ds=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Lb=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},xp=function(e,t,n,r){return e._startAt&&(fn?e._startAt.revert(Uu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Fb=function i(e){return!e||e._ts&&i(e.parent)},G0=function(e){return e._repeat?Oo(e._tTime,e=e.duration()+e._rDelay)*e:0},Oo=function(e,t){var n=Math.floor(e=kt(e/t));return e&&n===e?n-1:n},Hu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Yu=function(e){return e._end=kt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Tt)||0))},Zu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=kt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Yu(e),n._dirty||Ds(n,e)),e},sx=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Hu(e.rawTime(),t),(!t._dur||Ul(0,t.totalDuration(),n)-t._tTime>Tt)&&t.render(n,!0)),Ds(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Tt}},Ji=function(e,t,n,r){return t.parent&&Kr(t),t._start=kt((gr(n)?n:n||e!==Vt?Ti(e,n,t):e._time)+t._delay),t._end=kt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),rx(e,t,"_first","_last",e._sort?"_start":0),yp(t)||(e._recent=t),r||sx(e,t),e._ts<0&&Zu(e,e._tTime),e},ox=function(e,t){return(ai.ScrollTrigger||Xu("scrollTrigger",t))&&ai.ScrollTrigger.create(t,e)},ax=function(e,t,n,r,s){if(kp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!fn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ex!==Zn.frame)return Yr.push(e),e._lazy=[s,r],1},Nb=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},yp=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Ub=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&Nb(e)&&!(!e._initted&&yp(e))||(e._ts<0||e._dp._ts<0)&&!yp(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Ul(0,e._tDur,t),u=Oo(l,a),e._yoyo&&u&1&&(o=1-o),u!==Oo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||fn||r||e._zTime===Tt||!t&&e._zTime){if(!e._initted&&ax(e,t,r,n,l))return;for(h=e._zTime,e._zTime=t||(n?Tt:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&xp(e,t,n,!0),e._onUpdate&&!n&&oi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&oi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Kr(e,1),!n&&!fn&&(oi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Ob=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Bo=function(e,t,n,r){var s=e._repeat,o=kt(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:kt(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Zu(e,e._tTime=e._tDur*a),e.parent&&Yu(e),n||Ds(e.parent,e),e},W0=function(e){return e instanceof vn?Ds(e):Bo(e,e._dur)},Bb={_start:0,endTime:Ll,totalDuration:Ll},Ti=function i(e,t,n){var r=e.labels,s=e._recent||Bb,o=e.duration()>=wi?s.endTime(!1):e._dur,a,l,c;return sn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Mn(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Rl=function(e,t,n){var r=gr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Kn(l.vars.inherit)&&l.parent;o.immediateRender=Kn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Kt(t[0],o,t[s+1])},$r=function(e,t){return e||e===0?t(e):t},Ul=function(e,t,n){return n<e?e:n>t?t:n},dn=function(e,t){return!sn(e)||!(t=Ab.exec(e))?"":t[1]},kb=function(e,t,n){return $r(n,function(r){return Ul(e,t,r)})},vp=[].slice,lx=function(e,t){return e&&Qi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Qi(e[0]))&&!e.nodeType&&e!==$i},Vb=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return sn(r)&&!t||lx(r,1)?(s=n).push.apply(s,Ei(r)):n.push(r)})||n},Ei=function(e,t,n){return Nt&&!t&&Nt.selector?Nt.selector(e):sn(e)&&!n&&(gp||!ko())?vp.call((t||Rp).querySelectorAll(e),0):Mn(e)?Vb(e,n):lx(e)?vp.call(e,0):e?[e]:[]},Mp=function(e){return e=Ei(e)[0]||Dl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ei(t,n.querySelectorAll?n:n===e?Dl("Invalid scope")||Rp.createElement("div"):e)}},cx=function(e){return e.sort(function(){return .5-Math.random()})},ux=function(e){if(Wt(e))return e;var t=Qi(e)?e:{each:e},n=Ls(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,h=r;return sn(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(d,f,g){var _=(g||t).length,m=o[_],p,S,M,x,b,w,T,C,v;if(!m){if(v=t.grid==="auto"?0:(t.grid||[1,wi])[1],!v){for(T=-wi;T<(T=g[v++].getBoundingClientRect().left)&&v<_;);v<_&&v--}for(m=o[_]=[],p=l?Math.min(v,_)*u-.5:r%v,S=v===wi?0:l?_*h/v-.5:r/v|0,T=0,C=wi,w=0;w<_;w++)M=w%v-p,x=S-(w/v|0),m[w]=b=c?Math.abs(c==="y"?x:M):K0(M*M+x*x),b>T&&(T=b),b<C&&(C=b);r==="random"&&cx(m),m.max=T-C,m.min=C,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(v>_?_-1:c?c==="y"?_/v:v:Math.max(v,_/v))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=dn(t.amount||t.each)||0,n=n&&_<0?jb(n):n}return _=(m[d]-m.min)/m.max||0,kt(m.b+(n?n(_):_)*m.v)+m.u}},Sp=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=kt(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(gr(n)?0:dn(n))}},hx=function(e,t){var n=Mn(e),r,s;return!n&&Qi(e)&&(r=n=e.radius||wi,e.values?(e=Ei(e.values),(s=!gr(e[0]))&&(r*=r)):e=Sp(e.increment)),$r(t,n?Wt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=wi,u=0,h=e.length,d,f;h--;)s?(d=e[h].x-a,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-a),d<c&&(c=d,u=h);return u=!r||c<=r?e[u]:o,s||u===o||gr(o)?u:u+dn(o)}:Sp(e))},fx=function(e,t,n,r){return $r(Mn(e)?!t:n===!0?!!(n=0):!r,function(){return Mn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},zb=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},Hb=function(e,t){return function(n){return e(parseFloat(n))+(t||dn(n))}},Gb=function(e,t,n){return px(e,t,0,1,n)},dx=function(e,t,n){return $r(n,function(r){return e[~~t(r)]})},Wb=function i(e,t,n){var r=t-e;return Mn(e)?dx(e,i(0,e.length),t):$r(n,function(s){return(r+(s-e)%r)%r+e})},Xb=function i(e,t,n){var r=t-e,s=r*2;return Mn(e)?dx(e,i(0,e.length-1),t):$r(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Vo=function(e){return e.replace(Tb,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(wb);return fx(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},px=function(e,t,n,r,s){var o=t-e,a=r-n;return $r(s,function(l){return n+((l-e)/o*a||0)})},qb=function i(e,t,n,r){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=sn(e),a={},l,c,u,h,d;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(Mn(e)&&!Mn(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(i(e[c-1],e[c]));h--,s=function(g){g*=h;var _=Math.min(d,~~g);return u[_](g-_)},n=t}else r||(e=Uo(Mn(e)?[]:{},e));if(!u){for(l in t)Op.call(a,e,l,"get",t[l]);s=function(g){return Hp(g,a)||(o?e.p:e)}}}return $r(n,s)},X0=function(e,t,n){var r=e.labels,s=wi,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},oi=function(e,t,n){var r=e.vars,s=r[t],o=Nt,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&Yr.length&&Vu(),a&&(Nt=a),u=l?s.apply(c,l):s.call(c),Nt=o,u},El=function(e){return Kr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!fn),e.progress()<1&&oi(e,"onInterrupt"),e},No,mx=[],gx=function(e){if(e)if(e=!e.name&&e.default||e,Ep()||e.headless){var t=e.name,n=Wt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ll,render:Hp,add:Op,kill:cT,modifier:lT,rawVars:0},o={targetTest:0,get:0,getSetter:Ku,aliases:{},register:0};if(ko(),e!==r){if(Yn[t])return;li(r,li(zu(e,s),o)),Uo(r.prototype,Uo(s,zu(e,o))),Yn[r.prop=t]=r,e.targetTest&&(Ou.push(r),Pp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}j0(t,r),e.register&&e.register(Sn,r,Un)}else mx.push(e)},bt=255,Al={aqua:[0,bt,bt],lime:[0,bt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,bt],navy:[0,0,128],white:[bt,bt,bt],olive:[128,128,0],yellow:[bt,bt,0],orange:[bt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[bt,0,0],pink:[bt,192,203],cyan:[0,bt,bt],transparent:[bt,bt,bt,0]},up=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*bt+.5|0},_x=function(e,t,n){var r=e?gr(e)?[e>>16,e>>8&bt,e&bt]:0:Al.black,s,o,a,l,c,u,h,d,f,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Al[e])r=Al[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&bt,r&bt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&bt,e&bt]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(V0),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=up(l+1/3,s,o),r[1]=up(l,s,o),r[2]=up(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(Ap),n&&r.length<4&&(r[3]=1),r}else r=e.match(V0)||Al.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/bt,o=r[1]/bt,a=r[2]/bt,h=Math.max(s,o,a),d=Math.min(s,o,a),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(o-a)/f+(o<a?6:0):h===o?(a-s)/f+2:(s-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},xx=function(e){var t=[],n=[],r=-1;return e.split(mr).forEach(function(s){var o=s.match(Ns)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},q0=function(e,t,n){var r="",s=(e+r).match(mr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(d){return(d=_x(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=xx(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(mr,"1").split(Ns),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(mr),h=c.length-1;a<h;a++)r+=c[a]+s[a];return r+c[h]},mr=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Al)i+="|"+e+"\\b";return new RegExp(i+")","gi")})(),Yb=/hsl[a]?\(/,Np=function(e){var t=e.join(" "),n;if(mr.lastIndex=0,mr.test(t))return n=Yb.test(t),e[1]=q0(e[1],n),e[0]=q0(e[0],n,xx(e[1])),!0},Fl,Zn=(function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,h,d,f,g=function _(m){var p=i()-r,S=m===!0,M,x,b,w;if((p>e||p<0)&&(n+=p-t),r+=p,b=r-n,M=b-o,(M>0||S)&&(w=++h.frame,d=b-h.time*1e3,h.time=b=b/1e3,o+=M+(M>=s?4:s-M),x=1),S||(l=c(_)),x)for(f=0;f<a.length;f++)a[f](b,d,w,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){J0&&(!gp&&Ep()&&($i=gp=window,Rp=$i.document||{},ai.gsap=Sn,($i.gsapVersions||($i.gsapVersions=[])).push(Sn.version),Q0(ku||$i.GreenSockGlobals||!$i.gsap&&$i||{}),mx.forEach(gx)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},Fl=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Fl=0,c=Ll},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,p,S){var M=p?function(x,b,w,T){m(x,b,w,T),h.remove(M)}:m;return h.remove(m),a[S?"unshift":"push"](M),ko(),M},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&f>=p&&f--},_listeners:a},h})(),ko=function(){return!Fl&&Zn.wake()},ht={},Zb=/^[\d.\-M][\d.\-,\s]/,Kb=/["']/g,$b=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(Kb,"").trim():+c,r=l.substr(a+1).trim();return t},Jb=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},Qb=function(e){var t=(e+"").split("("),n=ht[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[$b(t[1])]:Jb(e).split(",").map(nx)):ht._CE&&Zb.test(e)?ht._CE("",e):n},jb=function(e){return function(t){return 1-e(1-t)}},Ls=function(e,t){return e&&(Wt(e)?e:ht[e]||Qb(e))||t},Os=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Nn(e,function(a){ht[a]=ai[a]=s,ht[o=a.toLowerCase()]=n;for(var l in s)ht[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ht[a+"."+l]=s[l]}),s},yx=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},hp=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/mp*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*bb((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:yx(a);return s=mp/s,l.config=function(c,u){return i(e,c,u)},l},fp=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:yx(n);return r.config=function(s){return i(e,s)},r};Nn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Os(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ht.Linear.easeNone=ht.none=ht.Linear.easeIn;Os("Elastic",hp("in"),hp("out"),hp());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};Os("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Os("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Os("Circ",function(i){return-(K0(1-i*i)-1)});Os("Sine",function(i){return i===1?1:-Sb(i*vb)+1});Os("Back",fp("in"),fp("out"),fp());ht.SteppedEase=ht.steps=ai.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-Tt;return function(a){return((r*Ul(0,o,a)|0)+s)*n}}};Il.ease=ht["quad.out"];Nn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Ip+=i+","+i+"Params,"});var Up=function(e,t){this.id=Mb++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Lp,this.set=t?t.getSetter:Ku},Nl=(function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Bo(this,+t.duration,1,1),this.data=t.data,Nt&&(this._ctx=Nt,Nt.data.push(this)),Fl||Zn.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Bo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(ko(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Zu(this,n),!s._dp||s.parent||sx(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ji(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Tt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),tx(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+G0(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+G0(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?Oo(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Tt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Hu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Tt?0:this._rts,this.totalTime(Ul(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Yu(this),Lb(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ko(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Tt&&(this._tTime-=Tt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=kt(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Ji(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Kn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Hu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Rb);var r=fn;return fn=n,Fp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),fn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,W0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,W0(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(Ti(this,n),Kn(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Kn(r)),this._dur||(this._zTime=-Tt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Tt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Tt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Tt)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=Wt(n)?n:ix,l=function(){var u=r.then;r.then=null,s&&s(),Wt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){El(this)},i})();li(Nl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Tt,_prom:0,_ps:!1,_rts:1});var vn=(function(i){Z0(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Kn(n.sortChildren),Vt&&Ji(n.parent||Vt,pr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&ox(pr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Rl(0,arguments,this),this},t.from=function(r,s,o){return Rl(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Rl(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Cl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Kt(r,s,Ti(this,o),1),this},t.call=function(r,s,o){return Ji(this,Kt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Kt(r,o,Ti(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Cl(o).immediateRender=Kn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,h){return a.startAt=o,Cl(a).immediateRender=Kn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,h)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:kt(r),h=this._zTime<0!=r<0&&(this._initted||!c),d,f,g,_,m,p,S,M,x,b,w,T;if(this!==Vt&&u>l&&r>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),d=u,x=this._start,M=this._ts,p=!M,h&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(w=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(d=kt(u%m),u===l?(_=this._repeat,d=c):(b=kt(u/m),_=~~b,_&&_===b&&(d=c,_--),d>c&&(d=c)),b=Oo(this._tTime,m),!a&&this._tTime&&b!==_&&this._tTime-b*m-this._dur<=0&&(b=_),w&&_&1&&(d=c-d,T=1),_!==b&&!this._lock){var C=w&&b&1,v=C===(w&&_&1);if(_<b&&(C=!C),a=C?0:u%c?c:u,this._lock=1,this.render(a||(T?0:kt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&oi(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,b=_),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,v&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=Ob(this,kt(a),kt(d)),S&&(u-=d-(d=S._start))),this._tTime=u,this._time=d,this._act=!!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!b&&(oi(this,"onStart"),this._tTime!==u))return this;if(d>=a&&r>=0)for(f=this._first;f;){if(g=f._next,(f._act||d>=f._start)&&f._ts&&S!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!p){S=0,g&&(u+=this._zTime=-Tt);break}}f=g}else{f=this._last;for(var y=r<0?r:d;f;){if(g=f._prev,(f._act||y<=f._end)&&f._ts&&S!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(y-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(y-f._start)*f._ts,s,o||fn&&Fp(f)),d!==this._time||!this._ts&&!p){S=0,g&&(u+=this._zTime=y?-Tt:Tt);break}}f=g}}if(S&&!s&&(this.pause(),S.render(d>=a?0:-Tt)._zTime=d>=a?1:-1,this._ts))return this._start=x,Yu(this),this.render(r,s,o);this._onUpdate&&!s&&oi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Kr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(oi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(gr(s)||(s=Ti(this,s,r)),!(r instanceof Nl)){if(Mn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(sn(r))return this.addLabel(r,s);if(Wt(r))r=Kt.delayedCall(0,r);else return this}return this!==r?Ji(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-wi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Kt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return sn(r)?this.removeLabel(r):Wt(r)?this.killTweensOf(r):(r.parent===this&&qu(this,r),r===this._recent&&(this._recent=this._last),Ds(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=kt(Zn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Ti(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Kt.delayedCall(0,s||Ll,o);return a.data="isPause",this._hasPause=1,Ji(this,a,Ti(this,r))},t.removePause=function(r){var s=this._first;for(r=Ti(this,r);s;)s._start===r&&s.data==="isPause"&&Kr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)qr!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Ei(r),l=this._first,c=gr(s),u;l;)l instanceof Kt?Pb(l._targets,a)&&(c?(!qr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Ti(o,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,g=Kt.to(o,li({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Tt,onStart:function(){if(o.pause(),!f){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Bo(g,m,0,1).render(g._time,!0,!0),f=1}u&&u.apply(g,h||[])}},s));return d?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,li({startAt:{time:Ti(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),X0(this,Ti(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),X0(this,Ti(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Tt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=kt(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Ds(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Ds(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=wi,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Ji(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=kt(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Bo(o,o===Vt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Vt._ts&&(tx(Vt,Hu(r,Vt)),ex=Zn.frame),Zn.frame>=z0){z0+=$n.autoSleep||120;var s=Vt._first;if((!s||!s._ts)&&$n.autoSleep&&Zn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Zn.sleep()}}},e})(Nl);li(vn.prototype,{_lock:0,_hasPause:0,_forcing:0});var eT=function(e,t,n,r,s,o,a){var l=new Un(this._pt,e,t,0,1,zp,null,s),c=0,u=0,h,d,f,g,_,m,p,S;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=Vo(r)),o&&(S=[n,r],o(S,e,t),n=S[0],r=S[1]),d=n.match(lp)||[];h=lp.exec(r);)g=h[0],_=r.substring(c,h.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),g!==d[u++]&&(m=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Us(m,g)-m:parseFloat(g)-m,m:f&&f<4?Math.round:0},c=lp.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Cp.test(r)||p)&&(l.e=0),this._pt=l,l},Op=function(e,t,n,r,s,o,a,l,c,u){Wt(r)&&(r=r(s||0,e,o));var h=e[t],d=n!=="get"?n:Wt(h)?c?e[t.indexOf("set")||!Wt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,f=Wt(h)?c?sT:Sx:Vp,g;if(sn(r)&&(~r.indexOf("random(")&&(r=Vo(r)),r.charAt(1)==="="&&(g=Us(d,r)+(dn(d)||0),(g||g===0)&&(r=g))),!u||d!==r||bp)return!isNaN(d*r)&&r!==""?(g=new Un(this._pt,e,t,+d||0,r-(d||0),typeof h=="boolean"?aT:bx,0,f),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&Xu(t,r),eT.call(this,e,t,d,r,f,l||$n.stringFilter,c))},tT=function(e,t,n,r,s){if(Wt(e)&&(e=Pl(e,s,t,n,r)),!Qi(e)||e.style&&e.nodeType||Mn(e)||$0(e))return sn(e)?Pl(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=Pl(e[a],s,t,n,r);return o},Bp=function(e,t,n,r,s,o){var a,l,c,u;if(Yn[e]&&(a=new Yn[e]).init(s,a.rawVars?t[e]:tT(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Un(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==No))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},qr,bp,kp=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,d=r.keyframes,f=r.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,S=p&&p.data==="nested"?p.vars.targets:m,M=e._overwrite==="auto"&&!wp,x=e.timeline,b=r.easeReverse||h,w,T,C,v,y,R,D,U,V,W,G,X,z;if(x&&(!d||!s)&&(s="none"),e._ease=Ls(s,Il.ease),e._rEase=b&&(Ls(b)||e._ease),e._from=!x&&!!r.runBackwards,e._from&&(e.ratio=1),!x||d&&!r.stagger){if(U=m[0]?Zr(m[0]).harness:0,X=U&&r[U.prop],w=zu(r,Pp),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!f?_.render(-1,!0):_.revert(u&&g?Uu:Cb),_._lazy=0),o){if(Kr(e._startAt=Kt.set(m,li({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Kn(l),startAt:null,delay:0,onUpdate:c&&function(){return oi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(fn||!a&&!f)&&e._startAt.revert(Uu),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),C=li({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Kn(l),immediateRender:a,stagger:0,parent:p},w),X&&(C[U.prop]=X),Kr(e._startAt=Kt.set(m,C)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(fn?e._startAt.revert(Uu):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,Tt,Tt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Kn(l)||l&&!g,T=0;T<m.length;T++){if(y=m[T],D=y._gsap||Dp(m)[T]._gsap,e._ptLookup[T]=W={},_p[D.id]&&Yr.length&&Vu(),G=S===m?T:S.indexOf(y),U&&(V=new U).init(y,X||w,e,G,S)!==!1&&(e._pt=v=new Un(e._pt,y,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(te){W[te]=v}),V.priority&&(R=1)),!U||X)for(C in w)Yn[C]&&(V=Bp(C,w,e,G,y,S))?V.priority&&(R=1):W[C]=v=Op.call(e,y,C,"get",w[C],G,S,0,r.stringFilter);e._op&&e._op[T]&&e.kill(y,e._op[T]),M&&e._pt&&(qr=e,Vt.killTweensOf(y,W,e.globalTime(t)),z=!e.parent,qr=0),e._pt&&l&&(_p[D.id]=1)}R&&Gp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!z,d&&t<=0&&x.render(wi,!0,!0)},nT=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return bp=1,e.vars[t]="+=0",kp(e,a),bp=0,l?Dl(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Xt(n)+dn(h.e)),h.b&&(h.b=u.s+dn(h.b))},iT=function(e,t){var n=e[0]?Zr(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=Uo({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},rT=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(Mn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Pl=function(e,t,n,r,s){return Wt(e)?e.call(t,n,r,s):sn(e)&&~e.indexOf("random(")?Vo(e):e},vx=Ip+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Mx={};Nn(vx+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Mx[i]=1});var Kt=(function(i){Z0(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Cl(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=r.parent||Vt,S=(Mn(n)||$0(n)?gr(n[0]):"length"in r)?[n]:Ei(n),M,x,b,w,T,C,v,y;if(a._targets=S.length?Dp(S):Dl("GSAP target "+n+" not found. https://gsap.com",!$n.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,g||d||Nu(c)||Nu(u)){r=a.vars;var R=r.easeReverse||r.yoyoEase;if(M=a.timeline=new vn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:S}),M.kill(),M.parent=M._dp=pr(a),M._start=0,d||Nu(c)||Nu(u)){if(w=S.length,v=d&&ux(d),Qi(d))for(T in d)~vx.indexOf(T)&&(y||(y={}),y[T]=d[T]);for(x=0;x<w;x++)b=zu(r,Mx),b.stagger=0,R&&(b.easeReverse=R),y&&Uo(b,y),C=S[x],b.duration=+Pl(c,pr(a),x,C,S),b.delay=(+Pl(u,pr(a),x,C,S)||0)-a._delay,!d&&w===1&&b.delay&&(a._delay=u=b.delay,a._start+=u,b.delay=0),M.to(C,b,v?v(x,C,S):0),M._ease=ht.none;M.duration()?c=u=0:a.timeline=0}else if(g){Cl(li(M.vars.defaults,{ease:"none"})),M._ease=Ls(g.ease||r.ease||"none");var D=0,U,V,W;if(Mn(g))g.forEach(function(G){return M.to(S,G,">")}),M.duration();else{b={};for(T in g)T==="ease"||T==="easeEach"||rT(T,g[T],b,g.easeEach);for(T in b)for(U=b[T].sort(function(G,X){return G.t-X.t}),D=0,x=0;x<U.length;x++)V=U[x],W={ease:V.e,duration:(V.t-(x?U[x-1].t:0))/100*c},W[T]=V.v,M.to(S,W,D),D+=W.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||a.duration(c=M.duration())}else a.timeline=0;return f===!0&&!wp&&(qr=pr(a),Vt.killTweensOf(S),qr=0),Ji(p,pr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!g&&a._start===kt(p._time)&&Kn(h)&&Fb(pr(a))&&p.data!=="nested")&&(a._tTime=-Tt,a.render(Math.max(0,-u)||0)),m&&ox(pr(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-Tt&&!u?l:r<Tt?0:r,d,f,g,_,m,p,S,M;if(!c)Ub(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=h,M=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(d=kt(h%_),h===l?(g=this._repeat,d=c):(m=kt(h/_),g=~~m,g&&g===m?(d=c,g--):d>c&&(d=c)),p=this._yoyo&&g&1,p&&(d=c-d),m=Oo(this._tTime,_),d===a&&!o&&this._initted&&g===m)return this._tTime=h,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&d!==_&&this._initted&&(this._lock=o=1,this.render(kt(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(ax(this,u?r:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var x=d<a;if(x!==this._inv){var b=x?a:c-a;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=b?(x?-1:1)/b:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=S=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=S=this._ease(d/c);if(this._from&&(this.ratio=S=1-S),this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!m&&(oi(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(S,f.d),f=f._next;M&&M.render(r<0?r:M._dur*M._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&xp(this,r,s,o),oi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&oi(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&xp(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Kr(this,1),!s&&!(u&&!a)&&(h||a||p)&&(oi(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){Fl||Zn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||kp(this,c),u=this._ease(c/this._dur),nT(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Zu(this,0),this.parent||rx(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?El(this):this.scrollTrigger&&this.scrollTrigger.kill(!!fn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,qr&&qr.vars.overwrite!==!0)._first||El(this),this.parent&&o!==this.timeline.totalDuration()&&Bo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Ei(r):a,c=this._ptLookup,u=this._pt,h,d,f,g,_,m,p;if((!s||s==="all")&&Db(a,l))return s==="all"&&(this._pt=0),El(this);for(h=this._op=this._op||[],s!=="all"&&(sn(s)&&(_={},Nn(s,function(S){return _[S]=1}),s=_),s=iT(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){d=c[p],s==="all"?(h[p]=s,g=d,f={}):(f=h[p]=h[p]||{},g=s);for(_ in g)m=d&&d[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&qu(this,m,"_pt"),delete d[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&u&&El(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Rl(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Rl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Vt.killTweensOf(r,s,o)},e})(Nl);li(Kt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Nn("staggerTo,staggerFrom,staggerFromTo",function(i){Kt[i]=function(){var e=new vn,t=vp.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Vp=function(e,t,n){return e[t]=n},Sx=function(e,t,n){return e[t](n)},sT=function(e,t,n,r){return e[t](r.fp,n)},oT=function(e,t,n){return e.setAttribute(t,n)},Ku=function(e,t){return Wt(e[t])?Sx:Wu(e[t])&&e.setAttribute?oT:Vp},bx=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},aT=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},zp=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Hp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},lT=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},cT=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?qu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},uT=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Gp=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Un=(function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||bx,this.d=l||this,this.set=c||Vp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=uT,this.m=n,this.mt=s,this.tween=r},i})();Nn(Ip+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Pp[i]=1});ai.TweenMax=ai.TweenLite=Kt;ai.TimelineLite=ai.TimelineMax=vn;Vt=new vn({sortChildren:!1,defaults:Il,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$n.stringFilter=Np;var Fs=[],Bu={},hT=[],Y0=0,fT=0,dp=function(e){return(Bu[e]||hT).map(function(t){return t()})},Tp=function(){var e=Date.now(),t=[];e-Y0>2&&(dp("matchMediaInit"),Fs.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=$i.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),dp("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Y0=e,dp("matchMedia"))},Tx=(function(){function i(t,n){this.selector=n&&Mp(n),this.data=[],this._r=[],this.isReverted=!1,this.id=fT++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){Wt(n)&&(s=r,r=n,n=Wt);var o=this,a=function(){var c=Nt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Mp(s)),Nt=o,h=r.apply(o,arguments),Wt(h)&&o._r.push(h),Nt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Wt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=Nt;Nt=null,n(this),Nt=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Kt&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof vn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Kt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Fs.length;o--;)Fs[o].id===this.id&&Fs.splice(o,1)},e.revert=function(n){this.kill(n||{})},i})(),dT=(function(){function i(t){this.contexts=[],this.scope=t,Nt&&Nt.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Qi(n)||(n={matches:n});var o=new Tx(0,s||this.scope),a=o.conditions={},l,c,u;Nt&&!o.selector&&(o.selector=Nt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=$i.matchMedia(n[c]),l&&(Fs.indexOf(o)<0&&Fs.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Tp):l.addEventListener("change",Tp)));return u&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i})(),Gu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return gx(r)})},timeline:function(e){return new vn(e)},getTweensOf:function(e,t){return Vt.getTweensOf(e,t)},getProperty:function(e,t,n,r){sn(e)&&(e=Ei(e)[0]);var s=Zr(e||{}).get,o=n?ix:nx;return n==="native"&&(n=""),e&&(t?o((Yn[t]&&Yn[t].get||s)(e,t,n,r)):function(a,l,c){return o((Yn[a]&&Yn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Ei(e),e.length>1){var r=e.map(function(u){return Sn.quickSetter(u,t,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}e=e[0]||{};var o=Yn[t],a=Zr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;No._pt=0,h.init(e,n?u+n:u,No,0,[e]),h.render(1,h),No._pt&&Hp(1,No)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=Sn.to(e,li((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Vt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ls(e.ease,Il.ease)),H0(Il,e||{})},config:function(e){return H0($n,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Yn[a]&&!ai[a]&&Dl(t+" effect requires "+a+" plugin.")}),cp[t]=function(a,l,c){return n(Ei(a),li(l||{},s),c)},o&&(vn.prototype[t]=function(a,l,c){return this.add(cp[t](a,Qi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ht[e]=Ls(t)},parseEase:function(e,t){return arguments.length?Ls(e,t):ht},getById:function(e){return Vt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new vn(e),r,s;for(n.smoothChildTiming=Kn(e.smoothChildTiming),Vt.remove(n),n._dp=0,n._time=n._tTime=Vt._time,r=Vt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Kt&&r.vars.onComplete===r._targets[0]))&&Ji(n,r,r._start-r._delay),r=s;return Ji(Vt,n,0),n},context:function(e,t){return e?new Tx(e,t):Nt},matchMedia:function(e){return new dT(e)},matchMediaRefresh:function(){return Fs.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Tp()},addEventListener:function(e,t){var n=Bu[e]||(Bu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Bu[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Wb,wrapYoyo:Xb,distribute:ux,random:fx,snap:hx,normalize:Gb,getUnit:dn,clamp:kb,splitColor:_x,toArray:Ei,selector:Mp,mapRange:px,pipe:zb,unitize:Hb,interpolate:qb,shuffle:cx},install:Q0,effects:cp,ticker:Zn,updateRoot:vn.updateRoot,plugins:Yn,globalTimeline:Vt,core:{PropTween:Un,globals:j0,Tween:Kt,Timeline:vn,Animation:Nl,getCache:Zr,_removeLinkedListItem:qu,reverting:function(){return fn},context:function(e){return e&&Nt&&(Nt.data.push(e),e._ctx=Nt),Nt},suppressOverwrites:function(e){return wp=e}}};Nn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Gu[i]=Kt[i]});Zn.add(vn.updateRoot);No=Gu.to({},{duration:0});var pT=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},mT=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=pT(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},pp=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(sn(s)&&(l={},Nn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}mT(a,s)}}}},Sn=Gu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)fn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},pp("roundProps",Sp),pp("modifiers"),pp("snap",hx))||Gu;Kt.version=vn.version=Sn.version="3.15.0";J0=1;Ep()&&ko();var gT=ht.Power0,_T=ht.Power1,xT=ht.Power2,yT=ht.Power3,vT=ht.Power4,MT=ht.Linear,ST=ht.Quad,bT=ht.Cubic,TT=ht.Quart,wT=ht.Quint,ET=ht.Strong,AT=ht.Elastic,CT=ht.Back,RT=ht.SteppedEase,PT=ht.Bounce,IT=ht.Sine,DT=ht.Expo,LT=ht.Circ;var wx,Jr,Ho,Kp,zs,FT,Ex,$p,NT=function(){return typeof window<"u"},xr={},Vs=180/Math.PI,Go=Math.PI/180,zo=Math.atan2,Ax=1e8,Jp=/([A-Z])/g,UT=/(left|right|width|margin|padding|x)/i,OT=/[\s,\(]\S/,ji={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Xp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},BT=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},kT=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},VT=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},zT=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Nx=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Ux=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},HT=function(e,t,n){return e.style[t]=n},GT=function(e,t,n){return e.style.setProperty(t,n)},WT=function(e,t,n){return e._gsap[t]=n},XT=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},qT=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},YT=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},zt="transform",Jn=zt+"Origin",ZT=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in xr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=ji[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=_r(r,a)}):this.tfm[e]=o.x?o[e]:_r(r,e),e===Jn&&(this.tfm.zOrigin=o.zOrigin);else return ji.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(zt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Jn,t,"")),e=zt}(s||t)&&this.props.push(e,t,s[e])},Ox=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},KT=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Jp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=$p(),(!s||!s.isStart)&&!n[zt]&&(Ox(n),r.zOrigin&&n[Jn]&&(n[Jn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Bx=function(e,t){var n={target:e,props:[],revert:KT,save:ZT};return e._gsap||Sn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},kx,qp=function(e,t){var n=Jr.createElementNS?Jr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Jr.createElement(e);return n&&n.style?n:Jr.createElement(e)},ci=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Jp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,Wo(t)||t,1)||""},Cx="O,Moz,ms,Ms,Webkit".split(","),Wo=function(e,t,n){var r=t||zs,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Cx[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Cx[o]:"")+e},Yp=function(){NT()&&window.document&&(wx=window,Jr=wx.document,Ho=Jr.documentElement,zs=qp("div")||{style:{}},FT=qp("div"),zt=Wo(zt),Jn=zt+"Origin",zs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",kx=!!Wo("perspective"),$p=Sn.core.reverting,Kp=1)},Rx=function(e){var t=e.ownerSVGElement,n=qp("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Ho.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Ho.removeChild(n),s},Px=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Vx=function(e){var t,n;try{t=e.getBBox()}catch{t=Rx(e),n=1}return t&&(t.width||t.height)||n||(t=Rx(e)),t&&!t.width&&!t.x&&!t.y?{x:+Px(e,["x","cx","x1"])||0,y:+Px(e,["y","cy","y1"])||0,width:0,height:0}:t},zx=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Vx(e))},jr=function(e,t){if(t){var n=e.style,r;t in xr&&t!==Jn&&(t=zt),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(Jp,"-$1").toLowerCase())):n.removeAttribute(t)}},Qr=function(e,t,n,r,s,o){var a=new Un(e._pt,t,n,0,1,o?Ux:Nx);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},Ix={deg:1,rad:1,turn:1},$T={grid:1,flex:1},es=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=zs.style,l=UT.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",f=r==="%",g,_,m,p;if(r===o||!s||Ix[r]||Ix[o])return s;if(o!=="px"&&!d&&(s=i(e,t,n,"px")),p=e.getCTM&&zx(e),(f||o==="%")&&(xr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],Xt(f?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(d?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Jr||!_.appendChild)&&(_=Jr.body),m=_._gsap,m&&f&&m.width&&l&&m.time===Zn.time&&!m.uncache)return Xt(s/m.width*h);if(f&&(t==="height"||t==="width")){var S=e.style[t];e.style[t]=h+r,g=e[u],S?e.style[t]=S:jr(e,t)}else(f||o==="%")&&!$T[ci(_,"display")]&&(a.position=ci(e,"position")),_===e&&(a.position="static"),_.appendChild(zs),g=zs[u],_.removeChild(zs),a.position="absolute";return l&&f&&(m=Zr(_),m.time=Zn.time,m.width=_[u]),Xt(d?g*s/h:g&&s?h/g*s:0)},_r=function(e,t,n,r){var s;return Kp||Yp(),t in ji&&t!=="transform"&&(t=ji[t],~t.indexOf(",")&&(t=t.split(",")[0])),xr[t]&&t!=="transform"?(s=kl(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Ju(ci(e,Jn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=$u[t]&&$u[t](e,t,n)||ci(e,t)||Lp(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?es(e,t,s,n)+n:s},JT=function(e,t,n,r){if(!n||n==="none"){var s=Wo(t,e,1),o=s&&ci(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=ci(e,"borderTopColor"))}var a=new Un(this._pt,e.style,t,0,1,zp),l=0,c=0,u,h,d,f,g,_,m,p,S,M,x,b;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=ci(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=ci(e,t)||r,_?e.style[t]=_:jr(e,t)),u=[n,r],Np(u),n=u[0],r=u[1],d=n.match(Ns)||[],b=r.match(Ns)||[],b.length){for(;h=Ns.exec(r);)m=h[0],S=r.substring(l,h.index),g?g=(g+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(g=1),m!==(_=d[c++]||"")&&(f=parseFloat(_)||0,x=_.substr((f+"").length),m.charAt(1)==="="&&(m=Us(f,m)+x),p=parseFloat(m),M=m.substr((p+"").length),l=Ns.lastIndex-M.length,M||(M=M||$n.units[t]||x,l===r.length&&(r+=M,a.e+=M)),x!==M&&(f=es(e,t,_,M)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:f,c:p-f,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Ux:Nx;return Cp.test(r)&&(a.e=0),this._pt=a,a},Dx={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},QT=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=Dx[n]||n,t[1]=Dx[r]||r,t.join(" ")},jT=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],xr[a]&&(l=1,a=a==="transformOrigin"?Jn:zt),jr(n,a);l&&(jr(n,zt),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",kl(n,1),o.uncache=1,Ox(r)))}},$u={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Un(e._pt,t,n,0,0,jT);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},Bl=[1,0,0,1,0,0],Hx={},Gx=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Lx=function(e){var t=ci(e,zt);return Gx(t)?Bl:t.substr(7).match(Ap).map(Xt)},Qp=function(e,t){var n=e._gsap||Zr(e),r=e.style,s=Lx(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Bl:s):(s===Bl&&!e.offsetParent&&e!==Ho&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ho.appendChild(e)),s=Lx(e),l?r.display=l:jr(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ho.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Zp=function(e,t,n,r,s,o){var a=e._gsap,l=s||Qp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,f=l[0],g=l[1],_=l[2],m=l[3],p=l[4],S=l[5],M=t.split(" "),x=parseFloat(M[0])||0,b=parseFloat(M[1])||0,w,T,C,v;n?l!==Bl&&(T=f*m-g*_)&&(C=x*(m/T)+b*(-_/T)+(_*S-m*p)/T,v=x*(-g/T)+b*(f/T)-(f*S-g*p)/T,x=C,b=v):(w=Vx(e),x=w.x+(~M[0].indexOf("%")?x/100*w.width:x),b=w.y+(~(M[1]||M[0]).indexOf("%")?b/100*w.height:b)),r||r!==!1&&a.smooth?(p=x-c,S=b-u,a.xOffset=h+(p*f+S*_)-p,a.yOffset=d+(p*g+S*m)-S):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=b,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Jn]="0px 0px",o&&(Qr(o,a,"xOrigin",c,x),Qr(o,a,"yOrigin",u,b),Qr(o,a,"xOffset",h,a.xOffset),Qr(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+b)},kl=function(e,t){var n=e._gsap||new Up(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=ci(e,Jn)||"0",u,h,d,f,g,_,m,p,S,M,x,b,w,T,C,v,y,R,D,U,V,W,G,X,z,te,L,ce,De,Ke,He,Ae;return u=h=d=_=m=p=S=M=x=0,f=g=1,n.svg=!!(e.getCTM&&zx(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[zt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[zt]!=="none"?l[zt]:"")),r.scale=r.rotate=r.translate="none"),T=Qp(e,n.svg),n.svg&&(n.uncache?(z=e.getBBox(),c=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",X=""):X=!t&&e.getAttribute("data-svg-origin"),Zp(e,X||c,!!X||n.originIsAbsolute,n.smooth!==!1,T)),b=n.xOrigin||0,w=n.yOrigin||0,T!==Bl&&(R=T[0],D=T[1],U=T[2],V=T[3],u=W=T[4],h=G=T[5],T.length===6?(f=Math.sqrt(R*R+D*D),g=Math.sqrt(V*V+U*U),_=R||D?zo(D,R)*Vs:0,S=U||V?zo(U,V)*Vs+_:0,S&&(g*=Math.abs(Math.cos(S*Go))),n.svg&&(u-=b-(b*R+w*U),h-=w-(b*D+w*V))):(Ae=T[6],Ke=T[7],L=T[8],ce=T[9],De=T[10],He=T[11],u=T[12],h=T[13],d=T[14],C=zo(Ae,De),m=C*Vs,C&&(v=Math.cos(-C),y=Math.sin(-C),X=W*v+L*y,z=G*v+ce*y,te=Ae*v+De*y,L=W*-y+L*v,ce=G*-y+ce*v,De=Ae*-y+De*v,He=Ke*-y+He*v,W=X,G=z,Ae=te),C=zo(-U,De),p=C*Vs,C&&(v=Math.cos(-C),y=Math.sin(-C),X=R*v-L*y,z=D*v-ce*y,te=U*v-De*y,He=V*y+He*v,R=X,D=z,U=te),C=zo(D,R),_=C*Vs,C&&(v=Math.cos(C),y=Math.sin(C),X=R*v+D*y,z=W*v+G*y,D=D*v-R*y,G=G*v-W*y,R=X,W=z),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),f=Xt(Math.sqrt(R*R+D*D+U*U)),g=Xt(Math.sqrt(G*G+Ae*Ae)),C=zo(W,G),S=Math.abs(C)>2e-4?C*Vs:0,x=He?1/(He<0?-He:He):0),n.svg&&(X=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Gx(ci(e,zt)),X&&e.setAttribute("transform",X))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(f*=-1,S+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,S+=S<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Xt(f),n.scaleY=Xt(g),n.rotation=Xt(_)+a,n.rotationX=Xt(m)+a,n.rotationY=Xt(p)+a,n.skewX=S+a,n.skewY=M+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Jn]=Ju(c)),n.xOffset=n.yOffset=0,n.force3D=$n.force3D,n.renderTransform=n.svg?t1:kx?Wx:e1,n.uncache=0,n},Ju=function(e){return(e=e.split(" "))[0]+" "+e[1]},Wp=function(e,t,n){var r=dn(t);return Xt(parseFloat(t)+parseFloat(es(e,"x",n+"px",r)))+r},e1=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Wx(e,t)},Bs="0deg",Ol="0px",ks=") ",Wx=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,S=n.target,M=n.zOrigin,x="",b=p==="auto"&&e&&e!==1||p===!0;if(M&&(h!==Bs||u!==Bs)){var w=parseFloat(u)*Go,T=Math.sin(w),C=Math.cos(w),v;w=parseFloat(h)*Go,v=Math.cos(w),o=Wp(S,o,T*v*-M),a=Wp(S,a,-Math.sin(w)*-M),l=Wp(S,l,C*v*-M+M)}m!==Ol&&(x+="perspective("+m+ks),(r||s)&&(x+="translate("+r+"%, "+s+"%) "),(b||o!==Ol||a!==Ol||l!==Ol)&&(x+=l!==Ol||b?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+ks),c!==Bs&&(x+="rotate("+c+ks),u!==Bs&&(x+="rotateY("+u+ks),h!==Bs&&(x+="rotateX("+h+ks),(d!==Bs||f!==Bs)&&(x+="skew("+d+", "+f+ks),(g!==1||_!==1)&&(x+="scale("+g+", "+_+ks),S.style[zt]=x||"translate(0, 0)"},t1=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,S=n.forceCSS,M=parseFloat(o),x=parseFloat(a),b,w,T,C,v;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Go,c*=Go,b=Math.cos(l)*h,w=Math.sin(l)*h,T=Math.sin(l-c)*-d,C=Math.cos(l-c)*d,c&&(u*=Go,v=Math.tan(c-u),v=Math.sqrt(1+v*v),T*=v,C*=v,u&&(v=Math.tan(u),v=Math.sqrt(1+v*v),b*=v,w*=v)),b=Xt(b),w=Xt(w),T=Xt(T),C=Xt(C)):(b=h,C=d,w=T=0),(M&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(M=es(f,"x",o,"px"),x=es(f,"y",a,"px")),(g||_||m||p)&&(M=Xt(M+g-(g*b+_*T)+m),x=Xt(x+_-(g*w+_*C)+p)),(r||s)&&(v=f.getBBox(),M=Xt(M+r/100*v.width),x=Xt(x+s/100*v.height)),v="matrix("+b+","+w+","+T+","+C+","+M+","+x+")",f.setAttribute("transform",v),S&&(f.style[zt]=v)},n1=function(e,t,n,r,s){var o=360,a=sn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Vs:1),c=l-r,u=r+c+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*Ax)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*Ax)%o-~~(c/o)*o)),e._pt=d=new Un(e._pt,t,n,r,c,BT),d.e=u,d.u="deg",e._props.push(n),d},Fx=function(e,t){for(var n in t)e[n]=t[n];return e},i1=function(e,t,n){var r=Fx({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,d,f,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[zt]=t,a=kl(n,1),jr(n,zt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[zt],o[zt]=t,a=kl(n,1),o[zt]=c);for(l in xr)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=dn(c),g=dn(u),h=f!==g?es(n,l,c,g):parseFloat(c),d=parseFloat(u),e._pt=new Un(e._pt,a,l,h,d-h,Xp),e._pt.u=g||0,e._props.push(l));Fx(a,r)};Nn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});$u[e>1?"border"+i:i]=function(a,l,c,u,h){var d,f;if(arguments.length<4)return d=o.map(function(g){return _r(a,g,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},o.forEach(function(g,_){return f[g]=d[_]=d[_]||d[(_-1)/2|0]}),a.init(l,f,h)}});var jp={name:"css",register:Yp,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,d,f,g,_,m,p,S,M,x,b,w,T,C,v;Kp||Yp(),this.styles=this.styles||Bx(e),C=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Yn[_]&&Bp(_,t,n,r,e,s)))){if(f=typeof u,g=$u[_],f==="function"&&(u=u.call(n,r,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=Vo(u)),g)g(this,e,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",mr.lastIndex=0,mr.test(c)||(m=dn(c),p=dn(u),p?m!==p&&(c=es(e,_,c,p)+p):m&&(u+=m)),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),C.push(_,0,a[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,e,s):l[_],sn(c)&&~c.indexOf("random(")&&(c=Vo(c)),dn(c+"")||c==="auto"||(c+=$n.units[_]||dn(_r(e,_))||""),(c+"").charAt(1)==="="&&(c=_r(e,_))):c=_r(e,_),d=parseFloat(c),S=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),h=parseFloat(u),_ in ji&&(_==="autoAlpha"&&(d===1&&_r(e,"visibility")==="hidden"&&h&&(d=0),C.push("visibility",0,a.visibility),Qr(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=ji[_],~_.indexOf(",")&&(_=_.split(",")[0]))),M=_ in xr,M){if(this.styles.save(_),v=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=ci(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var y=e.style.perspective;e.style.perspective=u,u=ci(e,"perspective"),y?e.style.perspective=y:jr(e,"perspective")}h=parseFloat(u)}if(x||(b=e._gsap,b.renderTransform&&!t.parseTransform||kl(e,t.parseTransform),w=t.smoothOrigin!==!1&&b.smooth,x=this._pt=new Un(this._pt,a,zt,0,1,b.renderTransform,b,0,-1),x.dep=1),_==="scale")this._pt=new Un(this._pt,b,"scaleY",b.scaleY,(S?Us(b.scaleY,S+h):h)-b.scaleY||0,Xp),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(Jn,0,a[Jn]),u=QT(u),b.svg?Zp(e,u,0,w,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==b.zOrigin&&Qr(this,b,"zOrigin",b.zOrigin,p),Qr(this,a,_,Ju(c),Ju(u)));continue}else if(_==="svgOrigin"){Zp(e,u,1,w,0,this);continue}else if(_ in Hx){n1(this,b,_,d,S?Us(d,S+u):u);continue}else if(_==="smoothOrigin"){Qr(this,b,"smooth",b.smooth,u);continue}else if(_==="force3D"){b[_]=u;continue}else if(_==="transform"){i1(this,u,e);continue}}else _ in a||(_=Wo(_)||_);if(M||(h||h===0)&&(d||d===0)&&!OT.test(u)&&_ in a)m=(c+"").substr((d+"").length),h||(h=0),p=dn(u)||(_ in $n.units?$n.units[_]:m),m!==p&&(d=es(e,_,c,p)),this._pt=new Un(this._pt,M?b:a,_,d,(S?Us(d,S+h):h)-d,!M&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?zT:Xp),this._pt.u=p||0,M&&v!==u?(this._pt.b=c,this._pt.e=v,this._pt.r=VT):m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=kT);else if(_ in a)JT.call(this,e,_,c,S?S+u:u);else if(_ in e)this.add(e,_,c||e[_],S?S+u:u,r,s);else if(_!=="parseTransform"){Xu(_,u);continue}M||(_ in a?C.push(_,0,a[_]):typeof e[_]=="function"?C.push(_,2,e[_]()):C.push(_,1,c||e[_])),o.push(_)}}T&&Gp(this)},render:function(e,t){if(t.tween._time||!$p())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:_r,aliases:ji,getSetter:function(e,t,n){var r=ji[t];return r&&r.indexOf(",")<0&&(t=r),t in xr&&t!==Jn&&(e._gsap.x||_r(e,"x"))?n&&Ex===n?t==="scale"?XT:WT:(Ex=n||{})&&(t==="scale"?qT:YT):e.style&&!Wu(e.style[t])?HT:~t.indexOf("-")?GT:Ku(e,t)},core:{_removeProperty:jr,_getMatrix:Qp}};Sn.utils.checkPrefix=Wo;Sn.core.getStyleSaver=Bx;(function(i,e,t,n){var r=Nn(i+","+e+","+t,function(s){xr[s]=1});Nn(e,function(s){$n.units[s]="deg",Hx[s]=1}),ji[r[13]]=i+","+e,Nn(n,function(s){var o=s.split(":");ji[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Nn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){$n.units[i]="px"});Sn.registerPlugin(jp);var Pt=Sn.registerPlugin(jp)||Sn,LB=Pt.core.Tween;function Xx(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function r1(i,e,t){return e&&Xx(i.prototype,e),t&&Xx(i,t),i}var pn,eh,s1,ui,ts,ns,qo,Yx,Hs,Yo,Zx,yr,Ui,Kx,$x=function(){return pn||typeof window<"u"&&(pn=window.gsap)&&pn.registerPlugin&&pn},Jx=1,Xo=[],ot=[],Oi=[],zl=Date.now,em=function(e,t){return t},o1=function(){var e=Yo.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,ot),r.push.apply(r,Oi),ot=n,Oi=r,em=function(o,a){return t[o](a)}},Mr=function(e,t){return~Oi.indexOf(e)&&Oi[Oi.indexOf(e)+1][t]},Hl=function(e){return!!~Zx.indexOf(e)},Bn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},On=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Qu="scrollLeft",ju="scrollTop",tm=function(){return yr&&yr.isPressed||ot.cache++},th=function(e,t){var n=function r(s){if(s||s===0){Jx&&(ui.history.scrollRestoration="manual");var o=yr&&yr.isPressed;s=r.v=Math.round(s)||(yr&&yr.iOS?1:0),e(s),r.cacheID=ot.cache,o&&em("ss",s)}else(t||ot.cache!==r.cacheID||em("ref"))&&(r.cacheID=ot.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},bn={s:Qu,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:th(function(i){return arguments.length?ui.scrollTo(i,Qt.sc()):ui.pageXOffset||ts[Qu]||ns[Qu]||qo[Qu]||0})},Qt={s:ju,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:bn,sc:th(function(i){return arguments.length?ui.scrollTo(bn.sc(),i):ui.pageYOffset||ts[ju]||ns[ju]||qo[ju]||0})},kn=function(e,t){return(t&&t._ctx&&t._ctx.selector||pn.utils.toArray)(e)[0]||(typeof e=="string"&&pn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},a1=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},vr=function(e,t){var n=t.s,r=t.sc;Hl(e)&&(e=ts.scrollingElement||ns);var s=ot.indexOf(e),o=r===Qt.sc?1:2;!~s&&(s=ot.push(e)-1),ot[s+o]||Bn(e,"scroll",tm);var a=ot[s+o],l=a||(ot[s+o]=th(Mr(e,n),!0)||(Hl(e)?r:th(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=pn.getProperty(e,"scrollBehavior")==="smooth"),l},nh=function(e,t,n){var r=e,s=e,o=zl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=zl();_||m-o>l?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},h=function(){s=r=n?0:r,a=o=0},d=function(g){var _=a,m=s,p=zl();return(g||g===0)&&g!==r&&u(g),o===a||p-a>c?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:h,getVelocity:d}},Vl=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},qx=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Qx=function(){Yo=pn.core.globals().ScrollTrigger,Yo&&Yo.core&&o1()},jx=function(e){return pn=e||$x(),!eh&&pn&&typeof document<"u"&&document.body&&(ui=window,ts=document,ns=ts.documentElement,qo=ts.body,Zx=[ui,ts,ns,qo],s1=pn.utils.clamp,Kx=pn.core.context||function(){},Hs="onpointerenter"in qo?"pointer":"mouse",Yx=qt.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ui=qt.eventTypes=("ontouchstart"in ns?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ns?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Jx=0},500),eh=1),Yo||Qx(),eh};bn.op=Qt;ot.cache=0;var qt=(function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){eh||jx(pn)||console.warn("Please gsap.registerPlugin(Observer)"),Yo||Qx();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,d=n.onStopDelay,f=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,S=n.onDrag,M=n.onPress,x=n.onRelease,b=n.onRight,w=n.onLeft,T=n.onUp,C=n.onDown,v=n.onChangeX,y=n.onChangeY,R=n.onChange,D=n.onToggleX,U=n.onToggleY,V=n.onHover,W=n.onHoverEnd,G=n.onMove,X=n.ignoreCheck,z=n.isNormalizer,te=n.onGestureStart,L=n.onGestureEnd,ce=n.onWheel,De=n.onEnable,Ke=n.onDisable,He=n.onClick,Ae=n.scrollSpeed,Z=n.capture,$=n.allowClicks,se=n.lockAxis,Me=n.onLockAxis;this.target=a=kn(a)||ns,this.vars=n,f&&(f=pn.utils.toArray(f)),r=r||1e-9,s=s||0,g=g||1,Ae=Ae||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(qo).lineHeight)||22);var ye,Oe,$e,I,Ge,Ee,Te,N=this,je=0,J=0,he=n.passive||!u&&n.passive!==!1,Le=vr(a,bn),st=vr(a,Qt),P=Le(),E=st(),H=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ui[0]==="pointerdown",Q=Hl(a),j=a.ownerDocument||ts,K=[0,0,0],ve=[0,0,0],ae=0,Pe=function(){return ae=zl()},pe=function(Fe,Je){return(N.event=Fe)&&f&&a1(Fe.target,f)||Je&&H&&Fe.pointerType!=="touch"||X&&X(Fe,Je)},oe=function(){N._vx.reset(),N._vy.reset(),Oe.pause(),h&&h(N)},de=function(){var Fe=N.deltaX=qx(K),Je=N.deltaY=qx(ve),me=Math.abs(Fe)>=r,We=Math.abs(Je)>=r;R&&(me||We)&&R(N,Fe,Je,K,ve),me&&(b&&N.deltaX>0&&b(N),w&&N.deltaX<0&&w(N),v&&v(N),D&&N.deltaX<0!=je<0&&D(N),je=N.deltaX,K[0]=K[1]=K[2]=0),We&&(C&&N.deltaY>0&&C(N),T&&N.deltaY<0&&T(N),y&&y(N),U&&N.deltaY<0!=J<0&&U(N),J=N.deltaY,ve[0]=ve[1]=ve[2]=0),(I||$e)&&(G&&G(N),$e&&(m&&$e===1&&m(N),S&&S(N),$e=0),I=!1),Ee&&!(Ee=!1)&&Me&&Me(N),Ge&&(ce(N),Ge=!1),ye=0},ke=function(Fe,Je,me){K[me]+=Fe,ve[me]+=Je,N._vx.update(Fe),N._vy.update(Je),c?ye||(ye=requestAnimationFrame(de)):de()},Ie=function(Fe,Je){se&&!Te&&(N.axis=Te=Math.abs(Fe)>Math.abs(Je)?"x":"y",Ee=!0),Te!=="y"&&(K[2]+=Fe,N._vx.update(Fe,!0)),Te!=="x"&&(ve[2]+=Je,N._vy.update(Je,!0)),c?ye||(ye=requestAnimationFrame(de)):de()},fe=function(Fe){if(!pe(Fe,1)){Fe=Vl(Fe,u);var Je=Fe.clientX,me=Fe.clientY,We=Je-N.x,Be=me-N.y,Ze=N.isDragging;N.x=Je,N.y=me,(Ze||(We||Be)&&(Math.abs(N.startX-Je)>=s||Math.abs(N.startY-me)>=s))&&($e||($e=Ze?2:1),Ze||(N.isDragging=!0),Ie(We,Be))}},qe=N.onPress=function(xe){pe(xe,1)||xe&&xe.button||(N.axis=Te=null,Oe.pause(),N.isPressed=!0,xe=Vl(xe),je=J=0,N.startX=N.x=xe.clientX,N.startY=N.y=xe.clientY,N._vx.reset(),N._vy.reset(),Bn(z?a:j,Ui[1],fe,he,!0),N.deltaX=N.deltaY=0,M&&M(N))},F=N.onRelease=function(xe){if(!pe(xe,1)){On(z?a:j,Ui[1],fe,!0);var Fe=!isNaN(N.y-N.startY),Je=N.isDragging,me=Je&&(Math.abs(N.x-N.startX)>3||Math.abs(N.y-N.startY)>3),We=Vl(xe);!me&&Fe&&(N._vx.reset(),N._vy.reset(),u&&$&&pn.delayedCall(.08,function(){if(zl()-ae>300&&!xe.defaultPrevented){if(xe.target.click)xe.target.click();else if(j.createEvent){var Be=j.createEvent("MouseEvents");Be.initMouseEvent("click",!0,!0,ui,1,We.screenX,We.screenY,We.clientX,We.clientY,!1,!1,!1,!1,0,null),xe.target.dispatchEvent(Be)}}})),N.isDragging=N.isGesturing=N.isPressed=!1,h&&Je&&!z&&Oe.restart(!0),$e&&de(),p&&Je&&p(N),x&&x(N,me)}},re=function(Fe){return Fe.touches&&Fe.touches.length>1&&(N.isGesturing=!0)&&te(Fe,N.isDragging)},le=function(){return(N.isGesturing=!1)||L(N)},ge=function(Fe){if(!pe(Fe)){var Je=Le(),me=st();ke((Je-P)*Ae,(me-E)*Ae,1),P=Je,E=me,h&&Oe.restart(!0)}},ie=function(Fe){if(!pe(Fe)){Fe=Vl(Fe,u),ce&&(Ge=!0);var Je=(Fe.deltaMode===1?l:Fe.deltaMode===2?ui.innerHeight:1)*g;ke(Fe.deltaX*Je,Fe.deltaY*Je,0),h&&!z&&Oe.restart(!0)}},ee=function(Fe){if(!pe(Fe)){var Je=Fe.clientX,me=Fe.clientY,We=Je-N.x,Be=me-N.y;N.x=Je,N.y=me,I=!0,h&&Oe.restart(!0),(We||Be)&&Ie(We,Be)}},we=function(Fe){N.event=Fe,V(N)},ze=function(Fe){N.event=Fe,W(N)},pt=function(Fe){return pe(Fe)||Vl(Fe,u)&&He(N)};Oe=N._dc=pn.delayedCall(d||.25,oe).pause(),N.deltaX=N.deltaY=0,N._vx=nh(0,50,!0),N._vy=nh(0,50,!0),N.scrollX=Le,N.scrollY=st,N.isDragging=N.isGesturing=N.isPressed=!1,Kx(this),N.enable=function(xe){return N.isEnabled||(Bn(Q?j:a,"scroll",tm),o.indexOf("scroll")>=0&&Bn(Q?j:a,"scroll",ge,he,Z),o.indexOf("wheel")>=0&&Bn(a,"wheel",ie,he,Z),(o.indexOf("touch")>=0&&Yx||o.indexOf("pointer")>=0)&&(Bn(a,Ui[0],qe,he,Z),Bn(j,Ui[2],F),Bn(j,Ui[3],F),$&&Bn(a,"click",Pe,!0,!0),He&&Bn(a,"click",pt),te&&Bn(j,"gesturestart",re),L&&Bn(j,"gestureend",le),V&&Bn(a,Hs+"enter",we),W&&Bn(a,Hs+"leave",ze),G&&Bn(a,Hs+"move",ee)),N.isEnabled=!0,N.isDragging=N.isGesturing=N.isPressed=I=$e=!1,N._vx.reset(),N._vy.reset(),P=Le(),E=st(),xe&&xe.type&&qe(xe),De&&De(N)),N},N.disable=function(){N.isEnabled&&(Xo.filter(function(xe){return xe!==N&&Hl(xe.target)}).length||On(Q?j:a,"scroll",tm),N.isPressed&&(N._vx.reset(),N._vy.reset(),On(z?a:j,Ui[1],fe,!0)),On(Q?j:a,"scroll",ge,Z),On(a,"wheel",ie,Z),On(a,Ui[0],qe,Z),On(j,Ui[2],F),On(j,Ui[3],F),On(a,"click",Pe,!0),On(a,"click",pt),On(j,"gesturestart",re),On(j,"gestureend",le),On(a,Hs+"enter",we),On(a,Hs+"leave",ze),On(a,Hs+"move",ee),N.isEnabled=N.isPressed=N.isDragging=!1,Ke&&Ke(N))},N.kill=N.revert=function(){N.disable();var xe=Xo.indexOf(N);xe>=0&&Xo.splice(xe,1),yr===N&&(yr=0)},Xo.push(N),z&&Hl(a)&&(yr=N),N.enable(_)},r1(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i})();qt.version="3.15.0";qt.create=function(i){return new qt(i)};qt.register=jx;qt.getAll=function(){return Xo.slice()};qt.getById=function(i){return Xo.filter(function(e){return e.vars.id===i})[0]};$x()&&pn.registerPlugin(qt);var Re,Jo,ct,xt,di,gt,mm,xh,nc,Kl,Wl,ih,Tn,Mh,lm,zn,ey,ty,Qo,_y,nm,xy,Vn,cm,yy,vy,is,um,gm,jo,_m,$l,hm,im,rh=1,wn=Date.now,rm=wn(),Ri=0,Xl=0,ny=function(e,t,n){var r=fi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},iy=function(e,t){return t&&(!fi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},l1=function i(){return Xl&&requestAnimationFrame(i)},ry=function(){return Mh=1},sy=function(){return Mh=0},er=function(e){return e},ql=function(e){return Math.round(e*1e5)/1e5||0},My=function(){return typeof window<"u"},Sy=function(){return Re||My()&&(Re=window.gsap)&&Re.registerPlugin&&Re},Zs=function(e){return!!~mm.indexOf(e)},by=function(e){return(e==="Height"?_m:ct["inner"+e])||di["client"+e]||gt["client"+e]},Ty=function(e){return Mr(e,"getBoundingClientRect")||(Zs(e)?function(){return _h.width=ct.innerWidth,_h.height=_m,_h}:function(){return Sr(e)})},c1=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=Mr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?by(s):e["client"+s])||0}},u1=function(e,t){return!t||~Oi.indexOf(e)?Ty(e):function(){return _h}},tr=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=Mr(e,n))?o()-Ty(e)()[s]:Zs(e)?(di[n]||gt[n])-by(r):e[n]-e["offset"+r])},sh=function(e,t){for(var n=0;n<Qo.length;n+=3)(!t||~t.indexOf(Qo[n+1]))&&e(Qo[n],Qo[n+1],Qo[n+2])},fi=function(e){return typeof e=="string"},En=function(e){return typeof e=="function"},Yl=function(e){return typeof e=="number"},Gs=function(e){return typeof e=="object"},Gl=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Zo=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Ko=Math.abs,wy="left",Ey="top",xm="right",ym="bottom",Xs="width",qs="height",Jl="Right",Ql="Left",jl="Top",ec="Bottom",jt="padding",Ai="margin",ta="Width",vm="Height",on="px",Ci=function(e){return ct.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},h1=function(e){var t=Ci(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},oy=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Sr=function(e,t){var n=t&&Ci(e)[lm]!=="matrix(1, 0, 0, 1, 0, 0)"&&Re.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},yh=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ay=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},f1=function(e){return function(t){return Re.utils.snap(Ay(e),t)}},Mm=function(e){var t=Re.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},d1=function(e){return function(t,n){return Mm(Ay(e))(t,n.direction)}},oh=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},un=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},cn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ah=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},ay={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},lh={toggleActions:"play",anticipatePin:0},vh={top:0,left:0,center:.5,bottom:1,right:1},dh=function(e,t){if(fi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in vh?vh[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},ch=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,d=s.indent,f=s.fontWeight,g=xt.createElement("div"),_=Zs(n)||Mr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?gt:n.tagName==="IFRAME"?n.contentDocument.body:n,S=e.indexOf("start")!==-1,M=S?c:u,x="border-color:"+M+";font-size:"+h+";color:"+M+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(x+=(r===Qt?xm:ym)+":"+(o+parseFloat(d))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=S,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=x,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],ph(g,0,r,S),g},ph=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+ta]=1,s["border"+a+ta]=0,s[n.p]=t+"px",Re.set(e,s)},at=[],fm={},ic,ly=function(){return wn()-Ri>34&&(ic||(ic=requestAnimationFrame(br)))},$o=function(){(!Vn||!Vn.isPressed||Vn.startX>gt.clientWidth)&&(ot.cache++,Vn?ic||(ic=requestAnimationFrame(br)):br(),Ri||$s("scrollStart"),Ri=wn())},sm=function(){vy=ct.innerWidth,yy=ct.innerHeight},Zl=function(e){ot.cache++,(e===!0||!Tn&&!xy&&!xt.fullscreenElement&&!xt.webkitFullscreenElement&&(!cm||vy!==ct.innerWidth||Math.abs(ct.innerHeight-yy)>ct.innerHeight*.25))&&xh.restart(!0)},Ks={},p1=[],Cy=function i(){return cn(it,"scrollEnd",i)||Ws(!0)},$s=function(e){return Ks[e]&&Ks[e].map(function(t){return t()})||p1},hi=[],Ry=function(e){for(var t=0;t<hi.length;t+=5)(!e||hi[t+4]&&hi[t+4].query===e)&&(hi[t].style.cssText=hi[t+1],hi[t].getBBox&&hi[t].setAttribute("transform",hi[t+2]||""),hi[t+3].uncache=1)},Py=function(){return ot.forEach(function(e){return En(e)&&++e.cacheID&&(e.rec=e())})},Sm=function(e,t){var n;for(zn=0;zn<at.length;zn++)n=at[zn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));$l=!0,t&&Ry(t),t||$s("revert")},Iy=function(e,t){ot.cache++,(t||!Hn)&&ot.forEach(function(n){return En(n)&&n.cacheID++&&(n.rec=0)}),fi(e)&&(ct.history.scrollRestoration=gm=e)},Hn,Ys=0,cy,m1=function(){if(cy!==Ys){var e=cy=Ys;requestAnimationFrame(function(){return e===Ys&&Ws(!0)})}},Dy=function(){gt.appendChild(jo),_m=!Vn&&jo.offsetHeight||ct.innerHeight,gt.removeChild(jo)},uy=function(e){return nc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ws=function(e,t){if(di=xt.documentElement,gt=xt.body,mm=[ct,xt,di,gt],Ri&&!e&&!$l){un(it,"scrollEnd",Cy);return}Dy(),Hn=it.isRefreshing=!0,$l||Py();var n=$s("refreshInit");_y&&it.sort(),t||Sm(),ot.forEach(function(r){En(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),at.slice(0).forEach(function(r){return r.refresh()}),$l=!1,at.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),hm=1,uy(!0),at.forEach(function(r){var s=tr(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),uy(!1),hm=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),ot.forEach(function(r){En(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Iy(gm,1),xh.pause(),Ys++,Hn=2,br(2),at.forEach(function(r){return En(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Hn=it.isRefreshing=!1,$s("refresh")},dm=0,mh=1,tc,br=function(e){if(e===2||!Hn&&!$l){it.isUpdating=!0,tc&&tc.update(0);var t=at.length,n=wn(),r=n-rm>=50,s=t&&at[0].scroll();if(mh=dm>s?-1:1,Hn||(dm=s),r&&(Ri&&!Mh&&n-Ri>200&&(Ri=0,$s("scrollEnd")),Wl=rm,rm=n),mh<0){for(zn=t;zn-- >0;)at[zn]&&at[zn].update(0,r);mh=1}else for(zn=0;zn<t;zn++)at[zn]&&at[zn].update(0,r);it.isUpdating=!1}ic=0},pm=[wy,Ey,ym,xm,Ai+ec,Ai+Jl,Ai+jl,Ai+Ql,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],gh=pm.concat([Xs,qs,"boxSizing","max"+ta,"max"+vm,"position",Ai,jt,jt+jl,jt+Jl,jt+ec,jt+Ql]),g1=function(e,t,n){ea(n);var r=e._gsap;if(r.spacerIsNative)ea(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},om=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=pm.length,o=t.style,a=e.style,l;s--;)l=pm[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[ym]=a[xm]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Xs]=yh(e,bn)+on,o[qs]=yh(e,Qt)+on,o[jt]=a[Ai]=a[Ey]=a[wy]="0",ea(r),a[Xs]=a["max"+ta]=n[Xs],a[qs]=a["max"+vm]=n[qs],a[jt]=n[jt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},_1=/([A-Z])/g,ea=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||Re.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(_1,"-$1").toLowerCase())}},uh=function(e){for(var t=gh.length,n=e.style,r=[],s=0;s<t;s++)r.push(gh[s],n[gh[s]]);return r.t=e,r},x1=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},_h={left:0,top:0},hy=function(e,t,n,r,s,o,a,l,c,u,h,d,f,g){En(e)&&(e=e(l)),fi(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?dh("0"+e.substr(3),n):0));var _=f?f.time():0,m,p,S;if(f&&f.seek(0),isNaN(e)||(e=+e),Yl(e))f&&(e=Re.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),a&&ph(a,n,r,!0);else{En(t)&&(t=t(l));var M=(e||"0").split(" "),x,b,w,T;S=kn(t,l)||gt,x=Sr(S)||{},(!x||!x.left&&!x.top)&&Ci(S).display==="none"&&(T=S.style.display,S.style.display="block",x=Sr(S),T?S.style.display=T:S.style.removeProperty("display")),b=dh(M[0],x[r.d]),w=dh(M[1]||"0",n),e=x[r.p]-c[r.p]-u+b+s-w,a&&ph(a,w,r,n-w<20||a._isStart&&w>20),n-=n-w}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var C=e+n,v=o._isStart;m="scroll"+r.d2,ph(o,C,r,v&&C>20||!v&&(h?Math.max(gt[m],di[m]):o.parentNode[m])<=C+1),h&&(c=Sr(a),h&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+on))}return f&&S&&(m=Sr(S),f.seek(d),p=Sr(S),f._caScrollDist=m[r.p]-p[r.p],e=e/f._caScrollDist*d),f&&f.seek(_),f?e:Math.round(e)},y1=/(webkit|moz|length|cssText|inset)/i,fy=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===gt){e._stOrig=s.cssText,a=Ci(e);for(o in a)!+o&&!y1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;Re.core.getCache(e).uncache=1,t.appendChild(e)}},Ly=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},hh=function(e,t,n){var r={};r[t.p]="+="+n,Re.set(e,r)},dy=function(e,t){var n=vr(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,h){var d=o.tween,f=l.onComplete,g={};c=c||n();var _=Ly(n,c,function(){d.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(c+u*d.ratio+h*d.ratio*d.ratio)},l.onUpdate=function(){ot.cache++,o.tween&&br()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=Re.to(e,l),d};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",n.wheelHandler),it.isTouch&&un(e,"touchmove",n.wheelHandler),s},it=(function(){function i(t,n){Jo||i.register(Re)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),um(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Xl){this.update=this.refresh=this.kill=er;return}n=oy(fi(n)||Yl(n)||n.nodeType?{trigger:n}:n,lh);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,d=s.trigger,f=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,S=s.onSnapComplete,M=s.once,x=s.snap,b=s.pinReparent,w=s.pinSpacer,T=s.containerAnimation,C=s.fastScrollEnd,v=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?bn:Qt,R=!h&&h!==0,D=kn(n.scroller||ct),U=Re.core.getCache(D),V=Zs(D),W=("pinType"in n?n.pinType:Mr(D,"pinType")||V&&"fixed")==="fixed",G=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],X=R&&n.toggleActions.split(" "),z="markers"in n?n.markers:lh.markers,te=V?0:parseFloat(Ci(D)["border"+y.p2+ta])||0,L=this,ce=n.onRefreshInit&&function(){return n.onRefreshInit(L)},De=c1(D,V,y),Ke=u1(D,V),He=0,Ae=0,Z=0,$=vr(D,y),se,Me,ye,Oe,$e,I,Ge,Ee,Te,N,je,J,he,Le,st,P,E,H,Q,j,K,ve,ae,Pe,pe,oe,de,ke,Ie,fe,qe,F,re,le,ge,ie,ee,we,ze;if(L._startClamp=L._endClamp=!1,L._dir=y,m*=45,L.scroller=D,L.scroll=T?T.time.bind(T):$,Oe=$(),L.vars=n,r=r||n.animation,"refreshPriority"in n&&(_y=1,n.refreshPriority===-9999&&(tc=L)),U.tweenScroll=U.tweenScroll||{top:dy(D,Qt),left:dy(D,bn)},L.tweenTo=se=U.tweenScroll[y.p],L.scrubDuration=function(me){re=Yl(me)&&me,re?F?F.duration(me):F=Re.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:re,paused:!0,onComplete:function(){return p&&p(L)}}):(F&&F.progress(1).kill(),F=0)},r&&(r.vars.lazy=!1,r._initted&&!L.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),L.animation=r.pause(),r.scrollTrigger=L,L.scrubDuration(h),fe=0,l||(l=r.vars.id)),x&&((!Gs(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in gt.style&&Re.set(V?[gt,di]:D,{scrollBehavior:"auto"}),ot.forEach(function(me){return En(me)&&me.target===(V?xt.scrollingElement||di:D)&&(me.smooth=!1)}),ye=En(x.snapTo)?x.snapTo:x.snapTo==="labels"?f1(r):x.snapTo==="labelsDirectional"?d1(r):x.directional!==!1?function(me,We){return Mm(x.snapTo)(me,wn()-Ae<500?0:We.direction)}:Re.utils.snap(x.snapTo),le=x.duration||{min:.1,max:2},le=Gs(le)?Kl(le.min,le.max):Kl(le,le),ge=Re.delayedCall(x.delay||re/2||.1,function(){var me=$(),We=wn()-Ae<500,Be=se.tween;if((We||Math.abs(L.getVelocity())<10)&&!Be&&!Mh&&He!==me){var Ze=(me-I)/Le,Yt=r&&!R?r.totalProgress():Ze,nt=We?0:(Yt-qe)/(wn()-Wl)*1e3||0,Lt=Re.utils.clamp(-Ze,1-Ze,Ko(nt/2)*nt/.185),Zt=Ze+(x.inertia===!1?0:Lt),Et,Mt,_t=x,ti=_t.onStart,At=_t.onInterrupt,In=_t.onComplete;if(Et=ye(Zt,L),Yl(Et)||(Et=Zt),Mt=Math.max(0,Math.round(I+Et*Le)),me<=Ge&&me>=I&&Mt!==me){if(Be&&!Be._initted&&Be.data<=Ko(Mt-me))return;x.inertia===!1&&(Lt=Et-Ze),se(Mt,{duration:le(Ko(Math.max(Ko(Zt-Yt),Ko(Et-Yt))*.185/nt/.05||0)),ease:x.ease||"power3",data:Ko(Mt-me),onInterrupt:function(){return ge.restart(!0)&&At&&Zo(L,At)},onComplete:function(){L.update(),He=$(),r&&!R&&(F?F.resetTo("totalProgress",Et,r._tTime/r._tDur):r.progress(Et)),fe=qe=r&&!R?r.totalProgress():L.progress,S&&S(L),In&&Zo(L,In)}},me,Lt*Le,Mt-me-Lt*Le),ti&&Zo(L,ti,se.tween)}}else L.isActive&&He!==me&&ge.restart(!0)}).pause()),l&&(fm[l]=L),d=L.trigger=kn(d||f!==!0&&f),ze=d&&d._gsap&&d._gsap.stRevert,ze&&(ze=ze(L)),f=f===!0?d:kn(f),fi(a)&&(a={targets:d,className:a}),f&&(g===!1||g===Ai||(g=!g&&f.parentNode&&f.parentNode.style&&Ci(f.parentNode).display==="flex"?!1:jt),L.pin=f,Me=Re.core.getCache(f),Me.spacer?st=Me.pinState:(w&&(w=kn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Me.spacerIsNative=!!w,w&&(Me.spacerState=uh(w))),Me.spacer=H=w||xt.createElement("div"),H.classList.add("pin-spacer"),l&&H.classList.add("pin-spacer-"+l),Me.pinState=st=uh(f)),n.force3D!==!1&&Re.set(f,{force3D:!0}),L.spacer=H=Me.spacer,Ie=Ci(f),Pe=Ie[g+y.os2],j=Re.getProperty(f),K=Re.quickSetter(f,y.a,on),om(f,H,Ie),E=uh(f)),z){J=Gs(z)?oy(z,ay):ay,N=ch("scroller-start",l,D,y,J,0),je=ch("scroller-end",l,D,y,J,0,N),Q=N["offset"+y.op.d2];var pt=kn(Mr(D,"content")||D);Ee=this.markerStart=ch("start",l,pt,y,J,Q,0,T),Te=this.markerEnd=ch("end",l,pt,y,J,Q,0,T),T&&(we=Re.quickSetter([Ee,Te],y.a,on)),!W&&!(Oi.length&&Mr(D,"fixedMarkers")===!0)&&(h1(V?gt:D),Re.set([N,je],{force3D:!0}),oe=Re.quickSetter(N,y.a,on),ke=Re.quickSetter(je,y.a,on))}if(T){var xe=T.vars.onUpdate,Fe=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){L.update(0,0,1),xe&&xe.apply(T,Fe||[])})}if(L.previous=function(){return at[at.indexOf(L)-1]},L.next=function(){return at[at.indexOf(L)+1]},L.revert=function(me,We){if(!We)return L.kill(!0);var Be=me!==!1||!L.enabled,Ze=Tn;Be!==L.isReverted&&(Be&&(ie=Math.max($(),L.scroll.rec||0),Z=L.progress,ee=r&&r.progress()),Ee&&[Ee,Te,N,je].forEach(function(Yt){return Yt.style.display=Be?"none":"block"}),Be&&(Tn=L,L.update(Be)),f&&(!b||!L.isActive)&&(Be?g1(f,H,st):om(f,H,Ci(f),pe)),Be||L.update(Be),Tn=Ze,L.isReverted=Be)},L.refresh=function(me,We,Be,Ze){if(!((Tn||!L.enabled)&&!We)){if(f&&me&&Ri){un(i,"scrollEnd",Cy);return}!Hn&&ce&&ce(L),Tn=L,se.tween&&!Be&&(se.tween.kill(),se.tween=0),F&&F.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(ut){return ut.vars.immediateRender&&ut.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var Yt=De(),nt=Ke(),Lt=T?T.duration():tr(D,y),Zt=Le<=.01||!Le,Et=0,Mt=Ze||0,_t=Gs(Be)?Be.end:n.end,ti=n.endTrigger||d,At=Gs(Be)?Be.start:n.start||(n.start===0||!d?0:f?"0 0":"0 100%"),In=L.pinnedContainer=n.pinnedContainer&&kn(n.pinnedContainer,L),yi=d&&Math.max(0,at.indexOf(L))||0,tn=yi,A,B,q,Y,k,ne,ue,Ce,Se,Ve,Ue,Ne,et;for(z&&Gs(Be)&&(Ne=Re.getProperty(N,y.p),et=Re.getProperty(je,y.p));tn-- >0;)ne=at[tn],ne.end||ne.refresh(0,1)||(Tn=L),ue=ne.pin,ue&&(ue===d||ue===f||ue===In)&&!ne.isReverted&&(Ve||(Ve=[]),Ve.unshift(ne),ne.revert(!0,!0)),ne!==at[tn]&&(yi--,tn--);for(En(At)&&(At=At(L)),At=ny(At,"start",L),I=hy(At,d,Yt,y,$(),Ee,N,L,nt,te,W,Lt,T,L._startClamp&&"_startClamp")||(f?-.001:0),En(_t)&&(_t=_t(L)),fi(_t)&&!_t.indexOf("+=")&&(~_t.indexOf(" ")?_t=(fi(At)?At.split(" ")[0]:"")+_t:(Et=dh(_t.substr(2),Yt),_t=fi(At)?At:(T?Re.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,I):I)+Et,ti=d)),_t=ny(_t,"end",L),Ge=Math.max(I,hy(_t||(ti?"100% 0":Lt),ti,Yt,y,$()+Et,Te,je,L,nt,te,W,Lt,T,L._endClamp&&"_endClamp"))||-.001,Et=0,tn=yi;tn--;)ne=at[tn]||{},ue=ne.pin,ue&&ne.start-ne._pinPush<=I&&!T&&ne.end>0&&(A=ne.end-(L._startClamp?Math.max(0,ne.start):ne.start),(ue===d&&ne.start-ne._pinPush<I||ue===In)&&isNaN(At)&&(Et+=A*(1-ne.progress)),ue===f&&(Mt+=A));if(I+=Et,Ge+=Et,L._startClamp&&(L._startClamp+=Et),L._endClamp&&!Hn&&(L._endClamp=Ge||-.001,Ge=Math.min(Ge,tr(D,y))),Le=Ge-I||(I-=.01)&&.001,Zt&&(Z=Re.utils.clamp(0,1,Re.utils.normalize(I,Ge,ie))),L._pinPush=Mt,Ee&&Et&&(A={},A[y.a]="+="+Et,In&&(A[y.p]="-="+$()),Re.set([Ee,Te],A)),f&&!(hm&&L.end>=tr(D,y)))A=Ci(f),Y=y===Qt,q=$(),ve=parseFloat(j(y.a))+Mt,!Lt&&Ge>1&&(Ue=(V?xt.scrollingElement||di:D).style,Ue={style:Ue,value:Ue["overflow"+y.a.toUpperCase()]},V&&Ci(gt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(Ue.style["overflow"+y.a.toUpperCase()]="scroll")),om(f,H,A),E=uh(f),B=Sr(f,!0),Ce=W&&vr(D,Y?bn:Qt)(),g?(pe=[g+y.os2,Le+Mt+on],pe.t=H,tn=g===jt?yh(f,y)+Le+Mt:0,tn&&(pe.push(y.d,tn+on),H.style.flexBasis!=="auto"&&(H.style.flexBasis=tn+on)),ea(pe),In&&at.forEach(function(ut){ut.pin===In&&ut.vars.pinSpacing!==!1&&(ut._subPinOffset=!0)}),W&&$(ie)):(tn=yh(f,y),tn&&H.style.flexBasis!=="auto"&&(H.style.flexBasis=tn+on)),W&&(k={top:B.top+(Y?q-I:Ce)+on,left:B.left+(Y?Ce:q-I)+on,boxSizing:"border-box",position:"fixed"},k[Xs]=k["max"+ta]=Math.ceil(B.width)+on,k[qs]=k["max"+vm]=Math.ceil(B.height)+on,k[Ai]=k[Ai+jl]=k[Ai+Jl]=k[Ai+ec]=k[Ai+Ql]="0",k[jt]=A[jt],k[jt+jl]=A[jt+jl],k[jt+Jl]=A[jt+Jl],k[jt+ec]=A[jt+ec],k[jt+Ql]=A[jt+Ql],P=x1(st,k,b),Hn&&$(0)),r?(Se=r._initted,nm(1),r.render(r.duration(),!0,!0),ae=j(y.a)-ve+Le+Mt,de=Math.abs(Le-ae)>1,W&&de&&P.splice(P.length-2,2),r.render(0,!0,!0),Se||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),nm(0)):ae=Le,Ue&&(Ue.value?Ue.style["overflow"+y.a.toUpperCase()]=Ue.value:Ue.style.removeProperty("overflow-"+y.a));else if(d&&$()&&!T)for(B=d.parentNode;B&&B!==gt;)B._pinOffset&&(I-=B._pinOffset,Ge-=B._pinOffset),B=B.parentNode;Ve&&Ve.forEach(function(ut){return ut.revert(!1,!0)}),L.start=I,L.end=Ge,Oe=$e=Hn?ie:$(),!T&&!Hn&&(Oe<ie&&$(ie),L.scroll.rec=0),L.revert(!1,!0),Ae=wn(),ge&&(He=-1,ge.restart(!0)),Tn=0,r&&R&&(r._initted||ee)&&r.progress()!==ee&&r.progress(ee||0,!0).render(r.time(),!0,!0),(Zt||Z!==L.progress||T||_||r&&!r._initted)&&(r&&!R&&(r._initted||Z||r.vars.immediateRender!==!1)&&r.totalProgress(T&&I<-.001&&!Z?Re.utils.normalize(I,Ge,0):Z,!0),L.progress=Zt||(Oe-I)/Le===Z?0:Z),f&&g&&(H._pinOffset=Math.round(L.progress*ae)),F&&F.invalidate(),isNaN(Ne)||(Ne-=Re.getProperty(N,y.p),et-=Re.getProperty(je,y.p),hh(N,y,Ne),hh(Ee,y,Ne-(Ze||0)),hh(je,y,et),hh(Te,y,et-(Ze||0))),Zt&&!Hn&&L.update(),u&&!Hn&&!he&&(he=!0,u(L),he=!1)}},L.getVelocity=function(){return($()-$e)/(wn()-Wl)*1e3||0},L.endAnimation=function(){Gl(L.callbackAnimation),r&&(F?F.progress(1):r.paused()?R||Gl(r,L.direction<0,1):Gl(r,r.reversed()))},L.labelToScroll=function(me){return r&&r.labels&&(I||L.refresh()||I)+r.labels[me]/r.duration()*Le||0},L.getTrailing=function(me){var We=at.indexOf(L),Be=L.direction>0?at.slice(0,We).reverse():at.slice(We+1);return(fi(me)?Be.filter(function(Ze){return Ze.vars.preventOverlaps===me}):Be).filter(function(Ze){return L.direction>0?Ze.end<=I:Ze.start>=Ge})},L.update=function(me,We,Be){if(!(T&&!Be&&!me)){var Ze=Hn===!0?ie:L.scroll(),Yt=me?0:(Ze-I)/Le,nt=Yt<0?0:Yt>1?1:Yt||0,Lt=L.progress,Zt,Et,Mt,_t,ti,At,In,yi;if(We&&($e=Oe,Oe=T?$():Ze,x&&(qe=fe,fe=r&&!R?r.totalProgress():nt)),m&&f&&!Tn&&!rh&&Ri&&(!nt&&I<Ze+(Ze-$e)/(wn()-Wl)*m?nt=1e-4:nt===1&&Ge>Ze+(Ze-$e)/(wn()-Wl)*m&&(nt=.9999)),nt!==Lt&&L.enabled){if(Zt=L.isActive=!!nt&&nt<1,Et=!!Lt&&Lt<1,At=Zt!==Et,ti=At||!!nt!=!!Lt,L.direction=nt>Lt?1:-1,L.progress=nt,ti&&!Tn&&(Mt=nt&&!Lt?0:nt===1?1:Lt===1?2:3,R&&(_t=!At&&X[Mt+1]!=="none"&&X[Mt+1]||X[Mt],yi=r&&(_t==="complete"||_t==="reset"||_t in r))),v&&(At||yi)&&(yi||h||!r)&&(En(v)?v(L):L.getTrailing(v).forEach(function(q){return q.endAnimation()})),R||(F&&!Tn&&!rh?(F._dp._time-F._start!==F._time&&F.render(F._dp._time-F._start),F.resetTo?F.resetTo("totalProgress",nt,r._tTime/r._tDur):(F.vars.totalProgress=nt,F.invalidate().restart())):r&&r.totalProgress(nt,!!(Tn&&(Ae||me)))),f){if(me&&g&&(H.style[g+y.os2]=Pe),!W)K(ql(ve+ae*nt));else if(ti){if(In=!me&&nt>Lt&&Ge+1>Ze&&Ze+1>=tr(D,y),b)if(!me&&(Zt||In)){var tn=Sr(f,!0),A=Ze-I;fy(f,gt,tn.top+(y===Qt?A:0)+on,tn.left+(y===Qt?0:A)+on)}else fy(f,H);ea(Zt||In?P:E),de&&nt<1&&Zt||K(ve+(nt===1&&!In?ae:0))}}x&&!se.tween&&!Tn&&!rh&&ge.restart(!0),a&&(At||M&&nt&&(nt<1||!im))&&nc(a.targets).forEach(function(q){return q.classList[Zt||M?"add":"remove"](a.className)}),o&&!R&&!me&&o(L),ti&&!Tn?(R&&(yi&&(_t==="complete"?r.pause().totalProgress(1):_t==="reset"?r.restart(!0).pause():_t==="restart"?r.restart(!0):r[_t]()),o&&o(L)),(At||!im)&&(c&&At&&Zo(L,c),G[Mt]&&Zo(L,G[Mt]),M&&(nt===1?L.kill(!1,1):G[Mt]=0),At||(Mt=nt===1?1:3,G[Mt]&&Zo(L,G[Mt]))),C&&!Zt&&Math.abs(L.getVelocity())>(Yl(C)?C:2500)&&(Gl(L.callbackAnimation),F?F.progress(1):Gl(r,_t==="reverse"?1:!nt,1))):R&&o&&!Tn&&o(L)}if(ke){var B=T?Ze/T.duration()*(T._caScrollDist||0):Ze;oe(B+(N._isFlipped?1:0)),ke(B)}we&&we(-Ze/T.duration()*(T._caScrollDist||0))}},L.enable=function(me,We){L.enabled||(L.enabled=!0,un(D,"resize",Zl),V||un(D,"scroll",$o),ce&&un(i,"refreshInit",ce),me!==!1&&(L.progress=Z=0,Oe=$e=He=$()),We!==!1&&L.refresh())},L.getTween=function(me){return me&&se?se.tween:F},L.setPositions=function(me,We,Be,Ze){if(T){var Yt=T.scrollTrigger,nt=T.duration(),Lt=Yt.end-Yt.start;me=Yt.start+Lt*me/nt,We=Yt.start+Lt*We/nt}L.refresh(!1,!1,{start:iy(me,Be&&!!L._startClamp),end:iy(We,Be&&!!L._endClamp)},Ze),L.update()},L.adjustPinSpacing=function(me){if(pe&&me){var We=pe.indexOf(y.d)+1;pe[We]=parseFloat(pe[We])+me+on,pe[1]=parseFloat(pe[1])+me+on,ea(pe)}},L.disable=function(me,We){if(me!==!1&&L.revert(!0,!0),L.enabled&&(L.enabled=L.isActive=!1,We||F&&F.pause(),ie=0,Me&&(Me.uncache=1),ce&&cn(i,"refreshInit",ce),ge&&(ge.pause(),se.tween&&se.tween.kill()&&(se.tween=0)),!V)){for(var Be=at.length;Be--;)if(at[Be].scroller===D&&at[Be]!==L)return;cn(D,"resize",Zl),V||cn(D,"scroll",$o)}},L.kill=function(me,We){L.disable(me,We),F&&!We&&F.kill(),l&&delete fm[l];var Be=at.indexOf(L);Be>=0&&at.splice(Be,1),Be===zn&&mh>0&&zn--,Be=0,at.forEach(function(Ze){return Ze.scroller===L.scroller&&(Be=1)}),Be||Hn||(L.scroll.rec=0),r&&(r.scrollTrigger=null,me&&r.revert({kill:!1}),We||r.kill()),Ee&&[Ee,Te,N,je].forEach(function(Ze){return Ze.parentNode&&Ze.parentNode.removeChild(Ze)}),tc===L&&(tc=0),f&&(Me&&(Me.uncache=1),Be=0,at.forEach(function(Ze){return Ze.pin===f&&Be++}),Be||(Me.spacer=0)),n.onKill&&n.onKill(L)},at.push(L),L.enable(!1,!1),ze&&ze(L),r&&r.add&&!Le){var Je=L.update;L.update=function(){L.update=Je,ot.cache++,I||Ge||L.refresh()},Re.delayedCall(.01,L.update),Le=.01,I=Ge=0}else L.refresh();f&&m1()},i.register=function(n){return Jo||(Re=n||Sy(),My()&&window.document&&i.enable(),Jo=Xl),Jo},i.defaults=function(n){if(n)for(var r in n)lh[r]=n[r];return lh},i.disable=function(n,r){Xl=0,at.forEach(function(o){return o[r?"kill":"disable"](n)}),cn(ct,"wheel",$o),cn(xt,"scroll",$o),clearInterval(ih),cn(xt,"touchcancel",er),cn(gt,"touchstart",er),oh(cn,xt,"pointerdown,touchstart,mousedown",ry),oh(cn,xt,"pointerup,touchend,mouseup",sy),xh.kill(),sh(cn);for(var s=0;s<ot.length;s+=3)ah(cn,ot[s],ot[s+1]),ah(cn,ot[s],ot[s+2])},i.enable=function(){if(ct=window,xt=document,di=xt.documentElement,gt=xt.body,Re){if(nc=Re.utils.toArray,Kl=Re.utils.clamp,um=Re.core.context||er,nm=Re.core.suppressOverwrites||er,gm=ct.history.scrollRestoration||"auto",dm=ct.pageYOffset||0,Re.core.globals("ScrollTrigger",i),gt){Xl=1,jo=document.createElement("div"),jo.style.height="100vh",jo.style.position="absolute",Dy(),l1(),qt.register(Re),i.isTouch=qt.isTouch,is=qt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),cm=qt.isTouch===1,un(ct,"wheel",$o),mm=[ct,xt,di,gt],Re.matchMedia?(i.matchMedia=function(u){var h=Re.matchMedia(),d;for(d in u)h.add(d,u[d]);return h},Re.addEventListener("matchMediaInit",function(){Py(),Sm()}),Re.addEventListener("matchMediaRevert",function(){return Ry()}),Re.addEventListener("matchMedia",function(){Ws(0,1),$s("matchMedia")}),Re.matchMedia().add("(orientation: portrait)",function(){return sm(),sm})):console.warn("Requires GSAP 3.11.0 or later"),sm(),un(xt,"scroll",$o);var n=gt.hasAttribute("style"),r=gt.style,s=r.borderTopStyle,o=Re.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Sr(gt),Qt.m=Math.round(a.top+Qt.sc())||0,bn.m=Math.round(a.left+bn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(gt.setAttribute("style",""),gt.removeAttribute("style")),ih=setInterval(ly,250),Re.delayedCall(.5,function(){return rh=0}),un(xt,"touchcancel",er),un(gt,"touchstart",er),oh(un,xt,"pointerdown,touchstart,mousedown",ry),oh(un,xt,"pointerup,touchend,mouseup",sy),lm=Re.utils.checkPrefix("transform"),gh.push(lm),Jo=wn(),xh=Re.delayedCall(.2,Ws).pause(),Qo=[xt,"visibilitychange",function(){var u=ct.innerWidth,h=ct.innerHeight;xt.hidden?(ey=u,ty=h):(ey!==u||ty!==h)&&Zl()},xt,"DOMContentLoaded",Ws,ct,"load",Ws,ct,"resize",Zl],sh(un),at.forEach(function(u){return u.enable(0,1)}),l=0;l<ot.length;l+=3)ah(cn,ot[l],ot[l+1]),ah(cn,ot[l],ot[l+2])}else if(xt){var c=function u(){i.enable(),xt.removeEventListener("DOMContentLoaded",u)};xt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(im=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(ih)||(ih=r)&&setInterval(ly,r),"ignoreMobileResize"in n&&(cm=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(sh(cn)||sh(un,n.autoRefreshEvents||"none"),xy=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=kn(n),o=ot.indexOf(s),a=Zs(s);~o&&ot.splice(o,a?6:2),r&&(a?Oi.unshift(ct,r,gt,r,di,r):Oi.unshift(s,r))},i.clearMatchMedia=function(n){at.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(fi(n)?kn(n):n).getBoundingClientRect(),a=o[s?Xs:qs]*r||0;return s?o.right-a>0&&o.left+a<ct.innerWidth:o.bottom-a>0&&o.top+a<ct.innerHeight},i.positionInViewport=function(n,r,s){fi(n)&&(n=kn(n));var o=n.getBoundingClientRect(),a=o[s?Xs:qs],l=r==null?a/2:r in vh?vh[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ct.innerWidth:(o.top+l)/ct.innerHeight},i.killAll=function(n){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Ks.killAll||[];Ks={},r.forEach(function(s){return s()})}},i})();it.version="3.15.0";it.saveStyles=function(i){return i?nc(i).forEach(function(e){if(e&&e.style){var t=hi.indexOf(e);t>=0&&hi.splice(t,5),hi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Re.core.getCache(e),um())}}):hi};it.revert=function(i,e){return Sm(!i,e)};it.create=function(i,e){return new it(i,e)};it.refresh=function(i){return i?Zl(!0):(Jo||it.register())&&Ws(!0)};it.update=function(i){return++ot.cache&&br(i===!0?2:0)};it.clearScrollMemory=Iy;it.maxScroll=function(i,e){return tr(i,e?bn:Qt)};it.getScrollFunc=function(i,e){return vr(kn(i),e?bn:Qt)};it.getById=function(i){return fm[i]};it.getAll=function(){return at.filter(function(i){return i.vars.id!=="ScrollSmoother"})};it.isScrolling=function(){return!!Ri};it.snapDirectional=Mm;it.addEventListener=function(i,e){var t=Ks[i]||(Ks[i]=[]);~t.indexOf(e)||t.push(e)};it.removeEventListener=function(i,e){var t=Ks[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};it.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],d=[],f=Re.delayedCall(r,function(){u(h,d),h=[],d=[]}).pause();return function(g){h.length||f.restart(!0),h.push(g.trigger),d.push(g),s<=h.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&En(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return En(s)&&(s=s(),un(it,"refresh",function(){return s=e.batchMax()})),nc(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(it.create(c))}),t};var py=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},am=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(qt.isTouch?" pinch-zoom":""):"none",e===di&&i(gt,t)},fh={auto:1,scroll:1},v1=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Re.core.getCache(s),a=wn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==gt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(fh[(l=Ci(s)).overflowY]||fh[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Zs(s)&&(fh[(l=Ci(s)).overflowY]||fh[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Fy=function(e,t,n,r){return qt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&v1,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&un(xt,qt.eventTypes[0],gy,!1,!0)},onDisable:function(){return cn(xt,qt.eventTypes[0],gy,!0)}})},M1=/(input|label|select|textarea)/i,my,gy=function(e){var t=M1.test(e.target.tagName);(t||my)&&(e._gsapAllow=!0,my=t)},S1=function(e){Gs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=kn(e.target)||di,u=Re.core.globals().ScrollSmoother,h=u&&u.get(),d=is&&(e.content&&kn(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),f=vr(c,Qt),g=vr(c,bn),_=1,m=(qt.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,p=0,S=En(r)?function(){return r(a)}:function(){return r||2.8},M,x,b=Fy(c,e.type,!0,s),w=function(){return x=!1},T=er,C=er,v=function(){l=tr(c,Qt),C=Kl(is?1:0,l),n&&(T=Kl(0,tr(c,bn))),M=Ys},y=function(){d._gsap.y=ql(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},R=function(){if(x){requestAnimationFrame(w);var z=ql(a.deltaY/2),te=C(f.v-z);if(d&&te!==f.v+f.offset){f.offset=te-f.v;var L=ql((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",d._gsap.y=L+"px",f.cacheID=ot.cache,br()}return!0}f.offset&&y(),x=!0},D,U,V,W,G=function(){v(),D.isActive()&&D.vars.scrollY>l&&(f()>l?D.progress(1)&&f(l):D.resetTo("scrollY",l))};return d&&Re.set(d,{y:"+=0"}),e.ignoreCheck=function(X){return is&&X.type==="touchmove"&&R(X)||_>1.05&&X.type!=="touchstart"||a.isGesturing||X.touches&&X.touches.length>1},e.onPress=function(){x=!1;var X=_;_=ql((ct.visualViewport&&ct.visualViewport.scale||1)/m),D.pause(),X!==_&&am(c,_>1.01?!0:n?!1:"x"),U=g(),V=f(),v(),M=Ys},e.onRelease=e.onGestureStart=function(X,z){if(f.offset&&y(),!z)W.restart(!0);else{ot.cache++;var te=S(),L,ce;n&&(L=g(),ce=L+te*.05*-X.velocityX/.227,te*=py(g,L,ce,tr(c,bn)),D.vars.scrollX=T(ce)),L=f(),ce=L+te*.05*-X.velocityY/.227,te*=py(f,L,ce,tr(c,Qt)),D.vars.scrollY=C(ce),D.invalidate().duration(te).play(.01),(is&&D.vars.scrollY>=l||L>=l-1)&&Re.to({},{onUpdate:G,duration:te})}o&&o(X)},e.onWheel=function(){D._ts&&D.pause(),wn()-p>1e3&&(M=0,p=wn())},e.onChange=function(X,z,te,L,ce){if(Ys!==M&&v(),z&&n&&g(T(L[2]===z?U+(X.startX-X.x):g()+z-L[1])),te){f.offset&&y();var De=ce[2]===te,Ke=De?V+X.startY-X.y:f()+te-ce[1],He=C(Ke);De&&Ke!==He&&(V+=He-Ke),f(He)}(te||z)&&br()},e.onEnable=function(){am(c,n?!1:"x"),it.addEventListener("refresh",G),un(ct,"resize",G),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=g.smooth=!1),b.enable()},e.onDisable=function(){am(c,!0),cn(ct,"resize",G),it.removeEventListener("refresh",G),b.kill()},e.lockAxis=e.lockAxis!==!1,a=new qt(e),a.iOS=is,is&&!f()&&f(1),is&&Re.ticker.add(er),W=a._dc,D=Re.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Ly(f,f(),function(){return D.pause()})},onUpdate:br,onComplete:W.vars.onComplete}),a};it.sort=function(i){if(En(i))return at.sort(i);var e=ct.pageYOffset||0;return it.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),at.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};it.observe=function(i){return new qt(i)};it.normalizeScroll=function(i){if(typeof i>"u")return Vn;if(i===!0&&Vn)return Vn.enable();if(i===!1){Vn&&Vn.kill(),Vn=i;return}var e=i instanceof qt?i:S1(i);return Vn&&Vn.target===e.target&&Vn.kill(),Zs(e.target)&&(Vn=e),e};it.core={_getVelocityProp:nh,_inputObserver:Fy,_scrollers:ot,_proxies:Oi,bridge:{ss:function(){Ri||$s("scrollStart"),Ri=wn()},ref:function(){return Tn}}};Sy()&&Re.registerPlugin(it);var ov=0,rg=1,av=2;var sg=1,lv=2,or=3,Pr=0,_n=1,ar=2,Fr=0,no=1,og=2,ag=3,lg=4,cv=5,fs=100,uv=101,hv=102,fv=103,dv=104,pv=200,mv=201,gv=202,_v=203,Xh=204,qh=205,xv=206,yv=207,vv=208,Mv=209,Sv=210,bv=211,Tv=212,wv=213,Ev=214,yf=0,vf=1,Mf=2,io=3,Sf=4,bf=5,Tf=6,wf=7,Ef=0,Av=1,Cv=2,Nr=0,Rv=1,Pv=2,Iv=3,Af=4,Dv=5,Lv=6,Fv=7;var cg=300,uo=301,ho=302,Cf=303,Rf=304,Oc=306,Yh=1e3,hs=1001,Zh=1002,Qn=1003,Nv=1004;var Bc=1005;var Gi=1006,Pf=1007;var _s=1008;var Xi=1009,ug=1010,hg=1011,Ca=1012,If=1013,xs=1014,qi=1015,Ra=1016,Df=1017,Lf=1018,Pa=1020,fg=35902,dg=35899,pg=1021,mg=1022,Li=1023,_a=1026,Ia=1027,Ff=1028,Nf=1029,gg=1030,Uf=1031;var Of=1033,kc=33776,Vc=33777,zc=33778,Hc=33779,Bf=35840,kf=35841,Vf=35842,zf=35843,Hf=36196,Gf=37492,Wf=37496,Xf=37808,qf=37809,Yf=37810,Zf=37811,Kf=37812,$f=37813,Jf=37814,Qf=37815,jf=37816,ed=37817,td=37818,nd=37819,id=37820,rd=37821,sd=36492,od=36494,ad=36495,ld=36283,cd=36284,ud=36285,hd=36286;var dc=2300,Kh=2301,Wh=2302,Km=2400,$m=2401,Jm=2402;var Uv=3200,Ov=3201;var fd=0,Bv=1,Ur="",gi="srgb",ro="srgb-linear",pc="linear",vt="srgb";var to=7680;var Qm=519,kv=512,Vv=513,zv=514,_g=515,Hv=516,Gv=517,Wv=518,Xv=519,jm=35044;var xg="300 es",zi=2e3,mc=2001;var Ir=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ny=1234567,hc=Math.PI/180,xa=180/Math.PI;function Da(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(An[i&255]+An[i>>8&255]+An[i>>16&255]+An[i>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[t&63|128]+An[t>>8&255]+"-"+An[t>>16&255]+An[t>>24&255]+An[n&255]+An[n>>8&255]+An[n>>16&255]+An[n>>24&255]).toLowerCase()}function lt(i,e,t){return Math.max(e,Math.min(t,i))}function yg(i,e){return(i%e+e)%e}function b1(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function T1(i,e,t){return i!==e?(t-i)/(e-i):0}function fc(i,e,t){return(1-t)*i+t*e}function w1(i,e,t,n){return fc(i,e,1-Math.exp(-t*n))}function E1(i,e=1){return e-Math.abs(yg(i,e*2)-e)}function A1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function C1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function R1(i,e){return i+Math.floor(Math.random()*(e-i+1))}function P1(i,e){return i+Math.random()*(e-i)}function I1(i){return i*(.5-Math.random())}function D1(i){i!==void 0&&(Ny=i);let e=Ny+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function L1(i){return i*hc}function F1(i){return i*xa}function N1(i){return(i&i-1)===0&&i!==0}function U1(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function O1(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function B1(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ma(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var fo={DEG2RAD:hc,RAD2DEG:xa,generateUUID:Da,clamp:lt,euclideanModulo:yg,mapLinear:b1,inverseLerp:T1,lerp:fc,damp:w1,pingpong:E1,smoothstep:A1,smootherstep:C1,randInt:R1,randFloat:P1,randFloatSpread:I1,seededRandom:D1,degToRad:L1,radToDeg:F1,isPowerOfTwo:N1,ceilPowerOfTwo:U1,floorPowerOfTwo:O1,setQuaternionFromProperEuler:B1,normalize:Gn,denormalize:ma},tt=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dr=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==g){let m=1-a,p=l*d+c*f+u*g+h*_,S=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){let b=Math.sqrt(M),w=Math.atan2(b,p*S);m=Math.sin(m*w)/b,a=Math.sin(a*w)/b}let x=a*S;if(l=l*m+d*x,c=c*m+f*x,u=u*m+g*x,h=h*m+_*x,m===1-a){let b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-a*f,e[t+2]=c*g+u*f+a*d-l*h,e[t+3]=u*g-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),d=l(n/2),f=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Uy.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Uy.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bm.copy(this).projectOnVector(e),this.sub(bm)}reflect(e){return this.sub(bm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bm=new O,Uy=new Dr,Qe=class i{constructor(e,t,n,r,s,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],S=r[1],M=r[4],x=r[7],b=r[2],w=r[5],T=r[8];return s[0]=o*_+a*S+l*b,s[3]=o*m+a*M+l*w,s[6]=o*p+a*x+l*T,s[1]=c*_+u*S+h*b,s[4]=c*m+u*M+h*w,s[7]=c*p+u*x+h*T,s[2]=d*_+f*S+g*b,s[5]=d*m+f*M+g*w,s[8]=d*p+f*x+g*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,g=t*h+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(r*c-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Tm.makeScale(e,t)),this}rotate(e){return this.premultiply(Tm.makeRotation(-e)),this}translate(e,t){return this.premultiply(Tm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Tm=new Qe;function vg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function gc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qv(){let i=gc("canvas");return i.style.display="block",i}var Oy={};function ya(i){i in Oy||(Oy[i]=!0,console.warn(i))}function Yv(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var By=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ky=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function k1(){let i={enabled:!0,workingColorSpace:ro,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===vt&&(r.r=Rr(r.r),r.g=Rr(r.g),r.b=Rr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(r.r=ga(r.r),r.g=ga(r.g),r.b=ga(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ur?pc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ya("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ya("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ro]:{primaries:e,whitePoint:n,transfer:pc,toXYZ:By,fromXYZ:ky,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gi},outputColorSpaceConfig:{drawingBufferColorSpace:gi}},[gi]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:By,fromXYZ:ky,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gi}}}),i}var dt=k1();function Rr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ga(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var na,$h=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{na===void 0&&(na=gc("canvas")),na.width=e.width,na.height=e.height;let r=na.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=na}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=gc("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Rr(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rr(t[n]/255)*255):t[n]=Rr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},V1=0,va=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:V1++}),this.uuid=Da(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(wm(r[o].image)):s.push(wm(r[o]))}else s=wm(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function wm(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$h.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var z1=0,Em=new O,jn=class i extends Ir{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=hs,r=hs,s=Gi,o=_s,a=Li,l=Xi,c=i.DEFAULT_ANISOTROPY,u=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z1++}),this.uuid=Da(),this.name="",this.source=new va(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Em).x}get height(){return this.source.getSize(Em).y}get depth(){return this.source.getSize(Em).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yh:e.x=e.x-Math.floor(e.x);break;case hs:e.x=e.x<0?0:1;break;case Zh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yh:e.y=e.y-Math.floor(e.y);break;case hs:e.y=e.y<0?0:1;break;case Zh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=cg;jn.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,x=(f+1)/2,b=(p+1)/2,w=(u+d)/4,T=(h+_)/4,C=(g+m)/4;return M>x&&M>b?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=w/n,s=T/n):x>b?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=w/r,s=C/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=T/s,r=C/s),this.set(n,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(d-u)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jh=class extends Ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new jn(r);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Gi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new va(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ii=class extends Jh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_c=class extends jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qh=class extends jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ir=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sh.copy(n.boundingBox)),Sh.applyMatrix4(e.matrixWorld),this.union(Sh)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rc),bh.subVectors(this.max,rc),ia.subVectors(e.a,rc),ra.subVectors(e.b,rc),sa.subVectors(e.c,rc),rs.subVectors(ra,ia),ss.subVectors(sa,ra),Js.subVectors(ia,sa);let t=[0,-rs.z,rs.y,0,-ss.z,ss.y,0,-Js.z,Js.y,rs.z,0,-rs.x,ss.z,0,-ss.x,Js.z,0,-Js.x,-rs.y,rs.x,0,-ss.y,ss.x,0,-Js.y,Js.x,0];return!Am(t,ia,ra,sa,bh)||(t=[1,0,0,0,1,0,0,0,1],!Am(t,ia,ra,sa,bh))?!1:(Th.crossVectors(rs,ss),t=[Th.x,Th.y,Th.z],Am(t,ia,ra,sa,bh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Tr=[new O,new O,new O,new O,new O,new O,new O,new O],Bi=new O,Sh=new ir,ia=new O,ra=new O,sa=new O,rs=new O,ss=new O,Js=new O,rc=new O,bh=new O,Th=new O,Qs=new O;function Am(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Qs.fromArray(i,s);let a=r.x*Math.abs(Qs.x)+r.y*Math.abs(Qs.y)+r.z*Math.abs(Qs.z),l=e.dot(Qs),c=t.dot(Qs),u=n.dot(Qs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var H1=new ir,sc=new O,Cm=new O,Lr=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):H1.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sc.subVectors(e,this.center);let t=sc.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(sc,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sc.copy(e.center).add(Cm)),this.expandByPoint(sc.copy(e.center).sub(Cm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wr=new O,Rm=new O,wh=new O,os=new O,Pm=new O,Eh=new O,Im=new O,xc=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=wr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wr.copy(this.origin).addScaledVector(this.direction,t),wr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rm.copy(e).add(t).multiplyScalar(.5),wh.copy(t).sub(e).normalize(),os.copy(this.origin).sub(Rm);let s=e.distanceTo(t)*.5,o=-this.direction.dot(wh),a=os.dot(this.direction),l=-os.dot(wh),c=os.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*l-a,d=o*a-l,g=s*u,h>=0)if(d>=-g)if(d<=g){let _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Rm).addScaledVector(wh,d),f}intersectSphere(e,t){wr.subVectors(e.center,this.origin);let n=wr.dot(this.direction),r=wr.dot(wr)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,wr)!==null}intersectTriangle(e,t,n,r,s){Pm.subVectors(t,e),Eh.subVectors(n,e),Im.crossVectors(Pm,Eh);let o=this.direction.dot(Im),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;os.subVectors(this.origin,e);let l=a*this.direction.dot(Eh.crossVectors(os,Eh));if(l<0)return null;let c=a*this.direction.dot(Pm.cross(os));if(c<0||l+c>o)return null;let u=-a*os.dot(Im);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wt=class i{constructor(e,t,n,r,s,o,a,l,c,u,h,d,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,h,d,f,g,_,m)}set(e,t,n,r,s,o,a,l,c,u,h,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/oa.setFromMatrixColumn(e,0).length(),s=1/oa.setFromMatrixColumn(e,1).length(),o=1/oa.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=o*u,f=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d-_*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,f=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G1,e,W1)}lookAt(e,t,n){let r=this.elements;return pi.subVectors(e,t),pi.lengthSq()===0&&(pi.z=1),pi.normalize(),as.crossVectors(n,pi),as.lengthSq()===0&&(Math.abs(n.z)===1?pi.x+=1e-4:pi.z+=1e-4,pi.normalize(),as.crossVectors(n,pi)),as.normalize(),Ah.crossVectors(pi,as),r[0]=as.x,r[4]=Ah.x,r[8]=pi.x,r[1]=as.y,r[5]=Ah.y,r[9]=pi.y,r[2]=as.z,r[6]=Ah.z,r[10]=pi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],M=n[7],x=n[11],b=n[15],w=r[0],T=r[4],C=r[8],v=r[12],y=r[1],R=r[5],D=r[9],U=r[13],V=r[2],W=r[6],G=r[10],X=r[14],z=r[3],te=r[7],L=r[11],ce=r[15];return s[0]=o*w+a*y+l*V+c*z,s[4]=o*T+a*R+l*W+c*te,s[8]=o*C+a*D+l*G+c*L,s[12]=o*v+a*U+l*X+c*ce,s[1]=u*w+h*y+d*V+f*z,s[5]=u*T+h*R+d*W+f*te,s[9]=u*C+h*D+d*G+f*L,s[13]=u*v+h*U+d*X+f*ce,s[2]=g*w+_*y+m*V+p*z,s[6]=g*T+_*R+m*W+p*te,s[10]=g*C+_*D+m*G+p*L,s[14]=g*v+_*U+m*X+p*ce,s[3]=S*w+M*y+x*V+b*z,s[7]=S*T+M*R+x*W+b*te,s[11]=S*C+M*D+x*G+b*L,s[15]=S*v+M*U+x*X+b*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*h-r*c*h-s*a*d+n*c*d+r*a*f-n*l*f)+_*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*u-s*l*u)+m*(+t*c*h-t*a*f-s*o*h+n*o*f+s*a*u-n*c*u)+p*(-r*a*u-t*l*h+t*a*d+r*o*h-n*o*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=h*m*c-_*d*c+_*l*f-a*m*f-h*l*p+a*d*p,M=g*d*c-u*m*c-g*l*f+o*m*f+u*l*p-o*d*p,x=u*_*c-g*h*c+g*a*f-o*_*f-u*a*p+o*h*p,b=g*h*l-u*_*l-g*a*d+o*_*d+u*a*m-o*h*m,w=t*S+n*M+r*x+s*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return e[0]=S*T,e[1]=(_*d*s-h*m*s-_*r*f+n*m*f+h*r*p-n*d*p)*T,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*T,e[3]=(h*l*s-a*d*s-h*r*c+n*d*c+a*r*f-n*l*f)*T,e[4]=M*T,e[5]=(u*m*s-g*d*s+g*r*f-t*m*f-u*r*p+t*d*p)*T,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*T,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*f+t*l*f)*T,e[8]=x*T,e[9]=(g*h*s-u*_*s-g*n*f+t*_*f+u*n*p-t*h*p)*T,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*T,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*f-t*a*f)*T,e[12]=b*T,e[13]=(u*_*r-g*h*r+g*n*d-t*_*d-u*n*m+t*h*m)*T,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*T,e[15]=(o*h*r-u*a*r+u*n*l-t*h*l-o*n*d+t*a*d)*T,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,g=s*h,_=o*u,m=o*h,p=a*h,S=l*c,M=l*u,x=l*h,b=n.x,w=n.y,T=n.z;return r[0]=(1-(_+p))*b,r[1]=(f+x)*b,r[2]=(g-M)*b,r[3]=0,r[4]=(f-x)*w,r[5]=(1-(d+p))*w,r[6]=(m+S)*w,r[7]=0,r[8]=(g+M)*T,r[9]=(m-S)*T,r[10]=(1-(d+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=oa.set(r[0],r[1],r[2]).length(),o=oa.set(r[4],r[5],r[6]).length(),a=oa.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ki.copy(this);let c=1/s,u=1/o,h=1/a;return ki.elements[0]*=c,ki.elements[1]*=c,ki.elements[2]*=c,ki.elements[4]*=u,ki.elements[5]*=u,ki.elements[6]*=u,ki.elements[8]*=h,ki.elements[9]*=h,ki.elements[10]*=h,t.setFromRotationMatrix(ki),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=zi,l=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===zi)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===mc)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=zi,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===zi)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===mc)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},oa=new O,ki=new wt,G1=new O(0,0,0),W1=new O(1,1,1),as=new O,Ah=new O,pi=new O,Vy=new wt,zy=new Dr,Di=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vy.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vy,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zy.setFromEuler(this),this.setFromQuaternion(zy,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Di.DEFAULT_ORDER="XYZ";var yc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},X1=0,Hy=new O,aa=new Dr,Er=new wt,Ch=new O,oc=new O,q1=new O,Y1=new Dr,Gy=new O(1,0,0),Wy=new O(0,1,0),Xy=new O(0,0,1),qy={type:"added"},Z1={type:"removed"},la={type:"childadded",child:null},Dm={type:"childremoved",child:null},$t=class i extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:X1++}),this.uuid=Da(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new Di,n=new Dr,r=new O(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new Qe}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return aa.setFromAxisAngle(e,t),this.quaternion.multiply(aa),this}rotateOnWorldAxis(e,t){return aa.setFromAxisAngle(e,t),this.quaternion.premultiply(aa),this}rotateX(e){return this.rotateOnAxis(Gy,e)}rotateY(e){return this.rotateOnAxis(Wy,e)}rotateZ(e){return this.rotateOnAxis(Xy,e)}translateOnAxis(e,t){return Hy.copy(e).applyQuaternion(this.quaternion),this.position.add(Hy.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gy,e)}translateY(e){return this.translateOnAxis(Wy,e)}translateZ(e){return this.translateOnAxis(Xy,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Er.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ch.copy(e):Ch.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),oc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Er.lookAt(oc,Ch,this.up):Er.lookAt(Ch,oc,this.up),this.quaternion.setFromRotationMatrix(Er),r&&(Er.extractRotation(r.matrixWorld),aa.setFromRotationMatrix(Er),this.quaternion.premultiply(aa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qy),la.child=e,this.dispatchEvent(la),la.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Z1),Dm.child=e,this.dispatchEvent(Dm),Dm.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Er.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Er.multiply(e.parent.matrixWorld)),e.applyMatrix4(Er),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qy),la.child=e,this.dispatchEvent(la),la.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oc,e,q1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oc,Y1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};$t.DEFAULT_UP=new O(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vi=new O,Ar=new O,Lm=new O,Cr=new O,ca=new O,ua=new O,Yy=new O,Fm=new O,Nm=new O,Um=new O,Om=new yt,Bm=new yt,km=new yt,us=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Vi.subVectors(e,t),r.cross(Vi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Vi.subVectors(r,t),Ar.subVectors(n,t),Lm.subVectors(e,t);let o=Vi.dot(Vi),a=Vi.dot(Ar),l=Vi.dot(Lm),c=Ar.dot(Ar),u=Ar.dot(Lm),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Cr)===null?!1:Cr.x>=0&&Cr.y>=0&&Cr.x+Cr.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Cr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Cr.x),l.addScaledVector(o,Cr.y),l.addScaledVector(a,Cr.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return Om.setScalar(0),Bm.setScalar(0),km.setScalar(0),Om.fromBufferAttribute(e,t),Bm.fromBufferAttribute(e,n),km.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Om,s.x),o.addScaledVector(Bm,s.y),o.addScaledVector(km,s.z),o}static isFrontFacing(e,t,n,r){return Vi.subVectors(n,t),Ar.subVectors(e,t),Vi.cross(Ar).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vi.subVectors(this.c,this.b),Ar.subVectors(this.a,this.b),Vi.cross(Ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;ca.subVectors(r,n),ua.subVectors(s,n),Fm.subVectors(e,n);let l=ca.dot(Fm),c=ua.dot(Fm);if(l<=0&&c<=0)return t.copy(n);Nm.subVectors(e,r);let u=ca.dot(Nm),h=ua.dot(Nm);if(u>=0&&h<=u)return t.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(ca,o);Um.subVectors(e,s);let f=ca.dot(Um),g=ua.dot(Um);if(g>=0&&f<=g)return t.copy(s);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ua,a);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Yy.subVectors(s,r),a=(h-u)/(h-u+(f-g)),t.copy(r).addScaledVector(Yy,a);let p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ca,o).addScaledVector(ua,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},Rh={h:0,s:0,l:0};function Vm(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=dt.workingColorSpace){if(e=yg(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Vm(o,s,e+1/3),this.g=Vm(o,s,e),this.b=Vm(o,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=gi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gi){let n=Zv[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}copyLinearToSRGB(e){return this.r=ga(e.r),this.g=ga(e.g),this.b=ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gi){return dt.workingToColorSpace(Cn.copy(this),e),Math.round(lt(Cn.r*255,0,255))*65536+Math.round(lt(Cn.g*255,0,255))*256+Math.round(lt(Cn.b*255,0,255))}getHexString(e=gi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(Cn.copy(this),t);let n=Cn.r,r=Cn.g,s=Cn.b,o=Math.max(n,r,s),a=Math.min(n,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(Cn.copy(this),t),e.r=Cn.r,e.g=Cn.g,e.b=Cn.b,e}getStyle(e=gi){dt.workingToColorSpace(Cn.copy(this),e);let t=Cn.r,n=Cn.g,r=Cn.b;return e!==gi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ls),this.setHSL(ls.h+e,ls.s+t,ls.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ls),e.getHSL(Rh);let n=fc(ls.h,Rh.h,t),r=fc(ls.s,Rh.s,t),s=fc(ls.l,Rh.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Cn=new Ye;Ye.NAMES=Zv;var K1=0,rr=class extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:K1++}),this.uuid=Da(),this.name="",this.type="Material",this.blending=no,this.side=Pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xh,this.blendDst=qh,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=to,this.stencilZFail=to,this.stencilZPass=to,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(n.blending=this.blending),this.side!==Pr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xh&&(n.blendSrc=this.blendSrc),this.blendDst!==qh&&(n.blendDst=this.blendDst),this.blendEquation!==fs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==io&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==to&&(n.stencilFail=this.stencilFail),this.stencilZFail!==to&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==to&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},vc=class extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=Ef,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var en=new O,Ph=new tt,$1=0,gn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jm,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ph.fromBufferAttribute(this,t),Ph.applyMatrix3(e),this.setXY(t,Ph.x,Ph.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ma(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ma(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ma(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ma(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ma(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gn(t,this.array),n=Gn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Gn(t,this.array),n=Gn(n,this.array),r=Gn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Gn(t,this.array),n=Gn(n,this.array),r=Gn(r,this.array),s=Gn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jm&&(e.usage=this.usage),e}};var Mc=class extends gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Sc=class extends gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Dt=class extends gn{constructor(e,t,n){super(new Float32Array(e),t,n)}},J1=0,Pi=new wt,zm=new $t,ha=new O,mi=new ir,ac=new ir,hn=new O,Rn=class i extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J1++}),this.uuid=Da(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vg(e)?Sc:Mc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pi.makeRotationFromQuaternion(e),this.applyMatrix4(Pi),this}rotateX(e){return Pi.makeRotationX(e),this.applyMatrix4(Pi),this}rotateY(e){return Pi.makeRotationY(e),this.applyMatrix4(Pi),this}rotateZ(e){return Pi.makeRotationZ(e),this.applyMatrix4(Pi),this}translate(e,t,n){return Pi.makeTranslation(e,t,n),this.applyMatrix4(Pi),this}scale(e,t,n){return Pi.makeScale(e,t,n),this.applyMatrix4(Pi),this}lookAt(e){return zm.lookAt(e),zm.updateMatrix(),this.applyMatrix4(zm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ha).negate(),this.translate(ha.x,ha.y,ha.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Dt(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ir);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];mi.setFromBufferAttribute(s),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(mi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ac.setFromBufferAttribute(a),this.morphTargetsRelative?(hn.addVectors(mi.min,ac.min),mi.expandByPoint(hn),hn.addVectors(mi.max,ac.max),mi.expandByPoint(hn)):(mi.expandByPoint(ac.min),mi.expandByPoint(ac.max))}mi.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)hn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(hn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)hn.fromBufferAttribute(a,c),l&&(ha.fromBufferAttribute(e,c),hn.add(ha)),r=Math.max(r,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new O,l[C]=new O;let c=new O,u=new O,h=new O,d=new tt,f=new tt,g=new tt,_=new O,m=new O;function p(C,v,y){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,v),h.fromBufferAttribute(n,y),d.fromBufferAttribute(s,C),f.fromBufferAttribute(s,v),g.fromBufferAttribute(s,y),u.sub(c),h.sub(c),f.sub(d),g.sub(d);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(R),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(R),a[C].add(_),a[v].add(_),a[y].add(_),l[C].add(m),l[v].add(m),l[y].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let C=0,v=S.length;C<v;++C){let y=S[C],R=y.start,D=y.count;for(let U=R,V=R+D;U<V;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let M=new O,x=new O,b=new O,w=new O;function T(C){b.fromBufferAttribute(r,C),w.copy(b);let v=a[C];M.copy(v),M.sub(b.multiplyScalar(b.dot(v))).normalize(),x.crossVectors(w,v);let R=x.dot(l[C])<0?-1:1;o.setXYZW(C,M.x,M.y,M.z,R)}for(let C=0,v=S.length;C<v;++C){let y=S[C],R=y.start,D=y.count;for(let U=R,V=R+D;U<V;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new O,s=new O,o=new O,a=new O,l=new O,c=new O,u=new O,h=new O;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new gn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zy=new wt,js=new xc,Ih=new Lr,Ky=new O,Dh=new O,Lh=new O,Fh=new O,Hm=new O,Nh=new O,$y=new O,Uh=new O,ft=class extends $t{constructor(e=new Rn,t=new vc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Nh.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],h=s[l];u!==0&&(Hm.fromBufferAttribute(h,e),o?Nh.addScaledVector(Hm,u):Nh.addScaledVector(Hm.sub(t),u))}t.add(Nh)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ih.copy(n.boundingSphere),Ih.applyMatrix4(s),js.copy(e.ray).recast(e.near),!(Ih.containsPoint(js.origin)===!1&&(js.intersectSphere(Ih,Ky)===null||js.origin.distanceToSquared(Ky)>(e.far-e.near)**2))&&(Zy.copy(s).invert(),js.copy(e.ray).applyMatrix4(Zy),!(n.boundingBox!==null&&js.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,js)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,b=M;x<b;x+=3){let w=a.getX(x),T=a.getX(x+1),C=a.getX(x+2);r=Oh(this,p,e,n,c,u,h,w,T,C),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=a.getX(m),M=a.getX(m+1),x=a.getX(m+2);r=Oh(this,o,e,n,c,u,h,S,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,b=M;x<b;x+=3){let w=x,T=x+1,C=x+2;r=Oh(this,p,e,n,c,u,h,w,T,C),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=m,M=m+1,x=m+2;r=Oh(this,o,e,n,c,u,h,S,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Q1(i,e,t,n,r,s,o,a){let l;if(e.side===_n?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===Pr,a),l===null)return null;Uh.copy(a),Uh.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Uh);return c<t.near||c>t.far?null:{distance:c,point:Uh.clone(),object:i}}function Oh(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Dh),i.getVertexPosition(l,Lh),i.getVertexPosition(c,Fh);let u=Q1(i,e,t,n,Dh,Lh,Fh,$y);if(u){let h=new O;us.getBarycoord($y,Dh,Lh,Fh,h),r&&(u.uv=us.getInterpolatedAttribute(r,a,l,c,h,new tt)),s&&(u.uv1=us.getInterpolatedAttribute(s,a,l,c,h,new tt)),o&&(u.normal=us.getInterpolatedAttribute(o,a,l,c,h,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new O,materialIndex:0};us.getNormal(Dh,Lh,Fh,d.normal),u.face=d,u.barycoord=h}return u}var sr=class i extends Rn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(h,2));function g(_,m,p,S,M,x,b,w,T,C,v){let y=x/T,R=b/C,D=x/2,U=b/2,V=w/2,W=T+1,G=C+1,X=0,z=0,te=new O;for(let L=0;L<G;L++){let ce=L*R-U;for(let De=0;De<W;De++){let Ke=De*y-D;te[_]=Ke*S,te[m]=ce*M,te[p]=V,c.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[p]=w>0?1:-1,u.push(te.x,te.y,te.z),h.push(De/T),h.push(1-L/C),X+=1}}for(let L=0;L<C;L++)for(let ce=0;ce<T;ce++){let De=d+ce+W*L,Ke=d+ce+W*(L+1),He=d+(ce+1)+W*(L+1),Ae=d+(ce+1)+W*L;l.push(De,Ke,Ae),l.push(Ke,He,Ae),z+=6}a.addGroup(f,z,v),f+=z,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function po(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pn(i){let e={};for(let t=0;t<i.length;t++){let n=po(i[t]);for(let r in n)e[r]=n[r]}return e}function j1(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Mg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var Kv={clone:po,merge:Pn},ew=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ei=class extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ew,this.fragmentShader=tw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=po(e.uniforms),this.uniformsGroups=j1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},bc=class extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},cs=new O,Jy=new tt,Qy=new tt,mn=class extends bc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=xa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(hc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xa*2*Math.atan(Math.tan(hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){cs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(cs.x,cs.y).multiplyScalar(-e/cs.z),cs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cs.x,cs.y).multiplyScalar(-e/cs.z)}getViewSize(e,t){return this.getViewBounds(e,Jy,Qy),t.subVectors(Qy,Jy)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(hc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},fa=-90,da=1,jh=class extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new mn(fa,da,e,t);r.layers=this.layers,this.add(r);let s=new mn(fa,da,e,t);s.layers=this.layers,this.add(s);let o=new mn(fa,da,e,t);o.layers=this.layers,this.add(o);let a=new mn(fa,da,e,t);a.layers=this.layers,this.add(a);let l=new mn(fa,da,e,t);l.layers=this.layers,this.add(l);let c=new mn(fa,da,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===zi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===mc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Tc=class extends jn{constructor(e=[],t=uo,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ef=class extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Tc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new sr(5,5,5),s=new ei({name:"CubemapFromEquirect",uniforms:po(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:Fr});s.uniforms.tEquirect.value=t;let o=new ft(r,s),a=t.minFilter;return t.minFilter===_s&&(t.minFilter=Gi),new jh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},Hi=class extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}},nw={type:"move"},Ma=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(nw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Hi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wc=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ds=class extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var tf=class extends jn{constructor(e=null,t=1,n=1,r,s,o,a,l,c=Qn,u=Qn,h,d){super(null,o,a,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ec=class extends gn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},pa=new wt,jy=new wt,Bh=[],ev=new ir,iw=new wt,lc=new ft,cc=new Lr,so=class extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ec(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,iw)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ir),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,pa),ev.copy(e.boundingBox).applyMatrix4(pa),this.boundingBox.union(ev)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,pa),cc.copy(e.boundingSphere).applyMatrix4(pa),this.boundingSphere.union(cc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(lc.geometry=this.geometry,lc.material=this.material,lc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cc.copy(this.boundingSphere),cc.applyMatrix4(n),e.ray.intersectsSphere(cc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pa),jy.multiplyMatrices(n,pa),lc.matrixWorld=jy,lc.raycast(e,Bh);for(let o=0,a=Bh.length;o<a;o++){let l=Bh[o];l.instanceId=s,l.object=this,t.push(l)}Bh.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ec(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new tf(new Float32Array(r*this.count),r,this.count,Ff,qi));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gm=new O,rw=new O,sw=new Qe,nr=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Gm.subVectors(n,t).cross(rw.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Gm),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sw.getNormalMatrix(e),r=this.coplanarPoint(Gm).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},eo=new Lr,ow=new tt(.5,.5),kh=new O,Sa=class{constructor(e=new nr,t=new nr,n=new nr,r=new nr,s=new nr,o=new nr){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zi,n=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],S=s[12],M=s[13],x=s[14],b=s[15];if(r[0].setComponents(c-o,f-u,p-g,b-S).normalize(),r[1].setComponents(c+o,f+u,p+g,b+S).normalize(),r[2].setComponents(c+a,f+h,p+_,b+M).normalize(),r[3].setComponents(c-a,f-h,p-_,b-M).normalize(),n)r[4].setComponents(l,d,m,x).normalize(),r[5].setComponents(c-l,f-d,p-m,b-x).normalize();else if(r[4].setComponents(c-l,f-d,p-m,b-x).normalize(),t===zi)r[5].setComponents(c+l,f+d,p+m,b+x).normalize();else if(t===mc)r[5].setComponents(l,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),eo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),eo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(eo)}intersectsSprite(e){eo.center.set(0,0,0);let t=ow.distanceTo(e.center);return eo.radius=.7071067811865476+t,eo.applyMatrix4(e.matrixWorld),this.intersectsSphere(eo)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(kh.x=r.normal.x>0?e.max.x:e.min.x,kh.y=r.normal.y>0?e.max.y:e.min.y,kh.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(kh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var nf=class extends rr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},tv=new wt,eg=new xc,Vh=new Lr,zh=new O,Ac=class extends $t{constructor(e=new Rn,t=new nf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vh.copy(n.boundingSphere),Vh.applyMatrix4(r),Vh.radius+=s,e.ray.intersectsSphere(Vh)===!1)return;tv.copy(r).invert(),eg.copy(e.ray).applyMatrix4(tv);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){let m=c.getX(g);zh.fromBufferAttribute(h,m),nv(zh,m,l,r,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,_=f;g<_;g++)zh.fromBufferAttribute(h,g),nv(zh,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function nv(i,e,t,n,r,s,o){let a=eg.distanceSqToPoint(i);if(a<t){let l=new O;eg.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Cc=class extends jn{constructor(e,t,n=xs,r,s,o,a=Qn,l=Qn,c,u=_a,h=1){if(u!==_a&&u!==Ia)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new va(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Rc=class extends jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Pc=class i extends Rn{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],l=[],c=new O,u=new tt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){let f=n+h/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Dt(o,3)),this.setAttribute("normal",new Dt(a,3)),this.setAttribute("uv",new Dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ba=class i extends Rn{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],d=[],f=[],g=0,_=[],m=n/2,p=0;S(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Dt(h,3)),this.setAttribute("normal",new Dt(d,3)),this.setAttribute("uv",new Dt(f,2));function S(){let x=new O,b=new O,w=0,T=(t-e)/n;for(let C=0;C<=s;C++){let v=[],y=C/s,R=y*(t-e)+e;for(let D=0;D<=r;D++){let U=D/r,V=U*l+a,W=Math.sin(V),G=Math.cos(V);b.x=R*W,b.y=-y*n+m,b.z=R*G,h.push(b.x,b.y,b.z),x.set(W,T,G).normalize(),d.push(x.x,x.y,x.z),f.push(U,1-y),v.push(g++)}_.push(v)}for(let C=0;C<r;C++)for(let v=0;v<s;v++){let y=_[v][C],R=_[v+1][C],D=_[v+1][C+1],U=_[v][C+1];(e>0||v!==0)&&(u.push(y,R,U),w+=3),(t>0||v!==s-1)&&(u.push(R,D,U),w+=3)}c.addGroup(p,w,0),p+=w}function M(x){let b=g,w=new tt,T=new O,C=0,v=x===!0?e:t,y=x===!0?1:-1;for(let D=1;D<=r;D++)h.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;let R=g;for(let D=0;D<=r;D++){let V=D/r*l+a,W=Math.cos(V),G=Math.sin(V);T.x=v*G,T.y=m*y,T.z=v*W,h.push(T.x,T.y,T.z),d.push(0,y,0),w.x=W*.5+.5,w.y=G*.5*y+.5,f.push(w.x,w.y),g++}for(let D=0;D<r;D++){let U=b+D,V=R+D;x===!0?u.push(V,V+1,U):u.push(V+1,V,U),C+=3}c.addGroup(p,C,x===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ic=class i extends ba{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},rf=class i extends Rn{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Dt(s,3)),this.setAttribute("normal",new Dt(s.slice(),3)),this.setAttribute("uv",new Dt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let M=new O,x=new O,b=new O;for(let w=0;w<t.length;w+=3)f(t[w+0],M),f(t[w+1],x),f(t[w+2],b),l(M,x,b,S)}function l(S,M,x,b){let w=b+1,T=[];for(let C=0;C<=w;C++){T[C]=[];let v=S.clone().lerp(x,C/w),y=M.clone().lerp(x,C/w),R=w-C;for(let D=0;D<=R;D++)D===0&&C===w?T[C][D]=v:T[C][D]=v.clone().lerp(y,D/R)}for(let C=0;C<w;C++)for(let v=0;v<2*(w-C)-1;v++){let y=Math.floor(v/2);v%2===0?(d(T[C][y+1]),d(T[C+1][y]),d(T[C][y])):(d(T[C][y+1]),d(T[C+1][y+1]),d(T[C+1][y]))}}function c(S){let M=new O;for(let x=0;x<s.length;x+=3)M.x=s[x+0],M.y=s[x+1],M.z=s[x+2],M.normalize().multiplyScalar(S),s[x+0]=M.x,s[x+1]=M.y,s[x+2]=M.z}function u(){let S=new O;for(let M=0;M<s.length;M+=3){S.x=s[M+0],S.y=s[M+1],S.z=s[M+2];let x=m(S)/2/Math.PI+.5,b=p(S)/Math.PI+.5;o.push(x,1-b)}g(),h()}function h(){for(let S=0;S<o.length;S+=6){let M=o[S+0],x=o[S+2],b=o[S+4],w=Math.max(M,x,b),T=Math.min(M,x,b);w>.9&&T<.1&&(M<.2&&(o[S+0]+=1),x<.2&&(o[S+2]+=1),b<.2&&(o[S+4]+=1))}}function d(S){s.push(S.x,S.y,S.z)}function f(S,M){let x=S*3;M.x=e[x+0],M.y=e[x+1],M.z=e[x+2]}function g(){let S=new O,M=new O,x=new O,b=new O,w=new tt,T=new tt,C=new tt;for(let v=0,y=0;v<s.length;v+=9,y+=6){S.set(s[v+0],s[v+1],s[v+2]),M.set(s[v+3],s[v+4],s[v+5]),x.set(s[v+6],s[v+7],s[v+8]),w.set(o[y+0],o[y+1]),T.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),b.copy(S).add(M).add(x).divideScalar(3);let R=m(b);_(w,y+0,S,R),_(T,y+2,M,R),_(C,y+4,x,R)}}function _(S,M,x,b){b<0&&S.x===1&&(o[M]=S.x-1),x.x===0&&x.z===0&&(o[M]=b/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var sf=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);let u=n[r],d=n[r+1]-u,f=(o-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new tt:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new O,r=[],s=[],o=[],a=new O,l=new wt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new O)}s[0]=new O,o[0]=new O;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(lt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(lt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function Sg(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var Hh=new O,Wm=new Sg,Xm=new Sg,qm=new Sg,Ta=class extends sf{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new O){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Hh.subVectors(r[0],r[1]).add(r[0]),c=Hh);let h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Hh.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Hh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Wm.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,_,m),Xm.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,_,m),qm.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Wm.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Xm.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),qm.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Wm.calc(l),Xm.calc(l),qm.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new O().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};var wa=class i extends rf{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var ps=class i extends Rn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let S=p*d-o;for(let M=0;M<c;M++){let x=M*h-s;g.push(x,-S,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){let M=S+c*p,x=S+c*(p+1),b=S+1+c*(p+1),w=S+1+c*p;f.push(M,x,w),f.push(x,b,w)}this.setIndex(f),this.setAttribute("position",new Dt(g,3)),this.setAttribute("normal",new Dt(_,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var oo=class i extends Rn{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let o=[],a=[],l=[],c=[],u=new O,h=new O,d=new O;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let _=g/r*s,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let _=(r+1)*f+g-1,m=(r+1)*(f-1)+g-1,p=(r+1)*(f-1)+g,S=(r+1)*f+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new Dt(a,3)),this.setAttribute("normal",new Dt(l,3)),this.setAttribute("uv",new Dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Dc=class i extends Rn{constructor(e=1,t=.4,n=64,r=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:o},n=Math.floor(n),r=Math.floor(r);let a=[],l=[],c=[],u=[],h=new O,d=new O,f=new O,g=new O,_=new O,m=new O,p=new O;for(let M=0;M<=n;++M){let x=M/n*s*Math.PI*2;S(x,s,o,e,f),S(x+.01,s,o,e,g),m.subVectors(g,f),p.addVectors(g,f),_.crossVectors(m,p),p.crossVectors(_,m),_.normalize(),p.normalize();for(let b=0;b<=r;++b){let w=b/r*Math.PI*2,T=-t*Math.cos(w),C=t*Math.sin(w);h.x=f.x+(T*p.x+C*_.x),h.y=f.y+(T*p.y+C*_.y),h.z=f.z+(T*p.z+C*_.z),l.push(h.x,h.y,h.z),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),u.push(M/n),u.push(b/r)}}for(let M=1;M<=n;M++)for(let x=1;x<=r;x++){let b=(r+1)*(M-1)+(x-1),w=(r+1)*M+(x-1),T=(r+1)*M+x,C=(r+1)*(M-1)+x;a.push(b,w,C),a.push(w,T,C)}this.setIndex(a),this.setAttribute("position",new Dt(l,3)),this.setAttribute("normal",new Dt(c,3)),this.setAttribute("uv",new Dt(u,2));function S(M,x,b,w,T){let C=Math.cos(M),v=Math.sin(M),y=b/x*M,R=Math.cos(y);T.x=w*(2+R)*.5*C,T.y=w*(2+R)*v*.5,T.z=w*Math.sin(y)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}};var Wi=class extends rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fd,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ao=class extends Wi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new tt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Lc=class extends rr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fd,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=Ef,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},of=class extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},af=class extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Gh(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function aw(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var lo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},lf=class extends lo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Km,endingEnd:Km}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case $m:s=e,a=2*t-n;break;case Jm:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $m:o=e,l=2*n-t;break;case Jm:o=1,l=n+r[1]-r[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let b=0;b!==a;++b)s[b]=p*o[u+b]+S*o[c+b]+M*o[l+b]+x*o[h+b];return s}},cf=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}},uf=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_i=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gh(t,this.TimeBufferType),this.values=Gh(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gh(e.times,Array),values:Gh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new uf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new lf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case dc:t=this.InterpolantFactoryMethodDiscrete;break;case Kh:t=this.InterpolantFactoryMethodLinear;break;case Wh:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dc;case this.InterpolantFactoryMethodLinear:return Kh;case this.InterpolantFactoryMethodSmooth:return Wh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&aw(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Wh,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};_i.prototype.ValueTypeName="";_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=Kh;var ms=class extends _i{constructor(e,t,n){super(e,t,n)}};ms.prototype.ValueTypeName="bool";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=dc;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;var hf=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};hf.prototype.ValueTypeName="color";var ff=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};ff.prototype.ValueTypeName="number";var df=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)Dr.slerpFlat(s,0,o,c-a,o,c,l);return s}},Fc=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new df(this.times,this.values,this.getValueSize(),e)}};Fc.prototype.ValueTypeName="quaternion";Fc.prototype.InterpolantFactoryMethodSmooth=void 0;var gs=class extends _i{constructor(e,t,n){super(e,t,n)}};gs.prototype.ValueTypeName="string";gs.prototype.ValueBufferType=Array;gs.prototype.DefaultInterpolation=dc;gs.prototype.InterpolantFactoryMethodLinear=void 0;gs.prototype.InterpolantFactoryMethodSmooth=void 0;var pf=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};pf.prototype.ValueTypeName="vector";var mf=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},$v=new mf,gf=class{constructor(e){this.manager=e!==void 0?e:$v,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};gf.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ea=class extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Nc=class extends Ea{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ym=new wt,iv=new O,rv=new O,_f=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.mapType=Xi,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;iv.setFromMatrixPosition(e.matrixWorld),t.position.copy(iv),rv.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rv),t.updateMatrixWorld(),Ym.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ym,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ym)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var sv=new wt,uc=new O,Zm=new O,tg=class extends _f{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new tt(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),uc.setFromMatrixPosition(e.matrixWorld),n.position.copy(uc),Zm.copy(n.position),Zm.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Zm),n.updateMatrixWorld(),r.makeTranslation(-uc.x,-uc.y,-uc.z),sv.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sv,n.coordinateSystem,n.reversedDepth)}},Uc=class extends Ea{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new tg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},co=class extends bc{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ng=class extends _f{constructor(){super(new co(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Aa=class extends Ea{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new ng}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var xf=class extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bg="\\[\\]\\.:\\/",lw=new RegExp("["+bg+"]","g"),Tg="[^"+bg+"]",cw="[^"+bg.replace("\\.","")+"]",uw=/((?:WC+[\/:])*)/.source.replace("WC",Tg),hw=/(WCOD+)?/.source.replace("WCOD",cw),fw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tg),dw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tg),pw=new RegExp("^"+uw+hw+fw+dw+"$"),mw=["material","materials","bones","map"],ig=class{constructor(e,t,n){let r=n||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},It=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(lw,"")}static parseTrackName(e){let t=pw.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);mw.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};It.Composite=ig;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var BB=new Float32Array(1);function wg(i,e,t,n){let r=gw(n);switch(t){case pg:return i*e;case Ff:return i*e/r.components*r.byteLength;case Nf:return i*e/r.components*r.byteLength;case gg:return i*e*2/r.components*r.byteLength;case Uf:return i*e*2/r.components*r.byteLength;case mg:return i*e*3/r.components*r.byteLength;case Li:return i*e*4/r.components*r.byteLength;case Of:return i*e*4/r.components*r.byteLength;case kc:case Vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zc:case Hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kf:case zf:return Math.max(i,16)*Math.max(e,8)/4;case Bf:case Vf:return Math.max(i,8)*Math.max(e,8)/2;case Hf:case Gf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Yf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Zf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Kf:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $f:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Jf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Qf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case jf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ed:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case td:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case nd:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case id:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case rd:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case sd:case od:case ad:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ld:case cd:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ud:case hd:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gw(i){switch(i){case Xi:case ug:return{byteLength:1,components:1};case Ca:case hg:case Ra:return{byteLength:2,components:1};case Df:case Lf:return{byteLength:2,components:4};case xs:case If:case qi:return{byteLength:4,components:1};case fg:case dg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function vM(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function xw(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let _=h[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var yw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ww=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ew=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Aw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Cw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Iw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Lw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Nw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ow=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Gw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ww=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kw="gl_FragColor = linearToOutputTexel( gl_FragColor );",$w=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Qw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,eE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,oE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,aE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_E=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ME=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,EE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,AE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,CE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,PE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,IE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,DE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,LE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,FE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,NE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,OE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,BE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,VE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,HE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,GE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,WE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,XE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,YE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ZE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,KE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$E=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,JE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,QE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,iA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,oA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_A=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,EA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,AA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,CA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,RA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,IA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,LA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,OA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,VA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,GA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,YA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$A=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:yw,alphahash_pars_fragment:vw,alphamap_fragment:Mw,alphamap_pars_fragment:Sw,alphatest_fragment:bw,alphatest_pars_fragment:Tw,aomap_fragment:ww,aomap_pars_fragment:Ew,batching_pars_vertex:Aw,batching_vertex:Cw,begin_vertex:Rw,beginnormal_vertex:Pw,bsdfs:Iw,iridescence_fragment:Dw,bumpmap_pars_fragment:Lw,clipping_planes_fragment:Fw,clipping_planes_pars_fragment:Nw,clipping_planes_pars_vertex:Uw,clipping_planes_vertex:Ow,color_fragment:Bw,color_pars_fragment:kw,color_pars_vertex:Vw,color_vertex:zw,common:Hw,cube_uv_reflection_fragment:Gw,defaultnormal_vertex:Ww,displacementmap_pars_vertex:Xw,displacementmap_vertex:qw,emissivemap_fragment:Yw,emissivemap_pars_fragment:Zw,colorspace_fragment:Kw,colorspace_pars_fragment:$w,envmap_fragment:Jw,envmap_common_pars_fragment:Qw,envmap_pars_fragment:jw,envmap_pars_vertex:eE,envmap_physical_pars_fragment:hE,envmap_vertex:tE,fog_vertex:nE,fog_pars_vertex:iE,fog_fragment:rE,fog_pars_fragment:sE,gradientmap_pars_fragment:oE,lightmap_pars_fragment:aE,lights_lambert_fragment:lE,lights_lambert_pars_fragment:cE,lights_pars_begin:uE,lights_toon_fragment:fE,lights_toon_pars_fragment:dE,lights_phong_fragment:pE,lights_phong_pars_fragment:mE,lights_physical_fragment:gE,lights_physical_pars_fragment:_E,lights_fragment_begin:xE,lights_fragment_maps:yE,lights_fragment_end:vE,logdepthbuf_fragment:ME,logdepthbuf_pars_fragment:SE,logdepthbuf_pars_vertex:bE,logdepthbuf_vertex:TE,map_fragment:wE,map_pars_fragment:EE,map_particle_fragment:AE,map_particle_pars_fragment:CE,metalnessmap_fragment:RE,metalnessmap_pars_fragment:PE,morphinstance_vertex:IE,morphcolor_vertex:DE,morphnormal_vertex:LE,morphtarget_pars_vertex:FE,morphtarget_vertex:NE,normal_fragment_begin:UE,normal_fragment_maps:OE,normal_pars_fragment:BE,normal_pars_vertex:kE,normal_vertex:VE,normalmap_pars_fragment:zE,clearcoat_normal_fragment_begin:HE,clearcoat_normal_fragment_maps:GE,clearcoat_pars_fragment:WE,iridescence_pars_fragment:XE,opaque_fragment:qE,packing:YE,premultiplied_alpha_fragment:ZE,project_vertex:KE,dithering_fragment:$E,dithering_pars_fragment:JE,roughnessmap_fragment:QE,roughnessmap_pars_fragment:jE,shadowmap_pars_fragment:eA,shadowmap_pars_vertex:tA,shadowmap_vertex:nA,shadowmask_pars_fragment:iA,skinbase_vertex:rA,skinning_pars_vertex:sA,skinning_vertex:oA,skinnormal_vertex:aA,specularmap_fragment:lA,specularmap_pars_fragment:cA,tonemapping_fragment:uA,tonemapping_pars_fragment:hA,transmission_fragment:fA,transmission_pars_fragment:dA,uv_pars_fragment:pA,uv_pars_vertex:mA,uv_vertex:gA,worldpos_vertex:_A,background_vert:xA,background_frag:yA,backgroundCube_vert:vA,backgroundCube_frag:MA,cube_vert:SA,cube_frag:bA,depth_vert:TA,depth_frag:wA,distanceRGBA_vert:EA,distanceRGBA_frag:AA,equirect_vert:CA,equirect_frag:RA,linedashed_vert:PA,linedashed_frag:IA,meshbasic_vert:DA,meshbasic_frag:LA,meshlambert_vert:FA,meshlambert_frag:NA,meshmatcap_vert:UA,meshmatcap_frag:OA,meshnormal_vert:BA,meshnormal_frag:kA,meshphong_vert:VA,meshphong_frag:zA,meshphysical_vert:HA,meshphysical_frag:GA,meshtoon_vert:WA,meshtoon_frag:XA,points_vert:qA,points_frag:YA,shadow_vert:ZA,shadow_frag:KA,sprite_vert:$A,sprite_frag:JA},_e={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},lr={basic:{uniforms:Pn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:Pn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:Pn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:Pn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:Pn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:Pn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:Pn([_e.points,_e.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:Pn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:Pn([_e.common,_e.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:Pn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:Pn([_e.sprite,_e.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:Pn([_e.common,_e.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:Pn([_e.lights,_e.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};lr.physical={uniforms:Pn([lr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var dd={r:0,b:0,g:0},mo=new Di,QA=new wt;function jA(i,e,t,n,r,s,o){let a=new Ye(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?t:e).get(x)),x}function _(M){let x=!1,b=g(M);b===null?p(a,l):b&&b.isColor&&(p(b,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,x){let b=g(x);b&&(b.isCubeTexture||b.mapping===Oc)?(u===void 0&&(u=new ft(new sr(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:po(lr.backgroundCube.uniforms),vertexShader:lr.backgroundCube.vertexShader,fragmentShader:lr.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),mo.copy(x.backgroundRotation),mo.x*=-1,mo.y*=-1,mo.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(mo.y*=-1,mo.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(QA.makeRotationFromEuler(mo)),u.material.toneMapped=dt.getTransfer(b.colorSpace)!==vt,(h!==b||d!==b.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=b,d=b.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new ft(new ps(2,2),new ei({name:"BackgroundMaterial",uniforms:po(lr.background.uniforms),vertexShader:lr.background.vertexShader,fragmentShader:lr.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=dt.getTransfer(b.colorSpace)!==vt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(dd,Mg(i)),n.buffers.color.setClear(dd.r,dd.g,dd.b,x,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,x=1){a.set(M),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:_,addToRenderList:m,dispose:S}}function eC(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null),s=r,o=!1;function a(y,R,D,U,V){let W=!1,G=h(U,D,R);s!==G&&(s=G,c(s.object)),W=f(y,U,D,V),W&&g(y,U,D,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(y,R,D,U),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,R,D){let U=D.wireframe===!0,V=n[y.id];V===void 0&&(V={},n[y.id]=V);let W=V[R.id];W===void 0&&(W={},V[R.id]=W);let G=W[U];return G===void 0&&(G=d(l()),W[U]=G),G}function d(y){let R=[],D=[],U=[];for(let V=0;V<t;V++)R[V]=0,D[V]=0,U[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:U,object:y,attributes:{},index:null}}function f(y,R,D,U){let V=s.attributes,W=R.attributes,G=0,X=D.getAttributes();for(let z in X)if(X[z].location>=0){let L=V[z],ce=W[z];if(ce===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor)),L===void 0||L.attribute!==ce||ce&&L.data!==ce.data)return!0;G++}return s.attributesNum!==G||s.index!==U}function g(y,R,D,U){let V={},W=R.attributes,G=0,X=D.getAttributes();for(let z in X)if(X[z].location>=0){let L=W[z];L===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(L=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(L=y.instanceColor));let ce={};ce.attribute=L,L&&L.data&&(ce.data=L.data),V[z]=ce,G++}s.attributes=V,s.attributesNum=G,s.index=U}function _(){let y=s.newAttributes;for(let R=0,D=y.length;R<D;R++)y[R]=0}function m(y){p(y,0)}function p(y,R){let D=s.newAttributes,U=s.enabledAttributes,V=s.attributeDivisors;D[y]=1,U[y]===0&&(i.enableVertexAttribArray(y),U[y]=1),V[y]!==R&&(i.vertexAttribDivisor(y,R),V[y]=R)}function S(){let y=s.newAttributes,R=s.enabledAttributes;for(let D=0,U=R.length;D<U;D++)R[D]!==y[D]&&(i.disableVertexAttribArray(D),R[D]=0)}function M(y,R,D,U,V,W,G){G===!0?i.vertexAttribIPointer(y,R,D,V,W):i.vertexAttribPointer(y,R,D,U,V,W)}function x(y,R,D,U){_();let V=U.attributes,W=D.getAttributes(),G=R.defaultAttributeValues;for(let X in W){let z=W[X];if(z.location>=0){let te=V[X];if(te===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(te=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(te=y.instanceColor)),te!==void 0){let L=te.normalized,ce=te.itemSize,De=e.get(te);if(De===void 0)continue;let Ke=De.buffer,He=De.type,Ae=De.bytesPerElement,Z=He===i.INT||He===i.UNSIGNED_INT||te.gpuType===If;if(te.isInterleavedBufferAttribute){let $=te.data,se=$.stride,Me=te.offset;if($.isInstancedInterleavedBuffer){for(let ye=0;ye<z.locationSize;ye++)p(z.location+ye,$.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ye=0;ye<z.locationSize;ye++)m(z.location+ye);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let ye=0;ye<z.locationSize;ye++)M(z.location+ye,ce/z.locationSize,He,L,se*Ae,(Me+ce/z.locationSize*ye)*Ae,Z)}else{if(te.isInstancedBufferAttribute){for(let $=0;$<z.locationSize;$++)p(z.location+$,te.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let $=0;$<z.locationSize;$++)m(z.location+$);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let $=0;$<z.locationSize;$++)M(z.location+$,ce/z.locationSize,He,L,ce*Ae,ce/z.locationSize*$*Ae,Z)}}else if(G!==void 0){let L=G[X];if(L!==void 0)switch(L.length){case 2:i.vertexAttrib2fv(z.location,L);break;case 3:i.vertexAttrib3fv(z.location,L);break;case 4:i.vertexAttrib4fv(z.location,L);break;default:i.vertexAttrib1fv(z.location,L)}}}}S()}function b(){C();for(let y in n){let R=n[y];for(let D in R){let U=R[D];for(let V in U)u(U[V].object),delete U[V];delete R[D]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;let R=n[y.id];for(let D in R){let U=R[D];for(let V in U)u(U[V].object),delete U[V];delete R[D]}delete n[y.id]}function T(y){for(let R in n){let D=n[R];if(D[y.id]===void 0)continue;let U=D[y.id];for(let V in U)u(U[V].object),delete U[V];delete D[y.id]}}function C(){v(),o=!0,s!==r&&(s=r,c(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:v,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function tC(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function nC(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==Li&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let C=T===Ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Xi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==qi&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:b,maxSamples:w}}function iC(i){let e=this,t=null,n=0,r=!1,s=!1,o=new nr,a=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let S=s?0:n,M=S*4,x=p.clippingState||null;l.value=x,x=u(g,d,M,f);for(let b=0;b!==M;++b)x[b]=t[b];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=f;M!==_;++M,x+=4)o.copy(h[M]).applyMatrix4(S,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function rC(i){let e=new WeakMap;function t(o,a){return a===Cf?o.mapping=uo:a===Rf&&(o.mapping=ho),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Cf||a===Rf)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new ef(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Fa=4,Jv=[.125,.215,.35,.446,.526,.582],xo=20,Eg=new co,Qv=new Ye,Ag=null,Cg=0,Rg=0,Pg=!1,_o=(1+Math.sqrt(5))/2,La=1/_o,jv=[new O(-_o,La,0),new O(_o,La,0),new O(-La,0,_o),new O(La,0,_o),new O(0,_o,-La),new O(0,_o,La),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],sC=new O,Ua=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:o=256,position:a=sC}=s;Ag=this._renderer.getRenderTarget(),Cg=this._renderer.getActiveCubeFace(),Rg=this._renderer.getActiveMipmapLevel(),Pg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ag,Cg,Rg),this._renderer.xr.enabled=Pg,e.scissorTest=!1,pd(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===uo||e.mapping===ho?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ag=this._renderer.getRenderTarget(),Cg=this._renderer.getActiveCubeFace(),Rg=this._renderer.getActiveMipmapLevel(),Pg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gi,minFilter:Gi,generateMipmaps:!1,type:Ra,format:Li,colorSpace:ro,depthBuffer:!1},r=eM(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eM(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=oC(s)),this._blurMaterial=aC(s,e,t)}return r}_compileMaterial(e){let t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,Eg)}_sceneToCubeUV(e,t,n,r,s){let l=new mn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Qv),h.toneMapping=Nr,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));let _=new vc({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),m=new ft(new sr,_),p=!1,S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,p=!0):(_.color.copy(Qv),p=!0);for(let M=0;M<6;M++){let x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));let b=this._cubeSize;pd(r,x*b,M>2?b:0,b,b),h.setRenderTarget(r),p&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===uo||e.mapping===ho;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nM()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tM());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new ft(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;pd(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Eg)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=jv[(r-s-1)%jv.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ft(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*xo-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):xo;m>xo&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xo}`);let p=[],S=0;for(let T=0;T<xo;++T){let C=T/_,v=Math.exp(-C*C/2);p.push(v),T===0?S+=v:T<m&&(S+=2*v)}for(let T=0;T<p.length;T++)p[T]=p[T]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let x=this._sizeLods[r],b=3*x*(r>M-Fa?r-M+Fa:0),w=4*(this._cubeSize-x);pd(t,b,w,3*x,2*x),l.setRenderTarget(t),l.render(h,Eg)}};function oC(i){let e=[],t=[],n=[],r=i,s=i-Fa+1+Jv.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Fa?l=Jv[o-i+Fa-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),M=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let w=0;w<f;w++){let T=w%3*2/3-1,C=w>2?0:-1,v=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];S.set(v,_*g*w),M.set(d,m*g*w);let y=[w,w,w,w,w,w];x.set(y,p*g*w)}let b=new Rn;b.setAttribute("position",new gn(S,_)),b.setAttribute("uv",new gn(M,m)),b.setAttribute("faceIndex",new gn(x,p)),e.push(b),r>Fa&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function eM(i,e,t){let n=new Ii(i,e,t);return n.texture.mapping=Oc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pd(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function aC(i,e,t){let n=new Float32Array(xo),r=new O(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:xo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fr,depthTest:!1,depthWrite:!1})}function tM(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fr,depthTest:!1,depthWrite:!1})}function nM(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fr,depthTest:!1,depthWrite:!1})}function Vg(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function lC(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Cf||l===Rf,u=l===uo||l===ho;if(c||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ua(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Ua(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function cC(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&ya("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function uC(i,e,t,n){let r={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,g=h.attributes.position,_=0;if(f!==null){let S=f.array;_=f.version;for(let M=0,x=S.length;M<x;M+=3){let b=S[M+0],w=S[M+1],T=S[M+2];d.push(b,w,w,T,T,b)}}else if(g!==void 0){let S=g.array;_=g.version;for(let M=0,x=S.length/3-1;M<x;M+=3){let b=M+0,w=M+1,T=M+2;d.push(b,w,w,T,T,b)}}else return;let m=new(vg(d)?Sc:Mc)(d,1);m.version=_;let p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function hC(i,e,t){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,s,d*o,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*_[S];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function fC(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function dC(i,e,t){let n=new WeakMap,r=new yt;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let v=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let x=a.attributes.position.count*M,b=1;x>e.maxTextureSize&&(b=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*b*4*h),T=new _c(w,x,b,h);T.type=qi,T.needsUpdate=!0;let C=M*4;for(let y=0;y<h;y++){let R=m[y],D=p[y],U=S[y],V=x*b*4*y;for(let W=0;W<R.count;W++){let G=W*C;f===!0&&(r.fromBufferAttribute(R,W),w[V+G+0]=r.x,w[V+G+1]=r.y,w[V+G+2]=r.z,w[V+G+3]=0),g===!0&&(r.fromBufferAttribute(D,W),w[V+G+4]=r.x,w[V+G+5]=r.y,w[V+G+6]=r.z,w[V+G+7]=0),_===!0&&(r.fromBufferAttribute(U,W),w[V+G+8]=r.x,w[V+G+9]=r.y,w[V+G+10]=r.z,w[V+G+11]=U.itemSize===4?r.w:1)}}d={count:h,texture:T,size:new tt(x,b)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function pC(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var MM=new jn,iM=new Cc(1,1),SM=new _c,bM=new Qh,TM=new Tc,rM=[],sM=[],oM=new Float32Array(16),aM=new Float32Array(9),lM=new Float32Array(4);function Oa(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=rM[r];if(s===void 0&&(s=new Float32Array(r),rM[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function _d(i,e){let t=sM[e];t===void 0&&(t=new Int32Array(e),sM[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mC(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function _C(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function xC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function yC(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;lM.set(n),i.uniformMatrix2fv(this.addr,!1,lM),ln(t,n)}}function vC(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;aM.set(n),i.uniformMatrix3fv(this.addr,!1,aM),ln(t,n)}}function MC(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,n))return;oM.set(n),i.uniformMatrix4fv(this.addr,!1,oM),ln(t,n)}}function SC(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function TC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function wC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function EC(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function AC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function CC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function RC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function PC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(iM.compareFunction=_g,s=iM):s=MM,t.setTexture2D(e||s,r)}function IC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||bM,r)}function DC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||TM,r)}function LC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||SM,r)}function FC(i){switch(i){case 5126:return mC;case 35664:return gC;case 35665:return _C;case 35666:return xC;case 35674:return yC;case 35675:return vC;case 35676:return MC;case 5124:case 35670:return SC;case 35667:case 35671:return bC;case 35668:case 35672:return TC;case 35669:case 35673:return wC;case 5125:return EC;case 36294:return AC;case 36295:return CC;case 36296:return RC;case 35678:case 36198:case 36298:case 36306:case 35682:return PC;case 35679:case 36299:case 36307:return IC;case 35680:case 36300:case 36308:case 36293:return DC;case 36289:case 36303:case 36311:case 36292:return LC}}function NC(i,e){i.uniform1fv(this.addr,e)}function UC(i,e){let t=Oa(e,this.size,2);i.uniform2fv(this.addr,t)}function OC(i,e){let t=Oa(e,this.size,3);i.uniform3fv(this.addr,t)}function BC(i,e){let t=Oa(e,this.size,4);i.uniform4fv(this.addr,t)}function kC(i,e){let t=Oa(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function VC(i,e){let t=Oa(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zC(i,e){let t=Oa(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function HC(i,e){i.uniform1iv(this.addr,e)}function GC(i,e){i.uniform2iv(this.addr,e)}function WC(i,e){i.uniform3iv(this.addr,e)}function XC(i,e){i.uniform4iv(this.addr,e)}function qC(i,e){i.uniform1uiv(this.addr,e)}function YC(i,e){i.uniform2uiv(this.addr,e)}function ZC(i,e){i.uniform3uiv(this.addr,e)}function KC(i,e){i.uniform4uiv(this.addr,e)}function $C(i,e,t){let n=this.cache,r=e.length,s=_d(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||MM,s[o])}function JC(i,e,t){let n=this.cache,r=e.length,s=_d(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||bM,s[o])}function QC(i,e,t){let n=this.cache,r=e.length,s=_d(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||TM,s[o])}function jC(i,e,t){let n=this.cache,r=e.length,s=_d(t,r);an(n,s)||(i.uniform1iv(this.addr,s),ln(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||SM,s[o])}function eR(i){switch(i){case 5126:return NC;case 35664:return UC;case 35665:return OC;case 35666:return BC;case 35674:return kC;case 35675:return VC;case 35676:return zC;case 5124:case 35670:return HC;case 35667:case 35671:return GC;case 35668:case 35672:return WC;case 35669:case 35673:return XC;case 5125:return qC;case 36294:return YC;case 36295:return ZC;case 36296:return KC;case 35678:case 36198:case 36298:case 36306:case 35682:return $C;case 35679:case 36299:case 36307:return JC;case 35680:case 36300:case 36308:case 36293:return QC;case 36289:case 36303:case 36311:case 36292:return jC}}var Dg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=FC(t.type)}},Lg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=eR(t.type)}},Fg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},Ig=/(\w+)(\])?(\[|\.)?/g;function cM(i,e){i.seq.push(e),i.map[e.id]=e}function tR(i,e,t){let n=i.name,r=n.length;for(Ig.lastIndex=0;;){let s=Ig.exec(n),o=Ig.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){cM(t,c===void 0?new Dg(a,i,e):new Lg(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Fg(a),cM(t,h)),t=h}}}var Na=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);tR(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function uM(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var nR=37297,iR=0;function rR(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var hM=new Qe;function sR(i){dt._getMatrix(hM,dt.workingColorSpace,i);let e=`mat3( ${hM.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case pc:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function fM(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+rR(i.getShaderSource(e),a)}else return s}function oR(i,e){let t=sR(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function aR(i,e){let t;switch(e){case Rv:t="Linear";break;case Pv:t="Reinhard";break;case Iv:t="Cineon";break;case Af:t="ACESFilmic";break;case Lv:t="AgX";break;case Fv:t="Neutral";break;case Dv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var md=new O;function lR(){dt.getLuminanceCoefficients(md);let i=md.x.toFixed(4),e=md.y.toFixed(4),t=md.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cR(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gc).join(`
`)}function uR(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hR(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Gc(i){return i!==""}function dM(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pM(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ng(i){return i.replace(fR,pR)}var dR=new Map;function pR(i,e){let t=rt[e];if(t===void 0){let n=dR.get(e);if(n!==void 0)t=rt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ng(t)}var mR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mM(i){return i.replace(mR,gR)}function gR(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function gM(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _R(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sg?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===lv?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===or&&(e="SHADOWMAP_TYPE_VSM"),e}function xR(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case uo:case ho:e="ENVMAP_TYPE_CUBE";break;case Oc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yR(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ho&&(e="ENVMAP_MODE_REFRACTION"),e}function vR(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ef:e="ENVMAP_BLENDING_MULTIPLY";break;case Av:e="ENVMAP_BLENDING_MIX";break;case Cv:e="ENVMAP_BLENDING_ADD";break}return e}function MR(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function SR(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=_R(t),c=xR(t),u=yR(t),h=vR(t),d=MR(t),f=cR(t),g=uR(s),_=r.createProgram(),m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gc).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gc).join(`
`),p.length>0&&(p+=`
`)):(m=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gc).join(`
`),p=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nr?"#define TONE_MAPPING":"",t.toneMapping!==Nr?rt.tonemapping_pars_fragment:"",t.toneMapping!==Nr?aR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,oR("linearToOutputTexel",t.outputColorSpace),lR(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gc).join(`
`)),o=Ng(o),o=dM(o,t),o=pM(o,t),a=Ng(a),a=dM(a,t),a=pM(a,t),o=mM(o),a=mM(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===xg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=S+m+o,x=S+p+a,b=uM(r,r.VERTEX_SHADER,M),w=uM(r,r.FRAGMENT_SHADER,x);r.attachShader(_,b),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function T(R){if(i.debug.checkShaderErrors){let D=r.getProgramInfoLog(_)||"",U=r.getShaderInfoLog(b)||"",V=r.getShaderInfoLog(w)||"",W=D.trim(),G=U.trim(),X=V.trim(),z=!0,te=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,b,w);else{let L=fM(r,b,"vertex"),ce=fM(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+L+`
`+ce)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(G===""||X==="")&&(te=!1);te&&(R.diagnostics={runnable:z,programLog:W,vertexShader:{log:G,prefix:m},fragmentShader:{log:X,prefix:p}})}r.deleteShader(b),r.deleteShader(w),C=new Na(r,_),v=hR(r,_)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,nR)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=w,this}var bR=0,Ug=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Og(e),t.set(e,n)),n}},Og=class{constructor(e){this.id=bR++,this.code=e,this.usedTimes=0}};function TR(i,e,t,n,r,s,o){let a=new yc,l=new Ug,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,y,R,D,U){let V=D.fog,W=U.geometry,G=v.isMeshStandardMaterial?D.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||G),z=X&&X.mapping===Oc?X.image.height:null,te=g[v.type];v.precision!==null&&(f=r.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));let L=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ce=L!==void 0?L.length:0,De=0;W.morphAttributes.position!==void 0&&(De=1),W.morphAttributes.normal!==void 0&&(De=2),W.morphAttributes.color!==void 0&&(De=3);let Ke,He,Ae,Z;if(te){let xe=lr[te];Ke=xe.vertexShader,He=xe.fragmentShader}else Ke=v.vertexShader,He=v.fragmentShader,l.update(v),Ae=l.getVertexShaderID(v),Z=l.getFragmentShaderID(v);let $=i.getRenderTarget(),se=i.state.buffers.depth.getReversed(),Me=U.isInstancedMesh===!0,ye=U.isBatchedMesh===!0,Oe=!!v.map,$e=!!v.matcap,I=!!X,Ge=!!v.aoMap,Ee=!!v.lightMap,Te=!!v.bumpMap,N=!!v.normalMap,je=!!v.displacementMap,J=!!v.emissiveMap,he=!!v.metalnessMap,Le=!!v.roughnessMap,st=v.anisotropy>0,P=v.clearcoat>0,E=v.dispersion>0,H=v.iridescence>0,Q=v.sheen>0,j=v.transmission>0,K=st&&!!v.anisotropyMap,ve=P&&!!v.clearcoatMap,ae=P&&!!v.clearcoatNormalMap,Pe=P&&!!v.clearcoatRoughnessMap,pe=H&&!!v.iridescenceMap,oe=H&&!!v.iridescenceThicknessMap,de=Q&&!!v.sheenColorMap,ke=Q&&!!v.sheenRoughnessMap,Ie=!!v.specularMap,fe=!!v.specularColorMap,qe=!!v.specularIntensityMap,F=j&&!!v.transmissionMap,re=j&&!!v.thicknessMap,le=!!v.gradientMap,ge=!!v.alphaMap,ie=v.alphaTest>0,ee=!!v.alphaHash,we=!!v.extensions,ze=Nr;v.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(ze=i.toneMapping);let pt={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:Ke,fragmentShader:He,defines:v.defines,customVertexShaderID:Ae,customFragmentShaderID:Z,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:ye,batchingColor:ye&&U._colorsTexture!==null,instancing:Me,instancingColor:Me&&U.instanceColor!==null,instancingMorph:Me&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ro,alphaToCoverage:!!v.alphaToCoverage,map:Oe,matcap:$e,envMap:I,envMapMode:I&&X.mapping,envMapCubeUVHeight:z,aoMap:Ge,lightMap:Ee,bumpMap:Te,normalMap:N,displacementMap:d&&je,emissiveMap:J,normalMapObjectSpace:N&&v.normalMapType===Bv,normalMapTangentSpace:N&&v.normalMapType===fd,metalnessMap:he,roughnessMap:Le,anisotropy:st,anisotropyMap:K,clearcoat:P,clearcoatMap:ve,clearcoatNormalMap:ae,clearcoatRoughnessMap:Pe,dispersion:E,iridescence:H,iridescenceMap:pe,iridescenceThicknessMap:oe,sheen:Q,sheenColorMap:de,sheenRoughnessMap:ke,specularMap:Ie,specularColorMap:fe,specularIntensityMap:qe,transmission:j,transmissionMap:F,thicknessMap:re,gradientMap:le,opaque:v.transparent===!1&&v.blending===no&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:ie,alphaHash:ee,combine:v.combine,mapUv:Oe&&_(v.map.channel),aoMapUv:Ge&&_(v.aoMap.channel),lightMapUv:Ee&&_(v.lightMap.channel),bumpMapUv:Te&&_(v.bumpMap.channel),normalMapUv:N&&_(v.normalMap.channel),displacementMapUv:je&&_(v.displacementMap.channel),emissiveMapUv:J&&_(v.emissiveMap.channel),metalnessMapUv:he&&_(v.metalnessMap.channel),roughnessMapUv:Le&&_(v.roughnessMap.channel),anisotropyMapUv:K&&_(v.anisotropyMap.channel),clearcoatMapUv:ve&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:de&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ke&&_(v.sheenRoughnessMap.channel),specularMapUv:Ie&&_(v.specularMap.channel),specularColorMapUv:fe&&_(v.specularColorMap.channel),specularIntensityMapUv:qe&&_(v.specularIntensityMap.channel),transmissionMapUv:F&&_(v.transmissionMap.channel),thicknessMapUv:re&&_(v.thicknessMap.channel),alphaMapUv:ge&&_(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(N||st),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Oe||ge),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:se,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:De,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Oe&&v.map.isVideoTexture===!0&&dt.getTransfer(v.map.colorSpace)===vt,decodeVideoTextureEmissive:J&&v.emissiveMap.isVideoTexture===!0&&dt.getTransfer(v.emissiveMap.colorSpace)===vt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ar,flipSided:v.side===_n,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:we&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&v.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(v){let y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(let R in v.defines)y.push(R),y.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(S(y,v),M(y,v),y.push(i.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function S(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function M(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function x(v){let y=g[v.type],R;if(y){let D=lr[y];R=Kv.clone(D.uniforms)}else R=v.uniforms;return R}function b(v,y){let R;for(let D=0,U=u.length;D<U;D++){let V=u[D];if(V.cacheKey===y){R=V,++R.usedTimes;break}}return R===void 0&&(R=new SR(i,y,v,s),u.push(R)),R}function w(v){if(--v.usedTimes===0){let y=u.indexOf(v);u[y]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:C}}function wR(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function ER(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function _M(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xM(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function a(h,d,f,g,_,m){let p=o(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(h,d,f,g,_,m){let p=o(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||ER),n.length>1&&n.sort(d||_M),r.length>1&&r.sort(d||_M)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function AR(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new xM,i.set(n,[o])):r>=s.length?(o=new xM,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function CR(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ye};break;case"SpotLight":t={position:new O,direction:new O,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function RR(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var PR=0;function IR(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function DR(i){let e=new CR,t=RR(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);let r=new O,s=new wt,o=new wt;function a(c){let u=0,h=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,M=0,x=0,b=0,w=0,T=0;c.sort(IR);for(let v=0,y=c.length;v<y;v++){let R=c[v],D=R.color,U=R.intensity,V=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=D.r*U,h+=D.g*U,d+=D.b*U;else if(R.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(R.sh.coefficients[G],U);T++}else if(R.isDirectionalLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let X=R.shadow,z=t.get(R);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=R.shadow.matrix,S++}n.directional[f]=G,f++}else if(R.isSpotLight){let G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(D).multiplyScalar(U),G.distance=V,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,n.spot[_]=G;let X=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,X.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[_]=X.matrix,R.castShadow){let z=t.get(R);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=W,x++}_++}else if(R.isRectAreaLight){let G=e.get(R);G.color.copy(D).multiplyScalar(U),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=G,m++}else if(R.isPointLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){let X=R.shadow,z=t.get(R);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,z.shadowCameraNear=X.camera.near,z.shadowCameraFar=X.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=G,g++}else if(R.isHemisphereLight){let G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(U),G.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==S||C.numPointShadows!==M||C.numSpotShadows!==x||C.numSpotMaps!==b||C.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=S,C.numPointShadows=M,C.numSpotShadows=x,C.numSpotMaps=b,C.numLightProbes=T,n.version=PR++)}function l(c,u){let h=0,d=0,f=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){let M=c[p];if(M.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(M.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(M.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function yM(i){let e=new DR(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function LR(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new yM(i),e.set(r,[a])):s>=o.length?(a=new yM(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var FR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function UR(i,e,t){let n=new Sa,r=new tt,s=new tt,o=new yt,a=new of({depthPacking:Ov}),l=new af,c={},u=t.maxTextureSize,h={[Pr]:_n,[_n]:Pr,[ar]:ar},d=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:FR,fragmentShader:NR}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Rn;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ft(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sg;let p=this.type;this.render=function(w,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let v=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Fr),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let U=p!==or&&this.type===or,V=p===or&&this.type!==or;for(let W=0,G=w.length;W<G;W++){let X=w[W],z=X.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);let te=z.getFrameExtents();if(r.multiply(te),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,z.mapSize.y=s.y)),z.map===null||U===!0||V===!0){let ce=this.type!==or?{minFilter:Qn,magFilter:Qn}:{};z.map!==null&&z.map.dispose(),z.map=new Ii(r.x,r.y,ce),z.map.texture.name=X.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();let L=z.getViewportCount();for(let ce=0;ce<L;ce++){let De=z.getViewport(ce);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),D.viewport(o),z.updateMatrices(X,ce),n=z.getFrustum(),x(T,C,z.camera,X,this.type)}z.isPointLightShadow!==!0&&this.type===or&&S(z,C),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,y,R)};function S(w,T){let C=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ii(r.x,r.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,C,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,C,f,_,null)}function M(w,T,C,v){let y=null,R=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=C.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let D=y.uuid,U=T.uuid,V=c[D];V===void 0&&(V={},c[D]=V);let W=V[U];W===void 0&&(W=y.clone(),V[U]=W,T.addEventListener("dispose",b)),y=W}if(y.visible=T.visible,y.wireframe=T.wireframe,v===or?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:h[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let D=i.properties.get(y);D.light=C}return y}function x(w,T,C,v,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===or)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);let U=e.update(w),V=w.material;if(Array.isArray(V)){let W=U.groups;for(let G=0,X=W.length;G<X;G++){let z=W[G],te=V[z.materialIndex];if(te&&te.visible){let L=M(w,te,v,y);w.onBeforeShadow(i,w,T,C,U,L,z),i.renderBufferDirect(C,null,U,L,w,z),w.onAfterShadow(i,w,T,C,U,L,z)}}}else if(V.visible){let W=M(w,V,v,y);w.onBeforeShadow(i,w,T,C,U,W,null),i.renderBufferDirect(C,null,U,W,w,null),w.onAfterShadow(i,w,T,C,U,W,null)}}let D=w.children;for(let U=0,V=D.length;U<V;U++)x(D[U],T,C,v,y)}function b(w){w.target.removeEventListener("dispose",b);for(let C in c){let v=c[C],y=w.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}var OR={[yf]:vf,[Mf]:Tf,[Sf]:wf,[io]:bf,[vf]:yf,[Tf]:Mf,[wf]:Sf,[bf]:io};function BR(i,e){function t(){let F=!1,re=new yt,le=null,ge=new yt(0,0,0,0);return{setMask:function(ie){le!==ie&&!F&&(i.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){F=ie},setClear:function(ie,ee,we,ze,pt){pt===!0&&(ie*=ze,ee*=ze,we*=ze),re.set(ie,ee,we,ze),ge.equals(re)===!1&&(i.clearColor(ie,ee,we,ze),ge.copy(re))},reset:function(){F=!1,le=null,ge.set(-1,0,0,0)}}}function n(){let F=!1,re=!1,le=null,ge=null,ie=null;return{setReversed:function(ee){if(re!==ee){let we=e.get("EXT_clip_control");ee?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),re=ee;let ze=ie;ie=null,this.setClear(ze)}},getReversed:function(){return re},setTest:function(ee){ee?$(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(ee){le!==ee&&!F&&(i.depthMask(ee),le=ee)},setFunc:function(ee){if(re&&(ee=OR[ee]),ge!==ee){switch(ee){case yf:i.depthFunc(i.NEVER);break;case vf:i.depthFunc(i.ALWAYS);break;case Mf:i.depthFunc(i.LESS);break;case io:i.depthFunc(i.LEQUAL);break;case Sf:i.depthFunc(i.EQUAL);break;case bf:i.depthFunc(i.GEQUAL);break;case Tf:i.depthFunc(i.GREATER);break;case wf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=ee}},setLocked:function(ee){F=ee},setClear:function(ee){ie!==ee&&(re&&(ee=1-ee),i.clearDepth(ee),ie=ee)},reset:function(){F=!1,le=null,ge=null,ie=null,re=!1}}}function r(){let F=!1,re=null,le=null,ge=null,ie=null,ee=null,we=null,ze=null,pt=null;return{setTest:function(xe){F||(xe?$(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(xe){re!==xe&&!F&&(i.stencilMask(xe),re=xe)},setFunc:function(xe,Fe,Je){(le!==xe||ge!==Fe||ie!==Je)&&(i.stencilFunc(xe,Fe,Je),le=xe,ge=Fe,ie=Je)},setOp:function(xe,Fe,Je){(ee!==xe||we!==Fe||ze!==Je)&&(i.stencilOp(xe,Fe,Je),ee=xe,we=Fe,ze=Je)},setLocked:function(xe){F=xe},setClear:function(xe){pt!==xe&&(i.clearStencil(xe),pt=xe)},reset:function(){F=!1,re=null,le=null,ge=null,ie=null,ee=null,we=null,ze=null,pt=null}}}let s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,M=null,x=null,b=null,w=null,T=new Ye(0,0,0),C=0,v=!1,y=null,R=null,D=null,U=null,V=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,X=0,z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(z)[1]),G=X>=1):z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),G=X>=2);let te=null,L={},ce=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),Ke=new yt().fromArray(ce),He=new yt().fromArray(De);function Ae(F,re,le,ge){let ie=new Uint8Array(4),ee=i.createTexture();i.bindTexture(F,ee),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<le;we++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(re+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return ee}let Z={};Z[i.TEXTURE_2D]=Ae(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(i.DEPTH_TEST),o.setFunc(io),Te(!1),N(rg),$(i.CULL_FACE),Ge(Fr);function $(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function se(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Me(F,re){return h[F]!==re?(i.bindFramebuffer(F,re),h[F]=re,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=re),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=re),!0):!1}function ye(F,re){let le=f,ge=!1;if(F){le=d.get(re),le===void 0&&(le=[],d.set(re,le));let ie=F.textures;if(le.length!==ie.length||le[0]!==i.COLOR_ATTACHMENT0){for(let ee=0,we=ie.length;ee<we;ee++)le[ee]=i.COLOR_ATTACHMENT0+ee;le.length=ie.length,ge=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,ge=!0);ge&&i.drawBuffers(le)}function Oe(F){return g!==F?(i.useProgram(F),g=F,!0):!1}let $e={[fs]:i.FUNC_ADD,[uv]:i.FUNC_SUBTRACT,[hv]:i.FUNC_REVERSE_SUBTRACT};$e[fv]=i.MIN,$e[dv]=i.MAX;let I={[pv]:i.ZERO,[mv]:i.ONE,[gv]:i.SRC_COLOR,[Xh]:i.SRC_ALPHA,[Sv]:i.SRC_ALPHA_SATURATE,[vv]:i.DST_COLOR,[xv]:i.DST_ALPHA,[_v]:i.ONE_MINUS_SRC_COLOR,[qh]:i.ONE_MINUS_SRC_ALPHA,[Mv]:i.ONE_MINUS_DST_COLOR,[yv]:i.ONE_MINUS_DST_ALPHA,[bv]:i.CONSTANT_COLOR,[Tv]:i.ONE_MINUS_CONSTANT_COLOR,[wv]:i.CONSTANT_ALPHA,[Ev]:i.ONE_MINUS_CONSTANT_ALPHA};function Ge(F,re,le,ge,ie,ee,we,ze,pt,xe){if(F===Fr){_===!0&&(se(i.BLEND),_=!1);return}if(_===!1&&($(i.BLEND),_=!0),F!==cv){if(F!==m||xe!==v){if((p!==fs||x!==fs)&&(i.blendEquation(i.FUNC_ADD),p=fs,x=fs),xe)switch(F){case no:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case og:i.blendFunc(i.ONE,i.ONE);break;case ag:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lg:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case no:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case og:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ag:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lg:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,M=null,b=null,w=null,T.set(0,0,0),C=0,m=F,v=xe}return}ie=ie||re,ee=ee||le,we=we||ge,(re!==p||ie!==x)&&(i.blendEquationSeparate($e[re],$e[ie]),p=re,x=ie),(le!==S||ge!==M||ee!==b||we!==w)&&(i.blendFuncSeparate(I[le],I[ge],I[ee],I[we]),S=le,M=ge,b=ee,w=we),(ze.equals(T)===!1||pt!==C)&&(i.blendColor(ze.r,ze.g,ze.b,pt),T.copy(ze),C=pt),m=F,v=!1}function Ee(F,re){F.side===ar?se(i.CULL_FACE):$(i.CULL_FACE);let le=F.side===_n;re&&(le=!le),Te(le),F.blending===no&&F.transparent===!1?Ge(Fr):Ge(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);let ge=F.stencilWrite;a.setTest(ge),ge&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),J(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Te(F){y!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),y=F)}function N(F){F!==ov?($(i.CULL_FACE),F!==R&&(F===rg?i.cullFace(i.BACK):F===av?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),R=F}function je(F){F!==D&&(G&&i.lineWidth(F),D=F)}function J(F,re,le){F?($(i.POLYGON_OFFSET_FILL),(U!==re||V!==le)&&(i.polygonOffset(re,le),U=re,V=le)):se(i.POLYGON_OFFSET_FILL)}function he(F){F?$(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function Le(F){F===void 0&&(F=i.TEXTURE0+W-1),te!==F&&(i.activeTexture(F),te=F)}function st(F,re,le){le===void 0&&(te===null?le=i.TEXTURE0+W-1:le=te);let ge=L[le];ge===void 0&&(ge={type:void 0,texture:void 0},L[le]=ge),(ge.type!==F||ge.texture!==re)&&(te!==le&&(i.activeTexture(le),te=le),i.bindTexture(F,re||Z[F]),ge.type=F,ge.texture=re)}function P(){let F=L[te];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(F){Ke.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ke.copy(F))}function ke(F){He.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),He.copy(F))}function Ie(F,re){let le=c.get(re);le===void 0&&(le=new WeakMap,c.set(re,le));let ge=le.get(F);ge===void 0&&(ge=i.getUniformBlockIndex(re,F.name),le.set(F,ge))}function fe(F,re){let ge=c.get(re).get(F);l.get(re)!==ge&&(i.uniformBlockBinding(re,ge,F.__bindingPointIndex),l.set(re,ge))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},te=null,L={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,M=null,x=null,b=null,w=null,T=new Ye(0,0,0),C=0,v=!1,y=null,R=null,D=null,U=null,V=null,Ke.set(0,0,i.canvas.width,i.canvas.height),He.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:$,disable:se,bindFramebuffer:Me,drawBuffers:ye,useProgram:Oe,setBlending:Ge,setMaterial:Ee,setFlipSided:Te,setCullFace:N,setLineWidth:je,setPolygonOffset:J,setScissorTest:he,activeTexture:Le,bindTexture:st,unbindTexture:P,compressedTexImage2D:E,compressedTexImage3D:H,texImage2D:pe,texImage3D:oe,updateUBOMapping:Ie,uniformBlockBinding:fe,texStorage2D:ae,texStorage3D:Pe,texSubImage2D:Q,texSubImage3D:j,compressedTexSubImage2D:K,compressedTexSubImage3D:ve,scissor:de,viewport:ke,reset:qe}}function kR(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return f?new OffscreenCanvas(P,E):gc("canvas")}function _(P,E,H){let Q=1,j=st(P);if((j.width>H||j.height>H)&&(Q=H/Math.max(j.width,j.height)),Q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let K=Math.floor(Q*j.width),ve=Math.floor(Q*j.height);h===void 0&&(h=g(K,ve));let ae=E?g(K,ve):h;return ae.width=K,ae.height=ve,ae.getContext("2d").drawImage(P,0,0,K,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+K+"x"+ve+")."),ae}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(P,E,H,Q,j=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=E;if(E===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8)),E===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),E===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8)),E===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),E===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),E===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),E===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),E===i.RGBA){let ve=j?pc:dt.getTransfer(Q);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=ve===vt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(P,E){let H;return P?E===null||E===xs||E===Pa?H=i.DEPTH24_STENCIL8:E===qi?H=i.DEPTH32F_STENCIL8:E===Ca&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===xs||E===Pa?H=i.DEPTH_COMPONENT24:E===qi?H=i.DEPTH_COMPONENT32F:E===Ca&&(H=i.DEPTH_COMPONENT16),H}function b(P,E){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Qn&&P.minFilter!==Gi?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function w(P){let E=P.target;E.removeEventListener("dispose",w),C(E),E.isVideoTexture&&u.delete(E)}function T(P){let E=P.target;E.removeEventListener("dispose",T),y(E)}function C(P){let E=n.get(P);if(E.__webglInit===void 0)return;let H=P.source,Q=d.get(H);if(Q){let j=Q[E.__cacheKey];j.usedTimes--,j.usedTimes===0&&v(P),Object.keys(Q).length===0&&d.delete(H)}n.remove(P)}function v(P){let E=n.get(P);i.deleteTexture(E.__webglTexture);let H=P.source,Q=d.get(H);delete Q[E.__cacheKey],o.memory.textures--}function y(P){let E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let j=0;j<E.__webglFramebuffer[Q].length;j++)i.deleteFramebuffer(E.__webglFramebuffer[Q][j]);else i.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)i.deleteFramebuffer(E.__webglFramebuffer[Q]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let H=P.textures;for(let Q=0,j=H.length;Q<j;Q++){let K=n.get(H[Q]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(H[Q])}n.remove(P)}let R=0;function D(){R=0}function U(){let P=R;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),R+=1,P}function V(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function W(P,E){let H=n.get(P);if(P.isVideoTexture&&he(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){let Q=P.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(H,P,E);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+E)}function G(P,E){let H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){Z(H,P,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+E)}function X(P,E){let H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){Z(H,P,E);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+E)}function z(P,E){let H=n.get(P);if(P.version>0&&H.__version!==P.version){$(H,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+E)}let te={[Yh]:i.REPEAT,[hs]:i.CLAMP_TO_EDGE,[Zh]:i.MIRRORED_REPEAT},L={[Qn]:i.NEAREST,[Nv]:i.NEAREST_MIPMAP_NEAREST,[Bc]:i.NEAREST_MIPMAP_LINEAR,[Gi]:i.LINEAR,[Pf]:i.LINEAR_MIPMAP_NEAREST,[_s]:i.LINEAR_MIPMAP_LINEAR},ce={[kv]:i.NEVER,[Xv]:i.ALWAYS,[Vv]:i.LESS,[_g]:i.LEQUAL,[zv]:i.EQUAL,[Wv]:i.GEQUAL,[Hv]:i.GREATER,[Gv]:i.NOTEQUAL};function De(P,E){if(E.type===qi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Gi||E.magFilter===Pf||E.magFilter===Bc||E.magFilter===_s||E.minFilter===Gi||E.minFilter===Pf||E.minFilter===Bc||E.minFilter===_s)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,te[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,te[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,te[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,L[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,L[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ce[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Qn||E.minFilter!==Bc&&E.minFilter!==_s||E.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ke(P,E){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",w));let Q=E.source,j=d.get(Q);j===void 0&&(j={},d.set(Q,j));let K=V(E);if(K!==P.__cacheKey){j[K]===void 0&&(j[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),j[K].usedTimes++;let ve=j[P.__cacheKey];ve!==void 0&&(j[P.__cacheKey].usedTimes--,ve.usedTimes===0&&v(E)),P.__cacheKey=K,P.__webglTexture=j[K].texture}return H}function He(P,E,H){return Math.floor(Math.floor(P/H)/E)}function Ae(P,E,H,Q){let K=P.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,H,Q,E.data);else{K.sort((oe,de)=>oe.start-de.start);let ve=0;for(let oe=1;oe<K.length;oe++){let de=K[ve],ke=K[oe],Ie=de.start+de.count,fe=He(ke.start,E.width,4),qe=He(de.start,E.width,4);ke.start<=Ie+1&&fe===qe&&He(ke.start+ke.count-1,E.width,4)===fe?de.count=Math.max(de.count,ke.start+ke.count-de.start):(++ve,K[ve]=ke)}K.length=ve+1;let ae=i.getParameter(i.UNPACK_ROW_LENGTH),Pe=i.getParameter(i.UNPACK_SKIP_PIXELS),pe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let oe=0,de=K.length;oe<de;oe++){let ke=K[oe],Ie=Math.floor(ke.start/4),fe=Math.ceil(ke.count/4),qe=Ie%E.width,F=Math.floor(Ie/E.width),re=fe,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,qe,F,re,le,H,Q,E.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ae),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Pe),i.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function Z(P,E,H){let Q=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=i.TEXTURE_3D);let j=Ke(P,E),K=E.source;t.bindTexture(Q,P.__webglTexture,i.TEXTURE0+H);let ve=n.get(K);if(K.version!==ve.__version||j===!0){t.activeTexture(i.TEXTURE0+H);let ae=dt.getPrimaries(dt.workingColorSpace),Pe=E.colorSpace===Ur?null:dt.getPrimaries(E.colorSpace),pe=E.colorSpace===Ur||ae===Pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let oe=_(E.image,!1,r.maxTextureSize);oe=Le(E,oe);let de=s.convert(E.format,E.colorSpace),ke=s.convert(E.type),Ie=M(E.internalFormat,de,ke,E.colorSpace,E.isVideoTexture);De(Q,E);let fe,qe=E.mipmaps,F=E.isVideoTexture!==!0,re=ve.__version===void 0||j===!0,le=K.dataReady,ge=b(E,oe);if(E.isDepthTexture)Ie=x(E.format===Ia,E.type),re&&(F?t.texStorage2D(i.TEXTURE_2D,1,Ie,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ie,oe.width,oe.height,0,de,ke,null));else if(E.isDataTexture)if(qe.length>0){F&&re&&t.texStorage2D(i.TEXTURE_2D,ge,Ie,qe[0].width,qe[0].height);for(let ie=0,ee=qe.length;ie<ee;ie++)fe=qe[ie],F?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,ke,fe.data):t.texImage2D(i.TEXTURE_2D,ie,Ie,fe.width,fe.height,0,de,ke,fe.data);E.generateMipmaps=!1}else F?(re&&t.texStorage2D(i.TEXTURE_2D,ge,Ie,oe.width,oe.height),le&&Ae(E,oe,de,ke)):t.texImage2D(i.TEXTURE_2D,0,Ie,oe.width,oe.height,0,de,ke,oe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){F&&re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ie,qe[0].width,qe[0].height,oe.depth);for(let ie=0,ee=qe.length;ie<ee;ie++)if(fe=qe[ie],E.format!==Li)if(de!==null)if(F){if(le)if(E.layerUpdates.size>0){let we=wg(fe.width,fe.height,E.format,E.type);for(let ze of E.layerUpdates){let pt=fe.data.subarray(ze*we/fe.data.BYTES_PER_ELEMENT,(ze+1)*we/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ze,fe.width,fe.height,1,de,pt)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,oe.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Ie,fe.width,fe.height,oe.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,oe.depth,de,ke,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Ie,fe.width,fe.height,oe.depth,0,de,ke,fe.data)}else{F&&re&&t.texStorage2D(i.TEXTURE_2D,ge,Ie,qe[0].width,qe[0].height);for(let ie=0,ee=qe.length;ie<ee;ie++)fe=qe[ie],E.format!==Li?de!==null?F?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Ie,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,ke,fe.data):t.texImage2D(i.TEXTURE_2D,ie,Ie,fe.width,fe.height,0,de,ke,fe.data)}else if(E.isDataArrayTexture)if(F){if(re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ie,oe.width,oe.height,oe.depth),le)if(E.layerUpdates.size>0){let ie=wg(oe.width,oe.height,E.format,E.type);for(let ee of E.layerUpdates){let we=oe.data.subarray(ee*ie/oe.data.BYTES_PER_ELEMENT,(ee+1)*ie/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,oe.width,oe.height,1,de,ke,we)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,de,ke,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,oe.width,oe.height,oe.depth,0,de,ke,oe.data);else if(E.isData3DTexture)F?(re&&t.texStorage3D(i.TEXTURE_3D,ge,Ie,oe.width,oe.height,oe.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,de,ke,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,oe.width,oe.height,oe.depth,0,de,ke,oe.data);else if(E.isFramebufferTexture){if(re)if(F)t.texStorage2D(i.TEXTURE_2D,ge,Ie,oe.width,oe.height);else{let ie=oe.width,ee=oe.height;for(let we=0;we<ge;we++)t.texImage2D(i.TEXTURE_2D,we,Ie,ie,ee,0,de,ke,null),ie>>=1,ee>>=1}}else if(qe.length>0){if(F&&re){let ie=st(qe[0]);t.texStorage2D(i.TEXTURE_2D,ge,Ie,ie.width,ie.height)}for(let ie=0,ee=qe.length;ie<ee;ie++)fe=qe[ie],F?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,de,ke,fe):t.texImage2D(i.TEXTURE_2D,ie,Ie,de,ke,fe);E.generateMipmaps=!1}else if(F){if(re){let ie=st(oe);t.texStorage2D(i.TEXTURE_2D,ge,Ie,ie.width,ie.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,ke,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ie,de,ke,oe);m(E)&&p(Q),ve.__version=K.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function $(P,E,H){if(E.image.length!==6)return;let Q=Ke(P,E),j=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);let K=n.get(j);if(j.version!==K.__version||Q===!0){t.activeTexture(i.TEXTURE0+H);let ve=dt.getPrimaries(dt.workingColorSpace),ae=E.colorSpace===Ur?null:dt.getPrimaries(E.colorSpace),Pe=E.colorSpace===Ur||ve===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let pe=E.isCompressedTexture||E.image[0].isCompressedTexture,oe=E.image[0]&&E.image[0].isDataTexture,de=[];for(let ee=0;ee<6;ee++)!pe&&!oe?de[ee]=_(E.image[ee],!0,r.maxCubemapSize):de[ee]=oe?E.image[ee].image:E.image[ee],de[ee]=Le(E,de[ee]);let ke=de[0],Ie=s.convert(E.format,E.colorSpace),fe=s.convert(E.type),qe=M(E.internalFormat,Ie,fe,E.colorSpace),F=E.isVideoTexture!==!0,re=K.__version===void 0||Q===!0,le=j.dataReady,ge=b(E,ke);De(i.TEXTURE_CUBE_MAP,E);let ie;if(pe){F&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,qe,ke.width,ke.height);for(let ee=0;ee<6;ee++){ie=de[ee].mipmaps;for(let we=0;we<ie.length;we++){let ze=ie[we];E.format!==Li?Ie!==null?F?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,0,0,ze.width,ze.height,Ie,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,qe,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,0,0,ze.width,ze.height,Ie,fe,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,qe,ze.width,ze.height,0,Ie,fe,ze.data)}}}else{if(ie=E.mipmaps,F&&re){ie.length>0&&ge++;let ee=st(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,qe,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(oe){F?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,de[ee].width,de[ee].height,Ie,fe,de[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,de[ee].width,de[ee].height,0,Ie,fe,de[ee].data);for(let we=0;we<ie.length;we++){let pt=ie[we].image[ee].image;F?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,0,0,pt.width,pt.height,Ie,fe,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,qe,pt.width,pt.height,0,Ie,fe,pt.data)}}else{F?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ie,fe,de[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,Ie,fe,de[ee]);for(let we=0;we<ie.length;we++){let ze=ie[we];F?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,0,0,Ie,fe,ze.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,qe,Ie,fe,ze.image[ee])}}}m(E)&&p(i.TEXTURE_CUBE_MAP),K.__version=j.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function se(P,E,H,Q,j,K){let ve=s.convert(H.format,H.colorSpace),ae=s.convert(H.type),Pe=M(H.internalFormat,ve,ae,H.colorSpace),pe=n.get(E),oe=n.get(H);if(oe.__renderTarget=E,!pe.__hasExternalTextures){let de=Math.max(1,E.width>>K),ke=Math.max(1,E.height>>K);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,K,Pe,de,ke,E.depth,0,ve,ae,null):t.texImage2D(j,K,Pe,de,ke,0,ve,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),J(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,j,oe.__webglTexture,0,je(E)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,j,oe.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(P,E,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){let Q=E.depthTexture,j=Q&&Q.isDepthTexture?Q.type:null,K=x(E.stencilBuffer,j),ve=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=je(E);J(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,K,E.width,E.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,K,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,K,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,P)}else{let Q=E.textures;for(let j=0;j<Q.length;j++){let K=Q[j],ve=s.convert(K.format,K.colorSpace),ae=s.convert(K.type),Pe=M(K.internalFormat,ve,ae,K.colorSpace),pe=je(E);H&&J(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,Pe,E.width,E.height):J(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe,Pe,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Pe,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ye(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(E.depthTexture);Q.__renderTarget=E,(!Q.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);let j=Q.__webglTexture,K=je(E);if(E.depthTexture.format===_a)J(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(E.depthTexture.format===Ia)J(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Oe(P){let E=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let Q=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){let j=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",j)};Q.addEventListener("dispose",j),E.__depthDisposeCallback=j}E.__boundDepthTexture=Q}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let Q=P.texture.mipmaps;Q&&Q.length>0?ye(E.__webglFramebuffer[0],P):ye(E.__webglFramebuffer,P)}else if(H){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=i.createRenderbuffer(),Me(E.__webglDepthbuffer[Q],P,!1);else{let j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,K)}}else{let Q=P.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Me(E.__webglDepthbuffer,P,!1);else{let j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(P,E,H){let Q=n.get(P);E!==void 0&&se(Q.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Oe(P)}function I(P){let E=P.texture,H=n.get(P),Q=n.get(E);P.addEventListener("dispose",T);let j=P.textures,K=P.isWebGLCubeRenderTarget===!0,ve=j.length>1;if(ve||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=E.version,o.memory.textures++),K){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[ae]=[];for(let Pe=0;Pe<E.mipmaps.length;Pe++)H.__webglFramebuffer[ae][Pe]=i.createFramebuffer()}else H.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let ae=0;ae<E.mipmaps.length;ae++)H.__webglFramebuffer[ae]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ve)for(let ae=0,Pe=j.length;ae<Pe;ae++){let pe=n.get(j[ae]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&J(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ae=0;ae<j.length;ae++){let Pe=j[ae];H.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);let pe=s.convert(Pe.format,Pe.colorSpace),oe=s.convert(Pe.type),de=M(Pe.internalFormat,pe,oe,Pe.colorSpace,P.isXRRenderTarget===!0),ke=je(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,de,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,H.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Me(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),De(i.TEXTURE_CUBE_MAP,E);for(let ae=0;ae<6;ae++)if(E.mipmaps&&E.mipmaps.length>0)for(let Pe=0;Pe<E.mipmaps.length;Pe++)se(H.__webglFramebuffer[ae][Pe],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe);else se(H.__webglFramebuffer[ae],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(E)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ae=0,Pe=j.length;ae<Pe;ae++){let pe=j[ae],oe=n.get(pe),de=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(de=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,oe.__webglTexture),De(de,pe),se(H.__webglFramebuffer,P,pe,i.COLOR_ATTACHMENT0+ae,de,0),m(pe)&&p(de)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ae=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,Q.__webglTexture),De(ae,E),E.mipmaps&&E.mipmaps.length>0)for(let Pe=0;Pe<E.mipmaps.length;Pe++)se(H.__webglFramebuffer[Pe],P,E,i.COLOR_ATTACHMENT0,ae,Pe);else se(H.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,ae,0);m(E)&&p(ae),t.unbindTexture()}P.depthBuffer&&Oe(P)}function Ge(P){let E=P.textures;for(let H=0,Q=E.length;H<Q;H++){let j=E[H];if(m(j)){let K=S(P),ve=n.get(j).__webglTexture;t.bindTexture(K,ve),p(K),t.unbindTexture()}}}let Ee=[],Te=[];function N(P){if(P.samples>0){if(J(P)===!1){let E=P.textures,H=P.width,Q=P.height,j=i.COLOR_BUFFER_BIT,K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(P),ae=E.length>1;if(ae)for(let pe=0;pe<E.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);let Pe=P.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let pe=0;pe<E.length;pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[pe]);let oe=n.get(E[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,oe,0)}i.blitFramebuffer(0,0,H,Q,0,0,H,Q,j,i.NEAREST),l===!0&&(Ee.length=0,Te.length=0,Ee.push(i.COLOR_ATTACHMENT0+pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ee.push(K),Te.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Te)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let pe=0;pe<E.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,ve.__webglColorRenderbuffer[pe]);let oe=n.get(E[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function je(P){return Math.min(r.maxSamples,P.samples)}function J(P){let E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function he(P){let E=o.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function Le(P,E){let H=P.colorSpace,Q=P.format,j=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==ro&&H!==Ur&&(dt.getTransfer(H)===vt?(Q!==Li||j!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function st(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=W,this.setTexture2DArray=G,this.setTexture3D=X,this.setTextureCube=z,this.rebindTextures=$e,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=se,this.useMultisampledRTT=J}function VR(i,e){function t(n,r=Ur){let s,o=dt.getTransfer(r);if(n===Xi)return i.UNSIGNED_BYTE;if(n===Df)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lf)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dg)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ug)return i.BYTE;if(n===hg)return i.SHORT;if(n===Ca)return i.UNSIGNED_SHORT;if(n===If)return i.INT;if(n===xs)return i.UNSIGNED_INT;if(n===qi)return i.FLOAT;if(n===Ra)return i.HALF_FLOAT;if(n===pg)return i.ALPHA;if(n===mg)return i.RGB;if(n===Li)return i.RGBA;if(n===_a)return i.DEPTH_COMPONENT;if(n===Ia)return i.DEPTH_STENCIL;if(n===Ff)return i.RED;if(n===Nf)return i.RED_INTEGER;if(n===gg)return i.RG;if(n===Uf)return i.RG_INTEGER;if(n===Of)return i.RGBA_INTEGER;if(n===kc||n===Vc||n===zc||n===Hc)if(o===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===kc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===kc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bf||n===kf||n===Vf||n===zf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Bf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Hf||n===Gf||n===Wf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Hf||n===Gf)return o===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Wf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xf||n===qf||n===Yf||n===Zf||n===Kf||n===$f||n===Jf||n===Qf||n===jf||n===ed||n===td||n===nd||n===id||n===rd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Xf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Kf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$f)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jf)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ed)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===td)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nd)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===id)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rd)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sd||n===od||n===ad)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===sd)return o===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===od)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ad)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ld||n===cd||n===ud||n===hd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ld)return s.COMPRESSED_RED_RGTC1_EXT;if(n===cd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ud)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pa?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var zR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,HR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Bg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Rc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ei({vertexShader:zR,fragmentShader:HR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kg=class extends Ir{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new Bg,p={},S=t.getContextAttributes(),M=null,x=null,b=[],w=[],T=new tt,C=null,v=new mn;v.viewport=new yt;let y=new mn;y.viewport=new yt;let R=[v,y],D=new xf,U=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let $=b[Z];return $===void 0&&($=new Ma,b[Z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Z){let $=b[Z];return $===void 0&&($=new Ma,b[Z]=$),$.getGripSpace()},this.getHand=function(Z){let $=b[Z];return $===void 0&&($=new Ma,b[Z]=$),$.getHandSpace()};function W(Z){let $=w.indexOf(Z.inputSource);if($===-1)return;let se=b[$];se!==void 0&&(se.update(Z.inputSource,Z.frame,c||o),se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",X);for(let Z=0;Z<b.length;Z++){let $=w[Z];$!==null&&(w[Z]=null,b[Z].disconnect($))}U=null,V=null,m.reset();for(let Z in p)delete p[Z];e.setRenderTarget(M),f=null,d=null,h=null,r=null,x=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",G),r.addEventListener("inputsourceschange",X),S.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Me=null,ye=null;S.depth&&(ye=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=S.stencil?Ia:_a,Me=S.stencil?Pa:xs);let Oe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Oe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Ii(d.textureWidth,d.textureHeight,{format:Li,type:Xi,depthTexture:new Cc(d.textureWidth,d.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let se={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ii(f.framebufferWidth,f.framebufferHeight,{format:Li,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ae.setContext(r),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(Z){for(let $=0;$<Z.removed.length;$++){let se=Z.removed[$],Me=w.indexOf(se);Me>=0&&(w[Me]=null,b[Me].disconnect(se))}for(let $=0;$<Z.added.length;$++){let se=Z.added[$],Me=w.indexOf(se);if(Me===-1){for(let Oe=0;Oe<b.length;Oe++)if(Oe>=w.length){w.push(se),Me=Oe;break}else if(w[Oe]===null){w[Oe]=se,Me=Oe;break}if(Me===-1)break}let ye=b[Me];ye&&ye.connect(se)}}let z=new O,te=new O;function L(Z,$,se){z.setFromMatrixPosition($.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);let Me=z.distanceTo(te),ye=$.projectionMatrix.elements,Oe=se.projectionMatrix.elements,$e=ye[14]/(ye[10]-1),I=ye[14]/(ye[10]+1),Ge=(ye[9]+1)/ye[5],Ee=(ye[9]-1)/ye[5],Te=(ye[8]-1)/ye[0],N=(Oe[8]+1)/Oe[0],je=$e*Te,J=$e*N,he=Me/(-Te+N),Le=he*-Te;if($.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Le),Z.translateZ(he),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ye[10]===-1)Z.projectionMatrix.copy($.projectionMatrix),Z.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let st=$e+he,P=I+he,E=je-Le,H=J+(Me-Le),Q=Ge*I/P*st,j=Ee*I/P*st;Z.projectionMatrix.makePerspective(E,H,Q,j,st,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,$){$===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices($.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let $=Z.near,se=Z.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(se=m.depthFar)),D.near=y.near=v.near=$,D.far=y.far=v.far=se,(U!==D.near||V!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,V=D.far),D.layers.mask=Z.layers.mask|6,v.layers.mask=D.layers.mask&3,y.layers.mask=D.layers.mask&5;let Me=Z.parent,ye=D.cameras;ce(D,Me);for(let Oe=0;Oe<ye.length;Oe++)ce(ye[Oe],Me);ye.length===2?L(D,v,y):D.projectionMatrix.copy(v.projectionMatrix),De(Z,D,Me)};function De(Z,$,se){se===null?Z.matrix.copy($.matrixWorld):(Z.matrix.copy(se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply($.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy($.projectionMatrix),Z.projectionMatrixInverse.copy($.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xa*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(Z){return p[Z]};let Ke=null;function He(Z,$){if(u=$.getViewerPose(c||o),g=$,u!==null){let se=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Me=!1;se.length!==D.cameras.length&&(D.cameras.length=0,Me=!0);for(let I=0;I<se.length;I++){let Ge=se[I],Ee=null;if(f!==null)Ee=f.getViewport(Ge);else{let N=h.getViewSubImage(d,Ge);Ee=N.viewport,I===0&&(e.setRenderTargetTextures(x,N.colorTexture,N.depthStencilTexture),e.setRenderTarget(x))}let Te=R[I];Te===void 0&&(Te=new mn,Te.layers.enable(I),Te.viewport=new yt,R[I]=Te),Te.matrix.fromArray(Ge.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ge.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ee.x,Ee.y,Ee.width,Ee.height),I===0&&(D.matrix.copy(Te.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Me===!0&&D.cameras.push(Te)}let ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let I=h.getDepthInformation(se[0]);I&&I.isValid&&I.texture&&m.init(I,r.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let I=0;I<se.length;I++){let Ge=se[I].camera;if(Ge){let Ee=p[Ge];Ee||(Ee=new Rc,p[Ge]=Ee);let Te=h.getCameraImage(Ge);Ee.sourceTexture=Te}}}}for(let se=0;se<b.length;se++){let Me=w[se],ye=b[se];Me!==null&&ye!==void 0&&ye.update(Me,$,c||o)}Ke&&Ke(Z,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let Ae=new vM;Ae.setAnimationLoop(He),this.setAnimationLoop=function(Z){Ke=Z},this.dispose=function(){}}},go=new Di,GR=new wt;function WR(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Mg(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,S,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===_n&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===_n&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p),M=S.envMap,x=S.envMapRotation;M&&(m.envMap.value=M,go.copy(x),go.x*=-1,go.y*=-1,go.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(go.y*=-1,go.z*=-1),m.envMapRotation.value.setFromMatrix4(GR.makeRotationFromEuler(go)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===_n&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function XR(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){let x=M.program;n.uniformBlockBinding(S,x)}function c(S,M){let x=r[S.id];x===void 0&&(g(S),x=u(S),r[S.id]=x,S.addEventListener("dispose",m));let b=M.program;n.updateUBOMapping(S,b);let w=e.render.frame;s[S.id]!==w&&(d(S),s[S.id]=w)}function u(S){let M=h();S.__bindingPointIndex=M;let x=i.createBuffer(),b=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let M=r[S.id],x=S.uniforms,b=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,T=x.length;w<T;w++){let C=Array.isArray(x[w])?x[w]:[x[w]];for(let v=0,y=C.length;v<y;v++){let R=C[v];if(f(R,w,v,b)===!0){let D=R.__offset,U=Array.isArray(R.value)?R.value:[R.value],V=0;for(let W=0;W<U.length;W++){let G=U[W],X=_(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,D+V,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,V),V+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,x,b){let w=S.value,T=M+"_"+x;if(b[T]===void 0)return typeof w=="number"||typeof w=="boolean"?b[T]=w:b[T]=w.clone(),!0;{let C=b[T];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return b[T]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(S){let M=S.uniforms,x=0,b=16;for(let T=0,C=M.length;T<C;T++){let v=Array.isArray(M[T])?M[T]:[M[T]];for(let y=0,R=v.length;y<R;y++){let D=v[y],U=Array.isArray(D.value)?D.value:[D.value];for(let V=0,W=U.length;V<W;V++){let G=U[V],X=_(G),z=x%b,te=z%X.boundary,L=z+te;x+=te,L!==0&&b-L<X.storage&&(x+=b-L),D.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=x,x+=X.storage}}}let w=x%b;return w>0&&(x+=b-w),S.__size=x,S.__cache={},this}function _(S){let M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){let M=S.target;M.removeEventListener("dispose",m);let x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(let S in r)i.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var gd=class{constructor(e={}){let{canvas:t=qv(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,S=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,b=!1;this._outputColorSpace=gi;let w=0,T=0,C=null,v=-1,y=null,R=new yt,D=new yt,U=null,V=new Ye(0),W=0,G=t.width,X=t.height,z=1,te=null,L=null,ce=new yt(0,0,G,X),De=new yt(0,0,G,X),Ke=!1,He=new Sa,Ae=!1,Z=!1,$=new wt,se=new O,Me=new yt,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Oe=!1;function $e(){return C===null?z:1}let I=n;function Ge(A,B){return t.getContext(A,B)}try{let A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",ie,!1),I===null){let B="webgl2";if(I=Ge(B,A),I===null)throw Ge(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ee,Te,N,je,J,he,Le,st,P,E,H,Q,j,K,ve,ae,Pe,pe,oe,de,ke,Ie,fe,qe;function F(){Ee=new cC(I),Ee.init(),Ie=new VR(I,Ee),Te=new nC(I,Ee,e,Ie),N=new BR(I,Ee),Te.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),je=new fC(I),J=new wR,he=new kR(I,Ee,N,J,Te,Ie,je),Le=new rC(x),st=new lC(x),P=new xw(I),fe=new eC(I,P),E=new uC(I,P,je,fe),H=new pC(I,E,P,je),oe=new dC(I,Te,he),ae=new iC(J),Q=new TR(x,Le,st,Ee,Te,fe,ae),j=new WR(x,J),K=new AR,ve=new LR(Ee),pe=new jA(x,Le,st,N,H,f,l),Pe=new UR(x,H,Te),qe=new XR(I,je,Te,N),de=new tC(I,Ee,je),ke=new hC(I,Ee,je),je.programs=Q.programs,x.capabilities=Te,x.extensions=Ee,x.properties=J,x.renderLists=K,x.shadowMap=Pe,x.state=N,x.info=je}F();let re=new kg(x,I);this.xr=re,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let A=Ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(G,X,!1))},this.getSize=function(A){return A.set(G,X)},this.setSize=function(A,B,q=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=A,X=B,t.width=Math.floor(A*z),t.height=Math.floor(B*z),q===!0&&(t.style.width=A+"px",t.style.height=B+"px"),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(G*z,X*z).floor()},this.setDrawingBufferSize=function(A,B,q){G=A,X=B,z=q,t.width=Math.floor(A*q),t.height=Math.floor(B*q),this.setViewport(0,0,A,B)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(ce)},this.setViewport=function(A,B,q,Y){A.isVector4?ce.set(A.x,A.y,A.z,A.w):ce.set(A,B,q,Y),N.viewport(R.copy(ce).multiplyScalar(z).round())},this.getScissor=function(A){return A.copy(De)},this.setScissor=function(A,B,q,Y){A.isVector4?De.set(A.x,A.y,A.z,A.w):De.set(A,B,q,Y),N.scissor(D.copy(De).multiplyScalar(z).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(A){N.setScissorTest(Ke=A)},this.setOpaqueSort=function(A){te=A},this.setTransparentSort=function(A){L=A},this.getClearColor=function(A){return A.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor(...arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,q=!0){let Y=0;if(A){let k=!1;if(C!==null){let ne=C.texture.format;k=ne===Of||ne===Uf||ne===Nf}if(k){let ne=C.texture.type,ue=ne===Xi||ne===xs||ne===Ca||ne===Pa||ne===Df||ne===Lf,Ce=pe.getClearColor(),Se=pe.getClearAlpha(),Ve=Ce.r,Ue=Ce.g,Ne=Ce.b;ue?(g[0]=Ve,g[1]=Ue,g[2]=Ne,g[3]=Se,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=Ve,_[1]=Ue,_[2]=Ne,_[3]=Se,I.clearBufferiv(I.COLOR,0,_))}else Y|=I.COLOR_BUFFER_BIT}B&&(Y|=I.DEPTH_BUFFER_BIT),q&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),pe.dispose(),K.dispose(),ve.dispose(),J.dispose(),Le.dispose(),st.dispose(),H.dispose(),fe.dispose(),qe.dispose(),Q.dispose(),re.dispose(),re.removeEventListener("sessionstart",Je),re.removeEventListener("sessionend",me),We.stop()};function le(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let A=je.autoReset,B=Pe.enabled,q=Pe.autoUpdate,Y=Pe.needsUpdate,k=Pe.type;F(),je.autoReset=A,Pe.enabled=B,Pe.autoUpdate=q,Pe.needsUpdate=Y,Pe.type=k}function ie(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ee(A){let B=A.target;B.removeEventListener("dispose",ee),we(B)}function we(A){ze(A),J.remove(A)}function ze(A){let B=J.get(A).programs;B!==void 0&&(B.forEach(function(q){Q.releaseProgram(q)}),A.isShaderMaterial&&Q.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,q,Y,k,ne){B===null&&(B=ye);let ue=k.isMesh&&k.matrixWorld.determinant()<0,Ce=_t(A,B,q,Y,k);N.setMaterial(Y,ue);let Se=q.index,Ve=1;if(Y.wireframe===!0){if(Se=E.getWireframeAttribute(q),Se===void 0)return;Ve=2}let Ue=q.drawRange,Ne=q.attributes.position,et=Ue.start*Ve,ut=(Ue.start+Ue.count)*Ve;ne!==null&&(et=Math.max(et,ne.start*Ve),ut=Math.min(ut,(ne.start+ne.count)*Ve)),Se!==null?(et=Math.max(et,0),ut=Math.min(ut,Se.count)):Ne!=null&&(et=Math.max(et,0),ut=Math.min(ut,Ne.count));let Ht=ut-et;if(Ht<0||Ht===1/0)return;fe.setup(k,Y,Ce,q,Se);let Ct,St=de;if(Se!==null&&(Ct=P.get(Se),St=ke,St.setIndex(Ct)),k.isMesh)Y.wireframe===!0?(N.setLineWidth(Y.wireframeLinewidth*$e()),St.setMode(I.LINES)):St.setMode(I.TRIANGLES);else if(k.isLine){let Xe=Y.linewidth;Xe===void 0&&(Xe=1),N.setLineWidth(Xe*$e()),k.isLineSegments?St.setMode(I.LINES):k.isLineLoop?St.setMode(I.LINE_LOOP):St.setMode(I.LINE_STRIP)}else k.isPoints?St.setMode(I.POINTS):k.isSprite&&St.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ya("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),St.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ee.get("WEBGL_multi_draw"))St.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Xe=k._multiDrawStarts,Ut=k._multiDrawCounts,mt=k._multiDrawCount,ni=Se?P.get(Se).bytesPerElement:1,Mo=J.get(Y).currentProgram.getUniforms();for(let ii=0;ii<mt;ii++)Mo.setValue(I,"_gl_DrawID",ii),St.render(Xe[ii]/ni,Ut[ii])}else if(k.isInstancedMesh)St.renderInstances(et,Ht,k.count);else if(q.isInstancedBufferGeometry){let Xe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ut=Math.min(q.instanceCount,Xe);St.renderInstances(et,Ht,Ut)}else St.render(et,Ht)};function pt(A,B,q){A.transparent===!0&&A.side===ar&&A.forceSinglePass===!1?(A.side=_n,A.needsUpdate=!0,Zt(A,B,q),A.side=Pr,A.needsUpdate=!0,Zt(A,B,q),A.side=ar):Zt(A,B,q)}this.compile=function(A,B,q=null){q===null&&(q=A),p=ve.get(q),p.init(B),M.push(p),q.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),A!==q&&A.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let Y=new Set;return A.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ne=k.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){let Ce=ne[ue];pt(Ce,q,k),Y.add(Ce)}else pt(ne,q,k),Y.add(ne)}),p=M.pop(),Y},this.compileAsync=function(A,B,q=null){let Y=this.compile(A,B,q);return new Promise(k=>{function ne(){if(Y.forEach(function(ue){J.get(ue).currentProgram.isReady()&&Y.delete(ue)}),Y.size===0){k(A);return}setTimeout(ne,10)}Ee.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let xe=null;function Fe(A){xe&&xe(A)}function Je(){We.stop()}function me(){We.start()}let We=new vM;We.setAnimationLoop(Fe),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(A){xe=A,re.setAnimationLoop(A),A===null?We.stop():We.start()},re.addEventListener("sessionstart",Je),re.addEventListener("sessionend",me),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(B),B=re.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,B,C),p=ve.get(A,M.length),p.init(B),M.push(p),$.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),He.setFromProjectionMatrix($,zi,B.reversedDepth),Z=this.localClippingEnabled,Ae=ae.init(this.clippingPlanes,Z),m=K.get(A,S.length),m.init(),S.push(m),re.enabled===!0&&re.isPresenting===!0){let ne=x.xr.getDepthSensingMesh();ne!==null&&Be(ne,B,-1/0,x.sortObjects)}Be(A,B,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(te,L),Oe=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Oe&&pe.addToRenderList(m,A),this.info.render.frame++,Ae===!0&&ae.beginShadows();let q=p.state.shadowsArray;Pe.render(q,A,B),Ae===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=m.opaque,k=m.transmissive;if(p.setupLights(),B.isArrayCamera){let ne=B.cameras;if(k.length>0)for(let ue=0,Ce=ne.length;ue<Ce;ue++){let Se=ne[ue];Yt(Y,k,A,Se)}Oe&&pe.render(A);for(let ue=0,Ce=ne.length;ue<Ce;ue++){let Se=ne[ue];Ze(m,A,Se,Se.viewport)}}else k.length>0&&Yt(Y,k,A,B),Oe&&pe.render(A),Ze(m,A,B);C!==null&&T===0&&(he.updateMultisampleRenderTarget(C),he.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(x,A,B),fe.resetDefaultState(),v=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],Ae===!0&&ae.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Be(A,B,q,Y){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||He.intersectsSprite(A)){Y&&Me.setFromMatrixPosition(A.matrixWorld).applyMatrix4($);let ue=H.update(A),Ce=A.material;Ce.visible&&m.push(A,ue,Ce,q,Me.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||He.intersectsObject(A))){let ue=H.update(A),Ce=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Me.copy(A.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Me.copy(ue.boundingSphere.center)),Me.applyMatrix4(A.matrixWorld).applyMatrix4($)),Array.isArray(Ce)){let Se=ue.groups;for(let Ve=0,Ue=Se.length;Ve<Ue;Ve++){let Ne=Se[Ve],et=Ce[Ne.materialIndex];et&&et.visible&&m.push(A,ue,et,q,Me.z,Ne)}}else Ce.visible&&m.push(A,ue,Ce,q,Me.z,null)}}let ne=A.children;for(let ue=0,Ce=ne.length;ue<Ce;ue++)Be(ne[ue],B,q,Y)}function Ze(A,B,q,Y){let k=A.opaque,ne=A.transmissive,ue=A.transparent;p.setupLightsView(q),Ae===!0&&ae.setGlobalState(x.clippingPlanes,q),Y&&N.viewport(R.copy(Y)),k.length>0&&nt(k,B,q),ne.length>0&&nt(ne,B,q),ue.length>0&&nt(ue,B,q),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function Yt(A,B,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Ii(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")||Ee.has("EXT_color_buffer_float")?Ra:Xi,minFilter:_s,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));let ne=p.state.transmissionRenderTarget[Y.id],ue=Y.viewport||R;ne.setSize(ue.z*x.transmissionResolutionScale,ue.w*x.transmissionResolutionScale);let Ce=x.getRenderTarget(),Se=x.getActiveCubeFace(),Ve=x.getActiveMipmapLevel();x.setRenderTarget(ne),x.getClearColor(V),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),Oe&&pe.render(q);let Ue=x.toneMapping;x.toneMapping=Nr;let Ne=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),Ae===!0&&ae.setGlobalState(x.clippingPlanes,Y),nt(A,q,Y),he.updateMultisampleRenderTarget(ne),he.updateRenderTargetMipmap(ne),Ee.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let ut=0,Ht=B.length;ut<Ht;ut++){let Ct=B[ut],St=Ct.object,Xe=Ct.geometry,Ut=Ct.material,mt=Ct.group;if(Ut.side===ar&&St.layers.test(Y.layers)){let ni=Ut.side;Ut.side=_n,Ut.needsUpdate=!0,Lt(St,q,Y,Xe,Ut,mt),Ut.side=ni,Ut.needsUpdate=!0,et=!0}}et===!0&&(he.updateMultisampleRenderTarget(ne),he.updateRenderTargetMipmap(ne))}x.setRenderTarget(Ce,Se,Ve),x.setClearColor(V,W),Ne!==void 0&&(Y.viewport=Ne),x.toneMapping=Ue}function nt(A,B,q){let Y=B.isScene===!0?B.overrideMaterial:null;for(let k=0,ne=A.length;k<ne;k++){let ue=A[k],Ce=ue.object,Se=ue.geometry,Ve=ue.group,Ue=ue.material;Ue.allowOverride===!0&&Y!==null&&(Ue=Y),Ce.layers.test(q.layers)&&Lt(Ce,B,q,Se,Ue,Ve)}}function Lt(A,B,q,Y,k,ne){A.onBeforeRender(x,B,q,Y,k,ne),A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),k.onBeforeRender(x,B,q,Y,A,ne),k.transparent===!0&&k.side===ar&&k.forceSinglePass===!1?(k.side=_n,k.needsUpdate=!0,x.renderBufferDirect(q,B,Y,k,A,ne),k.side=Pr,k.needsUpdate=!0,x.renderBufferDirect(q,B,Y,k,A,ne),k.side=ar):x.renderBufferDirect(q,B,Y,k,A,ne),A.onAfterRender(x,B,q,Y,k,ne)}function Zt(A,B,q){B.isScene!==!0&&(B=ye);let Y=J.get(A),k=p.state.lights,ne=p.state.shadowsArray,ue=k.state.version,Ce=Q.getParameters(A,k.state,ne,B,q),Se=Q.getProgramCacheKey(Ce),Ve=Y.programs;Y.environment=A.isMeshStandardMaterial?B.environment:null,Y.fog=B.fog,Y.envMap=(A.isMeshStandardMaterial?st:Le).get(A.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Ve===void 0&&(A.addEventListener("dispose",ee),Ve=new Map,Y.programs=Ve);let Ue=Ve.get(Se);if(Ue!==void 0){if(Y.currentProgram===Ue&&Y.lightsStateVersion===ue)return Mt(A,Ce),Ue}else Ce.uniforms=Q.getUniforms(A),A.onBeforeCompile(Ce,x),Ue=Q.acquireProgram(Ce,Se),Ve.set(Se,Ue),Y.uniforms=Ce.uniforms;let Ne=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ne.clippingPlanes=ae.uniform),Mt(A,Ce),Y.needsLights=At(A),Y.lightsStateVersion=ue,Y.needsLights&&(Ne.ambientLightColor.value=k.state.ambient,Ne.lightProbe.value=k.state.probe,Ne.directionalLights.value=k.state.directional,Ne.directionalLightShadows.value=k.state.directionalShadow,Ne.spotLights.value=k.state.spot,Ne.spotLightShadows.value=k.state.spotShadow,Ne.rectAreaLights.value=k.state.rectArea,Ne.ltc_1.value=k.state.rectAreaLTC1,Ne.ltc_2.value=k.state.rectAreaLTC2,Ne.pointLights.value=k.state.point,Ne.pointLightShadows.value=k.state.pointShadow,Ne.hemisphereLights.value=k.state.hemi,Ne.directionalShadowMap.value=k.state.directionalShadowMap,Ne.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ne.spotShadowMap.value=k.state.spotShadowMap,Ne.spotLightMatrix.value=k.state.spotLightMatrix,Ne.spotLightMap.value=k.state.spotLightMap,Ne.pointShadowMap.value=k.state.pointShadowMap,Ne.pointShadowMatrix.value=k.state.pointShadowMatrix),Y.currentProgram=Ue,Y.uniformsList=null,Ue}function Et(A){if(A.uniformsList===null){let B=A.currentProgram.getUniforms();A.uniformsList=Na.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function Mt(A,B){let q=J.get(A);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.batchingColor=B.batchingColor,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function _t(A,B,q,Y,k){B.isScene!==!0&&(B=ye),he.resetTextureUnits();let ne=B.fog,ue=Y.isMeshStandardMaterial?B.environment:null,Ce=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ro,Se=(Y.isMeshStandardMaterial?st:Le).get(Y.envMap||ue),Ve=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ue=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ne=!!q.morphAttributes.position,et=!!q.morphAttributes.normal,ut=!!q.morphAttributes.color,Ht=Nr;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ht=x.toneMapping);let Ct=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,St=Ct!==void 0?Ct.length:0,Xe=J.get(Y),Ut=p.state.lights;if(Ae===!0&&(Z===!0||A!==y)){let Dn=A===y&&Y.id===v;ae.setState(Y,A,Dn)}let mt=!1;Y.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Ut.state.version||Xe.outputColorSpace!==Ce||k.isBatchedMesh&&Xe.batching===!1||!k.isBatchedMesh&&Xe.batching===!0||k.isBatchedMesh&&Xe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Xe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Xe.instancing===!1||!k.isInstancedMesh&&Xe.instancing===!0||k.isSkinnedMesh&&Xe.skinning===!1||!k.isSkinnedMesh&&Xe.skinning===!0||k.isInstancedMesh&&Xe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Xe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Xe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Xe.instancingMorph===!1&&k.morphTexture!==null||Xe.envMap!==Se||Y.fog===!0&&Xe.fog!==ne||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==ae.numPlanes||Xe.numIntersection!==ae.numIntersection)||Xe.vertexAlphas!==Ve||Xe.vertexTangents!==Ue||Xe.morphTargets!==Ne||Xe.morphNormals!==et||Xe.morphColors!==ut||Xe.toneMapping!==Ht||Xe.morphTargetsCount!==St)&&(mt=!0):(mt=!0,Xe.__version=Y.version);let ni=Xe.currentProgram;mt===!0&&(ni=Zt(Y,B,k));let Mo=!1,ii=!1,qa=!1,Ot=ni.getUniforms(),vi=Xe.uniforms;if(N.useProgram(ni.program)&&(Mo=!0,ii=!0,qa=!0),Y.id!==v&&(v=Y.id,ii=!0),Mo||y!==A){N.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ot.setValue(I,"projectionMatrix",A.projectionMatrix),Ot.setValue(I,"viewMatrix",A.matrixWorldInverse);let Xn=Ot.map.cameraPosition;Xn!==void 0&&Xn.setValue(I,se.setFromMatrixPosition(A.matrixWorld)),Te.logarithmicDepthBuffer&&Ot.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ot.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,ii=!0,qa=!0)}if(k.isSkinnedMesh){Ot.setOptional(I,k,"bindMatrix"),Ot.setOptional(I,k,"bindMatrixInverse");let Dn=k.skeleton;Dn&&(Dn.boneTexture===null&&Dn.computeBoneTexture(),Ot.setValue(I,"boneTexture",Dn.boneTexture,he))}k.isBatchedMesh&&(Ot.setOptional(I,k,"batchingTexture"),Ot.setValue(I,"batchingTexture",k._matricesTexture,he),Ot.setOptional(I,k,"batchingIdTexture"),Ot.setValue(I,"batchingIdTexture",k._indirectTexture,he),Ot.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&Ot.setValue(I,"batchingColorTexture",k._colorsTexture,he));let Mi=q.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&oe.update(k,q,ni),(ii||Xe.receiveShadow!==k.receiveShadow)&&(Xe.receiveShadow=k.receiveShadow,Ot.setValue(I,"receiveShadow",k.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(vi.envMap.value=Se,vi.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&B.environment!==null&&(vi.envMapIntensity.value=B.environmentIntensity),ii&&(Ot.setValue(I,"toneMappingExposure",x.toneMappingExposure),Xe.needsLights&&ti(vi,qa),ne&&Y.fog===!0&&j.refreshFogUniforms(vi,ne),j.refreshMaterialUniforms(vi,Y,z,X,p.state.transmissionRenderTarget[A.id]),Na.upload(I,Et(Xe),vi,he)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Na.upload(I,Et(Xe),vi,he),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ot.setValue(I,"center",k.center),Ot.setValue(I,"modelViewMatrix",k.modelViewMatrix),Ot.setValue(I,"normalMatrix",k.normalMatrix),Ot.setValue(I,"modelMatrix",k.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Dn=Y.uniformsGroups;for(let Xn=0,Td=Dn.length;Xn<Td;Xn++){let ys=Dn[Xn];qe.update(ys,ni),qe.bind(ys,ni)}}return ni}function ti(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function At(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,B,q){let Y=J.get(A);Y.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),J.get(A.texture).__webglTexture=B,J.get(A.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:q,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){let q=J.get(A);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0};let In=I.createFramebuffer();this.setRenderTarget=function(A,B=0,q=0){C=A,w=B,T=q;let Y=!0,k=null,ne=!1,ue=!1;if(A){let Se=J.get(A);if(Se.__useDefaultFramebuffer!==void 0)N.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(Se.__webglFramebuffer===void 0)he.setupRenderTarget(A);else if(Se.__hasExternalTextures)he.rebindTextures(A,J.get(A.texture).__webglTexture,J.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ne=A.depthTexture;if(Se.__boundDepthTexture!==Ne){if(Ne!==null&&J.has(Ne)&&(A.width!==Ne.image.width||A.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(A)}}let Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ue=!0);let Ue=J.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ue[B])?k=Ue[B][q]:k=Ue[B],ne=!0):A.samples>0&&he.useMultisampledRTT(A)===!1?k=J.get(A).__webglMultisampledFramebuffer:Array.isArray(Ue)?k=Ue[q]:k=Ue,R.copy(A.viewport),D.copy(A.scissor),U=A.scissorTest}else R.copy(ce).multiplyScalar(z).floor(),D.copy(De).multiplyScalar(z).floor(),U=Ke;if(q!==0&&(k=In),N.bindFramebuffer(I.FRAMEBUFFER,k)&&Y&&N.drawBuffers(A,k),N.viewport(R),N.scissor(D),N.setScissorTest(U),ne){let Se=J.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,Se.__webglTexture,q)}else if(ue){let Se=B;for(let Ve=0;Ve<A.textures.length;Ve++){let Ue=J.get(A.textures[Ve]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ve,Ue.__webglTexture,q,Se)}}else if(A!==null&&q!==0){let Se=J.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Se.__webglTexture,q)}v=-1},this.readRenderTargetPixels=function(A,B,q,Y,k,ne,ue,Ce=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Se=Se[ue]),Se){N.bindFramebuffer(I.FRAMEBUFFER,Se);try{let Ve=A.textures[Ce],Ue=Ve.format,Ne=Ve.type;if(!Te.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-Y&&q>=0&&q<=A.height-k&&(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),I.readPixels(B,q,Y,k,Ie.convert(Ue),Ie.convert(Ne),ne))}finally{let Ve=C!==null?J.get(C).__webglFramebuffer:null;N.bindFramebuffer(I.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(A,B,q,Y,k,ne,ue,Ce=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Se=Se[ue]),Se)if(B>=0&&B<=A.width-Y&&q>=0&&q<=A.height-k){N.bindFramebuffer(I.FRAMEBUFFER,Se);let Ve=A.textures[Ce],Ue=Ve.format,Ne=Ve.type;if(!Te.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let et=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,et),I.bufferData(I.PIXEL_PACK_BUFFER,ne.byteLength,I.STREAM_READ),A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),I.readPixels(B,q,Y,k,Ie.convert(Ue),Ie.convert(Ne),0);let ut=C!==null?J.get(C).__webglFramebuffer:null;N.bindFramebuffer(I.FRAMEBUFFER,ut);let Ht=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Yv(I,Ht,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,et),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ne),I.deleteBuffer(et),I.deleteSync(Ht),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,q=0){let Y=Math.pow(2,-q),k=Math.floor(A.image.width*Y),ne=Math.floor(A.image.height*Y),ue=B!==null?B.x:0,Ce=B!==null?B.y:0;he.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,q,0,0,ue,Ce,k,ne),N.unbindTexture()};let yi=I.createFramebuffer(),tn=I.createFramebuffer();this.copyTextureToTexture=function(A,B,q=null,Y=null,k=0,ne=null){ne===null&&(k!==0?(ya("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=k,k=0):ne=0);let ue,Ce,Se,Ve,Ue,Ne,et,ut,Ht,Ct=A.isCompressedTexture?A.mipmaps[ne]:A.image;if(q!==null)ue=q.max.x-q.min.x,Ce=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Ve=q.min.x,Ue=q.min.y,Ne=q.isBox3?q.min.z:0;else{let Mi=Math.pow(2,-k);ue=Math.floor(Ct.width*Mi),Ce=Math.floor(Ct.height*Mi),A.isDataArrayTexture?Se=Ct.depth:A.isData3DTexture?Se=Math.floor(Ct.depth*Mi):Se=1,Ve=0,Ue=0,Ne=0}Y!==null?(et=Y.x,ut=Y.y,Ht=Y.z):(et=0,ut=0,Ht=0);let St=Ie.convert(B.format),Xe=Ie.convert(B.type),Ut;B.isData3DTexture?(he.setTexture3D(B,0),Ut=I.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(he.setTexture2DArray(B,0),Ut=I.TEXTURE_2D_ARRAY):(he.setTexture2D(B,0),Ut=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);let mt=I.getParameter(I.UNPACK_ROW_LENGTH),ni=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Mo=I.getParameter(I.UNPACK_SKIP_PIXELS),ii=I.getParameter(I.UNPACK_SKIP_ROWS),qa=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ct.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ct.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ve),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ne);let Ot=A.isDataArrayTexture||A.isData3DTexture,vi=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){let Mi=J.get(A),Dn=J.get(B),Xn=J.get(Mi.__renderTarget),Td=J.get(Dn.__renderTarget);N.bindFramebuffer(I.READ_FRAMEBUFFER,Xn.__webglFramebuffer),N.bindFramebuffer(I.DRAW_FRAMEBUFFER,Td.__webglFramebuffer);for(let ys=0;ys<Se;ys++)Ot&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,J.get(A).__webglTexture,k,Ne+ys),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,J.get(B).__webglTexture,ne,Ht+ys)),I.blitFramebuffer(Ve,Ue,ue,Ce,et,ut,ue,Ce,I.DEPTH_BUFFER_BIT,I.NEAREST);N.bindFramebuffer(I.READ_FRAMEBUFFER,null),N.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||A.isRenderTargetTexture||J.has(A)){let Mi=J.get(A),Dn=J.get(B);N.bindFramebuffer(I.READ_FRAMEBUFFER,yi),N.bindFramebuffer(I.DRAW_FRAMEBUFFER,tn);for(let Xn=0;Xn<Se;Xn++)Ot?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Mi.__webglTexture,k,Ne+Xn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Mi.__webglTexture,k),vi?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Dn.__webglTexture,ne,Ht+Xn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Dn.__webglTexture,ne),k!==0?I.blitFramebuffer(Ve,Ue,ue,Ce,et,ut,ue,Ce,I.COLOR_BUFFER_BIT,I.NEAREST):vi?I.copyTexSubImage3D(Ut,ne,et,ut,Ht+Xn,Ve,Ue,ue,Ce):I.copyTexSubImage2D(Ut,ne,et,ut,Ve,Ue,ue,Ce);N.bindFramebuffer(I.READ_FRAMEBUFFER,null),N.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else vi?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Ut,ne,et,ut,Ht,ue,Ce,Se,St,Xe,Ct.data):B.isCompressedArrayTexture?I.compressedTexSubImage3D(Ut,ne,et,ut,Ht,ue,Ce,Se,St,Ct.data):I.texSubImage3D(Ut,ne,et,ut,Ht,ue,Ce,Se,St,Xe,Ct):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ne,et,ut,ue,Ce,St,Xe,Ct.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ne,et,ut,Ct.width,Ct.height,St,Ct.data):I.texSubImage2D(I.TEXTURE_2D,ne,et,ut,ue,Ce,St,Xe,Ct);I.pixelStorei(I.UNPACK_ROW_LENGTH,mt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ni),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Mo),I.pixelStorei(I.UNPACK_SKIP_ROWS,ii),I.pixelStorei(I.UNPACK_SKIP_IMAGES,qa),ne===0&&B.generateMipmaps&&I.generateMipmap(Ut),N.unbindTexture()},this.initRenderTarget=function(A){J.get(A).__webglFramebuffer===void 0&&he.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?he.setTextureCube(A,0):A.isData3DTexture?he.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?he.setTexture2DArray(A,0):he.setTexture2D(A,0),N.unbindTexture()},this.resetState=function(){w=0,T=0,C=null,N.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};var xd=class extends ds{constructor(){super();let e=new sr;e.deleteAttribute("uv");let t=new Wi({side:_n}),n=new Wi,r=new Uc(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new ft(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new so(e,n,6),a=new $t;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new ft(e,Ba(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ft(e,Ba(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new ft(e,Ba(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let h=new ft(e,Ba(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);let d=new ft(e,Ba(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new ft(e,Ba(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ba(i){return new Lc({color:0,emissive:16777215,emissiveIntensity:i})}var xi,qR,yd,EM=function(){return xi||typeof window<"u"&&(xi=window.gsap)&&xi.registerPlugin&&xi},Gg=function(e,t){return!!(typeof e>"u"?t:e&&!~(e+"").indexOf("false"))},YR=function(e){if(xi=e||EM(),xi){yd=xi.registerEase;var t=xi.parseEase(),n=function(o){return function(a){var l=.5+a/2;o.config=function(c){return o(2*(1-c)*c*l+c*c)}}},r;for(r in t)t[r].config||n(t[r]);yd("slow",ka),yd("expoScale",qc),yd("rough",Xc);for(r in Wc)r!=="version"&&xi.core.globals(r,Wc[r]);qR=1}},AM=function(e,t,n){e=Math.min(1,e||.7);var r=e<1?t||t===0?t:.7:0,s=(1-e)/2,o=s+e,a=Gg(n);return function(l){var c=l+(.5-l)*r;return l<s?a?1-(l=1-l/s)*l:c-(l=1-l/s)*l*l*l*c:l>o?a?l===1?0:1-(l=(l-o)/s)*l:c+(l-c)*(l=(l-o)/s)*l*l*l:a?1:c}},CM=function(e,t,n){var r=Math.log(t/e),s=t-e;return n&&(n=xi.parseEase(n)),function(o){return(e*Math.exp(r*(n?n(o):o))-e)/s}},zg=function(e,t,n){this.t=e,this.v=t,n&&(this.next=n,n.prev=this,this.c=n.v-t,this.gap=n.t-e)},RM=function(e){typeof e!="object"&&(e={points:+e||20});for(var t=e.taper||"none",n=[],r=0,s=(+e.points||20)|0,o=s,a=Gg(e.randomize,!0),l=Gg(e.clamp),c=xi?xi.parseEase(e.template):0,u=(+e.strength||1)*.4,h,d,f,g,_,m,p;--o>-1;)h=a?Math.random():1/s*o,d=c?c(h):h,t==="none"?f=u:t==="out"?(g=1-h,f=g*g*u):t==="in"?f=h*h*u:h<.5?(g=h*2,f=g*g*.5*u):(g=(1-h)*2,f=g*g*.5*u),a?d+=Math.random()*f-f*.5:o%2?d+=f*.5:d-=f*.5,l&&(d>1?d=1:d<0&&(d=0)),n[r++]={x:h,y:d};for(n.sort(function(S,M){return S.x-M.x}),m=new zg(1,1,null),o=s;o--;)_=n[o],m=new zg(_.x,_.y,m);return p=new zg(0,0,m.t?m:m.next),function(S){var M=p;if(S>M.t){for(;M.next&&S>=M.t;)M=M.next;M=M.prev}else for(;M.prev&&S<=M.t;)M=M.prev;return p=M,M.v+(S-M.t)/M.gap*M.c}},ka=AM(.7);ka.ease=ka;ka.config=AM;var qc=CM(1,2);qc.config=CM;var Xc=RM();Xc.ease=Xc;Xc.config=RM;var Wc={SlowMo:ka,RoughEase:Xc,ExpoScaleEase:qc};for(Hg in Wc)Wc[Hg].register=YR,Wc[Hg].version="3.15.0";var Hg;EM()&&xi.registerPlugin(ka);var ZR=[[0,3.4,17],[10,4,8],[18,3,-3],[1,4,-19],[-13,3.4,-5]],KR=[[0,1.5,0],[0,2,0],[13,1.6,-12],[-10,2,-10],[-8,1.5,0]];function PM(){let i=new Ta(ZR.map(t=>new O(...t)),!1,"catmullrom",.4),e=new Ta(KR.map(t=>new O(...t)),!1,"catmullrom",.35);return t=>({position:i.getPoint(fo.clamp(t,0,1)),target:e.getPoint(fo.clamp(t,0,1))})}function IM(i,e=5){return Math.min(e-1,Math.max(0,Math.round(i*(e-1))))}Pt.registerPlugin(qc);var Wn={sky:16117759,soil:4409906,grass:9081457,water:3352647,chrome:13944303,glass:12887796,stone:10261669,sun:16773598,particles:6374518,light:16777215};function DM(i){let e;try{e=new gd({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{return{supported:!1,ready:Promise.resolve(),setProgress(){},enter(){return Promise.resolve()},setEnabled(){},dispose(){}}}e.setPixelRatio(Math.min(devicePixelRatio||1,1.5)),e.toneMapping=Af,e.toneMappingExposure=1.25;let t=new ds;t.background=new Ye(Wn.sky),t.fog=new wc(Wn.sky,.022);let n=new mn(42,1,.1,180),r=new Ua(e),s=new xd,o=r.fromScene(s,.05);t.environment=o.texture,s.dispose(),r.dispose(),t.add(new Nc(Wn.light,Wn.grass,2.1));let a=new Aa(Wn.sun,3.5);a.position.set(8,18,12),t.add(a);let l=new Aa(Wn.glass,2);l.position.set(-15,6,-10),t.add(l);let c=new ps(135,135,90,90);c.rotateX(-Math.PI/2);let u=c.attributes.position;for(let J=0;J<u.count;J++){let he=u.getX(J),Le=u.getZ(J),st=Math.hypot(he,Le),P=1-fo.smoothstep(st,10,18),E=Math.sin(he*.11)*Math.cos(Le*.09)*1.4+Math.sin(he*.21+Le*.13)*.4;u.setY(J,-1.3+E-P*1.5)}c.computeVertexNormals(),t.add(new ft(c,new Wi({color:Wn.soil,roughness:.95})));let h=new ft(new Pc(12.8,96),new ao({color:Wn.water,metalness:.6,roughness:.12,clearcoat:1}));h.rotation.x=-Math.PI/2,h.position.y=-1.45,t.add(h);let d=new Wi({color:Wn.stone,roughness:.45,metalness:.2}),f=new ao({color:Wn.chrome,metalness:.92,roughness:.14,clearcoat:1}),g=new ao({color:Wn.glass,roughness:.08,transmission:.9,thickness:1.3,ior:1.45,metalness:0,clearcoat:1}),_=new Hi;_.position.set(0,2,0),t.add(_);let m=new ft(new Dc(1.85,.34,160,20,2,3),f);m.rotation.set(.3,0,.25),_.add(m);let p=new ft(new oo(3.3,.12,12,120),g);p.rotation.x=.9,p.rotation.y=.4,_.add(p);let S=new ft(new wa(.65,3),g);S.position.set(2.7,.8,1),_.add(S);let M=window.innerWidth<700?2200:5e3,x=new Float32Array(M*3),b=new Float32Array(M);for(let J=0;J<M;J++){let he=J/M*Math.PI*2,Le=2.7+.32*Math.sin(he*19);x[J*3]=Math.cos(he*2)*Le,x[J*3+1]=Math.sin(he*3)*1.5,x[J*3+2]=Math.sin(he*2)*Le,b[J]=Math.random()}let w=new Rn;w.setAttribute("position",new gn(x,3)),w.setAttribute("aSeed",new gn(b,1));let T=new ei({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uProgress:{value:0},uColor:{value:new Ye(Wn.particles)}},vertexShader:`attribute float aSeed;uniform float uTime;uniform float uProgress;varying float vAlpha;
 void main(){vec3 p=position;float angle=aSeed*6.283185;vec3 ball=normalize(position+vec3(.01))*3.2;float morph=smoothstep(.05,.32,uProgress)*(1.0-smoothstep(.38,.7,uProgress));p=mix(p,ball,morph);p+=.08*sin(vec3(angle)+uTime*.6);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(32.0/-mv.z,1.,4.);vAlpha=.45+.5*sin(aSeed*20.+uTime*.3);}`,fragmentShader:"uniform vec3 uColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(uColor,vAlpha*smoothstep(.5,.1,d));}"}),C=new Ac(w,T);_.add(C);let v=new Hi;v.position.set(13,-.7,-12),t.add(v);for(let J=0;J<11;J++){let he=2.5+J%4*.65,Le=new ft(new ba(.1,.16,he,8),f);Le.position.set(Math.sin(J*2.4)*1.3,he/2,Math.cos(J*2.4)*1.3),Le.rotation.z=Math.sin(J)*.35,v.add(Le);let st=new ft(new wa(.65+J%3*.15,1),J%3?g:f);st.position.copy(Le.position),st.position.y+=he/2,st.scale.y=1.35,v.add(st)}let y=new Hi;y.position.set(-10,-.7,-10),t.add(y);for(let J of[-2,2]){let he=new ft(new sr(1,6,1.7),d);he.position.set(J,2.7,0),y.add(he)}let R=new ft(new oo(2,.5,12,70,Math.PI),f);R.position.y=5.5,y.add(R);let D=new ft(new oo(2,.55,20,90),g);D.position.set(-8,1.8,0),D.rotation.set(.4,0,.5),t.add(D);let U=new $t,V=new Ic(.045,.7,3),W=new Wi({color:Wn.grass,roughness:1}),G=window.innerWidth<700?1400:3500,X=new so(V,W,G),z=0;for(let J=0;J<G*4&&z<G;J++){let he=(Math.random()-.5)*75,Le=(Math.random()-.5)*75;if(Math.hypot(he,Le)<14)continue;let P=Math.sin(he*.11)*Math.cos(Le*.09)*1.4+Math.sin(he*.21+Le*.13)*.4;U.position.set(he,-.95+P,Le),U.rotation.set(.15*Math.sin(J),J*1.3,.15*Math.cos(J)),U.scale.setScalar(.6+Math.random()*.8),U.updateMatrix(),X.setMatrixAt(z++,U.matrix)}X.count=z,t.add(X);let te=new Ii(1,1,{depthBuffer:!0}),L=new ds,ce=new co(-1,1,1,-1,0,1),De=new ei({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{uScene:{value:te.texture},uOpening:{value:0},uAspect:{value:1},uPaper:{value:new Ye(Wn.sky)},uEdge:{value:new Ye(Wn.glass)}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`
 uniform sampler2D uScene;uniform float uOpening;uniform float uAspect;uniform vec3 uPaper;uniform vec3 uEdge;varying vec2 vUv;
 void main(){
  vec2 q=(vUv-.5)*vec2(uAspect,1.);float d=length(q);float radius=uOpening*length(vec2(uAspect,1.))*.7;
  float envelope=sin(uOpening*3.14159265);float ripple=exp(-abs(d-radius)*65.)*envelope;
  vec2 radial=normalize(q+vec2(.0001))/vec2(uAspect,1.);vec2 displaced=vUv+radial*ripple*.025;
  float r=texture2D(uScene,displaced+radial*ripple*.006).r;
  float g=texture2D(uScene,displaced).g;
  float b=texture2D(uScene,displaced-radial*ripple*.006).b;
  float visible=1.-smoothstep(radius-.015,radius+.015,d);
  vec3 color=mix(uPaper,vec3(r,g,b),visible);color=mix(color,uEdge,ripple*.2);
  gl_FragColor=vec4(color,1.);
  #include <colorspace_fragment>
 }`}),Ke=new ft(new ps(2,2),De);L.add(Ke);let He=PM(),Ae={progress:0,intro:12},Z={x:0,y:0},$={x:0,y:0},se=Gt(),Me=!1,ye=!0,Oe=!1,$e=0,I=0;function Ge(){let J=i.clientWidth||innerWidth,he=i.clientHeight||innerHeight;e.setSize(J,he,!1),te.setSize(Math.round(J*e.getPixelRatio()),Math.round(he*e.getPixelRatio())),De.uniforms.uAspect.value=J/Math.max(1,he),n.aspect=J/Math.max(1,he),n.updateProjectionMatrix(),Ee(performance.now())}function Ee(J){if(Oe)return;let he=Math.min((J-$e)/1e3||0,.05);if($e=J,!ye||document.hidden)return;se&&(I+=he,$.x+=(Z.x-$.x)*.04,$.y+=(Z.y-$.y)*.04);let Le=He(Ae.progress);n.position.copy(Le.position),n.position.y+=Ae.intro,n.position.z+=Ae.intro,se&&Me&&(n.position.x+=$.x*.45,n.position.y+=$.y*.25),n.lookAt(Le.target),_.rotation.y=se?I*.09:0,m.rotation.z=.25+(se?Math.sin(I*.3)*.06:0),S.position.y=.8+(se?Math.sin(I*.8)*.18:0),T.uniforms.uTime.value=I,T.uniforms.uProgress.value=Ae.progress,Ae.intro>.001?(De.uniforms.uOpening.value=1-Ae.intro/12,e.setRenderTarget(te),e.render(t,n),e.setRenderTarget(null),e.render(L,ce)):e.render(t,n)}let Te=new IntersectionObserver(J=>{ye=J[0]?.isIntersecting??!0},{rootMargin:"200px"});Te.observe(i);let N=new ResizeObserver(Ge);N.observe(i);function je(J){Z.x=J.clientX/innerWidth*2-1,Z.y=-(J.clientY/innerHeight*2-1)}return window.addEventListener("pointermove",je,{passive:!0}),i.addEventListener("webglcontextlost",J=>{J.preventDefault(),i.classList.add("scene-unavailable"),window.dispatchEvent(new CustomEvent("merge:scene-unavailable"))}),Ge(),se&&e.setAnimationLoop(Ee),{supported:!0,ready:Promise.resolve(),setProgress(J){Ae.progress=fo.clamp(J,0,1),se||Ee(performance.now())},enter(J=!0){return Me=!0,new Promise(he=>{if(!J||!se){Ae.intro=0,Ee(performance.now()),he();return}Pt.to(Ae,{intro:0,duration:3,ease:"expoScale(8,2,power1.inOut)",onComplete:he})})},setEnabled(J){se=J,e.setAnimationLoop(J?Ee:null),J||($.x=0,$.y=0),Ee(performance.now())},dispose(){Oe=!0,e.setAnimationLoop(null),Te.disconnect(),N.disconnect(),window.removeEventListener("pointermove",je),t.traverse(J=>{if(J.geometry?.dispose(),J.material)for(let he of[].concat(J.material))he.dispose()}),o.dispose(),te.dispose(),Ke.geometry.dispose(),De.dispose(),e.dispose()}}}Pt.registerPlugin(it);var LM="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+*";function FM(){let i=document.querySelector(".cinematic-story");if(!i)return{ready:Promise.resolve(),enter:()=>Promise.resolve(),setEnabled(){},setAudio(){},dispose(){}};let e=[...i.querySelectorAll(".story-screen")],t=i.querySelector("canvas"),n;try{n=DM(t)}catch(x){console.warn("Merge : version l\xE9g\xE8re de la sc\xE8ne.",x),n={supported:!1,ready:Promise.resolve(),enter:()=>Promise.resolve(),setProgress(){},setEnabled(){},dispose(){}}}i.classList.toggle("has-webgl",n.supported),window.addEventListener("merge:scene-unavailable",()=>i.classList.remove("has-webgl"));let r={value:0},s=0,o=!1,a,l,c=[],u,h=document.querySelector(".story-ui"),d=i.querySelector(".story-index"),f=[...i.querySelectorAll("[data-chapter]")],g=document.createElementNS("http://www.w3.org/2000/svg","svg");g.setAttribute("aria-hidden","true"),g.classList.add("text-noise-defs"),g.innerHTML="<defs>"+e.map((x,b)=>`<filter id="story-dissolve-${b}" x="-25%" y="-30%" width="150%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".025" numOctaves="2" seed="${b+3}" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>`).join("")+"</defs>",i.prepend(g);for(let[x,b]of e.entries()){let w=b.querySelector("h1,h2");w.style.filter=`url(#story-dissolve-${x})`;let T=b.querySelector("[data-decode]");T.dataset.original=T.textContent;let C=document.createElement("span");C.className="sr-only",C.textContent=T.dataset.original;let v=document.createElement("span");v.setAttribute("aria-hidden","true"),v.textContent=T.dataset.original,T.replaceChildren(C,v)}function _(x,b=900){let w=x.dataset.original,T=x.querySelector("[aria-hidden]"),C,v,y=D=>{v??=D;let U=Math.min(1,(D-v)/b),V=Math.floor(w.length*U);T.textContent=[...w].map((W,G)=>W===" "||G<V?W:LM[(G*7+Math.floor(D/70))%LM.length]).join(""),U<1?C=requestAnimationFrame(y):T.textContent=w};C=requestAnimationFrame(y);let R=()=>{cancelAnimationFrame(C),T.textContent=w};return c.push(R),R}function m(x,b=!0){let w=e[x];e.forEach((D,U)=>{D.setAttribute("aria-hidden",String(U!==x)),D.inert=U!==x}),f.forEach((D,U)=>D.setAttribute("aria-current",U===x?"step":"false")),d.textContent=String(x+1).padStart(2,"0");let T=w.querySelector("h1,h2"),C=w.querySelector("[data-decode]"),v=w.querySelector(".story-label"),y=g.querySelector(`#story-dissolve-${x} feDisplacementMap`);if(!b||!Gt()){Pt.set(w,{opacity:1,visibility:"visible"}),Pt.set([T,C,v].filter(Boolean),{opacity:1}),Pt.set(y,{attr:{scale:0}});return}let R=Pt.timeline();return R.set(w,{visibility:"visible",pointerEvents:"auto"}).to(w,{opacity:1,duration:1.1,ease:"power2.out"},0).fromTo(y,{attr:{scale:75}},{attr:{scale:0},duration:1.5,ease:"power3.out"},0).fromTo(T,{opacity:0},{opacity:1,duration:1.2,ease:"power1.out"},.15).fromTo(C,{opacity:0},{opacity:1,duration:.6,ease:"power1.out"},.45).call(()=>_(C),null,.5),v&&R.fromTo(v,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.5,ease:"power2.out"},.25),R}function p(x){if(x===s||!o)return;let b=s;s=x,l?.kill(),c.forEach(w=>w()),c=[],Pt.to(e[b],{opacity:0,duration:.5,ease:"power1.in",overwrite:!0,pointerEvents:"none"}),l=m(x,!0)}function S(){if(a?.kill(),a=null,n.setEnabled(Gt()),i.classList.toggle("is-static",!Gt()),!Gt()){Pt.killTweensOf(r),l?.kill(),e.forEach(x=>{x.inert=!1,x.setAttribute("aria-hidden","false"),Pt.set(x,{clearProps:"opacity,visibility,pointerEvents"})}),c.forEach(x=>x()),c=[];return}e.forEach((x,b)=>Pt.set(x,{opacity:o&&b===s?1:0,visibility:"visible",pointerEvents:b===s?"auto":"none"})),a=it.create({trigger:i,start:"top top",end:"bottom bottom",onUpdate:x=>{Pt.to(r,{value:x.progress,duration:.7,ease:"power1.out",overwrite:!0,onUpdate:()=>{n.setProgress(r.value),p(IM(r.value,e.length))}})},snap:window.matchMedia("(pointer: fine)").matches?{snapTo:1/(e.length-1),duration:{min:.2,max:.6},delay:.22,ease:"power2.out"}:!1}),o&&m(s,!1)}function M(x){let b=[...document.querySelectorAll("[data-audio-toggle]")];if(x&&!u){let w=window.AudioContext||window.webkitAudioContext;if(w){let T=new w,C=T.createGain();C.gain.value=0,C.connect(T.destination),[110,164.81,220].forEach((v,y)=>{let R=T.createOscillator(),D=T.createGain();R.type="sine",R.frequency.value=v,D.gain.value=.04/(y+1),R.connect(D).connect(C),R.start()}),u={context:T,gain:C,enabled:!1}}}u&&(u.context.resume().catch(()=>{}),u.gain.gain.setTargetAtTime(x?.2:0,u.context.currentTime,.5),u.enabled=x);for(let w of b)w.textContent=x&&u?"Son : on":"Son : off",w.setAttribute("aria-pressed",String(!!(x&&u)))}for(let x of document.querySelectorAll("[data-audio-toggle]"))x.addEventListener("click",()=>M(!u?.enabled));document.addEventListener("visibilitychange",()=>{u&&(document.hidden?u.gain.gain.setTargetAtTime(0,u.context.currentTime,.2):u.enabled&&u.gain.gain.setTargetAtTime(.2,u.context.currentTime,.5))});for(let x of f)x.addEventListener("click",()=>{let b=Number(x.dataset.chapter),w=i.getBoundingClientRect().top+window.scrollY,T=i.offsetHeight-innerHeight;window.scrollTo({top:w+T*b/(e.length-1),behavior:Gt()?"smooth":"auto"})});return S(),{ready:n.ready,async enter(x=!0){o=!0,s=0;let b=n.enter(x&&Gt());x&&Gt()?(Pt.set(h,{opacity:0}),Pt.set(".masthead",{opacity:0}),Pt.delayedCall(1.15,()=>m(0,!0)),Pt.to([h,document.querySelector(".masthead")],{opacity:1,duration:1.5,delay:1.6,ease:"power1.out"})):(m(0,!1),Pt.set([h,document.querySelector(".masthead")],{opacity:1})),await b,it.refresh()},setEnabled:S,setAudio:M,dispose(){a?.kill(),l?.kill(),c.forEach(x=>x()),n.dispose(),u?.context.close()}}}var Ha=document.documentElement,OM=document.querySelector(".site-content"),za=document.querySelector(".site-loader"),Xg=document.querySelector(".loader-bar > span"),qg=document.querySelector(".loader-bar"),Yg=document.querySelector(".loader-percent"),$R=window.matchMedia("(prefers-reduced-motion: reduce)"),Kc=[.16,1,.3,1],yo=!1,Va=0,Md,Yc=0;var Sd=[],BM,Zc=document.querySelector(".motion-control"),Ga=FM(),Zg=!1;function kM(){for(let i of Sd)i.cancel();Sd=[],BM?.()}function Kg(){kM();let i=!Gt();if(Zc.textContent=i?"Activer motion":"Motion : on",Zc.setAttribute("aria-pressed",String(i)),Zc.disabled=!1,Ha.dataset.motion=i?"off":"on",Zc.title=i?"Activer volontairement les animations pour cette session.":"Mettre toutes les animations en pause.",i||Ha.classList.contains("is-loading")){Ga.setEnabled();return}Ga.setEnabled(),BM=op(".section-opening, .statement-copy, .practical, .footer-intro, .exploration, .program-rows details",e=>{Sd.push(Is(e,{opacity:[0,1],y:[64,0]},{duration:.9,ease:Kc}))},{amount:.15})}function vd(i){let e=Math.max(Yc,Math.min(100,i));return Md?.cancel(),Gt()?(Md=Is(Yc,e,{duration:.4,ease:Kc,onUpdate:t=>{Yc=t,Yg.textContent=String(Math.round(t)).padStart(3,"0")+"%",qg.setAttribute("aria-valuenow",String(Math.round(t))),Xg.style.transform=`scaleX(${t/100})`}}),Md.finished):(Yc=e,Yg.textContent=String(Math.round(e)).padStart(3,"0")+"%",qg.setAttribute("aria-valuenow",String(Math.round(e))),Xg.style.transform=`scaleX(${e/100})`,Promise.resolve())}async function Wa({focus:i=!1,animateExit:e=!0}={}){if(yo)return;yo=!0,Zg=!1,clearTimeout(window.mergeLoaderFallback),Md?.cancel();let t=Ga.enter(e);if(e&&Gt()){let n=Math.hypot(innerWidth,innerHeight)*1.15;Pt.to(".loader-center, .loader-bottom, .loader-top",{opacity:0,duration:.35,ease:"power1.out"}),await new Promise(r=>Pt.to(za,{"--portal-size":n+"px",duration:3,ease:"power1.inOut",onComplete:r}))}za.hidden=!0,Ha.classList.remove("is-loading"),OM.inert=!1,await t,Kg(),i&&document.querySelector(".menu-trigger").focus({preventScroll:!0})}function JR(){Zg=!0,clearTimeout(window.mergeLoaderFallback);let i=document.querySelector(".loader-enter");i.hidden=!1,document.querySelector(".loader-status").textContent="L\u2019exp\xE9rience est pr\xEAte.",document.querySelector(".loader-bottom").classList.add("is-complete"),Gt()&&Pt.fromTo(i,{opacity:0,y:8},{opacity:1,y:0,duration:.4,ease:"power2.out"})}async function VM(i=!1){let e=++Va;yo=!1,Zg=!1,Yc=0,window.scrollTo({top:0,behavior:"instant"}),document.querySelector(".loader-enter").hidden=!0,document.querySelector(".loader-status").textContent="Pr\xE9paration de l\u2019exp\xE9rience",document.querySelector(".loader-bottom").classList.remove("is-complete"),za.style.setProperty("--portal-size","0px"),Pt.set(".loader-center, .loader-bottom, .loader-top",{opacity:1}),za.hidden=!1,za.style.removeProperty("opacity"),za.style.removeProperty("transform"),Xg.style.transform="scaleX(0)",Yg.textContent="000%",qg.setAttribute("aria-valuenow","0"),Ha.classList.add("is-loading"),i&&document.querySelector("[data-skip-loader]").focus({preventScroll:!0}),OM.inert=!0,kM(),clearTimeout(window.mergeLoaderFallback),window.mergeLoaderFallback=setTimeout(()=>Wa({animateExit:!1}),5e3);try{if(await vd(20),yo||e!==Va)return;let t=document.fonts?.ready??Promise.resolve();if(await Promise.race([t,new Promise(r=>setTimeout(r,1800))]),yo||e!==Va)return;await vd(60);let n=document.querySelector(".hero-object img");if(await Promise.race([n?.decode?.().catch(()=>{})??Promise.resolve(),new Promise(r=>setTimeout(r,1400))]),yo||e!==Va||(await vd(90),await Ga.ready,await vd(100),yo||e!==Va))return;JR()}catch{e===Va&&await Wa({animateExit:!1})}}document.querySelector("[data-enter-audio]").addEventListener("click",()=>{Ga.setAudio(!0),Wa({animateExit:!0})});document.querySelector("[data-enter-silent]").addEventListener("click",()=>{Ga.setAudio(!1),Wa({animateExit:!0})});document.querySelector("[data-skip-loader]").addEventListener("click",()=>Wa({focus:!0,animateExit:!1}));document.querySelector(".replay-intro").addEventListener("click",()=>VM(!0));Zc.addEventListener("click",()=>B0(!Gt()));window.addEventListener("merge:motion-preference",Kg);$R.addEventListener("change",()=>{Kg(),!Gt()&&Ha.classList.contains("is-loading")&&Wa({animateExit:!1})});document.addEventListener("visibilitychange",()=>{for(let i of Sd)document.hidden?i.pause():Gt()&&i.play()});var vo=document.querySelector("#menu-dialog"),Or=document.querySelector("#experience-dialog");function $g(i){i.showModal(),Gt()&&Is(i,{opacity:[0,1],y:[80,0],scale:[.94,1]},{duration:.65,ease:Kc})}document.querySelector(".menu-trigger").addEventListener("click",()=>$g(vo));for(let i of document.querySelectorAll("[data-close-dialog]"))i.addEventListener("click",()=>i.closest("dialog").close());for(let i of[vo,Or])i.addEventListener("click",e=>{if(e.target!==i)return;let t=i.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&i.close()});for(let i of vo.querySelectorAll("a"))i.addEventListener("click",()=>vo.close());document.addEventListener("keydown",i=>{if((i.metaKey||i.ctrlKey)&&i.key.toLowerCase()==="k"){if(Ha.classList.contains("is-loading"))return;i.preventDefault(),vo.open?vo.close():Or.open||$g(vo)}});var QR={build:{tag:"CONSTRUIRE / PREMIER COMMIT",title:"Toutes les id\xE9es commencent quelque part.",copy:"Un probl\xE8me qui t\u2019agace, un outil qui manque ou une intuition difficile \xE0 expliquer. Le hackathon est un espace pour en faire un premier prototype, avec d\u2019autres personnes curieuses.",href:"hackathon.html",label:"D\xE9couvrir le hackathon \u2197"},play:{tag:"JOUER / NEXT ROUND",title:"La connexion ne s\u2019arr\xEAte pas au c\xE2ble.",copy:"Une partie \xE0 plusieurs, un peu de comp\xE9tition et beaucoup de fair-play. La LAN party rassemble autant les joueurs du dimanche que ceux qui connaissent d\xE9j\xE0 chaque raccourci.",href:"lan-party.html",label:"D\xE9couvrir la LAN party \u2197"},find:{tag:"D\xC9COUVRIR / SIGNAL TROUV\xC9",title:"Et si la r\xE9ponse \xE9tait juste sous tes yeux ?",copy:"Des indices \xE0 assembler, des messages \xE0 d\xE9coder et une autre fa\xE7on de regarder les d\xE9tails. Commence avec un petit d\xE9fi jouable directement sur la page CTF.",href:"ctf.html",label:"Essayer le mini-d\xE9fi \u2197"},meet:{tag:"SE RENCONTRER / OUVRIR LA CONVERSATION",title:"La pi\xE8ce manquante est peut-\xEAtre quelqu\u2019un.",copy:"Tu n\u2019as pas besoin d\u2019un projet termin\xE9 ni d\u2019une pr\xE9sentation parfaite. Merge commence avec une envie de partager. Le reste peut attendre la conversation.",href:"#join",label:"Garder le contact \u2197"}};for(let i of document.querySelectorAll("[data-experience]"))i.addEventListener("click",()=>{let e=QR[i.dataset.experience];Or.querySelector(".experience-tag").textContent=e.tag,Or.querySelector("h2").textContent=e.title,Or.querySelector(".experience-copy").textContent=e.copy;let t=Or.querySelector("a");t.href=e.href,t.textContent=e.label,$g(Or)});Or.querySelector("a").addEventListener("click",()=>Or.close());var Wg=!1;for(let i of document.querySelectorAll("[data-filter]"))i.addEventListener("click",async()=>{if(Wg)return;let e=i.dataset.filter,t=[...document.querySelectorAll("[data-experience]")],n=new Map(t.filter(r=>!r.hidden).map(r=>[r,r.getBoundingClientRect()]));for(let r of document.querySelectorAll("[data-filter]"))r.setAttribute("aria-pressed",String(r===i));Wg=!0;try{let r=t.filter(o=>!o.hidden&&e!=="all"&&o.dataset.category!==e);Gt()&&r.length&&await Is(r,{opacity:[1,0],scale:[1,.92]},{duration:.24,ease:Kc}).finished;let s=0;for(let o of t)o.hidden=e!=="all"&&o.dataset.category!==e,o.hidden||(s++,o.style.removeProperty("opacity"),o.style.removeProperty("transform"));if(document.querySelector(".object-field").classList.toggle("is-filtered",e!=="all"),document.querySelector(".filter-count").textContent=`${s} connexion${s===1?"":"s"} \xE0 explorer`,Gt())for(let o of t.filter(a=>!a.hidden)){let a=o.getBoundingClientRect(),l=n.get(o);Is(o,{opacity:[l?1:0,1],x:[l?l.left-a.left:0,0],y:[l?l.top-a.top:48,0],scale:[l?1:.94,1]},{duration:.65,ease:Kc})}}finally{Wg=!1}});var NM=document.querySelector("#signup"),Xa=document.querySelector("#email"),UM=document.querySelector("#email-help"),zM=document.querySelector("#signup-status"),bd=!1;function Jg(){let i=Xa.validity.valid;return Xa.setAttribute("aria-invalid",String(!i)),UM.classList.toggle("error",!i),UM.textContent=i?"Aper\xE7u uniquement. Aucune adresse n\u2019est envoy\xE9e ni enregistr\xE9e.":"\xC9cris une adresse valide, comme toi@quelquepart.fr.",i}Xa.addEventListener("blur",()=>{bd=!0,Jg()});Xa.addEventListener("input",()=>{bd&&Jg(),zM.textContent=""});NM.addEventListener("submit",i=>{if(i.preventDefault(),bd=!0,!Jg()){Xa.focus();return}zM.textContent="C\u2019est tout bon. Cet aper\xE7u n\u2019a envoy\xE9 ni enregistr\xE9 ton adresse.",NM.reset(),Xa.removeAttribute("aria-invalid"),bd=!1});VM();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.0
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/EasePack.js:
  (*!
   * EasePack 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
