import type {PreviewState,Department} from '../state/types';
import {rooms,roomSlots} from '../state/selectors';
import {roomName,standardSuite,ROOM_TIERS} from '../content/roomTypes';
import {roomRate,houseMinutes,engineeringMinutes} from '../core/economy';
import {forecast} from '../core/operations';
import {portrait} from './portraits';
import {spaceIllustration} from './designSystem';
import {workItems} from './managementHub';
import {lateLabel,fallbackHour} from '../core/guestRequests';
export interface FocusSelection {room?:string;floor?:string;department?:Department;facility?:string;guest?:string;event?:string;roomPage:number;eventPage:number;guestPage:number;taskPage:number;meeting:string;category:string;bed:string;}
export const focusSelection=():FocusSelection=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:'overview',category:'standard',bed:'king'});
const esc=(v:unknown)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const money=(n:number)=>'¥'+Math.round(n).toLocaleString('en-US');
const btn=(label:string,type:string,id='',value='',extra='')=>`<button class="game-action" data-action="${type}" data-id="${esc(id)}" data-value="${esc(value)}" ${extra}>${label}</button>`;
const go=(label:string,target:string)=>`<button class="game-action" data-open="${target}">${label}</button>`;
const choose=(label:string,key:string,value:string,active=false)=>`<button data-focus-key="${key}" data-focus-value="${esc(value)}" aria-pressed="${active}">${label}</button>`;
const tabs=(body:string)=>`<div class="focus-tabs">${body}</div>`;
const metrics=(values:[string,string][])=>`<div class="focus-metrics">${values.map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div>`;
const head=(dept:Department,title:string,text:string)=>`<div class="focus-person">${portrait(dept)}<div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></div>`;
const frame=(title:string,body:string,actions:string)=>`<section class="focus-screen"><h2>${title}</h2><div class="focus-main">${body}</div></section><div class="focus-footer">${actions}</div>`;
const pager=(key:string,index:number,total:number)=>`<div class="focus-pager">${choose('‹ 上一项',key,String(Math.max(0,index-1)))}<span>${total?index+1:0} / ${total}</span>${choose('下一项 ›',key,String(Math.min(Math.max(0,total-1),index+1)))}</div>`;
export function focusScreen(s:Readonly<PreviewState>,view:string,u:FocusSelection):string|null{
 const g=s.game!,rs=rooms(s),queue=s.guests.filter(v=>!v.staff&&!v.departing&&!v.roomId),pending=workItems(s);
 if(view==='hub')return frame('今天怎么经营？',metrics([['现金',money(s.metrics.cash)],['在住',rs.filter(r=>r.status==='occupied').length+'/'+rs.length],['待处理',String(pending.length)]])+`<div class="focus-shortlist">${pending.slice(0,3).map(v=>`<div><span><strong>${esc(v.title)}</strong><small>${esc(v.detail)}</small></span>${v.button}</div>`).join('')||'<p>现场没有积压，可以继续经营。</p>'}</div>`+head('front','先处理眼前的三件事','做完一件，下一件自动补上；无需返回目录。'),go('08:00 晨会','brief')+go('全部待办','events')+go('20:00 复盘','evening'));
 if(view==='front'){
  const i=u.guest?Math.max(0,queue.findIndex(v=>v.id===u.guest)):Math.min(u.guestPage,Math.max(0,queue.length-1)),v=queue[i];
  if(!v)return frame('客人接待',head('front','目前无人排队','关上面板继续经营，客人到店后会提醒你。'),go('今日预订','bookings')+go('回到酒店','hub'));
  const available=rs.filter(r=>r.status==='available'||r.status==='reserved'&&v.tier==='Globalist'&&(!r.suaBookingId||r.suaBookingId===v.reservationId)).sort((a,b)=>Number(!!b.suaBookingId&&b.suaBookingId===v.reservationId)-Number(!!a.suaBookingId&&a.suaBookingId===v.reservationId)||(v.tier==='Globalist'?Number(standardSuite(b))-Number(standardSuite(a)):Number(a.type==='suite')-Number(b.type==='suite')));
  const page=Math.min(u.roomPage,Math.max(0,Math.ceil(available.length/2)-1));
  return frame('给这位客人一间房',pager('guestPage',i,queue.length)+`<div class="focus-person">${portrait(v)}<div><strong>${esc(v.name)} · ${esc(v.tier)}</strong><p>${esc(v.thought)}</p></div></div>`+metrics([['住宿',`${v.stayLength} 晚`],['耐心',`${v.patience} 分钟`],['来源',esc(v.source??'Walk-in')]])+`<div class="focus-room-choices">${available.slice(page*2,page*2+2).map(r=>`<button data-action="checkin" data-id="${esc(v.id)}" data-room="${r.id}">${spaceIllustration('hotel')}<strong>${r.number} · ${roomName(r)}</strong><small>${v.tier==='Globalist'&&standardSuite(r)?'免费升套 · 占用标准套库存':'点击安排入住'}</small></button>`).join('')||'<p>暂无空房，先清洁或查看预留。</p>'}</div>`+(available.length>2?pager('roomPage',page,Math.ceil(available.length/2)):'')+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',go('查看房态','hotel')+btn('婉拒本次','reject',v.id));
 }
 if(view==='events'||view==='worklist'){
  const cards:{id:string;body:string;actions:string}[]=[];
  for(const v of s.guests.filter(v=>!v.departing&&v.roomId)){
   if(v.challenge&&!v.challenge.resolved){const k=v.challenge.kind,copy={quiet:['需要安静的房间','quiet','有施工噪声时需要另有安静空房。'],sua:['核对 SUA 标准套房','inventory','已入住标准套才能兑现；欢迎礼不能替代。'],family:['早餐和加床一起安排','family',`需要 6 份早餐库存，当前 ${g.stock} 份。`],audit:['检查房间与服务流程','inspect','需客房、工程主管在岗，且无待修房。']}[k];cards.push({id:v.id,body:`<div class="focus-person">${portrait(v)}<div><strong>${esc(v.name)} · ${esc(v.tier)}</strong><p>${copy[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${copy[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:btn('落实 · ¥180','guest-choice',v.id,copy[1])+btn('欢迎礼 · ¥100','guest-choice',v.id,'gift')+btn('不作安排','guest-choice',v.id,'decline')});}
   if(v.late==='pending')cards.push({id:v.id+'-late',body:`<div class="focus-person">${portrait(v)}<div><strong>${esc(v.name)} · ${esc(v.tier)}</strong><p>希望 ${lateLabel(v)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:btn('同意 '+lateLabel(v),'late',v.id,'honor')+btn('协商 '+fallbackHour(v)+':00','late',v.id,'deny')});
  }
  for(const e of g.events){const dept=e.kind==='repair'?'engineering':e.kind==='supplies'?'fnb':'front';cards.push({id:'event-'+e.id,body:head(dept,e.title,`剩余 ${Math.max(0,e.expires-g.day*1440-g.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${g.managers[dept]?'主管已到岗，可以授权处理。':'对应主管尚未到岗；可先亲自处理，避免超时。'}</p></div>`,actions:btn('亲自处理 · ¥350','resolve',String(e.id),'gm')+(g.managers[dept]?btn('交给主管 · ¥150','resolve',String(e.id),'sop'):go('聘任主管','operations'))});}
  for(const w of pending.filter(w=>!cards.some(c=>c.id===w.key)&&!s.guests.some(v=>v.roomId&&v.id===w.key)))cards.push({id:w.key,body:head('front',w.title,w.detail)+`<div class="focus-decision"><p>${esc(w.note)}</p></div>`,actions:w.button});
  const i=u.event?Math.max(0,cards.findIndex(v=>v.id===u.event)):Math.min(u.eventPage,Math.max(0,cards.length-1)),c=cards[i];
  return frame('逐件处理 · '+cards.length+' 项',c?pager('eventPage',i,cards.length)+c.body:head('front','待办全部处理完了','关上面板，回到酒店看决定如何发生。'),c?.actions??go('回到经营','hub'));
 }
 if(view==='hotel'||view==='entity'){
  const floors=s.floors.filter(f=>f.role==='guest'),floor=s.floors.find(f=>f.id===(u.floor??s.entities[u.room??'']?.floorId))??floors[0];
  if(!floor)return null;const slots=roomSlots(s).filter(r=>r.floorId===floor.id),r=slots.find(r=>r.id===u.room)??slots[0];if(!r)return null;u.room=r.id;u.floor=floor.id;
  const nav=tabs(floors.map(f=>choose(f.label,'floor',f.id,f.id===floor.id)).join(''))+`<div class="focus-room-map">${slots.map(v=>choose(v.number+'<small>'+({available:'可入住',occupied:'在住',dirty:'待清洁',cleaning:'清洁中',maintenance:'封闭',reserved:'已预留',unbuilt:'＋设置'}[v.status])+'</small>','room',v.id,v.id===r.id)).join('')}</div>`;
  const construction=r.construction??floor.construction;
  if(construction)return frame(r.number+' · 封闭施工',nav+`<div class="focus-space">${spaceIllustration('hotel')}</div>`+metrics([['剩余',construction.remaining+' 分钟'],['完成后','开放使用']]),go('扩建与全部参数','hotel-data'));
  if(r.status==='unbuilt')return frame(r.number+' · 设置房型',nav+tabs(Object.entries(ROOM_TIERS).map(([id,t])=>choose(t.name,'category',id,u.category===id)).join(''))+tabs(choose('大床','bed','king',u.bed==='king')+choose('双床','bed','twin',u.bed==='twin'))+metrics([['配置费用',money(ROOM_TIERS[u.category as keyof typeof ROOM_TIERS].cost)],['新客房价',money(g.price*ROOM_TIERS[u.category as keyof typeof ROOM_TIERS].factor)+'起']])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',btn('确认设置','configure-room',r.id,u.category+':'+u.bed));
  const v=s.guests.find(v=>v.id===r.guestId),level=r.level??1;
  const actions=r.status==='dirty'?btn('清洁 · ¥90','clean',r.id):r.status==='maintenance'&&!r.timer?btn('维修 · ¥180','repair',r.id):r.status==='available'?go('安排入住','front')+(level<5?btn('装修 · '+money(level*2500),'upgrade',r.id):'')+(standardSuite(r)?btn('留给会员','reserve',r.id):''):r.status==='reserved'&&!r.suaBookingId?btn('释放预留','release',r.id):v?`<button class="game-action" data-open="events" data-guest="${v.id}">处理诉求</button>`:'';
  return frame(r.number+' · '+roomName(r),nav+`<div class="focus-space">${spaceIllustration('hotel')}<span>Lv.${level} · ${v?esc(v.name):'暂无住客'}</span></div>`+metrics([['每晚房费',money(v?.rate??roomRate(g.price,r))],['剩余住宿',r.nightsLeft+' 晚'],['升级增收',level<5?'每新客晚 +'+money(roomRate(g.price,{...r,level:level+1})-roomRate(g.price,r)):'已满级']])+`<p class="focus-trade">${r.status==='available'?'装修需停卖 90 分钟；已确认订单价格不变。':v?esc(v.thought):'等清洁或维修完成后，才能再次出售。'}</p>`,actions+go('房间明细','room-data'));
 }
 if(view==='operations'){
  const names:Record<Department,string>={front:'前厅',house:'客房',engineering:'工程',fnb:'餐饮',revenue:'收益'},d=u.department??'house',level=g.managers[d],cost=level?4500*level:3800;
  const note={front:'自动分房与常规诉求；无空房仍需等待。',house:`每间清洁 ${houseMinutes(level)} → ${houseMinutes(Math.min(3,level+1))} 分钟，另需到场时间。`,engineering:`维修 ${engineeringMinutes(level)} → ${engineeringMinutes(Math.min(3,level+1))} 分钟，另需到场时间。`,fnb:'低库存时派员工配送，到餐台后才计入库存。',revenue:'次日自动定价；报价更高也可能减少客流。'}[d];
  return frame('团队 · 原位授权',tabs(Object.entries(names).map(([id,n])=>choose(n,'department',id,id===d)).join(''))+head(d,names[d]+'主管',level?'已到岗 · Lv.'+level:'尚未聘任')+metrics([['投入',level>=3?'已满级':money(cost)],['每日工资',money(level*180)+' → '+money(Math.min(3,level+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${note}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(level<3?btn(level?'培训升级':'聘任到岗',level?'train':'hire',d):'')+go('效果与财务明细','operations-data'));
 }
 if(view==='development'){
  const fs=Object.values(s.entities).filter(e=>e.kind==='facility'),f=fs.find(e=>e.id===u.facility)??fs[0];if(!f)return null;const level=f.level??1;
  return frame('设施 · 看清再投资',tabs(fs.map(e=>choose(e.name,'facility',e.id,e.id===f.id)).join(''))+`<div class="focus-space">${spaceIllustration(f.role==='rooftop'?'evening':'hotel')}<span>${f.name} · Lv.${level}</span></div>`+metrics([['使用 / 容量',f.usage+' / '+f.capacity],['升级后容量',String(f.capacity+4)],['费用',money(level*3500)]])+`<p class="focus-trade">${f.construction?'施工剩余 '+f.construction.remaining+' 分钟。':'升级需封闭施工；先补货或维护可解决眼前问题。'}</p>`,(f.construction?'':(level<5?btn('升级设施','invest',f.id):'')+(['breakfast','club'].includes(f.role)?btn('补货 · ¥300','stock',f.role):btn('维护 · ¥200','repair',f.id)))+go('营销、活动、更多','development-data'));
 }
 if(view==='brief'){
  const f=forecast(s),tab=u.meeting;
  const body=tab==='price'?head('revenue','今天挂牌多少？','高价增加单晚收入，也可能减少 Walk-in。')+metrics([['当前挂牌',money(g.price)],['预计入住',f.occupancy+'%']])+tabs(btn('¥720 · 争取入住','price','','720')+btn('¥850 · 提高单价','price','','850')):tab==='service'?head('fnb','先备好今天的服务',`早餐预计 ${f.breakfast} 人，当前 ${g.stock} 份。`)+metrics([['早餐',g.stock+' 份'],['酒廊',g.clubStock+' 份']])+tabs(btn('早餐 +50 · ¥300','stock','breakfast')+btn('酒廊 +50 · ¥300','stock','club')):tab==='suite'?head('front','套房要留一间吗？','留套照顾会员；开放销售保留付费机会。SUA 锁房不变。')+metrics([['当前策略',g.operations?.suitePolicy==='hold'?'保留一间':'开放销售']])+tabs(btn('保留一间','suite-policy','','hold')+btn('开放销售','suite-policy','','sell')):metrics([['预计入住',f.occupancy+'%'],['确认预订',String(g.operations?.bookings.length??0)],['早餐需求',f.breakfast+' 人']])+head('revenue','Day '+g.day+' · 开始前做一个判断',f.breakfast>g.stock?'早餐需求超过库存，建议先备货。':f.occupancy>=90?'预计接近满房，谨慎继续投广告。':'今天还有接客空间，可保留现价，也可以调整报价。');
  return frame('08:00 · 晨会',tabs(['overview','price','service','suite'].map((id,i)=>choose(['重点','房价','备货','套房'][i],'meeting',id,id===tab)).join(''))+body,g.operations?.briefOpen?btn('按当前决定开始今天','brief-start')+go('预订 / 客源明细','bookings'):go('回到经营','hub')+go('完整预测','brief-data'));
 }
 if(view==='evening'||view==='report'){
  const r=g.evening,day=g.reports.at(-1);if(view==='evening'&&!r)return frame('20:00 · 晚间复盘',head('revenue','今晚 20:00 自动开会','继续经营，届时核对收入、客诉与总部建议。'),go('回到经营','hub'));
  if(view==='report'&&!day)return frame('今日尚未日结',head('revenue','房费于午夜结算','现在可以查看 20:00 快照，或继续经营。'),go('晚间复盘','evening'));
  const summary=view==='evening'?r!.notes[0]?.text:day!.recommendation;
  return frame(view==='evening'?'20:00 · 今天经营得如何？':'Day '+day!.day+' · 日结',metrics(view==='evening'?[['预计净额',money(r!.projectedNet)],['入住率',r!.occupancy+'%'],['待办',String(r!.pending)]]:[['净额',money(day!.revenue-day!.expense)],['入住率',day!.occupancy+'%'],['客诉',String(day!.complaints)]])+head('revenue','今晚优先改进',summary??'保持服务节奏。')+'<p class="focus-trade">'+(view==='evening'?'这是 20:00 快照；预计房费还未入账。':'这是午夜结算结果。')+'</p>',go('客诉 / 明细',view==='evening'?'evening-data':'report-data')+(view==='evening'&&r?.open?btn('交给夜班 · 继续经营','evening-close'):g.reportOpen?btn('开始下一天','continue'):go('回到经营','hub')));
 }
 if(view==='tasks'){
  const i=Math.min(u.taskPage,g.tasks.length-1),t=g.tasks[i];if(!t)return null;
  return frame('今天的目标',pager('taskPage',i,g.tasks.length)+head('front',t.title,'把任务与眼前的酒店问题一起解决。')+metrics([['进度',t.progress+' / '+t.goal],['奖励',money(t.reward)]])+`<progress max="${t.goal}" value="${t.progress}"></progress>`,t.claimed?go('长期目标与带教','tasks-data'):(t.progress>=t.goal?btn('领取奖励','claim',t.id):go('去完成',t.target))+go('全部目标','tasks-data'));
 }
 return null;
}
