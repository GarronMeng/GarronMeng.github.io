from pathlib import Path
import re
p=Path('games/jinwan-youtao/index.html')
s=p.read_text(encoding='utf-8')

# Remove the three post-IIFE renderers that could never see the game's private state/functions.
for sid in ['v65-true3d-js','v66-reference-ui-js','v71-single-hotel-js']:
    s=re.sub(r'<script id="'+re.escape(sid)+r'">[\s\S]*?</script>\s*','',s,count=1)
for sid in ['v65-true3d-css','v66-reference-ui','v71-single-hotel-css']:
    s=re.sub(r'<style id="'+re.escape(sid)+r'">[\s\S]*?</style>\s*','',s,count=1)

s=s.replace("QUEST_SYSTEM_VERSION='7.1.0'","QUEST_SYSTEM_VERSION='7.2.0'")
s=s.replace("QUEST_SYSTEM_VERSION='6.5.0'","QUEST_SYSTEM_VERSION='7.2.0'")

# Hard-boot the new presentation in static markup, so it is visible even if an enhancement script fails.
s=s.replace('<div id="app">','<div id="app" class="v72-world visual3d" data-build="7.2.0">',1)
old='<div class="scene3d" id="scene3d"></div><canvas id="game"></canvas><canvas id="people3d"></canvas>'
new='''<div class="scene3d" id="scene3d"><div id="v72Hotel"><div class="v72-scroll" id="v72Scroll"><div class="v72-art" id="v72Art"><img src="assets/v66_reference_tower.svg?v=720" alt="hotel cutaway" id="v72TowerImg"><div class="v72-roomlayer" id="v72RoomLayer"></div><div class="v72-brandplate" id="v72BrandPlate">HYATT</div></div></div><div class="v72-rail" id="v72Rail"></div><div class="v72-scrollhint">↕ 上下滑动查看整栋酒店</div></div></div><canvas id="game"></canvas><canvas id="people3d"></canvas>'''
if old not in s:
    raise SystemExit('scene anchor missing')
s=s.replace(old,new,1)

