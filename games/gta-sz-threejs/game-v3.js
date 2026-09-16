import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createCityWorld} from './city-runtime.js';

const $=s=>document.querySelector(s);
const ui={
 start:$('#start-screen'),startBtn:$('#start-btn'),hud:$('#hud'),speed:$('#speed'),district:$('#district'),road:$('#road'),
 mode:$('#drive-mode'),fps:$('#fps'),lightLabel:$('#lighting-label'),cameraLabel:$('#camera-label'),minimap:$('#minimap'),
 steer:$('#steer-zone'),thumb:$('#steer-thumb'),gas:$('#gas-btn'),brake:$('#brake-btn'),handbrake:$('#handbrake-btn'),action:$('#action-btn'),
 camera:$('#camera-btn'),light:$('#light-btn'),map:$('#map-btn'),enter:$('#enter-btn'),vehicle:$('#vehicle-btn'),observer:$('#observer-btn'),flight:$('#flight-btn'),
 quickMode:$('#quicktips-mode'),quickList:$('#quicktips-list'),fullMap:$('#full-map'),mapLarge:$('#map-large'),mapClose:$('#map-close'),toast:$('#toast')
};

const renderer=new THREE.WebGLRenderer({canvas:$('#game'),antialias:false,powerPreference:'high-performance'});
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;
renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));renderer.setSize(innerWidth,innerHeight,false);
const scene=new THREE.Scene();scene.background=new THREE.Color(0x8b6875);scene.fog=new THREE.FogExp2(0x8b6875,.00012);
const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.25,12000);
const hemi=new THREE.HemisphereLight(0x9bbbe0,0x4a4044,1.62),sun=new THREE.DirectionalLight(0xff8b59,4.15);sun.position.set(-900,1350,520);scene.add(hemi,sun);
const root=new THREE.Group(),actorRoot=new THREE.Group();scene.add(root,actorRoot);
const clock=new THREE.Clock(),keys=new Set(),projectiles=[],traffic=[];
let city=null,steerPointer=null,toastTimer=0,lastRoadCheck=0,lastRoadPos=new THREE.Vector2(1e8,1e8),fpsT=0,fpsN=0;

const glass=new THREE.MeshStandardMaterial({color:0x315664,roughness:.18,metalness:.45,transparent:true,opacity:.82});
const car=new THREE.Group(),carVisual=new THREE.Group();car.add(carVisual);actorRoot.add(car);
const fallbackPaint=new THREE.MeshPhysicalMaterial({color:0x7d151d,metalness:.68,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
const fallback=new THREE.Mesh(new THREE.BoxGeometry(2.05,.6,4.7),fallbackPaint);fallback.position.y=.72;carVisual.add(fallback);
const roof=new THREE.Mesh(new THREE.BoxGeometry(1.65,.5,2.2),glass);roof.position.set(0,1.2,-.2);carVisual.add(roof);
new GLTFLoader().load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb',gltf=>{
 const m=gltf.scene,b=new THREE.Box3().setFromObject(m),size=new THREE.Vector3();b.getSize(size);m.scale.setScalar(4.95/Math.max(size.x,size.z));m.rotation.y=Math.PI;m.updateMatrixWorld(true);
 const bb=new THREE.Box3().setFromObject(m),c=new THREE.Vector3();bb.getCenter(c);m.position.x-=c.x;m.position.z-=c.z;m.position.y-=bb.min.y;carVisual.clear();carVisual.add(m);
},undefined,()=>{});

const tank=new THREE.Group();tank.visible=false;actorRoot.add(tank);
const tankMat=new THREE.MeshStandardMaterial({color:0x596151,roughness:.72,metalness:.32}),tankDark=new THREE.MeshStandardMaterial({color:0x252925,roughness:.82});
const tankBase=new THREE.Mesh(new THREE.BoxGeometry(3.5,1.05,7.2),tankMat);tankBase.position.y=.8;tank.add(tankBase);
for(const x of[-1.75,1.75]){const t=new THREE.Mesh(new THREE.BoxGeometry(.62,.72,7.4),tankDark);t.position.set(x,.55,0);tank.add(t);}
const turret=new THREE.Group();turret.position.y=1.55;tank.add(turret);const turretBody=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.55,.7,10),tankMat);turretBody.rotation.x=Math.PI/2;turret.add(turretBody);
const cannon=new THREE.Mesh(new THREE.CylinderGeometry(.13,.17,5,10),tankDark);cannon.rotation.x=Math.PI/2;cannon.position.set(0,.2,2.3);turret.add(cannon);

