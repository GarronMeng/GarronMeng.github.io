import {standardSuite} from '../content/roomTypes';
import {lateLabel,fallbackHour} from './guestRequests';
import type {Guest,PreviewState} from '../state/types';
import {PERSONAS} from '../content/personas';
import {hotelTime,hash} from './guestMovement';
export const memoryKey=(g:Guest)=>g.name+':'+g.persona;
export function cue(s:PreviewState,g:Guest,event:string){g.speech??={next:0,recent:[]};g.speech.event=event;g.speech.eventUntil=hotelTime(s)+35;g.speech.next=0;speak(s,g);}
export function speak(s:PreviewState,g:Guest){if(g.staff)return;const now=hotelTime(s),speech=g.speech??={next:0,recent:[]},m=g.movement;
 const role=s.floors.find(f=>f.id===g.floorId)?.role??'lobby',moving=!!m?.steps.length,event=(speech.eventUntil??0)>=now?speech.event:'';
 const context=[m?.position.phase,moving,role,event,g.late,g.upgrades,g.departing,g.experience?.kind].join(':');if(now<speech.next&&speech.context===context)return;speech.context=context;
 const key=g.persona??'chill',app=Object.values(s.entities).filter(e=>e.kind==='room'&&standardSuite(e)&&e.status==='available').length;
 let lines:string[]=[];
 if(event==='checkout'&&g.departing)lines=[key==='points'?'Checkout 完了，接下来守着 QN 到账。':key==='forum'?'住完了，可以发完整 DP 了。':'房退好了，去大堂拿行李。'];
 else if(event==='checkin'&&g.roomId)lines=[g.upgrades?'这次真给 Standard Suite 了。':'房卡拿到了，先上楼看看。'];
 else if(event==='denied')lines=[!g.roomId?'这次没住成，换一家问问。':app?'App 上有套，不代表你有套。今天懂了。':'今天 Standard Suite 没库存，这条 DP 得注明。'];
 else if(event==='late-honor'&&g.late==='honor')lines=[lateLabel(g)+' 确认了，终于能从容收行李。'];
 else if(event==='late-deny'&&g.late==='deny')lines=['协商到 '+fallbackHour(g)+':00 退房，得把下午行程挪一挪。'];
 else if(event==='recovery'&&g.serviceDone)lines=[key==='points'?'QN / bonus 已经帮我核对过了。':'专属服务安排了，这一段也会写进 DP。'];
 else if(event==='renovation'&&!moving)lines=['这里刚升级了，看起来更舒服了。'];
 else if(moving)lines=[m?.position.phase==='elevator'?(key==='planner'?'这段电梯时间记一下，团队得分批。':'还在电梯里，等到层再出去。'):(key==='road'?'顺着走廊过去，别走错房间。':'沿着走廊慢慢走。')];
 else if(g.departing)lines=['该出发了，最后检查一下行李。'];
 else if(!g.roomId)lines=[PERSONAS[key].quote,...(g.sua?['SUA 带好了，今晚能确认 Standard Suite 吗？']:[])];
 else if(role==='guest'){
  lines=[({chill:'今天就在房间歇一会，不赶行程。',road:'先在房间处理工作，出发时间再确认。',family:'先把一家人的行李安顿好。',points:'这晚 QN 多久到账？促销 bonus 能叠吗？',hunter:g.upgrades?'Standard Suite 确认了，今天不用刷新 App。':'先住着，看看后面几晚套房情况。',forum:'先住完整晚再写 DP，不能只看欢迎礼。',creator:'先看看房间哪个角度适合拍。',proposal:'今晚很重要，先把要用的东西准备好。',planner:'把刚才看到的动线整理一下。',whale:s.entities['facility-spa']?'等会看看 Spa 有没有位置。':'要是有 Spa，今天就不出门了。',auditplus:'先看看房间，按实际体验记。'}[key])];
  if((g.satisfaction??90)<80)lines=['这次体验还有点问题，得找 Front Office 说一下。'];
 }else{
  const exp=g.experience,here=exp?.place==='facility-'+role&&now-exp.at<150;
  if(here&&exp.kind==='shortage')lines=[role==='club'?'Happy Hour 还在，菜先下班了。':'早餐还没结束，餐台已经空了。'];
  else if(here&&exp.kind==='served')lines=[({breakfast:key==='points'?'早餐吃上了，房费回本又近一步。':'咖啡拿到了，坐下来慢慢吃。',club:key==='forum'?'这次 Happy Hour 有吃到，DP 记一笔。':'在 Club Lounge 歇一会，再回房。',gym:'已经到健身房了，今天动一动。',spa:'Spa 排上了，这会儿先放下手机。',rooftop:s.game!.weather==='rain'?'下雨了，等会回室内。':key==='creator'?'到屋顶了，先找找拍摄角度。':'在屋顶坐一会，不赶第二场。',lobby:key==='planner'?'在大堂看看，团队入住得分几批。':'在大堂坐一会，再回房。'}[role]??'先在这里休息一会。')];
  else lines=['先看看这里有没有合适的位置。'];
 }
 if(!moving&&g.roomId&&!g.departing){
  if(g.late==='pending')lines.unshift((g.checkoutDay===s.game!.day?'今天':'明天')+'能 '+lateLabel(g)+' 吗？先确认一下。');
  if(role==='guest'&&!g.upgrades&&app>0&&['hunter','forum'].includes(key))lines.push(`App 上还有 ${app} 间套，先问问 Front Office。`);
  const memory=s.game!.guestMemory?.[memoryKey(g)];if(role==='guest'&&memory?.visits)lines.push(memory.satisfaction<80?'上次住得不太顺，这次再看看。':memory.denied?'上次没拿到套，这次按实际体验写 DP。':'上次住得不错，这次又回来了。');
 }
 const recent=s.game!.dialogueRecent??={};for(const [text,at] of Object.entries(recent))if(now-at>240)delete recent[text];
 const pool=lines.filter(text=>!speech.recent.some(r=>r.text===text&&now-r.at<180)&&now-(recent[text]??-9999)>25);
 if(pool.length){const text=pool[hash(g.id+now)%pool.length];g.thought=text;speech.recent.push({text,at:now});speech.recent=speech.recent.slice(-8);recent[text]=now;}else g.thought='';
 speech.next=now+45;
}
