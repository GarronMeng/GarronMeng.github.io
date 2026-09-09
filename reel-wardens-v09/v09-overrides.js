/* v0.9 Slotbound Replica Systems
   [ORIGINAL structure] Shop, Items vs Cores, reel manipulation, formation, Judgement/Boss milestones.
   [INFERRED tuning] prices, percentages, inventory cadence and elite multipliers are approximations where public demo math is not documented. */

ETYPE.boss.name='Beholder';

const RW09_ITEMS=[
  {id:'hold_reel',name:'Reel Clamp',tag:'ITEM · REEL',price:10,desc:'选择一列；下一次 Spin 保留这一列。',kind:'hold'},
  {id:'nudge',name:'Nudge Token',tag:'ITEM · REEL',price:9,desc:'下一次 Spin 若自然空转，修正为至少一条匹配线。',kind:'nudge'},
  {id:'blank_refund',name:'Refund Chip',tag:'ITEM · ECON',price:8,desc:'下一次空转返还本次 Spin 的全部消耗。',kind:'refund'},
  {id:'field_shield',name:'Barrier Flask',tag:'ITEM · DEF',price:9,desc:'下一场战斗开始时，全队获得 25% 最大生命护盾。',kind:'shield'},
  {id:'repair',name:'Repair Kit',tag:'ITEM · DEF',price:7,desc:'立即修复基地 5 HP。',kind:'repair'},
  {id:'warrior_bias',name:'Warrior Sigil',tag:'ITEM · REEL',price:9,desc:'接下来 2 次 Spin 显著提高 Warrior 权重。',kind:'bias',classId:'guard'},
  {id:'mage_bias',name:'Mage Sigil',tag:'ITEM · REEL',price:9,desc:'接下来 2 次 Spin 显著提高 Mage 权重。',kind:'bias',classId:'mage'},
  {id:'archer_bias',name:'Archer Sigil',tag:'ITEM · REEL',price:9,desc:'接下来 2 次 Spin 显著提高 Archer 权重。',kind:'bias',classId:'ranger'}
];
const RW09_CORES=[
  {id:'core_warrior',name:'Warrior Weight',tag:'CORE · REEL',desc:'Warrior symbol 权重持续提高。'},
  {id:'core_mage',name:'Mage Weight',tag:'CORE · REEL',desc:'Mage symbol 权重持续提高。'},
  {id:'core_archer',name:'Archer Weight',tag:'CORE · REEL',desc:'Archer symbol 权重持续提高。'},
  {id:'core_blank',name:'Blank Insurance',tag:'CORE · ECON',desc:'每次空转返还 2 Supply。'},
  {id:'core_focus',name:'Resonant Memory',tag:'CORE · REEL',desc:'上一次命中的职业，在下一次 Spin 获得额外权重。'},
  {id:'core_diagonal',name:'Diagonal Echo',tag:'CORE · LINE',desc:'斜线命中额外召唤 1 个同职业单位。'}
];

function rw09EnsureState(){
  if(!Array.isArray(st.items))st.items=[];
  if(!Array.isArray(st.cores))st.cores=[];
  if(st.rw09FormationPick===undefined)st.rw09FormationPick=null;
  if(st.rw09HoldChoosing===undefined)st.rw09HoldChoosing=false;
  if(st.rw09PendingHoldIndex===undefined)st.rw09PendingHoldIndex=null;
  if(st.rw09HoldCol===undefined)st.rw09HoldCol=null;
  if(st.rw09NudgeNext===undefined)st.rw09NudgeNext=false;
  if(st.rw09RefundNext===undefined)st.rw09RefundNext=false;
  if(st.rw09ShieldNext===undefined)st.rw09ShieldNext=false;
  if(st.rw09Bias===undefined)st.rw09Bias=null;
  if(st.rw09LastHit===undefined)st.rw09LastHit=null;
  if(st.rw09ShopWave!==st.wave||!Array.isArray(st.shop)){rw09RollShop(false)}
  if(!st.rw09Init){st.rw09Init=true;st.board=Array.from({length:9},()=>weightedKey())}
}
function rw09Core(id){return (st.cores||[]).some(x=>x.id===id)}
own=function(id){return rw09Core(id)||(st.rewards||[]).some(x=>x.id===id)};

