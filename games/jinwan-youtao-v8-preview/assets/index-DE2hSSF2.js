(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function rd(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,r=!1,s=0,a=e.getState().game?.arrivals??0,o=e.getState().metrics.cash,l,c;const u=(h,p=.13,x=0)=>{if(!i||!r)return;const g=i.createOscillator(),m=i.createGain(),A=i.currentTime+x;g.frequency.value=h,m.gain.setValueAtTime(.016,A),m.gain.exponentialRampToValueAtTime(1e-4,A+p),g.connect(m),m.connect(i.destination),g.start(A),g.stop(A+p),g.onended=()=>{g.disconnect(),m.disconnect()}};t.onclick=async()=>{if(r=!r,r){if(i??=new AudioContext,await i.resume(),!l){const h=i.createBuffer(1,i.sampleRate*2,i.sampleRate),p=h.getChannelData(0);for(let g=0;g<p.length;g++)p[g]=(Math.random()-.5)*.08;l=i.createBufferSource(),l.buffer=h,l.loop=!0,c=i.createGain(),c.gain.value=.01;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=700,l.connect(x),x.connect(c),c.connect(i.destination),l.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(r)),t.title=r?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const d=e.subscribe(h=>{const p=Date.now();i&&c&&c.gain.setTargetAtTime(h.game?.weather==="rain"?.12:.015,i.currentTime,.5),r&&!document.hidden&&p-s>1800&&((h.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),s=p):h.metrics.cash>o&&(u(1046,.1),s=p)),a=h.game?.arrivals??0,o=h.metrics.cash}),f=()=>{document.hidden?i?.suspend():r&&i?.resume()};document.addEventListener("visibilitychange",f),window.addEventListener("pagehide",()=>{d(),i?.close()},{once:!0})}function Hc(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(o,l,c,u,d)=>{const f="floor-"+l,h="facility-"+l;e.push({id:f,number:o,label:l==="lobby"?"L":l==="rooftop"?"RF":o+"F",name:c,role:l,entityIds:[h]}),t[h]={id:h,kind:"facility",floorId:f,role:l,name:c,capacity:u,usage:d,staffing:l==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let o=2;o<n+2;o++){const l={id:"floor-"+o,number:o,label:o+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(o*100+c+1),d="room-"+u,f=r[((o-2)*3+c)%r.length];l.entityIds.push(d),t[d]={id:d,kind:"room",floorId:l.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:f,nightsLeft:f==="occupied"?c+2:0}}e.push(l)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([o,l,c,u,d,f,h],p)=>s.push({id:"public-"+p,name:h?"当班员工":"住客",tier:h?"Staff":"Member",floorId:"floor-"+o,thought:f,color:d,route:[l,c],z:u,staff:!!h}));for(const o of Object.values(t))o.kind==="facility"&&(o.usage=s.filter(l=>l.floorId===o.floorId&&!l.staff).length,o.staffing=s.filter(l=>l.floorId===o.floorId&&l.staff).length);for(const o of s){const l=o.roomId?t[o.roomId]:null;l?.kind==="room"&&l.status==="occupied"&&(l.guestId=o.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(o=>!o.roomId||!!t[o.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const Ri=[{title:"参加第一次晨会",target:"brief",department:"front",why:"先看今天的预订与早餐需求。第一次沿用当前方案，点「开始今天」即可。",unlock:"到店接待"},{title:"亲自安排一位客人入住",target:"front",department:"front",why:"点选一间可售客房。房费在午夜结算；会员升套会占用套房库存。",unlock:"房态与住客服务"},{title:"见证一间客房翻房完成",target:"hotel",department:"house",why:"清洁中的房间不能出售。已有房间正在翻房；关闭菜单让时间继续，或安排脏房清洁。",unlock:"餐饮备货"},{title:"为早餐补一次库存",target:"operations-data",department:"fnb",why:"采购 ¥300 得到 50 份早餐。备货降低断供风险，也会占用现金。",unlock:"客房主管"},{title:"聘任客房主管",target:"operations",department:"house",why:"选择 Housekeeping 主管：到岗 ¥3,800，每天工资 ¥180，之后会自动接手清洁。",unlock:"完整团队、房价决策与成长认证"}];function Vc(n,e=!1){return n.game.onboarding??={step:e?Ri.length:0,legacy:e,baseline:{...n.game.development?.counts??{}}}}function Ur(n){const e=n.game?.onboarding;if(!e||e.legacy)return null;const t=Ri[e.step];return t?{...t,department:t.department,index:e.step,total:Ri.length}:null}function Wc(n){const e=n.game,t=e.onboarding;if(!t||t.legacy)return;const i=e.development?.counts??{},r=[!e.operations?.briefOpen,(i.arrivals??0)>(t.baseline.arrivals??0),(i.service??0)>(t.baseline.service??0),!!t.breakfastPrepared,e.managers.house>0],s=t.step;for(;t.step<Ri.length&&r[t.step];)t.step++;t.step!==s&&(e.notice="✓ "+Ri[t.step-1].title+" · 已解锁"+Ri[t.step-1].unlock+"。",e.logs.push({id:e.nextId++,day:e.day,minute:e.minute,category:"部门",text:e.notice}))}function $o(n,e){const t=n.game?.onboarding;if(!t||t.legacy)return null;const i=t.step,r=n.game?.campaign?.chapter??0;return e==="stock"&&i<3?"完成翻房带教后解锁餐饮备货":e==="team"&&i<4?"完成早餐备货后解锁客房主管":e==="strategy"&&i<5?"聘任客房主管后解锁完整团队与经营策略":e==="upgrade"&&(i<5||r<3)?"通过会员体验回访后解锁客房与公区升级":(e==="activity"||e==="expansion")&&(i<5||r<4)?"通过新空间试营业后解锁活动、营销与扩建":null}function wl(n,e){const t={operations:"team","operations-data":"stock",development:"upgrade","development-data":"activity","hotel-data":"expansion","room-data":"strategy","brief-data":"strategy",score:"strategy",career:"strategy","tasks-data":"strategy"};return t[e]?$o(n,t[e]):null}function Xc(n,e){const t={stock:"stock",hire:e.id==="house"?"team":"strategy",train:"strategy","day-plan":"strategy",price:"strategy",position:"strategy","suite-policy":"strategy",upgrade:"upgrade",invest:"upgrade","build-spa":"expansion",expand:"expansion","configure-room":"expansion",activity:"activity",campaign:"activity","book-inspection":"strategy","prepare-inspection":"strategy","continue-chapter":"strategy"};return t[e.type]?$o(n,t[e.type]):null}const sd=["完整翻房运营","会员承诺检验","客房与公区升级","主题活动、营销与扩建","自由经营"],ui={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},di=n=>n.category??(n.type==="suite"?"suite":"standard"),$c=n=>n.bed??(n.type==="twin"?"twin":"king"),qc=n=>["suite","premium"].includes(di(n)),$t=n=>di(n)==="suite",za=n=>ui[di(n)].name+" · "+($c(n)==="twin"?"双床":"大床"),Yc=n=>Object.values(n.entities).filter(e=>e.kind==="room"),nt=n=>Yc(n).filter(e=>e.status!=="unbuilt"),Kc=n=>nt(n).filter(e=>$t(e)&&e.status==="available").length,Zc=n=>nt(n).filter(e=>e.status==="occupied").length,Rl=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId),jr=2.12,es=7.94,qt=n=>n.game.day*1440+n.game.minute;function mr(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:qt(n)+20+Ui(e.id)%75,trail:[],revision:0}}function Ui(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function on(n,e,t){mr(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(f=>f.id===r.floorId),o=i.position,l=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Ui(e.id+t)%12*.95,c=s?2.8:1.25,u=[],d=(f,h,p,x)=>u.push({x:f,z:h,level:p,phase:x});return d(o.x,jr,o.level,"corridor"),Math.abs(a-o.level)>.001&&(d(es,jr,o.level,"corridor"),d(es,.9,o.level,"elevator"),d(es,.9,a,"elevator"),d(es,jr,a,"corridor")),d(l,jr,a,"corridor"),d(l,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=qt(n)+60,e.visitUntil=void 0,!0}function ad(n,e,t){mr(n,e);const i=e.movement;if(!i.steps.length)return on(n,e,t);const r=i.steps,s=i.position;i.position={...r[r.length-1]},i.steps=[];const a=on(n,e,t);return i.steps=[...r,...i.steps],i.position=s,a}function Jc(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,o=(i.level-r.level)*2.55,l=Math.hypot(s,a,o),c=o!==0?.85:.65;if(r.phase=i.phase,l<=c)t.position={...i},t.steps.shift();else{const u=c/l;r.x+=s*u,r.z+=a*u,r.level+=o/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=qt(n)+45+Ui(e.id+qt(n))%65,!0)}function od(n){for(const e of n.guests)mr(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function Qc(n){n.movement&&n.movement.trail.push({...n.movement.position})}function Cl(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const qo=n=>n.lateHour??(n.tier==="Globalist"?16:14),Ci=n=>qo(n)===16?"4PM":"2PM",Wr=n=>qo(n)===16?14:12,jc=n=>n.late==="honor"?qo(n)*60:n.late==="deny"||n.late==="pending"?Wr(n)*60:660;function eu(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const Yo={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},tu=n=>n.name+":"+n.persona;function pn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=qt(n)+35,e.speech.next=0,rr(n,e)}function rr(n,e){if(e.staff)return;const t=qt(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(p=>p.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,o=(i.eventUntil??0)>=t?i.event:"",l=[r?.position.phase,a,s,o,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===l)return;i.context=l;const c=e.persona??"chill",u=Object.values(n.entities).filter(p=>p.kind==="room"&&$t(p)&&p.status==="available").length;let d=[];if(o==="birthday"&&e.occasion?.resolved)d=[e.occasion.outcome??"生日安排已确认。"];else if(o==="checkout"&&e.departing)d=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(o==="checkin"&&e.roomId)d=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(o==="denied")d=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(o==="late-honor"&&e.late==="honor")d=[Ci(e)+" 确认了，终于能从容收行李。"];else if(o==="late-deny"&&e.late==="deny")d=["协商到 "+Wr(e)+":00 退房，得把下午行程挪一挪。"];else if(o==="recovery"&&e.serviceDone)d=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(o==="renovation"&&!a)d=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)d=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)d=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)d=["该出发了，最后检查一下行李。"];else if(!e.roomId)d=[Yo[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")d=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(d=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const p=e.experience,x=p?.place==="facility-"+s&&t-p.at<150;x&&p.kind==="shortage"?d=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:x&&p.kind==="served"?d=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:d=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&d.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Ci(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&d.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const p=n.game.operations?.profiles[e.profileId??""];s==="guest"&&p&&p.visits>0&&d.push(p.trust>=2?"这家以后可以常住，下次带朋友来。":p.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const x=n.game.guestMemory?.[tu(e)];s==="guest"&&x?.visits&&d.push(x.satisfaction<80?"上次住得不太顺，这次再看看。":x.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const f=n.game.dialogueRecent??={};for(const[p,x]of Object.entries(f))t-x>240&&delete f[p];const h=d.filter(p=>!i.recent.some(x=>x.text===p&&t-x.at<180)&&t-(f[p]??-9999)>25);if(h.length){const p=h[Ui(e.id+t)%h.length];e.thought=p,i.recent.push({text:p,at:t}),i.recent=i.recent.slice(-8),f[p]=t}else e.thought="";i.next=t+45}function kr(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(r=>!r.staff&&!r.departing&&r.floorId===t.floorId&&!r.movement?.steps.length)??n.guests.find(r=>r.staff&&(r.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function gr(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function vn(n,e,t=1){const i=gr(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)if(r.id===e){if(r.progress=Math.min(r.goal,r.progress+t),r.claimed)continue;const s=Math.min(4,r.goal),a=Math.floor(r.progress/r.goal*s),o=Math.floor(r.reward*.7*a/s),l=Math.max(0,o-(r.paid??0));l&&(r.paid=(r.paid??0)+l,n.metrics.cash+=l,n.game.revenue+=l,n.game.rewardBeat={id:n.game.nextId++,text:r.title+" "+r.progress+"/"+r.goal,amount:l},n.game.logs.push({id:n.game.nextId++,day:n.game.day,minute:n.game.minute,category:"收益",text:"阶段反馈："+r.title+"，到账 ¥"+l+"；计入原任务奖金。"}))}}const ld=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function cd(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,o]=ld[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:o}})}function Br(n){const e=nt(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function nu(n){const e=n.game.development,t=nt(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const Nr={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function ir(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function ts(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function ud(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=gr(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;if(r.construction)return t.notice="该公区正在施工。",!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;ts(n,3500*s)&&(r.construction={remaining:120,total:120,targetLevel:s+1},kr(n,r.id),vn(n,"upgrade"),ir(n,r.name+"开始封闭改造：2 小时后升级至 "+(s+1)+" 级。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;ts(n,4500*s)&&(t.managers[r]++,ir(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;ts(n,2200)&&(i.campaignUntil=t.day+2,ir(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=Nr[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;ts(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},ir(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=nu(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,ir(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function dd(n){const e=n.game,t=gr(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=Nr[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(f=>f.roomId),o=s?.kind==="facility"?s.level??1:1,l=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(l,Math.round(a.length*c)),d=Math.round(u*r.fee*(1+(o-1)*.2));n.metrics.cash+=d,e.revenue+=d,vn(n,"revenue",d),vn(n,"ancillary",d),vn(n,"activity");for(const f of a.slice(0,u))f.satisfaction=Math.min(100,(f.satisfaction??90)+5),f.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,ir(n,r.name+"结束："+u+" 人参加，收入 ¥"+d+"，活动净额 ¥"+(d-r.cost)+"。")}const iu={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function Yn(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function en(n,e,t="部门",i){const r=n.game;r.notice=e,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:t,text:e,target:i})}function Ga(n,e){const t=Yn(n),i="profile-"+n.game.nextId++,r=Ui(i),s=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][r%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(r/8)%8],persona:s[r%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function ru(n,e=n.game.price){const t=n.game,i=t.operations,r=(t.day-1)%7>=5,s=t.positioning==="business"?r?.75:1.3:t.positioning==="resort"?r?1.4:.9:1.1;return Math.max(1,Math.round((3+nt(n).length*.12)*s*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Pi(n){const e=n.game,t=e.operations,i=t.bookings.filter(f=>f.status!=="lost"),r=i.filter(f=>f.status==="confirmed"),s=n.guests.filter(f=>f.roomId&&!f.departing),a=s.filter(f=>(f.checkoutDay??e.day)>e.day).length,o=s.length-a,l=ru(n),c=nt(n).filter(f=>!f.construction).length,u=Math.min(c,a+r.length+Math.max(0,l-t.walkinArrivals)),d=f=>f.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:l,breakfast:s.reduce((f,h)=>f+d(h),0),housekeeping:o+nt(n).filter(f=>f.status==="dirty"||f.status==="cleaning").length,suites:r.filter(f=>t.profiles[f.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(f=>f.segment==="商务").length,resort:i.filter(f=>f.segment==="度假").length,group:i.filter(f=>f.segment==="团队").length,price:e.price}}function Ko(n,e=!0){const t=n.game,i=Yn(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let r=(t.seed^Math.imul(t.day,2654435761))>>>0;const s=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),a=s();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const o=nt(n).filter(h=>!h.construction).length,l=o-n.guests.filter(h=>h.roomId&&(h.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(o+2,Math.round(l*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(h=>h.visits>0&&!n.guests.some(p=>p.profileId===h.id)),d=new Set;for(let h=0;h<c;h++){let p=u.find(A=>!d.has(A.id)&&s()<.5);p||(p=Ga(n,s())),d.add(p.id);const x=i.event==="expo"&&h<Math.ceil(c*.35)?"团单":s()<.6?"APP":"平台",g=t.positioning==="resort"||(t.day-1)%7>=5&&s()<.6,m={id:"booking-"+t.nextId++,profileId:p.id,source:x,eta:x==="团单"?840:780+Math.floor(s()*330),nights:eu(g,s(),s()),rate:Math.round(t.price*(x==="团单"?.88:1)),segment:x==="团单"?"团队":g?"度假":"商务",status:"confirmed"};if(h===0&&t.day%2===1&&(m.occasion="birthday"),h<2&&(m.challenge=p.persona==="auditplus"?"audit":p.persona==="family"?"family":p.tier==="Globalist"?"sua":"quiet"),m.challenge==="sua"){const A=nt(n).find(C=>$t(C)&&C.status==="available"&&!C.suaBookingId);A?(m.sua=!0,m.roomId=A.id,A.suaBookingId=m.id,A.status="reserved"):m.challenge="quiet"}i.bookings.push(m)}const f=u.find(h=>h.trust>=2&&h.visits>=2);if(f&&l>i.bookings.length){const h=Ga(n,s());h.referredBy=f.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:h.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Pi(n),Xr(n),Jo(n),e&&(t.paused=!0),en(n,`早班准备：${i.bookings.length} 笔确认预订，${iu[i.event]}。`)}function fd(n,e){const t=Yn(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function hd(n,e,t){const i=Yn(n);let r=t?i.profiles[t.profileId]:void 0;r||(r=Ga(n,Ui(e.id)%100/100)),e.profileId=r.id,e.name=r.name,e.persona=r.persona,e.tier=r.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,(t?.occasion==="birthday"||!t&&i.walkinArrivals===1&&n.game.day%2===1)&&(e.occasion={kind:"birthday",resolved:!1}),e.satisfaction=Math.max(65,Math.min(98,88+r.trust*2))}function Zo(n,e){const t=Yn(n),i=t.bookings.find(r=>r.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),en(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const r=n.entities[i.roomId];r?.kind==="room"&&r.suaBookingId===i.id&&(r.suaBookingId=void 0,r.status==="reserved"&&(r.status="available"))}}function pd(n,e){const t=Yn(n),i=t.profiles[e.profileId??""];if(!i)return;const r=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(r?1:-1))),i.spend+=e.spend??0;const s=r?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:s}),i.history=i.history.slice(-8),r?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),en(n,i.name+"："+s,"入住")}function md(n,e){const t=n.game,i=Yn(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Pi(n),Jo(n),i.briefOpen=!1,t.paused=!1,en(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",en(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const r=n.guests.find(c=>c.id===e.id),s=r?.challenge;if(!r||!s||s.resolved)return!0;if(!r.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=s.kind==="quiet"&&e.value==="quiet"||s.kind==="family"&&e.value==="family"||s.kind==="audit"&&e.value==="inspect"||s.kind==="sua"&&e.value==="inventory",o=e.value==="decline"?0:a?180:100;if(n.metrics.cash<o)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=o,t.expense+=o,s.resolved=!0;let l=a&&(s.kind!=="sua"||!!r.upgrades);if(a&&s.kind==="family"&&(l=t.stock>=6,l)){t.stock-=6;const c=n.entities[r.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&s.kind==="audit"&&(l=!!t.managers.house&&!!t.managers.engineering&&!nt(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&s.kind==="quiet"){const c=n.entities[r.roomId??""];if(c&&n.floors.some(d=>d.construction&&Math.abs(d.number-(n.floors.find(f=>f.id===c.floorId)?.number??0))<=1)){const d=nt(n).find(f=>f.status==="available"&&!f.construction&&!n.floors.some(h=>h.construction&&Math.abs(h.number-(n.floors.find(p=>p.id===f.floorId)?.number??0))<=1));l=!!d,d&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,d.status="occupied",d.guestId=r.id,d.nightsLeft=Math.max(0,(r.checkoutDay??t.day)-t.day),r.roomId=d.id,r.movement?.steps.length||on(n,r,d.id))}}return r.serviceDone=l,r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(l?8:-8))),s.outcome=l?"需求已兑现":"未解决核心诉求",vn(n,"resolve"),pn(n,r,l?"recovery":"denied"),en(n,r.name+"："+s.outcome+"，支出 ¥"+o+"。",l?"部门":"客诉",r.roomId??"facility-lobby"),!0}return!1}const li=[{title:"接住第一批客人",action:"办理 3 次入住",counter:"arrivals",goal:3,target:"front",exam:"试住客回访",threshold:62,department:"front"},{title:"让房间周转起来",action:"完成 3 次清洁或维修",counter:"service",goal:3,target:"hotel",exam:"早班运营巡检",threshold:66,department:"house"},{title:"兑现住客的承诺",action:"完成 2 次诉求处理",counter:"resolve",goal:2,target:"events",exam:"会员体验回访",threshold:70,department:"front"},{title:"让升级经得起体验",action:"完成 1 次装修或公区升级",counter:"upgrade-complete",goal:1,target:"development",exam:"新空间试营业",threshold:72,department:"engineering"},{title:"办一场让人记住的活动",action:"完成 1 场主题活动",counter:"activity",goal:1,target:"development-data",exam:"总部经营评审",threshold:74,department:"revenue"}],Pl=n=>n.game.day*1440+n.game.minute;function Xs(n){return n.game.campaign??={chapter:0,baseline:{...n.game.development?.counts??{}},certificates:[],attempts:0}}function zr(n){const e=n.game.campaign,t=li[e?.chapter??0];if(!t)return null;const r=t.counter==="upgrade-complete"&&Object.values(n.entities).filter(s=>s.kind==="facility"||s.kind==="room"&&s.status!=="unbuilt").every(s=>(s.level??1)>=5&&!s.construction)?t.goal:Math.min(t.goal,Math.max(0,(n.game.development?.counts[t.counter]??0)-(e?.baseline[t.counter]??0)));return{...t,progress:r,ready:r>=t.goal}}function Fr(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function gd(n,e){if(!["book-inspection","prepare-inspection","continue-chapter"].includes(e.type))return!1;const t=n.game,i=Xs(n),r=zr(n);if(e.type==="book-inspection"){if(!r||!r.ready||i.inspection||i.result?.passed)return t.notice="先完成当前目标；预约中的检验无需重复预约。",!0;t.seed=Math.imul(t.seed,1664525)+1013904223>>>0,i.inspection={due:(t.day+1)*1440+1080,chapter:i.chapter,phase:"booked",roll:t.seed%13-6,prepared:!1},i.attempts++,i.result=void 0,Fr(n,r.exam+"已预约：明天 18:00 到店，先保障客房、库存和服务。")}if(e.type==="prepare-inspection"){const s=i.inspection;if(!s||s.phase!=="booked"||s.prepared)return t.notice="本次检验已准备，或正在进行。",!0;if(n.metrics.cash<300)return t.notice="准备需要 ¥300；也可以不额外投入。",!0;n.metrics.cash-=300,t.expense+=300,s.prepared=!0,Fr(n,"投入 ¥300 做现场彩排：检验表现 +6，仍需实际服务达标。")}if(e.type==="continue-chapter"){if(i.result?.chapter!==i.chapter||!i.result.passed)return t.notice="先完成本阶段检验。",!0;i.certificates.push(li[i.chapter].exam),i.chapter++,i.baseline={...t.development?.counts??{}},i.inspection=void 0,i.result=void 0,i.attempts=0,Fr(n,li[i.chapter]?"下一阶段："+li[i.chapter].title+"。":"五段经营主线完成，酒店进入自由经营。")}return!0}function vd(n){const e=Xs(n),t=e.inspection;if(!t||(t.phase==="booked"&&Pl(n)>=t.due&&(t.phase="visiting",Fr(n,li[e.chapter].exam+"到店：先看房、再用餐、最后核对服务；30 分钟后回访。")),t.phase!=="visiting"||Pl(n)<t.due+30))return;const i=n.game,r=nt(n).filter(p=>p.status!=="unbuilt"),s=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),a=r.filter(p=>!["dirty","cleaning","maintenance"].includes(p.status)&&!p.construction).length/Math.max(1,r.length),o=s.length?s.reduce((p,x)=>p+(x.satisfaction??90),0)/s.length:80,l=Math.max(0,100-i.events.length*12-s.filter(p=>p.challenge&&!p.challenge.resolved||p.late==="pending").length*8),c=Math.min(100,Math.min(i.stock,i.clubStock)*5),u=Math.round(a*25+o*.3+l*.25+c*.2),d=Math.max(0,Math.min(100,u+t.roll+(t.prepared?6:0))),f=d>=li[e.chapter].threshold,h=[{value:a*100,text:"先清洁脏房、完成维修，减少封闭房。",target:"hotel"},{value:o,text:"处理客人的核心诉求，减少只送礼未兑现。",target:"events"},{value:l,text:"先解决积压事件和晚退请求。",target:"events"},{value:c,text:"先补足早餐和酒廊的库存。",target:"operations-data"}].sort((p,x)=>p.value-x.value)[0];e.result={chapter:e.chapter,passed:f,score:d,day:i.day,minute:i.minute,advice:f?"体验通过。确认后开启下一段经营目标。":h.text,target:h.target,scenes:[a>=.7?"Room Check：多数房间整洁可售。":"Room Check：发现翻房或维修积压。",c>=75?"F&B：餐台供应顺畅。":"F&B：餐台库存让体验打了折扣。",l>=80?"Front Office：承诺与服务顺利交接。":"Front Office：还有诉求未接住。"]},e.inspection=void 0,Fr(n,li[e.chapter].exam+"："+(f?"通过":"需要改善")+"（"+d+" / "+li[e.chapter].threshold+"）。"+e.result.advice)}const sr={occupancy:{name:"稳健接客",price:720,hold:!1,description:"用适中房价接住需求，套房开放销售。",risk:"客流更多，翻房和前台压力也更大。"},experience:{name:"照顾体验",price:720,hold:!0,description:"留一间会员套房，早餐与酒廊各预备 20 份。",risk:"预采购 ¥240；留套会减少付费销售空间。"},margin:{name:"争取利润",price:850,hold:!1,description:"提高挂牌价，保留套房付费销售机会。",risk:"Walk-in 会减少，已确认订单不会跟着涨价。"}};function Xr(n){const e=n.game;return e.plan?.day===e.day?e.plan:e.plan={day:e.day,focus:"occupancy",selected:!1,prepared:!1,target:0}}function su(n,e){const t=n.game,i=Pi(n),r=nt(n),s=380+r.length*65+Object.values(t.managers).reduce((u,d)=>u+d*180,0);if(e==="experience")return 90;if(e==="occupancy")return Math.max(40,Math.min(90,Math.floor(i.occupancy*.9/5)*5));const a=n.guests.filter(u=>u.roomId&&!u.departing),o=t.operations.bookings.filter(u=>u.status==="confirmed"),l=[...a.map(u=>u.rate??t.price),...o.map(u=>u.rate)],c=l.length?l.reduce((u,d)=>u+d,0)/l.length:t.price;return Math.max(0,Math.floor((r.length*i.occupancy/100*c*.9-s-t.expense)*.8/100)*100)}function Jo(n){const e=Xr(n);e.target=su(n,e.focus),e.review=void 0}function _d(n,e){if(e.type!=="day-plan")return!1;const t=n.game,i=Xr(n),r=String(e.value);if(!Object.hasOwn(sr,r)||!t.operations?.briefOpen)return t.notice="经营方向在早班晨会确定，营业后可继续处理具体决定。",!0;const s=sr[r],a=r==="experience"&&!i.prepared?240:0;return n.metrics.cash<a?(t.notice="预采购需要 ¥240；也可以维持现有安排。",!0):(a&&(n.metrics.cash-=a,t.expense+=a,t.stock+=20,t.clubStock+=20,i.prepared=!0),i.focus=r,i.selected=!0,t.price=s.price,t.operations.suitePolicy=s.hold?"hold":"sell",i.target=su(n,r),en(n,"晨会方向："+s.name+"。挂牌 ¥"+t.price+"，"+(s.hold?"保留一间会员套房":"套房开放销售")+(a?"，餐台预采购 ¥240":"")+"。"),!0)}function au(n,e,t){n.game;const i=Xr(n),r=n.guests.filter(c=>!c.staff&&c.roomId&&!c.departing),s=Math.round(r.length/Math.max(1,nt(n).length)*100),a=r.length?Math.round(r.reduce((c,u)=>c+(u.satisfaction??90),0)/r.length):0,o=i.focus==="occupancy"?s:i.focus==="experience"?a:Math.round(e),l=o>=i.target&&(i.focus!=="experience"||r.length>0);return i.review={actual:o,target:i.target,focus:i.focus,success:l,phase:t,lesson:i.focus==="occupancy"?l?"房间接住了需求。扩建前再看明天是否持续满房。":"先核对拒客、空房与翻房积压，再考虑降低报价。":i.focus==="experience"?l?"住客体验守住了。把兑现承诺的方式交给主管。":"回看未兑现的诉求和断供；送礼不能替代实际服务。":l?"利润目标达到。保留明天的工资、翻房和备餐资金。":"高价没有自动变成利润。先分清客流不足与额外支出。"},{...i.review}}const ns=(n,e)=>n==="margin"?"¥"+Math.round(e).toLocaleString("en-US"):Math.round(e)+(n==="occupancy"?"%":" 分");function xd(n){const e=n.game,t=nt(n),i=n.guests.filter(l=>!l.staff&&!l.roomId&&!l.departing),r=t.find(l=>l.status==="dirty"),s=n.guests.filter(l=>!l.departing&&l.roomId&&(l.late==="pending"||l.challenge&&!l.challenge.resolved||l.occasion&&!l.occasion.resolved));if(e.reportOpen)return{title:"把今天的结果带进明天",why:"房费已结算，先看判断是否奏效，再安排下一天。",target:"report",department:"revenue"};if(e.operations?.briefOpen)return{title:"先确定今天的经营方向",why:"比较接客、体验与利润的取舍，确认后开始营业。",target:"brief",department:"revenue"};const a=Ur(n);if(a)return{title:a.title,why:a.why,target:a.target,department:a.department};if(e.events.length)return{title:e.events[0].title,why:"现场问题有处理时限，先避免小问题变成客诉。",target:"events",department:"front"};if(i.length)return{title:"接住 "+i.length+" 位到店客人",why:"先办理入住，再兑现生日、晚退或会员安排。",target:"front",department:"front"};if(r)return{title:r.number+" 翻房后才能再次出售",why:"先让现有客房创造收入，再花钱扩大容量。",target:"hotel",department:"house",entity:r.id};if(s.length)return{title:"还有 "+s.length+" 位客人的承诺待确认",why:"看实际条件与机会成本，礼遇不是唯一合理答案。",target:"events",department:"front"};if(e.stock<20||e.clubStock<20)return{title:"先稳住餐台供应",why:"当前库存偏低；补货能直接改善下一批客人的体验。",target:"operations-data",department:"fnb"};const o=zr(n);return e.campaign?.result?{title:e.campaign.result.passed?"检验通过，进入下一段成长":"检验发现差距，先落实改进",why:e.campaign.result.advice,target:"tasks",department:"revenue"}:e.campaign?.inspection?{title:"下一次体验检验已预约",why:"先检查房态、库存与未兑现承诺；到店后才会公布结果。",target:"tasks",department:"front"}:o?{title:o.ready?"预约一次实际体验检验":o.action,why:e.campaign?.inspection?"检验已预约，留出时间检查房态、备货和服务。":"日常行动推进酒店主线；完成后用真实体验验证。",target:e.campaign?.inspection||o.ready?"tasks":o.target,department:o.department}:{title:"把盈余投入下一段成长",why:"先留够工资与服务资金，再选择装修、设施或主题活动。",target:"development",department:"revenue"}}function ou(n,e){const t=n.game,i=nt(n).filter(l=>$t(l)&&l.status==="available"&&!l.construction&&!l.suaBookingId),r=t.operations?.bookings.filter(l=>l.status==="confirmed"&&!l.sua&&t.operations?.profiles[l.profileId]?.tier==="Globalist").length??0,s=Math.max(r,t.operations?.suitePolicy==="hold"?1:0),a=n.entities[e.roomId??""];return{suite:a?.kind==="room"&&$t(a)?void 0:i.length>s?i[0]:void 0,free:i.length,reserve:s,breakfast:t.stock>=2,alreadySuite:a?.kind==="room"&&$t(a)}}function Md(n,e){if(e.type!=="birthday-choice")return!1;const t=n.game,i=n.guests.find(u=>u.id===e.id&&!u.departing),r=i?.occasion;if(!i?.roomId||!r||r.resolved)return t.notice="先办理入住；已处理的生日安排无需重复选择。",!0;if(!["breakfast","suite","card","decline"].includes(String(e.value)))return!0;const s=ou(n,i),a=e.value==="breakfast"?160:e.value==="suite"?280:0;if(e.value==="breakfast"&&!s.breakfast)return t.notice="早餐库存不足两份；先补货，或选择生日祝福。",!0;if(e.value==="suite"&&!s.suite)return t.notice="没有可赠送的标准套房；确认预订与预留优先，仍可选择其他礼遇。",!0;if(n.metrics.cash<a)return t.notice="礼遇预算不足；可以先送一张手写生日卡。",!0;if(n.metrics.cash-=a,t.expense+=a,e.value==="breakfast"&&(t.stock-=2,i.birthdayBreakfast=2,n.metrics.owner=Math.max(0,n.metrics.owner-1)),e.value==="suite"){const u=n.entities[i.roomId];u.kind==="room"&&(u.status="dirty",u.guestId=void 0,u.nightsLeft=0);const d=s.suite;d.status="occupied",d.guestId=i.id,d.nightsLeft=Math.max(0,(i.checkoutDay??t.day+1)-t.day),i.roomId=d.id,i.upgrades=!0,i.denied=!1,t.upgrades++,n.metrics.owner=Math.max(0,n.metrics.owner-2),ad(n,i,d.id)}const o=e.value==="breakfast"?8:e.value==="suite"?12:e.value==="card"?2:-3;i.satisfaction=Math.max(0,Math.min(100,(i.satisfaction??88)+o)),r.resolved=!0,r.choice=String(e.value);const l=e.value==="breakfast"?"生日早餐已确认，两个人一起吃很开心。":e.value==="suite"?"生日这晚真的住进 Standard Suite，房费也没变。":e.value==="card"?"收到手写生日卡，Front Office 记得这一天。":"今天按原预订入住，生日没有特别安排。";r.outcome=l,pn(n,i,"birthday"),vn(n,"resolve");const c=t.operations?.profiles[i.profileId??""];return c&&(c.history.push({day:t.day,text:l}),c.history=c.history.slice(-8)),en(n,i.name+"："+l+" 支出 ¥"+a+"。","部门",i.roomId),!0}function bd(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=nt(n),i=n.guests.filter(h=>!h.staff&&h.roomId&&!h.departing),r=i.length,s=t.filter(h=>h.status==="dirty"||h.status==="cleaning").length,a=e.events.length+n.guests.filter(h=>!h.departing&&(h.late==="pending"||h.challenge&&!h.challenge.resolved||h.occasion&&!h.occasion.resolved&&h.roomId)).length,o=i.reduce((h,p)=>h+(p.rate??e.price),0),l=i.filter(h=>h.source==="平台").reduce((h,p)=>h+Math.round((p.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((h,p)=>h+p*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),s&&u.push({title:"夜班先把房间交出来",text:`还有 ${s} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const d=Math.round(r/Math.max(1,t.length)*100),f=e.operations?.forecast?.occupancy;f!==void 0&&d<f-15&&u.push({title:"入住低于晨会预估",text:`当前 ${d}%，预估 ${f}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={plan:au(n,e.revenue+o-e.expense-l-c,"evening"),day:e.day,minute:e.minute,open:!0,occupancy:d,expected:f,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:o,projectedNet:e.revenue+o-e.expense-l-c,pending:a,complaints:e.complaints,logs:e.logs.filter(h=>h.day===e.day&&h.category==="客诉").map(h=>({...h})),notes:u.slice(0,4)},e.paused=!0}const Cs=(n,e,t=!1)=>Math.round(n*(di(e)==="suite"&&t?1:ui[di(e)].factor)*(1+((e.level??1)-1)*.1)),yd=n=>2500*n,Ha=n=>n?Math.max(8,24-n*5):30,Va=n=>n?Math.max(10,35-n*7):40,Il=n=>Math.max(140,260-n*20),Sd=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),lu={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function Ll(n,e,t,i="floor-lobby"){const r={id:e,name:lu[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(r),mr(n,r),r}function Si(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function Bi(n,e,t,i,r){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:r},on(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",en(n,e.name+" 已接单。","部门",i),!0)}function Ed(n,e,t){const i=n.game,r=Yn(n);for(const a of Object.keys(lu)){const o=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let l=0;l<o;l++){const c="staff-"+a+"-"+l;n.guests.some(u=>u.id===c)||Ll(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const s=nt(n).find(a=>a.timer&&!a.construction&&!Si(n,a.id));if(s){let a=n.guests.find(o=>o.id==="staff-duty");a||(a=Ll(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&Bi(n,a,s.status==="maintenance"?"repair":"clean",s.id,s.timer)}for(const a of n.guests.filter(o=>o.staffRole)){if(mr(n,a),Jc(n,a),Qc(a),a.movement.steps.length)continue;if(a.job){const l=a.job,c=n.entities[l.target];if(l.kind==="clean"||l.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=l.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[l.kind],--l.remaining>0)continue;if((l.kind==="clean"||l.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),vn(n,"service"),r.hkCompleted+=l.kind==="clean"?1:0,en(n,c.number+" "+(l.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),l.kind==="stock"){const u=l.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(d=>!(d.kind==="supplies"&&d.target===l.target)),r.stockDelivered++,en(n,a.name+" 已将 40 份餐饮送上餐台。","部门",l.target)}if(l.kind==="front"){const u=n.guests.find(d=>!d.staff&&!d.roomId&&!d.departing);if(u){const d=r.bookings.find(x=>x.id===u.reservationId)?.roomId,f=nt(n).filter(x=>(x.status==="available"||x.status==="reserved"&&(x.suaBookingId===u.reservationId||!x.suaBookingId&&u.tier==="Globalist"))&&!x.construction),h=f.filter(x=>x.type==="suite"&&x.category!=="premium"),p=d?f.find(x=>x.id===d):u.tier==="Globalist"?h[0]??f[0]:f.find(x=>!(r.suitePolicy==="hold"&&h.length<=1&&h.includes(x)));p&&e({type:"checkin",id:u.id,roomId:p.id})}}vn(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=qt(n)+20;continue}const o=a.staffRole;if(o==="house"&&i.managers.house&&a.id!=="staff-duty"){const l=nt(n).find(c=>c.status==="dirty"&&!c.construction&&!Si(n,c.id));if(l&&Bi(n,a,"clean",l.id,Ha(i.managers.house))){l.status="cleaning";continue}}if(o==="engineering"&&i.managers.engineering){const l=nt(n).find(c=>c.status==="maintenance"&&!c.construction&&!Si(n,c.id));if(l&&n.metrics.cash>=100){Bi(n,a,"repair",l.id,Va(i.managers.engineering))&&t(100);continue}}if(o==="fnb"&&i.managers.fnb){const l=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(l&&!Si(n,l)&&n.metrics.cash>=Il(i.managers.fnb)){Bi(n,a,"stock",l,8)&&t(Il(i.managers.fnb));continue}}if(o==="front"&&i.managers.front&&n.guests.some(l=>!l.staff&&!l.roomId&&!l.departing)){Bi(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(o==="revenue"&&qt(n)>=a.movement.nextDecision){const l=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=l[Math.floor(i.minute/60)%l.length];c&&Bi(n,a,"patrol",c.id,10)}}}function Td(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,kr(n,e.entityIds[0]),en(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),vn(n,"upgrade-complete"),kr(n,e.id),en(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function $s(n,e){e.staff||(e.persona??=Object.keys(Yo)[Ui(e.id)%11],mr(n,e))}function Ad(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function wd(n,e){const t=n.game.minute,i=t/60,r=Yo[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let o=0;a.role==="breakfast"&&(o=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(o=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(o=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(o=i>=11&&i<20?1.4:0),a.role==="lobby"&&(o=i>=7&&i<22?.7:0),a.role==="rooftop"&&(o=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),o*=r.likes[a.role]??1,a.role==="club"&&(o*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(o*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(o*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(o*=1.3);const l=Ad(n,a.id);o*=l+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-l/Math.max(1,a.capacity)),o*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(o*=.2),e.persona==="family"&&i>=20&&(o=0),o>0&&s.push({id:a.id,weight:o})}return s}function cu(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function Dl(n,e,t){e.waitingFor=t,e.waitSince=qt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function Ul(n,e,t,i){if(e.lastVisit=t.id,cu(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:qt(n)},Dl(n,e,t.id),pn(n,e,"full");return}if(t.construction){on(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock",a=t.role==="breakfast"?e.birthdayBreakfast??0:0,o=Math.max(e.persona==="family"?3:1,a);if(r&&n.game[s]<=0&&!a){e.experience={place:t.id,kind:"shortage",at:qt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),pn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),Dl(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:qt(n)},r&&(n.game[s]=Math.max(0,n.game[s]-Math.max(0,o-a)),a&&(e.birthdayBreakfast=0));const l=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,c=Math.round(l*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));c&&(e.spend=(e.spend??0)+c,i.income(c),i.progress("ancillary",c)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,rr(n,e)}function Fs(n,e){e.departing=!0,e.movement?.steps.length||on(n,e,"exit")}function Rd(n,e,t,i){$s(n,e);const r=e.movement,s=qt(n),a=Jc(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&on(n,e,"exit"),rr(n,e);return}if(!e.roomId){rr(n,e);return}if(a&&!e.waitingFor){const o=n.entities[r.destination];o?.kind==="facility"&&Ul(n,e,o,i)}if(e.waitingFor){const o=n.entities[e.waitingFor];!r.steps.length&&o?.kind==="facility"&&!o.construction&&cu(n,o.id,e.id)<o.capacity&&(o.role!=="breakfast"||n.game.stock>0||e.birthdayBreakfast)&&(o.role!=="club"||n.game.clubStock>0)?Ul(n,e,o,i):!r.steps.length&&s-(e.waitSince??s)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(o?.kind==="facility"?o.role:"lobby")),on(n,e,e.roomId)),rr(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",pn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Ci(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(o=>o.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[r.destination]?.kind==="facility"&&n.entities[r.destination].construction)&&on(n,e,e.roomId),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)on(n,e,e.roomId);else{const o=wd(n,e);let l=t()*o.reduce((u,d)=>u+d.weight,0),c=e.roomId;for(const u of o)if(l-=u.weight,l<=0){c=u.id;break}if(c!==e.roomId)on(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}rr(n,e)}function Cd(n,e,t){const i=n.game.guestMemory??={},r=tu(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),pn(n,e,"checkout")}const Nl={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},Pd=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,uu=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function Wa(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,nt(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function dn(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function rt(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function rn(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function Qo(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,vn(n,"revenue",e)}function Gn(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const sn=vn,du=cd;function Xa(n={}){const e=Hc();e.mode="game",e.metrics={cash:28600,reputation:86,owner:82},e.guests=e.guests.filter(t=>t.staff||t.roomId),e.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:du(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const t of e.guests)if(t.roomId){const i=e.entities[t.roomId];t.stayLength=i.nightsLeft,t.checkoutDay=1+i.nightsLeft,t.rate=$t(i)?900:650,t.satisfaction=90,t.segment="商务"}for(const t of nt(e))t.level=1,t.status==="cleaning"&&(t.timer=20);return gr(e),Xs(e),Vc(e,n.guided===!1),e.guests.forEach(t=>$s(e,t)),$a(e),Ko(e),rt(e,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),jo(e),e}function $a(n,e){const t=n.game,i=dn(n),r=["陈","林","何","张","周","王","李","赵"][Math.floor(dn(n)*8)]+"先生",s=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&dn(n)<.65,o=eu(a,dn(n),dn(n)),l={id:"guest-"+t.nextId++,name:r,tier:s,floorId:"floor-lobby",thought:s==="Globalist"?"今晚有套吗？":"想住 "+o+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":o>=5?"长住":"商务",stayLength:o,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[r]??0)};hd(n,l,e),$s(n,l),l.goh=l.tier==="Globalist"&&dn(n)<.12,l.sua=!!e?.sua,pn(n,l,"arrival"),n.guests.push(l),t.arrivals++,rt(n,"入住",`${l.name} · ${l.tier} · ${l.source} 到店，计划 ${l.stayLength} 晚。`,"facility-lobby")}const Ii=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function jo(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function Id(n,e){e.roomId&&on(n,e,e.roomId)}function Ld(n){const e=n.game,t=nt(n);let i=0,r=0;for(const u of n.guests)if(u.roomId){const d=u.rate??e.price;if(i+=d,u.spend=(u.spend??0)+d,u.source==="平台"){const f=Math.round(d*.15);n.metrics.cash-=f,e.expense+=f}r++}Qo(n,i),e.nights=r;for(const u of Ii(n))Zo(n,u),Fs(n,u);const s=380+t.length*65+Object.values(e.managers).reduce((u,d)=>u+d*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),o=r?Math.round(i/r):0,l=e.stock<20?"早餐库存偏低，明早先补货。":Wa(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({plan:au(n,e.revenue-e.expense,"settled"),day:e.day,revenue:e.revenue,expense:e.expense,adr:o,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:l,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(r/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:Br(n).total});const c=gr(n).scores;c.push({day:e.day,value:Br(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),Gn(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),rt(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function Dd(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=dn(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=du(e.day);for(const t of nt(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=Sd(Wa(n)>1.1?750:590,e.level,e.managers.revenue)),Ko(n),rt(n,"部门",`${uu(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(Wa(n)*100)}%。`)}function Ud(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>Qo(n,r),reputation:r=>Gn(n,r),log:(r,s,a)=>rt(n,r,s,a),progress:(r,s=1)=>sn(n,r,s)};od(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,Td(n),Ed(n,a=>qa(n,a),a=>rn(n,a)),fd(n,a=>$a(n,a)),dd(n);const s=nt(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&!a.construction&&!Si(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",sn(n,"service"),rt(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));Ii(n).forEach((a,o)=>{const l=a.movement;if(l&&!l.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+o%7*.9,u=1.55+Math.floor(o/7)*.28;Math.hypot(l.position.x-c,l.position.z-u)>.15&&(l.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(Rd(n,a,()=>dn(n),i),Qc(a),a.departing){a.exitAt!==void 0&&qt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(Zo(n,a),Fs(n,a),t.lost++,t.complaints++,Gn(n,-1),rt(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const o=n.entities[a.roomId],l=jc(a);(a.checkoutDay??99)<=t.day&&t.minute>=l&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",rt(n,"客诉",`${a.name} 的 ${Ci(a)} 未确认，按 ${Wr(a)}:00 退房。`,o.id),Gn(n,-1)),pd(n,a),Cd(n,a,i),o.extraBed=!1,o.status="dirty",o.guestId=void 0,o.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,Fs(n,a),rt(n,"入住",`${a.name} 退房，${o.number} 等待 Housekeeping 翻房。`,o.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(Ii(n).length<8&&$a(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/ru(n)*(.7+dn(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(u=>u.status==="available"),l=["repair","complaint","supplies","vip"][Math.floor(dn(n)*4)],c=l==="repair"&&a?a.id:l==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===l)){l==="repair"&&a&&(a.status="maintenance"),l==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:l,title:u[l],target:c,expires:t.day*1440+t.minute+120}),rt(n,"客诉",u[l],c)}t.nextEvent=t.minute+180+Math.round(dn(n)*90)}for(const a of[...t.events]){const o=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[o]&&n.metrics.cash>=150?qa(n,{type:"resolve",id:String(a.id),value:"sop"}):!Si(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(l=>l.id!==a.id),t.complaints++,Gn(n,-2),rt(n,"客诉",`未及时处理：${a.title}`,a.target))}vd(n),Wc(n),bd(n),t.minute>=1440&&Ld(n)}jo(n)}function Nd(n,e){const t=n.game;if(!t||_d(n,e)||Md(n,e)||gd(n,e)||md(n,e)||ud(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=Ii(n).find(l=>l.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===s.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=s.bookedRate??Cs(t.price,a,s.tier==="Globalist"),s.upgrades=$t(a)&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&!qc(a),s.upgrades?(t.upgrades++,sn(n,"vip"),Gn(n,1)):s.tier==="Globalist"&&nt(n).some(l=>$t(l)&&l.status==="available")&&Gn(n,-1);const o=t.operations?.bookings.find(l=>l.id===s.reservationId);o&&(o.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,Id(n,s),pn(n,s,s.denied?"denied":"checkin"),sn(n,"arrivals"),rt(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=Ii(n).find(a=>a.id===e.id);s&&(Zo(n,s),Fs(n,s),pn(n,s,"denied"),t.lost++,rt(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&rn(n,90)&&(r.status="cleaning",r.timer=30,rt(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.construction&&!r.timer&&!Si(n,r.id)&&rn(n,180)?(r.timer=40,rt(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&rn(n,200)&&(i.maintenance=100,rt(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(r?.status!=="unbuilt"||n.floors.find(l=>l.id===r.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[s,a]=String(e.value).split(":");if(!Object.hasOwn(ui,s)||!["king","twin"].includes(a))break;const o=s;if(!rn(n,ui[o].cost))break;r.category=o,r.bed=a,r.type=o==="suite"||o==="premium"?"suite":r.bed,r.status="available",r.level=1,kr(n,r.id),rt(n,"升级",`${r.number} 已设置为 ${ui[o].name} · ${a==="twin"?"双床":"大床"}。`,r.id);break}case"upgrade":r?.status==="available"&&(r.level??1)<5&&rn(n,yd(r.level??1))&&(r.construction={remaining:90,total:90,targetLevel:(r.level??1)+1},r.status="maintenance",kr(n,r.id),sn(n,"upgrade"),rt(n,"升级",`${r.number} 封闭装修：90 分钟后升级竣工。`,r.id));break;case"reserve":r?.status==="available"&&$t(r)&&(r.status="reserved",rt(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&!r.suaBookingId&&(r.status="available",rt(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(Nl,s)||t.managers[s])break;rn(n,3800)&&(t.managers[s]=1,sn(n,"delegate"),rt(n,"部门",`${Nl[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}rn(n,300)&&(t[s]=Math.min(160,t[s]+50),sn(n,"stock"),rt(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",o=e.value==="sop";if(o&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!rn(n,o?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const l=n.entities[s.target];s.kind==="repair"&&l?.kind==="room"&&l.status==="maintenance"&&(l.status="available",l.timer=void 0,sn(n,"service")),s.kind==="supplies"&&(t.stock+=25),sn(n,"resolve"),Gn(n,o?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),o&&sn(n,"delegate"),rt(n,"部门",`${o?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${o?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(l=>l.role==="guest");if(!rn(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,o={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let l=1;l<=3;l++){const c=String(a*100+l),u="room-"+c;o.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:o.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}Cl(n,2+s.length),n.floors.splice(2+s.length,0,o),n.floors.forEach((l,c)=>{l.number=c,l.label=l.role==="lobby"?"L":l.role==="rooftop"?"RF":c+"F"}),t.level++,rt(n,"升级",`${o.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,o.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),sn(n,"late-decision"),Gn(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),pn(n,s,s.late==="honor"?"late-honor":"late-deny"),rt(n,"入住",`${s.name} 已确认 ${s.late==="honor"?Ci(s):Wr(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;rn(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),pn(n,s,"recovery"),sn(n,"resolve"),rt(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(rn(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");Cl(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,o)=>{a.number=o,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":o+"F"}),rt(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),rt(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,rt(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&Dd(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);if(s&&!s.claimed&&s.progress>=s.goal){const a=Math.max(0,s.reward-(s.paid??0));s.claimed=!0,Qo(n,a),s.paid=s.reward,rt(n,"收益",`完成「${s.title}」，尾款 ¥${a}；总奖金 ¥${s.reward}。`)}break}}jo(n)}function qa(n,e){if(!n.game)return;const t=Xc(n,e);if(t){n.game.notice=t+"。当前目标见经营 checklist。";return}const i=n.game.stock;Nd(n,e),e.type==="stock"&&e.id!=="club"&&n.game.stock>i&&n.game.onboarding&&(n.game.onboarding.breakfastPrepared=!0),Wc(n)}function Ya(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))Ya(e)}return n}function Fd(n=Hc()){let e=Ya(structuredClone(n));const t=new Set,i=r=>{e=Ya({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);qa(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);Ud(s,r),i(s)},reset(){i(Xa())}}}const Qn={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},Od={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},ar=2.55,kd=[-4.93,0,4.93],Fl={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function or(n){const e=typeof n=="string"?n:n.persona??"chill",t=Fl[e]??Fl.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",r=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",s=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${r}${s}</svg></span>`}function Bd(n){const e={hub:"M3 10 12 3l9 7v11h-6v-7H9v7H3Z",hotel:"M3 20V9h18v11M3 16h18M5 9V5h14v4M7 12h3m4 0h3",front:"M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a6 6 0 0 1 12 0v3m3-17a4 4 0 0 1 0 8m0 3a5 5 0 0 1 5 5",operations:"M4 21v-6m8 6V9m8 12V3M1 15h6m2-6h6m2-6h6",development:"m14 4 6 6M3 21l9-9m0-6 6-4 4 4-4 6-6-6Z",brief:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2",evening:"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",tasks:"M5 4h14v18H5ZM9 2h6v4H9ZM8 11l2 2 5-5m-7 9h8",report:"M3 21h19M6 17V9m6 8V3m6 14v-6",history:"M4 4h16v17H4ZM8 8h8m-8 4h8m-8 4h5",log:"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16",bookings:"M3 5h18v17H3ZM7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"};return`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${e[n]??e.hub}"/></svg>`}function zi(n,e=1,t="king",i="standard"){const r=["hotel","report","history"].includes(n),s=n==="evening"||n==="rooftop",a=e>=4||i==="premium",o=i==="suite"||i==="premium",l=a?"#d6c4a4":"#e4d8be",c=a?"#6c503c":"#947557",u=s?"#526761":"#768369",d=(h,p,x)=>`<path fill="${c}" d="m${h} ${p} ${x} -13 37 15v11l-${x} 15-37-16z"/><path fill="#eee5ce" d="m${h} ${p-6} ${x} -13 37 15-${x} 15z"/><path fill="${u}" d="m${h+14} ${p} ${x} -13 21 9-${x} 15z"/><path fill="#fff8e9" d="m${h+3} ${p-8} 15-5 12 5-15 5z"/>`;let f="";return r?f=(t==="twin"?d(65,83,28)+d(107,95,28):d(79,88,53))+(o?'<path fill="#596e5e" d="m20 77 28-8 22 10v15l-27 10-23-12z"/><path fill="#8d9c7d" d="m18 74 30-9 24 11-29 10z"/>':""):n==="gym"?f='<path fill="#3e5147" d="m60 93 39-12 31 12-38 15z"/><path fill="none" stroke="#b7a88b" stroke-width="5" d="m85 86-6-28 20-5 7 24m27 22-4-31 21-6 8 29"/><path fill="#526454" d="m147 58 19-6 1 11-18 6z"/>':n==="spa"?f='<path fill="#806747" d="m64 83 67-19 35 15-68 24z"/><path fill="#e8e3cd" d="m63 76 67-19 38 16-69 25z"/><path fill="#f8f1df" d="m71 74 20-6 16 7-21 7z"/><path fill="#95834f" d="m160 84 24-7 11 7-23 8z"/>':["breakfast","club"].includes(n)?f='<path fill="#796049" d="m61 78 94-27 23 9v22l-95 29-22-11z"/><path fill="#e5d1a6" d="m58 72 98-28 25 11-99 30z"/><path fill="#5f7359" d="m77 67 20-6 12 5-20 7zm37-11 18-5 12 5-18 5z"/><path fill="#c59b57" d="m146 48 12-4 10 4-12 4z"/>':f='<path fill="#475f4d" d="m30 80 38-11 28 12v19l-38 13-28-14z"/><path fill="#8a9b7b" d="m27 76 40-12 31 13-40 13z"/><path fill="#9f7e51" d="m103 84 33-10 26 11-34 12z"/><path stroke="#71563c" stroke-width="3" d="M119 89v21m27-27v19"/>',`<svg class="space-art" viewBox="0 0 240 120" aria-hidden="true" focusable="false"><defs><linearGradient id="space-${n}-${e}" x2="1" y2="1"><stop stop-color="${l}"/><stop offset="1" stop-color="#b8a78b"/></linearGradient><linearGradient id="view-${n}-${e}" y2="1" x2="0"><stop stop-color="${s?"#334c54":"#a8c3bf"}"/><stop offset="1" stop-color="${s?"#172d35":"#dde1c9"}"/></linearGradient></defs><path fill="url(#space-${n}-${e})" d="M0 0h240v120H0z"/><path fill="#8b7258" d="m0 100 126-41 114 31v30H0z"/><path fill="#baa37e" d="m0 100 126-41 114 31v8l-114-26L0 113z"/><path fill="${c}" opacity=".7" d="M0 0h29v90H0z"/><path fill="url(#view-${n}-${e})" d="M148 8h62v58h-62z"/><path fill="none" stroke="#f2e6c7" stroke-width="3" d="M147 7h65v60h-65zM179 8v58"/><path fill="#8b9b82" opacity=".6" d="m148 45 16-8 14 10 14-13 18 9v20h-62z"/><path fill="#fff0c4" opacity=".16" d="m148 65-75 55h75l63-54z"/>${e>=2?'<path fill="#ccbc98" d="M136 5h10v67h-10zm78 0h12v70h-12z"/>':""}${e>=3?'<path fill="#f7ebc4" d="M65 19h43v28H65z"/><path fill="#8d9272" d="m69 42 12-18 12 9 11-10v20z"/>':""}${f}<path fill="#ae9564" d="M221 86V35"/><path fill="#f9df9c" d="m211 37 7-17h9l8 17z"/>${e>=4?'<path fill="#ad9356" d="m192 97 22-7 16 7-22 8z"/><path fill="#d8c6a0" d="m193 91 20-6 16 7-21 7z"/>':""}<path fill="#a38a68" d="M12 91h15l-2 19H15z"/><path fill="#52744e" d="M20 95C-4 66 10 46 20 82 13 27 36 49 23 83 45 51 48 83 20 95Z"/>${a?'<path stroke="#d7bc79" stroke-width="2" fill="none" d="M33 3h194M33 6h194"/>':""}<path fill="#fff8dd" opacity=".16" d="M0 0h240v4H0z"/></svg>`}const ia=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function zd(n){const e=n.game;return[...e.events.map(t=>({key:"event-"+t.id,title:t.title,detail:`剩余 ${Math.max(0,t.expires-e.day*1440-e.minute)} 分钟`,urgent:!0,button:`<button class="game-action" data-entity="${ia(t.target)}">现场</button><button class="game-action" data-action="resolve" data-id="${t.id}" data-value="gm">亲自处理 · ¥350</button>`,note:"直接协调支出较高；授权方案在待办详情中。"})),...nt(n).filter(t=>t.status==="dirty").map(t=>({key:t.id,title:t.number+" · 待翻房",detail:"客房部 · 清洁后才可出售",urgent:!1,button:`<button class="game-action" data-action="clean" data-id="${t.id}">清洁 · ¥90</button>`,note:"约 30 游戏分钟；等待主管可节省手动清洁费。"})),...n.guests.filter(t=>!t.staff&&!t.departing&&!t.roomId).map(t=>({key:t.id,title:t.name+" · 等待入住",detail:`${t.tier} · 耐心 ${t.patience??0} 分钟`,urgent:(t.patience??100)<45,button:`<button class="game-action" data-open="front" data-guest="${ia(t.id)}">为他选房 →</button>`,note:t.reservationId?"确认预订未兑现需支付 ¥600 安置费。":"临时到店客人，先比较空房与留套需要。"})),...n.guests.filter(t=>!t.departing&&t.roomId&&(t.late==="pending"||t.challenge&&!t.challenge.resolved||t.occasion&&!t.occasion.resolved)).map(t=>({key:t.id,title:t.name+" · 服务待确认",detail:t.occasion&&!t.occasion.resolved?"生日礼遇待决定":t.late==="pending"?"晚退请求":"特殊安排",urgent:!1,button:`<button class="game-action" data-open="events" data-guest="${ia(t.id)}">处理诉求 →</button>`,note:"查看真实诉求与条件，欢迎礼不代替承诺。"})),...e.stock<20?[{key:"breakfast-stock",title:"早餐库存偏低",detail:`剩余 ${e.stock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="breakfast">补 50 份 · ¥300</button>',note:"提前备货减少断供风险；先保留必要现金。"}]:[],...e.clubStock<20?[{key:"club-stock",title:"酒廊库存偏低",detail:`剩余 ${e.clubStock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="club">补 50 份 · ¥300</button>',note:"晚间服务仍在继续，补货会增加今天成本。"}]:[]].sort((t,i)=>Number(i.urgent)-Number(t.urgent))}const et=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),tt=n=>"¥"+Math.round(n).toLocaleString("en-US"),Ie=(n,e,t="",i="",r="")=>`<button class="game-action" data-action="${e}" data-id="${et(t)}" data-value="${et(i)}" ${r}>${n}</button>`,be=(n,e)=>`<button class="game-action" data-open="${e}">${n}</button>`,Qt=(n,e,t,i=!1)=>`<button data-focus-key="${e}" data-focus-value="${et(t)}" aria-pressed="${i}">${n}</button>`,an=n=>`<div class="focus-tabs">${n}</div>`,Xe=n=>`<div class="focus-metrics">${n.map(([e,t])=>`<div><small>${e}</small><strong>${t}</strong></div>`).join("")}</div>`,ze=(n,e,t)=>`<div class="focus-person">${or(n)}<div><strong>${et(e)}</strong><p>${et(t)}</p></div></div>`,He=(n,e,t)=>`<section class="focus-screen"><h2>${n}</h2><div class="focus-main">${e}</div></section><div class="focus-footer">${t}</div>`,An=(n,e,t)=>`<div class="focus-pager">${Qt("‹ 上一项",n,String(Math.max(0,e-1)))}<span>${t?e+1:0} / ${t}</span>${Qt("下一项 ›",n,String(Math.min(Math.max(0,t-1),e+1)))}</div>`,Ol=()=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:"overview",activity:"coffee",bookingPage:0,profilePage:0,logPage:0,careerPage:0,archiveTab:"overview",category:"standard",bed:"king"});function Gd(n,e,t){const i=n.game,r=Ur(n),s=nt(n),a=n.guests.filter(l=>!l.staff&&!l.departing&&!l.roomId),o=zd(n);if(e==="hub"){const l=xd(n),c=i.plan,u=zr(n),d=s.filter(g=>g.status==="occupied").length,f=i.operations?.briefOpen?"morning":i.reportOpen?"growth":i.minute>=1200?"review":"operate",h=`<div class="day-rhythm">${["morning","operate","review","growth"].map((g,m)=>`<span class="${g===f?"active":""}"><i>${m+1}</i>${["晨会","经营","复盘","成长"][m]}</span>`).join("")}</div>`,p=`<div class="hotel-hero">${zi("hub",Math.min(5,i.level))}<div><small>DAY ${i.day} · YOUR HOTEL</small><strong>把每次入住，<br>变成下次再来。</strong><span>${c?sr[c.focus].name:"按现有设置经营"}</span></div></div>`,x=l.entity?`<button class="game-action" data-entity="${l.entity}">先处理这间房</button>`:be("现在去处理",l.target);return He("今天，先做好一件事",h+p+Xe([["在住",d+"/"+s.length],["现场待办",String(o.length)],["今日承诺",c?ns(c.focus,c.target):"晨会确认"]])+ze(l.department,l.title,l.why)+`<small class="campaign-route">${r?"开业带教 · "+(r.index+1)+" / "+r.total:u?"成长主线 · "+et(u.title)+" "+u.progress+"/"+u.goal:"五段认证已完成 · 继续自由经营"}</small>`,x+be("经营目标","tasks")+be("今晚复盘","evening"))}if(e==="front"){const l=t.guest?Math.max(0,a.findIndex(f=>f.id===t.guest)):Math.min(t.guestPage,Math.max(0,a.length-1)),c=a[l];if(!c)return He("客人接待",ze("front","目前无人排队","关上面板继续经营，客人到店后会提醒你。"),be("今日预订","bookings")+be("回到酒店","hub"));const u=s.filter(f=>f.status==="available"||f.status==="reserved"&&c.tier==="Globalist"&&(!f.suaBookingId||f.suaBookingId===c.reservationId)).sort((f,h)=>+(h.id===t.room)-+(f.id===t.room)||+(!!h.suaBookingId&&h.suaBookingId===c.reservationId)-+(!!f.suaBookingId&&f.suaBookingId===c.reservationId)||(c.tier==="Globalist"?Number($t(h))-Number($t(f)):+(f.type==="suite")-+(h.type==="suite"))),d=Math.min(t.roomPage,Math.max(0,Math.ceil(u.length/2)-1));return He("给这位客人一间房",An("guestPage",l,a.length)+`<div class="focus-person">${or(c)}<div><strong>${et(c.name)} · ${et(c.tier)}</strong><p>${et(c.thought)}</p></div></div>`+Xe([["住宿",`${c.stayLength} 晚`],["耐心",`${c.patience} 分钟`],["来源",et(c.source??"Walk-in")]])+`<div class="focus-room-choices">${u.slice(d*2,d*2+2).map(f=>`<button data-action="checkin" data-id="${et(c.id)}" data-room="${f.id}">${zi("hotel",f.level??1,f.bed??(f.type==="twin"?"twin":"king"),f.category??f.type)}<strong>${f.number} · ${za(f)}</strong><small>${c.tier==="Globalist"&&$t(f)?"免费升套 · 占用标准套库存":"点击安排入住"}</small></button>`).join("")||"<p>暂无空房，先清洁或查看预留。</p>"}</div>`+(u.length>2?An("roomPage",d,Math.ceil(u.length/2)):"")+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',be("查看房态","hotel")+Ie("婉拒本次","reject",c.id))}if(e==="events"||e==="worklist"){const l=[];for(const d of n.guests.filter(f=>!f.departing&&f.roomId)){if(d.occasion&&!d.occasion.resolved){const f=ou(n,d);l.push({id:d.id+"-birthday",body:`<div class="focus-person">${or(d)}<div><strong>${et(d.name)} · 今天过生日</strong><p>这趟专门来庆祝，早餐和房型还能有一点惊喜吗？</p></div></div>`+Xe([["早餐库存",i.stock+" 份"],["可售标准套",String(f.free)],["需保护预订",String(f.reserve)]])+`<div class="focus-decision"><h3>照顾这一晚，也要照顾其他承诺</h3><p>早餐 ¥160 / 2 份 · 体验 +8 · 业主 −1。</p><p>升套 ¥280 · 体验 +12 · 业主 −2；原房待翻房，套房按原房费住。</p><p class="focus-trade">${f.alreadySuite?"客人已住标准套房，可以改送早餐或祝福。":f.suite?"送掉套房会减少后续付费销售和会员升套空间。":"现有套房需保护预订；不能重复承诺。"}手写卡免费，体验 +2；维持预订体验 −3。</p></div>`,actions:Ie("送双人早餐","birthday-choice",d.id,"breakfast",f.breakfast?"":"disabled")+Ie("生日升套","birthday-choice",d.id,"suite",f.suite?"":"disabled")+Ie("手写生日卡","birthday-choice",d.id,"card")+Ie("维持原预订","birthday-choice",d.id,"decline")})}if(d.challenge&&!d.challenge.resolved){const f=d.challenge.kind,h={quiet:["需要安静的房间","quiet","有施工噪声时需要另有安静空房。"],sua:["核对 SUA 标准套房","inventory","已入住标准套才能兑现；欢迎礼不能替代。"],family:["早餐和加床一起安排","family",`需要 6 份早餐库存，当前 ${i.stock} 份。`],audit:["检查房间与服务流程","inspect","需客房、工程主管在岗，且无待修房。"]}[f];l.push({id:d.id,body:`<div class="focus-person">${or(d)}<div><strong>${et(d.name)} · ${et(d.tier)}</strong><p>${h[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${h[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:Ie("落实 · ¥180","guest-choice",d.id,h[1])+Ie("欢迎礼 · ¥100","guest-choice",d.id,"gift")+Ie("不作安排","guest-choice",d.id,"decline")})}d.late==="pending"&&l.push({id:d.id+"-late",body:`<div class="focus-person">${or(d)}<div><strong>${et(d.name)} · ${et(d.tier)}</strong><p>希望 ${Ci(d)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:Ie("同意 "+Ci(d),"late",d.id,"honor")+Ie("协商 "+Wr(d)+":00","late",d.id,"deny")})}for(const d of i.events){const f=d.kind==="repair"?"engineering":d.kind==="supplies"?"fnb":"front";l.push({id:"event-"+d.id,body:ze(f,d.title,`剩余 ${Math.max(0,d.expires-i.day*1440-i.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${i.managers[f]?"主管已到岗，可以授权处理。":"对应主管尚未到岗；可先亲自处理，避免超时。"}</p></div>`,actions:Ie("亲自处理 · ¥350","resolve",String(d.id),"gm")+(i.managers[f]?Ie("交给主管 · ¥150","resolve",String(d.id),"sop"):be("聘任主管","operations"))})}for(const d of o.filter(f=>!l.some(h=>h.id===f.key)&&!n.guests.some(h=>h.roomId&&h.id===f.key)))l.push({id:d.key,body:ze("front",d.title,d.detail)+`<div class="focus-decision"><p>${et(d.note)}</p></div>`,actions:d.button});const c=t.event?Math.max(0,l.findIndex(d=>d.id===t.event||d.id===t.event+"-birthday"||d.id===t.event+"-late")):Math.min(t.eventPage,Math.max(0,l.length-1)),u=l[c];return He("逐件处理 · "+l.length+" 项",u?An("eventPage",c,l.length)+u.body:ze("front","待办全部处理完了","关上面板，回到酒店看决定如何发生。"),u?.actions??be("回到经营","hub"))}if(e==="hotel"||e==="entity"){const l=n.floors.filter(m=>m.role==="guest"),c=l.find(m=>m.id===(t.floor??n.entities[t.room??""]?.floorId))??l[0];if(!c)return null;const u=Yc(n).filter(m=>m.floorId===c.id),d=u.find(m=>m.id===t.room)??u[0];if(!d)return null;t.room=d.id,t.floor=c.id;const f=an(l.map(m=>Qt(m.label,"floor",m.id,m.id===c.id)).join(""))+`<div class="focus-room-map">${u.map(m=>Qt(m.number+"<small>"+{available:"可入住",occupied:"在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"封闭",reserved:"已预留",unbuilt:"＋设置"}[m.status]+"</small>","room",m.id,m.id===d.id)).join("")}</div>`,h=d.construction??c.construction;if(h)return He(d.number+" · 封闭施工",f+`<div class="focus-space">${zi("hotel")}</div>`+Xe([["剩余",h.remaining+" 分钟"],["完成后","开放使用"]]),be("扩建与全部参数","hotel-data"));if(d.status==="unbuilt")return He(d.number+" · 设置房型",f+an(Object.entries(ui).map(([m,A])=>Qt(A.name,"category",m,t.category===m)).join(""))+an(Qt("大床","bed","king",t.bed==="king")+Qt("双床","bed","twin",t.bed==="twin"))+Xe([["配置费用",tt(ui[t.category].cost)],["新客房价",tt(i.price*ui[t.category].factor)+"起"]])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',Ie("确认设置","configure-room",d.id,t.category+":"+t.bed));const p=n.guests.find(m=>m.id===d.guestId),x=d.level??1,g=d.status==="dirty"?Ie("清洁 · ¥90","clean",d.id):d.status==="maintenance"&&!d.timer?Ie("维修 · ¥180","repair",d.id):d.status==="available"?`<button class="game-action" data-open="front" data-assign-room="${d.id}">安排入住</button>`+(x<5?Ie("装修 · "+tt(x*2500),"upgrade",d.id):"")+($t(d)?Ie("留给会员","reserve",d.id):""):d.status==="reserved"&&!d.suaBookingId?Ie("释放预留","release",d.id):p?`<button class="game-action" data-open="events" data-guest="${p.id}">${p.occasion&&!p.occasion.resolved?"生日礼遇":"查看服务诉求"}</button>`:"";return He(d.number+" · "+za(d),f+`<div class="focus-space">${zi("hotel",x,d.bed??(d.type==="twin"?"twin":"king"),d.category??d.type)}<span>Lv.${x} · ${p?et(p.name):"暂无住客"}</span></div>`+Xe([["每晚房费",tt(p?.rate??Cs(i.price,d))],["剩余住宿",d.nightsLeft+" 晚"],["升级增收",x<5?"每新客晚 +"+tt(Cs(i.price,{...d,level:x+1})-Cs(i.price,d)):"已满级"]])+`<p class="focus-trade">${d.status==="available"?"装修需停卖 90 分钟；已确认订单价格不变。":p?et(p.thought):"等清洁或维修完成后，才能再次出售。"}</p>`,g+be("房间明细","room-data"))}if(e==="hotel-data"){const l=n.floors.filter(d=>d.role==="guest").length,c=1e4+5e3*(l-3),u=n.floors.filter(d=>d.construction);return He("扩建 · 再高一层",`<div class="focus-space">${zi("hotel")}<span>施工 → 竣工 → 手动设置房型</span></div>`+Xe([["建设费",tt(c)],["交付时间","4 小时"],["新增","3 个空位"]])+ze("engineering","扩建前先确认现金与需求","施工期间新楼层封闭；竣工后逐间选择房型，普通客房配置已含在造价中。")+`<p class="focus-trade">${u.length?u.length+" 层仍在施工。":""}相邻房间有噪声风险；已有空房较多时，可先改善现有客房。</p>`,Ie("开工 · "+tt(c),"expand")+be("查看房态","hotel")+be("投资明细","hotel-archive"))}if(e==="development-data"){const l=Object.hasOwn(Nr,t.activity)?t.activity:"coffee",c=Nr[l],u=i.development?.activity;return He("活动 · 投入一场体验",an(Object.entries(Nr).map(([d,f])=>Qt(f.name,"activity",d,d===l)).join(""))+ze("fnb",c.name,c.description)+Xe([["筹备费",tt(c.cost)],["准备时间","2 小时"],["每位收入",tt(c.fee)]])+`<p class="focus-trade">${u?"已有活动筹备中，等待现场结算。":"人数受在住客人、天气、定位与容量影响；收入不足筹备费时会亏损。"}每个营业日只能安排一场。</p>`,Ie(u?"正在筹备":"安排活动 · "+tt(c.cost),"activity",l,"",u||i.development?.activityDay===i.day?"disabled":"")+Ie("三日推广 · ¥2,200","campaign")+be("查看设施","development"))}if(e==="operations"){const l={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},c=t.department??"house",u=i.managers[c],d=u?4500*u:3800,f={front:"自动分房与常规诉求；无空房仍需等待。",house:`每间清洁 ${Ha(u)} → ${Ha(Math.min(3,u+1))} 分钟，另需到场时间。`,engineering:`维修 ${Va(u)} → ${Va(Math.min(3,u+1))} 分钟，另需到场时间。`,fnb:"低库存时派员工配送，到餐台后才计入库存。",revenue:"次日自动定价；报价更高也可能减少客流。"}[c];return He("团队 · 原位授权",an(Object.entries(l).map(([h,p])=>Qt(p,"department",h,h===c)).join(""))+ze(c,l[c]+"主管",u?"已到岗 · Lv."+u:"尚未聘任")+Xe([["投入",u>=3?"已满级":tt(d)],["每日工资",tt(u*180)+" → "+tt(Math.min(3,u+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${f}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(u<3?Ie(u?"培训升级":"聘任到岗",u?"train":"hire",c):"")+be("效果与财务明细","operations-data"))}if(e==="development"){const l=Object.values(n.entities).filter(d=>d.kind==="facility"),c=l.find(d=>d.id===t.facility)??l[0];if(!c)return null;const u=c.level??1;return He("设施 · 看清再投资",an(l.map(d=>Qt(d.name,"facility",d.id,d.id===c.id)).join(""))+`<div class="focus-space">${zi(c.role,u)}<span>${c.name} · Lv.${u}</span></div>`+Xe([["使用 / 容量",c.usage+" / "+c.capacity],["升级后容量",String(c.capacity+4)],["费用",tt(u*3500)]])+`<p class="focus-trade">${c.construction?"施工剩余 "+c.construction.remaining+" 分钟。":"升级需封闭施工；先补货或维护可解决眼前问题。"}</p>`,(c.construction?"":(u<5?Ie("升级设施","invest",c.id):"")+(["breakfast","club"].includes(c.role)?Ie("补货 · ¥300","stock",c.role):Ie("维护 · ¥200","repair",c.id)))+be("营销、活动、更多","development-data"))}if(e==="brief"&&$o(n,"strategy")){const l=Pi(n);return He("08:00 · 第一次晨会",Xe([["预计入住",l.occupancy+"%"],["待到店",String(i.operations?.bookings.filter(c=>c.status==="confirmed").length??0)],["早餐需求",l.breakfast+" 人"]])+ze("front","今天先把一位客人接好","先沿用当前报价营业。学会接待、翻房和委派后，再解锁房价与留套决策。"),i.operations?.briefOpen?Ie("开始今天 · 前往接待","brief-start"):be("继续当前带教","tasks"))}if(e==="brief"){const l=Pi(n),c=t.meeting,u=i.plan,d=`<div class="plan-choices">${Object.entries(sr).map(([h,p])=>`<button data-action="day-plan" data-value="${h}" aria-pressed="${u?.selected&&u.focus===h}" ${i.operations?.briefOpen?"":"disabled"}><span class="plan-mark">${u?.selected&&u.focus===h?"✓":h==="occupancy"?"↗":h==="experience"?"♡":"¥"}</span><span><strong>${p.name}<small>¥${p.price}${h==="experience"?" · 预采购 ¥240":""}</small></strong><small>${et(p.risk)}</small></span></button>`).join("")}</div>`,f=c==="price"?ze("revenue","今天挂牌多少？","高价增加单晚收入，也可能减少 Walk-in。")+Xe([["当前挂牌",tt(i.price)],["预计入住",l.occupancy+"%"]])+an(Ie("¥720 · 争取入住","price","","720")+Ie("¥850 · 提高单价","price","","850")):c==="service"?ze("fnb","先备好今天的服务",`早餐预计 ${l.breakfast} 人，当前 ${i.stock} 份。`)+Xe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"]])+an(Ie("早餐 +50 · ¥300","stock","breakfast")+Ie("酒廊 +50 · ¥300","stock","club")):c==="suite"?ze("front","套房要留一间吗？","留套照顾会员；开放销售保留付费机会。SUA 锁房不变。")+Xe([["当前策略",i.operations?.suitePolicy==="hold"?"保留一间":"开放销售"]])+an(Ie("保留一间","suite-policy","","hold")+Ie("开放销售","suite-policy","","sell")):Xe([["预计入住",l.occupancy+"%"],["待到店",String(i.operations?.bookings.filter(h=>h.status==="confirmed").length??0)],["早餐需求",l.breakfast+" 人"]])+d+ze("revenue",u?"今晚检验："+ns(u.focus,u.target):"先选一个经营方向",u?.selected?sr[u.focus].description:"也可按当前设置直接营业；下方选项会实际调整报价、留套和库存。");return He("08:00 · 晨会",an(["overview","price","service","suite"].map((h,p)=>Qt(["重点","房价","备货","套房"][p],"meeting",h,h===c)).join(""))+f,i.operations?.briefOpen?Ie("按当前决定开始今天","brief-start")+be("预订 / 客源明细","bookings"):be("回到经营","hub")+be("完整预测","brief-data"))}if(e==="evening"||e==="report"){const l=i.evening,c=i.reports.at(-1);if(e==="evening"&&!l)return He("20:00 · 晚间复盘",ze("revenue","今晚 20:00 自动开会","继续经营，届时核对收入、客诉与总部建议。"),be("回到经营","hub"));if(e==="report"&&!c)return He("今日尚未日结",ze("revenue","房费于午夜结算","现在可以查看 20:00 快照，或继续经营。"),be("晚间复盘","evening"));const u=e==="evening"?l.notes[0]?.text:c.recommendation,d=e==="evening"?l?.plan:c?.plan,f=d?`<div class="plan-result ${d.success?"success":"miss"}"><small>${e==="evening"?"20:00 阶段检验":"午夜最终对账"} · ${sr[d.focus].name}</small><strong>${ns(d.focus,d.actual)} <span>/ 目标 ${ns(d.focus,d.target)}</span></strong><p>${d.success?"判断奏效":"还有差距"} · ${et(d.lesson)}</p></div>`:"";return He(e==="evening"?"20:00 · 今天经营得如何？":"Day "+c.day+" · 日结",f+Xe(e==="evening"?[["预计净额",tt(l.projectedNet)],["入住率",l.occupancy+"%"],["待办",String(l.pending)]]:[["净额",tt(c.revenue-c.expense)],["入住率",c.occupancy+"%"],["客诉",String(c.complaints)]])+ze("revenue","今晚优先改进",u??"保持服务节奏。")+'<p class="focus-trade">'+(e==="evening"?"这是 20:00 快照；预计房费还未入账。":"这是午夜结算结果。")+"</p>",be("客诉 / 明细",e==="evening"?"evening-data":"report-data")+(e==="evening"&&l?.open?Ie("交给夜班 · 继续经营","evening-close"):i.reportOpen?Ie("开始下一天","continue"):be("回到经营","hub")))}if((e==="tasks"||e==="teaching")&&r){const l=Ri.map((c,u)=>`<div class="checklist-row ${u<r.index?"done":u===r.index?"current":"locked"}"><span>${u<r.index?"✓":u===r.index?"▶":"◇"}</span><strong>${et(c.title)}</strong><small>${u<r.index?"已完成":u===r.index?"现在做":"待解锁"}</small></div>`).join("");return He("开业带教 · "+(r.index+1)+" / "+r.total,`<div class="guided-checklist">${l}</div>`+ze(r.department,r.title,r.why)+`<p class="unlock-preview">完成后解锁 · ${et(r.unlock)}</p>`,be("去完成这一步",r.target)+be("回到酒店","hub"))}if(e==="tasks"){const l=i.campaign,c=zr(n),u=l?.inspection,d=l?.result;if(!c)return He("酒店成长路线 · 完成",ze("revenue","五段经营检验全部通过","经营仍会继续。培养熟客、建设酒店，长期里程碑保留。")+Xe([["认证",String(l?.certificates.length??0)+" / 5"]]),be("继续经营","hub")+be("支线与里程碑","tasks-data"));const f=`<div class="chapter-checklist"><span>✓ 开业带教${l?.certificates.length?" · "+l.certificates.length+" 项认证已完成":""}</span><strong>▶ ${et(c.title)}</strong><small>下一步 · ${sd[l?.chapter??0]}</small></div><small class="campaign-route">酒店成长路线 · ${Math.min(5,(l?.chapter??0)+1)} / 5${l?.certificates.length?" · 已获 "+l.certificates.length+" 项认证":""}</small>`;if(d)return He(d.passed?"体验通过 · "+c.exam:"需要改善 · "+c.exam,f+ze(c.department,c.title,d.advice)+Xe([["现场表现",String(d.score)],["通过标准",String(c.threshold)]])+`<div class="inspection-scenes">${d.scenes.map(h=>`<p>${et(h)}</p>`).join("")}</div><p class="focus-trade">${d.passed?"确认后进入下一段目标；日常经营不会重置。":"目标进度保留；免费重约，次日到店再检验。"}</p>`,d.passed?Ie("进入下一阶段","continue-chapter"):be("先去改善",d.target)+Ie("免费预约重试","book-inspection"));if(u){const h=Math.max(0,u.due-i.day*1440-i.minute),p=i.day*1440+i.minute-u.due,x=Math.min(2,Math.max(0,Math.floor(p/10)));return He(c.exam+" · "+(u.phase==="booked"?"已预约":"现场体验中"),f+ze(c.department,u.phase==="booked"?"留出时间把酒店准备好":["Room Check · 客房巡检","F&B · 体验餐台","Front Office · 核对承诺"][x],u.phase==="booked"?"检验看实际房态、住客体验、餐饮库存和诉求积压，现场还会有小幅波动。":"检验员按顺序体验酒店；尚未公布结果。")+Xe([["到店时间","Day "+Math.floor(u.due/1440)+" · 18:00"],["等待",u.phase==="booked"?h+" 分钟":Math.max(0,30-p)+" 分钟后反馈"],["额外准备",u.prepared?"已彩排 · +6":"可选 · ¥300"]])+`<div class="inspection-timeline"><span class="${p>=0?"active":""}">看房</span><span class="${p>=10?"active":""}">用餐</span><span class="${p>=20?"active":""}">服务</span></div><p class="focus-trade">彩排提高表现，但不能替代清洁、备货和兑现承诺。</p>`,(u.phase==="booked"&&!u.prepared?Ie("现场彩排 · ¥300","prepare-inspection"):"")+be("检查房态","hotel")+be("备货与服务","operations"))}return He(c.title,f+ze(c.department,c.action,c.ready?"行动目标已完成。预约一次真实体验，检验今天的经营。":"先做好这一件事。目标跨天保留，完成后预约次日检验。")+Xe([["当前进度",c.progress+" / "+c.goal],["下一次检验",c.exam]])+`<progress max="${c.goal}" value="${c.progress}" aria-label="${et(c.action)}"></progress><p class="focus-trade">日常支线奖金分段到账，完成后可领尾款；单任务奖金上限不变。</p>`,(c.ready?Ie("预约检验 · 次日 18:00","book-inspection"):be("去完成当前目标",c.target))+be("支线奖励与带教","tasks-data"))}return null}const Ka=[["hub","经营"],["hotel","客房"],["front","客人"],["operations","团队"],["development","设施"]];function Os(n){return["hotel","hotel-data","hotel-archive","entity","room-data"].includes(n)?"hotel":["front","events","worklist","bookings","history","profile-records"].includes(n)?"front":["operations","operations-data","report","report-data","score"].includes(n)?"operations":["development","development-data"].includes(n)?"development":"hub"}function Hd(n){return{hub:[["hub","今天"],["brief","晨会"],["tasks","目标"],["evening","复盘"],["log","日志"],["settings","设置"]],hotel:[["hotel","房态"],["hotel-data","扩建"]],front:[["front","接待"],["events","服务"],["bookings","预订"],["history","客史"]],operations:[["operations","主管"],["operations-data","运营安排"],["report","财务"],["score","评分"]],development:[["development","设施"],["development-data","活动"],["hotel-data","扩建"]]}[Os(n)]}const fu={hub:"经营看板",hotel:"房态与装修","hotel-data":"扩建计划","hotel-archive":"空间总览","room-data":"房间与服务",front:"到店接待",events:"事件中心",worklist:"事件中心",bookings:"今日预订",history:"住客档案","profile-records":"客史记录",operations:"部门负责人","operations-data":"运营安排",development:"公共设施","development-data":"主题活动",brief:"08:00 晨会","brief-data":"需求预测",evening:"20:00 复盘","evening-data":"客诉与建议",report:"日结报告","report-data":"财务明细",score:"经营评分",tasks:"当前目标","tasks-data":"日常奖励",career:"长期里程碑",teaching:"部门带教",log:"经营日志",settings:"存档与设置"},Vd={"room-data":"hotel","hotel-archive":"hotel-data","brief-data":"brief","evening-data":"evening","report-data":"report","profile-records":"history","tasks-data":"tasks",career:"tasks-data",teaching:"tasks"};class Wd{current={view:"hub",selected:"",selection:Ol(),scroll:0};pages=new Map;history=[];get canBack(){return!!this.history.length||!Ka.some(([e])=>e===this.current.view)}visit(e,t=!1){if(e==="worklist"&&(e="events"),fu[e]||(e="hub"),e===this.current.view){t&&(this.history=[]);return}this.pages.set(this.current.view,structuredClone(this.current)),t?this.history=[]:(this.history.push(structuredClone(this.current)),this.history.length>20&&this.history.shift()),this.current=structuredClone(this.pages.get(e)??{view:e,selected:"",selection:Ol(),scroll:0})}back(){this.pages.set(this.current.view,structuredClone(this.current));const e=this.history.pop();if(e){this.current=e;return}this.visit(Vd[this.current.view]??Os(this.current.view),!0)}clear(){this.pages.set(this.current.view,structuredClone(this.current)),this.history=[]}}function Xd(n){const e=n.game,t=e.logs.filter(s=>s.day===e.day),i=s=>t.some(a=>s.test(a.text)),r=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(s=>s.challenge&&!s.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:r,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:r,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:r,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}const is=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),ra=(n,e,t)=>`<div class="focus-person">${or(n)}<div><strong>${et(e)}</strong><p>${et(t)}</p></div></div>`,rs=n=>`<p class="focus-trade">${et(n)}</p>`,jn=(n,e)=>`<article class="record-card"><small>${et(n)}</small><p>${et(e)}</p></article>`,mi=(n,e)=>Math.min(n,Math.max(0,e-1));function $d(n,e,t){const i=n.game,r=i.operations;if(e==="room-data"){const s=n.entities[t.room??""];if(s?.kind!=="room")return He("房间详情",ze("house","请选择一间房","从房态图打开具体房间。"),be("查看房态","hotel"));const a=n.guests.find(o=>o.id===s.guestId);return He(s.number+" · 房间与服务",a?ra(a,a.name+" · "+a.tier,a.thought)+Xe([["订单房费",tt(a.rate??i.price)],["退房时间",is(jc(a))],["体验",String(Math.round(a.satisfaction??90))]])+jn("服务记录",a.occasion?.outcome??a.challenge?.outcome??(a.serviceDone?"专属服务已安排":"尚未安排额外服务")):ze("house",za(s),"房态页可清洁、维修、装修或预留；所有操作在同一位置。"),(a&&!a.serviceDone?Ie("专属服务 · ¥120","guest-service",a.id):"")+(a?`<button class="game-action" data-open="events" data-guest="${a.id}">查看诉求</button>`:"")+be("返回房态","hotel"))}if(e==="bookings"){const s=[...r.bookings].sort((d,f)=>d.eta-f.eta),a=mi(t.bookingPage,s.length),o=s[a],l=o&&r.profiles[o.profileId],c=o&&n.guests.find(d=>d.reservationId===o.id&&!d.departing),u=Xe(["APP","团单","平台"].map(d=>[d,String(r.bookings.filter(f=>f.source===d).length)+" 单"]))+An("bookingPage",a,s.length);return He("今日预订",u+(o&&l?ra(l,l.name+" · "+l.tier,o.occasion?"今天生日，提前留出礼遇预算。":o.challenge?{quiet:"需要安静房间",sua:"SUA 标准套已确认",family:"需要早餐与加床",audit:"关注服务标准"}[o.challenge]:"常规接待")+Xe([["到店",is(o.eta)],["住宿",o.nights+" 晚"],["锁定价",tt(o.rate)]])+jn(o.source+" · "+{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"已安置"}[o.status],l.history.at(-1)?.text??"首次来店。"):ze("front","今天暂无预订","Walk-in 到店后会进入接待队列。"))+rs("Walk-in 不在预订表内；当前已到 "+r.walkinArrivals+" 位。确认报价已锁定，平台佣金为每晚 15%。"),(c?`<button class="game-action" data-open="${c.roomId?"events":"front"}" data-guest="${c.id}">${c.roomId?"查看服务":"为他选房"}</button>`:be("查看到店客人","front"))+(l?`<button class="game-action" data-open="history" data-profile="${l.id}">查看客史</button>`:"")+be("晨会","brief"))}if(e==="history"||e==="profile-records"){const s=Object.values(r.profiles).filter(d=>d.visits>0||n.guests.some(f=>f.profileId===d.id)).sort((d,f)=>f.visits-d.visits),a=t.profile?Math.max(0,s.findIndex(d=>d.id===t.profile)):mi(t.profilePage,s.length),o=s[a],l=o&&n.guests.find(d=>d.profileId===o.id&&!d.departing);if(!o)return He("客史",ze("front","客人正在写下第一段故事","接待住客后，这里会保存服务与回访记录。"),be("接待客人","front"));const c=[...o.history].reverse(),u=mi(t.logPage,c.length);return He(e==="history"?"客史 · 认出这位客人":"客史 · 完整记录",(e==="history"?An("profilePage",a,s.length):An("logPage",u,c.length))+ra(o,o.name+" · "+o.tier,e==="history"?"先看上次承诺，再决定这次怎样接待。":"每次决定与体验会留在这份记录里。")+(e==="history"?Xe([["住宿次数",String(o.visits)],["信任",String(o.trust)],["累计消费",tt(o.spend)]])+jn("最近一段故事",c[0]?.text??"首次入住，等待这次故事。"):jn(c[u]?"Day "+c[u].day:"尚无记录",c[u]?.text??"完成入住后积累客史。")),(l?`<button class="game-action" data-open="${l.roomId?"events":"front"}" data-guest="${l.id}">${l.roomId?"查看当前诉求":"接待这位客人"}</button>`:be("今日预订","bookings"))+`<button class="game-action" data-open="${e==="history"?"profile-records":"history"}" data-profile="${o.id}">${e==="history"?"完整记录":"返回客史"}</button>`)}if(e==="operations-data"){const s=["stock","price","position"].includes(t.archiveTab)?t.archiveTab:"stock",a=an(["stock","price","position"].map((c,u)=>Qt(["备货","报价","定位"][u],"archiveTab",c,c===s)).join("")),o=s==="stock"?ze("fnb","餐台供应优先于扩容","手动补货即时入库；主管配送需走到餐台后完成。")+Xe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"],["每次采购","50 份 / ¥300"]]):s==="price"?ze("revenue","每晚收益与客流之间取舍","报价影响未预订客流，已确认订单与在住价格不变。")+Xe([["当前报价",tt(i.price)],["预计入住",Pi(n).occupancy+"%"]])+`<label class="precision-price">精确报价 <input id="price-input" type="number" min="350" max="1800" value="${i.price}"></label>`:ze("revenue","这家酒店要服务谁？","商务重工作日与早餐，度假重周末和体验，城市混合兼顾两类需求。")+Xe([["当前定位",{business:"商务",resort:"度假",urban:"城市混合"}[i.positioning]]])+rs("定位会改变客流、住宿时长与公区偏好；调整后观察一天经营结果。"),l=s==="stock"?Ie("早餐 +50 · ¥300","stock","breakfast")+Ie("酒廊 +50 · ¥300","stock","club"):s==="price"?Ie("¥720 · 争取客流","price","","720")+Ie("¥850 · 提高单价","price","","850")+Ie("应用精确报价","price"):Ie("商务","position","","business")+Ie("度假","position","","resort")+Ie("城市混合","position","","urban");return He("运营安排",a+o,l)}if(e==="score"){const s=Br(n);return He("经营评分",Xe([["综合评分",s.total+" / 100"],["评估方式","四项等权"]])+`<div class="rating-list">${s.parts.map(a=>`<div><span>${a.name}</span><b>${a.value}</b><progress max="100" value="${a.value}" aria-label="${a.name}"></progress></div>`).join("")}</div>`+ze("revenue","从最弱的一项开始改善","口碑看承诺，体验看服务，房务看周转，业主看经营。"),be("处理待办","events")+be("财务表现","report-data"))}if(e==="report-data"){const s=i.reports.at(-1);return He(s?"Day "+s.day+" · 财务明细":"今天 · 财务进度",Xe([["入账收入",tt(s?.revenue??i.revenue)],["成本",tt(s?.expense??i.expense)],["净额",tt((s?.revenue??i.revenue)-(s?.expense??i.expense))]])+(s?Xe([["ADR",tt(s.adr)],["RevPAR",tt(s.revpar)],["入住率",s.occupancy+"%"]])+jn("收益经理建议",s.recommendation):ze("revenue","房费于午夜统一结算","当前收入包括已经到账的消费与奖金；在住房费尚未入账。")),be("经营评分","score")+be("收支日志","log")+(i.reportOpen?Ie("开始下一天","continue"):be("晚间复盘","evening")))}if(e==="brief-data"){const s=Pi(n);return He("晨会 · 完整预测",ze("revenue",iu[r.event],"预订报价已锁定，Walk-in 仍有波动；先判断库存和翻房能否接住需求。")+Xe([["预计入住",s.occupancy+"%"],["Walk-in",s.walkins+" 位"],["翻房",s.housekeeping+" 间"]])+Xe([["早餐",s.breakfast+" 人"],["标准套需求",s.suites+" 间"],["Happy Hour",s.club+" 人"]])+jn("客源结构","商务 "+s.business+" / 度假 "+s.resort+" / 团队 "+s.group),be("调整晨会决定","brief")+be("核对预订","bookings"))}if(e==="evening-data"){const s=i.evening;if(!s)return He("复盘 · 尚未开会",ze("revenue","20:00 回看今天","当前可以先处理待办与预订。"),be("经营看板","hub"));const a=[...s.logs].reverse(),o=mi(t.logPage,a.length),l=a[o],c=s.notes[0];return He("复盘 · 客诉与建议",An("logPage",o,a.length)+Xe([["客诉计数",String(s.complaints)],["待处理",String(s.pending)],["已入账",tt(s.revenue)]])+jn(l?is(l.minute)+" · "+l.category:"今天的服务记录",l?.text??"尚无客诉记录。")+ze("revenue",c?.title??"总部建议",c?.text??"继续保持服务节奏。"),(l?.target&&n.entities[l.target]?`<button class="game-action" data-entity="${l.target}">查看现场</button>`:be("处理待办","events"))+be("返回复盘","evening"))}if(e==="tasks-data"||e==="career"){const s=e==="career",a=s?nu(n):i.tasks,o=mi(s?t.careerPage:t.taskPage,a.length),l=a[o];if(!l)return He("奖励",ze("front","目前没有可领取目标","经营主线与酒店成长会继续记录。"),be("当前目标","tasks"));const c="paid"in l&&typeof l.paid=="number"?l.paid:0,u=Math.max(0,l.reward-c);return He(s?"长期里程碑":"日常支线奖励",An(s?"careerPage":"taskPage",o,a.length)+ze("front",l.title,s?"日常经营逐步积累；长期目标不会随交班重置。":"奖金按进度分段到账；完成后领取尾款。")+Xe([["进度",Math.min(l.progress,l.goal)+" / "+l.goal],["奖金上限",tt(l.reward)],["已到账",tt(l.claimed?l.reward:c)]])+`<progress max="${l.goal}" value="${Math.min(l.progress,l.goal)}"></progress>`,(l.claimed?be("当前目标","tasks"):l.progress>=l.goal?Ie(s?"领取奖励":"领取尾款 · "+tt(u),s?"claim-career":"claim",l.id):be("去完成","target"in l?String(l.target):"hub"))+be(s?"日常奖励":"长期里程碑",s?"tasks-data":"career")+be("三日带教","teaching"))}if(e==="teaching"){const s=Xd(n),a=mi(t.taskPage,s.length),o=s[a];return He("Day "+i.day+" · 部门带教",o?An("taskPage",a,s.length)+ze("front",o.title,o.text)+Xe([["当前步骤",o.done?"已完成":"待完成"],["今日带教",s.filter(l=>l.done).length+" / "+s.length]])+rs("完成当前步骤后继续下一步；第 1–3 天结束后仍可跟随经营主线。"):ze("front","三日带教已结束","主管会继续根据酒店现场给出建议。"),be(o?"去实践":"当前目标",o?.target??"tasks")+be("返回经营","hub"))}if(e==="log"){const s=["全部","客诉","收益","房态","部门","升级","入住"],a=s.includes(t.archiveTab)?t.archiveTab:"全部",o=[...i.logs].reverse().filter(u=>a==="全部"||u.category===a),l=mi(t.logPage,o.length),c=o[l];return He("经营日志",an(s.map(u=>Qt(u,"archiveTab",u,u===a)).join(""))+An("logPage",l,o.length)+(c?jn("Day "+c.day+" · "+is(c.minute)+" · "+c.category,c.text):ze("revenue","暂无记录","经营决定和现场结果会自动记录在这里。")),(c?.target&&n.entities[c.target]?`<button class="game-action" data-entity="${c.target}">查看现场</button>`:be("查看当前待办","events"))+be("经营看板","hub"))}return e==="settings"?He("存档与设置",ze("front","继续经营，从这里妥善交班","进度自动保存在当前浏览器；导出备份可留存酒店状态。")+Xe([["当前进度","Day "+i.day],["存档","浏览器自动保存"]])+rs("新开存档会弹出确认，并清除本浏览器当前 v8 进度。"),Ie("导出备份","export")+Ie("新开酒店","reset")+be("返回经营","hub")):e==="hotel-archive"?He("酒店 · 空间总览",Xe([["已配置",String(nt(n).length)+" 间"],["待翻房",String(nt(n).filter(s=>s.status==="dirty").length)+" 间"],["施工楼层",String(n.floors.filter(s=>s.construction).length)]])+ze("engineering","先用好现有空间，再增加容量","房态页选择楼层和房间；扩建交付空位，玩家逐间配置。"),be("房态与装修","hotel")+be("扩建一层","hotel-data")+be("公区设施","development")):He("经营入口已更新",ze("front","从统一导航继续","所有日常操作都在五个部门入口中。"),be("经营看板","hub"))}function qd(n,e){const t=new Wd,i=$=>n.querySelector($),r=n.querySelector("dialog"),s=i("#sheet-content"),a=i("#sheet-eye");let o=()=>{},l=null;const c=i(".sheet-top"),u=document.createElement("button");u.className="sheet-back",u.textContent="‹",u.dataset.menuBack="true",u.setAttribute("aria-label","返回上一页"),c.prepend(u);const d=document.createElement("nav");d.className="module-tabs",d.setAttribute("aria-label","当前部门功能"),s.before(d);const f=document.createElement("p");f.className="action-feedback",f.setAttribute("role","status"),f.hidden=!0,s.before(f);const h=document.createElement("div");h.className="fixed-actions",s.after(h);const p=document.createElement("nav");p.className="sheet-navigation",p.setAttribute("aria-label","切换管理部门"),h.after(p);const x=document.createElement("div");x.className="reward-toast",x.setAttribute("role","status"),n.append(x);let g=e.getState().game?.rewardBeat?.id;const m=()=>Ka.map(([$,q])=>`<button data-open="${$}" data-root-menu="true" aria-label="${q}" aria-pressed="${r.open&&Os(t.current.view)===$}">${Bd($)}<span>${wl(e.getState(),$)?"◇ ":""}${q}</span></button>`).join(""),A=()=>{i(".main-nav").innerHTML=m(),p.innerHTML=`<div class="menu-tabs">${m()}</div>`},C=()=>{t.current.scroll=s.scrollTop},b=()=>{const{view:$,selection:q}=t.current,ye=e.getState();a.textContent=Ka.find(([te])=>te===Os($))?.[1]+" / "+(fu[$]??"酒店经营"),u.hidden=!t.canBack,d.innerHTML=Hd($).map(([te,he])=>`<button data-open="${te}" aria-current="${$===te?"page":"false"}">${he}</button>`).join("");const Le=wl(ye,$),Ce=Ur(ye);$==="operations"&&Ce?.index===4&&(q.department="house"),$==="operations-data"&&Ce?.index===3&&(q.archiveTab="stock"),s.innerHTML=Le?He("即将解锁",ze("front",Le,"先完成当前主线，功能会逐步开放。已发生的住客诉求仍可正常处理。"),be("查看当前目标","tasks")):Gd(ye,$,q)??$d(ye,$,q),s.querySelectorAll("[data-action]").forEach(te=>{const he=Xc(ye,{type:te.dataset.action,id:te.dataset.id,value:te.dataset.value});he&&(te.disabled=!0,te.title=he,te.textContent="◇ "+te.textContent)}),Ce?.index===4&&s.querySelectorAll('[data-focus-key="department"]').forEach(te=>{te.dataset.focusValue!=="house"&&te.remove()}),Ce?.index===3&&s.querySelectorAll('[data-focus-key="archiveTab"]').forEach(te=>{te.dataset.focusValue!=="stock"&&te.remove()}),Ce&&$!=="tasks"&&$!=="teaching"&&!Le&&s.insertAdjacentHTML("afterbegin",`<button class="guide-ribbon" data-open="tasks"><span>开业 ${Ce.index+1}/${Ce.total}</span><strong>${et(Ce.title)}</strong><small>查看带教 ›</small></button>`),h.replaceChildren();const W=s.querySelector(".focus-footer");W&&h.append(W),r.classList.add("focus-layout","management-shell"),r.dataset.view=$,(h.querySelector("[data-action]:not([disabled])")??h.querySelector("button"))?.classList.add("decision-primary"),r.open||(l=document.activeElement,r.showModal()),s.scrollTop=t.current.scroll,r.scrollTop=0,A()},w=($,q=!1)=>{C(),t.visit($,q),f.hidden=!0,b()},T=$=>{const q=e.getState(),ye=q.entities[$];if(!ye)return;C(),t.visit(ye.kind==="room"?"hotel":"development");const Le=t.current.selection;t.current.selected=$,ye.kind==="room"?(Le.room=$,Le.floor=ye.floorId):Le.facility=$,f.hidden=!0,b()},R=()=>{f.textContent=e.getState().game.notice,f.hidden=!f.textContent},_=()=>{C(),t.clear(),r.close(),f.hidden=!0;const $=e.getState().game;$.evening?.open&&e.dispatch({type:"evening-close"}),$.operations?.briefOpen&&e.dispatch({type:"brief-start"}),e.select(null),A(),l?.isConnected&&l.focus()},E=()=>{if(e.getState().game.reportOpen&&t.current.view==="report"){e.dispatch({type:"continue"}),w("brief",!0);return}_()};i(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',i(".world-caption").textContent="轻点空间 · 查看问题与决定",i(".property-name small").id="game-time",i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip").removeAttribute("data-focus"),i(".event-strip").setAttribute("data-open","events"),i(".speed-control").insertAdjacentHTML("beforeend",Ie("Ⅱ","pause"));let D=!1;const P=($,q)=>{const ye=r.getBoundingClientRect();return $<ye.left||$>ye.right||q<ye.top||q>ye.bottom};r.addEventListener("pointerdown",$=>{D=$.target===r&&P($.clientX,$.clientY)}),r.addEventListener("click",$=>{D&&$.target===r&&P($.clientX,$.clientY)&&E(),D=!1}),r.addEventListener("cancel",$=>{$.preventDefault(),E()}),n.addEventListener("click",$=>{const q=$.target.closest("button");if(!q||q.disabled)return;if(q.matches(".close-sheet")){E();return}if(q.dataset.menuBack){C(),t.back(),f.hidden=!0,b();return}const ye=t.current.selection;if(q.dataset.focusKey){const W=q.dataset.focusKey,re=q.dataset.focusValue??"";if(!(W in ye)&&!["room","floor","department","facility","guest","event","profile"].includes(W))return;ye[W]=W.endsWith("Page")?Math.max(0,Number(re)||0):re,W==="floor"&&(ye.room=void 0),W==="guestPage"&&(ye.guest=void 0,ye.roomPage=0),W==="eventPage"&&(ye.event=void 0),W==="profilePage"&&(ye.profile=void 0),W==="archiveTab"&&(ye.logPage=0),t.current.scroll=0,f.hidden=!0,b();return}if(q.dataset.open){C();const W=t.current.selection.room;t.visit(q.dataset.open,!!q.dataset.rootMenu),q.dataset.open==="room-data"&&W&&(t.current.selection.room=W);const re=t.current.selection;q.dataset.assignRoom&&(re.room=q.dataset.assignRoom,re.roomPage=0),q.dataset.guest&&(re.guest=q.dataset.guest,re.event=q.dataset.guest,re.roomPage=0),q.dataset.profile&&(re.profile=q.dataset.profile,re.logPage=0),f.hidden=!0,b();return}if(q.dataset.entity){T(q.dataset.entity),o(e.getState().entities[q.dataset.entity].floorId);return}if(q.dataset.floor){_(),e.focusFloor(q.dataset.floor),o(q.dataset.floor);return}if(q.dataset.speed){e.setSpeed(Number(q.dataset.speed));return}if(q.matches(".weather")){const W=["dusk","night","day"];e.setAtmosphere(W[(W.indexOf(e.getState().atmosphere)+1)%3]);return}const Le=q.dataset.action;if(!Le)return;if(Le==="reset"){document.dispatchEvent(new Event("new-game"));return}if(Le==="export"){const W=document.createElement("a");W.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),W.download="jinwan-v8-save.json",W.click(),setTimeout(()=>URL.revokeObjectURL(W.href),500);return}const Ce={type:Le,id:q.dataset.id,value:q.dataset.value};if(Le==="checkin"&&(Ce.roomId=q.dataset.room),Le==="price"&&(Ce.value=q.dataset.value||Number(n.querySelector("#price-input")?.value)),C(),e.dispatch(Ce),Le==="brief-start"||Le==="evening-close"){_();return}if(Le==="continue"){w("brief",!0);return}if(Le==="checkin"&&!Ur(e.getState())){const W=e.getState().guests.find(re=>re.id===Ce.id);W?.roomId&&(W.challenge&&!W.challenge.resolved||W.occasion&&!W.occasion.resolved)&&(t.visit("events"),t.current.selection.event=W.id)}r.open&&(b(),R())});let F=null,Y="",Q="",B=0,J=0,V=0,ne="",se=e.getState().game?.onboarding?.step;const ce=()=>{const $=e.getState(),q=$.game;i(".score-button").innerHTML=`<i style="--score:${Br($).total}%"></i> ${Br($).total} 分 ›`,i("#cash").textContent=tt($.metrics.cash),i("#reputation").textContent=String($.metrics.reputation),i("#owner").textContent=String($.metrics.owner),i("#suite-count").textContent=Kc($)+" 间",i("#game-time").textContent=`${uu(q.day)} · Day ${q.day} ${Pd(q.minute)}${q.paused?" · 暂停":""}`,i("#occupancy").textContent=`${Zc($)}/${nt($).length} 在住 · 收入 ${tt(q.revenue)}`;const ye=Ur($),Le=zr($),Ce=q.campaign;i(".today-hint").setAttribute("data-open","tasks"),i(".today-hint span:nth-child(2)").textContent=ye?ye.title:Le?Ce?.result?Ce.result.passed?"检验通过 · 开启下一阶段":"检验待改善 · 免费重约":Ce?.inspection?Ce.inspection.phase==="visiting"?"现场体验中 · 等待回访":Le.exam+" · 已预约":Le.ready?"目标达成 · 预约"+Le.exam:Le.action:"主线完成 · 自由经营",i("#task-count").textContent=ye?ye.index+1+" / "+ye.total:Le?Le.progress+"/"+Le.goal:"5 / 5";const W=JSON.stringify([q.onboarding?.step,Ce?.chapter,Le?.progress,Ce?.result,Ce?.inspection?.phase,Ce?.inspection?.prepared]);r.open&&t.current.view==="tasks"&&ne!==W&&b(),ne=W,q.onboarding?.step!==se&&(se=q.onboarding?.step,r.open&&b(),x.textContent=q.notice,x.classList.remove("show"),x.offsetWidth,x.classList.add("show")),q.rewardBeat&&q.rewardBeat.id!==g&&(g=q.rewardBeat.id,x.textContent="＋"+tt(q.rewardBeat.amount)+" · "+q.rewardBeat.text,x.classList.remove("show"),x.offsetWidth,x.classList.add("show"));const re=q.events.length||$.guests.some(he=>!he.departing&&he.roomId&&(he.late==="pending"||he.challenge&&!he.challenge.resolved||he.occasion&&!he.occasion.resolved));i(".event-strip span").textContent=$.guests.some(he=>he.occasion&&!he.occasion.resolved&&!he.departing&&he.roomId)?"住客今天过生日 · 礼遇待决定":re?"现场有服务诉求待处理":Ii($).length?`${Ii($).length} 位住客等待入住`:"酒店运营平稳",i(".event-strip b").textContent=re?"处理 ›":"前台 ›",i(".event-strip").setAttribute("data-open",re?"events":"front"),i(".review-strip span").textContent=q.reportOpen?"今日已结算 · 查看日结并开始下一天":q.notice,i(".review-strip").setAttribute("data-open",q.reportOpen?"report":"log"),i(".weather span").textContent=q.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(he=>{he.classList.toggle("active",Number(he.dataset.speed)===$.speed),he.setAttribute("aria-pressed",String(Number(he.dataset.speed)===$.speed))});const te=$.floors.map(he=>he.id).join(",");Y!==te&&(Y=te,i(".floor-rail").innerHTML=[...$.floors].reverse().map(he=>`<button data-floor="${he.id}" aria-label="前往${he.label} ${he.name}">${he.label}</button>`).join("")),$.selectedId&&$.selectedId!==F&&T($.selectedId),F=$.selectedId,q.operations?.briefOpen&&J!==q.day&&(J=q.day,w("brief",!0),t.current.selection.meeting="overview",b()),q.evening?.open&&V!==q.evening.day&&(V=q.evening.day,w("evening",!0)),q.reportOpen&&B!==q.day&&(B=q.day,w("report",!0)),Q!==q.notice&&(Q=q.notice),A()};return e.subscribe(ce),ce(),{stage:i(".world-stage"),setFocusHandler:$=>{o=$},showError:$=>{s.innerHTML=`<section class="focus-screen"><h2>画面暂时不可用</h2><div class="focus-main"><p>${et($)}</p></div></section>`,h.innerHTML="",r.showModal()}}}function Yd(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return qd(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,o=()=>{};const l=()=>{t.close(),e.select(null),s="",a?.focus()},c=(p,x)=>{r.textContent=p,i.innerHTML=x,t.open||(a=document.activeElement,t.showModal())},u=p=>{const x=e.getState(),g=x.entities[p];if(!g)return;const m=Rl(x,p);if(g.kind==="room"){const A=x.guests.find(C=>C.id===g.guestId);c("HYATT PLACE · "+m.label,`<h2>${g.number}<span>${g.type==="suite"?"开放式套房":g.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${g.status}">${Od[g.status]}</div><dl><div><dt>住客</dt><dd>${A?A.name+" · "+A.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${g.nightsLeft?g.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${m.label} · ${m.name}</dd></div></dl>${A?"<blockquote>“"+A.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${m.id}">回到 ${g.number} 的楼层</button>`)}else{const A={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+m.label,`<h2>${g.name}</h2><p>${A[g.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${g.usage} / ${g.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${g.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${g.quality} / ${g.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${m.id}">回到${g.name}</button>`)}},d={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const p=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...p.floors].reverse().map(x=>`<button data-return="${x.id}"><b>${x.label}</b><span>${x.name}</span><small>${x.entityIds.length>1?x.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const p=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([x,g,m])=>`<button data-focus="${x}"><b>${p.visited.includes(x)?"✓":"○"}</b><span>${g}<small>${m}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const p=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(p.visited.length?[...p.visited].reverse().map(x=>{const g=p.entities[x];return`<button data-focus="${x}"><span>${g.kind==="room"?g.number+" 房间":g.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",p=>{const x=p.target.closest("button");if(x){if(x.matches(".close-sheet")&&l(),x.dataset.open&&(e.select(null),s=x.dataset.open,d[s]?.()),x.dataset.speed&&e.setSpeed(Number(x.dataset.speed)),x.dataset.return){const g=x.dataset.return;l(),e.focusFloor(g),o(g)}if(x.dataset.focus){const g=x.dataset.focus,m=Rl(e.getState(),g);l(),m&&(e.focusFloor(m.id),o(m.id)),e.select(g)}if(x.dataset.floor&&(e.focusFloor(x.dataset.floor),o(x.dataset.floor)),x.dataset.atmosphere&&(e.setAtmosphere(x.dataset.atmosphere),l()),x.matches(".weather")){const g=["dusk","night","day"];e.setAtmosphere(g[(g.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",p=>{p.preventDefault(),l()}),t.addEventListener("click",p=>{if(p.target===t){const x=t.getBoundingClientRect();(p.clientX<x.left||p.clientX>x.right||p.clientY<x.top||p.clientY>x.bottom)&&l()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(p=>`<button data-floor="${p.id}" aria-label="前往${p.label} ${p.name}">${p.label}</button>`).join("");let f=null;const h=p=>{n.querySelector("#cash").textContent="¥"+p.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(p.metrics.reputation),n.querySelector("#owner").textContent=String(p.metrics.owner),n.querySelector("#suite-count").textContent=Kc(p)+" 间",n.querySelector("#occupancy").textContent=`${nt(p).length} 间客房 · ${Zc(p)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(x=>p.visited.includes(x)).length+"/3",n.querySelectorAll("[data-speed]").forEach(x=>{x.classList.toggle("active",Number(x.dataset.speed)===p.speed),x.setAttribute("aria-pressed",String(Number(x.dataset.speed)===p.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[p.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[p.atmosphere],n.querySelectorAll("[data-floor]").forEach(x=>x.classList.toggle("active",x.dataset.floor===p.focusedFloorId)),p.selectedId&&p.selectedId!==f&&(s="entity",u(p.selectedId)),f=p.selectedId};return e.subscribe(h),h(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:p=>{o=p},showError:p=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+p+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const el="185",Kd=0,kl=1,Zd=2,Ps=1,hu=2,Ir=3,fi=0,Yt=1,zn=2,Vn=0,lr=1,Bl=2,zl=3,Gl=4,Jd=5,bi=100,Qd=101,jd=102,ef=103,tf=104,nf=200,rf=201,sf=202,af=203,Za=204,Ja=205,of=206,lf=207,cf=208,uf=209,df=210,ff=211,hf=212,pf=213,mf=214,Qa=0,ja=1,eo=2,dr=3,to=4,no=5,io=6,ro=7,pu=0,gf=1,vf=2,Pn=0,mu=1,gu=2,vu=3,tl=4,_u=5,xu=6,Mu=7,bu=300,Li=301,fr=302,sa=303,aa=304,qs=306,ks=1e3,Hn=1001,so=1002,Lt=1003,_f=1004,ss=1005,Ot=1006,oa=1007,Ei=1008,jt=1009,yu=1010,Su=1011,Gr=1012,nl=1013,Ln=1014,mn=1015,Xn=1016,il=1017,rl=1018,Hr=1020,Eu=35902,Tu=35899,Au=1021,wu=1022,gn=1023,$n=1026,Ti=1027,sl=1028,al=1029,Di=1030,ol=1031,ll=1033,Is=33776,Ls=33777,Ds=33778,Us=33779,ao=35840,oo=35841,lo=35842,co=35843,uo=36196,fo=37492,ho=37496,po=37488,mo=37489,Bs=37490,go=37491,vo=37808,_o=37809,xo=37810,Mo=37811,bo=37812,yo=37813,So=37814,Eo=37815,To=37816,Ao=37817,wo=37818,Ro=37819,Co=37820,Po=37821,Io=36492,Lo=36494,Do=36495,Uo=36283,No=36284,zs=36285,Fo=36286,xf=3200,Oo=0,Mf=1,oi="",Xt="srgb",Gs="srgb-linear",Hs="linear",at="srgb",Gi=7680,Hl=519,bf=512,yf=513,Sf=514,cl=515,Ef=516,Tf=517,ul=518,Af=519,Vl=35044,Wl="300 es",Cn=2e3,Vr=2001;function wf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Rf(){const n=Vs("canvas");return n.style.display="block",n}const Xl={};function $l(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ru(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=Ru(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ze(...n){n=Ru(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function cr(...n){const e=n.join(" ");e in Xl||(Xl[e]=!0,Ne(...n))}function Cf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Pf={[Qa]:ja,[eo]:io,[to]:ro,[dr]:no,[ja]:Qa,[io]:eo,[ro]:to,[no]:dr};class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],la=Math.PI/180,ko=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function If(n,e){return(n%e+e)%e}function ca(n,e,t){return(1-t)*n+t*e}function br(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class qe{static{qe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[a+0],h=s[a+1],p=s[a+2],x=s[a+3];if(d!==x||l!==f||c!==h||u!==p){let g=l*f+c*h+u*p+d*x;g<0&&(f=-f,h=-h,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){const A=Math.acos(g),C=Math.sin(A);m=Math.sin(m*A)/C,o=Math.sin(o*A)/C,l=l*m+f*o,c=c*m+h*o,u=u*m+p*o,d=d*m+x*o}else{l=l*m+f*o,c=c*m+h*o,u=u*m+p*o,d=d*m+x*o;const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[a],f=s[a+1],h=s[a+2],p=s[a+3];return e[t]=o*p+u*d+l*h-c*f,e[t+1]=l*p+u*f+c*d-o*h,e[t+2]=c*p+u*h+o*f-l*d,e[t+3]=u*p-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),d=o(s/2),f=l(i/2),h=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"YZX":this._x=f*u*d+c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d-f*h*p;break;case"XZY":this._x=f*u*d-c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d+f*h*p;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{static{k.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ql.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ua.copy(this).projectOnVector(e),this.sub(ua)}reflect(e){return this.sub(ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ua=new k,ql=new vr;class Fe{static{Fe.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],p=i[8],x=r[0],g=r[3],m=r[6],A=r[1],C=r[4],b=r[7],w=r[2],T=r[5],R=r[8];return s[0]=a*x+o*A+l*w,s[3]=a*g+o*C+l*T,s[6]=a*m+o*b+l*R,s[1]=c*x+u*A+d*w,s[4]=c*g+u*C+d*T,s[7]=c*m+u*b+d*R,s[2]=f*x+h*A+p*w,s[5]=f*g+h*C+p*T,s[8]=f*m+h*b+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*s,h=c*s-a*l,p=t*d+i*f+r*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=d*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=f*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=h*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(da.makeScale(e,t)),this}rotate(e){return cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(da.makeRotation(-e)),this}translate(e,t){return cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new Fe,Yl=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){const n={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===at&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(r.r=ur(r.r),r.g=ur(r.g),r.b=ur(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===oi?Hs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return cr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return cr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Gs]:{primaries:e,whitePoint:i,transfer:Hs,toXYZ:Yl,fromXYZ:Kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Yl,fromXYZ:Kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const Ye=Lf();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ur(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Hi;class Df{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Hi===void 0&&(Hi=Vs("canvas")),Hi.width=e.width,Hi.height=e.height;const r=Hi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Hi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Wn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wn(t[i]/255)*255):t[i]=Wn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uf=0;class dl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=$r(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(fa(r[a].image)):s.push(fa(r[a]))}else s=fa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function fa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Df.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let Nf=0;const ha=new k;class Gt extends Ni{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=Hn,r=Hn,s=Ot,a=Ei,o=gn,l=jt,c=Gt.DEFAULT_ANISOTROPY,u=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=$r(),this.name="",this.source=new dl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ha).x}get height(){return this.source.getSize(ha).y}get depth(){return this.source.getSize(ha).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case so:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case so:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=bu;Gt.DEFAULT_ANISOTROPY=1;class pt{static{pt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,b=(h+1)/2,w=(m+1)/2,T=(u+f)/4,R=(d+x)/4,_=(p+g)/4;return C>b&&C>w?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=T/i,s=R/i):b>w?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=T/r,s=_/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=R/s,r=_/s),this.set(i,r,s,t),this}let A=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(g-p)/A,this.y=(d-x)/A,this.z=(f-u)/A,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ff extends Ni{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Gt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new dl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends Ff{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Cu extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Of extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dt{static{dt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,d,f,h,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,d,f,h,p,x,g)}set(e,t,i,r,s,a,o,l,c,u,d,f,h,p,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Vi.setFromMatrixColumn(e,0).length(),s=1/Vi.setFromMatrixColumn(e,1).length(),a=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,h=a*d,p=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+p*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=p+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,p=c*u,x=c*d;t[0]=f+x*o,t[4]=p*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,p=c*u,x=c*d;t[0]=f-x*o,t[4]=-a*d,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,h=a*d,p=o*u,x=o*d;t[0]=l*u,t[4]=p*c-h,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=h*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+p,t[10]=f-x*d}else if(e.order==="XZY"){const f=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+x,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=o*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,Bf)}lookAt(e,t,i){const r=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),ei.crossVectors(i,Zt),ei.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),ei.crossVectors(i,Zt)),ei.normalize(),as.crossVectors(Zt,ei),r[0]=ei.x,r[4]=as.x,r[8]=Zt.x,r[1]=ei.y,r[5]=as.y,r[9]=Zt.y,r[2]=ei.z,r[6]=as.z,r[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],p=i[2],x=i[6],g=i[10],m=i[14],A=i[3],C=i[7],b=i[11],w=i[15],T=r[0],R=r[4],_=r[8],E=r[12],D=r[1],P=r[5],F=r[9],Y=r[13],Q=r[2],B=r[6],J=r[10],V=r[14],ne=r[3],se=r[7],ce=r[11],$=r[15];return s[0]=a*T+o*D+l*Q+c*ne,s[4]=a*R+o*P+l*B+c*se,s[8]=a*_+o*F+l*J+c*ce,s[12]=a*E+o*Y+l*V+c*$,s[1]=u*T+d*D+f*Q+h*ne,s[5]=u*R+d*P+f*B+h*se,s[9]=u*_+d*F+f*J+h*ce,s[13]=u*E+d*Y+f*V+h*$,s[2]=p*T+x*D+g*Q+m*ne,s[6]=p*R+x*P+g*B+m*se,s[10]=p*_+x*F+g*J+m*ce,s[14]=p*E+x*Y+g*V+m*$,s[3]=A*T+C*D+b*Q+w*ne,s[7]=A*R+C*P+b*B+w*se,s[11]=A*_+C*F+b*J+w*ce,s[15]=A*E+C*Y+b*V+w*$,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],x=e[7],g=e[11],m=e[15],A=l*h-c*f,C=o*h-c*d,b=o*f-l*d,w=a*h-c*u,T=a*f-l*u,R=a*d-o*u;return t*(x*A-g*C+m*b)-i*(p*A-g*w+m*T)+r*(p*C-x*w+m*R)-s*(p*b-x*T+g*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],x=e[13],g=e[14],m=e[15],A=t*o-i*a,C=t*l-r*a,b=t*c-s*a,w=i*l-r*o,T=i*c-s*o,R=r*c-s*l,_=u*x-d*p,E=u*g-f*p,D=u*m-h*p,P=d*g-f*x,F=d*m-h*x,Y=f*m-h*g,Q=A*Y-C*F+b*P+w*D-T*E+R*_;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/Q;return e[0]=(o*Y-l*F+c*P)*B,e[1]=(r*F-i*Y-s*P)*B,e[2]=(x*R-g*T+m*w)*B,e[3]=(f*T-d*R-h*w)*B,e[4]=(l*D-a*Y-c*E)*B,e[5]=(t*Y-r*D+s*E)*B,e[6]=(g*b-p*R-m*C)*B,e[7]=(u*R-f*b+h*C)*B,e[8]=(a*F-o*D+c*_)*B,e[9]=(i*D-t*F-s*_)*B,e[10]=(p*T-x*b+m*A)*B,e[11]=(d*b-u*T-h*A)*B,e[12]=(o*E-a*P-l*_)*B,e[13]=(t*P-i*E+r*_)*B,e[14]=(x*C-p*w-g*A)*B,e[15]=(u*w-d*C+f*A)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,f=s*c,h=s*u,p=s*d,x=a*u,g=a*d,m=o*d,A=l*c,C=l*u,b=l*d,w=i.x,T=i.y,R=i.z;return r[0]=(1-(x+m))*w,r[1]=(h+b)*w,r[2]=(p-C)*w,r[3]=0,r[4]=(h-b)*T,r[5]=(1-(f+m))*T,r[6]=(g+A)*T,r[7]=0,r[8]=(p+C)*R,r[9]=(g-A)*R,r[10]=(1-(f+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Vi.set(r[0],r[1],r[2]).length();const o=Vi.set(r[4],r[5],r[6]).length(),l=Vi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ln.copy(this);const c=1/a,u=1/o,d=1/l;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,t.setFromRotationMatrix(ln),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=Cn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let p,x;if(l)p=s/(a-s),x=a*s/(a-s);else if(o===Cn)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Vr)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Cn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r);let p,x;if(l)p=1/(a-s),x=a/(a-s);else if(o===Cn)p=-2/(a-s),x=-(a+s)/(a-s);else if(o===Vr)p=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vi=new k,ln=new dt,kf=new k(0,0,0),Bf=new k(1,1,1),ei=new k,as=new k,Zt=new k,Zl=new dt,Jl=new vr;class hi{constructor(e=0,t=0,i=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zf=0;const Ql=new k,Wi=new vr,Un=new dt,os=new k,yr=new k,Gf=new k,Hf=new vr,jl=new k(1,0,0),ec=new k(0,1,0),tc=new k(0,0,1),nc={type:"added"},Vf={type:"removed"},Xi={type:"childadded",child:null},pa={type:"childremoved",child:null};class Dt extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dt.DEFAULT_UP.clone();const e=new k,t=new hi,i=new vr,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new Fe}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(jl,e)}rotateY(e){return this.rotateOnAxis(ec,e)}rotateZ(e){return this.rotateOnAxis(tc,e)}translateOnAxis(e,t){return Ql.copy(e).applyQuaternion(this.quaternion),this.position.add(Ql.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jl,e)}translateY(e){return this.translateOnAxis(ec,e)}translateZ(e){return this.translateOnAxis(tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?os.copy(e):os.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(yr,os,this.up):Un.lookAt(os,yr,this.up),this.quaternion.setFromRotationMatrix(Un),r&&(Un.extractRotation(r.matrixWorld),Wi.setFromRotationMatrix(Un),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nc),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vf),pa.child=e,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nc),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,Gf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,Hf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Dt.DEFAULT_UP=new k(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class kt extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wf={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;c.inputState.pinching&&f>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new kt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},ls={h:0,s:0,l:0};function ga(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ye.workingColorSpace){if(e=If(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ga(a,s,e+1/3),this.g=ga(a,s,e),this.b=ga(a,s,e-1/3)}return Ye.colorSpaceToWorking(this,r),this}setStyle(e,t=Xt){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=Pu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=ur(e.r),this.g=ur(e.g),this.b=ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ye.workingToColorSpace(Ft.copy(this),e),Math.round(Ke(Ft.r*255,0,255))*65536+Math.round(Ke(Ft.g*255,0,255))*256+Math.round(Ke(Ft.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Ft.copy(this),t);const i=Ft.r,r=Ft.g,s=Ft.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Xt){Ye.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,r=Ft.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(ls);const i=ca(ti.h,ls.h,t),r=ca(ti.s,ls.s,t),s=ca(ti.l,ls.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Je;Je.NAMES=Pu;class Xf extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const cn=new k,Nn=new k,va=new k,Fn=new k,$i=new k,qi=new k,ic=new k,_a=new k,xa=new k,Ma=new k,ba=new pt,ya=new pt,Sa=new pt;class hn{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Nn.subVectors(i,t),va.subVectors(e,t);const a=cn.dot(cn),o=cn.dot(Nn),l=cn.dot(va),c=Nn.dot(Nn),u=Nn.dot(va),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,p=(a*u-o*l)*f;return s.set(1-h-p,p,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ba.setScalar(0),ya.setScalar(0),Sa.setScalar(0),ba.fromBufferAttribute(e,t),ya.fromBufferAttribute(e,i),Sa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ba,s.x),a.addScaledVector(ya,s.y),a.addScaledVector(Sa,s.z),a}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Nn.subVectors(e,t),cn.cross(Nn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),cn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;$i.subVectors(r,i),qi.subVectors(s,i),_a.subVectors(e,i);const l=$i.dot(_a),c=qi.dot(_a);if(l<=0&&c<=0)return t.copy(i);xa.subVectors(e,r);const u=$i.dot(xa),d=qi.dot(xa);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector($i,a);Ma.subVectors(e,s);const h=$i.dot(Ma),p=qi.dot(Ma);if(p>=0&&h<=p)return t.copy(s);const x=h*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(qi,o);const g=u*p-h*d;if(g<=0&&d-u>=0&&h-p>=0)return ic.subVectors(s,r),o=(d-u)/(d-u+(h-p)),t.copy(r).addScaledVector(ic,o);const m=1/(g+x+f);return a=x*m,o=f*m,t.copy(i).addScaledVector($i,a).addScaledVector(qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fi{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cs.copy(i.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),us.subVectors(this.max,Sr),Yi.subVectors(e.a,Sr),Ki.subVectors(e.b,Sr),Zi.subVectors(e.c,Sr),ni.subVectors(Ki,Yi),ii.subVectors(Zi,Ki),gi.subVectors(Yi,Zi);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-gi.z,gi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,gi.z,0,-gi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-gi.y,gi.x,0];return!Ea(t,Yi,Ki,Zi,us)||(t=[1,0,0,0,1,0,0,0,1],!Ea(t,Yi,Ki,Zi,us))?!1:(ds.crossVectors(ni,ii),t=[ds.x,ds.y,ds.z],Ea(t,Yi,Ki,Zi,us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const On=[new k,new k,new k,new k,new k,new k,new k,new k],un=new k,cs=new Fi,Yi=new k,Ki=new k,Zi=new k,ni=new k,ii=new k,gi=new k,Sr=new k,us=new k,ds=new k,vi=new k;function Ea(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){vi.fromArray(n,s);const o=r.x*Math.abs(vi.x)+r.y*Math.abs(vi.y)+r.z*Math.abs(vi.z),l=e.dot(vi),c=t.dot(vi),u=i.dot(vi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Et=new k,fs=new qe;let $f=0;class _n extends Ni{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$f++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Vl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=br(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=br(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=br(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=br(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=br(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),i=Wt(i,this.array),r=Wt(r,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Iu extends _n{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Lu extends _n{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ht extends _n{constructor(e,t,i){super(new Float32Array(e),t,i)}}const qf=new Fi,Er=new k,Ta=new k;class qr{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):qf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);const t=Er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Er,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Ta)),this.expandByPoint(Er.copy(e.center).sub(Ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Yf=0;const nn=new dt,Aa=new Dt,Ji=new k,Jt=new Fi,Tr=new Fi,Ct=new k;class xn extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wf(e)?Lu:Iu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,i){return nn.makeTranslation(e,t,i),this.applyMatrix4(nn),this}scale(e,t,i){return nn.makeScale(e,t,i),this.applyMatrix4(nn),this}lookAt(e){return Aa.lookAt(e),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ht(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(Jt.min,Tr.min),Jt.expandByPoint(Ct),Ct.addVectors(Jt.max,Tr.max),Jt.expandByPoint(Ct)):(Jt.expandByPoint(Tr.min),Jt.expandByPoint(Tr.max))}Jt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ct.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(e,c),Ct.add(Ji)),r=Math.max(r,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new _n(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new k,l[_]=new k;const c=new k,u=new k,d=new k,f=new qe,h=new qe,p=new qe,x=new k,g=new k;function m(_,E,D){c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,D),f.fromBufferAttribute(s,_),h.fromBufferAttribute(s,E),p.fromBufferAttribute(s,D),u.sub(c),d.sub(c),h.sub(f),p.sub(f);const P=1/(h.x*p.y-p.x*h.y);isFinite(P)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(P),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(P),o[_].add(x),o[E].add(x),o[D].add(x),l[_].add(g),l[E].add(g),l[D].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let _=0,E=A.length;_<E;++_){const D=A[_],P=D.start,F=D.count;for(let Y=P,Q=P+F;Y<Q;Y+=3)m(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const C=new k,b=new k,w=new k,T=new k;function R(_){w.fromBufferAttribute(r,_),T.copy(w);const E=o[_];C.copy(E),C.sub(w.multiplyScalar(w.dot(E))).normalize(),b.crossVectors(T,E);const P=b.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,P)}for(let _=0,E=A.length;_<E;++_){const D=A[_],P=D.start,F=D.count;for(let Y=P,Q=P+F;Y<Q;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const r=new k,s=new k,a=new k,o=new k,l=new k,c=new k,u=new k,d=new k;if(e)for(let f=0,h=e.count;f<h;f+=3){const p=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?h=l[x]*o.data.stride+o.offset:h=l[x]*u;for(let m=0;m<u;m++)f[p++]=c[h++]}return new _n(f,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Kf=0;class Yr extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=lr,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=Ja,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(i.blending=this.blending),this.side!==fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ja&&(i.blendDst=this.blendDst),this.blendEquation!==bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new qe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kn=new k,wa=new k,hs=new k,ri=new k,Ra=new k,ps=new k,Ca=new k;class Du{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){wa.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(wa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(hs),o=ri.dot(this.direction),l=-ri.dot(hs),c=ri.lengthSq(),u=Math.abs(1-a*a);let d,f,h,p;if(u>0)if(d=a*l-o,f=a*o-l,p=s*u,d>=0)if(f>=-p)if(f<=p){const x=1/u;d*=x,f*=x,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-p?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=p?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(wa).addScaledVector(hs,f),h}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const i=kn.dot(this.direction),r=kn.dot(kn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,i,r,s){Ra.subVectors(t,e),ps.subVectors(i,e),Ca.crossVectors(Ra,ps);let a=this.direction.dot(Ca),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ri.subVectors(this.origin,e);const l=o*this.direction.dot(ps.crossVectors(ri,ps));if(l<0)return null;const c=o*this.direction.dot(Ra.cross(ri));if(c<0||l+c>a)return null;const u=-o*ri.dot(Ca);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kr extends Yr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=pu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rc=new dt,_i=new Du,ms=new qr,sc=new k,gs=new k,vs=new k,_s=new k,Pa=new k,xs=new k,ac=new k,Ms=new k;class Pt extends Dt{constructor(e=new xn,t=new Kr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){xs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Pa.fromBufferAttribute(d,e),a?xs.addScaledVector(Pa,u):xs.addScaledVector(Pa.sub(t),u))}t.add(xs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ms.copy(i.boundingSphere),ms.applyMatrix4(s),_i.copy(e.ray).recast(e.near),!(ms.containsPoint(_i.origin)===!1&&(_i.intersectSphere(ms,sc)===null||_i.origin.distanceToSquared(sc)>(e.far-e.near)**2))&&(rc.copy(s).invert(),_i.copy(e.ray).applyMatrix4(rc),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){const g=f[p],m=a[g.materialIndex],A=Math.max(g.start,h.start),C=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let b=A,w=C;b<w;b+=3){const T=o.getX(b),R=o.getX(b+1),_=o.getX(b+2);r=bs(this,m,e,i,c,u,d,T,R,_),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){const A=o.getX(g),C=o.getX(g+1),b=o.getX(g+2);r=bs(this,a,e,i,c,u,d,A,C,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){const g=f[p],m=a[g.materialIndex],A=Math.max(g.start,h.start),C=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let b=A,w=C;b<w;b+=3){const T=b,R=b+1,_=b+2;r=bs(this,m,e,i,c,u,d,T,R,_),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){const A=g,C=g+1,b=g+2;r=bs(this,a,e,i,c,u,d,A,C,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Zf(n,e,t,i,r,s,a,o){let l;if(e.side===Yt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===fi,o),l===null)return null;Ms.copy(o),Ms.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ms);return c<t.near||c>t.far?null:{distance:c,point:Ms.clone(),object:n}}function bs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,gs),n.getVertexPosition(l,vs),n.getVertexPosition(c,_s);const u=Zf(n,e,t,i,gs,vs,_s,ac);if(u){const d=new k;hn.getBarycoord(ac,gs,vs,_s,d),r&&(u.uv=hn.getInterpolatedAttribute(r,o,l,c,d,new qe)),s&&(u.uv1=hn.getInterpolatedAttribute(s,o,l,c,d,new qe)),a&&(u.normal=hn.getInterpolatedAttribute(a,o,l,c,d,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new k,materialIndex:0};hn.getNormal(gs,vs,_s,f.normal),u.face=f,u.barycoord=d}return u}class hl extends Gt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Lt,u=Lt,d,f){super(null,a,o,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oc extends _n{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qi=new dt,lc=new dt,ys=[],cc=new Fi,Jf=new dt,Ar=new Pt,wr=new qr;class Uu extends Pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Jf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Qi),cc.copy(e.boundingBox).applyMatrix4(Qi),this.boundingBox.union(cc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Qi),wr.copy(e.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(i),e.ray.intersectsSphere(wr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Qi),lc.multiplyMatrices(i,Qi),Ar.matrixWorld=lc,Ar.raycast(e,ys);for(let a=0,o=ys.length;a<o;a++){const l=ys[a];l.instanceId=s,l.object=this,t.push(l)}ys.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new oc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new hl(new Float32Array(r*this.count),r,this.count,sl,mn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ia=new k,Qf=new k,jf=new Fe;class Mi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ia.subVectors(i,t).cross(Qf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ia),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||jf.getNormalMatrix(e),r=this.coplanarPoint(Ia).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new qr,eh=new qe(.5,.5),Ss=new k;class pl{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Cn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],p=s[8],x=s[9],g=s[10],m=s[11],A=s[12],C=s[13],b=s[14],w=s[15];if(r[0].setComponents(c-a,h-u,m-p,w-A).normalize(),r[1].setComponents(c+a,h+u,m+p,w+A).normalize(),r[2].setComponents(c+o,h+d,m+x,w+C).normalize(),r[3].setComponents(c-o,h-d,m-x,w-C).normalize(),i)r[4].setComponents(l,f,g,b).normalize(),r[5].setComponents(c-l,h-f,m-g,w-b).normalize();else if(r[4].setComponents(c-l,h-f,m-g,w-b).normalize(),t===Cn)r[5].setComponents(c+l,h+f,m+g,w+b).normalize();else if(t===Vr)r[5].setComponents(l,f,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){xi.center.set(0,0,0);const t=eh.distanceTo(e.center);return xi.radius=.7071067811865476+t,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ss.x=r.normal.x>0?e.max.x:e.min.x,Ss.y=r.normal.y>0?e.max.y:e.min.y,Ss.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nu extends Gt{constructor(e=[],t=Li,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hr extends Gt{constructor(e,t,i=Ln,r,s,a,o=Lt,l=Lt,c,u=$n,d=1){if(u!==$n&&u!==Ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class th extends hr{constructor(e,t=Ln,i=Li,r,s,a=Lt,o=Lt,l,c=$n){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Fu extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class _r extends xn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,h=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(d,2));function p(x,g,m,A,C,b,w,T,R,_,E){const D=b/R,P=w/_,F=b/2,Y=w/2,Q=T/2,B=R+1,J=_+1;let V=0,ne=0;const se=new k;for(let ce=0;ce<J;ce++){const $=ce*P-Y;for(let q=0;q<B;q++){const ye=q*D-F;se[x]=ye*A,se[g]=$*C,se[m]=Q,c.push(se.x,se.y,se.z),se[x]=0,se[g]=0,se[m]=T>0?1:-1,u.push(se.x,se.y,se.z),d.push(q/R),d.push(1-ce/_),V+=1}}for(let ce=0;ce<_;ce++)for(let $=0;$<R;$++){const q=f+$+B*ce,ye=f+$+B*(ce+1),Le=f+($+1)+B*(ce+1),Ce=f+($+1)+B*ce;l.push(q,ye,Ce),l.push(ye,Le,Ce),ne+=6}o.addGroup(h,ne,E),h+=ne,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ys extends xn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],h=[];let p=0;const x=[],g=i/2;let m=0;A(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ht(d,3)),this.setAttribute("normal",new Ht(f,3)),this.setAttribute("uv",new Ht(h,2));function A(){const b=new k,w=new k;let T=0;const R=(t-e)/i;for(let _=0;_<=s;_++){const E=[],D=_/s,P=D*(t-e)+e;for(let F=0;F<=r;F++){const Y=F/r,Q=Y*l+o,B=Math.sin(Q),J=Math.cos(Q);w.x=P*B,w.y=-D*i+g,w.z=P*J,d.push(w.x,w.y,w.z),b.set(B,R,J).normalize(),f.push(b.x,b.y,b.z),h.push(Y,1-D),E.push(p++)}x.push(E)}for(let _=0;_<r;_++)for(let E=0;E<s;E++){const D=x[E][_],P=x[E+1][_],F=x[E+1][_+1],Y=x[E][_+1];(e>0||E!==0)&&(u.push(D,P,Y),T+=3),(t>0||E!==s-1)&&(u.push(P,F,Y),T+=3)}c.addGroup(m,T,0),m+=T}function C(b){const w=p,T=new qe,R=new k;let _=0;const E=b===!0?e:t,D=b===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,g*D,0),f.push(0,D,0),h.push(.5,.5),p++;const P=p;for(let F=0;F<=r;F++){const Q=F/r*l+o,B=Math.cos(Q),J=Math.sin(Q);R.x=E*J,R.y=g*D,R.z=E*B,d.push(R.x,R.y,R.z),f.push(0,D,0),T.x=B*.5+.5,T.y=J*.5*D+.5,h.push(T.x,T.y),p++}for(let F=0;F<r;F++){const Y=w+F,Q=P+F;b===!0?u.push(Q,Q+1,Y):u.push(Q+1,Q,Y),_+=3}c.addGroup(m,_,b===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ks extends Ys{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ks(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xr extends xn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,d=e/o,f=t/l,h=[],p=[],x=[],g=[];for(let m=0;m<u;m++){const A=m*f-a;for(let C=0;C<c;C++){const b=C*d-s;p.push(b,-A,0),x.push(0,0,1),g.push(C/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let A=0;A<o;A++){const C=A+c*m,b=A+c*(m+1),w=A+1+c*(m+1),T=A+1+c*m;h.push(C,b,T),h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ws extends xn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new k,f=new k,h=[],p=[],x=[],g=[];for(let m=0;m<=i;m++){const A=[],C=m/i,b=a+C*o,w=e*Math.cos(b),T=Math.sqrt(e*e-w*w);let R=0;m===0&&a===0?R=.5/t:m===i&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const E=_/t,D=r+E*s;d.x=-T*Math.cos(D),d.y=w,d.z=T*Math.sin(D),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(E+R,1-C),A.push(c++)}u.push(A)}for(let m=0;m<i;m++)for(let A=0;A<t;A++){const C=u[m][A+1],b=u[m][A],w=u[m+1][A],T=u[m+1][A+1];(m!==0||a>0)&&h.push(C,b,T),(m!==i-1||l<Math.PI)&&h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function pr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(uc(r))r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(uc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Bt(n){const e={};for(let t=0;t<n.length;t++){const i=pr(n[t]);for(const r in i)e[r]=i[r]}return e}function uc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function nh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ou(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const ih={clone:pr,merge:Bt};var rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends Yr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rh,this.fragmentShader=sh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pr(e.uniforms),this.uniformsGroups=nh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new qe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new k().fromArray(r.value);break;case"v4":this.uniforms[i].value=new pt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Fe().fromArray(r.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ah extends Dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bt extends Yr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oo,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class oh extends Yr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lh extends Yr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ku extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class ch extends ku{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const La=new dt,dc=new k,fc=new k;class uh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.mapType=jt,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pl,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;dc.setFromMatrixPosition(e.matrixWorld),t.position.copy(dc),fc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fc),t.updateMatrixWorld(),La.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Vr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(La)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Es=new k,Ts=new vr,Sn=new k;class Bu extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Es,Ts,Sn),Sn.x===1&&Sn.y===1&&Sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Es,Ts,Sn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Es,Ts,Sn),Sn.x===1&&Sn.y===1&&Sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Es,Ts,Sn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const si=new k,hc=new qe,pc=new qe;class fn extends Bu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ko*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(la*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ko*2*Math.atan(Math.tan(la*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,hc,pc),t.subVectors(pc,hc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(la*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Zs extends Bu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class dh extends uh{constructor(){super(new Zs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fh extends ku{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new dh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ji=-90,er=1;class hh extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new fn(ji,er,e,t);r.layers=this.layers,this.add(r);const s=new fn(ji,er,e,t);s.layers=this.layers,this.add(s);const a=new fn(ji,er,e,t);a.layers=this.layers,this.add(a);const o=new fn(ji,er,e,t);o.layers=this.layers,this.add(o);const l=new fn(ji,er,e,t);l.layers=this.layers,this.add(l);const c=new fn(ji,er,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class ph extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const mc=new dt;class mh{constructor(e,t,i=0,r=1/0){this.ray=new Du(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new fl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mc),this}intersectObject(e,t=!0,i=[]){return Bo(e,this,i,t),i.sort(gc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Bo(e[r],this,i,t);return i.sort(gc),i}}function gc(n,e){return n.distance-e.distance}function Bo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Bo(s[a],e,t,!0)}}class zu{static{zu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function vc(n,e,t,i){const r=gh(i);switch(t){case Au:return n*e;case sl:return n*e/r.components*r.byteLength;case al:return n*e/r.components*r.byteLength;case Di:return n*e*2/r.components*r.byteLength;case ol:return n*e*2/r.components*r.byteLength;case wu:return n*e*3/r.components*r.byteLength;case gn:return n*e*4/r.components*r.byteLength;case ll:return n*e*4/r.components*r.byteLength;case Is:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oo:case co:return Math.max(n,16)*Math.max(e,8)/4;case ao:case lo:return Math.max(n,8)*Math.max(e,8)/2;case uo:case fo:case po:case mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ho:case Bs:case go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case vo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case xo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case yo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case So:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case To:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case wo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Co:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Po:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Io:case Lo:case Do:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Uo:case No:return Math.ceil(n/4)*Math.ceil(e/4)*8;case zs:case Fo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gh(n){switch(n){case jt:case yu:return{byteLength:1,components:1};case Gr:case Su:case Xn:return{byteLength:2,components:1};case il:case rl:return{byteLength:2,components:4};case Ln:case nl:case mn:return{byteLength:4,components:1};case Eu:case Tu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function vh(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){const p=d[f],x=d[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){const x=d[h];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var _h=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xh=`#ifdef USE_ALPHAHASH
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
#endif`,Mh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eh=`#ifdef USE_AOMAP
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
#endif`,Th=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ah=`#ifdef USE_BATCHING
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
#endif`,wh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ch=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ph=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ih=`#ifdef USE_IRIDESCENCE
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
#endif`,Lh=`#ifdef USE_BUMPMAP
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
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Oh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gh=`#define PI 3.141592653589793
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
} // validated`,Hh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vh=`vec3 transformedNormal = objectNormal;
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
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$h=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Qh=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ip=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sp=`#ifdef USE_GRADIENTMAP
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
}`,ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,up=`#ifdef USE_ENVMAP
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
#endif`,dp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
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
#endif`,gp=`uniform sampler2D dfgLUT;
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
}`,vp=`
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
#endif`,_p=`#if defined( RE_IndirectDiffuse )
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
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ep=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rp=`#if defined( USE_POINTS_UV )
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
#endif`,Cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`#ifdef USE_MORPHTARGETS
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
#endif`,Np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Op=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gp=`#ifdef USE_NORMALMAP
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
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,im=`float getShadowMask() {
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
}`,rm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
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
#endif`,am=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,om=`#ifdef USE_SKINNING
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
#endif`,lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,um=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fm=`#ifdef USE_TRANSMISSION
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
#endif`,hm=`#ifdef USE_TRANSMISSION
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
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xm=`uniform sampler2D t2D;
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
}`,Mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`#include <common>
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
}`,Tm=`#if DEPTH_PACKING == 3200
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
}`,Am=`#define DISTANCE
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
}`,wm=`#define DISTANCE
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
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`uniform float scale;
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
}`,Im=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Um=`#define LAMBERT
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
}`,Nm=`#define LAMBERT
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
}`,Fm=`#define MATCAP
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
}`,Om=`#define MATCAP
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
}`,km=`#define NORMAL
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
}`,Bm=`#define NORMAL
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
}`,zm=`#define PHONG
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
}`,Gm=`#define PHONG
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
}`,Hm=`#define STANDARD
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
}`,Vm=`#define STANDARD
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
}`,Wm=`#define TOON
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
}`,Xm=`#define TOON
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
}`,$m=`uniform float size;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,Km=`uniform vec3 color;
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
}`,Zm=`uniform float rotation;
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
}`,Jm=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:_h,alphahash_pars_fragment:xh,alphamap_fragment:Mh,alphamap_pars_fragment:bh,alphatest_fragment:yh,alphatest_pars_fragment:Sh,aomap_fragment:Eh,aomap_pars_fragment:Th,batching_pars_vertex:Ah,batching_vertex:wh,begin_vertex:Rh,beginnormal_vertex:Ch,bsdfs:Ph,iridescence_fragment:Ih,bumpmap_pars_fragment:Lh,clipping_planes_fragment:Dh,clipping_planes_pars_fragment:Uh,clipping_planes_pars_vertex:Nh,clipping_planes_vertex:Fh,color_fragment:Oh,color_pars_fragment:kh,color_pars_vertex:Bh,color_vertex:zh,common:Gh,cube_uv_reflection_fragment:Hh,defaultnormal_vertex:Vh,displacementmap_pars_vertex:Wh,displacementmap_vertex:Xh,emissivemap_fragment:$h,emissivemap_pars_fragment:qh,colorspace_fragment:Yh,colorspace_pars_fragment:Kh,envmap_fragment:Zh,envmap_common_pars_fragment:Jh,envmap_pars_fragment:Qh,envmap_pars_vertex:jh,envmap_physical_pars_fragment:up,envmap_vertex:ep,fog_vertex:tp,fog_pars_vertex:np,fog_fragment:ip,fog_pars_fragment:rp,gradientmap_pars_fragment:sp,lightmap_pars_fragment:ap,lights_lambert_fragment:op,lights_lambert_pars_fragment:lp,lights_pars_begin:cp,lights_toon_fragment:dp,lights_toon_pars_fragment:fp,lights_phong_fragment:hp,lights_phong_pars_fragment:pp,lights_physical_fragment:mp,lights_physical_pars_fragment:gp,lights_fragment_begin:vp,lights_fragment_maps:_p,lights_fragment_end:xp,lightprobes_pars_fragment:Mp,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:Sp,logdepthbuf_vertex:Ep,map_fragment:Tp,map_pars_fragment:Ap,map_particle_fragment:wp,map_particle_pars_fragment:Rp,metalnessmap_fragment:Cp,metalnessmap_pars_fragment:Pp,morphinstance_vertex:Ip,morphcolor_vertex:Lp,morphnormal_vertex:Dp,morphtarget_pars_vertex:Up,morphtarget_vertex:Np,normal_fragment_begin:Fp,normal_fragment_maps:Op,normal_pars_fragment:kp,normal_pars_vertex:Bp,normal_vertex:zp,normalmap_pars_fragment:Gp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Wp,iridescence_pars_fragment:Xp,opaque_fragment:$p,packing:qp,premultiplied_alpha_fragment:Yp,project_vertex:Kp,dithering_fragment:Zp,dithering_pars_fragment:Jp,roughnessmap_fragment:Qp,roughnessmap_pars_fragment:jp,shadowmap_pars_fragment:em,shadowmap_pars_vertex:tm,shadowmap_vertex:nm,shadowmask_pars_fragment:im,skinbase_vertex:rm,skinning_pars_vertex:sm,skinning_vertex:am,skinnormal_vertex:om,specularmap_fragment:lm,specularmap_pars_fragment:cm,tonemapping_fragment:um,tonemapping_pars_fragment:dm,transmission_fragment:fm,transmission_pars_fragment:hm,uv_pars_fragment:pm,uv_pars_vertex:mm,uv_vertex:gm,worldpos_vertex:vm,background_vert:_m,background_frag:xm,backgroundCube_vert:Mm,backgroundCube_frag:bm,cube_vert:ym,cube_frag:Sm,depth_vert:Em,depth_frag:Tm,distance_vert:Am,distance_frag:wm,equirect_vert:Rm,equirect_frag:Cm,linedashed_vert:Pm,linedashed_frag:Im,meshbasic_vert:Lm,meshbasic_frag:Dm,meshlambert_vert:Um,meshlambert_frag:Nm,meshmatcap_vert:Fm,meshmatcap_frag:Om,meshnormal_vert:km,meshnormal_frag:Bm,meshphong_vert:zm,meshphong_frag:Gm,meshphysical_vert:Hm,meshphysical_frag:Vm,meshtoon_vert:Wm,meshtoon_frag:Xm,points_vert:$m,points_frag:qm,shadow_vert:Ym,shadow_frag:Km,sprite_vert:Zm,sprite_frag:Jm},me={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Rn={basic:{uniforms:Bt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Bt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Bt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Bt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Bt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Bt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Bt([me.points,me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Bt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Bt([me.common,me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Bt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Bt([me.sprite,me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Bt([me.common,me.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Bt([me.lights,me.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Rn.physical={uniforms:Bt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const As={r:0,b:0,g:0},Qm=new dt,Hu=new Fe;Hu.set(-1,0,0,0,1,0,0,0,1);function jm(n,e,t,i,r,s){const a=new Je(0);let o=r===!0?0:1,l,c,u=null,d=0,f=null;function h(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){const b=A.backgroundBlurriness>0;C=e.get(C,b)}return C}function p(A){let C=!1;const b=h(A);b===null?g(a,o):b&&b.isColor&&(g(b,1),C=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(A,C){const b=h(C);b&&(b.isCubeTexture||b.mapping===qs)?(c===void 0&&(c=new Pt(new _r(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:pr(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qm.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Hu),c.material.toneMapped=Ye.getTransfer(b.colorSpace)!==at,(u!==b||d!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Pt(new xr(2,2),new Dn({name:"BackgroundMaterial",uniforms:pr(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(b.colorSpace)!==at,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function g(A,C){A.getRGB(As,Ou(n)),t.buffers.color.setClear(As.r,As.g,As.b,C,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,g(a,o)},render:p,addToRenderList:x,dispose:m}}function e0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(P,F,Y,Q,B){let J=!1;const V=d(P,Q,Y,F);s!==V&&(s=V,c(s.object)),J=h(P,Q,Y,B),J&&p(P,Q,Y,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,b(P,F,Y,Q),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function d(P,F,Y,Q){const B=Q.wireframe===!0;let J=i[F.id];J===void 0&&(J={},i[F.id]=J);const V=P.isInstancedMesh===!0?P.id:0;let ne=J[V];ne===void 0&&(ne={},J[V]=ne);let se=ne[Y.id];se===void 0&&(se={},ne[Y.id]=se);let ce=se[B];return ce===void 0&&(ce=f(l()),se[B]=ce),ce}function f(P){const F=[],Y=[],Q=[];for(let B=0;B<t;B++)F[B]=0,Y[B]=0,Q[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Y,attributeDivisors:Q,object:P,attributes:{},index:null}}function h(P,F,Y,Q){const B=s.attributes,J=F.attributes;let V=0;const ne=Y.getAttributes();for(const se in ne)if(ne[se].location>=0){const $=B[se];let q=J[se];if(q===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),$===void 0||$.attribute!==q||q&&$.data!==q.data)return!0;V++}return s.attributesNum!==V||s.index!==Q}function p(P,F,Y,Q){const B={},J=F.attributes;let V=0;const ne=Y.getAttributes();for(const se in ne)if(ne[se].location>=0){let $=J[se];$===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&($=P.instanceColor));const q={};q.attribute=$,$&&$.data&&(q.data=$.data),B[se]=q,V++}s.attributes=B,s.attributesNum=V,s.index=Q}function x(){const P=s.newAttributes;for(let F=0,Y=P.length;F<Y;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const Y=s.newAttributes,Q=s.enabledAttributes,B=s.attributeDivisors;Y[P]=1,Q[P]===0&&(n.enableVertexAttribArray(P),Q[P]=1),B[P]!==F&&(n.vertexAttribDivisor(P,F),B[P]=F)}function A(){const P=s.newAttributes,F=s.enabledAttributes;for(let Y=0,Q=F.length;Y<Q;Y++)F[Y]!==P[Y]&&(n.disableVertexAttribArray(Y),F[Y]=0)}function C(P,F,Y,Q,B,J,V){V===!0?n.vertexAttribIPointer(P,F,Y,B,J):n.vertexAttribPointer(P,F,Y,Q,B,J)}function b(P,F,Y,Q){x();const B=Q.attributes,J=Y.getAttributes(),V=F.defaultAttributeValues;for(const ne in J){const se=J[ne];if(se.location>=0){let ce=B[ne];if(ce===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),ce!==void 0){const $=ce.normalized,q=ce.itemSize,ye=e.get(ce);if(ye===void 0)continue;const Le=ye.buffer,Ce=ye.type,W=ye.bytesPerElement,re=Ce===n.INT||Ce===n.UNSIGNED_INT||ce.gpuType===nl;if(ce.isInterleavedBufferAttribute){const te=ce.data,he=te.stride,Oe=ce.offset;if(te.isInstancedInterleavedBuffer){for(let De=0;De<se.locationSize;De++)m(se.location+De,te.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let De=0;De<se.locationSize;De++)g(se.location+De);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let De=0;De<se.locationSize;De++)C(se.location+De,q/se.locationSize,Ce,$,he*W,(Oe+q/se.locationSize*De)*W,re)}else{if(ce.isInstancedBufferAttribute){for(let te=0;te<se.locationSize;te++)m(se.location+te,ce.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let te=0;te<se.locationSize;te++)g(se.location+te);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let te=0;te<se.locationSize;te++)C(se.location+te,q/se.locationSize,Ce,$,q*W,q/se.locationSize*te*W,re)}}else if(V!==void 0){const $=V[ne];if($!==void 0)switch($.length){case 2:n.vertexAttrib2fv(se.location,$);break;case 3:n.vertexAttrib3fv(se.location,$);break;case 4:n.vertexAttrib4fv(se.location,$);break;default:n.vertexAttrib1fv(se.location,$)}}}}A()}function w(){E();for(const P in i){const F=i[P];for(const Y in F){const Q=F[Y];for(const B in Q){const J=Q[B];for(const V in J)u(J[V].object),delete J[V];delete Q[B]}}delete i[P]}}function T(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const Y in F){const Q=F[Y];for(const B in Q){const J=Q[B];for(const V in J)u(J[V].object),delete J[V];delete Q[B]}}delete i[P.id]}function R(P){for(const F in i){const Y=i[F];for(const Q in Y){const B=Y[Q];if(B[P.id]===void 0)continue;const J=B[P.id];for(const V in J)u(J[V].object),delete J[V];delete B[P.id]}}}function _(P){for(const F in i){const Y=i[F],Q=P.isInstancedMesh===!0?P.id:0,B=Y[Q];if(B!==void 0){for(const J in B){const V=B[J];for(const ne in V)u(V[ne].object),delete V[ne];delete B[J]}delete Y[Q],Object.keys(Y).length===0&&delete i[F]}}}function E(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:A}}function t0(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function n0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==jt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==mn&&!_)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ne("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:b,maxSamples:w,samples:T}}function i0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Mi,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const A=s?0:i,C=A*4;let b=m.clippingState||null;l.value=b,b=u(p,f,C,h);for(let w=0;w!==C;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,p){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=l.value,p!==!0||g===null){const m=h+x*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(g===null||g.length<m)&&(g=new Float32Array(m));for(let C=0,b=h;C!==x;++C,b+=4)a.copy(d[C]).applyMatrix4(A,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const ci=4,_c=[.125,.215,.35,.446,.526,.582],yi=20,r0=256,Rr=new Zs,xc=new Je;let Da=null,Ua=0,Na=0,Fa=!1;const s0=new k;class Mc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=s0}=s;Da=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Da,Ua,Na),this._renderer.xr.enabled=Fa,e.scissorTest=!1,tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===fr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Da=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Xn,format:gn,colorSpace:Gs,depthBuffer:!1},r=bc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=a0(s)),this._blurMaterial=l0(s,e,t),this._ggxMaterial=o0(s,e,t)}return r}_compileMaterial(e){const t=new Pt(new xn,e);this._renderer.compile(t,Rr)}_sceneToCubeUV(e,t,i,r,s){const l=new fn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(xc),d.toneMapping=Pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new _r,new Kr({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const A=e.background;A?A.isColor&&(g.color.copy(A),e.background=null,m=!0):(g.color.copy(xc),m=!0);for(let C=0;C<6;C++){const b=C%3;b===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):b===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const w=this._cubeSize;tr(r,b*w,C>2?w:0,w,w),d.setRenderTarget(r),m&&d.render(x,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Li||e.mapping===fr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;tr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Rr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,h=d*f,{_lodMax:p}=this,x=this._sizeLods[i],g=3*x*(i>p-ci?i-p+ci:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,tr(s,g,m,3*x,2*x),r.setRenderTarget(s),r.render(o,Rr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,tr(e,g,m,3*x,2*x),r.setRenderTarget(e),r.render(o,Rr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*yi-1),x=s/p,g=isFinite(s)?1+Math.floor(u*x):yi;g>yi&&Ne(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${yi}`);const m=[];let A=0;for(let R=0;R<yi;++R){const _=R/x,E=Math.exp(-_*_/2);m.push(E),R===0?A+=E:R<g&&(A+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/A;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:C}=this;f.dTheta.value=p,f.mipInt.value=C-i;const b=this._sizeLods[r],w=3*b*(r>C-ci?r-C+ci:0),T=4*(this._cubeSize-b);tr(t,w,T,3*b,2*b),l.setRenderTarget(t),l.render(d,Rr)}}function a0(n){const e=[],t=[],i=[];let r=n;const s=n-ci+1+_c.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ci?l=_c[a-n+ci-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,p=6,x=3,g=2,m=1,A=new Float32Array(x*p*h),C=new Float32Array(g*p*h),b=new Float32Array(m*p*h);for(let T=0;T<h;T++){const R=T%3*2/3-1,_=T>2?0:-1,E=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];A.set(E,x*p*T),C.set(f,g*p*T);const D=[T,T,T,T,T,T];b.set(D,m*p*T)}const w=new xn;w.setAttribute("position",new _n(A,x)),w.setAttribute("uv",new _n(C,g)),w.setAttribute("faceIndex",new _n(b,m)),i.push(new Pt(w,null)),r>ci&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function bc(n,e,t){const i=new In(n,e,t);return i.texture.mapping=qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function tr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function o0(n,e,t){return new Dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:r0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function l0(n,e,t){const i=new Float32Array(yi),r=new k(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function yc(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Sc(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Js(){return`

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
	`}class Vu extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Nu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new _r(5,5,5),s=new Dn({name:"CubemapFromEquirect",uniforms:pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:Vn});s.uniforms.tEquirect.value=t;const a=new Pt(r,s),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=Ot),new hh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function c0(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?a(f):s(f)}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===sa||h===aa)if(e.has(f)){const p=e.get(f).texture;return o(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const x=new Vu(p.height);return x.fromEquirectangularTexture(n,f),e.set(f,x),f.addEventListener("dispose",c),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const h=f.mapping,p=h===sa||h===aa,x=h===Li||h===fr;if(p||x){let g=t.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Mc(n)),g=p?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const A=f.image;return p&&A&&A.height>0||x&&A&&l(A)?(i===null&&(i=new Mc(n)),g=p?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,h){return h===sa?f.mapping=Li:h===aa&&(f.mapping=fr),f}function l(f){let h=0;const p=6;for(let x=0;x<p;x++)f[x]!==void 0&&h++;return h===p}function c(f){const h=f.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function u0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&cr("WebGLRenderer: "+i+" extension not supported."),r}}}function d0(n,e,t,i){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete r[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,p=d.attributes.position;let x=0;if(p===void 0)return;if(h!==null){const A=h.array;x=h.version;for(let C=0,b=A.length;C<b;C+=3){const w=A[C+0],T=A[C+1],R=A[C+2];f.push(w,T,T,R,R,w)}}else{const A=p.array;x=p.version;for(let C=0,b=A.length/3-1;C<b;C+=3){const w=C+0,T=C+1,R=C+2;f.push(w,T,T,R,R,w)}}const g=new(p.count>=65535?Lu:Iu)(f,1);g.version=x;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function f0(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*a),t.update(f,i,1)}function c(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*a,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let x=0;for(let g=0;g<h;g++)x+=f[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function h0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function p0(n,e,t){const i=new WeakMap,r=new pt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let D=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var h=D;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),x===!0&&(b=2),g===!0&&(b=3);let w=o.attributes.position.count*b,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*T*4*d),_=new Cu(R,w,T,d);_.type=mn,_.needsUpdate=!0;const E=b*4;for(let P=0;P<d;P++){const F=m[P],Y=A[P],Q=C[P],B=w*T*4*P;for(let J=0;J<F.count;J++){const V=J*E;p===!0&&(r.fromBufferAttribute(F,J),R[B+V+0]=r.x,R[B+V+1]=r.y,R[B+V+2]=r.z,R[B+V+3]=0),x===!0&&(r.fromBufferAttribute(Y,J),R[B+V+4]=r.x,R[B+V+5]=r.y,R[B+V+6]=r.z,R[B+V+7]=0),g===!0&&(r.fromBufferAttribute(Q,J),R[B+V+8]=r.x,R[B+V+9]=r.y,R[B+V+10]=r.z,R[B+V+11]=Q.itemSize===4?r.w:1)}}f={count:d,texture:_,size:new qe(w,T)},i.set(o,f),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function m0(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const g0={[mu]:"LINEAR_TONE_MAPPING",[gu]:"REINHARD_TONE_MAPPING",[vu]:"CINEON_TONE_MAPPING",[tl]:"ACES_FILMIC_TONE_MAPPING",[xu]:"AGX_TONE_MAPPING",[Mu]:"NEUTRAL_TONE_MAPPING",[_u]:"CUSTOM_TONE_MAPPING"};function v0(n,e,t,i,r,s){const a=new In(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new hr(e,t):void 0}),o=new In(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new xn;l.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ht([0,2,0,0,2,0],2));const c=new ah({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Pt(l,c),d=new Zs(-1,1,1,-1,0,1);let f=null,h=null,p=!1,x,g=null,m=[],A=!1;this.setSize=function(C,b){a.setSize(C,b),o.setSize(C,b);for(let w=0;w<m.length;w++){const T=m[w];T.setSize&&T.setSize(C,b)}},this.setEffects=function(C){m=C,A=m.length>0&&m[0].isRenderPass===!0;const b=a.width,w=a.height;for(let T=0;T<m.length;T++){const R=m[T];R.setSize&&R.setSize(b,w)}},this.begin=function(C,b){if(p||C.toneMapping===Pn&&m.length===0)return!1;if(g=b,b!==null){const w=b.width,T=b.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return A===!1&&C.setRenderTarget(a),x=C.toneMapping,C.toneMapping=Pn,!0},this.hasRenderPass=function(){return A},this.end=function(C,b){C.toneMapping=x,p=!0;let w=a,T=o;for(let R=0;R<m.length;R++){const _=m[R];if(_.enabled!==!1&&(_.render(C,T,w,b),_.needsSwap!==!1)){const E=w;w=T,T=E}}if(f!==C.outputColorSpace||h!==C.toneMapping){f=C.outputColorSpace,h=C.toneMapping,c.defines={},Ye.getTransfer(f)===at&&(c.defines.SRGB_TRANSFER="");const R=g0[h];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,C.setRenderTarget(g),C.render(u,d),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Wu=new Gt,zo=new hr(1,1),Xu=new Cu,$u=new Of,qu=new Nu,Ec=[],Tc=[],Ac=new Float32Array(16),wc=new Float32Array(9),Rc=new Float32Array(4);function Mr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ec[r];if(s===void 0&&(s=new Float32Array(r),Ec[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qs(n,e){let t=Tc[e];t===void 0&&(t=new Int32Array(e),Tc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function _0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function b0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function y0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;Rc.set(i),n.uniformMatrix2fv(this.addr,!1,Rc),wt(t,i)}}function S0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;wc.set(i),n.uniformMatrix3fv(this.addr,!1,wc),wt(t,i)}}function E0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(At(t,i))return;Ac.set(i),n.uniformMatrix4fv(this.addr,!1,Ac),wt(t,i)}}function T0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function w0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function R0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function C0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function P0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function I0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function L0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function D0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(zo.compareFunction=t.isReversedDepthBuffer()?ul:cl,s=zo):s=Wu,t.setTexture2D(e||s,r)}function U0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$u,r)}function N0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||qu,r)}function F0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Xu,r)}function O0(n){switch(n){case 5126:return _0;case 35664:return x0;case 35665:return M0;case 35666:return b0;case 35674:return y0;case 35675:return S0;case 35676:return E0;case 5124:case 35670:return T0;case 35667:case 35671:return A0;case 35668:case 35672:return w0;case 35669:case 35673:return R0;case 5125:return C0;case 36294:return P0;case 36295:return I0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return U0;case 35680:case 36300:case 36308:case 36293:return N0;case 36289:case 36303:case 36311:case 36292:return F0}}function k0(n,e){n.uniform1fv(this.addr,e)}function B0(n,e){const t=Mr(e,this.size,2);n.uniform2fv(this.addr,t)}function z0(n,e){const t=Mr(e,this.size,3);n.uniform3fv(this.addr,t)}function G0(n,e){const t=Mr(e,this.size,4);n.uniform4fv(this.addr,t)}function H0(n,e){const t=Mr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function V0(n,e){const t=Mr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function W0(n,e){const t=Mr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function X0(n,e){n.uniform1iv(this.addr,e)}function $0(n,e){n.uniform2iv(this.addr,e)}function q0(n,e){n.uniform3iv(this.addr,e)}function Y0(n,e){n.uniform4iv(this.addr,e)}function K0(n,e){n.uniform1uiv(this.addr,e)}function Z0(n,e){n.uniform2uiv(this.addr,e)}function J0(n,e){n.uniform3uiv(this.addr,e)}function Q0(n,e){n.uniform4uiv(this.addr,e)}function j0(n,e,t){const i=this.cache,r=e.length,s=Qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=zo:a=Wu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function eg(n,e,t){const i=this.cache,r=e.length,s=Qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||$u,s[a])}function tg(n,e,t){const i=this.cache,r=e.length,s=Qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||qu,s[a])}function ng(n,e,t){const i=this.cache,r=e.length,s=Qs(t,r);At(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Xu,s[a])}function ig(n){switch(n){case 5126:return k0;case 35664:return B0;case 35665:return z0;case 35666:return G0;case 35674:return H0;case 35675:return V0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return $0;case 35668:case 35672:return q0;case 35669:case 35673:return Y0;case 5125:return K0;case 36294:return Z0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ng}}class rg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=O0(t.type)}}class sg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ig(t.type)}}class ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function Cc(n,e){n.seq.push(e),n.map[e.id]=e}function og(n,e,t){const i=n.name,r=i.length;for(Oa.lastIndex=0;;){const s=Oa.exec(i),a=Oa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Cc(t,c===void 0?new rg(o,n,e):new sg(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new ag(o),Cc(t,d)),t=d}}}class Ns{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);og(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Pc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const lg=37297;let cg=0;function ug(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ic=new Fe;function dg(n){Ye._getMatrix(Ic,Ye.workingColorSpace,n);const e=`mat3( ${Ic.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case Hs:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Lc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+ug(n.getShaderSource(e),o)}else return s}function fg(n,e){const t=dg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const hg={[mu]:"Linear",[gu]:"Reinhard",[vu]:"Cineon",[tl]:"ACESFilmic",[xu]:"AgX",[Mu]:"Neutral",[_u]:"Custom"};function pg(n,e){const t=hg[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ws=new k;function mg(){Ye.getLuminanceCoefficients(ws);const n=ws.x.toFixed(4),e=ws.y.toFixed(4),t=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function vg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _g(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lr(n){return n!==""}function Dc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Go(n){return n.replace(xg,bg)}const Mg=new Map;function bg(n,e){let t=Ge[e];if(t===void 0){const i=Mg.get(e);if(i!==void 0)t=Ge[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Go(t)}const yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nc(n){return n.replace(yg,Sg)}function Sg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Fc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Eg={[Ps]:"SHADOWMAP_TYPE_PCF",[Ir]:"SHADOWMAP_TYPE_VSM"};function Tg(n){return Eg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ag={[Li]:"ENVMAP_TYPE_CUBE",[fr]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE_UV"};function wg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Ag[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Rg={[fr]:"ENVMAP_MODE_REFRACTION"};function Cg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Rg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Pg={[pu]:"ENVMAP_BLENDING_MULTIPLY",[gf]:"ENVMAP_BLENDING_MIX",[vf]:"ENVMAP_BLENDING_ADD"};function Ig(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Pg[n.combine]||"ENVMAP_BLENDING_NONE"}function Lg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Dg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Tg(t),c=wg(t),u=Cg(t),d=Ig(t),f=Lg(t),h=gg(t),p=vg(s),x=r.createProgram();let g,m,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(g=[Fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[Fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Pn?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,fg("linearToOutputTexel",t.outputColorSpace),mg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),a=Go(a),a=Dc(a,t),a=Uc(a,t),o=Go(o),o=Dc(o,t),o=Uc(o,t),a=Nc(a),o=Nc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const C=A+g+a,b=A+m+o,w=Pc(r,r.VERTEX_SHADER,C),T=Pc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,w),r.attachShader(x,T),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(P){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(x)||"",Y=r.getShaderInfoLog(w)||"",Q=r.getShaderInfoLog(T)||"",B=F.trim(),J=Y.trim(),V=Q.trim();let ne=!0,se=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,w,T);else{const ce=Lc(r,w,"vertex"),$=Lc(r,T,"fragment");Ze("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+ce+`
`+$)}else B!==""?Ne("WebGLProgram: Program Info Log:",B):(J===""||V==="")&&(se=!1);se&&(P.diagnostics={runnable:ne,programLog:B,vertexShader:{log:J,prefix:g},fragmentShader:{log:V,prefix:m}})}r.deleteShader(w),r.deleteShader(T),_=new Ns(r,x),E=_g(r,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(x,lg)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let Ug=0;class Ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Fg(e),t.set(e,i)),i}}class Fg{constructor(e){this.id=Ug++,this.code=e,this.usedTimes=0}}function Og(n){return n===Di||n===Bs||n===zs}function kg(n,e,t,i,r,s){const a=new fl,o=new Ng,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,E,D,P,F,Y){const Q=P.fog,B=F.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ne=e.get(_.envMap||J,V),se=ne&&ne.mapping===qs?ne.image.height:null,ce=h[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&Ne("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const $=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,q=$!==void 0?$.length:0;let ye=0;B.morphAttributes.position!==void 0&&(ye=1),B.morphAttributes.normal!==void 0&&(ye=2),B.morphAttributes.color!==void 0&&(ye=3);let Le,Ce,W,re;if(ce){const Se=Rn[ce];Le=Se.vertexShader,Ce=Se.fragmentShader}else{Le=_.vertexShader,Ce=_.fragmentShader;const Se=o.getVertexShaderStage(_),gt=o.getFragmentShaderStage(_);o.update(_,Se,gt),W=Se.id,re=gt.id}const te=n.getRenderTarget(),he=n.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,De=F.isBatchedMesh===!0,_t=!!_.map,$e=!!_.matcap,lt=!!ne,it=!!_.aoMap,Qe=!!_.lightMap,yt=!!_.bumpMap&&_.wireframe===!1,Tt=!!_.normalMap,Rt=!!_.displacementMap,It=!!_.emissiveMap,mt=!!_.metalnessMap,St=!!_.roughnessMap,U=_.anisotropy>0,Vt=_.clearcoat>0,st=_.dispersion>0,y=_.iridescence>0,v=_.sheen>0,O=_.transmission>0,H=U&&!!_.anisotropyMap,K=Vt&&!!_.clearcoatMap,ae=Vt&&!!_.clearcoatNormalMap,le=Vt&&!!_.clearcoatRoughnessMap,Z=y&&!!_.iridescenceMap,ee=y&&!!_.iridescenceThicknessMap,ue=v&&!!_.sheenColorMap,Ae=v&&!!_.sheenRoughnessMap,pe=!!_.specularMap,de=!!_.specularColorMap,Pe=!!_.specularIntensityMap,Ue=O&&!!_.transmissionMap,ke=O&&!!_.thicknessMap,L=!!_.gradientMap,oe=!!_.alphaMap,j=_.alphaTest>0,fe=!!_.alphaHash,_e=!!_.extensions;let ie=Pn;_.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(ie=n.toneMapping);const Te={shaderID:ce,shaderType:_.type,shaderName:_.name,vertexShader:Le,fragmentShader:Ce,defines:_.defines,customVertexShaderID:W,customFragmentShaderID:re,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:De,batchingColor:De&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:_t,matcap:$e,envMap:lt,envMapMode:lt&&ne.mapping,envMapCubeUVHeight:se,aoMap:it,lightMap:Qe,bumpMap:yt,normalMap:Tt,displacementMap:Rt,emissiveMap:It,normalMapObjectSpace:Tt&&_.normalMapType===Mf,normalMapTangentSpace:Tt&&_.normalMapType===Oo,packedNormalMap:Tt&&_.normalMapType===Oo&&Og(_.normalMap.format),metalnessMap:mt,roughnessMap:St,anisotropy:U,anisotropyMap:H,clearcoat:Vt,clearcoatMap:K,clearcoatNormalMap:ae,clearcoatRoughnessMap:le,dispersion:st,iridescence:y,iridescenceMap:Z,iridescenceThicknessMap:ee,sheen:v,sheenColorMap:ue,sheenRoughnessMap:Ae,specularMap:pe,specularColorMap:de,specularIntensityMap:Pe,transmission:O,transmissionMap:Ue,thicknessMap:ke,gradientMap:L,opaque:_.transparent===!1&&_.blending===lr&&_.alphaToCoverage===!1,alphaMap:oe,alphaTest:j,alphaHash:fe,combine:_.combine,mapUv:_t&&p(_.map.channel),aoMapUv:it&&p(_.aoMap.channel),lightMapUv:Qe&&p(_.lightMap.channel),bumpMapUv:yt&&p(_.bumpMap.channel),normalMapUv:Tt&&p(_.normalMap.channel),displacementMapUv:Rt&&p(_.displacementMap.channel),emissiveMapUv:It&&p(_.emissiveMap.channel),metalnessMapUv:mt&&p(_.metalnessMap.channel),roughnessMapUv:St&&p(_.roughnessMap.channel),anisotropyMapUv:H&&p(_.anisotropyMap.channel),clearcoatMapUv:K&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:ae&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&p(_.sheenRoughnessMap.channel),specularMapUv:pe&&p(_.specularMap.channel),specularColorMapUv:de&&p(_.specularColorMap.channel),specularIntensityMapUv:Pe&&p(_.specularIntensityMap.channel),transmissionMapUv:Ue&&p(_.transmissionMap.channel),thicknessMapUv:ke&&p(_.thicknessMap.channel),alphaMapUv:oe&&p(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||U),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(_t||oe),fog:!!Q,useFog:_.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&Tt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:he,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:ye,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ie,decodeVideoTexture:_t&&_.map.isVideoTexture===!0&&Ye.getTransfer(_.map.colorSpace)===at,decodeVideoTextureEmissive:It&&_.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(_.emissiveMap.colorSpace)===at,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===zn,flipSided:_.side===Yt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:_e&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&_.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function g(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)E.push(D),E.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(m(E,_),A(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function A(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const E=h[_.type];let D;if(E){const P=Rn[E];D=ih.clone(P.uniforms)}else D=_.uniforms;return D}function b(_,E){let D=u.get(E);return D!==void 0?++D.usedTimes:(D=new Dg(n,E,_,r),c.push(D),u.set(E,D)),D}function w(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:C,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:R}}function Bg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function zg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Oc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function kc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,p,x,g,m){let A=n[e];return A===void 0?(A={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},n[e]=A):(A.id=f.id,A.object=f,A.geometry=h,A.material=p,A.materialVariant=a(f),A.groupOrder=x,A.renderOrder=f.renderOrder,A.z=g,A.group=m),e++,A}function l(f,h,p,x,g,m){const A=o(f,h,p,x,g,m);p.transmission>0?i.push(A):p.transparent===!0?r.push(A):t.push(A)}function c(f,h,p,x,g,m){const A=o(f,h,p,x,g,m);p.transmission>0?i.unshift(A):p.transparent===!0?r.unshift(A):t.unshift(A)}function u(f,h,p){t.length>1&&t.sort(f||zg),i.length>1&&i.sort(h||Oc),r.length>1&&r.sort(h||Oc),p&&(t.reverse(),i.reverse(),r.reverse())}function d(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function Gg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new kc,n.set(i,[a])):r>=s.length?(a=new kc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Hg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Je};break;case"SpotLight":t={position:new k,direction:new k,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function Vg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Wg=0;function Xg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function $g(n){const e=new Hg,t=Vg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new dt,a=new dt;function o(c){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let h=0,p=0,x=0,g=0,m=0,A=0,C=0,b=0,w=0,T=0,R=0;c.sort(Xg);for(let E=0,D=c.length;E<D;E++){const P=c[E],F=P.color,Y=P.intensity,Q=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Di?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=F.r*Y,d+=F.g*Y,f+=F.b*Y;else if(P.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(P.sh.coefficients[J],Y);R++}else if(P.isDirectionalLight){const J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,ne=t.get(P);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,i.directionalShadow[h]=ne,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=P.shadow.matrix,A++}i.directional[h]=J,h++}else if(P.isSpotLight){const J=e.get(P);J.position.setFromMatrixPosition(P.matrixWorld),J.color.copy(F).multiplyScalar(Y),J.distance=Q,J.coneCos=Math.cos(P.angle),J.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),J.decay=P.decay,i.spot[x]=J;const V=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,V.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[x]=V.matrix,P.castShadow){const ne=t.get(P);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,i.spotShadow[x]=ne,i.spotShadowMap[x]=B,b++}x++}else if(P.isRectAreaLight){const J=e.get(P);J.color.copy(F).multiplyScalar(Y),J.halfWidth.set(P.width*.5,0,0),J.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=J,g++}else if(P.isPointLight){const J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),J.distance=P.distance,J.decay=P.decay,P.castShadow){const V=P.shadow,ne=t.get(P);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,ne.shadowCameraNear=V.camera.near,ne.shadowCameraFar=V.camera.far,i.pointShadow[p]=ne,i.pointShadowMap[p]=B,i.pointShadowMatrix[p]=P.shadow.matrix,C++}i.point[p]=J,p++}else if(P.isHemisphereLight){const J=e.get(P);J.skyColor.copy(P.color).multiplyScalar(Y),J.groundColor.copy(P.groundColor).multiplyScalar(Y),i.hemi[m]=J,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const _=i.hash;(_.directionalLength!==h||_.pointLength!==p||_.spotLength!==x||_.rectAreaLength!==g||_.hemiLength!==m||_.numDirectionalShadows!==A||_.numPointShadows!==C||_.numSpotShadows!==b||_.numSpotMaps!==w||_.numLightProbes!==R)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=g,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=b+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,_.directionalLength=h,_.pointLength=p,_.spotLength=x,_.rectAreaLength=g,_.hemiLength=m,_.numDirectionalShadows=A,_.numPointShadows=C,_.numSpotShadows=b,_.numSpotMaps=w,_.numLightProbes=R,i.version=Wg++)}function l(c,u){let d=0,f=0,h=0,p=0,x=0;const g=u.matrixWorldInverse;for(let m=0,A=c.length;m<A;m++){const C=c[m];if(C.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),d++}else if(C.isSpotLight){const b=i.spot[h];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),h++}else if(C.isRectAreaLight){const b=i.rectArea[p];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),a.identity(),s.copy(C.matrixWorld),s.premultiply(g),a.extractRotation(s),b.halfWidth.set(C.width*.5,0,0),b.halfHeight.set(0,C.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(C.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),f++}else if(C.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(C.matrixWorld),b.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function Bc(n){const e=new $g(n),t=[],i=[],r=[];function s(f){d.camera=f,t.length=0,i.length=0,r.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qg(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Bc(n),e.set(r,[o])):s>=a.length?(o=new Bc(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kg=`uniform sampler2D shadow_pass;
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
}`,Zg=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Jg=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],zc=new dt,Cr=new k,ka=new k;function Qg(n,e,t){let i=new pl;const r=new qe,s=new qe,a=new pt,o=new oh,l=new lh,c={},u=t.maxTextureSize,d={[fi]:Yt,[Yt]:fi,[zn]:zn},f=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Yg,fragmentShader:Kg}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const p=new xn;p.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Pt(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let m=this.type;this.render=function(T,R,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===hu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ps);const E=n.getRenderTarget(),D=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Vn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=m!==this.type;Y&&R.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(B=>B.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,B=T.length;Q<B;Q++){const J=T[Q],V=J.shadow;if(V===void 0){Ne("WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const ne=V.getFrameExtents();r.multiply(ne),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,V.mapSize.y=s.y));const se=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=se,V.map===null||Y===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Ir){if(J.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new In(r.x,r.y,{format:Di,type:Xn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),V.map.texture.name=J.name+".shadowMap",V.map.depthTexture=new hr(r.x,r.y,mn),V.map.depthTexture.name=J.name+".shadowMapDepth",V.map.depthTexture.format=$n,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt}else J.isPointLight?(V.map=new Vu(r.x),V.map.depthTexture=new th(r.x,Ln)):(V.map=new In(r.x,r.y),V.map.depthTexture=new hr(r.x,r.y,Ln)),V.map.depthTexture.name=J.name+".shadowMap",V.map.depthTexture.format=$n,this.type===Ps?(V.map.depthTexture.compareFunction=se?ul:cl,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt);V.camera.updateProjectionMatrix()}const ce=V.map.isWebGLCubeRenderTarget?6:1;for(let $=0;$<ce;$++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,$),n.clear();else{$===0&&(n.setRenderTarget(V.map),n.clear());const q=V.getViewport($);a.set(s.x*q.x,s.y*q.y,s.x*q.z,s.y*q.w),F.viewport(a)}if(J.isPointLight){const q=V.camera,ye=V.matrix,Le=J.distance||q.far;Le!==q.far&&(q.far=Le,q.updateProjectionMatrix()),Cr.setFromMatrixPosition(J.matrixWorld),q.position.copy(Cr),ka.copy(q.position),ka.add(Zg[$]),q.up.copy(Jg[$]),q.lookAt(ka),q.updateMatrixWorld(),ye.makeTranslation(-Cr.x,-Cr.y,-Cr.z),zc.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),V._frustum.setFromProjectionMatrix(zc,q.coordinateSystem,q.reversedDepth)}else V.updateMatrices(J);i=V.getFrustum(),b(R,_,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Ir&&A(V,_),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(E,D,P)};function A(T,R){const _=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new In(r.x,r.y,{format:Di,type:Xn})),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,_,f,x,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,_,h,x,null)}function C(T,R,_,E){let D=null;const P=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)D=P;else if(D=_.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=D.uuid,Y=R.uuid;let Q=c[F];Q===void 0&&(Q={},c[F]=Q);let B=Q[Y];B===void 0&&(B=D.clone(),Q[Y]=B,R.addEventListener("dispose",w)),D=B}if(D.visible=R.visible,D.wireframe=R.wireframe,E===Ir?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:d[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const F=n.properties.get(D);F.light=_}return D}function b(T,R,_,E,D){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Ir)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const Y=e.update(T),Q=T.material;if(Array.isArray(Q)){const B=Y.groups;for(let J=0,V=B.length;J<V;J++){const ne=B[J],se=Q[ne.materialIndex];if(se&&se.visible){const ce=C(T,se,E,D);T.onBeforeShadow(n,T,R,_,Y,ce,ne),n.renderBufferDirect(_,null,Y,ce,T,ne),T.onAfterShadow(n,T,R,_,Y,ce,ne)}}}else if(Q.visible){const B=C(T,Q,E,D);T.onBeforeShadow(n,T,R,_,Y,B,null),n.renderBufferDirect(_,null,Y,B,T,null),T.onAfterShadow(n,T,R,_,Y,B,null)}}const F=T.children;for(let Y=0,Q=F.length;Y<Q;Y++)b(F[Y],R,_,E,D)}function w(T){T.target.removeEventListener("dispose",w);for(const _ in c){const E=c[_],D=T.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function jg(n,e){function t(){let L=!1;const oe=new pt;let j=null;const fe=new pt(0,0,0,0);return{setMask:function(_e){j!==_e&&!L&&(n.colorMask(_e,_e,_e,_e),j=_e)},setLocked:function(_e){L=_e},setClear:function(_e,ie,Te,Se,gt){gt===!0&&(_e*=Se,ie*=Se,Te*=Se),oe.set(_e,ie,Te,Se),fe.equals(oe)===!1&&(n.clearColor(_e,ie,Te,Se),fe.copy(oe))},reset:function(){L=!1,j=null,fe.set(-1,0,0,0)}}}function i(){let L=!1,oe=!1,j=null,fe=null,_e=null;return{setReversed:function(ie){if(oe!==ie){const Te=e.get("EXT_clip_control");ie?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=ie;const Se=_e;_e=null,this.setClear(Se)}},getReversed:function(){return oe},setTest:function(ie){ie?te(n.DEPTH_TEST):he(n.DEPTH_TEST)},setMask:function(ie){j!==ie&&!L&&(n.depthMask(ie),j=ie)},setFunc:function(ie){if(oe&&(ie=Pf[ie]),fe!==ie){switch(ie){case Qa:n.depthFunc(n.NEVER);break;case ja:n.depthFunc(n.ALWAYS);break;case eo:n.depthFunc(n.LESS);break;case dr:n.depthFunc(n.LEQUAL);break;case to:n.depthFunc(n.EQUAL);break;case no:n.depthFunc(n.GEQUAL);break;case io:n.depthFunc(n.GREATER);break;case ro:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=ie}},setLocked:function(ie){L=ie},setClear:function(ie){_e!==ie&&(_e=ie,oe&&(ie=1-ie),n.clearDepth(ie))},reset:function(){L=!1,j=null,fe=null,_e=null,oe=!1}}}function r(){let L=!1,oe=null,j=null,fe=null,_e=null,ie=null,Te=null,Se=null,gt=null;return{setTest:function(ft){L||(ft?te(n.STENCIL_TEST):he(n.STENCIL_TEST))},setMask:function(ft){oe!==ft&&!L&&(n.stencilMask(ft),oe=ft)},setFunc:function(ft,Mn,bn){(j!==ft||fe!==Mn||_e!==bn)&&(n.stencilFunc(ft,Mn,bn),j=ft,fe=Mn,_e=bn)},setOp:function(ft,Mn,bn){(ie!==ft||Te!==Mn||Se!==bn)&&(n.stencilOp(ft,Mn,bn),ie=ft,Te=Mn,Se=bn)},setLocked:function(ft){L=ft},setClear:function(ft){gt!==ft&&(n.clearStencil(ft),gt=ft)},reset:function(){L=!1,oe=null,j=null,fe=null,_e=null,ie=null,Te=null,Se=null,gt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f={},h=new WeakMap,p=[],x=null,g=!1,m=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new Je(0,0,0),E=0,D=!1,P=null,F=null,Y=null,Q=null,B=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ne=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(se)[1]),V=ne>=1):se.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),V=ne>=2);let ce=null,$={};const q=n.getParameter(n.SCISSOR_BOX),ye=n.getParameter(n.VIEWPORT),Le=new pt().fromArray(q),Ce=new pt().fromArray(ye);function W(L,oe,j,fe){const _e=new Uint8Array(4),ie=n.createTexture();n.bindTexture(L,ie),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<j;Te++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(oe+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return ie}const re={};re[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(dr),yt(!1),Tt(kl),te(n.CULL_FACE),it(Vn);function te(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function he(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Oe(L,oe){return f[L]!==oe?(n.bindFramebuffer(L,oe),f[L]=oe,L===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=oe),L===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function De(L,oe){let j=p,fe=!1;if(L){j=h.get(oe),j===void 0&&(j=[],h.set(oe,j));const _e=L.textures;if(j.length!==_e.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ie=0,Te=_e.length;ie<Te;ie++)j[ie]=n.COLOR_ATTACHMENT0+ie;j.length=_e.length,fe=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,fe=!0);fe&&n.drawBuffers(j)}function _t(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const $e={[bi]:n.FUNC_ADD,[Qd]:n.FUNC_SUBTRACT,[jd]:n.FUNC_REVERSE_SUBTRACT};$e[ef]=n.MIN,$e[tf]=n.MAX;const lt={[nf]:n.ZERO,[rf]:n.ONE,[sf]:n.SRC_COLOR,[Za]:n.SRC_ALPHA,[df]:n.SRC_ALPHA_SATURATE,[cf]:n.DST_COLOR,[of]:n.DST_ALPHA,[af]:n.ONE_MINUS_SRC_COLOR,[Ja]:n.ONE_MINUS_SRC_ALPHA,[uf]:n.ONE_MINUS_DST_COLOR,[lf]:n.ONE_MINUS_DST_ALPHA,[ff]:n.CONSTANT_COLOR,[hf]:n.ONE_MINUS_CONSTANT_COLOR,[pf]:n.CONSTANT_ALPHA,[mf]:n.ONE_MINUS_CONSTANT_ALPHA};function it(L,oe,j,fe,_e,ie,Te,Se,gt,ft){if(L===Vn){g===!0&&(he(n.BLEND),g=!1);return}if(g===!1&&(te(n.BLEND),g=!0),L!==Jd){if(L!==m||ft!==D){if((A!==bi||w!==bi)&&(n.blendEquation(n.FUNC_ADD),A=bi,w=bi),ft)switch(L){case lr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bl:n.blendFunc(n.ONE,n.ONE);break;case zl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case lr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case zl:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gl:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}C=null,b=null,T=null,R=null,_.set(0,0,0),E=0,m=L,D=ft}return}_e=_e||oe,ie=ie||j,Te=Te||fe,(oe!==A||_e!==w)&&(n.blendEquationSeparate($e[oe],$e[_e]),A=oe,w=_e),(j!==C||fe!==b||ie!==T||Te!==R)&&(n.blendFuncSeparate(lt[j],lt[fe],lt[ie],lt[Te]),C=j,b=fe,T=ie,R=Te),(Se.equals(_)===!1||gt!==E)&&(n.blendColor(Se.r,Se.g,Se.b,gt),_.copy(Se),E=gt),m=L,D=!1}function Qe(L,oe){L.side===zn?he(n.CULL_FACE):te(n.CULL_FACE);let j=L.side===Yt;oe&&(j=!j),yt(j),L.blending===lr&&L.transparent===!1?it(Vn):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const fe=L.stencilWrite;o.setTest(fe),fe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),It(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):he(n.SAMPLE_ALPHA_TO_COVERAGE)}function yt(L){P!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),P=L)}function Tt(L){L!==Kd?(te(n.CULL_FACE),L!==F&&(L===kl?n.cullFace(n.BACK):L===Zd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):he(n.CULL_FACE),F=L}function Rt(L){L!==Y&&(V&&n.lineWidth(L),Y=L)}function It(L,oe,j){L?(te(n.POLYGON_OFFSET_FILL),(Q!==oe||B!==j)&&(Q=oe,B=j,a.getReversed()&&(oe=-oe),n.polygonOffset(oe,j))):he(n.POLYGON_OFFSET_FILL)}function mt(L){L?te(n.SCISSOR_TEST):he(n.SCISSOR_TEST)}function St(L){L===void 0&&(L=n.TEXTURE0+J-1),ce!==L&&(n.activeTexture(L),ce=L)}function U(L,oe,j){j===void 0&&(ce===null?j=n.TEXTURE0+J-1:j=ce);let fe=$[j];fe===void 0&&(fe={type:void 0,texture:void 0},$[j]=fe),(fe.type!==L||fe.texture!==oe)&&(ce!==j&&(n.activeTexture(j),ce=j),n.bindTexture(L,oe||re[L]),fe.type=L,fe.texture=oe)}function Vt(){const L=$[ce];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function st(){try{n.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function v(){try{n.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function O(){try{n.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ae(){try{n.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function le(){try{n.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Z(){try{n.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ee(){try{n.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ue(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function Ae(L,oe){d[L]!==oe&&(n.pixelStorei(L,oe),d[L]=oe)}function pe(L){Le.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Le.copy(L))}function de(L){Ce.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ce.copy(L))}function Pe(L,oe){let j=c.get(oe);j===void 0&&(j=new WeakMap,c.set(oe,j));let fe=j.get(L);fe===void 0&&(fe=n.getUniformBlockIndex(oe,L.name),j.set(L,fe))}function Ue(L,oe){const fe=c.get(oe).get(L);l.get(oe)!==fe&&(n.uniformBlockBinding(oe,fe,L.__bindingPointIndex),l.set(oe,fe))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ce=null,$={},f={},h=new WeakMap,p=[],x=null,g=!1,m=null,A=null,C=null,b=null,w=null,T=null,R=null,_=new Je(0,0,0),E=0,D=!1,P=null,F=null,Y=null,Q=null,B=null,Le.set(0,0,n.canvas.width,n.canvas.height),Ce.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:he,bindFramebuffer:Oe,drawBuffers:De,useProgram:_t,setBlending:it,setMaterial:Qe,setFlipSided:yt,setCullFace:Tt,setLineWidth:Rt,setPolygonOffset:It,setScissorTest:mt,activeTexture:St,bindTexture:U,unbindTexture:Vt,compressedTexImage2D:st,compressedTexImage3D:y,texImage2D:Z,texImage3D:ee,pixelStorei:Ae,getParameter:ue,updateUBOMapping:Pe,uniformBlockBinding:Ue,texStorage2D:ae,texStorage3D:le,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:K,scissor:pe,viewport:de,reset:ke}}function ev(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,u=new WeakMap,d=new Set;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(y,v){return p?new OffscreenCanvas(y,v):Vs("canvas")}function g(y,v,O){let H=1;const K=st(y);if((K.width>O||K.height>O)&&(H=O/Math.max(K.width,K.height)),H<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ae=Math.floor(H*K.width),le=Math.floor(H*K.height);f===void 0&&(f=x(ae,le));const Z=v?x(ae,le):f;return Z.width=ae,Z.height=le,Z.getContext("2d").drawImage(y,0,0,ae,le),Ne("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ae+"x"+le+")."),Z}else return"data"in y&&Ne("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),y;return y}function m(y){return y.generateMipmaps}function A(y){n.generateMipmap(y)}function C(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(y,v,O,H,K,ae=!1){if(y!==null){if(n[y]!==void 0)return n[y];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let le;H&&(le=e.get("EXT_texture_norm16"),le||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=v;if(v===n.RED&&(O===n.FLOAT&&(Z=n.R32F),O===n.HALF_FLOAT&&(Z=n.R16F),O===n.UNSIGNED_BYTE&&(Z=n.R8),O===n.UNSIGNED_SHORT&&le&&(Z=le.R16_EXT),O===n.SHORT&&le&&(Z=le.R16_SNORM_EXT)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.R8UI),O===n.UNSIGNED_SHORT&&(Z=n.R16UI),O===n.UNSIGNED_INT&&(Z=n.R32UI),O===n.BYTE&&(Z=n.R8I),O===n.SHORT&&(Z=n.R16I),O===n.INT&&(Z=n.R32I)),v===n.RG&&(O===n.FLOAT&&(Z=n.RG32F),O===n.HALF_FLOAT&&(Z=n.RG16F),O===n.UNSIGNED_BYTE&&(Z=n.RG8),O===n.UNSIGNED_SHORT&&le&&(Z=le.RG16_EXT),O===n.SHORT&&le&&(Z=le.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RG8UI),O===n.UNSIGNED_SHORT&&(Z=n.RG16UI),O===n.UNSIGNED_INT&&(Z=n.RG32UI),O===n.BYTE&&(Z=n.RG8I),O===n.SHORT&&(Z=n.RG16I),O===n.INT&&(Z=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),O===n.UNSIGNED_INT&&(Z=n.RGB32UI),O===n.BYTE&&(Z=n.RGB8I),O===n.SHORT&&(Z=n.RGB16I),O===n.INT&&(Z=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),O===n.UNSIGNED_INT&&(Z=n.RGBA32UI),O===n.BYTE&&(Z=n.RGBA8I),O===n.SHORT&&(Z=n.RGBA16I),O===n.INT&&(Z=n.RGBA32I)),v===n.RGB&&(O===n.UNSIGNED_SHORT&&le&&(Z=le.RGB16_EXT),O===n.SHORT&&le&&(Z=le.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),v===n.RGBA){const ee=ae?Hs:Ye.getTransfer(K);O===n.FLOAT&&(Z=n.RGBA32F),O===n.HALF_FLOAT&&(Z=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Z=ee===at?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&le&&(Z=le.RGBA16_EXT),O===n.SHORT&&le&&(Z=le.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function w(y,v){let O;return y?v===null||v===Ln||v===Hr?O=n.DEPTH24_STENCIL8:v===mn?O=n.DEPTH32F_STENCIL8:v===Gr&&(O=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ln||v===Hr?O=n.DEPTH_COMPONENT24:v===mn?O=n.DEPTH_COMPONENT32F:v===Gr&&(O=n.DEPTH_COMPONENT16),O}function T(y,v){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==Lt&&y.minFilter!==Ot?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function R(y){const v=y.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function _(y){const v=y.target;v.removeEventListener("dispose",_),P(v)}function E(y){const v=i.get(y);if(v.__webglInit===void 0)return;const O=y.source,H=h.get(O);if(H){const K=H[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(y),Object.keys(H).length===0&&h.delete(O)}i.remove(y)}function D(y){const v=i.get(y);n.deleteTexture(v.__webglTexture);const O=y.source,H=h.get(O);delete H[v.__cacheKey],a.memory.textures--}function P(y){const v=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let K=0;K<v.__webglFramebuffer[H].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[H][K]);else n.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)n.deleteFramebuffer(v.__webglFramebuffer[H]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=y.textures;for(let H=0,K=O.length;H<K;H++){const ae=i.get(O[H]);ae.__webglTexture&&(n.deleteTexture(ae.__webglTexture),a.memory.textures--),i.remove(O[H])}i.remove(y)}let F=0;function Y(){F=0}function Q(){return F}function B(y){F=y}function J(){const y=F;return y>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),F+=1,y}function V(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function ne(y,v){const O=i.get(y);if(y.isVideoTexture&&U(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&O.__version!==y.version){const H=y.image;if(H===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{he(O,y,v);return}}else y.isExternalTexture&&(O.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function se(y,v){const O=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&O.__version!==y.version){he(O,y,v);return}else y.isExternalTexture&&(O.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function ce(y,v){const O=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&O.__version!==y.version){he(O,y,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function $(y,v){const O=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&O.__version!==y.version){Oe(O,y,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const q={[ks]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[so]:n.MIRRORED_REPEAT},ye={[Lt]:n.NEAREST,[_f]:n.NEAREST_MIPMAP_NEAREST,[ss]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[oa]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},Le={[bf]:n.NEVER,[Af]:n.ALWAYS,[yf]:n.LESS,[cl]:n.LEQUAL,[Sf]:n.EQUAL,[ul]:n.GEQUAL,[Ef]:n.GREATER,[Tf]:n.NOTEQUAL};function Ce(y,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ot||v.magFilter===oa||v.magFilter===ss||v.magFilter===Ei||v.minFilter===Ot||v.minFilter===oa||v.minFilter===ss||v.minFilter===Ei)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,q[v.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,q[v.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,q[v.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,ye[v.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,ye[v.minFilter]),v.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==ss&&v.minFilter!==Ei||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function W(y,v){let O=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",R));const H=v.source;let K=h.get(H);K===void 0&&(K={},h.set(H,K));const ae=V(v);if(ae!==y.__cacheKey){K[ae]===void 0&&(K[ae]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[ae].usedTimes++;const le=K[y.__cacheKey];le!==void 0&&(K[y.__cacheKey].usedTimes--,le.usedTimes===0&&D(v)),y.__cacheKey=ae,y.__webglTexture=K[ae].texture}return O}function re(y,v,O){return Math.floor(Math.floor(y/O)/v)}function te(y,v,O,H){const ae=y.updateRanges;if(ae.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,O,H,v.data);else{ae.sort((Ae,pe)=>Ae.start-pe.start);let le=0;for(let Ae=1;Ae<ae.length;Ae++){const pe=ae[le],de=ae[Ae],Pe=pe.start+pe.count,Ue=re(de.start,v.width,4),ke=re(pe.start,v.width,4);de.start<=Pe+1&&Ue===ke&&re(de.start+de.count-1,v.width,4)===Ue?pe.count=Math.max(pe.count,de.start+de.count-pe.start):(++le,ae[le]=de)}ae.length=le+1;const Z=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ae=0,pe=ae.length;Ae<pe;Ae++){const de=ae[Ae],Pe=Math.floor(de.start/4),Ue=Math.ceil(de.count/4),ke=Pe%v.width,L=Math.floor(Pe/v.width),oe=Ue,j=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ke,L,oe,j,O,H,v.data)}y.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Z),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function he(y,v,O){let H=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=n.TEXTURE_3D);const K=W(y,v),ae=v.source;t.bindTexture(H,y.__webglTexture,n.TEXTURE0+O);const le=i.get(ae);if(ae.version!==le.__version||K===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const j=Ye.getPrimaries(Ye.workingColorSpace),fe=v.colorSpace===oi?null:Ye.getPrimaries(v.colorSpace),_e=v.colorSpace===oi||j===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=g(v.image,!1,r.maxTextureSize);ee=Vt(v,ee);const ue=s.convert(v.format,v.colorSpace),Ae=s.convert(v.type);let pe=b(v.internalFormat,ue,Ae,v.normalized,v.colorSpace,v.isVideoTexture);Ce(H,v);let de;const Pe=v.mipmaps,Ue=v.isVideoTexture!==!0,ke=le.__version===void 0||K===!0,L=ae.dataReady,oe=T(v,ee);if(v.isDepthTexture)pe=w(v.format===Ti,v.type),ke&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,pe,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,pe,ee.width,ee.height,0,ue,Ae,null));else if(v.isDataTexture)if(Pe.length>0){Ue&&ke&&t.texStorage2D(n.TEXTURE_2D,oe,pe,Pe[0].width,Pe[0].height);for(let j=0,fe=Pe.length;j<fe;j++)de=Pe[j],Ue?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,Ae,de.data):t.texImage2D(n.TEXTURE_2D,j,pe,de.width,de.height,0,ue,Ae,de.data);v.generateMipmaps=!1}else Ue?(ke&&t.texStorage2D(n.TEXTURE_2D,oe,pe,ee.width,ee.height),L&&te(v,ee,ue,Ae)):t.texImage2D(n.TEXTURE_2D,0,pe,ee.width,ee.height,0,ue,Ae,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ue&&ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,pe,Pe[0].width,Pe[0].height,ee.depth);for(let j=0,fe=Pe.length;j<fe;j++)if(de=Pe[j],v.format!==gn)if(ue!==null)if(Ue){if(L)if(v.layerUpdates.size>0){const _e=vc(de.width,de.height,v.format,v.type);for(const ie of v.layerUpdates){const Te=de.data.subarray(ie*_e/de.data.BYTES_PER_ELEMENT,(ie+1)*_e/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ie,de.width,de.height,1,ue,Te)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,ee.depth,ue,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,pe,de.width,de.height,ee.depth,0,de.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,de.width,de.height,ee.depth,ue,Ae,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,pe,de.width,de.height,ee.depth,0,ue,Ae,de.data)}else{Ue&&ke&&t.texStorage2D(n.TEXTURE_2D,oe,pe,Pe[0].width,Pe[0].height);for(let j=0,fe=Pe.length;j<fe;j++)de=Pe[j],v.format!==gn?ue!==null?Ue?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(n.TEXTURE_2D,j,pe,de.width,de.height,0,de.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,de.width,de.height,ue,Ae,de.data):t.texImage2D(n.TEXTURE_2D,j,pe,de.width,de.height,0,ue,Ae,de.data)}else if(v.isDataArrayTexture)if(Ue){if(ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,pe,ee.width,ee.height,ee.depth),L)if(v.layerUpdates.size>0){const j=vc(ee.width,ee.height,v.format,v.type);for(const fe of v.layerUpdates){const _e=ee.data.subarray(fe*j/ee.data.BYTES_PER_ELEMENT,(fe+1)*j/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,ee.width,ee.height,1,ue,Ae,_e)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ue,Ae,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,pe,ee.width,ee.height,ee.depth,0,ue,Ae,ee.data);else if(v.isData3DTexture)Ue?(ke&&t.texStorage3D(n.TEXTURE_3D,oe,pe,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ue,Ae,ee.data)):t.texImage3D(n.TEXTURE_3D,0,pe,ee.width,ee.height,ee.depth,0,ue,Ae,ee.data);else if(v.isFramebufferTexture){if(ke)if(Ue)t.texStorage2D(n.TEXTURE_2D,oe,pe,ee.width,ee.height);else{let j=ee.width,fe=ee.height;for(let _e=0;_e<oe;_e++)t.texImage2D(n.TEXTURE_2D,_e,pe,j,fe,0,ue,Ae,null),j>>=1,fe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),ee.parentNode!==j){j.appendChild(ee),d.add(v),j.onpaint=fe=>{const _e=fe.changedElements;for(const ie of d)_e.includes(ie.image)&&(ie.needsUpdate=!0)},j.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ee);else{const _e=n.RGBA,ie=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,_e,ie,Te,ee)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Ue&&ke){const j=st(Pe[0]);t.texStorage2D(n.TEXTURE_2D,oe,pe,j.width,j.height)}for(let j=0,fe=Pe.length;j<fe;j++)de=Pe[j],Ue?L&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,ue,Ae,de):t.texImage2D(n.TEXTURE_2D,j,pe,ue,Ae,de);v.generateMipmaps=!1}else if(Ue){if(ke){const j=st(ee);t.texStorage2D(n.TEXTURE_2D,oe,pe,j.width,j.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Ae,ee)}else t.texImage2D(n.TEXTURE_2D,0,pe,ue,Ae,ee);m(v)&&A(H),le.__version=ae.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Oe(y,v,O){if(v.image.length!==6)return;const H=W(y,v),K=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+O);const ae=i.get(K);if(K.version!==ae.__version||H===!0){t.activeTexture(n.TEXTURE0+O);const le=Ye.getPrimaries(Ye.workingColorSpace),Z=v.colorSpace===oi?null:Ye.getPrimaries(v.colorSpace),ee=v.colorSpace===oi||le===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ue=v.isCompressedTexture||v.image[0].isCompressedTexture,Ae=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let ie=0;ie<6;ie++)!ue&&!Ae?pe[ie]=g(v.image[ie],!0,r.maxCubemapSize):pe[ie]=Ae?v.image[ie].image:v.image[ie],pe[ie]=Vt(v,pe[ie]);const de=pe[0],Pe=s.convert(v.format,v.colorSpace),Ue=s.convert(v.type),ke=b(v.internalFormat,Pe,Ue,v.normalized,v.colorSpace),L=v.isVideoTexture!==!0,oe=ae.__version===void 0||H===!0,j=K.dataReady;let fe=T(v,de);Ce(n.TEXTURE_CUBE_MAP,v);let _e;if(ue){L&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,ke,de.width,de.height);for(let ie=0;ie<6;ie++){_e=pe[ie].mipmaps;for(let Te=0;Te<_e.length;Te++){const Se=_e[Te];v.format!==gn?Pe!==null?L?j&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,0,0,Se.width,Se.height,Pe,Se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,ke,Se.width,Se.height,0,Se.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,0,0,Se.width,Se.height,Pe,Ue,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,ke,Se.width,Se.height,0,Pe,Ue,Se.data)}}}else{if(_e=v.mipmaps,L&&oe){_e.length>0&&fe++;const ie=st(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,ke,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Ae){L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,pe[ie].width,pe[ie].height,Pe,Ue,pe[ie].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ke,pe[ie].width,pe[ie].height,0,Pe,Ue,pe[ie].data);for(let Te=0;Te<_e.length;Te++){const gt=_e[Te].image[ie].image;L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,0,0,gt.width,gt.height,Pe,Ue,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,ke,gt.width,gt.height,0,Pe,Ue,gt.data)}}else{L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Pe,Ue,pe[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ke,Pe,Ue,pe[ie]);for(let Te=0;Te<_e.length;Te++){const Se=_e[Te];L?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,0,0,Pe,Ue,Se.image[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,ke,Pe,Ue,Se.image[ie])}}}m(v)&&A(n.TEXTURE_CUBE_MAP),ae.__version=K.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function De(y,v,O,H,K,ae){const le=s.convert(O.format,O.colorSpace),Z=s.convert(O.type),ee=b(O.internalFormat,le,Z,O.normalized,O.colorSpace),ue=i.get(v),Ae=i.get(O);if(Ae.__renderTarget=v,!ue.__hasExternalTextures){const pe=Math.max(1,v.width>>ae),de=Math.max(1,v.height>>ae);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,ae,ee,pe,de,v.depth,0,le,Z,null):t.texImage2D(K,ae,ee,pe,de,0,le,Z,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),St(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,K,Ae.__webglTexture,0,mt(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,K,Ae.__webglTexture,ae),t.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(y,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,y),v.depthBuffer){const H=v.depthTexture,K=H&&H.isDepthTexture?H.type:null,ae=w(v.stencilBuffer,K),le=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;St(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),ae,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),ae,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ae,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,le,n.RENDERBUFFER,y)}else{const H=v.textures;for(let K=0;K<H.length;K++){const ae=H[K],le=s.convert(ae.format,ae.colorSpace),Z=s.convert(ae.type),ee=b(ae.internalFormat,le,Z,ae.normalized,ae.colorSpace);St(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),ee,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $e(y,v,O){const H=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(v.depthTexture);if(K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H){if(K.__webglInit===void 0&&(K.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ce(n.TEXTURE_CUBE_MAP,v.depthTexture);const ue=s.convert(v.depthTexture.format),Ae=s.convert(v.depthTexture.type);let pe;v.depthTexture.format===$n?pe=n.DEPTH_COMPONENT24:v.depthTexture.format===Ti&&(pe=n.DEPTH24_STENCIL8);for(let de=0;de<6;de++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,pe,v.width,v.height,0,ue,Ae,null)}}else ne(v.depthTexture,0);const ae=K.__webglTexture,le=mt(v),Z=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,ee=v.depthTexture.format===Ti?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===$n)St(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,ae,0,le):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,ae,0);else if(v.depthTexture.format===Ti)St(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Z,ae,0,le):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Z,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(y){const v=i.get(y),O=y.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==y.depthTexture){const H=y.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",K)};H.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=H}if(y.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)$e(v.__webglFramebuffer[H],y,H);else{const H=y.texture.mipmaps;H&&H.length>0?$e(v.__webglFramebuffer[0],y,0):$e(v.__webglFramebuffer,y,0)}else if(O){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=n.createRenderbuffer(),_t(v.__webglDepthbuffer[H],y,!1);else{const K=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ae)}}else{const H=y.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),_t(v.__webglDepthbuffer,y,!1);else{const K=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ae)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function it(y,v,O){const H=i.get(y);v!==void 0&&De(H.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&lt(y)}function Qe(y){const v=y.texture,O=i.get(y),H=i.get(v);y.addEventListener("dispose",_);const K=y.textures,ae=y.isWebGLCubeRenderTarget===!0,le=K.length>1;if(le||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=v.version,a.memory.textures++),ae){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let ee=0;ee<v.mipmaps.length;ee++)O.__webglFramebuffer[Z][ee]=n.createFramebuffer()}else O.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<v.mipmaps.length;Z++)O.__webglFramebuffer[Z]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(le)for(let Z=0,ee=K.length;Z<ee;Z++){const ue=i.get(K[Z]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&St(y)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){const ee=K[Z];O.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);const ue=s.convert(ee.format,ee.colorSpace),Ae=s.convert(ee.type),pe=b(ee.internalFormat,ue,Ae,ee.normalized,ee.colorSpace,y.isXRRenderTarget===!0),de=mt(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,de,pe,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),_t(O.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ae){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Ce(n.TEXTURE_CUBE_MAP,v);for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)De(O.__webglFramebuffer[Z][ee],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ee);else De(O.__webglFramebuffer[Z],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(v)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let Z=0,ee=K.length;Z<ee;Z++){const ue=K[Z],Ae=i.get(ue);let pe=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(pe=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,Ae.__webglTexture),Ce(pe,ue),De(O.__webglFramebuffer,y,ue,n.COLOR_ATTACHMENT0+Z,pe,0),m(ue)&&A(pe)}t.unbindTexture()}else{let Z=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Z=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,H.__webglTexture),Ce(Z,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)De(O.__webglFramebuffer[ee],y,v,n.COLOR_ATTACHMENT0,Z,ee);else De(O.__webglFramebuffer,y,v,n.COLOR_ATTACHMENT0,Z,0);m(v)&&A(Z),t.unbindTexture()}y.depthBuffer&&lt(y)}function yt(y){const v=y.textures;for(let O=0,H=v.length;O<H;O++){const K=v[O];if(m(K)){const ae=C(y),le=i.get(K).__webglTexture;t.bindTexture(ae,le),A(ae),t.unbindTexture()}}}const Tt=[],Rt=[];function It(y){if(y.samples>0){if(St(y)===!1){const v=y.textures,O=y.width,H=y.height;let K=n.COLOR_BUFFER_BIT;const ae=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=i.get(y),Z=v.length>1;if(Z)for(let ue=0;ue<v.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const ee=y.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ue=0;ue<v.length;ue++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);const Ae=i.get(v[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,O,H,0,0,O,H,K,n.NEAREST),l===!0&&(Tt.length=0,Rt.length=0,Tt.push(n.COLOR_ATTACHMENT0+ue),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Tt.push(ae),Rt.push(ae),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Rt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ue=0;ue<v.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);const Ae=i.get(v[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const v=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function mt(y){return Math.min(r.maxSamples,y.samples)}function St(y){const v=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(y){const v=a.render.frame;u.get(y)!==v&&(u.set(y,v),y.update())}function Vt(y,v){const O=y.colorSpace,H=y.format,K=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||O!==Gs&&O!==oi&&(Ye.getTransfer(O)===at?(H!==gn||K!==jt)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",O)),v}function st(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=Y,this.getTextureUnits=Q,this.setTextureUnits=B,this.setTexture2D=ne,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=$,this.rebindTextures=it,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tv(n,e){function t(i,r=oi){let s;const a=Ye.getTransfer(r);if(i===jt)return n.UNSIGNED_BYTE;if(i===il)return n.UNSIGNED_SHORT_4_4_4_4;if(i===rl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===yu)return n.BYTE;if(i===Su)return n.SHORT;if(i===Gr)return n.UNSIGNED_SHORT;if(i===nl)return n.INT;if(i===Ln)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===Au)return n.ALPHA;if(i===wu)return n.RGB;if(i===gn)return n.RGBA;if(i===$n)return n.DEPTH_COMPONENT;if(i===Ti)return n.DEPTH_STENCIL;if(i===sl)return n.RED;if(i===al)return n.RED_INTEGER;if(i===Di)return n.RG;if(i===ol)return n.RG_INTEGER;if(i===ll)return n.RGBA_INTEGER;if(i===Is||i===Ls||i===Ds||i===Us)if(a===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Is)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Is)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Us)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ao||i===oo||i===lo||i===co)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ao)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===oo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===co)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===uo||i===fo||i===ho||i===po||i===mo||i===Bs||i===go)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===uo||i===fo)return a===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ho)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===po)return s.COMPRESSED_R11_EAC;if(i===mo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Bs)return s.COMPRESSED_RG11_EAC;if(i===go)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===vo||i===_o||i===xo||i===Mo||i===bo||i===yo||i===So||i===Eo||i===To||i===Ao||i===wo||i===Ro||i===Co||i===Po)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===vo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_o)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===So)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Eo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===To)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ao)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wo)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ro)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Co)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Po)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Io||i===Lo||i===Do)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Io)return a===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Do)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Uo||i===No||i===zs||i===Fo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Uo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===No)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===zs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const nv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iv=`
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

}`;class rv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Dn({vertexShader:nv,fragmentShader:iv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new xr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sv extends Ni{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,p=null;const x=typeof XRWebGLBinding<"u",g=new rv,m={},A=t.getContextAttributes();let C=null,b=null;const w=[],T=[],R=new qe;let _=null;const E=new fn;E.viewport=new pt;const D=new fn;D.viewport=new pt;const P=[E,D],F=new ph;let Y=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let re=w[W];return re===void 0&&(re=new ma,w[W]=re),re.getTargetRaySpace()},this.getControllerGrip=function(W){let re=w[W];return re===void 0&&(re=new ma,w[W]=re),re.getGripSpace()},this.getHand=function(W){let re=w[W];return re===void 0&&(re=new ma,w[W]=re),re.getHandSpace()};function B(W){const re=T.indexOf(W.inputSource);if(re===-1)return;const te=w[re];te!==void 0&&(te.update(W.inputSource,W.frame,c||a),te.dispatchEvent({type:W.type,data:W.inputSource}))}function J(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",V);for(let W=0;W<w.length;W++){const re=T[W];re!==null&&(T[W]=null,w[W].disconnect(re))}Y=null,Q=null,g.reset();for(const W in m)delete m[W];e.setRenderTarget(C),h=null,f=null,d=null,r=null,b=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",J),r.addEventListener("inputsourceschange",V),A.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,he=null,Oe=null;A.depth&&(Oe=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=A.stencil?Ti:$n,he=A.stencil?Hr:Ln);const De={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(De),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new In(f.textureWidth,f.textureHeight,{format:gn,type:jt,depthTexture:new hr(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const te={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new In(h.framebufferWidth,h.framebufferHeight,{format:gn,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ce.setContext(r),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function V(W){for(let re=0;re<W.removed.length;re++){const te=W.removed[re],he=T.indexOf(te);he>=0&&(T[he]=null,w[he].disconnect(te))}for(let re=0;re<W.added.length;re++){const te=W.added[re];let he=T.indexOf(te);if(he===-1){for(let De=0;De<w.length;De++)if(De>=T.length){T.push(te),he=De;break}else if(T[De]===null){T[De]=te,he=De;break}if(he===-1)break}const Oe=w[he];Oe&&Oe.connect(te)}}const ne=new k,se=new k;function ce(W,re,te){ne.setFromMatrixPosition(re.matrixWorld),se.setFromMatrixPosition(te.matrixWorld);const he=ne.distanceTo(se),Oe=re.projectionMatrix.elements,De=te.projectionMatrix.elements,_t=Oe[14]/(Oe[10]-1),$e=Oe[14]/(Oe[10]+1),lt=(Oe[9]+1)/Oe[5],it=(Oe[9]-1)/Oe[5],Qe=(Oe[8]-1)/Oe[0],yt=(De[8]+1)/De[0],Tt=_t*Qe,Rt=_t*yt,It=he/(-Qe+yt),mt=It*-Qe;if(re.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(mt),W.translateZ(It),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Oe[10]===-1)W.projectionMatrix.copy(re.projectionMatrix),W.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const St=_t+It,U=$e+It,Vt=Tt-mt,st=Rt+(he-mt),y=lt*$e/U*St,v=it*$e/U*St;W.projectionMatrix.makePerspective(Vt,st,y,v,St,U),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function $(W,re){re===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(re.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let re=W.near,te=W.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(te=g.depthFar)),F.near=D.near=E.near=re,F.far=D.far=E.far=te,(Y!==F.near||Q!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),Y=F.near,Q=F.far),F.layers.mask=W.layers.mask|6,E.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;const he=W.parent,Oe=F.cameras;$(F,he);for(let De=0;De<Oe.length;De++)$(Oe[De],he);Oe.length===2?ce(F,E,D):F.projectionMatrix.copy(E.projectionMatrix),q(W,F,he)};function q(W,re,te){te===null?W.matrix.copy(re.matrixWorld):(W.matrix.copy(te.matrixWorld),W.matrix.invert(),W.matrix.multiply(re.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(re.projectionMatrix),W.projectionMatrixInverse.copy(re.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ko*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=W)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(W){return m[W]};let ye=null;function Le(W,re){if(u=re.getViewerPose(c||a),p=re,u!==null){const te=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let he=!1;te.length!==F.cameras.length&&(F.cameras.length=0,he=!0);for(let $e=0;$e<te.length;$e++){const lt=te[$e];let it=null;if(h!==null)it=h.getViewport(lt);else{const yt=d.getViewSubImage(f,lt);it=yt.viewport,$e===0&&(e.setRenderTargetTextures(b,yt.colorTexture,yt.depthStencilTexture),e.setRenderTarget(b))}let Qe=P[$e];Qe===void 0&&(Qe=new fn,Qe.layers.enable($e),Qe.viewport=new pt,P[$e]=Qe),Qe.matrix.fromArray(lt.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(lt.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(it.x,it.y,it.width,it.height),$e===0&&(F.matrix.copy(Qe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),he===!0&&F.cameras.push(Qe)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const $e=d.getDepthInformation(te[0]);$e&&$e.isValid&&$e.texture&&g.init($e,r.renderState)}if(Oe&&Oe.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let $e=0;$e<te.length;$e++){const lt=te[$e].camera;if(lt){let it=m[lt];it||(it=new Fu,m[lt]=it);const Qe=d.getCameraImage(lt);it.sourceTexture=Qe}}}}for(let te=0;te<w.length;te++){const he=T[te],Oe=w[te];he!==null&&Oe!==void 0&&Oe.update(he,re,c||a)}ye&&ye(W,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),p=null}const Ce=new Gu;Ce.setAnimationLoop(Le),this.setAnimationLoop=function(W){ye=W},this.dispose=function(){}}}const av=new dt,Yu=new Fe;Yu.set(-1,0,0,0,1,0,0,0,1);function ov(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Ou(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,A,C,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),f(g,m),m.isMeshPhysicalMaterial&&h(g,m,b)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),x(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,A,C):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Yt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Yt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const A=e.get(m),C=A.envMap,b=A.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Yu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,A,C){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*A,g.scale.value=C*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,A){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const A=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function lv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const T=w.program;i.uniformBlockBinding(b,T)}function c(b,w){let T=r[b.id];T===void 0&&(g(b),T=u(b),r[b.id]=T,b.addEventListener("dispose",A));const R=w.program;i.updateUBOMapping(b,R);const _=e.render.frame;s[b.id]!==_&&(f(b),s[b.id]=_)}function u(b){const w=d();b.__bindingPointIndex=w;const T=n.createBuffer(),R=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,R,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,T),T}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const w=r[b.id],T=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,E=T.length;_<E;_++){const D=T[_];if(Array.isArray(D))for(let P=0,F=D.length;P<F;P++)h(D[P],_,P,R);else h(D,_,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(b,w,T,R){if(x(b,w,T,R)===!0){const _=b.__offset,E=b.value;if(Array.isArray(E)){let D=0;for(let P=0;P<E.length;P++){const F=E[P],Y=m(F);p(F,b.__data,D),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(D+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function p(b,w,T){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,T)}function x(b,w,T,R){const _=b.value,E=w+"_"+T;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{const D=R[E];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function g(b){const w=b.uniforms;let T=0;const R=16;for(let E=0,D=w.length;E<D;E++){const P=Array.isArray(w[E])?w[E]:[w[E]];for(let F=0,Y=P.length;F<Y;F++){const Q=P[F],B=Array.isArray(Q.value)?Q.value:[Q.value];for(let J=0,V=B.length;J<V;J++){const ne=B[J],se=m(ne),ce=T%R,$=ce%se.boundary,q=ce+$;T+=$,q!==0&&R-q<se.storage&&(T+=R-q),Q.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=T,T+=se.storage}}}const _=T%R;return _>0&&(T+=R-_),b.__size=T,b.__cache={},this}function m(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",b),w}function A(b){const w=b.target;w.removeEventListener("dispose",A);const T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function C(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:C}}const cv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let En=null;function uv(){return En===null&&(En=new hl(cv,16,16,Di,Xn),En.name="DFG_LUT",En.minFilter=Ot,En.magFilter=Ot,En.wrapS=Hn,En.wrapT=Hn,En.generateMipmaps=!1,En.needsUpdate=!0),En}class dv{constructor(e={}){const{canvas:t=Rf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=jt}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=h,g=new Set([ll,ol,al]),m=new Set([jt,Ln,Gr,Hr,il,rl]),A=new Uint32Array(4),C=new Int32Array(4),b=new k;let w=null,T=null;const R=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,F=null,Y=null,Q=null,B=null;this._outputColorSpace=Xt;let J=0,V=0,ne=null,se=-1,ce=null;const $=new pt,q=new pt;let ye=null;const Le=new Je(0);let Ce=0,W=t.width,re=t.height,te=1,he=null,Oe=null;const De=new pt(0,0,W,re),_t=new pt(0,0,W,re);let $e=!1;const lt=new pl;let it=!1,Qe=!1;const yt=new dt,Tt=new k,Rt=new pt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function St(){return ne===null?te:1}let U=i;function Vt(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${el}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),U===null){const N="webgl2";if(U=Vt(N,M),U===null)throw Vt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Ze("WebGLRenderer: "+M.message),M}let st,y,v,O,H,K,ae,le,Z,ee,ue,Ae,pe,de,Pe,Ue,ke,L,oe,j,fe,_e,ie;function Te(){st=new u0(U),st.init(),fe=new tv(U,st),y=new n0(U,st,e,fe),v=new jg(U,st),y.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),Y=U.createFramebuffer(),Q=U.createFramebuffer(),B=U.createFramebuffer(),O=new h0(U),H=new Bg,K=new ev(U,st,v,H,y,fe,O),ae=new c0(D),le=new vh(U),_e=new e0(U,le),Z=new d0(U,le,O,_e),ee=new m0(U,Z,le,_e,O),L=new p0(U,y,K),Pe=new i0(H),ue=new kg(D,ae,st,y,_e,Pe),Ae=new ov(D,H),pe=new Gg,de=new qg(st),ke=new jm(D,ae,v,ee,p,l),Ue=new Qg(D,ee,y),ie=new lv(U,O,y,v),oe=new t0(U,st,O),j=new f0(U,st,O),O.programs=ue.programs,D.capabilities=y,D.extensions=st,D.properties=H,D.renderLists=pe,D.shadowMap=Ue,D.state=v,D.info=O}Te(),x!==jt&&(E=new v0(x,t.width,t.height,o,r,s));const Se=new sv(D,U);this.xr=Se,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=st.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=st.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(W,re,!1))},this.getSize=function(M){return M.set(W,re)},this.setSize=function(M,N,X=!0){if(Se.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}W=M,re=N,t.width=Math.floor(M*te),t.height=Math.floor(N*te),X===!0&&(t.style.width=M+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(W*te,re*te).floor()},this.setDrawingBufferSize=function(M,N,X){W=M,re=N,te=X,t.width=Math.floor(M*X),t.height=Math.floor(N*X),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(x===jt){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy($)},this.getViewport=function(M){return M.copy(De)},this.setViewport=function(M,N,X,z){M.isVector4?De.set(M.x,M.y,M.z,M.w):De.set(M,N,X,z),v.viewport($.copy(De).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(_t)},this.setScissor=function(M,N,X,z){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,N,X,z),v.scissor(q.copy(_t).multiplyScalar(te).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(M){v.setScissorTest($e=M)},this.setOpaqueSort=function(M){he=M},this.setTransparentSort=function(M){Oe=M},this.getClearColor=function(M){return M.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,X=!0){let z=0;if(M){let G=!1;if(ne!==null){const ve=ne.texture.format;G=g.has(ve)}if(G){const ve=ne.texture.type,Me=m.has(ve),ge=ke.getClearColor(),Ee=ke.getClearAlpha(),we=ge.r,Be=ge.g,Ve=ge.b;Me?(A[0]=we,A[1]=Be,A[2]=Ve,A[3]=Ee,U.clearBufferuiv(U.COLOR,0,A)):(C[0]=we,C[1]=Be,C[2]=Ve,C[3]=Ee,U.clearBufferiv(U.COLOR,0,C))}else z|=U.COLOR_BUFFER_BIT}N&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),ke.dispose(),pe.dispose(),de.dispose(),H.dispose(),ae.dispose(),ee.dispose(),_e.dispose(),ie.dispose(),ue.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",xl),Se.removeEventListener("sessionend",Ml),pi.stop()};function gt(M){M.preventDefault(),$l("WebGLRenderer: Context Lost."),P=!0}function ft(){$l("WebGLRenderer: Context Restored."),P=!1;const M=O.autoReset,N=Ue.enabled,X=Ue.autoUpdate,z=Ue.needsUpdate,G=Ue.type;Te(),O.autoReset=M,Ue.enabled=N,Ue.autoUpdate=X,Ue.needsUpdate=z,Ue.type=G}function Mn(M){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function bn(M){const N=M.target;N.removeEventListener("dispose",bn),Ju(N)}function Ju(M){Qu(M),H.remove(M)}function Qu(M){const N=H.get(M).programs;N!==void 0&&(N.forEach(function(X){ue.releaseProgram(X)}),M.isShaderMaterial&&ue.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,X,z,G,ve){N===null&&(N=It);const Me=G.isMesh&&G.matrixWorld.determinantAffine()<0,ge=td(M,N,X,z,G);v.setMaterial(z,Me);let Ee=X.index,we=1;if(z.wireframe===!0){if(Ee=Z.getWireframeAttribute(X),Ee===void 0)return;we=2}const Be=X.drawRange,Ve=X.attributes.position;let Re=Be.start*we,ot=(Be.start+Be.count)*we;ve!==null&&(Re=Math.max(Re,ve.start*we),ot=Math.min(ot,(ve.start+ve.count)*we)),Ee!==null?(Re=Math.max(Re,0),ot=Math.min(ot,Ee.count)):Ve!=null&&(Re=Math.max(Re,0),ot=Math.min(ot,Ve.count));const xt=ot-Re;if(xt<0||xt===1/0)return;_e.setup(G,z,ge,X,Ee);let vt,ct=oe;if(Ee!==null&&(vt=le.get(Ee),ct=j,ct.setIndex(vt)),G.isMesh)z.wireframe===!0?(v.setLineWidth(z.wireframeLinewidth*St()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(G.isLine){let Ut=z.linewidth;Ut===void 0&&(Ut=1),v.setLineWidth(Ut*St()),G.isLineSegments?ct.setMode(U.LINES):G.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else G.isPoints?ct.setMode(U.POINTS):G.isSprite&&ct.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(st.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ut=G._multiDrawStarts,xe=G._multiDrawCounts,Kt=G._multiDrawCount,je=Ee?le.get(Ee).bytesPerElement:1,tn=H.get(z).currentProgram.getUniforms();for(let yn=0;yn<Kt;yn++)tn.setValue(U,"_gl_DrawID",yn),ct.render(Ut[yn]/je,xe[yn])}else if(G.isInstancedMesh)ct.renderInstances(Re,xt,G.count);else if(X.isInstancedBufferGeometry){const Ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,xe=Math.min(X.instanceCount,Ut);ct.renderInstances(Re,xt,xe)}else ct.render(Re,xt)};function _l(M,N,X){M.transparent===!0&&M.side===zn&&M.forceSinglePass===!1?(M.side=Yt,M.needsUpdate=!0,Qr(M,N,X),M.side=fi,M.needsUpdate=!0,Qr(M,N,X),M.side=zn):Qr(M,N,X)}this.compile=function(M,N,X=null){X===null&&(X=M),T=de.get(X),T.init(N),_.push(T),X.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),M!==X&&M.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const z=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ve=G.material;if(ve)if(Array.isArray(ve))for(let Me=0;Me<ve.length;Me++){const ge=ve[Me];_l(ge,X,G),z.add(ge)}else _l(ve,X,G),z.add(ve)}),T=_.pop(),z},this.compileAsync=function(M,N,X=null){const z=this.compile(M,N,X);return new Promise(G=>{function ve(){if(z.forEach(function(Me){H.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){G(M);return}setTimeout(ve,10)}st.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ta=null;function ju(M){ta&&ta(M)}function xl(){pi.stop()}function Ml(){pi.start()}const pi=new Gu;pi.setAnimationLoop(ju),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(M){ta=M,Se.setAnimationLoop(M),M===null?pi.stop():pi.start()},Se.addEventListener("sessionstart",xl),Se.addEventListener("sessionend",Ml),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(M,N);const X=Se.enabled===!0&&Se.isPresenting===!0,z=E!==null&&(ne===null||X)&&E.begin(D,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(N),N=Se.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,N,ne),T=de.get(M,_.length),T.init(N),T.state.textureUnits=K.getTextureUnits(),_.push(T),yt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),lt.setFromProjectionMatrix(yt,Cn,N.reversedDepth),Qe=this.localClippingEnabled,it=Pe.init(this.clippingPlanes,Qe),w=pe.get(M,R.length),w.init(),R.push(w),Se.enabled===!0&&Se.isPresenting===!0){const Me=D.xr.getDepthSensingMesh();Me!==null&&na(Me,N,-1/0,D.sortObjects)}na(M,N,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(he,Oe,N.reversedDepth),mt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,mt&&ke.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),it===!0&&Pe.beginShadows();const G=T.state.shadowsArray;if(Ue.render(G,M,N),it===!0&&Pe.endShadows(),(z&&E.hasRenderPass())===!1){const Me=w.opaque,ge=w.transmissive;if(T.setupLights(),N.isArrayCamera){const Ee=N.cameras;if(ge.length>0)for(let we=0,Be=Ee.length;we<Be;we++){const Ve=Ee[we];yl(Me,ge,M,Ve)}mt&&ke.render(M);for(let we=0,Be=Ee.length;we<Be;we++){const Ve=Ee[we];bl(w,M,Ve,Ve.viewport)}}else ge.length>0&&yl(Me,ge,M,N),mt&&ke.render(M),bl(w,M,N)}ne!==null&&V===0&&(K.updateMultisampleRenderTarget(ne),K.updateRenderTargetMipmap(ne)),z&&E.end(D),M.isScene===!0&&M.onAfterRender(D,M,N),_e.resetDefaultState(),se=-1,ce=null,_.pop(),_.length>0?(T=_[_.length-1],K.setTextureUnits(T.state.textureUnits),it===!0&&Pe.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,F!==null&&F.renderEnd()};function na(M,N,X,z){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||lt.intersectsSprite(M)){z&&Rt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(yt);const Me=ee.update(M),ge=M.material;ge.visible&&w.push(M,Me,ge,X,Rt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||lt.intersectsObject(M))){const Me=ee.update(M),ge=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Rt.copy(M.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Rt.copy(Me.boundingSphere.center)),Rt.applyMatrix4(M.matrixWorld).applyMatrix4(yt)),Array.isArray(ge)){const Ee=Me.groups;for(let we=0,Be=Ee.length;we<Be;we++){const Ve=Ee[we],Re=ge[Ve.materialIndex];Re&&Re.visible&&w.push(M,Me,Re,X,Rt.z,Ve)}}else ge.visible&&w.push(M,Me,ge,X,Rt.z,null)}}const ve=M.children;for(let Me=0,ge=ve.length;Me<ge;Me++)na(ve[Me],N,X,z)}function bl(M,N,X,z){const{opaque:G,transmissive:ve,transparent:Me}=M;T.setupLightsView(X),it===!0&&Pe.setGlobalState(D.clippingPlanes,X),z&&v.viewport($.copy(z)),G.length>0&&Jr(G,N,X),ve.length>0&&Jr(ve,N,X),Me.length>0&&Jr(Me,N,X),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function yl(M,N,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Re=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new In(1,1,{generateMipmaps:!0,type:Re?Xn:jt,minFilter:Ei,samples:Math.max(4,y.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const ve=T.state.transmissionRenderTarget[z.id],Me=z.viewport||$;ve.setSize(Me.z*D.transmissionResolutionScale,Me.w*D.transmissionResolutionScale);const ge=D.getRenderTarget(),Ee=D.getActiveCubeFace(),we=D.getActiveMipmapLevel();D.setRenderTarget(ve),D.getClearColor(Le),Ce=D.getClearAlpha(),Ce<1&&D.setClearColor(16777215,.5),D.clear(),mt&&ke.render(X);const Be=D.toneMapping;D.toneMapping=Pn;const Ve=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),it===!0&&Pe.setGlobalState(D.clippingPlanes,z),Jr(M,X,z),K.updateMultisampleRenderTarget(ve),K.updateRenderTargetMipmap(ve),st.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ot=0,xt=N.length;ot<xt;ot++){const vt=N[ot],{object:ct,geometry:Ut,material:xe,group:Kt}=vt;if(xe.side===zn&&ct.layers.test(z.layers)){const je=xe.side;xe.side=Yt,xe.needsUpdate=!0,Sl(ct,X,z,Ut,xe,Kt),xe.side=je,xe.needsUpdate=!0,Re=!0}}Re===!0&&(K.updateMultisampleRenderTarget(ve),K.updateRenderTargetMipmap(ve))}D.setRenderTarget(ge,Ee,we),D.setClearColor(Le,Ce),Ve!==void 0&&(z.viewport=Ve),D.toneMapping=Be}function Jr(M,N,X){const z=N.isScene===!0?N.overrideMaterial:null;for(let G=0,ve=M.length;G<ve;G++){const Me=M[G],{object:ge,geometry:Ee,group:we}=Me;let Be=Me.material;Be.allowOverride===!0&&z!==null&&(Be=z),ge.layers.test(X.layers)&&Sl(ge,N,X,Ee,Be,we)}}function Sl(M,N,X,z,G,ve){M.onBeforeRender(D,N,X,z,G,ve),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(D,N,X,z,M,ve),G.transparent===!0&&G.side===zn&&G.forceSinglePass===!1?(G.side=Yt,G.needsUpdate=!0,D.renderBufferDirect(X,N,z,G,M,ve),G.side=fi,G.needsUpdate=!0,D.renderBufferDirect(X,N,z,G,M,ve),G.side=zn):D.renderBufferDirect(X,N,z,G,M,ve),M.onAfterRender(D,N,X,z,G,ve)}function Qr(M,N,X){N.isScene!==!0&&(N=It);const z=H.get(M),G=T.state.lights,ve=T.state.shadowsArray,Me=G.state.version,ge=ue.getParameters(M,G.state,ve,N,X,T.state.lightProbeGridArray),Ee=ue.getProgramCacheKey(ge);let we=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;const Be=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=ae.get(M.envMap||z.environment,Be),z.envMapRotation=z.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",bn),we=new Map,z.programs=we);let Ve=we.get(Ee);if(Ve!==void 0){if(z.currentProgram===Ve&&z.lightsStateVersion===Me)return Tl(M,ge),Ve}else ge.uniforms=ue.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,X,ge),M.onBeforeCompile(ge,D),Ve=ue.acquireProgram(ge,Ee),we.set(Ee,Ve),z.uniforms=ge.uniforms;const Re=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Pe.uniform),Tl(M,ge),z.needsLights=id(M),z.lightsStateVersion=Me,z.needsLights&&(Re.ambientLightColor.value=G.state.ambient,Re.lightProbe.value=G.state.probe,Re.directionalLights.value=G.state.directional,Re.directionalLightShadows.value=G.state.directionalShadow,Re.spotLights.value=G.state.spot,Re.spotLightShadows.value=G.state.spotShadow,Re.rectAreaLights.value=G.state.rectArea,Re.ltc_1.value=G.state.rectAreaLTC1,Re.ltc_2.value=G.state.rectAreaLTC2,Re.pointLights.value=G.state.point,Re.pointLightShadows.value=G.state.pointShadow,Re.hemisphereLights.value=G.state.hemi,Re.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Re.spotLightMatrix.value=G.state.spotLightMatrix,Re.spotLightMap.value=G.state.spotLightMap,Re.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Ve,z.uniformsList=null,Ve}function El(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Ns.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Tl(M,N){const X=H.get(M);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function ed(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(N.matrixWorld);for(let X=0,z=M.length;X<z;X++){const G=M[X];if(G.texture!==null&&G.boundingBox.containsPoint(b))return G}return null}function td(M,N,X,z,G){N.isScene!==!0&&(N=It),K.resetTextureUnits();const ve=N.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,ge=ne===null?D.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ye.workingColorSpace,Ee=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,we=ae.get(z.envMap||Me,Ee),Be=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ve=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,xt=!!X.morphAttributes.color;let vt=Pn;z.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(vt=D.toneMapping);const ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ut=ct!==void 0?ct.length:0,xe=H.get(z),Kt=T.state.lights;if(it===!0&&(Qe===!0||M!==ce)){const ht=M===ce&&z.id===se;Pe.setState(z,M,ht)}let je=!1;z.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Kt.state.version||xe.outputColorSpace!==ge||G.isBatchedMesh&&xe.batching===!1||!G.isBatchedMesh&&xe.batching===!0||G.isBatchedMesh&&xe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xe.instancing===!1||!G.isInstancedMesh&&xe.instancing===!0||G.isSkinnedMesh&&xe.skinning===!1||!G.isSkinnedMesh&&xe.skinning===!0||G.isInstancedMesh&&xe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xe.instancingMorph===!1&&G.morphTexture!==null||xe.envMap!==we||z.fog===!0&&xe.fog!==ve||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Pe.numPlanes||xe.numIntersection!==Pe.numIntersection)||xe.vertexAlphas!==Be||xe.vertexTangents!==Ve||xe.morphTargets!==Re||xe.morphNormals!==ot||xe.morphColors!==xt||xe.toneMapping!==vt||xe.morphTargetsCount!==Ut||!!xe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,xe.__version=z.version);let tn=xe.currentProgram;je===!0&&(tn=Qr(z,N,G),F&&z.isNodeMaterial&&F.onUpdateProgram(z,tn,xe));let yn=!1,Kn=!1,Oi=!1;const ut=tn.getUniforms(),Mt=xe.uniforms;if(v.useProgram(tn.program)&&(yn=!0,Kn=!0,Oi=!0),z.id!==se&&(se=z.id,Kn=!0),xe.needsLights){const ht=ed(T.state.lightProbeGridArray,G);xe.lightProbeGrid!==ht&&(xe.lightProbeGrid=ht,Kn=!0)}if(yn||ce!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ut.setValue(U,"projectionMatrix",M.projectionMatrix),ut.setValue(U,"viewMatrix",M.matrixWorldInverse);const Jn=ut.map.cameraPosition;Jn!==void 0&&Jn.setValue(U,Tt.setFromMatrixPosition(M.matrixWorld)),y.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),ce!==M&&(ce=M,Kn=!0,Oi=!0)}if(xe.needsLights&&(Kt.state.directionalShadowMap.length>0&&ut.setValue(U,"directionalShadowMap",Kt.state.directionalShadowMap,K),Kt.state.spotShadowMap.length>0&&ut.setValue(U,"spotShadowMap",Kt.state.spotShadowMap,K),Kt.state.pointShadowMap.length>0&&ut.setValue(U,"pointShadowMap",Kt.state.pointShadowMap,K)),G.isSkinnedMesh){ut.setOptional(U,G,"bindMatrix"),ut.setOptional(U,G,"bindMatrixInverse");const ht=G.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),ut.setValue(U,"boneTexture",ht.boneTexture,K))}G.isBatchedMesh&&(ut.setOptional(U,G,"batchingTexture"),ut.setValue(U,"batchingTexture",G._matricesTexture,K),ut.setOptional(U,G,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",G._indirectTexture,K),ut.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",G._colorsTexture,K));const Zn=X.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&L.update(G,X,tn),(Kn||xe.receiveShadow!==G.receiveShadow)&&(xe.receiveShadow=G.receiveShadow,ut.setValue(U,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Mt.envMapIntensity.value=N.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=uv()),Kn){if(ut.setValue(U,"toneMappingExposure",D.toneMappingExposure),xe.needsLights&&nd(Mt,Oi),ve&&z.fog===!0&&Ae.refreshFogUniforms(Mt,ve),Ae.refreshMaterialUniforms(Mt,z,te,re,T.state.transmissionRenderTarget[M.id]),xe.needsLights&&xe.lightProbeGrid){const ht=xe.lightProbeGrid;Mt.probesSH.value=ht.texture,Mt.probesMin.value.copy(ht.boundingBox.min),Mt.probesMax.value.copy(ht.boundingBox.max),Mt.probesResolution.value.copy(ht.resolution)}Ns.upload(U,El(xe),Mt,K)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ns.upload(U,El(xe),Mt,K),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(U,"center",G.center),ut.setValue(U,"modelViewMatrix",G.modelViewMatrix),ut.setValue(U,"normalMatrix",G.normalMatrix),ut.setValue(U,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ht=z.uniformsGroups;for(let Jn=0,ki=ht.length;Jn<ki;Jn++){const Al=ht[Jn];ie.update(Al,tn),ie.bind(Al,tn)}}return tn}function nd(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function id(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,N,X){const z=H.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(M.texture).__webglTexture=N,H.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const X=H.get(M);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,X=0){ne=M,J=N,V=X;let z=null,G=!1,ve=!1;if(M){const ge=H.get(M);if(ge.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,ge.__webglFramebuffer),$.copy(M.viewport),q.copy(M.scissor),ye=M.scissorTest,v.viewport($),v.scissor(q),v.setScissorTest(ye),se=-1;return}else if(ge.__webglFramebuffer===void 0)K.setupRenderTarget(M);else if(ge.__hasExternalTextures)K.rebindTextures(M,H.get(M.texture).__webglTexture,H.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Be=M.depthTexture;if(ge.__boundDepthTexture!==Be){if(Be!==null&&H.has(Be)&&(M.width!==Be.image.width||M.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(M)}}const Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ve=!0);const we=H.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(we[N])?z=we[N][X]:z=we[N],G=!0):M.samples>0&&K.useMultisampledRTT(M)===!1?z=H.get(M).__webglMultisampledFramebuffer:Array.isArray(we)?z=we[X]:z=we,$.copy(M.viewport),q.copy(M.scissor),ye=M.scissorTest}else $.copy(De).multiplyScalar(te).floor(),q.copy(_t).multiplyScalar(te).floor(),ye=$e;if(X!==0&&(z=Y),v.bindFramebuffer(U.FRAMEBUFFER,z)&&v.drawBuffers(M,z),v.viewport($),v.scissor(q),v.setScissorTest(ye),G){const ge=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,ge.__webglTexture,X)}else if(ve){const ge=N;for(let Ee=0;Ee<M.textures.length;Ee++){const we=H.get(M.textures[Ee]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ee,we.__webglTexture,X,ge)}}else if(M!==null&&X!==0){const ge=H.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ge.__webglTexture,X)}se=-1},this.readRenderTargetPixels=function(M,N,X,z,G,ve,Me,ge=0){if(!(M&&M.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Ee=Ee[Me]),Ee){v.bindFramebuffer(U.FRAMEBUFFER,Ee);try{const we=M.textures[ge],Be=we.format,Ve=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!y.textureFormatReadable(Be)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!y.textureTypeReadable(Ve)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-z&&X>=0&&X<=M.height-G&&U.readPixels(N,X,z,G,fe.convert(Be),fe.convert(Ve),ve)}finally{const we=ne!==null?H.get(ne).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,N,X,z,G,ve,Me,ge=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(Ee=Ee[Me]),Ee)if(N>=0&&N<=M.width-z&&X>=0&&X<=M.height-G){v.bindFramebuffer(U.FRAMEBUFFER,Ee);const we=M.textures[ge],Be=we.format,Ve=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ge),!y.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!y.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.bufferData(U.PIXEL_PACK_BUFFER,ve.byteLength,U.STREAM_READ),U.readPixels(N,X,z,G,fe.convert(Be),fe.convert(Ve),0);const ot=ne!==null?H.get(ne).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,ot);const xt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Cf(U,xt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ve),U.deleteBuffer(Re),U.deleteSync(xt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,X=0){const z=Math.pow(2,-X),G=Math.floor(M.image.width*z),ve=Math.floor(M.image.height*z),Me=N!==null?N.x:0,ge=N!==null?N.y:0;K.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Me,ge,G,ve),v.unbindTexture()},this.copyTextureToTexture=function(M,N,X=null,z=null,G=0,ve=0){let Me,ge,Ee,we,Be,Ve,Re,ot,xt;const vt=M.isCompressedTexture?M.mipmaps[ve]:M.image;if(X!==null)Me=X.max.x-X.min.x,ge=X.max.y-X.min.y,Ee=X.isBox3?X.max.z-X.min.z:1,we=X.min.x,Be=X.min.y,Ve=X.isBox3?X.min.z:0;else{const Mt=Math.pow(2,-G);Me=Math.floor(vt.width*Mt),ge=Math.floor(vt.height*Mt),M.isDataArrayTexture?Ee=vt.depth:M.isData3DTexture?Ee=Math.floor(vt.depth*Mt):Ee=1,we=0,Be=0,Ve=0}z!==null?(Re=z.x,ot=z.y,xt=z.z):(Re=0,ot=0,xt=0);const ct=fe.convert(N.format),Ut=fe.convert(N.type);let xe;N.isData3DTexture?(K.setTexture3D(N,0),xe=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(K.setTexture2DArray(N,0),xe=U.TEXTURE_2D_ARRAY):(K.setTexture2D(N,0),xe=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Kt=v.getParameter(U.UNPACK_ROW_LENGTH),je=v.getParameter(U.UNPACK_IMAGE_HEIGHT),tn=v.getParameter(U.UNPACK_SKIP_PIXELS),yn=v.getParameter(U.UNPACK_SKIP_ROWS),Kn=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,vt.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,vt.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,we),v.pixelStorei(U.UNPACK_SKIP_ROWS,Be),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Ve);const Oi=M.isDataArrayTexture||M.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const Mt=H.get(M),Zn=H.get(N),ht=H.get(Mt.__renderTarget),Jn=H.get(Zn.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,ht.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let ki=0;ki<Ee;ki++)Oi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(M).__webglTexture,G,Ve+ki),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(N).__webglTexture,ve,xt+ki)),U.blitFramebuffer(we,Be,Me,ge,Re,ot,Me,ge,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||H.has(M)){const Mt=H.get(M),Zn=H.get(N);v.bindFramebuffer(U.READ_FRAMEBUFFER,Q),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,B);for(let ht=0;ht<Ee;ht++)Oi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.__webglTexture,G,Ve+ht):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Mt.__webglTexture,G),ut?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Zn.__webglTexture,ve,xt+ht):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Zn.__webglTexture,ve),G!==0?U.blitFramebuffer(we,Be,Me,ge,Re,ot,Me,ge,U.COLOR_BUFFER_BIT,U.NEAREST):ut?U.copyTexSubImage3D(xe,ve,Re,ot,xt+ht,we,Be,Me,ge):U.copyTexSubImage2D(xe,ve,Re,ot,we,Be,Me,ge);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ut?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(xe,ve,Re,ot,xt,Me,ge,Ee,ct,Ut,vt.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(xe,ve,Re,ot,xt,Me,ge,Ee,ct,vt.data):U.texSubImage3D(xe,ve,Re,ot,xt,Me,ge,Ee,ct,Ut,vt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ve,Re,ot,Me,ge,ct,Ut,vt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ve,Re,ot,vt.width,vt.height,ct,vt.data):U.texSubImage2D(U.TEXTURE_2D,ve,Re,ot,Me,ge,ct,Ut,vt);v.pixelStorei(U.UNPACK_ROW_LENGTH,Kt),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,je),v.pixelStorei(U.UNPACK_SKIP_PIXELS,tn),v.pixelStorei(U.UNPACK_SKIP_ROWS,yn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Kn),ve===0&&N.generateMipmaps&&U.generateMipmap(xe),v.unbindTexture()},this.initRenderTarget=function(M){H.get(M).__webglFramebuffer===void 0&&K.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?K.setTextureCube(M,0):M.isData3DTexture?K.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?K.setTexture2DArray(M,0):K.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){J=0,V=0,ne=null,v.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}function ml(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,o=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,l=(r*128+s)*4;t[l]=t[l+1]=t[l+2]=Math.max(0,Math.min(255,o)),t[l+3]=255}const i=new hl(t,128,128);return i.wrapS=i.wrapT=ks,i.colorSpace=Xt,i.needsUpdate=!0,i}const Ho=ml("wood"),Ku=ml("stone"),Dr=ml("cloth"),S={stone:new bt({color:Qn.materials.stone,map:Ku,roughness:.72}),wall:new bt({color:Qn.materials.wall,roughness:.88}),wood:new bt({color:Qn.materials.wood,map:Ho,roughness:.52}),walnut:new bt({color:Qn.materials.darkWood,map:Ho,roughness:.5}),gold:new bt({color:Qn.materials.metal,metalness:.7,roughness:.36}),navy:new bt({color:Qn.materials.blue,roughness:.65}),white:new bt({color:Qn.materials.linen,map:Dr,roughness:.93}),teal:new bt({color:Qn.materials.accent,map:Dr,roughness:.83}),rust:new bt({color:9920067,map:Dr,roughness:.84}),carpet:new bt({color:6845561,map:Dr,roughness:1}),black:new bt({color:1449508,roughness:.6}),green:new bt({color:3495746,roughness:.86}),leaf:new bt({color:6651984,roughness:.8}),glass:new bt({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new bt({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new bt({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new bt({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new bt({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new bt({color:14000506,roughness:.9}),hair:new bt({color:2433314,roughness:.9}),ao:new Kr({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},Vo=new Map;function fv(n){let e=Vo.get(n);return e||(e=new bt({color:n,roughness:.75}),Vo.set(n,e)),e}function hv(){Object.values(S).forEach(n=>n.dispose()),Vo.forEach(n=>n.dispose()),[Ho,Ku,Dr].forEach(n=>n.dispose())}const Zr={box:new _r(1,1,1),cylinder:new Ys(1,1,1,12),sphere:new Ws(1,12,8),leaf:new Ws(1,8,6),cone:new Ks(1,1,16),plane:new xr(1,1)};function I(n,e,t,i,r,s,a,o=S.wood){const l=new Pt(Zr.box,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function We(n,e,t,i,r,s,a=S.gold){const o=new Pt(Zr.cylinder,a);return o.position.set(e,t,i),o.scale.set(r,s,r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Tn(n,e,t,i,r,s,a,o=S.leaf){const l=new Pt(Zr.sphere,o);return l.position.set(e,t,i),l.scale.set(r,s,a),l.castShadow=!0,n.add(l),l}function js(n,e,t,i,r,s=.022){const a=new Pt(Zr.plane,S.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function zt(n,e,t,i=1,r=0){const s=new kt;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),We(s,0,.21,0,.21,.42,S.stone),We(s,0,.76,0,.027,1.1,S.walnut);for(let a=0;a<9;a++){const o=a*2.4,l=.65+a*.073;Tn(s,Math.sin(o)*.2,l,Math.cos(o)*.17,.24,.095,.12,a%2?S.leaf:S.green).rotation.set(.3,o,Math.sin(o)*.65)}return js(s,0,0,.7,.55),s}function wn(n,e,t,i,r=1){const s=new kt;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),We(s,0,.035,0,.11,.045,S.gold),We(s,0,.21,0,.019,.36,S.gold),We(s,0,.42,0,.16,.22,S.shade),We(s,0,.315,0,.135,.015,S.glow),s}function Ai(n,e,t,i=0,r=S.teal){const s=new kt;s.position.set(e,0,t),s.rotation.y=i,n.add(s),I(s,0,.43,0,.55,.14,.56,r),I(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const o of[-1,1])We(s,a*.2,.2,o*.2,.025,.4,S.walnut);return s}function Bn(n,e,t,i=0,r=1.5,s=S.teal){const a=new kt;a.position.set(e,0,t),a.rotation.y=i,n.add(a),I(a,0,.32,0,r,.42,.64,s),I(a,0,.66,-.29,r,.65,.18,s);for(const o of[-1,1])I(a,o*(r/2-.08),.56,0,.16,.4,.7,s),I(a,o*r*.23,.55,-.17,.35,.28,.11,S.white);return I(a,0,.58,.04,r-.3,.11,.44,s),js(a,0,0,r+.15,.95),a}function ai(n,e,t,i=.42){We(n,e,.37,t,.055,.74,S.gold),We(n,e,.75,t,i,.07,S.stone),We(n,e,.04,t,i*.5,.06,S.walnut)}function Or(n,e,t,i){We(n,e,t,i,.07,.13,S.white),We(n,e,t-.065,i,.12,.018,S.white)}function wi(n,e,t,i,r=1.15,s=.65,a=0){I(n,e,t,i,r+.07,s+.07,.06,S.gold),I(n,e,t,i+.04,r,s,.015,S.white),I(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?S.teal:S.window),I(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,S.stone),Tn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,S.rust)}function pv(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof Pt)||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new Uu(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function mv(n){const e=n.level??1,t=new kt;t.name=n.id,t.userData.entityId=n.id,I(t,0,.04,0,4.7,.08,3.1,e>=4?S.stone:e>=2?S.walnut:S.wood),I(t,0,1.19,-1.51,4.7,2.38,.14,S.wall),I(t,2.35,1.14,-.1,.1,2.28,2.75,S.stone),I(t,1.6,1.25,-1.41,1.05,1.9,.035,S.window);for(const a of[1.1,1.6,2.1])I(t,a,1.25,-1.35,.035,1.94,.04,S.gold);I(t,1.6,1.25,-1.35,1.08,.04,.04,S.gold);for(let a=1.03;a<1.26;a+=.06)I(t,a,1.28,-1.23,.04,1.94,.13,S.white);if(I(t,0,2.27,-1.27,4.53,.06,.065,S.glow),n.construction){for(const a of[-1.8,0,1.8])I(t,a,1.05,1.5,.07,2.1,.07,S.gold),I(t,a,.4,.4,.65,.7,.7,S.stone);for(const a of[.5,1.4,2.15])I(t,0,a,1.5,4.5,.06,.06,S.gold);return I(t,0,.8,1.55,4.5,.48,.06,S.navy),t}if(n.status==="unbuilt")return I(t,0,.12,0,3.8,.08,2.5,S.stone),t;const i=qc(n),r=$c(n)==="twin";I(t,-.67,.078,.07,2.85,.02,2.66,S.carpet);const s=(a,o)=>{I(t,a,.28,-.03,o+.09,.39,1.9,S.walnut),I(t,a,.51,.02,o,.23,1.85,n.status==="dirty"?S.stone:S.white),I(t,a,.7,-.98,o+.13,1.22,.12,S.walnut),I(t,a,.82,-.89,o-.05,.63,.08,S.teal),I(t,a,.67,-.58,o*.82,.13,.36,S.white),e>=2&&(I(t,a,.78,-.72,o*.78,.12,.25,S.white),I(t,a,.655,.18,o,.045,.45,e>=4?S.white:S.teal)),I(t,a,.646,.54,o,.075,.39,e>=4?S.gold:i?S.rust:S.teal),I(t,a,.49,1,o,.28,.04,S.white),js(t,a,0,o+.25,2.25)};r?(s(-1.36,.88),s(-.22,.88)):s(-.75,1.68);for(const a of[-1.94,.43])I(t,a,.35,-.76,.41,.58,.5,S.walnut),I(t,a,.66,-.76,.45,.06,.53,S.stone),wn(t,a,.69,-.77,.8);if(wi(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)I(t,1.65,.38,-.4,.9,.65,.85,S.stone),I(t,1.65,.73,-.4,.85,.08,.8,S.white),We(t,1.65,.83,-.65,.025,.22,S.gold),I(t,2.16,1.25,-.35,.025,1.8,1.5,S.glass),I(t,1.6,1.93,-1.14,.3,.04,.25,S.gold),wi(t,1.5,1.6,-1.33,.8,.5,e),Bn(t,1.58,.76,-Math.PI/2,.75,S.white);else if(i)Bn(t,1.55,.22,-Math.PI/2,1.3,S.rust),ai(t,.97,.8,.25);else{I(t,1.61,.76,-.57,1.1,.1,.57,S.walnut);for(const a of[1.19,2.03])I(t,a,.37,-.57,.05,.75,.46,S.gold);I(t,1.59,.94,-.64,.35,.28,.04,S.screen),Ai(t,1.65,.06,Math.PI),wn(t,2,.82,-.62,.66)}if(di(n)==="view"||di(n)==="premium"){I(t,0,1.45,-1.4,4.15,1.65,.025,S.window);for(const a of[-2,0,2])I(t,a,1.45,-1.35,.045,1.7,.045,S.gold)}if(di(n)==="premium"&&(I(t,0,2.1,-1.25,4.5,.08,.08,S.gold),wi(t,-1.6,1.8,-1.3,.8,.4,99),zt(t,1.95,.55,1.15)),n.extraBed&&(I(t,.5,.25,1.02,.8,.3,.8,S.walnut),I(t,.5,.43,1.02,.8,.08,.8,S.white)),zt(t,2.05,1.05,.63),(n.level??1)>1&&(wi(t,-2.05,1.6,-1.38,.38,.56,n.level),zt(t,-2.05,.35,.55)),e>=3&&(wn(t,-1.94,1.25,-.9,1.1),I(t,-.75,1.62,-1.25,2.1,.025,.03,S.glow)),e>=5){I(t,0,1.4,-1.42,4.3,1.9,.025,S.window);for(const a of[-2,-.8,.8,2])I(t,a,1.4,-1.35,.04,1.95,.06,S.gold);for(const a of[-1.8,0,1.8])I(t,a,.09,.15,.025,.02,2.9,S.gold);for(const a of[2.12,2.24])I(t,0,a,-1.1,4.5,.035,.035,S.glow)}if((n.level??1)>2&&I(t,0,2.12,-1.3,4.55,.035,.055,S.gold),I(t,-2.12,.52,.95,.22,1,.28,S.walnut),n.status==="reserved"&&(n.suaBookingId&&I(t,0,1.1,1.62,.38,.5,.05,S.rust),I(t,1.2,.48,1.48,.25,.29,.1,S.gold)),n.status==="cleaning"){I(t,1.05,.37,1.57,.55,.55,.35,S.navy);for(const a of[.83,1.27])We(t,a,.09,1.57,.07,.07,S.black);I(t,1.05,.71,1.57,.6,.04,.41,S.gold),I(t,.95,.79,1.57,.3,.12,.22,S.white)}if(n.status==="occupied"&&I(t,0,2.23,.7,3.8,.035,.035,S.shade),n.status==="maintenance"){const a=I(t,.9,1.95,1.55,.17,.17,.08,S.glow);a.name="fault-lamp",a.userData.interactive=!0,I(t,.6,.33,.9,.8,.1,.8,S.rust),I(t,.6,.52,.9,.1,.6,.1,S.gold)}return t}function Rs(n,e,t,i=2.12){We(n,e,i+.13,t,.012,.45,S.gold),We(n,e,i-.08,t,.24,.18,S.gold),We(n,e,i-.18,t,.21,.015,S.glow)}function gv(n,e){if(I(n,0,1.2,-1.54,14.65,2.4,.14,S.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)I(n,t,1.2,-1.42,.035,2.38,.08,S.gold);else for(let t=-7;t<7;t+=.58)I(n,t,1.2,-1.43,.022,2.2,.04,S.wood)}function nr(n,e,t){I(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,S.window);for(let i=e;i<=t+.01;i+=.72)I(n,i,1.23,-1.32,.045,2.17,.06,S.gold);I(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,S.gold)}function vv(n,e,t){ai(n,e,t,.44),Ai(n,e-.63,t,Math.PI/2),Ai(n,e+.63,t,-Math.PI/2),Or(n,e-.18,.87,t),Or(n,e+.18,.87,t),We(n,e,.83,t,.065,.12,S.gold)}function Ba(n,e,t){I(n,e,1.23,-1.35,t,1.86,.18,S.walnut);for(let i=.53;i<2;i+=.39){I(n,e,i,-1.14,t,.04,.42,S.gold),I(n,e,i+.035,-1.18,t-.1,.025,.05,S.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;We(n,s,i+.13,-1.08,.048,.23,r%3?S.green:S.rust),We(n,s,i+.27,-1.08,.019,.07,S.gold)}}}function _v(n,e=1,t=100,i=!1){const r=new kt;if(n!=="rooftop"&&(gv(r,n),I(r,0,.04,0,14.66,.08,3.15,n==="lobby"?S.stone:S.wood),I(r,0,2.31,-1.21,14.5,.04,.07,S.glow)),i){for(const s of[-6,-3,0,3,6])I(r,s,1.1,1.4,.08,2.2,.08,S.gold);for(const s of[.5,1.5,2.1])I(r,0,s,1.4,14,.08,.08,S.gold);return I(r,0,.8,1.5,14,.65,.04,S.navy),r}if(n==="lobby"){nr(r,4.3,7.2),I(r,0,1.35,-1.33,6.7,1.8,.11,S.stone),I(r,0,.48,.5,6.2,.84,.62,S.walnut),I(r,0,.94,.5,6.45,.12,.83,S.stone),I(r,0,.15,.86,6.08,.075,.035,S.glow);for(let s=-2.9;s<3;s+=.18)I(r,s,.5,.824,.035,.6,.025,S.gold);for(const s of[-1.8,1.7])I(r,s,1.12,.2,.42,.29,.045,S.screen),wn(r,s+.55,1.02,.46,.72);zt(r,-3.9,-.7,1.72),zt(r,4,-.55,1.6),Bn(r,-5.75,.08,Math.PI/2,1.65,S.white),ai(r,-5.02,1,.47),zt(r,-6.4,1.4,.55),I(r,5.8,.045,1.18,2.2,.03,1.25,S.navy);for(const s of[4.65,6.95])I(r,s,1.13,.85,.08,2.28,.08,S.gold),I(r,s,1.17,.79,.65,2.18,.025,S.glass);I(r,5.8,2.18,1.24,2.6,.16,1.72,S.navy),I(r,5.8,2.08,2.03,2.55,.035,.04,S.gold);for(const s of[3.5,4.1])We(r,s,.67,1.8,.025,1.15,S.gold),We(r,s,.09,1.8,.08,.1,S.black);I(r,3.8,1.27,1.8,.65,.035,.04,S.gold),I(r,3.8,.18,1.8,.78,.08,.51,S.gold),I(r,3.76,.43,1.8,.37,.45,.25,S.rust);for(const s of[-2.8,0,2.8])Rs(r,s,.1,2.02)}else if(n==="breakfast"){nr(r,4.3,7.2),Ba(r,0,4.5),I(r,0,.52,-.15,5,.9,.8,S.walnut),I(r,0,1.01,-.15,5.2,.12,.97,S.stone);for(const s of t>0?[-1.7,-.7,.3]:[])I(r,s,1.14,-.17,.66,.14,.45,S.gold),I(r,s,1.24,-.17,.6,.08,.38,S.white);I(r,1.5,1.29,-.24,.43,.53,.38,S.black),We(r,2.1,1.28,-.2,.15,.4,S.glass),We(r,2.1,1.13,-.2,.145,.09,S.rust);for(const s of[-5.55,-3.4,3.8,6])vv(r,s,.68);for(const s of[-5.55,-3.4,0,3.8,6])Rs(r,s,.5);zt(r,-6.9,-.87,1.1),zt(r,6.8,-.8,1.1)}else if(n==="club"){nr(r,-7.2,-3.8),nr(r,3.8,7.2),Ba(r,0,5.4),I(r,0,.58,-.24,5.55,1.02,.58,S.walnut),I(r,0,1.12,-.24,5.8,.11,.79,S.stone),I(r,0,.25,.071,5.5,.05,.035,S.glow);for(const s of[-1.8,-.6,.6,1.8])We(r,s,.6,.6,.24,.12,S.teal),We(r,s,.28,.6,.035,.58,S.gold),t>0&&Or(r,s,1.24,-.15),Rs(r,s,-.24);Bn(r,-5.6,-.54,0,2.05,S.teal),ai(r,-5.6,.57,.5),Ai(r,-4.38,.75,-Math.PI/3,S.rust),Bn(r,5.25,-.54,0,2.1,S.rust),ai(r,5.25,.6,.52),Ai(r,6.52,.7,-Math.PI/3,S.teal),zt(r,-6.9,.68,1.2),zt(r,6.9,-.8,1.25),wn(r,-4.15,.05,-.8,1.6)}else if(n==="gym"){nr(r,-7.2,7.2),I(r,0,.093,0,14.4,.025,2.9,S.carpet);for(const s of[-5.65,-3.8,-1.95]){I(r,s,.16,.15,.92,.21,1.72,S.black),I(r,s,.28,.17,.68,.015,1.42,S.carpet);for(const a of[-1,1])I(r,s+a*.42,.7,-.51,.075,1.1,.08,S.black),I(r,s+a*.42,1.13,-.2,.06,.06,.75,S.black);I(r,s,1.26,-.5,.85,.23,.14,S.black),I(r,s,1.3,-.409,.43,.12,.012,S.screen)}for(const s of[.1,1.65]){const a=We(r,s,.41,.1,.36,.12,S.black);a.rotation.z=Math.PI/2,I(r,s,.39,.2,.07,.69,.09,S.gold),I(r,s,.81,.47,.37,.09,.24,S.black),I(r,s,1.05,-.32,.07,.55,.07,S.black),I(r,s,1.27,-.32,.5,.06,.07,S.gold)}I(r,5.45,.68,-.8,2.8,.07,.58,S.black);for(let s=4.2;s<6.8;s+=.46)We(r,s,.82,-.8,.13,.16,S.black);for(const s of[3.65,5.2])I(r,s,.12,.61,1.08,.025,1.68,S.teal);zt(r,6.93,.82,1.2),I(r,2.76,.4,-.87,.6,.7,.53,S.walnut);for(let s=0;s<3;s++)I(r,2.76,.79+s*.065,-.87,.46,.065,.4,S.white)}else if(n==="spa"){nr(r,-7.2,7.2);for(const s of[-4.8,0,4.8]){I(r,s,.4,0,1.7,.6,2.05,S.walnut),I(r,s,.76,0,1.8,.14,2.1,S.white),I(r,s,.87,-.6,1.15,.12,.45,S.white),I(r,s,.86,.4,1.8,.03,.7,S.teal),zt(r,s+1.2,-.9,1.1),wn(r,s-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)I(r,s+1.2,.15+a*.06,.75,.5,.06,.32,S.white)}}else{I(r,0,.03,0,15,.14,3.6,S.wood);for(let s=-7.3;s<7.4;s+=.24)I(r,s,.11,0,.017,.006,3.45,S.walnut);for(const s of[-6.65,-2.45,2.8,6.9])zt(r,s,-.8,1.45);for(const s of[-4.4,3.5]){ai(r,s,.45,.66),Ai(r,s-.9,.4,Math.PI/2,S.white),Ai(r,s+.9,.4,-Math.PI/2,S.white),Or(r,s+.2,.88,.45),We(r,s,1.07,.45,.026,2.05,S.gold);const a=new Pt(new Ks(1.55,.32,8),S.white);a.position.set(s,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,r.add(a)}Bn(r,-.5,-.7,0,1.7,S.teal),ai(r,-.5,.45,.38);for(const s of[-7.35,7.35])I(r,s,.43,0,.055,.8,3.5,S.gold);for(let s=-7.3;s<=7.3;s+=1.46)We(r,s,.43,1.7,.018,.8,S.gold);I(r,0,.8,1.7,14.7,.035,.035,S.gold),I(r,0,.46,1.7,14.7,.65,.014,S.glass)}if(e>=2){if(n==="lobby"&&(Bn(r,-5.6,.8,0,1.8,S.teal),ai(r,-4.25,.8,.35)),n==="breakfast"&&(I(r,2.8,1.1,-.6,.65,.5,.45,S.screen),Or(r,2.8,1.44,-.6)),n==="club"&&(Ba(r,5.8,1.2),wn(r,3.3,.05,-.8,1.8)),n==="gym")for(const s of[3.7,4.6,5.5])I(r,s,.15,.5,.6,.09,1.8,S.rust);if(n==="spa")for(const s of[-2.5,2.5])I(r,s,1.15,-.7,.06,2.1,1.3,S.wood);n==="rooftop"&&Bn(r,0,.55,0,2.2,S.rust)}if(e>=3){if(n==="lobby"&&(wi(r,0,1.6,-1.17,3.5,.65,3),I(r,0,.94,.5,6.45,.12,.83,S.gold)),n==="breakfast"&&(I(r,0,.55,.05,5.4,1,.8,S.stone),t>0))for(const s of[-1.8,0,1.8])We(r,s,1.12,.05,.25,.12,S.gold);if(n==="club"&&(Bn(r,-5.5,.4,0,2.8,S.white),wi(r,0,1.85,-1.05,2.7,.45,2)),n==="gym"){I(r,4.9,1.15,-1.23,4,1.85,.05,S.glass);for(const s of[3.1,6.5])I(r,s,1,0,.08,1.8,.08,S.gold);I(r,4.8,1.85,0,3.6,.08,.08,S.gold)}if(n==="spa")for(const s of[-4.8,0,4.8])I(r,s,.88,.4,1.8,.04,.8,S.white),wn(r,s+1.05,.75,.8,.8);if(n==="rooftop"){for(const s of[-6.8,6.8])I(r,s,1.3,-.9,.12,2.6,.12,S.walnut);for(let s=-6.8;s<=6.8;s+=.7)I(r,s,2.5,-.3,.12,.1,2.2,S.walnut)}}if(e>=4){I(r,0,.12,-.15,14,.03,2.9,S.stone);for(const s of[-6.6,6.6])wi(r,s,1.55,-1.15,.7,1.1,4),wn(r,s,.05,.85,1.7);if(n==="spa"&&(I(r,0,.4,.4,2.5,.55,1.5,S.white),I(r,0,.7,.4,2.1,.03,1.1,S.window)),n==="breakfast"||n==="club")for(const s of[-2,2])I(r,s,1.55,-.6,.025,.85,.025,S.gold),We(r,s,1.95,-.6,.25,.06,S.gold);n==="gym"&&(I(r,0,.3,.3,1.4,.25,1.8,S.black),I(r,0,1.25,-.4,1.2,.6,.12,S.screen))}if(e>=5){if(n!=="rooftop"){for(const s of[-5,-2.5,0,2.5,5])Rs(r,s,.5,2.05),I(r,s,2.27,0,2.2,.045,2.6,S.walnut);I(r,0,2.23,1.2,14,.04,.04,S.glow)}else{I(r,0,.35,-.5,3.6,.5,1.1,S.stone),I(r,0,.62,-.5,3.3,.04,.9,S.window);for(const s of[-6,-3,3,6])wn(r,s,.05,.8,1.3)}for(let s=-6.5;s<7;s+=1.3)I(r,s,.15,1.55,.5,.02,.2,S.gold)}return r}function xv(n,e,t){const i=new kt,s=fv(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new kt;return u.position.set(c,.31,0),i.add(u),I(u,0,-.11,0,.085,.26,.1,S.navy),I(u,0,-.245,.035,.11,.07,.17,S.black),u},o=a(-.08),l=a(.08);I(i,0,.47,0,.27,.34,.17,s),I(i,0,.58,.093,.07,.13,.012,S.white),["chill","family","points","forum","creator"].includes(e??"")||I(i,0,.55,.108,.018,.095,.016,S.navy),Tn(i,0,.81,0,.185,.21,.16,S.skin),Tn(i,0,.94,-.024,.193,.102,.163,S.hair);for(const c of[-.069,.069])Tn(i,c,.84,.149,.021,.024,.01,S.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&I(i,c,.856,.156,.09,.066,.012,S.navy);for(const c of[-1,1]){const u=I(i,c*.18,.45,0,.075,.26,.085,s);u.rotation.z=c*.15,Tn(i,c*.19,.303,.012,.047,.05,.045,S.skin)}if(e==="chill"&&(We(i,0,1,0,.23,.06,S.white),We(i,0,1.06,0,.16,.1,S.white)),e==="road"&&(I(i,.29,.25,.04,.22,.3,.15,S.walnut),I(i,.29,.44,.04,.12,.035,.05,S.gold)),e==="family"&&(I(i,0,.46,-.17,.3,.34,.17,S.rust),I(i,.27,.38,.05,.07,.2,.07,S.teal)),e==="points"&&(I(i,-.26,.4,.09,.15,.23,.025,S.white),I(i,-.26,.44,.11,.11,.04,.01,S.teal)),e==="hunter"&&(I(i,.24,.48,.12,.1,.18,.025,S.black),I(i,.24,.49,.138,.07,.12,.01,S.screen)),e==="forum"&&(Tn(i,0,1.01,-.01,.21,.07,.18,S.navy),I(i,0,.99,.17,.2,.025,.16,S.navy),I(i,-.25,.42,.08,.15,.23,.04,S.black)),e==="creator"){I(i,0,.5,.16,.2,.13,.12,S.black);const c=We(i,0,.5,.26,.065,.1,S.black);c.rotation.x=Math.PI/2,I(i,0,.63,.13,.025,.18,.02,S.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Tn(i,c+.23,.49,.08,.065,.08,.065,S.rust),I(i,c+.23,.35,.08,.015,.21,.015,S.green);if(e==="planner"&&(I(i,-.24,.47,.08,.19,.27,.04,S.teal),I(i,0,.54,.12,.08,.11,.015,S.white)),e==="whale"&&(I(i,0,.59,.12,.04,.09,.025,S.gold),I(i,.2,.36,.055,.08,.04,.09,S.gold),Tn(i,0,.96,-.04,.2,.075,.18,S.hair)),e==="auditplus"&&(I(i,-.24,.47,.09,.19,.26,.04,S.walnut),I(i,-.24,.49,.12,.14,.19,.012,S.white),I(i,.23,.45,.09,.012,.17,.012,S.gold)),t==="house"){I(i,.43,.36,.2,.4,.55,.4,S.navy),I(i,.43,.68,.2,.45,.05,.45,S.gold);for(let c=0;c<3;c++)I(i,.43,.75+c*.065,.2,.32,.06,.3,S.white);for(const c of[.28,.58])Tn(i,c,.08,.2,.07,.07,.07,S.black)}if(t==="engineering"&&(I(i,.3,.35,.05,.24,.2,.16,S.rust),I(i,.3,.5,.05,.13,.035,.04,S.gold),We(i,0,1,0,.21,.07,S.gold)),t==="fnb"){I(i,.4,.35,.2,.4,.08,.5,S.gold),I(i,.4,.62,.2,.4,.08,.5,S.gold);for(const c of[.28,.5])We(i,c,.73,.2,.09,.15,S.white);We(i,0,1,0,.17,.15,S.white)}return js(i,0,0,.47,.3),{group:i,left:o,right:l}}function Mv(n,e,t=0){if(n.navigation){const o=n.navigation;o.elapsed=Math.min(o.duration,o.elapsed+t);const l=o.duration?o.elapsed/o.duration*(o.points.length-1):o.points.length-1,c=Math.min(o.points.length-1,Math.floor(l)),u=o.points[c],d=o.points[Math.min(c+1,o.points.length-1)],f=n.group.position.clone();n.group.position.lerpVectors(u,d,l-c);const h=n.group.position.x-f.x,p=n.group.position.z-f.z,x=Math.hypot(h,p)>1e-4;x&&(n.group.rotation.y=Math.atan2(h,p));const g=x?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=g,n.right.rotation.x=-g;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function Gc(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*ar;t.set(i.id,s),i.entityIds.forEach((a,o)=>{const l=n.entities[a].kind==="room",c=l?kd[o]:0;e.push({id:a,floorId:i.id,position:new k(c,s,0),label:new k(l?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*ar+3.6}}function bv(n,e,t){const i=new Pt(new xr(e,t),new Kr({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function yv(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}class Sv{constructor(e,t){this.host=e,this.store=t,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=Gc(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new dv({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hu,this.renderer.outputColorSpace=Xt,this.renderer.toneMapping=tl,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(i=>this.update(i))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new Xf;root=new kt;camera=new Zs;light=new fh(16768942,3.1);ambient=new ch(12638184,10651490,2.15);raycaster=new mh;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new kt;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";build(){const e=this.store.getState();this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let s=0;s<18;s++){const a=-19+s*2.3,o=3+(Math.sin(s*7)+1)*3.3,l=-6-s%3*2.4;I(this.root,a,o/2-1,l,1.5,o,1.7,S.navy);for(let c=.4;c<o-1;c+=.55)for(let u=-.45;u<.6;u+=.45)(s+Math.round(c*10)+Math.round(u*10))%3!==0&&I(this.root,a+u,c,l+.87,.14,.24,.015,s%3===0?S.shade:S.window)}I(this.root,0,-.32,0,30,.35,15,S.navy),I(this.root,0,-.13,.7,17.6,.16,5.3,S.stone),I(this.root,0,-.06,2.95,17,.09,.55,S.stone);for(const s of[-8.1,8.4])zt(this.root,s,1,2);e.floors.forEach(s=>{const a=this.layout.floorY.get(s.id),o=new kt;if(o.name=s.id,o.position.y=a,this.root.add(o),s.role!=="rooftop"){I(o,0,-.085,0,15.05,.19,3.48,S.stone),I(o,0,-.12,1.77,15.2,.17,.19,S.navy),I(o,0,-.011,1.85,15.1,.025,.02,S.gold),I(o,0,2.405,-.02,15.05,.18,3.4,S.stone);for(const c of[-7.43,7.43])I(o,c,1.19,.18,.18,2.38,3.12,S.stone);I(o,7.94,1.19,-.24,.87,2.38,2.1,S.window);for(const c of[7.52,8.35])I(o,c,1.2,.84,.045,2.4,.06,S.gold);I(o,7.94,-.075,.1,.95,.19,2.85,S.navy),I(o,7.94,1.2,.87,.83,.025,.035,S.gold)}s.entityIds.forEach(c=>{const u=e.entities[c],d=this.layout.entities.find(p=>p.id===c),f=u.kind==="room"?mv(s.construction?{...u,construction:s.construction}:u):_v(u.role,u.level??1,u.role==="breakfast"?e.game?.stock??100:u.role==="club"?e.game?.clubStock??100:100,!!u.construction);if(u.kind==="facility"&&(u.level??1)>1)for(let p=1;p<(u.level??1);p++)zt(f,-6.8+p*.45,-.95,.5+p*.1);f.name=c,f.userData.entityId=c,f.position.x=d.position.x,o.add(f);const h=bv(c,u.kind==="room"?4.65:14.6,s.role==="rooftop"?2.1:2.3);if(f.add(h),this.colliders.push(h),u.kind==="room"){const p=document.createElement("button");p.className="room-label status-"+u.status+(u.status==="maintenance"&&!u.construction?" fault":"")+(u.suaBookingId?" sua":""),p.textContent=s.construction?"施工":u.suaBookingId?u.number+" SUA":u.status==="unbuilt"?"＋":u.number,p.dataset.entityId=c,p.setAttribute("aria-label",u.number+" 房间"),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}else{const p=document.createElement("button");p.className="facility-label"+(u.role==="breakfast"&&(e.game?.stock??1)<=0||u.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),p.dataset.entityId=c,p.textContent=u.name+(u.construction?" · 施工中":u.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":u.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),p.setAttribute("aria-label","查看"+u.name),p.onclick=()=>this.store.select(c),this.labels.push(p),this.overlay.append(p)}});const l=document.createElement("div");l.className="floor-marker",l.innerHTML=`<strong>${s.label}</strong><span>${s.name}</span>`,this.overlay.append(l),this.floorLabels.push({el:l,id:s.id})}),pv(this.root),this.faultLights=[],this.root.traverse(s=>{s.name==="fault-lamp"&&this.faultLights.push(s)});const t=document.createElement("div");t.className="lobby-sign",t.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",t.dataset.anchor="brand",this.overlay.append(t);const i=document.createElement("div");i.className="roof-sign",i.textContent="HYATT PLACE",i.dataset.anchor="roof",this.overlay.append(i);const r=new Kr({color:16766861,transparent:!0,opacity:.9,depthTest:!1});I(this.halo,0,0,0,4.7,.025,.025,r),I(this.halo,0,2.31,0,4.7,.025,.025,r),I(this.halo,-2.35,1.15,0,.025,2.31,.025,r),I(this.halo,2.35,1.15,0,.025,2.31,.025,r),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));let t={x:0,y:0};const i=o=>{t={x:o.clientX,y:o.clientY}},r=o=>{if(Math.hypot(o.clientX-t.x,o.clientY-t.y)>9||o.target.closest("button"))return;const l=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new qe((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.camera);const c=yv(this.raycaster,this.colliders);c&&this.store.select(c)};this.scroll.addEventListener("pointerdown",i),this.scroll.addEventListener("pointerup",r),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",i),this.scroll.removeEventListener("pointerup",r)});const s=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",s),this.cleanups.push(()=>document.removeEventListener("visibilitychange",s));const a=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",a),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",a))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,s=parseFloat(this.spacer.style.height)/this.scale-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels()}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new k(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new k(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new k(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(o=>{o instanceof Uu&&o.dispose()}),this.scene.remove(this.root),this.colliders.forEach(o=>{o.geometry.dispose(),o.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new kt,this.scene.add(this.root);const s=[...this.layout.floorY.keys()],a=o=>{const l=Math.floor((o.y-.07)/ar+1e-5),c=s[l],u=e.floors.findIndex(d=>d.id===c);u>=0&&(o.y+=(u-l)*ar)};this.actors.forEach(o=>{a(o.group.position),o.navigation?.points.forEach(a)}),this.layout=Gc(e),this.build(),this.bubbles.forEach(o=>this.overlay.append(o.el)),this.resize()}this.syncGuests(e);const i=e.game?.upgradeEffect;if(i&&i.id!==this.lastUpgrade){this.lastUpgrade=i.id;const s=this.labels.find(a=>a.dataset.entityId===i.entityId);if(s){const a=e.entities[i.entityId],o=e.floors.find(l=>l.id===a.floorId);s.dataset.feedback=a.construction||o?.construction?"施工开始":"竣工开放",s.classList.add("upgraded"),setTimeout(()=>s.classList.remove("upgraded"),3500)}}this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.labels.forEach(s=>{const a=s.dataset.entityId===e.selectedId;s.classList.toggle("selected",a),s.setAttribute("aria-pressed",String(a))});const r=this.layout.entities.find(s=>s.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!r,r){const s=e.entities[r.id];this.halo.scale.x=s.kind==="room"?1:3.1,this.halo.position.set(r.position.x,r.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...xv(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*ar+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(o=>new k(o.x,o.level*ar+.07,o.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const o=i.navigation,l=o.elapsed/o.duration*(o.points.length-1);a.unshift(...o.points.slice(Math.floor(l)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.actors.forEach(r=>Mv(r,i?0:this.time,t)),e-this.lastPaint>90){this.lastPaint=e;const r=this.store.getState(),s=Math.floor(e/8e3),a=this.bubbles.filter(({actor:o})=>{const l=r.guests.find(u=>u.id===o.guestId),c=this.project(o.group.position);return!!o.thought&&l?.movement?.position.phase!=="elevator"&&o.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});s!==this.speechSlot&&(this.speechSlot=s,this.speaker=a.length?a[s%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:o,actor:l})=>{const c=e%8e3<4200&&l.guestId===this.speaker&&a.some(u=>u.actor===l);if(o.style.display=c?"block":"none",c){const u=this.project(l.group.position.clone().add(new k(-.6,1.25,0)));o.hidden=!1;const d=Math.max(6,Math.min(this.host.clientWidth-o.offsetWidth-6,u.x)),f=Math.max(6,Math.min(this.host.clientHeight-o.offsetHeight-6,u.y));o.style.transform=`translate(${d}px,${f+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(r=>{r.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.renderer.dispose(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(Zr).forEach(e=>e.dispose()),hv(),this.overlay.remove()}}const gl="jinwanyoutao_v8_game_1";function Ev(){try{const n=localStorage.getItem(gl);if(!n)return Xa();const e=JSON.parse(n);if(e.schemaVersion!==8||e.mode!=="game"||!e.game||!Array.isArray(e.floors)||!Array.isArray(e.guests)||!Array.isArray(e.game.logs)||!Array.isArray(e.game.events)||!Array.isArray(e.game.tasks)||!Array.isArray(e.game.reports)||!e.entities||!e.game.managers||!e.game.memory||!Number.isFinite(e.game.day)||!Number.isFinite(e.game.minute)||!Number.isFinite(e.metrics?.cash))throw Error("存档格式不兼容");for(const t of e.floors)for(const i of t.entityIds)if(e.entities[i]?.floorId!==t.id)throw Error("楼层数据不完整");return gr(e),Xs(e),Vc(e,!0),Yn(e),e.game.operations.day!==e.game.day&&Ko(e,!e.game.reportOpen),e.game.plan||(Xr(e),Jo(e)),e.guests.forEach(t=>$s(e,t)),e.selectedId=null,e.focusedFloorId=null,e.game.notice="已恢复上次交班进度。",e}catch{const n=Xa();return n.game.paused=!0,n.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",n}}function Zu(n){try{return localStorage.setItem(gl,JSON.stringify(n)),!0}catch{return!1}}const qn=Fd(Ev()),Pr=Yd(document.querySelector("#app"),qn);rd(document.querySelector("#app"),qn);let Wo=!1,Xo=qn.getState().game.notice.startsWith("存档读取失败");const vl=()=>{!Wo&&!Xo&&!Zu(qn.getState())&&(Xo=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&qn.advance(4*qn.getState().speed)},1e3);setInterval(vl,5e3);document.addEventListener("visibilitychange",vl);window.addEventListener("pagehide",vl);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){Wo=!0;try{localStorage.removeItem(gl),qn.reset(),Xo=!1,Zu(qn.getState()),location.reload()}catch{alert("无法重置存档。")}finally{Wo=!1}}});function ea(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}ea();window.visualViewport?.addEventListener("resize",ea);window.visualViewport?.addEventListener("scroll",ea);window.addEventListener("resize",ea);try{const n=new Sv(Pr.stage,qn);Pr.setFocusHandler(e=>n.focusFloor(e)),Pr.stage.addEventListener("world-error",e=>Pr.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Pr.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
