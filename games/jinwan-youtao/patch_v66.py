from pathlib import Path
import re

p = Path('games/jinwan-youtao/index.html')
s = p.read_text(encoding='utf-8')

# Idempotent reruns.
s = re.sub(r'\n?<style id="v66-reference-ui">[\s\S]*?</style>\n?', '\n', s)
s = re.sub(r'\n?<script id="v66-reference-ui-js">[\s\S]*?</script>\n?', '\n', s)

# v6.6 becomes the main visual pass; keep classic 2D as a fallback/manual view.
s = s.replace("QUEST_SYSTEM_VERSION='6.5.0'", "QUEST_SYSTEM_VERSION='6.6.0'")
s = s.replace("visualMode:'2d'", "visualMode:'3d'", 1)

css = r'''
<style id="v66-reference-ui">
/* v6.6 — pixel-locked visual pass based on the approved hotel reference. */
:root{--v66-navy:#0d3b67;--v66-navy2:#082d50;--v66-gold:#d2a23f;--v66-cream:#f8f4ed;--v66-line:#dfcba4;--v66-ink:#122c48}
@media (max-width:520px){body.v66-github-host{padding-top:0!important}}
body.v66-github-host #app{min-height:100dvh}
#app.visual3d{background:#102f4e!important;color:#f7f5ef}
.visual3d .top{background:linear-gradient(180deg,#104b80 0%,#0c3d6b 56%,#0a355d 100%)!important;border-bottom:0!important;color:#fff!important;padding:12px 12px 11px!important;box-shadow:0 8px 22px rgba(3,22,39,.20)}
.visual3d .game-title h1{font-size:24px!important;line-height:1!important;letter-spacing:-.7px!important;color:#fff!important;text-shadow:0 1px 0 rgba(0,0,0,.08)}
.visual3d .game-title small{display:none!important}
.visual3d .metrics{gap:6px!important}.visual3d .pill{margin:0!important;padding:6px 10px!important;border:1.5px solid rgba(255,255,255,.78)!important;background:rgba(4,35,62,.30)!important;color:#fff!important;box-shadow:inset 0 1px rgba(255,255,255,.13),0 3px 12px rgba(1,20,34,.12);font-size:10px!important}
.visual3d .pill.warn{border-color:#d9a950!important;background:rgba(57,40,11,.30)!important}.visual3d .pill.good{border-color:#79b5c2!important;background:rgba(8,72,87,.26)!important}
.visual3d .propertyline{margin-top:8px!important;color:rgba(255,255,255,.92)!important;font-size:10px!important}.visual3d .propertyline b{color:#fff!important}.visual3d .rolechip{background:rgba(8,32,53,.46)!important;color:#fff!important;border:1px solid rgba(255,255,255,.10);padding:4px 8px!important}
.visual3d .statusgrid{grid-gap:7px!important;margin-top:8px!important}.visual3d .meter{height:20px!important;border-radius:999px!important;background:rgba(245,239,228,.92)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}.visual3d .meter i{background:linear-gradient(90deg,#bc8830,#e0b858)!important}.visual3d .meter.owner i{background:linear-gradient(90deg,#173d62,#0c6a83)!important}.visual3d .meter span{top:3px!important;font-size:8.7px!important;color:#fff!important;text-shadow:0 1px 2px rgba(0,0,0,.33)}
.visual3d .goalstrip{margin-top:8px!important;padding:8px 10px!important;border:1.5px solid #e2b95f!important;border-radius:12px!important;background:#fffdf7!important;color:#193653!important;box-shadow:0 3px 11px rgba(2,26,45,.15)!important;font-size:9.5px!important}.visual3d .goalstrip b{color:#173a5c!important}.visual3d .goalstrip .right{color:#163a5e!important}
.visual3d .stage{height:160vw!important;min-height:590px!important;max-height:730px!important;background:#224d70!important;overflow:hidden!important}
.visual3d .scene3d{opacity:1!important;transform:none!important;background:none!important;filter:none!important;overflow:hidden!important}
.visual3d .scene3d>*:not(#v66ReferenceStage){display:none!important}
#v66ReferenceStage{position:absolute;inset:0;z-index:1;overflow:hidden;background:linear-gradient(180deg,#6f99b5 0%,#a8c1ce 31%,#d1b893 75%,#8c725f 100%)}
.v66-scroll{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:none;touch-action:pan-y;background:#2a5575}.v66-scroll::-webkit-scrollbar{display:none}
.v66-art{position:relative;width:100%;min-height:100%;isolation:isolate;background:#264b68}.v66-art>img{position:relative;z-index:0;width:100%;height:auto;display:block;user-select:none;-webkit-user-drag:none;pointer-events:none;filter:saturate(1.03) contrast(1.015)}
.v66-art:after{content:"";position:absolute;z-index:2;inset:0;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),inset 0 -60px 80px rgba(11,31,45,.09)}
.v66-brandmask{position:absolute;z-index:4;right:0;top:1.0%;width:17.5%;height:15.7%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5px 3px;background:linear-gradient(180deg,rgba(17,43,65,.98),rgba(13,38,60,.96));color:#fff;text-align:center;box-shadow:-5px 0 12px rgba(3,18,29,.16)}.v66-branddots{width:34px;height:34px;display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:5px}.v66-branddots i{display:block;border-radius:50%;background:#d9b453}.v66-branddots i:nth-child(2),.v66-branddots i:nth-child(4),.v66-branddots i:nth-child(6){background:#83b4c0}.v66-branddots i:nth-child(3),.v66-branddots i:nth-child(7){background:#eee4ca}.v66-brandmask strong{font-size:8.6px;line-height:1.05;letter-spacing:.5px}.v66-brandmask small{margin-top:6px;font-size:5.4px;line-height:1.28;color:rgba(255,255,255,.72)}
.v66-lobbybrand{position:absolute;z-index:4;left:26%;bottom:7.7%;width:45%;padding:4px 6px;border-radius:4px;background:rgba(246,234,214,.76);backdrop-filter:blur(2px);color:#23384a;text-align:center;font-size:8.3px;font-weight:950;letter-spacing:.6px;box-shadow:0 2px 7px rgba(0,0,0,.10)}
.v66-roomlayer{position:absolute;z-index:5;inset:0;pointer-events:none}.v66-roomhot{position:absolute;pointer-events:auto;border:1.5px solid transparent;border-radius:3px;background:transparent;color:#152c3c;text-align:left;padding:0;overflow:visible}.v66-roomhot:active{background:rgba(255,255,255,.09);border-color:#f2d68b}.v66-roomhot.locked{background:rgba(20,30,37,.43);border-color:rgba(255,255,255,.08)}
.v66-roomno{position:absolute;left:4px;top:3px;padding:1px 4px;border-radius:5px;background:rgba(255,248,235,.82);font-size:7.4px;font-weight:950;box-shadow:0 1px 2px rgba(0,0,0,.09)}.v66-roomhot.locked .v66-roomno{color:#d7dde0;background:rgba(31,47,59,.74)}
.v66-status{position:absolute;left:4px;right:4px;bottom:3px;min-height:10px;border-radius:2px;padding:2px 3px;background:#6fd685;color:#0c3822;text-align:center;font-size:5.9px;line-height:1;font-weight:950;letter-spacing:.2px;box-shadow:0 1px 2px rgba(0,0,0,.14)}.v66-status.occupied{background:#f2ca5d;color:#433109}.v66-status.cleaning{background:#70b9e6;color:#17374c}.v66-status.dirty{background:#db8b79;color:#58241e}.v66-status.reserved{background:#e7bd68;color:#4b3510}.v66-status.empty{background:#d7d1c7;color:#5a5146}.v66-status.locked{background:#344a5b;color:#e7edf0}
.v66-thought{position:absolute;z-index:7;left:50%;bottom:16px;max-width:92px;transform:translateX(-50%);padding:3px 5px;border-radius:7px;background:rgba(255,255,255,.94);border:1px solid rgba(49,48,44,.16);color:#333;font-size:5.7px;line-height:1.18;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.12);white-space:normal}.v66-thought:after{content:"";position:absolute;left:50%;bottom:-3px;width:5px;height:5px;background:#fff;transform:translateX(-50%) rotate(45deg);border-right:1px solid rgba(49,48,44,.12);border-bottom:1px solid rgba(49,48,44,.12)}
.v66-rail{position:absolute;z-index:8;right:8px;top:25%;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.45);border-radius:16px;background:rgba(19,45,65,.78);backdrop-filter:blur(7px);box-shadow:0 5px 16px rgba(0,0,0,.18)}.v66-rail button{width:31px;height:27px;border:0;border-bottom:1px solid rgba(255,255,255,.10);background:transparent;color:#fff;font-size:7.5px;font-weight:900}.v66-rail button:last-child{border-bottom:0}.v66-rail button.active{background:#e8c26f;color:#18344a}.v66-rail button:active{background:rgba(255,255,255,.18)}
.v66-weather{position:absolute;z-index:9;right:10px;top:10px;padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.72);background:rgba(24,55,79,.76);color:#fff;font-size:8px;font-weight:900;box-shadow:0 3px 12px rgba(0,0,0,.16);pointer-events:none}.v66-scrollhint{position:absolute;z-index:8;right:9px;bottom:11px;padding:4px 6px;border-radius:8px;background:rgba(15,37,53,.66);color:rgba(255,255,255,.88);font-size:6.4px;font-weight:800;pointer-events:none;transition:opacity .3s}.v66-scrollhint.hide{opacity:0}
.visual3d #people3d,.visual3d #tower2dScroll{opacity:0!important;pointer-events:none!important}.visual3d .stage-fallback{display:none!important}
.visual3d .stagehud{z-index:12!important;top:10px!important;left:10px!important;right:10px!important;align-items:center!important}.visual3d #occChip{padding:7px 10px!important;border:1.4px solid rgba(255,255,255,.82)!important;background:rgba(20,53,77,.78)!important;color:#fff!important;font-size:9px!important;box-shadow:0 3px 13px rgba(0,0,0,.16)!important}.visual3d #explorerChip{display:none!important}.visual3d .viewtoggle{top:0!important;border:1.4px solid rgba(255,255,255,.70)!important;background:rgba(246,241,232,.94)!important;box-shadow:0 3px 13px rgba(0,0,0,.12)!important}.visual3d .viewtoggle button{padding:5px 10px!important;color:#5e5a54!important;font-size:8.5px!important}.visual3d .viewtoggle button.on{background:#123a5d!important;color:#fff!important}.visual3d .sceneops,.visual3d .scenecaption{display:none!important}
.visual3d .hint{left:12px!important;right:12px!important;bottom:10px!important;padding:8px 10px!important;border:1.3px solid #e2bd6c!important;border-radius:12px!important;background:rgba(255,250,236,.96)!important;color:#735a27!important;box-shadow:0 4px 14px rgba(0,0,0,.14)!important;font-size:8.8px!important}
.visual3d .bottom{background:linear-gradient(180deg,#f8f5ef,#efe9df)!important;border-top:1px solid #dfd1bd!important;color:#162f49!important;padding-top:9px!important}.visual3d .actions{grid-gap:7px!important}.visual3d .action{height:60px!important;border:1px solid #d7c8b5!important;border-radius:15px!important;background:rgba(255,255,255,.94)!important;color:#17334d!important;box-shadow:0 2px 7px rgba(63,47,30,.06)!important;font-size:10px!important}.visual3d .action span{font-size:21px!important}.visual3d .action.primary{background:linear-gradient(180deg,#153f63,#0f3455)!important;border-color:#153f63!important;color:#fff!important}.visual3d .feed{border:1px solid #d9ccba!important;background:#f6f1e8!important;color:#6c6256!important}.visual3d .feed b{color:#302c27!important}.visual3d .foot{color:#756d63!important}.visual3d .speed button{background:#ded5c9!important;color:#61594f!important}.visual3d .speed button.on{background:#163d60!important;color:#fff!important}
@media(max-width:380px){.visual3d .game-title h1{font-size:21px!important}.visual3d .pill{padding:5px 7px!important}.v66-rail{right:5px}.v66-rail button{width:27px;height:25px}.v66-brandmask{width:18.5%}}
</style>
'''

