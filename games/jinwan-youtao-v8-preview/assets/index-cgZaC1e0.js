(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function ld(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,s=!1,r=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(h,p=.13,x=0)=>{if(!i||!s)return;const m=i.createOscillator(),g=i.createGain(),w=i.currentTime+x;m.frequency.value=h,g.gain.setValueAtTime(.016,w),g.gain.exponentialRampToValueAtTime(1e-4,w+p),m.connect(g),g.connect(i.destination),m.start(w),m.stop(w+p),m.onended=()=>{m.disconnect(),g.disconnect()}};t.onclick=async()=>{if(s=!s,s){if(i??=new AudioContext,await i.resume(),!l){const h=i.createBuffer(1,i.sampleRate*2,i.sampleRate),p=h.getChannelData(0);for(let m=0;m<p.length;m++)p[m]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=h,l.loop=!0,c=i.createGain(),c.gain.value=.01;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=700,l.connect(x),x.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(s)),t.title=s?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const f=e.subscribe(h=>{const p=Date.now();i&&c&&c.gain.setTargetAtTime(h.game?.weather==="rain"?.12:.015,i.currentTime,.5),s&&!document.hidden&&p-r>1800&&((h.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),r=p):h.metrics.cash>o&&(u(1046,.1),r=p)),a=h.game?.arrivals??0,o=h.metrics.cash}),d=()=>{document.hidden?i?.suspend():s&&i?.resume()};document.addEventListener("visibilitychange",d),window.addEventListener("pagehide",()=>{f(),i?.close()},{once:!0})}function Jc(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,f)=>{const d="floor-"+l,h="facility-"+l;e.push({id:d,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[h]}),t[h]={id:h,kind:"facility",floorId:d,role:l,name:c,capacity:u,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const s=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),f="room-"+u,d=s[((o-2)*3+c)%s.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:d,nightsLeft:d==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const r=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,f,d,h],p)=>r.push({id:"public-"+p,name:h?"当班员工":"住客",tier:h?"Staff":"Member",floorId:"floor-"+o,thought:d,color:f,route:[l,c],z:u,staff:!!h}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=r.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=r.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of r){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:r.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const ni={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},Ti=n=>n.category??(n.type==="suite"?"suite":"standard"),Qc=n=>n.bed??(n.type==="twin"?"twin":"king"),jc=n=>["suite","premium"].includes(Ti(n)),St=n=>Ti(n)==="suite",Ks=n=>ni[Ti(n)].name+" · "+(Qc(n)==="twin"?"双床":"大床"),il=n=>Object.values(n.entities).filter(e=>e.kind==="room"),Qe=n=>il(n).filter(e=>e.status!=="unbuilt"),eu=n=>Qe(n).filter(e=>St(e)&&e.status==="available").length,tu=n=>Qe(n).filter(e=>e.status==="occupied").length,kl=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId),ur=2.12,dr=7.94,Jt=n=>n.game.day*1440+n.game.minute;function Rs(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(s=>s.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Jt(n)+20+Yi(e.id)%75,trail:[],revision:0}}function Yi(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function un(n,e,t){Rs(n,e);const i=e.movement;if(i.steps.length)return!1;const s=n.entities[t],r=t==="exit";if(!s&&!r)return!1;const a=r?0:n.floors.findIndex(d=>d.id===s.floorId),o=i.position,l=r?5.8:s.kind==="room"?(Number(s.number)%100-2)*4.93:-5.7+Yi(e.id+t)%12*.95,c=r?2.8:1.25,u=[],f=(d,h,p,x)=>u.push({x:d,z:h,level:p,phase:x});return f(o.x,ur,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(dr,ur,o.level,"corridor"),f(dr,.9,o.level,"elevator"),f(dr,.9,a,"elevator"),f(dr,ur,a,"corridor")),f(l,ur,a,"corridor"),f(l,c,a,r?"exit":s.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=Jt(n)+60,e.visitUntil=void 0,!0}function cd(n,e,t){Rs(n,e);const i=e.movement;if(!i.steps.length)return un(n,e,t);const s=i.steps,r=i.position;i.position={...s[s.length-1]},i.steps=[];const a=un(n,e,t);return i.steps=[...s,...i.steps],i.position=r,a}function nu(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],s=t.position,r=i.x-s.x,a=i.z-s.z,o=(i.level-s.level)*2.55,l=Math.hypot(r,a,o),c=o!==0?.85:.65;if(s.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;s.x+=r*u,s.z+=a*u,s.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Jt(n)+45+Yi(e.id+Jt(n))%65,!0)}function ud(n){for(const e of n.guests)Rs(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function iu(n){n.movement&&n.movement.trail.push({...n.movement.position})}function Bl(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const s of[i.position,...i.steps,...i.trail])s.level>=e&&s.level++}}const Zs=n=>n.lateHour??(n.tier==="Globalist"?16:14),zn=n=>Zs(n)===16?"4PM":"2PM",Wi=n=>Zs(n)===16?14:12,su=n=>n.late==="honor"?Zs(n)*60:n.late==="deny"||n.late==="pending"?Wi(n)*60:660;function ru(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const sl={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},au=n=>n.name+":"+n.persona;function bn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Jt(n)+35,e.speech.next=0,_s(n,e)}function _s(n,e){if(e.staff)return;const t=Jt(n),i=e.speech??={next:0,recent:[]},s=e.movement,r=n.floors.find(p=>p.id===e.floorId)?.role??"lobby",a=!!s?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[s?.position.phase,a,r,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(p=>p.kind==="room"&&St(p)&&p.status==="available").length;let f=[];if(o==="birthday"&&e.occasion?.resolved)f=[e.occasion.outcome??"生日安排已确认。"];else if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[zn(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+Wi(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)f=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)f=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)f=[s?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[sl[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(r==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const p=e.experience,x=p?.place==="facility-"+r&&t-p.at<150;x&&p.kind==="shortage"?f=[r==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:x&&p.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[r]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+zn(e)+" 吗？先确认一下。"),r==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const p=n.game.operations?.profiles[e.profileId??""];r==="guest"&&p&&p.visits>0&&f.push(p.trust>=2?"这家以后可以常住，下次带朋友来。":p.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const x=n.game.guestMemory?.[au(e)];r==="guest"&&x?.visits&&f.push(x.satisfaction<80?"上次住得不太顺，这次再看看。":x.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const d=n.game.dialogueRecent??={};for(const[p,x]of Object.entries(d))t-x>240&&delete d[p];const h=f.filter(p=>!i.recent.some(x=>x.text===p&&t-x.at<180)&&t-(d[p]??-9999)>25);if(h.length){const p=h[Yi(e.id+t)%h.length];e.thought=p,i.recent.push({text:p,at:t}),i.recent=i.recent.slice(-8),d[p]=t}else e.thought="";i.next=t+45}function Js(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(s=>!s.staff&&!s.departing&&s.floorId===t.floorId&&!s.movement?.steps.length)??n.guests.find(s=>s.staff&&(s.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function Cs(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function En(n,e,t=1){const i=Cs(n);i.counts[e]=(i.counts[e]??0)+t;for(const s of n.game.tasks)if(s.id===e){if(s.progress=Math.min(s.goal,s.progress+t),s.claimed)continue;const r=Math.min(4,s.goal),a=Math.floor(s.progress/s.goal*r),o=Math.floor(s.reward*.7*a/r),l=Math.max(0,o-(s.paid??0));l&&(s.paid=(s.paid??0)+l,n.metrics.cash+=l,n.game.revenue+=l,n.game.rewardBeat={id:n.game.nextId++,text:s.title+" "+s.progress+"/"+s.goal,amount:l},n.game.logs.push({id:n.game.nextId++,day:n.game.day,minute:n.game.minute,category:"收益",text:"阶段反馈："+s.title+"，到账 ¥"+l+"；计入原任务奖金。"}))}}const dd=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function fd(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,s,r,a,o]=dd[t];return{id:i,title:s,goal:r,progress:0,reward:a,claimed:!1,target:o}})}function xs(n){const e=Qe(n),t=n.guests.filter(r=>r.roomId),i=r=>Math.max(0,Math.min(100,Math.round(r))),s=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((r,a)=>r+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(r=>!["dirty","cleaning","maintenance"].includes(r.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:s,total:Math.round(s.reduce((r,a)=>r+a.value,0)/s.length)}}function ou(n){const e=n.game.development,t=Qe(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const $i={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function gs(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function fr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function hd(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=Cs(n);if(e.type==="invest"){const s=n.entities[e.id??""];if(s?.kind!=="facility")return!0;if(s.construction)return t.notice="该公区正在施工。",!0;const r=s.level??1;if(r>=5)return t.notice="该公区已达 5 级。",!0;fr(n,3500*r)&&(s.construction={remaining:120,total:120,targetLevel:r+1},Js(n,s.id),En(n,"upgrade"),gs(n,s.name+"开始封闭改造：2 小时后升级至 "+(r+1)+" 级。"))}if(e.type==="train"){const s=e.id;if(!Object.hasOwn(t.managers,s))return!0;const r=t.managers[s];if(r<1||r>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;fr(n,4500*r)&&(t.managers[s]++,gs(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;fr(n,2200)&&(i.campaignUntil=t.day+2,gs(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const s=$i[e.id];if(!s)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const r=e.id==="coffee"?"stock":"clubStock";if(t[r]<s.stock)return t.notice="活动库存不足，请先补货。",!0;fr(n,s.cost)&&(t[r]-=s.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},gs(n,s.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const s=ou(n).find(r=>r.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(i.claimed.push(s.id),n.metrics.cash+=s.reward,gs(n,"里程碑「"+s.title+"」奖励 ¥"+s.reward+" 已到账。"))}return!0}function pd(n){const e=n.game,t=Cs(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const s=$i[i.id],r=n.entities["facility-"+s.role],a=n.guests.filter(d=>d.roomId),o=r?.kind==="facility"?r.level??1:1,l=r?.kind==="facility"?r.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),f=Math.round(u*s.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,En(n,"revenue",f),En(n,"ancillary",f),En(n,"activity");for(const d of a.slice(0,u))d.satisfaction=Math.min(100,(d.satisfaction??90)+5),d.thought=s.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,gs(n,s.name+"结束："+u+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-s.cost)+"。")}const lu={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function li(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function fn(n,e,t="部门",i){const s=n.game;s.notice=e,s.logs.push({id:s.nextId++,day:s.day,minute:s.minute,category:t,text:e,target:i})}function Ya(n,e){const t=li(n),i="profile-"+n.game.nextId++,s=Yi(i),r=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][s%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(s/8)%8],persona:r[s%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function cu(n,e=n.game.price){const t=n.game,i=t.operations,s=(t.day-1)%7>=5,r=t.positioning==="business"?s?.75:1.3:t.positioning==="resort"?s?1.4:.9:1.1;return Math.max(1,Math.round((3+Qe(n).length*.12)*r*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function nr(n){const e=n.game,t=e.operations,i=t.bookings.filter(d=>d.status!=="lost"),s=i.filter(d=>d.status==="confirmed"),r=n.guests.filter(d=>d.roomId&&!d.departing),a=r.filter(d=>(d.checkoutDay??e.day)>e.day).length,o=r.length-a,l=cu(n),c=Qe(n).filter(d=>!d.construction).length,u=Math.min(c,a+s.length+Math.max(0,l-t.walkinArrivals)),f=d=>d.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:r.reduce((d,h)=>d+f(h),0),housekeeping:o+Qe(n).filter(d=>d.status==="dirty"||d.status==="cleaning").length,suites:s.filter(d=>t.profiles[d.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(d=>d.segment==="商务").length,resort:i.filter(d=>d.segment==="度假").length,group:i.filter(d=>d.segment==="团队").length,price:e.price}}function rl(n,e=!0){const t=n.game,i=li(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let s=(t.seed^Math.imul(t.day,2654435761))>>>0;const r=()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296),a=r();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=Qe(n).filter(h=>!h.construction).length,l=o-n.guests.filter(h=>h.roomId&&(h.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(h=>h.visits>0&&!n.guests.some(p=>p.profileId===h.id)),f=new Set;for(let h=0;h<c;h++){let p=u.find(w=>!f.has(w.id)&&r()<.5);p||(p=Ya(n,r())),f.add(p.id);const x=i.event==="expo"&&h<Math.ceil(c*.35)?"团单":r()<.6?"APP":"平台",m=t.positioning==="resort"||(t.day-1)%7>=5&&r()<.6,g={id:"booking-"+t.nextId++,profileId:p.id,source:x,eta:x==="团单"?840:780+Math.floor(r()*330),nights:ru(m,r(),r()),rate:Math.round(t.price*(x==="团单"?.88:1)),segment:x==="团单"?"团队":m?"度假":"商务",status:"confirmed"};if(h===0&&t.day%2===1&&(g.occasion="birthday"),h<2&&(g.challenge=p.persona==="auditplus"?"audit":p.persona==="family"?"family":p.tier==="Globalist"?"sua":"quiet"),g.challenge==="sua"){const w=Qe(n).find(I=>St(I)&&I.status==="available"&&!I.suaBookingId);w?(g.sua=!0,g.roomId=w.id,w.suaBookingId=g.id,w.status="reserved"):g.challenge="quiet"}i.bookings.push(g)}const d=u.find(h=>h.trust>=2&&h.visits>=2);if(d&&l>i.bookings.length){const h=Ya(n,r());h.referredBy=d.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:h.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=nr(n),e&&(t.paused=!0),fn(n,`早班准备：${i.bookings.length} 笔确认预订，${lu[i.event]}。`)}function md(n,e){const t=li(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function gd(n,e,t){const i=li(n);let s=t?i.profiles[t.profileId]:void 0;s||(s=Ya(n,Yi(e.id)%100/100)),e.profileId=s.id,e.name=s.name,e.persona=s.persona,e.tier=s.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,(t?.occasion==="birthday"||!t&&i.walkinArrivals===1&&n.game.day%2===1)&&(e.occasion={kind:"birthday",resolved:!1}),e.satisfaction=Math.max(65,Math.min(98,88+s.trust*2))}function al(n,e){const t=li(n),i=t.bookings.find(s=>s.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),fn(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const s=n.entities[i.roomId];s?.kind==="room"&&s.suaBookingId===i.id&&(s.suaBookingId=void 0,s.status==="reserved"&&(s.status="available"))}}function vd(n,e){const t=li(n),i=t.profiles[e.profileId??""];if(!i)return;const s=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(s?1:-1))),i.spend+=e.spend??0;const r=s?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:r}),i.history=i.history.slice(-8),s?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),fn(n,i.name+"："+r,"入住")}function _d(n,e){const t=n.game,i=li(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=nr(n),i.briefOpen=!1,t.paused=!1,fn(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",fn(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const s=n.guests.find(c=>c.id===e.id),r=s?.challenge;if(!s||!r||r.resolved)return!0;if(!s.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=r.kind==="quiet"&&e.value==="quiet"||r.kind==="family"&&e.value==="family"||r.kind==="audit"&&e.value==="inspect"||r.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,r.resolved=!0;let l=a&&(r.kind!=="sua"||!!s.upgrades);if(a&&r.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[s.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&r.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!Qe(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&r.kind==="quiet"){const c=n.entities[s.roomId??""];if(c&&n.floors.some(f=>f.construction&&Math.abs(f.number-(n.floors.find(d=>d.id===c.floorId)?.number??0))<=1)){const f=Qe(n).find(d=>d.status==="available"&&!d.construction&&!n.floors.some(h=>h.construction&&Math.abs(h.number-(n.floors.find(p=>p.id===d.floorId)?.number??0))<=1));l=!!f,f&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,f.status="occupied",f.guestId=s.id,f.nightsLeft=Math.max(0,(s.checkoutDay??t.day)-t.day),s.roomId=f.id,s.movement?.steps.length||un(n,s,f.id))}}return s.serviceDone=l,s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(l?8:-8))),r.outcome=l?"需求已兑现":"未解决核心诉求",En(n,"resolve"),bn(n,s,l?"recovery":"denied"),fn(n,s.name+"："+r.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",s.roomId??"facility-lobby"),!0}return!1}function uu(n,e){const t=n.game,i=Qe(n).filter(l=>St(l)&&l.status==="available"&&!l.construction&&!l.suaBookingId),s=t.operations?.bookings.filter(l=>l.status==="confirmed"&&!l.sua&&t.operations?.profiles[l.profileId]?.tier==="Globalist").length??0,r=Math.max(s,t.operations?.suitePolicy==="hold"?1:0),a=n.entities[e.roomId??""];return{suite:a?.kind==="room"&&St(a)?void 0:i.length>r?i[0]:void 0,free:i.length,reserve:r,breakfast:t.stock>=2,alreadySuite:a?.kind==="room"&&St(a)}}function xd(n,e){if(e.type!=="birthday-choice")return!1;const t=n.game,i=n.guests.find(u=>u.id===e.id&&!u.departing),s=i?.occasion;if(!i?.roomId||!s||s.resolved)return t.notice="先办理入住；已处理的生日安排无需重复选择。",!0;if(!["breakfast","suite","card","decline"].includes(String(e.value)))return!0;const r=uu(n,i),a=e.value==="breakfast"?160:e.value==="suite"?280:0;if(e.value==="breakfast"&&!r.breakfast)return t.notice="早餐库存不足两份；先补货，或选择生日祝福。",!0;if(e.value==="suite"&&!r.suite)return t.notice="没有可赠送的标准套房；确认预订与预留优先，仍可选择其他礼遇。",!0;if(n.metrics.cash<a)return t.notice="礼遇预算不足；可以先送一张手写生日卡。",!0;if(n.metrics.cash-=a,t.expense+=a,e.value==="breakfast"&&(t.stock-=2,i.birthdayBreakfast=2,n.metrics.owner=Math.max(0,n.metrics.owner-1)),e.value==="suite"){const u=n.entities[i.roomId];u.kind==="room"&&(u.status="dirty",u.guestId=void 0,u.nightsLeft=0);const f=r.suite;f.status="occupied",f.guestId=i.id,f.nightsLeft=Math.max(0,(i.checkoutDay??t.day+1)-t.day),i.roomId=f.id,i.upgrades=!0,i.denied=!1,t.upgrades++,n.metrics.owner=Math.max(0,n.metrics.owner-2),cd(n,i,f.id)}const o=e.value==="breakfast"?8:e.value==="suite"?12:e.value==="card"?2:-3;i.satisfaction=Math.max(0,Math.min(100,(i.satisfaction??88)+o)),s.resolved=!0,s.choice=String(e.value);const l=e.value==="breakfast"?"生日早餐已确认，两个人一起吃很开心。":e.value==="suite"?"生日这晚真的住进 Standard Suite，房费也没变。":e.value==="card"?"收到手写生日卡，Front Office 记得这一天。":"今天按原预订入住，生日没有特别安排。";s.outcome=l,bn(n,i,"birthday"),En(n,"resolve");const c=t.operations?.profiles[i.profileId??""];return c&&(c.history.push({day:t.day,text:l}),c.history=c.history.slice(-8)),fn(n,i.name+"："+l+" 支出 ¥"+a+"。","部门",i.roomId),!0}function Md(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=Qe(n),i=n.guests.filter(h=>!h.staff&&h.roomId&&!h.departing),s=i.length,r=t.filter(h=>h.status==="dirty"||h.status==="cleaning").length,a=e.events.length+n.guests.filter(h=>!h.departing&&(h.late==="pending"||h.challenge&&!h.challenge.resolved)).length,o=i.reduce((h,p)=>h+(p.rate??e.price),0),l=i.filter(h=>h.source==="平台").reduce((h,p)=>h+Math.round((p.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((h,p)=>h+p*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),r&&u.push({title:"夜班先把房间交出来",text:`还有 ${r} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const f=Math.round(s/Math.max(1,t.length)*100),d=e.operations?.forecast?.occupancy;d!==void 0&&f<d-15&&u.push({title:"入住低于晨会预估",text:`当前 ${f}%，预估 ${d}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={day:e.day,minute:e.minute,open:!0,occupancy:f,expected:d,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:o,projectedNet:e.revenue+o-e.expense-l-c,pending:a,complaints:e.complaints,logs:e.logs.filter(h=>h.day===e.day&&h.category==="客诉").map(h=>({...h})),notes:u.slice(0,4)},e.paused=!0}const Si=[{title:"接住第一批客人",action:"办理 3 次入住",counter:"arrivals",goal:3,target:"front",exam:"试住客回访",threshold:62,department:"front"},{title:"让房间周转起来",action:"完成 3 次清洁或维修",counter:"service",goal:3,target:"hotel",exam:"早班运营巡检",threshold:66,department:"house"},{title:"兑现住客的承诺",action:"完成 2 次诉求处理",counter:"resolve",goal:2,target:"events",exam:"会员体验回访",threshold:70,department:"front"},{title:"让升级经得起体验",action:"完成 1 次装修或公区升级",counter:"upgrade-complete",goal:1,target:"development",exam:"新空间试营业",threshold:72,department:"engineering"},{title:"办一场让人记住的活动",action:"完成 1 场主题活动",counter:"activity",goal:1,target:"development-data",exam:"总部经营评审",threshold:74,department:"revenue"}],zl=n=>n.game.day*1440+n.game.minute;function jr(n){return n.game.campaign??={chapter:0,baseline:{...n.game.development?.counts??{}},certificates:[],attempts:0}}function Mi(n){const e=n.game.campaign,t=Si[e?.chapter??0];if(!t)return null;const s=t.counter==="upgrade-complete"&&Object.values(n.entities).filter(r=>r.kind==="facility"||r.kind==="room"&&r.status!=="unbuilt").every(r=>(r.level??1)>=5&&!r.construction)?t.goal:Math.min(t.goal,Math.max(0,(n.game.development?.counts[t.counter]??0)-(e?.baseline[t.counter]??0)));return{...t,progress:s,ready:s>=t.goal}}function qs(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function bd(n,e){if(!["book-inspection","prepare-inspection","continue-chapter"].includes(e.type))return!1;const t=n.game,i=jr(n),s=Mi(n);if(e.type==="book-inspection"){if(!s||!s.ready||i.inspection||i.result?.passed)return t.notice="先完成当前目标；预约中的检验无需重复预约。",!0;t.seed=Math.imul(t.seed,1664525)+1013904223>>>0,i.inspection={due:(t.day+1)*1440+1080,chapter:i.chapter,phase:"booked",roll:t.seed%13-6,prepared:!1},i.attempts++,i.result=void 0,qs(n,s.exam+"已预约：明天 18:00 到店，先保障客房、库存和服务。")}if(e.type==="prepare-inspection"){const r=i.inspection;if(!r||r.phase!=="booked"||r.prepared)return t.notice="本次检验已准备，或正在进行。",!0;if(n.metrics.cash<300)return t.notice="准备需要 ¥300；也可以不额外投入。",!0;n.metrics.cash-=300,t.expense+=300,r.prepared=!0,qs(n,"投入 ¥300 做现场彩排：检验表现 +6，仍需实际服务达标。")}if(e.type==="continue-chapter"){if(i.result?.chapter!==i.chapter||!i.result.passed)return t.notice="先完成本阶段检验。",!0;i.certificates.push(Si[i.chapter].exam),i.chapter++,i.baseline={...t.development?.counts??{}},i.inspection=void 0,i.result=void 0,i.attempts=0,qs(n,Si[i.chapter]?"下一阶段："+Si[i.chapter].title+"。":"五段经营主线完成，酒店进入自由经营。")}return!0}function yd(n){const e=jr(n),t=e.inspection;if(!t||(t.phase==="booked"&&zl(n)>=t.due&&(t.phase="visiting",qs(n,Si[e.chapter].exam+"到店：先看房、再用餐、最后核对服务；30 分钟后回访。")),t.phase!=="visiting"||zl(n)<t.due+30))return;const i=n.game,s=Qe(n).filter(p=>p.status!=="unbuilt"),r=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),a=s.filter(p=>!["dirty","cleaning","maintenance"].includes(p.status)&&!p.construction).length/Math.max(1,s.length),o=r.length?r.reduce((p,x)=>p+(x.satisfaction??90),0)/r.length:80,l=Math.max(0,100-i.events.length*12-r.filter(p=>p.challenge&&!p.challenge.resolved||p.late==="pending").length*8),c=Math.min(100,Math.min(i.stock,i.clubStock)*5),u=Math.round(a*25+o*.3+l*.25+c*.2),f=Math.max(0,Math.min(100,u+t.roll+(t.prepared?6:0))),d=f>=Si[e.chapter].threshold,h=[{value:a*100,text:"先清洁脏房、完成维修，减少封闭房。",target:"hotel"},{value:o,text:"处理客人的核心诉求，减少只送礼未兑现。",target:"events"},{value:l,text:"先解决积压事件和晚退请求。",target:"events"},{value:c,text:"先补足早餐和酒廊的库存。",target:"operations-data"}].sort((p,x)=>p.value-x.value)[0];e.result={chapter:e.chapter,passed:d,score:f,day:i.day,minute:i.minute,advice:d?"体验通过。确认后开启下一段经营目标。":h.text,target:h.target,scenes:[a>=.7?"Room Check：多数房间整洁可售。":"Room Check：发现翻房或维修积压。",c>=75?"F&B：餐台供应顺畅。":"F&B：餐台库存让体验打了折扣。",l>=80?"Front Office：承诺与服务顺利交接。":"Front Office：还有诉求未接住。"]},e.inspection=void 0,qs(n,Si[e.chapter].exam+"："+(d?"通过":"需要改善")+"（"+f+" / "+Si[e.chapter].threshold+"）。"+e.result.advice)}const vn=(n,e,t=!1)=>Math.round(n*(Ti(e)==="suite"&&t?1:ni[Ti(e)].factor)*(1+((e.level??1)-1)*.1)),du=n=>2500*n,Oi=n=>n?Math.max(8,24-n*5):30,Qs=n=>n?Math.max(10,35-n*7):40,Vr=n=>Math.max(140,260-n*20),Ka=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),fu={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function Gl(n,e,t,i="floor-lobby"){const s={id:e,name:fu[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(s),Rs(n,s),s}function ki(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function ji(n,e,t,i,s){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:s},un(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",fn(n,e.name+" 已接单。","部门",i),!0)}function Sd(n,e,t){const i=n.game,s=li(n);for(const a of Object.keys(fu)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||Gl(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const r=Qe(n).find(a=>a.timer&&!a.construction&&!ki(n,a.id));if(r){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=Gl(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&ji(n,a,r.status==="maintenance"?"repair":"clean",r.id,r.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(Rs(n,a),nu(n,a),iu(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),En(n,"service"),s.hkCompleted+=l.kind==="clean"?1:0,fn(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(f=>!(f.kind==="supplies"&&f.target===l.target)),s.stockDelivered++,fn(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(f=>!f.staff&&!f.roomId&&!f.departing);if(u){const f=s.bookings.find(x=>x.id===u.reservationId)?.roomId,d=Qe(n).filter(x=>(x.status==="available"||x.status==="reserved"&&(x.suaBookingId===u.reservationId||!x.suaBookingId&&u.tier==="Globalist"))&&!x.construction),h=d.filter(x=>x.type==="suite"&&x.category!=="premium"),p=f?d.find(x=>x.id===f):u.tier==="Globalist"?h[0]??d[0]:d.find(x=>!(s.suitePolicy==="hold"&&h.length<=1&&h.includes(x)));p&&e({type:"checkin",id:u.id,roomId:p.id})}}En(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=Jt(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=Qe(n).find(c=>c.status==="dirty"&&!c.construction&&!ki(n,c.id));if(l&&ji(n,a,"clean",l.id,Oi(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=Qe(n).find(c=>c.status==="maintenance"&&!c.construction&&!ki(n,c.id));if(l&&n.metrics.cash>=100){ji(n,a,"repair",l.id,Qs(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!ki(n,l)&&n.metrics.cash>=Vr(i.managers.fnb)){ji(n,a,"stock",l,8)&&t(Vr(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){ji(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&Jt(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&ji(n,a,"patrol",c.id,10)}}}function Ed(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,Js(n,e.entityIds[0]),fn(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),En(n,"upgrade-complete"),Js(n,e.id),fn(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function ea(n,e){e.staff||(e.persona??=Object.keys(sl)[Yi(e.id)%11],Rs(n,e))}function Td(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function Ad(n,e){const t=n.game.minute,i=t/60,s=sl[e.persona??"chill"],r=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=s.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=Td(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&r.push({id:a.id,weight:o})}return r}function hu(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function Hl(n,e,t){e.waitingFor=t,e.waitSince=Jt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function Vl(n,e,t,i){if(e.lastVisit=t.id,hu(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:Jt(n)},Hl(n,e,t.id),bn(n,e,"full");return}if(t.construction){un(n,e,e.roomId);return}const s=t.role==="breakfast"||t.role==="club",r=t.role==="breakfast"?"stock":"clubStock",a=t.role==="breakfast"?e.birthdayBreakfast??0:0,o=Math.max(e.persona==="family"?3:1,a);if(s&&n.game[r]<=0&&!a){e.experience={place:t.id,kind:"shortage",at:Jt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),bn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),Hl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:Jt(n)},s&&(n.game[r]=Math.max(0,n.game[r]-Math.max(0,o-a)),a&&(e.birthdayBreakfast=0));const l=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,c=Math.round(l*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));c&&(e.spend=(e.spend??0)+c,i.income(c),i.progress("ancillary",c)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,_s(n,e)}function $r(n,e){e.departing=!0,e.movement?.steps.length||un(n,e,"exit")}function wd(n,e,t,i){ea(n,e);const s=e.movement,r=Jt(n),a=nu(n,e);if(e.departing){a&&s.destination==="exit"&&(e.exitAt=r),!s.steps.length&&s.destination!=="exit"&&un(n,e,"exit"),_s(n,e);return}if(!e.roomId){_s(n,e);return}if(a&&!e.waitingFor){const o=n.entities[s.destination];o?.kind==="facility"&&Vl(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!s.steps.length&&o?.kind==="facility"&&!o.construction&&hu(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0||e.birthdayBreakfast)&&(o.role!=="club"||n.game.clubStock>0)?Vl(n,e,o,i):!s.steps.length&&r-(e.waitSince??r)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),un(n,e,e.roomId)),_s(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",bn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+zn(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!s.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[s.destination]?.kind==="facility"&&n.entities[s.destination].construction)&&un(n,e,e.roomId),!s.steps.length&&r>=s.nextDecision)if(s.destination!==e.roomId)un(n,e,e.roomId);else{const o=Ad(n,e);let l=t()*o.reduce((u,f)=>u+f.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)un(n,e,c);else if(s.nextDecision=r+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;s.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:s.position.level,phase:"room"}],s.arrived=!1}}_s(n,e)}function Rd(n,e,t){const i=n.game.guestMemory??={},s=au(e);i[s]={visits:(i[s]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const r=(e.satisfaction??90)>=90;if(r&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(r?3:-2))),t.log("部门",r?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),bn(n,e,"checkout")}const Za={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},da=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,pu=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Wr(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,Qe(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function _n(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function et(n,e,t,i){const s=n.game;s.notice=t,s.logs.push({id:s.nextId++,day:s.day,minute:s.minute,category:e,text:t,target:i})}function on(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function ol(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,En(n,"revenue",e)}function jn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const ln=En,mu=fd;function Ja(){const n=Jc();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:mu(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=St(t)?900:650,e.satisfaction=90,e.segment="商务"}for(const e of Qe(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return Cs(n),jr(n),n.guests.forEach(e=>ea(n,e)),Qa(n),rl(n),et(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),ll(n),n}function Qa(n,e){const t=n.game,i=_n(n),s=["陈","林","何","张","周","王","李","赵"][Math.floor(_n(n)*8)]+"先生",r=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&_n(n)<.65,o=ru(a,_n(n),_n(n)),l={id:"guest-"+t.nextId++,name:s,tier:r,floorId:"floor-lobby",thought:r==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[s]??0)};gd(n,l,e),ea(n,l),l.goh=l.tier==="Globalist"&&_n(n)<.12,l.sua=!!e?.sua,bn(n,l,"arrival"),n.guests.push(l),t.arrivals++,et(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const ei=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function ll(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function Cd(n,e){e.roomId&&un(n,e,e.roomId)}function Pd(n){const e=n.game,t=Qe(n);let i=0,s=0;for(const u of n.guests)if(u.roomId){const f=u.rate??e.price;if(i+=f,u.spend=(u.spend??0)+f,u.source==="平台"){const d=Math.round(f*.15);n.metrics.cash-=d,e.expense+=d}s++}ol(n,i),e.nights=s;for(const u of ei(n))al(n,u),$r(n,u);const r=380+t.length*65+Object.values(e.managers).reduce((u,f)=>u+f*180,0);n.metrics.cash-=r,e.expense+=r;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=s?Math.round(i/s):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Wr(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(s/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:xs(n).total});const c=Cs(n).scores;c.push({day:e.day,value:xs(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),jn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),et(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function Id(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=_n(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=mu(e.day);for(const t of Qe(n))if(t.guestId){const i=n.guests.find(s=>s.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=Ka(Wr(n)>1.1?750:590,e.level,e.managers.revenue)),rl(n),et(n,"部门",`${pu(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Wr(n)*100)}%。`)}function Ld(n,e){const t=n.game;if(!t||t.paused)return;const i={income:s=>ol(n,s),reputation:s=>jn(n,s),log:(s,r,a)=>et(n,s,r,a),progress:(s,r=1)=>ln(n,s,r)};ud(n);for(let s=0;s<e&&!t.paused;s++){t.minute++,Ed(n),Sd(n,a=>ja(n,a),a=>on(n,a)),md(n,a=>Qa(n,a)),pd(n);const r=Qe(n);t.roomMinutes+=r.length,t.soldMinutes+=r.filter(a=>a.status==="occupied").length,t.closedMinutes+=r.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of r)a.timer&&!a.construction&&!ki(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",ln(n,"service"),et(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));ei(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(wd(n,a,()=>_n(n),i),iu(a),a.departing){a.exitAt!==void 0&&Jt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(al(n,a),$r(n,a),t.lost++,t.complaints++,jn(n,-1),et(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=su(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",et(n,"客诉",`${a.name} 的 ${zn(a)} 未确认，按 ${Wi(a)}:00 退房。`,o.id),jn(n,-1)),vd(n,a),Rd(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,$r(n,a),et(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(ei(n).length<8&&Qa(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/cu(n)*(.7+_n(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=r.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(_n(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),et(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(_n(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?ja(n,{type:"resolve",id:String(a.id),value:"sop"}):!ki(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,jn(n,-2),et(n,"客诉",`未及时处理：${a.title}`,a.target))}yd(n),Md(n),t.minute>=1440&&Pd(n)}ll(n)}function ja(n,e){const t=n.game;if(!t||xd(n,e)||bd(n,e)||_d(n,e)||hd(n,e))return;const i=e.id?n.entities[e.id]:void 0,s=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const r=ei(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!r||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&r.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===r.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}r.roomId=a.id,r.checkoutDay=t.day+(r.stayLength??2),r.rate=r.bookedRate??vn(t.price,a,r.tier==="Globalist"),r.upgrades=St(a)&&r.tier==="Globalist",r.denied=r.tier==="Globalist"&&!jc(a),r.upgrades?(t.upgrades++,ln(n,"vip"),jn(n,1)):r.tier==="Globalist"&&Qe(n).some(l=>St(l)&&l.status==="available")&&jn(n,-1);const o=t.operations?.bookings.find(l=>l.id===r.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=r.id,a.nightsLeft=r.stayLength??2,Cd(n,r),bn(n,r,r.denied?"denied":"checkin"),ln(n,"arrivals"),et(n,"入住",`${r.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${r.rate}/晚${r.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const r=ei(n).find(a=>a.id===e.id);r&&(al(n,r),$r(n,r),bn(n,r,"denied"),t.lost++,et(n,"入住",`已为 ${r.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":s?.status==="dirty"&&on(n,90)&&(s.status="cleaning",s.timer=30,et(n,"房态",`${s.number} 开始清洁，约 30 游戏分钟。`,s.id));break;case"repair":s?.status==="maintenance"&&!s.construction&&!s.timer&&!ki(n,s.id)&&on(n,180)?(s.timer=40,et(n,"房态",`${s.number} 开始维修。`,s.id)):i?.kind==="facility"&&on(n,200)&&(i.maintenance=100,et(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(s?.status!=="unbuilt"||n.floors.find(l=>l.id===s.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[r,a]=String(e.value).split(":");if(!Object.hasOwn(ni,r)||!["king","twin"].includes(a))break;const o=r;if(!on(n,ni[o].cost))break;s.category=o,s.bed=a,s.type=o==="suite"||o==="premium"?"suite":s.bed,s.status="available",s.level=1,Js(n,s.id),et(n,"升级",`${s.number} 已设置为 ${ni[o].name} · ${a==="twin"?"双床":"大床"}。`,s.id);break}case"upgrade":s?.status==="available"&&(s.level??1)<5&&on(n,du(s.level??1))&&(s.construction={remaining:90,total:90,targetLevel:(s.level??1)+1},s.status="maintenance",Js(n,s.id),ln(n,"upgrade"),et(n,"升级",`${s.number} 封闭装修：90 分钟后升级竣工。`,s.id));break;case"reserve":s?.status==="available"&&St(s)&&(s.status="reserved",et(n,"房态",`${s.number} 预留给 Globalist / SUA。`,s.id));break;case"release":s?.status==="reserved"&&!s.suaBookingId&&(s.status="available",et(n,"房态",`${s.number} 已释放预留。`,s.id));break;case"hire":{const r=e.id;if(!Object.hasOwn(Za,r)||t.managers[r])break;on(n,3800)&&(t.managers[r]=1,ln(n,"delegate"),et(n,"部门",`${Za[r]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const r=e.id==="club"?"clubStock":"stock";if(t[r]>=120){t.notice="库存充足，不必继续采购。";break}on(n,300)&&(t[r]=Math.min(160,t[r]+50),ln(n,"stock"),et(n,"部门",`${r==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(r==="stock"?"breakfast":"club")));break}case"resolve":{const r=t.events.find(c=>c.id===Number(e.id));if(!r)break;const a=r.kind==="repair"?"engineering":r.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!on(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==r.id);const l=n.entities[r.target];r.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,ln(n,"service")),r.kind==="supplies"&&(t.stock+=25),ln(n,"resolve"),jn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&ln(n,"delegate"),et(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${r.title}」，口碑 +${o?2:1}。`,r.target);break}case"expand":{const r=n.floors.filter(l=>l.role==="guest");if(!on(n,1e4+5e3*(r.length-3)))break;const a=r.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}Bl(n,2+r.length),n.floors.splice(2+r.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,et(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const r=n.guests.find(a=>a.id===e.id);if(!r?.roomId||r.late!=="pending")break;r.late=e.value==="honor"?"honor":"deny",r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(r.late==="honor"?4:-3))),ln(n,"late-decision"),jn(n,r.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(r.late==="honor"?-1:1))),bn(n,r,r.late==="honor"?"late-honor":"late-deny"),et(n,"入住",`${r.name} 已确认 ${r.late==="honor"?zn(r):Wi(r)+":00"} 退房。`,r.roomId);break}case"guest-service":{const r=n.guests.find(a=>a.id===e.id);if(!r?.roomId||r.serviceDone)break;on(n,120)&&(r.serviceDone=!0,r.satisfaction=Math.min(100,(r.satisfaction??90)+6),bn(n,r,"recovery"),ln(n,"resolve"),et(n,"部门",`${r.name} 的个性化服务已安排：${r.thought}`,r.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(on(n,12e3)){const r=n.floors.findIndex(a=>a.role==="rooftop");Bl(n,r),n.floors.splice(r,0,{id:"floor-spa",number:r,label:r+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),et(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),et(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,et(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&Id(n);break;case"claim":{const r=t.tasks.find(a=>a.id===e.id);if(r&&!r.claimed&&r.progress>=r.goal){const a=Math.max(0,r.reward-(r.paid??0));r.claimed=!0,ol(n,a),r.paid=r.reward,et(n,"收益",`完成「${r.title}」，尾款 ¥${a}；总奖金 ¥${r.reward}。`)}break}}ll(n)}function eo(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))eo(e)}return n}function Dd(n=Jc()){let e=eo(structuredClone(n));const t=new Set,i=s=>{e=eo({...e,...s}),t.forEach(r=>r(e))};return{getState:()=>e,subscribe(s){return t.add(s),()=>t.delete(s)},select(s){if(s!==null&&!e.entities[s])throw new Error("Unknown entity: "+s);i({selectedId:s,visited:s?[...new Set([...e.visited,s])]:e.visited})},focusFloor(s){if(!e.floors.some(r=>r.id===s))throw new Error("Unknown floor: "+s);i({focusedFloorId:s})},setSpeed(s){if(![1,2,4].includes(s))throw new Error("Invalid speed");i({speed:s})},setAtmosphere(s){if(!["dusk","night","day"].includes(s))throw new Error("Invalid atmosphere");i({atmosphere:s})},dispatch(s){const r=structuredClone(e);ja(r,s),i(r)},advance(s){if(!e.game||e.game.paused)return;const r=structuredClone(e);Ld(r,s),i(r)},reset(){i(Ja())}}}const fi={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},to={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},Ms=2.55,Ud=[-4.93,0,4.93],Nd=[["hub","经营"],["hotel","客房"],["front","客人"],["operations","团队"],["development","设施"]];function no(n){return["hotel","hotel-data","hotel-archive","entity","room-data"].includes(n)?"hotel":["front","events","worklist","bookings","history"].includes(n)?"front":["operations","operations-data","report","report-data","score"].includes(n)?"operations":["development","development-data"].includes(n)?"development":"hub"}function Fd(n){return{hub:[["hub","今天"],["brief","晨会"],["tasks","目标"],["evening","复盘"]],hotel:[["hotel","房态"],["hotel-data","扩建"]],front:[["front","接待"],["events","服务"],["bookings","预订"],["history","客史"]],operations:[["operations","主管"],["operations-data","运营明细"],["report","财务"]],development:[["development","设施"],["development-data","活动"],["hotel-data","扩建"]]}[no(n)]}function io(n){const e={hub:"M3 10 12 3l9 7v11h-6v-7H9v7H3Z",hotel:"M3 20V9h18v11M3 16h18M5 9V5h14v4M7 12h3m4 0h3",front:"M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a6 6 0 0 1 12 0v3m3-17a4 4 0 0 1 0 8m0 3a5 5 0 0 1 5 5",operations:"M4 21v-6m8 6V9m8 12V3M1 15h6m2-6h6m2-6h6",development:"m14 4 6 6M3 21l9-9m0-6 6-4 4 4-4 6-6-6Z",brief:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2",evening:"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",tasks:"M5 4h14v18H5ZM9 2h6v4H9ZM8 11l2 2 5-5m-7 9h8",report:"M3 21h19M6 17V9m6 8V3m6 14v-6",history:"M4 4h16v17H4ZM8 8h8m-8 4h8m-8 4h5",log:"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16",bookings:"M3 5h18v17H3ZM7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"};return`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${e[n]??e.hub}"/></svg>`}function Ui(n){const e=["hotel","report","history"].includes(n),t=n==="evening";return`<svg class="space-art" viewBox="0 0 160 110" aria-hidden="true" focusable="false"><defs><linearGradient id="wall-${n}" x2="1" y2="1"><stop stop-color="${t?"#5c665d":"#eee2ca"}"/><stop offset="1" stop-color="${t?"#303d36":"#b6a489"}"/></linearGradient></defs><path fill="url(#wall-${n})" d="M0 0h160v110H0z"/><path fill="#7c6249" d="m0 89 91-26 69 21v26H0"/><path fill="${t?"#344d50":"#a5b4ad"}" d="M79 7h56v59H79z"/><path fill="none" stroke="#e8dfc7" stroke-width="3" d="M78 7h58v60H78zM105 7v59"/><path fill="#fff6d0" opacity=".25" d="m79 66-56 44h66l45-44"/><path fill="#a78b66" d="M23 0h6v82h-6zm10 0h4v80h-4zm9 0h3v76h-3"/><path fill="#e9ddc2" d="M70 5h7v65h-7zm69 0h8v72h-8"/>${e?'<path fill="#735b45" d="m38 63 42-13 52 21-42 20-52-16z"/><path fill="#ded4bf" d="m39 57 43-11 50 20-43 19-50-15z"/><path fill="#fcf7e8" d="m41 56 40-11 28 11-41 14z"/><path fill="#617565" d="m68 70 41-14 22 10-42 19z"/><path fill="#fffaf0" d="m47 55 14-4 13 5-15 5zm19-6 13-4 13 5-13 5z"/>':'<path fill="#8b7357" d="m42 67 44-13 39 16v23l-39 15-44-17z"/><path fill="#e9dbc2" d="m40 62 46-13 42 16-43 16-45-16z"/><path fill="#40584b" d="m19 76 17-6 16 7v20l-18 7-15-9z"/><path fill="#6e8670" d="m18 71 17-6 18 8-19 7z"/>'}<path stroke="#a58b55" stroke-width="3" d="M151 77V41"/><path fill="#ffe6a3" d="m139 44 6-18h11l4 18z"/><path fill="#ae9776" d="M6 90h15l-2 17H9z"/><path fill="${n==="tasks"||n==="development"?"#3a6041":"#50654b"}" d="M14 94C-8 65 5 46 14 82 5 29 28 48 17 83 36 49 39 83 14 94Z"/><path stroke="#f9e9b6" opacity=".6" d="M0 109h160"/></svg>`}const Bi=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),hi=(n,e,t)=>`<button class="hub-tile" data-open="${t}">${io(t)}<div class="tile-copy"><strong>${n}</strong><small>${e}</small></div><div class="tile-scene">${Ui(t)}</div><span class="tile-arrow" aria-hidden="true">›</span></button>`;function cl(n){const e=n.game;return[...e.events.map(t=>({key:"event-"+t.id,title:t.title,detail:`剩余 ${Math.max(0,t.expires-e.day*1440-e.minute)} 分钟`,urgent:!0,button:`<button class="game-action" data-entity="${Bi(t.target)}">现场</button><button class="game-action" data-action="resolve" data-id="${t.id}" data-value="gm">亲自处理 · ¥350</button>`,note:"直接协调支出较高；授权方案在待办详情中。"})),...Qe(n).filter(t=>t.status==="dirty").map(t=>({key:t.id,title:t.number+" · 待翻房",detail:"客房部 · 清洁后才可出售",urgent:!1,button:`<button class="game-action" data-action="clean" data-id="${t.id}">清洁 · ¥90</button>`,note:"约 30 游戏分钟；等待主管可节省手动清洁费。"})),...n.guests.filter(t=>!t.staff&&!t.departing&&!t.roomId).map(t=>({key:t.id,title:t.name+" · 等待入住",detail:`${t.tier} · 耐心 ${t.patience??0} 分钟`,urgent:(t.patience??100)<45,button:`<button class="game-action" data-open="front" data-guest="${Bi(t.id)}">为他选房 →</button>`,note:t.reservationId?"确认预订未兑现需支付 ¥600 安置费。":"临时到店客人，先比较空房与留套需要。"})),...n.guests.filter(t=>!t.departing&&t.roomId&&(t.late==="pending"||t.challenge&&!t.challenge.resolved||t.occasion&&!t.occasion.resolved)).map(t=>({key:t.id,title:t.name+" · 服务待确认",detail:t.occasion&&!t.occasion.resolved?"生日礼遇待决定":t.late==="pending"?"晚退请求":"特殊安排",urgent:!1,button:`<button class="game-action" data-open="events" data-guest="${Bi(t.id)}">处理诉求 →</button>`,note:"查看真实诉求与条件，欢迎礼不代替承诺。"})),...e.stock<20?[{key:"breakfast-stock",title:"早餐库存偏低",detail:`剩余 ${e.stock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="breakfast">补 50 份 · ¥300</button>',note:"提前备货减少断供风险；先保留必要现金。"}]:[],...e.clubStock<20?[{key:"club-stock",title:"酒廊库存偏低",detail:`剩余 ${e.clubStock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="club">补 50 份 · ¥300</button>',note:"晚间服务仍在继续，补货会增加今天成本。"}]:[]].sort((t,i)=>Number(i.urgent)-Number(t.urgent))}function so(n,e=4){const t=cl(n);return`<section class="work-list"><div class="hub-section-title"><h3>现在需要处理 <small>${t.length}</small></h3>${t.length>e?'<button data-open="worklist">查看全部 →</button>':""}</div>${t.slice(0,e).map(i=>`<article class="work-item" data-work-key="${Bi(i.key)}"><div><strong>${Bi(i.title)}</strong><small>${Bi(i.detail)}</small></div>${i.urgent?'<span class="urgency">优先</span>':""}<div class="work-actions">${i.button}</div><small class="work-trade">${Bi(i.note)}</small></article>`).join("")||'<p class="empty">没有积压事项，关上面板看看酒店里的客人。</p>'}</section>`}function Od(n){const e=n.game,t=Qe(n),i=cl(n).length;return`<h2>今天怎么经营？</h2><p class="hub-subtitle">Day ${e.day} · ${t.filter(s=>s.status==="occupied").length} / ${t.length} 间在住 · ${i} 项现场事项</p><div class="hub-grid">${hi("08:00 晨会","预订、需求与今天的决定","brief")}${hi("20:00 复盘",e.evening?"回看客诉与总部建议":"晚间自动开会","evening")}${hi("今日目标",e.tasks.filter(s=>s.claimed).length+" / "+e.tasks.length+" 项已领奖","tasks")}${hi("财务与评分","收入、成本与经营表现","report")}</div>${so(n)}<details class="manager-card"><summary>经营档案与长期计划</summary><div class="hub-grid">${hi("客史记录","上次承诺，这次兑现","history")}${hi("经营日志","追溯决定与结果","log")}${hi("投资计划","扩建、营销与主题活动","development")}${hi("今日预订","APP、团单与平台客人","bookings")}</div></details>`}const $l={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function dn(n){const e=typeof n=="string"?n:n.persona??"chill",t=$l[e]??$l.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",s=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",r=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${s}${r}</svg></span>`}function ul(n,e){return`<section class="guest-card person-card">${dn(n)}<div class="person-body"><div class="person-heading"><strong>${String(n.name).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}</strong><span class="person-tier">${n.tier}</span></div>${e}</div></section>`}const kd=()=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:"overview",activity:"coffee",category:"standard",bed:"king"}),gt=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Lt=n=>"¥"+Math.round(n).toLocaleString("en-US"),Ge=(n,e,t="",i="",s="")=>`<button class="game-action" data-action="${e}" data-id="${gt(t)}" data-value="${gt(i)}" ${s}>${n}</button>`,nt=(n,e)=>`<button class="game-action" data-open="${e}">${n}</button>`,gn=(n,e,t,i=!1)=>`<button data-focus-key="${e}" data-focus-value="${gt(t)}" aria-pressed="${i}">${n}</button>`,In=n=>`<div class="focus-tabs">${n}</div>`,Tt=n=>`<div class="focus-metrics">${n.map(([e,t])=>`<div><small>${e}</small><strong>${t}</strong></div>`).join("")}</div>`,At=(n,e,t)=>`<div class="focus-person">${dn(n)}<div><strong>${gt(e)}</strong><p>${gt(t)}</p></div></div>`,wt=(n,e,t)=>`<section class="focus-screen"><h2>${n}</h2><div class="focus-main">${e}</div></section><div class="focus-footer">${t}</div>`,fa=(n,e,t)=>`<div class="focus-pager">${gn("‹ 上一项",n,String(Math.max(0,e-1)))}<span>${t?e+1:0} / ${t}</span>${gn("下一项 ›",n,String(Math.min(Math.max(0,t-1),e+1)))}</div>`;function Bd(n,e,t){const i=n.game,s=Qe(n),r=n.guests.filter(o=>!o.staff&&!o.departing&&!o.roomId),a=cl(n);if(e==="hub")return wt("今天怎么经营？",Tt([["现金",Lt(n.metrics.cash)],["在住",s.filter(o=>o.status==="occupied").length+"/"+s.length],["待处理",String(a.length)]])+`<div class="focus-shortlist">${a.slice(0,3).map(o=>`<div><span><strong>${gt(o.title)}</strong><small>${gt(o.detail)}</small></span>${o.button}</div>`).join("")||"<p>现场没有积压，可以继续经营。</p>"}</div>`+At("front",Mi(n)?.title??"酒店进入自由经营",Mi(n)?Mi(n).action+" · "+Mi(n).progress+"/"+Mi(n).goal:"继续培养熟客，完成长期里程碑。"),nt("当前目标","tasks")+nt("08:00 晨会","brief")+nt("20:00 复盘","evening"));if(e==="front"){const o=t.guest?Math.max(0,r.findIndex(f=>f.id===t.guest)):Math.min(t.guestPage,Math.max(0,r.length-1)),l=r[o];if(!l)return wt("客人接待",At("front","目前无人排队","关上面板继续经营，客人到店后会提醒你。"),nt("今日预订","bookings")+nt("回到酒店","hub"));const c=s.filter(f=>f.status==="available"||f.status==="reserved"&&l.tier==="Globalist"&&(!f.suaBookingId||f.suaBookingId===l.reservationId)).sort((f,d)=>+(d.id===t.room)-+(f.id===t.room)||+(!!d.suaBookingId&&d.suaBookingId===l.reservationId)-+(!!f.suaBookingId&&f.suaBookingId===l.reservationId)||(l.tier==="Globalist"?Number(St(d))-Number(St(f)):+(f.type==="suite")-+(d.type==="suite"))),u=Math.min(t.roomPage,Math.max(0,Math.ceil(c.length/2)-1));return wt("给这位客人一间房",fa("guestPage",o,r.length)+`<div class="focus-person">${dn(l)}<div><strong>${gt(l.name)} · ${gt(l.tier)}</strong><p>${gt(l.thought)}</p></div></div>`+Tt([["住宿",`${l.stayLength} 晚`],["耐心",`${l.patience} 分钟`],["来源",gt(l.source??"Walk-in")]])+`<div class="focus-room-choices">${c.slice(u*2,u*2+2).map(f=>`<button data-action="checkin" data-id="${gt(l.id)}" data-room="${f.id}">${Ui("hotel")}<strong>${f.number} · ${Ks(f)}</strong><small>${l.tier==="Globalist"&&St(f)?"免费升套 · 占用标准套库存":"点击安排入住"}</small></button>`).join("")||"<p>暂无空房，先清洁或查看预留。</p>"}</div>`+(c.length>2?fa("roomPage",u,Math.ceil(c.length/2)):"")+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',nt("查看房态","hotel")+Ge("婉拒本次","reject",l.id))}if(e==="events"||e==="worklist"){const o=[];for(const u of n.guests.filter(f=>!f.departing&&f.roomId)){if(u.occasion&&!u.occasion.resolved){const f=uu(n,u);o.push({id:u.id+"-birthday",body:`<div class="focus-person">${dn(u)}<div><strong>${gt(u.name)} · 今天过生日</strong><p>这趟专门来庆祝，早餐和房型还能有一点惊喜吗？</p></div></div>`+Tt([["早餐库存",i.stock+" 份"],["可售标准套",String(f.free)],["需保护预订",String(f.reserve)]])+`<div class="focus-decision"><h3>照顾这一晚，也要照顾其他承诺</h3><p>早餐 ¥160 / 2 份 · 体验 +8 · 业主 −1。</p><p>升套 ¥280 · 体验 +12 · 业主 −2；原房待翻房，套房按原房费住。</p><p class="focus-trade">${f.alreadySuite?"客人已住标准套房，可以改送早餐或祝福。":f.suite?"送掉套房会减少后续付费销售和会员升套空间。":"现有套房需保护预订；不能重复承诺。"}手写卡免费，体验 +2；维持预订体验 −3。</p></div>`,actions:Ge("送双人早餐","birthday-choice",u.id,"breakfast",f.breakfast?"":"disabled")+Ge("生日升套","birthday-choice",u.id,"suite",f.suite?"":"disabled")+Ge("手写生日卡","birthday-choice",u.id,"card")+Ge("维持原预订","birthday-choice",u.id,"decline")})}if(u.challenge&&!u.challenge.resolved){const f=u.challenge.kind,d={quiet:["需要安静的房间","quiet","有施工噪声时需要另有安静空房。"],sua:["核对 SUA 标准套房","inventory","已入住标准套才能兑现；欢迎礼不能替代。"],family:["早餐和加床一起安排","family",`需要 6 份早餐库存，当前 ${i.stock} 份。`],audit:["检查房间与服务流程","inspect","需客房、工程主管在岗，且无待修房。"]}[f];o.push({id:u.id,body:`<div class="focus-person">${dn(u)}<div><strong>${gt(u.name)} · ${gt(u.tier)}</strong><p>${d[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${d[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:Ge("落实 · ¥180","guest-choice",u.id,d[1])+Ge("欢迎礼 · ¥100","guest-choice",u.id,"gift")+Ge("不作安排","guest-choice",u.id,"decline")})}u.late==="pending"&&o.push({id:u.id+"-late",body:`<div class="focus-person">${dn(u)}<div><strong>${gt(u.name)} · ${gt(u.tier)}</strong><p>希望 ${zn(u)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:Ge("同意 "+zn(u),"late",u.id,"honor")+Ge("协商 "+Wi(u)+":00","late",u.id,"deny")})}for(const u of i.events){const f=u.kind==="repair"?"engineering":u.kind==="supplies"?"fnb":"front";o.push({id:"event-"+u.id,body:At(f,u.title,`剩余 ${Math.max(0,u.expires-i.day*1440-i.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${i.managers[f]?"主管已到岗，可以授权处理。":"对应主管尚未到岗；可先亲自处理，避免超时。"}</p></div>`,actions:Ge("亲自处理 · ¥350","resolve",String(u.id),"gm")+(i.managers[f]?Ge("交给主管 · ¥150","resolve",String(u.id),"sop"):nt("聘任主管","operations"))})}for(const u of a.filter(f=>!o.some(d=>d.id===f.key)&&!n.guests.some(d=>d.roomId&&d.id===f.key)))o.push({id:u.key,body:At("front",u.title,u.detail)+`<div class="focus-decision"><p>${gt(u.note)}</p></div>`,actions:u.button});const l=t.event?Math.max(0,o.findIndex(u=>u.id===t.event||u.id===t.event+"-birthday"||u.id===t.event+"-late")):Math.min(t.eventPage,Math.max(0,o.length-1)),c=o[l];return wt("逐件处理 · "+o.length+" 项",c?fa("eventPage",l,o.length)+c.body:At("front","待办全部处理完了","关上面板，回到酒店看决定如何发生。"),c?.actions??nt("回到经营","hub"))}if(e==="hotel"||e==="entity"){const o=n.floors.filter(m=>m.role==="guest"),l=o.find(m=>m.id===(t.floor??n.entities[t.room??""]?.floorId))??o[0];if(!l)return null;const c=il(n).filter(m=>m.floorId===l.id),u=c.find(m=>m.id===t.room)??c[0];if(!u)return null;t.room=u.id,t.floor=l.id;const f=In(o.map(m=>gn(m.label,"floor",m.id,m.id===l.id)).join(""))+`<div class="focus-room-map">${c.map(m=>gn(m.number+"<small>"+{available:"可入住",occupied:"在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"封闭",reserved:"已预留",unbuilt:"＋设置"}[m.status]+"</small>","room",m.id,m.id===u.id)).join("")}</div>`,d=u.construction??l.construction;if(d)return wt(u.number+" · 封闭施工",f+`<div class="focus-space">${Ui("hotel")}</div>`+Tt([["剩余",d.remaining+" 分钟"],["完成后","开放使用"]]),nt("扩建与全部参数","hotel-data"));if(u.status==="unbuilt")return wt(u.number+" · 设置房型",f+In(Object.entries(ni).map(([m,g])=>gn(g.name,"category",m,t.category===m)).join(""))+In(gn("大床","bed","king",t.bed==="king")+gn("双床","bed","twin",t.bed==="twin"))+Tt([["配置费用",Lt(ni[t.category].cost)],["新客房价",Lt(i.price*ni[t.category].factor)+"起"]])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',Ge("确认设置","configure-room",u.id,t.category+":"+t.bed));const h=n.guests.find(m=>m.id===u.guestId),p=u.level??1,x=u.status==="dirty"?Ge("清洁 · ¥90","clean",u.id):u.status==="maintenance"&&!u.timer?Ge("维修 · ¥180","repair",u.id):u.status==="available"?`<button class="game-action" data-open="front" data-assign-room="${u.id}">安排入住</button>`+(p<5?Ge("装修 · "+Lt(p*2500),"upgrade",u.id):"")+(St(u)?Ge("留给会员","reserve",u.id):""):u.status==="reserved"&&!u.suaBookingId?Ge("释放预留","release",u.id):h?`<button class="game-action" data-open="events" data-guest="${h.id}">${h.occasion&&!h.occasion.resolved?"生日礼遇":"查看服务诉求"}</button>`:"";return wt(u.number+" · "+Ks(u),f+`<div class="focus-space">${Ui("hotel")}<span>Lv.${p} · ${h?gt(h.name):"暂无住客"}</span></div>`+Tt([["每晚房费",Lt(h?.rate??vn(i.price,u))],["剩余住宿",u.nightsLeft+" 晚"],["升级增收",p<5?"每新客晚 +"+Lt(vn(i.price,{...u,level:p+1})-vn(i.price,u)):"已满级"]])+`<p class="focus-trade">${u.status==="available"?"装修需停卖 90 分钟；已确认订单价格不变。":h?gt(h.thought):"等清洁或维修完成后，才能再次出售。"}</p>`,x+nt("房间明细","room-data"))}if(e==="hotel-data"){const o=n.floors.filter(u=>u.role==="guest").length,l=1e4+5e3*(o-3),c=n.floors.filter(u=>u.construction);return wt("扩建 · 再高一层",`<div class="focus-space">${Ui("hotel")}<span>施工 → 竣工 → 手动设置房型</span></div>`+Tt([["建设费",Lt(l)],["交付时间","4 小时"],["新增","3 个空位"]])+At("engineering","扩建前先确认现金与需求","施工期间新楼层封闭；竣工后逐间选择房型，普通客房配置已含在造价中。")+`<p class="focus-trade">${c.length?c.length+" 层仍在施工。":""}相邻房间有噪声风险；已有空房较多时，可先改善现有客房。</p>`,Ge("开工 · "+Lt(l),"expand")+nt("查看房态","hotel")+nt("投资明细","hotel-archive"))}if(e==="development-data"){const o=Object.hasOwn($i,t.activity)?t.activity:"coffee",l=$i[o],c=i.development?.activity;return wt("活动 · 投入一场体验",In(Object.entries($i).map(([u,f])=>gn(f.name,"activity",u,u===o)).join(""))+At("fnb",l.name,l.description)+Tt([["筹备费",Lt(l.cost)],["准备时间","2 小时"],["每位收入",Lt(l.fee)]])+`<p class="focus-trade">${c?"已有活动筹备中，等待现场结算。":"人数受在住客人、天气、定位与容量影响；收入不足筹备费时会亏损。"}每个营业日只能安排一场。</p>`,Ge(c?"正在筹备":"安排活动 · "+Lt(l.cost),"activity",o,"",c||i.development?.activityDay===i.day?"disabled":"")+Ge("三日推广 · ¥2,200","campaign")+nt("查看设施","development"))}if(e==="operations"){const o={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},l=t.department??"house",c=i.managers[l],u=c?4500*c:3800,f={front:"自动分房与常规诉求；无空房仍需等待。",house:`每间清洁 ${Oi(c)} → ${Oi(Math.min(3,c+1))} 分钟，另需到场时间。`,engineering:`维修 ${Qs(c)} → ${Qs(Math.min(3,c+1))} 分钟，另需到场时间。`,fnb:"低库存时派员工配送，到餐台后才计入库存。",revenue:"次日自动定价；报价更高也可能减少客流。"}[l];return wt("团队 · 原位授权",In(Object.entries(o).map(([d,h])=>gn(h,"department",d,d===l)).join(""))+At(l,o[l]+"主管",c?"已到岗 · Lv."+c:"尚未聘任")+Tt([["投入",c>=3?"已满级":Lt(u)],["每日工资",Lt(c*180)+" → "+Lt(Math.min(3,c+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${f}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(c<3?Ge(c?"培训升级":"聘任到岗",c?"train":"hire",l):"")+nt("效果与财务明细","operations-data"))}if(e==="development"){const o=Object.values(n.entities).filter(u=>u.kind==="facility"),l=o.find(u=>u.id===t.facility)??o[0];if(!l)return null;const c=l.level??1;return wt("设施 · 看清再投资",In(o.map(u=>gn(u.name,"facility",u.id,u.id===l.id)).join(""))+`<div class="focus-space">${Ui(l.role==="rooftop"?"evening":"hotel")}<span>${l.name} · Lv.${c}</span></div>`+Tt([["使用 / 容量",l.usage+" / "+l.capacity],["升级后容量",String(l.capacity+4)],["费用",Lt(c*3500)]])+`<p class="focus-trade">${l.construction?"施工剩余 "+l.construction.remaining+" 分钟。":"升级需封闭施工；先补货或维护可解决眼前问题。"}</p>`,(l.construction?"":(c<5?Ge("升级设施","invest",l.id):"")+(["breakfast","club"].includes(l.role)?Ge("补货 · ¥300","stock",l.role):Ge("维护 · ¥200","repair",l.id)))+nt("营销、活动、更多","development-data"))}if(e==="brief"){const o=nr(n),l=t.meeting,c=l==="price"?At("revenue","今天挂牌多少？","高价增加单晚收入，也可能减少 Walk-in。")+Tt([["当前挂牌",Lt(i.price)],["预计入住",o.occupancy+"%"]])+In(Ge("¥720 · 争取入住","price","","720")+Ge("¥850 · 提高单价","price","","850")):l==="service"?At("fnb","先备好今天的服务",`早餐预计 ${o.breakfast} 人，当前 ${i.stock} 份。`)+Tt([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"]])+In(Ge("早餐 +50 · ¥300","stock","breakfast")+Ge("酒廊 +50 · ¥300","stock","club")):l==="suite"?At("front","套房要留一间吗？","留套照顾会员；开放销售保留付费机会。SUA 锁房不变。")+Tt([["当前策略",i.operations?.suitePolicy==="hold"?"保留一间":"开放销售"]])+In(Ge("保留一间","suite-policy","","hold")+Ge("开放销售","suite-policy","","sell")):Tt([["预计入住",o.occupancy+"%"],["确认预订",String(i.operations?.bookings.length??0)],["早餐需求",o.breakfast+" 人"]])+At("revenue","Day "+i.day+" · 开始前做一个判断",o.breakfast>i.stock?"早餐需求超过库存，建议先备货。":o.occupancy>=90?"预计接近满房，谨慎继续投广告。":"今天还有接客空间，可保留现价，也可以调整报价。");return wt("08:00 · 晨会",In(["overview","price","service","suite"].map((u,f)=>gn(["重点","房价","备货","套房"][f],"meeting",u,u===l)).join(""))+c,i.operations?.briefOpen?Ge("按当前决定开始今天","brief-start")+nt("预订 / 客源明细","bookings"):nt("回到经营","hub")+nt("完整预测","brief-data"))}if(e==="evening"||e==="report"){const o=i.evening,l=i.reports.at(-1);if(e==="evening"&&!o)return wt("20:00 · 晚间复盘",At("revenue","今晚 20:00 自动开会","继续经营，届时核对收入、客诉与总部建议。"),nt("回到经营","hub"));if(e==="report"&&!l)return wt("今日尚未日结",At("revenue","房费于午夜结算","现在可以查看 20:00 快照，或继续经营。"),nt("晚间复盘","evening"));const c=e==="evening"?o.notes[0]?.text:l.recommendation;return wt(e==="evening"?"20:00 · 今天经营得如何？":"Day "+l.day+" · 日结",Tt(e==="evening"?[["预计净额",Lt(o.projectedNet)],["入住率",o.occupancy+"%"],["待办",String(o.pending)]]:[["净额",Lt(l.revenue-l.expense)],["入住率",l.occupancy+"%"],["客诉",String(l.complaints)]])+At("revenue","今晚优先改进",c??"保持服务节奏。")+'<p class="focus-trade">'+(e==="evening"?"这是 20:00 快照；预计房费还未入账。":"这是午夜结算结果。")+"</p>",nt("客诉 / 明细",e==="evening"?"evening-data":"report-data")+(e==="evening"&&o?.open?Ge("交给夜班 · 继续经营","evening-close"):i.reportOpen?Ge("开始下一天","continue"):nt("回到经营","hub")))}if(e==="tasks"){const o=i.campaign,l=Mi(n),c=o?.inspection,u=o?.result;if(!l)return wt("酒店成长路线 · 完成",At("revenue","五段经营检验全部通过","经营仍会继续。培养熟客、建设酒店，长期里程碑保留。")+Tt([["认证",String(o?.certificates.length??0)+" / 5"]]),nt("继续经营","hub")+nt("支线与里程碑","tasks-data"));const f=`<small class="campaign-route">酒店成长路线 · ${Math.min(5,(o?.chapter??0)+1)} / 5${o?.certificates.length?" · 已获 "+o.certificates.length+" 项认证":""}</small>`;if(u)return wt(u.passed?"体验通过 · "+l.exam:"需要改善 · "+l.exam,f+At(l.department,l.title,u.advice)+Tt([["现场表现",String(u.score)],["通过标准",String(l.threshold)]])+`<div class="inspection-scenes">${u.scenes.map(d=>`<p>${gt(d)}</p>`).join("")}</div><p class="focus-trade">${u.passed?"确认后进入下一段目标；日常经营不会重置。":"目标进度保留；免费重约，次日到店再检验。"}</p>`,u.passed?Ge("进入下一阶段","continue-chapter"):nt("先去改善",u.target)+Ge("免费预约重试","book-inspection"));if(c){const d=Math.max(0,c.due-i.day*1440-i.minute),h=i.day*1440+i.minute-c.due,p=Math.min(2,Math.max(0,Math.floor(h/10)));return wt(l.exam+" · "+(c.phase==="booked"?"已预约":"现场体验中"),f+At(l.department,c.phase==="booked"?"留出时间把酒店准备好":["Room Check · 客房巡检","F&B · 体验餐台","Front Office · 核对承诺"][p],c.phase==="booked"?"检验看实际房态、住客体验、餐饮库存和诉求积压，现场还会有小幅波动。":"检验员按顺序体验酒店；尚未公布结果。")+Tt([["到店时间","Day "+Math.floor(c.due/1440)+" · 18:00"],["等待",c.phase==="booked"?d+" 分钟":Math.max(0,30-h)+" 分钟后反馈"],["额外准备",c.prepared?"已彩排 · +6":"可选 · ¥300"]])+`<div class="inspection-timeline"><span class="${h>=0?"active":""}">看房</span><span class="${h>=10?"active":""}">用餐</span><span class="${h>=20?"active":""}">服务</span></div><p class="focus-trade">彩排提高表现，但不能替代清洁、备货和兑现承诺。</p>`,(c.phase==="booked"&&!c.prepared?Ge("现场彩排 · ¥300","prepare-inspection"):"")+nt("检查房态","hotel")+nt("备货与服务","operations"))}return wt(l.title,f+At(l.department,l.action,l.ready?"行动目标已完成。预约一次真实体验，检验今天的经营。":"先做好这一件事。目标跨天保留，完成后预约次日检验。")+Tt([["当前进度",l.progress+" / "+l.goal],["下一次检验",l.exam]])+`<progress max="${l.goal}" value="${l.progress}" aria-label="${gt(l.action)}"></progress><p class="focus-trade">日常支线奖金分段到账，完成后可领尾款；单任务奖金上限不变。</p>`,(l.ready?Ge("预约检验 · 次日 18:00","book-inspection"):nt("去完成当前目标",l.target))+nt("支线奖励与带教","tasks-data"))}return null}const kn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),zd={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Jn=(n,e)=>`<button class="game-action" data-open="${e}">${n} →</button>`;function Rt(n,e,t,i,s,r=""){return`<aside class="head-advice">${dn(e)}<div><small>${zd[e]}主管 · ${n.game.managers[e]?"在岗建议":"筹备建议 · 尚未聘任"}</small><h3>${kn(t)}</h3><p>${kn(i)}</p>${s?`<p class="trade-off">${kn(s)}</p>`:""}${r?`<div class="action-row">${r}</div>`:""}</div></aside>`}function Gd(n,e){const t=n.game,i=Qe(n),s=n.guests.filter(o=>!o.staff&&!o.roomId&&!o.departing),r=i.filter(o=>o.status==="dirty"),a=n.guests.filter(o=>!o.departing&&(o.late==="pending"||o.challenge&&!o.challenge.resolved)).length+t.events.length;return e==="front"?Rt(n,"front",s.length?`${s.length} 位客人在等房`:"前台暂时不忙","先接待即将失去耐心的客人；SUA 客人优先核对已锁标准套。","免费升套占用套房库存；拒绝确认预订需支付 ¥600 安置费。"):e==="events"?Rt(n,"front",a?`${a} 项诉求需要决定`:"目前没有待办","先看客人的核心诉求，再决定亲自处理还是授权主管。","欢迎礼不能代替承诺；晚退让客人满意，也把翻房时间推迟。"):e==="hotel"||e==="entity"?Rt(n,"house",r.length?`${r.length} 间脏房还不能卖`:"让现有房间先创造收入",r.length?"建议先翻房，再考虑花钱扩建。":"空房可以接客，也可以停卖装修；先看今天还有多少人要来。","清洁 ¥90 / 间；装修停卖 90 分钟，扩建封闭 240 分钟。",e==="hotel"&&r[0]?`<button class="game-action" data-entity="${r[0].id}">先看 ${r[0].number} →</button>`:""):e==="operations"?t.stock<20||t.clubStock<20?Rt(n,"fnb","餐台快见底了",`早餐 ${t.stock} 份，酒廊 ${t.clubStock} 份；先补短缺的餐台。`,"每次采购 ¥300 / 50 份；聘任后能自动配送，但要付每日工资。",`<button class="game-action" data-action="stock" data-id="${t.stock<20?"breakfast":"club"}">补足低库存 · ¥300</button>`):Rt(n,"house",r.length?"翻房开始积压":"把重复工作交给团队",r.length?`还有 ${r.length} 间脏房；先比较自己处理与长期授权。`:"主管到岗后，员工会到现场接手常规工作。","首聘 ¥3,800，工资 ¥180 / 天；工作量少时先手动处理也合理。",Jn("看房态","hotel")):e==="development"?Rt(n,"revenue","先判断酒店缺客，还是缺容量",`当前 ${i.filter(o=>o.status==="occupied").length} / ${i.length} 间在住。`,"推广增加客流但不保证成交；满房时投放可能增加拒客，装修则暂时减少可售房。",Jn("先看今日预订","bookings")):e==="bookings"?Rt(n,"front","先认出今天难接待的客人","展开 SUA、特别关注和即将到店的预订，提前留房。","预订报价已锁定；Walk-in 不在预订表内。",Jn("接待到店客人","front")):e==="history"?Rt(n,"front","上次没解决的事，客人还记得","先看回访客人的最近一条记录，再决定这次怎样接待。","持续兑现承诺会积累信任；单次送礼不保证挽回体验。",Jn("看当前诉求","events")):e==="tasks"?Rt(n,"front","今天先完成一件有意义的事","先跟随三日带教，再选择与当前酒店问题一致的任务。","奖励是额外收入；别为了任务在满房时继续花钱获客。"):e==="score"||e==="log"?Rt(n,"revenue","用结果找到下一步","先检查待办和房态，再回看评分或日志中的变化。","改善服务需要时间与成本，单次分数变化不代表长期收益。",Jn("看待办","events")+Jn("看房态","hotel")):""}function gu(n){const e=n.game,t=e.logs.filter(r=>r.day===e.day),i=r=>t.some(a=>r.test(a.text)),s=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(r=>r.challenge&&!r.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:s,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:s,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:s,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}function ro(n){const e=gu(n);if(!e.length)return"";const t=e.findIndex(r=>!r.done),i=e[t<0?e.length-1:t],s=n.game.day===1?"front":n.game.day===2?"fnb":"revenue";return`<section class="teaching"><small>DAY ${n.game.day} / 3 · ${["接待与兑现","服务与授权","预测与复盘"][n.game.day-1]}</small><div class="teaching-track">${e.map((r,a)=>`<span class="${r.done?"done":a===t?"current":""}">${r.done?"✓":a+1} ${r.title}</span>`).join("")}</div>${t<0?"<p>今日带教完成。你可以自由经营，明天继续接班。</p>":Rt(n,s,i.title,i.text,i.trade,Jn("继续这一幕",i.target))}</section>`}function Hd(n,e){const t=Qe(n).filter(s=>s.status==="available"||s.status==="reserved"&&e.tier==="Globalist"&&(!s.suaBookingId||s.suaBookingId===e.reservationId)).sort((s,r)=>+(r.suaBookingId===e.reservationId&&!!r.suaBookingId)-+(s.suaBookingId===e.reservationId&&!!s.suaBookingId)||(e.tier==="Globalist"?Number(St(r))-Number(St(s)):+(s.type==="suite")-+(r.type==="suite"))),i=(s,r)=>`<button class="room-choice ${r===0?"recommended":""}" data-action="checkin" data-id="${kn(e.id)}" data-room="${s.id}"><small>${r===0?"建议安排":"另一种选择"}</small><strong>${s.number} · ${Ks(s)}</strong><span>${s.suaBookingId?"兑现 SUA 锁房":e.tier==="Globalist"&&St(s)?"免费升套 · 占用一间标准套":"保留其他房型库存"} · 点击入住</span></button>`;return`<div id="assign-${kn(e.id)}" tabindex="-1">${t.length?`<div class="room-choice-list">${t.slice(0,2).map(i).join("")}</div>${t.length>2?`<details class="manager-card"><summary>其他 ${t.length-2} 间可用房</summary>${t.slice(2).map((s,r)=>i(s,r+2)).join("")}</details>`:""}`:Jn("暂无可售房 · 先看房态","hotel")}</div>`}function Vd(n){return`<h2>客人到了</h2>${n.guests.filter(t=>!t.staff&&!t.roomId&&!t.departing).sort((t,i)=>(t.patience??0)-(i.patience??0)).map((t,i)=>{const s=ul(t,`<blockquote>${kn(t.thought)}</blockquote><p>${t.stayLength} 晚 · ${kn(t.tier)}${t.sua?" · SUA 已确认":""}</p>${Hd(n,t)}<details class="manager-card"><summary>客史、等候与其他处理</summary><p>${kn(t.segment)} · 耐心 ${t.patience} 分钟</p><p>拒绝确认预订会产生 ¥600 安置费。</p><button class="game-action" data-action="reject" data-id="${kn(t.id)}">婉拒本次入住</button></details>`);return i===0?s:`<details class="manager-card"><summary>${kn(t.name)} · 等候 ${t.patience} 分钟耐心</summary>${s}</details>`}).join("")||'<p class="empty">暂时没有客人排队，关上面板继续经营。</p>'}`}function $d(n){const e=n.game,t=nr(n);return e.day<=3?ro(n).replace('data-open="brief"','data-reveal="decisions"'):Rt(n,t.breakfast>e.stock?"fnb":"revenue",t.breakfast>e.stock?"早餐预估超过库存":t.occupancy>=90?"今天可能接近满房":"今天还有接客空间",`预计入住 ${t.occupancy}%，早餐 ${t.breakfast} 人 / 库存 ${e.stock} 份。`,t.breakfast>e.stock?"先补货能降低断供风险；每次支出 ¥300。":"先保留现价也可以；高价提高单晚收入，但可能减少临时客流。")}function Wd(n,e){const t=n.entities[e];return t?t.construction?Rt(n,"engineering","这里正在封闭施工",`剩余 ${t.construction.remaining} 游戏分钟。`,"施工完成前无法出售或使用，先处理酒店其他区域。"):t.kind==="room"?t.status==="occupied"?Rt(n,"front","先看这位客人需要什么","优先兑现待办和晚退承诺，再考虑额外服务。","个性化服务 ¥120；特别诉求仍需在待办单独落实。",Jn("处理诉求","events")):t.status==="dirty"?Rt(n,"house","这间房还不能接客","安排翻房，等清洁完成后再分配给新客。","手动清洁 ¥90 / 30 分钟；已有员工接手时可等待。"):t.status==="maintenance"?Rt(n,"engineering","故障房正在损失销售机会","先确认有没有工程员工或维修计时，再决定亲自安排。","手动维修 ¥180；主管到岗后可自动安排常规维修。"):t.status==="unbuilt"?Rt(n,"revenue","先决定这间房要服务谁","普通房控制投入；标准套房能兑现会员升套。","尊享套投入更高，按付费房价出售，不用于标准套免费升级。"):Rt(n,"house","接客，还是暂时停卖升级？","有客人排队时先安排入住，客流空档再考虑装修。","升级提高后续新客房价，但房间要停卖 90 分钟。"):Rt(n,t.role==="lobby"?"front":"fnb",`${t.name} · ${t.usage} / ${t.capacity} 人`,t.usage>=t.capacity?"容量已满，留意排队客人的体验。":"先保证供应和维护，再考虑扩大容量。","升级需要封闭施工；补货和维护可以先解决眼前问题。"):""}const Tn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ao=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),cn=(n,e,t="",i="")=>`<button class="game-action" data-action="${e}" data-id="${Tn(t)}" data-value="${i}">${n}</button>`,nn=(n,e)=>`<div><small>${n}</small><strong>${e}</strong></div>`;function Wl(n){const e=n.game,t=e.operations,i=nr(n),s=t.bookings.length,r=(e.day-1)%7>=5,a=t.bookings.filter(l=>l.status==="confirmed").length,o=[["收益经理",e.managers.revenue,i.occupancy>=90?"预计接近满房，广告可能只带来更多拒客。":"仍有空房，比较低价获客和高价利润。"],["前厅经理",e.managers.front,`${i.suites} 位确认预订的 Globalist；已锁 SUA 必须保留。`],["客房经理",e.managers.house,`今天 ${i.housekeeping} 间预计翻房；员工需推车到场，晚退会挤压时间。`],["餐饮经理",e.managers.fnb,`早餐预计 ${i.breakfast} 人、库存 ${e.stock}；Happy Hour 预计 ${i.club} 人、库存 ${e.clubStock}。`],["工程经理",e.managers.engineering,`${Qe(n).filter(l=>l.status==="maintenance").length} 间封闭房；施工不接待，维修完成才能出售。`]];return`<h2>08:00 · 早班晨会</h2><p>Day ${e.day} · ${r?"周末":"工作日"} · ${e.positioning==="business"?"商务定位":e.positioning==="resort"?"度假定位":"城市混合"} · ${e.weather==="rain"?"有雨":"晴朗"}</p>${$d(n)}<p>${lu[t.event]}</p><details class="manager-card"><summary>需求预测与客源明细</summary><div class="brief-grid">${nn("确认预订 / 待到店",s+" / "+a)}${nn("预计 Walk-in",i.walkins+" 位")}${nn("预计晚间入住率",i.occupancy+"%")}${nn("商务 / 度假 / 团队",i.business+" / "+i.resort+" / "+i.group)}${nn("早餐人数 / 库存",i.breakfast+" / "+e.stock)}${nn("HK 翻房 / 标准套需求",i.housekeeping+" / "+i.suites)}</div></details><details class="manager-card"><summary>经理交班与建议</summary>${o.map(([l,c,u],f)=>`<div class="person-card manager-brief">${dn(["revenue","front","house","fnb","engineering"][f])}<div class="person-body"><b>${l} · ${c?"在岗":"待聘任"}</b><p>${u}</p></div></div>`).join("")}</details><details class="manager-card"><summary>今日决策 · 挂牌 ¥${e.price} / ${t.suitePolicy==="hold"?"留套":"开放销售"} <small>调整 ›</small></summary><div class="decision-line"><span>Walk-in 挂牌 ¥${e.price}<small>¥720 争取客流 · ¥850 提高单晚收入，可能少接客</small></span>${cn("¥720","price","","720")}${cn("¥850","price","","850")}</div><div class="decision-line"><span>套房：${t.suitePolicy==="hold"?"保留一间给会员":"开放销售"}</span>${cn("留一间","suite-policy","","hold")}${cn("开放卖","suite-policy","","sell")}<small>留套照顾会员；开放销售保留付费机会。SUA 锁房始终保留。</small></div><div class="decision-line"><span>早餐 ${e.stock} 份 / 酒廊 ${e.clubStock} 份</span>${cn("早餐 +50 · ¥300","stock","breakfast")}${cn("酒廊 +50 · ¥300","stock","club")}</div><div class="decision-line"><span>${e.development&&e.development.campaignUntil>=e.day?"广告投放中":"广告未投放"}</span>${cn("三日推广 ¥2,200","campaign")}</div></details><details class="manager-card"><summary>报价、拒客与平台规则</summary><small>确认预订的报价已锁定；调价影响未预订客流。预估有波动，无法接待确认预订需支付 ¥600/单安置费；平台订单每晚收取 15% 佣金。</small></details><div class="action-row"><button class="game-action" data-open="bookings">查看预订</button><button class="game-action" data-open="history">客史记录</button></div>${t.briefOpen?'<div class="meeting-footer">'+cn("确认决策 · 开始营业","brief-start")+"</div>":""}`}function Xd(n){const e=n.game.operations;return`<h2>今日预订</h2><div class="brief-grid">${["APP","团单","平台"].map(t=>nn(t,e.bookings.filter(i=>i.source===t).length+" 单")).join("")}</div><p>Walk-in 为额外临时到店，今天已到 ${e.walkinArrivals} 位。</p>${e.bookings.map(t=>{const i=e.profiles[t.profileId];return`<details class="manager-card"><summary class="person-summary">${dn(i)}<span>${Tn(i.name)} · ${t.source} · ${ao(t.eta)}<small>${{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"安置离店"}[t.status]}</small></span></summary><p>${Tn(i.tier)} · ${t.nights} 晚 · 锁定价 ¥${t.rate}${t.sua?" · SUA 锁套":""}</p><p>${t.challenge?"特别关注："+{quiet:"需要安静房间",sua:"已确认标准套房",family:"早餐与加床需求",audit:"服务标准检查"}[t.challenge]:"常规接待"}</p><p>客史 ${i.visits} 次 · 信任 ${i.trust} · ${Tn(i.history.at(-1)?.text??"首次来店")}</p></details>`}).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function qd(n){return`<h2>客史与关系</h2>${Object.values(n.game.operations.profiles).filter(e=>e.visits>0||n.guests.some(t=>t.profileId===e.id)).sort((e,t)=>t.visits-e.visits).map(e=>`<details class="manager-card"><summary class="person-summary">${dn(e)}<span>${Tn(e.name)} · ${Tn(e.tier)}<small>${e.visits} 次入住</small></span></summary><p>信任 ${e.trust} · 累计消费 ¥${Math.round(e.spend)}${e.referredBy?" · 由熟客介绍":""}</p>${e.history.map(t=>`<p>Day ${t.day} · ${Tn(t.text)}</p>`).join("")||"<p>首次入住，等待这次故事。</p>"}</details>`).join("")}<button class="game-action" data-open="brief">返回晨会</button>`}function Yd(n){return n.guests.filter(e=>e.challenge&&!e.challenge.resolved&&!e.departing).map(e=>{const t=e.challenge.kind,i={quiet:["需要安静，不能被施工吵到","施工邻层需换到安静的空房。","落实安静安排"],sua:["SUA 确认的标准套，今天能兑现吗？","入住标准套房后核对权益。","核对已给标准套"],family:["早餐和加床，可以一起安排吗？",`需早餐库存 6 份 · 当前 ${n.game.stock} 份`,"安排家庭服务"],audit:["想确认一下房间和服务流程。","需客房、工程主管在岗，且没有待修客房。","完成巡检"]}[t];return ul(e,`<blockquote>${i[0]}</blockquote>${e.roomId?`<p class="request-condition">${i[1]}</p><div class="choice-grid">${cn(i[2]+" · ¥180","guest-choice",e.id,t==="sua"?"inventory":t==="audit"?"inspect":t)}${cn("欢迎礼 · ¥100","guest-choice",e.id,"gift")}${cn("不作安排","guest-choice",e.id,"decline")}</div><small class="choice-note">欢迎礼不替代诉求；不作安排会影响体验。</small>`:`<p class="request-condition">尚未入住 · 先分房，再落实诉求</p><button class="game-action choice-primary" data-open="front" data-guest="${Tn(e.id)}">为 ${Tn(e.name)} 办理入住 →</button>`}`)}).join("")}function Xl(n){const e=n.game.evening;if(!e)return"<h2>20:00 · 晚间复盘</h2><p>今晚 20:00 与总部一起回看经营与客诉。</p>";const t=i=>"¥"+Math.round(i).toLocaleString("en-US");return`<h2>20:00 · 晚间复盘</h2><p>Day ${e.day} · 截至 ${ao(e.minute)} 的经营快照</p><p class="result-hero">预计日结净额 ${t(e.projectedNet)}</p><details class="manager-card"><summary>经营快照与收入口径</summary><div class="brief-grid">${nn("入住率 / 晨会预估",e.occupancy+"% / "+(e.expected??"—")+"%")}${nn("今日办理入住",e.arrivals+" 位")}${nn("已入账收入",t(e.revenue))}${nn("已支出成本",t(e.expense))}${nn("预计待结房费",t(e.roomRevenue))}${nn("预计日结净额",t(e.projectedNet))}</div><p class="meeting-note">预估包含当前在住房费、平台佣金及日常成本；午夜才结算，后续入住和支出会改变结果。</p></details><details class="manager-card" ><summary>客诉与服务记录 <small>${e.pending} 项待办 · ${e.complaints} 次客诉计数</small></summary><p>以下为今日客诉日志原文，包含请求、处理与结果；多条记录可能属于同一事件。</p>${e.logs.map(i=>`<article class="review-entry"><time>${ao(i.minute)}</time><div>${Tn(i.text)}${i.target?`<button class="game-action" data-entity="${Tn(i.target)}">查看现场 →</button>`:""}</div></article>`).join("")||"<p>今天尚无客诉日志。</p>"}<button class="game-action" data-open="events">处理当前待办 →</button></details><h3>总部 · 今晚优先改进</h3>${e.notes.map(i=>`<div class="person-card manager-brief">${dn("revenue")}<div class="person-body"><strong>${i.title}</strong><p>${i.text}</p><button class="game-action" data-open="${i.target}">去落实 →</button></div></div>`).join("")}${e.open?'<div class="meeting-footer">'+cn("交给夜班 · 继续经营","evening-close")+"</div>":""}`}const Fn=n=>"¥"+Math.round(n).toLocaleString("en-US"),vs=(n,e,t,i)=>`<div class="upgrade-compare"><span>${n}</span><b>${e}${i} → ${t}${i}</b><div><i style="width:${e/Math.max(1,e,t)*100}%"></i><i style="width:${t/Math.max(1,e,t)*100}%"></i></div></div>`;function Kd(n,e){const t=e.level??1;if(t>=5)return"<p>装修已满级</p>";const i=n.game,s={...e,level:t+1},r=du(t),a=vn(i.price,e),o=vn(i.price,s),l=o-a,c=i.reports.at(-1)?.occupancy??100*Object.values(n.entities).filter(d=>d.kind==="room"&&d.status==="occupied").length/Math.max(1,Object.values(n.entities).filter(d=>d.kind==="room").length),u=vn(i.price,s,!0)-vn(i.price,e,!0),f=l*c/100;return`<details class="upgrade-preview"><summary>装修 Lv.${t} → ${t+1} · ${Fn(r)}</summary>${vs("新客每晚房价",a,o," 元")}${St(e)?`<p>会员免费升套价：${Fn(vn(i.price,e,!0))} → ${Fn(vn(i.price,s,!0))}</p>`:""}<p>每售出一晚多收 ${Fn(u)}${u!==l?"–"+Fn(l):""}；约 ${Math.ceil(r/l)}${u!==l?"–"+Math.ceil(r/u):""} 个售出房晚收回装修费。</p><p>按${i.reports.length?"最近一天":"当前"}入住率 ${Math.round(c)}%、${St(e)?"普通付费客":"当前挂牌价"}估算：每天多收 ${Fn(f)}${f>0?"，约 "+Math.ceil(r/f)+" 天回本":"，暂无法估算回本天数"}。</p><small>已确认预订和已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`}function Zd(n,e,t,i){const s=n.game,r=s.managers[e],a=Math.min(3,r+1),o=r?4500*r:3800;let l="",c="";if(e==="front"){const u=n.entities["facility-lobby"],f=(u.kind==="facility"?u.level??1:1)*10;l=vs("新到店住客耐心",100+r*50+f,100+a*50+f," 分钟"),c=r?"自动分房速度不变；延长新客等候耐心，降低等待流失。":"启用自动分房与常规诉求处理；无空房时仍需等待。"}return e==="house"&&(l=vs("每间清洁用时",Oi(r),Oi(a)," 分钟"),c=r?"增加一位客房员工，每间现场清洁少用 "+(Oi(r)-Oi(a))+" 分钟；另需实际走路时间。":"自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。"),e==="engineering"&&(l=vs("常规维修用时",Qs(r),Qs(a)," 分钟"),c=r?"增加一位工程员工，维修费用仍为 ¥100/间；另需到场时间。":"自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。"),e==="fnb"&&(l=vs("采购单价（每 40 份）",r?Vr(r):240,Vr(a)," 元"),c=r?"每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。":"库存低于 20 时安排配送，员工到餐台完成补货才入库；与手动采购每份同价。"),e==="revenue"&&(l=vs("同一需求下自动报价",r?Ka(i,s.level,r):s.price,Ka(i,s.level,a)," 元"),c="次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。"),`<details class="manager-card"><summary class="person-summary">${dn(e)}<span>${t}主管 · ${r?"Lv."+r:"未聘任"}</span><small>${r>=3?"已满级":"查看效果 ›"}</small></summary>${r>=3?"<p>已完成全部培训。</p>":`${l}<p>${c}</p><p>投入 ${Fn(o)} · 工资 ${Fn(r*180)} → ${Fn(a*180)}/天</p><button class="game-action" data-action="${r?"train":"hire"}" data-id="${e}">${r?"培训至 Lv."+a:"聘任主管"} · ${Fn(o)}</button>`}</details>`}const Ut=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),mt=n=>"¥"+Math.round(n).toLocaleString("en-US"),ke=(n,e,t="",i="")=>`<button class="game-action" data-action="${Ut(e)}" data-id="${Ut(t)}" data-value="${Ut(i)}">${Ut(n)}</button>`;function Jd(n,e){const t=kd(),i=Z=>n.querySelector(Z),s=n.querySelector("dialog"),r=i("#sheet-content"),a=i("#sheet-eye");let o="",l="",c="",u="全部",f=()=>{},d=null;const h=Nd,p=()=>h.map(([Z,C])=>`<button data-open="${Z}" data-root-menu="true" aria-label="${C}" aria-pressed="${no(o)===Z}">${io(Z)}<span>${C}</span></button>`).join("");i(".main-nav").innerHTML=p();const x=document.createElement("nav");x.className="sheet-navigation",x.setAttribute("aria-label","管理菜单"),r.before(x);let m=null,g=!1;const w=[],I=new Map,b=()=>{m&&I.set(m.key,{scroll:s.scrollTop,open:[...r.querySelectorAll("details[open]")].map(Z=>Z.querySelector("summary")?.textContent??"")})};i(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',i(".world-caption").textContent="轻点空间 · 处理今天的经营",i(".weather").title="切换日夜预览",i(".property-name small").id="game-time",i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip").removeAttribute("data-focus"),i(".event-strip").setAttribute("data-open","events"),i(".speed-control").insertAdjacentHTML("beforeend",ke("Ⅱ","pause")),i(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(Z=>Z.setAttribute("aria-label",Z.getAttribute("data-speed")+"倍经营速度"));const R=document.createElement("p");R.className="action-feedback",R.setAttribute("role","status"),R.setAttribute("aria-live","polite"),R.hidden=!0,r.before(R);const T=document.createElement("div");T.className="reward-toast",T.setAttribute("role","status"),T.setAttribute("aria-live","polite"),n.append(T);let P=e.getState().game?.rewardBeat?.id;const _=document.createElement("div");_.className="fixed-actions",r.after(_);const A=()=>{R.textContent=e.getState().game.notice,R.hidden=!R.textContent},N=()=>{b(),m=null,w.length=0,o="",l="",e.getState().game.evening?.open&&e.dispatch({type:"evening-close"}),e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),s.close(),e.select(null),d?.focus()},L=()=>{if(e.getState().game.reportOpen){e.dispatch({type:"continue"}),o="brief",K();return}e.getState().game.operations?.briefOpen&&e.dispatch({type:"brief-start"}),N()};let k=!1;const J=(Z,C)=>{const V=s.getBoundingClientRect();return Z<V.left||Z>V.right||C<V.top||C>V.bottom};s.addEventListener("pointerdown",Z=>{k=Z.target===s&&J(Z.clientX,Z.clientY)}),s.addEventListener("click",Z=>{k&&Z.target===s&&J(Z.clientX,Z.clientY)&&L(),k=!1});const Y=(Z,C)=>{const V=o+(o==="entity"?":"+l:"");b(),m&&m.key!==V&&!g&&(w.push(m),w.length>20&&w.shift()),g=!1,m={view:o,selected:l,key:V},a.textContent=Z,i(".main-nav").innerHTML=p(),x.innerHTML=`<div class="menu-tabs">${p()}</div><nav class="module-tabs" aria-label="${h.find(([oe])=>oe===no(o))?.[1]}功能">${Fd(o).map(([oe,re])=>`<button data-open="${oe}" aria-current="${o===oe?"page":"false"}">${re}</button>`).join("")}</nav>${w.length?'<button class="menu-back" data-menu-back="true">‹ 返回上一页 · 保留位置</button>':""}`;const y=C.includes('class="focus-screen"');s.classList.toggle("focus-layout",y),_.innerHTML="",r.innerHTML=(y?"":o==="entity"?Wd(e.getState(),l):Gd(e.getState(),o))+C;const se=r.querySelector(".focus-footer");se&&_.append(se),s.dataset.view=o;const Ee=r.querySelector("h2");Ee&&!y&&r.prepend(Ee),r.querySelectorAll(".room-choice,.room-options section,.room-grid button").forEach(oe=>oe.insertAdjacentHTML("afterbegin",`<span class="room-preview-art">${Ui("hotel")}</span>`)),r.querySelectorAll(".work-item").forEach(oe=>oe.insertAdjacentHTML("afterbegin",`<span class="work-symbol">${io(oe.querySelector('[data-action="clean"]')?"hotel":oe.querySelector('[data-action="stock"]')?"development":"tasks")}</span>`)),r.querySelectorAll('.choice-grid button:first-child,.person-body button[data-action="late"][data-value="honor"],.person-body button[data-action="checkin"]').forEach(oe=>oe.classList.add("decision-primary"));const we=I.get(V);we&&r.querySelectorAll("details").forEach(oe=>oe.open=we.open.includes(oe.querySelector("summary")?.textContent??"")),s.open||(d=document.activeElement,s.showModal()),s.scrollTop=we?.scroll??0},G=Z=>{const C=e.getState(),V=C.entities[Z];if(V){if(V.construction||C.floors.find(y=>y.id===V.floorId)?.construction){const y=V.construction??C.floors.find(se=>se.id===V.floorId).construction;Y("施工现场",`<h2>${V.kind==="room"?V.number:V.name} · 封闭施工</h2><progress max="${y.total}" value="${y.total-y.remaining}"></progress><p>剩余 ${y.remaining} 游戏分钟，竣工后开放。</p>`);return}if(V.kind==="room"&&V.status==="unbuilt"){Y("配置客房 · "+V.number,`<h2>选择房型</h2><p>普通配置已含在楼层造价中；其他房型支付差价。</p><div class="room-options">${Object.entries(ni).map(([y,se])=>`<section><strong>${se.name}</strong><small>新客 ${mt(C.game.price*se.factor)}/晚起 · ${se.cost?mt(se.cost):"已含"}</small><div>${ke("大床","configure-room",Z,y+":king")}${ke("双床","configure-room",Z,y+":twin")}</div></section>`).join("")}</div><small>标准套房可供会员免费升套；尊享套房按付费房价出售。</small>`);return}if(V.kind==="room"){const y=C.guests.find(se=>se.id===V.guestId);Y("HYATT PLACE · "+C.floors.find(se=>se.id===V.floorId)?.label,`<h2>${Ut(V.number)}<span>${Ks(V)} · Lv.${V.level??1}</span></h2><div class="status-chip">${to[V.status]}${V.timer?" · 还需 "+V.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${y?Ut(y.name)+" · "+Ut(y.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${V.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${mt(y?y.rate??C.game.price:vn(C.game.price,V))}</dd></div></dl>${y?"<p>"+Ut(y.name)+(y.goh?" · GOH":"")+(y.sua?" · SUA":"")+"</p><blockquote>"+Ut(y.thought)+"</blockquote>"+(y.serviceDone?"<small>本次住宿已安排专属服务</small>":ke({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[y.persona??"chill"]+" ¥120","guest-service",y.id))+(y.late==="pending"?ke("确认 "+zn(y),"late",y.id,"honor")+ke("协商 "+Wi(y)+":00","late",y.id,"deny"):y.late?"<p>退房时间："+da(su(y))+"</p>":""):""}${V.status==="available"?Kd(C,V):""}<div class="action-row">${V.status==="dirty"?ke("安排清洁 ¥90","clean",Z):""}${V.status==="maintenance"&&!V.timer?ke("安排维修 ¥180","repair",Z):""}${V.status==="available"?ke("分配给住客","front")+((V.level??1)<5?ke("装修 "+mt(2500*(V.level??1)),"upgrade",Z):"")+(St(V)?ke("预留给会员","reserve",Z):""):""}${V.status==="reserved"&&!V.suaBookingId?ke("释放预留","release",Z):""}</div>`)}else Y("HYATT PLACE · 公共空间",`<h2>${Ut(V.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${V.usage} / ${V.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(V.maintenance)}%</dd></div>${["breakfast","club"].includes(V.role)?`<div><dt>库存</dt><dd>${V.role==="club"?C.game.clubStock:C.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${V.role==="lobby"?ke("办理入住","front"):""}${V.role==="breakfast"?ke("补充早餐 ¥300","stock","breakfast"):V.role==="club"?ke("补充酒廊 ¥300","stock","club"):""}${ke("维护设施 ¥200","repair",V.id)}${(V.level??1)<5?ke("公区升级 "+mt(3500*(V.level??1)),"invest",V.id):"已达 Lv.5"}</div>`)}},K=()=>{const Z=e.getState(),C=Z.game;o==="entity"&&(t.room=l,t.floor=Z.entities[l]?.floorId,Z.entities[l]?.kind==="facility"&&(t.facility=l,o="development"));const V=Bd(Z,o,t);if(V){Y("HOTEL MANAGEMENT",V);return}if(o==="room-data"){G(t.room??l);return}if(o==="brief-data"){Y("MORNING DATA",Wl(Z));return}if(o==="evening-data"){Y("EVENING DATA",Xl(Z));return}if(o==="hub"){Y("MANAGEMENT · 经营",Od(Z));return}if(o==="worklist"){Y("ACTION CENTER · 现场事项",`<h2>按轻重缓急处理</h2>${so(Z,Number.MAX_SAFE_INTEGER)}`);return}if(o==="teaching"){Y("DEPARTMENT HEAD · 带教",ro(Z)||"<h2>三日带教已结束</h2><p>各部门仍会根据现场情况给你建议。</p>");return}if(o==="entity"){G(l);return}if(o==="evening"){Y("EVENING REVIEW",Xl(Z));return}if(o==="brief"){Y("MORNING BRIEF",Wl(Z).replace('<details class="manager-card">',so(Z,2)+'<details class="manager-card">'));return}if(o==="bookings"){Y("RESERVATIONS",Xd(Z));return}if(o==="history"){Y("GUEST HISTORY",qd(Z));return}if(o==="front")Y("FRONT OFFICE",Vd(Z));else if(o==="hotel-archive")Y("YOUR HOTEL",`<h2>酒店 · ${Qe(Z).length} 间客房</h2><details class="manager-card"><summary>扩建与投资 · 增加容量</summary><p>扩建花钱并封闭施工 240 分钟；新楼层竣工后需手动设置房型。</p>${ke("加高一层 · 3 个空位 "+mt(1e4+5e3*(Z.floors.filter(y=>y.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div></details><details class="manager-card"><summary>楼层导航</summary><div class="floor-list">${[...Z.floors].reverse().map(y=>`<button data-floor="${y.id}"><b>${y.label}</b><span>${y.name}</span><small>定位楼层 ›</small></button>`).join("")}</div></details><div class="floor-tabs" aria-label="客房楼层">${Z.floors.filter(y=>y.role==="guest").map(y=>`<button class="game-action" data-room-floor="${y.id}" aria-pressed="${(c||Z.floors.find(se=>se.role==="guest")?.id)===y.id}">${y.label}</button>`).join("")}</div><div class="room-grid">${il(Z).filter(y=>y.floorId===(c||Z.floors.find(se=>se.role==="guest")?.id)).map(y=>`<button data-entity="${y.id}">${y.status==="unbuilt"?"＋":y.number}<small>${y.status==="unbuilt"?y.number+" · 设置房型":Ks(y)+" · "+to[y.status]}</small></button>`).join("")}</div>`);else if(o==="operations-data")Y("DEPARTMENT HEADS",`<h2>找主管商量</h2><div class="action-row"><button class="game-action" data-open="brief">安排今天</button><button class="game-action" data-open="evening">回看经营</button><button class="game-action" data-open="development">考虑投资</button></div><details class="manager-card"><summary>餐台备货 · 早餐 ${C.stock} / 酒廊 ${C.clubStock}</summary><p>库存不足先补货，每次增加 50 份，支出 ¥300。</p><div class="action-row">${ke("补早餐 · ¥300","stock","breakfast")}${ke("补酒廊 · ¥300","stock","club")}</div></details><details class="manager-card"><summary>团队授权 · ${Object.values(C.managers).filter(y=>y>0).length} / 5 位主管在岗</summary><p>减少亲自处理的次数，同时承担每日工资。</p>${Object.entries(Za).map(([y,se])=>Zd(Z,y,se,Wr(Z)>1.1?750:590)).join("")}</details><details class="manager-card"><summary>房价与客源 · 当前 ¥${C.price}</summary><p>降价争取 Walk-in，提价增加单晚收益但可能减少客流。</p><div class="action-row">${ke("¥720 · 争取入住","price","","720")}${ke("¥850 · 提高单价","price","","850")}</div><details class="manager-card"><summary>精确定价与酒店定位</summary><label>挂牌价 <input id="price-input" type="number" min="350" max="1800" value="${C.price}"></label>${ke("应用价格","price")}<div class="action-row">${ke("商务","position","","business")}${ke("度假","position","","resort")}${ke("城市混合","position","","urban")}</div></details></details><details class="manager-card"><summary>预订、客史与经营档案</summary><div class="action-row"><button class="game-action" data-open="bookings">今日预订</button><button class="game-action" data-open="history">客史</button>${ke("最近日结","report")}<button class="game-action" data-open="log">运营日志</button>${ke("导出存档","export")}${ke("新开存档","reset")}</div><small>自动保存在当前浏览器。非官方粉丝游戏，与 Hyatt 无隶属关系。</small></details>`);else if(o==="development-data"){const y=C.development;Y("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级增加基础房价的 10%，装修前可查看回本预估。</p><details class="manager-card"><summary>三日营销 · 获客还是浪费？</summary><p>客流 +35%；推广持续到第 ${y?.campaignUntil??0} 天。满房时请谨慎投放。</p>${y&&y.campaignUntil>=C.day?"<small>推广进行中</small>":ke("投放推广 ¥2,200","campaign")}</details><details class="manager-card"><summary>今日主题活动</summary><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${y?.activity?`<blockquote>正在筹备：${$i[y.activity.id].name} · 还需 ${Math.max(0,y.activity.ends-C.day*1440-C.minute)} 分钟</blockquote>`:""}${Object.entries($i).map(([se,Ee])=>`<section class="guest-card"><strong>${Ee.name}</strong><p>${Ee.description} 每人消费 ¥${Ee.fee} 起。</p>${y?.activityDay===C.day?"<small>今日档期已使用</small>":ke("安排 "+mt(Ee.cost),"activity",se)}</section>`).join("")}</details><details class="manager-card"><summary>公共空间投资</summary>${Z.entities["facility-spa"]?"":ke("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(Z.entities).filter(se=>se.kind==="facility").map(se=>`<section class="guest-card"><strong>${Ut(se.name)} · Lv.${se.level??1}</strong><p>容量 ${se.capacity} 人 · 维护 ${Math.round(se.maintenance)}%</p>${(se.level??1)<5?ke("升级 "+mt(3500*(se.level??1)),"invest",se.id):"<small>满级</small>"}</section>`).join("")}</details><button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(o==="score"){const y=xs(Z);Y("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${y.total}%"><strong>${y.total}<small>/ 100</small></strong></div><div><strong>${y.total>=90?"卓越酒店":y.total>=75?"稳健经营":y.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${y.parts.map(se=>`<div class="score-part"><span>${se.name}</span><b>${se.value}</b><progress max="100" value="${se.value}" aria-label="${se.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><details class="manager-card"><summary>最近 7 天评分</summary><div class="revenue-trend">${(C.development?.scores??[]).slice(-7).map(se=>`<div><small>${se.value} 分</small><i style="height:${se.value*.65}px"></i><small>D${se.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div></details><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(o==="tasks-data")Y("MISSIONS",`<h2>今天的目标</h2>${ro(Z)}<p>支线奖金按进度分段到账，完成后领取尾款。单任务上限不变；长期里程碑不会随交班重置。</p>${C.tasks.map(y=>`<section class="guest-card"><strong>${Ut(y.title)}</strong><p>${y.progress} / ${y.goal} · 奖金 ${mt(y.reward)} · 已到账 ${mt(y.paid??0)}</p><progress max="${y.goal}" value="${y.progress}" aria-label="${Ut(y.title)}"></progress>${y.claimed?"<small>已领取</small>":y.progress>=y.goal?ke("领取尾款 "+mt(Math.max(0,y.reward-(y.paid??0))),"claim",y.id):`<button class="game-action" data-open="${y.target}">去完成 ›</button>`}</section>`).join("")}<details class="manager-card"><summary>长期里程碑与奖励</summary><p>持续接待住客、举办活动和建设酒店，解锁长期奖励。</p>${ou(Z).map(y=>`<section class="guest-card"><strong>${y.title}</strong><p>${Math.min(y.progress,y.goal)} / ${y.goal} · ${mt(y.reward)}</p><progress max="${y.goal}" value="${Math.min(y.progress,y.goal)}" aria-label="${y.title}"></progress>${y.claimed?"<small>已领取</small>":y.progress>=y.goal?ke("领取里程碑奖励","claim-career",y.id):"<small>持续经营以解锁</small>"}</section>`).join("")}</details>`);else if(o==="events")Y("DUTY MANAGER",`<h2>待办 · ${Z.guests.filter(y=>y.challenge&&!y.challenge.resolved&&!y.departing).length+C.events.length+Z.guests.filter(y=>y.late==="pending").length}</h2>${Yd(Z)}${Z.guests.filter(y=>y.late==="pending"&&!y.departing).map(y=>ul(y,`<strong class="request-title">${zn(y)} 请求</strong><p>希望${y.checkoutDay===C.day?"今天":"明天"} ${Zs(y)}:00 退房。比 11:00 常规退房晚 ${Zs(y)-11} 小时，之后才可翻房。</p><p class="trade-off">同意：客人更满意，房间晚些可卖。协商：提前翻房，但会影响体验。</p><details class="manager-card"><summary>查看指标影响</summary><p>同意：体验 +4、口碑 +1、业主 -1；协商：体验 -3、口碑 -1、业主 +1。</p></details>${ke("同意 "+zn(y),"late",y.id,"honor")}${ke("协商 "+Wi(y)+":00","late",y.id,"deny")}`)).join("")}${C.events.map(y=>`<section class="guest-card"><strong>${Ut(y.title)}</strong><p>剩余 ${Math.max(0,y.expires-C.day*1440-C.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${y.target}">定位现场</button>${ke("亲自协调 ¥350","resolve",String(y.id),"gm")}${ke("交给主管 ¥150","resolve",String(y.id),"sop")}</div></section>`).join("")||(Z.guests.some(y=>!y.departing&&(y.late==="pending"||y.challenge&&!y.challenge.resolved||y.occasion&&!y.occasion.resolved&&y.roomId))?"":'<p class="empty">目前没有异常，关上面板继续经营。</p>')}${ei(Z).length?`<button class="primary" data-open="front">接待 ${ei(Z).length} 位排队住客</button>`:""}`);else if(o==="log")Y("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(y=>`<button class="${y===u?"active":""}" data-filter="${y}">${y}</button>`).join("")}</div><div class="log-list">${[...C.logs].reverse().filter(y=>u==="全部"||y.category===u).map(y=>`<article><small>Day ${y.day} ${da(y.minute)} · ${y.category}</small><p>${Ut(y.text)}</p>${y.target?`<button data-entity="${Ut(y.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(o==="report-data"){const y=C.reports.at(-1);Y("DAILY REVIEW",y?`<h2>Day ${y.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${y.score??xs(Z).total} / 100 ›</button><p class="result-hero">今日净额 ${mt(y.revenue-y.expense)}</p><details class="manager-card"><summary>收支明细、ADR 与预测对账</summary><dl><div><dt>收入 / 成本</dt><dd>${mt(y.revenue)} / ${mt(y.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${mt(y.adr)} / ${mt(y.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${y.occupancy}% / ${y.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${y.upgrades} / ${y.complaints}</dd></div></dl><h3>晨会预测对账</h3><p>预计晚间入住率 ${y.forecastOccupancy??"—"}% → 实际 ${y.actualEveningOccupancy??"—"}% · 未兑现预订 ${y.bookingsLost??0} 单</p><h3>最近 7 天收入</h3><div class="revenue-trend">${C.reports.slice(-7).map(se=>`<div><small>${mt(se.revenue)}</small><i style="height:${Math.max(3,Math.round(se.revenue/Math.max(1,...C.reports.slice(-7).map(Ee=>Ee.revenue))*65))}px"></i><small>D${se.day}</small></div>`).join("")}</div></details><blockquote>${Ut(y.recommendation)}</blockquote>${C.reportOpen?ke("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("change",Z=>{const C=Z.target;C.id==="hotel-floor-select"&&(c=C.value,K())}),n.addEventListener("click",Z=>{const C=Z.target.closest("button");if(!C)return;if(C.matches(".close-sheet")){L();return}if(C.dataset.focusKey){const oe=C.dataset.focusKey,re=C.dataset.focusValue??"";["roomPage","eventPage","guestPage","taskPage"].includes(oe)?(t[oe]=Math.max(0,Number(re)||0),oe==="eventPage"&&(t.event=void 0),oe==="guestPage"&&(t.guest=void 0,t.roomPage=0)):["floor","room","department","facility","meeting","category","bed","activity"].includes(oe)&&(t[oe]=re,oe==="floor"&&(t.room=void 0,o="hotel"),oe==="room"&&(l=re,o="hotel")),K();return}if(C.dataset.menuBack){const oe=w.pop();oe&&(g=!0,o=oe.view,l=oe.selected,R.hidden=!0,K());return}if(C.dataset.open){if(C.dataset.rootMenu&&(b(),m=null,w.length=0,l=""),o=C.dataset.open,C.dataset.assignRoom&&(t.room=C.dataset.assignRoom,t.roomPage=0),C.dataset.guest&&(t.guest=C.dataset.guest,t.event=C.dataset.guest,t.roomPage=0),R.hidden=!0,K(),C.dataset.guest){const oe=C.dataset.guest,re=document.getElementById("assign-"+oe)??[...r.querySelectorAll("[data-id]")].find(Ve=>Ve.dataset.id===oe);if(re){let Ve=re.parentElement;for(;Ve&&Ve!==r;)Ve instanceof HTMLDetailsElement&&(Ve.open=!0),Ve=Ve.parentElement;re.closest(".person-card")?.scrollIntoView({block:"nearest"}),re.focus({preventScroll:!0})}}return}if(C.dataset.reveal){const oe=[...r.querySelectorAll("details")].find(re=>re.querySelector("summary")?.textContent?.startsWith("今日决策"));oe&&(oe.open=!0,oe.scrollIntoView({block:"start"}));return}if(C.dataset.speed){e.setSpeed(Number(C.dataset.speed));return}if(C.dataset.entity){l=C.dataset.entity;const oe=e.getState().entities[l];oe&&f(oe.floorId),o="entity",e.select(l),K();return}if(C.dataset.floor){const oe=C.dataset.floor;N(),e.focusFloor(oe),f(oe);return}if(C.dataset.roomFloor){c=C.dataset.roomFloor,K();return}if(C.dataset.filter){u=C.dataset.filter,K();return}if(C.matches(".weather")){const oe=["dusk","night","day"];e.setAtmosphere(oe[(oe.indexOf(e.getState().atmosphere)+1)%3]);return}const V=C.dataset.action;if(!V)return;if(["front","report"].includes(V)){o=V,K();return}if(V==="reset"){document.dispatchEvent(new Event("new-game"));return}if(V==="export"){const oe=document.createElement("a");oe.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),oe.download="jinwan-v8-save.json",oe.click(),setTimeout(()=>URL.revokeObjectURL(oe.href),500);return}const y={type:V,id:C.dataset.id,value:C.dataset.value};V==="checkin"&&(y.roomId=C.dataset.room),V==="price"&&(y.value=C.dataset.value||Number(n.querySelector("#price-input")?.value)),V==="position"&&(y.value=C.dataset.value||n.querySelector("#position-input")?.value);const se=[...r.querySelectorAll("details[open]")].map(oe=>oe.querySelector("summary")?.textContent),Ee=o,we=e.getState().game.upgradeEffect?.id;if(e.dispatch(y),e.getState().game.upgradeEffect?.id!==we){const oe=e.getState().game.upgradeEffect.entityId;N(),f(e.getState().entities[oe].floorId);return}V==="brief-start"||V==="evening-close"?N():V==="continue"?(o="brief",K()):o&&(V==="checkin"&&e.getState().guests.find(oe=>oe.id===y.id)?.roomId&&e.getState().guests.find(oe=>oe.id===y.id)&&(e.getState().guests.find(oe=>oe.id===y.id)?.challenge||e.getState().guests.find(oe=>oe.id===y.id)?.occasion)&&(o="events",s.scrollTop=0),K(),o===Ee&&r.querySelectorAll("details").forEach(oe=>{se.includes(oe.querySelector("summary")?.textContent)&&(oe.open=!0)}),A())}),s.addEventListener("cancel",Z=>{Z.preventDefault(),L()});let X=null,ne="",ae="",de=0,ve=0,ye=0,qe="";const ut=()=>{const Z=e.getState(),C=Z.game;i(".score-button").innerHTML=`<i style="--score:${xs(Z).total}%"></i> ${xs(Z).total} 分 ›`,i("#cash").textContent=mt(Z.metrics.cash),i("#reputation").textContent=String(Z.metrics.reputation),i("#owner").textContent=String(Z.metrics.owner),i("#suite-count").textContent=eu(Z)+" 间",i("#game-time").textContent=`${pu(C.day)} · Day ${C.day} ${da(C.minute)}${C.paused?" · 暂停":""}`,i(".today-hint span:nth-child(2)").textContent=C.tasks.find(re=>!re.claimed)?.title??"今日任务全部完成",i("#task-count").textContent=C.tasks.filter(re=>re.claimed).length+"/"+C.tasks.length,i("#occupancy").textContent=`${tu(Z)}/${Qe(Z).length} 在住 · 收入 ${mt(C.revenue)}`;const V=gu(Z),y=V.find(re=>!re.done);y?(i(".today-hint span:nth-child(2)").textContent="Day "+C.day+" · "+y.title,i("#task-count").textContent=V.filter(re=>re.done).length+"/3",i(".today-hint").setAttribute("data-open","teaching")):i(".today-hint").setAttribute("data-open","tasks");const se=Mi(Z),Ee=C.campaign;se&&(i(".today-hint").setAttribute("data-open","tasks"),i(".today-hint span:nth-child(2)").textContent=Ee?.result?Ee.result.passed?"检验通过 · 开启下一阶段":"检验待改善 · 免费重约":Ee?.inspection?Ee.inspection.phase==="visiting"?"现场体验中 · 等待回访":se.exam+" · 已预约":se.ready?"目标达成 · 预约"+se.exam:se.action,i("#task-count").textContent=se.progress+"/"+se.goal);const we=JSON.stringify([Ee?.chapter,se?.progress,Ee?.result,Ee?.inspection?.phase,Ee?.inspection?.prepared,Math.ceil(((Ee?.inspection?.due??0)-C.day*1440-C.minute)/10)]);o==="tasks"&&s.open&&qe!==we&&K(),qe=we,C.rewardBeat&&C.rewardBeat.id!==P&&(P=C.rewardBeat.id,T.textContent="＋"+mt(C.rewardBeat.amount)+" · "+C.rewardBeat.text,T.classList.remove("show"),T.offsetWidth,T.classList.add("show")),i(".event-strip span").textContent=(Z.guests.some(re=>re.occasion&&!re.occasion.resolved&&!re.departing&&re.roomId)?"住客今天过生日 · 礼遇待决定":void 0)??(Z.guests.some(re=>re.challenge&&!re.challenge.resolved&&!re.departing)?"特别住客需要你的判断":void 0)??(Z.guests.some(re=>re.late==="pending"&&!re.departing)?"会员晚退请求待你确认":void 0)??C.events[0]?.title??(ei(Z).length?`${ei(Z).length} 位住客等待办理入住`:"酒店运营平稳"),i(".event-strip b").textContent=C.events.length||Z.guests.some(re=>(re.late==="pending"||re.challenge&&!re.challenge.resolved||re.occasion&&!re.occasion.resolved&&re.roomId)&&!re.departing)?"处理 ›":"前台 ›",i(".event-strip").setAttribute("data-open",C.events.length||Z.guests.some(re=>(re.late==="pending"||re.challenge&&!re.challenge.resolved||re.occasion&&!re.occasion.resolved&&re.roomId)&&!re.departing)?"events":"front"),i(".review-strip span").textContent=C.notice,i(".weather span").textContent=C.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(re=>{re.classList.toggle("active",Number(re.dataset.speed)===Z.speed),re.setAttribute("aria-pressed",String(Number(re.dataset.speed)===Z.speed))});const oe=Z.floors.map(re=>re.id).join(",");ne!==oe&&(ne=oe,i(".floor-rail").innerHTML=[...Z.floors].reverse().map(re=>`<button data-floor="${re.id}" aria-label="前往${re.label} ${re.name}">${re.label}</button>`).join("")),Z.selectedId&&Z.selectedId!==X&&(l=Z.selectedId,o="entity",K()),X=Z.selectedId,C.operations?.briefOpen&&ve!==C.day&&(ve=C.day,o="brief",K()),C.evening?.open&&ye!==C.evening.day&&(ye=C.evening.day,o="evening",K(),s.scrollTop=0),C.reportOpen&&de!==C.day&&(de=C.day,o="report",K()),ae!==C.notice&&(ae=C.notice,s.open&&A())};return e.subscribe(ut),ut(),{stage:i(".world-stage"),setFocusHandler:Z=>{f=Z},showError:Z=>Y("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${Ut(Z)}</p>`)}}function Qd(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return Jd(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),s=n.querySelector("#sheet-eye");let r="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),r="",a?.focus()},c=(p,x)=>{s.textContent=p,i.innerHTML=x,t.open||(a=document.activeElement,t.showModal())},u=p=>{const x=e.getState(),m=x.entities[p];if(!m)return;const g=kl(x,p);if(m.kind==="room"){const w=x.guests.find(I=>I.id===m.guestId);c("HYATT PLACE · "+g.label,`<h2>${m.number}<span>${m.type==="suite"?"开放式套房":m.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${m.status}">${to[m.status]}</div><dl><div><dt>住客</dt><dd>${w?w.name+" · "+w.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${m.nightsLeft?m.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${g.label} · ${g.name}</dd></div></dl>${w?"<blockquote>“"+w.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${g.id}">回到 ${m.number} 的楼层</button>`)}else{const w={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+g.label,`<h2>${m.name}</h2><p>${w[m.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${m.usage} / ${m.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${m.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${m.quality} / ${m.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${g.id}">回到${m.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const p=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...p.floors].reverse().map(x=>`<button data-return="${x.id}"><b>${x.label}</b><span>${x.name}</span><small>${x.entityIds.length>1?x.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const p=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([x,m,g])=>`<button data-focus="${x}"><b>${p.visited.includes(x)?"✓":"○"}</b><span>${m}<small>${g}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const p=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(p.visited.length?[...p.visited].reverse().map(x=>{const m=p.entities[x];return`<button data-focus="${x}"><span>${m.kind==="room"?m.number+" 房间":m.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",p=>{const x=p.target.closest("button");if(x){if(x.matches(".close-sheet")&&l(),x.dataset.open&&(e.select(null),r=x.dataset.open,f[r]?.()),x.dataset.speed&&e.setSpeed(Number(x.dataset.speed)),x.dataset.return){const m=x.dataset.return;l(),e.focusFloor(m),o(m)}if(x.dataset.focus){const m=x.dataset.focus,g=kl(e.getState(),m);l(),g&&(e.focusFloor(g.id),o(g.id)),e.select(m)}if(x.dataset.floor&&(e.focusFloor(x.dataset.floor),o(x.dataset.floor)),x.dataset.atmosphere&&(e.setAtmosphere(x.dataset.atmosphere),l()),x.matches(".weather")){const m=["dusk","night","day"];e.setAtmosphere(m[(m.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",p=>{p.preventDefault(),l()}),t.addEventListener("click",p=>{if(p.target===t){const x=t.getBoundingClientRect();(p.clientX<x.left||p.clientX>x.right||p.clientY<x.top||p.clientY>x.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(p=>`<button data-floor="${p.id}" aria-label="前往${p.label} ${p.name}">${p.label}</button>`).join("");let d=null;const h=p=>{n.querySelector("#cash").textContent="¥"+p.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(p.metrics.reputation),n.querySelector("#owner").textContent=String(p.metrics.owner),n.querySelector("#suite-count").textContent=eu(p)+" 间",n.querySelector("#occupancy").textContent=`${Qe(p).length} 间客房 · ${tu(p)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(x=>p.visited.includes(x)).length+"/3",n.querySelectorAll("[data-speed]").forEach(x=>{x.classList.toggle("active",Number(x.dataset.speed)===p.speed),x.setAttribute("aria-pressed",String(Number(x.dataset.speed)===p.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[p.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[p.atmosphere],n.querySelectorAll("[data-floor]").forEach(x=>x.classList.toggle("active",x.dataset.floor===p.focusedFloorId)),p.selectedId&&p.selectedId!==d&&(r="entity",u(p.selectedId)),d=p.selectedId};return e.subscribe(h),h(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:p=>{o=p},showError:p=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+p+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dl="185",jd=0,ql=1,ef=2,Or=1,vu=2,$s=3,Ai=0,Qt=1,Qn=2,ii=0,bs=1,Yl=2,Kl=3,Zl=4,tf=5,Ni=100,nf=101,sf=102,rf=103,af=104,of=200,lf=201,cf=202,uf=203,oo=204,lo=205,df=206,ff=207,hf=208,pf=209,mf=210,gf=211,vf=212,_f=213,xf=214,co=0,uo=1,fo=2,Es=3,ho=4,po=5,mo=6,go=7,_u=0,Mf=1,bf=2,Gn=0,xu=1,Mu=2,bu=3,fl=4,yu=5,Su=6,Eu=7,Tu=300,Xi=301,Ts=302,ha=303,pa=304,ta=306,Xr=1e3,ti=1001,vo=1002,Ot=1003,yf=1004,hr=1005,Ht=1006,ma=1007,zi=1008,sn=1009,Au=1010,wu=1011,js=1012,hl=1013,Vn=1014,yn=1015,ri=1016,pl=1017,ml=1018,er=1020,Ru=35902,Cu=35899,Pu=1021,Iu=1022,Sn=1023,ai=1026,Gi=1027,gl=1028,vl=1029,qi=1030,_l=1031,xl=1033,kr=33776,Br=33777,zr=33778,Gr=33779,_o=35840,xo=35841,Mo=35842,bo=35843,yo=36196,So=37492,Eo=37496,To=37488,Ao=37489,qr=37490,wo=37491,Ro=37808,Co=37809,Po=37810,Io=37811,Lo=37812,Do=37813,Uo=37814,No=37815,Fo=37816,Oo=37817,ko=37818,Bo=37819,zo=37820,Go=37821,Ho=36492,Vo=36494,$o=36495,Wo=36283,Xo=36284,Yr=36285,qo=36286,Sf=3200,Yo=0,Ef=1,yi="",Zt="srgb",Kr="srgb-linear",Zr="linear",it="srgb",es=7680,Jl=519,Tf=512,Af=513,wf=514,Ml=515,Rf=516,Cf=517,bl=518,Pf=519,Ql=35044,jl="300 es",Bn=2e3,tr=2001;function If(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Jr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lf(){const n=Jr("canvas");return n.style.display="block",n}const ec={};function tc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Lu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ue(...n){n=Lu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ye(...n){n=Lu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ys(...n){const e=n.join(" ");e in ec||(ec[e]=!0,Ue(...n))}function Df(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Uf={[co]:uo,[fo]:mo,[ho]:go,[Es]:po,[uo]:co,[mo]:fo,[go]:ho,[po]:Es};class Ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ga=Math.PI/180,Ko=180/Math.PI;function ir(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function Nf(n,e){return(n%e+e)%e}function va(n,e,t){return(1-t)*n+t*e}function Us(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class $e{static{$e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ps{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],d=r[a+0],h=r[a+1],p=r[a+2],x=r[a+3];if(f!==x||l!==d||c!==h||u!==p){let m=l*d+c*h+u*p+f*x;m<0&&(d=-d,h=-h,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){const w=Math.acos(m),I=Math.sin(w);g=Math.sin(g*w)/I,o=Math.sin(o*w)/I,l=l*g+d*o,c=c*g+h*o,u=u*g+p*o,f=f*g+x*o}else{l=l*g+d*o,c=c*g+h*o,u=u*g+p*o,f=f*g+x*o;const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],d=r[a+1],h=r[a+2],p=r[a+3];return e[t]=o*p+u*f+l*h-c*d,e[t+1]=l*p+u*d+c*f-o*h,e[t+2]=c*p+u*h+o*d-l*f,e[t+3]=u*p-o*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),d=l(i/2),h=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"YXZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"ZXY":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"ZYX":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"YZX":this._x=d*u*f+c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f-d*h*p;break;case"XZY":this._x=d*u*f-c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f+d*h*p;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(a-s)*h}else if(i>o&&i>f){const h=2*Math.sqrt(1+i-o-f);this._w=(u-l)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+c)/h}else if(o>f){const h=2*Math.sqrt(1+o-i-f);this._w=(r-c)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-i-o);this._w=(a-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{static{z.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _a.copy(this).projectOnVector(e),this.sub(_a)}reflect(e){return this.sub(_a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _a=new z,nc=new Ps;class Ne{static{Ne.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],h=i[5],p=i[8],x=s[0],m=s[3],g=s[6],w=s[1],I=s[4],b=s[7],R=s[2],T=s[5],P=s[8];return r[0]=a*x+o*w+l*R,r[3]=a*m+o*I+l*T,r[6]=a*g+o*b+l*P,r[1]=c*x+u*w+f*R,r[4]=c*m+u*I+f*T,r[7]=c*g+u*b+f*P,r[2]=d*x+h*w+p*R,r[5]=d*m+h*I+p*T,r[8]=d*g+h*b+p*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*r,h=c*r-a*l,p=t*f+i*d+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=f*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=h*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xa.makeScale(e,t)),this}rotate(e){return ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xa.makeRotation(-e)),this}translate(e,t){return ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xa=new Ne,ic=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sc=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ff(){const n={enabled:!0,workingColorSpace:Kr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===yi?Zr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Kr]:{primaries:e,whitePoint:i,transfer:Zr,toXYZ:ic,fromXYZ:sc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:ic,fromXYZ:sc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),n}const We=Ff();function si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class Of{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ts===void 0&&(ts=Jr("canvas")),ts.width=e.width,ts.height=e.height;const s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Jr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(si(t[i]/255)*255):t[i]=si(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kf=0;class yl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=ir(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ma(s[a].image)):r.push(Ma(s[a]))}else r=Ma(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ma(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Of.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Bf=0;const ba=new z;class Xt extends Ki{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,i=ti,s=ti,r=Ht,a=zi,o=Sn,l=sn,c=Xt.DEFAULT_ANISOTROPY,u=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=ir(),this.name="",this.source=new yl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ba).x}get height(){return this.source.getSize(ba).y}get depth(){return this.source.getSize(ba).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xr:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xr:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Tu;Xt.DEFAULT_ANISOTROPY=1;class dt{static{dt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const I=(c+1)/2,b=(h+1)/2,R=(g+1)/2,T=(u+d)/4,P=(f+x)/4,_=(p+m)/4;return I>b&&I>R?I<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(I),s=T/i,r=P/i):b>R?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=T/s,r=_/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=P/r,s=_/r),this.set(i,s,r,t),this}let w=Math.sqrt((m-p)*(m-p)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(w)<.001&&(w=1),this.x=(m-p)/w,this.y=(f-x)/w,this.z=(d-u)/w,this.w=Math.acos((c+h+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zf extends Ki{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Xt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ht,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new yl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends zf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Du extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gf extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ot{static{ot.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,f,d,h,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,f,d,h,p,x,m)}set(e,t,i,s,r,a,o,l,c,u,f,d,h,p,x,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=d,g[3]=h,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=h+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+h*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d+x*o,t[4]=p*o-h,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d-x*o,t[4]=-a*f,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=p*c-h,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=h*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-d*f,t[8]=p*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*f+p,t[10]=d-x*f}else if(e.order==="XZY"){const d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=a*u,t[9]=h*f-p,t[2]=p*f-h,t[6]=o*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hf,e,Vf)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),pi.crossVectors(i,en),pi.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),pi.crossVectors(i,en)),pi.normalize(),pr.crossVectors(en,pi),s[0]=pi.x,s[4]=pr.x,s[8]=en.x,s[1]=pi.y,s[5]=pr.y,s[9]=en.y,s[2]=pi.z,s[6]=pr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],h=i[13],p=i[2],x=i[6],m=i[10],g=i[14],w=i[3],I=i[7],b=i[11],R=i[15],T=s[0],P=s[4],_=s[8],A=s[12],N=s[1],L=s[5],k=s[9],J=s[13],Y=s[2],G=s[6],K=s[10],X=s[14],ne=s[3],ae=s[7],de=s[11],ve=s[15];return r[0]=a*T+o*N+l*Y+c*ne,r[4]=a*P+o*L+l*G+c*ae,r[8]=a*_+o*k+l*K+c*de,r[12]=a*A+o*J+l*X+c*ve,r[1]=u*T+f*N+d*Y+h*ne,r[5]=u*P+f*L+d*G+h*ae,r[9]=u*_+f*k+d*K+h*de,r[13]=u*A+f*J+d*X+h*ve,r[2]=p*T+x*N+m*Y+g*ne,r[6]=p*P+x*L+m*G+g*ae,r[10]=p*_+x*k+m*K+g*de,r[14]=p*A+x*J+m*X+g*ve,r[3]=w*T+I*N+b*Y+R*ne,r[7]=w*P+I*L+b*G+R*ae,r[11]=w*_+I*k+b*K+R*de,r[15]=w*A+I*J+b*X+R*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],p=e[3],x=e[7],m=e[11],g=e[15],w=l*h-c*d,I=o*h-c*f,b=o*d-l*f,R=a*h-c*u,T=a*d-l*u,P=a*f-o*u;return t*(x*w-m*I+g*b)-i*(p*w-m*R+g*T)+s*(p*I-x*R+g*P)-r*(p*b-x*T+m*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],p=e[12],x=e[13],m=e[14],g=e[15],w=t*o-i*a,I=t*l-s*a,b=t*c-r*a,R=i*l-s*o,T=i*c-r*o,P=s*c-r*l,_=u*x-f*p,A=u*m-d*p,N=u*g-h*p,L=f*m-d*x,k=f*g-h*x,J=d*g-h*m,Y=w*J-I*k+b*L+R*N-T*A+P*_;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/Y;return e[0]=(o*J-l*k+c*L)*G,e[1]=(s*k-i*J-r*L)*G,e[2]=(x*P-m*T+g*R)*G,e[3]=(d*T-f*P-h*R)*G,e[4]=(l*N-a*J-c*A)*G,e[5]=(t*J-s*N+r*A)*G,e[6]=(m*b-p*P-g*I)*G,e[7]=(u*P-d*b+h*I)*G,e[8]=(a*k-o*N+c*_)*G,e[9]=(i*N-t*k-r*_)*G,e[10]=(p*T-x*b+g*w)*G,e[11]=(f*b-u*T-h*w)*G,e[12]=(o*A-a*L-l*_)*G,e[13]=(t*L-i*A+s*_)*G,e[14]=(x*I-p*R-m*w)*G,e[15]=(u*R-f*I+d*w)*G,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,d=r*c,h=r*u,p=r*f,x=a*u,m=a*f,g=o*f,w=l*c,I=l*u,b=l*f,R=i.x,T=i.y,P=i.z;return s[0]=(1-(x+g))*R,s[1]=(h+b)*R,s[2]=(p-I)*R,s[3]=0,s[4]=(h-b)*T,s[5]=(1-(d+g))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(p+I)*P,s[9]=(m-w)*P,s[10]=(1-(d+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ns.set(s[0],s[1],s[2]).length();const o=ns.set(s[4],s[5],s[6]).length(),l=ns.set(s[8],s[9],s[10]).length();r<0&&(a=-a),hn.copy(this);const c=1/a,u=1/o,f=1/l;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=f,hn.elements[9]*=f,hn.elements[10]*=f,t.setFromRotationMatrix(hn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Bn,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===Bn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===tr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Bn,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),h=-(i+s)/(i-s);let p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===Bn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===tr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ns=new z,hn=new ot,Hf=new z(0,0,0),Vf=new z(1,1,1),pi=new z,pr=new z,en=new z,rc=new ot,ac=new Ps;class wi{constructor(e=0,t=0,i=0,s=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ac.setFromEuler(this),this.setFromQuaternion(ac,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Sl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $f=0;const oc=new z,is=new Ps,Wn=new ot,mr=new z,Ns=new z,Wf=new z,Xf=new Ps,lc=new z(1,0,0),cc=new z(0,1,0),uc=new z(0,0,1),dc={type:"added"},qf={type:"removed"},ss={type:"childadded",child:null},ya={type:"childremoved",child:null};class kt extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new z,t=new wi,i=new Ps,s=new z(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ne}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(lc,e)}rotateY(e){return this.rotateOnAxis(cc,e)}rotateZ(e){return this.rotateOnAxis(uc,e)}translateOnAxis(e,t){return oc.copy(e).applyQuaternion(this.quaternion),this.position.add(oc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lc,e)}translateY(e){return this.translateOnAxis(cc,e)}translateZ(e){return this.translateOnAxis(uc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?mr.copy(e):mr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Ns,mr,this.up):Wn.lookAt(mr,Ns,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Wn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dc),ss.child=e,this.dispatchEvent(ss),ss.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qf),ya.child=e,this.dispatchEvent(ya),ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dc),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,Wf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Xf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}kt.DEFAULT_UP=new z(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Vt extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yf={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,p=.005;c.inputState.pinching&&d>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Vt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},gr={h:0,s:0,l:0};function Ea(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ke{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=We.workingColorSpace){if(e=Nf(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ea(a,r,e+1/3),this.g=Ea(a,r,e),this.b=Ea(a,r,e-1/3)}return We.colorSpaceToWorking(this,s),this}setStyle(e,t=Zt){function i(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const i=Uu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return We.workingToColorSpace(Gt.copy(this),e),Math.round(Xe(Gt.r*255,0,255))*65536+Math.round(Xe(Gt.g*255,0,255))*256+Math.round(Xe(Gt.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,s=Gt.g,r=Gt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Zt){We.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,s=Gt.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(gr);const i=va(mi.h,gr.h,t),s=va(mi.s,gr.s,t),r=va(mi.l,gr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ke;Ke.NAMES=Uu;class Kf extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const pn=new z,Xn=new z,Ta=new z,qn=new z,rs=new z,as=new z,fc=new z,Aa=new z,wa=new z,Ra=new z,Ca=new dt,Pa=new dt,Ia=new dt;class Mn{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),pn.subVectors(e,t),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){pn.subVectors(s,t),Xn.subVectors(i,t),Ta.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(Xn),l=pn.dot(Ta),c=Xn.dot(Xn),u=Xn.dot(Ta),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,h=(c*l-o*u)*d,p=(a*u-o*l)*d;return r.set(1-h-p,p,h)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ca.setScalar(0),Pa.setScalar(0),Ia.setScalar(0),Ca.fromBufferAttribute(e,t),Pa.fromBufferAttribute(e,i),Ia.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ca,r.x),a.addScaledVector(Pa,r.y),a.addScaledVector(Ia,r.z),a}static isFrontFacing(e,t,i,s){return pn.subVectors(i,t),Xn.subVectors(e,t),pn.cross(Xn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),pn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;rs.subVectors(s,i),as.subVectors(r,i),Aa.subVectors(e,i);const l=rs.dot(Aa),c=as.dot(Aa);if(l<=0&&c<=0)return t.copy(i);wa.subVectors(e,s);const u=rs.dot(wa),f=as.dot(wa);if(u>=0&&f<=u)return t.copy(s);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(rs,a);Ra.subVectors(e,r);const h=rs.dot(Ra),p=as.dot(Ra);if(p>=0&&h<=p)return t.copy(r);const x=h*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(as,o);const m=u*p-h*f;if(m<=0&&f-u>=0&&h-p>=0)return fc.subVectors(r,s),o=(f-u)/(f-u+(h-p)),t.copy(s).addScaledVector(fc,o);const g=1/(m+x+d);return a=x*g,o=d*g,t.copy(i).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Zi{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(r,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vr.copy(i.boundingBox)),vr.applyMatrix4(e.matrixWorld),this.union(vr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),_r.subVectors(this.max,Fs),os.subVectors(e.a,Fs),ls.subVectors(e.b,Fs),cs.subVectors(e.c,Fs),gi.subVectors(ls,os),vi.subVectors(cs,ls),Ci.subVectors(os,cs);let t=[0,-gi.z,gi.y,0,-vi.z,vi.y,0,-Ci.z,Ci.y,gi.z,0,-gi.x,vi.z,0,-vi.x,Ci.z,0,-Ci.x,-gi.y,gi.x,0,-vi.y,vi.x,0,-Ci.y,Ci.x,0];return!La(t,os,ls,cs,_r)||(t=[1,0,0,0,1,0,0,0,1],!La(t,os,ls,cs,_r))?!1:(xr.crossVectors(gi,vi),t=[xr.x,xr.y,xr.z],La(t,os,ls,cs,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new z,new z,new z,new z,new z,new z,new z,new z],mn=new z,vr=new Zi,os=new z,ls=new z,cs=new z,gi=new z,vi=new z,Ci=new z,Fs=new z,_r=new z,xr=new z,Pi=new z;function La(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Pi.fromArray(n,r);const o=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),u=i.dot(Pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const yt=new z,Mr=new $e;let Zf=0;class An extends Ki{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ql,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Mr.fromBufferAttribute(this,t),Mr.applyMatrix3(e),this.setXY(t,Mr.x,Mr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Us(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Us(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Us(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Us(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Us(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ql&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Nu extends An{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Fu extends An{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class qt extends An{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Jf=new Zi,Os=new z,Da=new z;class sr{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Jf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Os.subVectors(e,this.center);const t=Os.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Os,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Da.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Os.copy(e.center).add(Da)),this.expandByPoint(Os.copy(e.center).sub(Da))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Qf=0;const an=new ot,Ua=new kt,us=new z,tn=new Zi,ks=new Zi,Dt=new z;class wn extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(If(e)?Fu:Nu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ne().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return Ua.lookAt(e),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(tn.min,ks.min),tn.expandByPoint(Dt),Dt.addVectors(tn.max,ks.max),tn.expandByPoint(Dt)):(tn.expandByPoint(ks.min),tn.expandByPoint(ks.max))}tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(us.fromBufferAttribute(e,c),Dt.add(us)),s=Math.max(s,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new An(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new z,l[_]=new z;const c=new z,u=new z,f=new z,d=new $e,h=new $e,p=new $e,x=new z,m=new z;function g(_,A,N){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,N),d.fromBufferAttribute(r,_),h.fromBufferAttribute(r,A),p.fromBufferAttribute(r,N),u.sub(c),f.sub(c),h.sub(d),p.sub(d);const L=1/(h.x*p.y-p.x*h.y);isFinite(L)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(f,-h.y).multiplyScalar(L),m.copy(f).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(L),o[_].add(x),o[A].add(x),o[N].add(x),l[_].add(m),l[A].add(m),l[N].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let _=0,A=w.length;_<A;++_){const N=w[_],L=N.start,k=N.count;for(let J=L,Y=L+k;J<Y;J+=3)g(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const I=new z,b=new z,R=new z,T=new z;function P(_){R.fromBufferAttribute(s,_),T.copy(R);const A=o[_];I.copy(A),I.sub(R.multiplyScalar(R.dot(A))).normalize(),b.crossVectors(T,A);const L=b.dot(l[_])<0?-1:1;a.setXYZW(_,I.x,I.y,I.z,L)}for(let _=0,A=w.length;_<A;++_){const N=w[_],L=N.start,k=N.count;for(let J=L,Y=L+k;J<Y;J+=3)P(e.getX(J+0)),P(e.getX(J+1)),P(e.getX(J+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const s=new z,r=new z,a=new z,o=new z,l=new z,c=new z,u=new z,f=new z;if(e)for(let d=0,h=e.count;d<h;d+=3){const p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let h=0,p=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?h=l[x]*o.data.stride+o.offset:h=l[x]*u;for(let g=0;g<u;g++)d[p++]=c[h++]}return new An(d,u,f)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=e(d,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let jf=0;class rr extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=ir(),this.name="",this.type="Material",this.blending=bs,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=lo,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==oo&&(i.blendSrc=this.blendSrc),this.blendDst!==lo&&(i.blendDst=this.blendDst),this.blendEquation!==Ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Es&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Kn=new z,Na=new z,br=new z,_i=new z,Fa=new z,yr=new z,Oa=new z;class Ou{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Na.copy(e).add(t).multiplyScalar(.5),br.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Na);const r=e.distanceTo(t)*.5,a=-this.direction.dot(br),o=_i.dot(this.direction),l=-_i.dot(br),c=_i.lengthSq(),u=Math.abs(1-a*a);let f,d,h,p;if(u>0)if(f=a*l-o,d=a*o-l,p=r*u,f>=0)if(d>=-p)if(d<=p){const x=1/u;f*=x,d*=x,h=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d<=-p?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c):d<=p?(f=0,d=Math.min(Math.max(-r,-l),r),h=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Na).addScaledVector(br,d),h}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const i=Kn.dot(this.direction),s=Kn.dot(Kn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,i,s,r){Fa.subVectors(t,e),yr.subVectors(i,e),Oa.crossVectors(Fa,yr);let a=this.direction.dot(Oa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const l=o*this.direction.dot(yr.crossVectors(_i,yr));if(l<0)return null;const c=o*this.direction.dot(Fa.cross(_i));if(c<0||l+c>a)return null;const u=-o*_i.dot(Oa);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ar extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hc=new ot,Ii=new Ou,Sr=new sr,pc=new z,Er=new z,Tr=new z,Ar=new z,ka=new z,wr=new z,mc=new z,Rr=new z;class Nt extends kt{constructor(e=new wn,t=new ar){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(ka.fromBufferAttribute(f,e),a?wr.addScaledVector(ka,u):wr.addScaledVector(ka.sub(t),u))}t.add(wr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(Sr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Sr,pc)===null||Ii.origin.distanceToSquared(pc)>(e.far-e.near)**2))&&(hc.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(hc),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=a[m.materialIndex],w=Math.max(m.start,h.start),I=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let b=w,R=I;b<R;b+=3){const T=o.getX(b),P=o.getX(b+1),_=o.getX(b+2);s=Cr(this,g,e,i,c,u,f,T,P,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){const w=o.getX(m),I=o.getX(m+1),b=o.getX(m+2);s=Cr(this,a,e,i,c,u,f,w,I,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=a[m.materialIndex],w=Math.max(m.start,h.start),I=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let b=w,R=I;b<R;b+=3){const T=b,P=b+1,_=b+2;s=Cr(this,g,e,i,c,u,f,T,P,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){const w=m,I=m+1,b=m+2;s=Cr(this,a,e,i,c,u,f,w,I,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function eh(n,e,t,i,s,r,a,o){let l;if(e.side===Qt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Ai,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:n}}function Cr(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Er),n.getVertexPosition(l,Tr),n.getVertexPosition(c,Ar);const u=eh(n,e,t,i,Er,Tr,Ar,mc);if(u){const f=new z;Mn.getBarycoord(mc,Er,Tr,Ar,f),s&&(u.uv=Mn.getInterpolatedAttribute(s,o,l,c,f,new $e)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,o,l,c,f,new $e)),a&&(u.normal=Mn.getInterpolatedAttribute(a,o,l,c,f,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new z,materialIndex:0};Mn.getNormal(Er,Tr,Ar,d.normal),u.face=d,u.barycoord=f}return u}class El extends Xt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Ot,u=Ot,f,d){super(null,a,o,l,c,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gc extends An{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ds=new ot,vc=new ot,Pr=[],_c=new Zi,th=new ot,Bs=new Nt,zs=new sr;class ku extends Nt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,th)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ds),_c.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(_c)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ds),zs.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(i),e.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),vc.multiplyMatrices(i,ds),Bs.matrixWorld=vc,Bs.raycast(e,Pr);for(let a=0,o=Pr.length;a<o;a++){const l=Pr[a];l.instanceId=r,l.object=this,t.push(l)}Pr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new El(new Float32Array(s*this.count),s,this.count,gl,yn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ba=new z,nh=new z,ih=new Ne;class Di{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ba.subVectors(i,t).cross(nh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Ba),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ih.getNormalMatrix(e),s=this.coplanarPoint(Ba).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new sr,sh=new $e(.5,.5),Ir=new z;class Tl{constructor(e=new Di,t=new Di,i=new Di,s=new Di,r=new Di,a=new Di){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],d=r[6],h=r[7],p=r[8],x=r[9],m=r[10],g=r[11],w=r[12],I=r[13],b=r[14],R=r[15];if(s[0].setComponents(c-a,h-u,g-p,R-w).normalize(),s[1].setComponents(c+a,h+u,g+p,R+w).normalize(),s[2].setComponents(c+o,h+f,g+x,R+I).normalize(),s[3].setComponents(c-o,h-f,g-x,R-I).normalize(),i)s[4].setComponents(l,d,m,b).normalize(),s[5].setComponents(c-l,h-d,g-m,R-b).normalize();else if(s[4].setComponents(c-l,h-d,g-m,R-b).normalize(),t===Bn)s[5].setComponents(c+l,h+d,g+m,R+b).normalize();else if(t===tr)s[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=sh.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ir.x=s.normal.x>0?e.max.x:e.min.x,Ir.y=s.normal.y>0?e.max.y:e.min.y,Ir.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bu extends Xt{constructor(e=[],t=Xi,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class As extends Xt{constructor(e,t,i=Vn,s,r,a,o=Ot,l=Ot,c,u=ai,f=1){if(u!==ai&&u!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class rh extends As{constructor(e,t=Vn,i=Xi,s,r,a=Ot,o=Ot,l,c=ai){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class zu extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Is extends wn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,h=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,s,a,2),p("x","z","y",1,-1,e,i,-t,s,a,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(f,2));function p(x,m,g,w,I,b,R,T,P,_,A){const N=b/P,L=R/_,k=b/2,J=R/2,Y=T/2,G=P+1,K=_+1;let X=0,ne=0;const ae=new z;for(let de=0;de<K;de++){const ve=de*L-J;for(let ye=0;ye<G;ye++){const qe=ye*N-k;ae[x]=qe*w,ae[m]=ve*I,ae[g]=Y,c.push(ae.x,ae.y,ae.z),ae[x]=0,ae[m]=0,ae[g]=T>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(ye/P),f.push(1-de/_),X+=1}}for(let de=0;de<_;de++)for(let ve=0;ve<P;ve++){const ye=d+ve+G*de,qe=d+ve+G*(de+1),ut=d+(ve+1)+G*(de+1),Z=d+(ve+1)+G*de;l.push(ye,qe,Z),l.push(qe,ut,Z),ne+=6}o.addGroup(h,ne,A),h+=ne,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class na extends wn{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],h=[];let p=0;const x=[],m=i/2;let g=0;w(),a===!1&&(e>0&&I(!0),t>0&&I(!1)),this.setIndex(u),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(h,2));function w(){const b=new z,R=new z;let T=0;const P=(t-e)/i;for(let _=0;_<=r;_++){const A=[],N=_/r,L=N*(t-e)+e;for(let k=0;k<=s;k++){const J=k/s,Y=J*l+o,G=Math.sin(Y),K=Math.cos(Y);R.x=L*G,R.y=-N*i+m,R.z=L*K,f.push(R.x,R.y,R.z),b.set(G,P,K).normalize(),d.push(b.x,b.y,b.z),h.push(J,1-N),A.push(p++)}x.push(A)}for(let _=0;_<s;_++)for(let A=0;A<r;A++){const N=x[A][_],L=x[A+1][_],k=x[A+1][_+1],J=x[A][_+1];(e>0||A!==0)&&(u.push(N,L,J),T+=3),(t>0||A!==r-1)&&(u.push(L,k,J),T+=3)}c.addGroup(g,T,0),g+=T}function I(b){const R=p,T=new $e,P=new z;let _=0;const A=b===!0?e:t,N=b===!0?1:-1;for(let k=1;k<=s;k++)f.push(0,m*N,0),d.push(0,N,0),h.push(.5,.5),p++;const L=p;for(let k=0;k<=s;k++){const Y=k/s*l+o,G=Math.cos(Y),K=Math.sin(Y);P.x=A*K,P.y=m*N,P.z=A*G,f.push(P.x,P.y,P.z),d.push(0,N,0),T.x=G*.5+.5,T.y=K*.5*N+.5,h.push(T.x,T.y),p++}for(let k=0;k<s;k++){const J=R+k,Y=L+k;b===!0?u.push(Y,Y+1,J):u.push(Y+1,Y,J),_+=3}c.addGroup(g,_,b===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ia extends na{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ia(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ls extends wn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=e/o,d=t/l,h=[],p=[],x=[],m=[];for(let g=0;g<u;g++){const w=g*d-a;for(let I=0;I<c;I++){const b=I*f-r;p.push(b,-w,0),x.push(0,0,1),m.push(I/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let w=0;w<o;w++){const I=w+c*g,b=w+c*(g+1),R=w+1+c*(g+1),T=w+1+c*g;h.push(I,b,T),h.push(b,R,T)}this.setIndex(h),this.setAttribute("position",new qt(p,3)),this.setAttribute("normal",new qt(x,3)),this.setAttribute("uv",new qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qr extends wn{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new z,d=new z,h=[],p=[],x=[],m=[];for(let g=0;g<=i;g++){const w=[],I=g/i,b=a+I*o,R=e*Math.cos(b),T=Math.sqrt(e*e-R*R);let P=0;g===0&&a===0?P=.5/t:g===i&&l===Math.PI&&(P=-.5/t);for(let _=0;_<=t;_++){const A=_/t,N=s+A*r;f.x=-T*Math.cos(N),f.y=R,f.z=T*Math.sin(N),p.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),m.push(A+P,1-I),w.push(c++)}u.push(w)}for(let g=0;g<i;g++)for(let w=0;w<t;w++){const I=u[g][w+1],b=u[g][w],R=u[g+1][w],T=u[g+1][w+1];(g!==0||a>0)&&h.push(I,b,T),(g!==i-1||l<Math.PI)&&h.push(b,R,T)}this.setIndex(h),this.setAttribute("position",new qt(p,3)),this.setAttribute("normal",new qt(x,3)),this.setAttribute("uv",new qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ws(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(xc(s))s.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(xc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function $t(n){const e={};for(let t=0;t<n.length;t++){const i=ws(n[t]);for(const s in i)e[s]=i[s]}return e}function xc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ah(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const oh={clone:ws,merge:$t};var lh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ch=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lh,this.fragmentShader=ch,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=ah(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(s.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[i].value=new z().fromArray(s.value);break;case"v4":this.uniforms[i].value=new dt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ne().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class uh extends $n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xt extends rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dh extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fh extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Hu extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class hh extends Hu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const za=new ot,Mc=new z,bc=new z;class ph{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tl,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bc),t.updateMatrixWorld(),za.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(za,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===tr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(za)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Lr=new z,Dr=new Ps,Ln=new z;class Vu extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lr,Dr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Dr,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Lr,Dr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Dr,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xi=new z,yc=new $e,Sc=new $e;class xn extends Vu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ko*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ga*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ko*2*Math.atan(Math.tan(ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,yc,Sc),t.subVectors(Sc,yc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ga*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sa extends Vu{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class mh extends ph{constructor(){super(new sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gh extends Hu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new mh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const fs=-90,hs=1;class vh extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new xn(fs,hs,e,t);s.layers=this.layers,this.add(s);const r=new xn(fs,hs,e,t);r.layers=this.layers,this.add(r);const a=new xn(fs,hs,e,t);a.layers=this.layers,this.add(a);const o=new xn(fs,hs,e,t);o.layers=this.layers,this.add(o);const l=new xn(fs,hs,e,t);l.layers=this.layers,this.add(l);const c=new xn(fs,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class _h extends xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ec=new ot;class xh{constructor(e,t,i=0,s=1/0){this.ray=new Ou(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(e,t=!0,i=[]){return Zo(e,this,i,t),i.sort(Tc),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Zo(e[s],this,i,t);return i.sort(Tc),i}}function Tc(n,e){return n.distance-e.distance}function Zo(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Zo(r[a],e,t,!0)}}class $u{static{$u.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function Ac(n,e,t,i){const s=Mh(i);switch(t){case Pu:return n*e;case gl:return n*e/s.components*s.byteLength;case vl:return n*e/s.components*s.byteLength;case qi:return n*e*2/s.components*s.byteLength;case _l:return n*e*2/s.components*s.byteLength;case Iu:return n*e*3/s.components*s.byteLength;case Sn:return n*e*4/s.components*s.byteLength;case xl:return n*e*4/s.components*s.byteLength;case kr:case Br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zr:case Gr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xo:case bo:return Math.max(n,16)*Math.max(e,8)/4;case _o:case Mo:return Math.max(n,8)*Math.max(e,8)/2;case yo:case So:case To:case Ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Eo:case qr:case wo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Co:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Po:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Io:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case No:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ko:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Bo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case zo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Go:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ho:case Vo:case $o:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Wo:case Xo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yr:case qo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Mh(n){switch(n){case sn:case Au:return{byteLength:1,components:1};case js:case wu:case ri:return{byteLength:2,components:1};case pl:case ml:return{byteLength:2,components:4};case Vn:case hl:case yn:return{byteLength:4,components:1};case Ru:case Cu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dl}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wu(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function bh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((h,p)=>h.start-p.start);let d=0;for(let h=1;h<f.length;h++){const p=f[d],x=f[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,f[d]=x)}f.length=d+1;for(let h=0,p=f.length;h<p;h++){const x=f[h];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var yh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sh=`#ifdef USE_ALPHAHASH
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
#endif`,Eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Th=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ah=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
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
#endif`,Ch=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ph=`#ifdef USE_BATCHING
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
#endif`,Ih=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nh=`#ifdef USE_IRIDESCENCE
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
#endif`,Fh=`#ifdef USE_BUMPMAP
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
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Hh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$h=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wh=`#define PI 3.141592653589793
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
} // validated`,Xh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qh=`vec3 transformedNormal = objectNormal;
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
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qh="gl_FragColor = linearToOutputTexel( gl_FragColor );",jh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cp=`#ifdef USE_GRADIENTMAP
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
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xp=`PhysicalMaterial material;
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
#endif`,Mp=`uniform sampler2D dfgLUT;
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
}`,bp=`
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
#endif`,yp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ep=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
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
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wp=`#ifdef USE_NORMALMAP
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
#endif`,Xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,em=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,om=`float getShadowMask() {
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
}`,lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dm=`#ifdef USE_SKINNING
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
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gm=`#ifdef USE_TRANSMISSION
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
#endif`,vm=`#ifdef USE_TRANSMISSION
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sm=`uniform sampler2D t2D;
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`#include <common>
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
}`,Cm=`#if DEPTH_PACKING == 3200
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
}`,Pm=`#define DISTANCE
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
}`,Im=`#define DISTANCE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`uniform float scale;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,Fm=`#include <common>
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
}`,Om=`uniform vec3 diffuse;
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
}`,km=`#define LAMBERT
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
}`,Bm=`#define LAMBERT
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
}`,zm=`#define MATCAP
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
}`,Gm=`#define MATCAP
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
}`,Hm=`#define NORMAL
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
}`,Vm=`#define NORMAL
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
}`,$m=`#define PHONG
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
}`,Wm=`#define PHONG
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define STANDARD
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
}`,Ym=`#define TOON
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
}`,Km=`#define TOON
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
}`,Zm=`uniform float size;
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
}`,Jm=`uniform vec3 diffuse;
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
}`,Qm=`#include <common>
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
}`,jm=`uniform vec3 color;
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
}`,e0=`uniform float rotation;
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
}`,t0=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:yh,alphahash_pars_fragment:Sh,alphamap_fragment:Eh,alphamap_pars_fragment:Th,alphatest_fragment:Ah,alphatest_pars_fragment:wh,aomap_fragment:Rh,aomap_pars_fragment:Ch,batching_pars_vertex:Ph,batching_vertex:Ih,begin_vertex:Lh,beginnormal_vertex:Dh,bsdfs:Uh,iridescence_fragment:Nh,bumpmap_pars_fragment:Fh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Bh,clipping_planes_vertex:zh,color_fragment:Gh,color_pars_fragment:Hh,color_pars_vertex:Vh,color_vertex:$h,common:Wh,cube_uv_reflection_fragment:Xh,defaultnormal_vertex:qh,displacementmap_pars_vertex:Yh,displacementmap_vertex:Kh,emissivemap_fragment:Zh,emissivemap_pars_fragment:Jh,colorspace_fragment:Qh,colorspace_pars_fragment:jh,envmap_fragment:ep,envmap_common_pars_fragment:tp,envmap_pars_fragment:np,envmap_pars_vertex:ip,envmap_physical_pars_fragment:pp,envmap_vertex:sp,fog_vertex:rp,fog_pars_vertex:ap,fog_fragment:op,fog_pars_fragment:lp,gradientmap_pars_fragment:cp,lightmap_pars_fragment:up,lights_lambert_fragment:dp,lights_lambert_pars_fragment:fp,lights_pars_begin:hp,lights_toon_fragment:mp,lights_toon_pars_fragment:gp,lights_phong_fragment:vp,lights_phong_pars_fragment:_p,lights_physical_fragment:xp,lights_physical_pars_fragment:Mp,lights_fragment_begin:bp,lights_fragment_maps:yp,lights_fragment_end:Sp,lightprobes_pars_fragment:Ep,logdepthbuf_fragment:Tp,logdepthbuf_pars_fragment:Ap,logdepthbuf_pars_vertex:wp,logdepthbuf_vertex:Rp,map_fragment:Cp,map_pars_fragment:Pp,map_particle_fragment:Ip,map_particle_pars_fragment:Lp,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Up,morphinstance_vertex:Np,morphcolor_vertex:Fp,morphnormal_vertex:Op,morphtarget_pars_vertex:kp,morphtarget_vertex:Bp,normal_fragment_begin:zp,normal_fragment_maps:Gp,normal_pars_fragment:Hp,normal_pars_vertex:Vp,normal_vertex:$p,normalmap_pars_fragment:Wp,clearcoat_normal_fragment_begin:Xp,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:Yp,iridescence_pars_fragment:Kp,opaque_fragment:Zp,packing:Jp,premultiplied_alpha_fragment:Qp,project_vertex:jp,dithering_fragment:em,dithering_pars_fragment:tm,roughnessmap_fragment:nm,roughnessmap_pars_fragment:im,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:rm,shadowmap_vertex:am,shadowmask_pars_fragment:om,skinbase_vertex:lm,skinning_pars_vertex:cm,skinning_vertex:um,skinnormal_vertex:dm,specularmap_fragment:fm,specularmap_pars_fragment:hm,tonemapping_fragment:pm,tonemapping_pars_fragment:mm,transmission_fragment:gm,transmission_pars_fragment:vm,uv_pars_fragment:_m,uv_pars_vertex:xm,uv_vertex:Mm,worldpos_vertex:bm,background_vert:ym,background_frag:Sm,backgroundCube_vert:Em,backgroundCube_frag:Tm,cube_vert:Am,cube_frag:wm,depth_vert:Rm,depth_frag:Cm,distance_vert:Pm,distance_frag:Im,equirect_vert:Lm,equirect_frag:Dm,linedashed_vert:Um,linedashed_frag:Nm,meshbasic_vert:Fm,meshbasic_frag:Om,meshlambert_vert:km,meshlambert_frag:Bm,meshmatcap_vert:zm,meshmatcap_frag:Gm,meshnormal_vert:Hm,meshnormal_frag:Vm,meshphong_vert:$m,meshphong_frag:Wm,meshphysical_vert:Xm,meshphysical_frag:qm,meshtoon_vert:Ym,meshtoon_frag:Km,points_vert:Zm,points_frag:Jm,shadow_vert:Qm,shadow_frag:jm,sprite_vert:e0,sprite_frag:t0},ge={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},On={basic:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:$t([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:$t([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:$t([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:$t([ge.points,ge.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:$t([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:$t([ge.common,ge.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:$t([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:$t([ge.sprite,ge.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:$t([ge.common,ge.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:$t([ge.lights,ge.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};On.physical={uniforms:$t([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ur={r:0,b:0,g:0},n0=new ot,Xu=new Ne;Xu.set(-1,0,0,0,1,0,0,0,1);function i0(n,e,t,i,s,r){const a=new Ke(0);let o=s===!0?0:1,l,c,u=null,f=0,d=null;function h(w){let I=w.isScene===!0?w.background:null;if(I&&I.isTexture){const b=w.backgroundBlurriness>0;I=e.get(I,b)}return I}function p(w){let I=!1;const b=h(w);b===null?m(a,o):b&&b.isColor&&(m(b,1),I=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(w,I){const b=h(I);b&&(b.isCubeTexture||b.mapping===ta)?(c===void 0&&(c=new Nt(new Is(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:ws(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(n0.makeRotationFromEuler(I.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Xu),c.material.toneMapped=We.getTransfer(b.colorSpace)!==it,(u!==b||f!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Nt(new Ls(2,2),new $n({name:"BackgroundMaterial",uniforms:ws(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.toneMapped=We.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,I){w.getRGB(Ur,Gu(n)),t.buffers.color.setClear(Ur.r,Ur.g,Ur.b,I,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,I=1){a.set(w),o=I,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:p,addToRenderList:x,dispose:g}}function s0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(L,k,J,Y,G){let K=!1;const X=f(L,Y,J,k);r!==X&&(r=X,c(r.object)),K=h(L,Y,J,G),K&&p(L,Y,J,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,b(L,k,J,Y),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function f(L,k,J,Y){const G=Y.wireframe===!0;let K=i[k.id];K===void 0&&(K={},i[k.id]=K);const X=L.isInstancedMesh===!0?L.id:0;let ne=K[X];ne===void 0&&(ne={},K[X]=ne);let ae=ne[J.id];ae===void 0&&(ae={},ne[J.id]=ae);let de=ae[G];return de===void 0&&(de=d(l()),ae[G]=de),de}function d(L){const k=[],J=[],Y=[];for(let G=0;G<t;G++)k[G]=0,J[G]=0,Y[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:J,attributeDivisors:Y,object:L,attributes:{},index:null}}function h(L,k,J,Y){const G=r.attributes,K=k.attributes;let X=0;const ne=J.getAttributes();for(const ae in ne)if(ne[ae].location>=0){const ve=G[ae];let ye=K[ae];if(ye===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(ye=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(ye=L.instanceColor)),ve===void 0||ve.attribute!==ye||ye&&ve.data!==ye.data)return!0;X++}return r.attributesNum!==X||r.index!==Y}function p(L,k,J,Y){const G={},K=k.attributes;let X=0;const ne=J.getAttributes();for(const ae in ne)if(ne[ae].location>=0){let ve=K[ae];ve===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(ve=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(ve=L.instanceColor));const ye={};ye.attribute=ve,ve&&ve.data&&(ye.data=ve.data),G[ae]=ye,X++}r.attributes=G,r.attributesNum=X,r.index=Y}function x(){const L=r.newAttributes;for(let k=0,J=L.length;k<J;k++)L[k]=0}function m(L){g(L,0)}function g(L,k){const J=r.newAttributes,Y=r.enabledAttributes,G=r.attributeDivisors;J[L]=1,Y[L]===0&&(n.enableVertexAttribArray(L),Y[L]=1),G[L]!==k&&(n.vertexAttribDivisor(L,k),G[L]=k)}function w(){const L=r.newAttributes,k=r.enabledAttributes;for(let J=0,Y=k.length;J<Y;J++)k[J]!==L[J]&&(n.disableVertexAttribArray(J),k[J]=0)}function I(L,k,J,Y,G,K,X){X===!0?n.vertexAttribIPointer(L,k,J,G,K):n.vertexAttribPointer(L,k,J,Y,G,K)}function b(L,k,J,Y){x();const G=Y.attributes,K=J.getAttributes(),X=k.defaultAttributeValues;for(const ne in K){const ae=K[ne];if(ae.location>=0){let de=G[ne];if(de===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(de=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(de=L.instanceColor)),de!==void 0){const ve=de.normalized,ye=de.itemSize,qe=e.get(de);if(qe===void 0)continue;const ut=qe.buffer,Z=qe.type,C=qe.bytesPerElement,V=Z===n.INT||Z===n.UNSIGNED_INT||de.gpuType===hl;if(de.isInterleavedBufferAttribute){const y=de.data,se=y.stride,Ee=de.offset;if(y.isInstancedInterleavedBuffer){for(let we=0;we<ae.locationSize;we++)g(ae.location+we,y.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=y.meshPerAttribute*y.count)}else for(let we=0;we<ae.locationSize;we++)m(ae.location+we);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let we=0;we<ae.locationSize;we++)I(ae.location+we,ye/ae.locationSize,Z,ve,se*C,(Ee+ye/ae.locationSize*we)*C,V)}else{if(de.isInstancedBufferAttribute){for(let y=0;y<ae.locationSize;y++)g(ae.location+y,de.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let y=0;y<ae.locationSize;y++)m(ae.location+y);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let y=0;y<ae.locationSize;y++)I(ae.location+y,ye/ae.locationSize,Z,ve,ye*C,ye/ae.locationSize*y*C,V)}}else if(X!==void 0){const ve=X[ne];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(ae.location,ve);break;case 3:n.vertexAttrib3fv(ae.location,ve);break;case 4:n.vertexAttrib4fv(ae.location,ve);break;default:n.vertexAttrib1fv(ae.location,ve)}}}}w()}function R(){A();for(const L in i){const k=i[L];for(const J in k){const Y=k[J];for(const G in Y){const K=Y[G];for(const X in K)u(K[X].object),delete K[X];delete Y[G]}}delete i[L]}}function T(L){if(i[L.id]===void 0)return;const k=i[L.id];for(const J in k){const Y=k[J];for(const G in Y){const K=Y[G];for(const X in K)u(K[X].object),delete K[X];delete Y[G]}}delete i[L.id]}function P(L){for(const k in i){const J=i[k];for(const Y in J){const G=J[Y];if(G[L.id]===void 0)continue;const K=G[L.id];for(const X in K)u(K[X].object),delete K[X];delete G[L.id]}}}function _(L){for(const k in i){const J=i[k],Y=L.isInstancedMesh===!0?L.id:0,G=J[Y];if(G!==void 0){for(const K in G){const X=G[K];for(const ne in X)u(X[ne].object),delete X[ne];delete G[K]}delete J[Y],Object.keys(J).length===0&&delete i[k]}}}function A(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:N,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function r0(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function a0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const _=P===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==yn&&!_)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ue("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:w,maxVaryings:I,maxFragmentUniforms:b,maxSamples:R,samples:T}}function o0(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Di,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||s;return s=d,i=f.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){const p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!s||p===null||p.length===0||r&&!m)r?u(null):c();else{const w=r?0:i,I=w*4;let b=g.clippingState||null;l.value=b,b=u(p,d,I,h);for(let R=0;R!==I;++R)b[R]=t[R];g.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,p){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,p!==!0||m===null){const g=h+x*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<g)&&(m=new Float32Array(g));for(let I=0,b=h;I!==x;++I,b+=4)a.copy(f[I]).applyMatrix4(w,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Ei=4,wc=[.125,.215,.35,.446,.526,.582],Fi=20,l0=256,Gs=new sa,Rc=new Ke;let Ga=null,Ha=0,Va=0,$a=!1;const c0=new z;class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=c0}=r;Ga=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Va=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ga,Ha,Va),this._renderer.xr.enabled=$a,e.scissorTest=!1,ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ga=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Va=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:ri,format:Sn,colorSpace:Kr,depthBuffer:!1},s=Pc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=u0(r)),this._blurMaterial=f0(r,e,t),this._ggxMaterial=d0(r,e,t)}return s}_compileMaterial(e){const t=new Nt(new wn,e);this._renderer.compile(t,Gs)}_sceneToCubeUV(e,t,i,s,r){const l=new xn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(Rc),f.toneMapping=Gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Nt(new Is,new ar({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let g=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,g=!0):(m.color.copy(Rc),g=!0);for(let I=0;I<6;I++){const b=I%3;b===0?(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[I],r.y,r.z)):b===1?(l.up.set(0,0,c[I]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[I],r.z)):(l.up.set(0,c[I],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[I]));const R=this._cubeSize;ps(s,b*R,I>2?R:0,R,R),f.setRenderTarget(s),g&&f.render(x,l),f.render(e,l)}f.toneMapping=h,f.autoClear=d,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Xi||e.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ic());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ps(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Gs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,h=f*d,{_lodMax:p}=this,x=this._sizeLods[i],m=3*x*(i>p-Ei?i-p+Ei:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,ps(r,m,g,3*x,2*x),s.setRenderTarget(r),s.render(o,Gs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,ps(e,m,g,3*x,2*x),s.setRenderTarget(e),s.render(o,Gs)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const d=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Fi-1),x=r/p,m=isFinite(r)?1+Math.floor(u*x):Fi;m>Fi&&Ue(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);const g=[];let w=0;for(let P=0;P<Fi;++P){const _=P/x,A=Math.exp(-_*_/2);g.push(A),P===0?w+=A:P<m&&(w+=2*A)}for(let P=0;P<g.length;P++)g[P]=g[P]/w;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:I}=this;d.dTheta.value=p,d.mipInt.value=I-i;const b=this._sizeLods[s],R=3*b*(s>I-Ei?s-I+Ei:0),T=4*(this._cubeSize-b);ps(t,R,T,3*b,2*b),l.setRenderTarget(t),l.render(f,Gs)}}function u0(n){const e=[],t=[],i=[];let s=n;const r=n-Ei+1+wc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ei?l=wc[a-n+Ei-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,p=6,x=3,m=2,g=1,w=new Float32Array(x*p*h),I=new Float32Array(m*p*h),b=new Float32Array(g*p*h);for(let T=0;T<h;T++){const P=T%3*2/3-1,_=T>2?0:-1,A=[P,_,0,P+2/3,_,0,P+2/3,_+1,0,P,_,0,P+2/3,_+1,0,P,_+1,0];w.set(A,x*p*T),I.set(d,m*p*T);const N=[T,T,T,T,T,T];b.set(N,g*p*T)}const R=new wn;R.setAttribute("position",new An(w,x)),R.setAttribute("uv",new An(I,m)),R.setAttribute("faceIndex",new An(b,g)),i.push(new Nt(R,null)),s>Ei&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Pc(n,e,t){const i=new Hn(n,e,t);return i.texture.mapping=ta,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ps(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function d0(n,e,t){return new $n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:l0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ra(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function f0(n,e,t){const i=new Float32Array(Fi),s=new z(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ra(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ic(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ra(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Lc(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ra(){return`

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
	`}class qu extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Bu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Is(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:ii});r.uniforms.tEquirect.value=t;const a=new Nt(s,r),o=t.minFilter;return t.minFilter===zi&&(t.minFilter=Ht),new vh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function h0(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,h=!1){return d==null?null:h?a(d):r(d)}function r(d){if(d&&d.isTexture){const h=d.mapping;if(h===ha||h===pa)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const x=new qu(p.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const h=d.mapping,p=h===ha||h===pa,x=h===Xi||h===Ts;if(p||x){let m=t.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Cc(n)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const w=d.image;return p&&w&&w.height>0||x&&w&&l(w)?(i===null&&(i=new Cc(n)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,h){return h===ha?d.mapping=Xi:h===pa&&(d.mapping=Ts),d}function l(d){let h=0;const p=6;for(let x=0;x<p;x++)d[x]!==void 0&&h++;return h===p}function c(d){const h=d.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function p0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ys("WebGLRenderer: "+i+" extension not supported."),s}}}function m0(n,e,t,i){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete s[d.id];const h=r.get(d);h&&(e.remove(h),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const h in d)e.update(d[h],n.ARRAY_BUFFER)}function c(f){const d=[],h=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(h!==null){const w=h.array;x=h.version;for(let I=0,b=w.length;I<b;I+=3){const R=w[I+0],T=w[I+1],P=w[I+2];d.push(R,T,T,P,P,R)}}else{const w=p.array;x=p.version;for(let I=0,b=w.length/3-1;I<b;I+=3){const R=I+0,T=I+1,P=I+2;d.push(R,T,T,P,P,R)}}const m=new(p.count>=65535?Fu:Nu)(d,1);m.version=x;const g=r.get(f);g&&e.remove(g),r.set(f,m)}function u(f){const d=r.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function g0(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),t.update(d,i,1)}function c(f,d,h){h!==0&&(n.drawElementsInstanced(i,d,r,f*a,h),t.update(d,i,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,h);let x=0;for(let m=0;m<h;m++)x+=d[m];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function v0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function _0(n,e,t){const i=new WeakMap,s=new dt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let N=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",N)};var h=N;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],I=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),x===!0&&(b=2),m===!0&&(b=3);let R=o.attributes.position.count*b,T=1;R>e.maxTextureSize&&(T=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*T*4*f),_=new Du(P,R,T,f);_.type=yn,_.needsUpdate=!0;const A=b*4;for(let L=0;L<f;L++){const k=g[L],J=w[L],Y=I[L],G=R*T*4*L;for(let K=0;K<k.count;K++){const X=K*A;p===!0&&(s.fromBufferAttribute(k,K),P[G+X+0]=s.x,P[G+X+1]=s.y,P[G+X+2]=s.z,P[G+X+3]=0),x===!0&&(s.fromBufferAttribute(J,K),P[G+X+4]=s.x,P[G+X+5]=s.y,P[G+X+6]=s.z,P[G+X+7]=0),m===!0&&(s.fromBufferAttribute(Y,K),P[G+X+8]=s.x,P[G+X+9]=s.y,P[G+X+10]=s.z,P[G+X+11]=Y.itemSize===4?s.w:1)}}d={count:f,texture:_,size:new $e(R,T)},i.set(o,d),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function x0(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const M0={[xu]:"LINEAR_TONE_MAPPING",[Mu]:"REINHARD_TONE_MAPPING",[bu]:"CINEON_TONE_MAPPING",[fl]:"ACES_FILMIC_TONE_MAPPING",[Su]:"AGX_TONE_MAPPING",[Eu]:"NEUTRAL_TONE_MAPPING",[yu]:"CUSTOM_TONE_MAPPING"};function b0(n,e,t,i,s,r){const a=new Hn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new As(e,t):void 0}),o=new Hn(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),l=new wn;l.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new qt([0,2,0,0,2,0],2));const c=new uh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Nt(l,c),f=new sa(-1,1,1,-1,0,1);let d=null,h=null,p=!1,x,m=null,g=[],w=!1;this.setSize=function(I,b){a.setSize(I,b),o.setSize(I,b);for(let R=0;R<g.length;R++){const T=g[R];T.setSize&&T.setSize(I,b)}},this.setEffects=function(I){g=I,w=g.length>0&&g[0].isRenderPass===!0;const b=a.width,R=a.height;for(let T=0;T<g.length;T++){const P=g[T];P.setSize&&P.setSize(b,R)}},this.begin=function(I,b){if(p||I.toneMapping===Gn&&g.length===0)return!1;if(m=b,b!==null){const R=b.width,T=b.height;(a.width!==R||a.height!==T)&&this.setSize(R,T)}return w===!1&&I.setRenderTarget(a),x=I.toneMapping,I.toneMapping=Gn,!0},this.hasRenderPass=function(){return w},this.end=function(I,b){I.toneMapping=x,p=!0;let R=a,T=o;for(let P=0;P<g.length;P++){const _=g[P];if(_.enabled!==!1&&(_.render(I,T,R,b),_.needsSwap!==!1)){const A=R;R=T,T=A}}if(d!==I.outputColorSpace||h!==I.toneMapping){d=I.outputColorSpace,h=I.toneMapping,c.defines={},We.getTransfer(d)===it&&(c.defines.SRGB_TRANSFER="");const P=M0[h];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,I.setRenderTarget(m),I.render(u,f),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Yu=new Xt,Jo=new As(1,1),Ku=new Du,Zu=new Gf,Ju=new Bu,Dc=[],Uc=[],Nc=new Float32Array(16),Fc=new Float32Array(9),Oc=new Float32Array(4);function Ds(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Dc[s];if(r===void 0&&(r=new Float32Array(s),Dc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function aa(n,e){let t=Uc[e];t===void 0&&(t=new Int32Array(e),Uc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function y0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function E0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function T0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function A0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Oc.set(i),n.uniformMatrix2fv(this.addr,!1,Oc),Pt(t,i)}}function w0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Fc.set(i),n.uniformMatrix3fv(this.addr,!1,Fc),Pt(t,i)}}function R0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Nc.set(i),n.uniformMatrix4fv(this.addr,!1,Nc),Pt(t,i)}}function C0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function P0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function I0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function L0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function D0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function U0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function N0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function F0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function O0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Jo.compareFunction=t.isReversedDepthBuffer()?bl:Ml,r=Jo):r=Yu,t.setTexture2D(e||r,s)}function k0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Zu,s)}function B0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ju,s)}function z0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Ku,s)}function G0(n){switch(n){case 5126:return y0;case 35664:return S0;case 35665:return E0;case 35666:return T0;case 35674:return A0;case 35675:return w0;case 35676:return R0;case 5124:case 35670:return C0;case 35667:case 35671:return P0;case 35668:case 35672:return I0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return U0;case 36295:return N0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return z0}}function H0(n,e){n.uniform1fv(this.addr,e)}function V0(n,e){const t=Ds(e,this.size,2);n.uniform2fv(this.addr,t)}function $0(n,e){const t=Ds(e,this.size,3);n.uniform3fv(this.addr,t)}function W0(n,e){const t=Ds(e,this.size,4);n.uniform4fv(this.addr,t)}function X0(n,e){const t=Ds(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function q0(n,e){const t=Ds(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Y0(n,e){const t=Ds(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function K0(n,e){n.uniform1iv(this.addr,e)}function Z0(n,e){n.uniform2iv(this.addr,e)}function J0(n,e){n.uniform3iv(this.addr,e)}function Q0(n,e){n.uniform4iv(this.addr,e)}function j0(n,e){n.uniform1uiv(this.addr,e)}function eg(n,e){n.uniform2uiv(this.addr,e)}function tg(n,e){n.uniform3uiv(this.addr,e)}function ng(n,e){n.uniform4uiv(this.addr,e)}function ig(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Jo:a=Yu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function sg(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Zu,r[a])}function rg(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ju,r[a])}function ag(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Pt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ku,r[a])}function og(n){switch(n){case 5126:return H0;case 35664:return V0;case 35665:return $0;case 35666:return W0;case 35674:return X0;case 35675:return q0;case 35676:return Y0;case 5124:case 35670:return K0;case 35667:case 35671:return Z0;case 35668:case 35672:return J0;case 35669:case 35673:return Q0;case 5125:return j0;case 36294:return eg;case 36295:return tg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return ag}}class lg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=G0(t.type)}}class cg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=og(t.type)}}class ug{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Wa=/(\w+)(\])?(\[|\.)?/g;function kc(n,e){n.seq.push(e),n.map[e.id]=e}function dg(n,e,t){const i=n.name,s=i.length;for(Wa.lastIndex=0;;){const r=Wa.exec(i),a=Wa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){kc(t,c===void 0?new lg(o,n,e):new cg(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new ug(o),kc(t,f)),t=f}}}class Hr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);dg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Bc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const fg=37297;let hg=0;function pg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const zc=new Ne;function mg(n){We._getMatrix(zc,We.workingColorSpace,n);const e=`mat3( ${zc.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case Zr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+pg(n.getShaderSource(e),o)}else return r}function gg(n,e){const t=mg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const vg={[xu]:"Linear",[Mu]:"Reinhard",[bu]:"Cineon",[fl]:"ACESFilmic",[Su]:"AgX",[Eu]:"Neutral",[yu]:"Custom"};function _g(n,e){const t=vg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nr=new z;function xg(){We.getLuminanceCoefficients(Nr);const n=Nr.x.toFixed(4),e=Nr.y.toFixed(4),t=Nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function bg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function yg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ws(n){return n!==""}function Hc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qo(n){return n.replace(Sg,Tg)}const Eg=new Map;function Tg(n,e){let t=Be[e];if(t===void 0){const i=Eg.get(e);if(i!==void 0)t=Be[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Qo(t)}const Ag=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $c(n){return n.replace(Ag,wg)}function wg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Rg={[Or]:"SHADOWMAP_TYPE_PCF",[$s]:"SHADOWMAP_TYPE_VSM"};function Cg(n){return Rg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Pg={[Xi]:"ENVMAP_TYPE_CUBE",[Ts]:"ENVMAP_TYPE_CUBE",[ta]:"ENVMAP_TYPE_CUBE_UV"};function Ig(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Pg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lg={[Ts]:"ENVMAP_MODE_REFRACTION"};function Dg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Lg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ug={[_u]:"ENVMAP_BLENDING_MULTIPLY",[Mf]:"ENVMAP_BLENDING_MIX",[bf]:"ENVMAP_BLENDING_ADD"};function Ng(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ug[n.combine]||"ENVMAP_BLENDING_NONE"}function Fg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Og(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Cg(t),c=Ig(t),u=Dg(t),f=Ng(t),d=Fg(t),h=Mg(t),p=bg(r),x=s.createProgram();let m,g,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ws).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ws).join(`
`),g.length>0&&(g+=`
`)):(m=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),g=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Gn?_g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,gg("linearToOutputTexel",t.outputColorSpace),xg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ws).join(`
`)),a=Qo(a),a=Hc(a,t),a=Vc(a,t),o=Qo(o),o=Hc(o,t),o=Vc(o,t),a=$c(a),o=$c(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const I=w+m+a,b=w+g+o,R=Bc(s,s.VERTEX_SHADER,I),T=Bc(s,s.FRAGMENT_SHADER,b);s.attachShader(x,R),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(L){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",J=s.getShaderInfoLog(R)||"",Y=s.getShaderInfoLog(T)||"",G=k.trim(),K=J.trim(),X=Y.trim();let ne=!0,ae=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,R,T);else{const de=Gc(s,R,"vertex"),ve=Gc(s,T,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+de+`
`+ve)}else G!==""?Ue("WebGLProgram: Program Info Log:",G):(K===""||X==="")&&(ae=!1);ae&&(L.diagnostics={runnable:ne,programLog:G,vertexShader:{log:K,prefix:m},fragmentShader:{log:X,prefix:g}})}s.deleteShader(R),s.deleteShader(T),_=new Hr(s,x),A=yg(s,x)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(x,fg)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=T,this}let kg=0;class Bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new zg(e),t.set(e,i)),i}}class zg{constructor(e){this.id=kg++,this.code=e,this.usedTimes=0}}function Gg(n){return n===qi||n===qr||n===Yr}function Hg(n,e,t,i,s,r){const a=new Sl,o=new Bg,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,A,N,L,k,J){const Y=L.fog,G=k.geometry,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ne=e.get(_.envMap||K,X),ae=ne&&ne.mapping===ta?ne.image.height:null,de=h[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Ue("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const ve=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ye=ve!==void 0?ve.length:0;let qe=0;G.morphAttributes.position!==void 0&&(qe=1),G.morphAttributes.normal!==void 0&&(qe=2),G.morphAttributes.color!==void 0&&(qe=3);let ut,Z,C,V;if(de){const Te=On[de];ut=Te.vertexShader,Z=Te.fragmentShader}else{ut=_.vertexShader,Z=_.fragmentShader;const Te=o.getVertexShaderStage(_),ht=o.getFragmentShaderStage(_);o.update(_,Te,ht),C=Te.id,V=ht.id}const y=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),Ee=k.isInstancedMesh===!0,we=k.isBatchedMesh===!0,oe=!!_.map,re=!!_.matcap,Ve=!!ne,je=!!_.aoMap,Ze=!!_.lightMap,Mt=!!_.bumpMap&&_.wireframe===!1,Et=!!_.normalMap,It=!!_.displacementMap,Ft=!!_.emissiveMap,ft=!!_.metalnessMap,bt=!!_.roughnessMap,F=_.anisotropy>0,Yt=_.clearcoat>0,tt=_.dispersion>0,S=_.iridescence>0,v=_.sheen>0,B=_.transmission>0,W=F&&!!_.anisotropyMap,Q=Yt&&!!_.clearcoatMap,le=Yt&&!!_.clearcoatNormalMap,ue=Yt&&!!_.clearcoatRoughnessMap,j=S&&!!_.iridescenceMap,te=S&&!!_.iridescenceThicknessMap,fe=v&&!!_.sheenColorMap,Ce=v&&!!_.sheenRoughnessMap,me=!!_.specularMap,he=!!_.specularColorMap,Le=!!_.specularIntensityMap,De=B&&!!_.transmissionMap,Fe=B&&!!_.thicknessMap,U=!!_.gradientMap,ce=!!_.alphaMap,ee=_.alphaTest>0,pe=!!_.alphaHash,Me=!!_.extensions;let ie=Gn;_.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(ie=n.toneMapping);const Re={shaderID:de,shaderType:_.type,shaderName:_.name,vertexShader:ut,fragmentShader:Z,defines:_.defines,customVertexShaderID:C,customFragmentShaderID:V,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:we,batchingColor:we&&k._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&k.instanceColor!==null,instancingMorph:Ee&&k.morphTexture!==null,outputColorSpace:y===null?n.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:We.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:oe,matcap:re,envMap:Ve,envMapMode:Ve&&ne.mapping,envMapCubeUVHeight:ae,aoMap:je,lightMap:Ze,bumpMap:Mt,normalMap:Et,displacementMap:It,emissiveMap:Ft,normalMapObjectSpace:Et&&_.normalMapType===Ef,normalMapTangentSpace:Et&&_.normalMapType===Yo,packedNormalMap:Et&&_.normalMapType===Yo&&Gg(_.normalMap.format),metalnessMap:ft,roughnessMap:bt,anisotropy:F,anisotropyMap:W,clearcoat:Yt,clearcoatMap:Q,clearcoatNormalMap:le,clearcoatRoughnessMap:ue,dispersion:tt,iridescence:S,iridescenceMap:j,iridescenceThicknessMap:te,sheen:v,sheenColorMap:fe,sheenRoughnessMap:Ce,specularMap:me,specularColorMap:he,specularIntensityMap:Le,transmission:B,transmissionMap:De,thicknessMap:Fe,gradientMap:U,opaque:_.transparent===!1&&_.blending===bs&&_.alphaToCoverage===!1,alphaMap:ce,alphaTest:ee,alphaHash:pe,combine:_.combine,mapUv:oe&&p(_.map.channel),aoMapUv:je&&p(_.aoMap.channel),lightMapUv:Ze&&p(_.lightMap.channel),bumpMapUv:Mt&&p(_.bumpMap.channel),normalMapUv:Et&&p(_.normalMap.channel),displacementMapUv:It&&p(_.displacementMap.channel),emissiveMapUv:Ft&&p(_.emissiveMap.channel),metalnessMapUv:ft&&p(_.metalnessMap.channel),roughnessMapUv:bt&&p(_.roughnessMap.channel),anisotropyMapUv:W&&p(_.anisotropyMap.channel),clearcoatMapUv:Q&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:le&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:te&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(_.sheenRoughnessMap.channel),specularMapUv:me&&p(_.specularMap.channel),specularColorMapUv:he&&p(_.specularColorMap.channel),specularIntensityMapUv:Le&&p(_.specularIntensityMap.channel),transmissionMapUv:De&&p(_.transmissionMap.channel),thicknessMapUv:Fe&&p(_.thicknessMap.channel),alphaMapUv:ce&&p(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Et||F),vertexNormals:!!G.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(oe||ce),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&Et===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:se,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:qe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ie,decodeVideoTexture:oe&&_.map.isVideoTexture===!0&&We.getTransfer(_.map.colorSpace)===it,decodeVideoTextureEmissive:Ft&&_.emissiveMap.isVideoTexture===!0&&We.getTransfer(_.emissiveMap.colorSpace)===it,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Qn,flipSided:_.side===Qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function m(_){const A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)A.push(N),A.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(g(A,_),w(A,_),A.push(n.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function g(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function w(_,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function I(_){const A=h[_.type];let N;if(A){const L=On[A];N=oh.clone(L.uniforms)}else N=_.uniforms;return N}function b(_,A){let N=u.get(A);return N!==void 0?++N.usedTimes:(N=new Og(n,A,_,s),c.push(N),u.set(A,N)),N}function R(_){if(--_.usedTimes===0){const A=c.indexOf(_);c[A]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:I,acquireProgram:b,releaseProgram:R,releaseShaderCache:T,programs:c,dispose:P}}function Vg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function $g(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Xc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,p,x,m,g){let w=n[e];return w===void 0?(w={id:d.id,object:d,geometry:h,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},n[e]=w):(w.id=d.id,w.object=d,w.geometry=h,w.material=p,w.materialVariant=a(d),w.groupOrder=x,w.renderOrder=d.renderOrder,w.z=m,w.group=g),e++,w}function l(d,h,p,x,m,g){const w=o(d,h,p,x,m,g);p.transmission>0?i.push(w):p.transparent===!0?s.push(w):t.push(w)}function c(d,h,p,x,m,g){const w=o(d,h,p,x,m,g);p.transmission>0?i.unshift(w):p.transparent===!0?s.unshift(w):t.unshift(w)}function u(d,h,p){t.length>1&&t.sort(d||$g),i.length>1&&i.sort(h||Xc),s.length>1&&s.sort(h||Xc),p&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function Wg(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new qc,n.set(i,[a])):s>=r.length?(a=new qc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Xg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Ke};break;case"SpotLight":t={position:new z,direction:new z,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function qg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Yg=0;function Kg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Zg(n){const e=new Xg,t=qg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new ot,a=new ot;function o(c){let u=0,f=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let h=0,p=0,x=0,m=0,g=0,w=0,I=0,b=0,R=0,T=0,P=0;c.sort(Kg);for(let A=0,N=c.length;A<N;A++){const L=c[A],k=L.color,J=L.intensity,Y=L.distance;let G=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===qi?G=L.shadow.map.texture:G=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=k.r*J,f+=k.g*J,d+=k.b*J;else if(L.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(L.sh.coefficients[K],J);P++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const X=L.shadow,ne=t.get(L);ne.shadowIntensity=X.intensity,ne.shadowBias=X.bias,ne.shadowNormalBias=X.normalBias,ne.shadowRadius=X.radius,ne.shadowMapSize=X.mapSize,i.directionalShadow[h]=ne,i.directionalShadowMap[h]=G,i.directionalShadowMatrix[h]=L.shadow.matrix,w++}i.directional[h]=K,h++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(k).multiplyScalar(J),K.distance=Y,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,i.spot[x]=K;const X=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,X.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[x]=X.matrix,L.castShadow){const ne=t.get(L);ne.shadowIntensity=X.intensity,ne.shadowBias=X.bias,ne.shadowNormalBias=X.normalBias,ne.shadowRadius=X.radius,ne.shadowMapSize=X.mapSize,i.spotShadow[x]=ne,i.spotShadowMap[x]=G,b++}x++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(k).multiplyScalar(J),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=K,m++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){const X=L.shadow,ne=t.get(L);ne.shadowIntensity=X.intensity,ne.shadowBias=X.bias,ne.shadowNormalBias=X.normalBias,ne.shadowRadius=X.radius,ne.shadowMapSize=X.mapSize,ne.shadowCameraNear=X.camera.near,ne.shadowCameraFar=X.camera.far,i.pointShadow[p]=ne,i.pointShadowMap[p]=G,i.pointShadowMatrix[p]=L.shadow.matrix,I++}i.point[p]=K,p++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(J),K.groundColor.copy(L.groundColor).multiplyScalar(J),i.hemi[g]=K,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const _=i.hash;(_.directionalLength!==h||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==g||_.numDirectionalShadows!==w||_.numPointShadows!==I||_.numSpotShadows!==b||_.numSpotMaps!==R||_.numLightProbes!==P)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=I,i.pointShadowMap.length=I,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=I,i.spotLightMatrix.length=b+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,_.directionalLength=h,_.pointLength=p,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=g,_.numDirectionalShadows=w,_.numPointShadows=I,_.numSpotShadows=b,_.numSpotMaps=R,_.numLightProbes=P,i.version=Yg++)}function l(c,u){let f=0,d=0,h=0,p=0,x=0;const m=u.matrixWorldInverse;for(let g=0,w=c.length;g<w;g++){const I=c[g];if(I.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(I.matrixWorld),s.setFromMatrixPosition(I.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),f++}else if(I.isSpotLight){const b=i.spot[h];b.position.setFromMatrixPosition(I.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(I.matrixWorld),s.setFromMatrixPosition(I.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),h++}else if(I.isRectAreaLight){const b=i.rectArea[p];b.position.setFromMatrixPosition(I.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(I.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(I.width*.5,0,0),b.halfHeight.set(0,I.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(I.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(I.matrixWorld),b.position.applyMatrix4(m),d++}else if(I.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(I.matrixWorld),b.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function Yc(n){const e=new Zg(n),t=[],i=[],s=[];function r(d){f.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Jg(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Yc(n),e.set(s,[o])):r>=a.length?(o=new Yc(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jg=`uniform sampler2D shadow_pass;
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
}`,ev=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],tv=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Kc=new ot,Hs=new z,Xa=new z;function nv(n,e,t){let i=new Tl;const s=new $e,r=new $e,a=new dt,o=new dh,l=new fh,c={},u=t.maxTextureSize,f={[Ai]:Qt,[Qt]:Ai,[Qn]:Qn},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Qg,fragmentShader:jg}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const p=new wn;p.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Nt(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Or;let g=this.type;this.render=function(T,P,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===vu&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Or);const A=n.getRenderTarget(),N=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),k=n.state;k.setBlending(ii),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const J=g!==this.type;J&&P.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(G=>G.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,G=T.length;Y<G;Y++){const K=T[Y],X=K.shadow;if(X===void 0){Ue("WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const ne=X.getFrameExtents();s.multiply(ne),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,X.mapSize.y=r.y));const ae=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=ae,X.map===null||J===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===$s){if(K.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Hn(s.x,s.y,{format:qi,type:ri,minFilter:Ht,magFilter:Ht,generateMipmaps:!1}),X.map.texture.name=K.name+".shadowMap",X.map.depthTexture=new As(s.x,s.y,yn),X.map.depthTexture.name=K.name+".shadowMapDepth",X.map.depthTexture.format=ai,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ot,X.map.depthTexture.magFilter=Ot}else K.isPointLight?(X.map=new qu(s.x),X.map.depthTexture=new rh(s.x,Vn)):(X.map=new Hn(s.x,s.y),X.map.depthTexture=new As(s.x,s.y,Vn)),X.map.depthTexture.name=K.name+".shadowMap",X.map.depthTexture.format=ai,this.type===Or?(X.map.depthTexture.compareFunction=ae?bl:Ml,X.map.depthTexture.minFilter=Ht,X.map.depthTexture.magFilter=Ht):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ot,X.map.depthTexture.magFilter=Ot);X.camera.updateProjectionMatrix()}const de=X.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<de;ve++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,ve),n.clear();else{ve===0&&(n.setRenderTarget(X.map),n.clear());const ye=X.getViewport(ve);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),k.viewport(a)}if(K.isPointLight){const ye=X.camera,qe=X.matrix,ut=K.distance||ye.far;ut!==ye.far&&(ye.far=ut,ye.updateProjectionMatrix()),Hs.setFromMatrixPosition(K.matrixWorld),ye.position.copy(Hs),Xa.copy(ye.position),Xa.add(ev[ve]),ye.up.copy(tv[ve]),ye.lookAt(Xa),ye.updateMatrixWorld(),qe.makeTranslation(-Hs.x,-Hs.y,-Hs.z),Kc.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Kc,ye.coordinateSystem,ye.reversedDepth)}else X.updateMatrices(K);i=X.getFrustum(),b(P,_,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===$s&&w(X,_),X.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(A,N,L)};function w(T,P){const _=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Hn(s.x,s.y,{format:qi,type:ri})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,_,d,x,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,_,h,x,null)}function I(T,P,_,A){let N=null;const L=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)N=L;else if(N=_.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const k=N.uuid,J=P.uuid;let Y=c[k];Y===void 0&&(Y={},c[k]=Y);let G=Y[J];G===void 0&&(G=N.clone(),Y[J]=G,P.addEventListener("dispose",R)),N=G}if(N.visible=P.visible,N.wireframe=P.wireframe,A===$s?N.side=P.shadowSide!==null?P.shadowSide:P.side:N.side=P.shadowSide!==null?P.shadowSide:f[P.side],N.alphaMap=P.alphaMap,N.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,N.map=P.map,N.clipShadows=P.clipShadows,N.clippingPlanes=P.clippingPlanes,N.clipIntersection=P.clipIntersection,N.displacementMap=P.displacementMap,N.displacementScale=P.displacementScale,N.displacementBias=P.displacementBias,N.wireframeLinewidth=P.wireframeLinewidth,N.linewidth=P.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const k=n.properties.get(N);k.light=_}return N}function b(T,P,_,A,N){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===$s)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const J=e.update(T),Y=T.material;if(Array.isArray(Y)){const G=J.groups;for(let K=0,X=G.length;K<X;K++){const ne=G[K],ae=Y[ne.materialIndex];if(ae&&ae.visible){const de=I(T,ae,A,N);T.onBeforeShadow(n,T,P,_,J,de,ne),n.renderBufferDirect(_,null,J,de,T,ne),T.onAfterShadow(n,T,P,_,J,de,ne)}}}else if(Y.visible){const G=I(T,Y,A,N);T.onBeforeShadow(n,T,P,_,J,G,null),n.renderBufferDirect(_,null,J,G,T,null),T.onAfterShadow(n,T,P,_,J,G,null)}}const k=T.children;for(let J=0,Y=k.length;J<Y;J++)b(k[J],P,_,A,N)}function R(T){T.target.removeEventListener("dispose",R);for(const _ in c){const A=c[_],N=T.target.uuid;N in A&&(A[N].dispose(),delete A[N])}}}function iv(n,e){function t(){let U=!1;const ce=new dt;let ee=null;const pe=new dt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!U&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){U=Me},setClear:function(Me,ie,Re,Te,ht){ht===!0&&(Me*=Te,ie*=Te,Re*=Te),ce.set(Me,ie,Re,Te),pe.equals(ce)===!1&&(n.clearColor(Me,ie,Re,Te),pe.copy(ce))},reset:function(){U=!1,ee=null,pe.set(-1,0,0,0)}}}function i(){let U=!1,ce=!1,ee=null,pe=null,Me=null;return{setReversed:function(ie){if(ce!==ie){const Re=e.get("EXT_clip_control");ie?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ce=ie;const Te=Me;Me=null,this.setClear(Te)}},getReversed:function(){return ce},setTest:function(ie){ie?y(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(ie){ee!==ie&&!U&&(n.depthMask(ie),ee=ie)},setFunc:function(ie){if(ce&&(ie=Uf[ie]),pe!==ie){switch(ie){case co:n.depthFunc(n.NEVER);break;case uo:n.depthFunc(n.ALWAYS);break;case fo:n.depthFunc(n.LESS);break;case Es:n.depthFunc(n.LEQUAL);break;case ho:n.depthFunc(n.EQUAL);break;case po:n.depthFunc(n.GEQUAL);break;case mo:n.depthFunc(n.GREATER);break;case go:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pe=ie}},setLocked:function(ie){U=ie},setClear:function(ie){Me!==ie&&(Me=ie,ce&&(ie=1-ie),n.clearDepth(ie))},reset:function(){U=!1,ee=null,pe=null,Me=null,ce=!1}}}function s(){let U=!1,ce=null,ee=null,pe=null,Me=null,ie=null,Re=null,Te=null,ht=null;return{setTest:function(lt){U||(lt?y(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(lt){ce!==lt&&!U&&(n.stencilMask(lt),ce=lt)},setFunc:function(lt,Rn,Cn){(ee!==lt||pe!==Rn||Me!==Cn)&&(n.stencilFunc(lt,Rn,Cn),ee=lt,pe=Rn,Me=Cn)},setOp:function(lt,Rn,Cn){(ie!==lt||Re!==Rn||Te!==Cn)&&(n.stencilOp(lt,Rn,Cn),ie=lt,Re=Rn,Te=Cn)},setLocked:function(lt){U=lt},setClear:function(lt){ht!==lt&&(n.clearStencil(lt),ht=lt)},reset:function(){U=!1,ce=null,ee=null,pe=null,Me=null,ie=null,Re=null,Te=null,ht=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},d={},h=new WeakMap,p=[],x=null,m=!1,g=null,w=null,I=null,b=null,R=null,T=null,P=null,_=new Ke(0,0,0),A=0,N=!1,L=null,k=null,J=null,Y=null,G=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ne=0;const ae=n.getParameter(n.VERSION);ae.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ae)[1]),X=ne>=1):ae.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),X=ne>=2);let de=null,ve={};const ye=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),ut=new dt().fromArray(ye),Z=new dt().fromArray(qe);function C(U,ce,ee,pe){const Me=new Uint8Array(4),ie=n.createTexture();n.bindTexture(U,ie),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Re=0;Re<ee;Re++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,pe,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(ce+Re,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return ie}const V={};V[n.TEXTURE_2D]=C(n.TEXTURE_2D,n.TEXTURE_2D,1),V[n.TEXTURE_CUBE_MAP]=C(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[n.TEXTURE_2D_ARRAY]=C(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),V[n.TEXTURE_3D]=C(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),y(n.DEPTH_TEST),a.setFunc(Es),Mt(!1),Et(ql),y(n.CULL_FACE),je(ii);function y(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function se(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Ee(U,ce){return d[U]!==ce?(n.bindFramebuffer(U,ce),d[U]=ce,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function we(U,ce){let ee=p,pe=!1;if(U){ee=h.get(ce),ee===void 0&&(ee=[],h.set(ce,ee));const Me=U.textures;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let ie=0,Re=Me.length;ie<Re;ie++)ee[ie]=n.COLOR_ATTACHMENT0+ie;ee.length=Me.length,pe=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,pe=!0);pe&&n.drawBuffers(ee)}function oe(U){return x!==U?(n.useProgram(U),x=U,!0):!1}const re={[Ni]:n.FUNC_ADD,[nf]:n.FUNC_SUBTRACT,[sf]:n.FUNC_REVERSE_SUBTRACT};re[rf]=n.MIN,re[af]=n.MAX;const Ve={[of]:n.ZERO,[lf]:n.ONE,[cf]:n.SRC_COLOR,[oo]:n.SRC_ALPHA,[mf]:n.SRC_ALPHA_SATURATE,[hf]:n.DST_COLOR,[df]:n.DST_ALPHA,[uf]:n.ONE_MINUS_SRC_COLOR,[lo]:n.ONE_MINUS_SRC_ALPHA,[pf]:n.ONE_MINUS_DST_COLOR,[ff]:n.ONE_MINUS_DST_ALPHA,[gf]:n.CONSTANT_COLOR,[vf]:n.ONE_MINUS_CONSTANT_COLOR,[_f]:n.CONSTANT_ALPHA,[xf]:n.ONE_MINUS_CONSTANT_ALPHA};function je(U,ce,ee,pe,Me,ie,Re,Te,ht,lt){if(U===ii){m===!0&&(se(n.BLEND),m=!1);return}if(m===!1&&(y(n.BLEND),m=!0),U!==tf){if(U!==g||lt!==N){if((w!==Ni||R!==Ni)&&(n.blendEquation(n.FUNC_ADD),w=Ni,R=Ni),lt)switch(U){case bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yl:n.blendFunc(n.ONE,n.ONE);break;case Kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ye("WebGLState: Invalid blending: ",U);break}else switch(U){case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kl:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zl:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",U);break}I=null,b=null,T=null,P=null,_.set(0,0,0),A=0,g=U,N=lt}return}Me=Me||ce,ie=ie||ee,Re=Re||pe,(ce!==w||Me!==R)&&(n.blendEquationSeparate(re[ce],re[Me]),w=ce,R=Me),(ee!==I||pe!==b||ie!==T||Re!==P)&&(n.blendFuncSeparate(Ve[ee],Ve[pe],Ve[ie],Ve[Re]),I=ee,b=pe,T=ie,P=Re),(Te.equals(_)===!1||ht!==A)&&(n.blendColor(Te.r,Te.g,Te.b,ht),_.copy(Te),A=ht),g=U,N=!1}function Ze(U,ce){U.side===Qn?se(n.CULL_FACE):y(n.CULL_FACE);let ee=U.side===Qt;ce&&(ee=!ee),Mt(ee),U.blending===bs&&U.transparent===!1?je(ii):je(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const pe=U.stencilWrite;o.setTest(pe),pe&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ft(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?y(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Mt(U){L!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),L=U)}function Et(U){U!==jd?(y(n.CULL_FACE),U!==k&&(U===ql?n.cullFace(n.BACK):U===ef?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),k=U}function It(U){U!==J&&(X&&n.lineWidth(U),J=U)}function Ft(U,ce,ee){U?(y(n.POLYGON_OFFSET_FILL),(Y!==ce||G!==ee)&&(Y=ce,G=ee,a.getReversed()&&(ce=-ce),n.polygonOffset(ce,ee))):se(n.POLYGON_OFFSET_FILL)}function ft(U){U?y(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function bt(U){U===void 0&&(U=n.TEXTURE0+K-1),de!==U&&(n.activeTexture(U),de=U)}function F(U,ce,ee){ee===void 0&&(de===null?ee=n.TEXTURE0+K-1:ee=de);let pe=ve[ee];pe===void 0&&(pe={type:void 0,texture:void 0},ve[ee]=pe),(pe.type!==U||pe.texture!==ce)&&(de!==ee&&(n.activeTexture(ee),de=ee),n.bindTexture(U,ce||V[U]),pe.type=U,pe.texture=ce)}function Yt(){const U=ve[de];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function tt(){try{n.compressedTexImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function v(){try{n.texSubImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function B(){try{n.texSubImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function le(){try{n.texStorage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function ue(){try{n.texStorage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function j(){try{n.texImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function te(){try{n.texImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function fe(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function Ce(U,ce){f[U]!==ce&&(n.pixelStorei(U,ce),f[U]=ce)}function me(U){ut.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ut.copy(U))}function he(U){Z.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Le(U,ce){let ee=c.get(ce);ee===void 0&&(ee=new WeakMap,c.set(ce,ee));let pe=ee.get(U);pe===void 0&&(pe=n.getUniformBlockIndex(ce,U.name),ee.set(U,pe))}function De(U,ce){const pe=c.get(ce).get(U);l.get(ce)!==pe&&(n.uniformBlockBinding(ce,pe,U.__bindingPointIndex),l.set(ce,pe))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},de=null,ve={},d={},h=new WeakMap,p=[],x=null,m=!1,g=null,w=null,I=null,b=null,R=null,T=null,P=null,_=new Ke(0,0,0),A=0,N=!1,L=null,k=null,J=null,Y=null,G=null,ut.set(0,0,n.canvas.width,n.canvas.height),Z.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:y,disable:se,bindFramebuffer:Ee,drawBuffers:we,useProgram:oe,setBlending:je,setMaterial:Ze,setFlipSided:Mt,setCullFace:Et,setLineWidth:It,setPolygonOffset:Ft,setScissorTest:ft,activeTexture:bt,bindTexture:F,unbindTexture:Yt,compressedTexImage2D:tt,compressedTexImage3D:S,texImage2D:j,texImage3D:te,pixelStorei:Ce,getParameter:fe,updateUBOMapping:Le,uniformBlockBinding:De,texStorage2D:le,texStorage3D:ue,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:Q,scissor:me,viewport:he,reset:Fe}}function sv(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,u=new WeakMap,f=new Set;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(S,v){return p?new OffscreenCanvas(S,v):Jr("canvas")}function m(S,v,B){let W=1;const Q=tt(S);if((Q.width>B||Q.height>B)&&(W=B/Math.max(Q.width,Q.height)),W<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const le=Math.floor(W*Q.width),ue=Math.floor(W*Q.height);d===void 0&&(d=x(le,ue));const j=v?x(le,ue):d;return j.width=le,j.height=ue,j.getContext("2d").drawImage(S,0,0,le,ue),Ue("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+ue+")."),j}else return"data"in S&&Ue("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),S;return S}function g(S){return S.generateMipmaps}function w(S){n.generateMipmap(S)}function I(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(S,v,B,W,Q,le=!1){if(S!==null){if(n[S]!==void 0)return n[S];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ue;W&&(ue=e.get("EXT_texture_norm16"),ue||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=v;if(v===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.R16_EXT),B===n.SHORT&&ue&&(j=ue.R16_SNORM_EXT)),v===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),v===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RG16_EXT),B===n.SHORT&&ue&&(j=ue.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),v===n.RGB&&(B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGB16_EXT),B===n.SHORT&&ue&&(j=ue.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?Zr:We.getTransfer(Q);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=te===it?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGBA16_EXT),B===n.SHORT&&ue&&(j=ue.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function R(S,v){let B;return S?v===null||v===Vn||v===er?B=n.DEPTH24_STENCIL8:v===yn?B=n.DEPTH32F_STENCIL8:v===js&&(B=n.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Vn||v===er?B=n.DEPTH_COMPONENT24:v===yn?B=n.DEPTH_COMPONENT32F:v===js&&(B=n.DEPTH_COMPONENT16),B}function T(S,v){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==Ot&&S.minFilter!==Ht?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function P(S){const v=S.target;v.removeEventListener("dispose",P),A(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(S){const v=S.target;v.removeEventListener("dispose",_),L(v)}function A(S){const v=i.get(S);if(v.__webglInit===void 0)return;const B=S.source,W=h.get(B);if(W){const Q=W[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&N(S),Object.keys(W).length===0&&h.delete(B)}i.remove(S)}function N(S){const v=i.get(S);n.deleteTexture(v.__webglTexture);const B=S.source,W=h.get(B);delete W[v.__cacheKey],a.memory.textures--}function L(S){const v=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let Q=0;Q<v.__webglFramebuffer[W].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[W][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=S.textures;for(let W=0,Q=B.length;W<Q;W++){const le=i.get(B[W]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(B[W])}i.remove(S)}let k=0;function J(){k=0}function Y(){return k}function G(S){k=S}function K(){const S=k;return S>=s.maxTextures&&Ue("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),k+=1,S}function X(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function ne(S,v){const B=i.get(S);if(S.isVideoTexture&&F(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&B.__version!==S.version){const W=S.image;if(W===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{se(B,S,v);return}}else S.isExternalTexture&&(B.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+v)}function ae(S,v){const B=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&B.__version!==S.version){se(B,S,v);return}else S.isExternalTexture&&(B.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+v)}function de(S,v){const B=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&B.__version!==S.version){se(B,S,v);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+v)}function ve(S,v){const B=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&B.__version!==S.version){Ee(B,S,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+v)}const ye={[Xr]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[vo]:n.MIRRORED_REPEAT},qe={[Ot]:n.NEAREST,[yf]:n.NEAREST_MIPMAP_NEAREST,[hr]:n.NEAREST_MIPMAP_LINEAR,[Ht]:n.LINEAR,[ma]:n.LINEAR_MIPMAP_NEAREST,[zi]:n.LINEAR_MIPMAP_LINEAR},ut={[Tf]:n.NEVER,[Pf]:n.ALWAYS,[Af]:n.LESS,[Ml]:n.LEQUAL,[wf]:n.EQUAL,[bl]:n.GEQUAL,[Rf]:n.GREATER,[Cf]:n.NOTEQUAL};function Z(S,v){if(v.type===yn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ht||v.magFilter===ma||v.magFilter===hr||v.magFilter===zi||v.minFilter===Ht||v.minFilter===ma||v.minFilter===hr||v.minFilter===zi)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,ye[v.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,ye[v.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,ye[v.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,qe[v.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,qe[v.minFilter]),v.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,ut[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==hr&&v.minFilter!==zi||v.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function C(S,v){let B=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",P));const W=v.source;let Q=h.get(W);Q===void 0&&(Q={},h.set(W,Q));const le=X(v);if(le!==S.__cacheKey){Q[le]===void 0&&(Q[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[le].usedTimes++;const ue=Q[S.__cacheKey];ue!==void 0&&(Q[S.__cacheKey].usedTimes--,ue.usedTimes===0&&N(v)),S.__cacheKey=le,S.__webglTexture=Q[le].texture}return B}function V(S,v,B){return Math.floor(Math.floor(S/B)/v)}function y(S,v,B,W){const le=S.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,B,W,v.data);else{le.sort((Ce,me)=>Ce.start-me.start);let ue=0;for(let Ce=1;Ce<le.length;Ce++){const me=le[ue],he=le[Ce],Le=me.start+me.count,De=V(he.start,v.width,4),Fe=V(me.start,v.width,4);he.start<=Le+1&&De===Fe&&V(he.start+he.count-1,v.width,4)===De?me.count=Math.max(me.count,he.start+he.count-me.start):(++ue,le[ue]=he)}le.length=ue+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ce=0,me=le.length;Ce<me;Ce++){const he=le[Ce],Le=Math.floor(he.start/4),De=Math.ceil(he.count/4),Fe=Le%v.width,U=Math.floor(Le/v.width),ce=De,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Fe,U,ce,ee,B,W,v.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function se(S,v,B){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const Q=C(S,v),le=v.source;t.bindTexture(W,S.__webglTexture,n.TEXTURE0+B);const ue=i.get(le);if(le.version!==ue.__version||Q===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ee=We.getPrimaries(We.workingColorSpace),pe=v.colorSpace===yi?null:We.getPrimaries(v.colorSpace),Me=v.colorSpace===yi||ee===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=m(v.image,!1,s.maxTextureSize);te=Yt(v,te);const fe=r.convert(v.format,v.colorSpace),Ce=r.convert(v.type);let me=b(v.internalFormat,fe,Ce,v.normalized,v.colorSpace,v.isVideoTexture);Z(W,v);let he;const Le=v.mipmaps,De=v.isVideoTexture!==!0,Fe=ue.__version===void 0||Q===!0,U=le.dataReady,ce=T(v,te);if(v.isDepthTexture)me=R(v.format===Gi,v.type),Fe&&(De?t.texStorage2D(n.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,fe,Ce,null));else if(v.isDataTexture)if(Le.length>0){De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ce,me,Le[0].width,Le[0].height);for(let ee=0,pe=Le.length;ee<pe;ee++)he=Le[ee],De?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,fe,Ce,he.data):t.texImage2D(n.TEXTURE_2D,ee,me,he.width,he.height,0,fe,Ce,he.data);v.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(n.TEXTURE_2D,ce,me,te.width,te.height),U&&y(v,te,fe,Ce)):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,fe,Ce,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,me,Le[0].width,Le[0].height,te.depth);for(let ee=0,pe=Le.length;ee<pe;ee++)if(he=Le[ee],v.format!==Sn)if(fe!==null)if(De){if(U)if(v.layerUpdates.size>0){const Me=Ac(he.width,he.height,v.format,v.type);for(const ie of v.layerUpdates){const Re=he.data.subarray(ie*Me/he.data.BYTES_PER_ELEMENT,(ie+1)*Me/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ie,he.width,he.height,1,fe,Re)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,te.depth,fe,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,me,he.width,he.height,te.depth,0,he.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,te.depth,fe,Ce,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,me,he.width,he.height,te.depth,0,fe,Ce,he.data)}else{De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ce,me,Le[0].width,Le[0].height);for(let ee=0,pe=Le.length;ee<pe;ee++)he=Le[ee],v.format!==Sn?fe!==null?De?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,me,he.width,he.height,0,he.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,fe,Ce,he.data):t.texImage2D(n.TEXTURE_2D,ee,me,he.width,he.height,0,fe,Ce,he.data)}else if(v.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,me,te.width,te.height,te.depth),U)if(v.layerUpdates.size>0){const ee=Ac(te.width,te.height,v.format,v.type);for(const pe of v.layerUpdates){const Me=te.data.subarray(pe*ee/te.data.BYTES_PER_ELEMENT,(pe+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pe,te.width,te.height,1,fe,Ce,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,Ce,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,fe,Ce,te.data);else if(v.isData3DTexture)De?(Fe&&t.texStorage3D(n.TEXTURE_3D,ce,me,te.width,te.height,te.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,Ce,te.data)):t.texImage3D(n.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,fe,Ce,te.data);else if(v.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(n.TEXTURE_2D,ce,me,te.width,te.height);else{let ee=te.width,pe=te.height;for(let Me=0;Me<ce;Me++)t.texImage2D(n.TEXTURE_2D,Me,me,ee,pe,0,fe,Ce,null),ee>>=1,pe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),f.add(v),ee.onpaint=pe=>{const Me=pe.changedElements;for(const ie of f)Me.includes(ie.image)&&(ie.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,ie=n.RGBA,Re=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,ie,Re,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Le.length>0){if(De&&Fe){const ee=tt(Le[0]);t.texStorage2D(n.TEXTURE_2D,ce,me,ee.width,ee.height)}for(let ee=0,pe=Le.length;ee<pe;ee++)he=Le[ee],De?U&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe,Ce,he):t.texImage2D(n.TEXTURE_2D,ee,me,fe,Ce,he);v.generateMipmaps=!1}else if(De){if(Fe){const ee=tt(te);t.texStorage2D(n.TEXTURE_2D,ce,me,ee.width,ee.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Ce,te)}else t.texImage2D(n.TEXTURE_2D,0,me,fe,Ce,te);g(v)&&w(W),ue.__version=le.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Ee(S,v,B){if(v.image.length!==6)return;const W=C(S,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+B);const le=i.get(Q);if(Q.version!==le.__version||W===!0){t.activeTexture(n.TEXTURE0+B);const ue=We.getPrimaries(We.workingColorSpace),j=v.colorSpace===yi?null:We.getPrimaries(v.colorSpace),te=v.colorSpace===yi||ue===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ce=v.image[0]&&v.image[0].isDataTexture,me=[];for(let ie=0;ie<6;ie++)!fe&&!Ce?me[ie]=m(v.image[ie],!0,s.maxCubemapSize):me[ie]=Ce?v.image[ie].image:v.image[ie],me[ie]=Yt(v,me[ie]);const he=me[0],Le=r.convert(v.format,v.colorSpace),De=r.convert(v.type),Fe=b(v.internalFormat,Le,De,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,ce=le.__version===void 0||W===!0,ee=Q.dataReady;let pe=T(v,he);Z(n.TEXTURE_CUBE_MAP,v);let Me;if(fe){U&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Fe,he.width,he.height);for(let ie=0;ie<6;ie++){Me=me[ie].mipmaps;for(let Re=0;Re<Me.length;Re++){const Te=Me[Re];v.format!==Sn?Le!==null?U?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re,0,0,Te.width,Te.height,Le,Te.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re,Fe,Te.width,Te.height,0,Te.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re,0,0,Te.width,Te.height,Le,De,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re,Fe,Te.width,Te.height,0,Le,De,Te.data)}}}else{if(Me=v.mipmaps,U&&ce){Me.length>0&&pe++;const ie=tt(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Fe,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Ce){U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,me[ie].width,me[ie].height,Le,De,me[ie].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Fe,me[ie].width,me[ie].height,0,Le,De,me[ie].data);for(let Re=0;Re<Me.length;Re++){const ht=Me[Re].image[ie].image;U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re+1,0,0,ht.width,ht.height,Le,De,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re+1,Fe,ht.width,ht.height,0,Le,De,ht.data)}}else{U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Le,De,me[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Fe,Le,De,me[ie]);for(let Re=0;Re<Me.length;Re++){const Te=Me[Re];U?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re+1,0,0,Le,De,Te.image[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Re+1,Fe,Le,De,Te.image[ie])}}}g(v)&&w(n.TEXTURE_CUBE_MAP),le.__version=Q.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function we(S,v,B,W,Q,le){const ue=r.convert(B.format,B.colorSpace),j=r.convert(B.type),te=b(B.internalFormat,ue,j,B.normalized,B.colorSpace),fe=i.get(v),Ce=i.get(B);if(Ce.__renderTarget=v,!fe.__hasExternalTextures){const me=Math.max(1,v.width>>le),he=Math.max(1,v.height>>le);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,le,te,me,he,v.depth,0,ue,j,null):t.texImage2D(Q,le,te,me,he,0,ue,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Q,Ce.__webglTexture,0,ft(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Q,Ce.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(S,v,B){if(n.bindRenderbuffer(n.RENDERBUFFER,S),v.depthBuffer){const W=v.depthTexture,Q=W&&W.isDepthTexture?W.type:null,le=R(v.stencilBuffer,Q),ue=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;bt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(v),le,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,S)}else{const W=v.textures;for(let Q=0;Q<W.length;Q++){const le=W[Q],ue=r.convert(le.format,le.colorSpace),j=r.convert(le.type),te=b(le.internalFormat,ue,j,le.normalized,le.colorSpace);bt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(v),te,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function re(S,v,B){const W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(v.depthTexture);if(Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),Z(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=r.convert(v.depthTexture.format),Ce=r.convert(v.depthTexture.type);let me;v.depthTexture.format===ai?me=n.DEPTH_COMPONENT24:v.depthTexture.format===Gi&&(me=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,me,v.width,v.height,0,fe,Ce,null)}}else ne(v.depthTexture,0);const le=Q.__webglTexture,ue=ft(v),j=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,te=v.depthTexture.format===Gi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ai)bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,j,le,0);else if(v.depthTexture.format===Gi)bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ve(S){const v=i.get(S),B=S.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==S.depthTexture){const W=S.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",Q)};W.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=W}if(S.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)re(v.__webglFramebuffer[W],S,W);else{const W=S.texture.mipmaps;W&&W.length>0?re(v.__webglFramebuffer[0],S,0):re(v.__webglFramebuffer,S,0)}else if(B){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),oe(v.__webglDepthbuffer[W],S,!1);else{const Q=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,le)}}else{const W=S.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),oe(v.__webglDepthbuffer,S,!1);else{const Q=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(S,v,B){const W=i.get(S);v!==void 0&&we(W.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ve(S)}function Ze(S){const v=S.texture,B=i.get(S),W=i.get(v);S.addEventListener("dispose",_);const Q=S.textures,le=S.isWebGLCubeRenderTarget===!0,ue=Q.length>1;if(ue||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let te=0;te<v.mipmaps.length;te++)B.__webglFramebuffer[j][te]=n.createFramebuffer()}else B.__webglFramebuffer[j]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<v.mipmaps.length;j++)B.__webglFramebuffer[j]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ue)for(let j=0,te=Q.length;j<te;j++){const fe=i.get(Q[j]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&bt(S)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<Q.length;j++){const te=Q[j];B.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[j]);const fe=r.convert(te.format,te.colorSpace),Ce=r.convert(te.type),me=b(te.internalFormat,fe,Ce,te.normalized,te.colorSpace,S.isXRRenderTarget===!0),he=ft(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,me,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,B.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),oe(B.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Z(n.TEXTURE_CUBE_MAP,v);for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(B.__webglFramebuffer[j][te],S,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,te);else we(B.__webglFramebuffer[j],S,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);g(v)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let j=0,te=Q.length;j<te;j++){const fe=Q[j],Ce=i.get(fe);let me=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(me=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,Ce.__webglTexture),Z(me,fe),we(B.__webglFramebuffer,S,fe,n.COLOR_ATTACHMENT0+j,me,0),g(fe)&&w(me)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(j=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,W.__webglTexture),Z(j,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)we(B.__webglFramebuffer[te],S,v,n.COLOR_ATTACHMENT0,j,te);else we(B.__webglFramebuffer,S,v,n.COLOR_ATTACHMENT0,j,0);g(v)&&w(j),t.unbindTexture()}S.depthBuffer&&Ve(S)}function Mt(S){const v=S.textures;for(let B=0,W=v.length;B<W;B++){const Q=v[B];if(g(Q)){const le=I(S),ue=i.get(Q).__webglTexture;t.bindTexture(le,ue),w(le),t.unbindTexture()}}}const Et=[],It=[];function Ft(S){if(S.samples>0){if(bt(S)===!1){const v=S.textures,B=S.width,W=S.height;let Q=n.COLOR_BUFFER_BIT;const le=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(S),j=v.length>1;if(j)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const te=S.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Ce=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ce,0)}n.blitFramebuffer(0,0,B,W,0,0,B,W,Q,n.NEAREST),l===!0&&(Et.length=0,It.length=0,Et.push(n.COLOR_ATTACHMENT0+fe),S.depthBuffer&&S.resolveDepthBuffer===!1&&(Et.push(le),It.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,It)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Ce=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const v=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ft(S){return Math.min(s.maxSamples,S.samples)}function bt(S){const v=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function F(S){const v=a.render.frame;u.get(S)!==v&&(u.set(S,v),S.update())}function Yt(S,v){const B=S.colorSpace,W=S.format,Q=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||B!==Kr&&B!==yi&&(We.getTransfer(B)===it?(W!==Sn||Q!==sn)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",B)),v}function tt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=J,this.getTextureUnits=Y,this.setTextureUnits=G,this.setTexture2D=ne,this.setTexture2DArray=ae,this.setTexture3D=de,this.setTextureCube=ve,this.rebindTextures=je,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=we,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function rv(n,e){function t(i,s=yi){let r;const a=We.getTransfer(s);if(i===sn)return n.UNSIGNED_BYTE;if(i===pl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ml)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ru)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Au)return n.BYTE;if(i===wu)return n.SHORT;if(i===js)return n.UNSIGNED_SHORT;if(i===hl)return n.INT;if(i===Vn)return n.UNSIGNED_INT;if(i===yn)return n.FLOAT;if(i===ri)return n.HALF_FLOAT;if(i===Pu)return n.ALPHA;if(i===Iu)return n.RGB;if(i===Sn)return n.RGBA;if(i===ai)return n.DEPTH_COMPONENT;if(i===Gi)return n.DEPTH_STENCIL;if(i===gl)return n.RED;if(i===vl)return n.RED_INTEGER;if(i===qi)return n.RG;if(i===_l)return n.RG_INTEGER;if(i===xl)return n.RGBA_INTEGER;if(i===kr||i===Br||i===zr||i===Gr)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_o||i===xo||i===Mo||i===bo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===bo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yo||i===So||i===Eo||i===To||i===Ao||i===qr||i===wo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===yo||i===So)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Eo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===To)return r.COMPRESSED_R11_EAC;if(i===Ao)return r.COMPRESSED_SIGNED_R11_EAC;if(i===qr)return r.COMPRESSED_RG11_EAC;if(i===wo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ro||i===Co||i===Po||i===Io||i===Lo||i===Do||i===Uo||i===No||i===Fo||i===Oo||i===ko||i===Bo||i===zo||i===Go)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ro)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Co)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Po)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Io)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Lo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Do)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Uo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===No)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ko)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Go)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ho||i===Vo||i===$o)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ho)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$o)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wo||i===Xo||i===Yr||i===qo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Wo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===er?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ov=`
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

}`;class lv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new zu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $n({vertexShader:av,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nt(new Ls(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cv extends Ki{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,p=null;const x=typeof XRWebGLBinding<"u",m=new lv,g={},w=t.getContextAttributes();let I=null,b=null;const R=[],T=[],P=new $e;let _=null;const A=new xn;A.viewport=new dt;const N=new xn;N.viewport=new dt;const L=[A,N],k=new _h;let J=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let V=R[C];return V===void 0&&(V=new Sa,R[C]=V),V.getTargetRaySpace()},this.getControllerGrip=function(C){let V=R[C];return V===void 0&&(V=new Sa,R[C]=V),V.getGripSpace()},this.getHand=function(C){let V=R[C];return V===void 0&&(V=new Sa,R[C]=V),V.getHandSpace()};function G(C){const V=T.indexOf(C.inputSource);if(V===-1)return;const y=R[V];y!==void 0&&(y.update(C.inputSource,C.frame,c||a),y.dispatchEvent({type:C.type,data:C.inputSource}))}function K(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",X);for(let C=0;C<R.length;C++){const V=T[C];V!==null&&(T[C]=null,R[C].disconnect(V))}J=null,Y=null,m.reset();for(const C in g)delete g[C];e.setRenderTarget(I),h=null,d=null,f=null,s=null,b=null,Z.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){r=C,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){o=C,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(C){c=C},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(C){if(s=C,s!==null){if(I=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",K),s.addEventListener("inputsourceschange",X),w.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let y=null,se=null,Ee=null;w.depth&&(Ee=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,y=w.stencil?Gi:ai,se=w.stencil?er:Vn);const we={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(we),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Hn(d.textureWidth,d.textureHeight,{format:Sn,type:sn,depthTexture:new As(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,y),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const y={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,y),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new Hn(h.framebufferWidth,h.framebufferHeight,{format:Sn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Z.setContext(s),Z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(C){for(let V=0;V<C.removed.length;V++){const y=C.removed[V],se=T.indexOf(y);se>=0&&(T[se]=null,R[se].disconnect(y))}for(let V=0;V<C.added.length;V++){const y=C.added[V];let se=T.indexOf(y);if(se===-1){for(let we=0;we<R.length;we++)if(we>=T.length){T.push(y),se=we;break}else if(T[we]===null){T[we]=y,se=we;break}if(se===-1)break}const Ee=R[se];Ee&&Ee.connect(y)}}const ne=new z,ae=new z;function de(C,V,y){ne.setFromMatrixPosition(V.matrixWorld),ae.setFromMatrixPosition(y.matrixWorld);const se=ne.distanceTo(ae),Ee=V.projectionMatrix.elements,we=y.projectionMatrix.elements,oe=Ee[14]/(Ee[10]-1),re=Ee[14]/(Ee[10]+1),Ve=(Ee[9]+1)/Ee[5],je=(Ee[9]-1)/Ee[5],Ze=(Ee[8]-1)/Ee[0],Mt=(we[8]+1)/we[0],Et=oe*Ze,It=oe*Mt,Ft=se/(-Ze+Mt),ft=Ft*-Ze;if(V.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(ft),C.translateZ(Ft),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert(),Ee[10]===-1)C.projectionMatrix.copy(V.projectionMatrix),C.projectionMatrixInverse.copy(V.projectionMatrixInverse);else{const bt=oe+Ft,F=re+Ft,Yt=Et-ft,tt=It+(se-ft),S=Ve*re/F*bt,v=je*re/F*bt;C.projectionMatrix.makePerspective(Yt,tt,S,v,bt,F),C.projectionMatrixInverse.copy(C.projectionMatrix).invert()}}function ve(C,V){V===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(V.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(s===null)return;let V=C.near,y=C.far;m.texture!==null&&(m.depthNear>0&&(V=m.depthNear),m.depthFar>0&&(y=m.depthFar)),k.near=N.near=A.near=V,k.far=N.far=A.far=y,(J!==k.near||Y!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),J=k.near,Y=k.far),k.layers.mask=C.layers.mask|6,A.layers.mask=k.layers.mask&-5,N.layers.mask=k.layers.mask&-3;const se=C.parent,Ee=k.cameras;ve(k,se);for(let we=0;we<Ee.length;we++)ve(Ee[we],se);Ee.length===2?de(k,A,N):k.projectionMatrix.copy(A.projectionMatrix),ye(C,k,se)};function ye(C,V,y){y===null?C.matrix.copy(V.matrixWorld):(C.matrix.copy(y.matrixWorld),C.matrix.invert(),C.matrix.multiply(V.matrixWorld)),C.matrix.decompose(C.position,C.quaternion,C.scale),C.updateMatrixWorld(!0),C.projectionMatrix.copy(V.projectionMatrix),C.projectionMatrixInverse.copy(V.projectionMatrixInverse),C.isPerspectiveCamera&&(C.fov=Ko*2*Math.atan(1/C.projectionMatrix.elements[5]),C.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(C){l=C,d!==null&&(d.fixedFoveation=C),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=C)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(C){return g[C]};let qe=null;function ut(C,V){if(u=V.getViewerPose(c||a),p=V,u!==null){const y=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let se=!1;y.length!==k.cameras.length&&(k.cameras.length=0,se=!0);for(let re=0;re<y.length;re++){const Ve=y[re];let je=null;if(h!==null)je=h.getViewport(Ve);else{const Mt=f.getViewSubImage(d,Ve);je=Mt.viewport,re===0&&(e.setRenderTargetTextures(b,Mt.colorTexture,Mt.depthStencilTexture),e.setRenderTarget(b))}let Ze=L[re];Ze===void 0&&(Ze=new xn,Ze.layers.enable(re),Ze.viewport=new dt,L[re]=Ze),Ze.matrix.fromArray(Ve.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Ve.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(je.x,je.y,je.width,je.height),re===0&&(k.matrix.copy(Ze.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),se===!0&&k.cameras.push(Ze)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const re=f.getDepthInformation(y[0]);re&&re.isValid&&re.texture&&m.init(re,s.renderState)}if(Ee&&Ee.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let re=0;re<y.length;re++){const Ve=y[re].camera;if(Ve){let je=g[Ve];je||(je=new zu,g[Ve]=je);const Ze=f.getCameraImage(Ve);je.sourceTexture=Ze}}}}for(let y=0;y<R.length;y++){const se=T[y],Ee=R[y];se!==null&&Ee!==void 0&&Ee.update(se,V,c||a)}qe&&qe(C,V),V.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:V}),p=null}const Z=new Wu;Z.setAnimationLoop(ut),this.setAnimationLoop=function(C){qe=C},this.dispose=function(){}}}const uv=new ot,Qu=new Ne;Qu.set(-1,0,0,0,1,0,0,0,1);function dv(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Gu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,w,I,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&h(m,g,b)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,w,I):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Qt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Qt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const w=e.get(g),I=w.envMap,b=w.envMapRotation;I&&(m.envMap.value=I,m.envMapRotation.value.setFromMatrix4(uv.makeRotationFromEuler(b)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Qu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,w,I){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*w,m.scale.value=I*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function h(m,g,w){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Qt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){const w=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function fv(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,R){const T=R.program;i.uniformBlockBinding(b,T)}function c(b,R){let T=s[b.id];T===void 0&&(m(b),T=u(b),s[b.id]=T,b.addEventListener("dispose",w));const P=R.program;i.updateUBOMapping(b,P);const _=e.render.frame;r[b.id]!==_&&(d(b),r[b.id]=_)}function u(b){const R=f();b.__bindingPointIndex=R;const T=n.createBuffer(),P=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,T),T}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const R=s[b.id],T=b.uniforms,P=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let _=0,A=T.length;_<A;_++){const N=T[_];if(Array.isArray(N))for(let L=0,k=N.length;L<k;L++)h(N[L],_,L,P);else h(N,_,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(b,R,T,P){if(x(b,R,T,P)===!0){const _=b.__offset,A=b.value;if(Array.isArray(A)){let N=0;for(let L=0;L<A.length;L++){const k=A[L],J=g(k);p(k,b.__data,N),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(N+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(A,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function p(b,R,T){typeof b=="number"||typeof b=="boolean"?R[0]=b:b.isMatrix3?(R[0]=b.elements[0],R[1]=b.elements[1],R[2]=b.elements[2],R[3]=0,R[4]=b.elements[3],R[5]=b.elements[4],R[6]=b.elements[5],R[7]=0,R[8]=b.elements[6],R[9]=b.elements[7],R[10]=b.elements[8],R[11]=0):ArrayBuffer.isView(b)?R.set(new b.constructor(b.buffer,b.byteOffset,R.length)):b.toArray(R,T)}function x(b,R,T,P){const _=b.value,A=R+"_"+T;if(P[A]===void 0)return typeof _=="number"||typeof _=="boolean"?P[A]=_:ArrayBuffer.isView(_)?P[A]=_.slice():P[A]=_.clone(),!0;{const N=P[A];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return P[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function m(b){const R=b.uniforms;let T=0;const P=16;for(let A=0,N=R.length;A<N;A++){const L=Array.isArray(R[A])?R[A]:[R[A]];for(let k=0,J=L.length;k<J;k++){const Y=L[k],G=Array.isArray(Y.value)?Y.value:[Y.value];for(let K=0,X=G.length;K<X;K++){const ne=G[K],ae=g(ne),de=T%P,ve=de%ae.boundary,ye=de+ve;T+=ve,ye!==0&&P-ye<ae.storage&&(T+=P-ye),Y.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=T,T+=ae.storage}}}const _=T%P;return _>0&&(T+=P-_),b.__size=T,b.__cache={},this}function g(b){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=48,R.storage=48):b.isMatrix4?(R.boundary=64,R.storage=64):b.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",b),R}function w(b){const R=b.target;R.removeEventListener("dispose",w);const T=a.indexOf(R.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function I(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:I}}const hv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Dn=null;function pv(){return Dn===null&&(Dn=new El(hv,16,16,qi,ri),Dn.name="DFG_LUT",Dn.minFilter=Ht,Dn.magFilter=Ht,Dn.wrapS=ti,Dn.wrapT=ti,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}class mv{constructor(e={}){const{canvas:t=Lf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=sn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=h,m=new Set([xl,_l,vl]),g=new Set([sn,Vn,js,er,pl,ml]),w=new Uint32Array(4),I=new Int32Array(4),b=new z;let R=null,T=null;const P=[],_=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let L=!1,k=null,J=null,Y=null,G=null;this._outputColorSpace=Zt;let K=0,X=0,ne=null,ae=-1,de=null;const ve=new dt,ye=new dt;let qe=null;const ut=new Ke(0);let Z=0,C=t.width,V=t.height,y=1,se=null,Ee=null;const we=new dt(0,0,C,V),oe=new dt(0,0,C,V);let re=!1;const Ve=new Tl;let je=!1,Ze=!1;const Mt=new ot,Et=new z,It=new dt,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function bt(){return ne===null?y:1}let F=i;function Yt(M,O){return t.getContext(M,O)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${dl}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",Rn,!1),F===null){const O="webgl2";if(F=Yt(O,M),F===null)throw Yt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Ye("WebGLRenderer: "+M.message),M}let tt,S,v,B,W,Q,le,ue,j,te,fe,Ce,me,he,Le,De,Fe,U,ce,ee,pe,Me,ie;function Re(){tt=new p0(F),tt.init(),pe=new rv(F,tt),S=new a0(F,tt,e,pe),v=new iv(F,tt),S.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),J=F.createFramebuffer(),Y=F.createFramebuffer(),G=F.createFramebuffer(),B=new v0(F),W=new Vg,Q=new sv(F,tt,v,W,S,pe,B),le=new h0(N),ue=new bh(F),Me=new s0(F,ue),j=new m0(F,ue,B,Me),te=new x0(F,j,ue,Me,B),U=new _0(F,S,Q),Le=new o0(W),fe=new Hg(N,le,tt,S,Me,Le),Ce=new dv(N,W),me=new Wg,he=new Jg(tt),Fe=new i0(N,le,v,te,p,l),De=new nv(N,te,S),ie=new fv(F,B,S,v),ce=new r0(F,tt,B),ee=new g0(F,tt,B),B.programs=fe.programs,N.capabilities=S,N.extensions=tt,N.properties=W,N.renderLists=me,N.shadowMap=De,N.state=v,N.info=B}Re(),x!==sn&&(A=new b0(x,t.width,t.height,o,s,r));const Te=new cv(N,F);this.xr=Te,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const M=tt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=tt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return y},this.setPixelRatio=function(M){M!==void 0&&(y=M,this.setSize(C,V,!1))},this.getSize=function(M){return M.set(C,V)},this.setSize=function(M,O,q=!0){if(Te.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}C=M,V=O,t.width=Math.floor(M*y),t.height=Math.floor(O*y),q===!0&&(t.style.width=M+"px",t.style.height=O+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(C*y,V*y).floor()},this.setDrawingBufferSize=function(M,O,q){C=M,V=O,y=q,t.width=Math.floor(M*q),t.height=Math.floor(O*q),this.setViewport(0,0,M,O)},this.setEffects=function(M){if(x===sn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let O=0;O<M.length;O++)if(M[O].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ve)},this.getViewport=function(M){return M.copy(we)},this.setViewport=function(M,O,q,H){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,O,q,H),v.viewport(ve.copy(we).multiplyScalar(y).round())},this.getScissor=function(M){return M.copy(oe)},this.setScissor=function(M,O,q,H){M.isVector4?oe.set(M.x,M.y,M.z,M.w):oe.set(M,O,q,H),v.scissor(ye.copy(oe).multiplyScalar(y).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(M){v.setScissorTest(re=M)},this.setOpaqueSort=function(M){se=M},this.setTransparentSort=function(M){Ee=M},this.getClearColor=function(M){return M.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(M=!0,O=!0,q=!0){let H=0;if(M){let $=!1;if(ne!==null){const xe=ne.texture.format;$=m.has(xe)}if($){const xe=ne.texture.type,Se=g.has(xe),_e=Fe.getClearColor(),Ae=Fe.getClearAlpha(),Pe=_e.r,Oe=_e.g,ze=_e.b;Se?(w[0]=Pe,w[1]=Oe,w[2]=ze,w[3]=Ae,F.clearBufferuiv(F.COLOR,0,w)):(I[0]=Pe,I[1]=Oe,I[2]=ze,I[3]=Ae,F.clearBufferiv(F.COLOR,0,I))}else H|=F.COLOR_BUFFER_BIT}O&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),k=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Rn,!1),Fe.dispose(),me.dispose(),he.dispose(),W.dispose(),le.dispose(),te.dispose(),Me.dispose(),ie.dispose(),fe.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",Pl),Te.removeEventListener("sessionend",Il),Ri.stop()};function ht(M){M.preventDefault(),tc("WebGLRenderer: Context Lost."),L=!0}function lt(){tc("WebGLRenderer: Context Restored."),L=!1;const M=B.autoReset,O=De.enabled,q=De.autoUpdate,H=De.needsUpdate,$=De.type;Re(),B.autoReset=M,De.enabled=O,De.autoUpdate=q,De.needsUpdate=H,De.type=$}function Rn(M){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Cn(M){const O=M.target;O.removeEventListener("dispose",Cn),td(O)}function td(M){nd(M),W.remove(M)}function nd(M){const O=W.get(M).programs;O!==void 0&&(O.forEach(function(q){fe.releaseProgram(q)}),M.isShaderMaterial&&fe.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,q,H,$,xe){O===null&&(O=Ft);const Se=$.isMesh&&$.matrixWorld.determinantAffine()<0,_e=rd(M,O,q,H,$);v.setMaterial(H,Se);let Ae=q.index,Pe=1;if(H.wireframe===!0){if(Ae=j.getWireframeAttribute(q),Ae===void 0)return;Pe=2}const Oe=q.drawRange,ze=q.attributes.position;let Ie=Oe.start*Pe,st=(Oe.start+Oe.count)*Pe;xe!==null&&(Ie=Math.max(Ie,xe.start*Pe),st=Math.min(st,(xe.start+xe.count)*Pe)),Ae!==null?(Ie=Math.max(Ie,0),st=Math.min(st,Ae.count)):ze!=null&&(Ie=Math.max(Ie,0),st=Math.min(st,ze.count));const vt=st-Ie;if(vt<0||vt===1/0)return;Me.setup($,H,_e,q,Ae);let pt,rt=ce;if(Ae!==null&&(pt=ue.get(Ae),rt=ee,rt.setIndex(pt)),$.isMesh)H.wireframe===!0?(v.setLineWidth(H.wireframeLinewidth*bt()),rt.setMode(F.LINES)):rt.setMode(F.TRIANGLES);else if($.isLine){let Bt=H.linewidth;Bt===void 0&&(Bt=1),v.setLineWidth(Bt*bt()),$.isLineSegments?rt.setMode(F.LINES):$.isLineLoop?rt.setMode(F.LINE_LOOP):rt.setMode(F.LINE_STRIP)}else $.isPoints?rt.setMode(F.POINTS):$.isSprite&&rt.setMode(F.TRIANGLES);if($.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))rt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Bt=$._multiDrawStarts,be=$._multiDrawCounts,jt=$._multiDrawCount,Je=Ae?ue.get(Ae).bytesPerElement:1,rn=W.get(H).currentProgram.getUniforms();for(let Pn=0;Pn<jt;Pn++)rn.setValue(F,"_gl_DrawID",Pn),rt.render(Bt[Pn]/Je,be[Pn])}else if($.isInstancedMesh)rt.renderInstances(Ie,vt,$.count);else if(q.isInstancedBufferGeometry){const Bt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,be=Math.min(q.instanceCount,Bt);rt.renderInstances(Ie,vt,be)}else rt.render(Ie,vt)};function Cl(M,O,q){M.transparent===!0&&M.side===Qn&&M.forceSinglePass===!1?(M.side=Qt,M.needsUpdate=!0,cr(M,O,q),M.side=Ai,M.needsUpdate=!0,cr(M,O,q),M.side=Qn):cr(M,O,q)}this.compile=function(M,O,q=null){q===null&&(q=M),T=he.get(q),T.init(O),_.push(T),q.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),M!==q&&M.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights();const H=new Set;return M.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const xe=$.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){const _e=xe[Se];Cl(_e,q,$),H.add(_e)}else Cl(xe,q,$),H.add(xe)}),T=_.pop(),H},this.compileAsync=function(M,O,q=null){const H=this.compile(M,O,q);return new Promise($=>{function xe(){if(H.forEach(function(Se){W.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){$(M);return}setTimeout(xe,10)}tt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let ca=null;function id(M){ca&&ca(M)}function Pl(){Ri.stop()}function Il(){Ri.start()}const Ri=new Wu;Ri.setAnimationLoop(id),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(M){ca=M,Te.setAnimationLoop(M),M===null?Ri.stop():Ri.start()},Te.addEventListener("sessionstart",Pl),Te.addEventListener("sessionend",Il),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;k!==null&&k.renderStart(M,O);const q=Te.enabled===!0&&Te.isPresenting===!0,H=A!==null&&(ne===null||q)&&A.begin(N,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(O),O=Te.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,O,ne),T=he.get(M,_.length),T.init(O),T.state.textureUnits=Q.getTextureUnits(),_.push(T),Mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ve.setFromProjectionMatrix(Mt,Bn,O.reversedDepth),Ze=this.localClippingEnabled,je=Le.init(this.clippingPlanes,Ze),R=me.get(M,P.length),R.init(),P.push(R),Te.enabled===!0&&Te.isPresenting===!0){const Se=N.xr.getDepthSensingMesh();Se!==null&&ua(Se,O,-1/0,N.sortObjects)}ua(M,O,0,N.sortObjects),R.finish(),N.sortObjects===!0&&R.sort(se,Ee,O.reversedDepth),ft=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,ft&&Fe.addToRenderList(R,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),je===!0&&Le.beginShadows();const $=T.state.shadowsArray;if(De.render($,M,O),je===!0&&Le.endShadows(),(H&&A.hasRenderPass())===!1){const Se=R.opaque,_e=R.transmissive;if(T.setupLights(),O.isArrayCamera){const Ae=O.cameras;if(_e.length>0)for(let Pe=0,Oe=Ae.length;Pe<Oe;Pe++){const ze=Ae[Pe];Dl(Se,_e,M,ze)}ft&&Fe.render(M);for(let Pe=0,Oe=Ae.length;Pe<Oe;Pe++){const ze=Ae[Pe];Ll(R,M,ze,ze.viewport)}}else _e.length>0&&Dl(Se,_e,M,O),ft&&Fe.render(M),Ll(R,M,O)}ne!==null&&X===0&&(Q.updateMultisampleRenderTarget(ne),Q.updateRenderTargetMipmap(ne)),H&&A.end(N),M.isScene===!0&&M.onAfterRender(N,M,O),Me.resetDefaultState(),ae=-1,de=null,_.pop(),_.length>0?(T=_[_.length-1],Q.setTextureUnits(T.state.textureUnits),je===!0&&Le.setGlobalState(N.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,k!==null&&k.renderEnd()};function ua(M,O,q,H){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ve.intersectsSprite(M)){H&&It.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Mt);const Se=te.update(M),_e=M.material;_e.visible&&R.push(M,Se,_e,q,It.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ve.intersectsObject(M))){const Se=te.update(M),_e=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),It.copy(M.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),It.copy(Se.boundingSphere.center)),It.applyMatrix4(M.matrixWorld).applyMatrix4(Mt)),Array.isArray(_e)){const Ae=Se.groups;for(let Pe=0,Oe=Ae.length;Pe<Oe;Pe++){const ze=Ae[Pe],Ie=_e[ze.materialIndex];Ie&&Ie.visible&&R.push(M,Se,Ie,q,It.z,ze)}}else _e.visible&&R.push(M,Se,_e,q,It.z,null)}}const xe=M.children;for(let Se=0,_e=xe.length;Se<_e;Se++)ua(xe[Se],O,q,H)}function Ll(M,O,q,H){const{opaque:$,transmissive:xe,transparent:Se}=M;T.setupLightsView(q),je===!0&&Le.setGlobalState(N.clippingPlanes,q),H&&v.viewport(ve.copy(H)),$.length>0&&lr($,O,q),xe.length>0&&lr(xe,O,q),Se.length>0&&lr(Se,O,q),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Dl(M,O,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Ie=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new Hn(1,1,{generateMipmaps:!0,type:Ie?ri:sn,minFilter:zi,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace})}const xe=T.state.transmissionRenderTarget[H.id],Se=H.viewport||ve;xe.setSize(Se.z*N.transmissionResolutionScale,Se.w*N.transmissionResolutionScale);const _e=N.getRenderTarget(),Ae=N.getActiveCubeFace(),Pe=N.getActiveMipmapLevel();N.setRenderTarget(xe),N.getClearColor(ut),Z=N.getClearAlpha(),Z<1&&N.setClearColor(16777215,.5),N.clear(),ft&&Fe.render(q);const Oe=N.toneMapping;N.toneMapping=Gn;const ze=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),je===!0&&Le.setGlobalState(N.clippingPlanes,H),lr(M,q,H),Q.updateMultisampleRenderTarget(xe),Q.updateRenderTargetMipmap(xe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let st=0,vt=O.length;st<vt;st++){const pt=O[st],{object:rt,geometry:Bt,material:be,group:jt}=pt;if(be.side===Qn&&rt.layers.test(H.layers)){const Je=be.side;be.side=Qt,be.needsUpdate=!0,Ul(rt,q,H,Bt,be,jt),be.side=Je,be.needsUpdate=!0,Ie=!0}}Ie===!0&&(Q.updateMultisampleRenderTarget(xe),Q.updateRenderTargetMipmap(xe))}N.setRenderTarget(_e,Ae,Pe),N.setClearColor(ut,Z),ze!==void 0&&(H.viewport=ze),N.toneMapping=Oe}function lr(M,O,q){const H=O.isScene===!0?O.overrideMaterial:null;for(let $=0,xe=M.length;$<xe;$++){const Se=M[$],{object:_e,geometry:Ae,group:Pe}=Se;let Oe=Se.material;Oe.allowOverride===!0&&H!==null&&(Oe=H),_e.layers.test(q.layers)&&Ul(_e,O,q,Ae,Oe,Pe)}}function Ul(M,O,q,H,$,xe){M.onBeforeRender(N,O,q,H,$,xe),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),$.onBeforeRender(N,O,q,H,M,xe),$.transparent===!0&&$.side===Qn&&$.forceSinglePass===!1?($.side=Qt,$.needsUpdate=!0,N.renderBufferDirect(q,O,H,$,M,xe),$.side=Ai,$.needsUpdate=!0,N.renderBufferDirect(q,O,H,$,M,xe),$.side=Qn):N.renderBufferDirect(q,O,H,$,M,xe),M.onAfterRender(N,O,q,H,$,xe)}function cr(M,O,q){O.isScene!==!0&&(O=Ft);const H=W.get(M),$=T.state.lights,xe=T.state.shadowsArray,Se=$.state.version,_e=fe.getParameters(M,$.state,xe,O,q,T.state.lightProbeGridArray),Ae=fe.getProgramCacheKey(_e);let Pe=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;const Oe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=le.get(M.envMap||H.environment,Oe),H.envMapRotation=H.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Pe===void 0&&(M.addEventListener("dispose",Cn),Pe=new Map,H.programs=Pe);let ze=Pe.get(Ae);if(ze!==void 0){if(H.currentProgram===ze&&H.lightsStateVersion===Se)return Fl(M,_e),ze}else _e.uniforms=fe.getUniforms(M),k!==null&&M.isNodeMaterial&&k.build(M,q,_e),M.onBeforeCompile(_e,N),ze=fe.acquireProgram(_e,Ae),Pe.set(Ae,ze),H.uniforms=_e.uniforms;const Ie=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ie.clippingPlanes=Le.uniform),Fl(M,_e),H.needsLights=od(M),H.lightsStateVersion=Se,H.needsLights&&(Ie.ambientLightColor.value=$.state.ambient,Ie.lightProbe.value=$.state.probe,Ie.directionalLights.value=$.state.directional,Ie.directionalLightShadows.value=$.state.directionalShadow,Ie.spotLights.value=$.state.spot,Ie.spotLightShadows.value=$.state.spotShadow,Ie.rectAreaLights.value=$.state.rectArea,Ie.ltc_1.value=$.state.rectAreaLTC1,Ie.ltc_2.value=$.state.rectAreaLTC2,Ie.pointLights.value=$.state.point,Ie.pointLightShadows.value=$.state.pointShadow,Ie.hemisphereLights.value=$.state.hemi,Ie.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ie.spotLightMatrix.value=$.state.spotLightMatrix,Ie.spotLightMap.value=$.state.spotLightMap,Ie.pointShadowMatrix.value=$.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=ze,H.uniformsList=null,ze}function Nl(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=Hr.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Fl(M,O){const q=W.get(M);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function sd(M,O){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(O.matrixWorld);for(let q=0,H=M.length;q<H;q++){const $=M[q];if($.texture!==null&&$.boundingBox.containsPoint(b))return $}return null}function rd(M,O,q,H,$){O.isScene!==!0&&(O=Ft),Q.resetTextureUnits();const xe=O.fog,Se=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,_e=ne===null?N.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:We.workingColorSpace,Ae=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Pe=le.get(H.envMap||Se,Ae),Oe=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ze=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!q.morphAttributes.position,st=!!q.morphAttributes.normal,vt=!!q.morphAttributes.color;let pt=Gn;H.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(pt=N.toneMapping);const rt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Bt=rt!==void 0?rt.length:0,be=W.get(H),jt=T.state.lights;if(je===!0&&(Ze===!0||M!==de)){const ct=M===de&&H.id===ae;Le.setState(H,M,ct)}let Je=!1;H.version===be.__version?(be.needsLights&&be.lightsStateVersion!==jt.state.version||be.outputColorSpace!==_e||$.isBatchedMesh&&be.batching===!1||!$.isBatchedMesh&&be.batching===!0||$.isBatchedMesh&&be.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&be.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&be.instancing===!1||!$.isInstancedMesh&&be.instancing===!0||$.isSkinnedMesh&&be.skinning===!1||!$.isSkinnedMesh&&be.skinning===!0||$.isInstancedMesh&&be.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&be.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&be.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&be.instancingMorph===!1&&$.morphTexture!==null||be.envMap!==Pe||H.fog===!0&&be.fog!==xe||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Le.numPlanes||be.numIntersection!==Le.numIntersection)||be.vertexAlphas!==Oe||be.vertexTangents!==ze||be.morphTargets!==Ie||be.morphNormals!==st||be.morphColors!==vt||be.toneMapping!==pt||be.morphTargetsCount!==Bt||!!be.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,be.__version=H.version);let rn=be.currentProgram;Je===!0&&(rn=cr(H,O,$),k&&H.isNodeMaterial&&k.onUpdateProgram(H,rn,be));let Pn=!1,ci=!1,Ji=!1;const at=rn.getUniforms(),_t=be.uniforms;if(v.useProgram(rn.program)&&(Pn=!0,ci=!0,Ji=!0),H.id!==ae&&(ae=H.id,ci=!0),be.needsLights){const ct=sd(T.state.lightProbeGridArray,$);be.lightProbeGrid!==ct&&(be.lightProbeGrid=ct,ci=!0)}if(Pn||de!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),at.setValue(F,"projectionMatrix",M.projectionMatrix),at.setValue(F,"viewMatrix",M.matrixWorldInverse);const di=at.map.cameraPosition;di!==void 0&&di.setValue(F,Et.setFromMatrixPosition(M.matrixWorld)),S.logarithmicDepthBuffer&&at.setValue(F,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&at.setValue(F,"isOrthographic",M.isOrthographicCamera===!0),de!==M&&(de=M,ci=!0,Ji=!0)}if(be.needsLights&&(jt.state.directionalShadowMap.length>0&&at.setValue(F,"directionalShadowMap",jt.state.directionalShadowMap,Q),jt.state.spotShadowMap.length>0&&at.setValue(F,"spotShadowMap",jt.state.spotShadowMap,Q),jt.state.pointShadowMap.length>0&&at.setValue(F,"pointShadowMap",jt.state.pointShadowMap,Q)),$.isSkinnedMesh){at.setOptional(F,$,"bindMatrix"),at.setOptional(F,$,"bindMatrixInverse");const ct=$.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),at.setValue(F,"boneTexture",ct.boneTexture,Q))}$.isBatchedMesh&&(at.setOptional(F,$,"batchingTexture"),at.setValue(F,"batchingTexture",$._matricesTexture,Q),at.setOptional(F,$,"batchingIdTexture"),at.setValue(F,"batchingIdTexture",$._indirectTexture,Q),at.setOptional(F,$,"batchingColorTexture"),$._colorsTexture!==null&&at.setValue(F,"batchingColorTexture",$._colorsTexture,Q));const ui=q.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&U.update($,q,rn),(ci||be.receiveShadow!==$.receiveShadow)&&(be.receiveShadow=$.receiveShadow,at.setValue(F,"receiveShadow",$.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(_t.envMapIntensity.value=O.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=pv()),ci){if(at.setValue(F,"toneMappingExposure",N.toneMappingExposure),be.needsLights&&ad(_t,Ji),xe&&H.fog===!0&&Ce.refreshFogUniforms(_t,xe),Ce.refreshMaterialUniforms(_t,H,y,V,T.state.transmissionRenderTarget[M.id]),be.needsLights&&be.lightProbeGrid){const ct=be.lightProbeGrid;_t.probesSH.value=ct.texture,_t.probesMin.value.copy(ct.boundingBox.min),_t.probesMax.value.copy(ct.boundingBox.max),_t.probesResolution.value.copy(ct.resolution)}Hr.upload(F,Nl(be),_t,Q)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Hr.upload(F,Nl(be),_t,Q),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&at.setValue(F,"center",$.center),at.setValue(F,"modelViewMatrix",$.modelViewMatrix),at.setValue(F,"normalMatrix",$.normalMatrix),at.setValue(F,"modelMatrix",$.matrixWorld),H.uniformsGroups!==void 0){const ct=H.uniformsGroups;for(let di=0,Qi=ct.length;di<Qi;di++){const Ol=ct[di];ie.update(Ol,rn),ie.bind(Ol,rn)}}return rn}function ad(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function od(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,O,q){const H=W.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=O,W.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,O){const q=W.get(M);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,q=0){ne=M,K=O,X=q;let H=null,$=!1,xe=!1;if(M){const _e=W.get(M);if(_e.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(F.FRAMEBUFFER,_e.__webglFramebuffer),ve.copy(M.viewport),ye.copy(M.scissor),qe=M.scissorTest,v.viewport(ve),v.scissor(ye),v.setScissorTest(qe),ae=-1;return}else if(_e.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(_e.__hasExternalTextures)Q.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Oe=M.depthTexture;if(_e.__boundDepthTexture!==Oe){if(Oe!==null&&W.has(Oe)&&(M.width!==Oe.image.width||M.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}const Ae=M.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(xe=!0);const Pe=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Pe[O])?H=Pe[O][q]:H=Pe[O],$=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?H=W.get(M).__webglMultisampledFramebuffer:Array.isArray(Pe)?H=Pe[q]:H=Pe,ve.copy(M.viewport),ye.copy(M.scissor),qe=M.scissorTest}else ve.copy(we).multiplyScalar(y).floor(),ye.copy(oe).multiplyScalar(y).floor(),qe=re;if(q!==0&&(H=J),v.bindFramebuffer(F.FRAMEBUFFER,H)&&v.drawBuffers(M,H),v.viewport(ve),v.scissor(ye),v.setScissorTest(qe),$){const _e=W.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,_e.__webglTexture,q)}else if(xe){const _e=O;for(let Ae=0;Ae<M.textures.length;Ae++){const Pe=W.get(M.textures[Ae]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ae,Pe.__webglTexture,q,_e)}}else if(M!==null&&q!==0){const _e=W.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_e.__webglTexture,q)}ae=-1},this.readRenderTargetPixels=function(M,O,q,H,$,xe,Se,_e=0){if(!(M&&M.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Ae=Ae[Se]),Ae){v.bindFramebuffer(F.FRAMEBUFFER,Ae);try{const Pe=M.textures[_e],Oe=Pe.format,ze=Pe.type;if(M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e),!S.textureFormatReadable(Oe)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!S.textureTypeReadable(ze)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-H&&q>=0&&q<=M.height-$&&F.readPixels(O,q,H,$,pe.convert(Oe),pe.convert(ze),xe)}finally{const Pe=ne!==null?W.get(ne).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(M,O,q,H,$,xe,Se,_e=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Ae=Ae[Se]),Ae)if(O>=0&&O<=M.width-H&&q>=0&&q<=M.height-$){v.bindFramebuffer(F.FRAMEBUFFER,Ae);const Pe=M.textures[_e],Oe=Pe.format,ze=Pe.type;if(M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e),!S.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!S.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.bufferData(F.PIXEL_PACK_BUFFER,xe.byteLength,F.STREAM_READ),F.readPixels(O,q,H,$,pe.convert(Oe),pe.convert(ze),0);const st=ne!==null?W.get(ne).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,st);const vt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Df(F,vt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,xe),F.deleteBuffer(Ie),F.deleteSync(vt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,O=null,q=0){const H=Math.pow(2,-q),$=Math.floor(M.image.width*H),xe=Math.floor(M.image.height*H),Se=O!==null?O.x:0,_e=O!==null?O.y:0;Q.setTexture2D(M,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Se,_e,$,xe),v.unbindTexture()},this.copyTextureToTexture=function(M,O,q=null,H=null,$=0,xe=0){let Se,_e,Ae,Pe,Oe,ze,Ie,st,vt;const pt=M.isCompressedTexture?M.mipmaps[xe]:M.image;if(q!==null)Se=q.max.x-q.min.x,_e=q.max.y-q.min.y,Ae=q.isBox3?q.max.z-q.min.z:1,Pe=q.min.x,Oe=q.min.y,ze=q.isBox3?q.min.z:0;else{const _t=Math.pow(2,-$);Se=Math.floor(pt.width*_t),_e=Math.floor(pt.height*_t),M.isDataArrayTexture?Ae=pt.depth:M.isData3DTexture?Ae=Math.floor(pt.depth*_t):Ae=1,Pe=0,Oe=0,ze=0}H!==null?(Ie=H.x,st=H.y,vt=H.z):(Ie=0,st=0,vt=0);const rt=pe.convert(O.format),Bt=pe.convert(O.type);let be;O.isData3DTexture?(Q.setTexture3D(O,0),be=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Q.setTexture2DArray(O,0),be=F.TEXTURE_2D_ARRAY):(Q.setTexture2D(O,0),be=F.TEXTURE_2D),v.activeTexture(F.TEXTURE0),v.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),v.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),v.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const jt=v.getParameter(F.UNPACK_ROW_LENGTH),Je=v.getParameter(F.UNPACK_IMAGE_HEIGHT),rn=v.getParameter(F.UNPACK_SKIP_PIXELS),Pn=v.getParameter(F.UNPACK_SKIP_ROWS),ci=v.getParameter(F.UNPACK_SKIP_IMAGES);v.pixelStorei(F.UNPACK_ROW_LENGTH,pt.width),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pt.height),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Pe),v.pixelStorei(F.UNPACK_SKIP_ROWS,Oe),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ze);const Ji=M.isDataArrayTexture||M.isData3DTexture,at=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){const _t=W.get(M),ui=W.get(O),ct=W.get(_t.__renderTarget),di=W.get(ui.__renderTarget);v.bindFramebuffer(F.READ_FRAMEBUFFER,ct.__webglFramebuffer),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let Qi=0;Qi<Ae;Qi++)Ji&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(M).__webglTexture,$,ze+Qi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(O).__webglTexture,xe,vt+Qi)),F.blitFramebuffer(Pe,Oe,Se,_e,Ie,st,Se,_e,F.DEPTH_BUFFER_BIT,F.NEAREST);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if($!==0||M.isRenderTargetTexture||W.has(M)){const _t=W.get(M),ui=W.get(O);v.bindFramebuffer(F.READ_FRAMEBUFFER,Y),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,G);for(let ct=0;ct<Ae;ct++)Ji?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,_t.__webglTexture,$,ze+ct):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_t.__webglTexture,$),at?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ui.__webglTexture,xe,vt+ct):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ui.__webglTexture,xe),$!==0?F.blitFramebuffer(Pe,Oe,Se,_e,Ie,st,Se,_e,F.COLOR_BUFFER_BIT,F.NEAREST):at?F.copyTexSubImage3D(be,xe,Ie,st,vt+ct,Pe,Oe,Se,_e):F.copyTexSubImage2D(be,xe,Ie,st,Pe,Oe,Se,_e);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else at?M.isDataTexture||M.isData3DTexture?F.texSubImage3D(be,xe,Ie,st,vt,Se,_e,Ae,rt,Bt,pt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(be,xe,Ie,st,vt,Se,_e,Ae,rt,pt.data):F.texSubImage3D(be,xe,Ie,st,vt,Se,_e,Ae,rt,Bt,pt):M.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,xe,Ie,st,Se,_e,rt,Bt,pt.data):M.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,xe,Ie,st,pt.width,pt.height,rt,pt.data):F.texSubImage2D(F.TEXTURE_2D,xe,Ie,st,Se,_e,rt,Bt,pt);v.pixelStorei(F.UNPACK_ROW_LENGTH,jt),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Je),v.pixelStorei(F.UNPACK_SKIP_PIXELS,rn),v.pixelStorei(F.UNPACK_SKIP_ROWS,Pn),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ci),xe===0&&O.generateMipmaps&&F.generateMipmap(be),v.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){K=0,X=0,ne=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}function Al(n){const t=new Uint8Array(65536);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const a=Math.sin(r*127.1+s*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(r*.5+Math.sin(s*.07)*2)+a*12:n==="cloth"?231+(r%2?7:-7)+(s%2?4:-4):228+12*Math.sin(r*.12+s*.075+Math.sin(s*.08)*3)+a*8,l=(s*128+r)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new El(t,128,128);return i.wrapS=i.wrapT=Xr,i.colorSpace=Zt,i.needsUpdate=!0,i}const jo=Al("wood"),ju=Al("stone"),Xs=Al("cloth"),E={stone:new xt({color:fi.materials.stone,map:ju,roughness:.72}),wall:new xt({color:fi.materials.wall,roughness:.88}),wood:new xt({color:fi.materials.wood,map:jo,roughness:.52}),walnut:new xt({color:fi.materials.darkWood,map:jo,roughness:.5}),gold:new xt({color:fi.materials.metal,metalness:.7,roughness:.36}),navy:new xt({color:fi.materials.blue,roughness:.65}),white:new xt({color:fi.materials.linen,map:Xs,roughness:.93}),teal:new xt({color:fi.materials.accent,map:Xs,roughness:.83}),rust:new xt({color:9920067,map:Xs,roughness:.84}),carpet:new xt({color:6845561,map:Xs,roughness:1}),black:new xt({color:1449508,roughness:.6}),green:new xt({color:3495746,roughness:.86}),leaf:new xt({color:6651984,roughness:.8}),glass:new xt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new xt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new xt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new xt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new xt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new xt({color:14000506,roughness:.9}),hair:new xt({color:2433314,roughness:.9}),ao:new ar({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},el=new Map;function gv(n){let e=el.get(n);return e||(e=new xt({color:n,roughness:.75}),el.set(n,e)),e}function vv(){Object.values(E).forEach(n=>n.dispose()),el.forEach(n=>n.dispose()),[jo,ju,Xs].forEach(n=>n.dispose())}const or={box:new Is(1,1,1),cylinder:new na(1,1,1,12),sphere:new Qr(1,12,8),leaf:new Qr(1,8,6),cone:new ia(1,1,16),plane:new Ls(1,1)};function D(n,e,t,i,s,r,a,o=E.wood){const l=new Nt(or.box,o);return l.position.set(e,t,i),l.scale.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function He(n,e,t,i,s,r,a=E.gold){const o=new Nt(or.cylinder,a);return o.position.set(e,t,i),o.scale.set(s,r,s),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Un(n,e,t,i,s,r,a,o=E.leaf){const l=new Nt(or.sphere,o);return l.position.set(e,t,i),l.scale.set(s,r,a),l.castShadow=!0,n.add(l),l}function oa(n,e,t,i,s,r=.022){const a=new Nt(or.plane,E.ao);a.rotation.x=-Math.PI/2,a.position.set(e,r,t),a.scale.set(i,s,1),n.add(a)}function Wt(n,e,t,i=1,s=0){const r=new Vt;r.position.set(e,s,t),r.scale.setScalar(i),n.add(r),He(r,0,.21,0,.21,.42,E.stone),He(r,0,.76,0,.027,1.1,E.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Un(r,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?E.leaf:E.green).rotation.set(.3,o,Math.sin(o)*.65)}return oa(r,0,0,.7,.55),r}function Nn(n,e,t,i,s=1){const r=new Vt;return r.position.set(e,t,i),r.scale.setScalar(s),n.add(r),He(r,0,.035,0,.11,.045,E.gold),He(r,0,.21,0,.019,.36,E.gold),He(r,0,.42,0,.16,.22,E.shade),He(r,0,.315,0,.135,.015,E.glow),r}function Hi(n,e,t,i=0,s=E.teal){const r=new Vt;r.position.set(e,0,t),r.rotation.y=i,n.add(r),D(r,0,.43,0,.55,.14,.56,s),D(r,0,.71,-.23,.55,.48,.1,s);for(const a of[-1,1])for(const o of[-1,1])He(r,a*.2,.2,o*.2,.025,.4,E.walnut);return r}function Zn(n,e,t,i=0,s=1.5,r=E.teal){const a=new Vt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),D(a,0,.32,0,s,.42,.64,r),D(a,0,.66,-.29,s,.65,.18,r);for(const o of[-1,1])D(a,o*(s/2-.08),.56,0,.16,.4,.7,r),D(a,o*s*.23,.55,-.17,.35,.28,.11,E.white);return D(a,0,.58,.04,s-.3,.11,.44,r),oa(a,0,0,s+.15,.95),a}function bi(n,e,t,i=.42){He(n,e,.37,t,.055,.74,E.gold),He(n,e,.75,t,i,.07,E.stone),He(n,e,.04,t,i*.5,.06,E.walnut)}function Ys(n,e,t,i){He(n,e,t,i,.07,.13,E.white),He(n,e,t-.065,i,.12,.018,E.white)}function Vi(n,e,t,i,s=1.15,r=.65,a=0){D(n,e,t,i,s+.07,r+.07,.06,E.gold),D(n,e,t,i+.04,s,r,.015,E.white),D(n,e,t-r*.14,i+.06,s*.93,r*.37,.012,a%2?E.teal:E.window),D(n,e-s*.2,t+r*.02,i+.07,s*.27,r*.25,.014,E.stone),Un(n,e+s*.25,t+r*.19,i+.075,r*.13,r*.13,.006,E.rust)}function _v(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Nt)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let s=e.get(i);s||(s={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,s)),s.matrices.push(t.matrixWorld.clone()),s.meshes.push(t)});for(const t of e.values()){const i=new ku(t.geometry,t.material,t.matrices.length);t.matrices.forEach((s,r)=>i.setMatrixAt(r,s)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(s=>s.removeFromParent()),n.add(i)}}function xv(n){const e=n.level??1,t=new Vt;t.name=n.id,t.userData.entityId=n.id,D(t,0,.04,0,4.7,.08,3.1,e>=4?E.stone:e>=2?E.walnut:E.wood),D(t,0,1.19,-1.51,4.7,2.38,.14,E.wall),D(t,2.35,1.14,-.1,.1,2.28,2.75,E.stone),D(t,1.6,1.25,-1.41,1.05,1.9,.035,E.window);for(const a of[1.1,1.6,2.1])D(t,a,1.25,-1.35,.035,1.94,.04,E.gold);D(t,1.6,1.25,-1.35,1.08,.04,.04,E.gold);for(let a=1.03;a<1.26;a+=.06)D(t,a,1.28,-1.23,.04,1.94,.13,E.white);if(D(t,0,2.27,-1.27,4.53,.06,.065,E.glow),n.construction){for(const a of[-1.8,0,1.8])D(t,a,1.05,1.5,.07,2.1,.07,E.gold),D(t,a,.4,.4,.65,.7,.7,E.stone);for(const a of[.5,1.4,2.15])D(t,0,a,1.5,4.5,.06,.06,E.gold);return D(t,0,.8,1.55,4.5,.48,.06,E.navy),t}if(n.status==="unbuilt")return D(t,0,.12,0,3.8,.08,2.5,E.stone),t;const i=jc(n),s=Qc(n)==="twin";D(t,-.67,.078,.07,2.85,.02,2.66,E.carpet);const r=(a,o)=>{D(t,a,.28,-.03,o+.09,.39,1.9,E.walnut),D(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?E.stone:E.white),D(t,a,.7,-.98,o+.13,1.22,.12,E.walnut),D(t,a,.82,-.89,o-.05,.63,.08,E.teal),D(t,a,.67,-.58,o*.82,.13,.36,E.white),e>=2&&(D(t,a,.78,-.72,o*.78,.12,.25,E.white),D(t,a,.655,.18,o,.045,.45,e>=4?E.white:E.teal)),D(t,a,.646,.54,o,.075,.39,e>=4?E.gold:i?E.rust:E.teal),D(t,a,.49,1,o,.28,.04,E.white),oa(t,a,0,o+.25,2.25)};s?(r(-1.36,.88),r(-.22,.88)):r(-.75,1.68);for(const a of[-1.94,.43])D(t,a,.35,-.76,.41,.58,.5,E.walnut),D(t,a,.66,-.76,.45,.06,.53,E.stone),Nn(t,a,.69,-.77,.8);if(Vi(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)D(t,1.65,.38,-.4,.9,.65,.85,E.stone),D(t,1.65,.73,-.4,.85,.08,.8,E.white),He(t,1.65,.83,-.65,.025,.22,E.gold),D(t,2.16,1.25,-.35,.025,1.8,1.5,E.glass),D(t,1.6,1.93,-1.14,.3,.04,.25,E.gold),Vi(t,1.5,1.6,-1.33,.8,.5,e),Zn(t,1.58,.76,-Math.PI/2,.75,E.white);else if(i)Zn(t,1.55,.22,-Math.PI/2,1.3,E.rust),bi(t,.97,.8,.25);else{D(t,1.61,.76,-.57,1.1,.1,.57,E.walnut);for(const a of[1.19,2.03])D(t,a,.37,-.57,.05,.75,.46,E.gold);D(t,1.59,.94,-.64,.35,.28,.04,E.screen),Hi(t,1.65,.06,Math.PI),Nn(t,2,.82,-.62,.66)}if(Ti(n)==="view"||Ti(n)==="premium"){D(t,0,1.45,-1.4,4.15,1.65,.025,E.window);for(const a of[-2,0,2])D(t,a,1.45,-1.35,.045,1.7,.045,E.gold)}if(Ti(n)==="premium"&&(D(t,0,2.1,-1.25,4.5,.08,.08,E.gold),Vi(t,-1.6,1.8,-1.3,.8,.4,99),Wt(t,1.95,.55,1.15)),n.extraBed&&(D(t,.5,.25,1.02,.8,.3,.8,E.walnut),D(t,.5,.43,1.02,.8,.08,.8,E.white)),Wt(t,2.05,1.05,.63),(n.level??1)>1&&(Vi(t,-2.05,1.6,-1.38,.38,.56,n.level),Wt(t,-2.05,.35,.55)),e>=3&&(Nn(t,-1.94,1.25,-.9,1.1),D(t,-.75,1.62,-1.25,2.1,.025,.03,E.glow)),e>=5){D(t,0,1.4,-1.42,4.3,1.9,.025,E.window);for(const a of[-2,-.8,.8,2])D(t,a,1.4,-1.35,.04,1.95,.06,E.gold);for(const a of[-1.8,0,1.8])D(t,a,.09,.15,.025,.02,2.9,E.gold);for(const a of[2.12,2.24])D(t,0,a,-1.1,4.5,.035,.035,E.glow)}if((n.level??1)>2&&D(t,0,2.12,-1.3,4.55,.035,.055,E.gold),D(t,-2.12,.52,.95,.22,1,.28,E.walnut),n.status==="reserved"&&(n.suaBookingId&&D(t,0,1.1,1.62,.38,.5,.05,E.rust),D(t,1.2,.48,1.48,.25,.29,.1,E.gold)),n.status==="cleaning"){D(t,1.05,.37,1.57,.55,.55,.35,E.navy);for(const a of[.83,1.27])He(t,a,.09,1.57,.07,.07,E.black);D(t,1.05,.71,1.57,.6,.04,.41,E.gold),D(t,.95,.79,1.57,.3,.12,.22,E.white)}if(n.status==="occupied"&&D(t,0,2.23,.7,3.8,.035,.035,E.shade),n.status==="maintenance"){const a=D(t,.9,1.95,1.55,.17,.17,.08,E.glow);a.name="fault-lamp",a.userData.interactive=!0,D(t,.6,.33,.9,.8,.1,.8,E.rust),D(t,.6,.52,.9,.1,.6,.1,E.gold)}return t}function Fr(n,e,t,i=2.12){He(n,e,i+.13,t,.012,.45,E.gold),He(n,e,i-.08,t,.24,.18,E.gold),He(n,e,i-.18,t,.21,.015,E.glow)}function Mv(n,e){if(D(n,0,1.2,-1.54,14.65,2.4,.14,E.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)D(n,t,1.2,-1.42,.035,2.38,.08,E.gold);else for(let t=-7;t<7;t+=.58)D(n,t,1.2,-1.43,.022,2.2,.04,E.wood)}function ms(n,e,t){D(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,E.window);for(let i=e;i<=t+.01;i+=.72)D(n,i,1.23,-1.32,.045,2.17,.06,E.gold);D(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,E.gold)}function bv(n,e,t){bi(n,e,t,.44),Hi(n,e-.63,t,Math.PI/2),Hi(n,e+.63,t,-Math.PI/2),Ys(n,e-.18,.87,t),Ys(n,e+.18,.87,t),He(n,e,.83,t,.065,.12,E.gold)}function qa(n,e,t){D(n,e,1.23,-1.35,t,1.86,.18,E.walnut);for(let i=.53;i<2;i+=.39){D(n,e,i,-1.14,t,.04,.42,E.gold),D(n,e,i+.035,-1.18,t-.1,.025,.05,E.glow);for(let s=0;s<Math.floor(t/.23);s++){const r=e-t/2+.16+s*.23;He(n,r,i+.13,-1.08,.048,.23,s%3?E.green:E.rust),He(n,r,i+.27,-1.08,.019,.07,E.gold)}}}function yv(n,e=1,t=100,i=!1){const s=new Vt;if(n!=="rooftop"&&(Mv(s,n),D(s,0,.04,0,14.66,.08,3.15,n==="lobby"?E.stone:E.wood),D(s,0,2.31,-1.21,14.5,.04,.07,E.glow)),i){for(const r of[-6,-3,0,3,6])D(s,r,1.1,1.4,.08,2.2,.08,E.gold);for(const r of[.5,1.5,2.1])D(s,0,r,1.4,14,.08,.08,E.gold);return D(s,0,.8,1.5,14,.65,.04,E.navy),s}if(n==="lobby"){ms(s,4.3,7.2),D(s,0,1.35,-1.33,6.7,1.8,.11,E.stone),D(s,0,.48,.5,6.2,.84,.62,E.walnut),D(s,0,.94,.5,6.45,.12,.83,E.stone),D(s,0,.15,.86,6.08,.075,.035,E.glow);for(let r=-2.9;r<3;r+=.18)D(s,r,.5,.824,.035,.6,.025,E.gold);for(const r of[-1.8,1.7])D(s,r,1.12,.2,.42,.29,.045,E.screen),Nn(s,r+.55,1.02,.46,.72);Wt(s,-3.9,-.7,1.72),Wt(s,4,-.55,1.6),Zn(s,-5.75,.08,Math.PI/2,1.65,E.white),bi(s,-5.02,1,.47),Wt(s,-6.4,1.4,.55),D(s,5.8,.045,1.18,2.2,.03,1.25,E.navy);for(const r of[4.65,6.95])D(s,r,1.13,.85,.08,2.28,.08,E.gold),D(s,r,1.17,.79,.65,2.18,.025,E.glass);D(s,5.8,2.18,1.24,2.6,.16,1.72,E.navy),D(s,5.8,2.08,2.03,2.55,.035,.04,E.gold);for(const r of[3.5,4.1])He(s,r,.67,1.8,.025,1.15,E.gold),He(s,r,.09,1.8,.08,.1,E.black);D(s,3.8,1.27,1.8,.65,.035,.04,E.gold),D(s,3.8,.18,1.8,.78,.08,.51,E.gold),D(s,3.76,.43,1.8,.37,.45,.25,E.rust);for(const r of[-2.8,0,2.8])Fr(s,r,.1,2.02)}else if(n==="breakfast"){ms(s,4.3,7.2),qa(s,0,4.5),D(s,0,.52,-.15,5,.9,.8,E.walnut),D(s,0,1.01,-.15,5.2,.12,.97,E.stone);for(const r of t>0?[-1.7,-.7,.3]:[])D(s,r,1.14,-.17,.66,.14,.45,E.gold),D(s,r,1.24,-.17,.6,.08,.38,E.white);D(s,1.5,1.29,-.24,.43,.53,.38,E.black),He(s,2.1,1.28,-.2,.15,.4,E.glass),He(s,2.1,1.13,-.2,.145,.09,E.rust);for(const r of[-5.55,-3.4,3.8,6])bv(s,r,.68);for(const r of[-5.55,-3.4,0,3.8,6])Fr(s,r,.5);Wt(s,-6.9,-.87,1.1),Wt(s,6.8,-.8,1.1)}else if(n==="club"){ms(s,-7.2,-3.8),ms(s,3.8,7.2),qa(s,0,5.4),D(s,0,.58,-.24,5.55,1.02,.58,E.walnut),D(s,0,1.12,-.24,5.8,.11,.79,E.stone),D(s,0,.25,.071,5.5,.05,.035,E.glow);for(const r of[-1.8,-.6,.6,1.8])He(s,r,.6,.6,.24,.12,E.teal),He(s,r,.28,.6,.035,.58,E.gold),t>0&&Ys(s,r,1.24,-.15),Fr(s,r,-.24);Zn(s,-5.6,-.54,0,2.05,E.teal),bi(s,-5.6,.57,.5),Hi(s,-4.38,.75,-Math.PI/3,E.rust),Zn(s,5.25,-.54,0,2.1,E.rust),bi(s,5.25,.6,.52),Hi(s,6.52,.7,-Math.PI/3,E.teal),Wt(s,-6.9,.68,1.2),Wt(s,6.9,-.8,1.25),Nn(s,-4.15,.05,-.8,1.6)}else if(n==="gym"){ms(s,-7.2,7.2),D(s,0,.093,0,14.4,.025,2.9,E.carpet);for(const r of[-5.65,-3.8,-1.95]){D(s,r,.16,.15,.92,.21,1.72,E.black),D(s,r,.28,.17,.68,.015,1.42,E.carpet);for(const a of[-1,1])D(s,r+a*.42,.7,-.51,.075,1.1,.08,E.black),D(s,r+a*.42,1.13,-.2,.06,.06,.75,E.black);D(s,r,1.26,-.5,.85,.23,.14,E.black),D(s,r,1.3,-.409,.43,.12,.012,E.screen)}for(const r of[.1,1.65]){const a=He(s,r,.41,.1,.36,.12,E.black);a.rotation.z=Math.PI/2,D(s,r,.39,.2,.07,.69,.09,E.gold),D(s,r,.81,.47,.37,.09,.24,E.black),D(s,r,1.05,-.32,.07,.55,.07,E.black),D(s,r,1.27,-.32,.5,.06,.07,E.gold)}D(s,5.45,.68,-.8,2.8,.07,.58,E.black);for(let r=4.2;r<6.8;r+=.46)He(s,r,.82,-.8,.13,.16,E.black);for(const r of[3.65,5.2])D(s,r,.12,.61,1.08,.025,1.68,E.teal);Wt(s,6.93,.82,1.2),D(s,2.76,.4,-.87,.6,.7,.53,E.walnut);for(let r=0;r<3;r++)D(s,2.76,.79+r*.065,-.87,.46,.065,.4,E.white)}else if(n==="spa"){ms(s,-7.2,7.2);for(const r of[-4.8,0,4.8]){D(s,r,.4,0,1.7,.6,2.05,E.walnut),D(s,r,.76,0,1.8,.14,2.1,E.white),D(s,r,.87,-.6,1.15,.12,.45,E.white),D(s,r,.86,.4,1.8,.03,.7,E.teal),Wt(s,r+1.2,-.9,1.1),Nn(s,r-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)D(s,r+1.2,.15+a*.06,.75,.5,.06,.32,E.white)}}else{D(s,0,.03,0,15,.14,3.6,E.wood);for(let r=-7.3;r<7.4;r+=.24)D(s,r,.11,0,.017,.006,3.45,E.walnut);for(const r of[-6.65,-2.45,2.8,6.9])Wt(s,r,-.8,1.45);for(const r of[-4.4,3.5]){bi(s,r,.45,.66),Hi(s,r-.9,.4,Math.PI/2,E.white),Hi(s,r+.9,.4,-Math.PI/2,E.white),Ys(s,r+.2,.88,.45),He(s,r,1.07,.45,.026,2.05,E.gold);const a=new Nt(new ia(1.55,.32,8),E.white);a.position.set(r,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,s.add(a)}Zn(s,-.5,-.7,0,1.7,E.teal),bi(s,-.5,.45,.38);for(const r of[-7.35,7.35])D(s,r,.43,0,.055,.8,3.5,E.gold);for(let r=-7.3;r<=7.3;r+=1.46)He(s,r,.43,1.7,.018,.8,E.gold);D(s,0,.8,1.7,14.7,.035,.035,E.gold),D(s,0,.46,1.7,14.7,.65,.014,E.glass)}if(e>=2){if(n==="lobby"&&(Zn(s,-5.6,.8,0,1.8,E.teal),bi(s,-4.25,.8,.35)),n==="breakfast"&&(D(s,2.8,1.1,-.6,.65,.5,.45,E.screen),Ys(s,2.8,1.44,-.6)),n==="club"&&(qa(s,5.8,1.2),Nn(s,3.3,.05,-.8,1.8)),n==="gym")for(const r of[3.7,4.6,5.5])D(s,r,.15,.5,.6,.09,1.8,E.rust);if(n==="spa")for(const r of[-2.5,2.5])D(s,r,1.15,-.7,.06,2.1,1.3,E.wood);n==="rooftop"&&Zn(s,0,.55,0,2.2,E.rust)}if(e>=3){if(n==="lobby"&&(Vi(s,0,1.6,-1.17,3.5,.65,3),D(s,0,.94,.5,6.45,.12,.83,E.gold)),n==="breakfast"&&(D(s,0,.55,.05,5.4,1,.8,E.stone),t>0))for(const r of[-1.8,0,1.8])He(s,r,1.12,.05,.25,.12,E.gold);if(n==="club"&&(Zn(s,-5.5,.4,0,2.8,E.white),Vi(s,0,1.85,-1.05,2.7,.45,2)),n==="gym"){D(s,4.9,1.15,-1.23,4,1.85,.05,E.glass);for(const r of[3.1,6.5])D(s,r,1,0,.08,1.8,.08,E.gold);D(s,4.8,1.85,0,3.6,.08,.08,E.gold)}if(n==="spa")for(const r of[-4.8,0,4.8])D(s,r,.88,.4,1.8,.04,.8,E.white),Nn(s,r+1.05,.75,.8,.8);if(n==="rooftop"){for(const r of[-6.8,6.8])D(s,r,1.3,-.9,.12,2.6,.12,E.walnut);for(let r=-6.8;r<=6.8;r+=.7)D(s,r,2.5,-.3,.12,.1,2.2,E.walnut)}}if(e>=4){D(s,0,.12,-.15,14,.03,2.9,E.stone);for(const r of[-6.6,6.6])Vi(s,r,1.55,-1.15,.7,1.1,4),Nn(s,r,.05,.85,1.7);if(n==="spa"&&(D(s,0,.4,.4,2.5,.55,1.5,E.white),D(s,0,.7,.4,2.1,.03,1.1,E.window)),n==="breakfast"||n==="club")for(const r of[-2,2])D(s,r,1.55,-.6,.025,.85,.025,E.gold),He(s,r,1.95,-.6,.25,.06,E.gold);n==="gym"&&(D(s,0,.3,.3,1.4,.25,1.8,E.black),D(s,0,1.25,-.4,1.2,.6,.12,E.screen))}if(e>=5){if(n!=="rooftop"){for(const r of[-5,-2.5,0,2.5,5])Fr(s,r,.5,2.05),D(s,r,2.27,0,2.2,.045,2.6,E.walnut);D(s,0,2.23,1.2,14,.04,.04,E.glow)}else{D(s,0,.35,-.5,3.6,.5,1.1,E.stone),D(s,0,.62,-.5,3.3,.04,.9,E.window);for(const r of[-6,-3,3,6])Nn(s,r,.05,.8,1.3)}for(let r=-6.5;r<7;r+=1.3)D(s,r,.15,1.55,.5,.02,.2,E.gold)}return s}function Sv(n,e,t){const i=new Vt,r=gv(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new Vt;return u.position.set(c,.31,0),i.add(u),D(u,0,-.11,0,.085,.26,.1,E.navy),D(u,0,-.245,.035,.11,.07,.17,E.black),u},o=a(-.08),l=a(.08);D(i,0,.47,0,.27,.34,.17,r),D(i,0,.58,.093,.07,.13,.012,E.white),["chill","family","points","forum","creator"].includes(e??"")||D(i,0,.55,.108,.018,.095,.016,E.navy),Un(i,0,.81,0,.185,.21,.16,E.skin),Un(i,0,.94,-.024,.193,.102,.163,E.hair);for(const c of[-.069,.069])Un(i,c,.84,.149,.021,.024,.01,E.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&D(i,c,.856,.156,.09,.066,.012,E.navy);for(const c of[-1,1]){const u=D(i,c*.18,.45,0,.075,.26,.085,r);u.rotation.z=c*.15,Un(i,c*.19,.303,.012,.047,.05,.045,E.skin)}if(e==="chill"&&(He(i,0,1,0,.23,.06,E.white),He(i,0,1.06,0,.16,.1,E.white)),e==="road"&&(D(i,.29,.25,.04,.22,.3,.15,E.walnut),D(i,.29,.44,.04,.12,.035,.05,E.gold)),e==="family"&&(D(i,0,.46,-.17,.3,.34,.17,E.rust),D(i,.27,.38,.05,.07,.2,.07,E.teal)),e==="points"&&(D(i,-.26,.4,.09,.15,.23,.025,E.white),D(i,-.26,.44,.11,.11,.04,.01,E.teal)),e==="hunter"&&(D(i,.24,.48,.12,.1,.18,.025,E.black),D(i,.24,.49,.138,.07,.12,.01,E.screen)),e==="forum"&&(Un(i,0,1.01,-.01,.21,.07,.18,E.navy),D(i,0,.99,.17,.2,.025,.16,E.navy),D(i,-.25,.42,.08,.15,.23,.04,E.black)),e==="creator"){D(i,0,.5,.16,.2,.13,.12,E.black);const c=He(i,0,.5,.26,.065,.1,E.black);c.rotation.x=Math.PI/2,D(i,0,.63,.13,.025,.18,.02,E.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Un(i,c+.23,.49,.08,.065,.08,.065,E.rust),D(i,c+.23,.35,.08,.015,.21,.015,E.green);if(e==="planner"&&(D(i,-.24,.47,.08,.19,.27,.04,E.teal),D(i,0,.54,.12,.08,.11,.015,E.white)),e==="whale"&&(D(i,0,.59,.12,.04,.09,.025,E.gold),D(i,.2,.36,.055,.08,.04,.09,E.gold),Un(i,0,.96,-.04,.2,.075,.18,E.hair)),e==="auditplus"&&(D(i,-.24,.47,.09,.19,.26,.04,E.walnut),D(i,-.24,.49,.12,.14,.19,.012,E.white),D(i,.23,.45,.09,.012,.17,.012,E.gold)),t==="house"){D(i,.43,.36,.2,.4,.55,.4,E.navy),D(i,.43,.68,.2,.45,.05,.45,E.gold);for(let c=0;c<3;c++)D(i,.43,.75+c*.065,.2,.32,.06,.3,E.white);for(const c of[.28,.58])Un(i,c,.08,.2,.07,.07,.07,E.black)}if(t==="engineering"&&(D(i,.3,.35,.05,.24,.2,.16,E.rust),D(i,.3,.5,.05,.13,.035,.04,E.gold),He(i,0,1,0,.21,.07,E.gold)),t==="fnb"){D(i,.4,.35,.2,.4,.08,.5,E.gold),D(i,.4,.62,.2,.4,.08,.5,E.gold);for(const c of[.28,.5])He(i,c,.73,.2,.09,.15,E.white);He(i,0,1,0,.17,.15,E.white)}return oa(i,0,0,.47,.3),{group:i,left:o,right:l}}function Ev(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],d=n.group.position.clone();n.group.position.lerpVectors(u,f,l-c);const h=n.group.position.x-d.x,p=n.group.position.z-d.z,x=Math.hypot(h,p)>1e-4;x&&(n.group.rotation.y=Math.atan2(h,p));const m=x?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=m,n.right.rotation.x=-m;return}const i=n.end-n.start,s=(Math.sin(e*.28+n.phase)+1)/2,r=n.walking?n.start+s*i:n.start;n.group.position.set(r,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Zc(n){const e=[],t=new Map;return n.floors.forEach((i,s)=>{const r=s*Ms;t.set(i.id,r),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?Ud[o]:0;e.push({id:a,floorId:i.id,position:new z(c,r,0),label:new z(l?c-1.97:-6.92,r+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*Ms+3.6}}function Tv(n,e,t){const i=new Nt(new Ls(e,t),new ar({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function Av(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class wv{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=Zc(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new mv({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=vu,this.renderer.outputColorSpace=Zt,this.renderer.toneMapping=fl,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new Kf;root=new Vt;camera=new sa;light=new gh(16768942,3.1);ambient=new hh(12638184,10651490,2.15);raycaster=new xh;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Vt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let r=0;r<18;r++){const a=-19+r*2.3,o=3+(Math.sin(r*7)+1)*3.3,l=-6-r%3*2.4;D(this.root,a,o/2-1,l,1.5,o,1.7,E.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(r+Math.round(c*10)+Math.round(u*10))%3!==0&&D(this.root,a+u,c,l+.87,.14,.24,.015,r%3===0?E.shade:E.window)}D(this.root,0,-.32,0,30,.35,15,E.navy),D(this.root,0,-.13,.7,17.6,.16,5.3,E.stone),D(this.root,0,-.06,2.95,17,.09,.55,E.stone);for(const r of[-8.1,8.4])Wt(this.root,r,1,2);e.floors.forEach(r=>{const a=this.layout.floorY.get(r.id),o=new Vt;if(o.name=r.id,o.position.y=a,this.root.add(o),r.role!=="rooftop"){D(o,0,-.085,0,15.05,.19,3.48,E.stone),D(o,0,-.12,1.77,15.2,.17,.19,E.navy),D(o,0,-.011,1.85,15.1,.025,.02,E.gold),D(o,0,2.405,-.02,15.05,.18,3.4,E.stone);for(const c of[-7.43,7.43])D(o,c,1.19,.18,.18,2.38,3.12,E.stone);D(o,7.94,1.19,-.24,.87,2.38,2.1,E.window);for(const c of[7.52,8.35])D(o,c,1.2,.84,.045,2.4,.06,E.gold);D(o,7.94,-.075,.1,.95,.19,2.85,E.navy),D(o,7.94,1.2,.87,.83,.025,.035,E.gold)}r.entityIds.forEach(c=>{const u=e.entities[c],f=this.layout.entities.find(p=>p.id===c),d=u.kind==="room"?xv(r.construction?{...u,construction:r.construction}:u):yv(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let p=1;p<(u.level??1);p++)Wt(d,-6.8+p*.45,-.95,.5+p*.1);d.name=c,d.userData.entityId=c,d.position.x=f.position.x,o.add(d);const h=Tv(c,u.kind==="room"?4.65:14.6,r.role==="rooftop"?2.1:2.3);if(d.add(h),this.colliders.push(h),u.kind==="room"){const p=document.createElement("button");p.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),p.textContent=r.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,p.dataset.entityId=c,p.setAttribute("aria-label",u.number+" 房间"),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}else{const p=document.createElement("button");p.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),p.dataset.entityId=c,p.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),p.setAttribute("aria-label","查看"+u.name),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${r.label}</strong><span>${r.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:r.id})}),_v(this.root),this.faultLights=[],this.root.traverse(r=>{r.name==="fault-lamp"&&this.faultLights.push(r)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const s=new ar({color:16766861,transparent:!0,opacity:.9,depthTest:!1});D(this.halo,0,0,0,4.7,.025,.025,s),D(this.halo,0,2.31,0,4.7,.025,.025,s),D(this.halo,-2.35,1.15,0,.025,2.31,.025,s),D(this.halo,2.35,1.15,0,.025,2.31,.025,s),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},s=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new $e((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=Av(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",s),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",s)});const r=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",r),this.cleanups.push(()=>document.removeEventListener("visibilitychange",r));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,r=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,r+6.4,46),this.camera.lookAt(-.3,r,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const s=this.layout.entities.find(r=>r.id===i.dataset.entityId);this.position(i,s.label)}),this.floorLabels.forEach(({el:i,id:s})=>this.position(i,new z(-8.57,this.layout.floorY.get(s)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new z(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new z(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof ku&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Vt,this.scene.add(this.root);const r=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/Ms+1e-5),c=r[l],u=e.floors.findIndex(f=>f.id===c);u>=0&&(o.y+=(u-l)*Ms)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=Zc(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const r=this.labels.find(a=>a.dataset.entityId===i.entityId);if(r){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);r.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",r.classList.add("upgraded"),setTimeout(()=>r.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(r=>{const a=r.dataset.entityId===e.selectedId;r.classList.toggle("selected",a),r.setAttribute("aria-pressed",String(a))});const s=this.layout.entities.find(r=>r.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!s,s){const r=e.entities[s.id];this.halo.scale.x=r.kind==="room"?1:3.1,this.halo.position.set(s.position.x,s.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(r=>r.guestId===t.id);if(!i){i={...Sv(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const r=t.movement;if(!i.navigation){const a=r.trail[0]??r.position;i.group.position.set(a.x,a.level*Ms+.07,a.z)}if(i.navigation?.revision!==r.revision){const a=(r.trail.length?r.trail:[r.position]).map(o=>new z(o.x,o.level*Ms+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:r.revision,points:a,elapsed:0,duration:1}}}const s=this.bubbles.find(r=>r.actor===i);s&&(s.el.textContent=t.thought,s.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const s=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,s),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(s=>Ev(s,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const s=this.store.getState(),r=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=s.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});r!==this.speechSlot&&(this.speechSlot=r,this.speaker=a.length?a[r%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new z(-.6,1.25,0)));o.hidden=!1;const f=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),d=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${f}px,${d+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(s=>{s.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(or).forEach(e=>e.dispose()),vv(),this.overlay.remove()}}const wl="jinwanyoutao_v8_game_1";function Rv(){try{const n=localStorage.getItem(wl);if(!n)return Ja();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return Cs(e),jr(e),li(e),e.game.operations.day!==e.game.day&&rl(e,!e.game.reportOpen),e.guests.forEach(t=>ea(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=Ja();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function ed(n){try{return localStorage.setItem(wl,JSON.stringify(n)),!0}catch{return!1}}const oi=Dd(Rv()),Vs=Qd(document.querySelector("#app"),oi);ld(document.querySelector("#app"),oi);let tl=!1,nl=oi.getState().game.notice.startsWith("存档读取失败");const Rl=()=>{!tl&&!nl&&!ed(oi.getState())&&(nl=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&oi.advance(4*oi.getState().speed)},1e3);setInterval(Rl,5e3);document.addEventListener("visibilitychange",Rl);window.addEventListener("pagehide",Rl);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){tl=!0;try{localStorage.removeItem(wl),oi.reset(),nl=!1,ed(oi.getState()),location.reload()}catch{alert("无法重置存档。")}finally{tl=!1}}});function la(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}la();window.visualViewport?.addEventListener("resize",la);window.visualViewport?.addEventListener("scroll",la);window.addEventListener("resize",la);try{const n=new wv(Vs.stage,oi);Vs.setFocusHandler(e=>n.focusFloor(e)),Vs.stage.addEventListener("world-error",e=>Vs.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Vs.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
