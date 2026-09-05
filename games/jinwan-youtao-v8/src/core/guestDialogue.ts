import type {Guest,PreviewState} from '../state/types';
import {PERSONAS,PLACE_LINES} from '../content/personas';
import {hotelTime,hash} from './guestMovement';
export const memoryKey=(g:Guest)=>g.name+':'+g.persona;
export function cue(s:PreviewState,g:Guest,event:string){g.speech??={next:0,recent:[]};g.speech.event=event;g.speech.eventUntil=hotelTime(s)+55;g.speech.next=0;speak(s,g);}
export function speak(s:PreviewState,g:Guest){if(g.staff)return;const now=hotelTime(s),speech=g.speech??={next:0,recent:[]};if(now<speech.next)return;
 const p=PERSONAS[g.persona??'chill'],m=g.movement,role=s.floors.find(f=>f.id===g.floorId)?.role??'lobby';const event=(speech.eventUntil??0)>=now?speech.event:'';
 const appSuites=Object.values(s.entities).filter(e=>e.kind==='room'&&e.type==='suite'&&e.status==='available').length;
 let priority:string[]=[];const personal=[...p.lines],extra:string[]=[];
 if(event==='checkin')priority=g.upgrades?['这次真给套了，可以写个好 DP。','Standard Suite 到手，今晚不用刷新 App 了。']:[p.quote,'房卡拿到了，先上楼看看。'];
 if(event==='denied')priority=g.persona==='hunter'||g.persona==='forum'?appSuites>0?['App 上有套，不代表你有套。今天懂了。','Revenue 很漂亮，DP 也很精彩。']:['今天 Standard Suite 没库存，这条 DP 得注明。','先住普通房，明天再看套房库存。']:['这次没升套，先看看实际住得怎么样。'];
 if(event==='late-honor')priority=['4PM honored，终于不用拎着箱子等车了。','四点退房确认了，Housekeeping 辛苦。'];
 if(event==='late-deny')priority=['4PM 协商成了 14:00，这条 DP 得写清楚。'];
 if(event==='recovery')priority=[g.persona==='points'?'QN / bonus 都解释清楚了，比水果有用。':g.persona==='family'?'早餐和加床都确认了，这次终于不用反复问。':g.persona==='proposal'?'布置悄悄安排好了，今晚终于能松口气。':'Service Recovery 到位了，这一段也会写进 DP。'];
 if(event==='shortage')priority=[role==='club'?'Happy Hour 还在，菜先下班了。':'早餐时间还没结束，餐台已经准备下班了。','F&B，补货时间也算用餐体验吧。'];
 if(event==='full')priority=['这里满了，换个地方，不在门口排队了。',g.persona==='planner'?'这个容量，团队一定要错峰。':'下次换个时间来，今晚不挤了。'];
 if(event==='checkout')priority=g.persona==='points'?['Checkout 完了，接下来守着 QN 到账。']:g.persona==='forum'?['住完了，可以发完整 DP 了。']:['Front Office，发票和行李都齐了，我出发了。'];
 if(m?.position.phase==='elevator')extra.push(g.persona==='planner'?'团队坐电梯得分批，这个记进方案。':'电梯到了，再走两步就能休息。');
 else if(m?.steps.length)extra.push(g.persona==='road'?'走廊顺着走，别耽误下一场会。':'沿着走廊过去，不急。');
 else if(role==='guest'){
  if(g.upgrades)personal.push(g.persona==='hunter'?'Standard Suite 确认了，明天续住再问。':'可以写个好 DP。');
  if(g.persona==='whale')personal.push(s.entities['facility-spa']?'下午去 Spa，别排太满。':'要是有 Spa，今天就不出门了。');
  if(g.persona==='creator')personal.push('房间自然光不错，这组可以不用滤镜。');
  extra.push('在房间歇一会，今天不必把每层都打卡。');
 }else if(!m?.steps.length)extra.push(...(PLACE_LINES[role]??[]));
 if(!g.upgrades&&appSuites>0&&['hunter','forum'].includes(g.persona??''))personal.push('我记得 App 上还有套。',`App 上还有 ${appSuites} 间套，先问问 Front Office。`);
 if(g.sua&&!g.roomId)personal.push('SUA 带好了，今晚能确认 Standard Suite 吗？');
 if(g.goh)personal.push('这次 GOH 帮忙安排的，体验得认真反馈。');
 if(g.late==='pending')priority.push((g.checkoutDay===s.game!.day?'今天':'明天')+'能 4PM 吗？先确认一下再安排行程。');
 const memory=s.game!.guestMemory?.[memoryKey(g)];if(memory?.visits)personal.push(memory.denied?'上次没拿到套，这次看看有没有新 DP。':'上次住得不错，这次又回来了。');
 if(s.game!.weather==='rain'&&role==='lobby')extra.push('下雨就不去屋顶了，在 Lobby 等雨停。');
 if(s.game!.positioning==='resort'&&g.persona==='chill')personal.push('度假不打卡，今天就在酒店慢慢过。');
 if(g.tier==='Globalist'&&role==='club')personal.push('Globalist 的 Happy Hour，今天得慢慢吃。');
 if(!m?.steps.length&&role!=='guest'&&role!=='lobby'){
  const place=s.entities['facility-'+role];if(place?.kind==='facility')personal.unshift(place.name+'：'+({chill:'找个角落坐着，今天没有 KPI。',road:'这边结束就回房开会，不赶第二场。',family:'先看看孩子能不能坐得住。',points:'这一项用上，房费回本又近一步。',hunter:'休息归休息，套房库存还是要看。',forum:'现场和帖子对照一下，DP 才完整。',creator:'等人少点再拍，原图要经得起放大。',proposal:'先踩好点，惊喜不能临场找位置。',planner:'容量记一下，下次带团队得错峰。',whale:'不用推荐最贵的，推荐最好的。',auditplus:'我就坐一会，您按 SOP 来。'}[g.persona??'chill']));
 }
 const recent=s.game!.dialogueRecent??={};for(const [text,at] of Object.entries(recent))if(now-at>240)delete recent[text];
 const fresh=(lines:string[])=>lines.filter(text=>!speech.recent.some(r=>r.text===text&&now-r.at<240)&&now-(recent[text]??-9999)>35);
 let pool=fresh(priority);if(!pool.length)pool=fresh(hash(g.id+now)%3===0?[...extra,...personal]:personal);if(!pool.length)pool=fresh(extra);
 if(pool.length){const text=pool[hash(g.id+':'+now)%pool.length];g.thought=text;speech.recent.push({text,at:now});speech.recent=speech.recent.slice(-8);recent[text]=now;}else g.thought='';
 speech.next=now+45+hash(g.id+now)%35;
}
