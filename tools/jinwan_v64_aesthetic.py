from pathlib import Path
import re

p=Path('games/jinwan-youtao/index.html')
s=p.read_text(encoding='utf-8')


def sub_one(pattern, repl, label):
    global s
    s2,n=re.subn(pattern, lambda m: repl, s, count=1)
    if n!=1:
        raise SystemExit(label+' missing or ambiguous: '+str(n))
    s=s2

# --- v6.4: make the cutaway rooms read as real miniature interiors, not cards ---
mini=r'''function drawMiniInterior(c,type,x,y,w,h,alpha,variant){
  c.save();c.globalAlpha=alpha==null?1:alpha;c.beginPath();c.rect(x,y,w,h);c.clip();variant=variant||0;
  var ps={place:['#eee5d8','#b88964','#6f4d38','#7b999d','#ad7d62','#637b64'],regency:['#ece7df','#a0826b','#59483d','#718693','#8c6f5d','#667b69'],grand:['#eee6db','#9a7356','#554238','#6d7f8b','#8c6150','#5d735f'],andaz:['#eee9e1','#9d7b61','#55463d','#8c7186','#b06e58','#647866'],alila:['#e9e4da','#9b836d','#584b41','#7b8c82','#927b67','#657b65'],park:['#efebe4','#8b776b','#4c433d','#6d7f88','#806b61','#5c7160']},a=ps[(window.state&&state.brand)||'place']||ps.place,wall=a[0],floor=a[1],wood=a[2],accent=a[3],soft=a[4],green=a[5],dark='#433b35',gold='#caa45f',suite=type==='suite';
  function X(v){return x+v*w/100}function Y(v){return y+v*h/70}function box(px,py,pw,ph,col){c.fillStyle=col;c.fillRect(X(px),Y(py),pw*w/100,ph*h/70)}function line(x1,y1,x2,y2,col,lw){c.beginPath();c.moveTo(X(x1),Y(y1));c.lineTo(X(x2),Y(y2));c.strokeStyle=col;c.lineWidth=lw||1;c.stroke()}function quad(p,col){c.beginPath();c.moveTo(X(p[0]),Y(p[1]));for(var qi=2;qi<p.length;qi+=2)c.lineTo(X(p[qi]),Y(p[qi+1]));c.closePath();c.fillStyle=col;c.fill()}function art(px,py,pw,ph,col){box(px,py,pw,ph,'rgba(57,49,43,.72)');box(px+1.3,py+1.4,pw-2.6,ph-2.8,col)}function plant(px,py,sz){sz=sz||1;box(px,py,5*sz,6*sz,'#8b6a50');box(px+1.9*sz,py-9*sz,1.3*sz,10*sz,green);c.fillStyle=green;c.beginPath();c.ellipse(X(px+.5*sz),Y(py-6*sz),3.2*w/100,2.2*h/70,-.5,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(X(px+4*sz),Y(py-9*sz),3*w/100,2.4*h/70,.45,0,Math.PI*2);c.fill()}function lamp(px,py){box(px,py,1.2,13,gold);quad([px-3,py,px+4,py,px+2.6,py+4.5,px-1.6,py+4.5],'#f2dca9')}function bed(px,py,pw){box(px,py-5,pw,17,'rgba(65,52,44,.56)');box(px+1.4,py-3.5,pw-2.8,14,'#f8f3ea');box(px+3,py-2,pw*.29,4,'#fffdf8');box(px+pw*.37,py-2,pw*.29,4,'#fffdf8');box(px+1.4,py+5,pw-2.8,5,soft);line(px+2,py+10,px+pw-2,py+10,'rgba(64,52,43,.20)',.7)}function chair(px,py,col){col=col||accent;quad([px,py,px+8,py,px+7,py+7,px+1,py+7],col);box(px+1.5,py+6,1.2,5,dark);box(px+5.6,py+6,1.2,5,dark)}function table(px,py,pw){box(px,py,pw,2.5,wood);box(px+2,py+2.5,1.2,7,wood);box(px+pw-3.2,py+2.5,1.2,7,wood)}
  var wg=c.createLinearGradient(x,y,x,y+h*.48);wg.addColorStop(0,'#f8f3eb');wg.addColorStop(1,wall);c.fillStyle=wg;c.fillRect(x,y,w,h*.46);quad([0,32,100,32,93,70,7,70],floor);quad([7,70,93,70,88,66,12,66],'rgba(57,43,33,.08)');box(0,30.8,100,1.6,'rgba(77,61,49,.15)');box(8,4,84,1.3,'rgba(255,225,157,.66)');
  for(var seam=1;seam<4;seam++)line(12+seam*19,7,12+seam*19,31,'rgba(96,78,63,.075)',.55);
  var wx=variant%2?68:7;box(wx,8,22,19,'#3f505a');box(wx+1.7,9.7,18.6,15.5,'#9db9c1');box(wx+1.7,22,18.6,3.2,'#667982');line(wx+11,9.7,wx+11,25.2,'rgba(255,255,255,.52)',.75);box(wx-2,7.5,2,21,'rgba(102,83,69,.36)');box(wx+22,7.5,2,21,'rgba(102,83,69,.36)');
  if(type==='standard'||type==='suite'){
    var bx=variant%2?9:12,bedw=suite?46:40,deskx=variant%2?63:68;art(39,9,20,8,accent);bed(bx,42,bedw);box(bx+3,38,bedw-6,3,'rgba(67,54,46,.62)');lamp(58,37);plant(90,49,.9);table(deskx,42,18);box(deskx+5,34,9,5,'#424d52');chair(deskx+5,51,accent);box(44,59,20,2,'rgba(255,244,218,.26)');
    if(variant===2){quad([12,56,42,56,39,63,15,63],accent);box(18,52,15,4,soft);table(45,57,11)}
    if(variant===3||suite){quad([53,54,87,54,84,63,56,63],green);box(60,50,17,4,soft);table(42,57,10);chair(34,53,soft)}
  }else if(type==='breakfast'){
    box(4,11,92,10,'#d7c1a3');box(6,14,88,7,wood);box(9,8,28,3,gold);box(76,7,9,12,'#38474d');for(var i=0;i<3;i++){var px=9+i*29;table(px,48,18);chair(px+4,54,soft)}plant(89,47,.9);box(11,28,78,1,'rgba(255,255,255,.35)')
  }else if(type==='club'){
    box(5,11,90,9,'#cdb28c');box(8,14,84,6,wood);quad([9,47,45,47,42,59,12,59],green);box(15,42,13,5,accent);table(54,49,23);chair(79,47,soft);plant(89,47,.9)
  }else if(type==='gym'){
    box(4,8,92,23,'#91abb5');line(35,8,35,31,'rgba(255,255,255,.52)',.8);line(67,8,67,31,'rgba(255,255,255,.52)',.8);box(8,51,29,2.6,'#49565c');line(12,51,10,60,'#49565c',1.2);line(33,51,35,60,'#49565c',1.2);c.strokeStyle='#4b585d';c.lineWidth=1.2;c.beginPath();c.arc(X(69),Y(53),5*w/100,0,Math.PI*2);c.stroke();c.beginPath();c.arc(X(80),Y(53),5*w/100,0,Math.PI*2);c.stroke();line(69,53,75,44,'#4b585d',1.1);line(75,44,80,53,'#4b585d',1.1);plant(90,48,.75)
  }else if(type==='spa'){
    box(7,42,44,10,'#f6f0e7');box(7,52,44,4,'#927760');box(66,22,22,31,'#c9b18f');box(68,24,18,27,'rgba(231,221,203,.62)');lamp(57,38);plant(90,47,.85);quad([10,60,88,60,83,66,15,66],'rgba(116,151,151,.24)')
  }
  c.fillStyle='rgba(40,31,25,.09)';c.fillRect(x+w*.07,y+h*.94,w*.86,h*.06);c.restore();return true;
}'''
sub_one(r'function drawMiniInterior\(c,type,x,y,w,h,alpha,variant\)\{[\s\S]*?\n\}\nvar roomRenderData', mini+'\nvar roomRenderData', 'mini interior')

