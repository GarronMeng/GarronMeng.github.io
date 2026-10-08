import type {PreviewState,Department} from '../state/types';
import type {FocusSelection} from './focusScreens';
import {esc,money,btn,go,choose,tabs,metrics,head,frame,pager} from './screenKit';
import {portrait} from './portraits';
import {rooms} from '../state/selectors';
import {roomName} from '../content/roomTypes';
import {forecast,EXTERNAL} from '../core/operations';
import {scores,milestones} from '../core/progression';
import {teachingSteps} from './managementUx';
import {lateLabel,checkoutMinute} from '../core/guestRequests';
const clock=(n:number)=>Math.floor(n/60)+':'+String(n%60).padStart(2,'0');
const person=(v:Parameters<typeof portrait>[0],title:string,text:string)=>`<div class="focus-person">${portrait(v)}<div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></div>`;
const note=(text:string)=>`<p class="focus-trade">${esc(text)}</p>`;
const entry=(label:string,text:string)=>`<article class="record-card"><small>${esc(label)}</small><p>${esc(text)}</p></article>`;
const clipped=(page:number,count:number)=>Math.min(page,Math.max(0,count-1));
export function secondaryScreen(s:Readonly<PreviewState>,view:string,u:FocusSelection):string{
 const g=s.game!,o=g.operations!;
 if(view==='room-data'){
  const r=s.entities[u.room??''];if(r?.kind!=='room')return frame('房间详情',head('house','请选择一间房','从房态图打开具体房间。'),go('查看房态','hotel'));
  const v=s.guests.find(v=>v.id===r.guestId);
  return frame(r.number+' · 房间与服务',v?person(v,v.name+' · '+v.tier,v.thought)+metrics([['订单房费',money(v.rate??g.price)],['退房时间',clock(checkoutMinute(v))],['体验',String(Math.round(v.satisfaction??90))]])+entry('服务记录',v.occasion?.outcome??v.challenge?.outcome??(v.serviceDone?'专属服务已安排':'尚未安排额外服务')):head('house',roomName(r),'房态页可清洁、维修、装修或预留；所有操作在同一位置。'),(v&&!v.serviceDone?btn('专属服务 · ¥120','guest-service',v.id):'')+(v?`<button class="game-action" data-open="events" data-guest="${v.id}">查看诉求</button>`:'')+go('返回房态','hotel'));
 }
 if(view==='bookings'){
  const bookings=[...o.bookings].sort((a,b)=>a.eta-b.eta),i=clipped(u.bookingPage,bookings.length),b=bookings[i],p=b&&o.profiles[b.profileId],v=b&&s.guests.find(v=>v.reservationId===b.id&&!v.departing);
  const body=metrics((['APP','团单','平台'] as const).map(source=>[source,String(o.bookings.filter(b=>b.source===source).length)+' 单']))+pager('bookingPage',i,bookings.length);
  return frame('今日预订',body+(b&&p?person(p,p.name+' · '+p.tier,b.occasion?'今天生日，提前留出礼遇预算。':b.challenge?({quiet:'需要安静房间',sua:'SUA 标准套已确认',family:'需要早餐与加床',audit:'关注服务标准'}[b.challenge]):'常规接待')+metrics([['到店',clock(b.eta)],['住宿',b.nights+' 晚'],['锁定价',money(b.rate)]])+entry(b.source+' · '+({confirmed:'待到店',arrived:'在排队',checkedin:'已入住',lost:'已安置'}[b.status]),p.history.at(-1)?.text??'首次来店。'):head('front','今天暂无预订','Walk-in 到店后会进入接待队列。'))+note('Walk-in 不在预订表内；当前已到 '+o.walkinArrivals+' 位。确认报价已锁定，平台佣金为每晚 15%。'),(v?`<button class="game-action" data-open="${v.roomId?'events':'front'}" data-guest="${v.id}">${v.roomId?'查看服务':'为他选房'}</button>`:go('查看到店客人','front'))+(p?`<button class="game-action" data-open="history" data-profile="${p.id}">查看客史</button>`:'')+go('晨会','brief'));
 }
 if(view==='history'||view==='profile-records'){
  const profiles=Object.values(o.profiles).filter(p=>p.visits>0||s.guests.some(v=>v.profileId===p.id)).sort((a,b)=>b.visits-a.visits),i=u.profile?Math.max(0,profiles.findIndex(p=>p.id===u.profile)):clipped(u.profilePage,profiles.length),p=profiles[i],v=p&&s.guests.find(v=>v.profileId===p.id&&!v.departing);
  if(!p)return frame('客史',head('front','客人正在写下第一段故事','接待住客后，这里会保存服务与回访记录。'),go('接待客人','front'));
  const records=[...p.history].reverse(),j=clipped(u.logPage,records.length);
  return frame(view==='history'?'客史 · 认出这位客人':'客史 · 完整记录',(view==='history'?pager('profilePage',i,profiles.length):pager('logPage',j,records.length))+person(p,p.name+' · '+p.tier,view==='history'?'先看上次承诺，再决定这次怎样接待。':'每次决定与体验会留在这份记录里。')+(view==='history'?metrics([['住宿次数',String(p.visits)],['信任',String(p.trust)],['累计消费',money(p.spend)]])+entry('最近一段故事',records[0]?.text??'首次入住，等待这次故事。'):entry(records[j]?'Day '+records[j].day:'尚无记录',records[j]?.text??'完成入住后积累客史。')),(v?`<button class="game-action" data-open="${v.roomId?'events':'front'}" data-guest="${v.id}">${v.roomId?'查看当前诉求':'接待这位客人'}</button>`:go('今日预订','bookings'))+`<button class="game-action" data-open="${view==='history'?'profile-records':'history'}" data-profile="${p.id}">${view==='history'?'完整记录':'返回客史'}</button>`);
 }
 if(view==='operations-data'){
  const tab=['stock','price','position'].includes(u.archiveTab)?u.archiveTab:'stock';
  const nav=tabs(['stock','price','position'].map((id,i)=>choose(['备货','报价','定位'][i],'archiveTab',id,id===tab)).join(''));
  const body=tab==='stock'?head('fnb','餐台供应优先于扩容','手动补货即时入库；主管配送需走到餐台后完成。')+metrics([['早餐',g.stock+' 份'],['酒廊',g.clubStock+' 份'],['每次采购','50 份 / ¥300']]):tab==='price'?head('revenue','每晚收益与客流之间取舍','报价影响未预订客流，已确认订单与在住价格不变。')+metrics([['当前报价',money(g.price)],['预计入住',forecast(s).occupancy+'%']])+`<label class="precision-price">精确报价 <input id="price-input" type="number" min="350" max="1800" value="${g.price}"></label>`:head('revenue','这家酒店要服务谁？','商务重工作日与早餐，度假重周末和体验，城市混合兼顾两类需求。')+metrics([['当前定位',({business:'商务',resort:'度假',urban:'城市混合'}[g.positioning])]])+note('定位会改变客流、住宿时长与公区偏好；调整后观察一天经营结果。');
  const actions=tab==='stock'?btn('早餐 +50 · ¥300','stock','breakfast')+btn('酒廊 +50 · ¥300','stock','club'):tab==='price'?btn('¥720 · 争取客流','price','','720')+btn('¥850 · 提高单价','price','','850')+btn('应用精确报价','price'):btn('商务','position','','business')+btn('度假','position','','resort')+btn('城市混合','position','','urban');
  return frame('运营安排',nav+body,actions);
 }
 if(view==='score'){
  const rating=scores(s);return frame('经营评分',metrics([['综合评分',rating.total+' / 100'],['评估方式','四项等权']])+`<div class="rating-list">${rating.parts.map(p=>`<div><span>${p.name}</span><b>${p.value}</b><progress max="100" value="${p.value}" aria-label="${p.name}"></progress></div>`).join('')}</div>`+head('revenue','从最弱的一项开始改善','口碑看承诺，体验看服务，房务看周转，业主看经营。'),go('处理待办','events')+go('财务表现','report-data'));
 }
 if(view==='report-data'){
  const r=g.reports.at(-1);return frame(r?'Day '+r.day+' · 财务明细':'今天 · 财务进度',metrics([['入账收入',money(r?.revenue??g.revenue)],['成本',money(r?.expense??g.expense)],['净额',money((r?.revenue??g.revenue)-(r?.expense??g.expense))]])+(r?metrics([['ADR',money(r.adr)],['RevPAR',money(r.revpar)],['入住率',r.occupancy+'%']])+entry('收益经理建议',r.recommendation):head('revenue','房费于午夜统一结算','当前收入包括已经到账的消费与奖金；在住房费尚未入账。')),go('经营评分','score')+go('收支日志','log')+(g.reportOpen?btn('开始下一天','continue'):go('晚间复盘','evening')));
 }
 if(view==='brief-data'){
  const f=forecast(s);return frame('晨会 · 完整预测',head('revenue',EXTERNAL[o.event],'预订报价已锁定，Walk-in 仍有波动；先判断库存和翻房能否接住需求。')+metrics([['预计入住',f.occupancy+'%'],['Walk-in',f.walkins+' 位'],['翻房',f.housekeeping+' 间']])+metrics([['早餐',f.breakfast+' 人'],['标准套需求',f.suites+' 间'],['Happy Hour',f.club+' 人']])+entry('客源结构','商务 '+f.business+' / 度假 '+f.resort+' / 团队 '+f.group),go('调整晨会决定','brief')+go('核对预订','bookings'));
 }
 if(view==='evening-data'){
  const r=g.evening;if(!r)return frame('复盘 · 尚未开会',head('revenue','20:00 回看今天','当前可以先处理待办与预订。'),go('经营看板','hub'));
  const logs=[...r.logs].reverse(),i=clipped(u.logPage,logs.length),l=logs[i],n=r.notes[0];
  return frame('复盘 · 客诉与建议',pager('logPage',i,logs.length)+metrics([['客诉计数',String(r.complaints)],['待处理',String(r.pending)],['已入账',money(r.revenue)]])+entry(l?clock(l.minute)+' · '+l.category:'今天的服务记录',l?.text??'尚无客诉记录。')+head('revenue',n?.title??'总部建议',n?.text??'继续保持服务节奏。'),(l?.target&&s.entities[l.target]?`<button class="game-action" data-entity="${l.target}">查看现场</button>`:go('处理待办','events'))+go('返回复盘','evening'));
 }
 if(view==='tasks-data'||view==='career'){
  const career=view==='career',items=career?milestones(s):g.tasks,i=clipped(career?u.careerPage:u.taskPage,items.length),t=items[i];
  if(!t)return frame('奖励',head('front','目前没有可领取目标','经营主线与酒店成长会继续记录。'),go('当前目标','tasks'));
  const paid='paid' in t&&typeof t.paid==='number'?t.paid:0,remainder=Math.max(0,t.reward-paid);
  return frame(career?'长期里程碑':'日常支线奖励',pager(career?'careerPage':'taskPage',i,items.length)+head('front',t.title,career?'日常经营逐步积累；长期目标不会随交班重置。':'奖金按进度分段到账；完成后领取尾款。')+metrics([['进度',Math.min(t.progress,t.goal)+' / '+t.goal],['奖金上限',money(t.reward)],['已到账',money(t.claimed?t.reward:paid)]])+`<progress max="${t.goal}" value="${Math.min(t.progress,t.goal)}"></progress>`,(t.claimed?go('当前目标','tasks'):t.progress>=t.goal?btn(career?'领取奖励':'领取尾款 · '+money(remainder),career?'claim-career':'claim',t.id):go('去完成','target' in t?String(t.target):'hub'))+go(career?'日常奖励':'长期里程碑',career?'tasks-data':'career')+go('三日带教','teaching'));
 }
 if(view==='teaching'){
  const steps=teachingSteps(s),i=clipped(u.taskPage,steps.length),t=steps[i];return frame('Day '+g.day+' · 部门带教',t?pager('taskPage',i,steps.length)+head('front',t.title,t.text)+metrics([['当前步骤',t.done?'已完成':'待完成'],['今日带教',steps.filter(v=>v.done).length+' / '+steps.length]])+note('完成当前步骤后继续下一步；第 1–3 天结束后仍可跟随经营主线。'):head('front','三日带教已结束','主管会继续根据酒店现场给出建议。'),go(t?'去实践':'当前目标',t?.target??'tasks')+go('返回经营','hub'));
 }
 if(view==='log'){
  const filters=['全部','客诉','收益','房态','部门','升级','入住'],filter=filters.includes(u.archiveTab)?u.archiveTab:'全部',logs=[...g.logs].reverse().filter(l=>filter==='全部'||l.category===filter),i=clipped(u.logPage,logs.length),l=logs[i];return frame('经营日志',tabs(filters.map(id=>choose(id,'archiveTab',id,id===filter)).join(''))+pager('logPage',i,logs.length)+(l?entry('Day '+l.day+' · '+clock(l.minute)+' · '+l.category,l.text):head('revenue','暂无记录','经营决定和现场结果会自动记录在这里。')),(l?.target&&s.entities[l.target]?`<button class="game-action" data-entity="${l.target}">查看现场</button>`:go('查看当前待办','events'))+go('经营看板','hub'));
 }
 if(view==='settings')return frame('存档与设置',head('front','继续经营，从这里妥善交班','进度自动保存在当前浏览器；导出备份可留存酒店状态。')+metrics([['当前进度','Day '+g.day],['存档','浏览器自动保存']])+note('新开存档会弹出确认，并清除本浏览器当前 v8 进度。'),btn('导出备份','export')+btn('新开酒店','reset')+go('返回经营','hub'));
 if(view==='hotel-archive')return frame('酒店 · 空间总览',metrics([['已配置',String(rooms(s).length)+' 间'],['待翻房',String(rooms(s).filter(r=>r.status==='dirty').length)+' 间'],['施工楼层',String(s.floors.filter(f=>f.construction).length)]] )+head('engineering','先用好现有空间，再增加容量','房态页选择楼层和房间；扩建交付空位，玩家逐间配置。'),go('房态与装修','hotel')+go('扩建一层','hotel-data')+go('公区设施','development'));
 return frame('经营入口已更新',head('front','从统一导航继续','所有日常操作都在五个部门入口中。'),go('经营看板','hub'));
}
