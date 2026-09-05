from pathlib import Path
import re

p = Path('games/jinwan-youtao/index.html')
s = p.read_text(encoding='utf-8')

if "var QUEST_SYSTEM_VERSION='5.9.5'" in s:
    raise SystemExit(0)

# --- 1. Make sheet dismissal unambiguous on touch devices. ---
css = r'''
/* v5.9.5 — room details + plain-language events */
.sheetclose,.questclose{position:relative;z-index:80;pointer-events:auto;touch-action:manipulation}
.sheetbackdrop.show{pointer-events:auto;touch-action:manipulation}
.roomdetailblock .guestline{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:5px}.roomdetailblock .guestline b{font-size:10.5px}.roomdetailblock .guestline span{font-size:8px;font-weight:900;color:var(--gold);white-space:nowrap}
.roomdetailblock .staybar{height:6px;margin-top:7px;border-radius:999px;background:#e7e1d8;overflow:hidden}.roomdetailblock .staybar i{display:block;height:100%;background:var(--green);border-radius:999px}
.roomdetailblock .needline{margin-top:7px;padding:7px 8px;border-radius:9px;background:#f7f2e9;color:#5e5851;font-size:8.5px;line-height:1.4}
.roomactions{grid-template-columns:repeat(2,minmax(0,1fr))}.roomaction{touch-action:manipulation}.roomaction.history{background:#f6f2eb}.roomaction.done{border-color:#adc0b0;background:#f4faf5}
.choice:disabled{opacity:.48;filter:saturate(.45);cursor:not-allowed}.choice:disabled:active{transform:none}
#modalBody{white-space:pre-line;line-height:1.55}
'''
if '/* v5.9.5 — room details + plain-language events */' not in s:
    s = s.replace('</style>', css + '\n</style>', 1)

# Add resilient delegated close handling after existing backdrop click listener.
needle = "$('sheetBackdrop').addEventListener('click',function(){closeSheets(true)});"
extra = r'''$('sheetBackdrop').addEventListener('click',function(){closeSheets(true)});
// Touch-first fallback: close in capture phase so nested canvases / sheets cannot swallow the tap.
document.addEventListener('pointerup',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-close-sheet]'):null;if(!t)return;e.preventDefault();e.stopPropagation();closeSheets(true)},true);
if($('sheetBackdrop'))$('sheetBackdrop').addEventListener('pointerup',function(e){e.preventDefault();e.stopPropagation();closeSheets(true)},true);'''
if needle in s and 'Touch-first fallback' not in s:
    s = s.replace(needle, extra, 1)

# --- 2. Upgrade the mini-interior renderer. Still lightweight Canvas, but closer to the generated room-art language. ---
start = s.find('function drawMiniInterior(c,type,x,y,w,h,alpha){')
end = s.find('function drawRoomSpriteInCell', start)
if start < 0 or end < 0:
    raise SystemExit('drawMiniInterior range missing')