function rw09RollShop(charge=false){
  if(charge){if(st.phase!=='prep'||st.gold<3)return false;st.gold-=3}
  const pool=[...RW09_ITEMS].sort(()=>Math.random()-.5).slice(0,3);
  st.shop=pool.map((x,i)=>({...x,shopId:`${st.wave}-${Date.now()}-${i}`}));st.rw09ShopWave=st.wave;return true
}
function rw09Buy(shopId){
  rw09EnsureState();if(st.phase!=='prep')return;const i=st.shop.findIndex(x=>x.shopId===shopId);if(i<0)return;const item=st.shop[i];if(st.gold<item.price){st.toast='Supply 不足，无法购买。';render();return}st.gold-=item.price;st.items.push({...item,invId:`i${Date.now()}${Math.random()}`});st.shop.splice(i,1);st.toast=`购入 Item「${item.name}」`;render()
}
function rw09UseItem(invId){
  rw09EnsureState();if(st.phase!=='prep')return;const i=st.items.findIndex(x=>x.invId===invId);if(i<0)return;const item=st.items[i];
  if(item.kind==='hold'){st.rw09HoldChoosing=true;st.rw09PendingHoldIndex=i;render();return}
  if(item.kind==='nudge'){st.rw09NudgeNext=true;st.toast='Nudge Token 已准备：下一次空转将被修正。'}
  if(item.kind==='refund'){st.rw09RefundNext=true;st.toast='Refund Chip 已准备。'}
  if(item.kind==='shield'){st.rw09ShieldNext=true;st.toast='Barrier Flask 已准备：下一战全队获得护盾。'}
  if(item.kind==='repair'){const before=st.base;st.base=Math.min(24,st.base+5);st.toast=`基地修复 +${st.base-before} HP。`}
  if(item.kind==='bias'){st.rw09Bias={classId:item.classId,spins:2};st.toast=`${TYPES[item.classId].name} 权重提高：持续 2 次 Spin。`}
  st.items.splice(i,1);render()
}
function rw09ChooseHold(col){
  if(!st.rw09HoldChoosing)return;const i=st.rw09PendingHoldIndex;if(i!=null&&st.items[i])st.items.splice(i,1);st.rw09HoldChoosing=false;st.rw09PendingHoldIndex=null;st.rw09HoldCol=Number(col);st.toast=`已锁定第 ${Number(col)+1} 列：下一次 Spin 保留该列。`;render()
}
function rw09CancelHold(){st.rw09HoldChoosing=false;st.rw09PendingHoldIndex=null;render()}

weightedKey=function(){
  rw09EnsureState?.();
  const weights={guard:38,ranger:32,mage:30};
  if(rw09Core('core_warrior'))weights.guard+=16;
  if(rw09Core('core_archer'))weights.ranger+=16;
  if(rw09Core('core_mage'))weights.mage+=16;
  if(rw09Core('core_focus')&&st.rw09LastHit&&weights[st.rw09LastHit]!=null)weights[st.rw09LastHit]+=10;
  if(st.rw09Bias?.spins>0&&weights[st.rw09Bias.classId]!=null)weights[st.rw09Bias.classId]+=24;
  const keys=['guard','ranger','mage'],total=keys.reduce((n,k)=>n+weights[k],0);let r=Math.random()*total;for(const k of keys){r-=weights[k];if(r<=0)return k}return'guard'
};
makeBoard=function(force){
  let a=Array.from({length:9},()=>weightedKey());let should=!!force;
  if(st.rw09NudgeNext){const natural=analyze(a);if(!natural.lines.length)should=true;st.rw09NudgeNext=false}
  if(should){const l=pick(LINES),k=weightedKey();l.cells.forEach(i=>a[i]=k)}return a
};

