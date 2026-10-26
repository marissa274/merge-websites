import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ExpoScaleEase } from 'gsap/EasePack';
gsap.registerPlugin(ExpoScaleEase);
import { createCameraRoute } from './cinematic-camera.js';
import { motionAllowed } from './motion-preferences.js';
// Original geometry and palette tokens; no source-site models, shaders or textures.
const SCENE_TOKENS={sky:0xf5efff,soil:0x434a32,grass:0x8a9271,water:0x332847,chrome:0xd4c5ef,glass:0xc4a6f4,stone:0x9c94a5,sun:0xfff1de,particles:0x614476,light:0xffffff};
export function createEmotionScene(canvas) {
 let renderer;
 try {renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});} catch(error) {return {supported:false,ready:Promise.resolve(),setProgress(){},enter(){return Promise.resolve()},setEnabled(){},dispose(){}};}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 const scene=new THREE.Scene();scene.background=new THREE.Color(SCENE_TOKENS.sky);scene.fog=new THREE.FogExp2(SCENE_TOKENS.sky,.022);
 const camera=new THREE.PerspectiveCamera(42,1,.1,180);
 const envGenerator=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();
 const envTarget=envGenerator.fromScene(environment,.05);scene.environment=envTarget.texture;environment.dispose();envGenerator.dispose();
 scene.add(new THREE.HemisphereLight(SCENE_TOKENS.light,SCENE_TOKENS.grass,2.1));
 const sun=new THREE.DirectionalLight(SCENE_TOKENS.sun,3.5);sun.position.set(8,18,12);scene.add(sun);
 const rim=new THREE.DirectionalLight(SCENE_TOKENS.glass,2);rim.position.set(-15,6,-10);scene.add(rim);
 const terrainGeometry=new THREE.PlaneGeometry(135,135,90,90);terrainGeometry.rotateX(-Math.PI/2);
 const position=terrainGeometry.attributes.position;
 for(let i=0;i<position.count;i++){
  const x=position.getX(i),z=position.getZ(i),distance=Math.hypot(x,z);
  const hollow=1-THREE.MathUtils.smoothstep(distance,10,18);
  const hill=Math.sin(x*.11)*Math.cos(z*.09)*1.4+Math.sin(x*.21+z*.13)*.4;
  position.setY(i,-1.3+hill-hollow*1.5);
 }
 terrainGeometry.computeVertexNormals();
 scene.add(new THREE.Mesh(terrainGeometry,new THREE.MeshStandardMaterial({color:SCENE_TOKENS.soil,roughness:.95})));
 const water=new THREE.Mesh(new THREE.CircleGeometry(12.8,96),new THREE.MeshPhysicalMaterial({color:SCENE_TOKENS.water,metalness:.6,roughness:.12,clearcoat:1}));water.rotation.x=-Math.PI/2;water.position.y=-1.45;scene.add(water);
 const stoneMaterial=new THREE.MeshStandardMaterial({color:SCENE_TOKENS.stone,roughness:.45,metalness:.2});
 const chrome=new THREE.MeshPhysicalMaterial({color:SCENE_TOKENS.chrome,metalness:.92,roughness:.14,clearcoat:1});
 const glass=new THREE.MeshPhysicalMaterial({color:SCENE_TOKENS.glass,roughness:.08,transmission:.9,thickness:1.3,ior:1.45,metalness:0,clearcoat:1});
 const centerpiece=new THREE.Group();centerpiece.position.set(0,2,0);scene.add(centerpiece);
 const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.85,.34,160,20,2,3),chrome);knot.rotation.set(.3,0,.25);centerpiece.add(knot);
 const orbit=new THREE.Mesh(new THREE.TorusGeometry(3.3,.12,12,120),glass);orbit.rotation.x=.9;orbit.rotation.y=.4;centerpiece.add(orbit);
 const satellite=new THREE.Mesh(new THREE.IcosahedronGeometry(.65,3),glass);satellite.position.set(2.7,.8,1);centerpiece.add(satellite);
 const count=window.innerWidth<700?2200:5000,points=new Float32Array(count*3),seeds=new Float32Array(count);
 for(let i=0;i<count;i++){
  const a=i/count*Math.PI*2,rad=2.7+.32*Math.sin(a*19);
  points[i*3]=Math.cos(a*2)*rad;points[i*3+1]=Math.sin(a*3)*1.5;points[i*3+2]=Math.sin(a*2)*rad;seeds[i]=Math.random();
 }
 const particleGeometry=new THREE.BufferGeometry();particleGeometry.setAttribute('position',new THREE.BufferAttribute(points,3));particleGeometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,1));
 const particleMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uTime:{value:0},uProgress:{value:0},uColor:{value:new THREE.Color(SCENE_TOKENS.particles)}},vertexShader:`attribute float aSeed;uniform float uTime;uniform float uProgress;varying float vAlpha;
 void main(){vec3 p=position;float angle=aSeed*6.283185;vec3 ball=normalize(position+vec3(.01))*3.2;float morph=smoothstep(.05,.32,uProgress)*(1.0-smoothstep(.38,.7,uProgress));p=mix(p,ball,morph);p+=.08*sin(vec3(angle)+uTime*.6);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(32.0/-mv.z,1.,4.);vAlpha=.45+.5*sin(aSeed*20.+uTime*.3);}`,fragmentShader:`uniform vec3 uColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(uColor,vAlpha*smoothstep(.5,.1,d));}`});
 const particles=new THREE.Points(particleGeometry,particleMaterial);centerpiece.add(particles);
 // Two further camera destinations: a branching sculpture and an architectural gate.
 const tree=new THREE.Group();tree.position.set(13,-.7,-12);scene.add(tree);
 for(let i=0;i<11;i++){
  const height=2.5+(i%4)*.65,stem=new THREE.Mesh(new THREE.CylinderGeometry(.1,.16,height,8),chrome);stem.position.set(Math.sin(i*2.4)*1.3,height/2,Math.cos(i*2.4)*1.3);stem.rotation.z=Math.sin(i)*.35;tree.add(stem);
  const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.65+(i%3)*.15,1),i%3?glass:chrome);leaf.position.copy(stem.position);leaf.position.y+=height/2;leaf.scale.y=1.35;tree.add(leaf);
 }
 const gate=new THREE.Group();gate.position.set(-10,-.7,-10);scene.add(gate);
 for(const x of [-2,2]){const pillar=new THREE.Mesh(new THREE.BoxGeometry(1,6,1.7),stoneMaterial);pillar.position.set(x,2.7,0);gate.add(pillar);}
 const arch=new THREE.Mesh(new THREE.TorusGeometry(2,.5,12,70,Math.PI),chrome);arch.position.y=5.5;gate.add(arch);
 const smallRing=new THREE.Mesh(new THREE.TorusGeometry(2,.55,20,90),glass);smallRing.position.set(-8,1.8,0);smallRing.rotation.set(.4,0,.5);scene.add(smallRing);
 const dummy=new THREE.Object3D(),grassGeometry=new THREE.ConeGeometry(.045,.7,3),grassMaterial=new THREE.MeshStandardMaterial({color:SCENE_TOKENS.grass,roughness:1});
 const grassCount=window.innerWidth<700?1400:3500,grass=new THREE.InstancedMesh(grassGeometry,grassMaterial,grassCount);let planted=0;
 for(let i=0;i<grassCount*4&&planted<grassCount;i++){
  const x=(Math.random()-.5)*75,z=(Math.random()-.5)*75,d=Math.hypot(x,z);if(d<14)continue;
  const hill=Math.sin(x*.11)*Math.cos(z*.09)*1.4+Math.sin(x*.21+z*.13)*.4;
  dummy.position.set(x,-.95+hill,z);dummy.rotation.set(.15*Math.sin(i),i*1.3,.15*Math.cos(i));dummy.scale.setScalar(.6+Math.random()*.8);dummy.updateMatrix();grass.setMatrixAt(planted++,dummy.matrix);
 }
 grass.count=planted;scene.add(grass);
 const sceneTarget=new THREE.WebGLRenderTarget(1,1,{depthBuffer:true});
 const postScene=new THREE.Scene(),postCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
 const portalMaterial=new THREE.ShaderMaterial({depthTest:false,depthWrite:false,toneMapped:false,uniforms:{uScene:{value:sceneTarget.texture},uOpening:{value:0},uAspect:{value:1},uPaper:{value:new THREE.Color(SCENE_TOKENS.sky)},uEdge:{value:new THREE.Color(SCENE_TOKENS.glass)}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`
 uniform sampler2D uScene;uniform float uOpening;uniform float uAspect;uniform vec3 uPaper;uniform vec3 uEdge;varying vec2 vUv;
 void main(){
  vec2 q=(vUv-.5)*vec2(uAspect,1.);float d=length(q);float radius=uOpening*length(vec2(uAspect,1.))*.7;
  float envelope=sin(uOpening*3.14159265);float ripple=exp(-abs(d-radius)*65.)*envelope;
  vec2 radial=normalize(q+vec2(.0001))/vec2(uAspect,1.);vec2 displaced=vUv+radial*ripple*.025;
  float r=texture2D(uScene,displaced+radial*ripple*.006).r;
  float g=texture2D(uScene,displaced).g;
  float b=texture2D(uScene,displaced-radial*ripple*.006).b;
  float visible=1.-smoothstep(radius-.015,radius+.015,d);
  vec3 color=mix(uPaper,vec3(r,g,b),visible);color=mix(color,uEdge,ripple*.2);
  gl_FragColor=vec4(color,1.);
  #include <colorspace_fragment>
 }`});
 const portalQuad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),portalMaterial);postScene.add(portalQuad);
 const route=createCameraRoute(),state={progress:0,intro:12},pointer={x:0,y:0},pointerSmooth={x:0,y:0};let enabled=motionAllowed(),entered=false,visible=true,disposed=false,previousTime=0,time=0;
 function resize(){const width=canvas.clientWidth||innerWidth,height=canvas.clientHeight||innerHeight;renderer.setSize(width,height,false);sceneTarget.setSize(Math.round(width*renderer.getPixelRatio()),Math.round(height*renderer.getPixelRatio()));portalMaterial.uniforms.uAspect.value=width/Math.max(1,height);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix();render(performance.now());}
 function render(now){
  if(disposed)return;
  const dt=Math.min((now-previousTime)/1000||0,.05);previousTime=now;
  if(!visible||document.hidden)return;
  if(enabled){time+=dt;pointerSmooth.x+=(pointer.x-pointerSmooth.x)*.04;pointerSmooth.y+=(pointer.y-pointerSmooth.y)*.04;}
  const sample=route(state.progress);camera.position.copy(sample.position);camera.position.y+=state.intro;camera.position.z+=state.intro;
  if(enabled&&entered){camera.position.x+=pointerSmooth.x*.45;camera.position.y+=pointerSmooth.y*.25;}
  camera.lookAt(sample.target);
  centerpiece.rotation.y=enabled?time*.09:0;knot.rotation.z=.25+(enabled?Math.sin(time*.3)*.06:0);satellite.position.y=.8+(enabled?Math.sin(time*.8)*.18:0);
  particleMaterial.uniforms.uTime.value=time;particleMaterial.uniforms.uProgress.value=state.progress;
  if(state.intro>.001){
   portalMaterial.uniforms.uOpening.value=1-state.intro/12;
   renderer.setRenderTarget(sceneTarget);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(postScene,postCamera);
  }else renderer.render(scene,camera);
 }
 const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;},{rootMargin:'200px'});observer.observe(canvas);
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
 function onPointer(event){pointer.x=event.clientX/innerWidth*2-1;pointer.y=-(event.clientY/innerHeight*2-1);}
 window.addEventListener('pointermove',onPointer,{passive:true});
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();canvas.classList.add('scene-unavailable');window.dispatchEvent(new CustomEvent('merge:scene-unavailable'));});
 resize();if(enabled)renderer.setAnimationLoop(render);
 return {supported:true,ready:Promise.resolve(),setProgress(value){state.progress=THREE.MathUtils.clamp(value,0,1);if(!enabled)render(performance.now());},
  enter(animate=true){entered=true;return new Promise(resolve=>{if(!animate||!enabled){state.intro=0;render(performance.now());resolve();return;}gsap.to(state,{intro:0,duration:3,ease:'expoScale(8,2,power1.inOut)',onComplete:resolve});});},
  setEnabled(value){enabled=value;renderer.setAnimationLoop(value?render:null);if(!value){pointerSmooth.x=0;pointerSmooth.y=0;}render(performance.now());},
  dispose(){disposed=true;renderer.setAnimationLoop(null);observer.disconnect();resizeObserver.disconnect();window.removeEventListener('pointermove',onPointer);scene.traverse(object=>{object.geometry?.dispose();if(object.material){for(const material of [].concat(object.material))material.dispose();}});envTarget.dispose();sceneTarget.dispose();portalQuad.geometry.dispose();portalMaterial.dispose();renderer.dispose();}
 };
}