mini = r'''function drawMiniInterior(c,type,x,y,w,h,alpha){
  c.save();c.globalAlpha=alpha==null?1:alpha;c.beginPath();c.rect(x,y,w,h);c.clip();
  var sx=w/100,sy=h/70;
  function box(px,py,pw,ph,fill){c.fillStyle=fill;c.fillRect(x+px*sx,y+py*sy,pw*sx,ph*sy)}
  function dot(px,py,r,fill){c.fillStyle=fill;c.beginPath();c.arc(x+px*sx,y+py*sy,Math.max(1,r*Math.min(sx,sy)),0,Math.PI*2);c.fill()}
  function lamp(px,py){box(px,py,3,9,'#6b4932');dot(px+1.5,py,4,'#ffd77d')}
  function plant(px,py){box(px,py+6,6,5,'#ede5d8');dot(px+1,py+5,3,'#64805f');dot(px+4,py+3,3,'#6f8b62');dot(px+6,py+6,2.5,'#567351')}
  var floor=(type==='gym'?'#a87343':type==='spa'?'#bcae9a':'#c89e6b');
  c.fillStyle=floor;c.fillRect(x,y,w,h);box(0,0,100,21,'#f0ddc3');box(0,20,100,2,'#805a3e');
  if(type==='standard'||type==='suite'){
    box(8,28,48,23,'#f6f0e6');box(8,24,48,6,'#76513a');box(11,43,44,6,'#758455');box(14,30,14,6,'#ffffff');box(30,30,14,6,'#ffffff');
    box(63,26,27,17,'#744d31');box(66,29,20,10,'#d9c8aa');box(63,46,26,5,'#65442d');lamp(58,31);plant(88,40);
    box(15,7,30,10,'#8ea4a4');box(17,9,26,6,'#a9bdad');box(72,7,14,11,'#e8ddc8');
    if(type==='suite'){box(55,50,38,12,'#dacbb9');box(58,53,13,5,'#71815c');box(76,53,13,5,'#71815c');box(43,55,10,5,'#68472f')}
  }else if(type==='breakfast'){
    box(5,18,90,13,'#6e492e');box(8,20,16,7,'#303638');box(28,20,20,7,'#e4b25d');box(52,20,17,7,'#d7c28d');box(73,20,18,7,'#b6653e');
    for(var i=0;i<3;i++){box(12+i*29,41,18,12,'#805639');box(15+i*29,53,12,4,'#748158');dot(21+i*29,39,2,'#fff4cf')}
    plant(87,7);lamp(4,33);
  }else if(type==='club'){
    box(53,14,40,18,'#513a30');for(var j=0;j<4;j++){box(58+j*8,17,4,8,j%2?'#b4864c':'#7e5b36')}box(51,32,43,5,'#3c3532');
    box(7,37,35,15,'#ddd0bd');box(10,49,11,5,'#6f7f57');box(27,49,11,5,'#6f7f57');box(45,48,19,8,'#64442f');dot(54,47,2,'#ffd27b');plant(4,25);
  }else if(type==='gym'){
    box(7,38,38,7,'#34383a');box(10,27,5,14,'#464b4e');box(50,28,16,18,'#303538');box(73,25,20,17,'#303436');box(18,52,60,10,'#4b4540');
    for(var k=0;k<4;k++)dot(80+k*4,48,2,'#23282b');plant(3,22);box(48,6,36,13,'#9aa4a4');
  }else if(type==='spa'){
    box(23,32,54,18,'#f2eadc');box(28,46,44,5,'#768457');box(6,19,18,33,'#714e37');box(80,19,13,31,'#77523a');box(34,18,37,8,'#694832');
    dot(50,31,3,'#fff1c4');lamp(73,25);plant(5,49);box(38,7,25,10,'#a7b2a3');
  }
  c.restore();return true;
}
'''
s = s[:start] + mini + s[end:]

# --- 3. Room details: occupant, stay progress, need, live review and explicit actions. ---
start = s.find('function roomStateText(r){')
end = s.find('function occupancy(){', start)
if start < 0 or end < 0:
    raise SystemExit('room helper range missing')
