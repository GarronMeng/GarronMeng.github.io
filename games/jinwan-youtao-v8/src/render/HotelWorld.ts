import * as T from 'three';
import type {Store,PreviewState} from '../state/types';
import {FLOOR_HEIGHT} from '../content/place';
import {materials as m,disposeMaterials} from './materials';
import {box,plant,batchStatic,geometries} from './primitives';
import {roomFactory} from './room';
import {facilityFactory} from './facilities';
import {actorFactory,moveActor,type Actor} from './actors';
import {sceneLayout} from './layout';
import {createEntityCollider,pickEntity} from './interaction';
export class HotelWorld {
 private renderer:T.WebGLRenderer;
 private scene=new T.Scene();private root=new T.Group();private camera=new T.OrthographicCamera();
 private light=new T.DirectionalLight(0xffdfae,3.1);private ambient=new T.HemisphereLight(0xc0d7e8,0xa28762,2.15);
 private raycaster=new T.Raycaster();private colliders:T.Mesh[]=[];private actors:Actor[]=[];
 private layout:ReturnType<typeof sceneLayout>;private overlay:HTMLDivElement;private labels:HTMLButtonElement[]=[];
 private bubbles:{el:HTMLButtonElement;actor:Actor;index:number}[]=[];private floorLabels:{el:HTMLElement;id:string}[]=[];
 private halo=new T.Group();private scroll:HTMLElement;private spacer:HTMLElement;private scale=20;private raf=0;private ro:ResizeObserver;
 private cleanups:(()=>void)[]=[];private time=0;private last=0;private lastPaint=0;private paused=false;private visible=true;
 private faultLights:T.Object3D[]=[];private visualKey='';private lastUpgrade=0;private speechSlot=-1;private speaker='';
 constructor(private host:HTMLElement,private store:Store){
  this.lastUpgrade=store.getState().game?.upgradeEffect?.id??0;this.layout=sceneLayout(store.getState());this.scroll=host.querySelector('.world-scroll')!;this.spacer=host.querySelector('.world-spacer')!;
  this.renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;
  this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.16;
  this.renderer.domElement.className='hotel-canvas';this.renderer.domElement.setAttribute('aria-hidden','true');host.prepend(this.renderer.domElement);
  this.overlay=document.createElement('div');this.overlay.className='world-labels';this.scroll.append(this.overlay);
  this.scene.add(this.root,this.light,this.ambient);this.light.castShadow=true;this.light.position.set(-7,23,16);this.light.target.position.set(0,9,-.4);this.scene.add(this.light.target);
  Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65});this.light.shadow.mapSize.set(2048,2048);this.light.shadow.bias=-.0005;this.light.shadow.normalBias=.018;
  this.build();this.visualKey=this.key(store.getState());this.scene.add(this.halo);this.bind();this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(host);this.resize();this.update(store.getState());
  this.cleanups.push(store.subscribe(s=>this.update(s)));this.raf=requestAnimationFrame(this.frame);
 }
 private build(){
  const s=this.store.getState();
  this.light.position.y=this.layout.height+5;this.light.target.position.y=this.layout.height/2;this.light.shadow.camera.top=this.layout.height/2+5;this.light.shadow.camera.bottom=-this.layout.height/2-5;this.light.shadow.camera.far=this.layout.height+45;this.light.shadow.camera.updateProjectionMatrix();
  // Cool city outside the section. It is real geometry, not a backdrop image.
  for(let i=0;i<18;i++){
   const x=-19+i*2.3,h=3+(Math.sin(i*7)+1)*3.3,z=-6-(i%3)*2.4;
   box(this.root,x,h/2-1,z,1.5,h,1.7,m.navy);
   for(let y=.4;y<h-1;y+=.55)for(let c=-.45;c<.6;c+=.45)if((i+Math.round(y*10)+Math.round(c*10))%3!==0)box(this.root,x+c,y,z+.87,.14,.24,.015,i%3===0?m.shade:m.window);
  }
  box(this.root,0,-.32,0,30,.35,15,m.navy);box(this.root,0,-.13,.7,17.6,.16,5.3,m.stone);box(this.root,0,-.06,2.95,17,.09,.55,m.stone);
  for(const x of [-8.1,8.4])plant(this.root,x,1,2);
  s.floors.forEach(floor=>{
   const y=this.layout.floorY.get(floor.id)!;const fg=new T.Group();fg.name=floor.id;fg.position.y=y;this.root.add(fg);
   if(floor.role!=='rooftop'){
    box(fg,0,-.085,0,15.05,.19,3.48,m.stone);box(fg,0,-.12,1.77,15.2,.17,.19,m.navy);box(fg,0,-.011,1.85,15.1,.025,.02,m.gold);
    box(fg,0,2.405,-.02,15.05,.18,3.4,m.stone);
    for(const x of [-7.43,7.43])box(fg,x,1.19,.18,.18,2.38,3.12,m.stone);
    // Glazed lift tower, coherent across every floor.
    box(fg,7.94,1.19,-.24,.87,2.38,2.1,m.window);for(const x of [7.52,8.35])box(fg,x,1.2,.84,.045,2.4,.06,m.gold);
    box(fg,7.94,-.075,.1,.95,.19,2.85,m.navy);box(fg,7.94,1.2,.87,.83,.025,.035,m.gold);
   }
   floor.entityIds.forEach(id=>{
    const e=s.entities[id],a=this.layout.entities.find(a=>a.id===id)!;
    const eg=e.kind==='room'?roomFactory(floor.construction?{...e,construction:floor.construction}:e):facilityFactory(e.role,e.level??1,e.role==='breakfast'?s.game?.stock??100:e.role==='club'?s.game?.clubStock??100:100,!!e.construction);if(e.kind==='facility'&&(e.level??1)>1){for(let i=1;i<(e.level??1);i++)plant(eg,-6.8+i*.45,-.95,.5+i*.1);}eg.name=id;eg.userData.entityId=id;eg.position.x=a.position.x;fg.add(eg);
    const collider=createEntityCollider(id,e.kind==='room'?4.65:14.6,floor.role==='rooftop'?2.1:2.3);eg.add(collider);this.colliders.push(collider);
    if(e.kind==='room'){
     const b=document.createElement('button');b.className='room-label status-'+e.status+(e.status==='maintenance'&&!e.construction?' fault':'')+(e.suaBookingId?' sua':'');b.textContent=floor.construction?'施工':e.suaBookingId?e.number+' SUA':e.status==='unbuilt'?'＋':e.number;b.dataset.entityId=id;b.setAttribute('aria-label',e.number+' 房间');b.onclick=()=>this.store.select(id);this.labels.push(b);this.overlay.append(b);
    }else{
     const b=document.createElement('button');b.className='facility-label'+((e.role==='breakfast'&&(s.game?.stock??1)<=0||e.role==='club'&&(s.game?.clubStock??1)<=0)?' shortage':'');b.dataset.entityId=id;b.textContent=e.name+(e.construction?' · 施工中':e.role==='breakfast'&&(s.game?.stock??1)<=0?' · 缺货':e.role==='club'&&(s.game?.clubStock??1)<=0?' · 断菜':'');b.setAttribute('aria-label','查看'+e.name);b.onclick=()=>this.store.select(id);this.labels.push(b);this.overlay.append(b);
    }
   });
   const l=document.createElement('div');l.className='floor-marker';l.innerHTML=`<strong>${floor.label}</strong><span>${floor.name}</span>`;this.overlay.append(l);this.floorLabels.push({el:l,id:floor.id});
  });
  batchStatic(this.root);this.faultLights=[];this.root.traverse(o=>{if(o.name==='fault-lamp')this.faultLights.push(o);});
  const brand=document.createElement('div');brand.className='lobby-sign';brand.innerHTML='<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>';brand.dataset.anchor='brand';this.overlay.append(brand);
  const topBrand=document.createElement('div');topBrand.className='roof-sign';topBrand.textContent='HYATT PLACE';topBrand.dataset.anchor='roof';this.overlay.append(topBrand);
  const selectMat=new T.MeshBasicMaterial({color:0xffd78d,transparent:true,opacity:.9,depthTest:false});
  box(this.halo,0,0,0,4.7,.025,.025,selectMat);box(this.halo,0,2.31,0,4.7,.025,.025,selectMat);box(this.halo,-2.35,1.15,0,.025,2.31,.025,selectMat);box(this.halo,2.35,1.15,0,.025,2.31,.025,selectMat);this.halo.visible=false;
 }
 private bind(){
  const scroll=()=>this.resizeCamera();this.scroll.addEventListener('scroll',scroll,{passive:true});this.cleanups.push(()=>this.scroll.removeEventListener('scroll',scroll));
  let down={x:0,y:0};const pd=(e:PointerEvent)=>{down={x:e.clientX,y:e.clientY};};
  const up=(e:PointerEvent)=>{if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>9||(e.target as HTMLElement).closest('button'))return;
   const rect=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),this.camera);
   const id=pickEntity(this.raycaster,this.colliders);if(id)this.store.select(id);
  };
  this.scroll.addEventListener('pointerdown',pd);this.scroll.addEventListener('pointerup',up);this.cleanups.push(()=>{this.scroll.removeEventListener('pointerdown',pd);this.scroll.removeEventListener('pointerup',up)});
  const vis=()=>{this.visible=!document.hidden;this.last=0;};document.addEventListener('visibilitychange',vis);this.cleanups.push(()=>document.removeEventListener('visibilitychange',vis));
  const lost=(e:Event)=>{e.preventDefault();this.paused=true;this.host.dispatchEvent(new CustomEvent('world-error',{detail:'画面连接中断，请重新载入恢复。'}));};
  this.renderer.domElement.addEventListener('webglcontextlost',lost);this.cleanups.push(()=>this.renderer.domElement.removeEventListener('webglcontextlost',lost));
 }
 private resize(){const w=this.host.clientWidth,h=this.host.clientHeight;if(w===0||h===0)return;this.scale=w/19.4;this.renderer.setSize(w,h);this.spacer.style.height=Math.max(h,this.layout.height*this.scale+30)+'px';this.resizeCamera();}
 private resizeCamera(){const w=this.host.clientWidth,h=this.host.clientHeight,worldHeight=h/this.scale;const full=parseFloat(this.spacer.style.height)/this.scale;
  const center=full-worldHeight/2-this.scroll.scrollTop/this.scale-.85;
  this.camera.left=-w/this.scale/2;this.camera.right=w/this.scale/2;this.camera.top=worldHeight/2;this.camera.bottom=-worldHeight/2;this.camera.near=.1;this.camera.far=180;
  this.camera.position.set(3.4,center+6.4,46);this.camera.lookAt(-.3,center,0);this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();this.placeLabels();
 }
 private project(v:T.Vector3){const p=v.clone().project(this.camera);return{x:(p.x+1)*this.host.clientWidth/2,y:(1-p.y)*this.host.clientHeight/2};}
 private position(el:HTMLElement,v:T.Vector3){const p=this.project(v);el.style.transform=`translate(${p.x}px,${p.y+this.scroll.scrollTop}px)`;el.hidden=p.y < -30||p.y>this.host.clientHeight+30;}
 private placeLabels(){
  this.labels.forEach(el=>{const a=this.layout.entities.find(a=>a.id===el.dataset.entityId)!;this.position(el,a.label);});
  this.floorLabels.forEach(({el,id})=>this.position(el,new T.Vector3(-8.57,this.layout.floorY.get(id)!+1.34,1.8)));
  const b=this.overlay.querySelector<HTMLElement>('[data-anchor=brand]');if(b)this.position(b,new T.Vector3(-1.55,1.85,-1.13));
  const r=this.overlay.querySelector<HTMLElement>('[data-anchor=roof]');if(r)this.position(r,new T.Vector3(3.2,this.layout.height-.85,-.9));
 }
 private update(s:Readonly<PreviewState>){
  const key=this.key(s);if(key!==this.visualKey){this.visualKey=key;this.root.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});this.scene.remove(this.root);this.colliders.forEach(c=>{c.geometry.dispose();(c.material as T.Material).dispose();});this.colliders=[];this.labels=[];this.floorLabels=[];this.overlay.replaceChildren();this.halo.clear();this.root=new T.Group();this.scene.add(this.root);
 const oldFloorIds=[...this.layout.floorY.keys()];const rebase=(p:T.Vector3)=>{const index=Math.floor((p.y-.07)/FLOOR_HEIGHT+.00001),id=oldFloorIds[index],next=s.floors.findIndex(f=>f.id===id);if(next>=0)p.y+=(next-index)*FLOOR_HEIGHT;};
 this.actors.forEach(a=>{rebase(a.group.position);a.navigation?.points.forEach(rebase);});this.layout=sceneLayout(s);this.build();this.bubbles.forEach(b=>this.overlay.append(b.el));this.resize();}
  this.syncGuests(s);
  const effect=s.game?.upgradeEffect;if(effect&&effect.id!==this.lastUpgrade){this.lastUpgrade=effect.id;const label=this.labels.find(b=>b.dataset.entityId===effect.entityId);if(label){const entity=s.entities[effect.entityId],floor=s.floors.find(f=>f.id===entity.floorId);label.dataset.feedback=entity.construction||floor?.construction?'施工开始':'竣工开放';label.classList.add('upgraded');setTimeout(()=>label.classList.remove('upgraded'),3500);}}

  this.host.dataset.atmosphere=s.atmosphere;this.light.intensity=s.atmosphere==='night'?1.65:s.atmosphere==='day'?3.6:2.6;this.ambient.intensity=s.atmosphere==='night'?1.35:s.atmosphere==='day'?2.7:2.1;
  this.ambient.color.setHex(s.atmosphere==='night'?0x6b99c1:0xbdd5ed);
  this.labels.forEach(b=>{const selected=b.dataset.entityId===s.selectedId;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
  const a=this.layout.entities.find(a=>a.id===(s.selectedId??s.game?.events[0]?.target));this.halo.visible=!!a;if(a){const e=s.entities[a.id];this.halo.scale.x=e.kind==='room'?1:3.1;this.halo.position.set(a.position.x,a.position.y,2.05);}
 }
 private key(s:Readonly<PreviewState>){return s.floors.map(f=>f.id+':'+!!f.construction).join(',')+'|'+((s.game?.stock??1)>0)+':'+((s.game?.clubStock??1)>0)+'|'+Object.values(s.entities).map(e=>e.kind==='room'?e.status+':'+e.level+':'+e.category+':'+e.bed+':'+!!e.construction+':'+!!e.suaBookingId+':'+!!e.extraBed:(e.level??1)+':'+!!e.construction).join(',');}
 private syncGuests(s:Readonly<PreviewState>){
  for(const a of [...this.actors])if(!s.guests.some(g=>g.id===a.guestId)){a.group.removeFromParent();this.actors=this.actors.filter(x=>x!==a);this.bubbles.filter(b=>b.actor===a).forEach(b=>b.el.remove());this.bubbles=this.bubbles.filter(b=>b.actor!==a);}
  for(const g of s.guests){let a=this.actors.find(a=>a.guestId===g.id);if(!a){const parts=actorFactory(g.color,g.persona,g.staffRole);a={...parts,guestId:g.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:true,thought:g.thought};this.scene.add(a.group);this.actors.push(a);const el=document.createElement('button');el.className='thought';el.onclick=()=>this.store.select(g.roomId??'facility-lobby');this.overlay.append(el);this.bubbles.push({el,actor:a,index:this.actors.length});}
   a.start=g.route[0];a.end=g.route[1];a.z=g.z??1.12;a.floorY=(this.layout.floorY.get(g.floorId)??0)+.07;a.walking=a.start!==a.end;a.thought=g.thought;
   if(g.movement){const m=g.movement;
    if(!a.navigation){const p=m.trail[0]??m.position;a.group.position.set(p.x,p.level*FLOOR_HEIGHT+.07,p.z);}
    if(a.navigation?.revision!==m.revision){const points=(m.trail.length?m.trail:[m.position]).map(p=>new T.Vector3(p.x,p.level*FLOOR_HEIGHT+.07,p.z));
     // Finish any unpainted route before consuming a newer tick; never cut across a wall.
     if(a.navigation&&a.navigation.elapsed<a.navigation.duration){const n=a.navigation,cursor=n.elapsed/n.duration*(n.points.length-1);points.unshift(...n.points.slice(Math.floor(cursor)+1));}
     points.unshift(a.group.position.clone());a.navigation={revision:m.revision,points,elapsed:0,duration:1};
    }
   }
const b=this.bubbles.find(b=>b.actor===a);if(b){b.el.textContent=g.thought;b.el.setAttribute('aria-label','住客想法：'+g.thought);}
  }
 }
 focusFloor(id:string){const y=this.layout.floorY.get(id);if(y===undefined)return;const full=parseFloat(this.spacer.style.height);const target=full-(y+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,target),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 private frame=(now:number)=>{
  this.raf=requestAnimationFrame(this.frame);if(this.paused||!this.visible)return;
  const dt=this.last?Math.min((now-this.last)/1000,.05):0;this.last=now;this.time+=dt*this.store.getState().speed;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.actors.forEach(a=>moveActor(a,reduced?0:this.time,dt));
  if(now-this.lastPaint>90){this.lastPaint=now;const state=this.store.getState(),slot=Math.floor(now/8000);
   const eligible=this.bubbles.filter(({actor})=>{const guest=state.guests.find(g=>g.id===actor.guestId),p=this.project(actor.group.position);return !!actor.thought&&guest?.movement?.position.phase!=='elevator'&&actor.group.position.x<7.2&&p.y>20&&p.y<this.host.clientHeight-25;});
   if(slot!==this.speechSlot){this.speechSlot=slot;this.speaker=eligible.length?eligible[slot%eligible.length].actor.guestId??'':'';}
   this.bubbles.forEach(({el,actor})=>{const active=now%8000<4200&&actor.guestId===this.speaker&&eligible.some(b=>b.actor===actor);el.style.display=active?'block':'none';if(active){const p=this.project(actor.group.position.clone().add(new T.Vector3(-.6,1.25,0)));el.hidden=false;const x=Math.max(6,Math.min(this.host.clientWidth-el.offsetWidth-6,p.x)),y=Math.max(6,Math.min(this.host.clientHeight-el.offsetHeight-6,p.y));el.style.transform=`translate(${x}px,${y+this.scroll.scrollTop}px)`;}});
  }
  this.faultLights.forEach(light=>{light.visible=Math.sin(now/140)>-.2;});
  this.renderer.render(this.scene,this.camera);
 };
 dispose(){cancelAnimationFrame(this.raf);this.ro.disconnect();this.cleanups.forEach(fn=>fn());this.renderer.dispose();this.colliders.forEach(c=>{c.geometry.dispose();(c.material as T.Material).dispose()});Object.values(geometries).forEach(g=>g.dispose());disposeMaterials();this.overlay.remove();}
}
