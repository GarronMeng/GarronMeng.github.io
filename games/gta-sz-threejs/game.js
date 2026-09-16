import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const $ = s => document.querySelector(s);
const canvas = $('#game');
const ui = {
  start: $('#start-screen'), startBtn: $('#start-btn'), hud: $('#hud'), speed: $('#speed'), district: $('#district'), road: $('#road'),
  mode: $('#drive-mode'), fps: $('#fps'), lightLabel: $('#lighting-label'), cameraLabel: $('#camera-label'), minimap: $('#minimap'),
  steer: $('#steer-zone'), thumb: $('#steer-thumb'), gas: $('#gas-btn'), brake: $('#brake-btn'), handbrake: $('#handbrake-btn'), action: $('#action-btn'),
  camera: $('#camera-btn'), light: $('#light-btn'), map: $('#map-btn'), enter: $('#enter-btn'), vehicle: $('#vehicle-btn'), observer: $('#observer-btn'), flight: $('#flight-btn'),
  quickMode: $('#quicktips-mode'), quickList: $('#quicktips-list'), fullMap: $('#full-map'), mapLarge: $('#map-large'), mapClose: $('#map-close'), toast: $('#toast'),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.setSize(innerWidth, innerHeight, false);
let targetDpr = Math.min(devicePixelRatio || 1, 1.4);
let renderDpr = targetDpr;
renderer.setPixelRatio(renderDpr);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8b6673);
scene.fog = new THREE.FogExp2(0x8b6673, 0.00023);
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.2, 9000);

const hemi = new THREE.HemisphereLight(0x96b9dc, 0x463f43, 1.55);
const sun = new THREE.DirectionalLight(0xff8b59, 4.4);
sun.position.set(-900, 1250, 450);
scene.add(hemi, sun);

const world = new THREE.Group();
scene.add(world);
const clock = new THREE.Clock();
const keys = new Set();
const collisions = [];
const landmarks = [];
const emissiveMaterials = [];
const projectiles = [];
const traffic = [];
const roadSegments = [];

const mats = {
  asphalt: new THREE.MeshStandardMaterial({ color: 0x34393d, roughness: .93, metalness: .03 }),
  asphaltWet: new THREE.MeshStandardMaterial({ color: 0x2f363b, roughness: .72, metalness: .08 }),
  line: new THREE.MeshBasicMaterial({ color: 0xdde1df, toneMapped: false }),
  concrete: new THREE.MeshStandardMaterial({ color: 0x757c7d, roughness: .95 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x355846, roughness: 1 }),
  mountain: new THREE.MeshStandardMaterial({ color: 0x485951, roughness: 1 }),
  water: new THREE.MeshPhysicalMaterial({ color: 0x275d72, roughness: .22, metalness: .12, transparent: true, opacity: .94 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x315664, roughness: .18, metalness: .45, transparent: true, opacity: .82 }),
};

function addFlatPlane(w, h, mat, x, z, y = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); world.add(m); return m;
}
addFlatPlane(5200, 2500, new THREE.MeshStandardMaterial({ color: 0x59695e, roughness: 1 }), 0, -120, -.08);
addFlatPlane(5800, 2700, mats.water, 0, 2100, -.04);
addFlatPlane(5200, 180, mats.grass, 0, 790, .01);

function addRoad(x, z, length, width, yaw = 0, name = '') {
  const road = new THREE.Mesh(new THREE.PlaneGeometry(length, width), mats.asphalt);
  road.rotation.x = -Math.PI / 2; road.rotation.z = -yaw; road.position.set(x, .025, z); world.add(road);
  roadSegments.push({ x, z, length, width, yaw, name });
  const dashGeo = new THREE.BoxGeometry(16, .035, .55);
  const count = Math.max(1, Math.floor(length / 34)); const inst = new THREE.InstancedMesh(dashGeo, mats.line, count); const d = new THREE.Object3D();
  const c = Math.cos(yaw), s = Math.sin(yaw);
  for (let i = 0; i < count; i++) { const local = -length / 2 + (i + .5) * length / count; d.position.set(x + local * c, .055, z + local * s); d.rotation.y = -yaw; d.updateMatrix(); inst.setMatrixAt(i, d.matrix); }
  world.add(inst); return road;
}

const xs = [-2050,-1730,-1390,-1060,-720,-390,-60,285,640,1010,1380,1750,2070];
const zs = [-690,-500,-305,-115,90,305,520,705];
for (const z of zs) addRoad(0, z, 4650, z === -115 ? 58 : z === 520 ? 50 : 34, 0, z === -115 ? '滨海大道' : z === 520 ? '深南大道' : '城市道路');
for (const x of xs) addRoad(x, 25, 1570, 30, Math.PI / 2, x < -650 ? '南山街路' : x < 650 ? '福田街路' : '罗湖街路');
// Coastal sweep: overlapping segments make the southern expressway read less like a grid.
const coast = [[-2400,510],[-1900,585],[-1400,635],[-900,665],[-400,650],[100,620],[620,655],[1150,700],[1750,730],[2350,690]];
for (let i=0;i<coast.length-1;i++){const [x1,z1]=coast[i],[x2,z2]=coast[i+1];const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz);addRoad((x1+x2)/2,(z1+z2)/2,len+18,48,Math.atan2(dz,dx),'滨海大道');}