room_helpers = r'''function roomStateText(r){if(!r.type)return'EMPTY · 尚未建设';if(r.type==='breakfast')return'OPEN · 早餐营业中';if(r.type==='club')return'OPEN · 酒廊营业中';if(r.type==='gym'||r.type==='spa')return'OPEN · 对客开放';if(r.reserved)return'SUA LOCK · 已预留';if(r.occupied)return'IN HOUSE · 入住中';if(r.dirty)return r.cleaning>0?'CLEANING · 清扫中':'DIRTY · 待清扫';return'AVAILABLE · 可售'}
function roomGuest(r){if(!r||!r.guest)return null;for(var i=0;i<state.guests.length;i++)if(state.guests[i].id===r.guest)return state.guests[i];return null}
function roomStars(gu){if(!gu)return 0;var n=4;if(gu.upgraded)n++;if(gu.denied)n--;if((gu.grudge||0)>=3)n-=2;else if((gu.grudge||0)>=1.3)n--;if(gu.roomServiceDone||gu.roomWaterDone)n++;return Math.max(1,Math.min(5,n))}
function starText(n){return'★★★★★'.slice(0,n)+'☆☆☆☆☆'.slice(0,5-n)}
function roomStayNight(gu){var total=Math.max(1,gu.tripNights||1),elapsed=Math.max(0,gu.stay||0),target=Math.max(1,gu.targetStayMinutes||630),ratio=Math.min(.999,elapsed/target),night=Math.min(total,Math.max(1,Math.floor(ratio*total)+1));return{night:night,total:total,pct:Math.max(7,Math.min(100,Math.round(ratio*100)))}}
function roomGuestNeed(gu){if(!gu)return'当前无入住客人';if(gu.latePending&&!gu.lateChoice)return'等待确认延迟退房';var k=gu.personaKey||'';if(k==='road')return'快速退房、发票与准时出发';if(k==='family')return'早餐、加床与晚退房';if(k==='points')return'房晚 / 积分尽快到账';if(k==='hunter'||k==='forum')return'关注套房库存与升级';if(k==='creator')return'安静、出片与在地体验';if(k==='proposal')return'安静、布置与重要时刻体验';if(k==='planner')return'团队动线与快速入住';if(!gu.roomWaterDone)return'安静入住；可以主动补水和拖鞋';return'当前需求已基本满足'}
function renderRoomActions(r,gu){var box=$('roomActions'),h=[];box.innerHTML='';if(!r.type){$('roomActionBlock').style.display='none';return}$('roomActionBlock').style.display='block';if(gu){h.push('<button class="roomaction primary '+(gu.roomWaterDone?'done':'')+'" data-room-action="water"><strong>'+(gu.roomWaterDone?'✓ 已送水':'💧 送水 / 拖鞋')+'</strong><small>'+(gu.roomWaterDone?'本次入住已处理':'¥40 · 小幅改善体验')+'</small></button>');h.push('<button class="roomaction '+(gu.roomNote?'done':'')+'" data-room-action="note"><strong>'+(gu.roomNote?'✓ 已备注':'📝 备注偏好')+'</strong><small>'+(gu.roomNote?'前台已记录':'记录安静 / 枕头 / 行程需求')+'</small></button>');h.push('<button class="roomaction" data-room-action="late"><strong>🕓 延迟退房</strong><small>'+(gu.lateChoice==='honor'?'已确认 16:00':'确认 16:00 · 业主 -1')+'</small></button>');h.push('<button class="roomaction history" data-room-action="history"><strong>🕘 查看客史</strong><small>上一条评价 / 熟客记录</small></button>')}else if(r.dirty)h.push('<button class="roomaction primary" data-room-action="clean"><strong>🧹 优先翻房</strong><small>¥80 · 立即恢复可售</small></button>');else if(r.type==='standard'&&!r.reserved)h.push('<button class="roomaction" data-room-action="upgrade"><strong>🛋 改造成套房</strong><small>¥800 · 套房库存 +1</small></button>');else if(r.type==='breakfast')h.push('<button class="roomaction" data-room-action="breakfast"><strong>🍳 补满早餐</strong><small>¥180 · 当前 '+Math.round(state.breakfastStock)+'%</small></button>');else if(r.type==='club')h.push('<button class="roomaction" data-room-action="lounge"><strong>🥂 补满酒廊</strong><small>¥220 · 当前 '+Math.round(state.loungeStock)+'%</small></button>');if(!h.length)h.push('<button class="roomaction" disabled><strong>✓ 当前无需处理</strong><small>这个空间目前正常运营。</small></button>');box.innerHTML=h.join('')}
function openRoomSheet(r){state.selectedRoom=r;closeSheets(false);var code=roomCode(r),d=r.type?defs[r.type]:null,status=roomStateText(r),build=!r.type,gu=roomGuest(r),p=gu?personaOf(gu):null;$('roomSheetTitle').textContent=code+' · '+(build?'空房间':'房间详情');$('roomSheetSub').textContent=build?'先决定这个房间的用途。':'看清谁住在这里、体验如何，以及你现在能做什么。';$('roomStatusCard').innerHTML='<strong>'+(build?'⬜ '+code+' · 未建设':(d.icon+' '+code+' · '+d.label))+'</strong><small>'+status+(d&&d.rate?' · 基础房价 ¥'+Math.round(d.rate*brand().rate):'')+'</small>';$('roomBuildBlock').hidden=!build;var pv=$('roomPreview');if(r.type){pv.classList.add('show');$('roomPreviewName').textContent=code+' · '+d.label;$('roomPreviewState').textContent=status;drawRoomPreview(r)}else pv.classList.remove('show');var gb=$('roomGuestBlock'),rb=$('roomReviewBlock');if(gu){var thought=guestThought(gu)||p.quote,stars=roomStars(gu),st=roomStayNight(gu),need=roomGuestNeed(gu);gb.classList.add('show');gb.innerHTML='<div class="eyebrow">CURRENT GUEST · 当前入住</div><div class="guestline"><b>'+p.icon+' '+gu.name+' · '+gu.tier+(gu.returning?' · 熟客':'')+'</b><span>'+st.night+'/'+st.total+' 晚</span></div><div class="staybar"><i style="width:'+st.pct+'%"></i></div><div class="needline">📋 当前需求：'+need+'</div>';rb.classList.add('show');rb.innerHTML='<div class="eyebrow">LIVE EXPERIENCE · 当前体验</div><strong>'+starText(stars)+' · 预估 '+stars+'/5</strong><p>“'+thought+'”</p>'+(r.lastReview?'<p style="margin-top:7px;border-top:1px solid #eee3d5;padding-top:6px">上一位住客：'+r.lastReview+'</p>':'')}else{gb.classList.remove('show');gb.innerHTML='';if(r.lastReview){rb.classList.add('show');rb.innerHTML='<div class="eyebrow">LAST REVIEW · 上一位住客</div><strong>'+(r.lastGuestName||'上一位住客')+'</strong><p>'+r.lastReview+'</p>'}else{rb.classList.remove('show');rb.innerHTML=''}}renderRoomActions(r,gu);$('roomSheet').classList.add('show');$('sheetBackdrop').classList.add('show')}
'''
s = s[:start] + room_helpers + s[end:]

