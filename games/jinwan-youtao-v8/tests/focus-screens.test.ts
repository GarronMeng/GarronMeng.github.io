import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,queue} from '../src/core/game';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {rooms} from '../src/state/selectors';
test('主界面无折叠列表，决定都在独立固定操作区',()=>{
 const s=newGame();for(const view of ['hub','hotel','front','events','operations','development','brief','evening','report','tasks']){const html=focusScreen(s,view,focusSelection())!;assert.ok(html,view);assert.ok(html.includes('class="focus-footer"'),view);assert.ok(!html.includes('<details'),view);assert.ok(!html.includes('<select'),view);}
});
test('诉求逐件处理，成功后原位显示下一项且失败不会跳过',()=>{
 const s=newGame(),u=focusSelection(),v=s.guests.find(v=>v.roomId)!;v.challenge={kind:'family',resolved:false};u.event=v.id;s.game!.stock=20;s.metrics.cash=0;
 assert.match(focusScreen(s,'events',u)!,/早餐和加床/);execute(s,{type:'guest-choice',id:v.id,value:'family'});assert.equal(v.challenge.resolved,false);assert.match(focusScreen(s,'events',u)!,/早餐和加床/);
 s.metrics.cash=1000;execute(s,{type:'guest-choice',id:v.id,value:'family'});assert.equal(v.challenge.resolved,true);assert.ok(!focusScreen(s,'events',u)!.includes('data-action="guest-choice" data-id="'+v.id+'"'));
});
test('房间默认选择可用于明细，房卡点击继续使用原有入住命令',()=>{
 const s=newGame(),u=focusSelection();focusScreen(s,'hotel',u);assert.ok(s.entities[u.room!]);const guest=queue(s)[0],html=focusScreen(s,'front',u)!,room=html.match(/data-room="([^"]+)"/)?.[1];assert.ok(room);execute(s,{type:'checkin',id:guest.id,roomId:room});assert.equal(guest.roomId,room);assert.ok(!focusScreen(s,'front',u)!.includes('data-id="'+guest.id+'"'));u.floor=rooms(s).at(-1)!.floorId;u.room=undefined;focusScreen(s,'hotel',u);assert.equal(s.entities[u.room!].floorId,u.floor);
});
