import type {PreviewState} from '../state/types';
import {rooms} from '../state/selectors';

/** Pure, read-only consistency audit. Intended for automated tests and support diagnostics.
 * Do not run per simulation minute in production: it scans every guest and entity.
 */
export function gameInvariants(s:Readonly<PreviewState>):string[]{
 const g=s.game;if(!g)return [];
 const violations:string[]=[];
 const bad=(condition:boolean,message:string)=>{if(condition)violations.push(message);};
 const finite=(value:number)=>Number.isFinite(value);
 bad(!finite(s.metrics.cash),'cash is not finite');
 bad(!finite(g.revenue)||g.revenue<0,'daily revenue is invalid');
 bad(!finite(g.expense)||g.expense<0,'daily expense is invalid');
 bad(!Number.isInteger(g.day)||g.day<1,'day is invalid');
 bad(!Number.isInteger(g.minute)||g.minute<0||g.minute>1440,'minute is invalid');
 for(const key of ['stock','clubStock'] as const)bad(!finite(g[key])||g[key]<0,key+' is invalid');
 const guests=new Map(s.guests.map(v=>[v.id,v]));
 bad(guests.size!==s.guests.length,'duplicate guest id');
 for(const f of s.floors){
  for(const id of f.entityIds){
   const e=s.entities[id];
   bad(!e||e.floorId!==f.id,'floor / entity mismatch: '+f.id+'/'+id);
  }
 }
 for(const r of rooms(s)){
  bad(!!r.guestId&&r.status!=='occupied','non-occupied room has guest: '+r.id);
  bad(r.status==='occupied'&&!r.guestId,'occupied room has no guest: '+r.id);
  if(r.guestId){
   const guest=guests.get(r.guestId);
   bad(!guest||guest.roomId!==r.id||!!guest.staff,'room / guest mismatch: '+r.id);
  }
  bad(!finite(r.nightsLeft)||r.nightsLeft<0,'invalid stay remaining: '+r.id);
  if(r.suaBookingId){
   const b=g.operations?.bookings.find(b=>b.id===r.suaBookingId);
   bad(!b||b.roomId!==r.id||!['confirmed','arrived'].includes(b.status),'orphan SUA lock: '+r.id);
  }
 }
 for(const v of s.guests){
  if(v.roomId){
   const r=s.entities[v.roomId];
   bad(r?.kind!=='room'||r.guestId!==v.id||r.status!=='occupied','guest / room mismatch: '+v.id);
  }
 }
 for(const t of g.tasks){
  bad(!finite(t.progress)||t.progress<0||t.progress>t.goal,'task progress outside range: '+t.id);
  bad((t.paid??0)>t.reward,'task reward overpaid: '+t.id);
 }
 if(g.reportOpen)bad(!g.paused,'settled report must pause time');
 return violations;
}