function seeded(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
const rand=seeded(20260916);
const buildingGeo = new THREE.BoxGeometry(1,1,1);
const batches = [0x9cabb4,0x7a8993,0xb7aaa0,0x8f9fa7].map(color=>({mat:new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.18,vertexColors:true,emissive:0x000000}),list:[]}));
batches.forEach(b=>emissiveMaterials.push(b.mat));

function inRoad(x,z,pad=24){for(const r of roadSegments){const c=Math.cos(r.yaw),s=Math.sin(r.yaw);const dx=x-r.x,dz=z-r.z;const lx=dx*c+dz*s,lz=-dx*s+dz*c;if(Math.abs(lx)<r.length/2+pad&&Math.abs(lz)<r.width/2+pad)return true;}return false;}
function districtFor(x){return x<-650?'南山':x<650?'福田':'罗湖';}
for(let x=-2250;x<=2250;x+=115){for(let z=-640;z<=650;z+=105){if(inRoad(x,z,22)||rand()<.14)continue;const district=districtFor(x);const core=Math.max(0,1-Math.abs(x-180)/1500);const h=20+rand()*55+rand()*rand()*(district==='福田'?190:district==='罗湖'?150:125)+core*rand()*90;const w=38+rand()*42,d=34+rand()*38;const rx=x+(rand()-.5)*44,rz=z+(rand()-.5)*35;if(inRoad(rx,rz,16))continue;const batch=batches[Math.floor(rand()*batches.length)];const tint=new THREE.Color().setHSL(.54+(rand()-.5)*.06,.07+rand()*.08,.48+rand()*.16);batch.list.push({x:rx,z:rz,w,d,h,tint});collisions.push({minX:rx-w/2,maxX:rx+w/2,minZ:rz-d/2,maxZ:rz+d/2});}}
for(const batch of batches){const mesh=new THREE.InstancedMesh(buildingGeo,batch.mat,batch.list.length);const d=new THREE.Object3D();batch.list.forEach((b,i)=>{d.position.set(b.x,b.h/2,b.z);d.scale.set(b.w,b.h,b.d);d.rotation.y=(rand()-.5)*.05;d.updateMatrix();mesh.setMatrixAt(i,d.matrix);mesh.setColorAt(i,b.tint);});if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;world.add(mesh);}

function addLandmark(name,x,z,h,color,kind='tower'){
  const g=new THREE.Group();g.position.set(x,0,z);const mat=new THREE.MeshStandardMaterial({color,roughness:.3,metalness:.42,emissive:0x000000});emissiveMaterials.push(mat);
  if(kind==='spring'){const b=new THREE.Mesh(new THREE.CylinderGeometry(24,38,h,12),mat);b.position.y=h/2;const cap=new THREE.Mesh(new THREE.ConeGeometry(24,42,12),mat);cap.position.y=h+18;g.add(b,cap);} 
  else if(kind==='kk'){const b=new THREE.Mesh(new THREE.BoxGeometry(54,h,38),mat);b.position.y=h/2;const cap=new THREE.Mesh(new THREE.BoxGeometry(34,28,31),mat);cap.position.y=h+14;g.add(b,cap);} 
  else if(kind==='civic'){const base=new THREE.Mesh(new THREE.BoxGeometry(155,45,64),mat);base.position.y=22;const roof=new THREE.Mesh(new THREE.BoxGeometry(178,10,70),new THREE.MeshStandardMaterial({color:0xc24639,roughness:.48,emissive:0x250503}));roof.position.y=52;g.add(base,roof);} 
  else {const b=new THREE.Mesh(new THREE.BoxGeometry(48,h,46),mat);b.position.y=h/2;const spire=new THREE.Mesh(new THREE.ConeGeometry(14,55,4),mat);spire.position.y=h+27;spire.rotation.y=Math.PI/4;g.add(b,spire);} 
  world.add(g);landmarks.push({name,x,z,group:g});collisions.push({minX:x-40,maxX:x+40,minZ:z-40,maxZ:z+40});return g;
}
addLandmark('华润春笋',-1220,210,245,0xa8c4cf,'spring');
addLandmark('平安金融中心',185,-330,385,0x95a4ad,'tower');
addLandmark('深圳市民中心',10,-545,58,0xb8bec0,'civic');
addLandmark('京基100',1200,-320,300,0xa8b5ba,'kk');
addLandmark('地王大厦',1390,-175,250,0x8ea0aa,'tower');

