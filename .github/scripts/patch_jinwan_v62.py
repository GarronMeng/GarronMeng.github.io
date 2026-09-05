from pathlib import Path
import re, subprocess, tempfile, os
p=Path('games/jinwan-youtao/index.html')
s=p.read_text()

for ident in ['v60-board','v601-cutaway-css','v610-finished-css']:
    s=re.sub(r'<style id="'+re.escape(ident)+r'">[\s\S]*?</style>\s*','',s)
for ident in ['v60-board-renderer','v601-cutaway-js','v610-finished-js']:
    s=re.sub(r'<script id="'+re.escape(ident)+r'">[\s\S]*?</script>\s*','',s)

s=s.replace('.stage{position:relative;width:100%;height:110vw;min-height:360px;max-height:460px;overflow:hidden;background:#ddd4c8}',
            '.stage{position:relative;width:100%;height:136vw;min-height:500px;max-height:610px;overflow:hidden;background:#203247}')
s=s.replace('.actions{display:grid;grid-template-columns:repeat(5,1fr);grid-gap:6px}',
            '.actions{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:6px}')
if '#propertyBadge,#explorerChip{display:none!important}' not in s:
    s=s.replace('</style>','\n#propertyBadge,#explorerChip{display:none!important}\n</style>',1)

s,n=re.subn(r'function dims\(\)\{[^\n]*?\}\nfunction rrect',
             "function dims(){var w=canvasSize.w||canvas.clientWidth||360,h=canvasSize.h||canvas.clientHeight||500,m=48,lobby=92,top=60,fh=(h-top-lobby-24)/4;if(fh>102)fh=102;if(fh<82)fh=82;return{w:w,h:h,m:m,lobby:lobby,fh:fh,bw:w-m-10,base:h-30,top:top}}\nfunction rrect",s,count=1)
if n!=1: raise SystemExit('dims replacement failed')

