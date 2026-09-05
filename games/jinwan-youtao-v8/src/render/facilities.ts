import * as T from 'three';
import {box,cyl,orb,plant,lamp,sofa,chair,artwork,table,cups,shadow} from './primitives';
import {materials as m} from './materials';
import type {FacilityRole} from '../state/types';
function pendant(g:T.Object3D,x:number,z:number,y=2.12){cyl(g,x,y+.13,z,.012,.45,m.gold);cyl(g,x,y-.08,z,.24,.18,m.gold);cyl(g,x,y-.18,z,.21,.015,m.glow);}
function panelledWall(g:T.Object3D,role:FacilityRole){box(g,0,1.2,-1.54,14.65,2.4,.14,m.wall);if(role==='lobby'){for(let x=-6.9;x<=6.9;x+=.42)box(g,x,1.2,-1.42,.035,2.38,.08,m.gold);}else {for(let x=-7;x<7;x+=.58)box(g,x,1.2,-1.43,.022,2.2,.04,m.wood);}}
function windows(g:T.Object3D,start:number,end:number){box(g,(start+end)/2,1.23,-1.4,end-start,2.14,.04,m.window);for(let x=start;x<=end+.01;x+=.72)box(g,x,1.23,-1.32,.045,2.17,.06,m.gold);box(g,(start+end)/2,1.25,-1.31,end-start,.04,.06,m.gold);}
function dining(g:T.Object3D,x:number,z:number){table(g,x,z,.44);chair(g,x-.63,z,Math.PI/2);chair(g,x+.63,z,-Math.PI/2);cups(g,x-.18,.87,z);cups(g,x+.18,.87,z);cyl(g,x,.83,z,.065,.12,m.gold);}
function shelves(g:T.Object3D,x:number,w:number){box(g,x,1.23,-1.35,w,1.86,.18,m.walnut);for(let y=.53;y<2;y+=.39){box(g,x,y,-1.14,w,.04,.42,m.gold);box(g,x,y+.035,-1.18,w-.1,.025,.05,m.glow);for(let j=0;j<Math.floor(w/.23);j++){const xx=x-w/2+.16+j*.23;cyl(g,xx,y+.13,-1.08,.048,.23,j%3?m.green:m.rust);cyl(g,xx,y+.27,-1.08,.019,.07,m.gold);}}}
export function facilityFactory(role:FacilityRole){const g=new T.Group();
 if(role!=='rooftop'){panelledWall(g,role);box(g,0,.04,0,14.66,.08,3.15,role==='lobby'?m.stone:m.wood);box(g,0,2.31,-1.21,14.5,.04,.07,m.glow);}
 if(role==='lobby'){
  windows(g,4.3,7.2);box(g,0,1.35,-1.33,6.7,1.8,.11,m.stone);
  box(g,0,.48,.5,6.2,.84,.62,m.walnut);box(g,0,.94,.5,6.45,.12,.83,m.stone);box(g,0,.15,.86,6.08,.075,.035,m.glow);
  for(let x=-2.9;x<3;x+=.18)box(g,x,.5,.824,.035,.6,.025,m.gold);
  for(const x of [-1.8,1.7]){box(g,x,1.12,.2,.42,.29,.045,m.screen);lamp(g,x+.55,1.02,.46,.72);}
  plant(g,-3.9,-.7,1.72);plant(g,4,-.55,1.6);
  sofa(g,-5.75,.08,Math.PI/2,1.65,m.white);table(g,-5.02,1,.47);plant(g,-6.4,1.4,.55);
  box(g,5.8,.045,1.18,2.2,.03,1.25,m.navy);
  // Real glass lobby entrance with brass mullions and canopy.
  for(const x of [4.65,6.95]){box(g,x,1.13,.85,.08,2.28,.08,m.gold);box(g,x,1.17,.79,.65,2.18,.025,m.glass);}
  box(g,5.8,2.18,1.24,2.6,.16,1.72,m.navy);box(g,5.8,2.08,2.03,2.55,.035,.04,m.gold);
  // Bell cart with luggage.
  for(const x of [3.5,4.1]){cyl(g,x,.67,1.8,.025,1.15,m.gold);cyl(g,x,.09,1.8,.08,.1,m.black);}box(g,3.8,1.27,1.8,.65,.035,.04,m.gold);box(g,3.8,.18,1.8,.78,.08,.51,m.gold);box(g,3.76,.43,1.8,.37,.45,.25,m.rust);
  for(const x of [-2.8,0,2.8])pendant(g,x,.1,2.02);
 }else if(role==='breakfast'){
  windows(g,4.3,7.2);shelves(g,0,4.5);
  box(g,0,.52,-.15,5,.9,.8,m.walnut);box(g,0,1.01,-.15,5.2,.12,.97,m.stone);
  for(const x of [-1.7,-.7,.3]){box(g,x,1.14,-.17,.66,.14,.45,m.gold);box(g,x,1.24,-.17,.6,.08,.38,m.white);}
  box(g,1.5,1.29,-.24,.43,.53,.38,m.black);cyl(g,2.1,1.28,-.2,.15,.4,m.glass);cyl(g,2.1,1.13,-.2,.145,.09,m.rust);
  for(const x of [-5.55,-3.4,3.8,6])dining(g,x,.68);
  for(const x of [-5.55,-3.4,0,3.8,6])pendant(g,x,.5);
  plant(g,-6.9,-.87,1.1);plant(g,6.8,-.8,1.1);
 }else if(role==='club'){
  windows(g,-7.2,-3.8);windows(g,3.8,7.2);shelves(g,0,5.4);
  box(g,0,.58,-.24,5.55,1.02,.58,m.walnut);box(g,0,1.12,-.24,5.8,.11,.79,m.stone);box(g,0,.25,.071,5.5,.05,.035,m.glow);
  for(const x of [-1.8,-.6,.6,1.8]){cyl(g,x,.6,.6,.24,.12,m.teal);cyl(g,x,.28,.6,.035,.58,m.gold);cups(g,x,1.24,-.15);pendant(g,x,-.24);}
  sofa(g,-5.6,-.54,0,2.05,m.teal);table(g,-5.6,.57,.5);chair(g,-4.38,.75,-Math.PI/3,m.rust);
  sofa(g,5.25,-.54,0,2.1,m.rust);table(g,5.25,.6,.52);chair(g,6.52,.7,-Math.PI/3,m.teal);
  plant(g,-6.9,.68,1.2);plant(g,6.9,-.8,1.25);lamp(g,-4.15,.05,-.8,1.6);
 }else if(role==='gym'){
  windows(g,-7.2,7.2);box(g,0,.093,0,14.4,.025,2.9,m.carpet);
  // Treadmills are distinct machinery, facing the window.
  for(const x of [-5.65,-3.8,-1.95]){
   box(g,x,.16,.15,.92,.21,1.72,m.black);box(g,x,.28,.17,.68,.015,1.42,m.carpet);
   for(const side of [-1,1]){box(g,x+side*.42,.7,-.51,.075,1.1,.08,m.black);box(g,x+side*.42,1.13,-.2,.06,.06,.75,m.black);}
   box(g,x,1.26,-.5,.85,.23,.14,m.black);box(g,x,1.3,-.409,.43,.12,.012,m.screen);
  }
  // Exercise bike, weight rack, rolled towels and yoga mats.
  for(const x of [.1,1.65]){const wheel=cyl(g,x,.41,.1,.36,.12,m.black);wheel.rotation.z=Math.PI/2;box(g,x,.39,.2,.07,.69,.09,m.gold);box(g,x,.81,.47,.37,.09,.24,m.black);box(g,x,1.05,-.32,.07,.55,.07,m.black);box(g,x,1.27,-.32,.5,.06,.07,m.gold);}
  box(g,5.45,.68,-.8,2.8,.07,.58,m.black);for(let x=4.2;x<6.8;x+=.46){cyl(g,x,.82,-.8,.13,.16,m.black);}
  for(const x of [3.65,5.2])box(g,x,.12,.61,1.08,.025,1.68,m.teal);
  plant(g,6.93,.82,1.2);box(g,2.76,.4,-.87,.6,.7,.53,m.walnut);for(let i=0;i<3;i++)box(g,2.76,.79+i*.065,-.87,.46,.065,.4,m.white);
 }else{
  box(g,0,.03,0,15,.14,3.6,m.wood);for(let x=-7.3;x<7.4;x+=.24)box(g,x,.11,0,.017,.006,3.45,m.walnut);
  for(const x of [-6.65,-2.45,2.8,6.9])plant(g,x,-.8,1.45);
  for(const x of [-4.4,3.5]){
   table(g,x,.45,.66);chair(g,x-.9,.4,Math.PI/2,m.white);chair(g,x+.9,.4,-Math.PI/2,m.white);cups(g,x+.2,.88,.45);
   cyl(g,x,1.07,.45,.026,2.05,m.gold);const roof=new T.Mesh(new T.ConeGeometry(1.55,.32,8),m.white);roof.position.set(x,2.04,.45);roof.rotation.y=Math.PI/8;roof.castShadow=true;g.add(roof);
  }
  sofa(g,-.5,-.7,0,1.7,m.teal);table(g,-.5,.45,.38);
  for(const x of [-7.35,7.35])box(g,x,.43,0,.055,.8,3.5,m.gold);
  for(let x=-7.3;x<=7.3;x+=1.46)cyl(g,x,.43,1.7,.018,.8,m.gold);
  box(g,0,.8,1.7,14.7,.035,.035,m.gold);box(g,0,.46,1.7,14.7,.65,.014,m.glass);
 }
 return g;
}
