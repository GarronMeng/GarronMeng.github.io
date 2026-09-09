/* v0.10 Current Demo Fidelity Pass
   [CONFIRMED] Cavalry reel class, one Nudge per wave, 5 initial field slots with later expansion,
   unit levels through absorption, Advanced units (Sorcerer example), unit lock, >8 Cores possible,
   first-spin blank free reroll Core, Jester/Joker reel effect, Golden Relic rarity-up behavior.
   [INFERRED] exact odds, gold values, slot-unlock wave, advanced-unit tables outside Sorcerer, Prism threshold. */

TYPES.guard.name='Warrior';
TYPES.ranger.name='Archer';
TYPES.mage.name='Mage';
TYPES.cavalry={name:'Cavalry',color:'#d89b58',atk:15,hp:31,spd:1.18,crit:.11,imprints:['Charge','Momentum','Vanguard']};
TYPES.jester={name:'Jester',color:'#f0d06f',atk:0,hp:0,spd:0,crit:0,imprints:['Wildcard']};
const RW10_REEL_KEYS=['guard','cavalry','ranger','mage'];
const RW10_ADVANCED={
  mage:{name:'Sorcerer',atk:1.22,hp:1.08,spd:1.08,crit:.04},
  guard:{name:'Veteran Warrior',atk:1.12,hp:1.20,spd:1.02,crit:.01},
  ranger:{name:'Veteran Archer',atk:1.18,hp:1.06,spd:1.10,crit:.04},
  cavalry:{name:'Heavy Cavalry',atk:1.17,hp:1.16,spd:1.05,crit:.02}
};
RW08_IMPRINTS.cavalry=[
  {id:'charge',name:'Charge',desc:'首次接敌伤害提高',transfer:'full'},
  {id:'momentum',name:'Momentum',desc:'连续攻击逐步提速',transfer:'partial'},
  {id:'vanguardRide',name:'Vanguard',desc:'前排承伤能力提高',transfer:'partial'}
];

const __rw10Sigil=sigil;
sigil=function(k){
  if(k==='cavalry')return`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="${TYPES.cavalry.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 16c1-6 3-9 7-9l3-3 1 4c2 1 3 3 3 5v4h-3l-1-3H9l-1 3H5v-1zM9 10l4 1M7 17v3M16 17v3"/></svg>`;
  if(k==='jester')return`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="${TYPES.jester.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7c3 0 4-4 4-4s2 4 4 4 4-4 4-4 1 4 4 4l-2 9H6L4 7zM7 19h10M8 11h.01M16 11h.01"/></svg>`;
  return __rw10Sigil(k)
};

function rw10Ensure(){
  rw09Ensure();
  if(st.nudge==null)st.nudge=1;
  if(st.rw10AdvancedChance==null)st.rw10AdvancedChance=.065;
  if(st.rw10RetryUsedWave==null)st.rw10RetryUsedWave=0;
  if(st.rw10GoldenCell===undefined)st.rw10GoldenCell=null;
  if(st.rw10GoldScaled!==true){if(st.screen==='menu'&&st.gold<=40)st.gold=260;st.rw10GoldScaled=true}
  for(const u of st.units||[])rw10EnsureUnit(u);
}
function rw10EnsureUnit(u){rw08EnsureUnit(u);if(u.level==null)u.level=Math.max(1,1+(u.evoProgress||0));if(u.locked==null)u.locked=false;if(u.advanced==null)u.advanced=false;return u}
function rw10FieldCap(){return st.wave>=6?6:5}
function rw10SpinCostFor(count){return 24+Math.max(0,count)*10}

const __rw10Fresh=fresh;
fresh=function(){const s=__rw10Fresh();s.gold=260;s.spinCount=0;s.spinCost=24;s.cal=1;s.nudge=1;s.rw10AdvancedChance=.065;s.rw10RetryUsedWave=0;s.rw10GoldScaled=true;s.board=Array.from({length:9},()=>weightedKey());return s};
if(st.screen==='menu'){st.gold=260;st.spinCount=0;st.spinCost=24;st.cal=1;st.nudge=1;st.board=Array.from({length:9},()=>weightedKey())}

