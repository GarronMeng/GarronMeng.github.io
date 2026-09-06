import {upgradeFeedback} from './upgradeFeedback';
import type {PreviewState,Command,Task,Department} from '../state/types';
import {rooms} from '../state/selectors';
export function initDevelopment(s:PreviewState){return s.game!.development??=( {counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]} );}
export function track(s:PreviewState,id:string,n=1){const d=initDevelopment(s);d.counts[id]=(d.counts[id]??0)+n;for(const t of s.game!.tasks)if(t.id===id)t.progress=Math.min(t.goal,t.progress+n);}
const taskPool:[string,string,number,number,string][]=[['arrivals','接待住客',3,600,'front'],['service','完成清洁或维修',3,500,'hotel'],['stock','采购餐饮库存',2,450,'operations'],['delegate','部门执行 SOP',6,600,'operations'],['upgrade','装修客房或升级公区',1,900,'development'],['resolve','解决住客诉求',2,650,'events'],['vip','为会员升套',1,600,'front'],['activity','举办主题活动',1,700,'development'],['ancillary','公区消费收入',600,500,'development'],['revenue','赚取营业收入',3500,800,'operations']];
export function dailyTasks(day:number):Task[]{const indexes=day===1?[0,1,2,7]:[0,...[0,1,2].map(i=>1+(day*3+i*2)%9)];return indexes.map(i=>{const [id,title,goal,reward,target]=taskPool[i];return {id,title,goal,progress:0,reward,claimed:false,target};});}
export function scores(s:Readonly<PreviewState>){const rs=rooms(s),guests=s.guests.filter(g=>g.roomId),clamp=(v:number)=>Math.max(0,Math.min(100,Math.round(v)));
 const parts=[{name:'住客口碑',value:clamp(s.metrics.reputation)},{name:'住客体验',value:clamp(guests.length?guests.reduce((a,g)=>a+(g.satisfaction??90),0)/guests.length:80)},{name:'房务效率',value:clamp(100*rs.filter(r=>!['dirty','cleaning','maintenance'].includes(r.status)).length/Math.max(1,rs.length))},{name:'业主信心',value:clamp(s.metrics.owner)}];return {parts,total:Math.round(parts.reduce((a,p)=>a+p.value,0)/parts.length)};}
export function milestones(s:Readonly<PreviewState>){const d=s.game!.development,rs=rooms(s);return [
 ...[24,36,54,90].map(goal=>({id:'rooms-'+goal,title:goal+' 间客房地标',goal,progress:rs.length,reward:goal*350})),
 ...[20,60,150].map(goal=>({id:'arrivals-'+goal,title:'累计接待 '+goal+' 位住客',goal,progress:d?.counts.arrivals??0,reward:goal*100})),
 {id:'public',title:'打造五个升级公区',goal:5,progress:Object.values(s.entities).filter(e=>e.kind==='facility'&&(e.level??1)>1).length,reward:8000},
 {id:'activities',title:'举办 7 场主题活动',goal:7,progress:d?.counts.activity??0,reward:6000},
 {id:'team',title:'五位主管全部达到 3 级',goal:5,progress:Object.values(s.game!.managers).filter(l=>l>=3).length,reward:10000}
 ].map(t=>({...t,claimed:d?.claimed.includes(t.id)??false}));}
