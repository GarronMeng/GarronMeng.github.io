import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {standardSuite,isSuite} from '../src/content/roomTypes';
import {applyFollowups,describeDilemma,morale,settleDecisions} from '../src/core/dilemmas';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import type {Dilemma,DilemmaKind,PreviewState} from '../src/state/types';

function open(){const s=newGame({guided:false});execute(s,{type:'brief-start'});s.metrics.cash=50000;s.game!.tasks=[];return s;}
function inject(s:PreviewState,kind:DilemmaKind,extra:Partial<Dilemma>={}){const g=s.game!,t=g.day*1440+g.minute,d:Dilemma={id:g.nextId++,kind,day:g.day,created:t,expires:t+120,...extra};g.dilemmas!.push(d);return d;}
function resident(s:PreviewState,persona?:string){const v=queue(s)[0],r=rooms(s).find(r=>r.status==='available'&&!isSuite(r))!;execute(s,{type:'checkin',id:v.id,roomId:r.id});if(persona)v.persona=persona;v.checkoutDay=s.game!.day+2;return v;}
function run(s:PreviewState,minutes:number){const g=s.game!;for(let i=0;i<minutes;i+=10){advanceGame(s,10);if(g.evening?.open)execute(s,{type:'evening-close'});if(g.reportOpen){execute(s,{type:'continue'});execute(s,{type:'brief-start'});}}}

test('超售：全部接下会写入带决策标记的团队预订并消耗团队精力，婉拒只影响业主',()=>{
 const s=open(),g=s.game!,energy=morale(s),d=inject(s,'overbook',{count:2,rate:800});
 execute(s,{type:'dilemma',id:String(d.id),value:'all'});const r=g.decisions!.at(-1)!,added=g.operations!.bookings.filter(b=>b.decision===r.id);
 assert.equal(added.length,2);assert.ok(added.every(b=>b.rate===800&&b.status==='confirmed'));assert.equal(morale(s),energy-4);assert.equal(g.dilemmas!.length,0);
 for(const b of added)b.status='checkedin';settleDecisions(s);assert.match(r.result,/2 间入住/);
 const owner=s.metrics.owner,d2=inject(s,'overbook',{count:2,rate:800}),before=g.operations!.bookings.length;execute(s,{type:'dilemma',id:String(d2.id),value:'decline'});assert.equal(g.operations!.bookings.length,before);assert.equal(s.metrics.owner,owner-1);
});

test('免费升套给差旅负责人：立即搬进套房，次日晨会兑现协议订单',()=>{
 const s=open(),g=s.game!,v=resident(s,'planner'),suites=rooms(s).filter(r=>standardSuite(r)&&r.status==='available'&&!r.suaBookingId);assert.ok(suites.length,'需要可售标准套');
 const d=inject(s,'vip-upgrade',{guestId:v.id,roomId:v.roomId}),view=describeDilemma(s,d);assert.equal(view.recommend,'free');
 execute(s,{type:'dilemma',id:String(d.id),value:'free'});assert.ok(standardSuite(s.entities[v.roomId!] as never));assert.equal(g.followups!.length,1);
 const bookings=g.operations!.bookings.length;g.day++;applyFollowups(s);assert.equal(g.operations!.bookings.length,bookings+2);assert.match(g.echoes!.at(-1)!.text,/协议价/);assert.match(g.decisions!.at(-1)!.future!,/已兑现/);
 assert.match(focusScreen(s,'brief',focusSelection())!,/昨日决定的回响/);
});

test('客房加班：花钱派临时保洁，翻完离场；团队精力下降',()=>{
 const s=open(),dirty=rooms(s).filter(r=>r.status==='available').slice(0,3);dirty.forEach(r=>r.status='dirty');
 const cash=s.metrics.cash,energy=morale(s),d=inject(s,'hk-overtime',{count:3});execute(s,{type:'dilemma',id:String(d.id),value:'overtime'});
 assert.equal(s.metrics.cash,cash-300);assert.equal(morale(s),energy-6);assert.equal(s.guests.filter(v=>v.id.startsWith('staff-ot-')).length,3);assert.ok(dirty.every(r=>r.status==='cleaning'));
 advanceGame(s,90);assert.ok(dirty.every(r=>r.status!=='dirty'&&r.status!=='cleaning'),'加班保洁应在一小时内翻完');advanceGame(s,60);assert.equal(s.guests.filter(v=>v.id.startsWith('staff-ot-')).length,0);
});

test('噪音投诉免单：当晚结算不收这间房费，次日恢复正常',()=>{
 const s=open(),g=s.game!,v=resident(s),d=inject(s,'noise-comp',{guestId:v.id,roomId:v.roomId,reason:'空调一直嗡嗡响'});
 execute(s,{type:'dilemma',id:String(d.id),value:'comp'});assert.equal(v.compNight,true);const spend=v.spend??0;
 const rate=v.rate??g.price;run(s,1440-g.minute+10);assert.ok((v.spend??0)-spend<rate,'免单当晚不计房费');assert.equal(v.compNight,false);
});

test('超时按保守方案自动处理并记入复盘；情况变化的抉择直接撤销',()=>{
 const s=open(),g=s.game!;g.minute=600;const owner=s.metrics.owner,d=inject(s,'budget');d.expires=g.day*1440+g.minute+1;advanceGame(s,2);
 const r=g.decisions!.at(-1)!;assert.equal(r.auto,true);assert.match(r.choice,/超时/);assert.equal(s.metrics.owner,owner+3);
 const count=g.decisions!.length;inject(s,'vip-upgrade',{guestId:'nobody'});advanceGame(s,1);assert.equal(g.dilemmas!.filter(x=>x.guestId==='nobody').length,0);assert.equal(g.decisions!.length,count);
});

test('自由经营多日：同一时间只有一个抉择，同类每天最多一次且有每日上限',()=>{
 const s=open(),g=s.game!,seen=new Map<number,DilemmaKind[]>();let max=0;
 for(let i=0;i<6*144;i++){advanceGame(s,10);max=Math.max(max,g.dilemmas!.length);for(const d of g.dilemmas!){const list=seen.get(d.day)??[];if(!list.includes(d.kind)){list.push(d.kind);seen.set(d.day,list);}}if(g.evening?.open)execute(s,{type:'evening-close'});if(g.reportOpen){execute(s,{type:'continue'});execute(s,{type:'brief-start'});}}
 assert.ok(max<=1);assert.ok([...seen.values()].flat().length>=3,'几天经营应出现多个抉择');for(const [day,list] of seen)assert.ok(list.length<=(day>=7?3:2),'Day '+day+' 抉择过多');
});

test('抉择卡按 当前情况 → 建议 → 选项权衡 → 操作 呈现，推荐项有标记',()=>{
 const s=open(),d=inject(s,'overbook',{count:2,rate:800}),html=focusScreen(s,'events',{...focusSelection(),event:'dilemma-'+d.id})!;
 const order=['dc-kicker','focus-person','dc-advice','dc-option','dc-fallback'].map(k=>html.indexOf(k));assert.ok(order.every((v,i)=>v>=0&&(i===0||v>order[i-1])),'信息顺序');
 assert.equal((html.match(/data-action="dilemma"/g)??[]).length,3);assert.match(html,/<em>建议<\/em>/);assert.match(html,/data-open="decisions"/);
});