# Replace room action handler with the four clearer occupied-room actions plus existing vacant/facility actions.
pattern = re.compile(r"if\(\$\('roomActions'\)\)\$\('roomActions'\)\.addEventListener\('click',function\(e\)\{.*?\}\);\ndocument\.querySelectorAll\('\[data-room-build\]'\)", re.S)
m = pattern.search(s)
if not m:
    raise SystemExit('room action listener range missing')
new_listener = r'''if($('roomActions'))$('roomActions').addEventListener('click',function(e){var b=e.target.closest('[data-room-action]');if(!b||!state.selectedRoom)return;var r=state.selectedRoom,gu=roomGuest(r),a=b.getAttribute('data-room-action'),cost=0;if(a==='water'){if(!gu||gu.roomWaterDone)return;cost=40;if(state.cash<cost){showToast('预算不足。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;gu.roomWaterDone=true;gu.grudge=Math.max(0,(gu.grudge||0)-.5);showToast('💧 水和拖鞋已送到 · 客人体验改善')}else if(a==='note'){if(!gu)return;gu.roomNote=true;gu.grudge=Math.max(0,(gu.grudge||0)-.2);showToast('📝 偏好已备注，下一次服务更容易接住')}else if(a==='late'){if(!gu)return;if(gu.lateChoice==='honor'){showToast('🕓 已确认 16:00 退房');return}gu.latePending=true;gu.lateChoice='honor';changeRep(1);changeOwner(-1);showToast('🕓 16:00 退房已提前确认')}else if(a==='history'){if(!gu)return;var hist=r.lastReview||(gu.profileKey&&state.guestBook[gu.profileKey]&&state.guestBook[gu.profileKey].lastOutcome)||'这是这位客人的首次可追踪入住。';showToast('🕘 客史：'+hist);return}else if(a==='clean'){cost=80;if(state.cash<cost){showToast('预算不足。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;r.dirty=false;r.cleaning=0;showToast('🧹 '+roomCode(r)+' 已优先翻房 · 恢复可售')}else if(a==='upgrade'){cost=800;if(state.cash<cost){showToast('预算不足。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;r.type='suite';changeOwner(1);showToast('🛋 '+roomCode(r)+' 已改造成套房')}else if(a==='breakfast'){cost=180;if(state.cash<cost){showToast('预算不足。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;state.breakfastStock=100;showToast('🍳 早餐已补满')}else if(a==='lounge'){cost=220;if(state.cash<cost){showToast('预算不足。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;state.loungeStock=100;showToast('🥂 酒廊已补满')}updateUI();saveState(true);openRoomSheet(r)});
document.querySelectorAll('[data-room-build]')'''
s = s[:m.start()] + new_listener + s[m.end():]