for(let i=0;i<30;i++){const r=105+rand()*140,h=150+rand()*300,x=-2500+i*175+(rand()-.5)*60;const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,6),mats.mountain);m.position.set(x,h/2-25,-1040-rand()*150);m.rotation.y=rand()*Math.PI;world.add(m);}

// Player car. The visible fallback is replaced by Khronos CarConcept when the open CC BY model loads.
const car = new THREE.Group(); world.add(car); car.position.set(-1500,.08,-115);
const carVisual = new THREE.Group();car.add(carVisual);
const carPaint=new THREE.MeshPhysicalMaterial({color:0x7f171e,metalness:.68,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
const carDark=new THREE.MeshStandardMaterial({color:0x111518,metalness:.5,roughness:.35});
const fallbackBody=new THREE.Mesh(new THREE.BoxGeometry(2.05,.58,4.65),carPaint);fallbackBody.position.y=.7;carVisual.add(fallbackBody);
const fallbackRoof=new THREE.Mesh(new THREE.BoxGeometry(1.65,.52,2.25),mats.glass);fallbackRoof.position.set(0,1.18,-.2);carVisual.add(fallbackRoof);
const wheelGeo=new THREE.CylinderGeometry(.43,.43,.3,14);for(const x of [-1.02,1.02])for(const z of [-1.45,1.45]){const w=new THREE.Mesh(wheelGeo,carDark);w.rotation.z=Math.PI/2;w.position.set(x,.45,z);carVisual.add(w);}
new GLTFLoader().load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb',gltf=>{const model=gltf.scene;const box=new THREE.Box3().setFromObject(model),size=new THREE.Vector3();box.getSize(size);const scale=4.95/Math.max(size.x,size.z);model.scale.setScalar(scale);model.rotation.y=Math.PI;const box2=new THREE.Box3().setFromObject(model),center=new THREE.Vector3();box2.getCenter(center);model.position.sub(center);model.position.y-=box2.min.y;carVisual.clear();carVisual.add(model);},undefined,()=>{});

const tank=new THREE.Group();world.add(tank);tank.visible=false;
const tankMat=new THREE.MeshStandardMaterial({color:0x5b6251,roughness:.72,metalness:.32});const tankDark=new THREE.MeshStandardMaterial({color:0x262a25,roughness:.8});
const tankBase=new THREE.Mesh(new THREE.BoxGeometry(3.5,1.05,7.2),tankMat);tankBase.position.y=.8;tank.add(tankBase);for(const x of [-1.75,1.75]){const track=new THREE.Mesh(new THREE.BoxGeometry(.62,.72,7.4),tankDark);track.position.set(x,.55,0);tank.add(track);}const turretPivot=new THREE.Group();turretPivot.position.y=1.55;tank.add(turretPivot);const turretMesh=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.55,.7,10),tankMat);turretMesh.rotation.x=Math.PI/2;turretPivot.add(turretMesh);const cannon=new THREE.Mesh(new THREE.CylinderGeometry(.13,.17,5.0,10),tankDark);cannon.rotation.x=Math.PI/2;cannon.position.set(0,.2,2.3);turretPivot.add(cannon);

const walker=new THREE.Group();world.add(walker);walker.visible=false;const skin=new THREE.MeshStandardMaterial({color:0xc79777,roughness:.8}),cloth=new THREE.MeshStandardMaterial({color:0x202a36,roughness:.65}),trousers=new THREE.MeshStandardMaterial({color:0x11161c,roughness:.8});const torso=new THREE.Mesh(new THREE.BoxGeometry(.64,.92,.34),cloth);torso.position.y=1.28;const head=new THREE.Mesh(new THREE.SphereGeometry(.25,12,10),skin);head.position.y=1.95;walker.add(torso,head);for(const x of [-.18,.18]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.19,.82,.22),trousers);leg.position.set(x,.55,0);walker.add(leg);}

const plane=new THREE.Group();world.add(plane);plane.visible=false;const planeMat=new THREE.MeshStandardMaterial({color:0xb7bdc2,metalness:.55,roughness:.28});const fus=new THREE.Mesh(new THREE.CylinderGeometry(.55,.82,5.8,10),planeMat);fus.rotation.x=Math.PI/2;plane.add(fus);const wing=new THREE.Mesh(new THREE.BoxGeometry(7.2,.12,1.1),planeMat);plane.add(wing);const tail=new THREE.Mesh(new THREE.BoxGeometry(2.6,.09,.7),planeMat);tail.position.z=-2.1;plane.add(tail);

function makeTrafficCar(color){const g=new THREE.Group(),m=new THREE.MeshStandardMaterial({color,roughness:.35,metalness:.5});const b=new THREE.Mesh(new THREE.BoxGeometry(1.8,.62,4.2),m);b.position.y=.55;g.add(b);const r=new THREE.Mesh(new THREE.BoxGeometry(1.45,.45,2),mats.glass);r.position.set(0,1,-.25);g.add(r);world.add(g);return g;}
for(let i=0;i<22;i++){const mesh=makeTrafficCar([0xe7e7e2,0x1e252a,0x486a7d,0xb8a99d,0x6b2023][i%5]);traffic.push({mesh,lane:i%2? -115:520,t:(i/22)*4600-2300,speed:18+rand()*16,dir:i%3?1:-1,offset:(i%4-1.5)*5});}

