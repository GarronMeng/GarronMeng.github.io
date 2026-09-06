import type {PreviewState,Guest,Department,Command} from '../state/types';
import {rooms} from '../state/selectors';
import {ensureMovement,stepMovement,recordMovementFrame,travel,hotelTime} from './guestMovement';
import {houseMinutes,engineeringMinutes,supplyCost} from './economy';
import {operationsLog,initOperations} from './operations';
import {track} from './progression';
const names:Record<Department,string>={house:'Housekeeping',engineering:'Engineering',fnb:'F&B',front:'Front Office',revenue:'值班经理'};
function addWorker(s:PreviewState,id:string,role:Department,floorId='floor-lobby'){const worker:Guest={id,name:names[role],tier:'Staff',staff:true,staffRole:role,floorId,thought:'准备接班',color:role==='house'?0xa9b6a0:role==='engineering'?0xcb8b36:0x304b5b,route:[-1,-1],z:1.1};s.guests.push(worker);ensureMovement(s,worker);return worker;}
export function staffAssigned(s:Readonly<PreviewState>,id:string){return s.guests.some(w=>w.staff&&w.job?.target===id);}
function assign(s:PreviewState,w:Guest,kind:NonNullable<Guest['job']>['kind'],target:string,remaining:number){if(w.movement?.steps.length)return false;w.job={kind,target,remaining};travel(s,w,target);w.thought=kind==='clean'?'推车去翻房':kind==='repair'?'带工具去检查':kind==='stock'?'补货送到餐台':kind==='front'?'接待下一位住客':'巡场检查';operationsLog(s,w.name+' 已接单。','部门',target);return true;}
export function tickWorkforce(s:PreviewState,execute:(c:Command)=>void,pay:(n:number)=>boolean){const g=s.game!,o=initOperations(s);
 for(const role of Object.keys(names) as Department[]){const count=g.managers[role]?(role==='house'||role==='engineering'?g.managers[role]:1):0;for(let i=0;i<count;i++){const id='staff-'+role+'-'+i;if(!s.guests.some(w=>w.id===id))addWorker(s,id,role,role==='fnb'?'floor-breakfast':'floor-lobby');}}
 const manual=rooms(s).find(r=>r.timer&&!r.construction&&!staffAssigned(s,r.id));if(manual){let w=s.guests.find(w=>w.id==='staff-duty');if(!w)w=addWorker(s,'staff-duty','house');if(!w.job&&!w.movement?.steps.length){assign(s,w,manual.status==='maintenance'?'repair':'clean',manual.id,manual.timer!);}}
 for(const w of s.guests.filter(w=>w.staffRole)){ensureMovement(s,w);stepMovement(s,w);recordMovementFrame(w);if(w.movement!.steps.length)continue;
  if(w.job){const job=w.job,target=s.entities[job.target];if(job.kind==='clean'||job.kind==='repair'){if(target?.kind!=='room'||target.construction||!['dirty','cleaning','maintenance'].includes(target.status)){w.job=undefined;continue;}target.timer=job.remaining;}
   w.thought={clean:'正在更换床品',repair:'正在检查空调',stock:'正在补 buffet',front:'正在核对房卡',patrol:'巡场检查中'}[job.kind];
   if(--job.remaining>0)continue;
   if((job.kind==='clean'||job.kind==='repair')&&target?.kind==='room'){target.timer=undefined;target.status=target.suaBookingId?'reserved':'available';g.events=g.events.filter(e=>!(e.kind==='repair'&&e.target===target.id));track(s,'service');o.hkCompleted+=job.kind==='clean'?1:0;operationsLog(s,target.number+' '+(job.kind==='clean'?'床品已刷新，恢复可售。':'故障修复，恢复可售。'),'房态',target.id);}
   if(job.kind==='stock'){const key=job.target==='facility-club'?'clubStock':'stock';g[key]+=40;g.events=g.events.filter(e=>!(e.kind==='supplies'&&e.target===job.target));o.stockDelivered++;operationsLog(s,w.name+' 已将 40 份餐饮送上餐台。','部门',job.target);}
   if(job.kind==='front'){const guest=s.guests.find(v=>!v.staff&&!v.roomId&&!v.departing);if(guest){const locked=o.bookings.find(b=>b.id===guest.reservationId)?.roomId;const available=rooms(s).filter(r=>(r.status==='available'||r.status==='reserved'&&(r.suaBookingId===guest.reservationId||!r.suaBookingId&&guest.tier==='Globalist'))&&!r.construction);const suites=available.filter(r=>r.type==='suite'&&r.category!=='premium');const r=locked?available.find(r=>r.id===locked):guest.tier==='Globalist'?(suites[0]??available[0]):available.find(r=>!(o.suitePolicy==='hold'&&suites.length<=1&&suites.includes(r)));if(r)execute({type:'checkin',id:guest.id,roomId:r.id});}}
   track(s,'delegate');w.job=undefined;w.thought='处理完成，准备下一单';w.movement!.nextDecision=hotelTime(s)+20;continue;
  }
  const role=w.staffRole!;
  if(role==='house'&&g.managers.house&&w.id!=='staff-duty'){const r=rooms(s).find(r=>r.status==='dirty'&&!r.construction&&!staffAssigned(s,r.id));if(r&&assign(s,w,'clean',r.id,houseMinutes(g.managers.house))){r.status='cleaning';continue;}}
  if(role==='engineering'&&g.managers.engineering){const r=rooms(s).find(r=>r.status==='maintenance'&&!r.construction&&!staffAssigned(s,r.id));if(r&&s.metrics.cash>=100){if(assign(s,w,'repair',r.id,engineeringMinutes(g.managers.engineering)))pay(100);continue;}}
  if(role==='fnb'&&g.managers.fnb){const id=g.stock<20?'facility-breakfast':g.clubStock<20?'facility-club':null;if(id&&!staffAssigned(s,id)&&s.metrics.cash>=supplyCost(g.managers.fnb)){if(assign(s,w,'stock',id,8))pay(supplyCost(g.managers.fnb));continue;}}
  if(role==='front'&&g.managers.front&&s.guests.some(v=>!v.staff&&!v.roomId&&!v.departing)){assign(s,w,'front','facility-lobby',Math.max(2,7-g.managers.front));continue;}
  if(role==='revenue'&&hotelTime(s)>=w.movement!.nextDecision){const facilities=Object.values(s.entities).filter(e=>e.kind==='facility'&&!e.construction),target=facilities[Math.floor(g.minute/60)%facilities.length];if(target)assign(s,w,'patrol',target.id,10);}
 }
}
