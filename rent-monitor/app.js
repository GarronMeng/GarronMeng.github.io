const state={data:null,view:'all',filters:{area:true,rent:true,direct:true,commute:true,split:false},sort:'score'};
const fmtMoney=n=>`HK$${Number(n||0).toLocaleString('en-HK')}`;
const fmtDate=s=>{if(!s)return '—';const d=new Date(s);return Number.isNaN(d.getTime())?s:new Intl.DateTimeFormat('zh-HK',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(d)};
const TW_TIGHT=new Set(['荃湾','大窝口','葵兴','葵芳','荔景','美孚','荔枝角','长沙湾','深水埗']);
const ER_NORTH=new Set(['上水','粉岭']);
const ER_MID=new Set(['太和','大埔墟','大学','火炭']);
function badge(label,cls=''){return `<span class="badge ${cls}">${label}</span>`}
function commute(x){
  const route=x.admiralty_route||'';const st=x.mtr_station||'';
  if(route.includes('东铁线')){
    if(ER_NORTH.has(st))return {ok:true,risk:'medium',label:'06:30可达 · 约05:40–05:50进站',bonus:0};
    if(ER_MID.has(st))return {ok:true,risk:'safe',label:'06:30可达 · 余量充足',bonus:5};
    return {ok:true,risk:'safe',label:'06:30可达 · 余量充足',bonus:8};
  }
  if(route.includes('港岛线'))return {ok:true,risk:'safe',label:'06:30可达 · 早班余量充足',bonus:8};
  if(route.includes('荃湾线')){
    if(TW_TIGHT.has(st))return {ok:true,risk:'tight',label:'06:30可达 · 首班约06:26–06:28到，容错低',bonus:-6};
    return {ok:true,risk:'safe',label:'06:30可达 · 余量较好',bonus:5};
  }
  return {ok:false,risk:'fail',label:'06:30到达未验证',bonus:-20};
}
function adjustedScore(x){return Math.max(0,Math.min(99,(x.score||0)+commute(x).bonus))}
function statusBadges(x){
  const out=[],c=commute(x);
  if(x.is_new)out.push(badge('新盘','new'));
  if(x.price_drop>0)out.push(badge(`降价 ${fmtMoney(x.price_drop)}`,'new'));
  if(c.ok)out.push(badge(c.risk==='tight'?'06:30可达·容错低':'06:30可达',c.risk==='tight'?'warn':'good'));
  if(x.type_verified===true)out.push(badge('住宅类型已核','good'));
  if(x.mtr_verified===true)out.push(badge(`MTR ${x.mtr_walk_min}分钟`,'good'));
  if(x.split_ac===true)out.push(badge('分体冷气','good'));
  else if(x.window_ac===true)out.push(badge('窗口冷气','warn'));
  else if(x.ac_present)out.push(badge('冷气类型待确认','warn'));
  else out.push(badge('冷气待确认','warn'));
  if(x.wet_dry===true)out.push(badge('干湿分离','good'));
  if(x.lift===true)out.push(badge('有电梯','good'));else if(x.lift===null)out.push(badge('电梯待确认','warn'));
  return out.join('')
}
function verifiedBase(x){return x.type_verified===true&&x.mtr_verified===true&&x.shared!==true}
function strict(x){const c=commute(x);return verifiedBase(x)&&c.ok&&x.area>=300&&x.rent<=14000&&x.direct_to_admiralty&&x.mtr_walk_min<=5&&x.lift===true&&x.split_ac===true&&x.window_ac!==true}
function passes(x){
  if(!verifiedBase(x))return false;if(state.view==='strict'&&!strict(x))return false;if(state.view==='new'&&!x.is_new&&!(x.price_drop>0))return false;
  if(state.filters.area&&x.area<300)return false;if(state.filters.rent&&x.rent>14000)return false;if(state.filters.direct&&!x.direct_to_admiralty)return false;if(state.filters.commute&&!commute(x).ok)return false;if(state.filters.split&&x.split_ac!==true)return false;return true
}
function sorted(items){return [...items].sort((a,b)=>{if(state.sort==='area')return b.area-a.area;if(state.sort==='rent')return a.rent-b.rent;if(state.sort==='fresh')return String(b.last_seen).localeCompare(String(a.last_seen));return adjustedScore(b)-adjustedScore(a)||a.rent-b.rent})}
function card(x){const base=state.data.baseline,c=commute(x),areaGain=x.area-base.area,rentGain=x.rent-base.rent;return `<article class="listing">
<div class="listing-top"><div class="listing-title"><h2>${x.estate||x.title}</h2><p>${x.district}${x.unit?` · ${x.unit}`:''}${x.rooms?` · ${x.rooms}房`:''}</p></div><div class="score">${adjustedScore(x)}</div></div>
<div class="badges">${statusBadges(x)}</div>
<div class="metrics"><div class="metric"><b>${fmtMoney(x.rent)}</b><span>月租</span></div><div class="metric"><b>${x.area} 呎</b><span>实用面积</span></div><div class="metric"><b>${x.age_years??'—'}${x.age_years!=null?' 年':''}</b><span>楼龄</span></div></div>
<div class="facts"><div class="fact"><span>早班 / 金钟</span>${c.label}</div><div class="fact"><span>港铁</span>${x.mtr_station||x.district}${x.mtr_walk_min!=null?` · 步行${x.mtr_walk_min}分钟`:''} · ${x.admiralty_route||'路线待确认'}</div><div class="fact"><span>深圳</span>${x.shenzhen_note||'一般'}</div><div class="fact"><span>浴室</span>${x.wet_dry===true?'干湿分离':x.wet_dry===false?'非干湿分离':'待确认'}</div><div class="fact"><span>最后确认</span>${fmtDate(x.last_seen)}</div></div>
<div class="upgrade"><span>相比基安</span><strong>${rentGain>=0?'+':''}${fmtMoney(rentGain).replace('HK$-','-HK$')}/月 · ${areaGain>=0?'+':''}${areaGain}呎</strong></div>
<div class="listing-actions"><a class="open-link" href="${x.url}" target="_blank" rel="noopener">打开当前房源</a><span class="source">${x.source}</span></div></article>`}
function render(){if(!state.data)return;const verified=state.data.listings.filter(verifiedBase),items=sorted(verified.filter(passes));document.querySelector('#listings').innerHTML=items.map(card).join('');document.querySelector('#empty').hidden=items.length>0;document.querySelector('#resultMeta').textContent=`${items.length} 套`;document.querySelector('#activeCount').textContent=verified.length;document.querySelector('#strictCount').textContent=verified.filter(strict).length;document.querySelector('#newCount').textContent=verified.filter(x=>x.is_new||x.price_drop>0).length;document.querySelector('#sourceCount').textContent=state.data.meta?.source_count||0;document.querySelector('#updatedAt').textContent=state.data.meta?.updated_at?`更新 ${fmtDate(state.data.meta.updated_at)}`:'等待首次刷新';document.querySelector('#refreshStatus').textContent=state.data.meta?.algorithm_version==='2.1'?(state.data.meta?.status==='ok'?'监控正常':state.data.meta?.status==='partial'?'部分来源异常':'等待刷新'):'等待新版筛选刷新'}
async function boot(){try{const r=await fetch(`./data/listings.json?v=${Date.now()}`,{cache:'no-store'});state.data=await r.json()}catch(e){state.data={meta:{status:'pending',source_count:0},baseline:{rent:11000,area:224},listings:[]}}render()}
document.addEventListener('click',e=>{const seg=e.target.closest('.seg');if(seg){document.querySelectorAll('.seg').forEach(x=>x.classList.remove('active'));seg.classList.add('active');state.view=seg.dataset.view;render();return}const chip=e.target.closest('.chip');if(chip){const k=chip.dataset.filter;state.filters[k]=!state.filters[k];chip.classList.toggle('active',state.filters[k]);render()}});document.querySelector('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});boot();
