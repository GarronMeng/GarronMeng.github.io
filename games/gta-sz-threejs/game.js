import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const $ = s => document.querySelector(s);
const canvas = $('#game');
const ui = {
  start: $('#start-screen'), startBtn: $('#start-btn'), hud: $('#hud'), speed: $('#speed'),
  district: $('#district'), road: $('#road'), mode: $('#drive-mode'), fps: $('#fps'),
  lightLabel: $('#lighting-label'), cameraLabel: $('#camera-label'), minimap: $('#minimap'),
  steer: $('#steer-zone'), thumb: $('#steer-thumb'), gas: $('#gas-btn'), brake: $('#brake-btn'),
  handbrake: $('#handbrake-btn'), action: $('#action-btn'), camera: $('#camera-btn'),
  light: $('#light-btn'), map: $('#map-btn'), enter: $('#enter-btn'), vehicle: $('#vehicle-btn'),
  observer: $('#observer-btn'), flight: $('#flight-btn'), quickMode: $('#quicktips-mode'),
  quickList: $('#quicktips-list'), fullMap: $('#full-map'), mapLarge: $('#map-large'),
  mapClose: $('#map-close'), toast: $('#toast'),
};

const CITY_URLS = [
  'https://cdn.jsdelivr.net/gh/linranff/GTA_SZ@main/public/city/city.json',
  'https://raw.githubusercontent.com/linranff/GTA_SZ/main/public/city/city.json',
];
const CAR_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb';
const BUILDING_CHUNK = 420;
const COLLISION_CELL = 128;
const ROAD_CELL = 256;

const renderer = new THREE.WebGLRenderer({canvas, antialias:false, powerPreference:'high-performance'});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
renderer.setSize(innerWidth, innerHeight, false);
let renderDpr = Math.min(devicePixelRatio || 1, 1.35);
renderer.setPixelRatio(renderDpr);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8b6875);
scene.fog = new THREE.FogExp2(0x8b6875, 0.00012);
const camera = new THREE.PerspectiveCamera(62, innerWidth/innerHeight, 0.25, 12000);
const hemi = new THREE.HemisphereLight(0x9bbbe0, 0x4a4044, 1.62);
const sun = new THREE.DirectionalLight(0xff8b59, 4.15);
sun.position.set(-900, 1350, 520);
scene.add(hemi, sun);

const world = new THREE.Group();
const cityRoot = new THREE.Group();
const actorRoot = new THREE.Group();
scene.add(world);
world.add(cityRoot, actorRoot);
const clock = new THREE.Clock();
const keys = new Set();

const mats = {
  asphalt: new THREE.MeshStandardMaterial({color:0x30363a, roughness:.9, metalness:.04}),
  roadLine: new THREE.MeshBasicMaterial({color:0xd8dedc, toneMapped:false}),
  land: new THREE.MeshStandardMaterial({color:0x59685d, roughness:1}),
  green: new THREE.MeshStandardMaterial({color:0x345845, roughness:1}),
  water: new THREE.MeshPhysicalMaterial({color:0x23586d, roughness:.28, metalness:.1, transparent:true, opacity:.95}),
  glass: new THREE.MeshStandardMaterial({color:0x315664, roughness:.18, metalness:.45, transparent:true, opacity:.82}),
  landmark: new THREE.MeshStandardMaterial({color:0x9caeb7, roughness:.34, metalness:.38, emissive:0x000000}),
};
const buildingMaterials = [
  new THREE.MeshStandardMaterial({color:0x94a5ae,roughness:.58,metalness:.15,emissive:0x000000}),
  new THREE.MeshStandardMaterial({color:0xb1a79d,roughness:.64,metalness:.08,emissive:0x000000}),
  new THREE.MeshStandardMaterial({color:0x7f8e97,roughness:.54,metalness:.19,emissive:0x000000}),
  new THREE.MeshStandardMaterial({color:0xa6b0b4,roughness:.61,metalness:.12,emissive:0x000000}),
];
const emissiveMaterials = [...buildingMaterials, mats.landmark];
const city = {
  data:null, ready:false, loading:false, roads:[], roadSegments:[], landmarks:[],
  bounds:{minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity},
  roadGrid:new Map(), collisionGrid:new Map(), buildingCount:0,
};
const projectiles = [];
const traffic = [];

function cellKey(x,z,size){ return `${Math.floor(x/size)},${Math.floor(z/size)}`; }
function addGrid(map, key, value){ let a=map.get(key); if(!a) map.set(key,a=[]); a.push(value); }
function coverGrid(map, minX,maxX,minZ,maxZ,size,value){
  for(let ix=Math.floor(minX/size);ix<=Math.floor(maxX/size);ix++)
    for(let iz=Math.floor(minZ/size);iz<=Math.floor(maxZ/size);iz++) addGrid(map,`${ix},${iz}`,value);
}
function updateBounds(x,z){
  city.bounds.minX=Math.min(city.bounds.minX,x); city.bounds.maxX=Math.max(city.bounds.maxX,x);
  city.bounds.minZ=Math.min(city.bounds.minZ,z); city.bounds.maxZ=Math.max(city.bounds.maxZ,z);
}
function cleanRing(ring){
  if(!ring?.length) return [];
  const out=ring.filter(p=>Array.isArray(p)&&Number.isFinite(p[0])&&Number.isFinite(p[1])).map(p=>[+p[0],+p[1]]);
  if(out.length>2){const a=out[0],b=out[out.length-1];if(Math.abs(a[0]-b[0])<1e-5&&Math.abs(a[1]-b[1])<1e-5)out.pop();}
  return out;
}
function polygonFlatGeometry(polygons, y=0){
  const pos=[];
  for(const rings0 of polygons||[]){
    const rings=(Array.isArray(rings0?.[0]?.[0])?rings0:[rings0]).map(cleanRing).filter(r=>r.length>=3);
    if(!rings.length)continue;
    const contour=rings[0].map(p=>new THREE.Vector2(p[0],p[1]));
    const holes=rings.slice(1).map(r=>r.map(p=>new THREE.Vector2(p[0],p[1])));
    let faces=[]; try{faces=THREE.ShapeUtils.triangulateShape(contour,holes);}catch{}
    const verts=[...contour,...holes.flat()];
    for(const f of faces)for(const i of f){const v=verts[i];pos.push(v.x,y,v.y);updateBounds(v.x,v.y);}
  }
  if(!pos.length)return null;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;
}
function surfaceFromNamed(items,mat,y){
  const polys=(items||[]).map(x=>x.rings).filter(Boolean);
  const g=polygonFlatGeometry(polys,y);if(!g)return;
  const m=new THREE.Mesh(g,mat);m.frustumCulled=true;cityRoot.add(m);
}

