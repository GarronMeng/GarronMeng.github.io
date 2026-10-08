import type {PreviewState,Command,Campaign} from '../state/types';
import {rooms} from '../state/selectors';
export const CHAPTERS=[
 {title:'接住第一批客人',action:'办理 3 次入住',counter:'arrivals',goal:3,target:'front',exam:'试住客回访',threshold:62,department:'front'},
 {title:'让房间周转起来',action:'完成 3 次清洁或维修',counter:'service',goal:3,target:'hotel',exam:'早班运营巡检',threshold:66,department:'house'},
 {title:'兑现住客的承诺',action:'完成 2 次诉求处理',counter:'resolve',goal:2,target:'events',exam:'会员体验回访',threshold:70,department:'front'},
 {title:'让升级经得起体验',action:'完成 1 次装修或公区升级',counter:'upgrade-complete',goal:1,target:'development',exam:'新空间试营业',threshold:72,department:'engineering'},
 {title:'办一场让人记住的活动',action:'完成 1 场主题活动',counter:'activity',goal:1,target:'development-data',exam:'总部经营评审',threshold:74,department:'revenue'},
] as const;
const now=(s:Readonly<PreviewState>)=>s.game!.day*1440+s.game!.minute;
export function initCampaign(s:PreviewState):Campaign{return s.game!.campaign??={chapter:0,baseline:{...(s.game!.development?.counts??{})},certificates:[],attempts:0};}
export function campaignGoal(s:Readonly<PreviewState>){const c=s.game!.campaign,ch=CHAPTERS[c?.chapter??0];if(!ch)return null;const allMax=ch.counter==='upgrade-complete'&&Object.values(s.entities).filter(e=>e.kind==='facility'||e.kind==='room'&&e.status!=='unbuilt').every(e=>(e.level??1)>=5&&!e.construction);const progress=allMax?ch.goal:Math.min(ch.goal,Math.max(0,(s.game!.development?.counts[ch.counter]??0)-(c?.baseline[ch.counter]??0)));return {...ch,progress,ready:progress>=ch.goal};}
function note(s:PreviewState,text:string){const g=s.game!;g.notice=text;g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category:'升级',text});}
export function campaignCommand(s:PreviewState,command:Command){if(!['book-inspection','prepare-inspection','continue-chapter'].includes(command.type))return false;const g=s.game!,c=initCampaign(s),goal=campaignGoal(s);
 if(command.type==='book-inspection'){
  if(!goal||!goal.ready||c.inspection||c.result?.passed){g.notice='先完成当前目标；预约中的检验无需重复预约。';return true;}
  // A private deterministic draw is committed once, so reload never rerolls results.
  g.seed=(Math.imul(g.seed,1664525)+1013904223)>>>0;
  c.inspection={due:(g.day+1)*1440+1080,chapter:c.chapter,phase:'booked',roll:(g.seed%13)-6,prepared:false};c.attempts++;c.result=undefined;
  note(s,goal.exam+'已预约：明天 18:00 到店，先保障客房、库存和服务。');
 }
 if(command.type==='prepare-inspection'){
  const exam=c.inspection;if(!exam||exam.phase!=='booked'||exam.prepared){g.notice='本次检验已准备，或正在进行。';return true;}if(s.metrics.cash<300){g.notice='准备需要 ¥300；也可以不额外投入。';return true;}
  s.metrics.cash-=300;g.expense+=300;exam.prepared=true;note(s,'投入 ¥300 做现场彩排：检验表现 +6，仍需实际服务达标。');
 }
 if(command.type==='continue-chapter'){
  if(c.result?.chapter!==c.chapter||!c.result.passed){g.notice='先完成本阶段检验。';return true;}
  c.certificates.push(CHAPTERS[c.chapter].exam);c.chapter++;c.baseline={...(g.development?.counts??{})};c.inspection=undefined;c.result=undefined;c.attempts=0;
  note(s,CHAPTERS[c.chapter]?'下一阶段：'+CHAPTERS[c.chapter].title+'。':'五段经营主线完成，酒店进入自由经营。');
 }return true;
}
export function tickCampaign(s:PreviewState){const c=initCampaign(s),exam=c.inspection;if(!exam)return;
 if(exam.phase==='booked'&&now(s)>=exam.due){exam.phase='visiting';note(s,CHAPTERS[c.chapter].exam+'到店：先看房、再用餐、最后核对服务；30 分钟后回访。');}
 if(exam.phase!=='visiting'||now(s)<exam.due+30)return;
 const g=s.game!,rs=rooms(s).filter(r=>r.status!=='unbuilt'),guests=s.guests.filter(v=>!v.staff&&v.roomId&&!v.departing),clean=rs.filter(r=>!['dirty','cleaning','maintenance'].includes(r.status)&&!r.construction).length/Math.max(1,rs.length);
 const experience=guests.length?guests.reduce((n,v)=>n+(v.satisfaction??90),0)/guests.length:80;
 const service=Math.max(0,100-g.events.length*12-guests.filter(v=>v.challenge&&!v.challenge.resolved||v.late==='pending').length*8);
 const supply=Math.min(100,Math.min(g.stock,g.clubStock)*5),base=Math.round(clean*25+experience*.3+service*.25+supply*.2),score=Math.max(0,Math.min(100,base+exam.roll+(exam.prepared?6:0))),passed=score>=CHAPTERS[c.chapter].threshold;
 const weakest=[{value:clean*100,text:'先清洁脏房、完成维修，减少封闭房。',target:'hotel'},{value:experience,text:'处理客人的核心诉求，减少只送礼未兑现。',target:'events'},{value:service,text:'先解决积压事件和晚退请求。',target:'events'},{value:supply,text:'先补足早餐和酒廊的库存。',target:'operations-data'}].sort((a,b)=>a.value-b.value)[0];
 c.result={chapter:c.chapter,passed,score,day:g.day,minute:g.minute,advice:passed?'体验通过。确认后开启下一段经营目标。':weakest.text,target:weakest.target,scenes:[clean>=.7?'Room Check：多数房间整洁可售。':'Room Check：发现翻房或维修积压。',supply>=75?'F&B：餐台供应顺畅。':'F&B：餐台库存让体验打了折扣。',service>=80?'Front Office：承诺与服务顺利交接。':'Front Office：还有诉求未接住。']};c.inspection=undefined;
 note(s,CHAPTERS[c.chapter].exam+'：'+(passed?'通过':'需要改善')+'（'+score+' / '+CHAPTERS[c.chapter].threshold+'）。'+c.result.advice);
}
