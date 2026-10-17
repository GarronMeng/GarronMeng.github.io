import * as T from 'three';
import type {Room} from '../../state/types';
import {SAMPLE} from './config';
import {dioramaMaterials} from './materials';
import {rounded,cylinder,oval,contact,pottery,plant,lamp,loungeChair,batchDiorama} from './assets';
/** A real-room replacement, in the original 4.7 × 3.1 footprint and Y-up axes. */
export function dioramaRoom(room:Room){const g=new T.Group(),m=dioramaMaterials();g.name=room.id;g.userData={entityId:room.id,diorama:true};
 rounded(g,'architectural-plinth',0,.015,0,4.7,.14,3.1,m.edge,.025);
 // Individual staggered boards, an actual geometric floor, not a photograph.
 for(let row=0;row<10;row++)for(let col=0;col<3;col++){const width=4.6/3;rounded(g,'oak-floor-board',-2.3+width*(col+.5),.102,-1.38+row*.304,width-.012,.035,.292,(row+col)%4===0?m.edge:m.oak,.006);}
 const rear=new T.Group();rear.name='cutaway-rear-wall';rear.userData.dynamic=true;g.add(rear);
 rounded(rear,'plaster-rear-wall',0,1.25,-1.52,4.7,2.38,SAMPLE.wall,m.wall,.018);
 rounded(rear,'oak-rear-skirting',0,.18,-1.432,4.56,.12,.055,m.oak,.012);
 const side=new T.Group();side.name='cutaway-side-wall';side.userData.dynamic=true;g.add(side);
 rounded(side,'sage-side-wall',2.32,1.25,0,.13,2.38,3.1,m.sage,.018);
 rounded(side,'oak-side-skirting',2.235,.18,0,.045,.12,2.97,m.oak,.009);
 // Glazed window, deep timber reveal and curved curtain folds.
 rounded(rear,'window-reveal',1.24,1.47,-1.405,1.74,1.57,.095,m.oak,.018);
 rounded(rear,'daylit-window',1.24,1.47,-1.346,1.61,1.44,.025,m.window,.004);
 rounded(rear,'window-glazing',1.24,1.47,-1.326,1.6,1.43,.012,m.glass,.003);
 for(const x of [.46,.98,1.5,2.02])rounded(rear,'window-mullion',x,1.47,-1.306,.026,1.48,.04,m.ceramic,.006);
 rounded(rear,'window-crossbar',1.24,1.48,-1.30,1.6,.035,.045,m.ceramic,.006);
 rounded(rear,'window-sill',1.24,.72,-1.24,1.85,.075,.3,m.oak,.018);
 const rod=cylinder(rear,'curtain-rod',1.22,2.28,-1.13,.018,2.1,m.brass);rod.rotation.z=Math.PI/2;
 for(const edge of [.35,2.1])for(let i=0;i<5;i++){const x=edge+(i-2)*.049;const fold=cylinder(rear,'draped-curtain-fold',x,1.45,-1.15+Math.cos(i*1.9)*.025,.047,1.62,m.linen,.046);fold.scale.z=.85;}
 // Upholstered bed: rounded frame, mattress piping, soft pillows, folded duvet.
 contact(g,-.86,.1,2.9,2.9);
 rounded(g,'woven-bed-rug',-.9,.13,.18,2.73,.025,2.43,m.rug,.055);
 for(const x of [-1.58,-.08])for(const z of [-.77,.84])cylinder(g,'bed-leg',x,.23,z,.035,.2,m.walnut);
 rounded(g,'oak-bed-frame',-.83,.32,.06,1.95,.26,2.05,m.walnut,.065);
 rounded(g,'upholstered-headboard',-.83,.83,-1.05,2.14,1.42,.16,m.upholstery,.09);
 rounded(g,'headboard-oak-cap',-.83,1.54,-1.065,2.16,.055,.18,m.oak,.023);
 rounded(g,'mattress-piping',-.83,.49,.08,1.88,.15,1.97,m.linen,.07);
 rounded(g,'soft-mattress',-.83,.56,.08,1.86,.22,1.94,room.status==='dirty'?m.rug:m.linen,.085);
 const duvet=rounded(g,'draped-duvet',-.83,.687,.38,1.91,.15,1.43,m.linen,.065);if(room.status==='dirty')duvet.rotation.y=.07;
 for(const x of [-1.31,-.36]){const p=oval(g,'plump-pillow',x,.75,-.61,.43,.13,.255,m.linen);p.rotation.y=x<-.8?-.06:.04;rounded(g,'pillow-seam',x,.742,-.36,.7,.015,.018,m.paper,.005);}
 rounded(g,'folded-duvet-edge',-.83,.77,-.15,1.85,.09,.23,m.linen,.035);
 rounded(g,'sage-woven-runner',-.83,.786,.7,1.94,.035,.43,m.throw,.018);
 for(const x of [-1.78,.12])rounded(g,'runner-overhang',x,.64,.7,.045,.28,.43,m.throw,.016);
 // Two bedside cabinets, brass pulls and actual turned lamps.
 for(const x of [-2.02,.4]){contact(g,x,-.79,.56,.69);rounded(g,'oak-nightstand',x,.42,-.8,.43,.49,.45,m.oak,.028);rounded(g,'stone-nightstand-top',x,.68,-.8,.46,.045,.48,m.ceramic,.017);rounded(g,'nightstand-drawer',x,.49,-.562,.36,.15,.018,m.edge,.008);cylinder(g,'drawer-pull',x,.49,-.542,.018,.03,m.brass);lamp(g,x,.71,-.8);}
 // Calm framed abstract art; all colored paper elements are real geometry.
 rounded(rear,'art-frame',-.84,1.95,-1.405,1.45,.61,.055,m.oak,.02);
 rounded(rear,'art-paper',-.84,1.95,-1.369,1.33,.49,.016,m.paper,.008);
 rounded(rear,'art-landscape',-.84,1.83,-1.354,1.3,.21,.009,m.upholstery,.005);
 const sun=cylinder(rear,'art-sun',-.48,2.035,-1.339,.088,.008,m.art);sun.rotation.x=Math.PI/2;
 // Compact writing desk, upholstered chair, hospitality tray, greenery.
 rounded(g,'writing-desk-top',1.53,.83,-.61,1.03,.085,.57,m.oak,.035);
 for(const x of [1.12,1.95])for(const z of [-.82,-.42]){const leg=cylinder(g,'desk-tapered-leg',x,.46,z,.028,.7,m.walnut,.02);leg.rotation.z=x<1.5?.04:-.04;}
 rounded(g,'closed-notebook',1.48,.889,-.6,.24,.035,.18,m.book,.012);
 rounded(g,'writing-paper',1.48,.909,-.6,.21,.005,.16,m.paper,.003);
 pottery(g,1.87,.875,-.66,.18);lamp(g,1.13,.88,-.67);
 loungeChair(g,1.36,.37);
 cylinder(g,'side-table-pedestal',1.85,.36,.99,.035,.53,m.brass);
 cylinder(g,'side-table-top',1.85,.65,.99,.28,.065,m.oak);
 cylinder(g,'coffee-saucer',1.82,.697,1.0,.085,.012,m.ceramic);
 cylinder(g,'coffee-cup',1.82,.742,1.0,.045,.075,m.ceramic,.05);
 plant(g,1.99,-1.03,.56);plant(g,2.0,1.26,.68);
 rounded(g,'luggage-bench',-.84,.32,1.29,1.48,.2,.29,m.oak,.035);
 for(const x of [-1.4,-.28])rounded(g,'bench-leg',x,.2,1.29,.065,.22,.24,m.walnut,.015);
 // Guest luggage uses real room status, never a staged occupant or fake activity.
 if(room.status==='occupied'){rounded(g,'guest-luggage',-.36,.56,1.26,.39,.38,.25,m.book,.05);rounded(g,'luggage-handle',-.36,.79,1.26,.16,.1,.06,m.brass,.015);}
 if(room.extraBed){rounded(g,'actual-extra-bed',.36,.35,1.01,.76,.3,.83,m.oak,.025);rounded(g,'extra-bed-linen',.36,.54,1.01,.76,.13,.83,m.linen,.045);}
 if(room.status==='reserved'){rounded(g,'suite-reservation-marker',.8,.31,1.46,.18,.35,.055,room.suaBookingId?m.book:m.brass,.015);}
 if(room.status==='cleaning'){rounded(g,'housekeeping-cart',.66,.37,1.41,.46,.48,.28,m.ink,.03);rounded(g,'clean-towel-stack',.66,.65,1.41,.41,.12,.26,m.linen,.025);for(const x of [.49,.83])cylinder(g,'cart-wheel',x,.13,1.41,.055,.07,m.walnut);}
 if(room.status==='maintenance'){const fault=rounded(g,'fault-lamp',.79,1.84,1.55,.17,.17,.07,m.lamp,.02);fault.userData.interactive=true;rounded(g,'engineering-tool-case',.65,.26,.94,.38,.24,.28,m.book,.035);}
 // Static warm pools replace per-lamp shadow-casting PointLights on mobile.
 for(const x of [-2.02,.4]){const pool=oval(rear,'warm-wall-wash',x,1.18,-1.438,.18,.3,.008,m.lamp);pool.castShadow=false;}
 batchDiorama(rear);batchDiorama(side);batchDiorama(g);return g;
}
export function setRoomCutaway(group:T.Group,cameraLocal:T.Vector3){const side=group.getObjectByName('cutaway-side-wall'),rear=group.getObjectByName('cutaway-rear-wall');if(side)side.visible=cameraLocal.x<2.3;if(rear)rear.visible=cameraLocal.z> -1.5;}
