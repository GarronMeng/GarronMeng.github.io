(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Vl(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,d,p)=>{const u="floor-"+l,x="facility-"+l;e.push({id:u,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[x]}),t[x]={id:x,kind:"facility",floorId:u,role:l,name:c,capacity:d,usage:p,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const d=String(o*100+c+1),p="room-"+d,u=r[((o-2)*3+c)%r.length];l.entityIds.push(p),t[p]={id:p,kind:"room",floorId:l.id,number:d,type:c===2?"suite":c===1?"twin":"king",status:u,nightsLeft:u==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,d,p,u,x],g)=>s.push({id:"public-"+g,name:x?"当班员工":"住客",tier:x?"Staff":"Member",floorId:"floor-"+o,thought:u,color:p,route:[l,c],z:d,staff:!!x}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const oi={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Hc={breakfast:["早餐九点以后，有点像抢票。","F&B 补菜的手速，决定今天的第一条 DP。","咖啡先续上，QN 的事等会再说。"],club:["Happy Hour 别断菜。","Club Lounge 有位置，今天的心情就有位置。","这杯喝完再回房，今晚不赶场。"],gym:["健身房虽小，拍照倒挺大。","再跑十分钟，早餐就当没吃过。","今天把房费里的健身房也用回来。"],spa:["做个 Spa 再说，App 先放一边。","这一小时，谁都别给我发房态。","今天的 Service Recovery，是肩颈先恢复。"],lobby:["Front Office 说“再帮您看一下”，我懂这个停顿。","Walk-in 也想问一句：今晚有套吗？","GM Desk 先不用惊动，能解决就好。"],rooftop:["日落很值，特意错开了人多的时候。","风景不错，今晚的 DP 有封面了。","再坐一小会就回房，明早还有早餐。"]},br=2.12,yr=7.94,Xn=n=>n.game.day*1440+n.game.minute;function io(n,e){if(e.staff||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Xn(n)+20+li(e.id)%75,trail:[],revision:0}}function li(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function Ni(n,e,t){io(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(u=>u.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+li(e.id+t)%12*.95,c=s?2.8:1.25,d=[],p=(u,x,g,b)=>d.push({x:u,z:x,level:g,phase:b});return p(o.x,br,o.level,"corridor"),Math.abs(a-o.level)>.001&&(p(yr,br,o.level,"corridor"),p(yr,.9,o.level,"elevator"),p(yr,.9,a,"elevator"),p(yr,br,a,"corridor")),p(l,br,a,"corridor"),p(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=d,i.destination=t,i.arrived=!1,i.nextDecision=Xn(n)+60,e.visitUntil=void 0,!0}function Vc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const d=c/l;r.x+=s*d,r.z+=a*d,r.level+=o/2.55*d}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Xn(n)+45+li(e.id+Xn(n))%65,!0)}function Wc(n){for(const e of n.guests)io(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Xc(n){n.movement&&n.movement.trail.push({...n.movement.position})}function Uo(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const Wl=n=>n.name+":"+n.persona;function mn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Xn(n)+55,e.speech.next=0,cr(n,e)}function cr(n,e){if(e.staff)return;const t=Xn(n),i=e.speech??={next:0,recent:[]};if(t<i.next)return;const r=oi[e.persona??"chill"],s=e.movement,a=n.floors.find(f=>f.id===e.floorId)?.role??"lobby",o=(i.eventUntil??0)>=t?i.event:"",l=Object.values(n.entities).filter(f=>f.kind==="room"&&f.type==="suite"&&f.status==="available").length;let c=[];const d=[...r.lines],p=[];o==="checkin"&&(c=e.upgrades?["这次真给套了，可以写个好 DP。","Standard Suite 到手，今晚不用刷新 App 了。"]:[r.quote,"房卡拿到了，先上楼看看。"]),o==="denied"&&(c=e.persona==="hunter"||e.persona==="forum"?l>0?["App 上有套，不代表你有套。今天懂了。","Revenue 很漂亮，DP 也很精彩。"]:["今天 Standard Suite 没库存，这条 DP 得注明。","先住普通房，明天再看套房库存。"]:["这次没升套，先看看实际住得怎么样。"]),o==="late-honor"&&(c=["4PM honored，终于不用拎着箱子等车了。","四点退房确认了，Housekeeping 辛苦。"]),o==="late-deny"&&(c=["4PM 协商成了 14:00，这条 DP 得写清楚。"]),o==="recovery"&&(c=[e.persona==="points"?"QN / bonus 都解释清楚了，比水果有用。":e.persona==="family"?"早餐和加床都确认了，这次终于不用反复问。":e.persona==="proposal"?"布置悄悄安排好了，今晚终于能松口气。":"Service Recovery 到位了，这一段也会写进 DP。"]),o==="shortage"&&(c=[a==="club"?"Happy Hour 还在，菜先下班了。":"早餐时间还没结束，餐台已经准备下班了。","F&B，补货时间也算用餐体验吧。"]),o==="full"&&(c=["这里满了，换个地方，不在门口排队了。",e.persona==="planner"?"这个容量，团队一定要错峰。":"下次换个时间来，今晚不挤了。"]),o==="checkout"&&(c=e.persona==="points"?["Checkout 完了，接下来守着 QN 到账。"]:e.persona==="forum"?["住完了，可以发完整 DP 了。"]:["Front Office，发票和行李都齐了，我出发了。"]),s?.position.phase==="elevator"?p.push(e.persona==="planner"?"团队坐电梯得分批，这个记进方案。":"电梯到了，再走两步就能休息。"):s?.steps.length?p.push(e.persona==="road"?"走廊顺着走，别耽误下一场会。":"沿着走廊过去，不急。"):a==="guest"?(e.upgrades&&d.push(e.persona==="hunter"?"Standard Suite 确认了，明天续住再问。":"可以写个好 DP。"),e.persona==="whale"&&d.push(n.entities["facility-spa"]?"下午去 Spa，别排太满。":"要是有 Spa，今天就不出门了。"),e.persona==="creator"&&d.push("房间自然光不错，这组可以不用滤镜。"),p.push("在房间歇一会，今天不必把每层都打卡。")):s?.steps.length||p.push(...Hc[a]??[]),!e.upgrades&&l>0&&["hunter","forum"].includes(e.persona??"")&&d.push("我记得 App 上还有套。",`App 上还有 ${l} 间套，先问问 Front Office。`),e.sua&&!e.roomId&&d.push("SUA 带好了，今晚能确认 Standard Suite 吗？"),e.goh&&d.push("这次 GOH 帮忙安排的，体验得认真反馈。"),e.late==="pending"&&c.push((e.checkoutDay===n.game.day?"今天":"明天")+"能 4PM 吗？先确认一下再安排行程。");const u=n.game.guestMemory?.[Wl(e)];if(u?.visits&&d.push(u.denied?"上次没拿到套，这次看看有没有新 DP。":"上次住得不错，这次又回来了。"),n.game.weather==="rain"&&a==="lobby"&&p.push("下雨就不去屋顶了，在 Lobby 等雨停。"),n.game.positioning==="resort"&&e.persona==="chill"&&d.push("度假不打卡，今天就在酒店慢慢过。"),e.tier==="Globalist"&&a==="club"&&d.push("Globalist 的 Happy Hour，今天得慢慢吃。"),!s?.steps.length&&a!=="guest"&&a!=="lobby"){const f=n.entities["facility-"+a];f?.kind==="facility"&&d.unshift(f.name+"："+{chill:"找个角落坐着，今天没有 KPI。",road:"这边结束就回房开会，不赶第二场。",family:"先看看孩子能不能坐得住。",points:"这一项用上，房费回本又近一步。",hunter:"休息归休息，套房库存还是要看。",forum:"现场和帖子对照一下，DP 才完整。",creator:"等人少点再拍，原图要经得起放大。",proposal:"先踩好点，惊喜不能临场找位置。",planner:"容量记一下，下次带团队得错峰。",whale:"不用推荐最贵的，推荐最好的。",auditplus:"我就坐一会，您按 SOP 来。"}[e.persona??"chill"])}const x=n.game.dialogueRecent??={};for(const[f,h]of Object.entries(x))t-h>240&&delete x[f];const g=f=>f.filter(h=>!i.recent.some(w=>w.text===h&&t-w.at<240)&&t-(x[h]??-9999)>35);let b=g(c);if(b.length||(b=g(li(e.id+t)%3===0?[...p,...d]:d)),b.length||(b=g(p)),b.length){const f=b[li(e.id+":"+t)%b.length];e.thought=f,i.recent.push({text:f,at:t}),i.recent=i.recent.slice(-8),x[f]=t}else e.thought="";i.next=t+45+li(e.id+t)%35}function cs(n,e){e.staff||(e.persona??=Object.keys(oi)[li(e.id)%11],io(n,e))}function Xl(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function $c(n,e){const t=n.game.minute,i=t/60,r=oi[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility")continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=Xl(n,a.id);o*=Math.max(0,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function qc(n,e,t,i){if(e.lastVisit=t.id,Xl(n,t.id)>t.capacity){mn(n,e,"full"),Ni(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock";if(r&&n.game[s]<=0){e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),mn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id);return}r&&n.game[s]--;const a=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,o=Math.round(a*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1));o&&(i.income(o),i.progress("ancillary",o)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,cr(n,e)}function ta(n,e){e.departing=!0,e.movement?.steps.length||Ni(n,e,"exit")}function Yc(n,e,t,i){cs(n,e);const r=e.movement,s=Xn(n),a=Vc(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&Ni(n,e,"exit"),cr(n,e);return}if(!e.roomId){cr(n,e);return}if(a){const o=n.entities[r.destination];o?.kind==="facility"&&qc(n,e,o,i)}if(e.late==="pending"&&n.game.managers.front){const o=Object.values(n.entities).filter(c=>c.kind==="room"&&c.status==="occupied").length,l=Object.values(n.entities).filter(c=>c.kind==="room").length;e.late=o/l<.88?"honor":"deny",mn(n,e,e.late==="honor"?"late-honor":"late-deny"),i.log("部门",e.name+"：Front Office 确认 "+(e.late==="honor"?"4PM":"14:00")+" 退房。",e.roomId)}if(!e.late&&e.checkoutDay===n.game.day+1&&n.game.minute>=1080&&(e.tier==="Globalist"||e.persona==="family")&&(e.late="pending",mn(n,e,"late"),i.log("入住",e.name+"：明天能 4PM 吗？",e.roomId)),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)Ni(n,e,e.roomId);else{const o=$c(n,e);let l=t()*o.reduce((d,p)=>d+p.weight,0),c=e.roomId;for(const d of o)if(l-=d.weight,l<=0){c=d.id;break}if(c!==e.roomId)Ni(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const d=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:d+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}cr(n,e)}function Kc(n,e,t){const i=n.game.guestMemory??={},r=Wl(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),mn(n,e,"checkout")}const Ft=n=>Object.values(n.entities).filter(e=>e.kind==="room"),$l=n=>Ft(n).filter(e=>e.type==="suite"&&e.status==="available").length,ql=n=>Ft(n).filter(e=>e.status==="occupied").length,No=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId);function Wi(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function Fi(n,e,t=1){const i=Wi(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)r.id===e&&(r.progress=Math.min(r.goal,r.progress+t))}const Zc=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function Jc(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=Zc[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function Li(n){const e=Ft(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function Yl(n){const e=n.game.development,t=Ft(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const es={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function Ii(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function Er(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Qc(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=Wi(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;Er(n,3500*s)&&(r.level=s+1,r.capacity+=4,r.quality=Math.min(100,r.quality+5),r.maintenance=100,Fi(n,"upgrade"),Ii(n,r.name+"升级至 "+r.level+" 级：容量 +4，体验与消费收入提升。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;Er(n,4500*s)&&(t.managers[r]++,Ii(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;Er(n,2200)&&(i.campaignUntil=t.day+2,Ii(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=es[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;Er(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},Ii(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=Yl(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,Ii(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function jc(n){const e=n.game,t=Wi(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=es[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(u=>u.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,d=Math.min(l,Math.round(a.length*c)),p=Math.round(d*r.fee*(1+(o-1)*.2));n.metrics.cash+=p,e.revenue+=p,Fi(n,"revenue",p),Fi(n,"ancillary",p),Fi(n,"activity");for(const u of a.slice(0,d))u.satisfaction=Math.min(100,(u.satisfaction??90)+5),u.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(d>=3?2:0)),t.activity=void 0,Ii(n,r.name+"结束："+d+" 人参加，收入 ¥"+p+"，活动净额 ¥"+(p-r.cost)+"。")}const na={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Fo=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,ia=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function dr(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,Ft(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function Gt(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function $e(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function Jt(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function ro(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,Fi(n,"revenue",e)}function Vn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const Nt=Fi,Kl=Jc;function ra(){const n=Vl();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:Kl(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=t.type==="suite"?900:650,e.satisfaction=90,e.segment="商务"}for(const e of Ft(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return Wi(n),n.guests.forEach(e=>cs(n,e)),Zl(n),$e(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),so(n),n}function Zl(n){const e=n.game,t=Gt(n),i=["陈","林","何","张","周","王","李","赵"][Math.floor(Gt(n)*8)]+"先生",r=t<.27?"Globalist":t<.5?"Explorist":t<.8?"Member":"普通客",s=e.positioning==="resort"||(e.day-1)%7>=4&&Gt(n)<.65,a=s?2+Math.floor(Gt(n)*4):Gt(n)<.22?5+Math.floor(Gt(n)*3):1+Math.floor(Gt(n)*3),o={id:"guest-"+e.nextId++,name:i,tier:r,floorId:"floor-lobby",thought:r==="Globalist"?"今晚有套吗？":"想住 "+a+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:s?"度假":a>=5?"长住":"商务",stayLength:a,patience:100+e.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(e.memory[i]??0)};cs(n,o),o.goh=r==="Globalist"&&Gt(n)<.12,o.sua=r==="Globalist"&&!o.goh&&Gt(n)<.15,mn(n,o,"arrival"),n.guests.push(o),e.arrivals++,$e(n,"入住",`${i} · ${r} 到店，计划 ${a} 晚${e.memory[i]?"，一位熟客回来了":""}。`,"facility-lobby")}const fn=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function so(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function eu(n,e){e.roomId&&Ni(n,e,e.roomId)}function tu(n){const e=n.game,t=Ft(n);let i=0,r=0;for(const d of n.guests)d.roomId&&(i+=d.rate??e.price,r++);ro(n,i),e.nights=r;const s=380+t.length*65+Object.values(e.managers).reduce((d,p)=>d+p*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":dr(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,score:Li(n).total});const c=Wi(n).scores;c.push({day:e.day,value:Li(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Vn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),$e(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function nu(n){const e=n.game;e.day++,e.minute=420,e.nextArrival=450,e.nextEvent=600,e.weather=Gt(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=Kl(e.day);for(const t of Ft(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=Math.round((dr(n)>1.1?750:590)*(1+e.level*.04+(e.managers.revenue-1)*.06))),$e(n,"部门",`${ia(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(dr(n)*100)}%。`)}function iu(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>ro(n,r),reputation:r=>Vn(n,r),log:(r,s,a)=>$e(n,r,s,a),progress:(r,s=1)=>Nt(n,r,s)};Wc(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,jc(n);const s=Ft(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&--a.timer<=0&&(a.timer=void 0,a.status="available",Nt(n,"service"),$e(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id)),a.status==="dirty"&&t.managers.house&&(a.status="cleaning",a.timer=Math.max(8,24-t.managers.house*5),Nt(n,"delegate"),$e(n,"部门",`客房主管安排清洁 ${a.number}。`,a.id)),a.status==="maintenance"&&!a.timer&&t.managers.engineering&&Jt(n,100)&&(a.timer=Math.max(10,35-t.managers.engineering*7),Nt(n,"delegate"),$e(n,"部门",`工程主管接管 ${a.number} 的维修。`,a.id));for(const a of[...n.guests]){if(a.staff)continue;if(Yc(n,a,()=>Gt(n),i),Xc(a),a.departing){a.exitAt!==void 0&&Xn(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(ta(n,a),t.lost++,t.complaints++,Vn(n,-1),$e(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=a.late==="honor"?960:a.late==="deny"||a.late==="pending"?840:660;(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",$e(n,"客诉",`${a.name} 的 4PM 未确认，按 14:00 退房。`,o.id),Vn(n,-1)),Kc(n,a,i),o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,ta(n,a),$e(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.managers.front){const a=fn(n)[0],o=s.find(l=>l.status==="available"&&(a?.tier==="Globalist"||l.type!=="suite"))??s.find(l=>l.status==="available");a&&o&&(sa(n,{type:"checkin",id:a.id,roomId:o.id}),Nt(n,"delegate"))}if(t.managers.fnb&&t.minute%30===0)for(const a of["stock","clubStock"])t[a]<20&&Jt(n,Math.max(140,260-t.managers.fnb*20))&&(t[a]+=40,Nt(n,"delegate"),$e(n,"部门","餐饮主管已自动补货。","facility-breakfast"));if(t.minute>=t.nextArrival&&t.minute<1260&&(fn(n).length<6&&Zl(n),t.nextArrival=t.minute+Math.max(8,Math.round((35+Gt(n)*28)/dr(n)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(d=>d.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(Gt(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(d=>d.kind===l)){l==="repair"&&a&&(a.status="maintenance");const d={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:d[l],target:c,expires:t.day*1440+t.minute+120}),$e(n,"客诉",d[l],c)}t.nextEvent=t.minute+180+Math.round(Gt(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";t.managers[o]&&n.metrics.cash>=150?sa(n,{type:"resolve",id:String(a.id),value:"sop"}):t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Vn(n,-2),$e(n,"客诉",`未及时处理：${a.title}`,a.target))}t.minute>=1440&&tu(n)}so(n)}function sa(n,e){const t=n.game;if(!t||Qc(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=fn(n).find(o=>o.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist")){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=Math.round(t.price*(a.type==="suite"?s.tier==="Globalist"?1:1.45:1)*(1+((a.level??1)-1)*.1)),s.upgrades=a.type==="suite"&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&a.type!=="suite",s.upgrades?(t.upgrades++,Nt(n,"vip"),Vn(n,1)):s.tier==="Globalist"&&Ft(n).some(o=>o.type==="suite"&&o.status==="available")&&Vn(n,-1),a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,eu(n,s),mn(n,s,s.denied?"denied":"checkin"),Nt(n,"arrivals"),$e(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=fn(n).find(a=>a.id===e.id);s&&(ta(n,s),mn(n,s,"denied"),t.lost++,$e(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&Jt(n,90)&&(r.status="cleaning",r.timer=30,$e(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.timer&&Jt(n,180)?(r.timer=40,$e(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&Jt(n,200)&&(i.maintenance=100,$e(n,"房态",`${i.name} 维护完成。`,i.id));break;case"upgrade":r?.status==="available"&&(r.level??1)<5&&Jt(n,2500*(r.level??1))&&(r.level=(r.level??1)+1,Nt(n,"upgrade"),$e(n,"升级",`${r.number} 装修至 ${r.level} 级，提高房价。`,r.id));break;case"reserve":r?.status==="available"&&r.type==="suite"&&(r.status="reserved",$e(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&(r.status="available",$e(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(na,s)||t.managers[s])break;Jt(n,3800)&&(t.managers[s]=1,Nt(n,"delegate"),$e(n,"部门",`${na[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}Jt(n,300)&&(t[s]=Math.min(160,t[s]+50),Nt(n,"stock"),$e(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!Jt(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,Nt(n,"service")),s.kind==="supplies"&&(t.stock+=25),Nt(n,"resolve"),Vn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&Nt(n,"delegate"),$e(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!Jt(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[]};for(let l=1;l<=3;l++){const c=String(a*100+l),d="room-"+c;o.entityIds.push(d),n.entities[d]={id:d,kind:"room",floorId:o.id,number:c,type:l===3?"suite":"king",status:"available",nightsLeft:0,level:1}}Uo(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,$e(n,"升级",`${o.label} 客房层竣工：新增 3 间客房，公区与屋顶同步上移。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),mn(n,s,s.late==="honor"?"late-honor":"late-deny"),$e(n,"入住",`${s.name} 已确认 ${s.late==="honor"?"4PM":"14:00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;Jt(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),mn(n,s,"recovery"),Nt(n,"resolve"),$e(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(Jt(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");Uo(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),$e(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),$e(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,$e(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"continue":t.reportOpen&&nu(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(s.claimed=!0,ro(n,s.reward),$e(n,"收益",`完成「${s.title}」，奖励 ¥${s.reward}。`));break}}so(n)}function aa(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))aa(e)}return n}function ru(n=Vl()){let e=aa(structuredClone(n));const t=new Set,i=r=>{e=aa({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);sa(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);iu(s,r),i(s)},reset(){i(ra())}}}const Nn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},oa={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},Di=2.55,su=[-4.93,0,4.93],at=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),At=n=>"¥"+Math.round(n).toLocaleString("en-US"),Oe=(n,e,t="",i="")=>`<button class="game-action" data-action="${at(e)}" data-id="${at(t)}" data-value="${at(i)}">${at(n)}</button>`;function au(n,e){const t=M=>n.querySelector(M),i=n.querySelector("dialog"),r=t("#sheet-content"),s=t("#sheet-eye");let a="",o="",l="全部",c=()=>{},d=null;t(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',t(".world-caption").textContent="轻点空间 · 处理今天的经营",t(".weather").title="切换日夜预览",t(".property-name small").id="game-time",t(".today-hint").setAttribute("data-open","tasks"),t(".event-strip").removeAttribute("data-focus"),t(".event-strip").setAttribute("data-open","events"),t(".speed-control").insertAdjacentHTML("beforeend",Oe("Ⅱ","pause")),t(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(M=>M.setAttribute("aria-label",M.getAttribute("data-speed")+"倍经营速度"));const p=()=>{a="",o="",i.close(),e.select(null),d?.focus()},u=(M,y)=>{s.textContent=M,r.innerHTML=y,i.open||(d=document.activeElement,i.showModal())},x=M=>{const y=e.getState(),v=y.entities[M];if(v){if(v.kind==="room"){const E=y.guests.find(_=>_.id===v.guestId);u("HYATT PLACE · "+y.floors.find(_=>_.id===v.floorId)?.label,`<h2>${at(v.number)}<span>${v.type==="suite"?"开放式套房":v.type==="twin"?"双床客房":"大床客房"} · Lv.${v.level??1}</span></h2><div class="status-chip">${oa[v.status]}${v.timer?" · 还需 "+v.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${E?at(E.name)+" · "+at(E.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${v.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${E?At(E.rate??y.game.price):At(y.game.price)+" 起"}</dd></div></dl>${E?"<p>"+oi[E.persona??"chill"].name+(E.goh?" · GOH":"")+(E.sua?" · SUA":"")+"</p><blockquote>"+at(E.thought)+"</blockquote>"+(E.serviceDone?"<small>本次住宿已安排专属服务</small>":Oe({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[E.persona??"chill"]+" ¥120","guest-service",E.id))+(E.late==="pending"?Oe("确认 4PM","late",E.id,"honor")+Oe("协商 14:00","late",E.id,"deny"):E.late?"<p>退房时间："+(E.late==="honor"?"16:00":"14:00")+"</p>":""):""}<div class="action-row">${v.status==="dirty"?Oe("安排清洁 ¥90","clean",M):""}${v.status==="maintenance"&&!v.timer?Oe("安排维修 ¥180","repair",M):""}${v.status==="available"?Oe("分配给住客","front")+((v.level??1)<5?Oe("装修 "+At(2500*(v.level??1)),"upgrade",M):"")+(v.type==="suite"?Oe("预留给会员","reserve",M):""):""}${v.status==="reserved"?Oe("释放预留","release",M):""}</div>`)}else u("HYATT PLACE · 公共空间",`<h2>${at(v.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${v.usage} / ${v.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(v.maintenance)}%</dd></div>${["breakfast","club"].includes(v.role)?`<div><dt>库存</dt><dd>${v.role==="club"?y.game.clubStock:y.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${v.role==="lobby"?Oe("办理入住","front"):""}${v.role==="breakfast"?Oe("补充早餐 ¥300","stock","breakfast"):v.role==="club"?Oe("补充酒廊 ¥300","stock","club"):""}${Oe("维护设施 ¥200","repair",v.id)}${(v.level??1)<5?Oe("公区升级 "+At(3500*(v.level??1)),"invest",v.id):"已达 Lv.5"}</div>`);a&&y.game.notice&&r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${at(y.game.notice)}</p>`)}},g=()=>{const M=e.getState(),y=M.game;if(a==="entity"){x(o);return}if(a==="front")u("FRONT OFFICE",`<h2>前台 · ${fn(M).length} 位等候</h2><p>会员升套使用普通房价；房费日结入账。面板打开时经营暂停。</p>${fn(M).map(v=>{const E=Ft(M).filter(_=>_.status==="available"||_.status==="reserved"&&v.tier==="Globalist").sort((_,A)=>v.tier==="Globalist"?+(A.type==="suite")-+(_.type==="suite"):+(_.type==="suite")-+(A.type==="suite"));return`<section class="guest-card"><strong>${at(v.name)} · ${at(v.tier)}</strong><blockquote>${at(v.thought)}</blockquote><p>${oi[v.persona??"chill"].name}${v.goh?" · GOH":""}${v.sua?" · SUA":""} · ${at(v.segment)} · ${v.stayLength} 晚 · 等候耐心 ${v.patience} 分钟</p>${E.length?`<select aria-label="为${at(v.name)}选择房间" id="assign-${at(v.id)}">${E.map(_=>`<option value="${_.id}">${_.number} · ${_.type==="suite"?"套房":_.type==="twin"?"双床":"大床"}${v.tier==="Globalist"&&_.type==="suite"?" · 免费升套":""}</option>`).join("")}</select>${Oe("确认入住","checkin",v.id)}`:"<p>暂无可用房间：先清洁脏房或扩建。</p>"}${Oe("婉拒","reject",v.id)}</section>`}).join("")||'<p class="empty">暂时没有排队住客，关上面板继续经营。</p>'}`);else if(a==="hotel")u("YOUR HOTEL",`<h2>酒店 · ${Ft(M).length} 间客房</h2><p>已解除 21 间客房上限，继续向上扩建；公区和屋顶同步上移。更多客房也会吸引更多客流。</p>${Oe("新增三间客房 "+At(1e4+5e3*(M.floors.filter(v=>v.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div><div class="floor-list">${[...M.floors].reverse().map(v=>`<button data-floor="${v.id}"><b>${v.label}</b><span>${v.name}</span><small>定位楼层 ›</small></button>`).join("")}</div><div class="room-grid">${Ft(M).map(v=>`<button data-entity="${v.id}">${v.number}<small>${oa[v.status]}</small></button>`).join("")}</div><p class="phase-note">其他品牌需有独立空间与美术，目前尚未开放。</p>`);else if(a==="operations")u("OPERATIONS",`<h2>经营与授权</h2><button class="primary" data-open="development">投资、营销与主题活动 ›</button><p>${ia(y.day)} · 预计需求 ${Math.round(dr(M)*100)}% · ${y.weather==="rain"?"有雨":"晴朗"}</p><div class="action-row">${Oe("早餐 +50 ¥300","stock","breakfast")}${Oe("酒廊 +50 ¥300","stock","club")}</div><p>库存：早餐 ${y.stock} · 酒廊 ${y.clubStock}</p><label>新客挂牌价 <input id="price-input" type="number" min="350" max="1800" step="50" value="${y.price}"></label>${Oe("调整价格","price")}<label>经营定位 <select id="position-input"><option value="business" ${y.positioning==="business"?"selected":""}>商务 / 机场</option><option value="resort" ${y.positioning==="resort"?"selected":""}>休闲 / 度假</option><option value="urban" ${y.positioning==="urban"?"selected":""}>城市混合</option></select></label>${Oe("调整定位","position")}<h3>部门负责人</h3><p>聘任 ¥3,800，每日工资 ¥180。客房自动翻房、工程自动维修、餐饮自动补货、前厅自动分房、收益自动定价。培训后：前厅耐心更长、客房与维修更快、餐饮采购更便宜、收益定价更积极；每级每日工资 ¥180。</p>${Object.entries(na).map(([v,E])=>`<div class="department"><span>${E}主管</span>${y.managers[v]?`<span>Lv.${y.managers[v]} ${y.managers[v]<3?Oe("培训 "+At(4500*y.managers[v]),"train",v):"已满级"}</span>`:Oe("聘任","hire",v)}</div>`).join("")}<div class="action-row">${Oe("最近日结","report")}${Oe("导出存档","export")}${Oe("新开存档","reset")}</div><p class="phase-note">自动保存于当前浏览器。旧版存档不受影响。非官方粉丝游戏，与 Hyatt 无隶属关系。</p>`);else if(a==="development"){const v=y.development;u("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级提升新客房价 10%。</p><h3>三日营销</h3><p>客流 +35%；推广持续到第 ${v?.campaignUntil??0} 天。满房时请谨慎投放。</p>${v&&v.campaignUntil>=y.day?"<small>推广进行中</small>":Oe("投放推广 ¥2,200","campaign")}<h3>今日主题活动</h3><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${v?.activity?`<blockquote>正在筹备：${es[v.activity.id].name} · 还需 ${Math.max(0,v.activity.ends-y.day*1440-y.minute)} 分钟</blockquote>`:""}${Object.entries(es).map(([E,_])=>`<section class="guest-card"><strong>${_.name}</strong><p>${_.description} 每人消费 ¥${_.fee} 起。</p>${v?.activityDay===y.day?"<small>今日档期已使用</small>":Oe("安排 "+At(_.cost),"activity",E)}</section>`).join("")}<h3>公共空间投资</h3>${M.entities["facility-spa"]?"":Oe("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(M.entities).filter(E=>E.kind==="facility").map(E=>`<section class="guest-card"><strong>${at(E.name)} · Lv.${E.level??1}</strong><p>容量 ${E.capacity} 人 · 维护 ${Math.round(E.maintenance)}%</p>${(E.level??1)<5?Oe("升级 "+At(3500*(E.level??1)),"invest",E.id):"<small>满级</small>"}</section>`).join("")}<button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(a==="score"){const v=Li(M);u("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${v.total}%"><strong>${v.total}<small>/ 100</small></strong></div><div><strong>${v.total>=90?"卓越酒店":v.total>=75?"稳健经营":v.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${v.parts.map(E=>`<div class="score-part"><span>${E.name}</span><b>${E.value}</b><progress max="100" value="${E.value}" aria-label="${E.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><h3>最近 7 天评分</h3><div class="revenue-trend">${(y.development?.scores??[]).slice(-7).map(E=>`<div><small>${E.value} 分</small><i style="height:${E.value*.65}px"></i><small>D${E.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(a==="tasks")u("MISSIONS",`<h2>今日任务</h2><p>每天轮换经营目标，完成后及时领奖。长期里程碑不会随交班重置。</p>${y.tasks.map(v=>`<section class="guest-card"><strong>${at(v.title)}</strong><p>${v.progress} / ${v.goal} · 奖励 ${At(v.reward)}</p><progress max="${v.goal}" value="${v.progress}" aria-label="${at(v.title)}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Oe("领取奖励","claim",v.id):`<button class="game-action" data-open="${v.target}">去完成 ›</button>`}</section>`).join("")}<h3>长期里程碑</h3><p>累计接待与活动次数从本次升级开始记录；已有客房与部门等级直接计入。</p>${Yl(M).map(v=>`<section class="guest-card"><strong>${v.title}</strong><p>${Math.min(v.progress,v.goal)} / ${v.goal} · ${At(v.reward)}</p><progress max="${v.goal}" value="${Math.min(v.progress,v.goal)}" aria-label="${v.title}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Oe("领取里程碑奖励","claim-career",v.id):"<small>持续经营以解锁</small>"}</section>`).join("")}`);else if(a==="events")u("DUTY MANAGER",`<h2>待办 · ${y.events.length+M.guests.filter(v=>v.late==="pending").length}</h2>${M.guests.filter(v=>v.late==="pending"&&!v.departing).map(v=>`<section class="guest-card"><strong>${at(v.name)} · 4PM 请求</strong><p>${oi[v.persona??"chill"].name}：晚退意味着翻房窗口更紧。</p>${Oe("确认 4PM","late",v.id,"honor")}${Oe("协商 14:00","late",v.id,"deny")}</section>`).join("")}${y.events.map(v=>`<section class="guest-card"><strong>${at(v.title)}</strong><p>剩余 ${Math.max(0,v.expires-y.day*1440-y.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${v.target}">定位现场</button>${Oe("亲自协调 ¥350","resolve",String(v.id),"gm")}${Oe("交给主管 ¥150","resolve",String(v.id),"sop")}</div></section>`).join("")||'<p class="empty">目前没有异常。部门成熟以后，常规问题会自动处理。</p>'}${fn(M).length?`<button class="primary" data-open="front">接待 ${fn(M).length} 位排队住客</button>`:""}`);else if(a==="log")u("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(v=>`<button class="${v===l?"active":""}" data-filter="${v}">${v}</button>`).join("")}</div><div class="log-list">${[...y.logs].reverse().filter(v=>l==="全部"||v.category===l).map(v=>`<article><small>Day ${v.day} ${Fo(v.minute)} · ${v.category}</small><p>${at(v.text)}</p>${v.target?`<button data-entity="${at(v.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(a==="report"){const v=y.reports.at(-1);u("DAILY REVIEW",v?`<h2>Day ${v.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${v.score??Li(M).total} / 100 ›</button><dl><div><dt>收入 / 成本</dt><dd>${At(v.revenue)} / ${At(v.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${At(v.adr)} / ${At(v.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${v.occupancy}% / ${v.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${v.upgrades} / ${v.complaints}</dd></div></dl><h3>最近 7 天收入</h3><div class="revenue-trend">${y.reports.slice(-7).map(E=>`<div><small>${At(E.revenue)}</small><i style="height:${Math.max(3,Math.round(E.revenue/Math.max(1,...y.reports.slice(-7).map(_=>_.revenue))*65))}px"></i><small>D${E.day}</small></div>`).join("")}</div><blockquote>${at(v.recommendation)}</blockquote>${y.reportOpen?Oe("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("click",M=>{const y=M.target.closest("button");if(!y)return;if(y.matches(".close-sheet")){e.getState().game.reportOpen&&e.dispatch({type:"continue"}),p();return}if(y.dataset.open){a=y.dataset.open,g();return}if(y.dataset.speed){e.setSpeed(Number(y.dataset.speed));return}if(y.dataset.entity){o=y.dataset.entity;const _=e.getState().entities[o];_&&c(_.floorId),a="entity",e.select(o),g();return}if(y.dataset.floor){const _=y.dataset.floor;p(),e.focusFloor(_),c(_);return}if(y.dataset.filter){l=y.dataset.filter,g();return}if(y.matches(".weather")){const _=["dusk","night","day"];e.setAtmosphere(_[(_.indexOf(e.getState().atmosphere)+1)%3]);return}const v=y.dataset.action;if(!v)return;if(["front","report"].includes(v)){a=v,g();return}if(v==="reset"){document.dispatchEvent(new Event("new-game"));return}if(v==="export"){const _=document.createElement("a");_.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),_.download="jinwan-v8-save.json",_.click(),setTimeout(()=>URL.revokeObjectURL(_.href),500);return}const E={type:v,id:y.dataset.id,value:y.dataset.value};v==="checkin"&&(E.roomId=n.querySelector("#assign-"+y.dataset.id)?.value),v==="price"&&(E.value=Number(n.querySelector("#price-input")?.value)),v==="position"&&(E.value=n.querySelector("#position-input")?.value),e.dispatch(E),v==="continue"?p():a&&(g(),r.querySelector(".action-feedback")||r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${at(e.getState().game.notice)}</p>`))}),i.addEventListener("cancel",M=>{M.preventDefault(),e.getState().game.reportOpen||p()});let b=null,f="",h="",w=0;const R=()=>{const M=e.getState(),y=M.game;t(".score-button").innerHTML=`<i style="--score:${Li(M).total}%"></i> ${Li(M).total} 分 ›`,t("#cash").textContent=At(M.metrics.cash),t("#reputation").textContent=String(M.metrics.reputation),t("#owner").textContent=String(M.metrics.owner),t("#suite-count").textContent=$l(M)+" 间",t("#game-time").textContent=`${ia(y.day)} · Day ${y.day} ${Fo(y.minute)}${y.paused?" · 暂停":""}`,t(".today-hint span:nth-child(2)").textContent=y.tasks.find(E=>!E.claimed)?.title??"今日任务全部完成",t("#task-count").textContent=y.tasks.filter(E=>E.claimed).length+"/"+y.tasks.length,t("#occupancy").textContent=`${ql(M)}/${Ft(M).length} 在住 · 收入 ${At(y.revenue)}`,t(".event-strip span").textContent=(M.guests.some(E=>E.late==="pending"&&!E.departing)?"住客希望确认 4PM 退房":void 0)??y.events[0]?.title??(fn(M).length?`${fn(M).length} 位住客等待办理入住`:"酒店运营平稳"),t(".event-strip b").textContent=y.events.length?"处理 ›":"前台 ›",t(".event-strip").setAttribute("data-open",y.events.length||M.guests.some(E=>E.late==="pending"&&!E.departing)?"events":"front"),t(".review-strip span").textContent=y.notice,t(".weather span").textContent=y.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(E=>{E.classList.toggle("active",Number(E.dataset.speed)===M.speed),E.setAttribute("aria-pressed",String(Number(E.dataset.speed)===M.speed))});const v=M.floors.map(E=>E.id).join(",");if(f!==v&&(f=v,t(".floor-rail").innerHTML=[...M.floors].reverse().map(E=>`<button data-floor="${E.id}" aria-label="前往${E.label} ${E.name}">${E.label}</button>`).join("")),M.selectedId&&M.selectedId!==b&&(o=M.selectedId,a="entity",g()),b=M.selectedId,y.reportOpen&&w!==y.day&&(w=y.day,a="report",g()),h!==y.notice&&(h=y.notice,i.open)){let E=r.querySelector(".action-feedback");E||(E=document.createElement("p"),E.className="action-feedback",r.append(E)),E.textContent=y.notice}};return e.subscribe(R),R(),{stage:t(".world-stage"),setFocusHandler:M=>{c=M},showError:M=>u("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${at(M)}</p>`)}}function ou(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return au(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(g,b)=>{r.textContent=g,i.innerHTML=b,t.open||(a=document.activeElement,t.showModal())},d=g=>{const b=e.getState(),f=b.entities[g];if(!f)return;const h=No(b,g);if(f.kind==="room"){const w=b.guests.find(R=>R.id===f.guestId);c("HYATT PLACE · "+h.label,`<h2>${f.number}<span>${f.type==="suite"?"开放式套房":f.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${f.status}">${oa[f.status]}</div><dl><div><dt>住客</dt><dd>${w?w.name+" · "+w.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${f.nightsLeft?f.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${h.label} · ${h.name}</dd></div></dl>${w?"<blockquote>“"+w.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${h.id}">回到 ${f.number} 的楼层</button>`)}else{const w={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+h.label,`<h2>${f.name}</h2><p>${w[f.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${f.usage} / ${f.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${f.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${f.quality} / ${f.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${h.id}">回到${f.name}</button>`)}},p={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const g=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...g.floors].reverse().map(b=>`<button data-return="${b.id}"><b>${b.label}</b><span>${b.name}</span><small>${b.entityIds.length>1?b.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const g=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([b,f,h])=>`<button data-focus="${b}"><b>${g.visited.includes(b)?"✓":"○"}</b><span>${f}<small>${h}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const g=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(g.visited.length?[...g.visited].reverse().map(b=>{const f=g.entities[b];return`<button data-focus="${b}"><span>${f.kind==="room"?f.number+" 房间":f.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",g=>{const b=g.target.closest("button");if(b){if(b.matches(".close-sheet")&&l(),b.dataset.open&&(e.select(null),s=b.dataset.open,p[s]?.()),b.dataset.speed&&e.setSpeed(Number(b.dataset.speed)),b.dataset.return){const f=b.dataset.return;l(),e.focusFloor(f),o(f)}if(b.dataset.focus){const f=b.dataset.focus,h=No(e.getState(),f);l(),h&&(e.focusFloor(h.id),o(h.id)),e.select(f)}if(b.dataset.floor&&(e.focusFloor(b.dataset.floor),o(b.dataset.floor)),b.dataset.atmosphere&&(e.setAtmosphere(b.dataset.atmosphere),l()),b.matches(".weather")){const f=["dusk","night","day"];e.setAtmosphere(f[(f.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",g=>{g.preventDefault(),l()}),t.addEventListener("click",g=>{if(g.target===t){const b=t.getBoundingClientRect();(g.clientX<b.left||g.clientX>b.right||g.clientY<b.top||g.clientY>b.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(g=>`<button data-floor="${g.id}" aria-label="前往${g.label} ${g.name}">${g.label}</button>`).join("");let u=null;const x=g=>{n.querySelector("#cash").textContent="¥"+g.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(g.metrics.reputation),n.querySelector("#owner").textContent=String(g.metrics.owner),n.querySelector("#suite-count").textContent=$l(g)+" 间",n.querySelector("#occupancy").textContent=`${Ft(g).length} 间客房 · ${ql(g)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(b=>g.visited.includes(b)).length+"/3",n.querySelectorAll("[data-speed]").forEach(b=>{b.classList.toggle("active",Number(b.dataset.speed)===g.speed),b.setAttribute("aria-pressed",String(Number(b.dataset.speed)===g.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[g.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[g.atmosphere],n.querySelectorAll("[data-floor]").forEach(b=>b.classList.toggle("active",b.dataset.floor===g.focusedFloorId)),g.selectedId&&g.selectedId!==u&&(s="entity",d(g.selectedId)),u=g.selectedId};return e.subscribe(x),x(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:g=>{o=g},showError:g=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+g+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ao="185",lu=0,Oo=1,cu=2,Yr=1,Jl=2,sr=3,$n=0,Vt=1,An=2,Rn=0,Oi=1,Bo=2,ko=3,zo=4,uu=5,ti=100,du=101,hu=102,fu=103,pu=104,mu=200,gu=201,_u=202,vu=203,la=204,ca=205,xu=206,Mu=207,Su=208,bu=209,yu=210,Eu=211,Tu=212,Au=213,wu=214,ua=0,da=1,ha=2,zi=3,fa=4,pa=5,ma=6,ga=7,Ql=0,Ru=1,Cu=2,_n=0,jl=1,ec=2,tc=3,oo=4,nc=5,ic=6,rc=7,sc=300,ci=301,Gi=302,Ms=303,Ss=304,us=306,ts=1e3,wn=1001,_a=1002,wt=1003,Pu=1004,Tr=1005,Lt=1006,bs=1007,ri=1008,Yt=1009,ac=1010,oc=1011,hr=1012,lo=1013,xn=1014,rn=1015,Pn=1016,co=1017,uo=1018,fr=1020,lc=35902,cc=35899,uc=1021,dc=1022,sn=1023,In=1026,si=1027,ho=1028,fo=1029,ui=1030,po=1031,mo=1033,Kr=33776,Zr=33777,Jr=33778,Qr=33779,va=35840,xa=35841,Ma=35842,Sa=35843,ba=36196,ya=37492,Ea=37496,Ta=37488,Aa=37489,ns=37490,wa=37491,Ra=37808,Ca=37809,Pa=37810,Ia=37811,La=37812,Da=37813,Ua=37814,Na=37815,Fa=37816,Oa=37817,Ba=37818,ka=37819,za=37820,Ga=37821,Ha=36492,Va=36494,Wa=36495,Xa=36283,$a=36284,is=36285,qa=36286,Iu=3200,Ya=0,Lu=1,Hn="",Ht="srgb",rs="srgb-linear",ss="linear",Je="srgb",mi=7680,Go=519,Du=512,Uu=513,Nu=514,go=515,Fu=516,Ou=517,_o=518,Bu=519,Ho=35044,Vo="300 es",gn=2e3,pr=2001;function ku(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function as(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zu(){const n=as("canvas");return n.style.display="block",n}const Wo={};function Xo(...n){const e="THREE."+n.shift();console.log(e,...n)}function hc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=hc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function He(...n){n=hc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Bi(...n){const e=n.join(" ");e in Wo||(Wo[e]=!0,Ce(...n))}function Gu(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Hu={[ua]:da,[ha]:ma,[fa]:ga,[zi]:pa,[da]:ua,[ma]:ha,[ga]:fa,[pa]:zi};class di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ys=Math.PI/180,Ka=180/Math.PI;function mr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function Vu(n,e){return(n%e+e)%e}function Es(n,e,t){return(1-t)*n+t*e}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class ke{static{ke.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],p=i[r+3],u=s[a+0],x=s[a+1],g=s[a+2],b=s[a+3];if(p!==b||l!==u||c!==x||d!==g){let f=l*u+c*x+d*g+p*b;f<0&&(u=-u,x=-x,g=-g,b=-b,f=-f);let h=1-o;if(f<.9995){const w=Math.acos(f),R=Math.sin(w);h=Math.sin(h*w)/R,o=Math.sin(o*w)/R,l=l*h+u*o,c=c*h+x*o,d=d*h+g*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+x*o,d=d*h+g*o,p=p*h+b*o;const w=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=w,c*=w,d*=w,p*=w}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],p=s[a],u=s[a+1],x=s[a+2],g=s[a+3];return e[t]=o*g+d*p+l*x-c*u,e[t+1]=l*g+d*u+c*p-o*x,e[t+2]=c*g+d*x+o*u-l*p,e[t+3]=d*g-o*p-l*u-c*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),p=o(s/2),u=l(i/2),x=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*d*p+c*x*g,this._y=c*x*p-u*d*g,this._z=c*d*g+u*x*p,this._w=c*d*p-u*x*g;break;case"YXZ":this._x=u*d*p+c*x*g,this._y=c*x*p-u*d*g,this._z=c*d*g-u*x*p,this._w=c*d*p+u*x*g;break;case"ZXY":this._x=u*d*p-c*x*g,this._y=c*x*p+u*d*g,this._z=c*d*g+u*x*p,this._w=c*d*p-u*x*g;break;case"ZYX":this._x=u*d*p-c*x*g,this._y=c*x*p+u*d*g,this._z=c*d*g-u*x*p,this._w=c*d*p+u*x*g;break;case"YZX":this._x=u*d*p+c*x*g,this._y=c*x*p+u*d*g,this._z=c*d*g-u*x*p,this._w=c*d*p-u*x*g;break;case"XZY":this._x=u*d*p-c*x*g,this._y=c*x*p-u*d*g,this._z=c*d*g+u*x*p,this._w=c*d*p+u*x*g;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],p=t[10],u=i+o+p;if(u>0){const x=.5/Math.sqrt(u+1);this._w=.25/x,this._x=(d-l)*x,this._y=(s-c)*x,this._z=(a-r)*x}else if(i>o&&i>p){const x=2*Math.sqrt(1+i-o-p);this._w=(d-l)/x,this._x=.25*x,this._y=(r+a)/x,this._z=(s+c)/x}else if(o>p){const x=2*Math.sqrt(1+o-i-p);this._w=(s-c)/x,this._x=(r+a)/x,this._y=.25*x,this._z=(l+d)/x}else{const x=2*Math.sqrt(1+p-i-o);this._w=(a-r)/x,this._x=(s+c)/x,this._y=(l+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{static{O.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($o.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($o.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),p=2*(s*i-a*t);return this.x=t+l*c+a*p-o*d,this.y=i+l*d+o*c-s*p,this.z=r+l*p+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ts.copy(this).projectOnVector(e),this.sub(Ts)}reflect(e){return this.sub(Ts.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ts=new O,$o=new Xi;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],u=i[2],x=i[5],g=i[8],b=r[0],f=r[3],h=r[6],w=r[1],R=r[4],M=r[7],y=r[2],v=r[5],E=r[8];return s[0]=a*b+o*w+l*y,s[3]=a*f+o*R+l*v,s[6]=a*h+o*M+l*E,s[1]=c*b+d*w+p*y,s[4]=c*f+d*R+p*v,s[7]=c*h+d*M+p*E,s[2]=u*b+x*w+g*y,s[5]=u*f+x*R+g*v,s[8]=u*h+x*M+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*a-o*c,u=o*l-d*s,x=c*s-a*l,g=t*p+i*u+r*x;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=p*b,e[1]=(r*c-d*i)*b,e[2]=(o*i-r*a)*b,e[3]=u*b,e[4]=(d*t-r*l)*b,e[5]=(r*s-o*t)*b,e[6]=x*b,e[7]=(i*l-c*t)*b,e[8]=(a*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(As.makeScale(e,t)),this}rotate(e){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(As.makeRotation(-e)),this}translate(e,t){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(As.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const As=new Ie,qo=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yo=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wu(){const n={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Je&&(r.r=Cn(r.r),r.g=Cn(r.g),r.b=Cn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(r.r=ki(r.r),r.g=ki(r.g),r.b=ki(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Hn?ss:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[rs]:{primaries:e,whitePoint:i,transfer:ss,toXYZ:qo,fromXYZ:Yo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:Je,toXYZ:qo,fromXYZ:Yo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}const ze=Wu();function Cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ki(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let gi;class Xu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{gi===void 0&&(gi=as("canvas")),gi.width=e.width,gi.height=e.height;const r=gi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=gi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=as("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Cn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cn(t[i]/255)*255):t[i]=Cn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $u=0;class vo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=mr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ws(r[a].image)):s.push(ws(r[a]))}else s=ws(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ws(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let qu=0;const Rs=new O;class Ot extends di{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=wn,r=wn,s=Lt,a=ri,o=sn,l=Yt,c=Ot.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=mr(),this.name="",this.source=new vo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rs).x}get height(){return this.source.getSize(Rs).y}get depth(){return this.source.getSize(Rs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ts:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case _a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ts:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case _a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=sc;Ot.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],p=l[8],u=l[1],x=l[5],g=l[9],b=l[2],f=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-b)<.01&&Math.abs(g-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+b)<.1&&Math.abs(g+f)<.1&&Math.abs(c+x+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,M=(x+1)/2,y=(h+1)/2,v=(d+u)/4,E=(p+b)/4,_=(g+f)/4;return R>M&&R>y?R<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(R),r=v/i,s=E/i):M>y?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=v/r,s=_/r):y<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),i=E/s,r=_/s),this.set(i,r,s,t),this}let w=Math.sqrt((f-g)*(f-g)+(p-b)*(p-b)+(u-d)*(u-d));return Math.abs(w)<.001&&(w=1),this.x=(f-g)/w,this.y=(p-b)/w,this.z=(u-d)/w,this.w=Math.acos((c+x+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yu extends di{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ot(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Lt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new vo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends Yu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class fc extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ku extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class it{static{it.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,d,p,u,x,g,b,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,d,p,u,x,g,b,f)}set(e,t,i,r,s,a,o,l,c,d,p,u,x,g,b,f){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=u,h[3]=x,h[7]=g,h[11]=b,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/_i.setFromMatrixColumn(e,0).length(),s=1/_i.setFromMatrixColumn(e,1).length(),a=1/_i.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const u=a*d,x=a*p,g=o*d,b=o*p;t[0]=l*d,t[4]=-l*p,t[8]=c,t[1]=x+g*c,t[5]=u-b*c,t[9]=-o*l,t[2]=b-u*c,t[6]=g+x*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,x=l*p,g=c*d,b=c*p;t[0]=u+b*o,t[4]=g*o-x,t[8]=a*c,t[1]=a*p,t[5]=a*d,t[9]=-o,t[2]=x*o-g,t[6]=b+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,x=l*p,g=c*d,b=c*p;t[0]=u-b*o,t[4]=-a*p,t[8]=g+x*o,t[1]=x+g*o,t[5]=a*d,t[9]=b-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,x=a*p,g=o*d,b=o*p;t[0]=l*d,t[4]=g*c-x,t[8]=u*c+b,t[1]=l*p,t[5]=b*c+u,t[9]=x*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,x=a*c,g=o*l,b=o*c;t[0]=l*d,t[4]=b-u*p,t[8]=g*p+x,t[1]=p,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=x*p+g,t[10]=u-b*p}else if(e.order==="XZY"){const u=a*l,x=a*c,g=o*l,b=o*c;t[0]=l*d,t[4]=-p,t[8]=c*d,t[1]=u*p+b,t[5]=a*d,t[9]=x*p-g,t[2]=g*p-x,t[6]=o*d,t[10]=b*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zu,e,Ju)}lookAt(e,t,i){const r=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Fn.crossVectors(i,Xt),Fn.lengthSq()===0&&(Math.abs(i.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Fn.crossVectors(i,Xt)),Fn.normalize(),Ar.crossVectors(Xt,Fn),r[0]=Fn.x,r[4]=Ar.x,r[8]=Xt.x,r[1]=Fn.y,r[5]=Ar.y,r[9]=Xt.y,r[2]=Fn.z,r[6]=Ar.z,r[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],u=i[9],x=i[13],g=i[2],b=i[6],f=i[10],h=i[14],w=i[3],R=i[7],M=i[11],y=i[15],v=r[0],E=r[4],_=r[8],A=r[12],L=r[1],C=r[5],U=r[9],$=r[13],J=r[2],B=r[6],Y=r[10],H=r[14],j=r[3],te=r[7],he=r[11],ge=r[15];return s[0]=a*v+o*L+l*J+c*j,s[4]=a*E+o*C+l*B+c*te,s[8]=a*_+o*U+l*Y+c*he,s[12]=a*A+o*$+l*H+c*ge,s[1]=d*v+p*L+u*J+x*j,s[5]=d*E+p*C+u*B+x*te,s[9]=d*_+p*U+u*Y+x*he,s[13]=d*A+p*$+u*H+x*ge,s[2]=g*v+b*L+f*J+h*j,s[6]=g*E+b*C+f*B+h*te,s[10]=g*_+b*U+f*Y+h*he,s[14]=g*A+b*$+f*H+h*ge,s[3]=w*v+R*L+M*J+y*j,s[7]=w*E+R*C+M*B+y*te,s[11]=w*_+R*U+M*Y+y*he,s[15]=w*A+R*$+M*H+y*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],u=e[10],x=e[14],g=e[3],b=e[7],f=e[11],h=e[15],w=l*x-c*u,R=o*x-c*p,M=o*u-l*p,y=a*x-c*d,v=a*u-l*d,E=a*p-o*d;return t*(b*w-f*R+h*M)-i*(g*w-f*y+h*v)+r*(g*R-b*y+h*E)-s*(g*M-b*v+f*E)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(s*d-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],u=e[10],x=e[11],g=e[12],b=e[13],f=e[14],h=e[15],w=t*o-i*a,R=t*l-r*a,M=t*c-s*a,y=i*l-r*o,v=i*c-s*o,E=r*c-s*l,_=d*b-p*g,A=d*f-u*g,L=d*h-x*g,C=p*f-u*b,U=p*h-x*b,$=u*h-x*f,J=w*$-R*U+M*C+y*L-v*A+E*_;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/J;return e[0]=(o*$-l*U+c*C)*B,e[1]=(r*U-i*$-s*C)*B,e[2]=(b*E-f*v+h*y)*B,e[3]=(u*v-p*E-x*y)*B,e[4]=(l*L-a*$-c*A)*B,e[5]=(t*$-r*L+s*A)*B,e[6]=(f*M-g*E-h*R)*B,e[7]=(d*E-u*M+x*R)*B,e[8]=(a*U-o*L+c*_)*B,e[9]=(i*L-t*U-s*_)*B,e[10]=(g*v-b*M+h*w)*B,e[11]=(p*M-d*v-x*w)*B,e[12]=(o*A-a*C-l*_)*B,e[13]=(t*C-i*A+r*_)*B,e[14]=(b*R-g*y-f*w)*B,e[15]=(d*y-p*R+u*w)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,p=o+o,u=s*c,x=s*d,g=s*p,b=a*d,f=a*p,h=o*p,w=l*c,R=l*d,M=l*p,y=i.x,v=i.y,E=i.z;return r[0]=(1-(b+h))*y,r[1]=(x+M)*y,r[2]=(g-R)*y,r[3]=0,r[4]=(x-M)*v,r[5]=(1-(u+h))*v,r[6]=(f+w)*v,r[7]=0,r[8]=(g+R)*E,r[9]=(f-w)*E,r[10]=(1-(u+b))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=_i.set(r[0],r[1],r[2]).length();const o=_i.set(r[4],r[5],r[6]).length(),l=_i.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Qt.copy(this);const c=1/a,d=1/o,p=1/l;return Qt.elements[0]*=c,Qt.elements[1]*=c,Qt.elements[2]*=c,Qt.elements[4]*=d,Qt.elements[5]*=d,Qt.elements[6]*=d,Qt.elements[8]*=p,Qt.elements[9]*=p,Qt.elements[10]*=p,t.setFromRotationMatrix(Qt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=gn,l=!1){const c=this.elements,d=2*s/(t-e),p=2*s/(i-r),u=(t+e)/(t-e),x=(i+r)/(i-r);let g,b;if(l)g=s/(a-s),b=a*s/(a-s);else if(o===gn)g=-(a+s)/(a-s),b=-2*a*s/(a-s);else if(o===pr)g=-a/(a-s),b=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=x,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=gn,l=!1){const c=this.elements,d=2/(t-e),p=2/(i-r),u=-(t+e)/(t-e),x=-(i+r)/(i-r);let g,b;if(l)g=1/(a-s),b=a/(a-s);else if(o===gn)g=-2/(a-s),b=-(a+s)/(a-s);else if(o===pr)g=-1/(a-s),b=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=x,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const _i=new O,Qt=new it,Zu=new O(0,0,0),Ju=new O(1,1,1),Fn=new O,Ar=new O,Xt=new O,Ko=new it,Zo=new Xi;class qn{constructor(e=0,t=0,i=0,r=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],p=r[2],u=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,x),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,x),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,x),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,x));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,x),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ko.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ko,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zo.setFromEuler(this),this.setFromQuaternion(Zo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class xo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qu=0;const Jo=new O,vi=new Xi,Sn=new it,wr=new O,Zi=new O,ju=new O,ed=new Xi,Qo=new O(1,0,0),jo=new O(0,1,0),el=new O(0,0,1),tl={type:"added"},td={type:"removed"},xi={type:"childadded",child:null},Cs={type:"childremoved",child:null};class Rt extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new O,t=new qn,i=new Xi,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new it},normalMatrix:{value:new Ie}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.multiply(vi),this}rotateOnWorldAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.premultiply(vi),this}rotateX(e){return this.rotateOnAxis(Qo,e)}rotateY(e){return this.rotateOnAxis(jo,e)}rotateZ(e){return this.rotateOnAxis(el,e)}translateOnAxis(e,t){return Jo.copy(e).applyQuaternion(this.quaternion),this.position.add(Jo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qo,e)}translateY(e){return this.translateOnAxis(jo,e)}translateZ(e){return this.translateOnAxis(el,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?wr.copy(e):wr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(Zi,wr,this.up):Sn.lookAt(wr,Zi,this.up),this.quaternion.setFromRotationMatrix(Sn),r&&(Sn.extractRotation(r.matrixWorld),vi.setFromRotationMatrix(Sn),this.quaternion.premultiply(vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tl),xi.child=e,this.dispatchEvent(xi),xi.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(td),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tl),xi.child=e,this.dispatchEvent(xi),xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,ju),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,ed,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),p=a(e.shapes),u=a(e.skeletons),x=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),x.length>0&&(i.animations=x),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new O(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Dt extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nd={type:"move"};class Ps{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const b of e.hand.values()){const f=t.getJointPose(b,i),h=this._getHandJoint(c,b);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),x=.02,g=.005;c.inputState.pinching&&u>x+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=x-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const pc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function Is(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,ze.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ze.workingColorSpace){if(e=Vu(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Is(a,s,e+1/3),this.g=Is(a,s,e),this.b=Is(a,s,e-1/3)}return ze.colorSpaceToWorking(this,r),this}setStyle(e,t=Ht){function i(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const i=pc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return ze.workingToColorSpace(It.copy(this),e),Math.round(Ge(It.r*255,0,255))*65536+Math.round(Ge(It.g*255,0,255))*256+Math.round(Ge(It.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const p=a-o;switch(c=d<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Ht){ze.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Rr);const i=Es(On.h,Rr.h,t),r=Es(On.s,Rr.s,t),s=Es(On.l,Rr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Ve;Ve.NAMES=pc;class id extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jt=new O,bn=new O,Ls=new O,yn=new O,Mi=new O,Si=new O,nl=new O,Ds=new O,Us=new O,Ns=new O,Fs=new ot,Os=new ot,Bs=new ot;class nn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jt.subVectors(e,t),r.cross(jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jt.subVectors(r,t),bn.subVectors(i,t),Ls.subVectors(e,t);const a=jt.dot(jt),o=jt.dot(bn),l=jt.dot(Ls),c=bn.dot(bn),d=bn.dot(Ls),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;const u=1/p,x=(c*l-o*d)*u,g=(a*d-o*l)*u;return s.set(1-x-g,g,x)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,yn.x),l.addScaledVector(a,yn.y),l.addScaledVector(o,yn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Fs.setScalar(0),Os.setScalar(0),Bs.setScalar(0),Fs.fromBufferAttribute(e,t),Os.fromBufferAttribute(e,i),Bs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fs,s.x),a.addScaledVector(Os,s.y),a.addScaledVector(Bs,s.z),a}static isFrontFacing(e,t,i,r){return jt.subVectors(i,t),bn.subVectors(e,t),jt.cross(bn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),jt.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Mi.subVectors(r,i),Si.subVectors(s,i),Ds.subVectors(e,i);const l=Mi.dot(Ds),c=Si.dot(Ds);if(l<=0&&c<=0)return t.copy(i);Us.subVectors(e,r);const d=Mi.dot(Us),p=Si.dot(Us);if(d>=0&&p<=d)return t.copy(r);const u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(Mi,a);Ns.subVectors(e,s);const x=Mi.dot(Ns),g=Si.dot(Ns);if(g>=0&&x<=g)return t.copy(s);const b=x*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Si,o);const f=d*g-x*p;if(f<=0&&p-d>=0&&x-g>=0)return nl.subVectors(s,r),o=(p-d)/(p-d+(x-g)),t.copy(r).addScaledVector(nl,o);const h=1/(f+b+u);return a=b*h,o=u*h,t.copy(i).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(s,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cr.copy(i.boundingBox)),Cr.applyMatrix4(e.matrixWorld),this.union(Cr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Pr.subVectors(this.max,Ji),bi.subVectors(e.a,Ji),yi.subVectors(e.b,Ji),Ei.subVectors(e.c,Ji),Bn.subVectors(yi,bi),kn.subVectors(Ei,yi),Zn.subVectors(bi,Ei);let t=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-Zn.z,Zn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,Zn.z,0,-Zn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-Zn.y,Zn.x,0];return!ks(t,bi,yi,Ei,Pr)||(t=[1,0,0,0,1,0,0,0,1],!ks(t,bi,yi,Ei,Pr))?!1:(Ir.crossVectors(Bn,kn),t=[Ir.x,Ir.y,Ir.z],ks(t,bi,yi,Ei,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const En=[new O,new O,new O,new O,new O,new O,new O,new O],en=new O,Cr=new hi,bi=new O,yi=new O,Ei=new O,Bn=new O,kn=new O,Zn=new O,Ji=new O,Pr=new O,Ir=new O,Jn=new O;function ks(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Jn.fromArray(n,s);const o=r.x*Math.abs(Jn.x)+r.y*Math.abs(Jn.y)+r.z*Math.abs(Jn.z),l=e.dot(Jn),c=t.dot(Jn),d=i.dot(Jn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const vt=new O,Lr=new ke;let rd=0;class an extends di{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ho,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ho&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class mc extends an{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class gc extends an{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bt extends an{constructor(e,t,i){super(new Float32Array(e),t,i)}}const sd=new hi,Qi=new O,zs=new O;class gr{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):sd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Qi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(zs)),this.expandByPoint(Qi.copy(e.center).sub(zs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ad=0;const Zt=new it,Gs=new Rt,Ti=new O,$t=new hi,ji=new hi,yt=new O;class on extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ku(e)?gc:mc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ie().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,i){return Zt.makeTranslation(e,t,i),this.applyMatrix4(Zt),this}scale(e,t,i){return Zt.makeScale(e,t,i),this.applyMatrix4(Zt),this}lookAt(e){return Gs.lookAt(e),Gs.updateMatrix(),this.applyMatrix4(Gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors($t.min,ji.min),$t.expandByPoint(yt),yt.addVectors($t.max,ji.max),$t.expandByPoint(yt)):($t.expandByPoint(ji.min),$t.expandByPoint(ji.max))}$t.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)yt.fromBufferAttribute(o,c),l&&(Ti.fromBufferAttribute(e,c),yt.add(Ti)),r=Math.max(r,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new an(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new O,l[_]=new O;const c=new O,d=new O,p=new O,u=new ke,x=new ke,g=new ke,b=new O,f=new O;function h(_,A,L){c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,A),p.fromBufferAttribute(i,L),u.fromBufferAttribute(s,_),x.fromBufferAttribute(s,A),g.fromBufferAttribute(s,L),d.sub(c),p.sub(c),x.sub(u),g.sub(u);const C=1/(x.x*g.y-g.x*x.y);isFinite(C)&&(b.copy(d).multiplyScalar(g.y).addScaledVector(p,-x.y).multiplyScalar(C),f.copy(p).multiplyScalar(x.x).addScaledVector(d,-g.x).multiplyScalar(C),o[_].add(b),o[A].add(b),o[L].add(b),l[_].add(f),l[A].add(f),l[L].add(f))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let _=0,A=w.length;_<A;++_){const L=w[_],C=L.start,U=L.count;for(let $=C,J=C+U;$<J;$+=3)h(e.getX($+0),e.getX($+1),e.getX($+2))}const R=new O,M=new O,y=new O,v=new O;function E(_){y.fromBufferAttribute(r,_),v.copy(y);const A=o[_];R.copy(A),R.sub(y.multiplyScalar(y.dot(A))).normalize(),M.crossVectors(v,A);const C=M.dot(l[_])<0?-1:1;a.setXYZW(_,R.x,R.y,R.z,C)}for(let _=0,A=w.length;_<A;++_){const L=w[_],C=L.start,U=L.count;for(let $=C,J=C+U;$<J;$+=3)E(e.getX($+0)),E(e.getX($+1)),E(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,x=i.count;u<x;u++)i.setXYZ(u,0,0,0);const r=new O,s=new O,a=new O,o=new O,l=new O,c=new O,d=new O,p=new O;if(e)for(let u=0,x=e.count;u<x;u+=3){const g=e.getX(u+0),b=e.getX(u+1),f=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,f),d.subVectors(a,s),p.subVectors(r,s),d.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,f),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,x=t.count;u<x;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),p.subVectors(r,s),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d);let x=0,g=0;for(let b=0,f=l.length;b<f;b++){o.isInterleavedBufferAttribute?x=l[b]*o.data.stride+o.offset:x=l[b]*d;for(let h=0;h<d;h++)u[g++]=c[x++]}return new an(u,d,p)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,p=c.length;d<p;d++){const u=c[d],x=e(u,i);l.push(x)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){const x=c[p];d.push(x.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],p=s[c];for(let u=0,x=p.length;u<x;u++)d.push(p[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let od=0;class _r extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=mr(),this.name="",this.type="Material",this.blending=Oi,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=la,this.blendDst=ca,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Go,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(i.blending=this.blending),this.side!==$n&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==la&&(i.blendSrc=this.blendSrc),this.blendDst!==ca&&(i.blendDst=this.blendDst),this.blendEquation!==ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Go&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Tn=new O,Hs=new O,Dr=new O,zn=new O,Vs=new O,Ur=new O,Ws=new O;class _c{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tn.copy(this.origin).addScaledVector(this.direction,t),Tn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Hs.copy(e).add(t).multiplyScalar(.5),Dr.copy(t).sub(e).normalize(),zn.copy(this.origin).sub(Hs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Dr),o=zn.dot(this.direction),l=-zn.dot(Dr),c=zn.lengthSq(),d=Math.abs(1-a*a);let p,u,x,g;if(d>0)if(p=a*l-o,u=a*o-l,g=s*d,p>=0)if(u>=-g)if(u<=g){const b=1/d;p*=b,u*=b,x=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=s,p=Math.max(0,-(a*u+o)),x=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(a*u+o)),x=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-a*s+o)),u=p>0?-s:Math.min(Math.max(-s,-l),s),x=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-s,-l),s),x=u*(u+2*l)+c):(p=Math.max(0,-(a*s+o)),u=p>0?s:Math.min(Math.max(-s,-l),s),x=-p*p+u*(u+2*l)+c);else u=a>0?-s:s,p=Math.max(0,-(a*u+o)),x=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Hs).addScaledVector(Dr,u),x}intersectSphere(e,t){Tn.subVectors(e.center,this.origin);const i=Tn.dot(this.direction),r=Tn.dot(Tn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Tn)!==null}intersectTriangle(e,t,i,r,s){Vs.subVectors(t,e),Ur.subVectors(i,e),Ws.crossVectors(Vs,Ur);let a=this.direction.dot(Ws),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;zn.subVectors(this.origin,e);const l=o*this.direction.dot(Ur.crossVectors(zn,Ur));if(l<0)return null;const c=o*this.direction.dot(Vs.cross(zn));if(c<0||l+c>a)return null;const d=-o*zn.dot(Ws);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vr extends _r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const il=new it,Qn=new _c,Nr=new gr,rl=new O,Fr=new O,Or=new O,Br=new O,Xs=new O,kr=new O,sl=new O,zr=new O;class Et extends Rt{constructor(e=new on,t=new vr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){kr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],p=s[l];d!==0&&(Xs.fromBufferAttribute(p,e),a?kr.addScaledVector(Xs,d):kr.addScaledVector(Xs.sub(t),d))}t.add(kr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere),Nr.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(Nr.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Nr,rl)===null||Qn.origin.distanceToSquared(rl)>(e.far-e.near)**2))&&(il.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(il),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,p=s.attributes.normal,u=s.groups,x=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){const f=u[g],h=a[f.materialIndex],w=Math.max(f.start,x.start),R=Math.min(o.count,Math.min(f.start+f.count,x.start+x.count));for(let M=w,y=R;M<y;M+=3){const v=o.getX(M),E=o.getX(M+1),_=o.getX(M+2);r=Gr(this,h,e,i,c,d,p,v,E,_),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const g=Math.max(0,x.start),b=Math.min(o.count,x.start+x.count);for(let f=g,h=b;f<h;f+=3){const w=o.getX(f),R=o.getX(f+1),M=o.getX(f+2);r=Gr(this,a,e,i,c,d,p,w,R,M),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){const f=u[g],h=a[f.materialIndex],w=Math.max(f.start,x.start),R=Math.min(l.count,Math.min(f.start+f.count,x.start+x.count));for(let M=w,y=R;M<y;M+=3){const v=M,E=M+1,_=M+2;r=Gr(this,h,e,i,c,d,p,v,E,_),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const g=Math.max(0,x.start),b=Math.min(l.count,x.start+x.count);for(let f=g,h=b;f<h;f+=3){const w=f,R=f+1,M=f+2;r=Gr(this,a,e,i,c,d,p,w,R,M),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}}function ld(n,e,t,i,r,s,a,o){let l;if(e.side===Vt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===$n,o),l===null)return null;zr.copy(o),zr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(zr);return c<t.near||c>t.far?null:{distance:c,point:zr.clone(),object:n}}function Gr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Fr),n.getVertexPosition(l,Or),n.getVertexPosition(c,Br);const d=ld(n,e,t,i,Fr,Or,Br,sl);if(d){const p=new O;nn.getBarycoord(sl,Fr,Or,Br,p),r&&(d.uv=nn.getInterpolatedAttribute(r,o,l,c,p,new ke)),s&&(d.uv1=nn.getInterpolatedAttribute(s,o,l,c,p,new ke)),a&&(d.normal=nn.getInterpolatedAttribute(a,o,l,c,p,new O),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new O,materialIndex:0};nn.getNormal(Fr,Or,Br,u.normal),d.face=u,d.barycoord=p}return d}class Mo extends Ot{constructor(e=null,t=1,i=1,r,s,a,o,l,c=wt,d=wt,p,u){super(null,a,o,l,c,d,r,s,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class al extends an{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new it,ol=new it,Hr=[],ll=new hi,cd=new it,er=new Et,tr=new gr;class vc extends Et{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new al(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,cd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ai),ll.copy(e.boundingBox).applyMatrix4(Ai),this.boundingBox.union(ll)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ai),tr.copy(e.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(i),e.ray.intersectsSphere(tr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ai),ol.multiplyMatrices(i,Ai),er.matrixWorld=ol,er.raycast(e,Hr);for(let a=0,o=Hr.length;a<o;a++){const l=Hr[a];l.instanceId=s,l.object=this,t.push(l)}Hr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new al(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Mo(new Float32Array(r*this.count),r,this.count,ho,rn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const $s=new O,ud=new O,dd=new Ie;class ei{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=$s.subVectors(i,t).cross(ud.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta($s),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||dd.getNormalMatrix(e),r=this.coplanarPoint($s).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new gr,hd=new ke(.5,.5),Vr=new O;class So{constructor(e=new ei,t=new ei,i=new ei,r=new ei,s=new ei,a=new ei){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=gn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],d=s[4],p=s[5],u=s[6],x=s[7],g=s[8],b=s[9],f=s[10],h=s[11],w=s[12],R=s[13],M=s[14],y=s[15];if(r[0].setComponents(c-a,x-d,h-g,y-w).normalize(),r[1].setComponents(c+a,x+d,h+g,y+w).normalize(),r[2].setComponents(c+o,x+p,h+b,y+R).normalize(),r[3].setComponents(c-o,x-p,h-b,y-R).normalize(),i)r[4].setComponents(l,u,f,M).normalize(),r[5].setComponents(c-l,x-u,h-f,y-M).normalize();else if(r[4].setComponents(c-l,x-u,h-f,y-M).normalize(),t===gn)r[5].setComponents(c+l,x+u,h+f,y+M).normalize();else if(t===pr)r[5].setComponents(l,u,f,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){jn.center.set(0,0,0);const t=hd.distanceTo(e.center);return jn.radius=.7071067811865476+t,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Vr.x=r.normal.x>0?e.max.x:e.min.x,Vr.y=r.normal.y>0?e.max.y:e.min.y,Vr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xc extends Ot{constructor(e=[],t=ci,i,r,s,a,o,l,c,d){super(e,t,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hi extends Ot{constructor(e,t,i=xn,r,s,a,o=wt,l=wt,c,d=In,p=1){if(d!==In&&d!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:p};super(u,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class fd extends Hi{constructor(e,t=xn,i=ci,r,s,a=wt,o=wt,l,c=In){const d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Mc extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $i extends on{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],p=[];let u=0,x=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(p,2));function g(b,f,h,w,R,M,y,v,E,_,A){const L=M/E,C=y/_,U=M/2,$=y/2,J=v/2,B=E+1,Y=_+1;let H=0,j=0;const te=new O;for(let he=0;he<Y;he++){const ge=he*C-$;for(let xe=0;xe<B;xe++){const qe=xe*L-U;te[b]=qe*w,te[f]=ge*R,te[h]=J,c.push(te.x,te.y,te.z),te[b]=0,te[f]=0,te[h]=v>0?1:-1,d.push(te.x,te.y,te.z),p.push(xe/E),p.push(1-he/_),H+=1}}for(let he=0;he<_;he++)for(let ge=0;ge<E;ge++){const xe=u+ge+B*he,qe=u+ge+B*(he+1),lt=u+(ge+1)+B*(he+1),Ye=u+(ge+1)+B*he;l.push(xe,qe,Ye),l.push(qe,lt,Ye),j+=6}o.addGroup(x,j,A),x+=j,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ds extends on{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],p=[],u=[],x=[];let g=0;const b=[],f=i/2;let h=0;w(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(d),this.setAttribute("position",new Bt(p,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(x,2));function w(){const M=new O,y=new O;let v=0;const E=(t-e)/i;for(let _=0;_<=s;_++){const A=[],L=_/s,C=L*(t-e)+e;for(let U=0;U<=r;U++){const $=U/r,J=$*l+o,B=Math.sin(J),Y=Math.cos(J);y.x=C*B,y.y=-L*i+f,y.z=C*Y,p.push(y.x,y.y,y.z),M.set(B,E,Y).normalize(),u.push(M.x,M.y,M.z),x.push($,1-L),A.push(g++)}b.push(A)}for(let _=0;_<r;_++)for(let A=0;A<s;A++){const L=b[A][_],C=b[A+1][_],U=b[A+1][_+1],$=b[A][_+1];(e>0||A!==0)&&(d.push(L,C,$),v+=3),(t>0||A!==s-1)&&(d.push(C,U,$),v+=3)}c.addGroup(h,v,0),h+=v}function R(M){const y=g,v=new ke,E=new O;let _=0;const A=M===!0?e:t,L=M===!0?1:-1;for(let U=1;U<=r;U++)p.push(0,f*L,0),u.push(0,L,0),x.push(.5,.5),g++;const C=g;for(let U=0;U<=r;U++){const J=U/r*l+o,B=Math.cos(J),Y=Math.sin(J);E.x=A*Y,E.y=f*L,E.z=A*B,p.push(E.x,E.y,E.z),u.push(0,L,0),v.x=B*.5+.5,v.y=Y*.5*L+.5,x.push(v.x,v.y),g++}for(let U=0;U<r;U++){const $=y+U,J=C+U;M===!0?d.push(J,J+1,$):d.push(J+1,J,$),_+=3}c.addGroup(h,_,M===!0?1:2),h+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hs extends ds{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new hs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qi extends on{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,p=e/o,u=t/l,x=[],g=[],b=[],f=[];for(let h=0;h<d;h++){const w=h*u-a;for(let R=0;R<c;R++){const M=R*p-s;g.push(M,-w,0),b.push(0,0,1),f.push(R/o),f.push(1-h/l)}}for(let h=0;h<l;h++)for(let w=0;w<o;w++){const R=w+c*h,M=w+c*(h+1),y=w+1+c*(h+1),v=w+1+c*h;x.push(R,M,v),x.push(M,y,v)}this.setIndex(x),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(b,3)),this.setAttribute("uv",new Bt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class os extends on{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],p=new O,u=new O,x=[],g=[],b=[],f=[];for(let h=0;h<=i;h++){const w=[],R=h/i,M=a+R*o,y=e*Math.cos(M),v=Math.sqrt(e*e-y*y);let E=0;h===0&&a===0?E=.5/t:h===i&&l===Math.PI&&(E=-.5/t);for(let _=0;_<=t;_++){const A=_/t,L=r+A*s;p.x=-v*Math.cos(L),p.y=y,p.z=v*Math.sin(L),g.push(p.x,p.y,p.z),u.copy(p).normalize(),b.push(u.x,u.y,u.z),f.push(A+E,1-R),w.push(c++)}d.push(w)}for(let h=0;h<i;h++)for(let w=0;w<t;w++){const R=d[h][w+1],M=d[h][w],y=d[h+1][w],v=d[h+1][w+1];(h!==0||a>0)&&x.push(R,M,v),(h!==i-1||l<Math.PI)&&x.push(M,y,v)}this.setIndex(x),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(b,3)),this.setAttribute("uv",new Bt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new os(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Vi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(cl(r))r.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(cl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ut(n){const e={};for(let t=0;t<n.length;t++){const i=Vi(n[t]);for(const r in i)e[r]=i[r]}return e}function cl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function pd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}const md={clone:Vi,merge:Ut};var gd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends _r{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(r.value);break;case"v2":this.uniforms[i].value=new ke().fromArray(r.value);break;case"v3":this.uniforms[i].value=new O().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"m4":this.uniforms[i].value=new it().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class vd extends Mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mt extends _r{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xd extends _r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Md extends _r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bc extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Sd extends bc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const qs=new it,ul=new O,dl=new O;class bd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new So,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ul.setFromMatrixPosition(e.matrixWorld),t.position.copy(ul),dl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dl),t.updateMatrixWorld(),qs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qs,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===pr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(qs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Wr=new O,Xr=new Xi,dn=new O;class yc extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wr,Xr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,dn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Wr,Xr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new O,hl=new ke,fl=new ke;class tn extends yc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ka*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ka*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z)}getViewSize(e,t){return this.getViewBounds(e,hl,fl),t.subVectors(fl,hl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ys*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class fs extends yc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yd extends bd{constructor(){super(new fs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ed extends bc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new yd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const wi=-90,Ri=1;class Td extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new tn(wi,Ri,e,t);r.layers=this.layers,this.add(r);const s=new tn(wi,Ri,e,t);s.layers=this.layers,this.add(s);const a=new tn(wi,Ri,e,t);a.layers=this.layers,this.add(a);const o=new tn(wi,Ri,e,t);o.layers=this.layers,this.add(o);const l=new tn(wi,Ri,e,t);l.layers=this.layers,this.add(l);const c=new tn(wi,Ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===pr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(p,u,x),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ad extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const pl=new it;class wd{constructor(e,t,i=0,r=1/0){this.ray=new _c(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new xo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):He("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pl),this}intersectObject(e,t=!0,i=[]){return Za(e,this,i,t),i.sort(ml),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Za(e[r],this,i,t);return i.sort(ml),i}}function ml(n,e){return n.distance-e.distance}function Za(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Za(s[a],e,t,!0)}}class Ec{static{Ec.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function gl(n,e,t,i){const r=Rd(i);switch(t){case uc:return n*e;case ho:return n*e/r.components*r.byteLength;case fo:return n*e/r.components*r.byteLength;case ui:return n*e*2/r.components*r.byteLength;case po:return n*e*2/r.components*r.byteLength;case dc:return n*e*3/r.components*r.byteLength;case sn:return n*e*4/r.components*r.byteLength;case mo:return n*e*4/r.components*r.byteLength;case Kr:case Zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Qr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:case Sa:return Math.max(n,16)*Math.max(e,8)/4;case va:case Ma:return Math.max(n,8)*Math.max(e,8)/2;case ba:case ya:case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:case ns:case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Na:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ka:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case za:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ha:case Va:case Wa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Xa:case $a:return Math.ceil(n/4)*Math.ceil(e/4)*8;case is:case qa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rd(n){switch(n){case Yt:case ac:return{byteLength:1,components:1};case hr:case oc:case Pn:return{byteLength:2,components:1};case co:case uo:return{byteLength:2,components:4};case xn:case lo:case rn:return{byteLength:4,components:1};case lc:case cc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ao}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ao);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Tc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Cd(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,p=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let x;if(c instanceof Float32Array)x=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)x=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?x=n.HALF_FLOAT:x=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)x=n.SHORT;else if(c instanceof Uint32Array)x=n.UNSIGNED_INT;else if(c instanceof Int32Array)x=n.INT;else if(c instanceof Int8Array)x=n.BYTE;else if(c instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:x,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const d=l.array,p=l.updateRanges;if(n.bindBuffer(c,o),p.length===0)n.bufferSubData(c,0,d);else{p.sort((x,g)=>x.start-g.start);let u=0;for(let x=1;x<p.length;x++){const g=p[u],b=p[x];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,p[u]=b)}p.length=u+1;for(let x=0,g=p.length;x<g;x++){const b=p[x];n.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Id=`#ifdef USE_ALPHAHASH
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
#endif`,Ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
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
#endif`,Od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bd=`#ifdef USE_BATCHING
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
#endif`,kd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vd=`#ifdef USE_IRIDESCENCE
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
#endif`,Wd=`#ifdef USE_BUMPMAP
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
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,jd=`#define PI 3.141592653589793
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
} // validated`,eh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,th=`vec3 transformedNormal = objectNormal;
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
#endif`,nh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ih=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ah="gl_FragColor = linearToOutputTexel( gl_FragColor );",oh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lh=`#ifdef USE_ENVMAP
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
#endif`,ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uh=`#ifdef USE_ENVMAP
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
#endif`,dh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hh=`#ifdef USE_ENVMAP
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
#endif`,fh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ph=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_h=`#ifdef USE_GRADIENTMAP
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
}`,vh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sh=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,bh=`#ifdef USE_ENVMAP
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
#endif`,yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Th=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ah=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wh=`PhysicalMaterial material;
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
#endif`,Rh=`uniform sampler2D dfgLUT;
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
}`,Ch=`
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
#endif`,Ph=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ih=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lh=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Dh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Oh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zh=`#if defined( USE_POINTS_UV )
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
#endif`,Gh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$h=`#ifdef USE_MORPHTARGETS
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
#endif`,qh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jh=`#ifdef USE_NORMALMAP
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
#endif`,ef=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,df=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gf=`float getShadowMask() {
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
}`,_f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vf=`#ifdef USE_SKINNING
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
#endif`,xf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mf=`#ifdef USE_SKINNING
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
#endif`,Sf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ef=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tf=`#ifdef USE_TRANSMISSION
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
#endif`,Af=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const If=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lf=`uniform sampler2D t2D;
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`#include <common>
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
}`,Bf=`#if DEPTH_PACKING == 3200
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
}`,kf=`#define DISTANCE
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
}`,zf=`#define DISTANCE
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
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`uniform float scale;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,Xf=`#include <common>
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
}`,$f=`uniform vec3 diffuse;
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
}`,qf=`#define LAMBERT
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
}`,Yf=`#define LAMBERT
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
}`,Kf=`#define MATCAP
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
}`,Zf=`#define MATCAP
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
}`,Jf=`#define NORMAL
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
}`,Qf=`#define NORMAL
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
}`,jf=`#define PHONG
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
}`,ep=`#define PHONG
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
}`,tp=`#define STANDARD
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
}`,np=`#define STANDARD
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
}`,ip=`#define TOON
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
}`,rp=`#define TOON
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
}`,sp=`uniform float size;
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
}`,ap=`uniform vec3 diffuse;
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
}`,op=`#include <common>
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
}`,lp=`uniform vec3 color;
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
}`,cp=`uniform float rotation;
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
}`,up=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Pd,alphahash_pars_fragment:Id,alphamap_fragment:Ld,alphamap_pars_fragment:Dd,alphatest_fragment:Ud,alphatest_pars_fragment:Nd,aomap_fragment:Fd,aomap_pars_fragment:Od,batching_pars_vertex:Bd,batching_vertex:kd,begin_vertex:zd,beginnormal_vertex:Gd,bsdfs:Hd,iridescence_fragment:Vd,bumpmap_pars_fragment:Wd,clipping_planes_fragment:Xd,clipping_planes_pars_fragment:$d,clipping_planes_pars_vertex:qd,clipping_planes_vertex:Yd,color_fragment:Kd,color_pars_fragment:Zd,color_pars_vertex:Jd,color_vertex:Qd,common:jd,cube_uv_reflection_fragment:eh,defaultnormal_vertex:th,displacementmap_pars_vertex:nh,displacementmap_vertex:ih,emissivemap_fragment:rh,emissivemap_pars_fragment:sh,colorspace_fragment:ah,colorspace_pars_fragment:oh,envmap_fragment:lh,envmap_common_pars_fragment:ch,envmap_pars_fragment:uh,envmap_pars_vertex:dh,envmap_physical_pars_fragment:bh,envmap_vertex:hh,fog_vertex:fh,fog_pars_vertex:ph,fog_fragment:mh,fog_pars_fragment:gh,gradientmap_pars_fragment:_h,lightmap_pars_fragment:vh,lights_lambert_fragment:xh,lights_lambert_pars_fragment:Mh,lights_pars_begin:Sh,lights_toon_fragment:yh,lights_toon_pars_fragment:Eh,lights_phong_fragment:Th,lights_phong_pars_fragment:Ah,lights_physical_fragment:wh,lights_physical_pars_fragment:Rh,lights_fragment_begin:Ch,lights_fragment_maps:Ph,lights_fragment_end:Ih,lightprobes_pars_fragment:Lh,logdepthbuf_fragment:Dh,logdepthbuf_pars_fragment:Uh,logdepthbuf_pars_vertex:Nh,logdepthbuf_vertex:Fh,map_fragment:Oh,map_pars_fragment:Bh,map_particle_fragment:kh,map_particle_pars_fragment:zh,metalnessmap_fragment:Gh,metalnessmap_pars_fragment:Hh,morphinstance_vertex:Vh,morphcolor_vertex:Wh,morphnormal_vertex:Xh,morphtarget_pars_vertex:$h,morphtarget_vertex:qh,normal_fragment_begin:Yh,normal_fragment_maps:Kh,normal_pars_fragment:Zh,normal_pars_vertex:Jh,normal_vertex:Qh,normalmap_pars_fragment:jh,clearcoat_normal_fragment_begin:ef,clearcoat_normal_fragment_maps:tf,clearcoat_pars_fragment:nf,iridescence_pars_fragment:rf,opaque_fragment:sf,packing:af,premultiplied_alpha_fragment:of,project_vertex:lf,dithering_fragment:cf,dithering_pars_fragment:uf,roughnessmap_fragment:df,roughnessmap_pars_fragment:hf,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:pf,shadowmap_vertex:mf,shadowmask_pars_fragment:gf,skinbase_vertex:_f,skinning_pars_vertex:vf,skinning_vertex:xf,skinnormal_vertex:Mf,specularmap_fragment:Sf,specularmap_pars_fragment:bf,tonemapping_fragment:yf,tonemapping_pars_fragment:Ef,transmission_fragment:Tf,transmission_pars_fragment:Af,uv_pars_fragment:wf,uv_pars_vertex:Rf,uv_vertex:Cf,worldpos_vertex:Pf,background_vert:If,background_frag:Lf,backgroundCube_vert:Df,backgroundCube_frag:Uf,cube_vert:Nf,cube_frag:Ff,depth_vert:Of,depth_frag:Bf,distance_vert:kf,distance_frag:zf,equirect_vert:Gf,equirect_frag:Hf,linedashed_vert:Vf,linedashed_frag:Wf,meshbasic_vert:Xf,meshbasic_frag:$f,meshlambert_vert:qf,meshlambert_frag:Yf,meshmatcap_vert:Kf,meshmatcap_frag:Zf,meshnormal_vert:Jf,meshnormal_frag:Qf,meshphong_vert:jf,meshphong_frag:ep,meshphysical_vert:tp,meshphysical_frag:np,meshtoon_vert:ip,meshtoon_frag:rp,points_vert:sp,points_frag:ap,shadow_vert:op,shadow_frag:lp,sprite_vert:cp,sprite_frag:up},de={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},pn={basic:{uniforms:Ut([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Ut([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Ut([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Ut([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Ut([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Ut([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Ut([de.points,de.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Ut([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Ut([de.common,de.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Ut([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Ut([de.sprite,de.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:Ut([de.common,de.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:Ut([de.lights,de.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};pn.physical={uniforms:Ut([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const $r={r:0,b:0,g:0},dp=new it,Ac=new Ie;Ac.set(-1,0,0,0,1,0,0,0,1);function hp(n,e,t,i,r,s){const a=new Ve(0);let o=r===!0?0:1,l,c,d=null,p=0,u=null;function x(w){let R=w.isScene===!0?w.background:null;if(R&&R.isTexture){const M=w.backgroundBlurriness>0;R=e.get(R,M)}return R}function g(w){let R=!1;const M=x(w);M===null?f(a,o):M&&M.isColor&&(f(M,1),R=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(w,R){const M=x(R);M&&(M.isCubeTexture||M.mapping===us)?(c===void 0&&(c=new Et(new $i(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:Vi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,v,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(dp.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ac),c.material.toneMapped=ze.getTransfer(M.colorSpace)!==Je,(d!==M||p!==M.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,p=M.version,u=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Et(new qi(2,2),new Mn({name:"BackgroundMaterial",uniforms:Vi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=ze.getTransfer(M.colorSpace)!==Je,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||p!==M.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=M,p=M.version,u=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function f(w,R){w.getRGB($r,Sc(n)),t.buffers.color.setClear($r.r,$r.g,$r.b,R,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,R=1){a.set(w),o=R,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,f(a,o)},render:g,addToRenderList:b,dispose:h}}function fp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(C,U,$,J,B){let Y=!1;const H=p(C,J,$,U);s!==H&&(s=H,c(s.object)),Y=x(C,J,$,B),Y&&g(C,J,$,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,M(C,U,$,J),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function d(C){return n.deleteVertexArray(C)}function p(C,U,$,J){const B=J.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const H=C.isInstancedMesh===!0?C.id:0;let j=Y[H];j===void 0&&(j={},Y[H]=j);let te=j[$.id];te===void 0&&(te={},j[$.id]=te);let he=te[B];return he===void 0&&(he=u(l()),te[B]=he),he}function u(C){const U=[],$=[],J=[];for(let B=0;B<t;B++)U[B]=0,$[B]=0,J[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:$,attributeDivisors:J,object:C,attributes:{},index:null}}function x(C,U,$,J){const B=s.attributes,Y=U.attributes;let H=0;const j=$.getAttributes();for(const te in j)if(j[te].location>=0){const ge=B[te];let xe=Y[te];if(xe===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(xe=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(xe=C.instanceColor)),ge===void 0||ge.attribute!==xe||xe&&ge.data!==xe.data)return!0;H++}return s.attributesNum!==H||s.index!==J}function g(C,U,$,J){const B={},Y=U.attributes;let H=0;const j=$.getAttributes();for(const te in j)if(j[te].location>=0){let ge=Y[te];ge===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(ge=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(ge=C.instanceColor));const xe={};xe.attribute=ge,ge&&ge.data&&(xe.data=ge.data),B[te]=xe,H++}s.attributes=B,s.attributesNum=H,s.index=J}function b(){const C=s.newAttributes;for(let U=0,$=C.length;U<$;U++)C[U]=0}function f(C){h(C,0)}function h(C,U){const $=s.newAttributes,J=s.enabledAttributes,B=s.attributeDivisors;$[C]=1,J[C]===0&&(n.enableVertexAttribArray(C),J[C]=1),B[C]!==U&&(n.vertexAttribDivisor(C,U),B[C]=U)}function w(){const C=s.newAttributes,U=s.enabledAttributes;for(let $=0,J=U.length;$<J;$++)U[$]!==C[$]&&(n.disableVertexAttribArray($),U[$]=0)}function R(C,U,$,J,B,Y,H){H===!0?n.vertexAttribIPointer(C,U,$,B,Y):n.vertexAttribPointer(C,U,$,J,B,Y)}function M(C,U,$,J){b();const B=J.attributes,Y=$.getAttributes(),H=U.defaultAttributeValues;for(const j in Y){const te=Y[j];if(te.location>=0){let he=B[j];if(he===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),he!==void 0){const ge=he.normalized,xe=he.itemSize,qe=e.get(he);if(qe===void 0)continue;const lt=qe.buffer,Ye=qe.type,Q=qe.bytesPerElement,se=Ye===n.INT||Ye===n.UNSIGNED_INT||he.gpuType===lo;if(he.isInterleavedBufferAttribute){const ne=he.data,Pe=ne.stride,Le=he.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<te.locationSize;we++)h(te.location+we,ne.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<te.locationSize;we++)f(te.location+we);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let we=0;we<te.locationSize;we++)R(te.location+we,xe/te.locationSize,Ye,ge,Pe*Q,(Le+xe/te.locationSize*we)*Q,se)}else{if(he.isInstancedBufferAttribute){for(let ne=0;ne<te.locationSize;ne++)h(te.location+ne,he.meshPerAttribute);C.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ne=0;ne<te.locationSize;ne++)f(te.location+ne);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let ne=0;ne<te.locationSize;ne++)R(te.location+ne,xe/te.locationSize,Ye,ge,xe*Q,xe/te.locationSize*ne*Q,se)}}else if(H!==void 0){const ge=H[j];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(te.location,ge);break;case 3:n.vertexAttrib3fv(te.location,ge);break;case 4:n.vertexAttrib4fv(te.location,ge);break;default:n.vertexAttrib1fv(te.location,ge)}}}}w()}function y(){A();for(const C in i){const U=i[C];for(const $ in U){const J=U[$];for(const B in J){const Y=J[B];for(const H in Y)d(Y[H].object),delete Y[H];delete J[B]}}delete i[C]}}function v(C){if(i[C.id]===void 0)return;const U=i[C.id];for(const $ in U){const J=U[$];for(const B in J){const Y=J[B];for(const H in Y)d(Y[H].object),delete Y[H];delete J[B]}}delete i[C.id]}function E(C){for(const U in i){const $=i[U];for(const J in $){const B=$[J];if(B[C.id]===void 0)continue;const Y=B[C.id];for(const H in Y)d(Y[H].object),delete Y[H];delete B[C.id]}}}function _(C){for(const U in i){const $=i[U],J=C.isInstancedMesh===!0?C.id:0,B=$[J];if(B!==void 0){for(const Y in B){const H=B[Y];for(const j in H)d(H[j].object),delete H[j];delete B[Y]}delete $[J],Object.keys($).length===0&&delete i[U]}}}function A(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:y,releaseStatesOfGeometry:v,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:b,enableAttribute:f,disableUnusedAttributes:w}}function pp(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let x=0;x<d;x++)u+=c[x];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function mp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==sn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const _=E===Pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Yt&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==rn&&!_)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Ce("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=n.getParameter(n.MAX_SAMPLES),v=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:x,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:M,maxSamples:y,samples:v}}function gp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ei,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const x=p.length!==0||u||i!==0||r;return r=u,i=p.length,x},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){t=d(p,u,0)},this.setState=function(p,u,x){const g=p.clippingPlanes,b=p.clipIntersection,f=p.clipShadows,h=n.get(p);if(!r||g===null||g.length===0||s&&!f)s?d(null):c();else{const w=s?0:i,R=w*4;let M=h.clippingState||null;l.value=M,M=d(g,u,R,x);for(let y=0;y!==R;++y)M[y]=t[y];h.clippingState=M,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,u,x,g){const b=p!==null?p.length:0;let f=null;if(b!==0){if(f=l.value,g!==!0||f===null){const h=x+b*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(f===null||f.length<h)&&(f=new Float32Array(h));for(let R=0,M=x;R!==b;++R,M+=4)a.copy(p[R]).applyMatrix4(w,o),a.normal.toArray(f,M),f[M+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,f}}const Wn=4,_l=[.125,.215,.35,.446,.526,.582],ni=20,_p=256,nr=new fs,vl=new Ve;let Ys=null,Ks=0,Zs=0,Js=!1;const vp=new O;class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=vp}=s;Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),Zs=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ys,Ks,Zs),this._renderer.xr.enabled=Js,e.scissorTest=!1,Ci(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ci||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),Zs=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:Pn,format:sn,colorSpace:rs,depthBuffer:!1},r=Ml(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ml(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=xp(s)),this._blurMaterial=Sp(s,e,t),this._ggxMaterial=Mp(s,e,t)}return r}_compileMaterial(e){const t=new Et(new on,e);this._renderer.compile(t,nr)}_sceneToCubeUV(e,t,i,r,s){const l=new tn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,x=p.toneMapping;p.getClearColor(vl),p.toneMapping=_n,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new $i,new vr({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,f=b.material;let h=!1;const w=e.background;w?w.isColor&&(f.color.copy(w),e.background=null,h=!0):(f.color.copy(vl),h=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[R],s.y,s.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[R]));const y=this._cubeSize;Ci(r,M*y,R>2?y:0,y,y),p.setRenderTarget(r),h&&p.render(b,l),p.render(e,l)}p.toneMapping=x,p.autoClear=u,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ci||e.mapping===Gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ci(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,nr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,x=p*u,{_lodMax:g}=this,b=this._sizeLods[i],f=3*b*(i>g-Wn?i-g+Wn:0),h=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=x,l.mipInt.value=g-t,Ci(s,f,h,3*b,2*b),r.setRenderTarget(s),r.render(o,nr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ci(e,f,h,3*b,2*b),r.setRenderTarget(e),r.render(o,nr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&He("blur direction must be either latitudinal or longitudinal!");const d=3,p=this._lodMeshes[r];p.material=c;const u=c.uniforms,x=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*x):2*Math.PI/(2*ni-1),b=s/g,f=isFinite(s)?1+Math.floor(d*b):ni;f>ni&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${ni}`);const h=[];let w=0;for(let E=0;E<ni;++E){const _=E/b,A=Math.exp(-_*_/2);h.push(A),E===0?w+=A:E<f&&(w+=2*A)}for(let E=0;E<h.length;E++)h[E]=h[E]/w;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=h,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:R}=this;u.dTheta.value=g,u.mipInt.value=R-i;const M=this._sizeLods[r],y=3*M*(r>R-Wn?r-R+Wn:0),v=4*(this._cubeSize-M);Ci(t,y,v,3*M,2*M),l.setRenderTarget(t),l.render(p,nr)}}function xp(n){const e=[],t=[],i=[];let r=n;const s=n-Wn+1+_l.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Wn?l=_l[a-n+Wn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],x=6,g=6,b=3,f=2,h=1,w=new Float32Array(b*g*x),R=new Float32Array(f*g*x),M=new Float32Array(h*g*x);for(let v=0;v<x;v++){const E=v%3*2/3-1,_=v>2?0:-1,A=[E,_,0,E+2/3,_,0,E+2/3,_+1,0,E,_,0,E+2/3,_+1,0,E,_+1,0];w.set(A,b*g*v),R.set(u,f*g*v);const L=[v,v,v,v,v,v];M.set(L,h*g*v)}const y=new on;y.setAttribute("position",new an(w,b)),y.setAttribute("uv",new an(R,f)),y.setAttribute("faceIndex",new an(M,h)),i.push(new Et(y,null)),r>Wn&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ml(n,e,t){const i=new vn(n,e,t);return i.texture.mapping=us,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ci(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Mp(n,e,t){return new Mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_p,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ps(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Sp(n,e,t){const i=new Float32Array(ni),r=new O(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ps(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Sl(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ps(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function bl(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function ps(){return`

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
	`}class wc extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new xc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $i(5,5,5),s=new Mn({name:"CubemapFromEquirect",uniforms:Vi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:Rn});s.uniforms.tEquirect.value=t;const a=new Et(r,s),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=Lt),new Td(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function bp(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,x=!1){return u==null?null:x?a(u):s(u)}function s(u){if(u&&u.isTexture){const x=u.mapping;if(x===Ms||x===Ss)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new wc(g.height);return b.fromEquirectangularTexture(n,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const x=u.mapping,g=x===Ms||x===Ss,b=x===ci||x===Gi;if(g||b){let f=t.get(u);const h=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new xl(n)),f=g?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const w=u.image;return g&&w&&w.height>0||b&&w&&l(w)?(i===null&&(i=new xl(n)),f=g?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function o(u,x){return x===Ms?u.mapping=ci:x===Ss&&(u.mapping=Gi),u}function l(u){let x=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&x++;return x===g}function c(u){const x=u.target;x.removeEventListener("dispose",c);const g=e.get(x);g!==void 0&&(e.delete(x),g.dispose())}function d(u){const x=u.target;x.removeEventListener("dispose",d);const g=t.get(x);g!==void 0&&(t.delete(x),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function yp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Bi("WebGLRenderer: "+i+" extension not supported."),r}}}function Ep(n,e,t,i){const r={},s=new WeakMap;function a(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const x=s.get(u);x&&(e.remove(x),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(p,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(p){const u=p.attributes;for(const x in u)e.update(u[x],n.ARRAY_BUFFER)}function c(p){const u=[],x=p.index,g=p.attributes.position;let b=0;if(g===void 0)return;if(x!==null){const w=x.array;b=x.version;for(let R=0,M=w.length;R<M;R+=3){const y=w[R+0],v=w[R+1],E=w[R+2];u.push(y,v,v,E,E,y)}}else{const w=g.array;b=g.version;for(let R=0,M=w.length/3-1;R<M;R+=3){const y=R+0,v=R+1,E=R+2;u.push(y,v,v,E,E,y)}}const f=new(g.count>=65535?gc:mc)(u,1);f.version=b;const h=s.get(p);h&&e.remove(h),s.set(p,f)}function d(p){const u=s.get(p);if(u){const x=p.index;x!==null&&u.version<x.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function Tp(n,e,t){let i;function r(p){i=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,u){n.drawElements(i,u,s,p*a),t.update(u,i,1)}function c(p,u,x){x!==0&&(n.drawElementsInstanced(i,u,s,p*a,x),t.update(u,i,x))}function d(p,u,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,p,0,x);let b=0;for(let f=0;f<x;f++)b+=u[f];t.update(b,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Ap(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:He("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wp(n,e,t){const i=new WeakMap,r=new ot;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let L=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var x=L;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),b===!0&&(M=2),f===!0&&(M=3);let y=o.attributes.position.count*M,v=1;y>e.maxTextureSize&&(v=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*v*4*p),_=new fc(E,y,v,p);_.type=rn,_.needsUpdate=!0;const A=M*4;for(let C=0;C<p;C++){const U=h[C],$=w[C],J=R[C],B=y*v*4*C;for(let Y=0;Y<U.count;Y++){const H=Y*A;g===!0&&(r.fromBufferAttribute(U,Y),E[B+H+0]=r.x,E[B+H+1]=r.y,E[B+H+2]=r.z,E[B+H+3]=0),b===!0&&(r.fromBufferAttribute($,Y),E[B+H+4]=r.x,E[B+H+5]=r.y,E[B+H+6]=r.z,E[B+H+7]=0),f===!0&&(r.fromBufferAttribute(J,Y),E[B+H+8]=r.x,E[B+H+9]=r.y,E[B+H+10]=r.z,E[B+H+11]=J.itemSize===4?r.w:1)}}u={count:p,texture:_,size:new ke(y,v)},i.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let f=0;f<c.length;f++)g+=c[f];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",b),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Rp(n,e,t,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,p=c.geometry,u=e.get(c,p);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const x=c.skeleton;s.get(x)!==d&&(x.update(),s.set(x,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Cp={[jl]:"LINEAR_TONE_MAPPING",[ec]:"REINHARD_TONE_MAPPING",[tc]:"CINEON_TONE_MAPPING",[oo]:"ACES_FILMIC_TONE_MAPPING",[ic]:"AGX_TONE_MAPPING",[rc]:"NEUTRAL_TONE_MAPPING",[nc]:"CUSTOM_TONE_MAPPING"};function Pp(n,e,t,i,r,s){const a=new vn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Hi(e,t):void 0}),o=new vn(e,t,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),l=new on;l.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bt([0,2,0,0,2,0],2));const c=new vd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Et(l,c),p=new fs(-1,1,1,-1,0,1);let u=null,x=null,g=!1,b,f=null,h=[],w=!1;this.setSize=function(R,M){a.setSize(R,M),o.setSize(R,M);for(let y=0;y<h.length;y++){const v=h[y];v.setSize&&v.setSize(R,M)}},this.setEffects=function(R){h=R,w=h.length>0&&h[0].isRenderPass===!0;const M=a.width,y=a.height;for(let v=0;v<h.length;v++){const E=h[v];E.setSize&&E.setSize(M,y)}},this.begin=function(R,M){if(g||R.toneMapping===_n&&h.length===0)return!1;if(f=M,M!==null){const y=M.width,v=M.height;(a.width!==y||a.height!==v)&&this.setSize(y,v)}return w===!1&&R.setRenderTarget(a),b=R.toneMapping,R.toneMapping=_n,!0},this.hasRenderPass=function(){return w},this.end=function(R,M){R.toneMapping=b,g=!0;let y=a,v=o;for(let E=0;E<h.length;E++){const _=h[E];if(_.enabled!==!1&&(_.render(R,v,y,M),_.needsSwap!==!1)){const A=y;y=v,v=A}}if(u!==R.outputColorSpace||x!==R.toneMapping){u=R.outputColorSpace,x=R.toneMapping,c.defines={},ze.getTransfer(u)===Je&&(c.defines.SRGB_TRANSFER="");const E=Cp[x];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,R.setRenderTarget(f),R.render(d,p),f=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Rc=new Ot,Ja=new Hi(1,1),Cc=new fc,Pc=new Ku,Ic=new xc,yl=[],El=[],Tl=new Float32Array(16),Al=new Float32Array(9),wl=new Float32Array(4);function Yi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yl[r];if(s===void 0&&(s=new Float32Array(r),yl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ms(n,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ip(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Lp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Np(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;wl.set(i),n.uniformMatrix2fv(this.addr,!1,wl),St(t,i)}}function Fp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Al.set(i),n.uniformMatrix3fv(this.addr,!1,Al),St(t,i)}}function Op(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),St(t,i)}}function Bp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function kp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function zp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function Gp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function Hp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function Wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function Xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function $p(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ja.compareFunction=t.isReversedDepthBuffer()?_o:go,s=Ja):s=Rc,t.setTexture2D(e||s,r)}function qp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Pc,r)}function Yp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ic,r)}function Kp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Cc,r)}function Zp(n){switch(n){case 5126:return Ip;case 35664:return Lp;case 35665:return Dp;case 35666:return Up;case 35674:return Np;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return Bp;case 35667:case 35671:return kp;case 35668:case 35672:return zp;case 35669:case 35673:return Gp;case 5125:return Hp;case 36294:return Vp;case 36295:return Wp;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return qp;case 35680:case 36300:case 36308:case 36293:return Yp;case 36289:case 36303:case 36311:case 36292:return Kp}}function Jp(n,e){n.uniform1fv(this.addr,e)}function Qp(n,e){const t=Yi(e,this.size,2);n.uniform2fv(this.addr,t)}function jp(n,e){const t=Yi(e,this.size,3);n.uniform3fv(this.addr,t)}function em(n,e){const t=Yi(e,this.size,4);n.uniform4fv(this.addr,t)}function tm(n,e){const t=Yi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nm(n,e){const t=Yi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function im(n,e){const t=Yi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rm(n,e){n.uniform1iv(this.addr,e)}function sm(n,e){n.uniform2iv(this.addr,e)}function am(n,e){n.uniform3iv(this.addr,e)}function om(n,e){n.uniform4iv(this.addr,e)}function lm(n,e){n.uniform1uiv(this.addr,e)}function cm(n,e){n.uniform2uiv(this.addr,e)}function um(n,e){n.uniform3uiv(this.addr,e)}function dm(n,e){n.uniform4uiv(this.addr,e)}function hm(n,e,t){const i=this.cache,r=e.length,s=ms(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ja:a=Rc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function fm(n,e,t){const i=this.cache,r=e.length,s=ms(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Pc,s[a])}function pm(n,e,t){const i=this.cache,r=e.length,s=ms(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ic,s[a])}function mm(n,e,t){const i=this.cache,r=e.length,s=ms(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Cc,s[a])}function gm(n){switch(n){case 5126:return Jp;case 35664:return Qp;case 35665:return jp;case 35666:return em;case 35674:return tm;case 35675:return nm;case 35676:return im;case 5124:case 35670:return rm;case 35667:case 35671:return sm;case 35668:case 35672:return am;case 35669:case 35673:return om;case 5125:return lm;case 36294:return cm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}class _m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Zp(t.type)}}class vm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class xm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Qs=/(\w+)(\])?(\[|\.)?/g;function Rl(n,e){n.seq.push(e),n.map[e.id]=e}function Mm(n,e,t){const i=n.name,r=i.length;for(Qs.lastIndex=0;;){const s=Qs.exec(i),a=Qs.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Rl(t,c===void 0?new _m(o,n,e):new vm(o,n,e));break}else{let p=t.map[o];p===void 0&&(p=new xm(o),Rl(t,p)),t=p}}}class jr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Mm(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Sm=37297;let bm=0;function ym(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Pl=new Ie;function Em(n){ze._getMatrix(Pl,ze.workingColorSpace,n);const e=`mat3( ${Pl.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(n)){case ss:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Il(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+ym(n.getShaderSource(e),o)}else return s}function Tm(n,e){const t=Em(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Am={[jl]:"Linear",[ec]:"Reinhard",[tc]:"Cineon",[oo]:"ACESFilmic",[ic]:"AgX",[rc]:"Neutral",[nc]:"Custom"};function wm(n,e){const t=Am[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qr=new O;function Rm(){ze.getLuminanceCoefficients(qr);const n=qr.x.toFixed(4),e=qr.y.toFixed(4),t=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function Pm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Im(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ar(n){return n!==""}function Ll(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(n){return n.replace(Lm,Um)}const Dm=new Map;function Um(n,e){let t=Ne[e];if(t===void 0){const i=Dm.get(e);if(i!==void 0)t=Ne[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Qa(t)}const Nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(n){return n.replace(Nm,Fm)}function Fm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Om={[Yr]:"SHADOWMAP_TYPE_PCF",[sr]:"SHADOWMAP_TYPE_VSM"};function Bm(n){return Om[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const km={[ci]:"ENVMAP_TYPE_CUBE",[Gi]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE_UV"};function zm(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":km[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Gm={[Gi]:"ENVMAP_MODE_REFRACTION"};function Hm(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Gm[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Vm={[Ql]:"ENVMAP_BLENDING_MULTIPLY",[Ru]:"ENVMAP_BLENDING_MIX",[Cu]:"ENVMAP_BLENDING_ADD"};function Wm(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Vm[n.combine]||"ENVMAP_BLENDING_NONE"}function Xm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function $m(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Bm(t),c=zm(t),d=Hm(t),p=Wm(t),u=Xm(t),x=Cm(t),g=Pm(s),b=r.createProgram();let f,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ar).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ar).join(`
`),h.length>0&&(h+=`
`)):(f=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),h=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_n?"#define TONE_MAPPING":"",t.toneMapping!==_n?Ne.tonemapping_pars_fragment:"",t.toneMapping!==_n?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Tm("linearToOutputTexel",t.outputColorSpace),Rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ar).join(`
`)),a=Qa(a),a=Ll(a,t),a=Dl(a,t),o=Qa(o),o=Ll(o,t),o=Dl(o,t),a=Ul(a),o=Ul(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,f=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",t.glslVersion===Vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const R=w+f+a,M=w+h+o,y=Cl(r,r.VERTEX_SHADER,R),v=Cl(r,r.FRAGMENT_SHADER,M);r.attachShader(b,y),r.attachShader(b,v),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function E(C){if(n.debug.checkShaderErrors){const U=r.getProgramInfoLog(b)||"",$=r.getShaderInfoLog(y)||"",J=r.getShaderInfoLog(v)||"",B=U.trim(),Y=$.trim(),H=J.trim();let j=!0,te=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,b,y,v);else{const he=Il(r,y,"vertex"),ge=Il(r,v,"fragment");He("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+he+`
`+ge)}else B!==""?Ce("WebGLProgram: Program Info Log:",B):(Y===""||H==="")&&(te=!1);te&&(C.diagnostics={runnable:j,programLog:B,vertexShader:{log:Y,prefix:f},fragmentShader:{log:H,prefix:h}})}r.deleteShader(y),r.deleteShader(v),_=new jr(r,b),A=Im(r,b)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let A;this.getAttributes=function(){return A===void 0&&E(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(b,Sm)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bm++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=y,this.fragmentShader=v,this}let qm=0;class Ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Km(e),t.set(e,i)),i}}class Km{constructor(e){this.id=qm++,this.code=e,this.usedTimes=0}}function Zm(n){return n===ui||n===ns||n===is}function Jm(n,e,t,i,r,s){const a=new xo,o=new Ym,l=new Set,c=[],d=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function b(_,A,L,C,U,$){const J=C.fog,B=U.geometry,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,j=e.get(_.envMap||Y,H),te=j&&j.mapping===us?j.image.height:null,he=x[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ce("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const ge=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xe=ge!==void 0?ge.length:0;let qe=0;B.morphAttributes.position!==void 0&&(qe=1),B.morphAttributes.normal!==void 0&&(qe=2),B.morphAttributes.color!==void 0&&(qe=3);let lt,Ye,Q,se;if(he){const Me=pn[he];lt=Me.vertexShader,Ye=Me.fragmentShader}else{lt=_.vertexShader,Ye=_.fragmentShader;const Me=o.getVertexShaderStage(_),ut=o.getFragmentShaderStage(_);o.update(_,Me,ut),Q=Me.id,se=ut.id}const ne=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Le=U.isInstancedMesh===!0,we=U.isBatchedMesh===!0,ht=!!_.map,Be=!!_.matcap,et=!!j,Ke=!!_.aoMap,We=!!_.lightMap,gt=!!_.bumpMap&&_.wireframe===!1,xt=!!_.normalMap,bt=!!_.displacementMap,Tt=!!_.emissiveMap,ct=!!_.metalnessMap,_t=!!_.roughnessMap,I=_.anisotropy>0,kt=_.clearcoat>0,Ze=_.dispersion>0,T=_.iridescence>0,m=_.sheen>0,F=_.transmission>0,G=I&&!!_.anisotropyMap,W=kt&&!!_.clearcoatMap,ie=kt&&!!_.clearcoatNormalMap,ae=kt&&!!_.clearcoatRoughnessMap,X=T&&!!_.iridescenceMap,Z=T&&!!_.iridescenceThicknessMap,oe=m&&!!_.sheenColorMap,ye=m&&!!_.sheenRoughnessMap,ue=!!_.specularMap,le=!!_.specularColorMap,Ae=!!_.specularIntensityMap,Re=F&&!!_.transmissionMap,De=F&&!!_.thicknessMap,P=!!_.gradientMap,re=!!_.alphaMap,K=_.alphaTest>0,ce=!!_.alphaHash,me=!!_.extensions;let ee=_n;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ee=n.toneMapping);const be={shaderID:he,shaderType:_.type,shaderName:_.name,vertexShader:lt,fragmentShader:Ye,defines:_.defines,customVertexShaderID:Q,customFragmentShaderID:se,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:we,batchingColor:we&&U._colorsTexture!==null,instancing:Le,instancingColor:Le&&U.instanceColor!==null,instancingMorph:Le&&U.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ht,matcap:Be,envMap:et,envMapMode:et&&j.mapping,envMapCubeUVHeight:te,aoMap:Ke,lightMap:We,bumpMap:gt,normalMap:xt,displacementMap:bt,emissiveMap:Tt,normalMapObjectSpace:xt&&_.normalMapType===Lu,normalMapTangentSpace:xt&&_.normalMapType===Ya,packedNormalMap:xt&&_.normalMapType===Ya&&Zm(_.normalMap.format),metalnessMap:ct,roughnessMap:_t,anisotropy:I,anisotropyMap:G,clearcoat:kt,clearcoatMap:W,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:Ze,iridescence:T,iridescenceMap:X,iridescenceThicknessMap:Z,sheen:m,sheenColorMap:oe,sheenRoughnessMap:ye,specularMap:ue,specularColorMap:le,specularIntensityMap:Ae,transmission:F,transmissionMap:Re,thicknessMap:De,gradientMap:P,opaque:_.transparent===!1&&_.blending===Oi&&_.alphaToCoverage===!1,alphaMap:re,alphaTest:K,alphaHash:ce,combine:_.combine,mapUv:ht&&g(_.map.channel),aoMapUv:Ke&&g(_.aoMap.channel),lightMapUv:We&&g(_.lightMap.channel),bumpMapUv:gt&&g(_.bumpMap.channel),normalMapUv:xt&&g(_.normalMap.channel),displacementMapUv:bt&&g(_.displacementMap.channel),emissiveMapUv:Tt&&g(_.emissiveMap.channel),metalnessMapUv:ct&&g(_.metalnessMap.channel),roughnessMapUv:_t&&g(_.roughnessMap.channel),anisotropyMapUv:G&&g(_.anisotropyMap.channel),clearcoatMapUv:W&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(_.sheenRoughnessMap.channel),specularMapUv:ue&&g(_.specularMap.channel),specularColorMapUv:le&&g(_.specularColorMap.channel),specularIntensityMapUv:Ae&&g(_.specularIntensityMap.channel),transmissionMapUv:Re&&g(_.transmissionMap.channel),thicknessMapUv:De&&g(_.thicknessMap.channel),alphaMapUv:re&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(xt||I),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(ht||re),fog:!!J,useFog:_.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&xt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Pe,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:qe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:ht&&_.map.isVideoTexture===!0&&ze.getTransfer(_.map.colorSpace)===Je,decodeVideoTextureEmissive:Tt&&_.emissiveMap.isVideoTexture===!0&&ze.getTransfer(_.emissiveMap.colorSpace)===Je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===An,flipSided:_.side===Vt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function f(_){const A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)A.push(L),A.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(h(A,_),w(A,_),A.push(n.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function h(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function w(_,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function R(_){const A=x[_.type];let L;if(A){const C=pn[A];L=md.clone(C.uniforms)}else L=_.uniforms;return L}function M(_,A){let L=d.get(A);return L!==void 0?++L.usedTimes:(L=new $m(n,A,_,r),c.push(L),d.set(A,L)),L}function y(_){if(--_.usedTimes===0){const A=c.indexOf(_);c[A]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function v(_){o.remove(_)}function E(){o.dispose()}return{getParameters:b,getProgramCacheKey:f,getUniforms:R,acquireProgram:M,releaseProgram:y,releaseShaderCache:v,programs:c,dispose:E}}function Qm(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function jm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Fl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ol(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let x=0;return u.isInstancedMesh&&(x+=2),u.isSkinnedMesh&&(x+=1),x}function o(u,x,g,b,f,h){let w=n[e];return w===void 0?(w={id:u.id,object:u,geometry:x,material:g,materialVariant:a(u),groupOrder:b,renderOrder:u.renderOrder,z:f,group:h},n[e]=w):(w.id=u.id,w.object=u,w.geometry=x,w.material=g,w.materialVariant=a(u),w.groupOrder=b,w.renderOrder=u.renderOrder,w.z=f,w.group=h),e++,w}function l(u,x,g,b,f,h){const w=o(u,x,g,b,f,h);g.transmission>0?i.push(w):g.transparent===!0?r.push(w):t.push(w)}function c(u,x,g,b,f,h){const w=o(u,x,g,b,f,h);g.transmission>0?i.unshift(w):g.transparent===!0?r.unshift(w):t.unshift(w)}function d(u,x,g){t.length>1&&t.sort(u||jm),i.length>1&&i.sort(x||Fl),r.length>1&&r.sort(x||Fl),g&&(t.reverse(),i.reverse(),r.reverse())}function p(){for(let u=e,x=n.length;u<x;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:p,sort:d}}function e0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Ol,n.set(i,[a])):r>=s.length?(a=new Ol,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function t0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ve};break;case"SpotLight":t={position:new O,direction:new O,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function n0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let i0=0;function r0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function s0(n){const e=new t0,t=n0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new it,a=new it;function o(c){let d=0,p=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let x=0,g=0,b=0,f=0,h=0,w=0,R=0,M=0,y=0,v=0,E=0;c.sort(r0);for(let A=0,L=c.length;A<L;A++){const C=c[A],U=C.color,$=C.intensity,J=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ui?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)d+=U.r*$,p+=U.g*$,u+=U.b*$;else if(C.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(C.sh.coefficients[Y],$);E++}else if(C.isDirectionalLight){const Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const H=C.shadow,j=t.get(C);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.directionalShadow[x]=j,i.directionalShadowMap[x]=B,i.directionalShadowMatrix[x]=C.shadow.matrix,w++}i.directional[x]=Y,x++}else if(C.isSpotLight){const Y=e.get(C);Y.position.setFromMatrixPosition(C.matrixWorld),Y.color.copy(U).multiplyScalar($),Y.distance=J,Y.coneCos=Math.cos(C.angle),Y.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Y.decay=C.decay,i.spot[b]=Y;const H=C.shadow;if(C.map&&(i.spotLightMap[y]=C.map,y++,H.updateMatrices(C),C.castShadow&&v++),i.spotLightMatrix[b]=H.matrix,C.castShadow){const j=t.get(C);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.spotShadow[b]=j,i.spotShadowMap[b]=B,M++}b++}else if(C.isRectAreaLight){const Y=e.get(C);Y.color.copy(U).multiplyScalar($),Y.halfWidth.set(C.width*.5,0,0),Y.halfHeight.set(0,C.height*.5,0),i.rectArea[f]=Y,f++}else if(C.isPointLight){const Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),Y.distance=C.distance,Y.decay=C.decay,C.castShadow){const H=C.shadow,j=t.get(C);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=C.shadow.matrix,R++}i.point[g]=Y,g++}else if(C.isHemisphereLight){const Y=e.get(C);Y.skyColor.copy(C.color).multiplyScalar($),Y.groundColor.copy(C.groundColor).multiplyScalar($),i.hemi[h]=Y,h++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==x||_.pointLength!==g||_.spotLength!==b||_.rectAreaLength!==f||_.hemiLength!==h||_.numDirectionalShadows!==w||_.numPointShadows!==R||_.numSpotShadows!==M||_.numSpotMaps!==y||_.numLightProbes!==E)&&(i.directional.length=x,i.spot.length=b,i.rectArea.length=f,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=M+y-v,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=v,i.numLightProbes=E,_.directionalLength=x,_.pointLength=g,_.spotLength=b,_.rectAreaLength=f,_.hemiLength=h,_.numDirectionalShadows=w,_.numPointShadows=R,_.numSpotShadows=M,_.numSpotMaps=y,_.numLightProbes=E,i.version=i0++)}function l(c,d){let p=0,u=0,x=0,g=0,b=0;const f=d.matrixWorldInverse;for(let h=0,w=c.length;h<w;h++){const R=c[h];if(R.isDirectionalLight){const M=i.directional[p];M.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),p++}else if(R.isSpotLight){const M=i.spot[x];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),x++}else if(R.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(R.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(R.width*.5,0,0),M.halfHeight.set(0,R.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(R.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(f),u++}else if(R.isHemisphereLight){const M=i.hemi[b];M.direction.setFromMatrixPosition(R.matrixWorld),M.direction.transformDirection(f),b++}}}return{setup:o,setupView:l,state:i}}function Bl(n){const e=new s0(n),t=[],i=[],r=[];function s(u){p.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const p={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function a0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Bl(n),e.set(r,[o])):s>=a.length?(o=new Bl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const o0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l0=`uniform sampler2D shadow_pass;
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
}`,c0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],u0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],kl=new it,ir=new O,js=new O;function d0(n,e,t){let i=new So;const r=new ke,s=new ke,a=new ot,o=new xd,l=new Md,c={},d=t.maxTextureSize,p={[$n]:Vt,[Vt]:$n,[An]:An},u=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:o0,fragmentShader:l0}),x=u.clone();x.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Et(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yr;let h=this.type;this.render=function(v,E,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||v.length===0)return;this.type===Jl&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Yr);const A=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Rn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const $=h!==this.type;$&&E.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(B=>B.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,B=v.length;J<B;J++){const Y=v[J],H=Y.shadow;if(H===void 0){Ce("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const j=H.getFrameExtents();r.multiply(j),s.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/j.x),r.x=s.x*j.x,H.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/j.y),r.y=s.y*j.y,H.mapSize.y=s.y));const te=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=te,H.map===null||$===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===sr){if(Y.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new vn(r.x,r.y,{format:ui,type:Pn,minFilter:Lt,magFilter:Lt,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new Hi(r.x,r.y,rn),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=In,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=wt,H.map.depthTexture.magFilter=wt}else Y.isPointLight?(H.map=new wc(r.x),H.map.depthTexture=new fd(r.x,xn)):(H.map=new vn(r.x,r.y),H.map.depthTexture=new Hi(r.x,r.y,xn)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=In,this.type===Yr?(H.map.depthTexture.compareFunction=te?_o:go,H.map.depthTexture.minFilter=Lt,H.map.depthTexture.magFilter=Lt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=wt,H.map.depthTexture.magFilter=wt);H.camera.updateProjectionMatrix()}const he=H.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<he;ge++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(H.map),n.clear());const xe=H.getViewport(ge);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),U.viewport(a)}if(Y.isPointLight){const xe=H.camera,qe=H.matrix,lt=Y.distance||xe.far;lt!==xe.far&&(xe.far=lt,xe.updateProjectionMatrix()),ir.setFromMatrixPosition(Y.matrixWorld),xe.position.copy(ir),js.copy(xe.position),js.add(c0[ge]),xe.up.copy(u0[ge]),xe.lookAt(js),xe.updateMatrixWorld(),qe.makeTranslation(-ir.x,-ir.y,-ir.z),kl.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(kl,xe.coordinateSystem,xe.reversedDepth)}else H.updateMatrices(Y);i=H.getFrustum(),M(E,_,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===sr&&w(H,_),H.needsUpdate=!1}h=this.type,f.needsUpdate=!1,n.setRenderTarget(A,L,C)};function w(v,E){const _=e.update(b);u.defines.VSM_SAMPLES!==v.blurSamples&&(u.defines.VSM_SAMPLES=v.blurSamples,x.defines.VSM_SAMPLES=v.blurSamples,u.needsUpdate=!0,x.needsUpdate=!0),v.mapPass===null&&(v.mapPass=new vn(r.x,r.y,{format:ui,type:Pn})),u.uniforms.shadow_pass.value=v.map.depthTexture,u.uniforms.resolution.value=v.mapSize,u.uniforms.radius.value=v.radius,n.setRenderTarget(v.mapPass),n.clear(),n.renderBufferDirect(E,null,_,u,b,null),x.uniforms.shadow_pass.value=v.mapPass.texture,x.uniforms.resolution.value=v.mapSize,x.uniforms.radius.value=v.radius,n.setRenderTarget(v.map),n.clear(),n.renderBufferDirect(E,null,_,x,b,null)}function R(v,E,_,A){let L=null;const C=_.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(C!==void 0)L=C;else if(L=_.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const U=L.uuid,$=E.uuid;let J=c[U];J===void 0&&(J={},c[U]=J);let B=J[$];B===void 0&&(B=L.clone(),J[$]=B,E.addEventListener("dispose",y)),L=B}if(L.visible=E.visible,L.wireframe=E.wireframe,A===sr?L.side=E.shadowSide!==null?E.shadowSide:E.side:L.side=E.shadowSide!==null?E.shadowSide:p[E.side],L.alphaMap=E.alphaMap,L.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,L.map=E.map,L.clipShadows=E.clipShadows,L.clippingPlanes=E.clippingPlanes,L.clipIntersection=E.clipIntersection,L.displacementMap=E.displacementMap,L.displacementScale=E.displacementScale,L.displacementBias=E.displacementBias,L.wireframeLinewidth=E.wireframeLinewidth,L.linewidth=E.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const U=n.properties.get(L);U.light=_}return L}function M(v,E,_,A,L){if(v.visible===!1)return;if(v.layers.test(E.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&L===sr)&&(!v.frustumCulled||i.intersectsObject(v))){v.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,v.matrixWorld);const $=e.update(v),J=v.material;if(Array.isArray(J)){const B=$.groups;for(let Y=0,H=B.length;Y<H;Y++){const j=B[Y],te=J[j.materialIndex];if(te&&te.visible){const he=R(v,te,A,L);v.onBeforeShadow(n,v,E,_,$,he,j),n.renderBufferDirect(_,null,$,he,v,j),v.onAfterShadow(n,v,E,_,$,he,j)}}}else if(J.visible){const B=R(v,J,A,L);v.onBeforeShadow(n,v,E,_,$,B,null),n.renderBufferDirect(_,null,$,B,v,null),v.onAfterShadow(n,v,E,_,$,B,null)}}const U=v.children;for(let $=0,J=U.length;$<J;$++)M(U[$],E,_,A,L)}function y(v){v.target.removeEventListener("dispose",y);for(const _ in c){const A=c[_],L=v.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function h0(n,e){function t(){let P=!1;const re=new ot;let K=null;const ce=new ot(0,0,0,0);return{setMask:function(me){K!==me&&!P&&(n.colorMask(me,me,me,me),K=me)},setLocked:function(me){P=me},setClear:function(me,ee,be,Me,ut){ut===!0&&(me*=Me,ee*=Me,be*=Me),re.set(me,ee,be,Me),ce.equals(re)===!1&&(n.clearColor(me,ee,be,Me),ce.copy(re))},reset:function(){P=!1,K=null,ce.set(-1,0,0,0)}}}function i(){let P=!1,re=!1,K=null,ce=null,me=null;return{setReversed:function(ee){if(re!==ee){const be=e.get("EXT_clip_control");ee?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=ee;const Me=me;me=null,this.setClear(Me)}},getReversed:function(){return re},setTest:function(ee){ee?ne(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ee){K!==ee&&!P&&(n.depthMask(ee),K=ee)},setFunc:function(ee){if(re&&(ee=Hu[ee]),ce!==ee){switch(ee){case ua:n.depthFunc(n.NEVER);break;case da:n.depthFunc(n.ALWAYS);break;case ha:n.depthFunc(n.LESS);break;case zi:n.depthFunc(n.LEQUAL);break;case fa:n.depthFunc(n.EQUAL);break;case pa:n.depthFunc(n.GEQUAL);break;case ma:n.depthFunc(n.GREATER);break;case ga:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=ee}},setLocked:function(ee){P=ee},setClear:function(ee){me!==ee&&(me=ee,re&&(ee=1-ee),n.clearDepth(ee))},reset:function(){P=!1,K=null,ce=null,me=null,re=!1}}}function r(){let P=!1,re=null,K=null,ce=null,me=null,ee=null,be=null,Me=null,ut=null;return{setTest:function(rt){P||(rt?ne(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(rt){re!==rt&&!P&&(n.stencilMask(rt),re=rt)},setFunc:function(rt,ln,cn){(K!==rt||ce!==ln||me!==cn)&&(n.stencilFunc(rt,ln,cn),K=rt,ce=ln,me=cn)},setOp:function(rt,ln,cn){(ee!==rt||be!==ln||Me!==cn)&&(n.stencilOp(rt,ln,cn),ee=rt,be=ln,Me=cn)},setLocked:function(rt){P=rt},setClear:function(rt){ut!==rt&&(n.clearStencil(rt),ut=rt)},reset:function(){P=!1,re=null,K=null,ce=null,me=null,ee=null,be=null,Me=null,ut=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},p={},u={},x=new WeakMap,g=[],b=null,f=!1,h=null,w=null,R=null,M=null,y=null,v=null,E=null,_=new Ve(0,0,0),A=0,L=!1,C=null,U=null,$=null,J=null,B=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,j=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(te)[1]),H=j>=1):te.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),H=j>=2);let he=null,ge={};const xe=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),lt=new ot().fromArray(xe),Ye=new ot().fromArray(qe);function Q(P,re,K,ce){const me=new Uint8Array(4),ee=n.createTexture();n.bindTexture(P,ee),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<K;be++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(re+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return ee}const se={};se[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(zi),gt(!1),xt(Oo),ne(n.CULL_FACE),Ke(Rn);function ne(P){d[P]!==!0&&(n.enable(P),d[P]=!0)}function Pe(P){d[P]!==!1&&(n.disable(P),d[P]=!1)}function Le(P,re){return u[P]!==re?(n.bindFramebuffer(P,re),u[P]=re,P===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=re),P===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=re),!0):!1}function we(P,re){let K=g,ce=!1;if(P){K=x.get(re),K===void 0&&(K=[],x.set(re,K));const me=P.textures;if(K.length!==me.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,be=me.length;ee<be;ee++)K[ee]=n.COLOR_ATTACHMENT0+ee;K.length=me.length,ce=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ce=!0);ce&&n.drawBuffers(K)}function ht(P){return b!==P?(n.useProgram(P),b=P,!0):!1}const Be={[ti]:n.FUNC_ADD,[du]:n.FUNC_SUBTRACT,[hu]:n.FUNC_REVERSE_SUBTRACT};Be[fu]=n.MIN,Be[pu]=n.MAX;const et={[mu]:n.ZERO,[gu]:n.ONE,[_u]:n.SRC_COLOR,[la]:n.SRC_ALPHA,[yu]:n.SRC_ALPHA_SATURATE,[Su]:n.DST_COLOR,[xu]:n.DST_ALPHA,[vu]:n.ONE_MINUS_SRC_COLOR,[ca]:n.ONE_MINUS_SRC_ALPHA,[bu]:n.ONE_MINUS_DST_COLOR,[Mu]:n.ONE_MINUS_DST_ALPHA,[Eu]:n.CONSTANT_COLOR,[Tu]:n.ONE_MINUS_CONSTANT_COLOR,[Au]:n.CONSTANT_ALPHA,[wu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ke(P,re,K,ce,me,ee,be,Me,ut,rt){if(P===Rn){f===!0&&(Pe(n.BLEND),f=!1);return}if(f===!1&&(ne(n.BLEND),f=!0),P!==uu){if(P!==h||rt!==L){if((w!==ti||y!==ti)&&(n.blendEquation(n.FUNC_ADD),w=ti,y=ti),rt)switch(P){case Oi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bo:n.blendFunc(n.ONE,n.ONE);break;case ko:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:He("WebGLState: Invalid blending: ",P);break}else switch(P){case Oi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ko:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zo:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",P);break}R=null,M=null,v=null,E=null,_.set(0,0,0),A=0,h=P,L=rt}return}me=me||re,ee=ee||K,be=be||ce,(re!==w||me!==y)&&(n.blendEquationSeparate(Be[re],Be[me]),w=re,y=me),(K!==R||ce!==M||ee!==v||be!==E)&&(n.blendFuncSeparate(et[K],et[ce],et[ee],et[be]),R=K,M=ce,v=ee,E=be),(Me.equals(_)===!1||ut!==A)&&(n.blendColor(Me.r,Me.g,Me.b,ut),_.copy(Me),A=ut),h=P,L=!1}function We(P,re){P.side===An?Pe(n.CULL_FACE):ne(n.CULL_FACE);let K=P.side===Vt;re&&(K=!K),gt(K),P.blending===Oi&&P.transparent===!1?Ke(Rn):Ke(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const ce=P.stencilWrite;o.setTest(ce),ce&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Tt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function gt(P){C!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),C=P)}function xt(P){P!==lu?(ne(n.CULL_FACE),P!==U&&(P===Oo?n.cullFace(n.BACK):P===cu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),U=P}function bt(P){P!==$&&(H&&n.lineWidth(P),$=P)}function Tt(P,re,K){P?(ne(n.POLYGON_OFFSET_FILL),(J!==re||B!==K)&&(J=re,B=K,a.getReversed()&&(re=-re),n.polygonOffset(re,K))):Pe(n.POLYGON_OFFSET_FILL)}function ct(P){P?ne(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function _t(P){P===void 0&&(P=n.TEXTURE0+Y-1),he!==P&&(n.activeTexture(P),he=P)}function I(P,re,K){K===void 0&&(he===null?K=n.TEXTURE0+Y-1:K=he);let ce=ge[K];ce===void 0&&(ce={type:void 0,texture:void 0},ge[K]=ce),(ce.type!==P||ce.texture!==re)&&(he!==K&&(n.activeTexture(K),he=K),n.bindTexture(P,re||se[P]),ce.type=P,ce.texture=re)}function kt(){const P=ge[he];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Ze(){try{n.compressedTexImage2D(...arguments)}catch(P){He("WebGLState:",P)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(P){He("WebGLState:",P)}}function m(){try{n.texSubImage2D(...arguments)}catch(P){He("WebGLState:",P)}}function F(){try{n.texSubImage3D(...arguments)}catch(P){He("WebGLState:",P)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(P){He("WebGLState:",P)}}function W(){try{n.compressedTexSubImage3D(...arguments)}catch(P){He("WebGLState:",P)}}function ie(){try{n.texStorage2D(...arguments)}catch(P){He("WebGLState:",P)}}function ae(){try{n.texStorage3D(...arguments)}catch(P){He("WebGLState:",P)}}function X(){try{n.texImage2D(...arguments)}catch(P){He("WebGLState:",P)}}function Z(){try{n.texImage3D(...arguments)}catch(P){He("WebGLState:",P)}}function oe(P){return p[P]!==void 0?p[P]:n.getParameter(P)}function ye(P,re){p[P]!==re&&(n.pixelStorei(P,re),p[P]=re)}function ue(P){lt.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),lt.copy(P))}function le(P){Ye.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Ye.copy(P))}function Ae(P,re){let K=c.get(re);K===void 0&&(K=new WeakMap,c.set(re,K));let ce=K.get(P);ce===void 0&&(ce=n.getUniformBlockIndex(re,P.name),K.set(P,ce))}function Re(P,re){const ce=c.get(re).get(P);l.get(re)!==ce&&(n.uniformBlockBinding(re,ce,P.__bindingPointIndex),l.set(re,ce))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},p={},he=null,ge={},u={},x=new WeakMap,g=[],b=null,f=!1,h=null,w=null,R=null,M=null,y=null,v=null,E=null,_=new Ve(0,0,0),A=0,L=!1,C=null,U=null,$=null,J=null,B=null,lt.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Pe,bindFramebuffer:Le,drawBuffers:we,useProgram:ht,setBlending:Ke,setMaterial:We,setFlipSided:gt,setCullFace:xt,setLineWidth:bt,setPolygonOffset:Tt,setScissorTest:ct,activeTexture:_t,bindTexture:I,unbindTexture:kt,compressedTexImage2D:Ze,compressedTexImage3D:T,texImage2D:X,texImage3D:Z,pixelStorei:ye,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ie,texStorage3D:ae,texSubImage2D:m,texSubImage3D:F,compressedTexSubImage2D:G,compressedTexSubImage3D:W,scissor:ue,viewport:le,reset:De}}function f0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ke,d=new WeakMap,p=new Set;let u;const x=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(T,m){return g?new OffscreenCanvas(T,m):as("canvas")}function f(T,m,F){let G=1;const W=Ze(T);if((W.width>F||W.height>F)&&(G=F/Math.max(W.width,W.height)),G<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ie=Math.floor(G*W.width),ae=Math.floor(G*W.height);u===void 0&&(u=b(ie,ae));const X=m?b(ie,ae):u;return X.width=ie,X.height=ae,X.getContext("2d").drawImage(T,0,0,ie,ae),Ce("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ie+"x"+ae+")."),X}else return"data"in T&&Ce("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),T;return T}function h(T){return T.generateMipmaps}function w(T){n.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(T,m,F,G,W,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ae;G&&(ae=e.get("EXT_texture_norm16"),ae||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=m;if(m===n.RED&&(F===n.FLOAT&&(X=n.R32F),F===n.HALF_FLOAT&&(X=n.R16F),F===n.UNSIGNED_BYTE&&(X=n.R8),F===n.UNSIGNED_SHORT&&ae&&(X=ae.R16_EXT),F===n.SHORT&&ae&&(X=ae.R16_SNORM_EXT)),m===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.R8UI),F===n.UNSIGNED_SHORT&&(X=n.R16UI),F===n.UNSIGNED_INT&&(X=n.R32UI),F===n.BYTE&&(X=n.R8I),F===n.SHORT&&(X=n.R16I),F===n.INT&&(X=n.R32I)),m===n.RG&&(F===n.FLOAT&&(X=n.RG32F),F===n.HALF_FLOAT&&(X=n.RG16F),F===n.UNSIGNED_BYTE&&(X=n.RG8),F===n.UNSIGNED_SHORT&&ae&&(X=ae.RG16_EXT),F===n.SHORT&&ae&&(X=ae.RG16_SNORM_EXT)),m===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RG8UI),F===n.UNSIGNED_SHORT&&(X=n.RG16UI),F===n.UNSIGNED_INT&&(X=n.RG32UI),F===n.BYTE&&(X=n.RG8I),F===n.SHORT&&(X=n.RG16I),F===n.INT&&(X=n.RG32I)),m===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGB8UI),F===n.UNSIGNED_SHORT&&(X=n.RGB16UI),F===n.UNSIGNED_INT&&(X=n.RGB32UI),F===n.BYTE&&(X=n.RGB8I),F===n.SHORT&&(X=n.RGB16I),F===n.INT&&(X=n.RGB32I)),m===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),F===n.UNSIGNED_INT&&(X=n.RGBA32UI),F===n.BYTE&&(X=n.RGBA8I),F===n.SHORT&&(X=n.RGBA16I),F===n.INT&&(X=n.RGBA32I)),m===n.RGB&&(F===n.UNSIGNED_SHORT&&ae&&(X=ae.RGB16_EXT),F===n.SHORT&&ae&&(X=ae.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),m===n.RGBA){const Z=ie?ss:ze.getTransfer(W);F===n.FLOAT&&(X=n.RGBA32F),F===n.HALF_FLOAT&&(X=n.RGBA16F),F===n.UNSIGNED_BYTE&&(X=Z===Je?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&ae&&(X=ae.RGBA16_EXT),F===n.SHORT&&ae&&(X=ae.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function y(T,m){let F;return T?m===null||m===xn||m===fr?F=n.DEPTH24_STENCIL8:m===rn?F=n.DEPTH32F_STENCIL8:m===hr&&(F=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===xn||m===fr?F=n.DEPTH_COMPONENT24:m===rn?F=n.DEPTH_COMPONENT32F:m===hr&&(F=n.DEPTH_COMPONENT16),F}function v(T,m){return h(T)===!0||T.isFramebufferTexture&&T.minFilter!==wt&&T.minFilter!==Lt?Math.log2(Math.max(m.width,m.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?m.mipmaps.length:1}function E(T){const m=T.target;m.removeEventListener("dispose",E),A(m),m.isVideoTexture&&d.delete(m),m.isHTMLTexture&&p.delete(m)}function _(T){const m=T.target;m.removeEventListener("dispose",_),C(m)}function A(T){const m=i.get(T);if(m.__webglInit===void 0)return;const F=T.source,G=x.get(F);if(G){const W=G[m.__cacheKey];W.usedTimes--,W.usedTimes===0&&L(T),Object.keys(G).length===0&&x.delete(F)}i.remove(T)}function L(T){const m=i.get(T);n.deleteTexture(m.__webglTexture);const F=T.source,G=x.get(F);delete G[m.__cacheKey],a.memory.textures--}function C(T){const m=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(m.__webglFramebuffer[G]))for(let W=0;W<m.__webglFramebuffer[G].length;W++)n.deleteFramebuffer(m.__webglFramebuffer[G][W]);else n.deleteFramebuffer(m.__webglFramebuffer[G]);m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer[G])}else{if(Array.isArray(m.__webglFramebuffer))for(let G=0;G<m.__webglFramebuffer.length;G++)n.deleteFramebuffer(m.__webglFramebuffer[G]);else n.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&n.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let G=0;G<m.__webglColorRenderbuffer.length;G++)m.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(m.__webglColorRenderbuffer[G]);m.__webglDepthRenderbuffer&&n.deleteRenderbuffer(m.__webglDepthRenderbuffer)}const F=T.textures;for(let G=0,W=F.length;G<W;G++){const ie=i.get(F[G]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(F[G])}i.remove(T)}let U=0;function $(){U=0}function J(){return U}function B(T){U=T}function Y(){const T=U;return T>=r.maxTextures&&Ce("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),U+=1,T}function H(T){const m=[];return m.push(T.wrapS),m.push(T.wrapT),m.push(T.wrapR||0),m.push(T.magFilter),m.push(T.minFilter),m.push(T.anisotropy),m.push(T.internalFormat),m.push(T.format),m.push(T.type),m.push(T.generateMipmaps),m.push(T.premultiplyAlpha),m.push(T.flipY),m.push(T.unpackAlignment),m.push(T.colorSpace),m.join()}function j(T,m){const F=i.get(T);if(T.isVideoTexture&&I(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const G=T.image;if(G===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(F,T,m);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+m)}function te(T,m){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Pe(F,T,m);return}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+m)}function he(T,m){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Pe(F,T,m);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+m)}function ge(T,m){const F=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&F.__version!==T.version){Le(F,T,m);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+m)}const xe={[ts]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[_a]:n.MIRRORED_REPEAT},qe={[wt]:n.NEAREST,[Pu]:n.NEAREST_MIPMAP_NEAREST,[Tr]:n.NEAREST_MIPMAP_LINEAR,[Lt]:n.LINEAR,[bs]:n.LINEAR_MIPMAP_NEAREST,[ri]:n.LINEAR_MIPMAP_LINEAR},lt={[Du]:n.NEVER,[Bu]:n.ALWAYS,[Uu]:n.LESS,[go]:n.LEQUAL,[Nu]:n.EQUAL,[_o]:n.GEQUAL,[Fu]:n.GREATER,[Ou]:n.NOTEQUAL};function Ye(T,m){if(m.type===rn&&e.has("OES_texture_float_linear")===!1&&(m.magFilter===Lt||m.magFilter===bs||m.magFilter===Tr||m.magFilter===ri||m.minFilter===Lt||m.minFilter===bs||m.minFilter===Tr||m.minFilter===ri)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,xe[m.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,xe[m.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,xe[m.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,qe[m.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,qe[m.minFilter]),m.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,lt[m.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===wt||m.minFilter!==Tr&&m.minFilter!==ri||m.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||i.get(m).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,r.getMaxAnisotropy())),i.get(m).__currentAnisotropy=m.anisotropy}}}function Q(T,m){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,m.addEventListener("dispose",E));const G=m.source;let W=x.get(G);W===void 0&&(W={},x.set(G,W));const ie=H(m);if(ie!==T.__cacheKey){W[ie]===void 0&&(W[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),W[ie].usedTimes++;const ae=W[T.__cacheKey];ae!==void 0&&(W[T.__cacheKey].usedTimes--,ae.usedTimes===0&&L(m)),T.__cacheKey=ie,T.__webglTexture=W[ie].texture}return F}function se(T,m,F){return Math.floor(Math.floor(T/F)/m)}function ne(T,m,F,G){const ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,m.width,m.height,F,G,m.data);else{ie.sort((ye,ue)=>ye.start-ue.start);let ae=0;for(let ye=1;ye<ie.length;ye++){const ue=ie[ae],le=ie[ye],Ae=ue.start+ue.count,Re=se(le.start,m.width,4),De=se(ue.start,m.width,4);le.start<=Ae+1&&Re===De&&se(le.start+le.count-1,m.width,4)===Re?ue.count=Math.max(ue.count,le.start+le.count-ue.start):(++ae,ie[ae]=le)}ie.length=ae+1;const X=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,m.width);for(let ye=0,ue=ie.length;ye<ue;ye++){const le=ie[ye],Ae=Math.floor(le.start/4),Re=Math.ceil(le.count/4),De=Ae%m.width,P=Math.floor(Ae/m.width),re=Re,K=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,P),t.texSubImage2D(n.TEXTURE_2D,0,De,P,re,K,F,G,m.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,X),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Pe(T,m,F){let G=n.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),m.isData3DTexture&&(G=n.TEXTURE_3D);const W=Q(T,m),ie=m.source;t.bindTexture(G,T.__webglTexture,n.TEXTURE0+F);const ae=i.get(ie);if(ie.version!==ae.__version||W===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&m.image instanceof ImageBitmap)===!1){const K=ze.getPrimaries(ze.workingColorSpace),ce=m.colorSpace===Hn?null:ze.getPrimaries(m.colorSpace),me=m.colorSpace===Hn||K===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment);let Z=f(m.image,!1,r.maxTextureSize);Z=kt(m,Z);const oe=s.convert(m.format,m.colorSpace),ye=s.convert(m.type);let ue=M(m.internalFormat,oe,ye,m.normalized,m.colorSpace,m.isVideoTexture);Ye(G,m);let le;const Ae=m.mipmaps,Re=m.isVideoTexture!==!0,De=ae.__version===void 0||W===!0,P=ie.dataReady,re=v(m,Z);if(m.isDepthTexture)ue=y(m.format===si,m.type),De&&(Re?t.texStorage2D(n.TEXTURE_2D,1,ue,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,ue,Z.width,Z.height,0,oe,ye,null));else if(m.isDataTexture)if(Ae.length>0){Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],Re?P&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,oe,ye,le.data);m.generateMipmaps=!1}else Re?(De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height),P&&ne(m,Z,oe,ye)):t.texImage2D(n.TEXTURE_2D,0,ue,Z.width,Z.height,0,oe,ye,Z.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Re&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,Ae[0].width,Ae[0].height,Z.depth);for(let K=0,ce=Ae.length;K<ce;K++)if(le=Ae[K],m.format!==sn)if(oe!==null)if(Re){if(P)if(m.layerUpdates.size>0){const me=gl(le.width,le.height,m.format,m.type);for(const ee of m.layerUpdates){const be=le.data.subarray(ee*me/le.data.BYTES_PER_ELEMENT,(ee+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,ee,le.width,le.height,1,oe,be)}m.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,le.width,le.height,Z.depth,oe,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,ue,le.width,le.height,Z.depth,0,le.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?P&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,le.width,le.height,Z.depth,oe,ye,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,ue,le.width,le.height,Z.depth,0,oe,ye,le.data)}else{Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],m.format!==sn?oe!==null?Re?P&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?P&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,ye,le.data):t.texImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,oe,ye,le.data)}else if(m.isDataArrayTexture)if(Re){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,Z.width,Z.height,Z.depth),P)if(m.layerUpdates.size>0){const K=gl(Z.width,Z.height,m.format,m.type);for(const ce of m.layerUpdates){const me=Z.data.subarray(ce*K/Z.data.BYTES_PER_ELEMENT,(ce+1)*K/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,Z.width,Z.height,1,oe,ye,me)}m.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,oe,ye,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,Z.width,Z.height,Z.depth,0,oe,ye,Z.data);else if(m.isData3DTexture)Re?(De&&t.texStorage3D(n.TEXTURE_3D,re,ue,Z.width,Z.height,Z.depth),P&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,oe,ye,Z.data)):t.texImage3D(n.TEXTURE_3D,0,ue,Z.width,Z.height,Z.depth,0,oe,ye,Z.data);else if(m.isFramebufferTexture){if(De)if(Re)t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height);else{let K=Z.width,ce=Z.height;for(let me=0;me<re;me++)t.texImage2D(n.TEXTURE_2D,me,ue,K,ce,0,oe,ye,null),K>>=1,ce>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in n){const K=n.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Z.parentNode!==K){K.appendChild(Z),p.add(m),K.onpaint=ce=>{const me=ce.changedElements;for(const ee of p)me.includes(ee.image)&&(ee.needsUpdate=!0)},K.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const me=n.RGBA,ee=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,me,ee,be,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&De){const K=Ze(Ae[0]);t.texStorage2D(n.TEXTURE_2D,re,ue,K.width,K.height)}for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],Re?P&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,oe,ye,le):t.texImage2D(n.TEXTURE_2D,K,ue,oe,ye,le);m.generateMipmaps=!1}else if(Re){if(De){const K=Ze(Z);t.texStorage2D(n.TEXTURE_2D,re,ue,K.width,K.height)}P&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,ye,Z)}else t.texImage2D(n.TEXTURE_2D,0,ue,oe,ye,Z);h(m)&&w(G),ae.__version=ie.version,m.onUpdate&&m.onUpdate(m)}T.__version=m.version}function Le(T,m,F){if(m.image.length!==6)return;const G=Q(T,m),W=m.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const ie=i.get(W);if(W.version!==ie.__version||G===!0){t.activeTexture(n.TEXTURE0+F);const ae=ze.getPrimaries(ze.workingColorSpace),X=m.colorSpace===Hn?null:ze.getPrimaries(m.colorSpace),Z=m.colorSpace===Hn||ae===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const oe=m.isCompressedTexture||m.image[0].isCompressedTexture,ye=m.image[0]&&m.image[0].isDataTexture,ue=[];for(let ee=0;ee<6;ee++)!oe&&!ye?ue[ee]=f(m.image[ee],!0,r.maxCubemapSize):ue[ee]=ye?m.image[ee].image:m.image[ee],ue[ee]=kt(m,ue[ee]);const le=ue[0],Ae=s.convert(m.format,m.colorSpace),Re=s.convert(m.type),De=M(m.internalFormat,Ae,Re,m.normalized,m.colorSpace),P=m.isVideoTexture!==!0,re=ie.__version===void 0||G===!0,K=W.dataReady;let ce=v(m,le);Ye(n.TEXTURE_CUBE_MAP,m);let me;if(oe){P&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,le.width,le.height);for(let ee=0;ee<6;ee++){me=ue[ee].mipmaps;for(let be=0;be<me.length;be++){const Me=me[be];m.format!==sn?Ae!==null?P?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,De,Me.width,Me.height,0,Me.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Re,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,De,Me.width,Me.height,0,Ae,Re,Me.data)}}}else{if(me=m.mipmaps,P&&re){me.length>0&&ce++;const ee=Ze(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ye){P?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ue[ee].width,ue[ee].height,Ae,Re,ue[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,ue[ee].width,ue[ee].height,0,Ae,Re,ue[ee].data);for(let be=0;be<me.length;be++){const ut=me[be].image[ee].image;P?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,ut.width,ut.height,Ae,Re,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,De,ut.width,ut.height,0,Ae,Re,ut.data)}}else{P?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,Re,ue[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,Ae,Re,ue[ee]);for(let be=0;be<me.length;be++){const Me=me[be];P?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,Ae,Re,Me.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,De,Ae,Re,Me.image[ee])}}}h(m)&&w(n.TEXTURE_CUBE_MAP),ie.__version=W.version,m.onUpdate&&m.onUpdate(m)}T.__version=m.version}function we(T,m,F,G,W,ie){const ae=s.convert(F.format,F.colorSpace),X=s.convert(F.type),Z=M(F.internalFormat,ae,X,F.normalized,F.colorSpace),oe=i.get(m),ye=i.get(F);if(ye.__renderTarget=m,!oe.__hasExternalTextures){const ue=Math.max(1,m.width>>ie),le=Math.max(1,m.height>>ie);W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?t.texImage3D(W,ie,Z,ue,le,m.depth,0,ae,X,null):t.texImage2D(W,ie,Z,ue,le,0,ae,X,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),_t(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,W,ye.__webglTexture,0,ct(m)):(W===n.TEXTURE_2D||W>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,W,ye.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(T,m,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),m.depthBuffer){const G=m.depthTexture,W=G&&G.isDepthTexture?G.type:null,ie=y(m.stencilBuffer,W),ae=m.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;_t(m)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(m),ie,m.width,m.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(m),ie,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,ie,m.width,m.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,T)}else{const G=m.textures;for(let W=0;W<G.length;W++){const ie=G[W],ae=s.convert(ie.format,ie.colorSpace),X=s.convert(ie.type),Z=M(ie.internalFormat,ae,X,ie.normalized,ie.colorSpace);_t(m)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(m),Z,m.width,m.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(m),Z,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,Z,m.width,m.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(T,m,F){const G=m.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=i.get(m.depthTexture);if(W.__renderTarget=m,(!W.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),G){if(W.__webglInit===void 0&&(W.__webglInit=!0,m.depthTexture.addEventListener("dispose",E)),W.__webglTexture===void 0){W.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,m.depthTexture);const oe=s.convert(m.depthTexture.format),ye=s.convert(m.depthTexture.type);let ue;m.depthTexture.format===In?ue=n.DEPTH_COMPONENT24:m.depthTexture.format===si&&(ue=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ue,m.width,m.height,0,oe,ye,null)}}else j(m.depthTexture,0);const ie=W.__webglTexture,ae=ct(m),X=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,Z=m.depthTexture.format===si?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(m.depthTexture.format===In)_t(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,X,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Z,X,ie,0);else if(m.depthTexture.format===si)_t(m)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,X,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Z,X,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(T){const m=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==T.depthTexture){const G=T.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),G){const W=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,G.removeEventListener("dispose",W)};G.addEventListener("dispose",W),m.__depthDisposeCallback=W}m.__boundDepthTexture=G}if(T.depthTexture&&!m.__autoAllocateDepthBuffer)if(F)for(let G=0;G<6;G++)Be(m.__webglFramebuffer[G],T,G);else{const G=T.texture.mipmaps;G&&G.length>0?Be(m.__webglFramebuffer[0],T,0):Be(m.__webglFramebuffer,T,0)}else if(F){m.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[G]),m.__webglDepthbuffer[G]===void 0)m.__webglDepthbuffer[G]=n.createRenderbuffer(),ht(m.__webglDepthbuffer[G],T,!1);else{const W=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=m.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,ie)}}else{const G=T.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=n.createRenderbuffer(),ht(m.__webglDepthbuffer,T,!1);else{const W=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=m.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(T,m,F){const G=i.get(T);m!==void 0&&we(G.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&et(T)}function We(T){const m=T.texture,F=i.get(T),G=i.get(m);T.addEventListener("dispose",_);const W=T.textures,ie=T.isWebGLCubeRenderTarget===!0,ae=W.length>1;if(ae||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=m.version,a.memory.textures++),ie){F.__webglFramebuffer=[];for(let X=0;X<6;X++)if(m.mipmaps&&m.mipmaps.length>0){F.__webglFramebuffer[X]=[];for(let Z=0;Z<m.mipmaps.length;Z++)F.__webglFramebuffer[X][Z]=n.createFramebuffer()}else F.__webglFramebuffer[X]=n.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){F.__webglFramebuffer=[];for(let X=0;X<m.mipmaps.length;X++)F.__webglFramebuffer[X]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(ae)for(let X=0,Z=W.length;X<Z;X++){const oe=i.get(W[X]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&_t(T)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let X=0;X<W.length;X++){const Z=W[X];F.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[X]);const oe=s.convert(Z.format,Z.colorSpace),ye=s.convert(Z.type),ue=M(Z.internalFormat,oe,ye,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),le=ct(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,ue,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,F.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,m);for(let X=0;X<6;X++)if(m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)we(F.__webglFramebuffer[X][Z],T,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,Z);else we(F.__webglFramebuffer[X],T,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);h(m)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let X=0,Z=W.length;X<Z;X++){const oe=W[X],ye=i.get(oe);let ue=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ye.__webglTexture),Ye(ue,oe),we(F.__webglFramebuffer,T,oe,n.COLOR_ATTACHMENT0+X,ue,0),h(oe)&&w(ue)}t.unbindTexture()}else{let X=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(X=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(X,G.__webglTexture),Ye(X,m),m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)we(F.__webglFramebuffer[Z],T,m,n.COLOR_ATTACHMENT0,X,Z);else we(F.__webglFramebuffer,T,m,n.COLOR_ATTACHMENT0,X,0);h(m)&&w(X),t.unbindTexture()}T.depthBuffer&&et(T)}function gt(T){const m=T.textures;for(let F=0,G=m.length;F<G;F++){const W=m[F];if(h(W)){const ie=R(T),ae=i.get(W).__webglTexture;t.bindTexture(ie,ae),w(ie),t.unbindTexture()}}}const xt=[],bt=[];function Tt(T){if(T.samples>0){if(_t(T)===!1){const m=T.textures,F=T.width,G=T.height;let W=n.COLOR_BUFFER_BIT;const ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(T),X=m.length>1;if(X)for(let oe=0;oe<m.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const Z=T.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<m.length;oe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(W|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(W|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(m[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,F,G,0,0,F,G,W,n.NEAREST),l===!0&&(xt.length=0,bt.length=0,xt.push(n.COLOR_ATTACHMENT0+oe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(xt.push(ie),bt.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let oe=0;oe<m.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const ye=i.get(m[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const m=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[m])}}}function ct(T){return Math.min(r.maxSamples,T.samples)}function _t(T){const m=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function I(T){const m=a.render.frame;d.get(T)!==m&&(d.set(T,m),T.update())}function kt(T,m){const F=T.colorSpace,G=T.format,W=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==rs&&F!==Hn&&(ze.getTransfer(F)===Je?(G!==sn||W!==Yt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",F)),m}function Ze(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=$,this.getTextureUnits=J,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=te,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=Ke,this.setupRenderTarget=We,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=we,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function p0(n,e){function t(i,r=Hn){let s;const a=ze.getTransfer(r);if(i===Yt)return n.UNSIGNED_BYTE;if(i===co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===uo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===lc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===cc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ac)return n.BYTE;if(i===oc)return n.SHORT;if(i===hr)return n.UNSIGNED_SHORT;if(i===lo)return n.INT;if(i===xn)return n.UNSIGNED_INT;if(i===rn)return n.FLOAT;if(i===Pn)return n.HALF_FLOAT;if(i===uc)return n.ALPHA;if(i===dc)return n.RGB;if(i===sn)return n.RGBA;if(i===In)return n.DEPTH_COMPONENT;if(i===si)return n.DEPTH_STENCIL;if(i===ho)return n.RED;if(i===fo)return n.RED_INTEGER;if(i===ui)return n.RG;if(i===po)return n.RG_INTEGER;if(i===mo)return n.RGBA_INTEGER;if(i===Kr||i===Zr||i===Jr||i===Qr)if(a===Je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===va||i===xa||i===Ma||i===Sa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===va)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ba||i===ya||i===Ea||i===Ta||i===Aa||i===ns||i===wa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ba||i===ya)return a===Je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ea)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ta)return s.COMPRESSED_R11_EAC;if(i===Aa)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ns)return s.COMPRESSED_RG11_EAC;if(i===wa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ra||i===Ca||i===Pa||i===Ia||i===La||i===Da||i===Ua||i===Na||i===Fa||i===Oa||i===Ba||i===ka||i===za||i===Ga)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ra)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ca)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pa)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ia)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===La)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Da)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ua)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Na)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fa)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oa)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ba)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ka)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===za)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ga)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ha||i===Va||i===Wa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ha)return a===Je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Va)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xa||i===$a||i===is||i===qa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Xa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===$a)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===is)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const m0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g0=`
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

}`;class _0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Mc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Mn({vertexShader:m0,fragmentShader:g0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new qi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class v0 extends di{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,x=null,g=null;const b=typeof XRWebGLBinding<"u",f=new _0,h={},w=t.getContextAttributes();let R=null,M=null;const y=[],v=[],E=new ke;let _=null;const A=new tn;A.viewport=new ot;const L=new tn;L.viewport=new ot;const C=[A,L],U=new Ad;let $=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=y[Q];return se===void 0&&(se=new Ps,y[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=y[Q];return se===void 0&&(se=new Ps,y[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=y[Q];return se===void 0&&(se=new Ps,y[Q]=se),se.getHandSpace()};function B(Q){const se=v.indexOf(Q.inputSource);if(se===-1)return;const ne=y[se];ne!==void 0&&(ne.update(Q.inputSource,Q.frame,c||a),ne.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<y.length;Q++){const se=v[Q];se!==null&&(v[Q]=null,y[Q].disconnect(se))}$=null,J=null,f.reset();for(const Q in h)delete h[Q];e.setRenderTarget(R),x=null,u=null,p=null,r=null,M=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:x},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),w.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(E),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,Pe=null,Le=null;w.depth&&(Le=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=w.stencil?si:In,Pe=w.stencil?fr:xn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};p=this.getBinding(),u=p.createProjectionLayer(we),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new vn(u.textureWidth,u.textureHeight,{format:sn,type:Yt,depthTexture:new Hi(u.textureWidth,u.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ne={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};x=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),M=new vn(x.framebufferWidth,x.framebufferHeight,{format:sn,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function H(Q){for(let se=0;se<Q.removed.length;se++){const ne=Q.removed[se],Pe=v.indexOf(ne);Pe>=0&&(v[Pe]=null,y[Pe].disconnect(ne))}for(let se=0;se<Q.added.length;se++){const ne=Q.added[se];let Pe=v.indexOf(ne);if(Pe===-1){for(let we=0;we<y.length;we++)if(we>=v.length){v.push(ne),Pe=we;break}else if(v[we]===null){v[we]=ne,Pe=we;break}if(Pe===-1)break}const Le=y[Pe];Le&&Le.connect(ne)}}const j=new O,te=new O;function he(Q,se,ne){j.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(ne.matrixWorld);const Pe=j.distanceTo(te),Le=se.projectionMatrix.elements,we=ne.projectionMatrix.elements,ht=Le[14]/(Le[10]-1),Be=Le[14]/(Le[10]+1),et=(Le[9]+1)/Le[5],Ke=(Le[9]-1)/Le[5],We=(Le[8]-1)/Le[0],gt=(we[8]+1)/we[0],xt=ht*We,bt=ht*gt,Tt=Pe/(-We+gt),ct=Tt*-We;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(ct),Q.translateZ(Tt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Le[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const _t=ht+Tt,I=Be+Tt,kt=xt-ct,Ze=bt+(Pe-ct),T=et*Be/I*_t,m=Ke*Be/I*_t;Q.projectionMatrix.makePerspective(kt,Ze,T,m,_t,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ge(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let se=Q.near,ne=Q.far;f.texture!==null&&(f.depthNear>0&&(se=f.depthNear),f.depthFar>0&&(ne=f.depthFar)),U.near=L.near=A.near=se,U.far=L.far=A.far=ne,($!==U.near||J!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),$=U.near,J=U.far),U.layers.mask=Q.layers.mask|6,A.layers.mask=U.layers.mask&-5,L.layers.mask=U.layers.mask&-3;const Pe=Q.parent,Le=U.cameras;ge(U,Pe);for(let we=0;we<Le.length;we++)ge(Le[we],Pe);Le.length===2?he(U,A,L):U.projectionMatrix.copy(A.projectionMatrix),xe(Q,U,Pe)};function xe(Q,se,ne){ne===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(ne.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ka*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&x===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=Q)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(U)},this.getCameraTexture=function(Q){return h[Q]};let qe=null;function lt(Q,se){if(d=se.getViewerPose(c||a),g=se,d!==null){const ne=d.views;x!==null&&(e.setRenderTargetFramebuffer(M,x.framebuffer),e.setRenderTarget(M));let Pe=!1;ne.length!==U.cameras.length&&(U.cameras.length=0,Pe=!0);for(let Be=0;Be<ne.length;Be++){const et=ne[Be];let Ke=null;if(x!==null)Ke=x.getViewport(et);else{const gt=p.getViewSubImage(u,et);Ke=gt.viewport,Be===0&&(e.setRenderTargetTextures(M,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(M))}let We=C[Be];We===void 0&&(We=new tn,We.layers.enable(Be),We.viewport=new ot,C[Be]=We),We.matrix.fromArray(et.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(et.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Be===0&&(U.matrix.copy(We.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Pe===!0&&U.cameras.push(We)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){p=i.getBinding();const Be=p.getDepthInformation(ne[0]);Be&&Be.isValid&&Be.texture&&f.init(Be,r.renderState)}if(Le&&Le.includes("camera-access")&&b){e.state.unbindTexture(),p=i.getBinding();for(let Be=0;Be<ne.length;Be++){const et=ne[Be].camera;if(et){let Ke=h[et];Ke||(Ke=new Mc,h[et]=Ke);const We=p.getCameraImage(et);Ke.sourceTexture=We}}}}for(let ne=0;ne<y.length;ne++){const Pe=v[ne],Le=y[ne];Pe!==null&&Le!==void 0&&Le.update(Pe,se,c||a)}qe&&qe(Q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Ye=new Tc;Ye.setAnimationLoop(lt),this.setAnimationLoop=function(Q){qe=Q},this.dispose=function(){}}}const x0=new it,Lc=new Ie;Lc.set(-1,0,0,0,1,0,0,0,1);function M0(n,e){function t(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function i(f,h){h.color.getRGB(f.fogColor.value,Sc(n)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function r(f,h,w,R,M){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(f,h):h.isMeshLambertMaterial?(s(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(f,h),p(f,h)):h.isMeshPhongMaterial?(s(f,h),d(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(f,h),u(f,h),h.isMeshPhysicalMaterial&&x(f,h,M)):h.isMeshMatcapMaterial?(s(f,h),g(f,h)):h.isMeshDepthMaterial?s(f,h):h.isMeshDistanceMaterial?(s(f,h),b(f,h)):h.isMeshNormalMaterial?s(f,h):h.isLineBasicMaterial?(a(f,h),h.isLineDashedMaterial&&o(f,h)):h.isPointsMaterial?l(f,h,w,R):h.isSpriteMaterial?c(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,t(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===Vt&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,t(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===Vt&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,t(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,t(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);const w=e.get(h),R=w.envMap,M=w.envMapRotation;R&&(f.envMap.value=R,f.envMapRotation.value.setFromMatrix4(x0.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Lc),f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,f.aoMapTransform))}function a(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform))}function o(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function l(f,h,w,R){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*w,f.scale.value=R*.5,h.map&&(f.map.value=h.map,t(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function c(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function d(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function p(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function u(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function x(f,h,w){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Vt&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=w.texture,f.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,h){h.matcap&&(f.matcap.value=h.matcap)}function b(f,h){const w=e.get(h).light;f.referencePosition.value.setFromMatrixPosition(w.matrixWorld),f.nearDistance.value=w.shadow.camera.near,f.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function S0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const v=y.program;i.uniformBlockBinding(M,v)}function c(M,y){let v=r[M.id];v===void 0&&(f(M),v=d(M),r[M.id]=v,M.addEventListener("dispose",w));const E=y.program;i.updateUBOMapping(M,E);const _=e.render.frame;s[M.id]!==_&&(u(M),s[M.id]=_)}function d(M){const y=p();M.__bindingPointIndex=y;const v=n.createBuffer(),E=M.__size,_=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,E,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,v),v}function p(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const y=r[M.id],v=M.uniforms,E=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let _=0,A=v.length;_<A;_++){const L=v[_];if(Array.isArray(L))for(let C=0,U=L.length;C<U;C++)x(L[C],_,C,E);else x(L,_,0,E)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(M,y,v,E){if(b(M,y,v,E)===!0){const _=M.__offset,A=M.value;if(Array.isArray(A)){let L=0;for(let C=0;C<A.length;C++){const U=A[C],$=h(U);g(U,M.__data,L),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,M.__data)}}function g(M,y,v){typeof M=="number"||typeof M=="boolean"?y[0]=M:M.isMatrix3?(y[0]=M.elements[0],y[1]=M.elements[1],y[2]=M.elements[2],y[3]=0,y[4]=M.elements[3],y[5]=M.elements[4],y[6]=M.elements[5],y[7]=0,y[8]=M.elements[6],y[9]=M.elements[7],y[10]=M.elements[8],y[11]=0):ArrayBuffer.isView(M)?y.set(new M.constructor(M.buffer,M.byteOffset,y.length)):M.toArray(y,v)}function b(M,y,v,E){const _=M.value,A=y+"_"+v;if(E[A]===void 0)return typeof _=="number"||typeof _=="boolean"?E[A]=_:ArrayBuffer.isView(_)?E[A]=_.slice():E[A]=_.clone(),!0;{const L=E[A];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return E[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function f(M){const y=M.uniforms;let v=0;const E=16;for(let A=0,L=y.length;A<L;A++){const C=Array.isArray(y[A])?y[A]:[y[A]];for(let U=0,$=C.length;U<$;U++){const J=C[U],B=Array.isArray(J.value)?J.value:[J.value];for(let Y=0,H=B.length;Y<H;Y++){const j=B[Y],te=h(j),he=v%E,ge=he%te.boundary,xe=he+ge;v+=ge,xe!==0&&E-xe<te.storage&&(v+=E-xe),J.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=v,v+=te.storage}}}const _=v%E;return _>0&&(v+=E-_),M.__size=v,M.__cache={},this}function h(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(y.boundary=16,y.storage=M.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",M),y}function w(M){const y=M.target;y.removeEventListener("dispose",w);const v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function R(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:R}}const b0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hn=null;function y0(){return hn===null&&(hn=new Mo(b0,16,16,ui,Pn),hn.name="DFG_LUT",hn.minFilter=Lt,hn.magFilter=Lt,hn.wrapS=wn,hn.wrapT=wn,hn.generateMipmaps=!1,hn.needsUpdate=!0),hn}class E0{constructor(e={}){const{canvas:t=zu(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:x=Yt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const b=x,f=new Set([mo,po,fo]),h=new Set([Yt,xn,hr,fr,co,uo]),w=new Uint32Array(4),R=new Int32Array(4),M=new O;let y=null,v=null;const E=[],_=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let C=!1,U=null,$=null,J=null,B=null;this._outputColorSpace=Ht;let Y=0,H=0,j=null,te=-1,he=null;const ge=new ot,xe=new ot;let qe=null;const lt=new Ve(0);let Ye=0,Q=t.width,se=t.height,ne=1,Pe=null,Le=null;const we=new ot(0,0,Q,se),ht=new ot(0,0,Q,se);let Be=!1;const et=new So;let Ke=!1,We=!1;const gt=new it,xt=new O,bt=new ot,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function _t(){return j===null?ne:1}let I=i;function kt(S,D){return t.getContext(S,D)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ao}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",ln,!1),I===null){const D="webgl2";if(I=kt(D,S),I===null)throw kt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw He("WebGLRenderer: "+S.message),S}let Ze,T,m,F,G,W,ie,ae,X,Z,oe,ye,ue,le,Ae,Re,De,P,re,K,ce,me,ee;function be(){Ze=new yp(I),Ze.init(),ce=new p0(I,Ze),T=new mp(I,Ze,e,ce),m=new h0(I,Ze),T.reversedDepthBuffer&&u&&m.buffers.depth.setReversed(!0),$=I.createFramebuffer(),J=I.createFramebuffer(),B=I.createFramebuffer(),F=new Ap(I),G=new Qm,W=new f0(I,Ze,m,G,T,ce,F),ie=new bp(L),ae=new Cd(I),me=new fp(I,ae),X=new Ep(I,ae,F,me),Z=new Rp(I,X,ae,me,F),P=new wp(I,T,W),Ae=new gp(G),oe=new Jm(L,ie,Ze,T,me,Ae),ye=new M0(L,G),ue=new e0,le=new a0(Ze),De=new hp(L,ie,m,Z,g,l),Re=new d0(L,Z,T),ee=new S0(I,F,T,m),re=new pp(I,Ze,F),K=new Tp(I,Ze,F),F.programs=oe.programs,L.capabilities=T,L.extensions=Ze,L.properties=G,L.renderLists=ue,L.shadowMap=Re,L.state=m,L.info=F}be(),b!==Yt&&(A=new Pp(b,t.width,t.height,o,r,s));const Me=new v0(L,I);this.xr=Me,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const S=Ze.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ze.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(S){S!==void 0&&(ne=S,this.setSize(Q,se,!1))},this.getSize=function(S){return S.set(Q,se)},this.setSize=function(S,D,V=!0){if(Me.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=S,se=D,t.width=Math.floor(S*ne),t.height=Math.floor(D*ne),V===!0&&(t.style.width=S+"px",t.style.height=D+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(Q*ne,se*ne).floor()},this.setDrawingBufferSize=function(S,D,V){Q=S,se=D,ne=V,t.width=Math.floor(S*V),t.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(b===Yt){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ge)},this.getViewport=function(S){return S.copy(we)},this.setViewport=function(S,D,V,k){S.isVector4?we.set(S.x,S.y,S.z,S.w):we.set(S,D,V,k),m.viewport(ge.copy(we).multiplyScalar(ne).round())},this.getScissor=function(S){return S.copy(ht)},this.setScissor=function(S,D,V,k){S.isVector4?ht.set(S.x,S.y,S.z,S.w):ht.set(S,D,V,k),m.scissor(xe.copy(ht).multiplyScalar(ne).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(S){m.setScissorTest(Be=S)},this.setOpaqueSort=function(S){Pe=S},this.setTransparentSort=function(S){Le=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,V=!0){let k=0;if(S){let z=!1;if(j!==null){const pe=j.texture.format;z=f.has(pe)}if(z){const pe=j.texture.type,ve=h.has(pe),fe=De.getClearColor(),Se=De.getClearAlpha(),Ee=fe.r,Ue=fe.g,Fe=fe.b;ve?(w[0]=Ee,w[1]=Ue,w[2]=Fe,w[3]=Se,I.clearBufferuiv(I.COLOR,0,w)):(R[0]=Ee,R[1]=Ue,R[2]=Fe,R[3]=Se,I.clearBufferiv(I.COLOR,0,R))}else k|=I.COLOR_BUFFER_BIT}D&&(k|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(k|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&I.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),De.dispose(),ue.dispose(),le.dispose(),G.dispose(),ie.dispose(),Z.dispose(),me.dispose(),ee.dispose(),oe.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Ao),Me.removeEventListener("sessionend",wo),Kn.stop()};function ut(S){S.preventDefault(),Xo("WebGLRenderer: Context Lost."),C=!0}function rt(){Xo("WebGLRenderer: Context Restored."),C=!1;const S=F.autoReset,D=Re.enabled,V=Re.autoUpdate,k=Re.needsUpdate,z=Re.type;be(),F.autoReset=S,Re.enabled=D,Re.autoUpdate=V,Re.needsUpdate=k,Re.type=z}function ln(S){He("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function cn(S){const D=S.target;D.removeEventListener("dispose",cn),Nc(D)}function Nc(S){Fc(S),G.remove(S)}function Fc(S){const D=G.get(S).programs;D!==void 0&&(D.forEach(function(V){oe.releaseProgram(V)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,k,z,pe){D===null&&(D=Tt);const ve=z.isMesh&&z.matrixWorld.determinantAffine()<0,fe=kc(S,D,V,k,z);m.setMaterial(k,ve);let Se=V.index,Ee=1;if(k.wireframe===!0){if(Se=X.getWireframeAttribute(V),Se===void 0)return;Ee=2}const Ue=V.drawRange,Fe=V.attributes.position;let Te=Ue.start*Ee,je=(Ue.start+Ue.count)*Ee;pe!==null&&(Te=Math.max(Te,pe.start*Ee),je=Math.min(je,(pe.start+pe.count)*Ee)),Se!==null?(Te=Math.max(Te,0),je=Math.min(je,Se.count)):Fe!=null&&(Te=Math.max(Te,0),je=Math.min(je,Fe.count));const ft=je-Te;if(ft<0||ft===1/0)return;me.setup(z,k,fe,V,Se);let dt,tt=re;if(Se!==null&&(dt=ae.get(Se),tt=K,tt.setIndex(dt)),z.isMesh)k.wireframe===!0?(m.setLineWidth(k.wireframeLinewidth*_t()),tt.setMode(I.LINES)):tt.setMode(I.TRIANGLES);else if(z.isLine){let Ct=k.linewidth;Ct===void 0&&(Ct=1),m.setLineWidth(Ct*_t()),z.isLineSegments?tt.setMode(I.LINES):z.isLineLoop?tt.setMode(I.LINE_LOOP):tt.setMode(I.LINE_STRIP)}else z.isPoints?tt.setMode(I.POINTS):z.isSprite&&tt.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))tt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ct=z._multiDrawStarts,_e=z._multiDrawCounts,Wt=z._multiDrawCount,Xe=Se?ae.get(Se).bytesPerElement:1,Kt=G.get(k).currentProgram.getUniforms();for(let un=0;un<Wt;un++)Kt.setValue(I,"_gl_DrawID",un),tt.render(Ct[un]/Xe,_e[un])}else if(z.isInstancedMesh)tt.renderInstances(Te,ft,z.count);else if(V.isInstancedBufferGeometry){const Ct=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,_e=Math.min(V.instanceCount,Ct);tt.renderInstances(Te,ft,_e)}else tt.render(Te,ft)};function To(S,D,V){S.transparent===!0&&S.side===An&&S.forceSinglePass===!1?(S.side=Vt,S.needsUpdate=!0,Sr(S,D,V),S.side=$n,S.needsUpdate=!0,Sr(S,D,V),S.side=An):Sr(S,D,V)}this.compile=function(S,D,V=null){V===null&&(V=S),v=le.get(V),v.init(D),_.push(v),V.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(v.pushLight(z),z.castShadow&&v.pushShadow(z))}),S!==V&&S.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(v.pushLight(z),z.castShadow&&v.pushShadow(z))}),v.setupLights();const k=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pe=z.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];To(fe,V,z),k.add(fe)}else To(pe,V,z),k.add(pe)}),v=_.pop(),k},this.compileAsync=function(S,D,V=null){const k=this.compile(S,D,V);return new Promise(z=>{function pe(){if(k.forEach(function(ve){G.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){z(S);return}setTimeout(pe,10)}Ze.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let vs=null;function Oc(S){vs&&vs(S)}function Ao(){Kn.stop()}function wo(){Kn.start()}const Kn=new Tc;Kn.setAnimationLoop(Oc),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(S){vs=S,Me.setAnimationLoop(S),S===null?Kn.stop():Kn.start()},Me.addEventListener("sessionstart",Ao),Me.addEventListener("sessionend",wo),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;U!==null&&U.renderStart(S,D);const V=Me.enabled===!0&&Me.isPresenting===!0,k=A!==null&&(j===null||V)&&A.begin(L,j);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(D),D=Me.getCamera()),S.isScene===!0&&S.onBeforeRender(L,S,D,j),v=le.get(S,_.length),v.init(D),v.state.textureUnits=W.getTextureUnits(),_.push(v),gt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),et.setFromProjectionMatrix(gt,gn,D.reversedDepth),We=this.localClippingEnabled,Ke=Ae.init(this.clippingPlanes,We),y=ue.get(S,E.length),y.init(),E.push(y),Me.enabled===!0&&Me.isPresenting===!0){const ve=L.xr.getDepthSensingMesh();ve!==null&&xs(ve,D,-1/0,L.sortObjects)}xs(S,D,0,L.sortObjects),y.finish(),L.sortObjects===!0&&y.sort(Pe,Le,D.reversedDepth),ct=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,ct&&De.addToRenderList(y,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ae.beginShadows();const z=v.state.shadowsArray;if(Re.render(z,S,D),Ke===!0&&Ae.endShadows(),(k&&A.hasRenderPass())===!1){const ve=y.opaque,fe=y.transmissive;if(v.setupLights(),D.isArrayCamera){const Se=D.cameras;if(fe.length>0)for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];Co(ve,fe,S,Fe)}ct&&De.render(S);for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];Ro(y,S,Fe,Fe.viewport)}}else fe.length>0&&Co(ve,fe,S,D),ct&&De.render(S),Ro(y,S,D)}j!==null&&H===0&&(W.updateMultisampleRenderTarget(j),W.updateRenderTargetMipmap(j)),k&&A.end(L),S.isScene===!0&&S.onAfterRender(L,S,D),me.resetDefaultState(),te=-1,he=null,_.pop(),_.length>0?(v=_[_.length-1],W.setTextureUnits(v.state.textureUnits),Ke===!0&&Ae.setGlobalState(L.clippingPlanes,v.state.camera)):v=null,E.pop(),E.length>0?y=E[E.length-1]:y=null,U!==null&&U.renderEnd()};function xs(S,D,V,k){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLightProbeGrid)v.pushLightProbeGrid(S);else if(S.isLight)v.pushLight(S),S.castShadow&&v.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||et.intersectsSprite(S)){k&&bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(gt);const ve=Z.update(S),fe=S.material;fe.visible&&y.push(S,ve,fe,V,bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||et.intersectsObject(S))){const ve=Z.update(S),fe=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),bt.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),bt.copy(ve.boundingSphere.center)),bt.applyMatrix4(S.matrixWorld).applyMatrix4(gt)),Array.isArray(fe)){const Se=ve.groups;for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee],Te=fe[Fe.materialIndex];Te&&Te.visible&&y.push(S,ve,Te,V,bt.z,Fe)}}else fe.visible&&y.push(S,ve,fe,V,bt.z,null)}}const pe=S.children;for(let ve=0,fe=pe.length;ve<fe;ve++)xs(pe[ve],D,V,k)}function Ro(S,D,V,k){const{opaque:z,transmissive:pe,transparent:ve}=S;v.setupLightsView(V),Ke===!0&&Ae.setGlobalState(L.clippingPlanes,V),k&&m.viewport(ge.copy(k)),z.length>0&&Mr(z,D,V),pe.length>0&&Mr(pe,D,V),ve.length>0&&Mr(ve,D,V),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function Co(S,D,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[k.id]===void 0){const Te=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[k.id]=new vn(1,1,{generateMipmaps:!0,type:Te?Pn:Yt,minFilter:ri,samples:Math.max(4,T.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}const pe=v.state.transmissionRenderTarget[k.id],ve=k.viewport||ge;pe.setSize(ve.z*L.transmissionResolutionScale,ve.w*L.transmissionResolutionScale);const fe=L.getRenderTarget(),Se=L.getActiveCubeFace(),Ee=L.getActiveMipmapLevel();L.setRenderTarget(pe),L.getClearColor(lt),Ye=L.getClearAlpha(),Ye<1&&L.setClearColor(16777215,.5),L.clear(),ct&&De.render(V);const Ue=L.toneMapping;L.toneMapping=_n;const Fe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),v.setupLightsView(k),Ke===!0&&Ae.setGlobalState(L.clippingPlanes,k),Mr(S,V,k),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let je=0,ft=D.length;je<ft;je++){const dt=D[je],{object:tt,geometry:Ct,material:_e,group:Wt}=dt;if(_e.side===An&&tt.layers.test(k.layers)){const Xe=_e.side;_e.side=Vt,_e.needsUpdate=!0,Po(tt,V,k,Ct,_e,Wt),_e.side=Xe,_e.needsUpdate=!0,Te=!0}}Te===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}L.setRenderTarget(fe,Se,Ee),L.setClearColor(lt,Ye),Fe!==void 0&&(k.viewport=Fe),L.toneMapping=Ue}function Mr(S,D,V){const k=D.isScene===!0?D.overrideMaterial:null;for(let z=0,pe=S.length;z<pe;z++){const ve=S[z],{object:fe,geometry:Se,group:Ee}=ve;let Ue=ve.material;Ue.allowOverride===!0&&k!==null&&(Ue=k),fe.layers.test(V.layers)&&Po(fe,D,V,Se,Ue,Ee)}}function Po(S,D,V,k,z,pe){S.onBeforeRender(L,D,V,k,z,pe),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(L,D,V,k,S,pe),z.transparent===!0&&z.side===An&&z.forceSinglePass===!1?(z.side=Vt,z.needsUpdate=!0,L.renderBufferDirect(V,D,k,z,S,pe),z.side=$n,z.needsUpdate=!0,L.renderBufferDirect(V,D,k,z,S,pe),z.side=An):L.renderBufferDirect(V,D,k,z,S,pe),S.onAfterRender(L,D,V,k,z,pe)}function Sr(S,D,V){D.isScene!==!0&&(D=Tt);const k=G.get(S),z=v.state.lights,pe=v.state.shadowsArray,ve=z.state.version,fe=oe.getParameters(S,z.state,pe,D,V,v.state.lightProbeGridArray),Se=oe.getProgramCacheKey(fe);let Ee=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Ue=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=ie.get(S.envMap||k.environment,Ue),k.envMapRotation=k.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Ee===void 0&&(S.addEventListener("dispose",cn),Ee=new Map,k.programs=Ee);let Fe=Ee.get(Se);if(Fe!==void 0){if(k.currentProgram===Fe&&k.lightsStateVersion===ve)return Lo(S,fe),Fe}else fe.uniforms=oe.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,V,fe),S.onBeforeCompile(fe,L),Fe=oe.acquireProgram(fe,Se),Ee.set(Se,Fe),k.uniforms=fe.uniforms;const Te=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),Lo(S,fe),k.needsLights=Gc(S),k.lightsStateVersion=ve,k.needsLights&&(Te.ambientLightColor.value=z.state.ambient,Te.lightProbe.value=z.state.probe,Te.directionalLights.value=z.state.directional,Te.directionalLightShadows.value=z.state.directionalShadow,Te.spotLights.value=z.state.spot,Te.spotLightShadows.value=z.state.spotShadow,Te.rectAreaLights.value=z.state.rectArea,Te.ltc_1.value=z.state.rectAreaLTC1,Te.ltc_2.value=z.state.rectAreaLTC2,Te.pointLights.value=z.state.point,Te.pointLightShadows.value=z.state.pointShadow,Te.hemisphereLights.value=z.state.hemi,Te.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Te.spotLightMatrix.value=z.state.spotLightMatrix,Te.spotLightMap.value=z.state.spotLightMap,Te.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=v.state.lightProbeGridArray.length>0,k.currentProgram=Fe,k.uniformsList=null,Fe}function Io(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=jr.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Lo(S,D){const V=G.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Bc(S,D){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(D.matrixWorld);for(let V=0,k=S.length;V<k;V++){const z=S[V];if(z.texture!==null&&z.boundingBox.containsPoint(M))return z}return null}function kc(S,D,V,k,z){D.isScene!==!0&&(D=Tt),W.resetTextureUnits();const pe=D.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,fe=j===null?L.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ze.workingColorSpace,Se=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ee=ie.get(k.envMap||ve,Se),Ue=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Fe=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!V.morphAttributes.position,je=!!V.morphAttributes.normal,ft=!!V.morphAttributes.color;let dt=_n;k.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(dt=L.toneMapping);const tt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ct=tt!==void 0?tt.length:0,_e=G.get(k),Wt=v.state.lights;if(Ke===!0&&(We===!0||S!==he)){const st=S===he&&k.id===te;Ae.setState(k,S,st)}let Xe=!1;k.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Wt.state.version||_e.outputColorSpace!==fe||z.isBatchedMesh&&_e.batching===!1||!z.isBatchedMesh&&_e.batching===!0||z.isBatchedMesh&&_e.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&_e.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&_e.instancing===!1||!z.isInstancedMesh&&_e.instancing===!0||z.isSkinnedMesh&&_e.skinning===!1||!z.isSkinnedMesh&&_e.skinning===!0||z.isInstancedMesh&&_e.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&_e.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&_e.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&_e.instancingMorph===!1&&z.morphTexture!==null||_e.envMap!==Ee||k.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==Ue||_e.vertexTangents!==Fe||_e.morphTargets!==Te||_e.morphNormals!==je||_e.morphColors!==ft||_e.toneMapping!==dt||_e.morphTargetsCount!==Ct||!!_e.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,_e.__version=k.version);let Kt=_e.currentProgram;Xe===!0&&(Kt=Sr(k,D,z),U&&k.isNodeMaterial&&U.onUpdateProgram(k,Kt,_e));let un=!1,Ln=!1,fi=!1;const nt=Kt.getUniforms(),pt=_e.uniforms;if(m.useProgram(Kt.program)&&(un=!0,Ln=!0,fi=!0),k.id!==te&&(te=k.id,Ln=!0),_e.needsLights){const st=Bc(v.state.lightProbeGridArray,z);_e.lightProbeGrid!==st&&(_e.lightProbeGrid=st,Ln=!0)}if(un||he!==S){m.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),nt.setValue(I,"projectionMatrix",S.projectionMatrix),nt.setValue(I,"viewMatrix",S.matrixWorldInverse);const Un=nt.map.cameraPosition;Un!==void 0&&Un.setValue(I,xt.setFromMatrixPosition(S.matrixWorld)),T.logarithmicDepthBuffer&&nt.setValue(I,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&nt.setValue(I,"isOrthographic",S.isOrthographicCamera===!0),he!==S&&(he=S,Ln=!0,fi=!0)}if(_e.needsLights&&(Wt.state.directionalShadowMap.length>0&&nt.setValue(I,"directionalShadowMap",Wt.state.directionalShadowMap,W),Wt.state.spotShadowMap.length>0&&nt.setValue(I,"spotShadowMap",Wt.state.spotShadowMap,W),Wt.state.pointShadowMap.length>0&&nt.setValue(I,"pointShadowMap",Wt.state.pointShadowMap,W)),z.isSkinnedMesh){nt.setOptional(I,z,"bindMatrix"),nt.setOptional(I,z,"bindMatrixInverse");const st=z.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),nt.setValue(I,"boneTexture",st.boneTexture,W))}z.isBatchedMesh&&(nt.setOptional(I,z,"batchingTexture"),nt.setValue(I,"batchingTexture",z._matricesTexture,W),nt.setOptional(I,z,"batchingIdTexture"),nt.setValue(I,"batchingIdTexture",z._indirectTexture,W),nt.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&nt.setValue(I,"batchingColorTexture",z._colorsTexture,W));const Dn=V.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&P.update(z,V,Kt),(Ln||_e.receiveShadow!==z.receiveShadow)&&(_e.receiveShadow=z.receiveShadow,nt.setValue(I,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(pt.envMapIntensity.value=D.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=y0()),Ln){if(nt.setValue(I,"toneMappingExposure",L.toneMappingExposure),_e.needsLights&&zc(pt,fi),pe&&k.fog===!0&&ye.refreshFogUniforms(pt,pe),ye.refreshMaterialUniforms(pt,k,ne,se,v.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){const st=_e.lightProbeGrid;pt.probesSH.value=st.texture,pt.probesMin.value.copy(st.boundingBox.min),pt.probesMax.value.copy(st.boundingBox.max),pt.probesResolution.value.copy(st.resolution)}jr.upload(I,Io(_e),pt,W)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(jr.upload(I,Io(_e),pt,W),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&nt.setValue(I,"center",z.center),nt.setValue(I,"modelViewMatrix",z.modelViewMatrix),nt.setValue(I,"normalMatrix",z.normalMatrix),nt.setValue(I,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const st=k.uniformsGroups;for(let Un=0,pi=st.length;Un<pi;Un++){const Do=st[Un];ee.update(Do,Kt),ee.bind(Do,Kt)}}return Kt}function zc(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Gc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(S,D,V){const k=G.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),G.get(S.texture).__webglTexture=D,G.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:V,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const V=G.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){j=S,Y=D,H=V;let k=null,z=!1,pe=!1;if(S){const fe=G.get(S);if(fe.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(I.FRAMEBUFFER,fe.__webglFramebuffer),ge.copy(S.viewport),xe.copy(S.scissor),qe=S.scissorTest,m.viewport(ge),m.scissor(xe),m.setScissorTest(qe),te=-1;return}else if(fe.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(fe.__hasExternalTextures)W.rebindTextures(S,G.get(S.texture).__webglTexture,G.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ue=S.depthTexture;if(fe.__boundDepthTexture!==Ue){if(Ue!==null&&G.has(Ue)&&(S.width!==Ue.image.width||S.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}const Se=S.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);const Ee=G.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ee[D])?k=Ee[D][V]:k=Ee[D],z=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?k=G.get(S).__webglMultisampledFramebuffer:Array.isArray(Ee)?k=Ee[V]:k=Ee,ge.copy(S.viewport),xe.copy(S.scissor),qe=S.scissorTest}else ge.copy(we).multiplyScalar(ne).floor(),xe.copy(ht).multiplyScalar(ne).floor(),qe=Be;if(V!==0&&(k=$),m.bindFramebuffer(I.FRAMEBUFFER,k)&&m.drawBuffers(S,k),m.viewport(ge),m.scissor(xe),m.setScissorTest(qe),z){const fe=G.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,fe.__webglTexture,V)}else if(pe){const fe=D;for(let Se=0;Se<S.textures.length;Se++){const Ee=G.get(S.textures[Se]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,V,fe)}}else if(S!==null&&V!==0){const fe=G.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,V)}te=-1},this.readRenderTargetPixels=function(S,D,V,k,z,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=G.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){m.bindFramebuffer(I.FRAMEBUFFER,Se);try{const Ee=S.textures[fe],Ue=Ee.format,Fe=Ee.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),!T.textureFormatReadable(Ue)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Fe)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-k&&V>=0&&V<=S.height-z&&I.readPixels(D,V,k,z,ce.convert(Ue),ce.convert(Fe),pe)}finally{const Ee=j!==null?G.get(j).__webglFramebuffer:null;m.bindFramebuffer(I.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,k,z,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=G.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(D>=0&&D<=S.width-k&&V>=0&&V<=S.height-z){m.bindFramebuffer(I.FRAMEBUFFER,Se);const Ee=S.textures[fe],Ue=Ee.format,Fe=Ee.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),!T.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,pe.byteLength,I.STREAM_READ),I.readPixels(D,V,k,z,ce.convert(Ue),ce.convert(Fe),0);const je=j!==null?G.get(j).__webglFramebuffer:null;m.bindFramebuffer(I.FRAMEBUFFER,je);const ft=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Gu(I,ft,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,pe),I.deleteBuffer(Te),I.deleteSync(ft),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,V=0){const k=Math.pow(2,-V),z=Math.floor(S.image.width*k),pe=Math.floor(S.image.height*k),ve=D!==null?D.x:0,fe=D!==null?D.y:0;W.setTexture2D(S,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,ve,fe,z,pe),m.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,k=null,z=0,pe=0){let ve,fe,Se,Ee,Ue,Fe,Te,je,ft;const dt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(V!==null)ve=V.max.x-V.min.x,fe=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Ee=V.min.x,Ue=V.min.y,Fe=V.isBox3?V.min.z:0;else{const pt=Math.pow(2,-z);ve=Math.floor(dt.width*pt),fe=Math.floor(dt.height*pt),S.isDataArrayTexture?Se=dt.depth:S.isData3DTexture?Se=Math.floor(dt.depth*pt):Se=1,Ee=0,Ue=0,Fe=0}k!==null?(Te=k.x,je=k.y,ft=k.z):(Te=0,je=0,ft=0);const tt=ce.convert(D.format),Ct=ce.convert(D.type);let _e;D.isData3DTexture?(W.setTexture3D(D,0),_e=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(W.setTexture2DArray(D,0),_e=I.TEXTURE_2D_ARRAY):(W.setTexture2D(D,0),_e=I.TEXTURE_2D),m.activeTexture(I.TEXTURE0),m.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),m.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),m.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);const Wt=m.getParameter(I.UNPACK_ROW_LENGTH),Xe=m.getParameter(I.UNPACK_IMAGE_HEIGHT),Kt=m.getParameter(I.UNPACK_SKIP_PIXELS),un=m.getParameter(I.UNPACK_SKIP_ROWS),Ln=m.getParameter(I.UNPACK_SKIP_IMAGES);m.pixelStorei(I.UNPACK_ROW_LENGTH,dt.width),m.pixelStorei(I.UNPACK_IMAGE_HEIGHT,dt.height),m.pixelStorei(I.UNPACK_SKIP_PIXELS,Ee),m.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),m.pixelStorei(I.UNPACK_SKIP_IMAGES,Fe);const fi=S.isDataArrayTexture||S.isData3DTexture,nt=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const pt=G.get(S),Dn=G.get(D),st=G.get(pt.__renderTarget),Un=G.get(Dn.__renderTarget);m.bindFramebuffer(I.READ_FRAMEBUFFER,st.__webglFramebuffer),m.bindFramebuffer(I.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let pi=0;pi<Se;pi++)fi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(S).__webglTexture,z,Fe+pi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(D).__webglTexture,pe,ft+pi)),I.blitFramebuffer(Ee,Ue,ve,fe,Te,je,ve,fe,I.DEPTH_BUFFER_BIT,I.NEAREST);m.bindFramebuffer(I.READ_FRAMEBUFFER,null),m.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||S.isRenderTargetTexture||G.has(S)){const pt=G.get(S),Dn=G.get(D);m.bindFramebuffer(I.READ_FRAMEBUFFER,J),m.bindFramebuffer(I.DRAW_FRAMEBUFFER,B);for(let st=0;st<Se;st++)fi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,pt.__webglTexture,z,Fe+st):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,pt.__webglTexture,z),nt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Dn.__webglTexture,pe,ft+st):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Dn.__webglTexture,pe),z!==0?I.blitFramebuffer(Ee,Ue,ve,fe,Te,je,ve,fe,I.COLOR_BUFFER_BIT,I.NEAREST):nt?I.copyTexSubImage3D(_e,pe,Te,je,ft+st,Ee,Ue,ve,fe):I.copyTexSubImage2D(_e,pe,Te,je,Ee,Ue,ve,fe);m.bindFramebuffer(I.READ_FRAMEBUFFER,null),m.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else nt?S.isDataTexture||S.isData3DTexture?I.texSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,tt,Ct,dt.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,tt,dt.data):I.texSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,tt,Ct,dt):S.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,pe,Te,je,ve,fe,tt,Ct,dt.data):S.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,pe,Te,je,dt.width,dt.height,tt,dt.data):I.texSubImage2D(I.TEXTURE_2D,pe,Te,je,ve,fe,tt,Ct,dt);m.pixelStorei(I.UNPACK_ROW_LENGTH,Wt),m.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Xe),m.pixelStorei(I.UNPACK_SKIP_PIXELS,Kt),m.pixelStorei(I.UNPACK_SKIP_ROWS,un),m.pixelStorei(I.UNPACK_SKIP_IMAGES,Ln),pe===0&&D.generateMipmaps&&I.generateMipmap(_e),m.unbindTexture()},this.initRenderTarget=function(S){G.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),m.unbindTexture()},this.resetState=function(){Y=0,H=0,j=null,m.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}}function bo(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new Mo(t,128,128);return i.wrapS=i.wrapT=ts,i.colorSpace=Ht,i.needsUpdate=!0,i}const ja=bo("wood"),Dc=bo("stone"),or=bo("cloth"),N={stone:new mt({color:Nn.materials.stone,map:Dc,roughness:.72}),wall:new mt({color:Nn.materials.wall,roughness:.88}),wood:new mt({color:Nn.materials.wood,map:ja,roughness:.52}),walnut:new mt({color:Nn.materials.darkWood,map:ja,roughness:.5}),gold:new mt({color:Nn.materials.metal,metalness:.7,roughness:.36}),navy:new mt({color:Nn.materials.blue,roughness:.65}),white:new mt({color:Nn.materials.linen,map:or,roughness:.93}),teal:new mt({color:Nn.materials.accent,map:or,roughness:.83}),rust:new mt({color:9920067,map:or,roughness:.84}),carpet:new mt({color:6845561,map:or,roughness:1}),black:new mt({color:1449508,roughness:.6}),green:new mt({color:3495746,roughness:.86}),leaf:new mt({color:6651984,roughness:.8}),glass:new mt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new mt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new mt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new mt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new mt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new mt({color:14000506,roughness:.9}),hair:new mt({color:2433314,roughness:.9}),ao:new vr({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},eo=new Map;function T0(n){let e=eo.get(n);return e||(e=new mt({color:n,roughness:.75}),eo.set(n,e)),e}function A0(){Object.values(N).forEach(n=>n.dispose()),eo.forEach(n=>n.dispose()),[ja,Dc,or].forEach(n=>n.dispose())}const xr={box:new $i(1,1,1),cylinder:new ds(1,1,1,12),sphere:new os(1,12,8),leaf:new os(1,8,6),cone:new hs(1,1,16),plane:new qi(1,1)};function q(n,e,t,i,r,s,a,o=N.wood){const l=new Et(xr.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Qe(n,e,t,i,r,s,a=N.gold){const o=new Et(xr.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Ui(n,e,t,i,r,s,a,o=N.leaf){const l=new Et(xr.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function gs(n,e,t,i,r,s=.022){const a=new Et(xr.plane,N.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function qt(n,e,t,i=1,r=0){const s=new Dt;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),Qe(s,0,.21,0,.21,.42,N.stone),Qe(s,0,.76,0,.027,1.1,N.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Ui(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?N.leaf:N.green).rotation.set(.3,o,Math.sin(o)*.65)}return gs(s,0,0,.7,.55),s}function ur(n,e,t,i,r=1){const s=new Dt;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),Qe(s,0,.035,0,.11,.045,N.gold),Qe(s,0,.21,0,.019,.36,N.gold),Qe(s,0,.42,0,.16,.22,N.shade),Qe(s,0,.315,0,.135,.015,N.glow),s}function ai(n,e,t,i=0,r=N.teal){const s=new Dt;s.position.set(e,0,t),s.rotation.y=i,n.add(s),q(s,0,.43,0,.55,.14,.56,r),q(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])Qe(s,a*.2,.2,o*.2,.025,.4,N.walnut);return s}function lr(n,e,t,i=0,r=1.5,s=N.teal){const a=new Dt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),q(a,0,.32,0,r,.42,.64,s),q(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])q(a,o*(r/2-.08),.56,0,.16,.4,.7,s),q(a,o*r*.23,.55,-.17,.35,.28,.11,N.white);return q(a,0,.58,.04,r-.3,.11,.44,s),gs(a,0,0,r+.15,.95),a}function ii(n,e,t,i=.42){Qe(n,e,.37,t,.055,.74,N.gold),Qe(n,e,.75,t,i,.07,N.stone),Qe(n,e,.04,t,i*.5,.06,N.walnut)}function ls(n,e,t,i){Qe(n,e,t,i,.07,.13,N.white),Qe(n,e,t-.065,i,.12,.018,N.white)}function zl(n,e,t,i,r=1.15,s=.65,a=0){q(n,e,t,i,r+.07,s+.07,.06,N.gold),q(n,e,t,i+.04,r,s,.015,N.white),q(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?N.teal:N.window),q(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,N.stone),Ui(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,N.rust)}function w0(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Et)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new vc(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function R0(n){const e=new Dt;e.name=n.id,e.userData.entityId=n.id,q(e,0,.04,0,4.7,.08,3.1,N.wood),q(e,0,1.19,-1.51,4.7,2.38,.14,N.wall),q(e,2.35,1.14,-.1,.1,2.28,2.75,N.stone),q(e,1.6,1.25,-1.41,1.05,1.9,.035,N.window);for(const s of[1.1,1.6,2.1])q(e,s,1.25,-1.35,.035,1.94,.04,N.gold);q(e,1.6,1.25,-1.35,1.08,.04,.04,N.gold);for(let s=1.03;s<1.26;s+=.06)q(e,s,1.28,-1.23,.04,1.94,.13,N.white);if(q(e,0,2.27,-1.27,4.53,.06,.065,N.glow),n.status==="unbuilt"){for(const s of[-1.3,0,1.3])q(e,s,.28,.1,.75,.5,.8,N.stone);return e}const t=n.type==="suite",i=n.type==="twin";q(e,-.67,.078,.07,2.85,.02,2.66,N.carpet);const r=(s,a)=>{q(e,s,.28,-.03,a+.09,.39,1.9,N.walnut),q(e,s,.51,.02,a,.23,1.85,n.status==="dirty"?N.stone:N.white),q(e,s,.7,-.98,a+.13,1.22,.12,N.walnut),q(e,s,.82,-.89,a-.05,.63,.08,N.teal),q(e,s,.67,-.58,a*.82,.13,.36,N.white),q(e,s,.646,.54,a,.075,.39,t?N.rust:N.teal),q(e,s,.49,1,a,.28,.04,N.white),gs(e,s,0,a+.25,2.25)};i?(r(-1.36,.88),r(-.22,.88)):r(-.75,1.68);for(const s of[-1.94,.43])q(e,s,.35,-.76,.41,.58,.5,N.walnut),q(e,s,.66,-.76,.45,.06,.53,N.stone),ur(e,s,.69,-.77,.8);if(zl(e,-.75,1.79,-1.39,1.25,.54,Number(n.number)),t)lr(e,1.55,.22,-Math.PI/2,1.3,N.rust),ii(e,.97,.8,.25);else{q(e,1.61,.76,-.57,1.1,.1,.57,N.walnut);for(const s of[1.19,2.03])q(e,s,.37,-.57,.05,.75,.46,N.gold);q(e,1.59,.94,-.64,.35,.28,.04,N.screen),ai(e,1.65,.06,Math.PI),ur(e,2,.82,-.62,.66)}if(qt(e,2.05,1.05,.63),(n.level??1)>1&&(zl(e,-2.05,1.6,-1.38,.38,.56,n.level),qt(e,-2.05,.35,.55)),(n.level??1)>2&&q(e,0,2.12,-1.3,4.55,.035,.055,N.gold),q(e,-2.12,.52,.95,.22,1,.28,N.walnut),n.status==="reserved"&&q(e,1.2,.48,1.48,.25,.29,.1,N.gold),n.status==="cleaning"){q(e,1.05,.37,1.57,.55,.55,.35,N.navy);for(const s of[.83,1.27])Qe(e,s,.09,1.57,.07,.07,N.black);q(e,1.05,.71,1.57,.6,.04,.41,N.gold),q(e,.95,.79,1.57,.3,.12,.22,N.white)}return n.status==="maintenance"&&(q(e,.6,.33,.9,.8,.1,.8,N.rust),q(e,.6,.52,.9,.1,.6,.1,N.gold)),e}function ea(n,e,t,i=2.12){Qe(n,e,i+.13,t,.012,.45,N.gold),Qe(n,e,i-.08,t,.24,.18,N.gold),Qe(n,e,i-.18,t,.21,.015,N.glow)}function C0(n,e){if(q(n,0,1.2,-1.54,14.65,2.4,.14,N.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)q(n,t,1.2,-1.42,.035,2.38,.08,N.gold);else for(let t=-7;t<7;t+=.58)q(n,t,1.2,-1.43,.022,2.2,.04,N.wood)}function Pi(n,e,t){q(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,N.window);for(let i=e;i<=t+.01;i+=.72)q(n,i,1.23,-1.32,.045,2.17,.06,N.gold);q(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,N.gold)}function P0(n,e,t){ii(n,e,t,.44),ai(n,e-.63,t,Math.PI/2),ai(n,e+.63,t,-Math.PI/2),ls(n,e-.18,.87,t),ls(n,e+.18,.87,t),Qe(n,e,.83,t,.065,.12,N.gold)}function Gl(n,e,t){q(n,e,1.23,-1.35,t,1.86,.18,N.walnut);for(let i=.53;i<2;i+=.39){q(n,e,i,-1.14,t,.04,.42,N.gold),q(n,e,i+.035,-1.18,t-.1,.025,.05,N.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;Qe(n,s,i+.13,-1.08,.048,.23,r%3?N.green:N.rust),Qe(n,s,i+.27,-1.08,.019,.07,N.gold)}}}function I0(n){const e=new Dt;if(n!=="rooftop"&&(C0(e,n),q(e,0,.04,0,14.66,.08,3.15,n==="lobby"?N.stone:N.wood),q(e,0,2.31,-1.21,14.5,.04,.07,N.glow)),n==="lobby"){Pi(e,4.3,7.2),q(e,0,1.35,-1.33,6.7,1.8,.11,N.stone),q(e,0,.48,.5,6.2,.84,.62,N.walnut),q(e,0,.94,.5,6.45,.12,.83,N.stone),q(e,0,.15,.86,6.08,.075,.035,N.glow);for(let t=-2.9;t<3;t+=.18)q(e,t,.5,.824,.035,.6,.025,N.gold);for(const t of[-1.8,1.7])q(e,t,1.12,.2,.42,.29,.045,N.screen),ur(e,t+.55,1.02,.46,.72);qt(e,-3.9,-.7,1.72),qt(e,4,-.55,1.6),lr(e,-5.75,.08,Math.PI/2,1.65,N.white),ii(e,-5.02,1,.47),qt(e,-6.4,1.4,.55),q(e,5.8,.045,1.18,2.2,.03,1.25,N.navy);for(const t of[4.65,6.95])q(e,t,1.13,.85,.08,2.28,.08,N.gold),q(e,t,1.17,.79,.65,2.18,.025,N.glass);q(e,5.8,2.18,1.24,2.6,.16,1.72,N.navy),q(e,5.8,2.08,2.03,2.55,.035,.04,N.gold);for(const t of[3.5,4.1])Qe(e,t,.67,1.8,.025,1.15,N.gold),Qe(e,t,.09,1.8,.08,.1,N.black);q(e,3.8,1.27,1.8,.65,.035,.04,N.gold),q(e,3.8,.18,1.8,.78,.08,.51,N.gold),q(e,3.76,.43,1.8,.37,.45,.25,N.rust);for(const t of[-2.8,0,2.8])ea(e,t,.1,2.02)}else if(n==="breakfast"){Pi(e,4.3,7.2),Gl(e,0,4.5),q(e,0,.52,-.15,5,.9,.8,N.walnut),q(e,0,1.01,-.15,5.2,.12,.97,N.stone);for(const t of[-1.7,-.7,.3])q(e,t,1.14,-.17,.66,.14,.45,N.gold),q(e,t,1.24,-.17,.6,.08,.38,N.white);q(e,1.5,1.29,-.24,.43,.53,.38,N.black),Qe(e,2.1,1.28,-.2,.15,.4,N.glass),Qe(e,2.1,1.13,-.2,.145,.09,N.rust);for(const t of[-5.55,-3.4,3.8,6])P0(e,t,.68);for(const t of[-5.55,-3.4,0,3.8,6])ea(e,t,.5);qt(e,-6.9,-.87,1.1),qt(e,6.8,-.8,1.1)}else if(n==="club"){Pi(e,-7.2,-3.8),Pi(e,3.8,7.2),Gl(e,0,5.4),q(e,0,.58,-.24,5.55,1.02,.58,N.walnut),q(e,0,1.12,-.24,5.8,.11,.79,N.stone),q(e,0,.25,.071,5.5,.05,.035,N.glow);for(const t of[-1.8,-.6,.6,1.8])Qe(e,t,.6,.6,.24,.12,N.teal),Qe(e,t,.28,.6,.035,.58,N.gold),ls(e,t,1.24,-.15),ea(e,t,-.24);lr(e,-5.6,-.54,0,2.05,N.teal),ii(e,-5.6,.57,.5),ai(e,-4.38,.75,-Math.PI/3,N.rust),lr(e,5.25,-.54,0,2.1,N.rust),ii(e,5.25,.6,.52),ai(e,6.52,.7,-Math.PI/3,N.teal),qt(e,-6.9,.68,1.2),qt(e,6.9,-.8,1.25),ur(e,-4.15,.05,-.8,1.6)}else if(n==="gym"){Pi(e,-7.2,7.2),q(e,0,.093,0,14.4,.025,2.9,N.carpet);for(const t of[-5.65,-3.8,-1.95]){q(e,t,.16,.15,.92,.21,1.72,N.black),q(e,t,.28,.17,.68,.015,1.42,N.carpet);for(const i of[-1,1])q(e,t+i*.42,.7,-.51,.075,1.1,.08,N.black),q(e,t+i*.42,1.13,-.2,.06,.06,.75,N.black);q(e,t,1.26,-.5,.85,.23,.14,N.black),q(e,t,1.3,-.409,.43,.12,.012,N.screen)}for(const t of[.1,1.65]){const i=Qe(e,t,.41,.1,.36,.12,N.black);i.rotation.z=Math.PI/2,q(e,t,.39,.2,.07,.69,.09,N.gold),q(e,t,.81,.47,.37,.09,.24,N.black),q(e,t,1.05,-.32,.07,.55,.07,N.black),q(e,t,1.27,-.32,.5,.06,.07,N.gold)}q(e,5.45,.68,-.8,2.8,.07,.58,N.black);for(let t=4.2;t<6.8;t+=.46)Qe(e,t,.82,-.8,.13,.16,N.black);for(const t of[3.65,5.2])q(e,t,.12,.61,1.08,.025,1.68,N.teal);qt(e,6.93,.82,1.2),q(e,2.76,.4,-.87,.6,.7,.53,N.walnut);for(let t=0;t<3;t++)q(e,2.76,.79+t*.065,-.87,.46,.065,.4,N.white)}else if(n==="spa"){Pi(e,-7.2,7.2);for(const t of[-4.8,0,4.8]){q(e,t,.4,0,1.7,.6,2.05,N.walnut),q(e,t,.76,0,1.8,.14,2.1,N.white),q(e,t,.87,-.6,1.15,.12,.45,N.white),q(e,t,.86,.4,1.8,.03,.7,N.teal),qt(e,t+1.2,-.9,1.1),ur(e,t-1.2,.05,-.9,1.4);for(let i=0;i<3;i++)q(e,t+1.2,.15+i*.06,.75,.5,.06,.32,N.white)}}else{q(e,0,.03,0,15,.14,3.6,N.wood);for(let t=-7.3;t<7.4;t+=.24)q(e,t,.11,0,.017,.006,3.45,N.walnut);for(const t of[-6.65,-2.45,2.8,6.9])qt(e,t,-.8,1.45);for(const t of[-4.4,3.5]){ii(e,t,.45,.66),ai(e,t-.9,.4,Math.PI/2,N.white),ai(e,t+.9,.4,-Math.PI/2,N.white),ls(e,t+.2,.88,.45),Qe(e,t,1.07,.45,.026,2.05,N.gold);const i=new Et(new hs(1.55,.32,8),N.white);i.position.set(t,2.04,.45),i.rotation.y=Math.PI/8,i.castShadow=!0,e.add(i)}lr(e,-.5,-.7,0,1.7,N.teal),ii(e,-.5,.45,.38);for(const t of[-7.35,7.35])q(e,t,.43,0,.055,.8,3.5,N.gold);for(let t=-7.3;t<=7.3;t+=1.46)Qe(e,t,.43,1.7,.018,.8,N.gold);q(e,0,.8,1.7,14.7,.035,.035,N.gold),q(e,0,.46,1.7,14.7,.65,.014,N.glass)}return e}function L0(n){const e=new Dt,t=T0(n),i=a=>{const o=new Dt;return o.position.set(a,.31,0),e.add(o),q(o,0,-.11,0,.085,.26,.1,N.navy),q(o,0,-.245,.035,.11,.07,.17,N.black),o},r=i(-.08),s=i(.08);q(e,0,.47,0,.27,.34,.17,t),q(e,0,.58,.093,.07,.13,.012,N.white),q(e,0,.55,.108,.018,.095,.016,N.navy),Ui(e,0,.81,0,.185,.21,.16,N.skin),Ui(e,0,.94,-.024,.193,.102,.163,N.hair);for(const a of[-.069,.069])Ui(e,a,.84,.149,.021,.024,.01,N.black),q(e,a,.856,.156,.09,.066,.012,N.navy);for(const a of[-1,1]){const o=q(e,a*.18,.45,0,.075,.26,.085,t);o.rotation.z=a*.15,Ui(e,a*.19,.303,.012,.047,.05,.045,N.skin)}return gs(e,0,0,.47,.3),{group:e,left:r,right:s}}function D0(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),d=o.points[c],p=o.points[Math.min(c+1,o.points.length-1)],u=n.group.position.clone();n.group.position.lerpVectors(d,p,l-c);const x=n.group.position.x-u.x,g=n.group.position.z-u.z,b=Math.hypot(x,g)>1e-4;b&&(n.group.rotation.y=Math.atan2(x,g));const f=b?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=f,n.right.rotation.x=-f;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Hl(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*Di;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?su[o]:0;e.push({id:a,floorId:i.id,position:new O(c,s,0),label:new O(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*Di+3.6}}function U0(n,e,t){const i=new Et(new qi(e,t),new vr({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function N0(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class F0{constructor(e,t){this.host=e,this.store=t,this.layout=Hl(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new E0({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Jl,this.renderer.outputColorSpace=Ht,this.renderer.toneMapping=oo,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new id;root=new Dt;camera=new fs;light=new Ed(16768942,3.1);ambient=new Sd(12638184,10651490,2.15);raycaster=new wd;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Dt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;visualKey="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;q(this.root,a,o/2-1,l,1.5,o,1.7,N.navy);for(let c=.4;c<o-1;c+=.55)for(let d=-.45;d<.6;d+=.45)(s+Math.round(c*10)+Math.round(d*10))%3!==0&&q(this.root,a+d,c,l+.87,.14,.24,.015,s%3===0?N.shade:N.window)}q(this.root,0,-.32,0,30,.35,15,N.navy),q(this.root,0,-.13,.7,17.6,.16,5.3,N.stone),q(this.root,0,-.06,2.95,17,.09,.55,N.stone);for(const s of[-8.1,8.4])qt(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new Dt;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){q(o,0,-.085,0,15.05,.19,3.48,N.stone),q(o,0,-.12,1.77,15.2,.17,.19,N.navy),q(o,0,-.011,1.85,15.1,.025,.02,N.gold),q(o,0,2.405,-.02,15.05,.18,3.4,N.stone);for(const c of[-7.43,7.43])q(o,c,1.19,.18,.18,2.38,3.12,N.stone);q(o,7.94,1.19,-.24,.87,2.38,2.1,N.window);for(const c of[7.52,8.35])q(o,c,1.2,.84,.045,2.4,.06,N.gold);q(o,7.94,-.075,.1,.95,.19,2.85,N.navy),q(o,7.94,1.2,.87,.83,.025,.035,N.gold)}s.entityIds.forEach(c=>{const d=e.entities[c],p=this.layout.entities.find(g=>g.id===c),u=d.kind==="room"?R0(d):I0(d.role);u.name=c,u.userData.entityId=c,u.position.x=p.position.x,o.add(u);const x=U0(c,d.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(u.add(x),this.colliders.push(x),d.kind==="room"){const g=document.createElement("button");g.className="room-label status-"+d.status,g.textContent=d.number,g.dataset.entityId=c,g.setAttribute("aria-label",d.number+" 房间"),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}else{const g=document.createElement("button");g.className="facility-label",g.dataset.entityId=c,g.textContent=d.name,g.setAttribute("aria-label","查看"+d.name),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),w0(this.root);const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new vr({color:16766861,transparent:!0,opacity:.9,depthTest:!1});q(this.halo,0,0,0,4.7,.025,.025,r),q(this.halo,0,2.31,0,4.7,.025,.025,r),q(this.halo,-2.35,1.15,0,.025,2.31,.025,r),q(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new ke((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=N0(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new O(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new O(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new O(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(a=>{a instanceof vc&&a.dispose()}),this.scene.remove(this.root),this.colliders.forEach(a=>{a.geometry.dispose(),a.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Dt,this.scene.add(this.root);const r=[...this.layout.floorY.keys()],s=a=>{const o=Math.floor((a.y-.07)/Di+1e-5),l=r[o],c=e.floors.findIndex(d=>d.id===l);c>=0&&(a.y+=(c-o)*Di)};this.actors.forEach(a=>{s(a.group.position),a.navigation?.points.forEach(s)}),this.layout=Hl(e),this.build(),this.bubbles.forEach(a=>this.overlay.append(a.el)),this.resize()}this.syncGuests(e),this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(r=>{const s=r.dataset.entityId===e.selectedId;r.classList.toggle("selected",s),r.setAttribute("aria-pressed",String(s))});const i=this.layout.entities.find(r=>r.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!i,i){const r=e.entities[i.id];this.halo.scale.x=r.kind==="room"?1:3.1,this.halo.position.set(i.position.x,i.position.y,2.05)}}key(e){return e.floors.map(t=>t.id).join(",")+"|"+Object.values(e.entities).filter(t=>t.kind==="room").map(t=>t.kind==="room"?t.status+":"+t.level:"").join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...L0(t.color),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*Di+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new O(o.x,o.level*Di+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=(t.persona?oi[t.persona].name+"：":"")+t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;this.actors.forEach(r=>D0(r,i?0:this.time,t)),e-this.lastPaint>90&&(this.lastPaint=e,this.bubbles.forEach(({el:r,actor:s,index:a})=>{const o=!!s.thought&&(Math.floor(this.time/5)+a)%5===0;r.style.display=o?"block":"none",o&&this.position(r,s.group.position.clone().add(new O(-.6,1.25,0)))})),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(xr).forEach(e=>e.dispose()),A0(),this.overlay.remove()}}const yo="jinwanyoutao_v8_game_1";function O0(){try{const n=localStorage.getItem(yo);if(!n)return ra();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return Wi(e),e.guests.forEach(t=>cs(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=ra();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function Uc(n){try{return localStorage.setItem(yo,JSON.stringify(n)),!0}catch{return!1}}const Yn=ru(O0()),rr=ou(document.querySelector("#app"),Yn);let to=!1,no=Yn.getState().game.notice.startsWith("存档读取失败");const Eo=()=>{!to&&!no&&!Uc(Yn.getState())&&(no=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&Yn.advance(4*Yn.getState().speed)},1e3);setInterval(Eo,5e3);document.addEventListener("visibilitychange",Eo);window.addEventListener("pagehide",Eo);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){to=!0;try{localStorage.removeItem(yo),Yn.reset(),no=!1,Uc(Yn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{to=!1}}});function _s(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}_s();window.visualViewport?.addEventListener("resize",_s);window.visualViewport?.addEventListener("scroll",_s);window.addEventListener("resize",_s);try{const n=new F0(rr.stage,Yn);rr.setFocusHandler(e=>n.focusFloor(e)),rr.stage.addEventListener("world-error",e=>rr.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),rr.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
