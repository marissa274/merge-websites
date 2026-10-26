import { animate, stagger, inView, scroll } from 'motion';
import { motionAllowed, setMotionPreference } from './motion-preferences.js';
import { gsap } from 'gsap';
import { createCinematicStory } from './cinematic-story.js';
const root = document.documentElement;
const content = document.querySelector('.site-content');
const loader = document.querySelector('.site-loader');
const loaderBar = document.querySelector('.loader-bar > span');
const loaderProgress = document.querySelector('.loader-bar');
const loaderPercent = document.querySelector('.loader-percent');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.16, 1, 0.3, 1];
let introClosed = false;
let introRun = 0;
let counterAnimation;
let shownProgress = 0;
let finishIntroAnimation;
let ambient = [];
let stopReveals;
const motionButton = document.querySelector('.motion-control');
const cinematic=createCinematicStory();
let introReady=false;
function clearAmbient() {
  for (const animation of ambient) animation.cancel();
  ambient = [];
  stopReveals?.();
}
function setMotion() {
  clearAmbient();
  const off = !motionAllowed();
  motionButton.textContent = off ? 'Activer motion' : 'Motion : on';
  motionButton.setAttribute('aria-pressed', String(off));
  motionButton.disabled = false;
  root.dataset.motion=off?'off':'on';
  motionButton.title = off ? 'Activer volontairement les animations pour cette session.' : 'Mettre toutes les animations en pause.';
  if (off || root.classList.contains('is-loading')) {cinematic.setEnabled();return;}
  cinematic.setEnabled();
  stopReveals = inView('.section-opening, .statement-copy, .practical, .footer-intro, .exploration, .program-rows details', element => {
    ambient.push(animate(element,{opacity:[0,1],y:[64,0]},{duration:.9,ease}));
  },{amount:.15});
}
function updateProgress(value) {
  const target = Math.max(shownProgress, Math.min(100,value));
  counterAnimation?.cancel();
  if (!motionAllowed()) {
    shownProgress=target;
    loaderPercent.textContent=String(Math.round(target)).padStart(3,'0')+'%';
    loaderProgress.setAttribute('aria-valuenow',String(Math.round(target)));
    loaderBar.style.transform=`scaleX(${target/100})`;
    return Promise.resolve();
  }
  counterAnimation=animate(shownProgress,target,{duration:.4,ease,onUpdate:number=>{
    shownProgress=number;
    loaderPercent.textContent=String(Math.round(number)).padStart(3,'0')+'%';
    loaderProgress.setAttribute('aria-valuenow',String(Math.round(number)));
    loaderBar.style.transform=`scaleX(${number/100})`;
  }});
  return counterAnimation.finished;
}
async function dismissIntro({ focus=false, animateExit=true }={}) {
 if(introClosed)return;
 introClosed=true;introReady=false;
 clearTimeout(window.mergeLoaderFallback);counterAnimation?.cancel();
 const camera=cinematic.enter(animateExit);
 if(animateExit&&motionAllowed()){
  const radius=Math.hypot(innerWidth,innerHeight)*1.15;
  gsap.to('.loader-center, .loader-bottom, .loader-top',{opacity:0,duration:.35,ease:'power1.out'});
  await new Promise(resolve=>gsap.to(loader,{'--portal-size':radius+'px',duration:3,ease:'power1.inOut',onComplete:resolve}));
 } 
 loader.hidden=true;root.classList.remove('is-loading');content.inert=false;
 await camera;setMotion();
 if(focus)document.querySelector('.menu-trigger').focus({preventScroll:true});
}
function showEnterButtons(){
 introReady=true;clearTimeout(window.mergeLoaderFallback);
 const actions=document.querySelector('.loader-enter');actions.hidden=false;
 document.querySelector('.loader-status').textContent='L’expérience est prête.';
 document.querySelector('.loader-bottom').classList.add('is-complete');
 if(motionAllowed())gsap.fromTo(actions,{opacity:0,y:8},{opacity:1,y:0,duration:.4,ease:'power2.out'});
}
async function runIntro(replay=false) {
  const run=++introRun;
  introClosed=false;introReady=false;
  shownProgress=0;
  window.scrollTo({top:0,behavior:"instant"});
  document.querySelector(".loader-enter").hidden=true;
  document.querySelector(".loader-status").textContent="Préparation de l’expérience";
  document.querySelector(".loader-bottom").classList.remove("is-complete");
  loader.style.setProperty("--portal-size","0px");
  gsap.set(".loader-center, .loader-bottom, .loader-top",{opacity:1});
  loader.hidden=false;
  loader.style.removeProperty('opacity');
  loader.style.removeProperty('transform');
  loaderBar.style.transform='scaleX(0)';
  loaderPercent.textContent='000%';
  loaderProgress.setAttribute('aria-valuenow','0');
  root.classList.add('is-loading');
  if(replay) document.querySelector('[data-skip-loader]').focus({preventScroll:true});
  content.inert=true;
  clearAmbient();
  clearTimeout(window.mergeLoaderFallback);
  window.mergeLoaderFallback=setTimeout(()=>dismissIntro({animateExit:false}),5000);
  try {
    await updateProgress(20);
    if(introClosed||run!==introRun)return;
    const fontReady=document.fonts?.ready ?? Promise.resolve();
    await Promise.race([fontReady,new Promise(resolve=>setTimeout(resolve,1800))]);
    if(introClosed||run!==introRun)return;
    await updateProgress(60);
    const image=document.querySelector('.hero-object img');
    await Promise.race([image?.decode?.().catch(()=>{})??Promise.resolve(),new Promise(resolve=>setTimeout(resolve,1400))]);
    if(introClosed||run!==introRun)return;
    await updateProgress(90);
    await cinematic.ready;
    await updateProgress(100);
    if(introClosed||run!==introRun)return;
    showEnterButtons();
  } catch {
    if(run===introRun) await dismissIntro({animateExit:false});
  }
}
document.querySelector('[data-enter-audio]').addEventListener('click',()=>{cinematic.setAudio(true);dismissIntro({animateExit:true});});
document.querySelector('[data-enter-silent]').addEventListener('click',()=>{cinematic.setAudio(false);dismissIntro({animateExit:true});});
document.querySelector('[data-skip-loader]').addEventListener('click',()=>dismissIntro({focus:true,animateExit:false}));
document.querySelector('.replay-intro').addEventListener('click',()=>runIntro(true));
motionButton.addEventListener('click',()=>setMotionPreference(!motionAllowed()));
window.addEventListener('merge:motion-preference',setMotion);
reduced.addEventListener('change',()=>{
  setMotion();
  if(!motionAllowed() && root.classList.contains('is-loading')) dismissIntro({animateExit:false});
});
document.addEventListener('visibilitychange',()=>{
 for(const animation of ambient){if(document.hidden)animation.pause();else if(motionAllowed())animation.play();}
});
const menu=document.querySelector('#menu-dialog');
const experience=document.querySelector('#experience-dialog');
function openDialog(dialog) {
 dialog.showModal();
 if(motionAllowed()) animate(dialog,{opacity:[0,1],y:[80,0],scale:[.94,1]},{duration:.65,ease});
}
document.querySelector('.menu-trigger').addEventListener('click',()=>openDialog(menu));
for(const button of document.querySelectorAll('[data-close-dialog]'))button.addEventListener('click',()=>button.closest('dialog').close());
for(const dialog of [menu,experience])dialog.addEventListener('click',event=>{
 if(event.target!==dialog)return;
 const rect=dialog.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
for(const link of menu.querySelectorAll('a'))link.addEventListener('click',()=>menu.close());
document.addEventListener('keydown',event=>{
 if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
  if(root.classList.contains('is-loading'))return;
  event.preventDefault();
  if(menu.open)menu.close();else if(!experience.open)openDialog(menu);
 }
});
const experiences={
 build:{tag:'CONSTRUIRE / PREMIER COMMIT',title:'Toutes les idées commencent quelque part.',copy:'Un problème qui t’agace, un outil qui manque ou une intuition difficile à expliquer. Le hackathon est un espace pour en faire un premier prototype, avec d’autres personnes curieuses.',href:'hackathon.html',label:'Découvrir le hackathon ↗'},
 play:{tag:'JOUER / NEXT ROUND',title:'La connexion ne s’arrête pas au câble.',copy:'Une partie à plusieurs, un peu de compétition et beaucoup de fair-play. La LAN party rassemble autant les joueurs du dimanche que ceux qui connaissent déjà chaque raccourci.',href:'lan-party.html',label:'Découvrir la LAN party ↗'},
 find:{tag:'DÉCOUVRIR / SIGNAL TROUVÉ',title:'Et si la réponse était juste sous tes yeux ?',copy:'Des indices à assembler, des messages à décoder et une autre façon de regarder les détails. Commence avec un petit défi jouable directement sur la page CTF.',href:'ctf.html',label:'Essayer le mini-défi ↗'},
 meet:{tag:'SE RENCONTRER / OUVRIR LA CONVERSATION',title:'La pièce manquante est peut-être quelqu’un.',copy:'Tu n’as pas besoin d’un projet terminé ni d’une présentation parfaite. Merge commence avec une envie de partager. Le reste peut attendre la conversation.',href:'#join',label:'Garder le contact ↗'}
};
for(const card of document.querySelectorAll('[data-experience]'))card.addEventListener('click',()=>{
 const data=experiences[card.dataset.experience];
 experience.querySelector('.experience-tag').textContent=data.tag;
 experience.querySelector('h2').textContent=data.title;
 experience.querySelector('.experience-copy').textContent=data.copy;
 const link=experience.querySelector('a');link.href=data.href;link.textContent=data.label;
 openDialog(experience);
});
experience.querySelector('a').addEventListener('click',()=>experience.close());
let filtering=false;
for(const filter of document.querySelectorAll('[data-filter]'))filter.addEventListener('click',async()=>{
 if(filtering)return;
 const category=filter.dataset.filter;
 const cards=[...document.querySelectorAll('[data-experience]')];
 const before=new Map(cards.filter(card=>!card.hidden).map(card=>[card,card.getBoundingClientRect()]));
 for(const button of document.querySelectorAll('[data-filter]'))button.setAttribute('aria-pressed',String(button===filter));
 filtering=true;
 try{
  const leaving=cards.filter(card=>!card.hidden&&category!=='all'&&card.dataset.category!==category);
  if(motionAllowed()&&leaving.length)await animate(leaving,{opacity:[1,0],scale:[1,.92]},{duration:.24,ease}).finished;
  let count=0;
  for(const card of cards){card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden){count++;card.style.removeProperty('opacity');card.style.removeProperty('transform');}}
  document.querySelector('.object-field').classList.toggle('is-filtered',category!=='all');
  document.querySelector('.filter-count').textContent=`${count} connexion${count===1?'':'s'} à explorer`;
  if(motionAllowed())for(const card of cards.filter(card=>!card.hidden)){
   const current=card.getBoundingClientRect(),previous=before.get(card);
   animate(card,{opacity:[previous?1:0,1],x:[previous?previous.left-current.left:0,0],y:[previous?previous.top-current.top:48,0],scale:[previous?1:.94,1]},{duration:.65,ease});
  }
 }finally{filtering=false;}
});
const form=document.querySelector('#signup'),email=document.querySelector('#email'),help=document.querySelector('#email-help'),status=document.querySelector('#signup-status');
let touched=false;
function validate(){
 const valid=email.validity.valid;
 email.setAttribute('aria-invalid',String(!valid));
 help.classList.toggle('error',!valid);
 help.textContent=valid?'Aperçu uniquement. Aucune adresse n’est envoyée ni enregistrée.':'Écris une adresse valide, comme toi@quelquepart.fr.';
 return valid;
}
email.addEventListener('blur',()=>{touched=true;validate();});
email.addEventListener('input',()=>{if(touched)validate();status.textContent='';});
form.addEventListener('submit',event=>{
 event.preventDefault();touched=true;
 if(!validate()){email.focus();return;}
 status.textContent='C’est tout bon. Cet aperçu n’a envoyé ni enregistré ton adresse.';
 form.reset();email.removeAttribute('aria-invalid');touched=false;
});
runIntro();