# --- smaller, more elegant micro-people: tapered bodies, quieter bubbles/badges ---
guest=r'''function drawGuestMini(gu,x,y){var pal=avatarPalette(gu),badge=gu.rare?(personaOf(gu).icon):(gu.sua?'🎫':gu.tier==='Globalist'?'👑':''),thought=guestThought(gu),tw;ctx.save();if(thought&&x>24&&x<dims().w-24&&y>34){tw=String(thought);if(tw.length>8)tw=tw.slice(0,8)+'…';rrect(x-23,y-47,46,11,5,'rgba(255,255,255,.92)','rgba(71,62,54,.12)');ctx.fillStyle='#554b43';ctx.font='700 5.8px -apple-system,BlinkMacSystemFont,sans-serif';ctx.textAlign='center';ctx.fillText(tw,x,y-39)}ctx.fillStyle='rgba(31,26,22,.12)';ctx.beginPath();ctx.ellipse(x,y+1,6.3,2,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(53,44,37,.74)';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x-2.2,y-3);ctx.lineTo(x-2,y+1.8);ctx.moveTo(x+2.2,y-3);ctx.lineTo(x+2,y+1.8);ctx.stroke();ctx.beginPath();ctx.moveTo(x-5.3,y-17);ctx.quadraticCurveTo(x,y-20,x+5.3,y-17);ctx.lineTo(x+4.1,y-4);ctx.quadraticCurveTo(x,y-2.2,x-4.1,y-4);ctx.closePath();ctx.fillStyle=pal.coat;ctx.fill();ctx.fillStyle='rgba(255,255,255,.76)';ctx.beginPath();ctx.moveTo(x-2.4,y-17);ctx.lineTo(x,y-13.8);ctx.lineTo(x+2.4,y-17);ctx.closePath();ctx.fill();ctx.fillStyle=pal.skin;ctx.beginPath();ctx.arc(x,y-22.2,5.1,0,Math.PI*2);ctx.fill();ctx.fillStyle=pal.hair;ctx.beginPath();ctx.arc(x,y-23.7,5.2,Math.PI,0);ctx.quadraticCurveTo(x+5,y-21.5,x+4.2,y-19.8);ctx.lineTo(x+3.3,y-22.1);ctx.quadraticCurveTo(x,y-20.8,x-4.4,y-22);ctx.closePath();ctx.fill();if(gu.phase!=='stay'){rrect(x+6.2,y-11,3.8,6,1,'#ad8b4d','rgba(53,44,37,.26)');ctx.strokeStyle='rgba(53,44,37,.35)';ctx.beginPath();ctx.moveTo(x+7.1,y-11);ctx.lineTo(x+8.8,y-13);ctx.stroke()}if(gu.upgraded&&!badge){rrect(x-8,y-34,16,7,3.5,'rgba(246,236,210,.92)','rgba(124,99,52,.15)');ctx.fillStyle='#745c2c';ctx.font='900 5.2px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText('SUITE',x,y-28.7)}if(badge){rrect(x-7.5,y-34,15,8,4,'rgba(255,255,255,.90)','rgba(70,61,52,.12)');ctx.font='6.8px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillStyle='#302b27';ctx.fillText(badge,x,y-27.5)}ctx.restore()}'''
sub_one(r'function drawGuestMini\(gu,x,y\)\{[\s\S]*?\}\nfunction drawConstructionOverlay', guest+'\nfunction drawConstructionOverlay', '2d guest')

