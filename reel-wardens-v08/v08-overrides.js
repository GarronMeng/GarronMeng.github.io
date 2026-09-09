/* v0.8 Slotbound Replica Pass
   [ORIGINAL structure] Random Stats, Imprints, Absorption, branching evolution.
   [INFERRED tuning] transfer ratios and progress thresholds are tuned approximations because exact demo math is not public. */

TYPES.guard.name='Warrior';
TYPES.ranger.name='Archer';
TYPES.mage.name='Mage';

const RW08_STAT_POOL=[
  {id:'atkPct',label:'ATK',suffix:'%',min:6,max:18,dec:0},
  {id:'hpPct',label:'HP',suffix:'%',min:7,max:22,dec:0},
  {id:'spdPct',label:'ATK SPD',suffix:'%',min:4,max:15,dec:0},
  {id:'critPct',label:'CRIT',suffix:'%',min:2,max:8,dec:0},
  {id:'lifesteal',label:'LIFESTEAL',suffix:'%',min:2,max:8,dec:0},
  {id:'spellPower',label:'SPELL',suffix:'%',min:7,max:22,dec:0}
];
const RW08_IMPRINTS={
  guard:[
    {id:'thorns',name:'Thorns',desc:'受击时反射部分伤害',transfer:'full'},
    {id:'armorAura',name:'Armor Aura',desc:'前排生存能力提高',transfer:'partial'},
    {id:'shieldHit',name:'Aegis',desc:'承伤后有概率获得护盾',transfer:'partial'}
  ],
  ranger:[
    {id:'execute',name:'Hunter',desc:'对低生命目标伤害提高',transfer:'full'},
    {id:'doubleShot',name:'Twinshot',desc:'攻击有概率追加一发',transfer:'partial'},
    {id:'goldKill',name:'Bounty',desc:'击杀具有经济倾向',transfer:'partial'}
  ],
  mage:[
    {id:'spellCrit',name:'Spell Crit',desc:'法术暴击倾向提高',transfer:'full'},
    {id:'deathEcho',name:'Death Echo',desc:'击杀后强化下一次法术',transfer:'partial'},
    {id:'arcaneEcho',name:'Arcane Echo',desc:'法术更容易产生额外溅射',transfer:'partial'}
  ],
  medic:[
    {id:'regenAura',name:'Regen Aura',desc:'治疗效果提高',transfer:'partial'},
    {id:'barrier',name:'Barrier',desc:'治疗可附带少量护盾',transfer:'partial'}
  ],
  rogue:[
    {id:'ambush',name:'Ambush',desc:'首次攻击暴击倾向提高',transfer:'partial'},
    {id:'chainKill',name:'Chain Kill',desc:'击杀后短暂提速',transfer:'partial'}
  ],
  prism:[
    {id:'prismCore',name:'Prismatic',desc:'传奇单位专属 Imprint',transfer:'none'}
  ]
};
const RW08_EVOLUTION={
  guard:{
    stages:[
      {progress:0,star:1,name:'Warrior'},
      {progress:4,star:2,name:'Paladin',atk:1.10,hp:1.24,spd:1.00,crit:0},
      {progress:10,star:3,name:'Veil',atk:1.13,hp:1.42,spd:1.02,crit:.02}
    ]
  },
  mage:{
    stages:[
      {progress:0,star:1,name:'Mage'},
      {progress:4,star:2,name:'Advanced Mage',atk:1.22,hp:1.06,spd:1.06,crit:.03},
      {progress:10,star:3,name:'Necro Lord',atk:1.46,hp:1.12,spd:1.08,crit:.06}
    ]
  }
};

