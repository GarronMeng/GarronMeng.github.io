(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ru(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,r=!1,s=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(g,m=.13,M=0)=>{if(!i||!r)return;const p=i.createOscillator(),h=i.createGain(),C=i.currentTime+M;p.frequency.value=g,h.gain.setValueAtTime(.016,C),h.gain.exponentialRampToValueAtTime(1e-4,C+m),p.connect(h),h.connect(i.destination),p.start(C),p.stop(C+m),p.onended=()=>{p.disconnect(),h.disconnect()}};t.onclick=async()=>{if(r=!r,r){if(i??=new AudioContext,await i.resume(),!l){const g=i.createBuffer(1,i.sampleRate*2,i.sampleRate),m=g.getChannelData(0);for(let p=0;p<m.length;p++)m[p]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=g,l.loop=!0,c=i.createGain(),c.gain.value=.01;const M=i.createBiquadFilter();M.type="lowpass",M.frequency.value=700,l.connect(M),M.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(r)),t.title=r?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const f=e.subscribe(g=>{const m=Date.now();i&&c&&c.gain.setTargetAtTime(g.game?.weather==="rain"?.12:.015,i.currentTime,.5),r&&!document.hidden&&m-s>1800&&((g.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),s=m):g.metrics.cash>o&&(u(1046,.1),s=m)),a=g.game?.arrivals??0,o=g.metrics.cash}),d=()=>{document.hidden?i?.suspend():r&&i?.resume()};document.addEventListener("visibilitychange",d),window.addEventListener("pagehide",()=>{f(),i?.close()},{once:!0})}function xc(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,f)=>{const d="floor-"+l,g="facility-"+l;e.push({id:d,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[g]}),t[g]={id:g,kind:"facility",floorId:d,role:l,name:c,capacity:u,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),f="room-"+u,d=r[((o-2)*3+c)%r.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:d,nightsLeft:d==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,f,d,g],m)=>s.push({id:"public-"+m,name:g?"当班员工":"住客",tier:g?"Staff":"Member",floorId:"floor-"+o,thought:d,color:f,route:[l,c],z:u,staff:!!g}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const ji={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},ai=n=>n.category??(n.type==="suite"?"suite":"standard"),Mc=n=>n.bed??(n.type==="twin"?"twin":"king"),Sc=n=>["suite","premium"].includes(ai(n)),Yt=n=>ai(n)==="suite",Hs=n=>ji[ai(n)].name+" · "+(Mc(n)==="twin"?"双床":"大床"),bc=n=>Object.values(n.entities).filter(e=>e.kind==="room"),ot=n=>bc(n).filter(e=>e.status!=="unbuilt"),yc=n=>ot(n).filter(e=>Yt(e)&&e.status==="available").length,Ec=n=>ot(n).filter(e=>e.status==="occupied").length,ul=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId),Hr=2.12,Vr=7.94,Ht=n=>n.game.day*1440+n.game.minute;function Ur(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Ht(n)+20+Ai(e.id)%75,trail:[],revision:0}}function Ai(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function bn(n,e,t){Ur(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(d=>d.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Ai(e.id+t)%12*.95,c=s?2.8:1.25,u=[],f=(d,g,m,M)=>u.push({x:d,z:g,level:m,phase:M});return f(o.x,Hr,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(Vr,Hr,o.level,"corridor"),f(Vr,.9,o.level,"elevator"),f(Vr,.9,a,"elevator"),f(Vr,Hr,a,"corridor")),f(l,Hr,a,"corridor"),f(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=Ht(n)+60,e.visitUntil=void 0,!0}function Tc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;r.x+=s*u,r.z+=a*u,r.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Ht(n)+45+Ai(e.id+Ht(n))%65,!0)}function Cu(n){for(const e of n.guests)Ur(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Ac(n){n.movement&&n.movement.trail.push({...n.movement.position})}function dl(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const Rr=n=>n.lateHour??(n.tier==="Globalist"?16:14),oi=n=>Rr(n)===16?"4PM":"2PM",ir=n=>Rr(n)===16?14:12,wc=n=>n.late==="honor"?Rr(n)*60:n.late==="deny"||n.late==="pending"?ir(n)*60:660;function Rc(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const Io={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Cc=n=>n.name+":"+n.persona;function yn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Ht(n)+35,e.speech.next=0,Zi(n,e)}function Zi(n,e){if(e.staff)return;const t=Ht(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(m=>m.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[r?.position.phase,a,s,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(m=>m.kind==="room"&&Yt(m)&&m.status==="available").length;let f=[];if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[oi(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+ir(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)f=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)f=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)f=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[Io[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const m=e.experience,M=m?.place==="facility-"+s&&t-m.at<150;M&&m.kind==="shortage"?f=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:M&&m.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+oi(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const m=n.game.operations?.profiles[e.profileId??""];s==="guest"&&m&&m.visits>0&&f.push(m.trust>=2?"这家以后可以常住，下次带朋友来。":m.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const M=n.game.guestMemory?.[Cc(e)];s==="guest"&&M?.visits&&f.push(M.satisfaction<80?"上次住得不太顺，这次再看看。":M.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const d=n.game.dialogueRecent??={};for(const[m,M]of Object.entries(d))t-M>240&&delete d[m];const g=f.filter(m=>!i.recent.some(M=>M.text===m&&t-M.at<180)&&t-(d[m]??-9999)>25);if(g.length){const m=g[Ai(e.id+t)%g.length];e.thought=m,i.recent.push({text:m,at:t}),i.recent=i.recent.slice(-8),d[m]=t}else e.thought="";i.next=t+45}function Cr(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(r=>!r.staff&&!r.departing&&r.floorId===t.floorId&&!r.movement?.steps.length)??n.guests.find(r=>r.staff&&(r.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function lr(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function Bn(n,e,t=1){const i=lr(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)r.id===e&&(r.progress=Math.min(r.goal,r.progress+t))}const Pu=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function Iu(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=Pu[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function Ji(n){const e=ot(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function Pc(n){const e=n.game.development,t=ot(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const Ss={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function Yi(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function Wr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Lu(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=lr(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;if(r.construction)return t.notice="该公区正在施工。",!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;Wr(n,3500*s)&&(r.construction={remaining:120,total:120,targetLevel:s+1},Cr(n,r.id),Bn(n,"upgrade"),Yi(n,r.name+"开始封闭改造：2 小时后升级至 "+(s+1)+" 级。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;Wr(n,4500*s)&&(t.managers[r]++,Yi(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;Wr(n,2200)&&(i.campaignUntil=t.day+2,Yi(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=Ss[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;Wr(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},Yi(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=Pc(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,Yi(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function Du(n){const e=n.game,t=lr(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=Ss[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(d=>d.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),f=Math.round(u*r.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,Bn(n,"revenue",f),Bn(n,"ancillary",f),Bn(n,"activity");for(const d of a.slice(0,u))d.satisfaction=Math.min(100,(d.satisfaction??90)+5),d.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,Yi(n,r.name+"结束："+u+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-r.cost)+"。")}const Ic={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function $n(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function un(n,e,t="部门",i){const r=n.game;r.notice=e,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:t,text:e,target:i})}function Ta(n,e){const t=$n(n),i="profile-"+n.game.nextId++,r=Ai(i),s=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][r%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(r/8)%8],persona:s[r%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function Lc(n,e=n.game.price){const t=n.game,i=t.operations,r=(t.day-1)%7>=5,s=t.positioning==="business"?r?.75:1.3:t.positioning==="resort"?r?1.4:.9:1.1;return Math.max(1,Math.round((3+ot(n).length*.12)*s*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Lo(n){const e=n.game,t=e.operations,i=t.bookings.filter(d=>d.status!=="lost"),r=i.filter(d=>d.status==="confirmed"),s=n.guests.filter(d=>d.roomId&&!d.departing),a=s.filter(d=>(d.checkoutDay??e.day)>e.day).length,o=s.length-a,l=Lc(n),c=ot(n).filter(d=>!d.construction).length,u=Math.min(c,a+r.length+Math.max(0,l-t.walkinArrivals)),f=d=>d.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:s.reduce((d,g)=>d+f(g),0),housekeeping:o+ot(n).filter(d=>d.status==="dirty"||d.status==="cleaning").length,suites:r.filter(d=>t.profiles[d.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(d=>d.segment==="商务").length,resort:i.filter(d=>d.segment==="度假").length,group:i.filter(d=>d.segment==="团队").length,price:e.price}}function Do(n,e=!0){const t=n.game,i=$n(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let r=(t.seed^Math.imul(t.day,2654435761))>>>0;const s=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),a=s();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=ot(n).filter(g=>!g.construction).length,l=o-n.guests.filter(g=>g.roomId&&(g.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(g=>g.visits>0&&!n.guests.some(m=>m.profileId===g.id)),f=new Set;for(let g=0;g<c;g++){let m=u.find(C=>!f.has(C.id)&&s()<.5);m||(m=Ta(n,s())),f.add(m.id);const M=i.event==="expo"&&g<Math.ceil(c*.35)?"团单":s()<.6?"APP":"平台",p=t.positioning==="resort"||(t.day-1)%7>=5&&s()<.6,h={id:"booking-"+t.nextId++,profileId:m.id,source:M,eta:M==="团单"?840:780+Math.floor(s()*330),nights:Rc(p,s(),s()),rate:Math.round(t.price*(M==="团单"?.88:1)),segment:M==="团单"?"团队":p?"度假":"商务",status:"confirmed"};if(g<2&&(h.challenge=m.persona==="auditplus"?"audit":m.persona==="family"?"family":m.tier==="Globalist"?"sua":"quiet"),h.challenge==="sua"){const C=ot(n).find(L=>Yt(L)&&L.status==="available"&&!L.suaBookingId);C?(h.sua=!0,h.roomId=C.id,C.suaBookingId=h.id,C.status="reserved"):h.challenge="quiet"}i.bookings.push(h)}const d=u.find(g=>g.trust>=2&&g.visits>=2);if(d&&l>i.bookings.length){const g=Ta(n,s());g.referredBy=d.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:g.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Lo(n),e&&(t.paused=!0),un(n,`早班准备：${i.bookings.length} 笔确认预订，${Ic[i.event]}。`)}function Uu(n,e){const t=$n(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function Nu(n,e,t){const i=$n(n);let r=t?i.profiles[t.profileId]:void 0;r||(r=Ta(n,Ai(e.id)%100/100)),e.profileId=r.id,e.name=r.name,e.persona=r.persona,e.tier=r.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,e.satisfaction=Math.max(65,Math.min(98,88+r.trust*2))}function Uo(n,e){const t=$n(n),i=t.bookings.find(r=>r.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),un(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const r=n.entities[i.roomId];r?.kind==="room"&&r.suaBookingId===i.id&&(r.suaBookingId=void 0,r.status==="reserved"&&(r.status="available"))}}function Fu(n,e){const t=$n(n),i=t.profiles[e.profileId??""];if(!i)return;const r=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(r?1:-1))),i.spend+=e.spend??0;const s=r?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:s}),i.history=i.history.slice(-8),r?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),un(n,i.name+"："+s,"入住")}function Ou(n,e){const t=n.game,i=$n(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Lo(n),i.briefOpen=!1,t.paused=!1,un(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",un(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const r=n.guests.find(c=>c.id===e.id),s=r?.challenge;if(!r||!s||s.resolved)return!0;if(!r.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=s.kind==="quiet"&&e.value==="quiet"||s.kind==="family"&&e.value==="family"||s.kind==="audit"&&e.value==="inspect"||s.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,s.resolved=!0;let l=a&&(s.kind!=="sua"||!!r.upgrades);if(a&&s.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[r.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&s.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!ot(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&s.kind==="quiet"){const c=n.entities[r.roomId??""];if(c&&n.floors.some(f=>f.construction&&Math.abs(f.number-(n.floors.find(d=>d.id===c.floorId)?.number??0))<=1)){const f=ot(n).find(d=>d.status==="available"&&!d.construction&&!n.floors.some(g=>g.construction&&Math.abs(g.number-(n.floors.find(m=>m.id===d.floorId)?.number??0))<=1));l=!!f,f&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,f.status="occupied",f.guestId=r.id,f.nightsLeft=Math.max(0,(r.checkoutDay??t.day)-t.day),r.roomId=f.id,r.movement?.steps.length||bn(n,r,f.id))}}return r.serviceDone=l,r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(l?8:-8))),s.outcome=l?"需求已兑现":"未解决核心诉求",Bn(n,"resolve"),yn(n,r,l?"recovery":"denied"),un(n,r.name+"："+s.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",r.roomId??"facility-lobby"),!0}return!1}const ni=(n,e,t=!1)=>Math.round(n*(ai(e)==="suite"&&t?1:ji[ai(e)].factor)*(1+((e.level??1)-1)*.1)),Dc=n=>2500*n,yr=n=>n?Math.max(8,24-n*5):30,Aa=n=>n?Math.max(10,35-n*7):40,bs=n=>Math.max(140,260-n*20),wa=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),Uc={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function fl(n,e,t,i="floor-lobby"){const r={id:e,name:Uc[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(r),Ur(n,r),r}function xi(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function Ii(n,e,t,i,r){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:r},bn(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",un(n,e.name+" 已接单。","部门",i),!0)}function Bu(n,e,t){const i=n.game,r=$n(n);for(const a of Object.keys(Uc)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||fl(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const s=ot(n).find(a=>a.timer&&!a.construction&&!xi(n,a.id));if(s){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=fl(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&Ii(n,a,s.status==="maintenance"?"repair":"clean",s.id,s.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(Ur(n,a),Tc(n,a),Ac(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),Bn(n,"service"),r.hkCompleted+=l.kind==="clean"?1:0,un(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(f=>!(f.kind==="supplies"&&f.target===l.target)),r.stockDelivered++,un(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(f=>!f.staff&&!f.roomId&&!f.departing);if(u){const f=r.bookings.find(M=>M.id===u.reservationId)?.roomId,d=ot(n).filter(M=>(M.status==="available"||M.status==="reserved"&&(M.suaBookingId===u.reservationId||!M.suaBookingId&&u.tier==="Globalist"))&&!M.construction),g=d.filter(M=>M.type==="suite"&&M.category!=="premium"),m=f?d.find(M=>M.id===f):u.tier==="Globalist"?g[0]??d[0]:d.find(M=>!(r.suitePolicy==="hold"&&g.length<=1&&g.includes(M)));m&&e({type:"checkin",id:u.id,roomId:m.id})}}Bn(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=Ht(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=ot(n).find(c=>c.status==="dirty"&&!c.construction&&!xi(n,c.id));if(l&&Ii(n,a,"clean",l.id,yr(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=ot(n).find(c=>c.status==="maintenance"&&!c.construction&&!xi(n,c.id));if(l&&n.metrics.cash>=100){Ii(n,a,"repair",l.id,Aa(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!xi(n,l)&&n.metrics.cash>=bs(i.managers.fnb)){Ii(n,a,"stock",l,8)&&t(bs(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){Ii(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&Ht(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&Ii(n,a,"patrol",c.id,10)}}}function ku(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,Cr(n,e.entityIds[0]),un(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),Cr(n,e.id),un(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function Is(n,e){e.staff||(e.persona??=Object.keys(Io)[Ai(e.id)%11],Ur(n,e))}function zu(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function Gu(n,e){const t=n.game.minute,i=t/60,r=Io[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=zu(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function Nc(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function hl(n,e,t){e.waitingFor=t,e.waitSince=Ht(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function pl(n,e,t,i){if(e.lastVisit=t.id,Nc(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:Ht(n)},hl(n,e,t.id),yn(n,e,"full");return}if(t.construction){bn(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock";if(r&&n.game[s]<=0){e.experience={place:t.id,kind:"shortage",at:Ht(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),yn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),hl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:Ht(n)},r&&(n.game[s]=Math.max(0,n.game[s]-(e.persona==="family"?3:1)));const a=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,o=Math.round(a*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));o&&(e.spend=(e.spend??0)+o,i.income(o),i.progress("ancillary",o)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,Zi(n,e)}function ys(n,e){e.departing=!0,e.movement?.steps.length||bn(n,e,"exit")}function Hu(n,e,t,i){Is(n,e);const r=e.movement,s=Ht(n),a=Tc(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&bn(n,e,"exit"),Zi(n,e);return}if(!e.roomId){Zi(n,e);return}if(a&&!e.waitingFor){const o=n.entities[r.destination];o?.kind==="facility"&&pl(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!r.steps.length&&o?.kind==="facility"&&!o.construction&&Nc(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0)&&(o.role!=="club"||n.game.clubStock>0)?pl(n,e,o,i):!r.steps.length&&s-(e.waitSince??s)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),bn(n,e,e.roomId)),Zi(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",yn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+oi(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[r.destination]?.kind==="facility"&&n.entities[r.destination].construction)&&bn(n,e,e.roomId),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)bn(n,e,e.roomId);else{const o=Gu(n,e);let l=t()*o.reduce((u,f)=>u+f.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)bn(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}Zi(n,e)}function Vu(n,e,t){const i=n.game.guestMemory??={},r=Cc(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),yn(n,e,"checkout")}const Ra={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Vs=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,Ca=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Pr(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,ot(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function rn(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function Ze(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function Jt(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function No(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,Bn(n,"revenue",e)}function Fn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const Qt=Bn,Fc=Iu;function Pa(){const n=xc();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:Fc(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=Yt(t)?900:650,e.satisfaction=90,e.segment="商务"}for(const e of ot(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return lr(n),n.guests.forEach(e=>Is(n,e)),Ia(n),Do(n),Ze(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),Fo(n),n}function Ia(n,e){const t=n.game,i=rn(n),r=["陈","林","何","张","周","王","李","赵"][Math.floor(rn(n)*8)]+"先生",s=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&rn(n)<.65,o=Rc(a,rn(n),rn(n)),l={id:"guest-"+t.nextId++,name:r,tier:s,floorId:"floor-lobby",thought:s==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[r]??0)};Nu(n,l,e),Is(n,l),l.goh=l.tier==="Globalist"&&rn(n)<.12,l.sua=!!e?.sua,yn(n,l,"arrival"),n.guests.push(l),t.arrivals++,Ze(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const sn=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function Fo(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function Wu(n,e){e.roomId&&bn(n,e,e.roomId)}function $u(n){const e=n.game,t=ot(n);let i=0,r=0;for(const u of n.guests)if(u.roomId){const f=u.rate??e.price;if(i+=f,u.spend=(u.spend??0)+f,u.source==="平台"){const d=Math.round(f*.15);n.metrics.cash-=d,e.expense+=d}r++}No(n,i),e.nights=r;for(const u of sn(n))Uo(n,u),ys(n,u);const s=380+t.length*65+Object.values(e.managers).reduce((u,f)=>u+f*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Pr(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(r/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:Ji(n).total});const c=lr(n).scores;c.push({day:e.day,value:Ji(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Fn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),Ze(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function Xu(n){const e=n.game;e.day++,e.minute=420,e.nextArrival=450,e.nextEvent=600,e.weather=rn(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=Fc(e.day);for(const t of ot(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=wa(Pr(n)>1.1?750:590,e.level,e.managers.revenue)),Do(n),Ze(n,"部门",`${Ca(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Pr(n)*100)}%。`)}function qu(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>No(n,r),reputation:r=>Fn(n,r),log:(r,s,a)=>Ze(n,r,s,a),progress:(r,s=1)=>Qt(n,r,s)};Cu(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,ku(n),Bu(n,a=>La(n,a),a=>Jt(n,a)),Uu(n,a=>Ia(n,a)),Du(n);const s=ot(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&!a.construction&&!xi(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",Qt(n,"service"),Ze(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));sn(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(Hu(n,a,()=>rn(n),i),Ac(a),a.departing){a.exitAt!==void 0&&Ht(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(Uo(n,a),ys(n,a),t.lost++,t.complaints++,Fn(n,-1),Ze(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=wc(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",Ze(n,"客诉",`${a.name} 的 ${oi(a)} 未确认，按 ${ir(a)}:00 退房。`,o.id),Fn(n,-1)),Fu(n,a),Vu(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,ys(n,a),Ze(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(sn(n).length<8&&Ia(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/Lc(n)*(.7+rn(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(rn(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),Ze(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(rn(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?La(n,{type:"resolve",id:String(a.id),value:"sop"}):!xi(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Fn(n,-2),Ze(n,"客诉",`未及时处理：${a.title}`,a.target))}t.minute>=1440&&$u(n)}Fo(n)}function La(n,e){const t=n.game;if(!t||Ou(n,e)||Lu(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=sn(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===s.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=s.bookedRate??ni(t.price,a,s.tier==="Globalist"),s.upgrades=Yt(a)&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&!Sc(a),s.upgrades?(t.upgrades++,Qt(n,"vip"),Fn(n,1)):s.tier==="Globalist"&&ot(n).some(l=>Yt(l)&&l.status==="available")&&Fn(n,-1);const o=t.operations?.bookings.find(l=>l.id===s.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,Wu(n,s),yn(n,s,s.denied?"denied":"checkin"),Qt(n,"arrivals"),Ze(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=sn(n).find(a=>a.id===e.id);s&&(Uo(n,s),ys(n,s),yn(n,s,"denied"),t.lost++,Ze(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&Jt(n,90)&&(r.status="cleaning",r.timer=30,Ze(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.construction&&!r.timer&&!xi(n,r.id)&&Jt(n,180)?(r.timer=40,Ze(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&Jt(n,200)&&(i.maintenance=100,Ze(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(r?.status!=="unbuilt"||n.floors.find(l=>l.id===r.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[s,a]=String(e.value).split(":");if(!Object.hasOwn(ji,s)||!["king","twin"].includes(a))break;const o=s;if(!Jt(n,ji[o].cost))break;r.category=o,r.bed=a,r.type=o==="suite"||o==="premium"?"suite":r.bed,r.status="available",r.level=1,Cr(n,r.id),Ze(n,"升级",`${r.number} 已设置为 ${ji[o].name} · ${a==="twin"?"双床":"大床"}。`,r.id);break}case"upgrade":r?.status==="available"&&(r.level??1)<5&&Jt(n,Dc(r.level??1))&&(r.construction={remaining:90,total:90,targetLevel:(r.level??1)+1},r.status="maintenance",Cr(n,r.id),Qt(n,"upgrade"),Ze(n,"升级",`${r.number} 封闭装修：90 分钟后升级竣工。`,r.id));break;case"reserve":r?.status==="available"&&Yt(r)&&(r.status="reserved",Ze(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&!r.suaBookingId&&(r.status="available",Ze(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(Ra,s)||t.managers[s])break;Jt(n,3800)&&(t.managers[s]=1,Qt(n,"delegate"),Ze(n,"部门",`${Ra[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}Jt(n,300)&&(t[s]=Math.min(160,t[s]+50),Qt(n,"stock"),Ze(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!Jt(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,Qt(n,"service")),s.kind==="supplies"&&(t.stock+=25),Qt(n,"resolve"),Fn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&Qt(n,"delegate"),Ze(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!Jt(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}dl(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,Ze(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),Qt(n,"late-decision"),Fn(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),yn(n,s,s.late==="honor"?"late-honor":"late-deny"),Ze(n,"入住",`${s.name} 已确认 ${s.late==="honor"?oi(s):ir(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;Jt(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),yn(n,s,"recovery"),Qt(n,"resolve"),Ze(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(Jt(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");dl(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),Ze(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),Ze(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,Ze(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"continue":t.reportOpen&&Xu(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(s.claimed=!0,No(n,s.reward),Ze(n,"收益",`完成「${s.title}」，奖励 ¥${s.reward}。`));break}}Fo(n)}function Da(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))Da(e)}return n}function Yu(n=xc()){let e=Da(structuredClone(n));const t=new Set,i=r=>{e=Da({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);La(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);qu(s,r),i(s)},reset(){i(Pa())}}}const Kn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},Ua={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},Qi=2.55,Ku=[-4.93,0,4.93],kn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Zu=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),nn=(n,e,t="",i="")=>`<button class="game-action" data-action="${e}" data-id="${kn(t)}" data-value="${i}">${n}</button>`,mi=(n,e)=>`<div><small>${n}</small><strong>${e}</strong></div>`;function Ju(n){const e=n.game,t=e.operations,i=Lo(n),r=t.bookings.length,s=(e.day-1)%7>=5,a=t.bookings.filter(l=>l.status==="confirmed").length,o=[["收益经理",e.managers.revenue,i.occupancy>=90?"预计接近满房，广告可能只带来更多拒客。":"仍有空房，比较低价获客和高价利润。"],["前厅经理",e.managers.front,`${i.suites} 位确认预订的 Globalist；已锁 SUA 必须保留。`],["客房经理",e.managers.house,`今天 ${i.housekeeping} 间预计翻房；员工需推车到场，晚退会挤压时间。`],["餐饮经理",e.managers.fnb,`早餐预计 ${i.breakfast} 人、库存 ${e.stock}；Happy Hour 预计 ${i.club} 人、库存 ${e.clubStock}。`],["工程经理",e.managers.engineering,`${ot(n).filter(l=>l.status==="maintenance").length} 间封闭房；施工不接待，维修完成才能出售。`]];return`<h2>Day ${e.day} · 早班晨会</h2><p>${s?"周末":"工作日"} · ${e.positioning==="business"?"商务定位":e.positioning==="resort"?"度假定位":"城市混合"} · ${e.weather==="rain"?"有雨":"晴朗"}</p><blockquote>${Ic[t.event]}</blockquote><div class="brief-grid">${mi("确认预订 / 待到店",r+" / "+a)}${mi("预计 Walk-in",i.walkins+" 位")}${mi("预计晚间入住率",i.occupancy+"%")}${mi("商务 / 度假 / 团队",i.business+" / "+i.resort+" / "+i.group)}${mi("早餐人数 / 库存",i.breakfast+" / "+e.stock)}${mi("HK 翻房 / 标准套需求",i.housekeeping+" / "+i.suites)}</div><details class="manager-card"><summary>经理交班与建议</summary>${o.map(([l,c,u])=>`<p><b>${l} · ${c?"在岗":"待聘任"}</b><br>${u}</p>`).join("")}</details><details class="manager-card" open><summary>今天如何经营</summary><div class="decision-line"><span>Walk-in 挂牌 ¥${e.price}</span>${nn("¥720","price","","720")}${nn("¥850","price","","850")}</div><div class="decision-line"><span>套房：${t.suitePolicy==="hold"?"保留一间给会员":"开放销售"}</span>${nn("留一间","suite-policy","","hold")}${nn("开放卖","suite-policy","","sell")}</div><div class="decision-line"><span>早餐 ${e.stock} 份 / 酒廊 ${e.clubStock} 份</span>${nn("早餐 +50 · ¥300","stock","breakfast")}${nn("酒廊 +50 · ¥300","stock","club")}</div><div class="decision-line"><span>${e.development&&e.development.campaignUntil>=e.day?"广告投放中":"广告未投放"}</span>${nn("三日推广 ¥2,200","campaign")}</div></details><small>确认预订的报价已锁定；调价影响未预订客流。预估有波动，无法接待确认预订需支付 ¥600/单安置费；平台订单每晚收取 15% 佣金。</small><div class="action-row"><button class="game-action" data-open="bookings">查看预订</button><button class="game-action" data-open="history">客史记录</button></div>${t.briefOpen?nn("按当前决策开始营业","brief-start"):""}`}function Qu(n){const e=n.game.operations;return`<h2>今日预订</h2><div class="brief-grid">${["APP","团单","平台"].map(t=>mi(t,e.bookings.filter(i=>i.source===t).length+" 单")).join("")}</div><p>Walk-in 为额外临时到店，今天已到 ${e.walkinArrivals} 位。</p>${e.bookings.map(t=>{const i=e.profiles[t.profileId];return`<details class="manager-card"><summary>${kn(i.name)} · ${t.source} · ${Zu(t.eta)}<small>${{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"安置离店"}[t.status]}</small></summary><p>${kn(i.tier)} · ${t.nights} 晚 · 锁定价 ¥${t.rate}${t.sua?" · SUA 锁套":""}</p><p>${t.challenge?"特别关注："+{quiet:"需要安静房间",sua:"已确认标准套房",family:"早餐与加床需求",audit:"服务标准检查"}[t.challenge]:"常规接待"}</p><p>客史 ${i.visits} 次 · 信任 ${i.trust} · ${kn(i.history.at(-1)?.text??"首次来店")}</p></details>`}).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function ju(n){return`<h2>客史与关系</h2>${Object.values(n.game.operations.profiles).filter(e=>e.visits>0||n.guests.some(t=>t.profileId===e.id)).sort((e,t)=>t.visits-e.visits).map(e=>`<details class="manager-card"><summary>${kn(e.name)} · ${kn(e.tier)}<small>${e.visits} 次入住</small></summary><p>信任 ${e.trust} · 累计消费 ¥${Math.round(e.spend)}${e.referredBy?" · 由熟客介绍":""}</p>${e.history.map(t=>`<p>Day ${t.day} · ${kn(t.text)}</p>`).join("")||"<p>首次入住，等待这次故事。</p>"}</details>`).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function ed(n){return n.guests.filter(e=>e.challenge&&!e.challenge.resolved&&!e.departing).map(e=>{const t=e.challenge.kind,i={quiet:"需要安静，不能被施工吵到",sua:"SUA 标准套房确认是否兑现",family:"早餐与加床需要一次确认",audit:"核查房间与服务流程"};return`<section class="guest-card"><strong>${kn(e.name)} · ${kn(e.tier)}</strong><p>${i[t]}</p><small>匹配安排 ¥180；安静房需要可用房间，家庭服务需 6 份库存，巡检需客房与工程主管且无待修故障；普通欢迎礼 ¥100 不保证解决问题。</small><div class="action-row">${nn({quiet:"落实安静安排",sua:"核对已给标准套",family:"安排家庭服务",audit:"完成巡检"}[t],"guest-choice",e.id,t==="sua"?"inventory":t==="audit"?"inspect":t)}${nn("送欢迎礼","guest-choice",e.id,"gift")}${nn("不作安排","guest-choice",e.id,"decline")}</div></section>`}).join("")}const Mn=n=>"¥"+Math.round(n).toLocaleString("en-US"),Ki=(n,e,t,i)=>`<div class="upgrade-compare"><span>${n}</span><b>${e}${i} → ${t}${i}</b><div><i style="width:${e/Math.max(1,e,t)*100}%"></i><i style="width:${t/Math.max(1,e,t)*100}%"></i></div></div>`;function td(n,e){const t=e.level??1;if(t>=5)return"<p>装修已满级</p>";const i=n.game,r={...e,level:t+1},s=Dc(t),a=ni(i.price,e),o=ni(i.price,r),l=o-a,c=i.reports.at(-1)?.occupancy??100*Object.values(n.entities).filter(d=>d.kind==="room"&&d.status==="occupied").length/Math.max(1,Object.values(n.entities).filter(d=>d.kind==="room").length),u=ni(i.price,r,!0)-ni(i.price,e,!0),f=l*c/100;return`<details class="upgrade-preview"><summary>装修 Lv.${t} → ${t+1} · ${Mn(s)}</summary>${Ki("新客每晚房价",a,o," 元")}${Yt(e)?`<p>会员免费升套价：${Mn(ni(i.price,e,!0))} → ${Mn(ni(i.price,r,!0))}</p>`:""}<p>每售出一晚多收 ${Mn(u)}${u!==l?"–"+Mn(l):""}；约 ${Math.ceil(s/l)}${u!==l?"–"+Math.ceil(s/u):""} 个售出房晚收回装修费。</p><p>按${i.reports.length?"最近一天":"当前"}入住率 ${Math.round(c)}%、${Yt(e)?"普通付费客":"当前挂牌价"}估算：每天多收 ${Mn(f)}${f>0?"，约 "+Math.ceil(s/f)+" 天回本":"，暂无法估算回本天数"}。</p><small>已确认预订和已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`}function nd(n,e,t,i){const r=n.game,s=r.managers[e],a=Math.min(3,s+1),o=s?4500*s:3800;let l="",c="";if(e==="front"){const u=n.entities["facility-lobby"],f=(u.kind==="facility"?u.level??1:1)*10;l=Ki("新到店住客耐心",100+s*50+f,100+a*50+f," 分钟"),c=s?"自动分房速度不变；延长新客等候耐心，降低等待流失。":"启用自动分房与常规诉求处理；无空房时仍需等待。"}return e==="house"&&(l=Ki("每间清洁用时",yr(s),yr(a)," 分钟"),c=s?"增加一位客房员工，每间现场清洁少用 "+(yr(s)-yr(a))+" 分钟；另需实际走路时间。":"自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。"),e==="engineering"&&(l=Ki("常规维修用时",Aa(s),Aa(a)," 分钟"),c=s?"增加一位工程员工，维修费用仍为 ¥100/间；另需到场时间。":"自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。"),e==="fnb"&&(l=Ki("采购单价（每 40 份）",s?bs(s):240,bs(a)," 元"),c=s?"每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。":"库存低于 20 时安排配送，员工到餐台完成补货才入库；与手动采购每份同价。"),e==="revenue"&&(l=Ki("同一需求下自动报价",s?wa(i,r.level,s):r.price,wa(i,r.level,a)," 元"),c="次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。"),`<details class="manager-card"><summary><span>${t}主管 · ${s?"Lv."+s:"未聘任"}</span><small>${s>=3?"已满级":"查看效果 ›"}</small></summary>${s>=3?"<p>已完成全部培训。</p>":`${l}<p>${c}</p><p>投入 ${Mn(o)} · 工资 ${Mn(s*180)} → ${Mn(a*180)}/天</p><button class="game-action" data-action="${s?"train":"hire"}" data-id="${e}">${s?"培训至 Lv."+a:"聘任主管"} · ${Mn(o)}</button>`}</details>`}const et=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Et=n=>"¥"+Math.round(n).toLocaleString("en-US"),Oe=(n,e,t="",i="")=>`<button class="game-action" data-action="${et(e)}" data-id="${et(t)}" data-value="${et(i)}">${et(n)}</button>`;function id(n,e){const t=b=>n.querySelector(b),i=n.querySelector("dialog"),r=t("#sheet-content"),s=t("#sheet-eye");let a="",o="",l="",c="全部",u=()=>{},f=null;t(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',t(".world-caption").textContent="轻点空间 · 处理今天的经营",t(".weather").title="切换日夜预览",t(".property-name small").id="game-time",t(".today-hint").setAttribute("data-open","tasks"),t(".event-strip").removeAttribute("data-focus"),t(".event-strip").setAttribute("data-open","events"),t(".speed-control").insertAdjacentHTML("beforeend",Oe("Ⅱ","pause")),t(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(b=>b.setAttribute("aria-label",b.getAttribute("data-speed")+"倍经营速度"));const d=()=>{a="",o="",e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),i.close(),e.select(null),f?.focus()},g=()=>{if(e.getState().game.reportOpen){e.dispatch({type:"continue"}),a="brief",C();return}e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),d()};let m=!1;const M=(b,T)=>{const v=i.getBoundingClientRect();return b<v.left||b>v.right||T<v.top||T>v.bottom};i.addEventListener("pointerdown",b=>{m=b.target===i&&M(b.clientX,b.clientY)}),i.addEventListener("click",b=>{m&&b.target===i&&M(b.clientX,b.clientY)&&g(),m=!1});const p=(b,T)=>{s.textContent=b,r.innerHTML=T,i.open||(f=document.activeElement,i.showModal())},h=b=>{const T=e.getState(),v=T.entities[b];if(v){if(v.construction||T.floors.find(E=>E.id===v.floorId)?.construction){const E=v.construction??T.floors.find(k=>k.id===v.floorId).construction;p("施工现场",`<h2>${v.kind==="room"?v.number:v.name} · 封闭施工</h2><progress max="${E.total}" value="${E.total-E.remaining}"></progress><p>剩余 ${E.remaining} 游戏分钟，竣工后开放。</p>`);return}if(v.kind==="room"&&v.status==="unbuilt"){p("配置客房 · "+v.number,`<h2>选择房型</h2><p>普通配置已含在楼层造价中；其他房型支付差价。</p><div class="room-options">${Object.entries(ji).map(([E,k])=>`<section><strong>${k.name}</strong><small>新客 ${Et(T.game.price*k.factor)}/晚起 · ${k.cost?Et(k.cost):"已含"}</small><div>${Oe("大床","configure-room",b,E+":king")}${Oe("双床","configure-room",b,E+":twin")}</div></section>`).join("")}</div><small>标准套房可供会员免费升套；尊享套房按付费房价出售。</small>`);return}if(v.kind==="room"){const E=T.guests.find(k=>k.id===v.guestId);p("HYATT PLACE · "+T.floors.find(k=>k.id===v.floorId)?.label,`<h2>${et(v.number)}<span>${Hs(v)} · Lv.${v.level??1}</span></h2><div class="status-chip">${Ua[v.status]}${v.timer?" · 还需 "+v.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${E?et(E.name)+" · "+et(E.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${v.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${Et(E?E.rate??T.game.price:ni(T.game.price,v))}</dd></div></dl>${E?"<p>"+et(E.name)+(E.goh?" · GOH":"")+(E.sua?" · SUA":"")+"</p><blockquote>"+et(E.thought)+"</blockquote>"+(E.serviceDone?"<small>本次住宿已安排专属服务</small>":Oe({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[E.persona??"chill"]+" ¥120","guest-service",E.id))+(E.late==="pending"?Oe("确认 "+oi(E),"late",E.id,"honor")+Oe("协商 "+ir(E)+":00","late",E.id,"deny"):E.late?"<p>退房时间："+Vs(wc(E))+"</p>":""):""}${v.status==="available"?td(T,v):""}<div class="action-row">${v.status==="dirty"?Oe("安排清洁 ¥90","clean",b):""}${v.status==="maintenance"&&!v.timer?Oe("安排维修 ¥180","repair",b):""}${v.status==="available"?Oe("分配给住客","front")+((v.level??1)<5?Oe("装修 "+Et(2500*(v.level??1)),"upgrade",b):"")+(Yt(v)?Oe("预留给会员","reserve",b):""):""}${v.status==="reserved"&&!v.suaBookingId?Oe("释放预留","release",b):""}</div>`)}else p("HYATT PLACE · 公共空间",`<h2>${et(v.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${v.usage} / ${v.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(v.maintenance)}%</dd></div>${["breakfast","club"].includes(v.role)?`<div><dt>库存</dt><dd>${v.role==="club"?T.game.clubStock:T.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${v.role==="lobby"?Oe("办理入住","front"):""}${v.role==="breakfast"?Oe("补充早餐 ¥300","stock","breakfast"):v.role==="club"?Oe("补充酒廊 ¥300","stock","club"):""}${Oe("维护设施 ¥200","repair",v.id)}${(v.level??1)<5?Oe("公区升级 "+Et(3500*(v.level??1)),"invest",v.id):"已达 Lv.5"}</div>`);a&&T.game.notice&&r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${et(T.game.notice)}</p>`)}},C=()=>{const b=e.getState(),T=b.game;if(a==="entity"){h(o);return}if(a==="brief"){p("MORNING BRIEF",Ju(b));return}if(a==="bookings"){p("RESERVATIONS",Qu(b));return}if(a==="history"){p("GUEST HISTORY",ju(b));return}if(a==="front")p("FRONT OFFICE",`<h2>前台 · ${sn(b).length} 位等候</h2><p>会员升套使用普通房价；房费日结入账。面板打开时经营暂停。</p>${sn(b).map(v=>{const E=ot(b).filter(k=>k.status==="available"||k.status==="reserved"&&v.tier==="Globalist"&&(!k.suaBookingId||k.suaBookingId===v.reservationId)).sort((k,X)=>v.tier==="Globalist"?Number(Yt(X))-Number(Yt(k)):+(k.type==="suite")-+(X.type==="suite"));return`<section class="guest-card"><strong>${et(v.name)} · ${et(v.tier)}</strong><blockquote>${et(v.thought)}</blockquote><p>${et(v.segment)}${v.goh?" · GOH":""}${v.sua?" · SUA":""} · ${v.stayLength} 晚 · 等候耐心 ${v.patience} 分钟</p>${E.length?`<select aria-label="为${et(v.name)}选择房间" id="assign-${et(v.id)}">${E.map(k=>`<option value="${k.id}">${k.number} · ${Hs(k)}${v.tier==="Globalist"&&Yt(k)?" · 免费升套":""}</option>`).join("")}</select>${Oe("确认入住","checkin",v.id)}`:"<p>暂无可用房间：先清洁脏房或扩建。</p>"}${Oe("婉拒","reject",v.id)}</section>`}).join("")||'<p class="empty">暂时没有排队住客，关上面板继续经营。</p>'}`);else if(a==="hotel")p("YOUR HOTEL",`<h2>酒店 · ${ot(b).length} 间客房</h2><p>向上扩建客房，也会吸引更多客流。</p>${Oe("加高一层 · 3 个空位 "+Et(1e4+5e3*(b.floors.filter(v=>v.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div><details class="manager-card"><summary>楼层导航</summary><div class="floor-list">${[...b.floors].reverse().map(v=>`<button data-floor="${v.id}"><b>${v.label}</b><span>${v.name}</span><small>定位楼层 ›</small></button>`).join("")}</div></details><label>客房楼层 <select id="hotel-floor-select">${b.floors.filter(v=>v.role==="guest").map(v=>`<option value="${v.id}" ${(l||b.floors.find(E=>E.role==="guest")?.id)===v.id?"selected":""}>${v.label}</option>`).join("")}</select></label><div class="room-grid">${bc(b).filter(v=>v.floorId===(l||b.floors.find(E=>E.role==="guest")?.id)).map(v=>`<button data-entity="${v.id}">${v.status==="unbuilt"?"＋":v.number}<small>${v.status==="unbuilt"?v.number+" · 设置房型":Hs(v)+" · "+Ua[v.status]}</small></button>`).join("")}</div>`);else if(a==="operations")p("OPERATIONS",`<h2>经营与授权</h2><div class="action-row"><button class="game-action" data-open="brief">晨会与预测</button><button class="game-action" data-open="bookings">今日预订</button><button class="game-action" data-open="history">客史</button></div><button class="primary" data-open="development">投资、营销与主题活动 ›</button><p>${Ca(T.day)} · 预计需求 ${Math.round(Pr(b)*100)}% · ${T.weather==="rain"?"有雨":"晴朗"}</p><div class="action-row">${Oe("早餐 +50 ¥300","stock","breakfast")}${Oe("酒廊 +50 ¥300","stock","club")}</div><p>库存：早餐 ${T.stock} · 酒廊 ${T.clubStock}</p><details class="manager-card"><summary>房价与定位 · ¥${T.price}</summary><label>新客挂牌价 <input id="price-input" type="number" min="350" max="1800" step="50" value="${T.price}"></label>${Oe("调整价格","price")}<label>经营定位 <select id="position-input"><option value="business" ${T.positioning==="business"?"selected":""}>商务 / 机场</option><option value="resort" ${T.positioning==="resort"?"selected":""}>休闲 / 度假</option><option value="urban" ${T.positioning==="urban"?"selected":""}>城市混合</option></select></label>${Oe("调整定位","position")}</details><h3>部门负责人</h3><p>展开部门查看升级效果与工资变化。</p>${Object.entries(Ra).map(([v,E])=>nd(b,v,E,Pr(b)>1.1?750:590)).join("")}<div class="action-row">${Oe("最近日结","report")}${Oe("导出存档","export")}${Oe("新开存档","reset")}</div><p class="phase-note">自动保存于当前浏览器。旧版存档不受影响。非官方粉丝游戏，与 Hyatt 无隶属关系。</p>`);else if(a==="development"){const v=T.development;p("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级增加基础房价的 10%，装修前可查看回本预估。</p><h3>三日营销</h3><p>客流 +35%；推广持续到第 ${v?.campaignUntil??0} 天。满房时请谨慎投放。</p>${v&&v.campaignUntil>=T.day?"<small>推广进行中</small>":Oe("投放推广 ¥2,200","campaign")}<details class="manager-card"><summary>今日主题活动</summary><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${v?.activity?`<blockquote>正在筹备：${Ss[v.activity.id].name} · 还需 ${Math.max(0,v.activity.ends-T.day*1440-T.minute)} 分钟</blockquote>`:""}${Object.entries(Ss).map(([E,k])=>`<section class="guest-card"><strong>${k.name}</strong><p>${k.description} 每人消费 ¥${k.fee} 起。</p>${v?.activityDay===T.day?"<small>今日档期已使用</small>":Oe("安排 "+Et(k.cost),"activity",E)}</section>`).join("")}</details><details class="manager-card"><summary>公共空间投资</summary>${b.entities["facility-spa"]?"":Oe("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(b.entities).filter(E=>E.kind==="facility").map(E=>`<section class="guest-card"><strong>${et(E.name)} · Lv.${E.level??1}</strong><p>容量 ${E.capacity} 人 · 维护 ${Math.round(E.maintenance)}%</p>${(E.level??1)<5?Oe("升级 "+Et(3500*(E.level??1)),"invest",E.id):"<small>满级</small>"}</section>`).join("")}</details><button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(a==="score"){const v=Ji(b);p("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${v.total}%"><strong>${v.total}<small>/ 100</small></strong></div><div><strong>${v.total>=90?"卓越酒店":v.total>=75?"稳健经营":v.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${v.parts.map(E=>`<div class="score-part"><span>${E.name}</span><b>${E.value}</b><progress max="100" value="${E.value}" aria-label="${E.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><h3>最近 7 天评分</h3><div class="revenue-trend">${(T.development?.scores??[]).slice(-7).map(E=>`<div><small>${E.value} 分</small><i style="height:${E.value*.65}px"></i><small>D${E.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(a==="tasks")p("MISSIONS",`<h2>今日任务</h2><p>每天轮换经营目标，完成后及时领奖。长期里程碑不会随交班重置。</p>${T.tasks.map(v=>`<section class="guest-card"><strong>${et(v.title)}</strong><p>${v.progress} / ${v.goal} · 奖励 ${Et(v.reward)}</p><progress max="${v.goal}" value="${v.progress}" aria-label="${et(v.title)}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Oe("领取奖励","claim",v.id):`<button class="game-action" data-open="${v.target}">去完成 ›</button>`}</section>`).join("")}<h3>长期里程碑</h3><p>持续接待住客、举办活动和建设酒店，解锁长期奖励。</p>${Pc(b).map(v=>`<section class="guest-card"><strong>${v.title}</strong><p>${Math.min(v.progress,v.goal)} / ${v.goal} · ${Et(v.reward)}</p><progress max="${v.goal}" value="${Math.min(v.progress,v.goal)}" aria-label="${v.title}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Oe("领取里程碑奖励","claim-career",v.id):"<small>持续经营以解锁</small>"}</section>`).join("")}`);else if(a==="events")p("DUTY MANAGER",`<h2>待办 · ${b.guests.filter(v=>v.challenge&&!v.challenge.resolved&&!v.departing).length+T.events.length+b.guests.filter(v=>v.late==="pending").length}</h2>${ed(b)}${b.guests.filter(v=>v.late==="pending"&&!v.departing).map(v=>`<section class="guest-card"><strong>${et(v.name)} · ${et(v.tier)} · ${oi(v)} 请求</strong><p>希望${v.checkoutDay===T.day?"今天":"明天"} ${Rr(v)}:00 退房。比 11:00 常规退房晚 ${Rr(v)-11} 小时，之后才可翻房。</p><p>同意：住客体验 +4、口碑 +1、业主 -1；协商：体验 -3、口碑 -1、业主 +1。</p>${Oe("同意 "+oi(v),"late",v.id,"honor")}${Oe("协商 "+ir(v)+":00","late",v.id,"deny")}</section>`).join("")}${T.events.map(v=>`<section class="guest-card"><strong>${et(v.title)}</strong><p>剩余 ${Math.max(0,v.expires-T.day*1440-T.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${v.target}">定位现场</button>${Oe("亲自协调 ¥350","resolve",String(v.id),"gm")}${Oe("交给主管 ¥150","resolve",String(v.id),"sop")}</div></section>`).join("")||'<p class="empty">目前没有异常。部门成熟以后，常规问题会自动处理。</p>'}${sn(b).length?`<button class="primary" data-open="front">接待 ${sn(b).length} 位排队住客</button>`:""}`);else if(a==="log")p("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(v=>`<button class="${v===c?"active":""}" data-filter="${v}">${v}</button>`).join("")}</div><div class="log-list">${[...T.logs].reverse().filter(v=>c==="全部"||v.category===c).map(v=>`<article><small>Day ${v.day} ${Vs(v.minute)} · ${v.category}</small><p>${et(v.text)}</p>${v.target?`<button data-entity="${et(v.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(a==="report"){const v=T.reports.at(-1);p("DAILY REVIEW",v?`<h2>Day ${v.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${v.score??Ji(b).total} / 100 ›</button><dl><div><dt>收入 / 成本</dt><dd>${Et(v.revenue)} / ${Et(v.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${Et(v.adr)} / ${Et(v.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${v.occupancy}% / ${v.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${v.upgrades} / ${v.complaints}</dd></div></dl><h3>晨会预测对账</h3><p>预计晚间入住率 ${v.forecastOccupancy??"—"}% → 实际 ${v.actualEveningOccupancy??"—"}% · 未兑现预订 ${v.bookingsLost??0} 单</p><h3>最近 7 天收入</h3><div class="revenue-trend">${T.reports.slice(-7).map(E=>`<div><small>${Et(E.revenue)}</small><i style="height:${Math.max(3,Math.round(E.revenue/Math.max(1,...T.reports.slice(-7).map(k=>k.revenue))*65))}px"></i><small>D${E.day}</small></div>`).join("")}</div><blockquote>${et(v.recommendation)}</blockquote>${T.reportOpen?Oe("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("change",b=>{const T=b.target;T.id==="hotel-floor-select"&&(l=T.value,C())}),n.addEventListener("click",b=>{const T=b.target.closest("button");if(!T)return;if(T.matches(".close-sheet")){g();return}if(T.dataset.open){a=T.dataset.open,C();return}if(T.dataset.speed){e.setSpeed(Number(T.dataset.speed));return}if(T.dataset.entity){o=T.dataset.entity;const X=e.getState().entities[o];X&&u(X.floorId),a="entity",e.select(o),C();return}if(T.dataset.floor){const X=T.dataset.floor;d(),e.focusFloor(X),u(X);return}if(T.dataset.filter){c=T.dataset.filter,C();return}if(T.matches(".weather")){const X=["dusk","night","day"];e.setAtmosphere(X[(X.indexOf(e.getState().atmosphere)+1)%3]);return}const v=T.dataset.action;if(!v)return;if(["front","report"].includes(v)){a=v,C();return}if(v==="reset"){document.dispatchEvent(new Event("new-game"));return}if(v==="export"){const X=document.createElement("a");X.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),X.download="jinwan-v8-save.json",X.click(),setTimeout(()=>URL.revokeObjectURL(X.href),500);return}const E={type:v,id:T.dataset.id,value:T.dataset.value};v==="checkin"&&(E.roomId=n.querySelector("#assign-"+T.dataset.id)?.value),v==="price"&&(E.value=T.dataset.value||Number(n.querySelector("#price-input")?.value)),v==="position"&&(E.value=n.querySelector("#position-input")?.value);const k=e.getState().game.upgradeEffect?.id;if(e.dispatch(E),e.getState().game.upgradeEffect?.id!==k){const X=e.getState().game.upgradeEffect.entityId;d(),u(e.getState().entities[X].floorId);return}v==="brief-start"?d():v==="continue"?(a="brief",C()):a&&(C(),r.querySelector(".action-feedback")||r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${et(e.getState().game.notice)}</p>`))}),i.addEventListener("cancel",b=>{b.preventDefault(),g()});let L=null,y="",P="",R=0,I=0;const x=()=>{const b=e.getState(),T=b.game;t(".score-button").innerHTML=`<i style="--score:${Ji(b).total}%"></i> ${Ji(b).total} 分 ›`,t("#cash").textContent=Et(b.metrics.cash),t("#reputation").textContent=String(b.metrics.reputation),t("#owner").textContent=String(b.metrics.owner),t("#suite-count").textContent=yc(b)+" 间",t("#game-time").textContent=`${Ca(T.day)} · Day ${T.day} ${Vs(T.minute)}${T.paused?" · 暂停":""}`,t(".today-hint span:nth-child(2)").textContent=T.tasks.find(E=>!E.claimed)?.title??"今日任务全部完成",t("#task-count").textContent=T.tasks.filter(E=>E.claimed).length+"/"+T.tasks.length,t("#occupancy").textContent=`${Ec(b)}/${ot(b).length} 在住 · 收入 ${Et(T.revenue)}`,t(".event-strip span").textContent=(b.guests.some(E=>E.challenge&&!E.challenge.resolved&&!E.departing)?"特别住客需要你的判断":void 0)??(b.guests.some(E=>E.late==="pending"&&!E.departing)?"会员晚退请求待你确认":void 0)??T.events[0]?.title??(sn(b).length?`${sn(b).length} 位住客等待办理入住`:"酒店运营平稳"),t(".event-strip b").textContent=T.events.length||b.guests.some(E=>(E.late==="pending"||E.challenge&&!E.challenge.resolved)&&!E.departing)?"处理 ›":"前台 ›",t(".event-strip").setAttribute("data-open",T.events.length||b.guests.some(E=>(E.late==="pending"||E.challenge&&!E.challenge.resolved)&&!E.departing)?"events":"front"),t(".review-strip span").textContent=T.notice,t(".weather span").textContent=T.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(E=>{E.classList.toggle("active",Number(E.dataset.speed)===b.speed),E.setAttribute("aria-pressed",String(Number(E.dataset.speed)===b.speed))});const v=b.floors.map(E=>E.id).join(",");if(y!==v&&(y=v,t(".floor-rail").innerHTML=[...b.floors].reverse().map(E=>`<button data-floor="${E.id}" aria-label="前往${E.label} ${E.name}">${E.label}</button>`).join("")),b.selectedId&&b.selectedId!==L&&(o=b.selectedId,a="entity",C()),L=b.selectedId,T.operations?.briefOpen&&I!==T.day&&(I=T.day,a="brief",C()),T.reportOpen&&R!==T.day&&(R=T.day,a="report",C()),P!==T.notice&&(P=T.notice,i.open)){let E=r.querySelector(".action-feedback");E||(E=document.createElement("p"),E.className="action-feedback",r.append(E)),E.textContent=T.notice}};return e.subscribe(x),x(),{stage:t(".world-stage"),setFocusHandler:b=>{u=b},showError:b=>p("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${et(b)}</p>`)}}function rd(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return id(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(m,M)=>{r.textContent=m,i.innerHTML=M,t.open||(a=document.activeElement,t.showModal())},u=m=>{const M=e.getState(),p=M.entities[m];if(!p)return;const h=ul(M,m);if(p.kind==="room"){const C=M.guests.find(L=>L.id===p.guestId);c("HYATT PLACE · "+h.label,`<h2>${p.number}<span>${p.type==="suite"?"开放式套房":p.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${p.status}">${Ua[p.status]}</div><dl><div><dt>住客</dt><dd>${C?C.name+" · "+C.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${p.nightsLeft?p.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${h.label} · ${h.name}</dd></div></dl>${C?"<blockquote>“"+C.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${h.id}">回到 ${p.number} 的楼层</button>`)}else{const C={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+h.label,`<h2>${p.name}</h2><p>${C[p.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${p.usage} / ${p.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${p.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${p.quality} / ${p.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${h.id}">回到${p.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const m=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...m.floors].reverse().map(M=>`<button data-return="${M.id}"><b>${M.label}</b><span>${M.name}</span><small>${M.entityIds.length>1?M.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const m=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([M,p,h])=>`<button data-focus="${M}"><b>${m.visited.includes(M)?"✓":"○"}</b><span>${p}<small>${h}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const m=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(m.visited.length?[...m.visited].reverse().map(M=>{const p=m.entities[M];return`<button data-focus="${M}"><span>${p.kind==="room"?p.number+" 房间":p.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",m=>{const M=m.target.closest("button");if(M){if(M.matches(".close-sheet")&&l(),M.dataset.open&&(e.select(null),s=M.dataset.open,f[s]?.()),M.dataset.speed&&e.setSpeed(Number(M.dataset.speed)),M.dataset.return){const p=M.dataset.return;l(),e.focusFloor(p),o(p)}if(M.dataset.focus){const p=M.dataset.focus,h=ul(e.getState(),p);l(),h&&(e.focusFloor(h.id),o(h.id)),e.select(p)}if(M.dataset.floor&&(e.focusFloor(M.dataset.floor),o(M.dataset.floor)),M.dataset.atmosphere&&(e.setAtmosphere(M.dataset.atmosphere),l()),M.matches(".weather")){const p=["dusk","night","day"];e.setAtmosphere(p[(p.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",m=>{m.preventDefault(),l()}),t.addEventListener("click",m=>{if(m.target===t){const M=t.getBoundingClientRect();(m.clientX<M.left||m.clientX>M.right||m.clientY<M.top||m.clientY>M.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(m=>`<button data-floor="${m.id}" aria-label="前往${m.label} ${m.name}">${m.label}</button>`).join("");let d=null;const g=m=>{n.querySelector("#cash").textContent="¥"+m.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(m.metrics.reputation),n.querySelector("#owner").textContent=String(m.metrics.owner),n.querySelector("#suite-count").textContent=yc(m)+" 间",n.querySelector("#occupancy").textContent=`${ot(m).length} 间客房 · ${Ec(m)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(M=>m.visited.includes(M)).length+"/3",n.querySelectorAll("[data-speed]").forEach(M=>{M.classList.toggle("active",Number(M.dataset.speed)===m.speed),M.setAttribute("aria-pressed",String(Number(M.dataset.speed)===m.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[m.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[m.atmosphere],n.querySelectorAll("[data-floor]").forEach(M=>M.classList.toggle("active",M.dataset.floor===m.focusedFloorId)),m.selectedId&&m.selectedId!==d&&(s="entity",u(m.selectedId)),d=m.selectedId};return e.subscribe(g),g(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:m=>{o=m},showError:m=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+m+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oo="185",sd=0,ml=1,ad=2,ms=1,Oc=2,Er=3,li=0,Vt=1,Nn=2,zn=0,er=1,gl=2,_l=3,vl=4,od=5,_i=100,ld=101,cd=102,ud=103,dd=104,fd=200,hd=201,pd=202,md=203,Na=204,Fa=205,gd=206,_d=207,vd=208,xd=209,Md=210,Sd=211,bd=212,yd=213,Ed=214,Oa=0,Ba=1,ka=2,rr=3,za=4,Ga=5,Ha=6,Va=7,Bc=0,Td=1,Ad=2,Tn=0,kc=1,zc=2,Gc=3,Bo=4,Hc=5,Vc=6,Wc=7,$c=300,Ei=301,sr=302,Ws=303,$s=304,Ls=306,Es=1e3,On=1001,Wa=1002,Rt=1003,wd=1004,$r=1005,Dt=1006,Xs=1007,Mi=1008,qt=1009,Xc=1010,qc=1011,Ir=1012,ko=1013,wn=1014,ln=1015,Hn=1016,zo=1017,Go=1018,Lr=1020,Yc=35902,Kc=35899,Zc=1021,Jc=1022,cn=1023,Vn=1026,Si=1027,Ho=1028,Vo=1029,Ti=1030,Wo=1031,$o=1033,gs=33776,_s=33777,vs=33778,xs=33779,$a=35840,Xa=35841,qa=35842,Ya=35843,Ka=36196,Za=37492,Ja=37496,Qa=37488,ja=37489,Ts=37490,eo=37491,to=37808,no=37809,io=37810,ro=37811,so=37812,ao=37813,oo=37814,lo=37815,co=37816,uo=37817,fo=37818,ho=37819,po=37820,mo=37821,go=36492,_o=36494,vo=36495,xo=36283,Mo=36284,As=36285,So=36286,Rd=3200,bo=0,Cd=1,ri="",Gt="srgb",ws="srgb-linear",Rs="linear",Qe="srgb",Li=7680,xl=519,Pd=512,Id=513,Ld=514,Xo=515,Dd=516,Ud=517,qo=518,Nd=519,Ml=35044,Sl="300 es",En=2e3,Dr=2001;function Fd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Cs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Od(){const n=Cs("canvas");return n.style.display="block",n}const bl={};function yl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Qc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=Qc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ve(...n){n=Qc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function tr(...n){const e=n.join(" ");e in bl||(bl[e]=!0,Ce(...n))}function Bd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const kd={[Oa]:Ba,[ka]:Ha,[za]:Va,[rr]:Ga,[Ba]:Oa,[Ha]:ka,[Va]:za,[Ga]:rr};class wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qs=Math.PI/180,yo=180/Math.PI;function Nr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function He(n,e,t){return Math.max(e,Math.min(t,n))}function zd(n,e){return(n%e+e)%e}function Ys(n,e,t){return(1-t)*n+t*e}function hr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class ze{static{ze.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],g=s[a+1],m=s[a+2],M=s[a+3];if(f!==M||l!==d||c!==g||u!==m){let p=l*d+c*g+u*m+f*M;p<0&&(d=-d,g=-g,m=-m,M=-M,p=-p);let h=1-o;if(p<.9995){const C=Math.acos(p),L=Math.sin(C);h=Math.sin(h*C)/L,o=Math.sin(o*C)/L,l=l*h+d*o,c=c*h+g*o,u=u*h+m*o,f=f*h+M*o}else{l=l*h+d*o,c=c*h+g*o,u=u*h+m*o,f=f*h+M*o;const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],g=s[a+2],m=s[a+3];return e[t]=o*m+u*f+l*g-c*d,e[t+1]=l*m+u*d+c*f-o*g,e[t+2]=c*m+u*g+o*d-l*f,e[t+3]=u*m-o*f-l*d-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),g=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*g*m,this._y=c*g*f-d*u*m,this._z=c*u*m+d*g*f,this._w=c*u*f-d*g*m;break;case"YXZ":this._x=d*u*f+c*g*m,this._y=c*g*f-d*u*m,this._z=c*u*m-d*g*f,this._w=c*u*f+d*g*m;break;case"ZXY":this._x=d*u*f-c*g*m,this._y=c*g*f+d*u*m,this._z=c*u*m+d*g*f,this._w=c*u*f-d*g*m;break;case"ZYX":this._x=d*u*f-c*g*m,this._y=c*g*f+d*u*m,this._z=c*u*m-d*g*f,this._w=c*u*f+d*g*m;break;case"YZX":this._x=d*u*f+c*g*m,this._y=c*g*f+d*u*m,this._z=c*u*m-d*g*f,this._w=c*u*f-d*g*m;break;case"XZY":this._x=d*u*f-c*g*m,this._y=c*g*f-d*u*m,this._z=c*u*m+d*g*f,this._w=c*u*f+d*g*m;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-l)*g,this._y=(s-c)*g,this._z=(a-r)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(u-l)/g,this._x=.25*g,this._y=(r+a)/g,this._z=(s+c)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(s-c)/g,this._x=(r+a)/g,this._y=.25*g,this._z=(l+u)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(a-r)/g,this._x=(s+c)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{static{B.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(El.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(El.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ks.copy(this).projectOnVector(e),this.sub(Ks)}reflect(e){return this.sub(Ks.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new B,El=new cr;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],g=i[5],m=i[8],M=r[0],p=r[3],h=r[6],C=r[1],L=r[4],y=r[7],P=r[2],R=r[5],I=r[8];return s[0]=a*M+o*C+l*P,s[3]=a*p+o*L+l*R,s[6]=a*h+o*y+l*I,s[1]=c*M+u*C+f*P,s[4]=c*p+u*L+f*R,s[7]=c*h+u*y+f*I,s[2]=d*M+g*C+m*P,s[5]=d*p+g*L+m*R,s[8]=d*h+g*y+m*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,g=c*s-a*l,m=t*f+i*d+r*g;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(r*c-u*i)*M,e[2]=(o*i-r*a)*M,e[3]=d*M,e[4]=(u*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=g*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return tr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Zs.makeScale(e,t)),this}rotate(e){return tr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Zs.makeRotation(-e)),this}translate(e,t){return tr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Zs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zs=new Ie,Tl=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Al=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gd(){const n={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Qe&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(r.r=nr(r.r),r.g=nr(r.g),r.b=nr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ri?Rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return tr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return tr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ws]:{primaries:e,whitePoint:i,transfer:Rs,toXYZ:Tl,fromXYZ:Al,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:Tl,fromXYZ:Al,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),n}const Ge=Gd();function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function nr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Di;class Hd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Di===void 0&&(Di=Cs("canvas")),Di.width=e.width,Di.height=e.height;const r=Di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Gn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gn(t[i]/255)*255):t[i]=Gn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vd=0;class Yo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Nr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Js(r[a].image)):s.push(Js(r[a]))}else s=Js(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Js(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Hd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let Wd=0;const Qs=new B;class Ot extends wi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=On,r=On,s=Dt,a=Mi,o=cn,l=qt,c=Ot.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=Nr(),this.name="",this.source=new Yo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qs).x}get height(){return this.source.getSize(Qs).y}get depth(){return this.source.getSize(Qs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Es:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case Wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Es:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case Wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=$c;Ot.DEFAULT_ANISOTROPY=1;class lt{static{lt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],g=l[5],m=l[9],M=l[2],p=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-M)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+M)<.1&&Math.abs(m+p)<.1&&Math.abs(c+g+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const L=(c+1)/2,y=(g+1)/2,P=(h+1)/2,R=(u+d)/4,I=(f+M)/4,x=(m+p)/4;return L>y&&L>P?L<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(L),r=R/i,s=I/i):y>P?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=R/r,s=x/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=I/s,r=x/s),this.set(i,r,s,t),this}let C=Math.sqrt((p-m)*(p-m)+(f-M)*(f-M)+(d-u)*(d-u));return Math.abs(C)<.001&&(C=1),this.x=(p-m)/C,this.y=(f-M)/C,this.z=(d-u)/C,this.w=Math.acos((c+g+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $d extends wi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ot(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Yo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class An extends $d{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class jc extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xd extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rt{static{rt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,d,g,m,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,g,m,M,p)}set(e,t,i,r,s,a,o,l,c,u,f,d,g,m,M,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=g,h[7]=m,h[11]=M,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),a=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,g=a*f,m=o*u,M=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=g+m*c,t[5]=d-M*c,t[9]=-o*l,t[2]=M-d*c,t[6]=m+g*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,g=l*f,m=c*u,M=c*f;t[0]=d+M*o,t[4]=m*o-g,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=g*o-m,t[6]=M+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,g=l*f,m=c*u,M=c*f;t[0]=d-M*o,t[4]=-a*f,t[8]=m+g*o,t[1]=g+m*o,t[5]=a*u,t[9]=M-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,g=a*f,m=o*u,M=o*f;t[0]=l*u,t[4]=m*c-g,t[8]=d*c+M,t[1]=l*f,t[5]=M*c+d,t[9]=g*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,g=a*c,m=o*l,M=o*c;t[0]=l*u,t[4]=M-d*f,t[8]=m*f+g,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=g*f+m,t[10]=d-M*f}else if(e.order==="XZY"){const d=a*l,g=a*c,m=o*l,M=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+M,t[5]=a*u,t[9]=g*f-m,t[2]=m*f-g,t[6]=o*u,t[10]=M*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qd,e,Yd)}lookAt(e,t,i){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Zn.crossVectors(i,$t),Zn.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Zn.crossVectors(i,$t)),Zn.normalize(),Xr.crossVectors($t,Zn),r[0]=Zn.x,r[4]=Xr.x,r[8]=$t.x,r[1]=Zn.y,r[5]=Xr.y,r[9]=$t.y,r[2]=Zn.z,r[6]=Xr.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],g=i[13],m=i[2],M=i[6],p=i[10],h=i[14],C=i[3],L=i[7],y=i[11],P=i[15],R=r[0],I=r[4],x=r[8],b=r[12],T=r[1],v=r[5],E=r[9],k=r[13],X=r[2],z=r[6],K=r[10],W=r[14],j=r[3],te=r[7],fe=r[11],ge=r[15];return s[0]=a*R+o*T+l*X+c*j,s[4]=a*I+o*v+l*z+c*te,s[8]=a*x+o*E+l*K+c*fe,s[12]=a*b+o*k+l*W+c*ge,s[1]=u*R+f*T+d*X+g*j,s[5]=u*I+f*v+d*z+g*te,s[9]=u*x+f*E+d*K+g*fe,s[13]=u*b+f*k+d*W+g*ge,s[2]=m*R+M*T+p*X+h*j,s[6]=m*I+M*v+p*z+h*te,s[10]=m*x+M*E+p*K+h*fe,s[14]=m*b+M*k+p*W+h*ge,s[3]=C*R+L*T+y*X+P*j,s[7]=C*I+L*v+y*z+P*te,s[11]=C*x+L*E+y*K+P*fe,s[15]=C*b+L*k+y*W+P*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],g=e[14],m=e[3],M=e[7],p=e[11],h=e[15],C=l*g-c*d,L=o*g-c*f,y=o*d-l*f,P=a*g-c*u,R=a*d-l*u,I=a*f-o*u;return t*(M*C-p*L+h*y)-i*(m*C-p*P+h*R)+r*(m*L-M*P+h*I)-s*(m*y-M*R+p*I)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],g=e[11],m=e[12],M=e[13],p=e[14],h=e[15],C=t*o-i*a,L=t*l-r*a,y=t*c-s*a,P=i*l-r*o,R=i*c-s*o,I=r*c-s*l,x=u*M-f*m,b=u*p-d*m,T=u*h-g*m,v=f*p-d*M,E=f*h-g*M,k=d*h-g*p,X=C*k-L*E+y*v+P*T-R*b+I*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/X;return e[0]=(o*k-l*E+c*v)*z,e[1]=(r*E-i*k-s*v)*z,e[2]=(M*I-p*R+h*P)*z,e[3]=(d*R-f*I-g*P)*z,e[4]=(l*T-a*k-c*b)*z,e[5]=(t*k-r*T+s*b)*z,e[6]=(p*y-m*I-h*L)*z,e[7]=(u*I-d*y+g*L)*z,e[8]=(a*E-o*T+c*x)*z,e[9]=(i*T-t*E-s*x)*z,e[10]=(m*R-M*y+h*C)*z,e[11]=(f*y-u*R-g*C)*z,e[12]=(o*b-a*v-l*x)*z,e[13]=(t*v-i*b+r*x)*z,e[14]=(M*L-m*P-p*C)*z,e[15]=(u*P-f*L+d*C)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,g=s*u,m=s*f,M=a*u,p=a*f,h=o*f,C=l*c,L=l*u,y=l*f,P=i.x,R=i.y,I=i.z;return r[0]=(1-(M+h))*P,r[1]=(g+y)*P,r[2]=(m-L)*P,r[3]=0,r[4]=(g-y)*R,r[5]=(1-(d+h))*R,r[6]=(p+C)*R,r[7]=0,r[8]=(m+L)*I,r[9]=(p-C)*I,r[10]=(1-(d+M))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ui.set(r[0],r[1],r[2]).length();const o=Ui.set(r[4],r[5],r[6]).length(),l=Ui.set(r[8],r[9],r[10]).length();s<0&&(a=-a),jt.copy(this);const c=1/a,u=1/o,f=1/l;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=u,jt.elements[5]*=u,jt.elements[6]*=u,jt.elements[8]*=f,jt.elements[9]*=f,jt.elements[10]*=f,t.setFromRotationMatrix(jt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=En,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),g=(i+r)/(i-r);let m,M;if(l)m=s/(a-s),M=a*s/(a-s);else if(o===En)m=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===Dr)m=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=En,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),g=-(i+r)/(i-r);let m,M;if(l)m=1/(a-s),M=a/(a-s);else if(o===En)m=-2/(a-s),M=-(a+s)/(a-s);else if(o===Dr)m=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ui=new B,jt=new rt,qd=new B(0,0,0),Yd=new B(1,1,1),Zn=new B,Xr=new B,$t=new B,wl=new rt,Rl=new cr;class ci{constructor(e=0,t=0,i=0,r=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],g=r[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return wl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rl.setFromEuler(this),this.setFromQuaternion(Rl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class Ko{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kd=0;const Cl=new B,Ni=new cr,Cn=new rt,qr=new B,pr=new B,Zd=new B,Jd=new cr,Pl=new B(1,0,0),Il=new B(0,1,0),Ll=new B(0,0,1),Dl={type:"added"},Qd={type:"removed"},Fi={type:"childadded",child:null},js={type:"childremoved",child:null};class Ct extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new B,t=new ci,i=new cr,r=new B(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ie}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ko,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(Pl,e)}rotateY(e){return this.rotateOnAxis(Il,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,t){return Cl.copy(e).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pl,e)}translateY(e){return this.translateOnAxis(Il,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qr.copy(e):qr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(pr,qr,this.up):Cn.lookAt(qr,pr,this.up),this.quaternion.setFromRotationMatrix(Cn),r&&(Cn.extractRotation(r.matrixWorld),Ni.setFromRotationMatrix(Cn),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dl),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qd),js.child=e,this.dispatchEvent(js),js.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dl),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,e,Zd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,Jd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),g=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ct.DEFAULT_UP=new B(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ut extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jd={type:"move"};class ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,i),h=this._getHandJoint(c,M);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),g=.02,m=.005;c.inputState.pinching&&d>g+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=g-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ut;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function ta(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ge.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ge.workingColorSpace){if(e=zd(e,1),t=He(t,0,1),i=He(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ta(a,s,e+1/3),this.g=ta(a,s,e),this.b=ta(a,s,e-1/3)}return Ge.colorSpaceToWorking(this,r),this}setStyle(e,t=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=eu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gn(e.r),this.g=Gn(e.g),this.b=Gn(e.b),this}copyLinearToSRGB(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return Ge.workingToColorSpace(Lt.copy(this),e),Math.round(He(Lt.r*255,0,255))*65536+Math.round(He(Lt.g*255,0,255))*256+Math.round(He(Lt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Lt.copy(this),t);const i=Lt.r,r=Lt.g,s=Lt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=Gt){Ge.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,i=Lt.g,r=Lt.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Yr);const i=Ys(Jn.h,Yr.h,t),r=Ys(Jn.s,Yr.s,t),s=Ys(Jn.l,Yr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new We;We.NAMES=eu;class ef extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const en=new B,Pn=new B,na=new B,In=new B,Oi=new B,Bi=new B,Ul=new B,ia=new B,ra=new B,sa=new B,aa=new lt,oa=new lt,la=new lt;class on{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),en.subVectors(e,t),r.cross(en);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){en.subVectors(r,t),Pn.subVectors(i,t),na.subVectors(e,t);const a=en.dot(en),o=en.dot(Pn),l=en.dot(na),c=Pn.dot(Pn),u=Pn.dot(na),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,g=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-g-m,m,g)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return aa.setScalar(0),oa.setScalar(0),la.setScalar(0),aa.fromBufferAttribute(e,t),oa.fromBufferAttribute(e,i),la.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(aa,s.x),a.addScaledVector(oa,s.y),a.addScaledVector(la,s.z),a}static isFrontFacing(e,t,i,r){return en.subVectors(i,t),Pn.subVectors(e,t),en.cross(Pn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),en.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return on.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Oi.subVectors(r,i),Bi.subVectors(s,i),ia.subVectors(e,i);const l=Oi.dot(ia),c=Bi.dot(ia);if(l<=0&&c<=0)return t.copy(i);ra.subVectors(e,r);const u=Oi.dot(ra),f=Bi.dot(ra);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Oi,a);sa.subVectors(e,s);const g=Oi.dot(sa),m=Bi.dot(sa);if(m>=0&&g<=m)return t.copy(s);const M=g*c-l*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Bi,o);const p=u*m-g*f;if(p<=0&&f-u>=0&&g-m>=0)return Ul.subVectors(s,r),o=(f-u)/(f-u+(g-m)),t.copy(r).addScaledVector(Ul,o);const h=1/(p+M+d);return a=M*h,o=d*h,t.copy(i).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ri{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,tn):tn.fromBufferAttribute(s,a),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Kr.copy(i.boundingBox)),Kr.applyMatrix4(e.matrixWorld),this.union(Kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),Zr.subVectors(this.max,mr),ki.subVectors(e.a,mr),zi.subVectors(e.b,mr),Gi.subVectors(e.c,mr),Qn.subVectors(zi,ki),jn.subVectors(Gi,zi),di.subVectors(ki,Gi);let t=[0,-Qn.z,Qn.y,0,-jn.z,jn.y,0,-di.z,di.y,Qn.z,0,-Qn.x,jn.z,0,-jn.x,di.z,0,-di.x,-Qn.y,Qn.x,0,-jn.y,jn.x,0,-di.y,di.x,0];return!ca(t,ki,zi,Gi,Zr)||(t=[1,0,0,0,1,0,0,0,1],!ca(t,ki,zi,Gi,Zr))?!1:(Jr.crossVectors(Qn,jn),t=[Jr.x,Jr.y,Jr.z],ca(t,ki,zi,Gi,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ln=[new B,new B,new B,new B,new B,new B,new B,new B],tn=new B,Kr=new Ri,ki=new B,zi=new B,Gi=new B,Qn=new B,jn=new B,di=new B,mr=new B,Zr=new B,Jr=new B,fi=new B;function ca(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){fi.fromArray(n,s);const o=r.x*Math.abs(fi.x)+r.y*Math.abs(fi.y)+r.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),u=i.dot(fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const xt=new B,Qr=new ze;let tf=0;class dn extends wi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ml,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ml&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class tu extends dn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class nu extends dn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bt extends dn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const nf=new Ri,gr=new B,ua=new B;class Fr{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):nf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);const t=gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(gr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(ua)),this.expandByPoint(gr.copy(e.center).sub(ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let rf=0;const Zt=new rt,da=new Ct,Hi=new B,Xt=new Ri,_r=new Ri,Tt=new B;class fn extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fd(e)?nu:tu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ie().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,i){return Zt.makeTranslation(e,t,i),this.applyMatrix4(Zt),this}scale(e,t,i){return Zt.makeScale(e,t,i),this.applyMatrix4(Zt),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(Xt.min,_r.min),Xt.expandByPoint(Tt),Tt.addVectors(Xt.max,_r.max),Xt.expandByPoint(Tt)):(Xt.expandByPoint(_r.min),Xt.expandByPoint(_r.max))}Xt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Tt.fromBufferAttribute(o,c),l&&(Hi.fromBufferAttribute(e,c),Tt.add(Hi)),r=Math.max(r,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new dn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new B,l[x]=new B;const c=new B,u=new B,f=new B,d=new ze,g=new ze,m=new ze,M=new B,p=new B;function h(x,b,T){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,T),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,b),m.fromBufferAttribute(s,T),u.sub(c),f.sub(c),g.sub(d),m.sub(d);const v=1/(g.x*m.y-m.x*g.y);isFinite(v)&&(M.copy(u).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(v),p.copy(f).multiplyScalar(g.x).addScaledVector(u,-m.x).multiplyScalar(v),o[x].add(M),o[b].add(M),o[T].add(M),l[x].add(p),l[b].add(p),l[T].add(p))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let x=0,b=C.length;x<b;++x){const T=C[x],v=T.start,E=T.count;for(let k=v,X=v+E;k<X;k+=3)h(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const L=new B,y=new B,P=new B,R=new B;function I(x){P.fromBufferAttribute(r,x),R.copy(P);const b=o[x];L.copy(b),L.sub(P.multiplyScalar(P.dot(b))).normalize(),y.crossVectors(R,b);const v=y.dot(l[x])<0?-1:1;a.setXYZW(x,L.x,L.y,L.z,v)}for(let x=0,b=C.length;x<b;++x){const T=C[x],v=T.start,E=T.count;for(let k=v,X=v+E;k<X;k+=3)I(e.getX(k+0)),I(e.getX(k+1)),I(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(e)for(let d=0,g=e.count;d<g;d+=3){const m=e.getX(d+0),M=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,g=t.count;d<g;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let g=0,m=0;for(let M=0,p=l.length;M<p;M++){o.isInterleavedBufferAttribute?g=l[M]*o.data.stride+o.offset:g=l[M]*u;for(let h=0;h<u;h++)d[m++]=c[g++]}return new dn(d,u,f)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],g=e(d,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const g=c[f];u.push(g.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,g=f.length;d<g;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let sf=0;class Or extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Nr(),this.name="",this.type="Material",this.blending=er,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Na,this.blendDst=Fa,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Na&&(i.blendSrc=this.blendSrc),this.blendDst!==Fa&&(i.blendDst=this.blendDst),this.blendEquation!==_i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Dn=new B,fa=new B,jr=new B,ei=new B,ha=new B,es=new B,pa=new B;class iu{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){fa.copy(e).add(t).multiplyScalar(.5),jr.copy(t).sub(e).normalize(),ei.copy(this.origin).sub(fa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(jr),o=ei.dot(this.direction),l=-ei.dot(jr),c=ei.lengthSq(),u=Math.abs(1-a*a);let f,d,g,m;if(u>0)if(f=a*l-o,d=a*o-l,m=s*u,f>=0)if(d>=-m)if(d<=m){const M=1/u;f*=M,d*=M,g=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),g=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-s,-l),s),g=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),g=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(fa).addScaledVector(jr,d),g}intersectSphere(e,t){Dn.subVectors(e.center,this.origin);const i=Dn.dot(this.direction),r=Dn.dot(Dn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,i,r,s){ha.subVectors(t,e),es.subVectors(i,e),pa.crossVectors(ha,es);let a=this.direction.dot(pa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ei.subVectors(this.origin,e);const l=o*this.direction.dot(es.crossVectors(ei,es));if(l<0)return null;const c=o*this.direction.dot(ha.cross(ei));if(c<0||l+c>a)return null;const u=-o*ei.dot(pa);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Br extends Or{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nl=new rt,hi=new iu,ts=new Fr,Fl=new B,ns=new B,is=new B,rs=new B,ma=new B,ss=new B,Ol=new B,as=new B;class At extends Ct{constructor(e=new fn,t=new Br){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ss.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(ma.fromBufferAttribute(f,e),a?ss.addScaledVector(ma,u):ss.addScaledVector(ma.sub(t),u))}t.add(ss)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(s),hi.copy(e.ray).recast(e.near),!(ts.containsPoint(hi.origin)===!1&&(hi.intersectSphere(ts,Fl)===null||hi.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Nl.copy(s).invert(),hi.copy(e.ray).applyMatrix4(Nl),!(i.boundingBox!==null&&hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,g=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=d.length;m<M;m++){const p=d[m],h=a[p.materialIndex],C=Math.max(p.start,g.start),L=Math.min(o.count,Math.min(p.start+p.count,g.start+g.count));for(let y=C,P=L;y<P;y+=3){const R=o.getX(y),I=o.getX(y+1),x=o.getX(y+2);r=os(this,h,e,i,c,u,f,R,I,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,g.start),M=Math.min(o.count,g.start+g.count);for(let p=m,h=M;p<h;p+=3){const C=o.getX(p),L=o.getX(p+1),y=o.getX(p+2);r=os(this,a,e,i,c,u,f,C,L,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,M=d.length;m<M;m++){const p=d[m],h=a[p.materialIndex],C=Math.max(p.start,g.start),L=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let y=C,P=L;y<P;y+=3){const R=y,I=y+1,x=y+2;r=os(this,h,e,i,c,u,f,R,I,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,g.start),M=Math.min(l.count,g.start+g.count);for(let p=m,h=M;p<h;p+=3){const C=p,L=p+1,y=p+2;r=os(this,a,e,i,c,u,f,C,L,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function af(n,e,t,i,r,s,a,o){let l;if(e.side===Vt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===li,o),l===null)return null;as.copy(o),as.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(as);return c<t.near||c>t.far?null:{distance:c,point:as.clone(),object:n}}function os(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ns),n.getVertexPosition(l,is),n.getVertexPosition(c,rs);const u=af(n,e,t,i,ns,is,rs,Ol);if(u){const f=new B;on.getBarycoord(Ol,ns,is,rs,f),r&&(u.uv=on.getInterpolatedAttribute(r,o,l,c,f,new ze)),s&&(u.uv1=on.getInterpolatedAttribute(s,o,l,c,f,new ze)),a&&(u.normal=on.getInterpolatedAttribute(a,o,l,c,f,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new B,materialIndex:0};on.getNormal(ns,is,rs,d.normal),u.face=d,u.barycoord=f}return u}class Zo extends Ot{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Rt,u=Rt,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bl extends dn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Vi=new rt,kl=new rt,ls=[],zl=new Ri,of=new rt,vr=new At,xr=new Fr;class ru extends At{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,of)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Vi),zl.copy(e.boundingBox).applyMatrix4(Vi),this.boundingBox.union(zl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Vi),xr.copy(e.boundingSphere).applyMatrix4(Vi),this.boundingSphere.union(xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(vr.geometry=this.geometry,vr.material=this.material,vr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(i),e.ray.intersectsSphere(xr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Vi),kl.multiplyMatrices(i,Vi),vr.matrixWorld=kl,vr.raycast(e,ls);for(let a=0,o=ls.length;a<o;a++){const l=ls[a];l.instanceId=s,l.object=this,t.push(l)}ls.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Zo(new Float32Array(r*this.count),r,this.count,Ho,ln));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ga=new B,lf=new B,cf=new Ie;class gi{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ga.subVectors(i,t).cross(lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ga),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||cf.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Fr,uf=new ze(.5,.5),cs=new B;class Jo{constructor(e=new gi,t=new gi,i=new gi,r=new gi,s=new gi,a=new gi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],g=s[7],m=s[8],M=s[9],p=s[10],h=s[11],C=s[12],L=s[13],y=s[14],P=s[15];if(r[0].setComponents(c-a,g-u,h-m,P-C).normalize(),r[1].setComponents(c+a,g+u,h+m,P+C).normalize(),r[2].setComponents(c+o,g+f,h+M,P+L).normalize(),r[3].setComponents(c-o,g-f,h-M,P-L).normalize(),i)r[4].setComponents(l,d,p,y).normalize(),r[5].setComponents(c-l,g-d,h-p,P-y).normalize();else if(r[4].setComponents(c-l,g-d,h-p,P-y).normalize(),t===En)r[5].setComponents(c+l,g+d,h+p,P+y).normalize();else if(t===Dr)r[5].setComponents(l,d,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){pi.center.set(0,0,0);const t=uf.distanceTo(e.center);return pi.radius=.7071067811865476+t,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(cs.x=r.normal.x>0?e.max.x:e.min.x,cs.y=r.normal.y>0?e.max.y:e.min.y,cs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class su extends Ot{constructor(e=[],t=Ei,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ar extends Ot{constructor(e,t,i=wn,r,s,a,o=Rt,l=Rt,c,u=Vn,f=1){if(u!==Vn&&u!==Si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class df extends ar{constructor(e,t=wn,i=Ei,r,s,a=Rt,o=Rt,l,c=Vn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class au extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ur extends fn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,g=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(f,2));function m(M,p,h,C,L,y,P,R,I,x,b){const T=y/I,v=P/x,E=y/2,k=P/2,X=R/2,z=I+1,K=x+1;let W=0,j=0;const te=new B;for(let fe=0;fe<K;fe++){const ge=fe*v-k;for(let xe=0;xe<z;xe++){const qe=xe*T-E;te[M]=qe*C,te[p]=ge*L,te[h]=X,c.push(te.x,te.y,te.z),te[M]=0,te[p]=0,te[h]=R>0?1:-1,u.push(te.x,te.y,te.z),f.push(xe/I),f.push(1-fe/x),W+=1}}for(let fe=0;fe<x;fe++)for(let ge=0;ge<I;ge++){const xe=d+ge+z*fe,qe=d+ge+z*(fe+1),ct=d+(ge+1)+z*(fe+1),Ye=d+(ge+1)+z*fe;l.push(xe,qe,Ye),l.push(qe,ct,Ye),j+=6}o.addGroup(g,j,b),g+=j,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ds extends fn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],g=[];let m=0;const M=[],p=i/2;let h=0;C(),a===!1&&(e>0&&L(!0),t>0&&L(!1)),this.setIndex(u),this.setAttribute("position",new Bt(f,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(g,2));function C(){const y=new B,P=new B;let R=0;const I=(t-e)/i;for(let x=0;x<=s;x++){const b=[],T=x/s,v=T*(t-e)+e;for(let E=0;E<=r;E++){const k=E/r,X=k*l+o,z=Math.sin(X),K=Math.cos(X);P.x=v*z,P.y=-T*i+p,P.z=v*K,f.push(P.x,P.y,P.z),y.set(z,I,K).normalize(),d.push(y.x,y.y,y.z),g.push(k,1-T),b.push(m++)}M.push(b)}for(let x=0;x<r;x++)for(let b=0;b<s;b++){const T=M[b][x],v=M[b+1][x],E=M[b+1][x+1],k=M[b][x+1];(e>0||b!==0)&&(u.push(T,v,k),R+=3),(t>0||b!==s-1)&&(u.push(v,E,k),R+=3)}c.addGroup(h,R,0),h+=R}function L(y){const P=m,R=new ze,I=new B;let x=0;const b=y===!0?e:t,T=y===!0?1:-1;for(let E=1;E<=r;E++)f.push(0,p*T,0),d.push(0,T,0),g.push(.5,.5),m++;const v=m;for(let E=0;E<=r;E++){const X=E/r*l+o,z=Math.cos(X),K=Math.sin(X);I.x=b*K,I.y=p*T,I.z=b*z,f.push(I.x,I.y,I.z),d.push(0,T,0),R.x=z*.5+.5,R.y=K*.5*T+.5,g.push(R.x,R.y),m++}for(let E=0;E<r;E++){const k=P+E,X=v+E;y===!0?u.push(X,X+1,k):u.push(X+1,X,k),x+=3}c.addGroup(h,x,y===!0?1:2),h+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Us extends Ds{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Us(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dr extends fn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,g=[],m=[],M=[],p=[];for(let h=0;h<u;h++){const C=h*d-a;for(let L=0;L<c;L++){const y=L*f-s;m.push(y,-C,0),M.push(0,0,1),p.push(L/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let C=0;C<o;C++){const L=C+c*h,y=C+c*(h+1),P=C+1+c*(h+1),R=C+1+c*h;g.push(L,y,R),g.push(y,P,R)}this.setIndex(g),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(M,3)),this.setAttribute("uv",new Bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ps extends fn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new B,d=new B,g=[],m=[],M=[],p=[];for(let h=0;h<=i;h++){const C=[],L=h/i,y=a+L*o,P=e*Math.cos(y),R=Math.sqrt(e*e-P*P);let I=0;h===0&&a===0?I=.5/t:h===i&&l===Math.PI&&(I=-.5/t);for(let x=0;x<=t;x++){const b=x/t,T=r+b*s;f.x=-R*Math.cos(T),f.y=P,f.z=R*Math.sin(T),m.push(f.x,f.y,f.z),d.copy(f).normalize(),M.push(d.x,d.y,d.z),p.push(b+I,1-L),C.push(c++)}u.push(C)}for(let h=0;h<i;h++)for(let C=0;C<t;C++){const L=u[h][C+1],y=u[h][C],P=u[h+1][C],R=u[h+1][C+1];(h!==0||a>0)&&g.push(L,y,R),(h!==i-1||l<Math.PI)&&g.push(y,P,R)}this.setIndex(g),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(M,3)),this.setAttribute("uv",new Bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function or(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Gl(r))r.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Gl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=or(n[t]);for(const r in i)e[r]=i[r]}return e}function Gl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ff(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ou(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const hf={clone:or,merge:Nt};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Or{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new lt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"m4":this.uniforms[i].value=new rt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class gf extends Rn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gt extends Or{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _f extends Or{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vf extends Or{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class lu extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class xf extends lu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const _a=new rt,Hl=new B,Vl=new B;class Mf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=qt,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jo,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hl),Vl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vl),t.updateMatrixWorld(),_a.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Dr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_a)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const us=new B,ds=new cr,gn=new B;class cu extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(us,ds,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(us,ds,gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(us,ds,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(us,ds,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ti=new B,Wl=new ze,$l=new ze;class an extends cu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ti.x,ti.y).multiplyScalar(-e/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ti.x,ti.y).multiplyScalar(-e/ti.z)}getViewSize(e,t){return this.getViewBounds(e,Wl,$l),t.subVectors($l,Wl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ns extends cu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Sf extends Mf{constructor(){super(new Ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bf extends lu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Sf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Wi=-90,$i=1;class yf extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Wi,$i,e,t);r.layers=this.layers,this.add(r);const s=new an(Wi,$i,e,t);s.layers=this.layers,this.add(s);const a=new an(Wi,$i,e,t);a.layers=this.layers,this.add(a);const o=new an(Wi,$i,e,t);o.layers=this.layers,this.add(o);const l=new an(Wi,$i,e,t);l.layers=this.layers,this.add(l);const c=new an(Wi,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Dr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,g),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Ef extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Xl=new rt;class Tf{constructor(e,t,i=0,r=1/0){this.ray=new iu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ko,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xl),this}intersectObject(e,t=!0,i=[]){return Eo(e,this,i,t),i.sort(ql),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Eo(e[r],this,i,t);return i.sort(ql),i}}function ql(n,e){return n.distance-e.distance}function Eo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Eo(s[a],e,t,!0)}}class uu{static{uu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Yl(n,e,t,i){const r=Af(i);switch(t){case Zc:return n*e;case Ho:return n*e/r.components*r.byteLength;case Vo:return n*e/r.components*r.byteLength;case Ti:return n*e*2/r.components*r.byteLength;case Wo:return n*e*2/r.components*r.byteLength;case Jc:return n*e*3/r.components*r.byteLength;case cn:return n*e*4/r.components*r.byteLength;case $o:return n*e*4/r.components*r.byteLength;case gs:case _s:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vs:case xs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xa:case Ya:return Math.max(n,16)*Math.max(e,8)/4;case $a:case qa:return Math.max(n,8)*Math.max(e,8)/2;case Ka:case Za:case Qa:case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ja:case Ts:case eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case io:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ao:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case po:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case mo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case go:case _o:case vo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case xo:case Mo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case As:case So:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Af(n){switch(n){case qt:case Xc:return{byteLength:1,components:1};case Ir:case qc:case Hn:return{byteLength:2,components:1};case zo:case Go:return{byteLength:2,components:4};case wn:case ko:case ln:return{byteLength:4,components:1};case Yc:case Kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oo}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function du(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function wf(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((g,m)=>g.start-m.start);let d=0;for(let g=1;g<f.length;g++){const m=f[d],M=f[g];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++d,f[d]=M)}f.length=d+1;for(let g=0,m=f.length;g<m;g++){const M=f[g];n.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Rf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,If=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Df=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ff=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Jf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,eh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,th=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ih=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rh="gl_FragColor = linearToOutputTexel( gl_FragColor );",sh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ah=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,oh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ch=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ph=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_h=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Mh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Th=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ah=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ch=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ph=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ih=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Oh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$h=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Jh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ip=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,rp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ap=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,op=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ip=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Np=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Op=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Kp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,am=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:Rf,alphahash_pars_fragment:Cf,alphamap_fragment:Pf,alphamap_pars_fragment:If,alphatest_fragment:Lf,alphatest_pars_fragment:Df,aomap_fragment:Uf,aomap_pars_fragment:Nf,batching_pars_vertex:Ff,batching_vertex:Of,begin_vertex:Bf,beginnormal_vertex:kf,bsdfs:zf,iridescence_fragment:Gf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Vf,clipping_planes_pars_fragment:Wf,clipping_planes_pars_vertex:$f,clipping_planes_vertex:Xf,color_fragment:qf,color_pars_fragment:Yf,color_pars_vertex:Kf,color_vertex:Zf,common:Jf,cube_uv_reflection_fragment:Qf,defaultnormal_vertex:jf,displacementmap_pars_vertex:eh,displacementmap_vertex:th,emissivemap_fragment:nh,emissivemap_pars_fragment:ih,colorspace_fragment:rh,colorspace_pars_fragment:sh,envmap_fragment:ah,envmap_common_pars_fragment:oh,envmap_pars_fragment:lh,envmap_pars_vertex:ch,envmap_physical_pars_fragment:Mh,envmap_vertex:uh,fog_vertex:dh,fog_pars_vertex:fh,fog_fragment:hh,fog_pars_fragment:ph,gradientmap_pars_fragment:mh,lightmap_pars_fragment:gh,lights_lambert_fragment:_h,lights_lambert_pars_fragment:vh,lights_pars_begin:xh,lights_toon_fragment:Sh,lights_toon_pars_fragment:bh,lights_phong_fragment:yh,lights_phong_pars_fragment:Eh,lights_physical_fragment:Th,lights_physical_pars_fragment:Ah,lights_fragment_begin:wh,lights_fragment_maps:Rh,lights_fragment_end:Ch,lightprobes_pars_fragment:Ph,logdepthbuf_fragment:Ih,logdepthbuf_pars_fragment:Lh,logdepthbuf_pars_vertex:Dh,logdepthbuf_vertex:Uh,map_fragment:Nh,map_pars_fragment:Fh,map_particle_fragment:Oh,map_particle_pars_fragment:Bh,metalnessmap_fragment:kh,metalnessmap_pars_fragment:zh,morphinstance_vertex:Gh,morphcolor_vertex:Hh,morphnormal_vertex:Vh,morphtarget_pars_vertex:Wh,morphtarget_vertex:$h,normal_fragment_begin:Xh,normal_fragment_maps:qh,normal_pars_fragment:Yh,normal_pars_vertex:Kh,normal_vertex:Zh,normalmap_pars_fragment:Jh,clearcoat_normal_fragment_begin:Qh,clearcoat_normal_fragment_maps:jh,clearcoat_pars_fragment:ep,iridescence_pars_fragment:tp,opaque_fragment:np,packing:ip,premultiplied_alpha_fragment:rp,project_vertex:sp,dithering_fragment:ap,dithering_pars_fragment:op,roughnessmap_fragment:lp,roughnessmap_pars_fragment:cp,shadowmap_pars_fragment:up,shadowmap_pars_vertex:dp,shadowmap_vertex:fp,shadowmask_pars_fragment:hp,skinbase_vertex:pp,skinning_pars_vertex:mp,skinning_vertex:gp,skinnormal_vertex:_p,specularmap_fragment:vp,specularmap_pars_fragment:xp,tonemapping_fragment:Mp,tonemapping_pars_fragment:Sp,transmission_fragment:bp,transmission_pars_fragment:yp,uv_pars_fragment:Ep,uv_pars_vertex:Tp,uv_vertex:Ap,worldpos_vertex:wp,background_vert:Rp,background_frag:Cp,backgroundCube_vert:Pp,backgroundCube_frag:Ip,cube_vert:Lp,cube_frag:Dp,depth_vert:Up,depth_frag:Np,distance_vert:Fp,distance_frag:Op,equirect_vert:Bp,equirect_frag:kp,linedashed_vert:zp,linedashed_frag:Gp,meshbasic_vert:Hp,meshbasic_frag:Vp,meshlambert_vert:Wp,meshlambert_frag:$p,meshmatcap_vert:Xp,meshmatcap_frag:qp,meshnormal_vert:Yp,meshnormal_frag:Kp,meshphong_vert:Zp,meshphong_frag:Jp,meshphysical_vert:Qp,meshphysical_frag:jp,meshtoon_vert:em,meshtoon_frag:tm,points_vert:nm,points_frag:im,shadow_vert:rm,shadow_frag:sm,sprite_vert:am,sprite_frag:om},de={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},Sn={basic:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Nt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Nt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new We(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Nt([de.points,de.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Nt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Nt([de.common,de.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Nt([de.sprite,de.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:Nt([de.common,de.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:Nt([de.lights,de.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Sn.physical={uniforms:Nt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const fs={r:0,b:0,g:0},lm=new rt,fu=new Ie;fu.set(-1,0,0,0,1,0,0,0,1);function cm(n,e,t,i,r,s){const a=new We(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function g(C){let L=C.isScene===!0?C.background:null;if(L&&L.isTexture){const y=C.backgroundBlurriness>0;L=e.get(L,y)}return L}function m(C){let L=!1;const y=g(C);y===null?p(a,o):y&&y.isColor&&(p(y,1),L=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(C,L){const y=g(L);y&&(y.isCubeTexture||y.mapping===Ls)?(c===void 0&&(c=new At(new ur(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:or(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(P,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lm.makeRotationFromEuler(L.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(fu),c.material.toneMapped=Ge.getTransfer(y.colorSpace)!==Qe,(u!==y||f!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new At(new dr(2,2),new Rn({name:"BackgroundMaterial",uniforms:or(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function p(C,L){C.getRGB(fs,ou(n)),t.buffers.color.setClear(fs.r,fs.g,fs.b,L,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(C,L=1){a.set(C),o=L,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(C){o=C,p(a,o)},render:m,addToRenderList:M,dispose:h}}function um(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(v,E,k,X,z){let K=!1;const W=f(v,X,k,E);s!==W&&(s=W,c(s.object)),K=g(v,X,k,z),K&&m(v,X,k,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(v,E,k,X),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function f(v,E,k,X){const z=X.wireframe===!0;let K=i[E.id];K===void 0&&(K={},i[E.id]=K);const W=v.isInstancedMesh===!0?v.id:0;let j=K[W];j===void 0&&(j={},K[W]=j);let te=j[k.id];te===void 0&&(te={},j[k.id]=te);let fe=te[z];return fe===void 0&&(fe=d(l()),te[z]=fe),fe}function d(v){const E=[],k=[],X=[];for(let z=0;z<t;z++)E[z]=0,k[z]=0,X[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:k,attributeDivisors:X,object:v,attributes:{},index:null}}function g(v,E,k,X){const z=s.attributes,K=E.attributes;let W=0;const j=k.getAttributes();for(const te in j)if(j[te].location>=0){const ge=z[te];let xe=K[te];if(xe===void 0&&(te==="instanceMatrix"&&v.instanceMatrix&&(xe=v.instanceMatrix),te==="instanceColor"&&v.instanceColor&&(xe=v.instanceColor)),ge===void 0||ge.attribute!==xe||xe&&ge.data!==xe.data)return!0;W++}return s.attributesNum!==W||s.index!==X}function m(v,E,k,X){const z={},K=E.attributes;let W=0;const j=k.getAttributes();for(const te in j)if(j[te].location>=0){let ge=K[te];ge===void 0&&(te==="instanceMatrix"&&v.instanceMatrix&&(ge=v.instanceMatrix),te==="instanceColor"&&v.instanceColor&&(ge=v.instanceColor));const xe={};xe.attribute=ge,ge&&ge.data&&(xe.data=ge.data),z[te]=xe,W++}s.attributes=z,s.attributesNum=W,s.index=X}function M(){const v=s.newAttributes;for(let E=0,k=v.length;E<k;E++)v[E]=0}function p(v){h(v,0)}function h(v,E){const k=s.newAttributes,X=s.enabledAttributes,z=s.attributeDivisors;k[v]=1,X[v]===0&&(n.enableVertexAttribArray(v),X[v]=1),z[v]!==E&&(n.vertexAttribDivisor(v,E),z[v]=E)}function C(){const v=s.newAttributes,E=s.enabledAttributes;for(let k=0,X=E.length;k<X;k++)E[k]!==v[k]&&(n.disableVertexAttribArray(k),E[k]=0)}function L(v,E,k,X,z,K,W){W===!0?n.vertexAttribIPointer(v,E,k,z,K):n.vertexAttribPointer(v,E,k,X,z,K)}function y(v,E,k,X){M();const z=X.attributes,K=k.getAttributes(),W=E.defaultAttributeValues;for(const j in K){const te=K[j];if(te.location>=0){let fe=z[j];if(fe===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(fe=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(fe=v.instanceColor)),fe!==void 0){const ge=fe.normalized,xe=fe.itemSize,qe=e.get(fe);if(qe===void 0)continue;const ct=qe.buffer,Ye=qe.type,Q=qe.bytesPerElement,se=Ye===n.INT||Ye===n.UNSIGNED_INT||fe.gpuType===ko;if(fe.isInterleavedBufferAttribute){const ne=fe.data,Pe=ne.stride,Le=fe.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<te.locationSize;we++)h(te.location+we,ne.meshPerAttribute);v.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<te.locationSize;we++)p(te.location+we);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let we=0;we<te.locationSize;we++)L(te.location+we,xe/te.locationSize,Ye,ge,Pe*Q,(Le+xe/te.locationSize*we)*Q,se)}else{if(fe.isInstancedBufferAttribute){for(let ne=0;ne<te.locationSize;ne++)h(te.location+ne,fe.meshPerAttribute);v.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ne=0;ne<te.locationSize;ne++)p(te.location+ne);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let ne=0;ne<te.locationSize;ne++)L(te.location+ne,xe/te.locationSize,Ye,ge,xe*Q,xe/te.locationSize*ne*Q,se)}}else if(W!==void 0){const ge=W[j];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(te.location,ge);break;case 3:n.vertexAttrib3fv(te.location,ge);break;case 4:n.vertexAttrib4fv(te.location,ge);break;default:n.vertexAttrib1fv(te.location,ge)}}}}C()}function P(){b();for(const v in i){const E=i[v];for(const k in E){const X=E[k];for(const z in X){const K=X[z];for(const W in K)u(K[W].object),delete K[W];delete X[z]}}delete i[v]}}function R(v){if(i[v.id]===void 0)return;const E=i[v.id];for(const k in E){const X=E[k];for(const z in X){const K=X[z];for(const W in K)u(K[W].object),delete K[W];delete X[z]}}delete i[v.id]}function I(v){for(const E in i){const k=i[E];for(const X in k){const z=k[X];if(z[v.id]===void 0)continue;const K=z[v.id];for(const W in K)u(K[W].object),delete K[W];delete z[v.id]}}}function x(v){for(const E in i){const k=i[E],X=v.isInstancedMesh===!0?v.id:0,z=k[X];if(z!==void 0){for(const K in z){const W=z[K];for(const j in W)u(W[j].object),delete W[j];delete z[K]}delete k[X],Object.keys(k).length===0&&delete i[E]}}}function b(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:T,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:M,enableAttribute:p,disableUnusedAttributes:C}}function dm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let g=0;g<u;g++)d+=c[g];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function fm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(I){return!(I!==cn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const x=I===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==qt&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ln&&!x)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),L=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:C,maxVaryings:L,maxFragmentUniforms:y,maxSamples:P,samples:R}}function hm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new gi,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const g=f.length!==0||d||i!==0||r;return r=d,i=f.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,g){const m=f.clippingPlanes,M=f.clipIntersection,p=f.clipShadows,h=n.get(f);if(!r||m===null||m.length===0||s&&!p)s?u(null):c();else{const C=s?0:i,L=C*4;let y=h.clippingState||null;l.value=y,y=u(m,d,L,g);for(let P=0;P!==L;++P)y[P]=t[P];h.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,g,m){const M=f!==null?f.length:0;let p=null;if(M!==0){if(p=l.value,m!==!0||p===null){const h=g+M*4,C=d.matrixWorldInverse;o.getNormalMatrix(C),(p===null||p.length<h)&&(p=new Float32Array(h));for(let L=0,y=g;L!==M;++L,y+=4)a.copy(f[L]).applyMatrix4(C,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}const si=4,Kl=[.125,.215,.35,.446,.526,.582],vi=20,pm=256,Mr=new Ns,Zl=new We;let va=null,xa=0,Ma=0,Sa=!1;const mm=new B;class Jl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=mm}=s;va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(va,xa,Ma),this._renderer.xr.enabled=Sa,e.scissorTest=!1,Xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Hn,format:cn,colorSpace:ws,depthBuffer:!1},r=Ql(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ql(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gm(s)),this._blurMaterial=vm(s,e,t),this._ggxMaterial=_m(s,e,t)}return r}_compileMaterial(e){const t=new At(new fn,e);this._renderer.compile(t,Mr)}_sceneToCubeUV(e,t,i,r,s){const l=new an(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,g=f.toneMapping;f.getClearColor(Zl),f.toneMapping=Tn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new ur,new Br({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let h=!1;const C=e.background;C?C.isColor&&(p.color.copy(C),e.background=null,h=!0):(p.color.copy(Zl),h=!0);for(let L=0;L<6;L++){const y=L%3;y===0?(l.up.set(0,c[L],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[L],s.y,s.z)):y===1?(l.up.set(0,0,c[L]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[L],s.z)):(l.up.set(0,c[L],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[L]));const P=this._cubeSize;Xi(r,y*P,L>2?P:0,P,P),f.setRenderTarget(r),h&&f.render(M,l),f.render(e,l)}f.toneMapping=g,f.autoClear=d,e.background=C}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ei||e.mapping===sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Xi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Mr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,g=f*d,{_lodMax:m}=this,M=this._sizeLods[i],p=3*M*(i>m-si?i-m+si:0),h=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=m-t,Xi(s,p,h,3*M,2*M),r.setRenderTarget(s),r.render(o,Mr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Xi(e,p,h,3*M,2*M),r.setRenderTarget(e),r.render(o,Mr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ve("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,g=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*vi-1),M=s/m,p=isFinite(s)?1+Math.floor(u*M):vi;p>vi&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${vi}`);const h=[];let C=0;for(let I=0;I<vi;++I){const x=I/M,b=Math.exp(-x*x/2);h.push(b),I===0?C+=b:I<p&&(C+=2*b)}for(let I=0;I<h.length;I++)h[I]=h[I]/C;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:L}=this;d.dTheta.value=m,d.mipInt.value=L-i;const y=this._sizeLods[r],P=3*y*(r>L-si?r-L+si:0),R=4*(this._cubeSize-y);Xi(t,P,R,3*y,2*y),l.setRenderTarget(t),l.render(f,Mr)}}function gm(n){const e=[],t=[],i=[];let r=n;const s=n-si+1+Kl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-si?l=Kl[a-n+si-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],g=6,m=6,M=3,p=2,h=1,C=new Float32Array(M*m*g),L=new Float32Array(p*m*g),y=new Float32Array(h*m*g);for(let R=0;R<g;R++){const I=R%3*2/3-1,x=R>2?0:-1,b=[I,x,0,I+2/3,x,0,I+2/3,x+1,0,I,x,0,I+2/3,x+1,0,I,x+1,0];C.set(b,M*m*R),L.set(d,p*m*R);const T=[R,R,R,R,R,R];y.set(T,h*m*R)}const P=new fn;P.setAttribute("position",new dn(C,M)),P.setAttribute("uv",new dn(L,p)),P.setAttribute("faceIndex",new dn(y,h)),i.push(new At(P,null)),r>si&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ql(n,e,t){const i=new An(n,e,t);return i.texture.mapping=Ls,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Xi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function _m(n,e,t){return new Rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function vm(n,e,t){const i=new Float32Array(vi),r=new B(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function jl(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function ec(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Fs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class hu extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new su(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ur(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:zn});s.uniforms.tEquirect.value=t;const a=new At(r,s),o=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Dt),new yf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function xm(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,g=!1){return d==null?null:g?a(d):s(d)}function s(d){if(d&&d.isTexture){const g=d.mapping;if(g===Ws||g===$s)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const M=new hu(m.height);return M.fromEquirectangularTexture(n,d),e.set(d,M),d.addEventListener("dispose",c),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const g=d.mapping,m=g===Ws||g===$s,M=g===Ei||g===sr;if(m||M){let p=t.get(d);const h=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Jl(n)),p=m?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const C=d.image;return m&&C&&C.height>0||M&&C&&l(C)?(i===null&&(i=new Jl(n)),p=m?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function o(d,g){return g===Ws?d.mapping=Ei:g===$s&&(d.mapping=sr),d}function l(d){let g=0;const m=6;for(let M=0;M<m;M++)d[M]!==void 0&&g++;return g===m}function c(d){const g=d.target;g.removeEventListener("dispose",c);const m=e.get(g);m!==void 0&&(e.delete(g),m.dispose())}function u(d){const g=d.target;g.removeEventListener("dispose",u);const m=t.get(g);m!==void 0&&(t.delete(g),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Mm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&tr("WebGLRenderer: "+i+" extension not supported."),r}}}function Sm(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete r[d.id];const g=s.get(d);g&&(e.remove(g),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER)}function c(f){const d=[],g=f.index,m=f.attributes.position;let M=0;if(m===void 0)return;if(g!==null){const C=g.array;M=g.version;for(let L=0,y=C.length;L<y;L+=3){const P=C[L+0],R=C[L+1],I=C[L+2];d.push(P,R,R,I,I,P)}}else{const C=m.array;M=m.version;for(let L=0,y=C.length/3-1;L<y;L+=3){const P=L+0,R=L+1,I=L+2;d.push(P,R,R,I,I,P)}}const p=new(m.count>=65535?nu:tu)(d,1);p.version=M;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const g=f.index;g!==null&&d.version<g.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function bm(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*a,g),t.update(d,i,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let M=0;for(let p=0;p<g;p++)M+=d[p];t.update(M,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function ym(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Em(n,e,t){const i=new WeakMap,r=new lt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let T=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",T)};var g=T;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],C=o.morphAttributes.normal||[],L=o.morphAttributes.color||[];let y=0;m===!0&&(y=1),M===!0&&(y=2),p===!0&&(y=3);let P=o.attributes.position.count*y,R=1;P>e.maxTextureSize&&(R=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const I=new Float32Array(P*R*4*f),x=new jc(I,P,R,f);x.type=ln,x.needsUpdate=!0;const b=y*4;for(let v=0;v<f;v++){const E=h[v],k=C[v],X=L[v],z=P*R*4*v;for(let K=0;K<E.count;K++){const W=K*b;m===!0&&(r.fromBufferAttribute(E,K),I[z+W+0]=r.x,I[z+W+1]=r.y,I[z+W+2]=r.z,I[z+W+3]=0),M===!0&&(r.fromBufferAttribute(k,K),I[z+W+4]=r.x,I[z+W+5]=r.y,I[z+W+6]=r.z,I[z+W+7]=0),p===!0&&(r.fromBufferAttribute(X,K),I[z+W+8]=r.x,I[z+W+9]=r.y,I[z+W+10]=r.z,I[z+W+11]=X.itemSize===4?r.w:1)}}d={count:f,texture:x,size:new ze(P,R)},i.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const M=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",M),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Tm(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const g=c.skeleton;s.get(g)!==u&&(g.update(),s.set(g,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Am={[kc]:"LINEAR_TONE_MAPPING",[zc]:"REINHARD_TONE_MAPPING",[Gc]:"CINEON_TONE_MAPPING",[Bo]:"ACES_FILMIC_TONE_MAPPING",[Vc]:"AGX_TONE_MAPPING",[Wc]:"NEUTRAL_TONE_MAPPING",[Hc]:"CUSTOM_TONE_MAPPING"};function wm(n,e,t,i,r,s){const a=new An(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new ar(e,t):void 0}),o=new An(e,t,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),l=new fn;l.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bt([0,2,0,0,2,0],2));const c=new gf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new At(l,c),f=new Ns(-1,1,1,-1,0,1);let d=null,g=null,m=!1,M,p=null,h=[],C=!1;this.setSize=function(L,y){a.setSize(L,y),o.setSize(L,y);for(let P=0;P<h.length;P++){const R=h[P];R.setSize&&R.setSize(L,y)}},this.setEffects=function(L){h=L,C=h.length>0&&h[0].isRenderPass===!0;const y=a.width,P=a.height;for(let R=0;R<h.length;R++){const I=h[R];I.setSize&&I.setSize(y,P)}},this.begin=function(L,y){if(m||L.toneMapping===Tn&&h.length===0)return!1;if(p=y,y!==null){const P=y.width,R=y.height;(a.width!==P||a.height!==R)&&this.setSize(P,R)}return C===!1&&L.setRenderTarget(a),M=L.toneMapping,L.toneMapping=Tn,!0},this.hasRenderPass=function(){return C},this.end=function(L,y){L.toneMapping=M,m=!0;let P=a,R=o;for(let I=0;I<h.length;I++){const x=h[I];if(x.enabled!==!1&&(x.render(L,R,P,y),x.needsSwap!==!1)){const b=P;P=R,R=b}}if(d!==L.outputColorSpace||g!==L.toneMapping){d=L.outputColorSpace,g=L.toneMapping,c.defines={},Ge.getTransfer(d)===Qe&&(c.defines.SRGB_TRANSFER="");const I=Am[g];I&&(c.defines[I]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=P.texture,L.setRenderTarget(p),L.render(u,f),p=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const pu=new Ot,To=new ar(1,1),mu=new jc,gu=new Xd,_u=new su,tc=[],nc=[],ic=new Float32Array(16),rc=new Float32Array(9),sc=new Float32Array(4);function fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=tc[r];if(s===void 0&&(s=new Float32Array(r),tc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Os(n,e){let t=nc[e];t===void 0&&(t=new Int32Array(e),nc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function Pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function Im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function Lm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(St(t,i))return;sc.set(i),n.uniformMatrix2fv(this.addr,!1,sc),bt(t,i)}}function Dm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(St(t,i))return;rc.set(i),n.uniformMatrix3fv(this.addr,!1,rc),bt(t,i)}}function Um(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(St(t,i))return;ic.set(i),n.uniformMatrix4fv(this.addr,!1,ic),bt(t,i)}}function Nm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),bt(t,e)}}function Om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),bt(t,e)}}function Bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),bt(t,e)}}function km(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),bt(t,e)}}function Gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),bt(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),bt(t,e)}}function Vm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(To.compareFunction=t.isReversedDepthBuffer()?qo:Xo,s=To):s=pu,t.setTexture2D(e||s,r)}function Wm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||gu,r)}function $m(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||_u,r)}function Xm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||mu,r)}function qm(n){switch(n){case 5126:return Rm;case 35664:return Cm;case 35665:return Pm;case 35666:return Im;case 35674:return Lm;case 35675:return Dm;case 35676:return Um;case 5124:case 35670:return Nm;case 35667:case 35671:return Fm;case 35668:case 35672:return Om;case 35669:case 35673:return Bm;case 5125:return km;case 36294:return zm;case 36295:return Gm;case 36296:return Hm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Xm}}function Ym(n,e){n.uniform1fv(this.addr,e)}function Km(n,e){const t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function Zm(n,e){const t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function Jm(n,e){const t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function Qm(n,e){const t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function jm(n,e){const t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function e0(n,e){const t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function t0(n,e){n.uniform1iv(this.addr,e)}function n0(n,e){n.uniform2iv(this.addr,e)}function i0(n,e){n.uniform3iv(this.addr,e)}function r0(n,e){n.uniform4iv(this.addr,e)}function s0(n,e){n.uniform1uiv(this.addr,e)}function a0(n,e){n.uniform2uiv(this.addr,e)}function o0(n,e){n.uniform3uiv(this.addr,e)}function l0(n,e){n.uniform4uiv(this.addr,e)}function c0(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);St(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=To:a=pu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function u0(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);St(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||gu,s[a])}function d0(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);St(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||_u,s[a])}function f0(n,e,t){const i=this.cache,r=e.length,s=Os(t,r);St(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||mu,s[a])}function h0(n){switch(n){case 5126:return Ym;case 35664:return Km;case 35665:return Zm;case 35666:return Jm;case 35674:return Qm;case 35675:return jm;case 35676:return e0;case 5124:case 35670:return t0;case 35667:case 35671:return n0;case 35668:case 35672:return i0;case 35669:case 35673:return r0;case 5125:return s0;case 36294:return a0;case 36295:return o0;case 36296:return l0;case 35678:case 36198:case 36298:case 36306:case 35682:return c0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return f0}}class p0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=qm(t.type)}}class m0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=h0(t.type)}}class g0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function ac(n,e){n.seq.push(e),n.map[e.id]=e}function _0(n,e,t){const i=n.name,r=i.length;for(ba.lastIndex=0;;){const s=ba.exec(i),a=ba.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ac(t,c===void 0?new p0(o,n,e):new m0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new g0(o),ac(t,f)),t=f}}}class Ms{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);_0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function oc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const v0=37297;let x0=0;function M0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const lc=new Ie;function S0(n){Ge._getMatrix(lc,Ge.workingColorSpace,n);const e=`mat3( ${lc.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(n)){case Rs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function cc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+M0(n.getShaderSource(e),o)}else return s}function b0(n,e){const t=S0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const y0={[kc]:"Linear",[zc]:"Reinhard",[Gc]:"Cineon",[Bo]:"ACESFilmic",[Vc]:"AgX",[Wc]:"Neutral",[Hc]:"Custom"};function E0(n,e){const t=y0[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const hs=new B;function T0(){Ge.getLuminanceCoefficients(hs);const n=hs.x.toFixed(4),e=hs.y.toFixed(4),t=hs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tr).join(`
`)}function w0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function R0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Tr(n){return n!==""}function uc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const C0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(n){return n.replace(C0,I0)}const P0=new Map;function I0(n,e){let t=Ne[e];if(t===void 0){const i=P0.get(e);if(i!==void 0)t=Ne[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ao(t)}const L0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fc(n){return n.replace(L0,D0)}function D0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const U0={[ms]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function N0(n){return U0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const F0={[Ei]:"ENVMAP_TYPE_CUBE",[sr]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE_UV"};function O0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":F0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const B0={[sr]:"ENVMAP_MODE_REFRACTION"};function k0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":B0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const z0={[Bc]:"ENVMAP_BLENDING_MULTIPLY",[Td]:"ENVMAP_BLENDING_MIX",[Ad]:"ENVMAP_BLENDING_ADD"};function G0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":z0[n.combine]||"ENVMAP_BLENDING_NONE"}function H0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function V0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=N0(t),c=O0(t),u=k0(t),f=G0(t),d=H0(t),g=A0(t),m=w0(s),M=r.createProgram();let p,h,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Tr).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Tr).join(`
`),h.length>0&&(h+=`
`)):(p=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),h=[hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Tn?E0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,b0("linearToOutputTexel",t.outputColorSpace),T0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tr).join(`
`)),a=Ao(a),a=uc(a,t),a=dc(a,t),o=Ao(o),o=uc(o,t),o=dc(o,t),a=fc(a),o=fc(o),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const L=C+p+a,y=C+h+o,P=oc(r,r.VERTEX_SHADER,L),R=oc(r,r.FRAGMENT_SHADER,y);r.attachShader(M,P),r.attachShader(M,R),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function I(v){if(n.debug.checkShaderErrors){const E=r.getProgramInfoLog(M)||"",k=r.getShaderInfoLog(P)||"",X=r.getShaderInfoLog(R)||"",z=E.trim(),K=k.trim(),W=X.trim();let j=!0,te=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,P,R);else{const fe=cc(r,P,"vertex"),ge=cc(r,R,"fragment");Ve("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+z+`
`+fe+`
`+ge)}else z!==""?Ce("WebGLProgram: Program Info Log:",z):(K===""||W==="")&&(te=!1);te&&(v.diagnostics={runnable:j,programLog:z,vertexShader:{log:K,prefix:p},fragmentShader:{log:W,prefix:h}})}r.deleteShader(P),r.deleteShader(R),x=new Ms(r,M),b=R0(r,M)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let b;this.getAttributes=function(){return b===void 0&&I(this),b};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(M,v0)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=x0++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=P,this.fragmentShader=R,this}let W0=0;class $0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new X0(e),t.set(e,i)),i}}class X0{constructor(e){this.id=W0++,this.code=e,this.usedTimes=0}}function q0(n){return n===Ti||n===Ts||n===As}function Y0(n,e,t,i,r,s){const a=new Ko,o=new $0,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,b,T,v,E,k){const X=v.fog,z=E.geometry,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?v.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,j=e.get(x.envMap||K,W),te=j&&j.mapping===Ls?j.image.height:null,fe=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Ce("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,xe=ge!==void 0?ge.length:0;let qe=0;z.morphAttributes.position!==void 0&&(qe=1),z.morphAttributes.normal!==void 0&&(qe=2),z.morphAttributes.color!==void 0&&(qe=3);let ct,Ye,Q,se;if(fe){const Me=Sn[fe];ct=Me.vertexShader,Ye=Me.fragmentShader}else{ct=x.vertexShader,Ye=x.fragmentShader;const Me=o.getVertexShaderStage(x),dt=o.getFragmentShaderStage(x);o.update(x,Me,dt),Q=Me.id,se=dt.id}const ne=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Le=E.isInstancedMesh===!0,we=E.isBatchedMesh===!0,ht=!!x.map,ke=!!x.matcap,tt=!!j,Ke=!!x.aoMap,$e=!!x.lightMap,_t=!!x.bumpMap&&x.wireframe===!1,Mt=!!x.normalMap,yt=!!x.displacementMap,wt=!!x.emissiveMap,ut=!!x.metalnessMap,vt=!!x.roughnessMap,N=x.anisotropy>0,kt=x.clearcoat>0,Je=x.dispersion>0,A=x.iridescence>0,_=x.sheen>0,O=x.transmission>0,V=N&&!!x.anisotropyMap,q=kt&&!!x.clearcoatMap,ie=kt&&!!x.clearcoatNormalMap,ae=kt&&!!x.clearcoatRoughnessMap,Y=A&&!!x.iridescenceMap,J=A&&!!x.iridescenceThicknessMap,oe=_&&!!x.sheenColorMap,ye=_&&!!x.sheenRoughnessMap,ue=!!x.specularMap,le=!!x.specularColorMap,Ae=!!x.specularIntensityMap,Re=O&&!!x.transmissionMap,De=O&&!!x.thicknessMap,U=!!x.gradientMap,re=!!x.alphaMap,Z=x.alphaTest>0,ce=!!x.alphaHash,me=!!x.extensions;let ee=Tn;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ee=n.toneMapping);const be={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:ct,fragmentShader:Ye,defines:x.defines,customVertexShaderID:Q,customFragmentShaderID:se,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:we,batchingColor:we&&E._colorsTexture!==null,instancing:Le,instancingColor:Le&&E.instanceColor!==null,instancingMorph:Le&&E.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ht,matcap:ke,envMap:tt,envMapMode:tt&&j.mapping,envMapCubeUVHeight:te,aoMap:Ke,lightMap:$e,bumpMap:_t,normalMap:Mt,displacementMap:yt,emissiveMap:wt,normalMapObjectSpace:Mt&&x.normalMapType===Cd,normalMapTangentSpace:Mt&&x.normalMapType===bo,packedNormalMap:Mt&&x.normalMapType===bo&&q0(x.normalMap.format),metalnessMap:ut,roughnessMap:vt,anisotropy:N,anisotropyMap:V,clearcoat:kt,clearcoatMap:q,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:Je,iridescence:A,iridescenceMap:Y,iridescenceThicknessMap:J,sheen:_,sheenColorMap:oe,sheenRoughnessMap:ye,specularMap:ue,specularColorMap:le,specularIntensityMap:Ae,transmission:O,transmissionMap:Re,thicknessMap:De,gradientMap:U,opaque:x.transparent===!1&&x.blending===er&&x.alphaToCoverage===!1,alphaMap:re,alphaTest:Z,alphaHash:ce,combine:x.combine,mapUv:ht&&m(x.map.channel),aoMapUv:Ke&&m(x.aoMap.channel),lightMapUv:$e&&m(x.lightMap.channel),bumpMapUv:_t&&m(x.bumpMap.channel),normalMapUv:Mt&&m(x.normalMap.channel),displacementMapUv:yt&&m(x.displacementMap.channel),emissiveMapUv:wt&&m(x.emissiveMap.channel),metalnessMapUv:ut&&m(x.metalnessMap.channel),roughnessMapUv:vt&&m(x.roughnessMap.channel),anisotropyMapUv:V&&m(x.anisotropyMap.channel),clearcoatMapUv:q&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:J&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(x.sheenRoughnessMap.channel),specularMapUv:ue&&m(x.specularMap.channel),specularColorMapUv:le&&m(x.specularColorMap.channel),specularIntensityMapUv:Ae&&m(x.specularIntensityMap.channel),transmissionMapUv:Re&&m(x.transmissionMap.channel),thicknessMapUv:De&&m(x.thicknessMap.channel),alphaMapUv:re&&m(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Mt||N),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!z.attributes.uv&&(ht||re),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&Mt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Pe,skinning:E.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:qe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:ht&&x.map.isVideoTexture===!0&&Ge.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:wt&&x.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Nn,flipSided:x.side===Vt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:me&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&x.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function p(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const T in x.defines)b.push(T),b.push(x.defines[T]);return x.isRawShaderMaterial===!1&&(h(b,x),C(b,x),b.push(n.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function h(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function C(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function L(x){const b=g[x.type];let T;if(b){const v=Sn[b];T=hf.clone(v.uniforms)}else T=x.uniforms;return T}function y(x,b){let T=u.get(b);return T!==void 0?++T.usedTimes:(T=new V0(n,b,x,r),c.push(T),u.set(b,T)),T}function P(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function I(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:L,acquireProgram:y,releaseProgram:P,releaseShaderCache:R,programs:c,dispose:I}}function K0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Z0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function pc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function mc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,m,M,p,h){let C=n[e];return C===void 0?(C={id:d.id,object:d,geometry:g,material:m,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:p,group:h},n[e]=C):(C.id=d.id,C.object=d,C.geometry=g,C.material=m,C.materialVariant=a(d),C.groupOrder=M,C.renderOrder=d.renderOrder,C.z=p,C.group=h),e++,C}function l(d,g,m,M,p,h){const C=o(d,g,m,M,p,h);m.transmission>0?i.push(C):m.transparent===!0?r.push(C):t.push(C)}function c(d,g,m,M,p,h){const C=o(d,g,m,M,p,h);m.transmission>0?i.unshift(C):m.transparent===!0?r.unshift(C):t.unshift(C)}function u(d,g,m){t.length>1&&t.sort(d||Z0),i.length>1&&i.sort(g||pc),r.length>1&&r.sort(g||pc),m&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,g=n.length;d<g;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function J0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new mc,n.set(i,[a])):r>=s.length?(a=new mc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Q0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new We};break;case"SpotLight":t={position:new B,direction:new B,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function j0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let eg=0;function tg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ng(n){const e=new Q0,t=j0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new rt,a=new rt;function o(c){let u=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let g=0,m=0,M=0,p=0,h=0,C=0,L=0,y=0,P=0,R=0,I=0;c.sort(tg);for(let b=0,T=c.length;b<T;b++){const v=c[b],E=v.color,k=v.intensity,X=v.distance;let z=null;if(v.shadow&&v.shadow.map&&(v.shadow.map.texture.format===Ti?z=v.shadow.map.texture:z=v.shadow.map.depthTexture||v.shadow.map.texture),v.isAmbientLight)u+=E.r*k,f+=E.g*k,d+=E.b*k;else if(v.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(v.sh.coefficients[K],k);I++}else if(v.isDirectionalLight){const K=e.get(v);if(K.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){const W=v.shadow,j=t.get(v);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=z,i.directionalShadowMatrix[g]=v.shadow.matrix,C++}i.directional[g]=K,g++}else if(v.isSpotLight){const K=e.get(v);K.position.setFromMatrixPosition(v.matrixWorld),K.color.copy(E).multiplyScalar(k),K.distance=X,K.coneCos=Math.cos(v.angle),K.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),K.decay=v.decay,i.spot[M]=K;const W=v.shadow;if(v.map&&(i.spotLightMap[P]=v.map,P++,W.updateMatrices(v),v.castShadow&&R++),i.spotLightMatrix[M]=W.matrix,v.castShadow){const j=t.get(v);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,i.spotShadow[M]=j,i.spotShadowMap[M]=z,y++}M++}else if(v.isRectAreaLight){const K=e.get(v);K.color.copy(E).multiplyScalar(k),K.halfWidth.set(v.width*.5,0,0),K.halfHeight.set(0,v.height*.5,0),i.rectArea[p]=K,p++}else if(v.isPointLight){const K=e.get(v);if(K.color.copy(v.color).multiplyScalar(v.intensity),K.distance=v.distance,K.decay=v.decay,v.castShadow){const W=v.shadow,j=t.get(v);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,j.shadowCameraNear=W.camera.near,j.shadowCameraFar=W.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=z,i.pointShadowMatrix[m]=v.shadow.matrix,L++}i.point[m]=K,m++}else if(v.isHemisphereLight){const K=e.get(v);K.skyColor.copy(v.color).multiplyScalar(k),K.groundColor.copy(v.groundColor).multiplyScalar(k),i.hemi[h]=K,h++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==g||x.pointLength!==m||x.spotLength!==M||x.rectAreaLength!==p||x.hemiLength!==h||x.numDirectionalShadows!==C||x.numPointShadows!==L||x.numSpotShadows!==y||x.numSpotMaps!==P||x.numLightProbes!==I)&&(i.directional.length=g,i.spot.length=M,i.rectArea.length=p,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=L,i.pointShadowMap.length=L,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=L,i.spotLightMatrix.length=y+P-R,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=I,x.directionalLength=g,x.pointLength=m,x.spotLength=M,x.rectAreaLength=p,x.hemiLength=h,x.numDirectionalShadows=C,x.numPointShadows=L,x.numSpotShadows=y,x.numSpotMaps=P,x.numLightProbes=I,i.version=eg++)}function l(c,u){let f=0,d=0,g=0,m=0,M=0;const p=u.matrixWorldInverse;for(let h=0,C=c.length;h<C;h++){const L=c[h];if(L.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(L.matrixWorld),r.setFromMatrixPosition(L.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),f++}else if(L.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(L.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(L.matrixWorld),r.setFromMatrixPosition(L.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),g++}else if(L.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(L.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(L.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(L.width*.5,0,0),y.halfHeight.set(0,L.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(L.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(L.matrixWorld),y.position.applyMatrix4(p),d++}else if(L.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(L.matrixWorld),y.direction.transformDirection(p),M++}}}return{setup:o,setupView:l,state:i}}function gc(n){const e=new ng(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ig(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new gc(n),e.set(r,[o])):s>=a.length?(o=new gc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const rg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ag=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],og=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],_c=new rt,Sr=new B,ya=new B;function lg(n,e,t){let i=new Jo;const r=new ze,s=new ze,a=new lt,o=new _f,l=new vf,c={},u=t.maxTextureSize,f={[li]:Vt,[Vt]:li,[Nn]:Nn},d=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:rg,fragmentShader:sg}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const m=new fn;m.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new At(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ms;let h=this.type;this.render=function(R,I,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===Oc&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ms);const b=n.getRenderTarget(),T=n.getActiveCubeFace(),v=n.getActiveMipmapLevel(),E=n.state;E.setBlending(zn),E.buffers.depth.getReversed()===!0?E.buffers.color.setClear(0,0,0,0):E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);const k=h!==this.type;k&&I.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(z=>z.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,z=R.length;X<z;X++){const K=R[X],W=K.shadow;if(W===void 0){Ce("WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const j=W.getFrameExtents();r.multiply(j),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,W.mapSize.y=s.y));const te=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=te,W.map===null||k===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Er){if(K.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new An(r.x,r.y,{format:Ti,type:Hn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),W.map.texture.name=K.name+".shadowMap",W.map.depthTexture=new ar(r.x,r.y,ln),W.map.depthTexture.name=K.name+".shadowMapDepth",W.map.depthTexture.format=Vn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt}else K.isPointLight?(W.map=new hu(r.x),W.map.depthTexture=new df(r.x,wn)):(W.map=new An(r.x,r.y),W.map.depthTexture=new ar(r.x,r.y,wn)),W.map.depthTexture.name=K.name+".shadowMap",W.map.depthTexture.format=Vn,this.type===ms?(W.map.depthTexture.compareFunction=te?qo:Xo,W.map.depthTexture.minFilter=Dt,W.map.depthTexture.magFilter=Dt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt);W.camera.updateProjectionMatrix()}const fe=W.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<fe;ge++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(W.map),n.clear());const xe=W.getViewport(ge);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),E.viewport(a)}if(K.isPointLight){const xe=W.camera,qe=W.matrix,ct=K.distance||xe.far;ct!==xe.far&&(xe.far=ct,xe.updateProjectionMatrix()),Sr.setFromMatrixPosition(K.matrixWorld),xe.position.copy(Sr),ya.copy(xe.position),ya.add(ag[ge]),xe.up.copy(og[ge]),xe.lookAt(ya),xe.updateMatrixWorld(),qe.makeTranslation(-Sr.x,-Sr.y,-Sr.z),_c.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),W._frustum.setFromProjectionMatrix(_c,xe.coordinateSystem,xe.reversedDepth)}else W.updateMatrices(K);i=W.getFrustum(),y(I,x,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===Er&&C(W,x),W.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(b,T,v)};function C(R,I){const x=e.update(M);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new An(r.x,r.y,{format:Ti,type:Hn})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(I,null,x,d,M,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(I,null,x,g,M,null)}function L(R,I,x,b){let T=null;const v=x.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(v!==void 0)T=v;else if(T=x.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const E=T.uuid,k=I.uuid;let X=c[E];X===void 0&&(X={},c[E]=X);let z=X[k];z===void 0&&(z=T.clone(),X[k]=z,I.addEventListener("dispose",P)),T=z}if(T.visible=I.visible,T.wireframe=I.wireframe,b===Er?T.side=I.shadowSide!==null?I.shadowSide:I.side:T.side=I.shadowSide!==null?I.shadowSide:f[I.side],T.alphaMap=I.alphaMap,T.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,T.map=I.map,T.clipShadows=I.clipShadows,T.clippingPlanes=I.clippingPlanes,T.clipIntersection=I.clipIntersection,T.displacementMap=I.displacementMap,T.displacementScale=I.displacementScale,T.displacementBias=I.displacementBias,T.wireframeLinewidth=I.wireframeLinewidth,T.linewidth=I.linewidth,x.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const E=n.properties.get(T);E.light=x}return T}function y(R,I,x,b,T){if(R.visible===!1)return;if(R.layers.test(I.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&T===Er)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,R.matrixWorld);const k=e.update(R),X=R.material;if(Array.isArray(X)){const z=k.groups;for(let K=0,W=z.length;K<W;K++){const j=z[K],te=X[j.materialIndex];if(te&&te.visible){const fe=L(R,te,b,T);R.onBeforeShadow(n,R,I,x,k,fe,j),n.renderBufferDirect(x,null,k,fe,R,j),R.onAfterShadow(n,R,I,x,k,fe,j)}}}else if(X.visible){const z=L(R,X,b,T);R.onBeforeShadow(n,R,I,x,k,z,null),n.renderBufferDirect(x,null,k,z,R,null),R.onAfterShadow(n,R,I,x,k,z,null)}}const E=R.children;for(let k=0,X=E.length;k<X;k++)y(E[k],I,x,b,T)}function P(R){R.target.removeEventListener("dispose",P);for(const x in c){const b=c[x],T=R.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}function cg(n,e){function t(){let U=!1;const re=new lt;let Z=null;const ce=new lt(0,0,0,0);return{setMask:function(me){Z!==me&&!U&&(n.colorMask(me,me,me,me),Z=me)},setLocked:function(me){U=me},setClear:function(me,ee,be,Me,dt){dt===!0&&(me*=Me,ee*=Me,be*=Me),re.set(me,ee,be,Me),ce.equals(re)===!1&&(n.clearColor(me,ee,be,Me),ce.copy(re))},reset:function(){U=!1,Z=null,ce.set(-1,0,0,0)}}}function i(){let U=!1,re=!1,Z=null,ce=null,me=null;return{setReversed:function(ee){if(re!==ee){const be=e.get("EXT_clip_control");ee?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=ee;const Me=me;me=null,this.setClear(Me)}},getReversed:function(){return re},setTest:function(ee){ee?ne(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ee){Z!==ee&&!U&&(n.depthMask(ee),Z=ee)},setFunc:function(ee){if(re&&(ee=kd[ee]),ce!==ee){switch(ee){case Oa:n.depthFunc(n.NEVER);break;case Ba:n.depthFunc(n.ALWAYS);break;case ka:n.depthFunc(n.LESS);break;case rr:n.depthFunc(n.LEQUAL);break;case za:n.depthFunc(n.EQUAL);break;case Ga:n.depthFunc(n.GEQUAL);break;case Ha:n.depthFunc(n.GREATER);break;case Va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=ee}},setLocked:function(ee){U=ee},setClear:function(ee){me!==ee&&(me=ee,re&&(ee=1-ee),n.clearDepth(ee))},reset:function(){U=!1,Z=null,ce=null,me=null,re=!1}}}function r(){let U=!1,re=null,Z=null,ce=null,me=null,ee=null,be=null,Me=null,dt=null;return{setTest:function(st){U||(st?ne(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(st){re!==st&&!U&&(n.stencilMask(st),re=st)},setFunc:function(st,hn,pn){(Z!==st||ce!==hn||me!==pn)&&(n.stencilFunc(st,hn,pn),Z=st,ce=hn,me=pn)},setOp:function(st,hn,pn){(ee!==st||be!==hn||Me!==pn)&&(n.stencilOp(st,hn,pn),ee=st,be=hn,Me=pn)},setLocked:function(st){U=st},setClear:function(st){dt!==st&&(n.clearStencil(st),dt=st)},reset:function(){U=!1,re=null,Z=null,ce=null,me=null,ee=null,be=null,Me=null,dt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},g=new WeakMap,m=[],M=null,p=!1,h=null,C=null,L=null,y=null,P=null,R=null,I=null,x=new We(0,0,0),b=0,T=!1,v=null,E=null,k=null,X=null,z=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(te)[1]),W=j>=1):te.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),W=j>=2);let fe=null,ge={};const xe=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),ct=new lt().fromArray(xe),Ye=new lt().fromArray(qe);function Q(U,re,Z,ce){const me=new Uint8Array(4),ee=n.createTexture();n.bindTexture(U,ee),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<Z;be++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(re+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return ee}const se={};se[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(rr),_t(!1),Mt(ml),ne(n.CULL_FACE),Ke(zn);function ne(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Pe(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Le(U,re){return d[U]!==re?(n.bindFramebuffer(U,re),d[U]=re,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=re),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=re),!0):!1}function we(U,re){let Z=m,ce=!1;if(U){Z=g.get(re),Z===void 0&&(Z=[],g.set(re,Z));const me=U.textures;if(Z.length!==me.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,be=me.length;ee<be;ee++)Z[ee]=n.COLOR_ATTACHMENT0+ee;Z.length=me.length,ce=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,ce=!0);ce&&n.drawBuffers(Z)}function ht(U){return M!==U?(n.useProgram(U),M=U,!0):!1}const ke={[_i]:n.FUNC_ADD,[ld]:n.FUNC_SUBTRACT,[cd]:n.FUNC_REVERSE_SUBTRACT};ke[ud]=n.MIN,ke[dd]=n.MAX;const tt={[fd]:n.ZERO,[hd]:n.ONE,[pd]:n.SRC_COLOR,[Na]:n.SRC_ALPHA,[Md]:n.SRC_ALPHA_SATURATE,[vd]:n.DST_COLOR,[gd]:n.DST_ALPHA,[md]:n.ONE_MINUS_SRC_COLOR,[Fa]:n.ONE_MINUS_SRC_ALPHA,[xd]:n.ONE_MINUS_DST_COLOR,[_d]:n.ONE_MINUS_DST_ALPHA,[Sd]:n.CONSTANT_COLOR,[bd]:n.ONE_MINUS_CONSTANT_COLOR,[yd]:n.CONSTANT_ALPHA,[Ed]:n.ONE_MINUS_CONSTANT_ALPHA};function Ke(U,re,Z,ce,me,ee,be,Me,dt,st){if(U===zn){p===!0&&(Pe(n.BLEND),p=!1);return}if(p===!1&&(ne(n.BLEND),p=!0),U!==od){if(U!==h||st!==T){if((C!==_i||P!==_i)&&(n.blendEquation(n.FUNC_ADD),C=_i,P=_i),st)switch(U){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFunc(n.ONE,n.ONE);break;case _l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ve("WebGLState: Invalid blending: ",U);break}else switch(U){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case _l:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",U);break}L=null,y=null,R=null,I=null,x.set(0,0,0),b=0,h=U,T=st}return}me=me||re,ee=ee||Z,be=be||ce,(re!==C||me!==P)&&(n.blendEquationSeparate(ke[re],ke[me]),C=re,P=me),(Z!==L||ce!==y||ee!==R||be!==I)&&(n.blendFuncSeparate(tt[Z],tt[ce],tt[ee],tt[be]),L=Z,y=ce,R=ee,I=be),(Me.equals(x)===!1||dt!==b)&&(n.blendColor(Me.r,Me.g,Me.b,dt),x.copy(Me),b=dt),h=U,T=!1}function $e(U,re){U.side===Nn?Pe(n.CULL_FACE):ne(n.CULL_FACE);let Z=U.side===Vt;re&&(Z=!Z),_t(Z),U.blending===er&&U.transparent===!1?Ke(zn):Ke(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ce=U.stencilWrite;o.setTest(ce),ce&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),wt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function _t(U){v!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),v=U)}function Mt(U){U!==sd?(ne(n.CULL_FACE),U!==E&&(U===ml?n.cullFace(n.BACK):U===ad?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),E=U}function yt(U){U!==k&&(W&&n.lineWidth(U),k=U)}function wt(U,re,Z){U?(ne(n.POLYGON_OFFSET_FILL),(X!==re||z!==Z)&&(X=re,z=Z,a.getReversed()&&(re=-re),n.polygonOffset(re,Z))):Pe(n.POLYGON_OFFSET_FILL)}function ut(U){U?ne(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function vt(U){U===void 0&&(U=n.TEXTURE0+K-1),fe!==U&&(n.activeTexture(U),fe=U)}function N(U,re,Z){Z===void 0&&(fe===null?Z=n.TEXTURE0+K-1:Z=fe);let ce=ge[Z];ce===void 0&&(ce={type:void 0,texture:void 0},ge[Z]=ce),(ce.type!==U||ce.texture!==re)&&(fe!==Z&&(n.activeTexture(Z),fe=Z),n.bindTexture(U,re||se[U]),ce.type=U,ce.texture=re)}function kt(){const U=ge[fe];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Je(){try{n.compressedTexImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function _(){try{n.texSubImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function O(){try{n.texSubImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function ie(){try{n.texStorage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function ae(){try{n.texStorage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function Y(){try{n.texImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function J(){try{n.texImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function oe(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function ye(U,re){f[U]!==re&&(n.pixelStorei(U,re),f[U]=re)}function ue(U){ct.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ct.copy(U))}function le(U){Ye.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Ye.copy(U))}function Ae(U,re){let Z=c.get(re);Z===void 0&&(Z=new WeakMap,c.set(re,Z));let ce=Z.get(U);ce===void 0&&(ce=n.getUniformBlockIndex(re,U.name),Z.set(U,ce))}function Re(U,re){const ce=c.get(re).get(U);l.get(re)!==ce&&(n.uniformBlockBinding(re,ce,U.__bindingPointIndex),l.set(re,ce))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},fe=null,ge={},d={},g=new WeakMap,m=[],M=null,p=!1,h=null,C=null,L=null,y=null,P=null,R=null,I=null,x=new We(0,0,0),b=0,T=!1,v=null,E=null,k=null,X=null,z=null,ct.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Pe,bindFramebuffer:Le,drawBuffers:we,useProgram:ht,setBlending:Ke,setMaterial:$e,setFlipSided:_t,setCullFace:Mt,setLineWidth:yt,setPolygonOffset:wt,setScissorTest:ut,activeTexture:vt,bindTexture:N,unbindTexture:kt,compressedTexImage2D:Je,compressedTexImage3D:A,texImage2D:Y,texImage3D:J,pixelStorei:ye,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ie,texStorage3D:ae,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:ue,viewport:le,reset:De}}function ug(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap,f=new Set;let d;const g=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(A,_){return m?new OffscreenCanvas(A,_):Cs("canvas")}function p(A,_,O){let V=1;const q=Je(A);if((q.width>O||q.height>O)&&(V=O/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ie=Math.floor(V*q.width),ae=Math.floor(V*q.height);d===void 0&&(d=M(ie,ae));const Y=_?M(ie,ae):d;return Y.width=ie,Y.height=ae,Y.getContext("2d").drawImage(A,0,0,ie,ae),Ce("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ie+"x"+ae+")."),Y}else return"data"in A&&Ce("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function h(A){return A.generateMipmaps}function C(A){n.generateMipmap(A)}function L(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(A,_,O,V,q,ie=!1){if(A!==null){if(n[A]!==void 0)return n[A];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ae;V&&(ae=e.get("EXT_texture_norm16"),ae||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===n.RED&&(O===n.FLOAT&&(Y=n.R32F),O===n.HALF_FLOAT&&(Y=n.R16F),O===n.UNSIGNED_BYTE&&(Y=n.R8),O===n.UNSIGNED_SHORT&&ae&&(Y=ae.R16_EXT),O===n.SHORT&&ae&&(Y=ae.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.R8UI),O===n.UNSIGNED_SHORT&&(Y=n.R16UI),O===n.UNSIGNED_INT&&(Y=n.R32UI),O===n.BYTE&&(Y=n.R8I),O===n.SHORT&&(Y=n.R16I),O===n.INT&&(Y=n.R32I)),_===n.RG&&(O===n.FLOAT&&(Y=n.RG32F),O===n.HALF_FLOAT&&(Y=n.RG16F),O===n.UNSIGNED_BYTE&&(Y=n.RG8),O===n.UNSIGNED_SHORT&&ae&&(Y=ae.RG16_EXT),O===n.SHORT&&ae&&(Y=ae.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RG8UI),O===n.UNSIGNED_SHORT&&(Y=n.RG16UI),O===n.UNSIGNED_INT&&(Y=n.RG32UI),O===n.BYTE&&(Y=n.RG8I),O===n.SHORT&&(Y=n.RG16I),O===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),O===n.UNSIGNED_INT&&(Y=n.RGB32UI),O===n.BYTE&&(Y=n.RGB8I),O===n.SHORT&&(Y=n.RGB16I),O===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),O===n.UNSIGNED_INT&&(Y=n.RGBA32UI),O===n.BYTE&&(Y=n.RGBA8I),O===n.SHORT&&(Y=n.RGBA16I),O===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&ae&&(Y=ae.RGB16_EXT),O===n.SHORT&&ae&&(Y=ae.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),_===n.RGBA){const J=ie?Rs:Ge.getTransfer(q);O===n.FLOAT&&(Y=n.RGBA32F),O===n.HALF_FLOAT&&(Y=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Y=J===Qe?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&ae&&(Y=ae.RGBA16_EXT),O===n.SHORT&&ae&&(Y=ae.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function P(A,_){let O;return A?_===null||_===wn||_===Lr?O=n.DEPTH24_STENCIL8:_===ln?O=n.DEPTH32F_STENCIL8:_===Ir&&(O=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===wn||_===Lr?O=n.DEPTH_COMPONENT24:_===ln?O=n.DEPTH_COMPONENT32F:_===Ir&&(O=n.DEPTH_COMPONENT16),O}function R(A,_){return h(A)===!0||A.isFramebufferTexture&&A.minFilter!==Rt&&A.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function I(A){const _=A.target;_.removeEventListener("dispose",I),b(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function x(A){const _=A.target;_.removeEventListener("dispose",x),v(_)}function b(A){const _=i.get(A);if(_.__webglInit===void 0)return;const O=A.source,V=g.get(O);if(V){const q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&T(A),Object.keys(V).length===0&&g.delete(O)}i.remove(A)}function T(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const O=A.source,V=g.get(O);delete V[_.__cacheKey],a.memory.textures--}function v(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)n.deleteFramebuffer(_.__webglFramebuffer[V][q]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=A.textures;for(let V=0,q=O.length;V<q;V++){const ie=i.get(O[V]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(O[V])}i.remove(A)}let E=0;function k(){E=0}function X(){return E}function z(A){E=A}function K(){const A=E;return A>=r.maxTextures&&Ce("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),E+=1,A}function W(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function j(A,_){const O=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const V=A.image;if(V===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(O,A,_);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function te(A,_){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Pe(O,A,_);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function fe(A,_){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Pe(O,A,_);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function ge(A,_){const O=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Le(O,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}const xe={[Es]:n.REPEAT,[On]:n.CLAMP_TO_EDGE,[Wa]:n.MIRRORED_REPEAT},qe={[Rt]:n.NEAREST,[wd]:n.NEAREST_MIPMAP_NEAREST,[$r]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Xs]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},ct={[Pd]:n.NEVER,[Nd]:n.ALWAYS,[Id]:n.LESS,[Xo]:n.LEQUAL,[Ld]:n.EQUAL,[qo]:n.GEQUAL,[Dd]:n.GREATER,[Ud]:n.NOTEQUAL};function Ye(A,_){if(_.type===ln&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===Xs||_.magFilter===$r||_.magFilter===Mi||_.minFilter===Dt||_.minFilter===Xs||_.minFilter===$r||_.minFilter===Mi)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,xe[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,xe[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,xe[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,qe[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,qe[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ct[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Rt||_.minFilter!==$r&&_.minFilter!==Mi||_.type===ln&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Q(A,_){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",I));const V=_.source;let q=g.get(V);q===void 0&&(q={},g.set(V,q));const ie=W(_);if(ie!==A.__cacheKey){q[ie]===void 0&&(q[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[ie].usedTimes++;const ae=q[A.__cacheKey];ae!==void 0&&(q[A.__cacheKey].usedTimes--,ae.usedTimes===0&&T(_)),A.__cacheKey=ie,A.__webglTexture=q[ie].texture}return O}function se(A,_,O){return Math.floor(Math.floor(A/O)/_)}function ne(A,_,O,V){const ie=A.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,V,_.data);else{ie.sort((ye,ue)=>ye.start-ue.start);let ae=0;for(let ye=1;ye<ie.length;ye++){const ue=ie[ae],le=ie[ye],Ae=ue.start+ue.count,Re=se(le.start,_.width,4),De=se(ue.start,_.width,4);le.start<=Ae+1&&Re===De&&se(le.start+le.count-1,_.width,4)===Re?ue.count=Math.max(ue.count,le.start+le.count-ue.start):(++ae,ie[ae]=le)}ie.length=ae+1;const Y=t.getParameter(n.UNPACK_ROW_LENGTH),J=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ye=0,ue=ie.length;ye<ue;ye++){const le=ie[ye],Ae=Math.floor(le.start/4),Re=Math.ceil(le.count/4),De=Ae%_.width,U=Math.floor(Ae/_.width),re=Re,Z=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,De,U,re,Z,O,V,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Y),t.pixelStorei(n.UNPACK_SKIP_PIXELS,J),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Pe(A,_,O){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const q=Q(A,_),ie=_.source;t.bindTexture(V,A.__webglTexture,n.TEXTURE0+O);const ae=i.get(ie);if(ie.version!==ae.__version||q===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const Z=Ge.getPrimaries(Ge.workingColorSpace),ce=_.colorSpace===ri?null:Ge.getPrimaries(_.colorSpace),me=_.colorSpace===ri||Z===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let J=p(_.image,!1,r.maxTextureSize);J=kt(_,J);const oe=s.convert(_.format,_.colorSpace),ye=s.convert(_.type);let ue=y(_.internalFormat,oe,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ye(V,_);let le;const Ae=_.mipmaps,Re=_.isVideoTexture!==!0,De=ae.__version===void 0||q===!0,U=ie.dataReady,re=R(_,J);if(_.isDepthTexture)ue=P(_.format===Si,_.type),De&&(Re?t.texStorage2D(n.TEXTURE_2D,1,ue,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,ue,J.width,J.height,0,oe,ye,null));else if(_.isDataTexture)if(Ae.length>0){Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],Re?U&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,Z,ue,le.width,le.height,0,oe,ye,le.data);_.generateMipmaps=!1}else Re?(De&&t.texStorage2D(n.TEXTURE_2D,re,ue,J.width,J.height),U&&ne(_,J,oe,ye)):t.texImage2D(n.TEXTURE_2D,0,ue,J.width,J.height,0,oe,ye,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Re&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,Ae[0].width,Ae[0].height,J.depth);for(let Z=0,ce=Ae.length;Z<ce;Z++)if(le=Ae[Z],_.format!==cn)if(oe!==null)if(Re){if(U)if(_.layerUpdates.size>0){const me=Yl(le.width,le.height,_.format,_.type);for(const ee of _.layerUpdates){const be=le.data.subarray(ee*me/le.data.BYTES_PER_ELEMENT,(ee+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,ee,le.width,le.height,1,oe,be)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,oe,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,ue,le.width,le.height,J.depth,0,le.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,oe,ye,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Z,ue,le.width,le.height,J.depth,0,oe,ye,le.data)}else{Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],_.format!==cn?oe!==null?Re?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(n.TEXTURE_2D,Z,ue,le.width,le.height,0,le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?U&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,Z,ue,le.width,le.height,0,oe,ye,le.data)}else if(_.isDataArrayTexture)if(Re){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,J.width,J.height,J.depth),U)if(_.layerUpdates.size>0){const Z=Yl(J.width,J.height,_.format,_.type);for(const ce of _.layerUpdates){const me=J.data.subarray(ce*Z/J.data.BYTES_PER_ELEMENT,(ce+1)*Z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,J.width,J.height,1,oe,ye,me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,oe,ye,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,J.width,J.height,J.depth,0,oe,ye,J.data);else if(_.isData3DTexture)Re?(De&&t.texStorage3D(n.TEXTURE_3D,re,ue,J.width,J.height,J.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,oe,ye,J.data)):t.texImage3D(n.TEXTURE_3D,0,ue,J.width,J.height,J.depth,0,oe,ye,J.data);else if(_.isFramebufferTexture){if(De)if(Re)t.texStorage2D(n.TEXTURE_2D,re,ue,J.width,J.height);else{let Z=J.width,ce=J.height;for(let me=0;me<re;me++)t.texImage2D(n.TEXTURE_2D,me,ue,Z,ce,0,oe,ye,null),Z>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const Z=n.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),f.add(_),Z.onpaint=ce=>{const me=ce.changedElements;for(const ee of f)me.includes(ee.image)&&(ee.needsUpdate=!0)},Z.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,J);else{const me=n.RGBA,ee=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,me,ee,be,J)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&De){const Z=Je(Ae[0]);t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height)}for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],Re?U&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,oe,ye,le):t.texImage2D(n.TEXTURE_2D,Z,ue,oe,ye,le);_.generateMipmaps=!1}else if(Re){if(De){const Z=Je(J);t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,ye,J)}else t.texImage2D(n.TEXTURE_2D,0,ue,oe,ye,J);h(_)&&C(V),ae.__version=ie.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Le(A,_,O){if(_.image.length!==6)return;const V=Q(A,_),q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);const ie=i.get(q);if(q.version!==ie.__version||V===!0){t.activeTexture(n.TEXTURE0+O);const ae=Ge.getPrimaries(Ge.workingColorSpace),Y=_.colorSpace===ri?null:Ge.getPrimaries(_.colorSpace),J=_.colorSpace===ri||ae===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let ee=0;ee<6;ee++)!oe&&!ye?ue[ee]=p(_.image[ee],!0,r.maxCubemapSize):ue[ee]=ye?_.image[ee].image:_.image[ee],ue[ee]=kt(_,ue[ee]);const le=ue[0],Ae=s.convert(_.format,_.colorSpace),Re=s.convert(_.type),De=y(_.internalFormat,Ae,Re,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,re=ie.__version===void 0||V===!0,Z=q.dataReady;let ce=R(_,le);Ye(n.TEXTURE_CUBE_MAP,_);let me;if(oe){U&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,le.width,le.height);for(let ee=0;ee<6;ee++){me=ue[ee].mipmaps;for(let be=0;be<me.length;be++){const Me=me[be];_.format!==cn?Ae!==null?U?Z&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,De,Me.width,Me.height,0,Me.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Re,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,De,Me.width,Me.height,0,Ae,Re,Me.data)}}}else{if(me=_.mipmaps,U&&re){me.length>0&&ce++;const ee=Je(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ye){U?Z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ue[ee].width,ue[ee].height,Ae,Re,ue[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,ue[ee].width,ue[ee].height,0,Ae,Re,ue[ee].data);for(let be=0;be<me.length;be++){const dt=me[be].image[ee].image;U?Z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,dt.width,dt.height,Ae,Re,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,De,dt.width,dt.height,0,Ae,Re,dt.data)}}else{U?Z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,Re,ue[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,Ae,Re,ue[ee]);for(let be=0;be<me.length;be++){const Me=me[be];U?Z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,Ae,Re,Me.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,De,Ae,Re,Me.image[ee])}}}h(_)&&C(n.TEXTURE_CUBE_MAP),ie.__version=q.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function we(A,_,O,V,q,ie){const ae=s.convert(O.format,O.colorSpace),Y=s.convert(O.type),J=y(O.internalFormat,ae,Y,O.normalized,O.colorSpace),oe=i.get(_),ye=i.get(O);if(ye.__renderTarget=_,!oe.__hasExternalTextures){const ue=Math.max(1,_.width>>ie),le=Math.max(1,_.height>>ie);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,ie,J,ue,le,_.depth,0,ae,Y,null):t.texImage2D(q,ie,J,ue,le,0,ae,Y,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),vt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,q,ye.__webglTexture,0,ut(_)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,q,ye.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(A,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,ie=P(_.stencilBuffer,q),ae=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;vt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(_),ie,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,A)}else{const V=_.textures;for(let q=0;q<V.length;q++){const ie=V[q],ae=s.convert(ie.format,ie.colorSpace),Y=s.convert(ie.type),J=y(ie.internalFormat,ae,Y,ie.normalized,ie.colorSpace);vt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(_),J,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(_),J,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,J,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(A,_,O){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),ye=s.convert(_.depthTexture.type);let ue;_.depthTexture.format===Vn?ue=n.DEPTH_COMPONENT24:_.depthTexture.format===Si&&(ue=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ue,_.width,_.height,0,oe,ye,null)}}else j(_.depthTexture,0);const ie=q.__webglTexture,ae=ut(_),Y=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,J=_.depthTexture.format===Si?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Vn)vt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,Y,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,J,Y,ie,0);else if(_.depthTexture.format===Si)vt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,Y,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,J,Y,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(A){const _=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)ke(_.__webglFramebuffer[V],A,V);else{const V=A.texture.mipmaps;V&&V.length>0?ke(_.__webglFramebuffer[0],A,0):ke(_.__webglFramebuffer,A,0)}else if(O){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),ht(_.__webglDepthbuffer[V],A,!1);else{const q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ie)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ht(_.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(A,_,O){const V=i.get(A);_!==void 0&&we(V.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&tt(A)}function $e(A){const _=A.texture,O=i.get(A),V=i.get(_);A.addEventListener("dispose",x);const q=A.textures,ie=A.isWebGLCubeRenderTarget===!0,ae=q.length>1;if(ae||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),ie){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let J=0;J<_.mipmaps.length;J++)O.__webglFramebuffer[Y][J]=n.createFramebuffer()}else O.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)O.__webglFramebuffer[Y]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ae)for(let Y=0,J=q.length;Y<J;Y++){const oe=i.get(q[Y]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&vt(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){const J=q[Y];O.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);const oe=s.convert(J.format,J.colorSpace),ye=s.convert(J.type),ue=y(J.internalFormat,oe,ye,J.normalized,J.colorSpace,A.isXRRenderTarget===!0),le=ut(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,ue,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)we(O.__webglFramebuffer[Y][J],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,J);else we(O.__webglFramebuffer[Y],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);h(_)&&C(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let Y=0,J=q.length;Y<J;Y++){const oe=q[Y],ye=i.get(oe);let ue=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ue=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ye.__webglTexture),Ye(ue,oe),we(O.__webglFramebuffer,A,oe,n.COLOR_ATTACHMENT0+Y,ue,0),h(oe)&&C(ue)}t.unbindTexture()}else{let Y=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Ye(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)we(O.__webglFramebuffer[J],A,_,n.COLOR_ATTACHMENT0,Y,J);else we(O.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,Y,0);h(_)&&C(Y),t.unbindTexture()}A.depthBuffer&&tt(A)}function _t(A){const _=A.textures;for(let O=0,V=_.length;O<V;O++){const q=_[O];if(h(q)){const ie=L(A),ae=i.get(q).__webglTexture;t.bindTexture(ie,ae),C(ie),t.unbindTexture()}}}const Mt=[],yt=[];function wt(A){if(A.samples>0){if(vt(A)===!1){const _=A.textures,O=A.width,V=A.height;let q=n.COLOR_BUFFER_BIT;const ie=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(A),Y=_.length>1;if(Y)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const J=A.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,q,n.NEAREST),l===!0&&(Mt.length=0,yt.length=0,Mt.push(n.COLOR_ATTACHMENT0+oe),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Mt.push(ie),yt.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ut(A){return Math.min(r.maxSamples,A.samples)}function vt(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(A){const _=a.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function kt(A,_){const O=A.colorSpace,V=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==ws&&O!==ri&&(Ge.getTransfer(O)===Qe?(V!==cn||q!==qt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",O)),_}function Je(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=k,this.getTextureUnits=X,this.setTextureUnits=z,this.setTexture2D=j,this.setTexture2DArray=te,this.setTexture3D=fe,this.setTextureCube=ge,this.rebindTextures=Ke,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dg(n,e){function t(i,r=ri){let s;const a=Ge.getTransfer(r);if(i===qt)return n.UNSIGNED_BYTE;if(i===zo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Go)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Xc)return n.BYTE;if(i===qc)return n.SHORT;if(i===Ir)return n.UNSIGNED_SHORT;if(i===ko)return n.INT;if(i===wn)return n.UNSIGNED_INT;if(i===ln)return n.FLOAT;if(i===Hn)return n.HALF_FLOAT;if(i===Zc)return n.ALPHA;if(i===Jc)return n.RGB;if(i===cn)return n.RGBA;if(i===Vn)return n.DEPTH_COMPONENT;if(i===Si)return n.DEPTH_STENCIL;if(i===Ho)return n.RED;if(i===Vo)return n.RED_INTEGER;if(i===Ti)return n.RG;if(i===Wo)return n.RG_INTEGER;if(i===$o)return n.RGBA_INTEGER;if(i===gs||i===_s||i===vs||i===xs)if(a===Qe)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_s)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$a||i===Xa||i===qa||i===Ya)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$a)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ka||i===Za||i===Ja||i===Qa||i===ja||i===Ts||i===eo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ka||i===Za)return a===Qe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ja)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Qa)return s.COMPRESSED_R11_EAC;if(i===ja)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ts)return s.COMPRESSED_RG11_EAC;if(i===eo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo||i===co||i===uo||i===fo||i===ho||i===po||i===mo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===to)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===no)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===io)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ro)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===so)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ao)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===oo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===lo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===co)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===uo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ho)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===po)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===mo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===go||i===_o||i===vo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===go)return a===Qe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_o)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===vo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xo||i===Mo||i===As||i===So)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===xo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Mo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===As)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===So)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const fg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new au(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Rn({vertexShader:fg,fragmentShader:hg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new dr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mg extends wi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,g=null,m=null;const M=typeof XRWebGLBinding<"u",p=new pg,h={},C=t.getContextAttributes();let L=null,y=null;const P=[],R=[],I=new ze;let x=null;const b=new an;b.viewport=new lt;const T=new an;T.viewport=new lt;const v=[b,T],E=new Ef;let k=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=P[Q];return se===void 0&&(se=new ea,P[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=P[Q];return se===void 0&&(se=new ea,P[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=P[Q];return se===void 0&&(se=new ea,P[Q]=se),se.getHandSpace()};function z(Q){const se=R.indexOf(Q.inputSource);if(se===-1)return;const ne=P[se];ne!==void 0&&(ne.update(Q.inputSource,Q.frame,c||a),ne.dispatchEvent({type:Q.type,data:Q.inputSource}))}function K(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",W);for(let Q=0;Q<P.length;Q++){const se=R[Q];se!==null&&(R[Q]=null,P[Q].disconnect(se))}k=null,X=null,p.reset();for(const Q in h)delete h[Q];e.setRenderTarget(L),g=null,d=null,f=null,r=null,y=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(L=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",K),r.addEventListener("inputsourceschange",W),C.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(I),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,Pe=null,Le=null;C.depth&&(Le=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=C.stencil?Si:Vn,Pe=C.stencil?Lr:wn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(we),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new An(d.textureWidth,d.textureHeight,{format:cn,type:qt,depthTexture:new ar(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ne={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new An(g.framebufferWidth,g.framebufferHeight,{format:cn,type:qt,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function W(Q){for(let se=0;se<Q.removed.length;se++){const ne=Q.removed[se],Pe=R.indexOf(ne);Pe>=0&&(R[Pe]=null,P[Pe].disconnect(ne))}for(let se=0;se<Q.added.length;se++){const ne=Q.added[se];let Pe=R.indexOf(ne);if(Pe===-1){for(let we=0;we<P.length;we++)if(we>=R.length){R.push(ne),Pe=we;break}else if(R[we]===null){R[we]=ne,Pe=we;break}if(Pe===-1)break}const Le=P[Pe];Le&&Le.connect(ne)}}const j=new B,te=new B;function fe(Q,se,ne){j.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(ne.matrixWorld);const Pe=j.distanceTo(te),Le=se.projectionMatrix.elements,we=ne.projectionMatrix.elements,ht=Le[14]/(Le[10]-1),ke=Le[14]/(Le[10]+1),tt=(Le[9]+1)/Le[5],Ke=(Le[9]-1)/Le[5],$e=(Le[8]-1)/Le[0],_t=(we[8]+1)/we[0],Mt=ht*$e,yt=ht*_t,wt=Pe/(-$e+_t),ut=wt*-$e;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(ut),Q.translateZ(wt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Le[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const vt=ht+wt,N=ke+wt,kt=Mt-ut,Je=yt+(Pe-ut),A=tt*ke/N*vt,_=Ke*ke/N*vt;Q.projectionMatrix.makePerspective(kt,Je,A,_,vt,N),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ge(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let se=Q.near,ne=Q.far;p.texture!==null&&(p.depthNear>0&&(se=p.depthNear),p.depthFar>0&&(ne=p.depthFar)),E.near=T.near=b.near=se,E.far=T.far=b.far=ne,(k!==E.near||X!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),k=E.near,X=E.far),E.layers.mask=Q.layers.mask|6,b.layers.mask=E.layers.mask&-5,T.layers.mask=E.layers.mask&-3;const Pe=Q.parent,Le=E.cameras;ge(E,Pe);for(let we=0;we<Le.length;we++)ge(Le[we],Pe);Le.length===2?fe(E,b,T):E.projectionMatrix.copy(b.projectionMatrix),xe(Q,E,Pe)};function xe(Q,se,ne){ne===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(ne.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=yo*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(E)},this.getCameraTexture=function(Q){return h[Q]};let qe=null;function ct(Q,se){if(u=se.getViewerPose(c||a),m=se,u!==null){const ne=u.views;g!==null&&(e.setRenderTargetFramebuffer(y,g.framebuffer),e.setRenderTarget(y));let Pe=!1;ne.length!==E.cameras.length&&(E.cameras.length=0,Pe=!0);for(let ke=0;ke<ne.length;ke++){const tt=ne[ke];let Ke=null;if(g!==null)Ke=g.getViewport(tt);else{const _t=f.getViewSubImage(d,tt);Ke=_t.viewport,ke===0&&(e.setRenderTargetTextures(y,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(y))}let $e=v[ke];$e===void 0&&($e=new an,$e.layers.enable(ke),$e.viewport=new lt,v[ke]=$e),$e.matrix.fromArray(tt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(tt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(E.matrix.copy($e.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Pe===!0&&E.cameras.push($e)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const ke=f.getDepthInformation(ne[0]);ke&&ke.isValid&&ke.texture&&p.init(ke,r.renderState)}if(Le&&Le.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let ke=0;ke<ne.length;ke++){const tt=ne[ke].camera;if(tt){let Ke=h[tt];Ke||(Ke=new au,h[tt]=Ke);const $e=f.getCameraImage(tt);Ke.sourceTexture=$e}}}}for(let ne=0;ne<P.length;ne++){const Pe=R[ne],Le=P[ne];Pe!==null&&Le!==void 0&&Le.update(Pe,se,c||a)}qe&&qe(Q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),m=null}const Ye=new du;Ye.setAnimationLoop(ct),this.setAnimationLoop=function(Q){qe=Q},this.dispose=function(){}}}const gg=new rt,vu=new Ie;vu.set(-1,0,0,0,1,0,0,0,1);function _g(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,ou(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,C,L,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(p,h):h.isMeshLambertMaterial?(s(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&g(p,h,y)):h.isMeshMatcapMaterial?(s(p,h),m(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),M(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,C,L):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Vt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Vt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const C=e.get(h),L=C.envMap,y=C.envMapRotation;L&&(p.envMap.value=L,p.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(y)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(vu),p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,C,L){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*C,p.scale.value=L*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function g(p,h,C){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Vt&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=C.texture,p.transmissionSamplerSize.value.set(C.width,C.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,h){h.matcap&&(p.matcap.value=h.matcap)}function M(p,h){const C=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(C.matrixWorld),p.nearDistance.value=C.shadow.camera.near,p.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vg(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,P){const R=P.program;i.uniformBlockBinding(y,R)}function c(y,P){let R=r[y.id];R===void 0&&(p(y),R=u(y),r[y.id]=R,y.addEventListener("dispose",C));const I=P.program;i.updateUBOMapping(y,I);const x=e.render.frame;s[y.id]!==x&&(d(y),s[y.id]=x)}function u(y){const P=f();y.__bindingPointIndex=P;const R=n.createBuffer(),I=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,I,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,P,R),R}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const P=r[y.id],R=y.uniforms,I=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,P);for(let x=0,b=R.length;x<b;x++){const T=R[x];if(Array.isArray(T))for(let v=0,E=T.length;v<E;v++)g(T[v],x,v,I);else g(T,x,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,P,R,I){if(M(y,P,R,I)===!0){const x=y.__offset,b=y.value;if(Array.isArray(b)){let T=0;for(let v=0;v<b.length;v++){const E=b[v],k=h(E);m(E,y.__data,T),typeof E!="number"&&typeof E!="boolean"&&!E.isMatrix3&&!ArrayBuffer.isView(E)&&(T+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(b,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function m(y,P,R){typeof y=="number"||typeof y=="boolean"?P[0]=y:y.isMatrix3?(P[0]=y.elements[0],P[1]=y.elements[1],P[2]=y.elements[2],P[3]=0,P[4]=y.elements[3],P[5]=y.elements[4],P[6]=y.elements[5],P[7]=0,P[8]=y.elements[6],P[9]=y.elements[7],P[10]=y.elements[8],P[11]=0):ArrayBuffer.isView(y)?P.set(new y.constructor(y.buffer,y.byteOffset,P.length)):y.toArray(P,R)}function M(y,P,R,I){const x=y.value,b=P+"_"+R;if(I[b]===void 0)return typeof x=="number"||typeof x=="boolean"?I[b]=x:ArrayBuffer.isView(x)?I[b]=x.slice():I[b]=x.clone(),!0;{const T=I[b];if(typeof x=="number"||typeof x=="boolean"){if(T!==x)return I[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(T.equals(x)===!1)return T.copy(x),!0}}return!1}function p(y){const P=y.uniforms;let R=0;const I=16;for(let b=0,T=P.length;b<T;b++){const v=Array.isArray(P[b])?P[b]:[P[b]];for(let E=0,k=v.length;E<k;E++){const X=v[E],z=Array.isArray(X.value)?X.value:[X.value];for(let K=0,W=z.length;K<W;K++){const j=z[K],te=h(j),fe=R%I,ge=fe%te.boundary,xe=fe+ge;R+=ge,xe!==0&&I-xe<te.storage&&(R+=I-xe),X.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=te.storage}}}const x=R%I;return x>0&&(R+=I-x),y.__size=R,y.__cache={},this}function h(y){const P={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(P.boundary=4,P.storage=4):y.isVector2?(P.boundary=8,P.storage=8):y.isVector3||y.isColor?(P.boundary=16,P.storage=12):y.isVector4?(P.boundary=16,P.storage=16):y.isMatrix3?(P.boundary=48,P.storage=48):y.isMatrix4?(P.boundary=64,P.storage=64):y.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(P.boundary=16,P.storage=y.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",y),P}function C(y){const P=y.target;P.removeEventListener("dispose",C);const R=a.indexOf(P.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[P.id]),delete r[P.id],delete s[P.id]}function L(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:L}}const xg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function Mg(){return _n===null&&(_n=new Zo(xg,16,16,Ti,Hn),_n.name="DFG_LUT",_n.minFilter=Dt,_n.magFilter=Dt,_n.wrapS=On,_n.wrapT=On,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class Sg{constructor(e={}){const{canvas:t=Od(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=qt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=g,p=new Set([$o,Wo,Vo]),h=new Set([qt,wn,Ir,Lr,zo,Go]),C=new Uint32Array(4),L=new Int32Array(4),y=new B;let P=null,R=null;const I=[],x=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let v=!1,E=null,k=null,X=null,z=null;this._outputColorSpace=Gt;let K=0,W=0,j=null,te=-1,fe=null;const ge=new lt,xe=new lt;let qe=null;const ct=new We(0);let Ye=0,Q=t.width,se=t.height,ne=1,Pe=null,Le=null;const we=new lt(0,0,Q,se),ht=new lt(0,0,Q,se);let ke=!1;const tt=new Jo;let Ke=!1,$e=!1;const _t=new rt,Mt=new B,yt=new lt,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function vt(){return j===null?ne:1}let N=i;function kt(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Oo}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",hn,!1),N===null){const F="webgl2";if(N=kt(F,S),N===null)throw kt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Ve("WebGLRenderer: "+S.message),S}let Je,A,_,O,V,q,ie,ae,Y,J,oe,ye,ue,le,Ae,Re,De,U,re,Z,ce,me,ee;function be(){Je=new Mm(N),Je.init(),ce=new dg(N,Je),A=new fm(N,Je,e,ce),_=new cg(N,Je),A.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),k=N.createFramebuffer(),X=N.createFramebuffer(),z=N.createFramebuffer(),O=new ym(N),V=new K0,q=new ug(N,Je,_,V,A,ce,O),ie=new xm(T),ae=new wf(N),me=new um(N,ae),Y=new Sm(N,ae,O,me),J=new Tm(N,Y,ae,me,O),U=new Em(N,A,q),Ae=new hm(V),oe=new Y0(T,ie,Je,A,me,Ae),ye=new _g(T,V),ue=new J0,le=new ig(Je),De=new cm(T,ie,_,J,m,l),Re=new lg(T,J,A),ee=new vg(N,O,A,_),re=new dm(N,Je,O),Z=new bm(N,Je,O),O.programs=oe.programs,T.capabilities=A,T.extensions=Je,T.properties=V,T.renderLists=ue,T.shadowMap=Re,T.state=_,T.info=O}be(),M!==qt&&(b=new wm(M,t.width,t.height,o,r,s));const Me=new mg(T,N);this.xr=Me,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(S){S!==void 0&&(ne=S,this.setSize(Q,se,!1))},this.getSize=function(S){return S.set(Q,se)},this.setSize=function(S,F,$=!0){if(Me.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=S,se=F,t.width=Math.floor(S*ne),t.height=Math.floor(F*ne),$===!0&&(t.style.width=S+"px",t.style.height=F+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(Q*ne,se*ne).floor()},this.setDrawingBufferSize=function(S,F,$){Q=S,se=F,ne=$,t.width=Math.floor(S*$),t.height=Math.floor(F*$),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(M===qt){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ge)},this.getViewport=function(S){return S.copy(we)},this.setViewport=function(S,F,$,G){S.isVector4?we.set(S.x,S.y,S.z,S.w):we.set(S,F,$,G),_.viewport(ge.copy(we).multiplyScalar(ne).round())},this.getScissor=function(S){return S.copy(ht)},this.setScissor=function(S,F,$,G){S.isVector4?ht.set(S.x,S.y,S.z,S.w):ht.set(S,F,$,G),_.scissor(xe.copy(ht).multiplyScalar(ne).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(S){_.setScissorTest(ke=S)},this.setOpaqueSort=function(S){Pe=S},this.setTransparentSort=function(S){Le=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,$=!0){let G=0;if(S){let H=!1;if(j!==null){const pe=j.texture.format;H=p.has(pe)}if(H){const pe=j.texture.type,ve=h.has(pe),he=De.getClearColor(),Se=De.getClearAlpha(),Ee=he.r,Ue=he.g,Fe=he.b;ve?(C[0]=Ee,C[1]=Ue,C[2]=Fe,C[3]=Se,N.clearBufferuiv(N.COLOR,0,C)):(L[0]=Ee,L[1]=Ue,L[2]=Fe,L[3]=Se,N.clearBufferiv(N.COLOR,0,L))}else G|=N.COLOR_BUFFER_BIT}F&&(G|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&N.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),E=S},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),De.dispose(),ue.dispose(),le.dispose(),V.dispose(),ie.dispose(),J.dispose(),me.dispose(),ee.dispose(),oe.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",nl),Me.removeEventListener("sessionend",il),ui.stop()};function dt(S){S.preventDefault(),yl("WebGLRenderer: Context Lost."),v=!0}function st(){yl("WebGLRenderer: Context Restored."),v=!1;const S=O.autoReset,F=Re.enabled,$=Re.autoUpdate,G=Re.needsUpdate,H=Re.type;be(),O.autoReset=S,Re.enabled=F,Re.autoUpdate=$,Re.needsUpdate=G,Re.type=H}function hn(S){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function pn(S){const F=S.target;F.removeEventListener("dispose",pn),Su(F)}function Su(S){bu(S),V.remove(S)}function bu(S){const F=V.get(S).programs;F!==void 0&&(F.forEach(function($){oe.releaseProgram($)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,$,G,H,pe){F===null&&(F=wt);const ve=H.isMesh&&H.matrixWorld.determinantAffine()<0,he=Tu(S,F,$,G,H);_.setMaterial(G,ve);let Se=$.index,Ee=1;if(G.wireframe===!0){if(Se=Y.getWireframeAttribute($),Se===void 0)return;Ee=2}const Ue=$.drawRange,Fe=$.attributes.position;let Te=Ue.start*Ee,je=(Ue.start+Ue.count)*Ee;pe!==null&&(Te=Math.max(Te,pe.start*Ee),je=Math.min(je,(pe.start+pe.count)*Ee)),Se!==null?(Te=Math.max(Te,0),je=Math.min(je,Se.count)):Fe!=null&&(Te=Math.max(Te,0),je=Math.min(je,Fe.count));const pt=je-Te;if(pt<0||pt===1/0)return;me.setup(H,G,he,$,Se);let ft,nt=re;if(Se!==null&&(ft=ae.get(Se),nt=Z,nt.setIndex(ft)),H.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*vt()),nt.setMode(N.LINES)):nt.setMode(N.TRIANGLES);else if(H.isLine){let Pt=G.linewidth;Pt===void 0&&(Pt=1),_.setLineWidth(Pt*vt()),H.isLineSegments?nt.setMode(N.LINES):H.isLineLoop?nt.setMode(N.LINE_LOOP):nt.setMode(N.LINE_STRIP)}else H.isPoints?nt.setMode(N.POINTS):H.isSprite&&nt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))nt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pt=H._multiDrawStarts,_e=H._multiDrawCounts,Wt=H._multiDrawCount,Xe=Se?ae.get(Se).bytesPerElement:1,Kt=V.get(G).currentProgram.getUniforms();for(let mn=0;mn<Wt;mn++)Kt.setValue(N,"_gl_DrawID",mn),nt.render(Pt[mn]/Xe,_e[mn])}else if(H.isInstancedMesh)nt.renderInstances(Te,pt,H.count);else if($.isInstancedBufferGeometry){const Pt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,_e=Math.min($.instanceCount,Pt);nt.renderInstances(Te,pt,_e)}else nt.render(Te,pt)};function tl(S,F,$){S.transparent===!0&&S.side===Nn&&S.forceSinglePass===!1?(S.side=Vt,S.needsUpdate=!0,Gr(S,F,$),S.side=li,S.needsUpdate=!0,Gr(S,F,$),S.side=Nn):Gr(S,F,$)}this.compile=function(S,F,$=null){$===null&&($=S),R=le.get($),R.init(F),x.push(R),$.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(R.pushLight(H),H.castShadow&&R.pushShadow(H))}),S!==$&&S.traverseVisible(function(H){H.isLight&&H.layers.test(F.layers)&&(R.pushLight(H),H.castShadow&&R.pushShadow(H))}),R.setupLights();const G=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const he=pe[ve];tl(he,$,H),G.add(he)}else tl(pe,$,H),G.add(pe)}),R=x.pop(),G},this.compileAsync=function(S,F,$=null){const G=this.compile(S,F,$);return new Promise(H=>{function pe(){if(G.forEach(function(ve){V.get(ve).currentProgram.isReady()&&G.delete(ve)}),G.size===0){H(S);return}setTimeout(pe,10)}Je.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let zs=null;function yu(S){zs&&zs(S)}function nl(){ui.stop()}function il(){ui.start()}const ui=new du;ui.setAnimationLoop(yu),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(S){zs=S,Me.setAnimationLoop(S),S===null?ui.stop():ui.start()},Me.addEventListener("sessionstart",nl),Me.addEventListener("sessionend",il),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;E!==null&&E.renderStart(S,F);const $=Me.enabled===!0&&Me.isPresenting===!0,G=b!==null&&(j===null||$)&&b.begin(T,j);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(F),F=Me.getCamera()),S.isScene===!0&&S.onBeforeRender(T,S,F,j),R=le.get(S,x.length),R.init(F),R.state.textureUnits=q.getTextureUnits(),x.push(R),_t.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),tt.setFromProjectionMatrix(_t,En,F.reversedDepth),$e=this.localClippingEnabled,Ke=Ae.init(this.clippingPlanes,$e),P=ue.get(S,I.length),P.init(),I.push(P),Me.enabled===!0&&Me.isPresenting===!0){const ve=T.xr.getDepthSensingMesh();ve!==null&&Gs(ve,F,-1/0,T.sortObjects)}Gs(S,F,0,T.sortObjects),P.finish(),T.sortObjects===!0&&P.sort(Pe,Le,F.reversedDepth),ut=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,ut&&De.addToRenderList(P,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ae.beginShadows();const H=R.state.shadowsArray;if(Re.render(H,S,F),Ke===!0&&Ae.endShadows(),(G&&b.hasRenderPass())===!1){const ve=P.opaque,he=P.transmissive;if(R.setupLights(),F.isArrayCamera){const Se=F.cameras;if(he.length>0)for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];sl(ve,he,S,Fe)}ut&&De.render(S);for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];rl(P,S,Fe,Fe.viewport)}}else he.length>0&&sl(ve,he,S,F),ut&&De.render(S),rl(P,S,F)}j!==null&&W===0&&(q.updateMultisampleRenderTarget(j),q.updateRenderTargetMipmap(j)),G&&b.end(T),S.isScene===!0&&S.onAfterRender(T,S,F),me.resetDefaultState(),te=-1,fe=null,x.pop(),x.length>0?(R=x[x.length-1],q.setTextureUnits(R.state.textureUnits),Ke===!0&&Ae.setGlobalState(T.clippingPlanes,R.state.camera)):R=null,I.pop(),I.length>0?P=I[I.length-1]:P=null,E!==null&&E.renderEnd()};function Gs(S,F,$,G){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)R.pushLightProbeGrid(S);else if(S.isLight)R.pushLight(S),S.castShadow&&R.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||tt.intersectsSprite(S)){G&&yt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(_t);const ve=J.update(S),he=S.material;he.visible&&P.push(S,ve,he,$,yt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||tt.intersectsObject(S))){const ve=J.update(S),he=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),yt.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),yt.copy(ve.boundingSphere.center)),yt.applyMatrix4(S.matrixWorld).applyMatrix4(_t)),Array.isArray(he)){const Se=ve.groups;for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee],Te=he[Fe.materialIndex];Te&&Te.visible&&P.push(S,ve,Te,$,yt.z,Fe)}}else he.visible&&P.push(S,ve,he,$,yt.z,null)}}const pe=S.children;for(let ve=0,he=pe.length;ve<he;ve++)Gs(pe[ve],F,$,G)}function rl(S,F,$,G){const{opaque:H,transmissive:pe,transparent:ve}=S;R.setupLightsView($),Ke===!0&&Ae.setGlobalState(T.clippingPlanes,$),G&&_.viewport(ge.copy(G)),H.length>0&&zr(H,F,$),pe.length>0&&zr(pe,F,$),ve.length>0&&zr(ve,F,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function sl(S,F,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[G.id]===void 0){const Te=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[G.id]=new An(1,1,{generateMipmaps:!0,type:Te?Hn:qt,minFilter:Mi,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const pe=R.state.transmissionRenderTarget[G.id],ve=G.viewport||ge;pe.setSize(ve.z*T.transmissionResolutionScale,ve.w*T.transmissionResolutionScale);const he=T.getRenderTarget(),Se=T.getActiveCubeFace(),Ee=T.getActiveMipmapLevel();T.setRenderTarget(pe),T.getClearColor(ct),Ye=T.getClearAlpha(),Ye<1&&T.setClearColor(16777215,.5),T.clear(),ut&&De.render($);const Ue=T.toneMapping;T.toneMapping=Tn;const Fe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),R.setupLightsView(G),Ke===!0&&Ae.setGlobalState(T.clippingPlanes,G),zr(S,$,G),q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let je=0,pt=F.length;je<pt;je++){const ft=F[je],{object:nt,geometry:Pt,material:_e,group:Wt}=ft;if(_e.side===Nn&&nt.layers.test(G.layers)){const Xe=_e.side;_e.side=Vt,_e.needsUpdate=!0,al(nt,$,G,Pt,_e,Wt),_e.side=Xe,_e.needsUpdate=!0,Te=!0}}Te===!0&&(q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe))}T.setRenderTarget(he,Se,Ee),T.setClearColor(ct,Ye),Fe!==void 0&&(G.viewport=Fe),T.toneMapping=Ue}function zr(S,F,$){const G=F.isScene===!0?F.overrideMaterial:null;for(let H=0,pe=S.length;H<pe;H++){const ve=S[H],{object:he,geometry:Se,group:Ee}=ve;let Ue=ve.material;Ue.allowOverride===!0&&G!==null&&(Ue=G),he.layers.test($.layers)&&al(he,F,$,Se,Ue,Ee)}}function al(S,F,$,G,H,pe){S.onBeforeRender(T,F,$,G,H,pe),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(T,F,$,G,S,pe),H.transparent===!0&&H.side===Nn&&H.forceSinglePass===!1?(H.side=Vt,H.needsUpdate=!0,T.renderBufferDirect($,F,G,H,S,pe),H.side=li,H.needsUpdate=!0,T.renderBufferDirect($,F,G,H,S,pe),H.side=Nn):T.renderBufferDirect($,F,G,H,S,pe),S.onAfterRender(T,F,$,G,H,pe)}function Gr(S,F,$){F.isScene!==!0&&(F=wt);const G=V.get(S),H=R.state.lights,pe=R.state.shadowsArray,ve=H.state.version,he=oe.getParameters(S,H.state,pe,F,$,R.state.lightProbeGridArray),Se=oe.getProgramCacheKey(he);let Ee=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,G.fog=F.fog;const Ue=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=ie.get(S.envMap||G.environment,Ue),G.envMapRotation=G.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ee===void 0&&(S.addEventListener("dispose",pn),Ee=new Map,G.programs=Ee);let Fe=Ee.get(Se);if(Fe!==void 0){if(G.currentProgram===Fe&&G.lightsStateVersion===ve)return ll(S,he),Fe}else he.uniforms=oe.getUniforms(S),E!==null&&S.isNodeMaterial&&E.build(S,$,he),S.onBeforeCompile(he,T),Fe=oe.acquireProgram(he,Se),Ee.set(Se,Fe),G.uniforms=he.uniforms;const Te=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),ll(S,he),G.needsLights=wu(S),G.lightsStateVersion=ve,G.needsLights&&(Te.ambientLightColor.value=H.state.ambient,Te.lightProbe.value=H.state.probe,Te.directionalLights.value=H.state.directional,Te.directionalLightShadows.value=H.state.directionalShadow,Te.spotLights.value=H.state.spot,Te.spotLightShadows.value=H.state.spotShadow,Te.rectAreaLights.value=H.state.rectArea,Te.ltc_1.value=H.state.rectAreaLTC1,Te.ltc_2.value=H.state.rectAreaLTC2,Te.pointLights.value=H.state.point,Te.pointLightShadows.value=H.state.pointShadow,Te.hemisphereLights.value=H.state.hemi,Te.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Te.spotLightMatrix.value=H.state.spotLightMatrix,Te.spotLightMap.value=H.state.spotLightMap,Te.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=R.state.lightProbeGridArray.length>0,G.currentProgram=Fe,G.uniformsList=null,Fe}function ol(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Ms.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ll(S,F){const $=V.get(S);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Eu(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let $=0,G=S.length;$<G;$++){const H=S[$];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function Tu(S,F,$,G,H){F.isScene!==!0&&(F=wt),q.resetTextureUnits();const pe=F.fog,ve=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?F.environment:null,he=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ge.workingColorSpace,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ee=ie.get(G.envMap||ve,Se),Ue=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Fe=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Te=!!$.morphAttributes.position,je=!!$.morphAttributes.normal,pt=!!$.morphAttributes.color;let ft=Tn;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ft=T.toneMapping);const nt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Pt=nt!==void 0?nt.length:0,_e=V.get(G),Wt=R.state.lights;if(Ke===!0&&($e===!0||S!==fe)){const at=S===fe&&G.id===te;Ae.setState(G,S,at)}let Xe=!1;G.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Wt.state.version||_e.outputColorSpace!==he||H.isBatchedMesh&&_e.batching===!1||!H.isBatchedMesh&&_e.batching===!0||H.isBatchedMesh&&_e.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&_e.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&_e.instancing===!1||!H.isInstancedMesh&&_e.instancing===!0||H.isSkinnedMesh&&_e.skinning===!1||!H.isSkinnedMesh&&_e.skinning===!0||H.isInstancedMesh&&_e.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&_e.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&_e.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&_e.instancingMorph===!1&&H.morphTexture!==null||_e.envMap!==Ee||G.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==Ue||_e.vertexTangents!==Fe||_e.morphTargets!==Te||_e.morphNormals!==je||_e.morphColors!==pt||_e.toneMapping!==ft||_e.morphTargetsCount!==Pt||!!_e.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,_e.__version=G.version);let Kt=_e.currentProgram;Xe===!0&&(Kt=Gr(G,F,H),E&&G.isNodeMaterial&&E.onUpdateProgram(G,Kt,_e));let mn=!1,Xn=!1,Ci=!1;const it=Kt.getUniforms(),mt=_e.uniforms;if(_.useProgram(Kt.program)&&(mn=!0,Xn=!0,Ci=!0),G.id!==te&&(te=G.id,Xn=!0),_e.needsLights){const at=Eu(R.state.lightProbeGridArray,H);_e.lightProbeGrid!==at&&(_e.lightProbeGrid=at,Xn=!0)}if(mn||fe!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),it.setValue(N,"projectionMatrix",S.projectionMatrix),it.setValue(N,"viewMatrix",S.matrixWorldInverse);const Yn=it.map.cameraPosition;Yn!==void 0&&Yn.setValue(N,Mt.setFromMatrixPosition(S.matrixWorld)),A.logarithmicDepthBuffer&&it.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&it.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),fe!==S&&(fe=S,Xn=!0,Ci=!0)}if(_e.needsLights&&(Wt.state.directionalShadowMap.length>0&&it.setValue(N,"directionalShadowMap",Wt.state.directionalShadowMap,q),Wt.state.spotShadowMap.length>0&&it.setValue(N,"spotShadowMap",Wt.state.spotShadowMap,q),Wt.state.pointShadowMap.length>0&&it.setValue(N,"pointShadowMap",Wt.state.pointShadowMap,q)),H.isSkinnedMesh){it.setOptional(N,H,"bindMatrix"),it.setOptional(N,H,"bindMatrixInverse");const at=H.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(N,"boneTexture",at.boneTexture,q))}H.isBatchedMesh&&(it.setOptional(N,H,"batchingTexture"),it.setValue(N,"batchingTexture",H._matricesTexture,q),it.setOptional(N,H,"batchingIdTexture"),it.setValue(N,"batchingIdTexture",H._indirectTexture,q),it.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&it.setValue(N,"batchingColorTexture",H._colorsTexture,q));const qn=$.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&U.update(H,$,Kt),(Xn||_e.receiveShadow!==H.receiveShadow)&&(_e.receiveShadow=H.receiveShadow,it.setValue(N,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&F.environment!==null&&(mt.envMapIntensity.value=F.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=Mg()),Xn){if(it.setValue(N,"toneMappingExposure",T.toneMappingExposure),_e.needsLights&&Au(mt,Ci),pe&&G.fog===!0&&ye.refreshFogUniforms(mt,pe),ye.refreshMaterialUniforms(mt,G,ne,se,R.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){const at=_e.lightProbeGrid;mt.probesSH.value=at.texture,mt.probesMin.value.copy(at.boundingBox.min),mt.probesMax.value.copy(at.boundingBox.max),mt.probesResolution.value.copy(at.resolution)}Ms.upload(N,ol(_e),mt,q)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ms.upload(N,ol(_e),mt,q),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&it.setValue(N,"center",H.center),it.setValue(N,"modelViewMatrix",H.modelViewMatrix),it.setValue(N,"normalMatrix",H.normalMatrix),it.setValue(N,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const at=G.uniformsGroups;for(let Yn=0,Pi=at.length;Yn<Pi;Yn++){const cl=at[Yn];ee.update(cl,Kt),ee.bind(cl,Kt)}}return Kt}function Au(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function wu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(S,F,$){const G=V.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=F,V.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const $=V.get(S);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,$=0){j=S,K=F,W=$;let G=null,H=!1,pe=!1;if(S){const he=V.get(S);if(he.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,he.__webglFramebuffer),ge.copy(S.viewport),xe.copy(S.scissor),qe=S.scissorTest,_.viewport(ge),_.scissor(xe),_.setScissorTest(qe),te=-1;return}else if(he.__webglFramebuffer===void 0)q.setupRenderTarget(S);else if(he.__hasExternalTextures)q.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ue=S.depthTexture;if(he.__boundDepthTexture!==Ue){if(Ue!==null&&V.has(Ue)&&(S.width!==Ue.image.width||S.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(S)}}const Se=S.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);const Ee=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ee[F])?G=Ee[F][$]:G=Ee[F],H=!0):S.samples>0&&q.useMultisampledRTT(S)===!1?G=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Ee)?G=Ee[$]:G=Ee,ge.copy(S.viewport),xe.copy(S.scissor),qe=S.scissorTest}else ge.copy(we).multiplyScalar(ne).floor(),xe.copy(ht).multiplyScalar(ne).floor(),qe=ke;if($!==0&&(G=k),_.bindFramebuffer(N.FRAMEBUFFER,G)&&_.drawBuffers(S,G),_.viewport(ge),_.scissor(xe),_.setScissorTest(qe),H){const he=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,he.__webglTexture,$)}else if(pe){const he=F;for(let Se=0;Se<S.textures.length;Se++){const Ee=V.get(S.textures[Se]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,$,he)}}else if(S!==null&&$!==0){const he=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,he.__webglTexture,$)}te=-1},this.readRenderTargetPixels=function(S,F,$,G,H,pe,ve,he=0){if(!(S&&S.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){_.bindFramebuffer(N.FRAMEBUFFER,Se);try{const Ee=S.textures[he],Ue=Ee.format,Fe=Ee.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+he),!A.textureFormatReadable(Ue)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Fe)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-G&&$>=0&&$<=S.height-H&&N.readPixels(F,$,G,H,ce.convert(Ue),ce.convert(Fe),pe)}finally{const Ee=j!==null?V.get(j).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,F,$,G,H,pe,ve,he=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(F>=0&&F<=S.width-G&&$>=0&&$<=S.height-H){_.bindFramebuffer(N.FRAMEBUFFER,Se);const Ee=S.textures[he],Ue=Ee.format,Fe=Ee.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+he),!A.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(F,$,G,H,ce.convert(Ue),ce.convert(Fe),0);const je=j!==null?V.get(j).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,je);const pt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Bd(N,pt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Te),N.deleteSync(pt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,$=0){const G=Math.pow(2,-$),H=Math.floor(S.image.width*G),pe=Math.floor(S.image.height*G),ve=F!==null?F.x:0,he=F!==null?F.y:0;q.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,ve,he,H,pe),_.unbindTexture()},this.copyTextureToTexture=function(S,F,$=null,G=null,H=0,pe=0){let ve,he,Se,Ee,Ue,Fe,Te,je,pt;const ft=S.isCompressedTexture?S.mipmaps[pe]:S.image;if($!==null)ve=$.max.x-$.min.x,he=$.max.y-$.min.y,Se=$.isBox3?$.max.z-$.min.z:1,Ee=$.min.x,Ue=$.min.y,Fe=$.isBox3?$.min.z:0;else{const mt=Math.pow(2,-H);ve=Math.floor(ft.width*mt),he=Math.floor(ft.height*mt),S.isDataArrayTexture?Se=ft.depth:S.isData3DTexture?Se=Math.floor(ft.depth*mt):Se=1,Ee=0,Ue=0,Fe=0}G!==null?(Te=G.x,je=G.y,pt=G.z):(Te=0,je=0,pt=0);const nt=ce.convert(F.format),Pt=ce.convert(F.type);let _e;F.isData3DTexture?(q.setTexture3D(F,0),_e=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(q.setTexture2DArray(F,0),_e=N.TEXTURE_2D_ARRAY):(q.setTexture2D(F,0),_e=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const Wt=_.getParameter(N.UNPACK_ROW_LENGTH),Xe=_.getParameter(N.UNPACK_IMAGE_HEIGHT),Kt=_.getParameter(N.UNPACK_SKIP_PIXELS),mn=_.getParameter(N.UNPACK_SKIP_ROWS),Xn=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,ft.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ft.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ee),_.pixelStorei(N.UNPACK_SKIP_ROWS,Ue),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Fe);const Ci=S.isDataArrayTexture||S.isData3DTexture,it=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const mt=V.get(S),qn=V.get(F),at=V.get(mt.__renderTarget),Yn=V.get(qn.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,at.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let Pi=0;Pi<Se;Pi++)Ci&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(S).__webglTexture,H,Fe+Pi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(F).__webglTexture,pe,pt+Pi)),N.blitFramebuffer(Ee,Ue,ve,he,Te,je,ve,he,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||V.has(S)){const mt=V.get(S),qn=V.get(F);_.bindFramebuffer(N.READ_FRAMEBUFFER,X),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,z);for(let at=0;at<Se;at++)Ci?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,mt.__webglTexture,H,Fe+at):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,mt.__webglTexture,H),it?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qn.__webglTexture,pe,pt+at):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qn.__webglTexture,pe),H!==0?N.blitFramebuffer(Ee,Ue,ve,he,Te,je,ve,he,N.COLOR_BUFFER_BIT,N.NEAREST):it?N.copyTexSubImage3D(_e,pe,Te,je,pt+at,Ee,Ue,ve,he):N.copyTexSubImage2D(_e,pe,Te,je,Ee,Ue,ve,he);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else it?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(_e,pe,Te,je,pt,ve,he,Se,nt,Pt,ft.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,pe,Te,je,pt,ve,he,Se,nt,ft.data):N.texSubImage3D(_e,pe,Te,je,pt,ve,he,Se,nt,Pt,ft):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Te,je,ve,he,nt,Pt,ft.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Te,je,ft.width,ft.height,nt,ft.data):N.texSubImage2D(N.TEXTURE_2D,pe,Te,je,ve,he,nt,Pt,ft);_.pixelStorei(N.UNPACK_ROW_LENGTH,Wt),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Xe),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Kt),_.pixelStorei(N.UNPACK_SKIP_ROWS,mn),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Xn),pe===0&&F.generateMipmaps&&N.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&q.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?q.setTextureCube(S,0):S.isData3DTexture?q.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?q.setTexture2DArray(S,0):q.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){K=0,W=0,j=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}function Qo(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new Zo(t,128,128);return i.wrapS=i.wrapT=Es,i.colorSpace=Gt,i.needsUpdate=!0,i}const wo=Qo("wood"),xu=Qo("stone"),Ar=Qo("cloth"),w={stone:new gt({color:Kn.materials.stone,map:xu,roughness:.72}),wall:new gt({color:Kn.materials.wall,roughness:.88}),wood:new gt({color:Kn.materials.wood,map:wo,roughness:.52}),walnut:new gt({color:Kn.materials.darkWood,map:wo,roughness:.5}),gold:new gt({color:Kn.materials.metal,metalness:.7,roughness:.36}),navy:new gt({color:Kn.materials.blue,roughness:.65}),white:new gt({color:Kn.materials.linen,map:Ar,roughness:.93}),teal:new gt({color:Kn.materials.accent,map:Ar,roughness:.83}),rust:new gt({color:9920067,map:Ar,roughness:.84}),carpet:new gt({color:6845561,map:Ar,roughness:1}),black:new gt({color:1449508,roughness:.6}),green:new gt({color:3495746,roughness:.86}),leaf:new gt({color:6651984,roughness:.8}),glass:new gt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new gt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new gt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new gt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new gt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new gt({color:14000506,roughness:.9}),hair:new gt({color:2433314,roughness:.9}),ao:new Br({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},Ro=new Map;function bg(n){let e=Ro.get(n);return e||(e=new gt({color:n,roughness:.75}),Ro.set(n,e)),e}function yg(){Object.values(w).forEach(n=>n.dispose()),Ro.forEach(n=>n.dispose()),[wo,xu,Ar].forEach(n=>n.dispose())}const kr={box:new ur(1,1,1),cylinder:new Ds(1,1,1,12),sphere:new Ps(1,12,8),leaf:new Ps(1,8,6),cone:new Us(1,1,16),plane:new dr(1,1)};function D(n,e,t,i,r,s,a,o=w.wood){const l=new At(kr.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Be(n,e,t,i,r,s,a=w.gold){const o=new At(kr.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function vn(n,e,t,i,r,s,a,o=w.leaf){const l=new At(kr.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function Bs(n,e,t,i,r,s=.022){const a=new At(kr.plane,w.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function Ft(n,e,t,i=1,r=0){const s=new Ut;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),Be(s,0,.21,0,.21,.42,w.stone),Be(s,0,.76,0,.027,1.1,w.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;vn(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?w.leaf:w.green).rotation.set(.3,o,Math.sin(o)*.65)}return Bs(s,0,0,.7,.55),s}function xn(n,e,t,i,r=1){const s=new Ut;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),Be(s,0,.035,0,.11,.045,w.gold),Be(s,0,.21,0,.019,.36,w.gold),Be(s,0,.42,0,.16,.22,w.shade),Be(s,0,.315,0,.135,.015,w.glow),s}function bi(n,e,t,i=0,r=w.teal){const s=new Ut;s.position.set(e,0,t),s.rotation.y=i,n.add(s),D(s,0,.43,0,.55,.14,.56,r),D(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])Be(s,a*.2,.2,o*.2,.025,.4,w.walnut);return s}function Un(n,e,t,i=0,r=1.5,s=w.teal){const a=new Ut;a.position.set(e,0,t),a.rotation.y=i,n.add(a),D(a,0,.32,0,r,.42,.64,s),D(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])D(a,o*(r/2-.08),.56,0,.16,.4,.7,s),D(a,o*r*.23,.55,-.17,.35,.28,.11,w.white);return D(a,0,.58,.04,r-.3,.11,.44,s),Bs(a,0,0,r+.15,.95),a}function ii(n,e,t,i=.42){Be(n,e,.37,t,.055,.74,w.gold),Be(n,e,.75,t,i,.07,w.stone),Be(n,e,.04,t,i*.5,.06,w.walnut)}function wr(n,e,t,i){Be(n,e,t,i,.07,.13,w.white),Be(n,e,t-.065,i,.12,.018,w.white)}function yi(n,e,t,i,r=1.15,s=.65,a=0){D(n,e,t,i,r+.07,s+.07,.06,w.gold),D(n,e,t,i+.04,r,s,.015,w.white),D(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?w.teal:w.window),D(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,w.stone),vn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,w.rust)}function Eg(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof At)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new ru(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function Tg(n){const e=n.level??1,t=new Ut;t.name=n.id,t.userData.entityId=n.id,D(t,0,.04,0,4.7,.08,3.1,e>=4?w.stone:e>=2?w.walnut:w.wood),D(t,0,1.19,-1.51,4.7,2.38,.14,w.wall),D(t,2.35,1.14,-.1,.1,2.28,2.75,w.stone),D(t,1.6,1.25,-1.41,1.05,1.9,.035,w.window);for(const a of[1.1,1.6,2.1])D(t,a,1.25,-1.35,.035,1.94,.04,w.gold);D(t,1.6,1.25,-1.35,1.08,.04,.04,w.gold);for(let a=1.03;a<1.26;a+=.06)D(t,a,1.28,-1.23,.04,1.94,.13,w.white);if(D(t,0,2.27,-1.27,4.53,.06,.065,w.glow),n.construction){for(const a of[-1.8,0,1.8])D(t,a,1.05,1.5,.07,2.1,.07,w.gold),D(t,a,.4,.4,.65,.7,.7,w.stone);for(const a of[.5,1.4,2.15])D(t,0,a,1.5,4.5,.06,.06,w.gold);return D(t,0,.8,1.55,4.5,.48,.06,w.navy),t}if(n.status==="unbuilt")return D(t,0,.12,0,3.8,.08,2.5,w.stone),t;const i=Sc(n),r=Mc(n)==="twin";D(t,-.67,.078,.07,2.85,.02,2.66,w.carpet);const s=(a,o)=>{D(t,a,.28,-.03,o+.09,.39,1.9,w.walnut),D(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?w.stone:w.white),D(t,a,.7,-.98,o+.13,1.22,.12,w.walnut),D(t,a,.82,-.89,o-.05,.63,.08,w.teal),D(t,a,.67,-.58,o*.82,.13,.36,w.white),e>=2&&(D(t,a,.78,-.72,o*.78,.12,.25,w.white),D(t,a,.655,.18,o,.045,.45,e>=4?w.white:w.teal)),D(t,a,.646,.54,o,.075,.39,e>=4?w.gold:i?w.rust:w.teal),D(t,a,.49,1,o,.28,.04,w.white),Bs(t,a,0,o+.25,2.25)};r?(s(-1.36,.88),s(-.22,.88)):s(-.75,1.68);for(const a of[-1.94,.43])D(t,a,.35,-.76,.41,.58,.5,w.walnut),D(t,a,.66,-.76,.45,.06,.53,w.stone),xn(t,a,.69,-.77,.8);if(yi(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)D(t,1.65,.38,-.4,.9,.65,.85,w.stone),D(t,1.65,.73,-.4,.85,.08,.8,w.white),Be(t,1.65,.83,-.65,.025,.22,w.gold),D(t,2.16,1.25,-.35,.025,1.8,1.5,w.glass),D(t,1.6,1.93,-1.14,.3,.04,.25,w.gold),yi(t,1.5,1.6,-1.33,.8,.5,e),Un(t,1.58,.76,-Math.PI/2,.75,w.white);else if(i)Un(t,1.55,.22,-Math.PI/2,1.3,w.rust),ii(t,.97,.8,.25);else{D(t,1.61,.76,-.57,1.1,.1,.57,w.walnut);for(const a of[1.19,2.03])D(t,a,.37,-.57,.05,.75,.46,w.gold);D(t,1.59,.94,-.64,.35,.28,.04,w.screen),bi(t,1.65,.06,Math.PI),xn(t,2,.82,-.62,.66)}if(ai(n)==="view"||ai(n)==="premium"){D(t,0,1.45,-1.4,4.15,1.65,.025,w.window);for(const a of[-2,0,2])D(t,a,1.45,-1.35,.045,1.7,.045,w.gold)}if(ai(n)==="premium"&&(D(t,0,2.1,-1.25,4.5,.08,.08,w.gold),yi(t,-1.6,1.8,-1.3,.8,.4,99),Ft(t,1.95,.55,1.15)),n.extraBed&&(D(t,.5,.25,1.02,.8,.3,.8,w.walnut),D(t,.5,.43,1.02,.8,.08,.8,w.white)),Ft(t,2.05,1.05,.63),(n.level??1)>1&&(yi(t,-2.05,1.6,-1.38,.38,.56,n.level),Ft(t,-2.05,.35,.55)),e>=3&&(xn(t,-1.94,1.25,-.9,1.1),D(t,-.75,1.62,-1.25,2.1,.025,.03,w.glow)),e>=5){D(t,0,1.4,-1.42,4.3,1.9,.025,w.window);for(const a of[-2,-.8,.8,2])D(t,a,1.4,-1.35,.04,1.95,.06,w.gold);for(const a of[-1.8,0,1.8])D(t,a,.09,.15,.025,.02,2.9,w.gold);for(const a of[2.12,2.24])D(t,0,a,-1.1,4.5,.035,.035,w.glow)}if((n.level??1)>2&&D(t,0,2.12,-1.3,4.55,.035,.055,w.gold),D(t,-2.12,.52,.95,.22,1,.28,w.walnut),n.status==="reserved"&&(n.suaBookingId&&D(t,0,1.1,1.62,.38,.5,.05,w.rust),D(t,1.2,.48,1.48,.25,.29,.1,w.gold)),n.status==="cleaning"){D(t,1.05,.37,1.57,.55,.55,.35,w.navy);for(const a of[.83,1.27])Be(t,a,.09,1.57,.07,.07,w.black);D(t,1.05,.71,1.57,.6,.04,.41,w.gold),D(t,.95,.79,1.57,.3,.12,.22,w.white)}if(n.status==="occupied"&&D(t,0,2.23,.7,3.8,.035,.035,w.shade),n.status==="maintenance"){const a=D(t,.9,1.95,1.55,.17,.17,.08,w.glow);a.name="fault-lamp",a.userData.interactive=!0,D(t,.6,.33,.9,.8,.1,.8,w.rust),D(t,.6,.52,.9,.1,.6,.1,w.gold)}return t}function ps(n,e,t,i=2.12){Be(n,e,i+.13,t,.012,.45,w.gold),Be(n,e,i-.08,t,.24,.18,w.gold),Be(n,e,i-.18,t,.21,.015,w.glow)}function Ag(n,e){if(D(n,0,1.2,-1.54,14.65,2.4,.14,w.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)D(n,t,1.2,-1.42,.035,2.38,.08,w.gold);else for(let t=-7;t<7;t+=.58)D(n,t,1.2,-1.43,.022,2.2,.04,w.wood)}function qi(n,e,t){D(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,w.window);for(let i=e;i<=t+.01;i+=.72)D(n,i,1.23,-1.32,.045,2.17,.06,w.gold);D(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,w.gold)}function wg(n,e,t){ii(n,e,t,.44),bi(n,e-.63,t,Math.PI/2),bi(n,e+.63,t,-Math.PI/2),wr(n,e-.18,.87,t),wr(n,e+.18,.87,t),Be(n,e,.83,t,.065,.12,w.gold)}function Ea(n,e,t){D(n,e,1.23,-1.35,t,1.86,.18,w.walnut);for(let i=.53;i<2;i+=.39){D(n,e,i,-1.14,t,.04,.42,w.gold),D(n,e,i+.035,-1.18,t-.1,.025,.05,w.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;Be(n,s,i+.13,-1.08,.048,.23,r%3?w.green:w.rust),Be(n,s,i+.27,-1.08,.019,.07,w.gold)}}}function Rg(n,e=1,t=100,i=!1){const r=new Ut;if(n!=="rooftop"&&(Ag(r,n),D(r,0,.04,0,14.66,.08,3.15,n==="lobby"?w.stone:w.wood),D(r,0,2.31,-1.21,14.5,.04,.07,w.glow)),i){for(const s of[-6,-3,0,3,6])D(r,s,1.1,1.4,.08,2.2,.08,w.gold);for(const s of[.5,1.5,2.1])D(r,0,s,1.4,14,.08,.08,w.gold);return D(r,0,.8,1.5,14,.65,.04,w.navy),r}if(n==="lobby"){qi(r,4.3,7.2),D(r,0,1.35,-1.33,6.7,1.8,.11,w.stone),D(r,0,.48,.5,6.2,.84,.62,w.walnut),D(r,0,.94,.5,6.45,.12,.83,w.stone),D(r,0,.15,.86,6.08,.075,.035,w.glow);for(let s=-2.9;s<3;s+=.18)D(r,s,.5,.824,.035,.6,.025,w.gold);for(const s of[-1.8,1.7])D(r,s,1.12,.2,.42,.29,.045,w.screen),xn(r,s+.55,1.02,.46,.72);Ft(r,-3.9,-.7,1.72),Ft(r,4,-.55,1.6),Un(r,-5.75,.08,Math.PI/2,1.65,w.white),ii(r,-5.02,1,.47),Ft(r,-6.4,1.4,.55),D(r,5.8,.045,1.18,2.2,.03,1.25,w.navy);for(const s of[4.65,6.95])D(r,s,1.13,.85,.08,2.28,.08,w.gold),D(r,s,1.17,.79,.65,2.18,.025,w.glass);D(r,5.8,2.18,1.24,2.6,.16,1.72,w.navy),D(r,5.8,2.08,2.03,2.55,.035,.04,w.gold);for(const s of[3.5,4.1])Be(r,s,.67,1.8,.025,1.15,w.gold),Be(r,s,.09,1.8,.08,.1,w.black);D(r,3.8,1.27,1.8,.65,.035,.04,w.gold),D(r,3.8,.18,1.8,.78,.08,.51,w.gold),D(r,3.76,.43,1.8,.37,.45,.25,w.rust);for(const s of[-2.8,0,2.8])ps(r,s,.1,2.02)}else if(n==="breakfast"){qi(r,4.3,7.2),Ea(r,0,4.5),D(r,0,.52,-.15,5,.9,.8,w.walnut),D(r,0,1.01,-.15,5.2,.12,.97,w.stone);for(const s of t>0?[-1.7,-.7,.3]:[])D(r,s,1.14,-.17,.66,.14,.45,w.gold),D(r,s,1.24,-.17,.6,.08,.38,w.white);D(r,1.5,1.29,-.24,.43,.53,.38,w.black),Be(r,2.1,1.28,-.2,.15,.4,w.glass),Be(r,2.1,1.13,-.2,.145,.09,w.rust);for(const s of[-5.55,-3.4,3.8,6])wg(r,s,.68);for(const s of[-5.55,-3.4,0,3.8,6])ps(r,s,.5);Ft(r,-6.9,-.87,1.1),Ft(r,6.8,-.8,1.1)}else if(n==="club"){qi(r,-7.2,-3.8),qi(r,3.8,7.2),Ea(r,0,5.4),D(r,0,.58,-.24,5.55,1.02,.58,w.walnut),D(r,0,1.12,-.24,5.8,.11,.79,w.stone),D(r,0,.25,.071,5.5,.05,.035,w.glow);for(const s of[-1.8,-.6,.6,1.8])Be(r,s,.6,.6,.24,.12,w.teal),Be(r,s,.28,.6,.035,.58,w.gold),t>0&&wr(r,s,1.24,-.15),ps(r,s,-.24);Un(r,-5.6,-.54,0,2.05,w.teal),ii(r,-5.6,.57,.5),bi(r,-4.38,.75,-Math.PI/3,w.rust),Un(r,5.25,-.54,0,2.1,w.rust),ii(r,5.25,.6,.52),bi(r,6.52,.7,-Math.PI/3,w.teal),Ft(r,-6.9,.68,1.2),Ft(r,6.9,-.8,1.25),xn(r,-4.15,.05,-.8,1.6)}else if(n==="gym"){qi(r,-7.2,7.2),D(r,0,.093,0,14.4,.025,2.9,w.carpet);for(const s of[-5.65,-3.8,-1.95]){D(r,s,.16,.15,.92,.21,1.72,w.black),D(r,s,.28,.17,.68,.015,1.42,w.carpet);for(const a of[-1,1])D(r,s+a*.42,.7,-.51,.075,1.1,.08,w.black),D(r,s+a*.42,1.13,-.2,.06,.06,.75,w.black);D(r,s,1.26,-.5,.85,.23,.14,w.black),D(r,s,1.3,-.409,.43,.12,.012,w.screen)}for(const s of[.1,1.65]){const a=Be(r,s,.41,.1,.36,.12,w.black);a.rotation.z=Math.PI/2,D(r,s,.39,.2,.07,.69,.09,w.gold),D(r,s,.81,.47,.37,.09,.24,w.black),D(r,s,1.05,-.32,.07,.55,.07,w.black),D(r,s,1.27,-.32,.5,.06,.07,w.gold)}D(r,5.45,.68,-.8,2.8,.07,.58,w.black);for(let s=4.2;s<6.8;s+=.46)Be(r,s,.82,-.8,.13,.16,w.black);for(const s of[3.65,5.2])D(r,s,.12,.61,1.08,.025,1.68,w.teal);Ft(r,6.93,.82,1.2),D(r,2.76,.4,-.87,.6,.7,.53,w.walnut);for(let s=0;s<3;s++)D(r,2.76,.79+s*.065,-.87,.46,.065,.4,w.white)}else if(n==="spa"){qi(r,-7.2,7.2);for(const s of[-4.8,0,4.8]){D(r,s,.4,0,1.7,.6,2.05,w.walnut),D(r,s,.76,0,1.8,.14,2.1,w.white),D(r,s,.87,-.6,1.15,.12,.45,w.white),D(r,s,.86,.4,1.8,.03,.7,w.teal),Ft(r,s+1.2,-.9,1.1),xn(r,s-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)D(r,s+1.2,.15+a*.06,.75,.5,.06,.32,w.white)}}else{D(r,0,.03,0,15,.14,3.6,w.wood);for(let s=-7.3;s<7.4;s+=.24)D(r,s,.11,0,.017,.006,3.45,w.walnut);for(const s of[-6.65,-2.45,2.8,6.9])Ft(r,s,-.8,1.45);for(const s of[-4.4,3.5]){ii(r,s,.45,.66),bi(r,s-.9,.4,Math.PI/2,w.white),bi(r,s+.9,.4,-Math.PI/2,w.white),wr(r,s+.2,.88,.45),Be(r,s,1.07,.45,.026,2.05,w.gold);const a=new At(new Us(1.55,.32,8),w.white);a.position.set(s,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,r.add(a)}Un(r,-.5,-.7,0,1.7,w.teal),ii(r,-.5,.45,.38);for(const s of[-7.35,7.35])D(r,s,.43,0,.055,.8,3.5,w.gold);for(let s=-7.3;s<=7.3;s+=1.46)Be(r,s,.43,1.7,.018,.8,w.gold);D(r,0,.8,1.7,14.7,.035,.035,w.gold),D(r,0,.46,1.7,14.7,.65,.014,w.glass)}if(e>=2){if(n==="lobby"&&(Un(r,-5.6,.8,0,1.8,w.teal),ii(r,-4.25,.8,.35)),n==="breakfast"&&(D(r,2.8,1.1,-.6,.65,.5,.45,w.screen),wr(r,2.8,1.44,-.6)),n==="club"&&(Ea(r,5.8,1.2),xn(r,3.3,.05,-.8,1.8)),n==="gym")for(const s of[3.7,4.6,5.5])D(r,s,.15,.5,.6,.09,1.8,w.rust);if(n==="spa")for(const s of[-2.5,2.5])D(r,s,1.15,-.7,.06,2.1,1.3,w.wood);n==="rooftop"&&Un(r,0,.55,0,2.2,w.rust)}if(e>=3){if(n==="lobby"&&(yi(r,0,1.6,-1.17,3.5,.65,3),D(r,0,.94,.5,6.45,.12,.83,w.gold)),n==="breakfast"&&(D(r,0,.55,.05,5.4,1,.8,w.stone),t>0))for(const s of[-1.8,0,1.8])Be(r,s,1.12,.05,.25,.12,w.gold);if(n==="club"&&(Un(r,-5.5,.4,0,2.8,w.white),yi(r,0,1.85,-1.05,2.7,.45,2)),n==="gym"){D(r,4.9,1.15,-1.23,4,1.85,.05,w.glass);for(const s of[3.1,6.5])D(r,s,1,0,.08,1.8,.08,w.gold);D(r,4.8,1.85,0,3.6,.08,.08,w.gold)}if(n==="spa")for(const s of[-4.8,0,4.8])D(r,s,.88,.4,1.8,.04,.8,w.white),xn(r,s+1.05,.75,.8,.8);if(n==="rooftop"){for(const s of[-6.8,6.8])D(r,s,1.3,-.9,.12,2.6,.12,w.walnut);for(let s=-6.8;s<=6.8;s+=.7)D(r,s,2.5,-.3,.12,.1,2.2,w.walnut)}}if(e>=4){D(r,0,.12,-.15,14,.03,2.9,w.stone);for(const s of[-6.6,6.6])yi(r,s,1.55,-1.15,.7,1.1,4),xn(r,s,.05,.85,1.7);if(n==="spa"&&(D(r,0,.4,.4,2.5,.55,1.5,w.white),D(r,0,.7,.4,2.1,.03,1.1,w.window)),n==="breakfast"||n==="club")for(const s of[-2,2])D(r,s,1.55,-.6,.025,.85,.025,w.gold),Be(r,s,1.95,-.6,.25,.06,w.gold);n==="gym"&&(D(r,0,.3,.3,1.4,.25,1.8,w.black),D(r,0,1.25,-.4,1.2,.6,.12,w.screen))}if(e>=5){if(n!=="rooftop"){for(const s of[-5,-2.5,0,2.5,5])ps(r,s,.5,2.05),D(r,s,2.27,0,2.2,.045,2.6,w.walnut);D(r,0,2.23,1.2,14,.04,.04,w.glow)}else{D(r,0,.35,-.5,3.6,.5,1.1,w.stone),D(r,0,.62,-.5,3.3,.04,.9,w.window);for(const s of[-6,-3,3,6])xn(r,s,.05,.8,1.3)}for(let s=-6.5;s<7;s+=1.3)D(r,s,.15,1.55,.5,.02,.2,w.gold)}return r}function Cg(n,e,t){const i=new Ut,s=bg(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new Ut;return u.position.set(c,.31,0),i.add(u),D(u,0,-.11,0,.085,.26,.1,w.navy),D(u,0,-.245,.035,.11,.07,.17,w.black),u},o=a(-.08),l=a(.08);D(i,0,.47,0,.27,.34,.17,s),D(i,0,.58,.093,.07,.13,.012,w.white),["chill","family","points","forum","creator"].includes(e??"")||D(i,0,.55,.108,.018,.095,.016,w.navy),vn(i,0,.81,0,.185,.21,.16,w.skin),vn(i,0,.94,-.024,.193,.102,.163,w.hair);for(const c of[-.069,.069])vn(i,c,.84,.149,.021,.024,.01,w.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&D(i,c,.856,.156,.09,.066,.012,w.navy);for(const c of[-1,1]){const u=D(i,c*.18,.45,0,.075,.26,.085,s);u.rotation.z=c*.15,vn(i,c*.19,.303,.012,.047,.05,.045,w.skin)}if(e==="chill"&&(Be(i,0,1,0,.23,.06,w.white),Be(i,0,1.06,0,.16,.1,w.white)),e==="road"&&(D(i,.29,.25,.04,.22,.3,.15,w.walnut),D(i,.29,.44,.04,.12,.035,.05,w.gold)),e==="family"&&(D(i,0,.46,-.17,.3,.34,.17,w.rust),D(i,.27,.38,.05,.07,.2,.07,w.teal)),e==="points"&&(D(i,-.26,.4,.09,.15,.23,.025,w.white),D(i,-.26,.44,.11,.11,.04,.01,w.teal)),e==="hunter"&&(D(i,.24,.48,.12,.1,.18,.025,w.black),D(i,.24,.49,.138,.07,.12,.01,w.screen)),e==="forum"&&(vn(i,0,1.01,-.01,.21,.07,.18,w.navy),D(i,0,.99,.17,.2,.025,.16,w.navy),D(i,-.25,.42,.08,.15,.23,.04,w.black)),e==="creator"){D(i,0,.5,.16,.2,.13,.12,w.black);const c=Be(i,0,.5,.26,.065,.1,w.black);c.rotation.x=Math.PI/2,D(i,0,.63,.13,.025,.18,.02,w.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])vn(i,c+.23,.49,.08,.065,.08,.065,w.rust),D(i,c+.23,.35,.08,.015,.21,.015,w.green);if(e==="planner"&&(D(i,-.24,.47,.08,.19,.27,.04,w.teal),D(i,0,.54,.12,.08,.11,.015,w.white)),e==="whale"&&(D(i,0,.59,.12,.04,.09,.025,w.gold),D(i,.2,.36,.055,.08,.04,.09,w.gold),vn(i,0,.96,-.04,.2,.075,.18,w.hair)),e==="auditplus"&&(D(i,-.24,.47,.09,.19,.26,.04,w.walnut),D(i,-.24,.49,.12,.14,.19,.012,w.white),D(i,.23,.45,.09,.012,.17,.012,w.gold)),t==="house"){D(i,.43,.36,.2,.4,.55,.4,w.navy),D(i,.43,.68,.2,.45,.05,.45,w.gold);for(let c=0;c<3;c++)D(i,.43,.75+c*.065,.2,.32,.06,.3,w.white);for(const c of[.28,.58])vn(i,c,.08,.2,.07,.07,.07,w.black)}if(t==="engineering"&&(D(i,.3,.35,.05,.24,.2,.16,w.rust),D(i,.3,.5,.05,.13,.035,.04,w.gold),Be(i,0,1,0,.21,.07,w.gold)),t==="fnb"){D(i,.4,.35,.2,.4,.08,.5,w.gold),D(i,.4,.62,.2,.4,.08,.5,w.gold);for(const c of[.28,.5])Be(i,c,.73,.2,.09,.15,w.white);Be(i,0,1,0,.17,.15,w.white)}return Bs(i,0,0,.47,.3),{group:i,left:o,right:l}}function Pg(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],d=n.group.position.clone();n.group.position.lerpVectors(u,f,l-c);const g=n.group.position.x-d.x,m=n.group.position.z-d.z,M=Math.hypot(g,m)>1e-4;M&&(n.group.rotation.y=Math.atan2(g,m));const p=M?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=p,n.right.rotation.x=-p;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function vc(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*Qi;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?Ku[o]:0;e.push({id:a,floorId:i.id,position:new B(c,s,0),label:new B(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*Qi+3.6}}function Ig(n,e,t){const i=new At(new dr(e,t),new Br({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function Lg(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class Dg{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=vc(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new Sg({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Oc,this.renderer.outputColorSpace=Gt,this.renderer.toneMapping=Bo,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new ef;root=new Ut;camera=new Ns;light=new bf(16768942,3.1);ambient=new xf(12638184,10651490,2.15);raycaster=new Tf;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Ut;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;D(this.root,a,o/2-1,l,1.5,o,1.7,w.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(s+Math.round(c*10)+Math.round(u*10))%3!==0&&D(this.root,a+u,c,l+.87,.14,.24,.015,s%3===0?w.shade:w.window)}D(this.root,0,-.32,0,30,.35,15,w.navy),D(this.root,0,-.13,.7,17.6,.16,5.3,w.stone),D(this.root,0,-.06,2.95,17,.09,.55,w.stone);for(const s of[-8.1,8.4])Ft(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new Ut;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){D(o,0,-.085,0,15.05,.19,3.48,w.stone),D(o,0,-.12,1.77,15.2,.17,.19,w.navy),D(o,0,-.011,1.85,15.1,.025,.02,w.gold),D(o,0,2.405,-.02,15.05,.18,3.4,w.stone);for(const c of[-7.43,7.43])D(o,c,1.19,.18,.18,2.38,3.12,w.stone);D(o,7.94,1.19,-.24,.87,2.38,2.1,w.window);for(const c of[7.52,8.35])D(o,c,1.2,.84,.045,2.4,.06,w.gold);D(o,7.94,-.075,.1,.95,.19,2.85,w.navy),D(o,7.94,1.2,.87,.83,.025,.035,w.gold)}s.entityIds.forEach(c=>{const u=e.entities[c],f=this.layout.entities.find(m=>m.id===c),d=u.kind==="room"?Tg(s.construction?{...u,construction:s.construction}:u):Rg(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let m=1;m<(u.level??1);m++)Ft(d,-6.8+m*.45,-.95,.5+m*.1);d.name=c,d.userData.entityId=c,d.position.x=f.position.x,o.add(d);const g=Ig(c,u.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(d.add(g),this.colliders.push(g),u.kind==="room"){const m=document.createElement("button");m.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),m.textContent=s.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,m.dataset.entityId=c,m.setAttribute("aria-label",u.number+" 房间"),m.onclick=()=>this.store.select(c),this.labels.push(m),this.overlay.append(m)}else{const m=document.createElement("button");m.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),m.dataset.entityId=c,m.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),m.setAttribute("aria-label","查看"+u.name),m.onclick=()=>this.store.select(c),this.labels.push(m),this.overlay.append(m)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),Eg(this.root),this.faultLights=[],this.root.traverse(s=>{s.name==="fault-lamp"&&this.faultLights.push(s)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new Br({color:16766861,transparent:!0,opacity:.9,depthTest:!1});D(this.halo,0,0,0,4.7,.025,.025,r),D(this.halo,0,2.31,0,4.7,.025,.025,r),D(this.halo,-2.35,1.15,0,.025,2.31,.025,r),D(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new ze((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=Lg(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new B(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new B(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new B(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof ru&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Ut,this.scene.add(this.root);const s=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/Qi+1e-5),c=s[l],u=e.floors.findIndex(f=>f.id===c);u>=0&&(o.y+=(u-l)*Qi)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=vc(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const s=this.labels.find(a=>a.dataset.entityId===i.entityId);if(s){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);s.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",s.classList.add("upgraded"),setTimeout(()=>s.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(s=>{const a=s.dataset.entityId===e.selectedId;s.classList.toggle("selected",a),s.setAttribute("aria-pressed",String(a))});const r=this.layout.entities.find(s=>s.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!r,r){const s=e.entities[r.id];this.halo.scale.x=s.kind==="room"?1:3.1,this.halo.position.set(r.position.x,r.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...Cg(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*Qi+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new B(o.x,o.level*Qi+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(r=>Pg(r,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const r=this.store.getState(),s=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=r.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});s!==this.speechSlot&&(this.speechSlot=s,this.speaker=a.length?a[s%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new B(-.6,1.25,0)));o.hidden=!1;const f=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),d=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${f}px,${d+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(r=>{r.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(kr).forEach(e=>e.dispose()),yg(),this.overlay.remove()}}const jo="jinwanyoutao_v8_game_1";function Ug(){try{const n=localStorage.getItem(jo);if(!n)return Pa();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return lr(e),$n(e),e.game.operations.day!==e.game.day&&Do(e,!e.game.reportOpen),e.guests.forEach(t=>Is(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=Pa();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function Mu(n){try{return localStorage.setItem(jo,JSON.stringify(n)),!0}catch{return!1}}const Wn=Yu(Ug()),br=rd(document.querySelector("#app"),Wn);Ru(document.querySelector("#app"),Wn);let Co=!1,Po=Wn.getState().game.notice.startsWith("存档读取失败");const el=()=>{!Co&&!Po&&!Mu(Wn.getState())&&(Po=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&Wn.advance(4*Wn.getState().speed)},1e3);setInterval(el,5e3);document.addEventListener("visibilitychange",el);window.addEventListener("pagehide",el);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){Co=!0;try{localStorage.removeItem(jo),Wn.reset(),Po=!1,Mu(Wn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{Co=!1}}});function ks(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}ks();window.visualViewport?.addEventListener("resize",ks);window.visualViewport?.addEventListener("scroll",ks);window.addEventListener("resize",ks);try{const n=new Dg(br.stage,Wn);br.setFocusHandler(e=>n.focusFloor(e)),br.stage.addEventListener("world-error",e=>br.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),br.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
