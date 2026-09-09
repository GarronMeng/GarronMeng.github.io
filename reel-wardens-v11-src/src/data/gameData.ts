import type { CoreDef, EnemyType, Imprint, ItemDef, Payline, RandomStat, StatId, UnitType } from '../core/types';
export const MAX_UNITS=6, MAX_WAVE=12;
export const UNIT_TYPES:Record<UnitType,{name:string;color:string;atk:number;hp:number;spd:number;crit:number}>={
  guard:{name:'Warrior',color:'#4c7ac3',atk:14,hp:38,spd:1.00,crit:.08},
  cavalry:{name:'Cavalry',color:'#d89b58',atk:15,hp:31,spd:1.18,crit:.11},
  ranger:{name:'Archer',color:'#4d9b66',atk:13,hp:27,spd:1.25,crit:.14},
  mage:{name:'Mage',color:'#8b63cb',atk:16,hp:24,spd:.94,crit:.10},
  prism:{name:'Prism',color:'#aecbff',atk:24,hp:44,spd:1.18,crit:.20}
};
export const REEL_KEYS:UnitType[]=['guard','cavalry','ranger','mage'];
export const LINES:Payline[]=[
  {id:'r1',name:'上排',cells:[0,1,2],pts:'0,17 50,17 100,17'}, {id:'r2',name:'中排',cells:[3,4,5],pts:'0,50 50,50 100,50'}, {id:'r3',name:'下排',cells:[6,7,8],pts:'0,83 50,83 100,83'},
  {id:'c1',name:'左列',cells:[0,3,6],pts:'17,0 17,50 17,100'}, {id:'c2',name:'中列',cells:[1,4,7],pts:'50,0 50,50 50,100'}, {id:'c3',name:'右列',cells:[2,5,8],pts:'83,0 83,50 83,100'},
  {id:'d1',name:'主斜',cells:[0,4,8],pts:'0,0 50,50 100,100'}, {id:'d2',name:'副斜',cells:[2,4,6],pts:'100,0 50,50 0,100'}
];
export const STAT_POOL:{id:StatId;label:string;suffix:string;min:number;max:number}[]=[
  {id:'atkPct',label:'ATK',suffix:'%',min:6,max:18},{id:'hpPct',label:'HP',suffix:'%',min:7,max:22},{id:'spdPct',label:'ATK SPD',suffix:'%',min:4,max:15},
  {id:'critPct',label:'CRIT',suffix:'%',min:2,max:8},{id:'lifesteal',label:'LIFESTEAL',suffix:'%',min:2,max:8},{id:'spellPower',label:'SPELL',suffix:'%',min:7,max:22}
];
export const IMPRINTS:Record<UnitType,Imprint[]>={
  guard:[{id:'thorns',name:'Thorns',desc:'受击时反射部分伤害',transfer:'full'},{id:'armorAura',name:'Armor Aura',desc:'前排生存能力提高',transfer:'partial'},{id:'shieldHit',name:'Aegis',desc:'承伤后有概率获得护盾',transfer:'partial'}],
  cavalry:[{id:'charge',name:'Charge',desc:'首次接敌伤害提高',transfer:'full'},{id:'momentum',name:'Momentum',desc:'连续攻击逐步提速',transfer:'partial'},{id:'vanguardRide',name:'Vanguard',desc:'前排承伤能力提高',transfer:'partial'}],
  ranger:[{id:'execute',name:'Hunter',desc:'对低生命目标伤害提高',transfer:'full'},{id:'doubleShot',name:'Twinshot',desc:'攻击有概率追加一发',transfer:'partial'},{id:'goldKill',name:'Bounty',desc:'击杀具有经济倾向',transfer:'partial'}],
  mage:[{id:'spellCrit',name:'Spell Crit',desc:'法术暴击倾向提高',transfer:'full'},{id:'deathEcho',name:'Death Echo',desc:'击杀后强化下一次法术',transfer:'partial'},{id:'arcaneEcho',name:'Arcane Echo',desc:'法术更容易产生额外溅射',transfer:'partial'}],
  prism:[{id:'prismCore',name:'Prismatic',desc:'传奇单位专属 Imprint',transfer:'none'}]
};
export const EVOLUTION:Partial<Record<UnitType,{progress:number;star:number;name:string;atk:number;hp:number;spd:number;crit:number}[]>>={
  guard:[{progress:0,star:1,name:'Warrior',atk:1,hp:1,spd:1,crit:0},{progress:4,star:2,name:'Paladin',atk:1.10,hp:1.24,spd:1,crit:0},{progress:10,star:3,name:'Veil',atk:1.13,hp:1.42,spd:1.02,crit:.02}],
  mage:[{progress:0,star:1,name:'Mage',atk:1,hp:1,spd:1,crit:0},{progress:4,star:2,name:'Sorcerer',atk:1.22,hp:1.06,spd:1.06,crit:.03},{progress:10,star:3,name:'Necro Lord',atk:1.46,hp:1.12,spd:1.08,crit:.06}]
};
export const ADVANCED:Partial<Record<UnitType,{name:string;atk:number;hp:number;spd:number;crit:number}>>={
  mage:{name:'Sorcerer',atk:1.22,hp:1.08,spd:1.08,crit:.04},guard:{name:'Veteran Warrior',atk:1.12,hp:1.20,spd:1.02,crit:.01},ranger:{name:'Veteran Archer',atk:1.18,hp:1.06,spd:1.10,crit:.04},cavalry:{name:'Heavy Cavalry',atk:1.17,hp:1.16,spd:1.05,crit:.02}
};
export const ITEMS:ItemDef[]=[
 {id:'repair',kind:'repair',name:'Repair Kit',desc:'使用后 HEART +5。',price:70,tag:'ITEM · REPAIR'},
 {id:'war_tonic',kind:'atk',name:'War Tonic',desc:'下一场战斗全队 ATK +18%。',price:90,tag:'ITEM · COMBAT'},
 {id:'armor_plate',kind:'hp',name:'Armor Plate',desc:'下一场战斗全队最大 HP +22%。',price:90,tag:'ITEM · COMBAT'},
 {id:'first_guard',kind:'first_guard',name:'Guardian Charm',desc:'下一场战斗第一个承伤单位短暂无敌。',price:95,tag:'ITEM · DEF'},
 {id:'warrior_chip',kind:'bias',name:'Warrior Chip',desc:'接下来 2 次 Spin 提高 Warrior 权重。',price:75,tag:'ITEM · RNG',classId:'guard'},
 {id:'mage_chip',kind:'bias',name:'Mage Chip',desc:'接下来 2 次 Spin 提高 Mage 权重。',price:75,tag:'ITEM · RNG',classId:'mage'},
 {id:'archer_chip',kind:'bias',name:'Archer Chip',desc:'接下来 2 次 Spin 提高 Archer 权重。',price:75,tag:'ITEM · RNG',classId:'ranger'}
];
export const CORES:CoreDef[]=[
 {id:'first_spin_retry',name:'Second Chance',desc:'每波第一次 Spin 空振时免费重投。',price:175,tag:'CORE · REEL'},
 {id:'jester_hat',name:'Jester Hat',desc:'Reel 中加入 Joker / Wildcard。',price:185,tag:'CORE · REEL'},
 {id:'golden_relic',name:'Golden Relic',desc:'Golden symbol 胜线使召唤单位 rarity +1。',price:190,tag:'CORE · REEL'},
 {id:'echo',name:'Echo Core',desc:'空振返还部分 Gold；连续空振返还更多。',price:170,tag:'CORE · ECON'},
 {id:'warrior_bias',name:'Warrior Bias',desc:'持续提高 Warrior symbol 权重。',price:165,tag:'CORE · RNG'},
 {id:'mage_bias',name:'Mage Bias',desc:'持续提高 Mage symbol 权重。',price:165,tag:'CORE · RNG'},
 {id:'archer_bias',name:'Archer Bias',desc:'持续提高 Archer symbol 权重。',price:165,tag:'CORE · RNG'},
 {id:'merchant',name:'Merchant Core',desc:'Shop 购买价格降低。',price:180,tag:'CORE · SHOP'},
 {id:'vanguard',name:'Vanguard Core',desc:'前排单位最大 HP 提高。',price:180,tag:'CORE · FORMATION'}
];
export const ENEMIES:Record<EnemyType,{name:string;hp:number;atk:number;spd:number;icon:string}>={
 crawler:{name:'Crawler',hp:30,atk:8,spd:1.05,icon:'C'}, brute:{name:'Brute',hp:56,atk:13,spd:.72,icon:'B'}, spitter:{name:'Spitter',hp:36,atk:10,spd:.92,icon:'S'}, seer:{name:'Seer',hp:42,atk:9,spd:.82,icon:'E'}, boss:{name:'Beholder',hp:180,atk:22,spd:.82,icon:'B'}
};
