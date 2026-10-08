import type {PreviewState,Guest,Command} from '../state/types';
import {rooms} from '../state/selectors';
import {standardSuite} from '../content/roomTypes';
import {queueTravel} from './guestMovement';
import {cue} from './guestDialogue';
import {track} from './progression';
import {operationsLog} from './operations';
export function birthdayOptions(s:Readonly<PreviewState>,v:Guest){
 const g=s.game!,free=rooms(s).filter(r=>standardSuite(r)&&r.status==='available'&&!r.construction&&!r.suaBookingId);
 const promised=g.operations?.bookings.filter(b=>b.status==='confirmed'&&!b.sua&&g.operations?.profiles[b.profileId]?.tier==='Globalist').length??0;
 const reserve=Math.max(promised,g.operations?.suitePolicy==='hold'?1:0),current=s.entities[v.roomId??''];
 const suite=current?.kind==='room'&&standardSuite(current)?undefined:free.length>reserve?free[0]:undefined;
 return {suite,free:free.length,reserve,breakfast:g.stock>=2,alreadySuite:current?.kind==='room'&&standardSuite(current)};
}
export function hospitalityCommand(s:PreviewState,c:Command){
 if(c.type!=='birthday-choice')return false;
 const g=s.game!,v=s.guests.find(v=>v.id===c.id&&!v.departing),occasion=v?.occasion;
 if(!v?.roomId||!occasion||occasion.resolved){g.notice='先办理入住；已处理的生日安排无需重复选择。';return true;}
 if(!['breakfast','suite','card','decline'].includes(String(c.value)))return true;
 const options=birthdayOptions(s,v),cost=c.value==='breakfast'?160:c.value==='suite'?280:0;
 if(c.value==='breakfast'&&!options.breakfast){g.notice='早餐库存不足两份；先补货，或选择生日祝福。';return true;}
 if(c.value==='suite'&&!options.suite){g.notice='没有可赠送的标准套房；确认预订与预留优先，仍可选择其他礼遇。';return true;}
 if(s.metrics.cash<cost){g.notice='礼遇预算不足；可以先送一张手写生日卡。';return true;}
 s.metrics.cash-=cost;g.expense+=cost;
 if(c.value==='breakfast'){g.stock-=2;v.birthdayBreakfast=2;s.metrics.owner=Math.max(0,s.metrics.owner-1);}
 if(c.value==='suite'){
  const old=s.entities[v.roomId];if(old.kind==='room'){old.status='dirty';old.guestId=undefined;old.nightsLeft=0;}
  const r=options.suite!;r.status='occupied';r.guestId=v.id;r.nightsLeft=Math.max(0,(v.checkoutDay??g.day+1)-g.day);v.roomId=r.id;v.upgrades=true;v.denied=false;g.upgrades++;s.metrics.owner=Math.max(0,s.metrics.owner-2);queueTravel(s,v,r.id);
 }
 const delta=c.value==='breakfast'?8:c.value==='suite'?12:c.value==='card'?2:-3;
 v.satisfaction=Math.max(0,Math.min(100,(v.satisfaction??88)+delta));occasion.resolved=true;occasion.choice=String(c.value);
 const text=c.value==='breakfast'?'生日早餐已确认，两个人一起吃很开心。':c.value==='suite'?'生日这晚真的住进 Standard Suite，房费也没变。':c.value==='card'?'收到手写生日卡，Front Office 记得这一天。':'今天按原预订入住，生日没有特别安排。';
 occasion.outcome=text;cue(s,v,'birthday');track(s,'resolve');
 const profile=g.operations?.profiles[v.profileId??''];if(profile){profile.history.push({day:g.day,text});profile.history=profile.history.slice(-8);}
 operationsLog(s,v.name+'：'+text+' 支出 ¥'+cost+'。','部门',v.roomId);return true;
}