const state={mode:'driving',previousMode:'driving',lighting:0,camera:0,speed:0,yaw:Math.PI/2,steer:0,tankSpeed:0,tankYaw:Math.PI/2,turretYaw:0,walkerYaw:Math.PI/2,observerPos:new THREE.Vector3(-1200,160,200),observerYaw:.2,observerPitch:-.35,planeSpeed:54,planeYaw:Math.PI/2,planePitch:0,mapOpen:false,started:false};
plane.position.set(-1200,230,150);tank.position.copy(car.position);walker.position.copy(car.position);
const input={x:0,y:0,gas:0,brake:0,handbrake:0,shift:0};

const LIGHTS=[
  {name:'黄昏',bg:0x8b6673,fog:0x8b6673,sun:0xff8150,sunI:4.4,hemi:0x96b9dc,hemiI:1.55,exp:1.08,emit:.04},
  {name:'夜色',bg:0x07121c,fog:0x07121c,sun:0x6f87a8,sunI:.34,hemi:0x314b68,hemiI:.62,exp:.8,emit:.28},
  {name:'晴日',bg:0xbcd7e8,fog:0xbcd7e8,sun:0xfff4d2,sunI:3.6,hemi:0xd9edff,hemiI:2.05,exp:1.0,emit:0},
];
function applyLighting(){const l=LIGHTS[state.lighting];scene.background.setHex(l.bg);scene.fog.color.setHex(l.fog);sun.color.setHex(l.sun);sun.intensity=l.sunI;hemi.color.setHex(l.hemi);hemi.intensity=l.hemiI;renderer.toneMappingExposure=l.exp;emissiveMaterials.forEach(m=>{m.emissive.setHex(l.emit?0x32415a:0);m.emissiveIntensity=l.emit;});ui.lightLabel.textContent=l.name;}
applyLighting();

const TIPS={
  driving:[['WASD','驾驶'],['空格','手刹'],['T','坦克'],['F','下车'],['C','镜头'],['G','观景']],
  tank:[['WASD','驾驶'],['Q E','炮塔'],['空格','开炮'],['T','轿车'],['F','下车'],['G','观景']],
  walking:[['WASD','行走'],['Shift','跑步'],['C','人称'],['F','上车'],['G','观景']],
  observer:[['WASD','平移'],['Q E','升降'],['B','飞机'],['G / F','返回'],['C','镜头']],
  flight:[['W S','俯仰'],['A D','转向'],['Q E','升降'],['空格','导弹'],['B','无人机'],['G','返回']],
};
function updateTips(){ui.quickMode.textContent={driving:'驾驶',tank:'坦克',walking:'步行',observer:'观景',flight:'飞行'}[state.mode];ui.quickList.innerHTML=TIPS[state.mode].map(([k,v])=>`<span class="tip"><kbd>${k}</kbd><span>${v}</span></span>`).join('');}

function toast(text){ui.toast.textContent=text;ui.toast.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>ui.toast.classList.remove('show'),1500);}
function activeActor(){return state.mode==='driving'?car:state.mode==='tank'?tank:state.mode==='walking'?walker:state.mode==='flight'?plane:null;}
function roadInfo(p){let best=null,bestD=1e9;for(const r of roadSegments){const c=Math.cos(r.yaw),s=Math.sin(r.yaw);const dx=p.x-r.x,dz=p.z-r.z;const lx=dx*c+dz*s,lz=-dx*s+dz*c;const d=Math.max(Math.abs(lz)-r.width/2,0)+Math.max(Math.abs(lx)-r.length/2,0)*.15;if(d<bestD){bestD=d;best=r;}}return best?.name||'城市道路';}
function collides(x,z,r=1.1){if(x<-2520||x>2520||z<-790||z>790)return true;for(const b of collisions)if(x+r>b.minX&&x-r<b.maxX&&z+r>b.minZ&&z-r<b.maxZ)return true;return false;}

