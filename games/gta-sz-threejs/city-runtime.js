import * as THREE from 'three';

const CITY_URLS=[
  'https://cdn.jsdelivr.net/gh/linranff/GTA_SZ@main/public/city/city.json',
  'https://raw.githubusercontent.com/linranff/GTA_SZ/main/public/city/city.json',
];
const COLLISION_CELL=128,ROAD_CELL=256,BUILD_CHUNK=260;

const cleanRing=ring=>{
  if(!Array.isArray(ring))return[];
  const out=ring.filter(p=>Array.isArray(p)&&Number.isFinite(+p[0])&&Number.isFinite(+p[1])).map(p=>[+p[0],+p[1]]);
  if(out.length>2){const a=out[0],b=out.at(-1);if(Math.abs(a[0]-b[0])<1e-5&&Math.abs(a[1]-b[1])<1e-5)out.pop();}
  return out;
};
const addGrid=(map,key,value)=>{let a=map.get(key);if(!a)map.set(key,a=[]);a.push(value);};
const coverGrid=(map,minX,maxX,minZ,maxZ,size,value)=>{
  for(let ix=Math.floor(minX/size);ix<=Math.floor(maxX/size);ix++)
    for(let iz=Math.floor(minZ/size);iz<=Math.floor(maxZ/size);iz++)addGrid(map,`${ix},${iz}`,value);
};
const roadWidth=road=>{
  const w=Number(road.width)||0;if(w>1)return Math.min(24,Math.max(3,w));
  const k=(road.kind||'').toLowerCase();return k.includes('trunk')?16:k.includes('primary')?14:k.includes('secondary')?12:k.includes('tertiary')?9:6;
};

async function fetchJSON(){
  let last;
  for(const url of CITY_URLS){
    try{const r=await fetch(url,{cache:'force-cache'});if(!r.ok)throw new Error(`${r.status} ${r.statusText}`);return await r.json();}
    catch(e){last=e;}
  }
  throw last||new Error('GTA_SZ city.json unavailable');
}

function triangulatedFlat(polygons,y=0){
  const pos=[];
  for(const rings0 of polygons||[]){
    const rings=(Array.isArray(rings0?.[0]?.[0])?rings0:[rings0]).map(cleanRing).filter(r=>r.length>=3);
    if(!rings.length)continue;
    const contour=rings[0].map(([x,z])=>new THREE.Vector2(x,z));
    const holes=rings.slice(1).map(r=>r.map(([x,z])=>new THREE.Vector2(x,z)));
    let faces=[];try{faces=THREE.ShapeUtils.triangulateShape(contour,holes);}catch{}
    const verts=[...contour,...holes.flat()];
    for(const f of faces)for(const i of f){const v=verts[i];pos.push(v.x,y,v.y);}
  }
  if(!pos.length)return null;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;
}

function buildRoadMesh(api){
  const pos=[];
  for(const road of api.data.roads||[]){
    const pts=road.points||[],width=roadWidth(road),half=width/2,name=road.displayName||road.name||'支路';
    for(let i=0;i<pts.length-1;i++){
      const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<.05)continue;
      const nx=-dz/len*half,nz=dx/len*half;
      pos.push(
        a[0]+nx,.018,a[1]+nz, a[0]-nx,.018,a[1]-nz, b[0]+nx,.018,b[1]+nz,
        a[0]-nx,.018,a[1]-nz, b[0]-nx,.018,b[1]-nz, b[0]+nx,.018,b[1]+nz
      );
      const s={ax:a[0],az:a[1],bx:b[0],bz:b[1],width,name,road};
      api.roadSegments.push(s);
      coverGrid(api.roadGrid,Math.min(a[0],b[0])-width,Math.max(a[0],b[0])+width,Math.min(a[1],b[1])-width,Math.max(a[1],b[1])+width,ROAD_CELL,s);
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();
  api.root.add(new THREE.Mesh(g,api.materials.asphalt));
}

function indexCollisions(api){
  for(const b of api.data.buildings||[]){
    const ring=cleanRing(b.rings?.[0]);if(ring.length<3)continue;
    let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
    for(const [x,z] of ring){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);}
    coverGrid(api.collisionGrid,minX,maxX,minZ,maxZ,COLLISION_CELL,{minX,maxX,minZ,maxZ});
  }
}