function buildLandAndWater(data){
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(26000,18000),mats.water);
  sea.rotation.x=-Math.PI/2;sea.position.y=-.18;cityRoot.add(sea);
  const landGeom=polygonFlatGeometry(data.land||[],0);
  if(landGeom){const land=new THREE.Mesh(landGeom,mats.land);land.receiveShadow=false;cityRoot.add(land);}
  surfaceFromNamed(data.green,mats.green,.035);
  surfaceFromNamed(data.water,mats.water,.045);
}

function roadWidth(road){
  const w=Number(road.width)||0;
  if(w>1)return Math.min(55,Math.max(3,w));
  const k=(road.kind||'').toLowerCase();
  if(k.includes('motorway'))return 28;if(k.includes('trunk'))return 22;if(k.includes('primary'))return 18;
  if(k.includes('secondary'))return 14;if(k.includes('tertiary'))return 11;return 7;
}
function buildRoads(data){
  const pos=[], linePos=[];
  city.roads=data.roads||[];
  for(const road of city.roads){
    const pts=road.points||[], width=roadWidth(road), half=width*.5, display=road.displayName||road.name||'城市道路';
    for(let i=0;i<pts.length-1;i++){
      const a=pts[i],b=pts[i+1]; if(!a||!b)continue;
      const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<.02)continue;
      const nx=-dz/len*half,nz=dx/len*half;
      const aL=[a[0]+nx,.02,a[1]+nz],aR=[a[0]-nx,.02,a[1]-nz],bL=[b[0]+nx,.02,b[1]+nz],bR=[b[0]-nx,.02,b[1]-nz];
      pos.push(...aL,...aR,...bL, ...aR,...bR,...bL);
      const seg={ax:a[0],az:a[1],bx:b[0],bz:b[1],width,name:display,road};
      city.roadSegments.push(seg);
      coverGrid(city.roadGrid,Math.min(a[0],b[0])-width,Math.max(a[0],b[0])+width,Math.min(a[1],b[1])-width,Math.max(a[1],b[1])+width,ROAD_CELL,seg);
      updateBounds(a[0],a[1]); updateBounds(b[0],b[1]);
      if(width>=13 && len>20){
        const dash=10,gap=13,count=Math.floor(len/(dash+gap));
        const ux=dx/len,uz=dz/len,lh=.28;
        for(let d=0;d<count;d++){
          const st=(d+.35)*(dash+gap),en=Math.min(st+dash,len);if(en<=st)continue;
          const x1=a[0]+ux*st,z1=a[1]+uz*st,x2=a[0]+ux*en,z2=a[1]+uz*en;
          const lnx=-uz*lh,lnz=ux*lh;
          linePos.push(x1+lnx,.052,z1+lnz,x1-lnx,.052,z1-lnz,x2+lnx,.052,z2+lnz,
                       x1-lnx,.052,z1-lnz,x2-lnx,.052,z2-lnz,x2+lnx,.052,z2+lnz);
        }
      }
    }
  }
  if(pos.length){
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();
    cityRoot.add(new THREE.Mesh(g,mats.asphalt));
  }
  if(linePos.length){
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(linePos,3));
    cityRoot.add(new THREE.Mesh(g,mats.roadLine));
  }
}

function styleIndex(style){
  let h=2166136261;for(const c of String(style||'')){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0)%buildingMaterials.length;
}
function appendBuildingGeometry(buildings,matIndex){
  const pos=[];
  for(const b of buildings){
    if(styleIndex(b.style)!==matIndex)continue;
    const rings=(b.rings||[]).map(cleanRing).filter(r=>r.length>=3); if(!rings.length)continue;
    const h=Math.max(3,Math.min(650,Number(b.height)||12));
    const contour=rings[0].map(p=>new THREE.Vector2(p[0],p[1]));
    const holes=rings.slice(1).map(r=>r.map(p=>new THREE.Vector2(p[0],p[1])));
    let faces=[];try{faces=THREE.ShapeUtils.triangulateShape(contour,holes);}catch{}
    const verts=[...contour,...holes.flat()];
    for(const f of faces)for(const i of f){const v=verts[i];pos.push(v.x,h,v.y);}
    for(const ring of rings){
      for(let i=0;i<ring.length;i++){
        const a=ring[i],bb=ring[(i+1)%ring.length];
        pos.push(a[0],0,a[1], bb[0],0,bb[1], bb[0],h,bb[1],
                 a[0],0,a[1], bb[0],h,bb[1], a[0],h,a[1]);
      }
    }
    let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
    for(const [x,z] of rings[0]){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);updateBounds(x,z);}
    const box={minX,maxX,minZ,maxZ,height:h};
    coverGrid(city.collisionGrid,minX,maxX,minZ,maxZ,COLLISION_CELL,box);
    city.buildingCount++;
  }
  if(!pos.length)return null;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;
}
async function buildBuildings(data){
  const all=data.buildings||[];
  for(let start=0;start<all.length;start+=BUILDING_CHUNK){
    const chunk=all.slice(start,start+BUILDING_CHUNK);
    for(let m=0;m<buildingMaterials.length;m++){
      const g=appendBuildingGeometry(chunk,m);if(g){const mesh=new THREE.Mesh(g,buildingMaterials[m]);mesh.frustumCulled=true;cityRoot.add(mesh);}
    }
    const p=Math.round((start+chunk.length)/Math.max(1,all.length)*100);
    ui.startBtn.textContent=`构建深圳 ${p}%`;
    await new Promise(requestAnimationFrame);
  }
}