function setMode(mode){if(mode===state.mode)return;const prev=state.mode;state.previousMode=prev;
  if(mode==='walking'){
    if((prev==='driving'&&Math.abs(state.speed)>1.5)||(prev==='tank'&&Math.abs(state.tankSpeed)>1.2)){toast('请先停稳车辆');return;}
    const src=prev==='tank'?tank:car;walker.position.copy(src.position);walker.position.x+=2.7;walker.position.y=.02;walker.visible=true;car.visible=prev!=='driving';tank.visible=prev!=='tank';state.walkerYaw=prev==='tank'?state.tankYaw:state.yaw;
  }
  if(mode==='driving'){car.visible=true;tank.visible=false;walker.visible=false;state.mode=mode;syncUI();return;}
  if(mode==='tank'){tank.position.copy(prev==='driving'?car.position:prev==='walking'?walker.position:tank.position);state.tankYaw=prev==='driving'?state.yaw:state.tankYaw;tank.visible=true;car.visible=false;walker.visible=false;state.mode=mode;syncUI();return;}
  if(mode==='observer'){state.observerPos.copy(activeActor()?.position||state.observerPos);state.observerPos.y=Math.max(90,state.observerPos.y+100);car.visible=prev!=='driving';tank.visible=prev!=='tank';walker.visible=prev!=='walking';plane.visible=false;}
  if(mode==='flight'){plane.position.copy(state.observerPos);plane.position.y=Math.max(180,plane.position.y);plane.visible=true;car.visible=false;tank.visible=false;walker.visible=false;}
  state.mode=mode;syncUI();
}
function returnFromObserver(){const back=state.previousMode==='observer'||state.previousMode==='flight'?'driving':state.previousMode;setMode(back);}
function toggleVehicle(){if(state.mode==='driving')setMode('tank');else if(state.mode==='tank')setMode('driving');}
function toggleEnter(){if(state.mode==='driving'||state.mode==='tank')setMode('walking');else if(state.mode==='walking'){const dc=walker.position.distanceTo(car.position),dt=walker.position.distanceTo(tank.position);if(Math.min(dc,dt)>7){toast('走近车辆后再上车');return;}setMode(dc<=dt?'driving':'tank');}else if(state.mode==='observer')returnFromObserver();}
function toggleObserver(){if(state.mode==='observer'||state.mode==='flight')returnFromObserver();else setMode('observer');}
function toggleFlight(){if(state.mode==='flight')setMode('observer');else {if(state.mode!=='observer')setMode('observer');setMode('flight');}}
function cycleCamera(){state.camera=(state.camera+1)%3;syncUI();}
function cycleLight(){state.lighting=(state.lighting+1)%3;applyLighting();toast(LIGHTS[state.lighting].name);}
function toggleMap(force){state.mapOpen=force??!state.mapOpen;ui.fullMap.classList.toggle('hidden',!state.mapOpen);drawLargeMap();}

function syncUI(){const modeName={driving:'驾驶',tank:'坦克',walking:'步行',observer:'观景',flight:'飞行'}[state.mode];ui.mode.textContent=modeName;const actor=activeActor();if(actor){ui.district.textContent=districtFor(actor.position.x);ui.road.textContent=roadInfo(actor.position);}ui.speed.parentElement.style.display=(state.mode==='driving'||state.mode==='tank'||state.mode==='flight')?'flex':'none';ui.pedals.classList.toggle('hidden',!(state.mode==='driving'||state.mode==='tank'));ui.handbrake.classList.toggle('hidden',state.mode!=='driving');ui.action.classList.toggle('hidden',!(state.mode==='tank'||state.mode==='flight'||state.mode==='walking'));ui.action.textContent=state.mode==='tank'?'开炮':state.mode==='flight'?'导弹':'互动';ui.enter.textContent=state.mode==='walking'?'F 上车':'F 下车';ui.vehicle.textContent=state.mode==='tank'?'T 轿车':'T 坦克';ui.vehicle.classList.toggle('active',state.mode==='tank');ui.observer.classList.toggle('active',state.mode==='observer');ui.flight.classList.toggle('active',state.mode==='flight');ui.cameraLabel.textContent=['追踪镜头','第一人称','远景镜头'][state.camera];updateTips();}
syncUI();

function fire(origin,dir,speed=115,color=0xffb35b){const mesh=new THREE.Mesh(new THREE.SphereGeometry(.22,8,6),new THREE.MeshBasicMaterial({color}));mesh.position.copy(origin);world.add(mesh);projectiles.push({mesh,vel:dir.clone().multiplyScalar(speed),life:3});}
function shoot(){if(state.mode==='tank'){const dir=new THREE.Vector3(Math.sin(state.tankYaw+state.turretYaw),.025,Math.cos(state.tankYaw+state.turretYaw));const p=tank.position.clone().add(new THREE.Vector3(0,2.0,0)).add(dir.clone().multiplyScalar(4.5));fire(p,dir,92);toast('主炮发射');}else if(state.mode==='flight'){const dir=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));fire(plane.position.clone().add(dir.clone().multiplyScalar(3)),dir,150,0xff684c);}}

function bindPress(el,on,off){const start=e=>{e.preventDefault();on();el.classList.add('active');};const end=e=>{e.preventDefault();off();el.classList.remove('active');};el.addEventListener('pointerdown',start);['pointerup','pointercancel','pointerleave'].forEach(t=>el.addEventListener(t,end));}
bindPress(ui.gas,()=>input.gas=1,()=>input.gas=0);bindPress(ui.brake,()=>input.brake=1,()=>input.brake=0);bindPress(ui.handbrake,()=>input.handbrake=1,()=>input.handbrake=0);bindPress(ui.action,()=>{if(state.mode==='tank'||state.mode==='flight')shoot();},()=>{});
ui.enter.onclick=toggleEnter;ui.vehicle.onclick=toggleVehicle;ui.observer.onclick=toggleObserver;ui.flight.onclick=toggleFlight;ui.camera.onclick=cycleCamera;ui.light.onclick=cycleLight;ui.map.onclick=()=>toggleMap();ui.mapClose.onclick=()=>toggleMap(false);

