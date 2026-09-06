import type {PreviewState,Guest,GuestProfile,Booking,Forecast,Command} from '../state/types';
import {rooms} from '../state/selectors';
import {standardSuite} from '../content/roomTypes';
import {hotelTime,hash,travel} from './guestMovement';
import {cue} from './guestDialogue';
import {stayNights} from './guestRequests';
import {track} from './progression';
export const EXTERNAL={normal:'常规营业日',expo:'会展开放 · 商旅和团队集中到店',flights:'航班延误 · 晚间临时住宿增加',storm:'暴雨预警 · 屋顶关闭，室内客流上升'};
export function initOperations(s:PreviewState){const g=s.game!;if(g.operations)return g.operations;g.operations={day:0,briefOpen:false,event:'normal',bookings:[],profiles:{},suitePolicy:'sell',lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};
 for(const guest of s.guests.filter(g=>!g.staff)){const id=guest.profileId??'history-'+guest.id;guest.profileId=id;g.operations.profiles[id]={id,name:guest.name,persona:guest.persona??'chill',tier:guest.tier,visits:0,trust:0,spend:0,history:[]};}
 return g.operations;
}
export function operationsLog(s:PreviewState,text:string,category:'部门'|'入住'|'收益'|'客诉'|'升级'|'房态'='部门',target?:string){const g=s.game!;g.notice=text;g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category,text,target});}
export function newProfile(s:PreviewState,roll:number):GuestProfile{const o=initOperations(s),id='profile-'+s.game!.nextId++,n=hash(id),personas=['chill','road','family','points','hunter','forum','creator','proposal','planner','whale','auditplus'] as const;
 const profile:GuestProfile={id,name:['陈','林','周','何','张','李','赵','王'][n%8]+['宇航','子衡','明远','嘉树','景行','一帆','致远','承泽'][Math.floor(n/8)%8],persona:personas[n%11],tier:roll<.27?'Globalist':roll<.5?'Explorist':roll<.8?'Member':'普通客',visits:0,trust:0,spend:0,history:[]};o.profiles[id]=profile;return profile;}
export function walkinEstimate(s:Readonly<PreviewState>,price=s.game!.price){const g=s.game!,o=g.operations,weekend=(g.day-1)%7>=5;
 const positioning=g.positioning==='business'?(weekend?.75:1.3):g.positioning==='resort'?(weekend?1.4:.9):1.1;
 return Math.max(1,Math.round((3+rooms(s).length*.12)*positioning*(o?.event==='flights'?1.8:o?.event==='expo'?1.4:1)*(g.weather==='rain'?.8:1)*(g.development&&g.development.campaignUntil>=g.day?1.35:1)*Math.max(.3,Math.min(1.5,720/price))));}
export function forecast(s:Readonly<PreviewState>):Forecast{const g=s.game!,o=g.operations!,bookings=o.bookings.filter(b=>b.status!=='lost'),remaining=bookings.filter(b=>b.status==='confirmed'),resident=s.guests.filter(v=>v.roomId&&!v.departing),stayovers=resident.filter(v=>(v.checkoutDay??g.day)>g.day).length,checkouts=resident.length-stayovers,walkins=walkinEstimate(s),capacity=rooms(s).filter(r=>!r.construction).length;
 const expected=Math.min(capacity,stayovers+remaining.length+Math.max(0,walkins-o.walkinArrivals));const party=(v:Guest)=>v.persona==='family'?3:1;
 return {occupancy:Math.round(expected/Math.max(1,capacity)*100),walkins,breakfast:resident.reduce((a,v)=>a+party(v),0),housekeeping:checkouts+rooms(s).filter(r=>r.status==='dirty'||r.status==='cleaning').length,suites:remaining.filter(b=>o.profiles[b.profileId]?.tier==='Globalist').length,club:Math.round(expected*.65),business:bookings.filter(b=>b.segment==='商务').length,resort:bookings.filter(b=>b.segment==='度假').length,group:bookings.filter(b=>b.segment==='团队').length,price:g.price};}
