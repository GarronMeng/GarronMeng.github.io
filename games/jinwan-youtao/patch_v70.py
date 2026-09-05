from pathlib import Path
import re

p=Path('games/jinwan-youtao/index.html')
s=p.read_text(encoding='utf-8')

# Remove the experimental dual-view renderers. v7 is one canonical hotel view.
for pat in [
    r'\n?<style id="v65-[^"]*">[\s\S]*?</style>\n?',
    r'\n?<script id="v65-[^"]*">[\s\S]*?</script>\n?',
    r'\n?<style id="v66-[^"]*">[\s\S]*?</style>\n?',
    r'\n?<script id="v66-[^"]*">[\s\S]*?</script>\n?',
    r'\n?<style id="v70-single-cutaway-css">[\s\S]*?</style>\n?',
    r'\n?<script id="v70-single-cutaway-js">[\s\S]*?</script>\n?'
]:
    s=re.sub(pat,'\n',s)

s=s.replace("QUEST_SYSTEM_VERSION='6.5.0'","QUEST_SYSTEM_VERSION='7.0.0'")
s=s.replace("QUEST_SYSTEM_VERSION='6.6.0'","QUEST_SYSTEM_VERSION='7.0.0'")
# Update outdated product copy that still advertises two visual modes.
s=s.replace('视觉模式</b>：经典 2D 保留完整房间格、小人与即时状态；沉浸 3D 使用对应品牌场景。两种模式共用同一个经营存档，可随时切换。','酒店总览</b>：所有房态、住客、设施与楼层都直接呈现在同一栋可交互酒店里。向上滑动查看高楼层。')

