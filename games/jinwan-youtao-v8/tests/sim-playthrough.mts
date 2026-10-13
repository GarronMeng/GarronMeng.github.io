import {newGame,execute,advanceGame,queue,clock} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {openingGoal} from '../src/core/onboarding';
import {describeDilemma,lateConflict,walkinDisplaces} from '../src/core/dilemmas';
const s=newGame({guided:process.env.FREE?false:true}),g=s.game!;let lastStep=-1;
const say=(t:string)=>console.log(`D${g.day} ${clock(g.minute)} | ${t}`);
for(let tick=0;tick<7*1440/15&&g.day<=7;tick++){
 const lesson=openingGoal(s);if((g.onboarding?.step??0)!==lastStep){lastStep=g.onboarding!.step;say('STEP '+lastStep+' '+(lesson?lesson.title+(lesson.waiting?' (waiting)':''):'DONE'));}
 if(g.reportOpen){say(`settle rev ${g.reports.at(-1)!.revenue} exp ${g.reports.at(-1)!.expense} occ ${g.reports.at(-1)!.occupancy}% cash ${s.metrics.cash} morale ${g.morale} rep ${s.metrics.reputation}`);execute(s,{type:'continue'});}
 if(g.operations?.briefOpen){if(g.day>=3)execute(s,{type:'day-plan',value:'occupancy'});if(g.echoes?.some(e=>e.day===g.day))say('ECHO '+g.echoes.filter(e=>e.day===g.day).map(e=>e.text).join(' / '));execute(s,{type:'brief-start'});}
 if(g.evening?.open){say('evening decisions: '+(g.evening.decisions??[]).map(d=>d.title+'→'+d.choice+' ('+d.result+')').join(' || '));execute(s,{type:'evening-close'});}
 for(const v of queue(s)){if(walkinDisplaces(s,v)){execute(s,{type:'reject',id:v.id});continue;}const r=rooms(s).find(r=>r.suaBookingId&&r.suaBookingId===v.reservationId)??rooms(s).find(r=>r.status==='available');if(r)execute(s,{type:'checkin',id:v.id,roomId:r.id});}
 for(const r of rooms(s).filter(r=>r.status==='dirty'))if(!g.managers.house)execute(s,{type:'clean',id:r.id});
 if(g.day>=2&&g.stock<60)execute(s,{type:'stock',id:'breakfast'});if(g.day>=2&&g.clubStock<30)execute(s,{type:'stock',id:'club'});for(const e of [...g.events])execute(s,{type:'resolve',id:String(e.id),value:g.managers[e.kind==='repair'?'engineering':e.kind==='supplies'?'fnb':'front']?'sop':'gm'});
 if(g.day>=2&&!g.managers.house)execute(s,{type:'hire',id:'house'});
 for(const v of s.guests.filter(v=>v.late==='pending'&&v.roomId))execute(s,{type:'late',id:v.id,value:lateConflict(s,v).short?'deny':'honor'});
 for(const d of [...(g.dilemmas??[])]){const view=describeDilemma(s,d);say(`DILEMMA ${d.kind}: ${view.title} | ${view.situation} | rec=${view.recommend}`);execute(s,{type:'dilemma',id:String(d.id),value:view.recommend});say('  -> '+g.notice);}
 if(g.spotlight){say('SPOTLIGHT '+JSON.stringify(g.spotlight));g.spotlight=undefined;}
 const rb=s.metrics.reputation,lb=g.logs.length;advanceGame(s,15);if(process.env.REP&&s.metrics.reputation<rb)say('REP '+rb+'→'+s.metrics.reputation+' '+g.logs.slice(lb).map(l=>l.text.slice(0,40)).join(' / '));
}
console.log('lost bookings', g.reports.map(r=>r.bookingsLost), 'decisions', g.decisions?.length, 'followups pending', g.followups?.length);
