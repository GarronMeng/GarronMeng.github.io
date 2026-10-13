import type {PreviewState,Command,Department,Dilemma,DilemmaKind,DecisionRecord,Guest,Room} from '../state/types';
import {rooms} from '../state/selectors';
import {standardSuite,isSuite} from '../content/roomTypes';
import {initOperations,newProfile,walkinEstimate,forecast,operationsLog} from './operations';
import {track} from './progression';
import {say} from './guestDialogue';
import {queueTravel,travel,hash} from './guestMovement';
import {dispatchTempCleaner,staffAssigned} from './workforce';
import {lateHour,lateLabel} from './guestRequests';
import {onboardingStep,featureLock,STEP} from './onboarding';

export interface Effect {k:string;v:number|string;money?:boolean;tone?:'good'|'bad'|'warn'}
export interface DilemmaOption {id:string;label:string;effects:Effect[];note:string;disabled?:string}
export interface DilemmaView {title:string;situation:string;advisor:Department;advice:string;recommend:string;fallback:string;options:DilemmaOption[];guest?:Guest;left:number}

const now=(s:Readonly<PreviewState>)=>s.game!.day*1440+s.game!.minute;
const clock=(m:number)=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const clamp=(n:number)=>Math.max(0,Math.min(100,Math.round(n)));
const DURATION:Record<DilemmaKind,number>={overbook:120,'vip-upgrade':90,'hk-overtime':60,'noise-comp':60,budget:240};
const ROLE:Record<string,string>={planner:'公司差旅负责人，正在评估明年的协议酒店',creator:'有 8 万粉丝的旅行博主',whale:'常年包整层开年会的企业老板',forum:'常在论坛写长篇点评的会员'};

export function initDilemmas(s:PreviewState){const g=s.game!;g.morale??=80;g.dilemmas??=[];g.decisions??=[];g.followups??=[];g.echoes??=[];g.dilemmaSeen??={};return g;}
export const morale=(s:Readonly<PreviewState>)=>s.game!.morale??80;
export function adjustMorale(s:PreviewState,n:number){const g=initDilemmas(s);g.morale=clamp(g.morale!+n);}
const residents=(s:Readonly<PreviewState>)=>s.guests.filter(v=>!v.staff&&v.roomId&&!v.departing);
const freeRooms=(s:Readonly<PreviewState>)=>rooms(s).filter(r=>r.status==='available'&&!r.construction&&!r.suaBookingId);
const freeSuites=(s:Readonly<PreviewState>)=>freeRooms(s).filter(standardSuite);
const pendingBookings=(s:Readonly<PreviewState>)=>s.game!.operations?.bookings.filter(b=>b.status==='confirmed')??[];
/** firm: rooms left after stayovers, the queue and confirmed bookings; walk: walk-ins still expected today. */
export function spareTonight(s:Readonly<PreviewState>){const g=s.game!,o=g.operations,capacity=rooms(s).filter(r=>!r.construction).length,stay=residents(s).filter(v=>(v.checkoutDay??g.day)>g.day).length,queue=s.guests.filter(v=>!v.staff&&!v.roomId&&!v.departing).length;return {firm:capacity-stay-queue-pendingBookings(s).length,walk:Math.max(0,walkinEstimate(s)-(o?.walkinArrivals??0))};}