RW09_CORES.unshift(
  {id:'first_spin_retry',kind:'core',name:'Second Chance',desc:'每波第一次 Spin 若完全空振，立即免费重投一次。',price:16,tag:'CORE · REEL'},
  {id:'jester_hat',kind:'core',name:'Jester Hat',desc:'每次 Spin 有一个符号变为 Joker，可代替任意职业组成 Payline。',price:18,tag:'CORE · JOKER'},
  {id:'golden_relic',kind:'core',name:'Golden Relic',desc:'生成 Golden symbol；含 Golden symbol 的胜线使召唤单位 Rarity +1。',price:22,tag:'CORE · LEGENDARY'}
);
RW09_ITEMS.unshift({id:'first_guard',kind:'item',name:'Guardian Charm',desc:'下一战第一个被攻击的单位短暂无敌（约 7 秒）。',price:11,tag:'ITEM · DEF'});
for(const x of RW09_ITEMS)if(!x.rw10Scaled){x.price=Math.round((x.price||8)*8);x.rw10Scaled=true}
for(const x of RW09_CORES)if(!x.rw10Scaled){x.price=Math.round((x.price||16)*7);x.rw10Scaled=true}

rw09Buy=function(offerId){rw10Ensure();if(st.phase!=='prep')return;const o=st.shopOffers.find(x=>x.offerId===offerId&&!x.sold);if(!o)return;const cost=rw09Price(o);if(st.gold<cost){st.toast='Gold 不足。';render();return}st.gold-=cost;if(o.kind==='core'){if(!rw09Core(o.id))st.cores.push({...o});o.sold=true;st.toast=`获得 Core「${o.name}」。`}else{st.items.push({...o,instanceId:`i${Date.now()}${Math.random().toString(36).slice(2,5)}`});o.sold=true;st.toast=`购买 Item「${o.name}」。`}render()};
rw09RerollShop=function(free=false){rw10Ensure();if(st.phase!=='prep')return;const cost=free?0:20+st.shopRerolls*10;if(st.gold<cost){st.toast='Gold 不足，无法刷新 Shop。';render();return}st.gold-=cost;st.shopRerolls++;rw09GenerateShop(true);st.shopWave=st.wave;st.toast=free?'免费刷新 Shop。':`Shop 刷新 -${cost} Gold。`;render()};

analyze=function(a){const lines=[],cells=new Set();for(const l of LINES){const vals=l.cells.map(i=>a[i]),normal=vals.filter(v=>v!=='jester');let key=null;if(!normal.length)key='guard';else if(normal.every(v=>v===normal[0]))key=normal[0];if(key){lines.push({...l,key});l.cells.forEach(i=>cells.add(i))}}return{lines,cells:[...cells]}};
weightedKey=function(){rw10Ensure?.();const weights={guard:28,cavalry:22,ranger:25,mage:25};if(st?.cores){if(rw09Core('warrior_bias'))weights.guard+=14;if(rw09Core('mage_bias'))weights.mage+=14;if(rw09Core('archer_bias'))weights.ranger+=14;const b=st.itemBuffs?.bias;if(b?.spins>0&&weights[b.type]!=null)weights[b.type]+=30}let total=Object.values(weights).reduce((a,b)=>a+b,0),r=Math.random()*total;for(const k of RW10_REEL_KEYS){r-=weights[k];if(r<=0)return k}return'guard'};
makeBoard=function(force){let a=Array.from({length:9},()=>weightedKey());if(force){const l=pick(LINES),k=weightedKey();l.cells.forEach(i=>a[i]=k)}if(rw09Core('jester_hat')){const i=Math.floor(Math.random()*9);a[i]='jester'}st.rw10GoldenCell=rw09Core('golden_relic')?Math.floor(Math.random()*9):null;return a};

