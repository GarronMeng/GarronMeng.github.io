import {lateLabel} from './guestRequests';
import type {Facility,Guest,Persona,PreviewState,LogCategory} from '../state/types';
import {PERSONAS} from '../content/personas';
import {cue,speak,memoryKey} from './guestDialogue';
import {ensureMovement,hotelTime,hash,travel,stepMovement} from './guestMovement';
export interface GuestEffects {income:(n:number)=>void;reputation:(n:number)=>void;log:(category:LogCategory,text:string,target?:string)=>void;progress:(id:string,n?:number)=>void;}
export function initGuest(s:PreviewState,g:Guest){if(g.staff)return;g.persona??=(Object.keys(PERSONAS) as Persona[])[hash(g.id)%11];ensureMovement(s,g);}
export function publicLoad(s:Readonly<PreviewState>,id:string){return s.guests.filter(g=>!g.staff&&!g.departing&&(g.movement?.destination===id&&(g.movement.steps.length>0||g.movement.position.phase==='public'))).length;}
/** Home is always an option; inbound guests reserve capacity before starting a trip. */
export function destinationWeights(s:Readonly<PreviewState>,g:Guest){const minute=s.game!.minute,h=minute/60,p=PERSONAS[g.persona??'chill'],weights:{id:string;weight:number}[]=[{id:g.roomId!,weight:h>=22||h<7?25:3}];
 for(const f of Object.values(s.entities)){if(f.kind!=='facility')continue;
  let weight=0;
  if(f.role==='breakfast')weight=h>=7&&h<10?5:h>=10&&h<10.5?1:0;
  if(f.role==='club')weight=h>=17&&h<20.5?4:h>=14&&h<17?.5:0;
  if(f.role==='gym')weight=h>=7&&h<10?1.5:h>=16&&h<21?1.8:h>=10&&h<16?.6:0;
  if(f.role==='spa')weight=h>=11&&h<20?1.4:0;
  if(f.role==='lobby')weight=h>=7&&h<22?.7:0;
  if(f.role==='rooftop')weight=s.game!.weather==='rain'?0:h>=16&&h<19?1.8:h>=19&&h<21?.5:h>=10&&h<16?.4:0;
  weight*=p.likes[f.role]??1;
  if(f.role==='club')weight*=g.tier==='Globalist'||g.goh?1.5:g.tier==='普通客'?.25:.7;
  if(s.game!.positioning==='business'&&(f.role==='lobby'||f.role==='breakfast'))weight*=1.3;
  if(s.game!.positioning==='resort'&&(f.role==='spa'||f.role==='rooftop'||f.role==='gym'))weight*=1.4;
  if(s.game!.weather==='rain'&&(f.role==='spa'||f.role==='lobby'))weight*=1.3;
  const load=publicLoad(s,f.id);weight*=Math.max(0,1-load/Math.max(1,f.capacity));
  weight*=Math.max(.2,f.maintenance/100);if(g.lastVisit===f.id)weight*=.2;
  if(g.persona==='family'&&h>=20)weight=0;
  if(weight>0)weights.push({id:f.id,weight});
 }return weights;
}
function visit(s:PreviewState,g:Guest,f:Facility,e:GuestEffects){g.lastVisit=f.id;
 if(publicLoad(s,f.id)>f.capacity){g.experience={place:f.id,kind:'full',at:hotelTime(s)};cue(s,g,'full');travel(s,g,g.roomId!);return;}
 const meal=f.role==='breakfast'||f.role==='club',key=f.role==='breakfast'?'stock':'clubStock';
 if(meal&&s.game![key]<=0){g.experience={place:f.id,kind:'shortage',at:hotelTime(s)};g.satisfaction=Math.max(0,(g.satisfaction??90)-5);s.game!.complaints++;e.reputation(-1);cue(s,g,'shortage');e.log('客诉',g.name+'：'+g.thought,f.id);return;}
 g.experience={place:f.id,kind:'served',at:hotelTime(s)};if(meal)s.game![key]--;
 const rate=f.role==='club'?(g.tier==='Globalist'||g.goh?0:80):f.role==='gym'?20:f.role==='spa'?280:f.role==='rooftop'?45:0;
 const n=Math.round(rate*(1+((f.level??1)-1)*.2)*(g.persona==='whale'?1.5:1));if(n){e.income(n);e.progress('ancillary',n);}
 g.satisfaction=Math.min(100,(g.satisfaction??90)+(f.level??1));f.maintenance=Math.max(0,f.maintenance-.1);g.speech??={next:0,recent:[]};g.speech.next=0;speak(s,g);
}
export function depart(s:PreviewState,g:Guest){g.departing=true;if(!g.movement?.steps.length)travel(s,g,'exit');}
export function tickGuest(s:PreviewState,g:Guest,random:()=>number,e:GuestEffects){initGuest(s,g);const m=g.movement!,now=hotelTime(s),arrived=stepMovement(s,g);
 if(g.departing){if(arrived&&m.destination==='exit')g.exitAt=now;if(!m.steps.length&&m.destination!=='exit')travel(s,g,'exit');speak(s,g);return;}
 if(!g.roomId){speak(s,g);return;}
 if(arrived){const f=s.entities[m.destination];if(f?.kind==='facility')visit(s,g,f,e);}
 if(!g.late&&((g.checkoutDay===s.game!.day+1&&s.game!.minute>=1080)||(g.checkoutDay===s.game!.day&&s.game!.minute>=540))&&(g.tier==='Globalist'||g.tier==='Explorist'||g.persona==='family')){g.lateHour=g.tier==='Globalist'?16:14;g.late='pending';cue(s,g,'late');e.log('入住',g.name+' · '+g.tier+'：'+(g.checkoutDay===s.game!.day?'今天':'明天')+'能 '+lateLabel(g)+' 退房吗？',g.roomId);}
 if(g.late==='pending'&&!s.game!.tasks.some(t=>t.id==='late-decision'))s.game!.tasks.push({id:'late-decision',title:'完成一次会员晚退协商',goal:1,progress:0,reward:500,claimed:false,target:'events'});
 if(!m.steps.length&&now>=m.nextDecision){
  if(m.destination!==g.roomId){travel(s,g,g.roomId);}
  else{const choices=destinationWeights(s,g);let pick=random()*choices.reduce((a,b)=>a+b.weight,0);let dest=g.roomId;for(const c of choices){pick-=c.weight;if(pick<=0){dest=c.id;break;}}
   if(dest!==g.roomId)travel(s,g,dest);else{m.nextDecision=now+35+Math.floor(random()*75);if(random()<.35){const x=(Number((s.entities[g.roomId] as {number:string}).number)%100-2)*4.93;m.steps=[{x:x+(random()-.5)*1.1,z:1.25,level:m.position.level,phase:'room'}];m.arrived=false;}}}
 }
 speak(s,g);
}
export function checkoutMemory(s:PreviewState,g:Guest,e:GuestEffects){const book=s.game!.guestMemory??={},key=memoryKey(g);book[key]={visits:(book[key]?.visits??0)+1,satisfaction:g.satisfaction??90,denied:!!g.denied};const good=(g.satisfaction??90)>=90;
 if(good&&['creator','planner','whale'].includes(g.persona??'')){const bonus=g.persona==='whale'?360:g.persona==='planner'?220:260;e.income(bonus);e.log('收益',g.name+' · '+(g.persona==='whale'?'留下 ¥360 小费。':g.persona==='planner'?'认可团队动线，支付 ¥220 场地考察费。':'发出好 DP，带来 ¥260 推广返佣。'));}
 if(g.persona==='auditplus'){s.metrics.owner=Math.max(0,Math.min(100,s.metrics.owner+(good?3:-2)));e.log('部门',good?'神秘审计客：SOP 和现场是同一版，业主 +3。':'神秘审计客默默记下几个问题，业主 -2。');}
 cue(s,g,'checkout');
}
