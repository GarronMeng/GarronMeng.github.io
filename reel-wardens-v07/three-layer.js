import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { createVFXSystem } from './vfx-system.js?v=0709c';

window.__RW3D_FAILED=false;clearTimeout(window.__rw3dTimer);

const API = window.RW3D = window.RW3D || {};
let renderer=null, scene=null, camera=null, canvas=null, stage=null, ro=null, raf=0;
let portal=null, portalCore=null, motes=null, floorGlow=null, shake=0, vfxSystem=null;
const actors=new Map(), bolts=[], impacts=[];
const timer=new THREE.Timer();
timer.connect(document);
const cameraBase=new THREE.Vector3(0,4.8,9.65);

const palette={
  guard:0x4c7ac3,ranger:0x4d9b66,mage:0x8b63cb,medic:0xc85b82,rogue:0xb5773d,prism:0xaecbff,
  crawler:0x697789,brute:0x806c5d,spitter:0x687856,seer:0x795b94,boss:0x994960
};
const getSaved=()=>{try{return localStorage.getItem('rw_three_mode')}catch(e){return null}};
const save=v=>{try{localStorage.setItem('rw_three_mode',v?'1':'0')}catch(e){}};
function webglOK(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}

API.ready=webglOK();if(API.ready){window.__RW3D_FAILED=false;clearTimeout(window.__rw3dTimer)}
API.enabled=API.ready&&getSaved()!=='0';
API.toggle=()=>{if(!API.ready)return;API.enabled=!API.enabled;save(API.enabled);applyMode();window.__RW_RERENDER?.()};
applyMode();
window.__RW_RERENDER?.();

function applyMode(){document.body.classList.toggle('rw-three-active',!!(API.ready&&API.enabled));if(!API.enabled){pause();return}queueMicrotask(mount)}
function material(color,rough=.72,metal=.06,emissive=0,ei=0){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive,emissiveIntensity:ei})}
function addMesh(parent,geometry,mat,pos=[0,0,0],rot=[0,0,0]){const o=new THREE.Mesh(geometry,mat);o.position.set(...pos);o.rotation.set(...rot);parent.add(o);return o}