const walker=new THREE.Group();walker.visible=false;actorRoot.add(walker);
const skin=new THREE.MeshStandardMaterial({color:0xc79777,roughness:.8}),cloth=new THREE.MeshStandardMaterial({color:0x202a36,roughness:.65}),trousers=new THREE.MeshStandardMaterial({color:0x11161c,roughness:.8});
const torso=new THREE.Mesh(new THREE.BoxGeometry(.64,.92,.34),cloth);torso.position.y=1.28;const head=new THREE.Mesh(new THREE.SphereGeometry(.25,12,10),skin);head.position.y=1.95;walker.add(torso,head);
for(const x of[-.18,.18]){const l=new THREE.Mesh(new THREE.BoxGeometry(.19,.82,.22),trousers);l.position.set(x,.55,0);walker.add(l);}

const plane=new THREE.Group();plane.visible=false;actorRoot.add(plane);const planeMat=new THREE.MeshStandardMaterial({color:0xb7bdc2,metalness:.55,roughness:.28});
const fus=new THREE.Mesh(new THREE.CylinderGeometry(.55,.82,5.8,10),planeMat);fus.rotation.x=Math.PI/2;plane.add(fus);plane.add(new THREE.Mesh(new THREE.BoxGeometry(7.2,.12,1.1),planeMat));
const tail=new THREE.Mesh(new THREE.BoxGeometry(2.4,.1,.72),planeMat);tail.position.z=-2.25;plane.add(tail);

const state={mode:'driving',speed:0,yaw:0,steer:0,tankSpeed:0,tankYaw:0,turretYaw:0,walkerYaw:0,camera:0,light:0,started:false,
 observerPos:new THREE.Vector3(),observerYaw:0,observerPitch:-.28,planeYaw:0,planePitch:0,planeSpeed:70,lastRoad:'滨海大道'};
const input={x:0,y:0,gas:0,brake:0,handbrake:0};
const labels={driving:'驾驶',tank:'坦克',walking:'步行',observer:'观景',flight:'飞机'};
const quick={
 driving:[['WASD','驾驶'],['T','坦克'],['空格','手刹'],['C','镜头'],['F','下车'],['G','观景']],
 tank:[['WASD','驾驶'],['Q E','炮塔'],['空格','开炮'],['T','轿车'],['F','下车'],['C','镜头']],
 walking:[['WASD','行走'],['Shift','跑步'],['C','人称'],['F','上车'],['E','互动'],['G','观景']],
 observer:[['WASD','平移'],['Q E','升降'],['B','飞机'],['G / F','返回'],['C','镜头']],
 flight:[['WASD','飞行'],['Q E','升降'],['空格','导弹'],['B','无人机'],['G','返回']]
};

function toast(s){ui.toast.textContent=s;ui.toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>ui.toast.classList.remove('show'),1400);}
function updateQuick(){ui.quickMode.textContent=labels[state.mode];ui.quickList.innerHTML=quick[state.mode].map(([k,l])=>`<span><kbd>${k}</kbd>${l}</span>`).join('');}
function actionLabels(){ui.enter.textContent=state.mode==='walking'?'F 上车':'F 下车';ui.vehicle.textContent=state.mode==='tank'?'T 轿车':'T 坦克';ui.observer.textContent=state.mode==='observer'?'G 返回':'G 观景';ui.flight.textContent=state.mode==='flight'?'B 无人机':'B 飞机';ui.handbrake.textContent=state.mode==='tank'?'开炮':state.mode==='flight'?'导弹':'手刹';ui.action.classList.toggle('hidden',state.mode!=='walking');}
const active=()=>state.mode==='tank'?tank:state.mode==='walking'?walker:state.mode==='flight'?plane:state.mode==='observer'?null:car;
const player=()=>{const a=active();return a?{x:a.position.x,z:a.position.z}:{x:state.observerPos.x,z:state.observerPos.z};};