function landmarkKind(name=''){
  if(/春笋|华润/.test(name))return'spring';
  if(/市民中心/.test(name))return'civic';
  if(/京基|地王/.test(name))return'box';
  if(/平安/.test(name))return'pingan';
  return'tower';
}
function makeLandmarkVisual(l){
  const name=l.name||'地标',h=Math.max(15,Math.min(650,Number(l.height)||80)),kind=landmarkKind(name);
  const g=new THREE.Group();g.position.set(l.x,0,l.z);let body;
  if(kind==='spring'){
    body=new THREE.Mesh(new THREE.CylinderGeometry(Math.max(10,h*.055),Math.max(16,h*.075),h,12),mats.landmark);body.position.y=h/2;g.add(body);
    const crown=new THREE.Mesh(new THREE.ConeGeometry(Math.max(9,h*.05),Math.max(18,h*.12),12),mats.landmark);crown.position.y=h+h*.055;g.add(crown);
  }else if(kind==='civic'){
    body=new THREE.Mesh(new THREE.BoxGeometry(145,46,62),mats.landmark);body.position.y=23;g.add(body);
    const roof=new THREE.Mesh(new THREE.BoxGeometry(175,10,72),new THREE.MeshStandardMaterial({color:0xb54239,roughness:.48,emissive:0x210402}));roof.position.y=53;g.add(roof);
  }else{
    const w=kind==='pingan'?Math.max(28,h*.105):Math.max(24,h*.12),d=w*.82;
    body=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mats.landmark);body.position.y=h/2;g.add(body);
    if(kind==='pingan'||kind==='tower'){const top=new THREE.Mesh(new THREE.ConeGeometry(w*.24,Math.max(18,h*.12),4),mats.landmark);top.position.y=h+Math.max(9,h*.055);top.rotation.y=Math.PI/4;g.add(top);}
  }
  cityRoot.add(g);city.landmarks.push({...l,group:g});updateBounds(l.x,l.z);
  return g;
}
function buildLandmarks(data){ for(const l of data.landmarks||[])makeLandmarkVisual(l); }

function nearestPointOnSegment(x,z,s){
  const vx=s.bx-s.ax,vz=s.bz-s.az,den=vx*vx+vz*vz||1;
  const t=THREE.MathUtils.clamp(((x-s.ax)*vx+(z-s.az)*vz)/den,0,1);
  const px=s.ax+vx*t,pz=s.az+vz*t;return{px,pz,d2:(x-px)**2+(z-pz)**2,t};
}
function nearbyRoadSegments(x,z){
  const cx=Math.floor(x/ROAD_CELL),cz=Math.floor(z/ROAD_CELL),out=[];
  for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const a=city.roadGrid.get(`${cx+dx},${cz+dz}`);if(a)out.push(...a);}
  return out.length?out:city.roadSegments;
}
function nearestRoad(x,z){
  let best=null,bd=Infinity;
  for(const s of nearbyRoadSegments(x,z)){const q=nearestPointOnSegment(x,z,s);if(q.d2<bd){bd=q.d2;best={...q,seg:s};}}
  return best;
}
function blocked(x,z,r=1.2){
  const cx=Math.floor(x/COLLISION_CELL),cz=Math.floor(z/COLLISION_CELL);
  for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
    const a=city.collisionGrid.get(`${cx+dx},${cz+dz}`);if(!a)continue;
    for(const b of a)if(x+r>b.minX&&x-r<b.maxX&&z+r>b.minZ&&z-r<b.maxZ)return true;
  }
  return false;
}

const car=new THREE.Group();actorRoot.add(car);
const carVisual=new THREE.Group();car.add(carVisual);
const carPaint=new THREE.MeshPhysicalMaterial({color:0x7d151d,metalness:.68,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
const carDark=new THREE.MeshStandardMaterial({color:0x111518,metalness:.5,roughness:.35});
const fallbackBody=new THREE.Mesh(new THREE.BoxGeometry(2.05,.58,4.65),carPaint);fallbackBody.position.y=.7;carVisual.add(fallbackBody);
const fallbackRoof=new THREE.Mesh(new THREE.BoxGeometry(1.65,.52,2.25),mats.glass);fallbackRoof.position.set(0,1.18,-.2);carVisual.add(fallbackRoof);
const wheelGeo=new THREE.CylinderGeometry(.43,.43,.3,14);
for(const x of [-1.02,1.02])for(const z of [-1.45,1.45]){const w=new THREE.Mesh(wheelGeo,carDark);w.rotation.z=Math.PI/2;w.position.set(x,.45,z);carVisual.add(w);}
new GLTFLoader().load(CAR_URL,gltf=>{
  const model=gltf.scene,box=new THREE.Box3().setFromObject(model),size=new THREE.Vector3();box.getSize(size);
  const scale=4.95/Math.max(size.x,size.z);model.scale.setScalar(scale);model.rotation.y=Math.PI;
  model.updateMatrixWorld(true);const b2=new THREE.Box3().setFromObject(model),center=new THREE.Vector3();b2.getCenter(center);
  model.position.x-=center.x;model.position.z-=center.z;model.position.y-=b2.min.y;
  carVisual.clear();carVisual.add(model);
},undefined,()=>{});

const tank=new THREE.Group();actorRoot.add(tank);tank.visible=false;
const tankMat=new THREE.MeshStandardMaterial({color:0x596151,roughness:.72,metalness:.32}),tankDark=new THREE.MeshStandardMaterial({color:0x252925,roughness:.82});
const tankBase=new THREE.Mesh(new THREE.BoxGeometry(3.5,1.05,7.2),tankMat);tankBase.position.y=.8;tank.add(tankBase);
for(const x of [-1.75,1.75]){const track=new THREE.Mesh(new THREE.BoxGeometry(.62,.72,7.4),tankDark);track.position.set(x,.55,0);tank.add(track);}
const turretPivot=new THREE.Group();turretPivot.position.y=1.55;tank.add(turretPivot);
const turretMesh=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.55,.7,10),tankMat);turretMesh.rotation.x=Math.PI/2;turretPivot.add(turretMesh);
const cannon=new THREE.Mesh(new THREE.CylinderGeometry(.13,.17,5,10),tankDark);cannon.rotation.x=Math.PI/2;cannon.position.set(0,.2,2.3);turretPivot.add(cannon);

