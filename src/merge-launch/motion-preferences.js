export const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
let override = null;
try { const saved=sessionStorage.getItem('merge-motion-choice'); if(saved==='on'||saved==='off')override=saved==='on'; } catch {}
export function motionAllowed() { return override ?? !motionMedia.matches; }
export function setMotionPreference(enabled) {
 override=enabled;
 try {sessionStorage.setItem('merge-motion-choice',enabled?'on':'off');}catch{}
 document.documentElement.dataset.motion=enabled?'on':'off';
 window.dispatchEvent(new CustomEvent('merge:motion-preference'));
}
export function syncMotionAttribute() { document.documentElement.dataset.motion=motionAllowed()?'on':'off'; }
syncMotionAttribute();
motionMedia.addEventListener('change',()=>{syncMotionAttribute();window.dispatchEvent(new CustomEvent('merge:motion-preference'));});