function applySpawn(){
 const s=city.data.spawn||{x:0,z:0,yaw:0,road:'滨海大道'};car.position.set(s.x,.08,s.z);state.yaw=s.yaw;car.rotation.y=s.yaw;state.lastRoad=s.road||'滨海大道';
 tank.position.set(s.x+5,.05,s.z);state.tankYaw=s.yaw;tank.rotation.y=s.yaw;walker.position.set(s.x+2,0,s.z);state.walkerYaw=s.yaw;
}
function setMode(mode){
 if(!city)return;
 if(mode==='walking'&&state.mode!=='walking'){
  if((state.mode==='driving'&&Math.abs(state.speed)>1.5)||(state.mode==='tank'&&Math.abs(state.tankSpeed)>1.2)){toast('请先停稳车辆');return;}
  const s=state.mode==='tank'?tank:car;walker.position.copy(s.position);walker.position.x+=2.6;walker.position.y=0;state.walkerYaw=state.mode==='tank'?state.tankYaw:state.yaw;
 }
 if((mode==='driving'||mode==='tank')&&state.mode==='walking'){const target=mode==='tank'?tank:car;if(walker.position.distanceTo(target.position)>10){toast('请靠近车辆');return;}}
 if(mode==='observer'){const p=player();state.observerPos.set(p.x,95,p.z-20);state.observerYaw=state.mode==='walking'?state.walkerYaw:state.yaw;state.observerPitch=-.32;}
 if(mode==='flight'&&state.mode!=='flight'){state.planeYaw=state.observerYaw||state.yaw;state.planePitch=0;plane.position.copy(state.observerPos).add(new THREE.Vector3(0,35,0));}
 state.mode=mode;car.visible=mode==='driving';tank.visible=mode==='tank';walker.visible=mode==='walking';plane.visible=mode==='flight';updateQuick();actionLabels();toast(labels[mode]);
}
function toggleEnter(){if(state.mode==='walking'){const dc=walker.position.distanceTo(car.position),dt=walker.position.distanceTo(tank.position);setMode(dt<dc?'tank':'driving');}else if(state.mode==='driving'||state.mode==='tank')setMode('walking');else setMode('driving');}
function toggleVehicle(){if(state.mode==='tank'){car.position.copy(tank.position);state.yaw=state.tankYaw;setMode('driving');}else if(state.mode==='driving'){tank.position.copy(car.position);state.tankYaw=state.yaw;setMode('tank');}else if(state.mode==='walking')setMode('driving');}
function toggleObserver(){if(state.mode==='observer'||state.mode==='flight')setMode('driving');else setMode('observer');}
function toggleFlight(){if(state.mode==='flight')setMode('observer');else{if(state.mode!=='observer')setMode('observer');setMode('flight');}}

function cameraLabel(){ui.cameraLabel.textContent=['追踪镜头','第一视角','远景镜头'][state.camera];}
function cycleCamera(){state.camera=(state.camera+1)%3;cameraLabel();toast(ui.cameraLabel.textContent);}
function applyLight(){
 const cfg=[
  ['黄昏',0x8b6875,0x8b6875,1.62,4.15,0xff8b59,1.04,0x060302],
  ['夜色',0x07101b,0x0a1420,.42,.26,0x779dcc,.82,0x182335],
  ['晴日',0x8fb9d1,0x91b4c8,2,3.25,0xfff0d1,1,0x000000]
 ][state.light];
 scene.background.setHex(cfg[1]);scene.fog.color.setHex(cfg[2]);hemi.intensity=cfg[3];sun.intensity=cfg[4];sun.color.setHex(cfg[5]);renderer.toneMappingExposure=cfg[6];
 for(const m of city?.emissive||[])m.emissive?.setHex(cfg[7]);ui.lightLabel.textContent=cfg[0];
}
function cycleLight(){state.light=(state.light+1)%3;applyLight();toast(ui.lightLabel.textContent);}
function axis(pos,neg){return(keys.has(pos)?1:0)-(keys.has(neg)?1:0);}