room_code=r'''function drawMiniInterior(c,type,x,y,w,h,alpha){
  c.save();c.globalAlpha=alpha==null?1:alpha;c.beginPath();c.rect(x,y,w,h);c.clip();
  var suite=type==='suite',wall=suite?'#f1ddbf':'#eee0ca',floor=suite?'#a66d45':'#b17e58',dark='#5b4333',wood='#795239',green='#58745d',gold='#d5a759';
  c.fillStyle=wall;c.fillRect(x,y,w,h);c.fillStyle=floor;c.fillRect(x,y+h*.64,w,h*.36);c.fillStyle='rgba(255,255,255,.34)';c.fillRect(x+2,y+2,w-4,3);
  function box(px,py,pw,ph,col){c.fillStyle=col;c.fillRect(x+px*w/100,y+py*h/70,pw*w/100,ph*h/70)}
  function line(px1,py1,px2,py2,col,lw){c.beginPath();c.moveTo(x+px1*w/100,y+py1*h/70);c.lineTo(x+px2*w/100,y+py2*h/70);c.strokeStyle=col;c.lineWidth=lw||1;c.stroke()}
  function lamp(px,py){box(px,py,1.6,16,gold);c.fillStyle='#ffe5a4';c.beginPath();c.moveTo(x+(px-4)*w/100,y+py*h/70);c.lineTo(x+(px+5)*w/100,y+py*h/70);c.lineTo(x+(px+3)*w/100,y+(py+6)*h/70);c.lineTo(x+(px-2)*w/100,y+(py+6)*h/70);c.closePath();c.fill()}
  function plant(px,py){box(px,py,7,8,'#9b704b');box(px+2.5,py-12,2,13,green);box(px-1,py-9,4,3,'#6b8c68');box(px+4,py-14,4,4,'#648562')}
  function art(px,py,pw,ph,col){box(px,py,pw,ph,dark);box(px+2,py+2,pw-4,ph-4,col)}
  function bed(px,py,pw){box(px,py,pw,10,dark);box(px+2,py-5,pw-4,12,'#faf3e7');box(px+3,py-4,pw*.33,5,'#fffaf1');box(px+2,py+4,pw-4,4,suite?'#b8664f':'#bd865e')}
  box(18,4,9,2,'#ffe7a2');box(68,4,9,2,'#ffe7a2');
  if(type==='standard'||type==='suite'){
    box(5,12,22,20,'#6c8491');box(7,14,18,16,'#9fc0ca');box(7,25,18,5,'#506575');line(16,14,16,30,'rgba(255,255,255,.55)',1);
    art(41,10,24,10,suite?'#708c8a':'#78999d');bed(10,43,suite?47:43);lamp(59,38);plant(89,49);
    box(68,43,20,4,wood);box(71,47,2,10,wood);box(84,47,2,10,wood);box(73,37,12,5,'#444b4e');
    if(suite){box(58,55,30,8,green);box(65,51,15,4,'#ad7c55')}
  }else if(type==='breakfast'){
    box(3,10,94,16,'#d5bc98');box(5,14,90,11,wood);box(9,9,26,6,'#ddb869');box(74,8,10,13,'#37454a');
    for(var i=0;i<3;i++){var px=8+i*29;box(px,48,20,4,wood);box(px+3,52,2,9,wood);box(px+15,52,2,9,wood);box(px+4,43,4,4,'#efe8d4')}plant(89,48)
  }else if(type==='club'){
    box(4,10,92,12,'#c9ab7d');box(7,13,86,8,wood);for(var j=0;j<6;j++)box(14+j*11,9,4,8,j%2?'#c68c4a':'#7f4538');
    box(8,45,36,10,green);box(13,40,12,6,'#8aa08a');box(53,47,25,4,wood);box(59,51,2,8,wood);box(73,51,2,8,wood);plant(88,47)
  }else if(type==='gym'){
    box(4,10,92,25,'#a7bec6');line(34,10,34,35,'rgba(255,255,255,.5)',1);line(67,10,67,35,'rgba(255,255,255,.5)',1);
    box(8,52,30,4,'#4e585e');line(13,50,19,35,'#4e585e',2);box(55,46,32,4,'#59666d');line(60,50,60,61,'#59666d',2);line(82,50,82,61,'#59666d',2);plant(90,50)
  }else if(type==='spa'){
    box(5,43,48,11,'#f5ecdd');box(5,54,48,4,'#a78361');box(64,25,24,30,'#cbb08b');lamp(58,40);plant(89,48);box(12,38,12,5,'#d8c6aa')
  }else{art(37,18,26,12,'#8ea8a8');box(16,49,68,5,wood);plant(88,48)}
  c.restore();return true;
}
var roomRenderData={},roomRenderImages={};
function drawRoomSpriteInCell(r,q,locked){
  if(locked||!r.type)return false;
  ctx.save();ctx.beginPath();ctx.rect(q.x+4,q.y+16,q.w-8,q.h-31);ctx.clip();
  drawMiniInterior(ctx,r.type,q.x+5,q.y+17,q.w-10,q.h-33,r.occupied?0.94:1);
  if(r.occupied){ctx.fillStyle='rgba(234,190,67,.10)';ctx.fillRect(q.x+4,q.y+16,q.w-8,q.h-31)}
  ctx.restore();return true;
}
function drawRoomPreview'''
s,n=re.subn(r'function drawMiniInterior\([\s\S]*?function drawRoomPreview',room_code,s,count=1)
if n!=1: raise SystemExit('room renderer replacement failed')

anchor="ctx.fillStyle=g;ctx.fillRect(0,0,d.w,d.h);ctx.fillStyle=night?'rgba(255,243,221,.10)':'rgba(255,255,255,.28)';"
repl="ctx.fillStyle=g;ctx.fillRect(0,0,d.w,d.h);if(!night){ctx.fillStyle='rgba(89,112,132,.32)';for(var sb=0;sb<9;sb++){var sw=20+(sb%4)*7,sh=18+(sb%5)*7,sx=sb*51-8;ctx.fillRect(sx,d.top-30-sh,sw,sh)}}ctx.fillStyle=night?'rgba(255,243,221,.10)':'rgba(255,255,255,.28)';"
if anchor not in s: raise SystemExit('backdrop anchor missing')
s=s.replace(anchor,repl,1)