const walker=new THREE.Group();actorRoot.add(walker);walker.visible=false;
const skin=new THREE.MeshStandardMaterial({color:0xc79777,roughness:.8}),cloth=new THREE.MeshStandardMaterial({color:0x202a36,roughness:.65}),trousers=new THREE.MeshStandardMaterial({color:0x11161c,roughness:.8});
const torso=new THREE.Mesh(new THREE.BoxGeometry(.64,.92,.34),cloth);torso.position.y=1.28;
const head=new THREE.Mesh(new THREE.SphereGeometry(.25,12,10),skin);head.position.y=1.95;walker.add(torso,head);
for(const x of [-.18,.18]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.19,.82,.22),trousers);leg.position.set(x,.55,0);walker.add(leg);}

const plane=new THREE.Group();actorRoot.add(plane);plane.visible=false;
const planeMat=new THREE.MeshStandardMaterial({color:0xb7bdc2,metalness:.55,roughness:.28});
const fus=new THREE.Mesh(new THREE.CylinderGeometry(.55,.82,5.8,10),planeMat);fus.rotation.x=Math.PI/2;plane.add(fus);
const wing=new THREE.Mesh(new THREE.BoxGeometry(7.2,.12,1.1),planeMat);plane.add(wing);
const tail=new THREE.Mesh(new THREE.BoxGeometry(2.4,.1,.72),planeMat);tail.position.z=-2.25;plane.add(tail);

const state={
  mode:'driving',speed:0,yaw:0,steer:0,tankSpeed:0,tankYaw:0,turretYaw:0,
  walkerYaw:0,camera:0,light:0,started:false,observerPos:new THREE.Vector3(),
  observerYaw:0,observerPitch:-.28,planeYaw:0,planePitch:0,planeSpeed:70,lastRoad:'城市道路',
};
const input={x:0,y:0,gas:0,brake:0,handbrake:0,action:0};
let steerPointer=null,toastTimer=0,lastHudRoadAt=0,lastHudPos=new THREE.Vector2(1e9,1e9),fpsFrames=0,fpsAccum=0;