function updateDriving(dt){
 const throttle=Math.max(input.gas,axis('KeyW','KeyS')),brake=Math.max(input.brake,axis('KeyS','KeyW')<0?1:0),steer=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1);
 state.speed+=(throttle*12-brake*18-Math.sign(state.speed)*1.6)*dt;if(!throttle&&!brake)state.speed*=Math.pow(.985,dt*60);state.speed=THREE.MathUtils.clamp(state.speed,-9,46);
 state.steer=THREE.MathUtils.lerp(state.steer,steer,1-Math.pow(.002,dt));state.yaw-=state.steer*state.speed*.025*(input.handbrake||keys.has('Space')?1.75:1)*dt;
 const nx=car.position.x+Math.sin(state.yaw)*state.speed*dt,nz=car.position.z+Math.cos(state.yaw)*state.speed*dt;if(!city.blocked(nx,nz,1.3)){car.position.x=nx;car.position.z=nz;}else state.speed*=-.12;car.rotation.y=state.yaw;
}
function updateTank(dt){
 const drive=Math.max(input.gas,axis('KeyW','KeyS'))-Math.max(input.brake,axis('KeyS','KeyW')<0?1:0),turn=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1);
 state.tankSpeed+=drive*8.5*dt;state.tankSpeed*=Math.pow(.975,dt*60);state.tankSpeed=THREE.MathUtils.clamp(state.tankSpeed,-7,18);state.tankYaw-=turn*(.62+Math.abs(state.tankSpeed)*.025)*dt;
 state.turretYaw+=axis('KeyE','KeyQ')*1.05*dt;turret.rotation.y=state.turretYaw;const nx=tank.position.x+Math.sin(state.tankYaw)*state.tankSpeed*dt,nz=tank.position.z+Math.cos(state.tankYaw)*state.tankSpeed*dt;
 if(!city.blocked(nx,nz,2.25)){tank.position.x=nx;tank.position.z=nz;}else state.tankSpeed*=-.08;tank.rotation.y=state.tankYaw;
}
function updateWalk(dt){
 const f=axis('KeyW','KeyS')-input.y,r=axis('KeyD','KeyA')+input.x,run=keys.has('ShiftLeft')||keys.has('ShiftRight'),speed=run?7.4:4.2;if(Math.abs(r)>.05)state.walkerYaw-=r*1.8*dt;
 const nx=walker.position.x+Math.sin(state.walkerYaw)*f*speed*dt,nz=walker.position.z+Math.cos(state.walkerYaw)*f*speed*dt;if(!city.blocked(nx,nz,.38)){walker.position.x=nx;walker.position.z=nz;}walker.rotation.y=state.walkerYaw;
}
function updateObserver(dt){
 const f=axis('KeyW','KeyS')-input.y,r=axis('KeyD','KeyA')+input.x,v=axis('KeyE','KeyQ'),fast=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?3:1,s=42*fast*dt;
 const fw=new THREE.Vector3(Math.sin(state.observerYaw),0,Math.cos(state.observerYaw)),rt=new THREE.Vector3(fw.z,0,-fw.x);state.observerPos.addScaledVector(fw,f*s).addScaledVector(rt,r*s);state.observerPos.y=THREE.MathUtils.clamp(state.observerPos.y+v*s,8,1800);
}
function updateFlight(dt){
 const yaw=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),pitch=THREE.MathUtils.clamp(input.y+axis('KeyS','KeyW'),-1,1),v=axis('KeyE','KeyQ');
 state.planeYaw-=yaw*.75*dt;state.planePitch=THREE.MathUtils.clamp(state.planePitch+pitch*.45*dt,-.52,.52);plane.position.y+=v*35*dt;
 const d=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));plane.position.addScaledVector(d,state.planeSpeed*dt);plane.position.y=Math.max(8,plane.position.y);plane.rotation.set(state.planePitch,state.planeYaw,-yaw*.35,'YXZ');
}