person=r'''function draw3DPerson(c,gu,x,y,scale){var pal=avatarPalette(gu),badge=gu.rare?personaOf(gu).icon:(gu.sua?'🎫':gu.tier==='Globalist'?'👑':''),thought=guestThought(gu),s=(scale||1)*.88,tw;c.save();if(thought){tw=String(thought);if(tw.length>9)tw=tw.slice(0,9)+'…';peopleRRect(c,x-27*s,y-47*s,54*s,12*s,5*s,'rgba(255,255,255,.88)','rgba(31,44,52,.12)');c.fillStyle='#33414b';c.font='700 '+(6.1*s)+'px -apple-system,BlinkMacSystemFont,sans-serif';c.textAlign='center';c.fillText(tw,x,y-38*s)}c.shadowColor='rgba(0,0,0,.28)';c.shadowBlur=3*s;c.fillStyle='rgba(0,0,0,.20)';c.beginPath();c.ellipse(x,y+2*s,6.7*s,2.3*s,0,0,Math.PI*2);c.fill();c.shadowBlur=0;c.strokeStyle='rgba(39,32,27,.82)';c.lineWidth=.9*s;c.beginPath();c.moveTo(x-2.3*s,y-3*s);c.lineTo(x-2.1*s,y+2.5*s);c.moveTo(x+2.3*s,y-3*s);c.lineTo(x+2.1*s,y+2.5*s);c.stroke();c.beginPath();c.moveTo(x-5.4*s,y-18*s);c.quadraticCurveTo(x,y-21*s,x+5.4*s,y-18*s);c.lineTo(x+4.2*s,y-4*s);c.quadraticCurveTo(x,y-2*s,x-4.2*s,y-4*s);c.closePath();c.fillStyle=pal.coat;c.fill();c.fillStyle='rgba(255,255,255,.72)';c.beginPath();c.moveTo(x-2.6*s,y-18*s);c.lineTo(x,y-14*s);c.lineTo(x+2.6*s,y-18*s);c.closePath();c.fill();c.fillStyle=pal.skin;c.beginPath();c.arc(x,y-23.5*s,5.2*s,0,Math.PI*2);c.fill();c.fillStyle=pal.hair;c.beginPath();c.arc(x,y-25*s,5.3*s,Math.PI,0);c.quadraticCurveTo(x+5*s,y-22.5*s,x+4.1*s,y-20.6*s);c.lineTo(x+3.2*s,y-23*s);c.quadraticCurveTo(x,y-21.6*s,x-4.5*s,y-23*s);c.closePath();c.fill();if(badge){peopleRRect(c,x-8*s,y-36*s,16*s,9*s,4.5*s,'rgba(255,255,255,.88)','rgba(35,43,50,.12)');c.fillStyle='#28323b';c.font=''+(7*s)+'px -apple-system,sans-serif';c.textAlign='center';c.fillText(badge,x,y-28.8*s)}c.restore()}'''
sub_one(r'function draw3DPerson\(c,gu,x,y,scale\)\{[\s\S]*?\}\nfunction drawPeople3D', person+'\nfunction drawPeople3D', '3d person')

