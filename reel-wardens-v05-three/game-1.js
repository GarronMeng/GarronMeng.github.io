const TYPES={
 guard:{name:'守卫',color:'#6ea8ff',atk:8,hp:46,spd:.9,crit:.06,imprints:['铁壁','守望','荆棘']},
 ranger:{name:'游侠',color:'#6fd18a',atk:12,hp:28,spd:1.35,crit:.16,imprints:['猎手','连射','鹰眼']},
 mage:{name:'术士',color:'#a77df3',atk:15,hp:24,spd:1.0,crit:.11,imprints:['涌流','穿透','余烬']},
 medic:{name:'医师',color:'#ef84ad',atk:6,hp:31,spd:.95,crit:.05,imprints:['祝佑','回春','屏障']},
 rogue:{name:'影刃',color:'#e9ad5a',atk:13,hp:25,spd:1.55,crit:.22,imprints:['伏击','割裂','连斩']},
 prism:{name:'虹晶使徒',color:'#f7df87',atk:22,hp:42,spd:1.22,crit:.25,imprints:['折光']}
};
const TYPE_KEYS=['guard','ranger','mage','medic','rogue'];
const LINES=[
 {cells:[0,1,2],name:'上排',pts:'16,16 50,16 84,16'},
 {cells:[3,4,5],name:'中排',pts:'16,50 50,50 84,50'},
 {cells:[6,7,8],name:'下排',pts:'16,84 50,84 84,84'},
 {cells:[0,3,6],name:'左列',pts:'16,16 16,50 16,84'},
 {cells:[1,4,7],name:'中列',pts:'50,16 50,50 50,84'},
 {cells:[2,5,8],name:'右列',pts:'84,16 84,50 84,84'},
 {cells:[0,4,8],name:'主斜',pts:'16,16 50,50 84,84'},
 {cells:[2,4,6],name:'副斜',pts:'84,16 50,50 16,84'}
];
const REWARDS=[
 {id:'loaded',tag:'CORE · RNG',name:'偏置线路',desc:'第 2 次转动后，额外 +28% 概率强制形成一条共鸣线。'},
 {id:'echo',tag:'CORE · ECON',name:'回声引擎',desc:'空转返还 3 补给。连续空转时再额外返还 1。'},
 {id:'surge',tag:'CORE · SLOT',name:'增殖回路',desc:'每条命中线有 20% 概率额外生成 1 个同职业单位。'},
 {id:'fusion',tag:'ITEM · GROWTH',name:'吞噬徽记',desc:'融合继承的攻击与生命额外 +18%。'},
 {id:'overclock',tag:'ITEM · DPS',name:'过载齿轮',desc:'全队攻击 +16%，攻速 +6%。'},
 {id:'bulwark',tag:'ITEM · DEF',name:'城垒核心',desc:'全队最大生命 +22%，守卫额外 +10%。'},
 {id:'clinic',tag:'SYNERGY · MEDIC',name:'野战诊所',desc:'医师治疗 +35%，溢出治疗会转化为护盾。'},
 {id:'arcane',tag:'SYNERGY · MAGE',name:'奥术导体',desc:'术士攻击会溅射第二目标，觉醒后可链向第三目标。'},
 {id:'hunt',tag:'SYNERGY · RANGER',name:'狩猎誓约',desc:'游侠暴击 +18%，处决低血量目标后立刻再射一次。'},
 {id:'thorns',tag:'SYNERGY · GUARD',name:'荆棘战旗',desc:'守卫承伤时反射 24% 伤害，并优先吸引敌人。'},
 {id:'shadow',tag:'SYNERGY · ROGUE',name:'夜刃契约',desc:'影刃暴击时有 70% 概率追加一次 55% 伤害的追击。'},
 {id:'salvage',tag:'ITEM · ECON',name:'战地回收',desc:'每波胜利额外 +5 补给，Boss 波额外 +8。'}
];
const EVOS={
 guard:[{id:'bastion',name:'堡垒',desc:'生命 +35%，反伤 +15%',atk:1,hp:1.35,spd:1,crit:0},{id:'crusader',name:'圣卫',desc:'攻击 +30%，每次出手获得护盾',atk:1.3,hp:1.08,spd:1.05,crit:.03}],
 ranger:[{id:'sniper',name:'神射手',desc:'攻击 +38%，暴击 +12%',atk:1.38,hp:1,spd:.92,crit:.12},{id:'wind',name:'逐风者',desc:'攻速 +28%，处决能力强化',atk:1.08,hp:1,spd:1.28,crit:.05}],
 mage:[{id:'archon',name:'奥术师',desc:'攻击 +32%，溅射强化',atk:1.32,hp:1,spd:1,crit:.05},{id:'storm',name:'唤雷者',desc:'攻速 +18%，连锁概率提升',atk:1.12,hp:1,spd:1.18,crit:.04}],
 medic:[{id:'oracle',name:'神谕者',desc:'治疗 +45%，护盾强化',atk:1.16,hp:1.18,spd:1,crit:0},{id:'combat',name:'战地医师',desc:'攻击 +55%，治疗与输出兼顾',atk:1.55,hp:1.08,spd:1.12,crit:.08}],
 rogue:[{id:'assassin',name:'刺杀者',desc:'暴击 +18%，暴伤提升',atk:1.22,hp:1,spd:1.12,crit:.18},{id:'duelist',name:'决斗者',desc:'攻速 +24%，连续攻击强化',atk:1.12,hp:1.08,spd:1.24,crit:.06}]
};
const ETYPE={
 crawler:{name:'蚀行体',hp:25,atk:7,spd:1.0,icon:'C'}, brute:{name:'碾压兽',hp:46,atk:12,spd:.75,icon:'B'},
 spitter:{name:'裂口者',hp:29,atk:9,spd:1.18,icon:'S'}, seer:{name:'异目祭司',hp:33,atk:9,spd:.9,icon:'E'},
 boss:{name:'终局监察者',hp:135,atk:18,spd:.9,icon:'Ω'}
};
const MAX_UNITS=6,MAX_WAVE=12,STORE='rw_v04_high';
let timers={spin:[],battle:null};
let st=fresh();
window.__RW_GET_STATE=()=>st;
window.__RW_RERENDER=()=>render();
function fresh(){return{screen:'menu',phase:'prep',wave:1,base:24,gold:30,score:0,high:readHigh(),board:Array.from({length:9},()=>weightedKey()),spinCount:0,spinCost:5,cal:1,calArmed:false,units:[],selected:null,rewards:[],lines:[],hitCells:[],toast:'先用转轮凑出单位，再开始第一波。',battle:null,jack:false,rewardChoices:[],evo:null,runDone:false,blankStreak:0,spinning:false,battleSpeed:1,legendary:false};}
function readHigh(){try{return Number(localStorage.getItem(STORE)||0)||0}catch(e){return 0}}
function saveHigh(){try{localStorage.setItem(STORE,String(st.high))}catch(e){}}
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function own(id){return st.rewards.some(x=>x.id===id)}
function chance(p){return Math.random()<p} function pick(a){return a[Math.floor(Math.random()*a.length)]} function ri(n){return Math.floor(Math.random()*n)}
function weightedKey(){const weights={guard:25,ranger:22,mage:19,medic:18,rogue:16};let r=Math.random()*100;for(const k of TYPE_KEYS){r-=weights[k];if(r<=0)return k}return'guard'}
