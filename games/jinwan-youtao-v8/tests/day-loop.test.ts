import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame} from '../src/core/game';
import {nextDecision,reviewDayPlan} from '../src/core/dayLoop';
import {captureEvening} from '../src/core/evening';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {spaceIllustration} from '../src/ui/designSystem';
test('晨会方向真实调整报价与库存，不改锁定订单，预采购不能反复刷',()=>{
 const s=newGame(),g=s.game!,booked=g.operations!.bookings.map(b=>b.rate),stock=g.stock,club=g.clubStock,cash=s.metrics.cash;
 execute(s,{type:'day-plan',value:'experience'});assert.equal(g.price,720);assert.equal(g.operations!.suitePolicy,'hold');assert.equal(g.stock,stock+20);assert.equal(g.clubStock,club+20);assert.equal(s.metrics.cash,cash-240);
 execute(s,{type:'day-plan',value:'margin'});assert.equal(g.price,850);assert.equal(g.operations!.suitePolicy,'sell');execute(s,{type:'day-plan',value:'experience'});assert.equal(s.metrics.cash,cash-240);assert.equal(g.stock,stock+20);assert.deepEqual(g.operations!.bookings.map(b=>b.rate),booked);
 execute(s,{type:'brief-start'});const chosen=g.plan!.focus;execute(s,{type:'day-plan',value:'margin'});assert.equal(g.plan!.focus,chosen);
});
test('经营方向到点检验，20点预估与午夜最终结果分别保存，次日重新做判断',()=>{
 const s=newGame(),g=s.game!;execute(s,{type:'day-plan',value:'margin'});execute(s,{type:'brief-start'});g.minute=1200;captureEvening(s);assert.equal(g.evening!.plan!.phase,'evening');assert.match(focusScreen(s,'evening',focusSelection())!,/20:00 阶段检验/);
 execute(s,{type:'evening-close'});g.minute=1439;advanceGame(s,1);assert.equal(g.reports.at(-1)!.plan!.phase,'settled');assert.equal(g.plan!.review!.actual,g.revenue-g.expense);assert.equal(g.evening!.plan!.phase,'evening');
 execute(s,{type:'continue'});assert.equal(g.plan!.day,2);assert.equal(g.plan!.prepared,false);assert.equal(g.plan!.review,undefined);
});
test('体验目标需要真实住客，当前建议与酒店问题匹配，空间卡片有房型和等级差异',()=>{
 const s=newGame();execute(s,{type:'day-plan',value:'experience'});s.guests=s.guests.filter(v=>v.staff);const review=reviewDayPlan(s,5000,'evening');assert.equal(review.success,false);
 assert.equal(nextDecision(s).target,'brief');execute(s,{type:'brief-start'});s.game!.events=[{id:999,kind:'repair',title:'设备故障',target:'room-201',expires:9999}];assert.equal(nextDecision(s).target,'events');
 assert.notEqual(spaceIllustration('hotel',1),spaceIllustration('hotel',5));assert.notEqual(spaceIllustration('hotel',1,'king'),spaceIllustration('hotel',1,'twin'));assert.notEqual(spaceIllustration('gym'),spaceIllustration('spa'));
});