const __rw10CreateUnit=createUnit;
createUnit=function(k){const u=__rw10CreateUnit(k);rw10EnsureUnit(u);u.level=1;if(k!=='prism'&&RW10_ADVANCED[k]&&Math.random()<(st?.rw10AdvancedChance||.065)){const a=RW10_ADVANCED[k];u.advanced=true;u.star=Math.max(2,u.star);u.name=a.name;u.atk=Math.round(u.atk*a.atk);u.hp=Math.round(u.hp*a.hp);u.spd=+(u.spd*a.spd).toFixed(2);u.crit=+(u.crit+a.crit).toFixed(3);u.evoProgress=Math.max(u.evoProgress||0,2);u.level=3}return u};
function rw10PromoteRarity(u){if(!u||u.type==='prism')return;if(!u.advanced){const a=RW10_ADVANCED[u.type];if(a){u.advanced=true;u.star=Math.max(2,u.star);u.name=a.name;u.atk=Math.round(u.atk*a.atk);u.hp=Math.round(u.hp*a.hp);u.spd=+(u.spd*a.spd).toFixed(2);u.crit=+(u.crit+a.crit).toFixed(3);u.level=Math.max(3,u.level||1)}}else{u.star=Math.min(3,(u.star||2)+1);u.atk=Math.round(u.atk*1.16);u.hp=Math.round(u.hp*1.16);u.level=Math.max(5,u.level||1)}}
function rw10AddUnit(k,{rarityUp=false}={}){const u=createUnit(k);if(rarityUp)rw10PromoteRarity(u);if(st.units.length<MAX_UNITS){st.units.push(u);st.toast=`召唤 ${u.name} Lv.${u.level}${u.advanced?' · ADVANCED':''}`;return u}st.toast='Roster 已满。先 Lock 主力并吸收素材后再继续 Spin。';return null}
recruit=function(k){return rw10AddUnit(k)};

const __rw10ApplyAbsorb=rw08ApplyAbsorb;
rw08ApplyAbsorb=function(source,target,preview,opts={}){rw10EnsureUnit(source);rw10EnsureUnit(target);const result=__rw10ApplyAbsorb(source,target,preview,opts);const gain=Math.max(1,Math.round((source.level||1)*.8));target.level=(target.level||1)+gain;return result};
const __rw10SelectUnit=selectUnit;
selectUnit=function(id){const u=st.units.find(x=>x.id===id);if(u?.locked&&!st.selected){st.toast=`${u.name} 已 LOCK，不能作为吸收素材。`;render();return}__rw10SelectUnit(id)};
function rw10ToggleLock(id){if(st.phase!=='prep')return;const u=st.units.find(x=>x.id===id);if(!u)return;u.locked=!u.locked;if(st.selected===id)st.selected=null;st.toast=`${u.name} ${u.locked?'已 LOCK，不会被作为素材':'已解锁'}`;render()}

const __rw10AllyAct=allyAct;
allyAct=function(a){if(a.type!=='cavalry'){__rw10AllyAct(a);return}const t=targetEnemy();if(!t)return;a.rw10Charge=(a.rw10Charge||0)+1;let n=a.atk*(a.rw10Charge===1?1.75:1.08);if(rw08HasImprint?.(a,'charge')&&a.rw10Charge===1)n*=1.22;const crit=chance(Math.min(.8,a.crit||0));if(crit)n*=1.65;const d=dmg(t,n);st.battle.msg=`${a.name} 冲锋 → ${t.name} ${d}${crit?' CRIT':''}`;fx(a,t,'melee',d,false)};

const __rw10MkAlly=mkAlly;
mkAlly=function(u,i){const a=__rw10MkAlly(u,i);rw10EnsureUnit(u);a.level=u.level||1;a.locked=u.locked;a.advanced=u.advanced;if(u.name==='Paladin')a.shield+=Math.round(a.maxHp*.24);if(u.name==='Veil'){a.shield+=Math.round(a.maxHp*.42);a.rw10VeilSave=true}if(u.name==='Necro Lord')a.rw10Necro=true;return a};
const __rw10Dmg=dmg;
dmg=function(t,n){if(t?.rw10InvulnTicks>0)return 0;const before=t?.hp||0;const d=__rw10Dmg(t,n);if(t?.rw10VeilSave&&before>0&&t.hp<=0){t.rw10VeilSave=false;t.dead=false;t.hp=Math.max(1,Math.round(t.maxHp*.18));t.shield+=Math.round(t.maxHp*.28);return Math.max(0,before-t.hp)}return d};