css=r'''
<style id="v70-single-cutaway-css">
/* v7.0 — one canonical cinematic cutaway. No 2D/3D mode split. */
:root{--v70-navy:#0a3a66;--v70-navy2:#082c50;--v70-gold:#d5aa48;--v70-cream:#fbf7ef;--v70-teal:#1aa0a2;--v70-w:440px}
body{background:#d7d2ca!important}
#app{background:#0b2f4d!important}
.top{z-index:30!important;background:radial-gradient(circle at 85% -20%,rgba(65,148,190,.55),transparent 34%),linear-gradient(180deg,#0e4e83 0%,#0b416f 58%,#0a355d 100%)!important;border-bottom:0!important;color:#fff!important;padding:12px 12px 11px!important;box-shadow:0 7px 20px rgba(4,24,42,.22)!important}
.game-title h1{font-size:24px!important;line-height:1!important;letter-spacing:-.8px!important;color:#fff!important;text-shadow:0 2px 7px rgba(0,0,0,.15)!important}.game-title small{display:none!important}
.metrics{gap:6px!important}.pill{margin:0!important;padding:6px 10px!important;border:1.4px solid rgba(255,255,255,.82)!important;background:rgba(4,31,55,.28)!important;color:#fff!important;box-shadow:inset 0 1px rgba(255,255,255,.13),0 3px 12px rgba(1,20,34,.12)!important;font-size:10px!important}.pill.warn{border-color:#e0b95e!important;background:rgba(69,49,15,.28)!important}
.propertyline{margin-top:8px!important;color:rgba(255,255,255,.90)!important;font-size:10px!important}.propertyline b{color:#fff!important}.rolechip{background:rgba(4,30,53,.40)!important;color:#fff!important;border:1px solid rgba(255,255,255,.10)!important;padding:4px 8px!important}
.statusgrid{grid-gap:7px!important;margin-top:8px!important}.meter{height:20px!important;border-radius:999px!important;background:rgba(238,234,227,.88)!important}.meter i{background:linear-gradient(90deg,#ae7c27,#e1b956)!important}.meter.owner i{background:linear-gradient(90deg,#173e66,#13a0a2)!important}.meter span{top:3px!important;font-size:8.6px!important}
.goalstrip{margin-top:8px!important;padding:8px 10px!important;border:1.4px solid #e1b85d!important;border-radius:12px!important;background:#fffdf7!important;color:#193753!important;box-shadow:0 3px 11px rgba(2,26,45,.16)!important;font-size:9.5px!important}.goalstrip b,.goalstrip .right{color:#173b5d!important}
.stage{height:min(158vw,740px)!important;min-height:640px!important;max-height:740px!important;overflow:hidden!important;background:#153e5d!important;isolation:isolate}
/* old renderers remain only as game-state machinery; none are visible */
.stage>.scene3d,.stage>#tower2dScroll,.stage>#game,.stage>#people3d,.stage>.stage-fallback,.stage>.sceneops,.stage>.scenecaption,.stage>.viewnote,.stage>.constructionhud,.stage>.designhotspots,.stage>.propertybadge{display:none!important;opacity:0!important;pointer-events:none!important}
.stagehud{display:none!important}.viewtoggle,#viewToggle,#explorerChip,#occChip{display:none!important}
#v70Scene{position:absolute;z-index:25;inset:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:none;touch-action:pan-y;background:linear-gradient(180deg,#527fa3,#8fb0c3 35%,#d0ae84 76%,#806756);container-type:inline-size}
#v70Scene::-webkit-scrollbar{display:none}
#v70World{position:relative;width:100%;min-height:100%;padding-top:52px;padding-bottom:58px;background:radial-gradient(circle at 74% 3%,rgba(255,222,145,.38),transparent 19%);--v70-w:100cqw}
.v70-cityveil{position:absolute;z-index:0;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(5,41,70,.08),transparent 31%,rgba(9,30,44,.10) 83%,rgba(9,27,39,.24));box-shadow:inset 0 0 42px rgba(8,29,43,.18)}
.v70-artseg,.v70-extra{position:relative;z-index:1;width:100%;overflow:hidden;background:#294e68}
.v70-artseg img,.v70-extra img{position:absolute;left:0;width:100%;height:auto;max-width:none;user-select:none;-webkit-user-drag:none;pointer-events:none;filter:saturate(1.06) contrast(1.025) brightness(1.01)}
.v70-top{height:41.14cqw}.v70-top img{top:0}
.v70-extra{height:14.32cqw;border-top:3px solid #304e61;border-bottom:3px solid #182e3d;box-shadow:inset 0 1px rgba(255,255,255,.17)}.v70-extra img{top:-41.14cqw}
.v70-lower{height:86.59cqw}.v70-lower img{top:-41.14cqw}
.v70-extra:after,.v70-lower:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.09)}
.v70-floorlabel{position:absolute;z-index:7;left:0;top:0;bottom:0;width:13.4%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(12,50,78,.97),rgba(7,37,61,.98));color:#fff;text-align:center;box-shadow:2px 0 6px rgba(0,0,0,.14)}.v70-floorlabel b{font-size:12px;line-height:1}.v70-floorlabel span{margin-top:5px;font-size:7px;font-weight:900}.v70-floorlabel small{margin-top:2px;font-size:5px;opacity:.68;letter-spacing:.2px}
.v70-roomhot{position:absolute;z-index:9;top:5%;height:89%;width:22.2%;border:1.5px solid transparent;border-radius:2px;background:transparent;color:#142b3b;padding:0;text-align:left;overflow:visible}.v70-roomhot.c0{left:13.8%}.v70-roomhot.c1{left:36.6%}.v70-roomhot.c2{left:59.4%}.v70-roomhot:active{background:rgba(255,244,207,.10);border-color:#f4d77e}.v70-roomhot.occupied{border-color:rgba(244,203,91,.78);box-shadow:inset 0 0 18px rgba(255,211,104,.17),0 0 7px rgba(239,191,74,.22)}.v70-roomhot.dirty{border-color:rgba(205,105,89,.88);box-shadow:inset 0 0 16px rgba(171,62,47,.13)}.v70-roomhot.cleaning{border-color:rgba(84,175,221,.88);box-shadow:inset 0 0 15px rgba(81,176,222,.13)}.v70-roomhot.reserved{border-color:rgba(226,184,89,.95)}.v70-roomhot.empty{background:rgba(23,37,45,.38);border-color:rgba(255,255,255,.10)}
.v70-roomno{position:absolute;left:4px;top:3px;padding:2px 4px;border-radius:5px;background:rgba(255,249,235,.90);color:#2e281f;font-size:7px;font-weight:950;box-shadow:0 1px 3px rgba(0,0,0,.12)}.v70-roomstate{position:absolute;right:4px;bottom:4px;min-width:10px;padding:2px 4px;border-radius:999px;background:rgba(24,53,73,.80);color:#fff;font-size:5.3px;font-weight:950;box-shadow:0 1px 3px rgba(0,0,0,.15)}.v70-roomhot.occupied .v70-roomstate{background:#e3b84f;color:#493507}.v70-roomhot.dirty .v70-roomstate{background:#c87060}.v70-roomhot.cleaning .v70-roomstate{background:#58a9d4}.v70-roomhot.reserved .v70-roomstate{background:#d4a347}.v70-roomhot.empty .v70-roomstate{background:rgba(28,43,52,.72)}
.v70-thought{position:absolute;z-index:12;left:50%;bottom:12px;max-width:80px;transform:translateX(-50%);padding:3px 5px;border-radius:7px;background:rgba(255,255,255,.96);border:1px solid rgba(56,48,40,.12);font-size:5.3px;font-weight:800;color:#35312c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px rgba(0,0,0,.12)}
.v70-basehot{position:absolute;z-index:8;left:0;right:0;height:14.32cqw;pointer-events:none}.v70-basehot[data-floor="4"]{top:0}.v70-basehot[data-floor="3"]{top:14.32cqw}.v70-basehot[data-floor="2"]{top:28.64cqw}.v70-basehot .v70-roomhot{pointer-events:auto}
.v70-anchor{position:absolute;left:0;width:1px;height:1px;pointer-events:none}.v70-anchor.f1{top:48cqw}.v70-anchor.flobby{top:68cqw}
.v70-amenitymask{position:absolute;z-index:7;left:0;width:13.4%;background:linear-gradient(180deg,rgba(12,50,78,.97),rgba(7,37,61,.98));color:#fff;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.v70-amenitymask b{font-size:8px}.v70-amenitymask small{font-size:5px;opacity:.68;margin-top:2px}.v70-gymmask{top:32%;height:27%}.v70-clubmask{top:59%;height:30%}
.v70-brandveil{position:absolute;z-index:8;right:0;top:2%;width:17.2%;height:32%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 4px;background:linear-gradient(180deg,rgba(11,43,68,.97),rgba(7,33,54,.98));color:#fff;text-align:center;box-shadow:-4px 0 12px rgba(3,18,29,.16)}.v70-branddots{display:grid;grid-template-columns:repeat(3,7px);gap:3px;margin-bottom:6px}.v70-branddots i{width:7px;height:7px;border-radius:50%;background:#e0bd61}.v70-branddots i:nth-child(2n){background:#83b5bf}.v70-branddots i:nth-child(3n){background:#f0e8d2}.v70-brandveil strong{font-size:7.4px;line-height:1.12;letter-spacing:.5px;word-break:break-word}.v70-brandveil small{margin-top:6px;font-size:4.8px;line-height:1.35;opacity:.72}
.v70-lobbybrand{position:absolute;z-index:9;left:25%;bottom:8.5%;width:48%;padding:4px 7px;border-radius:4px;background:rgba(247,236,217,.82);backdrop-filter:blur(2px);color:#173a58;text-align:center;font-size:8.4px;font-weight:950;letter-spacing:.7px;box-shadow:0 2px 7px rgba(0,0,0,.10)}
.v70-float{position:absolute;z-index:35;left:10px;right:10px;top:10px;display:flex;justify-content:space-between;align-items:center;pointer-events:none}.v70-chip{padding:6px 9px;border:1.2px solid rgba(255,255,255,.84);border-radius:999px;background:rgba(12,50,77,.77);backdrop-filter:blur(7px);color:#fff;font-size:8.3px;font-weight:950;box-shadow:0 3px 12px rgba(0,0,0,.15)}
.v70-rail{position:absolute;z-index:38;right:7px;top:25%;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.55);border-radius:17px;background:rgba(13,42,62,.82);backdrop-filter:blur(8px);box-shadow:0 6px 17px rgba(0,0,0,.20)}.v70-rail button{width:31px;height:27px;border:0;border-bottom:1px solid rgba(255,255,255,.11);background:transparent;color:#fff;font-size:7px;font-weight:950}.v70-rail button:last-child{border-bottom:0}.v70-rail button:active,.v70-rail button.on{background:#e4bc62;color:#17364f}.v70-scrollhint{position:absolute;z-index:36;right:9px;bottom:11px;padding:4px 6px;border-radius:8px;background:rgba(11,37,56,.68);color:#fff;font-size:6px;font-weight:850;pointer-events:none;transition:opacity .25s}.v70-scrollhint.hide{opacity:0}
.hint{z-index:40!important;left:12px!important;right:12px!important;bottom:10px!important;padding:8px 10px!important;border:1.3px solid #e2bd6c!important;border-radius:12px!important;background:rgba(255,250,236,.97)!important;color:#735a27!important;box-shadow:0 4px 14px rgba(0,0,0,.14)!important;font-size:8.8px!important}
.bottom{z-index:30!important;background:linear-gradient(180deg,#faf7f1,#f0eadf)!important;border-top:1px solid #dfd1bd!important;color:#17334d!important;padding-top:9px!important}.actions{grid-gap:7px!important}.action{height:60px!important;border:1px solid #d7c8b5!important;border-radius:15px!important;background:rgba(255,255,255,.95)!important;color:#17334d!important;box-shadow:0 2px 7px rgba(63,47,30,.06)!important;font-size:10px!important}.action span{font-size:21px!important}.action.primary{background:linear-gradient(180deg,#153f63,#0f3455)!important;border-color:#153f63!important;color:#fff!important}.feed{border:1px solid #d9ccba!important;background:#f6f1e8!important;color:#6c6256!important}.feed b{color:#302c27!important}.foot{color:#756d63!important}.speed button{background:#ded5c9!important;color:#61594f!important}.speed button.on{background:#163d60!important;color:#fff!important}
@media(max-width:380px){.game-title h1{font-size:22px!important}.pill{padding:5px 7px!important}.stage{min-height:600px!important}.v70-rail{right:5px}.v70-rail button{width:28px;height:25px}}
</style>
'''

