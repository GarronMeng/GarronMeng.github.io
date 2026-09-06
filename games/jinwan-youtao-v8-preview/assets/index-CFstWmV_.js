(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ou(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,r=!1,s=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(p,m=.13,x=0)=>{if(!i||!r)return;const g=i.createOscillator(),h=i.createGain(),A=i.currentTime+x;g.frequency.value=p,h.gain.setValueAtTime(.016,A),h.gain.exponentialRampToValueAtTime(1e-4,A+m),g.connect(h),h.connect(i.destination),g.start(A),g.stop(A+m),g.onended=()=>{g.disconnect(),h.disconnect()}};t.onclick=async()=>{if(r=!r,r){if(i??=new AudioContext,await i.resume(),!l){const p=i.createBuffer(1,i.sampleRate*2,i.sampleRate),m=p.getChannelData(0);for(let g=0;g<m.length;g++)m[g]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=p,l.loop=!0,c=i.createGain(),c.gain.value=.01;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=700,l.connect(x),x.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(r)),t.title=r?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const f=e.subscribe(p=>{const m=Date.now();i&&c&&c.gain.setTargetAtTime(p.game?.weather==="rain"?.12:.015,i.currentTime,.5),r&&!document.hidden&&m-s>1800&&((p.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),s=m):p.metrics.cash>o&&(u(1046,.1),s=m)),a=p.game?.arrivals??0,o=p.metrics.cash}),d=()=>{document.hidden?i?.suspend():r&&i?.resume()};document.addEventListener("visibilitychange",d),window.addEventListener("pagehide",()=>{f(),i?.close()},{once:!0})}function Ac(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,f)=>{const d="floor-"+l,p="facility-"+l;e.push({id:d,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[p]}),t[p]={id:p,kind:"facility",floorId:d,role:l,name:c,capacity:u,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),f="room-"+u,d=r[((o-2)*3+c)%r.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:d,nightsLeft:d==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,f,d,p],m)=>s.push({id:"public-"+m,name:p?"当班员工":"住客",tier:p?"Staff":"Member",floorId:"floor-"+o,thought:d,color:f,route:[l,c],z:u,staff:!!p}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const ir={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},ui=n=>n.category??(n.type==="suite"?"suite":"standard"),wc=n=>n.bed??(n.type==="twin"?"twin":"king"),Rc=n=>["suite","premium"].includes(ui(n)),Zt=n=>ui(n)==="suite",Ca=n=>ir[ui(n)].name+" · "+(wc(n)==="twin"?"双床":"大床"),Cc=n=>Object.values(n.entities).filter(e=>e.kind==="room"),et=n=>Cc(n).filter(e=>e.status!=="unbuilt"),Pc=n=>et(n).filter(e=>Zt(e)&&e.status==="available").length,Ic=n=>et(n).filter(e=>e.status==="occupied").length,gl=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId);function Bu(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=et(n),i=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),r=i.length,s=t.filter(p=>p.status==="dirty"||p.status==="cleaning").length,a=e.events.length+n.guests.filter(p=>!p.departing&&(p.late==="pending"||p.challenge&&!p.challenge.resolved)).length,o=i.reduce((p,m)=>p+(m.rate??e.price),0),l=i.filter(p=>p.source==="平台").reduce((p,m)=>p+Math.round((m.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((p,m)=>p+m*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),s&&u.push({title:"夜班先把房间交出来",text:`还有 ${s} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const f=Math.round(r/Math.max(1,t.length)*100),d=e.operations?.forecast?.occupancy;d!==void 0&&f<d-15&&u.push({title:"入住低于晨会预估",text:`当前 ${f}%，预估 ${d}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={day:e.day,minute:e.minute,open:!0,occupancy:f,expected:d,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:o,projectedNet:e.revenue+o-e.expense-l-c,pending:a,complaints:e.complaints,logs:e.logs.filter(p=>p.day===e.day&&p.category==="客诉").map(p=>({...p})),notes:u.slice(0,4)},e.paused=!0}const $r=2.12,Xr=7.94,Vt=n=>n.game.day*1440+n.game.minute;function Or(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Vt(n)+20+Ci(e.id)%75,trail:[],revision:0}}function Ci(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function En(n,e,t){Or(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(d=>d.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Ci(e.id+t)%12*.95,c=s?2.8:1.25,u=[],f=(d,p,m,x)=>u.push({x:d,z:p,level:m,phase:x});return f(o.x,$r,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(Xr,$r,o.level,"corridor"),f(Xr,.9,o.level,"elevator"),f(Xr,.9,a,"elevator"),f(Xr,$r,a,"corridor")),f(l,$r,a,"corridor"),f(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=Vt(n)+60,e.visitUntil=void 0,!0}function Lc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;r.x+=s*u,r.z+=a*u,r.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Vt(n)+45+Ci(e.id+Vt(n))%65,!0)}function ku(n){for(const e of n.guests)Or(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Dc(n){n.movement&&n.movement.trail.push({...n.movement.position})}function _l(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const Lr=n=>n.lateHour??(n.tier==="Globalist"?16:14),di=n=>Lr(n)===16?"4PM":"2PM",or=n=>Lr(n)===16?14:12,Uc=n=>n.late==="honor"?Lr(n)*60:n.late==="deny"||n.late==="pending"?or(n)*60:660;function Nc(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const Oo={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Fc=n=>n.name+":"+n.persona;function An(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Vt(n)+35,e.speech.next=0,er(n,e)}function er(n,e){if(e.staff)return;const t=Vt(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(m=>m.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[r?.position.phase,a,s,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(m=>m.kind==="room"&&Zt(m)&&m.status==="available").length;let f=[];if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[di(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+or(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)f=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)f=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)f=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[Oo[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const m=e.experience,x=m?.place==="facility-"+s&&t-m.at<150;x&&m.kind==="shortage"?f=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:x&&m.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+di(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const m=n.game.operations?.profiles[e.profileId??""];s==="guest"&&m&&m.visits>0&&f.push(m.trust>=2?"这家以后可以常住，下次带朋友来。":m.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const x=n.game.guestMemory?.[Fc(e)];s==="guest"&&x?.visits&&f.push(x.satisfaction<80?"上次住得不太顺，这次再看看。":x.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const d=n.game.dialogueRecent??={};for(const[m,x]of Object.entries(d))t-x>240&&delete d[m];const p=f.filter(m=>!i.recent.some(x=>x.text===m&&t-x.at<180)&&t-(d[m]??-9999)>25);if(p.length){const m=p[Ci(e.id+t)%p.length];e.thought=m,i.recent.push({text:m,at:t}),i.recent=i.recent.slice(-8),d[m]=t}else e.thought="";i.next=t+45}function Dr(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(r=>!r.staff&&!r.departing&&r.floorId===t.floorId&&!r.movement?.steps.length)??n.guests.find(r=>r.staff&&(r.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function fr(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function Vn(n,e,t=1){const i=fr(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)r.id===e&&(r.progress=Math.min(r.goal,r.progress+t))}const zu=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function Gu(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=zu[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function tr(n){const e=et(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function Oc(n){const e=n.game.development,t=et(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const Es={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function Qi(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function qr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Hu(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=fr(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;if(r.construction)return t.notice="该公区正在施工。",!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;qr(n,3500*s)&&(r.construction={remaining:120,total:120,targetLevel:s+1},Dr(n,r.id),Vn(n,"upgrade"),Qi(n,r.name+"开始封闭改造：2 小时后升级至 "+(s+1)+" 级。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;qr(n,4500*s)&&(t.managers[r]++,Qi(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;qr(n,2200)&&(i.campaignUntil=t.day+2,Qi(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=Es[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;qr(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},Qi(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=Oc(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,Qi(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function Vu(n){const e=n.game,t=fr(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=Es[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(d=>d.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),f=Math.round(u*r.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,Vn(n,"revenue",f),Vn(n,"ancillary",f),Vn(n,"activity");for(const d of a.slice(0,u))d.satisfaction=Math.min(100,(d.satisfaction??90)+5),d.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,Qi(n,r.name+"结束："+u+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-r.cost)+"。")}const Bc={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function Kn(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function dn(n,e,t="部门",i){const r=n.game;r.notice=e,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:t,text:e,target:i})}function Pa(n,e){const t=Kn(n),i="profile-"+n.game.nextId++,r=Ci(i),s=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][r%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(r/8)%8],persona:s[r%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function kc(n,e=n.game.price){const t=n.game,i=t.operations,r=(t.day-1)%7>=5,s=t.positioning==="business"?r?.75:1.3:t.positioning==="resort"?r?1.4:.9:1.1;return Math.max(1,Math.round((3+et(n).length*.12)*s*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Ns(n){const e=n.game,t=e.operations,i=t.bookings.filter(d=>d.status!=="lost"),r=i.filter(d=>d.status==="confirmed"),s=n.guests.filter(d=>d.roomId&&!d.departing),a=s.filter(d=>(d.checkoutDay??e.day)>e.day).length,o=s.length-a,l=kc(n),c=et(n).filter(d=>!d.construction).length,u=Math.min(c,a+r.length+Math.max(0,l-t.walkinArrivals)),f=d=>d.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:s.reduce((d,p)=>d+f(p),0),housekeeping:o+et(n).filter(d=>d.status==="dirty"||d.status==="cleaning").length,suites:r.filter(d=>t.profiles[d.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(d=>d.segment==="商务").length,resort:i.filter(d=>d.segment==="度假").length,group:i.filter(d=>d.segment==="团队").length,price:e.price}}function Bo(n,e=!0){const t=n.game,i=Kn(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let r=(t.seed^Math.imul(t.day,2654435761))>>>0;const s=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),a=s();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=et(n).filter(p=>!p.construction).length,l=o-n.guests.filter(p=>p.roomId&&(p.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(p=>p.visits>0&&!n.guests.some(m=>m.profileId===p.id)),f=new Set;for(let p=0;p<c;p++){let m=u.find(A=>!f.has(A.id)&&s()<.5);m||(m=Pa(n,s())),f.add(m.id);const x=i.event==="expo"&&p<Math.ceil(c*.35)?"团单":s()<.6?"APP":"平台",g=t.positioning==="resort"||(t.day-1)%7>=5&&s()<.6,h={id:"booking-"+t.nextId++,profileId:m.id,source:x,eta:x==="团单"?840:780+Math.floor(s()*330),nights:Nc(g,s(),s()),rate:Math.round(t.price*(x==="团单"?.88:1)),segment:x==="团单"?"团队":g?"度假":"商务",status:"confirmed"};if(p<2&&(h.challenge=m.persona==="auditplus"?"audit":m.persona==="family"?"family":m.tier==="Globalist"?"sua":"quiet"),h.challenge==="sua"){const A=et(n).find(D=>Zt(D)&&D.status==="available"&&!D.suaBookingId);A?(h.sua=!0,h.roomId=A.id,A.suaBookingId=h.id,A.status="reserved"):h.challenge="quiet"}i.bookings.push(h)}const d=u.find(p=>p.trust>=2&&p.visits>=2);if(d&&l>i.bookings.length){const p=Pa(n,s());p.referredBy=d.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:p.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Ns(n),e&&(t.paused=!0),dn(n,`早班准备：${i.bookings.length} 笔确认预订，${Bc[i.event]}。`)}function Wu(n,e){const t=Kn(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function $u(n,e,t){const i=Kn(n);let r=t?i.profiles[t.profileId]:void 0;r||(r=Pa(n,Ci(e.id)%100/100)),e.profileId=r.id,e.name=r.name,e.persona=r.persona,e.tier=r.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,e.satisfaction=Math.max(65,Math.min(98,88+r.trust*2))}function ko(n,e){const t=Kn(n),i=t.bookings.find(r=>r.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),dn(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const r=n.entities[i.roomId];r?.kind==="room"&&r.suaBookingId===i.id&&(r.suaBookingId=void 0,r.status==="reserved"&&(r.status="available"))}}function Xu(n,e){const t=Kn(n),i=t.profiles[e.profileId??""];if(!i)return;const r=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(r?1:-1))),i.spend+=e.spend??0;const s=r?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:s}),i.history=i.history.slice(-8),r?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),dn(n,i.name+"："+s,"入住")}function qu(n,e){const t=n.game,i=Kn(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Ns(n),i.briefOpen=!1,t.paused=!1,dn(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",dn(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const r=n.guests.find(c=>c.id===e.id),s=r?.challenge;if(!r||!s||s.resolved)return!0;if(!r.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=s.kind==="quiet"&&e.value==="quiet"||s.kind==="family"&&e.value==="family"||s.kind==="audit"&&e.value==="inspect"||s.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,s.resolved=!0;let l=a&&(s.kind!=="sua"||!!r.upgrades);if(a&&s.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[r.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&s.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!et(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&s.kind==="quiet"){const c=n.entities[r.roomId??""];if(c&&n.floors.some(f=>f.construction&&Math.abs(f.number-(n.floors.find(d=>d.id===c.floorId)?.number??0))<=1)){const f=et(n).find(d=>d.status==="available"&&!d.construction&&!n.floors.some(p=>p.construction&&Math.abs(p.number-(n.floors.find(m=>m.id===d.floorId)?.number??0))<=1));l=!!f,f&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,f.status="occupied",f.guestId=r.id,f.nightsLeft=Math.max(0,(r.checkoutDay??t.day)-t.day),r.roomId=f.id,r.movement?.steps.length||En(n,r,f.id))}}return r.serviceDone=l,r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(l?8:-8))),s.outcome=l?"需求已兑现":"未解决核心诉求",Vn(n,"resolve"),An(n,r,l?"recovery":"denied"),dn(n,r.name+"："+s.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",r.roomId??"facility-lobby"),!0}return!1}const ai=(n,e,t=!1)=>Math.round(n*(ui(e)==="suite"&&t?1:ir[ui(e)].factor)*(1+((e.level??1)-1)*.1)),zc=n=>2500*n,wr=n=>n?Math.max(8,24-n*5):30,Ia=n=>n?Math.max(10,35-n*7):40,Ts=n=>Math.max(140,260-n*20),La=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),Gc={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function vl(n,e,t,i="floor-lobby"){const r={id:e,name:Gc[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(r),Or(n,r),r}function bi(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function Ni(n,e,t,i,r){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:r},En(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",dn(n,e.name+" 已接单。","部门",i),!0)}function Yu(n,e,t){const i=n.game,r=Kn(n);for(const a of Object.keys(Gc)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||vl(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const s=et(n).find(a=>a.timer&&!a.construction&&!bi(n,a.id));if(s){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=vl(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&Ni(n,a,s.status==="maintenance"?"repair":"clean",s.id,s.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(Or(n,a),Lc(n,a),Dc(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),Vn(n,"service"),r.hkCompleted+=l.kind==="clean"?1:0,dn(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(f=>!(f.kind==="supplies"&&f.target===l.target)),r.stockDelivered++,dn(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(f=>!f.staff&&!f.roomId&&!f.departing);if(u){const f=r.bookings.find(x=>x.id===u.reservationId)?.roomId,d=et(n).filter(x=>(x.status==="available"||x.status==="reserved"&&(x.suaBookingId===u.reservationId||!x.suaBookingId&&u.tier==="Globalist"))&&!x.construction),p=d.filter(x=>x.type==="suite"&&x.category!=="premium"),m=f?d.find(x=>x.id===f):u.tier==="Globalist"?p[0]??d[0]:d.find(x=>!(r.suitePolicy==="hold"&&p.length<=1&&p.includes(x)));m&&e({type:"checkin",id:u.id,roomId:m.id})}}Vn(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=Vt(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=et(n).find(c=>c.status==="dirty"&&!c.construction&&!bi(n,c.id));if(l&&Ni(n,a,"clean",l.id,wr(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=et(n).find(c=>c.status==="maintenance"&&!c.construction&&!bi(n,c.id));if(l&&n.metrics.cash>=100){Ni(n,a,"repair",l.id,Ia(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!bi(n,l)&&n.metrics.cash>=Ts(i.managers.fnb)){Ni(n,a,"stock",l,8)&&t(Ts(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){Ni(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&Vt(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&Ni(n,a,"patrol",c.id,10)}}}function Ku(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,Dr(n,e.entityIds[0]),dn(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),Dr(n,e.id),dn(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function Fs(n,e){e.staff||(e.persona??=Object.keys(Oo)[Ci(e.id)%11],Or(n,e))}function Zu(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function Ju(n,e){const t=n.game.minute,i=t/60,r=Oo[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=Zu(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function Hc(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function xl(n,e,t){e.waitingFor=t,e.waitSince=Vt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function Ml(n,e,t,i){if(e.lastVisit=t.id,Hc(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:Vt(n)},xl(n,e,t.id),An(n,e,"full");return}if(t.construction){En(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock";if(r&&n.game[s]<=0){e.experience={place:t.id,kind:"shortage",at:Vt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),An(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),xl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:Vt(n)},r&&(n.game[s]=Math.max(0,n.game[s]-(e.persona==="family"?3:1)));const a=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,o=Math.round(a*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));o&&(e.spend=(e.spend??0)+o,i.income(o),i.progress("ancillary",o)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,er(n,e)}function As(n,e){e.departing=!0,e.movement?.steps.length||En(n,e,"exit")}function Qu(n,e,t,i){Fs(n,e);const r=e.movement,s=Vt(n),a=Lc(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&En(n,e,"exit"),er(n,e);return}if(!e.roomId){er(n,e);return}if(a&&!e.waitingFor){const o=n.entities[r.destination];o?.kind==="facility"&&Ml(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!r.steps.length&&o?.kind==="facility"&&!o.construction&&Hc(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0)&&(o.role!=="club"||n.game.clubStock>0)?Ml(n,e,o,i):!r.steps.length&&s-(e.waitSince??s)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),En(n,e,e.roomId)),er(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",An(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+di(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[r.destination]?.kind==="facility"&&n.entities[r.destination].construction)&&En(n,e,e.roomId),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)En(n,e,e.roomId);else{const o=Ju(n,e);let l=t()*o.reduce((u,f)=>u+f.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)En(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}er(n,e)}function ju(n,e,t){const i=n.game.guestMemory??={},r=Fc(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),An(n,e,"checkout")}const Da={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},qs=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,Vc=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function ws(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,et(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function an(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function Ze(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function jt(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function zo(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,Vn(n,"revenue",e)}function zn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const en=Vn,Wc=Gu;function Ua(){const n=Ac();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:Wc(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=Zt(t)?900:650,e.satisfaction=90,e.segment="商务"}for(const e of et(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return fr(n),n.guests.forEach(e=>Fs(n,e)),Na(n),Bo(n),Ze(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),Go(n),n}function Na(n,e){const t=n.game,i=an(n),r=["陈","林","何","张","周","王","李","赵"][Math.floor(an(n)*8)]+"先生",s=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&an(n)<.65,o=Nc(a,an(n),an(n)),l={id:"guest-"+t.nextId++,name:r,tier:s,floorId:"floor-lobby",thought:s==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[r]??0)};$u(n,l,e),Fs(n,l),l.goh=l.tier==="Globalist"&&an(n)<.12,l.sua=!!e?.sua,An(n,l,"arrival"),n.guests.push(l),t.arrivals++,Ze(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const Gn=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function Go(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function ed(n,e){e.roomId&&En(n,e,e.roomId)}function td(n){const e=n.game,t=et(n);let i=0,r=0;for(const u of n.guests)if(u.roomId){const f=u.rate??e.price;if(i+=f,u.spend=(u.spend??0)+f,u.source==="平台"){const d=Math.round(f*.15);n.metrics.cash-=d,e.expense+=d}r++}zo(n,i),e.nights=r;for(const u of Gn(n))ko(n,u),As(n,u);const s=380+t.length*65+Object.values(e.managers).reduce((u,f)=>u+f*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":ws(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(r/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:tr(n).total});const c=fr(n).scores;c.push({day:e.day,value:tr(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),zn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),Ze(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function nd(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=an(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=Wc(e.day);for(const t of et(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=La(ws(n)>1.1?750:590,e.level,e.managers.revenue)),Bo(n),Ze(n,"部门",`${Vc(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(ws(n)*100)}%。`)}function id(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>zo(n,r),reputation:r=>zn(n,r),log:(r,s,a)=>Ze(n,r,s,a),progress:(r,s=1)=>en(n,r,s)};ku(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,Ku(n),Yu(n,a=>Fa(n,a),a=>jt(n,a)),Wu(n,a=>Na(n,a)),Vu(n);const s=et(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&!a.construction&&!bi(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",en(n,"service"),Ze(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));Gn(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(Qu(n,a,()=>an(n),i),Dc(a),a.departing){a.exitAt!==void 0&&Vt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(ko(n,a),As(n,a),t.lost++,t.complaints++,zn(n,-1),Ze(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=Uc(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",Ze(n,"客诉",`${a.name} 的 ${di(a)} 未确认，按 ${or(a)}:00 退房。`,o.id),zn(n,-1)),Xu(n,a),ju(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,As(n,a),Ze(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(Gn(n).length<8&&Na(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/kc(n)*(.7+an(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(an(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),Ze(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(an(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?Fa(n,{type:"resolve",id:String(a.id),value:"sop"}):!bi(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,zn(n,-2),Ze(n,"客诉",`未及时处理：${a.title}`,a.target))}Bu(n),t.minute>=1440&&td(n)}Go(n)}function Fa(n,e){const t=n.game;if(!t||qu(n,e)||Hu(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=Gn(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===s.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=s.bookedRate??ai(t.price,a,s.tier==="Globalist"),s.upgrades=Zt(a)&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&!Rc(a),s.upgrades?(t.upgrades++,en(n,"vip"),zn(n,1)):s.tier==="Globalist"&&et(n).some(l=>Zt(l)&&l.status==="available")&&zn(n,-1);const o=t.operations?.bookings.find(l=>l.id===s.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,ed(n,s),An(n,s,s.denied?"denied":"checkin"),en(n,"arrivals"),Ze(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=Gn(n).find(a=>a.id===e.id);s&&(ko(n,s),As(n,s),An(n,s,"denied"),t.lost++,Ze(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&jt(n,90)&&(r.status="cleaning",r.timer=30,Ze(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.construction&&!r.timer&&!bi(n,r.id)&&jt(n,180)?(r.timer=40,Ze(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&jt(n,200)&&(i.maintenance=100,Ze(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(r?.status!=="unbuilt"||n.floors.find(l=>l.id===r.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[s,a]=String(e.value).split(":");if(!Object.hasOwn(ir,s)||!["king","twin"].includes(a))break;const o=s;if(!jt(n,ir[o].cost))break;r.category=o,r.bed=a,r.type=o==="suite"||o==="premium"?"suite":r.bed,r.status="available",r.level=1,Dr(n,r.id),Ze(n,"升级",`${r.number} 已设置为 ${ir[o].name} · ${a==="twin"?"双床":"大床"}。`,r.id);break}case"upgrade":r?.status==="available"&&(r.level??1)<5&&jt(n,zc(r.level??1))&&(r.construction={remaining:90,total:90,targetLevel:(r.level??1)+1},r.status="maintenance",Dr(n,r.id),en(n,"upgrade"),Ze(n,"升级",`${r.number} 封闭装修：90 分钟后升级竣工。`,r.id));break;case"reserve":r?.status==="available"&&Zt(r)&&(r.status="reserved",Ze(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&!r.suaBookingId&&(r.status="available",Ze(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(Da,s)||t.managers[s])break;jt(n,3800)&&(t.managers[s]=1,en(n,"delegate"),Ze(n,"部门",`${Da[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}jt(n,300)&&(t[s]=Math.min(160,t[s]+50),en(n,"stock"),Ze(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!jt(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,en(n,"service")),s.kind==="supplies"&&(t.stock+=25),en(n,"resolve"),zn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&en(n,"delegate"),Ze(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!jt(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}_l(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,Ze(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),en(n,"late-decision"),zn(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),An(n,s,s.late==="honor"?"late-honor":"late-deny"),Ze(n,"入住",`${s.name} 已确认 ${s.late==="honor"?di(s):or(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;jt(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),An(n,s,"recovery"),en(n,"resolve"),Ze(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(jt(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");_l(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),Ze(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),Ze(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,Ze(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&nd(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(s.claimed=!0,zo(n,s.reward),Ze(n,"收益",`完成「${s.title}」，奖励 ¥${s.reward}。`));break}}Go(n)}function Oa(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))Oa(e)}return n}function rd(n=Ac()){let e=Oa(structuredClone(n));const t=new Set,i=r=>{e=Oa({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);Fa(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);id(s,r),i(s)},reset(){i(Ua())}}}const jn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},Ba={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},nr=2.55,sd=[-4.93,0,4.93],Sl={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function Pi(n){const e=typeof n=="string"?n:n.persona??"chill",t=Sl[e]??Sl.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",r=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",s=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${r}${s}</svg></span>`}function Ho(n,e){return`<section class="guest-card person-card">${Pi(n)}<div class="person-body"><div class="person-heading"><strong>${String(n.name).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}</strong><span class="person-tier">${n.tier}</span></div>${e}</div></section>`}const Tn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ad={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Bn=(n,e)=>`<button class="game-action" data-open="${e}">${n} →</button>`;function St(n,e,t,i,r,s=""){return`<aside class="head-advice">${Pi(e)}<div><small>${ad[e]}主管 · ${n.game.managers[e]?"在岗建议":"筹备建议 · 尚未聘任"}</small><h3>${Tn(t)}</h3><p>${Tn(i)}</p>${r?`<p class="trade-off">${Tn(r)}</p>`:""}${s?`<div class="action-row">${s}</div>`:""}</div></aside>`}function od(n,e){const t=n.game,i=et(n),r=n.guests.filter(o=>!o.staff&&!o.roomId&&!o.departing),s=i.filter(o=>o.status==="dirty"),a=n.guests.filter(o=>!o.departing&&(o.late==="pending"||o.challenge&&!o.challenge.resolved)).length+t.events.length;return e==="front"?St(n,"front",r.length?`${r.length} 位客人在等房`:"前台暂时不忙","先接待即将失去耐心的客人；SUA 客人优先核对已锁标准套。","免费升套占用套房库存；拒绝确认预订需支付 ¥600 安置费。"):e==="events"?St(n,"front",a?`${a} 项诉求需要决定`:"目前没有待办","先看客人的核心诉求，再决定亲自处理还是授权主管。","欢迎礼不能代替承诺；晚退让客人满意，也把翻房时间推迟。"):e==="hotel"||e==="entity"?St(n,"house",s.length?`${s.length} 间脏房还不能卖`:"让现有房间先创造收入",s.length?"建议先翻房，再考虑花钱扩建。":"空房可以接客，也可以停卖装修；先看今天还有多少人要来。","清洁 ¥90 / 间；装修停卖 90 分钟，扩建封闭 240 分钟。",e==="hotel"&&s[0]?`<button class="game-action" data-entity="${s[0].id}">先看 ${s[0].number} →</button>`:""):e==="operations"?t.stock<20||t.clubStock<20?St(n,"fnb","餐台快见底了",`早餐 ${t.stock} 份，酒廊 ${t.clubStock} 份；先补短缺的餐台。`,"每次采购 ¥300 / 50 份；聘任后能自动配送，但要付每日工资。",`<button class="game-action" data-action="stock" data-id="${t.stock<20?"breakfast":"club"}">补足低库存 · ¥300</button>`):St(n,"house",s.length?"翻房开始积压":"把重复工作交给团队",s.length?`还有 ${s.length} 间脏房；先比较自己处理与长期授权。`:"主管到岗后，员工会到现场接手常规工作。","首聘 ¥3,800，工资 ¥180 / 天；工作量少时先手动处理也合理。",Bn("看房态","hotel")):e==="development"?St(n,"revenue","先判断酒店缺客，还是缺容量",`当前 ${i.filter(o=>o.status==="occupied").length} / ${i.length} 间在住。`,"推广增加客流但不保证成交；满房时投放可能增加拒客，装修则暂时减少可售房。",Bn("先看今日预订","bookings")):e==="bookings"?St(n,"front","先认出今天难接待的客人","展开 SUA、特别关注和即将到店的预订，提前留房。","预订报价已锁定；Walk-in 不在预订表内。",Bn("接待到店客人","front")):e==="history"?St(n,"front","上次没解决的事，客人还记得","先看回访客人的最近一条记录，再决定这次怎样接待。","持续兑现承诺会积累信任；单次送礼不保证挽回体验。",Bn("看当前诉求","events")):e==="tasks"?St(n,"front","今天先完成一件有意义的事","先跟随三日带教，再选择与当前酒店问题一致的任务。","奖励是额外收入；别为了任务在满房时继续花钱获客。"):e==="score"||e==="log"?St(n,"revenue","用结果找到下一步","先检查待办和房态，再回看评分或日志中的变化。","改善服务需要时间与成本，单次分数变化不代表长期收益。",Bn("看待办","events")+Bn("看房态","hotel")):""}function $c(n){const e=n.game,t=e.logs.filter(s=>s.day===e.day),i=s=>t.some(a=>s.test(a.text)),r=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(s=>s.challenge&&!s.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:r,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:r,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:r,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}function ka(n){const e=$c(n);if(!e.length)return"";const t=e.findIndex(s=>!s.done),i=e[t<0?e.length-1:t],r=n.game.day===1?"front":n.game.day===2?"fnb":"revenue";return`<section class="teaching"><small>DAY ${n.game.day} / 3 · ${["接待与兑现","服务与授权","预测与复盘"][n.game.day-1]}</small><div class="teaching-track">${e.map((s,a)=>`<span class="${s.done?"done":a===t?"current":""}">${s.done?"✓":a+1} ${s.title}</span>`).join("")}</div>${t<0?"<p>今日带教完成。你可以自由经营，明天继续接班。</p>":St(n,r,i.title,i.text,i.trade,Bn("继续这一幕",i.target))}</section>`}function ld(n,e){const t=et(n).filter(r=>r.status==="available"||r.status==="reserved"&&e.tier==="Globalist"&&(!r.suaBookingId||r.suaBookingId===e.reservationId)).sort((r,s)=>+(s.suaBookingId===e.reservationId&&!!s.suaBookingId)-+(r.suaBookingId===e.reservationId&&!!r.suaBookingId)||(e.tier==="Globalist"?Number(Zt(s))-Number(Zt(r)):+(r.type==="suite")-+(s.type==="suite"))),i=(r,s)=>`<button class="room-choice ${s===0?"recommended":""}" data-action="checkin" data-id="${Tn(e.id)}" data-room="${r.id}"><small>${s===0?"建议安排":"另一种选择"}</small><strong>${r.number} · ${Ca(r)}</strong><span>${r.suaBookingId?"兑现 SUA 锁房":e.tier==="Globalist"&&Zt(r)?"免费升套 · 占用一间标准套":"保留其他房型库存"} · 点击入住</span></button>`;return`<div id="assign-${Tn(e.id)}" tabindex="-1">${t.length?`<div class="room-choice-list">${t.slice(0,2).map(i).join("")}</div>${t.length>2?`<details class="manager-card"><summary>其他 ${t.length-2} 间可用房</summary>${t.slice(2).map((r,s)=>i(r,s+2)).join("")}</details>`:""}`:Bn("暂无可售房 · 先看房态","hotel")}</div>`}function cd(n){return`<h2>客人到了</h2>${n.guests.filter(t=>!t.staff&&!t.roomId&&!t.departing).sort((t,i)=>(t.patience??0)-(i.patience??0)).map((t,i)=>{const r=Ho(t,`<blockquote>${Tn(t.thought)}</blockquote><p>${t.stayLength} 晚 · ${Tn(t.tier)}${t.sua?" · SUA 已确认":""}</p>${ld(n,t)}<details class="manager-card"><summary>客史、等候与其他处理</summary><p>${Tn(t.segment)} · 耐心 ${t.patience} 分钟</p><p>拒绝确认预订会产生 ¥600 安置费。</p><button class="game-action" data-action="reject" data-id="${Tn(t.id)}">婉拒本次入住</button></details>`);return i===0?r:`<details class="manager-card"><summary>${Tn(t.name)} · 等候 ${t.patience} 分钟耐心</summary>${r}</details>`}).join("")||'<p class="empty">暂时没有客人排队，关上面板继续经营。</p>'}`}function ud(n){const e=n.game,t=Ns(n);return e.day<=3?ka(n).replace('data-open="brief"','data-reveal="decisions"'):St(n,t.breakfast>e.stock?"fnb":"revenue",t.breakfast>e.stock?"早餐预估超过库存":t.occupancy>=90?"今天可能接近满房":"今天还有接客空间",`预计入住 ${t.occupancy}%，早餐 ${t.breakfast} 人 / 库存 ${e.stock} 份。`,t.breakfast>e.stock?"先补货能降低断供风险；每次支出 ¥300。":"先保留现价也可以；高价提高单晚收入，但可能减少临时客流。")}function dd(n,e){const t=n.entities[e];return t?t.construction?St(n,"engineering","这里正在封闭施工",`剩余 ${t.construction.remaining} 游戏分钟。`,"施工完成前无法出售或使用，先处理酒店其他区域。"):t.kind==="room"?t.status==="occupied"?St(n,"front","先看这位客人需要什么","优先兑现待办和晚退承诺，再考虑额外服务。","个性化服务 ¥120；特别诉求仍需在待办单独落实。",Bn("处理诉求","events")):t.status==="dirty"?St(n,"house","这间房还不能接客","安排翻房，等清洁完成后再分配给新客。","手动清洁 ¥90 / 30 分钟；已有员工接手时可等待。"):t.status==="maintenance"?St(n,"engineering","故障房正在损失销售机会","先确认有没有工程员工或维修计时，再决定亲自安排。","手动维修 ¥180；主管到岗后可自动安排常规维修。"):t.status==="unbuilt"?St(n,"revenue","先决定这间房要服务谁","普通房控制投入；标准套房能兑现会员升套。","尊享套投入更高，按付费房价出售，不用于标准套免费升级。"):St(n,"house","接客，还是暂时停卖升级？","有客人排队时先安排入住，客流空档再考虑装修。","升级提高后续新客房价，但房间要停卖 90 分钟。"):St(n,t.role==="lobby"?"front":"fnb",`${t.name} · ${t.usage} / ${t.capacity} 人`,t.usage>=t.capacity?"容量已满，留意排队客人的体验。":"先保证供应和维护，再考虑扩大容量。","升级需要封闭施工；补货和维护可以先解决眼前问题。"):""}const fn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),za=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),tn=(n,e,t="",i="")=>`<button class="game-action" data-action="${e}" data-id="${fn(t)}" data-value="${i}">${n}</button>`,Yt=(n,e)=>`<div><small>${n}</small><strong>${e}</strong></div>`;function fd(n){const e=n.game,t=e.operations,i=Ns(n),r=t.bookings.length,s=(e.day-1)%7>=5,a=t.bookings.filter(l=>l.status==="confirmed").length,o=[["收益经理",e.managers.revenue,i.occupancy>=90?"预计接近满房，广告可能只带来更多拒客。":"仍有空房，比较低价获客和高价利润。"],["前厅经理",e.managers.front,`${i.suites} 位确认预订的 Globalist；已锁 SUA 必须保留。`],["客房经理",e.managers.house,`今天 ${i.housekeeping} 间预计翻房；员工需推车到场，晚退会挤压时间。`],["餐饮经理",e.managers.fnb,`早餐预计 ${i.breakfast} 人、库存 ${e.stock}；Happy Hour 预计 ${i.club} 人、库存 ${e.clubStock}。`],["工程经理",e.managers.engineering,`${et(n).filter(l=>l.status==="maintenance").length} 间封闭房；施工不接待，维修完成才能出售。`]];return`<h2>08:00 · 早班晨会</h2><p>Day ${e.day} · ${s?"周末":"工作日"} · ${e.positioning==="business"?"商务定位":e.positioning==="resort"?"度假定位":"城市混合"} · ${e.weather==="rain"?"有雨":"晴朗"}</p>${ud(n)}<p>${Bc[t.event]}</p><details class="manager-card"><summary>需求预测与客源明细</summary><div class="brief-grid">${Yt("确认预订 / 待到店",r+" / "+a)}${Yt("预计 Walk-in",i.walkins+" 位")}${Yt("预计晚间入住率",i.occupancy+"%")}${Yt("商务 / 度假 / 团队",i.business+" / "+i.resort+" / "+i.group)}${Yt("早餐人数 / 库存",i.breakfast+" / "+e.stock)}${Yt("HK 翻房 / 标准套需求",i.housekeeping+" / "+i.suites)}</div></details><details class="manager-card"><summary>经理交班与建议</summary>${o.map(([l,c,u],f)=>`<div class="person-card manager-brief">${Pi(["revenue","front","house","fnb","engineering"][f])}<div class="person-body"><b>${l} · ${c?"在岗":"待聘任"}</b><p>${u}</p></div></div>`).join("")}</details><details class="manager-card"><summary>今日决策 · 挂牌 ¥${e.price} / ${t.suitePolicy==="hold"?"留套":"开放销售"} <small>调整 ›</small></summary><div class="decision-line"><span>Walk-in 挂牌 ¥${e.price}<small>¥720 争取客流 · ¥850 提高单晚收入，可能少接客</small></span>${tn("¥720","price","","720")}${tn("¥850","price","","850")}</div><div class="decision-line"><span>套房：${t.suitePolicy==="hold"?"保留一间给会员":"开放销售"}</span>${tn("留一间","suite-policy","","hold")}${tn("开放卖","suite-policy","","sell")}<small>留套照顾会员；开放销售保留付费机会。SUA 锁房始终保留。</small></div><div class="decision-line"><span>早餐 ${e.stock} 份 / 酒廊 ${e.clubStock} 份</span>${tn("早餐 +50 · ¥300","stock","breakfast")}${tn("酒廊 +50 · ¥300","stock","club")}</div><div class="decision-line"><span>${e.development&&e.development.campaignUntil>=e.day?"广告投放中":"广告未投放"}</span>${tn("三日推广 ¥2,200","campaign")}</div></details><details class="manager-card"><summary>报价、拒客与平台规则</summary><small>确认预订的报价已锁定；调价影响未预订客流。预估有波动，无法接待确认预订需支付 ¥600/单安置费；平台订单每晚收取 15% 佣金。</small></details><div class="action-row"><button class="game-action" data-open="bookings">查看预订</button><button class="game-action" data-open="history">客史记录</button></div>${t.briefOpen?'<div class="meeting-footer">'+tn("确认决策 · 开始营业","brief-start")+"</div>":""}`}function hd(n){const e=n.game.operations;return`<h2>今日预订</h2><div class="brief-grid">${["APP","团单","平台"].map(t=>Yt(t,e.bookings.filter(i=>i.source===t).length+" 单")).join("")}</div><p>Walk-in 为额外临时到店，今天已到 ${e.walkinArrivals} 位。</p>${e.bookings.map(t=>{const i=e.profiles[t.profileId];return`<details class="manager-card"><summary class="person-summary">${Pi(i)}<span>${fn(i.name)} · ${t.source} · ${za(t.eta)}<small>${{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"安置离店"}[t.status]}</small></span></summary><p>${fn(i.tier)} · ${t.nights} 晚 · 锁定价 ¥${t.rate}${t.sua?" · SUA 锁套":""}</p><p>${t.challenge?"特别关注："+{quiet:"需要安静房间",sua:"已确认标准套房",family:"早餐与加床需求",audit:"服务标准检查"}[t.challenge]:"常规接待"}</p><p>客史 ${i.visits} 次 · 信任 ${i.trust} · ${fn(i.history.at(-1)?.text??"首次来店")}</p></details>`}).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function pd(n){return`<h2>客史与关系</h2>${Object.values(n.game.operations.profiles).filter(e=>e.visits>0||n.guests.some(t=>t.profileId===e.id)).sort((e,t)=>t.visits-e.visits).map(e=>`<details class="manager-card"><summary class="person-summary">${Pi(e)}<span>${fn(e.name)} · ${fn(e.tier)}<small>${e.visits} 次入住</small></span></summary><p>信任 ${e.trust} · 累计消费 ¥${Math.round(e.spend)}${e.referredBy?" · 由熟客介绍":""}</p>${e.history.map(t=>`<p>Day ${t.day} · ${fn(t.text)}</p>`).join("")||"<p>首次入住，等待这次故事。</p>"}</details>`).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function md(n){return n.guests.filter(e=>e.challenge&&!e.challenge.resolved&&!e.departing).map(e=>{const t=e.challenge.kind,i={quiet:["需要安静，不能被施工吵到","施工邻层需换到安静的空房。","落实安静安排"],sua:["SUA 确认的标准套，今天能兑现吗？","入住标准套房后核对权益。","核对已给标准套"],family:["早餐和加床，可以一起安排吗？",`需早餐库存 6 份 · 当前 ${n.game.stock} 份`,"安排家庭服务"],audit:["想确认一下房间和服务流程。","需客房、工程主管在岗，且没有待修客房。","完成巡检"]}[t];return Ho(e,`<blockquote>${i[0]}</blockquote>${e.roomId?`<p class="request-condition">${i[1]}</p><div class="choice-grid">${tn(i[2]+" · ¥180","guest-choice",e.id,t==="sua"?"inventory":t==="audit"?"inspect":t)}${tn("欢迎礼 · ¥100","guest-choice",e.id,"gift")}${tn("不作安排","guest-choice",e.id,"decline")}</div><small class="choice-note">欢迎礼不替代诉求；不作安排会影响体验。</small>`:`<p class="request-condition">尚未入住 · 先分房，再落实诉求</p><button class="game-action choice-primary" data-open="front" data-guest="${fn(e.id)}">为 ${fn(e.name)} 办理入住 →</button>`}`)}).join("")}function gd(n){const e=n.game.evening;if(!e)return"<h2>20:00 · 晚间复盘</h2><p>今晚 20:00 与总部一起回看经营与客诉。</p>";const t=i=>"¥"+Math.round(i).toLocaleString("en-US");return`<h2>20:00 · 晚间复盘</h2><p>Day ${e.day} · 截至 ${za(e.minute)} 的经营快照</p><p class="result-hero">预计日结净额 ${t(e.projectedNet)}</p><details class="manager-card"><summary>经营快照与收入口径</summary><div class="brief-grid">${Yt("入住率 / 晨会预估",e.occupancy+"% / "+(e.expected??"—")+"%")}${Yt("今日办理入住",e.arrivals+" 位")}${Yt("已入账收入",t(e.revenue))}${Yt("已支出成本",t(e.expense))}${Yt("预计待结房费",t(e.roomRevenue))}${Yt("预计日结净额",t(e.projectedNet))}</div><p class="meeting-note">预估包含当前在住房费、平台佣金及日常成本；午夜才结算，后续入住和支出会改变结果。</p></details><details class="manager-card" ><summary>客诉与服务记录 <small>${e.pending} 项待办 · ${e.complaints} 次客诉计数</small></summary><p>以下为今日客诉日志原文，包含请求、处理与结果；多条记录可能属于同一事件。</p>${e.logs.map(i=>`<article class="review-entry"><time>${za(i.minute)}</time><div>${fn(i.text)}${i.target?`<button class="game-action" data-entity="${fn(i.target)}">查看现场 →</button>`:""}</div></article>`).join("")||"<p>今天尚无客诉日志。</p>"}<button class="game-action" data-open="events">处理当前待办 →</button></details><h3>总部 · 今晚优先改进</h3>${e.notes.map(i=>`<div class="person-card manager-brief">${Pi("revenue")}<div class="person-body"><strong>${i.title}</strong><p>${i.text}</p><button class="game-action" data-open="${i.target}">去落实 →</button></div></div>`).join("")}${e.open?'<div class="meeting-footer">'+tn("交给夜班 · 继续经营","evening-close")+"</div>":""}`}const bn=n=>"¥"+Math.round(n).toLocaleString("en-US"),ji=(n,e,t,i)=>`<div class="upgrade-compare"><span>${n}</span><b>${e}${i} → ${t}${i}</b><div><i style="width:${e/Math.max(1,e,t)*100}%"></i><i style="width:${t/Math.max(1,e,t)*100}%"></i></div></div>`;function _d(n,e){const t=e.level??1;if(t>=5)return"<p>装修已满级</p>";const i=n.game,r={...e,level:t+1},s=zc(t),a=ai(i.price,e),o=ai(i.price,r),l=o-a,c=i.reports.at(-1)?.occupancy??100*Object.values(n.entities).filter(d=>d.kind==="room"&&d.status==="occupied").length/Math.max(1,Object.values(n.entities).filter(d=>d.kind==="room").length),u=ai(i.price,r,!0)-ai(i.price,e,!0),f=l*c/100;return`<details class="upgrade-preview"><summary>装修 Lv.${t} → ${t+1} · ${bn(s)}</summary>${ji("新客每晚房价",a,o," 元")}${Zt(e)?`<p>会员免费升套价：${bn(ai(i.price,e,!0))} → ${bn(ai(i.price,r,!0))}</p>`:""}<p>每售出一晚多收 ${bn(u)}${u!==l?"–"+bn(l):""}；约 ${Math.ceil(s/l)}${u!==l?"–"+Math.ceil(s/u):""} 个售出房晚收回装修费。</p><p>按${i.reports.length?"最近一天":"当前"}入住率 ${Math.round(c)}%、${Zt(e)?"普通付费客":"当前挂牌价"}估算：每天多收 ${bn(f)}${f>0?"，约 "+Math.ceil(s/f)+" 天回本":"，暂无法估算回本天数"}。</p><small>已确认预订和已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`}function vd(n,e,t,i){const r=n.game,s=r.managers[e],a=Math.min(3,s+1),o=s?4500*s:3800;let l="",c="";if(e==="front"){const u=n.entities["facility-lobby"],f=(u.kind==="facility"?u.level??1:1)*10;l=ji("新到店住客耐心",100+s*50+f,100+a*50+f," 分钟"),c=s?"自动分房速度不变；延长新客等候耐心，降低等待流失。":"启用自动分房与常规诉求处理；无空房时仍需等待。"}return e==="house"&&(l=ji("每间清洁用时",wr(s),wr(a)," 分钟"),c=s?"增加一位客房员工，每间现场清洁少用 "+(wr(s)-wr(a))+" 分钟；另需实际走路时间。":"自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。"),e==="engineering"&&(l=ji("常规维修用时",Ia(s),Ia(a)," 分钟"),c=s?"增加一位工程员工，维修费用仍为 ¥100/间；另需到场时间。":"自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。"),e==="fnb"&&(l=ji("采购单价（每 40 份）",s?Ts(s):240,Ts(a)," 元"),c=s?"每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。":"库存低于 20 时安排配送，员工到餐台完成补货才入库；与手动采购每份同价。"),e==="revenue"&&(l=ji("同一需求下自动报价",s?La(i,r.level,s):r.price,La(i,r.level,a)," 元"),c="次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。"),`<details class="manager-card"><summary class="person-summary">${Pi(e)}<span>${t}主管 · ${s?"Lv."+s:"未聘任"}</span><small>${s>=3?"已满级":"查看效果 ›"}</small></summary>${s>=3?"<p>已完成全部培训。</p>":`${l}<p>${c}</p><p>投入 ${bn(o)} · 工资 ${bn(s*180)} → ${bn(a*180)}/天</p><button class="game-action" data-action="${s?"train":"hire"}" data-id="${e}">${s?"培训至 Lv."+a:"聘任主管"} · ${bn(o)}</button>`}</details>`}const At=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Mt=n=>"¥"+Math.round(n).toLocaleString("en-US"),Ne=(n,e,t="",i="")=>`<button class="game-action" data-action="${At(e)}" data-id="${At(t)}" data-value="${At(i)}">${At(n)}</button>`;function xd(n,e){const t=T=>n.querySelector(T),i=n.querySelector("dialog"),r=t("#sheet-content"),s=t("#sheet-eye");let a="",o="",l="",c="全部",u=()=>{},f=null;t(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',t(".world-caption").textContent="轻点空间 · 处理今天的经营",t(".weather").title="切换日夜预览",t(".property-name small").id="game-time",t(".today-hint").setAttribute("data-open","tasks"),t(".event-strip").removeAttribute("data-focus"),t(".event-strip").setAttribute("data-open","events"),t(".speed-control").insertAdjacentHTML("beforeend",Ne("Ⅱ","pause")),t(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(T=>T.setAttribute("aria-label",T.getAttribute("data-speed")+"倍经营速度"));const d=document.createElement("p");d.className="action-feedback",d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.hidden=!0,r.before(d);const p=()=>{d.textContent=e.getState().game.notice,d.hidden=!d.textContent},m=()=>{a="",o="",e.getState().game.evening?.open&&e.dispatch({type:"evening-close"}),e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),i.close(),e.select(null),f?.focus()},x=()=>{if(e.getState().game.reportOpen){e.dispatch({type:"continue"}),a="brief",b();return}e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),m()};let g=!1;const h=(T,I)=>{const S=i.getBoundingClientRect();return T<S.left||T>S.right||I<S.top||I>S.bottom};i.addEventListener("pointerdown",T=>{g=T.target===i&&h(T.clientX,T.clientY)}),i.addEventListener("click",T=>{g&&T.target===i&&h(T.clientX,T.clientY)&&x(),g=!1});const A=(T,I)=>{s.textContent=T,r.innerHTML=(a==="entity"?dd(e.getState(),o):od(e.getState(),a))+I,i.open||(f=document.activeElement,i.showModal())},D=T=>{const I=e.getState(),S=I.entities[T];if(S){if(S.construction||I.floors.find(P=>P.id===S.floorId)?.construction){const P=S.construction??I.floors.find(X=>X.id===S.floorId).construction;A("施工现场",`<h2>${S.kind==="room"?S.number:S.name} · 封闭施工</h2><progress max="${P.total}" value="${P.total-P.remaining}"></progress><p>剩余 ${P.remaining} 游戏分钟，竣工后开放。</p>`);return}if(S.kind==="room"&&S.status==="unbuilt"){A("配置客房 · "+S.number,`<h2>选择房型</h2><p>普通配置已含在楼层造价中；其他房型支付差价。</p><div class="room-options">${Object.entries(ir).map(([P,X])=>`<section><strong>${X.name}</strong><small>新客 ${Mt(I.game.price*X.factor)}/晚起 · ${X.cost?Mt(X.cost):"已含"}</small><div>${Ne("大床","configure-room",T,P+":king")}${Ne("双床","configure-room",T,P+":twin")}</div></section>`).join("")}</div><small>标准套房可供会员免费升套；尊享套房按付费房价出售。</small>`);return}if(S.kind==="room"){const P=I.guests.find(X=>X.id===S.guestId);A("HYATT PLACE · "+I.floors.find(X=>X.id===S.floorId)?.label,`<h2>${At(S.number)}<span>${Ca(S)} · Lv.${S.level??1}</span></h2><div class="status-chip">${Ba[S.status]}${S.timer?" · 还需 "+S.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${P?At(P.name)+" · "+At(P.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${S.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${Mt(P?P.rate??I.game.price:ai(I.game.price,S))}</dd></div></dl>${P?"<p>"+At(P.name)+(P.goh?" · GOH":"")+(P.sua?" · SUA":"")+"</p><blockquote>"+At(P.thought)+"</blockquote>"+(P.serviceDone?"<small>本次住宿已安排专属服务</small>":Ne({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[P.persona??"chill"]+" ¥120","guest-service",P.id))+(P.late==="pending"?Ne("确认 "+di(P),"late",P.id,"honor")+Ne("协商 "+or(P)+":00","late",P.id,"deny"):P.late?"<p>退房时间："+qs(Uc(P))+"</p>":""):""}${S.status==="available"?_d(I,S):""}<div class="action-row">${S.status==="dirty"?Ne("安排清洁 ¥90","clean",T):""}${S.status==="maintenance"&&!S.timer?Ne("安排维修 ¥180","repair",T):""}${S.status==="available"?Ne("分配给住客","front")+((S.level??1)<5?Ne("装修 "+Mt(2500*(S.level??1)),"upgrade",T):"")+(Zt(S)?Ne("预留给会员","reserve",T):""):""}${S.status==="reserved"&&!S.suaBookingId?Ne("释放预留","release",T):""}</div>`)}else A("HYATT PLACE · 公共空间",`<h2>${At(S.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${S.usage} / ${S.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(S.maintenance)}%</dd></div>${["breakfast","club"].includes(S.role)?`<div><dt>库存</dt><dd>${S.role==="club"?I.game.clubStock:I.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${S.role==="lobby"?Ne("办理入住","front"):""}${S.role==="breakfast"?Ne("补充早餐 ¥300","stock","breakfast"):S.role==="club"?Ne("补充酒廊 ¥300","stock","club"):""}${Ne("维护设施 ¥200","repair",S.id)}${(S.level??1)<5?Ne("公区升级 "+Mt(3500*(S.level??1)),"invest",S.id):"已达 Lv.5"}</div>`)}},b=()=>{const T=e.getState(),I=T.game;if(a==="teaching"){A("DEPARTMENT HEAD · 带教",ka(T)||"<h2>三日带教已结束</h2><p>各部门仍会根据现场情况给你建议。</p>");return}if(a==="entity"){D(o);return}if(a==="evening"){A("EVENING REVIEW",gd(T));return}if(a==="brief"){A("MORNING BRIEF",fd(T));return}if(a==="bookings"){A("RESERVATIONS",hd(T));return}if(a==="history"){A("GUEST HISTORY",pd(T));return}if(a==="front")A("FRONT OFFICE",cd(T));else if(a==="hotel")A("YOUR HOTEL",`<h2>酒店 · ${et(T).length} 间客房</h2><details class="manager-card"><summary>扩建与投资 · 增加容量</summary><p>扩建花钱并封闭施工 240 分钟；新楼层竣工后需手动设置房型。</p>${Ne("加高一层 · 3 个空位 "+Mt(1e4+5e3*(T.floors.filter(S=>S.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div></details><details class="manager-card"><summary>楼层导航</summary><div class="floor-list">${[...T.floors].reverse().map(S=>`<button data-floor="${S.id}"><b>${S.label}</b><span>${S.name}</span><small>定位楼层 ›</small></button>`).join("")}</div></details><div class="floor-tabs" aria-label="客房楼层">${T.floors.filter(S=>S.role==="guest").map(S=>`<button class="game-action" data-room-floor="${S.id}" aria-pressed="${(l||T.floors.find(P=>P.role==="guest")?.id)===S.id}">${S.label}</button>`).join("")}</div><div class="room-grid">${Cc(T).filter(S=>S.floorId===(l||T.floors.find(P=>P.role==="guest")?.id)).map(S=>`<button data-entity="${S.id}">${S.status==="unbuilt"?"＋":S.number}<small>${S.status==="unbuilt"?S.number+" · 设置房型":Ca(S)+" · "+Ba[S.status]}</small></button>`).join("")}</div>`);else if(a==="operations")A("DEPARTMENT HEADS",`<h2>找主管商量</h2><div class="action-row"><button class="game-action" data-open="brief">安排今天</button><button class="game-action" data-open="evening">回看经营</button><button class="game-action" data-open="development">考虑投资</button></div><details class="manager-card"><summary>餐台备货 · 早餐 ${I.stock} / 酒廊 ${I.clubStock}</summary><p>库存不足先补货，每次增加 50 份，支出 ¥300。</p><div class="action-row">${Ne("补早餐 · ¥300","stock","breakfast")}${Ne("补酒廊 · ¥300","stock","club")}</div></details><details class="manager-card"><summary>团队授权 · ${Object.values(I.managers).filter(S=>S>0).length} / 5 位主管在岗</summary><p>减少亲自处理的次数，同时承担每日工资。</p>${Object.entries(Da).map(([S,P])=>vd(T,S,P,ws(T)>1.1?750:590)).join("")}</details><details class="manager-card"><summary>房价与客源 · 当前 ¥${I.price}</summary><p>降价争取 Walk-in，提价增加单晚收益但可能减少客流。</p><div class="action-row">${Ne("¥720 · 争取入住","price","","720")}${Ne("¥850 · 提高单价","price","","850")}</div><details class="manager-card"><summary>精确定价与酒店定位</summary><label>挂牌价 <input id="price-input" type="number" min="350" max="1800" value="${I.price}"></label>${Ne("应用价格","price")}<div class="action-row">${Ne("商务","position","","business")}${Ne("度假","position","","resort")}${Ne("城市混合","position","","urban")}</div></details></details><details class="manager-card"><summary>预订、客史与经营档案</summary><div class="action-row"><button class="game-action" data-open="bookings">今日预订</button><button class="game-action" data-open="history">客史</button>${Ne("最近日结","report")}<button class="game-action" data-open="log">运营日志</button>${Ne("导出存档","export")}${Ne("新开存档","reset")}</div><small>自动保存在当前浏览器。非官方粉丝游戏，与 Hyatt 无隶属关系。</small></details>`);else if(a==="development"){const S=I.development;A("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级增加基础房价的 10%，装修前可查看回本预估。</p><details class="manager-card"><summary>三日营销 · 获客还是浪费？</summary><p>客流 +35%；推广持续到第 ${S?.campaignUntil??0} 天。满房时请谨慎投放。</p>${S&&S.campaignUntil>=I.day?"<small>推广进行中</small>":Ne("投放推广 ¥2,200","campaign")}</details><details class="manager-card"><summary>今日主题活动</summary><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${S?.activity?`<blockquote>正在筹备：${Es[S.activity.id].name} · 还需 ${Math.max(0,S.activity.ends-I.day*1440-I.minute)} 分钟</blockquote>`:""}${Object.entries(Es).map(([P,X])=>`<section class="guest-card"><strong>${X.name}</strong><p>${X.description} 每人消费 ¥${X.fee} 起。</p>${S?.activityDay===I.day?"<small>今日档期已使用</small>":Ne("安排 "+Mt(X.cost),"activity",P)}</section>`).join("")}</details><details class="manager-card"><summary>公共空间投资</summary>${T.entities["facility-spa"]?"":Ne("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(T.entities).filter(P=>P.kind==="facility").map(P=>`<section class="guest-card"><strong>${At(P.name)} · Lv.${P.level??1}</strong><p>容量 ${P.capacity} 人 · 维护 ${Math.round(P.maintenance)}%</p>${(P.level??1)<5?Ne("升级 "+Mt(3500*(P.level??1)),"invest",P.id):"<small>满级</small>"}</section>`).join("")}</details><button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(a==="score"){const S=tr(T);A("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${S.total}%"><strong>${S.total}<small>/ 100</small></strong></div><div><strong>${S.total>=90?"卓越酒店":S.total>=75?"稳健经营":S.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${S.parts.map(P=>`<div class="score-part"><span>${P.name}</span><b>${P.value}</b><progress max="100" value="${P.value}" aria-label="${P.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><details class="manager-card"><summary>最近 7 天评分</summary><div class="revenue-trend">${(I.development?.scores??[]).slice(-7).map(P=>`<div><small>${P.value} 分</small><i style="height:${P.value*.65}px"></i><small>D${P.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div></details><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(a==="tasks")A("MISSIONS",`<h2>今天的目标</h2>${ka(T)}<p>每天轮换经营目标，完成后及时领奖。长期里程碑不会随交班重置。</p>${I.tasks.map(S=>`<section class="guest-card"><strong>${At(S.title)}</strong><p>${S.progress} / ${S.goal} · 奖励 ${Mt(S.reward)}</p><progress max="${S.goal}" value="${S.progress}" aria-label="${At(S.title)}"></progress>${S.claimed?"<small>已领取</small>":S.progress>=S.goal?Ne("领取奖励","claim",S.id):`<button class="game-action" data-open="${S.target}">去完成 ›</button>`}</section>`).join("")}<details class="manager-card"><summary>长期里程碑与奖励</summary><p>持续接待住客、举办活动和建设酒店，解锁长期奖励。</p>${Oc(T).map(S=>`<section class="guest-card"><strong>${S.title}</strong><p>${Math.min(S.progress,S.goal)} / ${S.goal} · ${Mt(S.reward)}</p><progress max="${S.goal}" value="${Math.min(S.progress,S.goal)}" aria-label="${S.title}"></progress>${S.claimed?"<small>已领取</small>":S.progress>=S.goal?Ne("领取里程碑奖励","claim-career",S.id):"<small>持续经营以解锁</small>"}</section>`).join("")}</details>`);else if(a==="events")A("DUTY MANAGER",`<h2>待办 · ${T.guests.filter(S=>S.challenge&&!S.challenge.resolved&&!S.departing).length+I.events.length+T.guests.filter(S=>S.late==="pending").length}</h2>${md(T)}${T.guests.filter(S=>S.late==="pending"&&!S.departing).map(S=>Ho(S,`<strong class="request-title">${di(S)} 请求</strong><p>希望${S.checkoutDay===I.day?"今天":"明天"} ${Lr(S)}:00 退房。比 11:00 常规退房晚 ${Lr(S)-11} 小时，之后才可翻房。</p><p class="trade-off">同意：客人更满意，房间晚些可卖。协商：提前翻房，但会影响体验。</p><details class="manager-card"><summary>查看指标影响</summary><p>同意：体验 +4、口碑 +1、业主 -1；协商：体验 -3、口碑 -1、业主 +1。</p></details>${Ne("同意 "+di(S),"late",S.id,"honor")}${Ne("协商 "+or(S)+":00","late",S.id,"deny")}`)).join("")}${I.events.map(S=>`<section class="guest-card"><strong>${At(S.title)}</strong><p>剩余 ${Math.max(0,S.expires-I.day*1440-I.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${S.target}">定位现场</button>${Ne("亲自协调 ¥350","resolve",String(S.id),"gm")}${Ne("交给主管 ¥150","resolve",String(S.id),"sop")}</div></section>`).join("")||(T.guests.some(S=>!S.departing&&(S.late==="pending"||S.challenge&&!S.challenge.resolved))?"":'<p class="empty">目前没有异常，关上面板继续经营。</p>')}${Gn(T).length?`<button class="primary" data-open="front">接待 ${Gn(T).length} 位排队住客</button>`:""}`);else if(a==="log")A("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(S=>`<button class="${S===c?"active":""}" data-filter="${S}">${S}</button>`).join("")}</div><div class="log-list">${[...I.logs].reverse().filter(S=>c==="全部"||S.category===c).map(S=>`<article><small>Day ${S.day} ${qs(S.minute)} · ${S.category}</small><p>${At(S.text)}</p>${S.target?`<button data-entity="${At(S.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(a==="report"){const S=I.reports.at(-1);A("DAILY REVIEW",S?`<h2>Day ${S.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${S.score??tr(T).total} / 100 ›</button><p class="result-hero">今日净额 ${Mt(S.revenue-S.expense)}</p><details class="manager-card"><summary>收支明细、ADR 与预测对账</summary><dl><div><dt>收入 / 成本</dt><dd>${Mt(S.revenue)} / ${Mt(S.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${Mt(S.adr)} / ${Mt(S.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${S.occupancy}% / ${S.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${S.upgrades} / ${S.complaints}</dd></div></dl><h3>晨会预测对账</h3><p>预计晚间入住率 ${S.forecastOccupancy??"—"}% → 实际 ${S.actualEveningOccupancy??"—"}% · 未兑现预订 ${S.bookingsLost??0} 单</p><h3>最近 7 天收入</h3><div class="revenue-trend">${I.reports.slice(-7).map(P=>`<div><small>${Mt(P.revenue)}</small><i style="height:${Math.max(3,Math.round(P.revenue/Math.max(1,...I.reports.slice(-7).map(X=>X.revenue))*65))}px"></i><small>D${P.day}</small></div>`).join("")}</div></details><blockquote>${At(S.recommendation)}</blockquote>${I.reportOpen?Ne("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("change",T=>{const I=T.target;I.id==="hotel-floor-select"&&(l=I.value,b())}),n.addEventListener("click",T=>{const I=T.target.closest("button");if(!I)return;if(I.matches(".close-sheet")){x();return}if(I.dataset.open){if(a=I.dataset.open,d.hidden=!0,b(),I.dataset.guest){const Z=document.getElementById("assign-"+I.dataset.guest);Z?.closest(".person-card")?.scrollIntoView({block:"nearest"}),Z?.focus({preventScroll:!0})}return}if(I.dataset.reveal){const Z=[...r.querySelectorAll("details")].find(ue=>ue.querySelector("summary")?.textContent?.startsWith("今日决策"));Z&&(Z.open=!0,Z.scrollIntoView({block:"start"}));return}if(I.dataset.speed){e.setSpeed(Number(I.dataset.speed));return}if(I.dataset.entity){o=I.dataset.entity;const Z=e.getState().entities[o];Z&&u(Z.floorId),a="entity",e.select(o),b();return}if(I.dataset.floor){const Z=I.dataset.floor;m(),e.focusFloor(Z),u(Z);return}if(I.dataset.roomFloor){l=I.dataset.roomFloor,b();return}if(I.dataset.filter){c=I.dataset.filter,b();return}if(I.matches(".weather")){const Z=["dusk","night","day"];e.setAtmosphere(Z[(Z.indexOf(e.getState().atmosphere)+1)%3]);return}const S=I.dataset.action;if(!S)return;if(["front","report"].includes(S)){a=S,b();return}if(S==="reset"){document.dispatchEvent(new Event("new-game"));return}if(S==="export"){const Z=document.createElement("a");Z.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),Z.download="jinwan-v8-save.json",Z.click(),setTimeout(()=>URL.revokeObjectURL(Z.href),500);return}const P={type:S,id:I.dataset.id,value:I.dataset.value};S==="checkin"&&(P.roomId=I.dataset.room),S==="price"&&(P.value=I.dataset.value||Number(n.querySelector("#price-input")?.value)),S==="position"&&(P.value=I.dataset.value||n.querySelector("#position-input")?.value);const X=[...r.querySelectorAll("details[open]")].map(Z=>Z.querySelector("summary")?.textContent),B=a,ee=e.getState().game.upgradeEffect?.id;if(e.dispatch(P),e.getState().game.upgradeEffect?.id!==ee){const Z=e.getState().game.upgradeEffect.entityId;m(),u(e.getState().entities[Z].floorId);return}S==="brief-start"||S==="evening-close"?m():S==="continue"?(a="brief",b()):a&&(S==="checkin"&&e.getState().guests.find(Z=>Z.id===P.id)?.roomId&&e.getState().guests.find(Z=>Z.id===P.id)?.challenge&&(a="events",i.scrollTop=0),b(),a===B&&r.querySelectorAll("details").forEach(Z=>{X.includes(Z.querySelector("summary")?.textContent)&&(Z.open=!0)}),p())}),i.addEventListener("cancel",T=>{T.preventDefault(),x()});let C=null,R="",L="",v=0,w=0,O=0;const U=()=>{const T=e.getState(),I=T.game;t(".score-button").innerHTML=`<i style="--score:${tr(T).total}%"></i> ${tr(T).total} 分 ›`,t("#cash").textContent=Mt(T.metrics.cash),t("#reputation").textContent=String(T.metrics.reputation),t("#owner").textContent=String(T.metrics.owner),t("#suite-count").textContent=Pc(T)+" 间",t("#game-time").textContent=`${Vc(I.day)} · Day ${I.day} ${qs(I.minute)}${I.paused?" · 暂停":""}`,t(".today-hint span:nth-child(2)").textContent=I.tasks.find(B=>!B.claimed)?.title??"今日任务全部完成",t("#task-count").textContent=I.tasks.filter(B=>B.claimed).length+"/"+I.tasks.length,t("#occupancy").textContent=`${Ic(T)}/${et(T).length} 在住 · 收入 ${Mt(I.revenue)}`;const S=$c(T),P=S.find(B=>!B.done);P?(t(".today-hint span:nth-child(2)").textContent="Day "+I.day+" · "+P.title,t("#task-count").textContent=S.filter(B=>B.done).length+"/3",t(".today-hint").setAttribute("data-open","teaching")):t(".today-hint").setAttribute("data-open","tasks"),t(".event-strip span").textContent=(T.guests.some(B=>B.challenge&&!B.challenge.resolved&&!B.departing)?"特别住客需要你的判断":void 0)??(T.guests.some(B=>B.late==="pending"&&!B.departing)?"会员晚退请求待你确认":void 0)??I.events[0]?.title??(Gn(T).length?`${Gn(T).length} 位住客等待办理入住`:"酒店运营平稳"),t(".event-strip b").textContent=I.events.length||T.guests.some(B=>(B.late==="pending"||B.challenge&&!B.challenge.resolved)&&!B.departing)?"处理 ›":"前台 ›",t(".event-strip").setAttribute("data-open",I.events.length||T.guests.some(B=>(B.late==="pending"||B.challenge&&!B.challenge.resolved)&&!B.departing)?"events":"front"),t(".review-strip span").textContent=I.notice,t(".weather span").textContent=I.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(B=>{B.classList.toggle("active",Number(B.dataset.speed)===T.speed),B.setAttribute("aria-pressed",String(Number(B.dataset.speed)===T.speed))});const X=T.floors.map(B=>B.id).join(",");R!==X&&(R=X,t(".floor-rail").innerHTML=[...T.floors].reverse().map(B=>`<button data-floor="${B.id}" aria-label="前往${B.label} ${B.name}">${B.label}</button>`).join("")),T.selectedId&&T.selectedId!==C&&(o=T.selectedId,a="entity",b()),C=T.selectedId,I.operations?.briefOpen&&w!==I.day&&(w=I.day,a="brief",b()),I.evening?.open&&O!==I.evening.day&&(O=I.evening.day,a="evening",b(),i.scrollTop=0),I.reportOpen&&v!==I.day&&(v=I.day,a="report",b()),L!==I.notice&&(L=I.notice,i.open&&p())};return e.subscribe(U),U(),{stage:t(".world-stage"),setFocusHandler:T=>{u=T},showError:T=>A("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${At(T)}</p>`)}}function Md(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return xd(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(m,x)=>{r.textContent=m,i.innerHTML=x,t.open||(a=document.activeElement,t.showModal())},u=m=>{const x=e.getState(),g=x.entities[m];if(!g)return;const h=gl(x,m);if(g.kind==="room"){const A=x.guests.find(D=>D.id===g.guestId);c("HYATT PLACE · "+h.label,`<h2>${g.number}<span>${g.type==="suite"?"开放式套房":g.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${g.status}">${Ba[g.status]}</div><dl><div><dt>住客</dt><dd>${A?A.name+" · "+A.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${g.nightsLeft?g.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${h.label} · ${h.name}</dd></div></dl>${A?"<blockquote>“"+A.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${h.id}">回到 ${g.number} 的楼层</button>`)}else{const A={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+h.label,`<h2>${g.name}</h2><p>${A[g.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${g.usage} / ${g.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${g.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${g.quality} / ${g.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${h.id}">回到${g.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const m=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...m.floors].reverse().map(x=>`<button data-return="${x.id}"><b>${x.label}</b><span>${x.name}</span><small>${x.entityIds.length>1?x.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const m=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([x,g,h])=>`<button data-focus="${x}"><b>${m.visited.includes(x)?"✓":"○"}</b><span>${g}<small>${h}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const m=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(m.visited.length?[...m.visited].reverse().map(x=>{const g=m.entities[x];return`<button data-focus="${x}"><span>${g.kind==="room"?g.number+" 房间":g.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",m=>{const x=m.target.closest("button");if(x){if(x.matches(".close-sheet")&&l(),x.dataset.open&&(e.select(null),s=x.dataset.open,f[s]?.()),x.dataset.speed&&e.setSpeed(Number(x.dataset.speed)),x.dataset.return){const g=x.dataset.return;l(),e.focusFloor(g),o(g)}if(x.dataset.focus){const g=x.dataset.focus,h=gl(e.getState(),g);l(),h&&(e.focusFloor(h.id),o(h.id)),e.select(g)}if(x.dataset.floor&&(e.focusFloor(x.dataset.floor),o(x.dataset.floor)),x.dataset.atmosphere&&(e.setAtmosphere(x.dataset.atmosphere),l()),x.matches(".weather")){const g=["dusk","night","day"];e.setAtmosphere(g[(g.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",m=>{m.preventDefault(),l()}),t.addEventListener("click",m=>{if(m.target===t){const x=t.getBoundingClientRect();(m.clientX<x.left||m.clientX>x.right||m.clientY<x.top||m.clientY>x.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(m=>`<button data-floor="${m.id}" aria-label="前往${m.label} ${m.name}">${m.label}</button>`).join("");let d=null;const p=m=>{n.querySelector("#cash").textContent="¥"+m.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(m.metrics.reputation),n.querySelector("#owner").textContent=String(m.metrics.owner),n.querySelector("#suite-count").textContent=Pc(m)+" 间",n.querySelector("#occupancy").textContent=`${et(m).length} 间客房 · ${Ic(m)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(x=>m.visited.includes(x)).length+"/3",n.querySelectorAll("[data-speed]").forEach(x=>{x.classList.toggle("active",Number(x.dataset.speed)===m.speed),x.setAttribute("aria-pressed",String(Number(x.dataset.speed)===m.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[m.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[m.atmosphere],n.querySelectorAll("[data-floor]").forEach(x=>x.classList.toggle("active",x.dataset.floor===m.focusedFloorId)),m.selectedId&&m.selectedId!==d&&(s="entity",u(m.selectedId)),d=m.selectedId};return e.subscribe(p),p(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:m=>{o=m},showError:m=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+m+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vo="185",Sd=0,bl=1,bd=2,vs=1,Xc=2,Rr=3,fi=0,Wt=1,kn=2,Wn=0,rr=1,yl=2,El=3,Tl=4,yd=5,Mi=100,Ed=101,Td=102,Ad=103,wd=104,Rd=200,Cd=201,Pd=202,Id=203,Ga=204,Ha=205,Ld=206,Dd=207,Ud=208,Nd=209,Fd=210,Od=211,Bd=212,kd=213,zd=214,Va=0,Wa=1,$a=2,lr=3,Xa=4,qa=5,Ya=6,Ka=7,qc=0,Gd=1,Hd=2,Rn=0,Yc=1,Kc=2,Zc=3,Wo=4,Jc=5,Qc=6,jc=7,eu=300,wi=301,cr=302,Ys=303,Ks=304,Os=306,Rs=1e3,Hn=1001,Za=1002,Ct=1003,Vd=1004,Yr=1005,Ut=1006,Zs=1007,yi=1008,Kt=1009,tu=1010,nu=1011,Ur=1012,$o=1013,Pn=1014,cn=1015,Xn=1016,Xo=1017,qo=1018,Nr=1020,iu=35902,ru=35899,su=1021,au=1022,un=1023,qn=1026,Ei=1027,Yo=1028,Ko=1029,Ri=1030,Zo=1031,Jo=1033,xs=33776,Ms=33777,Ss=33778,bs=33779,Ja=35840,Qa=35841,ja=35842,eo=35843,to=36196,no=37492,io=37496,ro=37488,so=37489,Cs=37490,ao=37491,oo=37808,lo=37809,co=37810,uo=37811,fo=37812,ho=37813,po=37814,mo=37815,go=37816,_o=37817,vo=37818,xo=37819,Mo=37820,So=37821,bo=36492,yo=36494,Eo=36495,To=36283,Ao=36284,Ps=36285,wo=36286,Wd=3200,Ro=0,$d=1,li="",Ht="srgb",Is="srgb-linear",Ls="linear",Qe="srgb",Fi=7680,Al=519,Xd=512,qd=513,Yd=514,Qo=515,Kd=516,Zd=517,jo=518,Jd=519,wl=35044,Rl="300 es",wn=2e3,Fr=2001;function Qd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ds(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function jd(){const n=Ds("canvas");return n.style.display="block",n}const Cl={};function Pl(...n){const e="THREE."+n.shift();console.log(e,...n)}function ou(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=ou(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ve(...n){n=ou(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function sr(...n){const e=n.join(" ");e in Cl||(Cl[e]=!0,Ce(...n))}function ef(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const tf={[Va]:Wa,[$a]:Ya,[Xa]:Ka,[lr]:qa,[Wa]:Va,[Ya]:$a,[Ka]:Xa,[qa]:lr};class Ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Js=Math.PI/180,Co=180/Math.PI;function Br(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function He(n,e,t){return Math.max(e,Math.min(t,n))}function nf(n,e){return(n%e+e)%e}function Qs(n,e,t){return(1-t)*n+t*e}function _r(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Gt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class ze{static{ze.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],p=s[a+1],m=s[a+2],x=s[a+3];if(f!==x||l!==d||c!==p||u!==m){let g=l*d+c*p+u*m+f*x;g<0&&(d=-d,p=-p,m=-m,x=-x,g=-g);let h=1-o;if(g<.9995){const A=Math.acos(g),D=Math.sin(A);h=Math.sin(h*A)/D,o=Math.sin(o*A)/D,l=l*h+d*o,c=c*h+p*o,u=u*h+m*o,f=f*h+x*o}else{l=l*h+d*o,c=c*h+p*o,u=u*h+m*o,f=f*h+x*o;const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+u*f+l*p-c*d,e[t+1]=l*m+u*d+c*f-o*p,e[t+2]=c*m+u*p+o*d-l*f,e[t+3]=u*m-o*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),p=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f-d*p*m;break;case"YXZ":this._x=d*u*f+c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f+d*p*m;break;case"ZXY":this._x=d*u*f-c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f-d*p*m;break;case"ZYX":this._x=d*u*f-c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f+d*p*m;break;case"YZX":this._x=d*u*f+c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f-d*p*m;break;case"XZY":this._x=d*u*f-c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f+d*p*m;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return js.copy(this).projectOnVector(e),this.sub(js)}reflect(e){return this.sub(js.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const js=new H,Il=new hr;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],m=i[8],x=r[0],g=r[3],h=r[6],A=r[1],D=r[4],b=r[7],C=r[2],R=r[5],L=r[8];return s[0]=a*x+o*A+l*C,s[3]=a*g+o*D+l*R,s[6]=a*h+o*b+l*L,s[1]=c*x+u*A+f*C,s[4]=c*g+u*D+f*R,s[7]=c*h+u*b+f*L,s[2]=d*x+p*A+m*C,s[5]=d*g+p*D+m*R,s[8]=d*h+p*b+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,p=c*s-a*l,m=t*f+i*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return sr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ea.makeScale(e,t)),this}rotate(e){return sr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ea.makeRotation(-e)),this}translate(e,t){return sr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Ie,Ll=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rf(){const n={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Qe&&(r.r=$n(r.r),r.g=$n(r.g),r.b=$n(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(r.r=ar(r.r),r.g=ar(r.g),r.b=ar(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===li?Ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return sr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return sr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Is]:{primaries:e,whitePoint:i,transfer:Ls,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}const Ge=rf();function $n(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Oi;class sf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Oi===void 0&&(Oi=Ds("canvas")),Oi.width=e.width,Oi.height=e.height;const r=Oi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Oi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ds("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=$n(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($n(t[i]/255)*255):t[i]=$n(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let af=0;class el{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ta(r[a].image)):s.push(ta(r[a]))}else s=ta(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ta(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?sf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let of=0;const na=new H;class Bt extends Ii{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=Hn,r=Hn,s=Ut,a=yi,o=un,l=Kt,c=Bt.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Br(),this.name="",this.source=new el(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(na).x}get height(){return this.source.getSize(na).y}get depth(){return this.source.getSize(na).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=eu;Bt.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],m=l[9],x=l[2],g=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const D=(c+1)/2,b=(p+1)/2,C=(h+1)/2,R=(u+d)/4,L=(f+x)/4,v=(m+g)/4;return D>b&&D>C?D<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(D),r=R/i,s=L/i):b>C?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=R/r,s=v/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=L/s,r=v/s),this.set(i,r,s,t),this}let A=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(g-m)/A,this.y=(f-x)/A,this.z=(d-u)/A,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lf extends Ii{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Bt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new el(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends lf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class lu extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cf extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rt{static{rt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,d,p,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,p,m,x,g)}set(e,t,i,r,s,a,o,l,c,u,f,d,p,m,x,g){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=m,h[11]=x,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Bi.setFromMatrixColumn(e,0).length(),s=1/Bi.setFromMatrixColumn(e,1).length(),a=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*f,m=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,m=c*u,x=c*f;t[0]=d+x*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,m=c*u,x=c*f;t[0]=d-x*o,t[4]=-a*f,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*f,m=o*u,x=o*f;t[0]=l*u,t[4]=m*c-p,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-d*f,t[8]=m*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+m,t[10]=d-x*f}else if(e.order==="XZY"){const d=a*l,p=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=a*u,t[9]=p*f-m,t[2]=m*f-p,t[6]=o*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uf,e,df)}lookAt(e,t,i){const r=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),ei.crossVectors(i,Xt),ei.lengthSq()===0&&(Math.abs(i.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),ei.crossVectors(i,Xt)),ei.normalize(),Kr.crossVectors(Xt,ei),r[0]=ei.x,r[4]=Kr.x,r[8]=Xt.x,r[1]=ei.y,r[5]=Kr.y,r[9]=Xt.y,r[2]=ei.z,r[6]=Kr.z,r[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],m=i[2],x=i[6],g=i[10],h=i[14],A=i[3],D=i[7],b=i[11],C=i[15],R=r[0],L=r[4],v=r[8],w=r[12],O=r[1],U=r[5],T=r[9],I=r[13],S=r[2],P=r[6],X=r[10],B=r[14],ee=r[3],Z=r[7],ue=r[11],ge=r[15];return s[0]=a*R+o*O+l*S+c*ee,s[4]=a*L+o*U+l*P+c*Z,s[8]=a*v+o*T+l*X+c*ue,s[12]=a*w+o*I+l*B+c*ge,s[1]=u*R+f*O+d*S+p*ee,s[5]=u*L+f*U+d*P+p*Z,s[9]=u*v+f*T+d*X+p*ue,s[13]=u*w+f*I+d*B+p*ge,s[2]=m*R+x*O+g*S+h*ee,s[6]=m*L+x*U+g*P+h*Z,s[10]=m*v+x*T+g*X+h*ue,s[14]=m*w+x*I+g*B+h*ge,s[3]=A*R+D*O+b*S+C*ee,s[7]=A*L+D*U+b*P+C*Z,s[11]=A*v+D*T+b*X+C*ue,s[15]=A*w+D*I+b*B+C*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],m=e[3],x=e[7],g=e[11],h=e[15],A=l*p-c*d,D=o*p-c*f,b=o*d-l*f,C=a*p-c*u,R=a*d-l*u,L=a*f-o*u;return t*(x*A-g*D+h*b)-i*(m*A-g*C+h*R)+r*(m*D-x*C+h*L)-s*(m*b-x*R+g*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],m=e[12],x=e[13],g=e[14],h=e[15],A=t*o-i*a,D=t*l-r*a,b=t*c-s*a,C=i*l-r*o,R=i*c-s*o,L=r*c-s*l,v=u*x-f*m,w=u*g-d*m,O=u*h-p*m,U=f*g-d*x,T=f*h-p*x,I=d*h-p*g,S=A*I-D*T+b*U+C*O-R*w+L*v;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/S;return e[0]=(o*I-l*T+c*U)*P,e[1]=(r*T-i*I-s*U)*P,e[2]=(x*L-g*R+h*C)*P,e[3]=(d*R-f*L-p*C)*P,e[4]=(l*O-a*I-c*w)*P,e[5]=(t*I-r*O+s*w)*P,e[6]=(g*b-m*L-h*D)*P,e[7]=(u*L-d*b+p*D)*P,e[8]=(a*T-o*O+c*v)*P,e[9]=(i*O-t*T-s*v)*P,e[10]=(m*R-x*b+h*A)*P,e[11]=(f*b-u*R-p*A)*P,e[12]=(o*w-a*U-l*v)*P,e[13]=(t*U-i*w+r*v)*P,e[14]=(x*D-m*C-g*A)*P,e[15]=(u*C-f*D+d*A)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,p=s*u,m=s*f,x=a*u,g=a*f,h=o*f,A=l*c,D=l*u,b=l*f,C=i.x,R=i.y,L=i.z;return r[0]=(1-(x+h))*C,r[1]=(p+b)*C,r[2]=(m-D)*C,r[3]=0,r[4]=(p-b)*R,r[5]=(1-(d+h))*R,r[6]=(g+A)*R,r[7]=0,r[8]=(m+D)*L,r[9]=(g-A)*L,r[10]=(1-(d+x))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Bi.set(r[0],r[1],r[2]).length();const o=Bi.set(r[4],r[5],r[6]).length(),l=Bi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),nn.copy(this);const c=1/a,u=1/o,f=1/l;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=u,nn.elements[5]*=u,nn.elements[6]*=u,nn.elements[8]*=f,nn.elements[9]*=f,nn.elements[10]*=f,t.setFromRotationMatrix(nn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=wn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===wn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Fr)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=wn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===wn)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===Fr)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Bi=new H,nn=new rt,uf=new H(0,0,0),df=new H(1,1,1),ei=new H,Kr=new H,Xt=new H,Ul=new rt,Nl=new hr;class hi{constructor(e=0,t=0,i=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ul.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ul,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nl.setFromEuler(this),this.setFromQuaternion(Nl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class tl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ff=0;const Fl=new H,ki=new hr,Ln=new rt,Zr=new H,vr=new H,hf=new H,pf=new hr,Ol=new H(1,0,0),Bl=new H(0,1,0),kl=new H(0,0,1),zl={type:"added"},mf={type:"removed"},zi={type:"childadded",child:null},ia={type:"childremoved",child:null};class Pt extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new H,t=new hi,i=new hr,r=new H(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ie}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.multiply(ki),this}rotateOnWorldAxis(e,t){return ki.setFromAxisAngle(e,t),this.quaternion.premultiply(ki),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Bl,e)}rotateZ(e){return this.rotateOnAxis(kl,e)}translateOnAxis(e,t){return Fl.copy(e).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Bl,e)}translateZ(e){return this.translateOnAxis(kl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zr.copy(e):Zr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(vr,Zr,this.up):Ln.lookAt(Zr,vr,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),ki.setFromRotationMatrix(Ln),this.quaternion.premultiply(ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zl),zi.child=e,this.dispatchEvent(zi),zi.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mf),ia.child=e,this.dispatchEvent(ia),ia.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zl),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,pf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new H(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gf={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),h=this._getHandJoint(c,x);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Nt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function sa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ge.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ge.workingColorSpace){if(e=nf(e,1),t=He(t,0,1),i=He(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=sa(a,s,e+1/3),this.g=sa(a,s,e),this.b=sa(a,s,e-1/3)}return Ge.colorSpaceToWorking(this,r),this}setStyle(e,t=Ht){function i(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const i=cu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Ge.workingToColorSpace(Dt.copy(this),e),Math.round(He(Dt.r*255,0,255))*65536+Math.round(He(Dt.g*255,0,255))*256+Math.round(He(Dt.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Dt.copy(this),t);const i=Dt.r,r=Dt.g,s=Dt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Ht){Ge.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,i=Dt.g,r=Dt.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(Jr);const i=Qs(ti.h,Jr.h,t),r=Qs(ti.s,Jr.s,t),s=Qs(ti.l,Jr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new We;We.NAMES=cu;class _f extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const rn=new H,Dn=new H,aa=new H,Un=new H,Gi=new H,Hi=new H,Gl=new H,oa=new H,la=new H,ca=new H,ua=new ot,da=new ot,fa=new ot;class ln{constructor(e=new H,t=new H,i=new H){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),rn.subVectors(e,t),r.cross(rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){rn.subVectors(r,t),Dn.subVectors(i,t),aa.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(Dn),l=rn.dot(aa),c=Dn.dot(Dn),u=Dn.dot(aa),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ua.setScalar(0),da.setScalar(0),fa.setScalar(0),ua.fromBufferAttribute(e,t),da.fromBufferAttribute(e,i),fa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ua,s.x),a.addScaledVector(da,s.y),a.addScaledVector(fa,s.z),a}static isFrontFacing(e,t,i,r){return rn.subVectors(i,t),Dn.subVectors(e,t),rn.cross(Dn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),rn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Gi.subVectors(r,i),Hi.subVectors(s,i),oa.subVectors(e,i);const l=Gi.dot(oa),c=Hi.dot(oa);if(l<=0&&c<=0)return t.copy(i);la.subVectors(e,r);const u=Gi.dot(la),f=Hi.dot(la);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Gi,a);ca.subVectors(e,s);const p=Gi.dot(ca),m=Hi.dot(ca);if(m>=0&&p<=m)return t.copy(s);const x=p*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Hi,o);const g=u*m-p*f;if(g<=0&&f-u>=0&&p-m>=0)return Gl.subVectors(s,r),o=(f-u)/(f-u+(p-m)),t.copy(r).addScaledVector(Gl,o);const h=1/(g+x+d);return a=x*h,o=d*h,t.copy(i).addScaledVector(Gi,a).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Li{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(s,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),jr.subVectors(this.max,xr),Vi.subVectors(e.a,xr),Wi.subVectors(e.b,xr),$i.subVectors(e.c,xr),ni.subVectors(Wi,Vi),ii.subVectors($i,Wi),mi.subVectors(Vi,$i);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-mi.z,mi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,mi.z,0,-mi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-mi.y,mi.x,0];return!ha(t,Vi,Wi,$i,jr)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Vi,Wi,$i,jr))?!1:(es.crossVectors(ni,ii),t=[es.x,es.y,es.z],ha(t,Vi,Wi,$i,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new H,new H,new H,new H,new H,new H,new H,new H],sn=new H,Qr=new Li,Vi=new H,Wi=new H,$i=new H,ni=new H,ii=new H,mi=new H,xr=new H,jr=new H,es=new H,gi=new H;function ha(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){gi.fromArray(n,s);const o=r.x*Math.abs(gi.x)+r.y*Math.abs(gi.y)+r.z*Math.abs(gi.z),l=e.dot(gi),c=t.dot(gi),u=i.dot(gi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const vt=new H,ts=new ze;let vf=0;class hn extends Ii{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=wl,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ts.fromBufferAttribute(this,t),ts.applyMatrix3(e),this.setXY(t,ts.x,ts.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=_r(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Gt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_r(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_r(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_r(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_r(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),i=Gt(i,this.array),r=Gt(r,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class uu extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class du extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class kt extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const xf=new Li,Mr=new H,pa=new H;class kr{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):xf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(pa)),this.expandByPoint(Mr.copy(e.center).sub(pa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Mf=0;const Qt=new rt,ma=new Pt,Xi=new H,qt=new Li,Sr=new Li,Tt=new H;class pn extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qd(e)?du:uu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ie().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return ma.lookAt(e),ma.updateMatrix(),this.applyMatrix4(ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Sr.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(qt.min,Sr.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,Sr.max),qt.expandByPoint(Tt)):(qt.expandByPoint(Sr.min),qt.expandByPoint(Sr.max))}qt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Tt.fromBufferAttribute(o,c),l&&(Xi.fromBufferAttribute(e,c),Tt.add(Xi)),r=Math.max(r,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new H,l[v]=new H;const c=new H,u=new H,f=new H,d=new ze,p=new ze,m=new ze,x=new H,g=new H;function h(v,w,O){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,w),f.fromBufferAttribute(i,O),d.fromBufferAttribute(s,v),p.fromBufferAttribute(s,w),m.fromBufferAttribute(s,O),u.sub(c),f.sub(c),p.sub(d),m.sub(d);const U=1/(p.x*m.y-m.x*p.y);isFinite(U)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(U),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(U),o[v].add(x),o[w].add(x),o[O].add(x),l[v].add(g),l[w].add(g),l[O].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let v=0,w=A.length;v<w;++v){const O=A[v],U=O.start,T=O.count;for(let I=U,S=U+T;I<S;I+=3)h(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const D=new H,b=new H,C=new H,R=new H;function L(v){C.fromBufferAttribute(r,v),R.copy(C);const w=o[v];D.copy(w),D.sub(C.multiplyScalar(C.dot(w))).normalize(),b.crossVectors(R,w);const U=b.dot(l[v])<0?-1:1;a.setXYZW(v,D.x,D.y,D.z,U)}for(let v=0,w=A.length;v<w;++v){const O=A[v],U=O.start,T=O.count;for(let I=U,S=U+T;I<S;I+=3)L(e.getX(I+0)),L(e.getX(I+1)),L(e.getX(I+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new H,s=new H,a=new H,o=new H,l=new H,c=new H,u=new H,f=new H;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let p=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let h=0;h<u;h++)d[m++]=c[p++]}return new hn(d,u,f)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sf=0;class zr extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=rr,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=Ha,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ga&&(i.blendSrc=this.blendSrc),this.blendDst!==Ha&&(i.blendDst=this.blendDst),this.blendEquation!==Mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fn=new H,ga=new H,ns=new H,ri=new H,_a=new H,is=new H,va=new H;class fu{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ga.copy(e).add(t).multiplyScalar(.5),ns.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(ga);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ns),o=ri.dot(this.direction),l=-ri.dot(ns),c=ri.lengthSq(),u=Math.abs(1-a*a);let f,d,p,m;if(u>0)if(f=a*l-o,d=a*o-l,m=s*u,f>=0)if(d>=-m)if(d<=m){const x=1/u;f*=x,d*=x,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ga).addScaledVector(ns,d),p}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,r,s){_a.subVectors(t,e),is.subVectors(i,e),va.crossVectors(_a,is);let a=this.direction.dot(va),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ri.subVectors(this.origin,e);const l=o*this.direction.dot(is.crossVectors(ri,is));if(l<0)return null;const c=o*this.direction.dot(_a.cross(ri));if(c<0||l+c>a)return null;const u=-o*ri.dot(va);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gr extends zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Hl=new rt,_i=new fu,rs=new kr,Vl=new H,ss=new H,as=new H,os=new H,xa=new H,ls=new H,Wl=new H,cs=new H;class wt extends Pt{constructor(e=new pn,t=new Gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ls.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(xa.fromBufferAttribute(f,e),a?ls.addScaledVector(xa,u):ls.addScaledVector(xa.sub(t),u))}t.add(ls)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rs.copy(i.boundingSphere),rs.applyMatrix4(s),_i.copy(e.ray).recast(e.near),!(rs.containsPoint(_i.origin)===!1&&(_i.intersectSphere(rs,Vl)===null||_i.origin.distanceToSquared(Vl)>(e.far-e.near)**2))&&(Hl.copy(s).invert(),_i.copy(e.ray).applyMatrix4(Hl),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],h=a[g.materialIndex],A=Math.max(g.start,p.start),D=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=A,C=D;b<C;b+=3){const R=o.getX(b),L=o.getX(b+1),v=o.getX(b+2);r=us(this,h,e,i,c,u,f,R,L,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=m,h=x;g<h;g+=3){const A=o.getX(g),D=o.getX(g+1),b=o.getX(g+2);r=us(this,a,e,i,c,u,f,A,D,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],h=a[g.materialIndex],A=Math.max(g.start,p.start),D=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=A,C=D;b<C;b+=3){const R=b,L=b+1,v=b+2;r=us(this,h,e,i,c,u,f,R,L,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=m,h=x;g<h;g+=3){const A=g,D=g+1,b=g+2;r=us(this,a,e,i,c,u,f,A,D,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function bf(n,e,t,i,r,s,a,o){let l;if(e.side===Wt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===fi,o),l===null)return null;cs.copy(o),cs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(cs);return c<t.near||c>t.far?null:{distance:c,point:cs.clone(),object:n}}function us(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ss),n.getVertexPosition(l,as),n.getVertexPosition(c,os);const u=bf(n,e,t,i,ss,as,os,Wl);if(u){const f=new H;ln.getBarycoord(Wl,ss,as,os,f),r&&(u.uv=ln.getInterpolatedAttribute(r,o,l,c,f,new ze)),s&&(u.uv1=ln.getInterpolatedAttribute(s,o,l,c,f,new ze)),a&&(u.normal=ln.getInterpolatedAttribute(a,o,l,c,f,new H),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new H,materialIndex:0};ln.getNormal(ss,as,os,d.normal),u.face=d,u.barycoord=f}return u}class nl extends Bt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Ct,u=Ct,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $l extends hn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const qi=new rt,Xl=new rt,ds=[],ql=new Li,yf=new rt,br=new wt,yr=new kr;class hu extends wt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $l(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,yf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,qi),ql.copy(e.boundingBox).applyMatrix4(qi),this.boundingBox.union(ql)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new kr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,qi),yr.copy(e.boundingSphere).applyMatrix4(qi),this.boundingSphere.union(yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(br.geometry=this.geometry,br.material=this.material,br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yr.copy(this.boundingSphere),yr.applyMatrix4(i),e.ray.intersectsSphere(yr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,qi),Xl.multiplyMatrices(i,qi),br.matrixWorld=Xl,br.raycast(e,ds);for(let a=0,o=ds.length;a<o;a++){const l=ds[a];l.instanceId=s,l.object=this,t.push(l)}ds.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new $l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new nl(new Float32Array(r*this.count),r,this.count,Yo,cn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ma=new H,Ef=new H,Tf=new Ie;class xi{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ma.subVectors(i,t).cross(Ef.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ma),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Tf.getNormalMatrix(e),r=this.coplanarPoint(Ma).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new kr,Af=new ze(.5,.5),fs=new H;class il{constructor(e=new xi,t=new xi,i=new xi,r=new xi,s=new xi,a=new xi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],p=s[7],m=s[8],x=s[9],g=s[10],h=s[11],A=s[12],D=s[13],b=s[14],C=s[15];if(r[0].setComponents(c-a,p-u,h-m,C-A).normalize(),r[1].setComponents(c+a,p+u,h+m,C+A).normalize(),r[2].setComponents(c+o,p+f,h+x,C+D).normalize(),r[3].setComponents(c-o,p-f,h-x,C-D).normalize(),i)r[4].setComponents(l,d,g,b).normalize(),r[5].setComponents(c-l,p-d,h-g,C-b).normalize();else if(r[4].setComponents(c-l,p-d,h-g,C-b).normalize(),t===wn)r[5].setComponents(c+l,p+d,h+g,C+b).normalize();else if(t===Fr)r[5].setComponents(l,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(e){vi.center.set(0,0,0);const t=Af.distanceTo(e.center);return vi.radius=.7071067811865476+t,vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(fs.x=r.normal.x>0?e.max.x:e.min.x,fs.y=r.normal.y>0?e.max.y:e.min.y,fs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pu extends Bt{constructor(e=[],t=wi,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ur extends Bt{constructor(e,t,i=Pn,r,s,a,o=Ct,l=Ct,c,u=qn,f=1){if(u!==qn&&u!==Ei)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new el(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wf extends ur{constructor(e,t=Pn,i=wi,r,s,a=Ct,o=Ct,l,c=qn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mu extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class pr extends pn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(u,3)),this.setAttribute("uv",new kt(f,2));function m(x,g,h,A,D,b,C,R,L,v,w){const O=b/L,U=C/v,T=b/2,I=C/2,S=R/2,P=L+1,X=v+1;let B=0,ee=0;const Z=new H;for(let ue=0;ue<X;ue++){const ge=ue*U-I;for(let xe=0;xe<P;xe++){const qe=xe*O-T;Z[x]=qe*A,Z[g]=ge*D,Z[h]=S,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[g]=0,Z[h]=R>0?1:-1,u.push(Z.x,Z.y,Z.z),f.push(xe/L),f.push(1-ue/v),B+=1}}for(let ue=0;ue<v;ue++)for(let ge=0;ge<L;ge++){const xe=d+ge+P*ue,qe=d+ge+P*(ue+1),lt=d+(ge+1)+P*(ue+1),Ye=d+(ge+1)+P*ue;l.push(xe,qe,Ye),l.push(qe,lt,Ye),ee+=6}o.addGroup(p,ee,w),p+=ee,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Bs extends pn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],p=[];let m=0;const x=[],g=i/2;let h=0;A(),a===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(u),this.setAttribute("position",new kt(f,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(p,2));function A(){const b=new H,C=new H;let R=0;const L=(t-e)/i;for(let v=0;v<=s;v++){const w=[],O=v/s,U=O*(t-e)+e;for(let T=0;T<=r;T++){const I=T/r,S=I*l+o,P=Math.sin(S),X=Math.cos(S);C.x=U*P,C.y=-O*i+g,C.z=U*X,f.push(C.x,C.y,C.z),b.set(P,L,X).normalize(),d.push(b.x,b.y,b.z),p.push(I,1-O),w.push(m++)}x.push(w)}for(let v=0;v<r;v++)for(let w=0;w<s;w++){const O=x[w][v],U=x[w+1][v],T=x[w+1][v+1],I=x[w][v+1];(e>0||w!==0)&&(u.push(O,U,I),R+=3),(t>0||w!==s-1)&&(u.push(U,T,I),R+=3)}c.addGroup(h,R,0),h+=R}function D(b){const C=m,R=new ze,L=new H;let v=0;const w=b===!0?e:t,O=b===!0?1:-1;for(let T=1;T<=r;T++)f.push(0,g*O,0),d.push(0,O,0),p.push(.5,.5),m++;const U=m;for(let T=0;T<=r;T++){const S=T/r*l+o,P=Math.cos(S),X=Math.sin(S);L.x=w*X,L.y=g*O,L.z=w*P,f.push(L.x,L.y,L.z),d.push(0,O,0),R.x=P*.5+.5,R.y=X*.5*O+.5,p.push(R.x,R.y),m++}for(let T=0;T<r;T++){const I=C+T,S=U+T;b===!0?u.push(S,S+1,I):u.push(S+1,S,I),v+=3}c.addGroup(h,v,b===!0?1:2),h+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ks extends Bs{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ks(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mr extends pn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,p=[],m=[],x=[],g=[];for(let h=0;h<u;h++){const A=h*d-a;for(let D=0;D<c;D++){const b=D*f-s;m.push(b,-A,0),x.push(0,0,1),g.push(D/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let A=0;A<o;A++){const D=A+c*h,b=A+c*(h+1),C=A+1+c*(h+1),R=A+1+c*h;p.push(D,b,R),p.push(b,C,R)}this.setIndex(p),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(x,3)),this.setAttribute("uv",new kt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Us extends pn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new H,d=new H,p=[],m=[],x=[],g=[];for(let h=0;h<=i;h++){const A=[],D=h/i,b=a+D*o,C=e*Math.cos(b),R=Math.sqrt(e*e-C*C);let L=0;h===0&&a===0?L=.5/t:h===i&&l===Math.PI&&(L=-.5/t);for(let v=0;v<=t;v++){const w=v/t,O=r+w*s;f.x=-R*Math.cos(O),f.y=C,f.z=R*Math.sin(O),m.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),g.push(w+L,1-D),A.push(c++)}u.push(A)}for(let h=0;h<i;h++)for(let A=0;A<t;A++){const D=u[h][A+1],b=u[h][A],C=u[h+1][A],R=u[h+1][A+1];(h!==0||a>0)&&p.push(D,b,R),(h!==i-1||l<Math.PI)&&p.push(b,C,R)}this.setIndex(p),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(x,3)),this.setAttribute("uv",new kt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Yl(r))r.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Yl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function Yl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Rf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const Cf={clone:dr,merge:Ft};var Pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends zr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pf,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new H().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"m4":this.uniforms[i].value=new rt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Lf extends In{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mt extends zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Df extends zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Uf extends zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _u extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Nf extends _u{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Sa=new rt,Kl=new H,Zl=new H;class Ff{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Kl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kl),Zl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zl),t.updateMatrixWorld(),Sa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Fr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Sa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const hs=new H,ps=new hr,vn=new H;class vu extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(hs,ps,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hs,ps,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(hs,ps,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hs,ps,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const si=new H,Jl=new ze,Ql=new ze;class on extends vu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,Jl,Ql),t.subVectors(Ql,Jl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Js*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class zs extends vu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Of extends Ff{constructor(){super(new zs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bf extends _u{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Of}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Yi=-90,Ki=1;class kf extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new on(Yi,Ki,e,t);r.layers=this.layers,this.add(r);const s=new on(Yi,Ki,e,t);s.layers=this.layers,this.add(s);const a=new on(Yi,Ki,e,t);a.layers=this.layers,this.add(a);const o=new on(Yi,Ki,e,t);o.layers=this.layers,this.add(o);const l=new on(Yi,Ki,e,t);l.layers=this.layers,this.add(l);const c=new on(Yi,Ki,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===wn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class zf extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const jl=new rt;class Gf{constructor(e,t,i=0,r=1/0){this.ray=new fu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new tl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return jl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jl),this}intersectObject(e,t=!0,i=[]){return Po(e,this,i,t),i.sort(ec),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Po(e[r],this,i,t);return i.sort(ec),i}}function ec(n,e){return n.distance-e.distance}function Po(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Po(s[a],e,t,!0)}}class xu{static{xu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function tc(n,e,t,i){const r=Hf(i);switch(t){case su:return n*e;case Yo:return n*e/r.components*r.byteLength;case Ko:return n*e/r.components*r.byteLength;case Ri:return n*e*2/r.components*r.byteLength;case Zo:return n*e*2/r.components*r.byteLength;case au:return n*e*3/r.components*r.byteLength;case un:return n*e*4/r.components*r.byteLength;case Jo:return n*e*4/r.components*r.byteLength;case xs:case Ms:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ss:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qa:case eo:return Math.max(n,16)*Math.max(e,8)/4;case Ja:case ja:return Math.max(n,8)*Math.max(e,8)/2;case to:case no:case ro:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case io:case Cs:case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case co:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case fo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ho:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case po:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case mo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case go:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case _o:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case So:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case bo:case yo:case Eo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case To:case Ao:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ps:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hf(n){switch(n){case Kt:case tu:return{byteLength:1,components:1};case Ur:case nu:case Xn:return{byteLength:2,components:1};case Xo:case qo:return{byteLength:2,components:4};case Pn:case $o:case cn:return{byteLength:4,components:1};case iu:case ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vo}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Mu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Vf(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],x=f[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const x=f[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$f=`#ifdef USE_ALPHAHASH
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
#endif`,Xf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zf=`#ifdef USE_AOMAP
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
#endif`,Jf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qf=`#ifdef USE_BATCHING
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
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,th=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ih=`#ifdef USE_IRIDESCENCE
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
#endif`,rh=`#ifdef USE_BUMPMAP
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
#endif`,sh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ah=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,oh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ch=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hh=`#define PI 3.141592653589793
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
} // validated`,ph=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,mh=`vec3 transformedNormal = objectNormal;
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
#endif`,gh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_h=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bh=`#ifdef USE_ENVMAP
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
#endif`,yh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Eh=`#ifdef USE_ENVMAP
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
#endif`,Th=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ah=`#ifdef USE_ENVMAP
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
#endif`,wh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ch=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ph=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ih=`#ifdef USE_GRADIENTMAP
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
}`,Lh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Uh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nh=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Fh=`#ifdef USE_ENVMAP
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
#endif`,Oh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gh=`PhysicalMaterial material;
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
#endif`,Hh=`uniform sampler2D dfgLUT;
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
}`,Vh=`
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
#endif`,Wh=`#if defined( RE_IndirectDiffuse )
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
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xh=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,qh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ep=`#if defined( USE_POINTS_UV )
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
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
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
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,hp=`#ifdef USE_NORMALMAP
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
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cp=`float getShadowMask() {
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
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
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
#endif`,Lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bp=`#ifdef USE_TRANSMISSION
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
#endif`,kp=`#ifdef USE_TRANSMISSION
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
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$p=`uniform sampler2D t2D;
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`#include <common>
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
}`,Jp=`#if DEPTH_PACKING == 3200
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
}`,Qp=`#define DISTANCE
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
}`,jp=`#define DISTANCE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
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
}`,im=`uniform vec3 diffuse;
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
}`,rm=`#include <common>
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
}`,sm=`uniform vec3 diffuse;
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
}`,am=`#define LAMBERT
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
}`,om=`#define LAMBERT
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
}`,lm=`#define MATCAP
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
}`,cm=`#define MATCAP
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
}`,um=`#define NORMAL
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
}`,dm=`#define NORMAL
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
}`,fm=`#define PHONG
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
}`,hm=`#define PHONG
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
}`,pm=`#define STANDARD
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
}`,mm=`#define STANDARD
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
}`,gm=`#define TOON
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
}`,_m=`#define TOON
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
}`,vm=`uniform float size;
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
}`,xm=`uniform vec3 diffuse;
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
}`,Mm=`#include <common>
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
}`,Sm=`uniform vec3 color;
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
}`,bm=`uniform float rotation;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Wf,alphahash_pars_fragment:$f,alphamap_fragment:Xf,alphamap_pars_fragment:qf,alphatest_fragment:Yf,alphatest_pars_fragment:Kf,aomap_fragment:Zf,aomap_pars_fragment:Jf,batching_pars_vertex:Qf,batching_vertex:jf,begin_vertex:eh,beginnormal_vertex:th,bsdfs:nh,iridescence_fragment:ih,bumpmap_pars_fragment:rh,clipping_planes_fragment:sh,clipping_planes_pars_fragment:ah,clipping_planes_pars_vertex:oh,clipping_planes_vertex:lh,color_fragment:ch,color_pars_fragment:uh,color_pars_vertex:dh,color_vertex:fh,common:hh,cube_uv_reflection_fragment:ph,defaultnormal_vertex:mh,displacementmap_pars_vertex:gh,displacementmap_vertex:_h,emissivemap_fragment:vh,emissivemap_pars_fragment:xh,colorspace_fragment:Mh,colorspace_pars_fragment:Sh,envmap_fragment:bh,envmap_common_pars_fragment:yh,envmap_pars_fragment:Eh,envmap_pars_vertex:Th,envmap_physical_pars_fragment:Fh,envmap_vertex:Ah,fog_vertex:wh,fog_pars_vertex:Rh,fog_fragment:Ch,fog_pars_fragment:Ph,gradientmap_pars_fragment:Ih,lightmap_pars_fragment:Lh,lights_lambert_fragment:Dh,lights_lambert_pars_fragment:Uh,lights_pars_begin:Nh,lights_toon_fragment:Oh,lights_toon_pars_fragment:Bh,lights_phong_fragment:kh,lights_phong_pars_fragment:zh,lights_physical_fragment:Gh,lights_physical_pars_fragment:Hh,lights_fragment_begin:Vh,lights_fragment_maps:Wh,lights_fragment_end:$h,lightprobes_pars_fragment:Xh,logdepthbuf_fragment:qh,logdepthbuf_pars_fragment:Yh,logdepthbuf_pars_vertex:Kh,logdepthbuf_vertex:Zh,map_fragment:Jh,map_pars_fragment:Qh,map_particle_fragment:jh,map_particle_pars_fragment:ep,metalnessmap_fragment:tp,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:rp,morphnormal_vertex:sp,morphtarget_pars_vertex:ap,morphtarget_vertex:op,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:up,normal_pars_vertex:dp,normal_vertex:fp,normalmap_pars_fragment:hp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:_p,opaque_fragment:vp,packing:xp,premultiplied_alpha_fragment:Mp,project_vertex:Sp,dithering_fragment:bp,dithering_pars_fragment:yp,roughnessmap_fragment:Ep,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:Ap,shadowmap_pars_vertex:wp,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Ip,skinning_vertex:Lp,skinnormal_vertex:Dp,specularmap_fragment:Up,specularmap_pars_fragment:Np,tonemapping_fragment:Fp,tonemapping_pars_fragment:Op,transmission_fragment:Bp,transmission_pars_fragment:kp,uv_pars_fragment:zp,uv_pars_vertex:Gp,uv_vertex:Hp,worldpos_vertex:Vp,background_vert:Wp,background_frag:$p,backgroundCube_vert:Xp,backgroundCube_frag:qp,cube_vert:Yp,cube_frag:Kp,depth_vert:Zp,depth_frag:Jp,distance_vert:Qp,distance_frag:jp,equirect_vert:em,equirect_frag:tm,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:rm,meshbasic_frag:sm,meshlambert_vert:am,meshlambert_frag:om,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:um,meshnormal_frag:dm,meshphong_vert:fm,meshphong_frag:hm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:_m,points_vert:vm,points_frag:xm,shadow_vert:Mm,shadow_frag:Sm,sprite_vert:bm,sprite_frag:ym},fe={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},yn={basic:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ft([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ft([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new We(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ft([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ft([fe.points,fe.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ft([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ft([fe.common,fe.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ft([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ft([fe.sprite,fe.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:Ft([fe.common,fe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:Ft([fe.lights,fe.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};yn.physical={uniforms:Ft([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const ms={r:0,b:0,g:0},Em=new rt,Su=new Ie;Su.set(-1,0,0,0,1,0,0,0,1);function Tm(n,e,t,i,r,s){const a=new We(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function p(A){let D=A.isScene===!0?A.background:null;if(D&&D.isTexture){const b=A.backgroundBlurriness>0;D=e.get(D,b)}return D}function m(A){let D=!1;const b=p(A);b===null?g(a,o):b&&b.isColor&&(g(b,1),D=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||D)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(A,D){const b=p(D);b&&(b.isCubeTexture||b.mapping===Os)?(c===void 0&&(c=new wt(new pr(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:dr(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Em.makeRotationFromEuler(D.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Su),c.material.toneMapped=Ge.getTransfer(b.colorSpace)!==Qe,(u!==b||f!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new wt(new mr(2,2),new In({name:"BackgroundMaterial",uniforms:dr(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(b.colorSpace)!==Qe,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function g(A,D){A.getRGB(ms,gu(n)),t.buffers.color.setClear(ms.r,ms.g,ms.b,D,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,D=1){a.set(A),o=D,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,g(a,o)},render:m,addToRenderList:x,dispose:h}}function Am(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(U,T,I,S,P){let X=!1;const B=f(U,S,I,T);s!==B&&(s=B,c(s.object)),X=p(U,S,I,P),X&&m(U,S,I,P),P!==null&&e.update(P,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,b(U,T,I,S),P!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function l(){return n.createVertexArray()}function c(U){return n.bindVertexArray(U)}function u(U){return n.deleteVertexArray(U)}function f(U,T,I,S){const P=S.wireframe===!0;let X=i[T.id];X===void 0&&(X={},i[T.id]=X);const B=U.isInstancedMesh===!0?U.id:0;let ee=X[B];ee===void 0&&(ee={},X[B]=ee);let Z=ee[I.id];Z===void 0&&(Z={},ee[I.id]=Z);let ue=Z[P];return ue===void 0&&(ue=d(l()),Z[P]=ue),ue}function d(U){const T=[],I=[],S=[];for(let P=0;P<t;P++)T[P]=0,I[P]=0,S[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:I,attributeDivisors:S,object:U,attributes:{},index:null}}function p(U,T,I,S){const P=s.attributes,X=T.attributes;let B=0;const ee=I.getAttributes();for(const Z in ee)if(ee[Z].location>=0){const ge=P[Z];let xe=X[Z];if(xe===void 0&&(Z==="instanceMatrix"&&U.instanceMatrix&&(xe=U.instanceMatrix),Z==="instanceColor"&&U.instanceColor&&(xe=U.instanceColor)),ge===void 0||ge.attribute!==xe||xe&&ge.data!==xe.data)return!0;B++}return s.attributesNum!==B||s.index!==S}function m(U,T,I,S){const P={},X=T.attributes;let B=0;const ee=I.getAttributes();for(const Z in ee)if(ee[Z].location>=0){let ge=X[Z];ge===void 0&&(Z==="instanceMatrix"&&U.instanceMatrix&&(ge=U.instanceMatrix),Z==="instanceColor"&&U.instanceColor&&(ge=U.instanceColor));const xe={};xe.attribute=ge,ge&&ge.data&&(xe.data=ge.data),P[Z]=xe,B++}s.attributes=P,s.attributesNum=B,s.index=S}function x(){const U=s.newAttributes;for(let T=0,I=U.length;T<I;T++)U[T]=0}function g(U){h(U,0)}function h(U,T){const I=s.newAttributes,S=s.enabledAttributes,P=s.attributeDivisors;I[U]=1,S[U]===0&&(n.enableVertexAttribArray(U),S[U]=1),P[U]!==T&&(n.vertexAttribDivisor(U,T),P[U]=T)}function A(){const U=s.newAttributes,T=s.enabledAttributes;for(let I=0,S=T.length;I<S;I++)T[I]!==U[I]&&(n.disableVertexAttribArray(I),T[I]=0)}function D(U,T,I,S,P,X,B){B===!0?n.vertexAttribIPointer(U,T,I,P,X):n.vertexAttribPointer(U,T,I,S,P,X)}function b(U,T,I,S){x();const P=S.attributes,X=I.getAttributes(),B=T.defaultAttributeValues;for(const ee in X){const Z=X[ee];if(Z.location>=0){let ue=P[ee];if(ue===void 0&&(ee==="instanceMatrix"&&U.instanceMatrix&&(ue=U.instanceMatrix),ee==="instanceColor"&&U.instanceColor&&(ue=U.instanceColor)),ue!==void 0){const ge=ue.normalized,xe=ue.itemSize,qe=e.get(ue);if(qe===void 0)continue;const lt=qe.buffer,Ye=qe.type,j=qe.bytesPerElement,se=Ye===n.INT||Ye===n.UNSIGNED_INT||ue.gpuType===$o;if(ue.isInterleavedBufferAttribute){const ne=ue.data,Pe=ne.stride,Le=ue.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<Z.locationSize;we++)h(Z.location+we,ne.meshPerAttribute);U.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<Z.locationSize;we++)g(Z.location+we);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let we=0;we<Z.locationSize;we++)D(Z.location+we,xe/Z.locationSize,Ye,ge,Pe*j,(Le+xe/Z.locationSize*we)*j,se)}else{if(ue.isInstancedBufferAttribute){for(let ne=0;ne<Z.locationSize;ne++)h(Z.location+ne,ue.meshPerAttribute);U.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ne=0;ne<Z.locationSize;ne++)g(Z.location+ne);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let ne=0;ne<Z.locationSize;ne++)D(Z.location+ne,xe/Z.locationSize,Ye,ge,xe*j,xe/Z.locationSize*ne*j,se)}}else if(B!==void 0){const ge=B[ee];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(Z.location,ge);break;case 3:n.vertexAttrib3fv(Z.location,ge);break;case 4:n.vertexAttrib4fv(Z.location,ge);break;default:n.vertexAttrib1fv(Z.location,ge)}}}}A()}function C(){w();for(const U in i){const T=i[U];for(const I in T){const S=T[I];for(const P in S){const X=S[P];for(const B in X)u(X[B].object),delete X[B];delete S[P]}}delete i[U]}}function R(U){if(i[U.id]===void 0)return;const T=i[U.id];for(const I in T){const S=T[I];for(const P in S){const X=S[P];for(const B in X)u(X[B].object),delete X[B];delete S[P]}}delete i[U.id]}function L(U){for(const T in i){const I=i[T];for(const S in I){const P=I[S];if(P[U.id]===void 0)continue;const X=P[U.id];for(const B in X)u(X[B].object),delete X[B];delete P[U.id]}}}function v(U){for(const T in i){const I=i[T],S=U.isInstancedMesh===!0?U.id:0,P=I[S];if(P!==void 0){for(const X in P){const B=P[X];for(const ee in B)u(B[ee].object),delete B[ee];delete P[X]}delete I[S],Object.keys(I).length===0&&delete i[T]}}}function w(){O(),a=!0,s!==r&&(s=r,c(s.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:O,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfObject:v,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:g,disableUnusedAttributes:A}}function wm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Rm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==un&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const v=L===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Kt&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==cn&&!v)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),D=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:A,maxVaryings:D,maxFragmentUniforms:b,maxSamples:C,samples:R}}function Cm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new xi,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,h=n.get(f);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const A=s?0:i,D=A*4;let b=h.clippingState||null;l.value=b,b=u(m,d,D,p);for(let C=0;C!==D;++C)b[C]=t[C];h.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,m){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const h=p+x*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(g===null||g.length<h)&&(g=new Float32Array(h));for(let D=0,b=p;D!==x;++D,b+=4)a.copy(f[D]).applyMatrix4(A,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const ci=4,nc=[.125,.215,.35,.446,.526,.582],Si=20,Pm=256,Er=new zs,ic=new We;let ba=null,ya=0,Ea=0,Ta=!1;const Im=new H;class rc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Im}=s;ba=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,ya,Ea),this._renderer.xr.enabled=Ta,e.scissorTest=!1,Zi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Xn,format:un,colorSpace:Is,depthBuffer:!1},r=sc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Lm(s)),this._blurMaterial=Um(s,e,t),this._ggxMaterial=Dm(s,e,t)}return r}_compileMaterial(e){const t=new wt(new pn,e);this._renderer.compile(t,Er)}_sceneToCubeUV(e,t,i,r,s){const l=new on(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(ic),f.toneMapping=Rn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wt(new pr,new Gr({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let h=!1;const A=e.background;A?A.isColor&&(g.color.copy(A),e.background=null,h=!0):(g.color.copy(ic),h=!0);for(let D=0;D<6;D++){const b=D%3;b===0?(l.up.set(0,c[D],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[D],s.y,s.z)):b===1?(l.up.set(0,0,c[D]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[D],s.z)):(l.up.set(0,c[D],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[D]));const C=this._cubeSize;Zi(r,b*C,D>2?C:0,C,C),f.setRenderTarget(r),h&&f.render(x,l),f.render(e,l)}f.toneMapping=p,f.autoClear=d,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===wi||e.mapping===cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ac());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Zi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Er)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,p=f*d,{_lodMax:m}=this,x=this._sizeLods[i],g=3*x*(i>m-ci?i-m+ci:0),h=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=m-t,Zi(s,g,h,3*x,2*x),r.setRenderTarget(s),r.render(o,Er),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Zi(e,g,h,3*x,2*x),r.setRenderTarget(e),r.render(o,Er)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ve("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Si-1),x=s/m,g=isFinite(s)?1+Math.floor(u*x):Si;g>Si&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Si}`);const h=[];let A=0;for(let L=0;L<Si;++L){const v=L/x,w=Math.exp(-v*v/2);h.push(w),L===0?A+=w:L<g&&(A+=2*w)}for(let L=0;L<h.length;L++)h[L]=h[L]/A;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:D}=this;d.dTheta.value=m,d.mipInt.value=D-i;const b=this._sizeLods[r],C=3*b*(r>D-ci?r-D+ci:0),R=4*(this._cubeSize-b);Zi(t,C,R,3*b,2*b),l.setRenderTarget(t),l.render(f,Er)}}function Lm(n){const e=[],t=[],i=[];let r=n;const s=n-ci+1+nc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ci?l=nc[a-n+ci-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,m=6,x=3,g=2,h=1,A=new Float32Array(x*m*p),D=new Float32Array(g*m*p),b=new Float32Array(h*m*p);for(let R=0;R<p;R++){const L=R%3*2/3-1,v=R>2?0:-1,w=[L,v,0,L+2/3,v,0,L+2/3,v+1,0,L,v,0,L+2/3,v+1,0,L,v+1,0];A.set(w,x*m*R),D.set(d,g*m*R);const O=[R,R,R,R,R,R];b.set(O,h*m*R)}const C=new pn;C.setAttribute("position",new hn(A,x)),C.setAttribute("uv",new hn(D,g)),C.setAttribute("faceIndex",new hn(b,h)),i.push(new wt(C,null)),r>ci&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function sc(n,e,t){const i=new Cn(n,e,t);return i.texture.mapping=Os,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Dm(n,e,t){return new In({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gs(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Um(n,e,t){const i=new Float32Array(Si),r=new H(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Gs(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ac(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gs(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function oc(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Gs(){return`

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
	`}class bu extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new pu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pr(5,5,5),s=new In({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wt,blending:Wn});s.uniforms.tEquirect.value=t;const a=new wt(r,s),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=Ut),new kf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Nm(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===Ys||p===Ks)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const x=new bu(m.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,m=p===Ys||p===Ks,x=p===wi||p===cr;if(m||x){let g=t.get(d);const h=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new rc(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const A=d.image;return m&&A&&A.height>0||x&&A&&l(A)?(i===null&&(i=new rc(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,p){return p===Ys?d.mapping=wi:p===Ks&&(d.mapping=cr),d}function l(d){let p=0;const m=6;for(let x=0;x<m;x++)d[x]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Fm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&sr("WebGLRenderer: "+i+" extension not supported."),r}}}function Om(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,m=f.attributes.position;let x=0;if(m===void 0)return;if(p!==null){const A=p.array;x=p.version;for(let D=0,b=A.length;D<b;D+=3){const C=A[D+0],R=A[D+1],L=A[D+2];d.push(C,R,R,L,L,C)}}else{const A=m.array;x=m.version;for(let D=0,b=A.length/3-1;D<b;D+=3){const C=D+0,R=D+1,L=D+2;d.push(C,R,R,L,L,C)}}const g=new(m.count>=65535?du:uu)(d,1);g.version=x;const h=s.get(f);h&&e.remove(h),s.set(f,g)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Bm(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function c(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,s,f*a,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let x=0;for(let g=0;g<p;g++)x+=d[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function km(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function zm(n,e,t){const i=new WeakMap,r=new ot;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let O=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",O)};var p=O;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],D=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),x===!0&&(b=2),g===!0&&(b=3);let C=o.attributes.position.count*b,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const L=new Float32Array(C*R*4*f),v=new lu(L,C,R,f);v.type=cn,v.needsUpdate=!0;const w=b*4;for(let U=0;U<f;U++){const T=h[U],I=A[U],S=D[U],P=C*R*4*U;for(let X=0;X<T.count;X++){const B=X*w;m===!0&&(r.fromBufferAttribute(T,X),L[P+B+0]=r.x,L[P+B+1]=r.y,L[P+B+2]=r.z,L[P+B+3]=0),x===!0&&(r.fromBufferAttribute(I,X),L[P+B+4]=r.x,L[P+B+5]=r.y,L[P+B+6]=r.z,L[P+B+7]=0),g===!0&&(r.fromBufferAttribute(S,X),L[P+B+8]=r.x,L[P+B+9]=r.y,L[P+B+10]=r.z,L[P+B+11]=S.itemSize===4?r.w:1)}}d={count:f,texture:v,size:new ze(C,R)},i.set(o,d),o.addEventListener("dispose",O)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Gm(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Hm={[Yc]:"LINEAR_TONE_MAPPING",[Kc]:"REINHARD_TONE_MAPPING",[Zc]:"CINEON_TONE_MAPPING",[Wo]:"ACES_FILMIC_TONE_MAPPING",[Qc]:"AGX_TONE_MAPPING",[jc]:"NEUTRAL_TONE_MAPPING",[Jc]:"CUSTOM_TONE_MAPPING"};function Vm(n,e,t,i,r,s){const a=new Cn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new ur(e,t):void 0}),o=new Cn(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new pn;l.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new kt([0,2,0,0,2,0],2));const c=new Lf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new wt(l,c),f=new zs(-1,1,1,-1,0,1);let d=null,p=null,m=!1,x,g=null,h=[],A=!1;this.setSize=function(D,b){a.setSize(D,b),o.setSize(D,b);for(let C=0;C<h.length;C++){const R=h[C];R.setSize&&R.setSize(D,b)}},this.setEffects=function(D){h=D,A=h.length>0&&h[0].isRenderPass===!0;const b=a.width,C=a.height;for(let R=0;R<h.length;R++){const L=h[R];L.setSize&&L.setSize(b,C)}},this.begin=function(D,b){if(m||D.toneMapping===Rn&&h.length===0)return!1;if(g=b,b!==null){const C=b.width,R=b.height;(a.width!==C||a.height!==R)&&this.setSize(C,R)}return A===!1&&D.setRenderTarget(a),x=D.toneMapping,D.toneMapping=Rn,!0},this.hasRenderPass=function(){return A},this.end=function(D,b){D.toneMapping=x,m=!0;let C=a,R=o;for(let L=0;L<h.length;L++){const v=h[L];if(v.enabled!==!1&&(v.render(D,R,C,b),v.needsSwap!==!1)){const w=C;C=R,R=w}}if(d!==D.outputColorSpace||p!==D.toneMapping){d=D.outputColorSpace,p=D.toneMapping,c.defines={},Ge.getTransfer(d)===Qe&&(c.defines.SRGB_TRANSFER="");const L=Hm[p];L&&(c.defines[L]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=C.texture,D.setRenderTarget(g),D.render(u,f),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const yu=new Bt,Io=new ur(1,1),Eu=new lu,Tu=new cf,Au=new pu,lc=[],cc=[],uc=new Float32Array(16),dc=new Float32Array(9),fc=new Float32Array(4);function gr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=lc[r];if(s===void 0&&(s=new Float32Array(r),lc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hs(n,e){let t=cc[e];t===void 0&&(t=new Int32Array(e),cc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Wm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function Ym(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,i))return;fc.set(i),n.uniformMatrix2fv(this.addr,!1,fc),yt(t,i)}}function Km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,i))return;dc.set(i),n.uniformMatrix3fv(this.addr,!1,dc),yt(t,i)}}function Zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,i))return;uc.set(i),n.uniformMatrix4fv(this.addr,!1,uc),yt(t,i)}}function Jm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function t0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function n0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function i0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function r0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function s0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Io.compareFunction=t.isReversedDepthBuffer()?jo:Qo,s=Io):s=yu,t.setTexture2D(e||s,r)}function a0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Tu,r)}function o0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Au,r)}function l0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Eu,r)}function c0(n){switch(n){case 5126:return Wm;case 35664:return $m;case 35665:return Xm;case 35666:return qm;case 35674:return Ym;case 35675:return Km;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return Qm;case 35668:case 35672:return jm;case 35669:case 35673:return e0;case 5125:return t0;case 36294:return n0;case 36295:return i0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return a0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return l0}}function u0(n,e){n.uniform1fv(this.addr,e)}function d0(n,e){const t=gr(e,this.size,2);n.uniform2fv(this.addr,t)}function f0(n,e){const t=gr(e,this.size,3);n.uniform3fv(this.addr,t)}function h0(n,e){const t=gr(e,this.size,4);n.uniform4fv(this.addr,t)}function p0(n,e){const t=gr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function m0(n,e){const t=gr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function g0(n,e){const t=gr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function _0(n,e){n.uniform1iv(this.addr,e)}function v0(n,e){n.uniform2iv(this.addr,e)}function x0(n,e){n.uniform3iv(this.addr,e)}function M0(n,e){n.uniform4iv(this.addr,e)}function S0(n,e){n.uniform1uiv(this.addr,e)}function b0(n,e){n.uniform2uiv(this.addr,e)}function y0(n,e){n.uniform3uiv(this.addr,e)}function E0(n,e){n.uniform4uiv(this.addr,e)}function T0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Io:a=yu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function A0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Tu,s[a])}function w0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Au,s[a])}function R0(n,e,t){const i=this.cache,r=e.length,s=Hs(t,r);bt(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Eu,s[a])}function C0(n){switch(n){case 5126:return u0;case 35664:return d0;case 35665:return f0;case 35666:return h0;case 35674:return p0;case 35675:return m0;case 35676:return g0;case 5124:case 35670:return _0;case 35667:case 35671:return v0;case 35668:case 35672:return x0;case 35669:case 35673:return M0;case 5125:return S0;case 36294:return b0;case 36295:return y0;case 36296:return E0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return R0}}class P0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=c0(t.type)}}class I0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=C0(t.type)}}class L0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Aa=/(\w+)(\])?(\[|\.)?/g;function hc(n,e){n.seq.push(e),n.map[e.id]=e}function D0(n,e,t){const i=n.name,r=i.length;for(Aa.lastIndex=0;;){const s=Aa.exec(i),a=Aa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){hc(t,c===void 0?new P0(o,n,e):new I0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new L0(o),hc(t,f)),t=f}}}class ys{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);D0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function pc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const U0=37297;let N0=0;function F0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const mc=new Ie;function O0(n){Ge._getMatrix(mc,Ge.workingColorSpace,n);const e=`mat3( ${mc.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(n)){case Ls:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function gc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+F0(n.getShaderSource(e),o)}else return s}function B0(n,e){const t=O0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const k0={[Yc]:"Linear",[Kc]:"Reinhard",[Zc]:"Cineon",[Wo]:"ACESFilmic",[Qc]:"AgX",[jc]:"Neutral",[Jc]:"Custom"};function z0(n,e){const t=k0[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const gs=new H;function G0(){Ge.getLuminanceCoefficients(gs);const n=gs.x.toFixed(4),e=gs.y.toFixed(4),t=gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function V0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function W0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Cr(n){return n!==""}function _c(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lo(n){return n.replace($0,q0)}const X0=new Map;function q0(n,e){let t=Fe[e];if(t===void 0){const i=X0.get(e);if(i!==void 0)t=Fe[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lo(t)}const Y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xc(n){return n.replace(Y0,K0)}function K0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Mc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Z0={[vs]:"SHADOWMAP_TYPE_PCF",[Rr]:"SHADOWMAP_TYPE_VSM"};function J0(n){return Z0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Q0={[wi]:"ENVMAP_TYPE_CUBE",[cr]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE_UV"};function j0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Q0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const eg={[cr]:"ENVMAP_MODE_REFRACTION"};function tg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":eg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ng={[qc]:"ENVMAP_BLENDING_MULTIPLY",[Gd]:"ENVMAP_BLENDING_MIX",[Hd]:"ENVMAP_BLENDING_ADD"};function ig(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ng[n.combine]||"ENVMAP_BLENDING_NONE"}function rg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function sg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=J0(t),c=j0(t),u=tg(t),f=ig(t),d=rg(t),p=H0(t),m=V0(s),x=r.createProgram();let g,h,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),h.length>0&&(h+=`
`)):(g=[Mc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),h=[Mc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Rn?z0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,B0("linearToOutputTexel",t.outputColorSpace),G0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),a=Lo(a),a=_c(a,t),a=vc(a,t),o=Lo(o),o=_c(o,t),o=vc(o,t),a=xc(a),o=xc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const D=A+g+a,b=A+h+o,C=pc(r,r.VERTEX_SHADER,D),R=pc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,C),r.attachShader(x,R),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function L(U){if(n.debug.checkShaderErrors){const T=r.getProgramInfoLog(x)||"",I=r.getShaderInfoLog(C)||"",S=r.getShaderInfoLog(R)||"",P=T.trim(),X=I.trim(),B=S.trim();let ee=!0,Z=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,C,R);else{const ue=gc(r,C,"vertex"),ge=gc(r,R,"fragment");Ve("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+P+`
`+ue+`
`+ge)}else P!==""?Ce("WebGLProgram: Program Info Log:",P):(X===""||B==="")&&(Z=!1);Z&&(U.diagnostics={runnable:ee,programLog:P,vertexShader:{log:X,prefix:g},fragmentShader:{log:B,prefix:h}})}r.deleteShader(C),r.deleteShader(R),v=new ys(r,x),w=W0(r,x)}let v;this.getUniforms=function(){return v===void 0&&L(this),v};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(x,U0)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=N0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=R,this}let ag=0;class og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new lg(e),t.set(e,i)),i}}class lg{constructor(e){this.id=ag++,this.code=e,this.usedTimes=0}}function cg(n){return n===Ri||n===Cs||n===Ps}function ug(n,e,t,i,r,s){const a=new tl,o=new og,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,w,O,U,T,I){const S=U.fog,P=T.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ee=e.get(v.envMap||X,B),Z=ee&&ee.mapping===Os?ee.image.height:null,ue=p[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&Ce("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const ge=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,xe=ge!==void 0?ge.length:0;let qe=0;P.morphAttributes.position!==void 0&&(qe=1),P.morphAttributes.normal!==void 0&&(qe=2),P.morphAttributes.color!==void 0&&(qe=3);let lt,Ye,j,se;if(ue){const Me=yn[ue];lt=Me.vertexShader,Ye=Me.fragmentShader}else{lt=v.vertexShader,Ye=v.fragmentShader;const Me=o.getVertexShaderStage(v),ut=o.getFragmentShaderStage(v);o.update(v,Me,ut),j=Me.id,se=ut.id}const ne=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Le=T.isInstancedMesh===!0,we=T.isBatchedMesh===!0,ft=!!v.map,ke=!!v.matcap,tt=!!ee,Ke=!!v.aoMap,$e=!!v.lightMap,gt=!!v.bumpMap&&v.wireframe===!1,xt=!!v.normalMap,Et=!!v.displacementMap,Rt=!!v.emissiveMap,ct=!!v.metalnessMap,_t=!!v.roughnessMap,k=v.anisotropy>0,zt=v.clearcoat>0,Je=v.dispersion>0,y=v.iridescence>0,_=v.sheen>0,G=v.transmission>0,$=k&&!!v.anisotropyMap,Y=zt&&!!v.clearcoatMap,ie=zt&&!!v.clearcoatNormalMap,ae=zt&&!!v.clearcoatRoughnessMap,K=y&&!!v.iridescenceMap,Q=y&&!!v.iridescenceThicknessMap,oe=_&&!!v.sheenColorMap,ye=_&&!!v.sheenRoughnessMap,de=!!v.specularMap,le=!!v.specularColorMap,Ae=!!v.specularIntensityMap,Re=G&&!!v.transmissionMap,De=G&&!!v.thicknessMap,F=!!v.gradientMap,re=!!v.alphaMap,J=v.alphaTest>0,ce=!!v.alphaHash,me=!!v.extensions;let te=Rn;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(te=n.toneMapping);const be={shaderID:ue,shaderType:v.type,shaderName:v.name,vertexShader:lt,fragmentShader:Ye,defines:v.defines,customVertexShaderID:j,customFragmentShaderID:se,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:we,batchingColor:we&&T._colorsTexture!==null,instancing:Le,instancingColor:Le&&T.instanceColor!==null,instancingMorph:Le&&T.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ft,matcap:ke,envMap:tt,envMapMode:tt&&ee.mapping,envMapCubeUVHeight:Z,aoMap:Ke,lightMap:$e,bumpMap:gt,normalMap:xt,displacementMap:Et,emissiveMap:Rt,normalMapObjectSpace:xt&&v.normalMapType===$d,normalMapTangentSpace:xt&&v.normalMapType===Ro,packedNormalMap:xt&&v.normalMapType===Ro&&cg(v.normalMap.format),metalnessMap:ct,roughnessMap:_t,anisotropy:k,anisotropyMap:$,clearcoat:zt,clearcoatMap:Y,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:Je,iridescence:y,iridescenceMap:K,iridescenceThicknessMap:Q,sheen:_,sheenColorMap:oe,sheenRoughnessMap:ye,specularMap:de,specularColorMap:le,specularIntensityMap:Ae,transmission:G,transmissionMap:Re,thicknessMap:De,gradientMap:F,opaque:v.transparent===!1&&v.blending===rr&&v.alphaToCoverage===!1,alphaMap:re,alphaTest:J,alphaHash:ce,combine:v.combine,mapUv:ft&&m(v.map.channel),aoMapUv:Ke&&m(v.aoMap.channel),lightMapUv:$e&&m(v.lightMap.channel),bumpMapUv:gt&&m(v.bumpMap.channel),normalMapUv:xt&&m(v.normalMap.channel),displacementMapUv:Et&&m(v.displacementMap.channel),emissiveMapUv:Rt&&m(v.emissiveMap.channel),metalnessMapUv:ct&&m(v.metalnessMap.channel),roughnessMapUv:_t&&m(v.roughnessMap.channel),anisotropyMapUv:$&&m(v.anisotropyMap.channel),clearcoatMapUv:Y&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(v.sheenRoughnessMap.channel),specularMapUv:de&&m(v.specularMap.channel),specularColorMapUv:le&&m(v.specularColorMap.channel),specularIntensityMapUv:Ae&&m(v.specularIntensityMap.channel),transmissionMapUv:Re&&m(v.transmissionMap.channel),thicknessMapUv:De&&m(v.thicknessMap.channel),alphaMapUv:re&&m(v.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(xt||k),vertexNormals:!!P.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!P.attributes.uv&&(ft||re),fog:!!S,useFog:v.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||P.attributes.normal===void 0&&xt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Pe,skinning:T.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:qe,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:te,decodeVideoTexture:ft&&v.map.isVideoTexture===!0&&Ge.getTransfer(v.map.colorSpace)===Qe,decodeVideoTextureEmissive:Rt&&v.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(v.emissiveMap.colorSpace)===Qe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===kn,flipSided:v.side===Wt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:me&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&v.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function g(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const O in v.defines)w.push(O),w.push(v.defines[O]);return v.isRawShaderMaterial===!1&&(h(w,v),A(w,v),w.push(n.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function h(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function A(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function D(v){const w=p[v.type];let O;if(w){const U=yn[w];O=Cf.clone(U.uniforms)}else O=v.uniforms;return O}function b(v,w){let O=u.get(w);return O!==void 0?++O.usedTimes:(O=new sg(n,w,v,r),c.push(O),u.set(w,O)),O}function C(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function R(v){o.remove(v)}function L(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:D,acquireProgram:b,releaseProgram:C,releaseShaderCache:R,programs:c,dispose:L}}function dg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function fg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Sc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function bc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,m,x,g,h){let A=n[e];return A===void 0?(A={id:d.id,object:d,geometry:p,material:m,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:h},n[e]=A):(A.id=d.id,A.object=d,A.geometry=p,A.material=m,A.materialVariant=a(d),A.groupOrder=x,A.renderOrder=d.renderOrder,A.z=g,A.group=h),e++,A}function l(d,p,m,x,g,h){const A=o(d,p,m,x,g,h);m.transmission>0?i.push(A):m.transparent===!0?r.push(A):t.push(A)}function c(d,p,m,x,g,h){const A=o(d,p,m,x,g,h);m.transmission>0?i.unshift(A):m.transparent===!0?r.unshift(A):t.unshift(A)}function u(d,p,m){t.length>1&&t.sort(d||fg),i.length>1&&i.sort(p||Sc),r.length>1&&r.sort(p||Sc),m&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,p=n.length;d<p;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function hg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new bc,n.set(i,[a])):r>=s.length?(a=new bc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function pg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new We};break;case"SpotLight":t={position:new H,direction:new H,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new H,halfWidth:new H,halfHeight:new H};break}return n[e.id]=t,t}}}function mg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let gg=0;function _g(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function vg(n){const e=new pg,t=mg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new rt,a=new rt;function o(c){let u=0,f=0,d=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,m=0,x=0,g=0,h=0,A=0,D=0,b=0,C=0,R=0,L=0;c.sort(_g);for(let w=0,O=c.length;w<O;w++){const U=c[w],T=U.color,I=U.intensity,S=U.distance;let P=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Ri?P=U.shadow.map.texture:P=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=T.r*I,f+=T.g*I,d+=T.b*I;else if(U.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(U.sh.coefficients[X],I);L++}else if(U.isDirectionalLight){const X=e.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const B=U.shadow,ee=t.get(U);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,i.directionalShadow[p]=ee,i.directionalShadowMap[p]=P,i.directionalShadowMatrix[p]=U.shadow.matrix,A++}i.directional[p]=X,p++}else if(U.isSpotLight){const X=e.get(U);X.position.setFromMatrixPosition(U.matrixWorld),X.color.copy(T).multiplyScalar(I),X.distance=S,X.coneCos=Math.cos(U.angle),X.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),X.decay=U.decay,i.spot[x]=X;const B=U.shadow;if(U.map&&(i.spotLightMap[C]=U.map,C++,B.updateMatrices(U),U.castShadow&&R++),i.spotLightMatrix[x]=B.matrix,U.castShadow){const ee=t.get(U);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,i.spotShadow[x]=ee,i.spotShadowMap[x]=P,b++}x++}else if(U.isRectAreaLight){const X=e.get(U);X.color.copy(T).multiplyScalar(I),X.halfWidth.set(U.width*.5,0,0),X.halfHeight.set(0,U.height*.5,0),i.rectArea[g]=X,g++}else if(U.isPointLight){const X=e.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),X.distance=U.distance,X.decay=U.decay,U.castShadow){const B=U.shadow,ee=t.get(U);ee.shadowIntensity=B.intensity,ee.shadowBias=B.bias,ee.shadowNormalBias=B.normalBias,ee.shadowRadius=B.radius,ee.shadowMapSize=B.mapSize,ee.shadowCameraNear=B.camera.near,ee.shadowCameraFar=B.camera.far,i.pointShadow[m]=ee,i.pointShadowMap[m]=P,i.pointShadowMatrix[m]=U.shadow.matrix,D++}i.point[m]=X,m++}else if(U.isHemisphereLight){const X=e.get(U);X.skyColor.copy(U.color).multiplyScalar(I),X.groundColor.copy(U.groundColor).multiplyScalar(I),i.hemi[h]=X,h++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==p||v.pointLength!==m||v.spotLength!==x||v.rectAreaLength!==g||v.hemiLength!==h||v.numDirectionalShadows!==A||v.numPointShadows!==D||v.numSpotShadows!==b||v.numSpotMaps!==C||v.numLightProbes!==L)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=D,i.pointShadowMap.length=D,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=D,i.spotLightMatrix.length=b+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=L,v.directionalLength=p,v.pointLength=m,v.spotLength=x,v.rectAreaLength=g,v.hemiLength=h,v.numDirectionalShadows=A,v.numPointShadows=D,v.numSpotShadows=b,v.numSpotMaps=C,v.numLightProbes=L,i.version=gg++)}function l(c,u){let f=0,d=0,p=0,m=0,x=0;const g=u.matrixWorldInverse;for(let h=0,A=c.length;h<A;h++){const D=c[h];if(D.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(D.matrixWorld),r.setFromMatrixPosition(D.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),f++}else if(D.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(D.matrixWorld),r.setFromMatrixPosition(D.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),p++}else if(D.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(g),a.identity(),s.copy(D.matrixWorld),s.premultiply(g),a.extractRotation(s),b.halfWidth.set(D.width*.5,0,0),b.halfHeight.set(0,D.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),m++}else if(D.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(g),d++}else if(D.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(D.matrixWorld),b.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function yc(n){const e=new vg(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function xg(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new yc(n),e.set(r,[o])):s>=a.length?(o=new yc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sg=`uniform sampler2D shadow_pass;
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
}`,bg=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],yg=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Ec=new rt,Tr=new H,wa=new H;function Eg(n,e,t){let i=new il;const r=new ze,s=new ze,a=new ot,o=new Df,l=new Uf,c={},u=t.maxTextureSize,f={[fi]:Wt,[Wt]:fi,[kn]:kn},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:Mg,fragmentShader:Sg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new pn;m.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new wt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vs;let h=this.type;this.render=function(R,L,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===Xc&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vs);const w=n.getRenderTarget(),O=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),T=n.state;T.setBlending(Wn),T.buffers.depth.getReversed()===!0?T.buffers.color.setClear(0,0,0,0):T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);const I=h!==this.type;I&&L.traverse(function(S){S.material&&(Array.isArray(S.material)?S.material.forEach(P=>P.needsUpdate=!0):S.material.needsUpdate=!0)});for(let S=0,P=R.length;S<P;S++){const X=R[S],B=X.shadow;if(B===void 0){Ce("WebGLShadowMap:",X,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const ee=B.getFrameExtents();r.multiply(ee),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ee.x),r.x=s.x*ee.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ee.y),r.y=s.y*ee.y,B.mapSize.y=s.y));const Z=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Z,B.map===null||I===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Rr){if(X.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Cn(r.x,r.y,{format:Ri,type:Xn,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),B.map.texture.name=X.name+".shadowMap",B.map.depthTexture=new ur(r.x,r.y,cn),B.map.depthTexture.name=X.name+".shadowMapDepth",B.map.depthTexture.format=qn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ct,B.map.depthTexture.magFilter=Ct}else X.isPointLight?(B.map=new bu(r.x),B.map.depthTexture=new wf(r.x,Pn)):(B.map=new Cn(r.x,r.y),B.map.depthTexture=new ur(r.x,r.y,Pn)),B.map.depthTexture.name=X.name+".shadowMap",B.map.depthTexture.format=qn,this.type===vs?(B.map.depthTexture.compareFunction=Z?jo:Qo,B.map.depthTexture.minFilter=Ut,B.map.depthTexture.magFilter=Ut):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ct,B.map.depthTexture.magFilter=Ct);B.camera.updateProjectionMatrix()}const ue=B.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<ue;ge++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(B.map),n.clear());const xe=B.getViewport(ge);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),T.viewport(a)}if(X.isPointLight){const xe=B.camera,qe=B.matrix,lt=X.distance||xe.far;lt!==xe.far&&(xe.far=lt,xe.updateProjectionMatrix()),Tr.setFromMatrixPosition(X.matrixWorld),xe.position.copy(Tr),wa.copy(xe.position),wa.add(bg[ge]),xe.up.copy(yg[ge]),xe.lookAt(wa),xe.updateMatrixWorld(),qe.makeTranslation(-Tr.x,-Tr.y,-Tr.z),Ec.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Ec,xe.coordinateSystem,xe.reversedDepth)}else B.updateMatrices(X);i=B.getFrustum(),b(L,v,B.camera,X,this.type)}B.isPointLightShadow!==!0&&this.type===Rr&&A(B,v),B.needsUpdate=!1}h=this.type,g.needsUpdate=!1,n.setRenderTarget(w,O,U)};function A(R,L){const v=e.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Cn(r.x,r.y,{format:Ri,type:Xn})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(L,null,v,d,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(L,null,v,p,x,null)}function D(R,L,v,w){let O=null;const U=v.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)O=U;else if(O=v.isPointLight===!0?l:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const T=O.uuid,I=L.uuid;let S=c[T];S===void 0&&(S={},c[T]=S);let P=S[I];P===void 0&&(P=O.clone(),S[I]=P,L.addEventListener("dispose",C)),O=P}if(O.visible=L.visible,O.wireframe=L.wireframe,w===Rr?O.side=L.shadowSide!==null?L.shadowSide:L.side:O.side=L.shadowSide!==null?L.shadowSide:f[L.side],O.alphaMap=L.alphaMap,O.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,O.map=L.map,O.clipShadows=L.clipShadows,O.clippingPlanes=L.clippingPlanes,O.clipIntersection=L.clipIntersection,O.displacementMap=L.displacementMap,O.displacementScale=L.displacementScale,O.displacementBias=L.displacementBias,O.wireframeLinewidth=L.wireframeLinewidth,O.linewidth=L.linewidth,v.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const T=n.properties.get(O);T.light=v}return O}function b(R,L,v,w,O){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&O===Rr)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,R.matrixWorld);const I=e.update(R),S=R.material;if(Array.isArray(S)){const P=I.groups;for(let X=0,B=P.length;X<B;X++){const ee=P[X],Z=S[ee.materialIndex];if(Z&&Z.visible){const ue=D(R,Z,w,O);R.onBeforeShadow(n,R,L,v,I,ue,ee),n.renderBufferDirect(v,null,I,ue,R,ee),R.onAfterShadow(n,R,L,v,I,ue,ee)}}}else if(S.visible){const P=D(R,S,w,O);R.onBeforeShadow(n,R,L,v,I,P,null),n.renderBufferDirect(v,null,I,P,R,null),R.onAfterShadow(n,R,L,v,I,P,null)}}const T=R.children;for(let I=0,S=T.length;I<S;I++)b(T[I],L,v,w,O)}function C(R){R.target.removeEventListener("dispose",C);for(const v in c){const w=c[v],O=R.target.uuid;O in w&&(w[O].dispose(),delete w[O])}}}function Tg(n,e){function t(){let F=!1;const re=new ot;let J=null;const ce=new ot(0,0,0,0);return{setMask:function(me){J!==me&&!F&&(n.colorMask(me,me,me,me),J=me)},setLocked:function(me){F=me},setClear:function(me,te,be,Me,ut){ut===!0&&(me*=Me,te*=Me,be*=Me),re.set(me,te,be,Me),ce.equals(re)===!1&&(n.clearColor(me,te,be,Me),ce.copy(re))},reset:function(){F=!1,J=null,ce.set(-1,0,0,0)}}}function i(){let F=!1,re=!1,J=null,ce=null,me=null;return{setReversed:function(te){if(re!==te){const be=e.get("EXT_clip_control");te?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=te;const Me=me;me=null,this.setClear(Me)}},getReversed:function(){return re},setTest:function(te){te?ne(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(te){J!==te&&!F&&(n.depthMask(te),J=te)},setFunc:function(te){if(re&&(te=tf[te]),ce!==te){switch(te){case Va:n.depthFunc(n.NEVER);break;case Wa:n.depthFunc(n.ALWAYS);break;case $a:n.depthFunc(n.LESS);break;case lr:n.depthFunc(n.LEQUAL);break;case Xa:n.depthFunc(n.EQUAL);break;case qa:n.depthFunc(n.GEQUAL);break;case Ya:n.depthFunc(n.GREATER);break;case Ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=te}},setLocked:function(te){F=te},setClear:function(te){me!==te&&(me=te,re&&(te=1-te),n.clearDepth(te))},reset:function(){F=!1,J=null,ce=null,me=null,re=!1}}}function r(){let F=!1,re=null,J=null,ce=null,me=null,te=null,be=null,Me=null,ut=null;return{setTest:function(st){F||(st?ne(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(st){re!==st&&!F&&(n.stencilMask(st),re=st)},setFunc:function(st,mn,gn){(J!==st||ce!==mn||me!==gn)&&(n.stencilFunc(st,mn,gn),J=st,ce=mn,me=gn)},setOp:function(st,mn,gn){(te!==st||be!==mn||Me!==gn)&&(n.stencilOp(st,mn,gn),te=st,be=mn,Me=gn)},setLocked:function(st){F=st},setClear:function(st){ut!==st&&(n.clearStencil(st),ut=st)},reset:function(){F=!1,re=null,J=null,ce=null,me=null,te=null,be=null,Me=null,ut=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},p=new WeakMap,m=[],x=null,g=!1,h=null,A=null,D=null,b=null,C=null,R=null,L=null,v=new We(0,0,0),w=0,O=!1,U=null,T=null,I=null,S=null,P=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,ee=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(Z)[1]),B=ee>=1):Z.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),B=ee>=2);let ue=null,ge={};const xe=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),lt=new ot().fromArray(xe),Ye=new ot().fromArray(qe);function j(F,re,J,ce){const me=new Uint8Array(4),te=n.createTexture();n.bindTexture(F,te),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<J;be++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(re+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return te}const se={};se[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(lr),gt(!1),xt(bl),ne(n.CULL_FACE),Ke(Wn);function ne(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function Pe(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function Le(F,re){return d[F]!==re?(n.bindFramebuffer(F,re),d[F]=re,F===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=re),F===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=re),!0):!1}function we(F,re){let J=m,ce=!1;if(F){J=p.get(re),J===void 0&&(J=[],p.set(re,J));const me=F.textures;if(J.length!==me.length||J[0]!==n.COLOR_ATTACHMENT0){for(let te=0,be=me.length;te<be;te++)J[te]=n.COLOR_ATTACHMENT0+te;J.length=me.length,ce=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,ce=!0);ce&&n.drawBuffers(J)}function ft(F){return x!==F?(n.useProgram(F),x=F,!0):!1}const ke={[Mi]:n.FUNC_ADD,[Ed]:n.FUNC_SUBTRACT,[Td]:n.FUNC_REVERSE_SUBTRACT};ke[Ad]=n.MIN,ke[wd]=n.MAX;const tt={[Rd]:n.ZERO,[Cd]:n.ONE,[Pd]:n.SRC_COLOR,[Ga]:n.SRC_ALPHA,[Fd]:n.SRC_ALPHA_SATURATE,[Ud]:n.DST_COLOR,[Ld]:n.DST_ALPHA,[Id]:n.ONE_MINUS_SRC_COLOR,[Ha]:n.ONE_MINUS_SRC_ALPHA,[Nd]:n.ONE_MINUS_DST_COLOR,[Dd]:n.ONE_MINUS_DST_ALPHA,[Od]:n.CONSTANT_COLOR,[Bd]:n.ONE_MINUS_CONSTANT_COLOR,[kd]:n.CONSTANT_ALPHA,[zd]:n.ONE_MINUS_CONSTANT_ALPHA};function Ke(F,re,J,ce,me,te,be,Me,ut,st){if(F===Wn){g===!0&&(Pe(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),F!==yd){if(F!==h||st!==O){if((A!==Mi||C!==Mi)&&(n.blendEquation(n.FUNC_ADD),A=Mi,C=Mi),st)switch(F){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yl:n.blendFunc(n.ONE,n.ONE);break;case El:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Tl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ve("WebGLState: Invalid blending: ",F);break}else switch(F){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case El:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tl:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",F);break}D=null,b=null,R=null,L=null,v.set(0,0,0),w=0,h=F,O=st}return}me=me||re,te=te||J,be=be||ce,(re!==A||me!==C)&&(n.blendEquationSeparate(ke[re],ke[me]),A=re,C=me),(J!==D||ce!==b||te!==R||be!==L)&&(n.blendFuncSeparate(tt[J],tt[ce],tt[te],tt[be]),D=J,b=ce,R=te,L=be),(Me.equals(v)===!1||ut!==w)&&(n.blendColor(Me.r,Me.g,Me.b,ut),v.copy(Me),w=ut),h=F,O=!1}function $e(F,re){F.side===kn?Pe(n.CULL_FACE):ne(n.CULL_FACE);let J=F.side===Wt;re&&(J=!J),gt(J),F.blending===rr&&F.transparent===!1?Ke(Wn):Ke(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const ce=F.stencilWrite;o.setTest(ce),ce&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Rt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function gt(F){U!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),U=F)}function xt(F){F!==Sd?(ne(n.CULL_FACE),F!==T&&(F===bl?n.cullFace(n.BACK):F===bd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),T=F}function Et(F){F!==I&&(B&&n.lineWidth(F),I=F)}function Rt(F,re,J){F?(ne(n.POLYGON_OFFSET_FILL),(S!==re||P!==J)&&(S=re,P=J,a.getReversed()&&(re=-re),n.polygonOffset(re,J))):Pe(n.POLYGON_OFFSET_FILL)}function ct(F){F?ne(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function _t(F){F===void 0&&(F=n.TEXTURE0+X-1),ue!==F&&(n.activeTexture(F),ue=F)}function k(F,re,J){J===void 0&&(ue===null?J=n.TEXTURE0+X-1:J=ue);let ce=ge[J];ce===void 0&&(ce={type:void 0,texture:void 0},ge[J]=ce),(ce.type!==F||ce.texture!==re)&&(ue!==J&&(n.activeTexture(J),ue=J),n.bindTexture(F,re||se[F]),ce.type=F,ce.texture=re)}function zt(){const F=ge[ue];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Je(){try{n.compressedTexImage2D(...arguments)}catch(F){Ve("WebGLState:",F)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(F){Ve("WebGLState:",F)}}function _(){try{n.texSubImage2D(...arguments)}catch(F){Ve("WebGLState:",F)}}function G(){try{n.texSubImage3D(...arguments)}catch(F){Ve("WebGLState:",F)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(F){Ve("WebGLState:",F)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(F){Ve("WebGLState:",F)}}function ie(){try{n.texStorage2D(...arguments)}catch(F){Ve("WebGLState:",F)}}function ae(){try{n.texStorage3D(...arguments)}catch(F){Ve("WebGLState:",F)}}function K(){try{n.texImage2D(...arguments)}catch(F){Ve("WebGLState:",F)}}function Q(){try{n.texImage3D(...arguments)}catch(F){Ve("WebGLState:",F)}}function oe(F){return f[F]!==void 0?f[F]:n.getParameter(F)}function ye(F,re){f[F]!==re&&(n.pixelStorei(F,re),f[F]=re)}function de(F){lt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),lt.copy(F))}function le(F){Ye.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ye.copy(F))}function Ae(F,re){let J=c.get(re);J===void 0&&(J=new WeakMap,c.set(re,J));let ce=J.get(F);ce===void 0&&(ce=n.getUniformBlockIndex(re,F.name),J.set(F,ce))}function Re(F,re){const ce=c.get(re).get(F);l.get(re)!==ce&&(n.uniformBlockBinding(re,ce,F.__bindingPointIndex),l.set(re,ce))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ue=null,ge={},d={},p=new WeakMap,m=[],x=null,g=!1,h=null,A=null,D=null,b=null,C=null,R=null,L=null,v=new We(0,0,0),w=0,O=!1,U=null,T=null,I=null,S=null,P=null,lt.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Pe,bindFramebuffer:Le,drawBuffers:we,useProgram:ft,setBlending:Ke,setMaterial:$e,setFlipSided:gt,setCullFace:xt,setLineWidth:Et,setPolygonOffset:Rt,setScissorTest:ct,activeTexture:_t,bindTexture:k,unbindTexture:zt,compressedTexImage2D:Je,compressedTexImage3D:y,texImage2D:K,texImage3D:Q,pixelStorei:ye,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ie,texStorage3D:ae,texSubImage2D:_,texSubImage3D:G,compressedTexSubImage2D:$,compressedTexSubImage3D:Y,scissor:de,viewport:le,reset:De}}function Ag(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(y,_){return m?new OffscreenCanvas(y,_):Ds("canvas")}function g(y,_,G){let $=1;const Y=Je(y);if((Y.width>G||Y.height>G)&&($=G/Math.max(Y.width,Y.height)),$<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ie=Math.floor($*Y.width),ae=Math.floor($*Y.height);d===void 0&&(d=x(ie,ae));const K=_?x(ie,ae):d;return K.width=ie,K.height=ae,K.getContext("2d").drawImage(y,0,0,ie,ae),Ce("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ie+"x"+ae+")."),K}else return"data"in y&&Ce("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),y;return y}function h(y){return y.generateMipmaps}function A(y){n.generateMipmap(y)}function D(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(y,_,G,$,Y,ie=!1){if(y!==null){if(n[y]!==void 0)return n[y];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let ae;$&&(ae=e.get("EXT_texture_norm16"),ae||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===n.RED&&(G===n.FLOAT&&(K=n.R32F),G===n.HALF_FLOAT&&(K=n.R16F),G===n.UNSIGNED_BYTE&&(K=n.R8),G===n.UNSIGNED_SHORT&&ae&&(K=ae.R16_EXT),G===n.SHORT&&ae&&(K=ae.R16_SNORM_EXT)),_===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.R8UI),G===n.UNSIGNED_SHORT&&(K=n.R16UI),G===n.UNSIGNED_INT&&(K=n.R32UI),G===n.BYTE&&(K=n.R8I),G===n.SHORT&&(K=n.R16I),G===n.INT&&(K=n.R32I)),_===n.RG&&(G===n.FLOAT&&(K=n.RG32F),G===n.HALF_FLOAT&&(K=n.RG16F),G===n.UNSIGNED_BYTE&&(K=n.RG8),G===n.UNSIGNED_SHORT&&ae&&(K=ae.RG16_EXT),G===n.SHORT&&ae&&(K=ae.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RG8UI),G===n.UNSIGNED_SHORT&&(K=n.RG16UI),G===n.UNSIGNED_INT&&(K=n.RG32UI),G===n.BYTE&&(K=n.RG8I),G===n.SHORT&&(K=n.RG16I),G===n.INT&&(K=n.RG32I)),_===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGB8UI),G===n.UNSIGNED_SHORT&&(K=n.RGB16UI),G===n.UNSIGNED_INT&&(K=n.RGB32UI),G===n.BYTE&&(K=n.RGB8I),G===n.SHORT&&(K=n.RGB16I),G===n.INT&&(K=n.RGB32I)),_===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),G===n.UNSIGNED_INT&&(K=n.RGBA32UI),G===n.BYTE&&(K=n.RGBA8I),G===n.SHORT&&(K=n.RGBA16I),G===n.INT&&(K=n.RGBA32I)),_===n.RGB&&(G===n.UNSIGNED_SHORT&&ae&&(K=ae.RGB16_EXT),G===n.SHORT&&ae&&(K=ae.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),_===n.RGBA){const Q=ie?Ls:Ge.getTransfer(Y);G===n.FLOAT&&(K=n.RGBA32F),G===n.HALF_FLOAT&&(K=n.RGBA16F),G===n.UNSIGNED_BYTE&&(K=Q===Qe?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&ae&&(K=ae.RGBA16_EXT),G===n.SHORT&&ae&&(K=ae.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function C(y,_){let G;return y?_===null||_===Pn||_===Nr?G=n.DEPTH24_STENCIL8:_===cn?G=n.DEPTH32F_STENCIL8:_===Ur&&(G=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Pn||_===Nr?G=n.DEPTH_COMPONENT24:_===cn?G=n.DEPTH_COMPONENT32F:_===Ur&&(G=n.DEPTH_COMPONENT16),G}function R(y,_){return h(y)===!0||y.isFramebufferTexture&&y.minFilter!==Ct&&y.minFilter!==Ut?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function L(y){const _=y.target;_.removeEventListener("dispose",L),w(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function v(y){const _=y.target;_.removeEventListener("dispose",v),U(_)}function w(y){const _=i.get(y);if(_.__webglInit===void 0)return;const G=y.source,$=p.get(G);if($){const Y=$[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&O(y),Object.keys($).length===0&&p.delete(G)}i.remove(y)}function O(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const G=y.source,$=p.get(G);delete $[_.__cacheKey],a.memory.textures--}function U(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let Y=0;Y<_.__webglFramebuffer[$].length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[$][Y]);else n.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)n.deleteFramebuffer(_.__webglFramebuffer[$]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const G=y.textures;for(let $=0,Y=G.length;$<Y;$++){const ie=i.get(G[$]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(G[$])}i.remove(y)}let T=0;function I(){T=0}function S(){return T}function P(y){T=y}function X(){const y=T;return y>=r.maxTextures&&Ce("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),T+=1,y}function B(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function ee(y,_){const G=i.get(y);if(y.isVideoTexture&&k(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&G.__version!==y.version){const $=y.image;if($===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(G,y,_);return}}else y.isExternalTexture&&(G.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+_)}function Z(y,_){const G=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&G.__version!==y.version){Pe(G,y,_);return}else y.isExternalTexture&&(G.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+_)}function ue(y,_){const G=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&G.__version!==y.version){Pe(G,y,_);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+_)}function ge(y,_){const G=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&G.__version!==y.version){Le(G,y,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+_)}const xe={[Rs]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[Za]:n.MIRRORED_REPEAT},qe={[Ct]:n.NEAREST,[Vd]:n.NEAREST_MIPMAP_NEAREST,[Yr]:n.NEAREST_MIPMAP_LINEAR,[Ut]:n.LINEAR,[Zs]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},lt={[Xd]:n.NEVER,[Jd]:n.ALWAYS,[qd]:n.LESS,[Qo]:n.LEQUAL,[Yd]:n.EQUAL,[jo]:n.GEQUAL,[Kd]:n.GREATER,[Zd]:n.NOTEQUAL};function Ye(y,_){if(_.type===cn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ut||_.magFilter===Zs||_.magFilter===Yr||_.magFilter===yi||_.minFilter===Ut||_.minFilter===Zs||_.minFilter===Yr||_.minFilter===yi)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,xe[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,xe[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,xe[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,qe[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,qe[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,lt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==Yr&&_.minFilter!==yi||_.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function j(y,_){let G=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",L));const $=_.source;let Y=p.get($);Y===void 0&&(Y={},p.set($,Y));const ie=B(_);if(ie!==y.__cacheKey){Y[ie]===void 0&&(Y[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Y[ie].usedTimes++;const ae=Y[y.__cacheKey];ae!==void 0&&(Y[y.__cacheKey].usedTimes--,ae.usedTimes===0&&O(_)),y.__cacheKey=ie,y.__webglTexture=Y[ie].texture}return G}function se(y,_,G){return Math.floor(Math.floor(y/G)/_)}function ne(y,_,G,$){const ie=y.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,G,$,_.data);else{ie.sort((ye,de)=>ye.start-de.start);let ae=0;for(let ye=1;ye<ie.length;ye++){const de=ie[ae],le=ie[ye],Ae=de.start+de.count,Re=se(le.start,_.width,4),De=se(de.start,_.width,4);le.start<=Ae+1&&Re===De&&se(le.start+le.count-1,_.width,4)===Re?de.count=Math.max(de.count,le.start+le.count-de.start):(++ae,ie[ae]=le)}ie.length=ae+1;const K=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ye=0,de=ie.length;ye<de;ye++){const le=ie[ye],Ae=Math.floor(le.start/4),Re=Math.ceil(le.count/4),De=Ae%_.width,F=Math.floor(Ae/_.width),re=Re,J=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,De,F,re,J,G,$,_.data)}y.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,K),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Pe(y,_,G){let $=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=n.TEXTURE_3D);const Y=j(y,_),ie=_.source;t.bindTexture($,y.__webglTexture,n.TEXTURE0+G);const ae=i.get(ie);if(ie.version!==ae.__version||Y===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const J=Ge.getPrimaries(Ge.workingColorSpace),ce=_.colorSpace===li?null:Ge.getPrimaries(_.colorSpace),me=_.colorSpace===li||J===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=g(_.image,!1,r.maxTextureSize);Q=zt(_,Q);const oe=s.convert(_.format,_.colorSpace),ye=s.convert(_.type);let de=b(_.internalFormat,oe,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ye($,_);let le;const Ae=_.mipmaps,Re=_.isVideoTexture!==!0,De=ae.__version===void 0||Y===!0,F=ie.dataReady,re=R(_,Q);if(_.isDepthTexture)de=C(_.format===Ei,_.type),De&&(Re?t.texStorage2D(n.TEXTURE_2D,1,de,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,de,Q.width,Q.height,0,oe,ye,null));else if(_.isDataTexture)if(Ae.length>0){Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,de,Ae[0].width,Ae[0].height);for(let J=0,ce=Ae.length;J<ce;J++)le=Ae[J],Re?F&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,J,de,le.width,le.height,0,oe,ye,le.data);_.generateMipmaps=!1}else Re?(De&&t.texStorage2D(n.TEXTURE_2D,re,de,Q.width,Q.height),F&&ne(_,Q,oe,ye)):t.texImage2D(n.TEXTURE_2D,0,de,Q.width,Q.height,0,oe,ye,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Re&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,de,Ae[0].width,Ae[0].height,Q.depth);for(let J=0,ce=Ae.length;J<ce;J++)if(le=Ae[J],_.format!==un)if(oe!==null)if(Re){if(F)if(_.layerUpdates.size>0){const me=tc(le.width,le.height,_.format,_.type);for(const te of _.layerUpdates){const be=le.data.subarray(te*me/le.data.BYTES_PER_ELEMENT,(te+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,te,le.width,le.height,1,oe,be)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,Q.depth,oe,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,de,le.width,le.height,Q.depth,0,le.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,Q.depth,oe,ye,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,de,le.width,le.height,Q.depth,0,oe,ye,le.data)}else{Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,de,Ae[0].width,Ae[0].height);for(let J=0,ce=Ae.length;J<ce;J++)le=Ae[J],_.format!==un?oe!==null?Re?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(n.TEXTURE_2D,J,de,le.width,le.height,0,le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?F&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,J,de,le.width,le.height,0,oe,ye,le.data)}else if(_.isDataArrayTexture)if(Re){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,de,Q.width,Q.height,Q.depth),F)if(_.layerUpdates.size>0){const J=tc(Q.width,Q.height,_.format,_.type);for(const ce of _.layerUpdates){const me=Q.data.subarray(ce*J/Q.data.BYTES_PER_ELEMENT,(ce+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,Q.width,Q.height,1,oe,ye,me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,ye,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,de,Q.width,Q.height,Q.depth,0,oe,ye,Q.data);else if(_.isData3DTexture)Re?(De&&t.texStorage3D(n.TEXTURE_3D,re,de,Q.width,Q.height,Q.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,ye,Q.data)):t.texImage3D(n.TEXTURE_3D,0,de,Q.width,Q.height,Q.depth,0,oe,ye,Q.data);else if(_.isFramebufferTexture){if(De)if(Re)t.texStorage2D(n.TEXTURE_2D,re,de,Q.width,Q.height);else{let J=Q.width,ce=Q.height;for(let me=0;me<re;me++)t.texImage2D(n.TEXTURE_2D,me,de,J,ce,0,oe,ye,null),J>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),f.add(_),J.onpaint=ce=>{const me=ce.changedElements;for(const te of f)me.includes(te.image)&&(te.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{const me=n.RGBA,te=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,me,te,be,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&De){const J=Je(Ae[0]);t.texStorage2D(n.TEXTURE_2D,re,de,J.width,J.height)}for(let J=0,ce=Ae.length;J<ce;J++)le=Ae[J],Re?F&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,oe,ye,le):t.texImage2D(n.TEXTURE_2D,J,de,oe,ye,le);_.generateMipmaps=!1}else if(Re){if(De){const J=Je(Q);t.texStorage2D(n.TEXTURE_2D,re,de,J.width,J.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,ye,Q)}else t.texImage2D(n.TEXTURE_2D,0,de,oe,ye,Q);h(_)&&A($),ae.__version=ie.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Le(y,_,G){if(_.image.length!==6)return;const $=j(y,_),Y=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+G);const ie=i.get(Y);if(Y.version!==ie.__version||$===!0){t.activeTexture(n.TEXTURE0+G);const ae=Ge.getPrimaries(Ge.workingColorSpace),K=_.colorSpace===li?null:Ge.getPrimaries(_.colorSpace),Q=_.colorSpace===li||ae===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,de=[];for(let te=0;te<6;te++)!oe&&!ye?de[te]=g(_.image[te],!0,r.maxCubemapSize):de[te]=ye?_.image[te].image:_.image[te],de[te]=zt(_,de[te]);const le=de[0],Ae=s.convert(_.format,_.colorSpace),Re=s.convert(_.type),De=b(_.internalFormat,Ae,Re,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,re=ie.__version===void 0||$===!0,J=Y.dataReady;let ce=R(_,le);Ye(n.TEXTURE_CUBE_MAP,_);let me;if(oe){F&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,le.width,le.height);for(let te=0;te<6;te++){me=de[te].mipmaps;for(let be=0;be<me.length;be++){const Me=me[be];_.format!==un?Ae!==null?F?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,0,0,Me.width,Me.height,Ae,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,De,Me.width,Me.height,0,Me.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,0,0,Me.width,Me.height,Ae,Re,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,De,Me.width,Me.height,0,Ae,Re,Me.data)}}}else{if(me=_.mipmaps,F&&re){me.length>0&&ce++;const te=Je(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,te.width,te.height)}for(let te=0;te<6;te++)if(ye){F?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,de[te].width,de[te].height,Ae,Re,de[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,De,de[te].width,de[te].height,0,Ae,Re,de[te].data);for(let be=0;be<me.length;be++){const ut=me[be].image[te].image;F?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,0,0,ut.width,ut.height,Ae,Re,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,De,ut.width,ut.height,0,Ae,Re,ut.data)}}else{F?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,Re,de[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,De,Ae,Re,de[te]);for(let be=0;be<me.length;be++){const Me=me[be];F?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,0,0,Ae,Re,Me.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,De,Ae,Re,Me.image[te])}}}h(_)&&A(n.TEXTURE_CUBE_MAP),ie.__version=Y.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function we(y,_,G,$,Y,ie){const ae=s.convert(G.format,G.colorSpace),K=s.convert(G.type),Q=b(G.internalFormat,ae,K,G.normalized,G.colorSpace),oe=i.get(_),ye=i.get(G);if(ye.__renderTarget=_,!oe.__hasExternalTextures){const de=Math.max(1,_.width>>ie),le=Math.max(1,_.height>>ie);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,ie,Q,de,le,_.depth,0,ae,K,null):t.texImage2D(Y,ie,Q,de,le,0,ae,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Y,ye.__webglTexture,0,ct(_)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Y,ye.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(y,_,G){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const $=_.depthTexture,Y=$&&$.isDepthTexture?$.type:null,ie=C(_.stencilBuffer,Y),ae=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(_),ie,_.width,_.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,y)}else{const $=_.textures;for(let Y=0;Y<$.length;Y++){const ie=$[Y],ae=s.convert(ie.format,ie.colorSpace),K=s.convert(ie.type),Q=b(ie.internalFormat,ae,K,ie.normalized,ie.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(_),Q,_.width,_.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(_),Q,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Q,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(y,_,G){const $=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=i.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",L)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),ye=s.convert(_.depthTexture.type);let de;_.depthTexture.format===qn?de=n.DEPTH_COMPONENT24:_.depthTexture.format===Ei&&(de=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,de,_.width,_.height,0,oe,ye,null)}}else ee(_.depthTexture,0);const ie=Y.__webglTexture,ae=ct(_),K=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,Q=_.depthTexture.format===Ei?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===qn)_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,K,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Q,K,ie,0);else if(_.depthTexture.format===Ei)_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,K,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Q,K,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(y){const _=i.get(y),G=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const $=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){const Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",Y)};$.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=$}if(y.depthTexture&&!_.__autoAllocateDepthBuffer)if(G)for(let $=0;$<6;$++)ke(_.__webglFramebuffer[$],y,$);else{const $=y.texture.mipmaps;$&&$.length>0?ke(_.__webglFramebuffer[0],y,0):ke(_.__webglFramebuffer,y,0)}else if(G){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=n.createRenderbuffer(),ft(_.__webglDepthbuffer[$],y,!1);else{const Y=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,ie)}}else{const $=y.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ft(_.__webglDepthbuffer,y,!1);else{const Y=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(y,_,G){const $=i.get(y);_!==void 0&&we($.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&tt(y)}function $e(y){const _=y.texture,G=i.get(y),$=i.get(_);y.addEventListener("dispose",v);const Y=y.textures,ie=y.isWebGLCubeRenderTarget===!0,ae=Y.length>1;if(ae||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=_.version,a.memory.textures++),ie){G.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[K]=[];for(let Q=0;Q<_.mipmaps.length;Q++)G.__webglFramebuffer[K][Q]=n.createFramebuffer()}else G.__webglFramebuffer[K]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)G.__webglFramebuffer[K]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(ae)for(let K=0,Q=Y.length;K<Q;K++){const oe=i.get(Y[K]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&_t(y)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const Q=Y[K];G.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[K]);const oe=s.convert(Q.format,Q.colorSpace),ye=s.convert(Q.type),de=b(Q.internalFormat,oe,ye,Q.normalized,Q.colorSpace,y.isXRRenderTarget===!0),le=ct(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,de,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,G.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(G.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)we(G.__webglFramebuffer[K][Q],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else we(G.__webglFramebuffer[K],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);h(_)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let K=0,Q=Y.length;K<Q;K++){const oe=Y[K],ye=i.get(oe);let de=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(de=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,ye.__webglTexture),Ye(de,oe),we(G.__webglFramebuffer,y,oe,n.COLOR_ATTACHMENT0+K,de,0),h(oe)&&A(de)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(K=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(K,$.__webglTexture),Ye(K,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)we(G.__webglFramebuffer[Q],y,_,n.COLOR_ATTACHMENT0,K,Q);else we(G.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,K,0);h(_)&&A(K),t.unbindTexture()}y.depthBuffer&&tt(y)}function gt(y){const _=y.textures;for(let G=0,$=_.length;G<$;G++){const Y=_[G];if(h(Y)){const ie=D(y),ae=i.get(Y).__webglTexture;t.bindTexture(ie,ae),A(ie),t.unbindTexture()}}}const xt=[],Et=[];function Rt(y){if(y.samples>0){if(_t(y)===!1){const _=y.textures,G=y.width,$=y.height;let Y=n.COLOR_BUFFER_BIT;const ie=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(y),K=_.length>1;if(K)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const Q=y.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,G,$,0,0,G,$,Y,n.NEAREST),l===!0&&(xt.length=0,Et.length=0,xt.push(n.COLOR_ATTACHMENT0+oe),y.depthBuffer&&y.resolveDepthBuffer===!1&&(xt.push(ie),Et.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Et)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ct(y){return Math.min(r.maxSamples,y.samples)}function _t(y){const _=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(y){const _=a.render.frame;u.get(y)!==_&&(u.set(y,_),y.update())}function zt(y,_){const G=y.colorSpace,$=y.format,Y=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||G!==Is&&G!==li&&(Ge.getTransfer(G)===Qe?($!==un||Y!==Kt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",G)),_}function Je(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=I,this.getTextureUnits=S,this.setTextureUnits=P,this.setTexture2D=ee,this.setTexture2DArray=Z,this.setTexture3D=ue,this.setTextureCube=ge,this.rebindTextures=Ke,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function wg(n,e){function t(i,r=li){let s;const a=Ge.getTransfer(r);if(i===Kt)return n.UNSIGNED_BYTE;if(i===Xo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===qo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===iu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ru)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===tu)return n.BYTE;if(i===nu)return n.SHORT;if(i===Ur)return n.UNSIGNED_SHORT;if(i===$o)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===cn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===su)return n.ALPHA;if(i===au)return n.RGB;if(i===un)return n.RGBA;if(i===qn)return n.DEPTH_COMPONENT;if(i===Ei)return n.DEPTH_STENCIL;if(i===Yo)return n.RED;if(i===Ko)return n.RED_INTEGER;if(i===Ri)return n.RG;if(i===Zo)return n.RG_INTEGER;if(i===Jo)return n.RGBA_INTEGER;if(i===xs||i===Ms||i===Ss||i===bs)if(a===Qe)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ms)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ss)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ja||i===Qa||i===ja||i===eo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ja)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===eo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===to||i===no||i===io||i===ro||i===so||i===Cs||i===ao)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===to||i===no)return a===Qe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===io)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ro)return s.COMPRESSED_R11_EAC;if(i===so)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Cs)return s.COMPRESSED_RG11_EAC;if(i===ao)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===oo||i===lo||i===co||i===uo||i===fo||i===ho||i===po||i===mo||i===go||i===_o||i===vo||i===xo||i===Mo||i===So)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===oo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===co)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===uo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ho)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===po)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===go)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_o)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mo)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===So)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bo||i===yo||i===Eo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===bo)return a===Qe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Eo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===To||i===Ao||i===Ps||i===wo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===To)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ao)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ps)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Nr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cg=`
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

}`;class Pg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new mu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new In({vertexShader:Rg,fragmentShader:Cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wt(new mr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ig extends Ii{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,m=null;const x=typeof XRWebGLBinding<"u",g=new Pg,h={},A=t.getContextAttributes();let D=null,b=null;const C=[],R=[],L=new ze;let v=null;const w=new on;w.viewport=new ot;const O=new on;O.viewport=new ot;const U=[w,O],T=new zf;let I=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let se=C[j];return se===void 0&&(se=new ra,C[j]=se),se.getTargetRaySpace()},this.getControllerGrip=function(j){let se=C[j];return se===void 0&&(se=new ra,C[j]=se),se.getGripSpace()},this.getHand=function(j){let se=C[j];return se===void 0&&(se=new ra,C[j]=se),se.getHandSpace()};function P(j){const se=R.indexOf(j.inputSource);if(se===-1)return;const ne=C[se];ne!==void 0&&(ne.update(j.inputSource,j.frame,c||a),ne.dispatchEvent({type:j.type,data:j.inputSource}))}function X(){r.removeEventListener("select",P),r.removeEventListener("selectstart",P),r.removeEventListener("selectend",P),r.removeEventListener("squeeze",P),r.removeEventListener("squeezestart",P),r.removeEventListener("squeezeend",P),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",B);for(let j=0;j<C.length;j++){const se=R[j];se!==null&&(R[j]=null,C[j].disconnect(se))}I=null,S=null,g.reset();for(const j in h)delete h[j];e.setRenderTarget(D),p=null,d=null,f=null,r=null,b=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(D=e.getRenderTarget(),r.addEventListener("select",P),r.addEventListener("selectstart",P),r.addEventListener("selectend",P),r.addEventListener("squeeze",P),r.addEventListener("squeezestart",P),r.addEventListener("squeezeend",P),r.addEventListener("end",X),r.addEventListener("inputsourceschange",B),A.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(L),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,Pe=null,Le=null;A.depth&&(Le=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=A.stencil?Ei:qn,Pe=A.stencil?Nr:Pn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(we),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Cn(d.textureWidth,d.textureHeight,{format:un,type:Kt,depthTexture:new ur(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ne={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Cn(p.framebufferWidth,p.framebufferHeight,{format:un,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function B(j){for(let se=0;se<j.removed.length;se++){const ne=j.removed[se],Pe=R.indexOf(ne);Pe>=0&&(R[Pe]=null,C[Pe].disconnect(ne))}for(let se=0;se<j.added.length;se++){const ne=j.added[se];let Pe=R.indexOf(ne);if(Pe===-1){for(let we=0;we<C.length;we++)if(we>=R.length){R.push(ne),Pe=we;break}else if(R[we]===null){R[we]=ne,Pe=we;break}if(Pe===-1)break}const Le=C[Pe];Le&&Le.connect(ne)}}const ee=new H,Z=new H;function ue(j,se,ne){ee.setFromMatrixPosition(se.matrixWorld),Z.setFromMatrixPosition(ne.matrixWorld);const Pe=ee.distanceTo(Z),Le=se.projectionMatrix.elements,we=ne.projectionMatrix.elements,ft=Le[14]/(Le[10]-1),ke=Le[14]/(Le[10]+1),tt=(Le[9]+1)/Le[5],Ke=(Le[9]-1)/Le[5],$e=(Le[8]-1)/Le[0],gt=(we[8]+1)/we[0],xt=ft*$e,Et=ft*gt,Rt=Pe/(-$e+gt),ct=Rt*-$e;if(se.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ct),j.translateZ(Rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Le[10]===-1)j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const _t=ft+Rt,k=ke+Rt,zt=xt-ct,Je=Et+(Pe-ct),y=tt*ke/k*_t,_=Ke*ke/k*_t;j.projectionMatrix.makePerspective(zt,Je,y,_,_t,k),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ge(j,se){se===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(se.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let se=j.near,ne=j.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(ne=g.depthFar)),T.near=O.near=w.near=se,T.far=O.far=w.far=ne,(I!==T.near||S!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),I=T.near,S=T.far),T.layers.mask=j.layers.mask|6,w.layers.mask=T.layers.mask&-5,O.layers.mask=T.layers.mask&-3;const Pe=j.parent,Le=T.cameras;ge(T,Pe);for(let we=0;we<Le.length;we++)ge(Le[we],Pe);Le.length===2?ue(T,w,O):T.projectionMatrix.copy(w.projectionMatrix),xe(j,T,Pe)};function xe(j,se,ne){ne===null?j.matrix.copy(se.matrixWorld):(j.matrix.copy(ne.matrixWorld),j.matrix.invert(),j.matrix.multiply(se.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Co*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(T)},this.getCameraTexture=function(j){return h[j]};let qe=null;function lt(j,se){if(u=se.getViewerPose(c||a),m=se,u!==null){const ne=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Pe=!1;ne.length!==T.cameras.length&&(T.cameras.length=0,Pe=!0);for(let ke=0;ke<ne.length;ke++){const tt=ne[ke];let Ke=null;if(p!==null)Ke=p.getViewport(tt);else{const gt=f.getViewSubImage(d,tt);Ke=gt.viewport,ke===0&&(e.setRenderTargetTextures(b,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(b))}let $e=U[ke];$e===void 0&&($e=new on,$e.layers.enable(ke),$e.viewport=new ot,U[ke]=$e),$e.matrix.fromArray(tt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(tt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(T.matrix.copy($e.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),Pe===!0&&T.cameras.push($e)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const ke=f.getDepthInformation(ne[0]);ke&&ke.isValid&&ke.texture&&g.init(ke,r.renderState)}if(Le&&Le.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let ke=0;ke<ne.length;ke++){const tt=ne[ke].camera;if(tt){let Ke=h[tt];Ke||(Ke=new mu,h[tt]=Ke);const $e=f.getCameraImage(tt);Ke.sourceTexture=$e}}}}for(let ne=0;ne<C.length;ne++){const Pe=R[ne],Le=C[ne];Pe!==null&&Le!==void 0&&Le.update(Pe,se,c||a)}qe&&qe(j,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),m=null}const Ye=new Mu;Ye.setAnimationLoop(lt),this.setAnimationLoop=function(j){qe=j},this.dispose=function(){}}}const Lg=new rt,wu=new Ie;wu.set(-1,0,0,0,1,0,0,0,1);function Dg(n,e){function t(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,gu(n)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,A,D,b){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),f(g,h)):h.isMeshPhongMaterial?(s(g,h),u(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),d(g,h),h.isMeshPhysicalMaterial&&p(g,h,b)):h.isMeshMatcapMaterial?(s(g,h),m(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),x(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(a(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,A,D):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,t(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Wt&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,t(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Wt&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,t(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,t(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const A=e.get(h),D=A.envMap,b=A.envMapRotation;D&&(g.envMap.value=D,g.envMapRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(b)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(wu),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,g.aoMapTransform))}function a(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,A,D){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*A,g.scale.value=D*.5,h.map&&(g.map.value=h.map,t(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function d(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,A){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Wt&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function x(g,h){const A=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ug(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,C){const R=C.program;i.uniformBlockBinding(b,R)}function c(b,C){let R=r[b.id];R===void 0&&(g(b),R=u(b),r[b.id]=R,b.addEventListener("dispose",A));const L=C.program;i.updateUBOMapping(b,L);const v=e.render.frame;s[b.id]!==v&&(d(b),s[b.id]=v)}function u(b){const C=f();b.__bindingPointIndex=C;const R=n.createBuffer(),L=b.__size,v=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,L,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,C,R),R}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const C=r[b.id],R=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,C);for(let v=0,w=R.length;v<w;v++){const O=R[v];if(Array.isArray(O))for(let U=0,T=O.length;U<T;U++)p(O[U],v,U,L);else p(O,v,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,C,R,L){if(x(b,C,R,L)===!0){const v=b.__offset,w=b.value;if(Array.isArray(w)){let O=0;for(let U=0;U<w.length;U++){const T=w[U],I=h(T);m(T,b.__data,O),typeof T!="number"&&typeof T!="boolean"&&!T.isMatrix3&&!ArrayBuffer.isView(T)&&(O+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,b.__data)}}function m(b,C,R){typeof b=="number"||typeof b=="boolean"?C[0]=b:b.isMatrix3?(C[0]=b.elements[0],C[1]=b.elements[1],C[2]=b.elements[2],C[3]=0,C[4]=b.elements[3],C[5]=b.elements[4],C[6]=b.elements[5],C[7]=0,C[8]=b.elements[6],C[9]=b.elements[7],C[10]=b.elements[8],C[11]=0):ArrayBuffer.isView(b)?C.set(new b.constructor(b.buffer,b.byteOffset,C.length)):b.toArray(C,R)}function x(b,C,R,L){const v=b.value,w=C+"_"+R;if(L[w]===void 0)return typeof v=="number"||typeof v=="boolean"?L[w]=v:ArrayBuffer.isView(v)?L[w]=v.slice():L[w]=v.clone(),!0;{const O=L[w];if(typeof v=="number"||typeof v=="boolean"){if(O!==v)return L[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(O.equals(v)===!1)return O.copy(v),!0}}return!1}function g(b){const C=b.uniforms;let R=0;const L=16;for(let w=0,O=C.length;w<O;w++){const U=Array.isArray(C[w])?C[w]:[C[w]];for(let T=0,I=U.length;T<I;T++){const S=U[T],P=Array.isArray(S.value)?S.value:[S.value];for(let X=0,B=P.length;X<B;X++){const ee=P[X],Z=h(ee),ue=R%L,ge=ue%Z.boundary,xe=ue+ge;R+=ge,xe!==0&&L-xe<Z.storage&&(R+=L-xe),S.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=R,R+=Z.storage}}}const v=R%L;return v>0&&(R+=L-v),b.__size=R,b.__cache={},this}function h(b){const C={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(C.boundary=4,C.storage=4):b.isVector2?(C.boundary=8,C.storage=8):b.isVector3||b.isColor?(C.boundary=16,C.storage=12):b.isVector4?(C.boundary=16,C.storage=16):b.isMatrix3?(C.boundary=48,C.storage=48):b.isMatrix4?(C.boundary=64,C.storage=64):b.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(C.boundary=16,C.storage=b.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",b),C}function A(b){const C=b.target;C.removeEventListener("dispose",A);const R=a.indexOf(C.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function D(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:D}}const Ng=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let xn=null;function Fg(){return xn===null&&(xn=new nl(Ng,16,16,Ri,Xn),xn.name="DFG_LUT",xn.minFilter=Ut,xn.magFilter=Ut,xn.wrapS=Hn,xn.wrapT=Hn,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}class Og{constructor(e={}){const{canvas:t=jd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Kt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const x=p,g=new Set([Jo,Zo,Ko]),h=new Set([Kt,Pn,Ur,Nr,Xo,qo]),A=new Uint32Array(4),D=new Int32Array(4),b=new H;let C=null,R=null;const L=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let U=!1,T=null,I=null,S=null,P=null;this._outputColorSpace=Ht;let X=0,B=0,ee=null,Z=-1,ue=null;const ge=new ot,xe=new ot;let qe=null;const lt=new We(0);let Ye=0,j=t.width,se=t.height,ne=1,Pe=null,Le=null;const we=new ot(0,0,j,se),ft=new ot(0,0,j,se);let ke=!1;const tt=new il;let Ke=!1,$e=!1;const gt=new rt,xt=new H,Et=new ot,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function _t(){return ee===null?ne:1}let k=i;function zt(M,z){return t.getContext(M,z)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vo}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",mn,!1),k===null){const z="webgl2";if(k=zt(z,M),k===null)throw zt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Ve("WebGLRenderer: "+M.message),M}let Je,y,_,G,$,Y,ie,ae,K,Q,oe,ye,de,le,Ae,Re,De,F,re,J,ce,me,te;function be(){Je=new Fm(k),Je.init(),ce=new wg(k,Je),y=new Rm(k,Je,e,ce),_=new Tg(k,Je),y.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),I=k.createFramebuffer(),S=k.createFramebuffer(),P=k.createFramebuffer(),G=new km(k),$=new dg,Y=new Ag(k,Je,_,$,y,ce,G),ie=new Nm(O),ae=new Vf(k),me=new Am(k,ae),K=new Om(k,ae,G,me),Q=new Gm(k,K,ae,me,G),F=new zm(k,y,Y),Ae=new Cm($),oe=new ug(O,ie,Je,y,me,Ae),ye=new Dg(O,$),de=new hg,le=new xg(Je),De=new Tm(O,ie,_,Q,m,l),Re=new Eg(O,Q,y),te=new Ug(k,G,y,_),re=new wm(k,Je,G),J=new Bm(k,Je,G),G.programs=oe.programs,O.capabilities=y,O.extensions=Je,O.properties=$,O.renderLists=de,O.shadowMap=Re,O.state=_,O.info=G}be(),x!==Kt&&(w=new Vm(x,t.width,t.height,o,r,s));const Me=new Ig(O,k);this.xr=Me,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const M=Je.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Je.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(j,se,!1))},this.getSize=function(M){return M.set(j,se)},this.setSize=function(M,z,q=!0){if(Me.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}j=M,se=z,t.width=Math.floor(M*ne),t.height=Math.floor(z*ne),q===!0&&(t.style.width=M+"px",t.style.height=z+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,M,z)},this.getDrawingBufferSize=function(M){return M.set(j*ne,se*ne).floor()},this.setDrawingBufferSize=function(M,z,q){j=M,se=z,ne=q,t.width=Math.floor(M*q),t.height=Math.floor(z*q),this.setViewport(0,0,M,z)},this.setEffects=function(M){if(x===Kt){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let z=0;z<M.length;z++)if(M[z].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ge)},this.getViewport=function(M){return M.copy(we)},this.setViewport=function(M,z,q,V){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,z,q,V),_.viewport(ge.copy(we).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(ft)},this.setScissor=function(M,z,q,V){M.isVector4?ft.set(M.x,M.y,M.z,M.w):ft.set(M,z,q,V),_.scissor(xe.copy(ft).multiplyScalar(ne).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(M){_.setScissorTest(ke=M)},this.setOpaqueSort=function(M){Pe=M},this.setTransparentSort=function(M){Le=M},this.getClearColor=function(M){return M.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(M=!0,z=!0,q=!0){let V=0;if(M){let W=!1;if(ee!==null){const pe=ee.texture.format;W=g.has(pe)}if(W){const pe=ee.texture.type,ve=h.has(pe),he=De.getClearColor(),Se=De.getClearAlpha(),Ee=he.r,Ue=he.g,Oe=he.b;ve?(A[0]=Ee,A[1]=Ue,A[2]=Oe,A[3]=Se,k.clearBufferuiv(k.COLOR,0,A)):(D[0]=Ee,D[1]=Ue,D[2]=Oe,D[3]=Se,k.clearBufferiv(k.COLOR,0,D))}else V|=k.COLOR_BUFFER_BIT}z&&(V|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&k.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),T=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",mn,!1),De.dispose(),de.dispose(),le.dispose(),$.dispose(),ie.dispose(),Q.dispose(),me.dispose(),te.dispose(),oe.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",ll),Me.removeEventListener("sessionend",cl),pi.stop()};function ut(M){M.preventDefault(),Pl("WebGLRenderer: Context Lost."),U=!0}function st(){Pl("WebGLRenderer: Context Restored."),U=!1;const M=G.autoReset,z=Re.enabled,q=Re.autoUpdate,V=Re.needsUpdate,W=Re.type;be(),G.autoReset=M,Re.enabled=z,Re.autoUpdate=q,Re.needsUpdate=V,Re.type=W}function mn(M){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function gn(M){const z=M.target;z.removeEventListener("dispose",gn),Pu(z)}function Pu(M){Iu(M),$.remove(M)}function Iu(M){const z=$.get(M).programs;z!==void 0&&(z.forEach(function(q){oe.releaseProgram(q)}),M.isShaderMaterial&&oe.releaseShaderCache(M))}this.renderBufferDirect=function(M,z,q,V,W,pe){z===null&&(z=Rt);const ve=W.isMesh&&W.matrixWorld.determinantAffine()<0,he=Uu(M,z,q,V,W);_.setMaterial(V,ve);let Se=q.index,Ee=1;if(V.wireframe===!0){if(Se=K.getWireframeAttribute(q),Se===void 0)return;Ee=2}const Ue=q.drawRange,Oe=q.attributes.position;let Te=Ue.start*Ee,je=(Ue.start+Ue.count)*Ee;pe!==null&&(Te=Math.max(Te,pe.start*Ee),je=Math.min(je,(pe.start+pe.count)*Ee)),Se!==null?(Te=Math.max(Te,0),je=Math.min(je,Se.count)):Oe!=null&&(Te=Math.max(Te,0),je=Math.min(je,Oe.count));const ht=je-Te;if(ht<0||ht===1/0)return;me.setup(W,V,he,q,Se);let dt,nt=re;if(Se!==null&&(dt=ae.get(Se),nt=J,nt.setIndex(dt)),W.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*_t()),nt.setMode(k.LINES)):nt.setMode(k.TRIANGLES);else if(W.isLine){let It=V.linewidth;It===void 0&&(It=1),_.setLineWidth(It*_t()),W.isLineSegments?nt.setMode(k.LINES):W.isLineLoop?nt.setMode(k.LINE_LOOP):nt.setMode(k.LINE_STRIP)}else W.isPoints?nt.setMode(k.POINTS):W.isSprite&&nt.setMode(k.TRIANGLES);if(W.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))nt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const It=W._multiDrawStarts,_e=W._multiDrawCounts,$t=W._multiDrawCount,Xe=Se?ae.get(Se).bytesPerElement:1,Jt=$.get(V).currentProgram.getUniforms();for(let _n=0;_n<$t;_n++)Jt.setValue(k,"_gl_DrawID",_n),nt.render(It[_n]/Xe,_e[_n])}else if(W.isInstancedMesh)nt.renderInstances(Te,ht,W.count);else if(q.isInstancedBufferGeometry){const It=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,_e=Math.min(q.instanceCount,It);nt.renderInstances(Te,ht,_e)}else nt.render(Te,ht)};function ol(M,z,q){M.transparent===!0&&M.side===kn&&M.forceSinglePass===!1?(M.side=Wt,M.needsUpdate=!0,Wr(M,z,q),M.side=fi,M.needsUpdate=!0,Wr(M,z,q),M.side=kn):Wr(M,z,q)}this.compile=function(M,z,q=null){q===null&&(q=M),R=le.get(q),R.init(z),v.push(R),q.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(R.pushLight(W),W.castShadow&&R.pushShadow(W))}),M!==q&&M.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(R.pushLight(W),W.castShadow&&R.pushShadow(W))}),R.setupLights();const V=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const pe=W.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const he=pe[ve];ol(he,q,W),V.add(he)}else ol(pe,q,W),V.add(pe)}),R=v.pop(),V},this.compileAsync=function(M,z,q=null){const V=this.compile(M,z,q);return new Promise(W=>{function pe(){if(V.forEach(function(ve){$.get(ve).currentProgram.isReady()&&V.delete(ve)}),V.size===0){W(M);return}setTimeout(pe,10)}Je.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let $s=null;function Lu(M){$s&&$s(M)}function ll(){pi.stop()}function cl(){pi.start()}const pi=new Mu;pi.setAnimationLoop(Lu),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(M){$s=M,Me.setAnimationLoop(M),M===null?pi.stop():pi.start()},Me.addEventListener("sessionstart",ll),Me.addEventListener("sessionend",cl),this.render=function(M,z){if(z!==void 0&&z.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;T!==null&&T.renderStart(M,z);const q=Me.enabled===!0&&Me.isPresenting===!0,V=w!==null&&(ee===null||q)&&w.begin(O,ee);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(z),z=Me.getCamera()),M.isScene===!0&&M.onBeforeRender(O,M,z,ee),R=le.get(M,v.length),R.init(z),R.state.textureUnits=Y.getTextureUnits(),v.push(R),gt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),tt.setFromProjectionMatrix(gt,wn,z.reversedDepth),$e=this.localClippingEnabled,Ke=Ae.init(this.clippingPlanes,$e),C=de.get(M,L.length),C.init(),L.push(C),Me.enabled===!0&&Me.isPresenting===!0){const ve=O.xr.getDepthSensingMesh();ve!==null&&Xs(ve,z,-1/0,O.sortObjects)}Xs(M,z,0,O.sortObjects),C.finish(),O.sortObjects===!0&&C.sort(Pe,Le,z.reversedDepth),ct=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,ct&&De.addToRenderList(C,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ae.beginShadows();const W=R.state.shadowsArray;if(Re.render(W,M,z),Ke===!0&&Ae.endShadows(),(V&&w.hasRenderPass())===!1){const ve=C.opaque,he=C.transmissive;if(R.setupLights(),z.isArrayCamera){const Se=z.cameras;if(he.length>0)for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Oe=Se[Ee];dl(ve,he,M,Oe)}ct&&De.render(M);for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Oe=Se[Ee];ul(C,M,Oe,Oe.viewport)}}else he.length>0&&dl(ve,he,M,z),ct&&De.render(M),ul(C,M,z)}ee!==null&&B===0&&(Y.updateMultisampleRenderTarget(ee),Y.updateRenderTargetMipmap(ee)),V&&w.end(O),M.isScene===!0&&M.onAfterRender(O,M,z),me.resetDefaultState(),Z=-1,ue=null,v.pop(),v.length>0?(R=v[v.length-1],Y.setTextureUnits(R.state.textureUnits),Ke===!0&&Ae.setGlobalState(O.clippingPlanes,R.state.camera)):R=null,L.pop(),L.length>0?C=L[L.length-1]:C=null,T!==null&&T.renderEnd()};function Xs(M,z,q,V){if(M.visible===!1)return;if(M.layers.test(z.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(z);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||tt.intersectsSprite(M)){V&&Et.setFromMatrixPosition(M.matrixWorld).applyMatrix4(gt);const ve=Q.update(M),he=M.material;he.visible&&C.push(M,ve,he,q,Et.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||tt.intersectsObject(M))){const ve=Q.update(M),he=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Et.copy(M.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Et.copy(ve.boundingSphere.center)),Et.applyMatrix4(M.matrixWorld).applyMatrix4(gt)),Array.isArray(he)){const Se=ve.groups;for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Oe=Se[Ee],Te=he[Oe.materialIndex];Te&&Te.visible&&C.push(M,ve,Te,q,Et.z,Oe)}}else he.visible&&C.push(M,ve,he,q,Et.z,null)}}const pe=M.children;for(let ve=0,he=pe.length;ve<he;ve++)Xs(pe[ve],z,q,V)}function ul(M,z,q,V){const{opaque:W,transmissive:pe,transparent:ve}=M;R.setupLightsView(q),Ke===!0&&Ae.setGlobalState(O.clippingPlanes,q),V&&_.viewport(ge.copy(V)),W.length>0&&Vr(W,z,q),pe.length>0&&Vr(pe,z,q),ve.length>0&&Vr(ve,z,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function dl(M,z,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[V.id]===void 0){const Te=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[V.id]=new Cn(1,1,{generateMipmaps:!0,type:Te?Xn:Kt,minFilter:yi,samples:Math.max(4,y.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const pe=R.state.transmissionRenderTarget[V.id],ve=V.viewport||ge;pe.setSize(ve.z*O.transmissionResolutionScale,ve.w*O.transmissionResolutionScale);const he=O.getRenderTarget(),Se=O.getActiveCubeFace(),Ee=O.getActiveMipmapLevel();O.setRenderTarget(pe),O.getClearColor(lt),Ye=O.getClearAlpha(),Ye<1&&O.setClearColor(16777215,.5),O.clear(),ct&&De.render(q);const Ue=O.toneMapping;O.toneMapping=Rn;const Oe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),R.setupLightsView(V),Ke===!0&&Ae.setGlobalState(O.clippingPlanes,V),Vr(M,q,V),Y.updateMultisampleRenderTarget(pe),Y.updateRenderTargetMipmap(pe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let je=0,ht=z.length;je<ht;je++){const dt=z[je],{object:nt,geometry:It,material:_e,group:$t}=dt;if(_e.side===kn&&nt.layers.test(V.layers)){const Xe=_e.side;_e.side=Wt,_e.needsUpdate=!0,fl(nt,q,V,It,_e,$t),_e.side=Xe,_e.needsUpdate=!0,Te=!0}}Te===!0&&(Y.updateMultisampleRenderTarget(pe),Y.updateRenderTargetMipmap(pe))}O.setRenderTarget(he,Se,Ee),O.setClearColor(lt,Ye),Oe!==void 0&&(V.viewport=Oe),O.toneMapping=Ue}function Vr(M,z,q){const V=z.isScene===!0?z.overrideMaterial:null;for(let W=0,pe=M.length;W<pe;W++){const ve=M[W],{object:he,geometry:Se,group:Ee}=ve;let Ue=ve.material;Ue.allowOverride===!0&&V!==null&&(Ue=V),he.layers.test(q.layers)&&fl(he,z,q,Se,Ue,Ee)}}function fl(M,z,q,V,W,pe){M.onBeforeRender(O,z,q,V,W,pe),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(O,z,q,V,M,pe),W.transparent===!0&&W.side===kn&&W.forceSinglePass===!1?(W.side=Wt,W.needsUpdate=!0,O.renderBufferDirect(q,z,V,W,M,pe),W.side=fi,W.needsUpdate=!0,O.renderBufferDirect(q,z,V,W,M,pe),W.side=kn):O.renderBufferDirect(q,z,V,W,M,pe),M.onAfterRender(O,z,q,V,W,pe)}function Wr(M,z,q){z.isScene!==!0&&(z=Rt);const V=$.get(M),W=R.state.lights,pe=R.state.shadowsArray,ve=W.state.version,he=oe.getParameters(M,W.state,pe,z,q,R.state.lightProbeGridArray),Se=oe.getProgramCacheKey(he);let Ee=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?z.environment:null,V.fog=z.fog;const Ue=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=ie.get(M.envMap||V.environment,Ue),V.envMapRotation=V.environment!==null&&M.envMap===null?z.environmentRotation:M.envMapRotation,Ee===void 0&&(M.addEventListener("dispose",gn),Ee=new Map,V.programs=Ee);let Oe=Ee.get(Se);if(Oe!==void 0){if(V.currentProgram===Oe&&V.lightsStateVersion===ve)return pl(M,he),Oe}else he.uniforms=oe.getUniforms(M),T!==null&&M.isNodeMaterial&&T.build(M,q,he),M.onBeforeCompile(he,O),Oe=oe.acquireProgram(he,Se),Ee.set(Se,Oe),V.uniforms=he.uniforms;const Te=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),pl(M,he),V.needsLights=Fu(M),V.lightsStateVersion=ve,V.needsLights&&(Te.ambientLightColor.value=W.state.ambient,Te.lightProbe.value=W.state.probe,Te.directionalLights.value=W.state.directional,Te.directionalLightShadows.value=W.state.directionalShadow,Te.spotLights.value=W.state.spot,Te.spotLightShadows.value=W.state.spotShadow,Te.rectAreaLights.value=W.state.rectArea,Te.ltc_1.value=W.state.rectAreaLTC1,Te.ltc_2.value=W.state.rectAreaLTC2,Te.pointLights.value=W.state.point,Te.pointLightShadows.value=W.state.pointShadow,Te.hemisphereLights.value=W.state.hemi,Te.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Te.spotLightMatrix.value=W.state.spotLightMatrix,Te.spotLightMap.value=W.state.spotLightMap,Te.pointShadowMatrix.value=W.state.pointShadowMatrix),V.lightProbeGrid=R.state.lightProbeGridArray.length>0,V.currentProgram=Oe,V.uniformsList=null,Oe}function hl(M){if(M.uniformsList===null){const z=M.currentProgram.getUniforms();M.uniformsList=ys.seqWithValue(z.seq,M.uniforms)}return M.uniformsList}function pl(M,z){const q=$.get(M);q.outputColorSpace=z.outputColorSpace,q.batching=z.batching,q.batchingColor=z.batchingColor,q.instancing=z.instancing,q.instancingColor=z.instancingColor,q.instancingMorph=z.instancingMorph,q.skinning=z.skinning,q.morphTargets=z.morphTargets,q.morphNormals=z.morphNormals,q.morphColors=z.morphColors,q.morphTargetsCount=z.morphTargetsCount,q.numClippingPlanes=z.numClippingPlanes,q.numIntersection=z.numClipIntersection,q.vertexAlphas=z.vertexAlphas,q.vertexTangents=z.vertexTangents,q.toneMapping=z.toneMapping}function Du(M,z){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(z.matrixWorld);for(let q=0,V=M.length;q<V;q++){const W=M[q];if(W.texture!==null&&W.boundingBox.containsPoint(b))return W}return null}function Uu(M,z,q,V,W){z.isScene!==!0&&(z=Rt),Y.resetTextureUnits();const pe=z.fog,ve=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?z.environment:null,he=ee===null?O.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ge.workingColorSpace,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ee=ie.get(V.envMap||ve,Se),Ue=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Oe=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!q.morphAttributes.position,je=!!q.morphAttributes.normal,ht=!!q.morphAttributes.color;let dt=Rn;V.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(dt=O.toneMapping);const nt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,It=nt!==void 0?nt.length:0,_e=$.get(V),$t=R.state.lights;if(Ke===!0&&($e===!0||M!==ue)){const at=M===ue&&V.id===Z;Ae.setState(V,M,at)}let Xe=!1;V.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==$t.state.version||_e.outputColorSpace!==he||W.isBatchedMesh&&_e.batching===!1||!W.isBatchedMesh&&_e.batching===!0||W.isBatchedMesh&&_e.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&_e.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&_e.instancing===!1||!W.isInstancedMesh&&_e.instancing===!0||W.isSkinnedMesh&&_e.skinning===!1||!W.isSkinnedMesh&&_e.skinning===!0||W.isInstancedMesh&&_e.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&_e.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&_e.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&_e.instancingMorph===!1&&W.morphTexture!==null||_e.envMap!==Ee||V.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==Ue||_e.vertexTangents!==Oe||_e.morphTargets!==Te||_e.morphNormals!==je||_e.morphColors!==ht||_e.toneMapping!==dt||_e.morphTargetsCount!==It||!!_e.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,_e.__version=V.version);let Jt=_e.currentProgram;Xe===!0&&(Jt=Wr(V,z,W),T&&V.isNodeMaterial&&T.onUpdateProgram(V,Jt,_e));let _n=!1,Zn=!1,Di=!1;const it=Jt.getUniforms(),pt=_e.uniforms;if(_.useProgram(Jt.program)&&(_n=!0,Zn=!0,Di=!0),V.id!==Z&&(Z=V.id,Zn=!0),_e.needsLights){const at=Du(R.state.lightProbeGridArray,W);_e.lightProbeGrid!==at&&(_e.lightProbeGrid=at,Zn=!0)}if(_n||ue!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),it.setValue(k,"projectionMatrix",M.projectionMatrix),it.setValue(k,"viewMatrix",M.matrixWorldInverse);const Qn=it.map.cameraPosition;Qn!==void 0&&Qn.setValue(k,xt.setFromMatrixPosition(M.matrixWorld)),y.logarithmicDepthBuffer&&it.setValue(k,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&it.setValue(k,"isOrthographic",M.isOrthographicCamera===!0),ue!==M&&(ue=M,Zn=!0,Di=!0)}if(_e.needsLights&&($t.state.directionalShadowMap.length>0&&it.setValue(k,"directionalShadowMap",$t.state.directionalShadowMap,Y),$t.state.spotShadowMap.length>0&&it.setValue(k,"spotShadowMap",$t.state.spotShadowMap,Y),$t.state.pointShadowMap.length>0&&it.setValue(k,"pointShadowMap",$t.state.pointShadowMap,Y)),W.isSkinnedMesh){it.setOptional(k,W,"bindMatrix"),it.setOptional(k,W,"bindMatrixInverse");const at=W.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(k,"boneTexture",at.boneTexture,Y))}W.isBatchedMesh&&(it.setOptional(k,W,"batchingTexture"),it.setValue(k,"batchingTexture",W._matricesTexture,Y),it.setOptional(k,W,"batchingIdTexture"),it.setValue(k,"batchingIdTexture",W._indirectTexture,Y),it.setOptional(k,W,"batchingColorTexture"),W._colorsTexture!==null&&it.setValue(k,"batchingColorTexture",W._colorsTexture,Y));const Jn=q.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&F.update(W,q,Jt),(Zn||_e.receiveShadow!==W.receiveShadow)&&(_e.receiveShadow=W.receiveShadow,it.setValue(k,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&z.environment!==null&&(pt.envMapIntensity.value=z.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=Fg()),Zn){if(it.setValue(k,"toneMappingExposure",O.toneMappingExposure),_e.needsLights&&Nu(pt,Di),pe&&V.fog===!0&&ye.refreshFogUniforms(pt,pe),ye.refreshMaterialUniforms(pt,V,ne,se,R.state.transmissionRenderTarget[M.id]),_e.needsLights&&_e.lightProbeGrid){const at=_e.lightProbeGrid;pt.probesSH.value=at.texture,pt.probesMin.value.copy(at.boundingBox.min),pt.probesMax.value.copy(at.boundingBox.max),pt.probesResolution.value.copy(at.resolution)}ys.upload(k,hl(_e),pt,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ys.upload(k,hl(_e),pt,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&it.setValue(k,"center",W.center),it.setValue(k,"modelViewMatrix",W.modelViewMatrix),it.setValue(k,"normalMatrix",W.normalMatrix),it.setValue(k,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){const at=V.uniformsGroups;for(let Qn=0,Ui=at.length;Qn<Ui;Qn++){const ml=at[Qn];te.update(ml,Jt),te.bind(ml,Jt)}}return Jt}function Nu(M,z){M.ambientLightColor.needsUpdate=z,M.lightProbe.needsUpdate=z,M.directionalLights.needsUpdate=z,M.directionalLightShadows.needsUpdate=z,M.pointLights.needsUpdate=z,M.pointLightShadows.needsUpdate=z,M.spotLights.needsUpdate=z,M.spotLightShadows.needsUpdate=z,M.rectAreaLights.needsUpdate=z,M.hemisphereLights.needsUpdate=z}function Fu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(M,z,q){const V=$.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),$.get(M.texture).__webglTexture=z,$.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,z){const q=$.get(M);q.__webglFramebuffer=z,q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(M,z=0,q=0){ee=M,X=z,B=q;let V=null,W=!1,pe=!1;if(M){const he=$.get(M);if(he.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,he.__webglFramebuffer),ge.copy(M.viewport),xe.copy(M.scissor),qe=M.scissorTest,_.viewport(ge),_.scissor(xe),_.setScissorTest(qe),Z=-1;return}else if(he.__webglFramebuffer===void 0)Y.setupRenderTarget(M);else if(he.__hasExternalTextures)Y.rebindTextures(M,$.get(M.texture).__webglTexture,$.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ue=M.depthTexture;if(he.__boundDepthTexture!==Ue){if(Ue!==null&&$.has(Ue)&&(M.width!==Ue.image.width||M.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(M)}}const Se=M.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);const Ee=$.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ee[z])?V=Ee[z][q]:V=Ee[z],W=!0):M.samples>0&&Y.useMultisampledRTT(M)===!1?V=$.get(M).__webglMultisampledFramebuffer:Array.isArray(Ee)?V=Ee[q]:V=Ee,ge.copy(M.viewport),xe.copy(M.scissor),qe=M.scissorTest}else ge.copy(we).multiplyScalar(ne).floor(),xe.copy(ft).multiplyScalar(ne).floor(),qe=ke;if(q!==0&&(V=I),_.bindFramebuffer(k.FRAMEBUFFER,V)&&_.drawBuffers(M,V),_.viewport(ge),_.scissor(xe),_.setScissorTest(qe),W){const he=$.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,he.__webglTexture,q)}else if(pe){const he=z;for(let Se=0;Se<M.textures.length;Se++){const Ee=$.get(M.textures[Se]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,q,he)}}else if(M!==null&&q!==0){const he=$.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,he.__webglTexture,q)}Z=-1},this.readRenderTargetPixels=function(M,z,q,V,W,pe,ve,he=0){if(!(M&&M.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=$.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){_.bindFramebuffer(k.FRAMEBUFFER,Se);try{const Ee=M.textures[he],Ue=Ee.format,Oe=Ee.type;if(M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+he),!y.textureFormatReadable(Ue)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!y.textureTypeReadable(Oe)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=M.width-V&&q>=0&&q<=M.height-W&&k.readPixels(z,q,V,W,ce.convert(Ue),ce.convert(Oe),pe)}finally{const Ee=ee!==null?$.get(ee).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(M,z,q,V,W,pe,ve,he=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=$.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(z>=0&&z<=M.width-V&&q>=0&&q<=M.height-W){_.bindFramebuffer(k.FRAMEBUFFER,Se);const Ee=M.textures[he],Ue=Ee.format,Oe=Ee.type;if(M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+he),!y.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!y.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Te),k.bufferData(k.PIXEL_PACK_BUFFER,pe.byteLength,k.STREAM_READ),k.readPixels(z,q,V,W,ce.convert(Ue),ce.convert(Oe),0);const je=ee!==null?$.get(ee).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,je);const ht=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await ef(k,ht,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Te),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,pe),k.deleteBuffer(Te),k.deleteSync(ht),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,z=null,q=0){const V=Math.pow(2,-q),W=Math.floor(M.image.width*V),pe=Math.floor(M.image.height*V),ve=z!==null?z.x:0,he=z!==null?z.y:0;Y.setTexture2D(M,0),k.copyTexSubImage2D(k.TEXTURE_2D,q,0,0,ve,he,W,pe),_.unbindTexture()},this.copyTextureToTexture=function(M,z,q=null,V=null,W=0,pe=0){let ve,he,Se,Ee,Ue,Oe,Te,je,ht;const dt=M.isCompressedTexture?M.mipmaps[pe]:M.image;if(q!==null)ve=q.max.x-q.min.x,he=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Ee=q.min.x,Ue=q.min.y,Oe=q.isBox3?q.min.z:0;else{const pt=Math.pow(2,-W);ve=Math.floor(dt.width*pt),he=Math.floor(dt.height*pt),M.isDataArrayTexture?Se=dt.depth:M.isData3DTexture?Se=Math.floor(dt.depth*pt):Se=1,Ee=0,Ue=0,Oe=0}V!==null?(Te=V.x,je=V.y,ht=V.z):(Te=0,je=0,ht=0);const nt=ce.convert(z.format),It=ce.convert(z.type);let _e;z.isData3DTexture?(Y.setTexture3D(z,0),_e=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Y.setTexture2DArray(z,0),_e=k.TEXTURE_2D_ARRAY):(Y.setTexture2D(z,0),_e=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const $t=_.getParameter(k.UNPACK_ROW_LENGTH),Xe=_.getParameter(k.UNPACK_IMAGE_HEIGHT),Jt=_.getParameter(k.UNPACK_SKIP_PIXELS),_n=_.getParameter(k.UNPACK_SKIP_ROWS),Zn=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,dt.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,dt.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,Ee),_.pixelStorei(k.UNPACK_SKIP_ROWS,Ue),_.pixelStorei(k.UNPACK_SKIP_IMAGES,Oe);const Di=M.isDataArrayTexture||M.isData3DTexture,it=z.isDataArrayTexture||z.isData3DTexture;if(M.isDepthTexture){const pt=$.get(M),Jn=$.get(z),at=$.get(pt.__renderTarget),Qn=$.get(Jn.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,at.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let Ui=0;Ui<Se;Ui++)Di&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(M).__webglTexture,W,Oe+Ui),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(z).__webglTexture,pe,ht+Ui)),k.blitFramebuffer(Ee,Ue,ve,he,Te,je,ve,he,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||$.has(M)){const pt=$.get(M),Jn=$.get(z);_.bindFramebuffer(k.READ_FRAMEBUFFER,S),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,P);for(let at=0;at<Se;at++)Di?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,pt.__webglTexture,W,Oe+at):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,pt.__webglTexture,W),it?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Jn.__webglTexture,pe,ht+at):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Jn.__webglTexture,pe),W!==0?k.blitFramebuffer(Ee,Ue,ve,he,Te,je,ve,he,k.COLOR_BUFFER_BIT,k.NEAREST):it?k.copyTexSubImage3D(_e,pe,Te,je,ht+at,Ee,Ue,ve,he):k.copyTexSubImage2D(_e,pe,Te,je,Ee,Ue,ve,he);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else it?M.isDataTexture||M.isData3DTexture?k.texSubImage3D(_e,pe,Te,je,ht,ve,he,Se,nt,It,dt.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(_e,pe,Te,je,ht,ve,he,Se,nt,dt.data):k.texSubImage3D(_e,pe,Te,je,ht,ve,he,Se,nt,It,dt):M.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,pe,Te,je,ve,he,nt,It,dt.data):M.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,pe,Te,je,dt.width,dt.height,nt,dt.data):k.texSubImage2D(k.TEXTURE_2D,pe,Te,je,ve,he,nt,It,dt);_.pixelStorei(k.UNPACK_ROW_LENGTH,$t),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Xe),_.pixelStorei(k.UNPACK_SKIP_PIXELS,Jt),_.pixelStorei(k.UNPACK_SKIP_ROWS,_n),_.pixelStorei(k.UNPACK_SKIP_IMAGES,Zn),pe===0&&z.generateMipmaps&&k.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(M){$.get(M).__webglFramebuffer===void 0&&Y.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Y.setTextureCube(M,0):M.isData3DTexture?Y.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Y.setTexture2DArray(M,0):Y.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){X=0,B=0,ee=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}function rl(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new nl(t,128,128);return i.wrapS=i.wrapT=Rs,i.colorSpace=Ht,i.needsUpdate=!0,i}const Do=rl("wood"),Ru=rl("stone"),Pr=rl("cloth"),E={stone:new mt({color:jn.materials.stone,map:Ru,roughness:.72}),wall:new mt({color:jn.materials.wall,roughness:.88}),wood:new mt({color:jn.materials.wood,map:Do,roughness:.52}),walnut:new mt({color:jn.materials.darkWood,map:Do,roughness:.5}),gold:new mt({color:jn.materials.metal,metalness:.7,roughness:.36}),navy:new mt({color:jn.materials.blue,roughness:.65}),white:new mt({color:jn.materials.linen,map:Pr,roughness:.93}),teal:new mt({color:jn.materials.accent,map:Pr,roughness:.83}),rust:new mt({color:9920067,map:Pr,roughness:.84}),carpet:new mt({color:6845561,map:Pr,roughness:1}),black:new mt({color:1449508,roughness:.6}),green:new mt({color:3495746,roughness:.86}),leaf:new mt({color:6651984,roughness:.8}),glass:new mt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new mt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new mt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new mt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new mt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new mt({color:14000506,roughness:.9}),hair:new mt({color:2433314,roughness:.9}),ao:new Gr({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},Uo=new Map;function Bg(n){let e=Uo.get(n);return e||(e=new mt({color:n,roughness:.75}),Uo.set(n,e)),e}function kg(){Object.values(E).forEach(n=>n.dispose()),Uo.forEach(n=>n.dispose()),[Do,Ru,Pr].forEach(n=>n.dispose())}const Hr={box:new pr(1,1,1),cylinder:new Bs(1,1,1,12),sphere:new Us(1,12,8),leaf:new Us(1,8,6),cone:new ks(1,1,16),plane:new mr(1,1)};function N(n,e,t,i,r,s,a,o=E.wood){const l=new wt(Hr.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Be(n,e,t,i,r,s,a=E.gold){const o=new wt(Hr.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Mn(n,e,t,i,r,s,a,o=E.leaf){const l=new wt(Hr.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function Vs(n,e,t,i,r,s=.022){const a=new wt(Hr.plane,E.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function Ot(n,e,t,i=1,r=0){const s=new Nt;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),Be(s,0,.21,0,.21,.42,E.stone),Be(s,0,.76,0,.027,1.1,E.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Mn(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?E.leaf:E.green).rotation.set(.3,o,Math.sin(o)*.65)}return Vs(s,0,0,.7,.55),s}function Sn(n,e,t,i,r=1){const s=new Nt;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),Be(s,0,.035,0,.11,.045,E.gold),Be(s,0,.21,0,.019,.36,E.gold),Be(s,0,.42,0,.16,.22,E.shade),Be(s,0,.315,0,.135,.015,E.glow),s}function Ti(n,e,t,i=0,r=E.teal){const s=new Nt;s.position.set(e,0,t),s.rotation.y=i,n.add(s),N(s,0,.43,0,.55,.14,.56,r),N(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])Be(s,a*.2,.2,o*.2,.025,.4,E.walnut);return s}function On(n,e,t,i=0,r=1.5,s=E.teal){const a=new Nt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),N(a,0,.32,0,r,.42,.64,s),N(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])N(a,o*(r/2-.08),.56,0,.16,.4,.7,s),N(a,o*r*.23,.55,-.17,.35,.28,.11,E.white);return N(a,0,.58,.04,r-.3,.11,.44,s),Vs(a,0,0,r+.15,.95),a}function oi(n,e,t,i=.42){Be(n,e,.37,t,.055,.74,E.gold),Be(n,e,.75,t,i,.07,E.stone),Be(n,e,.04,t,i*.5,.06,E.walnut)}function Ir(n,e,t,i){Be(n,e,t,i,.07,.13,E.white),Be(n,e,t-.065,i,.12,.018,E.white)}function Ai(n,e,t,i,r=1.15,s=.65,a=0){N(n,e,t,i,r+.07,s+.07,.06,E.gold),N(n,e,t,i+.04,r,s,.015,E.white),N(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?E.teal:E.window),N(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,E.stone),Mn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,E.rust)}function zg(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof wt)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new hu(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function Gg(n){const e=n.level??1,t=new Nt;t.name=n.id,t.userData.entityId=n.id,N(t,0,.04,0,4.7,.08,3.1,e>=4?E.stone:e>=2?E.walnut:E.wood),N(t,0,1.19,-1.51,4.7,2.38,.14,E.wall),N(t,2.35,1.14,-.1,.1,2.28,2.75,E.stone),N(t,1.6,1.25,-1.41,1.05,1.9,.035,E.window);for(const a of[1.1,1.6,2.1])N(t,a,1.25,-1.35,.035,1.94,.04,E.gold);N(t,1.6,1.25,-1.35,1.08,.04,.04,E.gold);for(let a=1.03;a<1.26;a+=.06)N(t,a,1.28,-1.23,.04,1.94,.13,E.white);if(N(t,0,2.27,-1.27,4.53,.06,.065,E.glow),n.construction){for(const a of[-1.8,0,1.8])N(t,a,1.05,1.5,.07,2.1,.07,E.gold),N(t,a,.4,.4,.65,.7,.7,E.stone);for(const a of[.5,1.4,2.15])N(t,0,a,1.5,4.5,.06,.06,E.gold);return N(t,0,.8,1.55,4.5,.48,.06,E.navy),t}if(n.status==="unbuilt")return N(t,0,.12,0,3.8,.08,2.5,E.stone),t;const i=Rc(n),r=wc(n)==="twin";N(t,-.67,.078,.07,2.85,.02,2.66,E.carpet);const s=(a,o)=>{N(t,a,.28,-.03,o+.09,.39,1.9,E.walnut),N(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?E.stone:E.white),N(t,a,.7,-.98,o+.13,1.22,.12,E.walnut),N(t,a,.82,-.89,o-.05,.63,.08,E.teal),N(t,a,.67,-.58,o*.82,.13,.36,E.white),e>=2&&(N(t,a,.78,-.72,o*.78,.12,.25,E.white),N(t,a,.655,.18,o,.045,.45,e>=4?E.white:E.teal)),N(t,a,.646,.54,o,.075,.39,e>=4?E.gold:i?E.rust:E.teal),N(t,a,.49,1,o,.28,.04,E.white),Vs(t,a,0,o+.25,2.25)};r?(s(-1.36,.88),s(-.22,.88)):s(-.75,1.68);for(const a of[-1.94,.43])N(t,a,.35,-.76,.41,.58,.5,E.walnut),N(t,a,.66,-.76,.45,.06,.53,E.stone),Sn(t,a,.69,-.77,.8);if(Ai(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)N(t,1.65,.38,-.4,.9,.65,.85,E.stone),N(t,1.65,.73,-.4,.85,.08,.8,E.white),Be(t,1.65,.83,-.65,.025,.22,E.gold),N(t,2.16,1.25,-.35,.025,1.8,1.5,E.glass),N(t,1.6,1.93,-1.14,.3,.04,.25,E.gold),Ai(t,1.5,1.6,-1.33,.8,.5,e),On(t,1.58,.76,-Math.PI/2,.75,E.white);else if(i)On(t,1.55,.22,-Math.PI/2,1.3,E.rust),oi(t,.97,.8,.25);else{N(t,1.61,.76,-.57,1.1,.1,.57,E.walnut);for(const a of[1.19,2.03])N(t,a,.37,-.57,.05,.75,.46,E.gold);N(t,1.59,.94,-.64,.35,.28,.04,E.screen),Ti(t,1.65,.06,Math.PI),Sn(t,2,.82,-.62,.66)}if(ui(n)==="view"||ui(n)==="premium"){N(t,0,1.45,-1.4,4.15,1.65,.025,E.window);for(const a of[-2,0,2])N(t,a,1.45,-1.35,.045,1.7,.045,E.gold)}if(ui(n)==="premium"&&(N(t,0,2.1,-1.25,4.5,.08,.08,E.gold),Ai(t,-1.6,1.8,-1.3,.8,.4,99),Ot(t,1.95,.55,1.15)),n.extraBed&&(N(t,.5,.25,1.02,.8,.3,.8,E.walnut),N(t,.5,.43,1.02,.8,.08,.8,E.white)),Ot(t,2.05,1.05,.63),(n.level??1)>1&&(Ai(t,-2.05,1.6,-1.38,.38,.56,n.level),Ot(t,-2.05,.35,.55)),e>=3&&(Sn(t,-1.94,1.25,-.9,1.1),N(t,-.75,1.62,-1.25,2.1,.025,.03,E.glow)),e>=5){N(t,0,1.4,-1.42,4.3,1.9,.025,E.window);for(const a of[-2,-.8,.8,2])N(t,a,1.4,-1.35,.04,1.95,.06,E.gold);for(const a of[-1.8,0,1.8])N(t,a,.09,.15,.025,.02,2.9,E.gold);for(const a of[2.12,2.24])N(t,0,a,-1.1,4.5,.035,.035,E.glow)}if((n.level??1)>2&&N(t,0,2.12,-1.3,4.55,.035,.055,E.gold),N(t,-2.12,.52,.95,.22,1,.28,E.walnut),n.status==="reserved"&&(n.suaBookingId&&N(t,0,1.1,1.62,.38,.5,.05,E.rust),N(t,1.2,.48,1.48,.25,.29,.1,E.gold)),n.status==="cleaning"){N(t,1.05,.37,1.57,.55,.55,.35,E.navy);for(const a of[.83,1.27])Be(t,a,.09,1.57,.07,.07,E.black);N(t,1.05,.71,1.57,.6,.04,.41,E.gold),N(t,.95,.79,1.57,.3,.12,.22,E.white)}if(n.status==="occupied"&&N(t,0,2.23,.7,3.8,.035,.035,E.shade),n.status==="maintenance"){const a=N(t,.9,1.95,1.55,.17,.17,.08,E.glow);a.name="fault-lamp",a.userData.interactive=!0,N(t,.6,.33,.9,.8,.1,.8,E.rust),N(t,.6,.52,.9,.1,.6,.1,E.gold)}return t}function _s(n,e,t,i=2.12){Be(n,e,i+.13,t,.012,.45,E.gold),Be(n,e,i-.08,t,.24,.18,E.gold),Be(n,e,i-.18,t,.21,.015,E.glow)}function Hg(n,e){if(N(n,0,1.2,-1.54,14.65,2.4,.14,E.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)N(n,t,1.2,-1.42,.035,2.38,.08,E.gold);else for(let t=-7;t<7;t+=.58)N(n,t,1.2,-1.43,.022,2.2,.04,E.wood)}function Ji(n,e,t){N(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,E.window);for(let i=e;i<=t+.01;i+=.72)N(n,i,1.23,-1.32,.045,2.17,.06,E.gold);N(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,E.gold)}function Vg(n,e,t){oi(n,e,t,.44),Ti(n,e-.63,t,Math.PI/2),Ti(n,e+.63,t,-Math.PI/2),Ir(n,e-.18,.87,t),Ir(n,e+.18,.87,t),Be(n,e,.83,t,.065,.12,E.gold)}function Ra(n,e,t){N(n,e,1.23,-1.35,t,1.86,.18,E.walnut);for(let i=.53;i<2;i+=.39){N(n,e,i,-1.14,t,.04,.42,E.gold),N(n,e,i+.035,-1.18,t-.1,.025,.05,E.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;Be(n,s,i+.13,-1.08,.048,.23,r%3?E.green:E.rust),Be(n,s,i+.27,-1.08,.019,.07,E.gold)}}}function Wg(n,e=1,t=100,i=!1){const r=new Nt;if(n!=="rooftop"&&(Hg(r,n),N(r,0,.04,0,14.66,.08,3.15,n==="lobby"?E.stone:E.wood),N(r,0,2.31,-1.21,14.5,.04,.07,E.glow)),i){for(const s of[-6,-3,0,3,6])N(r,s,1.1,1.4,.08,2.2,.08,E.gold);for(const s of[.5,1.5,2.1])N(r,0,s,1.4,14,.08,.08,E.gold);return N(r,0,.8,1.5,14,.65,.04,E.navy),r}if(n==="lobby"){Ji(r,4.3,7.2),N(r,0,1.35,-1.33,6.7,1.8,.11,E.stone),N(r,0,.48,.5,6.2,.84,.62,E.walnut),N(r,0,.94,.5,6.45,.12,.83,E.stone),N(r,0,.15,.86,6.08,.075,.035,E.glow);for(let s=-2.9;s<3;s+=.18)N(r,s,.5,.824,.035,.6,.025,E.gold);for(const s of[-1.8,1.7])N(r,s,1.12,.2,.42,.29,.045,E.screen),Sn(r,s+.55,1.02,.46,.72);Ot(r,-3.9,-.7,1.72),Ot(r,4,-.55,1.6),On(r,-5.75,.08,Math.PI/2,1.65,E.white),oi(r,-5.02,1,.47),Ot(r,-6.4,1.4,.55),N(r,5.8,.045,1.18,2.2,.03,1.25,E.navy);for(const s of[4.65,6.95])N(r,s,1.13,.85,.08,2.28,.08,E.gold),N(r,s,1.17,.79,.65,2.18,.025,E.glass);N(r,5.8,2.18,1.24,2.6,.16,1.72,E.navy),N(r,5.8,2.08,2.03,2.55,.035,.04,E.gold);for(const s of[3.5,4.1])Be(r,s,.67,1.8,.025,1.15,E.gold),Be(r,s,.09,1.8,.08,.1,E.black);N(r,3.8,1.27,1.8,.65,.035,.04,E.gold),N(r,3.8,.18,1.8,.78,.08,.51,E.gold),N(r,3.76,.43,1.8,.37,.45,.25,E.rust);for(const s of[-2.8,0,2.8])_s(r,s,.1,2.02)}else if(n==="breakfast"){Ji(r,4.3,7.2),Ra(r,0,4.5),N(r,0,.52,-.15,5,.9,.8,E.walnut),N(r,0,1.01,-.15,5.2,.12,.97,E.stone);for(const s of t>0?[-1.7,-.7,.3]:[])N(r,s,1.14,-.17,.66,.14,.45,E.gold),N(r,s,1.24,-.17,.6,.08,.38,E.white);N(r,1.5,1.29,-.24,.43,.53,.38,E.black),Be(r,2.1,1.28,-.2,.15,.4,E.glass),Be(r,2.1,1.13,-.2,.145,.09,E.rust);for(const s of[-5.55,-3.4,3.8,6])Vg(r,s,.68);for(const s of[-5.55,-3.4,0,3.8,6])_s(r,s,.5);Ot(r,-6.9,-.87,1.1),Ot(r,6.8,-.8,1.1)}else if(n==="club"){Ji(r,-7.2,-3.8),Ji(r,3.8,7.2),Ra(r,0,5.4),N(r,0,.58,-.24,5.55,1.02,.58,E.walnut),N(r,0,1.12,-.24,5.8,.11,.79,E.stone),N(r,0,.25,.071,5.5,.05,.035,E.glow);for(const s of[-1.8,-.6,.6,1.8])Be(r,s,.6,.6,.24,.12,E.teal),Be(r,s,.28,.6,.035,.58,E.gold),t>0&&Ir(r,s,1.24,-.15),_s(r,s,-.24);On(r,-5.6,-.54,0,2.05,E.teal),oi(r,-5.6,.57,.5),Ti(r,-4.38,.75,-Math.PI/3,E.rust),On(r,5.25,-.54,0,2.1,E.rust),oi(r,5.25,.6,.52),Ti(r,6.52,.7,-Math.PI/3,E.teal),Ot(r,-6.9,.68,1.2),Ot(r,6.9,-.8,1.25),Sn(r,-4.15,.05,-.8,1.6)}else if(n==="gym"){Ji(r,-7.2,7.2),N(r,0,.093,0,14.4,.025,2.9,E.carpet);for(const s of[-5.65,-3.8,-1.95]){N(r,s,.16,.15,.92,.21,1.72,E.black),N(r,s,.28,.17,.68,.015,1.42,E.carpet);for(const a of[-1,1])N(r,s+a*.42,.7,-.51,.075,1.1,.08,E.black),N(r,s+a*.42,1.13,-.2,.06,.06,.75,E.black);N(r,s,1.26,-.5,.85,.23,.14,E.black),N(r,s,1.3,-.409,.43,.12,.012,E.screen)}for(const s of[.1,1.65]){const a=Be(r,s,.41,.1,.36,.12,E.black);a.rotation.z=Math.PI/2,N(r,s,.39,.2,.07,.69,.09,E.gold),N(r,s,.81,.47,.37,.09,.24,E.black),N(r,s,1.05,-.32,.07,.55,.07,E.black),N(r,s,1.27,-.32,.5,.06,.07,E.gold)}N(r,5.45,.68,-.8,2.8,.07,.58,E.black);for(let s=4.2;s<6.8;s+=.46)Be(r,s,.82,-.8,.13,.16,E.black);for(const s of[3.65,5.2])N(r,s,.12,.61,1.08,.025,1.68,E.teal);Ot(r,6.93,.82,1.2),N(r,2.76,.4,-.87,.6,.7,.53,E.walnut);for(let s=0;s<3;s++)N(r,2.76,.79+s*.065,-.87,.46,.065,.4,E.white)}else if(n==="spa"){Ji(r,-7.2,7.2);for(const s of[-4.8,0,4.8]){N(r,s,.4,0,1.7,.6,2.05,E.walnut),N(r,s,.76,0,1.8,.14,2.1,E.white),N(r,s,.87,-.6,1.15,.12,.45,E.white),N(r,s,.86,.4,1.8,.03,.7,E.teal),Ot(r,s+1.2,-.9,1.1),Sn(r,s-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)N(r,s+1.2,.15+a*.06,.75,.5,.06,.32,E.white)}}else{N(r,0,.03,0,15,.14,3.6,E.wood);for(let s=-7.3;s<7.4;s+=.24)N(r,s,.11,0,.017,.006,3.45,E.walnut);for(const s of[-6.65,-2.45,2.8,6.9])Ot(r,s,-.8,1.45);for(const s of[-4.4,3.5]){oi(r,s,.45,.66),Ti(r,s-.9,.4,Math.PI/2,E.white),Ti(r,s+.9,.4,-Math.PI/2,E.white),Ir(r,s+.2,.88,.45),Be(r,s,1.07,.45,.026,2.05,E.gold);const a=new wt(new ks(1.55,.32,8),E.white);a.position.set(s,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,r.add(a)}On(r,-.5,-.7,0,1.7,E.teal),oi(r,-.5,.45,.38);for(const s of[-7.35,7.35])N(r,s,.43,0,.055,.8,3.5,E.gold);for(let s=-7.3;s<=7.3;s+=1.46)Be(r,s,.43,1.7,.018,.8,E.gold);N(r,0,.8,1.7,14.7,.035,.035,E.gold),N(r,0,.46,1.7,14.7,.65,.014,E.glass)}if(e>=2){if(n==="lobby"&&(On(r,-5.6,.8,0,1.8,E.teal),oi(r,-4.25,.8,.35)),n==="breakfast"&&(N(r,2.8,1.1,-.6,.65,.5,.45,E.screen),Ir(r,2.8,1.44,-.6)),n==="club"&&(Ra(r,5.8,1.2),Sn(r,3.3,.05,-.8,1.8)),n==="gym")for(const s of[3.7,4.6,5.5])N(r,s,.15,.5,.6,.09,1.8,E.rust);if(n==="spa")for(const s of[-2.5,2.5])N(r,s,1.15,-.7,.06,2.1,1.3,E.wood);n==="rooftop"&&On(r,0,.55,0,2.2,E.rust)}if(e>=3){if(n==="lobby"&&(Ai(r,0,1.6,-1.17,3.5,.65,3),N(r,0,.94,.5,6.45,.12,.83,E.gold)),n==="breakfast"&&(N(r,0,.55,.05,5.4,1,.8,E.stone),t>0))for(const s of[-1.8,0,1.8])Be(r,s,1.12,.05,.25,.12,E.gold);if(n==="club"&&(On(r,-5.5,.4,0,2.8,E.white),Ai(r,0,1.85,-1.05,2.7,.45,2)),n==="gym"){N(r,4.9,1.15,-1.23,4,1.85,.05,E.glass);for(const s of[3.1,6.5])N(r,s,1,0,.08,1.8,.08,E.gold);N(r,4.8,1.85,0,3.6,.08,.08,E.gold)}if(n==="spa")for(const s of[-4.8,0,4.8])N(r,s,.88,.4,1.8,.04,.8,E.white),Sn(r,s+1.05,.75,.8,.8);if(n==="rooftop"){for(const s of[-6.8,6.8])N(r,s,1.3,-.9,.12,2.6,.12,E.walnut);for(let s=-6.8;s<=6.8;s+=.7)N(r,s,2.5,-.3,.12,.1,2.2,E.walnut)}}if(e>=4){N(r,0,.12,-.15,14,.03,2.9,E.stone);for(const s of[-6.6,6.6])Ai(r,s,1.55,-1.15,.7,1.1,4),Sn(r,s,.05,.85,1.7);if(n==="spa"&&(N(r,0,.4,.4,2.5,.55,1.5,E.white),N(r,0,.7,.4,2.1,.03,1.1,E.window)),n==="breakfast"||n==="club")for(const s of[-2,2])N(r,s,1.55,-.6,.025,.85,.025,E.gold),Be(r,s,1.95,-.6,.25,.06,E.gold);n==="gym"&&(N(r,0,.3,.3,1.4,.25,1.8,E.black),N(r,0,1.25,-.4,1.2,.6,.12,E.screen))}if(e>=5){if(n!=="rooftop"){for(const s of[-5,-2.5,0,2.5,5])_s(r,s,.5,2.05),N(r,s,2.27,0,2.2,.045,2.6,E.walnut);N(r,0,2.23,1.2,14,.04,.04,E.glow)}else{N(r,0,.35,-.5,3.6,.5,1.1,E.stone),N(r,0,.62,-.5,3.3,.04,.9,E.window);for(const s of[-6,-3,3,6])Sn(r,s,.05,.8,1.3)}for(let s=-6.5;s<7;s+=1.3)N(r,s,.15,1.55,.5,.02,.2,E.gold)}return r}function $g(n,e,t){const i=new Nt,s=Bg(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new Nt;return u.position.set(c,.31,0),i.add(u),N(u,0,-.11,0,.085,.26,.1,E.navy),N(u,0,-.245,.035,.11,.07,.17,E.black),u},o=a(-.08),l=a(.08);N(i,0,.47,0,.27,.34,.17,s),N(i,0,.58,.093,.07,.13,.012,E.white),["chill","family","points","forum","creator"].includes(e??"")||N(i,0,.55,.108,.018,.095,.016,E.navy),Mn(i,0,.81,0,.185,.21,.16,E.skin),Mn(i,0,.94,-.024,.193,.102,.163,E.hair);for(const c of[-.069,.069])Mn(i,c,.84,.149,.021,.024,.01,E.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&N(i,c,.856,.156,.09,.066,.012,E.navy);for(const c of[-1,1]){const u=N(i,c*.18,.45,0,.075,.26,.085,s);u.rotation.z=c*.15,Mn(i,c*.19,.303,.012,.047,.05,.045,E.skin)}if(e==="chill"&&(Be(i,0,1,0,.23,.06,E.white),Be(i,0,1.06,0,.16,.1,E.white)),e==="road"&&(N(i,.29,.25,.04,.22,.3,.15,E.walnut),N(i,.29,.44,.04,.12,.035,.05,E.gold)),e==="family"&&(N(i,0,.46,-.17,.3,.34,.17,E.rust),N(i,.27,.38,.05,.07,.2,.07,E.teal)),e==="points"&&(N(i,-.26,.4,.09,.15,.23,.025,E.white),N(i,-.26,.44,.11,.11,.04,.01,E.teal)),e==="hunter"&&(N(i,.24,.48,.12,.1,.18,.025,E.black),N(i,.24,.49,.138,.07,.12,.01,E.screen)),e==="forum"&&(Mn(i,0,1.01,-.01,.21,.07,.18,E.navy),N(i,0,.99,.17,.2,.025,.16,E.navy),N(i,-.25,.42,.08,.15,.23,.04,E.black)),e==="creator"){N(i,0,.5,.16,.2,.13,.12,E.black);const c=Be(i,0,.5,.26,.065,.1,E.black);c.rotation.x=Math.PI/2,N(i,0,.63,.13,.025,.18,.02,E.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Mn(i,c+.23,.49,.08,.065,.08,.065,E.rust),N(i,c+.23,.35,.08,.015,.21,.015,E.green);if(e==="planner"&&(N(i,-.24,.47,.08,.19,.27,.04,E.teal),N(i,0,.54,.12,.08,.11,.015,E.white)),e==="whale"&&(N(i,0,.59,.12,.04,.09,.025,E.gold),N(i,.2,.36,.055,.08,.04,.09,E.gold),Mn(i,0,.96,-.04,.2,.075,.18,E.hair)),e==="auditplus"&&(N(i,-.24,.47,.09,.19,.26,.04,E.walnut),N(i,-.24,.49,.12,.14,.19,.012,E.white),N(i,.23,.45,.09,.012,.17,.012,E.gold)),t==="house"){N(i,.43,.36,.2,.4,.55,.4,E.navy),N(i,.43,.68,.2,.45,.05,.45,E.gold);for(let c=0;c<3;c++)N(i,.43,.75+c*.065,.2,.32,.06,.3,E.white);for(const c of[.28,.58])Mn(i,c,.08,.2,.07,.07,.07,E.black)}if(t==="engineering"&&(N(i,.3,.35,.05,.24,.2,.16,E.rust),N(i,.3,.5,.05,.13,.035,.04,E.gold),Be(i,0,1,0,.21,.07,E.gold)),t==="fnb"){N(i,.4,.35,.2,.4,.08,.5,E.gold),N(i,.4,.62,.2,.4,.08,.5,E.gold);for(const c of[.28,.5])Be(i,c,.73,.2,.09,.15,E.white);Be(i,0,1,0,.17,.15,E.white)}return Vs(i,0,0,.47,.3),{group:i,left:o,right:l}}function Xg(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],d=n.group.position.clone();n.group.position.lerpVectors(u,f,l-c);const p=n.group.position.x-d.x,m=n.group.position.z-d.z,x=Math.hypot(p,m)>1e-4;x&&(n.group.rotation.y=Math.atan2(p,m));const g=x?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=g,n.right.rotation.x=-g;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Tc(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*nr;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?sd[o]:0;e.push({id:a,floorId:i.id,position:new H(c,s,0),label:new H(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*nr+3.6}}function qg(n,e,t){const i=new wt(new mr(e,t),new Gr({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function Yg(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class Kg{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=Tc(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new Og({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Xc,this.renderer.outputColorSpace=Ht,this.renderer.toneMapping=Wo,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new _f;root=new Nt;camera=new zs;light=new Bf(16768942,3.1);ambient=new Nf(12638184,10651490,2.15);raycaster=new Gf;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Nt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;N(this.root,a,o/2-1,l,1.5,o,1.7,E.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(s+Math.round(c*10)+Math.round(u*10))%3!==0&&N(this.root,a+u,c,l+.87,.14,.24,.015,s%3===0?E.shade:E.window)}N(this.root,0,-.32,0,30,.35,15,E.navy),N(this.root,0,-.13,.7,17.6,.16,5.3,E.stone),N(this.root,0,-.06,2.95,17,.09,.55,E.stone);for(const s of[-8.1,8.4])Ot(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new Nt;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){N(o,0,-.085,0,15.05,.19,3.48,E.stone),N(o,0,-.12,1.77,15.2,.17,.19,E.navy),N(o,0,-.011,1.85,15.1,.025,.02,E.gold),N(o,0,2.405,-.02,15.05,.18,3.4,E.stone);for(const c of[-7.43,7.43])N(o,c,1.19,.18,.18,2.38,3.12,E.stone);N(o,7.94,1.19,-.24,.87,2.38,2.1,E.window);for(const c of[7.52,8.35])N(o,c,1.2,.84,.045,2.4,.06,E.gold);N(o,7.94,-.075,.1,.95,.19,2.85,E.navy),N(o,7.94,1.2,.87,.83,.025,.035,E.gold)}s.entityIds.forEach(c=>{const u=e.entities[c],f=this.layout.entities.find(m=>m.id===c),d=u.kind==="room"?Gg(s.construction?{...u,construction:s.construction}:u):Wg(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let m=1;m<(u.level??1);m++)Ot(d,-6.8+m*.45,-.95,.5+m*.1);d.name=c,d.userData.entityId=c,d.position.x=f.position.x,o.add(d);const p=qg(c,u.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(d.add(p),this.colliders.push(p),u.kind==="room"){const m=document.createElement("button");m.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),m.textContent=s.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,m.dataset.entityId=c,m.setAttribute("aria-label",u.number+" 房间"),m.onclick=()=>this.store.select(c),this.labels.push(m),this.overlay.append(m)}else{const m=document.createElement("button");m.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),m.dataset.entityId=c,m.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),m.setAttribute("aria-label","查看"+u.name),m.onclick=()=>this.store.select(c),this.labels.push(m),this.overlay.append(m)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),zg(this.root),this.faultLights=[],this.root.traverse(s=>{s.name==="fault-lamp"&&this.faultLights.push(s)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new Gr({color:16766861,transparent:!0,opacity:.9,depthTest:!1});N(this.halo,0,0,0,4.7,.025,.025,r),N(this.halo,0,2.31,0,4.7,.025,.025,r),N(this.halo,-2.35,1.15,0,.025,2.31,.025,r),N(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new ze((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=Yg(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new H(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new H(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new H(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof hu&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Nt,this.scene.add(this.root);const s=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/nr+1e-5),c=s[l],u=e.floors.findIndex(f=>f.id===c);u>=0&&(o.y+=(u-l)*nr)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=Tc(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const s=this.labels.find(a=>a.dataset.entityId===i.entityId);if(s){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);s.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",s.classList.add("upgraded"),setTimeout(()=>s.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(s=>{const a=s.dataset.entityId===e.selectedId;s.classList.toggle("selected",a),s.setAttribute("aria-pressed",String(a))});const r=this.layout.entities.find(s=>s.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!r,r){const s=e.entities[r.id];this.halo.scale.x=s.kind==="room"?1:3.1,this.halo.position.set(r.position.x,r.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...$g(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*nr+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new H(o.x,o.level*nr+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(r=>Xg(r,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const r=this.store.getState(),s=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=r.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});s!==this.speechSlot&&(this.speechSlot=s,this.speaker=a.length?a[s%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new H(-.6,1.25,0)));o.hidden=!1;const f=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),d=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${f}px,${d+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(r=>{r.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(Hr).forEach(e=>e.dispose()),kg(),this.overlay.remove()}}const sl="jinwanyoutao_v8_game_1";function Zg(){try{const n=localStorage.getItem(sl);if(!n)return Ua();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return fr(e),Kn(e),e.game.operations.day!==e.game.day&&Bo(e,!e.game.reportOpen),e.guests.forEach(t=>Fs(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=Ua();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function Cu(n){try{return localStorage.setItem(sl,JSON.stringify(n)),!0}catch{return!1}}const Yn=rd(Zg()),Ar=Md(document.querySelector("#app"),Yn);Ou(document.querySelector("#app"),Yn);let No=!1,Fo=Yn.getState().game.notice.startsWith("存档读取失败");const al=()=>{!No&&!Fo&&!Cu(Yn.getState())&&(Fo=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&Yn.advance(4*Yn.getState().speed)},1e3);setInterval(al,5e3);document.addEventListener("visibilitychange",al);window.addEventListener("pagehide",al);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){No=!0;try{localStorage.removeItem(sl),Yn.reset(),Fo=!1,Cu(Yn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{No=!1}}});function Ws(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}Ws();window.visualViewport?.addEventListener("resize",Ws);window.visualViewport?.addEventListener("scroll",Ws);window.addEventListener("resize",Ws);try{const n=new Kg(Ar.stage,Yn);Ar.setFocusHandler(e=>n.focusFloor(e)),Ar.stage.addEventListener("world-error",e=>Ar.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Ar.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