js = r'''
<script id="v66-reference-ui-js">
(function(){
  if(window.__v66ReferenceReady)return;window.__v66ReferenceReady=true;
  var stage=$('stage'),scene=$('scene3d');if(!stage||!scene)return;
  if(/github\.io$/i.test(location.hostname)){document.body.classList.add('v66-github-host');document.documentElement.style.setProperty('--host-top-offset','0px')}
  try{if(localStorage.getItem('jinwan-v66-reference-default')!=='1'){state.visualMode='3d';localStorage.setItem('jinwan-v66-reference-default','1');saveState(true)}}catch(e){state.visualMode='3d'}
  scene.innerHTML='';
  var root=document.createElement('div');root.id='v66ReferenceStage';
  root.innerHTML='<div class="v66-scroll" id="v66Scroll"><div class="v66-art" id="v66Art"><img id="v66TowerImg" src="assets/v66_reference_tower.webp" alt="hotel cutaway"><div class="v66-brandmask" id="v66BrandMask"></div><div class="v66-lobbybrand" id="v66LobbyBrand"></div><div class="v66-roomlayer" id="v66RoomLayer"></div></div></div><div class="v66-weather" id="v66Weather"></div><div class="v66-rail" id="v66Rail"></div><div class="v66-scrollhint" id="v66ScrollHint">↕ 上下滑动查看整栋酒店</div>';
  scene.appendChild(root);
  var scroll=$('v66Scroll'),art=$('v66Art'),roomLayer=$('v66RoomLayer'),rail=$('v66Rail'),brandMask=$('v66BrandMask'),lobbyBrand=$('v66LobbyBrand'),weather=$('v66Weather'),hint=$('v66ScrollHint'),img=$('v66TowerImg');
  var roomTop=23.35,rowStep=7.12,rowHeight=6.77,colLeft=[3.0,34.7,66.5],colWidth=29.7,lastKey='';
  function esc(x){return String(x==null?'':x).replace(/[&<>\"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}
  function statusOf(r,locked){if(locked)return['LOCKED','locked'];if(!r.type)return['EMPTY','empty'];if(r.reserved)return['RESERVED','reserved'];if(r.occupied)return['IN HOUSE','occupied'];if(r.cleaning>0)return['CLEANING','cleaning'];if(r.dirty)return['DIRTY','dirty'];return['AVAILABLE','available']}
  function shortThought(gu){if(!gu)return'';var t='';try{t=guestThought(gu)||''}catch(e){}t=String(t).replace(/[“”\"]/g,'').trim();if(!t)return'';return t.length>13?t.slice(0,13)+'…':t}
  function brandTag(){var k=state.brand||'place',m={place:'Good People · Good Stays',regency:'Connection · Energy',grand:'Grand Moments',andaz:'Local · Creative',alila:'Nature · Ritual',park:'Luxury · Residence'};return m[k]||'A Brighter Stay Ahead'}
  function renderBrand(){var name=brand().name||brand().short;brandMask.innerHTML='<span class="v66-branddots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><strong>'+esc(name.toUpperCase())+'</strong><small>'+esc(brandTag())+'</small>';lobbyBrand.textContent=name.toUpperCase();weather.textContent=(state.weather==='rain'?'🌧️':'🌤️')+' 深圳 · '+(state.weather==='rain'?'24':'26')+'°C'}
  function roomKey(){var a=[state.brand,mapFloorCount(),state.weather],i,r;for(i=0;i<state.rooms.length;i++){r=state.rooms[i];a.push(r.f,r.c,r.type||'-',r.occupied?1:0,r.dirty?1:0,r.cleaning>0?1:0,r.reserved?1:0,r.guest||0)}return a.join('|')}
  function renderRooms(force){var key=roomKey();if(!force&&key===lastKey)return;lastKey=key;var h='',f,c,r,idx,locked,st,gu,thought,top,left;for(f=0;f<7;f++){for(c=0;c<3;c++){idx=f*3+c;r=state.rooms[idx];if(!r)continue;locked=!roomUnlocked(r);st=statusOf(r,locked);gu=roomGuest(r);thought=gu&&r.occupied?shortThought(gu):'';top=roomTop+(6-f)*rowStep;left=colLeft[c];h+='<button class="v66-roomhot '+(locked?'locked':'')+'" data-v66-room="'+idx+'" style="left:'+left+'%;top:'+top+'%;width:'+colWidth+'%;height:'+rowHeight+'%"><span class="v66-roomno">'+esc(roomCode(r))+'</span>'+(thought?'<span class="v66-thought">'+esc(thought)+'</span>':'')+'<span class="v66-status '+st[1]+'">'+st[0]+'</span></button>'}}roomLayer.innerHTML=h;renderRail()}
  function renderRail(){var h='<button data-v66-y="0">RF</button>',f;for(f=8;f>=2;f--)h+='<button data-v66-floor="'+f+'">'+f+'F</button>';h+='<button data-v66-y="82">1F</button><button data-v66-y="92">L</button>';rail.innerHTML=h}
  function scrollToPct(p){var max=Math.max(0,scroll.scrollHeight-scroll.clientHeight);scroll.scrollTo({top:max*(Math.max(0,Math.min(100,p))/100),behavior:'smooth'})}
  roomLayer.addEventListener('click',function(e){var b=e.target.closest('[data-v66-room]');if(!b)return;var idx=parseInt(b.getAttribute('data-v66-room'),10),r=state.rooms[idx];if(!r)return;if(!roomUnlocked(r)){showToast('🔒 '+(r.f+2)+'F 尚未开放。随着酒店定位升级继续解锁。');return}openRoomSheet(r)});
  rail.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-v66-y')){scrollToPct(parseFloat(b.getAttribute('data-v66-y')));return}var floor=parseInt(b.getAttribute('data-v66-floor'),10),f=floor-2,top=roomTop+(6-f)*rowStep,view=(top/100)*(art.offsetHeight||1),max=Math.max(0,scroll.scrollHeight-scroll.clientHeight);scroll.scrollTo({top:Math.max(0,Math.min(max,view-scroll.clientHeight*.32)),behavior:'smooth'})});
  scroll.addEventListener('scroll',function(){if(hint)hint.classList.add('hide')},{passive:true});
  function sync(force){renderBrand();renderRooms(force);if($('occChip'))$('occChip').textContent='▥ 入住率 '+occupancy()+'%'}
  var oldUpdate=updateUI;updateUI=function(){oldUpdate.apply(this,arguments);sync(false)};
  var oldApply=applyVisualMode;applyVisualMode=function(){oldApply.apply(this,arguments);if(state.visualMode==='3d'){sync(false);requestAnimationFrame(function(){stage.classList.add('mode3d')})}};
  img.addEventListener('load',function(){sync(true);requestAnimationFrame(function(){scroll.scrollTop=Math.max(0,scroll.scrollHeight-scroll.clientHeight)})});
  applyVisualMode();sync(true);requestAnimationFrame(function(){scroll.scrollTop=Math.max(0,scroll.scrollHeight-scroll.clientHeight)});
})();
</script>
'''

s = s.replace('</head>', css + '\n</head>')
s = s.replace('</body>', js + '\n</body>')
p.write_text(s, encoding='utf-8')
print('patched v6.6 reference UI', len(s))
