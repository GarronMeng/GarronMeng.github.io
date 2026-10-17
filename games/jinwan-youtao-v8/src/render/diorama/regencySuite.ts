import * as T from 'three';
import type {Room} from '../../state/types';
import {dioramaMaterials} from './materials';
import {rounded,cylinder,oval,contact,pottery,lamp} from './assets';
import {roomVisualPlan} from './variants';
import {REGENCY_SUITE_REFERENCE} from './reference';

function zone(root:T.Group,name:string,kind:string){
 const g=new T.Group();g.name=name;g.userData.zone=kind;root.add(g);return g;
}
function addBed(parent:T.Group,room:Room,centerZ:number,width:number,level:number,name:string){
 const m=dioramaMaterials(),bed=new T.Group();bed.name=name;bed.position.set(1.12,0,centerZ);bed.rotation.y=-Math.PI/2;parent.add(bed);
 rounded(bed,'regency-bed-base',0,.31,.05,width,.26,1.95,m.suiteWood,.045);
 rounded(bed,'regency-mattress',0,.5,.06,width+.04,.17,1.9,m.linen,.055);
 rounded(bed,'regency-duvet',0,.64,.28,width+.06,.13,1.55,room.status==='dirty'?m.rug:m.linen,.045);
 rounded(bed,'regency-duvet-foot-drop',0,.52,1.03,width+.02,.28,.08,m.linen,.025);
 for(const x of [-width/2+.035,width/2-.035])rounded(bed,'regency-duvet-side-drop',x,.48,.3,.07,.31,1.48,m.linen,.022);
 rounded(bed,'regency-upholstered-headboard',0,.87,-.94,width+.1,1.17,.1,m.suiteUpholstery,.04);
 rounded(bed,'regency-headboard-walnut-cap',0,1.46,-.94,width+.15,.055,.13,m.suiteWood,.018);
 const pillowOffset=width>.95?.41:.17,pillowWidth=width>.95?.32:.14;
 for(const x of [-pillowOffset,pillowOffset]){
  oval(bed,'regency-rear-pillow',x,.78,-.59,pillowWidth,.09,.22,m.linen);
  oval(bed,'regency-front-pillow',x,.85,-.49,pillowWidth*.92,.085,.2,m.linen);
 }
 rounded(bed,'regency-folded-top-sheet',0,.755,-.17,width+.015,.045,.23,m.paper,.018);
 if(level>=2){
  rounded(bed,'regency-tailored-bed-runner',0,.782,.7,width+.07,.035,.31,m.suiteAccent,.015);
  oval(bed,'regency-decorative-cushion',0,.88,-.31,width*.17,.095,.065,m.suiteUpholstery);
 }
 if(level>=5)for(let i=0;i<8;i++)rounded(bed,'regency-fluted-bed-base',-width*.42+i*width*.84/7,.31,1.045,.025,.17,.02,m.suiteWood,.005);
 contact(bed,0,0,width+.28,2.2,.105);
 return bed;
}