let stickPointer=null;
function updateStick(e){const r=ui.steer.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,lim=r.width*.34;const len=Math.hypot(dx,dy)||1,k=Math.min(1,lim/len);const ox=dx*k,oy=dy*k;input.x=THREE.MathUtils.clamp(ox/lim,-1,1);input.y=THREE.MathUtils.clamp(-oy/lim,-1,1);ui.thumb.style.transform=`translate3d(${ox}px,${oy}px,0)`;}
ui.steer.addEventListener('pointerdown',e=>{stickPointer=e.pointerId;ui.steer.setPointerCapture(e.pointerId);updateStick(e);});ui.steer.addEventListener('pointermove',e=>{if(e.pointerId===stickPointer)updateStick(e);});function releaseStick(e){if(e.pointerId!==stickPointer)return;stickPointer=null;input.x=input.y=0;ui.thumb.style.transform='translate3d(0,0,0)';}ui.steer.addEventListener('pointerup',releaseStick);ui.steer.addEventListener('pointercancel',releaseStick);

addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Tab'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.repeat)return;switch(e.code){case'KeyF':toggleEnter();break;case'KeyT':toggleVehicle();break;case'KeyG':toggleObserver();break;case'KeyB':toggleFlight();break;case'KeyC':cycleCamera();break;case'KeyL':cycleLight();break;case'KeyM':case'Tab':toggleMap();break;case'KeyR':resetToRoad();break;case'Space':if(state.mode==='tank'||state.mode==='flight')shoot();break;case'Escape':if(state.mapOpen)toggleMap(false);break;}});addEventListener('keyup',e=>keys.delete(e.code));

ui.startBtn.addEventListener('click',async()=>{state.started=true;ui.start.classList.add('hidden');ui.hud.classList.remove('hidden');try{await document.documentElement.requestFullscreen?.();await screen.orientation?.lock?.('landscape');}catch{}toast('沿滨海大道出发');});

function axis(positive,negative){return (keys.has(positive)?1:0)-(keys.has(negative)?1:0);}
function resetToRoad(){const a=activeActor()||car;a.position.z=-115;a.position.y=state.mode==='flight'?220:.05;if(state.mode==='driving'){state.speed=0;state.yaw=Math.PI/2;}if(state.mode==='tank'){state.tankSpeed=0;state.tankYaw=Math.PI/2;}toast('已回到滨海大道');}

