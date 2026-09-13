import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {workItems,workList,hubView} from '../src/ui/managementHub';
test('看板就地清洁和补货后移除对应事项，保留其他待办',()=>{
 const s=newGame(),r=rooms(s).find(v=>v.status==='available')!;r.status='dirty';s.game!.stock=0;s.metrics.cash=10000;
 const before=workItems(s);assert.ok(before.find(v=>v.key===r.id));assert.ok(before.find(v=>v.key==='breakfast-stock'));
 execute(s,{type:'clean',id:r.id});assert.equal(r.status,'cleaning');assert.ok(!workItems(s).find(v=>v.key===r.id));assert.ok(workItems(s).find(v=>v.key==='breakfast-stock'));
 execute(s,{type:'stock',id:'breakfast'});assert.equal(s.game!.stock,50);assert.ok(!workItems(s).find(v=>v.key==='breakfast-stock'));assert.equal(s.metrics.cash,9610);
});
test('优先事项靠前，列表限制只影响展示，操作不会批量执行',()=>{
 const s=newGame();s.game!.stock=0;const before=JSON.stringify(s),items=workItems(s);assert.equal(items[0].urgent,true);
 assert.equal((workList(s,2).match(/data-work-key=/g)??[]).length,Math.min(2,items.length));assert.ok(hubView(s).includes('data-open="evening"'));assert.equal(JSON.stringify(s),before);
});
