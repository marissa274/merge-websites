import { animate, scroll } from 'motion';
import { motionAllowed } from './motion-preferences.js';
const root=document.documentElement;
const veil=document.createElement('div');veil.className='page-transition';veil.setAttribute('aria-hidden','true');
veil.innerHTML='<div class="transition-iris"></div><div class="transition-ripple"></div><span class="transition-word">merge↪</span>';
document.body.append(veil);
const iris=veil.querySelector('.transition-iris'),ripple=veil.querySelector('.transition-ripple'),word=veil.querySelector('.transition-word');
const ease=[.65,0,.35,1];let navigating=false,progress;
function setupProgress(){
 progress?.();const bar=document.querySelector('.reading-progress')??document.createElement('div');bar.className='reading-progress';bar.setAttribute('aria-hidden','true');if(!bar.isConnected)document.body.append(bar);bar.hidden=!motionAllowed();if(motionAllowed())progress=scroll(animate(bar,{scaleX:[0,1]},{ease:'linear'}));
}
async function revealPage(){
 let pending=false;try{pending=sessionStorage.getItem('merge-transition')==='pending';sessionStorage.removeItem('merge-transition');}catch{}
 if(!pending||!motionAllowed())return;
 veil.classList.add('is-active');word.style.opacity='0';
 try{await animate(iris,{clipPath:['circle(150% at 50% 50%)','circle(0% at 50% 50%)']},{duration:1,ease}).finished;}
 finally{veil.classList.remove('is-active');}
}
setupProgress();window.addEventListener('merge:motion-preference',setupProgress);revealPage();
document.addEventListener('click',async event=>{
 const link=event.target.closest?.('a[href]');
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download')||navigating)return;
 const target=new URL(link.href,location.href);
 if(target.origin!==location.origin||!target.pathname.endsWith('.html')||target.pathname===location.pathname||!motionAllowed())return;
 event.preventDefault();navigating=true;veil.classList.add('is-active');root.setAttribute('aria-busy','true');
 let timeout;const navigate=()=>{try{sessionStorage.setItem('merge-transition','pending');}catch{}location.assign(target.href);};
 try{
  timeout=setTimeout(navigate,1800);
  animate(ripple,{scale:[.01,12],opacity:[0,.7,0]},{duration:1.1,ease});
  animate(word,{opacity:[0,1],y:[8,0]},{duration:.5,delay:.5,ease});
  await animate(iris,{clipPath:['circle(0% at 50% 50%)','circle(150% at 50% 50%)']},{duration:1.05,ease}).finished;
  clearTimeout(timeout);navigate();
 }catch{clearTimeout(timeout);navigate();}
});
window.addEventListener('pageshow',event=>{if(event.persisted){navigating=false;root.removeAttribute('aria-busy');veil.classList.remove('is-active');iris.style.clipPath='circle(0% at 50% 50%)';}});
