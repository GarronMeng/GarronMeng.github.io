import type {Guest,PreviewState,WalkPoint} from '../state/types';
const CORRIDOR=2.12,LIFT=7.94;
export const hotelTime=(s:Readonly<PreviewState>)=>s.game!.day*1440+s.game!.minute;
export function ensureMovement(s:PreviewState,g:Guest){
 if(g.staff||g.movement)return;
 const level=Math.max(0,s.floors.findIndex(f=>f.id===g.floorId));
 const position:WalkPoint={x:(g.route[0]+g.route[1])/2,z:g.z??1.12,level,phase:g.roomId&&s.entities[g.roomId]?.floorId===g.floorId?'room':'public'};
 g.movement={position,steps:[],destination:g.roomId&&position.phase==='room'?g.roomId:'facility-'+(s.floors[level]?.role??'lobby'),arrived:true,nextDecision:hotelTime(s)+20+hash(g.id)%75,trail:[],revision:0};
}
export function hash(id:string){let n=0;for(const c of id)n=(Math.imul(n,31)+c.charCodeAt(0))>>>0;return n;}
/** All vertical waypoints lie inside the glazed lift. Never interpolate across rooms. */
export function travel(s:PreviewState,g:Guest,destination:string){ensureMovement(s,g);const m=g.movement!;if(m.steps.length)return false;
 const entity=s.entities[destination],exit=destination==='exit';if(!entity&&!exit)return false;
 const level=exit?0:s.floors.findIndex(f=>f.id===entity.floorId),p=m.position;
 const x=exit?5.8:entity.kind==='room'?(Number(entity.number)%100-2)*4.93: -5.7+(hash(g.id+destination)%12)*.95;
 const z=exit?2.8:1.25;
 const points:WalkPoint[]=[];const add=(x:number,z:number,level:number,phase:WalkPoint['phase'])=>points.push({x,z,level,phase});
 add(p.x,CORRIDOR,p.level,'corridor');
 if(Math.abs(level-p.level)>.001){add(LIFT,CORRIDOR,p.level,'corridor');add(LIFT,.9,p.level,'elevator');add(LIFT,.9,level,'elevator');add(LIFT,CORRIDOR,level,'corridor');}
 add(x,CORRIDOR,level,'corridor');add(x,z,level,exit?'exit':entity.kind==='room'?'room':'public');
 m.steps=points;m.destination=destination;m.arrived=false;m.nextDecision=hotelTime(s)+60;g.visitUntil=undefined;return true;
}
export function stepMovement(s:PreviewState,g:Guest){const m=g.movement;if(!m||!m.steps.length)return false;
 const target=m.steps[0],p=m.position,dx=target.x-p.x,dz=target.z-p.z,dy=(target.level-p.level)*2.55,dist=Math.hypot(dx,dz,dy),speed=dy!==0?.85:.65;
 p.phase=target.phase;
 if(dist<=speed){m.position={...target};m.steps.shift();}else{const f=speed/dist;p.x+=dx*f;p.z+=dz*f;p.level+=dy/2.55*f;}
 // floorId follows arrival at an actual floor, never a destination assignment.
 if(Number.isInteger(m.position.level))g.floorId=s.floors[m.position.level]?.id??g.floorId;
 g.route=[m.position.x,m.position.x];g.z=m.position.z;
 if(!m.steps.length){m.arrived=true;m.nextDecision=hotelTime(s)+45+hash(g.id+hotelTime(s))%65;return true;}return false;
}
export function beginMovementFrame(s:PreviewState){for(const g of s.guests){ensureMovement(s,g);if(g.movement){g.movement.trail=[{...g.movement.position}];g.movement.revision++;}}}
export function recordMovementFrame(g:Guest){if(g.movement)g.movement.trail.push({...g.movement.position});}
/** Inserting a floor moves existing public floors and passengers with the structure. */
export function shiftMovementFloors(s:PreviewState,index:number){for(const g of s.guests){const m=g.movement;if(!m)continue;for(const p of [m.position,...m.steps,...m.trail])if(p.level>=index)p.level++;}}
