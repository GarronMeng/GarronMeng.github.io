import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame,queue} from '../src/core/game';
import {rooms} from '../src/state/selectors';
import {openingGoal,featureLock,viewLock,STEP,OPENING,patienceProtected} from '../src/core/onboarding';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {loadGame,SAVE_KEY} from '../src/core/save';
function opening(){const s=newGame();execute(s,{type:'brief-start'});const v=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:v.id,roomId:r.id});advanceGame(s,120);return s;}
function toDay(s:ReturnType<typeof newGame>,day:number){const g=s.game!;while(g.day<day){advanceGame(s,60);if(g.evening?.open)execute(s,{type:'evening-close'});if(g.reportOpen){execute(s,{type:'continue'});execute(s,{type:'brief-start'});}}}
test('Day 1 逐步完成真实行动，失败和重复点击不推进或重复花钱',()=>{
 const s=newGame(),g=s.game!;assert.equal(openingGoal(s)!.index,0);const cash=s.metrics.cash;execute(s,{type:'hire',id:'house'});execute(s,{type:'invest',id:'facility-gym'});assert.equal(s.metrics.cash,cash);assert.equal(g.managers.house,0);assert.equal(g.onboarding!.step,0);
 execute(s,{type:'brief-start'});assert.equal(openingGoal(s)!.index,STEP.checkin);execute(s,{type:'checkin',id:'missing',roomId:'room-101'});assert.equal(g.onboarding!.step,STEP.checkin);
 const v=queue(s)[0],r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:v.id,roomId:r.id});assert.equal(g.onboarding!.step,STEP.turnover);assert.ok(featureLock(s,'stock'));
 advanceGame(s,120);assert.equal(g.onboarding!.step,STEP.evening);assert.ok(featureLock(s,'stock'),'备货属于 Day 2 的一课');
 g.minute=1199;advanceGame(s,2);assert.equal(g.onboarding!.step,STEP.stock);assert.equal(openingGoal(s)!.waiting,true,'Day 2 课程要等到第二天');
 execute(s,{type:'evening-close'});advanceGame(s,300);execute(s,{type:'continue'});assert.equal(openingGoal(s)!.waiting,false);assert.equal(featureLock(s,'stock'),null);
 execute(s,{type:'brief-start'});execute(s,{type:'stock',id:'club'});assert.equal(g.onboarding!.step,STEP.stock);execute(s,{type:'stock',id:'breakfast'});assert.equal(g.onboarding!.step,STEP.late);
});
test('带教期间首位客人不会流失，完成首次入住后恢复正常耐心',()=>{
 const s=newGame();execute(s,{type:'brief-start'});const v=queue(s)[0],p=v.patience!;assert.ok(patienceProtected(s));advanceGame(s,200);assert.ok(queue(s).some(x=>x.id===v.id));assert.equal(v.patience,p);
 const r=rooms(s).find(r=>r.status==='available')!;execute(s,{type:'checkin',id:v.id,roomId:r.id});assert.equal(patienceProtected(s),false);
});
test('Day 2 必定出现一次会员晚退并打开对应决策卡，Day 3 由抉择收尾',()=>{
 const s=newGame(),g=s.game!;execute(s,{type:'brief-start'});execute(s,{type:'checkin',id:queue(s)[0].id,roomId:rooms(s).find(r=>r.status==='available')!.id});
 toDay(s,2);execute(s,{type:'stock',id:'breakfast'});assert.equal(g.onboarding!.step,STEP.late);
 g.minute=Math.max(g.minute,539);advanceGame(s,1);for(let i=0;i<30&&!s.guests.some(v=>v.late==='pending');i++)advanceGame(s,1);const v=s.guests.find(v=>v.late==='pending'&&v.roomId)!;assert.ok(v);assert.equal(g.spotlight?.key,v.id+'-late');
 execute(s,{type:'late',id:v.id,value:'honor'});assert.equal(g.onboarding!.step,STEP.hire);assert.equal(featureLock(s,'team'),null);assert.ok(featureLock(s,'strategy'));
 s.metrics.cash+=10000;execute(s,{type:'hire',id:'house'});assert.equal(g.onboarding!.step,STEP.strategy);assert.equal(openingGoal(s)!.waiting,true);
 toDay(s,3);assert.equal(featureLock(s,'strategy'),null);execute(s,{type:'price',value:720});assert.equal(g.onboarding!.step,STEP.dilemma);
 for(let i=0;i<900&&!g.dilemmas!.length;i++)advanceGame(s,1);const d=g.dilemmas![0];assert.ok(d,'Day 3 必定生成一个可练习的抉择');assert.equal(d.teach,true);assert.equal(g.spotlight?.key,'dilemma-'+d.id);
 execute(s,{type:'dilemma',id:String(d.id),value:'decline'});assert.equal(g.onboarding!.step,STEP.handover);assert.ok(g.decisions!.some(r=>r.kind==='overbook'));
});
test('主线认证控制装修、活动与扩建解锁，而不是仅隐藏按钮',()=>{
 const s=opening(),g=s.game!;g.onboarding!.step=OPENING.length;assert.ok(viewLock(s,'development'));const cash=s.metrics.cash;execute(s,{type:'expand'});assert.equal(s.metrics.cash,cash);
 g.campaign!.chapter=2;g.campaign!.result={chapter:2,passed:true,score:90,day:1,minute:500,advice:'通过',target:'tasks',scenes:[]};execute(s,{type:'continue-chapter'});assert.equal(featureLock(s,'upgrade'),null);assert.ok(featureLock(s,'activity'));execute(s,{type:'invest',id:'facility-gym'});assert.ok(s.entities['facility-gym'].construction);
 g.campaign!.result={chapter:3,passed:true,score:90,day:1,minute:500,advice:'通过',target:'tasks',scenes:[]};execute(s,{type:'continue-chapter'});assert.equal(featureLock(s,'activity'),null);assert.equal(featureLock(s,'expansion'),null);
});
test('新存档保存带教进度，旧存档与旧版五步带教平滑迁移',()=>{
 const s=opening(),raw=JSON.stringify(s);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>key===SAVE_KEY?raw:null}});assert.equal(loadGame().game!.onboarding!.step,STEP.evening);
 const v1=structuredClone(s);v1.game!.onboarding={step:3,legacy:false,baseline:{}};const r1=JSON.stringify(v1);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>r1}});assert.equal(loadGame().game!.onboarding!.step,STEP.stock);
 delete s.game!.onboarding;const old=JSON.stringify(s);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>old}});const restored=loadGame();assert.equal(restored.metrics.cash,s.metrics.cash);assert.equal(featureLock(restored,'expansion'),null);assert.equal(openingGoal(restored),null);delete (globalThis as {localStorage?:unknown}).localStorage;
});
test('初次晨会无并列策略，checklist 按天分组且只有一个当前目标',()=>{
 const s=newGame();const brief=focusScreen(s,'brief',focusSelection())!,tasks=focusScreen(s,'tasks',focusSelection())!;assert.ok(!brief.includes('data-action="day-plan"'));assert.match(brief,/开始营业/);assert.equal((tasks.match(/checklist-row current/g)??[]).length,1);assert.match(tasks,/完成后解锁/);assert.match(tasks,/Day 2/);assert.ok(!tasks.includes('预约检验'));
});
