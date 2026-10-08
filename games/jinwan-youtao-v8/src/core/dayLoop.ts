import {openingGoal} from './onboarding';
import type {PreviewState,Command,DailyPlan,Department} from '../state/types';
import {rooms} from '../state/selectors';
import {forecast,operationsLog} from './operations';
import {campaignGoal} from './campaign';
export const DAY_PLANS={occupancy:{name:'稳健接客',price:720,hold:false,description:'用适中房价接住需求，套房开放销售。',risk:'客流更多，翻房和前台压力也更大。'},experience:{name:'照顾体验',price:720,hold:true,description:'留一间会员套房，早餐与酒廊各预备 20 份。',risk:'预采购 ¥240；留套会减少付费销售空间。'},margin:{name:'争取利润',price:850,hold:false,description:'提高挂牌价，保留套房付费销售机会。',risk:'Walk-in 会减少，已确认订单不会跟着涨价。'}} as const;
export function initDayPlan(s:PreviewState){const g=s.game!;if(g.plan?.day===g.day)return g.plan;return g.plan={day:g.day,focus:'occupancy',selected:false,prepared:false,target:0};}
export function planTarget(s:Readonly<PreviewState>,focus:DailyPlan['focus']){
 const g=s.game!,f=forecast(s),rs=rooms(s),fixed=380+rs.length*65+Object.values(g.managers).reduce((n,l)=>n+l*180,0);
 if(focus==='experience')return 90;
 if(focus==='occupancy')return Math.max(40,Math.min(90,Math.floor(f.occupancy*.9/5)*5));
 const resident=s.guests.filter(v=>v.roomId&&!v.departing),bookings=g.operations!.bookings.filter(b=>b.status==='confirmed'),rates=[...resident.map(v=>v.rate??g.price),...bookings.map(b=>b.rate)],avg=rates.length?rates.reduce((a,b)=>a+b,0)/rates.length:g.price;
 return Math.max(0,Math.floor((rs.length*f.occupancy/100*avg*.9-fixed-g.expense)*.8/100)*100);
}
export function commitDayPlan(s:PreviewState){const plan=initDayPlan(s);plan.target=planTarget(s,plan.focus);plan.review=undefined;}
export function dayPlanCommand(s:PreviewState,c:Command){
 if(c.type!=='day-plan')return false;const g=s.game!,p=initDayPlan(s),id=String(c.value) as DailyPlan['focus'];
 if(!Object.hasOwn(DAY_PLANS,id)||!g.operations?.briefOpen){g.notice='经营方向在早班晨会确定，营业后可继续处理具体决定。';return true;}
 const option=DAY_PLANS[id],cost=id==='experience'&&!p.prepared?240:0;
 if(s.metrics.cash<cost){g.notice='预采购需要 ¥240；也可以维持现有安排。';return true;}
 if(cost){s.metrics.cash-=cost;g.expense+=cost;g.stock+=20;g.clubStock+=20;p.prepared=true;}
 p.focus=id;p.selected=true;g.price=option.price;g.operations.suitePolicy=option.hold?'hold':'sell';p.target=planTarget(s,id);
 operationsLog(s,'晨会方向：'+option.name+'。挂牌 ¥'+g.price+'，'+(option.hold?'保留一间会员套房':'套房开放销售')+(cost?'，餐台预采购 ¥240':'')+'。');return true;
}
export function reviewDayPlan(s:PreviewState,net:number,phase:'evening'|'settled'){
 const g=s.game!,p=initDayPlan(s),residents=s.guests.filter(v=>!v.staff&&v.roomId&&!v.departing),occupancy=Math.round(residents.length/Math.max(1,rooms(s).length)*100),experience=residents.length?Math.round(residents.reduce((n,v)=>n+(v.satisfaction??90),0)/residents.length):0;
 const actual=p.focus==='occupancy'?occupancy:p.focus==='experience'?experience:Math.round(net),success=actual>=p.target&&(p.focus!=='experience'||residents.length>0);
 p.review={actual,target:p.target,focus:p.focus,success,phase,lesson:p.focus==='occupancy'?(success?'房间接住了需求。扩建前再看明天是否持续满房。':'先核对拒客、空房与翻房积压，再考虑降低报价。'):p.focus==='experience'?(success?'住客体验守住了。把兑现承诺的方式交给主管。':'回看未兑现的诉求和断供；送礼不能替代实际服务。'):(success?'利润目标达到。保留明天的工资、翻房和备餐资金。':'高价没有自动变成利润。先分清客流不足与额外支出。')};return {...p.review};
}
export const planValue=(focus:DailyPlan['focus'],n:number)=>focus==='margin'?'¥'+Math.round(n).toLocaleString('en-US'):Math.round(n)+(focus==='occupancy'?'%':' 分');
export function nextDecision(s:Readonly<PreviewState>):{title:string;why:string;target:string;department:Department;entity?:string}{
 const g=s.game!,rs=rooms(s),waiting=s.guests.filter(v=>!v.staff&&!v.roomId&&!v.departing),dirty=rs.find(r=>r.status==='dirty'),requests=s.guests.filter(v=>!v.departing&&v.roomId&&(v.late==='pending'||v.challenge&&!v.challenge.resolved||v.occasion&&!v.occasion.resolved));
 if(g.reportOpen)return {title:'把今天的结果带进明天',why:'房费已结算，先看判断是否奏效，再安排下一天。',target:'report',department:'revenue'};
 if(g.operations?.briefOpen)return {title:'先确定今天的经营方向',why:'比较接客、体验与利润的取舍，确认后开始营业。',target:'brief',department:'revenue'};
 const lesson=openingGoal(s);if(lesson)return {title:lesson.title,why:lesson.why,target:lesson.target,department:lesson.department};
 if(g.events.length)return {title:g.events[0].title,why:'现场问题有处理时限，先避免小问题变成客诉。',target:'events',department:'front'};
 if(waiting.length)return {title:'接住 '+waiting.length+' 位到店客人',why:'先办理入住，再兑现生日、晚退或会员安排。',target:'front',department:'front'};
 if(dirty)return {title:dirty.number+' 翻房后才能再次出售',why:'先让现有客房创造收入，再花钱扩大容量。',target:'hotel',department:'house',entity:dirty.id};
 if(requests.length)return {title:'还有 '+requests.length+' 位客人的承诺待确认',why:'看实际条件与机会成本，礼遇不是唯一合理答案。',target:'events',department:'front'};
 if(g.stock<20||g.clubStock<20)return {title:'先稳住餐台供应',why:'当前库存偏低；补货能直接改善下一批客人的体验。',target:'operations-data',department:'fnb'};
 const goal=campaignGoal(s);if(g.campaign?.result)return {title:g.campaign.result.passed?'检验通过，进入下一段成长':'检验发现差距，先落实改进',why:g.campaign.result.advice,target:'tasks',department:'revenue'};if(g.campaign?.inspection)return {title:'下一次体验检验已预约',why:'先检查房态、库存与未兑现承诺；到店后才会公布结果。',target:'tasks',department:'front'};if(goal)return {title:goal.ready?'预约一次实际体验检验':goal.action,why:g.campaign?.inspection?'检验已预约，留出时间检查房态、备货和服务。':'日常行动推进酒店主线；完成后用真实体验验证。',target:g.campaign?.inspection||goal.ready?'tasks':goal.target,department:goal.department};
 return {title:'把盈余投入下一段成长',why:'先留够工资与服务资金，再选择装修、设施或主题活动。',target:'development',department:'revenue'};
}
