import * as T from 'three';
import type {Room} from '../../state/types';
import {SAMPLE} from './config';
import {ROOM_REFERENCE} from './reference';
import {dioramaMaterials} from './materials';
import {rounded,cylinder,oval,contact,batchDiorama} from './assets';
/** Photo-led Hyatt Place king room, mirrored to preserve the existing corridor. */
export function dioramaRoom(room:Room){
 const g=new T.Group(),m=dioramaMaterials();g.name=room.id;g.userData={entityId:room.id,diorama:true,reference:ROOM_REFERENCE.id};
 rounded(g,'architectural-plinth',0,.015,0,4.7,.14,3.1,m.edge,.025);
 rounded(g,'wall-to-wall-grey-carpet',0,.106,0,4.58,.04,2.98,m.rug,.012);
 const rear=new T.Group();rear.name='cutaway-rear-wall';rear.userData.dynamic=true;g.add(rear);
 rounded(rear,'plaster-rear-wall',1.03,1.25,-1.52,2.64,2.38,SAMPLE.wall,m.wall,.016);
 rounded(rear,'window-side-pier',-2.22,1.25,-1.52,.26,2.38,SAMPLE.wall,m.wall,.014);
 rounded(rear,'window-header',-1.2,2.33,-1.52,1.8,.22,SAMPLE.wall,m.wall,.014);
 rounded(rear,'window-low-sill',-1.2,.22,-1.52,1.8,.2,SAMPLE.wall,m.wall,.014);
 rounded(rear,'window-reveal',-1.2,1.26,-1.47,1.84,2.05,.09,m.darkFrame,.012);
 rounded(rear,'daylit-window',-1.2,1.26,-1.42,1.72,1.94,.018,m.window,.003);
 rounded(rear,'window-glazing',-1.2,1.26,-1.399,1.71,1.93,.012,m.glass,.003);
 for(const x of [-2.06,-1.2,-.34])rounded(rear,'black-window-mullion',x,1.26,-1.368,.045,2,.05,m.darkFrame,.006);
 rounded(rear,'window-crossbar',-1.2,.92,-1.364,1.77,.045,.055,m.darkFrame,.006);
 rounded(rear,'roller-blind-valance',-1.2,2.19,-1.31,1.9,.16,.14,m.wall,.012);
 for(let i=0;i<5;i++)cylinder(rear,'neutral-curtain-fold',-2.1+i*.047,1.28,-1.23,.046,1.8,m.upholstery);
 rounded(rear,'dark-window-sill',-1.2,.29,-1.26,1.9,.06,.29,m.walnut,.015);
 const side=new T.Group();side.name='cutaway-side-wall';side.userData.dynamic=true;g.add(side);
 rounded(side,'warm-plaster-side-wall',2.32,1.25,0,.13,2.38,3.1,m.wall,.016);
 rounded(side,'dark-timber-skirting',2.235,.18,0,.045,.12,2.97,m.walnut,.009);
 // The bed faces a continuous media/work counter across the central aisle.
 const bed=new T.Group();bed.name='hyatt-king-sleep-zone';bed.position.set(1.19,0,.08);bed.rotation.y=-Math.PI/2;g.add(bed);
 rounded(bed,'continuous-walnut-headwall',0,.87,-1.045,2.72,1.42,.16,m.walnut,.018);
 rounded(bed,'upholstered-headboard',0,.82,-.942,1.9,1.22,.08,m.headboard,.035);
 rounded(bed,'headboard-backlight',0,1.446,-.932,1.96,.025,.025,m.lamp,.006);
 rounded(bed,'hotel-bed-base',0,.32,.08,1.82,.28,2.02,m.headboard,.055);contact(bed,0,.08,2.3,2.4);
 rounded(bed,'mattress-piping',0,.49,.08,1.85,.14,1.99,m.linen,.065);
 rounded(bed,'soft-mattress',0,.56,.08,1.84,.2,1.96,room.status==='dirty'?m.rug:m.linen,.075);
 const duvet=rounded(bed,'white-hotel-duvet',0,.69,.29,1.9,.14,1.65,m.linen,.058);if(room.status==='dirty')duvet.rotation.y=.065;
 for(const x of [-.89,.89])rounded(bed,'white-duvet-drop',x,.51,.31,.07,.33,1.61,m.linen,.025);
 rounded(bed,'duvet-foot-drop',0,.51,1.05,1.84,.3,.075,m.linen,.025);
 for(const x of [-.46,.46]){oval(bed,'rear-stacked-pillow',x,.77,-.65,.43,.095,.24,m.linen);const p=oval(bed,'front-stacked-pillow',x,.85,-.57,.43,.095,.23,m.linen);p.rotation.y=x<0?-.035:.035;}
 rounded(bed,'folded-white-top-sheet',0,.77,-.19,1.83,.05,.22,m.linen,.02);
 for(const x of [-1.13,1.13]){
  rounded(bed,'walnut-nightstand',x,.4,-.75,.4,.5,.51,m.walnut,.018);rounded(bed,'nightstand-open-shelf',x,.28,-.478,.33,.12,.015,m.ink,.006);rounded(bed,'nightstand-drawer',x,.51,-.48,.34,.14,.025,m.oak,.009);
  rounded(bed,'bedside-lamp-base',x,.682,-.75,.2,.025,.13,m.chrome,.008);cylinder(bed,'bedside-lamp-stem',x,.85,-.75,.013,.32,m.chrome);rounded(bed,'rectangular-linen-lamp',x,1.06,-.75,.29,.2,.17,m.lamp,.018);
 }
 rounded(bed,'guest-telephone',1.13,.689,-.56,.23,.06,.15,m.darkFrame,.016);rounded(bed,'telephone-handset',1.13,.733,-.57,.23,.04,.05,m.ink,.013);
 const art=new T.Group();art.name='hyatt-floral-headwall-art';art.position.set(0,1.91,-.97);bed.add(art);
 rounded(art,'walnut-art-frame',0,0,0,1.83,.53,.045,m.oak,.012);rounded(art,'warm-abstract-background',0,0,.03,1.74,.44,.012,m.floralRed,.003);
 for(let i=0;i<6;i++)rounded(art,'abstract-art-panel',-.72+i*.28,-.08+(i%2)*.06,.041,.29,.21,.008,i%2?m.floralGold:m.headboard,.003);
 for(const x of [-.56,-.05,.53]){const stem=cylinder(art,'floral-art-stem',x,-.02,.053,.007,.29,m.paper);stem.rotation.z=-.14;for(let i=0;i<3;i++){const leaf=oval(art,'floral-art-leaf',x+(i%2?-.055:.05),-.06+i*.06,.06,.045,.015,.004,m.paper);leaf.rotation.z=i%2?-.5:.5;}}
 // This ordinary King has a window chaise, not the Specialty King's sofa bed.
 const chaise=new T.Group();chaise.name='hyatt-window-chaise';chaise.position.set(-1.12,0,-.91);g.add(chaise);
 rounded(chaise,'chaise-timber-plinth',0,.22,0,1.55,.18,.57,m.walnut,.025);rounded(chaise,'chaise-upholstered-seat',0,.44,.01,1.54,.28,.59,m.upholstery,.065);rounded(chaise,'chaise-side-back',-.65,.73,-.02,.22,.66,.58,m.upholstery,.07);
 const cushion=oval(chaise,'window-chaise-cushion',-.42,.71,0,.19,.2,.08,m.paper);cushion.rotation.z=-.18;
 for(let i=0;i<4;i++)rounded(chaise,'striped-accent-cushion',-.42,.6+i*.06,.085,.29,.025,.012,i%2?m.olive:m.headboard,.004);contact(g,-1.12,-.91,1.85,.85);
 const desk=new T.Group();desk.name='hyatt-media-work-center';desk.position.set(-2.02,0,.08);desk.rotation.y=Math.PI/2;g.add(desk);
 rounded(desk,'continuous-media-worktop',0,.84,0,1.74,.085,.54,m.walnut,.018);for(const x of [-.77,.77])rounded(desk,'desk-pedestal',x,.48,0,.16,.65,.47,m.walnut,.012);
 rounded(desk,'mini-fridge-door',-.58,.5,-.018,.28,.48,.46,m.walnut,.012);rounded(desk,'tv-stand-base',-.32,.908,-.1,.37,.035,.21,m.darkFrame,.009);cylinder(desk,'tv-stand-neck',-.32,1.02,-.1,.022,.22,m.chrome);
 const tv=new T.Group();tv.name='swiveling-hotel-TV';tv.position.set(-.32,0,-.11);tv.rotation.y=-.85;desk.add(tv);rounded(tv,'flat-screen-TV',0,1.3,0,.79,.49,.05,m.darkFrame,.015);rounded(tv,'TV-screen',0,1.3,.031,.73,.42,.009,m.ink,.004);
 rounded(desk,'hospitality-tray',.57,.9,-.1,.45,.035,.28,m.darkFrame,.009);cylinder(desk,'stainless-kettle',.66,1.025,-.12,.073,.21,m.chrome,.057);rounded(desk,'kettle-handle',.75,1.045,-.12,.065,.14,.04,m.darkFrame,.015);for(const x of [.44,.53])cylinder(desk,'tea-cup',x,.96,-.03,.032,.08,m.linen,.039);
 rounded(desk,'desk-lamp-foot',.13,.902,-.12,.14,.02,.11,m.chrome,.008);cylinder(desk,'desk-lamp-stem',.13,1.09,-.12,.012,.36,m.chrome);rounded(desk,'desk-lamp-head',.13,1.28,-.08,.2,.045,.11,m.chrome,.01);
 const chair=new T.Group();chair.name='white-ergonomic-work-chair';chair.position.set(-1.27,0,.36);chair.rotation.y=-Math.PI/2;g.add(chair);
 cylinder(chair,'swivel-chair-gas-lift',0,.3,0,.035,.32,m.chrome);rounded(chair,'white-work-chair-seat',0,.48,0,.46,.12,.47,m.linen,.05);const back=rounded(chair,'white-ribbed-chair-back',0,.76,-.21,.45,.56,.095,m.linen,.035);back.rotation.x=-.1;
 for(let i=0;i<6;i++)rounded(chair,'chair-upholstery-channel',0,.55+i*.075,-.151,.4,.012,.014,m.paper,.004);
 for(const x of [-.25,.25]){rounded(chair,'chrome-chair-arm',x,.62,0,.035,.025,.35,m.chrome,.009);cylinder(chair,'chair-arm-support',x,.55,-.1,.012,.15,m.chrome);}
 for(let i=0;i<5;i++){const a=i*Math.PI*2/5,leg=rounded(chair,'five-star-chair-base',Math.cos(a)*.13,.18,Math.sin(a)*.13,.29,.035,.04,m.chrome,.009);leg.rotation.y=-a;const wheel=cylinder(chair,'chair-caster',Math.cos(a)*.26,.15,Math.sin(a)*.26,.039,.043,m.darkFrame);wheel.rotation.z=Math.PI/2;}
 if(room.status==='occupied'){rounded(g,'guest-luggage',.12,.34,1.29,.33,.42,.25,m.headboard,.045);rounded(g,'luggage-handle',.12,.59,1.29,.14,.1,.05,m.chrome,.013);}
 if(room.extraBed){rounded(g,'actual-extra-bed',.25,.35,.91,.76,.3,.83,m.walnut,.025);rounded(g,'extra-bed-linen',.25,.54,.91,.76,.13,.83,m.linen,.045);}
 if(room.status==='reserved')rounded(g,'suite-reservation-marker',.8,.31,1.46,.18,.35,.055,room.suaBookingId?m.book:m.chrome,.015);
 if(room.status==='cleaning'){rounded(g,'housekeeping-cart',.66,.37,1.41,.46,.48,.28,m.ink,.03);rounded(g,'clean-towel-stack',.66,.65,1.41,.41,.12,.26,m.linen,.025);for(const x of [.49,.83])cylinder(g,'cart-wheel',x,.13,1.41,.055,.07,m.walnut);}
 if(room.status==='maintenance'){const fault=rounded(g,'fault-lamp',.79,1.84,1.55,.17,.17,.07,m.lamp,.02);fault.userData.interactive=true;rounded(g,'engineering-tool-case',.65,.26,.94,.38,.24,.28,m.book,.035);}
 batchDiorama(rear);batchDiorama(side);batchDiorama(g);return g;
}
export function setRoomCutaway(group:T.Group,cameraLocal:T.Vector3){const side=group.getObjectByName('cutaway-side-wall'),rear=group.getObjectByName('cutaway-rear-wall');if(side)side.visible=cameraLocal.x<2.3;if(rear)rear.visible=cameraLocal.z> -1.5;}
