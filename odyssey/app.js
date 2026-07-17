(async()=>{
'use strict';
const track=document.querySelector('.cat-track');
if(track&&!document.querySelector('#obstacle')){
 track.insertAdjacentHTML('afterbegin','<div class="obstacle" id="obstacle" aria-hidden="true"></div>');
}
const caption=document.querySelector('#caption');
if(caption&&!document.querySelector('#trailFeedback')){
 caption.insertAdjacentHTML('afterend','<div class="trail-feedback" id="trailFeedback" aria-live="polite"><div class="trail-icon" id="trailIcon"></div><div><strong id="trailTitle"></strong><span id="trailText"></span></div></div>');
}
document.querySelector('#completion')?.remove();
try{
 const root=new URL('./',location.href);
 const version='v3-20260717-2';
 const files=['v3/overrides.css','v3/app-1.txt','v3/app-2.txt','v3/app-3.txt','v3/app-4.txt'];
 const [css,...parts]=await Promise.all(files.map(name=>fetch(new URL(`${name}?${version}`,root),{cache:'no-store'}).then(response=>{
  if(!response.ok)throw new Error(`${name}: ${response.status}`);
  return response.text();
 })));
 const style=document.createElement('style');
 style.dataset.odysseyV3='';
 style.textContent=css;
 document.head.appendChild(style);
 (0,eval)(parts.join(''));
}catch(error){
 console.error('Odyssey v3 failed to load',error);
 const view=document.querySelector('#questionView');
 if(view)view.innerHTML='<h2 class="question">旅程暂时没有加载出来</h2><p class="hint">请刷新页面重试。你的回答仍保存在浏览器中。</p>';
}
})();