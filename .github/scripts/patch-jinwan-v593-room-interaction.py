from pathlib import Path

p = Path('games/jinwan-youtao/index.html')
s = p.read_text(encoding='utf-8')

if "var QUEST_SYSTEM_VERSION='5.9.3'" in s:
    print('v5.9.3 already applied')
    raise SystemExit(0)

# Remove the stray backslash visibly rendered beneath the Property tabs.
s = s.replace(
    '</div>\\\n    <div class="section-title">Property Design · 空间焕新</div>',
    '</div>\n    <div class="section-title">Property Design · 空间焕新</div>',
    1,
)

# Anchor the global facility build area so it is only reached intentionally.
s = s.replace(
    '<div class="section-title">Room &amp; Facility Build · 功能建造</div>',
    '<div class="section-title" id="functionalBuildSection">Room &amp; Facility Build · 功能建造</div>',
    1,
)

marker = '  <div class="sheet" id="opsSheet">'
room_sheet = '''  <div class="sheet" id="roomSheet">
    <div class="sheethead"><div><h3 id="roomSheetTitle">房间 / Room</h3><div class="sub" id="roomSheetSub">查看这个房间的状态与用途。</div></div><button class="sheetclose" data-close-sheet>×</button></div>
    <div class="notice roomstatus" id="roomStatusCard"></div>
    <div id="roomBuildBlock">
      <div class="section-title">建设这个房间</div>
      <div class="cards room-build-cards">
        <button class="card" data-room-build="standard"><strong>🛏 标准客房</strong><small>最基础的可售房。稳定增加房晚库存与收入。</small><span class="tag">建造 ¥700</span></button>
        <button class="card" data-room-build="suite"><strong>🛋 套房</strong><small>用于 Globalist 升套与更高房价。</small><span class="tag gold">建造 ¥1500</span></button>
      </div>
      <button class="inspectbtn" id="roomMoreFacilitiesBtn" type="button">想把这里改成早餐厅 / 酒廊 / 健身房 / Spa →</button>
    </div>
  </div>

'''
if marker not in s:
    raise SystemExit('ops sheet marker missing')
s = s.replace(marker, room_sheet + marker, 1)

css = '''
/* v5.9.3 — contextual room interaction */
.roomstatus{margin:4px 0 10px;line-height:1.5}.roomstatus strong{display:block;font-size:13px;color:var(--ink);margin-bottom:3px}.roomstatus small{display:block;color:var(--muted);font-size:8.5px}.room-build-cards{grid-template-columns:1fr 1fr}.room-build-cards .card{min-height:112px}.visual3d .roomstatus strong{color:#fff}
'''
if '</style>' not in s:
    raise SystemExit('style close missing')
s = s.replace('</style>', css + '\n</style>', 1)

anchor = 'function occupancy(){'
helper = '''function roomCode(r){return (r.f+2)+'0'+(r.c+1)}
function roomStateText(r){if(!r.type)return'EMPTY · 尚未建设';if(r.reserved)return'SUA LOCK · 已预留';if(r.occupied)return'IN HOUSE · 入住中';if(r.dirty)return r.cleaning>0?'CLEANING · 清扫中':'DIRTY · 待清扫';return'AVAILABLE · 可售'}
function openRoomSheet(r){
  state.selectedRoom=r;
  closeSheets(false);
  var code=roomCode(r),d=r.type?defs[r.type]:null,status=roomStateText(r),build=!r.type;
  $('roomSheetTitle').textContent=code+' · '+(build?'空房间':'房间详情');
  $('roomSheetSub').textContent=build?'这是一个未建设的房间格。先决定它要不要成为客房。':'这里显示这个房间本身的状态。';
  $('roomStatusCard').innerHTML='<strong>'+(build?'⬜ '+code+' · 未建设':(d.icon+' '+code+' · '+d.label))+'</strong><small>'+status+(d&&d.rate?' · 基础房价 ¥'+Math.round(d.rate*brand().rate):'')+'</small>';
  $('roomBuildBlock').hidden=!build;
  $('roomSheet').classList.add('show');$('sheetBackdrop').classList.add('show');
}
'''
if anchor not in s:
    raise SystemExit('occupancy anchor missing')
s = s.replace(anchor, helper + anchor, 1)

