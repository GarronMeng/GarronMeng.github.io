import type {Persona} from '../state/types';
import * as T from 'three';
import {box,cyl,orb,shadow} from './primitives';
import {materials as m,colorMaterial} from './materials';
export interface Actor {group:T.Group;left:T.Group;right:T.Group;start:number;end:number;floorY:number;z:number;phase:number;walking:boolean;thought:string;guestId?:string;navigation?:{revision:number;points:T.Vector3[];elapsed:number;duration:number};}
export function actorFactory(color:number,persona?:Persona):{group:T.Group;left:T.Group;right:T.Group}{
 const group=new T.Group();const palette:Record<Persona,number>={chill:0x98a989,road:0x213d57,family:0xd39452,points:0x507a77,hunter:0x674666,forum:0x66759b,creator:0xe4d6b4,proposal:0x752b3e,planner:0x35575b,whale:0xb9a287,auditplus:0x454a50};const suit=colorMaterial(persona?palette[persona]:color);
 const leg=(x:number)=>{const g=new T.Group();g.position.set(x,.31,0);group.add(g);box(g,0,-.11,0,.085,.26,.1,m.navy);box(g,0,-.245,.035,.11,.07,.17,m.black);return g;};
 const left=leg(-.08),right=leg(.08);
 box(group,0,.47,0,.27,.34,.17,suit);box(group,0,.58,.093,.07,.13,.012,m.white);if(!['chill','family','points','forum','creator'].includes(persona??''))box(group,0,.55,.108,.018,.095,.016,m.navy);
 orb(group,0,.81,0,.185,.21,.16,m.skin);orb(group,0,.94,-.024,.193,.102,.163,m.hair);
 for(const x of [-.069,.069]){orb(group,x,.84,.149,.021,.024,.01,m.black);if(!persona||['points','forum','auditplus','hunter'].includes(persona))box(group,x,.856,.156,.09,.066,.012,m.navy);}
 for(const side of [-1,1]){const a=box(group,side*.18,.45,0,.075,.26,.085,suit);a.rotation.z=side*.15;orb(group,side*.19,.303,.012,.047,.05,.045,m.skin);}
 // Silhouette and carried objects distinguish guests without floating role labels.
 if(persona==='chill'){cyl(group,0,1.0,0,.23,.06,m.white);cyl(group,0,1.06,0,.16,.1,m.white);}
 if(persona==='road'){box(group,.29,.25,.04,.22,.3,.15,m.walnut);box(group,.29,.44,.04,.12,.035,.05,m.gold);}
 if(persona==='family'){box(group,0,.46,-.17,.3,.34,.17,m.rust);box(group,.27,.38,.05,.07,.2,.07,m.teal);}
 if(persona==='points'){box(group,-.26,.4,.09,.15,.23,.025,m.white);box(group,-.26,.44,.11,.11,.04,.01,m.teal);}
 if(persona==='hunter'){box(group,.24,.48,.12,.1,.18,.025,m.black);box(group,.24,.49,.138,.07,.12,.01,m.screen);}
 if(persona==='forum'){orb(group,0,1.01,-.01,.21,.07,.18,m.navy);box(group,0,.99,.17,.2,.025,.16,m.navy);box(group,-.25,.42,.08,.15,.23,.04,m.black);}
 if(persona==='creator'){box(group,0,.5,.16,.2,.13,.12,m.black);const lens=cyl(group,0,.5,.26,.065,.1,m.black);lens.rotation.x=Math.PI/2;box(group,0,.63,.13,.025,.18,.02,m.walnut);}
 if(persona==='proposal'){for(const x of [-.07,0,.07]){orb(group,x+.23,.49,.08,.065,.08,.065,m.rust);box(group,x+.23,.35,.08,.015,.21,.015,m.green);}}
 if(persona==='planner'){box(group,-.24,.47,.08,.19,.27,.04,m.teal);box(group,0,.54,.12,.08,.11,.015,m.white);}
 if(persona==='whale'){box(group,0,.59,.12,.04,.09,.025,m.gold);box(group,.2,.36,.055,.08,.04,.09,m.gold);orb(group,0,.96,-.04,.2,.075,.18,m.hair);}
 if(persona==='auditplus'){box(group,-.24,.47,.09,.19,.26,.04,m.walnut);box(group,-.24,.49,.12,.14,.19,.012,m.white);box(group,.23,.45,.09,.012,.17,.012,m.gold);}
 shadow(group,0,0,.47,.3);
 return {group,left,right};
}
export function moveActor(a:Actor,t:number,dt=0){
 if(a.navigation){const n=a.navigation;n.elapsed=Math.min(n.duration,n.elapsed+dt);const cursor=n.duration?n.elapsed/n.duration*(n.points.length-1):n.points.length-1,index=Math.min(n.points.length-1,Math.floor(cursor)),from=n.points[index],to=n.points[Math.min(index+1,n.points.length-1)];
  const previous=a.group.position.clone();a.group.position.lerpVectors(from,to,cursor-index);const dx=a.group.position.x-previous.x,dz=a.group.position.z-previous.z;const walking=Math.hypot(dx,dz)>.0001;
  if(walking)a.group.rotation.y=Math.atan2(dx,dz);const swing=walking?Math.sin(t*7+a.phase)*.28:0;a.left.rotation.x=swing;a.right.rotation.x=-swing;return;
 }
const span=a.end-a.start;const u=(Math.sin(t*.28+a.phase)+1)/2;const x=a.walking?a.start+u*span:a.start;a.group.position.set(x,a.floorY+(a.walking?Math.abs(Math.sin(t*3.5+a.phase))*.018:0),a.z);a.group.rotation.y=a.walking?(Math.cos(t*.28+a.phase)>0?.32:-.32):0;const v=a.walking?Math.sin(t*4+a.phase)*.32:0;a.left.rotation.x=v;a.right.rotation.x=-v;}
