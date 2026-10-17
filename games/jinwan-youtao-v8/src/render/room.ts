import {roomTier,roomBed,isSuite} from '../content/roomTypes';
import * as T from 'three';
import {box,roundBox,cyl,plant,lamp,sofa,chair,artwork,table,shadow} from './primitives';
import {materials as m} from './materials';
import type {Room} from '../state/types';

/** A compact, cutaway Regency-suite composition: sleep / lounge / bath remain legible. */
function buildRegencySuite(g:T.Group,room:Room,level:number){
 // Separate textile zones make the room read as a suite instead of one oversized bed.
 box(g,-.98,.087,.02,2.58,.018,2.62,m.suiteCarpet);
 box(g,1.27,.088,-.28,1.72,.018,1.42,m.suiteCarpet);
 box(g,1.58,.091,.91,1.34,.025,1.04,m.suiteStone);

 // Upholstered headboard, layered mattress, duvet, pillows and a restrained terracotta runner.
 box(g,-.96,1.13,-1.39,2.12,1.92,.045,m.suiteHeadboard);
 box(g,-.96,.99,-1.34,1.9,.055,.05,m.suiteBrass);
 roundBox(g,-.96,.27,-.03,1.72,.36,1.91,m.suiteWalnut);
 roundBox(g,-.96,.48,-.02,1.64,.18,1.84,m.suiteLinen);
 roundBox(g,-.96,.59,.13,1.56,.12,1.48,m.suiteLinen);
 roundBox(g,-.96,.665,.66,1.56,.055,.32,m.suiteTerracotta);
 for(const x of [-1.34,-.58]){
  roundBox(g,x,.675,-.69,.66,.14,.39,m.suiteLinen);
  roundBox(g,x,.702,-.68,.58,.085,.31,m.white);
 }
 box(g,-.96,.78,-1.28,1.73,.025,.025,m.glow);

 // Bedside tables and warm, low-profile reading lamps.
 for(const x of [-1.99,.07]){
  roundBox(g,x,.36,-.68,.34,.56,.39,m.suiteWalnut);
  roundBox(g,x,.655,-.68,.38,.055,.43,m.suiteOak);
  lamp(g,x,.69,-.68,.62);
 }
 artwork(g,-.96,1.67,-1.365,1.04,.42,room.level??1);

 // Slatted timber divider: separates the sleeping zone without closing the room.
 for(let i=0;i<12;i++){
  const z=-.83+i*.145;
  roundBox(g,.17,.84,z,.045,1.58,.045,m.suiteOak);
 }
 roundBox(g,.17,1.64,-.02,.085,.09,1.82,m.suiteWalnut);
 roundBox(g,.17,.12,-.02,.075,.07,1.82,m.suiteWalnut);

 // Lounge area: compact sofa, layered cushions, rounded coffee table and side chair.
 sofa(g,1.36,-.31,-Math.PI/2,1.16,m.suiteLinen);
 roundBox(g,1.69,.57,-.43,.22,.22,.28,m.suiteTerracotta);
 roundBox(g,1.69,.57,-.08,.22,.22,.28,m.teal);
 roundBox(g,1.12,.47,.35,.82,.075,.48,m.suiteStone);
 roundBox(g,1.12,.43,.35,.68,.045,.36,m.suiteLinen);
 for(const x of [.83,1.41])cyl(g,x,.22,.35,.022,.42,m.suiteBrass);
 chair(g,1.96,.35,-Math.PI/5,m.suiteTerracotta);
 // Small side table and reading light beside the lounge.
 roundBox(g,1.95,.42,-.61,.32,.07,.34,m.suiteOak);
 cyl(g,1.95,.23,-.61,.025,.4,m.suiteBrass);
 lamp(g,1.95,.47,-.61,.55);

 // Vanity / shower pod at the entrance side. Translucent panels preserve the cutaway view.
 roundBox(g,1.63,.35,.91,.94,.58,.42,m.suiteWalnut);
 roundBox(g,1.63,.665,.91,1.02,.075,.48,m.suiteStone);
 roundBox(g,1.63,.715,.88,.45,.055,.29,m.suiteLinen);
 roundBox(g,1.63,1.25,1.18,.78,.73,.045,m.suiteGlass);
 box(g,1.63,1.25,1.205,.69,.64,.012,m.suiteDarkGlass);
 roundBox(g,1.63,1.66,1.17,.82,.035,.035,m.glow);
 // Shower / soaking tub with brass fixtures and a light glass screen.
 roundBox(g,1.27,.27,.43,.83,.39,.58,m.suiteLinen);
 roundBox(g,1.27,.465,.43,.69,.055,.44,m.suiteStone);
 box(g,.83,.91,.43,.035,1.42,.78,m.suiteGlass);
 box(g,.83,1.64,.43,.045,.045,.8,m.suiteBrass);
 cyl(g,1.68,.91,.47,.025,.53,m.suiteBrass);
 cyl(g,1.68,1.2,.47,.085,.045,m.suiteBrass);
 // Hotel toiletries and towel stack provide scale cues without visual clutter.
 roundBox(g,1.91,.77,.91,.11,.14,.1,m.suiteLinen);
 roundBox(g,1.78,.77,.91,.09,.14,.1,m.suiteLinen);
 roundBox(g,1.9,.17,1.28,.42,.06,.16,m.suiteLinen);
 roundBox(g,1.9,.235,1.28,.42,.06,.16,m.white);

 // Entry storage and luggage bench.
 roundBox(g,-2.04,.82,1.03,.42,1.52,.44,m.suiteOak);
 roundBox(g,-2.04,1.59,1.03,.45,.055,.47,m.suiteWalnut);
 roundBox(g,-1.47,.26,1.12,.68,.31,.42,m.suiteWalnut);
 roundBox(g,-1.47,.445,1.12,.66,.075,.4,m.suiteLinen);
 for(const x of [-1.7,-1.25])cyl(g,x,.11,1.12,.025,.2,m.suiteBrass);

 // Premium finish: subtle brass reveals, a layered rug edge and a small plant.
 if(level>=2){
  box(g,-.96,.101,1.28,2.35,.012,.025,m.suiteBrass);
  roundBox(g,1.98,.31,-1.02,.31,.62,.31,m.suiteWalnut);
  plant(g,1.98,-1.02,.55);
 }
 if(level>=3){
  box(g,-.96,2.02,-1.29,1.72,.035,.035,m.suiteBrass);
  lamp(g,-1.99,.1,-.68,.82);
 }
 if(level>=4){
  roundBox(g,1.95,.43,-.98,.42,.08,.42,m.suiteStone);
  cyl(g,1.95,.48,-.98,.09,.09,m.suiteBrass);
  roundBox(g,-.96,.71,.4,1.45,.035,.08,m.suiteLinen);
 }
 if(level>=5){
  box(g,1.58,1.97,-1.24,1.1,.035,.035,m.suiteBrass);
  box(g,-.96,2.08,-1.28,1.95,.025,.025,m.glow);
 }
 if(room.extraBed){
  roundBox(g,-.78,.23,1.02,.86,.27,.57,m.suiteWalnut);
  roundBox(g,-.78,.39,1.02,.82,.07,.54,m.suiteLinen);
  roundBox(g,-.78,.445,.87,.72,.045,.2,m.suiteTerracotta);
 }
 shadow(g,-.96,.03,2.78,2.78);
 shadow(g,1.28,-.27,1.8,1.5);
 shadow(g,1.58,.88,1.48,1.15);
}