spin=function(){
  rw09EnsureState();if(st.phase!=='prep'||st.gold<st.spinCost||st.spinning)return;st.spinning=true;st.anticipating=false;const cost=st.spinCost,held=st.rw09HoldCol,oldBoard=st.board.slice();st.rw09HoldCol=null;st.gold-=cost;st.spinCount++;st.spinCost=5+st.spinCount*3;const force=st.calArmed;st.calArmed=false;if(force)st.cal--;st.lines=[];st.hitCells=[];st.jack=false;
  const cols=[0,1,2],rolling=cols.filter(c=>c!==held),final=makeBoard(force);if(held!=null)for(let r=0;r<3;r++)final[r*3+held]=oldBoard[r*3+held];const tension=anticipationScore(final);
  for(let c=0;c<3;c++)for(let r=0;r<3;r++)st.board[r*3+c]=(c===held?oldBoard[r*3+c]:weightedKey());render();updateReels(rolling);const machine=$('.lever');if(machine)machine.classList.add('pulled');let frames=0;
  const interval=setInterval(()=>{frames++;for(const c of rolling)for(let r=0;r<3;r++)st.board[r*3+c]=weightedKey();updateReels(rolling);if(frames>=5){clearInterval(interval);const temp=st.board.slice(),base=tension?[390,610,1120+(tension>1?180:0)]:[390,590,790];let stopped=0;rolling.forEach((c,idx)=>{const delay=base[Math.min(idx,2)];timers.spin.push(setTimeout(()=>{for(let r=0;r<3;r++)temp[r*3+c]=final[r*3+c];st.board=temp.slice();stopped++;const remain=rolling.slice(stopped);updateReels(remain);if(stopped===Math.max(1,rolling.length-1)&&tension&&remain.length===1)setAnticipation(true,tension);if(stopped===rolling.length){setAnticipation(false);timers.spin=[];resolveSpin(cost);const lever=$('.lever');if(lever)lever.classList.remove('pulled')}},delay))})}},70)
};
resolveSpin=function(cost){
  rw09EnsureState();st.spinning=false;const res=analyze(st.board);st.lines=res.lines;st.hitCells=res.cells;
  if(!res.lines.length){st.blankStreak++;let refund=rw09Core('core_blank')?2:0;if(st.rw09RefundNext){refund+=cost;st.rw09RefundNext=false}st.gold+=refund;st.toast=refund?`空转 · 返还 ${refund} Supply。`:`空转，消耗 ${cost} Supply。`}
  else{st.blankStreak=0;st.rw09RefundNext=false;for(const l of res.lines){recruit(l.key);if(rw09Core('core_diagonal')&&(l.name==='主斜'||l.name==='副斜'))recruit(l.key)}st.rw09LastHit=res.lines[0].key;st.jack=res.lines.length>=2;if(res.lines.length>=3){recruitLegendary();st.toast=`PRISM JACKPOT！${res.lines.length} 条线同时命中。`}else st.toast=res.lines.length>=2?`JACKPOT！同时命中 ${res.lines.length} 条线。`:`${res.lines[0].name} · ${TYPES[res.lines[0].key].name} 招募成功。`}
  if(st.rw09Bias?.spins>0){st.rw09Bias.spins--;if(st.rw09Bias.spins<=0)st.rw09Bias=null}
  render();if(res.lines.length)animateWinLines();if(st.jack){jackpotBurst(res.lines.length);setTimeout(()=>{st.jack=false;render()},1250)}
};