# --- 4. Event UX: remove abstract 'space gap' language and explain the actual operational problem. ---
# Make generic outcome copy plain-language.
repls = {
    'GM 可以催人，但不能现场变出两个缺失空间。硬拉通仍然翻车。':'GM 可以催人，但酒店现场条件确实不够；强行处理仍然会翻车。',
    "missing?'GM 亲自补了最后一个空间短板，险过。':'GM 亲自拉通全部门，问题被完整解决。'":"missing?'GM 亲自补上最后一个现场条件，险过。':'GM 亲自拉通全部门，问题被完整解决。'",
    '临时封层、布置、会客室转换和 Welcome Amenity 一起上，空间短板被临时补住。':'临时封层、布置、会客室转换和欢迎礼一起上，今晚欠缺的现场条件被临时补上。',
    'Leadership Team 和酒店硬件都接住了 VIP，GM 只需要签字。':'Leadership Team 和酒店现场条件都已就绪，GM 只需要看结果。',
    "cover<threshold?'部门覆盖不足，SOP 在最需要它的时候失效了。':'空间没到位：团队很努力，但酒店物理条件不够。'":"cover<threshold?'需要协作的部门还没配齐，SOP 暂时接不住。':'酒店条件还没达到这次事件的要求，团队很努力也无法完全补救。'"
}
for a,b in repls.items():
    s=s.replace(a,b)

# Add maintenance-specific resolver and replace executive decision renderer.
insert_at = s.find('function showExecutiveDecision(item){')
if insert_at < 0:
    raise SystemExit('showExecutiveDecision missing')