function rw08Rnd(min,max,dec=0){const v=min+Math.random()*(max-min);return dec?+v.toFixed(dec):Math.round(v)}
function rw08RollStats(count=3){
  const pool=[...RW08_STAT_POOL].sort(()=>Math.random()-.5).slice(0,count);
  return pool.map(s=>({id:s.id,label:s.label,value:rw08Rnd(s.min,s.max,s.dec),suffix:s.suffix}));
}
function rw08StatMap(stats=[]){const out={};for(const s of stats)out[s.id]=(out[s.id]||0)+Number(s.value||0);return out}
function rw08FmtStat(s){return `${s.label} +${Number(s.value).toFixed(Number(s.value)%1?1:0)}${s.suffix||''}`}
function rw08RollImprint(k){const pool=RW08_IMPRINTS[k]||RW08_IMPRINTS.ranger;return {...pick(pool)} }
function rw08EnsureUnit(u){
  if(!u.randomStats)u.randomStats=rw08RollStats(u.type==='prism'?4:3);
  if(!u.imprints){const im=rw08RollImprint(u.type);u.imprints=[im];u.imprint=im.name}
  if(!u.imprint&&u.imprints?.[0])u.imprint=u.imprints[0].name;
  if(u.evoProgress==null)u.evoProgress=u.feed||0;
  if(u.evoStage==null)u.evoStage=Math.max(0,(u.star||1)-1);
  if(u.lifesteal==null)u.lifesteal=(rw08StatMap(u.randomStats).lifesteal||0)/100;
  if(u.spellPower==null)u.spellPower=(rw08StatMap(u.randomStats).spellPower||0)/100;
  return u;
}
function rw08ApplyRolledStats(base,u){
  const m=rw08StatMap(u.randomStats);
  u.atk=Math.max(1,Math.round(base.atk*(1+(m.atkPct||0)/100)));
  u.hp=Math.max(1,Math.round(base.hp*(1+(m.hpPct||0)/100)));
  u.spd=+(base.spd*(1+(m.spdPct||0)/100)).toFixed(2);
  u.crit=+(base.crit+(m.critPct||0)/100).toFixed(3);
  u.lifesteal=(m.lifesteal||0)/100;
  u.spellPower=(m.spellPower||0)/100;
}

createUnit=function(k){
  const t=TYPES[k];
  const base={atk:t.atk,hp:t.hp,spd:t.spd,crit:t.crit};
  const u={id:`u${Date.now()}${Math.random().toString(36).slice(2,6)}`,type:k,name:t.name,star:1,feed:0,evoProgress:0,evoStage:0,evo:null};
  u.randomStats=rw08RollStats(k==='prism'?4:3);
  u.imprints=[rw08RollImprint(k)];u.imprint=u.imprints[0].name;
  rw08ApplyRolledStats(base,u);
  return u;
};

const __rw08Recruit=recruit;
recruit=function(k){
  const before=st.units.length;
  const u=createUnit(k);
  if(st.units.length<MAX_UNITS){
    st.units.push(u);
    st.toast=`招募 ${u.name} · ${u.imprint} · ${u.randomStats.slice(0,2).map(rw08FmtStat).join(' / ')}`;
    return;
  }
  const target=st.units.find(x=>x.type===k)||st.units[0];
  rw08EnsureUnit(target);
  const preview=rw08AbsorbPreview(u,target);
  rw08ApplyAbsorb(u,target,preview,{silent:true});
  st.toast=`阵容已满：${u.name} 自动转化为 ${target.name} 的吸收素材。`;
};

