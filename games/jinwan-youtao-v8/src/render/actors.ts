import * as T from 'three';
import {box,cyl,orb,shadow} from './primitives';
import {materials as m,colorMaterial} from './materials';
export interface Actor {group:T.Group;left:T.Group;right:T.Group;start:number;end:number;floorY:number;z:number;phase:number;walking:boolean;thought:string;}
export function actorFactory(color:number):{group:T.Group;left:T.Group;right:T.Group}{
 const group=new T.Group();const suit=colorMaterial(color);
 const leg=(x:number)=>{const g=new T.Group();g.position.set(x,.31,0);group.add(g);box(g,0,-.11,0,.085,.26,.1,m.navy);box(g,0,-.245,.035,.11,.07,.17,m.black);return g;};
 const left=leg(-.08),right=leg(.08);
 box(group,0,.47,0,.27,.34,.17,suit);box(group,0,.58,.093,.07,.13,.012,m.white);box(group,0,.55,.108,.018,.095,.016,m.navy);
 orb(group,0,.81,0,.185,.21,.16,m.skin);orb(group,0,.94,-.024,.193,.102,.163,m.hair);
 for(const x of [-.069,.069]){orb(group,x,.84,.149,.021,.024,.01,m.black);box(group,x,.856,.156,.09,.066,.012,m.navy);}
 for(const side of [-1,1]){const a=box(group,side*.18,.45,0,.075,.26,.085,suit);a.rotation.z=side*.15;orb(group,side*.19,.303,.012,.047,.05,.045,m.skin);}
 shadow(group,0,0,.47,.3);
 return {group,left,right};
}
export function moveActor(a:Actor,t:number){const span=a.end-a.start;const u=(Math.sin(t*.28+a.phase)+1)/2;const x=a.walking?a.start+u*span:a.start;a.group.position.set(x,a.floorY+(a.walking?Math.abs(Math.sin(t*3.5+a.phase))*.018:0),a.z);a.group.rotation.y=a.walking?(Math.cos(t*.28+a.phase)>0?.32:-.32):0;const v=a.walking?Math.sin(t*4+a.phase)*.32:0;a.left.rotation.x=v;a.right.rotation.x=-v;}
