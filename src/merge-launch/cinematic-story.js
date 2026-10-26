import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createEmotionScene } from './emotion-scene.js';
import { chapterAt } from './cinematic-camera.js';
import { motionAllowed } from './motion-preferences.js';
gsap.registerPlugin(ScrollTrigger);
const GLYPHS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+*';
export function createCinematicStory(){
 const story=document.querySelector('.cinematic-story');
 if(!story)return {ready:Promise.resolve(),enter:()=>Promise.resolve(),setEnabled(){},setAudio(){},dispose(){}};
 const screens=[...story.querySelectorAll('.story-screen')],canvas=story.querySelector('canvas');
 let graphics;
 try{graphics=createEmotionScene(canvas);}catch(error){
  console.warn('Merge : version légère de la scène.',error);
  graphics={supported:false,ready:Promise.resolve(),enter:()=>Promise.resolve(),setProgress(){},setEnabled(){},dispose(){}};
 }
 story.classList.toggle('has-webgl',graphics.supported);
 window.addEventListener('merge:scene-unavailable',()=>story.classList.remove('has-webgl'));
 const position={value:0};let active=0,entered=false,driver,transition,decodeStop=[],audio;
 const ui=document.querySelector('.story-ui'),counter=story.querySelector('.story-index'),dots=[...story.querySelectorAll('[data-chapter]')];
 const noise=document.createElementNS('http://www.w3.org/2000/svg','svg');noise.setAttribute('aria-hidden','true');noise.classList.add('text-noise-defs');
 noise.innerHTML='<defs>'+screens.map((_,i)=>`<filter id="story-dissolve-${i}" x="-25%" y="-30%" width="150%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".025" numOctaves="2" seed="${i+3}" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>`).join('')+'</defs>';
 story.prepend(noise);
 for(const [index,screen] of screens.entries()){
  const title=screen.querySelector('h1,h2');title.style.filter=`url(#story-dissolve-${index})`;
  const paragraph=screen.querySelector('[data-decode]');paragraph.dataset.original=paragraph.textContent;
  const accessible=document.createElement('span');accessible.className='sr-only';accessible.textContent=paragraph.dataset.original;
  const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.textContent=paragraph.dataset.original;
  paragraph.replaceChildren(accessible,visual);
 }
 function decode(element,duration=900){
  const original=element.dataset.original,visual=element.querySelector('[aria-hidden]');let frame,start;
  const tick=now=>{start??=now;const p=Math.min(1,(now-start)/duration),settled=Math.floor(original.length*p);
   visual.textContent=[...original].map((char,i)=>char===' '||i<settled?char:GLYPHS[(i*7+Math.floor(now/70))%GLYPHS.length]).join('');
   if(p<1)frame=requestAnimationFrame(tick);else visual.textContent=original;
  };
  frame=requestAnimationFrame(tick);
  const stop=()=>{cancelAnimationFrame(frame);visual.textContent=original;};decodeStop.push(stop);return stop;
 }
 function reveal(index,animate=true){
  const screen=screens[index];
  screens.forEach((s,i)=>{s.setAttribute('aria-hidden',String(i!==index));s.inert=i!==index;});
  dots.forEach((button,i)=>button.setAttribute('aria-current',i===index?'step':'false'));
  counter.textContent=String(index+1).padStart(2,'0');
  const title=screen.querySelector('h1,h2'),paragraph=screen.querySelector('[data-decode]'),label=screen.querySelector('.story-label');
  const displacement=noise.querySelector(`#story-dissolve-${index} feDisplacementMap`);
  if(!animate||!motionAllowed()){
   gsap.set(screen,{opacity:1,visibility:'visible'});gsap.set([title,paragraph,label].filter(Boolean),{opacity:1});gsap.set(displacement,{attr:{scale:0}});return;
  }
  const tl=gsap.timeline();
  tl.set(screen,{visibility:'visible',pointerEvents:'auto'}).to(screen,{opacity:1,duration:1.1,ease:'power2.out'},0)
   .fromTo(displacement,{attr:{scale:75}},{attr:{scale:0},duration:1.5,ease:'power3.out'},0)
   .fromTo(title,{opacity:0},{opacity:1,duration:1.2,ease:'power1.out'},.15)
   .fromTo(paragraph,{opacity:0},{opacity:1,duration:.6,ease:'power1.out'},.45)
   .call(()=>decode(paragraph),null,.5);
  if(label)tl.fromTo(label,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.5,ease:'power2.out'},.25);
  return tl;
 }
 function switchChapter(index){
  if(index===active||!entered)return;
  const previous=active;active=index;transition?.kill();
  decodeStop.forEach(stop=>stop());decodeStop=[];
  gsap.to(screens[previous],{opacity:0,duration:.5,ease:'power1.in',overwrite:true,pointerEvents:'none'});
  transition=reveal(index,true);
 }
 function setup(){
  driver?.kill();driver=null;graphics.setEnabled(motionAllowed());
  story.classList.toggle('is-static',!motionAllowed());
  if(!motionAllowed()){
   gsap.killTweensOf(position);
   transition?.kill();
   screens.forEach(s=>{s.inert=false;s.setAttribute('aria-hidden','false');gsap.set(s,{clearProps:'opacity,visibility,pointerEvents'});});
   decodeStop.forEach(stop=>stop());decodeStop=[];return;
  }
  screens.forEach((s,i)=>gsap.set(s,{opacity:entered&&i===active?1:0,visibility:'visible',pointerEvents:i===active?'auto':'none'}));
  driver=ScrollTrigger.create({trigger:story,start:'top top',end:'bottom bottom',onUpdate:self=>{
   gsap.to(position,{value:self.progress,duration:.7,ease:'power1.out',overwrite:true,onUpdate:()=>{graphics.setProgress(position.value);switchChapter(chapterAt(position.value,screens.length));}});
  },snap:window.matchMedia('(pointer: fine)').matches?{snapTo:1/(screens.length-1),duration:{min:.2,max:.6},delay:.22,ease:'power2.out'}:false});
  if(entered)reveal(active,false);
 }
 function setAudio(enabled){
  const buttons=[...document.querySelectorAll('[data-audio-toggle]')];
  if(enabled&&!audio){
   const AudioContext=window.AudioContext||window.webkitAudioContext;
   if(AudioContext){const context=new AudioContext(),gain=context.createGain();gain.gain.value=0;gain.connect(context.destination);
    [110,164.81,220].forEach((frequency,i)=>{const oscillator=context.createOscillator(),volume=context.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;volume.gain.value=.04/(i+1);oscillator.connect(volume).connect(gain);oscillator.start();});audio={context,gain,enabled:false};}
  }
  if(audio){audio.context.resume().catch(()=>{});audio.gain.gain.setTargetAtTime(enabled ? .2 : 0,audio.context.currentTime,.5);audio.enabled=enabled;}
  for(const button of buttons){button.textContent=enabled&&audio?'Son : on':'Son : off';button.setAttribute('aria-pressed',String(!!(enabled&&audio)));}
 }
 for(const button of document.querySelectorAll('[data-audio-toggle]'))button.addEventListener('click',()=>setAudio(!audio?.enabled));
 document.addEventListener('visibilitychange',()=>{if(!audio)return;if(document.hidden)audio.gain.gain.setTargetAtTime(0,audio.context.currentTime,.2);else if(audio.enabled)audio.gain.gain.setTargetAtTime(.2,audio.context.currentTime,.5);});
 for(const button of dots)button.addEventListener('click',()=>{
  const index=Number(button.dataset.chapter),top=story.getBoundingClientRect().top+window.scrollY,range=story.offsetHeight-innerHeight;
  window.scrollTo({top:top+range*index/(screens.length-1),behavior:motionAllowed()?'smooth':'auto'});
 });
 setup();
 return {ready:graphics.ready,
  async enter(animate=true){
   entered=true;active=0;
   const fly=graphics.enter(animate&&motionAllowed());
   if(animate&&motionAllowed()){
    gsap.set(ui,{opacity:0});gsap.set('.masthead',{opacity:0});
    gsap.delayedCall(1.15,()=>reveal(0,true));gsap.to([ui,document.querySelector('.masthead')],{opacity:1,duration:1.5,delay:1.6,ease:'power1.out'});
   }else{reveal(0,false);gsap.set([ui,document.querySelector('.masthead')],{opacity:1});}
   await fly;
   ScrollTrigger.refresh();
  },setEnabled:setup,setAudio,
  dispose(){driver?.kill();transition?.kill();decodeStop.forEach(stop=>stop());graphics.dispose();audio?.context.close();}
 };
}
