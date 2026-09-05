import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute} from '../src/core/game';
import {rooms,roomSlots} from '../src/state/selectors';
import {roomRate} from '../src/core/economy';
import {roomBed,roomTier} from '../src/content/roomTypes';
test('新增三空位、八种配置、重复点击不扣费、尊享套房正常计价',()=>{
 for(const tier of ['standard','view','suite','premium'])for(const bed of ['king','twin']){
  const s=newGame();s.metrics.cash=100000;execute(s,{type:'expand'});assert.equal(rooms(s).length,9);const empty=roomSlots(s).filter(r=>r.status==='unbuilt');assert.equal(empty.length,3);
  const r=empty[0];execute(s,{type:'configure-room',id:r.id,value:tier+':'+bed});assert.equal(roomTier(r),tier);assert.equal(roomBed(r),bed);assert.equal(rooms(s).length,10);
  const cash=s.metrics.cash;execute(s,{type:'configure-room',id:r.id,value:tier+':'+bed});assert.equal(s.metrics.cash,cash);
  if(tier==='premium')assert.equal(roomRate(650,r,true),1235);
  if(tier==='suite')assert.equal(roomRate(650,r,true),650);
  assert.equal(s.game!.upgradeEffect?.entityId,r.id);
 }
});
