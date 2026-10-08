import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,execute,advanceGame} from '../src/core/game';
import {track} from '../src/core/progression';
import {campaignGoal,tickCampaign,CHAPTERS} from '../src/core/campaign';
import {tickConstruction} from '../src/core/construction';
import {rooms} from '../src/state/selectors';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {loadGame,SAVE_KEY} from '../src/core/save';

test('分段奖金和尾款总和保持原上限，重载与重复领取不增发',()=>{
 const s=newGame();s.game!.tasks=[{id:'arrivals',title:'入住',goal:3,progress:0,reward:601,claimed:false,target:'front'}];const cash=s.metrics.cash,revenue=s.game!.revenue;
 track(s,'arrivals');assert.equal(s.metrics.cash-cash,140);assert.equal(s.game!.rewardBeat!.amount,140);
 const raw=JSON.stringify(s);Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(key:string)=>key===SAVE_KEY?raw:null}});
 const restored=loadGame();delete (globalThis as {localStorage?:unknown}).localStorage;
 track(restored,'arrivals');track(restored,'arrivals');assert.equal(restored.game!.tasks[0].paid,420);execute(restored,{type:'claim',id:'arrivals'});assert.equal(restored.metrics.cash-cash,601);assert.equal(restored.game!.revenue-revenue,601);
 execute(restored,{type:'claim',id:'arrivals'});track(restored,'arrivals');assert.equal(restored.metrics.cash-cash,601);
});

test('单一目标跨天保留，检验延后到次日且不能刷预约和准备',()=>{
 const s=newGame(),g=s.game!,c=g.campaign!;execute(s,{type:'book-inspection'});assert.equal(c.inspection,undefined);
 track(s,'arrivals',3);assert.equal(campaignGoal(s)!.ready,true);execute(s,{type:'book-inspection'});const exam={...c.inspection!};assert.equal(exam.due,2*1440+1080);
 execute(s,{type:'book-inspection'});assert.deepEqual(c.inspection,exam);const cash=s.metrics.cash;execute(s,{type:'prepare-inspection'});execute(s,{type:'prepare-inspection'});assert.equal(s.metrics.cash,cash-300);
 execute(s,{type:'continue-chapter'});assert.equal(c.chapter,0);tickCampaign(s);assert.equal(c.result,undefined);
 g.day=2;g.minute=1079;g.paused=false;g.operations!.briefOpen=false;g.nextArrival=g.nextEvent=9999;advanceGame(s,1);assert.equal(c.inspection!.phase,'visiting');assert.equal(c.result,undefined);
 g.minute=1109;tickCampaign(s);assert.equal(c.result,undefined);g.minute=1110;tickCampaign(s);assert.ok(c.result);assert.equal(c.inspection,undefined);
 assert.match(focusScreen(s,'tasks',focusSelection())!,/Room Check/);
});

test('失败后保留进度免费重约，改善现场可通过，保存不会重新抽结果',()=>{
 const s=newGame(),g=s.game!,c=g.campaign!;track(s,'arrivals',3);execute(s,{type:'book-inspection'});g.stock=g.clubStock=0;for(const r of rooms(s))r.status='dirty';for(const v of s.guests)v.satisfaction=0;
 g.day=2;g.minute=1110;tickCampaign(s);assert.equal(c.result!.passed,false);assert.equal(campaignGoal(s)!.progress,3);assert.equal(c.chapter,0);
 const cash=s.metrics.cash;execute(s,{type:'book-inspection'});assert.equal(s.metrics.cash,cash);assert.equal(c.inspection!.due,3*1440+1080);
 for(const r of rooms(s))r.status='available';for(const v of s.guests)v.satisfaction=100;g.stock=g.clubStock=100;g.events=[];for(const v of s.guests){v.challenge=undefined;v.late=undefined;}
 const clone=structuredClone(s);g.day=clone.game!.day=3;g.minute=clone.game!.minute=1110;tickCampaign(s);tickCampaign(clone);assert.deepEqual(c.result,clone.game!.campaign!.result);assert.equal(c.result!.passed,true);
 execute(s,{type:'book-inspection'});assert.equal(c.inspection,undefined);execute(s,{type:'continue-chapter'});assert.equal(c.chapter,1);assert.equal(c.certificates.length,1);assert.equal(campaignGoal(s)!.progress,0);execute(s,{type:'continue-chapter'});assert.equal(c.chapter,1);
});

test('升级主线等待竣工，主目标界面隐藏并列支线，最高等级存档仍可推进',()=>{
 const s=newGame(),g=s.game!,c=g.campaign!;c.chapter=3;c.baseline={...g.development!.counts};s.metrics.cash=10000;
 execute(s,{type:'invest',id:'facility-gym'});assert.equal(campaignGoal(s)!.ready,false);for(let i=0;i<120;i++)tickConstruction(s);assert.equal(campaignGoal(s)!.ready,true);
 const html=focusScreen(s,'tasks',focusSelection())!;assert.match(html,/预约检验/);assert.ok(!html.includes('接待住客'));assert.ok(!html.includes('<details'));assert.ok(html.includes('focus-footer'));
 c.baseline={...g.development!.counts};for(const e of Object.values(s.entities))if(e.kind==='room'||e.kind==='facility')e.level=5;assert.equal(campaignGoal(s)!.ready,true);assert.equal(CHAPTERS.length,5);
});