export const ACTIVITIES={coffee:{name:'咖啡品鉴',role:'breakfast',cost:600,stock:12,fee:160,description:'消耗 12 份早餐；商务客更愿意参加，雨天也适合。'},fitness:{name:'健身挑战',role:'gym',cost:500,stock:0,fee:140,description:'度假定位更受欢迎；健身房升级提高人数上限。'},rooftop:{name:'屋顶星光派对',role:'rooftop',cost:1100,stock:16,fee:260,description:'消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。'}} as const;
function note(s:PreviewState,text:string){const g=s.game!;g.notice=text;g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category:'升级',text});}
function spend(s:PreviewState,cost:number){if(s.metrics.cash<cost){s.game!.notice='现金不足，需要 ¥'+cost;return false;}s.metrics.cash-=cost;s.game!.expense+=cost;return true;}
export function developmentCommand(s:PreviewState,c:Command){if(!['invest','train','campaign','activity','claim-career'].includes(c.type))return false;const g=s.game!,d=initDevelopment(s);
 if(c.type==='invest'){const f=s.entities[c.id??''];if(f?.kind!=='facility')return true;if(f.construction){g.notice='该公区正在施工。';return true;}const level=f.level??1;if(level>=5){g.notice='该公区已达 5 级。';return true;}if(spend(s,3500*level)){f.construction={remaining:120,total:120,targetLevel:level+1};upgradeFeedback(s,f.id);track(s,'upgrade');note(s,f.name+'开始封闭改造：2 小时后升级至 '+(level+1)+' 级。');}}
 if(c.type==='train'){const dept=c.id as Department;if(!Object.hasOwn(g.managers,dept))return true;const l=g.managers[dept];if(l<1||l>=3){g.notice='先聘任主管；培训上限为 3 级。';return true;}if(spend(s,4500*l)){g.managers[dept]++;note(s,'主管培训完成：服务效率提升，每日工资增加 ¥180。');}}
 if(c.type==='campaign'){if(d.campaignUntil>=g.day){g.notice='当前推广仍在进行。';return true;}if(spend(s,2200)){d.campaignUntil=g.day+2;note(s,'启动三日推广：今日及后两日客流 +35%。请准备足够客房。');}}
 if(c.type==='activity'){const a=ACTIVITIES[c.id as keyof typeof ACTIVITIES];if(!a)return true;if(d.activityDay===g.day||d.activity){g.notice='每日只能安排一场主题活动。';return true;}if(g.minute>1260){g.notice='活动筹备需要 2 小时，请明日安排。';return true;}const key=c.id==='coffee'?'stock':'clubStock';if(g[key]<a.stock){g.notice='活动库存不足，请先补货。';return true;}if(spend(s,a.cost)){g[key]-=a.stock;d.activityDay=g.day;d.activity={id:c.id!,ends:g.day*1440+g.minute+120};note(s,a.name+'筹备中，2 小时后按在住人数、定位、天气和公区等级结算。');}}
 if(c.type==='claim-career'){const m=milestones(s).find(m=>m.id===c.id);if(m&&!m.claimed&&m.progress>=m.goal){d.claimed.push(m.id);s.metrics.cash+=m.reward;note(s,'里程碑「'+m.title+'」奖励 ¥'+m.reward+' 已到账。');}}
 return true;
}
export function advanceDevelopment(s:PreviewState){const g=s.game!,d=initDevelopment(s),pending=d.activity;if(!pending||g.day*1440+g.minute<pending.ends)return;const a=ACTIVITIES[pending.id as keyof typeof ACTIVITIES],f=s.entities['facility-'+a.role];
 const guests=s.guests.filter(v=>v.roomId),level=f?.kind==='facility'?f.level??1:1,capacity=f?.kind==='facility'?f.capacity:8;
 const fit=pending.id==='coffee'?(g.positioning==='business'?1:.75):pending.id==='fitness'?(g.positioning==='resort'?1:.7):(g.weather==='rain'?.35:(g.day-1)%7>=4?1:.8);
 const attendance=Math.min(capacity,Math.round(guests.length*fit)),revenue=Math.round(attendance*a.fee*(1+(level-1)*.2));s.metrics.cash+=revenue;g.revenue+=revenue;track(s,'revenue',revenue);track(s,'ancillary',revenue);track(s,'activity');for(const guest of guests.slice(0,attendance)){guest.satisfaction=Math.min(100,(guest.satisfaction??90)+5);guest.thought=a.name+'很有意思';}s.metrics.reputation=Math.min(100,s.metrics.reputation+(attendance>=3?2:0));d.activity=undefined;note(s,a.name+'结束：'+attendance+' 人参加，收入 ¥'+revenue+'，活动净额 ¥'+(revenue-a.cost)+'。');}