/** Rooms that can still take a guest tonight (clean, being turned, or dirty), net of the queue. */
export function sellableRooms(s:Readonly<PreviewState>){return rooms(s).filter(r=>!r.construction&&(r.status==='available'&&!r.suaBookingId||r.status==='dirty'||r.status==='cleaning')).length-s.guests.filter(v=>!v.staff&&!v.roomId&&!v.departing).length;}
/** A walk-in taking a room now leaves later confirmed bookings without one when this is below 1. */
export function walkinDisplaces(s:Readonly<PreviewState>,v:Guest){if(v.reservationId)return 0;const g=s.game!,later=pendingBookings(s).length,stay=residents(s).filter(x=>(x.checkoutDay??g.day)>g.day).length,others=s.guests.filter(x=>!x.staff&&!x.roomId&&!x.departing&&x.id!==v.id&&x.reservationId).length,capacity=rooms(s).filter(r=>!r.construction).length;return Math.max(0,stay+others+later+1-capacity);}
export function recordDecision(s:PreviewState,kind:DecisionRecord['kind'],title:string,choice:string,result:string,auto=false){const g=initDilemmas(s),r:DecisionRecord={id:g.nextId++,day:g.day,minute:g.minute,kind,title,choice,result,auto};g.decisions!.push(r);if(g.decisions!.length>40)g.decisions!.shift();track(s,'decision');return r;}
const note=(s:PreviewState,text:string,target?:string)=>operationsLog(s,text,'抉择',target);

function candidate(s:Readonly<PreviewState>,kind:DilemmaKind,force=false):Omit<Dilemma,'id'|'kind'|'day'|'created'|'expires'>|null{
 const g=s.game!,m=g.minute;
 if(kind==='overbook'){if(m>1140||!force&&(m<570||m>840))return null;const {firm}=spareTonight(s);if(!force&&firm<1)return null;return {count:Math.max(2,Math.min(3,firm+1)),rate:Math.round(g.price*1.1)};}
 if(kind==='vip-upgrade'){if(m<720||m>1140||!freeSuites(s).length)return null;const pool=residents(s).filter(v=>v.tier!=='Globalist'&&!v.asked?.includes('vip')&&!v.upgrades&&!isSuite(s.entities[v.roomId!] as Room)&&(v.checkoutDay??g.day)>g.day);const v=pool.find(v=>ROLE[v.persona??''])??pool[0];return v?{guestId:v.id,roomId:v.roomId}:null;}
 if(kind==='hk-overtime'){if(m<690||m>990)return null;const dirty=rooms(s).filter(r=>r.status==='dirty'&&!r.construction&&!staffAssigned(s,r.id)).length,soon=pendingBookings(s).filter(b=>b.eta<=m+180).length;return dirty>=3||dirty>=2&&soon>=2?{count:dirty}:null;}
 if(kind==='noise-comp'){if(m<1230||m>1350)return null;const pool=residents(s).filter(v=>!v.asked?.includes('noise')&&(v.checkoutDay??g.day)>g.day&&!v.compNight).sort((a,b)=>Number(b.persona==='forum')-Number(a.persona==='forum')||(a.satisfaction??90)-(b.satisfaction??90));const v=pool[0];if(!v)return null;const floor=s.floors.find(f=>f.id===v.floorId)?.number??0,building=s.floors.some(f=>f.construction&&Math.abs(f.number-floor)<=1)||Object.values(s.entities).some(e=>e.construction&&e.floorId===v.floorId);return {guestId:v.id,roomId:v.roomId,reason:building?'楼层施工的噪音':['隔壁房间深夜喧哗','空调一直嗡嗡响','走廊推车的声音'][hash(v.id)%3]};}
 if(kind==='budget'){if(m<540||m>720||g.day<4||(g.day-1)%3!==0||featureLock(s,'strategy'))return null;return {};}
 return null;
}