function buildWorld(){
  scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0b111b,.055);
  camera=new THREE.PerspectiveCamera(34,2.3,.1,60);camera.position.copy(cameraBase);camera.lookAt(0,.72,0);
  scene.add(new THREE.HemisphereLight(0xa9c8ff,0x1b1521,2));
  const key=new THREE.DirectionalLight(0xffdfad,3.2);key.position.set(-3,7,5);scene.add(key);
  const rim=new THREE.PointLight(0x8a67ff,18,10,2);rim.position.set(4.4,2.3,-.4);scene.add(rim);
  addMesh(scene,new THREE.PlaneGeometry(12,6),material(0x111b28,.9,.02),[0,0,-.2],[-Math.PI/2,0,0]);
  floorGlow=addMesh(scene,new THREE.PlaneGeometry(9.6,.08),new THREE.MeshBasicMaterial({color:0x466a8c,transparent:true,opacity:.45}),[0,.018,.05],[-Math.PI/2,0,0]);
  for(let z=-2;z<=2;z+=1)addMesh(scene,new THREE.PlaneGeometry(9.4,.014),new THREE.MeshBasicMaterial({color:0x40516c,transparent:true,opacity:.17}),[0,.02,z],[-Math.PI/2,0,0]);
  const castle=new THREE.Group();castle.position.set(-5.1,0,-.2);scene.add(castle);
  addMesh(castle,new THREE.BoxGeometry(1.35,2,1.55),material(0x182232,.95),[0,1,0]);
  [-.45,.45].forEach(x=>{addMesh(castle,new THREE.BoxGeometry(.48,2.7,.5),material(0x1e2a3e,.9),[x,1.35,.1]);addMesh(castle,new THREE.ConeGeometry(.42,.62,4),material(0x29364c,.88),[x,3,.1],[0,Math.PI/4,0])});
  [0,.38,-.38].forEach(z=>addMesh(castle,new THREE.BoxGeometry(.12,.12,.12),new THREE.MeshBasicMaterial({color:0xe8ba67}),[.69,1.4,z]));
  portal=new THREE.Group();portal.position.set(4.9,1.25,-.1);portal.rotation.y=-.18;scene.add(portal);
  addMesh(portal,new THREE.TorusGeometry(1.05,.12,12,32),material(0x7956bd,.3,.25,0x5d2bba,2.1));
  portalCore=addMesh(portal,new THREE.CircleGeometry(.86,40),new THREE.MeshBasicMaterial({color:0x6841a4,transparent:true,opacity:.34,side:THREE.DoubleSide}),[0,0,-.02]);
  const pts=[];for(let i=0;i<46;i++){const a=Math.random()*Math.PI*2,r=.78+Math.random()*.55;pts.push(Math.cos(a)*r,Math.sin(a)*r,(Math.random()-.5)*.22)}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));motes=new THREE.Points(pg,new THREE.PointsMaterial({color:0xd6b3ff,size:.045,transparent:true,opacity:.7,sizeAttenuation:true}));portal.add(motes)
}
function actorMaterial(type,enemy){const color=palette[type]||0x7d879a;return material(color,.62,enemy?.08:.14,enemy?0x24070f:0x07121e,enemy?.16:.06)}
function buildActor(data,enemy){
  const g=new THREE.Group();g.userData.id=data.id;g.userData.enemy=enemy;
  const bodyMat=actorMaterial(data.type,enemy),skin=material(enemy?0x687181:0xd6a47f,.82),dark=material(enemy?0x252c39:0x252d40,.88);
  addMesh(g,new THREE.CylinderGeometry(.25,.31,.66,6),bodyMat,[0,.65,0]);addMesh(g,new THREE.SphereGeometry(.21,8,6),skin,[0,1.15,0]);addMesh(g,new THREE.BoxGeometry(.34,.11,.25),dark,[0,1.34,-.02],[0,0,.03]);
  const legL=addMesh(g,new THREE.BoxGeometry(.11,.46,.12),dark,[-.13,.23,0],[0,0,.03]),legR=addMesh(g,new THREE.BoxGeometry(.11,.46,.12),dark,[.13,.23,0],[0,0,-.03]);g.userData.legL=legL;g.userData.legR=legR;
  const weapon=new THREE.Group();weapon.position.set(enemy?-.35:.35,.72,0);g.add(weapon);g.userData.weapon=weapon;
  if(data.type==='guard'){addMesh(weapon,new THREE.BoxGeometry(.07,.62,.08),material(0xb8c6d9,.35,.7),[.06,.06,0],[0,0,-.12]);addMesh(weapon,new THREE.BoxGeometry(.35,.42,.08),material(0x6682a9,.55,.4),[-.03,.02,.05])}
  else if(data.type==='mage'||data.type==='seer'||data.type==='prism'){addMesh(weapon,new THREE.CylinderGeometry(.035,.05,.78,6),material(data.type==='prism'?0xf0d47b:0xb894e7,.35,.45,0x7040bd,.8),[0,.05,0],[0,0,.12]);addMesh(weapon,new THREE.OctahedronGeometry(.1,0),new THREE.MeshBasicMaterial({color:data.type==='prism'?0xffe89a:0xb47cf0}),[0,.45,0])}
  else if(data.type==='ranger'){const bow=addMesh(weapon,new THREE.TorusGeometry(.24,.022,6,16,Math.PI),material(0xc49459,.6,.15),[0,.05,0],[0,Math.PI/2,0]);bow.rotation.z=-Math.PI/2}
  else if(data.type==='medic'){addMesh(weapon,new THREE.BoxGeometry(.34,.12,.12),material(0xdcecff,.35,.4),[0,.04,0]);addMesh(weapon,new THREE.BoxGeometry(.10,.34,.12),material(0xdcecff,.35,.4),[0,.04,0])}
  else addMesh(weapon,new THREE.BoxGeometry(.06,.62,.09),material(0xe6d09b,.28,.7),[0,.04,0],[0,0,-.55]);
  const hpBar=new THREE.Group();hpBar.position.set(0,1.62,.02);hpBar.visible=false;g.add(hpBar);addMesh(hpBar,new THREE.PlaneGeometry(.68,.075),new THREE.MeshBasicMaterial({color:0x10151e,transparent:true,opacity:.92,depthTest:false,depthWrite:false}));const hpFill=addMesh(hpBar,new THREE.PlaneGeometry(.62,.045),new THREE.MeshBasicMaterial({color:enemy?0xdf6872:0x63d49b,depthTest:false,depthWrite:false}),[0,0,.006]);g.userData.hpBar=hpBar;g.userData.hpFill=hpFill;
  if(data.star>=2&&!enemy){const ring=addMesh(g,new THREE.TorusGeometry(.37,.025,8,24),new THREE.MeshBasicMaterial({color:data.star>=3?0xf2cf72:0x78baff,transparent:true,opacity:.65}),[0,.06,0],[Math.PI/2,0,0]);g.userData.starRing=ring}
  if(data.type==='boss')g.scale.setScalar(1.42);if(data.type==='brute')g.scale.setScalar(1.16);return g
}
function pos(i,enemy,battle=false){const ally=[[-1.20,-1.50],[-1.20,1.50],[-2.40,-1.00],[-2.40,1.00],[-3.60,-.50],[-3.60,.50]],foe=[[1.20,-1.50],[1.20,1.50],[2.40,-1.00],[2.40,1.00],[3.60,-.50],[3.60,.50]];const a=(enemy?foe:ally)[i]||[enemy?3.6:-3.6,0];const spread=battle?1:1.03;return{x:a[0]*spread,z:a[1]}}
function ensureStarRing(g,star){if(!g||g.userData.enemy)return;let ring=g.userData.starRing;if(star>=2&&!ring){ring=addMesh(g,new THREE.TorusGeometry(.37,.025,8,24),new THREE.MeshBasicMaterial({color:star>=3?0xf2cf72:0x78baff,transparent:true,opacity:.65}),[0,.06,0],[Math.PI/2,0,0]);g.userData.starRing=ring}else if(ring&&star>=2){ring.material.color.setHex(star>=3?0xf2cf72:0x78baff);ring.material.opacity=star>=3?.82:.65}else if(ring&&star<2){g.remove(ring);ring.geometry.dispose();ring.material.dispose();g.userData.starRing=null}}
function stateActors(){const st=window.__RW_GET_STATE?.();if(!st||st.screen==='menu')return[];if(st.phase==='battle'&&st.battle)return[...st.battle.allies.map((data,i)=>({data,i,enemy:false})),...st.battle.enemies.map((data,i)=>({data,i,enemy:true}))];return st.units.map((data,i)=>({data:{...data,maxHp:data.hp,hp:data.hp,shield:0,dead:false},i,enemy:false}))}
function disposeObject(g){g.traverse(o=>{o.geometry?.dispose?.();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose?.())})}
function addImpact(at,color=0xf4d47d,size=.2){if(!scene)return;const o=new THREE.Mesh(new THREE.RingGeometry(size*.48,size,18),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.78,side:THREE.DoubleSide,depthWrite:false}));o.position.copy(at);o.rotation.x=-Math.PI/2;scene.add(o);impacts.push({o,t:0})}
function markHit(g,power=1){if(g)g.userData.hit=Math.max(g.userData.hit||0,power)}
function syncActors(){
  if(!scene)return;const keep=new Set(),stNow=window.__RW_GET_STATE?.();
  for(const item of stateActors()){
    const d=item.data;keep.add(d.id);const p=pos(item.i,item.enemy,stNow?.phase==='battle');let g=actors.get(d.id);
    if(!g){g=buildActor(d,item.enemy);g.position.set(item.enemy?4.75:-4.75,0,p.z);g.userData.entering=1;actors.set(d.id,g);scene.add(g)}
    const wasDead=!!g.userData.dead;g.userData.homeX=p.x;g.userData.homeZ=p.z;g.userData.dead=d.hp<=0||d.dead;g.userData.targetY=g.userData.dead?-.28:0;g.userData.kind=d.type;g.userData.star=d.star||0;g.userData.inBattle=stNow?.phase==='battle';if(g.userData.hpBar)g.userData.hpBar.visible=!!g.userData.inBattle&&!g.userData.dead;ensureStarRing(g,g.userData.star);
    const ratio=Math.max(0,Math.min(1,(d.hp||0)/(d.maxHp||d.hp||1)));if(g.userData.hpFill){g.userData.hpFill.scale.x=Math.max(.001,ratio);g.userData.hpFill.position.x=-.31*(1-ratio)}
    if(!wasDead&&g.userData.dead){g.userData.deathBurst=1;addImpact(g.position.clone().add(new THREE.Vector3(0,.04,0)),item.enemy?0xd95b68:0x6ea8ff,d.type==='boss'?.48:.28)}
  }
  for(const [id,g] of actors)if(!keep.has(id)){scene.remove(g);disposeObject(g);actors.delete(id)}
}
function resize(){if(!renderer||!stage)return;const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
function ensureRenderer(){if(renderer)return;canvas=document.createElement('canvas');canvas.id='three-stage';canvas.setAttribute('aria-hidden','true');renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,Math.min(innerWidth||999,innerHeight||999)<520?1.35:1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x000000,0);buildWorld();vfxSystem=createVFXSystem({scene,actors,timer,shake:v=>shake=Math.max(shake,v)});timer.reset()}
function mount(){if(!API.enabled)return;const host=document.querySelector('.three-layer'),nextStage=host?.closest('.stage');if(!host||!nextStage){pause();return}ensureRenderer();if(canvas.parentElement!==host)host.appendChild(canvas);if(stage!==nextStage){ro?.disconnect();stage=nextStage;ro=new ResizeObserver(resize);ro.observe(stage);resize()}syncActors();document.body.classList.add('rw-three-active');if(!raf)animate()}
function pause(){if(raf){cancelAnimationFrame(raf);raf=0}document.body.classList.remove('rw-three-active')}
function destroy(){pause();ro?.disconnect();ro=null;for(const g of actors.values())disposeObject(g);actors.clear();for(const b of bolts){scene?.remove(b.o);b.o.geometry?.dispose?.();b.o.material?.dispose?.()}bolts.length=0;for(const e of impacts){scene?.remove(e.o);e.o.geometry?.dispose?.();e.o.material?.dispose?.()}impacts.length=0;if(scene)scene.traverse(o=>{o.geometry?.dispose?.();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose?.())});vfxSystem?.dispose?.();vfxSystem=null;renderer?.dispose?.();timer.dispose?.();renderer=null;scene=null;camera=null;canvas=null;stage=null}

