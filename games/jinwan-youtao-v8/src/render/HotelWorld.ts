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
 constructor(private host:HTMLElement,private store:Store){
  this.layout=sceneLayout(store.getState());this.scroll=host.querySelector('.world-scroll')!;this.spacer=host.querySelector('.world-spacer')!;
  this.renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;
  this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.16;
  this.renderer.domElement.className='hotel-canvas';this.renderer.domElement.setAttribute('aria-hidden','true');host.prepend(this.renderer.domElement);
  this.overlay=document.createElement('div');this.overlay.className='world-labels';this.scroll.append(this.overlay);
  this.scene.add(this.root,this.light,this.ambient);this.light.castShadow=true;this.light.position.set(-7,23,16);this.light.target.position.set(0,9,-.4);this.scene.add(this.light.target);
  Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65});this.light.shadow.mapSize.set(2048,2048);this.light.shadow.bias=-.0005;this.light.shadow.normalBias=.018;
  this.build();this.scene.add(this.halo);this.bind();this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(host);this.resize();this.update(store.getState());
  this.cleanups.push(store.subscribe(s=>this.update(s)));this.raf=requestAnimationFrame(this.frame);
 }
 private build(){
  const s=this.store.getState();
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
    const eg=e.kind==='room'?roomFactory(e):facilityFactory(e.role);eg.name=id;eg.userData.entityId=id;eg.position.x=a.position.x;fg.add(eg);
    const collider=createEntityCollider(id,e.kind==='room'?4.65:14.6,floor.role==='rooftop'?2.1:2.3);eg.add(collider);this.colliders.push(collider);
    if(e.kind==='room'){
     const b=document.createElement('button');b.className='room-label status-'+e.status;b.textContent=e.number;b.dataset.entityId=id;b.setAttribute('aria-label',e.number+' 房间');b.onclick=()=>this.store.select(id);this.labels.push(b);this.overlay.append(b);
    }else{
     const b=document.createElement('button');b.className='facility-label';b.dataset.entityId=id;b.textContent=e.name;b.setAttribute('aria-label','查看'+e.name);b.onclick=()=>this.store.select(id);this.labels.push(b);this.overlay.append(b);
    }
   });
   const l=document.createElement('div');l.className='floor-marker';l.innerHTML=`<strong>${floor.label}</strong><span>${floor.name}</span>`;this.overlay.append(l);this.floorLabels.push({el:l,id:floor.id});
  });
  batchStatic(this.root);
  const brand=document.createElement('div');brand.className='lobby-sign';brand.innerHTML='<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>';brand.dataset.anchor='brand';this.overlay.append(brand);
  const topBrand=document.createElement('div');topBrand.className='roof-sign';topBrand.textContent='HYATT PLACE';topBrand.dataset.anchor='roof';this.overlay.append(topBrand);
  const add=(floorId:string,start:number,end:number,z:number,color:number,thought:string,walking=true)=>{
   const y=this.layout.floorY.get(floorId);if(y===undefined)return;
   const a=actorFactory(color);const actor:Actor={...a,start,end,z,floorY:y+.07,phase:this.actors.length*1.618,walking,thought};this.scene.add(a.group);this.actors.push(actor);
   const bubble=document.createElement('button');bubble.className='thought';bubble.textContent=thought;bubble.setAttribute('aria-label','住客想法：'+thought);bubble.onclick=()=>{const id=this.store.getState().floors.find(f=>f.id===floorId)?.entityIds[0];if(id)this.store.select(id);};this.overlay.append(bubble);this.bubbles.push({el:bubble,actor,index:this.actors.length});
  };
  s.guests.forEach(g=>add(g.floorId,g.route[0],g.route[1],g.z??1.12,g.color,g.thought,g.route[0]!==g.route[1]));
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
  this.host.dataset.atmosphere=s.atmosphere;this.light.intensity=s.atmosphere==='night'?1.65:s.atmosphere==='day'?3.6:2.6;this.ambient.intensity=s.atmosphere==='night'?1.35:s.atmosphere==='day'?2.7:2.1;
  this.ambient.color.setHex(s.atmosphere==='night'?0x6b99c1:0xbdd5ed);
  this.labels.forEach(b=>{const selected=b.dataset.entityId===s.selectedId;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
  const a=this.layout.entities.find(a=>a.id===s.selectedId);this.halo.visible=!!a;if(a){const e=s.entities[a.id];this.halo.scale.x=e.kind==='room'?1:3.1;this.halo.position.set(a.position.x,a.position.y,2.05);}
 }
 focusFloor(id:string){const y=this.layout.floorY.get(id);if(y===undefined)return;const full=parseFloat(this.spacer.style.height);const target=full-(y+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,target),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 private frame=(now:number)=>{
  this.raf=requestAnimationFrame(this.frame);if(this.paused||!this.visible)return;
  const dt=this.last?Math.min((now-this.last)/1000,.05):0;this.last=now;this.time+=dt*this.store.getState().speed;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.actors.forEach(a=>moveActor(a,reduced?0:this.time));
  if(now-this.lastPaint>90){this.lastPaint=now;this.bubbles.forEach(({el,actor,index})=>{
   const active=(Math.floor(this.time/5)+index)%7===0;el.style.display=active?'block':'none';if(active)this.position(el,actor.group.position.clone().add(new T.Vector3(-.6,1.25,0)));
  });}
  this.renderer.render(this.scene,this.camera);
 };
 dispose(){cancelAnimationFrame(this.raf);this.ro.disconnect();this.cleanups.forEach(fn=>fn());this.renderer.dispose();this.colliders.forEach(c=>{c.geometry.dispose();(c.material as T.Material).dispose()});Object.values(geometries).forEach(g=>g.dispose());disposeMaterials();this.overlay.remove();}
}