/** One live decision at a time; variety comes from preferring the kind seen longest ago. */
export function tickDilemmas(s:PreviewState){const g=initDilemmas(s),t=now(s);
 for(const d of [...g.dilemmas!]){if(stale(s,d)){g.dilemmas=g.dilemmas!.filter(x=>x.id!==d.id);note(s,'情况已变化，「'+describeDilemma(s,d).title+'」无需再决定。',d.roomId);}else if(t>=d.expires)resolveDilemma(s,d.id,describeDilemma(s,d).fallback,true);}
 tickLateLesson(s);
 const step=onboardingStep(s),teaching=step===STEP.dilemma;
 if(g.dilemmas!.length||g.minute%15!==0||step<STEP.dilemma||g.reportOpen||g.evening?.open)return;
 const today=g.decisions!.filter(d=>d.day===g.day&&d.kind!=='late'&&d.kind!=='birthday').length,last=Math.max(0,...Object.values(g.dilemmaSeen!));
 if(today>=(g.day>=7?3:2)||t-last<150&&!teaching)return;
 const order=(['budget','overbook','hk-overtime','vip-upgrade','noise-comp'] as DilemmaKind[]).sort((a,b)=>(a==='budget'?-1:b==='budget'?1:0)||(g.dilemmaSeen![a]??0)-(g.dilemmaSeen![b]??0));
 const fresh=(k:DilemmaKind)=>(g.dilemmaSeen![k]??0)<g.day*1440;let kind=order.find(k=>fresh(k)&&candidate(s,k)),data=kind?candidate(s,kind):null;
 if(!data&&teaching&&g.minute>=540&&g.minute<=1140&&fresh('overbook')){kind='overbook';data=candidate(s,kind,true);}
 if(!kind||!data)return;
 const d:Dilemma={id:g.nextId++,kind,day:g.day,created:t,expires:t+DURATION[kind],teach:teaching,...data};g.dilemmas!.push(d);g.dilemmaSeen![kind]=t;
 const v=s.guests.find(v=>v.id===d.guestId);if(v){v.asked=[...(v.asked??[]),kind==='vip-upgrade'?'vip':'noise'];say(s,v,kind==='vip-upgrade'?'能不能升个套房看看？我回去好写报告。':'这个噪音让人睡不着，得找前台说说。');}
 const view=describeDilemma(s,d);note(s,'经营抉择：'+view.title+'（'+DURATION[kind]+' 分钟内决定）',d.roomId??'facility-lobby');
 if(teaching||!g.decisions!.some(r=>r.kind!=='late'&&r.kind!=='birthday'))g.spotlight={id:g.nextId++,view:'events',key:'dilemma-'+d.id};
}

function stale(s:Readonly<PreviewState>,d:Dilemma){const v=s.guests.find(v=>v.id===d.guestId);if(d.kind==='vip-upgrade')return !v?.roomId||v.departing||!freeSuites(s).length;if(d.kind==='noise-comp')return !v?.roomId||v.departing;if(d.kind==='hk-overtime')return !rooms(s).some(r=>r.status==='dirty'&&!r.construction&&!staffAssigned(s,r.id));return false;}
/** Day 2 lesson: guarantee one member asks for a late checkout so the decision can be practised. */
function tickLateLesson(s:PreviewState){const g=s.game!;if(onboardingStep(s)!==STEP.late||g.day<2||g.operations?.briefOpen)return;
 const asking=s.guests.find(v=>v.late==='pending'&&v.roomId&&!v.departing);if(asking){if(g.spotlight?.key!==asking.id+'-late')g.spotlight={id:g.nextId++,view:'events',key:asking.id+'-late'};return;}
 if(g.minute<540)return;
 const pool=residents(s).filter(v=>!v.late&&(v.checkoutDay??99)<=g.day+1),v=pool.find(v=>v.tier==='Globalist'||v.tier==='Explorist')??pool[0];if(!v)return;
 if(v.tier!=='Globalist'&&v.tier!=='Explorist')v.tier='Explorist';v.lateHour=v.tier==='Globalist'?16:14;v.late='pending';say(s,v,(v.checkoutDay===g.day?'今天':'明天')+'能 '+lateLabel(v)+' 退房吗？下午还有个会。');
 operationsLog(s,v.name+' · '+v.tier+'：'+(v.checkoutDay===g.day?'今天':'明天')+'能 '+lateLabel(v)+' 退房吗？','入住',v.roomId);g.spotlight={id:g.nextId++,view:'events',key:v.id+'-late'};
}

/** Honouring a late checkout costs nothing when afternoon arrivals still have rooms; this makes the cost explicit. */
export function lateConflict(s:Readonly<PreviewState>,v:Guest){const hour=lateHour(v)*60,arrivals=pendingBookings(s).filter(b=>b.eta<hour).length+s.guests.filter(x=>!x.staff&&!x.roomId&&!x.departing).length,free=freeRooms(s).length+rooms(s).filter(r=>r.status==='dirty'||r.status==='cleaning').length;return {hour,arrivals,free,short:Math.max(0,arrivals-free)};}

