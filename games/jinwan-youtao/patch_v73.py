from pathlib import Path
import re
p=Path('games/jinwan-youtao/index.html')
s=p.read_text(encoding='utf-8')

# idempotent cleanup
s=re.sub(r'<style id="v73-approved-master-css">[\s\S]*?</style>\s*','',s,count=1)
s=re.sub(r'<script id="v73-approved-master-js">[\s\S]*?</script>\s*','',s,count=1)

s=s.replace("QUEST_SYSTEM_VERSION='7.2.0'","QUEST_SYSTEM_VERSION='7.3.0'")
s=s.replace('class="v72-world visual3d" data-build="7.2.0"','class="v72-world v73-world visual3d" data-build="7.3.0"',1)
s=s.replace('class="v72-world v73-world visual3d" data-build="7.2.0"','class="v72-world v73-world visual3d" data-build="7.3.0"',1)
s=s.replace('assets/v66_reference_tower.svg?v=720','assets/v70_master2.webp?v=730')

css=r'''
<style id="v73-approved-master-css">
/* v7.3 — use the actually approved visual master, at its native 440×562 composition. */
#app.v73-world .stage{height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:440/562!important;overflow:hidden!important;background:#183a56!important}
#app.v73-world .scene3d,#app.v73-world #v72Hotel,#app.v73-world .v72-scroll,#app.v73-world .v72-art{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:0!important;overflow:hidden!important}
#app.v73-world .v72-art{background:#183a56!important}
#app.v73-world .v72-art>img{display:block!important;width:100%!important;height:100%!important;min-height:0!important;object-fit:fill!important;object-position:center!important;filter:none!important;transform:none!important}
#app.v73-world .v72-art:after{box-shadow:inset 0 0 26px rgba(4,18,29,.10)!important}
/* The approved art already has the right-side floor rail. Avoid the duplicate UI that made v7.2 look fake. */
#app.v73-world .v72-rail,#app.v73-world .v72-scrollhint{display:none!important}
/* Cover baked Hyatt Place labels with the live brand while keeping the same architectural sign language. */
#app.v73-world .v72-brandplate{right:4.1%!important;top:7.8%!important;width:17.7%!important;min-height:13.5%!important;padding:10px 4px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:linear-gradient(180deg,rgba(9,42,66,.97),rgba(8,34,55,.98))!important;border:1px solid rgba(255,255,255,.32)!important;font-size:8.6px!important;line-height:1.18!important;letter-spacing:.8px!important;text-shadow:0 1px 2px rgba(0,0,0,.30)!important}
.v73-lobbybrand{position:absolute;z-index:9;left:27.0%;top:86.0%;width:43%;height:5.7%;display:flex;align-items:center;justify-content:center;background:rgba(239,220,190,.92);color:#193a54;border-radius:3px;font-size:8px;font-weight:950;letter-spacing:.75px;box-shadow:0 2px 8px rgba(0,0,0,.12)}
/* Keep operations readable but visually subordinate. Hotspots are invisible; only state dots remain. */
#app.v73-world .v72-roomlayer{z-index:10!important}
#app.v73-world .v72-roomhot{border:0!important;background:transparent!important;border-radius:0!important}
#app.v73-world .v72-roomhot:active{background:rgba(255,245,208,.10)!important;box-shadow:inset 0 0 0 1px rgba(244,210,125,.72)!important}
#app.v73-world .v72-roomtag{display:none!important}
#app.v73-world .v72-state{right:6px!important;top:auto!important;bottom:5px!important;width:9px!important;height:9px!important;border:1.2px solid rgba(255,255,255,.93)!important;box-shadow:0 1px 5px rgba(0,0,0,.35)!important}
#app.v73-world .v72-roomhot.locked{background:rgba(13,31,44,.28)!important;backdrop-filter:saturate(.65) brightness(.76)}
/* HUD follows the approved mock: small floating occupancy badge, no redundant control furniture. */
#app.v73-world .stagehud{top:9px!important;left:10px!important;right:auto!important}
#app.v73-world #occChip{padding:6px 9px!important;background:rgba(12,49,76,.80)!important;border:1px solid rgba(255,255,255,.72)!important;font-size:8.5px!important;backdrop-filter:blur(7px)!important;-webkit-backdrop-filter:blur(7px)!important}
#app.v73-world .hint{bottom:8px!important;background:rgba(255,249,235,.96)!important}
/* Make the top/bottom chrome closer to the approved image instead of competing with it. */
#app.v73-world .top{background:linear-gradient(180deg,#0f4e82 0%,#0c426f 62%,#0a385f 100%)!important}
#app.v73-world .bottom{background:#f8f5ef!important}
@media(max-width:380px){#app.v73-world .v72-brandplate{font-size:7.8px!important}.v73-lobbybrand{font-size:7.3px}}
</style>
'''
s=s.replace('</head>',css+'\n</head>',1)