/** Hyatt Regency Shenzhen Airport suite-inspired layout, normalized to the existing game-room envelope. */
export function regencySuiteRoom(room:Room){
 const g=new T.Group(),m=dioramaMaterials(),p=roomVisualPlan(room);
 g.name='hyatt-regency-regency-suite';g.userData={entityId:room.id,diorama:true,reference:REGENCY_SUITE_REFERENCE.id,suitePrototype:'regency-suite-84sqm',visual:p,bedCount:p.bed==='twin'?2:1};
 rounded(g,'architectural-plinth',0,.015,0,4.7,.14,3.1,m.edge,.025);
 rounded(g,'suite-stone-floor',0,.105,0,4.58,.04,2.98,m.suiteTile,.012);
 rounded(g,'suite-bedroom-carpet',1.1,.132,.28,2.25,.025,1.72,m.rug,.012);
 rounded(g,'suite-living-rug',-1,.132,.2,2.05,.025,1.86,m.suiteAccent,.012);
 rounded(g,'suite-living-rug-inlay',-1,.148,.2,1.95,.008,1.76,m.rug,.006);
 rounded(g,'suite-bathroom-floor-tile',1.25,.133,-1.08,1.9,.025,.78,m.suiteTile,.008);

 const rear=new T.Group();rear.name='cutaway-rear-wall';rear.userData.dynamic=true;g.add(rear);
 const wc=-1.05,ww=2.25,left=wc-ww/2,right=wc+ww/2;
 rounded(rear,'suite-rear-wall-left',(-2.35+left)/2,1.25,-1.52,left+2.35,2.38,.13,m.suiteWall,.014);
 rounded(rear,'suite-rear-wall-right',(right+2.35)/2,1.25,-1.52,2.35-right,2.38,.13,m.suiteWall,.014);
 rounded(rear,'suite-rear-wall-header',wc,2.31,-1.52,ww,.14,.13,m.suiteWall,.012);
 rounded(rear,'suite-rear-wall-low-sill',wc,.22,-1.52,ww,.2,.13,m.suiteWall,.012);

 const window=new T.Group();window.name='suite-window-assembly';g.add(window);
 rounded(window,'suite-window-reveal',wc,1.27,-1.465,ww+.04,2.02,.07,m.darkFrame,.012);
 rounded(window,'suite-window-view',wc,1.27,-1.425,ww-.08,1.92,.018,m.window,.003);
 rounded(window,'suite-window-glazing',wc,1.27,-1.405,ww-.1,1.9,.012,m.suiteGlass,.003);
 for(const x of [left+.04,wc,right-.04])rounded(window,'suite-window-mullion',x,1.27,-1.38,.04,1.98,.045,m.darkFrame,.006);
 rounded(window,'suite-window-crossbar',wc,.96,-1.378,ww-.04,.04,.045,m.darkFrame,.006);
 rounded(window,'suite-window-valance',wc,2.22,-1.32,ww+.08,.13,.14,m.suiteWall,.012);
 for(let i=0;i<5;i++){
  rounded(window,'suite-left-curtain-fold',left-.02+i*.045,1.25,-1.24,.035,1.82,.12,m.suiteCurtain,.012);
  rounded(window,'suite-right-curtain-fold',right+.02-i*.045,1.25,-1.24,.035,1.82,.12,m.suiteCurtain,.012);
 }
 rounded(window,'suite-window-sill',wc,.29,-1.25,ww+.08,.06,.28,m.suiteWood,.012);

 const side=new T.Group();side.name='cutaway-side-wall';side.userData.dynamic=true;g.add(side);
 rounded(side,'suite-warm-side-wall',2.32,1.25,0,.13,2.38,3.1,m.suiteWall,.016);
 rounded(side,'suite-dark-timber-skirting',2.235,.18,0,.045,.12,2.97,m.suiteWood,.009);

 const wardrobe=zone(g,'suite-entry-wardrobe-zone','entry-and-wardrobe');
 rounded(wardrobe,'suite-entry-wardrobe-cabinet',-2.02,.84,.05,.45,1.45,.72,m.suiteWood,.02);
 for(const x of [-2.14,-1.93]){
  rounded(wardrobe,'suite-wardrobe-door-panel',x,.84,.425,.18,1.28,.025,m.oak,.008);
  cylinder(wardrobe,'suite-wardrobe-handle',x+.055,.84,.45,.009,.12,m.brass);
 }
 rounded(wardrobe,'suite-entry-door-panel',-1.8,.98,1.42,.82,1.88,.04,m.walnut,.018);
 for(const x of [-2.26,-1.34])rounded(wardrobe,'suite-entry-door-jamb',x,1.02,1.42,.055,2.04,.08,m.suiteWood,.01);
 rounded(wardrobe,'suite-entry-door-header',-1.8,2.035,1.42,.98,.055,.08,m.suiteWood,.01);
 cylinder(wardrobe,'suite-entry-door-handle',-1.48,.98,1.38,.018,.12,m.brass);

 const living=zone(g,'suite-living-zone','living-room');
 rounded(living,'suite-sofa-wooden-plinth',-1,.31,.16,1.5,.2,.68,m.suiteWood,.035);
 rounded(living,'suite-sofa-seat-cushion',-1,.46,.19,1.43,.16,.64,m.suiteUpholstery,.065);
 rounded(living,'suite-sofa-back-cushion',-1,.77,-.1,1.43,.48,.18,m.suiteUpholstery,.06);
 for(const x of [-1.65,-.35]){
  rounded(living,'suite-sofa-arm',x,.59,.17,.18,.38,.7,m.suiteUpholstery,.055);
  rounded(living,'suite-sofa-back-panel',x,.78,-.08,.28,.42,.13,m.suiteUpholstery,.045);
 }
 rounded(living,'suite-sofa-seat-seam',-1,.55,.2,.02,.015,.48,m.suiteAccent,.004);
 for(let i=0;i<3;i++){
  const x=-1.48+i*.46;
  rounded(living,'suite-sofa-throw-pillow',x,.74,-.005,.3,.23,.09,i===1?m.paper:m.suiteAccent,.035);
 }
 const chaise=new T.Group();chaise.name='suite-window-chaise';chaise.position.set(-1.12,0,-.88);living.add(chaise);
 rounded(chaise,'suite-chaise-plinth',0,.23,0,1.28,.15,.5,m.suiteWood,.025);
 rounded(chaise,'suite-chaise-seat',0,.42,.02,1.24,.24,.48,m.suiteUpholstery,.055);
 rounded(chaise,'suite-chaise-back',0,.65,-.18,1.22,.35,.12,m.suiteUpholstery,.045);
 rounded(chaise,'suite-chaise-cushion',.22,.59,.02,.3,.12,.09,m.paper,.03);
 rounded(living,'suite-coffee-table-top',-.98,.43,.72,.84,.07,.44,m.suiteStone,.025);
 for(const x of [-1.28,-.68])for(const z of [.57,.87])cylinder(living,'suite-coffee-table-leg',x,.27,z,.022,.31,m.brass);
 pottery(living,-.99,.49,.7,.12);
 cylinder(living,'suite-coffee-cup',-.69,.48,.69,.035,.07,m.linen,.038);
 rounded(living,'suite-side-table',-1.9,.4,-.25,.38,.07,.34,m.suiteWood,.018);
 lamp(living,-1.9,.45,-.25);
 contact(living,-1,.15,1.75,1.25,.105);

 const dining=zone(g,'suite-dining-zone','dining');
 cylinder(dining,'suite-round-dining-table-top',-1.76,.52,.79,.29,.055,m.suiteStone,.29);
 cylinder(dining,'suite-round-dining-table-pedestal',-1.76,.3,.79,.055,.42,m.suiteWood);
 rounded(dining,'suite-dining-chair-left-seat',-2.04,.39,1.14,.36,.1,.34,m.suiteUpholstery,.035);
 rounded(dining,'suite-dining-chair-left-back',-2.04,.65,1.29,.36,.42,.08,m.suiteUpholstery,.035);
 rounded(dining,'suite-dining-chair-right-seat',-1.48,.39,1.14,.36,.1,.34,m.suiteUpholstery,.035);
 rounded(dining,'suite-dining-chair-right-back',-1.48,.65,1.29,.36,.42,.08,m.suiteUpholstery,.035);

 const bedroom=zone(g,'suite-bedroom-zone','bedroom');
 rounded(bedroom,'suite-continuous-walnut-headwall',2.17,.9,.25,.14,1.45,2.56,m.suiteWood,.018);
 if(p.bed==='twin'){
  addBed(bedroom,room,-.42,.76,p.level,'suite-twin-bed-left');
  addBed(bedroom,room,.42,.76,p.level,'suite-twin-bed-right');
 }else addBed(bedroom,room,.28,1.72,p.level,'suite-king-bed');
 for(const z of [-1.02,1.28]){
  rounded(bedroom,'suite-bedside-table',1.95,.4,z,.4,.48,.34,m.suiteWood,.018);
  rounded(bedroom,'suite-bedside-drawer',1.95,.48,z+.18,.32,.13,.025,m.oak,.008);
  cylinder(bedroom,'suite-bedside-lamp-base',1.95,.65,z,.095,.025,m.brass);
  cylinder(bedroom,'suite-bedside-lamp-stem',1.95,.77,z,.012,.23,m.brass);
  rounded(bedroom,'suite-bedside-lamp-shade',1.95,.91,z,.18,.16,.17,m.lamp,.025);
 }
 rounded(bedroom,'suite-headboard-art-frame',2.15,1.93,.25,.055,.42,.72,m.suiteWood,.012);
 rounded(bedroom,'suite-headboard-art-canvas',2.115,1.93,.25,.018,.35,.64,m.suiteAccent,.006);
 for(let i=0;i<5;i++)rounded(bedroom,'suite-headboard-art-panel',2.101,1.88,.02+i*.115,.012,.18,.085,i%2?m.paper:m.brass,.004);

 const divider=zone(g,'suite-slatted-divider-zone','open-divider');
 rounded(divider,'suite-divider-bottom-rail',-.08,.32,.04,.07,.07,1.0,m.suiteWood,.012);
 rounded(divider,'suite-divider-top-rail',-.08,1.72,.04,.07,.055,1.0,m.suiteWood,.01);
 for(let i=0;i<8;i++)rounded(divider,'suite-divider-wood-slat',-.08,1.02,-.42+i*.13,.045,1.35,.045,m.suiteWood,.008);

 const bath=zone(g,'suite-bathroom-zone','bathroom');
 rounded(bath,'suite-vanity-cabinet',.78,.43,-1.31,.68,.55,.3,m.suiteWood,.018);
 rounded(bath,'suite-vanity-stone-counter',.78,.73,-1.31,.75,.06,.36,m.suiteStone,.02);
 rounded(bath,'suite-wash-basin',.78,.78,-1.3,.34,.045,.21,m.linen,.04);
 cylinder(bath,'suite-vanity-faucet',.98,.89,-1.32,.012,.2,m.brass);
 rounded(bath,'suite-vanity-mirror-backlight',.78,1.36,-1.46,.74,.84,.025,m.lamp,.025);
 rounded(bath,'suite-vanity-mirror',.78,1.36,-1.435,.64,.74,.018,m.suiteMirror,.018);
 rounded(bath,'suite-bathtub-shell',1.58,.3,-1.02,.83,.34,.5,m.linen,.06);
 rounded(bath,'suite-bathtub-basin',1.58,.475,-1.02,.67,.045,.36,m.suiteStone,.055);
 cylinder(bath,'suite-bathtub-faucet',1.94,.63,-1.16,.012,.25,m.brass);
 rounded(bath,'suite-toilet-base',.45,.29,-.91,.31,.32,.39,m.linen,.07);
 rounded(bath,'suite-toilet-seat',.45,.46,-.91,.32,.055,.4,m.suiteStone,.065);
 rounded(bath,'suite-toilet-tank',.45,.5,-1.24,.29,.4,.13,m.linen,.02);
 rounded(bath,'suite-bathroom-glass-partition',1.28,1.03,-.64,1.82,1.78,.022,m.suiteGlass,.008);
 for(const x of [.38,2.18])rounded(bath,'suite-bathroom-glass-support',x,1.03,-.64,.025,1.82,.04,m.brass,.006);
 rounded(bath,'suite-bathroom-glass-top-rail',1.28,1.95,-.64,1.84,.035,.04,m.brass,.008);
 cylinder(bath,'suite-shower-pipe',2.08,1.42,-1.04,.014,.44,m.brass);
 const showerHead=cylinder(bath,'suite-shower-head',2.0,1.63,-1.04,.065,.025,m.brass);showerHead.rotation.z=Math.PI/2;
 if(p.level>=4){
  rounded(bath,'suite-upgraded-vanity-stone-inlay',.78,.765,-1.31,.54,.018,.25,m.suiteAccent,.008);
  rounded(bath,'suite-mirror-light-trim',.78,1.36,-1.475,.79,.89,.018,m.lamp,.018);
 }
 if(p.level>=3){
  cylinder(living,'suite-floor-lamp-base',-1.82,.16,-.57,.14,.035,m.brass);
  cylinder(living,'suite-floor-lamp-stem',-1.82,.88,-.57,.016,1.4,m.brass);
  rounded(living,'suite-floor-lamp-shade',-1.82,1.62,-.57,.25,.18,.25,m.lamp,.045);
  for(const x of [-2.06,.06])rounded(g,'suite-carpet-edge-long',x,.15,.28,.018,.01,1.65,m.suiteAccent,.003);
  for(const z of [-.54,1.1])rounded(g,'suite-carpet-edge-short',-1,.15,z,1.95,.01,.018,m.suiteAccent,.003);
 }
 if(p.level>=5){
  for(const z of [-1.31,1.34])rounded(g,'suite-ceiling-cove-light',0,2.27,z,4.28,.028,.045,m.lamp,.009);
  for(let i=0;i<7;i++)rounded(wardrobe,'suite-fluted-wardrobe-panel',-2.25,.84,-.25+i*.09,.018,1.22,.025,m.oak,.004);
  for(const z of [-.4,.48]){rounded(bedroom,'suite-gallery-frame',2.15,1.83,z,.045,.32,.26,m.suiteWood,.008);rounded(bedroom,'suite-gallery-art',2.12,1.83,z,.018,.25,.19,m.brass,.004);}
 }
 return g;
}
