(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const STORAGE_KEY='odyssey-cat-v2-state';
const blankState={mode:'25 分钟标准版',scores:{health:5,work:5,play:5,love:5},red:'',redWhy:'',problemType:'',coreProblem:'',gravityNote:'',workValues:[],lifeValues:[],gainers:[],drainers:[],anchor:'',anchorText:'',routes:{A:{future:'',gain:'',risk:''},B:{future:'',gain:'',risk:''},C:{future:'',gain:'',risk:''}},step:0};
let state=load();
let step=Math.min(Math.max(Number(state.step)||0,0),7);
let routeTab='A';
let pendingAdvance=false;

const scenes=[
 {chapter:'序章',kicker:'从这里出发',title:'你不需要先想清楚。',desc:'人生不是一道只能答对一次的题。今天只需带着一点好奇，和这只小猫一起往前走。',caption:'我们先决定走多远，不急着决定去哪里。',art:'camp'},
 {chapter:'第一章',kicker:'四盏灯的小屋',title:'先看见，你在哪里。',desc:'健康、工作、娱乐与爱，构成了此刻人生的四盏灯。打分不是评判，只是读懂仪表盘。',caption:'亮得暗一点的灯，不代表你失败了。它只是正在发信号。',art:'lights'},
 {chapter:'第二章',kicker:'雾中的路牌',title:'把模糊的焦虑，说成一句话。',desc:'当一个困扰有了名字，它才从无边的雾，变成可以靠近观察的路牌。',caption:'先把它写下来。答案不需要漂亮，只需要真实。',art:'fog'},
 {chapter:'第三章',kicker:'山与风',title:'有些山要翻，有些山要绕。',desc:'重力问题无法靠更努力消失；可设计问题则可以拆成行动与反馈。先把两者分开。',caption:'承认山在那里，不是认输，是重新选择走法。',art:'mountain'},
 {chapter:'第四章',kicker:'指南针草地',title:'什么才是你的正北？',desc:'工作观与人生观不需要完全一致，但它们的张力必须被看见，否则路线会越走越偏。',caption:'指南针不会替你走路，但它能提醒你为什么出发。',art:'compass'},
 {chapter:'第五章',kicker:'能量森林',title:'听见身体比语言更诚实的回答。',desc:'擅长不等于适合。真正可持续的路线，要关注哪些事让你活过来，哪些事在悄悄抽干你。',caption:'未来的路，应该多经过让你发亮的地方。',art:'forest'},
 {chapter:'第六章',kicker:'旧锚小河',title:'松开一个曾经保护你的执念。',desc:'有些信念过去帮你获得安全，如今却可能把你钉在原地。我们不砍断它，只重新理解它。',caption:'旧锚不是敌人。只是船已经准备去更远的水面。',art:'anchor'},
 {chapter:'终章',kicker:'三条地平线',title:'把三种可能，都认真写下来。',desc:'当前延展、替代人生、无惧目光。三条路地位平等，都值得用一个小原型去试。',caption:'你不是在选唯一人生，而是在设计三种可以靠近的自己。',art:'fork'}
];
const feedbacks=[
 {title:'旅程开始了',text:'你已经做了第一个重要决定：不再等待一个完整答案，而是允许自己从一个小版本开始。',icon:'star'},
 {title:'四盏灯被看见了',text:'看见失衡，不是给自己打低分。你只是把模糊的不适，翻译成了可观察的信号。',icon:'lamp'},
 {title:'雾散开了一点',text:'你不需要一次说清全部人生。能把最卡的部分写成一句话，已经让问题从情绪变成了材料。',icon:'sign'},
 {title:'墙与门分开了',text:'现实边界不再需要被硬撞。你可以把力气收回来，放到真正能够被行动影响的变量上。',icon:'mountain'},
 {title:'指南针出现了',text:'你正在看见：自己追求的可能不是单一目标，而是一组需要被同时照顾的价值。',icon:'compass'},
 {title:'森林有了明暗',text:'你开始区分“我做得来”和“这件事让我有生命力”。这是未来路线能否持续的关键。',icon:'leaf'},
 {title:'旧锚松了一点',text:'你没有否定过去的自己，只是允许过去的保护方式升级。这是一种更成熟的自由。',icon:'anchor'}
];
const multiFields=['workValues','lifeValues','gainers','drainers'];
const optionSets={
 mode:[['10 分钟速通版','快速获得三条路线草图'],['25 分钟标准版','推荐：完整路线与行动卡'],['45 分钟深水版','更细地拆解执念与原型']],
 problemType:[['不知道未来该走哪条路','方向模糊'],['想换工作或转型，但不敢','转场风险'],['想赚钱，但不想被工作吞掉','收入与自由'],['现在的人生很消耗','能量失衡'],['有很多想法，但一直没开始','启动困难'],['被家庭、关系或责任卡住','外部约束'],['不知道自己真正想要什么','价值模糊'],['其他','用自己的话写']],
 workValues:[['赚钱和安全感',''],['成长和能力提升',''],['影响他人',''],['创造作品',''],['身份与认可',''],['自由安排生活',''],['与优秀的人合作',''],['服务更大的议题','']],
 lifeValues:[['我变得更自由',''],['我赚到了足够的钱',''],['我做出了自己的作品或事业',''],['我帮助了一类人',''],['我拥有更稳定的关系',''],['我变得更健康、更松弛',''],['我获得了社会认可',''],['我不再被恐惧驱动','']],
 gainers:[['和人深度交流',''],['做策略分析',''],['写作与表达',''],['做项目推进',''],['研究复杂问题',''],['帮别人解决困境',''],['组织活动',''],['做视觉、内容或产品',''],['学习新工具',''],['独处恢复','']],
 drainers:[['重复沟通',''],['情绪劳动',''],['应付层级关系',''],['琐碎执行',''],['无意义会议',''],['纯销售转化',''],['被动响应需求',''],['长时间社交',''],['没有反馈的工作',''],['临时救火','']],
 anchor:[['必须在当前行业里证明自己',''],['必须赚到某个数字才有资格改变',''],['必须等准备好了再开始',''],['必须获得别人认可',''],['必须找到热爱才能行动',''],['必须一次选对',''],['必须先稳定再自由',''],['我暂时想不到','']]
};

function load(){try{return Object.assign(structuredClone(blankState),JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'))}catch{return structuredClone(blankState)}}
function save(){state.step=step;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function e(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function selected(field,value){return Array.isArray(state[field])?state[field].includes(value):state[field]===value}
function options(field,items,single=false){return `<div class="option-grid ${single?'single':''}">${items.map(([v,s],i)=>`<button type="button" class="option ${selected(field,v)?'selected':''}" data-field="${field}" data-value="${e(v)}"><span class="option-index">${String(i+1).padStart(2,'0')}</span><span class="option-text">${e(v)}${s?`<small>${e(s)}</small>`:''}</span></button>`).join('')}</div>`}
function insight(text){return `<div class="insight"><b>设计师观察：</b>${text}</div>`}
function list(arr,fallback='尚未选择'){return arr&&arr.length?arr.join('、'):fallback}

function initMap(){const map=$('#journeyMap');map.innerHTML=scenes.map((_,i)=>`${i?'<span class="map-line"></span>':''}<span class="map-node" data-node="${i}"></span>`).join('')}
function updateMap(){$$('.map-node').forEach((n,i)=>{n.classList.toggle('done',i<step);n.classList.toggle('current',i===step)})}
function sceneSVG(type){
 const common=`stroke="#344039" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"`;
 const map={
 camp:`<svg viewBox="0 0 520 360" fill="none"><path d="M74 276c96-58 251-47 365 6" ${common} opacity=".22"/><path d="M199 267 264 148l70 119Z" fill="#E8D8B8" ${common}/><path d="m264 148 7 119" ${common}/><path d="M234 201h60" ${common} opacity=".55"/><path d="M114 279c8-34 22-51 43-51s33 18 40 51" fill="#BECFB5" ${common}/><path d="M137 228v-32M128 202c8-8 19-8 28 0" ${common}/><circle cx="390" cy="118" r="35" fill="#E6B96B" opacity=".62"/><path d="M371 301c8-21 18-29 30-29 14 0 23 9 30 29" fill="#D8C49D" ${common}/></svg>`,
 lights:`<svg viewBox="0 0 520 360" fill="none"><path d="M115 281V161l143-75 145 75v120" fill="#F4EAD6" ${common}/><path d="M97 166 258 80l163 86" ${common}/><path d="M229 281v-72h58v72" fill="#C4A67A" ${common}/>${[0,1,2,3].map((_,i)=>`<g transform="translate(${143+i*68} 176)"><rect width="42" height="54" rx="17" fill="${i===0?'#E7C36F':'#C7D6C0'}" ${common}/><path d="M21 54v25M10 79h22" ${common}/><circle cx="21" cy="26" r="8" fill="#FFF4C8" opacity=".8"/></g>`).join('')}<path d="M83 300c110-20 242-20 354 0" ${common} opacity=".2"/></svg>`,
 fog:`<svg viewBox="0 0 520 360" fill="none"><g opacity=".5" stroke="#71827A" stroke-width="18" stroke-linecap="round"><path d="M56 125h250M163 170h300M55 218h360"/><path d="M192 262h273"/></g><path d="M282 292V134" ${common}/><path d="M282 145h137l-26 34H282Z" fill="#EADDBF" ${common}/><path d="M282 200H157l25 34h100Z" fill="#D6E0D1" ${common}/><path d="M253 292h58" ${common}/><path d="M333 159h44M199 216h43" ${common} opacity=".52"/></svg>`,
 mountain:`<svg viewBox="0 0 520 360" fill="none"><path d="M44 294 210 96l66 86 49-59 151 171Z" fill="#B7C6B7" ${common}/><path d="m210 96 31 98 35-12M325 123l18 84 35-18" ${common} opacity=".55"/><path d="M46 294c91-25 173-18 235 0 69 20 130 20 193 0" ${common} opacity=".3"/><path d="M227 294c19-36 45-52 75-50 32 2 56 20 77 50" fill="#E6D4B5" ${common}/><path d="M299 244c3 19 5 35 5 50" ${common} stroke-dasharray="8 8"/></svg>`,
 compass:`<svg viewBox="0 0 520 360" fill="none"><circle cx="285" cy="188" r="104" fill="#F4EBD9" ${common}/><circle cx="285" cy="188" r="77" ${common} opacity=".45"/><path d="m285 102 23 86-23 86-23-86Z" fill="#D2A95F" ${common}/><path d="m201 188 84-23 84 23-84 23Z" fill="#91A993" ${common}/><circle cx="285" cy="188" r="9" fill="#344039"/><path d="M285 72v-25M285 329v-25M169 188h-25M426 188h-25" ${common}/><text x="278" y="45" fill="#344039" font-family="serif" font-size="22">N</text><path d="M87 294c78-17 153-14 220 0 57 12 104 12 142 0" ${common} opacity=".24"/></svg>`,
 forest:`<svg viewBox="0 0 520 360" fill="none">${[76,142,215,303,388,451].map((x,i)=>`<g transform="translate(${x} ${88+(i%2)*25})"><path d="M0 198V76" ${common}/><path d="M0 0-49 91h98Z" fill="${i%2?'#ABC2A7':'#C2D0B8'}" ${common}/><path d="M0 36-39 121h78Z" fill="${i%2?'#91AA91':'#B3C4AA'}" ${common}/></g>`).join('')}<path d="M45 303c116-22 303-22 430 0" ${common} opacity=".25"/><path d="M238 304c8-47 21-76 43-76s36 29 43 76" fill="#D8C49D" ${common}/><path d="M281 227v78" ${common} stroke-dasharray="7 8"/></svg>`,
 anchor:`<svg viewBox="0 0 520 360" fill="none"><path d="M39 266c78-31 152-25 222 0 75 27 150 28 222 0" stroke="#789AA0" stroke-width="16" stroke-linecap="round" opacity=".43"/><path d="M38 294c82-24 157-17 225 3 77 22 148 23 220-2" ${common} opacity=".34"/><circle cx="265" cy="104" r="32" fill="#F1E7D3" ${common}/><path d="M265 136v132M218 185h94" ${common}/><path d="M196 234c15 42 38 61 69 61 32 0 55-20 70-61M196 234l-22 30M335 234l22 30" ${common}/><path d="M314 158c31 15 49 37 51 67" ${common} stroke-dasharray="7 8" opacity=".45"/></svg>`,
 fork:`<svg viewBox="0 0 520 360" fill="none"><path d="M256 318c0-59 2-104 7-134 5-31 4-62-3-94" stroke="#D4BE94" stroke-width="46" stroke-linecap="round"/><path d="M262 190c-9-43-46-66-111-87M264 191c9-44 48-68 116-91" stroke="#D4BE94" stroke-width="39" stroke-linecap="round"/><path d="M256 318c0-59 2-104 7-134 5-31 4-62-3-94M262 190c-9-43-46-66-111-87M264 191c9-44 48-68 116-91" ${common} stroke-dasharray="8 10" opacity=".35"/><path d="M260 199V96" ${common}/><path d="M260 111H129l24 31h107ZM260 154h138l-25 31H260Z" fill="#F2E6CF" ${common}/><circle cx="260" cy="72" r="25" fill="#E5B766" opacity=".66"/><path d="M82 313c113-17 249-16 357 0" ${common} opacity=".25"/></svg>`
 };return map[type]||map.camp;
}
function mementoSVG(type){const s=`stroke="#344039" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;const m={star:`<svg viewBox="0 0 48 48" fill="none"><path d="m24 6 4.7 12.1L41 23l-12.3 4.9L24 42l-4.7-14.1L7 23l12.3-4.9Z" fill="#E8C678" ${s}/></svg>`,lamp:`<svg viewBox="0 0 48 48" fill="none"><path d="M15 28c0-8 4-14 9-14s9 6 9 14v4H15Z" fill="#E8C678" ${s}/><path d="M24 14V7M18 37h12M24 32v5" ${s}/></svg>`,sign:`<svg viewBox="0 0 48 48" fill="none"><path d="M24 42V10M24 13h16l-4 7H24M24 25H9l4 7h11" ${s}/></svg>`,mountain:`<svg viewBox="0 0 48 48" fill="none"><path d="M4 39 20 12l8 12 5-8 11 23Z" fill="#B8C8B4" ${s}/><path d="M20 12l3 13 5-1" ${s}/></svg>`,compass:`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="17" ${s}/><path d="m24 11 5 13-5 13-5-13Z" fill="#D8AA5F" ${s}/></svg>`,leaf:`<svg viewBox="0 0 48 48" fill="none"><path d="M39 9C20 10 9 20 10 36c15 1 27-8 29-27Z" fill="#B7CBB2" ${s}/><path d="M12 35c7-8 14-14 24-22" ${s}/></svg>`,anchor:`<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="10" r="5" ${s}/><path d="M24 15v22M15 22h18M10 32c3 7 8 10 14 10s11-3 14-10M10 32l-4 5M38 32l4 5" ${s}/></svg>`};return m[type]||m.star}
function render(){
 const s=scenes[step];
 $('#chapterLabel').textContent=`${s.chapter} · ${step+1}/${scenes.length}`;
 $('#sceneKicker').textContent=s.kicker;$('#sceneTitle').textContent=s.title;$('#sceneDesc').textContent=s.desc;$('#caption').textContent=s.caption;$('#stepCounter').textContent=`${step+1} / ${scenes.length}`;
 $('#backBtn').disabled=step===0;$('#nextBtn').textContent=step===7?'生成三张路线卡':'走向下一页';
 updateMap();updateScene(s);$('#questionView').innerHTML=view();bindView();save();
 requestAnimationFrame(()=>$('#panelScroll').scrollTo({top:0,behavior:'smooth'}));
}
function updateScene(s){
 const art=$('#sceneArt');art.classList.add('changing');setTimeout(()=>{art.innerHTML=sceneSVG(s.art);art.classList.remove('changing')},260);
 const pct=step/(scenes.length-1);const world=$('#world');world.style.background=[
 'linear-gradient(180deg,#dce8e8 0%,#edf0e3 60%,#d7dfc4 100%)','linear-gradient(180deg,#dfe9e5 0%,#f1eddf 58%,#d8dfc7 100%)','linear-gradient(180deg,#d5dfdf 0%,#e8e7dc 58%,#d1dac4 100%)','linear-gradient(180deg,#ccd9db 0%,#e5e5dc 58%,#c5d2bf 100%)','linear-gradient(180deg,#d9e6e3 0%,#eef0df 58%,#d3dfc6 100%)','linear-gradient(180deg,#d2e0d9 0%,#e7ecdb 58%,#bfd0b5 100%)','linear-gradient(180deg,#dce7e4 0%,#eef0df 58%,#c8d7c0 100%)','linear-gradient(180deg,#d8e4e5 0%,#f0eadb 58%,#d5ddc3 100%)'][step];
 const shift=step*38;$('#far').style.transform=`translateX(${-shift*.25}px)`;$('#mid').style.transform=`translateX(${-shift*.55}px)`;$('#front').style.transform=`translateX(${-shift*.85}px)`;$('#road').style.transform=`translateX(${-shift}px)`;
 const max=Math.max(0,Math.min(window.innerWidth*.33,300));$('#cat').style.setProperty('--cat-x',`${pct*max}px`);$('#caption').classList.remove('pop');requestAnimationFrame(()=>$('#caption').classList.add('pop'));
}
function view(){
 if(step===0)return `<h2 class="question">你今天想走多远？</h2><p class="hint">标准版适合第一次体验。它足够完整，也不会变成一场沉重的咨询。</p>${options('mode',optionSets.mode,true)}${insight('你不需要先知道自己热爱什么。我们会一边走，一边从你的选择、能量和现实边界里找线索。')}`;
 if(step===1)return `<h2 class="question">给四盏灯打分：0 到 10</h2><p class="hint">健康包含身体、情绪与心理；娱乐是纯粹为了快乐；爱是双向连接。</p><div class="range-list">${[['health','健康'],['work','工作'],['play','娱乐'],['love','爱']].map(([k,n])=>`<div class="range-row"><div class="range-top"><b>${n}</b><span class="range-value" id="score-${k}">${state.scores[k]}</span></div><input type="range" min="0" max="10" value="${state.scores[k]}" data-score="${k}" aria-label="${n}评分"></div>`).join('')}</div><div class="field"><label>现在最亮红灯的是哪一盏？</label>${options('red',[['健康',''],['工作',''],['娱乐',''],['爱','']])}</div><div class="field"><label for="redWhy">它为什么亮红灯？</label><textarea class="textarea" id="redWhy" placeholder="写下一两句真实原因……">${e(state.redWhy)}</textarea></div>`;
 if(step===2)return `<h2 class="question">你现在最卡的问题，更接近哪一种？</h2><p class="hint">先选最接近的一项，再用一句话把它说得更像你自己的问题。</p>${options('problemType',optionSets.problemType)}<div class="field"><label for="coreProblem">如果只能用一句话说</label><textarea class="textarea" id="coreProblem" placeholder="我现在最卡的是……">${e(state.coreProblem)}</textarea></div>${insight('不需要把所有背景交代完整。我们此刻只寻找那个最影响系统稳定性的核心卡点。')}`;
 if(step===3){const g=gravity();return `<h2 class="question">先把不能推动的墙，和可以打开的门分开。</h2><p class="hint">这是当前答案的初步重定义。它不是判决，你可以补充或修正。</p><div class="split-box"><div class="logic-box"><div class="tag">重力条件</div><p>${e(g.gravity)}</p></div><div class="logic-box design"><div class="tag">可设计问题</div><p>${e(g.design)}</p></div></div><div class="field"><label for="gravityNote">哪里说得不够准确？</label><textarea class="textarea" id="gravityNote" placeholder="我觉得真正可以动手的部分是……">${e(state.gravityNote)}</textarea></div>${insight(`你原先描述的是“${e(state.coreProblem||state.problemType||'一个仍然模糊的问题')}”。重新定义后，下一步不再是解决全部人生，而是验证一个可控制的变量。`)}`}
 if(step===4)return `<h2 class="question">选择对你最重要的价值</h2><p class="hint">每组最多选 3 项。数量限制会迫使真正重要的东西浮出来。</p><div class="field"><label>工作为什么值得你投入时间？</label>${options('workValues',optionSets.workValues)}</div><div class="field"><label>五年后，怎样才算这段人生没有白过？</label>${options('lifeValues',optionSets.lifeValues)}</div>${insight(`工作观与人生观之间如果存在拉扯，不代表你价值混乱。它意味着未来路线需要同时优化多个目标，而不是只追一个数字。`)}`;
 if(step===5)return `<h2 class="question">哪些事情让你亮起来，哪些事情让你暗下去？</h2><p class="hint">每组最多选 3 项。这里不评价能力，只记录能量。</p><div class="field"><label>做完虽然累，但精神是亮的</label>${options('gainers',optionSets.gainers)}</div><div class="field"><label>明明做得不错，却会被抽干</label>${options('drainers',optionSets.drainers)}</div>${insight('高能力、低能量的事情常被误认为“优势”。它们可能让你表现很好，却让人生越来越窄。')}`;
 if(step===6)return `<h2 class="question">有没有一个你守了很久的旧规则？</h2><p class="hint">它可能曾经保护你，但现在也可能限制你。</p>${options('anchor',optionSets.anchor)}<div class="field"><label for="anchorText">完成这三个填空</label><textarea class="textarea" id="anchorText" placeholder="我死守的是……\n它背后真正想保护的是……\n如果不用这个方式保护，我还可以尝试……">${e(state.anchorText)}</textarea></div>`;
 if(step===7){const r=state.routes[routeTab];const meta={A:['航线 A｜当前延展版','如果沿着现在已经在走的方向继续优化'],B:['航线 B｜替代人生版','如果现有路径突然消失，我会认真考虑'],C:['航线 C｜无惧目光版','如果暂时不用顾虑钱和评价，我真正想靠近']}[routeTab];return `<h2 class="question">给三条路线各留下一幅五年画面</h2><p class="hint">不需要写完整计划。每条路线写三小段，系统会整理成可分享的详细路线卡。</p><div class="route-tabs">${['A','B','C'].map(k=>`<button class="route-tab ${routeTab===k?'active':''}" data-route-tab="${k}">${k} 路线</button>`).join('')}</div><div class="insight" style="margin-top:0"><b>${meta[0]}</b><br>${meta[1]}</div><div class="field"><label for="routeFuture">五年后的工作与生活画面</label><textarea class="textarea" id="routeFuture" placeholder="我主要在做什么、和谁在一起、怎样生活……">${e(r.future)}</textarea></div><div class="field"><label for="routeGain">我希望这条路带给我</label><input class="input" id="routeGain" value="${e(r.gain)}" placeholder="例如：自主权、稳定、创造感、影响力"></div><div class="field"><label for="routeRisk">我最担心它让我失去</label><input class="input" id="routeRisk" value="${e(r.risk)}" placeholder="例如：健康、收入、关系、确定性"></div><p class="empty-note" id="routeNote">三条路线都需要留下一点内容。</p>`}
 return '';
}
function bindView(){
 $$('.option').forEach(btn=>btn.addEventListener('click',()=>toggleOption(btn.dataset.field,btn.dataset.value)));
 $$('[data-score]').forEach(r=>r.addEventListener('input',()=>{state.scores[r.dataset.score]=Number(r.value);$('#score-'+r.dataset.score).textContent=r.value;save()}));
 ['redWhy','coreProblem','gravityNote','anchorText'].forEach(id=>{const el=$('#'+id);if(el)el.addEventListener('input',()=>{state[id]=el.value;save()})});
 $$('[data-route-tab]').forEach(b=>b.addEventListener('click',()=>{captureRoute();routeTab=b.dataset.routeTab;$('#questionView').innerHTML=view();bindView()}));
 [['routeFuture','future'],['routeGain','gain'],['routeRisk','risk']].forEach(([id,k])=>{const el=$('#'+id);if(el)el.addEventListener('input',()=>{state.routes[routeTab][k]=el.value;save()})});
}
function toggleOption(field,value){
 if(multiFields.includes(field)){state[field]=state[field]||[];const i=state[field].indexOf(value);if(i>=0)state[field].splice(i,1);else if(state[field].length<3)state[field].push(value);else return toast('每组先保留 3 个，让真正重要的东西浮出来');}
 else state[field]=value;
 save();$('#questionView').innerHTML=view();bindView();
}
function captureRoute(){const f=$('#routeFuture'),g=$('#routeGain'),r=$('#routeRisk');if(f)state.routes[routeTab]={future:f.value,gain:g.value,risk:r.value};save()}
function validate(){
 if(step===0&&!state.mode)return '先选择今天的旅程长度';
 if(step===1&&(!state.red||!state.redWhy.trim()))return '选出最亮红灯的一盏，并写下一点原因';
 if(step===2&&(!state.problemType||!state.coreProblem.trim()))return '选一个问题类型，再用一句话写清当前卡点';
 if(step===4&&(state.workValues.length<1||state.lifeValues.length<1))return '工作观和人生观各选择至少一项';
 if(step===5&&(state.gainers.length<1||state.drainers.length<1))return '回血与耗电事项各选择至少一项';
 if(step===6&&!state.anchor)return '先选择一个最接近的旧规则';
 if(step===7){captureRoute();const complete=['A','B','C'].every(k=>state.routes[k].future.trim());if(!complete){$('#routeNote')?.classList.add('show');return '三条路线都需要写下五年画面'}}
 return '';
}
function gravity(){const p=(state.problemType+' '+state.coreProblem).toLowerCase();let gravity='他人的评价与选择、已经发生的过去、短期无法改变的行业和家庭环境。';let design='如何在既有边界下，用一个低成本行动验证更适合自己的下一步。';if(p.includes('赚钱')||p.includes('收入')){gravity='市场周期、别人是否付费、短期现金流压力，以及收益的不确定性。';design='如何保留基本安全边界，同时验证一个能够持续产生增量收入的原型。'}else if(p.includes('转型')||p.includes('工作')){gravity='过去履历已经形成、转型成本客观存在、他人不会立刻理解你的新身份。';design='如何把转型从一次性跳跃，改成可以并行测试、逐步积累证据的连续原型。'}else if(p.includes('消耗')||p.includes('累')){gravity='部分职责和组织结构短期不会消失，外部需求也不会完全按你的节奏出现。';design='如何降低高耗电事项的占比，并把高能量活动稳定放回日程和工作结构。'}else if(p.includes('家庭')||p.includes('关系')){gravity='他人是否理解、支持或改变，不由你单方面控制。';design='如何在不等待完全理解的情况下，设定边界、争取资源并推进自己的小步选择。'}else if(p.includes('不知道')||p.includes('方向')){gravity='不存在一个能够通过思考一次算出的唯一正确答案。';design='如何通过几次不同类型的真实体验，收集自己对方向的能量、能力与现实反馈。'}return{gravity,design}}
function next(){const err=validate();if(err)return toast(err);if(step===7)return finish();showCompletion()}
function showCompletion(){const f=feedbacks[step];$('#memento').innerHTML=mementoSVG(f.icon);$('#completionTitle').textContent=f.title;$('#completionText').textContent=f.text;pendingAdvance=true;$('#completion').classList.add('show')}
function advance(){if(!pendingAdvance)return;pendingAdvance=false;$('#completion').classList.remove('show');step++;$('#cat').classList.add('walking');setTimeout(()=>$('#cat').classList.remove('walking'),850);render()}
function back(){if(step>0){captureRoute();step--;render()}}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>t.classList.remove('show'),2200)}
function summarize(){return{red:state.red||'尚未选择',problem:state.coreProblem||state.problemType||'尚未填写',north:list(state.lifeValues),energy:list(state.gainers)}}
function titleFrom(kind){const candidates={A:['稳中造新路','在场内生长','把经验成作品'],B:['换场再生长','轻装去新岸','迁移旧能力'],C:['听见真心声','自由有回声','按本心生活']};const seed=(state.routes[kind].future+state.routes[kind].gain).length;return candidates[kind][seed%candidates[kind].length]}
function buildPlan(kind){
 const raw=state.routes[kind];const values=list(state.workValues,'成长、安全与自主');const life=list(state.lifeValues,'更自由、更健康、更像自己');const gain=list(state.gainers,'复杂问题、创造与深度交流');const drain=list(state.drainers,'重复响应和无意义消耗');
 let thesis,need,risk,timeline,tests,prototype,ratings;
 if(kind==='A'){
  thesis=raw.future||`沿着当前路径继续升级，把已有经验沉淀成专业资产，并在稳定现金流中逐步增加自主权。`;
  need=raw.gain||`${values}，以及对既有积累的尊重。`;risk=raw.risk||`继续被${drain}占满，稳定逐渐变成停滞。`;
  timeline=['盘点可迁移能力与关键资源','完成一个可被看见的小作品','获得第一轮真实用户或组织反馈','形成更高自主度的角色或副线','决定继续放大，还是转入另一航线'];
  tests=['现有路径能否实质增加自主权，而不只是增加责任？','你的经验能否被产品化，而不是继续依赖个人救火？','每周是否能稳定保留高能量时段？'];prototype='用 30 天把一项经验整理成一页服务、方法卡或可公开展示的作品，并邀请 3 人反馈。';ratings=[4,3,4,4];
 }else if(kind==='B'){
  thesis=raw.future||`如果当前路径消失，把已有能力迁移到一个更轻、更自主的新场域，从小规模真实交付重新建立身份。`;
  need=raw.gain||`选择权、抗脆弱能力，以及重新定义自己的空间。`;risk=raw.risk||`转场初期反馈稀少，不确定性让你过早退回旧轨道。`;
  timeline=['访谈 5 位已经完成类似迁移的人','用一天到一周体验新领域的真实日常','完成一次低成本试交付','积累案例、伙伴与基本收入证据','决定正式转场或与 A 路线融合'];
  tests=['哪一类人真正需要你迁移后的能力？','你是否喜欢替代路线的日常，而不只是喜欢它的想象？','怎样把转场风险切成可承受的阶段？'];prototype='安排 3 次人生设计采访，并完成一次不超过一周的影子体验、志愿项目或付费小单。';ratings=[3,4,3,4];
 }else{
  thesis=raw.future||`把更多时间交给真正让你发亮的事情，围绕${gain}重构工作、关系和生活节奏。`;
  need=raw.gain||`${life}，以及更真实的创造感和关系质量。`;risk=raw.risk||`理想画面缺少现实承载结构，最后只能停留在逃离想象。`;
  timeline=['先恢复身体与生活节奏','公开完成一个真正想做的作品','找到同频伙伴和小社群','建立轻商业或稳定支持系统','形成更自由但有边界的生活结构'];
  tests=['这条路能否找到现实的时间和收入承载结构？','你愿意持续投入，还是只把它当作逃离？','它与健康、关系和基本安全底线是否兼容？'];prototype='连续 4 周，每周投入一个固定半天，做出一个不为绩效、只为真实兴趣而存在的公开小作品。';ratings=[3,5,4,5];
 }
 return{kind,title:titleFrom(kind),label:kind==='A'?'当前延展版':kind==='B'?'替代人生版':'无惧目光版',thesis,need,risk,timeline,tests,prototype,ratings};
}
function routeVisual(kind){const palettes={A:['#DCE8E6','#B7CCB0','#D4BE96'],B:['#D7E1DC','#9FB59E','#D5BE94'],C:['#E7DFD0','#CFAD76','#DDC79E']};const p=palettes[kind];return `<svg viewBox="0 0 420 190" preserveAspectRatio="none"><rect width="420" height="190" fill="${p[0]}"/><circle cx="335" cy="48" r="26" fill="#F0C675" opacity=".75"/><path d="M0 139 65 103l66 25 78-65 71 63 72-39 68 52v51H0Z" fill="${p[1]}" opacity=".72"/><path d="M0 155c97-27 175-18 231 8 64 30 126 29 189 0v27H0Z" fill="${p[2]}"/><path d="M214 190c3-43 2-72-5-95M210 119c-14-18-31-30-54-38M210 119c17-20 37-33 62-40" stroke="#46534C" stroke-width="2" stroke-dasharray="6 8" fill="none" opacity=".45"/></svg>`}
function renderCard(plan,index){return `<article class="route-card" data-plan="${plan.kind}"><div class="route-visual ${plan.kind.toLowerCase()}">${routeVisual(plan.kind)}</div><div class="route-body"><div class="route-label">航线 ${plan.kind} · ${plan.label}</div><h2>${e(plan.title)}</h2><p class="route-thesis">${e(plan.thesis)}</p><section class="route-section"><h3>这条路真正满足</h3><p>${e(plan.need)}</p></section><section class="route-section"><h3>五年时间线</h3><div class="mini-timeline">${plan.timeline.map((x,i)=>`<div class="mini-year"><b>Y${i+1}</b><span>${e(x)}</span></div>`).join('')}</div></section><section class="route-section"><h3>值得验证的三个问题</h3><ul>${plan.tests.map(x=>`<li>${e(x)}</li>`).join('')}</ul></section><section class="route-section"><h3>30 天原型</h3><p>${e(plan.prototype)}</p></section><section class="route-section"><h3>最大风险</h3><p>${e(plan.risk)}</p></section><div class="ratings">${['物力','喜欢','自信','一致'].map((x,i)=>`<div class="rating"><strong>${plan.ratings[i]}</strong><span>${x}</span></div>`).join('')}</div><div class="card-actions"><button data-download-card="${index}">保存分享图</button><button data-copy-card="${index}">复制路线</button></div></div></article>`}
function finish(){captureRoute();const plans=['A','B','C'].map(buildPlan);const s=summarize();$('#resultSummary').innerHTML=[['当前红灯',s.red],['重新定义的问题',s.problem],['人生正北',s.north],['能量线索',s.energy]].map(([a,b])=>`<div class="summary-chip"><small>${a}</small><b>${e(b)}</b></div>`).join('');$('#cards').innerHTML=plans.map(renderCard).join('');$('#prototype').innerHTML=prototypeHTML(plans);$('#result').classList.add('show');document.body.style.overflow='hidden';bindResult(plans);save();}
function prototypeHTML(plans){const preferred=plans.sort((a,b)=>(b.ratings[1]+b.ratings[3])-(a.ratings[1]+a.ratings[3]))[0];return `<div class="prototype-card"><div><div class="kicker">先试走，不是终身押注</div><h2>7 天原型行动卡</h2><p>根据“喜欢程度 + 一致性”，你可以先从「${e(preferred.title)}」获得一轮真实反馈。它只是当前测试对象，不是最终决定。</p></div><div><p><b>本季度唯一要验证的问题：</b>我能否在不推翻现有生活的前提下，让一个更接近“${e(list(state.lifeValues,'想要的人生'))}”的方向变成真实小样？</p><ul><li>采访 1 位走过相似路线的人，只问真实日常、代价和转折，不直接索要工作。</li><li>${e(preferred.prototype)}</li><li>每天随机记录一次：我此刻是在靠近想要的生活，还是只在维护熟悉的惯性？</li></ul><p><b>不愿牺牲的底线：</b>不再用基本睡眠、健康与重要关系，交换一个看似更快的答案。</p></div></div>`}
function bindResult(plans){$$('[data-download-card]').forEach(b=>b.onclick=()=>downloadCard(plans[Number(b.dataset.downloadCard)]));$$('[data-copy-card]').forEach(b=>b.onclick=()=>copyPlan(plans[Number(b.dataset.copyCard)]));$('#copyAllBtn').onclick=()=>copyAll(plans);$('#printBtn').onclick=()=>window.print();$('#downloadDataBtn').onclick=downloadData;$('#restartBtn').onclick=restart}
function planText(p){return `【航线 ${p.kind}｜${p.title}】\n${p.thesis}\n\n真正满足：${p.need}\n最大风险：${p.risk}\n\n五年时间线：\n${p.timeline.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n值得验证：\n${p.tests.map(x=>`- ${x}`).join('\n')}\n\n30 天原型：${p.prototype}`}
async function copyPlan(p){await navigator.clipboard.writeText(planText(p));toast('路线内容已复制')}
async function copyAll(plans){await navigator.clipboard.writeText(`我的三条奥德赛路线\n\n${plans.map(planText).join('\n\n────────\n\n')}`);toast('三条路线摘要已复制')}
function wrap(ctx,text,x,y,maxWidth,lineHeight,maxLines=8){const chars=String(text).split('');let line='',lines=[];for(const ch of chars){const test=line+ch;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=ch;if(lines.length>=maxLines)break}else line=test}if(line&&lines.length<maxLines)lines.push(line);lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));return y+lines.length*lineHeight}
function downloadCard(p){const c=document.createElement('canvas');c.width=1080;c.height=1350;const ctx=c.getContext('2d');ctx.fillStyle='#F8F3E8';ctx.fillRect(0,0,c.width,c.height);const grad=ctx.createLinearGradient(0,0,0,430);grad.addColorStop(0,p.kind==='C'?'#E7DFD0':'#DCE8E6');grad.addColorStop(1,'#F8F3E8');ctx.fillStyle=grad;ctx.fillRect(0,0,c.width,430);ctx.fillStyle='rgba(120,150,120,.55)';ctx.beginPath();ctx.moveTo(0,340);ctx.quadraticCurveTo(240,230,480,340);ctx.quadraticCurveTo(760,470,1080,300);ctx.lineTo(1080,470);ctx.lineTo(0,470);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(213,190,148,.86)';ctx.beginPath();ctx.moveTo(0,390);ctx.quadraticCurveTo(280,330,530,410);ctx.quadraticCurveTo(780,490,1080,370);ctx.lineTo(1080,500);ctx.lineTo(0,500);ctx.closePath();ctx.fill();ctx.fillStyle='#27322D';ctx.font='500 26px serif';ctx.fillText(`航线 ${p.kind} · ${p.label}`,72,80);ctx.font='700 66px serif';ctx.fillText(p.title,72,165);ctx.font='400 31px serif';ctx.fillStyle='#53615A';wrap(ctx,p.thesis,72,225,890,47,4);ctx.fillStyle='#789678';ctx.font='600 25px serif';ctx.fillText('五年时间线',72,530);ctx.fillStyle='#27322D';ctx.font='500 28px sans-serif';let y=585;p.timeline.forEach((x,i)=>{ctx.fillStyle='#B97563';ctx.fillText(`Y${i+1}`,72,y);ctx.fillStyle='#53615A';y=wrap(ctx,x,145,y,820,39,2)+18});ctx.fillStyle='#789678';ctx.font='600 25px serif';ctx.fillText('30 天原型',72,930);ctx.fillStyle='#53615A';ctx.font='400 28px sans-serif';wrap(ctx,p.prototype,72,980,920,41,4);ctx.fillStyle='#789678';ctx.font='600 24px serif';ctx.fillText('物力      喜欢      自信      一致',72,1185);ctx.fillStyle='#27322D';ctx.font='700 44px serif';ctx.fillText(`${p.ratings[0]}          ${p.ratings[1]}          ${p.ratings[2]}          ${p.ratings[3]}`,72,1242);ctx.fillStyle='#53615A';ctx.font='400 21px sans-serif';ctx.fillText('小猫与三条路 · 人生设计奥德赛计划',72,1308);const a=document.createElement('a');a.download=`奥德赛路线-${p.kind}-${p.title}.png`;a.href=c.toDataURL('image/png');a.click();toast('分享图已保存')}
function downloadData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='odyssey-life-design.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function restart(){if(!confirm('清空当前旅程并重新开始？'))return;try{localStorage.removeItem(STORAGE_KEY)}catch{}location.reload()}
$('#nextBtn').addEventListener('click',next);$('#backBtn').addEventListener('click',back);$('#completionBtn').addEventListener('click',advance);$('#completion').addEventListener('click',ev=>{if(ev.target===$('#completion'))advance()});window.addEventListener('resize',()=>updateScene(scenes[step]));
initMap();render();
})();