import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
test('入住、午夜唯一结算、多晚跨日、扩建与主管连续运行',()=>{
 const s=newGame(),g=s.game!,q=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;
 execute(s,{type:'checkin',id:q.id,roomId:r.id});assert.equal(r.status,'occupied');assert.equal(q.checkoutDay,1+q.stayLength!);
 for(const id of ['front','house','engineering','fnb','revenue'])execute(s,{type:'hire',id});
 for(let day=0;day<7;day++){advanceGame(s,1600);assert.equal(g.reportOpen,true);const cash=s.metrics.cash;advanceGame(s,1600);assert.equal(s.metrics.cash,cash);execute(s,{type:'continue'});}
 assert.equal(g.day,8);assert.equal(g.reports.length,7);assert.ok(g.logs.some(l=>l.category==='入住'));assert.ok(g.logs.some(l=>l.category==='收益'));assert.ok(Number.isFinite(s.metrics.cash));
 s.metrics.cash=200000;for(let i=0;i<4;i++)execute(s,{type:'expand'});assert.ok(s.floors.some(f=>f.label==='8F'&&f.role==='guest'));assert.equal(rooms(s).length,21);
 const ids=new Set(s.guests.filter(g=>g.roomId).map(g=>g.roomId));assert.equal(ids.size,s.guests.filter(g=>g.roomId).length);
});

test('解除21间限制、投资活动结算、领奖幂等及旧存档兼容',async()=>{
 const {scores,milestones}=await import('../src/core/progression');
 const {loadGame,SAVE_KEY}=await import('../src/core/save');
 const s=newGame(),g=s.game!;s.metrics.cash=1000000;
 for(let i=0;i<9;i++)execute(s,{type:'expand'});
 assert.equal(rooms(s).length,36);assert.equal(new Set(s.floors.map(f=>f.id)).size,s.floors.length);
 const f=s.entities['facility-gym'];assert.equal(f.kind,'facility');if(f.kind!=='facility')throw Error();const capacity=f.capacity;
 execute(s,{type:'invest',id:f.id});assert.equal(f.level,2);assert.equal(f.capacity,capacity+4);
 execute(s,{type:'hire',id:'house'});execute(s,{type:'train',id:'house'});assert.equal(g.managers.house,2);
 execute(s,{type:'campaign'});const afterCampaign=s.metrics.cash;execute(s,{type:'campaign'});assert.equal(s.metrics.cash,afterCampaign);
 execute(s,{type:'activity',id:'fitness'});const afterActivity=s.metrics.cash;execute(s,{type:'activity',id:'rooftop'});assert.equal(s.metrics.cash,afterActivity);
 advanceGame(s,120);assert.equal(g.development!.activity,undefined);assert.equal(g.development!.counts.activity,1);
 const m=milestones(s).find(m=>m.id==='rooms-24')!;assert.ok(m.progress>=m.goal);execute(s,{type:'claim-career',id:m.id});const afterClaim=s.metrics.cash;execute(s,{type:'claim-career',id:m.id});assert.equal(s.metrics.cash,afterClaim);
 assert.ok(scores(s).total>=0&&scores(s).total<=100);
 const old=structuredClone(s);delete old.game!.development;const raw=JSON.stringify(old);
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>key===SAVE_KEY?raw:null}});
 const restored=loadGame();assert.equal(rooms(restored).length,36);assert.equal(restored.metrics.cash,s.metrics.cash);assert.ok(restored.game!.development);
 delete (globalThis as {localStorage?:unknown}).localStorage;
});
