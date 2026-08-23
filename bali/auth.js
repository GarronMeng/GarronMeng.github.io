(()=>{
  const AUTH_KEY='project-bali-auth-v1';
  const PASS_HASH='ac1a6ed3b3b40a41e43a54aace7bb14773efce011f130417ab98aaabd73c186a';
  let unlocked=false;
  try{unlocked=sessionStorage.getItem(AUTH_KEY)==='ok'}catch(e){}
  if(unlocked)return;

  document.documentElement.classList.add('pb-locked');
  const style=document.createElement('style');
  style.textContent=`
    html.pb-locked{background:#0b4d43}
    html.pb-locked body{overflow:hidden;background:#0b4d43}
    html.pb-locked body>main{visibility:hidden}
    #pb-auth{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at 82% 15%,rgba(255,217,123,.18),transparent 28%),linear-gradient(145deg,#0b4d43,#0d7867);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
    #pb-auth-card{width:min(92vw,390px);padding:28px 24px 24px;border-radius:24px;background:#fffdf8;box-shadow:0 24px 70px rgba(0,0,0,.28);color:#173b33}
    #pb-auth-card h1{margin:0 0 7px;font-family:Georgia,serif;font-size:36px;line-height:1;color:#0d6b5d}
    #pb-auth-card p{margin:0 0 20px;color:#67756f;font-size:13px;line-height:1.55}
    #pb-auth-form{display:grid;gap:10px}
    #pb-auth-input{width:100%;height:48px;border:1px solid #d8d4c8;border-radius:13px;padding:0 14px;background:#fff;color:#173b33;font-size:18px;letter-spacing:.12em;outline:none}
    #pb-auth-input:focus{border-color:#0d6b5d;box-shadow:0 0 0 3px rgba(13,107,93,.12)}
    #pb-auth-btn{height:46px;border:0;border-radius:13px;background:#0d6b5d;color:#fff;font-size:15px;font-weight:800;cursor:pointer}
    #pb-auth-error{min-height:18px;margin:0;color:#9b1c1c;font-size:12px}
  `;
  document.head.appendChild(style);

  function sha256(text){
    const bytes=new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256',bytes).then(buf=>Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join(''));
  }

  function mount(){
    const overlay=document.createElement('div');
    overlay.id='pb-auth';
    overlay.innerHTML=`<div id="pb-auth-card"><h1>Project Bali</h1><p>请输入访问密码查看旅行路书。</p><form id="pb-auth-form"><input id="pb-auth-input" type="password" inputmode="numeric" autocomplete="current-password" placeholder="访问密码" aria-label="访问密码"><button id="pb-auth-btn" type="submit">进入路书</button><p id="pb-auth-error"></p></form></div>`;
    document.body.appendChild(overlay);
    const form=document.getElementById('pb-auth-form');
    const input=document.getElementById('pb-auth-input');
    const error=document.getElementById('pb-auth-error');
    setTimeout(()=>input.focus(),80);
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      error.textContent='';
      try{
        const digest=await sha256(input.value.trim());
        if(digest!==PASS_HASH){error.textContent='密码不正确';input.select();return;}
        try{sessionStorage.setItem(AUTH_KEY,'ok')}catch(e){}
        document.documentElement.classList.remove('pb-locked');
        overlay.remove();
      }catch(err){error.textContent='当前浏览器无法验证密码，请换用 Safari 或 Chrome。';}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();