css=r'''
<style id="v72-hardboot-css">
:root{--v72-navy:#0b3a61;--v72-blue:#0f4d7c;--v72-gold:#d9ad50;--v72-cream:#fbf7ee}
html,body{overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;background:#071d31!important}
#app.v72-world{background:#0b2f4d!important;box-shadow:0 0 42px rgba(0,0,0,.26)!important}
#app.v72-world .top{background:linear-gradient(180deg,#0f4f82 0%,#0b416f 58%,#09365e 100%)!important;border:0!important;color:#fff!important;padding:12px 12px 11px!important;box-shadow:0 8px 24px rgba(0,18,33,.23)!important}
#app.v72-world .game-title h1{color:#fff!important;font-size:24px!important;line-height:1!important;letter-spacing:-.8px!important;text-shadow:0 2px 8px rgba(0,0,0,.14)!important}
#app.v72-world .game-title small{display:none!important}
#app.v72-world .pill{background:rgba(5,31,53,.25)!important;border:1.4px solid rgba(255,255,255,.76)!important;color:#fff!important;padding:6px 10px!important;margin:0 0 3px 5px!important}
#app.v72-world .pill.warn{border-color:#e3b45c!important;background:rgba(75,52,15,.25)!important}
#app.v72-world .propertyline{color:rgba(255,255,255,.88)!important}.v72-world .propertyline b{color:#fff!important}.v72-world .rolechip{background:rgba(5,30,50,.38)!important;color:#fff!important}
#app.v72-world .meter{height:20px!important;background:rgba(243,240,234,.94)!important}.v72-world .meter i{background:linear-gradient(90deg,#b9862e,#ddb654)!important}.v72-world .meter.owner i{background:linear-gradient(90deg,#163f65,#0f7d8b)!important}
#app.v72-world .goalstrip{background:#fffdf8!important;border:1.4px solid #e1ba64!important;color:#183654!important;box-shadow:0 3px 12px rgba(4,25,42,.14)!important}.v72-world .goalstrip b,.v72-world .goalstrip .right{color:#183a5c!important}
/* Old canvas / split-mode UI is now compatibility-only and can never win the cascade. */
#app.v72-world #game,#app.v72-world #people3d,#app.v72-world .stage-fallback,#app.v72-world #viewToggle,#app.v72-world #explorerChip,#app.v72-world #propertyBadge,#app.v72-world #designHotspots,#app.v72-world #constructionHud,#app.v72-world .sceneops,#app.v72-world .scenecaption,#app.v72-world .viewnote{display:none!important;opacity:0!important;pointer-events:none!important}
#app.v72-world .stage{position:relative!important;width:100%!important;height:min(72vh,610px)!important;min-height:480px!important;max-height:610px!important;overflow:hidden!important;background:#1e4a6b!important}
#app.v72-world .scene3d{position:absolute!important;inset:0!important;display:block!important;opacity:1!important;transform:none!important;background:#315e7c!important;overflow:hidden!important;filter:none!important;transition:none!important}
#app.v72-world .scene3d>*:not(#v72Hotel){display:none!important}
#app.v72-world .stage:after{display:none!important}
#v72Hotel{position:absolute;inset:0;z-index:3;overflow:hidden;background:linear-gradient(180deg,#6b99b5,#a9c0cc 34%,#b99b7c 100%)}
.v72-scroll{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:none;touch-action:pan-y}.v72-scroll::-webkit-scrollbar{display:none}
.v72-art{position:relative;width:100%;min-height:100%;isolation:isolate;background:#2a5574}.v72-art>img{display:block;width:100%;height:auto;min-height:100%;object-fit:cover;object-position:center;filter:saturate(1.06) contrast(1.025) brightness(.98);user-select:none;-webkit-user-drag:none;pointer-events:none}
.v72-art:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;box-shadow:inset 0 0 55px rgba(4,23,36,.18),inset 0 -70px 80px rgba(10,27,39,.10)}
.v72-brandplate{position:absolute;z-index:8;right:4.5%;top:12%;width:16%;padding:8px 3px;background:rgba(10,42,66,.90);border:1px solid rgba(255,255,255,.38);color:#fff;text-align:center;font-size:8px;font-weight:950;letter-spacing:.5px;box-shadow:0 5px 14px rgba(0,0,0,.20)}
.v72-roomlayer{position:absolute;inset:0;z-index:7;pointer-events:none}.v72-roomhot{position:absolute;pointer-events:auto;border:1px solid transparent;background:transparent;border-radius:3px;padding:0}.v72-roomhot:active{border-color:#f5d67f;background:rgba(255,255,255,.08)}
.v72-roomhot.locked{background:rgba(13,28,39,.26)}.v72-roomtag{position:absolute;left:3px;top:3px;padding:1px 3px;border-radius:4px;background:rgba(255,248,235,.84);color:#273847;font:950 6.5px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 1px 2px rgba(0,0,0,.10)}
.v72-state{position:absolute;right:3px;top:3px;width:10px;height:10px;border-radius:50%;background:#6fc987;border:1px solid rgba(255,255,255,.8);box-shadow:0 1px 4px rgba(0,0,0,.18)}.v72-roomhot.occupied .v72-state{background:#e4b94f}.v72-roomhot.cleaning .v72-state{background:#68b1dc}.v72-roomhot.dirty .v72-state{background:#c86f5d}.v72-roomhot.locked .v72-state{background:#344b5d}
.v72-rail{position:absolute;z-index:12;right:7px;top:20%;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.52);border-radius:16px;background:rgba(10,43,67,.82);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);box-shadow:0 6px 18px rgba(0,0,0,.22)}.v72-rail button{width:31px;height:27px;border:0;border-bottom:1px solid rgba(255,255,255,.10);background:transparent;color:#fff;font-size:7px;font-weight:900}.v72-rail button.active{background:#e2b85b;color:#17354d}.v72-rail button:last-child{border:0}
.v72-scrollhint{position:absolute;z-index:11;right:8px;bottom:10px;padding:4px 6px;border-radius:7px;background:rgba(12,39,59,.66);color:#fff;font-size:6.3px;font-weight:800;pointer-events:none;transition:opacity .25s}.v72-scrollhint.hide{opacity:0}
#app.v72-world .stagehud{z-index:15!important;top:10px!important;left:10px!important;right:auto!important;display:block!important}#app.v72-world #occChip{padding:7px 10px!important;border:1.4px solid rgba(255,255,255,.82)!important;background:rgba(11,49,76,.78)!important;color:#fff!important;font-size:9px!important;box-shadow:0 3px 12px rgba(0,0,0,.15)!important}
#app.v72-world .hint{z-index:16!important;left:12px!important;right:12px!important;bottom:9px!important;padding:8px 10px!important;border:1.3px solid #dfbd70!important;background:rgba(255,249,234,.96)!important;color:#6e582b!important;box-shadow:0 4px 14px rgba(0,0,0,.14)!important}
#app.v72-world .bottom{background:linear-gradient(180deg,#fbf8f2,#f1eae0)!important;border-color:#decfbc!important;color:#17324d!important}.v72-world .action{height:60px!important;border-color:#d8cab7!important;background:#fff!important;color:#17324d!important}.v72-world .action.primary{background:linear-gradient(180deg,#163f63,#103555)!important;color:#fff!important;border-color:#163f63!important}.v72-world .speed button.on{background:#173d60!important;color:#fff!important}
@media(max-width:380px){#app.v72-world .stage{height:70vh!important;min-height:455px!important}.v72-rail{right:4px}.v72-rail button{width:28px;height:25px}}
</style>
'''
if 'id="v72-hardboot-css"' not in s:
    s=s.replace('</head>',css+'\n</head>',1)