function updateDriving(dt){const steer=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA')+axis('ArrowRight','ArrowLeft'),-1,1);const gas=Math.max(input.gas,axis('KeyW','KeyS'),axis('ArrowUp','ArrowDown'));const brake=Math.max(input.brake,-Math.min(0,axis('KeyW','KeyS')), -Math.min(0,axis('ArrowUp','ArrowDown')));const hb=input.handbrake||(keys.has('Space')?1:0);const accel=gas*19-brake*(state.speed>1?34:12)-Math.sign(state.speed)*1.3;state.speed+=accel*dt;state.speed=THREE.MathUtils.clamp(state.speed,-12,52);if(!gas&&!brake)state.speed*=Math.pow(.985,dt*60);if(hb)state.speed*=Math.pow(.94,dt*60);state.steer=THREE.MathUtils.lerp(state.steer,steer,1-Math.pow(.002,dt));state.yaw-=state.steer*(.3+Math.min(Math.abs(state.speed)/22,1.25))*dt*Math.sign(state.speed||1);const nx=car.position.x+Math.sin(state.yaw)*state.speed*dt,nz=car.position.z+Math.cos(state.yaw)*state.speed*dt;if(!collides(nx,nz,1.25)){car.position.x=nx;car.position.z=nz;}else state.speed*=-.18;car.rotation.y=state.yaw;}
function updateTank(dt){const steer=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),drive=THREE.MathUtils.clamp(input.y+axis('KeyW','KeyS'),-1,1);state.tankSpeed+=drive*10*dt;state.tankSpeed*=Math.pow(.975,dt*60);state.tankSpeed=THREE.MathUtils.clamp(state.tankSpeed,-9,18);state.tankYaw-=steer*(.55+(Math.abs(state.tankSpeed)<1?.45:0))*dt;const nx=tank.position.x+Math.sin(state.tankYaw)*state.tankSpeed*dt,nz=tank.position.z+Math.cos(state.tankYaw)*state.tankSpeed*dt;if(!collides(nx,nz,2.2)){tank.position.x=nx;tank.position.z=nz;}else state.tankSpeed*=-.12;tank.rotation.y=state.tankYaw;state.turretYaw+=(axis('KeyE','KeyQ'))*1.1*dt;turretPivot.rotation.y=state.turretYaw;}
function updateWalking(dt){const f=THREE.MathUtils.clamp(input.y+axis('KeyW','KeyS'),-1,1),s=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),run=keys.has('ShiftLeft')||keys.has('ShiftRight');const sp=run?7.2:3.6;if(Math.abs(f)+Math.abs(s)>.05){const vx=Math.sin(state.walkerYaw)*f+Math.cos(state.walkerYaw)*s,vz=Math.cos(state.walkerYaw)*f-Math.sin(state.walkerYaw)*s;const nx=walker.position.x+vx*sp*dt,nz=walker.position.z+vz*sp*dt;if(!collides(nx,nz,.35)){walker.position.x=nx;walker.position.z=nz;}state.walkerYaw=Math.atan2(vx,vz);walker.rotation.y=state.walkerYaw;}}
function updateObserver(dt){const f=THREE.MathUtils.clamp(input.y+axis('KeyW','KeyS'),-1,1),s=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),up=axis('KeyE','KeyQ');const boost=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?2.5:1;const sp=75*boost;state.observerPos.x+=(Math.sin(state.observerYaw)*f+Math.cos(state.observerYaw)*s)*sp*dt;state.observerPos.z+=(Math.cos(state.observerYaw)*f-Math.sin(state.observerYaw)*s)*sp*dt;state.observerPos.y=THREE.MathUtils.clamp(state.observerPos.y+up*sp*dt,20,1500);state.observerYaw-=axis('ArrowRight','ArrowLeft')*1.1*dt;state.observerPitch=THREE.MathUtils.clamp(state.observerPitch+axis('ArrowDown','ArrowUp')*.7*dt,-1.2,.25);}
function updateFlight(dt){const yaw=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),pitch=THREE.MathUtils.clamp(input.y+axis('KeyS','KeyW'),-1,1),lift=axis('KeyE','KeyQ');state.planeYaw-=yaw*.75*dt;state.planePitch=THREE.MathUtils.clamp(state.planePitch+pitch*.45*dt,-.52,.52);plane.position.y+=lift*30*dt;const dir=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));plane.position.addScaledVector(dir,state.planeSpeed*dt);plane.position.y=Math.max(8,plane.position.y);plane.rotation.set(state.planePitch,state.planeYaw, -yaw*.35,'YXZ');if(Math.abs(plane.position.x)>3200||Math.abs(plane.position.z)>2500)resetToRoad();}
function updateProjectiles(dt){for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];p.life-=dt;p.vel.y-=state.mode==='tank'?4.5:0;p.mesh.position.addScaledVector(p.vel,dt);if(p.life<=0||p.mesh.position.y<0){world.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();projectiles.splice(i,1);}}}
function updateTraffic(dt){for(const t of traffic){t.t+=t.speed*t.dir*dt;if(t.t>2350)t.t=-2350;if(t.t<-2350)t.t=2350;t.mesh.position.set(t.t,.05,t.lane+t.offset);t.mesh.rotation.y=t.dir>0?Math.PI/2:-Math.PI/2;}}

const camTarget=new THREE.Vector3(),camDesired=new THREE.Vector3();
function updateCamera(dt){const smooth=1-Math.pow(.0008,dt);if(state.mode==='driving'){const forward=new THREE.Vector3(Math.sin(state.yaw),0,Math.cos(state.yaw));if(state.camera===1){camDesired.copy(car.position).add(new THREE.Vector3(0,1.28,0)).addScaledVector(forward,.65);camTarget.copy(car.position).addScaledVector(forward,25).setY(1.2);}else{const dist=state.camera===2?18:9,h=state.camera===2?7.2:3.6;camDesired.copy(car.position).addScaledVector(forward,-dist).add(new THREE.Vector3(0,h,0));camTarget.copy(car.position).addScaledVector(forward,6).setY(1.1);}camera.position.lerp(camDesired,smooth);camera.lookAt(camTarget);} 
  else if(state.mode==='tank'){const f=new THREE.Vector3(Math.sin(state.tankYaw),0,Math.cos(state.tankYaw));camDesired.copy(tank.position).addScaledVector(f,state.camera===2?-20:-11).add(new THREE.Vector3(0,state.camera===2?9:5.3,0));camTarget.copy(tank.position).add(new THREE.Vector3(0,1.4,0)).addScaledVector(f,5);camera.position.lerp(camDesired,smooth);camera.lookAt(camTarget);} 
  else if(state.mode==='walking'){const f=new THREE.Vector3(Math.sin(state.walkerYaw),0,Math.cos(state.walkerYaw));if(state.camera===1){camDesired.copy(walker.position).add(new THREE.Vector3(0,1.75,0)).addScaledVector(f,.18);camTarget.copy(camDesired).addScaledVector(f,20);}else{camDesired.copy(walker.position).addScaledVector(f,state.camera===2?-8:-4.3).add(new THREE.Vector3(0,state.camera===2?4.2:2.4,0));camTarget.copy(walker.position).add(new THREE.Vector3(0,1.35,0));}camera.position.lerp(camDesired,smooth);camera.lookAt(camTarget);} 
  else if(state.mode==='observer'){camera.position.lerp(state.observerPos,smooth);const dir=new THREE.Vector3(Math.sin(state.observerYaw)*Math.cos(state.observerPitch),Math.sin(state.observerPitch),Math.cos(state.observerYaw)*Math.cos(state.observerPitch));camera.lookAt(state.observerPos.clone().addScaledVector(dir,120));}
  else if(state.mode==='flight'){const dir=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));camDesired.copy(plane.position).addScaledVector(dir,-state.camera===2?24:14).add(new THREE.Vector3(0,5,0));camDesired.copy(plane.position).addScaledVector(dir,state.camera===2?-24:-14).add(new THREE.Vector3(0,state.camera===2?9:5,0));camTarget.copy(plane.position).addScaledVector(dir,18);camera.position.lerp(camDesired,smooth);camera.lookAt(camTarget);}}