export function describeDilemma(s:Readonly<PreviewState>,d:Dilemma):DilemmaView{
 const g=s.game!,left=Math.max(0,d.expires-now(s)),v=s.guests.find(v=>v.id===d.guestId),room=s.entities[d.roomId??''] as Room|undefined;
 if(d.kind==='overbook'){const n=d.count??2,rate=d.rate??g.price,{firm,walk}=spareTonight(s),left2=(k:number)=>firm-k,risk=(k:number)=>left2(k)<0?{k:'超售',v:`${-left2(k)} 单可能无房 · ¥600/单`,tone:'bad' as const}:{k:'散客',v:walk>left2(k)?`约 ${walk-left2(k)} 位可能没房`:'仍有余量',tone:walk>left2(k)?'warn' as const:'good' as const};
  return {title:'会展团队想追加 '+n+' 间今晚入住',situation:`团队价 ¥${rate}/晚，比挂牌高 10%，18:00 到店。扣除在住、排队和已确认预订后还剩 ${Math.max(0,firm)} 间；今天预计还有约 ${walk} 位散客。`,advisor:'revenue',advice:firm>=n&&walk<=firm-n+1?'余量够用，团队价确定又更高，全部接下更划算；记得提前翻好脏房。':firm>=1?'团队价确定，但会挤掉散客；接一间，把剩下的留给散客和会员。':'已经没有确定余量，超售会变成安置费和差评。',recommend:firm>=n&&walk<=firm-n+1?'all':firm>=1?'one':'decline',fallback:'decline',left,
   options:[{id:'all',label:'全部接下 · '+n+' 间',effects:[{k:'房费',v:n*rate,money:true},{k:'团队精力',v:-2*n},risk(n)],note:'加入今日预订；到店时没有可用房就要安置赔付。'},{id:'one',label:'只接 1 间',effects:[{k:'房费',v:rate,money:true},{k:'团队精力',v:-2},risk(1)],note:'确定收入与散客机会各留一部分。'},{id:'decline',label:'婉拒追加',effects:[{k:'业主',v:-1},{k:'房间',v:'全部留给散客',tone:'warn'}],note:'没有超售风险，但散客不一定会来。'}]};}
 if(d.kind==='vip-upgrade'&&v&&room){const suites=freeSuites(s).length,gl=pendingBookings(s).filter(b=>g.operations?.profiles[b.profileId]?.tier==='Globalist').length,role=ROLE[v.persona??'']??'公司差旅负责人',nights=Math.max(1,(v.checkoutDay??g.day+1)-g.day),fee=180,valuable=!!ROLE[v.persona??''];
  return {title:v.name+' 想免费升到套房',situation:`${v.name}（${v.tier}，住 ${room.number}）是${role}。可售标准套 ${suites} 间，今晚还有 ${gl} 位 Globalist 预订没到。`,advisor:'front',advice:gl>=suites?'套房要留给已确认的 Globalist；送出去今晚就可能有会员拿不到升套。':valuable?'他可能带来后续订单，今天套房有余量，送出去的长期价值更大。':'余量不多，先提供付费升级，让客人自己选择。',recommend:gl>=suites?'decline':valuable?'free':'paid',fallback:'decline',guest:v,left,
   options:[{id:'free',label:'免费升套',effects:[{k:'体验',v:12},{k:'业主',v:-2},{k:'套房库存',v:-1}],note:valuable?'明天可能带来协议或推广订单。':'客人记住这份礼遇。',disabled:suites?undefined:'暂无可售标准套'},{id:'paid',label:`付费升级 ¥${fee}/晚`,effects:[{k:'房费',v:fee*nights,money:true},{k:'体验',v:3},{k:'风险',v:'客人可能拒绝',tone:'warn'}],note:'接受就搬进套房；拒绝时体验 −2。',disabled:suites?undefined:'暂无可售标准套'},{id:'decline',label:'婉拒 · 送欢迎饮品',effects:[{k:'现金',v:-40,money:true},{k:'体验',v:-3},{k:'套房',v:'保留',tone:'good'}],note:v.persona==='forum'?'他可能在论坛写进差评。':'套房留给付费或会员。'}]};}
 if(d.kind==='hk-overtime'){const dirty=rooms(s).filter(r=>r.status==='dirty'&&!r.construction&&!staffAssigned(s,r.id)),soon=pendingBookings(s).filter(b=>b.eta<=g.minute+180),first=soon.length?Math.min(...soon.map(b=>b.eta)):0,crew=Math.min(3,dirty.length),cost=crew*60+120,energy=morale(s),hk=g.managers.house;
  return {title:'客房部人手吃紧：'+dirty.length+' 间脏房待翻',situation:`${soon.length} 位预订将在 ${soon.length?clock(first):'稍后'} 起陆续到店。客房主管${hk?'在岗 Lv.'+hk:'尚未聘任'}，团队精力 ${energy}。`,advisor:'house',advice:energy<45?'团队已经很累，再加压会拖慢之后几天；按节奏走更稳。':soon.length>=2&&s.metrics.cash>=cost?'客人马上到，花钱加班能保住入住体验。':'到店压力不大，可以抽前台临时支援。',recommend:energy<45?'hold':soon.length>=2&&s.metrics.cash>=cost?'overtime':'borrow',fallback:'hold',left,
   options:[{id:'overtime',label:`临时加班 · ${crew} 人`,effects:[{k:'现金',v:-cost,money:true},{k:'团队精力',v:-6},{k:'翻房',v:'每间约 15 分钟',tone:'good'}],note:'加班保洁从大堂进来，翻完就下班。',disabled:crew?undefined:'没有待翻房'},{id:'borrow',label:'前台抽人支援',effects:[{k:'团队精力',v:-10},{k:'排队耐心',v:-25},{k:'翻房',v:Math.min(2,dirty.length)+' 间约 25 分钟',tone:'good'}],note:'不花钱，但前台变慢、员工更累。',disabled:dirty.length?undefined:'没有待翻房'},{id:'hold',label:'按现有节奏',effects:[{k:'团队精力',v:2},{k:'风险',v:'到店客人可能等房',tone:'warn'}],note:'保护团队，接受短时等房。'}]};}
 if(d.kind==='noise-comp'&&v&&room){const rate=v.rate??g.price,target=freeRooms(s).find(r=>r.floorId!==room.floorId)??freeRooms(s)[0],forum=v.persona==='forum',building=(d.reason??'').includes('施工');
  return {title:v.name+' 投诉'+(d.reason??'噪音'),situation:`${v.name}（${v.tier}，住 ${room.number}）要求补偿。今晚房费 ¥${rate}。${forum?'他常在论坛写长篇点评。':''}`,advisor:'front',advice:forum?'差评会影响明天的口碑；免单或换房都比果盘更稳。':target?'换房能直接解决问题，代价是多一间待翻房。':'没有空房可换，免单是唯一能真正解决的方式。',recommend:forum&&!target?'comp':target?'move':'comp',fallback:'apology',guest:v,left,
   options:[{id:'comp',label:`免今晚房费`,effects:[{k:'房费',v:-rate,money:true},{k:'体验',v:10},{k:'后续',v:forum?'明日好评 +2':'信任 +1',tone:'good'}],note:'午夜结算时这间不收房费。'},{id:'move',label:target?'换到 '+target.number:'换房',effects:[{k:'体验',v:6},{k:'团队精力',v:-3},{k:'房态',v:'原房待翻',tone:'warn'}],note:'客人搬到安静楼层。',disabled:target?undefined:'暂无空房可换'},{id:'apology',label:'致歉果盘 · ¥60',effects:[{k:'现金',v:-60,money:true},{k:'体验',v:building?-8:-4},{k:'后续',v:forum?'明日差评 −3':'问题未解决',tone:'bad'}],note:'最便宜，但没有解决噪音。'}]};}
 const cash=s.metrics.cash,occ=Math.round(g.reports.slice(-3).reduce((n,r)=>n+r.occupancy,0)/Math.max(1,g.reports.slice(-3).length)),fs=Object.values(s.entities).filter(e=>e.kind==='facility'),maint=Math.round(fs.reduce((n,f)=>n+(f.kind==='facility'?f.maintenance:0),0)/Math.max(1,fs.length)),energy=morale(s),campaign=(g.development?.campaignUntil??0)>=g.day;
 return {title:'本周只批一项经营预算',situation:`现金 ¥${cash.toLocaleString('en-US')}。近 3 天平均入住 ${occ}%，团队精力 ${energy}，公区平均维护 ${maint}。`,advisor:'revenue',advice:cash<5000?'现金偏紧，先留住工资和备货资金。':occ<60&&!campaign?'客流不足才是瓶颈，营销最先见效。':energy<55?'团队精力不足会拖慢翻房，先培训和休整。':maint<80?'公区老化会增加故障，先做维护。':'各项平稳，按你想走的方向投资。',recommend:cash<5000?'save':occ<60&&!campaign?'marketing':energy<55?'training':maint<80?'maintenance':'save',fallback:'save',left,
  options:[{id:'marketing',label:'三日营销 · ¥2,200',effects:[{k:'现金',v:-2200,money:true},{k:'客流',v:'3 天 +35%',tone:'good'},{k:'风险',v:'满房时拒客增加',tone:'warn'}],note:'客流不足时回本最快。',disabled:campaign?'推广仍在进行':cash<2200?'现金不足':undefined},{id:'training',label:'员工培训 · ¥1,800',effects:[{k:'现金',v:-1800,money:true},{k:'团队精力',v:20},{k:'业主',v:-1}],note:'精力恢复后翻房更快，不直接增加收入。',disabled:cash<1800?'现金不足':undefined},{id:'maintenance',label:'设施维护 · ¥1,500',effects:[{k:'现金',v:-1500,money:true},{k:'维护',v:'全部恢复 100',tone:'good'},{k:'故障',v:'3 天减少',tone:'good'}],note:'公区更受欢迎，故障房更少。',disabled:cash<1500?'现金不足':undefined},{id:'save',label:'留作现金',effects:[{k:'业主',v:3},{k:'机会',v:'本周不投资',tone:'warn'}],note:'业主看重稳健现金流。'}]};
}