# --- lobby: replace the flat rectangle with a calm architectural hotel lobby ---
lobby=r'''var l=lobbyRect(),lp={place:['#eee5d7','#9d785c','#6f503b','#718b8d','#78866e'],regency:['#eee9e1','#917866','#5b493e','#6f8290','#72806d'],grand:['#eee5da','#916a51','#554239','#677985','#65755f'],andaz:['#eee9e1','#9b765c','#58463c','#877085','#6c7c67'],alila:['#ebe6dc','#96806b','#5a4b40','#778a80','#647a65'],park:['#efebe5','#88766b','#4f443d','#697b84','#60725f']}[(state.brand||'place')]||['#eee5d7','#9d785c','#6f503b','#718b8d','#78866e'],lobbyFill=lp[0];rrect(l.x,l.y,l.w,l.h,3,'#e7dccb','rgba(83,70,58,.27)');ctx.save();ctx.beginPath();ctx.rect(l.x+3,l.y+3,l.w-6,l.h-6);ctx.clip();ctx.fillStyle=lobbyFill;ctx.fillRect(l.x+3,l.y+3,l.w-6,l.h*.46);ctx.beginPath();ctx.moveTo(l.x+3,l.y+l.h*.46);ctx.lineTo(l.x+l.w-3,l.y+l.h*.46);ctx.lineTo(l.x+l.w-12,l.y+l.h-3);ctx.lineTo(l.x+12,l.y+l.h-3);ctx.closePath();ctx.fillStyle=lobbyLv>=2?'#a98b6e':'#b09272';ctx.fill();ctx.fillStyle='rgba(255,226,163,.58)';ctx.fillRect(l.x+18,l.y+8,l.w-36,1.5);for(var wp=0;wp<5;wp++){ctx.fillStyle='rgba(93,74,59,.08)';ctx.fillRect(l.x+18+wp*(l.w-36)/4,l.y+12,1,l.h*.27)}ctx.fillStyle=lp[3];ctx.font='900 7.4px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText((state.brand==='place'?'HYATT PLACE':b.name.toUpperCase()),l.x+l.w/2,l.y+25);ctx.fillStyle='rgba(255,255,255,.34)';ctx.fillRect(l.x+l.w*.35,l.y+30,l.w*.30,1);var dx=l.x+33,dy=l.y+l.h*.55,dw=l.w*.39;ctx.fillStyle='rgba(50,39,31,.16)';ctx.fillRect(dx+3,dy+17,dw,3);ctx.fillStyle=lp[1];ctx.beginPath();ctx.moveTo(dx,dy);ctx.lineTo(dx+dw,dy);ctx.lineTo(dx+dw-5,dy+17);ctx.lineTo(dx+5,dy+17);ctx.closePath();ctx.fill();ctx.fillStyle=lp[2];ctx.fillRect(dx+7,dy+16,dw-14,4);ctx.fillStyle='rgba(219,181,102,.68)';ctx.fillRect(dx+9,dy+3,dw-18,1);var rx=l.x+l.w*.61,ry=l.y+l.h*.62,rw=l.w*.25;ctx.fillStyle='rgba(223,210,191,.48)';rrect(rx-5,ry+7,rw+10,14,3,'rgba(223,210,191,.48)');ctx.fillStyle=lp[4];rrect(rx,ry,rw*.44,10,3,lp[4]);rrect(rx+rw*.56,ry,rw*.44,10,3,lp[4]);ctx.fillStyle=lp[2];ctx.fillRect(rx+rw*.42,ry+9,rw*.16,3);ctx.fillStyle='rgba(255,245,221,.62)';ctx.beginPath();ctx.arc(rx+rw*.50,ry+2,3.2,0,Math.PI*2);ctx.fill();ctx.fillStyle=lp[4];ctx.beginPath();ctx.ellipse(l.x+l.w-22,l.y+l.h-24,8,5,-.45,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(l.x+l.w-16,l.y+l.h-31,7,4,.5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#8a6b50';ctx.fillRect(l.x+l.w-21,l.y+l.h-20,5,10);if(lobbyLv>=2){ctx.fillStyle='rgba(255,225,159,.78)';for(var li=0;li<3;li++){ctx.beginPath();ctx.arc(l.x+l.w*.26+li*l.w*.24,l.y+37,1.8,0,Math.PI*2);ctx.fill()}}ctx.restore();ctx.fillStyle='#403a35';ctx.font='900 7.5px -apple-system,sans-serif';ctx.textAlign='left';ctx.fillText('FRONT DESK',l.x+9,l.y+15);if(state.frontQueue.length){rrect(l.x+l.w-48,l.y+7,37,12,6,'rgba(255,255,255,.88)','rgba(96,78,62,.13)');ctx.fillStyle='#725c42';ctx.font='900 7px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText('QUEUE '+state.frontQueue.length,l.x+l.w-29.5,l.y+15.5)}
 if(roofLv>0)'''