maintenance_helpers = r'''function maintenanceAffectedRoom(){return state.rooms.filter(function(r){return r.dirty&&!r.occupied&&roomUnlocked(r)})[0]||null}
function maintenanceRoomValue(r){if(!r||!r.type||!defs[r.type])return Math.round(360*brand().rate);return Math.max(260,Math.round((defs[r.type].rate||360)*brand().rate*state.rateBoost))}
function resolveMaintenanceDecision(item,mode){var r=maintenanceAffectedRoom(),value=maintenanceRoomValue(r),code=r?roomCode(r):'一间客房',ready=managerHired('engineering')&&managerHired('house')&&propertyLevel('rooms')>=1,cost=0,msg='';if(mode==='command'){cost=740;if(state.cash<cost){showToast('预算不足，无法启动人工补救。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;if(r){r.dirty=false;r.cleaning=0}changeRep(1);state.stats.vipResolved++;msg='GM 拉通换房、抢修和安抚，'+code+' 恢复可售 · 口碑 +1'}else if(mode==='makeover'){cost=680;if(state.cash<cost){showToast('预算不足，临时改造无法开工。');return}state.cash-=cost;state.expense+=cost;state.stats.totalExpense+=cost;if(r){r.dirty=false;r.cleaning=0}state.stats.emergencyMakeovers=(state.stats.emergencyMakeovers||0)+1;state.stats.vipResolved++;msg=code+' 临时恢复可售；今晚保住 1 间房，但没有形成永久升级'}else if(mode==='delegate'){if(!ready){showToast('还需要 Engineering + Housekeeping，并把客房品质升到 Lv1。');return}if(r){r.dirty=false;r.cleaning=0}noteDepartment('engineering');noteDepartment('house');recordAuto('Engineering + Housekeeping 按 SOP 处理房间故障');changeRep(2);changeOwner(1);state.stats.vipResolved++;msg='Leadership Team 自行结案：'+code+' 恢复可售 · 口碑 +2 · 业主 +1'}else if(mode==='revenue'){recordRevenue(value);changeRep(-3);changeOwner(2);state.stats.vipFailed++;msg='短期多记 ¥'+value+' 收入，但故障房仍未解决 · 口碑 -3'}state.daily.highlight=(mode==='revenue'?'⚠️ ':'✅ ')+'🔧 Critical Room OOO：'+msg;showToast(state.daily.highlight);updateUI();saveState(true)}
function showMaintenanceDecision(item){var r=maintenanceAffectedRoom(),code=r?roomCode(r):'当前可售房',value=maintenanceRoomValue(r),eng=managerHired('engineering'),house=managerHired('house'),roomLv=propertyLevel('rooms'),ready=eng&&house&&roomLv>=1,body='🔧 工程事故 · 可售房突发停用\n\n今晚酒店接近满房，'+code+' 在客人到店前突发故障，暂时不能出售。\n这会直接影响今晚接待、收入和会员体验。\n你需要决定：立即花钱救回来，交给成熟团队，还是冒险先保收入？\n\n【当前情况】\n• 受影响房间：'+code+'（原计划今晚出售）\n• 直接影响：今晚少 1 间可卖房，可能丢失 1 位客人\n• Engineering：'+(eng?'已到岗 ✓':'未到岗')+'\n• Housekeeping：'+(house?'已到岗 ✓':'未到岗')+'\n• 客房品质：Lv'+roomLv+(roomLv>=1?' ✓':'（升到 Lv1 后更容易处理）');var choices=[{title:'GM 亲自协调，今晚优先保客人',impact:'💰 -¥740 · ⭐ 口碑 +1 · 🛡 风险低',sub:'安排抢修、换房和安抚。成本最高，但能直接把今晚稳住。',best:!ready,fn:function(){resolveMaintenanceDecision(item,'command')}},{title:'Emergency Makeover：临时改成可售房',impact:'💰 -¥680 · 🛏 保住 1 间房 · 🔧 一次性方案',sub:'快速处理外观与设备问题，今晚能卖；明天仍需正式修复。',fn:function(){resolveMaintenanceDecision(item,'makeover')}},{title:'交给 Leadership Team 按 SOP 处理',impact:ready?'👥 Engineering + Housekeeping · 客房品质就绪':'🔒 需要 Engineering + Housekeeping + 客房品质 Lv1',sub:ready?'组织已经成熟，这类问题应该由团队自己消化。':'当前条件还没配齐；先建设组织和客房品质，之后同类事件可自动处理。',best:ready,disabled:!ready,fn:function(){resolveMaintenanceDecision(item,'delegate')}},{title:'Revenue First：先保收入再说',impact:'💰 +¥'+value+' · 👎 口碑 -3 · ⚠️ 高风险',sub:'用超卖或强推替代方案保住短期收入，但故障房没有真正解决。',fn:function(){resolveMaintenanceDecision(item,'revenue')}}];showModal(escalationName(item.level),'Critical Room OOO',body,choices)}
function executiveSituationText(key){var map={chairman:'集团高层临时到店，最后一间套房突然同时关系到收入、接待和内部优先级。',owner:'业主代表临时到店，不只看房间，也会看大堂、餐饮和现场团队是否像一家成熟酒店。',auditor:'区域运营负责人以普通客身份到店，正在观察房间细节、设备状态和前台 SOP。',celebrity:'名人住客要求低调入住，但大堂同时有活动和围观风险，隐私动线成为核心问题。',delegation:'代表团提前到店，房间、车辆、会议、餐饮和设备保障需要同时衔接。',group:'会议团比计划更早抵达，大量行李和客人会在短时间内压到前台与餐饮。'};return map[key]||vipDefs[key].desc}
'''
s = s[:insert_at] + maintenance_helpers + s[insert_at:]

pattern = re.compile(r"function showExecutiveDecision\(item\)\{.*?\}\nfunction leadershipBriefLines", re.S)
m = pattern.search(s)
if not m:
    raise SystemExit('executive decision function range missing')
