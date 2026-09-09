/* v0.10.1 玩家界面修复：仅处理显示、中文化与开始按钮兜底，不改玩法数值。 */

TYPES.guard.name='战士';
TYPES.cavalry.name='骑兵';
TYPES.ranger.name='弓手';
TYPES.mage.name='法师';
TYPES.jester.name='小丑';
if(TYPES.prism)TYPES.prism.name='虹晶';

if(RW10_ADVANCED){
  if(RW10_ADVANCED.mage)RW10_ADVANCED.mage.name='高阶法师';
  if(RW10_ADVANCED.guard)RW10_ADVANCED.guard.name='精锐战士';
  if(RW10_ADVANCED.ranger)RW10_ADVANCED.ranger.name='精锐弓手';
  if(RW10_ADVANCED.cavalry)RW10_ADVANCED.cavalry.name='重装骑兵';
}

const RW101_NAMES={
  first_spin_retry:['再来一次','每波第一次空转时，免费重转一次。','核心 · 转轮'],
  jester_hat:['小丑帽','转轮会出现小丑符号，可代替任意职业组成连线。','核心 · 转轮'],
  golden_relic:['黄金圣物','黄金符号参与连线时，召唤单位品质提高。','核心 · 稀有'],
  first_guard:['守护符','下一场战斗中，第一个承伤单位短暂无敌。','道具 · 防御'],
  repair:['修理包','使用后恢复基地生命。','道具 · 修复'],
  loaded_coin:['修正币','获得一次转轮修正。','道具 · 转轮'],
  war_tonic:['战意药剂','下一场战斗全队攻击提高。','道具 · 战斗'],
  armor_plate:['护甲板','下一场战斗全队最大生命提高。','道具 · 战斗'],
  warrior_chip:['战士徽记','短时间提高战士符号权重。','道具 · 概率'],
  mage_chip:['法师徽记','短时间提高法师符号权重。','道具 · 概率'],
  archer_chip:['弓手徽记','短时间提高弓手符号权重。','道具 · 概率'],
  loaded:['校准核心','后续转动更容易形成有效连线。','核心 · 概率'],
  echo:['回响核心','空转时返还部分金币。','核心 · 经济'],
  surge:['增殖核心','命中连线时有机会额外召唤同职业单位。','核心 · 召唤'],
  warrior_bias:['战士核心','持续提高战士符号权重。','核心 · 概率'],
  mage_bias:['法师核心','持续提高法师符号权重。','核心 · 概率'],
  archer_bias:['弓手核心','持续提高弓手符号权重。','核心 · 概率'],
  merchant:['商人核心','商店购买价格降低。','核心 · 商店'],
  vanguard:['先锋核心','前排单位最大生命提高。','核心 · 阵型']
};
function rw101LocalizeDefs(list){
  for(const x of list||[]){const z=RW101_NAMES[x.id];if(z){x.name=z[0];x.desc=z[1];x.tag=z[2]}}
}
rw101LocalizeDefs(RW09_ITEMS);
rw101LocalizeDefs(RW09_CORES);