function move(s:PreviewState,v:Guest,to:Room){const old=s.entities[v.roomId!];if(old?.kind==='room'){old.status='dirty';old.guestId=undefined;old.nightsLeft=0;}to.status='occupied';to.guestId=v.id;to.nightsLeft=Math.max(0,(v.checkoutDay??s.game!.day+1)-s.game!.day);v.roomId=to.id;queueTravel(s,v,to.id);}
const sat=(v:Guest,n:number)=>{v.satisfaction=clamp((v.satisfaction??90)+n);};
const later=(s:PreviewState,r:DecisionRecord,kind:'referral'|'review',value:number,text:string,rooms=0)=>{const g=s.game!;g.followups!.push({id:g.nextId++,day:g.day+1,kind,decision:r.id,value,text,rooms});r.future=text;};

export function resolveDilemma(s:PreviewState,id:number,choice:string,auto=false){const g=initDilemmas(s),d=g.dilemmas!.find(d=>d.id===id);if(!d)return false;const view=describeDilemma(s,d),option=view.options.find(o=>o.id===choice);
 if(!option||option.disabled&&!auto){g.notice=option?.disabled??'这个选项已不可用。';return false;}
 const cost=option.effects.filter(e=>e.k==='现金'&&typeof e.v==='number').reduce((n,e)=>n-(e.v as number),0);if(cost>s.metrics.cash&&!auto){g.notice='现金不足，需要 ¥'+cost;return false;}
 g.dilemmas=g.dilemmas!.filter(x=>x.id!==id);if(cost>0&&s.metrics.cash>=cost){s.metrics.cash-=cost;g.expense+=cost;}
 const v=s.guests.find(x=>x.id===d.guestId),o=initOperations(s);let result='';const r=recordDecision(s,d.kind,view.title,(auto?'超时 · ':'')+option.label,'',auto);
 if(d.kind==='overbook'){const n=choice==='all'?d.count??2:choice==='one'?1:0;for(let i=0;i<n;i++){const p=newProfile(s,.9);o.bookings.push({id:'booking-'+g.nextId++,profileId:p.id,source:'团单',eta:1080+i*20,nights:1,rate:d.rate??g.price,segment:'团队',status:'confirmed',decision:r.id});}
  if(n){adjustMorale(s,-2*n);o.forecast=forecast(s);result=`已加入 ${n} 单团队预订，18:00 起到店。`;}else{s.metrics.owner=clamp(s.metrics.owner-1);result='婉拒追加，房间留给散客与会员。';}}
 if(d.kind==='vip-upgrade'&&v){const suite=freeSuites(s)[0],profile=o.profiles[v.profileId??''];
  if(choice==='free'&&suite){move(s,v,suite);v.upgrades=true;g.upgrades++;sat(v,12);s.metrics.owner=clamp(s.metrics.owner-2);say(s,v,'真的升到套房了，回去就把你们写进推荐名单。');result=v.name+' 搬进 '+suite.number+'。';if(v.persona==='planner')later(s,r,'referral',g.price,v.name+'的公司订了 2 间协议价试住',2);else if(v.persona==='creator'||v.persona==='forum')later(s,r,'review',3,v.name+'发了一篇套房体验，口碑 +3');else if(v.persona==='whale')later(s,r,'referral',Math.round(g.price*1.2),v.name+'介绍朋友来住 1 晚',1);else if(profile){profile.trust=Math.min(5,profile.trust+1);r.future='客史信任 +1，下次更愿意回来';}}
  else if(choice==='paid'&&suite){const yes=['whale','creator','hunter','planner'].includes(v.persona??'')||hash(v.id+g.day)%2===0;if(yes){move(s,v,suite);v.upgrades=true;v.rate=(v.rate??g.price)+180;sat(v,3);say(s,v,'加 ¥180 住套房，值。');result=v.name+' 接受付费升级，入住 '+suite.number+'。';}else{sat(v,-2);say(s,v,'加钱就算了，原房间也行。');result=v.name+' 婉拒了付费升级，套房保留。';}}
  else{sat(v,-3);say(s,v,'好吧，欢迎饮品收下了。');result='套房保留给付费或会员客人。';if(v.persona==='forum')later(s,r,'review',-2,v.name+'在论坛写了“App 有套不代表你有套”，口碑 −2');}}
 if(d.kind==='hk-overtime'){const dirty=rooms(s).filter(x=>x.status==='dirty'&&!x.construction&&!staffAssigned(s,x.id));
  if(choice==='overtime'){const n=dirty.slice(0,3).filter(x=>dispatchTempCleaner(s,x.id,15)).length;adjustMorale(s,-6);result=n+' 位加班保洁到场翻房。';}
  else if(choice==='borrow'){const n=dirty.slice(0,2).filter(x=>dispatchTempCleaner(s,x.id,25)).length;for(const q of s.guests.filter(x=>!x.staff&&!x.roomId&&!x.departing))q.patience=Math.max(5,(q.patience??100)-25);adjustMorale(s,-10);result='前台抽调 '+n+' 人翻房，排队客人等得更久。';}
  else{adjustMorale(s,2);result='维持节奏，团队没有加压。';}}
 if(d.kind==='noise-comp'&&v){const forum=v.persona==='forum',target=freeRooms(s).find(x=>x.floorId!==v.floorId)??freeRooms(s)[0],profile=o.profiles[v.profileId??''];
  if(choice==='comp'){v.compNight=true;sat(v,10);say(s,v,'今晚免单，这个处理我认。');result='今晚房费免收。';if(forum)later(s,r,'review',2,v.name+'在论坛夸前台处理得体，口碑 +2');else if(profile){profile.trust=Math.min(5,profile.trust+1);r.future='客史信任 +1';}}
  else if(choice==='move'&&target){move(s,v,target);sat(v,6);adjustMorale(s,-3);say(s,v,'换到 '+target.number+' 了，安静多了。');result=v.name+' 换到 '+target.number+'，原房待翻。';}
  else{sat(v,(d.reason??'').includes('施工')?-8:-4);say(s,v,'果盘收下了，可噪音还在。');result='噪音没有解决。';if(forum)later(s,r,'review',-3,v.name+'在论坛给了差评，口碑 −3');}}
 if(d.kind==='budget'){const dev=g.development;
  if(choice==='marketing'&&dev){dev.campaignUntil=g.day+2;result='启动三日营销：客流 +35%。';}
  else if(choice==='training'){adjustMorale(s,20);s.metrics.owner=clamp(s.metrics.owner-1);result='团队完成培训，精力恢复。';}
  else if(choice==='maintenance'){for(const f of Object.values(s.entities))if(f.kind==='facility'){f.maintenance=100;f.quality=Math.min(100,f.quality+3);}g.repairShield=g.day+2;result='公区维护完成，3 天内故障减少。';}
  else{s.metrics.owner=clamp(s.metrics.owner+3);result='预算留作现金，业主满意度 +3。';}}
 r.result=result||'已按选择执行。';track(s,'dilemma');note(s,(auto?'未及时决定，按默认处理：':'')+view.title+' → '+option.label+'。'+r.result,v?.roomId??d.roomId);return true;
}
export function dilemmaCommand(s:PreviewState,c:Command){if(c.type!=='dilemma')return false;resolveDilemma(s,Number(c.id),String(c.value));return true;}

