from pathlib import Path
import re
p=Path('games/jinwan-youtao/index.html')
s=p.read_text()
s=s.replace(".stagehud{position:absolute;z-index:6;left:10px;right:10px;top:9px;display:flex;justify-content:space-between;pointer-events:none}.stagechip{background:rgba(251,248,242,.9);border:1px solid rgba(120,109,96,.2);border-radius:10px;padding:5px 7px;font-size:9px;font-weight:900;color:#514b45;box-shadow:0 4px 12px rgba(0,0,0,.06)}", ".stagehud{position:absolute;z-index:6;left:12px;right:12px;top:8px;display:flex;justify-content:flex-start;align-items:center;pointer-events:none}.stagechip{background:rgba(251,248,242,.88);border:1px solid rgba(120,109,96,.16);border-radius:999px;padding:4px 7px;font-size:8.4px;font-weight:900;color:#514b45;box-shadow:0 3px 10px rgba(0,0,0,.05)}.viewtoggle{position:absolute;left:50%;transform:translateX(-50%);top:0}")
s=s.replace("rrect(q.x,q.y,q.w,q.h,7,fill,stroke)","rrect(q.x,q.y,q.w,q.h,2,fill,stroke)")
s=s.replace("ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(q.x+3,q.y+3,q.w-6,4);","ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(q.x+2,q.y+2,q.w-4,2);")
code=r'''function drawMiniInterior(c,type,x,y,w,h,alpha,variant){
  c.save();c.globalAlpha=alpha==null?1:alpha;c.beginPath();c.rect(x,y,w,h);c.clip();variant=variant||0;
  var ps={place:['#efe6d8','#b9835e','#7b543d','#78989c','#b27e5d','#647b62'],regency:['#ece7df','#9f7b64','#5c463a','#6d8494','#8b6b59','#687b68'],grand:['#eee5d8','#9c6f4e','#574238','#6e7e8b','#8b5b4a','#5f735f'],andaz:['#ede8df','#9a7657','#59463b','#8b6f86','#b36f55','#647764'],alila:['#e8e3d7','#9b8067','#5c4b3f','#7c8d80','#927b65','#667c61'],park:['#ece9e2','#8d7768','#4f443d','#6c7d86','#80685d','#5d725f']},a=ps[(window.state&&state.brand)||'place']||ps.place,wall=a[0],floor=a[1],wood=a[2],accent=a[3],soft=a[4],green=a[5],dark='#4c4139',gold='#d3aa61',suite=type==='suite';
  c.fillStyle=wall;c.fillRect(x,y,w,h*.42);c.beginPath();c.moveTo(x,y+h*.42);c.lineTo(x+w,y+h*.42);c.lineTo(x+w*.92,y+h);c.lineTo(x+w*.08,y+h);c.closePath();c.fillStyle=floor;c.fill();
  function X(v){return x+v*w/100}function Y(v){return y+v*h/70}function box(px,py,pw,ph,col){c.fillStyle=col;c.fillRect(X(px),Y(py),pw*w/100,ph*h/70)}function line(x1,y1,x2,y2,col,lw){c.beginPath();c.moveTo(X(x1),Y(y1));c.lineTo(X(x2),Y(y2));c.strokeStyle=col;c.lineWidth=lw||1;c.stroke()}function art(px,py,pw,ph,col){box(px,py,pw,ph,dark);box(px+1.5,py+1.5,pw-3,ph-3,col)}function plant(px,py){box(px,py,6,7,'#927053');box(px+2.2,py-11,1.6,12,green);box(px-1,py-8,4,3,'#6f8b6a');box(px+3,py-12,4,4,'#688565')}function lamp(px,py){box(px,py,1.4,14,gold);c.fillStyle='#ffe6a7';c.beginPath();c.moveTo(X(px-3),Y(py));c.lineTo(X(px+4),Y(py));c.lineTo(X(px+2.5),Y(py+5));c.lineTo(X(px-1.5),Y(py+5));c.closePath();c.fill()}function bed(px,py,pw){box(px,py,pw,8,dark);box(px+1.5,py-4,pw-3,11,'#f8f2e8');box(px+3,py-3,pw*.30,4,'#fffaf2');box(px+2,py+3,pw-4,4,soft)}
  var wx=variant%2?66:6;box(wx,9,23,20,'#526674');box(wx+2,11,19,16,'#9dbbc3');box(wx+2,23,19,4,'#566978');line(wx+11.5,11,wx+11.5,27,'rgba(255,255,255,.55)',1);box(17,4,8,1.7,'#ffe4a0');box(70,4,8,1.7,'#ffe4a0');
  if(type==='standard'||type==='suite'){var bx=variant%2?8:12,dx=variant%2?62:68;art(37,9,22,9,accent);bed(bx,42,suite?48:42);lamp(58,37);plant(89,49);box(dx,42,20,3,wood);box(dx+2,45,2,9,wood);box(dx+16,45,2,9,wood);box(dx+5,36,10,5,'#40494d');if(variant===2){box(12,56,30,6,accent);box(18,52,15,4,soft)}if(variant===3||suite){box(54,55,34,7,green);box(61,51,17,4,soft)}}
  else if(type==='breakfast'){box(4,10,92,13,'#d8c2a1');box(6,13,88,9,wood);box(10,8,25,5,gold);box(76,7,9,12,'#35464c');for(var i=0;i<3;i++){var px=8+i*29;box(px,48,20,3,wood);box(px+3,51,2,9,wood);box(px+15,51,2,9,wood)}plant(88,48)}
  else if(type==='club'){box(5,10,90,11,'#ccb088');box(8,13,84,7,wood);box(9,45,36,9,green);box(14,40,12,5,accent);box(54,47,24,3,wood);plant(88,47)}
  else if(type==='gym'){box(4,9,92,24,'#9fb8c1');line(35,9,35,33,'rgba(255,255,255,.5)',1);line(67,9,67,33,'rgba(255,255,255,.5)',1);box(8,52,30,3,'#505c61');box(55,46,32,3,'#5c686f');plant(89,49)}
  else if(type==='spa'){box(6,43,47,10,'#f5eee3');box(6,53,47,4,'#9e8066');box(65,24,23,29,'#c9b18e');lamp(58,39);plant(89,48)}
  c.fillStyle='rgba(48,36,28,.10)';c.fillRect(x+w*.08,y+h*.92,w*.84,h*.08);c.restore();return true;
}
var roomRenderData={},roomRenderImages={};
function drawRoomSpriteInCell(r,q,locked){if(locked||!r.type)return false;var variant=((r.f||0)*3+(r.c||0))%4;ctx.save();ctx.beginPath();ctx.rect(q.x+3,q.y+15,q.w-6,q.h-25);ctx.clip();drawMiniInterior(ctx,r.type,q.x+4,q.y+16,q.w-8,q.h-27,r.occupied?.94:1,variant);if(r.occupied){ctx.fillStyle='rgba(236,196,91,.07)';ctx.fillRect(q.x+3,q.y+15,q.w-6,q.h-25)}ctx.restore();return true;}
function drawRoomPreview'''
s,n=re.subn(r'function drawMiniInterior\([\s\S]*?function drawRoomPreview',code,s,count=1)
if n!=1: raise SystemExit('renderer missing')
old="if(!spr)ctx.fillText(locked?'🔒':(r.type?defs[r.type].icon:'＋'),q.x+q.w/2,q.y+q.h/2+6);ctx.font='700 7px -apple-system, sans-serif';ctx.fillStyle='#655d55';var st=locked?'LOCKED':!r.type?'EMPTY':r.reserved?'SUA LOCK':r.occupied?'IN HOUSE':r.dirty?(r.cleaning>0?'CLEANING':'DIRTY'):'AVAILABLE';ctx.fillText(st,q.x+q.w/2,q.y+q.h-7)"
new="if(!spr){if(locked){ctx.strokeStyle='rgba(86,83,78,.20)';ctx.strokeRect(q.x+12,q.y+25,q.w-24,q.h-43);ctx.fillStyle='rgba(92,87,80,.38)';ctx.font='900 9px -apple-system,sans-serif';ctx.fillText('· · ·',q.x+q.w/2,q.y+q.h/2+5)}else ctx.fillText(r.type?defs[r.type].icon:'＋',q.x+q.w/2,q.y+q.h/2+6)}ctx.font='700 6.4px -apple-system, sans-serif';ctx.fillStyle='#655d55';var st=!r.type?'EMPTY':r.reserved?'SUA':r.occupied?'IN HOUSE':r.dirty?(r.cleaning>0?'CLEANING':'DIRTY'):'';if(!locked&&st)ctx.fillText(st,q.x+q.w/2,q.y+q.h-6)"
if old not in s: raise SystemExit('status block missing')
s=s.replace(old,new,1)
s=s.replace("rrect(l.x,l.y,l.w,l.h,10,lobbyFill,lobbyLv>=2?'rgba(151,111,48,.55)':'rgba(90,76,63,.4)')","rrect(l.x,l.y,l.w,l.h,3,lobbyFill,lobbyLv>=2?'rgba(151,111,48,.45)':'rgba(90,76,63,.32)')")
s=s.replace("QUEST_SYSTEM_VERSION='6.2.0'","QUEST_SYSTEM_VERSION='6.3.0'").replace('v6.2','v6.3')
p.write_text(s)
