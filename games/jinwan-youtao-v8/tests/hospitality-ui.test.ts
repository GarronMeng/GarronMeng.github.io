import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {birthdayOptions} from '../src/core/hospitality';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {menuFor,moduleLinks} from '../src/ui/navigation';
function birthday(){const s=newGame(),v=queue(s)[0],r=rooms(s).find(r=>r.status==='available'&&!r.suaBookingId&&!['suite','premium'].includes(r.category??r.type))!;execute(s,{type:'checkin',id:v.id,roomId:r.id});v.occasion={kind:'birthday',resolved:false};v.satisfaction=75;return {s,v,r};}
test('生日早餐真实预留库存与预算，反复点击不重复扣款，低成本祝福可行',()=>{
 const {s,v}=birthday();s.game!.stock=4;const cash=s.metrics.cash;execute(s,{type:'birthday-choice',id:v.id,value:'breakfast'});assert.equal(s.metrics.cash,cash-160);assert.equal(s.game!.stock,2);assert.equal(v.birthdayBreakfast,2);assert.equal(v.satisfaction,83);execute(s,{type:'birthday-choice',id:v.id,value:'suite'});assert.equal(s.metrics.cash,cash-160);
 const other=birthday();other.s.metrics.cash=0;execute(other.s,{type:'birthday-choice',id:other.v.id,value:'breakfast'});assert.equal(other.v.occasion!.resolved,false);execute(other.s,{type:'birthday-choice',id:other.v.id,value:'card'});assert.equal(other.v.satisfaction,77);assert.equal(other.s.metrics.cash,0);assert.match(other.v.thought,/手写生日卡/);
});
test('生日升套不挪用预订，允许时原房待清洁、原价保留且正常走电梯',()=>{
 const {s,v,r}=birthday();const rs=rooms(s),suite=rs.find(r=>r.type==='suite')!;for(const room of rs)if(room.type==='suite'){room.status='available';room.suaBookingId=undefined;}
 s.game!.operations!.bookings=[];s.game!.operations!.suitePolicy='hold';const free=birthdayOptions(s,v).free;
 s.game!.operations!.bookings=Array.from({length:free},(_,i)=>({id:'b'+i,profileId:v.profileId!,source:'APP',eta:900,nights:1,rate:650,segment:'商务',status:'confirmed'}));s.game!.operations!.profiles[v.profileId!]!.tier='Globalist';const cash=s.metrics.cash;execute(s,{type:'birthday-choice',id:v.id,value:'suite'});assert.equal(v.occasion!.resolved,false);assert.equal(s.metrics.cash,cash);
 s.game!.operations!.bookings=[];s.game!.operations!.suitePolicy='sell';const chosen=birthdayOptions(s,v).suite!;const rate=v.rate;execute(s,{type:'birthday-choice',id:v.id,value:'suite'});assert.equal(v.roomId,chosen.id);assert.equal(r.status,'dirty');assert.equal(v.rate,rate);assert.equal(chosen.guestId,v.id);assert.equal(v.movement!.destination,chosen.id);assert.equal(s.metrics.cash,cash-280);assert.ok(suite);
});
test('公区遗留选择可进入客房，入口保留具体房间且菜单归属一致',()=>{
 const s=newGame(),u=focusSelection();u.floor='floor-lobby';u.room='facility-lobby';const html=focusScreen(s,'hotel',u)!;assert.ok(html.includes('focus-room-map'));assert.ok(s.floors.find(f=>f.id===u.floor&&f.role==='guest'));
 u.room=rooms(s).find(r=>r.status==='available')!.id;u.floor=s.entities[u.room].floorId;assert.match(focusScreen(s,'hotel',u)!,/data-assign-room/);
 for(const view of ['hotel-data','development-data'])assert.match(focusScreen(s,view,u)!,/focus-footer/);
 assert.equal(menuFor('room-data'),'hotel');assert.equal(menuFor('events'),'front');assert.equal(menuFor('bookings'),'front');assert.equal(menuFor('report'),'operations');assert.ok(moduleLinks('events').some(([id])=>id==='front'));
});
