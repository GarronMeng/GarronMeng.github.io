(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Xu(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,r=!1,s=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(h,p=.13,x=0)=>{if(!i||!r)return;const m=i.createOscillator(),g=i.createGain(),A=i.currentTime+x;m.frequency.value=h,g.gain.setValueAtTime(.016,A),g.gain.exponentialRampToValueAtTime(1e-4,A+p),m.connect(g),g.connect(i.destination),m.start(A),m.stop(A+p),m.onended=()=>{m.disconnect(),g.disconnect()}};t.onclick=async()=>{if(r=!r,r){if(i??=new AudioContext,await i.resume(),!l){const h=i.createBuffer(1,i.sampleRate*2,i.sampleRate),p=h.getChannelData(0);for(let m=0;m<p.length;m++)p[m]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=h,l.loop=!0,c=i.createGain(),c.gain.value=.01;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=700,l.connect(x),x.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(r)),t.title=r?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const f=e.subscribe(h=>{const p=Date.now();i&&c&&c.gain.setTargetAtTime(h.game?.weather==="rain"?.12:.015,i.currentTime,.5),r&&!document.hidden&&p-s>1800&&((h.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),s=p):h.metrics.cash>o&&(u(1046,.1),s=p)),a=h.game?.arrivals??0,o=h.metrics.cash}),d=()=>{document.hidden?i?.suspend():r&&i?.resume()};document.addEventListener("visibilitychange",d),window.addEventListener("pagehide",()=>{f(),i?.close()},{once:!0})}function Uc(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,f)=>{const d="floor-"+l,h="facility-"+l;e.push({id:d,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[h]}),t[h]={id:h,kind:"facility",floorId:d,role:l,name:c,capacity:u,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),f="room-"+u,d=r[((o-2)*3+c)%r.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:d,nightsLeft:d==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,f,d,h],p)=>s.push({id:"public-"+p,name:h?"当班员工":"住客",tier:h?"Staff":"Member",floorId:"floor-"+o,thought:d,color:f,route:[l,c],z:u,staff:!!h}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const di={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},fi=n=>n.category??(n.type==="suite"?"suite":"standard"),Nc=n=>n.bed??(n.type==="twin"?"twin":"king"),Fc=n=>["suite","premium"].includes(fi(n)),$t=n=>fi(n)==="suite",Na=n=>di[fi(n)].name+" · "+(Nc(n)==="twin"?"双床":"大床"),Oc=n=>Object.values(n.entities).filter(e=>e.kind==="room"),it=n=>Oc(n).filter(e=>e.status!=="unbuilt"),kc=n=>it(n).filter(e=>$t(e)&&e.status==="available").length,Bc=n=>it(n).filter(e=>e.status==="occupied").length,Ml=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId),Kr=2.12,Zr=7.94,qt=n=>n.game.day*1440+n.game.minute;function fr(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:qt(n)+20+Di(e.id)%75,trail:[],revision:0}}function Di(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function an(n,e,t){fr(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(d=>d.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Di(e.id+t)%12*.95,c=s?2.8:1.25,u=[],f=(d,h,p,x)=>u.push({x:d,z:h,level:p,phase:x});return f(o.x,Kr,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(Zr,Kr,o.level,"corridor"),f(Zr,.9,o.level,"elevator"),f(Zr,.9,a,"elevator"),f(Zr,Kr,a,"corridor")),f(l,Kr,a,"corridor"),f(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=qt(n)+60,e.visitUntil=void 0,!0}function $u(n,e,t){fr(n,e);const i=e.movement;if(!i.steps.length)return an(n,e,t);const r=i.steps,s=i.position;i.position={...r[r.length-1]},i.steps=[];const a=an(n,e,t);return i.steps=[...r,...i.steps],i.position=s,a}function zc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;r.x+=s*u,r.z+=a*u,r.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=qt(n)+45+Di(e.id+qt(n))%65,!0)}function qu(n){for(const e of n.guests)fr(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Gc(n){n.movement&&n.movement.trail.push({...n.movement.position})}function bl(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const Go=n=>n.lateHour??(n.tier==="Globalist"?16:14),Ci=n=>Go(n)===16?"4PM":"2PM",Gr=n=>Go(n)===16?14:12,Hc=n=>n.late==="honor"?Go(n)*60:n.late==="deny"||n.late==="pending"?Gr(n)*60:660;function Vc(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const Ho={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Wc=n=>n.name+":"+n.persona;function pn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=qt(n)+35,e.speech.next=0,nr(n,e)}function nr(n,e){if(e.staff)return;const t=qt(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(p=>p.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[r?.position.phase,a,s,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(p=>p.kind==="room"&&$t(p)&&p.status==="available").length;let f=[];if(o==="birthday"&&e.occasion?.resolved)f=[e.occasion.outcome??"生日安排已确认。"];else if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[Ci(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+Gr(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)f=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)f=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)f=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[Ho[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const p=e.experience,x=p?.place==="facility-"+s&&t-p.at<150;x&&p.kind==="shortage"?f=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:x&&p.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Ci(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const p=n.game.operations?.profiles[e.profileId??""];s==="guest"&&p&&p.visits>0&&f.push(p.trust>=2?"这家以后可以常住，下次带朋友来。":p.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const x=n.game.guestMemory?.[Wc(e)];s==="guest"&&x?.visits&&f.push(x.satisfaction<80?"上次住得不太顺，这次再看看。":x.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const d=n.game.dialogueRecent??={};for(const[p,x]of Object.entries(d))t-x>240&&delete d[p];const h=f.filter(p=>!i.recent.some(x=>x.text===p&&t-x.at<180)&&t-(d[p]??-9999)>25);if(h.length){const p=h[Di(e.id+t)%h.length];e.thought=p,i.recent.push({text:p,at:t}),i.recent=i.recent.slice(-8),d[p]=t}else e.thought="";i.next=t+45}function Nr(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(r=>!r.staff&&!r.departing&&r.floorId===t.floorId&&!r.movement?.steps.length)??n.guests.find(r=>r.staff&&(r.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function hr(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function vn(n,e,t=1){const i=hr(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)if(r.id===e){if(r.progress=Math.min(r.goal,r.progress+t),r.claimed)continue;const s=Math.min(4,r.goal),a=Math.floor(r.progress/r.goal*s),o=Math.floor(r.reward*.7*a/s),l=Math.max(0,o-(r.paid??0));l&&(r.paid=(r.paid??0)+l,n.metrics.cash+=l,n.game.revenue+=l,n.game.rewardBeat={id:n.game.nextId++,text:r.title+" "+r.progress+"/"+r.goal,amount:l},n.game.logs.push({id:n.game.nextId++,day:n.game.day,minute:n.game.minute,category:"收益",text:"阶段反馈："+r.title+"，到账 ¥"+l+"；计入原任务奖金。"}))}}const Yu=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function Ku(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=Yu[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function Fr(n){const e=it(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function Xc(n){const e=n.game.development,t=it(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const Lr={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function tr(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function Jr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Zu(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=hr(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;if(r.construction)return t.notice="该公区正在施工。",!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;Jr(n,3500*s)&&(r.construction={remaining:120,total:120,targetLevel:s+1},Nr(n,r.id),vn(n,"upgrade"),tr(n,r.name+"开始封闭改造：2 小时后升级至 "+(s+1)+" 级。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;Jr(n,4500*s)&&(t.managers[r]++,tr(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;Jr(n,2200)&&(i.campaignUntil=t.day+2,tr(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=Lr[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;Jr(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},tr(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=Xc(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,tr(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function Ju(n){const e=n.game,t=hr(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=Lr[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(d=>d.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),f=Math.round(u*r.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,vn(n,"revenue",f),vn(n,"ancillary",f),vn(n,"activity");for(const d of a.slice(0,u))d.satisfaction=Math.min(100,(d.satisfaction??90)+5),d.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,tr(n,r.name+"结束："+u+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-r.cost)+"。")}const $c={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function Yn(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function on(n,e,t="部门",i){const r=n.game;r.notice=e,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:t,text:e,target:i})}function Fa(n,e){const t=Yn(n),i="profile-"+n.game.nextId++,r=Di(i),s=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][r%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(r/8)%8],persona:s[r%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function qc(n,e=n.game.price){const t=n.game,i=t.operations,r=(t.day-1)%7>=5,s=t.positioning==="business"?r?.75:1.3:t.positioning==="resort"?r?1.4:.9:1.1;return Math.max(1,Math.round((3+it(n).length*.12)*s*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Or(n){const e=n.game,t=e.operations,i=t.bookings.filter(d=>d.status!=="lost"),r=i.filter(d=>d.status==="confirmed"),s=n.guests.filter(d=>d.roomId&&!d.departing),a=s.filter(d=>(d.checkoutDay??e.day)>e.day).length,o=s.length-a,l=qc(n),c=it(n).filter(d=>!d.construction).length,u=Math.min(c,a+r.length+Math.max(0,l-t.walkinArrivals)),f=d=>d.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:s.reduce((d,h)=>d+f(h),0),housekeeping:o+it(n).filter(d=>d.status==="dirty"||d.status==="cleaning").length,suites:r.filter(d=>t.profiles[d.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(d=>d.segment==="商务").length,resort:i.filter(d=>d.segment==="度假").length,group:i.filter(d=>d.segment==="团队").length,price:e.price}}function Vo(n,e=!0){const t=n.game,i=Yn(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let r=(t.seed^Math.imul(t.day,2654435761))>>>0;const s=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),a=s();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=it(n).filter(h=>!h.construction).length,l=o-n.guests.filter(h=>h.roomId&&(h.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(h=>h.visits>0&&!n.guests.some(p=>p.profileId===h.id)),f=new Set;for(let h=0;h<c;h++){let p=u.find(A=>!f.has(A.id)&&s()<.5);p||(p=Fa(n,s())),f.add(p.id);const x=i.event==="expo"&&h<Math.ceil(c*.35)?"团单":s()<.6?"APP":"平台",m=t.positioning==="resort"||(t.day-1)%7>=5&&s()<.6,g={id:"booking-"+t.nextId++,profileId:p.id,source:x,eta:x==="团单"?840:780+Math.floor(s()*330),nights:Vc(m,s(),s()),rate:Math.round(t.price*(x==="团单"?.88:1)),segment:x==="团单"?"团队":m?"度假":"商务",status:"confirmed"};if(h===0&&t.day%2===1&&(g.occasion="birthday"),h<2&&(g.challenge=p.persona==="auditplus"?"audit":p.persona==="family"?"family":p.tier==="Globalist"?"sua":"quiet"),g.challenge==="sua"){const A=it(n).find(C=>$t(C)&&C.status==="available"&&!C.suaBookingId);A?(g.sua=!0,g.roomId=A.id,A.suaBookingId=g.id,A.status="reserved"):g.challenge="quiet"}i.bookings.push(g)}const d=u.find(h=>h.trust>=2&&h.visits>=2);if(d&&l>i.bookings.length){const h=Fa(n,s());h.referredBy=d.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:h.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Or(n),e&&(t.paused=!0),on(n,`早班准备：${i.bookings.length} 笔确认预订，${$c[i.event]}。`)}function Qu(n,e){const t=Yn(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function ju(n,e,t){const i=Yn(n);let r=t?i.profiles[t.profileId]:void 0;r||(r=Fa(n,Di(e.id)%100/100)),e.profileId=r.id,e.name=r.name,e.persona=r.persona,e.tier=r.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,(t?.occasion==="birthday"||!t&&i.walkinArrivals===1&&n.game.day%2===1)&&(e.occasion={kind:"birthday",resolved:!1}),e.satisfaction=Math.max(65,Math.min(98,88+r.trust*2))}function Wo(n,e){const t=Yn(n),i=t.bookings.find(r=>r.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),on(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const r=n.entities[i.roomId];r?.kind==="room"&&r.suaBookingId===i.id&&(r.suaBookingId=void 0,r.status==="reserved"&&(r.status="available"))}}function ed(n,e){const t=Yn(n),i=t.profiles[e.profileId??""];if(!i)return;const r=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(r?1:-1))),i.spend+=e.spend??0;const s=r?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:s}),i.history=i.history.slice(-8),r?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),on(n,i.name+"："+s,"入住")}function td(n,e){const t=n.game,i=Yn(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Or(n),i.briefOpen=!1,t.paused=!1,on(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",on(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const r=n.guests.find(c=>c.id===e.id),s=r?.challenge;if(!r||!s||s.resolved)return!0;if(!r.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=s.kind==="quiet"&&e.value==="quiet"||s.kind==="family"&&e.value==="family"||s.kind==="audit"&&e.value==="inspect"||s.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,s.resolved=!0;let l=a&&(s.kind!=="sua"||!!r.upgrades);if(a&&s.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[r.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&s.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!it(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&s.kind==="quiet"){const c=n.entities[r.roomId??""];if(c&&n.floors.some(f=>f.construction&&Math.abs(f.number-(n.floors.find(d=>d.id===c.floorId)?.number??0))<=1)){const f=it(n).find(d=>d.status==="available"&&!d.construction&&!n.floors.some(h=>h.construction&&Math.abs(h.number-(n.floors.find(p=>p.id===d.floorId)?.number??0))<=1));l=!!f,f&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,f.status="occupied",f.guestId=r.id,f.nightsLeft=Math.max(0,(r.checkoutDay??t.day)-t.day),r.roomId=f.id,r.movement?.steps.length||an(n,r,f.id))}}return r.serviceDone=l,r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(l?8:-8))),s.outcome=l?"需求已兑现":"未解决核心诉求",vn(n,"resolve"),pn(n,r,l?"recovery":"denied"),on(n,r.name+"："+s.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",r.roomId??"facility-lobby"),!0}return!1}function Yc(n,e){const t=n.game,i=it(n).filter(l=>$t(l)&&l.status==="available"&&!l.construction&&!l.suaBookingId),r=t.operations?.bookings.filter(l=>l.status==="confirmed"&&!l.sua&&t.operations?.profiles[l.profileId]?.tier==="Globalist").length??0,s=Math.max(r,t.operations?.suitePolicy==="hold"?1:0),a=n.entities[e.roomId??""];return{suite:a?.kind==="room"&&$t(a)?void 0:i.length>s?i[0]:void 0,free:i.length,reserve:s,breakfast:t.stock>=2,alreadySuite:a?.kind==="room"&&$t(a)}}function nd(n,e){if(e.type!=="birthday-choice")return!1;const t=n.game,i=n.guests.find(u=>u.id===e.id&&!u.departing),r=i?.occasion;if(!i?.roomId||!r||r.resolved)return t.notice="先办理入住；已处理的生日安排无需重复选择。",!0;if(!["breakfast","suite","card","decline"].includes(String(e.value)))return!0;const s=Yc(n,i),a=e.value==="breakfast"?160:e.value==="suite"?280:0;if(e.value==="breakfast"&&!s.breakfast)return t.notice="早餐库存不足两份；先补货，或选择生日祝福。",!0;if(e.value==="suite"&&!s.suite)return t.notice="没有可赠送的标准套房；确认预订与预留优先，仍可选择其他礼遇。",!0;if(n.metrics.cash<a)return t.notice="礼遇预算不足；可以先送一张手写生日卡。",!0;if(n.metrics.cash-=a,t.expense+=a,e.value==="breakfast"&&(t.stock-=2,i.birthdayBreakfast=2,n.metrics.owner=Math.max(0,n.metrics.owner-1)),e.value==="suite"){const u=n.entities[i.roomId];u.kind==="room"&&(u.status="dirty",u.guestId=void 0,u.nightsLeft=0);const f=s.suite;f.status="occupied",f.guestId=i.id,f.nightsLeft=Math.max(0,(i.checkoutDay??t.day+1)-t.day),i.roomId=f.id,i.upgrades=!0,i.denied=!1,t.upgrades++,n.metrics.owner=Math.max(0,n.metrics.owner-2),$u(n,i,f.id)}const o=e.value==="breakfast"?8:e.value==="suite"?12:e.value==="card"?2:-3;i.satisfaction=Math.max(0,Math.min(100,(i.satisfaction??88)+o)),r.resolved=!0,r.choice=String(e.value);const l=e.value==="breakfast"?"生日早餐已确认，两个人一起吃很开心。":e.value==="suite"?"生日这晚真的住进 Standard Suite，房费也没变。":e.value==="card"?"收到手写生日卡，Front Office 记得这一天。":"今天按原预订入住，生日没有特别安排。";r.outcome=l,pn(n,i,"birthday"),vn(n,"resolve");const c=t.operations?.profiles[i.profileId??""];return c&&(c.history.push({day:t.day,text:l}),c.history=c.history.slice(-8)),on(n,i.name+"："+l+" 支出 ¥"+a+"。","部门",i.roomId),!0}function id(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=it(n),i=n.guests.filter(h=>!h.staff&&h.roomId&&!h.departing),r=i.length,s=t.filter(h=>h.status==="dirty"||h.status==="cleaning").length,a=e.events.length+n.guests.filter(h=>!h.departing&&(h.late==="pending"||h.challenge&&!h.challenge.resolved)).length,o=i.reduce((h,p)=>h+(p.rate??e.price),0),l=i.filter(h=>h.source==="平台").reduce((h,p)=>h+Math.round((p.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((h,p)=>h+p*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),s&&u.push({title:"夜班先把房间交出来",text:`还有 ${s} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const f=Math.round(r/Math.max(1,t.length)*100),d=e.operations?.forecast?.occupancy;d!==void 0&&f<d-15&&u.push({title:"入住低于晨会预估",text:`当前 ${f}%，预估 ${d}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={day:e.day,minute:e.minute,open:!0,occupancy:f,expected:d,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:o,projectedNet:e.revenue+o-e.expense-l-c,pending:a,complaints:e.complaints,logs:e.logs.filter(h=>h.day===e.day&&h.category==="客诉").map(h=>({...h})),notes:u.slice(0,4)},e.paused=!0}const ci=[{title:"接住第一批客人",action:"办理 3 次入住",counter:"arrivals",goal:3,target:"front",exam:"试住客回访",threshold:62,department:"front"},{title:"让房间周转起来",action:"完成 3 次清洁或维修",counter:"service",goal:3,target:"hotel",exam:"早班运营巡检",threshold:66,department:"house"},{title:"兑现住客的承诺",action:"完成 2 次诉求处理",counter:"resolve",goal:2,target:"events",exam:"会员体验回访",threshold:70,department:"front"},{title:"让升级经得起体验",action:"完成 1 次装修或公区升级",counter:"upgrade-complete",goal:1,target:"development",exam:"新空间试营业",threshold:72,department:"engineering"},{title:"办一场让人记住的活动",action:"完成 1 场主题活动",counter:"activity",goal:1,target:"development-data",exam:"总部经营评审",threshold:74,department:"revenue"}],Sl=n=>n.game.day*1440+n.game.minute;function zs(n){return n.game.campaign??={chapter:0,baseline:{...n.game.development?.counts??{}},certificates:[],attempts:0}}function ai(n){const e=n.game.campaign,t=ci[e?.chapter??0];if(!t)return null;const r=t.counter==="upgrade-complete"&&Object.values(n.entities).filter(s=>s.kind==="facility"||s.kind==="room"&&s.status!=="unbuilt").every(s=>(s.level??1)>=5&&!s.construction)?t.goal:Math.min(t.goal,Math.max(0,(n.game.development?.counts[t.counter]??0)-(e?.baseline[t.counter]??0)));return{...t,progress:r,ready:r>=t.goal}}function Dr(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function rd(n,e){if(!["book-inspection","prepare-inspection","continue-chapter"].includes(e.type))return!1;const t=n.game,i=zs(n),r=ai(n);if(e.type==="book-inspection"){if(!r||!r.ready||i.inspection||i.result?.passed)return t.notice="先完成当前目标；预约中的检验无需重复预约。",!0;t.seed=Math.imul(t.seed,1664525)+1013904223>>>0,i.inspection={due:(t.day+1)*1440+1080,chapter:i.chapter,phase:"booked",roll:t.seed%13-6,prepared:!1},i.attempts++,i.result=void 0,Dr(n,r.exam+"已预约：明天 18:00 到店，先保障客房、库存和服务。")}if(e.type==="prepare-inspection"){const s=i.inspection;if(!s||s.phase!=="booked"||s.prepared)return t.notice="本次检验已准备，或正在进行。",!0;if(n.metrics.cash<300)return t.notice="准备需要 ¥300；也可以不额外投入。",!0;n.metrics.cash-=300,t.expense+=300,s.prepared=!0,Dr(n,"投入 ¥300 做现场彩排：检验表现 +6，仍需实际服务达标。")}if(e.type==="continue-chapter"){if(i.result?.chapter!==i.chapter||!i.result.passed)return t.notice="先完成本阶段检验。",!0;i.certificates.push(ci[i.chapter].exam),i.chapter++,i.baseline={...t.development?.counts??{}},i.inspection=void 0,i.result=void 0,i.attempts=0,Dr(n,ci[i.chapter]?"下一阶段："+ci[i.chapter].title+"。":"五段经营主线完成，酒店进入自由经营。")}return!0}function sd(n){const e=zs(n),t=e.inspection;if(!t||(t.phase==="booked"&&Sl(n)>=t.due&&(t.phase="visiting",Dr(n,ci[e.chapter].exam+"到店：先看房、再用餐、最后核对服务；30 分钟后回访。")),t.phase!=="visiting"||Sl(n)<t.due+30))return;const i=n.game,r=it(n).filter(p=>p.status!=="unbuilt"),s=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),a=r.filter(p=>!["dirty","cleaning","maintenance"].includes(p.status)&&!p.construction).length/Math.max(1,r.length),o=s.length?s.reduce((p,x)=>p+(x.satisfaction??90),0)/s.length:80,l=Math.max(0,100-i.events.length*12-s.filter(p=>p.challenge&&!p.challenge.resolved||p.late==="pending").length*8),c=Math.min(100,Math.min(i.stock,i.clubStock)*5),u=Math.round(a*25+o*.3+l*.25+c*.2),f=Math.max(0,Math.min(100,u+t.roll+(t.prepared?6:0))),d=f>=ci[e.chapter].threshold,h=[{value:a*100,text:"先清洁脏房、完成维修，减少封闭房。",target:"hotel"},{value:o,text:"处理客人的核心诉求，减少只送礼未兑现。",target:"events"},{value:l,text:"先解决积压事件和晚退请求。",target:"events"},{value:c,text:"先补足早餐和酒廊的库存。",target:"operations-data"}].sort((p,x)=>p.value-x.value)[0];e.result={chapter:e.chapter,passed:d,score:f,day:i.day,minute:i.minute,advice:d?"体验通过。确认后开启下一段经营目标。":h.text,target:h.target,scenes:[a>=.7?"Room Check：多数房间整洁可售。":"Room Check：发现翻房或维修积压。",c>=75?"F&B：餐台供应顺畅。":"F&B：餐台库存让体验打了折扣。",l>=80?"Front Office：承诺与服务顺利交接。":"Front Office：还有诉求未接住。"]},e.inspection=void 0,Dr(n,ci[e.chapter].exam+"："+(d?"通过":"需要改善")+"（"+f+" / "+ci[e.chapter].threshold+"）。"+e.result.advice)}const Es=(n,e,t=!1)=>Math.round(n*(fi(e)==="suite"&&t?1:di[fi(e)].factor)*(1+((e.level??1)-1)*.1)),ad=n=>2500*n,Oa=n=>n?Math.max(8,24-n*5):30,ka=n=>n?Math.max(10,35-n*7):40,yl=n=>Math.max(140,260-n*20),od=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),Kc={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function El(n,e,t,i="floor-lobby"){const r={id:e,name:Kc[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(r),fr(n,r),r}function Ei(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function ki(n,e,t,i,r){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:r},an(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",on(n,e.name+" 已接单。","部门",i),!0)}function ld(n,e,t){const i=n.game,r=Yn(n);for(const a of Object.keys(Kc)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||El(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const s=it(n).find(a=>a.timer&&!a.construction&&!Ei(n,a.id));if(s){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=El(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&ki(n,a,s.status==="maintenance"?"repair":"clean",s.id,s.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(fr(n,a),zc(n,a),Gc(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),vn(n,"service"),r.hkCompleted+=l.kind==="clean"?1:0,on(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(f=>!(f.kind==="supplies"&&f.target===l.target)),r.stockDelivered++,on(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(f=>!f.staff&&!f.roomId&&!f.departing);if(u){const f=r.bookings.find(x=>x.id===u.reservationId)?.roomId,d=it(n).filter(x=>(x.status==="available"||x.status==="reserved"&&(x.suaBookingId===u.reservationId||!x.suaBookingId&&u.tier==="Globalist"))&&!x.construction),h=d.filter(x=>x.type==="suite"&&x.category!=="premium"),p=f?d.find(x=>x.id===f):u.tier==="Globalist"?h[0]??d[0]:d.find(x=>!(r.suitePolicy==="hold"&&h.length<=1&&h.includes(x)));p&&e({type:"checkin",id:u.id,roomId:p.id})}}vn(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=qt(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=it(n).find(c=>c.status==="dirty"&&!c.construction&&!Ei(n,c.id));if(l&&ki(n,a,"clean",l.id,Oa(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=it(n).find(c=>c.status==="maintenance"&&!c.construction&&!Ei(n,c.id));if(l&&n.metrics.cash>=100){ki(n,a,"repair",l.id,ka(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!Ei(n,l)&&n.metrics.cash>=yl(i.managers.fnb)){ki(n,a,"stock",l,8)&&t(yl(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){ki(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&qt(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&ki(n,a,"patrol",c.id,10)}}}function cd(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,Nr(n,e.entityIds[0]),on(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),vn(n,"upgrade-complete"),Nr(n,e.id),on(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function Gs(n,e){e.staff||(e.persona??=Object.keys(Ho)[Di(e.id)%11],fr(n,e))}function ud(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function dd(n,e){const t=n.game.minute,i=t/60,r=Ho[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=ud(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function Zc(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function Tl(n,e,t){e.waitingFor=t,e.waitSince=qt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function Al(n,e,t,i){if(e.lastVisit=t.id,Zc(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:qt(n)},Tl(n,e,t.id),pn(n,e,"full");return}if(t.construction){an(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock",a=t.role==="breakfast"?e.birthdayBreakfast??0:0,o=Math.max(e.persona==="family"?3:1,a);if(r&&n.game[s]<=0&&!a){e.experience={place:t.id,kind:"shortage",at:qt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),pn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),Tl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:qt(n)},r&&(n.game[s]=Math.max(0,n.game[s]-Math.max(0,o-a)),a&&(e.birthdayBreakfast=0));const l=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,c=Math.round(l*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));c&&(e.spend=(e.spend??0)+c,i.income(c),i.progress("ancillary",c)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,nr(n,e)}function Is(n,e){e.departing=!0,e.movement?.steps.length||an(n,e,"exit")}function fd(n,e,t,i){Gs(n,e);const r=e.movement,s=qt(n),a=zc(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&an(n,e,"exit"),nr(n,e);return}if(!e.roomId){nr(n,e);return}if(a&&!e.waitingFor){const o=n.entities[r.destination];o?.kind==="facility"&&Al(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!r.steps.length&&o?.kind==="facility"&&!o.construction&&Zc(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0||e.birthdayBreakfast)&&(o.role!=="club"||n.game.clubStock>0)?Al(n,e,o,i):!r.steps.length&&s-(e.waitSince??s)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),an(n,e,e.roomId)),nr(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",pn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Ci(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[r.destination]?.kind==="facility"&&n.entities[r.destination].construction)&&an(n,e,e.roomId),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)an(n,e,e.roomId);else{const o=dd(n,e);let l=t()*o.reduce((u,f)=>u+f.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)an(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}nr(n,e)}function hd(n,e,t){const i=n.game.guestMemory??={},r=Wc(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),pn(n,e,"checkout")}const wl={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},pd=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,Jc=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Ba(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,it(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function dn(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function nt(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function nn(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Xo(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,vn(n,"revenue",e)}function Gn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const rn=vn,Qc=Ku;function za(){const n=Uc();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:Qc(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=$t(t)?900:650,e.satisfaction=90,e.segment="商务"}for(const e of it(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return hr(n),zs(n),n.guests.forEach(e=>Gs(n,e)),Ga(n),Vo(n),nt(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),$o(n),n}function Ga(n,e){const t=n.game,i=dn(n),r=["陈","林","何","张","周","王","李","赵"][Math.floor(dn(n)*8)]+"先生",s=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&dn(n)<.65,o=Vc(a,dn(n),dn(n)),l={id:"guest-"+t.nextId++,name:r,tier:s,floorId:"floor-lobby",thought:s==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[r]??0)};ju(n,l,e),Gs(n,l),l.goh=l.tier==="Globalist"&&dn(n)<.12,l.sua=!!e?.sua,pn(n,l,"arrival"),n.guests.push(l),t.arrivals++,nt(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const Pi=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function $o(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function md(n,e){e.roomId&&an(n,e,e.roomId)}function gd(n){const e=n.game,t=it(n);let i=0,r=0;for(const u of n.guests)if(u.roomId){const f=u.rate??e.price;if(i+=f,u.spend=(u.spend??0)+f,u.source==="平台"){const d=Math.round(f*.15);n.metrics.cash-=d,e.expense+=d}r++}Xo(n,i),e.nights=r;for(const u of Pi(n))Wo(n,u),Is(n,u);const s=380+t.length*65+Object.values(e.managers).reduce((u,f)=>u+f*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Ba(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(r/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:Fr(n).total});const c=hr(n).scores;c.push({day:e.day,value:Fr(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Gn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),nt(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function vd(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=dn(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=Qc(e.day);for(const t of it(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=od(Ba(n)>1.1?750:590,e.level,e.managers.revenue)),Vo(n),nt(n,"部门",`${Jc(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Ba(n)*100)}%。`)}function _d(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>Xo(n,r),reputation:r=>Gn(n,r),log:(r,s,a)=>nt(n,r,s,a),progress:(r,s=1)=>rn(n,r,s)};qu(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,cd(n),ld(n,a=>Ha(n,a),a=>nn(n,a)),Qu(n,a=>Ga(n,a)),Ju(n);const s=it(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&!a.construction&&!Ei(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",rn(n,"service"),nt(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));Pi(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(fd(n,a,()=>dn(n),i),Gc(a),a.departing){a.exitAt!==void 0&&qt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(Wo(n,a),Is(n,a),t.lost++,t.complaints++,Gn(n,-1),nt(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=Hc(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",nt(n,"客诉",`${a.name} 的 ${Ci(a)} 未确认，按 ${Gr(a)}:00 退房。`,o.id),Gn(n,-1)),ed(n,a),hd(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,Is(n,a),nt(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(Pi(n).length<8&&Ga(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/qc(n)*(.7+dn(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(dn(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),nt(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(dn(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?Ha(n,{type:"resolve",id:String(a.id),value:"sop"}):!Ei(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Gn(n,-2),nt(n,"客诉",`未及时处理：${a.title}`,a.target))}sd(n),id(n),t.minute>=1440&&gd(n)}$o(n)}function Ha(n,e){const t=n.game;if(!t||nd(n,e)||rd(n,e)||td(n,e)||Zu(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=Pi(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===s.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=s.bookedRate??Es(t.price,a,s.tier==="Globalist"),s.upgrades=$t(a)&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&!Fc(a),s.upgrades?(t.upgrades++,rn(n,"vip"),Gn(n,1)):s.tier==="Globalist"&&it(n).some(l=>$t(l)&&l.status==="available")&&Gn(n,-1);const o=t.operations?.bookings.find(l=>l.id===s.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,md(n,s),pn(n,s,s.denied?"denied":"checkin"),rn(n,"arrivals"),nt(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=Pi(n).find(a=>a.id===e.id);s&&(Wo(n,s),Is(n,s),pn(n,s,"denied"),t.lost++,nt(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&nn(n,90)&&(r.status="cleaning",r.timer=30,nt(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.construction&&!r.timer&&!Ei(n,r.id)&&nn(n,180)?(r.timer=40,nt(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&nn(n,200)&&(i.maintenance=100,nt(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(r?.status!=="unbuilt"||n.floors.find(l=>l.id===r.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[s,a]=String(e.value).split(":");if(!Object.hasOwn(di,s)||!["king","twin"].includes(a))break;const o=s;if(!nn(n,di[o].cost))break;r.category=o,r.bed=a,r.type=o==="suite"||o==="premium"?"suite":r.bed,r.status="available",r.level=1,Nr(n,r.id),nt(n,"升级",`${r.number} 已设置为 ${di[o].name} · ${a==="twin"?"双床":"大床"}。`,r.id);break}case"upgrade":r?.status==="available"&&(r.level??1)<5&&nn(n,ad(r.level??1))&&(r.construction={remaining:90,total:90,targetLevel:(r.level??1)+1},r.status="maintenance",Nr(n,r.id),rn(n,"upgrade"),nt(n,"升级",`${r.number} 封闭装修：90 分钟后升级竣工。`,r.id));break;case"reserve":r?.status==="available"&&$t(r)&&(r.status="reserved",nt(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&!r.suaBookingId&&(r.status="available",nt(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(wl,s)||t.managers[s])break;nn(n,3800)&&(t.managers[s]=1,rn(n,"delegate"),nt(n,"部门",`${wl[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}nn(n,300)&&(t[s]=Math.min(160,t[s]+50),rn(n,"stock"),nt(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!nn(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,rn(n,"service")),s.kind==="supplies"&&(t.stock+=25),rn(n,"resolve"),Gn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&rn(n,"delegate"),nt(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!nn(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}bl(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,nt(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),rn(n,"late-decision"),Gn(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),pn(n,s,s.late==="honor"?"late-honor":"late-deny"),nt(n,"入住",`${s.name} 已确认 ${s.late==="honor"?Ci(s):Gr(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;nn(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),pn(n,s,"recovery"),rn(n,"resolve"),nt(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(nn(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");bl(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),nt(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),nt(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,nt(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&vd(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);if(s&&!s.claimed&&s.progress>=s.goal){const a=Math.max(0,s.reward-(s.paid??0));s.claimed=!0,Xo(n,a),s.paid=s.reward,nt(n,"收益",`完成「${s.title}」，尾款 ¥${a}；总奖金 ¥${s.reward}。`)}break}}$o(n)}function Va(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))Va(e)}return n}function xd(n=Uc()){let e=Va(structuredClone(n));const t=new Set,i=r=>{e=Va({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);Ha(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);_d(s,r),i(s)},reset(){i(za())}}}const Qn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},Md={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},ir=2.55,bd=[-4.93,0,4.93],Rl={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function rr(n){const e=typeof n=="string"?n:n.persona??"chill",t=Rl[e]??Rl.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",r=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",s=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${r}${s}</svg></span>`}function Sd(n){const e={hub:"M3 10 12 3l9 7v11h-6v-7H9v7H3Z",hotel:"M3 20V9h18v11M3 16h18M5 9V5h14v4M7 12h3m4 0h3",front:"M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a6 6 0 0 1 12 0v3m3-17a4 4 0 0 1 0 8m0 3a5 5 0 0 1 5 5",operations:"M4 21v-6m8 6V9m8 12V3M1 15h6m2-6h6m2-6h6",development:"m14 4 6 6M3 21l9-9m0-6 6-4 4 4-4 6-6-6Z",brief:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2",evening:"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",tasks:"M5 4h14v18H5ZM9 2h6v4H9ZM8 11l2 2 5-5m-7 9h8",report:"M3 21h19M6 17V9m6 8V3m6 14v-6",history:"M4 4h16v17H4ZM8 8h8m-8 4h8m-8 4h5",log:"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16",bookings:"M3 5h18v17H3ZM7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"};return`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${e[n]??e.hub}"/></svg>`}function _r(n){const e=["hotel","report","history"].includes(n),t=n==="evening";return`<svg class="space-art" viewBox="0 0 160 110" aria-hidden="true" focusable="false"><defs><linearGradient id="wall-${n}" x2="1" y2="1"><stop stop-color="${t?"#5c665d":"#eee2ca"}"/><stop offset="1" stop-color="${t?"#303d36":"#b6a489"}"/></linearGradient></defs><path fill="url(#wall-${n})" d="M0 0h160v110H0z"/><path fill="#7c6249" d="m0 89 91-26 69 21v26H0"/><path fill="${t?"#344d50":"#a5b4ad"}" d="M79 7h56v59H79z"/><path fill="none" stroke="#e8dfc7" stroke-width="3" d="M78 7h58v60H78zM105 7v59"/><path fill="#fff6d0" opacity=".25" d="m79 66-56 44h66l45-44"/><path fill="#a78b66" d="M23 0h6v82h-6zm10 0h4v80h-4zm9 0h3v76h-3"/><path fill="#e9ddc2" d="M70 5h7v65h-7zm69 0h8v72h-8"/>${e?'<path fill="#735b45" d="m38 63 42-13 52 21-42 20-52-16z"/><path fill="#ded4bf" d="m39 57 43-11 50 20-43 19-50-15z"/><path fill="#fcf7e8" d="m41 56 40-11 28 11-41 14z"/><path fill="#617565" d="m68 70 41-14 22 10-42 19z"/><path fill="#fffaf0" d="m47 55 14-4 13 5-15 5zm19-6 13-4 13 5-13 5z"/>':'<path fill="#8b7357" d="m42 67 44-13 39 16v23l-39 15-44-17z"/><path fill="#e9dbc2" d="m40 62 46-13 42 16-43 16-45-16z"/><path fill="#40584b" d="m19 76 17-6 16 7v20l-18 7-15-9z"/><path fill="#6e8670" d="m18 71 17-6 18 8-19 7z"/>'}<path stroke="#a58b55" stroke-width="3" d="M151 77V41"/><path fill="#ffe6a3" d="m139 44 6-18h11l4 18z"/><path fill="#ae9776" d="M6 90h15l-2 17H9z"/><path fill="${n==="tasks"||n==="development"?"#3a6041":"#50654b"}" d="M14 94C-8 65 5 46 14 82 5 29 28 48 17 83 36 49 39 83 14 94Z"/><path stroke="#f9e9b6" opacity=".6" d="M0 109h160"/></svg>`}const Qs=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function yd(n){const e=n.game;return[...e.events.map(t=>({key:"event-"+t.id,title:t.title,detail:`剩余 ${Math.max(0,t.expires-e.day*1440-e.minute)} 分钟`,urgent:!0,button:`<button class="game-action" data-entity="${Qs(t.target)}">现场</button><button class="game-action" data-action="resolve" data-id="${t.id}" data-value="gm">亲自处理 · ¥350</button>`,note:"直接协调支出较高；授权方案在待办详情中。"})),...it(n).filter(t=>t.status==="dirty").map(t=>({key:t.id,title:t.number+" · 待翻房",detail:"客房部 · 清洁后才可出售",urgent:!1,button:`<button class="game-action" data-action="clean" data-id="${t.id}">清洁 · ¥90</button>`,note:"约 30 游戏分钟；等待主管可节省手动清洁费。"})),...n.guests.filter(t=>!t.staff&&!t.departing&&!t.roomId).map(t=>({key:t.id,title:t.name+" · 等待入住",detail:`${t.tier} · 耐心 ${t.patience??0} 分钟`,urgent:(t.patience??100)<45,button:`<button class="game-action" data-open="front" data-guest="${Qs(t.id)}">为他选房 →</button>`,note:t.reservationId?"确认预订未兑现需支付 ¥600 安置费。":"临时到店客人，先比较空房与留套需要。"})),...n.guests.filter(t=>!t.departing&&t.roomId&&(t.late==="pending"||t.challenge&&!t.challenge.resolved||t.occasion&&!t.occasion.resolved)).map(t=>({key:t.id,title:t.name+" · 服务待确认",detail:t.occasion&&!t.occasion.resolved?"生日礼遇待决定":t.late==="pending"?"晚退请求":"特殊安排",urgent:!1,button:`<button class="game-action" data-open="events" data-guest="${Qs(t.id)}">处理诉求 →</button>`,note:"查看真实诉求与条件，欢迎礼不代替承诺。"})),...e.stock<20?[{key:"breakfast-stock",title:"早餐库存偏低",detail:`剩余 ${e.stock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="breakfast">补 50 份 · ¥300</button>',note:"提前备货减少断供风险；先保留必要现金。"}]:[],...e.clubStock<20?[{key:"club-stock",title:"酒廊库存偏低",detail:`剩余 ${e.clubStock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="club">补 50 份 · ¥300</button>',note:"晚间服务仍在继续，补货会增加今天成本。"}]:[]].sort((t,i)=>Number(i.urgent)-Number(t.urgent))}const ot=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ke=n=>"¥"+Math.round(n).toLocaleString("en-US"),Pe=(n,e,t="",i="",r="")=>`<button class="game-action" data-action="${e}" data-id="${ot(t)}" data-value="${ot(i)}" ${r}>${n}</button>`,ye=(n,e)=>`<button class="game-action" data-open="${e}">${n}</button>`,Qt=(n,e,t,i=!1)=>`<button data-focus-key="${e}" data-focus-value="${ot(t)}" aria-pressed="${i}">${n}</button>`,sn=n=>`<div class="focus-tabs">${n}</div>`,Xe=n=>`<div class="focus-metrics">${n.map(([e,t])=>`<div><small>${e}</small><strong>${t}</strong></div>`).join("")}</div>`,Ge=(n,e,t)=>`<div class="focus-person">${rr(n)}<div><strong>${ot(e)}</strong><p>${ot(t)}</p></div></div>`,Ve=(n,e,t)=>`<section class="focus-screen"><h2>${n}</h2><div class="focus-main">${e}</div></section><div class="focus-footer">${t}</div>`,An=(n,e,t)=>`<div class="focus-pager">${Qt("‹ 上一项",n,String(Math.max(0,e-1)))}<span>${t?e+1:0} / ${t}</span>${Qt("下一项 ›",n,String(Math.min(Math.max(0,t-1),e+1)))}</div>`,Cl=()=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:"overview",activity:"coffee",bookingPage:0,profilePage:0,logPage:0,careerPage:0,archiveTab:"overview",category:"standard",bed:"king"});function Ed(n,e,t){const i=n.game,r=it(n),s=n.guests.filter(o=>!o.staff&&!o.departing&&!o.roomId),a=yd(n);if(e==="hub")return Ve("今天怎么经营？",Xe([["现金",Ke(n.metrics.cash)],["在住",r.filter(o=>o.status==="occupied").length+"/"+r.length],["待处理",String(a.length)]])+`<div class="focus-shortlist">${a.slice(0,3).map(o=>`<div><span><strong>${ot(o.title)}</strong><small>${ot(o.detail)}</small></span>${o.button}</div>`).join("")||"<p>现场没有积压，可以继续经营。</p>"}</div>`+Ge("front",ai(n)?.title??"酒店进入自由经营",ai(n)?ai(n).action+" · "+ai(n).progress+"/"+ai(n).goal:"继续培养熟客，完成长期里程碑。"),ye("当前目标","tasks")+ye("08:00 晨会","brief")+ye("20:00 复盘","evening"));if(e==="front"){const o=t.guest?Math.max(0,s.findIndex(f=>f.id===t.guest)):Math.min(t.guestPage,Math.max(0,s.length-1)),l=s[o];if(!l)return Ve("客人接待",Ge("front","目前无人排队","关上面板继续经营，客人到店后会提醒你。"),ye("今日预订","bookings")+ye("回到酒店","hub"));const c=r.filter(f=>f.status==="available"||f.status==="reserved"&&l.tier==="Globalist"&&(!f.suaBookingId||f.suaBookingId===l.reservationId)).sort((f,d)=>+(d.id===t.room)-+(f.id===t.room)||+(!!d.suaBookingId&&d.suaBookingId===l.reservationId)-+(!!f.suaBookingId&&f.suaBookingId===l.reservationId)||(l.tier==="Globalist"?Number($t(d))-Number($t(f)):+(f.type==="suite")-+(d.type==="suite"))),u=Math.min(t.roomPage,Math.max(0,Math.ceil(c.length/2)-1));return Ve("给这位客人一间房",An("guestPage",o,s.length)+`<div class="focus-person">${rr(l)}<div><strong>${ot(l.name)} · ${ot(l.tier)}</strong><p>${ot(l.thought)}</p></div></div>`+Xe([["住宿",`${l.stayLength} 晚`],["耐心",`${l.patience} 分钟`],["来源",ot(l.source??"Walk-in")]])+`<div class="focus-room-choices">${c.slice(u*2,u*2+2).map(f=>`<button data-action="checkin" data-id="${ot(l.id)}" data-room="${f.id}">${_r("hotel")}<strong>${f.number} · ${Na(f)}</strong><small>${l.tier==="Globalist"&&$t(f)?"免费升套 · 占用标准套库存":"点击安排入住"}</small></button>`).join("")||"<p>暂无空房，先清洁或查看预留。</p>"}</div>`+(c.length>2?An("roomPage",u,Math.ceil(c.length/2)):"")+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',ye("查看房态","hotel")+Pe("婉拒本次","reject",l.id))}if(e==="events"||e==="worklist"){const o=[];for(const u of n.guests.filter(f=>!f.departing&&f.roomId)){if(u.occasion&&!u.occasion.resolved){const f=Yc(n,u);o.push({id:u.id+"-birthday",body:`<div class="focus-person">${rr(u)}<div><strong>${ot(u.name)} · 今天过生日</strong><p>这趟专门来庆祝，早餐和房型还能有一点惊喜吗？</p></div></div>`+Xe([["早餐库存",i.stock+" 份"],["可售标准套",String(f.free)],["需保护预订",String(f.reserve)]])+`<div class="focus-decision"><h3>照顾这一晚，也要照顾其他承诺</h3><p>早餐 ¥160 / 2 份 · 体验 +8 · 业主 −1。</p><p>升套 ¥280 · 体验 +12 · 业主 −2；原房待翻房，套房按原房费住。</p><p class="focus-trade">${f.alreadySuite?"客人已住标准套房，可以改送早餐或祝福。":f.suite?"送掉套房会减少后续付费销售和会员升套空间。":"现有套房需保护预订；不能重复承诺。"}手写卡免费，体验 +2；维持预订体验 −3。</p></div>`,actions:Pe("送双人早餐","birthday-choice",u.id,"breakfast",f.breakfast?"":"disabled")+Pe("生日升套","birthday-choice",u.id,"suite",f.suite?"":"disabled")+Pe("手写生日卡","birthday-choice",u.id,"card")+Pe("维持原预订","birthday-choice",u.id,"decline")})}if(u.challenge&&!u.challenge.resolved){const f=u.challenge.kind,d={quiet:["需要安静的房间","quiet","有施工噪声时需要另有安静空房。"],sua:["核对 SUA 标准套房","inventory","已入住标准套才能兑现；欢迎礼不能替代。"],family:["早餐和加床一起安排","family",`需要 6 份早餐库存，当前 ${i.stock} 份。`],audit:["检查房间与服务流程","inspect","需客房、工程主管在岗，且无待修房。"]}[f];o.push({id:u.id,body:`<div class="focus-person">${rr(u)}<div><strong>${ot(u.name)} · ${ot(u.tier)}</strong><p>${d[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${d[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:Pe("落实 · ¥180","guest-choice",u.id,d[1])+Pe("欢迎礼 · ¥100","guest-choice",u.id,"gift")+Pe("不作安排","guest-choice",u.id,"decline")})}u.late==="pending"&&o.push({id:u.id+"-late",body:`<div class="focus-person">${rr(u)}<div><strong>${ot(u.name)} · ${ot(u.tier)}</strong><p>希望 ${Ci(u)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:Pe("同意 "+Ci(u),"late",u.id,"honor")+Pe("协商 "+Gr(u)+":00","late",u.id,"deny")})}for(const u of i.events){const f=u.kind==="repair"?"engineering":u.kind==="supplies"?"fnb":"front";o.push({id:"event-"+u.id,body:Ge(f,u.title,`剩余 ${Math.max(0,u.expires-i.day*1440-i.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${i.managers[f]?"主管已到岗，可以授权处理。":"对应主管尚未到岗；可先亲自处理，避免超时。"}</p></div>`,actions:Pe("亲自处理 · ¥350","resolve",String(u.id),"gm")+(i.managers[f]?Pe("交给主管 · ¥150","resolve",String(u.id),"sop"):ye("聘任主管","operations"))})}for(const u of a.filter(f=>!o.some(d=>d.id===f.key)&&!n.guests.some(d=>d.roomId&&d.id===f.key)))o.push({id:u.key,body:Ge("front",u.title,u.detail)+`<div class="focus-decision"><p>${ot(u.note)}</p></div>`,actions:u.button});const l=t.event?Math.max(0,o.findIndex(u=>u.id===t.event||u.id===t.event+"-birthday"||u.id===t.event+"-late")):Math.min(t.eventPage,Math.max(0,o.length-1)),c=o[l];return Ve("逐件处理 · "+o.length+" 项",c?An("eventPage",l,o.length)+c.body:Ge("front","待办全部处理完了","关上面板，回到酒店看决定如何发生。"),c?.actions??ye("回到经营","hub"))}if(e==="hotel"||e==="entity"){const o=n.floors.filter(m=>m.role==="guest"),l=o.find(m=>m.id===(t.floor??n.entities[t.room??""]?.floorId))??o[0];if(!l)return null;const c=Oc(n).filter(m=>m.floorId===l.id),u=c.find(m=>m.id===t.room)??c[0];if(!u)return null;t.room=u.id,t.floor=l.id;const f=sn(o.map(m=>Qt(m.label,"floor",m.id,m.id===l.id)).join(""))+`<div class="focus-room-map">${c.map(m=>Qt(m.number+"<small>"+{available:"可入住",occupied:"在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"封闭",reserved:"已预留",unbuilt:"＋设置"}[m.status]+"</small>","room",m.id,m.id===u.id)).join("")}</div>`,d=u.construction??l.construction;if(d)return Ve(u.number+" · 封闭施工",f+`<div class="focus-space">${_r("hotel")}</div>`+Xe([["剩余",d.remaining+" 分钟"],["完成后","开放使用"]]),ye("扩建与全部参数","hotel-data"));if(u.status==="unbuilt")return Ve(u.number+" · 设置房型",f+sn(Object.entries(di).map(([m,g])=>Qt(g.name,"category",m,t.category===m)).join(""))+sn(Qt("大床","bed","king",t.bed==="king")+Qt("双床","bed","twin",t.bed==="twin"))+Xe([["配置费用",Ke(di[t.category].cost)],["新客房价",Ke(i.price*di[t.category].factor)+"起"]])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',Pe("确认设置","configure-room",u.id,t.category+":"+t.bed));const h=n.guests.find(m=>m.id===u.guestId),p=u.level??1,x=u.status==="dirty"?Pe("清洁 · ¥90","clean",u.id):u.status==="maintenance"&&!u.timer?Pe("维修 · ¥180","repair",u.id):u.status==="available"?`<button class="game-action" data-open="front" data-assign-room="${u.id}">安排入住</button>`+(p<5?Pe("装修 · "+Ke(p*2500),"upgrade",u.id):"")+($t(u)?Pe("留给会员","reserve",u.id):""):u.status==="reserved"&&!u.suaBookingId?Pe("释放预留","release",u.id):h?`<button class="game-action" data-open="events" data-guest="${h.id}">${h.occasion&&!h.occasion.resolved?"生日礼遇":"查看服务诉求"}</button>`:"";return Ve(u.number+" · "+Na(u),f+`<div class="focus-space">${_r("hotel")}<span>Lv.${p} · ${h?ot(h.name):"暂无住客"}</span></div>`+Xe([["每晚房费",Ke(h?.rate??Es(i.price,u))],["剩余住宿",u.nightsLeft+" 晚"],["升级增收",p<5?"每新客晚 +"+Ke(Es(i.price,{...u,level:p+1})-Es(i.price,u)):"已满级"]])+`<p class="focus-trade">${u.status==="available"?"装修需停卖 90 分钟；已确认订单价格不变。":h?ot(h.thought):"等清洁或维修完成后，才能再次出售。"}</p>`,x+ye("房间明细","room-data"))}if(e==="hotel-data"){const o=n.floors.filter(u=>u.role==="guest").length,l=1e4+5e3*(o-3),c=n.floors.filter(u=>u.construction);return Ve("扩建 · 再高一层",`<div class="focus-space">${_r("hotel")}<span>施工 → 竣工 → 手动设置房型</span></div>`+Xe([["建设费",Ke(l)],["交付时间","4 小时"],["新增","3 个空位"]])+Ge("engineering","扩建前先确认现金与需求","施工期间新楼层封闭；竣工后逐间选择房型，普通客房配置已含在造价中。")+`<p class="focus-trade">${c.length?c.length+" 层仍在施工。":""}相邻房间有噪声风险；已有空房较多时，可先改善现有客房。</p>`,Pe("开工 · "+Ke(l),"expand")+ye("查看房态","hotel")+ye("投资明细","hotel-archive"))}if(e==="development-data"){const o=Object.hasOwn(Lr,t.activity)?t.activity:"coffee",l=Lr[o],c=i.development?.activity;return Ve("活动 · 投入一场体验",sn(Object.entries(Lr).map(([u,f])=>Qt(f.name,"activity",u,u===o)).join(""))+Ge("fnb",l.name,l.description)+Xe([["筹备费",Ke(l.cost)],["准备时间","2 小时"],["每位收入",Ke(l.fee)]])+`<p class="focus-trade">${c?"已有活动筹备中，等待现场结算。":"人数受在住客人、天气、定位与容量影响；收入不足筹备费时会亏损。"}每个营业日只能安排一场。</p>`,Pe(c?"正在筹备":"安排活动 · "+Ke(l.cost),"activity",o,"",c||i.development?.activityDay===i.day?"disabled":"")+Pe("三日推广 · ¥2,200","campaign")+ye("查看设施","development"))}if(e==="operations"){const o={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},l=t.department??"house",c=i.managers[l],u=c?4500*c:3800,f={front:"自动分房与常规诉求；无空房仍需等待。",house:`每间清洁 ${Oa(c)} → ${Oa(Math.min(3,c+1))} 分钟，另需到场时间。`,engineering:`维修 ${ka(c)} → ${ka(Math.min(3,c+1))} 分钟，另需到场时间。`,fnb:"低库存时派员工配送，到餐台后才计入库存。",revenue:"次日自动定价；报价更高也可能减少客流。"}[l];return Ve("团队 · 原位授权",sn(Object.entries(o).map(([d,h])=>Qt(h,"department",d,d===l)).join(""))+Ge(l,o[l]+"主管",c?"已到岗 · Lv."+c:"尚未聘任")+Xe([["投入",c>=3?"已满级":Ke(u)],["每日工资",Ke(c*180)+" → "+Ke(Math.min(3,c+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${f}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(c<3?Pe(c?"培训升级":"聘任到岗",c?"train":"hire",l):"")+ye("效果与财务明细","operations-data"))}if(e==="development"){const o=Object.values(n.entities).filter(u=>u.kind==="facility"),l=o.find(u=>u.id===t.facility)??o[0];if(!l)return null;const c=l.level??1;return Ve("设施 · 看清再投资",sn(o.map(u=>Qt(u.name,"facility",u.id,u.id===l.id)).join(""))+`<div class="focus-space">${_r(l.role==="rooftop"?"evening":"hotel")}<span>${l.name} · Lv.${c}</span></div>`+Xe([["使用 / 容量",l.usage+" / "+l.capacity],["升级后容量",String(l.capacity+4)],["费用",Ke(c*3500)]])+`<p class="focus-trade">${l.construction?"施工剩余 "+l.construction.remaining+" 分钟。":"升级需封闭施工；先补货或维护可解决眼前问题。"}</p>`,(l.construction?"":(c<5?Pe("升级设施","invest",l.id):"")+(["breakfast","club"].includes(l.role)?Pe("补货 · ¥300","stock",l.role):Pe("维护 · ¥200","repair",l.id)))+ye("营销、活动、更多","development-data"))}if(e==="brief"){const o=Or(n),l=t.meeting,c=l==="price"?Ge("revenue","今天挂牌多少？","高价增加单晚收入，也可能减少 Walk-in。")+Xe([["当前挂牌",Ke(i.price)],["预计入住",o.occupancy+"%"]])+sn(Pe("¥720 · 争取入住","price","","720")+Pe("¥850 · 提高单价","price","","850")):l==="service"?Ge("fnb","先备好今天的服务",`早餐预计 ${o.breakfast} 人，当前 ${i.stock} 份。`)+Xe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"]])+sn(Pe("早餐 +50 · ¥300","stock","breakfast")+Pe("酒廊 +50 · ¥300","stock","club")):l==="suite"?Ge("front","套房要留一间吗？","留套照顾会员；开放销售保留付费机会。SUA 锁房不变。")+Xe([["当前策略",i.operations?.suitePolicy==="hold"?"保留一间":"开放销售"]])+sn(Pe("保留一间","suite-policy","","hold")+Pe("开放销售","suite-policy","","sell")):Xe([["预计入住",o.occupancy+"%"],["确认预订",String(i.operations?.bookings.length??0)],["早餐需求",o.breakfast+" 人"]])+Ge("revenue","Day "+i.day+" · 开始前做一个判断",o.breakfast>i.stock?"早餐需求超过库存，建议先备货。":o.occupancy>=90?"预计接近满房，谨慎继续投广告。":"今天还有接客空间，可保留现价，也可以调整报价。");return Ve("08:00 · 晨会",sn(["overview","price","service","suite"].map((u,f)=>Qt(["重点","房价","备货","套房"][f],"meeting",u,u===l)).join(""))+c,i.operations?.briefOpen?Pe("按当前决定开始今天","brief-start")+ye("预订 / 客源明细","bookings"):ye("回到经营","hub")+ye("完整预测","brief-data"))}if(e==="evening"||e==="report"){const o=i.evening,l=i.reports.at(-1);if(e==="evening"&&!o)return Ve("20:00 · 晚间复盘",Ge("revenue","今晚 20:00 自动开会","继续经营，届时核对收入、客诉与总部建议。"),ye("回到经营","hub"));if(e==="report"&&!l)return Ve("今日尚未日结",Ge("revenue","房费于午夜结算","现在可以查看 20:00 快照，或继续经营。"),ye("晚间复盘","evening"));const c=e==="evening"?o.notes[0]?.text:l.recommendation;return Ve(e==="evening"?"20:00 · 今天经营得如何？":"Day "+l.day+" · 日结",Xe(e==="evening"?[["预计净额",Ke(o.projectedNet)],["入住率",o.occupancy+"%"],["待办",String(o.pending)]]:[["净额",Ke(l.revenue-l.expense)],["入住率",l.occupancy+"%"],["客诉",String(l.complaints)]])+Ge("revenue","今晚优先改进",c??"保持服务节奏。")+'<p class="focus-trade">'+(e==="evening"?"这是 20:00 快照；预计房费还未入账。":"这是午夜结算结果。")+"</p>",ye("客诉 / 明细",e==="evening"?"evening-data":"report-data")+(e==="evening"&&o?.open?Pe("交给夜班 · 继续经营","evening-close"):i.reportOpen?Pe("开始下一天","continue"):ye("回到经营","hub")))}if(e==="tasks"){const o=i.campaign,l=ai(n),c=o?.inspection,u=o?.result;if(!l)return Ve("酒店成长路线 · 完成",Ge("revenue","五段经营检验全部通过","经营仍会继续。培养熟客、建设酒店，长期里程碑保留。")+Xe([["认证",String(o?.certificates.length??0)+" / 5"]]),ye("继续经营","hub")+ye("支线与里程碑","tasks-data"));const f=`<small class="campaign-route">酒店成长路线 · ${Math.min(5,(o?.chapter??0)+1)} / 5${o?.certificates.length?" · 已获 "+o.certificates.length+" 项认证":""}</small>`;if(u)return Ve(u.passed?"体验通过 · "+l.exam:"需要改善 · "+l.exam,f+Ge(l.department,l.title,u.advice)+Xe([["现场表现",String(u.score)],["通过标准",String(l.threshold)]])+`<div class="inspection-scenes">${u.scenes.map(d=>`<p>${ot(d)}</p>`).join("")}</div><p class="focus-trade">${u.passed?"确认后进入下一段目标；日常经营不会重置。":"目标进度保留；免费重约，次日到店再检验。"}</p>`,u.passed?Pe("进入下一阶段","continue-chapter"):ye("先去改善",u.target)+Pe("免费预约重试","book-inspection"));if(c){const d=Math.max(0,c.due-i.day*1440-i.minute),h=i.day*1440+i.minute-c.due,p=Math.min(2,Math.max(0,Math.floor(h/10)));return Ve(l.exam+" · "+(c.phase==="booked"?"已预约":"现场体验中"),f+Ge(l.department,c.phase==="booked"?"留出时间把酒店准备好":["Room Check · 客房巡检","F&B · 体验餐台","Front Office · 核对承诺"][p],c.phase==="booked"?"检验看实际房态、住客体验、餐饮库存和诉求积压，现场还会有小幅波动。":"检验员按顺序体验酒店；尚未公布结果。")+Xe([["到店时间","Day "+Math.floor(c.due/1440)+" · 18:00"],["等待",c.phase==="booked"?d+" 分钟":Math.max(0,30-h)+" 分钟后反馈"],["额外准备",c.prepared?"已彩排 · +6":"可选 · ¥300"]])+`<div class="inspection-timeline"><span class="${h>=0?"active":""}">看房</span><span class="${h>=10?"active":""}">用餐</span><span class="${h>=20?"active":""}">服务</span></div><p class="focus-trade">彩排提高表现，但不能替代清洁、备货和兑现承诺。</p>`,(c.phase==="booked"&&!c.prepared?Pe("现场彩排 · ¥300","prepare-inspection"):"")+ye("检查房态","hotel")+ye("备货与服务","operations"))}return Ve(l.title,f+Ge(l.department,l.action,l.ready?"行动目标已完成。预约一次真实体验，检验今天的经营。":"先做好这一件事。目标跨天保留，完成后预约次日检验。")+Xe([["当前进度",l.progress+" / "+l.goal],["下一次检验",l.exam]])+`<progress max="${l.goal}" value="${l.progress}" aria-label="${ot(l.action)}"></progress><p class="focus-trade">日常支线奖金分段到账，完成后可领尾款；单任务奖金上限不变。</p>`,(l.ready?Pe("预约检验 · 次日 18:00","book-inspection"):ye("去完成当前目标",l.target))+ye("支线奖励与带教","tasks-data"))}return null}const Wa=[["hub","经营"],["hotel","客房"],["front","客人"],["operations","团队"],["development","设施"]];function Ls(n){return["hotel","hotel-data","hotel-archive","entity","room-data"].includes(n)?"hotel":["front","events","worklist","bookings","history","profile-records"].includes(n)?"front":["operations","operations-data","report","report-data","score"].includes(n)?"operations":["development","development-data"].includes(n)?"development":"hub"}function Td(n){return{hub:[["hub","今天"],["brief","晨会"],["tasks","目标"],["evening","复盘"],["log","日志"],["settings","设置"]],hotel:[["hotel","房态"],["hotel-data","扩建"]],front:[["front","接待"],["events","服务"],["bookings","预订"],["history","客史"]],operations:[["operations","主管"],["operations-data","运营安排"],["report","财务"],["score","评分"]],development:[["development","设施"],["development-data","活动"],["hotel-data","扩建"]]}[Ls(n)]}const jc={hub:"经营看板",hotel:"房态与装修","hotel-data":"扩建计划","hotel-archive":"空间总览","room-data":"房间与服务",front:"到店接待",events:"事件中心",worklist:"事件中心",bookings:"今日预订",history:"住客档案","profile-records":"客史记录",operations:"部门负责人","operations-data":"运营安排",development:"公共设施","development-data":"主题活动",brief:"08:00 晨会","brief-data":"需求预测",evening:"20:00 复盘","evening-data":"客诉与建议",report:"日结报告","report-data":"财务明细",score:"经营评分",tasks:"当前目标","tasks-data":"日常奖励",career:"长期里程碑",teaching:"部门带教",log:"经营日志",settings:"存档与设置"},Ad={"room-data":"hotel","hotel-archive":"hotel-data","brief-data":"brief","evening-data":"evening","report-data":"report","profile-records":"history","tasks-data":"tasks",career:"tasks-data",teaching:"tasks"};class wd{current={view:"hub",selected:"",selection:Cl(),scroll:0};pages=new Map;history=[];get canBack(){return!!this.history.length||!Wa.some(([e])=>e===this.current.view)}visit(e,t=!1){if(e==="worklist"&&(e="events"),jc[e]||(e="hub"),e===this.current.view){t&&(this.history=[]);return}this.pages.set(this.current.view,structuredClone(this.current)),t?this.history=[]:(this.history.push(structuredClone(this.current)),this.history.length>20&&this.history.shift()),this.current=structuredClone(this.pages.get(e)??{view:e,selected:"",selection:Cl(),scroll:0})}back(){this.pages.set(this.current.view,structuredClone(this.current));const e=this.history.pop();if(e){this.current=e;return}this.visit(Ad[this.current.view]??Ls(this.current.view),!0)}clear(){this.pages.set(this.current.view,structuredClone(this.current)),this.history=[]}}function Rd(n){const e=n.game,t=e.logs.filter(s=>s.day===e.day),i=s=>t.some(a=>s.test(a.text)),r=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(s=>s.challenge&&!s.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:r,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:r,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:r,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}const Qr=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),js=(n,e,t)=>`<div class="focus-person">${rr(n)}<div><strong>${ot(e)}</strong><p>${ot(t)}</p></div></div>`,jr=n=>`<p class="focus-trade">${ot(n)}</p>`,jn=(n,e)=>`<article class="record-card"><small>${ot(n)}</small><p>${ot(e)}</p></article>`,gi=(n,e)=>Math.min(n,Math.max(0,e-1));function Cd(n,e,t){const i=n.game,r=i.operations;if(e==="room-data"){const s=n.entities[t.room??""];if(s?.kind!=="room")return Ve("房间详情",Ge("house","请选择一间房","从房态图打开具体房间。"),ye("查看房态","hotel"));const a=n.guests.find(o=>o.id===s.guestId);return Ve(s.number+" · 房间与服务",a?js(a,a.name+" · "+a.tier,a.thought)+Xe([["订单房费",Ke(a.rate??i.price)],["退房时间",Qr(Hc(a))],["体验",String(Math.round(a.satisfaction??90))]])+jn("服务记录",a.occasion?.outcome??a.challenge?.outcome??(a.serviceDone?"专属服务已安排":"尚未安排额外服务")):Ge("house",Na(s),"房态页可清洁、维修、装修或预留；所有操作在同一位置。"),(a&&!a.serviceDone?Pe("专属服务 · ¥120","guest-service",a.id):"")+(a?`<button class="game-action" data-open="events" data-guest="${a.id}">查看诉求</button>`:"")+ye("返回房态","hotel"))}if(e==="bookings"){const s=[...r.bookings].sort((f,d)=>f.eta-d.eta),a=gi(t.bookingPage,s.length),o=s[a],l=o&&r.profiles[o.profileId],c=o&&n.guests.find(f=>f.reservationId===o.id&&!f.departing),u=Xe(["APP","团单","平台"].map(f=>[f,String(r.bookings.filter(d=>d.source===f).length)+" 单"]))+An("bookingPage",a,s.length);return Ve("今日预订",u+(o&&l?js(l,l.name+" · "+l.tier,o.occasion?"今天生日，提前留出礼遇预算。":o.challenge?{quiet:"需要安静房间",sua:"SUA 标准套已确认",family:"需要早餐与加床",audit:"关注服务标准"}[o.challenge]:"常规接待")+Xe([["到店",Qr(o.eta)],["住宿",o.nights+" 晚"],["锁定价",Ke(o.rate)]])+jn(o.source+" · "+{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"已安置"}[o.status],l.history.at(-1)?.text??"首次来店。"):Ge("front","今天暂无预订","Walk-in 到店后会进入接待队列。"))+jr("Walk-in 不在预订表内；当前已到 "+r.walkinArrivals+" 位。确认报价已锁定，平台佣金为每晚 15%。"),(c?`<button class="game-action" data-open="${c.roomId?"events":"front"}" data-guest="${c.id}">${c.roomId?"查看服务":"为他选房"}</button>`:ye("查看到店客人","front"))+(l?`<button class="game-action" data-open="history" data-profile="${l.id}">查看客史</button>`:"")+ye("晨会","brief"))}if(e==="history"||e==="profile-records"){const s=Object.values(r.profiles).filter(f=>f.visits>0||n.guests.some(d=>d.profileId===f.id)).sort((f,d)=>d.visits-f.visits),a=t.profile?Math.max(0,s.findIndex(f=>f.id===t.profile)):gi(t.profilePage,s.length),o=s[a],l=o&&n.guests.find(f=>f.profileId===o.id&&!f.departing);if(!o)return Ve("客史",Ge("front","客人正在写下第一段故事","接待住客后，这里会保存服务与回访记录。"),ye("接待客人","front"));const c=[...o.history].reverse(),u=gi(t.logPage,c.length);return Ve(e==="history"?"客史 · 认出这位客人":"客史 · 完整记录",(e==="history"?An("profilePage",a,s.length):An("logPage",u,c.length))+js(o,o.name+" · "+o.tier,e==="history"?"先看上次承诺，再决定这次怎样接待。":"每次决定与体验会留在这份记录里。")+(e==="history"?Xe([["住宿次数",String(o.visits)],["信任",String(o.trust)],["累计消费",Ke(o.spend)]])+jn("最近一段故事",c[0]?.text??"首次入住，等待这次故事。"):jn(c[u]?"Day "+c[u].day:"尚无记录",c[u]?.text??"完成入住后积累客史。")),(l?`<button class="game-action" data-open="${l.roomId?"events":"front"}" data-guest="${l.id}">${l.roomId?"查看当前诉求":"接待这位客人"}</button>`:ye("今日预订","bookings"))+`<button class="game-action" data-open="${e==="history"?"profile-records":"history"}" data-profile="${o.id}">${e==="history"?"完整记录":"返回客史"}</button>`)}if(e==="operations-data"){const s=["stock","price","position"].includes(t.archiveTab)?t.archiveTab:"stock",a=sn(["stock","price","position"].map((c,u)=>Qt(["备货","报价","定位"][u],"archiveTab",c,c===s)).join("")),o=s==="stock"?Ge("fnb","餐台供应优先于扩容","手动补货即时入库；主管配送需走到餐台后完成。")+Xe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"],["每次采购","50 份 / ¥300"]]):s==="price"?Ge("revenue","每晚收益与客流之间取舍","报价影响未预订客流，已确认订单与在住价格不变。")+Xe([["当前报价",Ke(i.price)],["预计入住",Or(n).occupancy+"%"]])+`<label class="precision-price">精确报价 <input id="price-input" type="number" min="350" max="1800" value="${i.price}"></label>`:Ge("revenue","这家酒店要服务谁？","商务重工作日与早餐，度假重周末和体验，城市混合兼顾两类需求。")+Xe([["当前定位",{business:"商务",resort:"度假",urban:"城市混合"}[i.positioning]]])+jr("定位会改变客流、住宿时长与公区偏好；调整后观察一天经营结果。"),l=s==="stock"?Pe("早餐 +50 · ¥300","stock","breakfast")+Pe("酒廊 +50 · ¥300","stock","club"):s==="price"?Pe("¥720 · 争取客流","price","","720")+Pe("¥850 · 提高单价","price","","850")+Pe("应用精确报价","price"):Pe("商务","position","","business")+Pe("度假","position","","resort")+Pe("城市混合","position","","urban");return Ve("运营安排",a+o,l)}if(e==="score"){const s=Fr(n);return Ve("经营评分",Xe([["综合评分",s.total+" / 100"],["评估方式","四项等权"]])+`<div class="rating-list">${s.parts.map(a=>`<div><span>${a.name}</span><b>${a.value}</b><progress max="100" value="${a.value}" aria-label="${a.name}"></progress></div>`).join("")}</div>`+Ge("revenue","从最弱的一项开始改善","口碑看承诺，体验看服务，房务看周转，业主看经营。"),ye("处理待办","events")+ye("财务表现","report-data"))}if(e==="report-data"){const s=i.reports.at(-1);return Ve(s?"Day "+s.day+" · 财务明细":"今天 · 财务进度",Xe([["入账收入",Ke(s?.revenue??i.revenue)],["成本",Ke(s?.expense??i.expense)],["净额",Ke((s?.revenue??i.revenue)-(s?.expense??i.expense))]])+(s?Xe([["ADR",Ke(s.adr)],["RevPAR",Ke(s.revpar)],["入住率",s.occupancy+"%"]])+jn("收益经理建议",s.recommendation):Ge("revenue","房费于午夜统一结算","当前收入包括已经到账的消费与奖金；在住房费尚未入账。")),ye("经营评分","score")+ye("收支日志","log")+(i.reportOpen?Pe("开始下一天","continue"):ye("晚间复盘","evening")))}if(e==="brief-data"){const s=Or(n);return Ve("晨会 · 完整预测",Ge("revenue",$c[r.event],"预订报价已锁定，Walk-in 仍有波动；先判断库存和翻房能否接住需求。")+Xe([["预计入住",s.occupancy+"%"],["Walk-in",s.walkins+" 位"],["翻房",s.housekeeping+" 间"]])+Xe([["早餐",s.breakfast+" 人"],["标准套需求",s.suites+" 间"],["Happy Hour",s.club+" 人"]])+jn("客源结构","商务 "+s.business+" / 度假 "+s.resort+" / 团队 "+s.group),ye("调整晨会决定","brief")+ye("核对预订","bookings"))}if(e==="evening-data"){const s=i.evening;if(!s)return Ve("复盘 · 尚未开会",Ge("revenue","20:00 回看今天","当前可以先处理待办与预订。"),ye("经营看板","hub"));const a=[...s.logs].reverse(),o=gi(t.logPage,a.length),l=a[o],c=s.notes[0];return Ve("复盘 · 客诉与建议",An("logPage",o,a.length)+Xe([["客诉计数",String(s.complaints)],["待处理",String(s.pending)],["已入账",Ke(s.revenue)]])+jn(l?Qr(l.minute)+" · "+l.category:"今天的服务记录",l?.text??"尚无客诉记录。")+Ge("revenue",c?.title??"总部建议",c?.text??"继续保持服务节奏。"),(l?.target&&n.entities[l.target]?`<button class="game-action" data-entity="${l.target}">查看现场</button>`:ye("处理待办","events"))+ye("返回复盘","evening"))}if(e==="tasks-data"||e==="career"){const s=e==="career",a=s?Xc(n):i.tasks,o=gi(s?t.careerPage:t.taskPage,a.length),l=a[o];if(!l)return Ve("奖励",Ge("front","目前没有可领取目标","经营主线与酒店成长会继续记录。"),ye("当前目标","tasks"));const c="paid"in l&&typeof l.paid=="number"?l.paid:0,u=Math.max(0,l.reward-c);return Ve(s?"长期里程碑":"日常支线奖励",An(s?"careerPage":"taskPage",o,a.length)+Ge("front",l.title,s?"日常经营逐步积累；长期目标不会随交班重置。":"奖金按进度分段到账；完成后领取尾款。")+Xe([["进度",Math.min(l.progress,l.goal)+" / "+l.goal],["奖金上限",Ke(l.reward)],["已到账",Ke(l.claimed?l.reward:c)]])+`<progress max="${l.goal}" value="${Math.min(l.progress,l.goal)}"></progress>`,(l.claimed?ye("当前目标","tasks"):l.progress>=l.goal?Pe(s?"领取奖励":"领取尾款 · "+Ke(u),s?"claim-career":"claim",l.id):ye("去完成","target"in l?String(l.target):"hub"))+ye(s?"日常奖励":"长期里程碑",s?"tasks-data":"career")+ye("三日带教","teaching"))}if(e==="teaching"){const s=Rd(n),a=gi(t.taskPage,s.length),o=s[a];return Ve("Day "+i.day+" · 部门带教",o?An("taskPage",a,s.length)+Ge("front",o.title,o.text)+Xe([["当前步骤",o.done?"已完成":"待完成"],["今日带教",s.filter(l=>l.done).length+" / "+s.length]])+jr("完成当前步骤后继续下一步；第 1–3 天结束后仍可跟随经营主线。"):Ge("front","三日带教已结束","主管会继续根据酒店现场给出建议。"),ye(o?"去实践":"当前目标",o?.target??"tasks")+ye("返回经营","hub"))}if(e==="log"){const s=["全部","客诉","收益","房态","部门","升级","入住"],a=s.includes(t.archiveTab)?t.archiveTab:"全部",o=[...i.logs].reverse().filter(u=>a==="全部"||u.category===a),l=gi(t.logPage,o.length),c=o[l];return Ve("经营日志",sn(s.map(u=>Qt(u,"archiveTab",u,u===a)).join(""))+An("logPage",l,o.length)+(c?jn("Day "+c.day+" · "+Qr(c.minute)+" · "+c.category,c.text):Ge("revenue","暂无记录","经营决定和现场结果会自动记录在这里。")),(c?.target&&n.entities[c.target]?`<button class="game-action" data-entity="${c.target}">查看现场</button>`:ye("查看当前待办","events"))+ye("经营看板","hub"))}return e==="settings"?Ve("存档与设置",Ge("front","继续经营，从这里妥善交班","进度自动保存在当前浏览器；导出备份可留存酒店状态。")+Xe([["当前进度","Day "+i.day],["存档","浏览器自动保存"]])+jr("新开存档会弹出确认，并清除本浏览器当前 v8 进度。"),Pe("导出备份","export")+Pe("新开酒店","reset")+ye("返回经营","hub")):e==="hotel-archive"?Ve("酒店 · 空间总览",Xe([["已配置",String(it(n).length)+" 间"],["待翻房",String(it(n).filter(s=>s.status==="dirty").length)+" 间"],["施工楼层",String(n.floors.filter(s=>s.construction).length)]])+Ge("engineering","先用好现有空间，再增加容量","房态页选择楼层和房间；扩建交付空位，玩家逐间配置。"),ye("房态与装修","hotel")+ye("扩建一层","hotel-data")+ye("公区设施","development")):Ve("经营入口已更新",Ge("front","从统一导航继续","所有日常操作都在五个部门入口中。"),ye("经营看板","hub"))}function Pd(n,e){const t=new wd,i=$=>n.querySelector($),r=n.querySelector("dialog"),s=i("#sheet-content"),a=i("#sheet-eye");let o=()=>{},l=null;const c=i(".sheet-top"),u=document.createElement("button");u.className="sheet-back",u.textContent="‹",u.dataset.menuBack="true",u.setAttribute("aria-label","返回上一页"),c.prepend(u);const f=document.createElement("nav");f.className="module-tabs",f.setAttribute("aria-label","当前部门功能"),s.before(f);const d=document.createElement("p");d.className="action-feedback",d.setAttribute("role","status"),d.hidden=!0,s.before(d);const h=document.createElement("div");h.className="fixed-actions",s.after(h);const p=document.createElement("nav");p.className="sheet-navigation",p.setAttribute("aria-label","切换管理部门"),h.after(p);const x=document.createElement("div");x.className="reward-toast",x.setAttribute("role","status"),n.append(x);let m=e.getState().game?.rewardBeat?.id;const g=()=>Wa.map(([$,W])=>`<button data-open="${$}" data-root-menu="true" aria-label="${W}" aria-pressed="${r.open&&Ls(t.current.view)===$}">${Sd($)}<span>${W}</span></button>`).join(""),A=()=>{i(".main-nav").innerHTML=g(),p.innerHTML=`<div class="menu-tabs">${g()}</div>`},C=()=>{t.current.scroll=s.scrollTop},b=()=>{const{view:$,selection:W}=t.current,re=e.getState();a.textContent=Wa.find(([_e])=>_e===Ls($))?.[1]+" / "+(jc[$]??"酒店经营"),u.hidden=!t.canBack,f.innerHTML=Td($).map(([_e,q])=>`<button data-open="${_e}" aria-current="${$===_e?"page":"false"}">${q}</button>`).join(""),s.innerHTML=Ed(re,$,W)??Cd(re,$,W),h.replaceChildren();const Ee=s.querySelector(".focus-footer");Ee&&h.append(Ee),r.classList.add("focus-layout","management-shell"),r.dataset.view=$,(h.querySelector("[data-action]:not([disabled])")??h.querySelector("button"))?.classList.add("decision-primary"),r.open||(l=document.activeElement,r.showModal()),s.scrollTop=t.current.scroll,r.scrollTop=0,A()},w=($,W=!1)=>{C(),t.visit($,W),d.hidden=!0,b()},T=$=>{const W=e.getState(),re=W.entities[$];if(!re)return;C(),t.visit(re.kind==="room"?"hotel":"development");const Ee=t.current.selection;t.current.selected=$,re.kind==="room"?(Ee.room=$,Ee.floor=re.floorId):Ee.facility=$,d.hidden=!0,b()},R=()=>{d.textContent=e.getState().game.notice,d.hidden=!d.textContent},_=()=>{C(),t.clear(),r.close(),d.hidden=!0;const $=e.getState().game;$.evening?.open&&e.dispatch({type:"evening-close"}),$.operations?.briefOpen&&e.dispatch({type:"brief-start"}),e.select(null),A(),l?.isConnected&&l.focus()},E=()=>{if(e.getState().game.reportOpen&&t.current.view==="report"){e.dispatch({type:"continue"}),w("brief",!0);return}_()};i(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',i(".world-caption").textContent="轻点空间 · 查看问题与决定",i(".property-name small").id="game-time",i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip").removeAttribute("data-focus"),i(".event-strip").setAttribute("data-open","events"),i(".speed-control").insertAdjacentHTML("beforeend",Pe("Ⅱ","pause"));let D=!1;const P=($,W)=>{const re=r.getBoundingClientRect();return $<re.left||$>re.right||W<re.top||W>re.bottom};r.addEventListener("pointerdown",$=>{D=$.target===r&&P($.clientX,$.clientY)}),r.addEventListener("click",$=>{D&&$.target===r&&P($.clientX,$.clientY)&&E(),D=!1}),r.addEventListener("cancel",$=>{$.preventDefault(),E()}),n.addEventListener("click",$=>{const W=$.target.closest("button");if(!W||W.disabled)return;if(W.matches(".close-sheet")){E();return}if(W.dataset.menuBack){C(),t.back(),d.hidden=!0,b();return}const re=t.current.selection;if(W.dataset.focusKey){const _e=W.dataset.focusKey,q=W.dataset.focusValue??"";if(!(_e in re)&&!["room","floor","department","facility","guest","event","profile"].includes(_e))return;re[_e]=_e.endsWith("Page")?Math.max(0,Number(q)||0):q,_e==="floor"&&(re.room=void 0),_e==="guestPage"&&(re.guest=void 0,re.roomPage=0),_e==="eventPage"&&(re.event=void 0),_e==="profilePage"&&(re.profile=void 0),_e==="archiveTab"&&(re.logPage=0),t.current.scroll=0,d.hidden=!0,b();return}if(W.dataset.open){C();const _e=t.current.selection.room;t.visit(W.dataset.open,!!W.dataset.rootMenu),W.dataset.open==="room-data"&&_e&&(t.current.selection.room=_e);const q=t.current.selection;W.dataset.assignRoom&&(q.room=W.dataset.assignRoom,q.roomPage=0),W.dataset.guest&&(q.guest=W.dataset.guest,q.event=W.dataset.guest,q.roomPage=0),W.dataset.profile&&(q.profile=W.dataset.profile,q.logPage=0),d.hidden=!0,b();return}if(W.dataset.entity){T(W.dataset.entity),o(e.getState().entities[W.dataset.entity].floorId);return}if(W.dataset.floor){_(),e.focusFloor(W.dataset.floor),o(W.dataset.floor);return}if(W.dataset.speed){e.setSpeed(Number(W.dataset.speed));return}if(W.matches(".weather")){const _e=["dusk","night","day"];e.setAtmosphere(_e[(_e.indexOf(e.getState().atmosphere)+1)%3]);return}const Ee=W.dataset.action;if(!Ee)return;if(Ee==="reset"){document.dispatchEvent(new Event("new-game"));return}if(Ee==="export"){const _e=document.createElement("a");_e.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),_e.download="jinwan-v8-save.json",_e.click(),setTimeout(()=>URL.revokeObjectURL(_e.href),500);return}const et={type:Ee,id:W.dataset.id,value:W.dataset.value};if(Ee==="checkin"&&(et.roomId=W.dataset.room),Ee==="price"&&(et.value=W.dataset.value||Number(n.querySelector("#price-input")?.value)),C(),e.dispatch(et),Ee==="brief-start"||Ee==="evening-close"){_();return}if(Ee==="continue"){w("brief",!0);return}if(Ee==="checkin"){const _e=e.getState().guests.find(q=>q.id===et.id);_e?.roomId&&(_e.challenge&&!_e.challenge.resolved||_e.occasion&&!_e.occasion.resolved)&&(t.visit("events"),t.current.selection.event=_e.id)}r.open&&(b(),R())});let F=null,Y="",Q="",B=0,J=0,V=0,te="";const se=()=>{const $=e.getState(),W=$.game;i(".score-button").innerHTML=`<i style="--score:${Fr($).total}%"></i> ${Fr($).total} 分 ›`,i("#cash").textContent=Ke($.metrics.cash),i("#reputation").textContent=String($.metrics.reputation),i("#owner").textContent=String($.metrics.owner),i("#suite-count").textContent=kc($)+" 间",i("#game-time").textContent=`${Jc(W.day)} · Day ${W.day} ${pd(W.minute)}${W.paused?" · 暂停":""}`,i("#occupancy").textContent=`${Bc($)}/${it($).length} 在住 · 收入 ${Ke(W.revenue)}`;const re=ai($),Ee=W.campaign;i(".today-hint").setAttribute("data-open","tasks"),i(".today-hint span:nth-child(2)").textContent=re?Ee?.result?Ee.result.passed?"检验通过 · 开启下一阶段":"检验待改善 · 免费重约":Ee?.inspection?Ee.inspection.phase==="visiting"?"现场体验中 · 等待回访":re.exam+" · 已预约":re.ready?"目标达成 · 预约"+re.exam:re.action:"主线完成 · 自由经营",i("#task-count").textContent=re?re.progress+"/"+re.goal:"5 / 5";const et=JSON.stringify([Ee?.chapter,re?.progress,Ee?.result,Ee?.inspection?.phase,Ee?.inspection?.prepared]);r.open&&t.current.view==="tasks"&&te!==et&&b(),te=et,W.rewardBeat&&W.rewardBeat.id!==m&&(m=W.rewardBeat.id,x.textContent="＋"+Ke(W.rewardBeat.amount)+" · "+W.rewardBeat.text,x.classList.remove("show"),x.offsetWidth,x.classList.add("show"));const _e=W.events.length||$.guests.some(ie=>!ie.departing&&ie.roomId&&(ie.late==="pending"||ie.challenge&&!ie.challenge.resolved||ie.occasion&&!ie.occasion.resolved));i(".event-strip span").textContent=$.guests.some(ie=>ie.occasion&&!ie.occasion.resolved&&!ie.departing&&ie.roomId)?"住客今天过生日 · 礼遇待决定":_e?"现场有服务诉求待处理":Pi($).length?`${Pi($).length} 位住客等待入住`:"酒店运营平稳",i(".event-strip b").textContent=_e?"处理 ›":"前台 ›",i(".event-strip").setAttribute("data-open",_e?"events":"front"),i(".review-strip span").textContent=W.reportOpen?"今日已结算 · 查看日结并开始下一天":W.notice,i(".review-strip").setAttribute("data-open",W.reportOpen?"report":"log"),i(".weather span").textContent=W.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(ie=>{ie.classList.toggle("active",Number(ie.dataset.speed)===$.speed),ie.setAttribute("aria-pressed",String(Number(ie.dataset.speed)===$.speed))});const q=$.floors.map(ie=>ie.id).join(",");Y!==q&&(Y=q,i(".floor-rail").innerHTML=[...$.floors].reverse().map(ie=>`<button data-floor="${ie.id}" aria-label="前往${ie.label} ${ie.name}">${ie.label}</button>`).join("")),$.selectedId&&$.selectedId!==F&&T($.selectedId),F=$.selectedId,W.operations?.briefOpen&&J!==W.day&&(J=W.day,w("brief",!0),t.current.selection.meeting="overview",b()),W.evening?.open&&V!==W.evening.day&&(V=W.evening.day,w("evening",!0)),W.reportOpen&&B!==W.day&&(B=W.day,w("report",!0)),Q!==W.notice&&(Q=W.notice),A()};return e.subscribe(se),se(),{stage:i(".world-stage"),setFocusHandler:$=>{o=$},showError:$=>{s.innerHTML=`<section class="focus-screen"><h2>画面暂时不可用</h2><div class="focus-main"><p>${ot($)}</p></div></section>`,h.innerHTML="",r.showModal()}}}function Id(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return Pd(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(p,x)=>{r.textContent=p,i.innerHTML=x,t.open||(a=document.activeElement,t.showModal())},u=p=>{const x=e.getState(),m=x.entities[p];if(!m)return;const g=Ml(x,p);if(m.kind==="room"){const A=x.guests.find(C=>C.id===m.guestId);c("HYATT PLACE · "+g.label,`<h2>${m.number}<span>${m.type==="suite"?"开放式套房":m.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${m.status}">${Md[m.status]}</div><dl><div><dt>住客</dt><dd>${A?A.name+" · "+A.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${m.nightsLeft?m.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${g.label} · ${g.name}</dd></div></dl>${A?"<blockquote>“"+A.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${g.id}">回到 ${m.number} 的楼层</button>`)}else{const A={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+g.label,`<h2>${m.name}</h2><p>${A[m.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${m.usage} / ${m.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${m.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${m.quality} / ${m.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${g.id}">回到${m.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const p=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...p.floors].reverse().map(x=>`<button data-return="${x.id}"><b>${x.label}</b><span>${x.name}</span><small>${x.entityIds.length>1?x.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const p=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([x,m,g])=>`<button data-focus="${x}"><b>${p.visited.includes(x)?"✓":"○"}</b><span>${m}<small>${g}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const p=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(p.visited.length?[...p.visited].reverse().map(x=>{const m=p.entities[x];return`<button data-focus="${x}"><span>${m.kind==="room"?m.number+" 房间":m.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",p=>{const x=p.target.closest("button");if(x){if(x.matches(".close-sheet")&&l(),x.dataset.open&&(e.select(null),s=x.dataset.open,f[s]?.()),x.dataset.speed&&e.setSpeed(Number(x.dataset.speed)),x.dataset.return){const m=x.dataset.return;l(),e.focusFloor(m),o(m)}if(x.dataset.focus){const m=x.dataset.focus,g=Ml(e.getState(),m);l(),g&&(e.focusFloor(g.id),o(g.id)),e.select(m)}if(x.dataset.floor&&(e.focusFloor(x.dataset.floor),o(x.dataset.floor)),x.dataset.atmosphere&&(e.setAtmosphere(x.dataset.atmosphere),l()),x.matches(".weather")){const m=["dusk","night","day"];e.setAtmosphere(m[(m.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",p=>{p.preventDefault(),l()}),t.addEventListener("click",p=>{if(p.target===t){const x=t.getBoundingClientRect();(p.clientX<x.left||p.clientX>x.right||p.clientY<x.top||p.clientY>x.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(p=>`<button data-floor="${p.id}" aria-label="前往${p.label} ${p.name}">${p.label}</button>`).join("");let d=null;const h=p=>{n.querySelector("#cash").textContent="¥"+p.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(p.metrics.reputation),n.querySelector("#owner").textContent=String(p.metrics.owner),n.querySelector("#suite-count").textContent=kc(p)+" 间",n.querySelector("#occupancy").textContent=`${it(p).length} 间客房 · ${Bc(p)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(x=>p.visited.includes(x)).length+"/3",n.querySelectorAll("[data-speed]").forEach(x=>{x.classList.toggle("active",Number(x.dataset.speed)===p.speed),x.setAttribute("aria-pressed",String(Number(x.dataset.speed)===p.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[p.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[p.atmosphere],n.querySelectorAll("[data-floor]").forEach(x=>x.classList.toggle("active",x.dataset.floor===p.focusedFloorId)),p.selectedId&&p.selectedId!==d&&(s="entity",u(p.selectedId)),d=p.selectedId};return e.subscribe(h),h(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:p=>{o=p},showError:p=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+p+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="185",Ld=0,Pl=1,Dd=2,Ts=1,eu=2,Cr=3,hi=0,Yt=1,zn=2,Vn=0,sr=1,Il=2,Ll=3,Dl=4,Ud=5,Si=100,Nd=101,Fd=102,Od=103,kd=104,Bd=200,zd=201,Gd=202,Hd=203,Xa=204,$a=205,Vd=206,Wd=207,Xd=208,$d=209,qd=210,Yd=211,Kd=212,Zd=213,Jd=214,qa=0,Ya=1,Ka=2,lr=3,Za=4,Ja=5,Qa=6,ja=7,tu=0,Qd=1,jd=2,Pn=0,nu=1,iu=2,ru=3,Yo=4,su=5,au=6,ou=7,lu=300,Ii=301,cr=302,ea=303,ta=304,Hs=306,Ds=1e3,Hn=1001,eo=1002,Lt=1003,ef=1004,es=1005,Ot=1006,na=1007,Ti=1008,jt=1009,cu=1010,uu=1011,kr=1012,Ko=1013,Ln=1014,mn=1015,Xn=1016,Zo=1017,Jo=1018,Br=1020,du=35902,fu=35899,hu=1021,pu=1022,gn=1023,$n=1026,Ai=1027,Qo=1028,jo=1029,Li=1030,el=1031,tl=1033,As=33776,ws=33777,Rs=33778,Cs=33779,to=35840,no=35841,io=35842,ro=35843,so=36196,ao=37492,oo=37496,lo=37488,co=37489,Us=37490,uo=37491,fo=37808,ho=37809,po=37810,mo=37811,go=37812,vo=37813,_o=37814,xo=37815,Mo=37816,bo=37817,So=37818,yo=37819,Eo=37820,To=37821,Ao=36492,wo=36494,Ro=36495,Co=36283,Po=36284,Ns=36285,Io=36286,tf=3200,Lo=0,nf=1,li="",Xt="srgb",Fs="srgb-linear",Os="linear",st="srgb",Bi=7680,Ul=519,rf=512,sf=513,af=514,nl=515,of=516,lf=517,il=518,cf=519,Nl=35044,Fl="300 es",Cn=2e3,zr=2001;function uf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function df(){const n=ks("canvas");return n.style.display="block",n}const Ol={};function kl(...n){const e="THREE."+n.shift();console.log(e,...n)}function mu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function De(...n){n=mu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ze(...n){n=mu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ar(...n){const e=n.join(" ");e in Ol||(Ol[e]=!0,De(...n))}function ff(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const hf={[qa]:Ya,[Ka]:Qa,[Za]:ja,[lr]:Ja,[Ya]:qa,[Qa]:Ka,[ja]:Za,[Ja]:lr};class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ia=Math.PI/180,Do=180/Math.PI;function Hr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function pf(n,e){return(n%e+e)%e}function ra(n,e,t){return(1-t)*n+t*e}function xr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class $e{static{$e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class pr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],h=s[a+1],p=s[a+2],x=s[a+3];if(f!==x||l!==d||c!==h||u!==p){let m=l*d+c*h+u*p+f*x;m<0&&(d=-d,h=-h,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){const A=Math.acos(m),C=Math.sin(A);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C,l=l*g+d*o,c=c*g+h*o,u=u*g+p*o,f=f*g+x*o}else{l=l*g+d*o,c=c*g+h*o,u=u*g+p*o,f=f*g+x*o;const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],h=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*h-c*d,e[t+1]=l*p+u*d+c*f-o*h,e[t+2]=c*p+u*h+o*d-l*f,e[t+3]=u*p-o*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),h=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"YXZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"ZXY":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"ZYX":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"YZX":this._x=d*u*f+c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f-d*h*p;break;case"XZY":this._x=d*u*f-c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f+d*h*p;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>f){const h=2*Math.sqrt(1+i-o-f);this._w=(u-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>f){const h=2*Math.sqrt(1+o-i-f);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{static{k.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return sa.copy(this).projectOnVector(e),this.sub(sa)}reflect(e){return this.sub(sa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sa=new k,Bl=new pr;class Ne{static{Ne.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],h=i[5],p=i[8],x=r[0],m=r[3],g=r[6],A=r[1],C=r[4],b=r[7],w=r[2],T=r[5],R=r[8];return s[0]=a*x+o*A+l*w,s[3]=a*m+o*C+l*T,s[6]=a*g+o*b+l*R,s[1]=c*x+u*A+f*w,s[4]=c*m+u*C+f*T,s[7]=c*g+u*b+f*R,s[2]=d*x+h*A+p*w,s[5]=d*m+h*C+p*T,s[8]=d*g+h*b+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,h=c*s-a*l,p=t*f+i*d+r*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=f*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=h*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ar("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(aa.makeScale(e,t)),this}rotate(e){return ar("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(aa.makeRotation(-e)),this}translate(e,t){return ar("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const aa=new Ne,zl=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gl=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mf(){const n={enabled:!0,workingColorSpace:Fs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===st&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(r.r=or(r.r),r.g=or(r.g),r.b=or(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===li?Os:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ar("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ar("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Fs]:{primaries:e,whitePoint:i,transfer:Os,toXYZ:zl,fromXYZ:Gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:st,toXYZ:zl,fromXYZ:Gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const qe=mf();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let zi;class gf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{zi===void 0&&(zi=ks("canvas")),zi.width=e.width,zi.height=e.height;const r=zi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=zi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ks("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Wn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wn(t[i]/255)*255):t[i]=Wn(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vf=0;class rl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(oa(r[a].image)):s.push(oa(r[a]))}else s=oa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function oa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?gf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let _f=0;const la=new k;class Gt extends Ui{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=Hn,r=Hn,s=Ot,a=Ti,o=gn,l=jt,c=Gt.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Hr(),this.name="",this.source=new rl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(la).x}get height(){return this.source.getSize(la).y}get depth(){return this.source.getSize(la).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ds:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ds:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=lu;Gt.DEFAULT_ANISOTROPY=1;class pt{static{pt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,b=(h+1)/2,w=(g+1)/2,T=(u+d)/4,R=(f+x)/4,_=(p+m)/4;return C>b&&C>w?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=T/i,s=R/i):b>w?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=T/r,s=_/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=R/s,r=_/s),this.set(i,r,s,t),this}let A=Math.sqrt((m-p)*(m-p)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(m-p)/A,this.y=(f-x)/A,this.z=(d-u)/A,this.w=Math.acos((c+h+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xf extends Ui{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Gt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new rl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends xf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class gu extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mf extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dt{static{dt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,d,h,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,h,p,x,m)}set(e,t,i,r,s,a,o,l,c,u,f,d,h,p,x,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=d,g[3]=h,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),s=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=h+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+h*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d+x*o,t[4]=p*o-h,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d-x*o,t[4]=-a*f,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=p*c-h,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=h*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-d*f,t[8]=p*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*f+p,t[10]=d-x*f}else if(e.order==="XZY"){const d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=a*u,t[9]=h*f-p,t[2]=p*f-h,t[6]=o*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bf,e,Sf)}lookAt(e,t,i){const r=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),ei.crossVectors(i,Zt),ei.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),ei.crossVectors(i,Zt)),ei.normalize(),ts.crossVectors(Zt,ei),r[0]=ei.x,r[4]=ts.x,r[8]=Zt.x,r[1]=ei.y,r[5]=ts.y,r[9]=Zt.y,r[2]=ei.z,r[6]=ts.z,r[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],h=i[13],p=i[2],x=i[6],m=i[10],g=i[14],A=i[3],C=i[7],b=i[11],w=i[15],T=r[0],R=r[4],_=r[8],E=r[12],D=r[1],P=r[5],F=r[9],Y=r[13],Q=r[2],B=r[6],J=r[10],V=r[14],te=r[3],se=r[7],$=r[11],W=r[15];return s[0]=a*T+o*D+l*Q+c*te,s[4]=a*R+o*P+l*B+c*se,s[8]=a*_+o*F+l*J+c*$,s[12]=a*E+o*Y+l*V+c*W,s[1]=u*T+f*D+d*Q+h*te,s[5]=u*R+f*P+d*B+h*se,s[9]=u*_+f*F+d*J+h*$,s[13]=u*E+f*Y+d*V+h*W,s[2]=p*T+x*D+m*Q+g*te,s[6]=p*R+x*P+m*B+g*se,s[10]=p*_+x*F+m*J+g*$,s[14]=p*E+x*Y+m*V+g*W,s[3]=A*T+C*D+b*Q+w*te,s[7]=A*R+C*P+b*B+w*se,s[11]=A*_+C*F+b*J+w*$,s[15]=A*E+C*Y+b*V+w*W,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],p=e[3],x=e[7],m=e[11],g=e[15],A=l*h-c*d,C=o*h-c*f,b=o*d-l*f,w=a*h-c*u,T=a*d-l*u,R=a*f-o*u;return t*(x*A-m*C+g*b)-i*(p*A-m*w+g*T)+r*(p*C-x*w+g*R)-s*(p*b-x*T+m*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],p=e[12],x=e[13],m=e[14],g=e[15],A=t*o-i*a,C=t*l-r*a,b=t*c-s*a,w=i*l-r*o,T=i*c-s*o,R=r*c-s*l,_=u*x-f*p,E=u*m-d*p,D=u*g-h*p,P=f*m-d*x,F=f*g-h*x,Y=d*g-h*m,Q=A*Y-C*F+b*P+w*D-T*E+R*_;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/Q;return e[0]=(o*Y-l*F+c*P)*B,e[1]=(r*F-i*Y-s*P)*B,e[2]=(x*R-m*T+g*w)*B,e[3]=(d*T-f*R-h*w)*B,e[4]=(l*D-a*Y-c*E)*B,e[5]=(t*Y-r*D+s*E)*B,e[6]=(m*b-p*R-g*C)*B,e[7]=(u*R-d*b+h*C)*B,e[8]=(a*F-o*D+c*_)*B,e[9]=(i*D-t*F-s*_)*B,e[10]=(p*T-x*b+g*A)*B,e[11]=(f*b-u*T-h*A)*B,e[12]=(o*E-a*P-l*_)*B,e[13]=(t*P-i*E+r*_)*B,e[14]=(x*C-p*w-m*A)*B,e[15]=(u*w-f*C+d*A)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,h=s*u,p=s*f,x=a*u,m=a*f,g=o*f,A=l*c,C=l*u,b=l*f,w=i.x,T=i.y,R=i.z;return r[0]=(1-(x+g))*w,r[1]=(h+b)*w,r[2]=(p-C)*w,r[3]=0,r[4]=(h-b)*T,r[5]=(1-(d+g))*T,r[6]=(m+A)*T,r[7]=0,r[8]=(p+C)*R,r[9]=(m-A)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Gi.set(r[0],r[1],r[2]).length();const o=Gi.set(r[4],r[5],r[6]).length(),l=Gi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ln.copy(this);const c=1/a,u=1/o,f=1/l;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,t.setFromRotationMatrix(ln),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=Cn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let p,x;if(l)p=s/(a-s),x=a*s/(a-s);else if(o===Cn)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===zr)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Cn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),h=-(i+r)/(i-r);let p,x;if(l)p=1/(a-s),x=a/(a-s);else if(o===Cn)p=-2/(a-s),x=-(a+s)/(a-s);else if(o===zr)p=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Gi=new k,ln=new dt,bf=new k(0,0,0),Sf=new k(1,1,1),ei=new k,ts=new k,Zt=new k,Hl=new dt,Vl=new pr;class pi{constructor(e=0,t=0,i=0,r=pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Hl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pi.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yf=0;const Wl=new k,Hi=new pr,Un=new dt,ns=new k,Mr=new k,Ef=new k,Tf=new pr,Xl=new k(1,0,0),$l=new k(0,1,0),ql=new k(0,0,1),Yl={type:"added"},Af={type:"removed"},Vi={type:"childadded",child:null},ca={type:"childremoved",child:null};class Dt extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=Hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new k,t=new pi,i=new pr,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ne}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(Xl,e)}rotateY(e){return this.rotateOnAxis($l,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xl,e)}translateY(e){return this.translateOnAxis($l,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ns.copy(e):ns.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Mr,ns,this.up):Un.lookAt(ns,Mr,this.up),this.quaternion.setFromRotationMatrix(Un),r&&(Un.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(Un),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yl),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Af),ca.child=e,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yl),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,Ef),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Tf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Dt.DEFAULT_UP=new k(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class kt extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wf={type:"move"};class ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,p=.005;c.inputState.pinching&&d>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new kt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},is={h:0,s:0,l:0};function da(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=pf(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=da(a,s,e+1/3),this.g=da(a,s,e),this.b=da(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Xt){function i(s){s!==void 0&&parseFloat(s)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=vu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return qe.workingToColorSpace(Ft.copy(this),e),Math.round(Ye(Ft.r*255,0,255))*65536+Math.round(Ye(Ft.g*255,0,255))*256+Math.round(Ye(Ft.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Ft.copy(this),t);const i=Ft.r,r=Ft.g,s=Ft.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Xt){qe.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,r=Ft.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(is);const i=ra(ti.h,is.h,t),r=ra(ti.s,is.s,t),s=ra(ti.l,is.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Je;Je.NAMES=vu;class Rf extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const cn=new k,Nn=new k,fa=new k,Fn=new k,Wi=new k,Xi=new k,Kl=new k,ha=new k,pa=new k,ma=new k,ga=new pt,va=new pt,_a=new pt;class hn{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Nn.subVectors(i,t),fa.subVectors(e,t);const a=cn.dot(cn),o=cn.dot(Nn),l=cn.dot(fa),c=Nn.dot(Nn),u=Nn.dot(fa),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,h=(c*l-o*u)*d,p=(a*u-o*l)*d;return s.set(1-h-p,p,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ga.setScalar(0),va.setScalar(0),_a.setScalar(0),ga.fromBufferAttribute(e,t),va.fromBufferAttribute(e,i),_a.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ga,s.x),a.addScaledVector(va,s.y),a.addScaledVector(_a,s.z),a}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Nn.subVectors(e,t),cn.cross(Nn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),cn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Wi.subVectors(r,i),Xi.subVectors(s,i),ha.subVectors(e,i);const l=Wi.dot(ha),c=Xi.dot(ha);if(l<=0&&c<=0)return t.copy(i);pa.subVectors(e,r);const u=Wi.dot(pa),f=Xi.dot(pa);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Wi,a);ma.subVectors(e,s);const h=Wi.dot(ma),p=Xi.dot(ma);if(p>=0&&h<=p)return t.copy(s);const x=h*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(Xi,o);const m=u*p-h*f;if(m<=0&&f-u>=0&&h-p>=0)return Kl.subVectors(s,r),o=(f-u)/(f-u+(h-p)),t.copy(r).addScaledVector(Kl,o);const g=1/(m+x+d);return a=x*g,o=d*g,t.copy(i).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ni{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),rs.copy(i.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),ss.subVectors(this.max,br),$i.subVectors(e.a,br),qi.subVectors(e.b,br),Yi.subVectors(e.c,br),ni.subVectors(qi,$i),ii.subVectors(Yi,qi),vi.subVectors($i,Yi);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-vi.z,vi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,vi.z,0,-vi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-vi.y,vi.x,0];return!xa(t,$i,qi,Yi,ss)||(t=[1,0,0,0,1,0,0,0,1],!xa(t,$i,qi,Yi,ss))?!1:(as.crossVectors(ni,ii),t=[as.x,as.y,as.z],xa(t,$i,qi,Yi,ss))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const On=[new k,new k,new k,new k,new k,new k,new k,new k],un=new k,rs=new Ni,$i=new k,qi=new k,Yi=new k,ni=new k,ii=new k,vi=new k,br=new k,ss=new k,as=new k,_i=new k;function xa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){_i.fromArray(n,s);const o=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),l=e.dot(_i),c=t.dot(_i),u=i.dot(_i);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Et=new k,os=new $e;let Cf=0;class _n extends Ui{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Nl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)os.fromBufferAttribute(this,t),os.applyMatrix3(e),this.setXY(t,os.x,os.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=xr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Nl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class _u extends _n{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class xu extends _n{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ht extends _n{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Pf=new Ni,Sr=new k,Ma=new k;class Vr{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Pf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);const t=Sr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Sr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Ma)),this.expandByPoint(Sr.copy(e.center).sub(Ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let If=0;const tn=new dt,ba=new Dt,Ki=new k,Jt=new Ni,yr=new Ni,Ct=new k;class xn extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uf(e)?xu:_u)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,i){return tn.makeTranslation(e,t,i),this.applyMatrix4(tn),this}scale(e,t,i){return tn.makeScale(e,t,i),this.applyMatrix4(tn),this}lookAt(e){return ba.lookAt(e),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ht(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];yr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(Jt.min,yr.min),Jt.expandByPoint(Ct),Ct.addVectors(Jt.max,yr.max),Jt.expandByPoint(Ct)):(Jt.expandByPoint(yr.min),Jt.expandByPoint(yr.max))}Jt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ct.fromBufferAttribute(o,c),l&&(Ki.fromBufferAttribute(e,c),Ct.add(Ki)),r=Math.max(r,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new _n(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new k,l[_]=new k;const c=new k,u=new k,f=new k,d=new $e,h=new $e,p=new $e,x=new k,m=new k;function g(_,E,D){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,D),d.fromBufferAttribute(s,_),h.fromBufferAttribute(s,E),p.fromBufferAttribute(s,D),u.sub(c),f.sub(c),h.sub(d),p.sub(d);const P=1/(h.x*p.y-p.x*h.y);isFinite(P)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(f,-h.y).multiplyScalar(P),m.copy(f).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(P),o[_].add(x),o[E].add(x),o[D].add(x),l[_].add(m),l[E].add(m),l[D].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let _=0,E=A.length;_<E;++_){const D=A[_],P=D.start,F=D.count;for(let Y=P,Q=P+F;Y<Q;Y+=3)g(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const C=new k,b=new k,w=new k,T=new k;function R(_){w.fromBufferAttribute(r,_),T.copy(w);const E=o[_];C.copy(E),C.sub(w.multiplyScalar(w.dot(E))).normalize(),b.crossVectors(T,E);const P=b.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,P)}for(let _=0,E=A.length;_<E;++_){const D=A[_],P=D.start,F=D.count;for(let Y=P,Q=P+F;Y<Q;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const r=new k,s=new k,a=new k,o=new k,l=new k,c=new k,u=new k,f=new k;if(e)for(let d=0,h=e.count;d<h;d+=3){const p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let h=0,p=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?h=l[x]*o.data.stride+o.offset:h=l[x]*u;for(let g=0;g<u;g++)d[p++]=c[h++]}return new _n(d,u,f)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=e(d,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Lf=0;class Wr extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Hr(),this.name="",this.type="Material",this.blending=sr,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=$a,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==sr&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xa&&(i.blendSrc=this.blendSrc),this.blendDst!==$a&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kn=new k,Sa=new k,ls=new k,ri=new k,ya=new k,cs=new k,Ea=new k;class Mu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Sa.copy(e).add(t).multiplyScalar(.5),ls.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(Sa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ls),o=ri.dot(this.direction),l=-ri.dot(ls),c=ri.lengthSq(),u=Math.abs(1-a*a);let f,d,h,p;if(u>0)if(f=a*l-o,d=a*o-l,p=s*u,f>=0)if(d>=-p)if(d<=p){const x=1/u;f*=x,d*=x,h=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d<=-p?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c):d<=p?(f=0,d=Math.min(Math.max(-s,-l),s),h=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Sa).addScaledVector(ls,d),h}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const i=kn.dot(this.direction),r=kn.dot(kn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,i,r,s){ya.subVectors(t,e),cs.subVectors(i,e),Ea.crossVectors(ya,cs);let a=this.direction.dot(Ea),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ri.subVectors(this.origin,e);const l=o*this.direction.dot(cs.crossVectors(ri,cs));if(l<0)return null;const c=o*this.direction.dot(ya.cross(ri));if(c<0||l+c>a)return null;const u=-o*ri.dot(Ea);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xr extends Wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=tu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zl=new dt,xi=new Mu,us=new Vr,Jl=new k,ds=new k,fs=new k,hs=new k,Ta=new k,ps=new k,Ql=new k,ms=new k;class Pt extends Dt{constructor(e=new xn,t=new Xr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ps.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Ta.fromBufferAttribute(f,e),a?ps.addScaledVector(Ta,u):ps.addScaledVector(Ta.sub(t),u))}t.add(ps)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),us.copy(i.boundingSphere),us.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(us.containsPoint(xi.origin)===!1&&(xi.intersectSphere(us,Jl)===null||xi.origin.distanceToSquared(Jl)>(e.far-e.near)**2))&&(Zl.copy(s).invert(),xi.copy(e.ray).applyMatrix4(Zl),!(i.boundingBox!==null&&xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=a[m.materialIndex],A=Math.max(m.start,h.start),C=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let b=A,w=C;b<w;b+=3){const T=o.getX(b),R=o.getX(b+1),_=o.getX(b+2);r=gs(this,g,e,i,c,u,f,T,R,_),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){const A=o.getX(m),C=o.getX(m+1),b=o.getX(m+2);r=gs(this,a,e,i,c,u,f,A,C,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=a[m.materialIndex],A=Math.max(m.start,h.start),C=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let b=A,w=C;b<w;b+=3){const T=b,R=b+1,_=b+2;r=gs(this,g,e,i,c,u,f,T,R,_),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){const A=m,C=m+1,b=m+2;r=gs(this,a,e,i,c,u,f,A,C,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Df(n,e,t,i,r,s,a,o){let l;if(e.side===Yt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===hi,o),l===null)return null;ms.copy(o),ms.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ms);return c<t.near||c>t.far?null:{distance:c,point:ms.clone(),object:n}}function gs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ds),n.getVertexPosition(l,fs),n.getVertexPosition(c,hs);const u=Df(n,e,t,i,ds,fs,hs,Ql);if(u){const f=new k;hn.getBarycoord(Ql,ds,fs,hs,f),r&&(u.uv=hn.getInterpolatedAttribute(r,o,l,c,f,new $e)),s&&(u.uv1=hn.getInterpolatedAttribute(s,o,l,c,f,new $e)),a&&(u.normal=hn.getInterpolatedAttribute(a,o,l,c,f,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new k,materialIndex:0};hn.getNormal(ds,fs,hs,d.normal),u.face=d,u.barycoord=f}return u}class al extends Gt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Lt,u=Lt,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jl extends _n{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new dt,ec=new dt,vs=[],tc=new Ni,Uf=new dt,Er=new Pt,Tr=new Vr;class bu extends Pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Uf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),tc.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(tc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Tr.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(i),e.ray.intersectsSphere(Tr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Zi),ec.multiplyMatrices(i,Zi),Er.matrixWorld=ec,Er.raycast(e,vs);for(let a=0,o=vs.length;a<o;a++){const l=vs[a];l.instanceId=s,l.object=this,t.push(l)}vs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new al(new Float32Array(r*this.count),r,this.count,Qo,mn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Aa=new k,Nf=new k,Ff=new Ne;class bi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Aa.subVectors(i,t).cross(Nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Aa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ff.getNormalMatrix(e),r=this.coplanarPoint(Aa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new Vr,Of=new $e(.5,.5),_s=new k;class ol{constructor(e=new bi,t=new bi,i=new bi,r=new bi,s=new bi,a=new bi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Cn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],h=s[7],p=s[8],x=s[9],m=s[10],g=s[11],A=s[12],C=s[13],b=s[14],w=s[15];if(r[0].setComponents(c-a,h-u,g-p,w-A).normalize(),r[1].setComponents(c+a,h+u,g+p,w+A).normalize(),r[2].setComponents(c+o,h+f,g+x,w+C).normalize(),r[3].setComponents(c-o,h-f,g-x,w-C).normalize(),i)r[4].setComponents(l,d,m,b).normalize(),r[5].setComponents(c-l,h-d,g-m,w-b).normalize();else if(r[4].setComponents(c-l,h-d,g-m,w-b).normalize(),t===Cn)r[5].setComponents(c+l,h+d,g+m,w+b).normalize();else if(t===zr)r[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){Mi.center.set(0,0,0);const t=Of.distanceTo(e.center);return Mi.radius=.7071067811865476+t,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(_s.x=r.normal.x>0?e.max.x:e.min.x,_s.y=r.normal.y>0?e.max.y:e.min.y,_s.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Su extends Gt{constructor(e=[],t=Ii,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ur extends Gt{constructor(e,t,i=Ln,r,s,a,o=Lt,l=Lt,c,u=$n,f=1){if(u!==$n&&u!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kf extends ur{constructor(e,t=Ln,i=Ii,r,s,a=Lt,o=Lt,l,c=$n){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yu extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class mr extends xn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,h=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(f,2));function p(x,m,g,A,C,b,w,T,R,_,E){const D=b/R,P=w/_,F=b/2,Y=w/2,Q=T/2,B=R+1,J=_+1;let V=0,te=0;const se=new k;for(let $=0;$<J;$++){const W=$*P-Y;for(let re=0;re<B;re++){const Ee=re*D-F;se[x]=Ee*A,se[m]=W*C,se[g]=Q,c.push(se.x,se.y,se.z),se[x]=0,se[m]=0,se[g]=T>0?1:-1,u.push(se.x,se.y,se.z),f.push(re/R),f.push(1-$/_),V+=1}}for(let $=0;$<_;$++)for(let W=0;W<R;W++){const re=d+W+B*$,Ee=d+W+B*($+1),et=d+(W+1)+B*($+1),_e=d+(W+1)+B*$;l.push(re,Ee,_e),l.push(Ee,et,_e),te+=6}o.addGroup(h,te,E),h+=te,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Vs extends xn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],h=[];let p=0;const x=[],m=i/2;let g=0;A(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ht(f,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(h,2));function A(){const b=new k,w=new k;let T=0;const R=(t-e)/i;for(let _=0;_<=s;_++){const E=[],D=_/s,P=D*(t-e)+e;for(let F=0;F<=r;F++){const Y=F/r,Q=Y*l+o,B=Math.sin(Q),J=Math.cos(Q);w.x=P*B,w.y=-D*i+m,w.z=P*J,f.push(w.x,w.y,w.z),b.set(B,R,J).normalize(),d.push(b.x,b.y,b.z),h.push(Y,1-D),E.push(p++)}x.push(E)}for(let _=0;_<r;_++)for(let E=0;E<s;E++){const D=x[E][_],P=x[E+1][_],F=x[E+1][_+1],Y=x[E][_+1];(e>0||E!==0)&&(u.push(D,P,Y),T+=3),(t>0||E!==s-1)&&(u.push(P,F,Y),T+=3)}c.addGroup(g,T,0),g+=T}function C(b){const w=p,T=new $e,R=new k;let _=0;const E=b===!0?e:t,D=b===!0?1:-1;for(let F=1;F<=r;F++)f.push(0,m*D,0),d.push(0,D,0),h.push(.5,.5),p++;const P=p;for(let F=0;F<=r;F++){const Q=F/r*l+o,B=Math.cos(Q),J=Math.sin(Q);R.x=E*J,R.y=m*D,R.z=E*B,f.push(R.x,R.y,R.z),d.push(0,D,0),T.x=B*.5+.5,T.y=J*.5*D+.5,h.push(T.x,T.y),p++}for(let F=0;F<r;F++){const Y=w+F,Q=P+F;b===!0?u.push(Q,Q+1,Y):u.push(Q+1,Q,Y),_+=3}c.addGroup(g,_,b===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ws extends Vs{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ws(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gr extends xn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,h=[],p=[],x=[],m=[];for(let g=0;g<u;g++){const A=g*d-a;for(let C=0;C<c;C++){const b=C*f-s;p.push(b,-A,0),x.push(0,0,1),m.push(C/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let A=0;A<o;A++){const C=A+c*g,b=A+c*(g+1),w=A+1+c*(g+1),T=A+1+c*g;h.push(C,b,T),h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Bs extends xn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new k,d=new k,h=[],p=[],x=[],m=[];for(let g=0;g<=i;g++){const A=[],C=g/i,b=a+C*o,w=e*Math.cos(b),T=Math.sqrt(e*e-w*w);let R=0;g===0&&a===0?R=.5/t:g===i&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const E=_/t,D=r+E*s;f.x=-T*Math.cos(D),f.y=w,f.z=T*Math.sin(D),p.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),m.push(E+R,1-C),A.push(c++)}u.push(A)}for(let g=0;g<i;g++)for(let A=0;A<t;A++){const C=u[g][A+1],b=u[g][A],w=u[g+1][A],T=u[g+1][A+1];(g!==0||a>0)&&h.push(C,b,T),(g!==i-1||l<Math.PI)&&h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(nc(r))r.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(nc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Bt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function nc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Bf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Eu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const zf={clone:dr,merge:Bt};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends Wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Bf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(r.value);break;case"v3":this.uniforms[i].value=new k().fromArray(r.value);break;case"v4":this.uniforms[i].value=new pt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ne().fromArray(r.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Vf extends Dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bt extends Wr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lo,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wf extends Wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xf extends Wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Tu extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class $f extends Tu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const wa=new dt,ic=new k,rc=new k;class qf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=jt,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ic.setFromMatrixPosition(e.matrixWorld),t.position.copy(ic),rc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rc),t.updateMatrixWorld(),wa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===zr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xs=new k,Ms=new pr,yn=new k;class Au extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xs,Ms,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xs,Ms,yn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(xs,Ms,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xs,Ms,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const si=new k,sc=new $e,ac=new $e;class fn extends Au{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ia*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,sc,ac),t.subVectors(ac,sc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ia*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xs extends Au{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yf extends qf{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kf extends Tu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new Yf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ji=-90,Qi=1;class Zf extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new fn(Ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new fn(Ji,Qi,e,t);s.layers=this.layers,this.add(s);const a=new fn(Ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new fn(Ji,Qi,e,t);o.layers=this.layers,this.add(o);const l=new fn(Ji,Qi,e,t);l.layers=this.layers,this.add(l);const c=new fn(Ji,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Jf extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const oc=new dt;class Qf{constructor(e,t,i=0,r=1/0){this.ray=new Mu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return oc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(oc),this}intersectObject(e,t=!0,i=[]){return Uo(e,this,i,t),i.sort(lc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Uo(e[r],this,i,t);return i.sort(lc),i}}function lc(n,e){return n.distance-e.distance}function Uo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Uo(s[a],e,t,!0)}}class wu{static{wu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function cc(n,e,t,i){const r=jf(i);switch(t){case hu:return n*e;case Qo:return n*e/r.components*r.byteLength;case jo:return n*e/r.components*r.byteLength;case Li:return n*e*2/r.components*r.byteLength;case el:return n*e*2/r.components*r.byteLength;case pu:return n*e*3/r.components*r.byteLength;case gn:return n*e*4/r.components*r.byteLength;case tl:return n*e*4/r.components*r.byteLength;case As:case ws:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rs:case Cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case no:case ro:return Math.max(n,16)*Math.max(e,8)/4;case to:case io:return Math.max(n,8)*Math.max(e,8)/2;case so:case ao:case lo:case co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case oo:case Us:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case po:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case go:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case vo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case _o:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case xo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case To:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ao:case wo:case Ro:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Co:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ns:case Io:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jf(n){switch(n){case jt:case cu:return{byteLength:1,components:1};case kr:case uu:case Xn:return{byteLength:2,components:1};case Zo:case Jo:return{byteLength:2,components:4};case Ln:case Ko:case mn:return{byteLength:4,components:1};case du:case fu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ru(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function eh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((h,p)=>h.start-p.start);let d=0;for(let h=1;h<f.length;h++){const p=f[d],x=f[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,f[d]=x)}f.length=d+1;for(let h=0,p=f.length;h<p;h++){const x=f[h];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nh=`#ifdef USE_ALPHAHASH
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
#endif`,ih=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oh=`#ifdef USE_AOMAP
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
#endif`,lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ch=`#ifdef USE_BATCHING
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
#endif`,uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ph=`#ifdef USE_IRIDESCENCE
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
#endif`,mh=`#ifdef USE_BUMPMAP
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
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Eh=`#define PI 3.141592653589793
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
} // validated`,Th=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ah=`vec3 transformedNormal = objectNormal;
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
#endif`,wh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ch=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ph=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ih="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Uh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nh=`#ifdef USE_ENVMAP
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
#endif`,Fh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Oh=`#ifdef USE_ENVMAP
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
#endif`,kh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hh=`#ifdef USE_GRADIENTMAP
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
}`,Vh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$h=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qh=`PhysicalMaterial material;
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
#endif`,jh=`uniform sampler2D dfgLUT;
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
}`,ep=`
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
#endif`,tp=`#if defined( RE_IndirectDiffuse )
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
#endif`,np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ip=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,rp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,op=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dp=`#if defined( USE_POINTS_UV )
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
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ep=`#ifdef USE_NORMALMAP
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
#endif`,Tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ip=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zp=`float getShadowMask() {
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
}`,Gp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hp=`#ifdef USE_SKINNING
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
#endif`,Vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,Xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kp=`#ifdef USE_TRANSMISSION
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
#endif`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nm=`uniform sampler2D t2D;
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`#include <common>
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
}`,lm=`#if DEPTH_PACKING == 3200
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
}`,cm=`#define DISTANCE
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
}`,um=`#define DISTANCE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`uniform float scale;
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#include <common>
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
}`,gm=`uniform vec3 diffuse;
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
}`,vm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,Mm=`#define MATCAP
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
}`,bm=`#define NORMAL
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
}`,Sm=`#define NORMAL
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
}`,ym=`#define PHONG
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
}`,Em=`#define PHONG
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
}`,Tm=`#define STANDARD
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
}`,Am=`#define STANDARD
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
}`,wm=`#define TOON
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
}`,Rm=`#define TOON
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
}`,Cm=`uniform float size;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Im=`#include <common>
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
}`,Lm=`uniform vec3 color;
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
}`,Dm=`uniform float rotation;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:th,alphahash_pars_fragment:nh,alphamap_fragment:ih,alphamap_pars_fragment:rh,alphatest_fragment:sh,alphatest_pars_fragment:ah,aomap_fragment:oh,aomap_pars_fragment:lh,batching_pars_vertex:ch,batching_vertex:uh,begin_vertex:dh,beginnormal_vertex:fh,bsdfs:hh,iridescence_fragment:ph,bumpmap_pars_fragment:mh,clipping_planes_fragment:gh,clipping_planes_pars_fragment:vh,clipping_planes_pars_vertex:_h,clipping_planes_vertex:xh,color_fragment:Mh,color_pars_fragment:bh,color_pars_vertex:Sh,color_vertex:yh,common:Eh,cube_uv_reflection_fragment:Th,defaultnormal_vertex:Ah,displacementmap_pars_vertex:wh,displacementmap_vertex:Rh,emissivemap_fragment:Ch,emissivemap_pars_fragment:Ph,colorspace_fragment:Ih,colorspace_pars_fragment:Lh,envmap_fragment:Dh,envmap_common_pars_fragment:Uh,envmap_pars_fragment:Nh,envmap_pars_vertex:Fh,envmap_physical_pars_fragment:qh,envmap_vertex:Oh,fog_vertex:kh,fog_pars_vertex:Bh,fog_fragment:zh,fog_pars_fragment:Gh,gradientmap_pars_fragment:Hh,lightmap_pars_fragment:Vh,lights_lambert_fragment:Wh,lights_lambert_pars_fragment:Xh,lights_pars_begin:$h,lights_toon_fragment:Yh,lights_toon_pars_fragment:Kh,lights_phong_fragment:Zh,lights_phong_pars_fragment:Jh,lights_physical_fragment:Qh,lights_physical_pars_fragment:jh,lights_fragment_begin:ep,lights_fragment_maps:tp,lights_fragment_end:np,lightprobes_pars_fragment:ip,logdepthbuf_fragment:rp,logdepthbuf_pars_fragment:sp,logdepthbuf_pars_vertex:ap,logdepthbuf_vertex:op,map_fragment:lp,map_pars_fragment:cp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:fp,metalnessmap_pars_fragment:hp,morphinstance_vertex:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:vp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:Mp,normal_pars_fragment:bp,normal_pars_vertex:Sp,normal_vertex:yp,normalmap_pars_fragment:Ep,clearcoat_normal_fragment_begin:Tp,clearcoat_normal_fragment_maps:Ap,clearcoat_pars_fragment:wp,iridescence_pars_fragment:Rp,opaque_fragment:Cp,packing:Pp,premultiplied_alpha_fragment:Ip,project_vertex:Lp,dithering_fragment:Dp,dithering_pars_fragment:Up,roughnessmap_fragment:Np,roughnessmap_pars_fragment:Fp,shadowmap_pars_fragment:Op,shadowmap_pars_vertex:kp,shadowmap_vertex:Bp,shadowmask_pars_fragment:zp,skinbase_vertex:Gp,skinning_pars_vertex:Hp,skinning_vertex:Vp,skinnormal_vertex:Wp,specularmap_fragment:Xp,specularmap_pars_fragment:$p,tonemapping_fragment:qp,tonemapping_pars_fragment:Yp,transmission_fragment:Kp,transmission_pars_fragment:Zp,uv_pars_fragment:Jp,uv_pars_vertex:Qp,uv_vertex:jp,worldpos_vertex:em,background_vert:tm,background_frag:nm,backgroundCube_vert:im,backgroundCube_frag:rm,cube_vert:sm,cube_frag:am,depth_vert:om,depth_frag:lm,distance_vert:cm,distance_frag:um,equirect_vert:dm,equirect_frag:fm,linedashed_vert:hm,linedashed_frag:pm,meshbasic_vert:mm,meshbasic_frag:gm,meshlambert_vert:vm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:Mm,meshnormal_vert:bm,meshnormal_frag:Sm,meshphong_vert:ym,meshphong_frag:Em,meshphysical_vert:Tm,meshphysical_frag:Am,meshtoon_vert:wm,meshtoon_frag:Rm,points_vert:Cm,points_frag:Pm,shadow_vert:Im,shadow_frag:Lm,sprite_vert:Dm,sprite_frag:Um},pe={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Rn={basic:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Bt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Bt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Je(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Bt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Bt([pe.points,pe.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Bt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Bt([pe.common,pe.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Bt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Bt([pe.sprite,pe.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Bt([pe.common,pe.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Bt([pe.lights,pe.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Rn.physical={uniforms:Bt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const bs={r:0,b:0,g:0},Nm=new dt,Cu=new Ne;Cu.set(-1,0,0,0,1,0,0,0,1);function Fm(n,e,t,i,r,s){const a=new Je(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function h(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){const b=A.backgroundBlurriness>0;C=e.get(C,b)}return C}function p(A){let C=!1;const b=h(A);b===null?m(a,o):b&&b.isColor&&(m(b,1),C=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(A,C){const b=h(C);b&&(b.isCubeTexture||b.mapping===Hs)?(c===void 0&&(c=new Pt(new mr(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:dr(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Cu),c.material.toneMapped=qe.getTransfer(b.colorSpace)!==st,(u!==b||f!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Pt(new gr(2,2),new Dn({name:"BackgroundMaterial",uniforms:dr(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=qe.getTransfer(b.colorSpace)!==st,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,C){A.getRGB(bs,Eu(n)),t.buffers.color.setClear(bs.r,bs.g,bs.b,C,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:p,addToRenderList:x,dispose:g}}function Om(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(P,F,Y,Q,B){let J=!1;const V=f(P,Q,Y,F);s!==V&&(s=V,c(s.object)),J=h(P,Q,Y,B),J&&p(P,Q,Y,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,b(P,F,Y,Q),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function f(P,F,Y,Q){const B=Q.wireframe===!0;let J=i[F.id];J===void 0&&(J={},i[F.id]=J);const V=P.isInstancedMesh===!0?P.id:0;let te=J[V];te===void 0&&(te={},J[V]=te);let se=te[Y.id];se===void 0&&(se={},te[Y.id]=se);let $=se[B];return $===void 0&&($=d(l()),se[B]=$),$}function d(P){const F=[],Y=[],Q=[];for(let B=0;B<t;B++)F[B]=0,Y[B]=0,Q[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Y,attributeDivisors:Q,object:P,attributes:{},index:null}}function h(P,F,Y,Q){const B=s.attributes,J=F.attributes;let V=0;const te=Y.getAttributes();for(const se in te)if(te[se].location>=0){const W=B[se];let re=J[se];if(re===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(re=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(re=P.instanceColor)),W===void 0||W.attribute!==re||re&&W.data!==re.data)return!0;V++}return s.attributesNum!==V||s.index!==Q}function p(P,F,Y,Q){const B={},J=F.attributes;let V=0;const te=Y.getAttributes();for(const se in te)if(te[se].location>=0){let W=J[se];W===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(W=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(W=P.instanceColor));const re={};re.attribute=W,W&&W.data&&(re.data=W.data),B[se]=re,V++}s.attributes=B,s.attributesNum=V,s.index=Q}function x(){const P=s.newAttributes;for(let F=0,Y=P.length;F<Y;F++)P[F]=0}function m(P){g(P,0)}function g(P,F){const Y=s.newAttributes,Q=s.enabledAttributes,B=s.attributeDivisors;Y[P]=1,Q[P]===0&&(n.enableVertexAttribArray(P),Q[P]=1),B[P]!==F&&(n.vertexAttribDivisor(P,F),B[P]=F)}function A(){const P=s.newAttributes,F=s.enabledAttributes;for(let Y=0,Q=F.length;Y<Q;Y++)F[Y]!==P[Y]&&(n.disableVertexAttribArray(Y),F[Y]=0)}function C(P,F,Y,Q,B,J,V){V===!0?n.vertexAttribIPointer(P,F,Y,B,J):n.vertexAttribPointer(P,F,Y,Q,B,J)}function b(P,F,Y,Q){x();const B=Q.attributes,J=Y.getAttributes(),V=F.defaultAttributeValues;for(const te in J){const se=J[te];if(se.location>=0){let $=B[te];if($===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&($=P.instanceColor)),$!==void 0){const W=$.normalized,re=$.itemSize,Ee=e.get($);if(Ee===void 0)continue;const et=Ee.buffer,_e=Ee.type,q=Ee.bytesPerElement,ie=_e===n.INT||_e===n.UNSIGNED_INT||$.gpuType===Ko;if($.isInterleavedBufferAttribute){const ae=$.data,Ue=ae.stride,Fe=$.offset;if(ae.isInstancedInterleavedBuffer){for(let Ie=0;Ie<se.locationSize;Ie++)g(se.location+Ie,ae.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ie=0;Ie<se.locationSize;Ie++)m(se.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,et);for(let Ie=0;Ie<se.locationSize;Ie++)C(se.location+Ie,re/se.locationSize,_e,W,Ue*q,(Fe+re/se.locationSize*Ie)*q,ie)}else{if($.isInstancedBufferAttribute){for(let ae=0;ae<se.locationSize;ae++)g(se.location+ae,$.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ae=0;ae<se.locationSize;ae++)m(se.location+ae);n.bindBuffer(n.ARRAY_BUFFER,et);for(let ae=0;ae<se.locationSize;ae++)C(se.location+ae,re/se.locationSize,_e,W,re*q,re/se.locationSize*ae*q,ie)}}else if(V!==void 0){const W=V[te];if(W!==void 0)switch(W.length){case 2:n.vertexAttrib2fv(se.location,W);break;case 3:n.vertexAttrib3fv(se.location,W);break;case 4:n.vertexAttrib4fv(se.location,W);break;default:n.vertexAttrib1fv(se.location,W)}}}}A()}function w(){E();for(const P in i){const F=i[P];for(const Y in F){const Q=F[Y];for(const B in Q){const J=Q[B];for(const V in J)u(J[V].object),delete J[V];delete Q[B]}}delete i[P]}}function T(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const Y in F){const Q=F[Y];for(const B in Q){const J=Q[B];for(const V in J)u(J[V].object),delete J[V];delete Q[B]}}delete i[P.id]}function R(P){for(const F in i){const Y=i[F];for(const Q in Y){const B=Y[Q];if(B[P.id]===void 0)continue;const J=B[P.id];for(const V in J)u(J[V].object),delete J[V];delete B[P.id]}}}function _(P){for(const F in i){const Y=i[F],Q=P.isInstancedMesh===!0?P.id:0,B=Y[Q];if(B!==void 0){for(const J in B){const V=B[J];for(const te in V)u(V[te].object),delete V[te];delete B[J]}delete Y[Q],Object.keys(Y).length===0&&delete i[F]}}}function E(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:A}}function km(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Bm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==jt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==mn&&!_)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(De("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:b,maxSamples:w,samples:T}}function zm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new bi,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){const p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const A=s?0:i,C=A*4;let b=g.clippingState||null;l.value=b,b=u(p,d,C,h);for(let w=0;w!==C;++w)b[w]=t[w];g.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,p){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,p!==!0||m===null){const g=h+x*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<g)&&(m=new Float32Array(g));for(let C=0,b=h;C!==x;++C,b+=4)a.copy(f[C]).applyMatrix4(A,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const ui=4,uc=[.125,.215,.35,.446,.526,.582],yi=20,Gm=256,Ar=new Xs,dc=new Je;let Ra=null,Ca=0,Pa=0,Ia=!1;const Hm=new k;class fc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Hm}=s;Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ra,Ca,Pa),this._renderer.xr.enabled=Ia,e.scissorTest=!1,ji(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Xn,format:gn,colorSpace:Fs,depthBuffer:!1},r=hc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Vm(s)),this._blurMaterial=Xm(s,e,t),this._ggxMaterial=Wm(s,e,t)}return r}_compileMaterial(e){const t=new Pt(new xn,e);this._renderer.compile(t,Ar)}_sceneToCubeUV(e,t,i,r,s){const l=new fn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(dc),f.toneMapping=Pn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new mr,new Xr({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let g=!1;const A=e.background;A?A.isColor&&(m.color.copy(A),e.background=null,g=!0):(m.color.copy(dc),g=!0);for(let C=0;C<6;C++){const b=C%3;b===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):b===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const w=this._cubeSize;ji(r,b*w,C>2?w:0,w,w),f.setRenderTarget(r),g&&f.render(x,l),f.render(e,l)}f.toneMapping=h,f.autoClear=d,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ii||e.mapping===cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ji(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,h=f*d,{_lodMax:p}=this,x=this._sizeLods[i],m=3*x*(i>p-ui?i-p+ui:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,ji(s,m,g,3*x,2*x),r.setRenderTarget(s),r.render(o,Ar),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,ji(e,m,g,3*x,2*x),r.setRenderTarget(e),r.render(o,Ar)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*yi-1),x=s/p,m=isFinite(s)?1+Math.floor(u*x):yi;m>yi&&De(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yi}`);const g=[];let A=0;for(let R=0;R<yi;++R){const _=R/x,E=Math.exp(-_*_/2);g.push(E),R===0?A+=E:R<m&&(A+=2*E)}for(let R=0;R<g.length;R++)g[R]=g[R]/A;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:C}=this;d.dTheta.value=p,d.mipInt.value=C-i;const b=this._sizeLods[r],w=3*b*(r>C-ui?r-C+ui:0),T=4*(this._cubeSize-b);ji(t,w,T,3*b,2*b),l.setRenderTarget(t),l.render(f,Ar)}}function Vm(n){const e=[],t=[],i=[];let r=n;const s=n-ui+1+uc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ui?l=uc[a-n+ui-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,p=6,x=3,m=2,g=1,A=new Float32Array(x*p*h),C=new Float32Array(m*p*h),b=new Float32Array(g*p*h);for(let T=0;T<h;T++){const R=T%3*2/3-1,_=T>2?0:-1,E=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];A.set(E,x*p*T),C.set(d,m*p*T);const D=[T,T,T,T,T,T];b.set(D,g*p*T)}const w=new xn;w.setAttribute("position",new _n(A,x)),w.setAttribute("uv",new _n(C,m)),w.setAttribute("faceIndex",new _n(b,g)),i.push(new Pt(w,null)),r>ui&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function hc(n,e,t){const i=new In(n,e,t);return i.texture.mapping=Hs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ji(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Wm(n,e,t){return new Dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Xm(n,e,t){const i=new Float32Array(yi),r=new k(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function pc(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function mc(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$s(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function $s(){return`

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
	`}class Pu extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Su(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new mr(5,5,5),s=new Dn({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:Vn});s.uniforms.tEquirect.value=t;const a=new Pt(r,s),o=t.minFilter;return t.minFilter===Ti&&(t.minFilter=Ot),new Zf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function $m(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,h=!1){return d==null?null:h?a(d):s(d)}function s(d){if(d&&d.isTexture){const h=d.mapping;if(h===ea||h===ta)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const x=new Pu(p.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const h=d.mapping,p=h===ea||h===ta,x=h===Ii||h===cr;if(p||x){let m=t.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new fc(n)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const A=d.image;return p&&A&&A.height>0||x&&A&&l(A)?(i===null&&(i=new fc(n)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,h){return h===ea?d.mapping=Ii:h===ta&&(d.mapping=cr),d}function l(d){let h=0;const p=6;for(let x=0;x<p;x++)d[x]!==void 0&&h++;return h===p}function c(d){const h=d.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function qm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ar("WebGLRenderer: "+i+" extension not supported."),r}}}function Ym(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete r[d.id];const h=s.get(d);h&&(e.remove(h),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const h in d)e.update(d[h],n.ARRAY_BUFFER)}function c(f){const d=[],h=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(h!==null){const A=h.array;x=h.version;for(let C=0,b=A.length;C<b;C+=3){const w=A[C+0],T=A[C+1],R=A[C+2];d.push(w,T,T,R,R,w)}}else{const A=p.array;x=p.version;for(let C=0,b=A.length/3-1;C<b;C+=3){const w=C+0,T=C+1,R=C+2;d.push(w,T,T,R,R,w)}}const m=new(p.count>=65535?xu:_u)(d,1);m.version=x;const g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){const d=s.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Km(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function c(f,d,h){h!==0&&(n.drawElementsInstanced(i,d,s,f*a,h),t.update(d,i,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,h);let x=0;for(let m=0;m<h;m++)x+=d[m];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Zm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Jm(n,e,t){const i=new WeakMap,r=new pt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let D=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var h=D;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),x===!0&&(b=2),m===!0&&(b=3);let w=o.attributes.position.count*b,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*T*4*f),_=new gu(R,w,T,f);_.type=mn,_.needsUpdate=!0;const E=b*4;for(let P=0;P<f;P++){const F=g[P],Y=A[P],Q=C[P],B=w*T*4*P;for(let J=0;J<F.count;J++){const V=J*E;p===!0&&(r.fromBufferAttribute(F,J),R[B+V+0]=r.x,R[B+V+1]=r.y,R[B+V+2]=r.z,R[B+V+3]=0),x===!0&&(r.fromBufferAttribute(Y,J),R[B+V+4]=r.x,R[B+V+5]=r.y,R[B+V+6]=r.z,R[B+V+7]=0),m===!0&&(r.fromBufferAttribute(Q,J),R[B+V+8]=r.x,R[B+V+9]=r.y,R[B+V+10]=r.z,R[B+V+11]=Q.itemSize===4?r.w:1)}}d={count:f,texture:_,size:new $e(w,T)},i.set(o,d),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Qm(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const jm={[nu]:"LINEAR_TONE_MAPPING",[iu]:"REINHARD_TONE_MAPPING",[ru]:"CINEON_TONE_MAPPING",[Yo]:"ACES_FILMIC_TONE_MAPPING",[au]:"AGX_TONE_MAPPING",[ou]:"NEUTRAL_TONE_MAPPING",[su]:"CUSTOM_TONE_MAPPING"};function e0(n,e,t,i,r,s){const a=new In(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new ur(e,t):void 0}),o=new In(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new xn;l.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ht([0,2,0,0,2,0],2));const c=new Vf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Pt(l,c),f=new Xs(-1,1,1,-1,0,1);let d=null,h=null,p=!1,x,m=null,g=[],A=!1;this.setSize=function(C,b){a.setSize(C,b),o.setSize(C,b);for(let w=0;w<g.length;w++){const T=g[w];T.setSize&&T.setSize(C,b)}},this.setEffects=function(C){g=C,A=g.length>0&&g[0].isRenderPass===!0;const b=a.width,w=a.height;for(let T=0;T<g.length;T++){const R=g[T];R.setSize&&R.setSize(b,w)}},this.begin=function(C,b){if(p||C.toneMapping===Pn&&g.length===0)return!1;if(m=b,b!==null){const w=b.width,T=b.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return A===!1&&C.setRenderTarget(a),x=C.toneMapping,C.toneMapping=Pn,!0},this.hasRenderPass=function(){return A},this.end=function(C,b){C.toneMapping=x,p=!0;let w=a,T=o;for(let R=0;R<g.length;R++){const _=g[R];if(_.enabled!==!1&&(_.render(C,T,w,b),_.needsSwap!==!1)){const E=w;w=T,T=E}}if(d!==C.outputColorSpace||h!==C.toneMapping){d=C.outputColorSpace,h=C.toneMapping,c.defines={},qe.getTransfer(d)===st&&(c.defines.SRGB_TRANSFER="");const R=jm[h];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,C.setRenderTarget(m),C.render(u,f),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Iu=new Gt,No=new ur(1,1),Lu=new gu,Du=new Mf,Uu=new Su,gc=[],vc=[],_c=new Float32Array(16),xc=new Float32Array(9),Mc=new Float32Array(4);function vr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=gc[r];if(s===void 0&&(s=new Float32Array(r),gc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qs(n,e){let t=vc[e];t===void 0&&(t=new Int32Array(e),vc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function t0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function n0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function i0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function r0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function s0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;Mc.set(i),n.uniformMatrix2fv(this.addr,!1,Mc),wt(t,i)}}function a0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;xc.set(i),n.uniformMatrix3fv(this.addr,!1,xc),wt(t,i)}}function o0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;_c.set(i),n.uniformMatrix4fv(this.addr,!1,_c),wt(t,i)}}function l0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function c0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function u0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function d0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function f0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function h0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function p0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function m0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function g0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(No.compareFunction=t.isReversedDepthBuffer()?il:nl,s=No):s=Iu,t.setTexture2D(e||s,r)}function v0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Du,r)}function _0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Uu,r)}function x0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Lu,r)}function M0(n){switch(n){case 5126:return t0;case 35664:return n0;case 35665:return i0;case 35666:return r0;case 35674:return s0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return u0;case 35669:case 35673:return d0;case 5125:return f0;case 36294:return h0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return x0}}function b0(n,e){n.uniform1fv(this.addr,e)}function S0(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function y0(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function E0(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function T0(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function A0(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function w0(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function R0(n,e){n.uniform1iv(this.addr,e)}function C0(n,e){n.uniform2iv(this.addr,e)}function P0(n,e){n.uniform3iv(this.addr,e)}function I0(n,e){n.uniform4iv(this.addr,e)}function L0(n,e){n.uniform1uiv(this.addr,e)}function D0(n,e){n.uniform2uiv(this.addr,e)}function U0(n,e){n.uniform3uiv(this.addr,e)}function N0(n,e){n.uniform4uiv(this.addr,e)}function F0(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=No:a=Iu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function O0(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Du,s[a])}function k0(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Uu,s[a])}function B0(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Lu,s[a])}function z0(n){switch(n){case 5126:return b0;case 35664:return S0;case 35665:return y0;case 35666:return E0;case 35674:return T0;case 35675:return A0;case 35676:return w0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return I0;case 5125:return L0;case 36294:return D0;case 36295:return U0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return O0;case 35680:case 36300:case 36308:case 36293:return k0;case 36289:case 36303:case 36311:case 36292:return B0}}class G0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=M0(t.type)}}class H0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=z0(t.type)}}class V0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const La=/(\w+)(\])?(\[|\.)?/g;function bc(n,e){n.seq.push(e),n.map[e.id]=e}function W0(n,e,t){const i=n.name,r=i.length;for(La.lastIndex=0;;){const s=La.exec(i),a=La.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){bc(t,c===void 0?new G0(o,n,e):new H0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new V0(o),bc(t,f)),t=f}}}class Ps{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);W0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const X0=37297;let $0=0;function q0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const yc=new Ne;function Y0(n){qe._getMatrix(yc,qe.workingColorSpace,n);const e=`mat3( ${yc.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case Os:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ec(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+q0(n.getShaderSource(e),o)}else return s}function K0(n,e){const t=Y0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Z0={[nu]:"Linear",[iu]:"Reinhard",[ru]:"Cineon",[Yo]:"ACESFilmic",[au]:"AgX",[ou]:"Neutral",[su]:"Custom"};function J0(n,e){const t=Z0[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ss=new k;function Q0(){qe.getLuminanceCoefficients(Ss);const n=Ss.x.toFixed(4),e=Ss.y.toFixed(4),t=Ss.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function j0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function eg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function tg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Pr(n){return n!==""}function Tc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ac(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ng=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fo(n){return n.replace(ng,rg)}const ig=new Map;function rg(n,e){let t=Be[e];if(t===void 0){const i=ig.get(e);if(i!==void 0)t=Be[i],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fo(t)}const sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(sg,ag)}function ag(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Rc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const og={[Ts]:"SHADOWMAP_TYPE_PCF",[Cr]:"SHADOWMAP_TYPE_VSM"};function lg(n){return og[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const cg={[Ii]:"ENVMAP_TYPE_CUBE",[cr]:"ENVMAP_TYPE_CUBE",[Hs]:"ENVMAP_TYPE_CUBE_UV"};function ug(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":cg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const dg={[cr]:"ENVMAP_MODE_REFRACTION"};function fg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":dg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const hg={[tu]:"ENVMAP_BLENDING_MULTIPLY",[Qd]:"ENVMAP_BLENDING_MIX",[jd]:"ENVMAP_BLENDING_ADD"};function pg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":hg[n.combine]||"ENVMAP_BLENDING_NONE"}function mg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function gg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=lg(t),c=ug(t),u=fg(t),f=pg(t),d=mg(t),h=j0(t),p=eg(s),x=r.createProgram();let m,g,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Pr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Pr).join(`
`),g.length>0&&(g+=`
`)):(m=[Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),g=[Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Pn?J0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,K0("linearToOutputTexel",t.outputColorSpace),Q0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),a=Fo(a),a=Tc(a,t),a=Ac(a,t),o=Fo(o),o=Tc(o,t),o=Ac(o,t),a=wc(a),o=wc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const C=A+m+a,b=A+g+o,w=Sc(r,r.VERTEX_SHADER,C),T=Sc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,w),r.attachShader(x,T),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(P){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(x)||"",Y=r.getShaderInfoLog(w)||"",Q=r.getShaderInfoLog(T)||"",B=F.trim(),J=Y.trim(),V=Q.trim();let te=!0,se=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,w,T);else{const $=Ec(r,w,"vertex"),W=Ec(r,T,"fragment");Ze("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+$+`
`+W)}else B!==""?De("WebGLProgram: Program Info Log:",B):(J===""||V==="")&&(se=!1);se&&(P.diagnostics={runnable:te,programLog:B,vertexShader:{log:J,prefix:m},fragmentShader:{log:V,prefix:g}})}r.deleteShader(w),r.deleteShader(T),_=new Ps(r,x),E=tg(r,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(x,X0)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let vg=0;class _g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xg(e),t.set(e,i)),i}}class xg{constructor(e){this.id=vg++,this.code=e,this.usedTimes=0}}function Mg(n){return n===Li||n===Us||n===Ns}function bg(n,e,t,i,r,s){const a=new sl,o=new _g,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,E,D,P,F,Y){const Q=P.fog,B=F.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,te=e.get(_.envMap||J,V),se=te&&te.mapping===Hs?te.image.height:null,$=h[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&De("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const W=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=W!==void 0?W.length:0;let Ee=0;B.morphAttributes.position!==void 0&&(Ee=1),B.morphAttributes.normal!==void 0&&(Ee=2),B.morphAttributes.color!==void 0&&(Ee=3);let et,_e,q,ie;if($){const be=Rn[$];et=be.vertexShader,_e=be.fragmentShader}else{et=_.vertexShader,_e=_.fragmentShader;const be=o.getVertexShaderStage(_),gt=o.getFragmentShaderStage(_);o.update(_,be,gt),q=be.id,ie=gt.id}const ae=n.getRenderTarget(),Ue=n.state.buffers.depth.getReversed(),Fe=F.isInstancedMesh===!0,Ie=F.isBatchedMesh===!0,_t=!!_.map,We=!!_.matcap,lt=!!te,tt=!!_.aoMap,Qe=!!_.lightMap,St=!!_.bumpMap&&_.wireframe===!1,Tt=!!_.normalMap,Rt=!!_.displacementMap,It=!!_.emissiveMap,mt=!!_.metalnessMap,yt=!!_.roughnessMap,U=_.anisotropy>0,Vt=_.clearcoat>0,rt=_.dispersion>0,S=_.iridescence>0,v=_.sheen>0,O=_.transmission>0,H=U&&!!_.anisotropyMap,K=Vt&&!!_.clearcoatMap,oe=Vt&&!!_.clearcoatNormalMap,ce=Vt&&!!_.clearcoatRoughnessMap,Z=S&&!!_.iridescenceMap,ee=S&&!!_.iridescenceThicknessMap,ue=v&&!!_.sheenColorMap,Ae=v&&!!_.sheenRoughnessMap,he=!!_.specularMap,de=!!_.specularColorMap,Ce=!!_.specularIntensityMap,Le=O&&!!_.transmissionMap,Oe=O&&!!_.thicknessMap,L=!!_.gradientMap,le=!!_.alphaMap,j=_.alphaTest>0,fe=!!_.alphaHash,ve=!!_.extensions;let ne=Pn;_.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ne=n.toneMapping);const Te={shaderID:$,shaderType:_.type,shaderName:_.name,vertexShader:et,fragmentShader:_e,defines:_.defines,customVertexShaderID:q,customFragmentShaderID:ie,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ie,batchingColor:Ie&&F._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&F.instanceColor!==null,instancingMorph:Fe&&F.morphTexture!==null,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:_t,matcap:We,envMap:lt,envMapMode:lt&&te.mapping,envMapCubeUVHeight:se,aoMap:tt,lightMap:Qe,bumpMap:St,normalMap:Tt,displacementMap:Rt,emissiveMap:It,normalMapObjectSpace:Tt&&_.normalMapType===nf,normalMapTangentSpace:Tt&&_.normalMapType===Lo,packedNormalMap:Tt&&_.normalMapType===Lo&&Mg(_.normalMap.format),metalnessMap:mt,roughnessMap:yt,anisotropy:U,anisotropyMap:H,clearcoat:Vt,clearcoatMap:K,clearcoatNormalMap:oe,clearcoatRoughnessMap:ce,dispersion:rt,iridescence:S,iridescenceMap:Z,iridescenceThicknessMap:ee,sheen:v,sheenColorMap:ue,sheenRoughnessMap:Ae,specularMap:he,specularColorMap:de,specularIntensityMap:Ce,transmission:O,transmissionMap:Le,thicknessMap:Oe,gradientMap:L,opaque:_.transparent===!1&&_.blending===sr&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:j,alphaHash:fe,combine:_.combine,mapUv:_t&&p(_.map.channel),aoMapUv:tt&&p(_.aoMap.channel),lightMapUv:Qe&&p(_.lightMap.channel),bumpMapUv:St&&p(_.bumpMap.channel),normalMapUv:Tt&&p(_.normalMap.channel),displacementMapUv:Rt&&p(_.displacementMap.channel),emissiveMapUv:It&&p(_.emissiveMap.channel),metalnessMapUv:mt&&p(_.metalnessMap.channel),roughnessMapUv:yt&&p(_.roughnessMap.channel),anisotropyMapUv:H&&p(_.anisotropyMap.channel),clearcoatMapUv:K&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:oe&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&p(_.sheenRoughnessMap.channel),specularMapUv:he&&p(_.specularMap.channel),specularColorMapUv:de&&p(_.specularColorMap.channel),specularIntensityMapUv:Ce&&p(_.specularIntensityMap.channel),transmissionMapUv:Le&&p(_.transmissionMap.channel),thicknessMapUv:Oe&&p(_.thicknessMap.channel),alphaMapUv:le&&p(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||U),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(_t||le),fog:!!Q,useFog:_.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&Tt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ue,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Ee,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ne,decodeVideoTexture:_t&&_.map.isVideoTexture===!0&&qe.getTransfer(_.map.colorSpace)===st,decodeVideoTextureEmissive:It&&_.emissiveMap.isVideoTexture===!0&&qe.getTransfer(_.emissiveMap.colorSpace)===st,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===zn,flipSided:_.side===Yt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ve&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&_.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)E.push(D),E.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(g(E,_),A(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function g(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function A(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const E=h[_.type];let D;if(E){const P=Rn[E];D=zf.clone(P.uniforms)}else D=_.uniforms;return D}function b(_,E){let D=u.get(E);return D!==void 0?++D.usedTimes:(D=new gg(n,E,_,r),c.push(D),u.set(E,D)),D}function w(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:C,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:R}}function Sg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function yg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Cc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Pc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,p,x,m,g){let A=n[e];return A===void 0?(A={id:d.id,object:d,geometry:h,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},n[e]=A):(A.id=d.id,A.object=d,A.geometry=h,A.material=p,A.materialVariant=a(d),A.groupOrder=x,A.renderOrder=d.renderOrder,A.z=m,A.group=g),e++,A}function l(d,h,p,x,m,g){const A=o(d,h,p,x,m,g);p.transmission>0?i.push(A):p.transparent===!0?r.push(A):t.push(A)}function c(d,h,p,x,m,g){const A=o(d,h,p,x,m,g);p.transmission>0?i.unshift(A):p.transparent===!0?r.unshift(A):t.unshift(A)}function u(d,h,p){t.length>1&&t.sort(d||yg),i.length>1&&i.sort(h||Cc),r.length>1&&r.sort(h||Cc),p&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function Eg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Pc,n.set(i,[a])):r>=s.length?(a=new Pc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Tg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Je};break;case"SpotLight":t={position:new k,direction:new k,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function Ag(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let wg=0;function Rg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Cg(n){const e=new Tg,t=Ag(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new dt,a=new dt;function o(c){let u=0,f=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let h=0,p=0,x=0,m=0,g=0,A=0,C=0,b=0,w=0,T=0,R=0;c.sort(Rg);for(let E=0,D=c.length;E<D;E++){const P=c[E],F=P.color,Y=P.intensity,Q=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Li?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=F.r*Y,f+=F.g*Y,d+=F.b*Y;else if(P.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(P.sh.coefficients[J],Y);R++}else if(P.isDirectionalLight){const J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,te=t.get(P);te.shadowIntensity=V.intensity,te.shadowBias=V.bias,te.shadowNormalBias=V.normalBias,te.shadowRadius=V.radius,te.shadowMapSize=V.mapSize,i.directionalShadow[h]=te,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=P.shadow.matrix,A++}i.directional[h]=J,h++}else if(P.isSpotLight){const J=e.get(P);J.position.setFromMatrixPosition(P.matrixWorld),J.color.copy(F).multiplyScalar(Y),J.distance=Q,J.coneCos=Math.cos(P.angle),J.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),J.decay=P.decay,i.spot[x]=J;const V=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,V.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[x]=V.matrix,P.castShadow){const te=t.get(P);te.shadowIntensity=V.intensity,te.shadowBias=V.bias,te.shadowNormalBias=V.normalBias,te.shadowRadius=V.radius,te.shadowMapSize=V.mapSize,i.spotShadow[x]=te,i.spotShadowMap[x]=B,b++}x++}else if(P.isRectAreaLight){const J=e.get(P);J.color.copy(F).multiplyScalar(Y),J.halfWidth.set(P.width*.5,0,0),J.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=J,m++}else if(P.isPointLight){const J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),J.distance=P.distance,J.decay=P.decay,P.castShadow){const V=P.shadow,te=t.get(P);te.shadowIntensity=V.intensity,te.shadowBias=V.bias,te.shadowNormalBias=V.normalBias,te.shadowRadius=V.radius,te.shadowMapSize=V.mapSize,te.shadowCameraNear=V.camera.near,te.shadowCameraFar=V.camera.far,i.pointShadow[p]=te,i.pointShadowMap[p]=B,i.pointShadowMatrix[p]=P.shadow.matrix,C++}i.point[p]=J,p++}else if(P.isHemisphereLight){const J=e.get(P);J.skyColor.copy(P.color).multiplyScalar(Y),J.groundColor.copy(P.groundColor).multiplyScalar(Y),i.hemi[g]=J,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const _=i.hash;(_.directionalLength!==h||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==g||_.numDirectionalShadows!==A||_.numPointShadows!==C||_.numSpotShadows!==b||_.numSpotMaps!==w||_.numLightProbes!==R)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=b+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,_.directionalLength=h,_.pointLength=p,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=g,_.numDirectionalShadows=A,_.numPointShadows=C,_.numSpotShadows=b,_.numSpotMaps=w,_.numLightProbes=R,i.version=wg++)}function l(c,u){let f=0,d=0,h=0,p=0,x=0;const m=u.matrixWorldInverse;for(let g=0,A=c.length;g<A;g++){const C=c[g];if(C.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),f++}else if(C.isSpotLight){const b=i.spot[h];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),h++}else if(C.isRectAreaLight){const b=i.rectArea[p];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(m),a.identity(),s.copy(C.matrixWorld),s.premultiply(m),a.extractRotation(s),b.halfWidth.set(C.width*.5,0,0),b.halfHeight.set(0,C.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(C.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(m),d++}else if(C.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(C.matrixWorld),b.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function Ic(n){const e=new Cg(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Pg(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ic(n),e.set(r,[o])):s>=a.length?(o=new Ic(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Ig=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lg=`uniform sampler2D shadow_pass;
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
}`,Dg=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Ug=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Lc=new dt,wr=new k,Da=new k;function Ng(n,e,t){let i=new ol;const r=new $e,s=new $e,a=new pt,o=new Wf,l=new Xf,c={},u=t.maxTextureSize,f={[hi]:Yt,[Yt]:hi,[zn]:zn},d=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Ig,fragmentShader:Lg}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const p=new xn;p.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Pt(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ts;let g=this.type;this.render=function(T,R,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===eu&&(De("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ts);const E=n.getRenderTarget(),D=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Vn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=g!==this.type;Y&&R.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(B=>B.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,B=T.length;Q<B;Q++){const J=T[Q],V=J.shadow;if(V===void 0){De("WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const te=V.getFrameExtents();r.multiply(te),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,V.mapSize.y=s.y));const se=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=se,V.map===null||Y===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Cr){if(J.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new In(r.x,r.y,{format:Li,type:Xn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),V.map.texture.name=J.name+".shadowMap",V.map.depthTexture=new ur(r.x,r.y,mn),V.map.depthTexture.name=J.name+".shadowMapDepth",V.map.depthTexture.format=$n,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt}else J.isPointLight?(V.map=new Pu(r.x),V.map.depthTexture=new kf(r.x,Ln)):(V.map=new In(r.x,r.y),V.map.depthTexture=new ur(r.x,r.y,Ln)),V.map.depthTexture.name=J.name+".shadowMap",V.map.depthTexture.format=$n,this.type===Ts?(V.map.depthTexture.compareFunction=se?il:nl,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt);V.camera.updateProjectionMatrix()}const $=V.map.isWebGLCubeRenderTarget?6:1;for(let W=0;W<$;W++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,W),n.clear();else{W===0&&(n.setRenderTarget(V.map),n.clear());const re=V.getViewport(W);a.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),F.viewport(a)}if(J.isPointLight){const re=V.camera,Ee=V.matrix,et=J.distance||re.far;et!==re.far&&(re.far=et,re.updateProjectionMatrix()),wr.setFromMatrixPosition(J.matrixWorld),re.position.copy(wr),Da.copy(re.position),Da.add(Dg[W]),re.up.copy(Ug[W]),re.lookAt(Da),re.updateMatrixWorld(),Ee.makeTranslation(-wr.x,-wr.y,-wr.z),Lc.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Lc,re.coordinateSystem,re.reversedDepth)}else V.updateMatrices(J);i=V.getFrustum(),b(R,_,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Cr&&A(V,_),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(E,D,P)};function A(T,R){const _=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new In(r.x,r.y,{format:Li,type:Xn})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,_,d,x,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,_,h,x,null)}function C(T,R,_,E){let D=null;const P=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)D=P;else if(D=_.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=D.uuid,Y=R.uuid;let Q=c[F];Q===void 0&&(Q={},c[F]=Q);let B=Q[Y];B===void 0&&(B=D.clone(),Q[Y]=B,R.addEventListener("dispose",w)),D=B}if(D.visible=R.visible,D.wireframe=R.wireframe,E===Cr?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:f[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const F=n.properties.get(D);F.light=_}return D}function b(T,R,_,E,D){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Cr)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const Y=e.update(T),Q=T.material;if(Array.isArray(Q)){const B=Y.groups;for(let J=0,V=B.length;J<V;J++){const te=B[J],se=Q[te.materialIndex];if(se&&se.visible){const $=C(T,se,E,D);T.onBeforeShadow(n,T,R,_,Y,$,te),n.renderBufferDirect(_,null,Y,$,T,te),T.onAfterShadow(n,T,R,_,Y,$,te)}}}else if(Q.visible){const B=C(T,Q,E,D);T.onBeforeShadow(n,T,R,_,Y,B,null),n.renderBufferDirect(_,null,Y,B,T,null),T.onAfterShadow(n,T,R,_,Y,B,null)}}const F=T.children;for(let Y=0,Q=F.length;Y<Q;Y++)b(F[Y],R,_,E,D)}function w(T){T.target.removeEventListener("dispose",w);for(const _ in c){const E=c[_],D=T.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function Fg(n,e){function t(){let L=!1;const le=new pt;let j=null;const fe=new pt(0,0,0,0);return{setMask:function(ve){j!==ve&&!L&&(n.colorMask(ve,ve,ve,ve),j=ve)},setLocked:function(ve){L=ve},setClear:function(ve,ne,Te,be,gt){gt===!0&&(ve*=be,ne*=be,Te*=be),le.set(ve,ne,Te,be),fe.equals(le)===!1&&(n.clearColor(ve,ne,Te,be),fe.copy(le))},reset:function(){L=!1,j=null,fe.set(-1,0,0,0)}}}function i(){let L=!1,le=!1,j=null,fe=null,ve=null;return{setReversed:function(ne){if(le!==ne){const Te=e.get("EXT_clip_control");ne?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),le=ne;const be=ve;ve=null,this.setClear(be)}},getReversed:function(){return le},setTest:function(ne){ne?ae(n.DEPTH_TEST):Ue(n.DEPTH_TEST)},setMask:function(ne){j!==ne&&!L&&(n.depthMask(ne),j=ne)},setFunc:function(ne){if(le&&(ne=hf[ne]),fe!==ne){switch(ne){case qa:n.depthFunc(n.NEVER);break;case Ya:n.depthFunc(n.ALWAYS);break;case Ka:n.depthFunc(n.LESS);break;case lr:n.depthFunc(n.LEQUAL);break;case Za:n.depthFunc(n.EQUAL);break;case Ja:n.depthFunc(n.GEQUAL);break;case Qa:n.depthFunc(n.GREATER);break;case ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=ne}},setLocked:function(ne){L=ne},setClear:function(ne){ve!==ne&&(ve=ne,le&&(ne=1-ne),n.clearDepth(ne))},reset:function(){L=!1,j=null,fe=null,ve=null,le=!1}}}function r(){let L=!1,le=null,j=null,fe=null,ve=null,ne=null,Te=null,be=null,gt=null;return{setTest:function(ft){L||(ft?ae(n.STENCIL_TEST):Ue(n.STENCIL_TEST))},setMask:function(ft){le!==ft&&!L&&(n.stencilMask(ft),le=ft)},setFunc:function(ft,Mn,bn){(j!==ft||fe!==Mn||ve!==bn)&&(n.stencilFunc(ft,Mn,bn),j=ft,fe=Mn,ve=bn)},setOp:function(ft,Mn,bn){(ne!==ft||Te!==Mn||be!==bn)&&(n.stencilOp(ft,Mn,bn),ne=ft,Te=Mn,be=bn)},setLocked:function(ft){L=ft},setClear:function(ft){gt!==ft&&(n.clearStencil(ft),gt=ft)},reset:function(){L=!1,le=null,j=null,fe=null,ve=null,ne=null,Te=null,be=null,gt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},h=new WeakMap,p=[],x=null,m=!1,g=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new Je(0,0,0),E=0,D=!1,P=null,F=null,Y=null,Q=null,B=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,te=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(se)[1]),V=te>=1):se.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),V=te>=2);let $=null,W={};const re=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),et=new pt().fromArray(re),_e=new pt().fromArray(Ee);function q(L,le,j,fe){const ve=new Uint8Array(4),ne=n.createTexture();n.bindTexture(L,ne),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<j;Te++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,ve):n.texImage2D(le+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ve);return ne}const ie={};ie[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(n.DEPTH_TEST),a.setFunc(lr),St(!1),Tt(Pl),ae(n.CULL_FACE),tt(Vn);function ae(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Ue(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Fe(L,le){return d[L]!==le?(n.bindFramebuffer(L,le),d[L]=le,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=le),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=le),!0):!1}function Ie(L,le){let j=p,fe=!1;if(L){j=h.get(le),j===void 0&&(j=[],h.set(le,j));const ve=L.textures;if(j.length!==ve.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,Te=ve.length;ne<Te;ne++)j[ne]=n.COLOR_ATTACHMENT0+ne;j.length=ve.length,fe=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,fe=!0);fe&&n.drawBuffers(j)}function _t(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const We={[Si]:n.FUNC_ADD,[Nd]:n.FUNC_SUBTRACT,[Fd]:n.FUNC_REVERSE_SUBTRACT};We[Od]=n.MIN,We[kd]=n.MAX;const lt={[Bd]:n.ZERO,[zd]:n.ONE,[Gd]:n.SRC_COLOR,[Xa]:n.SRC_ALPHA,[qd]:n.SRC_ALPHA_SATURATE,[Xd]:n.DST_COLOR,[Vd]:n.DST_ALPHA,[Hd]:n.ONE_MINUS_SRC_COLOR,[$a]:n.ONE_MINUS_SRC_ALPHA,[$d]:n.ONE_MINUS_DST_COLOR,[Wd]:n.ONE_MINUS_DST_ALPHA,[Yd]:n.CONSTANT_COLOR,[Kd]:n.ONE_MINUS_CONSTANT_COLOR,[Zd]:n.CONSTANT_ALPHA,[Jd]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(L,le,j,fe,ve,ne,Te,be,gt,ft){if(L===Vn){m===!0&&(Ue(n.BLEND),m=!1);return}if(m===!1&&(ae(n.BLEND),m=!0),L!==Ud){if(L!==g||ft!==D){if((A!==Si||w!==Si)&&(n.blendEquation(n.FUNC_ADD),A=Si,w=Si),ft)switch(L){case sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Il:n.blendFunc(n.ONE,n.ONE);break;case Ll:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Il:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ll:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}C=null,b=null,T=null,R=null,_.set(0,0,0),E=0,g=L,D=ft}return}ve=ve||le,ne=ne||j,Te=Te||fe,(le!==A||ve!==w)&&(n.blendEquationSeparate(We[le],We[ve]),A=le,w=ve),(j!==C||fe!==b||ne!==T||Te!==R)&&(n.blendFuncSeparate(lt[j],lt[fe],lt[ne],lt[Te]),C=j,b=fe,T=ne,R=Te),(be.equals(_)===!1||gt!==E)&&(n.blendColor(be.r,be.g,be.b,gt),_.copy(be),E=gt),g=L,D=!1}function Qe(L,le){L.side===zn?Ue(n.CULL_FACE):ae(n.CULL_FACE);let j=L.side===Yt;le&&(j=!j),St(j),L.blending===sr&&L.transparent===!1?tt(Vn):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const fe=L.stencilWrite;o.setTest(fe),fe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),It(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function St(L){P!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),P=L)}function Tt(L){L!==Ld?(ae(n.CULL_FACE),L!==F&&(L===Pl?n.cullFace(n.BACK):L===Dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ue(n.CULL_FACE),F=L}function Rt(L){L!==Y&&(V&&n.lineWidth(L),Y=L)}function It(L,le,j){L?(ae(n.POLYGON_OFFSET_FILL),(Q!==le||B!==j)&&(Q=le,B=j,a.getReversed()&&(le=-le),n.polygonOffset(le,j))):Ue(n.POLYGON_OFFSET_FILL)}function mt(L){L?ae(n.SCISSOR_TEST):Ue(n.SCISSOR_TEST)}function yt(L){L===void 0&&(L=n.TEXTURE0+J-1),$!==L&&(n.activeTexture(L),$=L)}function U(L,le,j){j===void 0&&($===null?j=n.TEXTURE0+J-1:j=$);let fe=W[j];fe===void 0&&(fe={type:void 0,texture:void 0},W[j]=fe),(fe.type!==L||fe.texture!==le)&&($!==j&&(n.activeTexture(j),$=j),n.bindTexture(L,le||ie[L]),fe.type=L,fe.texture=le)}function Vt(){const L=W[$];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function rt(){try{n.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function v(){try{n.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function O(){try{n.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function oe(){try{n.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Z(){try{n.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ee(){try{n.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ue(L){return f[L]!==void 0?f[L]:n.getParameter(L)}function Ae(L,le){f[L]!==le&&(n.pixelStorei(L,le),f[L]=le)}function he(L){et.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),et.copy(L))}function de(L){_e.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function Ce(L,le){let j=c.get(le);j===void 0&&(j=new WeakMap,c.set(le,j));let fe=j.get(L);fe===void 0&&(fe=n.getUniformBlockIndex(le,L.name),j.set(L,fe))}function Le(L,le){const fe=c.get(le).get(L);l.get(le)!==fe&&(n.uniformBlockBinding(le,fe,L.__bindingPointIndex),l.set(le,fe))}function Oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,W={},d={},h=new WeakMap,p=[],x=null,m=!1,g=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new Je(0,0,0),E=0,D=!1,P=null,F=null,Y=null,Q=null,B=null,et.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ae,disable:Ue,bindFramebuffer:Fe,drawBuffers:Ie,useProgram:_t,setBlending:tt,setMaterial:Qe,setFlipSided:St,setCullFace:Tt,setLineWidth:Rt,setPolygonOffset:It,setScissorTest:mt,activeTexture:yt,bindTexture:U,unbindTexture:Vt,compressedTexImage2D:rt,compressedTexImage3D:S,texImage2D:Z,texImage3D:ee,pixelStorei:Ae,getParameter:ue,updateUBOMapping:Ce,uniformBlockBinding:Le,texStorage2D:oe,texStorage3D:ce,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:K,scissor:he,viewport:de,reset:Oe}}function Og(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,u=new WeakMap,f=new Set;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(S,v){return p?new OffscreenCanvas(S,v):ks("canvas")}function m(S,v,O){let H=1;const K=rt(S);if((K.width>O||K.height>O)&&(H=O/Math.max(K.width,K.height)),H<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const oe=Math.floor(H*K.width),ce=Math.floor(H*K.height);d===void 0&&(d=x(oe,ce));const Z=v?x(oe,ce):d;return Z.width=oe,Z.height=ce,Z.getContext("2d").drawImage(S,0,0,oe,ce),De("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+oe+"x"+ce+")."),Z}else return"data"in S&&De("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),S;return S}function g(S){return S.generateMipmaps}function A(S){n.generateMipmap(S)}function C(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(S,v,O,H,K,oe=!1){if(S!==null){if(n[S]!==void 0)return n[S];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ce;H&&(ce=e.get("EXT_texture_norm16"),ce||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=v;if(v===n.RED&&(O===n.FLOAT&&(Z=n.R32F),O===n.HALF_FLOAT&&(Z=n.R16F),O===n.UNSIGNED_BYTE&&(Z=n.R8),O===n.UNSIGNED_SHORT&&ce&&(Z=ce.R16_EXT),O===n.SHORT&&ce&&(Z=ce.R16_SNORM_EXT)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.R8UI),O===n.UNSIGNED_SHORT&&(Z=n.R16UI),O===n.UNSIGNED_INT&&(Z=n.R32UI),O===n.BYTE&&(Z=n.R8I),O===n.SHORT&&(Z=n.R16I),O===n.INT&&(Z=n.R32I)),v===n.RG&&(O===n.FLOAT&&(Z=n.RG32F),O===n.HALF_FLOAT&&(Z=n.RG16F),O===n.UNSIGNED_BYTE&&(Z=n.RG8),O===n.UNSIGNED_SHORT&&ce&&(Z=ce.RG16_EXT),O===n.SHORT&&ce&&(Z=ce.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RG8UI),O===n.UNSIGNED_SHORT&&(Z=n.RG16UI),O===n.UNSIGNED_INT&&(Z=n.RG32UI),O===n.BYTE&&(Z=n.RG8I),O===n.SHORT&&(Z=n.RG16I),O===n.INT&&(Z=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),O===n.UNSIGNED_INT&&(Z=n.RGB32UI),O===n.BYTE&&(Z=n.RGB8I),O===n.SHORT&&(Z=n.RGB16I),O===n.INT&&(Z=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),O===n.UNSIGNED_INT&&(Z=n.RGBA32UI),O===n.BYTE&&(Z=n.RGBA8I),O===n.SHORT&&(Z=n.RGBA16I),O===n.INT&&(Z=n.RGBA32I)),v===n.RGB&&(O===n.UNSIGNED_SHORT&&ce&&(Z=ce.RGB16_EXT),O===n.SHORT&&ce&&(Z=ce.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),v===n.RGBA){const ee=oe?Os:qe.getTransfer(K);O===n.FLOAT&&(Z=n.RGBA32F),O===n.HALF_FLOAT&&(Z=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Z=ee===st?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&ce&&(Z=ce.RGBA16_EXT),O===n.SHORT&&ce&&(Z=ce.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function w(S,v){let O;return S?v===null||v===Ln||v===Br?O=n.DEPTH24_STENCIL8:v===mn?O=n.DEPTH32F_STENCIL8:v===kr&&(O=n.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ln||v===Br?O=n.DEPTH_COMPONENT24:v===mn?O=n.DEPTH_COMPONENT32F:v===kr&&(O=n.DEPTH_COMPONENT16),O}function T(S,v){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==Lt&&S.minFilter!==Ot?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function R(S){const v=S.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(S){const v=S.target;v.removeEventListener("dispose",_),P(v)}function E(S){const v=i.get(S);if(v.__webglInit===void 0)return;const O=S.source,H=h.get(O);if(H){const K=H[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(S),Object.keys(H).length===0&&h.delete(O)}i.remove(S)}function D(S){const v=i.get(S);n.deleteTexture(v.__webglTexture);const O=S.source,H=h.get(O);delete H[v.__cacheKey],a.memory.textures--}function P(S){const v=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let K=0;K<v.__webglFramebuffer[H].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[H][K]);else n.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)n.deleteFramebuffer(v.__webglFramebuffer[H]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=S.textures;for(let H=0,K=O.length;H<K;H++){const oe=i.get(O[H]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(O[H])}i.remove(S)}let F=0;function Y(){F=0}function Q(){return F}function B(S){F=S}function J(){const S=F;return S>=r.maxTextures&&De("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),F+=1,S}function V(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function te(S,v){const O=i.get(S);if(S.isVideoTexture&&U(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&O.__version!==S.version){const H=S.image;if(H===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(O,S,v);return}}else S.isExternalTexture&&(O.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function se(S,v){const O=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){Ue(O,S,v);return}else S.isExternalTexture&&(O.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function $(S,v){const O=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){Ue(O,S,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function W(S,v){const O=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&O.__version!==S.version){Fe(O,S,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const re={[Ds]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[eo]:n.MIRRORED_REPEAT},Ee={[Lt]:n.NEAREST,[ef]:n.NEAREST_MIPMAP_NEAREST,[es]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[na]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},et={[rf]:n.NEVER,[cf]:n.ALWAYS,[sf]:n.LESS,[nl]:n.LEQUAL,[af]:n.EQUAL,[il]:n.GEQUAL,[of]:n.GREATER,[lf]:n.NOTEQUAL};function _e(S,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ot||v.magFilter===na||v.magFilter===es||v.magFilter===Ti||v.minFilter===Ot||v.minFilter===na||v.minFilter===es||v.minFilter===Ti)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,re[v.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,Ee[v.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,Ee[v.minFilter]),v.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,et[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==es&&v.minFilter!==Ti||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function q(S,v){let O=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",R));const H=v.source;let K=h.get(H);K===void 0&&(K={},h.set(H,K));const oe=V(v);if(oe!==S.__cacheKey){K[oe]===void 0&&(K[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[oe].usedTimes++;const ce=K[S.__cacheKey];ce!==void 0&&(K[S.__cacheKey].usedTimes--,ce.usedTimes===0&&D(v)),S.__cacheKey=oe,S.__webglTexture=K[oe].texture}return O}function ie(S,v,O){return Math.floor(Math.floor(S/O)/v)}function ae(S,v,O,H){const oe=S.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,O,H,v.data);else{oe.sort((Ae,he)=>Ae.start-he.start);let ce=0;for(let Ae=1;Ae<oe.length;Ae++){const he=oe[ce],de=oe[Ae],Ce=he.start+he.count,Le=ie(de.start,v.width,4),Oe=ie(he.start,v.width,4);de.start<=Ce+1&&Le===Oe&&ie(de.start+de.count-1,v.width,4)===Le?he.count=Math.max(he.count,de.start+de.count-he.start):(++ce,oe[ce]=de)}oe.length=ce+1;const Z=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ae=0,he=oe.length;Ae<he;Ae++){const de=oe[Ae],Ce=Math.floor(de.start/4),Le=Math.ceil(de.count/4),Oe=Ce%v.width,L=Math.floor(Ce/v.width),le=Le,j=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,Oe,L,le,j,O,H,v.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Z),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function Ue(S,v,O){let H=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=n.TEXTURE_3D);const K=q(S,v),oe=v.source;t.bindTexture(H,S.__webglTexture,n.TEXTURE0+O);const ce=i.get(oe);if(oe.version!==ce.__version||K===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const j=qe.getPrimaries(qe.workingColorSpace),fe=v.colorSpace===li?null:qe.getPrimaries(v.colorSpace),ve=v.colorSpace===li||j===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=m(v.image,!1,r.maxTextureSize);ee=Vt(v,ee);const ue=s.convert(v.format,v.colorSpace),Ae=s.convert(v.type);let he=b(v.internalFormat,ue,Ae,v.normalized,v.colorSpace,v.isVideoTexture);_e(H,v);let de;const Ce=v.mipmaps,Le=v.isVideoTexture!==!0,Oe=ce.__version===void 0||K===!0,L=oe.dataReady,le=T(v,ee);if(v.isDepthTexture)he=w(v.format===Ai,v.type),Oe&&(Le?t.texStorage2D(n.TEXTURE_2D,1,he,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,he,ee.width,ee.height,0,ue,Ae,null));else if(v.isDataTexture)if(Ce.length>0){Le&&Oe&&t.texStorage2D(n.TEXTURE_2D,le,he,Ce[0].width,Ce[0].height);for(let j=0,fe=Ce.length;j<fe;j++)de=Ce[j],Le?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,Ae,de.data):t.texImage2D(n.TEXTURE_2D,j,he,de.width,de.height,0,ue,Ae,de.data);v.generateMipmaps=!1}else Le?(Oe&&t.texStorage2D(n.TEXTURE_2D,le,he,ee.width,ee.height),L&&ae(v,ee,ue,Ae)):t.texImage2D(n.TEXTURE_2D,0,he,ee.width,ee.height,0,ue,Ae,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Le&&Oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,he,Ce[0].width,Ce[0].height,ee.depth);for(let j=0,fe=Ce.length;j<fe;j++)if(de=Ce[j],v.format!==gn)if(ue!==null)if(Le){if(L)if(v.layerUpdates.size>0){const ve=cc(de.width,de.height,v.format,v.type);for(const ne of v.layerUpdates){const Te=de.data.subarray(ne*ve/de.data.BYTES_PER_ELEMENT,(ne+1)*ve/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ne,de.width,de.height,1,ue,Te)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,ee.depth,ue,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,he,de.width,de.height,ee.depth,0,de.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,ee.depth,ue,Ae,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,he,de.width,de.height,ee.depth,0,ue,Ae,de.data)}else{Le&&Oe&&t.texStorage2D(n.TEXTURE_2D,le,he,Ce[0].width,Ce[0].height);for(let j=0,fe=Ce.length;j<fe;j++)de=Ce[j],v.format!==gn?ue!==null?Le?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(n.TEXTURE_2D,j,he,de.width,de.height,0,de.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,Ae,de.data):t.texImage2D(n.TEXTURE_2D,j,he,de.width,de.height,0,ue,Ae,de.data)}else if(v.isDataArrayTexture)if(Le){if(Oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,he,ee.width,ee.height,ee.depth),L)if(v.layerUpdates.size>0){const j=cc(ee.width,ee.height,v.format,v.type);for(const fe of v.layerUpdates){const ve=ee.data.subarray(fe*j/ee.data.BYTES_PER_ELEMENT,(fe+1)*j/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,ee.width,ee.height,1,ue,Ae,ve)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ue,Ae,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,he,ee.width,ee.height,ee.depth,0,ue,Ae,ee.data);else if(v.isData3DTexture)Le?(Oe&&t.texStorage3D(n.TEXTURE_3D,le,he,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ue,Ae,ee.data)):t.texImage3D(n.TEXTURE_3D,0,he,ee.width,ee.height,ee.depth,0,ue,Ae,ee.data);else if(v.isFramebufferTexture){if(Oe)if(Le)t.texStorage2D(n.TEXTURE_2D,le,he,ee.width,ee.height);else{let j=ee.width,fe=ee.height;for(let ve=0;ve<le;ve++)t.texImage2D(n.TEXTURE_2D,ve,he,j,fe,0,ue,Ae,null),j>>=1,fe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),ee.parentNode!==j){j.appendChild(ee),f.add(v),j.onpaint=fe=>{const ve=fe.changedElements;for(const ne of f)ve.includes(ne.image)&&(ne.needsUpdate=!0)},j.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ee);else{const ve=n.RGBA,ne=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ve,ne,Te,ee)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Le&&Oe){const j=rt(Ce[0]);t.texStorage2D(n.TEXTURE_2D,le,he,j.width,j.height)}for(let j=0,fe=Ce.length;j<fe;j++)de=Ce[j],Le?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,ue,Ae,de):t.texImage2D(n.TEXTURE_2D,j,he,ue,Ae,de);v.generateMipmaps=!1}else if(Le){if(Oe){const j=rt(ee);t.texStorage2D(n.TEXTURE_2D,le,he,j.width,j.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Ae,ee)}else t.texImage2D(n.TEXTURE_2D,0,he,ue,Ae,ee);g(v)&&A(H),ce.__version=oe.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Fe(S,v,O){if(v.image.length!==6)return;const H=q(S,v),K=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+O);const oe=i.get(K);if(K.version!==oe.__version||H===!0){t.activeTexture(n.TEXTURE0+O);const ce=qe.getPrimaries(qe.workingColorSpace),Z=v.colorSpace===li?null:qe.getPrimaries(v.colorSpace),ee=v.colorSpace===li||ce===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ue=v.isCompressedTexture||v.image[0].isCompressedTexture,Ae=v.image[0]&&v.image[0].isDataTexture,he=[];for(let ne=0;ne<6;ne++)!ue&&!Ae?he[ne]=m(v.image[ne],!0,r.maxCubemapSize):he[ne]=Ae?v.image[ne].image:v.image[ne],he[ne]=Vt(v,he[ne]);const de=he[0],Ce=s.convert(v.format,v.colorSpace),Le=s.convert(v.type),Oe=b(v.internalFormat,Ce,Le,v.normalized,v.colorSpace),L=v.isVideoTexture!==!0,le=oe.__version===void 0||H===!0,j=K.dataReady;let fe=T(v,de);_e(n.TEXTURE_CUBE_MAP,v);let ve;if(ue){L&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Oe,de.width,de.height);for(let ne=0;ne<6;ne++){ve=he[ne].mipmaps;for(let Te=0;Te<ve.length;Te++){const be=ve[Te];v.format!==gn?Ce!==null?L?j&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te,0,0,be.width,be.height,Ce,be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te,Oe,be.width,be.height,0,be.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te,0,0,be.width,be.height,Ce,Le,be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te,Oe,be.width,be.height,0,Ce,Le,be.data)}}}else{if(ve=v.mipmaps,L&&le){ve.length>0&&fe++;const ne=rt(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Oe,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ae){L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,he[ne].width,he[ne].height,Ce,Le,he[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Oe,he[ne].width,he[ne].height,0,Ce,Le,he[ne].data);for(let Te=0;Te<ve.length;Te++){const gt=ve[Te].image[ne].image;L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te+1,0,0,gt.width,gt.height,Ce,Le,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te+1,Oe,gt.width,gt.height,0,Ce,Le,gt.data)}}else{L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ce,Le,he[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Oe,Ce,Le,he[ne]);for(let Te=0;Te<ve.length;Te++){const be=ve[Te];L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te+1,0,0,Ce,Le,be.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Te+1,Oe,Ce,Le,be.image[ne])}}}g(v)&&A(n.TEXTURE_CUBE_MAP),oe.__version=K.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Ie(S,v,O,H,K,oe){const ce=s.convert(O.format,O.colorSpace),Z=s.convert(O.type),ee=b(O.internalFormat,ce,Z,O.normalized,O.colorSpace),ue=i.get(v),Ae=i.get(O);if(Ae.__renderTarget=v,!ue.__hasExternalTextures){const he=Math.max(1,v.width>>oe),de=Math.max(1,v.height>>oe);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,oe,ee,he,de,v.depth,0,ce,Z,null):t.texImage2D(K,oe,ee,he,de,0,ce,Z,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),yt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,K,Ae.__webglTexture,0,mt(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,K,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(S,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,S),v.depthBuffer){const H=v.depthTexture,K=H&&H.isDepthTexture?H.type:null,oe=w(v.stencilBuffer,K),ce=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;yt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),oe,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),oe,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,oe,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,S)}else{const H=v.textures;for(let K=0;K<H.length;K++){const oe=H[K],ce=s.convert(oe.format,oe.colorSpace),Z=s.convert(oe.type),ee=b(oe.internalFormat,ce,Z,oe.normalized,oe.colorSpace);yt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),ee,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function We(S,v,O){const H=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(v.depthTexture);if(K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H){if(K.__webglInit===void 0&&(K.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),_e(n.TEXTURE_CUBE_MAP,v.depthTexture);const ue=s.convert(v.depthTexture.format),Ae=s.convert(v.depthTexture.type);let he;v.depthTexture.format===$n?he=n.DEPTH_COMPONENT24:v.depthTexture.format===Ai&&(he=n.DEPTH24_STENCIL8);for(let de=0;de<6;de++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,he,v.width,v.height,0,ue,Ae,null)}}else te(v.depthTexture,0);const oe=K.__webglTexture,ce=mt(v),Z=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,ee=v.depthTexture.format===Ai?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===$n)yt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,oe,0);else if(v.depthTexture.format===Ai)yt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(S){const v=i.get(S),O=S.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==S.depthTexture){const H=S.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",K)};H.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=H}if(S.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)We(v.__webglFramebuffer[H],S,H);else{const H=S.texture.mipmaps;H&&H.length>0?We(v.__webglFramebuffer[0],S,0):We(v.__webglFramebuffer,S,0)}else if(O){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=n.createRenderbuffer(),_t(v.__webglDepthbuffer[H],S,!1);else{const K=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,oe)}}else{const H=S.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),_t(v.__webglDepthbuffer,S,!1);else{const K=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(S,v,O){const H=i.get(S);v!==void 0&&Ie(H.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&lt(S)}function Qe(S){const v=S.texture,O=i.get(S),H=i.get(v);S.addEventListener("dispose",_);const K=S.textures,oe=S.isWebGLCubeRenderTarget===!0,ce=K.length>1;if(ce||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=v.version,a.memory.textures++),oe){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let ee=0;ee<v.mipmaps.length;ee++)O.__webglFramebuffer[Z][ee]=n.createFramebuffer()}else O.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<v.mipmaps.length;Z++)O.__webglFramebuffer[Z]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ce)for(let Z=0,ee=K.length;Z<ee;Z++){const ue=i.get(K[Z]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&yt(S)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){const ee=K[Z];O.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);const ue=s.convert(ee.format,ee.colorSpace),Ae=s.convert(ee.type),he=b(ee.internalFormat,ue,Ae,ee.normalized,ee.colorSpace,S.isXRRenderTarget===!0),de=mt(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,de,he,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),_t(O.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),_e(n.TEXTURE_CUBE_MAP,v);for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Ie(O.__webglFramebuffer[Z][ee],S,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ee);else Ie(O.__webglFramebuffer[Z],S,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);g(v)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let Z=0,ee=K.length;Z<ee;Z++){const ue=K[Z],Ae=i.get(ue);let he=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(he=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,Ae.__webglTexture),_e(he,ue),Ie(O.__webglFramebuffer,S,ue,n.COLOR_ATTACHMENT0+Z,he,0),g(ue)&&A(he)}t.unbindTexture()}else{let Z=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Z=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,H.__webglTexture),_e(Z,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Ie(O.__webglFramebuffer[ee],S,v,n.COLOR_ATTACHMENT0,Z,ee);else Ie(O.__webglFramebuffer,S,v,n.COLOR_ATTACHMENT0,Z,0);g(v)&&A(Z),t.unbindTexture()}S.depthBuffer&&lt(S)}function St(S){const v=S.textures;for(let O=0,H=v.length;O<H;O++){const K=v[O];if(g(K)){const oe=C(S),ce=i.get(K).__webglTexture;t.bindTexture(oe,ce),A(oe),t.unbindTexture()}}}const Tt=[],Rt=[];function It(S){if(S.samples>0){if(yt(S)===!1){const v=S.textures,O=S.width,H=S.height;let K=n.COLOR_BUFFER_BIT;const oe=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(S),Z=v.length>1;if(Z)for(let ue=0;ue<v.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const ee=S.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<v.length;ue++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Ae=i.get(v[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,O,H,0,0,O,H,K,n.NEAREST),l===!0&&(Tt.length=0,Rt.length=0,Tt.push(n.COLOR_ATTACHMENT0+ue),S.depthBuffer&&S.resolveDepthBuffer===!1&&(Tt.push(oe),Rt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Rt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ue=0;ue<v.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Ae=i.get(v[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const v=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function mt(S){return Math.min(r.maxSamples,S.samples)}function yt(S){const v=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(S){const v=a.render.frame;u.get(S)!==v&&(u.set(S,v),S.update())}function Vt(S,v){const O=S.colorSpace,H=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||O!==Fs&&O!==li&&(qe.getTransfer(O)===st?(H!==gn||K!==jt)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",O)),v}function rt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=Y,this.getTextureUnits=Q,this.setTextureUnits=B,this.setTexture2D=te,this.setTexture2DArray=se,this.setTexture3D=$,this.setTextureCube=W,this.rebindTextures=tt,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=yt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function kg(n,e){function t(i,r=li){let s;const a=qe.getTransfer(r);if(i===jt)return n.UNSIGNED_BYTE;if(i===Zo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Jo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===du)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===fu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===cu)return n.BYTE;if(i===uu)return n.SHORT;if(i===kr)return n.UNSIGNED_SHORT;if(i===Ko)return n.INT;if(i===Ln)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===hu)return n.ALPHA;if(i===pu)return n.RGB;if(i===gn)return n.RGBA;if(i===$n)return n.DEPTH_COMPONENT;if(i===Ai)return n.DEPTH_STENCIL;if(i===Qo)return n.RED;if(i===jo)return n.RED_INTEGER;if(i===Li)return n.RG;if(i===el)return n.RG_INTEGER;if(i===tl)return n.RGBA_INTEGER;if(i===As||i===ws||i===Rs||i===Cs)if(a===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===As)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===As)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===to||i===no||i===io||i===ro)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===to)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===no)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===io)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ro)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===so||i===ao||i===oo||i===lo||i===co||i===Us||i===uo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===so||i===ao)return a===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===oo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===lo)return s.COMPRESSED_R11_EAC;if(i===co)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Us)return s.COMPRESSED_RG11_EAC;if(i===uo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fo||i===ho||i===po||i===mo||i===go||i===vo||i===_o||i===xo||i===Mo||i===bo||i===So||i===yo||i===Eo||i===To)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===fo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ho)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===po)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===go)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_o)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===So)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===To)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ao||i===wo||i===Ro)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ao)return a===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ro)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Co||i===Po||i===Ns||i===Io)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Co)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ns)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Io)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Br?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zg=`
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

}`;class Gg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new yu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Dn({vertexShader:Bg,fragmentShader:zg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hg extends Ui{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,p=null;const x=typeof XRWebGLBinding<"u",m=new Gg,g={},A=t.getContextAttributes();let C=null,b=null;const w=[],T=[],R=new $e;let _=null;const E=new fn;E.viewport=new pt;const D=new fn;D.viewport=new pt;const P=[E,D],F=new Jf;let Y=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=w[q];return ie===void 0&&(ie=new ua,w[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=w[q];return ie===void 0&&(ie=new ua,w[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=w[q];return ie===void 0&&(ie=new ua,w[q]=ie),ie.getHandSpace()};function B(q){const ie=T.indexOf(q.inputSource);if(ie===-1)return;const ae=w[ie];ae!==void 0&&(ae.update(q.inputSource,q.frame,c||a),ae.dispatchEvent({type:q.type,data:q.inputSource}))}function J(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",V);for(let q=0;q<w.length;q++){const ie=T[q];ie!==null&&(T[q]=null,w[q].disconnect(ie))}Y=null,Q=null,m.reset();for(const q in g)delete g[q];e.setRenderTarget(C),h=null,d=null,f=null,r=null,b=null,_e.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",J),r.addEventListener("inputsourceschange",V),A.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ue=null,Fe=null;A.depth&&(Fe=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=A.stencil?Ai:$n,Ue=A.stencil?Br:Ln);const Ie={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ie),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new In(d.textureWidth,d.textureHeight,{format:gn,type:jt,depthTexture:new ur(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new In(h.framebufferWidth,h.framebufferHeight,{format:gn,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),_e.setContext(r),_e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(q){for(let ie=0;ie<q.removed.length;ie++){const ae=q.removed[ie],Ue=T.indexOf(ae);Ue>=0&&(T[Ue]=null,w[Ue].disconnect(ae))}for(let ie=0;ie<q.added.length;ie++){const ae=q.added[ie];let Ue=T.indexOf(ae);if(Ue===-1){for(let Ie=0;Ie<w.length;Ie++)if(Ie>=T.length){T.push(ae),Ue=Ie;break}else if(T[Ie]===null){T[Ie]=ae,Ue=Ie;break}if(Ue===-1)break}const Fe=w[Ue];Fe&&Fe.connect(ae)}}const te=new k,se=new k;function $(q,ie,ae){te.setFromMatrixPosition(ie.matrixWorld),se.setFromMatrixPosition(ae.matrixWorld);const Ue=te.distanceTo(se),Fe=ie.projectionMatrix.elements,Ie=ae.projectionMatrix.elements,_t=Fe[14]/(Fe[10]-1),We=Fe[14]/(Fe[10]+1),lt=(Fe[9]+1)/Fe[5],tt=(Fe[9]-1)/Fe[5],Qe=(Fe[8]-1)/Fe[0],St=(Ie[8]+1)/Ie[0],Tt=_t*Qe,Rt=_t*St,It=Ue/(-Qe+St),mt=It*-Qe;if(ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(mt),q.translateZ(It),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Fe[10]===-1)q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const yt=_t+It,U=We+It,Vt=Tt-mt,rt=Rt+(Ue-mt),S=lt*We/U*yt,v=tt*We/U*yt;q.projectionMatrix.makePerspective(Vt,rt,S,v,yt,U),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function W(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ie=q.near,ae=q.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),F.near=D.near=E.near=ie,F.far=D.far=E.far=ae,(Y!==F.near||Q!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),Y=F.near,Q=F.far),F.layers.mask=q.layers.mask|6,E.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;const Ue=q.parent,Fe=F.cameras;W(F,Ue);for(let Ie=0;Ie<Fe.length;Ie++)W(Fe[Ie],Ue);Fe.length===2?$(F,E,D):F.projectionMatrix.copy(E.projectionMatrix),re(q,F,Ue)};function re(q,ie,ae){ae===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy(ae.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Do*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(q){return g[q]};let Ee=null;function et(q,ie){if(u=ie.getViewerPose(c||a),p=ie,u!==null){const ae=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let Ue=!1;ae.length!==F.cameras.length&&(F.cameras.length=0,Ue=!0);for(let We=0;We<ae.length;We++){const lt=ae[We];let tt=null;if(h!==null)tt=h.getViewport(lt);else{const St=f.getViewSubImage(d,lt);tt=St.viewport,We===0&&(e.setRenderTargetTextures(b,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(b))}let Qe=P[We];Qe===void 0&&(Qe=new fn,Qe.layers.enable(We),Qe.viewport=new pt,P[We]=Qe),Qe.matrix.fromArray(lt.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(lt.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(tt.x,tt.y,tt.width,tt.height),We===0&&(F.matrix.copy(Qe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ue===!0&&F.cameras.push(Qe)}const Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const We=f.getDepthInformation(ae[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Fe&&Fe.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let We=0;We<ae.length;We++){const lt=ae[We].camera;if(lt){let tt=g[lt];tt||(tt=new yu,g[lt]=tt);const Qe=f.getCameraImage(lt);tt.sourceTexture=Qe}}}}for(let ae=0;ae<w.length;ae++){const Ue=T[ae],Fe=w[ae];Ue!==null&&Fe!==void 0&&Fe.update(Ue,ie,c||a)}Ee&&Ee(q,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),p=null}const _e=new Ru;_e.setAnimationLoop(et),this.setAnimationLoop=function(q){Ee=q},this.dispose=function(){}}}const Vg=new dt,Nu=new Ne;Nu.set(-1,0,0,0,1,0,0,0,1);function Wg(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Eu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,A,C,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),d(m,g),g.isMeshPhysicalMaterial&&h(m,g,b)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),x(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,A,C):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Yt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Yt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const A=e.get(g),C=A.envMap,b=A.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Nu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,A,C){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*A,m.scale.value=C*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function h(m,g,A){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Yt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){const A=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Xg(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const T=w.program;i.uniformBlockBinding(b,T)}function c(b,w){let T=r[b.id];T===void 0&&(m(b),T=u(b),r[b.id]=T,b.addEventListener("dispose",A));const R=w.program;i.updateUBOMapping(b,R);const _=e.render.frame;s[b.id]!==_&&(d(b),s[b.id]=_)}function u(b){const w=f();b.__bindingPointIndex=w;const T=n.createBuffer(),R=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,R,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,T),T}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const w=r[b.id],T=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,E=T.length;_<E;_++){const D=T[_];if(Array.isArray(D))for(let P=0,F=D.length;P<F;P++)h(D[P],_,P,R);else h(D,_,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(b,w,T,R){if(x(b,w,T,R)===!0){const _=b.__offset,E=b.value;if(Array.isArray(E)){let D=0;for(let P=0;P<E.length;P++){const F=E[P],Y=g(F);p(F,b.__data,D),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(D+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function p(b,w,T){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,T)}function x(b,w,T,R){const _=b.value,E=w+"_"+T;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{const D=R[E];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function m(b){const w=b.uniforms;let T=0;const R=16;for(let E=0,D=w.length;E<D;E++){const P=Array.isArray(w[E])?w[E]:[w[E]];for(let F=0,Y=P.length;F<Y;F++){const Q=P[F],B=Array.isArray(Q.value)?Q.value:[Q.value];for(let J=0,V=B.length;J<V;J++){const te=B[J],se=g(te),$=T%R,W=$%se.boundary,re=$+W;T+=W,re!==0&&R-re<se.storage&&(T+=R-re),Q.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=T,T+=se.storage}}}const _=T%R;return _>0&&(T+=R-_),b.__size=T,b.__cache={},this}function g(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):De("WebGLRenderer: Unsupported uniform value type.",b),w}function A(b){const w=b.target;w.removeEventListener("dispose",A);const T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function C(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:C}}const $g=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let En=null;function qg(){return En===null&&(En=new al($g,16,16,Li,Xn),En.name="DFG_LUT",En.minFilter=Ot,En.magFilter=Ot,En.wrapS=Hn,En.wrapT=Hn,En.generateMipmaps=!1,En.needsUpdate=!0),En}class Yg{constructor(e={}){const{canvas:t=df(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=jt}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=h,m=new Set([tl,el,jo]),g=new Set([jt,Ln,kr,Br,Zo,Jo]),A=new Uint32Array(4),C=new Int32Array(4),b=new k;let w=null,T=null;const R=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,F=null,Y=null,Q=null,B=null;this._outputColorSpace=Xt;let J=0,V=0,te=null,se=-1,$=null;const W=new pt,re=new pt;let Ee=null;const et=new Je(0);let _e=0,q=t.width,ie=t.height,ae=1,Ue=null,Fe=null;const Ie=new pt(0,0,q,ie),_t=new pt(0,0,q,ie);let We=!1;const lt=new ol;let tt=!1,Qe=!1;const St=new dt,Tt=new k,Rt=new pt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function yt(){return te===null?ae:1}let U=i;function Vt(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),U===null){const N="webgl2";if(U=Vt(N,M),U===null)throw Vt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Ze("WebGLRenderer: "+M.message),M}let rt,S,v,O,H,K,oe,ce,Z,ee,ue,Ae,he,de,Ce,Le,Oe,L,le,j,fe,ve,ne;function Te(){rt=new qm(U),rt.init(),fe=new kg(U,rt),S=new Bm(U,rt,e,fe),v=new Fg(U,rt),S.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),Y=U.createFramebuffer(),Q=U.createFramebuffer(),B=U.createFramebuffer(),O=new Zm(U),H=new Sg,K=new Og(U,rt,v,H,S,fe,O),oe=new $m(D),ce=new eh(U),ve=new Om(U,ce),Z=new Ym(U,ce,O,ve),ee=new Qm(U,Z,ce,ve,O),L=new Jm(U,S,K),Ce=new zm(H),ue=new bg(D,oe,rt,S,ve,Ce),Ae=new Wg(D,H),he=new Eg,de=new Pg(rt),Oe=new Fm(D,oe,v,ee,p,l),Le=new Ng(D,ee,S),ne=new Xg(U,O,S,v),le=new km(U,rt,O),j=new Km(U,rt,O),O.programs=ue.programs,D.capabilities=S,D.extensions=rt,D.properties=H,D.renderLists=he,D.shadowMap=Le,D.state=v,D.info=O}Te(),x!==jt&&(E=new e0(x,t.width,t.height,o,r,s));const be=new Hg(D,U);this.xr=be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=rt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=rt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(M){M!==void 0&&(ae=M,this.setSize(q,ie,!1))},this.getSize=function(M){return M.set(q,ie)},this.setSize=function(M,N,X=!0){if(be.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}q=M,ie=N,t.width=Math.floor(M*ae),t.height=Math.floor(N*ae),X===!0&&(t.style.width=M+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(q*ae,ie*ae).floor()},this.setDrawingBufferSize=function(M,N,X){q=M,ie=N,ae=X,t.width=Math.floor(M*X),t.height=Math.floor(N*X),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(x===jt){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(W)},this.getViewport=function(M){return M.copy(Ie)},this.setViewport=function(M,N,X,z){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,N,X,z),v.viewport(W.copy(Ie).multiplyScalar(ae).round())},this.getScissor=function(M){return M.copy(_t)},this.setScissor=function(M,N,X,z){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,N,X,z),v.scissor(re.copy(_t).multiplyScalar(ae).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(M){v.setScissorTest(We=M)},this.setOpaqueSort=function(M){Ue=M},this.setTransparentSort=function(M){Fe=M},this.getClearColor=function(M){return M.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor(...arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,X=!0){let z=0;if(M){let G=!1;if(te!==null){const ge=te.texture.format;G=m.has(ge)}if(G){const ge=te.texture.type,Me=g.has(ge),me=Oe.getClearColor(),Se=Oe.getClearAlpha(),we=me.r,ke=me.g,ze=me.b;Me?(A[0]=we,A[1]=ke,A[2]=ze,A[3]=Se,U.clearBufferuiv(U.COLOR,0,A)):(C[0]=we,C[1]=ke,C[2]=ze,C[3]=Se,U.clearBufferiv(U.COLOR,0,C))}else z|=U.COLOR_BUFFER_BIT}N&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),Oe.dispose(),he.dispose(),de.dispose(),H.dispose(),oe.dispose(),ee.dispose(),ve.dispose(),ne.dispose(),ue.dispose(),be.dispose(),be.removeEventListener("sessionstart",fl),be.removeEventListener("sessionend",hl),mi.stop()};function gt(M){M.preventDefault(),kl("WebGLRenderer: Context Lost."),P=!0}function ft(){kl("WebGLRenderer: Context Restored."),P=!1;const M=O.autoReset,N=Le.enabled,X=Le.autoUpdate,z=Le.needsUpdate,G=Le.type;Te(),O.autoReset=M,Le.enabled=N,Le.autoUpdate=X,Le.needsUpdate=z,Le.type=G}function Mn(M){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function bn(M){const N=M.target;N.removeEventListener("dispose",bn),ku(N)}function ku(M){Bu(M),H.remove(M)}function Bu(M){const N=H.get(M).programs;N!==void 0&&(N.forEach(function(X){ue.releaseProgram(X)}),M.isShaderMaterial&&ue.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,X,z,G,ge){N===null&&(N=It);const Me=G.isMesh&&G.matrixWorld.determinantAffine()<0,me=Hu(M,N,X,z,G);v.setMaterial(z,Me);let Se=X.index,we=1;if(z.wireframe===!0){if(Se=Z.getWireframeAttribute(X),Se===void 0)return;we=2}const ke=X.drawRange,ze=X.attributes.position;let Re=ke.start*we,at=(ke.start+ke.count)*we;ge!==null&&(Re=Math.max(Re,ge.start*we),at=Math.min(at,(ge.start+ge.count)*we)),Se!==null?(Re=Math.max(Re,0),at=Math.min(at,Se.count)):ze!=null&&(Re=Math.max(Re,0),at=Math.min(at,ze.count));const xt=at-Re;if(xt<0||xt===1/0)return;ve.setup(G,z,me,X,Se);let vt,ct=le;if(Se!==null&&(vt=ce.get(Se),ct=j,ct.setIndex(vt)),G.isMesh)z.wireframe===!0?(v.setLineWidth(z.wireframeLinewidth*yt()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(G.isLine){let Ut=z.linewidth;Ut===void 0&&(Ut=1),v.setLineWidth(Ut*yt()),G.isLineSegments?ct.setMode(U.LINES):G.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else G.isPoints?ct.setMode(U.POINTS):G.isSprite&&ct.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ut=G._multiDrawStarts,xe=G._multiDrawCounts,Kt=G._multiDrawCount,je=Se?ce.get(Se).bytesPerElement:1,en=H.get(z).currentProgram.getUniforms();for(let Sn=0;Sn<Kt;Sn++)en.setValue(U,"_gl_DrawID",Sn),ct.render(Ut[Sn]/je,xe[Sn])}else if(G.isInstancedMesh)ct.renderInstances(Re,xt,G.count);else if(X.isInstancedBufferGeometry){const Ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,xe=Math.min(X.instanceCount,Ut);ct.renderInstances(Re,xt,xe)}else ct.render(Re,xt)};function dl(M,N,X){M.transparent===!0&&M.side===zn&&M.forceSinglePass===!1?(M.side=Yt,M.needsUpdate=!0,Yr(M,N,X),M.side=hi,M.needsUpdate=!0,Yr(M,N,X),M.side=zn):Yr(M,N,X)}this.compile=function(M,N,X=null){X===null&&(X=M),T=de.get(X),T.init(N),_.push(T),X.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),M!==X&&M.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const z=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let Me=0;Me<ge.length;Me++){const me=ge[Me];dl(me,X,G),z.add(me)}else dl(ge,X,G),z.add(ge)}),T=_.pop(),z},this.compileAsync=function(M,N,X=null){const z=this.compile(M,N,X);return new Promise(G=>{function ge(){if(z.forEach(function(Me){H.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){G(M);return}setTimeout(ge,10)}rt.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Zs=null;function zu(M){Zs&&Zs(M)}function fl(){mi.stop()}function hl(){mi.start()}const mi=new Ru;mi.setAnimationLoop(zu),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(M){Zs=M,be.setAnimationLoop(M),M===null?mi.stop():mi.start()},be.addEventListener("sessionstart",fl),be.addEventListener("sessionend",hl),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(M,N);const X=be.enabled===!0&&be.isPresenting===!0,z=E!==null&&(te===null||X)&&E.begin(D,te);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(N),N=be.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,N,te),T=de.get(M,_.length),T.init(N),T.state.textureUnits=K.getTextureUnits(),_.push(T),St.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),lt.setFromProjectionMatrix(St,Cn,N.reversedDepth),Qe=this.localClippingEnabled,tt=Ce.init(this.clippingPlanes,Qe),w=he.get(M,R.length),w.init(),R.push(w),be.enabled===!0&&be.isPresenting===!0){const Me=D.xr.getDepthSensingMesh();Me!==null&&Js(Me,N,-1/0,D.sortObjects)}Js(M,N,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(Ue,Fe,N.reversedDepth),mt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,mt&&Oe.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Ce.beginShadows();const G=T.state.shadowsArray;if(Le.render(G,M,N),tt===!0&&Ce.endShadows(),(z&&E.hasRenderPass())===!1){const Me=w.opaque,me=w.transmissive;if(T.setupLights(),N.isArrayCamera){const Se=N.cameras;if(me.length>0)for(let we=0,ke=Se.length;we<ke;we++){const ze=Se[we];ml(Me,me,M,ze)}mt&&Oe.render(M);for(let we=0,ke=Se.length;we<ke;we++){const ze=Se[we];pl(w,M,ze,ze.viewport)}}else me.length>0&&ml(Me,me,M,N),mt&&Oe.render(M),pl(w,M,N)}te!==null&&V===0&&(K.updateMultisampleRenderTarget(te),K.updateRenderTargetMipmap(te)),z&&E.end(D),M.isScene===!0&&M.onAfterRender(D,M,N),ve.resetDefaultState(),se=-1,$=null,_.pop(),_.length>0?(T=_[_.length-1],K.setTextureUnits(T.state.textureUnits),tt===!0&&Ce.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,F!==null&&F.renderEnd()};function Js(M,N,X,z){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||lt.intersectsSprite(M)){z&&Rt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(St);const Me=ee.update(M),me=M.material;me.visible&&w.push(M,Me,me,X,Rt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||lt.intersectsObject(M))){const Me=ee.update(M),me=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Rt.copy(M.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Rt.copy(Me.boundingSphere.center)),Rt.applyMatrix4(M.matrixWorld).applyMatrix4(St)),Array.isArray(me)){const Se=Me.groups;for(let we=0,ke=Se.length;we<ke;we++){const ze=Se[we],Re=me[ze.materialIndex];Re&&Re.visible&&w.push(M,Me,Re,X,Rt.z,ze)}}else me.visible&&w.push(M,Me,me,X,Rt.z,null)}}const ge=M.children;for(let Me=0,me=ge.length;Me<me;Me++)Js(ge[Me],N,X,z)}function pl(M,N,X,z){const{opaque:G,transmissive:ge,transparent:Me}=M;T.setupLightsView(X),tt===!0&&Ce.setGlobalState(D.clippingPlanes,X),z&&v.viewport(W.copy(z)),G.length>0&&qr(G,N,X),ge.length>0&&qr(ge,N,X),Me.length>0&&qr(Me,N,X),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ml(M,N,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Re=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new In(1,1,{generateMipmaps:!0,type:Re?Xn:jt,minFilter:Ti,samples:Math.max(4,S.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const ge=T.state.transmissionRenderTarget[z.id],Me=z.viewport||W;ge.setSize(Me.z*D.transmissionResolutionScale,Me.w*D.transmissionResolutionScale);const me=D.getRenderTarget(),Se=D.getActiveCubeFace(),we=D.getActiveMipmapLevel();D.setRenderTarget(ge),D.getClearColor(et),_e=D.getClearAlpha(),_e<1&&D.setClearColor(16777215,.5),D.clear(),mt&&Oe.render(X);const ke=D.toneMapping;D.toneMapping=Pn;const ze=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),tt===!0&&Ce.setGlobalState(D.clippingPlanes,z),qr(M,X,z),K.updateMultisampleRenderTarget(ge),K.updateRenderTargetMipmap(ge),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let at=0,xt=N.length;at<xt;at++){const vt=N[at],{object:ct,geometry:Ut,material:xe,group:Kt}=vt;if(xe.side===zn&&ct.layers.test(z.layers)){const je=xe.side;xe.side=Yt,xe.needsUpdate=!0,gl(ct,X,z,Ut,xe,Kt),xe.side=je,xe.needsUpdate=!0,Re=!0}}Re===!0&&(K.updateMultisampleRenderTarget(ge),K.updateRenderTargetMipmap(ge))}D.setRenderTarget(me,Se,we),D.setClearColor(et,_e),ze!==void 0&&(z.viewport=ze),D.toneMapping=ke}function qr(M,N,X){const z=N.isScene===!0?N.overrideMaterial:null;for(let G=0,ge=M.length;G<ge;G++){const Me=M[G],{object:me,geometry:Se,group:we}=Me;let ke=Me.material;ke.allowOverride===!0&&z!==null&&(ke=z),me.layers.test(X.layers)&&gl(me,N,X,Se,ke,we)}}function gl(M,N,X,z,G,ge){M.onBeforeRender(D,N,X,z,G,ge),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(D,N,X,z,M,ge),G.transparent===!0&&G.side===zn&&G.forceSinglePass===!1?(G.side=Yt,G.needsUpdate=!0,D.renderBufferDirect(X,N,z,G,M,ge),G.side=hi,G.needsUpdate=!0,D.renderBufferDirect(X,N,z,G,M,ge),G.side=zn):D.renderBufferDirect(X,N,z,G,M,ge),M.onAfterRender(D,N,X,z,G,ge)}function Yr(M,N,X){N.isScene!==!0&&(N=It);const z=H.get(M),G=T.state.lights,ge=T.state.shadowsArray,Me=G.state.version,me=ue.getParameters(M,G.state,ge,N,X,T.state.lightProbeGridArray),Se=ue.getProgramCacheKey(me);let we=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;const ke=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=oe.get(M.envMap||z.environment,ke),z.envMapRotation=z.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",bn),we=new Map,z.programs=we);let ze=we.get(Se);if(ze!==void 0){if(z.currentProgram===ze&&z.lightsStateVersion===Me)return _l(M,me),ze}else me.uniforms=ue.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,X,me),M.onBeforeCompile(me,D),ze=ue.acquireProgram(me,Se),we.set(Se,ze),z.uniforms=me.uniforms;const Re=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Ce.uniform),_l(M,me),z.needsLights=Wu(M),z.lightsStateVersion=Me,z.needsLights&&(Re.ambientLightColor.value=G.state.ambient,Re.lightProbe.value=G.state.probe,Re.directionalLights.value=G.state.directional,Re.directionalLightShadows.value=G.state.directionalShadow,Re.spotLights.value=G.state.spot,Re.spotLightShadows.value=G.state.spotShadow,Re.rectAreaLights.value=G.state.rectArea,Re.ltc_1.value=G.state.rectAreaLTC1,Re.ltc_2.value=G.state.rectAreaLTC2,Re.pointLights.value=G.state.point,Re.pointLightShadows.value=G.state.pointShadow,Re.hemisphereLights.value=G.state.hemi,Re.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Re.spotLightMatrix.value=G.state.spotLightMatrix,Re.spotLightMap.value=G.state.spotLightMap,Re.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=ze,z.uniformsList=null,ze}function vl(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Ps.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function _l(M,N){const X=H.get(M);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function Gu(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(N.matrixWorld);for(let X=0,z=M.length;X<z;X++){const G=M[X];if(G.texture!==null&&G.boundingBox.containsPoint(b))return G}return null}function Hu(M,N,X,z,G){N.isScene!==!0&&(N=It),K.resetTextureUnits();const ge=N.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,me=te===null?D.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:qe.workingColorSpace,Se=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,we=oe.get(z.envMap||Me,Se),ke=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ze=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,xt=!!X.morphAttributes.color;let vt=Pn;z.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(vt=D.toneMapping);const ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ut=ct!==void 0?ct.length:0,xe=H.get(z),Kt=T.state.lights;if(tt===!0&&(Qe===!0||M!==$)){const ht=M===$&&z.id===se;Ce.setState(z,M,ht)}let je=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Kt.state.version||xe.outputColorSpace!==me||G.isBatchedMesh&&xe.batching===!1||!G.isBatchedMesh&&xe.batching===!0||G.isBatchedMesh&&xe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xe.instancing===!1||!G.isInstancedMesh&&xe.instancing===!0||G.isSkinnedMesh&&xe.skinning===!1||!G.isSkinnedMesh&&xe.skinning===!0||G.isInstancedMesh&&xe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xe.instancingMorph===!1&&G.morphTexture!==null||xe.envMap!==we||z.fog===!0&&xe.fog!==ge||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Ce.numPlanes||xe.numIntersection!==Ce.numIntersection)||xe.vertexAlphas!==ke||xe.vertexTangents!==ze||xe.morphTargets!==Re||xe.morphNormals!==at||xe.morphColors!==xt||xe.toneMapping!==vt||xe.morphTargetsCount!==Ut||!!xe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,xe.__version=z.version);let en=xe.currentProgram;je===!0&&(en=Yr(z,N,G),F&&z.isNodeMaterial&&F.onUpdateProgram(z,en,xe));let Sn=!1,Kn=!1,Fi=!1;const ut=en.getUniforms(),Mt=xe.uniforms;if(v.useProgram(en.program)&&(Sn=!0,Kn=!0,Fi=!0),z.id!==se&&(se=z.id,Kn=!0),xe.needsLights){const ht=Gu(T.state.lightProbeGridArray,G);xe.lightProbeGrid!==ht&&(xe.lightProbeGrid=ht,Kn=!0)}if(Sn||$!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ut.setValue(U,"projectionMatrix",M.projectionMatrix),ut.setValue(U,"viewMatrix",M.matrixWorldInverse);const Jn=ut.map.cameraPosition;Jn!==void 0&&Jn.setValue(U,Tt.setFromMatrixPosition(M.matrixWorld)),S.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),$!==M&&($=M,Kn=!0,Fi=!0)}if(xe.needsLights&&(Kt.state.directionalShadowMap.length>0&&ut.setValue(U,"directionalShadowMap",Kt.state.directionalShadowMap,K),Kt.state.spotShadowMap.length>0&&ut.setValue(U,"spotShadowMap",Kt.state.spotShadowMap,K),Kt.state.pointShadowMap.length>0&&ut.setValue(U,"pointShadowMap",Kt.state.pointShadowMap,K)),G.isSkinnedMesh){ut.setOptional(U,G,"bindMatrix"),ut.setOptional(U,G,"bindMatrixInverse");const ht=G.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),ut.setValue(U,"boneTexture",ht.boneTexture,K))}G.isBatchedMesh&&(ut.setOptional(U,G,"batchingTexture"),ut.setValue(U,"batchingTexture",G._matricesTexture,K),ut.setOptional(U,G,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",G._indirectTexture,K),ut.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",G._colorsTexture,K));const Zn=X.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&L.update(G,X,en),(Kn||xe.receiveShadow!==G.receiveShadow)&&(xe.receiveShadow=G.receiveShadow,ut.setValue(U,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Mt.envMapIntensity.value=N.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=qg()),Kn){if(ut.setValue(U,"toneMappingExposure",D.toneMappingExposure),xe.needsLights&&Vu(Mt,Fi),ge&&z.fog===!0&&Ae.refreshFogUniforms(Mt,ge),Ae.refreshMaterialUniforms(Mt,z,ae,ie,T.state.transmissionRenderTarget[M.id]),xe.needsLights&&xe.lightProbeGrid){const ht=xe.lightProbeGrid;Mt.probesSH.value=ht.texture,Mt.probesMin.value.copy(ht.boundingBox.min),Mt.probesMax.value.copy(ht.boundingBox.max),Mt.probesResolution.value.copy(ht.resolution)}Ps.upload(U,vl(xe),Mt,K)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ps.upload(U,vl(xe),Mt,K),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(U,"center",G.center),ut.setValue(U,"modelViewMatrix",G.modelViewMatrix),ut.setValue(U,"normalMatrix",G.normalMatrix),ut.setValue(U,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ht=z.uniformsGroups;for(let Jn=0,Oi=ht.length;Jn<Oi;Jn++){const xl=ht[Jn];ne.update(xl,en),ne.bind(xl,en)}}return en}function Vu(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Wu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(M,N,X){const z=H.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(M.texture).__webglTexture=N,H.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const X=H.get(M);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,X=0){te=M,J=N,V=X;let z=null,G=!1,ge=!1;if(M){const me=H.get(M);if(me.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,me.__webglFramebuffer),W.copy(M.viewport),re.copy(M.scissor),Ee=M.scissorTest,v.viewport(W),v.scissor(re),v.setScissorTest(Ee),se=-1;return}else if(me.__webglFramebuffer===void 0)K.setupRenderTarget(M);else if(me.__hasExternalTextures)K.rebindTextures(M,H.get(M.texture).__webglTexture,H.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ke=M.depthTexture;if(me.__boundDepthTexture!==ke){if(ke!==null&&H.has(ke)&&(M.width!==ke.image.width||M.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(M)}}const Se=M.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(ge=!0);const we=H.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(we[N])?z=we[N][X]:z=we[N],G=!0):M.samples>0&&K.useMultisampledRTT(M)===!1?z=H.get(M).__webglMultisampledFramebuffer:Array.isArray(we)?z=we[X]:z=we,W.copy(M.viewport),re.copy(M.scissor),Ee=M.scissorTest}else W.copy(Ie).multiplyScalar(ae).floor(),re.copy(_t).multiplyScalar(ae).floor(),Ee=We;if(X!==0&&(z=Y),v.bindFramebuffer(U.FRAMEBUFFER,z)&&v.drawBuffers(M,z),v.viewport(W),v.scissor(re),v.setScissorTest(Ee),G){const me=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,me.__webglTexture,X)}else if(ge){const me=N;for(let Se=0;Se<M.textures.length;Se++){const we=H.get(M.textures[Se]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Se,we.__webglTexture,X,me)}}else if(M!==null&&X!==0){const me=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,me.__webglTexture,X)}se=-1},this.readRenderTargetPixels=function(M,N,X,z,G,ge,Me,me=0){if(!(M&&M.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Se=Se[Me]),Se){v.bindFramebuffer(U.FRAMEBUFFER,Se);try{const we=M.textures[me],ke=we.format,ze=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+me),!S.textureFormatReadable(ke)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!S.textureTypeReadable(ze)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-z&&X>=0&&X<=M.height-G&&U.readPixels(N,X,z,G,fe.convert(ke),fe.convert(ze),ge)}finally{const we=te!==null?H.get(te).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,N,X,z,G,ge,Me,me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Se=Se[Me]),Se)if(N>=0&&N<=M.width-z&&X>=0&&X<=M.height-G){v.bindFramebuffer(U.FRAMEBUFFER,Se);const we=M.textures[me],ke=we.format,ze=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+me),!S.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!S.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.bufferData(U.PIXEL_PACK_BUFFER,ge.byteLength,U.STREAM_READ),U.readPixels(N,X,z,G,fe.convert(ke),fe.convert(ze),0);const at=te!==null?H.get(te).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,at);const xt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ff(U,xt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ge),U.deleteBuffer(Re),U.deleteSync(xt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,X=0){const z=Math.pow(2,-X),G=Math.floor(M.image.width*z),ge=Math.floor(M.image.height*z),Me=N!==null?N.x:0,me=N!==null?N.y:0;K.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Me,me,G,ge),v.unbindTexture()},this.copyTextureToTexture=function(M,N,X=null,z=null,G=0,ge=0){let Me,me,Se,we,ke,ze,Re,at,xt;const vt=M.isCompressedTexture?M.mipmaps[ge]:M.image;if(X!==null)Me=X.max.x-X.min.x,me=X.max.y-X.min.y,Se=X.isBox3?X.max.z-X.min.z:1,we=X.min.x,ke=X.min.y,ze=X.isBox3?X.min.z:0;else{const Mt=Math.pow(2,-G);Me=Math.floor(vt.width*Mt),me=Math.floor(vt.height*Mt),M.isDataArrayTexture?Se=vt.depth:M.isData3DTexture?Se=Math.floor(vt.depth*Mt):Se=1,we=0,ke=0,ze=0}z!==null?(Re=z.x,at=z.y,xt=z.z):(Re=0,at=0,xt=0);const ct=fe.convert(N.format),Ut=fe.convert(N.type);let xe;N.isData3DTexture?(K.setTexture3D(N,0),xe=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(K.setTexture2DArray(N,0),xe=U.TEXTURE_2D_ARRAY):(K.setTexture2D(N,0),xe=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Kt=v.getParameter(U.UNPACK_ROW_LENGTH),je=v.getParameter(U.UNPACK_IMAGE_HEIGHT),en=v.getParameter(U.UNPACK_SKIP_PIXELS),Sn=v.getParameter(U.UNPACK_SKIP_ROWS),Kn=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,vt.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,vt.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,we),v.pixelStorei(U.UNPACK_SKIP_ROWS,ke),v.pixelStorei(U.UNPACK_SKIP_IMAGES,ze);const Fi=M.isDataArrayTexture||M.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const Mt=H.get(M),Zn=H.get(N),ht=H.get(Mt.__renderTarget),Jn=H.get(Zn.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,ht.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let Oi=0;Oi<Se;Oi++)Fi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(M).__webglTexture,G,ze+Oi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(N).__webglTexture,ge,xt+Oi)),U.blitFramebuffer(we,ke,Me,me,Re,at,Me,me,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||H.has(M)){const Mt=H.get(M),Zn=H.get(N);v.bindFramebuffer(U.READ_FRAMEBUFFER,Q),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,B);for(let ht=0;ht<Se;ht++)Fi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.__webglTexture,G,ze+ht):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Mt.__webglTexture,G),ut?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Zn.__webglTexture,ge,xt+ht):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Zn.__webglTexture,ge),G!==0?U.blitFramebuffer(we,ke,Me,me,Re,at,Me,me,U.COLOR_BUFFER_BIT,U.NEAREST):ut?U.copyTexSubImage3D(xe,ge,Re,at,xt+ht,we,ke,Me,me):U.copyTexSubImage2D(xe,ge,Re,at,we,ke,Me,me);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ut?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(xe,ge,Re,at,xt,Me,me,Se,ct,Ut,vt.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(xe,ge,Re,at,xt,Me,me,Se,ct,vt.data):U.texSubImage3D(xe,ge,Re,at,xt,Me,me,Se,ct,Ut,vt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ge,Re,at,Me,me,ct,Ut,vt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ge,Re,at,vt.width,vt.height,ct,vt.data):U.texSubImage2D(U.TEXTURE_2D,ge,Re,at,Me,me,ct,Ut,vt);v.pixelStorei(U.UNPACK_ROW_LENGTH,Kt),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,je),v.pixelStorei(U.UNPACK_SKIP_PIXELS,en),v.pixelStorei(U.UNPACK_SKIP_ROWS,Sn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Kn),ge===0&&N.generateMipmaps&&U.generateMipmap(xe),v.unbindTexture()},this.initRenderTarget=function(M){H.get(M).__webglFramebuffer===void 0&&K.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?K.setTextureCube(M,0):M.isData3DTexture?K.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?K.setTexture2DArray(M,0):K.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){J=0,V=0,te=null,v.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}function ll(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new al(t,128,128);return i.wrapS=i.wrapT=Ds,i.colorSpace=Xt,i.needsUpdate=!0,i}const Oo=ll("wood"),Fu=ll("stone"),Ir=ll("cloth"),y={stone:new bt({color:Qn.materials.stone,map:Fu,roughness:.72}),wall:new bt({color:Qn.materials.wall,roughness:.88}),wood:new bt({color:Qn.materials.wood,map:Oo,roughness:.52}),walnut:new bt({color:Qn.materials.darkWood,map:Oo,roughness:.5}),gold:new bt({color:Qn.materials.metal,metalness:.7,roughness:.36}),navy:new bt({color:Qn.materials.blue,roughness:.65}),white:new bt({color:Qn.materials.linen,map:Ir,roughness:.93}),teal:new bt({color:Qn.materials.accent,map:Ir,roughness:.83}),rust:new bt({color:9920067,map:Ir,roughness:.84}),carpet:new bt({color:6845561,map:Ir,roughness:1}),black:new bt({color:1449508,roughness:.6}),green:new bt({color:3495746,roughness:.86}),leaf:new bt({color:6651984,roughness:.8}),glass:new bt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new bt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new bt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new bt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new bt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new bt({color:14000506,roughness:.9}),hair:new bt({color:2433314,roughness:.9}),ao:new Xr({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},ko=new Map;function Kg(n){let e=ko.get(n);return e||(e=new bt({color:n,roughness:.75}),ko.set(n,e)),e}function Zg(){Object.values(y).forEach(n=>n.dispose()),ko.forEach(n=>n.dispose()),[Oo,Fu,Ir].forEach(n=>n.dispose())}const $r={box:new mr(1,1,1),cylinder:new Vs(1,1,1,12),sphere:new Bs(1,12,8),leaf:new Bs(1,8,6),cone:new Ws(1,1,16),plane:new gr(1,1)};function I(n,e,t,i,r,s,a,o=y.wood){const l=new Pt($r.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function He(n,e,t,i,r,s,a=y.gold){const o=new Pt($r.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Tn(n,e,t,i,r,s,a,o=y.leaf){const l=new Pt($r.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function Ys(n,e,t,i,r,s=.022){const a=new Pt($r.plane,y.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function zt(n,e,t,i=1,r=0){const s=new kt;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),He(s,0,.21,0,.21,.42,y.stone),He(s,0,.76,0,.027,1.1,y.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Tn(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?y.leaf:y.green).rotation.set(.3,o,Math.sin(o)*.65)}return Ys(s,0,0,.7,.55),s}function wn(n,e,t,i,r=1){const s=new kt;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),He(s,0,.035,0,.11,.045,y.gold),He(s,0,.21,0,.019,.36,y.gold),He(s,0,.42,0,.16,.22,y.shade),He(s,0,.315,0,.135,.015,y.glow),s}function wi(n,e,t,i=0,r=y.teal){const s=new kt;s.position.set(e,0,t),s.rotation.y=i,n.add(s),I(s,0,.43,0,.55,.14,.56,r),I(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])He(s,a*.2,.2,o*.2,.025,.4,y.walnut);return s}function Bn(n,e,t,i=0,r=1.5,s=y.teal){const a=new kt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),I(a,0,.32,0,r,.42,.64,s),I(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])I(a,o*(r/2-.08),.56,0,.16,.4,.7,s),I(a,o*r*.23,.55,-.17,.35,.28,.11,y.white);return I(a,0,.58,.04,r-.3,.11,.44,s),Ys(a,0,0,r+.15,.95),a}function oi(n,e,t,i=.42){He(n,e,.37,t,.055,.74,y.gold),He(n,e,.75,t,i,.07,y.stone),He(n,e,.04,t,i*.5,.06,y.walnut)}function Ur(n,e,t,i){He(n,e,t,i,.07,.13,y.white),He(n,e,t-.065,i,.12,.018,y.white)}function Ri(n,e,t,i,r=1.15,s=.65,a=0){I(n,e,t,i,r+.07,s+.07,.06,y.gold),I(n,e,t,i+.04,r,s,.015,y.white),I(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?y.teal:y.window),I(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,y.stone),Tn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,y.rust)}function Jg(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Pt)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new bu(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function Qg(n){const e=n.level??1,t=new kt;t.name=n.id,t.userData.entityId=n.id,I(t,0,.04,0,4.7,.08,3.1,e>=4?y.stone:e>=2?y.walnut:y.wood),I(t,0,1.19,-1.51,4.7,2.38,.14,y.wall),I(t,2.35,1.14,-.1,.1,2.28,2.75,y.stone),I(t,1.6,1.25,-1.41,1.05,1.9,.035,y.window);for(const a of[1.1,1.6,2.1])I(t,a,1.25,-1.35,.035,1.94,.04,y.gold);I(t,1.6,1.25,-1.35,1.08,.04,.04,y.gold);for(let a=1.03;a<1.26;a+=.06)I(t,a,1.28,-1.23,.04,1.94,.13,y.white);if(I(t,0,2.27,-1.27,4.53,.06,.065,y.glow),n.construction){for(const a of[-1.8,0,1.8])I(t,a,1.05,1.5,.07,2.1,.07,y.gold),I(t,a,.4,.4,.65,.7,.7,y.stone);for(const a of[.5,1.4,2.15])I(t,0,a,1.5,4.5,.06,.06,y.gold);return I(t,0,.8,1.55,4.5,.48,.06,y.navy),t}if(n.status==="unbuilt")return I(t,0,.12,0,3.8,.08,2.5,y.stone),t;const i=Fc(n),r=Nc(n)==="twin";I(t,-.67,.078,.07,2.85,.02,2.66,y.carpet);const s=(a,o)=>{I(t,a,.28,-.03,o+.09,.39,1.9,y.walnut),I(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?y.stone:y.white),I(t,a,.7,-.98,o+.13,1.22,.12,y.walnut),I(t,a,.82,-.89,o-.05,.63,.08,y.teal),I(t,a,.67,-.58,o*.82,.13,.36,y.white),e>=2&&(I(t,a,.78,-.72,o*.78,.12,.25,y.white),I(t,a,.655,.18,o,.045,.45,e>=4?y.white:y.teal)),I(t,a,.646,.54,o,.075,.39,e>=4?y.gold:i?y.rust:y.teal),I(t,a,.49,1,o,.28,.04,y.white),Ys(t,a,0,o+.25,2.25)};r?(s(-1.36,.88),s(-.22,.88)):s(-.75,1.68);for(const a of[-1.94,.43])I(t,a,.35,-.76,.41,.58,.5,y.walnut),I(t,a,.66,-.76,.45,.06,.53,y.stone),wn(t,a,.69,-.77,.8);if(Ri(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)I(t,1.65,.38,-.4,.9,.65,.85,y.stone),I(t,1.65,.73,-.4,.85,.08,.8,y.white),He(t,1.65,.83,-.65,.025,.22,y.gold),I(t,2.16,1.25,-.35,.025,1.8,1.5,y.glass),I(t,1.6,1.93,-1.14,.3,.04,.25,y.gold),Ri(t,1.5,1.6,-1.33,.8,.5,e),Bn(t,1.58,.76,-Math.PI/2,.75,y.white);else if(i)Bn(t,1.55,.22,-Math.PI/2,1.3,y.rust),oi(t,.97,.8,.25);else{I(t,1.61,.76,-.57,1.1,.1,.57,y.walnut);for(const a of[1.19,2.03])I(t,a,.37,-.57,.05,.75,.46,y.gold);I(t,1.59,.94,-.64,.35,.28,.04,y.screen),wi(t,1.65,.06,Math.PI),wn(t,2,.82,-.62,.66)}if(fi(n)==="view"||fi(n)==="premium"){I(t,0,1.45,-1.4,4.15,1.65,.025,y.window);for(const a of[-2,0,2])I(t,a,1.45,-1.35,.045,1.7,.045,y.gold)}if(fi(n)==="premium"&&(I(t,0,2.1,-1.25,4.5,.08,.08,y.gold),Ri(t,-1.6,1.8,-1.3,.8,.4,99),zt(t,1.95,.55,1.15)),n.extraBed&&(I(t,.5,.25,1.02,.8,.3,.8,y.walnut),I(t,.5,.43,1.02,.8,.08,.8,y.white)),zt(t,2.05,1.05,.63),(n.level??1)>1&&(Ri(t,-2.05,1.6,-1.38,.38,.56,n.level),zt(t,-2.05,.35,.55)),e>=3&&(wn(t,-1.94,1.25,-.9,1.1),I(t,-.75,1.62,-1.25,2.1,.025,.03,y.glow)),e>=5){I(t,0,1.4,-1.42,4.3,1.9,.025,y.window);for(const a of[-2,-.8,.8,2])I(t,a,1.4,-1.35,.04,1.95,.06,y.gold);for(const a of[-1.8,0,1.8])I(t,a,.09,.15,.025,.02,2.9,y.gold);for(const a of[2.12,2.24])I(t,0,a,-1.1,4.5,.035,.035,y.glow)}if((n.level??1)>2&&I(t,0,2.12,-1.3,4.55,.035,.055,y.gold),I(t,-2.12,.52,.95,.22,1,.28,y.walnut),n.status==="reserved"&&(n.suaBookingId&&I(t,0,1.1,1.62,.38,.5,.05,y.rust),I(t,1.2,.48,1.48,.25,.29,.1,y.gold)),n.status==="cleaning"){I(t,1.05,.37,1.57,.55,.55,.35,y.navy);for(const a of[.83,1.27])He(t,a,.09,1.57,.07,.07,y.black);I(t,1.05,.71,1.57,.6,.04,.41,y.gold),I(t,.95,.79,1.57,.3,.12,.22,y.white)}if(n.status==="occupied"&&I(t,0,2.23,.7,3.8,.035,.035,y.shade),n.status==="maintenance"){const a=I(t,.9,1.95,1.55,.17,.17,.08,y.glow);a.name="fault-lamp",a.userData.interactive=!0,I(t,.6,.33,.9,.8,.1,.8,y.rust),I(t,.6,.52,.9,.1,.6,.1,y.gold)}return t}function ys(n,e,t,i=2.12){He(n,e,i+.13,t,.012,.45,y.gold),He(n,e,i-.08,t,.24,.18,y.gold),He(n,e,i-.18,t,.21,.015,y.glow)}function jg(n,e){if(I(n,0,1.2,-1.54,14.65,2.4,.14,y.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)I(n,t,1.2,-1.42,.035,2.38,.08,y.gold);else for(let t=-7;t<7;t+=.58)I(n,t,1.2,-1.43,.022,2.2,.04,y.wood)}function er(n,e,t){I(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,y.window);for(let i=e;i<=t+.01;i+=.72)I(n,i,1.23,-1.32,.045,2.17,.06,y.gold);I(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,y.gold)}function ev(n,e,t){oi(n,e,t,.44),wi(n,e-.63,t,Math.PI/2),wi(n,e+.63,t,-Math.PI/2),Ur(n,e-.18,.87,t),Ur(n,e+.18,.87,t),He(n,e,.83,t,.065,.12,y.gold)}function Ua(n,e,t){I(n,e,1.23,-1.35,t,1.86,.18,y.walnut);for(let i=.53;i<2;i+=.39){I(n,e,i,-1.14,t,.04,.42,y.gold),I(n,e,i+.035,-1.18,t-.1,.025,.05,y.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;He(n,s,i+.13,-1.08,.048,.23,r%3?y.green:y.rust),He(n,s,i+.27,-1.08,.019,.07,y.gold)}}}function tv(n,e=1,t=100,i=!1){const r=new kt;if(n!=="rooftop"&&(jg(r,n),I(r,0,.04,0,14.66,.08,3.15,n==="lobby"?y.stone:y.wood),I(r,0,2.31,-1.21,14.5,.04,.07,y.glow)),i){for(const s of[-6,-3,0,3,6])I(r,s,1.1,1.4,.08,2.2,.08,y.gold);for(const s of[.5,1.5,2.1])I(r,0,s,1.4,14,.08,.08,y.gold);return I(r,0,.8,1.5,14,.65,.04,y.navy),r}if(n==="lobby"){er(r,4.3,7.2),I(r,0,1.35,-1.33,6.7,1.8,.11,y.stone),I(r,0,.48,.5,6.2,.84,.62,y.walnut),I(r,0,.94,.5,6.45,.12,.83,y.stone),I(r,0,.15,.86,6.08,.075,.035,y.glow);for(let s=-2.9;s<3;s+=.18)I(r,s,.5,.824,.035,.6,.025,y.gold);for(const s of[-1.8,1.7])I(r,s,1.12,.2,.42,.29,.045,y.screen),wn(r,s+.55,1.02,.46,.72);zt(r,-3.9,-.7,1.72),zt(r,4,-.55,1.6),Bn(r,-5.75,.08,Math.PI/2,1.65,y.white),oi(r,-5.02,1,.47),zt(r,-6.4,1.4,.55),I(r,5.8,.045,1.18,2.2,.03,1.25,y.navy);for(const s of[4.65,6.95])I(r,s,1.13,.85,.08,2.28,.08,y.gold),I(r,s,1.17,.79,.65,2.18,.025,y.glass);I(r,5.8,2.18,1.24,2.6,.16,1.72,y.navy),I(r,5.8,2.08,2.03,2.55,.035,.04,y.gold);for(const s of[3.5,4.1])He(r,s,.67,1.8,.025,1.15,y.gold),He(r,s,.09,1.8,.08,.1,y.black);I(r,3.8,1.27,1.8,.65,.035,.04,y.gold),I(r,3.8,.18,1.8,.78,.08,.51,y.gold),I(r,3.76,.43,1.8,.37,.45,.25,y.rust);for(const s of[-2.8,0,2.8])ys(r,s,.1,2.02)}else if(n==="breakfast"){er(r,4.3,7.2),Ua(r,0,4.5),I(r,0,.52,-.15,5,.9,.8,y.walnut),I(r,0,1.01,-.15,5.2,.12,.97,y.stone);for(const s of t>0?[-1.7,-.7,.3]:[])I(r,s,1.14,-.17,.66,.14,.45,y.gold),I(r,s,1.24,-.17,.6,.08,.38,y.white);I(r,1.5,1.29,-.24,.43,.53,.38,y.black),He(r,2.1,1.28,-.2,.15,.4,y.glass),He(r,2.1,1.13,-.2,.145,.09,y.rust);for(const s of[-5.55,-3.4,3.8,6])ev(r,s,.68);for(const s of[-5.55,-3.4,0,3.8,6])ys(r,s,.5);zt(r,-6.9,-.87,1.1),zt(r,6.8,-.8,1.1)}else if(n==="club"){er(r,-7.2,-3.8),er(r,3.8,7.2),Ua(r,0,5.4),I(r,0,.58,-.24,5.55,1.02,.58,y.walnut),I(r,0,1.12,-.24,5.8,.11,.79,y.stone),I(r,0,.25,.071,5.5,.05,.035,y.glow);for(const s of[-1.8,-.6,.6,1.8])He(r,s,.6,.6,.24,.12,y.teal),He(r,s,.28,.6,.035,.58,y.gold),t>0&&Ur(r,s,1.24,-.15),ys(r,s,-.24);Bn(r,-5.6,-.54,0,2.05,y.teal),oi(r,-5.6,.57,.5),wi(r,-4.38,.75,-Math.PI/3,y.rust),Bn(r,5.25,-.54,0,2.1,y.rust),oi(r,5.25,.6,.52),wi(r,6.52,.7,-Math.PI/3,y.teal),zt(r,-6.9,.68,1.2),zt(r,6.9,-.8,1.25),wn(r,-4.15,.05,-.8,1.6)}else if(n==="gym"){er(r,-7.2,7.2),I(r,0,.093,0,14.4,.025,2.9,y.carpet);for(const s of[-5.65,-3.8,-1.95]){I(r,s,.16,.15,.92,.21,1.72,y.black),I(r,s,.28,.17,.68,.015,1.42,y.carpet);for(const a of[-1,1])I(r,s+a*.42,.7,-.51,.075,1.1,.08,y.black),I(r,s+a*.42,1.13,-.2,.06,.06,.75,y.black);I(r,s,1.26,-.5,.85,.23,.14,y.black),I(r,s,1.3,-.409,.43,.12,.012,y.screen)}for(const s of[.1,1.65]){const a=He(r,s,.41,.1,.36,.12,y.black);a.rotation.z=Math.PI/2,I(r,s,.39,.2,.07,.69,.09,y.gold),I(r,s,.81,.47,.37,.09,.24,y.black),I(r,s,1.05,-.32,.07,.55,.07,y.black),I(r,s,1.27,-.32,.5,.06,.07,y.gold)}I(r,5.45,.68,-.8,2.8,.07,.58,y.black);for(let s=4.2;s<6.8;s+=.46)He(r,s,.82,-.8,.13,.16,y.black);for(const s of[3.65,5.2])I(r,s,.12,.61,1.08,.025,1.68,y.teal);zt(r,6.93,.82,1.2),I(r,2.76,.4,-.87,.6,.7,.53,y.walnut);for(let s=0;s<3;s++)I(r,2.76,.79+s*.065,-.87,.46,.065,.4,y.white)}else if(n==="spa"){er(r,-7.2,7.2);for(const s of[-4.8,0,4.8]){I(r,s,.4,0,1.7,.6,2.05,y.walnut),I(r,s,.76,0,1.8,.14,2.1,y.white),I(r,s,.87,-.6,1.15,.12,.45,y.white),I(r,s,.86,.4,1.8,.03,.7,y.teal),zt(r,s+1.2,-.9,1.1),wn(r,s-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)I(r,s+1.2,.15+a*.06,.75,.5,.06,.32,y.white)}}else{I(r,0,.03,0,15,.14,3.6,y.wood);for(let s=-7.3;s<7.4;s+=.24)I(r,s,.11,0,.017,.006,3.45,y.walnut);for(const s of[-6.65,-2.45,2.8,6.9])zt(r,s,-.8,1.45);for(const s of[-4.4,3.5]){oi(r,s,.45,.66),wi(r,s-.9,.4,Math.PI/2,y.white),wi(r,s+.9,.4,-Math.PI/2,y.white),Ur(r,s+.2,.88,.45),He(r,s,1.07,.45,.026,2.05,y.gold);const a=new Pt(new Ws(1.55,.32,8),y.white);a.position.set(s,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,r.add(a)}Bn(r,-.5,-.7,0,1.7,y.teal),oi(r,-.5,.45,.38);for(const s of[-7.35,7.35])I(r,s,.43,0,.055,.8,3.5,y.gold);for(let s=-7.3;s<=7.3;s+=1.46)He(r,s,.43,1.7,.018,.8,y.gold);I(r,0,.8,1.7,14.7,.035,.035,y.gold),I(r,0,.46,1.7,14.7,.65,.014,y.glass)}if(e>=2){if(n==="lobby"&&(Bn(r,-5.6,.8,0,1.8,y.teal),oi(r,-4.25,.8,.35)),n==="breakfast"&&(I(r,2.8,1.1,-.6,.65,.5,.45,y.screen),Ur(r,2.8,1.44,-.6)),n==="club"&&(Ua(r,5.8,1.2),wn(r,3.3,.05,-.8,1.8)),n==="gym")for(const s of[3.7,4.6,5.5])I(r,s,.15,.5,.6,.09,1.8,y.rust);if(n==="spa")for(const s of[-2.5,2.5])I(r,s,1.15,-.7,.06,2.1,1.3,y.wood);n==="rooftop"&&Bn(r,0,.55,0,2.2,y.rust)}if(e>=3){if(n==="lobby"&&(Ri(r,0,1.6,-1.17,3.5,.65,3),I(r,0,.94,.5,6.45,.12,.83,y.gold)),n==="breakfast"&&(I(r,0,.55,.05,5.4,1,.8,y.stone),t>0))for(const s of[-1.8,0,1.8])He(r,s,1.12,.05,.25,.12,y.gold);if(n==="club"&&(Bn(r,-5.5,.4,0,2.8,y.white),Ri(r,0,1.85,-1.05,2.7,.45,2)),n==="gym"){I(r,4.9,1.15,-1.23,4,1.85,.05,y.glass);for(const s of[3.1,6.5])I(r,s,1,0,.08,1.8,.08,y.gold);I(r,4.8,1.85,0,3.6,.08,.08,y.gold)}if(n==="spa")for(const s of[-4.8,0,4.8])I(r,s,.88,.4,1.8,.04,.8,y.white),wn(r,s+1.05,.75,.8,.8);if(n==="rooftop"){for(const s of[-6.8,6.8])I(r,s,1.3,-.9,.12,2.6,.12,y.walnut);for(let s=-6.8;s<=6.8;s+=.7)I(r,s,2.5,-.3,.12,.1,2.2,y.walnut)}}if(e>=4){I(r,0,.12,-.15,14,.03,2.9,y.stone);for(const s of[-6.6,6.6])Ri(r,s,1.55,-1.15,.7,1.1,4),wn(r,s,.05,.85,1.7);if(n==="spa"&&(I(r,0,.4,.4,2.5,.55,1.5,y.white),I(r,0,.7,.4,2.1,.03,1.1,y.window)),n==="breakfast"||n==="club")for(const s of[-2,2])I(r,s,1.55,-.6,.025,.85,.025,y.gold),He(r,s,1.95,-.6,.25,.06,y.gold);n==="gym"&&(I(r,0,.3,.3,1.4,.25,1.8,y.black),I(r,0,1.25,-.4,1.2,.6,.12,y.screen))}if(e>=5){if(n!=="rooftop"){for(const s of[-5,-2.5,0,2.5,5])ys(r,s,.5,2.05),I(r,s,2.27,0,2.2,.045,2.6,y.walnut);I(r,0,2.23,1.2,14,.04,.04,y.glow)}else{I(r,0,.35,-.5,3.6,.5,1.1,y.stone),I(r,0,.62,-.5,3.3,.04,.9,y.window);for(const s of[-6,-3,3,6])wn(r,s,.05,.8,1.3)}for(let s=-6.5;s<7;s+=1.3)I(r,s,.15,1.55,.5,.02,.2,y.gold)}return r}function nv(n,e,t){const i=new kt,s=Kg(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new kt;return u.position.set(c,.31,0),i.add(u),I(u,0,-.11,0,.085,.26,.1,y.navy),I(u,0,-.245,.035,.11,.07,.17,y.black),u},o=a(-.08),l=a(.08);I(i,0,.47,0,.27,.34,.17,s),I(i,0,.58,.093,.07,.13,.012,y.white),["chill","family","points","forum","creator"].includes(e??"")||I(i,0,.55,.108,.018,.095,.016,y.navy),Tn(i,0,.81,0,.185,.21,.16,y.skin),Tn(i,0,.94,-.024,.193,.102,.163,y.hair);for(const c of[-.069,.069])Tn(i,c,.84,.149,.021,.024,.01,y.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&I(i,c,.856,.156,.09,.066,.012,y.navy);for(const c of[-1,1]){const u=I(i,c*.18,.45,0,.075,.26,.085,s);u.rotation.z=c*.15,Tn(i,c*.19,.303,.012,.047,.05,.045,y.skin)}if(e==="chill"&&(He(i,0,1,0,.23,.06,y.white),He(i,0,1.06,0,.16,.1,y.white)),e==="road"&&(I(i,.29,.25,.04,.22,.3,.15,y.walnut),I(i,.29,.44,.04,.12,.035,.05,y.gold)),e==="family"&&(I(i,0,.46,-.17,.3,.34,.17,y.rust),I(i,.27,.38,.05,.07,.2,.07,y.teal)),e==="points"&&(I(i,-.26,.4,.09,.15,.23,.025,y.white),I(i,-.26,.44,.11,.11,.04,.01,y.teal)),e==="hunter"&&(I(i,.24,.48,.12,.1,.18,.025,y.black),I(i,.24,.49,.138,.07,.12,.01,y.screen)),e==="forum"&&(Tn(i,0,1.01,-.01,.21,.07,.18,y.navy),I(i,0,.99,.17,.2,.025,.16,y.navy),I(i,-.25,.42,.08,.15,.23,.04,y.black)),e==="creator"){I(i,0,.5,.16,.2,.13,.12,y.black);const c=He(i,0,.5,.26,.065,.1,y.black);c.rotation.x=Math.PI/2,I(i,0,.63,.13,.025,.18,.02,y.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Tn(i,c+.23,.49,.08,.065,.08,.065,y.rust),I(i,c+.23,.35,.08,.015,.21,.015,y.green);if(e==="planner"&&(I(i,-.24,.47,.08,.19,.27,.04,y.teal),I(i,0,.54,.12,.08,.11,.015,y.white)),e==="whale"&&(I(i,0,.59,.12,.04,.09,.025,y.gold),I(i,.2,.36,.055,.08,.04,.09,y.gold),Tn(i,0,.96,-.04,.2,.075,.18,y.hair)),e==="auditplus"&&(I(i,-.24,.47,.09,.19,.26,.04,y.walnut),I(i,-.24,.49,.12,.14,.19,.012,y.white),I(i,.23,.45,.09,.012,.17,.012,y.gold)),t==="house"){I(i,.43,.36,.2,.4,.55,.4,y.navy),I(i,.43,.68,.2,.45,.05,.45,y.gold);for(let c=0;c<3;c++)I(i,.43,.75+c*.065,.2,.32,.06,.3,y.white);for(const c of[.28,.58])Tn(i,c,.08,.2,.07,.07,.07,y.black)}if(t==="engineering"&&(I(i,.3,.35,.05,.24,.2,.16,y.rust),I(i,.3,.5,.05,.13,.035,.04,y.gold),He(i,0,1,0,.21,.07,y.gold)),t==="fnb"){I(i,.4,.35,.2,.4,.08,.5,y.gold),I(i,.4,.62,.2,.4,.08,.5,y.gold);for(const c of[.28,.5])He(i,c,.73,.2,.09,.15,y.white);He(i,0,1,0,.17,.15,y.white)}return Ys(i,0,0,.47,.3),{group:i,left:o,right:l}}function iv(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],d=n.group.position.clone();n.group.position.lerpVectors(u,f,l-c);const h=n.group.position.x-d.x,p=n.group.position.z-d.z,x=Math.hypot(h,p)>1e-4;x&&(n.group.rotation.y=Math.atan2(h,p));const m=x?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=m,n.right.rotation.x=-m;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Dc(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*ir;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?bd[o]:0;e.push({id:a,floorId:i.id,position:new k(c,s,0),label:new k(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*ir+3.6}}function rv(n,e,t){const i=new Pt(new gr(e,t),new Xr({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function sv(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class av{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=Dc(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new Yg({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=eu,this.renderer.outputColorSpace=Xt,this.renderer.toneMapping=Yo,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new Rf;root=new kt;camera=new Xs;light=new Kf(16768942,3.1);ambient=new $f(12638184,10651490,2.15);raycaster=new Qf;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new kt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;I(this.root,a,o/2-1,l,1.5,o,1.7,y.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(s+Math.round(c*10)+Math.round(u*10))%3!==0&&I(this.root,a+u,c,l+.87,.14,.24,.015,s%3===0?y.shade:y.window)}I(this.root,0,-.32,0,30,.35,15,y.navy),I(this.root,0,-.13,.7,17.6,.16,5.3,y.stone),I(this.root,0,-.06,2.95,17,.09,.55,y.stone);for(const s of[-8.1,8.4])zt(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new kt;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){I(o,0,-.085,0,15.05,.19,3.48,y.stone),I(o,0,-.12,1.77,15.2,.17,.19,y.navy),I(o,0,-.011,1.85,15.1,.025,.02,y.gold),I(o,0,2.405,-.02,15.05,.18,3.4,y.stone);for(const c of[-7.43,7.43])I(o,c,1.19,.18,.18,2.38,3.12,y.stone);I(o,7.94,1.19,-.24,.87,2.38,2.1,y.window);for(const c of[7.52,8.35])I(o,c,1.2,.84,.045,2.4,.06,y.gold);I(o,7.94,-.075,.1,.95,.19,2.85,y.navy),I(o,7.94,1.2,.87,.83,.025,.035,y.gold)}s.entityIds.forEach(c=>{const u=e.entities[c],f=this.layout.entities.find(p=>p.id===c),d=u.kind==="room"?Qg(s.construction?{...u,construction:s.construction}:u):tv(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let p=1;p<(u.level??1);p++)zt(d,-6.8+p*.45,-.95,.5+p*.1);d.name=c,d.userData.entityId=c,d.position.x=f.position.x,o.add(d);const h=rv(c,u.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(d.add(h),this.colliders.push(h),u.kind==="room"){const p=document.createElement("button");p.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),p.textContent=s.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,p.dataset.entityId=c,p.setAttribute("aria-label",u.number+" 房间"),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}else{const p=document.createElement("button");p.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),p.dataset.entityId=c,p.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),p.setAttribute("aria-label","查看"+u.name),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),Jg(this.root),this.faultLights=[],this.root.traverse(s=>{s.name==="fault-lamp"&&this.faultLights.push(s)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new Xr({color:16766861,transparent:!0,opacity:.9,depthTest:!1});I(this.halo,0,0,0,4.7,.025,.025,r),I(this.halo,0,2.31,0,4.7,.025,.025,r),I(this.halo,-2.35,1.15,0,.025,2.31,.025,r),I(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new $e((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=sv(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new k(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new k(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new k(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof bu&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new kt,this.scene.add(this.root);const s=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/ir+1e-5),c=s[l],u=e.floors.findIndex(f=>f.id===c);u>=0&&(o.y+=(u-l)*ir)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=Dc(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const s=this.labels.find(a=>a.dataset.entityId===i.entityId);if(s){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);s.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",s.classList.add("upgraded"),setTimeout(()=>s.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(s=>{const a=s.dataset.entityId===e.selectedId;s.classList.toggle("selected",a),s.setAttribute("aria-pressed",String(a))});const r=this.layout.entities.find(s=>s.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!r,r){const s=e.entities[r.id];this.halo.scale.x=s.kind==="room"?1:3.1,this.halo.position.set(r.position.x,r.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...nv(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*ir+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new k(o.x,o.level*ir+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(r=>iv(r,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const r=this.store.getState(),s=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=r.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});s!==this.speechSlot&&(this.speechSlot=s,this.speaker=a.length?a[s%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new k(-.6,1.25,0)));o.hidden=!1;const f=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),d=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${f}px,${d+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(r=>{r.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values($r).forEach(e=>e.dispose()),Zg(),this.overlay.remove()}}const cl="jinwanyoutao_v8_game_1";function ov(){try{const n=localStorage.getItem(cl);if(!n)return za();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return hr(e),zs(e),Yn(e),e.game.operations.day!==e.game.day&&Vo(e,!e.game.reportOpen),e.guests.forEach(t=>Gs(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=za();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function Ou(n){try{return localStorage.setItem(cl,JSON.stringify(n)),!0}catch{return!1}}const qn=xd(ov()),Rr=Id(document.querySelector("#app"),qn);Xu(document.querySelector("#app"),qn);let Bo=!1,zo=qn.getState().game.notice.startsWith("存档读取失败");const ul=()=>{!Bo&&!zo&&!Ou(qn.getState())&&(zo=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&qn.advance(4*qn.getState().speed)},1e3);setInterval(ul,5e3);document.addEventListener("visibilitychange",ul);window.addEventListener("pagehide",ul);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){Bo=!0;try{localStorage.removeItem(cl),qn.reset(),zo=!1,Ou(qn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{Bo=!1}}});function Ks(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}Ks();window.visualViewport?.addEventListener("resize",Ks);window.visualViewport?.addEventListener("scroll",Ks);window.addEventListener("resize",Ks);try{const n=new av(Rr.stage,qn);Rr.setFocusHandler(e=>n.focusFloor(e)),Rr.stage.addEventListener("world-error",e=>Rr.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Rr.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