# Export a tiny, explicit bridge from inside the original game IIFE. This is the key architectural fix.
bridge=r'''
window.__JYT__={
  getState:function(){return state},
  brands:brands,brandOrder:brandOrder,
  brand:function(){return brand()},
  mapFloorCount:function(){return mapFloorCount()},
  roomUnlocked:function(r){return roomUnlocked(r)},
  roomCode:function(r){return roomCode(r)},
  openRoomSheet:function(r){return openRoomSheet(r)},
  occupancy:function(){return occupancy()},
  showToast:function(t){return showToast(t)},
  save:function(){return saveState(true)}
};
'''
anchor='\n})();\n</script>\n\n\n'
if 'window.__JYT__=' not in s:
    pos=s.find(anchor)
    if pos<0: raise SystemExit('main IIFE tail missing')
    s=s[:pos]+bridge+s[pos:]

js=r'''
<script id="v72-hardboot-js">
(function(){
'use strict';
function boot(){
  var B=window.__JYT__;if(!B){setTimeout(boot,60);return}
  var S=B.getState(),hotel=document.getElementById('v72Hotel'),scroll=document.getElementById('v72Scroll'),art=document.getElementById('v72Art'),layer=document.getElementById('v72RoomLayer'),rail=document.getElementById('v72Rail'),plate=document.getElementById('v72BrandPlate');
  if(!hotel||!scroll||!art||!layer||!rail)return;
  S.visualMode='3d';
  var last='';
  function esc(x){return String(x==null?'':x).replace(/[&<>\"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}
  function roomAt(f,c){var a=S.rooms||[];for(var i=0;i<a.length;i++)if(a[i].f===f&&a[i].c===c)return a[i];return null}
  function idxOf(r){return (S.rooms||[]).indexOf(r)}
  function status(r,locked){if(locked)return'locked';if(!r||!r.type)return'empty';if(r.cleaning>0)return'cleaning';if(r.dirty)return'dirty';if(r.occupied)return'occupied';if(r.reserved)return'reserved';return'available'}
  function sig(){var a=[S.brand,S.weather,B.mapFloorCount(),(S.frontQueue||[]).length,(S.executiveQueue||[]).length],r,i;for(i=0;i<(S.rooms||[]).length;i++){r=S.rooms[i];a.push(r.f,r.c,r.type||'-',r.occupied?1:0,r.dirty?1:0,r.cleaning>0?1:0,r.reserved?1:0)}return a.join('|')}
  /* Coordinates map to the approved cutaway composition. 2F-4F are room-operable; 5F/6F remain club/wellness in the visual world. */
  var y={2:61.0,3:49.0,4:36.8},xs=[20.5,42.5,64.5],w=20.7,h=11.4;
  function render(){
    var html='',open=B.mapFloorCount();
    [2,3,4].forEach(function(floor){for(var c=0;c<3;c++){var r=roomAt(floor-2,c),locked=(floor-2)>=open,cl=status(r,locked),idx=r?idxOf(r):-1;html+='<button class="v72-roomhot '+cl+'" data-v72-room="'+idx+'" style="left:'+xs[c]+'%;top:'+y[floor]+'%;width:'+w+'%;height:'+h+'%"><span class="v72-roomtag">'+floor+'0'+(c+1)+'</span><i class="v72-state"></i></button>'}});
    layer.innerHTML=html;
    var bn='HYATT';try{bn=(B.brand().short||B.brand().name||'HYATT').toUpperCase()}catch(e){}plate.textContent=bn;
    rail.innerHTML='<button data-y="0">RF</button><button data-y="14">6F</button><button data-y="26">5F</button><button data-y="38">4F</button><button data-y="50">3F</button><button data-y="62">2F</button><button data-y="75">1F</button><button data-y="90">L</button>';
    var occ=document.getElementById('occChip');if(occ)occ.textContent='▥ 入住率 '+B.occupancy()+'%';
  }
  layer.addEventListener('click',function(e){var b=e.target.closest('[data-v72-room]');if(!b)return;var idx=parseInt(b.getAttribute('data-v72-room'),10);if(idx<0)return;var r=S.rooms[idx];if(!r)return;if(!B.roomUnlocked(r)){B.showToast('🔒 这一层尚未开放。');return}B.openRoomSheet(r)});
  rail.addEventListener('click',function(e){var b=e.target.closest('[data-y]');if(!b)return;var p=parseFloat(b.getAttribute('data-y'))/100,max=Math.max(0,scroll.scrollHeight-scroll.clientHeight);scroll.scrollTo({top:max*p,behavior:'smooth'})});
  scroll.addEventListener('scroll',function(){var n=document.querySelector('.v72-scrollhint');if(n)n.classList.add('hide')},{passive:true});
  function sync(){S=B.getState();var k=sig();if(k!==last){last=k;render()}}
  render();sync();setInterval(sync,500);
  requestAnimationFrame(function(){scroll.scrollTop=Math.max(0,scroll.scrollHeight-scroll.clientHeight*.94)});
}
boot();
})();
</script>
'''
if 'id="v72-hardboot-js"' not in s:
    s=s.replace('</body>',js+'\n</body>',1)

p.write_text(s,encoding='utf-8')
print('patched',len(s))
