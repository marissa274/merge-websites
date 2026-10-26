import { animate, stagger, inView } from 'motion';
import { motionAllowed, setMotionPreference } from './motion-preferences.js';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector('.motion-toggle');
let animations = [];
let stopObserving;
const ease = [0.16, 1, 0.3, 1];
const track = animation => { animations.push(animation); return animation; };
function stopMotion() {
  stopObserving?.();
  for (const animation of animations) animation.cancel();
  animations = [];
}
function startMotion() {
  stopMotion();
  const paused = !motionAllowed();
  toggle.textContent = paused ? 'Activer motion' : 'Pause motion';
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.disabled = false;
  toggle.title = paused ? 'Activer volontairement les animations.' : 'Mettre les animations en pause.';
  if (paused) return;
  track(animate('[data-enter]', {opacity:[0,1], y:[28,0]}, {duration:.7, delay:stagger(.09), ease}));
  stopObserving = inView('[data-reveal]', element => {
    track(animate(element,{opacity:[0,1],y:[24,0]},{duration:.65,ease}));
  }, {amount:.12});
  document.querySelectorAll('[data-float]').forEach((el,i) => {
    track(animate(el,{y:[0,-8,0],rotate:[0,i%2?-.8:.8,0]},{duration:3.5+i*.25,delay:i*.5,repeat:Infinity,ease:'easeInOut'}));
  });
  document.querySelectorAll('[data-packet]').forEach((el,i) => {
    track(animate(el,{x:i?[0,-90,0,90,0]:[0,90,0,-90,0],y:[0,-110,0,110,0],opacity:[.3,1,.3,1,.3]},{duration:5,delay:i*1.2,repeat:Infinity,ease:'linear'}));
  });
  document.querySelectorAll('[data-signal]').forEach((el,i) => {
    track(animate(el,{opacity:[.85,1,.85],x:[0,3,0]},{duration:3,delay:i*.5,repeat:Infinity,ease:'easeInOut'}));
  });
}
function feedbackMotion(element) {
  if (motionAllowed() && element) track(animate(element,{opacity:[.4,1],y:[6,0]},{duration:.25,ease}));
}
toggle.addEventListener('click',()=>setMotionPreference(!motionAllowed()));
window.addEventListener('merge:motion-preference',startMotion);
reduced.addEventListener('change',startMotion);
startMotion();
document.addEventListener('visibilitychange',()=>{
  for(const animation of animations) {
    if(document.hidden) animation.pause();
    else if(motionAllowed()) animation.play();
  }
});
for(const link of document.querySelectorAll('.event-nav nav a')) {
  if(new URL(link.href).pathname===location.pathname) link.setAttribute('aria-current','page');
}
const tracks = {
  web:{symbol:'{ web }',title:'Le navigateur comme terrain de jeu.',text:'Imagine une expérience interactive qu’on a envie de toucher : visualisation, mini-jeu, outil ou petite surprise du Web.',result:'À montrer : une URL et une démo qui se lance.'},
  tools:{symbol:'{ tools }',title:'Un petit outil. Un vrai problème en moins.',text:'Choisis une friction du quotidien et fabrique un raccourci utile. Un script, une extension ou une interface qui rend service.',result:'À montrer : le problème de départ et une solution testable.'},
  open:{symbol:'{ ??? }',title:'La piste qui n’existe pas encore.',text:'Art, données, matériel ou idée impossible à classer : suis ta curiosité et construis un premier essai qui raconte quelque chose.',result:'À montrer : une expérience, même imparfaite, et ce que tu as appris.'}
};
const tabs=[...document.querySelectorAll('[data-track]')];
function selectTrack(tab) {
 const data=tracks[tab.dataset.track], panel=document.querySelector('#track-panel');
 for(const t of tabs){t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;}
 panel.setAttribute('aria-labelledby',tab.id);
 panel.querySelector('.track-number').textContent=data.symbol;
 panel.querySelector('h3').textContent=data.title;
 panel.querySelector('p').textContent=data.text;
 panel.querySelector('.track-deliverable').textContent=data.result;
 feedbackMotion(panel);
}
for(const tab of tabs){
 tab.addEventListener('click',()=>selectTrack(tab));
 tab.addEventListener('keydown',event=>{
  const i=tabs.indexOf(tab);let next;
  if(event.key==='ArrowRight')next=tabs[(i+1)%tabs.length];
  if(event.key==='ArrowLeft')next=tabs[(i+tabs.length-1)%tabs.length];
  if(event.key==='Home')next=tabs[0];
  if(event.key==='End')next=tabs.at(-1);
  if(next){event.preventDefault();next.focus({preventScroll:true});selectTrack(next);}
 });
}
const modes={
 coop:{label:'MODE CO-OP',title:'Le meilleur carry, c’est l’entraide.',text:'Des aventures à plusieurs et des défis qui se passent ensemble. On apprend les commandes et on se couvre mutuellement.',note:'Accessible aux nouveaux joueurs.'},
 versus:{label:'MODE VERSUS',title:'Un beau duel. Une bonne poignée de main.',text:'Des matchs amicaux et des rotations pour faire jouer tout le monde. On cherche le beau geste et on félicite l’autre équipe.',note:'Formats et jeux à confirmer.'},
 chill:{label:'MODE CHILL',title:'Reprendre son souffle, sans quitter le groupe.',text:'Une zone pour discuter, regarder une partie et se retrouver entre deux matchs. Pas de pression, pas de score à défendre.',note:'Tu peux aussi venir pour l’ambiance.'}
};
for(const button of document.querySelectorAll('[data-mode]'))button.addEventListener('click',()=>{
 const mode=button.dataset.mode,data=modes[mode],info=document.querySelector('.mode-info');
 for(const b of document.querySelectorAll('[data-mode]'))b.setAttribute('aria-pressed',String(b===button));
 for(const z of document.querySelectorAll('[data-zone]'))z.classList.toggle('selected',z.dataset.zone===mode);
 info.querySelector('.mode-index').textContent=data.label;info.querySelector('h3').textContent=data.title;info.querySelector('p:not(.mode-note)').textContent=data.text;info.querySelector('.mode-note').textContent=data.note;
 feedbackMotion(info);
});
const flagForm=document.querySelector('.flag-form');
if(flagForm){
 const input=flagForm.querySelector('input'),message=document.querySelector('#flag-feedback'),submit=flagForm.querySelector('[type=submit]'),reset=flagForm.querySelector('.challenge-reset');
 flagForm.addEventListener('submit',event=>{
  event.preventDefault();const valid=input.value.trim()==='MERGE{hello_world}';
  input.setAttribute('aria-invalid',String(!valid));message.className=`helper ${valid?'success':'error'}`;
  message.textContent=valid?'Flag capturé ! Base64 décodé, mission accomplie.':'Ce n’est pas le flag attendu. Essaie l’indice Base64 et vérifie les accolades.';
  if(valid){submit.textContent='Flag capturé ✓';submit.disabled=true;input.readOnly=true;reset.hidden=false;feedbackMotion(message);}
  else input.focus();
 });
 input.addEventListener('input',()=>{input.removeAttribute('aria-invalid');message.className='helper';message.textContent='Respecte les majuscules et les accolades.';});
 reset.addEventListener('click',()=>{flagForm.reset();input.readOnly=false;submit.disabled=false;submit.innerHTML='Valider le flag <span aria-hidden="true">↗</span>';reset.hidden=true;input.removeAttribute('aria-invalid');message.className='helper';message.textContent='Respecte les majuscules et les accolades.';input.focus();});
 const solution=document.querySelector('.solution-toggle');
 solution.addEventListener('click',()=>{const expanded=solution.getAttribute('aria-expanded')==='true';solution.setAttribute('aria-expanded',String(!expanded));document.querySelector('#solution').hidden=expanded;solution.textContent=expanded?'Voir la solution':'Masquer la solution';});
 document.querySelector('.copy-code').addEventListener('click',async event=>{
  const button=event.currentTarget;
  try{await navigator.clipboard.writeText('TUVSR0V7aGVsbG9fd29ybGR9');button.textContent='Copié ✓';}
  catch{button.textContent='Sélectionner le texte';const range=document.createRange();range.selectNodeContents(document.querySelector('.encoded code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);}
 });
}
const kits={hackathon:'MERGE — KIT HACKATHON\n\nÉvénement fictif — date et lieu à confirmer.\n\nÀ préparer :\n- Ordinateur et chargeur\n- Environnement de développement prêt\n- Une idée ou un problème à explorer\n- Dépôt de code et fichier README\n- Une courte démonstration\n\nParcours : imaginer, construire, partager.\n',lan:'MERGE — CHECKLIST LAN\n\nÉvénement fictif — date, lieu et jeux à confirmer.\n\nAvant de venir :\n- Vérifier le matériel demandé par l’organisateur\n- Préparer ordinateur, chargeur et périphériques si requis\n- Mettre les jeux à jour après confirmation de la sélection\n- Prévoir casque, eau et pauses\n- Garder une place pour le fair-play\n',ctf:'MERGE — KIT CTF\n\nÉvénement fictif — date et lieu à confirmer.\n\nÀ préparer :\n- Navigateur et éditeur de texte\n- Carnet de notes\n- Lire le périmètre autorisé de chaque épreuve\n- Documenter les hypothèses et les solutions\n\nCatégories proposées : Web, Crypto, Forensics, Reverse.\n\nJouer uniquement dans les environnements explicitement autorisés.\n'};
for(const button of document.querySelectorAll('[data-kit]'))button.addEventListener('click',()=>{
 const key=button.dataset.kit,url=URL.createObjectURL(new Blob([kits[key]],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=`merge-kit-${key}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const status=button.parentElement.querySelector('.kit-status');if(status)status.textContent='Checklist téléchargée. À toi de préparer la suite.';
});