function drawMap(ctx,w,h){ctx.clearRect(0,0,w,h);ctx.fillStyle='#09141a';ctx.fillRect(0,0,w,h);const sx=w/5200,sz=h/1700,tx=x=>w/2+x*sx,tz=z=>h/2+z*sz;ctx.strokeStyle='rgba(205,220,224,.28)';ctx.lineWidth=Math.max(1,w/500);for(const r of roadSegments){const c=Math.cos(r.yaw),s=Math.sin(r.yaw),x1=r.x-c*r.length/2,z1=r.z-s*r.length/2,x2=r.x+c*r.length/2,z2=r.z+s*r.length/2;ctx.beginPath();ctx.moveTo(tx(x1),tz(z1));ctx.lineTo(tx(x2),tz(z2));ctx.stroke();}for(const lm of landmarks){ctx.fillStyle='#73f0c2';ctx.beginPath();ctx.arc(tx(lm.x),tz(lm.z),Math.max(2,w/320),0,Math.PI*2);ctx.fill();if(w>500){ctx.fillStyle='rgba(255,255,255,.65)';ctx.font='12px sans-serif';ctx.fillText(lm.name,tx(lm.x)+7,tz(lm.z)-6);}}const a=activeActor();const p=a?a.position:state.observerPos;ctx.save();ctx.translate(tx(p.x),tz(p.z));ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,6);ctx.lineTo(-5,6);ctx.closePath();ctx.fill();ctx.restore();}
function drawMinimap(){drawMap(ui.minimap.getContext('2d'),ui.minimap.width,ui.minimap.height);}
function drawLargeMap(){if(!state.mapOpen)return;drawMap(ui.mapLarge.getContext('2d'),ui.mapLarge.width,ui.mapLarge.height);}

let frames=0,fpsTime=performance.now(),fps=60,lowFpsSeconds=0;
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(state.started&&!state.mapOpen){if(state.mode==='driving')updateDriving(dt);else if(state.mode==='tank')updateTank(dt);else if(state.mode==='walking')updateWalking(dt);else if(state.mode==='observer')updateObserver(dt);else if(state.mode==='flight')updateFlight(dt);updateTraffic(dt);updateProjectiles(dt);}updateCamera(dt);renderer.render(scene,camera);frames++;const now=performance.now();if(now-fpsTime>1000){fps=Math.round(frames*1000/(now-fpsTime));frames=0;fpsTime=now;ui.fps.textContent=`${fps} FPS`;if(fps<36)lowFpsSeconds++;else lowFpsSeconds=Math.max(0,lowFpsSeconds-1);if(lowFpsSeconds>=3&&renderDpr>.8){renderDpr=Math.max(.8,renderDpr-.15);renderer.setPixelRatio(renderDpr);renderer.setSize(innerWidth,innerHeight,false);lowFpsSeconds=0;toast('已自动降低渲染精度');}}const actor=activeActor();if(actor){ui.district.textContent=districtFor(actor.position.x);ui.road.textContent=roadInfo(actor.position);}ui.speed.textContent=Math.round(Math.abs(state.mode==='driving'?state.speed*3.6:state.mode==='tank'?state.tankSpeed*3.6:state.mode==='flight'?state.planeSpeed*3.6:0));if((performance.now()/250|0)!==animate.mapTick){animate.mapTick=performance.now()/250|0;drawMinimap();}}
animate();

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();targetDpr=Math.min(devicePixelRatio||1,1.4);renderDpr=Math.min(renderDpr,targetDpr);renderer.setPixelRatio(renderDpr);renderer.setSize(innerWidth,innerHeight,false);});

console.info('深城纪 Three.js mobile fidelity build. CarConcept © 2024 Darmstadt Graphics Group GmbH / Eric Chadwick, CC BY 4.0.');
