import { animate, stagger, inView } from 'motion';
import { validateMessage, createDraft } from './message.js';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
const activeAnimations = new Set();
function motionEnabled() { return !reduced.matches && !paused; }
function track(animation) {
  activeAnimations.add(animation);
  Promise.resolve(animation).finally(() => activeAnimations.delete(animation));
  return animation;
}
function reveal(element, delay = 0) {
  if (paused) return;
  const options = { duration: reduced.matches ? .15 : .3, ease: 'easeOut', delay };
  const frames = reduced.matches ? { opacity: [0, 1] } : { opacity: [0, 1], y: [12, 0], filter: ['blur(4px)', 'blur(0px)'] };
  track(animate(element, frames, options));
}
function updateMotion() {
  document.body.dataset.motion = paused || reduced.matches ? 'off' : 'on';
  const button = $('#motion-toggle');
  button.textContent = reduced.matches ? 'Motion: reduced' : paused ? 'Motion: paused' : 'Motion: on';
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', reduced.matches ? 'Reduced motion follows your system setting' : paused ? 'Resume animations' : 'Pause animations');
  if (!motionEnabled()) {
    activeAnimations.forEach(animation => animation.complete());
    document.documentElement.style.scrollBehavior = 'auto';
  } else document.documentElement.style.scrollBehavior = '';
}
$('#motion-toggle').addEventListener('click', () => { paused = !paused; updateMotion(); });
reduced.addEventListener('change', updateMotion);
updateMotion();
if (!paused) {
  track(animate($$('.intro'), reduced.matches ? { opacity: [0, 1] } : { opacity: [0, 1], y: [12, 0], filter: ['blur(4px)', 'blur(0px)'] }, { duration: reduced.matches ? .15 : .3, delay: stagger(.1), ease: 'easeOut' }));
}
inView('.reveal', element => reveal(element), { amount: .15 });
const ambientObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  entry.target.classList.toggle('offscreen', !entry.isIntersecting);
}));
$$('.art,.poster,.flower').forEach(element => ambientObserver.observe(element));
document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
// Passive progress indicator never controls or blocks native scrolling.
const progress = document.createElement('div');
progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
let scrollScheduled = false;
function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
  scrollScheduled = false;
}
addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
addEventListener('resize', updateProgress); updateProgress();
const dialogAnimations = new WeakMap();
const closingDialogs = new WeakSet();
function openDialog(dialog) {
  dialogAnimations.get(dialog)?.complete();
  if (!dialog.open) dialog.showModal();
  const effect = animate(dialog, motionEnabled() ? { opacity: [0, 1], y: [12, 0], filter: ['blur(4px)', 'blur(0px)'] } : { opacity: [0, 1] }, { duration: motionEnabled() ? .3 : .15, ease: 'easeOut' });
  dialogAnimations.set(dialog, effect); track(effect);
}
async function closeDialog(dialog) {
  if (!dialog.open || closingDialogs.has(dialog)) return;
  closingDialogs.add(dialog);
  dialogAnimations.get(dialog)?.complete();
  const effect = animate(dialog, motionEnabled() ? { opacity: [1, 0], y: [0, -12], filter: ['blur(0px)', 'blur(4px)'] } : { opacity: [1, 0] }, { duration: .15, ease: 'easeOut' });
  dialogAnimations.set(dialog, effect); track(effect);
  await effect;
  dialog.close();
  dialog.style.removeProperty('opacity'); dialog.style.removeProperty('transform'); dialog.style.removeProperty('filter');
  closingDialogs.delete(dialog);
}
$$('dialog').forEach(dialog => {
  $$('[data-close]', dialog).forEach(button => button.addEventListener('click', () => closeDialog(dialog)));
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(dialog); });
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog); });
});
$('.menu-button').addEventListener('click', () => openDialog($('#menu')));
$$('#menu a').forEach(link => link.addEventListener('click', () => closeDialog($('#menu'))));
const projects = [
  { id: 'sillage', name: 'Sillage', category: 'Brand strategy & identity / Concept project', description: 'A visual exploration for an architecture practice. Warm materials, sculptural shapes, and a restrained identity create a world that feels considered and human. Replace this description with your project challenge, your role, and the design decisions behind your work.' },
  { id: 'orbital', name: 'Orbital', category: 'Art direction & digital / Concept project', description: 'An imagined digital platform built around new perspectives. Orbital geometry and an electric blue palette form a flexible visual language. Use this space to explain your process and show what makes your approach distinctive.' },
  { id: 'pulse', name: 'Pulse', category: 'Visual identity & motion / Concept project', description: 'An expressive identity inspired by sound and rhythm. Oversized lettering and a warm orange palette meet graphic speaker forms and responsive motion. Replace this concept with your own case study and real project outcomes.' }
];
let projectIndex = 0;
function showProject(index) {
  projectIndex = Math.max(0, Math.min(projects.length - 1, index));
  const project = projects[projectIndex];
  $('#project-title').textContent = project.name; $('#project-category').textContent = project.category; $('#project-description').textContent = project.description;
  const source = project.id === 'pulse' ? $('.featured .poster') : $(`.art.${project.id}`);
  const artwork = source.cloneNode(true); artwork.removeAttribute('aria-label'); artwork.removeAttribute('data-project'); artwork.classList.remove('project-open', 'offscreen');
  if (artwork.tagName === 'BUTTON') { artwork.disabled = true; artwork.style.opacity = '1'; }
  $('#project-art').replaceChildren(artwork);
  $('#project-position').textContent = `0${projectIndex + 1} / 03`;
  $('#previous-project').disabled = projectIndex === 0; $('#next-project').disabled = projectIndex === projects.length - 1;
}
$$('.project-open').forEach(button => button.addEventListener('click', () => { showProject(projects.findIndex(project => project.id === button.dataset.project)); openDialog($('#project-dialog')); }));
$('#previous-project').addEventListener('click', () => showProject(projectIndex - 1));
$('#next-project').addEventListener('click', () => showProject(projectIndex + 1));
$('#project-dialog').addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' && projectIndex < 2) { event.preventDefault(); showProject(projectIndex + 1); }
  if (event.key === 'ArrowLeft' && projectIndex > 0) { event.preventDefault(); showProject(projectIndex - 1); }
});
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const category = button.dataset.filter;
  $$('.project-card').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  $('.project-grid').classList.toggle('filtered', category !== 'all');
  const count = $$('.project-card:not([hidden])').length;
  $('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
}));
$('.services').addEventListener('toggle', event => {
  if (event.target.open) { const body = $('.service-body', event.target); if (body) track(animate(body, { opacity: [0, 1] }, { duration: .15 })); }
}, true);
$('#contact-open').addEventListener('click', () => openDialog($('#contact-dialog')));
const fields = ['sender', 'message'];
function showError(field, error) { const input = $(`#${field}`); input.setAttribute('aria-invalid', String(Boolean(error))); $(`#${field}-error`).textContent = error || ''; }
fields.forEach(field => $(`#${field}`).addEventListener('blur', () => { const errors = validateMessage($('#sender').value, $('#message').value); showError(field, errors[field]); }));
fields.forEach(field => $(`#${field}`).addEventListener('input', () => { if ($(`#${field}`).getAttribute('aria-invalid') === 'true') { const errors = validateMessage($('#sender').value, $('#message').value); showError(field, errors[field]); } }));
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const errors = validateMessage($('#sender').value, $('#message').value);
  fields.forEach(field => showError(field, errors[field]));
  const invalid = fields.find(field => errors[field]); if (invalid) { $(`#${invalid}`).focus(); return; }
  $('#draft').value = createDraft($('#sender').value, $('#message').value);
  $('#message-result').hidden = false; $('#copy-status').textContent = 'Prepared locally. Nothing has been sent.';
  $('#draft').focus(); reveal($('#message-result'));
});
$('#copy-draft').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#draft').value); $('#copy-status').textContent = 'Message copied.'; }
  catch { $('#draft').focus(); $('#draft').select(); $('#copy-status').textContent = 'Select and copy the message using your keyboard.'; }
});
$('#download-draft').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([$('#draft').value], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'portfolio-message.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('#year').textContent = new Date().getFullYear();
