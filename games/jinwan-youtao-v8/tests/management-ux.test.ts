import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,queue} from '../src/core/game';
import {roomChoices,teachingSteps,priority} from '../src/ui/managementUx';
test('房间卡直接办理入住，带教只认真实操作，存档往返保留进度',()=>{
 const s=newGame();execute(s,{type:'brief-start'});const guest=queue(s)[0];assert.ok(guest);assert.equal(teachingSteps(s)[0].done,false);
 const html=roomChoices(s,guest),id=html.match(/data-room="([^"]+)"/)?.[1];assert.ok(id);assert.ok(!html.includes('<select'));execute(s,{type:'checkin',id:guest.id,roomId:id});assert.equal(guest.roomId,id);assert.equal(teachingSteps(s)[0].done,true);
 const stock=s.game!.stock;execute(s,{type:'stock',id:'breakfast'});assert.ok(s.game!.stock>stock);assert.equal(teachingSteps(s)[1].done,true);assert.equal(teachingSteps(JSON.parse(JSON.stringify(s)))[1].done,true);
 s.game!.day=2;assert.equal(teachingSteps(s)[0].done,false);execute(s,{type:'stock',id:'club'});assert.equal(teachingSteps(s)[0].done,true);assert.equal(teachingSteps(s)[1].done,true);
 s.game!.day=3;assert.equal(teachingSteps(s)[0].done,false);execute(s,{type:'price',value:720});assert.equal(teachingSteps(s)[0].done,true);s.game!.day=4;assert.equal(teachingSteps(s).length,0);
});
test('主管建议按当前短缺改变，卡片不会提供已占用房间',()=>{
 const s=newGame();s.game!.stock=0;assert.match(priority(s,'operations'),/餐台快见底/);s.game!.stock=s.game!.clubStock=80;assert.ok(!priority(s,'operations').includes('餐台快见底'));
 const guest=queue(s)[0];for(const r of Object.values(s.entities))if(r.kind==='room')r.status='occupied';assert.ok(!roomChoices(s,guest).includes('data-room='));assert.match(roomChoices(s,guest),/先看房态/);
});
