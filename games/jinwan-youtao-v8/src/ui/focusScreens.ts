import {OPENING,DAY_THEMES,openingGoal,featureLock,CHAPTER_UNLOCKS} from '../core/onboarding';
import type {PreviewState,Department} from '../state/types';
import {rooms,roomSlots} from '../state/selectors';
import {roomName,standardSuite,ROOM_TIERS} from '../content/roomTypes';
import {roomRate,houseMinutes,engineeringMinutes} from '../core/economy';
import {forecast} from '../core/operations';
import {DAY_PLANS,nextDecision,planValue} from '../core/dayLoop';
import {ACTIVITIES} from '../core/progression';
import {birthdayOptions} from '../core/hospitality';
import {campaignGoal} from '../core/campaign';
import {portrait} from './portraits';
import {spaceIllustration} from './designSystem';
import {workItems} from './managementHub';
import {lateLabel,fallbackHour} from '../core/guestRequests';
export interface FocusSelection {room?:string;floor?:string;department?:Department;facility?:string;guest?:string;event?:string;roomPage:number;eventPage:number;guestPage:number;taskPage:number;meeting:string;category:string;bed:string;activity:string;bookingPage:number;profilePage:number;logPage:number;careerPage:number;archiveTab:string;profile?:string;}
export const focusSelection=():FocusSelection=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:'overview',activity:'coffee',bookingPage:0,profilePage:0,logPage:0,careerPage:0,archiveTab:'overview',category:'standard',bed:'king'});
import {esc,money,btn,go,choose,tabs,metrics,head,frame,pager,decisionCard} from './screenKit';
import {describeDilemma,lateConflict,walkinDisplaces,morale} from '../core/dilemmas';
import {clock} from '../core/game';
export function focusScreen(s:Readonly<PreviewState>,view:string,u:FocusSelection):string|null{
 const g=s.game!,lesson=openingGoal(s),rs=rooms(s),queue=s.guests.filter(v=>!v.staff&&!v.departing&&!v.roomId),pending=workItems(s);
 if(view==='hub'){
  const next=nextDecision(s),plan=g.plan,goal=campaignGoal(s),occupied=rs.filter(r=>r.status==='occupied').length;
  const phase=g.operations?.briefOpen?'morning':g.reportOpen?'growth':g.minute>=1200?'review':'operate';
  const rhythm=`<div class="day-rhythm">${['morning','operate','review','growth'].map((id,i)=>`<span class="${id===phase?'active':''}"><i>${i+1}</i>${['晨会','经营','复盘','成长'][i]}</span>`).join('')}</div>`;
  const hero=`<div class="hotel-hero">${spaceIllustration('hub',Math.min(5,g.level))}<div><small>DAY ${g.day} · YOUR HOTEL</small><strong>把每次入住，<br>变成下次再来。</strong><span>${plan?DAY_PLANS[plan.focus].name:'按现有设置经营'}</span></div></div>`;
  const action=next.entity?`<button class="game-action" data-entity="${next.entity}">先处理这间房</button>`:go('现在去处理',next.target);
  return frame('今天，先做好一件事',rhythm+hero+metrics([['在住',occupied+'/'+rs.length],['现场待办',String(pending.length)],['今日承诺',plan?planValue(plan.focus,plan.target):'晨会确认']])+head(next.department,next.title,next.why)+`<small class="campaign-route">${lesson?'开业带教 · '+(lesson.index+1)+' / '+lesson.total:goal?'成长主线 · '+esc(goal.title)+' '+goal.progress+'/'+goal.goal:'五段认证已完成 · 继续自由经营'}</small>`,action+go('经营目标','tasks')+go('今晚复盘','evening'));
 }
 if(view==='front'){
  const i=u.guest?Math.max(0,queue.findIndex(v=>v.id===u.guest)):Math.min(u.guestPage,Math.max(0,queue.length-1)),v=queue[i];
  if(!v)return frame('客人接待',head('front','目前无人排队','关上面板继续经营，客人到店后会提醒你。'),go('今日预订','bookings')+go('回到酒店','hub'));
  const available=rs.filter(r=>r.status==='available'||r.status==='reserved'&&v.tier==='Globalist'&&(!r.suaBookingId||r.suaBookingId===v.reservationId)).sort((a,b)=>Number(b.id===u.room)-Number(a.id===u.room)||Number(!!b.suaBookingId&&b.suaBookingId===v.reservationId)-Number(!!a.suaBookingId&&a.suaBookingId===v.reservationId)||(v.tier==='Globalist'?Number(standardSuite(b))-Number(standardSuite(a)):Number(a.type==='suite')-Number(b.type==='suite')));
  const page=Math.min(u.roomPage,Math.max(0,Math.ceil(available.length/2)-1));
  return frame('给这位客人一间房',pager('guestPage',i,queue.length)+`<div class="focus-person">${portrait(v)}<div><strong>${esc(v.name)} · ${esc(v.tier)}</strong><p>${esc(v.thought)}</p></div></div>`+metrics([['住宿',`${v.stayLength} 晚`],['耐心',`${v.patience} 分钟`],['来源',esc(v.source??'Walk-in')]])+`<div class="focus-room-choices">${available.slice(page*2,page*2+2).map(r=>`<button data-action="checkin" data-id="${esc(v.id)}" data-room="${r.id}">${spaceIllustration('hotel',r.level??1,r.bed??(r.type==='twin'?'twin':'king'),r.category??r.type)}<strong>${r.number} · ${roomName(r)}</strong><small>${v.tier==='Globalist'&&standardSuite(r)?'免费升套 · 占用标准套库存':'点击安排入住'}</small></button>`).join('')||'<p>暂无空房，先清洁或查看预留。</p>'}</div>`+(available.length>2?pager('roomPage',page,Math.ceil(available.length/2)):'')+(walkinDisplaces(s,v)?`<p class="focus-warn">接下这位散客，今晚将有 ${walkinDisplaces(s,v)} 单确认预订没房，每单安置 ¥600。建议婉拒。</p>`:'')+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',go('查看房态','hotel')+btn('婉拒本次','reject',v.id));
 }
 if(view==='events'||view==='worklist'){
  const cards:{id:string;body:string;actions:string}[]=[],room=(v:{roomId?:string})=>`<button class="game-action" data-entity="${esc(v.roomId)}">查看客房</button>`;
  for(const d of g.dilemmas??[]){const x=describeDilemma(s,d),fallback=x.options.find(o=>o.id===x.fallback)?.label??'';
   cards.push({id:'dilemma-'+d.id,body:decisionCard({kicker:'经营抉择 · '+x.left+' 分钟内决定',who:portrait(x.guest??x.advisor),title:x.title,situation:x.situation,advice:x.advice,options:x.options.map(o=>({label:o.label,action:'dilemma',id:String(d.id),value:o.id,effects:o.effects,note:o.note,disabled:o.disabled,recommended:o.id===x.recommend})),fallback:'超时未决定，将按「'+fallback+'」处理。结果会写进 20:00 复盘。'}),actions:go('决策记录','decisions')+go('今日预订','bookings')});}
  for(const v of s.guests.filter(v=>!v.departing&&v.roomId)){
   if(v.occasion&&!v.occasion.resolved){const o=birthdayOptions(s,v),pick=o.suite?'suite':o.breakfast?'breakfast':'card';cards.push({id:v.id+'-birthday',body:decisionCard({kicker:'住客礼遇 · 今天过生日',who:portrait(v),title:v.name+' · '+v.tier+' 今天过生日',situation:`这趟专门来庆祝。早餐库存 ${g.stock} 份，可售标准套 ${o.free} 间，需要保护的会员预订 ${o.reserve} 间。`,advice:o.alreadySuite?'客人已住套房，送早餐就很体面。':o.suite?'套房有余量，升套惊喜最大，代价是少一次付费或会员升套机会。':'套房要留给已确认的会员，送早餐更稳。',options:[
    {label:'送双人早餐',action:'birthday-choice',id:v.id,value:'breakfast',effects:[{k:'现金',v:-160,money:true},{k:'体验',v:8},{k:'业主',v:-1}],note:'消耗 2 份早餐库存。',disabled:o.breakfast?undefined:'早餐库存不足',recommended:pick==='breakfast'},
    {label:'生日升套',action:'birthday-choice',id:v.id,value:'suite',effects:[{k:'现金',v:-280,money:true},{k:'体验',v:12},{k:'业主',v:-2},{k:'套房库存',v:-1}],note:'原房待翻房，套房按原房费住。',disabled:o.suite?undefined:o.alreadySuite?'客人已住标准套':'套房需保护会员预订',recommended:pick==='suite'},
    {label:'手写生日卡',action:'birthday-choice',id:v.id,value:'card',effects:[{k:'成本',v:'免费',tone:'good'},{k:'体验',v:2}],note:'心意到了，惊喜有限。',recommended:pick==='card'},
    {label:'维持原预订',action:'birthday-choice',id:v.id,value:'decline',effects:[{k:'体验',v:-3},{k:'资源',v:'全部保留',tone:'good'}],note:'客人专程来庆祝，会有点失落。'}]}),actions:room(v)});}
   if(v.challenge&&!v.challenge.resolved){const k=v.challenge.kind,copy={quiet:['需要安静的房间','quiet','有施工噪声时需要另有安静空房。'],sua:['核对 SUA 标准套房','inventory','已入住标准套才能兑现；欢迎礼不能替代。'],family:['早餐和加床一起安排','family',`需要 6 份早餐库存，当前 ${g.stock} 份。`],audit:['检查房间与服务流程','inspect','需客房、工程主管在岗，且无待修房。']}[k];
    cards.push({id:v.id,body:decisionCard({kicker:'住客诉求 · '+v.tier,who:portrait(v),title:v.name+' · '+copy[0],situation:copy[2],advice:'只有对症的安排才能解决问题；欢迎礼省钱，但解决不了核心诉求。',options:[
     {label:'落实安排 · ¥180',action:'guest-choice',id:v.id,value:copy[1],effects:[{k:'现金',v:-180,money:true},{k:'体验',v:8}],note:'条件不满足时仍会失败，体验 −8。',recommended:true},
     {label:'欢迎礼 · ¥100',action:'guest-choice',id:v.id,value:'gift',effects:[{k:'现金',v:-100,money:true},{k:'体验',v:-8}],note:'礼物不代替承诺。'},
     {label:'不作安排',action:'guest-choice',id:v.id,value:'decline',effects:[{k:'成本',v:'¥0',tone:'good'},{k:'体验',v:-8}],note:'客人会记住这次失望。'}]}),actions:room(v)});}
   if(v.late==='pending'){const k=lateConflict(s,v),back=fallbackHour(v)+':00';cards.push({id:v.id+'-late',body:decisionCard({kicker:'会员权益 · 晚退请求',who:portrait(v),title:v.name+' · '+v.tier+' 希望 '+lateLabel(v)+' 退房',situation:`${v.tier} 可申请 ${lateLabel(v)} 退房。${k.hour/60}:00 前预计 ${k.arrivals} 位客人要入住，可用与待翻房共 ${k.free} 间。`,advice:k.short?`房间缺 ${k.short} 间：同意会让到店客人等房，协商到 ${back} 更稳。`:'下午房间够用，同意晚退几乎没有代价。',options:[
    {label:'同意 '+lateLabel(v),action:'late',id:v.id,value:'honor',effects:[{k:'体验',v:4},{k:'口碑',v:1},{k:'业主',v:-1},k.short?{k:'风险',v:k.short+' 位可能等房',tone:'bad'}:{k:'房间',v:'够用',tone:'good'}],note:'退房后才能翻房。',recommended:!k.short},
    {label:'协商 '+back,action:'late',id:v.id,value:'deny',effects:[{k:'体验',v:-3},{k:'口碑',v:-1},{k:'业主',v:1},{k:'翻房',v:'按时',tone:'good'}],note:'会员权益打了折扣。',recommended:!!k.short}]}),actions:room(v)});}
  }
  for(const e of g.events){const dept=e.kind==='repair'?'engineering':e.kind==='supplies'?'fnb':'front',lead=!!g.managers[dept],left=Math.max(0,e.expires-g.day*1440-g.minute);
   cards.push({id:'event-'+e.id,body:decisionCard({kicker:'突发事件 · '+left+' 分钟内处理',who:portrait(dept),title:e.title,situation:`超时未处理会计入客诉，口碑 −2。${lead?'对应主管已到岗。':'对应主管尚未到岗。'}`,advice:lead?'授权主管更便宜，口碑也更好。':'先亲自处理，避免超时；之后考虑聘任主管。',options:[
    {label:'亲自处理 · ¥350',action:'resolve',id:String(e.id),value:'gm',effects:[{k:'现金',v:-350,money:true},{k:'口碑',v:1},{k:'业主',v:1}],note:'经理亲自协调，马上解决。',recommended:!lead},
    {label:'交给主管 · ¥150',action:'resolve',id:String(e.id),value:'sop',effects:[{k:'现金',v:-150,money:true},{k:'口碑',v:2},{k:'业主',v:1}],note:'按部门 SOP 处理。',disabled:lead?undefined:'需要先聘任对应主管',recommended:lead}]}),actions:`<button class="game-action" data-entity="${esc(e.target)}">去现场看看</button>`+(lead?'':go('聘任主管','operations'))});}
  for(const w of pending.filter(w=>!cards.some(c=>c.id===w.key)&&!s.guests.some(v=>v.roomId&&v.id===w.key)))cards.push({id:w.key,body:head('front',w.title,w.detail)+`<div class="focus-decision"><p>${esc(w.note)}</p></div>`,actions:w.button});
  const i=u.event?Math.max(0,cards.findIndex(v=>v.id===u.event||v.id===u.event+'-birthday'||v.id===u.event+'-late')):Math.min(u.eventPage,Math.max(0,cards.length-1)),c=cards[i];
  return frame('逐件处理 · '+cards.length+' 项',c?pager('eventPage',i,cards.length)+c.body:head('front','待办全部处理完了','关上面板，回到酒店看决定如何发生。'),c?.actions??go('回到经营','hub'));
 }
 if(view==='hotel'||view==='entity'){
  const floors=s.floors.filter(f=>f.role==='guest'),floor=floors.find(f=>f.id===(u.floor??s.entities[u.room??'']?.floorId))??floors[0];
  if(!floor)return null;const slots=roomSlots(s).filter(r=>r.floorId===floor.id),r=slots.find(r=>r.id===u.room)??slots[0];if(!r)return null;u.room=r.id;u.floor=floor.id;
  const nav=tabs(floors.map(f=>choose(f.label,'floor',f.id,f.id===floor.id)).join(''))+`<div class="focus-room-map">${slots.map(v=>choose(v.number+'<small>'+({available:'可入住',occupied:'在住',dirty:'待清洁',cleaning:'清洁中',maintenance:'封闭',reserved:'已预留',unbuilt:'＋设置'}[v.status])+'</small>','room',v.id,v.id===r.id)).join('')}</div>`;
  const construction=r.construction??floor.construction;
  if(construction)return frame(r.number+' · 封闭施工',nav+`<div class="focus-space">${spaceIllustration('hotel')}</div>`+metrics([['剩余',construction.remaining+' 分钟'],['完成后','开放使用']]),go('扩建与全部参数','hotel-data'));
  if(r.status==='unbuilt')return frame(r.number+' · 设置房型',nav+tabs(Object.entries(ROOM_TIERS).map(([id,t])=>choose(t.name,'category',id,u.category===id)).join(''))+tabs(choose('大床','bed','king',u.bed==='king')+choose('双床','bed','twin',u.bed==='twin'))+metrics([['配置费用',money(ROOM_TIERS[u.category as keyof typeof ROOM_TIERS].cost)],['新客房价',money(g.price*ROOM_TIERS[u.category as keyof typeof ROOM_TIERS].factor)+'起']])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',btn('确认设置','configure-room',r.id,u.category+':'+u.bed));
  const v=s.guests.find(v=>v.id===r.guestId),level=r.level??1;
  const actions=r.status==='dirty'?btn('清洁 · ¥90','clean',r.id):r.status==='maintenance'&&!r.timer?btn('维修 · ¥180','repair',r.id):r.status==='available'?`<button class="game-action" data-open="front" data-assign-room="${r.id}">安排入住</button>`+(level<5?btn('装修 · '+money(level*2500),'upgrade',r.id):'')+(standardSuite(r)?btn('留给会员','reserve',r.id):''):r.status==='reserved'&&!r.suaBookingId?btn('释放预留','release',r.id):v?`<button class="game-action" data-open="events" data-guest="${v.id}">${v.occasion&&!v.occasion.resolved?'生日礼遇':'查看服务诉求'}</button>`:'';
  return frame(r.number+' · '+roomName(r),nav+`<div class="focus-space">${spaceIllustration('hotel',level,r.bed??(r.type==='twin'?'twin':'king'),r.category??r.type)}<span>Lv.${level} · ${v?esc(v.name):'暂无住客'}</span></div>`+metrics([['每晚房费',money(v?.rate??roomRate(g.price,r))],['剩余住宿',r.nightsLeft+' 晚'],['升级增收',level<5?'每新客晚 +'+money(roomRate(g.price,{...r,level:level+1})-roomRate(g.price,r)):'已满级']])+`<p class="focus-trade">${r.status==='available'?'装修需停卖 90 分钟；已确认订单价格不变。':v?esc(v.thought):'等清洁或维修完成后，才能再次出售。'}</p>`,actions+go('房间明细','room-data'));
 }
 if(view==='hotel-data'){
  const count=s.floors.filter(f=>f.role==='guest').length,cost=10000+5000*(count-3),building=s.floors.filter(f=>f.construction);
  return frame('扩建 · 再高一层',`<div class="focus-space">${spaceIllustration('hotel')}<span>施工 → 竣工 → 手动设置房型</span></div>`+metrics([['建设费',money(cost)],['交付时间','4 小时'],['新增','3 个空位']])+head('engineering','扩建前先确认现金与需求','施工期间新楼层封闭；竣工后逐间选择房型，普通客房配置已含在造价中。')+`<p class="focus-trade">${building.length?building.length+' 层仍在施工。':''}相邻房间有噪声风险；已有空房较多时，可先改善现有客房。</p>`,btn('开工 · '+money(cost),'expand')+go('查看房态','hotel')+go('投资明细','hotel-archive'));
 }
 if(view==='development-data'){
  const key=Object.hasOwn(ACTIVITIES,u.activity)?u.activity:'coffee',a=ACTIVITIES[key as keyof typeof ACTIVITIES],pending=g.development?.activity;
  return frame('活动 · 投入一场体验',tabs(Object.entries(ACTIVITIES).map(([id,v])=>choose(v.name,'activity',id,id===key)).join(''))+head('fnb',a.name,a.description)+metrics([['筹备费',money(a.cost)],['准备时间','2 小时'],['每位收入',money(a.fee)]])+`<p class="focus-trade">${pending?'已有活动筹备中，等待现场结算。':'人数受在住客人、天气、定位与容量影响；收入不足筹备费时会亏损。'}每个营业日只能安排一场。</p>`,btn(pending?'正在筹备':'安排活动 · '+money(a.cost),'activity',key,'',pending||g.development?.activityDay===g.day?'disabled':'')+btn('三日推广 · ¥2,200','campaign')+go('查看设施','development'));
 }
 if(view==='operations'){
  const names:Record<Department,string>={front:'前厅',house:'客房',engineering:'工程',fnb:'餐饮',revenue:'收益'},d=u.department??'house',level=g.managers[d],cost=level?4500*level:3800;
  const note={front:'自动分房与常规诉求；无空房仍需等待。',house:`每间清洁 ${houseMinutes(level)} → ${houseMinutes(Math.min(3,level+1))} 分钟，另需到场时间。`,engineering:`维修 ${engineeringMinutes(level)} → ${engineeringMinutes(Math.min(3,level+1))} 分钟，另需到场时间。`,fnb:'低库存时派员工配送，到餐台后才计入库存。',revenue:'次日自动定价；报价更高也可能减少客流。'}[d];
  return frame('团队 · 原位授权',tabs(Object.entries(names).map(([id,n])=>choose(n,'department',id,id===d)).join(''))+head(d,names[d]+'主管',level?'已到岗 · Lv.'+level:'尚未聘任')+metrics([['投入',level>=3?'已满级':money(cost)],['每日工资',money(level*180)+' → '+money(Math.min(3,level+1)*180)],['团队精力',String(morale(s))]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${note}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。满房、加班和抽调会消耗团队精力，低于 60 翻房变慢，低于 35 明显拖慢。</p></div>`,(level<3?btn(level?'培训升级':'聘任到岗',level?'train':'hire',d):'')+go('效果与财务明细','operations-data'));
 }
 if(view==='development'){
  const fs=Object.values(s.entities).filter(e=>e.kind==='facility'),f=fs.find(e=>e.id===u.facility)??fs[0];if(!f)return null;const level=f.level??1;
  return frame('设施 · 看清再投资',tabs(fs.map(e=>choose(e.name,'facility',e.id,e.id===f.id)).join(''))+`<div class="focus-space">${spaceIllustration(f.role,level)}<span>${f.name} · Lv.${level}</span></div>`+metrics([['使用 / 容量',f.usage+' / '+f.capacity],['升级后容量',String(f.capacity+4)],['费用',money(level*3500)]])+`<p class="focus-trade">${f.construction?'施工剩余 '+f.construction.remaining+' 分钟。':'升级需封闭施工；先补货或维护可解决眼前问题。'}</p>`,(f.construction?'':(level<5?btn('升级设施','invest',f.id):'')+(['breakfast','club'].includes(f.role)?btn('补货 · ¥300','stock',f.role):btn('维护 · ¥200','repair',f.id)))+go('营销、活动、更多','development-data'));
 }
 const echoes=(g.echoes??[]).filter(e=>e.day===g.day),echo=echoes.length?`<div class="brief-echoes"><small>昨日决定的回响</small>${echoes.map(e=>`<p>${esc(e.text)}</p>`).join('')}</div>`:'',start='开始营业'+(queue.length||lesson?.key==='brief'?' · 前往接待':'');
 if(view==='brief'&&featureLock(s,'strategy')){const f=forecast(s),first=g.day===1;return frame(first?'08:00 · 第一次晨会':'08:00 · 晨会 · Day '+g.day,metrics([['预计入住',f.occupancy+'%'],['待到店',String(g.operations?.bookings.filter(b=>b.status==='confirmed').length??0)],['早餐需求',f.breakfast+' 人']])+echo+head(lesson?.department??'front',first?'今天先把一位客人接好':'今天的重点：'+(DAY_THEMES[g.day-1]??'稳住服务节奏'),first?'先沿用当前报价营业。学会接待、翻房和委派后，再解锁房价与留套决策。':`早餐预计 ${f.breakfast} 人，当前库存 ${g.stock} 份。房价与经营方向在 Day 3 晨会解锁，今天沿用当前报价。`),g.operations?.briefOpen?btn(start,'brief-start'):go('继续当前带教','tasks'));}
 if(view==='brief'){
  const f=forecast(s),tab=u.meeting;
  const p=g.plan,planCards=`<div class="plan-choices">${Object.entries(DAY_PLANS).map(([id,v])=>`<button data-action="day-plan" data-value="${id}" aria-pressed="${p?.selected&&p.focus===id}" ${!g.operations?.briefOpen?'disabled':''}><span class="plan-mark">${p?.selected&&p.focus===id?'✓':id==='occupancy'?'↗':id==='experience'?'♡':'¥'}</span><span><strong>${v.name}<small>¥${v.price}${id==='experience'?' · 预采购 ¥240':''}</small></strong><small>${esc(v.risk)}</small></span></button>`).join('')}</div>`;
  const body=tab==='price'?head('revenue','今天挂牌多少？','高价增加单晚收入，也可能减少 Walk-in。')+metrics([['当前挂牌',money(g.price)],['预计入住',f.occupancy+'%']])+tabs(btn('¥720 · 争取入住','price','','720')+btn('¥850 · 提高单价','price','','850')):tab==='service'?head('fnb','先备好今天的服务',`早餐预计 ${f.breakfast} 人，当前 ${g.stock} 份。`)+metrics([['早餐',g.stock+' 份'],['酒廊',g.clubStock+' 份']])+tabs(btn('早餐 +50 · ¥300','stock','breakfast')+btn('酒廊 +50 · ¥300','stock','club')):tab==='suite'?head('front','套房要留一间吗？','留套照顾会员；开放销售保留付费机会。SUA 锁房不变。')+metrics([['当前策略',g.operations?.suitePolicy==='hold'?'保留一间':'开放销售']])+tabs(btn('保留一间','suite-policy','','hold')+btn('开放销售','suite-policy','','sell')):metrics([['预计入住',f.occupancy+'%'],['待到店',String(g.operations?.bookings.filter(b=>b.status==='confirmed').length??0)],['早餐需求',f.breakfast+' 人']])+echo+planCards+head('revenue',p?'今晚检验：'+planValue(p.focus,p.target):'先选一个经营方向',p?.selected?DAY_PLANS[p.focus].description:'也可按当前设置直接营业；下方选项会实际调整报价、留套和库存。');
  return frame('08:00 · 晨会',tabs(['overview','price','service','suite'].map((id,i)=>choose(['重点','房价','备货','套房'][i],'meeting',id,id===tab)).join(''))+body,g.operations?.briefOpen?btn(start,'brief-start')+go('预订 / 客源明细','bookings'):go('回到经营','hub')+go('完整预测','brief-data'));
 }
 if(view==='evening'||view==='report'){
  const r=g.evening,day=g.reports.at(-1);if(view==='evening'&&!r)return frame('20:00 · 晚间复盘',head('revenue','今晚 20:00 自动开会','继续经营，届时核对收入、客诉与总部建议。'),go('回到经营','hub'));
  if(view==='report'&&!day)return frame('今日尚未日结',head('revenue','房费于午夜结算','现在可以查看 20:00 快照，或继续经营。'),go('晚间复盘','evening'));
  const summary=view==='evening'?r!.notes[0]?.text:day!.recommendation;
  const review=view==='evening'?r?.plan:day?.plan,planRead=review?`<div class="plan-result ${review.success?'success':'miss'}"><small>${view==='evening'?'20:00 阶段检验':'午夜最终对账'} · ${DAY_PLANS[review.focus].name}</small><strong>${planValue(review.focus,review.actual)} <span>/ 目标 ${planValue(review.focus,review.target)}</span></strong><p>${review.success?'判断奏效':'还有差距'} · ${esc(review.lesson)}</p></div>`:'';
  const made=view==='evening'?r!.decisions??[]:(g.decisions??[]).filter(x=>x.day===day!.day),decided=made.length?`<div class="decision-recap"><small>今天的决定 · ${made.length} 项</small>${made.slice(-3).map(x=>`<p><b>${esc(x.title)}</b>${esc(x.choice)} → ${esc(x.result||'等待午夜结算')}${x.future?'<em>'+esc(x.future)+'</em>':''}</p>`).join('')}<button data-open="decisions">全部决策记录 ›</button></div>`:'';
  return frame(view==='evening'?'20:00 · 今天经营得如何？':'Day '+day!.day+' · 日结',planRead+decided+metrics(view==='evening'?[['预计净额',money(r!.projectedNet)],['入住率',r!.occupancy+'%'],['待办',String(r!.pending)]]:[['净额',money(day!.revenue-day!.expense)],['入住率',day!.occupancy+'%'],['客诉',String(day!.complaints)]])+head('revenue','今晚优先改进',summary??'保持服务节奏。')+'<p class="focus-trade">'+(view==='evening'?'这是 20:00 快照；预计房费还未入账。':'这是午夜结算结果。')+'</p>',go('客诉 / 明细',view==='evening'?'evening-data':'report-data')+(view==='evening'&&r?.open?btn('交给夜班 · 继续经营','evening-close'):g.reportOpen?btn('开始下一天','continue'):go('回到经营','hub')));
 }
 if((view==='tasks'||view==='teaching')&&lesson){const wait=lesson.waiting,row=(i:number)=>{const state=i<lesson.index?'done':i>lesson.index?'locked':wait?'waiting':'current';return `<div class="checklist-row ${state}"><span>${{done:'✓',current:'▶',waiting:'☾',locked:'◇'}[state]}</span><strong>${esc(OPENING[i].title)}</strong><small>${{done:'已完成',current:'现在做',waiting:'明天解锁',locked:'待解锁'}[state]}</small></div>`;};
  const route=DAY_THEMES.map((theme,d)=>`<div class="checklist-day${d+1<lesson.day?' past':''}"><small>Day ${d+1} · ${theme}</small>${OPENING.map((step,i)=>step.day===d+1?row(i):'').join('')}</div>`).join('');
  return frame('开业带教 · '+(lesson.index+1)+' / '+lesson.total,`<div class="guided-checklist">${route}</div>`+(wait?head(lesson.department,'今天的带教完成了','接下来自由经营到明早：接待、翻房和住客诉求照常发生。明天 08:00 继续「'+lesson.title+'」。'):head(lesson.department,lesson.title,lesson.why))+`<p class="unlock-preview">完成后解锁 · ${esc(lesson.unlock)}</p>`,wait?go('回到酒店','hub')+go('今晚复盘','evening'):go('去完成这一步',lesson.target)+go('回到酒店','hub'));}
 if(view==='decisions'){const list=[...(g.decisions??[])].reverse(),i=Math.min(u.logPage,Math.max(0,list.length-1)),r=list[i];
  return frame('决策记录 · '+list.length+' 项',r?pager('logPage',i,list.length)+`<article class="decision-record"><small>Day ${r.day} · ${clock(r.minute)}${r.auto?' · 超时自动处理':''}</small><strong>${esc(r.title)}</strong><p><b>选择</b>${esc(r.choice)}</p><p><b>结果</b>${esc(r.result||'等待午夜结算')}</p>${r.future?`<p><b>后续</b>${esc(r.future)}</p>`:''}</article>`:head('revenue','还没有经营抉择','Day 3 起，资源冲突会变成需要你拍板的抉择，选择与结果都记录在这里。'),go('当前待办','events')+go('今晚复盘','evening'));}
 if(view==='tasks'){
  const c=g.campaign,goal=campaignGoal(s),exam=c?.inspection,result=c?.result;
  if(!goal)return frame('酒店成长路线 · 完成',head('revenue','五段经营检验全部通过','经营仍会继续。培养熟客、建设酒店，长期里程碑保留。')+metrics([['认证',String(c?.certificates.length??0)+' / 5']]),go('继续经营','hub')+go('支线与里程碑','tasks-data'));
  const route=`<div class="chapter-checklist"><span>✓ 开业带教${c?.certificates.length?' · '+c.certificates.length+' 项认证已完成':''}</span><strong>▶ ${esc(goal.title)}</strong><small>下一步 · ${CHAPTER_UNLOCKS[c?.chapter??0]}</small></div><small class="campaign-route">酒店成长路线 · ${Math.min(5,(c?.chapter??0)+1)} / 5${c?.certificates.length?' · 已获 '+c.certificates.length+' 项认证':''}</small>`;
  if(result)return frame(result.passed?'体验通过 · '+goal.exam:'需要改善 · '+goal.exam,route+head(goal.department,goal.title,result.advice)+metrics([['现场表现',String(result.score)],['通过标准',String(goal.threshold)]])+`<div class="inspection-scenes">${result.scenes.map(text=>`<p>${esc(text)}</p>`).join('')}</div><p class="focus-trade">${result.passed?'确认后进入下一段目标；日常经营不会重置。':'目标进度保留；免费重约，次日到店再检验。'}</p>`,result.passed?btn('进入下一阶段','continue-chapter'):go('先去改善',result.target)+btn('免费预约重试','book-inspection'));
  if(exam){const remaining=Math.max(0,exam.due-g.day*1440-g.minute),elapsed=g.day*1440+g.minute-exam.due,step=Math.min(2,Math.max(0,Math.floor(elapsed/10)));
   return frame(goal.exam+' · '+(exam.phase==='booked'?'已预约':'现场体验中'),route+head(goal.department,exam.phase==='booked'?'留出时间把酒店准备好':['Room Check · 客房巡检','F&B · 体验餐台','Front Office · 核对承诺'][step],exam.phase==='booked'?'检验看实际房态、住客体验、餐饮库存和诉求积压，现场还会有小幅波动。':'检验员按顺序体验酒店；尚未公布结果。')+metrics([['到店时间','Day '+Math.floor(exam.due/1440)+' · 18:00'],['等待',exam.phase==='booked'?remaining+' 分钟':Math.max(0,30-elapsed)+' 分钟后反馈'],['额外准备',exam.prepared?'已彩排 · +6':'可选 · ¥300']])+`<div class="inspection-timeline"><span class="${elapsed>=0?'active':''}">看房</span><span class="${elapsed>=10?'active':''}">用餐</span><span class="${elapsed>=20?'active':''}">服务</span></div><p class="focus-trade">彩排提高表现，但不能替代清洁、备货和兑现承诺。</p>`,(exam.phase==='booked'&&!exam.prepared?btn('现场彩排 · ¥300','prepare-inspection'):'')+go('检查房态','hotel')+go('备货与服务','operations'));
  }
  return frame(goal.title,route+head(goal.department,goal.action,goal.ready?'行动目标已完成。预约一次真实体验，检验今天的经营。':'先做好这一件事。目标跨天保留，完成后预约次日检验。')+metrics([['当前进度',goal.progress+' / '+goal.goal],['下一次检验',goal.exam]])+`<progress max="${goal.goal}" value="${goal.progress}" aria-label="${esc(goal.action)}"></progress><p class="focus-trade">日常支线奖金分段到账，完成后可领尾款；单任务奖金上限不变。</p>`,(goal.ready?btn('预约检验 · 次日 18:00','book-inspection'):go('去完成当前目标',goal.target))+go('支线奖励与带教','tasks-data'));
 }

 return null;
}
