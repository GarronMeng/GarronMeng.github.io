import * as T from 'three';
import {box,cyl,plant,lamp,sofa,chair,artwork,table,shadow} from './primitives';
import {materials as m} from './materials';
import type {Room} from '../state/types';
export function roomFactory(room:Room):T.Group {
 const g=new T.Group();g.name=room.id;g.userData.entityId=room.id;
 box(g,0,.04,0,4.7,.08,3.1,m.wood);
 // Shared architectural boundaries; soft wall panels and a glazed rear bay.
 box(g,0,1.19,-1.51,4.7,2.38,.14,m.wall);
 box(g,2.35,1.14,-.1,.1,2.28,2.75,m.stone);
 box(g,1.6,1.25,-1.41,1.05,1.9,.035,m.window);
 for(const x of [1.1,1.6,2.1])box(g,x,1.25,-1.35,.035,1.94,.04,m.gold);
 box(g,1.6,1.25,-1.35,1.08,.04,.04,m.gold);
 for(let x=1.03;x<1.26;x+=.06)box(g,x,1.28,-1.23,.04,1.94,.13,m.white);
 box(g,0,2.27,-1.27,4.53,.06,.065,m.glow);
 if(room.status==='unbuilt'){for(const x of [-1.3,0,1.3])box(g,x,.28,.1,.75,.5,.8,m.stone);return g;}
 const suite=room.type==='suite',twin=room.type==='twin';
 box(g,-.67,.078,.07,2.85,.02,2.66,m.carpet);
 const bed=(x:number,w:number)=>{
  box(g,x,.28,-.03,w+.09,.39,1.9,m.walnut);
  box(g,x,.51,.02,w,.23,1.85,room.status==='dirty'?m.stone:m.white);
  box(g,x,.7,-.98,w+.13,1.22,.12,m.walnut);
  box(g,x,.82,-.89,w-.05,.63,.08,m.teal);
  box(g,x,.67,-.58,w*.82,.13,.36,m.white);
  box(g,x,.646,.54,w,.075,.39,suite?m.rust:m.teal);
  box(g,x,.49,1,w,.28,.04,m.white);shadow(g,x,0,w+.25,2.25);
 };
 if(twin){bed(-1.36,.88);bed(-.22,.88);}else bed(-.75,1.68);
 for(const x of [-1.94,.43]){box(g,x,.35,-.76,.41,.58,.5,m.walnut);box(g,x,.66,-.76,.45,.06,.53,m.stone);lamp(g,x,.69,-.77,.8);}
 artwork(g,-.75,1.79,-1.39,1.25,.54,Number(room.number));
 if(suite){sofa(g,1.55,.22,-Math.PI/2,1.3,m.rust);table(g,.97,.8,.25);}else{
  box(g,1.61,.76,-.57,1.1,.1,.57,m.walnut);for(const x of [1.19,2.03])box(g,x,.37,-.57,.05,.75,.46,m.gold);
  box(g,1.59,.94,-.64,.35,.28,.04,m.screen);chair(g,1.65,.06,Math.PI);lamp(g,2,.82,-.62,.66);
 }
 plant(g,2.05,1.05,.63);
 box(g,-2.12,.52,.95,.22,1,.28,m.walnut); // luggage rack
 if(room.status==='reserved'){box(g,1.2,.48,1.48,.25,.29,.1,m.gold);}
 if(room.status==='cleaning'){
  box(g,1.05,.37,1.57,.55,.55,.35,m.navy);for(const x of [.83,1.27])cyl(g,x,.09,1.57,.07,.07,m.black);
  box(g,1.05,.71,1.57,.6,.04,.41,m.gold);box(g,.95,.79,1.57,.3,.12,.22,m.white);
 }
 if(room.status==='maintenance'){box(g,.6,.33,.9,.8,.1,.8,m.rust);box(g,.6,.52,.9,.1,.6,.1,m.gold);}
 return g;
}