const quick={
  driving:[['WASD','驾驶'],['T','坦克'],['空格','手刹'],['C','镜头'],['F','下车'],['G','观景']],
  tank:[['WASD','驾驶'],['Q E','炮塔'],['空格','开炮'],['T','轿车'],['F','下车'],['C','镜头']],
  walking:[['WASD','行走'],['Shift','跑步'],['C','人称'],['F','上车'],['E','互动'],['G','观景']],
  observer:[['WASD','平移'],['Q E','升降'],['B','飞机'],['G / F','返回'],['C','镜头']],
  flight:[['WASD','飞行'],['Q E','升降'],['空格','导弹'],['B','无人机'],['G','返回']],
};
const modeLabel={driving:'驾驶',tank:'坦克',walking:'步行',observer:'观景',flight:'飞机'};
function updateQuick(){ui.quickMode.textContent=modeLabel[state.mode];ui.quickList.innerHTML=quick[state.mode].map(([k,l])=>`<span><kbd>${k}</kbd>${l}</span>`).join('');}
function toast(s){ui.toast.textContent=s;ui.toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>ui.toast.classList.remove('show'),1500);}
function activeObject(){return state.mode==='tank'?tank:state.mode==='walking'?walker:state.mode==='observer'?null:state.mode==='flight'?plane:car;}
function playerXZ(){const o=activeObject();return o?{x:o.position.x,z:o.position.z}:{x:state.observerPos.x,z:state.observerPos.z};}
function districtFor(x){
  const b=city.bounds,span=Math.max(1,b.maxX-b.minX),t=(x-b.minX)/span;
  return t<.42?'南山':t<.72?'福田':'罗湖';
}
function applySpawn(spawn){
  const x=Number(spawn?.x)||0,z=Number(spawn?.z)||0,yaw=Number(spawn?.yaw)||0;
  car.position.set(x,.08,z);state.yaw=yaw;car.rotation.y=yaw;state.lastRoad=spawn?.road||'城市道路';
  tank.position.set(x+5,.05,z);state.tankYaw=yaw;tank.rotation.y=yaw;
  walker.position.set(x+2,0,z);state.walkerYaw=yaw;
}
function setMode(mode){
  if(!city.ready)return;
  if(mode==='walking'&&state.mode!=='walking'){
    if((state.mode==='driving'&&Math.abs(state.speed)>1.5)||(state.mode==='tank'&&Math.abs(state.tankSpeed)>1.2)){toast('请先停稳车辆');return;}
    const source=state.mode==='tank'?tank:car;walker.position.copy(source.position);walker.position.x+=2.6;walker.position.y=0;state.walkerYaw=state.mode==='tank'?state.tankYaw:state.yaw;
  }
  if((mode==='driving'||mode==='tank')&&state.mode==='walking'){
    const target=mode==='tank'?tank:car;if(walker.position.distanceTo(target.position)>10){toast('请靠近车辆');return;}
  }
  if(mode==='observer'){const p=playerXZ();state.observerPos.set(p.x,90,p.z-20);state.observerYaw=state.mode==='walking'?state.walkerYaw:state.yaw;state.observerPitch=-.32;}
  if(mode==='flight'&&state.mode!=='flight'){state.planeYaw=state.observerYaw||state.yaw;state.planePitch=0;plane.position.copy(state.observerPos).add(new THREE.Vector3(0,35,0));}
  state.mode=mode;car.visible=mode==='driving';tank.visible=mode==='tank';walker.visible=mode==='walking';plane.visible=mode==='flight';
  ui.speed.parentElement.style.opacity=(mode==='driving'||mode==='tank'||mode==='flight')?'1':'.35';
  updateQuick();updateActionLabels();toast(modeLabel[mode]);
}
function updateActionLabels(){
  ui.enter.textContent=state.mode==='walking'?'F 上车':'F 下车';
  ui.vehicle.textContent=state.mode==='tank'?'T 轿车':'T 坦克';
  ui.observer.textContent=state.mode==='observer'?'G 返回':'G 观景';
  ui.flight.textContent=state.mode==='flight'?'B 无人机':'B 飞机';
  ui.handbrake.textContent=state.mode==='tank'?'开炮':state.mode==='flight'?'导弹':'手刹';
  ui.action.classList.toggle('hidden',state.mode!=='walking');
  ui.action.textContent='E 互动';
}
function cycleVehicle(){if(state.mode==='walking'){setMode('driving');return;}if(state.mode==='tank'){car.position.copy(tank.position);state.yaw=state.tankYaw;setMode('driving');}else if(state.mode==='driving'){tank.position.copy(car.position);state.tankYaw=state.yaw;setMode('tank');}}
function toggleEnter(){if(state.mode==='walking'){const dc=walker.position.distanceTo(car.position),dt=walker.position.distanceTo(tank.position);setMode(dt<dc?'tank':'driving');}else if(state.mode==='driving'||state.mode==='tank')setMode('walking');else setMode('driving');}
function toggleObserver(){if(state.mode==='observer'||state.mode==='flight')setMode('driving');else setMode('observer');}
function toggleFlight(){if(state.mode==='flight')setMode('observer');else{if(state.mode!=='observer')setMode('observer');setMode('flight');}}
function cycleCamera(){state.camera=(state.camera+1)%3;updateCameraLabel();toast(['追踪镜头','第一视角','远景镜头'][state.camera]);}
function updateCameraLabel(){ui.cameraLabel.textContent=['追踪镜头','第一视角','远景镜头'][state.camera];}
function cycleLight(){state.light=(state.light+1)%3;applyLight();}
function applyLight(){
  const configs=[
    {name:'黄昏',bg:0x8b6875,fog:0x8b6875,hemi:1.62,sun:4.15,sunColor:0xff8b59,exp:1.04,emi:0x060302},
    {name:'夜色',bg:0x07101b,fog:0x0a1420,hemi:.42,sun:.26,sunColor:0x779dcc,exp:.82,emi:0x182335},
    {name:'晴日',bg:0x8fb9d1,fog:0x91b4c8,hemi:2.0,sun:3.25,sunColor:0xfff0d1,exp:1.0,emi:0x000000},
  ],c=configs[state.light];
  scene.background.setHex(c.bg);scene.fog.color.setHex(c.fog);hemi.intensity=c.hemi;sun.intensity=c.sun;sun.color.setHex(c.sunColor);renderer.toneMappingExposure=c.exp;
  for(const m of emissiveMaterials)m.emissive?.setHex(c.emi);ui.lightLabel.textContent=c.name;toast(c.name);
}
function fireTank(){
  if(state.mode!=='tank')return;const dir=new THREE.Vector3(Math.sin(state.tankYaw+state.turretYaw),.035,Math.cos(state.tankYaw+state.turretYaw));
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.18,8,6),new THREE.MeshBasicMaterial({color:0xff9d48}));
  mesh.position.copy(tank.position).add(new THREE.Vector3(0,1.8,0)).addScaledVector(dir,4);world.add(mesh);projectiles.push({mesh,vel:dir.multiplyScalar(95),life:4,gravity:5});toast('开炮');
}
function fireMissile(){
  if(state.mode!=='flight')return;const dir=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,1.2,6),new THREE.MeshBasicMaterial({color:0xffb25c}));mesh.rotation.x=Math.PI/2;mesh.position.copy(plane.position).addScaledVector(dir,3);world.add(mesh);projectiles.push({mesh,vel:dir.multiplyScalar(145),life:5,gravity:0});toast('导弹');
}
function action(){if(state.mode==='walking')toast('街区互动将在真实 POI 层接入');else if(state.mode==='tank')fireTank();else if(state.mode==='flight')fireMissile();}