function styleIndex(style){
  let h=2166136261;for(const c of String(style||'')){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return(h>>>0)%4;
}
function buildingCenter(b){
  const r=cleanRing(b.rings?.[0]);if(!r.length)return[0,0];let x=0,z=0;for(const p of r){x+=p[0];z+=p[1];}return[x/r.length,z/r.length];
}
function buildBuildingGeometry(buildings,index){
  const pos=[];
  for(const b of buildings){
    if(styleIndex(b.style)!==index)continue;
    const rings=(b.rings||[]).map(cleanRing).filter(r=>r.length>=3);if(!rings.length)continue;
    const h=Math.max(4,Math.min(300,Number(b.height)||12));
    const contour=rings[0].map(([x,z])=>new THREE.Vector2(x,z));
    const holes=rings.slice(1).map(r=>r.map(([x,z])=>new THREE.Vector2(x,z)));
    let faces=[];try{faces=THREE.ShapeUtils.triangulateShape(contour,holes);}catch{}
    const verts=[...contour,...holes.flat()];
    for(const f of faces)for(const i of f){const v=verts[i];pos.push(v.x,h,v.y);}
    for(const ring of rings)for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length];
      pos.push(a[0],0,a[1],c[0],0,c[1],c[0],h,c[1], a[0],0,a[1],c[0],h,c[1],a[0],h,a[1]);
    }
  }
  if(!pos.length)return null;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;
}
async function streamBuildings(api,onProgress){
  const sx=api.data.spawn?.x||0,sz=api.data.spawn?.z||0;
  const all=[...(api.data.buildings||[])].sort((a,b)=>{
    const A=buildingCenter(a),B=buildingCenter(b);return(A[0]-sx)**2+(A[1]-sz)**2-((B[0]-sx)**2+(B[1]-sz)**2);
  });
  const renderChunk=(chunk)=>{
    for(let i=0;i<4;i++){const g=buildBuildingGeometry(chunk,i);if(g)api.root.add(new THREE.Mesh(g,api.materials.buildings[i]));}
  };
  const first=all.slice(0,BUILD_CHUNK);renderChunk(first);onProgress?.(Math.min(1,first.length/Math.max(1,all.length)));
  api.firstBuildingsReady=true;
  await new Promise(requestAnimationFrame);
  for(let start=BUILD_CHUNK;start<all.length;start+=BUILD_CHUNK){
    renderChunk(all.slice(start,start+BUILD_CHUNK));
    onProgress?.(Math.min(1,(start+BUILD_CHUNK)/Math.max(1,all.length)));
    await new Promise(requestAnimationFrame);
  }
  api.buildingsReady=true;
}

function addLandmarks(api){
  const mat=api.materials.landmark;
  for(const l of api.data.landmarks||[]){
    const h=Math.max(0,Number(l.height)||0),g=new THREE.Group();g.position.set(l.x,0,l.z);
    if(h>0){
      if(/春笋/.test(l.name||'')){
        const b=new THREE.Mesh(new THREE.CylinderGeometry(Math.max(8,h*.05),Math.max(14,h*.075),h,12),mat);b.position.y=h/2;g.add(b);
        const c=new THREE.Mesh(new THREE.ConeGeometry(Math.max(8,h*.045),Math.max(16,h*.12),12),mat);c.position.y=h+h*.055;g.add(c);
      }else if(/市民中心/.test(l.name||'')){
        const b=new THREE.Mesh(new THREE.BoxGeometry(145,45,62),mat);b.position.y=22.5;g.add(b);
        const roof=new THREE.Mesh(new THREE.BoxGeometry(175,9,72),api.materials.civicRoof);roof.position.y=52;g.add(roof);
      }else{
        const w=/平安/.test(l.name||'')?Math.max(24,h*.09):Math.max(22,h*.11);
        const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w*.78),mat);b.position.y=h/2;g.add(b);
        if(/平安|地王|京基/.test(l.name||'')){const sp=new THREE.Mesh(new THREE.ConeGeometry(w*.2,Math.max(14,h*.1),4),mat);sp.position.y=h+Math.max(7,h*.05);sp.rotation.y=Math.PI/4;g.add(sp);}
      }
    }else{
      const marker=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,.18,16),api.materials.poi);marker.position.y=.12;g.add(marker);
    }
    api.root.add(g);api.landmarks.push({...l,group:g});
  }
}

function buildSurfaces(api){
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(17000,9000),api.materials.water);sea.rotation.x=-Math.PI/2;sea.position.y=-.15;api.root.add(sea);
  const land=triangulatedFlat(api.data.land||[],0);if(land)api.root.add(new THREE.Mesh(land,api.materials.land));
  const green=triangulatedFlat((api.data.green||[]).map(x=>x.rings),.03);if(green)api.root.add(new THREE.Mesh(green,api.materials.green));
  const water=triangulatedFlat((api.data.water||[]).map(x=>x.rings),.04);if(water)api.root.add(new THREE.Mesh(water,api.materials.water));
}

function nearestPoint(x,z,s){
  const vx=s.bx-s.ax,vz=s.bz-s.az,d=vx*vx+vz*vz||1,t=THREE.MathUtils.clamp(((x-s.ax)*vx+(z-s.az)*vz)/d,0,1);
  const px=s.ax+vx*t,pz=s.az+vz*t;return{px,pz,t,d2:(x-px)**2+(z-pz)**2};
}
function makeMapBase(api,w,h,large){
  const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');
  ctx.fillStyle='#071018';ctx.fillRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';
  for(const road of api.data.roads||[]){
    const rw=roadWidth(road);if(!large&&rw<8)continue;const pts=road.points||[];if(pts.length<2)continue;
    ctx.strokeStyle=rw>=14?'rgba(225,235,236,.34)':'rgba(160,184,191,.18)';ctx.lineWidth=large?Math.max(.7,rw*.08):Math.max(.4,rw*.035);
    ctx.beginPath();for(let i=0;i<pts.length;i++){const p=api.mapPoint(pts[i][0],pts[i][1],w,h);i?ctx.lineTo(...p):ctx.moveTo(...p);}ctx.stroke();
  }
  for(const l of api.landmarks){const p=api.mapPoint(l.x,l.z,w,h);ctx.fillStyle='#e7d7a8';ctx.beginPath();ctx.arc(p[0],p[1],large?3:1.7,0,Math.PI*2);ctx.fill();if(large){ctx.font='11px -apple-system,sans-serif';ctx.fillStyle='rgba(245,248,250,.72)';ctx.fillText(l.name||'',p[0]+6,p[1]-4);}}
  return c;
}