new_decision = r'''function showExecutiveDecision(item){if(item.key==='maintenance'){showMaintenanceDecision(item);return}var v=vipDefs[item.key],req=executiveRequirements(item.key),cover=departmentCoverage(req),sreq=vipSpaceRequirements(item.key),scover=vipSpaceCoverage(item.key),missing=Math.max(0,sreq.length-scover),spaceText=vipSpaceMissingText(item.key),body=v.icon+' '+eventSituationText(item.key)+'\n\n【需要协作】\n'+req.map(function(k){return departmentDefs[k].icon+' '+departmentDefs[k].name+(managerHired(k)?' ✓':' · 未到岗')}).join('\n')+'\n\n【酒店条件】\n'+(spaceText==='全部就绪'?'所需客房 / 公区条件已就绪 ✓':'还需要：'+spaceText)+(hasSignatureSpace()?'\n✨ '+signatureSpaces[state.brand].name+' 已启用':'')+'\n\n已到岗的部门会给出自己的处理方案；团队和酒店条件越成熟，GM 越不需要亲自救火。';var choices=[],i,k;for(i=0;i<req.length;i++){k=req[i];if(managerHired(k)){(function(dept){choices.push({title:departmentDefs[dept].icon+' '+departmentLeadLabel(dept,item),impact:'部门主导 · 现场成本 ¥'+({front:140,house:130,revenue:90,fb:180,events:170,engineering:160}[dept]||150),sub:departmentLeadSub(dept,item),best:(cover+scover)>=Math.max(2,req.length+sreq.length-(item.level>=4?1:2)),fn:function(){resolveDepartmentLead(item,dept)}})})(k)}}if(!choices.length||item.level>=3)choices.push({title:'GM 亲自拉通今晚的资源',impact:'💰 -¥'+(420+item.level*90+missing*140)+' · '+(missing>=2?'现场条件不足，风险高':'风险可控'),sub:'组织还不成熟时由 GM 亲自救火；能解决问题，但成本和注意力消耗最高。',best:!choices.length&&missing<=1,fn:function(){resolveExecutiveVip(item,'command')}});if(missing>0&&item.level>=3)choices.push({title:'临时改造：先把今晚需要的条件补出来',impact:'🏗️ -¥'+(360+missing*240+item.level*40)+' · 一次性补救',sub:'适合酒店条件暂时不够时救今晚；不会永久提高客房或公区等级。',fn:function(){resolveExecutiveVip(item,'makeover')}});if(cover>=req.length&&scover>=sreq.length)choices.push({title:'让 Leadership Team 自行结案',impact:'👥 部门 + 酒店条件全部就绪',sub:'组织真正成熟后，GM 只看结果，不再亲自选战术。',best:true,fn:function(){resolveExecutiveVip(item,'delegate')}});showModal(escalationName(v.level),v.name,body,choices)}
function leadershipBriefLines'''
s = s[:m.start()] + new_decision + s[m.end():]

# showModal understands disabled choices, so unavailable SOP doesn't close the modal or punish the player.
old = "b.className='choice'+(c.best?' best':'');b.innerHTML='<strong>'+c.title+'</strong>'+(c.impact?'<div class=\"impactline\">'+c.impact+'</div>':'')+'<small>'+c.sub+'</small>';b.addEventListener('click',function(){state.paused=false;$('modal').classList.remove('show');if(c.fn)c.fn();updateUI();saveState(true)});box.appendChild(b)"
new = "b.className='choice'+(c.best?' best':'');b.innerHTML='<strong>'+c.title+'</strong>'+(c.impact?'<div class=\"impactline\">'+c.impact+'</div>':'')+'<small>'+c.sub+'</small>';if(c.disabled)b.disabled=true;b.addEventListener('click',function(){if(c.disabled)return;state.paused=false;$('modal').classList.remove('show');if(c.fn)c.fn();updateUI();saveState(true)});box.appendChild(b)"
if old not in s:
    raise SystemExit('showModal choice target missing')
s = s.replace(old,new,1)

# Version marker.
if "var QUEST_SYSTEM_VERSION='5.9.4';" not in s:
    raise SystemExit('v5.9.4 marker missing')
s = s.replace("var QUEST_SYSTEM_VERSION='5.9.4';","var QUEST_SYSTEM_VERSION='5.9.5';",1)

# Hygiene check: no player-facing abstract phrase from the previous event copy.
# Some old workflow files may contain it, but the live index should not use it in the executive UI.
s = s.replace('空间缺口','酒店条件不足')

p.write_text(s,encoding='utf-8')
