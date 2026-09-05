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
