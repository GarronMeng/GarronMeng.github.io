import type {Store,PreviewState} from '../state/types';
import {rooms,availableSuites,occupiedRooms,floorForEntity} from '../state/selectors';
import {ROOM_STATUS} from '../content/place';
export function mountShell(root:HTMLElement,store:Store){
 root.innerHTML=`<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>`;
 const dialog=root.querySelector<HTMLDialogElement>('dialog')!,content=root.querySelector<HTMLElement>('#sheet-content')!,eye=root.querySelector<HTMLElement>('#sheet-eye')!;
 let openView='',lastFocus:HTMLElement|null=null;let focusFloor:(id:string)=>void=()=>{};
 const close=()=>{dialog.close();store.select(null);openView='';lastFocus?.focus()};
 const show=(title:string,body:string)=>{eye.textContent=title;content.innerHTML=body;if(!dialog.open){lastFocus=document.activeElement as HTMLElement;dialog.showModal();}};
 const entity=(id:string)=>{
  const s=store.getState(),e=s.entities[id];if(!e)return;
  const floor=floorForEntity(s,id)!;
  if(e.kind==='room'){
   const guest=s.guests.find(g=>g.id===e.guestId);
   show('HYATT PLACE · '+floor.label,`<h2>${e.number}<span>${e.type==='suite'?'开放式套房':e.type==='twin'?'双床客房':'大床客房'}</span></h2><div class="status-chip status-${e.status}">${ROOM_STATUS[e.status]}</div><dl><div><dt>住客</dt><dd>${guest?guest.name+' · '+guest.tier:'暂无在住客人'}</dd></div><div><dt>剩余住宿</dt><dd>${e.nightsLeft?e.nightsLeft+' 晚':'—'}</dd></div><div><dt>楼层</dt><dd>${floor.label} · ${floor.name}</dd></div></dl>${guest?'<blockquote>“'+guest.thought+'”</blockquote>':''}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${floor.id}">回到 ${e.number} 的楼层</button>`);
  }else{
   const meanings={lobby:'前台、等候区与行李车共同构成入住动线。',breakfast:'自助餐台、咖啡区与餐桌分别安排在真实空间中。',club:'吧台与休息区相连，住客能在酒廊中活动。',gym:'跑步机、单车、瑜伽区和毛巾架组成健身空间。',rooftop:'露台、遮阳伞、植物和座椅形成屋顶花园。'};
   show('HYATT PLACE · '+floor.label,`<h2>${e.name}</h2><p>${meanings[e.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${e.usage} / ${e.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${e.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${e.quality} / ${e.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${floor.id}">回到${e.name}</button>`);
  }
 };
 const views:Record<string,()=>void>={
  front:()=>{show('FRONT OFFICE','<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>');},
  hotel:()=>{const s=store.getState();show('YOUR HOTEL','<h2>一栋活着的酒店</h2><div class="floor-list">'+[...s.floors].reverse().map(f=>`<button data-return="${f.id}"><b>${f.label}</b><span>${f.name}</span><small>${f.entityIds.length>1?f.entityIds.length+' 间客房':'公共空间'}</small><i>›</i></button>`).join('')+'</div>');},
  operations:()=>show('OPERATIONS','<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),
  tasks:()=>{const s=store.getState();show('TODAY','<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[['facility-lobby','去大堂看看','前台与住客动线'],['room-301','打开 301 房间','房型、房态与住宿信息'],['facility-gym','逛逛健身房','公区与人物']].map(([id,name,sub])=>`<button data-focus="${id}"><b>${s.visited.includes(id)?'✓':'○'}</b><span>${name}<small>${sub}</small></span><i>›</i></button>`).join('')+'</div>');},
  log:()=>{const s=store.getState();show('HOTEL JOURNAL','<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(s.visited.length?[...s.visited].reverse().map(id=>{const e=s.entities[id];return `<button data-focus="${id}"><span>${e.kind==='room'?e.number+' 房间':e.name}</span><small>已查看 ›</small></button>`}).join(''):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>');}
 };
 root.addEventListener('click',e=>{const b=(e.target as HTMLElement).closest<HTMLElement>('button');if(!b)return;
  if(b.matches('.close-sheet'))close();
  if(b.dataset.open){store.select(null);openView=b.dataset.open;views[openView]?.();}
  if(b.dataset.speed)store.setSpeed(Number(b.dataset.speed) as 1|2|4);
  if(b.dataset.return){const id=b.dataset.return;close();store.focusFloor(id);focusFloor(id);}
  if(b.dataset.focus){const id=b.dataset.focus,f=floorForEntity(store.getState(),id);close();if(f){store.focusFloor(f.id);focusFloor(f.id);}store.select(id);}
  if(b.dataset.floor){store.focusFloor(b.dataset.floor);focusFloor(b.dataset.floor);}
  if(b.dataset.atmosphere){store.setAtmosphere(b.dataset.atmosphere as PreviewState['atmosphere']);close();}
  if(b.matches('.weather')){const modes=['dusk','night','day'] as const;store.setAtmosphere(modes[(modes.indexOf(store.getState().atmosphere)+1)%3]);}
 });
 dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 root.querySelector('.floor-rail')!.innerHTML=[...store.getState().floors].reverse().map(f=>`<button data-floor="${f.id}" aria-label="前往${f.label} ${f.name}">${f.label}</button>`).join('');
 let previous:string|null=null;
 const update=(s:Readonly<PreviewState>)=>{
  root.querySelector('#cash')!.textContent='¥'+s.metrics.cash.toLocaleString('en-US');root.querySelector('#reputation')!.textContent=String(s.metrics.reputation);root.querySelector('#owner')!.textContent=String(s.metrics.owner);
  root.querySelector('#suite-count')!.textContent=availableSuites(s)+' 间';root.querySelector('#occupancy')!.textContent=`${rooms(s).length} 间客房 · ${occupiedRooms(s)} 间在住`;
  root.querySelector('#task-count')!.textContent=['facility-lobby','room-301','facility-gym'].filter(id=>s.visited.includes(id)).length+'/3';
  root.querySelectorAll<HTMLElement>('[data-speed]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.speed)===s.speed);b.setAttribute('aria-pressed',String(Number(b.dataset.speed)===s.speed));});
  root.querySelector('.weather span')!.textContent={day:'白昼',dusk:'日落',night:'夜晚'}[s.atmosphere];
  root.querySelector('.clock')!.textContent={day:'09:20',dusk:'18:40',night:'21:30'}[s.atmosphere];
  root.querySelectorAll<HTMLElement>('[data-floor]').forEach(b=>b.classList.toggle('active',b.dataset.floor===s.focusedFloorId));
  if(s.selectedId&&s.selectedId!==previous){openView='entity';entity(s.selectedId);}previous=s.selectedId;
 };
 store.subscribe(update);update(store.getState());
 return {stage:root.querySelector<HTMLElement>('.world-stage')!,setFocusHandler:(fn:(id:string)=>void)=>{focusFloor=fn;},showError:(message:string)=>{show('画面未能载入','<h2>请重新载入酒店</h2><p>'+message+'</p><button class="primary" id="reload">重新载入</button>');content.querySelector('#reload')!.addEventListener('click',()=>location.reload());}};
}