js=r'''
<script id="v70-single-cutaway-js">
(function(){
'use strict';
if(window.__v70SingleReady)return;window.__v70SingleReady=true;
var stage=$('stage'),app=$('app');if(!stage||!app)return;
var asset='assets/v70_master2.webp',scene=document.createElement('div');scene.id='v70Scene';
var world=document.createElement('div');world.id='v70World';scene.appendChild(world);
var float=document.createElement('div');float.className='v70-float';float.innerHTML='<div class="v70-chip" id="v70Occ">▥ 入住率 0%</div><div class="v70-chip" id="v70Weather">☀️ 深圳 · 26°C</div>';stage.appendChild(float);
var rail=document.createElement('div');rail.className='v70-rail';rail.id='v70Rail';stage.appendChild(rail);
var sh=document.createElement('div');sh.className='v70-scrollhint';sh.textContent='↕ 上下滑动查看整栋酒店';stage.appendChild(sh);
stage.insertBefore(scene,stage.firstChild);
app.classList.add('v70single');
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function roomAt(f,c){for(var i=0;i<state.rooms.length;i++)if(state.rooms[i].f===f&&state.rooms[i].c===c)return{r:state.rooms[i],i:i};return null}
function roomClass(r){if(!r.type)return'empty';if(r.cleaning>0)return'cleaning';if(r.dirty)return'dirty';if(r.reserved)return'reserved';if(r.occupied)return'occupied';return'available'}
function roomState(r){if(!r.type)return'＋ 建造';if(r.cleaning>0)return'清洁中';if(r.dirty)return'待翻房';if(r.reserved)return'SUA';if(r.occupied)return'入住';return'可售'}
function thought(r){if(!r||!r.occupied)return'';var g=roomGuest(r),t=g?guestThought(g):'';return t?'<span class="v70-thought">'+esc(t)+'</span>':''}
function hot(f,c){var x=roomAt(f,c);if(!x)return'';var r=x.r,cl=roomClass(r);return'<button class="v70-roomhot c'+c+' '+cl+'" data-v70-room="'+x.i+'"><span class="v70-roomno">'+(f+2)+'0'+(c+1)+'</span><span class="v70-roomstate">'+roomState(r)+'</span>'+thought(r)+'</button>'}
function extraFloor(f){return'<section class="v70-extra" data-v70-floor="'+(f+2)+'"><img src="'+asset+'" alt=""><div class="v70-floorlabel"><b>'+(f+2)+'F</b><span>客房</span><small>GUEST ROOMS</small></div>'+hot(f,0)+hot(f,1)+hot(f,2)+'</section>'}
function dots(){return'<div class="v70-branddots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'}
function render(force){
  var fc=mapFloorCount(),key=[state.brand,fc,state.weather,occupancy(),state.rooms.map(function(r){return [r.type,r.occupied,r.dirty,r.cleaning>0,r.reserved,r.guest].join(':')}).join('|')].join('|');
  if(!force&&world.getAttribute('data-key')===key)return;var old=scene.scrollTop,h='<div class="v70-cityveil"></div>';
  h+='<section class="v70-artseg v70-top" data-v70-floor="RF"><img src="'+asset+'" alt="酒店屋顶、健身房与行政酒廊"><div class="v70-amenitymask v70-gymmask"><b>健身房</b><small>GYM</small></div><div class="v70-amenitymask v70-clubmask"><b>行政酒廊</b><small>CLUB</small></div><div class="v70-brandveil">'+dots()+'<strong>'+esc(brand().short.toUpperCase())+'</strong><small>'+esc(propertyPrestigeLabel())+'<br>Good People<br>Good Stays</small></div></section>';
  for(var f=fc-1;f>=3;f--)h+=extraFloor(f);
  h+='<section class="v70-artseg v70-lower"><img src="'+asset+'" alt="客房、早餐厅与酒店大堂"><div class="v70-basehot" data-floor="4" data-v70-floor="4">'+hot(2,0)+hot(2,1)+hot(2,2)+'</div><div class="v70-basehot" data-floor="3" data-v70-floor="3">'+hot(1,0)+hot(1,1)+hot(1,2)+'</div><div class="v70-basehot" data-floor="2" data-v70-floor="2">'+hot(0,0)+hot(0,1)+hot(0,2)+'</div><i class="v70-anchor f1" data-v70-floor="1"></i><i class="v70-anchor flobby" data-v70-floor="L"></i><div class="v70-lobbybrand">'+esc(brand().short.toUpperCase())+' · '+esc(propertyPrestigeLabel())+'</div></section>';
  world.innerHTML=h;world.setAttribute('data-key',key);buildRail();requestAnimationFrame(function(){var max=Math.max(0,scene.scrollHeight-scene.clientHeight);scene.scrollTop=force?max:Math.min(old,max)})
}
function buildRail(){var fc=mapFloorCount(),h='<button data-jump="RF">▲</button>';for(var f=fc+1;f>=2;f--)h+='<button data-jump="'+f+'">'+f+'F</button>';h+='<button data-jump="1">1F</button><button data-jump="L">L</button><button data-jump="L">▼</button>';rail.innerHTML=h}
scene.addEventListener('click',function(e){var b=e.target.closest('[data-v70-room]');if(!b)return;var i=parseInt(b.getAttribute('data-v70-room'),10),r=state.rooms[i];if(r)openRoomSheet(r)});
rail.addEventListener('click',function(e){var b=e.target.closest('[data-jump]');if(!b)return;var k=b.getAttribute('data-jump'),el=world.querySelector('[data-v70-floor="'+k+'"]');if(el)scene.scrollTo({top:Math.max(0,el.offsetTop-scene.clientHeight*.20),behavior:'smooth'})});
scene.addEventListener('scroll',function(){sh.classList.add('hide');clearTimeout(scene._v70t);scene._v70t=setTimeout(function(){sh.classList.remove('hide')},1600)},{passive:true});
function chrome(){state.visualMode='3d';app.classList.remove('visual3d');stage.classList.remove('mode3d');document.body.classList.remove('v66-github-host');var o=$('v70Occ'),w=$('v70Weather');if(o)o.textContent='▥ 入住率 '+occupancy()+'%';if(w)w.textContent=(state.weather==='rain'?'🌧️':'🌤️')+' 深圳 · '+(state.weather==='rain'?'24':'26')+'°C'}
var oldUpdate=updateUI;updateUI=function(){state.visualMode='3d';oldUpdate.apply(this,arguments);chrome();render(false)};
var oldApply=applyVisualMode;applyVisualMode=function(){state.visualMode='3d';try{oldApply.apply(this,arguments)}catch(e){}chrome()};
window.addEventListener('resize',function(){render(true)});
chrome();render(true);updateUI();
})();
</script>
'''
s=s.replace('</head>',css+'\n</head>')
s=s.replace('</body>',js+'\n</body>')
p.write_text(s,encoding='utf-8')
print('patched v7.0',len(s))
