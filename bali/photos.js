(()=>{
const input=document.getElementById('photoInput'),gallery=document.getElementById('photoGallery'),select=document.getElementById('daySelect');if(!input||!gallery||!select)return;
const key=()=>`project-bali-photo-D${select.value}`;
function get(){try{return JSON.parse(localStorage.getItem(key())||'[]')}catch(e){return[]}}
function set(v){try{localStorage.setItem(key(),JSON.stringify(v));return true}catch(e){return false}}
const ref=gallery.closest('.photo-ref');
const toolbar=document.createElement('div');toolbar.className='photo-toolbar';toolbar.innerHTML='<button type="button" class="photo-clear">清空本日参考图</button>';gallery.before(toolbar);
const lightbox=document.createElement('div');lightbox.className='photo-lightbox';lightbox.hidden=true;lightbox.innerHTML='<button type="button" aria-label="关闭">×</button><img alt="参考样片大图">';document.body.appendChild(lightbox);
function render(){const arr=get();gallery.innerHTML=arr.length?arr.map((src,i)=>`<div class="photo-item"><img src="${src}" data-i="${i}" alt="D${select.value} 参考样片 ${i+1}"><button type="button" data-i="${i}" aria-label="删除参考照片">×</button></div>`).join(''):'<div class="photo-empty">还没有参考样片</div>';toolbar.hidden=!arr.length}
function compress(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1100,scale=Math.min(1,max/Math.max(img.width,img.height)),w=Math.round(img.width*scale),h=Math.round(img.height*scale),c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);resolve(c.toDataURL('image/jpeg',.76))};img.src=r.result};r.readAsDataURL(file)})}
input.addEventListener('change',async()=>{let arr=get();for(const f of [...input.files].filter(x=>x.type.startsWith('image/')).slice(0,8)){if(arr.length>=8)break;try{arr.push(await compress(f))}catch(e){}}if(!set(arr)){alert('当前设备可用于参考图的浏览器存储空间不足，请删掉部分图片后再试。')}input.value='';render()});
gallery.addEventListener('click',e=>{const del=e.target.closest('button[data-i]');if(del){let arr=get();arr.splice(Number(del.dataset.i),1);set(arr);render();return}const img=e.target.closest('img[data-i]');if(img){lightbox.querySelector('img').src=img.src;lightbox.hidden=false;document.body.style.overflow='hidden'}});
toolbar.querySelector('.photo-clear').addEventListener('click',()=>{if(!get().length)return;if(confirm('清空这一天的全部参考照片？')){set([]);render()}});
function close(){lightbox.hidden=true;lightbox.querySelector('img').src='';document.body.style.overflow=''}
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.tagName==='BUTTON')close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)close()});
select.addEventListener('change',()=>{close();render()});render();
const t=document.createElement('script');t.src='./tweaks.js?v=1';t.async=true;document.head.appendChild(t);
})();