const __rw10UseItem=rw09UseItem;
rw09UseItem=function(instanceId){const it=st.items.find(x=>x.instanceId===instanceId);if(it?.id==='first_guard'){st.rw10GuardNext=true;st.items.splice(st.items.findIndex(x=>x.instanceId===instanceId),1);st.toast='Guardian Charm：下一战首个承伤单位短暂无敌。';render();return}__rw10UseItem(instanceId)};
const __rw10Battle=battle;
battle=function(){rw10Ensure();const was=st.phase;__rw10Battle();if(was==='prep'&&st.phase==='battle'){const cap=rw10FieldCap();if(st.battle?.allies?.length>cap)st.battle.allies=st.battle.allies.slice(0,cap);if(st.rw10GuardNext&&st.battle?.allies?.length){st.battle.allies[0].rw10InvulnTicks=30;st.rw10GuardNext=false;st.battle.msg='Guardian Charm · 前排 7s 无敌'}}};
const __rw10Tick=tick;
tick=function(){if(st.battle)for(const a of st.battle.allies||[])if(a.rw10InvulnTicks>0)a.rw10InvulnTicks--;__rw10Tick()};

arm=function(){rw10Ensure();if(st.phase!=='prep'||st.nudge<=0||st.calArmed)return;st.calArmed=true;st.nudge--;st.toast='NUDGE 已准备：下一次 Spin 保证至少一条有效线。';render()};
spin=function(){rw10Ensure();if(st.phase!=='prep'||st.gold<st.spinCost||st.spinning)return;if(st.units.length>=MAX_UNITS){st.toast='Roster 已满：先吸收/整理单位再 Spin。';render();return}st.spinning=true;st.anticipating=false;const cost=st.spinCost;st.gold-=cost;st.spinCount++;st.spinCost=rw10SpinCostFor(st.spinCount);const force=st.calArmed;st.calArmed=false;st.lines=[];st.hitCells=[];st.jack=false;const final=makeBoard(force),tension=anticipationScore(final);for(let i=0;i<9;i++)st.board[i]=weightedKey();render();const machine=$('.lever');if(machine)machine.classList.add('pulled');let frames=0;const interval=setInterval(()=>{frames++;for(let i=0;i<9;i++)st.board[i]=weightedKey();updateReels([0,1,2]);if(frames>=5){clearInterval(interval);const temp=st.board.slice(),stops=tension?[390,610,1120+(tension>1?180:0)]:[390,590,790];[0,1,2].forEach((c,idx)=>timers.spin.push(setTimeout(()=>{for(let r=0;r<3;r++)temp[r*3+c]=final[r*3+c];st.board=temp.slice();updateReels(idx===0?[1,2]:idx===1?[2]:[]);if(idx===1&&tension)setAnticipation(true,tension);if(idx===2){setAnticipation(false);timers.spin=[];resolveSpin(cost);machine?.classList.remove('pulled')}},stops[idx])))}},70)};
resolveSpin=function(cost){rw10Ensure();st.spinning=false;const res=analyze(st.board);st.lines=res.lines;st.hitCells=res.cells;if(!res.lines.length){st.blankStreak++;if(rw09Core('first_spin_retry')&&st.spinCount===1&&st.rw10RetryUsedWave!==st.wave){st.rw10RetryUsedWave=st.wave;st.gold+=cost;st.spinCount=0;st.spinCost=rw10SpinCostFor(0);st.toast='SECOND CHANCE · 首次空振，免费重投';render();setTimeout(()=>spin(),520);return}const refund=rw09Core('echo')?Math.min(60,16+st.blankStreak*7):0;st.gold+=refund;st.toast=refund?`空振 · Core 返还 ${refund} Gold`:`空振 · -${cost} Gold`}else{st.blankStreak=0;let summoned=0;for(const l of res.lines){const rarityUp=rw09Core('golden_relic')&&st.rw10GoldenCell!=null&&l.cells.includes(st.rw10GoldenCell);const u=rw10AddUnit(l.key,{rarityUp});if(u)summoned++}st.jack=res.lines.length>=2;if(res.lines.length>=5){recruitLegendary();st.toast=`PRISM JACKPOT · ${res.lines.length} LINES`}else st.toast=st.jack?`JACKPOT · ${res.lines.length} LINES · ${summoned} recruits`:`${res.lines[0].name} · ${TYPES[res.lines[0].key].name}`}render();if(res.lines.length)animateWinLines();if(st.jack){jackpotBurst(res.lines.length);setTimeout(()=>{st.jack=false;render()},1250)}};

