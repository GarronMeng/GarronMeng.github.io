import type {PreviewState,EveningReview} from '../state/types';
import {rooms} from '../state/selectors';
export function captureEvening(s:PreviewState){const g=s.game!;if(g.minute<1200||g.evening?.day===g.day)return;
 const rs=rooms(s),guests=s.guests.filter(v=>!v.staff&&v.roomId&&!v.departing),occupied=guests.length,dirty=rs.filter(r=>r.status==='dirty'||r.status==='cleaning').length,pending=g.events.length+s.guests.filter(v=>!v.departing&&(v.late==='pending'||v.challenge&&!v.challenge.resolved)).length;
 const roomRevenue=guests.reduce((n,v)=>n+(v.rate??g.price),0),commission=guests.filter(v=>v.source==='平台').reduce((n,v)=>n+Math.round((v.rate??g.price)*.15),0),fixed=380+rs.length*65+Object.values(g.managers).reduce((n,l)=>n+l*180,0);
 const notes:EveningReview['notes']=[];
 if(pending)notes.push({title:'先接住还未解决的诉求',text:`还有 ${pending} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:'events'});
 if(g.operations?.lostBookings)notes.push({title:'减少无法兑现的预订',text:`今天 ${g.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:'bookings'});
 if(dirty)notes.push({title:'夜班先把房间交出来',text:`还有 ${dirty} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:'hotel'});
 if(g.stock<20||g.clubStock<20)notes.push({title:'补足餐饮库存',text:`早餐 ${g.stock} 份、酒廊 ${g.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:'operations'});
 const occupancy=Math.round(occupied/Math.max(1,rs.length)*100),expected=g.operations?.forecast?.occupancy;
 if(expected!==undefined&&occupancy<expected-15)notes.push({title:'入住低于晨会预估',text:`当前 ${occupancy}%，预估 ${expected}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:'bookings'});
 if(!notes.length)notes.push({title:'守住今天的服务节奏',text:'暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。',target:'history'});
 g.evening={day:g.day,minute:g.minute,open:true,occupancy,expected,arrivals:g.arrivals,revenue:g.revenue,expense:g.expense,roomRevenue,projectedNet:g.revenue+roomRevenue-g.expense-commission-fixed,pending,complaints:g.complaints,logs:g.logs.filter(l=>l.day===g.day&&l.category==='客诉').map(l=>({...l})),notes:notes.slice(0,4)};g.paused=true;
}