export function roomFactory(room:Room):T.Group {
 const level=room.level??1;const g=new T.Group();g.name=room.id;g.userData.entityId=room.id;
 const suite=isSuite(room),twin=roomBed(room)==='twin';
 box(g,0,.04,0,4.7,.08,3.1,level>=4?m.stone:level>=2?m.walnut:m.wood);
 // Shared architecture: upholstered wall panels and a glazed rear bay.
 box(g,0,1.19,-1.51,4.7,2.38,.14,m.wall);
 box(g,2.35,1.14,-.1,.1,2.28,2.75,m.stone);
 box(g,1.6,1.25,-1.41,1.05,1.9,.035,m.window);
 for(const x of [1.1,1.6,2.1])box(g,x,1.25,-1.35,.035,1.94,.04,m.gold);
 box(g,1.6,1.25,-1.35,1.08,.04,.04,m.gold);
 for(let x=1.03;x<1.26;x+=.06)box(g,x,1.28,-1.23,.04,1.94,.13,m.white);
 box(g,0,2.27,-1.27,4.53,.06,.065,m.glow);
 if(room.construction){for(const x of [-1.8,0,1.8]){box(g,x,1.05,1.5,.07,2.1,.07,m.gold);box(g,x,.4,.4,.65,.7,.7,m.stone);}for(const y of [.5,1.4,2.15])box(g,0,y,1.5,4.5,.06,.06,m.gold);box(g,0,.8,1.55,4.5,.48,.06,m.navy);return g;}
 if(room.status==='unbuilt'){box(g,0,.12,0,3.8,.08,2.5,m.stone);return g;}
 if(suite){
  buildRegencySuite(g,room,level);
  plant(g,2.12,-1.02,.48);
  if(room.status==='reserved'){box(g,0,1.1,1.43,.38,.5,.05,m.rust);box(g,1.98,.49,.96,.25,.29,.1,m.suiteBrass);}
  if(room.status==='cleaning'){
   roundBox(g,-1.88,.35,.77,.42,.47,.32,m.navy);
   for(const x of [-2.02,-1.73])cyl(g,x,.09,.77,.055,.07,m.black);
   roundBox(g,-1.88,.61,.77,.46,.045,.34,m.suiteBrass);
   roundBox(g,-1.95,.69,.77,.18,.11,.18,m.suiteLinen);
  }
  if(room.status==='occupied')box(g,0,2.23,.7,3.8,.035,.035,m.shade);
  if(room.status==='maintenance'){const fault=box(g,.92,1.95,1.3,.17,.17,.08,m.glow);fault.name='fault-lamp';fault.userData.interactive=true;roundBox(g,.62,.33,.9,.8,.1,.8,m.suiteTerracotta);}
  return g;
 }
 // Standard / view rooms retain the existing footprint and furnishing rules.
 box(g,-.67,.078,.07,2.85,.02,2.66,m.carpet);
 const bed=(x:number,w:number)=>{
  box(g,x,.28,-.03,w+.09,.39,1.9,m.walnut);
  roundBox(g,x,.51,.02,w,.23,1.85,room.status==='dirty'?m.stone:m.white);
  box(g,x,.7,-.98,w+.13,1.22,.12,m.walnut);
  roundBox(g,x,.82,-.89,w-.05,.63,.08,m.teal);
  roundBox(g,x,.67,-.58,w*.82,.13,.36,m.white);if(level>=2){roundBox(g,x,.78,-.72,w*.78,.12,.25,m.white);roundBox(g,x,.655,.18,w,.045,.45,level>=4?m.white:m.teal);}
  roundBox(g,x,.646,.54,w,.075,.39,level>=4?m.white:m.teal);
  roundBox(g,x,.49,1,w,.28,.04,m.white);shadow(g,x,0,w+.25,2.25);
 };
 if(twin){bed(-1.36,.88);bed(-.22,.88);}else bed(-.75,1.68);
 for(const x of [-1.94,.43]){box(g,x,.35,-.76,.41,.58,.5,m.walnut);box(g,x,.66,-.76,.45,.06,.53,m.stone);lamp(g,x,.69,-.77,.8);}
 artwork(g,-.75,1.79,-1.39,1.25,.54,Number(room.number));
 if(level>=4){box(g,1.65,.38,-.4,.9,.65,.85,m.stone);box(g,1.65,.73,-.4,.85,.08,.8,m.white);cyl(g,1.65,.83,-.65,.025,.22,m.gold);box(g,2.16,1.25,-.35,.025,1.8,1.5,m.glass);box(g,1.6,1.93,-1.14,.3,.04,.25,m.gold);artwork(g,1.5,1.6,-1.33,.8,.5,level);sofa(g,1.58,.76,-Math.PI/2,.75,m.white);}
 else{
  box(g,1.61,.76,-.57,1.1,.1,.57,m.walnut);for(const x of [1.19,2.03])box(g,x,.37,-.57,.05,.75,.46,m.gold);
  box(g,1.59,.94,-.64,.35,.28,.04,m.screen);chair(g,1.65,.06,Math.PI);lamp(g,2,.82,-.62,.66);
 }
 if(roomTier(room)==='view'||roomTier(room)==='premium'){box(g,0,1.45,-1.4,4.15,1.65,.025,m.window);for(const x of [-2,0,2])box(g,x,1.45,-1.35,.045,1.7,.045,m.gold);}
 if(roomTier(room)==='premium'){box(g,0,2.1,-1.25,4.5,.08,.08,m.gold);artwork(g,-1.6,1.8,-1.3,.8,.4,99);plant(g,1.95,.55,1.15);}
 if(room.extraBed){roundBox(g,.5,.25,1.02,.8,.3,.8,m.walnut);roundBox(g,.5,.43,1.02,.8,.08,.8,m.white);}
 plant(g,2.05,1.05,.63);
 if((room.level??1)>1){artwork(g,-2.05,1.6,-1.38,.38,.56,room.level);plant(g,-2.05,.35,.55);}
 if(level>=3){lamp(g,-1.94,1.25,-.9,1.1);box(g,-.75,1.62,-1.25,2.1,.025,.03,m.glow);}
 if(level>=5){box(g,0,1.4,-1.42,4.3,1.9,.025,m.window);for(const x of [-2,-.8,.8,2])box(g,x,1.4,-1.35,.04,1.95,.06,m.gold);for(const x of [-1.8,0,1.8])box(g,x,.09,.15,.025,.02,2.9,m.gold);for(const y of [2.12,2.24])box(g,0,y,-1.1,4.5,.035,.035,m.glow);}
 if(level>2)box(g,0,2.12,-1.3,4.55,.035,.055,m.gold);
 box(g,-2.12,.52,.95,.22,1,.28,m.walnut);
 if(room.status==='reserved'){if(room.suaBookingId)box(g,0,1.1,1.62,.38,.5,.05,m.rust);box(g,1.2,.48,1.48,.25,.29,.1,m.gold);}
 if(room.status==='cleaning'){
  box(g,1.05,.37,1.57,.55,.55,.35,m.navy);for(const x of [.83,1.27])cyl(g,x,.09,1.57,.07,.07,m.black);
  box(g,1.05,.71,1.57,.6,.04,.41,m.gold);box(g,.95,.79,1.57,.3,.12,.22,m.white);
 }
 if(room.status==='occupied')box(g,0,2.23,.7,3.8,.035,.035,m.shade);
 if(room.status==='maintenance'){const fault=box(g,.9,1.95,1.55,.17,.17,.08,m.glow);fault.name='fault-lamp';fault.userData.interactive=true;box(g,.6,.33,.9,.8,.1,.8,m.rust);box(g,.6,.52,.9,.1,.6,.1,m.gold);}
 return g;
}