checkEnd=function(){const b=st.battle;if(alive(b.enemies).length&&alive(b.allies).length)return false;clearInterval(timers.battle);timers.battle=null;if(!alive(b.enemies).length){const done=st.wave,g=55+done*9;st.gold+=g;st.score+=120+done*42+alive(b.allies).length*15;if(done>=MAX_WAVE){st.high=Math.max(st.high,st.score);saveHigh();st.screen='over';st.runDone=true;st.phase='over';render();return true}st.wave++;st.phase='prep';st.battle=null;st.spinCount=0;st.spinCost=rw10SpinCostFor(0);st.cal=1;st.nudge=1;st.calArmed=false;st.lines=[];st.hitCells=[];st.shopWave=0;rw09GenerateShop(true);st.toast=`Wave ${done} clear · +${g} Gold · Nudge restored`;if(done%3===0){openReward();return true}render();return true}const rem=alive(b.enemies).length,loss=Math.min(9,Math.max(2,rem*2+(st.wave>=10?2:0)));st.base=Math.max(0,st.base-loss);if(st.base<=0){st.high=Math.max(st.high,st.score);saveHigh();st.screen='over';st.runDone=true;st.phase='over';render();return true}const done=st.wave;st.wave++;st.phase='prep';st.battle=null;st.spinCount=0;st.spinCost=rw10SpinCostFor(0);st.cal=1;st.nudge=1;st.calArmed=false;st.shopWave=0;rw09GenerateShop(true);st.toast=`Wave ${done} leak · HEART -${loss} · Nudge restored`;render();return true};

