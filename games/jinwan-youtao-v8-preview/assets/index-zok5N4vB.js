(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function jl(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,d,f)=>{const u="floor-"+l,x="facility-"+l;e.push({id:u,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[x]}),t[x]={id:x,kind:"facility",floorId:u,role:l,name:c,capacity:d,usage:f,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const d=String(o*100+c+1),f="room-"+d,u=r[((o-2)*3+c)%r.length];l.entityIds.push(f),t[f]={id:f,kind:"room",floorId:l.id,number:d,type:c===2?"suite":c===1?"twin":"king",status:u,nightsLeft:u==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,d,f,u,x],g)=>s.push({id:"public-"+g,name:x?"当班员工":"住客",tier:x?"Staff":"Member",floorId:"floor-"+o,thought:u,color:f,route:[l,c],z:d,staff:!!x}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const gr=n=>n.lateHour??(n.tier==="Globalist"?16:14),Kn=n=>gr(n)===16?"4PM":"2PM",Hi=n=>gr(n)===16?14:12,ec=n=>n.late==="honor"?gr(n)*60:n.late==="deny"||n.late==="pending"?Hi(n)*60:660;function eu(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const $n=(n,e,t=!1)=>Math.round(n*(e.type==="suite"&&!t?1.45:1)*(1+((e.level??1)-1)*.1)),tc=n=>2500*n,cr=n=>n?Math.max(8,24-n*5):30,la=n=>n?Math.max(10,35-n*7):40,ca=n=>Math.max(140,260-n*20),ua=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),po={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Rr=2.12,Cr=7.94,an=n=>n.game.day*1440+n.game.minute;function mo(n,e){if(e.staff||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:an(n)+20+Mr(e.id)%75,trail:[],revision:0}}function Mr(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function Oi(n,e,t){mo(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(u=>u.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Mr(e.id+t)%12*.95,c=s?2.8:1.25,d=[],f=(u,x,g,S)=>d.push({x:u,z:x,level:g,phase:S});return f(o.x,Rr,o.level,"corridor"),Math.abs(a-o.level)>.001&&(f(Cr,Rr,o.level,"corridor"),f(Cr,.9,o.level,"elevator"),f(Cr,.9,a,"elevator"),f(Cr,Rr,a,"corridor")),f(l,Rr,a,"corridor"),f(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=d,i.destination=t,i.arrived=!1,i.nextDecision=an(n)+60,e.visitUntil=void 0,!0}function tu(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const d=c/l;r.x+=s*d,r.z+=a*d,r.level+=o/2.55*d}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=an(n)+45+Mr(e.id+an(n))%65,!0)}function nu(n){for(const e of n.guests)mo(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function iu(n){n.movement&&n.movement.trail.push({...n.movement.position})}function Xo(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const nc=n=>n.name+":"+n.persona;function Cn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=an(n)+35,e.speech.next=0,pr(n,e)}function pr(n,e){if(e.staff)return;const t=an(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(g=>g.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[r?.position.phase,a,s,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",d=Object.values(n.entities).filter(g=>g.kind==="room"&&g.type==="suite"&&g.status==="available").length;let f=[];if(o==="checkout"&&e.departing)f=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)f=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")f=[e.roomId?d?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")f=[Kn(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")f=["协商到 "+Hi(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)f=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(a)f=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)f=["该出发了，最后检查一下行李。"];else if(!e.roomId)f=[po[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")f=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(f=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const g=e.experience,S=g?.place==="facility-"+s&&t-g.at<150;S&&g.kind==="shortage"?f=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:S&&g.kind==="served"?f=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:f=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&f.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Kn(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&d>0&&["hunter","forum"].includes(c)&&f.push(`App 上还有 ${d} 间套，先问问 Front Office。`);const g=n.game.guestMemory?.[nc(e)];s==="guest"&&g?.visits&&f.push(g.satisfaction<80?"上次住得不太顺，这次再看看。":g.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const u=n.game.dialogueRecent??={};for(const[g,S]of Object.entries(u))t-S>240&&delete u[g];const x=f.filter(g=>!i.recent.some(S=>S.text===g&&t-S.at<180)&&t-(u[g]??-9999)>25);if(x.length){const g=x[Mr(e.id+t)%x.length];e.thought=g,i.recent.push({text:g,at:t}),i.recent=i.recent.slice(-8),u[g]=t}else e.thought="";i.next=t+45}function ms(n,e){e.staff||(e.persona??=Object.keys(po)[Mr(e.id)%11],mo(n,e))}function ic(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function ru(n,e){const t=n.game.minute,i=t/60,r=po[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility")continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=ic(n,a.id);o*=Math.max(0,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function su(n,e,t,i){if(e.lastVisit=t.id,ic(n,t.id)>t.capacity){e.experience={place:t.id,kind:"full",at:an(n)},Cn(n,e,"full"),Oi(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock";if(r&&n.game[s]<=0){e.experience={place:t.id,kind:"shortage",at:an(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),Cn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id);return}e.experience={place:t.id,kind:"served",at:an(n)},r&&n.game[s]--;const a=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,o=Math.round(a*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1));o&&(i.income(o),i.progress("ancillary",o)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,pr(n,e)}function da(n,e){e.departing=!0,e.movement?.steps.length||Oi(n,e,"exit")}function au(n,e,t,i){ms(n,e);const r=e.movement,s=an(n),a=tu(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&Oi(n,e,"exit"),pr(n,e);return}if(!e.roomId){pr(n,e);return}if(a){const o=n.entities[r.destination];o?.kind==="facility"&&su(n,e,o,i)}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",Cn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Kn(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)Oi(n,e,e.roomId);else{const o=ru(n,e);let l=t()*o.reduce((d,f)=>d+f.weight,0),c=e.roomId;for(const d of o)if(l-=d.weight,l<=0){c=d.id;break}if(c!==e.roomId)Oi(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const d=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:d+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}pr(n,e)}function ou(n,e,t){const i=n.game.guestMemory??={},r=nc(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),Cn(n,e,"checkout")}const Ft=n=>Object.values(n.entities).filter(e=>e.kind==="room"),rc=n=>Ft(n).filter(e=>e.type==="suite"&&e.status==="available").length,sc=n=>Ft(n).filter(e=>e.status==="occupied").length,$o=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId);function Yi(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function Bi(n,e,t=1){const i=Yi(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)r.id===e&&(r.progress=Math.min(r.goal,r.progress+t))}const lu=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function cu(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=lu[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function Ni(n){const e=Ft(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function ac(n){const e=n.game.development,t=Ft(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const as={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function Di(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function Pr(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function uu(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=Yi(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;Pr(n,3500*s)&&(r.level=s+1,r.capacity+=4,r.quality=Math.min(100,r.quality+5),r.maintenance=100,Bi(n,"upgrade"),Di(n,r.name+"升级至 "+r.level+" 级：容量 +4，体验与消费收入提升。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;Pr(n,4500*s)&&(t.managers[r]++,Di(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;Pr(n,2200)&&(i.campaignUntil=t.day+2,Di(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=as[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;Pr(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},Di(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=ac(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,Di(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function du(n){const e=n.game,t=Yi(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=as[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(u=>u.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,d=Math.min(l,Math.round(a.length*c)),f=Math.round(d*r.fee*(1+(o-1)*.2));n.metrics.cash+=f,e.revenue+=f,Bi(n,"revenue",f),Bi(n,"ancillary",f),Bi(n,"activity");for(const u of a.slice(0,d))u.satisfaction=Math.min(100,(u.satisfaction??90)+5),u.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(d>=3?2:0)),t.activity=void 0,Di(n,r.name+"结束："+d+" 人参加，收入 ¥"+f+"，活动净额 ¥"+(f-r.cost)+"。")}const ha={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},As=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,fa=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Vi(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,Ft(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function Jt(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function $e(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function Zt(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function go(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,Bi(n,"revenue",e)}function Pn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const Lt=Bi,oc=cu;function pa(){const n=jl();n.mode="game",n.metrics={cash:28600,reputation:86,owner:82},n.guests=n.guests.filter(e=>e.staff||e.roomId),n.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:oc(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const e of n.guests)if(e.roomId){const t=n.entities[e.roomId];e.stayLength=t.nightsLeft,e.checkoutDay=1+t.nightsLeft,e.rate=t.type==="suite"?900:650,e.satisfaction=90,e.segment="商务"}for(const e of Ft(n))e.level=1,e.status==="cleaning"&&(e.timer=20);return Yi(n),n.guests.forEach(e=>ms(n,e)),lc(n),$e(n,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),_o(n),n}function lc(n){const e=n.game,t=Jt(n),i=["陈","林","何","张","周","王","李","赵"][Math.floor(Jt(n)*8)]+"先生",r=t<.27?"Globalist":t<.5?"Explorist":t<.8?"Member":"普通客",s=e.positioning==="resort"||(e.day-1)%7>=4&&Jt(n)<.65,a=eu(s,Jt(n),Jt(n)),o={id:"guest-"+e.nextId++,name:i,tier:r,floorId:"floor-lobby",thought:r==="Globalist"?"今晚有套吗？":"想住 "+a+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:s?"度假":a>=5?"长住":"商务",stayLength:a,patience:100+e.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(e.memory[i]??0)};ms(n,o),o.goh=r==="Globalist"&&Jt(n)<.12,o.sua=r==="Globalist"&&!o.goh&&Jt(n)<.15,Cn(n,o,"arrival"),n.guests.push(o),e.arrivals++,$e(n,"入住",`${i} · ${r} 到店，计划 ${a} 晚${e.memory[i]?"，一位熟客回来了":""}。`,"facility-lobby")}const pn=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function _o(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function hu(n,e){e.roomId&&Oi(n,e,e.roomId)}function fu(n){const e=n.game,t=Ft(n);let i=0,r=0;for(const d of n.guests)d.roomId&&(i+=d.rate??e.price,r++);go(n,i),e.nights=r;const s=380+t.length*65+Object.values(e.managers).reduce((d,f)=>d+f*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Vi(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,score:Ni(n).total});const c=Yi(n).scores;c.push({day:e.day,value:Ni(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Pn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),$e(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function pu(n){const e=n.game;e.day++,e.minute=420,e.nextArrival=450,e.nextEvent=600,e.weather=Jt(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=oc(e.day);for(const t of Ft(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=ua(Vi(n)>1.1?750:590,e.level,e.managers.revenue)),$e(n,"部门",`${fa(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Vi(n)*100)}%。`)}function mu(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>go(n,r),reputation:r=>Pn(n,r),log:(r,s,a)=>$e(n,r,s,a),progress:(r,s=1)=>Lt(n,r,s)};nu(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,du(n);const s=Ft(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&--a.timer<=0&&(a.timer=void 0,a.status="available",Lt(n,"service"),$e(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id)),a.status==="dirty"&&t.managers.house&&(a.status="cleaning",a.timer=cr(t.managers.house),Lt(n,"delegate"),$e(n,"部门",`客房主管安排清洁 ${a.number}。`,a.id)),a.status==="maintenance"&&!a.timer&&t.managers.engineering&&Zt(n,100)&&(a.timer=la(t.managers.engineering),Lt(n,"delegate"),$e(n,"部门",`工程主管接管 ${a.number} 的维修。`,a.id));for(const a of[...n.guests]){if(a.staff)continue;if(au(n,a,()=>Jt(n),i),iu(a),a.departing){a.exitAt!==void 0&&an(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(da(n,a),t.lost++,t.complaints++,Pn(n,-1),$e(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=ec(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",$e(n,"客诉",`${a.name} 的 ${Kn(a)} 未确认，按 ${Hi(a)}:00 退房。`,o.id),Pn(n,-1)),ou(n,a,i),o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,da(n,a),$e(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.managers.front){const a=pn(n)[0],o=s.find(l=>l.status==="available"&&(a?.tier==="Globalist"||l.type!=="suite"))??s.find(l=>l.status==="available");a&&o&&(ma(n,{type:"checkin",id:a.id,roomId:o.id}),Lt(n,"delegate"))}if(t.managers.fnb&&t.minute%30===0)for(const a of["stock","clubStock"])t[a]<20&&Zt(n,ca(t.managers.fnb))&&(t[a]+=40,Lt(n,"delegate"),$e(n,"部门","餐饮主管已自动补货。","facility-breakfast"));if(t.minute>=t.nextArrival&&t.minute<1260&&(pn(n).length<6&&lc(n),t.nextArrival=t.minute+Math.max(8,Math.round((35+Jt(n)*28)/Vi(n)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(d=>d.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(Jt(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(d=>d.kind===l)){l==="repair"&&a&&(a.status="maintenance");const d={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:d[l],target:c,expires:t.day*1440+t.minute+120}),$e(n,"客诉",d[l],c)}t.nextEvent=t.minute+180+Math.round(Jt(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";t.managers[o]&&n.metrics.cash>=150?ma(n,{type:"resolve",id:String(a.id),value:"sop"}):t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Pn(n,-2),$e(n,"客诉",`未及时处理：${a.title}`,a.target))}t.minute>=1440&&fu(n)}_o(n)}function ma(n,e){const t=n.game;if(!t||uu(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=pn(n).find(o=>o.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist")){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=$n(t.price,a,s.tier==="Globalist"),s.upgrades=a.type==="suite"&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&a.type!=="suite",s.upgrades?(t.upgrades++,Lt(n,"vip"),Pn(n,1)):s.tier==="Globalist"&&Ft(n).some(o=>o.type==="suite"&&o.status==="available")&&Pn(n,-1),a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,hu(n,s),Cn(n,s,s.denied?"denied":"checkin"),Lt(n,"arrivals"),$e(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=pn(n).find(a=>a.id===e.id);s&&(da(n,s),Cn(n,s,"denied"),t.lost++,$e(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&Zt(n,90)&&(r.status="cleaning",r.timer=30,$e(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.timer&&Zt(n,180)?(r.timer=40,$e(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&Zt(n,200)&&(i.maintenance=100,$e(n,"房态",`${i.name} 维护完成。`,i.id));break;case"upgrade":r?.status==="available"&&(r.level??1)<5&&Zt(n,tc(r.level??1))&&(r.level=(r.level??1)+1,Lt(n,"upgrade"),$e(n,"升级",`${r.number} 装修至 ${r.level} 级，提高房价。`,r.id));break;case"reserve":r?.status==="available"&&r.type==="suite"&&(r.status="reserved",$e(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&(r.status="available",$e(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(ha,s)||t.managers[s])break;Zt(n,3800)&&(t.managers[s]=1,Lt(n,"delegate"),$e(n,"部门",`${ha[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}Zt(n,300)&&(t[s]=Math.min(160,t[s]+50),Lt(n,"stock"),$e(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!Zt(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,Lt(n,"service")),s.kind==="supplies"&&(t.stock+=25),Lt(n,"resolve"),Pn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&Lt(n,"delegate"),$e(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!Zt(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[]};for(let l=1;l<=3;l++){const c=String(a*100+l),d="room-"+c;o.entityIds.push(d),n.entities[d]={id:d,kind:"room",floorId:o.id,number:c,type:l===3?"suite":"king",status:"available",nightsLeft:0,level:1}}Xo(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,$e(n,"升级",`${o.label} 客房层竣工：新增 3 间客房，公区与屋顶同步上移。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),Lt(n,"late-decision"),Pn(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),Cn(n,s,s.late==="honor"?"late-honor":"late-deny"),$e(n,"入住",`${s.name} 已确认 ${s.late==="honor"?Kn(s):Hi(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;Zt(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),Cn(n,s,"recovery"),Lt(n,"resolve"),$e(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(Zt(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");Xo(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),$e(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),$e(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,$e(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"continue":t.reportOpen&&pu(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);s&&!s.claimed&&s.progress>=s.goal&&(s.claimed=!0,go(n,s.reward),$e(n,"收益",`完成「${s.title}」，奖励 ¥${s.reward}。`));break}}_o(n)}function ga(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))ga(e)}return n}function gu(n=jl()){let e=ga(structuredClone(n));const t=new Set,i=r=>{e=ga({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);ma(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);mu(s,r),i(s)},reset(){i(pa())}}}const kn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},_a={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},Fi=2.55,_u=[-4.93,0,4.93],mn=n=>"¥"+Math.round(n).toLocaleString("en-US"),Ui=(n,e,t,i)=>`<div class="upgrade-compare"><span>${n}</span><b>${e}${i} → ${t}${i}</b><div><i style="width:${e/Math.max(1,e,t)*100}%"></i><i style="width:${t/Math.max(1,e,t)*100}%"></i></div></div>`;function vu(n,e){const t=e.level??1;if(t>=5)return"<p>装修已满级</p>";const i=n.game,r={...e,level:t+1},s=tc(t),a=$n(i.price,e),o=$n(i.price,r),l=o-a,c=i.reports.at(-1)?.occupancy??100*Object.values(n.entities).filter(u=>u.kind==="room"&&u.status==="occupied").length/Math.max(1,Object.values(n.entities).filter(u=>u.kind==="room").length),d=$n(i.price,r,!0)-$n(i.price,e,!0),f=l*c/100;return`<details class="upgrade-preview" open><summary>装修 Lv.${t} → ${t+1} · ${mn(s)}</summary>${Ui("新客每晚房价",a,o," 元")}${e.type==="suite"?`<p>会员免费升套价：${mn($n(i.price,e,!0))} → ${mn($n(i.price,r,!0))}</p>`:""}<p>每售出一晚多收 ${mn(d)}${d!==l?"–"+mn(l):""}；约 ${Math.ceil(s/l)}${d!==l?"–"+Math.ceil(s/d):""} 个售出房晚收回装修费。</p><p>按${i.reports.length?"最近一天":"当前"}入住率 ${Math.round(c)}%、${e.type==="suite"?"普通付费客":"当前挂牌价"}估算：每天多收 ${mn(f)}${f>0?"，约 "+Math.ceil(s/f)+" 天回本":"，暂无法估算回本天数"}。</p><small>已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`}function xu(n,e,t,i){const r=n.game,s=r.managers[e],a=Math.min(3,s+1),o=s?4500*s:3800;let l="",c="";if(e==="front"){const d=n.entities["facility-lobby"],f=(d.kind==="facility"?d.level??1:1)*10;l=Ui("新到店住客耐心",100+s*50+f,100+a*50+f," 分钟"),c=s?"自动分房速度不变；延长新客等候耐心，降低等待流失。":"启用自动分房与常规诉求处理；无空房时仍需等待。"}return e==="house"&&(l=Ui("每间清洁用时",cr(s),cr(a)," 分钟"),c=s?"少占用 "+(cr(s)-cr(a))+" 分钟房态；有待入住客人时才可能转化为收入。":"自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。"),e==="engineering"&&(l=Ui("常规维修用时",la(s),la(a)," 分钟"),c=s?"维修费用仍为 ¥100/间；更早恢复可售，不保证新增订单。":"自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。"),e==="fnb"&&(l=Ui("采购单价（每 40 份）",s?ca(s):240,ca(a)," 元"),c=s?"每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。":"库存低于 20 时，每 30 分钟自动检查补货；与手动采购每份同价。"),e==="revenue"&&(l=Ui("同一需求下自动报价",s?ua(i,r.level,s):r.price,ua(i,r.level,a)," 元"),c="次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。"),`<details class="manager-card"><summary><span>${t}主管 · ${s?"Lv."+s:"未聘任"}</span><small>${s>=3?"已满级":"查看效果 ›"}</small></summary>${s>=3?"<p>已完成全部培训。</p>":`${l}<p>${c}</p><p>投入 ${mn(o)} · 工资 ${mn(s*180)} → ${mn(a*180)}/天</p><button class="game-action" data-action="${s?"train":"hire"}" data-id="${e}">${s?"培训至 Lv."+a:"聘任主管"} · ${mn(o)}</button>`}</details>`}const et=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ct=n=>"¥"+Math.round(n).toLocaleString("en-US"),Be=(n,e,t="",i="")=>`<button class="game-action" data-action="${et(e)}" data-id="${et(t)}" data-value="${et(i)}">${et(n)}</button>`;function Mu(n,e){const t=b=>n.querySelector(b),i=n.querySelector("dialog"),r=t("#sheet-content"),s=t("#sheet-eye");let a="",o="",l="全部",c=()=>{},d=null;t(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',t(".world-caption").textContent="轻点空间 · 处理今天的经营",t(".weather").title="切换日夜预览",t(".property-name small").id="game-time",t(".today-hint").setAttribute("data-open","tasks"),t(".event-strip").removeAttribute("data-focus"),t(".event-strip").setAttribute("data-open","events"),t(".speed-control").insertAdjacentHTML("beforeend",Be("Ⅱ","pause")),t(".speed-control").setAttribute("aria-label","经营速度"),n.querySelectorAll("[data-speed]").forEach(b=>b.setAttribute("aria-label",b.getAttribute("data-speed")+"倍经营速度"));const f=()=>{a="",o="",i.close(),e.select(null),d?.focus()},u=()=>{e.getState().game.reportOpen&&e.dispatch({type:"continue"}),f()};let x=!1;const g=(b,p)=>{const v=i.getBoundingClientRect();return b<v.left||b>v.right||p<v.top||p>v.bottom};i.addEventListener("pointerdown",b=>{x=b.target===i&&g(b.clientX,b.clientY)}),i.addEventListener("click",b=>{x&&b.target===i&&g(b.clientX,b.clientY)&&u(),x=!1});const S=(b,p)=>{s.textContent=b,r.innerHTML=p,i.open||(d=document.activeElement,i.showModal())},m=b=>{const p=e.getState(),v=p.entities[b];if(v){if(v.kind==="room"){const E=p.guests.find(R=>R.id===v.guestId);S("HYATT PLACE · "+p.floors.find(R=>R.id===v.floorId)?.label,`<h2>${et(v.number)}<span>${v.type==="suite"?"开放式套房":v.type==="twin"?"双床客房":"大床客房"} · Lv.${v.level??1}</span></h2><div class="status-chip">${_a[v.status]}${v.timer?" · 还需 "+v.timer+" 分钟":""}</div><dl><div><dt>住客</dt><dd>${E?et(E.name)+" · "+et(E.tier):"暂无"}</dd></div><div><dt>剩余住宿</dt><dd>${v.nightsLeft} 晚</dd></div><div><dt>每晚房费</dt><dd>${Ct(E?E.rate??p.game.price:$n(p.game.price,v))}</dd></div></dl>${E?"<p>"+et(E.name)+(E.goh?" · GOH":"")+(E.sua?" · SUA":"")+"</p><blockquote>"+et(E.thought)+"</blockquote>"+(E.serviceDone?"<small>本次住宿已安排专属服务</small>":Be({road:"安排发票与行程",family:"加床与早餐确认",points:"核对 QN 与 bonus",hunter:"一起核对套房库存",forum:"确认房型口径",creator:"安排拍摄与欢迎饮品",proposal:"安排求婚布置",planner:"安排团队动线考察",whale:"安排专属接待",auditplus:"安排客房巡检",chill:"补充饮水与用品"}[E.persona??"chill"]+" ¥120","guest-service",E.id))+(E.late==="pending"?Be("确认 "+Kn(E),"late",E.id,"honor")+Be("协商 "+Hi(E)+":00","late",E.id,"deny"):E.late?"<p>退房时间："+As(ec(E))+"</p>":""):""}${v.status==="available"?vu(p,v):""}<div class="action-row">${v.status==="dirty"?Be("安排清洁 ¥90","clean",b):""}${v.status==="maintenance"&&!v.timer?Be("安排维修 ¥180","repair",b):""}${v.status==="available"?Be("分配给住客","front")+((v.level??1)<5?Be("装修 "+Ct(2500*(v.level??1)),"upgrade",b):"")+(v.type==="suite"?Be("预留给会员","reserve",b):""):""}${v.status==="reserved"?Be("释放预留","release",b):""}</div>`)}else S("HYATT PLACE · 公共空间",`<h2>${et(v.name)}</h2><dl><div><dt>使用 / 容量</dt><dd>${v.usage} / ${v.capacity}</dd></div><div><dt>维护状况</dt><dd>${Math.round(v.maintenance)}%</dd></div>${["breakfast","club"].includes(v.role)?`<div><dt>库存</dt><dd>${v.role==="club"?p.game.clubStock:p.game.stock} 份</dd></div>`:""}</dl><div class="action-row">${v.role==="lobby"?Be("办理入住","front"):""}${v.role==="breakfast"?Be("补充早餐 ¥300","stock","breakfast"):v.role==="club"?Be("补充酒廊 ¥300","stock","club"):""}${Be("维护设施 ¥200","repair",v.id)}${(v.level??1)<5?Be("公区升级 "+Ct(3500*(v.level??1)),"invest",v.id):"已达 Lv.5"}</div>`);a&&p.game.notice&&r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${et(p.game.notice)}</p>`)}},h=()=>{const b=e.getState(),p=b.game;if(a==="entity"){m(o);return}if(a==="front")S("FRONT OFFICE",`<h2>前台 · ${pn(b).length} 位等候</h2><p>会员升套使用普通房价；房费日结入账。面板打开时经营暂停。</p>${pn(b).map(v=>{const E=Ft(b).filter(R=>R.status==="available"||R.status==="reserved"&&v.tier==="Globalist").sort((R,N)=>v.tier==="Globalist"?+(N.type==="suite")-+(R.type==="suite"):+(R.type==="suite")-+(N.type==="suite"));return`<section class="guest-card"><strong>${et(v.name)} · ${et(v.tier)}</strong><blockquote>${et(v.thought)}</blockquote><p>${et(v.segment)}${v.goh?" · GOH":""}${v.sua?" · SUA":""} · ${v.stayLength} 晚 · 等候耐心 ${v.patience} 分钟</p>${E.length?`<select aria-label="为${et(v.name)}选择房间" id="assign-${et(v.id)}">${E.map(R=>`<option value="${R.id}">${R.number} · ${R.type==="suite"?"套房":R.type==="twin"?"双床":"大床"}${v.tier==="Globalist"&&R.type==="suite"?" · 免费升套":""}</option>`).join("")}</select>${Be("确认入住","checkin",v.id)}`:"<p>暂无可用房间：先清洁脏房或扩建。</p>"}${Be("婉拒","reject",v.id)}</section>`}).join("")||'<p class="empty">暂时没有排队住客，关上面板继续经营。</p>'}`);else if(a==="hotel")S("YOUR HOTEL",`<h2>酒店 · ${Ft(b).length} 间客房</h2><p>向上扩建客房，也会吸引更多客流。</p>${Be("新增三间客房 "+Ct(1e4+5e3*(b.floors.filter(v=>v.role==="guest").length-3)),"expand")}<div class="action-row"><button class="game-action" data-open="development">投资与主题活动 ›</button></div><div class="floor-list">${[...b.floors].reverse().map(v=>`<button data-floor="${v.id}"><b>${v.label}</b><span>${v.name}</span><small>定位楼层 ›</small></button>`).join("")}</div><div class="room-grid">${Ft(b).map(v=>`<button data-entity="${v.id}">${v.number}<small>${_a[v.status]}</small></button>`).join("")}</div>`);else if(a==="operations")S("OPERATIONS",`<h2>经营与授权</h2><button class="primary" data-open="development">投资、营销与主题活动 ›</button><p>${fa(p.day)} · 预计需求 ${Math.round(Vi(b)*100)}% · ${p.weather==="rain"?"有雨":"晴朗"}</p><div class="action-row">${Be("早餐 +50 ¥300","stock","breakfast")}${Be("酒廊 +50 ¥300","stock","club")}</div><p>库存：早餐 ${p.stock} · 酒廊 ${p.clubStock}</p><details class="manager-card"><summary>房价与定位 · ¥${p.price}</summary><label>新客挂牌价 <input id="price-input" type="number" min="350" max="1800" step="50" value="${p.price}"></label>${Be("调整价格","price")}<label>经营定位 <select id="position-input"><option value="business" ${p.positioning==="business"?"selected":""}>商务 / 机场</option><option value="resort" ${p.positioning==="resort"?"selected":""}>休闲 / 度假</option><option value="urban" ${p.positioning==="urban"?"selected":""}>城市混合</option></select></label>${Be("调整定位","position")}</details><h3>部门负责人</h3><p>展开部门查看升级效果与工资变化。</p>${Object.entries(ha).map(([v,E])=>xu(b,v,E,Vi(b)>1.1?750:590)).join("")}<div class="action-row">${Be("最近日结","report")}${Be("导出存档","export")}${Be("新开存档","reset")}</div><p class="phase-note">自动保存于当前浏览器。旧版存档不受影响。非官方粉丝游戏，与 Hyatt 无隶属关系。</p>`);else if(a==="development"){const v=p.development;S("GROW YOUR HOTEL",`<h2>投资与新体验</h2><p>扩建之外，让每一层创造更多收入。客房可装修至 5 级，每级增加基础房价的 10%，装修前可查看回本预估。</p><h3>三日营销</h3><p>客流 +35%；推广持续到第 ${v?.campaignUntil??0} 天。满房时请谨慎投放。</p>${v&&v.campaignUntil>=p.day?"<small>推广进行中</small>":Be("投放推广 ¥2,200","campaign")}<h3>今日主题活动</h3><p>每天一场，筹备两小时。参与人数取决于在住人数、公区容量与经营条件；成本可能高于收入。</p>${v?.activity?`<blockquote>正在筹备：${as[v.activity.id].name} · 还需 ${Math.max(0,v.activity.ends-p.day*1440-p.minute)} 分钟</blockquote>`:""}${Object.entries(as).map(([E,R])=>`<section class="guest-card"><strong>${R.name}</strong><p>${R.description} 每人消费 ¥${R.fee} 起。</p>${v?.activityDay===p.day?"<small>今日档期已使用</small>":Be("安排 "+Ct(R.cost),"activity",E)}</section>`).join("")}<h3>公共空间投资</h3>${b.entities["facility-spa"]?"":Be("开设 Spa 水疗 ¥12,000","build-spa")}<p>每级增加 4 人容量，餐饮、健身与屋顶消费单价提升 20%，住客体验更好；大堂升级增加等候耐心。</p>${Object.values(b.entities).filter(E=>E.kind==="facility").map(E=>`<section class="guest-card"><strong>${et(E.name)} · Lv.${E.level??1}</strong><p>容量 ${E.capacity} 人 · 维护 ${Math.round(E.maintenance)}%</p>${(E.level??1)<5?Be("升级 "+Ct(3500*(E.level??1)),"invest",E.id):"<small>满级</small>"}</section>`).join("")}<button class="game-action" data-open="hotel">装修客房 / 继续扩建 ›</button><button class="game-action" data-open="operations">培训部门负责人 ›</button>`)}else if(a==="score"){const v=Ni(b);S("HOTEL SCORE",`<h2>酒店经营评分</h2><div class="score-hero"><div class="score-ring" style="--score:${v.total}%"><strong>${v.total}<small>/ 100</small></strong></div><div><strong>${v.total>=90?"卓越酒店":v.total>=75?"稳健经营":v.total>=60?"成长中":"需要改善"}</strong><p>四项指标等权平均，实时更新。</p></div></div>${v.parts.map(E=>`<div class="score-part"><span>${E.name}</span><b>${E.value}</b><progress max="100" value="${E.value}" aria-label="${E.name}"></progress></div>`).join("")}<p>及时处理诉求提升口碑；补货与活动改善体验；清洁维修改善房务；收支表现影响业主信心。</p><h3>最近 7 天评分</h3><div class="revenue-trend">${(p.development?.scores??[]).slice(-7).map(E=>`<div><small>${E.value} 分</small><i style="height:${E.value*.65}px"></i><small>D${E.day}</small></div>`).join("")||"<p>首次日结后记录评分趋势。</p>"}</div><button class="game-action" data-open="tasks">查看任务与里程碑 ›</button>`)}else if(a==="tasks")S("MISSIONS",`<h2>今日任务</h2><p>每天轮换经营目标，完成后及时领奖。长期里程碑不会随交班重置。</p>${p.tasks.map(v=>`<section class="guest-card"><strong>${et(v.title)}</strong><p>${v.progress} / ${v.goal} · 奖励 ${Ct(v.reward)}</p><progress max="${v.goal}" value="${v.progress}" aria-label="${et(v.title)}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Be("领取奖励","claim",v.id):`<button class="game-action" data-open="${v.target}">去完成 ›</button>`}</section>`).join("")}<h3>长期里程碑</h3><p>持续接待住客、举办活动和建设酒店，解锁长期奖励。</p>${ac(b).map(v=>`<section class="guest-card"><strong>${v.title}</strong><p>${Math.min(v.progress,v.goal)} / ${v.goal} · ${Ct(v.reward)}</p><progress max="${v.goal}" value="${Math.min(v.progress,v.goal)}" aria-label="${v.title}"></progress>${v.claimed?"<small>已领取</small>":v.progress>=v.goal?Be("领取里程碑奖励","claim-career",v.id):"<small>持续经营以解锁</small>"}</section>`).join("")}`);else if(a==="events")S("DUTY MANAGER",`<h2>待办 · ${p.events.length+b.guests.filter(v=>v.late==="pending").length}</h2>${b.guests.filter(v=>v.late==="pending"&&!v.departing).map(v=>`<section class="guest-card"><strong>${et(v.name)} · ${et(v.tier)} · ${Kn(v)} 请求</strong><p>希望${v.checkoutDay===p.day?"今天":"明天"} ${gr(v)}:00 退房。比 11:00 常规退房晚 ${gr(v)-11} 小时，之后才可翻房。</p><p>同意：住客体验 +4、口碑 +1、业主 -1；协商：体验 -3、口碑 -1、业主 +1。</p>${Be("同意 "+Kn(v),"late",v.id,"honor")}${Be("协商 "+Hi(v)+":00","late",v.id,"deny")}</section>`).join("")}${p.events.map(v=>`<section class="guest-card"><strong>${et(v.title)}</strong><p>剩余 ${Math.max(0,v.expires-p.day*1440-p.minute)} 游戏分钟</p><div class="action-row"><button class="game-action" data-entity="${v.target}">定位现场</button>${Be("亲自协调 ¥350","resolve",String(v.id),"gm")}${Be("交给主管 ¥150","resolve",String(v.id),"sop")}</div></section>`).join("")||'<p class="empty">目前没有异常。部门成熟以后，常规问题会自动处理。</p>'}${pn(b).length?`<button class="primary" data-open="front">接待 ${pn(b).length} 位排队住客</button>`:""}`);else if(a==="log")S("HOTEL JOURNAL",`<h2>运营日志</h2><div class="filter-row">${["全部","入住","客诉","房态","部门","收益","升级"].map(v=>`<button class="${v===l?"active":""}" data-filter="${v}">${v}</button>`).join("")}</div><div class="log-list">${[...p.logs].reverse().filter(v=>l==="全部"||v.category===l).map(v=>`<article><small>Day ${v.day} ${As(v.minute)} · ${v.category}</small><p>${et(v.text)}</p>${v.target?`<button data-entity="${et(v.target)}">查看现场 ›</button>`:""}</article>`).join("")}</div>`);else if(a==="report"){const v=p.reports.at(-1);S("DAILY REVIEW",v?`<h2>Day ${v.day} · 日结</h2><button class="game-action" data-open="score">经营评分 ${v.score??Ni(b).total} / 100 ›</button><dl><div><dt>收入 / 成本</dt><dd>${Ct(v.revenue)} / ${Ct(v.expense)}</dd></div><div><dt>ADR / RevPAR</dt><dd>${Ct(v.adr)} / ${Ct(v.revpar)}</dd></div><div><dt>入住率 / 房态损失</dt><dd>${v.occupancy}% / ${v.lost}%</dd></div><div><dt>升套 / 客诉</dt><dd>${v.upgrades} / ${v.complaints}</dd></div></dl><h3>最近 7 天收入</h3><div class="revenue-trend">${p.reports.slice(-7).map(E=>`<div><small>${Ct(E.revenue)}</small><i style="height:${Math.max(3,Math.round(E.revenue/Math.max(1,...p.reports.slice(-7).map(R=>R.revenue))*65))}px"></i><small>D${E.day}</small></div>`).join("")}</div><blockquote>${et(v.recommendation)}</blockquote>${p.reportOpen?Be("开始下一天","continue"):""}`:"<h2>第一天还没结束</h2><p>房费于午夜统一结算。关闭面板继续经营。</p>")}};n.addEventListener("click",b=>{const p=b.target.closest("button");if(!p)return;if(p.matches(".close-sheet")){u();return}if(p.dataset.open){a=p.dataset.open,h();return}if(p.dataset.speed){e.setSpeed(Number(p.dataset.speed));return}if(p.dataset.entity){o=p.dataset.entity;const R=e.getState().entities[o];R&&c(R.floorId),a="entity",e.select(o),h();return}if(p.dataset.floor){const R=p.dataset.floor;f(),e.focusFloor(R),c(R);return}if(p.dataset.filter){l=p.dataset.filter,h();return}if(p.matches(".weather")){const R=["dusk","night","day"];e.setAtmosphere(R[(R.indexOf(e.getState().atmosphere)+1)%3]);return}const v=p.dataset.action;if(!v)return;if(["front","report"].includes(v)){a=v,h();return}if(v==="reset"){document.dispatchEvent(new Event("new-game"));return}if(v==="export"){const R=document.createElement("a");R.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),R.download="jinwan-v8-save.json",R.click(),setTimeout(()=>URL.revokeObjectURL(R.href),500);return}const E={type:v,id:p.dataset.id,value:p.dataset.value};v==="checkin"&&(E.roomId=n.querySelector("#assign-"+p.dataset.id)?.value),v==="price"&&(E.value=Number(n.querySelector("#price-input")?.value)),v==="position"&&(E.value=n.querySelector("#position-input")?.value),e.dispatch(E),v==="continue"?f():a&&(h(),r.querySelector(".action-feedback")||r.insertAdjacentHTML("beforeend",`<p class="action-feedback">${et(e.getState().game.notice)}</p>`))}),i.addEventListener("cancel",b=>{b.preventDefault(),u()});let C=null,P="",y="",w=0;const A=()=>{const b=e.getState(),p=b.game;t(".score-button").innerHTML=`<i style="--score:${Ni(b).total}%"></i> ${Ni(b).total} 分 ›`,t("#cash").textContent=Ct(b.metrics.cash),t("#reputation").textContent=String(b.metrics.reputation),t("#owner").textContent=String(b.metrics.owner),t("#suite-count").textContent=rc(b)+" 间",t("#game-time").textContent=`${fa(p.day)} · Day ${p.day} ${As(p.minute)}${p.paused?" · 暂停":""}`,t(".today-hint span:nth-child(2)").textContent=p.tasks.find(E=>!E.claimed)?.title??"今日任务全部完成",t("#task-count").textContent=p.tasks.filter(E=>E.claimed).length+"/"+p.tasks.length,t("#occupancy").textContent=`${sc(b)}/${Ft(b).length} 在住 · 收入 ${Ct(p.revenue)}`,t(".event-strip span").textContent=(b.guests.some(E=>E.late==="pending"&&!E.departing)?"会员晚退请求待你确认":void 0)??p.events[0]?.title??(pn(b).length?`${pn(b).length} 位住客等待办理入住`:"酒店运营平稳"),t(".event-strip b").textContent=p.events.length||b.guests.some(E=>E.late==="pending"&&!E.departing)?"处理 ›":"前台 ›",t(".event-strip").setAttribute("data-open",p.events.length||b.guests.some(E=>E.late==="pending"&&!E.departing)?"events":"front"),t(".review-strip span").textContent=p.notice,t(".weather span").textContent=p.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(E=>{E.classList.toggle("active",Number(E.dataset.speed)===b.speed),E.setAttribute("aria-pressed",String(Number(E.dataset.speed)===b.speed))});const v=b.floors.map(E=>E.id).join(",");if(P!==v&&(P=v,t(".floor-rail").innerHTML=[...b.floors].reverse().map(E=>`<button data-floor="${E.id}" aria-label="前往${E.label} ${E.name}">${E.label}</button>`).join("")),b.selectedId&&b.selectedId!==C&&(o=b.selectedId,a="entity",h()),C=b.selectedId,p.reportOpen&&w!==p.day&&(w=p.day,a="report",h()),y!==p.notice&&(y=p.notice,i.open)){let E=r.querySelector(".action-feedback");E||(E=document.createElement("p"),E.className="action-feedback",r.append(E)),E.textContent=p.notice}};return e.subscribe(A),A(),{stage:t(".world-stage"),setFocusHandler:b=>{c=b},showError:b=>S("画面暂时不可用",`<h2>请重新载入酒店</h2><p>${et(b)}</p>`)}}function Su(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return Mu(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(g,S)=>{r.textContent=g,i.innerHTML=S,t.open||(a=document.activeElement,t.showModal())},d=g=>{const S=e.getState(),m=S.entities[g];if(!m)return;const h=$o(S,g);if(m.kind==="room"){const C=S.guests.find(P=>P.id===m.guestId);c("HYATT PLACE · "+h.label,`<h2>${m.number}<span>${m.type==="suite"?"开放式套房":m.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${m.status}">${_a[m.status]}</div><dl><div><dt>住客</dt><dd>${C?C.name+" · "+C.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${m.nightsLeft?m.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${h.label} · ${h.name}</dd></div></dl>${C?"<blockquote>“"+C.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${h.id}">回到 ${m.number} 的楼层</button>`)}else{const C={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+h.label,`<h2>${m.name}</h2><p>${C[m.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${m.usage} / ${m.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${m.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${m.quality} / ${m.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${h.id}">回到${m.name}</button>`)}},f={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const g=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...g.floors].reverse().map(S=>`<button data-return="${S.id}"><b>${S.label}</b><span>${S.name}</span><small>${S.entityIds.length>1?S.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const g=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([S,m,h])=>`<button data-focus="${S}"><b>${g.visited.includes(S)?"✓":"○"}</b><span>${m}<small>${h}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const g=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(g.visited.length?[...g.visited].reverse().map(S=>{const m=g.entities[S];return`<button data-focus="${S}"><span>${m.kind==="room"?m.number+" 房间":m.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",g=>{const S=g.target.closest("button");if(S){if(S.matches(".close-sheet")&&l(),S.dataset.open&&(e.select(null),s=S.dataset.open,f[s]?.()),S.dataset.speed&&e.setSpeed(Number(S.dataset.speed)),S.dataset.return){const m=S.dataset.return;l(),e.focusFloor(m),o(m)}if(S.dataset.focus){const m=S.dataset.focus,h=$o(e.getState(),m);l(),h&&(e.focusFloor(h.id),o(h.id)),e.select(m)}if(S.dataset.floor&&(e.focusFloor(S.dataset.floor),o(S.dataset.floor)),S.dataset.atmosphere&&(e.setAtmosphere(S.dataset.atmosphere),l()),S.matches(".weather")){const m=["dusk","night","day"];e.setAtmosphere(m[(m.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",g=>{g.preventDefault(),l()}),t.addEventListener("click",g=>{if(g.target===t){const S=t.getBoundingClientRect();(g.clientX<S.left||g.clientX>S.right||g.clientY<S.top||g.clientY>S.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(g=>`<button data-floor="${g.id}" aria-label="前往${g.label} ${g.name}">${g.label}</button>`).join("");let u=null;const x=g=>{n.querySelector("#cash").textContent="¥"+g.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(g.metrics.reputation),n.querySelector("#owner").textContent=String(g.metrics.owner),n.querySelector("#suite-count").textContent=rc(g)+" 间",n.querySelector("#occupancy").textContent=`${Ft(g).length} 间客房 · ${sc(g)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(S=>g.visited.includes(S)).length+"/3",n.querySelectorAll("[data-speed]").forEach(S=>{S.classList.toggle("active",Number(S.dataset.speed)===g.speed),S.setAttribute("aria-pressed",String(Number(S.dataset.speed)===g.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[g.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[g.atmosphere],n.querySelectorAll("[data-floor]").forEach(S=>S.classList.toggle("active",S.dataset.floor===g.focusedFloorId)),g.selectedId&&g.selectedId!==u&&(s="entity",d(g.selectedId)),u=g.selectedId};return e.subscribe(x),x(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:g=>{o=g},showError:g=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+g+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vo="185",yu=0,qo=1,bu=2,es=1,cc=2,ur=3,Zn=0,Ht=1,Rn=2,Ln=0,ki=1,Yo=2,Ko=3,Zo=4,Eu=5,si=100,Tu=101,Au=102,wu=103,Ru=104,Cu=200,Pu=201,Iu=202,Lu=203,va=204,xa=205,Du=206,Uu=207,Nu=208,Fu=209,Ou=210,Bu=211,ku=212,zu=213,Gu=214,Ma=0,Sa=1,ya=2,Wi=3,ba=4,Ea=5,Ta=6,Aa=7,uc=0,Hu=1,Vu=2,vn=0,dc=1,hc=2,fc=3,xo=4,pc=5,mc=6,gc=7,_c=300,di=301,Xi=302,ws=303,Rs=304,gs=306,os=1e3,In=1001,wa=1002,At=1003,Wu=1004,Ir=1005,Dt=1006,Cs=1007,li=1008,qt=1009,vc=1010,xc=1011,_r=1012,Mo=1013,Mn=1014,rn=1015,Un=1016,So=1017,yo=1018,vr=1020,Mc=35902,Sc=35899,yc=1021,bc=1022,sn=1023,Nn=1026,ci=1027,bo=1028,Eo=1029,hi=1030,To=1031,Ao=1033,ts=33776,ns=33777,is=33778,rs=33779,Ra=35840,Ca=35841,Pa=35842,Ia=35843,La=36196,Da=37492,Ua=37496,Na=37488,Fa=37489,ls=37490,Oa=37491,Ba=37808,ka=37809,za=37810,Ga=37811,Ha=37812,Va=37813,Wa=37814,Xa=37815,$a=37816,qa=37817,Ya=37818,Ka=37819,Za=37820,Ja=37821,Qa=36492,ja=36494,eo=36495,to=36283,no=36284,cs=36285,io=36286,Xu=3200,ro=0,$u=1,qn="",Gt="srgb",us="srgb-linear",ds="linear",Qe="srgb",_i=7680,Jo=519,qu=512,Yu=513,Ku=514,wo=515,Zu=516,Ju=517,Ro=518,Qu=519,Qo=35044,jo="300 es",_n=2e3,xr=2001;function ju(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ed(){const n=hs("canvas");return n.style.display="block",n}const el={};function tl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ec(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ce(...n){n=Ec(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function He(...n){n=Ec(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function zi(...n){const e=n.join(" ");e in el||(el[e]=!0,Ce(...n))}function td(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const nd={[Ma]:Sa,[ya]:Ta,[ba]:Aa,[Wi]:Ea,[Sa]:Ma,[Ta]:ya,[Aa]:ba,[Ea]:Wi};class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ps=Math.PI/180,so=180/Math.PI;function Sr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function id(n,e){return(n%e+e)%e}function Is(n,e,t){return(1-t)*n+t*e}function ji(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class ke{static{ke.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ki{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3],u=s[a+0],x=s[a+1],g=s[a+2],S=s[a+3];if(f!==S||l!==u||c!==x||d!==g){let m=l*u+c*x+d*g+f*S;m<0&&(u=-u,x=-x,g=-g,S=-S,m=-m);let h=1-o;if(m<.9995){const C=Math.acos(m),P=Math.sin(C);h=Math.sin(h*C)/P,o=Math.sin(o*C)/P,l=l*h+u*o,c=c*h+x*o,d=d*h+g*o,f=f*h+S*o}else{l=l*h+u*o,c=c*h+x*o,d=d*h+g*o,f=f*h+S*o;const C=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=C,c*=C,d*=C,f*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[a],u=s[a+1],x=s[a+2],g=s[a+3];return e[t]=o*g+d*f+l*x-c*u,e[t+1]=l*g+d*u+c*f-o*x,e[t+2]=c*g+d*x+o*u-l*f,e[t+3]=d*g-o*f-l*u-c*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),f=o(s/2),u=l(i/2),x=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*d*f+c*x*g,this._y=c*x*f-u*d*g,this._z=c*d*g+u*x*f,this._w=c*d*f-u*x*g;break;case"YXZ":this._x=u*d*f+c*x*g,this._y=c*x*f-u*d*g,this._z=c*d*g-u*x*f,this._w=c*d*f+u*x*g;break;case"ZXY":this._x=u*d*f-c*x*g,this._y=c*x*f+u*d*g,this._z=c*d*g+u*x*f,this._w=c*d*f-u*x*g;break;case"ZYX":this._x=u*d*f-c*x*g,this._y=c*x*f+u*d*g,this._z=c*d*g-u*x*f,this._w=c*d*f+u*x*g;break;case"YZX":this._x=u*d*f+c*x*g,this._y=c*x*f+u*d*g,this._z=c*d*g-u*x*f,this._w=c*d*f-u*x*g;break;case"XZY":this._x=u*d*f-c*x*g,this._y=c*x*f-u*d*g,this._z=c*d*g+u*x*f,this._w=c*d*f+u*x*g;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const x=.5/Math.sqrt(u+1);this._w=.25/x,this._x=(d-l)*x,this._y=(s-c)*x,this._z=(a-r)*x}else if(i>o&&i>f){const x=2*Math.sqrt(1+i-o-f);this._w=(d-l)/x,this._x=.25*x,this._y=(r+a)/x,this._z=(s+c)/x}else if(o>f){const x=2*Math.sqrt(1+o-i-f);this._w=(s-c)/x,this._x=(r+a)/x,this._y=.25*x,this._z=(l+d)/x}else{const x=2*Math.sqrt(1+f-i-o);this._w=(a-r)/x,this._x=(s+c)/x,this._y=(l+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{static{O.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*d,this.y=i+l*d+o*c-s*f,this.z=r+l*f+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ls.copy(this).projectOnVector(e),this.sub(Ls)}reflect(e){return this.sub(Ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ls=new O,nl=new Ki;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],f=i[7],u=i[2],x=i[5],g=i[8],S=r[0],m=r[3],h=r[6],C=r[1],P=r[4],y=r[7],w=r[2],A=r[5],b=r[8];return s[0]=a*S+o*C+l*w,s[3]=a*m+o*P+l*A,s[6]=a*h+o*y+l*b,s[1]=c*S+d*C+f*w,s[4]=c*m+d*P+f*A,s[7]=c*h+d*y+f*b,s[2]=u*S+x*C+g*w,s[5]=u*m+x*P+g*A,s[8]=u*h+x*y+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*l-d*s,x=c*s-a*l,g=t*f+i*u+r*x;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=f*S,e[1]=(r*c-d*i)*S,e[2]=(o*i-r*a)*S,e[3]=u*S,e[4]=(d*t-r*l)*S,e[5]=(r*s-o*t)*S,e[6]=x*S,e[7]=(i*l-c*t)*S,e[8]=(a*t-i*s)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ds.makeScale(e,t)),this}rotate(e){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ds.makeRotation(-e)),this}translate(e,t){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ds.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ds=new Ie,il=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rl=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rd(){const n={enabled:!0,workingColorSpace:us,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Qe&&(r.r=Dn(r.r),r.g=Dn(r.g),r.b=Dn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===qn?ds:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[us]:{primaries:e,whitePoint:i,transfer:ds,toXYZ:il,fromXYZ:rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:il,fromXYZ:rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),n}const ze=rd();function Dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let vi;class sd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{vi===void 0&&(vi=hs("canvas")),vi.width=e.width,vi.height=e.height;const r=vi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=vi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Dn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Dn(t[i]/255)*255):t[i]=Dn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ad=0;class Co{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Sr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Us(r[a].image)):s.push(Us(r[a]))}else s=Us(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Us(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?sd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let od=0;const Ns=new O;class Ot extends fi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=In,r=In,s=Dt,a=li,o=sn,l=qt,c=Ot.DEFAULT_ANISOTROPY,d=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Sr(),this.name="",this.source=new Co(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ns).x}get height(){return this.source.getSize(Ns).y}get depth(){return this.source.getSize(Ns).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case os:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case os:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=_c;Ot.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],u=l[1],x=l[5],g=l[9],S=l[2],m=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(f-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+x+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const P=(c+1)/2,y=(x+1)/2,w=(h+1)/2,A=(d+u)/4,b=(f+S)/4,p=(g+m)/4;return P>y&&P>w?P<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(P),r=A/i,s=b/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=A/r,s=p/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=b/s,r=p/s),this.set(i,r,s,t),this}let C=Math.sqrt((m-g)*(m-g)+(f-S)*(f-S)+(u-d)*(u-d));return Math.abs(C)<.001&&(C=1),this.x=(m-g)/C,this.y=(f-S)/C,this.z=(u-d)/C,this.w=Math.acos((c+x+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ld extends fi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ot(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Co(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xn extends ld{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Tc extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cd extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rt{static{rt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,d,f,u,x,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,d,f,u,x,g,S,m)}set(e,t,i,r,s,a,o,l,c,d,f,u,x,g,S,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=f,h[14]=u,h[3]=x,h[7]=g,h[11]=S,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/xi.setFromMatrixColumn(e,0).length(),s=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*d,x=a*f,g=o*d,S=o*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=x+g*c,t[5]=u-S*c,t[9]=-o*l,t[2]=S-u*c,t[6]=g+x*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,x=l*f,g=c*d,S=c*f;t[0]=u+S*o,t[4]=g*o-x,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=x*o-g,t[6]=S+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,x=l*f,g=c*d,S=c*f;t[0]=u-S*o,t[4]=-a*f,t[8]=g+x*o,t[1]=x+g*o,t[5]=a*d,t[9]=S-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,x=a*f,g=o*d,S=o*f;t[0]=l*d,t[4]=g*c-x,t[8]=u*c+S,t[1]=l*f,t[5]=S*c+u,t[9]=x*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,x=a*c,g=o*l,S=o*c;t[0]=l*d,t[4]=S-u*f,t[8]=g*f+x,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=x*f+g,t[10]=u-S*f}else if(e.order==="XZY"){const u=a*l,x=a*c,g=o*l,S=o*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=u*f+S,t[5]=a*d,t[9]=x*f-g,t[2]=g*f-x,t[6]=o*d,t[10]=S*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ud,e,dd)}lookAt(e,t,i){const r=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),zn.crossVectors(i,Wt),zn.lengthSq()===0&&(Math.abs(i.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),zn.crossVectors(i,Wt)),zn.normalize(),Lr.crossVectors(Wt,zn),r[0]=zn.x,r[4]=Lr.x,r[8]=Wt.x,r[1]=zn.y,r[5]=Lr.y,r[9]=Wt.y,r[2]=zn.z,r[6]=Lr.z,r[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],f=i[5],u=i[9],x=i[13],g=i[2],S=i[6],m=i[10],h=i[14],C=i[3],P=i[7],y=i[11],w=i[15],A=r[0],b=r[4],p=r[8],v=r[12],E=r[1],R=r[5],N=r[9],q=r[13],J=r[2],B=r[6],Y=r[10],H=r[14],j=r[3],te=r[7],he=r[11],ge=r[15];return s[0]=a*A+o*E+l*J+c*j,s[4]=a*b+o*R+l*B+c*te,s[8]=a*p+o*N+l*Y+c*he,s[12]=a*v+o*q+l*H+c*ge,s[1]=d*A+f*E+u*J+x*j,s[5]=d*b+f*R+u*B+x*te,s[9]=d*p+f*N+u*Y+x*he,s[13]=d*v+f*q+u*H+x*ge,s[2]=g*A+S*E+m*J+h*j,s[6]=g*b+S*R+m*B+h*te,s[10]=g*p+S*N+m*Y+h*he,s[14]=g*v+S*q+m*H+h*ge,s[3]=C*A+P*E+y*J+w*j,s[7]=C*b+P*R+y*B+w*te,s[11]=C*p+P*N+y*Y+w*he,s[15]=C*v+P*q+y*H+w*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],f=e[6],u=e[10],x=e[14],g=e[3],S=e[7],m=e[11],h=e[15],C=l*x-c*u,P=o*x-c*f,y=o*u-l*f,w=a*x-c*d,A=a*u-l*d,b=a*f-o*d;return t*(S*C-m*P+h*y)-i*(g*C-m*w+h*A)+r*(g*P-S*w+h*b)-s*(g*y-S*A+m*b)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(s*d-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=e[9],u=e[10],x=e[11],g=e[12],S=e[13],m=e[14],h=e[15],C=t*o-i*a,P=t*l-r*a,y=t*c-s*a,w=i*l-r*o,A=i*c-s*o,b=r*c-s*l,p=d*S-f*g,v=d*m-u*g,E=d*h-x*g,R=f*m-u*S,N=f*h-x*S,q=u*h-x*m,J=C*q-P*N+y*R+w*E-A*v+b*p;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/J;return e[0]=(o*q-l*N+c*R)*B,e[1]=(r*N-i*q-s*R)*B,e[2]=(S*b-m*A+h*w)*B,e[3]=(u*A-f*b-x*w)*B,e[4]=(l*E-a*q-c*v)*B,e[5]=(t*q-r*E+s*v)*B,e[6]=(m*y-g*b-h*P)*B,e[7]=(d*b-u*y+x*P)*B,e[8]=(a*N-o*E+c*p)*B,e[9]=(i*E-t*N-s*p)*B,e[10]=(g*A-S*y+h*C)*B,e[11]=(f*y-d*A-x*C)*B,e[12]=(o*v-a*R-l*p)*B,e[13]=(t*R-i*v+r*p)*B,e[14]=(S*P-g*w-m*C)*B,e[15]=(d*w-f*P+u*C)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,f=o+o,u=s*c,x=s*d,g=s*f,S=a*d,m=a*f,h=o*f,C=l*c,P=l*d,y=l*f,w=i.x,A=i.y,b=i.z;return r[0]=(1-(S+h))*w,r[1]=(x+y)*w,r[2]=(g-P)*w,r[3]=0,r[4]=(x-y)*A,r[5]=(1-(u+h))*A,r[6]=(m+C)*A,r[7]=0,r[8]=(g+P)*b,r[9]=(m-C)*b,r[10]=(1-(u+S))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=xi.set(r[0],r[1],r[2]).length();const o=xi.set(r[4],r[5],r[6]).length(),l=xi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Qt.copy(this);const c=1/a,d=1/o,f=1/l;return Qt.elements[0]*=c,Qt.elements[1]*=c,Qt.elements[2]*=c,Qt.elements[4]*=d,Qt.elements[5]*=d,Qt.elements[6]*=d,Qt.elements[8]*=f,Qt.elements[9]*=f,Qt.elements[10]*=f,t.setFromRotationMatrix(Qt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=_n,l=!1){const c=this.elements,d=2*s/(t-e),f=2*s/(i-r),u=(t+e)/(t-e),x=(i+r)/(i-r);let g,S;if(l)g=s/(a-s),S=a*s/(a-s);else if(o===_n)g=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===xr)g=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=x,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=_n,l=!1){const c=this.elements,d=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),x=-(i+r)/(i-r);let g,S;if(l)g=1/(a-s),S=a/(a-s);else if(o===_n)g=-2/(a-s),S=-(a+s)/(a-s);else if(o===xr)g=-1/(a-s),S=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=x,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xi=new O,Qt=new rt,ud=new O(0,0,0),dd=new O(1,1,1),zn=new O,Lr=new O,Wt=new O,sl=new rt,al=new Ki;class Jn{constructor(e=0,t=0,i=0,r=Jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],f=r[2],u=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,x),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,x),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,x));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,x),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return al.setFromEuler(this),this.setFromQuaternion(al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jn.DEFAULT_ORDER="XYZ";class Po{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hd=0;const ol=new O,Mi=new Ki,yn=new rt,Dr=new O,er=new O,fd=new O,pd=new Ki,ll=new O(1,0,0),cl=new O(0,1,0),ul=new O(0,0,1),dl={type:"added"},md={type:"removed"},Si={type:"childadded",child:null},Fs={type:"childremoved",child:null};class wt extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new O,t=new Jn,i=new Ki,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ie}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Po,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(cl,e)}rotateZ(e){return this.rotateOnAxis(ul,e)}translateOnAxis(e,t){return ol.copy(e).applyQuaternion(this.quaternion),this.position.add(ol.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(cl,e)}translateZ(e){return this.translateOnAxis(ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Dr.copy(e):Dr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(er,Dr,this.up):yn.lookAt(Dr,er,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),Mi.setFromRotationMatrix(yn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dl),Si.child=e,this.dispatchEvent(Si),Si.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(md),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dl),Si.child=e,this.dispatchEvent(Si),Si.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,fd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,pd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),x=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),x.length>0&&(i.animations=x),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}wt.DEFAULT_UP=new O(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ut extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gd={type:"move"};class Os{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,i),h=this._getHandJoint(c,S);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),x=.02,g=.005;c.inputState.pinching&&u>x+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=x-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ut;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Bs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,ze.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ze.workingColorSpace){if(e=id(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Bs(a,s,e+1/3),this.g=Bs(a,s,e),this.b=Bs(a,s,e-1/3)}return ze.colorSpaceToWorking(this,r),this}setStyle(e,t=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=Ac[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return ze.workingToColorSpace(It.copy(this),e),Math.round(Ge(It.r*255,0,255))*65536+Math.round(Ge(It.g*255,0,255))*256+Math.round(Ge(It.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Gt){ze.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(Ur);const i=Is(Gn.h,Ur.h,t),r=Is(Gn.s,Ur.s,t),s=Is(Gn.l,Ur.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Ve;Ve.NAMES=Ac;class _d extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jt=new O,bn=new O,ks=new O,En=new O,yi=new O,bi=new O,hl=new O,zs=new O,Gs=new O,Hs=new O,Vs=new ot,Ws=new ot,Xs=new ot;class nn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jt.subVectors(e,t),r.cross(jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jt.subVectors(r,t),bn.subVectors(i,t),ks.subVectors(e,t);const a=jt.dot(jt),o=jt.dot(bn),l=jt.dot(ks),c=bn.dot(bn),d=bn.dot(ks),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,x=(c*l-o*d)*u,g=(a*d-o*l)*u;return s.set(1-x-g,g,x)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Vs.setScalar(0),Ws.setScalar(0),Xs.setScalar(0),Vs.fromBufferAttribute(e,t),Ws.fromBufferAttribute(e,i),Xs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Vs,s.x),a.addScaledVector(Ws,s.y),a.addScaledVector(Xs,s.z),a}static isFrontFacing(e,t,i,r){return jt.subVectors(i,t),bn.subVectors(e,t),jt.cross(bn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),jt.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;yi.subVectors(r,i),bi.subVectors(s,i),zs.subVectors(e,i);const l=yi.dot(zs),c=bi.dot(zs);if(l<=0&&c<=0)return t.copy(i);Gs.subVectors(e,r);const d=yi.dot(Gs),f=bi.dot(Gs);if(d>=0&&f<=d)return t.copy(r);const u=l*f-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(yi,a);Hs.subVectors(e,s);const x=yi.dot(Hs),g=bi.dot(Hs);if(g>=0&&x<=g)return t.copy(s);const S=x*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(bi,o);const m=d*g-x*f;if(m<=0&&f-d>=0&&x-g>=0)return hl.subVectors(s,r),o=(f-d)/(f-d+(x-g)),t.copy(r).addScaledVector(hl,o);const h=1/(m+S+u);return a=S*h,o=u*h,t.copy(i).addScaledVector(yi,a).addScaledVector(bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class pi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(s,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Nr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Nr.copy(i.boundingBox)),Nr.applyMatrix4(e.matrixWorld),this.union(Nr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Fr.subVectors(this.max,tr),Ei.subVectors(e.a,tr),Ti.subVectors(e.b,tr),Ai.subVectors(e.c,tr),Hn.subVectors(Ti,Ei),Vn.subVectors(Ai,Ti),ei.subVectors(Ei,Ai);let t=[0,-Hn.z,Hn.y,0,-Vn.z,Vn.y,0,-ei.z,ei.y,Hn.z,0,-Hn.x,Vn.z,0,-Vn.x,ei.z,0,-ei.x,-Hn.y,Hn.x,0,-Vn.y,Vn.x,0,-ei.y,ei.x,0];return!$s(t,Ei,Ti,Ai,Fr)||(t=[1,0,0,0,1,0,0,0,1],!$s(t,Ei,Ti,Ai,Fr))?!1:(Or.crossVectors(Hn,Vn),t=[Or.x,Or.y,Or.z],$s(t,Ei,Ti,Ai,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Tn=[new O,new O,new O,new O,new O,new O,new O,new O],en=new O,Nr=new pi,Ei=new O,Ti=new O,Ai=new O,Hn=new O,Vn=new O,ei=new O,tr=new O,Fr=new O,Or=new O,ti=new O;function $s(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ti.fromArray(n,s);const o=r.x*Math.abs(ti.x)+r.y*Math.abs(ti.y)+r.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),d=i.dot(ti);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const vt=new O,Br=new ke;let vd=0;class on extends fi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qo,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ji(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class wc extends on{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Rc extends on{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bt extends on{constructor(e,t,i){super(new Float32Array(e),t,i)}}const xd=new pi,nr=new O,qs=new O;class yr{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):xd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(nr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(qs)),this.expandByPoint(nr.copy(e.center).sub(qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Md=0;const Kt=new rt,Ys=new wt,wi=new O,Xt=new pi,ir=new pi,bt=new O;class ln extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Sr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ju(e)?Rc:wc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ie().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return Ys.lookAt(e),Ys.updateMatrix(),this.applyMatrix4(Ys.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Xt.min,ir.min),Xt.expandByPoint(bt),bt.addVectors(Xt.max,ir.max),Xt.expandByPoint(bt)):(Xt.expandByPoint(ir.min),Xt.expandByPoint(ir.max))}Xt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)bt.fromBufferAttribute(o,c),l&&(wi.fromBufferAttribute(e,c),bt.add(wi)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new on(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let p=0;p<i.count;p++)o[p]=new O,l[p]=new O;const c=new O,d=new O,f=new O,u=new ke,x=new ke,g=new ke,S=new O,m=new O;function h(p,v,E){c.fromBufferAttribute(i,p),d.fromBufferAttribute(i,v),f.fromBufferAttribute(i,E),u.fromBufferAttribute(s,p),x.fromBufferAttribute(s,v),g.fromBufferAttribute(s,E),d.sub(c),f.sub(c),x.sub(u),g.sub(u);const R=1/(x.x*g.y-g.x*x.y);isFinite(R)&&(S.copy(d).multiplyScalar(g.y).addScaledVector(f,-x.y).multiplyScalar(R),m.copy(f).multiplyScalar(x.x).addScaledVector(d,-g.x).multiplyScalar(R),o[p].add(S),o[v].add(S),o[E].add(S),l[p].add(m),l[v].add(m),l[E].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let p=0,v=C.length;p<v;++p){const E=C[p],R=E.start,N=E.count;for(let q=R,J=R+N;q<J;q+=3)h(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const P=new O,y=new O,w=new O,A=new O;function b(p){w.fromBufferAttribute(r,p),A.copy(w);const v=o[p];P.copy(v),P.sub(w.multiplyScalar(w.dot(v))).normalize(),y.crossVectors(A,v);const R=y.dot(l[p])<0?-1:1;a.setXYZW(p,P.x,P.y,P.z,R)}for(let p=0,v=C.length;p<v;++p){const E=C[p],R=E.start,N=E.count;for(let q=R,J=R+N;q<J;q+=3)b(e.getX(q+0)),b(e.getX(q+1)),b(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new on(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,x=i.count;u<x;u++)i.setXYZ(u,0,0,0);const r=new O,s=new O,a=new O,o=new O,l=new O,c=new O,d=new O,f=new O;if(e)for(let u=0,x=e.count;u<x;u+=3){const g=e.getX(u+0),S=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,x=t.count;u<x;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(l.length*d);let x=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?x=l[S]*o.data.stride+o.offset:x=l[S]*d;for(let h=0;h<d;h++)u[g++]=c[x++]}return new on(u,d,f)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ln,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],x=e(u,i);l.push(x)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,u=c.length;f<u;f++){const x=c[f];d.push(x.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let u=0,x=f.length;u<x;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sd=0;class br extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Sr(),this.name="",this.type="Material",this.blending=ki,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=xa,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(i.blending=this.blending),this.side!==Zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==va&&(i.blendSrc=this.blendSrc),this.blendDst!==xa&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const An=new O,Ks=new O,kr=new O,Wn=new O,Zs=new O,zr=new O,Js=new O;class Cc{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ks.copy(e).add(t).multiplyScalar(.5),kr.copy(t).sub(e).normalize(),Wn.copy(this.origin).sub(Ks);const s=e.distanceTo(t)*.5,a=-this.direction.dot(kr),o=Wn.dot(this.direction),l=-Wn.dot(kr),c=Wn.lengthSq(),d=Math.abs(1-a*a);let f,u,x,g;if(d>0)if(f=a*l-o,u=a*o-l,g=s*d,f>=0)if(u>=-g)if(u<=g){const S=1/d;f*=S,u*=S,x=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),x=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),x=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),x=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),x=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),x=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),x=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ks).addScaledVector(kr,u),x}intersectSphere(e,t){An.subVectors(e.center,this.origin);const i=An.dot(this.direction),r=An.dot(An)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,i,r,s){Zs.subVectors(t,e),zr.subVectors(i,e),Js.crossVectors(Zs,zr);let a=this.direction.dot(Js),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wn.subVectors(this.origin,e);const l=o*this.direction.dot(zr.crossVectors(Wn,zr));if(l<0)return null;const c=o*this.direction.dot(Zs.cross(Wn));if(c<0||l+c>a)return null;const d=-o*Wn.dot(Js);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Er extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fl=new rt,ni=new Cc,Gr=new yr,pl=new O,Hr=new O,Vr=new O,Wr=new O,Qs=new O,Xr=new O,ml=new O,$r=new O;class Et extends wt{constructor(e=new ln,t=new Er){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Xr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],f=s[l];d!==0&&(Qs.fromBufferAttribute(f,e),a?Xr.addScaledVector(Qs,d):Xr.addScaledVector(Qs.sub(t),d))}t.add(Xr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gr.copy(i.boundingSphere),Gr.applyMatrix4(s),ni.copy(e.ray).recast(e.near),!(Gr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Gr,pl)===null||ni.origin.distanceToSquared(pl)>(e.far-e.near)**2))&&(fl.copy(s).invert(),ni.copy(e.ray).applyMatrix4(fl),!(i.boundingBox!==null&&ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,u=s.groups,x=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,S=u.length;g<S;g++){const m=u[g],h=a[m.materialIndex],C=Math.max(m.start,x.start),P=Math.min(o.count,Math.min(m.start+m.count,x.start+x.count));for(let y=C,w=P;y<w;y+=3){const A=o.getX(y),b=o.getX(y+1),p=o.getX(y+2);r=qr(this,h,e,i,c,d,f,A,b,p),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,x.start),S=Math.min(o.count,x.start+x.count);for(let m=g,h=S;m<h;m+=3){const C=o.getX(m),P=o.getX(m+1),y=o.getX(m+2);r=qr(this,a,e,i,c,d,f,C,P,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,S=u.length;g<S;g++){const m=u[g],h=a[m.materialIndex],C=Math.max(m.start,x.start),P=Math.min(l.count,Math.min(m.start+m.count,x.start+x.count));for(let y=C,w=P;y<w;y+=3){const A=y,b=y+1,p=y+2;r=qr(this,h,e,i,c,d,f,A,b,p),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,x.start),S=Math.min(l.count,x.start+x.count);for(let m=g,h=S;m<h;m+=3){const C=m,P=m+1,y=m+2;r=qr(this,a,e,i,c,d,f,C,P,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function yd(n,e,t,i,r,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Zn,o),l===null)return null;$r.copy(o),$r.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo($r);return c<t.near||c>t.far?null:{distance:c,point:$r.clone(),object:n}}function qr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Hr),n.getVertexPosition(l,Vr),n.getVertexPosition(c,Wr);const d=yd(n,e,t,i,Hr,Vr,Wr,ml);if(d){const f=new O;nn.getBarycoord(ml,Hr,Vr,Wr,f),r&&(d.uv=nn.getInterpolatedAttribute(r,o,l,c,f,new ke)),s&&(d.uv1=nn.getInterpolatedAttribute(s,o,l,c,f,new ke)),a&&(d.normal=nn.getInterpolatedAttribute(a,o,l,c,f,new O),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new O,materialIndex:0};nn.getNormal(Hr,Vr,Wr,u.normal),d.face=u,d.barycoord=f}return d}class Io extends Ot{constructor(e=null,t=1,i=1,r,s,a,o,l,c=At,d=At,f,u){super(null,a,o,l,c,d,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gl extends on{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ri=new rt,_l=new rt,Yr=[],vl=new pi,bd=new rt,rr=new Et,sr=new yr;class Pc extends Et{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,bd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ri),vl.copy(e.boundingBox).applyMatrix4(Ri),this.boundingBox.union(vl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ri),sr.copy(e.boundingSphere).applyMatrix4(Ri),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(rr.geometry=this.geometry,rr.material=this.material,rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),e.ray.intersectsSphere(sr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ri),_l.multiplyMatrices(i,Ri),rr.matrixWorld=_l,rr.raycast(e,Yr);for(let a=0,o=Yr.length;a<o;a++){const l=Yr[a];l.instanceId=s,l.object=this,t.push(l)}Yr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Io(new Float32Array(r*this.count),r,this.count,bo,rn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const js=new O,Ed=new O,Td=new Ie;class ri{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=js.subVectors(i,t).cross(Ed.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(js),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Td.getNormalMatrix(e),r=this.coplanarPoint(js).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new yr,Ad=new ke(.5,.5),Kr=new O;class Lo{constructor(e=new ri,t=new ri,i=new ri,r=new ri,s=new ri,a=new ri){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=_n,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],d=s[4],f=s[5],u=s[6],x=s[7],g=s[8],S=s[9],m=s[10],h=s[11],C=s[12],P=s[13],y=s[14],w=s[15];if(r[0].setComponents(c-a,x-d,h-g,w-C).normalize(),r[1].setComponents(c+a,x+d,h+g,w+C).normalize(),r[2].setComponents(c+o,x+f,h+S,w+P).normalize(),r[3].setComponents(c-o,x-f,h-S,w-P).normalize(),i)r[4].setComponents(l,u,m,y).normalize(),r[5].setComponents(c-l,x-u,h-m,w-y).normalize();else if(r[4].setComponents(c-l,x-u,h-m,w-y).normalize(),t===_n)r[5].setComponents(c+l,x+u,h+m,w+y).normalize();else if(t===xr)r[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){ii.center.set(0,0,0);const t=Ad.distanceTo(e.center);return ii.radius=.7071067811865476+t,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Kr.x=r.normal.x>0?e.max.x:e.min.x,Kr.y=r.normal.y>0?e.max.y:e.min.y,Kr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ic extends Ot{constructor(e=[],t=di,i,r,s,a,o,l,c,d){super(e,t,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $i extends Ot{constructor(e,t,i=Mn,r,s,a,o=At,l=At,c,d=Nn,f=1){if(d!==Nn&&d!==ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Co(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wd extends $i{constructor(e,t=Mn,i=di,r,s,a=At,o=At,l,c=Nn){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Lc extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zi extends ln{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],f=[];let u=0,x=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(f,2));function g(S,m,h,C,P,y,w,A,b,p,v){const E=y/b,R=w/p,N=y/2,q=w/2,J=A/2,B=b+1,Y=p+1;let H=0,j=0;const te=new O;for(let he=0;he<Y;he++){const ge=he*R-q;for(let xe=0;xe<B;xe++){const Ye=xe*E-N;te[S]=Ye*C,te[m]=ge*P,te[h]=J,c.push(te.x,te.y,te.z),te[S]=0,te[m]=0,te[h]=A>0?1:-1,d.push(te.x,te.y,te.z),f.push(xe/b),f.push(1-he/p),H+=1}}for(let he=0;he<p;he++)for(let ge=0;ge<b;ge++){const xe=u+ge+B*he,Ye=u+ge+B*(he+1),lt=u+(ge+1)+B*(he+1),Ke=u+(ge+1)+B*he;l.push(xe,Ye,Ke),l.push(Ye,lt,Ke),j+=6}o.addGroup(x,j,v),x+=j,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _s extends ln{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],f=[],u=[],x=[];let g=0;const S=[],m=i/2;let h=0;C(),a===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(d),this.setAttribute("position",new Bt(f,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(x,2));function C(){const y=new O,w=new O;let A=0;const b=(t-e)/i;for(let p=0;p<=s;p++){const v=[],E=p/s,R=E*(t-e)+e;for(let N=0;N<=r;N++){const q=N/r,J=q*l+o,B=Math.sin(J),Y=Math.cos(J);w.x=R*B,w.y=-E*i+m,w.z=R*Y,f.push(w.x,w.y,w.z),y.set(B,b,Y).normalize(),u.push(y.x,y.y,y.z),x.push(q,1-E),v.push(g++)}S.push(v)}for(let p=0;p<r;p++)for(let v=0;v<s;v++){const E=S[v][p],R=S[v+1][p],N=S[v+1][p+1],q=S[v][p+1];(e>0||v!==0)&&(d.push(E,R,q),A+=3),(t>0||v!==s-1)&&(d.push(R,N,q),A+=3)}c.addGroup(h,A,0),h+=A}function P(y){const w=g,A=new ke,b=new O;let p=0;const v=y===!0?e:t,E=y===!0?1:-1;for(let N=1;N<=r;N++)f.push(0,m*E,0),u.push(0,E,0),x.push(.5,.5),g++;const R=g;for(let N=0;N<=r;N++){const J=N/r*l+o,B=Math.cos(J),Y=Math.sin(J);b.x=v*Y,b.y=m*E,b.z=v*B,f.push(b.x,b.y,b.z),u.push(0,E,0),A.x=B*.5+.5,A.y=Y*.5*E+.5,x.push(A.x,A.y),g++}for(let N=0;N<r;N++){const q=w+N,J=R+N;y===!0?d.push(J,J+1,q):d.push(J+1,J,q),p+=3}c.addGroup(h,p,y===!0?1:2),h+=p}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vs extends _s{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new vs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ji extends ln{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,f=e/o,u=t/l,x=[],g=[],S=[],m=[];for(let h=0;h<d;h++){const C=h*u-a;for(let P=0;P<c;P++){const y=P*f-s;g.push(y,-C,0),S.push(0,0,1),m.push(P/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let C=0;C<o;C++){const P=C+c*h,y=C+c*(h+1),w=C+1+c*(h+1),A=C+1+c*h;x.push(P,y,A),x.push(y,w,A)}this.setIndex(x),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(S,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.width,e.height,e.widthSegments,e.heightSegments)}}class fs extends ln{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],f=new O,u=new O,x=[],g=[],S=[],m=[];for(let h=0;h<=i;h++){const C=[],P=h/i,y=a+P*o,w=e*Math.cos(y),A=Math.sqrt(e*e-w*w);let b=0;h===0&&a===0?b=.5/t:h===i&&l===Math.PI&&(b=-.5/t);for(let p=0;p<=t;p++){const v=p/t,E=r+v*s;f.x=-A*Math.cos(E),f.y=w,f.z=A*Math.sin(E),g.push(f.x,f.y,f.z),u.copy(f).normalize(),S.push(u.x,u.y,u.z),m.push(v+b,1-P),C.push(c++)}d.push(C)}for(let h=0;h<i;h++)for(let C=0;C<t;C++){const P=d[h][C+1],y=d[h][C],w=d[h+1][C],A=d[h+1][C+1];(h!==0||a>0)&&x.push(P,y,A),(h!==i-1||l<Math.PI)&&x.push(y,w,A)}this.setIndex(x),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(S,3)),this.setAttribute("uv",new Bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function qi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(xl(r))r.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(xl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=qi(n[t]);for(const r in i)e[r]=i[r]}return e}function xl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Rd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Dc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}const Cd={clone:qi,merge:Nt};var Pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Id=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pd,this.fragmentShader=Id,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=Rd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(r.value);break;case"v2":this.uniforms[i].value=new ke().fromArray(r.value);break;case"v3":this.uniforms[i].value=new O().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"m4":this.uniforms[i].value=new rt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Ld extends Sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mt extends br{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ro,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Dd extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ud extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Uc extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Nd extends Uc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ea=new rt,Ml=new O,Sl=new O;class Fd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=qt,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lo,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),Sl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sl),t.updateMatrixWorld(),ea.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===xr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zr=new O,Jr=new Ki,hn=new O;class Nc extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zr,Jr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Zr,Jr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new O,yl=new ke,bl=new ke;class tn extends Nc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=so*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return so*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,yl,bl),t.subVectors(bl,yl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xs extends Nc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Od extends Fd{constructor(){super(new xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bd extends Uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Od}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ci=-90,Pi=1;class kd extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new tn(Ci,Pi,e,t);r.layers=this.layers,this.add(r);const s=new tn(Ci,Pi,e,t);s.layers=this.layers,this.add(s);const a=new tn(Ci,Pi,e,t);a.layers=this.layers,this.add(a);const o=new tn(Ci,Pi,e,t);o.layers=this.layers,this.add(o);const l=new tn(Ci,Pi,e,t);l.layers=this.layers,this.add(l);const c=new tn(Ci,Pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===_n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,x),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class zd extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const El=new rt;class Gd{constructor(e,t,i=0,r=1/0){this.ray=new Cc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Po,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):He("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return El.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(El),this}intersectObject(e,t=!0,i=[]){return ao(e,this,i,t),i.sort(Tl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ao(e[r],this,i,t);return i.sort(Tl),i}}function Tl(n,e){return n.distance-e.distance}function ao(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)ao(s[a],e,t,!0)}}class Fc{static{Fc.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Al(n,e,t,i){const r=Hd(i);switch(t){case yc:return n*e;case bo:return n*e/r.components*r.byteLength;case Eo:return n*e/r.components*r.byteLength;case hi:return n*e*2/r.components*r.byteLength;case To:return n*e*2/r.components*r.byteLength;case bc:return n*e*3/r.components*r.byteLength;case sn:return n*e*4/r.components*r.byteLength;case Ao:return n*e*4/r.components*r.byteLength;case ts:case ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case is:case rs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ca:case Ia:return Math.max(n,16)*Math.max(e,8)/4;case Ra:case Pa:return Math.max(n,8)*Math.max(e,8)/2;case La:case Da:case Na:case Fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ua:case ls:case Oa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case za:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Va:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case $a:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Za:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ja:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Qa:case ja:case eo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case to:case no:return Math.ceil(n/4)*Math.ceil(e/4)*8;case cs:case io:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hd(n){switch(n){case qt:case vc:return{byteLength:1,components:1};case _r:case xc:case Un:return{byteLength:2,components:1};case So:case yo:return{byteLength:2,components:4};case Mn:case Mo:case rn:return{byteLength:4,components:1};case Mc:case Sc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vo}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Oc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Vd(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let x;if(c instanceof Float32Array)x=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)x=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?x=n.HALF_FLOAT:x=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)x=n.SHORT;else if(c instanceof Uint32Array)x=n.UNSIGNED_INT;else if(c instanceof Int32Array)x=n.INT;else if(c instanceof Int8Array)x=n.BYTE;else if(c instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:x,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const d=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((x,g)=>x.start-g.start);let u=0;for(let x=1;x<f.length;x++){const g=f[u],S=f[x];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++u,f[u]=S)}f.length=u+1;for(let x=0,g=f.length;x<g;x++){const S=f[x];n.bufferSubData(c,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Wd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xd=`#ifdef USE_ALPHAHASH
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
#endif`,$d=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zd=`#ifdef USE_AOMAP
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
#endif`,Jd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qd=`#ifdef USE_BATCHING
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
#endif`,jd=`#ifdef USE_BATCHING
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
#endif`,hh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,fh=`#define PI 3.141592653589793
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
}`,yh=`#ifdef USE_ENVMAP
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
#endif`,bh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$h=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ef=`#if defined( USE_POINTS_UV )
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
#endif`,tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,of=`#ifdef USE_MORPHTARGETS
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
#endif`,lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,uf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,pf=`#ifdef USE_NORMALMAP
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
#endif`,mf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pf=`float getShadowMask() {
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
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lf=`#ifdef USE_SKINNING
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
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Of=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kf=`#ifdef USE_TRANSMISSION
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
#endif`,zf=`#ifdef USE_TRANSMISSION
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
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$f=`uniform sampler2D t2D;
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`#include <common>
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
}`,Qf=`#if DEPTH_PACKING == 3200
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
}`,jf=`#define DISTANCE
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
}`,ep=`#define DISTANCE
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
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ip=`uniform float scale;
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
}`,rp=`uniform vec3 diffuse;
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
}`,sp=`#include <common>
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
}`,ap=`uniform vec3 diffuse;
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
}`,op=`#define LAMBERT
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
}`,lp=`#define LAMBERT
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
}`,cp=`#define MATCAP
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
}`,up=`#define MATCAP
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
}`,dp=`#define NORMAL
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
}`,hp=`#define NORMAL
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
}`,fp=`#define PHONG
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
}`,pp=`#define PHONG
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
}`,mp=`#define STANDARD
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
}`,gp=`#define STANDARD
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
}`,_p=`#define TOON
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
}`,vp=`#define TOON
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
}`,xp=`uniform float size;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Sp=`#include <common>
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
}`,yp=`uniform vec3 color;
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
}`,bp=`uniform float rotation;
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
}`,Ep=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Wd,alphahash_pars_fragment:Xd,alphamap_fragment:$d,alphamap_pars_fragment:qd,alphatest_fragment:Yd,alphatest_pars_fragment:Kd,aomap_fragment:Zd,aomap_pars_fragment:Jd,batching_pars_vertex:Qd,batching_vertex:jd,begin_vertex:eh,beginnormal_vertex:th,bsdfs:nh,iridescence_fragment:ih,bumpmap_pars_fragment:rh,clipping_planes_fragment:sh,clipping_planes_pars_fragment:ah,clipping_planes_pars_vertex:oh,clipping_planes_vertex:lh,color_fragment:ch,color_pars_fragment:uh,color_pars_vertex:dh,color_vertex:hh,common:fh,cube_uv_reflection_fragment:ph,defaultnormal_vertex:mh,displacementmap_pars_vertex:gh,displacementmap_vertex:_h,emissivemap_fragment:vh,emissivemap_pars_fragment:xh,colorspace_fragment:Mh,colorspace_pars_fragment:Sh,envmap_fragment:yh,envmap_common_pars_fragment:bh,envmap_pars_fragment:Eh,envmap_pars_vertex:Th,envmap_physical_pars_fragment:Fh,envmap_vertex:Ah,fog_vertex:wh,fog_pars_vertex:Rh,fog_fragment:Ch,fog_pars_fragment:Ph,gradientmap_pars_fragment:Ih,lightmap_pars_fragment:Lh,lights_lambert_fragment:Dh,lights_lambert_pars_fragment:Uh,lights_pars_begin:Nh,lights_toon_fragment:Oh,lights_toon_pars_fragment:Bh,lights_phong_fragment:kh,lights_phong_pars_fragment:zh,lights_physical_fragment:Gh,lights_physical_pars_fragment:Hh,lights_fragment_begin:Vh,lights_fragment_maps:Wh,lights_fragment_end:Xh,lightprobes_pars_fragment:$h,logdepthbuf_fragment:qh,logdepthbuf_pars_fragment:Yh,logdepthbuf_pars_vertex:Kh,logdepthbuf_vertex:Zh,map_fragment:Jh,map_pars_fragment:Qh,map_particle_fragment:jh,map_particle_pars_fragment:ef,metalnessmap_fragment:tf,metalnessmap_pars_fragment:nf,morphinstance_vertex:rf,morphcolor_vertex:sf,morphnormal_vertex:af,morphtarget_pars_vertex:of,morphtarget_vertex:lf,normal_fragment_begin:cf,normal_fragment_maps:uf,normal_pars_fragment:df,normal_pars_vertex:hf,normal_vertex:ff,normalmap_pars_fragment:pf,clearcoat_normal_fragment_begin:mf,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:_f,iridescence_pars_fragment:vf,opaque_fragment:xf,packing:Mf,premultiplied_alpha_fragment:Sf,project_vertex:yf,dithering_fragment:bf,dithering_pars_fragment:Ef,roughnessmap_fragment:Tf,roughnessmap_pars_fragment:Af,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Rf,shadowmap_vertex:Cf,shadowmask_pars_fragment:Pf,skinbase_vertex:If,skinning_pars_vertex:Lf,skinning_vertex:Df,skinnormal_vertex:Uf,specularmap_fragment:Nf,specularmap_pars_fragment:Ff,tonemapping_fragment:Of,tonemapping_pars_fragment:Bf,transmission_fragment:kf,transmission_pars_fragment:zf,uv_pars_fragment:Gf,uv_pars_vertex:Hf,uv_vertex:Vf,worldpos_vertex:Wf,background_vert:Xf,background_frag:$f,backgroundCube_vert:qf,backgroundCube_frag:Yf,cube_vert:Kf,cube_frag:Zf,depth_vert:Jf,depth_frag:Qf,distance_vert:jf,distance_frag:ep,equirect_vert:tp,equirect_frag:np,linedashed_vert:ip,linedashed_frag:rp,meshbasic_vert:sp,meshbasic_frag:ap,meshlambert_vert:op,meshlambert_frag:lp,meshmatcap_vert:cp,meshmatcap_frag:up,meshnormal_vert:dp,meshnormal_frag:hp,meshphong_vert:fp,meshphong_frag:pp,meshphysical_vert:mp,meshphysical_frag:gp,meshtoon_vert:_p,meshtoon_frag:vp,points_vert:xp,points_frag:Mp,shadow_vert:Sp,shadow_frag:yp,sprite_vert:bp,sprite_frag:Ep},de={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},gn={basic:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Nt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Nt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Nt([de.points,de.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Nt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Nt([de.common,de.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Nt([de.sprite,de.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:Nt([de.common,de.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:Nt([de.lights,de.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};gn.physical={uniforms:Nt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Qr={r:0,b:0,g:0},Tp=new rt,Bc=new Ie;Bc.set(-1,0,0,0,1,0,0,0,1);function Ap(n,e,t,i,r,s){const a=new Ve(0);let o=r===!0?0:1,l,c,d=null,f=0,u=null;function x(C){let P=C.isScene===!0?C.background:null;if(P&&P.isTexture){const y=C.backgroundBlurriness>0;P=e.get(P,y)}return P}function g(C){let P=!1;const y=x(C);y===null?m(a,o):y&&y.isColor&&(m(y,1),P=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||P)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(C,P){const y=x(P);y&&(y.isCubeTexture||y.mapping===gs)?(c===void 0&&(c=new Et(new Zi(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:qi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tp.makeRotationFromEuler(P.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Bc),c.material.toneMapped=ze.getTransfer(y.colorSpace)!==Qe,(d!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Et(new Ji(2,2),new Sn({name:"BackgroundMaterial",uniforms:qi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.toneMapped=ze.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function m(C,P){C.getRGB(Qr,Dc(n)),t.buffers.color.setClear(Qr.r,Qr.g,Qr.b,P,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(C,P=1){a.set(C),o=P,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(C){o=C,m(a,o)},render:g,addToRenderList:S,dispose:h}}function wp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(R,N,q,J,B){let Y=!1;const H=f(R,J,q,N);s!==H&&(s=H,c(s.object)),Y=x(R,J,q,B),Y&&g(R,J,q,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(R,N,q,J),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function d(R){return n.deleteVertexArray(R)}function f(R,N,q,J){const B=J.wireframe===!0;let Y=i[N.id];Y===void 0&&(Y={},i[N.id]=Y);const H=R.isInstancedMesh===!0?R.id:0;let j=Y[H];j===void 0&&(j={},Y[H]=j);let te=j[q.id];te===void 0&&(te={},j[q.id]=te);let he=te[B];return he===void 0&&(he=u(l()),te[B]=he),he}function u(R){const N=[],q=[],J=[];for(let B=0;B<t;B++)N[B]=0,q[B]=0,J[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:q,attributeDivisors:J,object:R,attributes:{},index:null}}function x(R,N,q,J){const B=s.attributes,Y=N.attributes;let H=0;const j=q.getAttributes();for(const te in j)if(j[te].location>=0){const ge=B[te];let xe=Y[te];if(xe===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(xe=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(xe=R.instanceColor)),ge===void 0||ge.attribute!==xe||xe&&ge.data!==xe.data)return!0;H++}return s.attributesNum!==H||s.index!==J}function g(R,N,q,J){const B={},Y=N.attributes;let H=0;const j=q.getAttributes();for(const te in j)if(j[te].location>=0){let ge=Y[te];ge===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(ge=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(ge=R.instanceColor));const xe={};xe.attribute=ge,ge&&ge.data&&(xe.data=ge.data),B[te]=xe,H++}s.attributes=B,s.attributesNum=H,s.index=J}function S(){const R=s.newAttributes;for(let N=0,q=R.length;N<q;N++)R[N]=0}function m(R){h(R,0)}function h(R,N){const q=s.newAttributes,J=s.enabledAttributes,B=s.attributeDivisors;q[R]=1,J[R]===0&&(n.enableVertexAttribArray(R),J[R]=1),B[R]!==N&&(n.vertexAttribDivisor(R,N),B[R]=N)}function C(){const R=s.newAttributes,N=s.enabledAttributes;for(let q=0,J=N.length;q<J;q++)N[q]!==R[q]&&(n.disableVertexAttribArray(q),N[q]=0)}function P(R,N,q,J,B,Y,H){H===!0?n.vertexAttribIPointer(R,N,q,B,Y):n.vertexAttribPointer(R,N,q,J,B,Y)}function y(R,N,q,J){S();const B=J.attributes,Y=q.getAttributes(),H=N.defaultAttributeValues;for(const j in Y){const te=Y[j];if(te.location>=0){let he=B[j];if(he===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(he=R.instanceColor)),he!==void 0){const ge=he.normalized,xe=he.itemSize,Ye=e.get(he);if(Ye===void 0)continue;const lt=Ye.buffer,Ke=Ye.type,Q=Ye.bytesPerElement,se=Ke===n.INT||Ke===n.UNSIGNED_INT||he.gpuType===Mo;if(he.isInterleavedBufferAttribute){const ne=he.data,Pe=ne.stride,Le=he.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<te.locationSize;we++)h(te.location+we,ne.meshPerAttribute);R.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<te.locationSize;we++)m(te.location+we);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let we=0;we<te.locationSize;we++)P(te.location+we,xe/te.locationSize,Ke,ge,Pe*Q,(Le+xe/te.locationSize*we)*Q,se)}else{if(he.isInstancedBufferAttribute){for(let ne=0;ne<te.locationSize;ne++)h(te.location+ne,he.meshPerAttribute);R.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ne=0;ne<te.locationSize;ne++)m(te.location+ne);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let ne=0;ne<te.locationSize;ne++)P(te.location+ne,xe/te.locationSize,Ke,ge,xe*Q,xe/te.locationSize*ne*Q,se)}}else if(H!==void 0){const ge=H[j];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(te.location,ge);break;case 3:n.vertexAttrib3fv(te.location,ge);break;case 4:n.vertexAttrib4fv(te.location,ge);break;default:n.vertexAttrib1fv(te.location,ge)}}}}C()}function w(){v();for(const R in i){const N=i[R];for(const q in N){const J=N[q];for(const B in J){const Y=J[B];for(const H in Y)d(Y[H].object),delete Y[H];delete J[B]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const N=i[R.id];for(const q in N){const J=N[q];for(const B in J){const Y=J[B];for(const H in Y)d(Y[H].object),delete Y[H];delete J[B]}}delete i[R.id]}function b(R){for(const N in i){const q=i[N];for(const J in q){const B=q[J];if(B[R.id]===void 0)continue;const Y=B[R.id];for(const H in Y)d(Y[H].object),delete Y[H];delete B[R.id]}}}function p(R){for(const N in i){const q=i[N],J=R.isInstancedMesh===!0?R.id:0,B=q[J];if(B!==void 0){for(const Y in B){const H=B[Y];for(const j in H)d(H[j].object),delete H[j];delete B[Y]}delete q[J],Object.keys(q).length===0&&delete i[N]}}}function v(){E(),a=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:v,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:p,releaseStatesOfProgram:b,initAttributes:S,enableAttribute:m,disableUnusedAttributes:C}}function Rp(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let x=0;x<d;x++)u+=c[x];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Cp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==sn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const p=b===Un&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==qt&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==rn&&!p)}function l(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Ce("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),P=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:x,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:C,maxVaryings:P,maxFragmentUniforms:y,maxSamples:w,samples:A}}function Pp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ri,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const x=f.length!==0||u||i!==0||r;return r=u,i=f.length,x},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,x){const g=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?d(null):c();else{const C=s?0:i,P=C*4;let y=h.clippingState||null;l.value=y,y=d(g,u,P,x);for(let w=0;w!==P;++w)y[w]=t[w];h.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,x,g){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const h=x+S*4,C=u.matrixWorldInverse;o.getNormalMatrix(C),(m===null||m.length<h)&&(m=new Float32Array(h));for(let P=0,y=x;P!==S;++P,y+=4)a.copy(f[P]).applyMatrix4(C,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const Yn=4,wl=[.125,.215,.35,.446,.526,.582],ai=20,Ip=256,ar=new xs,Rl=new Ve;let ta=null,na=0,ia=0,ra=!1;const Lp=new O;class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Lp}=s;ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ta,na,ia),this._renderer.xr.enabled=ra,e.scissorTest=!1,Ii(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===di||e.mapping===Xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Un,format:sn,colorSpace:us,depthBuffer:!1},r=Pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Dp(s)),this._blurMaterial=Np(s,e,t),this._ggxMaterial=Up(s,e,t)}return r}_compileMaterial(e){const t=new Et(new ln,e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,i,r,s){const l=new tn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,x=f.toneMapping;f.getClearColor(Rl),f.toneMapping=vn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new Zi,new Er({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let h=!1;const C=e.background;C?C.isColor&&(m.color.copy(C),e.background=null,h=!0):(m.color.copy(Rl),h=!0);for(let P=0;P<6;P++){const y=P%3;y===0?(l.up.set(0,c[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[P],s.y,s.z)):y===1?(l.up.set(0,0,c[P]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[P],s.z)):(l.up.set(0,c[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[P]));const w=this._cubeSize;Ii(r,y*w,P>2?w:0,w,w),f.setRenderTarget(r),h&&f.render(S,l),f.render(e,l)}f.toneMapping=x,f.autoClear=u,e.background=C}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===di||e.mapping===Xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ii(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=0+c*1.25,x=f*u,{_lodMax:g}=this,S=this._sizeLods[i],m=3*S*(i>g-Yn?i-g+Yn:0),h=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=x,l.mipInt.value=g-t,Ii(s,m,h,3*S,2*S),r.setRenderTarget(s),r.render(o,ar),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ii(e,m,h,3*S,2*S),r.setRenderTarget(e),r.render(o,ar)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&He("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[r];f.material=c;const u=c.uniforms,x=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*x):2*Math.PI/(2*ai-1),S=s/g,m=isFinite(s)?1+Math.floor(d*S):ai;m>ai&&Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const h=[];let C=0;for(let b=0;b<ai;++b){const p=b/S,v=Math.exp(-p*p/2);h.push(v),b===0?C+=v:b<m&&(C+=2*v)}for(let b=0;b<h.length;b++)h[b]=h[b]/C;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:P}=this;u.dTheta.value=g,u.mipInt.value=P-i;const y=this._sizeLods[r],w=3*y*(r>P-Yn?r-P+Yn:0),A=4*(this._cubeSize-y);Ii(t,w,A,3*y,2*y),l.setRenderTarget(t),l.render(f,ar)}}function Dp(n){const e=[],t=[],i=[];let r=n;const s=n-Yn+1+wl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Yn?l=wl[a-n+Yn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),d=-c,f=1+c,u=[d,d,f,d,f,f,d,d,f,f,d,f],x=6,g=6,S=3,m=2,h=1,C=new Float32Array(S*g*x),P=new Float32Array(m*g*x),y=new Float32Array(h*g*x);for(let A=0;A<x;A++){const b=A%3*2/3-1,p=A>2?0:-1,v=[b,p,0,b+2/3,p,0,b+2/3,p+1,0,b,p,0,b+2/3,p+1,0,b,p+1,0];C.set(v,S*g*A),P.set(u,m*g*A);const E=[A,A,A,A,A,A];y.set(E,h*g*A)}const w=new ln;w.setAttribute("position",new on(C,S)),w.setAttribute("uv",new on(P,m)),w.setAttribute("faceIndex",new on(y,h)),i.push(new Et(w,null)),r>Yn&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Pl(n,e,t){const i=new xn(n,e,t);return i.texture.mapping=gs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ii(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Up(n,e,t){return new Sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ip,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Np(n,e,t){const i=new Float32Array(ai),r=new O(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Il(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ms(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ll(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ms(){return`

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
	`}class kc extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ic(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Zi(5,5,5),s=new Sn({name:"CubemapFromEquirect",uniforms:qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Ln});s.uniforms.tEquirect.value=t;const a=new Et(r,s),o=t.minFilter;return t.minFilter===li&&(t.minFilter=Dt),new kd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Fp(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,x=!1){return u==null?null:x?a(u):s(u)}function s(u){if(u&&u.isTexture){const x=u.mapping;if(x===ws||x===Rs)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const S=new kc(g.height);return S.fromEquirectangularTexture(n,u),e.set(u,S),u.addEventListener("dispose",c),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const x=u.mapping,g=x===ws||x===Rs,S=x===di||x===Xi;if(g||S){let m=t.get(u);const h=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new Cl(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const C=u.image;return g&&C&&C.height>0||S&&C&&l(C)?(i===null&&(i=new Cl(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,x){return x===ws?u.mapping=di:x===Rs&&(u.mapping=Xi),u}function l(u){let x=0;const g=6;for(let S=0;S<g;S++)u[S]!==void 0&&x++;return x===g}function c(u){const x=u.target;x.removeEventListener("dispose",c);const g=e.get(x);g!==void 0&&(e.delete(x),g.dispose())}function d(u){const x=u.target;x.removeEventListener("dispose",d);const g=t.get(x);g!==void 0&&(t.delete(x),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Op(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&zi("WebGLRenderer: "+i+" extension not supported."),r}}}function Bp(n,e,t,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const x=s.get(u);x&&(e.remove(x),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const x in u)e.update(u[x],n.ARRAY_BUFFER)}function c(f){const u=[],x=f.index,g=f.attributes.position;let S=0;if(g===void 0)return;if(x!==null){const C=x.array;S=x.version;for(let P=0,y=C.length;P<y;P+=3){const w=C[P+0],A=C[P+1],b=C[P+2];u.push(w,A,A,b,b,w)}}else{const C=g.array;S=g.version;for(let P=0,y=C.length/3-1;P<y;P+=3){const w=P+0,A=P+1,b=P+2;u.push(w,A,A,b,b,w)}}const m=new(g.count>=65535?Rc:wc)(u,1);m.version=S;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function d(f){const u=s.get(f);if(u){const x=f.index;x!==null&&u.version<x.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function kp(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,s,f*a),t.update(u,i,1)}function c(f,u,x){x!==0&&(n.drawElementsInstanced(i,u,s,f*a,x),t.update(u,i,x))}function d(f,u,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,x);let S=0;for(let m=0;m<x;m++)S+=u[m];t.update(S,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function zp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:He("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Gp(n,e,t){const i=new WeakMap,r=new ot;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let E=function(){p.dispose(),i.delete(o),o.removeEventListener("dispose",E)};var x=E;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],C=o.morphAttributes.normal||[],P=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),S===!0&&(y=2),m===!0&&(y=3);let w=o.attributes.position.count*y,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const b=new Float32Array(w*A*4*f),p=new Tc(b,w,A,f);p.type=rn,p.needsUpdate=!0;const v=y*4;for(let R=0;R<f;R++){const N=h[R],q=C[R],J=P[R],B=w*A*4*R;for(let Y=0;Y<N.count;Y++){const H=Y*v;g===!0&&(r.fromBufferAttribute(N,Y),b[B+H+0]=r.x,b[B+H+1]=r.y,b[B+H+2]=r.z,b[B+H+3]=0),S===!0&&(r.fromBufferAttribute(q,Y),b[B+H+4]=r.x,b[B+H+5]=r.y,b[B+H+6]=r.z,b[B+H+7]=0),m===!0&&(r.fromBufferAttribute(J,Y),b[B+H+8]=r.x,b[B+H+9]=r.y,b[B+H+10]=r.z,b[B+H+11]=J.itemSize===4?r.w:1)}}u={count:f,texture:p,size:new ke(w,A)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const S=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",S),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Hp(n,e,t,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const x=c.skeleton;s.get(x)!==d&&(x.update(),s.set(x,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Vp={[dc]:"LINEAR_TONE_MAPPING",[hc]:"REINHARD_TONE_MAPPING",[fc]:"CINEON_TONE_MAPPING",[xo]:"ACES_FILMIC_TONE_MAPPING",[mc]:"AGX_TONE_MAPPING",[gc]:"NEUTRAL_TONE_MAPPING",[pc]:"CUSTOM_TONE_MAPPING"};function Wp(n,e,t,i,r,s){const a=new xn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new $i(e,t):void 0}),o=new xn(e,t,{type:Un,depthBuffer:!1,stencilBuffer:!1}),l=new ln;l.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bt([0,2,0,0,2,0],2));const c=new Ld({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Et(l,c),f=new xs(-1,1,1,-1,0,1);let u=null,x=null,g=!1,S,m=null,h=[],C=!1;this.setSize=function(P,y){a.setSize(P,y),o.setSize(P,y);for(let w=0;w<h.length;w++){const A=h[w];A.setSize&&A.setSize(P,y)}},this.setEffects=function(P){h=P,C=h.length>0&&h[0].isRenderPass===!0;const y=a.width,w=a.height;for(let A=0;A<h.length;A++){const b=h[A];b.setSize&&b.setSize(y,w)}},this.begin=function(P,y){if(g||P.toneMapping===vn&&h.length===0)return!1;if(m=y,y!==null){const w=y.width,A=y.height;(a.width!==w||a.height!==A)&&this.setSize(w,A)}return C===!1&&P.setRenderTarget(a),S=P.toneMapping,P.toneMapping=vn,!0},this.hasRenderPass=function(){return C},this.end=function(P,y){P.toneMapping=S,g=!0;let w=a,A=o;for(let b=0;b<h.length;b++){const p=h[b];if(p.enabled!==!1&&(p.render(P,A,w,y),p.needsSwap!==!1)){const v=w;w=A,A=v}}if(u!==P.outputColorSpace||x!==P.toneMapping){u=P.outputColorSpace,x=P.toneMapping,c.defines={},ze.getTransfer(u)===Qe&&(c.defines.SRGB_TRANSFER="");const b=Vp[x];b&&(c.defines[b]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,P.setRenderTarget(m),P.render(d,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const zc=new Ot,oo=new $i(1,1),Gc=new Tc,Hc=new cd,Vc=new Ic,Dl=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function Qi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Dl[r];if(s===void 0&&(s=new Float32Array(r),Dl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ss(n,e){let t=Ul[e];t===void 0&&(t=new Int32Array(e),Ul[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Xp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $p(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function qp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Kp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Ol.set(i),n.uniformMatrix2fv(this.addr,!1,Ol),St(t,i)}}function Zp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Fl.set(i),n.uniformMatrix3fv(this.addr,!1,Fl),St(t,i)}}function Jp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Nl.set(i),n.uniformMatrix4fv(this.addr,!1,Nl),St(t,i)}}function Qp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function jp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function tm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function nm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function am(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(oo.compareFunction=t.isReversedDepthBuffer()?Ro:wo,s=oo):s=zc,t.setTexture2D(e||s,r)}function om(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Hc,r)}function lm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Vc,r)}function cm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Gc,r)}function um(n){switch(n){case 5126:return Xp;case 35664:return $p;case 35665:return qp;case 35666:return Yp;case 35674:return Kp;case 35675:return Zp;case 35676:return Jp;case 5124:case 35670:return Qp;case 35667:case 35671:return jp;case 35668:case 35672:return em;case 35669:case 35673:return tm;case 5125:return nm;case 36294:return im;case 36295:return rm;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return am;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return lm;case 36289:case 36303:case 36311:case 36292:return cm}}function dm(n,e){n.uniform1fv(this.addr,e)}function hm(n,e){const t=Qi(e,this.size,2);n.uniform2fv(this.addr,t)}function fm(n,e){const t=Qi(e,this.size,3);n.uniform3fv(this.addr,t)}function pm(n,e){const t=Qi(e,this.size,4);n.uniform4fv(this.addr,t)}function mm(n,e){const t=Qi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function gm(n,e){const t=Qi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function _m(n,e){const t=Qi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function vm(n,e){n.uniform1iv(this.addr,e)}function xm(n,e){n.uniform2iv(this.addr,e)}function Mm(n,e){n.uniform3iv(this.addr,e)}function Sm(n,e){n.uniform4iv(this.addr,e)}function ym(n,e){n.uniform1uiv(this.addr,e)}function bm(n,e){n.uniform2uiv(this.addr,e)}function Em(n,e){n.uniform3uiv(this.addr,e)}function Tm(n,e){n.uniform4uiv(this.addr,e)}function Am(n,e,t){const i=this.cache,r=e.length,s=Ss(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=oo:a=zc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function wm(n,e,t){const i=this.cache,r=e.length,s=Ss(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Hc,s[a])}function Rm(n,e,t){const i=this.cache,r=e.length,s=Ss(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Vc,s[a])}function Cm(n,e,t){const i=this.cache,r=e.length,s=Ss(t,r);Mt(i,s)||(n.uniform1iv(this.addr,s),St(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Gc,s[a])}function Pm(n){switch(n){case 5126:return dm;case 35664:return hm;case 35665:return fm;case 35666:return pm;case 35674:return mm;case 35675:return gm;case 35676:return _m;case 5124:case 35670:return vm;case 35667:case 35671:return xm;case 35668:case 35672:return Mm;case 35669:case 35673:return Sm;case 5125:return ym;case 36294:return bm;case 36295:return Em;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Cm}}class Im{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=um(t.type)}}class Lm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pm(t.type)}}class Dm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const sa=/(\w+)(\])?(\[|\.)?/g;function Bl(n,e){n.seq.push(e),n.map[e.id]=e}function Um(n,e,t){const i=n.name,r=i.length;for(sa.lastIndex=0;;){const s=sa.exec(i),a=sa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Bl(t,c===void 0?new Im(o,n,e):new Lm(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Dm(o),Bl(t,f)),t=f}}}class ss{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Um(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function kl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Nm=37297;let Fm=0;function Om(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const zl=new Ie;function Bm(n){ze._getMatrix(zl,ze.workingColorSpace,n);const e=`mat3( ${zl.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(n)){case ds:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Om(n.getShaderSource(e),o)}else return s}function km(n,e){const t=Bm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const zm={[dc]:"Linear",[hc]:"Reinhard",[fc]:"Cineon",[xo]:"ACESFilmic",[mc]:"AgX",[gc]:"Neutral",[pc]:"Custom"};function Gm(n,e){const t=zm[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jr=new O;function Hm(){ze.getLuminanceCoefficients(jr);const n=jr.x.toFixed(4),e=jr.y.toFixed(4),t=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function Wm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Xm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function dr(n){return n!==""}function Hl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function lo(n){return n.replace($m,Ym)}const qm=new Map;function Ym(n,e){let t=Ne[e];if(t===void 0){const i=qm.get(e);if(i!==void 0)t=Ne[i],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return lo(t)}const Km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(Km,Zm)}function Zm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Jm={[es]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function Qm(n){return Jm[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jm={[di]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE_UV"};function e0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":jm[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const t0={[Xi]:"ENVMAP_MODE_REFRACTION"};function n0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":t0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const i0={[uc]:"ENVMAP_BLENDING_MULTIPLY",[Hu]:"ENVMAP_BLENDING_MIX",[Vu]:"ENVMAP_BLENDING_ADD"};function r0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":i0[n.combine]||"ENVMAP_BLENDING_NONE"}function s0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function a0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Qm(t),c=e0(t),d=n0(t),f=r0(t),u=s0(t),x=Vm(t),g=Wm(s),S=r.createProgram();let m,h,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),h.length>0&&(h+=`
`)):(m=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),h=[Xl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==vn?Gm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,km("linearToOutputTexel",t.outputColorSpace),Hm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dr).join(`
`)),a=lo(a),a=Hl(a,t),a=Vl(a,t),o=lo(o),o=Hl(o,t),o=Vl(o,t),a=Wl(a),o=Wl(o),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const P=C+m+a,y=C+h+o,w=kl(r,r.VERTEX_SHADER,P),A=kl(r,r.FRAGMENT_SHADER,y);r.attachShader(S,w),r.attachShader(S,A),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function b(R){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(S)||"",q=r.getShaderInfoLog(w)||"",J=r.getShaderInfoLog(A)||"",B=N.trim(),Y=q.trim(),H=J.trim();let j=!0,te=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,S,w,A);else{const he=Gl(r,w,"vertex"),ge=Gl(r,A,"fragment");He("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+he+`
`+ge)}else B!==""?Ce("WebGLProgram: Program Info Log:",B):(Y===""||H==="")&&(te=!1);te&&(R.diagnostics={runnable:j,programLog:B,vertexShader:{log:Y,prefix:m},fragmentShader:{log:H,prefix:h}})}r.deleteShader(w),r.deleteShader(A),p=new ss(r,S),v=Xm(r,S)}let p;this.getUniforms=function(){return p===void 0&&b(this),p};let v;this.getAttributes=function(){return v===void 0&&b(this),v};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(S,Nm)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fm++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=A,this}let o0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new c0(e),t.set(e,i)),i}}class c0{constructor(e){this.id=o0++,this.code=e,this.usedTimes=0}}function u0(n){return n===hi||n===ls||n===cs}function d0(n,e,t,i,r,s){const a=new Po,o=new l0,l=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(p){return l.add(p),p===0?"uv":`uv${p}`}function S(p,v,E,R,N,q){const J=R.fog,B=N.geometry,Y=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?R.environment:null,H=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,j=e.get(p.envMap||Y,H),te=j&&j.mapping===gs?j.image.height:null,he=x[p.type];p.precision!==null&&(u=i.getMaxPrecision(p.precision),u!==p.precision&&Ce("WebGLProgram.getParameters:",p.precision,"not supported, using",u,"instead."));const ge=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xe=ge!==void 0?ge.length:0;let Ye=0;B.morphAttributes.position!==void 0&&(Ye=1),B.morphAttributes.normal!==void 0&&(Ye=2),B.morphAttributes.color!==void 0&&(Ye=3);let lt,Ke,Q,se;if(he){const Me=gn[he];lt=Me.vertexShader,Ke=Me.fragmentShader}else{lt=p.vertexShader,Ke=p.fragmentShader;const Me=o.getVertexShaderStage(p),ut=o.getFragmentShaderStage(p);o.update(p,Me,ut),Q=Me.id,se=ut.id}const ne=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Le=N.isInstancedMesh===!0,we=N.isBatchedMesh===!0,ht=!!p.map,Oe=!!p.matcap,tt=!!j,Ze=!!p.aoMap,We=!!p.lightMap,gt=!!p.bumpMap&&p.wireframe===!1,xt=!!p.normalMap,yt=!!p.displacementMap,Tt=!!p.emissiveMap,ct=!!p.metalnessMap,_t=!!p.roughnessMap,D=p.anisotropy>0,kt=p.clearcoat>0,Je=p.dispersion>0,T=p.iridescence>0,_=p.sheen>0,F=p.transmission>0,G=D&&!!p.anisotropyMap,X=kt&&!!p.clearcoatMap,ie=kt&&!!p.clearcoatNormalMap,ae=kt&&!!p.clearcoatRoughnessMap,$=T&&!!p.iridescenceMap,Z=T&&!!p.iridescenceThicknessMap,oe=_&&!!p.sheenColorMap,be=_&&!!p.sheenRoughnessMap,ue=!!p.specularMap,le=!!p.specularColorMap,Ae=!!p.specularIntensityMap,Re=F&&!!p.transmissionMap,De=F&&!!p.thicknessMap,L=!!p.gradientMap,re=!!p.alphaMap,K=p.alphaTest>0,ce=!!p.alphaHash,me=!!p.extensions;let ee=vn;p.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ee=n.toneMapping);const ye={shaderID:he,shaderType:p.type,shaderName:p.name,vertexShader:lt,fragmentShader:Ke,defines:p.defines,customVertexShaderID:Q,customFragmentShaderID:se,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:u,batching:we,batchingColor:we&&N._colorsTexture!==null,instancing:Le,instancingColor:Le&&N.instanceColor!==null,instancingMorph:Le&&N.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:ht,matcap:Oe,envMap:tt,envMapMode:tt&&j.mapping,envMapCubeUVHeight:te,aoMap:Ze,lightMap:We,bumpMap:gt,normalMap:xt,displacementMap:yt,emissiveMap:Tt,normalMapObjectSpace:xt&&p.normalMapType===$u,normalMapTangentSpace:xt&&p.normalMapType===ro,packedNormalMap:xt&&p.normalMapType===ro&&u0(p.normalMap.format),metalnessMap:ct,roughnessMap:_t,anisotropy:D,anisotropyMap:G,clearcoat:kt,clearcoatMap:X,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:Je,iridescence:T,iridescenceMap:$,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:oe,sheenRoughnessMap:be,specularMap:ue,specularColorMap:le,specularIntensityMap:Ae,transmission:F,transmissionMap:Re,thicknessMap:De,gradientMap:L,opaque:p.transparent===!1&&p.blending===ki&&p.alphaToCoverage===!1,alphaMap:re,alphaTest:K,alphaHash:ce,combine:p.combine,mapUv:ht&&g(p.map.channel),aoMapUv:Ze&&g(p.aoMap.channel),lightMapUv:We&&g(p.lightMap.channel),bumpMapUv:gt&&g(p.bumpMap.channel),normalMapUv:xt&&g(p.normalMap.channel),displacementMapUv:yt&&g(p.displacementMap.channel),emissiveMapUv:Tt&&g(p.emissiveMap.channel),metalnessMapUv:ct&&g(p.metalnessMap.channel),roughnessMapUv:_t&&g(p.roughnessMap.channel),anisotropyMapUv:G&&g(p.anisotropyMap.channel),clearcoatMapUv:X&&g(p.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(p.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(p.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(p.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(p.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(p.sheenRoughnessMap.channel),specularMapUv:ue&&g(p.specularMap.channel),specularColorMapUv:le&&g(p.specularColorMap.channel),specularIntensityMapUv:Ae&&g(p.specularIntensityMap.channel),transmissionMapUv:Re&&g(p.transmissionMap.channel),thicknessMapUv:De&&g(p.thicknessMap.channel),alphaMapUv:re&&g(p.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(xt||D),vertexNormals:!!B.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!B.attributes.uv&&(ht||re),fog:!!J,useFog:p.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||B.attributes.normal===void 0&&xt===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Pe,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ye,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:p.dithering,shadowMapEnabled:n.shadowMap.enabled&&E.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:ht&&p.map.isVideoTexture===!0&&ze.getTransfer(p.map.colorSpace)===Qe,decodeVideoTextureEmissive:Tt&&p.emissiveMap.isVideoTexture===!0&&ze.getTransfer(p.emissiveMap.colorSpace)===Qe,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Rn,flipSided:p.side===Ht,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:me&&p.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&p.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return ye.vertexUv1s=l.has(1),ye.vertexUv2s=l.has(2),ye.vertexUv3s=l.has(3),l.clear(),ye}function m(p){const v=[];if(p.shaderID?v.push(p.shaderID):(v.push(p.customVertexShaderID),v.push(p.customFragmentShaderID)),p.defines!==void 0)for(const E in p.defines)v.push(E),v.push(p.defines[E]);return p.isRawShaderMaterial===!1&&(h(v,p),C(v,p),v.push(n.outputColorSpace)),v.push(p.customProgramCacheKey),v.join()}function h(p,v){p.push(v.precision),p.push(v.outputColorSpace),p.push(v.envMapMode),p.push(v.envMapCubeUVHeight),p.push(v.mapUv),p.push(v.alphaMapUv),p.push(v.lightMapUv),p.push(v.aoMapUv),p.push(v.bumpMapUv),p.push(v.normalMapUv),p.push(v.displacementMapUv),p.push(v.emissiveMapUv),p.push(v.metalnessMapUv),p.push(v.roughnessMapUv),p.push(v.anisotropyMapUv),p.push(v.clearcoatMapUv),p.push(v.clearcoatNormalMapUv),p.push(v.clearcoatRoughnessMapUv),p.push(v.iridescenceMapUv),p.push(v.iridescenceThicknessMapUv),p.push(v.sheenColorMapUv),p.push(v.sheenRoughnessMapUv),p.push(v.specularMapUv),p.push(v.specularColorMapUv),p.push(v.specularIntensityMapUv),p.push(v.transmissionMapUv),p.push(v.thicknessMapUv),p.push(v.combine),p.push(v.fogExp2),p.push(v.sizeAttenuation),p.push(v.morphTargetsCount),p.push(v.morphAttributeCount),p.push(v.numDirLights),p.push(v.numPointLights),p.push(v.numSpotLights),p.push(v.numSpotLightMaps),p.push(v.numHemiLights),p.push(v.numRectAreaLights),p.push(v.numDirLightShadows),p.push(v.numPointLightShadows),p.push(v.numSpotLightShadows),p.push(v.numSpotLightShadowsWithMaps),p.push(v.numLightProbes),p.push(v.shadowMapType),p.push(v.toneMapping),p.push(v.numClippingPlanes),p.push(v.numClipIntersection),p.push(v.depthPacking)}function C(p,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),p.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),p.push(a.mask)}function P(p){const v=x[p.type];let E;if(v){const R=gn[v];E=Cd.clone(R.uniforms)}else E=p.uniforms;return E}function y(p,v){let E=d.get(v);return E!==void 0?++E.usedTimes:(E=new a0(n,v,p,r),c.push(E),d.set(v,E)),E}function w(p){if(--p.usedTimes===0){const v=c.indexOf(p);c[v]=c[c.length-1],c.pop(),d.delete(p.cacheKey),p.destroy()}}function A(p){o.remove(p)}function b(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:P,acquireProgram:y,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:b}}function h0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function f0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function $l(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ql(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let x=0;return u.isInstancedMesh&&(x+=2),u.isSkinnedMesh&&(x+=1),x}function o(u,x,g,S,m,h){let C=n[e];return C===void 0?(C={id:u.id,object:u,geometry:x,material:g,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:h},n[e]=C):(C.id=u.id,C.object=u,C.geometry=x,C.material=g,C.materialVariant=a(u),C.groupOrder=S,C.renderOrder=u.renderOrder,C.z=m,C.group=h),e++,C}function l(u,x,g,S,m,h){const C=o(u,x,g,S,m,h);g.transmission>0?i.push(C):g.transparent===!0?r.push(C):t.push(C)}function c(u,x,g,S,m,h){const C=o(u,x,g,S,m,h);g.transmission>0?i.unshift(C):g.transparent===!0?r.unshift(C):t.unshift(C)}function d(u,x,g){t.length>1&&t.sort(u||f0),i.length>1&&i.sort(x||$l),r.length>1&&r.sort(x||$l),g&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let u=e,x=n.length;u<x;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:d}}function p0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new ql,n.set(i,[a])):r>=s.length?(a=new ql,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function m0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ve};break;case"SpotLight":t={position:new O,direction:new O,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function g0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let _0=0;function v0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function x0(n){const e=new m0,t=g0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new rt,a=new rt;function o(c){let d=0,f=0,u=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let x=0,g=0,S=0,m=0,h=0,C=0,P=0,y=0,w=0,A=0,b=0;c.sort(v0);for(let v=0,E=c.length;v<E;v++){const R=c[v],N=R.color,q=R.intensity,J=R.distance;let B=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===hi?B=R.shadow.map.texture:B=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=N.r*q,f+=N.g*q,u+=N.b*q;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(R.sh.coefficients[Y],q);b++}else if(R.isDirectionalLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const H=R.shadow,j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.directionalShadow[x]=j,i.directionalShadowMap[x]=B,i.directionalShadowMatrix[x]=R.shadow.matrix,C++}i.directional[x]=Y,x++}else if(R.isSpotLight){const Y=e.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(N).multiplyScalar(q),Y.distance=J,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,i.spot[S]=Y;const H=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,H.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[S]=H.matrix,R.castShadow){const j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.spotShadow[S]=j,i.spotShadowMap[S]=B,y++}S++}else if(R.isRectAreaLight){const Y=e.get(R);Y.color.copy(N).multiplyScalar(q),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=Y,m++}else if(R.isPointLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const H=R.shadow,j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=R.shadow.matrix,P++}i.point[g]=Y,g++}else if(R.isHemisphereLight){const Y=e.get(R);Y.skyColor.copy(R.color).multiplyScalar(q),Y.groundColor.copy(R.groundColor).multiplyScalar(q),i.hemi[h]=Y,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const p=i.hash;(p.directionalLength!==x||p.pointLength!==g||p.spotLength!==S||p.rectAreaLength!==m||p.hemiLength!==h||p.numDirectionalShadows!==C||p.numPointShadows!==P||p.numSpotShadows!==y||p.numSpotMaps!==w||p.numLightProbes!==b)&&(i.directional.length=x,i.spot.length=S,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=P,i.pointShadowMap.length=P,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=P,i.spotLightMatrix.length=y+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=b,p.directionalLength=x,p.pointLength=g,p.spotLength=S,p.rectAreaLength=m,p.hemiLength=h,p.numDirectionalShadows=C,p.numPointShadows=P,p.numSpotShadows=y,p.numSpotMaps=w,p.numLightProbes=b,i.version=_0++)}function l(c,d){let f=0,u=0,x=0,g=0,S=0;const m=d.matrixWorldInverse;for(let h=0,C=c.length;h<C;h++){const P=c[h];if(P.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(P.isSpotLight){const y=i.spot[x];y.position.setFromMatrixPosition(P.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(P.matrixWorld),r.setFromMatrixPosition(P.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),x++}else if(P.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(P.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(P.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(P.width*.5,0,0),y.halfHeight.set(0,P.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(P.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(P.matrixWorld),y.position.applyMatrix4(m),u++}else if(P.isHemisphereLight){const y=i.hemi[S];y.direction.setFromMatrixPosition(P.matrixWorld),y.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:i}}function Yl(n){const e=new x0(n),t=[],i=[],r=[];function s(u){f.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function M0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Yl(n),e.set(r,[o])):s>=a.length?(o=new Yl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const S0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y0=`uniform sampler2D shadow_pass;
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
}`,b0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],E0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Kl=new rt,or=new O,aa=new O;function T0(n,e,t){let i=new Lo;const r=new ke,s=new ke,a=new ot,o=new Dd,l=new Ud,c={},d=t.maxTextureSize,f={[Zn]:Ht,[Ht]:Zn,[Rn]:Rn},u=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:S0,fragmentShader:y0}),x=u.clone();x.defines.HORIZONTAL_PASS=1;const g=new ln;g.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Et(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=es;let h=this.type;this.render=function(A,b,p){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===cc&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=es);const v=n.getRenderTarget(),E=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Ln),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const q=h!==this.type;q&&b.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(B=>B.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,B=A.length;J<B;J++){const Y=A[J],H=Y.shadow;if(H===void 0){Ce("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const j=H.getFrameExtents();r.multiply(j),s.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/j.x),r.x=s.x*j.x,H.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/j.y),r.y=s.y*j.y,H.mapSize.y=s.y));const te=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=te,H.map===null||q===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ur){if(Y.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new xn(r.x,r.y,{format:hi,type:Un,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new $i(r.x,r.y,rn),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=Nn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At}else Y.isPointLight?(H.map=new kc(r.x),H.map.depthTexture=new wd(r.x,Mn)):(H.map=new xn(r.x,r.y),H.map.depthTexture=new $i(r.x,r.y,Mn)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=Nn,this.type===es?(H.map.depthTexture.compareFunction=te?Ro:wo,H.map.depthTexture.minFilter=Dt,H.map.depthTexture.magFilter=Dt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At);H.camera.updateProjectionMatrix()}const he=H.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<he;ge++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(H.map),n.clear());const xe=H.getViewport(ge);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),N.viewport(a)}if(Y.isPointLight){const xe=H.camera,Ye=H.matrix,lt=Y.distance||xe.far;lt!==xe.far&&(xe.far=lt,xe.updateProjectionMatrix()),or.setFromMatrixPosition(Y.matrixWorld),xe.position.copy(or),aa.copy(xe.position),aa.add(b0[ge]),xe.up.copy(E0[ge]),xe.lookAt(aa),xe.updateMatrixWorld(),Ye.makeTranslation(-or.x,-or.y,-or.z),Kl.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Kl,xe.coordinateSystem,xe.reversedDepth)}else H.updateMatrices(Y);i=H.getFrustum(),y(b,p,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===ur&&C(H,p),H.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(v,E,R)};function C(A,b){const p=e.update(S);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,x.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,x.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new xn(r.x,r.y,{format:hi,type:Un})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(b,null,p,u,S,null),x.uniforms.shadow_pass.value=A.mapPass.texture,x.uniforms.resolution.value=A.mapSize,x.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(b,null,p,x,S,null)}function P(A,b,p,v){let E=null;const R=p.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)E=R;else if(E=p.isPointLight===!0?l:o,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const N=E.uuid,q=b.uuid;let J=c[N];J===void 0&&(J={},c[N]=J);let B=J[q];B===void 0&&(B=E.clone(),J[q]=B,b.addEventListener("dispose",w)),E=B}if(E.visible=b.visible,E.wireframe=b.wireframe,v===ur?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:f[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,p.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const N=n.properties.get(E);N.light=p}return E}function y(A,b,p,v,E){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===ur)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,A.matrixWorld);const q=e.update(A),J=A.material;if(Array.isArray(J)){const B=q.groups;for(let Y=0,H=B.length;Y<H;Y++){const j=B[Y],te=J[j.materialIndex];if(te&&te.visible){const he=P(A,te,v,E);A.onBeforeShadow(n,A,b,p,q,he,j),n.renderBufferDirect(p,null,q,he,A,j),A.onAfterShadow(n,A,b,p,q,he,j)}}}else if(J.visible){const B=P(A,J,v,E);A.onBeforeShadow(n,A,b,p,q,B,null),n.renderBufferDirect(p,null,q,B,A,null),A.onAfterShadow(n,A,b,p,q,B,null)}}const N=A.children;for(let q=0,J=N.length;q<J;q++)y(N[q],b,p,v,E)}function w(A){A.target.removeEventListener("dispose",w);for(const p in c){const v=c[p],E=A.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function A0(n,e){function t(){let L=!1;const re=new ot;let K=null;const ce=new ot(0,0,0,0);return{setMask:function(me){K!==me&&!L&&(n.colorMask(me,me,me,me),K=me)},setLocked:function(me){L=me},setClear:function(me,ee,ye,Me,ut){ut===!0&&(me*=Me,ee*=Me,ye*=Me),re.set(me,ee,ye,Me),ce.equals(re)===!1&&(n.clearColor(me,ee,ye,Me),ce.copy(re))},reset:function(){L=!1,K=null,ce.set(-1,0,0,0)}}}function i(){let L=!1,re=!1,K=null,ce=null,me=null;return{setReversed:function(ee){if(re!==ee){const ye=e.get("EXT_clip_control");ee?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),re=ee;const Me=me;me=null,this.setClear(Me)}},getReversed:function(){return re},setTest:function(ee){ee?ne(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ee){K!==ee&&!L&&(n.depthMask(ee),K=ee)},setFunc:function(ee){if(re&&(ee=nd[ee]),ce!==ee){switch(ee){case Ma:n.depthFunc(n.NEVER);break;case Sa:n.depthFunc(n.ALWAYS);break;case ya:n.depthFunc(n.LESS);break;case Wi:n.depthFunc(n.LEQUAL);break;case ba:n.depthFunc(n.EQUAL);break;case Ea:n.depthFunc(n.GEQUAL);break;case Ta:n.depthFunc(n.GREATER);break;case Aa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=ee}},setLocked:function(ee){L=ee},setClear:function(ee){me!==ee&&(me=ee,re&&(ee=1-ee),n.clearDepth(ee))},reset:function(){L=!1,K=null,ce=null,me=null,re=!1}}}function r(){let L=!1,re=null,K=null,ce=null,me=null,ee=null,ye=null,Me=null,ut=null;return{setTest:function(st){L||(st?ne(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(st){re!==st&&!L&&(n.stencilMask(st),re=st)},setFunc:function(st,cn,un){(K!==st||ce!==cn||me!==un)&&(n.stencilFunc(st,cn,un),K=st,ce=cn,me=un)},setOp:function(st,cn,un){(ee!==st||ye!==cn||Me!==un)&&(n.stencilOp(st,cn,un),ee=st,ye=cn,Me=un)},setLocked:function(st){L=st},setClear:function(st){ut!==st&&(n.clearStencil(st),ut=st)},reset:function(){L=!1,re=null,K=null,ce=null,me=null,ee=null,ye=null,Me=null,ut=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},f={},u={},x=new WeakMap,g=[],S=null,m=!1,h=null,C=null,P=null,y=null,w=null,A=null,b=null,p=new Ve(0,0,0),v=0,E=!1,R=null,N=null,q=null,J=null,B=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,j=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(te)[1]),H=j>=1):te.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),H=j>=2);let he=null,ge={};const xe=n.getParameter(n.SCISSOR_BOX),Ye=n.getParameter(n.VIEWPORT),lt=new ot().fromArray(xe),Ke=new ot().fromArray(Ye);function Q(L,re,K,ce){const me=new Uint8Array(4),ee=n.createTexture();n.bindTexture(L,ee),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<K;ye++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(re+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return ee}const se={};se[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(Wi),gt(!1),xt(qo),ne(n.CULL_FACE),Ze(Ln);function ne(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Pe(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Le(L,re){return u[L]!==re?(n.bindFramebuffer(L,re),u[L]=re,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=re),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=re),!0):!1}function we(L,re){let K=g,ce=!1;if(L){K=x.get(re),K===void 0&&(K=[],x.set(re,K));const me=L.textures;if(K.length!==me.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,ye=me.length;ee<ye;ee++)K[ee]=n.COLOR_ATTACHMENT0+ee;K.length=me.length,ce=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ce=!0);ce&&n.drawBuffers(K)}function ht(L){return S!==L?(n.useProgram(L),S=L,!0):!1}const Oe={[si]:n.FUNC_ADD,[Tu]:n.FUNC_SUBTRACT,[Au]:n.FUNC_REVERSE_SUBTRACT};Oe[wu]=n.MIN,Oe[Ru]=n.MAX;const tt={[Cu]:n.ZERO,[Pu]:n.ONE,[Iu]:n.SRC_COLOR,[va]:n.SRC_ALPHA,[Ou]:n.SRC_ALPHA_SATURATE,[Nu]:n.DST_COLOR,[Du]:n.DST_ALPHA,[Lu]:n.ONE_MINUS_SRC_COLOR,[xa]:n.ONE_MINUS_SRC_ALPHA,[Fu]:n.ONE_MINUS_DST_COLOR,[Uu]:n.ONE_MINUS_DST_ALPHA,[Bu]:n.CONSTANT_COLOR,[ku]:n.ONE_MINUS_CONSTANT_COLOR,[zu]:n.CONSTANT_ALPHA,[Gu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ze(L,re,K,ce,me,ee,ye,Me,ut,st){if(L===Ln){m===!0&&(Pe(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),L!==Eu){if(L!==h||st!==E){if((C!==si||w!==si)&&(n.blendEquation(n.FUNC_ADD),C=si,w=si),st)switch(L){case ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yo:n.blendFunc(n.ONE,n.ONE);break;case Ko:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:He("WebGLState: Invalid blending: ",L);break}else switch(L){case ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ko:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zo:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",L);break}P=null,y=null,A=null,b=null,p.set(0,0,0),v=0,h=L,E=st}return}me=me||re,ee=ee||K,ye=ye||ce,(re!==C||me!==w)&&(n.blendEquationSeparate(Oe[re],Oe[me]),C=re,w=me),(K!==P||ce!==y||ee!==A||ye!==b)&&(n.blendFuncSeparate(tt[K],tt[ce],tt[ee],tt[ye]),P=K,y=ce,A=ee,b=ye),(Me.equals(p)===!1||ut!==v)&&(n.blendColor(Me.r,Me.g,Me.b,ut),p.copy(Me),v=ut),h=L,E=!1}function We(L,re){L.side===Rn?Pe(n.CULL_FACE):ne(n.CULL_FACE);let K=L.side===Ht;re&&(K=!K),gt(K),L.blending===ki&&L.transparent===!1?Ze(Ln):Ze(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const ce=L.stencilWrite;o.setTest(ce),ce&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Tt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function gt(L){R!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),R=L)}function xt(L){L!==yu?(ne(n.CULL_FACE),L!==N&&(L===qo?n.cullFace(n.BACK):L===bu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),N=L}function yt(L){L!==q&&(H&&n.lineWidth(L),q=L)}function Tt(L,re,K){L?(ne(n.POLYGON_OFFSET_FILL),(J!==re||B!==K)&&(J=re,B=K,a.getReversed()&&(re=-re),n.polygonOffset(re,K))):Pe(n.POLYGON_OFFSET_FILL)}function ct(L){L?ne(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function _t(L){L===void 0&&(L=n.TEXTURE0+Y-1),he!==L&&(n.activeTexture(L),he=L)}function D(L,re,K){K===void 0&&(he===null?K=n.TEXTURE0+Y-1:K=he);let ce=ge[K];ce===void 0&&(ce={type:void 0,texture:void 0},ge[K]=ce),(ce.type!==L||ce.texture!==re)&&(he!==K&&(n.activeTexture(K),he=K),n.bindTexture(L,re||se[L]),ce.type=L,ce.texture=re)}function kt(){const L=ge[he];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Je(){try{n.compressedTexImage2D(...arguments)}catch(L){He("WebGLState:",L)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(L){He("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){He("WebGLState:",L)}}function F(){try{n.texSubImage3D(...arguments)}catch(L){He("WebGLState:",L)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(L){He("WebGLState:",L)}}function X(){try{n.compressedTexSubImage3D(...arguments)}catch(L){He("WebGLState:",L)}}function ie(){try{n.texStorage2D(...arguments)}catch(L){He("WebGLState:",L)}}function ae(){try{n.texStorage3D(...arguments)}catch(L){He("WebGLState:",L)}}function $(){try{n.texImage2D(...arguments)}catch(L){He("WebGLState:",L)}}function Z(){try{n.texImage3D(...arguments)}catch(L){He("WebGLState:",L)}}function oe(L){return f[L]!==void 0?f[L]:n.getParameter(L)}function be(L,re){f[L]!==re&&(n.pixelStorei(L,re),f[L]=re)}function ue(L){lt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),lt.copy(L))}function le(L){Ke.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ke.copy(L))}function Ae(L,re){let K=c.get(re);K===void 0&&(K=new WeakMap,c.set(re,K));let ce=K.get(L);ce===void 0&&(ce=n.getUniformBlockIndex(re,L.name),K.set(L,ce))}function Re(L,re){const ce=c.get(re).get(L);l.get(re)!==ce&&(n.uniformBlockBinding(re,ce,L.__bindingPointIndex),l.set(re,ce))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},he=null,ge={},u={},x=new WeakMap,g=[],S=null,m=!1,h=null,C=null,P=null,y=null,w=null,A=null,b=null,p=new Ve(0,0,0),v=0,E=!1,R=null,N=null,q=null,J=null,B=null,lt.set(0,0,n.canvas.width,n.canvas.height),Ke.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:Pe,bindFramebuffer:Le,drawBuffers:we,useProgram:ht,setBlending:Ze,setMaterial:We,setFlipSided:gt,setCullFace:xt,setLineWidth:yt,setPolygonOffset:Tt,setScissorTest:ct,activeTexture:_t,bindTexture:D,unbindTexture:kt,compressedTexImage2D:Je,compressedTexImage3D:T,texImage2D:$,texImage3D:Z,pixelStorei:be,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ie,texStorage3D:ae,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:G,compressedTexSubImage3D:X,scissor:ue,viewport:le,reset:De}}function w0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ke,d=new WeakMap,f=new Set;let u;const x=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,_){return g?new OffscreenCanvas(T,_):hs("canvas")}function m(T,_,F){let G=1;const X=Je(T);if((X.width>F||X.height>F)&&(G=F/Math.max(X.width,X.height)),G<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ie=Math.floor(G*X.width),ae=Math.floor(G*X.height);u===void 0&&(u=S(ie,ae));const $=_?S(ie,ae):u;return $.width=ie,$.height=ae,$.getContext("2d").drawImage(T,0,0,ie,ae),Ce("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+ie+"x"+ae+")."),$}else return"data"in T&&Ce("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),T;return T}function h(T){return T.generateMipmaps}function C(T){n.generateMipmap(T)}function P(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(T,_,F,G,X,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ae;G&&(ae=e.get("EXT_texture_norm16"),ae||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===n.RED&&(F===n.FLOAT&&($=n.R32F),F===n.HALF_FLOAT&&($=n.R16F),F===n.UNSIGNED_BYTE&&($=n.R8),F===n.UNSIGNED_SHORT&&ae&&($=ae.R16_EXT),F===n.SHORT&&ae&&($=ae.R16_SNORM_EXT)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&($=n.R8UI),F===n.UNSIGNED_SHORT&&($=n.R16UI),F===n.UNSIGNED_INT&&($=n.R32UI),F===n.BYTE&&($=n.R8I),F===n.SHORT&&($=n.R16I),F===n.INT&&($=n.R32I)),_===n.RG&&(F===n.FLOAT&&($=n.RG32F),F===n.HALF_FLOAT&&($=n.RG16F),F===n.UNSIGNED_BYTE&&($=n.RG8),F===n.UNSIGNED_SHORT&&ae&&($=ae.RG16_EXT),F===n.SHORT&&ae&&($=ae.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&($=n.RG8UI),F===n.UNSIGNED_SHORT&&($=n.RG16UI),F===n.UNSIGNED_INT&&($=n.RG32UI),F===n.BYTE&&($=n.RG8I),F===n.SHORT&&($=n.RG16I),F===n.INT&&($=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&($=n.RGB8UI),F===n.UNSIGNED_SHORT&&($=n.RGB16UI),F===n.UNSIGNED_INT&&($=n.RGB32UI),F===n.BYTE&&($=n.RGB8I),F===n.SHORT&&($=n.RGB16I),F===n.INT&&($=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&($=n.RGBA8UI),F===n.UNSIGNED_SHORT&&($=n.RGBA16UI),F===n.UNSIGNED_INT&&($=n.RGBA32UI),F===n.BYTE&&($=n.RGBA8I),F===n.SHORT&&($=n.RGBA16I),F===n.INT&&($=n.RGBA32I)),_===n.RGB&&(F===n.UNSIGNED_SHORT&&ae&&($=ae.RGB16_EXT),F===n.SHORT&&ae&&($=ae.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),_===n.RGBA){const Z=ie?ds:ze.getTransfer(X);F===n.FLOAT&&($=n.RGBA32F),F===n.HALF_FLOAT&&($=n.RGBA16F),F===n.UNSIGNED_BYTE&&($=Z===Qe?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&ae&&($=ae.RGBA16_EXT),F===n.SHORT&&ae&&($=ae.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function w(T,_){let F;return T?_===null||_===Mn||_===vr?F=n.DEPTH24_STENCIL8:_===rn?F=n.DEPTH32F_STENCIL8:_===_r&&(F=n.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Mn||_===vr?F=n.DEPTH_COMPONENT24:_===rn?F=n.DEPTH_COMPONENT32F:_===_r&&(F=n.DEPTH_COMPONENT16),F}function A(T,_){return h(T)===!0||T.isFramebufferTexture&&T.minFilter!==At&&T.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function b(T){const _=T.target;_.removeEventListener("dispose",b),v(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function p(T){const _=T.target;_.removeEventListener("dispose",p),R(_)}function v(T){const _=i.get(T);if(_.__webglInit===void 0)return;const F=T.source,G=x.get(F);if(G){const X=G[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&E(T),Object.keys(G).length===0&&x.delete(F)}i.remove(T)}function E(T){const _=i.get(T);n.deleteTexture(_.__webglTexture);const F=T.source,G=x.get(F);delete G[_.__cacheKey],a.memory.textures--}function R(T){const _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let X=0;X<_.__webglFramebuffer[G].length;X++)n.deleteFramebuffer(_.__webglFramebuffer[G][X]);else n.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)n.deleteFramebuffer(_.__webglFramebuffer[G]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=T.textures;for(let G=0,X=F.length;G<X;G++){const ie=i.get(F[G]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(F[G])}i.remove(T)}let N=0;function q(){N=0}function J(){return N}function B(T){N=T}function Y(){const T=N;return T>=r.maxTextures&&Ce("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),N+=1,T}function H(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function j(T,_){const F=i.get(T);if(T.isVideoTexture&&D(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const G=T.image;if(G===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(F,T,_);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function te(T,_){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Pe(F,T,_);return}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function he(T,_){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Pe(F,T,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function ge(T,_){const F=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&F.__version!==T.version){Le(F,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const xe={[os]:n.REPEAT,[In]:n.CLAMP_TO_EDGE,[wa]:n.MIRRORED_REPEAT},Ye={[At]:n.NEAREST,[Wu]:n.NEAREST_MIPMAP_NEAREST,[Ir]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Cs]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},lt={[qu]:n.NEVER,[Qu]:n.ALWAYS,[Yu]:n.LESS,[wo]:n.LEQUAL,[Ku]:n.EQUAL,[Ro]:n.GEQUAL,[Zu]:n.GREATER,[Ju]:n.NOTEQUAL};function Ke(T,_){if(_.type===rn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===Cs||_.magFilter===Ir||_.magFilter===li||_.minFilter===Dt||_.minFilter===Cs||_.minFilter===Ir||_.minFilter===li)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,xe[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,xe[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,xe[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Ye[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Ye[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,lt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==Ir&&_.minFilter!==li||_.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Q(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",b));const G=_.source;let X=x.get(G);X===void 0&&(X={},x.set(G,X));const ie=H(_);if(ie!==T.__cacheKey){X[ie]===void 0&&(X[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),X[ie].usedTimes++;const ae=X[T.__cacheKey];ae!==void 0&&(X[T.__cacheKey].usedTimes--,ae.usedTimes===0&&E(_)),T.__cacheKey=ie,T.__webglTexture=X[ie].texture}return F}function se(T,_,F){return Math.floor(Math.floor(T/F)/_)}function ne(T,_,F,G){const ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,F,G,_.data);else{ie.sort((be,ue)=>be.start-ue.start);let ae=0;for(let be=1;be<ie.length;be++){const ue=ie[ae],le=ie[be],Ae=ue.start+ue.count,Re=se(le.start,_.width,4),De=se(ue.start,_.width,4);le.start<=Ae+1&&Re===De&&se(le.start+le.count-1,_.width,4)===Re?ue.count=Math.max(ue.count,le.start+le.count-ue.start):(++ae,ie[ae]=le)}ie.length=ae+1;const $=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let be=0,ue=ie.length;be<ue;be++){const le=ie[be],Ae=Math.floor(le.start/4),Re=Math.ceil(le.count/4),De=Ae%_.width,L=Math.floor(Ae/_.width),re=Re,K=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,De,L,re,K,F,G,_.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Pe(T,_,F){let G=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=n.TEXTURE_3D);const X=Q(T,_),ie=_.source;t.bindTexture(G,T.__webglTexture,n.TEXTURE0+F);const ae=i.get(ie);if(ie.version!==ae.__version||X===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const K=ze.getPrimaries(ze.workingColorSpace),ce=_.colorSpace===qn?null:ze.getPrimaries(_.colorSpace),me=_.colorSpace===qn||K===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=m(_.image,!1,r.maxTextureSize);Z=kt(_,Z);const oe=s.convert(_.format,_.colorSpace),be=s.convert(_.type);let ue=y(_.internalFormat,oe,be,_.normalized,_.colorSpace,_.isVideoTexture);Ke(G,_);let le;const Ae=_.mipmaps,Re=_.isVideoTexture!==!0,De=ae.__version===void 0||X===!0,L=ie.dataReady,re=A(_,Z);if(_.isDepthTexture)ue=w(_.format===ci,_.type),De&&(Re?t.texStorage2D(n.TEXTURE_2D,1,ue,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,ue,Z.width,Z.height,0,oe,be,null));else if(_.isDataTexture)if(Ae.length>0){Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],Re?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,be,le.data):t.texImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,oe,be,le.data);_.generateMipmaps=!1}else Re?(De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height),L&&ne(_,Z,oe,be)):t.texImage2D(n.TEXTURE_2D,0,ue,Z.width,Z.height,0,oe,be,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Re&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,Ae[0].width,Ae[0].height,Z.depth);for(let K=0,ce=Ae.length;K<ce;K++)if(le=Ae[K],_.format!==sn)if(oe!==null)if(Re){if(L)if(_.layerUpdates.size>0){const me=Al(le.width,le.height,_.format,_.type);for(const ee of _.layerUpdates){const ye=le.data.subarray(ee*me/le.data.BYTES_PER_ELEMENT,(ee+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,ee,le.width,le.height,1,oe,ye)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,le.width,le.height,Z.depth,oe,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,ue,le.width,le.height,Z.depth,0,le.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,le.width,le.height,Z.depth,oe,be,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,ue,le.width,le.height,Z.depth,0,oe,be,le.data)}else{Re&&De&&t.texStorage2D(n.TEXTURE_2D,re,ue,Ae[0].width,Ae[0].height);for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],_.format!==sn?oe!==null?Re?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le.width,le.height,oe,be,le.data):t.texImage2D(n.TEXTURE_2D,K,ue,le.width,le.height,0,oe,be,le.data)}else if(_.isDataArrayTexture)if(Re){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,ue,Z.width,Z.height,Z.depth),L)if(_.layerUpdates.size>0){const K=Al(Z.width,Z.height,_.format,_.type);for(const ce of _.layerUpdates){const me=Z.data.subarray(ce*K/Z.data.BYTES_PER_ELEMENT,(ce+1)*K/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,Z.width,Z.height,1,oe,be,me)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,oe,be,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,Z.width,Z.height,Z.depth,0,oe,be,Z.data);else if(_.isData3DTexture)Re?(De&&t.texStorage3D(n.TEXTURE_3D,re,ue,Z.width,Z.height,Z.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,oe,be,Z.data)):t.texImage3D(n.TEXTURE_3D,0,ue,Z.width,Z.height,Z.depth,0,oe,be,Z.data);else if(_.isFramebufferTexture){if(De)if(Re)t.texStorage2D(n.TEXTURE_2D,re,ue,Z.width,Z.height);else{let K=Z.width,ce=Z.height;for(let me=0;me<re;me++)t.texImage2D(n.TEXTURE_2D,me,ue,K,ce,0,oe,be,null),K>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const K=n.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Z.parentNode!==K){K.appendChild(Z),f.add(_),K.onpaint=ce=>{const me=ce.changedElements;for(const ee of f)me.includes(ee.image)&&(ee.needsUpdate=!0)},K.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const me=n.RGBA,ee=n.RGBA,ye=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,me,ee,ye,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&De){const K=Je(Ae[0]);t.texStorage2D(n.TEXTURE_2D,re,ue,K.width,K.height)}for(let K=0,ce=Ae.length;K<ce;K++)le=Ae[K],Re?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,oe,be,le):t.texImage2D(n.TEXTURE_2D,K,ue,oe,be,le);_.generateMipmaps=!1}else if(Re){if(De){const K=Je(Z);t.texStorage2D(n.TEXTURE_2D,re,ue,K.width,K.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,be,Z)}else t.texImage2D(n.TEXTURE_2D,0,ue,oe,be,Z);h(_)&&C(G),ae.__version=ie.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Le(T,_,F){if(_.image.length!==6)return;const G=Q(T,_),X=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const ie=i.get(X);if(X.version!==ie.__version||G===!0){t.activeTexture(n.TEXTURE0+F);const ae=ze.getPrimaries(ze.workingColorSpace),$=_.colorSpace===qn?null:ze.getPrimaries(_.colorSpace),Z=_.colorSpace===qn||ae===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,be=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let ee=0;ee<6;ee++)!oe&&!be?ue[ee]=m(_.image[ee],!0,r.maxCubemapSize):ue[ee]=be?_.image[ee].image:_.image[ee],ue[ee]=kt(_,ue[ee]);const le=ue[0],Ae=s.convert(_.format,_.colorSpace),Re=s.convert(_.type),De=y(_.internalFormat,Ae,Re,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,re=ie.__version===void 0||G===!0,K=X.dataReady;let ce=A(_,le);Ke(n.TEXTURE_CUBE_MAP,_);let me;if(oe){L&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,le.width,le.height);for(let ee=0;ee<6;ee++){me=ue[ee].mipmaps;for(let ye=0;ye<me.length;ye++){const Me=me[ye];_.format!==sn?Ae!==null?L?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye,0,0,Me.width,Me.height,Ae,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye,De,Me.width,Me.height,0,Me.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye,0,0,Me.width,Me.height,Ae,Re,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye,De,Me.width,Me.height,0,Ae,Re,Me.data)}}}else{if(me=_.mipmaps,L&&re){me.length>0&&ce++;const ee=Je(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,De,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(be){L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ue[ee].width,ue[ee].height,Ae,Re,ue[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,ue[ee].width,ue[ee].height,0,Ae,Re,ue[ee].data);for(let ye=0;ye<me.length;ye++){const ut=me[ye].image[ee].image;L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye+1,0,0,ut.width,ut.height,Ae,Re,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye+1,De,ut.width,ut.height,0,Ae,Re,ut.data)}}else{L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,Re,ue[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,De,Ae,Re,ue[ee]);for(let ye=0;ye<me.length;ye++){const Me=me[ye];L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye+1,0,0,Ae,Re,Me.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ye+1,De,Ae,Re,Me.image[ee])}}}h(_)&&C(n.TEXTURE_CUBE_MAP),ie.__version=X.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function we(T,_,F,G,X,ie){const ae=s.convert(F.format,F.colorSpace),$=s.convert(F.type),Z=y(F.internalFormat,ae,$,F.normalized,F.colorSpace),oe=i.get(_),be=i.get(F);if(be.__renderTarget=_,!oe.__hasExternalTextures){const ue=Math.max(1,_.width>>ie),le=Math.max(1,_.height>>ie);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,ie,Z,ue,le,_.depth,0,ae,$,null):t.texImage2D(X,ie,Z,ue,le,0,ae,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,X,be.__webglTexture,0,ct(_)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,X,be.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(T,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){const G=_.depthTexture,X=G&&G.isDepthTexture?G.type:null,ie=w(_.stencilBuffer,X),ae=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(_),ie,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,T)}else{const G=_.textures;for(let X=0;X<G.length;X++){const ie=G[X],ae=s.convert(ie.format,ie.colorSpace),$=s.convert(ie.type),Z=y(ie.internalFormat,ae,$,ie.normalized,ie.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(_),Z,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Oe(T,_,F){const G=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=i.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",b)),X.__webglTexture===void 0){X.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),be=s.convert(_.depthTexture.type);let ue;_.depthTexture.format===Nn?ue=n.DEPTH_COMPONENT24:_.depthTexture.format===ci&&(ue=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ue,_.width,_.height,0,oe,be,null)}}else j(_.depthTexture,0);const ie=X.__webglTexture,ae=ct(_),$=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,Z=_.depthTexture.format===ci?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Nn)_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,$,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Z,$,ie,0);else if(_.depthTexture.format===ci)_t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,$,ie,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,Z,$,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(T){const _=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const G=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",X)};G.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=G}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let G=0;G<6;G++)Oe(_.__webglFramebuffer[G],T,G);else{const G=T.texture.mipmaps;G&&G.length>0?Oe(_.__webglFramebuffer[0],T,0):Oe(_.__webglFramebuffer,T,0)}else if(F){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=n.createRenderbuffer(),ht(_.__webglDepthbuffer[G],T,!1);else{const X=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,ie)}}else{const G=T.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ht(_.__webglDepthbuffer,T,!1);else{const X=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(T,_,F){const G=i.get(T);_!==void 0&&we(G.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&tt(T)}function We(T){const _=T.texture,F=i.get(T),G=i.get(_);T.addEventListener("dispose",p);const X=T.textures,ie=T.isWebGLCubeRenderTarget===!0,ae=X.length>1;if(ae||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=_.version,a.memory.textures++),ie){F.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[$]=[];for(let Z=0;Z<_.mipmaps.length;Z++)F.__webglFramebuffer[$][Z]=n.createFramebuffer()}else F.__webglFramebuffer[$]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)F.__webglFramebuffer[$]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(ae)for(let $=0,Z=X.length;$<Z;$++){const oe=i.get(X[$]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&_t(T)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let $=0;$<X.length;$++){const Z=X[$];F.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[$]);const oe=s.convert(Z.format,Z.colorSpace),be=s.convert(Z.type),ue=y(Z.internalFormat,oe,be,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),le=ct(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,ue,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,F.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)we(F.__webglFramebuffer[$][Z],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Z);else we(F.__webglFramebuffer[$],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);h(_)&&C(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let $=0,Z=X.length;$<Z;$++){const oe=X[$],be=i.get(oe);let ue=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,be.__webglTexture),Ke(ue,oe),we(F.__webglFramebuffer,T,oe,n.COLOR_ATTACHMENT0+$,ue,0),h(oe)&&C(ue)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,G.__webglTexture),Ke($,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)we(F.__webglFramebuffer[Z],T,_,n.COLOR_ATTACHMENT0,$,Z);else we(F.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,$,0);h(_)&&C($),t.unbindTexture()}T.depthBuffer&&tt(T)}function gt(T){const _=T.textures;for(let F=0,G=_.length;F<G;F++){const X=_[F];if(h(X)){const ie=P(T),ae=i.get(X).__webglTexture;t.bindTexture(ie,ae),C(ie),t.unbindTexture()}}}const xt=[],yt=[];function Tt(T){if(T.samples>0){if(_t(T)===!1){const _=T.textures,F=T.width,G=T.height;let X=n.COLOR_BUFFER_BIT;const ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(T),$=_.length>1;if($)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const Z=T.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const be=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,be,0)}n.blitFramebuffer(0,0,F,G,0,0,F,G,X,n.NEAREST),l===!0&&(xt.length=0,yt.length=0,xt.push(n.COLOR_ATTACHMENT0+oe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(xt.push(ie),yt.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const be=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ct(T){return Math.min(r.maxSamples,T.samples)}function _t(T){const _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(T){const _=a.render.frame;d.get(T)!==_&&(d.set(T,_),T.update())}function kt(T,_){const F=T.colorSpace,G=T.format,X=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==us&&F!==qn&&(ze.getTransfer(F)===Qe?(G!==sn||X!==qt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",F)),_}function Je(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=q,this.getTextureUnits=J,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=te,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=Ze,this.setupRenderTarget=We,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=we,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function R0(n,e){function t(i,r=qn){let s;const a=ze.getTransfer(r);if(i===qt)return n.UNSIGNED_BYTE;if(i===So)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Sc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===vc)return n.BYTE;if(i===xc)return n.SHORT;if(i===_r)return n.UNSIGNED_SHORT;if(i===Mo)return n.INT;if(i===Mn)return n.UNSIGNED_INT;if(i===rn)return n.FLOAT;if(i===Un)return n.HALF_FLOAT;if(i===yc)return n.ALPHA;if(i===bc)return n.RGB;if(i===sn)return n.RGBA;if(i===Nn)return n.DEPTH_COMPONENT;if(i===ci)return n.DEPTH_STENCIL;if(i===bo)return n.RED;if(i===Eo)return n.RED_INTEGER;if(i===hi)return n.RG;if(i===To)return n.RG_INTEGER;if(i===Ao)return n.RGBA_INTEGER;if(i===ts||i===ns||i===is||i===rs)if(a===Qe)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ts)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ts)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ns)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===is)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ra||i===Ca||i===Pa||i===Ia)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ra)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ca)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Pa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ia)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===La||i===Da||i===Ua||i===Na||i===Fa||i===ls||i===Oa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===La||i===Da)return a===Qe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ua)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Na)return s.COMPRESSED_R11_EAC;if(i===Fa)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ls)return s.COMPRESSED_RG11_EAC;if(i===Oa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ba||i===ka||i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===$a||i===qa||i===Ya||i===Ka||i===Za||i===Ja)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ba)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ka)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===za)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ga)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ha)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Va)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wa)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xa)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$a)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qa)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ya)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ka)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Za)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ja)return a===Qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qa||i===ja||i===eo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Qa)return a===Qe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ja)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===eo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===to||i===no||i===cs||i===io)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===to)return s.COMPRESSED_RED_RGTC1_EXT;if(i===no)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===cs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===io)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const C0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,P0=`
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

}`;class I0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Lc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Sn({vertexShader:C0,fragmentShader:P0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new Ji(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class L0 extends fi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,f=null,u=null,x=null,g=null;const S=typeof XRWebGLBinding<"u",m=new I0,h={},C=t.getContextAttributes();let P=null,y=null;const w=[],A=[],b=new ke;let p=null;const v=new tn;v.viewport=new ot;const E=new tn;E.viewport=new ot;const R=[v,E],N=new zd;let q=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=w[Q];return se===void 0&&(se=new Os,w[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=w[Q];return se===void 0&&(se=new Os,w[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=w[Q];return se===void 0&&(se=new Os,w[Q]=se),se.getHandSpace()};function B(Q){const se=A.indexOf(Q.inputSource);if(se===-1)return;const ne=w[se];ne!==void 0&&(ne.update(Q.inputSource,Q.frame,c||a),ne.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<w.length;Q++){const se=A[Q];se!==null&&(A[Q]=null,w[Q].disconnect(se))}q=null,J=null,m.reset();for(const Q in h)delete h[Q];e.setRenderTarget(P),x=null,u=null,f=null,r=null,y=null,Ke.stop(),i.isPresenting=!1,e.setPixelRatio(p),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:x},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(P=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),C.xrCompatible!==!0&&await t.makeXRCompatible(),p=e.getPixelRatio(),e.getSize(b),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,Pe=null,Le=null;C.depth&&(Le=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=C.stencil?ci:Nn,Pe=C.stencil?vr:Mn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(we),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new xn(u.textureWidth,u.textureHeight,{format:sn,type:qt,depthTexture:new $i(u.textureWidth,u.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ne={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:s};x=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),y=new xn(x.framebufferWidth,x.framebufferHeight,{format:sn,type:qt,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ke.setContext(r),Ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Q){for(let se=0;se<Q.removed.length;se++){const ne=Q.removed[se],Pe=A.indexOf(ne);Pe>=0&&(A[Pe]=null,w[Pe].disconnect(ne))}for(let se=0;se<Q.added.length;se++){const ne=Q.added[se];let Pe=A.indexOf(ne);if(Pe===-1){for(let we=0;we<w.length;we++)if(we>=A.length){A.push(ne),Pe=we;break}else if(A[we]===null){A[we]=ne,Pe=we;break}if(Pe===-1)break}const Le=w[Pe];Le&&Le.connect(ne)}}const j=new O,te=new O;function he(Q,se,ne){j.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(ne.matrixWorld);const Pe=j.distanceTo(te),Le=se.projectionMatrix.elements,we=ne.projectionMatrix.elements,ht=Le[14]/(Le[10]-1),Oe=Le[14]/(Le[10]+1),tt=(Le[9]+1)/Le[5],Ze=(Le[9]-1)/Le[5],We=(Le[8]-1)/Le[0],gt=(we[8]+1)/we[0],xt=ht*We,yt=ht*gt,Tt=Pe/(-We+gt),ct=Tt*-We;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(ct),Q.translateZ(Tt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Le[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const _t=ht+Tt,D=Oe+Tt,kt=xt-ct,Je=yt+(Pe-ct),T=tt*Oe/D*_t,_=Ze*Oe/D*_t;Q.projectionMatrix.makePerspective(kt,Je,T,_,_t,D),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ge(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let se=Q.near,ne=Q.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),N.near=E.near=v.near=se,N.far=E.far=v.far=ne,(q!==N.near||J!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),q=N.near,J=N.far),N.layers.mask=Q.layers.mask|6,v.layers.mask=N.layers.mask&-5,E.layers.mask=N.layers.mask&-3;const Pe=Q.parent,Le=N.cameras;ge(N,Pe);for(let we=0;we<Le.length;we++)ge(Le[we],Pe);Le.length===2?he(N,v,E):N.projectionMatrix.copy(v.projectionMatrix),xe(Q,N,Pe)};function xe(Q,se,ne){ne===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(ne.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=so*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&x===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(Q){return h[Q]};let Ye=null;function lt(Q,se){if(d=se.getViewerPose(c||a),g=se,d!==null){const ne=d.views;x!==null&&(e.setRenderTargetFramebuffer(y,x.framebuffer),e.setRenderTarget(y));let Pe=!1;ne.length!==N.cameras.length&&(N.cameras.length=0,Pe=!0);for(let Oe=0;Oe<ne.length;Oe++){const tt=ne[Oe];let Ze=null;if(x!==null)Ze=x.getViewport(tt);else{const gt=f.getViewSubImage(u,tt);Ze=gt.viewport,Oe===0&&(e.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(y))}let We=R[Oe];We===void 0&&(We=new tn,We.layers.enable(Oe),We.viewport=new ot,R[Oe]=We),We.matrix.fromArray(tt.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(tt.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Oe===0&&(N.matrix.copy(We.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Pe===!0&&N.cameras.push(We)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const Oe=f.getDepthInformation(ne[0]);Oe&&Oe.isValid&&Oe.texture&&m.init(Oe,r.renderState)}if(Le&&Le.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let Oe=0;Oe<ne.length;Oe++){const tt=ne[Oe].camera;if(tt){let Ze=h[tt];Ze||(Ze=new Lc,h[tt]=Ze);const We=f.getCameraImage(tt);Ze.sourceTexture=We}}}}for(let ne=0;ne<w.length;ne++){const Pe=A[ne],Le=w[ne];Pe!==null&&Le!==void 0&&Le.update(Pe,se,c||a)}Ye&&Ye(Q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Ke=new Oc;Ke.setAnimationLoop(lt),this.setAnimationLoop=function(Q){Ye=Q},this.dispose=function(){}}}const D0=new rt,Wc=new Ie;Wc.set(-1,0,0,0,1,0,0,0,1);function U0(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Dc(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,C,P,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(m,h):h.isMeshLambertMaterial?(s(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),d(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(m,h),u(m,h),h.isMeshPhysicalMaterial&&x(m,h,y)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),S(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,C,P):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Ht&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Ht&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const C=e.get(h),P=C.envMap,y=C.envMapRotation;P&&(m.envMap.value=P,m.envMapRotation.value.setFromMatrix4(D0.makeRotationFromEuler(y)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wc),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,C,P){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*C,m.scale.value=P*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function d(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function u(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function x(m,h,C){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ht&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function S(m,h){const C=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function N0(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const A=w.program;i.uniformBlockBinding(y,A)}function c(y,w){let A=r[y.id];A===void 0&&(m(y),A=d(y),r[y.id]=A,y.addEventListener("dispose",C));const b=w.program;i.updateUBOMapping(y,b);const p=e.render.frame;s[y.id]!==p&&(u(y),s[y.id]=p)}function d(y){const w=f();y.__bindingPointIndex=w;const A=n.createBuffer(),b=y.__size,p=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,b,p),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,A),A}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const w=r[y.id],A=y.uniforms,b=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let p=0,v=A.length;p<v;p++){const E=A[p];if(Array.isArray(E))for(let R=0,N=E.length;R<N;R++)x(E[R],p,R,b);else x(E,p,0,b)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(y,w,A,b){if(S(y,w,A,b)===!0){const p=y.__offset,v=y.value;if(Array.isArray(v)){let E=0;for(let R=0;R<v.length;R++){const N=v[R],q=h(N);g(N,y.__data,E),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(E+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(v,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,p,y.__data)}}function g(y,w,A){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,A)}function S(y,w,A,b){const p=y.value,v=w+"_"+A;if(b[v]===void 0)return typeof p=="number"||typeof p=="boolean"?b[v]=p:ArrayBuffer.isView(p)?b[v]=p.slice():b[v]=p.clone(),!0;{const E=b[v];if(typeof p=="number"||typeof p=="boolean"){if(E!==p)return b[v]=p,!0}else{if(ArrayBuffer.isView(p))return!0;if(E.equals(p)===!1)return E.copy(p),!0}}return!1}function m(y){const w=y.uniforms;let A=0;const b=16;for(let v=0,E=w.length;v<E;v++){const R=Array.isArray(w[v])?w[v]:[w[v]];for(let N=0,q=R.length;N<q;N++){const J=R[N],B=Array.isArray(J.value)?J.value:[J.value];for(let Y=0,H=B.length;Y<H;Y++){const j=B[Y],te=h(j),he=A%b,ge=he%te.boundary,xe=he+ge;A+=ge,xe!==0&&b-xe<te.storage&&(A+=b-xe),J.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=A,A+=te.storage}}}const p=A%b;return p>0&&(A+=b-p),y.__size=A,y.__cache={},this}function h(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",y),w}function C(y){const w=y.target;w.removeEventListener("dispose",C);const A=a.indexOf(w.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function P(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:P}}const F0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function O0(){return fn===null&&(fn=new Io(F0,16,16,hi,Un),fn.name="DFG_LUT",fn.minFilter=Dt,fn.magFilter=Dt,fn.wrapS=In,fn.wrapT=In,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class B0{constructor(e={}){const{canvas:t=ed(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:x=qt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const S=x,m=new Set([Ao,To,Eo]),h=new Set([qt,Mn,_r,vr,So,yo]),C=new Uint32Array(4),P=new Int32Array(4),y=new O;let w=null,A=null;const b=[],p=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let R=!1,N=null,q=null,J=null,B=null;this._outputColorSpace=Gt;let Y=0,H=0,j=null,te=-1,he=null;const ge=new ot,xe=new ot;let Ye=null;const lt=new Ve(0);let Ke=0,Q=t.width,se=t.height,ne=1,Pe=null,Le=null;const we=new ot(0,0,Q,se),ht=new ot(0,0,Q,se);let Oe=!1;const tt=new Lo;let Ze=!1,We=!1;const gt=new rt,xt=new O,yt=new ot,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function _t(){return j===null?ne:1}let D=i;function kt(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vo}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",cn,!1),D===null){const U="webgl2";if(D=kt(U,M),D===null)throw kt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw He("WebGLRenderer: "+M.message),M}let Je,T,_,F,G,X,ie,ae,$,Z,oe,be,ue,le,Ae,Re,De,L,re,K,ce,me,ee;function ye(){Je=new Op(D),Je.init(),ce=new R0(D,Je),T=new Cp(D,Je,e,ce),_=new A0(D,Je),T.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),q=D.createFramebuffer(),J=D.createFramebuffer(),B=D.createFramebuffer(),F=new zp(D),G=new h0,X=new w0(D,Je,_,G,T,ce,F),ie=new Fp(E),ae=new Vd(D),me=new wp(D,ae),$=new Bp(D,ae,F,me),Z=new Hp(D,$,ae,me,F),L=new Gp(D,T,X),Ae=new Pp(G),oe=new d0(E,ie,Je,T,me,Ae),be=new U0(E,G),ue=new p0,le=new M0(Je),De=new Ap(E,ie,_,Z,g,l),Re=new T0(E,Z,T),ee=new N0(D,F,T,_),re=new Rp(D,Je,F),K=new kp(D,Je,F),F.programs=oe.programs,E.capabilities=T,E.extensions=Je,E.properties=G,E.renderLists=ue,E.shadowMap=Re,E.state=_,E.info=F}ye(),S!==qt&&(v=new Wp(S,t.width,t.height,o,r,s));const Me=new L0(E,D);this.xr=Me,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=Je.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Je.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(Q,se,!1))},this.getSize=function(M){return M.set(Q,se)},this.setSize=function(M,U,V=!0){if(Me.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=M,se=U,t.width=Math.floor(M*ne),t.height=Math.floor(U*ne),V===!0&&(t.style.width=M+"px",t.style.height=U+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(Q*ne,se*ne).floor()},this.setDrawingBufferSize=function(M,U,V){Q=M,se=U,ne=V,t.width=Math.floor(M*V),t.height=Math.floor(U*V),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(S===qt){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ge)},this.getViewport=function(M){return M.copy(we)},this.setViewport=function(M,U,V,k){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,U,V,k),_.viewport(ge.copy(we).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(ht)},this.setScissor=function(M,U,V,k){M.isVector4?ht.set(M.x,M.y,M.z,M.w):ht.set(M,U,V,k),_.scissor(xe.copy(ht).multiplyScalar(ne).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(M){_.setScissorTest(Oe=M)},this.setOpaqueSort=function(M){Pe=M},this.setTransparentSort=function(M){Le=M},this.getClearColor=function(M){return M.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,V=!0){let k=0;if(M){let z=!1;if(j!==null){const pe=j.texture.format;z=m.has(pe)}if(z){const pe=j.texture.type,ve=h.has(pe),fe=De.getClearColor(),Se=De.getClearAlpha(),Ee=fe.r,Ue=fe.g,Fe=fe.b;ve?(C[0]=Ee,C[1]=Ue,C[2]=Fe,C[3]=Se,D.clearBufferuiv(D.COLOR,0,C)):(P[0]=Ee,P[1]=Ue,P[2]=Fe,P[3]=Se,D.clearBufferiv(D.COLOR,0,P))}else k|=D.COLOR_BUFFER_BIT}U&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),N=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",cn,!1),De.dispose(),ue.dispose(),le.dispose(),G.dispose(),ie.dispose(),Z.dispose(),me.dispose(),ee.dispose(),oe.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Oo),Me.removeEventListener("sessionend",Bo),jn.stop()};function ut(M){M.preventDefault(),tl("WebGLRenderer: Context Lost."),R=!0}function st(){tl("WebGLRenderer: Context Restored."),R=!1;const M=F.autoReset,U=Re.enabled,V=Re.autoUpdate,k=Re.needsUpdate,z=Re.type;ye(),F.autoReset=M,Re.enabled=U,Re.autoUpdate=V,Re.needsUpdate=k,Re.type=z}function cn(M){He("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function un(M){const U=M.target;U.removeEventListener("dispose",un),qc(U)}function qc(M){Yc(M),G.remove(M)}function Yc(M){const U=G.get(M).programs;U!==void 0&&(U.forEach(function(V){oe.releaseProgram(V)}),M.isShaderMaterial&&oe.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,V,k,z,pe){U===null&&(U=Tt);const ve=z.isMesh&&z.matrixWorld.determinantAffine()<0,fe=Jc(M,U,V,k,z);_.setMaterial(k,ve);let Se=V.index,Ee=1;if(k.wireframe===!0){if(Se=$.getWireframeAttribute(V),Se===void 0)return;Ee=2}const Ue=V.drawRange,Fe=V.attributes.position;let Te=Ue.start*Ee,je=(Ue.start+Ue.count)*Ee;pe!==null&&(Te=Math.max(Te,pe.start*Ee),je=Math.min(je,(pe.start+pe.count)*Ee)),Se!==null?(Te=Math.max(Te,0),je=Math.min(je,Se.count)):Fe!=null&&(Te=Math.max(Te,0),je=Math.min(je,Fe.count));const ft=je-Te;if(ft<0||ft===1/0)return;me.setup(z,k,fe,V,Se);let dt,nt=re;if(Se!==null&&(dt=ae.get(Se),nt=K,nt.setIndex(dt)),z.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*_t()),nt.setMode(D.LINES)):nt.setMode(D.TRIANGLES);else if(z.isLine){let Rt=k.linewidth;Rt===void 0&&(Rt=1),_.setLineWidth(Rt*_t()),z.isLineSegments?nt.setMode(D.LINES):z.isLineLoop?nt.setMode(D.LINE_LOOP):nt.setMode(D.LINE_STRIP)}else z.isPoints?nt.setMode(D.POINTS):z.isSprite&&nt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))nt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Rt=z._multiDrawStarts,_e=z._multiDrawCounts,Vt=z._multiDrawCount,Xe=Se?ae.get(Se).bytesPerElement:1,Yt=G.get(k).currentProgram.getUniforms();for(let dn=0;dn<Vt;dn++)Yt.setValue(D,"_gl_DrawID",dn),nt.render(Rt[dn]/Xe,_e[dn])}else if(z.isInstancedMesh)nt.renderInstances(Te,ft,z.count);else if(V.isInstancedBufferGeometry){const Rt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,_e=Math.min(V.instanceCount,Rt);nt.renderInstances(Te,ft,_e)}else nt.render(Te,ft)};function Fo(M,U,V){M.transparent===!0&&M.side===Rn&&M.forceSinglePass===!1?(M.side=Ht,M.needsUpdate=!0,wr(M,U,V),M.side=Zn,M.needsUpdate=!0,wr(M,U,V),M.side=Rn):wr(M,U,V)}this.compile=function(M,U,V=null){V===null&&(V=M),A=le.get(V),A.init(U),p.push(A),V.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),M!==V&&M.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),A.setupLights();const k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pe=z.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];Fo(fe,V,z),k.add(fe)}else Fo(pe,V,z),k.add(pe)}),A=p.pop(),k},this.compileAsync=function(M,U,V=null){const k=this.compile(M,U,V);return new Promise(z=>{function pe(){if(k.forEach(function(ve){G.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){z(M);return}setTimeout(pe,10)}Je.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Es=null;function Kc(M){Es&&Es(M)}function Oo(){jn.stop()}function Bo(){jn.start()}const jn=new Oc;jn.setAnimationLoop(Kc),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(M){Es=M,Me.setAnimationLoop(M),M===null?jn.stop():jn.start()},Me.addEventListener("sessionstart",Oo),Me.addEventListener("sessionend",Bo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;N!==null&&N.renderStart(M,U);const V=Me.enabled===!0&&Me.isPresenting===!0,k=v!==null&&(j===null||V)&&v.begin(E,j);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(U),U=Me.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,U,j),A=le.get(M,p.length),A.init(U),A.state.textureUnits=X.getTextureUnits(),p.push(A),gt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(gt,_n,U.reversedDepth),We=this.localClippingEnabled,Ze=Ae.init(this.clippingPlanes,We),w=ue.get(M,b.length),w.init(),b.push(w),Me.enabled===!0&&Me.isPresenting===!0){const ve=E.xr.getDepthSensingMesh();ve!==null&&Ts(ve,U,-1/0,E.sortObjects)}Ts(M,U,0,E.sortObjects),w.finish(),E.sortObjects===!0&&w.sort(Pe,Le,U.reversedDepth),ct=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,ct&&De.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Ae.beginShadows();const z=A.state.shadowsArray;if(Re.render(z,M,U),Ze===!0&&Ae.endShadows(),(k&&v.hasRenderPass())===!1){const ve=w.opaque,fe=w.transmissive;if(A.setupLights(),U.isArrayCamera){const Se=U.cameras;if(fe.length>0)for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];zo(ve,fe,M,Fe)}ct&&De.render(M);for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee];ko(w,M,Fe,Fe.viewport)}}else fe.length>0&&zo(ve,fe,M,U),ct&&De.render(M),ko(w,M,U)}j!==null&&H===0&&(X.updateMultisampleRenderTarget(j),X.updateRenderTargetMipmap(j)),k&&v.end(E),M.isScene===!0&&M.onAfterRender(E,M,U),me.resetDefaultState(),te=-1,he=null,p.pop(),p.length>0?(A=p[p.length-1],X.setTextureUnits(A.state.textureUnits),Ze===!0&&Ae.setGlobalState(E.clippingPlanes,A.state.camera)):A=null,b.pop(),b.length>0?w=b[b.length-1]:w=null,N!==null&&N.renderEnd()};function Ts(M,U,V,k){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||tt.intersectsSprite(M)){k&&yt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(gt);const ve=Z.update(M),fe=M.material;fe.visible&&w.push(M,ve,fe,V,yt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||tt.intersectsObject(M))){const ve=Z.update(M),fe=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),yt.copy(M.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),yt.copy(ve.boundingSphere.center)),yt.applyMatrix4(M.matrixWorld).applyMatrix4(gt)),Array.isArray(fe)){const Se=ve.groups;for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const Fe=Se[Ee],Te=fe[Fe.materialIndex];Te&&Te.visible&&w.push(M,ve,Te,V,yt.z,Fe)}}else fe.visible&&w.push(M,ve,fe,V,yt.z,null)}}const pe=M.children;for(let ve=0,fe=pe.length;ve<fe;ve++)Ts(pe[ve],U,V,k)}function ko(M,U,V,k){const{opaque:z,transmissive:pe,transparent:ve}=M;A.setupLightsView(V),Ze===!0&&Ae.setGlobalState(E.clippingPlanes,V),k&&_.viewport(ge.copy(k)),z.length>0&&Ar(z,U,V),pe.length>0&&Ar(pe,U,V),ve.length>0&&Ar(ve,U,V),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function zo(M,U,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[k.id]===void 0){const Te=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[k.id]=new xn(1,1,{generateMipmaps:!0,type:Te?Un:qt,minFilter:li,samples:Math.max(4,T.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}const pe=A.state.transmissionRenderTarget[k.id],ve=k.viewport||ge;pe.setSize(ve.z*E.transmissionResolutionScale,ve.w*E.transmissionResolutionScale);const fe=E.getRenderTarget(),Se=E.getActiveCubeFace(),Ee=E.getActiveMipmapLevel();E.setRenderTarget(pe),E.getClearColor(lt),Ke=E.getClearAlpha(),Ke<1&&E.setClearColor(16777215,.5),E.clear(),ct&&De.render(V);const Ue=E.toneMapping;E.toneMapping=vn;const Fe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),A.setupLightsView(k),Ze===!0&&Ae.setGlobalState(E.clippingPlanes,k),Ar(M,V,k),X.updateMultisampleRenderTarget(pe),X.updateRenderTargetMipmap(pe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let je=0,ft=U.length;je<ft;je++){const dt=U[je],{object:nt,geometry:Rt,material:_e,group:Vt}=dt;if(_e.side===Rn&&nt.layers.test(k.layers)){const Xe=_e.side;_e.side=Ht,_e.needsUpdate=!0,Go(nt,V,k,Rt,_e,Vt),_e.side=Xe,_e.needsUpdate=!0,Te=!0}}Te===!0&&(X.updateMultisampleRenderTarget(pe),X.updateRenderTargetMipmap(pe))}E.setRenderTarget(fe,Se,Ee),E.setClearColor(lt,Ke),Fe!==void 0&&(k.viewport=Fe),E.toneMapping=Ue}function Ar(M,U,V){const k=U.isScene===!0?U.overrideMaterial:null;for(let z=0,pe=M.length;z<pe;z++){const ve=M[z],{object:fe,geometry:Se,group:Ee}=ve;let Ue=ve.material;Ue.allowOverride===!0&&k!==null&&(Ue=k),fe.layers.test(V.layers)&&Go(fe,U,V,Se,Ue,Ee)}}function Go(M,U,V,k,z,pe){M.onBeforeRender(E,U,V,k,z,pe),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(E,U,V,k,M,pe),z.transparent===!0&&z.side===Rn&&z.forceSinglePass===!1?(z.side=Ht,z.needsUpdate=!0,E.renderBufferDirect(V,U,k,z,M,pe),z.side=Zn,z.needsUpdate=!0,E.renderBufferDirect(V,U,k,z,M,pe),z.side=Rn):E.renderBufferDirect(V,U,k,z,M,pe),M.onAfterRender(E,U,V,k,z,pe)}function wr(M,U,V){U.isScene!==!0&&(U=Tt);const k=G.get(M),z=A.state.lights,pe=A.state.shadowsArray,ve=z.state.version,fe=oe.getParameters(M,z.state,pe,U,V,A.state.lightProbeGridArray),Se=oe.getProgramCacheKey(fe);let Ee=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,k.fog=U.fog;const Ue=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=ie.get(M.envMap||k.environment,Ue),k.envMapRotation=k.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ee===void 0&&(M.addEventListener("dispose",un),Ee=new Map,k.programs=Ee);let Fe=Ee.get(Se);if(Fe!==void 0){if(k.currentProgram===Fe&&k.lightsStateVersion===ve)return Vo(M,fe),Fe}else fe.uniforms=oe.getUniforms(M),N!==null&&M.isNodeMaterial&&N.build(M,V,fe),M.onBeforeCompile(fe,E),Fe=oe.acquireProgram(fe,Se),Ee.set(Se,Fe),k.uniforms=fe.uniforms;const Te=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),Vo(M,fe),k.needsLights=jc(M),k.lightsStateVersion=ve,k.needsLights&&(Te.ambientLightColor.value=z.state.ambient,Te.lightProbe.value=z.state.probe,Te.directionalLights.value=z.state.directional,Te.directionalLightShadows.value=z.state.directionalShadow,Te.spotLights.value=z.state.spot,Te.spotLightShadows.value=z.state.spotShadow,Te.rectAreaLights.value=z.state.rectArea,Te.ltc_1.value=z.state.rectAreaLTC1,Te.ltc_2.value=z.state.rectAreaLTC2,Te.pointLights.value=z.state.point,Te.pointLightShadows.value=z.state.pointShadow,Te.hemisphereLights.value=z.state.hemi,Te.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Te.spotLightMatrix.value=z.state.spotLightMatrix,Te.spotLightMap.value=z.state.spotLightMap,Te.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=A.state.lightProbeGridArray.length>0,k.currentProgram=Fe,k.uniformsList=null,Fe}function Ho(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=ss.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Vo(M,U){const V=G.get(M);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Zc(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let V=0,k=M.length;V<k;V++){const z=M[V];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function Jc(M,U,V,k,z){U.isScene!==!0&&(U=Tt),X.resetTextureUnits();const pe=U.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?U.environment:null,fe=j===null?E.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ze.workingColorSpace,Se=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ee=ie.get(k.envMap||ve,Se),Ue=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Fe=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!V.morphAttributes.position,je=!!V.morphAttributes.normal,ft=!!V.morphAttributes.color;let dt=vn;k.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(dt=E.toneMapping);const nt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Rt=nt!==void 0?nt.length:0,_e=G.get(k),Vt=A.state.lights;if(Ze===!0&&(We===!0||M!==he)){const at=M===he&&k.id===te;Ae.setState(k,M,at)}let Xe=!1;k.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Vt.state.version||_e.outputColorSpace!==fe||z.isBatchedMesh&&_e.batching===!1||!z.isBatchedMesh&&_e.batching===!0||z.isBatchedMesh&&_e.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&_e.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&_e.instancing===!1||!z.isInstancedMesh&&_e.instancing===!0||z.isSkinnedMesh&&_e.skinning===!1||!z.isSkinnedMesh&&_e.skinning===!0||z.isInstancedMesh&&_e.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&_e.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&_e.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&_e.instancingMorph===!1&&z.morphTexture!==null||_e.envMap!==Ee||k.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==Ue||_e.vertexTangents!==Fe||_e.morphTargets!==Te||_e.morphNormals!==je||_e.morphColors!==ft||_e.toneMapping!==dt||_e.morphTargetsCount!==Rt||!!_e.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,_e.__version=k.version);let Yt=_e.currentProgram;Xe===!0&&(Yt=wr(k,U,z),N&&k.isNodeMaterial&&N.onUpdateProgram(k,Yt,_e));let dn=!1,Fn=!1,mi=!1;const it=Yt.getUniforms(),pt=_e.uniforms;if(_.useProgram(Yt.program)&&(dn=!0,Fn=!0,mi=!0),k.id!==te&&(te=k.id,Fn=!0),_e.needsLights){const at=Zc(A.state.lightProbeGridArray,z);_e.lightProbeGrid!==at&&(_e.lightProbeGrid=at,Fn=!0)}if(dn||he!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),it.setValue(D,"projectionMatrix",M.projectionMatrix),it.setValue(D,"viewMatrix",M.matrixWorldInverse);const Bn=it.map.cameraPosition;Bn!==void 0&&Bn.setValue(D,xt.setFromMatrixPosition(M.matrixWorld)),T.logarithmicDepthBuffer&&it.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&it.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),he!==M&&(he=M,Fn=!0,mi=!0)}if(_e.needsLights&&(Vt.state.directionalShadowMap.length>0&&it.setValue(D,"directionalShadowMap",Vt.state.directionalShadowMap,X),Vt.state.spotShadowMap.length>0&&it.setValue(D,"spotShadowMap",Vt.state.spotShadowMap,X),Vt.state.pointShadowMap.length>0&&it.setValue(D,"pointShadowMap",Vt.state.pointShadowMap,X)),z.isSkinnedMesh){it.setOptional(D,z,"bindMatrix"),it.setOptional(D,z,"bindMatrixInverse");const at=z.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(D,"boneTexture",at.boneTexture,X))}z.isBatchedMesh&&(it.setOptional(D,z,"batchingTexture"),it.setValue(D,"batchingTexture",z._matricesTexture,X),it.setOptional(D,z,"batchingIdTexture"),it.setValue(D,"batchingIdTexture",z._indirectTexture,X),it.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&it.setValue(D,"batchingColorTexture",z._colorsTexture,X));const On=V.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&L.update(z,V,Yt),(Fn||_e.receiveShadow!==z.receiveShadow)&&(_e.receiveShadow=z.receiveShadow,it.setValue(D,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&U.environment!==null&&(pt.envMapIntensity.value=U.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=O0()),Fn){if(it.setValue(D,"toneMappingExposure",E.toneMappingExposure),_e.needsLights&&Qc(pt,mi),pe&&k.fog===!0&&be.refreshFogUniforms(pt,pe),be.refreshMaterialUniforms(pt,k,ne,se,A.state.transmissionRenderTarget[M.id]),_e.needsLights&&_e.lightProbeGrid){const at=_e.lightProbeGrid;pt.probesSH.value=at.texture,pt.probesMin.value.copy(at.boundingBox.min),pt.probesMax.value.copy(at.boundingBox.max),pt.probesResolution.value.copy(at.resolution)}ss.upload(D,Ho(_e),pt,X)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ss.upload(D,Ho(_e),pt,X),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&it.setValue(D,"center",z.center),it.setValue(D,"modelViewMatrix",z.modelViewMatrix),it.setValue(D,"normalMatrix",z.normalMatrix),it.setValue(D,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const at=k.uniformsGroups;for(let Bn=0,gi=at.length;Bn<gi;Bn++){const Wo=at[Bn];ee.update(Wo,Yt),ee.bind(Wo,Yt)}}return Yt}function Qc(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function jc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(M,U,V){const k=G.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),G.get(M.texture).__webglTexture=U,G.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:V,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const V=G.get(M);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,V=0){j=M,Y=U,H=V;let k=null,z=!1,pe=!1;if(M){const fe=G.get(M);if(fe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,fe.__webglFramebuffer),ge.copy(M.viewport),xe.copy(M.scissor),Ye=M.scissorTest,_.viewport(ge),_.scissor(xe),_.setScissorTest(Ye),te=-1;return}else if(fe.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(fe.__hasExternalTextures)X.rebindTextures(M,G.get(M.texture).__webglTexture,G.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ue=M.depthTexture;if(fe.__boundDepthTexture!==Ue){if(Ue!==null&&G.has(Ue)&&(M.width!==Ue.image.width||M.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}const Se=M.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(pe=!0);const Ee=G.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ee[U])?k=Ee[U][V]:k=Ee[U],z=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?k=G.get(M).__webglMultisampledFramebuffer:Array.isArray(Ee)?k=Ee[V]:k=Ee,ge.copy(M.viewport),xe.copy(M.scissor),Ye=M.scissorTest}else ge.copy(we).multiplyScalar(ne).floor(),xe.copy(ht).multiplyScalar(ne).floor(),Ye=Oe;if(V!==0&&(k=q),_.bindFramebuffer(D.FRAMEBUFFER,k)&&_.drawBuffers(M,k),_.viewport(ge),_.scissor(xe),_.setScissorTest(Ye),z){const fe=G.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,V)}else if(pe){const fe=U;for(let Se=0;Se<M.textures.length;Se++){const Ee=G.get(M.textures[Se]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,V,fe)}}else if(M!==null&&V!==0){const fe=G.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fe.__webglTexture,V)}te=-1},this.readRenderTargetPixels=function(M,U,V,k,z,pe,ve,fe=0){if(!(M&&M.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){_.bindFramebuffer(D.FRAMEBUFFER,Se);try{const Ee=M.textures[fe],Ue=Ee.format,Fe=Ee.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!T.textureFormatReadable(Ue)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Fe)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-k&&V>=0&&V<=M.height-z&&D.readPixels(U,V,k,z,ce.convert(Ue),ce.convert(Fe),pe)}finally{const Ee=j!==null?G.get(j).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(M,U,V,k,z,pe,ve,fe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(U>=0&&U<=M.width-k&&V>=0&&V<=M.height-z){_.bindFramebuffer(D.FRAMEBUFFER,Se);const Ee=M.textures[fe],Ue=Ee.format,Fe=Ee.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!T.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(U,V,k,z,ce.convert(Ue),ce.convert(Fe),0);const je=j!==null?G.get(j).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,je);const ft=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await td(D,ft,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(Te),D.deleteSync(ft),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,V=0){const k=Math.pow(2,-V),z=Math.floor(M.image.width*k),pe=Math.floor(M.image.height*k),ve=U!==null?U.x:0,fe=U!==null?U.y:0;X.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,ve,fe,z,pe),_.unbindTexture()},this.copyTextureToTexture=function(M,U,V=null,k=null,z=0,pe=0){let ve,fe,Se,Ee,Ue,Fe,Te,je,ft;const dt=M.isCompressedTexture?M.mipmaps[pe]:M.image;if(V!==null)ve=V.max.x-V.min.x,fe=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Ee=V.min.x,Ue=V.min.y,Fe=V.isBox3?V.min.z:0;else{const pt=Math.pow(2,-z);ve=Math.floor(dt.width*pt),fe=Math.floor(dt.height*pt),M.isDataArrayTexture?Se=dt.depth:M.isData3DTexture?Se=Math.floor(dt.depth*pt):Se=1,Ee=0,Ue=0,Fe=0}k!==null?(Te=k.x,je=k.y,ft=k.z):(Te=0,je=0,ft=0);const nt=ce.convert(U.format),Rt=ce.convert(U.type);let _e;U.isData3DTexture?(X.setTexture3D(U,0),_e=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(X.setTexture2DArray(U,0),_e=D.TEXTURE_2D_ARRAY):(X.setTexture2D(U,0),_e=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Vt=_.getParameter(D.UNPACK_ROW_LENGTH),Xe=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Yt=_.getParameter(D.UNPACK_SKIP_PIXELS),dn=_.getParameter(D.UNPACK_SKIP_ROWS),Fn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,dt.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),_.pixelStorei(D.UNPACK_SKIP_ROWS,Ue),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe);const mi=M.isDataArrayTexture||M.isData3DTexture,it=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const pt=G.get(M),On=G.get(U),at=G.get(pt.__renderTarget),Bn=G.get(On.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,at.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let gi=0;gi<Se;gi++)mi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(M).__webglTexture,z,Fe+gi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(U).__webglTexture,pe,ft+gi)),D.blitFramebuffer(Ee,Ue,ve,fe,Te,je,ve,fe,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||G.has(M)){const pt=G.get(M),On=G.get(U);_.bindFramebuffer(D.READ_FRAMEBUFFER,J),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,B);for(let at=0;at<Se;at++)mi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.__webglTexture,z,Fe+at):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pt.__webglTexture,z),it?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,On.__webglTexture,pe,ft+at):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,On.__webglTexture,pe),z!==0?D.blitFramebuffer(Ee,Ue,ve,fe,Te,je,ve,fe,D.COLOR_BUFFER_BIT,D.NEAREST):it?D.copyTexSubImage3D(_e,pe,Te,je,ft+at,Ee,Ue,ve,fe):D.copyTexSubImage2D(_e,pe,Te,je,Ee,Ue,ve,fe);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else it?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,nt,Rt,dt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,nt,dt.data):D.texSubImage3D(_e,pe,Te,je,ft,ve,fe,Se,nt,Rt,dt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Te,je,ve,fe,nt,Rt,dt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Te,je,dt.width,dt.height,nt,dt.data):D.texSubImage2D(D.TEXTURE_2D,pe,Te,je,ve,fe,nt,Rt,dt);_.pixelStorei(D.UNPACK_ROW_LENGTH,Vt),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Xe),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Yt),_.pixelStorei(D.UNPACK_SKIP_ROWS,dn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Fn),pe===0&&U.generateMipmaps&&D.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(M){G.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Y=0,H=0,j=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}}function Do(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new Io(t,128,128);return i.wrapS=i.wrapT=os,i.colorSpace=Gt,i.needsUpdate=!0,i}const co=Do("wood"),Xc=Do("stone"),hr=Do("cloth"),I={stone:new mt({color:kn.materials.stone,map:Xc,roughness:.72}),wall:new mt({color:kn.materials.wall,roughness:.88}),wood:new mt({color:kn.materials.wood,map:co,roughness:.52}),walnut:new mt({color:kn.materials.darkWood,map:co,roughness:.5}),gold:new mt({color:kn.materials.metal,metalness:.7,roughness:.36}),navy:new mt({color:kn.materials.blue,roughness:.65}),white:new mt({color:kn.materials.linen,map:hr,roughness:.93}),teal:new mt({color:kn.materials.accent,map:hr,roughness:.83}),rust:new mt({color:9920067,map:hr,roughness:.84}),carpet:new mt({color:6845561,map:hr,roughness:1}),black:new mt({color:1449508,roughness:.6}),green:new mt({color:3495746,roughness:.86}),leaf:new mt({color:6651984,roughness:.8}),glass:new mt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new mt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new mt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new mt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new mt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new mt({color:14000506,roughness:.9}),hair:new mt({color:2433314,roughness:.9}),ao:new Er({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},uo=new Map;function k0(n){let e=uo.get(n);return e||(e=new mt({color:n,roughness:.75}),uo.set(n,e)),e}function z0(){Object.values(I).forEach(n=>n.dispose()),uo.forEach(n=>n.dispose()),[co,Xc,hr].forEach(n=>n.dispose())}const Tr={box:new Zi(1,1,1),cylinder:new _s(1,1,1,12),sphere:new fs(1,12,8),leaf:new fs(1,8,6),cone:new vs(1,1,16),plane:new Ji(1,1)};function W(n,e,t,i,r,s,a,o=I.wood){const l=new Et(Tr.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function qe(n,e,t,i,r,s,a=I.gold){const o=new Et(Tr.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function wn(n,e,t,i,r,s,a,o=I.leaf){const l=new Et(Tr.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function ys(n,e,t,i,r,s=.022){const a=new Et(Tr.plane,I.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function $t(n,e,t,i=1,r=0){const s=new Ut;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),qe(s,0,.21,0,.21,.42,I.stone),qe(s,0,.76,0,.027,1.1,I.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;wn(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?I.leaf:I.green).rotation.set(.3,o,Math.sin(o)*.65)}return ys(s,0,0,.7,.55),s}function mr(n,e,t,i,r=1){const s=new Ut;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),qe(s,0,.035,0,.11,.045,I.gold),qe(s,0,.21,0,.019,.36,I.gold),qe(s,0,.42,0,.16,.22,I.shade),qe(s,0,.315,0,.135,.015,I.glow),s}function ui(n,e,t,i=0,r=I.teal){const s=new Ut;s.position.set(e,0,t),s.rotation.y=i,n.add(s),W(s,0,.43,0,.55,.14,.56,r),W(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])qe(s,a*.2,.2,o*.2,.025,.4,I.walnut);return s}function fr(n,e,t,i=0,r=1.5,s=I.teal){const a=new Ut;a.position.set(e,0,t),a.rotation.y=i,n.add(a),W(a,0,.32,0,r,.42,.64,s),W(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])W(a,o*(r/2-.08),.56,0,.16,.4,.7,s),W(a,o*r*.23,.55,-.17,.35,.28,.11,I.white);return W(a,0,.58,.04,r-.3,.11,.44,s),ys(a,0,0,r+.15,.95),a}function oi(n,e,t,i=.42){qe(n,e,.37,t,.055,.74,I.gold),qe(n,e,.75,t,i,.07,I.stone),qe(n,e,.04,t,i*.5,.06,I.walnut)}function ps(n,e,t,i){qe(n,e,t,i,.07,.13,I.white),qe(n,e,t-.065,i,.12,.018,I.white)}function Zl(n,e,t,i,r=1.15,s=.65,a=0){W(n,e,t,i,r+.07,s+.07,.06,I.gold),W(n,e,t,i+.04,r,s,.015,I.white),W(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?I.teal:I.window),W(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,I.stone),wn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,I.rust)}function G0(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Et)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new Pc(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function H0(n){const e=new Ut;e.name=n.id,e.userData.entityId=n.id,W(e,0,.04,0,4.7,.08,3.1,I.wood),W(e,0,1.19,-1.51,4.7,2.38,.14,I.wall),W(e,2.35,1.14,-.1,.1,2.28,2.75,I.stone),W(e,1.6,1.25,-1.41,1.05,1.9,.035,I.window);for(const s of[1.1,1.6,2.1])W(e,s,1.25,-1.35,.035,1.94,.04,I.gold);W(e,1.6,1.25,-1.35,1.08,.04,.04,I.gold);for(let s=1.03;s<1.26;s+=.06)W(e,s,1.28,-1.23,.04,1.94,.13,I.white);if(W(e,0,2.27,-1.27,4.53,.06,.065,I.glow),n.status==="unbuilt"){for(const s of[-1.3,0,1.3])W(e,s,.28,.1,.75,.5,.8,I.stone);return e}const t=n.type==="suite",i=n.type==="twin";W(e,-.67,.078,.07,2.85,.02,2.66,I.carpet);const r=(s,a)=>{W(e,s,.28,-.03,a+.09,.39,1.9,I.walnut),W(e,s,.51,.02,a,.23,1.85,n.status==="dirty"?I.stone:I.white),W(e,s,.7,-.98,a+.13,1.22,.12,I.walnut),W(e,s,.82,-.89,a-.05,.63,.08,I.teal),W(e,s,.67,-.58,a*.82,.13,.36,I.white),W(e,s,.646,.54,a,.075,.39,t?I.rust:I.teal),W(e,s,.49,1,a,.28,.04,I.white),ys(e,s,0,a+.25,2.25)};i?(r(-1.36,.88),r(-.22,.88)):r(-.75,1.68);for(const s of[-1.94,.43])W(e,s,.35,-.76,.41,.58,.5,I.walnut),W(e,s,.66,-.76,.45,.06,.53,I.stone),mr(e,s,.69,-.77,.8);if(Zl(e,-.75,1.79,-1.39,1.25,.54,Number(n.number)),t)fr(e,1.55,.22,-Math.PI/2,1.3,I.rust),oi(e,.97,.8,.25);else{W(e,1.61,.76,-.57,1.1,.1,.57,I.walnut);for(const s of[1.19,2.03])W(e,s,.37,-.57,.05,.75,.46,I.gold);W(e,1.59,.94,-.64,.35,.28,.04,I.screen),ui(e,1.65,.06,Math.PI),mr(e,2,.82,-.62,.66)}if($t(e,2.05,1.05,.63),(n.level??1)>1&&(Zl(e,-2.05,1.6,-1.38,.38,.56,n.level),$t(e,-2.05,.35,.55)),(n.level??1)>2&&W(e,0,2.12,-1.3,4.55,.035,.055,I.gold),W(e,-2.12,.52,.95,.22,1,.28,I.walnut),n.status==="reserved"&&W(e,1.2,.48,1.48,.25,.29,.1,I.gold),n.status==="cleaning"){W(e,1.05,.37,1.57,.55,.55,.35,I.navy);for(const s of[.83,1.27])qe(e,s,.09,1.57,.07,.07,I.black);W(e,1.05,.71,1.57,.6,.04,.41,I.gold),W(e,.95,.79,1.57,.3,.12,.22,I.white)}return n.status==="maintenance"&&(W(e,.6,.33,.9,.8,.1,.8,I.rust),W(e,.6,.52,.9,.1,.6,.1,I.gold)),e}function oa(n,e,t,i=2.12){qe(n,e,i+.13,t,.012,.45,I.gold),qe(n,e,i-.08,t,.24,.18,I.gold),qe(n,e,i-.18,t,.21,.015,I.glow)}function V0(n,e){if(W(n,0,1.2,-1.54,14.65,2.4,.14,I.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)W(n,t,1.2,-1.42,.035,2.38,.08,I.gold);else for(let t=-7;t<7;t+=.58)W(n,t,1.2,-1.43,.022,2.2,.04,I.wood)}function Li(n,e,t){W(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,I.window);for(let i=e;i<=t+.01;i+=.72)W(n,i,1.23,-1.32,.045,2.17,.06,I.gold);W(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,I.gold)}function W0(n,e,t){oi(n,e,t,.44),ui(n,e-.63,t,Math.PI/2),ui(n,e+.63,t,-Math.PI/2),ps(n,e-.18,.87,t),ps(n,e+.18,.87,t),qe(n,e,.83,t,.065,.12,I.gold)}function Jl(n,e,t){W(n,e,1.23,-1.35,t,1.86,.18,I.walnut);for(let i=.53;i<2;i+=.39){W(n,e,i,-1.14,t,.04,.42,I.gold),W(n,e,i+.035,-1.18,t-.1,.025,.05,I.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;qe(n,s,i+.13,-1.08,.048,.23,r%3?I.green:I.rust),qe(n,s,i+.27,-1.08,.019,.07,I.gold)}}}function X0(n){const e=new Ut;if(n!=="rooftop"&&(V0(e,n),W(e,0,.04,0,14.66,.08,3.15,n==="lobby"?I.stone:I.wood),W(e,0,2.31,-1.21,14.5,.04,.07,I.glow)),n==="lobby"){Li(e,4.3,7.2),W(e,0,1.35,-1.33,6.7,1.8,.11,I.stone),W(e,0,.48,.5,6.2,.84,.62,I.walnut),W(e,0,.94,.5,6.45,.12,.83,I.stone),W(e,0,.15,.86,6.08,.075,.035,I.glow);for(let t=-2.9;t<3;t+=.18)W(e,t,.5,.824,.035,.6,.025,I.gold);for(const t of[-1.8,1.7])W(e,t,1.12,.2,.42,.29,.045,I.screen),mr(e,t+.55,1.02,.46,.72);$t(e,-3.9,-.7,1.72),$t(e,4,-.55,1.6),fr(e,-5.75,.08,Math.PI/2,1.65,I.white),oi(e,-5.02,1,.47),$t(e,-6.4,1.4,.55),W(e,5.8,.045,1.18,2.2,.03,1.25,I.navy);for(const t of[4.65,6.95])W(e,t,1.13,.85,.08,2.28,.08,I.gold),W(e,t,1.17,.79,.65,2.18,.025,I.glass);W(e,5.8,2.18,1.24,2.6,.16,1.72,I.navy),W(e,5.8,2.08,2.03,2.55,.035,.04,I.gold);for(const t of[3.5,4.1])qe(e,t,.67,1.8,.025,1.15,I.gold),qe(e,t,.09,1.8,.08,.1,I.black);W(e,3.8,1.27,1.8,.65,.035,.04,I.gold),W(e,3.8,.18,1.8,.78,.08,.51,I.gold),W(e,3.76,.43,1.8,.37,.45,.25,I.rust);for(const t of[-2.8,0,2.8])oa(e,t,.1,2.02)}else if(n==="breakfast"){Li(e,4.3,7.2),Jl(e,0,4.5),W(e,0,.52,-.15,5,.9,.8,I.walnut),W(e,0,1.01,-.15,5.2,.12,.97,I.stone);for(const t of[-1.7,-.7,.3])W(e,t,1.14,-.17,.66,.14,.45,I.gold),W(e,t,1.24,-.17,.6,.08,.38,I.white);W(e,1.5,1.29,-.24,.43,.53,.38,I.black),qe(e,2.1,1.28,-.2,.15,.4,I.glass),qe(e,2.1,1.13,-.2,.145,.09,I.rust);for(const t of[-5.55,-3.4,3.8,6])W0(e,t,.68);for(const t of[-5.55,-3.4,0,3.8,6])oa(e,t,.5);$t(e,-6.9,-.87,1.1),$t(e,6.8,-.8,1.1)}else if(n==="club"){Li(e,-7.2,-3.8),Li(e,3.8,7.2),Jl(e,0,5.4),W(e,0,.58,-.24,5.55,1.02,.58,I.walnut),W(e,0,1.12,-.24,5.8,.11,.79,I.stone),W(e,0,.25,.071,5.5,.05,.035,I.glow);for(const t of[-1.8,-.6,.6,1.8])qe(e,t,.6,.6,.24,.12,I.teal),qe(e,t,.28,.6,.035,.58,I.gold),ps(e,t,1.24,-.15),oa(e,t,-.24);fr(e,-5.6,-.54,0,2.05,I.teal),oi(e,-5.6,.57,.5),ui(e,-4.38,.75,-Math.PI/3,I.rust),fr(e,5.25,-.54,0,2.1,I.rust),oi(e,5.25,.6,.52),ui(e,6.52,.7,-Math.PI/3,I.teal),$t(e,-6.9,.68,1.2),$t(e,6.9,-.8,1.25),mr(e,-4.15,.05,-.8,1.6)}else if(n==="gym"){Li(e,-7.2,7.2),W(e,0,.093,0,14.4,.025,2.9,I.carpet);for(const t of[-5.65,-3.8,-1.95]){W(e,t,.16,.15,.92,.21,1.72,I.black),W(e,t,.28,.17,.68,.015,1.42,I.carpet);for(const i of[-1,1])W(e,t+i*.42,.7,-.51,.075,1.1,.08,I.black),W(e,t+i*.42,1.13,-.2,.06,.06,.75,I.black);W(e,t,1.26,-.5,.85,.23,.14,I.black),W(e,t,1.3,-.409,.43,.12,.012,I.screen)}for(const t of[.1,1.65]){const i=qe(e,t,.41,.1,.36,.12,I.black);i.rotation.z=Math.PI/2,W(e,t,.39,.2,.07,.69,.09,I.gold),W(e,t,.81,.47,.37,.09,.24,I.black),W(e,t,1.05,-.32,.07,.55,.07,I.black),W(e,t,1.27,-.32,.5,.06,.07,I.gold)}W(e,5.45,.68,-.8,2.8,.07,.58,I.black);for(let t=4.2;t<6.8;t+=.46)qe(e,t,.82,-.8,.13,.16,I.black);for(const t of[3.65,5.2])W(e,t,.12,.61,1.08,.025,1.68,I.teal);$t(e,6.93,.82,1.2),W(e,2.76,.4,-.87,.6,.7,.53,I.walnut);for(let t=0;t<3;t++)W(e,2.76,.79+t*.065,-.87,.46,.065,.4,I.white)}else if(n==="spa"){Li(e,-7.2,7.2);for(const t of[-4.8,0,4.8]){W(e,t,.4,0,1.7,.6,2.05,I.walnut),W(e,t,.76,0,1.8,.14,2.1,I.white),W(e,t,.87,-.6,1.15,.12,.45,I.white),W(e,t,.86,.4,1.8,.03,.7,I.teal),$t(e,t+1.2,-.9,1.1),mr(e,t-1.2,.05,-.9,1.4);for(let i=0;i<3;i++)W(e,t+1.2,.15+i*.06,.75,.5,.06,.32,I.white)}}else{W(e,0,.03,0,15,.14,3.6,I.wood);for(let t=-7.3;t<7.4;t+=.24)W(e,t,.11,0,.017,.006,3.45,I.walnut);for(const t of[-6.65,-2.45,2.8,6.9])$t(e,t,-.8,1.45);for(const t of[-4.4,3.5]){oi(e,t,.45,.66),ui(e,t-.9,.4,Math.PI/2,I.white),ui(e,t+.9,.4,-Math.PI/2,I.white),ps(e,t+.2,.88,.45),qe(e,t,1.07,.45,.026,2.05,I.gold);const i=new Et(new vs(1.55,.32,8),I.white);i.position.set(t,2.04,.45),i.rotation.y=Math.PI/8,i.castShadow=!0,e.add(i)}fr(e,-.5,-.7,0,1.7,I.teal),oi(e,-.5,.45,.38);for(const t of[-7.35,7.35])W(e,t,.43,0,.055,.8,3.5,I.gold);for(let t=-7.3;t<=7.3;t+=1.46)qe(e,t,.43,1.7,.018,.8,I.gold);W(e,0,.8,1.7,14.7,.035,.035,I.gold),W(e,0,.46,1.7,14.7,.65,.014,I.glass)}return e}function $0(n,e){const t=new Ut,r=k0(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),s=l=>{const c=new Ut;return c.position.set(l,.31,0),t.add(c),W(c,0,-.11,0,.085,.26,.1,I.navy),W(c,0,-.245,.035,.11,.07,.17,I.black),c},a=s(-.08),o=s(.08);W(t,0,.47,0,.27,.34,.17,r),W(t,0,.58,.093,.07,.13,.012,I.white),["chill","family","points","forum","creator"].includes(e??"")||W(t,0,.55,.108,.018,.095,.016,I.navy),wn(t,0,.81,0,.185,.21,.16,I.skin),wn(t,0,.94,-.024,.193,.102,.163,I.hair);for(const l of[-.069,.069])wn(t,l,.84,.149,.021,.024,.01,I.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&W(t,l,.856,.156,.09,.066,.012,I.navy);for(const l of[-1,1]){const c=W(t,l*.18,.45,0,.075,.26,.085,r);c.rotation.z=l*.15,wn(t,l*.19,.303,.012,.047,.05,.045,I.skin)}if(e==="chill"&&(qe(t,0,1,0,.23,.06,I.white),qe(t,0,1.06,0,.16,.1,I.white)),e==="road"&&(W(t,.29,.25,.04,.22,.3,.15,I.walnut),W(t,.29,.44,.04,.12,.035,.05,I.gold)),e==="family"&&(W(t,0,.46,-.17,.3,.34,.17,I.rust),W(t,.27,.38,.05,.07,.2,.07,I.teal)),e==="points"&&(W(t,-.26,.4,.09,.15,.23,.025,I.white),W(t,-.26,.44,.11,.11,.04,.01,I.teal)),e==="hunter"&&(W(t,.24,.48,.12,.1,.18,.025,I.black),W(t,.24,.49,.138,.07,.12,.01,I.screen)),e==="forum"&&(wn(t,0,1.01,-.01,.21,.07,.18,I.navy),W(t,0,.99,.17,.2,.025,.16,I.navy),W(t,-.25,.42,.08,.15,.23,.04,I.black)),e==="creator"){W(t,0,.5,.16,.2,.13,.12,I.black);const l=qe(t,0,.5,.26,.065,.1,I.black);l.rotation.x=Math.PI/2,W(t,0,.63,.13,.025,.18,.02,I.walnut)}if(e==="proposal")for(const l of[-.07,0,.07])wn(t,l+.23,.49,.08,.065,.08,.065,I.rust),W(t,l+.23,.35,.08,.015,.21,.015,I.green);return e==="planner"&&(W(t,-.24,.47,.08,.19,.27,.04,I.teal),W(t,0,.54,.12,.08,.11,.015,I.white)),e==="whale"&&(W(t,0,.59,.12,.04,.09,.025,I.gold),W(t,.2,.36,.055,.08,.04,.09,I.gold),wn(t,0,.96,-.04,.2,.075,.18,I.hair)),e==="auditplus"&&(W(t,-.24,.47,.09,.19,.26,.04,I.walnut),W(t,-.24,.49,.12,.14,.19,.012,I.white),W(t,.23,.45,.09,.012,.17,.012,I.gold)),ys(t,0,0,.47,.3),{group:t,left:a,right:o}}function q0(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),d=o.points[c],f=o.points[Math.min(c+1,o.points.length-1)],u=n.group.position.clone();n.group.position.lerpVectors(d,f,l-c);const x=n.group.position.x-u.x,g=n.group.position.z-u.z,S=Math.hypot(x,g)>1e-4;S&&(n.group.rotation.y=Math.atan2(x,g));const m=S?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=m,n.right.rotation.x=-m;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Ql(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*Fi;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?_u[o]:0;e.push({id:a,floorId:i.id,position:new O(c,s,0),label:new O(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*Fi+3.6}}function Y0(n,e,t){const i=new Et(new Ji(e,t),new Er({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function K0(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class Z0{constructor(e,t){this.host=e,this.store=t,this.layout=Ql(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new B0({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cc,this.renderer.outputColorSpace=Gt,this.renderer.toneMapping=xo,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new _d;root=new Ut;camera=new xs;light=new Bd(16768942,3.1);ambient=new Nd(12638184,10651490,2.15);raycaster=new Gd;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new Ut;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;visualKey="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;W(this.root,a,o/2-1,l,1.5,o,1.7,I.navy);for(let c=.4;c<o-1;c+=.55)for(let d=-.45;d<.6;d+=.45)(s+Math.round(c*10)+Math.round(d*10))%3!==0&&W(this.root,a+d,c,l+.87,.14,.24,.015,s%3===0?I.shade:I.window)}W(this.root,0,-.32,0,30,.35,15,I.navy),W(this.root,0,-.13,.7,17.6,.16,5.3,I.stone),W(this.root,0,-.06,2.95,17,.09,.55,I.stone);for(const s of[-8.1,8.4])$t(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new Ut;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){W(o,0,-.085,0,15.05,.19,3.48,I.stone),W(o,0,-.12,1.77,15.2,.17,.19,I.navy),W(o,0,-.011,1.85,15.1,.025,.02,I.gold),W(o,0,2.405,-.02,15.05,.18,3.4,I.stone);for(const c of[-7.43,7.43])W(o,c,1.19,.18,.18,2.38,3.12,I.stone);W(o,7.94,1.19,-.24,.87,2.38,2.1,I.window);for(const c of[7.52,8.35])W(o,c,1.2,.84,.045,2.4,.06,I.gold);W(o,7.94,-.075,.1,.95,.19,2.85,I.navy),W(o,7.94,1.2,.87,.83,.025,.035,I.gold)}s.entityIds.forEach(c=>{const d=e.entities[c],f=this.layout.entities.find(g=>g.id===c),u=d.kind==="room"?H0(d):X0(d.role);u.name=c,u.userData.entityId=c,u.position.x=f.position.x,o.add(u);const x=Y0(c,d.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(u.add(x),this.colliders.push(x),d.kind==="room"){const g=document.createElement("button");g.className="room-label status-"+d.status,g.textContent=d.number,g.dataset.entityId=c,g.setAttribute("aria-label",d.number+" 房间"),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}else{const g=document.createElement("button");g.className="facility-label",g.dataset.entityId=c,g.textContent=d.name,g.setAttribute("aria-label","查看"+d.name),g.onclick=()=>this.store.select(c),this.labels.push(g),this.overlay.append(g)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),G0(this.root);const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new Er({color:16766861,transparent:!0,opacity:.9,depthTest:!1});W(this.halo,0,0,0,4.7,.025,.025,r),W(this.halo,0,2.31,0,4.7,.025,.025,r),W(this.halo,-2.35,1.15,0,.025,2.31,.025,r),W(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new ke((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=K0(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new O(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new O(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new O(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(a=>{a instanceof Pc&&a.dispose()}),this.scene.remove(this.root),this.colliders.forEach(a=>{a.geometry.dispose(),a.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new Ut,this.scene.add(this.root);const r=[...this.layout.floorY.keys()],s=a=>{const o=Math.floor((a.y-.07)/Fi+1e-5),l=r[o],c=e.floors.findIndex(d=>d.id===l);c>=0&&(a.y+=(c-o)*Fi)};this.actors.forEach(a=>{s(a.group.position),a.navigation?.points.forEach(s)}),this.layout=Ql(e),this.build(),this.bubbles.forEach(a=>this.overlay.append(a.el)),this.resize()}this.syncGuests(e),this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(r=>{const s=r.dataset.entityId===e.selectedId;r.classList.toggle("selected",s),r.setAttribute("aria-pressed",String(s))});const i=this.layout.entities.find(r=>r.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!i,i){const r=e.entities[i.id];this.halo.scale.x=r.kind==="room"?1:3.1,this.halo.position.set(i.position.x,i.position.y,2.05)}}key(e){return e.floors.map(t=>t.id).join(",")+"|"+Object.values(e.entities).filter(t=>t.kind==="room").map(t=>t.kind==="room"?t.status+":"+t.level:"").join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...$0(t.color,t.persona),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*Fi+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new O(o.x,o.level*Fi+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;this.actors.forEach(r=>q0(r,i?0:this.time,t)),e-this.lastPaint>90&&(this.lastPaint=e,this.bubbles.forEach(({el:r,actor:s,index:a})=>{const o=!!s.thought&&(Math.floor(this.time/5)+a)%5===0;r.style.display=o?"block":"none",o&&this.position(r,s.group.position.clone().add(new O(-.6,1.25,0)))})),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(Tr).forEach(e=>e.dispose()),z0(),this.overlay.remove()}}const Uo="jinwanyoutao_v8_game_1";function J0(){try{const n=localStorage.getItem(Uo);if(!n)return pa();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return Yi(e),e.guests.forEach(t=>ms(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=pa();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function $c(n){try{return localStorage.setItem(Uo,JSON.stringify(n)),!0}catch{return!1}}const Qn=gu(J0()),lr=Su(document.querySelector("#app"),Qn);let ho=!1,fo=Qn.getState().game.notice.startsWith("存档读取失败");const No=()=>{!ho&&!fo&&!$c(Qn.getState())&&(fo=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&Qn.advance(4*Qn.getState().speed)},1e3);setInterval(No,5e3);document.addEventListener("visibilitychange",No);window.addEventListener("pagehide",No);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){ho=!0;try{localStorage.removeItem(Uo),Qn.reset(),fo=!1,$c(Qn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{ho=!1}}});function bs(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}bs();window.visualViewport?.addEventListener("resize",bs);window.visualViewport?.addEventListener("scroll",bs);window.addEventListener("resize",bs);try{const n=new Z0(lr.stage,Qn);lr.setFocusHandler(e=>n.focusFloor(e)),lr.stage.addEventListener("world-error",e=>lr.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),lr.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
