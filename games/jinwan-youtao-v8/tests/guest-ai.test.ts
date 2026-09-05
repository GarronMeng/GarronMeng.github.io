import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {travel,stepMovement,ensureMovement} from '../src/core/guestMovement';
import {destinationWeights,publicLoad} from '../src/core/guestAI';
import {cue} from '../src/core/guestDialogue';
import {PERSONAS} from '../src/content/personas';
import {rooms} from '../src/state/selectors';

test('房间—走廊—电梯—公区—房间完整连续；4倍批次保留路径',()=>{
 const s=newGame(),g=s.guests.find(g=>g.roomId)!;ensureMovement(s,g);
 const room=g.roomId!;assert.ok(travel(s,g,'facility-club'));const phases=new Set<string>();
 for(let i=0;i<240&&g.movement!.steps.length;i++){const before={...g.movement!.position};stepMovement(s,g);const p=g.movement!.position;phases.add(p.phase);
  assert.ok(Math.hypot(p.x-before.x,p.z-before.z,(p.level-before.level)*2.55)<=.851);
  if(p.level!==before.level){assert.equal(p.x,7.94);assert.equal(p.z,.9);assert.equal(before.x,7.94);assert.equal(before.z,.9);}
 }
 assert.equal(g.floorId,'floor-club');assert.equal(g.movement!.position.phase,'public');assert.ok(phases.has('corridor')&&phases.has('elevator'));
 assert.ok(travel(s,g,room));for(let i=0;i<240&&g.movement!.steps.length;i++)stepMovement(s,g);assert.equal(g.floorId,s.entities[room].floorId);assert.equal(g.movement!.position.phase,'room');
 const q=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:q.id,roomId:r.id});assert.equal(q.floorId,'floor-lobby');
 advanceGame(s,16);assert.equal(q.movement!.trail.length,17);
 const pos={...q.movement!.position};execute(s,{type:'stock'});assert.deepEqual(q.movement!.position,pos);
});
test('人格/时段/雨天/会员/容量分流，Spa接入且不强制去屋顶',()=>{
 const s=newGame(),g=s.guests.find(g=>g.roomId)!;s.metrics.cash=100000;execute(s,{type:'build-spa'});assert.ok(s.entities['facility-spa']);
 s.game!.minute=1080;g.persona='creator';s.game!.weather='sunny';assert.ok(destinationWeights(s,g).some(d=>d.id==='facility-rooftop'));
 s.game!.weather='rain';assert.ok(!destinationWeights(s,g).some(d=>d.id==='facility-rooftop'));
 s.game!.minute=1320;assert.deepEqual(destinationWeights(s,g).map(d=>d.id),[g.roomId]);
 s.game!.minute=900;g.persona='whale';assert.ok(destinationWeights(s,g).some(d=>d.id==='facility-spa'));
 const f=s.entities['facility-spa'];if(f.kind!=='facility')throw Error();f.capacity=1;assert.ok(travel(s,g,f.id));assert.equal(publicLoad(s,f.id),1);
 const other=s.guests.find(v=>v.roomId&&v.id!==g.id)!;assert.ok(!destinationWeights(s,other).some(d=>d.id===f.id));
});
test('对白人格、上下文与冷却；4PM兑现并保存旧版人物',async()=>{
 assert.equal(Object.keys(PERSONAS).length,11);const s=newGame(),g=s.guests.find(g=>g.roomId)!;g.persona='points';g.serviceDone=true;cue(s,g,'recovery');assert.match(g.thought,/QN/);const first=g.thought;cue(s,g,'recovery');assert.notEqual(g.thought,first);
 g.late='pending';execute(s,{type:'late',id:g.id,value:'honor'});assert.equal(g.late,'honor');g.checkoutDay=s.game!.day;s.game!.minute=660;advanceGame(s,1);assert.ok(g.roomId);
 const raw=JSON.parse(JSON.stringify(s));for(const guest of raw.guests){delete guest.movement;delete guest.persona;delete guest.speech;}
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>JSON.stringify(raw)}});
 const {loadGame}=await import('../src/core/save');const restored=loadGame();assert.equal(restored.metrics.cash,s.metrics.cash);assert.ok(restored.guests.filter(g=>!g.staff).every(g=>g.persona&&g.movement));delete (globalThis as {localStorage?:unknown}).localStorage;
});

test('会员晚退保留手动决策，2PM/4PM生效，新客短住占多数',async()=>{
 const {checkoutMinute,stayNights}=await import('../src/core/guestRequests');
 const s=newGame();s.game!.minute=540;s.game!.managers.front=3;
 const members=s.guests.filter(g=>g.roomId).slice(0,2);members[0].tier='Globalist';members[1].tier='Explorist';
 for(const g of members){delete g.late;g.checkoutDay=s.game!.day;}
 advanceGame(s,2);assert.ok(members.every(g=>g.late==='pending'));
 for(const g of members)execute(s,{type:'late',id:g.id,value:'honor'});
 assert.equal(checkoutMinute(members[0]),960);assert.equal(checkoutMinute(members[1]),840);assert.equal(s.game!.tasks.find(t=>t.id==='late-decision')?.progress,1);
 assert.equal(Array.from({length:100},(_,i)=>stayNights(false,i/100,.5)).filter(n=>n<=2).length,90);
 assert.equal(Array.from({length:100},(_,i)=>stayNights(true,i/100,.5)).filter(n=>n<=2).length,82);
});
test('装修预览与真实结算使用一致价格，缺货对白不夸赞用餐',async()=>{
 const {roomRate}=await import('../src/core/economy');const {speak}=await import('../src/core/guestDialogue');const s=newGame();s.metrics.cash=100000;
 const q=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'upgrade',id:r.id});execute(s,{type:'checkin',id:q.id,roomId:r.id});assert.equal(q.rate,roomRate(s.game!.price,r,q.tier==='Globalist'));
 q.floorId='floor-breakfast';q.movement!.steps=[];q.movement!.position.phase='public';q.experience={place:'facility-breakfast',kind:'shortage',at:s.game!.day*1440+s.game!.minute};q.speech={next:0,recent:[]};speak(s,q);assert.match(q.thought,/空了/);
});