function rw09FormationSlot(i){
  rw09EnsureState();if(st.phase!=='prep'||i>=st.units.length)return;if(st.rw09FormationPick==null){st.rw09FormationPick=i;st.toast=`已选择阵位 ${i+1}，再点另一个单位交换位置。`;render();return}if(st.rw09FormationPick===i){st.rw09FormationPick=null;render();return}const from=st.rw09FormationPick,tmp=st.units[from];st.units[from]=st.units[i];st.units[i]=tmp;st.rw09FormationPick=null;st.toast='阵型已调整。前排优先承伤，Boss 会威胁后排。';render()
}
targetAlly=function(){if(!st.battle)return null;const xs=alive(st.battle.allies).sort((a,b)=>a.idx-b.idx);if(!xs.length)return null;const front=xs.filter(x=>x.idx<2),pool=front.length?front:xs;return pool.find(x=>x.type==='guard')||pool[0]};
const __rw09EnemyAct=enemyAct;
enemyAct=function(e){
  if(e.type==='boss'&&st.battle){const xs=alive(st.battle.allies).sort((a,b)=>b.idx-a.idx),t=xs[0];if(!t)return;const n=Math.round(e.atk*1.18),d=dmg(t,n);st.battle.msg=`Beholder 锁定后排 → ${t.name} ${d}`;fx(e,t,'enemyMagic',d,false);if(rw08HasImprint?.(t,'thorns'))dmg(e,Math.max(1,Math.round(d*.14)));return}
  __rw09EnemyAct(e)
};
const __rw09MkEnemy=mkEnemy;
mkEnemy=function(k,i){const e=__rw09MkEnemy(k,i);if(st.wave===6){e.elite=true;e.name=`Elite ${e.name}`;e.maxHp=Math.round(e.maxHp*1.22);e.hp=e.maxHp;e.atk=Math.round(e.atk*1.15)}return e};

battle=function(){
  rw09EnsureState();if(st.phase!=='prep')return;if(!st.units.length){st.toast='至少需要 1 名单位。';render();return}st.phase='battle';const label=st.wave===12?'BOSS':st.wave===6?'JUDGEMENT':`WAVE ${st.wave}`;st.battle={allies:st.units.map(mkAlly),enemies:enemyPool(st.wave).map(mkEnemy),msg:`${label} 开始`};if(st.rw09ShieldNext){for(const a of st.battle.allies)a.shield+=Math.round(a.maxHp*.25);st.rw09ShieldNext=false}render();timers.battle=setInterval(tick,230)
};

function rw09OpenReward(){
  rw09EnsureState();const corePool=RW09_CORES.filter(c=>!rw09Core(c.id));const core=corePool.length?pick(corePool):pick(RW09_CORES);const item={...pick(RW09_ITEMS),invId:`i${Date.now()}r`};st.rw09RewardChoices=[{kind:'core',data:core},{kind:'item',data:item},{kind:'gold',data:{id:'gold',name:'+14 Supply',tag:'RESOURCE',desc:'直接获得 14 Supply。'}}];st.screen='rw09Reward';render()
}
function rw09ChooseReward(kind,id){
  if(kind==='core'){const c=RW09_CORES.find(x=>x.id===id);if(c&&!rw09Core(c.id))st.cores.push({...c});st.toast=`Core「${c?.name||id}」已进入 Loadout。`}
  if(kind==='item'){const d=RW09_ITEMS.find(x=>x.id===id);if(d)st.items.push({...d,invId:`i${Date.now()}${Math.random()}`});st.toast=`获得 Item「${d?.name||id}」。`}
  if(kind==='gold'){st.gold+=14;st.toast='获得 14 Supply。'}st.screen='game';render()
}
openReward=rw09OpenReward;
checkEnd=function(){
  const b=st.battle;if(alive(b.enemies).length&&alive(b.allies).length)return false;clearInterval(timers.battle);timers.battle=null;
  if(!alive(b.enemies).length){const g=10+st.wave*2;st.gold+=g;st.score+=120+st.wave*42+alive(b.allies).length*15;const doneWave=st.wave;if(st.wave>=MAX_WAVE){st.high=Math.max(st.high,st.score);saveHigh();st.screen='over';st.runDone=true;st.phase='over';render();return true}st.wave++;st.phase='prep';st.battle=null;st.spinCount=0;st.spinCost=5;st.lines=[];st.hitCells=[];rw09RollShop(false);st.toast=`第 ${doneWave} 波胜利，+${g} Supply。`;if(doneWave%3===0){rw09OpenReward();return true}render()}
  else{const rem=alive(b.enemies).length,loss=Math.min(9,Math.max(2,rem*2+(st.wave>=10?2:0)));st.base=Math.max(0,st.base-loss);if(st.base<=0){st.high=Math.max(st.high,st.score);saveHigh();st.screen='over';st.runDone=true;st.phase='over';render();return true}const done=st.wave;st.wave++;st.phase='prep';st.battle=null;st.spinCount=0;st.spinCost=5;st.lines=[];st.hitCells=[];rw09RollShop(false);st.toast=`第 ${done} 波失守，基地 -${loss}。`;render()}return true
};