function shoot(kind){
 const tankShot=kind==='tank',yaw=tankShot?state.tankYaw+state.turretYaw:state.planeYaw,pitch=tankShot?-.035:state.planePitch;
 const d=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)),mesh=tankShot?new THREE.Mesh(new THREE.SphereGeometry(.18,8,6),new THREE.MeshBasicMaterial({color:0xff9d48})):new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,1.2,6),new THREE.MeshBasicMaterial({color:0xffb25c}));
 if(!tankShot)mesh.rotation.x=Math.PI/2;mesh.position.copy(tankShot?tank.position:plane.position).add(new THREE.Vector3(0,tankShot?1.8:0,0)).addScaledVector(d,tankShot?4:3);root.add(mesh);projectiles.push({mesh,vel:d.multiplyScalar(tankShot?95:145),life:tankShot?4:5,gravity:tankShot?5:0});toast(tankShot?'开炮':'导弹');
}
function updateProjectiles(dt){for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];p.life-=dt;p.vel.y-=p.gravity*dt;p.mesh.position.addScaledVector(p.vel,dt);if(p.life<=0||p.mesh.position.y<0){root.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();projectiles.splice(i,1);}}}

function createTraffic(){
 const cand=city.roadSegments.filter(s=>s.width>=9&&Math.hypot(s.bx-s.ax,s.bz-s.az)>80),colors=[0x7a2025,0x344a5f,0xb6b7b1,0x202326,0x806c4e];
 for(let i=0;i<Math.min(22,cand.length);i++){const seg=cand[Math.floor(i*cand.length/Math.min(22,cand.length))],g=new THREE.Group(),b=new THREE.Mesh(new THREE.BoxGeometry(1.8,.62,4.1),new THREE.MeshStandardMaterial({color:colors[i%colors.length],roughness:.42,metalness:.35}));b.position.y=.62;g.add(b);const cab=new THREE.Mesh(new THREE.BoxGeometry(1.5,.48,1.8),glass);cab.position.set(0,1.05,-.2);g.add(cab);actorRoot.add(g);traffic.push({g,seg,t:(i*.173)%1,dir:i%2?1:-1,speed:.028+(i%7)*.004,lane:(i%3-1)*2.2});}
}
function updateTraffic(dt){for(const t of traffic){t.t+=t.speed*t.dir*dt;if(t.t>1)t.t=0;if(t.t<0)t.t=1;const s=t.seg,vx=s.bx-s.ax,vz=s.bz-s.az,len=Math.hypot(vx,vz)||1,nx=-vz/len,nz=vx/len;t.g.position.set(s.ax+vx*t.t+nx*t.lane,.04,s.az+vz*t.t+nz*t.lane);t.g.rotation.y=Math.atan2(vx,vz);}}

