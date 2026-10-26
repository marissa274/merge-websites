import * as THREE from 'three';
export const CAMERA_POINTS = [[0,3.4,17],[10,4,8],[18,3,-3],[1,4,-19],[-13,3.4,-5]];
export const LOOK_POINTS = [[0,1.5,0],[0,2,0],[13,1.6,-12],[-10,2,-10],[-8,1.5,0]];
export function createCameraRoute() {
 const route = new THREE.CatmullRomCurve3(CAMERA_POINTS.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.4);
 const targets = new THREE.CatmullRomCurve3(LOOK_POINTS.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.35);
 return progress=>({position:route.getPoint(THREE.MathUtils.clamp(progress,0,1)),target:targets.getPoint(THREE.MathUtils.clamp(progress,0,1))});
}
export function chapterAt(progress,count=5) {return Math.min(count-1,Math.max(0,Math.round(progress*(count-1))));}