function rw09RenderFormation(){rw09EnsureState();const rows=['FRONT','MID','BACK'];let html='';for(let r=0;r<3;r++){html+=`<div class="formation-row"><span>${rows[r]}</span>`;for(let c=0;c<2;c++){const i=r*2+c,u=st.units[i],pick=st.rw09FormationPick===i;html+=`<button class="form-slot ${u?'filled':''} ${pick?'picked':''}" data-action="rw09-slot" data-index="${i}" ${u?'':'disabled'}>${u?`<b>${u.name}</b><small>${u.type==='guard'?'TANK':u.type==='mage'?'MAGIC':'RANGED'}</small>`:'EMPTY'}</button>`}html+='</div>'}return`<section class="section formation-section"><div class="section-head"><b>FORMATION</b><span>点两个单位交换位置</span></div><div class="formation-grid">${html}</div></section>`}
function rw09RenderShop(){rw09EnsureState();return`<section class="section shop-section"><div class="section-head"><b>SHOP</b><button class="shop-reroll" data-action="rw09-reroll" ${st.phase!=='prep'||st.gold<3?'disabled':''}>刷新 · 3</button></div><div class="shop-grid">${st.shop.length?st.shop.map(x=>`<button class="shop-card" data-action="rw09-buy" data-id="${x.shopId}" ${st.phase!=='prep'||st.gold<x.price?'disabled':''}><span>${x.tag}</span><b>${x.name}</b><p>${x.desc}</p><em>${x.price} Supply</em></button>`).join(''):'<div class="shop-empty">本波商店已购空</div>'}</div></section>`}
function rw09RenderLoadout(){rw09EnsureState();const manipulation=[st.rw09HoldCol!=null?`HOLD C${st.rw09HoldCol+1}`:'',st.rw09NudgeNext?'NUDGE':'',st.rw09RefundNext?'REFUND':'',st.rw09Bias?`${TYPES[st.rw09Bias.classId].name} ×${st.rw09Bias.spins}`:''].filter(Boolean);return`<section class="section loadout-section"><div class="section-head"><b>ITEMS</b><span>${manipulation.join(' · ')||'即时/消耗'}</span></div><div class="item-row">${st.items.length?st.items.map(x=>`<button class="item-chip" data-action="rw09-item" data-id="${x.invId}" ${st.phase!=='prep'?'disabled':''}><b>${x.name}</b><span>USE</span></button>`).join(''):'<div class="loadout-empty">暂无 Item</div>'}</div><div class="section-head core-head"><b>CORES</b><span>整局持续 · RNG / synergy</span></div><div class="corebar">${st.cores.length?st.cores.map(c=>`<div class="core"><b>${c.name}</b><span>${c.desc}</span></div>`).join(''):'<div class="core empty">Milestone reward 中获取 Core</div>'}</div></section>`}
renderCores=function(){return rw09RenderFormation()+rw09RenderShop()+rw09RenderLoadout()};

const __rw09RenderMachine=renderMachine;
renderMachine=function(){rw09EnsureState();let h=__rw09RenderMachine();const chips=[st.rw09HoldCol!=null?`HOLD ${st.rw09HoldCol+1}`:'',st.rw09NudgeNext?'NUDGE READY':'',st.rw09Bias?`${TYPES[st.rw09Bias.classId].name} BIAS ×${st.rw09Bias.spins}`:''].filter(Boolean);if(chips.length)h=h.replace('<div class="machine-actions">',`<div class="rw09-manip">${chips.map(x=>`<span>${x}</span>`).join('')}</div><div class="machine-actions">`);return h};
const __rw09RenderStage=renderStage;
renderStage=function(){let h=__rw09RenderStage();if(st.wave===12)h=h.replace(/JUDGEMENT 12/g,'BOSS 12');return h};
function rw09RenderRewardOverlay(){if(st.screen!=='rw09Reward')return'';return`<div class="overlay"><div class="sheet"><div class="eyebrow">MILESTONE REWARD</div><h1>Item / Core / Supply</h1><p>原版式分层：Item 解决眼前问题，Core 决定整局策略。</p><div class="choices">${st.rw09RewardChoices.map(x=>`<button class="choice" data-action="rw09-reward" data-kind="${x.kind}" data-id="${x.data.id}"><span class="tag">${x.data.tag}</span><h3>${x.data.name}</h3><p>${x.data.desc}</p><div class="bonus">选择</div></button>`).join('')}</div></div></div>`}
function rw09RenderHoldOverlay(){if(!st.rw09HoldChoosing)return'';return`<div class="overlay hold-overlay"><div class="sheet"><div class="eyebrow">REEL HOLD</div><h1>锁定一列</h1><p>下一次 Spin 这一列完全保留，其余两列继续转动。</p><div class="hold-cols">${[0,1,2].map(c=>`<button data-action="rw09-hold" data-col="${c}">第 ${c+1} 列</button>`).join('')}</div><button class="btn utility hold-cancel" data-action="rw09-hold-cancel">取消</button></div></div>`}

