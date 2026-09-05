import {dailyTasks,track,initDevelopment,developmentCommand,advanceDevelopment,scores} from './progression';
import type {PreviewState,Command,Department,Guest,Room,LogCategory} from '../state/types';
import {createVisualFixture} from '../state/fixture';
import {rooms} from '../state/selectors';
export const DEPARTMENTS:Record<Department,string>={front:'前厅',house:'客房',engineering:'工程',fnb:'餐饮',revenue:'收益'};
export const clock=(m:number)=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export const weekday=(d:number)=>['周一','周二','周三','周四','周五','周六','周日'][(d-1)%7];
export function demand(s:Readonly<PreviewState>){const g=s.game!,weekend=(g.day-1)%7>=4;return (g.positioning==='business'?(weekend?.75:1.35):g.positioning==='resort'?(weekend?1.6:.85):weekend?1.25:1.1)*(g.weather==='rain'?.88:1)*(g.development&&g.development.campaignUntil>=g.day?1.35:1)*(1+Math.max(0,rooms(s).length-9)/30)*Math.max(.45,Math.min(1.5,650/g.price));}
function random(s:PreviewState){const g=s.game!;g.seed=(Math.imul(1664525,g.seed)+1013904223)>>>0;return g.seed/4294967296;}
function log(s:PreviewState,category:LogCategory,text:string,target?:string){const g=s.game!;g.notice=text;g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category,text,target});}
function pay(s:PreviewState,n:number){if(s.metrics.cash<n){s.game!.notice=`现金不足，需要 ¥${n}`;return false;}s.metrics.cash-=n;s.game!.expense+=n;return true;}
function income(s:PreviewState,n:number){n=Math.round(n);s.metrics.cash+=n;s.game!.revenue+=n;track(s,'revenue',n);}
function reputation(s:PreviewState,n:number){const g=s.game!;if(n<0){n=-Math.min(-n,Math.max(0,8-g.repLoss));g.repLoss-=n;}s.metrics.reputation=Math.max(0,Math.min(100,s.metrics.reputation+n));}
const progress=track;
const tasks=dailyTasks;
export function newGame():PreviewState {
 const s=createVisualFixture();s.mode='game';s.metrics={cash:28600,reputation:86,owner:82};
 s.guests=s.guests.filter(g=>g.staff||g.roomId);s.game={day:1,minute:480,paused:false,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:'business',weather:'sunny',stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:tasks(1),reports:[],reportOpen:false,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:'欢迎接班：前台接待，空房翻房，套房留给合适的人。'};
 for(const guest of s.guests)if(guest.roomId){const r=s.entities[guest.roomId] as Room;guest.stayLength=r.nightsLeft;guest.checkoutDay=1+r.nightsLeft;guest.rate=r.type==='suite'?900:650;guest.satisfaction=90;guest.segment='商务';}
 for(const r of rooms(s)){r.level=1;if(r.status==='cleaning')r.timer=20;}
 initDevelopment(s);arrival(s);log(s,'部门','Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。');updateUsage(s);return s;
}
function arrival(s:PreviewState){const g=s.game!,r=random(s),name=['陈','林','何','张','周','王','李','赵'][Math.floor(random(s)*8)]+'先生';
 const tier=r<.27?'Globalist':r<.5?'Explorist':r<.8?'Member':'普通客';const holiday=g.positioning==='resort'||((g.day-1)%7>=4&&random(s)<.65);
 const stay=holiday?2+Math.floor(random(s)*4):random(s)<.22?5+Math.floor(random(s)*3):1+Math.floor(random(s)*3);
 const q:Guest={id:'guest-'+g.nextId++,name,tier,floorId:'floor-lobby',thought:tier==='Globalist'?'今晚有套吗？':'想住 '+stay+' 晚',color:0x36566a,route:[-2.5,2.5],z:1.7,segment:holiday?'度假':stay>=5?'长住':'商务',stayLength:stay,patience:100+g.managers.front*50+((s.entities['facility-lobby'].kind==='facility'?s.entities['facility-lobby'].level:1)??1)*10,satisfaction:90+(g.memory[name]??0)};
 s.guests.push(q);g.arrivals++;log(s,'入住',`${name} · ${tier} 到店，计划 ${stay} 晚${g.memory[name]?'，一位熟客回来了':''}。`,'facility-lobby');
}
export const queue=(s:Readonly<PreviewState>)=>s.guests.filter(g=>!g.staff&&!g.roomId);
export function updateUsage(s:PreviewState){for(const e of Object.values(s.entities))if(e.kind==='facility'){e.usage=s.guests.filter(g=>!g.staff&&g.floorId===e.floorId).length;e.staffing=s.guests.filter(g=>g.staff&&g.floorId===e.floorId).length;}}
function home(s:PreviewState,g:Guest){if(!g.roomId)return;const r=s.entities[g.roomId] as Room;g.floorId=r.floorId;const x=(Number(r.number)%100-2)*4.93;g.route=[x-.8,x+.8];g.z=1.12;g.visitUntil=undefined;g.thought=r.type==='suite'?'这个房间真宽敞':'住得很舒服';}
function settle(s:PreviewState){const g=s.game!,rs=rooms(s);let revenue=0,nights=0;
 for(const guest of s.guests)if(guest.roomId){revenue+=guest.rate??g.price;nights++;}income(s,revenue);g.nights=nights;
 const cost=380+rs.length*65+Object.values(g.managers).reduce((a,b)=>a+b*180,0);s.metrics.cash-=cost;g.expense+=cost;
 const occupancy=Math.round(100*g.soldMinutes/Math.max(1,g.roomMinutes)),adr=nights?Math.round(revenue/nights):0;
 const rec=g.stock<20?'早餐库存偏低，明早先补货。':demand(s)>1.1?'明日需求偏旺，先清洁脏房，保留一间套房。':'明日需求相对平稳，可下调价格或投资装修。';
 g.reports.push({day:g.day,revenue:g.revenue,expense:g.expense,adr,occupancy,revpar:Math.round(revenue/Math.max(1,rs.length)),upgrades:g.upgrades,complaints:g.complaints,lost:Math.round(g.closedMinutes/Math.max(1,g.roomMinutes)*100),recommendation:rec,score:scores(s).total});
 const history=initDevelopment(s).scores;history.push({day:g.day,value:scores(s).total});if(history.length>30)history.shift();
 if(g.reports.length>30)g.reports.shift();reputation(s,g.complaints===0?3:1);s.metrics.owner=Math.max(0,Math.min(100,s.metrics.owner+(g.revenue>=g.expense?2:-3)));
 log(s,'收益',`Day ${g.day}：收入 ¥${g.revenue}，成本 ¥${g.expense}，入住率 ${occupancy}%。`);g.reportOpen=true;g.paused=true;
}
function nextDay(s:PreviewState){const g=s.game!;g.day++;g.minute=420;g.nextArrival=450;g.nextEvent=600;g.weather=random(s)<.25?'rain':'sunny';g.revenue=g.expense=g.nights=g.arrivals=g.upgrades=g.complaints=g.lost=g.repLoss=g.roomMinutes=g.soldMinutes=g.closedMinutes=0;g.reportOpen=false;g.paused=false;g.tasks=tasks(g.day);for(const r of rooms(s))if(r.guestId){const guest=s.guests.find(a=>a.id===r.guestId);r.nightsLeft=Math.max(0,(guest?.checkoutDay??g.day)-g.day);}if(g.managers.revenue)g.price=Math.round((demand(s)>1.1?750:590)*(1+g.level*.04+(g.managers.revenue-1)*.06));log(s,'部门',`${weekday(g.day)} 开始。${g.weather==='rain'?'今天有雨。':''}预计需求 ${Math.round(demand(s)*100)}%。`);}
export function advanceGame(s:PreviewState,minutes:number){const g=s.game;if(!g||g.paused)return;
 for(let t=0;t<minutes&&!g.paused;t++){
  g.minute++;advanceDevelopment(s);const rs=rooms(s);g.roomMinutes+=rs.length;g.soldMinutes+=rs.filter(r=>r.status==='occupied').length;g.closedMinutes+=rs.filter(r=>['dirty','cleaning','maintenance'].includes(r.status)).length;
  s.atmosphere=g.minute<1020?'day':g.minute<1170?'dusk':'night';
  for(const r of rs){if(r.timer&&--r.timer<=0){r.timer=undefined;r.status='available';progress(s,'service');log(s,'房态',`${r.number} 已整理完毕，可重新出售。`,r.id);}
   if(r.status==='dirty'&&g.managers.house){r.status='cleaning';r.timer=Math.max(8,24-g.managers.house*5);progress(s,'delegate');log(s,'部门',`客房主管安排清洁 ${r.number}。`,r.id);}
   if(r.status==='maintenance'&&!r.timer&&g.managers.engineering&&pay(s,100)){r.timer=Math.max(10,35-g.managers.engineering*7);progress(s,'delegate');log(s,'部门',`工程主管接管 ${r.number} 的维修。`,r.id);}
  }
  for(const guest of [...s.guests]){
   if(guest.staff)continue;
   if(!guest.roomId){guest.patience=(guest.patience??100)-1;if(guest.patience<=0){s.guests=s.guests.filter(a=>a.id!==guest.id);g.lost++;g.complaints++;reputation(s,-1);log(s,'客诉',`${guest.name} 等待过久离店，失去一笔预订。`,'facility-lobby');}continue;}
   const r=s.entities[guest.roomId] as Room;
   if((guest.checkoutDay??99)<=g.day&&g.minute>=660){r.status='dirty';r.guestId=undefined;r.nightsLeft=0;g.memory[guest.name]=(guest.satisfaction??90)>=80?Math.min(5,(g.memory[guest.name]??0)+1):0;s.guests=s.guests.filter(a=>a.id!==guest.id);log(s,'入住',`${guest.name} 退房，${r.number} 等待翻房。`,r.id);continue;}
   if(guest.visitUntil&&g.minute>=guest.visitUntil)home(s,guest);
   if(!guest.visitUntil&&g.minute%45===0){let role=g.minute<630?'breakfast':g.minute>=1020&&g.minute<1260?'club':g.minute>=1260?'rooftop':'gym';if(role==='club'&&guest.tier==='普通客')role='rooftop';const f=s.entities['facility-'+role];if(f?.kind==='facility'&&random(s)<.6){
    if(f.usage>=f.capacity){guest.thought='这里有点挤';guest.satisfaction=(guest.satisfaction??90)-1;continue;}
    guest.floorId=f.floorId;guest.route=[-5+random(s)*3,2+random(s)*3];guest.z=1.2;guest.visitUntil=g.minute+35;guest.thought={breakfast:'来一杯咖啡',club:'酒廊休息一下',rooftop:'这风景真好',gym:'运动一下'}[role]??'休息一下';
    if(role==='breakfast'||role==='club'){const key=role==='breakfast'?'stock':'clubStock';if(g[key]>0){g[key]--;guest.satisfaction=Math.min(100,(guest.satisfaction??90)+(f.level??1));if(role==='club'&&guest.tier!=='Globalist'){const n=Math.round(80*(1+((f.level??1)-1)*.2));income(s,n);track(s,'ancillary',n);};}else{guest.thought='怎么没东西吃了';guest.satisfaction=(guest.satisfaction??90)-5;if(g.minute%90===0){g.complaints++;reputation(s,-1);log(s,'客诉',`${f.name} 缺货，${guest.name} 不满意。`,f.id);}}}else if(role==='rooftop'||role==='gym'){const n=Math.round((role==='gym'?20:45)*(1+((f.level??1)-1)*.2));income(s,n);track(s,'ancillary',n);guest.satisfaction=Math.min(100,(guest.satisfaction??90)+(f.level??1));}
    f.maintenance=Math.max(0,f.maintenance-.1);updateUsage(s);
   }}
  }
  if(g.managers.front){const guest=queue(s)[0],r=rs.find(r=>r.status==='available'&&(guest?.tier==='Globalist'||r.type!=='suite'))??rs.find(r=>r.status==='available');if(guest&&r){execute(s,{type:'checkin',id:guest.id,roomId:r.id});progress(s,'delegate');}}
  if(g.managers.fnb&&g.minute%30===0){for(const key of ['stock','clubStock'] as const)if(g[key]<20&&pay(s,Math.max(140,260-g.managers.fnb*20))){g[key]+=40;progress(s,'delegate');log(s,'部门','餐饮主管已自动补货。','facility-breakfast');}}
  if(g.minute>=g.nextArrival&&g.minute<1260){if(queue(s).length<6)arrival(s);g.nextArrival=g.minute+Math.max(8,Math.round((35+random(s)*28)/demand(s)));}
  if(g.minute>=g.nextEvent&&g.events.length<2){const r=rs.find(r=>r.status==='available');const kinds=['repair','complaint','supplies','vip'] as const;const kind=kinds[Math.floor(random(s)*4)];const target=kind==='repair'&&r?r.id:kind==='supplies'?'facility-breakfast':'facility-lobby';
   if(!g.events.some(e=>e.kind===kind)){if(kind==='repair'&&r)r.status='maintenance';const titles={repair:'设备故障，需要工程协助',complaint:'住客希望安静一点',supplies:'早餐供应临时波动',vip:'常客期待额外关照'};g.events.push({id:g.nextId++,kind,title:titles[kind],target,expires:g.day*1440+g.minute+120});log(s,'客诉',titles[kind],target);}g.nextEvent=g.minute+180+Math.round(random(s)*90);
  }
  for(const event of [...g.events]){const dept=event.kind==='repair'?'engineering':event.kind==='supplies'?'fnb':'front';if(g.managers[dept]&&s.metrics.cash>=150){execute(s,{type:'resolve',id:String(event.id),value:'sop'});}else if(g.day*1440+g.minute>=event.expires){g.events=g.events.filter(e=>e.id!==event.id);g.complaints++;reputation(s,-2);log(s,'客诉',`未及时处理：${event.title}`,event.target);}}
  if(g.minute>=1440)settle(s);
 }
 updateUsage(s);
}
export function execute(s:PreviewState,c:Command){const g=s.game;if(!g)return;if(developmentCommand(s,c))return;const e=c.id?s.entities[c.id]:undefined;const r=e?.kind==='room'?e:null;
 switch(c.type){
 case 'checkin':{const guest=queue(s).find(a=>a.id===c.id),room=s.entities[c.roomId??''];if(!guest||room?.kind!=='room'||!(room.status==='available'||room.status==='reserved'&&guest.tier==='Globalist')){g.notice='住客或房态已变化，请重新选择。';break;}
  guest.roomId=room.id;guest.checkoutDay=g.day+(guest.stayLength??2);guest.rate=Math.round(g.price*(room.type==='suite'?(guest.tier==='Globalist'?1:1.45):1)*(1+((room.level??1)-1)*.1));guest.upgrades=room.type==='suite'&&guest.tier==='Globalist';if(guest.upgrades){g.upgrades++;progress(s,'vip');reputation(s,1);}else if(guest.tier==='Globalist'&&rooms(s).some(a=>a.type==='suite'&&a.status==='available'))reputation(s,-1);
  room.status='occupied';room.guestId=guest.id;room.nightsLeft=guest.stayLength??2;home(s,guest);progress(s,'arrivals');log(s,'入住',`${guest.name} 入住 ${room.number} · ${room.nightsLeft} 晚 · ¥${guest.rate}/晚${guest.upgrades?'，会员升套':''}。`,room.id);break;}
 case 'reject':{const guest=queue(s).find(a=>a.id===c.id);if(guest){s.guests=s.guests.filter(a=>a.id!==guest.id);g.lost++;log(s,'入住',`已为 ${guest.name} 婉拒本次入住。`,'facility-lobby');}break;}
 case 'clean':if(r?.status==='dirty'&&pay(s,90)){r.status='cleaning';r.timer=30;log(s,'房态',`${r.number} 开始清洁，约 30 游戏分钟。`,r.id);}break;
 case 'repair':if(r?.status==='maintenance'&&!r.timer&&pay(s,180)){r.timer=40;log(s,'房态',`${r.number} 开始维修。`,r.id);}else if(e?.kind==='facility'&&pay(s,200)){e.maintenance=100;log(s,'房态',`${e.name} 维护完成。`,e.id);}break;
 case 'upgrade':if(r?.status==='available'&&(r.level??1)<5&&pay(s,2500*(r.level??1))){r.level=(r.level??1)+1;progress(s,'upgrade');log(s,'升级',`${r.number} 装修至 ${r.level} 级，提高房价。`,r.id);}break;
 case 'reserve':if(r?.status==='available'&&r.type==='suite'){r.status='reserved';log(s,'房态',`${r.number} 预留给 Globalist / SUA。`,r.id);}break;
 case 'release':if(r?.status==='reserved'){r.status='available';log(s,'房态',`${r.number} 已释放预留。`,r.id);}break;
 case 'hire':{const dept=c.id as Department;if(!Object.hasOwn(DEPARTMENTS,dept)||g.managers[dept])break;if(pay(s,3800)){g.managers[dept]=1;progress(s,'delegate');log(s,'部门',`${DEPARTMENTS[dept]}主管到岗，常规工作将按 SOP 自动处理。`);}break;}
 case 'stock':{const key=c.id==='club'?'clubStock':'stock';if(g[key]>=120){g.notice='库存充足，不必继续采购。';break;}if(pay(s,300)){g[key]=Math.min(160,g[key]+50);progress(s,'stock');log(s,'部门',`${key==='stock'?'早餐':'酒廊'}已补货 50 份。`,'facility-'+(key==='stock'?'breakfast':'club'));}break;}
 case 'resolve':{const event=g.events.find(a=>a.id===Number(c.id));if(!event)break;const dept=event.kind==='repair'?'engineering':event.kind==='supplies'?'fnb':'front';const sop=c.value==='sop';if(sop&&!g.managers[dept]){g.notice='需要先聘任对应部门主管。';break;}if(!pay(s,sop?150:350))break;g.events=g.events.filter(a=>a.id!==event.id);const room=s.entities[event.target];if(event.kind==='repair'&&room?.kind==='room'&&room.status==='maintenance'){room.status='available';room.timer=undefined;progress(s,'service');}if(event.kind==='supplies')g.stock+=25;progress(s,'resolve');reputation(s,sop?2:1);s.metrics.owner=Math.min(100,s.metrics.owner+1);if(sop)progress(s,'delegate');log(s,'部门',`${sop?'部门 SOP':'经理亲自协调'}解决「${event.title}」，口碑 +${sop?2:1}。`,event.target);break;}
 case 'expand':{const guestFloors=s.floors.filter(f=>f.role==='guest');if(!pay(s,10000+5000*(guestFloors.length-3)))break;const no=guestFloors.length+2,floor={id:'floor-'+no,number:no,label:no+'F',name:'客房',role:'guest' as const,entityIds:[] as string[]};for(let c=1;c<=3;c++){const number=String(no*100+c),id='room-'+number;floor.entityIds.push(id);s.entities[id]={id,kind:'room',floorId:floor.id,number,type:c===3?'suite':'king',status:'available',nightsLeft:0,level:1};}s.floors.splice(2+guestFloors.length,0,floor);s.floors.forEach((f,i)=>{f.number=i;f.label=f.role==='lobby'?'L':f.role==='rooftop'?'RF':i+'F';});g.level++;log(s,'升级',`${floor.label} 客房层竣工：新增 3 间客房，公区与屋顶同步上移。`,floor.entityIds[0]);break;}
 case 'price':g.price=Math.max(350,Math.min(1800,Math.round(Number(c.value)||650)));log(s,'收益',`新客挂牌价调整至 ¥${g.price}，已入住客人价格不变。`);break;
 case 'position':if(['business','resort','urban'].includes(String(c.value))){g.positioning=c.value as typeof g.positioning;log(s,'收益','酒店定位已调整，星期需求与住宿长度随之变化。');}break;
 case 'pause':g.paused=!g.paused;break;
 case 'continue':if(g.reportOpen)nextDay(s);break;
 case 'claim':{const task=g.tasks.find(t=>t.id===c.id);if(task&&!task.claimed&&task.progress>=task.goal){task.claimed=true;income(s,task.reward);log(s,'收益',`完成「${task.title}」，奖励 ¥${task.reward}。`);}break;}
 }updateUsage(s);
}