function bossShock(g){if(!scene||!g)return;shake=Math.max(shake,.22);for(let i=0;i<4;i++)setTimeout(()=>addImpact(g.position.clone().add(new THREE.Vector3(0,.03,0)),0xba5b82,.38+i*.14),i*65)}
function spawnBolt({src,tgt,kind,good,srcType}){
  if(!API.enabled||!scene)return;const a=actors.get(src),b=actors.get(tgt);if(!a||!b)return;vfxSystem?.cast({src,tgt,kind,good,srcType});
  const melee=kind==='melee'||kind==='enemyMelee';
  if(melee){a.userData.lunge={target:b,t:0};a.userData.swing=1;setTimeout(()=>{if(b.parent){markHit(b,1);addImpact(b.position.clone().add(new THREE.Vector3(0,.04,0)),kind==='enemyMelee'?0xff727d:0xf4d47d,srcType==='boss'?.36:.2)}},130);if(srcType==='boss')setTimeout(()=>bossShock(a),80);return}
  const magic=kind==='magic'||kind==='enemyMagic',heal=kind==='heal';const color=heal?0x6ce0a9:magic?(kind==='enemyMagic'?0xd081ff:0xb983ff):kind==='enemyShot'?0xff817d:0xf4d47d;
  const orb=addMesh(scene,new THREE.SphereGeometry((magic||heal)?.09:.052,7,5),new THREE.MeshBasicMaterial({color}));orb.position.copy(a.position).add(new THREE.Vector3(0,.9,0));bolts.push({o:orb,a:orb.position.clone(),target:b,t:0,color,heal});a.userData.swing=1
}
function mergeActors({src,tgt}){const a=actors.get(src),b=actors.get(tgt);if(!a||!b)return;a.userData.merge={target:b,t:0};for(let i=0;i<5;i++)setTimeout(()=>{if(b.parent)addImpact(b.position.clone().add(new THREE.Vector3(0,.04,0)),i%2?0xf2cf72:0x78baff,.18+i*.04)},120+i*55)}
function levelActor({id,star}){const g=actors.get(id);if(!g)return;g.userData.star=star||g.userData.star||1;ensureStarRing(g,g.userData.star);g.userData.levelPulse=1;shake=Math.max(shake,star>=3?.13:.06);for(let i=0;i<6;i++)setTimeout(()=>{if(g.parent)addImpact(g.position.clone().add(new THREE.Vector3(0,.04,0)),star>=3?0xf2cf72:0x78baff,.18+i*.055)},i*65)}

