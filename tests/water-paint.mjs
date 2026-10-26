import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import {model} from './water-model.mjs';

// Exercise CSS/presentation-attribute precedence in an SVG rasterizer. Not browser coverage.
const css=fs.readFileSync('app/water.css','utf8');
const path=model.splashFan(160,100,300);
async function litPixels(opacity){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="140"><style>${css}</style><path data-splash-fan="true" class="water-splash-fan" d="${path}" stroke="#ff75bc" opacity="${opacity}"/></svg>`;
 const {data,info}=await sharp(Buffer.from(svg)).flatten({background:'#000000'}).removeAlpha().raw().toBuffer({resolveWithObject:true});
 let lit=0,brightness=0;for(let i=0;i<data.length;i+=info.channels){const value=data[i]+data[i+1]+data[i+2];if(value>0)lit++;brightness+=value;}
 return {lit,brightness};
}
assert.equal((await litPixels(0)).lit,0,'settled/paused splash must have no visible pixels');
const faint=await litPixels(.2),active=await litPixels(.8);
assert.ok(faint.lit>0&&active.lit>=faint.lit,'impact remains visible when the runtime reveals it');
assert.ok(active.brightness>faint.brightness*2,'runtime opacity controls the fade intensity');
console.log('PASS rasterized splash visibility: hidden before/after impact, visible during impact');