sub_one(r'var l=lobbyRect\(\),lobbyFill=[\s\S]*?\n if\(roofLv>0\)', lobby, 'lobby')

# --- eliminate visual noise from locked rooms and level-3 gold card outlines ---
s=s.replace("if(roomsLv>=3){ctx.strokeStyle='rgba(182,147,79,.42)';ctx.lineWidth=1;ctx.strokeRect(q.x+4,q.y+4,q.w-8,q.h-8)}", "if(roomsLv>=3){ctx.fillStyle='rgba(182,147,79,.38)';ctx.fillRect(q.x+7,q.y+5,q.w-14,1)}")
s=s.replace("if(locked){ctx.strokeStyle='rgba(86,83,78,.20)';ctx.strokeRect(q.x+12,q.y+25,q.w-24,q.h-43);ctx.fillStyle='rgba(92,87,80,.38)';ctx.font='900 9px -apple-system,sans-serif';ctx.fillText('· · ·',q.x+q.w/2,q.y+q.h/2+5)}", "if(locked){ctx.fillStyle='rgba(92,87,80,.30)';ctx.font='900 8px -apple-system,sans-serif';ctx.fillText('· · ·',q.x+q.w/2,q.y+q.h/2+5)}")

# Correct the right facade accent to the actual building edge, and soften the structural rail.
s=s.replace("ctx.fillRect(d.w-d.m,d.top-6,3,d.base-d.top+2)", "ctx.fillRect(d.m+d.bw-1,d.top-6,2,d.base-d.top+2)")
s=s.replace("ctx.fillStyle='#1e3043';ctx.fillRect(0,d.top-4,d.m-5,d.base-d.top+7);ctx.strokeStyle='#172636';ctx.lineWidth=4;", "ctx.fillStyle=night?'#243342':'#304659';ctx.fillRect(0,d.top-4,d.m-5,d.base-d.top+7);ctx.strokeStyle=night?'#2a3947':'rgba(48,64,77,.78)';ctx.lineWidth=3;")