function rw10Role(u){if(u.type==='guard')return'TANK';if(u.type==='cavalry')return'CHARGE';if(u.type==='mage')return'MAGIC';if(u.type==='ranger')return'RANGED';if(u.type==='prism')return'PRISM';return u.type.toUpperCase()}
renderBench=function(){rw10Ensure();let cards=st.units.map((u,i)=>{rw10EnsureUnit(u);const selected=st.selected===u.id,bench=i>=rw10FieldCap();return`<div class="ucard replica rw10-card ${u.type==='prism'?'legendary':''} ${selected?'selected':''} ${bench?'bench-unit':''}"><button class="rw10-unit-main" data-action="unit" data-id="${u.id}"><div class="top"><span class="mini-sigil">${sigil(u.type)}</span><span class="rw10-level">LV.${u.level} · ${u.star}★</span></div><div class="uname">${u.name}${u.advanced?'<em> ADV</em>':''}</div><div class="ustats"><span>⚔ ${u.atk}</span><span>♥ ${u.hp}</span><span>${rw10Role(u)}</span></div><div class="random-stats">${rw08StatChips(u)}</div><div class="imprint-line"><b>${u.imprint}</b><span>${u.imprints?.[0]?.desc||''}</span></div><div class="evo-line">${bench?'BENCH · unlocks into field later':rw08EvoText(u)}</div></button><button class="rw10-lock ${u.locked?'locked':''}" data-action="rw10-lock" data-id="${u.id}">${u.locked?'🔒 LOCK':'○ LOCK'}</button></div>`}).join('');cards+=Array.from({length:Math.max(0,MAX_UNITS-st.units.length)},(_,j)=>`<div class="empty-card">${st.units.length+j>=rw10FieldCap()?'BENCH':'FIELD'}<br>EMPTY</div>`).join('');return`<section class="section roster-replica"><div class="section-head"><b>ROSTER · ${Math.min(st.units.length,rw10FieldCap())}/${rw10FieldCap()} FIELD</b><span>Absorb raises LEVEL · Lock protects fodder</span></div><div class="bench">${cards}</div></section>`};
renderShop=function(){rw10Ensure();rw09GenerateShop();const offers=st.shopOffers.map(o=>{const cost=rw09Price(o);return`<div class="shop-card ${o.kind} ${o.sold?'sold':''}"><div class="shop-tag">${o.tag}</div><b>${o.name}</b><p>${o.desc}</p><button data-action="shop-buy" data-offer="${o.offerId}" ${o.sold?'disabled':''}>${o.sold?'SOLD':`${cost} GOLD`}</button></div>`}).join('');const rc=20+st.shopRerolls*10;return`<section class="section replica-panel shop-panel"><div class="section-head"><b>SHOP</b><button class="mini-action" data-action="shop-reroll">REROLL ${rc}</button></div><div class="shop-row">${offers}</div></section>`};
renderLoadout=function(){rw10Ensure();const cores=st.cores.length?st.cores.map(c=>`<div class="load-core filled"><small>${c.tag}</small><b>${c.name}</b><span>${c.desc}</span></div>`).join(''):`<div class="load-core empty"><b>NO CORE</b></div>`;const items=st.items.length?st.items.map(it=>`<div class="inv-item"><div><small>${it.tag}</small><b>${it.name}</b><span>${it.desc}</span></div><button data-action="item-use" data-item="${it.instanceId}">USE</button></div>`).join(''):`<div class="inv-empty">No Items</div>`;return`<details class="loadout-drawer" open><summary><b>CORES ${st.cores.length} · ITEMS ${st.items.length}</b><span>Core stack has no artificial 3-slot cap</span></summary><div class="core-loadout rw10-core-scroll">${cores}</div><div class="item-inventory">${items}</div></details>`};
const __rw10RenderMachine=renderMachine;
renderMachine=function(){let h=__rw10RenderMachine();h=h.replace(/校准器 ×\d+/g,`NUDGE ×${st.nudge??1}`).replace('校准已装载','NUDGE READY').replace(/拉杆 · \d+ 补给/,`SPIN · ${st.spinCost} GOLD`);return h};
const __rw10CellHTML=cellHTML;
cellHTML=function(k,i,spinning){let h=__rw10CellHTML(k,i,spinning);if(st.rw10GoldenCell===i&&!spinning)h=h.replace('class="cell','class="cell golden-symbol');return h};
const __rw10RenderGame=renderGame;
renderGame=function(){let h=__rw10RenderGame();h=h.replace('v0.9 REPLICA SYSTEMS','v0.10 CURRENT DEMO FIDELITY').replace('<div class="k">SUPPLY</div>','<div class="k">GOLD</div>');return h};
renderMenu=function(){const demo=['guard','cavalry','ranger','mage','guard','cavalry','mage','ranger','guard'];return`<div class="menu"><section class="menu-card"><div class="menu-hero"><div class="moon"></div><div class="menu-title"><div class="eyebrow">CURRENT DEMO REPLICA</div><h1>命运<span>守线</span></h1><p>Warrior / Cavalry / Archer / Mage reels → 1 Nudge per wave → Level through absorption → Advanced rolls → Core manipulation → Judgement / Boss.</p></div><div class="menu-machine"><div class="menu-reels">${demo.map(k=>`<div>${sigil(k)}</div>`).join('')}</div></div></div><div class="menu-copy"><div class="menu-features"><div class="feature"><b>5 Field Slots → Expand</b><p>先管理拥挤，再靠吸收把主力堆到高 Level。</p></div><div class="feature"><b>Advanced Units</b><p>Mage 可能直接出现 Sorcerer 等高阶 Roll。</p></div><div class="feature"><b>Real Reel Cores</b><p>Second Chance、Jester Joker、Golden Relic 等直接改变转轮。</p></div><div class="feature"><b>Unit Lock</b><p>锁定主 C，避免误作为吸收素材。</p></div></div><button class="big-cta" data-action="start">开始这一局</button><div class="version">v0.10 · CONFIRMED structure / INFERRED exact tuning</div></div></section></div>`};

const __rw10Bind=bind;
bind=function(){__rw10Bind();$$('[data-action="rw10-lock"]').forEach(el=>el.addEventListener('click',e=>{e.stopPropagation();rw10ToggleLock(el.dataset.id)}))};
const __rw10Render=render;
render=function(){rw10Ensure();__rw10Render()};

rw10Ensure();render();