import {roomTier,roomBed,isSuite} from '../content/roomTypes';
import * as T from 'three';
import {box,cyl,plant,lamp,sofa,chair,artwork,table,shadow} from './primitives';
import {materials as m} from './materials';
import type {Room} from '../state/types';
export function roomFactory(room:Room):T.Group {
 const level=room.level??1;const g=new T.Group();g.name=room.id;g.userData.entityId=room.id;
 box(g,0,.04,0,4.7,.08,3.1,level>=4?m.stone:level>=2?m.walnut:m.wood);
 // Shared architectural boundaries; soft wall panels and a glazed rear bay.
 box(g,0,1.19,-1.51,4.7,2.38,.14,m.wall);
 box(g,2.35,1.14,-.1,.1,2.28,2.75,m.stone);
 box(g,1.6,1.25,-1.41,1.05,1.9,.035,m.window);
 for(const x of [1.1,1.6,2.1])box(g,x,1.25,-1.35,.035,1.94,.04,m.gold);
 box(g,1.6,1.25,-1.35,1.08,.04,.04,m.gold);
 for(let x=1.03;x<1.26;x+=.06)box(g,x,1.28,-1.23,.04,1.94,.13,m.white);
 box(g,0,2.27,-1.27,4.53,.06,.065,m.glow);
 if(room.construction){for(const x of [-1.8,0,1.8]){box(g,x,1.05,1.5,.07,2.1,.07,m.gold);box(g,x,.4,.4,.65,.7,.7,m.stone);}for(const y of [.5,1.4,2.15])box(g,0,y,1.5,4.5,.06,.06,m.gold);box(g,0,.8,1.55,4.5,.48,.06,m.navy);return g;}
 if(room.status==='unbuilt'){box(g,0,.12,0,3.8,.08,2.5,m.stone);return g;}
 const suite=isSuite(room),twin=roomBed(room)==='twin';
 box(g,-.67,.078,.07,2.85,.02,2.66,m.carpet);
 const bed=(x:number,w:number)=>{
  box(g,x,.28,-.03,w+.09,.39,1.9,m.walnut);
  box(g,x,.51,.02,w,.23,1.85,room.status==='dirty'?m.stone:m.white);
  box(g,x,.7,-.98,w+.13,1.22,.12,m.walnut);
  box(g,x,.82,-.89,w-.05,.63,.08,m.teal);
  box(g,x,.67,-.58,w*.82,.13,.36,m.white);if(level>=2){box(g,x,.78,-.72,w*.78,.12,.25,m.white);box(g,x,.655,.18,w,.045,.45,level>=4?m.white:m.teal);}
  box(g,x,.646,.54,w,.075,.39,level>=4?m.gold:suite?m.rust:m.teal);
  box(g,x,.49,1,w,.28,.04,m.white);shadow(g,x,0,w+.25,2.25);
 };
 if(twin){bed(-1.36,.88);bed(-.22,.88);}else bed(-.75,1.68);
 for(const x of [-1.94,.43]){box(g,x,.35,-.76,.41,.58,.5,m.walnut);box(g,x,.66,-.76,.45,.06,.53,m.stone);lamp(g,x,.69,-.77,.8);}
 artwork(g,-.75,1.79,-1.39,1.25,.54,Number(room.number));
 if(level>=4){box(g,1.65,.38,-.4,.9,.65,.85,m.stone);box(g,1.65,.73,-.4,.85,.08,.8,m.white);cyl(g,1.65,.83,-.65,.025,.22,m.gold);box(g,2.16,1.25,-.35,.025,1.8,1.5,m.glass);box(g,1.6,1.93,-1.14,.3,.04,.25,m.gold);artwork(g,1.5,1.6,-1.33,.8,.5,level);sofa(g,1.58,.76,-Math.PI/2,.75,m.white);}
 else if(suite){sofa(g,1.55,.22,-Math.PI/2,1.3,m.rust);table(g,.97,.8,.25);}else{
  box(g,1.61,.76,-.57,1.1,.1,.57,m.walnut);for(const x of [1.19,2.03])box(g,x,.37,-.57,.05,.75,.46,m.gold);
  box(g,1.59,.94,-.64,.35,.28,.04,m.screen);chair(g,1.65,.06,Math.PI);lamp(g,2,.82,-.62,.66);
 }
 if(roomTier(room)==='view'||roomTier(room)==='premium'){box(g,0,1.45,-1.4,4.15,1.65,.025,m.window);for(const x of [-2,0,2])box(g,x,1.45,-1.35,.045,1.7,.045,m.gold);}
 if(roomTier(room)==='premium'){box(g,0,2.1,-1.25,4.5,.08,.08,m.gold);artwork(g,-1.6,1.8,-1.3,.8,.4,99);plant(g,1.95,.55,1.15);}
 if(room.extraBed){box(g,.5,.25,1.02,.8,.3,.8,m.walnut);box(g,.5,.43,1.02,.8,.08,.8,m.white);}
 plant(g,2.05,1.05,.63);
 if((room.level??1)>1){artwork(g,-2.05,1.6,-1.38,.38,.56,room.level);plant(g,-2.05,.35,.55);}
 if(level>=3){lamp(g,-1.94,1.25,-.9,1.1);box(g,-.75,1.62,-1.25,2.1,.025,.03,m.glow);}
 if(level>=5){box(g,0,1.4,-1.42,4.3,1.9,.025,m.window);for(const x of [-2,-.8,.8,2])box(g,x,1.4,-1.35,.04,1.95,.06,m.gold);for(const x of [-1.8,0,1.8])box(g,x,.09,.15,.025,.02,2.9,m.gold);for(const y of [2.12,2.24])box(g,0,y,-1.1,4.5,.035,.035,m.glow);}
 if((room.level??1)>2)box(g,0,2.12,-1.3,4.55,.035,.055,m.gold);
 box(g,-2.12,.52,.95,.22,1,.28,m.walnut); // luggage rack
 if(room.status==='reserved'){if(room.suaBookingId)box(g,0,1.1,1.62,.38,.5,.05,m.rust);box(g,1.2,.48,1.48,.25,.29,.1,m.gold);}
 if(room.status==='cleaning'){
  box(g,1.05,.37,1.57,.55,.55,.35,m.navy);for(const x of [.83,1.27])cyl(g,x,.09,1.57,.07,.07,m.black);
  box(g,1.05,.71,1.57,.6,.04,.41,m.gold);box(g,.95,.79,1.57,.3,.12,.22,m.white);
 }
 if(room.status==='occupied')box(g,0,2.23,.7,3.8,.035,.035,m.shade);
 if(room.status==='maintenance'){const fault=box(g,.9,1.95,1.55,.17,.17,.08,m.glow);fault.name='fault-lamp';fault.userData.interactive=true;box(g,.6,.33,.9,.8,.1,.8,m.rust);box(g,.6,.52,.9,.1,.6,.1,m.gold);}
 return g;
}