function axis(pos,neg){return(keys.has(pos)?1:0)-(keys.has(neg)?1:0);}
function updateDriving(dt){
  const throttle=Math.max(input.gas,axis('KeyW','KeyS')),brake=Math.max(input.brake,axis('KeyS','KeyW')<0?1:0),steer=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1);
  const acc=throttle*12-brake*18-Math.sign(state.speed)*1.6;state.speed+=acc*dt;
  if(!throttle&&!brake)state.speed*=Math.pow(.985,dt*60);
  state.speed=THREE.MathUtils.clamp(state.speed,-9,46);state.steer=THREE.MathUtils.lerp(state.steer,steer,1-Math.pow(.002,dt));
  const turn=state.steer*state.speed*.025*(input.handbrake||keys.has('Space')?1.75:1);state.yaw-=turn*dt;
  const nx=car.position.x+Math.sin(state.yaw)*state.speed*dt,nz=car.position.z+Math.cos(state.yaw)*state.speed*dt;
  if(!blocked(nx,nz,1.3)){car.position.x=nx;car.position.z=nz;}else state.speed*=-.12;
  car.rotation.y=state.yaw;
}
function updateTank(dt){
  const drive=Math.max(input.gas,axis('KeyW','KeyS'))-Math.max(input.brake,axis('KeyS','KeyW')<0?1:0),turn=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1);
  state.tankSpeed+=drive*8.5*dt;state.tankSpeed*=Math.pow(.975,dt*60);state.tankSpeed=THREE.MathUtils.clamp(state.tankSpeed,-7,18);
  state.tankYaw-=turn*(.62+Math.abs(state.tankSpeed)*.025)*dt;state.turretYaw+=(axis('KeyE','KeyQ'))*1.05*dt;turretPivot.rotation.y=state.turretYaw;
  const nx=tank.position.x+Math.sin(state.tankYaw)*state.tankSpeed*dt,nz=tank.position.z+Math.cos(state.tankYaw)*state.tankSpeed*dt;
  if(!blocked(nx,nz,2.25)){tank.position.x=nx;tank.position.z=nz;}else state.tankSpeed*=-.08;tank.rotation.y=state.tankYaw;
}
function updateWalk(dt){
  const f=axis('KeyW','KeyS')-input.y,r=axis('KeyD','KeyA')+input.x,run=keys.has('ShiftLeft')||keys.has('ShiftRight'),speed=run?7.4:4.2;
  if(Math.abs(r)>.05)state.walkerYaw-=r*1.8*dt;
  const move=f*speed*dt,nx=walker.position.x+Math.sin(state.walkerYaw)*move,nz=walker.position.z+Math.cos(state.walkerYaw)*move;
  if(!blocked(nx,nz,.38)){walker.position.x=nx;walker.position.z=nz;}walker.rotation.y=state.walkerYaw;
}
function updateObserver(dt){
  const f=axis('KeyW','KeyS')-input.y,r=axis('KeyD','KeyA')+input.x,vert=axis('KeyE','KeyQ'),fast=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?3:1,s=40*fast*dt;
  const forward=new THREE.Vector3(Math.sin(state.observerYaw),0,Math.cos(state.observerYaw)),right=new THREE.Vector3(forward.z,0,-forward.x);
  state.observerPos.addScaledVector(forward,f*s).addScaledVector(right,r*s);state.observerPos.y=THREE.MathUtils.clamp(state.observerPos.y+vert*s,8,1800);
}
function updateFlight(dt){
  const yaw=THREE.MathUtils.clamp(input.x+axis('KeyD','KeyA'),-1,1),pitch=THREE.MathUtils.clamp(input.y+axis('KeyS','KeyW'),-1,1),lift=axis('KeyE','KeyQ');
  state.planeYaw-=yaw*.75*dt;state.planePitch=THREE.MathUtils.clamp(state.planePitch+pitch*.45*dt,-.52,.52);plane.position.y+=lift*35*dt;
  const dir=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));
  plane.position.addScaledVector(dir,state.planeSpeed*dt);plane.position.y=Math.max(8,plane.position.y);plane.rotation.set(state.planePitch,state.planeYaw,-yaw*.35,'YXZ');
}
function updateProjectiles(dt){
  for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];p.life-=dt;p.vel.y-=p.gravity*dt;p.mesh.position.addScaledVector(p.vel,dt);
    if(p.life<=0||p.mesh.position.y<0){world.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();projectiles.splice(i,1);}}
}

function createTraffic(){
  const candidates=city.roadSegments.filter(s=>s.width>=10&&Math.hypot(s.bx-s.ax,s.bz-s.az)>80);
  const colors=[0x7a2025,0x344a5f,0xb6b7b1,0x202326,0x806c4e];
  for(let i=0;i<Math.min(26,candidates.length);i++){
    const seg=candidates[Math.floor(i*candidates.length/Math.min(26,candidates.length))],mesh=new THREE.Group();
    const body=new THREE.Mesh(new THREE.BoxGeometry(1.8,.62,4.1),new THREE.MeshStandardMaterial({color:colors[i%colors.length],roughness:.42,metalness:.35}));body.position.y=.62;mesh.add(body);
    const cab=new THREE.Mesh(new THREE.BoxGeometry(1.5,.48,1.8),mats.glass);cab.position.set(0,1.05,-.2);mesh.add(cab);actorRoot.add(mesh);
    traffic.push({mesh,seg,t:(i*.173)%1,dir:i%2?1:-1,speed:.028+(i%7)*.004,lane:(i%3-1)*2.2});
  }
}
function updateTraffic(dt){
  for(const t of traffic){t.t+=t.speed*t.dir*dt;if(t.t>1)t.t=0;if(t.t<0)t.t=1;
    const s=t.seg,vx=s.bx-s.ax,vz=s.bz-s.az,len=Math.hypot(vx,vz)||1,nx=-vz/len,nz=vx/len;
    t.mesh.position.set(s.ax+vx*t.t+nx*t.lane,.04,s.az+vz*t.t+nz*t.lane);t.mesh.rotation.y=Math.atan2(vx,vz);
  }
}

