(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function td(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,s=!1,r=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(p,g=.13,x=0)=>{if(!i||!s)return;const h=i.createOscillator(),m=i.createGain(),A=i.currentTime+x;h.frequency.value=p,m.gain.setValueAtTime(.016,A),m.gain.exponentialRampToValueAtTime(1e-4,A+g),h.connect(m),m.connect(i.destination),h.start(A),h.stop(A+g),h.onended=()=>{h.disconnect(),m.disconnect()}};t.onclick=async()=>{if(s=!s,s){if(i??=new AudioContext,await i.resume(),!l){const p=i.createBuffer(1,i.sampleRate*2,i.sampleRate),g=p.getChannelData(0);for(let h=0;h<g.length;h++)g[h]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=p,l.loop=!0,c=i.createGain(),c.gain.value=.01;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=700,l.connect(x),x.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(s)),t.title=s?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const f=e.subscribe(p=>{const g=Date.now();i&&c&&c.gain.setTargetAtTime(p.game?.weather==="rain"?.12:.015,i.currentTime,.5),s&&!document.hidden&&g-r>1800&&((p.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),r=g):p.metrics.cash>o&&(u(1046,.1),r=g)),a=p.game?.arrivals??0,o=p.metrics.cash}),d=()=>{document.hidden?i?.suspend():s&&i?.resume()};document.addEventListener("visibilitychange",d),window.addEventListener("pagehide",()=>{f(),i?.close()},{once:!0})}function Wc(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,f)=>{const d="floor-"+l,p="facility-"+l;e.push({id:d,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[p]}),t[p]={id:p,kind:"facility",floorId:d,role:l,name:c,capacity:u,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const s=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),f="room-"+u,d=s[((o-2)*3+c)%s.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:d,nightsLeft:d==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const r=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,f,d,p],g)=>r.push({id:"public-"+g,name:p?"当班员工":"住客",tier:p?"Staff":"Member",floorId:"floor-"+o,thought:d,color:f,route:[l,c],z:u,staff:!!p}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=r.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=r.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of r){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:r.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const ti={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},Si=n=>n.category??(n.type==="suite"?"suite":"standard"),Xc=n=>n.bed??(n.type==="twin"?"twin":"king"),qc=n=>["suite","premium"].includes(Si(n)),Lt=n=>Si(n)==="suite",$s=n=>ti[Si(n)].name+" · "+(Xc(n)==="twin"?"双床":"大床"),Qo=n=>Object.values(n.entities).filter(e=>e.kind==="room"),Je=n=>Qo(n).filter(e=>e.status!=="unbuilt"),Yc=n=>Je(n).filter(e=>Lt(e)&&e.status==="available").length,Kc=n=>Je(n).filter(e=>e.status==="occupied").length,Dl=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId);function nd(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=Je(n),i=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),s=i.length,r=t.filter(p=>p.status==="dirty"||p.status==="cleaning").length,a=e.events.length+n.guests.filter(p=>!p.departing&&(p.late==="pending"||p.challenge&&!p.challenge.resolved)).length,o=i.reduce((p,g)=>p+(g.rate??e.price),0),l=i.filter(p=>p.source==="平台").reduce((p,g)=>p+Math.round((g.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((p,g)=>p+g*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),r&&u.push({title:"夜班先把房间交出来",text:`还有 ${r} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const f=Math.round(s/Math.max(1,t.length)*100),d=e.operations?.forecast?.occupancy;d!==void 0&&f<d-15&&u.push({title:"入住低于晨会预估",text:`当前 ${f}%，预估 ${d}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={day:e.day,minute:e.minute,open:!0,occupancy:f,expected:d,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:o,projectedNet:e.revenue+o-e.expense-l-c,pending:a,complaints:e.complaints,logs:e.logs.filter(p=>p.day===e.day&&p.category==="客诉").map(p=>({...p})),notes:u.slice(0,4)},e.paused=!0}const ar=2.12,or=7.94,Zt=n=>n.game.day*1440+n.game.minute;function Js(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(s=>s.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Zt(n)+20+$i(e.id)%75,trail:[],revision:0}}function $i(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function Un(n,e,t){Js(n,e);const i=e.movement;if(i.steps.length)return!1;const s=n.entities[t],r=t==="exit";if(!s&&!r)return!1;const a=r?0:n.floors.findIndex(d=>d.id===s.floorId),o=i.position,l=r?5.8:s.kind==="room"?(Number(s.number)%100-2)*4.93:-5.7+$i(e.id+t)%12*.95,c=r?2.8:1.25,u=[],f=(d,p,g,x)=>u.push({x:d,z:p,level:g,phase:x});return f(o.x,ar,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(or,ar,o.level,"corridor"),f(or,.9,o.level,"elevator"),f(or,.9,a,"elevator"),f(or,ar,a,"corridor")),f(l,ar,a,"corridor"),f(l,c,a,r?"exit":s.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=Zt(n)+60,e.visitUntil=void 0,!0}function Zc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],s=t.position,r=i.x-s.x,a=i.z-s.z,o=(i.level-s.level)*2.55,l=Math.hypot(r,a,o),c=o!==0?.85:.65;if(s.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;s.x+=r*u,s.z+=a*u,s.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Zt(n)+45+$i(e.id+Zt(n))%65,!0)}function id(n){for(const e of n.guests)Js(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Jc(n){n.movement&&n.movement.trail.push({...n.movement.position})}function Ul(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const s of[i.position,...i.steps,...i.trail])s.level>=e&&s.level++}}const Ws=n=>n.lateHour??(n.tier==="Globalist"?16:14),kn=n=>Ws(n)===16?"4PM":"2PM",Gi=n=>Ws(n)===16?14:12,Qc=n=>n.late==="honor"?Ws(n)*60:n.late==="deny"||n.late==="pending"?Gi(n)*60:660;function jc(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const jo={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},eu=n=>n.name+":"+n.persona;function Fn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Zt(n)+35,e.speech.next=0,ps(n,e)}function ps(n,e){if(e.staff)return;const t=Zt(n),i=e.speech??={next:0,recent:[]},s=e.movement,r=n.floors.find(g=>g.id===e.floorId)?.role??"lobby",a=!!s?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[s?.position.phase,a,r,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(g=>g.kind==="room"&&Lt(g)&&g.status==="available").length;let f=[];if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[kn(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+Gi(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)f=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)f=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)f=[s?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[jo[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(r==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const g=e.experience,x=g?.place==="facility-"+r&&t-g.at<150;x&&g.kind==="shortage"?f=[r==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:x&&g.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[r]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+kn(e)+" 吗？先确认一下。"),r==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const g=n.game.operations?.profiles[e.profileId??""];r==="guest"&&g&&g.visits>0&&f.push(g.trust>=2?"这家以后可以常住，下次带朋友来。":g.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const x=n.game.guestMemory?.[eu(e)];r==="guest"&&x?.visits&&f.push(x.satisfaction<80?"上次住得不太顺，这次再看看。":x.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const d=n.game.dialogueRecent??={};for(const[g,x]of Object.entries(d))t-x>240&&delete d[g];const p=f.filter(g=>!i.recent.some(x=>x.text===g&&t-x.at<180)&&t-(d[g]??-9999)>25);if(p.length){const g=p[$i(e.id+t)%p.length];e.thought=g,i.recent.push({text:g,at:t}),i.recent=i.recent.slice(-8),d[g]=t}else e.thought="";i.next=t+45}function Xs(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(s=>!s.staff&&!s.departing&&s.floorId===t.floorId&&!s.movement?.steps.length)??n.guests.find(s=>s.staff&&(s.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function Ts(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function ni(n,e,t=1){const i=Ts(n);i.counts[e]=(i.counts[e]??0)+t;for(const s of n.game.tasks)s.id===e&&(s.progress=Math.min(s.goal,s.progress+t))}const sd=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function rd(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,s,r,a,o]=sd[t];return{id:i,title:s,goal:r,progress:0,reward:a,claimed:!1,target:o}})}function ms(n){const e=Je(n),t=n.guests.filter(r=>r.roomId),i=r=>Math.max(0,Math.min(100,Math.round(r))),s=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((r,a)=>r+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(r=>!["dirty","cleaning","maintenance"].includes(r.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:s,total:Math.round(s.reduce((r,a)=>r+a.value,0)/s.length)}}function tu(n){const e=n.game.development,t=Je(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const zr={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function fs(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function lr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function ad(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=Ts(n);if(e.type==="invest"){const s=n.entities[e.id??""];if(s?.kind!=="facility")return!0;if(s.construction)return t.notice="该公区正在施工。",!0;const r=s.level??1;if(r>=5)return t.notice="该公区已达 5 级。",!0;lr(n,3500*r)&&(s.construction={remaining:120,total:120,targetLevel:r+1},Xs(n,s.id),ni(n,"upgrade"),fs(n,s.name+"开始封闭改造：2 小时后升级至 "+(r+1)+" 级。"))}if(e.type==="train"){const s=e.id;if(!Object.hasOwn(t.managers,s))return!0;const r=t.managers[s];if(r<1||r>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;lr(n,4500*r)&&(t.managers[s]++,fs(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;lr(n,2200)&&(i.campaignUntil=t.day+2,fs(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const s=zr[e.id];if(!s)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const r=e.id==="coffee"?"stock":"clubStock";if(t[r]<s.stock)return t.notice="活动库存不足，请先补货。",!0;lr(n,s.cost)&&(t[r]-=s.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},fs(n,s.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const s=tu(n).find(r=>r.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(i.claimed.push(s.id),n.metrics.cash+=s.reward,fs(n,"里程碑「"+s.title+"」奖励 ¥"+s.reward+" 已到账。"))}return!0}function od(n){const e=n.game,t=Ts(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const s=zr[i.id],r=n.entities["facility-"+s.role],a=n.guests.filter(d=>d.roomId),o=r?.kind==="facility"?r.level??1:1,l=r?.kind==="facility"?r.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),f=Math.round(u*s.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,ni(n,"revenue",f),ni(n,"ancillary",f),ni(n,"activity");for(const d of a.slice(0,u))d.satisfaction=Math.min(100,(d.satisfaction??90)+5),d.thought=s.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,fs(n,s.name+"结束："+u+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-s.cost)+"。")}const nu={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function li(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function xn(n,e,t="部门",i){const s=n.game;s.notice=e,s.logs.push({id:s.nextId++,day:s.day,minute:s.minute,category:t,text:e,target:i})}function $a(n,e){const t=li(n),i="profile-"+n.game.nextId++,s=$i(i),r=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][s%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(s/8)%8],persona:r[s%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function iu(n,e=n.game.price){const t=n.game,i=t.operations,s=(t.day-1)%7>=5,r=t.positioning==="business"?s?.75:1.3:t.positioning==="resort"?s?1.4:.9:1.1;return Math.max(1,Math.round((3+Je(n).length*.12)*r*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Qs(n){const e=n.game,t=e.operations,i=t.bookings.filter(d=>d.status!=="lost"),s=i.filter(d=>d.status==="confirmed"),r=n.guests.filter(d=>d.roomId&&!d.departing),a=r.filter(d=>(d.checkoutDay??e.day)>e.day).length,o=r.length-a,l=iu(n),c=Je(n).filter(d=>!d.construction).length,u=Math.min(c,a+s.length+Math.max(0,l-t.walkinArrivals)),f=d=>d.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:r.reduce((d,p)=>d+f(p),0),housekeeping:o+Je(n).filter(d=>d.status==="dirty"||d.status==="cleaning").length,suites:s.filter(d=>t.profiles[d.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(d=>d.segment==="商务").length,resort:i.filter(d=>d.segment==="度假").length,group:i.filter(d=>d.segment==="团队").length,price:e.price}}function el(n,e=!0){const t=n.game,i=li(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let s=(t.seed^Math.imul(t.day,2654435761))>>>0;const r=()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296),a=r();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=Je(n).filter(p=>!p.construction).length,l=o-n.guests.filter(p=>p.roomId&&(p.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(p=>p.visits>0&&!n.guests.some(g=>g.profileId===p.id)),f=new Set;for(let p=0;p<c;p++){let g=u.find(A=>!f.has(A.id)&&r()<.5);g||(g=$a(n,r())),f.add(g.id);const x=i.event==="expo"&&p<Math.ceil(c*.35)?"团单":r()<.6?"APP":"平台",h=t.positioning==="resort"||(t.day-1)%7>=5&&r()<.6,m={id:"booking-"+t.nextId++,profileId:g.id,source:x,eta:x==="团单"?840:780+Math.floor(r()*330),nights:jc(h,r(),r()),rate:Math.round(t.price*(x==="团单"?.88:1)),segment:x==="团单"?"团队":h?"度假":"商务",status:"confirmed"};if(p<2&&(m.challenge=g.persona==="auditplus"?"audit":g.persona==="family"?"family":g.tier==="Globalist"?"sua":"quiet"),m.challenge==="sua"){const A=Je(n).find(C=>Lt(C)&&C.status==="available"&&!C.suaBookingId);A?(m.sua=!0,m.roomId=A.id,A.suaBookingId=m.id,A.status="reserved"):m.challenge="quiet"}i.bookings.push(m)}const d=u.find(p=>p.trust>=2&&p.visits>=2);if(d&&l>i.bookings.length){const p=$a(n,r());p.referredBy=d.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:p.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Qs(n),e&&(t.paused=!0),xn(n,`早班准备：${i.bookings.length} 笔确认预订，${nu[i.event]}。`)}function ld(n,e){const t=li(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function cd(n,e,t){const i=li(n);let s=t?i.profiles[t.profileId]:void 0;s||(s=$a(n,$i(e.id)%100/100)),e.profileId=s.id,e.name=s.name,e.persona=s.persona,e.tier=s.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,e.satisfaction=Math.max(65,Math.min(98,88+s.trust*2))}function tl(n,e){const t=li(n),i=t.bookings.find(s=>s.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),xn(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const s=n.entities[i.roomId];s?.kind==="room"&&s.suaBookingId===i.id&&(s.suaBookingId=void 0,s.status==="reserved"&&(s.status="available"))}}function ud(n,e){const t=li(n),i=t.profiles[e.profileId??""];if(!i)return;const s=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(s?1:-1))),i.spend+=e.spend??0;const r=s?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:r}),i.history=i.history.slice(-8),s?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),xn(n,i.name+"："+r,"入住")}function dd(n,e){const t=n.game,i=li(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Qs(n),i.briefOpen=!1,t.paused=!1,xn(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",xn(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const s=n.guests.find(c=>c.id===e.id),r=s?.challenge;if(!s||!r||r.resolved)return!0;if(!s.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=r.kind==="quiet"&&e.value==="quiet"||r.kind==="family"&&e.value==="family"||r.kind==="audit"&&e.value==="inspect"||r.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,r.resolved=!0;let l=a&&(r.kind!=="sua"||!!s.upgrades);if(a&&r.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[s.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&r.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!Je(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&r.kind==="quiet"){const c=n.entities[s.roomId??""];if(c&&n.floors.some(f=>f.construction&&Math.abs(f.number-(n.floors.find(d=>d.id===c.floorId)?.number??0))<=1)){const f=Je(n).find(d=>d.status==="available"&&!d.construction&&!n.floors.some(p=>p.construction&&Math.abs(p.number-(n.floors.find(g=>g.id===d.floorId)?.number??0))<=1));l=!!f,f&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,f.status="occupied",f.guestId=s.id,f.nightsLeft=Math.max(0,(s.checkoutDay??t.day)-t.day),s.roomId=f.id,s.movement?.steps.length||Un(n,s,f.id))}}return s.serviceDone=l,s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(l?8:-8))),r.outcome=l?"需求已兑现":"未解决核心诉求",ni(n,"resolve"),Fn(n,s,l?"recovery":"denied"),xn(n,s.name+"："+r.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",s.roomId??"facility-lobby"),!0}return!1}const hn=(n,e,t=!1)=>Math.round(n*(Si(e)==="suite"&&t?1:ti[Si(e)].factor)*(1+((e.level??1)-1)*.1)),su=n=>2500*n,Ui=n=>n?Math.max(8,24-n*5):30,qs=n=>n?Math.max(10,35-n*7):40,Gr=n=>Math.max(140,260-n*20),Wa=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),ru={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function Nl(n,e,t,i="floor-lobby"){const s={id:e,name:ru[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(s),Js(n,s),s}function Ni(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function Ki(n,e,t,i,s){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:s},Un(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",xn(n,e.name+" 已接单。","部门",i),!0)}function fd(n,e,t){const i=n.game,s=li(n);for(const a of Object.keys(ru)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||Nl(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const r=Je(n).find(a=>a.timer&&!a.construction&&!Ni(n,a.id));if(r){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=Nl(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&Ki(n,a,r.status==="maintenance"?"repair":"clean",r.id,r.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(Js(n,a),Zc(n,a),Jc(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),ni(n,"service"),s.hkCompleted+=l.kind==="clean"?1:0,xn(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(f=>!(f.kind==="supplies"&&f.target===l.target)),s.stockDelivered++,xn(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(f=>!f.staff&&!f.roomId&&!f.departing);if(u){const f=s.bookings.find(x=>x.id===u.reservationId)?.roomId,d=Je(n).filter(x=>(x.status==="available"||x.status==="reserved"&&(x.suaBookingId===u.reservationId||!x.suaBookingId&&u.tier==="Globalist"))&&!x.construction),p=d.filter(x=>x.type==="suite"&&x.category!=="premium"),g=f?d.find(x=>x.id===f):u.tier==="Globalist"?p[0]??d[0]:d.find(x=>!(s.suitePolicy==="hold"&&p.length<=1&&p.includes(x)));g&&e({type:"checkin",id:u.id,roomId:g.id})}}ni(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=Zt(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=Je(n).find(c=>c.status==="dirty"&&!c.construction&&!Ni(n,c.id));if(l&&Ki(n,a,"clean",l.id,Ui(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=Je(n).find(c=>c.status==="maintenance"&&!c.construction&&!Ni(n,c.id));if(l&&n.metrics.cash>=100){Ki(n,a,"repair",l.id,qs(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!Ni(n,l)&&n.metrics.cash>=Gr(i.managers.fnb)){Ki(n,a,"stock",l,8)&&t(Gr(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){Ki(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&Zt(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&Ki(n,a,"patrol",c.id,10)}}}function hd(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,Xs(n,e.entityIds[0]),xn(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),Xs(n,e.id),xn(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function Jr(n,e){e.staff||(e.persona??=Object.keys(jo)[$i(e.id)%11],Js(n,e))}function pd(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function md(n,e){const t=n.game.minute,i=t/60,s=jo[e.persona??"chill"],r=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=s.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=pd(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&r.push({id:a.id,weight:o})}return r}function au(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function Fl(n,e,t){e.waitingFor=t,e.waitSince=Zt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function Ol(n,e,t,i){if(e.lastVisit=t.id,au(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:Zt(n)},Fl(n,e,t.id),Fn(n,e,"full");return}if(t.construction){Un(n,e,e.roomId);return}const s=t.role==="breakfast"||t.role==="club",r=t.role==="breakfast"?"stock":"clubStock";if(s&&n.game[r]<=0){e.experience={place:t.id,kind:"shortage",at:Zt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),Fn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),Fl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:Zt(n)},s&&(n.game[r]=Math.max(0,n.game[r]-(e.persona==="family"?3:1)));const a=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,o=Math.round(a*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));o&&(e.spend=(e.spend??0)+o,i.income(o),i.progress("ancillary",o)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,ps(n,e)}function Hr(n,e){e.departing=!0,e.movement?.steps.length||Un(n,e,"exit")}function gd(n,e,t,i){Jr(n,e);const s=e.movement,r=Zt(n),a=Zc(n,e);if(e.departing){a&&s.destination==="exit"&&(e.exitAt=r),!s.steps.length&&s.destination!=="exit"&&Un(n,e,"exit"),ps(n,e);return}if(!e.roomId){ps(n,e);return}if(a&&!e.waitingFor){const o=n.entities[s.destination];o?.kind==="facility"&&Ol(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!s.steps.length&&o?.kind==="facility"&&!o.construction&&au(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0)&&(o.role!=="club"||n.game.clubStock>0)?Ol(n,e,o,i):!s.steps.length&&r-(e.waitSince??r)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),Un(n,e,e.roomId)),ps(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",Fn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+kn(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!s.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[s.destination]?.kind==="facility"&&n.entities[s.destination].construction)&&Un(n,e,e.roomId),!s.steps.length&&r>=s.nextDecision)if(s.destination!==e.roomId)Un(n,e,e.roomId);else{const o=md(n,e);let l=t()*o.reduce((u,f)=>u+f.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)Un(n,e,c);else if(s.nextDecision=r+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;s.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:s.position.level,phase:"room"}],s.arrived=!1}}ps(n,e)}function vd(n,e,t){const i=n.game.guestMemory??={},s=eu(e);i[s]={visits:(i[s]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const r=(e.satisfaction??90)>=90;if(r&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(r?3:-2))),t.log("部门",r?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),Fn(n,e,"checkout")}const Xa={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},la=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,ou=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Vr(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,Je(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function pn(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function Qe(n,e,t,i){const s=n.game;s.notice=t,s.logs.push({id:s.nextId++,day:s.day,minute:s.minute,category:e,text:t,target:i})}function on(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function nl(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,ni(n,"revenue",e)}function Qn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const ln=ni,lu=rd;function qa(){const n=Wc();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:lu(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=Lt(t)?900:650,e.satisfaction=90,e.segment="商务"}for(const e of Je(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return Ts(n),n.guests.forEach(e=>Jr(n,e)),Ya(n),el(n),Qe(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),il(n),n}function Ya(n,e){const t=n.game,i=pn(n),s=["陈","林","何","张","周","王","李","赵"][Math.floor(pn(n)*8)]+"先生",r=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&pn(n)<.65,o=jc(a,pn(n),pn(n)),l={id:"guest-"+t.nextId++,name:s,tier:r,floorId:"floor-lobby",thought:r==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[s]??0)};cd(n,l,e),Jr(n,l),l.goh=l.tier==="Globalist"&&pn(n)<.12,l.sua=!!e?.sua,Fn(n,l,"arrival"),n.guests.push(l),t.arrivals++,Qe(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const jn=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function il(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function _d(n,e){e.roomId&&Un(n,e,e.roomId)}function xd(n){const e=n.game,t=Je(n);let i=0,s=0;for(const u of n.guests)if(u.roomId){const f=u.rate??e.price;if(i+=f,u.spend=(u.spend??0)+f,u.source==="平台"){const d=Math.round(f*.15);n.metrics.cash-=d,e.expense+=d}s++}nl(n,i),e.nights=s;for(const u of jn(n))tl(n,u),Hr(n,u);const r=380+t.length*65+Object.values(e.managers).reduce((u,f)=>u+f*180,0);n.metrics.cash-=r,e.expense+=r;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=s?Math.round(i/s):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Vr(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(s/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:ms(n).total});const c=Ts(n).scores;c.push({day:e.day,value:ms(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Qn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),Qe(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function Md(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=pn(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=lu(e.day);for(const t of Je(n))if(t.guestId){const i=n.guests.find(s=>s.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=Wa(Vr(n)>1.1?750:590,e.level,e.managers.revenue)),el(n),Qe(n,"部门",`${ou(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Vr(n)*100)}%。`)}function bd(n,e){const t=n.game;if(!t||t.paused)return;const i={income:s=>nl(n,s),reputation:s=>Qn(n,s),log:(s,r,a)=>Qe(n,s,r,a),progress:(s,r=1)=>ln(n,s,r)};id(n);for(let s=0;s<e&&!t.paused;s++){t.minute++,hd(n),fd(n,a=>Ka(n,a),a=>on(n,a)),ld(n,a=>Ya(n,a)),od(n);const r=Je(n);t.roomMinutes+=r.length,t.soldMinutes+=r.filter(a=>a.status==="occupied").length,t.closedMinutes+=r.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of r)a.timer&&!a.construction&&!Ni(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",ln(n,"service"),Qe(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));jn(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(gd(n,a,()=>pn(n),i),Jc(a),a.departing){a.exitAt!==void 0&&Zt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(tl(n,a),Hr(n,a),t.lost++,t.complaints++,Qn(n,-1),Qe(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=Qc(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",Qe(n,"客诉",`${a.name} 的 ${kn(a)} 未确认，按 ${Gi(a)}:00 退房。`,o.id),Qn(n,-1)),ud(n,a),vd(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,Hr(n,a),Qe(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(jn(n).length<8&&Ya(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/iu(n)*(.7+pn(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=r.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(pn(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),Qe(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(pn(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?Ka(n,{type:"resolve",id:String(a.id),value:"sop"}):!Ni(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Qn(n,-2),Qe(n,"客诉",`未及时处理：${a.title}`,a.target))}nd(n),t.minute>=1440&&xd(n)}il(n)}function Ka(n,e){const t=n.game;if(!t||dd(n,e)||ad(n,e))return;const i=e.id?n.entities[e.id]:void 0,s=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const r=jn(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!r||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&r.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===r.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}r.roomId=a.id,r.checkoutDay=t.day+(r.stayLength??2),r.rate=r.bookedRate??hn(t.price,a,r.tier==="Globalist"),r.upgrades=Lt(a)&&r.tier==="Globalist",r.denied=r.tier==="Globalist"&&!qc(a),r.upgrades?(t.upgrades++,ln(n,"vip"),Qn(n,1)):r.tier==="Globalist"&&Je(n).some(l=>Lt(l)&&l.status==="available")&&Qn(n,-1);const o=t.operations?.bookings.find(l=>l.id===r.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=r.id,a.nightsLeft=r.stayLength??2,_d(n,r),Fn(n,r,r.denied?"denied":"checkin"),ln(n,"arrivals"),Qe(n,"入住",`${r.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${r.rate}/晚${r.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const r=jn(n).find(a=>a.id===e.id);r&&(tl(n,r),Hr(n,r),Fn(n,r,"denied"),t.lost++,Qe(n,"入住",`已为 ${r.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":s?.status==="dirty"&&on(n,90)&&(s.status="cleaning",s.timer=30,Qe(n,"房态",`${s.number} 开始清洁，约 30 游戏分钟。`,s.id));break;case"repair":s?.status==="maintenance"&&!s.construction&&!s.timer&&!Ni(n,s.id)&&on(n,180)?(s.timer=40,Qe(n,"房态",`${s.number} 开始维修。`,s.id)):i?.kind==="facility"&&on(n,200)&&(i.maintenance=100,Qe(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(s?.status!=="unbuilt"||n.floors.find(l=>l.id===s.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[r,a]=String(e.value).split(":");if(!Object.hasOwn(ti,r)||!["king","twin"].includes(a))break;const o=r;if(!on(n,ti[o].cost))break;s.category=o,s.bed=a,s.type=o==="suite"||o==="premium"?"suite":s.bed,s.status="available",s.level=1,Xs(n,s.id),Qe(n,"升级",`${s.number} 已设置为 ${ti[o].name} · ${a==="twin"?"双床":"大床"}。`,s.id);break}case"upgrade":s?.status==="available"&&(s.level??1)<5&&on(n,su(s.level??1))&&(s.construction={remaining:90,total:90,targetLevel:(s.level??1)+1},s.status="maintenance",Xs(n,s.id),ln(n,"upgrade"),Qe(n,"升级",`${s.number} 封闭装修：90 分钟后升级竣工。`,s.id));break;case"reserve":s?.status==="available"&&Lt(s)&&(s.status="reserved",Qe(n,"房态",`${s.number} 预留给 Globalist / SUA。`,s.id));break;case"release":s?.status==="reserved"&&!s.suaBookingId&&(s.status="available",Qe(n,"房态",`${s.number} 已释放预留。`,s.id));break;case"hire":{const r=e.id;if(!Object.hasOwn(Xa,r)||t.managers[r])break;on(n,3800)&&(t.managers[r]=1,ln(n,"delegate"),Qe(n,"部门",`${Xa[r]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const r=e.id==="club"?"clubStock":"stock";if(t[r]>=120){t.notice="库存充足，不必继续采购。";break}on(n,300)&&(t[r]=Math.min(160,t[r]+50),ln(n,"stock"),Qe(n,"部门",`${r==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(r==="stock"?"breakfast":"club")));break}case"resolve":{const r=t.events.find(c=>c.id===Number(e.id));if(!r)break;const a=r.kind==="repair"?"engineering":r.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!on(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==r.id);const l=n.entities[r.target];r.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,ln(n,"service")),r.kind==="supplies"&&(t.stock+=25),ln(n,"resolve"),Qn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&ln(n,"delegate"),Qe(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${r.title}」，口碑 +${o?2:1}。`,r.target);break}case"expand":{const r=n.floors.filter(l=>l.role==="guest");if(!on(n,1e4+5e3*(r.length-3)))break;const a=r.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}Ul(n,2+r.length),n.floors.splice(2+r.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,Qe(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const r=n.guests.find(a=>a.id===e.id);if(!r?.roomId||r.late!=="pending")break;r.late=e.value==="honor"?"honor":"deny",r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(r.late==="honor"?4:-3))),ln(n,"late-decision"),Qn(n,r.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(r.late==="honor"?-1:1))),Fn(n,r,r.late==="honor"?"late-honor":"late-deny"),Qe(n,"入住",`${r.name} 已确认 ${r.late==="honor"?kn(r):Gi(r)+":00"} 退房。`,r.roomId);break}case"guest-service":{const r=n.guests.find(a=>a.id===e.id);if(!r?.roomId||r.serviceDone)break;on(n,120)&&(r.serviceDone=!0,r.satisfaction=Math.min(100,(r.satisfaction??90)+6),Fn(n,r,"recovery"),ln(n,"resolve"),Qe(n,"部门",`${r.name} 的个性化服务已安排：${r.thought}`,r.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(on(n,12e3)){const r=n.floors.findIndex(a=>a.role==="rooftop");Ul(n,r),n.floors.splice(r,0,{id:"floor-spa",number:r,label:r+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),Qe(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),Qe(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,Qe(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&Md(n);break;case"claim":{const r=t.tasks.find(a=>a.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(r.claimed=!0,nl(n,r.reward),Qe(n,"收益",`完成「${r.title}」，奖励 ¥${r.reward}。`));break}}il(n)}function Za(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))Za(e)}return n}function yd(n=Wc()){let e=Za(structuredClone(n));const t=new Set,i=s=>{e=Za({...e,...s}),t.forEach(r=>r(e))};return{getState:()=>e,subscribe(s){return t.add(s),()=>t.delete(s)},select(s){if(s!==null&&!e.entities[s])throw new Error("Unknown entity: "+s);i({selectedId:s,visited:s?[...new Set([...e.visited,s])]:e.visited})},focusFloor(s){if(!e.floors.some(r=>r.id===s))throw new Error("Unknown floor: "+s);i({focusedFloorId:s})},setSpeed(s){if(![1,2,4].includes(s))throw new Error("Invalid speed");i({speed:s})},setAtmosphere(s){if(!["dusk","night","day"].includes(s))throw new Error("Invalid atmosphere");i({atmosphere:s})},dispatch(s){const r=structuredClone(e);Ka(r,s),i(r)},advance(s){if(!e.game||e.game.paused)return;const r=structuredClone(e);bd(r,s),i(r)},reset(){i(qa())}}}const fi={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},Ja={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},gs=2.55,Sd=[-4.93,0,4.93];function Qa(n){const e={hub:"M3 10 12 3l9 7v11h-6v-7H9v7H3Z",hotel:"M3 20V9h18v11M3 16h18M5 9V5h14v4M7 12h3m4 0h3",front:"M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a6 6 0 0 1 12 0v3m3-17a4 4 0 0 1 0 8m0 3a5 5 0 0 1 5 5",operations:"M4 21v-6m8 6V9m8 12V3M1 15h6m2-6h6m2-6h6",development:"m14 4 6 6M3 21l9-9m0-6 6-4 4 4-4 6-6-6Z",brief:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2",evening:"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",tasks:"M5 4h14v18H5ZM9 2h6v4H9ZM8 11l2 2 5-5m-7 9h8",report:"M3 21h19M6 17V9m6 8V3m6 14v-6",history:"M4 4h16v17H4ZM8 8h8m-8 4h8m-8 4h5",log:"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16",bookings:"M3 5h18v17H3ZM7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"};return`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${e[n]??e.hub}"/></svg>`}function vs(n){const e=["hotel","report","history"].includes(n),t=n==="evening";return`<svg class="space-art" viewBox="0 0 160 110" aria-hidden="true" focusable="false"><defs><linearGradient id="wall-${n}" x2="1" y2="1"><stop stop-color="${t?"#5c665d":"#eee2ca"}"/><stop offset="1" stop-color="${t?"#303d36":"#b6a489"}"/></linearGradient></defs><path fill="url(#wall-${n})" d="M0 0h160v110H0z"/><path fill="#7c6249" d="m0 89 91-26 69 21v26H0"/><path fill="${t?"#344d50":"#a5b4ad"}" d="M79 7h56v59H79z"/><path fill="none" stroke="#e8dfc7" stroke-width="3" d="M78 7h58v60H78zM105 7v59"/><path fill="#fff6d0" opacity=".25" d="m79 66-56 44h66l45-44"/><path fill="#a78b66" d="M23 0h6v82h-6zm10 0h4v80h-4zm9 0h3v76h-3"/><path fill="#e9ddc2" d="M70 5h7v65h-7zm69 0h8v72h-8"/>${e?'<path fill="#735b45" d="m38 63 42-13 52 21-42 20-52-16z"/><path fill="#ded4bf" d="m39 57 43-11 50 20-43 19-50-15z"/><path fill="#fcf7e8" d="m41 56 40-11 28 11-41 14z"/><path fill="#617565" d="m68 70 41-14 22 10-42 19z"/><path fill="#fffaf0" d="m47 55 14-4 13 5-15 5zm19-6 13-4 13 5-13 5z"/>':'<path fill="#8b7357" d="m42 67 44-13 39 16v23l-39 15-44-17z"/><path fill="#e9dbc2" d="m40 62 46-13 42 16-43 16-45-16z"/><path fill="#40584b" d="m19 76 17-6 16 7v20l-18 7-15-9z"/><path fill="#6e8670" d="m18 71 17-6 18 8-19 7z"/>'}<path stroke="#a58b55" stroke-width="3" d="M151 77V41"/><path fill="#ffe6a3" d="m139 44 6-18h11l4 18z"/><path fill="#ae9776" d="M6 90h15l-2 17H9z"/><path fill="${n==="tasks"||n==="development"?"#3a6041":"#50654b"}" d="M14 94C-8 65 5 46 14 82 5 29 28 48 17 83 36 49 39 83 14 94Z"/><path stroke="#f9e9b6" opacity=".6" d="M0 109h160"/></svg>`}const Fi=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),hi=(n,e,t)=>`<button class="hub-tile" data-open="${t}">${Qa(t)}<div class="tile-copy"><strong>${n}</strong><small>${e}</small></div><div class="tile-scene">${vs(t)}</div><span class="tile-arrow" aria-hidden="true">›</span></button>`;function sl(n){const e=n.game;return[...e.events.map(t=>({key:"event-"+t.id,title:t.title,detail:`剩余 ${Math.max(0,t.expires-e.day*1440-e.minute)} 分钟`,urgent:!0,button:`<button class="game-action" data-entity="${Fi(t.target)}">现场</button><button class="game-action" data-action="resolve" data-id="${t.id}" data-value="gm">亲自处理 · ¥350</button>`,note:"直接协调支出较高；授权方案在待办详情中。"})),...Je(n).filter(t=>t.status==="dirty").map(t=>({key:t.id,title:t.number+" · 待翻房",detail:"客房部 · 清洁后才可出售",urgent:!1,button:`<button class="game-action" data-action="clean" data-id="${t.id}">清洁 · ¥90</button>`,note:"约 30 游戏分钟；等待主管可节省手动清洁费。"})),...n.guests.filter(t=>!t.staff&&!t.departing&&!t.roomId).map(t=>({key:t.id,title:t.name+" · 等待入住",detail:`${t.tier} · 耐心 ${t.patience??0} 分钟`,urgent:(t.patience??100)<45,button:`<button class="game-action" data-open="front" data-guest="${Fi(t.id)}">为他选房 →</button>`,note:t.reservationId?"确认预订未兑现需支付 ¥600 安置费。":"临时到店客人，先比较空房与留套需要。"})),...n.guests.filter(t=>!t.departing&&t.roomId&&(t.late==="pending"||t.challenge&&!t.challenge.resolved)).map(t=>({key:t.id,title:t.name+" · 服务待确认",detail:t.late==="pending"?"晚退请求":"特殊安排",urgent:!1,button:`<button class="game-action" data-open="events" data-guest="${Fi(t.id)}">处理诉求 →</button>`,note:"查看真实诉求与条件，欢迎礼不代替承诺。"})),...e.stock<20?[{key:"breakfast-stock",title:"早餐库存偏低",detail:`剩余 ${e.stock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="breakfast">补 50 份 · ¥300</button>',note:"提前备货减少断供风险；先保留必要现金。"}]:[],...e.clubStock<20?[{key:"club-stock",title:"酒廊库存偏低",detail:`剩余 ${e.clubStock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="club">补 50 份 · ¥300</button>',note:"晚间服务仍在继续，补货会增加今天成本。"}]:[]].sort((t,i)=>Number(i.urgent)-Number(t.urgent))}function ja(n,e=4){const t=sl(n);return`<section class="work-list"><div class="hub-section-title"><h3>现在需要处理 <small>${t.length}</small></h3>${t.length>e?'<button data-open="worklist">查看全部 →</button>':""}</div>${t.slice(0,e).map(i=>`<article class="work-item" data-work-key="${Fi(i.key)}"><div><strong>${Fi(i.title)}</strong><small>${Fi(i.detail)}</small></div>${i.urgent?'<span class="urgency">优先</span>':""}<div class="work-actions">${i.button}</div><small class="work-trade">${Fi(i.note)}</small></article>`).join("")||'<p class="empty">没有积压事项，关上面板看看酒店里的客人。</p>'}</section>`}function Ed(n){const e=n.game,t=Je(n),i=sl(n).length;return`<h2>今天怎么经营？</h2><p class="hub-subtitle">Day ${e.day} · ${t.filter(s=>s.status==="occupied").length} / ${t.length} 间在住 · ${i} 项现场事项</p><div class="hub-grid">${hi("08:00 晨会","预订、需求与今天的决定","brief")}${hi("20:00 复盘",e.evening?"回看客诉与总部建议":"晚间自动开会","evening")}${hi("今日目标",e.tasks.filter(s=>s.claimed).length+" / "+e.tasks.length+" 项已领奖","tasks")}${hi("财务与评分","收入、成本与经营表现","report")}</div>${ja(n)}<details class="manager-card"><summary>经营档案与长期计划</summary><div class="hub-grid">${hi("客史记录","上次承诺，这次兑现","history")}${hi("经营日志","追溯决定与结果","log")}${hi("投资计划","扩建、营销与主题活动","development")}${hi("今日预订","APP、团单与平台客人","bookings")}</div></details>`}const kl={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function Mn(n){const e=typeof n=="string"?n:n.persona??"chill",t=kl[e]??kl.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",s=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",r=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${s}${r}</svg></span>`}function rl(n,e){return`<section class="guest-card person-card">${Mn(n)}<div class="person-body"><div class="person-heading"><strong>${String(n.name).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}</strong><span class="person-tier">${n.tier}</span></div>${e}</div></section>`}const Td=()=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:"overview",category:"standard",bed:"king"}),St=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Wt=n=>"¥"+Math.round(n).toLocaleString("en-US"),nt=(n,e,t="",i="",s="")=>`<button class="game-action" data-action="${e}" data-id="${St(t)}" data-value="${St(i)}" ${s}>${n}</button>`,ct=(n,e)=>`<button class="game-action" data-open="${e}">${n}</button>`,Cn=(n,e,t,i=!1)=>`<button data-focus-key="${e}" data-focus-value="${St(t)}" aria-pressed="${i}">${n}</button>`,Vn=n=>`<div class="focus-tabs">${n}</div>`,jt=n=>`<div class="focus-metrics">${n.map(([e,t])=>`<div><small>${e}</small><strong>${t}</strong></div>`).join("")}</div>`,Xt=(n,e,t)=>`<div class="focus-person">${Mn(n)}<div><strong>${St(e)}</strong><p>${St(t)}</p></div></div>`,qt=(n,e,t)=>`<section class="focus-screen"><h2>${n}</h2><div class="focus-main">${e}</div></section><div class="focus-footer">${t}</div>`,cr=(n,e,t)=>`<div class="focus-pager">${Cn("‹ 上一项",n,String(Math.max(0,e-1)))}<span>${t?e+1:0} / ${t}</span>${Cn("下一项 ›",n,String(Math.min(Math.max(0,t-1),e+1)))}</div>`;function Ad(n,e,t){const i=n.game,s=Je(n),r=n.guests.filter(o=>!o.staff&&!o.departing&&!o.roomId),a=sl(n);if(e==="hub")return qt("今天怎么经营？",jt([["现金",Wt(n.metrics.cash)],["在住",s.filter(o=>o.status==="occupied").length+"/"+s.length],["待处理",String(a.length)]])+`<div class="focus-shortlist">${a.slice(0,3).map(o=>`<div><span><strong>${St(o.title)}</strong><small>${St(o.detail)}</small></span>${o.button}</div>`).join("")||"<p>现场没有积压，可以继续经营。</p>"}</div>`+Xt("front","先处理眼前的三件事","做完一件，下一件自动补上；无需返回目录。"),ct("08:00 晨会","brief")+ct("全部待办","events")+ct("20:00 复盘","evening"));if(e==="front"){const o=t.guest?Math.max(0,r.findIndex(f=>f.id===t.guest)):Math.min(t.guestPage,Math.max(0,r.length-1)),l=r[o];if(!l)return qt("客人接待",Xt("front","目前无人排队","关上面板继续经营，客人到店后会提醒你。"),ct("今日预订","bookings")+ct("回到酒店","hub"));const c=s.filter(f=>f.status==="available"||f.status==="reserved"&&l.tier==="Globalist"&&(!f.suaBookingId||f.suaBookingId===l.reservationId)).sort((f,d)=>+(!!d.suaBookingId&&d.suaBookingId===l.reservationId)-+(!!f.suaBookingId&&f.suaBookingId===l.reservationId)||(l.tier==="Globalist"?Number(Lt(d))-Number(Lt(f)):+(f.type==="suite")-+(d.type==="suite"))),u=Math.min(t.roomPage,Math.max(0,Math.ceil(c.length/2)-1));return qt("给这位客人一间房",cr("guestPage",o,r.length)+`<div class="focus-person">${Mn(l)}<div><strong>${St(l.name)} · ${St(l.tier)}</strong><p>${St(l.thought)}</p></div></div>`+jt([["住宿",`${l.stayLength} 晚`],["耐心",`${l.patience} 分钟`],["来源",St(l.source??"Walk-in")]])+`<div class="focus-room-choices">${c.slice(u*2,u*2+2).map(f=>`<button data-action="checkin" data-id="${St(l.id)}" data-room="${f.id}">${vs("hotel")}<strong>${f.number} · ${$s(f)}</strong><small>${l.tier==="Globalist"&&Lt(f)?"免费升套 · 占用标准套库存":"点击安排入住"}</small></button>`).join("")||"<p>暂无空房，先清洁或查看预留。</p>"}</div>`+(c.length>2?cr("roomPage",u,Math.ceil(c.length/2)):"")+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',ct("查看房态","hotel")+nt("婉拒本次","reject",l.id))}if(e==="events"||e==="worklist"){const o=[];for(const u of n.guests.filter(f=>!f.departing&&f.roomId)){if(u.challenge&&!u.challenge.resolved){const f=u.challenge.kind,d={quiet:["需要安静的房间","quiet","有施工噪声时需要另有安静空房。"],sua:["核对 SUA 标准套房","inventory","已入住标准套才能兑现；欢迎礼不能替代。"],family:["早餐和加床一起安排","family",`需要 6 份早餐库存，当前 ${i.stock} 份。`],audit:["检查房间与服务流程","inspect","需客房、工程主管在岗，且无待修房。"]}[f];o.push({id:u.id,body:`<div class="focus-person">${Mn(u)}<div><strong>${St(u.name)} · ${St(u.tier)}</strong><p>${d[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${d[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:nt("落实 · ¥180","guest-choice",u.id,d[1])+nt("欢迎礼 · ¥100","guest-choice",u.id,"gift")+nt("不作安排","guest-choice",u.id,"decline")})}u.late==="pending"&&o.push({id:u.id+"-late",body:`<div class="focus-person">${Mn(u)}<div><strong>${St(u.name)} · ${St(u.tier)}</strong><p>希望 ${kn(u)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:nt("同意 "+kn(u),"late",u.id,"honor")+nt("协商 "+Gi(u)+":00","late",u.id,"deny")})}for(const u of i.events){const f=u.kind==="repair"?"engineering":u.kind==="supplies"?"fnb":"front";o.push({id:"event-"+u.id,body:Xt(f,u.title,`剩余 ${Math.max(0,u.expires-i.day*1440-i.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${i.managers[f]?"主管已到岗，可以授权处理。":"对应主管尚未到岗；可先亲自处理，避免超时。"}</p></div>`,actions:nt("亲自处理 · ¥350","resolve",String(u.id),"gm")+(i.managers[f]?nt("交给主管 · ¥150","resolve",String(u.id),"sop"):ct("聘任主管","operations"))})}for(const u of a.filter(f=>!o.some(d=>d.id===f.key)&&!n.guests.some(d=>d.roomId&&d.id===f.key)))o.push({id:u.key,body:Xt("front",u.title,u.detail)+`<div class="focus-decision"><p>${St(u.note)}</p></div>`,actions:u.button});const l=t.event?Math.max(0,o.findIndex(u=>u.id===t.event)):Math.min(t.eventPage,Math.max(0,o.length-1)),c=o[l];return qt("逐件处理 · "+o.length+" 项",c?cr("eventPage",l,o.length)+c.body:Xt("front","待办全部处理完了","关上面板，回到酒店看决定如何发生。"),c?.actions??ct("回到经营","hub"))}if(e==="hotel"||e==="entity"){const o=n.floors.filter(h=>h.role==="guest"),l=n.floors.find(h=>h.id===(t.floor??n.entities[t.room??""]?.floorId))??o[0];if(!l)return null;const c=Qo(n).filter(h=>h.floorId===l.id),u=c.find(h=>h.id===t.room)??c[0];if(!u)return null;t.room=u.id,t.floor=l.id;const f=Vn(o.map(h=>Cn(h.label,"floor",h.id,h.id===l.id)).join(""))+`<div class="focus-room-map">${c.map(h=>Cn(h.number+"<small>"+{available:"可入住",occupied:"在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"封闭",reserved:"已预留",unbuilt:"＋设置"}[h.status]+"</small>","room",h.id,h.id===u.id)).join("")}</div>`,d=u.construction??l.construction;if(d)return qt(u.number+" · 封闭施工",f+`<div class="focus-space">${vs("hotel")}</div>`+jt([["剩余",d.remaining+" 分钟"],["完成后","开放使用"]]),ct("扩建与全部参数","hotel-data"));if(u.status==="unbuilt")return qt(u.number+" · 设置房型",f+Vn(Object.entries(ti).map(([h,m])=>Cn(m.name,"category",h,t.category===h)).join(""))+Vn(Cn("大床","bed","king",t.bed==="king")+Cn("双床","bed","twin",t.bed==="twin"))+jt([["配置费用",Wt(ti[t.category].cost)],["新客房价",Wt(i.price*ti[t.category].factor)+"起"]])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',nt("确认设置","configure-room",u.id,t.category+":"+t.bed));const p=n.guests.find(h=>h.id===u.guestId),g=u.level??1,x=u.status==="dirty"?nt("清洁 · ¥90","clean",u.id):u.status==="maintenance"&&!u.timer?nt("维修 · ¥180","repair",u.id):u.status==="available"?ct("安排入住","front")+(g<5?nt("装修 · "+Wt(g*2500),"upgrade",u.id):"")+(Lt(u)?nt("留给会员","reserve",u.id):""):u.status==="reserved"&&!u.suaBookingId?nt("释放预留","release",u.id):p?`<button class="game-action" data-open="events" data-guest="${p.id}">处理诉求</button>`:"";return qt(u.number+" · "+$s(u),f+`<div class="focus-space">${vs("hotel")}<span>Lv.${g} · ${p?St(p.name):"暂无住客"}</span></div>`+jt([["每晚房费",Wt(p?.rate??hn(i.price,u))],["剩余住宿",u.nightsLeft+" 晚"],["升级增收",g<5?"每新客晚 +"+Wt(hn(i.price,{...u,level:g+1})-hn(i.price,u)):"已满级"]])+`<p class="focus-trade">${u.status==="available"?"装修需停卖 90 分钟；已确认订单价格不变。":p?St(p.thought):"等清洁或维修完成后，才能再次出售。"}</p>`,x+ct("房间明细","room-data"))}if(e==="operations"){const o={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},l=t.department??"house",c=i.managers[l],u=c?4500*c:3800,f={front:"自动分房与常规诉求；无空房仍需等待。",house:`每间清洁 ${Ui(c)} → ${Ui(Math.min(3,c+1))} 分钟，另需到场时间。`,engineering:`维修 ${qs(c)} → ${qs(Math.min(3,c+1))} 分钟，另需到场时间。`,fnb:"低库存时派员工配送，到餐台后才计入库存。",revenue:"次日自动定价；报价更高也可能减少客流。"}[l];return qt("团队 · 原位授权",Vn(Object.entries(o).map(([d,p])=>Cn(p,"department",d,d===l)).join(""))+Xt(l,o[l]+"主管",c?"已到岗 · Lv."+c:"尚未聘任")+jt([["投入",c>=3?"已满级":Wt(u)],["每日工资",Wt(c*180)+" → "+Wt(Math.min(3,c+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${f}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(c<3?nt(c?"培训升级":"聘任到岗",c?"train":"hire",l):"")+ct("效果与财务明细","operations-data"))}if(e==="development"){const o=Object.values(n.entities).filter(u=>u.kind==="facility"),l=o.find(u=>u.id===t.facility)??o[0];if(!l)return null;const c=l.level??1;return qt("设施 · 看清再投资",Vn(o.map(u=>Cn(u.name,"facility",u.id,u.id===l.id)).join(""))+`<div class="focus-space">${vs(l.role==="rooftop"?"evening":"hotel")}<span>${l.name} · Lv.${c}</span></div>`+jt([["使用 / 容量",l.usage+" / "+l.capacity],["升级后容量",String(l.capacity+4)],["费用",Wt(c*3500)]])+`<p class="focus-trade">${l.construction?"施工剩余 "+l.construction.remaining+" 分钟。":"升级需封闭施工；先补货或维护可解决眼前问题。"}</p>`,(l.construction?"":(c<5?nt("升级设施","invest",l.id):"")+(["breakfast","club"].includes(l.role)?nt("补货 · ¥300","stock",l.role):nt("维护 · ¥200","repair",l.id)))+ct("营销、活动、更多","development-data"))}if(e==="brief"){const o=Qs(n),l=t.meeting,c=l==="price"?Xt("revenue","今天挂牌多少？","高价增加单晚收入，也可能减少 Walk-in。")+jt([["当前挂牌",Wt(i.price)],["预计入住",o.occupancy+"%"]])+Vn(nt("¥720 · 争取入住","price","","720")+nt("¥850 · 提高单价","price","","850")):l==="service"?Xt("fnb","先备好今天的服务",`早餐预计 ${o.breakfast} 人，当前 ${i.stock} 份。`)+jt([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"]])+Vn(nt("早餐 +50 · ¥300","stock","breakfast")+nt("酒廊 +50 · ¥300","stock","club")):l==="suite"?Xt("front","套房要留一间吗？","留套照顾会员；开放销售保留付费机会。SUA 锁房不变。")+jt([["当前策略",i.operations?.suitePolicy==="hold"?"保留一间":"开放销售"]])+Vn(nt("保留一间","suite-policy","","hold")+nt("开放销售","suite-policy","","sell")):jt([["预计入住",o.occupancy+"%"],["确认预订",String(i.operations?.bookings.length??0)],["早餐需求",o.breakfast+" 人"]])+Xt("revenue","Day "+i.day+" · 开始前做一个判断",o.breakfast>i.stock?"早餐需求超过库存，建议先备货。":o.occupancy>=90?"预计接近满房，谨慎继续投广告。":"今天还有接客空间，可保留现价，也可以调整报价。");return qt("08:00 · 晨会",Vn(["overview","price","service","suite"].map((u,f)=>Cn(["重点","房价","备货","套房"][f],"meeting",u,u===l)).join(""))+c,i.operations?.briefOpen?nt("按当前决定开始今天","brief-start")+ct("预订 / 客源明细","bookings"):ct("回到经营","hub")+ct("完整预测","brief-data"))}if(e==="evening"||e==="report"){const o=i.evening,l=i.reports.at(-1);if(e==="evening"&&!o)return qt("20:00 · 晚间复盘",Xt("revenue","今晚 20:00 自动开会","继续经营，届时核对收入、客诉与总部建议。"),ct("回到经营","hub"));if(e==="report"&&!l)return qt("今日尚未日结",Xt("revenue","房费于午夜结算","现在可以查看 20:00 快照，或继续经营。"),ct("晚间复盘","evening"));const c=e==="evening"?o.notes[0]?.text:l.recommendation;return qt(e==="evening"?"20:00 · 今天经营得如何？":"Day "+l.day+" · 日结",jt(e==="evening"?[["预计净额",Wt(o.projectedNet)],["入住率",o.occupancy+"%"],["待办",String(o.pending)]]:[["净额",Wt(l.revenue-l.expense)],["入住率",l.occupancy+"%"],["客诉",String(l.complaints)]])+Xt("revenue","今晚优先改进",c??"保持服务节奏。")+'<p class="focus-trade">'+(e==="evening"?"这是 20:00 快照；预计房费还未入账。":"这是午夜结算结果。")+"</p>",ct("客诉 / 明细",e==="evening"?"evening-data":"report-data")+(e==="evening"&&o?.open?nt("交给夜班 · 继续经营","evening-close"):i.reportOpen?nt("开始下一天","continue"):ct("回到经营","hub")))}if(e==="tasks"){const o=Math.min(t.taskPage,i.tasks.length-1),l=i.tasks[o];return l?qt("今天的目标",cr("taskPage",o,i.tasks.length)+Xt("front",l.title,"把任务与眼前的酒店问题一起解决。")+jt([["进度",l.progress+" / "+l.goal],["奖励",Wt(l.reward)]])+`<progress max="${l.goal}" value="${l.progress}"></progress>`,l.claimed?ct("长期目标与带教","tasks-data"):(l.progress>=l.goal?nt("领取奖励","claim",l.id):ct("去完成",l.target))+ct("全部目标","tasks-data")):null}return null}const Nn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),wd={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Zn=(n,e)=>`<button class="game-action" data-open="${e}">${n} →</button>`;function Et(n,e,t,i,s,r=""){return`<aside class="head-advice">${Mn(e)}<div><small>${wd[e]}主管 · ${n.game.managers[e]?"在岗建议":"筹备建议 · 尚未聘任"}</small><h3>${Nn(t)}</h3><p>${Nn(i)}</p>${s?`<p class="trade-off">${Nn(s)}</p>`:""}${r?`<div class="action-row">${r}</div>`:""}</div></aside>`}function Rd(n,e){const t=n.game,i=Je(n),s=n.guests.filter(o=>!o.staff&&!o.roomId&&!o.departing),r=i.filter(o=>o.status==="dirty"),a=n.guests.filter(o=>!o.departing&&(o.late==="pending"||o.challenge&&!o.challenge.resolved)).length+t.events.length;return e==="front"?Et(n,"front",s.length?`${s.length} 位客人在等房`:"前台暂时不忙","先接待即将失去耐心的客人；SUA 客人优先核对已锁标准套。","免费升套占用套房库存；拒绝确认预订需支付 ¥600 安置费。"):e==="events"?Et(n,"front",a?`${a} 项诉求需要决定`:"目前没有待办","先看客人的核心诉求，再决定亲自处理还是授权主管。","欢迎礼不能代替承诺；晚退让客人满意，也把翻房时间推迟。"):e==="hotel"||e==="entity"?Et(n,"house",r.length?`${r.length} 间脏房还不能卖`:"让现有房间先创造收入",r.length?"建议先翻房，再考虑花钱扩建。":"空房可以接客，也可以停卖装修；先看今天还有多少人要来。","清洁 ¥90 / 间；装修停卖 90 分钟，扩建封闭 240 分钟。",e==="hotel"&&r[0]?`<button class="game-action" data-entity="${r[0].id}">先看 ${r[0].number} →</button>`:""):e==="operations"?t.stock<20||t.clubStock<20?Et(n,"fnb","餐台快见底了",`早餐 ${t.stock} 份，酒廊 ${t.clubStock} 份；先补短缺的餐台。`,"每次采购 ¥300 / 50 份；聘任后能自动配送，但要付每日工资。",`<button class="game-action" data-action="stock" data-id="${t.stock<20?"breakfast":"club"}">补足低库存 · ¥300</button>`):Et(n,"house",r.length?"翻房开始积压":"把重复工作交给团队",r.length?`还有 ${r.length} 间脏房；先比较自己处理与长期授权。`:"主管到岗后，员工会到现场接手常规工作。","首聘 ¥3,800，工资 ¥180 / 天；工作量少时先手动处理也合理。",Zn("看房态","hotel")):e==="development"?Et(n,"revenue","先判断酒店缺客，还是缺容量",`当前 ${i.filter(o=>o.status==="occupied").length} / ${i.length} 间在住。`,"推广增加客流但不保证成交；满房时投放可能增加拒客，装修则暂时减少可售房。",Zn("先看今日预订","bookings")):e==="bookings"?Et(n,"front","先认出今天难接待的客人","展开 SUA、特别关注和即将到店的预订，提前留房。","预订报价已锁定；Walk-in 不在预订表内。",Zn("接待到店客人","front")):e==="history"?Et(n,"front","上次没解决的事，客人还记得","先看回访客人的最近一条记录，再决定这次怎样接待。","持续兑现承诺会积累信任；单次送礼不保证挽回体验。",Zn("看当前诉求","events")):e==="tasks"?Et(n,"front","今天先完成一件有意义的事","先跟随三日带教，再选择与当前酒店问题一致的任务。","奖励是额外收入；别为了任务在满房时继续花钱获客。"):e==="score"||e==="log"?Et(n,"revenue","用结果找到下一步","先检查待办和房态，再回看评分或日志中的变化。","改善服务需要时间与成本，单次分数变化不代表长期收益。",Zn("看待办","events")+Zn("看房态","hotel")):""}function cu(n){const e=n.game,t=e.logs.filter(r=>r.day===e.day),i=r=>t.some(a=>r.test(a.text)),s=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(r=>r.challenge&&!r.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:s,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:s,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:s,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}function eo(n){const e=cu(n);if(!e.length)return"";const t=e.findIndex(r=>!r.done),i=e[t<0?e.length-1:t],s=n.game.day===1?"front":n.game.day===2?"fnb":"revenue";return`<section class="teaching"><small>DAY ${n.game.day} / 3 · ${["接待与兑现","服务与授权","预测与复盘"][n.game.day-1]}</small><div class="teaching-track">${e.map((r,a)=>`<span class="${r.done?"done":a===t?"current":""}">${r.done?"✓":a+1} ${r.title}</span>`).join("")}</div>${t<0?"<p>今日带教完成。你可以自由经营，明天继续接班。</p>":Et(n,s,i.title,i.text,i.trade,Zn("继续这一幕",i.target))}</section>`}function Cd(n,e){const t=Je(n).filter(s=>s.status==="available"||s.status==="reserved"&&e.tier==="Globalist"&&(!s.suaBookingId||s.suaBookingId===e.reservationId)).sort((s,r)=>+(r.suaBookingId===e.reservationId&&!!r.suaBookingId)-+(s.suaBookingId===e.reservationId&&!!s.suaBookingId)||(e.tier==="Globalist"?Number(Lt(r))-Number(Lt(s)):+(s.type==="suite")-+(r.type==="suite"))),i=(s,r)=>`<button class="room-choice ${r===0?"recommended":""}" data-action="checkin" data-id="${Nn(e.id)}" data-room="${s.id}"><small>${r===0?"建议安排":"另一种选择"}</small><strong>${s.number} · ${$s(s)}</strong><span>${s.suaBookingId?"兑现 SUA 锁房":e.tier==="Globalist"&&Lt(s)?"免费升套 · 占用一间标准套":"保留其他房型库存"} · 点击入住</span></button>`;return`<div id="assign-${Nn(e.id)}" tabindex="-1">${t.length?`<div class="room-choice-list">${t.slice(0,2).map(i).join("")}</div>${t.length>2?`<details class="manager-card"><summary>其他 ${t.length-2} 间可用房</summary>${t.slice(2).map((s,r)=>i(s,r+2)).join("")}</details>`:""}`:Zn("暂无可售房 · 先看房态","hotel")}</div>`}function Pd(n){return`<h2>客人到了</h2>${n.guests.filter(t=>!t.staff&&!t.roomId&&!t.departing).sort((t,i)=>(t.patience??0)-(i.patience??0)).map((t,i)=>{const s=rl(t,`<blockquote>${Nn(t.thought)}</blockquote><p>${t.stayLength} 晚 · ${Nn(t.tier)}${t.sua?" · SUA 已确认":""}</p>${Cd(n,t)}<details class="manager-card"><summary>客史、等候与其他处理</summary><p>${Nn(t.segment)} · 耐心 ${t.patience} 分钟</p><p>拒绝确认预订会产生 ¥600 安置费。</p><button class="game-action" data-action="reject" data-id="${Nn(t.id)}">婉拒本次入住</button></details>`);return i===0?s:`<details class="manager-card"><summary>${Nn(t.name)} · 等候 ${t.patience} 分钟耐心</summary>${s}</details>`}).join("")||'<p class="empty">暂时没有客人排队，关上面板继续经营。</p>'}`}function Id(n){const e=n.game,t=Qs(n);return e.day<=3?eo(n).replace('data-open="brief"','data-reveal="decisions"'):Et(n,t.breakfast>e.stock?"fnb":"revenue",t.breakfast>e.stock?"早餐预估超过库存":t.occupancy>=90?"今天可能接近满房":"今天还有接客空间",`预计入住 ${t.occupancy}%，早餐 ${t.breakfast} 人 / 库存 ${e.stock} 份。`,t.breakfast>e.stock?"先补货能降低断供风险；每次支出 ¥300。":"先保留现价也可以；高价提高单晚收入，但可能减少临时客流。")}function Ld(n,e){const t=n.entities[e];return t?t.construction?Et(n,"engineering","这里正在封闭施工",`剩余 ${t.construction.remaining} 游戏分钟。`,"施工完成前无法出售或使用，先处理酒店其他区域。"):t.kind==="room"?t.status==="occupied"?Et(n,"front","先看这位客人需要什么","优先兑现待办和晚退承诺，再考虑额外服务。","个性化服务 ¥120；特别诉求仍需在待办单独落实。",Zn("处理诉求","events")):t.status==="dirty"?Et(n,"house","这间房还不能接客","安排翻房，等清洁完成后再分配给新客。","手动清洁 ¥90 / 30 分钟；已有员工接手时可等待。"):t.status==="maintenance"?Et(n,"engineering","故障房正在损失销售机会","先确认有没有工程员工或维修计时，再决定亲自安排。","手动维修 ¥180；主管到岗后可自动安排常规维修。"):t.status==="unbuilt"?Et(n,"revenue","先决定这间房要服务谁","普通房控制投入；标准套房能兑现会员升套。","尊享套投入更高，按付费房价出售，不用于标准套免费升级。"):Et(n,"house","接客，还是暂时停卖升级？","有客人排队时先安排入住，客流空档再考虑装修。","升级提高后续新客房价，但房间要停卖 90 分钟。"):Et(n,t.role==="lobby"?"front":"fnb",`${t.name} · ${t.usage} / ${t.capacity} 人`,t.usage>=t.capacity?"容量已满，留意排队客人的体验。":"先保证供应和维护，再考虑扩大容量。","升级需要封闭施工；补货和维护可以先解决眼前问题。"):""}const bn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),to=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),cn=(n,e,t="",i="")=>`<button class="game-action" data-action="${e}" data-id="${bn(t)}" data-value="${i}">${n}</button>`,nn=(n,e)=>`<div><small>${n}</small><strong>${e}</strong></div>`;function Bl(n){const e=n.game,t=e.operations,i=Qs(n),s=t.bookings.length,r=(e.day-1)%7>=5,a=t.bookings.filter(l=>l.status==="confirmed").length,o=[["收益经理",e.managers.revenue,i.occupancy>=90?"预计接近满房，广告可能只带来更多拒客。":"仍有空房，比较低价获客和高价利润。"],["前厅经理",e.managers.front,`${i.suites} 位确认预订的 Globalist；已锁 SUA 必须保留。`],["客房经理",e.managers.house,`今天 ${i.housekeeping} 间预计翻房；员工需推车到场，晚退会挤压时间。`],["餐饮经理",e.managers.fnb,`早餐预计 ${i.breakfast} 人、库存 ${e.stock}；Happy Hour 预计 ${i.club} 人、库存 ${e.clubStock}。`],["工程经理",e.managers.engineering,`${Je(n).filter(l=>l.status==="maintenance").length} 间封闭房；施工不接待，维修完成才能出售。`]];return`<h2>08:00 · 早班晨会</h2><p>Day ${e.day} · ${r?"周末":"工作日"} · ${e.positioning==="business"?"商务定位":e.positioning==="resort"?"度假定位":"城市混合"} · ${e.weather==="rain"?"有雨":"晴朗"}</p>${Id(n)}<p>${nu[t.event]}</p><details class="manager-card"><summary>需求预测与客源明细</summary><div class="brief-grid">${nn("确认预订 / 待到店",s+" / "+a)}${nn("预计 Walk-in",i.walkins+" 位")}${nn("预计晚间入住率",i.occupancy+"%")}${nn("商务 / 度假 / 团队",i.business+" / "+i.resort+" / "+i.group)}${nn("早餐人数 / 库存",i.breakfast+" / "+e.stock)}${nn("HK 翻房 / 标准套需求",i.housekeeping+" / "+i.suites)}</div></details><details class="manager-card"><summary>经理交班与建议</summary>${o.map(([l,c,u],f)=>`<div class="person-card manager-brief">${Mn(["revenue","front","house","fnb","engineering"][f])}<div class="person-body"><b>${l} · ${c?"在岗":"待聘任"}</b><p>${u}</p></div></div>`).join("")}</details><details class="manager-card"><summary>今日决策 · 挂牌 ¥${e.price} / ${t.suitePolicy==="hold"?"留套":"开放销售"} <small>调整 ›</small></summary><div class="decision-line"><span>Walk-in 挂牌 ¥${e.price}<small>¥720 争取客流 · ¥850 提高单晚收入，可能少接客</small></span>${cn("¥720","price","","720")}${cn("¥850","price","","850")}</div><div class="decision-line"><span>套房：${t.suitePolicy==="hold"?"保留一间给会员":"开放销售"}</span>${cn("留一间","suite-policy","","hold")}${cn("开放卖","suite-policy","","sell")}<small>留套照顾会员；开放销售保留付费机会。SUA 锁房始终保留。</small></div><div class="decision-line"><span>早餐 ${e.stock} 份 / 酒廊 ${e.clubStock} 份</span>${cn("早餐 +50 · ¥300","stock","breakfast")}${cn("酒廊 +50 · ¥300","stock","club")}</div><div class="decision-line"><span>${e.development&&e.development.campaignUntil>=e.day?"广告投放中":"广告未投放"}</span>${cn("三日推广 ¥2,200","campaign")}</div></details><details class="manager-card"><summary>报价、拒客与平台规则</summary><small>确认预订的报价已锁定；调价影响未预订客流。预估有波动，无法接待确认预订需支付 ¥600/单安置费；平台订单每晚收取 15% 佣金。</small></details><div class="action-row"><button class="game-action" data-open="bookings">查看预订</button><button class="game-action" data-open="history">客史记录</button></div>${t.briefOpen?'<div class="meeting-footer">'+cn("确认决策 · 开始营业","brief-start")+"</div>":""}`}function Dd(n){const e=n.game.operations;return`<h2>今日预订</h2><div class="brief-grid">${["APP","团单","平台"].map(t=>nn(t,e.bookings.filter(i=>i.source===t).length+" 单")).join("")}</div><p>Walk-in 为额外临时到店，今天已到 ${e.walkinArrivals} 位。</p>${e.bookings.map(t=>{const i=e.profiles[t.profileId];return`<details class="manager-card"><summary class="person-summary">${Mn(i)}<span>${bn(i.name)} · ${t.source} · ${to(t.eta)}<small>${{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"安置离店"}[t.status]}</small></span></summary><p>${bn(i.tier)} · ${t.nights} 晚 · 锁定价 ¥${t.rate}${t.sua?" · SUA 锁套":""}</p><p>${t.challenge?"特别关注："+{quiet:"需要安静房间",sua:"已确认标准套房",family:"早餐与加床需求",audit:"服务标准检查"}[t.challenge]:"常规接待"}</p><p>客史 ${i.visits} 次 · 信任 ${i.trust} · ${bn(i.history.at(-1)?.text??"首次来店")}</p></details>`}).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function Ud(n){return`<h2>客史与关系</h2>${Object.values(n.game.operations.profiles).filter(e=>e.visits>0||n.guests.some(t=>t.profileId===e.id)).sort((e,t)=>t.visits-e.visits).map(e=>`<details class="manager-card"><summary class="person-summary">${Mn(e)}<span>${bn(e.name)} · ${bn(e.tier)}<small>${e.visits} 次入住</small></span></summary><p>信任 ${e.trust} · 累计消费 ¥${Math.round(e.spend)}${e.referredBy?" · 由熟客介绍":""}</p>${e.history.map(t=>`<p>Day ${t.day} · ${bn(t.text)}</p>`).join("")||"<p>首次入住，等待这次故事。</p>"}</details>`).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function Nd(n){return n.guests.filter(e=>e.challenge&&!e.challenge.resolved&&!e.departing).map(e=>{const t=e.challenge.kind,i={quiet:["需要安静，不能被施工吵到","施工邻层需换到安静的空房。","落实安静安排"],sua:["SUA 确认的标准套，今天能兑现吗？","入住标准套房后核对权益。","核对已给标准套"],family:["早餐和加床，可以一起安排吗？",`需早餐库存 6 份 · 当前 ${n.game.stock} 份`,"安排家庭服务"],audit:["想确认一下房间和服务流程。","需客房、工程主管在岗，且没有待修客房。","完成巡检"]}[t];return rl(e,`<blockquote>${i[0]}</blockquote>${e.roomId?`<p class="request-condition">${i[1]}</p><div class="choice-grid">${cn(i[2]+" · ¥180","guest-choice",e.id,t==="sua"?"inventory":t==="audit"?"inspect":t)}${cn("欢迎礼 · ¥100","guest-choice",e.id,"gift")}${cn("不作安排","guest-choice",e.id,"decline")}</div><small class="choice-note">欢迎礼不替代诉求；不作安排会影响体验。</small>`:`<p class="request-condition">尚未入住 · 先分房，再落实诉求</p><button class="game-action choice-primary" data-open="front" data-guest="${bn(e.id)}">为 ${bn(e.name)} 办理入住 →</button>`}`)}).join("")}function zl(n){const e=n.game.evening;if(!e)return"<h2>20:00 · 晚间复盘</h2><p>今晚 20:00 与总部一起回看经营与客诉。</p>";const t=i=>"¥"+Math.round(i).toLocaleString("en-US");return`<h2>20:00 · 晚间复盘</h2><p>Day ${e.day} · 截至 ${to(e.minute)} 的经营快照</p><p class="result-hero">预计日结净额 ${t(e.projectedNet)}</p><details class="manager-card"><summary>经营快照与收入口径</summary><div class="brief-grid">${nn("入住率 / 晨会预估",e.occupancy+"% / "+(e.expected??"—")+"%")}${nn("今日办理入住",e.arrivals+" 位")}${nn("已入账收入",t(e.revenue))}${nn("已支出成本",t(e.expense))}${nn("预计待结房费",t(e.roomRevenue))}${nn("预计日结净额",t(e.projectedNet))}</div><p class="meeting-note">预估包含当前在住房费、平台佣金及日常成本；午夜才结算，后续入住和支出会改变结果。</p></details><details class="manager-card" ><summary>客诉与服务记录 <small>${e.pending} 项待办 · ${e.complaints} 次客诉计数</small></summary><p>以下为今日客诉日志原文，包含请求、处理与结果；多条记录可能属于同一事件。</p>${e.logs.map(i=>`<article class="review-entry"><time>${to(i.minute)}</time><div>${bn(i.text)}${i.target?`<button class="game-action" data-entity="${bn(i.target)}">查看现场 →</button>`:""}</div></article>`).join("")||"<p>今天尚无客诉日志。</p>"}<button class="game-action" data-open="events">处理当前待办 →</button></details><h3>总部 · 今晚优先改进</h3>${e.notes.map(i=>`<div class="person-card manager-brief">${Mn("revenue")}<div class="person-body"><strong>${i.title}</strong><p>${i.text}</p><button class="game-action" data-open="${i.target}">去落实 →</button></div></div>`).join("")}${e.open?'<div class="meeting-footer">'+cn("交给夜班 · 继续经营","evening-close")+"</div>":""}`}const Ln=n=>"¥"+Math.round(n).toLocaleString("en-US"),hs=(n,e,t,i)=>`<div class="upgrade-compare"><span>${n}</span><b>${e}${i} → ${t}${i}</b><div><i style="width:${e/Math.max(1,e,t)*100}%"></i><i style="width:${t/Math.max(1,e,t)*100}%"></i></div></div>`;function Fd(n,e){const t=e.level??1;if(t>=5)return"<p>装修已满级</p>";const i=n.game,s={...e,level:t+1},r=su(t),a=hn(i.price,e),o=hn(i.price,s),l=o-a,c=i.reports.at(-1)?.occupancy??100*Object.values(n.entities).filter(d=>d.kind==="room"&&d.status==="occupied").length/Math.max(1,Object.values(n.entities).filter(d=>d.kind==="room").length),u=hn(i.price,s,!0)-hn(i.price,e,!0),f=l*c/100;return`<details class="upgrade-preview"><summary>装修 Lv.${t} → ${t+1} · ${Ln(r)}</summary>${hs("新客每晚房价",a,o," 元")}${Lt(e)?`<p>会员免费升套价：${Ln(hn(i.price,e,!0))} → ${Ln(hn(i.price,s,!0))}</p>`:""}<p>每售出一晚多收 ${Ln(u)}${u!==l?"–"+Ln(l):""}；约 ${Math.ceil(r/l)}${u!==l?"–"+Math.ceil(r/u):""} 个售出房晚收回装修费。</p><p>按${i.reports.length?"最近一天":"当前"}入住率 ${Math.round(c)}%、${Lt(e)?"普通付费客":"当前挂牌价"}估算：每天多收 ${Ln(f)}${f>0?"，约 "+Math.ceil(r/f)+" 天回本":"，暂无法估算回本天数"}。</p><small>已确认预订和已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`}function Od(n,e,t,i){const s=n.game,r=s.managers[e],a=Math.min(3,r+1),o=r?4500*r:3800;let l="",c="";if(e==="front"){const u=n.entities["facility-lobby"],f=(u.kind==="facility"?u.level??1:1)*10;l=hs("新到店住客耐心",100+r*50+f,100+a*50+f," 分钟"),c=r?"自动分房速度不变；延长新客等候耐心，降低等待流失。":"启用自动分房与常规诉求处理；无空房时仍需等待。"}return e==="house"&&(l=hs("每间清洁用时",Ui(r),Ui(a)," 分钟"),c=r?"增加一位客房员工，每间现场清洁少用 "+(Ui(r)-Ui(a))+" 分钟；另需实际走路时间。":"自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。"),e==="engineering"&&(l=hs("常规维修用时",qs(r),qs(a)," 分钟"),c=r?"增加一位工程员工，维修费用仍为 ¥100/间；另需到场时间。":"自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。"),e==="fnb"&&(l=hs("采购单价（每 40 份）",r?Gr(r):240,Gr(a)," 元"),c=r?"每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。":"库存低于 20 时安排配送，员工到餐台完成补货才入库；与手动采购每份同价。"),e==="revenue"&&(l=hs("同一需求下自动报价",r?Wa(i,s.level,r):s.price,Wa(i,s.level,a)," 元"),c="次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。"),`<details class="manager-card"><summary class="person-summary">${Mn(e)}<span>${t}主管 · ${r?"Lv."+r:"未聘任"}</span><small>${r>=3?"已满级":"查看效果 ›"}</small></summary>${r>=3?"<p>已完成全部培训。</p>":`${l}<p>${c}</p><p>投入 ${Ln(o)} · 工资 ${Ln(r*180)} → ${Ln(a*180)}/天</p><button class="game-action" data-action="${r?"train":"hire"}" data-id="${e}">${r?"培训至 Lv."+a:"聘任主管"} · ${Ln(o)}</button>`}</details>`}const Ct=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),yt=n=>"¥"+Math.round(n).toLocaleString("en-US"),ke=(n,e,t="",i="")=>`<button class="game-action" data-action="${Ct(e)}" data-id="${Ct(t)}" data-value="${Ct(i)}">${Ct(n)}</button>`;function kd(n,e){const t=Td(),i=k=>n.querySelector(k),s=n.querySelector("dialog"),r=i("#sheet-content"),a=i("#sheet-eye");let o="",l="",c="",u="全部",f=()=>{},d=null;const p=[["hub","经营"],["hotel","客房"],["front","客人"],["operations","团队"],["development","设施"]],g=()=>p.map(([k,Y])=>`<button data-open="${k}" data-root-menu="true" aria-pressed="${o===k}">${Qa(k)}<span>${Y}</span></button>`).join("");i(".main-nav").innerHTML=g();const x=document.createElement("nav");x.className="sheet-navigation",x.setAttribute("aria-label","管理菜单"),r.before(x);let h=null,m=!1;const A=[],C=new Map,b=()=>{h&&C.set(h.key,{scroll:s.scrollTop,open:[...r.querySelectorAll("details[open]")].map(k=>k.querySelector("summary")?.textContent??"")})};i(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',i(".world-caption").textContent="轻点空间 · 处理今天的经营",i(".weather").title="切换日夜预览",i(".property-name small").id="game-time",i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip").removeAttribute("data-focus"),i(".event-strip").setAttribute("data-open","events"),i(".speed-control").insertAdjacentHTML("beforeend",ke("Ⅱ","pause")),i(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(k=>k.setAttribute("aria-label",k.getAttribute("data-speed")+"倍经营速度"));const w=document.createElement("p");w.className="action-feedback",w.setAttribute("role","status"),w.setAttribute("aria-live","polite"),w.hidden=!0,r.before(w);const T=document.createElement("div");T.className="fixed-actions",r.after(T);const R=()=>{w.textContent=e.getState().game.notice,w.hidden=!w.textContent},_=()=>{b(),h=null,A.length=0,o="",l="",e.getState().game.evening?.open&&e.dispatch({type:"evening-close"}),e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),s.close(),e.select(null),d?.focus()},E=()=>{if(e.getState().game.reportOpen){e.dispatch({type:"continue"}),o="brief",K();return}e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),_()};let N=!1;const I=(k,Y)=>{const ae=s.getBoundingClientRect();return k<ae.left||k>ae.right||Y<ae.top||Y>ae.bottom};s.addEventListener("pointerdown",k=>{N=k.target===s&&I(k.clientX,k.clientY)}),s.addEventListener("click",k=>{N&&k.target===s&&I(k.clientX,k.clientY)&&E(),N=!1});const D=(k,Y)=>{const ae=o+(o==="entity"?":"+l:"");b(),h&&h.key!==ae&&!m&&(A.push(h),A.length>20&&A.shift()),m=!1,h={view:o,selected:l,key:ae},a.textContent=k,i(".main-nav").innerHTML=g(),x.innerHTML=`<div class="menu-tabs">${g()}</div>${A.length?'<button class="menu-back" data-menu-back="true">‹ 返回上一页 · 保留位置</button>':""}`;const P=Y.includes('class="focus-screen"');s.classList.toggle("focus-layout",P),T.innerHTML="",r.innerHTML=(P?"":o==="entity"?Ld(e.getState(),l):Rd(e.getState(),o))+Y;const z=r.querySelector(".focus-footer");z&&T.append(z),s.dataset.view=o;const Q=r.querySelector("h2");Q&&!P&&r.prepend(Q),r.querySelectorAll(".room-choice,.room-options section,.room-grid button").forEach(re=>re.insertAdjacentHTML("afterbegin",`<span class="room-preview-art">${vs("hotel")}</span>`)),r.querySelectorAll(".work-item").forEach(re=>re.insertAdjacentHTML("afterbegin",`<span class="work-symbol">${Qa(re.querySelector('[data-action="clean"]')?"hotel":re.querySelector('[data-action="stock"]')?"development":"tasks")}</span>`)),r.querySelectorAll('.choice-grid button:first-child,.person-body button[data-action="late"][data-value="honor"],.person-body button[data-action="checkin"]').forEach(re=>re.classList.add("decision-primary"));const oe=C.get(ae);oe&&r.querySelectorAll("details").forEach(re=>re.open=oe.open.includes(re.querySelector("summary")?.textContent??"")),s.open||(d=document.activeElement,s.showModal()),s.scrollTop=oe?.scroll??0},Z=k=>{const Y=e.getState(),ae=Y.entities[k];if(ae){if(ae.construction||Y.floors.find(P=>P.id===ae.floorId)?.construction){const P=ae.construction??Y.floors.find(z=>z.id===ae.floorId).construction;D("施工现场",`<h2>${ae.kind==="room"?ae.number:ae.name} · 封闭施工</h2><progress max="${P.total}" value="${P.total-P.remaining}"></progress><p>剩余 ${P.remaining} 游戏分钟，竣工后开放。</p>`);return}if(ae.kind==="room"&&ae.status==="unbuilt"){D("配置客房 · "+ae.number,`<h2>选择房型</h2><p>普通配置已含在楼层造价中；其他房型支付差价。</p><div class="room-options">${Object.entries(ti).map(([P,z])=>`<section><strong>${z.name}</strong><small>新客 ${yt(Y.game.price*z.factor)}/晚起 · ${z.cost?yt(z.cost):"已含"}</small><div>${ke("大床","configure-room",k,P+":king")}${ke("双床","configure-room",k,P+":twin")}</div></section>`).join("")}</div><small>标准套房可供会员免费升套；尊享套房按付费房价出售。</small>`);return}if(ae.kind==="room"){const P=Y.guests.find(z=>z.id===ae.guestId);D("HYATT PLACE · "+Y.floors.find(z=>z.id===ae.floorId)?.label,`<h2>${Ct(ae.number)}<span>${$s(ae)} · Lv.${ae.level??1}</span></h2><div class="status-chip">${Ja[ae.status]}${ae.timer?" · 还需 "+ae.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${P?Ct(P.name)+" · "+Ct(P.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${ae.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${yt(P?P.rate??Y.game.price:hn(Y.game.price,ae))}</dd></div></dl>${P?"<p>"+Ct(P.name)+(P.goh?" · GOH":"")+(P.sua?" · SUA":"")+"</p><blockquote>"+Ct(P.thought)+"</blockquote>"+(P.serviceDone?"<small>本次住宿已安排专属服务</small>":ke({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[P.persona??"chill"]+" ¥120","guest-service",P.id))+(P.late==="pending"?ke("确认 "+kn(P),"late",P.id,"honor")+ke("协商 "+Gi(P)+":00","late",P.id,"deny"):P.late?"<p>退房时间："+la(Qc(P))+"</p>":""):""}${ae.status==="available"?Fd(Y,ae):""}<div class="action-row">${ae.status==="dirty"?ke("安排清洁 ¥90","clean",k):""}${ae.status==="maintenance"&&!ae.timer?ke("安排维修 ¥180","repair",k):""}${ae.status==="available"?ke("分配给住客","front")+((ae.level??1)<5?ke("装修 "+yt(2500*(ae.level??1)),"upgrade",k):"")+(Lt(ae)?ke("预留给会员","reserve",k):""):""}${ae.status==="reserved"&&!ae.suaBookingId?ke("释放预留","release",k):""}</div>`)}else D("HYATT PLACE · 公共空间",`<h2>${Ct(ae.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${ae.usage} / ${ae.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(ae.maintenance)}%</dd></div>${["breakfast","club"].includes(ae.role)?`<div><dt>库存</dt><dd>${ae.role==="club"?Y.game.clubStock:Y.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${ae.role==="lobby"?ke("办理入住","front"):""}${ae.role==="breakfast"?ke("补充早餐 ¥300","stock","breakfast"):ae.role==="club"?ke("补充酒廊 ¥300","stock","club"):""}${ke("维护设施 ¥200","repair",ae.id)}${(ae.level??1)<5?ke("公区升级 "+yt(3500*(ae.level??1)),"invest",ae.id):"已达 Lv.5"}</div>`)}},K=()=>{const k=e.getState(),Y=k.game;o==="entity"&&(t.room=l,t.floor=k.entities[l]?.floorId,k.entities[l]?.kind==="facility"&&(t.facility=l,o="development"));const ae=Ad(k,o,t);if(ae){D("HOTEL MANAGEMENT",ae);return}if(o==="room-data"){Z(t.room??l);return}if(o==="brief-data"){D("MORNING DATA",Bl(k));return}if(o==="evening-data"){D("EVENING DATA",zl(k));return}if(o==="hub"){D("MANAGEMENT · 经营",Ed(k));return}if(o==="worklist"){D("ACTION CENTER · 现场事项",`<h2>按轻重缓急处理</h2>${ja(k,Number.MAX_SAFE_INTEGER)}`);return}if(o==="teaching"){D("DEPARTMENT HEAD · 带教",eo(k)||"<h2>三日带教已结束</h2><p>各部门仍会根据现场情况给你建议。</p>");return}if(o==="entity"){Z(l);return}if(o==="evening"){D("EVENING REVIEW",zl(k));return}if(o==="brief"){D("MORNING BRIEF",Bl(k).replace('<details class="manager-card">',ja(k,2)+'<details class="manager-card">'));return}if(o==="bookings"){D("RESERVATIONS",Dd(k));return}if(o==="history"){D("GUEST HISTORY",Ud(k));return}if(o==="front")D("FRONT OFFICE",Pd(k));else if(o==="hotel-data")D("YOUR HOTEL",`<h2>酒店 · ${Je(k).length} 间客房</h2><details class="manager-card"><summary>扩建与投资 · 增加容量</summary><p>扩建花钱并封闭施工 240 分钟；新楼层竣工后需手动设置房型。</p>${ke("加高一层 · 3 个空位 "+yt(1e4+5e3*(k.floors.filter(P=>P.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div></details><details class="manager-card"><summary>楼层导航</summary><div class="floor-list">${[...k.floors].reverse().map(P=>`<button data-floor="${P.id}"><b>${P.label}</b><span>${P.name}</span><small>定位楼层 ›</small></button>`).join("")}</div></details><div class="floor-tabs" aria-label="客房楼层">${k.floors.filter(P=>P.role==="guest").map(P=>`<button class="game-action" data-room-floor="${P.id}" aria-pressed="${(c||k.floors.find(z=>z.role==="guest")?.id)===P.id}">${P.label}</button>`).join("")}</div><div class="room-grid">${Qo(k).filter(P=>P.floorId===(c||k.floors.find(z=>z.role==="guest")?.id)).map(P=>`<button data-entity="${P.id}">${P.status==="unbuilt"?"＋":P.number}<small>${P.status==="unbuilt"?P.number+" · 设置房型":$s(P)+" · "+Ja[P.status]}</small></button>`).join("")}</div>`);else if(o==="operations-data")D("DEPARTMENT HEADS",`<h2>找主管商量</h2><div class="action-row"><button class="game-action" data-open="brief">安排今天</button><button class="game-action" data-open="evening">回看经营</button><button class="game-action" data-open="development">考虑投资</button></div><details class="manager-card"><summary>餐台备货 · 早餐 ${Y.stock} / 酒廊 ${Y.clubStock}</summary><p>库存不足先补货，每次增加 50 份，支出 ¥300。</p><div class="action-row">${ke("补早餐 · ¥300","stock","breakfast")}${ke("补酒廊 · ¥300","stock","club")}</div></details><details class="manager-card"><summary>团队授权 · ${Object.values(Y.managers).filter(P=>P>0).length} / 5 位主管在岗</summary><p>减少亲自处理的次数，同时承担每日工资。</p>${Object.entries(Xa).map(([P,z])=>Od(k,P,z,Vr(k)>1.1?750:590)).join("")}</details><details class="manager-card"><summary>房价与客源 · 当前 ¥${Y.price}</summary><p>降价争取 Walk-in，提价增加单晚收益但可能减少客流。</p><div class="action-row">${ke("¥720 · 争取入住","price","","720")}${ke("¥850 · 提高单价","price","","850")}</div><details class="manager-card"><summary>精确定价与酒店定位</summary><label>挂牌价 <input id="price-input" type="number" min="350" max="1800" value="${Y.price}"></label>${ke("应用价格","price")}<div class="action-row">${ke("商务","position","","business")}${ke("度假","position","","resort")}${ke("城市混合","position","","urban")}</div></details></details><details class="manager-card"><summary>预订、客史与经营档案</summary><div class="action-row"><button class="game-action" data-open="bookings">今日预订</button><button class="game-action" data-open="history">客史</button>${ke("最近日结","report")}<button class="game-action" data-open="log">运营日志</button>${ke("导出存档","export")}${ke("新开存档","reset")}</div><small>自动保存在当前浏览器。非官方粉丝游戏，与 Hyatt 无隶属关系。</small></details>`);else if(o==="development-data"){const P=Y.development;D("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级增加基础房价的 10%，装修前可查看回本预估。</p><details class="manager-card"><summary>三日营销 · 获客还是浪费？</summary><p>客流 +35%；推广持续到第 ${P?.campaignUntil??0} 天。满房时请谨慎投放。</p>${P&&P.campaignUntil>=Y.day?"<small>推广进行中</small>":ke("投放推广 ¥2,200","campaign")}</details><details class="manager-card"><summary>今日主题活动</summary><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${P?.activity?`<blockquote>正在筹备：${zr[P.activity.id].name} · 还需 ${Math.max(0,P.activity.ends-Y.day*1440-Y.minute)} 分钟</blockquote>`:""}${Object.entries(zr).map(([z,Q])=>`<section class="guest-card"><strong>${Q.name}</strong><p>${Q.description} 每人消费 ¥${Q.fee} 起。</p>${P?.activityDay===Y.day?"<small>今日档期已使用</small>":ke("安排 "+yt(Q.cost),"activity",z)}</section>`).join("")}</details><details class="manager-card"><summary>公共空间投资</summary>${k.entities["facility-spa"]?"":ke("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(k.entities).filter(z=>z.kind==="facility").map(z=>`<section class="guest-card"><strong>${Ct(z.name)} · Lv.${z.level??1}</strong><p>容量 ${z.capacity} 人 · 维护 ${Math.round(z.maintenance)}%</p>${(z.level??1)<5?ke("升级 "+yt(3500*(z.level??1)),"invest",z.id):"<small>满级</small>"}</section>`).join("")}</details><button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(o==="score"){const P=ms(k);D("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${P.total}%"><strong>${P.total}<small>/ 100</small></strong></div><div><strong>${P.total>=90?"卓越酒店":P.total>=75?"稳健经营":P.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${P.parts.map(z=>`<div class="score-part"><span>${z.name}</span><b>${z.value}</b><progress max="100" value="${z.value}" aria-label="${z.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><details class="manager-card"><summary>最近 7 天评分</summary><div class="revenue-trend">${(Y.development?.scores??[]).slice(-7).map(z=>`<div><small>${z.value} 分</small><i style="height:${z.value*.65}px"></i><small>D${z.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div></details><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(o==="tasks-data")D("MISSIONS",`<h2>今天的目标</h2>${eo(k)}<p>每天轮换经营目标，完成后及时领奖。长期里程碑不会随交班重置。</p>${Y.tasks.map(P=>`<section class="guest-card"><strong>${Ct(P.title)}</strong><p>${P.progress} / ${P.goal} · 奖励 ${yt(P.reward)}</p><progress max="${P.goal}" value="${P.progress}" aria-label="${Ct(P.title)}"></progress>${P.claimed?"<small>已领取</small>":P.progress>=P.goal?ke("领取奖励","claim",P.id):`<button class="game-action" data-open="${P.target}">去完成 ›</button>`}</section>`).join("")}<details class="manager-card"><summary>长期里程碑与奖励</summary><p>持续接待住客、举办活动和建设酒店，解锁长期奖励。</p>${tu(k).map(P=>`<section class="guest-card"><strong>${P.title}</strong><p>${Math.min(P.progress,P.goal)} / ${P.goal} · ${yt(P.reward)}</p><progress max="${P.goal}" value="${Math.min(P.progress,P.goal)}" aria-label="${P.title}"></progress>${P.claimed?"<small>已领取</small>":P.progress>=P.goal?ke("领取里程碑奖励","claim-career",P.id):"<small>持续经营以解锁</small>"}</section>`).join("")}</details>`);else if(o==="events")D("DUTY MANAGER",`<h2>待办 · ${k.guests.filter(P=>P.challenge&&!P.challenge.resolved&&!P.departing).length+Y.events.length+k.guests.filter(P=>P.late==="pending").length}</h2>${Nd(k)}${k.guests.filter(P=>P.late==="pending"&&!P.departing).map(P=>rl(P,`<strong class="request-title">${kn(P)} 请求</strong><p>希望${P.checkoutDay===Y.day?"今天":"明天"} ${Ws(P)}:00 退房。比 11:00 常规退房晚 ${Ws(P)-11} 小时，之后才可翻房。</p><p class="trade-off">同意：客人更满意，房间晚些可卖。协商：提前翻房，但会影响体验。</p><details class="manager-card"><summary>查看指标影响</summary><p>同意：体验 +4、口碑 +1、业主 -1；协商：体验 -3、口碑 -1、业主 +1。</p></details>${ke("同意 "+kn(P),"late",P.id,"honor")}${ke("协商 "+Gi(P)+":00","late",P.id,"deny")}`)).join("")}${Y.events.map(P=>`<section class="guest-card"><strong>${Ct(P.title)}</strong><p>剩余 ${Math.max(0,P.expires-Y.day*1440-Y.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${P.target}">定位现场</button>${ke("亲自协调 ¥350","resolve",String(P.id),"gm")}${ke("交给主管 ¥150","resolve",String(P.id),"sop")}</div></section>`).join("")||(k.guests.some(P=>!P.departing&&(P.late==="pending"||P.challenge&&!P.challenge.resolved))?"":'<p class="empty">目前没有异常，关上面板继续经营。</p>')}${jn(k).length?`<button class="primary" data-open="front">接待 ${jn(k).length} 位排队住客</button>`:""}`);else if(o==="log")D("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(P=>`<button class="${P===u?"active":""}" data-filter="${P}">${P}</button>`).join("")}</div><div class="log-list">${[...Y.logs].reverse().filter(P=>u==="全部"||P.category===u).map(P=>`<article><small>Day ${P.day} ${la(P.minute)} · ${P.category}</small><p>${Ct(P.text)}</p>${P.target?`<button data-entity="${Ct(P.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(o==="report-data"){const P=Y.reports.at(-1);D("DAILY REVIEW",P?`<h2>Day ${P.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${P.score??ms(k).total} / 100 ›</button><p class="result-hero">今日净额 ${yt(P.revenue-P.expense)}</p><details class="manager-card"><summary>收支明细、ADR 与预测对账</summary><dl><div><dt>收入 / 成本</dt><dd>${yt(P.revenue)} / ${yt(P.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${yt(P.adr)} / ${yt(P.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${P.occupancy}% / ${P.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${P.upgrades} / ${P.complaints}</dd></div></dl><h3>晨会预测对账</h3><p>预计晚间入住率 ${P.forecastOccupancy??"—"}% → 实际 ${P.actualEveningOccupancy??"—"}% · 未兑现预订 ${P.bookingsLost??0} 单</p><h3>最近 7 天收入</h3><div class="revenue-trend">${Y.reports.slice(-7).map(z=>`<div><small>${yt(z.revenue)}</small><i style="height:${Math.max(3,Math.round(z.revenue/Math.max(1,...Y.reports.slice(-7).map(Q=>Q.revenue))*65))}px"></i><small>D${z.day}</small></div>`).join("")}</div></details><blockquote>${Ct(P.recommendation)}</blockquote>${Y.reportOpen?ke("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("change",k=>{const Y=k.target;Y.id==="hotel-floor-select"&&(c=Y.value,K())}),n.addEventListener("click",k=>{const Y=k.target.closest("button");if(!Y)return;if(Y.matches(".close-sheet")){E();return}if(Y.dataset.focusKey){const re=Y.dataset.focusKey,Le=Y.dataset.focusValue??"";["roomPage","eventPage","guestPage","taskPage"].includes(re)?(t[re]=Math.max(0,Number(Le)||0),re==="eventPage"&&(t.event=void 0),re==="guestPage"&&(t.guest=void 0,t.roomPage=0)):["floor","room","department","facility","meeting","category","bed"].includes(re)&&(t[re]=Le,re==="floor"&&(t.room=void 0),re==="room"&&(l=Le,o="hotel")),K();return}if(Y.dataset.menuBack){const re=A.pop();re&&(m=!0,o=re.view,l=re.selected,w.hidden=!0,K());return}if(Y.dataset.open){if(Y.dataset.rootMenu&&(b(),h=null,A.length=0),o=Y.dataset.open,Y.dataset.guest&&(t.guest=Y.dataset.guest,t.event=Y.dataset.guest,t.roomPage=0),w.hidden=!0,K(),Y.dataset.guest){const re=Y.dataset.guest,Le=document.getElementById("assign-"+re)??[...r.querySelectorAll("[data-id]")].find(Ae=>Ae.dataset.id===re);if(Le){let Ae=Le.parentElement;for(;Ae&&Ae!==r;)Ae instanceof HTMLDetailsElement&&(Ae.open=!0),Ae=Ae.parentElement;Le.closest(".person-card")?.scrollIntoView({block:"nearest"}),Le.focus({preventScroll:!0})}}return}if(Y.dataset.reveal){const re=[...r.querySelectorAll("details")].find(Le=>Le.querySelector("summary")?.textContent?.startsWith("今日决策"));re&&(re.open=!0,re.scrollIntoView({block:"start"}));return}if(Y.dataset.speed){e.setSpeed(Number(Y.dataset.speed));return}if(Y.dataset.entity){l=Y.dataset.entity;const re=e.getState().entities[l];re&&f(re.floorId),o="entity",e.select(l),K();return}if(Y.dataset.floor){const re=Y.dataset.floor;_(),e.focusFloor(re),f(re);return}if(Y.dataset.roomFloor){c=Y.dataset.roomFloor,K();return}if(Y.dataset.filter){u=Y.dataset.filter,K();return}if(Y.matches(".weather")){const re=["dusk","night","day"];e.setAtmosphere(re[(re.indexOf(e.getState().atmosphere)+1)%3]);return}const ae=Y.dataset.action;if(!ae)return;if(["front","report"].includes(ae)){o=ae,K();return}if(ae==="reset"){document.dispatchEvent(new Event("new-game"));return}if(ae==="export"){const re=document.createElement("a");re.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),re.download="jinwan-v8-save.json",re.click(),setTimeout(()=>URL.revokeObjectURL(re.href),500);return}const P={type:ae,id:Y.dataset.id,value:Y.dataset.value};ae==="checkin"&&(P.roomId=Y.dataset.room),ae==="price"&&(P.value=Y.dataset.value||Number(n.querySelector("#price-input")?.value)),ae==="position"&&(P.value=Y.dataset.value||n.querySelector("#position-input")?.value);const z=[...r.querySelectorAll("details[open]")].map(re=>re.querySelector("summary")?.textContent),Q=o,oe=e.getState().game.upgradeEffect?.id;if(e.dispatch(P),e.getState().game.upgradeEffect?.id!==oe){const re=e.getState().game.upgradeEffect.entityId;_(),f(e.getState().entities[re].floorId);return}ae==="brief-start"||ae==="evening-close"?_():ae==="continue"?(o="brief",K()):o&&(ae==="checkin"&&e.getState().guests.find(re=>re.id===P.id)?.roomId&&e.getState().guests.find(re=>re.id===P.id)?.challenge&&(o="events",s.scrollTop=0),K(),o===Q&&r.querySelectorAll("details").forEach(re=>{z.includes(re.querySelector("summary")?.textContent)&&(re.open=!0)}),R())}),s.addEventListener("cancel",k=>{k.preventDefault(),E()});let H=null,ee="",X="",ie=0,le=0,fe=0;const _e=()=>{const k=e.getState(),Y=k.game;i(".score-button").innerHTML=`<i style="--score:${ms(k).total}%"></i> ${ms(k).total} 分 ›`,i("#cash").textContent=yt(k.metrics.cash),i("#reputation").textContent=String(k.metrics.reputation),i("#owner").textContent=String(k.metrics.owner),i("#suite-count").textContent=Yc(k)+" 间",i("#game-time").textContent=`${ou(Y.day)} · Day ${Y.day} ${la(Y.minute)}${Y.paused?" · 暂停":""}`,i(".today-hint span:nth-child(2)").textContent=Y.tasks.find(Q=>!Q.claimed)?.title??"今日任务全部完成",i("#task-count").textContent=Y.tasks.filter(Q=>Q.claimed).length+"/"+Y.tasks.length,i("#occupancy").textContent=`${Kc(k)}/${Je(k).length} 在住 · 收入 ${yt(Y.revenue)}`;const ae=cu(k),P=ae.find(Q=>!Q.done);P?(i(".today-hint span:nth-child(2)").textContent="Day "+Y.day+" · "+P.title,i("#task-count").textContent=ae.filter(Q=>Q.done).length+"/3",i(".today-hint").setAttribute("data-open","teaching")):i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip span").textContent=(k.guests.some(Q=>Q.challenge&&!Q.challenge.resolved&&!Q.departing)?"特别住客需要你的判断":void 0)??(k.guests.some(Q=>Q.late==="pending"&&!Q.departing)?"会员晚退请求待你确认":void 0)??Y.events[0]?.title??(jn(k).length?`${jn(k).length} 位住客等待办理入住`:"酒店运营平稳"),i(".event-strip b").textContent=Y.events.length||k.guests.some(Q=>(Q.late==="pending"||Q.challenge&&!Q.challenge.resolved)&&!Q.departing)?"处理 ›":"前台 ›",i(".event-strip").setAttribute("data-open",Y.events.length||k.guests.some(Q=>(Q.late==="pending"||Q.challenge&&!Q.challenge.resolved)&&!Q.departing)?"events":"front"),i(".review-strip span").textContent=Y.notice,i(".weather span").textContent=Y.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(Q=>{Q.classList.toggle("active",Number(Q.dataset.speed)===k.speed),Q.setAttribute("aria-pressed",String(Number(Q.dataset.speed)===k.speed))});const z=k.floors.map(Q=>Q.id).join(",");ee!==z&&(ee=z,i(".floor-rail").innerHTML=[...k.floors].reverse().map(Q=>`<button data-floor="${Q.id}" aria-label="前往${Q.label} ${Q.name}">${Q.label}</button>`).join("")),k.selectedId&&k.selectedId!==H&&(l=k.selectedId,o="entity",K()),H=k.selectedId,Y.operations?.briefOpen&&le!==Y.day&&(le=Y.day,o="brief",K()),Y.evening?.open&&fe!==Y.evening.day&&(fe=Y.evening.day,o="evening",K(),s.scrollTop=0),Y.reportOpen&&ie!==Y.day&&(ie=Y.day,o="report",K()),X!==Y.notice&&(X=Y.notice,s.open&&R())};return e.subscribe(_e),_e(),{stage:i(".world-stage"),setFocusHandler:k=>{f=k},showError:k=>D("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${Ct(k)}</p>`)}}function Bd(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return kd(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),s=n.querySelector("#sheet-eye");let r="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),r="",a?.focus()},c=(g,x)=>{s.textContent=g,i.innerHTML=x,t.open||(a=document.activeElement,t.showModal())},u=g=>{const x=e.getState(),h=x.entities[g];if(!h)return;const m=Dl(x,g);if(h.kind==="room"){const A=x.guests.find(C=>C.id===h.guestId);c("HYATT PLACE · "+m.label,`<h2>${h.number}<span>${h.type==="suite"?"开放式套房":h.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${h.status}">${Ja[h.status]}</div><dl><div><dt>住客</dt><dd>${A?A.name+" · "+A.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${h.nightsLeft?h.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${m.label} · ${m.name}</dd></div></dl>${A?"<blockquote>“"+A.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${m.id}">回到 ${h.number} 的楼层</button>`)}else{const A={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+m.label,`<h2>${h.name}</h2><p>${A[h.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${h.usage} / ${h.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${h.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${h.quality} / ${h.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${m.id}">回到${h.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const g=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...g.floors].reverse().map(x=>`<button data-return="${x.id}"><b>${x.label}</b><span>${x.name}</span><small>${x.entityIds.length>1?x.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const g=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([x,h,m])=>`<button data-focus="${x}"><b>${g.visited.includes(x)?"✓":"○"}</b><span>${h}<small>${m}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const g=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(g.visited.length?[...g.visited].reverse().map(x=>{const h=g.entities[x];return`<button data-focus="${x}"><span>${h.kind==="room"?h.number+" 房间":h.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",g=>{const x=g.target.closest("button");if(x){if(x.matches(".close-sheet")&&l(),x.dataset.open&&(e.select(null),r=x.dataset.open,f[r]?.()),x.dataset.speed&&e.setSpeed(Number(x.dataset.speed)),x.dataset.return){const h=x.dataset.return;l(),e.focusFloor(h),o(h)}if(x.dataset.focus){const h=x.dataset.focus,m=Dl(e.getState(),h);l(),m&&(e.focusFloor(m.id),o(m.id)),e.select(h)}if(x.dataset.floor&&(e.focusFloor(x.dataset.floor),o(x.dataset.floor)),x.dataset.atmosphere&&(e.setAtmosphere(x.dataset.atmosphere),l()),x.matches(".weather")){const h=["dusk","night","day"];e.setAtmosphere(h[(h.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",g=>{g.preventDefault(),l()}),t.addEventListener("click",g=>{if(g.target===t){const x=t.getBoundingClientRect();(g.clientX<x.left||g.clientX>x.right||g.clientY<x.top||g.clientY>x.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(g=>`<button data-floor="${g.id}" aria-label="前往${g.label} ${g.name}">${g.label}</button>`).join("");let d=null;const p=g=>{n.querySelector("#cash").textContent="¥"+g.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(g.metrics.reputation),n.querySelector("#owner").textContent=String(g.metrics.owner),n.querySelector("#suite-count").textContent=Yc(g)+" 间",n.querySelector("#occupancy").textContent=`${Je(g).length} 间客房 · ${Kc(g)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(x=>g.visited.includes(x)).length+"/3",n.querySelectorAll("[data-speed]").forEach(x=>{x.classList.toggle("active",Number(x.dataset.speed)===g.speed),x.setAttribute("aria-pressed",String(Number(x.dataset.speed)===g.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[g.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[g.atmosphere],n.querySelectorAll("[data-floor]").forEach(x=>x.classList.toggle("active",x.dataset.floor===g.focusedFloorId)),g.selectedId&&g.selectedId!==d&&(r="entity",u(g.selectedId)),d=g.selectedId};return e.subscribe(p),p(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:g=>{o=g},showError:g=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+g+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const al="185",zd=0,Gl=1,Gd=2,Ur=1,uu=2,zs=3,Ei=0,Jt=1,Jn=2,ii=0,_s=1,Hl=2,Vl=3,$l=4,Hd=5,Li=100,Vd=101,$d=102,Wd=103,Xd=104,qd=200,Yd=201,Kd=202,Zd=203,no=204,io=205,Jd=206,Qd=207,jd=208,ef=209,tf=210,nf=211,sf=212,rf=213,af=214,so=0,ro=1,ao=2,bs=3,oo=4,lo=5,co=6,uo=7,du=0,of=1,lf=2,Bn=0,fu=1,hu=2,pu=3,ol=4,mu=5,gu=6,vu=7,_u=300,Hi=301,ys=302,ca=303,ua=304,Qr=306,$r=1e3,ei=1001,fo=1002,Dt=1003,cf=1004,ur=1005,kt=1006,da=1007,Oi=1008,sn=1009,xu=1010,Mu=1011,Ys=1012,ll=1013,Gn=1014,vn=1015,ri=1016,cl=1017,ul=1018,Ks=1020,bu=35902,yu=35899,Su=1021,Eu=1022,_n=1023,ai=1026,ki=1027,dl=1028,fl=1029,Vi=1030,hl=1031,pl=1033,Nr=33776,Fr=33777,Or=33778,kr=33779,ho=35840,po=35841,mo=35842,go=35843,vo=36196,_o=37492,xo=37496,Mo=37488,bo=37489,Wr=37490,yo=37491,So=37808,Eo=37809,To=37810,Ao=37811,wo=37812,Ro=37813,Co=37814,Po=37815,Io=37816,Lo=37817,Do=37818,Uo=37819,No=37820,Fo=37821,Oo=36492,ko=36494,Bo=36495,zo=36283,Go=36284,Xr=36285,Ho=36286,uf=3200,Vo=0,df=1,bi="",Kt="srgb",qr="srgb-linear",Yr="linear",et="srgb",Zi=7680,Wl=519,ff=512,hf=513,pf=514,ml=515,mf=516,gf=517,gl=518,vf=519,Xl=35044,ql="300 es",On=2e3,Zs=2001;function _f(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xf(){const n=Kr("canvas");return n.style.display="block",n}const Yl={};function Kl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Tu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ue(...n){n=Tu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Xe(...n){n=Tu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function xs(...n){const e=n.join(" ");e in Yl||(Yl[e]=!0,Ue(...n))}function Mf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const bf={[so]:ro,[ao]:co,[oo]:uo,[bs]:lo,[ro]:so,[co]:ao,[uo]:oo,[lo]:bs};class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fa=Math.PI/180,$o=180/Math.PI;function js(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function We(n,e,t){return Math.max(e,Math.min(t,n))}function yf(n,e){return(n%e+e)%e}function ha(n,e,t){return(1-t)*n+t*e}function Ps(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Yt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ve{static{Ve.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class As{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],d=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(f!==x||l!==d||c!==p||u!==g){let h=l*d+c*p+u*g+f*x;h<0&&(d=-d,p=-p,g=-g,x=-x,h=-h);let m=1-o;if(h<.9995){const A=Math.acos(h),C=Math.sin(A);m=Math.sin(m*A)/C,o=Math.sin(o*A)/C,l=l*m+d*o,c=c*m+p*o,u=u*m+g*o,f=f*m+x*o}else{l=l*m+d*o,c=c*m+p*o,u=u*m+g*o,f=f*m+x*o;const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+l*p-c*d,e[t+1]=l*g+u*d+c*f-o*p,e[t+2]=c*g+u*p+o*d-l*f,e[t+3]=u*g-o*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*u*f+c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f-d*p*g;break;case"YXZ":this._x=d*u*f+c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f+d*p*g;break;case"ZXY":this._x=d*u*f-c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f-d*p*g;break;case"ZYX":this._x=d*u*f-c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f+d*p*g;break;case"YZX":this._x=d*u*f+c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f-d*p*g;break;case"XZY":this._x=d*u*f-c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f+d*p*g;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{static{G.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new G,Zl=new As;class Ne{static{Ne.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],g=i[8],x=s[0],h=s[3],m=s[6],A=s[1],C=s[4],b=s[7],w=s[2],T=s[5],R=s[8];return r[0]=a*x+o*A+l*w,r[3]=a*h+o*C+l*T,r[6]=a*m+o*b+l*R,r[1]=c*x+u*A+f*w,r[4]=c*h+u*C+f*T,r[7]=c*m+u*b+f*R,r[2]=d*x+p*A+g*w,r[5]=d*h+p*C+g*T,r[8]=d*m+p*b+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*r,p=c*r-a*l,g=t*f+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=f*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ma.makeScale(e,t)),this}rotate(e){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Ne,Jl=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ql=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sf(){const n={enabled:!0,workingColorSpace:qr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(s.r=Ms(s.r),s.g=Ms(s.g),s.b=Ms(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[qr]:{primaries:e,whitePoint:i,transfer:Yr,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:i,transfer:et,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),n}const $e=Sf();function si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ms(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ji;class Ef{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ji===void 0&&(Ji=Kr("canvas")),Ji.width=e.width,Ji.height=e.height;const s=Ji.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ji}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(si(t[i]/255)*255):t[i]=si(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tf=0;class vl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=js(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ga(s[a].image)):r.push(ga(s[a]))}else r=ga(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ga(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ef.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Af=0;const va=new G;class Ht extends Wi{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,i=ei,s=ei,r=kt,a=Oi,o=_n,l=sn,c=Ht.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=js(),this.name="",this.source=new vl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_u)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $r:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $r:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=_u;Ht.DEFAULT_ANISOTROPY=1;class ut{static{ut.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],g=l[9],x=l[2],h=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(g-h)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(g+h)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,b=(p+1)/2,w=(m+1)/2,T=(u+d)/4,R=(f+x)/4,_=(g+h)/4;return C>b&&C>w?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=T/i,r=R/i):b>w?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=T/s,r=_/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=R/r,s=_/r),this.set(i,s,r,t),this}let A=Math.sqrt((h-g)*(h-g)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(h-g)/A,this.y=(f-x)/A,this.z=(d-u)/A,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wf extends Wi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ht(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new vl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends wf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Au extends Ht{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rf extends Ht{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class at{static{at.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,f,d,p,g,x,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,f,d,p,g,x,h)}set(e,t,i,s,r,a,o,l,c,u,f,d,p,g,x,h){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=x,m[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Qi.setFromMatrixColumn(e,0).length(),r=1/Qi.setFromMatrixColumn(e,1).length(),a=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*u,p=a*f,g=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,g=c*u,x=c*f;t[0]=d+x*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,g=c*u,x=c*f;t[0]=d-x*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*f,g=o*u,x=o*f;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-d*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+g,t[10]=d-x*f}else if(e.order==="XZY"){const d=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cf,e,Pf)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),pi.crossVectors(i,en),pi.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),pi.crossVectors(i,en)),pi.normalize(),dr.crossVectors(en,pi),s[0]=pi.x,s[4]=dr.x,s[8]=en.x,s[1]=pi.y,s[5]=dr.y,s[9]=en.y,s[2]=pi.z,s[6]=dr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],g=i[2],x=i[6],h=i[10],m=i[14],A=i[3],C=i[7],b=i[11],w=i[15],T=s[0],R=s[4],_=s[8],E=s[12],N=s[1],I=s[5],D=s[9],Z=s[13],K=s[2],H=s[6],ee=s[10],X=s[14],ie=s[3],le=s[7],fe=s[11],_e=s[15];return r[0]=a*T+o*N+l*K+c*ie,r[4]=a*R+o*I+l*H+c*le,r[8]=a*_+o*D+l*ee+c*fe,r[12]=a*E+o*Z+l*X+c*_e,r[1]=u*T+f*N+d*K+p*ie,r[5]=u*R+f*I+d*H+p*le,r[9]=u*_+f*D+d*ee+p*fe,r[13]=u*E+f*Z+d*X+p*_e,r[2]=g*T+x*N+h*K+m*ie,r[6]=g*R+x*I+h*H+m*le,r[10]=g*_+x*D+h*ee+m*fe,r[14]=g*E+x*Z+h*X+m*_e,r[3]=A*T+C*N+b*K+w*ie,r[7]=A*R+C*I+b*H+w*le,r[11]=A*_+C*D+b*ee+w*fe,r[15]=A*E+C*Z+b*X+w*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],g=e[3],x=e[7],h=e[11],m=e[15],A=l*p-c*d,C=o*p-c*f,b=o*d-l*f,w=a*p-c*u,T=a*d-l*u,R=a*f-o*u;return t*(x*A-h*C+m*b)-i*(g*A-h*w+m*T)+s*(g*C-x*w+m*R)-r*(g*b-x*T+h*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],g=e[12],x=e[13],h=e[14],m=e[15],A=t*o-i*a,C=t*l-s*a,b=t*c-r*a,w=i*l-s*o,T=i*c-r*o,R=s*c-r*l,_=u*x-f*g,E=u*h-d*g,N=u*m-p*g,I=f*h-d*x,D=f*m-p*x,Z=d*m-p*h,K=A*Z-C*D+b*I+w*N-T*E+R*_;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/K;return e[0]=(o*Z-l*D+c*I)*H,e[1]=(s*D-i*Z-r*I)*H,e[2]=(x*R-h*T+m*w)*H,e[3]=(d*T-f*R-p*w)*H,e[4]=(l*N-a*Z-c*E)*H,e[5]=(t*Z-s*N+r*E)*H,e[6]=(h*b-g*R-m*C)*H,e[7]=(u*R-d*b+p*C)*H,e[8]=(a*D-o*N+c*_)*H,e[9]=(i*N-t*D-r*_)*H,e[10]=(g*T-x*b+m*A)*H,e[11]=(f*b-u*T-p*A)*H,e[12]=(o*E-a*I-l*_)*H,e[13]=(t*I-i*E+s*_)*H,e[14]=(x*C-g*w-h*A)*H,e[15]=(u*w-f*C+d*A)*H,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,d=r*c,p=r*u,g=r*f,x=a*u,h=a*f,m=o*f,A=l*c,C=l*u,b=l*f,w=i.x,T=i.y,R=i.z;return s[0]=(1-(x+m))*w,s[1]=(p+b)*w,s[2]=(g-C)*w,s[3]=0,s[4]=(p-b)*T,s[5]=(1-(d+m))*T,s[6]=(h+A)*T,s[7]=0,s[8]=(g+C)*R,s[9]=(h-A)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Qi.set(s[0],s[1],s[2]).length();const o=Qi.set(s[4],s[5],s[6]).length(),l=Qi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),un.copy(this);const c=1/a,u=1/o,f=1/l;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=f,un.elements[9]*=f,un.elements[10]*=f,t.setFromRotationMatrix(un),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=On,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),p=(i+s)/(i-s);let g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===On)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Zs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=On,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===On)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Zs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Qi=new G,un=new at,Cf=new G(0,0,0),Pf=new G(1,1,1),pi=new G,dr=new G,en=new G,jl=new at,ec=new As;class Ti{constructor(e=0,t=0,i=0,s=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ec.setFromEuler(this),this.setFromQuaternion(ec,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class _l{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let If=0;const tc=new G,ji=new As,$n=new at,fr=new G,Is=new G,Lf=new G,Df=new As,nc=new G(1,0,0),ic=new G(0,1,0),sc=new G(0,0,1),rc={type:"added"},Uf={type:"removed"},es={type:"childadded",child:null},_a={type:"childremoved",child:null};class Ut extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new G,t=new Ti,i=new As,s=new G(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Ne}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(nc,e)}rotateY(e){return this.rotateOnAxis(ic,e)}rotateZ(e){return this.rotateOnAxis(sc,e)}translateOnAxis(e,t){return tc.copy(e).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nc,e)}translateY(e){return this.translateOnAxis(ic,e)}translateZ(e){return this.translateOnAxis(sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fr.copy(e):fr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Is,fr,this.up):$n.lookAt(fr,Is,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),ji.setFromRotationMatrix($n),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rc),es.child=e,this.dispatchEvent(es),es.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uf),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rc),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,e,Lf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,Df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Ut.DEFAULT_UP=new G(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Bt extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nf={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const h=t.getJointPose(x,i),m=this._getHandJoint(c,x);h!==null&&(m.matrix.fromArray(h.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=h.radius),m.visible=h!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},hr={h:0,s:0,l:0};function Ma(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=yf(e,1),t=We(t,0,1),i=We(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ma(a,r,e+1/3),this.g=Ma(a,r,e),this.b=Ma(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=Kt){function i(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const i=wu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return $e.workingToColorSpace(Ot.copy(this),e),Math.round(We(Ot.r*255,0,255))*65536+Math.round(We(Ot.g*255,0,255))*256+Math.round(We(Ot.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,r=Ot.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Kt){$e.workingToColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(hr);const i=ha(mi.h,hr.h,t),s=ha(mi.s,hr.s,t),r=ha(mi.l,hr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new qe;qe.NAMES=wu;class Ff extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new G,Wn=new G,ba=new G,Xn=new G,ts=new G,ns=new G,ac=new G,ya=new G,Sa=new G,Ea=new G,Ta=new ut,Aa=new ut,wa=new ut;class gn{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),dn.subVectors(e,t),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){dn.subVectors(s,t),Wn.subVectors(i,t),ba.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(Wn),l=dn.dot(ba),c=Wn.dot(Wn),u=Wn.dot(ba),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(c*l-o*u)*d,g=(a*u-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Xn.x),l.addScaledVector(a,Xn.y),l.addScaledVector(o,Xn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ta.setScalar(0),Aa.setScalar(0),wa.setScalar(0),Ta.fromBufferAttribute(e,t),Aa.fromBufferAttribute(e,i),wa.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ta,r.x),a.addScaledVector(Aa,r.y),a.addScaledVector(wa,r.z),a}static isFrontFacing(e,t,i,s){return dn.subVectors(i,t),Wn.subVectors(e,t),dn.cross(Wn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),dn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return gn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ts.subVectors(s,i),ns.subVectors(r,i),ya.subVectors(e,i);const l=ts.dot(ya),c=ns.dot(ya);if(l<=0&&c<=0)return t.copy(i);Sa.subVectors(e,s);const u=ts.dot(Sa),f=ns.dot(Sa);if(u>=0&&f<=u)return t.copy(s);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(ts,a);Ea.subVectors(e,r);const p=ts.dot(Ea),g=ns.dot(Ea);if(g>=0&&p<=g)return t.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(ns,o);const h=u*g-p*f;if(h<=0&&f-u>=0&&p-g>=0)return ac.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(ac,o);const m=1/(h+x+d);return a=x*m,o=d*m,t.copy(i).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Xi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pr.copy(i.boundingBox)),pr.applyMatrix4(e.matrixWorld),this.union(pr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),mr.subVectors(this.max,Ls),is.subVectors(e.a,Ls),ss.subVectors(e.b,Ls),rs.subVectors(e.c,Ls),gi.subVectors(ss,is),vi.subVectors(rs,ss),wi.subVectors(is,rs);let t=[0,-gi.z,gi.y,0,-vi.z,vi.y,0,-wi.z,wi.y,gi.z,0,-gi.x,vi.z,0,-vi.x,wi.z,0,-wi.x,-gi.y,gi.x,0,-vi.y,vi.x,0,-wi.y,wi.x,0];return!Ra(t,is,ss,rs,mr)||(t=[1,0,0,0,1,0,0,0,1],!Ra(t,is,ss,rs,mr))?!1:(gr.crossVectors(gi,vi),t=[gr.x,gr.y,gr.z],Ra(t,is,ss,rs,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qn=[new G,new G,new G,new G,new G,new G,new G,new G],fn=new G,pr=new Xi,is=new G,ss=new G,rs=new G,gi=new G,vi=new G,wi=new G,Ls=new G,mr=new G,gr=new G,Ri=new G;function Ra(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ri.fromArray(n,r);const o=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),l=e.dot(Ri),c=t.dot(Ri),u=i.dot(Ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Mt=new G,vr=new Ve;let Of=0;class yn extends Wi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xl,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXY(t,vr.x,vr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ps(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Yt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ps(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ps(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ps(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ps(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),s=Yt(s,this.array),r=Yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ru extends yn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Cu extends yn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Vt extends yn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const kf=new Xi,Ds=new G,Ca=new G;class er{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):kf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);const t=Ds.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ds,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ca.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(Ca)),this.expandByPoint(Ds.copy(e.center).sub(Ca))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Bf=0;const an=new at,Pa=new Ut,as=new G,tn=new Xi,Us=new Xi,Rt=new G;class Sn extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?Cu:Ru)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ne().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return Pa.lookAt(e),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(tn.min,Us.min),tn.expandByPoint(Rt),Rt.addVectors(tn.max,Us.max),tn.expandByPoint(Rt)):(tn.expandByPoint(Us.min),tn.expandByPoint(Us.max))}tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Rt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Rt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Rt.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),Rt.add(as)),s=Math.max(s,i.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new yn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new G,l[_]=new G;const c=new G,u=new G,f=new G,d=new Ve,p=new Ve,g=new Ve,x=new G,h=new G;function m(_,E,N){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,N),d.fromBufferAttribute(r,_),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,N),u.sub(c),f.sub(c),p.sub(d),g.sub(d);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(I),h.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(I),o[_].add(x),o[E].add(x),o[N].add(x),l[_].add(h),l[E].add(h),l[N].add(h))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let _=0,E=A.length;_<E;++_){const N=A[_],I=N.start,D=N.count;for(let Z=I,K=I+D;Z<K;Z+=3)m(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const C=new G,b=new G,w=new G,T=new G;function R(_){w.fromBufferAttribute(s,_),T.copy(w);const E=o[_];C.copy(E),C.sub(w.multiplyScalar(w.dot(E))).normalize(),b.crossVectors(T,E);const I=b.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,I)}for(let _=0,E=A.length;_<E;++_){const N=A[_],I=N.start,D=N.count;for(let Z=I,K=I+D;Z<K;Z+=3)R(e.getX(Z+0)),R(e.getX(Z+1)),R(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new yn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const s=new G,r=new G,a=new G,o=new G,l=new G,c=new G,u=new G,f=new G;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),x=e.getX(d+1),h=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,h),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,h),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(h,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let x=0,h=l.length;x<h;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let m=0;m<u;m++)d[g++]=c[p++]}return new yn(d,u,f)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let zf=0;class tr extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=js(),this.name="",this.type="Material",this.blending=_s,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(i.blending=this.blending),this.side!==Ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==no&&(i.blendSrc=this.blendSrc),this.blendDst!==io&&(i.blendDst=this.blendDst),this.blendEquation!==Li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==bs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ve().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Yn=new G,Ia=new G,_r=new G,_i=new G,La=new G,xr=new G,Da=new G;class Pu{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ia.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Ia);const r=e.distanceTo(t)*.5,a=-this.direction.dot(_r),o=_i.dot(this.direction),l=-_i.dot(_r),c=_i.lengthSq(),u=Math.abs(1-a*a);let f,d,p,g;if(u>0)if(f=a*l-o,d=a*o-l,g=r*u,f>=0)if(d>=-g)if(d<=g){const x=1/u;f*=x,d*=x,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ia).addScaledVector(_r,d),p}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);const i=Yn.dot(this.direction),s=Yn.dot(Yn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,i,s,r){La.subVectors(t,e),xr.subVectors(i,e),Da.crossVectors(La,xr);let a=this.direction.dot(Da),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const l=o*this.direction.dot(xr.crossVectors(_i,xr));if(l<0)return null;const c=o*this.direction.dot(La.cross(_i));if(c<0||l+c>a)return null;const u=-o*_i.dot(Da);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nr extends tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const oc=new at,Ci=new Pu,Mr=new er,lc=new G,br=new G,yr=new G,Sr=new G,Ua=new G,Er=new G,cc=new G,Tr=new G;class Pt extends Ut{constructor(e=new Sn,t=new nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(Ua.fromBufferAttribute(f,e),a?Er.addScaledVector(Ua,u):Er.addScaledVector(Ua.sub(t),u))}t.add(Er)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Mr.copy(i.boundingSphere),Mr.applyMatrix4(r),Ci.copy(e.ray).recast(e.near),!(Mr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(Mr,lc)===null||Ci.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(oc.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(oc),!(i.boundingBox!==null&&Ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const h=d[g],m=a[h.materialIndex],A=Math.max(h.start,p.start),C=Math.min(o.count,Math.min(h.start+h.count,p.start+p.count));for(let b=A,w=C;b<w;b+=3){const T=o.getX(b),R=o.getX(b+1),_=o.getX(b+2);s=Ar(this,m,e,i,c,u,f,T,R,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let h=g,m=x;h<m;h+=3){const A=o.getX(h),C=o.getX(h+1),b=o.getX(h+2);s=Ar(this,a,e,i,c,u,f,A,C,b),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const h=d[g],m=a[h.materialIndex],A=Math.max(h.start,p.start),C=Math.min(l.count,Math.min(h.start+h.count,p.start+p.count));for(let b=A,w=C;b<w;b+=3){const T=b,R=b+1,_=b+2;s=Ar(this,m,e,i,c,u,f,T,R,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let h=g,m=x;h<m;h+=3){const A=h,C=h+1,b=h+2;s=Ar(this,a,e,i,c,u,f,A,C,b),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}}}function Gf(n,e,t,i,s,r,a,o){let l;if(e.side===Jt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Ei,o),l===null)return null;Tr.copy(o),Tr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Tr);return c<t.near||c>t.far?null:{distance:c,point:Tr.clone(),object:n}}function Ar(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,br),n.getVertexPosition(l,yr),n.getVertexPosition(c,Sr);const u=Gf(n,e,t,i,br,yr,Sr,cc);if(u){const f=new G;gn.getBarycoord(cc,br,yr,Sr,f),s&&(u.uv=gn.getInterpolatedAttribute(s,o,l,c,f,new Ve)),r&&(u.uv1=gn.getInterpolatedAttribute(r,o,l,c,f,new Ve)),a&&(u.normal=gn.getInterpolatedAttribute(a,o,l,c,f,new G),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new G,materialIndex:0};gn.getNormal(br,yr,Sr,d.normal),u.face=d,u.barycoord=f}return u}class xl extends Ht{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Dt,u=Dt,f,d){super(null,a,o,l,c,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uc extends yn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const os=new at,dc=new at,wr=[],fc=new Xi,Hf=new at,Ns=new Pt,Fs=new er;class Iu extends Pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Hf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,os),fc.copy(e.boundingBox).applyMatrix4(os),this.boundingBox.union(fc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new er),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,os),Fs.copy(e.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ns.geometry=this.geometry,Ns.material=this.material,Ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(i),e.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),dc.multiplyMatrices(i,os),Ns.matrixWorld=dc,Ns.raycast(e,wr);for(let a=0,o=wr.length;a<o;a++){const l=wr[a];l.instanceId=r,l.object=this,t.push(l)}wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new xl(new Float32Array(s*this.count),s,this.count,dl,vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Na=new G,Vf=new G,$f=new Ne;class Ii{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Na.subVectors(i,t).cross(Vf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Na),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$f.getNormalMatrix(e),s=this.coplanarPoint(Na).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new er,Wf=new Ve(.5,.5),Rr=new G;class Ml{constructor(e=new Ii,t=new Ii,i=new Ii,s=new Ii,r=new Ii,a=new Ii){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=On,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],d=r[6],p=r[7],g=r[8],x=r[9],h=r[10],m=r[11],A=r[12],C=r[13],b=r[14],w=r[15];if(s[0].setComponents(c-a,p-u,m-g,w-A).normalize(),s[1].setComponents(c+a,p+u,m+g,w+A).normalize(),s[2].setComponents(c+o,p+f,m+x,w+C).normalize(),s[3].setComponents(c-o,p-f,m-x,w-C).normalize(),i)s[4].setComponents(l,d,h,b).normalize(),s[5].setComponents(c-l,p-d,m-h,w-b).normalize();else if(s[4].setComponents(c-l,p-d,m-h,w-b).normalize(),t===On)s[5].setComponents(c+l,p+d,m+h,w+b).normalize();else if(t===Zs)s[5].setComponents(l,d,h,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=Wf.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Rr.x=s.normal.x>0?e.max.x:e.min.x,Rr.y=s.normal.y>0?e.max.y:e.min.y,Rr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Lu extends Ht{constructor(e=[],t=Hi,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ss extends Ht{constructor(e,t,i=Gn,s,r,a,o=Dt,l=Dt,c,u=ai,f=1){if(u!==ai&&u!==ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Xf extends Ss{constructor(e,t=Gn,i=Hi,s,r,a=Dt,o=Dt,l,c=ai){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Du extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ws extends Sn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(f,2));function g(x,h,m,A,C,b,w,T,R,_,E){const N=b/R,I=w/_,D=b/2,Z=w/2,K=T/2,H=R+1,ee=_+1;let X=0,ie=0;const le=new G;for(let fe=0;fe<ee;fe++){const _e=fe*I-Z;for(let k=0;k<H;k++){const Y=k*N-D;le[x]=Y*A,le[h]=_e*C,le[m]=K,c.push(le.x,le.y,le.z),le[x]=0,le[h]=0,le[m]=T>0?1:-1,u.push(le.x,le.y,le.z),f.push(k/R),f.push(1-fe/_),X+=1}}for(let fe=0;fe<_;fe++)for(let _e=0;_e<R;_e++){const k=d+_e+H*fe,Y=d+_e+H*(fe+1),ae=d+(_e+1)+H*(fe+1),P=d+(_e+1)+H*fe;l.push(k,Y,P),l.push(Y,ae,P),ie+=6}o.addGroup(p,ie,E),p+=ie,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ws(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class jr extends Sn{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],p=[];let g=0;const x=[],h=i/2;let m=0;A(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Vt(f,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(p,2));function A(){const b=new G,w=new G;let T=0;const R=(t-e)/i;for(let _=0;_<=r;_++){const E=[],N=_/r,I=N*(t-e)+e;for(let D=0;D<=s;D++){const Z=D/s,K=Z*l+o,H=Math.sin(K),ee=Math.cos(K);w.x=I*H,w.y=-N*i+h,w.z=I*ee,f.push(w.x,w.y,w.z),b.set(H,R,ee).normalize(),d.push(b.x,b.y,b.z),p.push(Z,1-N),E.push(g++)}x.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const N=x[E][_],I=x[E+1][_],D=x[E+1][_+1],Z=x[E][_+1];(e>0||E!==0)&&(u.push(N,I,Z),T+=3),(t>0||E!==r-1)&&(u.push(I,D,Z),T+=3)}c.addGroup(m,T,0),m+=T}function C(b){const w=g,T=new Ve,R=new G;let _=0;const E=b===!0?e:t,N=b===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,h*N,0),d.push(0,N,0),p.push(.5,.5),g++;const I=g;for(let D=0;D<=s;D++){const K=D/s*l+o,H=Math.cos(K),ee=Math.sin(K);R.x=E*ee,R.y=h*N,R.z=E*H,f.push(R.x,R.y,R.z),d.push(0,N,0),T.x=H*.5+.5,T.y=ee*.5*N+.5,p.push(T.x,T.y),g++}for(let D=0;D<s;D++){const Z=w+D,K=I+D;b===!0?u.push(K,K+1,Z):u.push(K+1,K,Z),_+=3}c.addGroup(m,_,b===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ea extends jr{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ea(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rs extends Sn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=e/o,d=t/l,p=[],g=[],x=[],h=[];for(let m=0;m<u;m++){const A=m*d-a;for(let C=0;C<c;C++){const b=C*f-r;g.push(b,-A,0),x.push(0,0,1),h.push(C/o),h.push(1-m/l)}}for(let m=0;m<l;m++)for(let A=0;A<o;A++){const C=A+c*m,b=A+c*(m+1),w=A+1+c*(m+1),T=A+1+c*m;p.push(C,b,T),p.push(b,w,T)}this.setIndex(p),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zr extends Sn{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new G,d=new G,p=[],g=[],x=[],h=[];for(let m=0;m<=i;m++){const A=[],C=m/i,b=a+C*o,w=e*Math.cos(b),T=Math.sqrt(e*e-w*w);let R=0;m===0&&a===0?R=.5/t:m===i&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const E=_/t,N=s+E*r;f.x=-T*Math.cos(N),f.y=w,f.z=T*Math.sin(N),g.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),h.push(E+R,1-C),A.push(c++)}u.push(A)}for(let m=0;m<i;m++)for(let A=0;A<t;A++){const C=u[m][A+1],b=u[m][A],w=u[m+1][A],T=u[m+1][A+1];(m!==0||a>0)&&p.push(C,b,T),(m!==i-1||l<Math.PI)&&p.push(b,w,T)}this.setIndex(p),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Es(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(hc(s))s.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(hc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=Es(n[t]);for(const s in i)e[s]=i[s]}return e}function hc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function qf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Uu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Yf={clone:Es,merge:zt};var Kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kf,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=qf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ve().fromArray(s.value);break;case"v3":this.uniforms[i].value=new G().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ut().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ne().fromArray(s.value);break;case"m4":this.uniforms[i].value=new at().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Jf extends Hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class vt extends tr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vo,this.normalScale=new Ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qf extends tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jf extends tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Nu extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class eh extends Nu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Fa=new at,pc=new G,mc=new G;class th{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ve(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ml,this._frameExtents=new Ve(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;pc.setFromMatrixPosition(e.matrixWorld),t.position.copy(pc),mc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mc),t.updateMatrixWorld(),Fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Cr=new G,Pr=new As,wn=new G;class Fu extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Cr,Pr,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Cr,Pr,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xi=new G,gc=new Ve,vc=new Ve;class mn extends Fu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,gc,vc),t.subVectors(vc,gc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fa*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ta extends Fu{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class nh extends th{constructor(){super(new ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ih extends Nu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new nh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ls=-90,cs=1;class sh extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(ls,cs,e,t);s.layers=this.layers,this.add(s);const r=new mn(ls,cs,e,t);r.layers=this.layers,this.add(r);const a=new mn(ls,cs,e,t);a.layers=this.layers,this.add(a);const o=new mn(ls,cs,e,t);o.layers=this.layers,this.add(o);const l=new mn(ls,cs,e,t);l.layers=this.layers,this.add(l);const c=new mn(ls,cs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===On)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class rh extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const _c=new at;class ah{constructor(e,t,i=0,s=1/0){this.ray=new Pu(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new _l,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _c.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_c),this}intersectObject(e,t=!0,i=[]){return Wo(e,this,i,t),i.sort(xc),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Wo(e[s],this,i,t);return i.sort(xc),i}}function xc(n,e){return n.distance-e.distance}function Wo(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Wo(r[a],e,t,!0)}}class Ou{static{Ou.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function Mc(n,e,t,i){const s=oh(i);switch(t){case Su:return n*e;case dl:return n*e/s.components*s.byteLength;case fl:return n*e/s.components*s.byteLength;case Vi:return n*e*2/s.components*s.byteLength;case hl:return n*e*2/s.components*s.byteLength;case Eu:return n*e*3/s.components*s.byteLength;case _n:return n*e*4/s.components*s.byteLength;case pl:return n*e*4/s.components*s.byteLength;case Nr:case Fr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Or:case kr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case po:case go:return Math.max(n,16)*Math.max(e,8)/4;case ho:case mo:return Math.max(n,8)*Math.max(e,8)/2;case vo:case _o:case Mo:case bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xo:case Wr:case yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case To:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case wo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Co:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Io:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case No:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Oo:case ko:case Bo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case zo:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xr:case Ho:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function oh(n){switch(n){case sn:case xu:return{byteLength:1,components:1};case Ys:case Mu:case ri:return{byteLength:2,components:1};case cl:case ul:return{byteLength:2,components:4};case Gn:case ll:case vn:return{byteLength:4,components:1};case bu:case yu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ku(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function lh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ch=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uh=`#ifdef USE_ALPHAHASH
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
#endif`,dh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ph=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mh=`#ifdef USE_AOMAP
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
#endif`,gh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vh=`#ifdef USE_BATCHING
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
#endif`,_h=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yh=`#ifdef USE_IRIDESCENCE
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
#endif`,Sh=`#ifdef USE_BUMPMAP
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
#endif`,Eh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Th=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ch=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ph=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ih=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Lh=`#define PI 3.141592653589793
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
} // validated`,Dh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Uh=`vec3 transformedNormal = objectNormal;
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
#endif`,Nh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Oh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bh="gl_FragColor = linearToOutputTexel( gl_FragColor );",zh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gh=`#ifdef USE_ENVMAP
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
#endif`,Hh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vh=`#ifdef USE_ENVMAP
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
#endif`,$h=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zh=`#ifdef USE_GRADIENTMAP
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
}`,Jh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ep=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,tp=`#ifdef USE_ENVMAP
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
#endif`,np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#endif`,op=`uniform sampler2D dfgLUT;
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
}`,lp=`
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
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
#endif`,up=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_p=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xp=`#if defined( USE_POINTS_UV )
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
#endif`,Mp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Lp=`#ifdef USE_NORMALMAP
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
#endif`,Dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Up=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yp=`float getShadowMask() {
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
}`,Kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zp=`#ifdef USE_SKINNING
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
#endif`,Jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qp=`#ifdef USE_SKINNING
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
#endif`,jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,em=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
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
#endif`,sm=`#ifdef USE_TRANSMISSION
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,um=`uniform sampler2D t2D;
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
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
}`,gm=`#if DEPTH_PACKING == 3200
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
}`,vm=`#define DISTANCE
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
}`,_m=`#define DISTANCE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`uniform float scale;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Sm=`#include <common>
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
}`,Em=`uniform vec3 diffuse;
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
}`,Tm=`#define LAMBERT
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
}`,Am=`#define LAMBERT
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
}`,wm=`#define MATCAP
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
}`,Rm=`#define MATCAP
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
}`,Cm=`#define NORMAL
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
}`,Pm=`#define NORMAL
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
}`,Im=`#define PHONG
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
}`,Lm=`#define PHONG
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
}`,Dm=`#define STANDARD
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
}`,Um=`#define STANDARD
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
}`,Nm=`#define TOON
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
}`,Fm=`#define TOON
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
}`,Om=`uniform float size;
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
}`,km=`uniform vec3 diffuse;
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
}`,Bm=`#include <common>
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
}`,zm=`uniform vec3 color;
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
}`,Gm=`uniform float rotation;
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
}`,Hm=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:ch,alphahash_pars_fragment:uh,alphamap_fragment:dh,alphamap_pars_fragment:fh,alphatest_fragment:hh,alphatest_pars_fragment:ph,aomap_fragment:mh,aomap_pars_fragment:gh,batching_pars_vertex:vh,batching_vertex:_h,begin_vertex:xh,beginnormal_vertex:Mh,bsdfs:bh,iridescence_fragment:yh,bumpmap_pars_fragment:Sh,clipping_planes_fragment:Eh,clipping_planes_pars_fragment:Th,clipping_planes_pars_vertex:Ah,clipping_planes_vertex:wh,color_fragment:Rh,color_pars_fragment:Ch,color_pars_vertex:Ph,color_vertex:Ih,common:Lh,cube_uv_reflection_fragment:Dh,defaultnormal_vertex:Uh,displacementmap_pars_vertex:Nh,displacementmap_vertex:Fh,emissivemap_fragment:Oh,emissivemap_pars_fragment:kh,colorspace_fragment:Bh,colorspace_pars_fragment:zh,envmap_fragment:Gh,envmap_common_pars_fragment:Hh,envmap_pars_fragment:Vh,envmap_pars_vertex:$h,envmap_physical_pars_fragment:tp,envmap_vertex:Wh,fog_vertex:Xh,fog_pars_vertex:qh,fog_fragment:Yh,fog_pars_fragment:Kh,gradientmap_pars_fragment:Zh,lightmap_pars_fragment:Jh,lights_lambert_fragment:Qh,lights_lambert_pars_fragment:jh,lights_pars_begin:ep,lights_toon_fragment:np,lights_toon_pars_fragment:ip,lights_phong_fragment:sp,lights_phong_pars_fragment:rp,lights_physical_fragment:ap,lights_physical_pars_fragment:op,lights_fragment_begin:lp,lights_fragment_maps:cp,lights_fragment_end:up,lightprobes_pars_fragment:dp,logdepthbuf_fragment:fp,logdepthbuf_pars_fragment:hp,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:mp,map_fragment:gp,map_pars_fragment:vp,map_particle_fragment:_p,map_particle_pars_fragment:xp,metalnessmap_fragment:Mp,metalnessmap_pars_fragment:bp,morphinstance_vertex:yp,morphcolor_vertex:Sp,morphnormal_vertex:Ep,morphtarget_pars_vertex:Tp,morphtarget_vertex:Ap,normal_fragment_begin:wp,normal_fragment_maps:Rp,normal_pars_fragment:Cp,normal_pars_vertex:Pp,normal_vertex:Ip,normalmap_pars_fragment:Lp,clearcoat_normal_fragment_begin:Dp,clearcoat_normal_fragment_maps:Up,clearcoat_pars_fragment:Np,iridescence_pars_fragment:Fp,opaque_fragment:Op,packing:kp,premultiplied_alpha_fragment:Bp,project_vertex:zp,dithering_fragment:Gp,dithering_pars_fragment:Hp,roughnessmap_fragment:Vp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Wp,shadowmap_pars_vertex:Xp,shadowmap_vertex:qp,shadowmask_pars_fragment:Yp,skinbase_vertex:Kp,skinning_pars_vertex:Zp,skinning_vertex:Jp,skinnormal_vertex:Qp,specularmap_fragment:jp,specularmap_pars_fragment:em,tonemapping_fragment:tm,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:am,uv_vertex:om,worldpos_vertex:lm,background_vert:cm,background_frag:um,backgroundCube_vert:dm,backgroundCube_frag:fm,cube_vert:hm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distance_vert:vm,distance_frag:_m,equirect_vert:xm,equirect_frag:Mm,linedashed_vert:bm,linedashed_frag:ym,meshbasic_vert:Sm,meshbasic_frag:Em,meshlambert_vert:Tm,meshlambert_frag:Am,meshmatcap_vert:wm,meshmatcap_frag:Rm,meshnormal_vert:Cm,meshnormal_frag:Pm,meshphong_vert:Im,meshphong_frag:Lm,meshphysical_vert:Dm,meshphysical_frag:Um,meshtoon_vert:Nm,meshtoon_frag:Fm,points_vert:Om,points_frag:km,shadow_vert:Bm,shadow_frag:zm,sprite_vert:Gm,sprite_frag:Hm},ve={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Dn={basic:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:zt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:zt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new qe(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:zt([ve.points,ve.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:zt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:zt([ve.common,ve.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:zt([ve.sprite,ve.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:zt([ve.common,ve.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:zt([ve.lights,ve.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Dn.physical={uniforms:zt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ir={r:0,b:0,g:0},Vm=new at,Bu=new Ne;Bu.set(-1,0,0,0,1,0,0,0,1);function $m(n,e,t,i,s,r){const a=new qe(0);let o=s===!0?0:1,l,c,u=null,f=0,d=null;function p(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){const b=A.backgroundBlurriness>0;C=e.get(C,b)}return C}function g(A){let C=!1;const b=p(A);b===null?h(a,o):b&&b.isColor&&(h(b,1),C=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(A,C){const b=p(C);b&&(b.isCubeTexture||b.mapping===Qr)?(c===void 0&&(c=new Pt(new ws(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Es(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Bu),c.material.toneMapped=$e.getTransfer(b.colorSpace)!==et,(u!==b||f!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Pt(new Rs(2,2),new Hn({name:"BackgroundMaterial",uniforms:Es(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=$e.getTransfer(b.colorSpace)!==et,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function h(A,C){A.getRGB(Ir,Uu(n)),t.buffers.color.setClear(Ir.r,Ir.g,Ir.b,C,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,h(a,o)},render:g,addToRenderList:x,dispose:m}}function Wm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(I,D,Z,K,H){let ee=!1;const X=f(I,K,Z,D);r!==X&&(r=X,c(r.object)),ee=p(I,K,Z,H),ee&&g(I,K,Z,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,b(I,D,Z,K),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,D,Z,K){const H=K.wireframe===!0;let ee=i[D.id];ee===void 0&&(ee={},i[D.id]=ee);const X=I.isInstancedMesh===!0?I.id:0;let ie=ee[X];ie===void 0&&(ie={},ee[X]=ie);let le=ie[Z.id];le===void 0&&(le={},ie[Z.id]=le);let fe=le[H];return fe===void 0&&(fe=d(l()),le[H]=fe),fe}function d(I){const D=[],Z=[],K=[];for(let H=0;H<t;H++)D[H]=0,Z[H]=0,K[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:Z,attributeDivisors:K,object:I,attributes:{},index:null}}function p(I,D,Z,K){const H=r.attributes,ee=D.attributes;let X=0;const ie=Z.getAttributes();for(const le in ie)if(ie[le].location>=0){const _e=H[le];let k=ee[le];if(k===void 0&&(le==="instanceMatrix"&&I.instanceMatrix&&(k=I.instanceMatrix),le==="instanceColor"&&I.instanceColor&&(k=I.instanceColor)),_e===void 0||_e.attribute!==k||k&&_e.data!==k.data)return!0;X++}return r.attributesNum!==X||r.index!==K}function g(I,D,Z,K){const H={},ee=D.attributes;let X=0;const ie=Z.getAttributes();for(const le in ie)if(ie[le].location>=0){let _e=ee[le];_e===void 0&&(le==="instanceMatrix"&&I.instanceMatrix&&(_e=I.instanceMatrix),le==="instanceColor"&&I.instanceColor&&(_e=I.instanceColor));const k={};k.attribute=_e,_e&&_e.data&&(k.data=_e.data),H[le]=k,X++}r.attributes=H,r.attributesNum=X,r.index=K}function x(){const I=r.newAttributes;for(let D=0,Z=I.length;D<Z;D++)I[D]=0}function h(I){m(I,0)}function m(I,D){const Z=r.newAttributes,K=r.enabledAttributes,H=r.attributeDivisors;Z[I]=1,K[I]===0&&(n.enableVertexAttribArray(I),K[I]=1),H[I]!==D&&(n.vertexAttribDivisor(I,D),H[I]=D)}function A(){const I=r.newAttributes,D=r.enabledAttributes;for(let Z=0,K=D.length;Z<K;Z++)D[Z]!==I[Z]&&(n.disableVertexAttribArray(Z),D[Z]=0)}function C(I,D,Z,K,H,ee,X){X===!0?n.vertexAttribIPointer(I,D,Z,H,ee):n.vertexAttribPointer(I,D,Z,K,H,ee)}function b(I,D,Z,K){x();const H=K.attributes,ee=Z.getAttributes(),X=D.defaultAttributeValues;for(const ie in ee){const le=ee[ie];if(le.location>=0){let fe=H[ie];if(fe===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor)),fe!==void 0){const _e=fe.normalized,k=fe.itemSize,Y=e.get(fe);if(Y===void 0)continue;const ae=Y.buffer,P=Y.type,z=Y.bytesPerElement,Q=P===n.INT||P===n.UNSIGNED_INT||fe.gpuType===ll;if(fe.isInterleavedBufferAttribute){const oe=fe.data,re=oe.stride,Le=fe.offset;if(oe.isInstancedInterleavedBuffer){for(let Ae=0;Ae<le.locationSize;Ae++)m(le.location+Ae,oe.meshPerAttribute);I.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ae=0;Ae<le.locationSize;Ae++)h(le.location+Ae);n.bindBuffer(n.ARRAY_BUFFER,ae);for(let Ae=0;Ae<le.locationSize;Ae++)C(le.location+Ae,k/le.locationSize,P,_e,re*z,(Le+k/le.locationSize*Ae)*z,Q)}else{if(fe.isInstancedBufferAttribute){for(let oe=0;oe<le.locationSize;oe++)m(le.location+oe,fe.meshPerAttribute);I.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let oe=0;oe<le.locationSize;oe++)h(le.location+oe);n.bindBuffer(n.ARRAY_BUFFER,ae);for(let oe=0;oe<le.locationSize;oe++)C(le.location+oe,k/le.locationSize,P,_e,k*z,k/le.locationSize*oe*z,Q)}}else if(X!==void 0){const _e=X[ie];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(le.location,_e);break;case 3:n.vertexAttrib3fv(le.location,_e);break;case 4:n.vertexAttrib4fv(le.location,_e);break;default:n.vertexAttrib1fv(le.location,_e)}}}}A()}function w(){E();for(const I in i){const D=i[I];for(const Z in D){const K=D[Z];for(const H in K){const ee=K[H];for(const X in ee)u(ee[X].object),delete ee[X];delete K[H]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const D=i[I.id];for(const Z in D){const K=D[Z];for(const H in K){const ee=K[H];for(const X in ee)u(ee[X].object),delete ee[X];delete K[H]}}delete i[I.id]}function R(I){for(const D in i){const Z=i[D];for(const K in Z){const H=Z[K];if(H[I.id]===void 0)continue;const ee=H[I.id];for(const X in ee)u(ee[X].object),delete ee[X];delete H[I.id]}}}function _(I){for(const D in i){const Z=i[D],K=I.isInstancedMesh===!0?I.id:0,H=Z[K];if(H!==void 0){for(const ee in H){const X=H[ee];for(const ie in X)u(X[ie].object),delete X[ie];delete H[ee]}delete Z[K],Object.keys(Z).length===0&&delete i[D]}}}function E(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:N,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:h,disableUnusedAttributes:A}}function Xm(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function qm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==_n&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==sn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==vn&&!_)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ue("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),h=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:h,maxAttributes:m,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:b,maxSamples:w,samples:T}}function Ym(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Ii,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||s;return s=d,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,x=f.clipIntersection,h=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!h)r?u(null):c();else{const A=r?0:i,C=A*4;let b=m.clippingState||null;l.value=b,b=u(g,d,C,p);for(let w=0;w!==C;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,g){const x=f!==null?f.length:0;let h=null;if(x!==0){if(h=l.value,g!==!0||h===null){const m=p+x*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(h===null||h.length<m)&&(h=new Float32Array(m));for(let C=0,b=p;C!==x;++C,b+=4)a.copy(f[C]).applyMatrix4(A,o),a.normal.toArray(h,b),h[b+3]=a.constant}l.value=h,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,h}}const yi=4,bc=[.125,.215,.35,.446,.526,.582],Di=20,Km=256,Os=new ta,yc=new qe;let Oa=null,ka=0,Ba=0,za=!1;const Zm=new G;class Sc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Zm}=r;Oa=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa,ka,Ba),this._renderer.xr.enabled=za,e.scissorTest=!1,us(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:ri,format:_n,colorSpace:qr,depthBuffer:!1},s=Ec(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ec(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Jm(r)),this._blurMaterial=jm(r,e,t),this._ggxMaterial=Qm(r,e,t)}return s}_compileMaterial(e){const t=new Pt(new Sn,e);this._renderer.compile(t,Os)}_sceneToCubeUV(e,t,i,s,r){const l=new mn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(yc),f.toneMapping=Bn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new ws,new nr({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,h=x.material;let m=!1;const A=e.background;A?A.isColor&&(h.color.copy(A),e.background=null,m=!0):(h.color.copy(yc),m=!0);for(let C=0;C<6;C++){const b=C%3;b===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):b===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));const w=this._cubeSize;us(s,b*w,C>2?w:0,w,w),f.setRenderTarget(s),m&&f.render(x,l),f.render(e,l)}f.toneMapping=p,f.autoClear=d,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Hi||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;us(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Os)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,p=f*d,{_lodMax:g}=this,x=this._sizeLods[i],h=3*x*(i>g-yi?i-g+yi:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,us(r,h,m,3*x,2*x),s.setRenderTarget(r),s.render(o,Os),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,us(e,h,m,3*x,2*x),s.setRenderTarget(e),s.render(o,Os)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Di-1),x=r/g,h=isFinite(r)?1+Math.floor(u*x):Di;h>Di&&Ue(`sigmaRadians, ${r}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${Di}`);const m=[];let A=0;for(let R=0;R<Di;++R){const _=R/x,E=Math.exp(-_*_/2);m.push(E),R===0?A+=E:R<h&&(A+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/A;d.envMap.value=e.texture,d.samples.value=h,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:C}=this;d.dTheta.value=g,d.mipInt.value=C-i;const b=this._sizeLods[s],w=3*b*(s>C-yi?s-C+yi:0),T=4*(this._cubeSize-b);us(t,w,T,3*b,2*b),l.setRenderTarget(t),l.render(f,Os)}}function Jm(n){const e=[],t=[],i=[];let s=n;const r=n-yi+1+bc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-yi?l=bc[a-n+yi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,x=3,h=2,m=1,A=new Float32Array(x*g*p),C=new Float32Array(h*g*p),b=new Float32Array(m*g*p);for(let T=0;T<p;T++){const R=T%3*2/3-1,_=T>2?0:-1,E=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];A.set(E,x*g*T),C.set(d,h*g*T);const N=[T,T,T,T,T,T];b.set(N,m*g*T)}const w=new Sn;w.setAttribute("position",new yn(A,x)),w.setAttribute("uv",new yn(C,h)),w.setAttribute("faceIndex",new yn(b,m)),i.push(new Pt(w,null)),s>yi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ec(n,e,t){const i=new zn(n,e,t);return i.texture.mapping=Qr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function us(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Qm(n,e,t){return new Hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Km,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:na(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function jm(n,e,t){const i=new Float32Array(Di),s=new G(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:na(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Tc(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:na(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ac(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function na(){return`

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
	`}class zu extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Lu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ws(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:Es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Jt,blending:ii});r.uniforms.tEquirect.value=t;const a=new Pt(s,r),o=t.minFilter;return t.minFilter===Oi&&(t.minFilter=kt),new sh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function e0(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){const p=d.mapping;if(p===ca||p===ua)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const x=new zu(g.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,g=p===ca||p===ua,x=p===Hi||p===ys;if(g||x){let h=t.get(d);const m=h!==void 0?h.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new Sc(n)),h=g?i.fromEquirectangular(d,h):i.fromCubemap(d,h),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),h.texture;if(h!==void 0)return h.texture;{const A=d.image;return g&&A&&A.height>0||x&&A&&l(A)?(i===null&&(i=new Sc(n)),h=g?i.fromEquirectangular(d):i.fromCubemap(d),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),d.addEventListener("dispose",u),h.texture):null}}}return d}function o(d,p){return p===ca?d.mapping=Hi:p===ua&&(d.mapping=ys),d}function l(d){let p=0;const g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function c(d){const p=d.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function t0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&xs("WebGLRenderer: "+i+" extension not supported."),s}}}function n0(n,e,t,i){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const A=p.array;x=p.version;for(let C=0,b=A.length;C<b;C+=3){const w=A[C+0],T=A[C+1],R=A[C+2];d.push(w,T,T,R,R,w)}}else{const A=g.array;x=g.version;for(let C=0,b=A.length/3-1;C<b;C+=3){const w=C+0,T=C+1,R=C+2;d.push(w,T,T,R,R,w)}}const h=new(g.count>=65535?Cu:Ru)(d,1);h.version=x;const m=r.get(f);m&&e.remove(m),r.set(f,h)}function u(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function i0(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),t.update(d,i,1)}function c(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,f*a,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let x=0;for(let h=0;h<p;h++)x+=d[h];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function s0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function r0(n,e,t){const i=new WeakMap,s=new ut;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let N=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",N)};var p=N;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let b=0;g===!0&&(b=1),x===!0&&(b=2),h===!0&&(b=3);let w=o.attributes.position.count*b,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*T*4*f),_=new Au(R,w,T,f);_.type=vn,_.needsUpdate=!0;const E=b*4;for(let I=0;I<f;I++){const D=m[I],Z=A[I],K=C[I],H=w*T*4*I;for(let ee=0;ee<D.count;ee++){const X=ee*E;g===!0&&(s.fromBufferAttribute(D,ee),R[H+X+0]=s.x,R[H+X+1]=s.y,R[H+X+2]=s.z,R[H+X+3]=0),x===!0&&(s.fromBufferAttribute(Z,ee),R[H+X+4]=s.x,R[H+X+5]=s.y,R[H+X+6]=s.z,R[H+X+7]=0),h===!0&&(s.fromBufferAttribute(K,ee),R[H+X+8]=s.x,R[H+X+9]=s.y,R[H+X+10]=s.z,R[H+X+11]=K.itemSize===4?s.w:1)}}d={count:f,texture:_,size:new Ve(w,T)},i.set(o,d),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let h=0;h<c.length;h++)g+=c[h];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function a0(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const o0={[fu]:"LINEAR_TONE_MAPPING",[hu]:"REINHARD_TONE_MAPPING",[pu]:"CINEON_TONE_MAPPING",[ol]:"ACES_FILMIC_TONE_MAPPING",[gu]:"AGX_TONE_MAPPING",[vu]:"NEUTRAL_TONE_MAPPING",[mu]:"CUSTOM_TONE_MAPPING"};function l0(n,e,t,i,s,r){const a=new zn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ss(e,t):void 0}),o=new zn(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),l=new Sn;l.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Vt([0,2,0,0,2,0],2));const c=new Jf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Pt(l,c),f=new ta(-1,1,1,-1,0,1);let d=null,p=null,g=!1,x,h=null,m=[],A=!1;this.setSize=function(C,b){a.setSize(C,b),o.setSize(C,b);for(let w=0;w<m.length;w++){const T=m[w];T.setSize&&T.setSize(C,b)}},this.setEffects=function(C){m=C,A=m.length>0&&m[0].isRenderPass===!0;const b=a.width,w=a.height;for(let T=0;T<m.length;T++){const R=m[T];R.setSize&&R.setSize(b,w)}},this.begin=function(C,b){if(g||C.toneMapping===Bn&&m.length===0)return!1;if(h=b,b!==null){const w=b.width,T=b.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return A===!1&&C.setRenderTarget(a),x=C.toneMapping,C.toneMapping=Bn,!0},this.hasRenderPass=function(){return A},this.end=function(C,b){C.toneMapping=x,g=!0;let w=a,T=o;for(let R=0;R<m.length;R++){const _=m[R];if(_.enabled!==!1&&(_.render(C,T,w,b),_.needsSwap!==!1)){const E=w;w=T,T=E}}if(d!==C.outputColorSpace||p!==C.toneMapping){d=C.outputColorSpace,p=C.toneMapping,c.defines={},$e.getTransfer(d)===et&&(c.defines.SRGB_TRANSFER="");const R=o0[p];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,C.setRenderTarget(h),C.render(u,f),h=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Gu=new Ht,Xo=new Ss(1,1),Hu=new Au,Vu=new Rf,$u=new Lu,wc=[],Rc=[],Cc=new Float32Array(16),Pc=new Float32Array(9),Ic=new Float32Array(4);function Cs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=wc[s];if(r===void 0&&(r=new Float32Array(s),wc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function At(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ia(n,e){let t=Rc[e];t===void 0&&(t=new Int32Array(e),Rc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function c0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function u0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),At(t,e)}}function d0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),At(t,e)}}function f0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),At(t,e)}}function h0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;Ic.set(i),n.uniformMatrix2fv(this.addr,!1,Ic),At(t,i)}}function p0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;Pc.set(i),n.uniformMatrix3fv(this.addr,!1,Pc),At(t,i)}}function m0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;Cc.set(i),n.uniformMatrix4fv(this.addr,!1,Cc),At(t,i)}}function g0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function v0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),At(t,e)}}function _0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),At(t,e)}}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),At(t,e)}}function M0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function b0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),At(t,e)}}function y0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),At(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),At(t,e)}}function E0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Xo.compareFunction=t.isReversedDepthBuffer()?gl:ml,r=Xo):r=Gu,t.setTexture2D(e||r,s)}function T0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Vu,s)}function A0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||$u,s)}function w0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Hu,s)}function R0(n){switch(n){case 5126:return c0;case 35664:return u0;case 35665:return d0;case 35666:return f0;case 35674:return h0;case 35675:return p0;case 35676:return m0;case 5124:case 35670:return g0;case 35667:case 35671:return v0;case 35668:case 35672:return _0;case 35669:case 35673:return x0;case 5125:return M0;case 36294:return b0;case 36295:return y0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return T0;case 35680:case 36300:case 36308:case 36293:return A0;case 36289:case 36303:case 36311:case 36292:return w0}}function C0(n,e){n.uniform1fv(this.addr,e)}function P0(n,e){const t=Cs(e,this.size,2);n.uniform2fv(this.addr,t)}function I0(n,e){const t=Cs(e,this.size,3);n.uniform3fv(this.addr,t)}function L0(n,e){const t=Cs(e,this.size,4);n.uniform4fv(this.addr,t)}function D0(n,e){const t=Cs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function U0(n,e){const t=Cs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function N0(n,e){const t=Cs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function F0(n,e){n.uniform1iv(this.addr,e)}function O0(n,e){n.uniform2iv(this.addr,e)}function k0(n,e){n.uniform3iv(this.addr,e)}function B0(n,e){n.uniform4iv(this.addr,e)}function z0(n,e){n.uniform1uiv(this.addr,e)}function G0(n,e){n.uniform2uiv(this.addr,e)}function H0(n,e){n.uniform3uiv(this.addr,e)}function V0(n,e){n.uniform4uiv(this.addr,e)}function $0(n,e,t){const i=this.cache,s=e.length,r=ia(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Xo:a=Gu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function W0(n,e,t){const i=this.cache,s=e.length,r=ia(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Vu,r[a])}function X0(n,e,t){const i=this.cache,s=e.length,r=ia(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||$u,r[a])}function q0(n,e,t){const i=this.cache,s=e.length,r=ia(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Hu,r[a])}function Y0(n){switch(n){case 5126:return C0;case 35664:return P0;case 35665:return I0;case 35666:return L0;case 35674:return D0;case 35675:return U0;case 35676:return N0;case 5124:case 35670:return F0;case 35667:case 35671:return O0;case 35668:case 35672:return k0;case 35669:case 35673:return B0;case 5125:return z0;case 36294:return G0;case 36295:return H0;case 36296:return V0;case 35678:case 36198:case 36298:case 36306:case 35682:return $0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return X0;case 36289:case 36303:case 36311:case 36292:return q0}}class K0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=R0(t.type)}}class Z0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y0(t.type)}}class J0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Ga=/(\w+)(\])?(\[|\.)?/g;function Lc(n,e){n.seq.push(e),n.map[e.id]=e}function Q0(n,e,t){const i=n.name,s=i.length;for(Ga.lastIndex=0;;){const r=Ga.exec(i),a=Ga.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Lc(t,c===void 0?new K0(o,n,e):new Z0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new J0(o),Lc(t,f)),t=f}}}class Br{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Q0(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Dc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const j0=37297;let eg=0;function tg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Uc=new Ne;function ng(n){$e._getMatrix(Uc,$e.workingColorSpace,n);const e=`mat3( ${Uc.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Yr:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Nc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+tg(n.getShaderSource(e),o)}else return r}function ig(n,e){const t=ng(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const sg={[fu]:"Linear",[hu]:"Reinhard",[pu]:"Cineon",[ol]:"ACESFilmic",[gu]:"AgX",[vu]:"Neutral",[mu]:"Custom"};function rg(n,e){const t=sg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lr=new G;function ag(){$e.getLuminanceCoefficients(Lr);const n=Lr.x.toFixed(4),e=Lr.y.toFixed(4),t=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function og(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function lg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function cg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Gs(n){return n!==""}function Fc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Oc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(n){return n.replace(ug,fg)}const dg=new Map;function fg(n,e){let t=Be[e];if(t===void 0){const i=dg.get(e);if(i!==void 0)t=Be[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qo(t)}const hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(n){return n.replace(hg,pg)}function pg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const mg={[Ur]:"SHADOWMAP_TYPE_PCF",[zs]:"SHADOWMAP_TYPE_VSM"};function gg(n){return mg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const vg={[Hi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Qr]:"ENVMAP_TYPE_CUBE_UV"};function _g(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":vg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const xg={[ys]:"ENVMAP_MODE_REFRACTION"};function Mg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":xg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const bg={[du]:"ENVMAP_BLENDING_MULTIPLY",[of]:"ENVMAP_BLENDING_MIX",[lf]:"ENVMAP_BLENDING_ADD"};function yg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":bg[n.combine]||"ENVMAP_BLENDING_NONE"}function Sg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Eg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=gg(t),c=_g(t),u=Mg(t),f=yg(t),d=Sg(t),p=og(t),g=lg(r),x=s.createProgram();let h,m,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gs).join(`
`),h.length>0&&(h+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gs).join(`
`),m.length>0&&(m+=`
`)):(h=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),m=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Bn?rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,ig("linearToOutputTexel",t.outputColorSpace),ag(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gs).join(`
`)),a=qo(a),a=Fc(a,t),a=Oc(a,t),o=qo(o),o=Fc(o,t),o=Oc(o,t),a=kc(a),o=kc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,h=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,m=["#define varying in",t.glslVersion===ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const C=A+h+a,b=A+m+o,w=Dc(s,s.VERTEX_SHADER,C),T=Dc(s,s.FRAGMENT_SHADER,b);s.attachShader(x,w),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(I){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(x)||"",Z=s.getShaderInfoLog(w)||"",K=s.getShaderInfoLog(T)||"",H=D.trim(),ee=Z.trim(),X=K.trim();let ie=!0,le=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,T);else{const fe=Nc(s,w,"vertex"),_e=Nc(s,T,"fragment");Xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+fe+`
`+_e)}else H!==""?Ue("WebGLProgram: Program Info Log:",H):(ee===""||X==="")&&(le=!1);le&&(I.diagnostics={runnable:ie,programLog:H,vertexShader:{log:ee,prefix:h},fragmentShader:{log:X,prefix:m}})}s.deleteShader(w),s.deleteShader(T),_=new Br(s,x),E=cg(s,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(x,j0)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let Tg=0;class Ag{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wg(e),t.set(e,i)),i}}class wg{constructor(e){this.id=Tg++,this.code=e,this.usedTimes=0}}function Rg(n){return n===Vi||n===Wr||n===Xr}function Cg(n,e,t,i,s,r){const a=new _l,o=new Ag,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,E,N,I,D,Z){const K=I.fog,H=D.geometry,ee=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ie=e.get(_.envMap||ee,X),le=ie&&ie.mapping===Qr?ie.image.height:null,fe=p[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Ue("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const _e=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,k=_e!==void 0?_e.length:0;let Y=0;H.morphAttributes.position!==void 0&&(Y=1),H.morphAttributes.normal!==void 0&&(Y=2),H.morphAttributes.color!==void 0&&(Y=3);let ae,P,z,Q;if(fe){const Ee=Dn[fe];ae=Ee.vertexShader,P=Ee.fragmentShader}else{ae=_.vertexShader,P=_.fragmentShader;const Ee=o.getVertexShaderStage(_),ft=o.getFragmentShaderStage(_);o.update(_,Ee,ft),z=Ee.id,Q=ft.id}const oe=n.getRenderTarget(),re=n.state.buffers.depth.getReversed(),Le=D.isInstancedMesh===!0,Ae=D.isBatchedMesh===!0,pt=!!_.map,He=!!_.matcap,it=!!ie,Ze=!!_.aoMap,Ye=!!_.lightMap,_t=!!_.bumpMap&&_.wireframe===!1,bt=!!_.normalMap,wt=!!_.displacementMap,It=!!_.emissiveMap,dt=!!_.metalnessMap,xt=!!_.roughnessMap,F=_.anisotropy>0,$t=_.clearcoat>0,je=_.dispersion>0,y=_.iridescence>0,v=_.sheen>0,B=_.transmission>0,W=F&&!!_.anisotropyMap,J=$t&&!!_.clearcoatMap,ce=$t&&!!_.clearcoatNormalMap,de=$t&&!!_.clearcoatRoughnessMap,j=y&&!!_.iridescenceMap,ne=y&&!!_.iridescenceThicknessMap,he=v&&!!_.sheenColorMap,Re=v&&!!_.sheenRoughnessMap,ge=!!_.specularMap,pe=!!_.specularColorMap,Ie=!!_.specularIntensityMap,De=B&&!!_.transmissionMap,Fe=B&&!!_.thicknessMap,U=!!_.gradientMap,ue=!!_.alphaMap,te=_.alphaTest>0,me=!!_.alphaHash,be=!!_.extensions;let se=Bn;_.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(se=n.toneMapping);const we={shaderID:fe,shaderType:_.type,shaderName:_.name,vertexShader:ae,fragmentShader:P,defines:_.defines,customVertexShaderID:z,customFragmentShaderID:Q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&D._colorsTexture!==null,instancing:Le,instancingColor:Le&&D.instanceColor!==null,instancingMorph:Le&&D.morphTexture!==null,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:pt,matcap:He,envMap:it,envMapMode:it&&ie.mapping,envMapCubeUVHeight:le,aoMap:Ze,lightMap:Ye,bumpMap:_t,normalMap:bt,displacementMap:wt,emissiveMap:It,normalMapObjectSpace:bt&&_.normalMapType===df,normalMapTangentSpace:bt&&_.normalMapType===Vo,packedNormalMap:bt&&_.normalMapType===Vo&&Rg(_.normalMap.format),metalnessMap:dt,roughnessMap:xt,anisotropy:F,anisotropyMap:W,clearcoat:$t,clearcoatMap:J,clearcoatNormalMap:ce,clearcoatRoughnessMap:de,dispersion:je,iridescence:y,iridescenceMap:j,iridescenceThicknessMap:ne,sheen:v,sheenColorMap:he,sheenRoughnessMap:Re,specularMap:ge,specularColorMap:pe,specularIntensityMap:Ie,transmission:B,transmissionMap:De,thicknessMap:Fe,gradientMap:U,opaque:_.transparent===!1&&_.blending===_s&&_.alphaToCoverage===!1,alphaMap:ue,alphaTest:te,alphaHash:me,combine:_.combine,mapUv:pt&&g(_.map.channel),aoMapUv:Ze&&g(_.aoMap.channel),lightMapUv:Ye&&g(_.lightMap.channel),bumpMapUv:_t&&g(_.bumpMap.channel),normalMapUv:bt&&g(_.normalMap.channel),displacementMapUv:wt&&g(_.displacementMap.channel),emissiveMapUv:It&&g(_.emissiveMap.channel),metalnessMapUv:dt&&g(_.metalnessMap.channel),roughnessMapUv:xt&&g(_.roughnessMap.channel),anisotropyMapUv:W&&g(_.anisotropyMap.channel),clearcoatMapUv:J&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:he&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(_.sheenRoughnessMap.channel),specularMapUv:ge&&g(_.specularMap.channel),specularColorMapUv:pe&&g(_.specularColorMap.channel),specularIntensityMapUv:Ie&&g(_.specularIntensityMap.channel),transmissionMapUv:De&&g(_.transmissionMap.channel),thicknessMapUv:Fe&&g(_.thicknessMap.channel),alphaMapUv:ue&&g(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(bt||F),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!H.attributes.uv&&(pt||ue),fog:!!K,useFog:_.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&bt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:re,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:Y,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:se,decodeVideoTexture:pt&&_.map.isVideoTexture===!0&&$e.getTransfer(_.map.colorSpace)===et,decodeVideoTextureEmissive:It&&_.emissiveMap.isVideoTexture===!0&&$e.getTransfer(_.emissiveMap.colorSpace)===et,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Jn,flipSided:_.side===Jt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:be&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function h(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)E.push(N),E.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(m(E,_),A(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function A(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const E=p[_.type];let N;if(E){const I=Dn[E];N=Yf.clone(I.uniforms)}else N=_.uniforms;return N}function b(_,E){let N=u.get(E);return N!==void 0?++N.usedTimes:(N=new Eg(n,E,_,s),c.push(N),u.set(E,N)),N}function w(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:h,getUniforms:C,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:R}}function Pg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Ig(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function zc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,x,h,m){let A=n[e];return A===void 0?(A={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:h,group:m},n[e]=A):(A.id=d.id,A.object=d,A.geometry=p,A.material=g,A.materialVariant=a(d),A.groupOrder=x,A.renderOrder=d.renderOrder,A.z=h,A.group=m),e++,A}function l(d,p,g,x,h,m){const A=o(d,p,g,x,h,m);g.transmission>0?i.push(A):g.transparent===!0?s.push(A):t.push(A)}function c(d,p,g,x,h,m){const A=o(d,p,g,x,h,m);g.transmission>0?i.unshift(A):g.transparent===!0?s.unshift(A):t.unshift(A)}function u(d,p,g){t.length>1&&t.sort(d||Ig),i.length>1&&i.sort(p||zc),s.length>1&&s.sort(p||zc),g&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let d=e,p=n.length;d<p;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function Lg(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Gc,n.set(i,[a])):s>=r.length?(a=new Gc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Dg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new qe};break;case"SpotLight":t={position:new G,direction:new G,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function Ug(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Ng=0;function Fg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Og(n){const e=new Dg,t=Ug(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const s=new G,r=new at,a=new at;function o(c){let u=0,f=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,x=0,h=0,m=0,A=0,C=0,b=0,w=0,T=0,R=0;c.sort(Fg);for(let E=0,N=c.length;E<N;E++){const I=c[E],D=I.color,Z=I.intensity,K=I.distance;let H=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Vi?H=I.shadow.map.texture:H=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=D.r*Z,f+=D.g*Z,d+=D.b*Z;else if(I.isLightProbe){for(let ee=0;ee<9;ee++)i.probe[ee].addScaledVector(I.sh.coefficients[ee],Z);R++}else if(I.isDirectionalLight){const ee=e.get(I);if(ee.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const X=I.shadow,ie=t.get(I);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,i.directionalShadow[p]=ie,i.directionalShadowMap[p]=H,i.directionalShadowMatrix[p]=I.shadow.matrix,A++}i.directional[p]=ee,p++}else if(I.isSpotLight){const ee=e.get(I);ee.position.setFromMatrixPosition(I.matrixWorld),ee.color.copy(D).multiplyScalar(Z),ee.distance=K,ee.coneCos=Math.cos(I.angle),ee.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),ee.decay=I.decay,i.spot[x]=ee;const X=I.shadow;if(I.map&&(i.spotLightMap[w]=I.map,w++,X.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[x]=X.matrix,I.castShadow){const ie=t.get(I);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,i.spotShadow[x]=ie,i.spotShadowMap[x]=H,b++}x++}else if(I.isRectAreaLight){const ee=e.get(I);ee.color.copy(D).multiplyScalar(Z),ee.halfWidth.set(I.width*.5,0,0),ee.halfHeight.set(0,I.height*.5,0),i.rectArea[h]=ee,h++}else if(I.isPointLight){const ee=e.get(I);if(ee.color.copy(I.color).multiplyScalar(I.intensity),ee.distance=I.distance,ee.decay=I.decay,I.castShadow){const X=I.shadow,ie=t.get(I);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,ie.shadowCameraNear=X.camera.near,ie.shadowCameraFar=X.camera.far,i.pointShadow[g]=ie,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=I.shadow.matrix,C++}i.point[g]=ee,g++}else if(I.isHemisphereLight){const ee=e.get(I);ee.skyColor.copy(I.color).multiplyScalar(Z),ee.groundColor.copy(I.groundColor).multiplyScalar(Z),i.hemi[m]=ee,m++}}h>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const _=i.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==x||_.rectAreaLength!==h||_.hemiLength!==m||_.numDirectionalShadows!==A||_.numPointShadows!==C||_.numSpotShadows!==b||_.numSpotMaps!==w||_.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=h,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=b+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,_.directionalLength=p,_.pointLength=g,_.spotLength=x,_.rectAreaLength=h,_.hemiLength=m,_.numDirectionalShadows=A,_.numPointShadows=C,_.numSpotShadows=b,_.numSpotMaps=w,_.numLightProbes=R,i.version=Ng++)}function l(c,u){let f=0,d=0,p=0,g=0,x=0;const h=u.matrixWorldInverse;for(let m=0,A=c.length;m<A;m++){const C=c[m];if(C.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(h),f++}else if(C.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(h),b.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(h),p++}else if(C.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(h),a.identity(),r.copy(C.matrixWorld),r.premultiply(h),a.extractRotation(r),b.halfWidth.set(C.width*.5,0,0),b.halfHeight.set(0,C.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(C.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(h),d++}else if(C.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(C.matrixWorld),b.direction.transformDirection(h),x++}}}return{setup:o,setupView:l,state:i}}function Hc(n){const e=new Og(n),t=[],i=[],s=[];function r(d){f.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function kg(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Hc(n),e.set(s,[o])):r>=a.length?(o=new Hc(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zg=`uniform sampler2D shadow_pass;
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
}`,Gg=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Hg=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Vc=new at,ks=new G,Ha=new G;function Vg(n,e,t){let i=new Ml;const s=new Ve,r=new Ve,a=new ut,o=new Qf,l=new jf,c={},u=t.maxTextureSize,f={[Ei]:Jt,[Jt]:Ei,[Jn]:Jn},d=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:Bg,fragmentShader:zg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Sn;g.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Pt(g,d),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ur;let m=this.type;this.render=function(T,R,_){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||T.length===0)return;this.type===uu&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ur);const E=n.getRenderTarget(),N=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ii),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const Z=m!==this.type;Z&&R.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(H=>H.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,H=T.length;K<H;K++){const ee=T[K],X=ee.shadow;if(X===void 0){Ue("WebGLShadowMap:",ee,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const ie=X.getFrameExtents();s.multiply(ie),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,X.mapSize.y=r.y));const le=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=le,X.map===null||Z===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===zs){if(ee.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new zn(s.x,s.y,{format:Vi,type:ri,minFilter:kt,magFilter:kt,generateMipmaps:!1}),X.map.texture.name=ee.name+".shadowMap",X.map.depthTexture=new Ss(s.x,s.y,vn),X.map.depthTexture.name=ee.name+".shadowMapDepth",X.map.depthTexture.format=ai,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Dt,X.map.depthTexture.magFilter=Dt}else ee.isPointLight?(X.map=new zu(s.x),X.map.depthTexture=new Xf(s.x,Gn)):(X.map=new zn(s.x,s.y),X.map.depthTexture=new Ss(s.x,s.y,Gn)),X.map.depthTexture.name=ee.name+".shadowMap",X.map.depthTexture.format=ai,this.type===Ur?(X.map.depthTexture.compareFunction=le?gl:ml,X.map.depthTexture.minFilter=kt,X.map.depthTexture.magFilter=kt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Dt,X.map.depthTexture.magFilter=Dt);X.camera.updateProjectionMatrix()}const fe=X.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<fe;_e++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(X.map),n.clear());const k=X.getViewport(_e);a.set(r.x*k.x,r.y*k.y,r.x*k.z,r.y*k.w),D.viewport(a)}if(ee.isPointLight){const k=X.camera,Y=X.matrix,ae=ee.distance||k.far;ae!==k.far&&(k.far=ae,k.updateProjectionMatrix()),ks.setFromMatrixPosition(ee.matrixWorld),k.position.copy(ks),Ha.copy(k.position),Ha.add(Gg[_e]),k.up.copy(Hg[_e]),k.lookAt(Ha),k.updateMatrixWorld(),Y.makeTranslation(-ks.x,-ks.y,-ks.z),Vc.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Vc,k.coordinateSystem,k.reversedDepth)}else X.updateMatrices(ee);i=X.getFrustum(),b(R,_,X.camera,ee,this.type)}X.isPointLightShadow!==!0&&this.type===zs&&A(X,_),X.needsUpdate=!1}m=this.type,h.needsUpdate=!1,n.setRenderTarget(E,N,I)};function A(T,R){const _=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new zn(s.x,s.y,{format:Vi,type:ri})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,_,d,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,_,p,x,null)}function C(T,R,_,E){let N=null;const I=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)N=I;else if(N=_.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=N.uuid,Z=R.uuid;let K=c[D];K===void 0&&(K={},c[D]=K);let H=K[Z];H===void 0&&(H=N.clone(),K[Z]=H,R.addEventListener("dispose",w)),N=H}if(N.visible=R.visible,N.wireframe=R.wireframe,E===zs?N.side=R.shadowSide!==null?R.shadowSide:R.side:N.side=R.shadowSide!==null?R.shadowSide:f[R.side],N.alphaMap=R.alphaMap,N.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,N.map=R.map,N.clipShadows=R.clipShadows,N.clippingPlanes=R.clippingPlanes,N.clipIntersection=R.clipIntersection,N.displacementMap=R.displacementMap,N.displacementScale=R.displacementScale,N.displacementBias=R.displacementBias,N.wireframeLinewidth=R.wireframeLinewidth,N.linewidth=R.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const D=n.properties.get(N);D.light=_}return N}function b(T,R,_,E,N){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===zs)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const Z=e.update(T),K=T.material;if(Array.isArray(K)){const H=Z.groups;for(let ee=0,X=H.length;ee<X;ee++){const ie=H[ee],le=K[ie.materialIndex];if(le&&le.visible){const fe=C(T,le,E,N);T.onBeforeShadow(n,T,R,_,Z,fe,ie),n.renderBufferDirect(_,null,Z,fe,T,ie),T.onAfterShadow(n,T,R,_,Z,fe,ie)}}}else if(K.visible){const H=C(T,K,E,N);T.onBeforeShadow(n,T,R,_,Z,H,null),n.renderBufferDirect(_,null,Z,H,T,null),T.onAfterShadow(n,T,R,_,Z,H,null)}}const D=T.children;for(let Z=0,K=D.length;Z<K;Z++)b(D[Z],R,_,E,N)}function w(T){T.target.removeEventListener("dispose",w);for(const _ in c){const E=c[_],N=T.target.uuid;N in E&&(E[N].dispose(),delete E[N])}}}function $g(n,e){function t(){let U=!1;const ue=new ut;let te=null;const me=new ut(0,0,0,0);return{setMask:function(be){te!==be&&!U&&(n.colorMask(be,be,be,be),te=be)},setLocked:function(be){U=be},setClear:function(be,se,we,Ee,ft){ft===!0&&(be*=Ee,se*=Ee,we*=Ee),ue.set(be,se,we,Ee),me.equals(ue)===!1&&(n.clearColor(be,se,we,Ee),me.copy(ue))},reset:function(){U=!1,te=null,me.set(-1,0,0,0)}}}function i(){let U=!1,ue=!1,te=null,me=null,be=null;return{setReversed:function(se){if(ue!==se){const we=e.get("EXT_clip_control");se?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ue=se;const Ee=be;be=null,this.setClear(Ee)}},getReversed:function(){return ue},setTest:function(se){se?oe(n.DEPTH_TEST):re(n.DEPTH_TEST)},setMask:function(se){te!==se&&!U&&(n.depthMask(se),te=se)},setFunc:function(se){if(ue&&(se=bf[se]),me!==se){switch(se){case so:n.depthFunc(n.NEVER);break;case ro:n.depthFunc(n.ALWAYS);break;case ao:n.depthFunc(n.LESS);break;case bs:n.depthFunc(n.LEQUAL);break;case oo:n.depthFunc(n.EQUAL);break;case lo:n.depthFunc(n.GEQUAL);break;case co:n.depthFunc(n.GREATER);break;case uo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=se}},setLocked:function(se){U=se},setClear:function(se){be!==se&&(be=se,ue&&(se=1-se),n.clearDepth(se))},reset:function(){U=!1,te=null,me=null,be=null,ue=!1}}}function s(){let U=!1,ue=null,te=null,me=null,be=null,se=null,we=null,Ee=null,ft=null;return{setTest:function(ot){U||(ot?oe(n.STENCIL_TEST):re(n.STENCIL_TEST))},setMask:function(ot){ue!==ot&&!U&&(n.stencilMask(ot),ue=ot)},setFunc:function(ot,En,Tn){(te!==ot||me!==En||be!==Tn)&&(n.stencilFunc(ot,En,Tn),te=ot,me=En,be=Tn)},setOp:function(ot,En,Tn){(se!==ot||we!==En||Ee!==Tn)&&(n.stencilOp(ot,En,Tn),se=ot,we=En,Ee=Tn)},setLocked:function(ot){U=ot},setClear:function(ot){ft!==ot&&(n.clearStencil(ot),ft=ot)},reset:function(){U=!1,ue=null,te=null,me=null,be=null,se=null,we=null,Ee=null,ft=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},d={},p=new WeakMap,g=[],x=null,h=!1,m=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new qe(0,0,0),E=0,N=!1,I=null,D=null,Z=null,K=null,H=null;const ee=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const le=n.getParameter(n.VERSION);le.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(le)[1]),X=ie>=1):le.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),X=ie>=2);let fe=null,_e={};const k=n.getParameter(n.SCISSOR_BOX),Y=n.getParameter(n.VIEWPORT),ae=new ut().fromArray(k),P=new ut().fromArray(Y);function z(U,ue,te,me){const be=new Uint8Array(4),se=n.createTexture();n.bindTexture(U,se),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<te;we++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ue,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(ue+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return se}const Q={};Q[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),a.setFunc(bs),_t(!1),bt(Gl),oe(n.CULL_FACE),Ze(ii);function oe(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function re(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Le(U,ue){return d[U]!==ue?(n.bindFramebuffer(U,ue),d[U]=ue,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ue),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ue),!0):!1}function Ae(U,ue){let te=g,me=!1;if(U){te=p.get(ue),te===void 0&&(te=[],p.set(ue,te));const be=U.textures;if(te.length!==be.length||te[0]!==n.COLOR_ATTACHMENT0){for(let se=0,we=be.length;se<we;se++)te[se]=n.COLOR_ATTACHMENT0+se;te.length=be.length,me=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,me=!0);me&&n.drawBuffers(te)}function pt(U){return x!==U?(n.useProgram(U),x=U,!0):!1}const He={[Li]:n.FUNC_ADD,[Vd]:n.FUNC_SUBTRACT,[$d]:n.FUNC_REVERSE_SUBTRACT};He[Wd]=n.MIN,He[Xd]=n.MAX;const it={[qd]:n.ZERO,[Yd]:n.ONE,[Kd]:n.SRC_COLOR,[no]:n.SRC_ALPHA,[tf]:n.SRC_ALPHA_SATURATE,[jd]:n.DST_COLOR,[Jd]:n.DST_ALPHA,[Zd]:n.ONE_MINUS_SRC_COLOR,[io]:n.ONE_MINUS_SRC_ALPHA,[ef]:n.ONE_MINUS_DST_COLOR,[Qd]:n.ONE_MINUS_DST_ALPHA,[nf]:n.CONSTANT_COLOR,[sf]:n.ONE_MINUS_CONSTANT_COLOR,[rf]:n.CONSTANT_ALPHA,[af]:n.ONE_MINUS_CONSTANT_ALPHA};function Ze(U,ue,te,me,be,se,we,Ee,ft,ot){if(U===ii){h===!0&&(re(n.BLEND),h=!1);return}if(h===!1&&(oe(n.BLEND),h=!0),U!==Hd){if(U!==m||ot!==N){if((A!==Li||w!==Li)&&(n.blendEquation(n.FUNC_ADD),A=Li,w=Li),ot)switch(U){case _s:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hl:n.blendFunc(n.ONE,n.ONE);break;case Vl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $l:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Xe("WebGLState: Invalid blending: ",U);break}else switch(U){case _s:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Vl:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $l:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",U);break}C=null,b=null,T=null,R=null,_.set(0,0,0),E=0,m=U,N=ot}return}be=be||ue,se=se||te,we=we||me,(ue!==A||be!==w)&&(n.blendEquationSeparate(He[ue],He[be]),A=ue,w=be),(te!==C||me!==b||se!==T||we!==R)&&(n.blendFuncSeparate(it[te],it[me],it[se],it[we]),C=te,b=me,T=se,R=we),(Ee.equals(_)===!1||ft!==E)&&(n.blendColor(Ee.r,Ee.g,Ee.b,ft),_.copy(Ee),E=ft),m=U,N=!1}function Ye(U,ue){U.side===Jn?re(n.CULL_FACE):oe(n.CULL_FACE);let te=U.side===Jt;ue&&(te=!te),_t(te),U.blending===_s&&U.transparent===!1?Ze(ii):Ze(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const me=U.stencilWrite;o.setTest(me),me&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),It(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):re(n.SAMPLE_ALPHA_TO_COVERAGE)}function _t(U){I!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),I=U)}function bt(U){U!==zd?(oe(n.CULL_FACE),U!==D&&(U===Gl?n.cullFace(n.BACK):U===Gd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):re(n.CULL_FACE),D=U}function wt(U){U!==Z&&(X&&n.lineWidth(U),Z=U)}function It(U,ue,te){U?(oe(n.POLYGON_OFFSET_FILL),(K!==ue||H!==te)&&(K=ue,H=te,a.getReversed()&&(ue=-ue),n.polygonOffset(ue,te))):re(n.POLYGON_OFFSET_FILL)}function dt(U){U?oe(n.SCISSOR_TEST):re(n.SCISSOR_TEST)}function xt(U){U===void 0&&(U=n.TEXTURE0+ee-1),fe!==U&&(n.activeTexture(U),fe=U)}function F(U,ue,te){te===void 0&&(fe===null?te=n.TEXTURE0+ee-1:te=fe);let me=_e[te];me===void 0&&(me={type:void 0,texture:void 0},_e[te]=me),(me.type!==U||me.texture!==ue)&&(fe!==te&&(n.activeTexture(te),fe=te),n.bindTexture(U,ue||Q[U]),me.type=U,me.texture=ue)}function $t(){const U=_e[fe];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function je(){try{n.compressedTexImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function v(){try{n.texSubImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function B(){try{n.texSubImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function ce(){try{n.texStorage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function de(){try{n.texStorage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function j(){try{n.texImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function ne(){try{n.texImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function he(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function Re(U,ue){f[U]!==ue&&(n.pixelStorei(U,ue),f[U]=ue)}function ge(U){ae.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ae.copy(U))}function pe(U){P.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),P.copy(U))}function Ie(U,ue){let te=c.get(ue);te===void 0&&(te=new WeakMap,c.set(ue,te));let me=te.get(U);me===void 0&&(me=n.getUniformBlockIndex(ue,U.name),te.set(U,me))}function De(U,ue){const me=c.get(ue).get(U);l.get(ue)!==me&&(n.uniformBlockBinding(ue,me,U.__bindingPointIndex),l.set(ue,me))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},fe=null,_e={},d={},p=new WeakMap,g=[],x=null,h=!1,m=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new qe(0,0,0),E=0,N=!1,I=null,D=null,Z=null,K=null,H=null,ae.set(0,0,n.canvas.width,n.canvas.height),P.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:oe,disable:re,bindFramebuffer:Le,drawBuffers:Ae,useProgram:pt,setBlending:Ze,setMaterial:Ye,setFlipSided:_t,setCullFace:bt,setLineWidth:wt,setPolygonOffset:It,setScissorTest:dt,activeTexture:xt,bindTexture:F,unbindTexture:$t,compressedTexImage2D:je,compressedTexImage3D:y,texImage2D:j,texImage3D:ne,pixelStorei:Re,getParameter:he,updateUBOMapping:Ie,uniformBlockBinding:De,texStorage2D:ce,texStorage3D:de,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:J,scissor:ge,viewport:pe,reset:Fe}}function Wg(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ve,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(y,v){return g?new OffscreenCanvas(y,v):Kr("canvas")}function h(y,v,B){let W=1;const J=je(y);if((J.width>B||J.height>B)&&(W=B/Math.max(J.width,J.height)),W<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ce=Math.floor(W*J.width),de=Math.floor(W*J.height);d===void 0&&(d=x(ce,de));const j=v?x(ce,de):d;return j.width=ce,j.height=de,j.getContext("2d").drawImage(y,0,0,ce,de),Ue("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ce+"x"+de+")."),j}else return"data"in y&&Ue("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),y;return y}function m(y){return y.generateMipmaps}function A(y){n.generateMipmap(y)}function C(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(y,v,B,W,J,ce=!1){if(y!==null){if(n[y]!==void 0)return n[y];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let de;W&&(de=e.get("EXT_texture_norm16"),de||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=v;if(v===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8),B===n.UNSIGNED_SHORT&&de&&(j=de.R16_EXT),B===n.SHORT&&de&&(j=de.R16_SNORM_EXT)),v===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),v===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8),B===n.UNSIGNED_SHORT&&de&&(j=de.RG16_EXT),B===n.SHORT&&de&&(j=de.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),v===n.RGB&&(B===n.UNSIGNED_SHORT&&de&&(j=de.RGB16_EXT),B===n.SHORT&&de&&(j=de.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),v===n.RGBA){const ne=ce?Yr:$e.getTransfer(J);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=ne===et?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&de&&(j=de.RGBA16_EXT),B===n.SHORT&&de&&(j=de.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(y,v){let B;return y?v===null||v===Gn||v===Ks?B=n.DEPTH24_STENCIL8:v===vn?B=n.DEPTH32F_STENCIL8:v===Ys&&(B=n.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===Ks?B=n.DEPTH_COMPONENT24:v===vn?B=n.DEPTH_COMPONENT32F:v===Ys&&(B=n.DEPTH_COMPONENT16),B}function T(y,v){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==Dt&&y.minFilter!==kt?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function R(y){const v=y.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(y){const v=y.target;v.removeEventListener("dispose",_),I(v)}function E(y){const v=i.get(y);if(v.__webglInit===void 0)return;const B=y.source,W=p.get(B);if(W){const J=W[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&N(y),Object.keys(W).length===0&&p.delete(B)}i.remove(y)}function N(y){const v=i.get(y);n.deleteTexture(v.__webglTexture);const B=y.source,W=p.get(B);delete W[v.__cacheKey],a.memory.textures--}function I(y){const v=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let J=0;J<v.__webglFramebuffer[W].length;J++)n.deleteFramebuffer(v.__webglFramebuffer[W][J]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=y.textures;for(let W=0,J=B.length;W<J;W++){const ce=i.get(B[W]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(B[W])}i.remove(y)}let D=0;function Z(){D=0}function K(){return D}function H(y){D=y}function ee(){const y=D;return y>=s.maxTextures&&Ue("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),D+=1,y}function X(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function ie(y,v){const B=i.get(y);if(y.isVideoTexture&&F(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&B.__version!==y.version){const W=y.image;if(W===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{re(B,y,v);return}}else y.isExternalTexture&&(B.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+v)}function le(y,v){const B=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&B.__version!==y.version){re(B,y,v);return}else y.isExternalTexture&&(B.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+v)}function fe(y,v){const B=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&B.__version!==y.version){re(B,y,v);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+v)}function _e(y,v){const B=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&B.__version!==y.version){Le(B,y,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+v)}const k={[$r]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[fo]:n.MIRRORED_REPEAT},Y={[Dt]:n.NEAREST,[cf]:n.NEAREST_MIPMAP_NEAREST,[ur]:n.NEAREST_MIPMAP_LINEAR,[kt]:n.LINEAR,[da]:n.LINEAR_MIPMAP_NEAREST,[Oi]:n.LINEAR_MIPMAP_LINEAR},ae={[ff]:n.NEVER,[vf]:n.ALWAYS,[hf]:n.LESS,[ml]:n.LEQUAL,[pf]:n.EQUAL,[gl]:n.GEQUAL,[mf]:n.GREATER,[gf]:n.NOTEQUAL};function P(y,v){if(v.type===vn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===kt||v.magFilter===da||v.magFilter===ur||v.magFilter===Oi||v.minFilter===kt||v.minFilter===da||v.minFilter===ur||v.minFilter===Oi)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,k[v.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,k[v.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,k[v.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,Y[v.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,Y[v.minFilter]),v.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ae[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Dt||v.minFilter!==ur&&v.minFilter!==Oi||v.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function z(y,v){let B=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",R));const W=v.source;let J=p.get(W);J===void 0&&(J={},p.set(W,J));const ce=X(v);if(ce!==y.__cacheKey){J[ce]===void 0&&(J[ce]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),J[ce].usedTimes++;const de=J[y.__cacheKey];de!==void 0&&(J[y.__cacheKey].usedTimes--,de.usedTimes===0&&N(v)),y.__cacheKey=ce,y.__webglTexture=J[ce].texture}return B}function Q(y,v,B){return Math.floor(Math.floor(y/B)/v)}function oe(y,v,B,W){const ce=y.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,B,W,v.data);else{ce.sort((Re,ge)=>Re.start-ge.start);let de=0;for(let Re=1;Re<ce.length;Re++){const ge=ce[de],pe=ce[Re],Ie=ge.start+ge.count,De=Q(pe.start,v.width,4),Fe=Q(ge.start,v.width,4);pe.start<=Ie+1&&De===Fe&&Q(pe.start+pe.count-1,v.width,4)===De?ge.count=Math.max(ge.count,pe.start+pe.count-ge.start):(++de,ce[de]=pe)}ce.length=de+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),he=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Re=0,ge=ce.length;Re<ge;Re++){const pe=ce[Re],Ie=Math.floor(pe.start/4),De=Math.ceil(pe.count/4),Fe=Ie%v.width,U=Math.floor(Ie/v.width),ue=De,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Fe,U,ue,te,B,W,v.data)}y.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,he)}}function re(y,v,B){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const J=z(y,v),ce=v.source;t.bindTexture(W,y.__webglTexture,n.TEXTURE0+B);const de=i.get(ce);if(ce.version!==de.__version||J===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const te=$e.getPrimaries($e.workingColorSpace),me=v.colorSpace===bi?null:$e.getPrimaries(v.colorSpace),be=v.colorSpace===bi||te===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ne=h(v.image,!1,s.maxTextureSize);ne=$t(v,ne);const he=r.convert(v.format,v.colorSpace),Re=r.convert(v.type);let ge=b(v.internalFormat,he,Re,v.normalized,v.colorSpace,v.isVideoTexture);P(W,v);let pe;const Ie=v.mipmaps,De=v.isVideoTexture!==!0,Fe=de.__version===void 0||J===!0,U=ce.dataReady,ue=T(v,ne);if(v.isDepthTexture)ge=w(v.format===ki,v.type),Fe&&(De?t.texStorage2D(n.TEXTURE_2D,1,ge,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ge,ne.width,ne.height,0,he,Re,null));else if(v.isDataTexture)if(Ie.length>0){De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ge,Ie[0].width,Ie[0].height);for(let te=0,me=Ie.length;te<me;te++)pe=Ie[te],De?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,pe.width,pe.height,he,Re,pe.data):t.texImage2D(n.TEXTURE_2D,te,ge,pe.width,pe.height,0,he,Re,pe.data);v.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ge,ne.width,ne.height),U&&oe(v,ne,he,Re)):t.texImage2D(n.TEXTURE_2D,0,ge,ne.width,ne.height,0,he,Re,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ge,Ie[0].width,Ie[0].height,ne.depth);for(let te=0,me=Ie.length;te<me;te++)if(pe=Ie[te],v.format!==_n)if(he!==null)if(De){if(U)if(v.layerUpdates.size>0){const be=Mc(pe.width,pe.height,v.format,v.type);for(const se of v.layerUpdates){const we=pe.data.subarray(se*be/pe.data.BYTES_PER_ELEMENT,(se+1)*be/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,se,pe.width,pe.height,1,he,we)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,pe.width,pe.height,ne.depth,he,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,ge,pe.width,pe.height,ne.depth,0,pe.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,pe.width,pe.height,ne.depth,he,Re,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,ge,pe.width,pe.height,ne.depth,0,he,Re,pe.data)}else{De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ge,Ie[0].width,Ie[0].height);for(let te=0,me=Ie.length;te<me;te++)pe=Ie[te],v.format!==_n?he!==null?De?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,pe.width,pe.height,he,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,te,ge,pe.width,pe.height,0,pe.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,pe.width,pe.height,he,Re,pe.data):t.texImage2D(n.TEXTURE_2D,te,ge,pe.width,pe.height,0,he,Re,pe.data)}else if(v.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ge,ne.width,ne.height,ne.depth),U)if(v.layerUpdates.size>0){const te=Mc(ne.width,ne.height,v.format,v.type);for(const me of v.layerUpdates){const be=ne.data.subarray(me*te/ne.data.BYTES_PER_ELEMENT,(me+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,ne.width,ne.height,1,he,Re,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Re,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,ne.width,ne.height,ne.depth,0,he,Re,ne.data);else if(v.isData3DTexture)De?(Fe&&t.texStorage3D(n.TEXTURE_3D,ue,ge,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Re,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ge,ne.width,ne.height,ne.depth,0,he,Re,ne.data);else if(v.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(n.TEXTURE_2D,ue,ge,ne.width,ne.height);else{let te=ne.width,me=ne.height;for(let be=0;be<ue;be++)t.texImage2D(n.TEXTURE_2D,be,ge,te,me,0,he,Re,null),te>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),f.add(v),te.onpaint=me=>{const be=me.changedElements;for(const se of f)be.includes(se.image)&&(se.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{const be=n.RGBA,se=n.RGBA,we=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,be,se,we,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(De&&Fe){const te=je(Ie[0]);t.texStorage2D(n.TEXTURE_2D,ue,ge,te.width,te.height)}for(let te=0,me=Ie.length;te<me;te++)pe=Ie[te],De?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,he,Re,pe):t.texImage2D(n.TEXTURE_2D,te,ge,he,Re,pe);v.generateMipmaps=!1}else if(De){if(Fe){const te=je(ne);t.texStorage2D(n.TEXTURE_2D,ue,ge,te.width,te.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he,Re,ne)}else t.texImage2D(n.TEXTURE_2D,0,ge,he,Re,ne);m(v)&&A(W),de.__version=ce.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Le(y,v,B){if(v.image.length!==6)return;const W=z(y,v),J=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+B);const ce=i.get(J);if(J.version!==ce.__version||W===!0){t.activeTexture(n.TEXTURE0+B);const de=$e.getPrimaries($e.workingColorSpace),j=v.colorSpace===bi?null:$e.getPrimaries(v.colorSpace),ne=v.colorSpace===bi||de===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const he=v.isCompressedTexture||v.image[0].isCompressedTexture,Re=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let se=0;se<6;se++)!he&&!Re?ge[se]=h(v.image[se],!0,s.maxCubemapSize):ge[se]=Re?v.image[se].image:v.image[se],ge[se]=$t(v,ge[se]);const pe=ge[0],Ie=r.convert(v.format,v.colorSpace),De=r.convert(v.type),Fe=b(v.internalFormat,Ie,De,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,ue=ce.__version===void 0||W===!0,te=J.dataReady;let me=T(v,pe);P(n.TEXTURE_CUBE_MAP,v);let be;if(he){U&&ue&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Fe,pe.width,pe.height);for(let se=0;se<6;se++){be=ge[se].mipmaps;for(let we=0;we<be.length;we++){const Ee=be[we];v.format!==_n?Ie!==null?U?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we,0,0,Ee.width,Ee.height,Ie,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we,Fe,Ee.width,Ee.height,0,Ee.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we,0,0,Ee.width,Ee.height,Ie,De,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we,Fe,Ee.width,Ee.height,0,Ie,De,Ee.data)}}}else{if(be=v.mipmaps,U&&ue){be.length>0&&me++;const se=je(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Fe,se.width,se.height)}for(let se=0;se<6;se++)if(Re){U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ge[se].width,ge[se].height,Ie,De,ge[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,ge[se].width,ge[se].height,0,Ie,De,ge[se].data);for(let we=0;we<be.length;we++){const ft=be[we].image[se].image;U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we+1,0,0,ft.width,ft.height,Ie,De,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we+1,Fe,ft.width,ft.height,0,Ie,De,ft.data)}}else{U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ie,De,ge[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,Ie,De,ge[se]);for(let we=0;we<be.length;we++){const Ee=be[we];U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we+1,0,0,Ie,De,Ee.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,we+1,Fe,Ie,De,Ee.image[se])}}}m(v)&&A(n.TEXTURE_CUBE_MAP),ce.__version=J.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Ae(y,v,B,W,J,ce){const de=r.convert(B.format,B.colorSpace),j=r.convert(B.type),ne=b(B.internalFormat,de,j,B.normalized,B.colorSpace),he=i.get(v),Re=i.get(B);if(Re.__renderTarget=v,!he.__hasExternalTextures){const ge=Math.max(1,v.width>>ce),pe=Math.max(1,v.height>>ce);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,ce,ne,ge,pe,v.depth,0,de,j,null):t.texImage2D(J,ce,ne,ge,pe,0,de,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),xt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,J,Re.__webglTexture,0,dt(v)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,J,Re.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function pt(y,v,B){if(n.bindRenderbuffer(n.RENDERBUFFER,y),v.depthBuffer){const W=v.depthTexture,J=W&&W.isDepthTexture?W.type:null,ce=w(v.stencilBuffer,J),de=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt(v),ce,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt(v),ce,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ce,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,y)}else{const W=v.textures;for(let J=0;J<W.length;J++){const ce=W[J],de=r.convert(ce.format,ce.colorSpace),j=r.convert(ce.type),ne=b(ce.internalFormat,de,j,ce.normalized,ce.colorSpace);xt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt(v),ne,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt(v),ne,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ne,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function He(y,v,B){const W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(v.depthTexture);if(J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(J.__webglInit===void 0&&(J.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),P(n.TEXTURE_CUBE_MAP,v.depthTexture);const he=r.convert(v.depthTexture.format),Re=r.convert(v.depthTexture.type);let ge;v.depthTexture.format===ai?ge=n.DEPTH_COMPONENT24:v.depthTexture.format===ki&&(ge=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,ge,v.width,v.height,0,he,Re,null)}}else ie(v.depthTexture,0);const ce=J.__webglTexture,de=dt(v),j=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,ne=v.depthTexture.format===ki?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ai)xt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,ce,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,ce,0);else if(v.depthTexture.format===ki)xt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,ce,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(y){const v=i.get(y),B=y.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==y.depthTexture){const W=y.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",J)};W.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=W}if(y.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)He(v.__webglFramebuffer[W],y,W);else{const W=y.texture.mipmaps;W&&W.length>0?He(v.__webglFramebuffer[0],y,0):He(v.__webglFramebuffer,y,0)}else if(B){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),pt(v.__webglDepthbuffer[W],y,!1);else{const J=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,ce)}}else{const W=y.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),pt(v.__webglDepthbuffer,y,!1);else{const J=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(y,v,B){const W=i.get(y);v!==void 0&&Ae(W.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&it(y)}function Ye(y){const v=y.texture,B=i.get(y),W=i.get(v);y.addEventListener("dispose",_);const J=y.textures,ce=y.isWebGLCubeRenderTarget===!0,de=J.length>1;if(de||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,a.memory.textures++),ce){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let ne=0;ne<v.mipmaps.length;ne++)B.__webglFramebuffer[j][ne]=n.createFramebuffer()}else B.__webglFramebuffer[j]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<v.mipmaps.length;j++)B.__webglFramebuffer[j]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(de)for(let j=0,ne=J.length;j<ne;j++){const he=i.get(J[j]);he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&xt(y)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<J.length;j++){const ne=J[j];B.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[j]);const he=r.convert(ne.format,ne.colorSpace),Re=r.convert(ne.type),ge=b(ne.internalFormat,he,Re,ne.normalized,ne.colorSpace,y.isXRRenderTarget===!0),pe=dt(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,ge,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,B.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),pt(B.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),P(n.TEXTURE_CUBE_MAP,v);for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)Ae(B.__webglFramebuffer[j][ne],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else Ae(B.__webglFramebuffer[j],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(v)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let j=0,ne=J.length;j<ne;j++){const he=J[j],Re=i.get(he);let ge=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ge=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,Re.__webglTexture),P(ge,he),Ae(B.__webglFramebuffer,y,he,n.COLOR_ATTACHMENT0+j,ge,0),m(he)&&A(ge)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(j=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,W.__webglTexture),P(j,v),v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)Ae(B.__webglFramebuffer[ne],y,v,n.COLOR_ATTACHMENT0,j,ne);else Ae(B.__webglFramebuffer,y,v,n.COLOR_ATTACHMENT0,j,0);m(v)&&A(j),t.unbindTexture()}y.depthBuffer&&it(y)}function _t(y){const v=y.textures;for(let B=0,W=v.length;B<W;B++){const J=v[B];if(m(J)){const ce=C(y),de=i.get(J).__webglTexture;t.bindTexture(ce,de),A(ce),t.unbindTexture()}}}const bt=[],wt=[];function It(y){if(y.samples>0){if(xt(y)===!1){const v=y.textures,B=y.width,W=y.height;let J=n.COLOR_BUFFER_BIT;const ce=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(y),j=v.length>1;if(j)for(let he=0;he<v.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const ne=y.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let he=0;he<v.length;he++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[he]);const Re=i.get(v[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Re,0)}n.blitFramebuffer(0,0,B,W,0,0,B,W,J,n.NEAREST),l===!0&&(bt.length=0,wt.length=0,bt.push(n.COLOR_ATTACHMENT0+he),y.depthBuffer&&y.resolveDepthBuffer===!1&&(bt.push(ce),wt.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,wt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let he=0;he<v.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,de.__webglColorRenderbuffer[he]);const Re=i.get(v[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,Re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const v=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function dt(y){return Math.min(s.maxSamples,y.samples)}function xt(y){const v=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function F(y){const v=a.render.frame;u.get(y)!==v&&(u.set(y,v),y.update())}function $t(y,v){const B=y.colorSpace,W=y.format,J=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||B!==qr&&B!==bi&&($e.getTransfer(B)===et?(W!==_n||J!==sn)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",B)),v}function je(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=ee,this.resetTextureUnits=Z,this.getTextureUnits=K,this.setTextureUnits=H,this.setTexture2D=ie,this.setTexture2DArray=le,this.setTexture3D=fe,this.setTextureCube=_e,this.rebindTextures=Ze,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Xg(n,e){function t(i,s=bi){let r;const a=$e.getTransfer(s);if(i===sn)return n.UNSIGNED_BYTE;if(i===cl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ul)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===xu)return n.BYTE;if(i===Mu)return n.SHORT;if(i===Ys)return n.UNSIGNED_SHORT;if(i===ll)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===ri)return n.HALF_FLOAT;if(i===Su)return n.ALPHA;if(i===Eu)return n.RGB;if(i===_n)return n.RGBA;if(i===ai)return n.DEPTH_COMPONENT;if(i===ki)return n.DEPTH_STENCIL;if(i===dl)return n.RED;if(i===fl)return n.RED_INTEGER;if(i===Vi)return n.RG;if(i===hl)return n.RG_INTEGER;if(i===pl)return n.RGBA_INTEGER;if(i===Nr||i===Fr||i===Or||i===kr)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ho||i===po||i===mo||i===go)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vo||i===_o||i===xo||i===Mo||i===bo||i===Wr||i===yo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===vo||i===_o)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===xo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Mo)return r.COMPRESSED_R11_EAC;if(i===bo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Wr)return r.COMPRESSED_RG11_EAC;if(i===yo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===So||i===Eo||i===To||i===Ao||i===wo||i===Ro||i===Co||i===Po||i===Io||i===Lo||i===Do||i===Uo||i===No||i===Fo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===So)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Eo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===To)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ao)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ro)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Co)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Po)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Io)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Lo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Do)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===No)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Oo||i===ko||i===Bo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Oo)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zo||i===Go||i===Xr||i===Ho)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===zo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Go)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ho)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const qg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yg=`
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

}`;class Kg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Du(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Hn({vertexShader:qg,fragmentShader:Yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new Rs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zg extends Wi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",h=new Kg,m={},A=t.getContextAttributes();let C=null,b=null;const w=[],T=[],R=new Ve;let _=null;const E=new mn;E.viewport=new ut;const N=new mn;N.viewport=new ut;const I=[E,N],D=new rh;let Z=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let Q=w[z];return Q===void 0&&(Q=new xa,w[z]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(z){let Q=w[z];return Q===void 0&&(Q=new xa,w[z]=Q),Q.getGripSpace()},this.getHand=function(z){let Q=w[z];return Q===void 0&&(Q=new xa,w[z]=Q),Q.getHandSpace()};function H(z){const Q=T.indexOf(z.inputSource);if(Q===-1)return;const oe=w[Q];oe!==void 0&&(oe.update(z.inputSource,z.frame,c||a),oe.dispatchEvent({type:z.type,data:z.inputSource}))}function ee(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",X);for(let z=0;z<w.length;z++){const Q=T[z];Q!==null&&(T[z]=null,w[z].disconnect(Q))}Z=null,K=null,h.reset();for(const z in m)delete m[z];e.setRenderTarget(C),p=null,d=null,f=null,s=null,b=null,P.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",X),A.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,re=null,Le=null;A.depth&&(Le=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=A.stencil?ki:ai,re=A.stencil?Ks:Gn);const Ae={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Ae),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new zn(d.textureWidth,d.textureHeight,{format:_n,type:sn,depthTexture:new Ss(d.textureWidth,d.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const oe={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,oe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new zn(p.framebufferWidth,p.framebufferHeight,{format:_n,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),P.setContext(s),P.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function X(z){for(let Q=0;Q<z.removed.length;Q++){const oe=z.removed[Q],re=T.indexOf(oe);re>=0&&(T[re]=null,w[re].disconnect(oe))}for(let Q=0;Q<z.added.length;Q++){const oe=z.added[Q];let re=T.indexOf(oe);if(re===-1){for(let Ae=0;Ae<w.length;Ae++)if(Ae>=T.length){T.push(oe),re=Ae;break}else if(T[Ae]===null){T[Ae]=oe,re=Ae;break}if(re===-1)break}const Le=w[re];Le&&Le.connect(oe)}}const ie=new G,le=new G;function fe(z,Q,oe){ie.setFromMatrixPosition(Q.matrixWorld),le.setFromMatrixPosition(oe.matrixWorld);const re=ie.distanceTo(le),Le=Q.projectionMatrix.elements,Ae=oe.projectionMatrix.elements,pt=Le[14]/(Le[10]-1),He=Le[14]/(Le[10]+1),it=(Le[9]+1)/Le[5],Ze=(Le[9]-1)/Le[5],Ye=(Le[8]-1)/Le[0],_t=(Ae[8]+1)/Ae[0],bt=pt*Ye,wt=pt*_t,It=re/(-Ye+_t),dt=It*-Ye;if(Q.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(dt),z.translateZ(It),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Le[10]===-1)z.projectionMatrix.copy(Q.projectionMatrix),z.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const xt=pt+It,F=He+It,$t=bt-dt,je=wt+(re-dt),y=it*He/F*xt,v=Ze*He/F*xt;z.projectionMatrix.makePerspective($t,je,y,v,xt,F),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function _e(z,Q){Q===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(Q.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let Q=z.near,oe=z.far;h.texture!==null&&(h.depthNear>0&&(Q=h.depthNear),h.depthFar>0&&(oe=h.depthFar)),D.near=N.near=E.near=Q,D.far=N.far=E.far=oe,(Z!==D.near||K!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),Z=D.near,K=D.far),D.layers.mask=z.layers.mask|6,E.layers.mask=D.layers.mask&-5,N.layers.mask=D.layers.mask&-3;const re=z.parent,Le=D.cameras;_e(D,re);for(let Ae=0;Ae<Le.length;Ae++)_e(Le[Ae],re);Le.length===2?fe(D,E,N):D.projectionMatrix.copy(E.projectionMatrix),k(z,D,re)};function k(z,Q,oe){oe===null?z.matrix.copy(Q.matrixWorld):(z.matrix.copy(oe.matrixWorld),z.matrix.invert(),z.matrix.multiply(Q.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(Q.projectionMatrix),z.projectionMatrixInverse.copy(Q.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=$o*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(z){return m[z]};let Y=null;function ae(z,Q){if(u=Q.getViewerPose(c||a),g=Q,u!==null){const oe=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let re=!1;oe.length!==D.cameras.length&&(D.cameras.length=0,re=!0);for(let He=0;He<oe.length;He++){const it=oe[He];let Ze=null;if(p!==null)Ze=p.getViewport(it);else{const _t=f.getViewSubImage(d,it);Ze=_t.viewport,He===0&&(e.setRenderTargetTextures(b,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(b))}let Ye=I[He];Ye===void 0&&(Ye=new mn,Ye.layers.enable(He),Ye.viewport=new ut,I[He]=Ye),Ye.matrix.fromArray(it.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(it.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),He===0&&(D.matrix.copy(Ye.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),re===!0&&D.cameras.push(Ye)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const He=f.getDepthInformation(oe[0]);He&&He.isValid&&He.texture&&h.init(He,s.renderState)}if(Le&&Le.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let He=0;He<oe.length;He++){const it=oe[He].camera;if(it){let Ze=m[it];Ze||(Ze=new Du,m[it]=Ze);const Ye=f.getCameraImage(it);Ze.sourceTexture=Ye}}}}for(let oe=0;oe<w.length;oe++){const re=T[oe],Le=w[oe];re!==null&&Le!==void 0&&Le.update(re,Q,c||a)}Y&&Y(z,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}const P=new ku;P.setAnimationLoop(ae),this.setAnimationLoop=function(z){Y=z},this.dispose=function(){}}}const Jg=new at,Wu=new Ne;Wu.set(-1,0,0,0,1,0,0,0,1);function Qg(n,e){function t(h,m){h.matrixAutoUpdate===!0&&h.updateMatrix(),m.value.copy(h.matrix)}function i(h,m){m.color.getRGB(h.fogColor.value,Uu(n)),m.isFog?(h.fogNear.value=m.near,h.fogFar.value=m.far):m.isFogExp2&&(h.fogDensity.value=m.density)}function s(h,m,A,C,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(h,m):m.isMeshLambertMaterial?(r(h,m),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(h,m),f(h,m)):m.isMeshPhongMaterial?(r(h,m),u(h,m),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(h,m),d(h,m),m.isMeshPhysicalMaterial&&p(h,m,b)):m.isMeshMatcapMaterial?(r(h,m),g(h,m)):m.isMeshDepthMaterial?r(h,m):m.isMeshDistanceMaterial?(r(h,m),x(h,m)):m.isMeshNormalMaterial?r(h,m):m.isLineBasicMaterial?(a(h,m),m.isLineDashedMaterial&&o(h,m)):m.isPointsMaterial?l(h,m,A,C):m.isSpriteMaterial?c(h,m):m.isShadowMaterial?(h.color.value.copy(m.color),h.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(h,m){h.opacity.value=m.opacity,m.color&&h.diffuse.value.copy(m.color),m.emissive&&h.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(h.map.value=m.map,t(m.map,h.mapTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,t(m.alphaMap,h.alphaMapTransform)),m.bumpMap&&(h.bumpMap.value=m.bumpMap,t(m.bumpMap,h.bumpMapTransform),h.bumpScale.value=m.bumpScale,m.side===Jt&&(h.bumpScale.value*=-1)),m.normalMap&&(h.normalMap.value=m.normalMap,t(m.normalMap,h.normalMapTransform),h.normalScale.value.copy(m.normalScale),m.side===Jt&&h.normalScale.value.negate()),m.displacementMap&&(h.displacementMap.value=m.displacementMap,t(m.displacementMap,h.displacementMapTransform),h.displacementScale.value=m.displacementScale,h.displacementBias.value=m.displacementBias),m.emissiveMap&&(h.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,h.emissiveMapTransform)),m.specularMap&&(h.specularMap.value=m.specularMap,t(m.specularMap,h.specularMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest);const A=e.get(m),C=A.envMap,b=A.envMapRotation;C&&(h.envMap.value=C,h.envMapRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(Wu),h.reflectivity.value=m.reflectivity,h.ior.value=m.ior,h.refractionRatio.value=m.refractionRatio),m.lightMap&&(h.lightMap.value=m.lightMap,h.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,h.lightMapTransform)),m.aoMap&&(h.aoMap.value=m.aoMap,h.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,h.aoMapTransform))}function a(h,m){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,m.map&&(h.map.value=m.map,t(m.map,h.mapTransform))}function o(h,m){h.dashSize.value=m.dashSize,h.totalSize.value=m.dashSize+m.gapSize,h.scale.value=m.scale}function l(h,m,A,C){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,h.size.value=m.size*A,h.scale.value=C*.5,m.map&&(h.map.value=m.map,t(m.map,h.uvTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,t(m.alphaMap,h.alphaMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest)}function c(h,m){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,h.rotation.value=m.rotation,m.map&&(h.map.value=m.map,t(m.map,h.mapTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,t(m.alphaMap,h.alphaMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest)}function u(h,m){h.specular.value.copy(m.specular),h.shininess.value=Math.max(m.shininess,1e-4)}function f(h,m){m.gradientMap&&(h.gradientMap.value=m.gradientMap)}function d(h,m){h.metalness.value=m.metalness,m.metalnessMap&&(h.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,h.metalnessMapTransform)),h.roughness.value=m.roughness,m.roughnessMap&&(h.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,h.roughnessMapTransform)),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)}function p(h,m,A){h.ior.value=m.ior,m.sheen>0&&(h.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),h.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(h.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,h.sheenColorMapTransform)),m.sheenRoughnessMap&&(h.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,h.sheenRoughnessMapTransform))),m.clearcoat>0&&(h.clearcoat.value=m.clearcoat,h.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(h.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,h.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(h.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Jt&&h.clearcoatNormalScale.value.negate())),m.dispersion>0&&(h.dispersion.value=m.dispersion),m.iridescence>0&&(h.iridescence.value=m.iridescence,h.iridescenceIOR.value=m.iridescenceIOR,h.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(h.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,h.iridescenceMapTransform)),m.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),m.transmission>0&&(h.transmission.value=m.transmission,h.transmissionSamplerMap.value=A.texture,h.transmissionSamplerSize.value.set(A.width,A.height),m.transmissionMap&&(h.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,h.transmissionMapTransform)),h.thickness.value=m.thickness,m.thicknessMap&&(h.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=m.attenuationDistance,h.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(h.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(h.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=m.specularIntensity,h.specularColor.value.copy(m.specularColor),m.specularColorMap&&(h.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,h.specularColorMapTransform)),m.specularIntensityMap&&(h.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,h.specularIntensityMapTransform))}function g(h,m){m.matcap&&(h.matcap.value=m.matcap)}function x(h,m){const A=e.get(m).light;h.referencePosition.value.setFromMatrixPosition(A.matrixWorld),h.nearDistance.value=A.shadow.camera.near,h.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function jg(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const T=w.program;i.uniformBlockBinding(b,T)}function c(b,w){let T=s[b.id];T===void 0&&(h(b),T=u(b),s[b.id]=T,b.addEventListener("dispose",A));const R=w.program;i.updateUBOMapping(b,R);const _=e.render.frame;r[b.id]!==_&&(d(b),r[b.id]=_)}function u(b){const w=f();b.__bindingPointIndex=w;const T=n.createBuffer(),R=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,R,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,T),T}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const w=s[b.id],T=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,E=T.length;_<E;_++){const N=T[_];if(Array.isArray(N))for(let I=0,D=N.length;I<D;I++)p(N[I],_,I,R);else p(N,_,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,w,T,R){if(x(b,w,T,R)===!0){const _=b.__offset,E=b.value;if(Array.isArray(E)){let N=0;for(let I=0;I<E.length;I++){const D=E[I],Z=m(D);g(D,b.__data,N),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(N+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function g(b,w,T){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,T)}function x(b,w,T,R){const _=b.value,E=w+"_"+T;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{const N=R[E];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function h(b){const w=b.uniforms;let T=0;const R=16;for(let E=0,N=w.length;E<N;E++){const I=Array.isArray(w[E])?w[E]:[w[E]];for(let D=0,Z=I.length;D<Z;D++){const K=I[D],H=Array.isArray(K.value)?K.value:[K.value];for(let ee=0,X=H.length;ee<X;ee++){const ie=H[ee],le=m(ie),fe=T%R,_e=fe%le.boundary,k=fe+_e;T+=_e,k!==0&&R-k<le.storage&&(T+=R-k),K.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=T,T+=le.storage}}}const _=T%R;return _>0&&(T+=R-_),b.__size=T,b.__cache={},this}function m(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",b),w}function A(b){const w=b.target;w.removeEventListener("dispose",A);const T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function C(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}const ev=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rn=null;function tv(){return Rn===null&&(Rn=new xl(ev,16,16,Vi,ri),Rn.name="DFG_LUT",Rn.minFilter=kt,Rn.magFilter=kt,Rn.wrapS=ei,Rn.wrapT=ei,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}class nv{constructor(e={}){const{canvas:t=xf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=sn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=p,h=new Set([pl,hl,fl]),m=new Set([sn,Gn,Ys,Ks,cl,ul]),A=new Uint32Array(4),C=new Int32Array(4),b=new G;let w=null,T=null;const R=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let I=!1,D=null,Z=null,K=null,H=null;this._outputColorSpace=Kt;let ee=0,X=0,ie=null,le=-1,fe=null;const _e=new ut,k=new ut;let Y=null;const ae=new qe(0);let P=0,z=t.width,Q=t.height,oe=1,re=null,Le=null;const Ae=new ut(0,0,z,Q),pt=new ut(0,0,z,Q);let He=!1;const it=new Ml;let Ze=!1,Ye=!1;const _t=new at,bt=new G,wt=new ut,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let dt=!1;function xt(){return ie===null?oe:1}let F=i;function $t(M,O){return t.getContext(M,O)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",En,!1),F===null){const O="webgl2";if(F=$t(O,M),F===null)throw $t(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Xe("WebGLRenderer: "+M.message),M}let je,y,v,B,W,J,ce,de,j,ne,he,Re,ge,pe,Ie,De,Fe,U,ue,te,me,be,se;function we(){je=new t0(F),je.init(),me=new Xg(F,je),y=new qm(F,je,e,me),v=new $g(F,je),y.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),Z=F.createFramebuffer(),K=F.createFramebuffer(),H=F.createFramebuffer(),B=new s0(F),W=new Pg,J=new Wg(F,je,v,W,y,me,B),ce=new e0(N),de=new lh(F),be=new Wm(F,de),j=new n0(F,de,B,be),ne=new a0(F,j,de,be,B),U=new r0(F,y,J),Ie=new Ym(W),he=new Cg(N,ce,je,y,be,Ie),Re=new Qg(N,W),ge=new Lg,pe=new kg(je),Fe=new $m(N,ce,v,ne,g,l),De=new Vg(N,ne,y),se=new jg(F,B,y,v),ue=new Xm(F,je,B),te=new i0(F,je,B),B.programs=he.programs,N.capabilities=y,N.extensions=je,N.properties=W,N.renderLists=ge,N.shadowMap=De,N.state=v,N.info=B}we(),x!==sn&&(E=new l0(x,t.width,t.height,o,s,r));const Ee=new Zg(N,F);this.xr=Ee,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const M=je.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=je.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(M){M!==void 0&&(oe=M,this.setSize(z,Q,!1))},this.getSize=function(M){return M.set(z,Q)},this.setSize=function(M,O,q=!0){if(Ee.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}z=M,Q=O,t.width=Math.floor(M*oe),t.height=Math.floor(O*oe),q===!0&&(t.style.width=M+"px",t.style.height=O+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(z*oe,Q*oe).floor()},this.setDrawingBufferSize=function(M,O,q){z=M,Q=O,oe=q,t.width=Math.floor(M*q),t.height=Math.floor(O*q),this.setViewport(0,0,M,O)},this.setEffects=function(M){if(x===sn){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let O=0;O<M.length;O++)if(M[O].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(_e)},this.getViewport=function(M){return M.copy(Ae)},this.setViewport=function(M,O,q,V){M.isVector4?Ae.set(M.x,M.y,M.z,M.w):Ae.set(M,O,q,V),v.viewport(_e.copy(Ae).multiplyScalar(oe).round())},this.getScissor=function(M){return M.copy(pt)},this.setScissor=function(M,O,q,V){M.isVector4?pt.set(M.x,M.y,M.z,M.w):pt.set(M,O,q,V),v.scissor(k.copy(pt).multiplyScalar(oe).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(M){v.setScissorTest(He=M)},this.setOpaqueSort=function(M){re=M},this.setTransparentSort=function(M){Le=M},this.getClearColor=function(M){return M.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(M=!0,O=!0,q=!0){let V=0;if(M){let $=!1;if(ie!==null){const Me=ie.texture.format;$=h.has(Me)}if($){const Me=ie.texture.type,Se=m.has(Me),xe=Fe.getClearColor(),Te=Fe.getClearAlpha(),Ce=xe.r,Oe=xe.g,ze=xe.b;Se?(A[0]=Ce,A[1]=Oe,A[2]=ze,A[3]=Te,F.clearBufferuiv(F.COLOR,0,A)):(C[0]=Ce,C[1]=Oe,C[2]=ze,C[3]=Te,F.clearBufferiv(F.COLOR,0,C))}else V|=F.COLOR_BUFFER_BIT}O&&(V|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&F.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),D=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",En,!1),Fe.dispose(),ge.dispose(),pe.dispose(),W.dispose(),ce.dispose(),ne.dispose(),be.dispose(),se.dispose(),he.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Tl),Ee.removeEventListener("sessionend",Al),Ai.stop()};function ft(M){M.preventDefault(),Kl("WebGLRenderer: Context Lost."),I=!0}function ot(){Kl("WebGLRenderer: Context Restored."),I=!1;const M=B.autoReset,O=De.enabled,q=De.autoUpdate,V=De.needsUpdate,$=De.type;we(),B.autoReset=M,De.enabled=O,De.autoUpdate=q,De.needsUpdate=V,De.type=$}function En(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Tn(M){const O=M.target;O.removeEventListener("dispose",Tn),Yu(O)}function Yu(M){Ku(M),W.remove(M)}function Ku(M){const O=W.get(M).programs;O!==void 0&&(O.forEach(function(q){he.releaseProgram(q)}),M.isShaderMaterial&&he.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,q,V,$,Me){O===null&&(O=It);const Se=$.isMesh&&$.matrixWorld.determinantAffine()<0,xe=Qu(M,O,q,V,$);v.setMaterial(V,Se);let Te=q.index,Ce=1;if(V.wireframe===!0){if(Te=j.getWireframeAttribute(q),Te===void 0)return;Ce=2}const Oe=q.drawRange,ze=q.attributes.position;let Pe=Oe.start*Ce,tt=(Oe.start+Oe.count)*Ce;Me!==null&&(Pe=Math.max(Pe,Me.start*Ce),tt=Math.min(tt,(Me.start+Me.count)*Ce)),Te!==null?(Pe=Math.max(Pe,0),tt=Math.min(tt,Te.count)):ze!=null&&(Pe=Math.max(Pe,0),tt=Math.min(tt,ze.count));const mt=tt-Pe;if(mt<0||mt===1/0)return;be.setup($,V,xe,q,Te);let ht,st=ue;if(Te!==null&&(ht=de.get(Te),st=te,st.setIndex(ht)),$.isMesh)V.wireframe===!0?(v.setLineWidth(V.wireframeLinewidth*xt()),st.setMode(F.LINES)):st.setMode(F.TRIANGLES);else if($.isLine){let Nt=V.linewidth;Nt===void 0&&(Nt=1),v.setLineWidth(Nt*xt()),$.isLineSegments?st.setMode(F.LINES):$.isLineLoop?st.setMode(F.LINE_LOOP):st.setMode(F.LINE_STRIP)}else $.isPoints?st.setMode(F.POINTS):$.isSprite&&st.setMode(F.TRIANGLES);if($.isBatchedMesh)if(je.get("WEBGL_multi_draw"))st.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Nt=$._multiDrawStarts,ye=$._multiDrawCounts,Qt=$._multiDrawCount,Ke=Te?de.get(Te).bytesPerElement:1,rn=W.get(V).currentProgram.getUniforms();for(let An=0;An<Qt;An++)rn.setValue(F,"_gl_DrawID",An),st.render(Nt[An]/Ke,ye[An])}else if($.isInstancedMesh)st.renderInstances(Pe,mt,$.count);else if(q.isInstancedBufferGeometry){const Nt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ye=Math.min(q.instanceCount,Nt);st.renderInstances(Pe,mt,ye)}else st.render(Pe,mt)};function El(M,O,q){M.transparent===!0&&M.side===Jn&&M.forceSinglePass===!1?(M.side=Jt,M.needsUpdate=!0,rr(M,O,q),M.side=Ei,M.needsUpdate=!0,rr(M,O,q),M.side=Jn):rr(M,O,q)}this.compile=function(M,O,q=null){q===null&&(q=M),T=pe.get(q),T.init(O),_.push(T),q.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),M!==q&&M.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights();const V=new Set;return M.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Me=$.material;if(Me)if(Array.isArray(Me))for(let Se=0;Se<Me.length;Se++){const xe=Me[Se];El(xe,q,$),V.add(xe)}else El(Me,q,$),V.add(Me)}),T=_.pop(),V},this.compileAsync=function(M,O,q=null){const V=this.compile(M,O,q);return new Promise($=>{function Me(){if(V.forEach(function(Se){W.get(Se).currentProgram.isReady()&&V.delete(Se)}),V.size===0){$(M);return}setTimeout(Me,10)}je.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let aa=null;function Zu(M){aa&&aa(M)}function Tl(){Ai.stop()}function Al(){Ai.start()}const Ai=new ku;Ai.setAnimationLoop(Zu),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(M){aa=M,Ee.setAnimationLoop(M),M===null?Ai.stop():Ai.start()},Ee.addEventListener("sessionstart",Tl),Ee.addEventListener("sessionend",Al),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;D!==null&&D.renderStart(M,O);const q=Ee.enabled===!0&&Ee.isPresenting===!0,V=E!==null&&(ie===null||q)&&E.begin(N,ie);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(O),O=Ee.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,O,ie),T=pe.get(M,_.length),T.init(O),T.state.textureUnits=J.getTextureUnits(),_.push(T),_t.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),it.setFromProjectionMatrix(_t,On,O.reversedDepth),Ye=this.localClippingEnabled,Ze=Ie.init(this.clippingPlanes,Ye),w=ge.get(M,R.length),w.init(),R.push(w),Ee.enabled===!0&&Ee.isPresenting===!0){const Se=N.xr.getDepthSensingMesh();Se!==null&&oa(Se,O,-1/0,N.sortObjects)}oa(M,O,0,N.sortObjects),w.finish(),N.sortObjects===!0&&w.sort(re,Le,O.reversedDepth),dt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,dt&&Fe.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Ie.beginShadows();const $=T.state.shadowsArray;if(De.render($,M,O),Ze===!0&&Ie.endShadows(),(V&&E.hasRenderPass())===!1){const Se=w.opaque,xe=w.transmissive;if(T.setupLights(),O.isArrayCamera){const Te=O.cameras;if(xe.length>0)for(let Ce=0,Oe=Te.length;Ce<Oe;Ce++){const ze=Te[Ce];Rl(Se,xe,M,ze)}dt&&Fe.render(M);for(let Ce=0,Oe=Te.length;Ce<Oe;Ce++){const ze=Te[Ce];wl(w,M,ze,ze.viewport)}}else xe.length>0&&Rl(Se,xe,M,O),dt&&Fe.render(M),wl(w,M,O)}ie!==null&&X===0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie)),V&&E.end(N),M.isScene===!0&&M.onAfterRender(N,M,O),be.resetDefaultState(),le=-1,fe=null,_.pop(),_.length>0?(T=_[_.length-1],J.setTextureUnits(T.state.textureUnits),Ze===!0&&Ie.setGlobalState(N.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,D!==null&&D.renderEnd()};function oa(M,O,q,V){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||it.intersectsSprite(M)){V&&wt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(_t);const Se=ne.update(M),xe=M.material;xe.visible&&w.push(M,Se,xe,q,wt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||it.intersectsObject(M))){const Se=ne.update(M),xe=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),wt.copy(M.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),wt.copy(Se.boundingSphere.center)),wt.applyMatrix4(M.matrixWorld).applyMatrix4(_t)),Array.isArray(xe)){const Te=Se.groups;for(let Ce=0,Oe=Te.length;Ce<Oe;Ce++){const ze=Te[Ce],Pe=xe[ze.materialIndex];Pe&&Pe.visible&&w.push(M,Se,Pe,q,wt.z,ze)}}else xe.visible&&w.push(M,Se,xe,q,wt.z,null)}}const Me=M.children;for(let Se=0,xe=Me.length;Se<xe;Se++)oa(Me[Se],O,q,V)}function wl(M,O,q,V){const{opaque:$,transmissive:Me,transparent:Se}=M;T.setupLightsView(q),Ze===!0&&Ie.setGlobalState(N.clippingPlanes,q),V&&v.viewport(_e.copy(V)),$.length>0&&sr($,O,q),Me.length>0&&sr(Me,O,q),Se.length>0&&sr(Se,O,q),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Rl(M,O,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const Pe=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new zn(1,1,{generateMipmaps:!0,type:Pe?ri:sn,minFilter:Oi,samples:Math.max(4,y.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const Me=T.state.transmissionRenderTarget[V.id],Se=V.viewport||_e;Me.setSize(Se.z*N.transmissionResolutionScale,Se.w*N.transmissionResolutionScale);const xe=N.getRenderTarget(),Te=N.getActiveCubeFace(),Ce=N.getActiveMipmapLevel();N.setRenderTarget(Me),N.getClearColor(ae),P=N.getClearAlpha(),P<1&&N.setClearColor(16777215,.5),N.clear(),dt&&Fe.render(q);const Oe=N.toneMapping;N.toneMapping=Bn;const ze=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),Ze===!0&&Ie.setGlobalState(N.clippingPlanes,V),sr(M,q,V),J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me),je.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let tt=0,mt=O.length;tt<mt;tt++){const ht=O[tt],{object:st,geometry:Nt,material:ye,group:Qt}=ht;if(ye.side===Jn&&st.layers.test(V.layers)){const Ke=ye.side;ye.side=Jt,ye.needsUpdate=!0,Cl(st,q,V,Nt,ye,Qt),ye.side=Ke,ye.needsUpdate=!0,Pe=!0}}Pe===!0&&(J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me))}N.setRenderTarget(xe,Te,Ce),N.setClearColor(ae,P),ze!==void 0&&(V.viewport=ze),N.toneMapping=Oe}function sr(M,O,q){const V=O.isScene===!0?O.overrideMaterial:null;for(let $=0,Me=M.length;$<Me;$++){const Se=M[$],{object:xe,geometry:Te,group:Ce}=Se;let Oe=Se.material;Oe.allowOverride===!0&&V!==null&&(Oe=V),xe.layers.test(q.layers)&&Cl(xe,O,q,Te,Oe,Ce)}}function Cl(M,O,q,V,$,Me){M.onBeforeRender(N,O,q,V,$,Me),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),$.onBeforeRender(N,O,q,V,M,Me),$.transparent===!0&&$.side===Jn&&$.forceSinglePass===!1?($.side=Jt,$.needsUpdate=!0,N.renderBufferDirect(q,O,V,$,M,Me),$.side=Ei,$.needsUpdate=!0,N.renderBufferDirect(q,O,V,$,M,Me),$.side=Jn):N.renderBufferDirect(q,O,V,$,M,Me),M.onAfterRender(N,O,q,V,$,Me)}function rr(M,O,q){O.isScene!==!0&&(O=It);const V=W.get(M),$=T.state.lights,Me=T.state.shadowsArray,Se=$.state.version,xe=he.getParameters(M,$.state,Me,O,q,T.state.lightProbeGridArray),Te=he.getProgramCacheKey(xe);let Ce=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;const Oe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=ce.get(M.envMap||V.environment,Oe),V.envMapRotation=V.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",Tn),Ce=new Map,V.programs=Ce);let ze=Ce.get(Te);if(ze!==void 0){if(V.currentProgram===ze&&V.lightsStateVersion===Se)return Il(M,xe),ze}else xe.uniforms=he.getUniforms(M),D!==null&&M.isNodeMaterial&&D.build(M,q,xe),M.onBeforeCompile(xe,N),ze=he.acquireProgram(xe,Te),Ce.set(Te,ze),V.uniforms=xe.uniforms;const Pe=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=Ie.uniform),Il(M,xe),V.needsLights=ed(M),V.lightsStateVersion=Se,V.needsLights&&(Pe.ambientLightColor.value=$.state.ambient,Pe.lightProbe.value=$.state.probe,Pe.directionalLights.value=$.state.directional,Pe.directionalLightShadows.value=$.state.directionalShadow,Pe.spotLights.value=$.state.spot,Pe.spotLightShadows.value=$.state.spotShadow,Pe.rectAreaLights.value=$.state.rectArea,Pe.ltc_1.value=$.state.rectAreaLTC1,Pe.ltc_2.value=$.state.rectAreaLTC2,Pe.pointLights.value=$.state.point,Pe.pointLightShadows.value=$.state.pointShadow,Pe.hemisphereLights.value=$.state.hemi,Pe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Pe.spotLightMatrix.value=$.state.spotLightMatrix,Pe.spotLightMap.value=$.state.spotLightMap,Pe.pointShadowMatrix.value=$.state.pointShadowMatrix),V.lightProbeGrid=T.state.lightProbeGridArray.length>0,V.currentProgram=ze,V.uniformsList=null,ze}function Pl(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=Br.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Il(M,O){const q=W.get(M);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Ju(M,O){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(O.matrixWorld);for(let q=0,V=M.length;q<V;q++){const $=M[q];if($.texture!==null&&$.boundingBox.containsPoint(b))return $}return null}function Qu(M,O,q,V,$){O.isScene!==!0&&(O=It),J.resetTextureUnits();const Me=O.fog,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,xe=ie===null?N.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:$e.workingColorSpace,Te=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ce=ce.get(V.envMap||Se,Te),Oe=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ze=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Pe=!!q.morphAttributes.position,tt=!!q.morphAttributes.normal,mt=!!q.morphAttributes.color;let ht=Bn;V.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ht=N.toneMapping);const st=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Nt=st!==void 0?st.length:0,ye=W.get(V),Qt=T.state.lights;if(Ze===!0&&(Ye===!0||M!==fe)){const lt=M===fe&&V.id===le;Ie.setState(V,M,lt)}let Ke=!1;V.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Qt.state.version||ye.outputColorSpace!==xe||$.isBatchedMesh&&ye.batching===!1||!$.isBatchedMesh&&ye.batching===!0||$.isBatchedMesh&&ye.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&ye.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&ye.instancing===!1||!$.isInstancedMesh&&ye.instancing===!0||$.isSkinnedMesh&&ye.skinning===!1||!$.isSkinnedMesh&&ye.skinning===!0||$.isInstancedMesh&&ye.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ye.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ye.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ye.instancingMorph===!1&&$.morphTexture!==null||ye.envMap!==Ce||V.fog===!0&&ye.fog!==Me||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Ie.numPlanes||ye.numIntersection!==Ie.numIntersection)||ye.vertexAlphas!==Oe||ye.vertexTangents!==ze||ye.morphTargets!==Pe||ye.morphNormals!==tt||ye.morphColors!==mt||ye.toneMapping!==ht||ye.morphTargetsCount!==Nt||!!ye.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,ye.__version=V.version);let rn=ye.currentProgram;Ke===!0&&(rn=rr(V,O,$),D&&V.isNodeMaterial&&D.onUpdateProgram(V,rn,ye));let An=!1,ci=!1,qi=!1;const rt=rn.getUniforms(),gt=ye.uniforms;if(v.useProgram(rn.program)&&(An=!0,ci=!0,qi=!0),V.id!==le&&(le=V.id,ci=!0),ye.needsLights){const lt=Ju(T.state.lightProbeGridArray,$);ye.lightProbeGrid!==lt&&(ye.lightProbeGrid=lt,ci=!0)}if(An||fe!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),rt.setValue(F,"projectionMatrix",M.projectionMatrix),rt.setValue(F,"viewMatrix",M.matrixWorldInverse);const di=rt.map.cameraPosition;di!==void 0&&di.setValue(F,bt.setFromMatrixPosition(M.matrixWorld)),y.logarithmicDepthBuffer&&rt.setValue(F,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&rt.setValue(F,"isOrthographic",M.isOrthographicCamera===!0),fe!==M&&(fe=M,ci=!0,qi=!0)}if(ye.needsLights&&(Qt.state.directionalShadowMap.length>0&&rt.setValue(F,"directionalShadowMap",Qt.state.directionalShadowMap,J),Qt.state.spotShadowMap.length>0&&rt.setValue(F,"spotShadowMap",Qt.state.spotShadowMap,J),Qt.state.pointShadowMap.length>0&&rt.setValue(F,"pointShadowMap",Qt.state.pointShadowMap,J)),$.isSkinnedMesh){rt.setOptional(F,$,"bindMatrix"),rt.setOptional(F,$,"bindMatrixInverse");const lt=$.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),rt.setValue(F,"boneTexture",lt.boneTexture,J))}$.isBatchedMesh&&(rt.setOptional(F,$,"batchingTexture"),rt.setValue(F,"batchingTexture",$._matricesTexture,J),rt.setOptional(F,$,"batchingIdTexture"),rt.setValue(F,"batchingIdTexture",$._indirectTexture,J),rt.setOptional(F,$,"batchingColorTexture"),$._colorsTexture!==null&&rt.setValue(F,"batchingColorTexture",$._colorsTexture,J));const ui=q.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&U.update($,q,rn),(ci||ye.receiveShadow!==$.receiveShadow)&&(ye.receiveShadow=$.receiveShadow,rt.setValue(F,"receiveShadow",$.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(gt.envMapIntensity.value=O.environmentIntensity),gt.dfgLUT!==void 0&&(gt.dfgLUT.value=tv()),ci){if(rt.setValue(F,"toneMappingExposure",N.toneMappingExposure),ye.needsLights&&ju(gt,qi),Me&&V.fog===!0&&Re.refreshFogUniforms(gt,Me),Re.refreshMaterialUniforms(gt,V,oe,Q,T.state.transmissionRenderTarget[M.id]),ye.needsLights&&ye.lightProbeGrid){const lt=ye.lightProbeGrid;gt.probesSH.value=lt.texture,gt.probesMin.value.copy(lt.boundingBox.min),gt.probesMax.value.copy(lt.boundingBox.max),gt.probesResolution.value.copy(lt.resolution)}Br.upload(F,Pl(ye),gt,J)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Br.upload(F,Pl(ye),gt,J),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&rt.setValue(F,"center",$.center),rt.setValue(F,"modelViewMatrix",$.modelViewMatrix),rt.setValue(F,"normalMatrix",$.normalMatrix),rt.setValue(F,"modelMatrix",$.matrixWorld),V.uniformsGroups!==void 0){const lt=V.uniformsGroups;for(let di=0,Yi=lt.length;di<Yi;di++){const Ll=lt[di];se.update(Ll,rn),se.bind(Ll,rn)}}return rn}function ju(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function ed(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(M,O,q){const V=W.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=O,W.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,O){const q=W.get(M);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,q=0){ie=M,ee=O,X=q;let V=null,$=!1,Me=!1;if(M){const xe=W.get(M);if(xe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(F.FRAMEBUFFER,xe.__webglFramebuffer),_e.copy(M.viewport),k.copy(M.scissor),Y=M.scissorTest,v.viewport(_e),v.scissor(k),v.setScissorTest(Y),le=-1;return}else if(xe.__webglFramebuffer===void 0)J.setupRenderTarget(M);else if(xe.__hasExternalTextures)J.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Oe=M.depthTexture;if(xe.__boundDepthTexture!==Oe){if(Oe!==null&&W.has(Oe)&&(M.width!==Oe.image.width||M.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(M)}}const Te=M.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Me=!0);const Ce=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ce[O])?V=Ce[O][q]:V=Ce[O],$=!0):M.samples>0&&J.useMultisampledRTT(M)===!1?V=W.get(M).__webglMultisampledFramebuffer:Array.isArray(Ce)?V=Ce[q]:V=Ce,_e.copy(M.viewport),k.copy(M.scissor),Y=M.scissorTest}else _e.copy(Ae).multiplyScalar(oe).floor(),k.copy(pt).multiplyScalar(oe).floor(),Y=He;if(q!==0&&(V=Z),v.bindFramebuffer(F.FRAMEBUFFER,V)&&v.drawBuffers(M,V),v.viewport(_e),v.scissor(k),v.setScissorTest(Y),$){const xe=W.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,xe.__webglTexture,q)}else if(Me){const xe=O;for(let Te=0;Te<M.textures.length;Te++){const Ce=W.get(M.textures[Te]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,q,xe)}}else if(M!==null&&q!==0){const xe=W.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xe.__webglTexture,q)}le=-1},this.readRenderTargetPixels=function(M,O,q,V,$,Me,Se,xe=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te){v.bindFramebuffer(F.FRAMEBUFFER,Te);try{const Ce=M.textures[xe],Oe=Ce.format,ze=Ce.type;if(M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe),!y.textureFormatReadable(Oe)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!y.textureTypeReadable(ze)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-V&&q>=0&&q<=M.height-$&&F.readPixels(O,q,V,$,me.convert(Oe),me.convert(ze),Me)}finally{const Ce=ie!==null?W.get(ie).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(M,O,q,V,$,Me,Se,xe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te)if(O>=0&&O<=M.width-V&&q>=0&&q<=M.height-$){v.bindFramebuffer(F.FRAMEBUFFER,Te);const Ce=M.textures[xe],Oe=Ce.format,ze=Ce.type;if(M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe),!y.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!y.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Pe),F.bufferData(F.PIXEL_PACK_BUFFER,Me.byteLength,F.STREAM_READ),F.readPixels(O,q,V,$,me.convert(Oe),me.convert(ze),0);const tt=ie!==null?W.get(ie).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,tt);const mt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Mf(F,mt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Pe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Me),F.deleteBuffer(Pe),F.deleteSync(mt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,O=null,q=0){const V=Math.pow(2,-q),$=Math.floor(M.image.width*V),Me=Math.floor(M.image.height*V),Se=O!==null?O.x:0,xe=O!==null?O.y:0;J.setTexture2D(M,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Se,xe,$,Me),v.unbindTexture()},this.copyTextureToTexture=function(M,O,q=null,V=null,$=0,Me=0){let Se,xe,Te,Ce,Oe,ze,Pe,tt,mt;const ht=M.isCompressedTexture?M.mipmaps[Me]:M.image;if(q!==null)Se=q.max.x-q.min.x,xe=q.max.y-q.min.y,Te=q.isBox3?q.max.z-q.min.z:1,Ce=q.min.x,Oe=q.min.y,ze=q.isBox3?q.min.z:0;else{const gt=Math.pow(2,-$);Se=Math.floor(ht.width*gt),xe=Math.floor(ht.height*gt),M.isDataArrayTexture?Te=ht.depth:M.isData3DTexture?Te=Math.floor(ht.depth*gt):Te=1,Ce=0,Oe=0,ze=0}V!==null?(Pe=V.x,tt=V.y,mt=V.z):(Pe=0,tt=0,mt=0);const st=me.convert(O.format),Nt=me.convert(O.type);let ye;O.isData3DTexture?(J.setTexture3D(O,0),ye=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(J.setTexture2DArray(O,0),ye=F.TEXTURE_2D_ARRAY):(J.setTexture2D(O,0),ye=F.TEXTURE_2D),v.activeTexture(F.TEXTURE0),v.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),v.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),v.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const Qt=v.getParameter(F.UNPACK_ROW_LENGTH),Ke=v.getParameter(F.UNPACK_IMAGE_HEIGHT),rn=v.getParameter(F.UNPACK_SKIP_PIXELS),An=v.getParameter(F.UNPACK_SKIP_ROWS),ci=v.getParameter(F.UNPACK_SKIP_IMAGES);v.pixelStorei(F.UNPACK_ROW_LENGTH,ht.width),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ht.height),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(F.UNPACK_SKIP_ROWS,Oe),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ze);const qi=M.isDataArrayTexture||M.isData3DTexture,rt=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){const gt=W.get(M),ui=W.get(O),lt=W.get(gt.__renderTarget),di=W.get(ui.__renderTarget);v.bindFramebuffer(F.READ_FRAMEBUFFER,lt.__webglFramebuffer),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let Yi=0;Yi<Te;Yi++)qi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(M).__webglTexture,$,ze+Yi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(O).__webglTexture,Me,mt+Yi)),F.blitFramebuffer(Ce,Oe,Se,xe,Pe,tt,Se,xe,F.DEPTH_BUFFER_BIT,F.NEAREST);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if($!==0||M.isRenderTargetTexture||W.has(M)){const gt=W.get(M),ui=W.get(O);v.bindFramebuffer(F.READ_FRAMEBUFFER,K),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,H);for(let lt=0;lt<Te;lt++)qi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,gt.__webglTexture,$,ze+lt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,gt.__webglTexture,$),rt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ui.__webglTexture,Me,mt+lt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ui.__webglTexture,Me),$!==0?F.blitFramebuffer(Ce,Oe,Se,xe,Pe,tt,Se,xe,F.COLOR_BUFFER_BIT,F.NEAREST):rt?F.copyTexSubImage3D(ye,Me,Pe,tt,mt+lt,Ce,Oe,Se,xe):F.copyTexSubImage2D(ye,Me,Pe,tt,Ce,Oe,Se,xe);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else rt?M.isDataTexture||M.isData3DTexture?F.texSubImage3D(ye,Me,Pe,tt,mt,Se,xe,Te,st,Nt,ht.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(ye,Me,Pe,tt,mt,Se,xe,Te,st,ht.data):F.texSubImage3D(ye,Me,Pe,tt,mt,Se,xe,Te,st,Nt,ht):M.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Me,Pe,tt,Se,xe,st,Nt,ht.data):M.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Me,Pe,tt,ht.width,ht.height,st,ht.data):F.texSubImage2D(F.TEXTURE_2D,Me,Pe,tt,Se,xe,st,Nt,ht);v.pixelStorei(F.UNPACK_ROW_LENGTH,Qt),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ke),v.pixelStorei(F.UNPACK_SKIP_PIXELS,rn),v.pixelStorei(F.UNPACK_SKIP_ROWS,An),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ci),Me===0&&O.generateMipmaps&&F.generateMipmap(ye),v.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&J.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?J.setTextureCube(M,0):M.isData3DTexture?J.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?J.setTexture2DArray(M,0):J.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){ee=0,X=0,ie=null,v.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}function bl(n){const t=new Uint8Array(65536);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const a=Math.sin(r*127.1+s*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(r*.5+Math.sin(s*.07)*2)+a*12:n==="cloth"?231+(r%2?7:-7)+(s%2?4:-4):228+12*Math.sin(r*.12+s*.075+Math.sin(s*.08)*3)+a*8,l=(s*128+r)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new xl(t,128,128);return i.wrapS=i.wrapT=$r,i.colorSpace=Kt,i.needsUpdate=!0,i}const Yo=bl("wood"),Xu=bl("stone"),Hs=bl("cloth"),S={stone:new vt({color:fi.materials.stone,map:Xu,roughness:.72}),wall:new vt({color:fi.materials.wall,roughness:.88}),wood:new vt({color:fi.materials.wood,map:Yo,roughness:.52}),walnut:new vt({color:fi.materials.darkWood,map:Yo,roughness:.5}),gold:new vt({color:fi.materials.metal,metalness:.7,roughness:.36}),navy:new vt({color:fi.materials.blue,roughness:.65}),white:new vt({color:fi.materials.linen,map:Hs,roughness:.93}),teal:new vt({color:fi.materials.accent,map:Hs,roughness:.83}),rust:new vt({color:9920067,map:Hs,roughness:.84}),carpet:new vt({color:6845561,map:Hs,roughness:1}),black:new vt({color:1449508,roughness:.6}),green:new vt({color:3495746,roughness:.86}),leaf:new vt({color:6651984,roughness:.8}),glass:new vt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new vt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new vt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new vt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new vt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new vt({color:14000506,roughness:.9}),hair:new vt({color:2433314,roughness:.9}),ao:new nr({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},Ko=new Map;function iv(n){let e=Ko.get(n);return e||(e=new vt({color:n,roughness:.75}),Ko.set(n,e)),e}function sv(){Object.values(S).forEach(n=>n.dispose()),Ko.forEach(n=>n.dispose()),[Yo,Xu,Hs].forEach(n=>n.dispose())}const ir={box:new ws(1,1,1),cylinder:new jr(1,1,1,12),sphere:new Zr(1,12,8),leaf:new Zr(1,8,6),cone:new ea(1,1,16),plane:new Rs(1,1)};function L(n,e,t,i,s,r,a,o=S.wood){const l=new Pt(ir.box,o);return l.position.set(e,t,i),l.scale.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Ge(n,e,t,i,s,r,a=S.gold){const o=new Pt(ir.cylinder,a);return o.position.set(e,t,i),o.scale.set(s,r,s),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Pn(n,e,t,i,s,r,a,o=S.leaf){const l=new Pt(ir.sphere,o);return l.position.set(e,t,i),l.scale.set(s,r,a),l.castShadow=!0,n.add(l),l}function sa(n,e,t,i,s,r=.022){const a=new Pt(ir.plane,S.ao);a.rotation.x=-Math.PI/2,a.position.set(e,r,t),a.scale.set(i,s,1),n.add(a)}function Gt(n,e,t,i=1,s=0){const r=new Bt;r.position.set(e,s,t),r.scale.setScalar(i),n.add(r),Ge(r,0,.21,0,.21,.42,S.stone),Ge(r,0,.76,0,.027,1.1,S.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Pn(r,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?S.leaf:S.green).rotation.set(.3,o,Math.sin(o)*.65)}return sa(r,0,0,.7,.55),r}function In(n,e,t,i,s=1){const r=new Bt;return r.position.set(e,t,i),r.scale.setScalar(s),n.add(r),Ge(r,0,.035,0,.11,.045,S.gold),Ge(r,0,.21,0,.019,.36,S.gold),Ge(r,0,.42,0,.16,.22,S.shade),Ge(r,0,.315,0,.135,.015,S.glow),r}function Bi(n,e,t,i=0,s=S.teal){const r=new Bt;r.position.set(e,0,t),r.rotation.y=i,n.add(r),L(r,0,.43,0,.55,.14,.56,s),L(r,0,.71,-.23,.55,.48,.1,s);for(const a of[-1,1])for(const o of[-1,1])Ge(r,a*.2,.2,o*.2,.025,.4,S.walnut);return r}function Kn(n,e,t,i=0,s=1.5,r=S.teal){const a=new Bt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),L(a,0,.32,0,s,.42,.64,r),L(a,0,.66,-.29,s,.65,.18,r);for(const o of[-1,1])L(a,o*(s/2-.08),.56,0,.16,.4,.7,r),L(a,o*s*.23,.55,-.17,.35,.28,.11,S.white);return L(a,0,.58,.04,s-.3,.11,.44,r),sa(a,0,0,s+.15,.95),a}function Mi(n,e,t,i=.42){Ge(n,e,.37,t,.055,.74,S.gold),Ge(n,e,.75,t,i,.07,S.stone),Ge(n,e,.04,t,i*.5,.06,S.walnut)}function Vs(n,e,t,i){Ge(n,e,t,i,.07,.13,S.white),Ge(n,e,t-.065,i,.12,.018,S.white)}function zi(n,e,t,i,s=1.15,r=.65,a=0){L(n,e,t,i,s+.07,r+.07,.06,S.gold),L(n,e,t,i+.04,s,r,.015,S.white),L(n,e,t-r*.14,i+.06,s*.93,r*.37,.012,a%2?S.teal:S.window),L(n,e-s*.2,t+r*.02,i+.07,s*.27,r*.25,.014,S.stone),Pn(n,e+s*.25,t+r*.19,i+.075,r*.13,r*.13,.006,S.rust)}function rv(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Pt)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let s=e.get(i);s||(s={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,s)),s.matrices.push(t.matrixWorld.clone()),s.meshes.push(t)});for(const t of e.values()){const i=new Iu(t.geometry,t.material,t.matrices.length);t.matrices.forEach((s,r)=>i.setMatrixAt(r,s)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(s=>s.removeFromParent()),n.add(i)}}function av(n){const e=n.level??1,t=new Bt;t.name=n.id,t.userData.entityId=n.id,L(t,0,.04,0,4.7,.08,3.1,e>=4?S.stone:e>=2?S.walnut:S.wood),L(t,0,1.19,-1.51,4.7,2.38,.14,S.wall),L(t,2.35,1.14,-.1,.1,2.28,2.75,S.stone),L(t,1.6,1.25,-1.41,1.05,1.9,.035,S.window);for(const a of[1.1,1.6,2.1])L(t,a,1.25,-1.35,.035,1.94,.04,S.gold);L(t,1.6,1.25,-1.35,1.08,.04,.04,S.gold);for(let a=1.03;a<1.26;a+=.06)L(t,a,1.28,-1.23,.04,1.94,.13,S.white);if(L(t,0,2.27,-1.27,4.53,.06,.065,S.glow),n.construction){for(const a of[-1.8,0,1.8])L(t,a,1.05,1.5,.07,2.1,.07,S.gold),L(t,a,.4,.4,.65,.7,.7,S.stone);for(const a of[.5,1.4,2.15])L(t,0,a,1.5,4.5,.06,.06,S.gold);return L(t,0,.8,1.55,4.5,.48,.06,S.navy),t}if(n.status==="unbuilt")return L(t,0,.12,0,3.8,.08,2.5,S.stone),t;const i=qc(n),s=Xc(n)==="twin";L(t,-.67,.078,.07,2.85,.02,2.66,S.carpet);const r=(a,o)=>{L(t,a,.28,-.03,o+.09,.39,1.9,S.walnut),L(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?S.stone:S.white),L(t,a,.7,-.98,o+.13,1.22,.12,S.walnut),L(t,a,.82,-.89,o-.05,.63,.08,S.teal),L(t,a,.67,-.58,o*.82,.13,.36,S.white),e>=2&&(L(t,a,.78,-.72,o*.78,.12,.25,S.white),L(t,a,.655,.18,o,.045,.45,e>=4?S.white:S.teal)),L(t,a,.646,.54,o,.075,.39,e>=4?S.gold:i?S.rust:S.teal),L(t,a,.49,1,o,.28,.04,S.white),sa(t,a,0,o+.25,2.25)};s?(r(-1.36,.88),r(-.22,.88)):r(-.75,1.68);for(const a of[-1.94,.43])L(t,a,.35,-.76,.41,.58,.5,S.walnut),L(t,a,.66,-.76,.45,.06,.53,S.stone),In(t,a,.69,-.77,.8);if(zi(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)L(t,1.65,.38,-.4,.9,.65,.85,S.stone),L(t,1.65,.73,-.4,.85,.08,.8,S.white),Ge(t,1.65,.83,-.65,.025,.22,S.gold),L(t,2.16,1.25,-.35,.025,1.8,1.5,S.glass),L(t,1.6,1.93,-1.14,.3,.04,.25,S.gold),zi(t,1.5,1.6,-1.33,.8,.5,e),Kn(t,1.58,.76,-Math.PI/2,.75,S.white);else if(i)Kn(t,1.55,.22,-Math.PI/2,1.3,S.rust),Mi(t,.97,.8,.25);else{L(t,1.61,.76,-.57,1.1,.1,.57,S.walnut);for(const a of[1.19,2.03])L(t,a,.37,-.57,.05,.75,.46,S.gold);L(t,1.59,.94,-.64,.35,.28,.04,S.screen),Bi(t,1.65,.06,Math.PI),In(t,2,.82,-.62,.66)}if(Si(n)==="view"||Si(n)==="premium"){L(t,0,1.45,-1.4,4.15,1.65,.025,S.window);for(const a of[-2,0,2])L(t,a,1.45,-1.35,.045,1.7,.045,S.gold)}if(Si(n)==="premium"&&(L(t,0,2.1,-1.25,4.5,.08,.08,S.gold),zi(t,-1.6,1.8,-1.3,.8,.4,99),Gt(t,1.95,.55,1.15)),n.extraBed&&(L(t,.5,.25,1.02,.8,.3,.8,S.walnut),L(t,.5,.43,1.02,.8,.08,.8,S.white)),Gt(t,2.05,1.05,.63),(n.level??1)>1&&(zi(t,-2.05,1.6,-1.38,.38,.56,n.level),Gt(t,-2.05,.35,.55)),e>=3&&(In(t,-1.94,1.25,-.9,1.1),L(t,-.75,1.62,-1.25,2.1,.025,.03,S.glow)),e>=5){L(t,0,1.4,-1.42,4.3,1.9,.025,S.window);for(const a of[-2,-.8,.8,2])L(t,a,1.4,-1.35,.04,1.95,.06,S.gold);for(const a of[-1.8,0,1.8])L(t,a,.09,.15,.025,.02,2.9,S.gold);for(const a of[2.12,2.24])L(t,0,a,-1.1,4.5,.035,.035,S.glow)}if((n.level??1)>2&&L(t,0,2.12,-1.3,4.55,.035,.055,S.gold),L(t,-2.12,.52,.95,.22,1,.28,S.walnut),n.status==="reserved"&&(n.suaBookingId&&L(t,0,1.1,1.62,.38,.5,.05,S.rust),L(t,1.2,.48,1.48,.25,.29,.1,S.gold)),n.status==="cleaning"){L(t,1.05,.37,1.57,.55,.55,.35,S.navy);for(const a of[.83,1.27])Ge(t,a,.09,1.57,.07,.07,S.black);L(t,1.05,.71,1.57,.6,.04,.41,S.gold),L(t,.95,.79,1.57,.3,.12,.22,S.white)}if(n.status==="occupied"&&L(t,0,2.23,.7,3.8,.035,.035,S.shade),n.status==="maintenance"){const a=L(t,.9,1.95,1.55,.17,.17,.08,S.glow);a.name="fault-lamp",a.userData.interactive=!0,L(t,.6,.33,.9,.8,.1,.8,S.rust),L(t,.6,.52,.9,.1,.6,.1,S.gold)}return t}function Dr(n,e,t,i=2.12){Ge(n,e,i+.13,t,.012,.45,S.gold),Ge(n,e,i-.08,t,.24,.18,S.gold),Ge(n,e,i-.18,t,.21,.015,S.glow)}function ov(n,e){if(L(n,0,1.2,-1.54,14.65,2.4,.14,S.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)L(n,t,1.2,-1.42,.035,2.38,.08,S.gold);else for(let t=-7;t<7;t+=.58)L(n,t,1.2,-1.43,.022,2.2,.04,S.wood)}function ds(n,e,t){L(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,S.window);for(let i=e;i<=t+.01;i+=.72)L(n,i,1.23,-1.32,.045,2.17,.06,S.gold);L(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,S.gold)}function lv(n,e,t){Mi(n,e,t,.44),Bi(n,e-.63,t,Math.PI/2),Bi(n,e+.63,t,-Math.PI/2),Vs(n,e-.18,.87,t),Vs(n,e+.18,.87,t),Ge(n,e,.83,t,.065,.12,S.gold)}function Va(n,e,t){L(n,e,1.23,-1.35,t,1.86,.18,S.walnut);for(let i=.53;i<2;i+=.39){L(n,e,i,-1.14,t,.04,.42,S.gold),L(n,e,i+.035,-1.18,t-.1,.025,.05,S.glow);for(let s=0;s<Math.floor(t/.23);s++){const r=e-t/2+.16+s*.23;Ge(n,r,i+.13,-1.08,.048,.23,s%3?S.green:S.rust),Ge(n,r,i+.27,-1.08,.019,.07,S.gold)}}}function cv(n,e=1,t=100,i=!1){const s=new Bt;if(n!=="rooftop"&&(ov(s,n),L(s,0,.04,0,14.66,.08,3.15,n==="lobby"?S.stone:S.wood),L(s,0,2.31,-1.21,14.5,.04,.07,S.glow)),i){for(const r of[-6,-3,0,3,6])L(s,r,1.1,1.4,.08,2.2,.08,S.gold);for(const r of[.5,1.5,2.1])L(s,0,r,1.4,14,.08,.08,S.gold);return L(s,0,.8,1.5,14,.65,.04,S.navy),s}if(n==="lobby"){ds(s,4.3,7.2),L(s,0,1.35,-1.33,6.7,1.8,.11,S.stone),L(s,0,.48,.5,6.2,.84,.62,S.walnut),L(s,0,.94,.5,6.45,.12,.83,S.stone),L(s,0,.15,.86,6.08,.075,.035,S.glow);for(let r=-2.9;r<3;r+=.18)L(s,r,.5,.824,.035,.6,.025,S.gold);for(const r of[-1.8,1.7])L(s,r,1.12,.2,.42,.29,.045,S.screen),In(s,r+.55,1.02,.46,.72);Gt(s,-3.9,-.7,1.72),Gt(s,4,-.55,1.6),Kn(s,-5.75,.08,Math.PI/2,1.65,S.white),Mi(s,-5.02,1,.47),Gt(s,-6.4,1.4,.55),L(s,5.8,.045,1.18,2.2,.03,1.25,S.navy);for(const r of[4.65,6.95])L(s,r,1.13,.85,.08,2.28,.08,S.gold),L(s,r,1.17,.79,.65,2.18,.025,S.glass);L(s,5.8,2.18,1.24,2.6,.16,1.72,S.navy),L(s,5.8,2.08,2.03,2.55,.035,.04,S.gold);for(const r of[3.5,4.1])Ge(s,r,.67,1.8,.025,1.15,S.gold),Ge(s,r,.09,1.8,.08,.1,S.black);L(s,3.8,1.27,1.8,.65,.035,.04,S.gold),L(s,3.8,.18,1.8,.78,.08,.51,S.gold),L(s,3.76,.43,1.8,.37,.45,.25,S.rust);for(const r of[-2.8,0,2.8])Dr(s,r,.1,2.02)}else if(n==="breakfast"){ds(s,4.3,7.2),Va(s,0,4.5),L(s,0,.52,-.15,5,.9,.8,S.walnut),L(s,0,1.01,-.15,5.2,.12,.97,S.stone);for(const r of t>0?[-1.7,-.7,.3]:[])L(s,r,1.14,-.17,.66,.14,.45,S.gold),L(s,r,1.24,-.17,.6,.08,.38,S.white);L(s,1.5,1.29,-.24,.43,.53,.38,S.black),Ge(s,2.1,1.28,-.2,.15,.4,S.glass),Ge(s,2.1,1.13,-.2,.145,.09,S.rust);for(const r of[-5.55,-3.4,3.8,6])lv(s,r,.68);for(const r of[-5.55,-3.4,0,3.8,6])Dr(s,r,.5);Gt(s,-6.9,-.87,1.1),Gt(s,6.8,-.8,1.1)}else if(n==="club"){ds(s,-7.2,-3.8),ds(s,3.8,7.2),Va(s,0,5.4),L(s,0,.58,-.24,5.55,1.02,.58,S.walnut),L(s,0,1.12,-.24,5.8,.11,.79,S.stone),L(s,0,.25,.071,5.5,.05,.035,S.glow);for(const r of[-1.8,-.6,.6,1.8])Ge(s,r,.6,.6,.24,.12,S.teal),Ge(s,r,.28,.6,.035,.58,S.gold),t>0&&Vs(s,r,1.24,-.15),Dr(s,r,-.24);Kn(s,-5.6,-.54,0,2.05,S.teal),Mi(s,-5.6,.57,.5),Bi(s,-4.38,.75,-Math.PI/3,S.rust),Kn(s,5.25,-.54,0,2.1,S.rust),Mi(s,5.25,.6,.52),Bi(s,6.52,.7,-Math.PI/3,S.teal),Gt(s,-6.9,.68,1.2),Gt(s,6.9,-.8,1.25),In(s,-4.15,.05,-.8,1.6)}else if(n==="gym"){ds(s,-7.2,7.2),L(s,0,.093,0,14.4,.025,2.9,S.carpet);for(const r of[-5.65,-3.8,-1.95]){L(s,r,.16,.15,.92,.21,1.72,S.black),L(s,r,.28,.17,.68,.015,1.42,S.carpet);for(const a of[-1,1])L(s,r+a*.42,.7,-.51,.075,1.1,.08,S.black),L(s,r+a*.42,1.13,-.2,.06,.06,.75,S.black);L(s,r,1.26,-.5,.85,.23,.14,S.black),L(s,r,1.3,-.409,.43,.12,.012,S.screen)}for(const r of[.1,1.65]){const a=Ge(s,r,.41,.1,.36,.12,S.black);a.rotation.z=Math.PI/2,L(s,r,.39,.2,.07,.69,.09,S.gold),L(s,r,.81,.47,.37,.09,.24,S.black),L(s,r,1.05,-.32,.07,.55,.07,S.black),L(s,r,1.27,-.32,.5,.06,.07,S.gold)}L(s,5.45,.68,-.8,2.8,.07,.58,S.black);for(let r=4.2;r<6.8;r+=.46)Ge(s,r,.82,-.8,.13,.16,S.black);for(const r of[3.65,5.2])L(s,r,.12,.61,1.08,.025,1.68,S.teal);Gt(s,6.93,.82,1.2),L(s,2.76,.4,-.87,.6,.7,.53,S.walnut);for(let r=0;r<3;r++)L(s,2.76,.79+r*.065,-.87,.46,.065,.4,S.white)}else if(n==="spa"){ds(s,-7.2,7.2);for(const r of[-4.8,0,4.8]){L(s,r,.4,0,1.7,.6,2.05,S.walnut),L(s,r,.76,0,1.8,.14,2.1,S.white),L(s,r,.87,-.6,1.15,.12,.45,S.white),L(s,r,.86,.4,1.8,.03,.7,S.teal),Gt(s,r+1.2,-.9,1.1),In(s,r-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)L(s,r+1.2,.15+a*.06,.75,.5,.06,.32,S.white)}}else{L(s,0,.03,0,15,.14,3.6,S.wood);for(let r=-7.3;r<7.4;r+=.24)L(s,r,.11,0,.017,.006,3.45,S.walnut);for(const r of[-6.65,-2.45,2.8,6.9])Gt(s,r,-.8,1.45);for(const r of[-4.4,3.5]){Mi(s,r,.45,.66),Bi(s,r-.9,.4,Math.PI/2,S.white),Bi(s,r+.9,.4,-Math.PI/2,S.white),Vs(s,r+.2,.88,.45),Ge(s,r,1.07,.45,.026,2.05,S.gold);const a=new Pt(new ea(1.55,.32,8),S.white);a.position.set(r,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,s.add(a)}Kn(s,-.5,-.7,0,1.7,S.teal),Mi(s,-.5,.45,.38);for(const r of[-7.35,7.35])L(s,r,.43,0,.055,.8,3.5,S.gold);for(let r=-7.3;r<=7.3;r+=1.46)Ge(s,r,.43,1.7,.018,.8,S.gold);L(s,0,.8,1.7,14.7,.035,.035,S.gold),L(s,0,.46,1.7,14.7,.65,.014,S.glass)}if(e>=2){if(n==="lobby"&&(Kn(s,-5.6,.8,0,1.8,S.teal),Mi(s,-4.25,.8,.35)),n==="breakfast"&&(L(s,2.8,1.1,-.6,.65,.5,.45,S.screen),Vs(s,2.8,1.44,-.6)),n==="club"&&(Va(s,5.8,1.2),In(s,3.3,.05,-.8,1.8)),n==="gym")for(const r of[3.7,4.6,5.5])L(s,r,.15,.5,.6,.09,1.8,S.rust);if(n==="spa")for(const r of[-2.5,2.5])L(s,r,1.15,-.7,.06,2.1,1.3,S.wood);n==="rooftop"&&Kn(s,0,.55,0,2.2,S.rust)}if(e>=3){if(n==="lobby"&&(zi(s,0,1.6,-1.17,3.5,.65,3),L(s,0,.94,.5,6.45,.12,.83,S.gold)),n==="breakfast"&&(L(s,0,.55,.05,5.4,1,.8,S.stone),t>0))for(const r of[-1.8,0,1.8])Ge(s,r,1.12,.05,.25,.12,S.gold);if(n==="club"&&(Kn(s,-5.5,.4,0,2.8,S.white),zi(s,0,1.85,-1.05,2.7,.45,2)),n==="gym"){L(s,4.9,1.15,-1.23,4,1.85,.05,S.glass);for(const r of[3.1,6.5])L(s,r,1,0,.08,1.8,.08,S.gold);L(s,4.8,1.85,0,3.6,.08,.08,S.gold)}if(n==="spa")for(const r of[-4.8,0,4.8])L(s,r,.88,.4,1.8,.04,.8,S.white),In(s,r+1.05,.75,.8,.8);if(n==="rooftop"){for(const r of[-6.8,6.8])L(s,r,1.3,-.9,.12,2.6,.12,S.walnut);for(let r=-6.8;r<=6.8;r+=.7)L(s,r,2.5,-.3,.12,.1,2.2,S.walnut)}}if(e>=4){L(s,0,.12,-.15,14,.03,2.9,S.stone);for(const r of[-6.6,6.6])zi(s,r,1.55,-1.15,.7,1.1,4),In(s,r,.05,.85,1.7);if(n==="spa"&&(L(s,0,.4,.4,2.5,.55,1.5,S.white),L(s,0,.7,.4,2.1,.03,1.1,S.window)),n==="breakfast"||n==="club")for(const r of[-2,2])L(s,r,1.55,-.6,.025,.85,.025,S.gold),Ge(s,r,1.95,-.6,.25,.06,S.gold);n==="gym"&&(L(s,0,.3,.3,1.4,.25,1.8,S.black),L(s,0,1.25,-.4,1.2,.6,.12,S.screen))}if(e>=5){if(n!=="rooftop"){for(const r of[-5,-2.5,0,2.5,5])Dr(s,r,.5,2.05),L(s,r,2.27,0,2.2,.045,2.6,S.walnut);L(s,0,2.23,1.2,14,.04,.04,S.glow)}else{L(s,0,.35,-.5,3.6,.5,1.1,S.stone),L(s,0,.62,-.5,3.3,.04,.9,S.window);for(const r of[-6,-3,3,6])In(s,r,.05,.8,1.3)}for(let r=-6.5;r<7;r+=1.3)L(s,r,.15,1.55,.5,.02,.2,S.gold)}return s}function uv(n,e,t){const i=new Bt,r=iv(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new Bt;return u.position.set(c,.31,0),i.add(u),L(u,0,-.11,0,.085,.26,.1,S.navy),L(u,0,-.245,.035,.11,.07,.17,S.black),u},o=a(-.08),l=a(.08);L(i,0,.47,0,.27,.34,.17,r),L(i,0,.58,.093,.07,.13,.012,S.white),["chill","family","points","forum","creator"].includes(e??"")||L(i,0,.55,.108,.018,.095,.016,S.navy),Pn(i,0,.81,0,.185,.21,.16,S.skin),Pn(i,0,.94,-.024,.193,.102,.163,S.hair);for(const c of[-.069,.069])Pn(i,c,.84,.149,.021,.024,.01,S.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&L(i,c,.856,.156,.09,.066,.012,S.navy);for(const c of[-1,1]){const u=L(i,c*.18,.45,0,.075,.26,.085,r);u.rotation.z=c*.15,Pn(i,c*.19,.303,.012,.047,.05,.045,S.skin)}if(e==="chill"&&(Ge(i,0,1,0,.23,.06,S.white),Ge(i,0,1.06,0,.16,.1,S.white)),e==="road"&&(L(i,.29,.25,.04,.22,.3,.15,S.walnut),L(i,.29,.44,.04,.12,.035,.05,S.gold)),e==="family"&&(L(i,0,.46,-.17,.3,.34,.17,S.rust),L(i,.27,.38,.05,.07,.2,.07,S.teal)),e==="points"&&(L(i,-.26,.4,.09,.15,.23,.025,S.white),L(i,-.26,.44,.11,.11,.04,.01,S.teal)),e==="hunter"&&(L(i,.24,.48,.12,.1,.18,.025,S.black),L(i,.24,.49,.138,.07,.12,.01,S.screen)),e==="forum"&&(Pn(i,0,1.01,-.01,.21,.07,.18,S.navy),L(i,0,.99,.17,.2,.025,.16,S.navy),L(i,-.25,.42,.08,.15,.23,.04,S.black)),e==="creator"){L(i,0,.5,.16,.2,.13,.12,S.black);const c=Ge(i,0,.5,.26,.065,.1,S.black);c.rotation.x=Math.PI/2,L(i,0,.63,.13,.025,.18,.02,S.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Pn(i,c+.23,.49,.08,.065,.08,.065,S.rust),L(i,c+.23,.35,.08,.015,.21,.015,S.green);if(e==="planner"&&(L(i,-.24,.47,.08,.19,.27,.04,S.teal),L(i,0,.54,.12,.08,.11,.015,S.white)),e==="whale"&&(L(i,0,.59,.12,.04,.09,.025,S.gold),L(i,.2,.36,.055,.08,.04,.09,S.gold),Pn(i,0,.96,-.04,.2,.075,.18,S.hair)),e==="auditplus"&&(L(i,-.24,.47,.09,.19,.26,.04,S.walnut),L(i,-.24,.49,.12,.14,.19,.012,S.white),L(i,.23,.45,.09,.012,.17,.012,S.gold)),t==="house"){L(i,.43,.36,.2,.4,.55,.4,S.navy),L(i,.43,.68,.2,.45,.05,.45,S.gold);for(let c=0;c<3;c++)L(i,.43,.75+c*.065,.2,.32,.06,.3,S.white);for(const c of[.28,.58])Pn(i,c,.08,.2,.07,.07,.07,S.black)}if(t==="engineering"&&(L(i,.3,.35,.05,.24,.2,.16,S.rust),L(i,.3,.5,.05,.13,.035,.04,S.gold),Ge(i,0,1,0,.21,.07,S.gold)),t==="fnb"){L(i,.4,.35,.2,.4,.08,.5,S.gold),L(i,.4,.62,.2,.4,.08,.5,S.gold);for(const c of[.28,.5])Ge(i,c,.73,.2,.09,.15,S.white);Ge(i,0,1,0,.17,.15,S.white)}return sa(i,0,0,.47,.3),{group:i,left:o,right:l}}function dv(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],d=n.group.position.clone();n.group.position.lerpVectors(u,f,l-c);const p=n.group.position.x-d.x,g=n.group.position.z-d.z,x=Math.hypot(p,g)>1e-4;x&&(n.group.rotation.y=Math.atan2(p,g));const h=x?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=h,n.right.rotation.x=-h;return}const i=n.end-n.start,s=(Math.sin(e*.28+n.phase)+1)/2,r=n.walking?n.start+s*i:n.start;n.group.position.set(r,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function $c(n){const e=[],t=new Map;return n.floors.forEach((i,s)=>{const r=s*gs;t.set(i.id,r),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?Sd[o]:0;e.push({id:a,floorId:i.id,position:new G(c,r,0),label:new G(l?c-1.97:-6.92,r+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*gs+3.6}}function fv(n,e,t){const i=new Pt(new Rs(e,t),new nr({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function hv(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class pv{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=$c(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new nv({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=uu,this.renderer.outputColorSpace=Kt,this.renderer.toneMapping=ol,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new Ff;root=new Bt;camera=new ta;light=new ih(16768942,3.1);ambient=new eh(12638184,10651490,2.15);raycaster=new ah;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Bt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let r=0;r<18;r++){const a=-19+r*2.3,o=3+(Math.sin(r*7)+1)*3.3,l=-6-r%3*2.4;L(this.root,a,o/2-1,l,1.5,o,1.7,S.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(r+Math.round(c*10)+Math.round(u*10))%3!==0&&L(this.root,a+u,c,l+.87,.14,.24,.015,r%3===0?S.shade:S.window)}L(this.root,0,-.32,0,30,.35,15,S.navy),L(this.root,0,-.13,.7,17.6,.16,5.3,S.stone),L(this.root,0,-.06,2.95,17,.09,.55,S.stone);for(const r of[-8.1,8.4])Gt(this.root,r,1,2);e.floors.forEach(r=>{const a=this.layout.floorY.get(r.id),o=new Bt;if(o.name=r.id,o.position.y=a,this.root.add(o),r.role!=="rooftop"){L(o,0,-.085,0,15.05,.19,3.48,S.stone),L(o,0,-.12,1.77,15.2,.17,.19,S.navy),L(o,0,-.011,1.85,15.1,.025,.02,S.gold),L(o,0,2.405,-.02,15.05,.18,3.4,S.stone);for(const c of[-7.43,7.43])L(o,c,1.19,.18,.18,2.38,3.12,S.stone);L(o,7.94,1.19,-.24,.87,2.38,2.1,S.window);for(const c of[7.52,8.35])L(o,c,1.2,.84,.045,2.4,.06,S.gold);L(o,7.94,-.075,.1,.95,.19,2.85,S.navy),L(o,7.94,1.2,.87,.83,.025,.035,S.gold)}r.entityIds.forEach(c=>{const u=e.entities[c],f=this.layout.entities.find(g=>g.id===c),d=u.kind==="room"?av(r.construction?{...u,construction:r.construction}:u):cv(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let g=1;g<(u.level??1);g++)Gt(d,-6.8+g*.45,-.95,.5+g*.1);d.name=c,d.userData.entityId=c,d.position.x=f.position.x,o.add(d);const p=fv(c,u.kind==="room"?4.65:14.6,r.role==="rooftop"?2.1:2.3);if(d.add(p),this.colliders.push(p),u.kind==="room"){const g=document.createElement("button");g.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),g.textContent=r.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,g.dataset.entityId=c,g.setAttribute("aria-label",u.number+" 房间"),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}else{const g=document.createElement("button");g.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),g.dataset.entityId=c,g.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),g.setAttribute("aria-label","查看"+u.name),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${r.label}</strong><span>${r.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:r.id})}),rv(this.root),this.faultLights=[],this.root.traverse(r=>{r.name==="fault-lamp"&&this.faultLights.push(r)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const s=new nr({color:16766861,transparent:!0,opacity:.9,depthTest:!1});L(this.halo,0,0,0,4.7,.025,.025,s),L(this.halo,0,2.31,0,4.7,.025,.025,s),L(this.halo,-2.35,1.15,0,.025,2.31,.025,s),L(this.halo,2.35,1.15,0,.025,2.31,.025,s),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},s=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new Ve((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=hv(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",s),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",s)});const r=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",r),this.cleanups.push(()=>document.removeEventListener("visibilitychange",r));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,r=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,r+6.4,46),this.camera.lookAt(-.3,r,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const s=this.layout.entities.find(r=>r.id===i.dataset.entityId);this.position(i,s.label)}),this.floorLabels.forEach(({el:i,id:s})=>this.position(i,new G(-8.57,this.layout.floorY.get(s)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new G(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new G(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof Iu&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Bt,this.scene.add(this.root);const r=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/gs+1e-5),c=r[l],u=e.floors.findIndex(f=>f.id===c);u>=0&&(o.y+=(u-l)*gs)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=$c(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const r=this.labels.find(a=>a.dataset.entityId===i.entityId);if(r){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);r.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",r.classList.add("upgraded"),setTimeout(()=>r.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(r=>{const a=r.dataset.entityId===e.selectedId;r.classList.toggle("selected",a),r.setAttribute("aria-pressed",String(a))});const s=this.layout.entities.find(r=>r.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!s,s){const r=e.entities[s.id];this.halo.scale.x=r.kind==="room"?1:3.1,this.halo.position.set(s.position.x,s.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(r=>r.guestId===t.id);if(!i){i={...uv(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const r=t.movement;if(!i.navigation){const a=r.trail[0]??r.position;i.group.position.set(a.x,a.level*gs+.07,a.z)}if(i.navigation?.revision!==r.revision){const a=(r.trail.length?r.trail:[r.position]).map(o=>new G(o.x,o.level*gs+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:r.revision,points:a,elapsed:0,duration:1}}}const s=this.bubbles.find(r=>r.actor===i);s&&(s.el.textContent=t.thought,s.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const s=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,s),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(s=>dv(s,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const s=this.store.getState(),r=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=s.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});r!==this.speechSlot&&(this.speechSlot=r,this.speaker=a.length?a[r%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new G(-.6,1.25,0)));o.hidden=!1;const f=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),d=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${f}px,${d+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(s=>{s.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(ir).forEach(e=>e.dispose()),sv(),this.overlay.remove()}}const yl="jinwanyoutao_v8_game_1";function mv(){try{const n=localStorage.getItem(yl);if(!n)return qa();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return Ts(e),li(e),e.game.operations.day!==e.game.day&&el(e,!e.game.reportOpen),e.guests.forEach(t=>Jr(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=qa();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function qu(n){try{return localStorage.setItem(yl,JSON.stringify(n)),!0}catch{return!1}}const oi=yd(mv()),Bs=Bd(document.querySelector("#app"),oi);td(document.querySelector("#app"),oi);let Zo=!1,Jo=oi.getState().game.notice.startsWith("存档读取失败");const Sl=()=>{!Zo&&!Jo&&!qu(oi.getState())&&(Jo=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&oi.advance(4*oi.getState().speed)},1e3);setInterval(Sl,5e3);document.addEventListener("visibilitychange",Sl);window.addEventListener("pagehide",Sl);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){Zo=!0;try{localStorage.removeItem(yl),oi.reset(),Jo=!1,qu(oi.getState()),location.reload()}catch{alert("无法重置存档。")}finally{Zo=!1}}});function ra(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}ra();window.visualViewport?.addEventListener("resize",ra);window.visualViewport?.addEventListener("scroll",ra);window.addEventListener("resize",ra);try{const n=new pv(Bs.stage,oi);Bs.setFocusHandler(e=>n.focusFloor(e)),Bs.stage.addEventListener("world-error",e=>Bs.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Bs.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