js=r'''
<script id="v73-approved-master-js">
(function(){
'use strict';
function boot(){
  var B=window.__JYT__;if(!B){setTimeout(boot,50);return}
  var S=B.getState(),art=document.getElementById('v72Art'),img=document.getElementById('v72TowerImg'),layer=document.getElementById('v72RoomLayer'),plate=document.getElementById('v72BrandPlate');
  if(!art||!img||!layer||!plate)return;
  img.src='assets/v70_master2.webp?v=730';
  var lobby=document.getElementById('v73LobbyBrand');if(!lobby){lobby=document.createElement('div');lobby.id='v73LobbyBrand';lobby.className='v73-lobbybrand';art.appendChild(lobby)}
  function brandName(){try{return (B.brand().short||B.brand().name||'HYATT').toUpperCase()}catch(e){return'HYATT'}}
  function roomAt(f,c){var a=S.rooms||[];for(var i=0;i<a.length;i++)if(a[i].f===f&&a[i].c===c)return a[i];return null}
  function idxOf(r){return (S.rooms||[]).indexOf(r)}
  function cls(r,locked){if(locked)return'locked';if(!r||!r.type)return'empty';if(r.cleaning>0)return'cleaning';if(r.dirty)return'dirty';if(r.occupied)return'occupied';if(r.reserved)return'reserved';return'available'}
  /* Native coordinates of the approved master: guest rooms 4F/3F/2F. */
  var rows=[{f:2,top:34.25},{f:1,top:46.15},{f:0,top:58.10}],xs=[17.4,38.6,59.8],w=20.3,h=10.9;
  var last='';
  function sig(){var a=[S.brand,S.weather,B.mapFloorCount()],r,i;for(i=0;i<(S.rooms||[]).length;i++){r=S.rooms[i];if(r.f<3)a.push(r.f,r.c,r.type||'-',r.occupied?1:0,r.dirty?1:0,r.cleaning>0?1:0,r.reserved?1:0)}return a.join('|')}
  function render(){
    var open=B.mapFloorCount(),h0='';
    rows.forEach(function(row){for(var c=0;c<3;c++){var r=roomAt(row.f,c),locked=row.f>=open,st=cls(r,locked),idx=r?idxOf(r):-1;h0+='<button class="v72-roomhot '+st+'" data-v73-room="'+idx+'" style="left:'+xs[c]+'%;top:'+row.top+'%;width:'+w+'%;height:'+h+'%"><i class="v72-state"></i></button>'}});
    layer.innerHTML=h0;plate.textContent=brandName();lobby.textContent=brandName();
    var occ=document.getElementById('occChip');if(occ)occ.textContent='▥ 入住率 '+B.occupancy()+'%';
  }
  layer.addEventListener('click',function(e){var b=e.target.closest('[data-v73-room]');if(!b)return;var idx=parseInt(b.getAttribute('data-v73-room'),10),r=(S.rooms||[])[idx];if(!r)return;if(!B.roomUnlocked(r)){B.showToast('🔒 该客房楼层尚未开放');return}B.openRoomSheet(r)});
  function sync(){var k=sig();if(k!==last){last=k;render()}}
  img.addEventListener('error',function(){B.showToast('视觉资源加载失败，请刷新后重试')});
  img.addEventListener('load',function(){render()});
  render();setInterval(sync,650);
}
boot();
})();
</script>
'''
s=s.replace('</body>',js+'\n</body>',1)
p.write_text(s,encoding='utf-8')
