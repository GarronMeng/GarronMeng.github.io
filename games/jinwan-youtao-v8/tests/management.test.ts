import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms,roomSlots} from '../src/state/selectors';
import {tickConstruction} from '../src/core/construction';
import {tickWorkforce} from '../src/core/workforce';
import {roomRate} from '../src/core/economy';
import {loseBooking,guestStory} from '../src/core/operations';

test('晨会锁定确认预订、保留报价、赔付幂等与每日交班',()=>{
 const s=newGame(),g=s.game!,o=g.operations!;assert.equal(o.briefOpen,true);assert.equal(g.paused,true);const rates=o.bookings.map(b=>b.rate);execute(s,{type:'price',value:850});assert.deepEqual(o.bookings.map(b=>b.rate),rates);execute(s,{type:'brief-start'});assert.equal(g.paused,false);
 const first=[...o.bookings].sort((a,b)=>a.eta-b.eta)[0];advanceGame(s,first.eta-g.minute+1);const guest=queue(s).find(v=>v.reservationId===first.id)!;assert.ok(guest);
 const room=rooms(s).find(r=>r.id===first.roomId)??rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:guest.id,roomId:room.id});assert.equal(guest.rate,roomRate(first.rate,room,guest.tier==='Globalist'));
 const lost=o.bookings.find(b=>b.id!==first.id)!;const sample={...guest,id:'test-loss',reservationId:lost.id};const cash=s.metrics.cash;loseBooking(s,sample);loseBooking(s,sample);assert.equal(s.metrics.cash,cash-600);
 s.metrics.cash=100000;for(const id of ['front','house','engineering','fnb','revenue'])execute(s,{type:'hire',id});advanceGame(s,1600);assert.equal(g.reportOpen,true);assert.ok(g.reports.at(-1)?.forecastOccupancy!==undefined);execute(s,{type:'continue'});assert.equal(o.briefOpen,true);assert.equal(o.day,2);assert.ok(s.guests.some(v=>v.staffRole==='house'));
});
test('施工期间不可配置或出售，竣工后升级；员工必须到场后完成',()=>{
 const s=newGame();s.metrics.cash=100000;execute(s,{type:'expand'});const f=s.floors.find(f=>f.construction)!;const slot=s.entities[f.entityIds[0]];if(slot.kind!=='room')throw Error();execute(s,{type:'configure-room',id:slot.id,value:'suite:twin'});assert.equal(slot.status,'unbuilt');
 for(let i=0;i<240;i++)tickConstruction(s);assert.equal(f.construction,undefined);execute(s,{type:'configure-room',id:slot.id,value:'suite:twin'});assert.equal(slot.status,'available');execute(s,{type:'upgrade',id:slot.id});assert.equal(slot.level,1);assert.equal(slot.status,'maintenance');for(let i=0;i<90;i++)tickConstruction(s);assert.equal(slot.level,2);assert.equal(slot.status,'available');
 const room=rooms(s).find(r=>r.status==='available')!;room.status='dirty';execute(s,{type:'hire',id:'house'});const tick=()=>tickWorkforce(s,c=>execute(s,c),n=>{s.metrics.cash-=n;return true;});tick();assert.equal(room.status,'cleaning');const worker=s.guests.find(v=>v.job?.target===room.id)!;assert.ok(worker.movement!.steps.length>0);for(let i=0;i<150;i++)tick();assert.ok(s.game!.operations!.hkCompleted>0);
});
test('客史按稳定身份累计，错误服务产生差评，满意回访形成关系',()=>{
 const s=newGame(),g=s.guests.find(g=>g.roomId)!;g.challenge={kind:'family',resolved:false};g.satisfaction=95;execute(s,{type:'guest-choice',id:g.id,value:'gift'});assert.equal(g.challenge.outcome,'未解决核心诉求');guestStory(s,g);const p=s.game!.operations!.profiles[g.profileId!]!;assert.equal(p.trust,-1);assert.match(p.history.at(-1)!.text,/差 DP/);
 g.challenge=undefined;g.denied=false;g.satisfaction=95;for(let i=0;i<3;i++)guestStory(s,g);assert.equal(p.trust,2);assert.match(p.history.at(-1)!.text,/介绍朋友/);
});

test('待办先引导入住，入住后可落实诉求并留下明确结果',async()=>{
 const {challengeCards}=await import('../src/ui/managementViews');
 const s=newGame();execute(s,{type:'brief-start'});const g=queue(s)[0];assert.ok(g);g.challenge={kind:'family',resolved:false};
 const cash=s.metrics.cash;execute(s,{type:'guest-choice',id:g.id,value:'family'});assert.equal(s.metrics.cash,cash);assert.equal(g.challenge.resolved,false);assert.match(challengeCards(s),new RegExp('data-guest="'+g.id+'"'));
 const room=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:g.id,roomId:room.id});assert.equal(g.roomId,room.id);assert.match(challengeCards(s),/安排家庭服务/);
 s.game!.stock=10;const before=s.metrics.cash;execute(s,{type:'guest-choice',id:g.id,value:'family'});assert.equal(g.challenge.resolved,true);assert.equal(s.game!.stock,4);assert.equal(s.metrics.cash,before-180);assert.ok(room.extraBed);assert.ok(s.game!.notice.includes(g.name));assert.ok(!challengeCards(s).includes('data-id="'+g.id+'"'));
});
