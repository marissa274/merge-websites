// Offline review of the actual SVG material. Not a browser screenshot or interaction test.
import fs from 'node:fs';import vm from 'node:vm';import {createRequire} from 'node:module';
import {renderToStaticMarkup} from 'react-dom/server';import ts from 'typescript';import sharp from 'sharp';import postcss from 'postcss';
import {model,layoutFor} from './water-model.mjs';
const require=createRequire(import.meta.url),exports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/water-story.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText,{
 exports,require(n){if(n==='react')return {useId:()=>':qa:',useRef:()=>({current:null}),useEffect:()=>{}};if(n==='./water-model')return model;return require(n)},
});
const source=renderToStaticMarkup(exports.WaterStory()).replaceAll('="true"','=""').match(/<svg[\s\S]*<\/svg>/)[0];
const tokens={};for(const m of fs.readFileSync('public/tokens.css','utf8').matchAll(/(--(?:water|fx)-[\w-]+):(#[a-f\d]+)/gi))tokens[m[1]]??=m[2];
let paint='';postcss.parse(fs.readFileSync('app/water.css','utf8')).walkRules(rule=>{
 if(rule.parent.type!=='root')return;const declarations=[];
 rule.walkDecls(d=>{if(['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','opacity','stop-color'].includes(d.prop))declarations.push(`${d.prop}:${d.value.replace(/var\((--[\w-]+)\)/g,(_,key)=>tokens[key]||'inherit')}`)});
 if(declarations.length)paint+=`${rule.selector}{${declarations.join(';')}}`;
});
const width=Number(process.argv[2])||1280,l=layoutFor(width),cellW=Math.min(width,640),cellH=Math.round(l.viewport*cellW/width);
function svgArt(scroll,detail=false){
 let svg=source.replace('<svg ',`<svg xmlns="http://www.w3.org/2000/svg" width="${detail?360:width}" height="${detail?420:l.viewport}" viewBox="${detail?'0 0 180 210':`0 0 ${width} ${l.viewport}`}" `).replace('<defs>',`<style>${paint}</style><defs>`);
 const f=model.waterFrame(scroll,l);
 const transform=detail?'translate(90 100) scale(1.15) translate(-55 -70)':`translate(${f.x} ${f.y-scroll}) rotate(${f.tilt}) scale(${f.width/120} ${f.height/150}) translate(-55 -70)`;
 svg=svg.replace('data-story-drop="" opacity="0"',`data-story-drop="" opacity="${detail?1:f.opacity}" transform="${transform}"`);
 const water=model.footerWater(l,f.spread,.25,scroll);
 svg=svg.replace('data-footer-water=""',`data-footer-water="" d="${water}"`).replace('data-footer-water="" d="'+water+'" fill=',`data-footer-water="" d="${water}" fill=`);
 if(f.spread>0)svg=svg.replace(/(data-footer-water=""[^>]*?)opacity="0"/,`$1opacity="1"`);
 if(f.phase==='surface'&&!detail){
  let i=0;svg=svg.replace(/<g data-water-wave="" opacity="0">([\s\S]*?)<\/g>/g,(_,paths)=>{
   const age=.12+i++*.22;if(i>3)return `<g opacity="0">${paths}</g>`;
   return `<g opacity="${.8-i*.15}">${paths.replaceAll('<path ',`<path d="${model.surfaceWave(width*.48,l.viewport*.48,age,1,width<640)}" `)}</g>`;
  });
 }
 if(f.phase==='splash')svg=svg.replace('data-splash-fan=""',`data-splash-fan="" d="${model.splashFan(width*.5,l.finalTop+64-scroll,270,width<640)}"`).replace(/(data-splash-fan=""[^>]*?)opacity="0"/,'$1opacity=".85"');
 return svg;
}
await sharp(Buffer.from(svgArt(0,true))).flatten({background:tokens['--fx-black']}).png().toFile('/tmp/mk-lab-water-drop-detail.png');
const find=phase=>{const s=[];for(let x=0;x<l.finalTop;x++)if(model.waterFrame(x,l).phase===phase)s.push(x);return s[Math.floor(s.length*.55)]};
const samples=[['Surface · pink / orange',0],['A single drop emerges',find('emerge')],['Collection · quiet presence',l.heroBottom+200],['About · a brief pause',l.aboutTop-l.viewport*.2],['Impact · outward splash',find('splash')],['Footer · settled water',l.finalTop-25]];
const images=[];
for(const [title,scroll] of samples){
 const svg=svgArt(scroll).replace('</svg>',`<text x="20" y="40" style="fill:#f9f6f7;font-family:sans-serif;font-size:${width<640?13:24}px">${title}</text></svg>`);
 images.push(await sharp(Buffer.from(svg)).flatten({background:tokens['--fx-black']}).resize(cellW).png().toBuffer());
}
const file=`/tmp/mk-lab-water-story-${width}.png`;
await sharp({create:{width:cellW*2,height:cellH*3,channels:3,background:tokens['--fx-black']}}).composite(images.map((input,i)=>({input,left:i%2*cellW,top:Math.floor(i/2)*cellH}))).png().toFile(file);
console.log(`Offline SVG artwork: ${file}; /tmp/mk-lab-water-drop-detail.png`);