const __rw09RenderGame=renderGame;
renderGame=function(){return __rw09RenderGame().replace('v0.8 REPLICA','v0.9 REPLICA SYSTEMS')};
renderMenu=function(){const demo=['guard','ranger','mage','guard','mage','ranger','mage','guard','ranger'];return`<div class="menu"><section class="menu-card"><div class="menu-hero"><div class="moon"></div><div class="menu-title"><div class="eyebrow">SLOTBOUND REPLICA PASS</div><h1>命运<span>守线</span></h1><p>Spin 招募 Warrior / Mage / Archer → Random Stats 与 Imprint → Absorb 进化 → Shop / Items / Cores 操纵 RNG → 调整阵型 → 自动迎战 Judgement 与 Boss。</p></div><div class="menu-machine"><div class="menu-reels">${demo.map(k=>`<div>${sigil(k)}</div>`).join('')}</div></div></div><div class="menu-copy"><div class="menu-features"><div class="feature"><b>Random Stats + Imprints</b><p>同职业单位也有不同个体价值。</p></div><div class="feature"><b>Absorb + Evolve</b><p>Warrior → Paladin → Veil；Mage → Necro Lord。</p></div><div class="feature"><b>Shop / Items / Cores</b><p>短期操纵与整局 Core loadout 分离。</p></div><div class="feature"><b>Formation / Milestones</b><p>前后排决定承伤；Judgement 与 Beholder Boss 有机制差异。</p></div></div><button class="big-cta" data-action="start">开始这一局</button><div class="version">v0.9 Replica Systems · ORIGINAL structure / INFERRED tuning</div></div></section></div>`};

const __rw09Bind=bind;
bind=function(){__rw09Bind();$$('[data-action="rw09-buy"]').forEach(el=>el.addEventListener('click',()=>rw09Buy(el.dataset.id)));$$('[data-action="rw09-reroll"]').forEach(el=>el.addEventListener('click',()=>{if(rw09RollShop(true)){st.toast='Shop 已刷新。';render()}}));$$('[data-action="rw09-item"]').forEach(el=>el.addEventListener('click',()=>rw09UseItem(el.dataset.id)));$$('[data-action="rw09-hold"]').forEach(el=>el.addEventListener('click',()=>rw09ChooseHold(el.dataset.col)));$$('[data-action="rw09-hold-cancel"]').forEach(el=>el.addEventListener('click',rw09CancelHold));$$('[data-action="rw09-slot"]').forEach(el=>el.addEventListener('click',()=>rw09FormationSlot(Number(el.dataset.index))));$$('[data-action="rw09-reward"]').forEach(el=>el.addEventListener('click',()=>rw09ChooseReward(el.dataset.kind,el.dataset.id)))};
render=function(){const app=$('#app');rw09EnsureState();if(st.screen==='menu'){app.innerHTML=renderMenu();bind();return}app.innerHTML=renderGame()+(st.screen==='rw09Reward'?rw09RenderRewardOverlay():'')+(st.screen==='over'?renderOver():'')+renderAbsorbOverlay()+rw09RenderHoldOverlay();bind()};

rw09EnsureState();render();
