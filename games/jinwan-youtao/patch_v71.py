from pathlib import Path
import re

p=Path('games/jinwan-youtao/index.html')
s=p.read_text(encoding='utf-8')

# Idempotent cleanup of this pass only.
s=re.sub(r'\n?<style id="v71-single-hotel-css">[\s\S]*?</style>\n?','\n',s)
s=re.sub(r'\n?<script id="v71-single-hotel-js">[\s\S]*?</script>\n?','\n',s)

# New canonical version. Do not depend on the old visual-mode flag for presentation.
s=re.sub(r"QUEST_SYSTEM_VERSION='[^']+'","QUEST_SYSTEM_VERSION='7.1.0'",s)

css=r'''
<style id="v71-single-hotel-css">
/* v7.1 — ONE WORLD. The hotel itself is now the primary game screen. */
:root{--v71-navy:#0b385f;--v71-navy2:#082947;--v71-gold:#d7a947;--v71-cream:#fbf7ef;--v71-ink:#17324d}
html,body{overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;background:#071d31!important}
#app.v71-world{background:#0b2f4d!important;box-shadow:0 0 42px rgba(0,0,0,.28)!important}
#app.v71-world .top{position:relative!important;z-index:20!important;background:linear-gradient(180deg,#0e4b80 0%,#0b3f6d 58%,#0a355d 100%)!important;border:0!important;color:#fff!important;padding:12px 12px 11px!important;box-shadow:0 10px 28px rgba(0,17,31,.24)!important}
#app.v71-world .game-title h1{font-size:24px!important;line-height:1!important;color:#fff!important;letter-spacing:-.8px!important;text-shadow:0 2px 9px rgba(0,0,0,.15)!important}
#app.v71-world .game-title small{display:none!important}
#app.v71-world .metrics{gap:6px!important}
#app.v71-world .pill{margin:0!important;padding:6px 10px!important;border:1.4px solid rgba(255,255,255,.78)!important;background:rgba(6,31,54,.28)!important;color:#fff!important;box-shadow:0 3px 12px rgba(0,0,0,.12)!important;font-size:10px!important}
#app.v71-world .pill.warn{border-color:#e0b35f!important;background:rgba(65,47,15,.28)!important}
#app.v71-world .propertyline{margin-top:8px!important;color:rgba(255,255,255,.88)!important;font-size:10px!important}
#app.v71-world .propertyline b{color:#fff!important}
#app.v71-world .rolechip{background:rgba(7,31,52,.42)!important;color:#fff!important;border:1px solid rgba(255,255,255,.10)!important;padding:4px 8px!important}
#app.v71-world .statusgrid{grid-gap:7px!important;margin-top:8px!important}
#app.v71-world .meter{height:20px!important;border-radius:999px!important;background:rgba(242,239,232,.94)!important}
#app.v71-world .meter i{background:linear-gradient(90deg,#b78329,#e0b854)!important}
#app.v71-world .meter.owner i{background:linear-gradient(90deg,#173f65,#14838c)!important}
#app.v71-world .meter span{top:3px!important;font-size:8.7px!important;color:#fff!important;text-shadow:0 1px 2px rgba(0,0,0,.35)!important}
#app.v71-world .goalstrip{margin-top:8px!important;padding:8px 10px!important;border:1.5px solid #e1b85d!important;border-radius:12px!important;background:#fffdf7!important;color:#193653!important;box-shadow:0 4px 13px rgba(2,26,45,.16)!important;font-size:9.5px!important}
#app.v71-world .goalstrip b,#app.v71-world .goalstrip .right{color:#173a5c!important}

/* Kill the old split-view presentation. Gameplay DOM remains for compatibility only. */
#app.v71-world #game,#app.v71-world #people3d,#app.v71-world .stage-fallback,#app.v71-world #viewToggle,#app.v71-world #explorerChip,#app.v71-world #propertyBadge,#app.v71-world #designHotspots,#app.v71-world #constructionHud,#app.v71-world .sceneops,#app.v71-world .scenecaption,#app.v71-world .viewnote{display:none!important}
#app.v71-world .stagehud{z-index:18!important;top:12px!important;left:12px!important;right:auto!important;display:block!important;pointer-events:none!important}
#app.v71-world #occChip{display:inline-flex!important;align-items:center!important;padding:7px 10px!important;border:1.4px solid rgba(255,255,255,.82)!important;border-radius:999px!important;background:rgba(10,47,75,.76)!important;color:#fff!important;font-size:9px!important;box-shadow:0 4px 15px rgba(0,0,0,.18)!important}
#app.v71-world .stage{position:relative!important;width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:400/900!important;overflow:visible!important;background:#214b68!important}
#app.v71-world .scene3d{position:absolute!important;inset:0!important;z-index:1!important;display:block!important;opacity:1!important;transform:none!important;background:none!important;overflow:visible!important;transition:none!important}
#app.v71-world .scene3d>*:not(#v71Hotel){display:none!important}
#app.v71-world .stage:after{display:none!important}
#v71Hotel{position:absolute;inset:0;z-index:2;overflow:hidden;background:linear-gradient(180deg,#517fa2 0%,#92aeba 34%,#caa881 75%,#66524b 100%);isolation:isolate}
#v71Hotel:before{content:"";position:absolute;z-index:2;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(4,29,54,.20) 0%,rgba(26,58,82,.04) 35%,rgba(75,39,18,.07) 100%);mix-blend-mode:multiply}
#v71Hotel:after{content:"";position:absolute;z-index:9;inset:0;pointer-events:none;box-shadow:inset 0 0 60px rgba(2,18,31,.18),inset 0 -90px 90px rgba(15,25,32,.13)}
.v71-art{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;filter:saturate(1.10) contrast(1.035) brightness(.97);user-select:none;-webkit-user-drag:none;pointer-events:none}
.v71-brandplate{position:absolute;z-index:7;right:2.5%;top:10.5%;width:17.5%;min-height:11%;padding:12px 5px 8px;background:linear-gradient(180deg,rgba(13,48,75,.97),rgba(8,37,61,.97));border:1px solid rgba(255,255,255,.28);box-shadow:0 8px 20px rgba(0,0,0,.24);color:#fff;text-align:center}
.v71-branddots{width:28px;height:28px;margin:0 auto 7px;display:grid;grid-template-columns:repeat(3,1fr);gap:2px}.v71-branddots i{border-radius:50%;background:#e0b85d}.v71-branddots i:nth-child(2n){background:#7fb5bc}.v71-branddots i:nth-child(3n){background:#eee6d3}
.v71-brandplate b{display:block;font-size:8.5px;line-height:1.1;letter-spacing:.5px;word-break:break-word}.v71-brandplate small{display:block;margin-top:6px;font-size:5px;line-height:1.35;color:rgba(255,255,255,.68)}
.v71-weather{position:absolute;z-index:10;right:3%;top:2.2%;padding:5px 8px;border:1px solid rgba(255,255,255,.68);border-radius:999px;background:rgba(13,49,76,.74);color:#fff;font-size:7px;font-weight:900;box-shadow:0 4px 12px rgba(0,0,0,.15)}
.v71-floorlabel{position:absolute;z-index:8;left:0;width:12.5%;padding:5px 2px;background:linear-gradient(180deg,rgba(18,57,86,.96),rgba(10,43,68,.96));border-top:1px solid rgba(255,255,255,.15);border-bottom:1px solid rgba(0,0,0,.18);color:#fff;text-align:center;box-shadow:3px 0 9px rgba(0,0,0,.10)}
.v71-floorlabel b{display:block;font-size:9px;line-height:1.05}.v71-floorlabel span{display:block;margin-top:2px;font-size:5px;opacity:.72;letter-spacing:.2px}
.v71-roomlayer{position:absolute;z-index:11;inset:0;pointer-events:none}
.v71-room{position:absolute;pointer-events:auto;border:1.5px solid transparent;background:transparent;padding:0;overflow:visible;border-radius:2px;color:#172b3a;transition:.16s}
.v71-room:active{border-color:#f2d27d;background:rgba(255,239,188,.08)}
.v71-room.occupied{box-shadow:inset 0 0 18px rgba(255,197,84,.17)}
.v71-room.cleaning{box-shadow:inset 0 0 18px rgba(91,183,231,.20)}
.v71-room.dirty{box-shadow:inset 0 0 18px rgba(216,99,68,.20)}
.v71-room.locked{background:rgba(13,29,41,.50);border-color:rgba(255,255,255,.07);backdrop-filter:saturate(.45)}
.v71-roomno{position:absolute;left:3px;top:3px;padding:1px 4px;border-radius:5px;background:rgba(255,249,238,.88);font-size:7px;font-weight:950;box-shadow:0 1px 3px rgba(0,0,0,.13)}
.v71-roomicon{position:absolute;right:4px;top:4px;min-width:15px;height:15px;padding:1px 3px;display:flex;align-items:center;justify-content:center;border-radius:999px;background:rgba(17,54,80,.88);color:#fff;font-size:7px;box-shadow:0 2px 5px rgba(0,0,0,.18)}
.v71-room.occupied .v71-roomicon{background:#d2a440;color:#2f2612}.v71-room.cleaning .v71-roomicon{background:#66afd9}.v71-room.dirty .v71-roomicon{background:#c86e5b}.v71-room.locked .v71-roomicon{background:#263c4c}
.v71-guest{position:absolute;left:58%;bottom:9%;width:11px;height:20px;border-radius:5px 5px 3px 3px;background:#173f62;box-shadow:0 2px 5px rgba(0,0,0,.28)}.v71-guest:before{content:"";position:absolute;left:1px;top:-8px;width:9px;height:9px;border-radius:50%;background:#e6bea0;box-shadow:0 -3px 0 #29221e}.v71-guest:after{content:"";position:absolute;left:2px;bottom:-4px;width:2px;height:5px;background:#3f3833;box-shadow:5px 0 0 #3f3833}
.v71-emptyplus{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);font-size:16px;font-weight:300;color:rgba(34,42,48,.45);text-shadow:0 1px rgba(255,255,255,.6)}
.v71-lobbyqueue{position:absolute;z-index:13;left:40%;bottom:7.2%;display:flex;gap:5px;align-items:flex-end;pointer-events:none}.v71-qperson{width:10px;height:19px;border-radius:5px 5px 2px 2px;background:#213e58;position:relative;box-shadow:0 2px 4px rgba(0,0,0,.22)}.v71-qperson:before{content:"";position:absolute;left:1px;top:-8px;width:8px;height:8px;border-radius:50%;background:#e5bda0;box-shadow:0 -2px 0 #2a2420}
.v71-queuepill{position:absolute;z-index:14;left:36%;bottom:10.2%;padding:3px 6px;border-radius:999px;background:#fff9ef;border:1px solid #d7b766;color:#6b5728;font-size:6px;font-weight:900;box-shadow:0 2px 7px rgba(0,0,0,.15)}
#v71Rail{position:fixed;z-index:45;right:max(6px,calc((100vw - 440px)/2 + 6px));top:27vh;display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.50);border-radius:17px;background:rgba(9,42,67,.84);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 8px 24px rgba(0,0,0,.24)}
#v71Rail.show{display:flex}#v71Rail button{width:33px;height:29px;border:0;border-bottom:1px solid rgba(255,255,255,.10);background:transparent;color:#fff;font-size:7px;font-weight:900}#v71Rail button:last-child{border:0}#v71Rail button.active{background:#e0b65a;color:#17344c}
#app.v71-world .hint{z-index:16!important;left:12px!important;right:12px!important;bottom:10px!important;padding:8px 10px!important;border:1.4px solid #e2bc69!important;border-radius:12px!important;background:rgba(255,250,237,.96)!important;color:#715b2c!important;font-size:8.8px!important;box-shadow:0 4px 14px rgba(0,0,0,.14)!important}
#app.v71-world .bottom{background:linear-gradient(180deg,#fbf8f2,#f2ece3)!important;border-color:#dfd2c0!important;color:#17324d!important;padding-top:9px!important}
#app.v71-world .actions{grid-gap:7px!important}#app.v71-world .action{height:60px!important;border:1px solid #d9cbb9!important;border-radius:15px!important;background:rgba(255,255,255,.96)!important;color:#17324d!important;box-shadow:0 2px 8px rgba(59,43,27,.06)!important;font-size:10px!important}#app.v71-world .action span{font-size:21px!important}#app.v71-world .action.primary{background:linear-gradient(180deg,#153f63,#103554)!important;border-color:#153f63!important;color:#fff!important}
#app.v71-world .feed{border-color:#d9ccba!important;background:#f6f1e8!important;color:#665f56!important}#app.v71-world .feed b{color:#302c27!important}#app.v71-world .foot{color:#756d63!important}#app.v71-world .speed button{background:#ded5c9!important;color:#61594f!important}#app.v71-world .speed button.on{background:#163d60!important;color:#fff!important}
@media(max-width:380px){#app.v71-world .game-title h1{font-size:22px!important}.v71-brandplate{width:18.5%}.v71-floorlabel{width:13%}#v71Rail{right:4px}#v71Rail button{width:29px;height:27px}}
</style>
'''

