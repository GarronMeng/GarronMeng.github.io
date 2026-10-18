import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {gameInvariants} from '../src/core/invariants';
import {travel} from '../src/core/guestMovement';
import {tickGuest} from '../src/core/guestAI';
import type {PreviewState} from '../src/state/types';

function valid(s:PreviewState,where:string){
 assert.deepEqual(gameInvariants(s),[],where);
}
function playable(){const s=newGame({guided:false});execute(s,{type:'brief-start'});return s;}

test('经营指令重复点击不可重复扣费或重复领取；全部动作保持账目一致',()=>{
 const s=playable(),g=s.game!;valid(s,'new game');
 const r=rooms(s).find(r=>r.status==='available')!;r.status='dirty';
 const cash=s.metrics.cash,expense=g.expense;
 execute(s,{type:'clean',id:r.id});
 execute(s,{type:'clean',id:r.id});
 assert.equal(s.metrics.cash,cash-90);
 assert.equal(g.expense,expense+90);
 const guest=queue(s)[0],free=rooms(s).find(r=>r.status==='available')!;
 execute(s,{type:'checkin',id:guest.id,roomId:free.id});
 const checked=g.arrivals,rate=guest.rate,after=s.metrics.cash;
 execute(s,{type:'checkin',id:guest.id,roomId:free.id});
 assert.equal(s.metrics.cash,after);
 assert.equal(guest.rate,rate);
 assert.ok(guest.roomId);
 assert.equal(g.arrivals,checked);
 const milestone=g.development!;
 milestone.counts.arrivals=20;
 const beforeCash=s.metrics.cash,beforeRevenue=g.revenue;
 execute(s,{type:'claim-career',id:'arrivals-20'});
 execute(s,{type:'claim-career',id:'arrivals-20'});
 assert.equal(s.metrics.cash-beforeCash,2000);
 assert.equal(g.revenue-beforeRevenue,2000);
 valid(s,'after repeated commands');
});

test('不足整份餐饮不可伪装成功：三人份缺货等待，补足后一次扣减',()=>{
 const s=playable(),g=s.game!,guest=s.guests.find(v=>!v.staff&&v.roomId)!;
 guest.persona='family';guest.birthdayBreakfast=2;g.stock=0;
 assert.ok(travel(s,guest,'facility-breakfast'));
 const effects={income:()=>{},reputation:()=>{},log:()=>{},progress:()=>{}};
 for(let i=0;i<300&&!guest.waitingFor;i++)tickGuest(s,guest,()=>.5,effects);
 assert.equal(guest.waitingFor,'facility-breakfast');
 assert.equal(guest.experience?.kind,'shortage');
 assert.equal(guest.birthdayBreakfast,2);
 assert.equal(g.stock,0);
 // Two prepaid birthday breakfasts + one ordinary serving = full family service.
 g.stock=1;
 for(let i=0;i<50&&guest.waitingFor;i++)tickGuest(s,guest,()=>.5,effects);
 assert.equal(guest.waitingFor,undefined);
 assert.equal(guest.experience?.kind,'served');
 assert.equal(g.stock,0);
 assert.equal(guest.birthdayBreakfast,0);
 valid(s,'after breakfast');
});

test('晨会、20点复盘、午夜日结、下一日开业均只能推进一次，跨日房客状态一致',()=>{
 const s=playable(),g=s.game!;
 g.nextArrival=9999;g.nextEvent=9999;
 valid(s,'day 1 open');
 for(let day=1;day<=2;day++){
  while(!g.reportOpen){
   advanceGame(s,20);
   if(g.evening?.day===g.day&&g.evening.open)execute(s,{type:'evening-close'});
   valid(s,'day '+day+' '+g.minute);
   assert.ok(g.minute<=1440);
  }
  assert.equal(g.day,day);
  assert.equal(g.minute,1440);
  assert.equal(g.reports.filter(r=>r.day===day).length,1);
  const snapshot=JSON.stringify([g.reports,s.metrics.cash,g.revenue,g.expense]);
  advanceGame(s,40);
  assert.equal(JSON.stringify([g.reports,s.metrics.cash,g.revenue,g.expense]),snapshot);
  execute(s,{type:'continue'});
  assert.equal(g.day,day+1);
  assert.equal(g.operations!.day,day+1);
  assert.equal(g.operations!.briefOpen,true);
  execute(s,{type:'continue'});
  assert.equal(g.day,day+1);
  execute(s,{type:'brief-start'});
  assert.equal(g.operations!.briefOpen,false);
  g.nextArrival=9999;g.nextEvent=9999;
  valid(s,'after next day');
 }
});

test('日结时的现金变化与收入减成本一致，重复结算不重复入账',()=>{
 const s=playable(),g=s.game!;
 g.nextArrival=g.nextEvent=9999;
 g.minute=1199;
 advanceGame(s,1);
 assert.equal(g.evening?.open,true);
 execute(s,{type:'evening-close'});
 g.minute=1439;
 const cashBefore=s.metrics.cash,revenueBefore=g.revenue,expenseBefore=g.expense;
 advanceGame(s,1);
 assert.equal(g.reportOpen,true);
 const revenueIncrease=g.revenue-revenueBefore,expenseIncrease=g.expense-expenseBefore;
 assert.equal(s.metrics.cash-cashBefore,revenueIncrease-expenseIncrease);
 const report=g.reports.at(-1)!;
 assert.equal(report.revenue,g.revenue);
 assert.equal(report.expense,g.expense);
 const reportCount=g.reports.length;
 advanceGame(s,100);
 assert.equal(g.reports.length,reportCount);
 valid(s,'settled day');
});