const camTarget=new THREE.Vector3(),camDesired=new THREE.Vector3();
function updateCamera(dt){
  const smooth=1-Math.pow(.0008,dt);
  if(state.mode==='driving'){const f=new THREE.Vector3(Math.sin(state.yaw),0,Math.cos(state.yaw));
    if(state.camera===1){camDesired.copy(car.position).add(new THREE.Vector3(0,1.28,0)).addScaledVector(f,.65);camTarget.copy(car.position).addScaledVector(f,25).setY(1.2);}
    else{const dist=state.camera===2?18:9,h=state.camera===2?7.2:3.6;camDesired.copy(car.position).addScaledVector(f,-dist).add(new THREE.Vector3(0,h,0));camTarget.copy(car.position).addScaledVector(f,6).setY(1.1);}
  }else if(state.mode==='tank'){const f=new THREE.Vector3(Math.sin(state.tankYaw),0,Math.cos(state.tankYaw));camDesired.copy(tank.position).addScaledVector(f,state.camera===2?-20:-11).add(new THREE.Vector3(0,state.camera===2?9:5.3,0));camTarget.copy(tank.position).add(new THREE.Vector3(0,1.4,0)).addScaledVector(f,5);
  }else if(state.mode==='walking'){const f=new THREE.Vector3(Math.sin(state.walkerYaw),0,Math.cos(state.walkerYaw));if(state.camera===1){camDesired.copy(walker.position).add(new THREE.Vector3(0,1.75,0)).addScaledVector(f,.18);camTarget.copy(camDesired).addScaledVector(f,20);}else{camDesired.copy(walker.position).addScaledVector(f,state.camera===2?-8:-4.3).add(new THREE.Vector3(0,state.camera===2?4.2:2.4,0));camTarget.copy(walker.position).add(new THREE.Vector3(0,1.35,0));}
  }else if(state.mode==='observer'){camera.position.lerp(state.observerPos,smooth);const d=new THREE.Vector3(Math.sin(state.observerYaw)*Math.cos(state.observerPitch),Math.sin(state.observerPitch),Math.cos(state.observerYaw)*Math.cos(state.observerPitch));camera.lookAt(state.observerPos.clone().addScaledVector(d,120));return;
  }else{const d=new THREE.Vector3(Math.sin(state.planeYaw)*Math.cos(state.planePitch),-Math.sin(state.planePitch),Math.cos(state.planeYaw)*Math.cos(state.planePitch));camDesired.copy(plane.position).addScaledVector(d,state.camera===2?-24:-14).add(new THREE.Vector3(0,state.camera===2?9:5,0));camTarget.copy(plane.position).addScaledVector(d,18);}
  camera.position.lerp(camDesired,smooth);camera.lookAt(camTarget);
}

function mapTransform(x,z,w,h){
  const b=city.bounds,pad=.04,dx=Math.max(1,b.maxX-b.minX),dz=Math.max(1,b.maxZ-b.minZ),scale=Math.min(w/(dx*(1+pad*2)),h/(dz*(1+pad*2)));
  return[(x-(b.minX+b.maxX)/2)*scale+w/2,(z-(b.minZ+b.maxZ)/2)*scale+h/2];
}
function drawMap(cnv,large=false){
  if(!city.data)return;const ctx=cnv.getContext('2d'),w=cnv.width,h=cnv.height;ctx.clearRect(0,0,w,h);ctx.fillStyle='#071018';ctx.fillRect(0,0,w,h);
  ctx.lineCap='round';ctx.lineJoin='round';
  for(const road of city.roads){const pts=road.points||[];if(pts.length<2)continue;const rw=roadWidth(road);if(!large&&rw<8)continue;
    ctx.strokeStyle=rw>=18?'rgba(220,232,235,.36)':'rgba(177,196,201,.20)';ctx.lineWidth=large?Math.max(1,rw*.07):Math.max(.45,rw*.025);ctx.beginPath();
    pts.forEach((p,i)=>{const q=mapTransform(p[0],p[1],w,h);i?ctx.lineTo(...q):ctx.moveTo(...q);});ctx.stroke();
  }
  for(const l of city.landmarks){const [x,y]=mapTransform(l.x,l.z,w,h);ctx.fillStyle='#e9d6a2';ctx.beginPath();ctx.arc(x,y,large?3.2:2,0,Math.PI*2);ctx.fill();if(large){ctx.font='12px -apple-system,sans-serif';ctx.fillStyle='rgba(245,248,250,.72)';ctx.fillText(l.name||'',x+6,y-5);}}
  const p=playerXZ(),[px,py]=mapTransform(p.x,p.z,w,h);ctx.fillStyle='#72f1c5';ctx.beginPath();ctx.arc(px,py,large?6:4,0,Math.PI*2);ctx.fill();
}
function updateHud(dt){
  const p=playerXZ();ui.district.textContent=districtFor(p.x);
  if(performance.now()-lastHudRoadAt>260 && (Math.hypot(p.x-lastHudPos.x,p.z-lastHudPos.y)>8||lastHudPos.x>1e8)){
    const n=nearestRoad(p.x,p.z);if(n){state.lastRoad=n.seg.name;ui.road.textContent=state.lastRoad;}lastHudRoadAt=performance.now();lastHudPos.set(p.x,p.z);
  }
  const v=state.mode==='driving'?Math.abs(state.speed)*3.6:state.mode==='tank'?Math.abs(state.tankSpeed)*3.6:state.mode==='flight'?state.planeSpeed*3.6:0;
  ui.speed.textContent=Math.round(v);ui.mode.textContent=modeLabel[state.mode];fpsFrames++;fpsAccum+=dt;if(fpsAccum>.5){ui.fps.textContent=`${Math.round(fpsFrames/fpsAccum)} FPS`;fpsFrames=0;fpsAccum=0;}
  drawMap(ui.minimap,false);
}
function openMap(open=true){ui.fullMap.classList.toggle('hidden',!open);if(open)drawMap(ui.mapLarge,true);}

function resetToRoad(){
  const p=playerXZ(),n=nearestRoad(p.x,p.z);if(!n)return;
  const yaw=Math.atan2(n.seg.bx-n.seg.ax,n.seg.bz-n.seg.az);
  if(state.mode==='tank'){tank.position.set(n.px,.05,n.pz);state.tankYaw=yaw;state.tankSpeed=0;}
  else if(state.mode==='walking'){walker.position.set(n.px,0,n.pz);state.walkerYaw=yaw;}
  else if(state.mode==='flight'){plane.position.set(n.px,90,n.pz);state.planeYaw=yaw;}
  else{car.position.set(n.px,.08,n.pz);state.yaw=yaw;state.speed=0;}toast('已回到附近道路');
}