function animate(ts){
  if(!renderer||!scene||!API.enabled)return;raf=requestAnimationFrame(animate);timer.update(ts);const t=timer.getElapsed(),dt=Math.min(.05,timer.getDelta?.()||.016),battleSpeed=window.__RW_GET_STATE?.()?.battleSpeed||1;
  portal.rotation.z=t*.15;if(motes)motes.rotation.z=-t*.11;if(portalCore){portalCore.material.opacity=.28+Math.sin(t*2.2)*.07;portalCore.scale.setScalar(1+Math.sin(t*1.7)*.025)}if(floorGlow)floorGlow.material.opacity=.34+Math.sin(t*1.4)*.08;
  let ix=0;
  for(const g of actors.values()){
    const baseScale=(g.userData.kind==='boss'?1.42:g.userData.kind==='brute'?1.16:1)*(g.userData.enemy?1:1+Math.max(0,(g.userData.star||1)-1)*.075);let desiredX=g.userData.homeX??0,desiredZ=g.userData.homeZ??0;
    if(g.userData.inBattle&&!g.userData.dead&&!g.userData.lunge&&!g.userData.merge){const dir=g.userData.enemy?-1:1;desiredX+=dir*(.08+Math.sin(t*1.7+ix)*.035)}
    if(g.userData.lunge){const L=g.userData.lunge,target=L.target;if(target?.parent){L.t+=.075*battleSpeed;const q=Math.min(1,L.t),push=Math.sin(Math.PI*q),contact=target.position.x+(g.userData.enemy?.62:-.62);desiredX=(g.userData.homeX??g.position.x)+(contact-(g.userData.homeX??g.position.x))*push;desiredZ=(g.userData.homeZ??g.position.z)+(target.position.z-(g.userData.homeZ??g.position.z))*push*.55;if(q>.32&&q<.68)g.userData.swing=Math.max(g.userData.swing||0,.9);if(q>=1)g.userData.lunge=null}else g.userData.lunge=null}
    if(g.userData.merge){const M=g.userData.merge,target=M.target;if(target?.parent){M.t+=.07;const q=Math.min(1,M.t);desiredX=(g.userData.homeX??g.position.x)+(target.position.x-(g.userData.homeX??g.position.x))*q;desiredZ=(g.userData.homeZ??g.position.z)+(target.position.z-(g.userData.homeZ??g.position.z))*q;g.scale.multiplyScalar(.965);if(q>=1)g.userData.merge=null}else g.userData.merge=null}
    const prevX=g.position.x;g.position.x+=(desiredX-g.position.x)*(g.userData.entering?.10:.2);g.position.z+=(desiredZ-g.position.z)*(g.userData.entering?.10:.18);if(g.userData.entering)g.userData.entering=Math.max(0,g.userData.entering-.035);
    const moving=Math.abs(g.position.x-prevX)>.002||g.userData.lunge||g.userData.merge,stride=moving?Math.sin(t*10+ix)*.5:Math.sin(t*2.2+ix)*.035;if(g.userData.legL){g.userData.legL.rotation.x=stride;g.userData.legR.rotation.x=-stride}
    const bob=g.userData.dead?0:Math.sin(t*2.5+ix*.8)*.03;g.position.y+=((g.userData.targetY??0)+bob-g.position.y)*.18;
    let targetScale=baseScale;if(g.userData.entering)targetScale*=.92;if(g.userData.hit){targetScale*=1+.07*g.userData.hit;g.userData.hit=Math.max(0,g.userData.hit-.13)}if(g.userData.levelPulse){targetScale*=1+.22*g.userData.levelPulse;g.userData.levelPulse=Math.max(0,g.userData.levelPulse-.035)}
    if(g.userData.dead){const targetRot=g.userData.enemy?-1.2:1.2;g.rotation.z+=(targetRot-g.rotation.z)*.09;targetScale*=.62}else g.rotation.z*=.82;g.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),.15);
    if(g.userData.starRing)g.userData.starRing.rotation.z=t*1.15;if(g.userData.hpBar&&camera){g.userData.hpBar.visible=!!g.userData.inBattle&&!g.userData.dead;g.userData.hpBar.quaternion.copy(g.quaternion).invert().multiply(camera.quaternion)}const w=g.userData.weapon;if(w){const sw=g.userData.swing||0;if(sw>0){w.rotation.z=Math.sin((1-sw)*Math.PI)*-.95;g.userData.swing=Math.max(0,sw-.14*battleSpeed)}else w.rotation.z*=.76}ix++
  }
  for(let i=bolts.length-1;i>=0;i--){const b=bolts[i];b.t+=.082*battleSpeed;const q=Math.min(1,b.t),target=b.target;if(target?.parent)b.b=target.position.clone().add(new THREE.Vector3(0,.85,0));const end=b.b||b.a;b.o.position.lerpVectors(b.a,end,q);b.o.position.y+=Math.sin(Math.PI*q)*.34;if(q>=1){if(target?.parent){markHit(target,b.heal?.45:1);addImpact(target.position.clone().add(new THREE.Vector3(0,.04,0)),b.color,b.heal?.16:.2)}scene.remove(b.o);b.o.geometry.dispose();b.o.material.dispose();bolts.splice(i,1)}}
  for(let i=impacts.length-1;i>=0;i--){const e=impacts[i];e.t+=.085*battleSpeed;e.o.scale.setScalar(1+e.t*1.8);e.o.material.opacity=Math.max(0,.72*(1-e.t));if(e.t>=1){scene.remove(e.o);e.o.geometry.dispose();e.o.material.dispose();impacts.splice(i,1)}}
  if(shake>0){shake*=.82;camera.position.set(cameraBase.x+(Math.random()-.5)*shake,cameraBase.y+(Math.random()-.5)*shake*.35,cameraBase.z);camera.lookAt(0,.72,0)}else if(camera.position.distanceTo(cameraBase)>.001){camera.position.lerp(cameraBase,.2);camera.lookAt(0,.72,0)}
  vfxSystem?.update(dt,t);renderer.render(scene,camera)
}

window.addEventListener('rwfx',e=>spawnBolt(e.detail));
window.addEventListener('rwmerge',e=>mergeActors(e.detail));
window.addEventListener('rwlevel',e=>levelActor(e.detail));
new MutationObserver(()=>{if(API.enabled)requestAnimationFrame(()=>{mount();syncActors()})}).observe(document.getElementById('app'),{childList:true,subtree:true});
window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>document.hidden?pause():mount());window.addEventListener('pagehide',destroy,{once:true});setInterval(()=>{if(API.enabled&&scene)syncActors()},180);mount();