old_handler = """canvas.addEventListener('pointerup',function(e){var rr=canvas.getBoundingClientRect(),x=e.clientX-rr.left,y=e.clientY-rr.top,r=state.rooms.filter(function(ro){var q=roomRect(ro);return x>=q.x&&x<=q.x+q.w&&y>=q.y&&y<=q.y+q.h})[0];if(r){if(!roomUnlocked(r)){showToast('🔒 这层尚未开放。进入 Regency / Grand Hyatt 后地图会继续向上生长。');return}state.selectedRoom=r;if(!r.type){if(!featureUnlocked('space')){state.selectedRoom=null;showToast('🔒 '+featureUnlockText('space'));return}closeSheets(false);$('inventorySheet').classList.add('show');$('sheetBackdrop').classList.add('show');showToast('已选择 '+(r.f+2)+'0'+(r.c+1)+' 空间')}else showToast((r.f+2)+'0'+(r.c+1)+' · '+defs[r.type].label+' · '+(r.reserved?'SUA LOCK':r.occupied?'IN HOUSE':r.dirty?'DIRTY':'AVAILABLE'))}});"""
new_handler = """canvas.addEventListener('pointerup',function(e){var rr=canvas.getBoundingClientRect(),x=e.clientX-rr.left,y=e.clientY-rr.top,r=state.rooms.filter(function(ro){var q=roomRect(ro);return x>=q.x&&x<=q.x+q.w&&y>=q.y&&y<=q.y+q.h})[0];if(r){if(!roomUnlocked(r)){showToast('🔒 这层尚未开放。进入 Regency / Grand Hyatt 后地图会继续向上生长。');return}if(!r.type&&!featureUnlocked('space')){state.selectedRoom=null;showToast('🔒 '+featureUnlockText('space'));return}openRoomSheet(r)}});"""
if old_handler not in s:
    raise SystemExit('room pointer handler missing')
s = s.replace(old_handler, new_handler, 1)

old_nav = """$('frontBtn').addEventListener('click',openFront);$('inventoryBtn').addEventListener('click',function(){if(!featureUnlocked('space')){showToast('🔒 '+featureUnlockText('space'));return}buildPropertyCards();toggleSheet('inventorySheet')});if($('propertyBadge'))$('propertyBadge').addEventListener('click',function(){if(!featureUnlocked('space')){showToast('🔒 '+featureUnlockText('space'));return}buildPropertyCards();toggleSheet('inventorySheet')});"""
new_nav = """$('frontBtn').addEventListener('click',openFront);$('inventoryBtn').addEventListener('click',function(){if(!featureUnlocked('space')){showToast('🔒 '+featureUnlockText('space'));return}state.selectedRoom=null;buildPropertyCards();toggleSheet('inventorySheet')});if($('propertyBadge'))$('propertyBadge').addEventListener('click',function(){if(!featureUnlocked('space')){showToast('🔒 '+featureUnlockText('space'));return}state.selectedRoom=null;buildPropertyCards();toggleSheet('inventorySheet')});"""
if old_nav not in s:
    raise SystemExit('inventory nav target missing')
s = s.replace(old_nav, new_nav, 1)

listener_anchor = "document.querySelectorAll('[data-build]').forEach(function(btn){"
room_listeners = '''document.querySelectorAll('[data-room-build]').forEach(function(btn){btn.addEventListener('click',function(){var type=btn.getAttribute('data-room-build'),src=document.querySelector('[data-build="'+type+'"]');if(src)src.click()})});
if($('roomMoreFacilitiesBtn'))$('roomMoreFacilitiesBtn').addEventListener('click',function(){var selected=state.selectedRoom;buildPropertyCards();closeSheets(false);state.selectedRoom=selected;$('inventorySheet').classList.add('show');$('sheetBackdrop').classList.add('show');var sh=$('inventorySheet'),target=$('functionalBuildSection');if(sh&&target)sh.scrollTop=Math.max(0,target.offsetTop-80)});
'''
if listener_anchor not in s:
    raise SystemExit('build listener anchor missing')
s = s.replace(listener_anchor, room_listeners + listener_anchor, 1)

if "var QUEST_SYSTEM_VERSION='5.9.2';" not in s:
    raise SystemExit('version marker missing')
s = s.replace("var QUEST_SYSTEM_VERSION='5.9.2';", "var QUEST_SYSTEM_VERSION='5.9.3';", 1)

# Guardrails.
assert 'id="roomSheet"' in s
assert 'data-room-build="standard"' in s
assert 'data-room-build="suite"' in s
assert 'id="functionalBuildSection"' in s
assert 'openRoomSheet(r)' in s
assert '</div>\\\n    <div class="section-title">Property Design · 空间焕新</div>' not in s

p.write_text(s, encoding='utf-8')
print('patched v5.9.3')