function bindHold(btn,prop,val=1){
  const down=e=>{e.preventDefault();input[prop]=val;btn.classList.add('active');};
  const up=e=>{e.preventDefault();input[prop]=0;btn.classList.remove('active');};
  btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('pointerleave',e=>{if(e.buttons===0)up(e);});
}
bindHold(ui.gas,'gas');bindHold(ui.brake,'brake');bindHold(ui.handbrake,'handbrake');
ui.handbrake.addEventListener('pointerdown',()=>{if(state.mode==='tank')fireTank();if(state.mode==='flight')fireMissile();});
ui.action.addEventListener('click',action);
ui.steer.addEventListener('pointerdown',e=>{steerPointer=e.pointerId;ui.steer.setPointerCapture(e.pointerId);updateStick(e);});
ui.steer.addEventListener('pointermove',e=>{if(e.pointerId===steerPointer)updateStick(e);});
for(const ev of ['pointerup','pointercancel'])ui.steer.addEventListener(ev,e=>{if(e.pointerId===steerPointer){steerPointer=null;input.x=input.y=0;ui.thumb.style.transform='translate3d(0,0,0)';}});
function updateStick(e){const r=ui.steer.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/(r.width*.36),y=(e.clientY-(r.top+r.height/2))/(r.height*.36),len=Math.max(1,Math.hypot(x,y));input.x=THREE.MathUtils.clamp(x/len*Math.min(1,len),-1,1);input.y=THREE.MathUtils.clamp(y/len*Math.min(1,len),-1,1);ui.thumb.style.transform=`translate3d(${input.x*32}px,${input.y*32}px,0)`;}
ui.camera.onclick=cycleCamera;ui.light.onclick=cycleLight;ui.map.onclick=()=>openMap(true);ui.mapClose.onclick=()=>openMap(false);ui.enter.onclick=toggleEnter;ui.vehicle.onclick=cycleVehicle;ui.observer.onclick=toggleObserver;ui.flight.onclick=toggleFlight;

addEventListener('keydown',e=>{
  if(e.repeat)return;keys.add(e.code);
  if(e.code==='KeyC')cycleCamera();else if(e.code==='KeyL')cycleLight();else if(e.code==='KeyM'||e.code==='Tab'){e.preventDefault();openMap(ui.fullMap.classList.contains('hidden'));}
  else if(e.code==='KeyF')toggleEnter();else if(e.code==='KeyT')cycleVehicle();else if(e.code==='KeyG')toggleObserver();else if(e.code==='KeyB')toggleFlight();
  else if(e.code==='KeyR')resetToRoad();else if(e.code==='KeyE'&&state.mode==='walking')action();else if(e.code==='Space'){e.preventDefault();if(state.mode==='tank')fireTank();else if(state.mode==='flight')fireMissile();}
});
addEventListener('keyup',e=>keys.delete(e.code));

ui.startBtn.disabled=true;ui.startBtn.textContent='载入真实深圳…';
ui.startBtn.onclick=async()=>{
  if(!city.ready){toast('城市仍在载入');return;}
  state.started=true;ui.start.classList.add('hidden');ui.hud.classList.remove('hidden');
  try{await document.documentElement.requestFullscreen?.();screen.orientation?.lock?.('landscape').catch(()=>{});}catch{}
  updateQuick();updateActionLabels();updateCameraLabel();applyLight();
};

async function fetchCityData(){
  let last;
  for(const url of CITY_URLS){try{const r=await fetch(url,{cache:'force-cache'});if(!r.ok)throw new Error(`${r.status}`);return await r.json();}catch(e){last=e;}}
  throw last||new Error('city data unavailable');
}
async function loadCity(){
  if(city.loading)return;city.loading=true;
  try{
    ui.startBtn.textContent='读取 GTA_SZ 城市数据…';
    const data=await fetchCityData();city.data=data;
    buildLandAndWater(data);buildRoads(data);buildLandmarks(data);applySpawn(data.spawn);
    await buildBuildings(data);createTraffic();
    city.ready=true;ui.startBtn.disabled=false;ui.startBtn.textContent='进入深城纪';
    const c=data.meta?.counts||{};const info=[c.roads&&`${c.roads}条道路`,c.buildings&&`${c.buildings}栋建筑`].filter(Boolean).join(' · ');
    const p=ui.start.querySelector('.start-notes');if(p)p.innerHTML=`${info||'真实深圳道路与建筑已载入'}<br>道路/建筑 © OpenStreetMap contributors · ODbL 1.0 · 城市数据编制源自 linranff/GTA_SZ`;
  }catch(e){
    console.error(e);ui.startBtn.disabled=false;ui.startBtn.textContent='重试载入城市';ui.startBtn.onclick=()=>{city.loading=false;loadCity();};
    const p=ui.start.querySelector('.start-notes');if(p)p.textContent='真实城市数据载入失败，请检查网络后重试。';
  }
}
loadCity();

function animate(){
  requestAnimationFrame(animate);const dt=Math.min(.033,clock.getDelta()||.016);
  if(state.started&&city.ready){
    if(state.mode==='driving')updateDriving(dt);else if(state.mode==='tank')updateTank(dt);else if(state.mode==='walking')updateWalk(dt);else if(state.mode==='observer')updateObserver(dt);else updateFlight(dt);
    updateTraffic(dt);updateProjectiles(dt);updateCamera(dt);updateHud(dt);
  }
  renderer.render(scene,camera);
}
animate();

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden){input.gas=input.brake=input.handbrake=input.x=input.y=0;keys.clear();}});