rooms_anchor=' var rooms=state.rooms,ri;for(ri=0;ri<rooms.length;ri++)'
structural=" ctx.fillStyle='#1e3043';ctx.fillRect(0,d.top-4,d.m-5,d.base-d.top+7);ctx.strokeStyle='#172636';ctx.lineWidth=4;for(var ff=0;ff<4;ff++){var fy=d.base-d.lobby-(ff+1)*d.fh-2;ctx.beginPath();ctx.moveTo(d.m-3,fy);ctx.lineTo(d.w-7,fy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.94)';ctx.font='900 10px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText((ff+2)+'F',(d.m-5)/2,fy+25);ctx.font='700 6.5px -apple-system,sans-serif';ctx.fillStyle='rgba(255,255,255,.67)';ctx.fillText(ff<mapFloorCount()?'客房':'尚未开放',(d.m-5)/2,fy+38)}ctx.fillStyle='rgba(255,255,255,.96)';ctx.font='900 9px -apple-system,sans-serif';ctx.fillText('大堂',(d.m-5)/2,d.base-d.lobby+30);ctx.font='700 6px -apple-system,sans-serif';ctx.fillStyle='rgba(255,255,255,.65)';ctx.fillText('LOBBY',(d.m-5)/2,d.base-d.lobby+42);"
if rooms_anchor not in s: raise SystemExit('rooms anchor missing')
s=s.replace(rooms_anchor,structural+rooms_anchor,1)

lobby_anchor="ctx.fillStyle='#413a33';ctx.font='900 10px -apple-system, sans-serif';ctx.textAlign='left';ctx.fillText('🛎  FRONT DESK',l.x+10,l.y+17);"
lobby_scene="ctx.fillStyle='#d9c29d';ctx.fillRect(l.x+5,l.y+7,l.w-10,l.h-12);ctx.fillStyle='#efe5d3';ctx.fillRect(l.x+8,l.y+9,l.w-16,l.h*.48);ctx.fillStyle='#8a6345';ctx.fillRect(l.x+35,l.y+l.h*.52,l.w-72,16);ctx.fillStyle='#5d4332';ctx.fillRect(l.x+39,l.y+l.h*.52+16,l.w-80,5);ctx.fillStyle='#344f63';ctx.font='900 8px -apple-system,sans-serif';ctx.textAlign='center';ctx.fillText((state.brand==='place'?'HYATT PLACE':b.name.toUpperCase()),l.x+l.w/2,l.y+27);ctx.fillStyle='#718266';ctx.beginPath();ctx.arc(l.x+20,l.y+l.h*.46,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#8f6947';ctx.fillRect(l.x+16,l.y+l.h*.48,8,10);ctx.fillStyle='#718266';ctx.beginPath();ctx.arc(l.x+l.w-20,l.y+l.h*.46,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#8f6947';ctx.fillRect(l.x+l.w-24,l.y+l.h*.48,8,10);ctx.fillStyle='#253a50';ctx.beginPath();ctx.arc(l.x+l.w*.43,l.y+l.h*.55,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#253a50';ctx.beginPath();ctx.arc(l.x+l.w*.57,l.y+l.h*.55,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d8a64d';ctx.fillRect(l.x+l.w-43,l.y+l.h-19,13,8);ctx.strokeStyle='#8c673e';ctx.strokeRect(l.x+l.w-43,l.y+l.h-19,13,8);"
if lobby_anchor not in s: raise SystemExit('lobby anchor missing')
s=s.replace(lobby_anchor,lobby_scene+lobby_anchor,1)

for old in ["QUEST_SYSTEM_VERSION='6.0.0'","QUEST_SYSTEM_VERSION='6.0.1'","QUEST_SYSTEM_VERSION='6.1.0'"]:
    s=s.replace(old,"QUEST_SYSTEM_VERSION='6.2.0'")
s=s.replace('v6.0.1','v6.2').replace('v6.1','v6.2')
p.write_text(s)

# verify before caller commits
s=p.read_text()
assert 'data:image/png;base64' not in s
assert 'v601-cutaway-js' not in s and 'v610-finished-js' not in s
assert 'var roomRenderData={},roomRenderImages={};' in s
assert 'm=48,lobby=92' in s
js='\n'.join(re.findall(r'<script(?:[^>]*)>([\s\S]*?)</script>',s))
f=tempfile.NamedTemporaryFile(delete=False,suffix='.js',mode='w');f.write(js);f.close()
r=subprocess.run(['node','--check',f.name],capture_output=True,text=True);os.unlink(f.name)
print(r.stderr)
if r.returncode: raise SystemExit(r.returncode)