/** Overbooking only shows its real price once guests arrive, so the record is completed at settlement. */
export function settleDecisions(s:PreviewState){const g=initDilemmas(s),o=g.operations;if(!o)return;for(const r of g.decisions!.filter(r=>r.day===g.day&&r.kind==='overbook')){const bs=o.bookings.filter(b=>b.decision===r.id);if(!bs.length)continue;const ok=bs.filter(b=>b.status==='checkedin').length,lost=bs.filter(b=>b.status==='lost').length;r.result=`${ok} 间入住，房费 ¥${(ok*(bs[0].rate)).toLocaleString('en-US')}`+(lost?`；${lost} 单无房安置 −¥${lost*600}`:'')+'。';}}

/** Delayed consequences land with the next morning brief so cause and effect stay readable. */
export function applyFollowups(s:PreviewState){const g=initDilemmas(s),o=initOperations(s);
 for(const f of g.followups!.filter(f=>f.day<=g.day)){
  if(f.kind==='referral'){for(let i=0;i<(f.rooms??1);i++){const p=newProfile(s,.6);o.bookings.push({id:'booking-'+g.nextId++,profileId:p.id,source:'APP',eta:900+i*30,nights:1,rate:f.value,segment:'商务',status:'confirmed'});}o.forecast=forecast(s);}
  else s.metrics.reputation=clamp(s.metrics.reputation+f.value);
  g.echoes!.push({day:g.day,text:f.text,target:f.kind==='referral'?'bookings':'history'});const r=g.decisions!.find(r=>r.id===f.decision);if(r)r.future='已兑现：'+f.text;operationsLog(s,'昨日决定的回响：'+f.text,'抉择');
 }
 g.followups=g.followups!.filter(f=>f.day>g.day);g.echoes=g.echoes!.filter(e=>e.day>=g.day-1);
}
export const todayDecisions=(s:Readonly<PreviewState>)=>(s.game!.decisions??[]).filter(r=>r.day===s.game!.day);