const camPos=new THREE.Vector3(),camTarget=new THREE.Vector3();
function updateCamera(dt){
 const smooth=1-Math.pow(.0008,dt);
 if(state.mode==='observer'){camera.position.lerp(state.observerPos,smooth);const d=new THREE.Vector3(Math.sin(state.observerYaw)*Math.cos(state.observerPitch),Math.sin(state.observerPitch),Math.cos(state.observerYaw)*Math.cos(state.observerPitch));camera.lookAt(state.observerPos.clone().addScaledVector(d,120));return;}
 if(state.mode==='driving'){const f=new THREE.Vector3(Math.sin(state.yaw),0,Math.cos(state.yaw));if(state.camera===1){camPos.copy(car.position).add(new THREE.Vector3(0,1.28,0)).addScaledVector(f,.65);camTarget.copy(car.position).addScaledVector(f,25).setY(1.2);}else{camPos.copy(car.position).addScaledVector(f,state.camera===2?-18:-9).add(new THREE.Vector3(0,state.camera===2?7.2:3.6,0));camTarget.copy(car.position).addScaledVector(f,6).setY(1.1);}}
 else if(state.mode==='tank'){const f=new THREE.Vector3(Math.sin(state.tankYaw),0,Math.cos(state.tankYaw));camPos.copy(tank.position).addScaledVector(f,state.camera===2?-20:-11).add(new THREE.Vector3(0,state.camera===2?9:5.3,0));camTarget.copy(tank.position).add(new THREE.Vector3(0,1.4,0)).addScaledVector(f,5);}
 else if(state.mode==='walking'){const f=new THREE.Vector3(Math.sin(state.walkerYaw),0,Math.cos(state.walkerYaw));if(state.camera===1){camPos.copy(walker.position).add(new THREE.Vector3(0,1.75,0)).addScaledVector(f,.18);camTarget.copy(camPos).addScaledVector(f,20);}else{camPos.copy(walker.position).addScaledVector(f,state.camera===2?-8:-4.3).add(new THREE.Vector3(0,state.camera===2?4.2:2.4,0));camTarget.copy(walker.position).add(new THREE.Vector3(0,1.35,0));}}
 else{const d=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));camPos.copy(plane.position).addScaledVector(d,state.camera===2?-24:-14).add(new THREE.Vector3(0,state.camera===2?9:5,0));camTarget.copy(plane.position).addScaledVector(d,18);}
 camera.position.lerp(camPos,smooth);camera.lookAt(camTarget);
}

function resetRoad(){
 const p=player(),n=city.nearestRoad(p.x,p.z);if(!n)return;const yaw=Math.atan2(n.seg.bx-n.seg.ax,n.seg.bz-n.seg.az);
 if(state.mode==='tank'){tank.position.set(n.px,.05,n.pz);state.tankYaw=yaw;state.tankSpeed=0;}else if(state.mode==='walking'){walker.position.set(n.px,0,n.pz);state.walkerYaw=yaw;}else{car.position.set(n.px,.08,n.pz);state.yaw=yaw;state.speed=0;}toast('已回到附近道路');
}
function updateHud(dt){
 const p=player();ui.district.textContent=city.districtFor(p.x);
 if(performance.now()-lastRoadCheck>260&&(Math.hypot(p.x-lastRoadPos.x,p.z-lastRoadPos.y)>8||lastRoadPos.x>1e7)){const n=city.nearestRoad(p.x,p.z);if(n){state.lastRoad=n.seg.name;ui.road.textContent=state.lastRoad;}lastRoadCheck=performance.now();lastRoadPos.set(p.x,p.z);}
 const v=state.mode==='driving'?Math.abs(state.speed)*3.6:state.mode==='tank'?Math.abs(state.tankSpeed)*3.6:state.mode==='flight'?state.planeSpeed*3.6:0;ui.speed.textContent=Math.round(v);ui.mode.textContent=labels[state.mode];
 fpsN++;fpsT+=dt;if(fpsT>.5){ui.fps.textContent=`${Math.round(fpsN/fpsT)} FPS`;fpsN=0;fpsT=0;}city.drawMap(ui.minimap,p,false);
}
function openMap(open){ui.fullMap.classList.toggle('hidden',!open);if(open)city.drawMap(ui.mapLarge,player(),true);}

function bindHold(btn,prop){const down=e=>{e.preventDefault();input[prop]=1;btn.classList.add('active');},up=e=>{e.preventDefault();input[prop]=0;btn.classList.remove('active');};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);}
bindHold(ui.gas,'gas');bindHold(ui.brake,'brake');bindHold(ui.handbrake,'handbrake');
ui.handbrake.addEventListener('pointerdown',()=>{if(state.mode==='tank')shoot('tank');else if(state.mode==='flight')shoot('flight');});
ui.steer.addEventListener('pointerdown',e=>{steerPointer=e.pointerId;ui.steer.setPointerCapture(e.pointerId);stick(e);});ui.steer.addEventListener('pointermove',e=>{if(e.pointerId===steerPointer)stick(e);});
for(const ev of['pointerup','pointercancel'])ui.steer.addEventListener(ev,e=>{if(e.pointerId===steerPointer){steerPointer=null;input.x=input.y=0;ui.thumb.style.transform='translate3d(0,0,0)';}});
function stick(e){const r=ui.steer.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width*.36),y=(e.clientY-r.top-r.height/2)/(r.height*.36),len=Math.hypot(x,y),k=Math.min(1,len)/(len||1);input.x=THREE.MathUtils.clamp(x*k,-1,1);input.y=THREE.MathUtils.clamp(y*k,-1,1);ui.thumb.style.transform=`translate3d(${input.x*32}px,${input.y*32}px,0)`;}

