import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {openingGoal,featureLock,viewLock} from '../src/core/onboarding';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {loadGame,SAVE_KEY} from '../src/core/save';
function opening(){const s=newGame();execute(s,{type:'brief-start'});const v=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:v.id,roomId:r.id});advanceGame(s,120);return s;}
test('开业逐步完成真实行动，失败和重复点击不推进或重复花钱',()=>{
 const s=newGame(),g=s.game!;assert.equal(openingGoal(s)!.index,0);const cash=s.metrics.cash;execute(s,{type:'hire',id:'house'});execute(s,{type:'invest',id:'facility-gym'});assert.equal(s.metrics.cash,cash);assert.equal(g.managers.house,0);assert.equal(g.onboarding!.step,0);
 execute(s,{type:'brief-start'});assert.equal(openingGoal(s)!.index,1);execute(s,{type:'checkin',id:'missing',roomId:'room-101'});assert.equal(g.onboarding!.step,1);
 const v=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:v.id,roomId:r.id});assert.equal(g.onboarding!.step,2);assert.ok(featureLock(s,'stock'));
 advanceGame(s,120);assert.equal(g.onboarding!.step,3);assert.equal(featureLock(s,'stock'),null);execute(s,{type:'stock',id:'club'});assert.equal(g.onboarding!.step,3);execute(s,{type:'stock',id:'breakfast'});assert.equal(g.onboarding!.step,4);
 execute(s,{type:'hire',id:'front'});assert.equal(g.managers.front,0);execute(s,{type:'hire',id:'house'});assert.equal(openingGoal(s),null);assert.equal(featureLock(s,'strategy'),null);const after=s.metrics.cash;execute(s,{type:'hire',id:'house'});assert.equal(s.metrics.cash,after);assert.ok(featureLock(s,'upgrade'));
});
test('主线认证控制装修、活动与扩建解锁，而不是仅隐藏按钮',()=>{
 const s=opening(),g=s.game!;execute(s,{type:'stock',id:'breakfast'});execute(s,{type:'hire',id:'house'});assert.ok(viewLock(s,'development'));const cash=s.metrics.cash;execute(s,{type:'expand'});assert.equal(s.metrics.cash,cash);
 g.campaign!.chapter=2;g.campaign!.result={chapter:2,passed:true,score:90,day:1,minute:500,advice:'通过',target:'tasks',scenes:[]};execute(s,{type:'continue-chapter'});assert.equal(featureLock(s,'upgrade'),null);assert.ok(featureLock(s,'activity'));execute(s,{type:'invest',id:'facility-gym'});assert.ok(s.entities['facility-gym'].construction);
 g.campaign!.result={chapter:3,passed:true,score:90,day:1,minute:500,advice:'通过',target:'tasks',scenes:[]};execute(s,{type:'continue-chapter'});assert.equal(featureLock(s,'activity'),null);assert.equal(featureLock(s,'expansion'),null);
});
test('新存档保存带教进度，旧存档保留已有能力与现金',()=>{
 const s=opening(),raw=JSON.stringify(s);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>key===SAVE_KEY?raw:null}});assert.equal(loadGame().game!.onboarding!.step,3);
 delete s.game!.onboarding;const old=JSON.stringify(s);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>old}});const restored=loadGame();assert.equal(restored.metrics.cash,s.metrics.cash);assert.equal(featureLock(restored,'expansion'),null);assert.equal(openingGoal(restored),null);delete (globalThis as {localStorage?:unknown}).localStorage;
});
test('初次晨会无并列策略，checklist只有一个突出目标和明确下一项解锁',()=>{
 const s=newGame();const brief=focusScreen(s,'brief',focusSelection())!,tasks=focusScreen(s,'tasks',focusSelection())!;assert.ok(!brief.includes('data-action="day-plan"'));assert.match(brief,/开始今天/);assert.equal((tasks.match(/checklist-row current/g)??[]).length,1);assert.match(tasks,/完成后解锁/);assert.ok(!tasks.includes('预约检验'));
});