js=r'''
<script id="v71-single-hotel-js">
(function(){
  'use strict';
  var app=document.getElementById('app'),stage=document.getElementById('stage'),scene=document.getElementById('scene3d');
  if(!app||!stage||!scene||typeof state==='undefined')return;
  app.classList.add('v71-world');
  document.body.classList.add('v71-world-body');

  /* Park/portfolio progression now has real vertical capacity: 2..7 guest-room floors. */
  window.mapFloorCount=function(){var i=(typeof brandOrder!=='undefined'?brandOrder.indexOf(state.brand):-1);return Math.max(2,Math.min(7,i+2));};
  function ensureRooms(){
    if(!Array.isArray(state.rooms))state.rooms=[];
    for(var f=0;f<7;f++)for(var c=0;c<3;c++){
      var hit=state.rooms.some(function(r){return r.f===f&&r.c===c});
      if(!hit)state.rooms.push({f:f,c:c,type:null,occupied:false,dirty:false,cleaning:0,reserved:false,guest:null,review:null});
    }
  }
  ensureRooms();

  /* Presentation is single-mode now. Legacy view state remains only so old save/event code keeps working. */
  state.visualMode='3d';
  stage.classList.add('mode3d');
  app.classList.add('visual3d');
  var oldToggle=document.getElementById('viewToggle');if(oldToggle)oldToggle.setAttribute('aria-hidden','true');

  var hotel=document.getElementById('v71Hotel');
  if(!hotel){hotel=document.createElement('div');hotel.id='v71Hotel';scene.appendChild(hotel)}
  scene.querySelectorAll(':scope > *').forEach(function(n){if(n!==hotel)n.style.display='none'});

  var rail=document.getElementById('v71Rail');
  if(!rail){rail=document.createElement('div');rail.id='v71Rail';document.body.appendChild(rail)}

  var rowY=[594,530,466,402,338,274,210], xs=[12,139,266], roomW=119, roomH=61;
  function esc(x){return String(x==null?'':x).replace(/[&<>\"]/g,function(a){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[a]})}
  function brandName(){try{return brands[state.brand].short||brands[state.brand].name}catch(e){return 'HYATT'}}
  function roomAt(f,c){for(var i=0;i<state.rooms.length;i++)if(state.rooms[i].f===f&&state.rooms[i].c===c)return state.rooms[i];return null}
  function roomIndex(r){return state.rooms.indexOf(r)}
  function roomClass(r,locked){if(locked)return'locked';if(!r||!r.type)return'empty';if(r.cleaning>0)return'cleaning';if(r.dirty)return'dirty';if(r.occupied)return'occupied';if(r.reserved)return'reserved';return'available'}
  function roomIcon(r,locked){if(locked)return'🔒';if(!r||!r.type)return'＋';if(r.cleaning>0)return'🧹';if(r.dirty)return'🔧';if(r.occupied)return r.reserved?'👑':'●';if(r.reserved)return'◆';return'✓'}
  function floorLabel(f){var n=f+2;return'<div class="v71-floorlabel" style="top:'+((rowY[f]-2)/900*100).toFixed(3)+'%;height:'+((roomH+8)/900*100).toFixed(3)+'%"><b>'+n+'F</b><span>客房<br>GUEST ROOMS</span></div>'}
  function brandDots(){var h='<div class="v71-branddots">';for(var i=0;i<9;i++)h+='<i></i>';return h+'</div>'}
  function render(){
    ensureRooms();
    var html='<img class="v71-art" src="assets/v66_reference_tower.svg?v=711" alt="hotel cutaway">';
    html+='<div class="v71-weather">'+(state.weather==='rain'?'🌧️':'🌤️')+' 深圳 · '+(state.weather==='rain'?'24':'26')+'°C</div>';
    html+='<div class="v71-brandplate">'+brandDots()+'<b>'+esc(brandName()).toUpperCase()+'</b><small>GOOD PEOPLE<br>GOOD STAYS<br>BRIGHT DAYS</small></div>';
    html+='<div class="v71-floorlabel" style="top:8.4%;height:9.7%"><b>RF</b><span>天台<br>ROOFTOP</span></div>';
    for(var f=6;f>=0;f--)html+=floorLabel(f);
    html+='<div class="v71-floorlabel" style="top:74.2%;height:8.7%"><b>1F</b><span>餐饮<br>BREAKFAST</span></div>';
    html+='<div class="v71-floorlabel" style="top:83.0%;height:9.0%"><b>大堂</b><span>LOBBY</span></div>';
    html+='<div class="v71-roomlayer">';
    var open=mapFloorCount();
    for(var f=0;f<7;f++)for(var c=0;c<3;c++){
      var r=roomAt(f,c),locked=f>=open,cl=roomClass(r,locked),x=xs[c]/400*100,y=rowY[f]/900*100,w=roomW/400*100,h=roomH/900*100;
      html+='<button class="v71-room '+cl+'" data-v71-room="'+(r?roomIndex(r):-1)+'" style="left:'+x.toFixed(3)+'%;top:'+y.toFixed(3)+'%;width:'+w.toFixed(3)+'%;height:'+h.toFixed(3)+'%">';
      html+='<span class="v71-roomno">'+(f+2)+'0'+(c+1)+'</span><span class="v71-roomicon">'+roomIcon(r,locked)+'</span>';
      if(!locked&&r&&r.occupied)html+='<span class="v71-guest"></span>';
      if(!locked&&r&&!r.type)html+='<span class="v71-emptyplus">＋</span>';
      html+='</button>';
    }
    html+='</div>';
    var q=Math.min(4,(state.frontQueue||[]).length+(state.executiveQueue||[]).length);if(q){html+='<div class="v71-queuepill">前台待办 '+q+'</div><div class="v71-lobbyqueue">';for(var i=0;i<q;i++)html+='<i class="v71-qperson"></i>';html+='</div>'}
    hotel.innerHTML=html;
    buildRail();
  }
  function buildRail(){var labels=['RF','8F','7F','6F','5F','4F','3F','2F','1F','L'],h='';for(var i=0;i<labels.length;i++)h+='<button data-v71-jump="'+labels[i]+'">'+labels[i]+'</button>';rail.innerHTML=h}
  var targetY={RF:.08,'8F':.23,'7F':.30,'6F':.37,'5F':.44,'4F':.51,'3F':.58,'2F':.65,'1F':.76,L:.86};
  rail.addEventListener('click',function(e){var b=e.target.closest('[data-v71-jump]');if(!b)return;var k=b.getAttribute('data-v71-jump'),r=stage.getBoundingClientRect(),top=window.scrollY+r.top,goal=top+stage.offsetHeight*targetY[k]-window.innerHeight*.34;window.scrollTo({top:Math.max(0,goal),behavior:'smooth'})});
  hotel.addEventListener('click',function(e){var b=e.target.closest('[data-v71-room]');if(!b)return;var idx=parseInt(b.getAttribute('data-v71-room'),10);if(idx<0)return;var r=state.rooms[idx];if(r&&typeof openRoomSheet==='function')openRoomSheet(r)});
  function railVisibility(){var r=stage.getBoundingClientRect();rail.classList.toggle('show',r.bottom>window.innerHeight*.18&&r.top<window.innerHeight*.80);var y=(window.innerHeight*.42-r.top)/Math.max(1,r.height),best=null,dist=99;Object.keys(targetY).forEach(function(k){var d=Math.abs(y-targetY[k]);if(d<dist){dist=d;best=k}});rail.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-v71-jump')===best)})}
  window.addEventListener('scroll',railVisibility,{passive:true});window.addEventListener('resize',railVisibility,{passive:true});
  var last='';function signature(){var a=[state.brand,state.weather,state.frontQueue&&state.frontQueue.length,state.executiveQueue&&state.executiveQueue.length,mapFloorCount()];for(var i=0;i<state.rooms.length;i++){var r=state.rooms[i];a.push(r.f,r.c,r.type||'-',r.occupied?1:0,r.dirty?1:0,r.cleaning>0?1:0,r.reserved?1:0)}return a.join('|')}
  function sync(){var k=signature();if(k!==last){last=k;render()}railVisibility()}
  var oldUI=window.updateUI;if(typeof oldUI==='function'){window.updateUI=function(){var x=oldUI.apply(this,arguments);sync();return x}}
  render();railVisibility();
  setInterval(sync,700);
})();
</script>
'''

s=s.replace('</head>',css+'\n</head>')
s=s.replace('</body>',js+'\n</body>')
p.write_text(s,encoding='utf-8')
print('patched v7.1',len(s))
