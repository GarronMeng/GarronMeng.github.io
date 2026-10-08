import {MENU,menuFor,moduleLinks,PAGE_TITLES,ManagementNavigation} from './navigation';
import {campaignGoal} from '../core/campaign';
import {focusScreen} from './focusScreens';
import {secondaryScreen} from './secondaryScreens';
import {menuIcon} from './designSystem';
import {scores} from '../core/progression';
import {esc,money,btn} from './screenKit';
import type {Store,Command} from '../state/types';
import {rooms,availableSuites,occupiedRooms} from '../state/selectors';
import {queue,weekday,clock} from '../core/game';
import './gameplay.css';
import './managementHub.css';
import './hotelDesign.css';
import './focusScreens.css';
import './managementShell.css';
export function mountGameplay(root:HTMLElement,store:Store){
 const nav=new ManagementNavigation(),$=(q:string)=>root.querySelector<HTMLElement>(q)!;
 const dialog=root.querySelector<HTMLDialogElement>('dialog')!,content=$('#sheet-content'),eye=$('#sheet-eye');let focusFloor:(id:string)=>void=()=>{},previousFocus:HTMLElement|null=null;
 const top=$('.sheet-top'),back=document.createElement('button');back.className='sheet-back';back.textContent='‹';back.dataset.menuBack='true';back.setAttribute('aria-label','返回上一页');top.prepend(back);
 const moduleNav=document.createElement('nav');moduleNav.className='module-tabs';moduleNav.setAttribute('aria-label','当前部门功能');content.before(moduleNav);
 const feedback=document.createElement('p');feedback.className='action-feedback';feedback.setAttribute('role','status');feedback.hidden=true;content.before(feedback);
 const fixedActions=document.createElement('div');fixedActions.className='fixed-actions';content.after(fixedActions);
 const menuNav=document.createElement('nav');menuNav.className='sheet-navigation';menuNav.setAttribute('aria-label','切换管理部门');fixedActions.after(menuNav);
 const rewardToast=document.createElement('div');rewardToast.className='reward-toast';rewardToast.setAttribute('role','status');root.append(rewardToast);let lastReward=store.getState().game?.rewardBeat?.id;
 const tabs=()=>MENU.map(([id,label])=>`<button data-open="${id}" data-root-menu="true" aria-label="${label}" aria-pressed="${dialog.open&&menuFor(nav.current.view)===id}">${menuIcon(id)}<span>${label}</span></button>`).join('');
 const updateNav=()=>{$('.main-nav').innerHTML=tabs();menuNav.innerHTML=`<div class="menu-tabs">${tabs()}</div>`;};
 const checkpoint=()=>{nav.current.scroll=content.scrollTop;};
 const render=()=>{
  const {view,selection}=nav.current,s=store.getState();
  eye.textContent=MENU.find(([id])=>id===menuFor(view))?.[1]+' / '+(PAGE_TITLES[view]??'酒店经营');back.hidden=!nav.canBack;
  moduleNav.innerHTML=moduleLinks(view).map(([id,label])=>`<button data-open="${id}" aria-current="${view===id?'page':'false'}">${label}</button>`).join('');
  content.innerHTML=focusScreen(s,view,selection)??secondaryScreen(s,view,selection);
  fixedActions.replaceChildren();const footer=content.querySelector('.focus-footer');if(footer)fixedActions.append(footer);
  dialog.classList.add('focus-layout','management-shell');dialog.dataset.view=view;
  // Main action is always in the same place; navigational links retain a secondary style.
  const primary=fixedActions.querySelector<HTMLButtonElement>('[data-action]:not([disabled])');(primary??fixedActions.querySelector('button'))?.classList.add('decision-primary');
  if(!dialog.open){previousFocus=document.activeElement as HTMLElement;dialog.showModal();}
  content.scrollTop=nav.current.scroll;dialog.scrollTop=0;updateNav();
 };
 const navigate=(view:string,rootMenu=false)=>{checkpoint();nav.visit(view,rootMenu);feedback.hidden=true;render();};
 const openEntity=(id:string)=>{const s=store.getState(),e=s.entities[id];if(!e)return;checkpoint();nav.visit(e.kind==='room'?'hotel':'development');const u=nav.current.selection;nav.current.selected=id;if(e.kind==='room'){u.room=id;u.floor=e.floorId;}else u.facility=id;feedback.hidden=true;render();};
 const notify=()=>{feedback.textContent=store.getState().game!.notice;feedback.hidden=!feedback.textContent;};
 const close=()=>{checkpoint();nav.clear();dialog.close();feedback.hidden=true;const g=store.getState().game!;if(g.evening?.open)store.dispatch({type:'evening-close'});if(g.operations?.briefOpen)store.dispatch({type:'brief-start'});store.select(null);updateNav();if(previousFocus?.isConnected)previousFocus.focus();};
 const dismiss=()=>{if(store.getState().game!.reportOpen&&nav.current.view==='report'){store.dispatch({type:'continue'});navigate('brief',true);return;}close();};
 $('.preview-badge').outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>';$('.world-caption').textContent='轻点空间 · 查看问题与决定';$('.property-name small').id='game-time';$('.today-hint').setAttribute('data-open','tasks');$('.event-strip').removeAttribute('data-focus');$('.event-strip').setAttribute('data-open','events');$('.speed-control').insertAdjacentHTML('beforeend',btn('Ⅱ','pause'));
 let backdropDown=false;const outside=(x:number,y:number)=>{const r=dialog.getBoundingClientRect();return x<r.left||x>r.right||y<r.top||y>r.bottom;};
 dialog.addEventListener('pointerdown',e=>{backdropDown=e.target===dialog&&outside(e.clientX,e.clientY);});dialog.addEventListener('click',e=>{if(backdropDown&&e.target===dialog&&outside(e.clientX,e.clientY))dismiss();backdropDown=false;});dialog.addEventListener('cancel',e=>{e.preventDefault();dismiss();});
 root.addEventListener('click',ev=>{
  const b=(ev.target as Element).closest<HTMLButtonElement>('button');if(!b||b.disabled)return;
  if(b.matches('.close-sheet')){dismiss();return;}
  if(b.dataset.menuBack){checkpoint();nav.back();feedback.hidden=true;render();return;}
  const u=nav.current.selection;
  if(b.dataset.focusKey){const key=b.dataset.focusKey,value=b.dataset.focusValue??'';if(!(key in u)&&!['room','floor','department','facility','guest','event','profile'].includes(key))return;
   (u as unknown as Record<string,unknown>)[key]=key.endsWith('Page')?Math.max(0,Number(value)||0):value;
   if(key==='floor')u.room=undefined;if(key==='guestPage'){u.guest=undefined;u.roomPage=0;}if(key==='eventPage')u.event=undefined;if(key==='profilePage')u.profile=undefined;if(key==='archiveTab')u.logPage=0;
   nav.current.scroll=0;feedback.hidden=true;render();return;
  }
  if(b.dataset.open){checkpoint();const sourceRoom=nav.current.selection.room;nav.visit(b.dataset.open,!!b.dataset.rootMenu);if(b.dataset.open==='room-data'&&sourceRoom)nav.current.selection.room=sourceRoom;const next=nav.current.selection;
   if(b.dataset.assignRoom){next.room=b.dataset.assignRoom;next.roomPage=0;}
   if(b.dataset.guest){next.guest=b.dataset.guest;next.event=b.dataset.guest;next.roomPage=0;}
   if(b.dataset.profile){next.profile=b.dataset.profile;next.logPage=0;}
   feedback.hidden=true;render();return;
  }
  if(b.dataset.entity){openEntity(b.dataset.entity);focusFloor(store.getState().entities[b.dataset.entity].floorId);return;}
  if(b.dataset.floor){close();store.focusFloor(b.dataset.floor);focusFloor(b.dataset.floor);return;}
  if(b.dataset.speed){store.setSpeed(Number(b.dataset.speed) as 1|2|4);return;}
  if(b.matches('.weather')){const modes=['dusk','night','day'] as const;store.setAtmosphere(modes[(modes.indexOf(store.getState().atmosphere)+1)%3]);return;}
  const type=b.dataset.action;if(!type)return;
  if(type==='reset'){document.dispatchEvent(new Event('new-game'));return;}
  if(type==='export'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(store.getState())],{type:'application/json'}));a.download='jinwan-v8-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);return;}
  const c:Command={type:type as Command['type'],id:b.dataset.id,value:b.dataset.value};if(type==='checkin')c.roomId=b.dataset.room;
  if(type==='price')c.value=b.dataset.value||Number(root.querySelector<HTMLInputElement>('#price-input')?.value);
  checkpoint();store.dispatch(c);
  if(type==='brief-start'||type==='evening-close'){close();return;}
  if(type==='continue'){navigate('brief',true);return;}
  if(type==='checkin'){const v=store.getState().guests.find(v=>v.id===c.id);if(v?.roomId&&(v.challenge&&!v.challenge.resolved||v.occasion&&!v.occasion.resolved)){nav.visit('events');nav.current.selection.event=v.id;}}
  if(dialog.open){render();notify();}
 });
 let lastSelection:string|null=null,lastFloors='',lastNotice='',lastReportDay=0,lastBriefDay=0,lastEveningDay=0,lastGoalState='';
 const update=()=>{
  const s=store.getState(),g=s.game!;
  $('.score-button').innerHTML=`<i style="--score:${scores(s).total}%"></i> ${scores(s).total} 分 ›`;$('#cash').textContent=money(s.metrics.cash);$('#reputation').textContent=String(s.metrics.reputation);$('#owner').textContent=String(s.metrics.owner);$('#suite-count').textContent=availableSuites(s)+' 间';$('#game-time').textContent=`${weekday(g.day)} · Day ${g.day} ${clock(g.minute)}${g.paused?' · 暂停':''}`;$('#occupancy').textContent=`${occupiedRooms(s)}/${rooms(s).length} 在住 · 收入 ${money(g.revenue)}`;
  const goal=campaignGoal(s),campaign=g.campaign;$('.today-hint').setAttribute('data-open','tasks');$('.today-hint span:nth-child(2)').textContent=goal?(campaign?.result?(campaign.result.passed?'检验通过 · 开启下一阶段':'检验待改善 · 免费重约'):campaign?.inspection?(campaign.inspection.phase==='visiting'?'现场体验中 · 等待回访':goal.exam+' · 已预约'):goal.ready?'目标达成 · 预约'+goal.exam:goal.action):'主线完成 · 自由经营';$('#task-count').textContent=goal?goal.progress+'/'+goal.goal:'5 / 5';
  const goalState=JSON.stringify([campaign?.chapter,goal?.progress,campaign?.result,campaign?.inspection?.phase,campaign?.inspection?.prepared]);if(dialog.open&&nav.current.view==='tasks'&&lastGoalState!==goalState)render();lastGoalState=goalState;
  if(g.rewardBeat&&g.rewardBeat.id!==lastReward){lastReward=g.rewardBeat.id;rewardToast.textContent='＋'+money(g.rewardBeat.amount)+' · '+g.rewardBeat.text;rewardToast.classList.remove('show');void rewardToast.offsetWidth;rewardToast.classList.add('show');}
  const pending=g.events.length||s.guests.some(v=>!v.departing&&v.roomId&&(v.late==='pending'||v.challenge&&!v.challenge.resolved||v.occasion&&!v.occasion.resolved));$('.event-strip span').textContent=s.guests.some(v=>v.occasion&&!v.occasion.resolved&&!v.departing&&v.roomId)?'住客今天过生日 · 礼遇待决定':pending?'现场有服务诉求待处理':queue(s).length?`${queue(s).length} 位住客等待入住`:'酒店运营平稳';$('.event-strip b').textContent=pending?'处理 ›':'前台 ›';$('.event-strip').setAttribute('data-open',pending?'events':'front');$('.review-strip span').textContent=g.reportOpen?'今日已结算 · 查看日结并开始下一天':g.notice;$('.review-strip').setAttribute('data-open',g.reportOpen?'report':'log');$('.weather span').textContent=g.weather==='rain'?'有雨':'晴朗';
  root.querySelectorAll<HTMLElement>('[data-speed]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.speed)===s.speed);b.setAttribute('aria-pressed',String(Number(b.dataset.speed)===s.speed));});
  const floorKey=s.floors.map(f=>f.id).join(',');if(lastFloors!==floorKey){lastFloors=floorKey;$('.floor-rail').innerHTML=[...s.floors].reverse().map(f=>`<button data-floor="${f.id}" aria-label="前往${f.label} ${f.name}">${f.label}</button>`).join('');}
  if(s.selectedId&&s.selectedId!==lastSelection)openEntity(s.selectedId);lastSelection=s.selectedId;
  if(g.operations?.briefOpen&&lastBriefDay!==g.day){lastBriefDay=g.day;navigate('brief',true);nav.current.selection.meeting='overview';render();}
  if(g.evening?.open&&lastEveningDay!==g.evening.day){lastEveningDay=g.evening.day;navigate('evening',true);}
  if(g.reportOpen&&lastReportDay!==g.day){lastReportDay=g.day;navigate('report',true);}
  if(lastNotice!==g.notice){lastNotice=g.notice;}updateNav();
 };store.subscribe(update);update();
 return {stage:$('.world-stage'),setFocusHandler:(fn:(id:string)=>void)=>{focusFloor=fn;},showError:(message:string)=>{content.innerHTML=`<section class="focus-screen"><h2>画面暂时不可用</h2><div class="focus-main"><p>${esc(message)}</p></div></section>`;fixedActions.innerHTML='';dialog.showModal();}};
}