function rw08MergeStat(target,statId,gain){
  if(gain<=0)return;
  target.randomStats=target.randomStats||[];
  let s=target.randomStats.find(x=>x.id===statId);
  if(!s){const def=RW08_STAT_POOL.find(x=>x.id===statId);s={id:statId,label:def?.label||statId,value:0,suffix:def?.suffix||''};target.randomStats.push(s)}
  s.value=+(Number(s.value||0)+gain).toFixed(1);
}
function rw08TransferImprints(source,target,same){
  const moved=[];target.imprints=target.imprints||[];
  for(const im of source.imprints||[]){
    if(im.transfer==='none')continue;
    if(im.transfer==='full'&&same){if(!target.imprints.some(x=>x.id===im.id)){target.imprints.push({...im});moved.push(im.name)}}
    else if(im.transfer==='partial'){
      const id=`${im.id}_echo`;
      if(!target.imprints.some(x=>x.id===id)){target.imprints.push({...im,id,name:`${im.name} Echo`,desc:`继承：${im.desc}`});moved.push(`${im.name} Echo`)}
    }
  }
  target.imprint=target.imprints[0]?.name||target.imprint;
  return moved;
}
function rw08AbsorbPreview(source,target){
  rw08EnsureUnit(source);rw08EnsureUnit(target);
  const same=source.type===target.type;
  const ratio=same?.62:.30;
  const statRatio=same?.55:.28;
  const gainAtk=Math.max(1,Math.round(source.atk*ratio*.44));
  const gainHp=Math.max(1,Math.round(source.hp*ratio*.30));
  const gainSpd=+(source.spd*(same?.035:.012)).toFixed(2);
  const gainCrit=+(source.crit*(same?.10:.04)).toFixed(3);
  const statTransfers=(source.randomStats||[]).map(s=>({...s,value:+(s.value*statRatio).toFixed(1)})).filter(s=>s.value>0);
  const imprintNames=(source.imprints||[]).filter(im=>im.transfer!=='none'&&(same||im.transfer==='partial')).map(im=>im.transfer==='full'&&same?im.name:`${im.name} Echo`);
  const progress=source.type==='prism'?3:(same?2:1);
  return{same,gainAtk,gainHp,gainSpd,gainCrit,statTransfers,imprintNames,progress,prismRisk:source.type==='prism'};
}
function rw08AdvanceEvolution(u,progressGain){
  rw08EnsureUnit(u);
  const path=RW08_EVOLUTION[u.type];
  u.evoProgress=(u.evoProgress||0)+progressGain;
  u.feed=u.evoProgress;
  if(!path){
    const old=u.star;u.star=u.evoProgress>=10?3:u.evoProgress>=4?2:1;
    if(u.star>old)try{window.dispatchEvent(new CustomEvent('rwlevel',{detail:{id:u.id,star:u.star}}))}catch(e){}
    return null;
  }
  let nextStage=u.evoStage||0;
  for(let i=path.stages.length-1;i>=0;i--)if(u.evoProgress>=path.stages[i].progress){nextStage=i;break}
  if(nextStage>(u.evoStage||0)){
    for(let s=(u.evoStage||0)+1;s<=nextStage;s++){
      const stage=path.stages[s];
      u.atk=Math.round(u.atk*(stage.atk||1));u.hp=Math.round(u.hp*(stage.hp||1));u.spd=+(u.spd*(stage.spd||1)).toFixed(2);u.crit=+(u.crit+(stage.crit||0)).toFixed(3);
      u.name=stage.name;u.star=stage.star;u.evoStage=s;u.evo=stage.name.toLowerCase().replace(/\s+/g,'_');
      try{window.dispatchEvent(new CustomEvent('rwlevel',{detail:{id:u.id,star:u.star}}))}catch(e){}
    }
    return path.stages[nextStage].name;
  }
  return null;
}
function rw08ApplyAbsorb(source,target,preview,{silent=false}={}){
  target.atk+=preview.gainAtk;target.hp+=preview.gainHp;target.spd=+(target.spd+preview.gainSpd).toFixed(2);target.crit=+(target.crit+preview.gainCrit).toFixed(3);
  for(const s of preview.statTransfers)rw08MergeStat(target,s.id,s.value);
  const moved=rw08TransferImprints(source,target,preview.same);
  const evolved=rw08AdvanceEvolution(target,preview.progress);
  const map=rw08StatMap(target.randomStats);target.lifesteal=(map.lifesteal||0)/100;target.spellPower=(map.spellPower||0)/100;
  if(!silent){
    st.fusionFx={unitId:target.id,atk:preview.gainAtk,hp:preview.gainHp,starUp:!!evolved,same:preview.same};
    st.toast=evolved?`${target.name} 完成进化！`:`${target.name} 吸收完成 · 进化 ${target.evoProgress}/${RW08_EVOLUTION[target.type]?.stages.at(-1)?.progress||10}`;
  }
  return{moved,evolved};
}

recalcStar=function(u){rw08EnsureUnit(u);rw08AdvanceEvolution(u,0)};
chooseEvo=function(){st.evo=null;render()};

merge=function(aid,bid){
  if(st.fusing)return;const source=st.units.find(x=>x.id===aid),target=st.units.find(x=>x.id===bid);if(!source||!target||source===target)return;
  rw08EnsureUnit(source);rw08EnsureUnit(target);
  st.absorb={src:aid,tgt:bid,preview:rw08AbsorbPreview(source,target)};st.selected=null;render();
};
function rw08ConfirmAbsorb(){
  const a=st.absorb;if(!a)return;const source=st.units.find(x=>x.id===a.src),target=st.units.find(x=>x.id===a.tgt);if(!source||!target){st.absorb=null;render();return}
  st.fusing=true;st.toast=`${source.name} → ${target.name} · 吸收中`;const preview=a.preview;st.absorb=null;render();
  animateMerge(source.id,target.id,()=>{
    const srcNow=st.units.find(x=>x.id===source.id),tgtNow=st.units.find(x=>x.id===target.id);if(!srcNow||!tgtNow){st.fusing=false;return}
    rw08ApplyAbsorb(srcNow,tgtNow,preview);
    const i=st.units.findIndex(x=>x.id===srcNow.id);if(i>=0)st.units.splice(i,1);
    st.fusing=false;render();
    setTimeout(()=>{if(st.fusionFx?.unitId===tgtNow.id){st.fusionFx=null;render()}},1050)
  })
}
function rw08CancelAbsorb(){st.absorb=null;st.selected=null;st.toast='已取消吸收。';render()}