function rw101Role(u){
  if(u.type==='guard')return'前排';
  if(u.type==='cavalry')return'冲锋';
  if(u.type==='mage')return'法术';
  if(u.type==='ranger')return'远程';
  if(u.type==='prism')return'传奇';
  return'单位';
}
function rw101Tag(tag=''){
  return String(tag)
    .replaceAll('ITEM','道具').replaceAll('CORE','核心')
    .replaceAll('REEL','转轮').replaceAll('RNG','概率')
    .replaceAll('COMBAT','战斗').replaceAll('DEF','防御')
    .replaceAll('ECON','经济').replaceAll('SHOP','商店')
    .replaceAll('FORMATION','阵型').replaceAll('SUMMON','召唤')
    .replaceAll('LEGENDARY','稀有').replaceAll('REPAIR','修复')
    .replaceAll('JOKER','小丑');
}
function rw101Text(s=''){
  return String(s)
    .replaceAll('3×3 · 8 PAYLINES','3×3 · 8 条连线')
    .replaceAll('PAYLINES','连线')
    .replaceAll('FATE','运势').replaceAll('NEXT','下次')
    .replaceAll('CURRENT DEMO FIDELITY','')
    .replaceAll('REPLICA SYSTEMS','')
    .replaceAll('CURRENT DEMO REPLICA','')
    .replaceAll('CONFIRMED structure / INFERRED exact tuning','')
    .replaceAll('CONFIRMED','').replaceAll('INFERRED','').replaceAll('ORIGINAL','')
    .replaceAll('SECOND CHANCE','再来一次')
    .replaceAll('PRISM JACKPOT','虹晶大奖').replaceAll('JACKPOT','大奖')
    .replaceAll('CRIT','暴击').replaceAll('LINES','条连线')
    .replaceAll('Wave','波次').replaceAll('WAVE','波次')
    .replaceAll('clear','通过').replaceAll('leak','失守')
    .replaceAll('HEART','基地').replaceAll('Gold','金币').replaceAll('GOLD','金币')
    .replaceAll('Nudge restored','修正次数已恢复').replaceAll('NUDGE READY','修正已准备')
    .replaceAll('NUDGE','修正').replaceAll('SPIN','转动')
    .replaceAll('SHOP','商店').replaceAll('REROLL','刷新')
    .replaceAll('CORES','核心').replaceAll('CORE','核心')
    .replaceAll('ITEMS','道具').replaceAll('ITEM','道具')
    .replaceAll('ROSTER','阵容').replaceAll('FIELD','上阵').replaceAll('BENCH','后备')
    .replaceAll('LOCK','锁定').replaceAll('ADVANCED','高阶').replaceAll('ADV','高阶')
    .replaceAll('LEVEL','等级').replaceAll('LV.','等级 ')
    .replaceAll('BASE','基地').replaceAll('SUPPLY','金币')
    .replaceAll('FORMATION','阵型')
    .replaceAll('SOLD','已售').replaceAll('USE','使用')
    .replaceAll('NO CORE','暂无核心').replaceAll('No Items','暂无道具');
}

renderMenu=function(){
  const demo=['guard','cavalry','ranger','mage','guard','cavalry','mage','ranger','guard'];
  return`<div class="menu"><section class="menu-card"><div class="menu-hero"><div class="moon"></div><div class="menu-title"><div class="eyebrow">转轮 · 构筑 · 自动战斗</div><h1>命运<span>守线</span></h1><p>转动转轮招募单位，选择值得培养的主力，通过吸收、核心和阵型一步步撑过每一波。</p></div><div class="menu-machine"><div class="menu-reels">${demo.map(k=>`<div>${sigil(k)}</div>`).join('')}</div></div></div><div class="menu-copy"><div class="menu-features"><div class="feature"><b>转轮招募</b><p>战士、骑兵、弓手、法师各有不同定位。</p></div><div class="feature"><b>吸收成长</b><p>随机属性、印记、等级与进化共同决定主力。</p></div><div class="feature"><b>操纵概率</b><p>使用道具和核心改变转轮，调整阵型应对强敌。</p></div><div class="feature"><b>自动守线</b><p>准备完成后自动战斗，重点在战前取舍。</p></div></div><button class="big-cta" data-action="start">开始游戏</button><div class="version">v0.10.1</div></div></section></div>`;
};

renderBench=function(){
  rw10Ensure();
  let cards=st.units.map((u,i)=>{rw10EnsureUnit(u);const selected=st.selected===u.id,bench=i>=rw10FieldCap();return`<div class="ucard replica rw10-card ${u.type==='prism'?'legendary':''} ${selected?'selected':''} ${bench?'bench-unit':''}"><button class="rw10-unit-main" data-action="unit" data-id="${u.id}"><div class="top"><span class="mini-sigil">${sigil(u.type)}</span><span class="rw10-level">等级 ${u.level} · ${u.star}★</span></div><div class="uname">${u.name}${u.advanced?'<em> 高阶</em>':''}</div><div class="ustats"><span>⚔ ${u.atk}</span><span>♥ ${u.hp}</span><span>${rw101Role(u)}</span></div><div class="random-stats">${rw08StatChips(u)}</div><div class="imprint-line"><b>${u.imprint}</b><span>${u.imprints?.[0]?.desc||''}</span></div><div class="evo-line">${bench?'后备':rw08EvoText(u)}</div></button><button class="rw10-lock ${u.locked?'locked':''}" data-action="rw10-lock" data-id="${u.id}">${u.locked?'🔒 已锁':'○ 锁定'}</button></div>`}).join('');
  cards+=Array.from({length:Math.max(0,MAX_UNITS-st.units.length)},(_,j)=>`<div class="empty-card">${st.units.length+j>=rw10FieldCap()?'后备空位':'上阵空位'}</div>`).join('');
  return`<section class="section roster-replica"><div class="section-head"><b>阵容 · ${Math.min(st.units.length,rw10FieldCap())}/${rw10FieldCap()} 上阵</b><span>吸收升级 · 锁定防误吞</span></div><div class="bench">${cards}</div></section>`;
};

