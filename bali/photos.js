(()=>{
const input=document.getElementById('photoInput'),gallery=document.getElementById('photoGallery'),select=document.getElementById('daySelect');if(!input||!gallery||!select)return;
const key=()=>`project-bali-photo-D${select.value}`;
function get(){try{return JSON.parse(localStorage.getItem(key())||'[]')}catch(e){return[]}}
function set(v){try{localStorage.setItem(key(),JSON.stringify(v));return true}catch(e){return false}}
function render(){const arr=get();gallery.innerHTML=arr.length?arr.map((src,i)=>`<div class="photo-item"><img src="${src}" alt="D${select.value} 参考样片 ${i+1}"><button type="button" data-i="${i}" aria-label="删除参考照片">×</button></div>`).join(''):'<div class="photo-empty">还没有参考样片</div>'}
function compress(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=900,scale=Math.min(1,max/Math.max(img.width,img.height)),w=Math.round(img.width*scale),h=Math.round(img.height*scale),c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);resolve(c.toDataURL('image/jpeg',.7))};img.src=r.result};r.readAsDataURL(file)})}
input.addEventListener('change',async()=>{let arr=get();for(const f of [...input.files].filter(x=>x.type.startsWith('image/')).slice(0,6)){if(arr.length>=6)break;try{arr.push(await compress(f))}catch(e){}}if(!set(arr)){alert('当前设备可用于参考图的浏览器存储空间不足，请删掉部分图片后再试。')}input.value='';render()});
gallery.addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(!b)return;let arr=get();arr.splice(Number(b.dataset.i),1);set(arr);render()});select.addEventListener('change',render);render();
const t=document.createElement('script');t.src='./tweaks.js?v=1';t.async=true;document.head.appendChild(t);
})();