export function prepareMorning(s:PreviewState,open=true){const g=s.game!,o=initOperations(s);if(o.day===g.day){if(open)o.briefOpen=true;return;}o.day=g.day;o.bookings=[];o.forecast=undefined;o.lostBookings=o.confirmedArrivals=o.walkinArrivals=o.hkCompleted=o.stockDelivered=0;
 // A separate seeded draw keeps the confirmed book stable while the player compares prices.
 let seed=(g.seed^Math.imul(g.day,2654435761))>>>0;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const roll=rand();o.event=roll<.2?'expo':roll<.35?'flights':roll<.5?'storm':'normal';if(o.event==='storm')g.weather='rain';
 const capacity=rooms(s).filter(r=>!r.construction).length,remaining=capacity-s.guests.filter(v=>v.roomId&&(v.checkoutDay??g.day)>g.day).length;
 const count=Math.max(2,Math.min(capacity+2,Math.round(remaining*(o.event==='expo'?1.15:.7))));const profiles=Object.values(o.profiles).filter(p=>p.visits>0&&!s.guests.some(g=>g.profileId===p.id));const used=new Set<string>();
 for(let i=0;i<count;i++){let p=profiles.find(p=>!used.has(p.id)&&rand()<.5);if(!p)p=newProfile(s,rand());used.add(p.id);
  const source:Booking['source']=o.event==='expo'&&i<Math.ceil(count*.35)?'团单':rand()<.6?'APP':'平台';const holiday=g.positioning==='resort'||((g.day-1)%7>=5&&rand()<.6);
  const b:Booking={id:'booking-'+g.nextId++,profileId:p.id,source,eta:source==='团单'?840:780+Math.floor(rand()*330),nights:stayNights(holiday,rand(),rand()),rate:Math.round(g.price*(source==='团单'?.88:1)),segment:source==='团单'?'团队':holiday?'度假':'商务',status:'confirmed'};
  if(i<2){b.challenge=p.persona==='auditplus'?'audit':p.persona==='family'?'family':p.tier==='Globalist'?'sua':'quiet';}
  if(b.challenge==='sua'){const r=rooms(s).find(r=>standardSuite(r)&&r.status==='available'&&!r.suaBookingId);if(r){b.sua=true;b.roomId=r.id;r.suaBookingId=b.id;r.status='reserved';}else b.challenge='quiet';}
  o.bookings.push(b);
 }
 // Loyal guests can bring a friend on a real, separately tracked booking.
 const advocate=profiles.find(p=>p.trust>=2&&p.visits>=2);if(advocate&&remaining>o.bookings.length){const p=newProfile(s,rand());p.referredBy=advocate.id;o.bookings.push({id:'booking-'+g.nextId++,profileId:p.id,source:'APP',eta:900,nights:1,rate:g.price,segment:'商务',status:'confirmed'});}
 o.briefOpen=open;o.forecast=forecast(s);if(open)g.paused=true;operationsLog(s,`早班准备：${o.bookings.length} 笔确认预订，${EXTERNAL[o.event]}。`);
}
export function bookingArrivals(s:PreviewState,arrive:(b:Booking)=>void){const o=initOperations(s);for(const b of o.bookings)if(b.status==='confirmed'&&s.game!.minute>=b.eta){b.status='arrived';o.confirmedArrivals++;arrive(b);}}
export function attachProfile(s:PreviewState,g:Guest,b?:Booking){const o=initOperations(s);let p=b?o.profiles[b.profileId]:undefined;if(!p)p=newProfile(s,(hash(g.id)%100)/100);
 g.profileId=p.id;g.name=p.name;g.persona=p.persona;g.tier=p.tier;g.source=b?.source??'Walk-in';g.reservationId=b?.id;g.bookedRate=b?.rate;g.sua=!!b?.sua;g.spend=0;
 if(b){g.segment=b.segment;g.stayLength=b.nights;if(b.challenge)g.challenge={kind:b.challenge,resolved:false};}else o.walkinArrivals++;
 g.satisfaction=Math.max(65,Math.min(98,88+p.trust*2));
}
export function loseBooking(s:PreviewState,g:Guest){const o=initOperations(s),b=o.bookings.find(b=>b.id===g.reservationId);if(!b||b.status==='lost'||b.status==='checkedin')return;b.status='lost';o.lostBookings++;s.metrics.cash-=600;s.game!.expense+=600;s.metrics.reputation=Math.max(0,s.metrics.reputation-2);operationsLog(s,g.name+' 的确认预订未兑现：安置补偿 ¥600，口碑 -2。','客诉','facility-lobby');
 if(b.roomId){const r=s.entities[b.roomId];if(r?.kind==='room'&&r.suaBookingId===b.id){r.suaBookingId=undefined;if(r.status==='reserved')r.status='available';}}
}
export function guestStory(s:PreviewState,g:Guest){const o=initOperations(s),p=o.profiles[g.profileId??''];if(!p)return;const good=(g.satisfaction??90)>=90&&(!g.challenge||g.challenge.outcome==='需求已兑现')&&!g.denied;
 p.visits++;p.trust=Math.max(-3,Math.min(5,p.trust+(good?1:-1)));p.spend+=g.spend??0;
 const text=good?(p.trust>=2?'连续服务满意：这家以后可以常住，愿意介绍朋友。':'留下好 DP：下次愿意再来。'):g.denied?'没拿到套房：App 上明明还有套？下次还会记得。':'留下差 DP：这次的问题没有完整解决。';p.history.push({day:s.game!.day,text});p.history=p.history.slice(-8);
 if(!good){s.metrics.reputation=Math.max(0,s.metrics.reputation-2);}else{s.metrics.reputation=Math.min(100,s.metrics.reputation+1);}operationsLog(s,p.name+'：'+text,'入住');
}
export function operationsCommand(s:PreviewState,c:Command){const g=s.game!,o=initOperations(s);
 if(c.type==='brief-start'){if(!o.briefOpen)return true;o.forecast=forecast(s);o.briefOpen=false;g.paused=false;operationsLog(s,`晨会决策已确认：Walk-in 挂牌 ¥${g.price}，预计入住率 ${o.forecast.occupancy}%。`);return true;}
 if(c.type==='suite-policy'){o.suitePolicy=c.value==='hold'?'hold':'sell';operationsLog(s,o.suitePolicy==='hold'?'前厅指令：保留最后一间标准套房给会员。':'前厅指令：标准套房开放销售；已锁 SUA 不变。');return true;}
 if(c.type==='guest-choice'){const guest=s.guests.find(v=>v.id===c.id),request=guest?.challenge;if(!guest||!request||request.resolved)return true;if(!guest.roomId){g.notice='先办理入住，再落实住客的特殊安排。';return true;}
  const appropriate=(request.kind==='quiet'&&c.value==='quiet')||(request.kind==='family'&&c.value==='family')||(request.kind==='audit'&&c.value==='inspect')||(request.kind==='sua'&&c.value==='inventory');const cost=c.value==='decline'?0:appropriate?180:100;
  if(s.metrics.cash<cost){g.notice='预算不足，暂无法安排。';return true;}s.metrics.cash-=cost;g.expense+=cost;request.resolved=true;
  let success=appropriate&&(request.kind!=='sua'||!!guest.upgrades);
  if(appropriate&&request.kind==='family'){success=g.stock>=6;if(success){g.stock-=6;const r=s.entities[guest.roomId??''];if(r?.kind==='room')r.extraBed=true;}}
  if(appropriate&&request.kind==='audit')success=!!g.managers.house&&!!g.managers.engineering&&!rooms(s).some(r=>r.status==='maintenance'&&!r.construction);
  if(appropriate&&request.kind==='quiet'){const old=s.entities[guest.roomId??''];const noisy=old&&s.floors.some(f=>f.construction&&Math.abs(f.number-(s.floors.find(f=>f.id===old.floorId)?.number??0))<=1);if(noisy){const next=rooms(s).find(r=>r.status==='available'&&!r.construction&&!s.floors.some(f=>f.construction&&Math.abs(f.number-(s.floors.find(f=>f.id===r.floorId)?.number??0))<=1));success=!!next;if(next&&old.kind==='room'){old.status='dirty';old.guestId=undefined;old.nightsLeft=0;next.status='occupied';next.guestId=guest.id;next.nightsLeft=Math.max(0,(guest.checkoutDay??g.day)-g.day);guest.roomId=next.id;if(!guest.movement?.steps.length)travel(s,guest,next.id);}}}
  guest.serviceDone=success;guest.satisfaction=Math.max(0,Math.min(100,(guest.satisfaction??90)+(success?8:-8)));request.outcome=success?'需求已兑现':'未解决核心诉求';track(s,'resolve');cue(s,guest,success?'recovery':'denied');operationsLog(s,guest.name+'：'+request.outcome+'，支出 ¥'+cost+'。',success?'部门':'客诉',guest.roomId??'facility-lobby');return true;
 }return false;
}