renderShop=function(){
  rw10Ensure();rw09GenerateShop();
  const offers=st.shopOffers.map(o=>{const cost=rw09Price(o);return`<div class="shop-card ${o.kind} ${o.sold?'sold':''}"><div class="shop-tag">${rw101Tag(o.tag)}</div><b>${o.name}</b><p>${o.desc}</p><button data-action="shop-buy" data-offer="${o.offerId}" ${o.sold?'disabled':''}>${o.sold?'已售':`${cost} 金币`}</button></div>`}).join('');
  const rc=20+st.shopRerolls*10;
  return`<section class="section replica-panel shop-panel"><div class="section-head"><b>商店</b><button class="mini-action" data-action="shop-reroll">刷新 ${rc}</button></div><div class="shop-row">${offers}</div></section>`;
};

renderFormation=function(){
  rw10Ensure();const labels=['前排','中排','后排'];
  const slots=Array.from({length:6},(_,i)=>{const u=st.units[i],sel=st.formSelected===i,row=labels[Math.floor(i/2)];return`<button class="formation-slot ${sel?'selected':''} ${u?'filled':'empty'}" data-action="formation" data-index="${i}" ${u?'':'disabled'}><small>${row} ${i%2+1}</small>${u?`<b>${u.name}</b><span>${rw101Role(u)} · ${u.star}★</span>`:'<b>空位</b>'}</button>`}).join('');
  return`<section class="section replica-panel formation-panel"><div class="section-head"><b>阵型</b><span>点两个位置交换</span></div><div class="formation-grid">${slots}</div></section>`;
};

renderLoadout=function(){
  rw10Ensure();
  const cores=st.cores.length?st.cores.map(c=>`<div class="load-core filled"><small>${rw101Tag(c.tag)}</small><b>${c.name}</b><span>${c.desc}</span></div>`).join(''):`<div class="load-core empty"><b>暂无核心</b></div>`;
  const items=st.items.length?st.items.map(it=>`<div class="inv-item"><div><small>${rw101Tag(it.tag)}</small><b>${it.name}</b><span>${it.desc}</span></div><button data-action="item-use" data-item="${it.instanceId}">使用</button></div>`).join(''):`<div class="inv-empty">暂无道具</div>`;
  return`<details class="loadout-drawer"><summary><b>核心 ${st.cores.length} · 道具 ${st.items.length}</b><span>点击展开</span></summary><div class="core-loadout rw10-core-scroll">${cores}</div><div class="item-inventory">${items}</div></details>`;
};

const __rw101Machine=renderMachine;
renderMachine=function(){return rw101Text(__rw101Machine()).replace(/修正 ×\d+/g,`修正 ×${st.nudge??1}`).replace(/转动 · \d+ 金币/,`转动 · ${st.spinCost} 金币`)};

const __rw101Game=renderGame;
renderGame=function(){
  let h=rw101Text(__rw101Game());
  h=h.replace('REEL WARDENS','命运守线')
     .replace(/命运守线 · v0\.10[^<]*/,'命运守线');
  return h;
};

start=function(){st=fresh();st.screen='game';rw10Ensure();render()};

const __rw101Render=render;
render=function(){if(typeof st?.toast==='string')st.toast=rw101Text(st.toast);__rw101Render()};

const __rw101Bind=bind;
bind=function(){
  __rw101Bind();
  const btn=document.querySelector('[data-action="start"]');
  if(btn){btn.onclick=(e)=>{e.preventDefault();start()}}
};

render();