selectUnit=function(id){
  if(st.phase!=='prep'||st.fusing)return;
  if(!st.selected){st.selected=id;const u=st.units.find(x=>x.id===id);rw08EnsureUnit(u);st.toast=`素材：${u.name} · ${u.imprint}。再点目标查看吸收预览。`;render();return}
  if(st.selected===id){st.selected=null;st.toast='已取消素材选择。';render();return}
  merge(st.selected,id)
};

const __rw08MkAlly=mkAlly;
mkAlly=function(u,i){rw08EnsureUnit(u);const a=__rw08MkAlly(u,i);a.lifesteal=u.lifesteal||0;a.spellPower=u.spellPower||0;a.imprints=(u.imprints||[]).map(x=>({...x}));return a};
function rw08HasImprint(u,id){return (u.imprints||[]).some(x=>x.id===id||x.id===`${id}_echo`)}
allyAct=function(a){
  const b=st.battle;
  if(a.type==='medic'){
    const t=lowestAlly();if(t&&t.hp/t.maxHp<.86){let amount=a.atk*(own('clinic')?1.72:1.28);if(rw08HasImprint(a,'regenAura'))amount*=1.16;const h=heal(t,amount);if((own('clinic')||rw08HasImprint(a,'barrier'))&&t.hp===t.maxHp)t.shield+=Math.round(amount*.22);b.msg=`${a.name} 治疗 ${t.name} +${h}`;fx(a,t,'heal',h,true);return}
  }
  const t=targetEnemy();if(!t)return;let n=a.atk*(a.type==='mage'?(1+(a.spellPower||0)):1);let critChance=a.crit+(rw08HasImprint(a,'spellCrit')&&a.type==='mage'?.08:0);const crit=chance(Math.min(.85,critChance));if(crit)n*=1.72;if(a.type==='ranger'&&rw08HasImprint(a,'execute')&&t.hp/t.maxHp<.35)n*=1.24;
  const d=dmg(t,n);if((a.lifesteal||0)>0)heal(a,d*a.lifesteal);
  if(a.type==='mage'&&(own('arcane')||rw08HasImprint(a,'arcaneEcho'))){const t2=alive(b.enemies)[1];if(t2)dmg(t2,d*.42)}
  if(a.type==='ranger'&&rw08HasImprint(a,'doubleShot')&&chance(.18)){const t2=targetEnemy();if(t2)dmg(t2,d*.46)}
  b.msg=`${a.name} → ${t.name} ${d}${crit?' CRIT':''}`;fx(a,t,a.type==='mage'?'magic':(a.type==='guard'||a.type==='rogue'?'melee':'shot'),d,false);
};
const __rw08EnemyAct=enemyAct;
enemyAct=function(e){
  const before=st.battle?.allies?.map(x=>({id:x.id,hp:x.hp}))||[];__rw08EnemyAct(e);
  if(!st.battle)return;
  for(const t of st.battle.allies){const old=before.find(x=>x.id===t.id);if(old&&t.hp<old.hp&&rw08HasImprint(t,'thorns')){const reflected=Math.max(1,Math.round((old.hp-t.hp)*.14));dmg(e,reflected)}}
};

