
(() => {
 const root=document.getElementById('mk-collection-editorial');
 const first=root.querySelector('.mk-canvas');

 const saved=window.openai?.widgetState;
 const canvases=[first];const restoreViews=[];
 canvases.forEach((canvas,variantIndex)=>{
  const grid=canvas.querySelector('.mk-grid');const pieces=Array.from(grid.children);
  const search=canvas.querySelector('input[type=search]');const filterButton=canvas.querySelector('.mk-filter-toggle');const panel=canvas.querySelector('.mk-filter-panel');const sort=canvas.querySelector('select');const dialog=canvas.querySelector('dialog');
  const state={category:'All',query:'',gap:18,radius:8,ambient:true};
  const restore=saved?.privateContent?.editorial;
  if(restore&&typeof restore.query==='string'){state.query=restore.query;state.category=restore.category||'All';search.value=state.query;}
  function remember(){const snapshot=canvases.map(c=>({query:c.querySelector('input').value,category:c.querySelector('[data-category][aria-pressed="true"]')?.dataset.category||'All'}));window.openai?.setWidgetState?.({modelContent:{collectionProposal:'Galerie éditoriale',category:state.category},privateContent:{editorial:snapshot[0]}})?.catch(()=>{});}
  function render(){
   canvas.dataset.filtered=String(state.category!=='All'||!!state.query);
   let count=0;pieces.forEach(piece=>{piece.hidden=!((state.category==='All'||piece.dataset.category===state.category)&&`${piece.dataset.name} ${piece.dataset.category}`.toLowerCase().includes(state.query.toLowerCase()));if(!piece.hidden)count++;});
   canvas.querySelector('.mk-count').textContent=`${count} design ${count===1?'study':'studies'}`;canvas.querySelector('.mk-empty').hidden=count!==0;
   canvas.querySelectorAll('button[data-category]').forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.category===state.category)));
   canvas.style.setProperty('--mk-gap',`${state.gap}px`);canvas.style.setProperty('--mk-radius',`${state.radius}px`);canvas.dataset.ambient=String(state.ambient);
  }
  search.addEventListener('input',()=>{state.query=search.value;render();remember();});
  filterButton.addEventListener('click',()=>{panel.hidden=!panel.hidden;filterButton.setAttribute('aria-expanded',String(!panel.hidden));});
  canvas.querySelectorAll('button[data-category]').forEach(chip=>chip.addEventListener('click',()=>{state.category=chip.dataset.category;render();remember();}));
  sort.addEventListener('change',()=>{const ordered=sort.value==='name'?[...pieces].sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name)):pieces;ordered.forEach(p=>grid.appendChild(p));remember();});
  pieces.forEach(piece=>{
   const strip=document.createElement('div');strip.className='mk-action-strip';const preview=document.createElement('button');preview.textContent='Preview';preview.type='button';preview.className='cursor-interaction';const buy=document.createElement('button');buy.type='button';buy.textContent='Buy now';buy.disabled=true;buy.setAttribute('aria-label','Concept — not currently for sale');strip.append(preview,buy);piece.appendChild(strip);
   const show=()=>{canvas.style.setProperty('--mk-glow',getComputedStyle(piece).getPropertyValue('--piece-glow'));};
   piece.addEventListener('pointerenter',show);piece.addEventListener('focusin',show);
   const open=()=>{dialog.querySelector('h2').textContent=piece.dataset.name;const target=dialog.querySelector('.mk-dialog-visual');target.replaceChildren(piece.querySelector('.mk-project').cloneNode(true));target.style.setProperty('--piece-paper',getComputedStyle(piece).getPropertyValue('--piece-paper'));target.style.setProperty('--piece-ink',getComputedStyle(piece).getPropertyValue('--piece-ink'));dialog.showModal();};
   piece.querySelector('.mk-open').addEventListener('click',open);preview.addEventListener('click',open);
  });
  dialog.querySelector('.mk-close').addEventListener('click',()=>dialog.close());
  canvas.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){panel.hidden=true;filterButton.setAttribute('aria-expanded','false');filterButton.focus();}});
  restoreViews.push(snapshot=>{if(!snapshot||typeof snapshot.query!=='string')return;state.query=snapshot.query;state.category=snapshot.category||'All';search.value=state.query;render();});
  render();
  if(globalThis.Tweak){const tweak=new Tweak({container:canvas,onChange:render});tweak.addSlider(state,'gap',{label:'Espacement des projets',min:4,max:28,step:2,unit:'px'});tweak.addSlider(state,'radius',{label:'Arrondis',min:0,max:24,step:2,unit:'px'});tweak.addToggle(state,'ambient',{label:'Ambiance colorée'});}
 });
 window.addEventListener('openai:set_globals',event=>{const state=event.detail?.globals?.widgetState;if(!state?.privateContent)return;restoreViews[0](state.privateContent.editorial);});
 if(globalThis.lucide)lucide.createIcons({attrs:{width:16,height:16}});
})();