ui.camera.onclick=cycleCamera;ui.light.onclick=cycleLight;ui.map.onclick=()=>openMap(true);ui.mapClose.onclick=()=>openMap(false);ui.enter.onclick=toggleEnter;ui.vehicle.onclick=toggleVehicle;ui.observer.onclick=toggleObserver;ui.flight.onclick=toggleFlight;ui.action.onclick=()=>toast('真实 POI 互动层下一步接入');
addEventListener('keydown',e=>{if(e.repeat)return;keys.add(e.code);if(e.code==='KeyC')cycleCamera();else if(e.code==='KeyL')cycleLight();else if(e.code==='KeyM'||e.code==='Tab'){e.preventDefault();openMap(ui.fullMap.classList.contains('hidden'));}else if(e.code==='KeyF')toggleEnter();else if(e.code==='KeyT')toggleVehicle();else if(e.code==='KeyG')toggleObserver();else if(e.code==='KeyB')toggleFlight();else if(e.code==='KeyR')resetRoad();else if(e.code==='Space'){e.preventDefault();if(state.mode==='tank')shoot('tank');else if(state.mode==='flight')shoot('flight');}});
addEventListener('keyup',e=>keys.delete(e.code));

async function startGame(){if(!city){toast('城市仍在载入');return;}state.started=true;ui.start.classList.add('hidden');ui.hud.classList.remove('hidden');try{await document.documentElement.requestFullscreen?.();screen.orientation?.lock?.('landscape').catch(()=>{});}catch{}updateQuick();actionLabels();cameraLabel();applyLight();}
ui.startBtn.disabled=true;ui.startBtn.textContent='载入真实深圳…';ui.startBtn.onclick=startGame;

try{
 city=await createCityWorld(root,{onProgress:t=>{if(!state.started)ui.startBtn.textContent=t.startsWith('建筑')?`进入深城纪 · ${t}`:t;}});
 applySpawn();createTraffic();ui.startBtn.disabled=false;ui.startBtn.textContent='进入深城纪';
 const c=city.data.meta?.counts||{},note=ui.start.querySelector('.start-notes');if(note)note.innerHTML=`${c.roads?.toLocaleString()||''} 条真实道路 · ${c.buildings?.toLocaleString()||''} 栋建筑 · 出生点：${city.data.spawn?.road||'滨海大道'}<br>道路/建筑 © OpenStreetMap contributors · ODbL 1.0 · 数据编制源自 linranff/GTA_SZ`;
}catch(e){console.error(e);ui.startBtn.disabled=false;ui.startBtn.textContent='重新载入';ui.startBtn.onclick=()=>location.reload();const note=ui.start.querySelector('.start-notes');if(note)note.textContent='真实深圳城市数据读取失败，请检查网络后重试。';}

function animate(){
 requestAnimationFrame(animate);const dt=Math.min(.033,clock.getDelta()||.016);
 if(state.started&&city){if(state.mode==='driving')updateDriving(dt);else if(state.mode==='tank')updateTank(dt);else if(state.mode==='walking')updateWalk(dt);else if(state.mode==='observer')updateObserver(dt);else updateFlight(dt);updateTraffic(dt);updateProjectiles(dt);updateCamera(dt);updateHud(dt);}
 renderer.render(scene,camera);
}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden){input.gas=input.brake=input.handbrake=input.x=input.y=0;keys.clear();}});