function rw08EvoText(u){
  rw08EnsureUnit(u);const path=RW08_EVOLUTION[u.type];if(!path)return `吸收进度 ${u.evoProgress||0}/10`;
  const last=path.stages[path.stages.length-1];const next=path.stages.find(s=>s.progress>(u.evoProgress||0));return next?`${u.name} → ${next.name} · ${u.evoProgress}/${next.progress}`:`${last.name} · MAX`;
}
function rw08StatChips(u){rw08EnsureUnit(u);return u.randomStats.slice(0,4).map(s=>`<span class="rstat">${rw08FmtStat(s)}</span>`).join('')}
renderBench=function(){
  let cards=st.units.map(u=>{rw08EnsureUnit(u);const selected=st.selected===u.id;return`<button class="ucard replica ${u.type==='prism'?'legendary':''} ${selected?'selected':''}" data-action="unit" data-id="${u.id}"><div class="top"><span class="mini-sigil">${sigil(u.type)}</span><span class="stars">${'★'.repeat(u.star)}${'☆'.repeat(3-u.star)}</span></div><div class="uname">${u.name}</div><div class="ustats"><span>⚔ ${u.atk}</span><span>♥ ${u.hp}</span><span>SPD ${u.spd}</span></div><div class="random-stats">${rw08StatChips(u)}</div><div class="imprint-line"><b>${u.imprint}</b><span>${u.imprints?.[0]?.desc||''}</span></div><div class="evo-line">${rw08EvoText(u)}</div>${st.fusionFx&&st.fusionFx.unitId===u.id?`<div class="fusion-gain ${st.fusionFx.starUp?'star-up':''}">+${st.fusionFx.atk} ATK · +${st.fusionFx.hp} HP${st.fusionFx.starUp?' · EVOLVE!':''}</div>`:''}</button>`}).join('');
  cards+=Array.from({length:Math.max(0,MAX_UNITS-st.units.length)},()=>`<div class="empty-card">EMPTY<br>等待招募</div>`).join('');
  return`<section class="section roster-replica"><div class="section-head"><b>ROSTER · RANDOM STATS</b><span>${st.selected?'选择目标以预览吸收':'点素材 → 点目标'}</span></div><div class="bench">${cards}</div></section>`
};
function renderAbsorbOverlay(){
  const a=st.absorb;if(!a)return'';const s=st.units.find(x=>x.id===a.src),t=st.units.find(x=>x.id===a.tgt);if(!s||!t)return'';const p=a.preview;
  return`<div class="overlay absorb-overlay"><div class="sheet absorb-sheet"><div class="eyebrow">ABSORPTION PREVIEW</div><h1>${s.name} → ${t.name}</h1><p>素材会永久消失。${p.same?'同职业：转移效率更高。':'跨职业：只继承部分成长。'}${p.prismRisk?' ⚠ 将消耗传奇 Prism。':''}</p><div class="absorb-pair"><div class="absorb-unit source"><small>SOURCE</small><b>${s.name}</b><span>${s.imprint}</span></div><div class="absorb-arrow">→</div><div class="absorb-unit target"><small>TARGET</small><b>${t.name}</b><span>${rw08EvoText(t)}</span></div></div><div class="transfer-grid"><div><span>基础继承</span><b>ATK +${p.gainAtk} · HP +${p.gainHp}</b></div><div><span>进化进度</span><b>+${p.progress}</b></div><div class="wide"><span>Random Stats</span><b>${p.statTransfers.slice(0,4).map(rw08FmtStat).join(' · ')||'无'}</b></div><div class="wide"><span>Imprint</span><b>${p.imprintNames.join(' · ')||'不转移'}</b></div></div><div class="absorb-actions"><button class="btn utility" data-action="absorb-cancel">取消</button><button class="btn spin" data-action="absorb-confirm">确认吸收</button></div></div></div>`
}

const __rw08RenderGame=renderGame;
renderGame=function(){return __rw08RenderGame().replace('v0.7 VFX','v0.8 REPLICA')};
const __rw08RenderMenu=renderMenu;
renderMenu=function(){return __rw08RenderMenu().replace('v0.6 Preview · Combat & Jackpot Feel','v0.8 Replica · Stats / Imprints / Absorb / Evolve').replace('吸收与分支进化','Random Stats + Absorption').replace('同系融合更强，觉醒后可在两个职业分支中二选一。','每个单位拥有独立 Random Stats 与 Imprint；吸收前先判断谁值得成为主 C。')};
const __rw08Bind=bind;
bind=function(){
  __rw08Bind();
  $$('[data-action="absorb-confirm"]').forEach(el=>el.addEventListener('click',rw08ConfirmAbsorb));
  $$('[data-action="absorb-cancel"]').forEach(el=>el.addEventListener('click',rw08CancelAbsorb));
};
render=function(){const app=$('#app');if(st.screen==='menu'){app.innerHTML=renderMenu();bind();return}app.innerHTML=renderGame()+(st.screen==='reward'?renderRewardOverlay():'')+(st.screen==='over'?renderOver():'')+renderAbsorbOverlay();bind()};

st.units.forEach(rw08EnsureUnit);
render();
