const state={data:null,view:'all',filters:{area:false,rent:false,direct:true,commute:true,split:false,layout:true},sort:'score',district:'all',priceBand:'10-15'};
const money=n=>`HK$${Number(n||0).toLocaleString('en-HK')}`;
const date=s=>{if(!s)return'—';const d=new Date(s);return Number.isNaN(d.getTime())?s:new Intl.DateTimeFormat('zh-HK',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(d)};
const er={红磡:['excellent',14],大围:['excellent',12],沙田:['safe',9],火炭:['safe',6],大埔墟:['medium',0],太和:['medium',-1],粉岭:['early',-5],上水:['early',-7]};
const isl={坚尼地城:['safe',7],香港大学:['safe',8],西营盘:['safe',9],湾仔:['excellent',16],天后:['excellent',13],炮台山:['excellent',12],北角:['excellent',11],鰂鱼涌:['excellent',10],太古:['safe',8],西湾河:['safe',7],筲箕湾:['safe',5],柴湾:['medium',0]};
const sil={黄竹坑:['excellent',13],利东:['excellent',14],海怡半岛:['excellent',12]};
const fragile=new Set(['荃湾','大窝口','葵兴','葵芳','荔景','美孚','荔枝角','长沙湾','深水埗']);
const midTW=new Set(['太子','旺角','油麻地','佐敦','尖沙咀']);
const priority=new Set(['北角','鰂鱼涌','西湾河','长沙湾','鸭脷洲','大围','沙田','红磡','柴湾','粉岭','坚尼地城','西营盘','湾仔']);
const fallbackWatch=['惠利大廈','金海大廈','中興大廈','東發大廈','曉悅','睿峰','美居中心','嘉裕居','黃金大廈','昌遠大廈','喜居','柏傲莊','金獅花園','沙田中心','紅磡灣中心','環海東岸','雅麗閣','粉嶺名都','粉嶺中心','牽晴間','海都樓','錦興大廈','李節花園','壹嘉','維峯','維峯浚匯'];
const estate=x=>String(x.estate||x.title||'');
const watch=x=>(state.data?.meta?.watchlist_estates||fallbackWatch).some(n=>estate(x).includes(n));
const badge=(s,c='')=>`<span class="badge ${c}">${s}</span>`;
function commute(x){const line=x.rail_line||'',st=x.mtr_station||'';let p;
if(line==='南港岛线')p=sil[st]||['safe',8];else if(line==='港岛线')p=isl[st]||['safe',6];else if(line==='东铁线')p=er[st]||['safe',5];else if(line==='荃湾线')p=fragile.has(st)?['fragile',-10]:midTW.has(st)?['tight',-4]:['tight',-3];else return {ok:false,risk:'fail',bonus:-20,label:'线路信息待核实'};
const risk=p[0],label=risk==='excellent'?'早班便利度较高':risk==='safe'?'早班路线较便利':risk==='medium'?'早班班次建议核实':risk==='early'?'首班时间与候车需注意':'首班容错较低';return {ok:true,risk,bonus:p[1],label:line+' · '+label+'（估算）'}}
const baseOK=x=>x.type_verified===true&&x.mtr_verified===true&&x.shared!==true;
function tier(x){const c=commute(x);if(x.type_verified!==true||x.shared===true||!c.ok)return'D';
if(x.area>=300&&x.rent<=15000&&x.mtr_verified===true&&x.mtr_walk_min<=5&&x.lift===true&&x.window_ac!==true&&!['fragile','early','fail'].includes(c.risk))return'A';
if(x.area>=260&&x.rent<=18000&&x.mtr_verified===true&&x.mtr_walk_min<=10)return'B';
if(x.area>=170&&x.area<260&&x.rent>=10000&&x.rent<=15000&&x.rail_line)return'C';
if(x.area>=250&&x.rent<=22000&&x.mtr_verified===true&&x.mtr_walk_min<=12)return'C';return'D'}
function score(x){let s=x.score||0;s+=commute(x).bonus;s+=x.rent<=14000?6:x.rent<=15000?3:x.rent<=16000?0:x.rent<=18000?-5:-10;s+=x.area>=400?8:x.area>=350?6:x.area>=300?3:x.area<280?-5:0;s+=priority.has(x.district)?3:0;s+=watch(x)?5:0;s+=tier(x)==='A'?8:tier(x)==='B'?2:-4;s+=x.split_ac===true?6:x.window_ac===true?-8:x.ac_present?1:0;return Math.max(0,Math.min(99,s))}
function tradeoffs(x){const a=[],c=commute(x);if(x.rent>18000)a.push('租金明显超预算');else if(x.rent>15000)a.push(`比15k高${money(x.rent-15000)}`);if(x.area<260)a.push('紧凑面积 '+x.area+'呎');else if(x.area<300)a.push(`面积${x.area}呎`);if(x.mtr_verified!==true)a.push('步行港铁时间待核实');if(x.mtr_walk_min>5)a.push(`港铁步行${x.mtr_walk_min}分钟`);if(['fragile','tight'].includes(c.risk))a.push('早班容错低');if(c.risk==='early')a.push('需要很早出门');if(x.split_ac!==true)a.push(x.ac_present?'冷气类型待确认':'冷气待确认');if(x.wet_dry!==true)a.push('干湿分离待确认');if(x.age_years>=45)a.push(`楼龄${x.age_years}年`);return a.slice(0,4)}
function upsides(x){const a=[],c=commute(x);if(x.area>=400)a.push('宽敞户型');else if(x.area>=300)a.push('达到300呎面积目标');if(x.rent<=14000)a.push('租金较低');if(c.risk==='excellent')a.push('早班交通相对便利');if(x.split_ac===true)a.push('分体冷气已确认');if(watch(x))a.push('重点屋苑');return a.slice(0,3)}
function badges(x){const a=[],t=tier(x),c=commute(x);a.push(badge(t==='A'?'A 核心候选':t==='B'?'B 权衡':'C 机会',t==='A'?'good':t==='B'?'warn':'neutral'));if(x.is_new)a.push(badge('新盘','new'));if(x.price_drop>0)a.push(badge(`降价 ${money(x.price_drop)}`,'new'));if(watch(x))a.push(badge('重点屋苑','good'));if(x.duplicate_count>1)a.push(badge('同规格广告 ×'+x.duplicate_count,'warn'));if(x.layout_group_count>1)a.push(badge('同户型 '+x.layout_group_count+' 组','good'));if(x.area<260)a.push(badge('紧凑户型','warn'));if(x.availability_verified===false)a.push(badge('在租待确认','warn'));if(c.risk==='excellent')a.push(badge('早班通勤优','good'));else if(['fragile','tight','early'].includes(c.risk))a.push(badge(c.risk==='early'?'需很早出门':'早班容错低','warn'));if(x.split_ac===true)a.push(badge('分体冷气已确认','good'));else a.push(badge(x.ac_present?'有冷气·类型待确认':'冷气待确认','warn'));if(x.wet_dry===true)a.push(badge('干湿分离','good'));if(x.lift===true)a.push(badge('有电梯','good'));return a.join('')}
function passes(x){if(tier(x)==='D')return false;if(state.view==='core'&&tier(x)!=='A')return false;if(state.view==='tradeoff'&&tier(x)!=='B')return false;if(state.view==='watch'&&!watch(x))return false;if(state.view==='new'&&!x.is_new&&!(x.price_drop>0))return false;if(state.view==='compact'&&!(x.area>=170&&x.area<260))return false;if(state.filters.area&&x.area<300)return false;if(state.filters.rent&&x.rent>16000)return false;if(state.filters.direct&&!x.direct_rail)return false;if(state.filters.commute&&!commute(x).ok)return false;if(state.filters.split&&x.split_ac!==true)return false;if(!matchesPrice(x))return false;return true}
const PRICE_BANDS=[{id:'10-15',label:'10–15k 优先',min:10000,max:15000},{id:'all',label:'全部租金',min:0,max:Infinity},{id:'under13',label:'≤13k',min:0,max:13000},{id:'15-18',label:'15–18k',min:15001,max:18000},{id:'over18',label:'18k以上',min:18001,max:Infinity}];
function matchesPrice(x){const b=PRICE_BANDS.find(p=>p.id===state.priceBand)||PRICE_BANDS[0];return x.rent>=b.min&&x.rent<=b.max}
function renderPrices(all){const box=document.querySelector('#priceFilters');if(!box)return;box.innerHTML=PRICE_BANDS.map(b=>{const n=all.filter(x=>x.rent>=b.min&&x.rent<=b.max).length;return '<button type="button" class="area-filter'+(state.priceBand===b.id?' active':'')+'" data-price="'+b.id+'" aria-pressed="'+(state.priceBand===b.id)+'">'+b.label+' <span>'+n+'</span></button>'}).join('')}
function sort(items){return[...items].sort((a,b)=>state.sort==='area'?b.area-a.area:state.sort==='rent'?a.rent-b.rent:state.sort==='fresh'?String(b.last_seen).localeCompare(String(a.last_seen)):score(b)-score(a)||a.rent-b.rent)}

// Display grouping: same estate / block / area / room count is one layout type,
// not necessarily one physical flat. Keep every distinct offering underneath.
function layoutKey(x){
  const u=String(x.unit||'').normalize('NFKC');
  const building=(u.match(/(?:第?\d+[A-Z]?座|[A-Z]座|第?[一二三四五六七八九十]+期)/i)||[])[0]||'';
  const normal=v=>String(v??'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');
  return [normal(x.district),normal(estate(x)),x.area,x.rooms??'unknown',normal(building)].join('|')
}
function layoutGroups(items){
  const buckets=new Map();
  for(const x of items){const k=layoutKey(x);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(x)}
  return [...buckets.values()].map(group=>{
    if(group.length===1)return group[0];
    const ordered=[...group].sort((a,b)=>a.rent-b.rent||score(b)-score(a));
    const chosen=ordered[0];
    return {...chosen,layout_group_count:group.length,layout_ad_count:group.reduce((n,x)=>n+(x.duplicate_count||1),0),layout_price_min:chosen.rent,layout_price_max:Math.max(...group.map(x=>x.rent)),layout_options:ordered.slice(1).map(x=>({id:x.id,url:x.url,rent:x.rent,unit:x.unit,alternate_ads:x.alternate_ads||[]}))}
  })
}
function layoutAlternatives(x){
  const opts=x.layout_options||[];
  if(!opts.length)return '';
  const fmtLink=(ad)=>{
    if(!/^\d+$/.test(String(ad.id||'')))return '';
    return '<a target="_blank" rel="noopener noreferrer" href="https://www.28hse.com/rent/apartment/property-'+String(ad.id)+'">'+money(ad.rent)+' · 广告 #'+String(ad.id)+'</a>';
  };
  let links=opts.map(o=>fmtLink(o)+(o.alternate_ads||[]).map(a=>fmtLink({...a,rent:o.rent})).join('')).join('');
  return '<details class="duplicate-links"><summary>另有 '+opts.length+' 组同户型报价 · '+money(x.layout_price_min)+'–'+money(x.layout_price_max)+'</summary><p>按屋苑、楼座、面积及房数归组；不同楼层及租金可能属于不同单位。请逐一查看链接。</p><div class="duplicate-link-list">'+links+'</div></details>';
}
function alternativeAds(x){const ads=Array.isArray(x.alternate_ads)?x.alternate_ads:[];if(!ads.length)return '';const links=ads.filter(a=>/^\d+$/.test(String(a.id||''))).map(a=>'<a target="_blank" rel="noopener noreferrer" href="https://www.28hse.com/rent/apartment/property-'+encodeURIComponent(String(a.id))+'">广告 #'+String(a.id)+(a.listing_updated?' · 更新 '+String(a.listing_updated):'')+'</a>').join('');return '<details class="duplicate-links"><summary>同规格还有 '+ads.length+' 条广告 · 展开核对</summary><p>屋苑、面积、价钱及楼层范围相近，不代表已确认属于同一实际单位。</p><div class="duplicate-link-list">'+links+'</div></details>'}
function card(x){const c=commute(x);return`<article class="listing"><div class="listing-top"><div class="listing-title"><h2>${estate(x)}</h2><p>${x.district}${x.unit?` · ${x.unit}`:''}${x.rooms?` · ${x.rooms}房`:''}</p></div><div class="score">${score(x)}</div></div><div class="badges">${badges(x)}</div><div class="metrics"><div class="metric"><b>${money(x.rent)}${x.layout_group_count>1?' 起':''}</b><span>月租</span></div><div class="metric"><b>${x.area} 呎</b><span>实用面积</span></div><div class="metric"><b>${x.age_years??'—'}${x.age_years!=null?' 年':''}</b><span>楼龄</span></div></div><div class="facts"><div class="fact"><span>早班交通参考</span>${c.label}</div><div class="fact"><span>港铁</span>${x.mtr_station||x.district}${x.mtr_walk_min!=null?` · ${x.mtr_walk_min}分钟`:''} · ${x.rail_line||'线路待确认'}</div><div class="fact"><span>值得看</span>${upsides(x).join(' · ')||'综合条件有可比性'}</div><div class="fact"><span>主要取舍</span>${tradeoffs(x).join(' · ')||'暂无明显短板'}</div><div class="fact"><span>最后确认</span>${date(x.last_seen)}</div></div><div class="listing-actions"><a class="open-link" href="${x.url}" target="_blank" rel="noopener">打开当前房源</a><span class="source">${x.source}</span></div>${alternativeAds(x)}${layoutAlternatives(x)}</article>`}


// Area navigator: group by the advertisement district, not the detected MTR
// station, which may differ from the property's actual neighborhood.
const featuredDistricts=['长沙湾','湾仔','鰂鱼涌','北角','大围','红磡','沙田','鸭脷洲','粉岭','西湾河','坚尼地城'];
const hkIsland=new Set(['湾仔','北角','鰂鱼涌','西湾河','筲箕湾','柴湾','鸭脷洲','坚尼地城','西营盘','天后/大坑','铜锣湾','炮台山','太古','海怡半岛','利东','黄竹坑','上环','中环']);
const kowloon=new Set(['长沙湾','深水埗','荔枝角','太子','旺角','油麻地','佐敦','尖沙咀','红磡','大角咀','南昌','美孚','奥运','九龙塘']);
const areaRegion=d=>hkIsland.has(d)?'香港岛':kowloon.has(d)?'九龙':'新界';
const escapeHtml=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function areaOrder(a,b){
  const ai=featuredDistricts.indexOf(a),bi=featuredDistricts.indexOf(b);
  if(ai!==-1||bi!==-1)return (ai===-1?999:ai)-(bi===-1?999:bi);
  const rr={'香港岛':0,'九龙':1,'新界':2};
  return rr[areaRegion(a)]-rr[areaRegion(b)]||a.localeCompare(b,'zh-HK')
}
function areaFilterButton(d,n){
  const selected=state.district===d;
  const isZero=n===0;
  const label=d==='all'?'全部地区':d;
  return '<button type="button" class="area-filter'+(selected?' active':'')+(isZero?' no-results':'')+'" data-district="'+encodeURIComponent(d)+'" aria-pressed="'+String(selected)+'">'+escapeHtml(label)+' <span>'+n+'</span></button>'
}
function districtNav(all,items){
  const totals=new Map();
  for(const x of items)totals.set(x.district,(totals.get(x.district)||0)+1);
  const names=[...new Set(all.map(x=>x.district).filter(Boolean))].sort(areaOrder);
  const featured=names.filter(x=>featuredDistricts.includes(x));
  const remaining=names.filter(x=>!featuredDistricts.includes(x));
  let html='<div class="area-shortcuts">'+areaFilterButton('all',items.length)+featured.map(d=>areaFilterButton(d,totals.get(d)||0)).join('')+'</div>';
  if(remaining.length){
    html+='<details class="area-more"'+(remaining.includes(state.district)?' open':'')+'><summary>更多地区 · '+remaining.length+'个</summary>';
    for(const region of ['香港岛','九龙','新界']){
      const chunk=remaining.filter(d=>areaRegion(d)===region);
      if(chunk.length)html+='<div class="area-region"><strong>'+region+'</strong><div class="area-options">'+chunk.map(d=>areaFilterButton(d,totals.get(d)||0)).join('')+'</div></div>';
    }
    html+='</details>';
  }
  return html
}
function renderDistrictSections(items){
  const grouped=new Map();
  for(const x of items){const key=x.district||'地区待核实';if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(x)}
  const names=[...grouped.keys()].sort(areaOrder);
  return names.map(d=>{
    const records=grouped.get(d),ranges=records.map(x=>x.rent).filter(Number.isFinite);
    const rentRange=ranges.length?money(Math.min(...ranges))+(ranges.length>1?'–'+money(Math.max(...ranges)):''):'租金待确认';
    const expanded=state.district!=='all'||featuredDistricts.slice(0,4).includes(d);
    return '<details class="district-section"'+(expanded?' open':'')+'><summary class="district-heading"><span class="district-heading-copy"><span class="district-region">'+areaRegion(d)+'</span><strong>'+escapeHtml(d)+'</strong><span class="district-count">'+records.length+' 个'+(state.filters.layout?'户型组':'广告组')+'</span></span><span class="district-rent">'+rentRange+'</span></summary><div class="district-section-actions"><button type="button" class="focus-district" data-district="'+encodeURIComponent(d)+'">只看'+escapeHtml(d)+'</button></div><div class="district-card-grid">'+records.map(card).join('')+'</div></details>';
  }).join('')
}

function render(){
  if(!state.data)return;
  const all=state.data.listings.filter(x=>tier(x)!=='D');
  renderPrices(all);
  const matching=sort(all.filter(passes));
  const grouped=state.filters.layout?sort(layoutGroups(matching)):matching;
  const visible=state.district==='all'?grouped:grouped.filter(x=>x.district===state.district);
  const isReference=false;
  const areaBox=document.querySelector('#districtNavigator');
  if(areaBox)areaBox.hidden=isReference;
  const filtersBox=document.querySelector('#districtFilters');
  if(filtersBox&&!isReference)filtersBox.innerHTML=districtNav(all,grouped);
  const results=document.querySelector('#listings');
  if(results){
    results.classList.toggle('by-district',!isReference);
    results.innerHTML=renderDistrictSections(visible)
  }
  document.querySelector('#empty').hidden=visible.length>0;
  document.querySelector('#resultMeta').textContent=
    (state.district==='all'?'全部地区':state.district)+' · '+visible.length+' '+(state.filters.layout?'户型组':'广告组')+
    ' · 同规格收起 '+(state.data.meta?.grouped_ad_count||0)+' 条广告';
  const scoped=state.district==='all'?all:all.filter(x=>x.district===state.district);
  document.querySelector('#coreCount').textContent=scoped.filter(x=>tier(x)==='A').length;
  document.querySelector('#tradeoffCount').textContent=scoped.filter(x=>tier(x)==='B').length;
  document.querySelector('#watchCount').textContent=scoped.filter(watch).length;
  document.querySelector('#newCount').textContent=scoped.filter(x=>x.is_new||x.price_drop>0).length;
  const label=state.view==='compact'?'紧凑户型':state.view==='core'?'A 核心候选':state.view==='tradeoff'?'B 权衡盘':state.view==='watch'?'重点屋苑':state.view==='new'?'新盘 / 降价':'全部可权衡候选';
  document.querySelector('#resultTitle').textContent=state.district==='all'?label:label+' · '+state.district;
  document.querySelector('#updatedAt').textContent=state.data.meta?.updated_at?'更新 '+date(state.data.meta.updated_at):'等待首次刷新';
  document.querySelector('#refreshStatus').textContent=state.data.meta?.status==='ok'?'监控正常':state.data.meta?.status==='partial'?'部分来源异常':'等待刷新'
}
async function boot(){try{if(typeof window!=='undefined'){const area=new URLSearchParams(window.location.search).get('district');if(area)state.district=area}state.data=await(await fetch(`./data/listings.json?v=${Date.now()}`,{cache:'no-store'})).json()}catch(e){state.data={meta:{status:'pending'},listings:[]}}render()}
document.addEventListener('click',e=>{const pb=e.target.closest('[data-price]');if(pb){state.priceBand=pb.dataset.price;render();return}const area=e.target.closest('[data-district]');if(area){state.district=decodeURIComponent(area.dataset.district);if(typeof window!=='undefined'){const url=new URL(window.location.href);if(state.district==='all')url.searchParams.delete('district');else url.searchParams.set('district',state.district);window.history.replaceState(null,'',url)}render();return}const s=e.target.closest('.seg');if(s){document.querySelectorAll('.seg').forEach(x=>x.classList.remove('active'));s.classList.add('active');state.view=s.dataset.view;render();return}const c=e.target.closest('.chip');if(c){const k=c.dataset.filter;state.filters[k]=!state.filters[k];c.classList.toggle('active',state.filters[k]);render()}});document.querySelector('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});boot();