# UI micro-polish only: less bubbly, fewer borders/shadows; keep layout and navigation intact.
css=r'''
/* v6.4 aesthetic refinement */
.stage:not(.mode3d) .stagechip{background:rgba(250,247,241,.82);border-color:rgba(91,78,65,.12);box-shadow:0 2px 8px rgba(42,34,28,.045);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.stage:not(.mode3d) .viewtoggle{background:rgba(250,247,241,.84);border-color:rgba(91,78,65,.13);box-shadow:0 2px 9px rgba(42,34,28,.05);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.stage:not(.mode3d) .viewtoggle button{padding:3px 8px}
.action{border-radius:12px;border-color:#d9d0c4;box-shadow:inset 0 1px 0 rgba(255,255,255,.56)}
.goalstrip{border-radius:9px;border-color:#d9d0c4}
.feed{border-radius:9px;border-color:#d9d0c4;background:#f3eee7}
.bottom{box-shadow:0 -10px 28px rgba(54,44,35,.035)}
'''
if '/* v6.4 aesthetic refinement */' not in s:
    if '</style>' not in s: raise SystemExit('style end missing')
    s=s.replace('</style>',css+'\n</style>',1)

if "QUEST_SYSTEM_VERSION='6.3.0'" not in s:
    raise SystemExit('version marker missing')
s=s.replace("QUEST_SYSTEM_VERSION='6.3.0'","QUEST_SYSTEM_VERSION='6.4.0'",1)

# Guardrails: preserve gameplay, restored 3D photography, speed, and the old facade-frame fix.
checks={
  "v6.4 marker":"QUEST_SYSTEM_VERSION='6.4.0'",
  "3d photography":"sceneAssets={place:'data:image/webp",
  "day-one 4x":"function maxManualSpeed(){return 4}",
  "hidden actions":".action[hidden]{display:none!important}",
  "new people":"quadraticCurveTo(x,y-20,x+5.3,y-17)",
  "new lobby":"ctx.fillText('FRONT DESK'",
  "new interior":"var wg=c.createLinearGradient"
}
for name,needle in checks.items():
    if needle not in s: raise SystemExit('guardrail failed: '+name)
if "ctx.strokeRect(d.m+.5,d.top-8,d.bw-1,d.base-d.top+5)" in s:
    raise SystemExit('forbidden facade frame returned')

p.write_text(s,encoding='utf-8')
print('v6.4 aesthetic patch ready', len(s))
