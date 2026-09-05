from pathlib import Path
import re
p=Path('games/jinwan-youtao/index.html')
s=p.read_text()
# Remove prior experimental board overrides to avoid cascade conflicts.
s=re.sub(r'\n?<style id="v60-board">[\s\S]*?</style>\n?','\n',s)
s=re.sub(r'\n?<script id="v60-board-renderer">[\s\S]*?</script>\n?','\n',s)
s=re.sub(r'\n?<style id="v601-cutaway-css">[\s\S]*?</style>\n?','\n',s)
s=re.sub(r'\n?<script id="v601-cutaway-js">[\s\S]*?</script>\n?','\n',s)
css='''
<style id="v610-finished-css">
:root{--hotel-shell:#1f3042;--room-wall:#eadbc5;--room-floor:#b98861;--room-green:#88b65e;--room-yellow:#e1b62f}
.stage{height:138vw!important;min-height:500px!important;max-height:620px!important;background:linear-gradient(180deg,#6e8ba7 0%,#425d79 18%,#26394d 18.4%,#1f3042 100%)!important}
.stagehud{top:10px!important;left:12px!important;right:12px!important;justify-content:flex-start!important;align-items:center!important}
#occChip{padding:7px 10px!important;border-radius:16px!important;background:rgba(255,251,244,.96)!important;font-size:10px!important;box-shadow:0 4px 12px rgba(0,0,0,.10)!important}
#viewToggle{position:absolute!important;left:50%!important;top:0!important;transform:translateX(-50%)!important;background:rgba(255,251,244,.96)!important;padding:4px!important}
#viewToggle button{font-size:9px!important;padding:4px 10px!important}
#propertyBadge,#explorerChip{display:none!important}
.hint{left:12px!important;right:12px!important;bottom:8px!important;border-radius:12px!important;background:#fff7da!important;border-color:#e6ca71!important;padding:7px 9px!important;font-size:9px!important}
.actions{grid-template-columns:repeat(4,1fr)!important}.action{height:60px!important;border-radius:15px!important}.action span{font-size:20px!important}#portfolioBtn{display:none!important}
.feed{border-radius:12px!important}.bottom{padding-top:9px!important}
@media(max-width:380px){.stage{height:144vw!important;min-height:520px!important}.action{height:56px!important}}
</style>
'''
s=s.replace('</head>',css+'\n</head>')
js=r'''
<script id="v610-finished-js">
(function(){
  var C=window.ctx;
  // Disable the old generated thumbnail atlas that caused black strips/noise.
  window.roomRenderData={};window.roomRenderImages={};
  window.dims=function(){
    var w=canvasSize.w||canvas.clientWidth||360,h=canvasSize.h||canvas.clientHeight||520;
    var gutter=46,m=8,lobby=92,top=60,fh=(h-top-lobby-25)/4;if(fh>108)fh=108;if(fh<84)fh=84;
    return{w:w,h:h,m:m,gutter:gutter,lobby:lobby,fh:fh,bw:w-gutter-m-6,base:h-32,top:top};
  };
  window.roomRect=function(r){var d=dims(),gap=5,cw=(d.bw-gap*2)/3,y=d.base-d.lobby-(r.f+1)*d.fh;return{x:d.gutter+r.c*(cw+gap),y:y,w:cw,h:d.fh-6}};
  window.lobbyRect=function(){var d=dims();return{x:d.gutter,y:d.base-d.lobby,w:d.w-d.gutter-8,h:d.lobby-5}};
  function rr(c,x,y,w,h,r,fill,stroke,lw){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw||1;c.stroke()}}
  function line(c,x1,y1,x2,y2,col,w){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=col;c.lineWidth=w||1;c.stroke()}
  function plant(c,x,y,s){s=s||1;c.fillStyle='#66825a';c.fillRect(x-2*s,y-8*s,2*s,8*s);c.fillRect(x+1*s,y-10*s,2*s,10*s);c.fillRect(x-5*s,y-6*s,4*s,2*s);c.fillStyle='#9b704c';c.fillRect(x-4*s,y,8*s,5*s)}
  function lamp(c,x,y,s){s=s||1;c.fillStyle='#c79a47';c.fillRect(x,y-9*s,1.4*s,10*s);c.fillStyle='#ffe4a0';c.beginPath();c.moveTo(x-5*s,y-9*s);c.lineTo(x+5*s,y-9*s);c.lineTo(x+3*s,y-4*s);c.lineTo(x-3*s,y-4*s);c.closePath();c.fill()}
  function bed(c,x,y,w,h,accent){c.fillStyle='#664b39';c.fillRect(x,y,w,h);c.fillStyle='#f7f1e7';c.fillRect(x+2,y-4,w-4,h);c.fillStyle=accent;c.fillRect(x+2,y+h-5,w-4,4);c.fillStyle='#fff';c.fillRect(x+4,y-3,w*.34,4)}
  function art(c,x,y,w,h,accent){c.fillStyle='#705744';c.fillRect(x,y,w,h);c.fillStyle=accent;c.fillRect(x+2,y+2,w-4,h-4)}
  window.drawRoomSpriteInCell=function(r,q,locked){
    if(locked||!r.type)return false;var c=ctx,type=r.type,x=q.x+4,y=q.y+16,w=q.w-8,h=q.h-29;if(w<25||h<24)return false;
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.imageSmoothingEnabled=false;
    var suite=type==='suite', wall=suite?'#ead7bb':'#ecddc6',floor=suite?'#b47c52':'#b88a62',accent=suite?'#b15f48':'#b98159';
    rr(c,x,y,w,h,2,wall,'rgba(68,50,37,.60)',1.4);c.fillStyle=floor;c.fillRect(x,y+h*.64,w,h*.36);line(c,x,y+h*.64,x+w,y+h*.64,'rgba(70,50,36,.42)',1);
    c.fillStyle='rgba(255,239,181,.96)';c.fillRect(x+w*.18,y+3,6,2);c.fillRect(x+w*.70,y+3,6,2);
    if(type==='standard'||type==='suite'){
      art(c,x+w*.37,y+7,w*.25,7,suite?'#718e90':'#819a9c');bed(c,x+6,y+h*.54,w*(suite?.48:.43),9,accent);lamp(c,x+w*.56,y+h*.60,.8);plant(c,x+w-10,y+h*.74,.8);
      c.fillStyle='#73523b';c.fillRect(x+w*.65,y+h*.56,w*.21,3);c.fillRect(x+w*.68,y+h*.59,1,7);c.fillRect(x+w*.82,y+h*.59,1,7);
      if(suite){c.fillStyle='#5d7763';c.fillRect(x+w*.58,y+h*.76,w*.29,7);c.fillStyle='#8d6648';c.fillRect(x+w*.66,y+h*.72,w*.14,2)}
    }else if(type==='breakfast'){
      c.fillStyle='#7a573d';c.fillRect(x+5,y+10,w-10,7);c.fillStyle='#d7ae63';c.fillRect(x+8,y+6,w*.27,4);c.fillStyle='#303e44';c.fillRect(x+w*.72,y+5,7,8);
      for(var i=0;i<3;i++){var tx=x+7+i*(w-17)/3;c.fillStyle='#7a573d';c.fillRect(tx,y+h*.73,13,3);c.fillRect(tx+2,y+h*.76,1,6);c.fillRect(tx+10,y+h*.76,1,6)}plant(c,x+w-10,y+h*.73,.7)
    }else if(type==='club'){
      c.fillStyle='#58745e';c.fillRect(x+5,y+h*.58,w*.36,8);c.fillStyle='#77543d';c.fillRect(x+w*.48,y+8,w*.41,5);for(var b=0;b<4;b++){c.fillStyle=b%2?'#c98a47':'#7b4037';c.fillRect(x+w*.53+b*8,y+10,3,4)}plant(c,x+w-9,y+h*.74,.8)
    }else if(type==='gym'){
      c.fillStyle='#4f5960';c.fillRect(x+7,y+h*.69,w*.32,3);line(c,x+10,y+h*.67,x+15,y+h*.44,'#4f5960',2);line(c,x+w*.58,y+h*.71,x+w*.82,y+h*.71,'#4f5960',2);c.fillStyle='#708896';c.fillRect(x+w*.50,y+h*.46,w*.38,3);plant(c,x+w-9,y+h*.75,.7)
    }else if(type==='spa'){
      c.fillStyle='#f2eadc';c.fillRect(x+6,y+h*.59,w*.48,8);c.fillStyle='#a48160';c.fillRect(x+6,y+h*.67,w*.48,3);c.fillStyle='#c6ae89';c.fillRect(x+w*.63,y+h*.35,w*.24,h*.36);lamp(c,x+w*.58,y+h*.61,.7);plant(c,x+w-9,y+h*.74,.8)
    }
    c.fillStyle='rgba(255,255,255,.13)';c.fillRect(x+2,y+2,w-4,3);c.restore();return true;
  };
  // Draw a real hotel shell around the existing simulation, without changing state/hitboxes.
  var baseDraw=window.draw;
  window.draw=function(){
    baseDraw();if(state.visualMode==='3d')return;var d=dims(),c=ctx;c.save();
    c.fillStyle='#1e2f42';c.fillRect(0,d.top-7,d.gutter-4,d.base-d.top+13);
    // left floor spine
    for(var f=0;f<4;f++){var yy=d.base-d.lobby-(f+1)*d.fh, unlocked=f<mapFloorCount();c.textAlign='center';c.fillStyle='rgba(255,255,255,.95)';c.font='900 10px -apple-system,sans-serif';c.fillText((f+2)+'F',21,yy+24);c.font='800 7px -apple-system,sans-serif';c.fillStyle='rgba(255,255,255,.72)';c.fillText(unlocked?'客房':'尚未开放',21,yy+38);if(!unlocked){c.font='13px sans-serif';c.fillText('🔒',21,yy+57)}}
    var l=lobbyRect();c.fillStyle='rgba(255,255,255,.96)';c.font='900 10px -apple-system,sans-serif';c.fillText('大堂',21,l.y+31);c.font='800 7px -apple-system,sans-serif';c.fillStyle='rgba(255,255,255,.72)';c.fillText('LOBBY',21,l.y+44);
    // beams make separate cards read as one cutaway building
    c.strokeStyle='#172636';c.lineWidth=4;for(var ff=0;ff<4;ff++){var ry=d.base-d.lobby-(ff+1)*d.fh-2;c.beginPath();c.moveTo(d.gutter-2,ry);c.lineTo(d.w-7,ry);c.stroke()}
    c.strokeStyle='#172636';c.lineWidth=4;c.strokeRect(d.gutter-2,d.top-7,d.w-d.gutter-5,d.base-d.top+10);
    c.restore();
  };
  // Board HUD: only occupancy + view selector. This removes the visual clutter the screenshots exposed.
  var pb=document.getElementById('propertyBadge'),ex=document.getElementById('explorerChip');if(pb)pb.style.display='none';if(ex)ex.style.display='none';
  document.documentElement.setAttribute('data-ui-version','6.1');
})();
</script>
'''
s=s.replace('</body>',js+'\n</body>')
s=s.replace("QUEST_SYSTEM_VERSION='6.0.0'","QUEST_SYSTEM_VERSION='6.1.0'")
s=s.replace("QUEST_SYSTEM_VERSION='6.0.1'","QUEST_SYSTEM_VERSION='6.1.0'")
p.write_text(s)