export async function createCityWorld(parent,{onProgress}={}){
  const root=new THREE.Group();parent.add(root);
  const materials={
    asphalt:new THREE.MeshStandardMaterial({color:0x30363a,roughness:.91,metalness:.035}),
    land:new THREE.MeshStandardMaterial({color:0x5d6b60,roughness:1}),
    green:new THREE.MeshStandardMaterial({color:0x355c47,roughness:1}),
    water:new THREE.MeshPhysicalMaterial({color:0x245d73,roughness:.28,metalness:.08,transparent:true,opacity:.95}),
    landmark:new THREE.MeshStandardMaterial({color:0x9babb2,roughness:.34,metalness:.38,emissive:0x000000}),
    civicRoof:new THREE.MeshStandardMaterial({color:0xb44338,roughness:.48,emissive:0x210402}),
    poi:new THREE.MeshBasicMaterial({color:0xe9d69f}),
    buildings:[
      new THREE.MeshStandardMaterial({color:0x94a5ae,roughness:.6,metalness:.14,emissive:0x000000}),
      new THREE.MeshStandardMaterial({color:0xb2a89e,roughness:.65,metalness:.08,emissive:0x000000}),
      new THREE.MeshStandardMaterial({color:0x7f8e97,roughness:.56,metalness:.18,emissive:0x000000}),
      new THREE.MeshStandardMaterial({color:0xa7b0b4,roughness:.62,metalness:.11,emissive:0x000000}),
    ],
  };
  onProgress?.('正在读取 GTA_SZ 城市数据');
  const data=await fetchJSON();
  const ext=data.meta?.extent||[-6788,-2605,6788,2605];
  const api={
    root,materials,data,roadSegments:[],roadGrid:new Map(),collisionGrid:new Map(),landmarks:[],
    bounds:{minX:ext[0],minZ:ext[1],maxX:ext[2],maxZ:ext[3]},firstBuildingsReady:false,buildingsReady:false,
    mapCache:new Map(),
  };
  buildSurfaces(api);buildRoadMesh(api);indexCollisions(api);addLandmarks(api);
  api.nearestRoad=(x,z)=>{
    const cx=Math.floor(x/ROAD_CELL),cz=Math.floor(z/ROAD_CELL),list=[];
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const a=api.roadGrid.get(`${cx+dx},${cz+dz}`);if(a)list.push(...a);}
    let best=null,bd=Infinity;for(const s of list.length?list:api.roadSegments){const q=nearestPoint(x,z,s);if(q.d2<bd){bd=q.d2;best={...q,seg:s};}}return best;
  };
  api.blocked=(x,z,r=1)=>{
    const cx=Math.floor(x/COLLISION_CELL),cz=Math.floor(z/COLLISION_CELL);
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const a=api.collisionGrid.get(`${cx+dx},${cz+dz}`);if(!a)continue;for(const b of a)if(x+r>b.minX&&x-r<b.maxX&&z+r>b.minZ&&z-r<b.maxZ)return true;}return false;
  };
  api.mapPoint=(x,z,w,h)=>{
    const b=api.bounds,dx=b.maxX-b.minX,dz=b.maxZ-b.minZ,s=Math.min(w/(dx*1.08),h/(dz*1.08));
    return[(x-(b.minX+b.maxX)/2)*s+w/2,(z-(b.minZ+b.maxZ)/2)*s+h/2];
  };
  api.drawMap=(canvas,player,large=false)=>{
    const key=`${canvas.width}x${canvas.height}:${large}`;let base=api.mapCache.get(key);if(!base){base=makeMapBase(api,canvas.width,canvas.height,large);api.mapCache.set(key,base);}
    const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(base,0,0);
    const p=api.mapPoint(player.x,player.z,canvas.width,canvas.height);ctx.fillStyle='#72f1c5';ctx.beginPath();ctx.arc(p[0],p[1],large?6:4,0,Math.PI*2);ctx.fill();
  };
  api.districtFor=x=>x<-300?'南山':x<3650?'福田':'罗湖';
  api.emissive=[materials.landmark,...materials.buildings,materials.civicRoof];
  onProgress?.(`真实路网已就绪 · ${data.meta?.counts?.roads||0} 条道路`);
  api.buildingPromise=streamBuildings(api,p=>onProgress?.(`建筑 ${Math.round(p*100)}%`));
  return api;
}
