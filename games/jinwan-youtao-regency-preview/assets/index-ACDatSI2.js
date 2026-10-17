(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ud(n,e){const t=document.createElement("button");t.className="sound-toggle",t.textContent="♪",t.title="开启酒店环境声",t.setAttribute("aria-label","开启酒店环境声"),t.setAttribute("aria-pressed","false"),n.querySelector(".property-row")?.append(t);let i,r=!1,s=0,a=e.getState().game?.arrivals??0,l=e.getState().metrics.cash,o,c;const u=(h,p=.13,v=0)=>{if(!i||!r)return;const g=i.createOscillator(),m=i.createGain(),b=i.currentTime+v;g.frequency.value=h,m.gain.setValueAtTime(.016,b),m.gain.exponentialRampToValueAtTime(1e-4,b+p),g.connect(m),m.connect(i.destination),g.start(b),g.stop(b+p),g.onended=()=>{g.disconnect(),m.disconnect()}};t.onclick=async()=>{if(r=!r,r){if(i??=new AudioContext,await i.resume(),!o){const h=i.createBuffer(1,i.sampleRate*2,i.sampleRate),p=h.getChannelData(0);for(let g=0;g<p.length;g++)p[g]=(Math.random()-.5)*.08;o=i.createBufferSource(),o.buffer=h,o.loop=!0,c=i.createGain(),c.gain.value=.01;const v=i.createBiquadFilter();v.type="lowpass",v.frequency.value=700,o.connect(v),v.connect(c),c.connect(i.destination),o.start()}u(660,.25),u(880,.25,.12)}else await i?.suspend();t.setAttribute("aria-pressed",String(r)),t.title=r?"关闭酒店环境声":"开启酒店环境声",t.setAttribute("aria-label",t.title)};const d=e.subscribe(h=>{const p=Date.now();i&&c&&c.gain.setTargetAtTime(h.game?.weather==="rain"?.12:.015,i.currentTime,.5),r&&!document.hidden&&p-s>1800&&((h.game?.arrivals??0)>a?(u(660,.25),u(880,.3,.12),s=p):h.metrics.cash>l&&(u(1046,.1),s=p)),a=h.game?.arrivals??0,l=h.metrics.cash}),f=()=>{document.hidden?i?.suspend():r&&i?.resume()};document.addEventListener("visibilitychange",f),window.addEventListener("pagehide",()=>{d(),i?.close()},{once:!0})}function gu(n=3){if(!Number.isInteger(n)||n<1||n>8)throw new Error("Guest floor count must be 1–8");const e=[],t={},i=(l,o,c,u,d)=>{const f="floor-"+o,h="facility-"+o;e.push({id:f,number:l,label:o==="lobby"?"L":o==="rooftop"?"RF":l+"F",name:c,role:o,entityIds:[h]}),t[h]={id:h,kind:"facility",floorId:f,role:o,name:c,capacity:u,usage:d,staffing:o==="lobby"?2:1,quality:92,maintenance:96}};i(0,"lobby","大堂",12,4),i(1,"breakfast","早餐厅",18,6);const r=["available","occupied","cleaning","occupied","reserved","available","occupied","available","occupied"];for(let l=2;l<n+2;l++){const o={id:"floor-"+l,number:l,label:l+"F",name:"客房",role:"guest",entityIds:[]};for(let c=0;c<3;c++){const u=String(l*100+c+1),d="room-"+u,f=r[((l-2)*3+c)%r.length];o.entityIds.push(d),t[d]={id:d,kind:"room",floorId:o.id,number:u,type:c===2?"suite":c===1?"twin":"king",status:f,nightsLeft:f==="occupied"?c+2:0}}e.push(o)}i(n+2,"club","嘉宾轩",12,4),i(n+3,"gym","健身房",8,3),i(n+4,"rooftop","屋顶花园",16,3);const s=[{id:"guest-chen",name:"陈先生",tier:"Globalist",roomId:"room-301",floorId:"floor-3",thought:"明天还住这里",color:2572885,route:[-6,-3]},{id:"guest-lin",name:"林先生",tier:"Explorist",roomId:"room-202",floorId:"floor-2",thought:"这张床不错",color:5272948,route:[-.6,1.4]},{id:"guest-zhou",name:"周先生",tier:"Member",roomId:"room-401",floorId:"floor-4",thought:"窗外真好看",color:7692372,route:[-6,-3.5]},{id:"guest-he",name:"何先生",tier:"Globalist",roomId:"room-403",floorId:"floor-4",thought:"先去酒廊坐坐",color:3755877,route:[4,6]}];[["lobby",-1.8,-1.8,-.1,2637392,"欢迎回来",!0],["lobby",1.7,1.7,-.1,2637392,"为您办理入住",!0],["lobby",-2,2.2,1.65,2510177,"今晚有套吗？"],["lobby",3,3,1.67,7041632,"等朋友来"],["breakfast",-5.5,-5.5,.6,6714472,"咖啡真香"],["breakfast",3.85,3.85,.62,3427688,"来份热早餐"],["breakfast",-1.7,1.7,.51,13945010,"补充新鲜面包",!0],["club",-4.4,-2.7,1.21,3558248,"日落时分刚刚好"],["club",4.45,4.45,.42,8483941,"再坐一会"],["club",.4,.4,-.64,2637392,"为您调一杯",!0],["gym",-3.8,-3.8,.3,4025464,"再跑十分钟"],["gym",3.8,5,1.2,7107193,"舒展一下"],["rooftop",-1.7,1.3,1.1,7432018,"这里的风真舒服"]].forEach(([l,o,c,u,d,f,h],p)=>s.push({id:"public-"+p,name:h?"当班员工":"住客",tier:h?"Staff":"Member",floorId:"floor-"+l,thought:f,color:d,route:[o,c],z:u,staff:!!h}));for(const l of Object.values(t))l.kind==="facility"&&(l.usage=s.filter(o=>o.floorId===l.floorId&&!o.staff).length,l.staffing=s.filter(o=>o.floorId===l.floorId&&o.staff).length);for(const l of s){const o=l.roomId?t[l.roomId]:null;o?.kind==="room"&&o.status==="occupied"&&(o.guestId=l.id)}return{schemaVersion:8,mode:"visual-slice",brandId:"place",metrics:{cash:28600,reputation:86,owner:82},floors:e,entities:t,guests:s.filter(l=>!l.roomId||!!t[l.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:"dusk",visited:[]}}const Ni=[{title:"参加第一次晨会",target:"brief",department:"front",why:"先看今天的预订与早餐需求。第一次沿用当前方案，点「开始今天」即可。",unlock:"到店接待"},{title:"亲自安排一位客人入住",target:"front",department:"front",why:"点选一间可售客房。房费在午夜结算；会员升套会占用套房库存。",unlock:"房态与住客服务"},{title:"见证一间客房翻房完成",target:"hotel",department:"house",why:"清洁中的房间不能出售。已有房间正在翻房；关闭菜单让时间继续，或安排脏房清洁。",unlock:"餐饮备货"},{title:"为早餐补一次库存",target:"operations-data",department:"fnb",why:"采购 ¥300 得到 50 份早餐。备货降低断供风险，也会占用现金。",unlock:"客房主管"},{title:"聘任客房主管",target:"operations",department:"house",why:"选择 Housekeeping 主管：到岗 ¥3,800，每天工资 ¥180，之后会自动接手清洁。",unlock:"完整团队、房价决策与成长认证"}];function vu(n,e=!1){return n.game.onboarding??={step:e?Ni.length:0,legacy:e,baseline:{...n.game.development?.counts??{}}}}function Kr(n){const e=n.game?.onboarding;if(!e||e.legacy)return null;const t=Ni[e.step];return t?{...t,department:t.department,index:e.step,total:Ni.length}:null}function _u(n){const e=n.game,t=e.onboarding;if(!t||t.legacy)return;const i=e.development?.counts??{},r=[!e.operations?.briefOpen,(i.arrivals??0)>(t.baseline.arrivals??0),(i.service??0)>(t.baseline.service??0),!!t.breakfastPrepared,e.managers.house>0],s=t.step;for(;t.step<Ni.length&&r[t.step];)t.step++;t.step!==s&&(e.notice="✓ "+Ni[t.step-1].title+" · 已解锁"+Ni[t.step-1].unlock+"。",e.logs.push({id:e.nextId++,day:e.day,minute:e.minute,category:"部门",text:e.notice}))}function fl(n,e){const t=n.game?.onboarding;if(!t||t.legacy)return null;const i=t.step,r=n.game?.campaign?.chapter??0;return e==="stock"&&i<3?"完成翻房带教后解锁餐饮备货":e==="team"&&i<4?"完成早餐备货后解锁客房主管":e==="strategy"&&i<5?"聘任客房主管后解锁完整团队与经营策略":e==="upgrade"&&(i<5||r<3)?"通过会员体验回访后解锁客房与公区升级":(e==="activity"||e==="expansion")&&(i<5||r<4)?"通过新空间试营业后解锁活动、营销与扩建":null}function Jl(n,e){const t={operations:"team","operations-data":"stock",development:"upgrade","development-data":"activity","hotel-data":"expansion","room-data":"strategy","brief-data":"strategy",score:"strategy",career:"strategy","tasks-data":"strategy"};return t[e]?fl(n,t[e]):null}function xu(n,e){const t={stock:"stock",hire:e.id==="house"?"team":"strategy",train:"strategy","day-plan":"strategy",price:"strategy",position:"strategy","suite-policy":"strategy",upgrade:"upgrade",invest:"upgrade","build-spa":"expansion",expand:"expansion","configure-room":"expansion",activity:"activity",campaign:"activity","book-inspection":"strategy","prepare-inspection":"strategy","continue-chapter":"strategy"};return t[e.type]?fl(n,t[e.type]):null}const Nd=["完整翻房运营","会员承诺检验","客房与公区升级","主题活动、营销与扩建","自由经营"],vi={standard:{name:"普通客房",factor:1,cost:0},view:{name:"景观客房",factor:1.2,cost:1e3},suite:{name:"套房",factor:1.45,cost:2500},premium:{name:"尊享套房",factor:1.9,cost:5e3}},qn=n=>n.category??(n.type==="suite"?"suite":"standard"),hl=n=>n.bed??(n.type==="twin"?"twin":"king"),bu=n=>["suite","premium"].includes(qn(n)),Yt=n=>qn(n)==="suite",oo=n=>vi[qn(n)].name+" · "+(hl(n)==="twin"?"双床":"大床"),Mu=n=>Object.values(n.entities).filter(e=>e.kind==="room"),st=n=>Mu(n).filter(e=>e.status!=="unbuilt"),yu=n=>st(n).filter(e=>Yt(e)&&e.status==="available").length,Su=n=>st(n).filter(e=>e.status==="occupied").length,Ql=(n,e)=>n.floors.find(t=>t.id===n.entities[e]?.floorId),xs=2.12,bs=7.94,Zt=n=>n.game.day*1440+n.game.minute;function Rr(n,e){if(e.staff&&!e.staffRole||e.movement)return;const t=Math.max(0,n.floors.findIndex(r=>r.id===e.floorId)),i={x:(e.route[0]+e.route[1])/2,z:e.z??1.12,level:t,phase:e.roomId&&n.entities[e.roomId]?.floorId===e.floorId?"room":"public"};e.movement={position:i,steps:[],destination:e.roomId&&i.phase==="room"?e.roomId:"facility-"+(n.floors[t]?.role??"lobby"),arrived:!0,nextDecision:Zt(n)+20+Gi(e.id)%75,trail:[],revision:0}}function Gi(n){let e=0;for(const t of n)e=Math.imul(e,31)+t.charCodeAt(0)>>>0;return e}function dn(n,e,t){Rr(n,e);const i=e.movement;if(i.steps.length)return!1;const r=n.entities[t],s=t==="exit";if(!r&&!s)return!1;const a=s?0:n.floors.findIndex(f=>f.id===r.floorId),l=i.position,o=s?5.8:r.kind==="room"?(Number(r.number)%100-2)*4.93:-5.7+Gi(e.id+t)%12*.95,c=s?2.8:1.25,u=[],d=(f,h,p,v)=>u.push({x:f,z:h,level:p,phase:v});return d(l.x,xs,l.level,"corridor"),Math.abs(a-l.level)>.001&&(d(bs,xs,l.level,"corridor"),d(bs,.9,l.level,"elevator"),d(bs,.9,a,"elevator"),d(bs,xs,a,"corridor")),d(o,xs,a,"corridor"),d(o,c,a,s?"exit":r.kind==="room"?"room":"public"),i.steps=u,i.destination=t,i.arrived=!1,i.nextDecision=Zt(n)+60,e.visitUntil=void 0,!0}function Fd(n,e,t){Rr(n,e);const i=e.movement;if(!i.steps.length)return dn(n,e,t);const r=i.steps,s=i.position;i.position={...r[r.length-1]},i.steps=[];const a=dn(n,e,t);return i.steps=[...r,...i.steps],i.position=s,a}function Eu(n,e){const t=e.movement;if(!t||!t.steps.length)return!1;const i=t.steps[0],r=t.position,s=i.x-r.x,a=i.z-r.z,l=(i.level-r.level)*2.55,o=Math.hypot(s,a,l),c=l!==0?.85:.65;if(r.phase=i.phase,o<=c)t.position={...i},t.steps.shift();else{const u=c/o;r.x+=s*u,r.z+=a*u,r.level+=l/2.55*u}return Number.isInteger(t.position.level)&&(e.floorId=n.floors[t.position.level]?.id??e.floorId),e.route=[t.position.x,t.position.x],e.z=t.position.z,t.steps.length?!1:(t.arrived=!0,t.nextDecision=Zt(n)+45+Gi(e.id+Zt(n))%65,!0)}function Od(n){for(const e of n.guests)Rr(n,e),e.movement&&(e.movement.trail=[{...e.movement.position}],e.movement.revision++)}function wu(n){n.movement&&n.movement.trail.push({...n.movement.position})}function jl(n,e){for(const t of n.guests){const i=t.movement;if(i)for(const r of[i.position,...i.steps,...i.trail])r.level>=e&&r.level++}}const pl=n=>n.lateHour??(n.tier==="Globalist"?16:14),Fi=n=>pl(n)===16?"4PM":"2PM",fs=n=>pl(n)===16?14:12,Tu=n=>n.late==="honor"?pl(n)*60:n.late==="deny"||n.late==="pending"?fs(n)*60:660;function Au(n,e,t){return n?e<.35?1:e<.82?2:e<.95?3:4+Math.floor(t*2):e<.6?1:e<.9?2:e<.98?3:4+Math.floor(t*2)}const ml={chill:{name:"佛系住客",quote:"有就升，没有也没关系。",lines:["房间干净就行，今天不做 Room Check。","行程只有一项：在酒店多待一会。","有咖啡、有地方坐，这晚就不亏。"],likes:{lobby:2,rooftop:1.4}},road:{name:"商务赶时间客",quote:"套不套无所谓，我二十分钟后要出发。",lines:["发票可以现在开吗？我二十分钟后出发。","Front Office 快一点，比升套更有用。","明早别耽误我出发，早餐打包就行。"],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},family:{name:"带娃住客",quote:"两个孩子，早餐、加床和四点退房都麻烦确认一下。",lines:["早餐别太挤，两个孩子已经在倒计时。","加床落实了吗？套房两个字可睡不下四个人。","Housekeeping，多两瓶水和一双拖鞋，谢谢。"],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},points:{name:"积分党",quote:"先确认一下，这晚 QN 算吧？",lines:["这晚 QN 多久到账？促销 bonus 能叠吗？","Mattress Run 的精髓，是床可以不躺，房晚不能不算。","早餐算进去，这次回血率还可以。"],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},hunter:{name:"套房猎人",quote:"我刚刚已经看过 App 了。",lines:["明天 Standard Suite 还有吗？如果续住呢？","高楼层是楼层，Standard Suite 是房型。","Front Office 说帮我看看，我也在帮他看 App。"],likes:{lobby:2,club:1.6,gym:.6}},forum:{name:"论坛老哥",quote:"先确认一下，你们怎么定义 Standard Suite？",lines:["这个 DP 我得标注日期，免得后人按图索骥。","帖子说能升，帖子可没说今天。","先不下结论，等完整住完再写 DP。"],likes:{lobby:1.4,club:2,breakfast:1.3}},creator:{name:"探店博主",quote:"如果房间够出片，我今晚可能就发。",lines:["这里拍照能出片，但服务也得经得起原图直出。","先等人少一点，镜头里不想全是后脑勺。","给我一个好角度，比再送一盘水果管用。"],likes:{rooftop:3,spa:1.5,club:1.4}},proposal:{name:"求婚夜住客",quote:"今晚真的很重要，拜托了。",lines:["戒指放好了，别让 Room Check 先发现惊喜。","今晚千万别翻车，明天的 DP 可以很长。","布置别提前说漏，惊喜不是给 Front Office 的。"],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},planner:{name:"会奖买手",quote:"如果住得好，下个月整个团队都来。",lines:["团队入住动线要顺，别让 Lobby 变成集合照。","我在看 F&B 出餐速度，不只是看菜单。","这条电梯动线，带团队得分批。"],likes:{lobby:2.5,breakfast:1.5,club:1.8}},whale:{name:"钞能力客",quote:"套房不是必须，但体验请不要像标准房。",lines:["价格不是问题，排队才是。","欢迎礼可以少一点，体验别太普通。","先把行程空下来，今天在酒店消费。"],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},auditplus:{name:"神秘审计客",quote:"我就随便住住，您按正常流程来。",lines:["Room Check？没有，我只是恰好看了一眼。","SOP 写得很好，看看现场是不是同一版。","Engineering 的闭环，不应该只在日志里。"],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}},Ru=n=>n.name+":"+n.persona;function xn(n,e,t){e.speech??={next:0,recent:[]},e.speech.event=t,e.speech.eventUntil=Zt(n)+35,e.speech.next=0,mr(n,e)}function mr(n,e){if(e.staff)return;const t=Zt(n),i=e.speech??={next:0,recent:[]},r=e.movement,s=n.floors.find(p=>p.id===e.floorId)?.role??"lobby",a=!!r?.steps.length,l=(i.eventUntil??0)>=t?i.event:"",o=[r?.position.phase,a,s,l,e.late,e.upgrades,e.departing,e.experience?.kind].join(":");if(t<i.next&&i.context===o)return;i.context=o;const c=e.persona??"chill",u=Object.values(n.entities).filter(p=>p.kind==="room"&&Yt(p)&&p.status==="available").length;let d=[];if(l==="birthday"&&e.occasion?.resolved)d=[e.occasion.outcome??"生日安排已确认。"];else if(l==="checkout"&&e.departing)d=[c==="points"?"Checkout 完了，接下来守着 QN 到账。":c==="forum"?"住完了，可以发完整 DP 了。":"房退好了，去大堂拿行李。"];else if(l==="checkin"&&e.roomId)d=[e.upgrades?"这次真给 Standard Suite 了。":"房卡拿到了，先上楼看看。"];else if(l==="denied")d=[e.roomId?u?"App 上有套，不代表你有套。今天懂了。":"今天 Standard Suite 没库存，这条 DP 得注明。":"这次没住成，换一家问问。"];else if(l==="late-honor"&&e.late==="honor")d=[Fi(e)+" 确认了，终于能从容收行李。"];else if(l==="late-deny"&&e.late==="deny")d=["协商到 "+fs(e)+":00 退房，得把下午行程挪一挪。"];else if(l==="recovery"&&e.serviceDone)d=[c==="points"?"QN / bonus 已经帮我核对过了。":"专属服务安排了，这一段也会写进 DP。"];else if(l==="renovation"&&!a)d=["这里刚升级了，看起来更舒服了。"];else if(e.waitingFor)d=[e.experience?.kind==="shortage"?"餐台还空着，我先等等补菜。":"前面还有人，轮到我再进去。"];else if(a)d=[r?.position.phase==="elevator"?c==="planner"?"这段电梯时间记一下，团队得分批。":"还在电梯里，等到层再出去。":c==="road"?"顺着走廊过去，别走错房间。":"沿着走廊慢慢走。"];else if(e.departing)d=["该出发了，最后检查一下行李。"];else if(!e.roomId)d=[ml[c].quote,...e.sua?["SUA 带好了，今晚能确认 Standard Suite 吗？"]:[]];else if(s==="guest")d=[{chill:"今天就在房间歇一会，不赶行程。",road:"先在房间处理工作，出发时间再确认。",family:"先把一家人的行李安顿好。",points:"这晚 QN 多久到账？促销 bonus 能叠吗？",hunter:e.upgrades?"Standard Suite 确认了，今天不用刷新 App。":"先住着，看看后面几晚套房情况。",forum:"先住完整晚再写 DP，不能只看欢迎礼。",creator:"先看看房间哪个角度适合拍。",proposal:"今晚很重要，先把要用的东西准备好。",planner:"把刚才看到的动线整理一下。",whale:n.entities["facility-spa"]?"等会看看 Spa 有没有位置。":"要是有 Spa，今天就不出门了。",auditplus:"先看看房间，按实际体验记。"}[c]],(e.satisfaction??90)<80&&(d=["这次体验还有点问题，得找 Front Office 说一下。"]);else{const p=e.experience,v=p?.place==="facility-"+s&&t-p.at<150;v&&p.kind==="shortage"?d=[s==="club"?"Happy Hour 还在，菜先下班了。":"早餐还没结束，餐台已经空了。"]:v&&p.kind==="served"?d=[{breakfast:c==="points"?"早餐吃上了，房费回本又近一步。":"咖啡拿到了，坐下来慢慢吃。",club:c==="forum"?"这次 Happy Hour 有吃到，DP 记一笔。":"在 Club Lounge 歇一会，再回房。",gym:"已经到健身房了，今天动一动。",spa:"Spa 排上了，这会儿先放下手机。",rooftop:n.game.weather==="rain"?"下雨了，等会回室内。":c==="creator"?"到屋顶了，先找找拍摄角度。":"在屋顶坐一会，不赶第二场。",lobby:c==="planner"?"在大堂看看，团队入住得分几批。":"在大堂坐一会，再回房。"}[s]??"先在这里休息一会。"]:d=["先看看这里有没有合适的位置。"]}if(!a&&e.roomId&&!e.departing){e.late==="pending"&&d.unshift((e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Fi(e)+" 吗？先确认一下。"),s==="guest"&&!e.upgrades&&u>0&&["hunter","forum"].includes(c)&&d.push(`App 上还有 ${u} 间套，先问问 Front Office。`);const p=n.game.operations?.profiles[e.profileId??""];s==="guest"&&p&&p.visits>0&&d.push(p.trust>=2?"这家以后可以常住，下次带朋友来。":p.history.at(-1)?.text.includes("套房")?"上次那个套房问题，今天解决了吗？":"再来住一次，看看这次体验。");const v=n.game.guestMemory?.[Ru(e)];s==="guest"&&v?.visits&&d.push(v.satisfaction<80?"上次住得不太顺，这次再看看。":v.denied?"上次没拿到套，这次按实际体验写 DP。":"上次住得不错，这次又回来了。")}const f=n.game.dialogueRecent??={};for(const[p,v]of Object.entries(f))t-v>240&&delete f[p];const h=d.filter(p=>!i.recent.some(v=>v.text===p&&t-v.at<180)&&t-(f[p]??-9999)>25);if(h.length){const p=h[Gi(e.id+t)%h.length];e.thought=p,i.recent.push({text:p,at:t}),i.recent=i.recent.slice(-8),f[p]=t}else e.thought="";i.next=t+45}function ns(n,e){const t=n.entities[e];if(!t)return;n.game.upgradeEffect={id:n.game.nextId++,entityId:e};const i=n.guests.find(r=>!r.staff&&!r.departing&&r.floorId===t.floorId&&!r.movement?.steps.length)??n.guests.find(r=>r.staff&&(r.floorId===t.floorId||t.kind==="room"));i&&(i.speech={next:0,recent:i.speech?.recent??[],event:"renovation",eventUntil:n.game.day*1440+n.game.minute+40},i.thought=i.staff?t.kind==="room"?"客房已布置完成，可以安排下一位了。":"公区升级完成，新设施可以使用了。":t.kind==="room"?"这间刚翻新了，下次住住看。":"这里刚升级了，看起来更舒服了。")}function Cr(n){return n.game.development??={counts:{},claimed:[],campaignUntil:0,activityDay:0,scores:[]}}function yn(n,e,t=1){const i=Cr(n);i.counts[e]=(i.counts[e]??0)+t;for(const r of n.game.tasks)if(r.id===e){if(r.progress=Math.min(r.goal,r.progress+t),r.claimed)continue;const s=Math.min(4,r.goal),a=Math.floor(r.progress/r.goal*s),l=Math.floor(r.reward*.7*a/s),o=Math.max(0,l-(r.paid??0));o&&(r.paid=(r.paid??0)+o,n.metrics.cash+=o,n.game.revenue+=o,n.game.rewardBeat={id:n.game.nextId++,text:r.title+" "+r.progress+"/"+r.goal,amount:o},n.game.logs.push({id:n.game.nextId++,day:n.game.day,minute:n.game.minute,category:"收益",text:"阶段反馈："+r.title+"，到账 ¥"+o+"；计入原任务奖金。"}))}}const kd=[["arrivals","接待住客",3,600,"front"],["service","完成清洁或维修",3,500,"hotel"],["stock","采购餐饮库存",2,450,"operations"],["delegate","部门执行 SOP",6,600,"operations"],["upgrade","装修客房或升级公区",1,900,"development"],["resolve","解决住客诉求",2,650,"events"],["vip","为会员升套",1,600,"front"],["activity","举办主题活动",1,700,"development"],["ancillary","公区消费收入",600,500,"development"],["revenue","赚取营业收入",3500,800,"operations"]];function Bd(n){return(n===1?[0,1,2,7]:[0,...[0,1,2].map(t=>1+(n*3+t*2)%9)]).map(t=>{const[i,r,s,a,l]=kd[t];return{id:i,title:r,goal:s,progress:0,reward:a,claimed:!1,target:l}})}function is(n){const e=st(n),t=n.guests.filter(s=>s.roomId),i=s=>Math.max(0,Math.min(100,Math.round(s))),r=[{name:"住客口碑",value:i(n.metrics.reputation)},{name:"住客体验",value:i(t.length?t.reduce((s,a)=>s+(a.satisfaction??90),0)/t.length:80)},{name:"房务效率",value:i(100*e.filter(s=>!["dirty","cleaning","maintenance"].includes(s.status)).length/Math.max(1,e.length))},{name:"业主信心",value:i(n.metrics.owner)}];return{parts:r,total:Math.round(r.reduce((s,a)=>s+a.value,0)/r.length)}}function Cu(n){const e=n.game.development,t=st(n);return[...[24,36,54,90].map(i=>({id:"rooms-"+i,title:i+" 间客房地标",goal:i,progress:t.length,reward:i*350})),...[20,60,150].map(i=>({id:"arrivals-"+i,title:"累计接待 "+i+" 位住客",goal:i,progress:e?.counts.arrivals??0,reward:i*100})),{id:"public",title:"打造五个升级公区",goal:5,progress:Object.values(n.entities).filter(i=>i.kind==="facility"&&(i.level??1)>1).length,reward:8e3},{id:"activities",title:"举办 7 场主题活动",goal:7,progress:e?.counts.activity??0,reward:6e3},{id:"team",title:"五位主管全部达到 3 级",goal:5,progress:Object.values(n.game.managers).filter(i=>i>=3).length,reward:1e4}].map(i=>({...i,claimed:e?.claimed.includes(i.id)??!1}))}const Jr={coffee:{name:"咖啡品鉴",role:"breakfast",cost:600,stock:12,fee:160,description:"消耗 12 份早餐；商务客更愿意参加，雨天也适合。"},fitness:{name:"健身挑战",role:"gym",cost:500,stock:0,fee:140,description:"度假定位更受欢迎；健身房升级提高人数上限。"},rooftop:{name:"屋顶星光派对",role:"rooftop",cost:1100,stock:16,fee:260,description:"消耗 16 份酒廊库存；晴天及周末更受欢迎，雨天人数减半。"}};function hr(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function Ms(n,e){return n.metrics.cash<e?(n.game.notice="现金不足，需要 ¥"+e,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function zd(n,e){if(!["invest","train","campaign","activity","claim-career"].includes(e.type))return!1;const t=n.game,i=Cr(n);if(e.type==="invest"){const r=n.entities[e.id??""];if(r?.kind!=="facility")return!0;if(r.construction)return t.notice="该公区正在施工。",!0;const s=r.level??1;if(s>=5)return t.notice="该公区已达 5 级。",!0;Ms(n,3500*s)&&(r.construction={remaining:120,total:120,targetLevel:s+1},ns(n,r.id),yn(n,"upgrade"),hr(n,r.name+"开始封闭改造：2 小时后升级至 "+(s+1)+" 级。"))}if(e.type==="train"){const r=e.id;if(!Object.hasOwn(t.managers,r))return!0;const s=t.managers[r];if(s<1||s>=3)return t.notice="先聘任主管；培训上限为 3 级。",!0;Ms(n,4500*s)&&(t.managers[r]++,hr(n,"主管培训完成：服务效率提升，每日工资增加 ¥180。"))}if(e.type==="campaign"){if(i.campaignUntil>=t.day)return t.notice="当前推广仍在进行。",!0;Ms(n,2200)&&(i.campaignUntil=t.day+2,hr(n,"启动三日推广：今日及后两日客流 +35%。请准备足够客房。"))}if(e.type==="activity"){const r=Jr[e.id];if(!r)return!0;if(i.activityDay===t.day||i.activity)return t.notice="每日只能安排一场主题活动。",!0;if(t.minute>1260)return t.notice="活动筹备需要 2 小时，请明日安排。",!0;const s=e.id==="coffee"?"stock":"clubStock";if(t[s]<r.stock)return t.notice="活动库存不足，请先补货。",!0;Ms(n,r.cost)&&(t[s]-=r.stock,i.activityDay=t.day,i.activity={id:e.id,ends:t.day*1440+t.minute+120},hr(n,r.name+"筹备中，2 小时后按在住人数、定位、天气和公区等级结算。"))}if(e.type==="claim-career"){const r=Cu(n).find(s=>s.id===e.id);r&&!r.claimed&&r.progress>=r.goal&&(i.claimed.push(r.id),n.metrics.cash+=r.reward,hr(n,"里程碑「"+r.title+"」奖励 ¥"+r.reward+" 已到账。"))}return!0}function Gd(n){const e=n.game,t=Cr(n),i=t.activity;if(!i||e.day*1440+e.minute<i.ends)return;const r=Jr[i.id],s=n.entities["facility-"+r.role],a=n.guests.filter(f=>f.roomId),l=s?.kind==="facility"?s.level??1:1,o=s?.kind==="facility"?s.capacity:8,c=i.id==="coffee"?e.positioning==="business"?1:.75:i.id==="fitness"?e.positioning==="resort"?1:.7:e.weather==="rain"?.35:(e.day-1)%7>=4?1:.8,u=Math.min(o,Math.round(a.length*c)),d=Math.round(u*r.fee*(1+(l-1)*.2));n.metrics.cash+=d,e.revenue+=d,yn(n,"revenue",d),yn(n,"ancillary",d),yn(n,"activity");for(const f of a.slice(0,u))f.satisfaction=Math.min(100,(f.satisfaction??90)+5),f.thought=r.name+"很有意思";n.metrics.reputation=Math.min(100,n.metrics.reputation+(u>=3?2:0)),t.activity=void 0,hr(n,r.name+"结束："+u+" 人参加，收入 ¥"+d+"，活动净额 ¥"+(d-r.cost)+"。")}const Pu={normal:"常规营业日",expo:"会展开放 · 商旅和团队集中到店",flights:"航班延误 · 晚间临时住宿增加",storm:"暴雨预警 · 屋顶关闭，室内客流上升"};function ei(n){const e=n.game;if(e.operations)return e.operations;e.operations={day:0,briefOpen:!1,event:"normal",bookings:[],profiles:{},suitePolicy:"sell",lostBookings:0,confirmedArrivals:0,walkinArrivals:0,hkCompleted:0,stockDelivered:0};for(const t of n.guests.filter(i=>!i.staff)){const i=t.profileId??"history-"+t.id;t.profileId=i,e.operations.profiles[i]={id:i,name:t.name,persona:t.persona??"chill",tier:t.tier,visits:0,trust:0,spend:0,history:[]}}return e.operations}function nn(n,e,t="部门",i){const r=n.game;r.notice=e,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:t,text:e,target:i})}function lo(n,e){const t=ei(n),i="profile-"+n.game.nextId++,r=Gi(i),s=["chill","road","family","points","hunter","forum","creator","proposal","planner","whale","auditplus"],a={id:i,name:["陈","林","周","何","张","李","赵","王"][r%8]+["宇航","子衡","明远","嘉树","景行","一帆","致远","承泽"][Math.floor(r/8)%8],persona:s[r%11],tier:e<.27?"Globalist":e<.5?"Explorist":e<.8?"Member":"普通客",visits:0,trust:0,spend:0,history:[]};return t.profiles[i]=a,a}function Iu(n,e=n.game.price){const t=n.game,i=t.operations,r=(t.day-1)%7>=5,s=t.positioning==="business"?r?.75:1.3:t.positioning==="resort"?r?1.4:.9:1.1;return Math.max(1,Math.round((3+st(n).length*.12)*s*(i?.event==="flights"?1.8:i?.event==="expo"?1.4:1)*(t.weather==="rain"?.8:1)*(t.development&&t.development.campaignUntil>=t.day?1.35:1)*Math.max(.3,Math.min(1.5,720/e))))}function Oi(n){const e=n.game,t=e.operations,i=t.bookings.filter(f=>f.status!=="lost"),r=i.filter(f=>f.status==="confirmed"),s=n.guests.filter(f=>f.roomId&&!f.departing),a=s.filter(f=>(f.checkoutDay??e.day)>e.day).length,l=s.length-a,o=Iu(n),c=st(n).filter(f=>!f.construction).length,u=Math.min(c,a+r.length+Math.max(0,o-t.walkinArrivals)),d=f=>f.persona==="family"?3:1;return{occupancy:Math.round(u/Math.max(1,c)*100),walkins:o,breakfast:s.reduce((f,h)=>f+d(h),0),housekeeping:l+st(n).filter(f=>f.status==="dirty"||f.status==="cleaning").length,suites:r.filter(f=>t.profiles[f.profileId]?.tier==="Globalist").length,club:Math.round(u*.65),business:i.filter(f=>f.segment==="商务").length,resort:i.filter(f=>f.segment==="度假").length,group:i.filter(f=>f.segment==="团队").length,price:e.price}}function gl(n,e=!0){const t=n.game,i=ei(n);if(i.day===t.day){e&&(i.briefOpen=!0);return}i.day=t.day,i.bookings=[],i.forecast=void 0,i.lostBookings=i.confirmedArrivals=i.walkinArrivals=i.hkCompleted=i.stockDelivered=0;let r=(t.seed^Math.imul(t.day,2654435761))>>>0;const s=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),a=s();i.event=a<.2?"expo":a<.35?"flights":a<.5?"storm":"normal",i.event==="storm"&&(t.weather="rain");const l=st(n).filter(h=>!h.construction).length,o=l-n.guests.filter(h=>h.roomId&&(h.checkoutDay??t.day)>t.day).length,c=Math.max(2,Math.min(l+2,Math.round(o*(i.event==="expo"?1.15:.7)))),u=Object.values(i.profiles).filter(h=>h.visits>0&&!n.guests.some(p=>p.profileId===h.id)),d=new Set;for(let h=0;h<c;h++){let p=u.find(b=>!d.has(b.id)&&s()<.5);p||(p=lo(n,s())),d.add(p.id);const v=i.event==="expo"&&h<Math.ceil(c*.35)?"团单":s()<.6?"APP":"平台",g=t.positioning==="resort"||(t.day-1)%7>=5&&s()<.6,m={id:"booking-"+t.nextId++,profileId:p.id,source:v,eta:v==="团单"?840:780+Math.floor(s()*330),nights:Au(g,s(),s()),rate:Math.round(t.price*(v==="团单"?.88:1)),segment:v==="团单"?"团队":g?"度假":"商务",status:"confirmed"};if(h===0&&t.day%2===1&&(m.occasion="birthday"),h<2&&(m.challenge=p.persona==="auditplus"?"audit":p.persona==="family"?"family":p.tier==="Globalist"?"sua":"quiet"),m.challenge==="sua"){const b=st(n).find(S=>Yt(S)&&S.status==="available"&&!S.suaBookingId);b?(m.sua=!0,m.roomId=b.id,b.suaBookingId=m.id,b.status="reserved"):m.challenge="quiet"}i.bookings.push(m)}const f=u.find(h=>h.trust>=2&&h.visits>=2);if(f&&o>i.bookings.length){const h=lo(n,s());h.referredBy=f.id,i.bookings.push({id:"booking-"+t.nextId++,profileId:h.id,source:"APP",eta:900,nights:1,rate:t.price,segment:"商务",status:"confirmed"})}i.briefOpen=e,i.forecast=Oi(n),hs(n),_l(n),e&&(t.paused=!0),nn(n,`早班准备：${i.bookings.length} 笔确认预订，${Pu[i.event]}。`)}function Hd(n,e){const t=ei(n);for(const i of t.bookings)i.status==="confirmed"&&n.game.minute>=i.eta&&(i.status="arrived",t.confirmedArrivals++,e(i))}function Vd(n,e,t){const i=ei(n);let r=t?i.profiles[t.profileId]:void 0;r||(r=lo(n,Gi(e.id)%100/100)),e.profileId=r.id,e.name=r.name,e.persona=r.persona,e.tier=r.tier,e.source=t?.source??"Walk-in",e.reservationId=t?.id,e.bookedRate=t?.rate,e.sua=!!t?.sua,e.spend=0,t?(e.segment=t.segment,e.stayLength=t.nights,t.challenge&&(e.challenge={kind:t.challenge,resolved:!1})):i.walkinArrivals++,(t?.occasion==="birthday"||!t&&i.walkinArrivals===1&&n.game.day%2===1)&&(e.occasion={kind:"birthday",resolved:!1}),e.satisfaction=Math.max(65,Math.min(98,88+r.trust*2))}function vl(n,e){const t=ei(n),i=t.bookings.find(r=>r.id===e.reservationId);if(!(!i||i.status==="lost"||i.status==="checkedin")&&(i.status="lost",t.lostBookings++,n.metrics.cash-=600,n.game.expense+=600,n.metrics.reputation=Math.max(0,n.metrics.reputation-2),nn(n,e.name+" 的确认预订未兑现：安置补偿 ¥600，口碑 -2。","客诉","facility-lobby"),i.roomId)){const r=n.entities[i.roomId];r?.kind==="room"&&r.suaBookingId===i.id&&(r.suaBookingId=void 0,r.status==="reserved"&&(r.status="available"))}}function Wd(n,e){const t=ei(n),i=t.profiles[e.profileId??""];if(!i)return;const r=(e.satisfaction??90)>=90&&(!e.challenge||e.challenge.outcome==="需求已兑现")&&!e.denied;i.visits++,i.trust=Math.max(-3,Math.min(5,i.trust+(r?1:-1))),i.spend+=e.spend??0;const s=r?i.trust>=2?"连续服务满意：这家以后可以常住，愿意介绍朋友。":"留下好 DP：下次愿意再来。":e.denied?"没拿到套房：App 上明明还有套？下次还会记得。":"留下差 DP：这次的问题没有完整解决。";i.history.push({day:n.game.day,text:s}),i.history=i.history.slice(-8),r?n.metrics.reputation=Math.min(100,n.metrics.reputation+1):n.metrics.reputation=Math.max(0,n.metrics.reputation-2),nn(n,i.name+"："+s,"入住")}function Xd(n,e){const t=n.game,i=ei(n);if(e.type==="brief-start")return i.briefOpen&&(i.forecast=Oi(n),_l(n),i.briefOpen=!1,t.paused=!1,nn(n,`晨会决策已确认：Walk-in 挂牌 ¥${t.price}，预计入住率 ${i.forecast.occupancy}%。`)),!0;if(e.type==="suite-policy")return i.suitePolicy=e.value==="hold"?"hold":"sell",nn(n,i.suitePolicy==="hold"?"前厅指令：保留最后一间标准套房给会员。":"前厅指令：标准套房开放销售；已锁 SUA 不变。"),!0;if(e.type==="guest-choice"){const r=n.guests.find(c=>c.id===e.id),s=r?.challenge;if(!r||!s||s.resolved)return!0;if(!r.roomId)return t.notice="先办理入住，再落实住客的特殊安排。",!0;const a=s.kind==="quiet"&&e.value==="quiet"||s.kind==="family"&&e.value==="family"||s.kind==="audit"&&e.value==="inspect"||s.kind==="sua"&&e.value==="inventory",l=e.value==="decline"?0:a?180:100;if(n.metrics.cash<l)return t.notice="预算不足，暂无法安排。",!0;n.metrics.cash-=l,t.expense+=l,s.resolved=!0;let o=a&&(s.kind!=="sua"||!!r.upgrades);if(a&&s.kind==="family"&&(o=t.stock>=6,o)){t.stock-=6;const c=n.entities[r.roomId??""];c?.kind==="room"&&(c.extraBed=!0)}if(a&&s.kind==="audit"&&(o=!!t.managers.house&&!!t.managers.engineering&&!st(n).some(c=>c.status==="maintenance"&&!c.construction)),a&&s.kind==="quiet"){const c=n.entities[r.roomId??""];if(c&&n.floors.some(d=>d.construction&&Math.abs(d.number-(n.floors.find(f=>f.id===c.floorId)?.number??0))<=1)){const d=st(n).find(f=>f.status==="available"&&!f.construction&&!n.floors.some(h=>h.construction&&Math.abs(h.number-(n.floors.find(p=>p.id===f.floorId)?.number??0))<=1));o=!!d,d&&c.kind==="room"&&(c.status="dirty",c.guestId=void 0,c.nightsLeft=0,d.status="occupied",d.guestId=r.id,d.nightsLeft=Math.max(0,(r.checkoutDay??t.day)-t.day),r.roomId=d.id,r.movement?.steps.length||dn(n,r,d.id))}}return r.serviceDone=o,r.satisfaction=Math.max(0,Math.min(100,(r.satisfaction??90)+(o?8:-8))),s.outcome=o?"需求已兑现":"未解决核心诉求",yn(n,"resolve"),xn(n,r,o?"recovery":"denied"),nn(n,r.name+"："+s.outcome+"，支出 ¥"+l+"。",o?"部门":"客诉",r.roomId??"facility-lobby"),!0}return!1}const pi=[{title:"接住第一批客人",action:"办理 3 次入住",counter:"arrivals",goal:3,target:"front",exam:"试住客回访",threshold:62,department:"front"},{title:"让房间周转起来",action:"完成 3 次清洁或维修",counter:"service",goal:3,target:"hotel",exam:"早班运营巡检",threshold:66,department:"house"},{title:"兑现住客的承诺",action:"完成 2 次诉求处理",counter:"resolve",goal:2,target:"events",exam:"会员体验回访",threshold:70,department:"front"},{title:"让升级经得起体验",action:"完成 1 次装修或公区升级",counter:"upgrade-complete",goal:1,target:"development",exam:"新空间试营业",threshold:72,department:"engineering"},{title:"办一场让人记住的活动",action:"完成 1 场主题活动",counter:"activity",goal:1,target:"development-data",exam:"总部经营评审",threshold:74,department:"revenue"}],ec=n=>n.game.day*1440+n.game.minute;function fa(n){return n.game.campaign??={chapter:0,baseline:{...n.game.development?.counts??{}},certificates:[],attempts:0}}function rs(n){const e=n.game.campaign,t=pi[e?.chapter??0];if(!t)return null;const r=t.counter==="upgrade-complete"&&Object.values(n.entities).filter(s=>s.kind==="facility"||s.kind==="room"&&s.status!=="unbuilt").every(s=>(s.level??1)>=5&&!s.construction)?t.goal:Math.min(t.goal,Math.max(0,(n.game.development?.counts[t.counter]??0)-(e?.baseline[t.counter]??0)));return{...t,progress:r,ready:r>=t.goal}}function Qr(n,e){const t=n.game;t.notice=e,t.logs.push({id:t.nextId++,day:t.day,minute:t.minute,category:"升级",text:e})}function $d(n,e){if(!["book-inspection","prepare-inspection","continue-chapter"].includes(e.type))return!1;const t=n.game,i=fa(n),r=rs(n);if(e.type==="book-inspection"){if(!r||!r.ready||i.inspection||i.result?.passed)return t.notice="先完成当前目标；预约中的检验无需重复预约。",!0;t.seed=Math.imul(t.seed,1664525)+1013904223>>>0,i.inspection={due:(t.day+1)*1440+1080,chapter:i.chapter,phase:"booked",roll:t.seed%13-6,prepared:!1},i.attempts++,i.result=void 0,Qr(n,r.exam+"已预约：明天 18:00 到店，先保障客房、库存和服务。")}if(e.type==="prepare-inspection"){const s=i.inspection;if(!s||s.phase!=="booked"||s.prepared)return t.notice="本次检验已准备，或正在进行。",!0;if(n.metrics.cash<300)return t.notice="准备需要 ¥300；也可以不额外投入。",!0;n.metrics.cash-=300,t.expense+=300,s.prepared=!0,Qr(n,"投入 ¥300 做现场彩排：检验表现 +6，仍需实际服务达标。")}if(e.type==="continue-chapter"){if(i.result?.chapter!==i.chapter||!i.result.passed)return t.notice="先完成本阶段检验。",!0;i.certificates.push(pi[i.chapter].exam),i.chapter++,i.baseline={...t.development?.counts??{}},i.inspection=void 0,i.result=void 0,i.attempts=0,Qr(n,pi[i.chapter]?"下一阶段："+pi[i.chapter].title+"。":"五段经营主线完成，酒店进入自由经营。")}return!0}function qd(n){const e=fa(n),t=e.inspection;if(!t||(t.phase==="booked"&&ec(n)>=t.due&&(t.phase="visiting",Qr(n,pi[e.chapter].exam+"到店：先看房、再用餐、最后核对服务；30 分钟后回访。")),t.phase!=="visiting"||ec(n)<t.due+30))return;const i=n.game,r=st(n).filter(p=>p.status!=="unbuilt"),s=n.guests.filter(p=>!p.staff&&p.roomId&&!p.departing),a=r.filter(p=>!["dirty","cleaning","maintenance"].includes(p.status)&&!p.construction).length/Math.max(1,r.length),l=s.length?s.reduce((p,v)=>p+(v.satisfaction??90),0)/s.length:80,o=Math.max(0,100-i.events.length*12-s.filter(p=>p.challenge&&!p.challenge.resolved||p.late==="pending").length*8),c=Math.min(100,Math.min(i.stock,i.clubStock)*5),u=Math.round(a*25+l*.3+o*.25+c*.2),d=Math.max(0,Math.min(100,u+t.roll+(t.prepared?6:0))),f=d>=pi[e.chapter].threshold,h=[{value:a*100,text:"先清洁脏房、完成维修，减少封闭房。",target:"hotel"},{value:l,text:"处理客人的核心诉求，减少只送礼未兑现。",target:"events"},{value:o,text:"先解决积压事件和晚退请求。",target:"events"},{value:c,text:"先补足早餐和酒廊的库存。",target:"operations-data"}].sort((p,v)=>p.value-v.value)[0];e.result={chapter:e.chapter,passed:f,score:d,day:i.day,minute:i.minute,advice:f?"体验通过。确认后开启下一段经营目标。":h.text,target:h.target,scenes:[a>=.7?"Room Check：多数房间整洁可售。":"Room Check：发现翻房或维修积压。",c>=75?"F&B：餐台供应顺畅。":"F&B：餐台库存让体验打了折扣。",o>=80?"Front Office：承诺与服务顺利交接。":"Front Office：还有诉求未接住。"]},e.inspection=void 0,Qr(n,pi[e.chapter].exam+"："+(f?"通过":"需要改善")+"（"+d+" / "+pi[e.chapter].threshold+"）。"+e.result.advice)}const gr={occupancy:{name:"稳健接客",price:720,hold:!1,description:"用适中房价接住需求，套房开放销售。",risk:"客流更多，翻房和前台压力也更大。"},experience:{name:"照顾体验",price:720,hold:!0,description:"留一间会员套房，早餐与酒廊各预备 20 份。",risk:"预采购 ¥240；留套会减少付费销售空间。"},margin:{name:"争取利润",price:850,hold:!1,description:"提高挂牌价，保留套房付费销售机会。",risk:"Walk-in 会减少，已确认订单不会跟着涨价。"}};function hs(n){const e=n.game;return e.plan?.day===e.day?e.plan:e.plan={day:e.day,focus:"occupancy",selected:!1,prepared:!1,target:0}}function Lu(n,e){const t=n.game,i=Oi(n),r=st(n),s=380+r.length*65+Object.values(t.managers).reduce((u,d)=>u+d*180,0);if(e==="experience")return 90;if(e==="occupancy")return Math.max(40,Math.min(90,Math.floor(i.occupancy*.9/5)*5));const a=n.guests.filter(u=>u.roomId&&!u.departing),l=t.operations.bookings.filter(u=>u.status==="confirmed"),o=[...a.map(u=>u.rate??t.price),...l.map(u=>u.rate)],c=o.length?o.reduce((u,d)=>u+d,0)/o.length:t.price;return Math.max(0,Math.floor((r.length*i.occupancy/100*c*.9-s-t.expense)*.8/100)*100)}function _l(n){const e=hs(n);e.target=Lu(n,e.focus),e.review=void 0}function Yd(n,e){if(e.type!=="day-plan")return!1;const t=n.game,i=hs(n),r=String(e.value);if(!Object.hasOwn(gr,r)||!t.operations?.briefOpen)return t.notice="经营方向在早班晨会确定，营业后可继续处理具体决定。",!0;const s=gr[r],a=r==="experience"&&!i.prepared?240:0;return n.metrics.cash<a?(t.notice="预采购需要 ¥240；也可以维持现有安排。",!0):(a&&(n.metrics.cash-=a,t.expense+=a,t.stock+=20,t.clubStock+=20,i.prepared=!0),i.focus=r,i.selected=!0,t.price=s.price,t.operations.suitePolicy=s.hold?"hold":"sell",i.target=Lu(n,r),nn(n,"晨会方向："+s.name+"。挂牌 ¥"+t.price+"，"+(s.hold?"保留一间会员套房":"套房开放销售")+(a?"，餐台预采购 ¥240":"")+"。"),!0)}function Du(n,e,t){n.game;const i=hs(n),r=n.guests.filter(c=>!c.staff&&c.roomId&&!c.departing),s=Math.round(r.length/Math.max(1,st(n).length)*100),a=r.length?Math.round(r.reduce((c,u)=>c+(u.satisfaction??90),0)/r.length):0,l=i.focus==="occupancy"?s:i.focus==="experience"?a:Math.round(e),o=l>=i.target&&(i.focus!=="experience"||r.length>0);return i.review={actual:l,target:i.target,focus:i.focus,success:o,phase:t,lesson:i.focus==="occupancy"?o?"房间接住了需求。扩建前再看明天是否持续满房。":"先核对拒客、空房与翻房积压，再考虑降低报价。":i.focus==="experience"?o?"住客体验守住了。把兑现承诺的方式交给主管。":"回看未兑现的诉求和断供；送礼不能替代实际服务。":o?"利润目标达到。保留明天的工资、翻房和备餐资金。":"高价没有自动变成利润。先分清客流不足与额外支出。"},{...i.review}}const ys=(n,e)=>n==="margin"?"¥"+Math.round(e).toLocaleString("en-US"):Math.round(e)+(n==="occupancy"?"%":" 分");function Zd(n){const e=n.game,t=st(n),i=n.guests.filter(o=>!o.staff&&!o.roomId&&!o.departing),r=t.find(o=>o.status==="dirty"),s=n.guests.filter(o=>!o.departing&&o.roomId&&(o.late==="pending"||o.challenge&&!o.challenge.resolved||o.occasion&&!o.occasion.resolved));if(e.reportOpen)return{title:"把今天的结果带进明天",why:"房费已结算，先看判断是否奏效，再安排下一天。",target:"report",department:"revenue"};if(e.operations?.briefOpen)return{title:"先确定今天的经营方向",why:"比较接客、体验与利润的取舍，确认后开始营业。",target:"brief",department:"revenue"};const a=Kr(n);if(a)return{title:a.title,why:a.why,target:a.target,department:a.department};if(e.events.length)return{title:e.events[0].title,why:"现场问题有处理时限，先避免小问题变成客诉。",target:"events",department:"front"};if(i.length)return{title:"接住 "+i.length+" 位到店客人",why:"先办理入住，再兑现生日、晚退或会员安排。",target:"front",department:"front"};if(r)return{title:r.number+" 翻房后才能再次出售",why:"先让现有客房创造收入，再花钱扩大容量。",target:"hotel",department:"house",entity:r.id};if(s.length)return{title:"还有 "+s.length+" 位客人的承诺待确认",why:"看实际条件与机会成本，礼遇不是唯一合理答案。",target:"events",department:"front"};if(e.stock<20||e.clubStock<20)return{title:"先稳住餐台供应",why:"当前库存偏低；补货能直接改善下一批客人的体验。",target:"operations-data",department:"fnb"};const l=rs(n);return e.campaign?.result?{title:e.campaign.result.passed?"检验通过，进入下一段成长":"检验发现差距，先落实改进",why:e.campaign.result.advice,target:"tasks",department:"revenue"}:e.campaign?.inspection?{title:"下一次体验检验已预约",why:"先检查房态、库存与未兑现承诺；到店后才会公布结果。",target:"tasks",department:"front"}:l?{title:l.ready?"预约一次实际体验检验":l.action,why:e.campaign?.inspection?"检验已预约，留出时间检查房态、备货和服务。":"日常行动推进酒店主线；完成后用真实体验验证。",target:e.campaign?.inspection||l.ready?"tasks":l.target,department:l.department}:{title:"把盈余投入下一段成长",why:"先留够工资与服务资金，再选择装修、设施或主题活动。",target:"development",department:"revenue"}}function Uu(n,e){const t=n.game,i=st(n).filter(o=>Yt(o)&&o.status==="available"&&!o.construction&&!o.suaBookingId),r=t.operations?.bookings.filter(o=>o.status==="confirmed"&&!o.sua&&t.operations?.profiles[o.profileId]?.tier==="Globalist").length??0,s=Math.max(r,t.operations?.suitePolicy==="hold"?1:0),a=n.entities[e.roomId??""];return{suite:a?.kind==="room"&&Yt(a)?void 0:i.length>s?i[0]:void 0,free:i.length,reserve:s,breakfast:t.stock>=2,alreadySuite:a?.kind==="room"&&Yt(a)}}function Kd(n,e){if(e.type!=="birthday-choice")return!1;const t=n.game,i=n.guests.find(u=>u.id===e.id&&!u.departing),r=i?.occasion;if(!i?.roomId||!r||r.resolved)return t.notice="先办理入住；已处理的生日安排无需重复选择。",!0;if(!["breakfast","suite","card","decline"].includes(String(e.value)))return!0;const s=Uu(n,i),a=e.value==="breakfast"?160:e.value==="suite"?280:0;if(e.value==="breakfast"&&!s.breakfast)return t.notice="早餐库存不足两份；先补货，或选择生日祝福。",!0;if(e.value==="suite"&&!s.suite)return t.notice="没有可赠送的标准套房；确认预订与预留优先，仍可选择其他礼遇。",!0;if(n.metrics.cash<a)return t.notice="礼遇预算不足；可以先送一张手写生日卡。",!0;if(n.metrics.cash-=a,t.expense+=a,e.value==="breakfast"&&(t.stock-=2,i.birthdayBreakfast=2,n.metrics.owner=Math.max(0,n.metrics.owner-1)),e.value==="suite"){const u=n.entities[i.roomId];u.kind==="room"&&(u.status="dirty",u.guestId=void 0,u.nightsLeft=0);const d=s.suite;d.status="occupied",d.guestId=i.id,d.nightsLeft=Math.max(0,(i.checkoutDay??t.day+1)-t.day),i.roomId=d.id,i.upgrades=!0,i.denied=!1,t.upgrades++,n.metrics.owner=Math.max(0,n.metrics.owner-2),Fd(n,i,d.id)}const l=e.value==="breakfast"?8:e.value==="suite"?12:e.value==="card"?2:-3;i.satisfaction=Math.max(0,Math.min(100,(i.satisfaction??88)+l)),r.resolved=!0,r.choice=String(e.value);const o=e.value==="breakfast"?"生日早餐已确认，两个人一起吃很开心。":e.value==="suite"?"生日这晚真的住进 Standard Suite，房费也没变。":e.value==="card"?"收到手写生日卡，Front Office 记得这一天。":"今天按原预订入住，生日没有特别安排。";r.outcome=o,xn(n,i,"birthday"),yn(n,"resolve");const c=t.operations?.profiles[i.profileId??""];return c&&(c.history.push({day:t.day,text:o}),c.history=c.history.slice(-8)),nn(n,i.name+"："+o+" 支出 ¥"+a+"。","部门",i.roomId),!0}function Jd(n){const e=n.game;if(e.minute<1200||e.evening?.day===e.day)return;const t=st(n),i=n.guests.filter(h=>!h.staff&&h.roomId&&!h.departing),r=i.length,s=t.filter(h=>h.status==="dirty"||h.status==="cleaning").length,a=e.events.length+n.guests.filter(h=>!h.departing&&(h.late==="pending"||h.challenge&&!h.challenge.resolved||h.occasion&&!h.occasion.resolved&&h.roomId)).length,l=i.reduce((h,p)=>h+(p.rate??e.price),0),o=i.filter(h=>h.source==="平台").reduce((h,p)=>h+Math.round((p.rate??e.price)*.15),0),c=380+t.length*65+Object.values(e.managers).reduce((h,p)=>h+p*180,0),u=[];a&&u.push({title:"先接住还未解决的诉求",text:`还有 ${a} 项待办；夜班继续拖延可能产生差评。先确认晚退和特殊安排，再处理现场事件。`,target:"events"}),e.operations?.lostBookings&&u.push({title:"减少无法兑现的预订",text:`今天 ${e.operations.lostBookings} 单预订需安置。明早先核对可售房和 SUA 锁房，满房时暂停新增推广。`,target:"bookings"}),s&&u.push({title:"夜班先把房间交出来",text:`还有 ${s} 间脏房或正在清洁。核对客房人手，明早到店前留出翻房时间。`,target:"hotel"}),(e.stock<20||e.clubStock<20)&&u.push({title:"补足餐饮库存",text:`早餐 ${e.stock} 份、酒廊 ${e.clubStock} 份。先补不足 20 份的餐台，再按明早预订量备餐。`,target:"operations"});const d=Math.round(r/Math.max(1,t.length)*100),f=e.operations?.forecast?.occupancy;f!==void 0&&d<f-15&&u.push({title:"入住低于晨会预估",text:`当前 ${d}%，预估 ${f}%。先核对待到店与房态，再在明早比较挂牌价；今晚还有临时客流，暂不把缺口全归因于价格。`,target:"bookings"}),u.length||u.push({title:"守住今天的服务节奏",text:"暂未发现待办积压、低库存或明显入住缺口。核对客史中的服务记录，明早按新预订量安排人手。",target:"history"}),e.evening={plan:Du(n,e.revenue+l-e.expense-o-c,"evening"),day:e.day,minute:e.minute,open:!0,occupancy:d,expected:f,arrivals:e.arrivals,revenue:e.revenue,expense:e.expense,roomRevenue:l,projectedNet:e.revenue+l-e.expense-o-c,pending:a,complaints:e.complaints,logs:e.logs.filter(h=>h.day===e.day&&h.category==="客诉").map(h=>({...h})),notes:u.slice(0,4)},e.paused=!0}const Zs=(n,e,t=!1)=>Math.round(n*(qn(e)==="suite"&&t?1:vi[qn(e)].factor)*(1+((e.level??1)-1)*.1)),Qd=n=>2500*n,co=n=>n?Math.max(8,24-n*5):30,uo=n=>n?Math.max(10,35-n*7):40,tc=n=>Math.max(140,260-n*20),jd=(n,e,t)=>Math.round(n*(1+e*.04+(t-1)*.06)),Nu={house:"Housekeeping",engineering:"Engineering",fnb:"F&B",front:"Front Office",revenue:"值班经理"};function nc(n,e,t,i="floor-lobby"){const r={id:e,name:Nu[t],tier:"Staff",staff:!0,staffRole:t,floorId:i,thought:"准备接班",color:t==="house"?11122336:t==="engineering"?13339446:3165019,route:[-1,-1],z:1.1};return n.guests.push(r),Rr(n,r),r}function Ii(n,e){return n.guests.some(t=>t.staff&&t.job?.target===e)}function Yi(n,e,t,i,r){return e.movement?.steps.length?!1:(e.job={kind:t,target:i,remaining:r},dn(n,e,i),e.thought=t==="clean"?"推车去翻房":t==="repair"?"带工具去检查":t==="stock"?"补货送到餐台":t==="front"?"接待下一位住客":"巡场检查",nn(n,e.name+" 已接单。","部门",i),!0)}function ef(n,e,t){const i=n.game,r=ei(n);for(const a of Object.keys(Nu)){const l=i.managers[a]?a==="house"||a==="engineering"?i.managers[a]:1:0;for(let o=0;o<l;o++){const c="staff-"+a+"-"+o;n.guests.some(u=>u.id===c)||nc(n,c,a,a==="fnb"?"floor-breakfast":"floor-lobby")}}const s=st(n).find(a=>a.timer&&!a.construction&&!Ii(n,a.id));if(s){let a=n.guests.find(l=>l.id==="staff-duty");a||(a=nc(n,"staff-duty","house")),!a.job&&!a.movement?.steps.length&&Yi(n,a,s.status==="maintenance"?"repair":"clean",s.id,s.timer)}for(const a of n.guests.filter(l=>l.staffRole)){if(Rr(n,a),Eu(n,a),wu(a),a.movement.steps.length)continue;if(a.job){const o=a.job,c=n.entities[o.target];if(o.kind==="clean"||o.kind==="repair"){if(c?.kind!=="room"||c.construction||!["dirty","cleaning","maintenance"].includes(c.status)){a.job=void 0;continue}c.timer=o.remaining}if(a.thought={clean:"正在更换床品",repair:"正在检查空调",stock:"正在补 buffet",front:"正在核对房卡",patrol:"巡场检查中"}[o.kind],--o.remaining>0)continue;if((o.kind==="clean"||o.kind==="repair")&&c?.kind==="room"&&(c.timer=void 0,c.status=c.suaBookingId?"reserved":"available",i.events=i.events.filter(u=>!(u.kind==="repair"&&u.target===c.id)),yn(n,"service"),r.hkCompleted+=o.kind==="clean"?1:0,nn(n,c.number+" "+(o.kind==="clean"?"床品已刷新，恢复可售。":"故障修复，恢复可售。"),"房态",c.id)),o.kind==="stock"){const u=o.target==="facility-club"?"clubStock":"stock";i[u]+=40,i.events=i.events.filter(d=>!(d.kind==="supplies"&&d.target===o.target)),r.stockDelivered++,nn(n,a.name+" 已将 40 份餐饮送上餐台。","部门",o.target)}if(o.kind==="front"){const u=n.guests.find(d=>!d.staff&&!d.roomId&&!d.departing);if(u){const d=r.bookings.find(v=>v.id===u.reservationId)?.roomId,f=st(n).filter(v=>(v.status==="available"||v.status==="reserved"&&(v.suaBookingId===u.reservationId||!v.suaBookingId&&u.tier==="Globalist"))&&!v.construction),h=f.filter(v=>v.type==="suite"&&v.category!=="premium"),p=d?f.find(v=>v.id===d):u.tier==="Globalist"?h[0]??f[0]:f.find(v=>!(r.suitePolicy==="hold"&&h.length<=1&&h.includes(v)));p&&e({type:"checkin",id:u.id,roomId:p.id})}}yn(n,"delegate"),a.job=void 0,a.thought="处理完成，准备下一单",a.movement.nextDecision=Zt(n)+20;continue}const l=a.staffRole;if(l==="house"&&i.managers.house&&a.id!=="staff-duty"){const o=st(n).find(c=>c.status==="dirty"&&!c.construction&&!Ii(n,c.id));if(o&&Yi(n,a,"clean",o.id,co(i.managers.house))){o.status="cleaning";continue}}if(l==="engineering"&&i.managers.engineering){const o=st(n).find(c=>c.status==="maintenance"&&!c.construction&&!Ii(n,c.id));if(o&&n.metrics.cash>=100){Yi(n,a,"repair",o.id,uo(i.managers.engineering))&&t(100);continue}}if(l==="fnb"&&i.managers.fnb){const o=i.stock<20?"facility-breakfast":i.clubStock<20?"facility-club":null;if(o&&!Ii(n,o)&&n.metrics.cash>=tc(i.managers.fnb)){Yi(n,a,"stock",o,8)&&t(tc(i.managers.fnb));continue}}if(l==="front"&&i.managers.front&&n.guests.some(o=>!o.staff&&!o.roomId&&!o.departing)){Yi(n,a,"front","facility-lobby",Math.max(2,7-i.managers.front));continue}if(l==="revenue"&&Zt(n)>=a.movement.nextDecision){const o=Object.values(n.entities).filter(u=>u.kind==="facility"&&!u.construction),c=o[Math.floor(i.minute/60)%o.length];c&&Yi(n,a,"patrol",c.id,10)}}}function tf(n){for(const e of n.floors)e.construction&&--e.construction.remaining<=0&&(e.construction=void 0,ns(n,e.entityIds[0]),nn(n,e.label+" 施工验收完成：整层供电，三个空位可配置。","升级",e.entityIds[0]));for(const e of Object.values(n.entities)){const t=e.construction;t&&(--t.remaining>0||(e.construction=void 0,e.level=t.targetLevel??e.level??1,e.kind==="room"?e.status="available":(e.capacity+=4,e.quality=Math.min(100,e.quality+5),e.maintenance=100),yn(n,"upgrade-complete"),ns(n,e.id),nn(n,(e.kind==="room"?e.number:e.name)+" 改造竣工，新的空间已开放。","升级",e.id)))}}function ha(n,e){e.staff||(e.persona??=Object.keys(ml)[Gi(e.id)%11],Rr(n,e))}function nf(n,e){return n.guests.filter(t=>!t.staff&&!t.departing&&!t.waitingFor&&t.movement?.destination===e&&(t.movement.steps.length>0||t.movement.position.phase==="public")).length}function rf(n,e){const t=n.game.minute,i=t/60,r=ml[e.persona??"chill"],s=[{id:e.roomId,weight:i>=22||i<7?25:3}];for(const a of Object.values(n.entities)){if(a.kind!=="facility"||a.construction)continue;let l=0;a.role==="breakfast"&&(l=i>=7&&i<10?5:i>=10&&i<10.5?1:0),a.role==="club"&&(l=i>=17&&i<20.5?4:i>=14&&i<17?.5:0),a.role==="gym"&&(l=i>=7&&i<10?1.5:i>=16&&i<21?1.8:i>=10&&i<16?.6:0),a.role==="spa"&&(l=i>=11&&i<20?1.4:0),a.role==="lobby"&&(l=i>=7&&i<22?.7:0),a.role==="rooftop"&&(l=n.game.weather==="rain"?0:i>=16&&i<19?1.8:i>=19&&i<21?.5:i>=10&&i<16?.4:0),l*=r.likes[a.role]??1,a.role==="club"&&(l*=e.tier==="Globalist"||e.goh?1.5:e.tier==="普通客"?.25:.7),n.game.positioning==="business"&&(a.role==="lobby"||a.role==="breakfast")&&(l*=1.3),n.game.positioning==="resort"&&(a.role==="spa"||a.role==="rooftop"||a.role==="gym")&&(l*=1.4),n.game.weather==="rain"&&(a.role==="spa"||a.role==="lobby")&&(l*=1.3);const o=nf(n,a.id);l*=o+n.guests.filter(c=>c.waitingFor===a.id).length>=a.capacity+4?0:Math.max(.1,1-o/Math.max(1,a.capacity)),l*=Math.max(.2,a.maintenance/100),e.lastVisit===a.id&&(l*=.2),e.persona==="family"&&i>=20&&(l=0),l>0&&s.push({id:a.id,weight:l})}return s}function Fu(n,e,t){return n.guests.filter(i=>i.id!==t&&!i.staff&&!i.waitingFor&&i.movement?.destination===e&&!i.movement.steps.length&&i.movement.position.phase==="public").length}function ic(n,e,t){e.waitingFor=t,e.waitSince=Zt(n);const i=e.movement;i.steps=[{x:6.2,z:2.05,level:i.position.level,phase:"public"}]}function rc(n,e,t,i){if(e.lastVisit=t.id,Fu(n,t.id,e.id)>=t.capacity){e.experience={place:t.id,kind:"full",at:Zt(n)},ic(n,e,t.id),xn(n,e,"full");return}if(t.construction){dn(n,e,e.roomId);return}const r=t.role==="breakfast"||t.role==="club",s=t.role==="breakfast"?"stock":"clubStock",a=t.role==="breakfast"?e.birthdayBreakfast??0:0,l=Math.max(e.persona==="family"?3:1,a);if(r&&n.game[s]<=0&&!a){e.experience={place:t.id,kind:"shortage",at:Zt(n)},e.satisfaction=Math.max(0,(e.satisfaction??90)-5),n.game.complaints++,i.reputation(-1),xn(n,e,"shortage"),i.log("客诉",e.name+"："+e.thought,t.id),ic(n,e,t.id);return}e.waitingFor=void 0,e.waitSince=void 0,e.experience={place:t.id,kind:"served",at:Zt(n)},r&&(n.game[s]=Math.max(0,n.game[s]-Math.max(0,l-a)),a&&(e.birthdayBreakfast=0));const o=t.role==="club"?e.tier==="Globalist"||e.goh?0:80:t.role==="gym"?20:t.role==="spa"?280:t.role==="rooftop"?45:0,c=Math.round(o*(1+((t.level??1)-1)*.2)*(e.persona==="whale"?1.5:1)*((n.game.operations?.profiles[e.profileId??""]?.trust??0)>=2?1.15:1));c&&(e.spend=(e.spend??0)+c,i.income(c),i.progress("ancillary",c)),e.satisfaction=Math.min(100,(e.satisfaction??90)+(t.level??1)),t.maintenance=Math.max(0,t.maintenance-.1),e.speech??={next:0,recent:[]},e.speech.next=0,mr(n,e)}function ia(n,e){e.departing=!0,e.movement?.steps.length||dn(n,e,"exit")}function sf(n,e,t,i){ha(n,e);const r=e.movement,s=Zt(n),a=Eu(n,e);if(e.departing){a&&r.destination==="exit"&&(e.exitAt=s),!r.steps.length&&r.destination!=="exit"&&dn(n,e,"exit"),mr(n,e);return}if(!e.roomId){mr(n,e);return}if(a&&!e.waitingFor){const l=n.entities[r.destination];l?.kind==="facility"&&rc(n,e,l,i)}if(e.waitingFor){const l=n.entities[e.waitingFor];!r.steps.length&&l?.kind==="facility"&&!l.construction&&Fu(n,l.id,e.id)<l.capacity&&(l.role!=="breakfast"||n.game.stock>0||e.birthdayBreakfast)&&(l.role!=="club"||n.game.clubStock>0)?rc(n,e,l,i):!r.steps.length&&s-(e.waitSince??s)>=45&&(e.waitingFor=void 0,e.satisfaction=Math.max(0,(e.satisfaction??90)-4),i.reputation(-1),i.log("客诉",e.name+" 等待公区服务过久，返回房间。","facility-"+(l?.kind==="facility"?l.role:"lobby")),dn(n,e,e.roomId)),mr(n,e);return}if(!e.late&&(e.checkoutDay===n.game.day+1&&n.game.minute>=1080||e.checkoutDay===n.game.day&&n.game.minute>=540)&&(e.tier==="Globalist"||e.tier==="Explorist"||e.persona==="family")&&(e.lateHour=e.tier==="Globalist"?16:14,e.late="pending",xn(n,e,"late"),i.log("入住",e.name+" · "+e.tier+"："+(e.checkoutDay===n.game.day?"今天":"明天")+"能 "+Fi(e)+" 退房吗？",e.roomId)),e.late==="pending"&&!n.game.tasks.some(l=>l.id==="late-decision")&&n.game.tasks.push({id:"late-decision",title:"完成一次会员晚退协商",goal:1,progress:0,reward:500,claimed:!1,target:"events"}),!r.steps.length&&(n.game.weather==="rain"&&e.floorId==="floor-rooftop"||n.entities[r.destination]?.kind==="facility"&&n.entities[r.destination].construction)&&dn(n,e,e.roomId),!r.steps.length&&s>=r.nextDecision)if(r.destination!==e.roomId)dn(n,e,e.roomId);else{const l=rf(n,e);let o=t()*l.reduce((u,d)=>u+d.weight,0),c=e.roomId;for(const u of l)if(o-=u.weight,o<=0){c=u.id;break}if(c!==e.roomId)dn(n,e,c);else if(r.nextDecision=s+35+Math.floor(t()*75),t()<.35){const u=(Number(n.entities[e.roomId].number)%100-2)*4.93;r.steps=[{x:u+(t()-.5)*1.1,z:1.25,level:r.position.level,phase:"room"}],r.arrived=!1}}mr(n,e)}function af(n,e,t){const i=n.game.guestMemory??={},r=Ru(e);i[r]={visits:(i[r]?.visits??0)+1,satisfaction:e.satisfaction??90,denied:!!e.denied};const s=(e.satisfaction??90)>=90;if(s&&["creator","planner","whale"].includes(e.persona??"")){const a=e.persona==="whale"?360:e.persona==="planner"?220:260;t.income(a),t.log("收益",e.name+" · "+(e.persona==="whale"?"留下 ¥360 小费。":e.persona==="planner"?"认可团队动线，支付 ¥220 场地考察费。":"发出好 DP，带来 ¥260 推广返佣。"))}e.persona==="auditplus"&&(n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s?3:-2))),t.log("部门",s?"神秘审计客：SOP 和现场是同一版，业主 +3。":"神秘审计客默默记下几个问题，业主 -2。")),xn(n,e,"checkout")}const sc={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},of=n=>`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`,Ou=n=>["周一","周二","周三","周四","周五","周六","周日"][(n-1)%7];function fo(n){const e=n.game,t=(e.day-1)%7>=4;return(e.positioning==="business"?t?.75:1.35:e.positioning==="resort"?t?1.6:.85:t?1.25:1.1)*(e.weather==="rain"?.88:1)*(e.development&&e.development.campaignUntil>=e.day?1.35:1)*(1+Math.max(0,st(n).length-9)/30)*Math.max(.45,Math.min(1.5,650/e.price))}function gn(n){const e=n.game;return e.seed=Math.imul(1664525,e.seed)+1013904223>>>0,e.seed/4294967296}function ot(n,e,t,i){const r=n.game;r.notice=t,r.logs.push({id:r.nextId++,day:r.day,minute:r.minute,category:e,text:t,target:i})}function ln(n,e){return n.metrics.cash<e?(n.game.notice=`现金不足，需要 ¥${e}`,!1):(n.metrics.cash-=e,n.game.expense+=e,!0)}function xl(n,e){e=Math.round(e),n.metrics.cash+=e,n.game.revenue+=e,yn(n,"revenue",e)}function $n(n,e){const t=n.game;e<0&&(e=-Math.min(-e,Math.max(0,8-t.repLoss)),t.repLoss-=e),n.metrics.reputation=Math.max(0,Math.min(100,n.metrics.reputation+e))}const cn=yn,ku=Bd;function ho(n={}){const e=gu();e.mode="game",e.metrics={cash:28600,reputation:86,owner:82},e.guests=e.guests.filter(t=>t.staff||t.roomId),e.game={day:1,minute:480,paused:!1,seed:20260905,nextId:100,nextArrival:490,nextEvent:650,price:650,positioning:"business",weather:"sunny",stock:32,clubStock:25,managers:{front:0,house:0,engineering:0,fnb:0,revenue:0},logs:[],events:[],tasks:ku(1),reports:[],reportOpen:!1,revenue:0,expense:0,nights:0,arrivals:0,upgrades:0,complaints:0,lost:0,repLoss:0,roomMinutes:0,soldMinutes:0,closedMinutes:0,memory:{},level:1,notice:"欢迎接班：前台接待，空房翻房，套房留给合适的人。"};for(const t of e.guests)if(t.roomId){const i=e.entities[t.roomId];t.stayLength=i.nightsLeft,t.checkoutDay=1+i.nightsLeft,t.rate=Yt(i)?900:650,t.satisfaction=90,t.segment="商务"}for(const t of st(e))t.level=1,t.status==="cleaning"&&(t.timer=20);return Cr(e),fa(e),vu(e,n.guided===!1),e.guests.forEach(t=>ha(e,t)),po(e),gl(e),ot(e,"部门","Hyatt Place 正式开业。4× 已开放；关闭面板后时间继续。"),bl(e),e}function po(n,e){const t=n.game,i=gn(n),r=["陈","林","何","张","周","王","李","赵"][Math.floor(gn(n)*8)]+"先生",s=i<.27?"Globalist":i<.5?"Explorist":i<.8?"Member":"普通客",a=t.positioning==="resort"||(t.day-1)%7>=4&&gn(n)<.65,l=Au(a,gn(n),gn(n)),o={id:"guest-"+t.nextId++,name:r,tier:s,floorId:"floor-lobby",thought:s==="Globalist"?"今晚有套吗？":"想住 "+l+" 晚",color:3561066,route:[-2.5,2.5],z:1.7,segment:a?"度假":l>=5?"长住":"商务",stayLength:l,patience:100+t.managers.front*50+((n.entities["facility-lobby"].kind==="facility"?n.entities["facility-lobby"].level:1)??1)*10,satisfaction:90+(t.memory[r]??0)};Vd(n,o,e),ha(n,o),o.goh=o.tier==="Globalist"&&gn(n)<.12,o.sua=!!e?.sua,xn(n,o,"arrival"),n.guests.push(o),t.arrivals++,ot(n,"入住",`${o.name} · ${o.tier} · ${o.source} 到店，计划 ${o.stayLength} 晚。`,"facility-lobby")}const ki=n=>n.guests.filter(e=>!e.staff&&!e.roomId&&!e.departing);function bl(n){for(const e of Object.values(n.entities))e.kind==="facility"&&(e.usage=n.guests.filter(t=>!t.staff&&!t.departing&&t.floorId===e.floorId&&t.movement?.position.phase==="public"&&!t.movement.steps.length).length,e.staffing=n.guests.filter(t=>t.staff&&t.floorId===e.floorId).length)}function lf(n,e){e.roomId&&dn(n,e,e.roomId)}function cf(n){const e=n.game,t=st(n);let i=0,r=0;for(const u of n.guests)if(u.roomId){const d=u.rate??e.price;if(i+=d,u.spend=(u.spend??0)+d,u.source==="平台"){const f=Math.round(d*.15);n.metrics.cash-=f,e.expense+=f}r++}xl(n,i),e.nights=r;for(const u of ki(n))vl(n,u),ia(n,u);const s=380+t.length*65+Object.values(e.managers).reduce((u,d)=>u+d*180,0);n.metrics.cash-=s,e.expense+=s;const a=Math.round(100*e.soldMinutes/Math.max(1,e.roomMinutes)),l=r?Math.round(i/r):0,o=e.stock<20?"早餐库存偏低，明早先补货。":fo(n)>1.1?"明日需求偏旺，先清洁脏房，保留一间套房。":"明日需求相对平稳，可下调价格或投资装修。";e.reports.push({plan:Du(n,e.revenue-e.expense,"settled"),day:e.day,revenue:e.revenue,expense:e.expense,adr:l,occupancy:a,revpar:Math.round(i/Math.max(1,t.length)),upgrades:e.upgrades,complaints:e.complaints,lost:Math.round(e.closedMinutes/Math.max(1,e.roomMinutes)*100),recommendation:o,forecastOccupancy:e.operations?.forecast?.occupancy,actualEveningOccupancy:Math.round(r/Math.max(1,t.length)*100),bookingsLost:e.operations?.lostBookings,score:is(n).total});const c=Cr(n).scores;c.push({day:e.day,value:is(n).total}),c.length>30&&c.shift(),e.reports.length>30&&e.reports.shift(),$n(n,e.complaints===0?3:1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(e.revenue>=e.expense?2:-3))),ot(n,"收益",`Day ${e.day}：收入 ¥${e.revenue}，成本 ¥${e.expense}，入住率 ${a}%。`),e.reportOpen=!0,e.paused=!0}function uf(n){const e=n.game;e.day++,e.minute=480,e.nextArrival=490,e.nextEvent=600,e.weather=gn(n)<.25?"rain":"sunny",e.revenue=e.expense=e.nights=e.arrivals=e.upgrades=e.complaints=e.lost=e.repLoss=e.roomMinutes=e.soldMinutes=e.closedMinutes=0,e.reportOpen=!1,e.paused=!1,e.tasks=ku(e.day);for(const t of st(n))if(t.guestId){const i=n.guests.find(r=>r.id===t.guestId);t.nightsLeft=Math.max(0,(i?.checkoutDay??e.day)-e.day)}e.managers.revenue&&(e.price=jd(fo(n)>1.1?750:590,e.level,e.managers.revenue)),gl(n),ot(n,"部门",`${Ou(e.day)} 开始。${e.weather==="rain"?"今天有雨。":""}预计需求 ${Math.round(fo(n)*100)}%。`)}function df(n,e){const t=n.game;if(!t||t.paused)return;const i={income:r=>xl(n,r),reputation:r=>$n(n,r),log:(r,s,a)=>ot(n,r,s,a),progress:(r,s=1)=>cn(n,r,s)};Od(n);for(let r=0;r<e&&!t.paused;r++){t.minute++,tf(n),ef(n,a=>mo(n,a),a=>ln(n,a)),Hd(n,a=>po(n,a)),Gd(n);const s=st(n);t.roomMinutes+=s.length,t.soldMinutes+=s.filter(a=>a.status==="occupied").length,t.closedMinutes+=s.filter(a=>["dirty","cleaning","maintenance"].includes(a.status)).length,n.atmosphere=t.minute<1020?"day":t.minute<1170?"dusk":"night";for(const a of s)a.timer&&!a.construction&&!Ii(n,a.id)&&--a.timer<=0&&(a.timer=void 0,a.status="available",cn(n,"service"),ot(n,"房态",`${a.number} 已整理完毕，可重新出售。`,a.id));ki(n).forEach((a,l)=>{const o=a.movement;if(o&&!o.steps.length&&a.floorId==="floor-lobby"){const c=-3.7+l%7*.9,u=1.55+Math.floor(l/7)*.28;Math.hypot(o.position.x-c,o.position.z-u)>.15&&(o.steps=[{x:c,z:u,level:0,phase:"public"}])}});for(const a of[...n.guests]){if(a.staff)continue;if(sf(n,a,()=>gn(n),i),wu(a),a.departing){a.exitAt!==void 0&&Zt(n)-a.exitAt>30&&(n.guests=n.guests.filter(c=>c.id!==a.id));continue}if(!a.roomId){a.patience=(a.patience??100)-1,a.patience<=0&&(vl(n,a),ia(n,a),t.lost++,t.complaints++,$n(n,-1),ot(n,"客诉",`${a.name} 等待过久离店，失去一笔预订。`,"facility-lobby"));continue}const l=n.entities[a.roomId],o=Tu(a);(a.checkoutDay??99)<=t.day&&t.minute>=o&&!a.movement.steps.length&&(a.late==="pending"&&(a.late="deny",ot(n,"客诉",`${a.name} 的 ${Fi(a)} 未确认，按 ${fs(a)}:00 退房。`,l.id),$n(n,-1)),Wd(n,a),af(n,a,i),l.extraBed=!1,l.status="dirty",l.guestId=void 0,l.nightsLeft=0,t.memory[a.name]=(a.satisfaction??90)>=80?Math.min(5,(t.memory[a.name]??0)+1):0,a.roomId=void 0,ia(n,a),ot(n,"入住",`${a.name} 退房，${l.number} 等待 Housekeeping 翻房。`,l.id))}if(t.minute>=t.nextArrival&&t.minute<1260&&(ki(n).length<8&&po(n),t.nextArrival=t.minute+Math.max(35,Math.round(780/Iu(n)*(.7+gn(n)*.6)*(t.operations?.event==="flights"?t.minute<1080?1.8:.45:1)))),t.minute>=t.nextEvent&&t.events.length<2){const a=s.find(u=>u.status==="available"),o=["repair","complaint","supplies","vip"][Math.floor(gn(n)*4)],c=o==="repair"&&a?a.id:o==="supplies"?"facility-breakfast":"facility-lobby";if(!t.events.some(u=>u.kind===o)){o==="repair"&&a&&(a.status="maintenance"),o==="supplies"&&(t.stock=Math.min(t.stock,4));const u={repair:"设备故障，需要工程协助",complaint:"住客希望安静一点",supplies:"早餐供应临时波动",vip:"常客期待额外关照"};t.events.push({id:t.nextId++,kind:o,title:u[o],target:c,expires:t.day*1440+t.minute+120}),ot(n,"客诉",u[o],c)}t.nextEvent=t.minute+180+Math.round(gn(n)*90)}for(const a of[...t.events]){const l=a.kind==="repair"?"engineering":a.kind==="supplies"?"fnb":"front";a.kind!=="repair"&&a.kind!=="supplies"&&t.managers[l]&&n.metrics.cash>=150?mo(n,{type:"resolve",id:String(a.id),value:"sop"}):!Ii(n,a.target)&&t.day*1440+t.minute>=a.expires&&(t.events=t.events.filter(o=>o.id!==a.id),t.complaints++,$n(n,-2),ot(n,"客诉",`未及时处理：${a.title}`,a.target))}qd(n),_u(n),Jd(n),t.minute>=1440&&cf(n)}bl(n)}function ff(n,e){const t=n.game;if(!t||Yd(n,e)||Kd(n,e)||$d(n,e)||Xd(n,e)||zd(n,e))return;const i=e.id?n.entities[e.id]:void 0,r=i?.kind==="room"?i:null;switch(e.type){case"checkin":{const s=ki(n).find(o=>o.id===e.id),a=n.entities[e.roomId??""];if(!s||a?.kind!=="room"||!(a.status==="available"||a.status==="reserved"&&s.tier==="Globalist"&&(!a.suaBookingId||a.suaBookingId===s.reservationId))){t.notice="住客或房态已变化，请重新选择。";break}s.roomId=a.id,s.checkoutDay=t.day+(s.stayLength??2),s.rate=s.bookedRate??Zs(t.price,a,s.tier==="Globalist"),s.upgrades=Yt(a)&&s.tier==="Globalist",s.denied=s.tier==="Globalist"&&!bu(a),s.upgrades?(t.upgrades++,cn(n,"vip"),$n(n,1)):s.tier==="Globalist"&&st(n).some(o=>Yt(o)&&o.status==="available")&&$n(n,-1);const l=t.operations?.bookings.find(o=>o.id===s.reservationId);l&&(l.status="checkedin"),a.suaBookingId=void 0,a.status="occupied",a.guestId=s.id,a.nightsLeft=s.stayLength??2,lf(n,s),xn(n,s,s.denied?"denied":"checkin"),cn(n,"arrivals"),ot(n,"入住",`${s.name} 入住 ${a.number} · ${a.nightsLeft} 晚 · ¥${s.rate}/晚${s.upgrades?"，会员升套":""}。`,a.id);break}case"reject":{const s=ki(n).find(a=>a.id===e.id);s&&(vl(n,s),ia(n,s),xn(n,s,"denied"),t.lost++,ot(n,"入住",`已为 ${s.name} 婉拒本次入住。`,"facility-lobby"));break}case"clean":r?.status==="dirty"&&ln(n,90)&&(r.status="cleaning",r.timer=30,ot(n,"房态",`${r.number} 开始清洁，约 30 游戏分钟。`,r.id));break;case"repair":r?.status==="maintenance"&&!r.construction&&!r.timer&&!Ii(n,r.id)&&ln(n,180)?(r.timer=40,ot(n,"房态",`${r.number} 开始维修。`,r.id)):i?.kind==="facility"&&ln(n,200)&&(i.maintenance=100,ot(n,"房态",`${i.name} 维护完成。`,i.id));break;case"configure-room":{if(r?.status!=="unbuilt"||n.floors.find(o=>o.id===r.floorId)?.construction){t.notice="楼层施工尚未完成。";break}const[s,a]=String(e.value).split(":");if(!Object.hasOwn(vi,s)||!["king","twin"].includes(a))break;const l=s;if(!ln(n,vi[l].cost))break;r.category=l,r.bed=a,r.type=l==="suite"||l==="premium"?"suite":r.bed,r.status="available",r.level=1,ns(n,r.id),ot(n,"升级",`${r.number} 已设置为 ${vi[l].name} · ${a==="twin"?"双床":"大床"}。`,r.id);break}case"upgrade":r?.status==="available"&&(r.level??1)<5&&ln(n,Qd(r.level??1))&&(r.construction={remaining:90,total:90,targetLevel:(r.level??1)+1},r.status="maintenance",ns(n,r.id),cn(n,"upgrade"),ot(n,"升级",`${r.number} 封闭装修：90 分钟后升级竣工。`,r.id));break;case"reserve":r?.status==="available"&&Yt(r)&&(r.status="reserved",ot(n,"房态",`${r.number} 预留给 Globalist / SUA。`,r.id));break;case"release":r?.status==="reserved"&&!r.suaBookingId&&(r.status="available",ot(n,"房态",`${r.number} 已释放预留。`,r.id));break;case"hire":{const s=e.id;if(!Object.hasOwn(sc,s)||t.managers[s])break;ln(n,3800)&&(t.managers[s]=1,cn(n,"delegate"),ot(n,"部门",`${sc[s]}主管到岗，常规工作将按 SOP 自动处理。`));break}case"stock":{const s=e.id==="club"?"clubStock":"stock";if(t[s]>=120){t.notice="库存充足，不必继续采购。";break}ln(n,300)&&(t[s]=Math.min(160,t[s]+50),cn(n,"stock"),ot(n,"部门",`${s==="stock"?"早餐":"酒廊"}已补货 50 份。`,"facility-"+(s==="stock"?"breakfast":"club")));break}case"resolve":{const s=t.events.find(c=>c.id===Number(e.id));if(!s)break;const a=s.kind==="repair"?"engineering":s.kind==="supplies"?"fnb":"front",l=e.value==="sop";if(l&&!t.managers[a]){t.notice="需要先聘任对应部门主管。";break}if(!ln(n,l?150:350))break;t.events=t.events.filter(c=>c.id!==s.id);const o=n.entities[s.target];s.kind==="repair"&&o?.kind==="room"&&o.status==="maintenance"&&(o.status="available",o.timer=void 0,cn(n,"service")),s.kind==="supplies"&&(t.stock+=25),cn(n,"resolve"),$n(n,l?2:1),n.metrics.owner=Math.min(100,n.metrics.owner+1),l&&cn(n,"delegate"),ot(n,"部门",`${l?"部门 SOP":"经理亲自协调"}解决「${s.title}」，口碑 +${l?2:1}。`,s.target);break}case"expand":{const s=n.floors.filter(o=>o.role==="guest");if(!ln(n,1e4+5e3*(s.length-3)))break;const a=s.length+2,l={id:"floor-"+a,number:a,label:a+"F",name:"客房",role:"guest",entityIds:[],construction:{remaining:240,total:240}};for(let o=1;o<=3;o++){const c=String(a*100+o),u="room-"+c;l.entityIds.push(u),n.entities[u]={id:u,kind:"room",floorId:l.id,number:c,type:"king",status:"unbuilt",nightsLeft:0,level:1}}jl(n,2+s.length),n.floors.splice(2+s.length,0,l),n.floors.forEach((o,c)=>{o.number=c,o.label=o.role==="lobby"?"L":o.role==="rooftop"?"RF":c+"F"}),t.level++,ot(n,"升级",`${l.label} 客房层施工开始：4 小时后交付 3 个空位，施工期间不可配置。`,l.entityIds[0]);break}case"late":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.late!=="pending")break;s.late=e.value==="honor"?"honor":"deny",s.satisfaction=Math.max(0,Math.min(100,(s.satisfaction??90)+(s.late==="honor"?4:-3))),cn(n,"late-decision"),$n(n,s.late==="honor"?1:-1),n.metrics.owner=Math.max(0,Math.min(100,n.metrics.owner+(s.late==="honor"?-1:1))),xn(n,s,s.late==="honor"?"late-honor":"late-deny"),ot(n,"入住",`${s.name} 已确认 ${s.late==="honor"?Fi(s):fs(s)+":00"} 退房。`,s.roomId);break}case"guest-service":{const s=n.guests.find(a=>a.id===e.id);if(!s?.roomId||s.serviceDone)break;ln(n,120)&&(s.serviceDone=!0,s.satisfaction=Math.min(100,(s.satisfaction??90)+6),xn(n,s,"recovery"),cn(n,"resolve"),ot(n,"部门",`${s.name} 的个性化服务已安排：${s.thought}`,s.roomId));break}case"build-spa":{if(n.entities["facility-spa"])break;if(ln(n,12e3)){const s=n.floors.findIndex(a=>a.role==="rooftop");jl(n,s),n.floors.splice(s,0,{id:"floor-spa",number:s,label:s+"F",name:"水疗",role:"spa",entityIds:["facility-spa"]}),n.entities["facility-spa"]={id:"facility-spa",kind:"facility",floorId:"floor-spa",role:"spa",name:"Spa 水疗",capacity:6,usage:0,staffing:0,quality:92,maintenance:100,level:1},n.floors.forEach((a,l)=>{a.number=l,a.label=a.role==="lobby"?"L":a.role==="rooftop"?"RF":l+"F"}),ot(n,"升级","Spa 水疗开业：住客会按偏好预约到访。","facility-spa")}break}case"price":t.price=Math.max(350,Math.min(1800,Math.round(Number(e.value)||650))),ot(n,"收益",`新客挂牌价调整至 ¥${t.price}，已入住客人价格不变。`);break;case"position":["business","resort","urban"].includes(String(e.value))&&(t.positioning=e.value,ot(n,"收益","酒店定位已调整，星期需求与住宿长度随之变化。"));break;case"pause":t.paused=!t.paused;break;case"evening-close":t.evening?.open&&(t.evening.open=!1,t.paused=!1);break;case"continue":t.reportOpen&&uf(n);break;case"claim":{const s=t.tasks.find(a=>a.id===e.id);if(s&&!s.claimed&&s.progress>=s.goal){const a=Math.max(0,s.reward-(s.paid??0));s.claimed=!0,xl(n,a),s.paid=s.reward,ot(n,"收益",`完成「${s.title}」，尾款 ¥${a}；总奖金 ¥${s.reward}。`)}break}}bl(n)}function mo(n,e){if(!n.game)return;const t=xu(n,e);if(t){n.game.notice=t+"。当前目标见经营 checklist。";return}const i=n.game.stock;ff(n,e),e.type==="stock"&&e.id!=="club"&&n.game.stock>i&&n.game.onboarding&&(n.game.onboarding.breakfastPrepared=!0),_u(n)}function go(n){if(n&&typeof n=="object"&&!Object.isFrozen(n)){Object.freeze(n);for(const e of Object.values(n))go(e)}return n}function hf(n=gu()){let e=go(structuredClone(n));const t=new Set,i=r=>{e=go({...e,...r}),t.forEach(s=>s(e))};return{getState:()=>e,subscribe(r){return t.add(r),()=>t.delete(r)},select(r){if(r!==null&&!e.entities[r])throw new Error("Unknown entity: "+r);i({selectedId:r,visited:r?[...new Set([...e.visited,r])]:e.visited})},focusFloor(r){if(!e.floors.some(s=>s.id===r))throw new Error("Unknown floor: "+r);i({focusedFloorId:r})},setSpeed(r){if(![1,2,4].includes(r))throw new Error("Invalid speed");i({speed:r})},setAtmosphere(r){if(!["dusk","night","day"].includes(r))throw new Error("Invalid atmosphere");i({atmosphere:r})},dispatch(r){const s=structuredClone(e);mo(s,r),i(s)},advance(r){if(!e.game||e.game.paused)return;const s=structuredClone(e);df(s,r),i(s)},reset(){i(ho())}}}const ri={materials:{stone:13091246,wall:14997947,wood:6574137,darkWood:3681316,metal:11903338,blue:1653064,linen:15591383,accent:4813165}},pf={available:"可入住",reserved:"升套预留",occupied:"住客在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"维修中",unbuilt:"待建造"},vr=2.55,mf=[-4.93,0,4.93],ac={chill:"#98a989",road:"#213d57",family:"#d39452",points:"#507a77",hunter:"#674666",forum:"#66759b",creator:"#e4d6b4",proposal:"#752b3e",planner:"#35575b",whale:"#b9a287",auditplus:"#454a50",front:"#284759",house:"#678a85",engineering:"#ba8542",fnb:"#eee9d8",revenue:"#354b60"};function _r(n){const e=typeof n=="string"?n:n.persona??"chill",t=ac[e]??ac.chill,i=["points","forum","auditplus","revenue"].includes(e)?'<g fill="none" stroke="#38434a" stroke-width="2"><rect x="23" y="30" width="12" height="8" rx="3"/><rect x="41" y="30" width="12" height="8" rx="3"/><path d="M35 33h6"/></g>':"",r=["chill","forum","engineering","fnb"].includes(e)?`<path d="M18 22q2-16 20-16t20 16Z" fill="${e==="engineering"?"#e8b848":e==="fnb"?"#fffdf3":t}"/><path d="M14 22h48" stroke="${e==="engineering"?"#c78a2c":t}" stroke-width="5" stroke-linecap="round"/>`:"",s=e==="creator"?'<rect x="42" y="67" width="26" height="18" rx="4" fill="#34464a"/><circle cx="55" cy="76" r="6" fill="#91b6ba"/>':e==="proposal"?'<path d="m52 90 4-22" stroke="#73955d" stroke-width="3"/><circle cx="56" cy="66" r="8" fill="#c87380"/>':["points","planner","auditplus","revenue"].includes(e)?'<rect x="46" y="63" width="18" height="25" rx="2" fill="#f4ecd5" transform="rotate(12 55 75)"/><path d="M50 70h10m-10 5h8m-8 5h9" stroke="#87968c"/>':e==="hunter"?'<rect x="50" y="66" width="13" height="23" rx="3" fill="#333f49"/><rect x="52" y="69" width="9" height="14" fill="#b3d9d4"/>':e==="road"||e==="engineering"?'<rect x="47" y="77" width="23" height="17" rx="3" fill="#604e40"/><path d="M54 77v-5h9v5" fill="none" stroke="#604e40" stroke-width="3"/>':e==="family"?'<path d="M18 59v36M58 59v36" stroke="#8a6144" stroke-width="5"/>':e==="whale"?'<path d="m27 59 11 10 11-10" fill="none" stroke="#d7b963" stroke-width="3"/>':e==="fnb"?'<path d="M39 82h31" stroke="#667d7c" stroke-width="3"/><path d="M43 79a11 11 0 0 1 22 0Z" fill="#d4c4a0"/>':e==="house"?'<rect x="48" y="70" width="19" height="8" rx="2" fill="#fffaf0"/><rect x="48" y="79" width="19" height="8" rx="2" fill="#d5e1d8"/>':"";return`<span class="person-avatar" aria-hidden="true"><svg viewBox="0 0 76 76" focusable="false"><rect width="76" height="100" rx="18" fill="#e5e6da"/><circle cx="38" cy="36" r="28" fill="#f3efdf"/><path d="M10 100V78q0-24 28-24t28 24v22" fill="${t}"/><path d="M31 49h14v12q-7 7-14 0" fill="#d6a783"/><ellipse cx="38" cy="32" rx="19" ry="23" fill="#e6bd99"/><path d="M19 30V22q0-18 19-18t19 18v8l-7-13q-14 7-24 0Z" fill="#4a403a"/><g fill="#3c403c"><circle cx="29" cy="32" r="1.6"/><circle cx="47" cy="32" r="1.6"/></g><path d="M33 44q5 4 10 0" fill="none" stroke="#a46c5e" stroke-width="1.7" stroke-linecap="round"/>${i}${r}${s}</svg></span>`}function gf(n){const e={hub:"M3 10 12 3l9 7v11h-6v-7H9v7H3Z",hotel:"M3 20V9h18v11M3 16h18M5 9V5h14v4M7 12h3m4 0h3",front:"M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a6 6 0 0 1 12 0v3m3-17a4 4 0 0 1 0 8m0 3a5 5 0 0 1 5 5",operations:"M4 21v-6m8 6V9m8 12V3M1 15h6m2-6h6m2-6h6",development:"m14 4 6 6M3 21l9-9m0-6 6-4 4 4-4 6-6-6Z",brief:"M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2",evening:"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",tasks:"M5 4h14v18H5ZM9 2h6v4H9ZM8 11l2 2 5-5m-7 9h8",report:"M3 21h19M6 17V9m6 8V3m6 14v-6",history:"M4 4h16v17H4ZM8 8h8m-8 4h8m-8 4h5",log:"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16",bookings:"M3 5h18v17H3ZM7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"};return`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${e[n]??e.hub}"/></svg>`}function Zi(n,e=1,t="king",i="standard"){const r=["hotel","report","history"].includes(n),s=n==="evening"||n==="rooftop",a=e>=4||i==="premium",l=i==="suite"||i==="premium",o=a?"#d6c4a4":"#e4d8be",c=a?"#6c503c":"#947557",u=s?"#526761":"#768369",d=(h,p,v)=>`<path fill="${c}" d="m${h} ${p} ${v} -13 37 15v11l-${v} 15-37-16z"/><path fill="#eee5ce" d="m${h} ${p-6} ${v} -13 37 15-${v} 15z"/><path fill="${u}" d="m${h+14} ${p} ${v} -13 21 9-${v} 15z"/><path fill="#fff8e9" d="m${h+3} ${p-8} 15-5 12 5-15 5z"/>`;let f="";return r?f=(t==="twin"?d(65,83,28)+d(107,95,28):d(79,88,53))+(l?'<path fill="#596e5e" d="m20 77 28-8 22 10v15l-27 10-23-12z"/><path fill="#8d9c7d" d="m18 74 30-9 24 11-29 10z"/>':""):n==="gym"?f='<path fill="#3e5147" d="m60 93 39-12 31 12-38 15z"/><path fill="none" stroke="#b7a88b" stroke-width="5" d="m85 86-6-28 20-5 7 24m27 22-4-31 21-6 8 29"/><path fill="#526454" d="m147 58 19-6 1 11-18 6z"/>':n==="spa"?f='<path fill="#806747" d="m64 83 67-19 35 15-68 24z"/><path fill="#e8e3cd" d="m63 76 67-19 38 16-69 25z"/><path fill="#f8f1df" d="m71 74 20-6 16 7-21 7z"/><path fill="#95834f" d="m160 84 24-7 11 7-23 8z"/>':["breakfast","club"].includes(n)?f='<path fill="#796049" d="m61 78 94-27 23 9v22l-95 29-22-11z"/><path fill="#e5d1a6" d="m58 72 98-28 25 11-99 30z"/><path fill="#5f7359" d="m77 67 20-6 12 5-20 7zm37-11 18-5 12 5-18 5z"/><path fill="#c59b57" d="m146 48 12-4 10 4-12 4z"/>':f='<path fill="#475f4d" d="m30 80 38-11 28 12v19l-38 13-28-14z"/><path fill="#8a9b7b" d="m27 76 40-12 31 13-40 13z"/><path fill="#9f7e51" d="m103 84 33-10 26 11-34 12z"/><path stroke="#71563c" stroke-width="3" d="M119 89v21m27-27v19"/>',`<svg class="space-art" viewBox="0 0 240 120" aria-hidden="true" focusable="false"><defs><linearGradient id="space-${n}-${e}" x2="1" y2="1"><stop stop-color="${o}"/><stop offset="1" stop-color="#b8a78b"/></linearGradient><linearGradient id="view-${n}-${e}" y2="1" x2="0"><stop stop-color="${s?"#334c54":"#a8c3bf"}"/><stop offset="1" stop-color="${s?"#172d35":"#dde1c9"}"/></linearGradient></defs><path fill="url(#space-${n}-${e})" d="M0 0h240v120H0z"/><path fill="#8b7258" d="m0 100 126-41 114 31v30H0z"/><path fill="#baa37e" d="m0 100 126-41 114 31v8l-114-26L0 113z"/><path fill="${c}" opacity=".7" d="M0 0h29v90H0z"/><path fill="url(#view-${n}-${e})" d="M148 8h62v58h-62z"/><path fill="none" stroke="#f2e6c7" stroke-width="3" d="M147 7h65v60h-65zM179 8v58"/><path fill="#8b9b82" opacity=".6" d="m148 45 16-8 14 10 14-13 18 9v20h-62z"/><path fill="#fff0c4" opacity=".16" d="m148 65-75 55h75l63-54z"/>${e>=2?'<path fill="#ccbc98" d="M136 5h10v67h-10zm78 0h12v70h-12z"/>':""}${e>=3?'<path fill="#f7ebc4" d="M65 19h43v28H65z"/><path fill="#8d9272" d="m69 42 12-18 12 9 11-10v20z"/>':""}${f}<path fill="#ae9564" d="M221 86V35"/><path fill="#f9df9c" d="m211 37 7-17h9l8 17z"/>${e>=4?'<path fill="#ad9356" d="m192 97 22-7 16 7-22 8z"/><path fill="#d8c6a0" d="m193 91 20-6 16 7-21 7z"/>':""}<path fill="#a38a68" d="M12 91h15l-2 19H15z"/><path fill="#52744e" d="M20 95C-4 66 10 46 20 82 13 27 36 49 23 83 45 51 48 83 20 95Z"/>${a?'<path stroke="#d7bc79" stroke-width="2" fill="none" d="M33 3h194M33 6h194"/>':""}<path fill="#fff8dd" opacity=".16" d="M0 0h240v4H0z"/></svg>`}const Ea=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function vf(n){const e=n.game;return[...e.events.map(t=>({key:"event-"+t.id,title:t.title,detail:`剩余 ${Math.max(0,t.expires-e.day*1440-e.minute)} 分钟`,urgent:!0,button:`<button class="game-action" data-entity="${Ea(t.target)}">现场</button><button class="game-action" data-action="resolve" data-id="${t.id}" data-value="gm">亲自处理 · ¥350</button>`,note:"直接协调支出较高；授权方案在待办详情中。"})),...st(n).filter(t=>t.status==="dirty").map(t=>({key:t.id,title:t.number+" · 待翻房",detail:"客房部 · 清洁后才可出售",urgent:!1,button:`<button class="game-action" data-action="clean" data-id="${t.id}">清洁 · ¥90</button>`,note:"约 30 游戏分钟；等待主管可节省手动清洁费。"})),...n.guests.filter(t=>!t.staff&&!t.departing&&!t.roomId).map(t=>({key:t.id,title:t.name+" · 等待入住",detail:`${t.tier} · 耐心 ${t.patience??0} 分钟`,urgent:(t.patience??100)<45,button:`<button class="game-action" data-open="front" data-guest="${Ea(t.id)}">为他选房 →</button>`,note:t.reservationId?"确认预订未兑现需支付 ¥600 安置费。":"临时到店客人，先比较空房与留套需要。"})),...n.guests.filter(t=>!t.departing&&t.roomId&&(t.late==="pending"||t.challenge&&!t.challenge.resolved||t.occasion&&!t.occasion.resolved)).map(t=>({key:t.id,title:t.name+" · 服务待确认",detail:t.occasion&&!t.occasion.resolved?"生日礼遇待决定":t.late==="pending"?"晚退请求":"特殊安排",urgent:!1,button:`<button class="game-action" data-open="events" data-guest="${Ea(t.id)}">处理诉求 →</button>`,note:"查看真实诉求与条件，欢迎礼不代替承诺。"})),...e.stock<20?[{key:"breakfast-stock",title:"早餐库存偏低",detail:`剩余 ${e.stock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="breakfast">补 50 份 · ¥300</button>',note:"提前备货减少断供风险；先保留必要现金。"}]:[],...e.clubStock<20?[{key:"club-stock",title:"酒廊库存偏低",detail:`剩余 ${e.clubStock} 份`,urgent:!0,button:'<button class="game-action" data-action="stock" data-id="club">补 50 份 · ¥300</button>',note:"晚间服务仍在继续，补货会增加今天成本。"}]:[]].sort((t,i)=>Number(i.urgent)-Number(t.urgent))}const it=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),rt=n=>"¥"+Math.round(n).toLocaleString("en-US"),Le=(n,e,t="",i="",r="")=>`<button class="game-action" data-action="${e}" data-id="${it(t)}" data-value="${it(i)}" ${r}>${n}</button>`,ye=(n,e)=>`<button class="game-action" data-open="${e}">${n}</button>`,en=(n,e,t,i=!1)=>`<button data-focus-key="${e}" data-focus-value="${it(t)}" aria-pressed="${i}">${n}</button>`,un=n=>`<div class="focus-tabs">${n}</div>`,qe=n=>`<div class="focus-metrics">${n.map(([e,t])=>`<div><small>${e}</small><strong>${t}</strong></div>`).join("")}</div>`,He=(n,e,t)=>`<div class="focus-person">${_r(n)}<div><strong>${it(e)}</strong><p>${it(t)}</p></div></div>`,We=(n,e,t)=>`<section class="focus-screen"><h2>${n}</h2><div class="focus-main">${e}</div></section><div class="focus-footer">${t}</div>`,Cn=(n,e,t)=>`<div class="focus-pager">${en("‹ 上一项",n,String(Math.max(0,e-1)))}<span>${t?e+1:0} / ${t}</span>${en("下一项 ›",n,String(Math.min(Math.max(0,t-1),e+1)))}</div>`,oc=()=>({roomPage:0,eventPage:0,guestPage:0,taskPage:0,meeting:"overview",activity:"coffee",bookingPage:0,profilePage:0,logPage:0,careerPage:0,archiveTab:"overview",category:"standard",bed:"king"});function _f(n,e,t){const i=n.game,r=Kr(n),s=st(n),a=n.guests.filter(o=>!o.staff&&!o.departing&&!o.roomId),l=vf(n);if(e==="hub"){const o=Zd(n),c=i.plan,u=rs(n),d=s.filter(g=>g.status==="occupied").length,f=i.operations?.briefOpen?"morning":i.reportOpen?"growth":i.minute>=1200?"review":"operate",h=`<div class="day-rhythm">${["morning","operate","review","growth"].map((g,m)=>`<span class="${g===f?"active":""}"><i>${m+1}</i>${["晨会","经营","复盘","成长"][m]}</span>`).join("")}</div>`,p=`<div class="hotel-hero">${Zi("hub",Math.min(5,i.level))}<div><small>DAY ${i.day} · YOUR HOTEL</small><strong>把每次入住，<br>变成下次再来。</strong><span>${c?gr[c.focus].name:"按现有设置经营"}</span></div></div>`,v=o.entity?`<button class="game-action" data-entity="${o.entity}">先处理这间房</button>`:ye("现在去处理",o.target);return We("今天，先做好一件事",h+p+qe([["在住",d+"/"+s.length],["现场待办",String(l.length)],["今日承诺",c?ys(c.focus,c.target):"晨会确认"]])+He(o.department,o.title,o.why)+`<small class="campaign-route">${r?"开业带教 · "+(r.index+1)+" / "+r.total:u?"成长主线 · "+it(u.title)+" "+u.progress+"/"+u.goal:"五段认证已完成 · 继续自由经营"}</small>`,v+ye("经营目标","tasks")+ye("今晚复盘","evening"))}if(e==="front"){const o=t.guest?Math.max(0,a.findIndex(f=>f.id===t.guest)):Math.min(t.guestPage,Math.max(0,a.length-1)),c=a[o];if(!c)return We("客人接待",He("front","目前无人排队","关上面板继续经营，客人到店后会提醒你。"),ye("今日预订","bookings")+ye("回到酒店","hub"));const u=s.filter(f=>f.status==="available"||f.status==="reserved"&&c.tier==="Globalist"&&(!f.suaBookingId||f.suaBookingId===c.reservationId)).sort((f,h)=>+(h.id===t.room)-+(f.id===t.room)||+(!!h.suaBookingId&&h.suaBookingId===c.reservationId)-+(!!f.suaBookingId&&f.suaBookingId===c.reservationId)||(c.tier==="Globalist"?Number(Yt(h))-Number(Yt(f)):+(f.type==="suite")-+(h.type==="suite"))),d=Math.min(t.roomPage,Math.max(0,Math.ceil(u.length/2)-1));return We("给这位客人一间房",Cn("guestPage",o,a.length)+`<div class="focus-person">${_r(c)}<div><strong>${it(c.name)} · ${it(c.tier)}</strong><p>${it(c.thought)}</p></div></div>`+qe([["住宿",`${c.stayLength} 晚`],["耐心",`${c.patience} 分钟`],["来源",it(c.source??"Walk-in")]])+`<div class="focus-room-choices">${u.slice(d*2,d*2+2).map(f=>`<button data-action="checkin" data-id="${it(c.id)}" data-room="${f.id}">${Zi("hotel",f.level??1,f.bed??(f.type==="twin"?"twin":"king"),f.category??f.type)}<strong>${f.number} · ${oo(f)}</strong><small>${c.tier==="Globalist"&&Yt(f)?"免费升套 · 占用标准套库存":"点击安排入住"}</small></button>`).join("")||"<p>暂无空房，先清洁或查看预留。</p>"}</div>`+(u.length>2?Cn("roomPage",d,Math.ceil(u.length/2)):"")+'<p class="focus-trade">拒绝确认预订需 ¥600 安置费；选房后立即入住。</p>',ye("查看房态","hotel")+Le("婉拒本次","reject",c.id))}if(e==="events"||e==="worklist"){const o=[];for(const d of n.guests.filter(f=>!f.departing&&f.roomId)){if(d.occasion&&!d.occasion.resolved){const f=Uu(n,d);o.push({id:d.id+"-birthday",body:`<div class="focus-person">${_r(d)}<div><strong>${it(d.name)} · 今天过生日</strong><p>这趟专门来庆祝，早餐和房型还能有一点惊喜吗？</p></div></div>`+qe([["早餐库存",i.stock+" 份"],["可售标准套",String(f.free)],["需保护预订",String(f.reserve)]])+`<div class="focus-decision"><h3>照顾这一晚，也要照顾其他承诺</h3><p>早餐 ¥160 / 2 份 · 体验 +8 · 业主 −1。</p><p>升套 ¥280 · 体验 +12 · 业主 −2；原房待翻房，套房按原房费住。</p><p class="focus-trade">${f.alreadySuite?"客人已住标准套房，可以改送早餐或祝福。":f.suite?"送掉套房会减少后续付费销售和会员升套空间。":"现有套房需保护预订；不能重复承诺。"}手写卡免费，体验 +2；维持预订体验 −3。</p></div>`,actions:Le("送双人早餐","birthday-choice",d.id,"breakfast",f.breakfast?"":"disabled")+Le("生日升套","birthday-choice",d.id,"suite",f.suite?"":"disabled")+Le("手写生日卡","birthday-choice",d.id,"card")+Le("维持原预订","birthday-choice",d.id,"decline")})}if(d.challenge&&!d.challenge.resolved){const f=d.challenge.kind,h={quiet:["需要安静的房间","quiet","有施工噪声时需要另有安静空房。"],sua:["核对 SUA 标准套房","inventory","已入住标准套才能兑现；欢迎礼不能替代。"],family:["早餐和加床一起安排","family",`需要 6 份早餐库存，当前 ${i.stock} 份。`],audit:["检查房间与服务流程","inspect","需客房、工程主管在岗，且无待修房。"]}[f];o.push({id:d.id,body:`<div class="focus-person">${_r(d)}<div><strong>${it(d.name)} · ${it(d.tier)}</strong><p>${h[0]}</p></div></div><div class="focus-decision"><h3>落实核心诉求</h3><p>${h[2]}</p><p class="focus-trade">匹配安排 ¥180；欢迎礼 ¥100 可能仍让客人失望。</p></div>`,actions:Le("落实 · ¥180","guest-choice",d.id,h[1])+Le("欢迎礼 · ¥100","guest-choice",d.id,"gift")+Le("不作安排","guest-choice",d.id,"decline")})}d.late==="pending"&&o.push({id:d.id+"-late",body:`<div class="focus-person">${_r(d)}<div><strong>${it(d.name)} · ${it(d.tier)}</strong><p>希望 ${Fi(d)} 退房</p></div></div><div class="focus-decision"><h3>留体验，还是留翻房时间？</h3><p>同意：体验 +4、口碑 +1、业主 -1。</p><p>协商：体验 -3、口碑 -1、业主 +1。</p><p class="focus-trade">退房后才能翻房；晚退会推迟下一位入住。</p></div>`,actions:Le("同意 "+Fi(d),"late",d.id,"honor")+Le("协商 "+fs(d)+":00","late",d.id,"deny")})}for(const d of i.events){const f=d.kind==="repair"?"engineering":d.kind==="supplies"?"fnb":"front";o.push({id:"event-"+d.id,body:He(f,d.title,`剩余 ${Math.max(0,d.expires-i.day*1440-i.minute)} 游戏分钟。`)+`<div class="focus-decision"><h3>现在交给谁处理？</h3><p>亲自协调 ¥350；主管处理 ¥150。</p><p class="focus-trade">${i.managers[f]?"主管已到岗，可以授权处理。":"对应主管尚未到岗；可先亲自处理，避免超时。"}</p></div>`,actions:Le("亲自处理 · ¥350","resolve",String(d.id),"gm")+(i.managers[f]?Le("交给主管 · ¥150","resolve",String(d.id),"sop"):ye("聘任主管","operations"))})}for(const d of l.filter(f=>!o.some(h=>h.id===f.key)&&!n.guests.some(h=>h.roomId&&h.id===f.key)))o.push({id:d.key,body:He("front",d.title,d.detail)+`<div class="focus-decision"><p>${it(d.note)}</p></div>`,actions:d.button});const c=t.event?Math.max(0,o.findIndex(d=>d.id===t.event||d.id===t.event+"-birthday"||d.id===t.event+"-late")):Math.min(t.eventPage,Math.max(0,o.length-1)),u=o[c];return We("逐件处理 · "+o.length+" 项",u?Cn("eventPage",c,o.length)+u.body:He("front","待办全部处理完了","关上面板，回到酒店看决定如何发生。"),u?.actions??ye("回到经营","hub"))}if(e==="hotel"||e==="entity"){const o=n.floors.filter(m=>m.role==="guest"),c=o.find(m=>m.id===(t.floor??n.entities[t.room??""]?.floorId))??o[0];if(!c)return null;const u=Mu(n).filter(m=>m.floorId===c.id),d=u.find(m=>m.id===t.room)??u[0];if(!d)return null;t.room=d.id,t.floor=c.id;const f=un(o.map(m=>en(m.label,"floor",m.id,m.id===c.id)).join(""))+`<div class="focus-room-map">${u.map(m=>en(m.number+"<small>"+{available:"可入住",occupied:"在住",dirty:"待清洁",cleaning:"清洁中",maintenance:"封闭",reserved:"已预留",unbuilt:"＋设置"}[m.status]+"</small>","room",m.id,m.id===d.id)).join("")}</div>`,h=d.construction??c.construction;if(h)return We(d.number+" · 封闭施工",f+`<div class="focus-space">${Zi("hotel")}</div>`+qe([["剩余",h.remaining+" 分钟"],["完成后","开放使用"]]),ye("扩建与全部参数","hotel-data"));if(d.status==="unbuilt")return We(d.number+" · 设置房型",f+un(Object.entries(vi).map(([m,b])=>en(b.name,"category",m,t.category===m)).join(""))+un(en("大床","bed","king",t.bed==="king")+en("双床","bed","twin",t.bed==="twin"))+qe([["配置费用",rt(vi[t.category].cost)],["新客房价",rt(i.price*vi[t.category].factor)+"起"]])+'<p class="focus-trade">标准套可供免费升套，尊享套按付费房价销售。</p>',Le("确认设置","configure-room",d.id,t.category+":"+t.bed));const p=n.guests.find(m=>m.id===d.guestId),v=d.level??1,g=d.status==="dirty"?Le("清洁 · ¥90","clean",d.id):d.status==="maintenance"&&!d.timer?Le("维修 · ¥180","repair",d.id):d.status==="available"?`<button class="game-action" data-open="front" data-assign-room="${d.id}">安排入住</button>`+(v<5?Le("装修 · "+rt(v*2500),"upgrade",d.id):"")+(Yt(d)?Le("留给会员","reserve",d.id):""):d.status==="reserved"&&!d.suaBookingId?Le("释放预留","release",d.id):p?`<button class="game-action" data-open="events" data-guest="${p.id}">${p.occasion&&!p.occasion.resolved?"生日礼遇":"查看服务诉求"}</button>`:"";return We(d.number+" · "+oo(d),f+`<div class="focus-space">${Zi("hotel",v,d.bed??(d.type==="twin"?"twin":"king"),d.category??d.type)}<span>Lv.${v} · ${p?it(p.name):"暂无住客"}</span></div>`+qe([["每晚房费",rt(p?.rate??Zs(i.price,d))],["剩余住宿",d.nightsLeft+" 晚"],["升级增收",v<5?"每新客晚 +"+rt(Zs(i.price,{...d,level:v+1})-Zs(i.price,d)):"已满级"]])+`<p class="focus-trade">${d.status==="available"?"装修需停卖 90 分钟；已确认订单价格不变。":p?it(p.thought):"等清洁或维修完成后，才能再次出售。"}</p>`,g+ye("房间明细","room-data"))}if(e==="hotel-data"){const o=n.floors.filter(d=>d.role==="guest").length,c=1e4+5e3*(o-3),u=n.floors.filter(d=>d.construction);return We("扩建 · 再高一层",`<div class="focus-space">${Zi("hotel")}<span>施工 → 竣工 → 手动设置房型</span></div>`+qe([["建设费",rt(c)],["交付时间","4 小时"],["新增","3 个空位"]])+He("engineering","扩建前先确认现金与需求","施工期间新楼层封闭；竣工后逐间选择房型，普通客房配置已含在造价中。")+`<p class="focus-trade">${u.length?u.length+" 层仍在施工。":""}相邻房间有噪声风险；已有空房较多时，可先改善现有客房。</p>`,Le("开工 · "+rt(c),"expand")+ye("查看房态","hotel")+ye("投资明细","hotel-archive"))}if(e==="development-data"){const o=Object.hasOwn(Jr,t.activity)?t.activity:"coffee",c=Jr[o],u=i.development?.activity;return We("活动 · 投入一场体验",un(Object.entries(Jr).map(([d,f])=>en(f.name,"activity",d,d===o)).join(""))+He("fnb",c.name,c.description)+qe([["筹备费",rt(c.cost)],["准备时间","2 小时"],["每位收入",rt(c.fee)]])+`<p class="focus-trade">${u?"已有活动筹备中，等待现场结算。":"人数受在住客人、天气、定位与容量影响；收入不足筹备费时会亏损。"}每个营业日只能安排一场。</p>`,Le(u?"正在筹备":"安排活动 · "+rt(c.cost),"activity",o,"",u||i.development?.activityDay===i.day?"disabled":"")+Le("三日推广 · ¥2,200","campaign")+ye("查看设施","development"))}if(e==="operations"){const o={front:"前厅",house:"客房",engineering:"工程",fnb:"餐饮",revenue:"收益"},c=t.department??"house",u=i.managers[c],d=u?4500*u:3800,f={front:"自动分房与常规诉求；无空房仍需等待。",house:`每间清洁 ${co(u)} → ${co(Math.min(3,u+1))} 分钟，另需到场时间。`,engineering:`维修 ${uo(u)} → ${uo(Math.min(3,u+1))} 分钟，另需到场时间。`,fnb:"低库存时派员工配送，到餐台后才计入库存。",revenue:"次日自动定价；报价更高也可能减少客流。"}[c];return We("团队 · 原位授权",un(Object.entries(o).map(([h,p])=>en(p,"department",h,h===c)).join(""))+He(c,o[c]+"主管",u?"已到岗 · Lv."+u:"尚未聘任")+qe([["投入",u>=3?"已满级":rt(d)],["每日工资",rt(u*180)+" → "+rt(Math.min(3,u+1)*180)]])+`<div class="focus-decision"><h3>你会得到什么？</h3><p>${f}</p><p class="focus-trade">工作量少时先手动处理也合理；授权会持续增加工资。</p></div>`,(u<3?Le(u?"培训升级":"聘任到岗",u?"train":"hire",c):"")+ye("效果与财务明细","operations-data"))}if(e==="development"){const o=Object.values(n.entities).filter(d=>d.kind==="facility"),c=o.find(d=>d.id===t.facility)??o[0];if(!c)return null;const u=c.level??1;return We("设施 · 看清再投资",un(o.map(d=>en(d.name,"facility",d.id,d.id===c.id)).join(""))+`<div class="focus-space">${Zi(c.role,u)}<span>${c.name} · Lv.${u}</span></div>`+qe([["使用 / 容量",c.usage+" / "+c.capacity],["升级后容量",String(c.capacity+4)],["费用",rt(u*3500)]])+`<p class="focus-trade">${c.construction?"施工剩余 "+c.construction.remaining+" 分钟。":"升级需封闭施工；先补货或维护可解决眼前问题。"}</p>`,(c.construction?"":(u<5?Le("升级设施","invest",c.id):"")+(["breakfast","club"].includes(c.role)?Le("补货 · ¥300","stock",c.role):Le("维护 · ¥200","repair",c.id)))+ye("营销、活动、更多","development-data"))}if(e==="brief"&&fl(n,"strategy")){const o=Oi(n);return We("08:00 · 第一次晨会",qe([["预计入住",o.occupancy+"%"],["待到店",String(i.operations?.bookings.filter(c=>c.status==="confirmed").length??0)],["早餐需求",o.breakfast+" 人"]])+He("front","今天先把一位客人接好","先沿用当前报价营业。学会接待、翻房和委派后，再解锁房价与留套决策。"),i.operations?.briefOpen?Le("开始今天 · 前往接待","brief-start"):ye("继续当前带教","tasks"))}if(e==="brief"){const o=Oi(n),c=t.meeting,u=i.plan,d=`<div class="plan-choices">${Object.entries(gr).map(([h,p])=>`<button data-action="day-plan" data-value="${h}" aria-pressed="${u?.selected&&u.focus===h}" ${i.operations?.briefOpen?"":"disabled"}><span class="plan-mark">${u?.selected&&u.focus===h?"✓":h==="occupancy"?"↗":h==="experience"?"♡":"¥"}</span><span><strong>${p.name}<small>¥${p.price}${h==="experience"?" · 预采购 ¥240":""}</small></strong><small>${it(p.risk)}</small></span></button>`).join("")}</div>`,f=c==="price"?He("revenue","今天挂牌多少？","高价增加单晚收入，也可能减少 Walk-in。")+qe([["当前挂牌",rt(i.price)],["预计入住",o.occupancy+"%"]])+un(Le("¥720 · 争取入住","price","","720")+Le("¥850 · 提高单价","price","","850")):c==="service"?He("fnb","先备好今天的服务",`早餐预计 ${o.breakfast} 人，当前 ${i.stock} 份。`)+qe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"]])+un(Le("早餐 +50 · ¥300","stock","breakfast")+Le("酒廊 +50 · ¥300","stock","club")):c==="suite"?He("front","套房要留一间吗？","留套照顾会员；开放销售保留付费机会。SUA 锁房不变。")+qe([["当前策略",i.operations?.suitePolicy==="hold"?"保留一间":"开放销售"]])+un(Le("保留一间","suite-policy","","hold")+Le("开放销售","suite-policy","","sell")):qe([["预计入住",o.occupancy+"%"],["待到店",String(i.operations?.bookings.filter(h=>h.status==="confirmed").length??0)],["早餐需求",o.breakfast+" 人"]])+d+He("revenue",u?"今晚检验："+ys(u.focus,u.target):"先选一个经营方向",u?.selected?gr[u.focus].description:"也可按当前设置直接营业；下方选项会实际调整报价、留套和库存。");return We("08:00 · 晨会",un(["overview","price","service","suite"].map((h,p)=>en(["重点","房价","备货","套房"][p],"meeting",h,h===c)).join(""))+f,i.operations?.briefOpen?Le("按当前决定开始今天","brief-start")+ye("预订 / 客源明细","bookings"):ye("回到经营","hub")+ye("完整预测","brief-data"))}if(e==="evening"||e==="report"){const o=i.evening,c=i.reports.at(-1);if(e==="evening"&&!o)return We("20:00 · 晚间复盘",He("revenue","今晚 20:00 自动开会","继续经营，届时核对收入、客诉与总部建议。"),ye("回到经营","hub"));if(e==="report"&&!c)return We("今日尚未日结",He("revenue","房费于午夜结算","现在可以查看 20:00 快照，或继续经营。"),ye("晚间复盘","evening"));const u=e==="evening"?o.notes[0]?.text:c.recommendation,d=e==="evening"?o?.plan:c?.plan,f=d?`<div class="plan-result ${d.success?"success":"miss"}"><small>${e==="evening"?"20:00 阶段检验":"午夜最终对账"} · ${gr[d.focus].name}</small><strong>${ys(d.focus,d.actual)} <span>/ 目标 ${ys(d.focus,d.target)}</span></strong><p>${d.success?"判断奏效":"还有差距"} · ${it(d.lesson)}</p></div>`:"";return We(e==="evening"?"20:00 · 今天经营得如何？":"Day "+c.day+" · 日结",f+qe(e==="evening"?[["预计净额",rt(o.projectedNet)],["入住率",o.occupancy+"%"],["待办",String(o.pending)]]:[["净额",rt(c.revenue-c.expense)],["入住率",c.occupancy+"%"],["客诉",String(c.complaints)]])+He("revenue","今晚优先改进",u??"保持服务节奏。")+'<p class="focus-trade">'+(e==="evening"?"这是 20:00 快照；预计房费还未入账。":"这是午夜结算结果。")+"</p>",ye("客诉 / 明细",e==="evening"?"evening-data":"report-data")+(e==="evening"&&o?.open?Le("交给夜班 · 继续经营","evening-close"):i.reportOpen?Le("开始下一天","continue"):ye("回到经营","hub")))}if((e==="tasks"||e==="teaching")&&r){const o=Ni.map((c,u)=>`<div class="checklist-row ${u<r.index?"done":u===r.index?"current":"locked"}"><span>${u<r.index?"✓":u===r.index?"▶":"◇"}</span><strong>${it(c.title)}</strong><small>${u<r.index?"已完成":u===r.index?"现在做":"待解锁"}</small></div>`).join("");return We("开业带教 · "+(r.index+1)+" / "+r.total,`<div class="guided-checklist">${o}</div>`+He(r.department,r.title,r.why)+`<p class="unlock-preview">完成后解锁 · ${it(r.unlock)}</p>`,ye("去完成这一步",r.target)+ye("回到酒店","hub"))}if(e==="tasks"){const o=i.campaign,c=rs(n),u=o?.inspection,d=o?.result;if(!c)return We("酒店成长路线 · 完成",He("revenue","五段经营检验全部通过","经营仍会继续。培养熟客、建设酒店，长期里程碑保留。")+qe([["认证",String(o?.certificates.length??0)+" / 5"]]),ye("继续经营","hub")+ye("支线与里程碑","tasks-data"));const f=`<div class="chapter-checklist"><span>✓ 开业带教${o?.certificates.length?" · "+o.certificates.length+" 项认证已完成":""}</span><strong>▶ ${it(c.title)}</strong><small>下一步 · ${Nd[o?.chapter??0]}</small></div><small class="campaign-route">酒店成长路线 · ${Math.min(5,(o?.chapter??0)+1)} / 5${o?.certificates.length?" · 已获 "+o.certificates.length+" 项认证":""}</small>`;if(d)return We(d.passed?"体验通过 · "+c.exam:"需要改善 · "+c.exam,f+He(c.department,c.title,d.advice)+qe([["现场表现",String(d.score)],["通过标准",String(c.threshold)]])+`<div class="inspection-scenes">${d.scenes.map(h=>`<p>${it(h)}</p>`).join("")}</div><p class="focus-trade">${d.passed?"确认后进入下一段目标；日常经营不会重置。":"目标进度保留；免费重约，次日到店再检验。"}</p>`,d.passed?Le("进入下一阶段","continue-chapter"):ye("先去改善",d.target)+Le("免费预约重试","book-inspection"));if(u){const h=Math.max(0,u.due-i.day*1440-i.minute),p=i.day*1440+i.minute-u.due,v=Math.min(2,Math.max(0,Math.floor(p/10)));return We(c.exam+" · "+(u.phase==="booked"?"已预约":"现场体验中"),f+He(c.department,u.phase==="booked"?"留出时间把酒店准备好":["Room Check · 客房巡检","F&B · 体验餐台","Front Office · 核对承诺"][v],u.phase==="booked"?"检验看实际房态、住客体验、餐饮库存和诉求积压，现场还会有小幅波动。":"检验员按顺序体验酒店；尚未公布结果。")+qe([["到店时间","Day "+Math.floor(u.due/1440)+" · 18:00"],["等待",u.phase==="booked"?h+" 分钟":Math.max(0,30-p)+" 分钟后反馈"],["额外准备",u.prepared?"已彩排 · +6":"可选 · ¥300"]])+`<div class="inspection-timeline"><span class="${p>=0?"active":""}">看房</span><span class="${p>=10?"active":""}">用餐</span><span class="${p>=20?"active":""}">服务</span></div><p class="focus-trade">彩排提高表现，但不能替代清洁、备货和兑现承诺。</p>`,(u.phase==="booked"&&!u.prepared?Le("现场彩排 · ¥300","prepare-inspection"):"")+ye("检查房态","hotel")+ye("备货与服务","operations"))}return We(c.title,f+He(c.department,c.action,c.ready?"行动目标已完成。预约一次真实体验，检验今天的经营。":"先做好这一件事。目标跨天保留，完成后预约次日检验。")+qe([["当前进度",c.progress+" / "+c.goal],["下一次检验",c.exam]])+`<progress max="${c.goal}" value="${c.progress}" aria-label="${it(c.action)}"></progress><p class="focus-trade">日常支线奖金分段到账，完成后可领尾款；单任务奖金上限不变。</p>`,(c.ready?Le("预约检验 · 次日 18:00","book-inspection"):ye("去完成当前目标",c.target))+ye("支线奖励与带教","tasks-data"))}return null}const vo=[["hub","经营"],["hotel","客房"],["front","客人"],["operations","团队"],["development","设施"]];function ra(n){return["hotel","hotel-data","hotel-archive","entity","room-data"].includes(n)?"hotel":["front","events","worklist","bookings","history","profile-records"].includes(n)?"front":["operations","operations-data","report","report-data","score"].includes(n)?"operations":["development","development-data"].includes(n)?"development":"hub"}function xf(n){return{hub:[["hub","今天"],["brief","晨会"],["tasks","目标"],["evening","复盘"],["log","日志"],["settings","设置"]],hotel:[["hotel","房态"],["hotel-data","扩建"]],front:[["front","接待"],["events","服务"],["bookings","预订"],["history","客史"]],operations:[["operations","主管"],["operations-data","运营安排"],["report","财务"],["score","评分"]],development:[["development","设施"],["development-data","活动"],["hotel-data","扩建"]]}[ra(n)]}const Bu={hub:"经营看板",hotel:"房态与装修","hotel-data":"扩建计划","hotel-archive":"空间总览","room-data":"房间与服务",front:"到店接待",events:"事件中心",worklist:"事件中心",bookings:"今日预订",history:"住客档案","profile-records":"客史记录",operations:"部门负责人","operations-data":"运营安排",development:"公共设施","development-data":"主题活动",brief:"08:00 晨会","brief-data":"需求预测",evening:"20:00 复盘","evening-data":"客诉与建议",report:"日结报告","report-data":"财务明细",score:"经营评分",tasks:"当前目标","tasks-data":"日常奖励",career:"长期里程碑",teaching:"部门带教",log:"经营日志",settings:"存档与设置"},bf={"room-data":"hotel","hotel-archive":"hotel-data","brief-data":"brief","evening-data":"evening","report-data":"report","profile-records":"history","tasks-data":"tasks",career:"tasks-data",teaching:"tasks"};class Mf{current={view:"hub",selected:"",selection:oc(),scroll:0};pages=new Map;history=[];get canBack(){return!!this.history.length||!vo.some(([e])=>e===this.current.view)}visit(e,t=!1){if(e==="worklist"&&(e="events"),Bu[e]||(e="hub"),e===this.current.view){t&&(this.history=[]);return}this.pages.set(this.current.view,structuredClone(this.current)),t?this.history=[]:(this.history.push(structuredClone(this.current)),this.history.length>20&&this.history.shift()),this.current=structuredClone(this.pages.get(e)??{view:e,selected:"",selection:oc(),scroll:0})}back(){this.pages.set(this.current.view,structuredClone(this.current));const e=this.history.pop();if(e){this.current=e;return}this.visit(bf[this.current.view]??ra(this.current.view),!0)}clear(){this.pages.set(this.current.view,structuredClone(this.current)),this.history=[]}}function yf(n){const e=n.game,t=e.logs.filter(s=>s.day===e.day),i=s=>t.some(a=>s.test(a.text)),r=e.evening?.day===e.day&&!e.evening.open;return e.day===1?[{title:"接住第一位客人",done:i(/ 入住 /),target:"front",text:"前厅带你选房。比较常规房与升套，点房间卡直接入住。",trade:"房费午夜入账；留住套房库存，可能让会员失望。"},{title:"让一项服务真正落地",done:i(/开始清洁|清洁完成|需求已兑现|未解决核心诉求|个性化服务已安排|已补货/),target:n.guests.some(s=>s.challenge&&!s.challenge.resolved)?"events":"operations",text:"处理一位客人的诉求；暂时没有诉求时，为餐台备货。",trade:"看清费用和条件，送欢迎礼不等于解决核心问题。"},{title:"20:00 看决定的后果",done:r,target:"evening",text:"关上面板继续经营。20:00 自动复盘，核对入住、支出与客诉。",trade:"预计净额尚未入账，午夜结算才是最终结果。"}]:e.day===2?[{title:"备好今天的早餐",done:i(/已补货|晨会决策已确认/),target:"brief",text:"餐饮主管带你比较预计早餐人数和现有库存，补货或保留库存后开始营业。",trade:"备货不足会影响体验；已有足够库存时无需再买。"},{title:"处理服务压力",done:i(/需求已兑现|未解决核心诉求|退房.*(确认|协商)|已确认 .*退房|同意.*退房|晚退|个性化服务已安排|开始清洁|主管到岗|按.*处理|已补货/),target:"events",text:"先看晚退与待办；没有待办时，可安排翻房、补货，或在运营页聘任主管。",trade:"亲自处理是单次支出；授权会持续付工资，但腾出你的注意力。"},{title:"20:00 检查服务代价",done:r,target:"evening",text:"看看客诉是否解决、成本是否增加；必要时从总部建议直接返回现场。",trade:"今天的体验与现金，需要一起判断。"}]:e.day===3?[{title:"为今天的需求下注",done:i(/挂牌价调整|晨会决策已确认/),target:"brief",text:"收益主管带你看预订与预估入住率。选 ¥720、¥850，或保留现价开始营业。",trade:"高价提高单晚收入，也可能减少 Walk-in；确认预订不改价。"},{title:"把客流变成入住",done:i(/ 入住 /),target:"front",text:"接待实际到店的客人，观察空房和套房是否足够。不要仅凭预估就扩建。",trade:"多留套房能照顾会员，开放销售则保留付费机会。"},{title:"20:00 对账，独立接班",done:r,target:"evening",text:"对比晨会预估与晚间入住，再决定明天保价、调价还是改善房态。",trade:"一次预测偏差不足以证明策略好坏，也要看客诉与净额。"}]:[]}const Ss=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0"),wa=(n,e,t)=>`<div class="focus-person">${_r(n)}<div><strong>${it(e)}</strong><p>${it(t)}</p></div></div>`,Es=n=>`<p class="focus-trade">${it(n)}</p>`,si=(n,e)=>`<article class="record-card"><small>${it(n)}</small><p>${it(e)}</p></article>`,Si=(n,e)=>Math.min(n,Math.max(0,e-1));function Sf(n,e,t){const i=n.game,r=i.operations;if(e==="room-data"){const s=n.entities[t.room??""];if(s?.kind!=="room")return We("房间详情",He("house","请选择一间房","从房态图打开具体房间。"),ye("查看房态","hotel"));const a=n.guests.find(l=>l.id===s.guestId);return We(s.number+" · 房间与服务",a?wa(a,a.name+" · "+a.tier,a.thought)+qe([["订单房费",rt(a.rate??i.price)],["退房时间",Ss(Tu(a))],["体验",String(Math.round(a.satisfaction??90))]])+si("服务记录",a.occasion?.outcome??a.challenge?.outcome??(a.serviceDone?"专属服务已安排":"尚未安排额外服务")):He("house",oo(s),"房态页可清洁、维修、装修或预留；所有操作在同一位置。"),(a&&!a.serviceDone?Le("专属服务 · ¥120","guest-service",a.id):"")+(a?`<button class="game-action" data-open="events" data-guest="${a.id}">查看诉求</button>`:"")+ye("返回房态","hotel"))}if(e==="bookings"){const s=[...r.bookings].sort((d,f)=>d.eta-f.eta),a=Si(t.bookingPage,s.length),l=s[a],o=l&&r.profiles[l.profileId],c=l&&n.guests.find(d=>d.reservationId===l.id&&!d.departing),u=qe(["APP","团单","平台"].map(d=>[d,String(r.bookings.filter(f=>f.source===d).length)+" 单"]))+Cn("bookingPage",a,s.length);return We("今日预订",u+(l&&o?wa(o,o.name+" · "+o.tier,l.occasion?"今天生日，提前留出礼遇预算。":l.challenge?{quiet:"需要安静房间",sua:"SUA 标准套已确认",family:"需要早餐与加床",audit:"关注服务标准"}[l.challenge]:"常规接待")+qe([["到店",Ss(l.eta)],["住宿",l.nights+" 晚"],["锁定价",rt(l.rate)]])+si(l.source+" · "+{confirmed:"待到店",arrived:"在排队",checkedin:"已入住",lost:"已安置"}[l.status],o.history.at(-1)?.text??"首次来店。"):He("front","今天暂无预订","Walk-in 到店后会进入接待队列。"))+Es("Walk-in 不在预订表内；当前已到 "+r.walkinArrivals+" 位。确认报价已锁定，平台佣金为每晚 15%。"),(c?`<button class="game-action" data-open="${c.roomId?"events":"front"}" data-guest="${c.id}">${c.roomId?"查看服务":"为他选房"}</button>`:ye("查看到店客人","front"))+(o?`<button class="game-action" data-open="history" data-profile="${o.id}">查看客史</button>`:"")+ye("晨会","brief"))}if(e==="history"||e==="profile-records"){const s=Object.values(r.profiles).filter(d=>d.visits>0||n.guests.some(f=>f.profileId===d.id)).sort((d,f)=>f.visits-d.visits),a=t.profile?Math.max(0,s.findIndex(d=>d.id===t.profile)):Si(t.profilePage,s.length),l=s[a],o=l&&n.guests.find(d=>d.profileId===l.id&&!d.departing);if(!l)return We("客史",He("front","客人正在写下第一段故事","接待住客后，这里会保存服务与回访记录。"),ye("接待客人","front"));const c=[...l.history].reverse(),u=Si(t.logPage,c.length);return We(e==="history"?"客史 · 认出这位客人":"客史 · 完整记录",(e==="history"?Cn("profilePage",a,s.length):Cn("logPage",u,c.length))+wa(l,l.name+" · "+l.tier,e==="history"?"先看上次承诺，再决定这次怎样接待。":"每次决定与体验会留在这份记录里。")+(e==="history"?qe([["住宿次数",String(l.visits)],["信任",String(l.trust)],["累计消费",rt(l.spend)]])+si("最近一段故事",c[0]?.text??"首次入住，等待这次故事。"):si(c[u]?"Day "+c[u].day:"尚无记录",c[u]?.text??"完成入住后积累客史。")),(o?`<button class="game-action" data-open="${o.roomId?"events":"front"}" data-guest="${o.id}">${o.roomId?"查看当前诉求":"接待这位客人"}</button>`:ye("今日预订","bookings"))+`<button class="game-action" data-open="${e==="history"?"profile-records":"history"}" data-profile="${l.id}">${e==="history"?"完整记录":"返回客史"}</button>`)}if(e==="operations-data"){const s=["stock","price","position"].includes(t.archiveTab)?t.archiveTab:"stock",a=un(["stock","price","position"].map((c,u)=>en(["备货","报价","定位"][u],"archiveTab",c,c===s)).join("")),l=s==="stock"?He("fnb","餐台供应优先于扩容","手动补货即时入库；主管配送需走到餐台后完成。")+qe([["早餐",i.stock+" 份"],["酒廊",i.clubStock+" 份"],["每次采购","50 份 / ¥300"]]):s==="price"?He("revenue","每晚收益与客流之间取舍","报价影响未预订客流，已确认订单与在住价格不变。")+qe([["当前报价",rt(i.price)],["预计入住",Oi(n).occupancy+"%"]])+`<label class="precision-price">精确报价 <input id="price-input" type="number" min="350" max="1800" value="${i.price}"></label>`:He("revenue","这家酒店要服务谁？","商务重工作日与早餐，度假重周末和体验，城市混合兼顾两类需求。")+qe([["当前定位",{business:"商务",resort:"度假",urban:"城市混合"}[i.positioning]]])+Es("定位会改变客流、住宿时长与公区偏好；调整后观察一天经营结果。"),o=s==="stock"?Le("早餐 +50 · ¥300","stock","breakfast")+Le("酒廊 +50 · ¥300","stock","club"):s==="price"?Le("¥720 · 争取客流","price","","720")+Le("¥850 · 提高单价","price","","850")+Le("应用精确报价","price"):Le("商务","position","","business")+Le("度假","position","","resort")+Le("城市混合","position","","urban");return We("运营安排",a+l,o)}if(e==="score"){const s=is(n);return We("经营评分",qe([["综合评分",s.total+" / 100"],["评估方式","四项等权"]])+`<div class="rating-list">${s.parts.map(a=>`<div><span>${a.name}</span><b>${a.value}</b><progress max="100" value="${a.value}" aria-label="${a.name}"></progress></div>`).join("")}</div>`+He("revenue","从最弱的一项开始改善","口碑看承诺，体验看服务，房务看周转，业主看经营。"),ye("处理待办","events")+ye("财务表现","report-data"))}if(e==="report-data"){const s=i.reports.at(-1);return We(s?"Day "+s.day+" · 财务明细":"今天 · 财务进度",qe([["入账收入",rt(s?.revenue??i.revenue)],["成本",rt(s?.expense??i.expense)],["净额",rt((s?.revenue??i.revenue)-(s?.expense??i.expense))]])+(s?qe([["ADR",rt(s.adr)],["RevPAR",rt(s.revpar)],["入住率",s.occupancy+"%"]])+si("收益经理建议",s.recommendation):He("revenue","房费于午夜统一结算","当前收入包括已经到账的消费与奖金；在住房费尚未入账。")),ye("经营评分","score")+ye("收支日志","log")+(i.reportOpen?Le("开始下一天","continue"):ye("晚间复盘","evening")))}if(e==="brief-data"){const s=Oi(n);return We("晨会 · 完整预测",He("revenue",Pu[r.event],"预订报价已锁定，Walk-in 仍有波动；先判断库存和翻房能否接住需求。")+qe([["预计入住",s.occupancy+"%"],["Walk-in",s.walkins+" 位"],["翻房",s.housekeeping+" 间"]])+qe([["早餐",s.breakfast+" 人"],["标准套需求",s.suites+" 间"],["Happy Hour",s.club+" 人"]])+si("客源结构","商务 "+s.business+" / 度假 "+s.resort+" / 团队 "+s.group),ye("调整晨会决定","brief")+ye("核对预订","bookings"))}if(e==="evening-data"){const s=i.evening;if(!s)return We("复盘 · 尚未开会",He("revenue","20:00 回看今天","当前可以先处理待办与预订。"),ye("经营看板","hub"));const a=[...s.logs].reverse(),l=Si(t.logPage,a.length),o=a[l],c=s.notes[0];return We("复盘 · 客诉与建议",Cn("logPage",l,a.length)+qe([["客诉计数",String(s.complaints)],["待处理",String(s.pending)],["已入账",rt(s.revenue)]])+si(o?Ss(o.minute)+" · "+o.category:"今天的服务记录",o?.text??"尚无客诉记录。")+He("revenue",c?.title??"总部建议",c?.text??"继续保持服务节奏。"),(o?.target&&n.entities[o.target]?`<button class="game-action" data-entity="${o.target}">查看现场</button>`:ye("处理待办","events"))+ye("返回复盘","evening"))}if(e==="tasks-data"||e==="career"){const s=e==="career",a=s?Cu(n):i.tasks,l=Si(s?t.careerPage:t.taskPage,a.length),o=a[l];if(!o)return We("奖励",He("front","目前没有可领取目标","经营主线与酒店成长会继续记录。"),ye("当前目标","tasks"));const c="paid"in o&&typeof o.paid=="number"?o.paid:0,u=Math.max(0,o.reward-c);return We(s?"长期里程碑":"日常支线奖励",Cn(s?"careerPage":"taskPage",l,a.length)+He("front",o.title,s?"日常经营逐步积累；长期目标不会随交班重置。":"奖金按进度分段到账；完成后领取尾款。")+qe([["进度",Math.min(o.progress,o.goal)+" / "+o.goal],["奖金上限",rt(o.reward)],["已到账",rt(o.claimed?o.reward:c)]])+`<progress max="${o.goal}" value="${Math.min(o.progress,o.goal)}"></progress>`,(o.claimed?ye("当前目标","tasks"):o.progress>=o.goal?Le(s?"领取奖励":"领取尾款 · "+rt(u),s?"claim-career":"claim",o.id):ye("去完成","target"in o?String(o.target):"hub"))+ye(s?"日常奖励":"长期里程碑",s?"tasks-data":"career")+ye("三日带教","teaching"))}if(e==="teaching"){const s=yf(n),a=Si(t.taskPage,s.length),l=s[a];return We("Day "+i.day+" · 部门带教",l?Cn("taskPage",a,s.length)+He("front",l.title,l.text)+qe([["当前步骤",l.done?"已完成":"待完成"],["今日带教",s.filter(o=>o.done).length+" / "+s.length]])+Es("完成当前步骤后继续下一步；第 1–3 天结束后仍可跟随经营主线。"):He("front","三日带教已结束","主管会继续根据酒店现场给出建议。"),ye(l?"去实践":"当前目标",l?.target??"tasks")+ye("返回经营","hub"))}if(e==="log"){const s=["全部","客诉","收益","房态","部门","升级","入住"],a=s.includes(t.archiveTab)?t.archiveTab:"全部",l=[...i.logs].reverse().filter(u=>a==="全部"||u.category===a),o=Si(t.logPage,l.length),c=l[o];return We("经营日志",un(s.map(u=>en(u,"archiveTab",u,u===a)).join(""))+Cn("logPage",o,l.length)+(c?si("Day "+c.day+" · "+Ss(c.minute)+" · "+c.category,c.text):He("revenue","暂无记录","经营决定和现场结果会自动记录在这里。")),(c?.target&&n.entities[c.target]?`<button class="game-action" data-entity="${c.target}">查看现场</button>`:ye("查看当前待办","events"))+ye("经营看板","hub"))}return e==="settings"?We("存档与设置",He("front","继续经营，从这里妥善交班","进度自动保存在当前浏览器；导出备份可留存酒店状态。")+qe([["当前进度","Day "+i.day],["存档","浏览器自动保存"]])+Es("新开存档会弹出确认，并清除本浏览器当前 v8 进度。"),Le("导出备份","export")+Le("新开酒店","reset")+ye("返回经营","hub")):e==="hotel-archive"?We("酒店 · 空间总览",qe([["已配置",String(st(n).length)+" 间"],["待翻房",String(st(n).filter(s=>s.status==="dirty").length)+" 间"],["施工楼层",String(n.floors.filter(s=>s.construction).length)]])+He("engineering","先用好现有空间，再增加容量","房态页选择楼层和房间；扩建交付空位，玩家逐间配置。"),ye("房态与装修","hotel")+ye("扩建一层","hotel-data")+ye("公区设施","development")):We("经营入口已更新",He("front","从统一导航继续","所有日常操作都在五个部门入口中。"),ye("经营看板","hub"))}function Ef(n,e){const t=new Mf,i=q=>n.querySelector(q),r=n.querySelector("dialog"),s=i("#sheet-content"),a=i("#sheet-eye");let l=()=>{},o=null;const c=i(".sheet-top"),u=document.createElement("button");u.className="sheet-back",u.textContent="‹",u.dataset.menuBack="true",u.setAttribute("aria-label","返回上一页"),c.prepend(u);const d=document.createElement("nav");d.className="module-tabs",d.setAttribute("aria-label","当前部门功能"),s.before(d);const f=document.createElement("p");f.className="action-feedback",f.setAttribute("role","status"),f.hidden=!0,s.before(f);const h=document.createElement("div");h.className="fixed-actions",s.after(h);const p=document.createElement("nav");p.className="sheet-navigation",p.setAttribute("aria-label","切换管理部门"),h.after(p);const v=document.createElement("div");v.className="reward-toast",v.setAttribute("role","status"),n.append(v);let g=e.getState().game?.rewardBeat?.id;const m=()=>vo.map(([q,Y])=>`<button data-open="${q}" data-root-menu="true" aria-label="${Y}" aria-pressed="${r.open&&ra(t.current.view)===q}">${gf(q)}<span>${Jl(e.getState(),q)?"◇ ":""}${Y}</span></button>`).join(""),b=()=>{i(".main-nav").innerHTML=m(),p.innerHTML=`<div class="menu-tabs">${m()}</div>`},S=()=>{t.current.scroll=s.scrollTop},y=()=>{const{view:q,selection:Y}=t.current,Se=e.getState();a.textContent=vo.find(([ne])=>ne===ra(q))?.[1]+" / "+(Bu[q]??"酒店经营"),u.hidden=!t.canBack,d.innerHTML=xf(q).map(([ne,pe])=>`<button data-open="${ne}" aria-current="${q===ne?"page":"false"}">${pe}</button>`).join("");const De=Jl(Se,q),Pe=Kr(Se);q==="operations"&&Pe?.index===4&&(Y.department="house"),q==="operations-data"&&Pe?.index===3&&(Y.archiveTab="stock"),s.innerHTML=De?We("即将解锁",He("front",De,"先完成当前主线，功能会逐步开放。已发生的住客诉求仍可正常处理。"),ye("查看当前目标","tasks")):_f(Se,q,Y)??Sf(Se,q,Y),s.querySelectorAll("[data-action]").forEach(ne=>{const pe=xu(Se,{type:ne.dataset.action,id:ne.dataset.id,value:ne.dataset.value});pe&&(ne.disabled=!0,ne.title=pe,ne.textContent="◇ "+ne.textContent)}),Pe?.index===4&&s.querySelectorAll('[data-focus-key="department"]').forEach(ne=>{ne.dataset.focusValue!=="house"&&ne.remove()}),Pe?.index===3&&s.querySelectorAll('[data-focus-key="archiveTab"]').forEach(ne=>{ne.dataset.focusValue!=="stock"&&ne.remove()}),Pe&&q!=="tasks"&&q!=="teaching"&&!De&&s.insertAdjacentHTML("afterbegin",`<button class="guide-ribbon" data-open="tasks"><span>开业 ${Pe.index+1}/${Pe.total}</span><strong>${it(Pe.title)}</strong><small>查看带教 ›</small></button>`),h.replaceChildren();const X=s.querySelector(".focus-footer");X&&h.append(X),r.classList.add("focus-layout","management-shell"),r.dataset.view=q,(h.querySelector("[data-action]:not([disabled])")??h.querySelector("button"))?.classList.add("decision-primary"),r.open||(o=document.activeElement,r.showModal()),s.scrollTop=t.current.scroll,r.scrollTop=0,b()},R=(q,Y=!1)=>{S(),t.visit(q,Y),f.hidden=!0,y()},E=q=>{const Y=e.getState(),Se=Y.entities[q];if(!Se)return;S(),t.visit(Se.kind==="room"?"hotel":"development");const De=t.current.selection;t.current.selected=q,Se.kind==="room"?(De.room=q,De.floor=Se.floorId):De.facility=q,f.hidden=!0,y()},C=()=>{f.textContent=e.getState().game.notice,f.hidden=!f.textContent},x=()=>{S(),t.clear(),r.close(),f.hidden=!0;const q=e.getState().game;q.evening?.open&&e.dispatch({type:"evening-close"}),q.operations?.briefOpen&&e.dispatch({type:"brief-start"}),e.select(null),b(),o?.isConnected&&o.focus()},A=()=>{if(e.getState().game.reportOpen&&t.current.view==="report"){e.dispatch({type:"continue"}),R("brief",!0);return}x()};i(".preview-badge").outerHTML='<button class="preview-badge score-button" data-open="score" aria-label="查看经营评分"></button>',i(".world-caption").textContent="轻点空间 · 查看问题与决定",i(".property-name small").id="game-time",i(".today-hint").setAttribute("data-open","tasks"),i(".event-strip").removeAttribute("data-focus"),i(".event-strip").setAttribute("data-open","events"),i(".speed-control").insertAdjacentHTML("beforeend",Le("Ⅱ","pause"));let D=!1;const P=(q,Y)=>{const Se=r.getBoundingClientRect();return q<Se.left||q>Se.right||Y<Se.top||Y>Se.bottom};r.addEventListener("pointerdown",q=>{D=q.target===r&&P(q.clientX,q.clientY)}),r.addEventListener("click",q=>{D&&q.target===r&&P(q.clientX,q.clientY)&&A(),D=!1}),r.addEventListener("cancel",q=>{q.preventDefault(),A()}),n.addEventListener("click",q=>{const Y=q.target.closest("button");if(!Y||Y.disabled)return;if(Y.matches(".close-sheet")){A();return}if(Y.dataset.menuBack){S(),t.back(),f.hidden=!0,y();return}const Se=t.current.selection;if(Y.dataset.focusKey){const X=Y.dataset.focusKey,se=Y.dataset.focusValue??"";if(!(X in Se)&&!["room","floor","department","facility","guest","event","profile"].includes(X))return;Se[X]=X.endsWith("Page")?Math.max(0,Number(se)||0):se,X==="floor"&&(Se.room=void 0),X==="guestPage"&&(Se.guest=void 0,Se.roomPage=0),X==="eventPage"&&(Se.event=void 0),X==="profilePage"&&(Se.profile=void 0),X==="archiveTab"&&(Se.logPage=0),t.current.scroll=0,f.hidden=!0,y();return}if(Y.dataset.open){S();const X=t.current.selection.room;t.visit(Y.dataset.open,!!Y.dataset.rootMenu),Y.dataset.open==="room-data"&&X&&(t.current.selection.room=X);const se=t.current.selection;Y.dataset.assignRoom&&(se.room=Y.dataset.assignRoom,se.roomPage=0),Y.dataset.guest&&(se.guest=Y.dataset.guest,se.event=Y.dataset.guest,se.roomPage=0),Y.dataset.profile&&(se.profile=Y.dataset.profile,se.logPage=0),f.hidden=!0,y();return}if(Y.dataset.entity){E(Y.dataset.entity),l(e.getState().entities[Y.dataset.entity].floorId);return}if(Y.dataset.floor){x(),e.focusFloor(Y.dataset.floor),l(Y.dataset.floor);return}if(Y.dataset.speed){e.setSpeed(Number(Y.dataset.speed));return}if(Y.matches(".weather")){const X=["dusk","night","day"];e.setAtmosphere(X[(X.indexOf(e.getState().atmosphere)+1)%3]);return}const De=Y.dataset.action;if(!De)return;if(De==="reset"){document.dispatchEvent(new Event("new-game"));return}if(De==="export"){const X=document.createElement("a");X.href=URL.createObjectURL(new Blob([JSON.stringify(e.getState())],{type:"application/json"})),X.download="jinwan-v8-save.json",X.click(),setTimeout(()=>URL.revokeObjectURL(X.href),500);return}const Pe={type:De,id:Y.dataset.id,value:Y.dataset.value};if(De==="checkin"&&(Pe.roomId=Y.dataset.room),De==="price"&&(Pe.value=Y.dataset.value||Number(n.querySelector("#price-input")?.value)),S(),e.dispatch(Pe),De==="brief-start"||De==="evening-close"){x();return}if(De==="continue"){R("brief",!0);return}if(De==="checkin"&&!Kr(e.getState())){const X=e.getState().guests.find(se=>se.id===Pe.id);X?.roomId&&(X.challenge&&!X.challenge.resolved||X.occasion&&!X.occasion.resolved)&&(t.visit("events"),t.current.selection.event=X.id)}r.open&&(y(),C())});let O=null,Z="",j="",z=0,Q=0,W=0,ie="",ae=e.getState().game?.onboarding?.step;const ue=()=>{const q=e.getState(),Y=q.game;i(".score-button").innerHTML=`<i style="--score:${is(q).total}%"></i> ${is(q).total} 分 ›`,i("#cash").textContent=rt(q.metrics.cash),i("#reputation").textContent=String(q.metrics.reputation),i("#owner").textContent=String(q.metrics.owner),i("#suite-count").textContent=yu(q)+" 间",i("#game-time").textContent=`${Ou(Y.day)} · Day ${Y.day} ${of(Y.minute)}${Y.paused?" · 暂停":""}`,i("#occupancy").textContent=`${Su(q)}/${st(q).length} 在住 · 收入 ${rt(Y.revenue)}`;const Se=Kr(q),De=rs(q),Pe=Y.campaign;i(".today-hint").setAttribute("data-open","tasks"),i(".today-hint span:nth-child(2)").textContent=Se?Se.title:De?Pe?.result?Pe.result.passed?"检验通过 · 开启下一阶段":"检验待改善 · 免费重约":Pe?.inspection?Pe.inspection.phase==="visiting"?"现场体验中 · 等待回访":De.exam+" · 已预约":De.ready?"目标达成 · 预约"+De.exam:De.action:"主线完成 · 自由经营",i("#task-count").textContent=Se?Se.index+1+" / "+Se.total:De?De.progress+"/"+De.goal:"5 / 5";const X=JSON.stringify([Y.onboarding?.step,Pe?.chapter,De?.progress,Pe?.result,Pe?.inspection?.phase,Pe?.inspection?.prepared]);r.open&&t.current.view==="tasks"&&ie!==X&&y(),ie=X,Y.onboarding?.step!==ae&&(ae=Y.onboarding?.step,r.open&&y(),v.textContent=Y.notice,v.classList.remove("show"),v.offsetWidth,v.classList.add("show")),Y.rewardBeat&&Y.rewardBeat.id!==g&&(g=Y.rewardBeat.id,v.textContent="＋"+rt(Y.rewardBeat.amount)+" · "+Y.rewardBeat.text,v.classList.remove("show"),v.offsetWidth,v.classList.add("show"));const se=Y.events.length||q.guests.some(pe=>!pe.departing&&pe.roomId&&(pe.late==="pending"||pe.challenge&&!pe.challenge.resolved||pe.occasion&&!pe.occasion.resolved));i(".event-strip span").textContent=q.guests.some(pe=>pe.occasion&&!pe.occasion.resolved&&!pe.departing&&pe.roomId)?"住客今天过生日 · 礼遇待决定":se?"现场有服务诉求待处理":ki(q).length?`${ki(q).length} 位住客等待入住`:"酒店运营平稳",i(".event-strip b").textContent=se?"处理 ›":"前台 ›",i(".event-strip").setAttribute("data-open",se?"events":"front"),i(".review-strip span").textContent=Y.reportOpen?"今日已结算 · 查看日结并开始下一天":Y.notice,i(".review-strip").setAttribute("data-open",Y.reportOpen?"report":"log"),i(".weather span").textContent=Y.weather==="rain"?"有雨":"晴朗",n.querySelectorAll("[data-speed]").forEach(pe=>{pe.classList.toggle("active",Number(pe.dataset.speed)===q.speed),pe.setAttribute("aria-pressed",String(Number(pe.dataset.speed)===q.speed))});const ne=q.floors.map(pe=>pe.id).join(",");Z!==ne&&(Z=ne,i(".floor-rail").innerHTML=[...q.floors].reverse().map(pe=>`<button data-floor="${pe.id}" aria-label="前往${pe.label} ${pe.name}">${pe.label}</button>`).join("")),q.selectedId&&q.selectedId!==O&&E(q.selectedId),O=q.selectedId,Y.operations?.briefOpen&&Q!==Y.day&&(Q=Y.day,R("brief",!0),t.current.selection.meeting="overview",y()),Y.evening?.open&&W!==Y.evening.day&&(W=Y.evening.day,R("evening",!0)),Y.reportOpen&&z!==Y.day&&(z=Y.day,R("report",!0)),j!==Y.notice&&(j=Y.notice),b()};return e.subscribe(ue),ue(),{stage:i(".world-stage"),setFocusHandler:q=>{l=q},showError:q=>{s.innerHTML=`<section class="focus-screen"><h2>画面暂时不可用</h2><div class="focus-main"><p>${it(q)}</p></div></section>`,h.innerHTML="",r.showModal()}}}function wf(n,e){if(n.innerHTML='<main class="game"><header class="hud"><div class="title-row"><h1>今晚有套吗<span>？</span></h1><span class="preview-badge">v8 · 空间预览</span></div><div class="property-row"><div class="property-name"><i class="brand-dots">●●<br>●●<br>●●</i><div><strong>HYATT PLACE</strong><small>星期一 · Day 1 <span class="clock">18:40</span></small></div></div><button class="weather" aria-label="切换日夜氛围">◐ <span>日落</span></button></div><div class="metrics"><div><small>现金</small><strong id="cash"></strong></div><div><small>可用套房</small><strong id="suite-count"></strong></div><div><small>会员口碑</small><strong><b id="reputation"></b><span>/100</span></strong></div><div><small>业主满意</small><strong><b id="owner"></b><span>/100</span></strong></div></div><button class="today-hint" data-open="tasks"><span class="task-icon">✓</span><span>今日任务 · 认识你的酒店</span><b id="task-count">0/3</b><span>›</span></button></header><section class="world-stage" aria-label="可交互酒店剖面"><div class="world-scroll" tabindex="0" aria-label="酒店楼层，可上下滚动"><div class="world-spacer"></div></div><nav class="floor-rail" aria-label="楼层导航"></nav><span class="world-caption">轻点房间 · 看看今晚的住客</span></section><footer class="controls"><button class="event-strip" data-focus="facility-lobby"><i>♧</i><span>前台有一位熟悉的面孔</span><b>去看看 ›</b></button><button class="review-strip" data-open="log"><span>“窗边的位置，刚好看见日落。”</span><b>日志 ≡</b></button><nav class="main-nav" aria-label="经营导航"><button data-open="front"><span>♧</span>前台</button><button data-open="hotel"><span>▤</span>酒店</button><button data-open="operations"><span>☷</span>运营</button><button data-open="tasks"><span>✓</span>任务</button></nav><div class="bottom-bar"><span id="occupancy"></span><div class="speed-control" aria-label="演示速度"><button data-speed="1" aria-label="1倍演示速度">1×</button><button data-speed="2" aria-label="2倍演示速度">2×</button><button data-speed="4" aria-label="4倍演示速度">4×</button></div></div></footer><dialog class="sheet"><div class="sheet-handle"></div><div class="sheet-top"><span id="sheet-eye"></span><button class="close-sheet" aria-label="关闭详情">×</button></div><div id="sheet-content"></div></dialog><div class="notice" role="status"></div></main>',e.getState().game)return Ef(n,e);const t=n.querySelector("dialog"),i=n.querySelector("#sheet-content"),r=n.querySelector("#sheet-eye");let s="",a=null,l=()=>{};const o=()=>{t.close(),e.select(null),s="",a?.focus()},c=(p,v)=>{r.textContent=p,i.innerHTML=v,t.open||(a=document.activeElement,t.showModal())},u=p=>{const v=e.getState(),g=v.entities[p];if(!g)return;const m=Ql(v,p);if(g.kind==="room"){const b=v.guests.find(S=>S.id===g.guestId);c("HYATT PLACE · "+m.label,`<h2>${g.number}<span>${g.type==="suite"?"开放式套房":g.type==="twin"?"双床客房":"大床客房"}</span></h2><div class="status-chip status-${g.status}">${pf[g.status]}</div><dl><div><dt>住客</dt><dd>${b?b.name+" · "+b.tier:"暂无在住客人"}</dd></div><div><dt>剩余住宿</dt><dd>${g.nightsLeft?g.nightsLeft+" 晚":"—"}</dd></div><div><dt>楼层</dt><dd>${m.label} · ${m.name}</dd></div></dl>${b?"<blockquote>“"+b.thought+"”</blockquote>":""}<p class="phase-note">当前为独立空间预览。接待、清洁与收益将在视觉验收后接入。</p><button class="primary" data-return="${m.id}">回到 ${g.number} 的楼层</button>`)}else{const b={spa:"水疗床、毛巾和柔和灯光组成独立休憩空间。",lobby:"前台、等候区与行李车共同构成入住动线。",breakfast:"自助餐台、咖啡区与餐桌分别安排在真实空间中。",club:"吧台与休息区相连，住客能在酒廊中活动。",gym:"跑步机、单车、瑜伽区和毛巾架组成健身空间。",rooftop:"露台、遮阳伞、植物和座椅形成屋顶花园。"};c("HYATT PLACE · "+m.label,`<h2>${g.name}</h2><p>${b[g.role]}</p><dl><div><dt>使用人数（演示）</dt><dd>${g.usage} / ${g.capacity}</dd></div><div><dt>当班员工（演示）</dt><dd>${g.staffing} 人</dd></div><div><dt>服务品质 / 维护（演示）</dt><dd>${g.quality} / ${g.maintenance}</dd></div></dl><p class="phase-note">本阶段展示空间与交互，以上为场景样本数据。</p><button class="primary" data-return="${m.id}">回到${g.name}</button>`)}},d={front:()=>{c("FRONT OFFICE",'<h2>欢迎回来</h2><p>从柜台、行李车到等候区，看看住客的入住动线。</p><button class="primary" data-focus="facility-lobby">前往大堂</button><p class="phase-note">空间预览阶段，暂不办理实际入住。</p>')},hotel:()=>{const p=e.getState();c("YOUR HOTEL",'<h2>一栋活着的酒店</h2><div class="floor-list">'+[...p.floors].reverse().map(v=>`<button data-return="${v.id}"><b>${v.label}</b><span>${v.name}</span><small>${v.entityIds.length>1?v.entityIds.length+" 间客房":"公共空间"}</small><i>›</i></button>`).join("")+"</div>")},operations:()=>c("OPERATIONS",'<h2>看看不同的时刻</h2><p>切换酒店的环境光，观察空间、材质和室内暖灯。</p><div class="atmosphere-options"><button data-atmosphere="day">☀<span>白昼</span></button><button data-atmosphere="dusk">◐<span>日落</span></button><button data-atmosphere="night">☾<span>夜晚</span></button></div><p class="phase-note">当前 1× / 2× / 4× 控制人物演示速度。经营时钟、部门与事件系统尚未接入。</p>'),tasks:()=>{const p=e.getState();c("TODAY",'<h2>认识你的酒店</h2><p>三个短停留，看看空间与人物。</p><div class="task-list">'+[["facility-lobby","去大堂看看","前台与住客动线"],["room-301","打开 301 房间","房型、房态与住宿信息"],["facility-gym","逛逛健身房","公区与人物"]].map(([v,g,m])=>`<button data-focus="${v}"><b>${p.visited.includes(v)?"✓":"○"}</b><span>${g}<small>${m}</small></span><i>›</i></button>`).join("")+"</div>")},log:()=>{const p=e.getState();c("HOTEL JOURNAL",'<h2>空间浏览记录</h2><p>本次浏览的房间与公区。</p><div class="log-list">'+(p.visited.length?[...p.visited].reverse().map(v=>{const g=p.entities[v];return`<button data-focus="${v}"><span>${g.kind==="room"?g.number+" 房间":g.name}</span><small>已查看 ›</small></button>`}).join(""):'<p class="empty">轻点一处空间，开始认识酒店。</p>')+'</div><p class="phase-note">此处为本次会话的预览记录。持久运营日志将在经营系统迁移阶段实现。</p>')}};n.addEventListener("click",p=>{const v=p.target.closest("button");if(v){if(v.matches(".close-sheet")&&o(),v.dataset.open&&(e.select(null),s=v.dataset.open,d[s]?.()),v.dataset.speed&&e.setSpeed(Number(v.dataset.speed)),v.dataset.return){const g=v.dataset.return;o(),e.focusFloor(g),l(g)}if(v.dataset.focus){const g=v.dataset.focus,m=Ql(e.getState(),g);o(),m&&(e.focusFloor(m.id),l(m.id)),e.select(g)}if(v.dataset.floor&&(e.focusFloor(v.dataset.floor),l(v.dataset.floor)),v.dataset.atmosphere&&(e.setAtmosphere(v.dataset.atmosphere),o()),v.matches(".weather")){const g=["dusk","night","day"];e.setAtmosphere(g[(g.indexOf(e.getState().atmosphere)+1)%3])}}}),t.addEventListener("cancel",p=>{p.preventDefault(),o()}),t.addEventListener("click",p=>{if(p.target===t){const v=t.getBoundingClientRect();(p.clientX<v.left||p.clientX>v.right||p.clientY<v.top||p.clientY>v.bottom)&&o()}}),n.querySelector(".floor-rail").innerHTML=[...e.getState().floors].reverse().map(p=>`<button data-floor="${p.id}" aria-label="前往${p.label} ${p.name}">${p.label}</button>`).join("");let f=null;const h=p=>{n.querySelector("#cash").textContent="¥"+p.metrics.cash.toLocaleString("en-US"),n.querySelector("#reputation").textContent=String(p.metrics.reputation),n.querySelector("#owner").textContent=String(p.metrics.owner),n.querySelector("#suite-count").textContent=yu(p)+" 间",n.querySelector("#occupancy").textContent=`${st(p).length} 间客房 · ${Su(p)} 间在住`,n.querySelector("#task-count").textContent=["facility-lobby","room-301","facility-gym"].filter(v=>p.visited.includes(v)).length+"/3",n.querySelectorAll("[data-speed]").forEach(v=>{v.classList.toggle("active",Number(v.dataset.speed)===p.speed),v.setAttribute("aria-pressed",String(Number(v.dataset.speed)===p.speed))}),n.querySelector(".weather span").textContent={day:"白昼",dusk:"日落",night:"夜晚"}[p.atmosphere],n.querySelector(".clock").textContent={day:"09:20",dusk:"18:40",night:"21:30"}[p.atmosphere],n.querySelectorAll("[data-floor]").forEach(v=>v.classList.toggle("active",v.dataset.floor===p.focusedFloorId)),p.selectedId&&p.selectedId!==f&&(s="entity",u(p.selectedId)),f=p.selectedId};return e.subscribe(h),h(e.getState()),{stage:n.querySelector(".world-stage"),setFocusHandler:p=>{l=p},showError:p=>{c("画面未能载入","<h2>请重新载入酒店</h2><p>"+p+'</p><button class="primary" id="reload">重新载入</button>'),i.querySelector("#reload").addEventListener("click",()=>location.reload())}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ml="185",Tf=0,lc=1,Af=2,Ks=1,zu=2,$r=3,_i=0,Kt=1,Xn=2,Yn=0,xr=1,cc=2,uc=3,dc=4,Rf=5,Ci=100,Cf=101,Pf=102,If=103,Lf=104,Df=200,Uf=201,Nf=202,Ff=203,_o=204,xo=205,Of=206,kf=207,Bf=208,zf=209,Gf=210,Hf=211,Vf=212,Wf=213,Xf=214,bo=0,Mo=1,yo=2,yr=3,So=4,Eo=5,wo=6,To=7,Gu=0,$f=1,qf=2,Un=0,Hu=1,Vu=2,Wu=3,yl=4,Xu=5,$u=6,qu=7,Yu=300,Bi=301,Sr=302,Ta=303,Aa=304,pa=306,ss=1e3,Ln=1001,Ao=1002,Ft=1003,Yf=1004,ws=1005,Ot=1006,Ra=1007,mi=1008,tn=1009,Zu=1010,Ku=1011,as=1012,Sl=1013,Fn=1014,bn=1015,Kn=1016,El=1017,wl=1018,os=1020,Ju=35902,Qu=35899,ju=1021,ed=1022,Mn=1023,Jn=1026,Li=1027,Tl=1028,Al=1029,zi=1030,Rl=1031,Cl=1033,Js=33776,Qs=33777,js=33778,ea=33779,Ro=35840,Co=35841,Po=35842,Io=35843,Lo=36196,Do=37492,Uo=37496,No=37488,Fo=37489,sa=37490,Oo=37491,ko=37808,Bo=37809,zo=37810,Go=37811,Ho=37812,Vo=37813,Wo=37814,Xo=37815,$o=37816,qo=37817,Yo=37818,Zo=37819,Ko=37820,Jo=37821,Qo=36492,jo=36494,el=36495,tl=36283,nl=36284,aa=36285,il=36286,Zf=3200,rl=0,Kf=1,hi="",Xt="srgb",oa="srgb-linear",la="linear",ut="srgb",Ki=7680,fc=519,Jf=512,Qf=513,jf=514,Pl=515,eh=516,th=517,Il=518,nh=519,hc=35044,pc="300 es",Dn=2e3,ls=2001;function ih(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ca(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function rh(){const n=ca("canvas");return n.style.display="block",n}const mc={};function gc(...n){const e="THREE."+n.shift();console.log(e,...n)}function td(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=td(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function je(...n){n=td(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function br(...n){const e=n.join(" ");e in mc||(mc[e]=!0,Fe(...n))}function sh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const ah={[bo]:Mo,[yo]:wo,[So]:To,[yr]:Eo,[Mo]:bo,[wo]:yo,[To]:So,[Eo]:yr};class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vc=1234567;const jr=Math.PI/180,cs=180/Math.PI;function Pr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function Ll(n,e){return(n%e+e)%e}function oh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function lh(n,e,t){return n!==e?(t-n)/(e-n):0}function es(n,e,t){return(1-t)*n+t*e}function ch(n,e,t,i){return es(n,e,1-Math.exp(-t*i))}function uh(n,e=1){return e-Math.abs(Ll(n,e*2)-e)}function dh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function fh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function hh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ph(n,e){return n+Math.random()*(e-n)}function mh(n){return n*(.5-Math.random())}function gh(n){n!==void 0&&(vc=n);let e=vc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vh(n){return n*jr}function _h(n){return n*cs}function xh(n){return(n&n-1)===0&&n!==0}function bh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Mh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function yh(n,e,t,i,r){const s=Math.cos,a=Math.sin,l=s(t/2),o=a(t/2),c=s((e+i)/2),u=a((e+i)/2),d=s((e-i)/2),f=a((e-i)/2),h=s((i-e)/2),p=a((i-e)/2);switch(r){case"XYX":n.set(l*u,o*d,o*f,l*c);break;case"YZY":n.set(o*f,l*u,o*d,l*c);break;case"ZXZ":n.set(o*d,o*f,l*u,l*c);break;case"XZX":n.set(l*u,o*p,o*h,l*c);break;case"YXY":n.set(o*h,l*u,o*p,l*c);break;case"ZYZ":n.set(o*p,o*h,l*u,l*c);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function pr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Sh={DEG2RAD:jr,RAD2DEG:cs,generateUUID:Pr,clamp:Ye,euclideanModulo:Ll,mapLinear:oh,inverseLerp:lh,lerp:es,damp:ch,pingpong:uh,smoothstep:dh,smootherstep:fh,randInt:hh,randFloat:ph,randFloatSpread:mh,seededRandom:gh,degToRad:vh,radToDeg:_h,isPowerOfTwo:xh,ceilPowerOfTwo:bh,floorPowerOfTwo:Mh,setQuaternionFromProperEuler:yh,normalize:Ht,denormalize:pr};class Oe{static{Oe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ir{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,l){let o=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[a+0],h=s[a+1],p=s[a+2],v=s[a+3];if(d!==v||o!==f||c!==h||u!==p){let g=o*f+c*h+u*p+d*v;g<0&&(f=-f,h=-h,p=-p,v=-v,g=-g);let m=1-l;if(g<.9995){const b=Math.acos(g),S=Math.sin(b);m=Math.sin(m*b)/S,l=Math.sin(l*b)/S,o=o*m+f*l,c=c*m+h*l,u=u*m+p*l,d=d*m+v*l}else{o=o*m+f*l,c=c*m+h*l,u=u*m+p*l,d=d*m+v*l;const b=1/Math.sqrt(o*o+c*c+u*u+d*d);o*=b,c*=b,u*=b,d*=b}}e[t]=o,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const l=i[r],o=i[r+1],c=i[r+2],u=i[r+3],d=s[a],f=s[a+1],h=s[a+2],p=s[a+3];return e[t]=l*p+u*d+o*h-c*f,e[t+1]=o*p+u*f+c*d-l*h,e[t+2]=c*p+u*h+l*f-o*d,e[t+3]=u*p-l*d-o*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,l=Math.cos,o=Math.sin,c=l(i/2),u=l(r/2),d=l(s/2),f=o(i/2),h=o(r/2),p=o(s/2);switch(a){case"XYZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"YZX":this._x=f*u*d+c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d-f*h*p;break;case"XZY":this._x=f*u*d-c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d+f*h*p;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],l=t[5],o=t[9],c=t[2],u=t[6],d=t[10],f=i+l+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-o)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>l&&i>d){const h=2*Math.sqrt(1+i-l-d);this._w=(u-o)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(l>d){const h=2*Math.sqrt(1+l-i-d);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(o+u)/h}else{const h=2*Math.sqrt(1+d-i-l);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(o+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,l=t._x,o=t._y,c=t._z,u=t._w;return this._x=i*u+a*l+r*c-s*o,this._y=r*u+a*o+s*l-i*c,this._z=s*u+a*c+i*o-r*l,this._w=a*u-i*l-r*o-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,l=this.dot(e);l<0&&(i=-i,r=-r,s=-s,a=-a,l=-l);let o=1-t;if(l<.9995){const c=Math.acos(l),u=Math.sin(c);o=Math.sin(o*c)/u,t=Math.sin(t*c)/u,this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+s*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+s*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{static{F.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_c.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,l=e.z,o=e.w,c=2*(a*r-l*i),u=2*(l*t-s*r),d=2*(s*i-a*t);return this.x=t+o*c+a*d-l*u,this.y=i+o*u+l*c-s*d,this.z=r+o*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,l=t.y,o=t.z;return this.x=r*o-s*l,this.y=s*a-i*o,this.z=i*l-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ca.copy(this).projectOnVector(e),this.sub(Ca)}reflect(e){return this.sub(Ca.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ca=new F,_c=new Ir;class ke{static{ke.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,l,o,c)}set(e,t,i,r,s,a,l,o,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=l,u[3]=t,u[4]=s,u[5]=o,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],l=i[3],o=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],p=i[8],v=r[0],g=r[3],m=r[6],b=r[1],S=r[4],y=r[7],R=r[2],E=r[5],C=r[8];return s[0]=a*v+l*b+o*R,s[3]=a*g+l*S+o*E,s[6]=a*m+l*y+o*C,s[1]=c*v+u*b+d*R,s[4]=c*g+u*S+d*E,s[7]=c*m+u*y+d*C,s[2]=f*v+h*b+p*R,s[5]=f*g+h*S+p*E,s[8]=f*m+h*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],l=e[5],o=e[6],c=e[7],u=e[8];return t*a*u-t*l*c-i*s*u+i*l*o+r*s*c-r*a*o}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],l=e[5],o=e[6],c=e[7],u=e[8],d=u*a-l*c,f=l*o-u*s,h=c*s-a*o,p=t*d+i*f+r*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(r*c-u*i)*v,e[2]=(l*i-r*a)*v,e[3]=f*v,e[4]=(u*t-r*o)*v,e[5]=(r*s-l*t)*v,e[6]=h*v,e[7]=(i*o-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,l){const o=Math.cos(s),c=Math.sin(s);return this.set(i*o,i*c,-i*(o*a+c*l)+a+e,-r*c,r*o,-r*(-c*a+o*l)+l+t,0,0,1),this}scale(e,t){return br("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pa.makeScale(e,t)),this}rotate(e){return br("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pa.makeRotation(-e)),this}translate(e,t){return br("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pa=new ke,xc=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bc=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eh(){const n={enabled:!0,workingColorSpace:oa,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Zn(r.r),r.g=Zn(r.g),r.b=Zn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=Mr(r.r),r.g=Mr(r.g),r.b=Mr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===hi?la:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return br("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return br("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[oa]:{primaries:e,whitePoint:i,transfer:la,toXYZ:xc,fromXYZ:bc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:xc,fromXYZ:bc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const Ke=Eh();function Zn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Mr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ji;class wh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ji===void 0&&(Ji=ca("canvas")),Ji.width=e.width,Ji.height=e.height;const r=Ji.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ji}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ca("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Zn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Zn(t[i]/255)*255):t[i]=Zn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0;class Dl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,l=r.length;a<l;a++)r[a].isDataTexture?s.push(Ia(r[a].image)):s.push(Ia(r[a]))}else s=Ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?wh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Ah=0;const La=new F;class $t extends Hi{constructor(e=$t.DEFAULT_IMAGE,t=$t.DEFAULT_MAPPING,i=Ln,r=Ln,s=Ot,a=mi,l=Mn,o=tn,c=$t.DEFAULT_ANISOTROPY,u=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Pr(),this.name="",this.source=new Dl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(La).x}get height(){return this.source.getSize(La).y}get depth(){return this.source.getSize(La).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ss:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ss:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Yu;$t.DEFAULT_ANISOTROPY=1;class xt{static{xt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const o=e.elements,c=o[0],u=o[4],d=o[8],f=o[1],h=o[5],p=o[9],v=o[2],g=o[6],m=o[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,y=(h+1)/2,R=(m+1)/2,E=(u+f)/4,C=(d+v)/4,x=(p+g)/4;return S>y&&S>R?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=E/i,s=C/i):y>R?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=E/r,s=x/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=x/s),this.set(i,r,s,t),this}let b=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(g-p)/b,this.y=(d-v)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rh extends Hi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new $t(r),a=i.count;for(let l=0;l<a;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Dl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends Rh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class nd extends $t{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ch extends $t{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dt{static{dt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,l,o,c,u,d,f,h,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,l,o,c,u,d,f,h,p,v,g)}set(e,t,i,r,s,a,l,o,c,u,d,f,h,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=l,m[13]=o,m[2]=c,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Qi.setFromMatrixColumn(e,0).length(),s=1/Qi.setFromMatrixColumn(e,1).length(),a=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),l=Math.sin(i),o=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,h=a*d,p=l*u,v=l*d;t[0]=o*u,t[4]=-o*d,t[8]=c,t[1]=h+p*c,t[5]=f-v*c,t[9]=-l*o,t[2]=v-f*c,t[6]=p+h*c,t[10]=a*o}else if(e.order==="YXZ"){const f=o*u,h=o*d,p=c*u,v=c*d;t[0]=f+v*l,t[4]=p*l-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-l,t[2]=h*l-p,t[6]=v+f*l,t[10]=a*o}else if(e.order==="ZXY"){const f=o*u,h=o*d,p=c*u,v=c*d;t[0]=f-v*l,t[4]=-a*d,t[8]=p+h*l,t[1]=h+p*l,t[5]=a*u,t[9]=v-f*l,t[2]=-a*c,t[6]=l,t[10]=a*o}else if(e.order==="ZYX"){const f=a*u,h=a*d,p=l*u,v=l*d;t[0]=o*u,t[4]=p*c-h,t[8]=f*c+v,t[1]=o*d,t[5]=v*c+f,t[9]=h*c-p,t[2]=-c,t[6]=l*o,t[10]=a*o}else if(e.order==="YZX"){const f=a*o,h=a*c,p=l*o,v=l*c;t[0]=o*u,t[4]=v-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-l*u,t[2]=-c*u,t[6]=h*d+p,t[10]=f-v*d}else if(e.order==="XZY"){const f=a*o,h=a*c,p=l*o,v=l*c;t[0]=o*u,t[4]=-d,t[8]=c*u,t[1]=f*d+v,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=l*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ph,e,Ih)}lookAt(e,t,i){const r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ai.crossVectors(i,Qt),ai.lengthSq()===0&&(Math.abs(i.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ai.crossVectors(i,Qt)),ai.normalize(),Ts.crossVectors(Qt,ai),r[0]=ai.x,r[4]=Ts.x,r[8]=Qt.x,r[1]=ai.y,r[5]=Ts.y,r[9]=Qt.y,r[2]=ai.z,r[6]=Ts.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],l=i[4],o=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],p=i[2],v=i[6],g=i[10],m=i[14],b=i[3],S=i[7],y=i[11],R=i[15],E=r[0],C=r[4],x=r[8],A=r[12],D=r[1],P=r[5],O=r[9],Z=r[13],j=r[2],z=r[6],Q=r[10],W=r[14],ie=r[3],ae=r[7],ue=r[11],q=r[15];return s[0]=a*E+l*D+o*j+c*ie,s[4]=a*C+l*P+o*z+c*ae,s[8]=a*x+l*O+o*Q+c*ue,s[12]=a*A+l*Z+o*W+c*q,s[1]=u*E+d*D+f*j+h*ie,s[5]=u*C+d*P+f*z+h*ae,s[9]=u*x+d*O+f*Q+h*ue,s[13]=u*A+d*Z+f*W+h*q,s[2]=p*E+v*D+g*j+m*ie,s[6]=p*C+v*P+g*z+m*ae,s[10]=p*x+v*O+g*Q+m*ue,s[14]=p*A+v*Z+g*W+m*q,s[3]=b*E+S*D+y*j+R*ie,s[7]=b*C+S*P+y*z+R*ae,s[11]=b*x+S*O+y*Q+R*ue,s[15]=b*A+S*Z+y*W+R*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],l=e[5],o=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],v=e[7],g=e[11],m=e[15],b=o*h-c*f,S=l*h-c*d,y=l*f-o*d,R=a*h-c*u,E=a*f-o*u,C=a*d-l*u;return t*(v*b-g*S+m*y)-i*(p*b-g*R+m*E)+r*(p*S-v*R+m*C)-s*(p*y-v*E+g*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],l=e[9],o=e[2],c=e[6],u=e[10];return t*(a*u-l*c)-i*(s*u-l*o)+r*(s*c-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],l=e[5],o=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],v=e[13],g=e[14],m=e[15],b=t*l-i*a,S=t*o-r*a,y=t*c-s*a,R=i*o-r*l,E=i*c-s*l,C=r*c-s*o,x=u*v-d*p,A=u*g-f*p,D=u*m-h*p,P=d*g-f*v,O=d*m-h*v,Z=f*m-h*g,j=b*Z-S*O+y*P+R*D-E*A+C*x;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/j;return e[0]=(l*Z-o*O+c*P)*z,e[1]=(r*O-i*Z-s*P)*z,e[2]=(v*C-g*E+m*R)*z,e[3]=(f*E-d*C-h*R)*z,e[4]=(o*D-a*Z-c*A)*z,e[5]=(t*Z-r*D+s*A)*z,e[6]=(g*y-p*C-m*S)*z,e[7]=(u*C-f*y+h*S)*z,e[8]=(a*O-l*D+c*x)*z,e[9]=(i*D-t*O-s*x)*z,e[10]=(p*E-v*y+m*b)*z,e[11]=(d*y-u*E-h*b)*z,e[12]=(l*A-a*P-o*x)*z,e[13]=(t*P-i*A+r*x)*z,e[14]=(v*S-p*R-g*b)*z,e[15]=(u*R-d*S+f*b)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,l=e.y,o=e.z,c=s*a,u=s*l;return this.set(c*a+i,c*l-r*o,c*o+r*l,0,c*l+r*o,u*l+i,u*o-r*a,0,c*o-r*l,u*o+r*a,s*o*o+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,l=t._z,o=t._w,c=s+s,u=a+a,d=l+l,f=s*c,h=s*u,p=s*d,v=a*u,g=a*d,m=l*d,b=o*c,S=o*u,y=o*d,R=i.x,E=i.y,C=i.z;return r[0]=(1-(v+m))*R,r[1]=(h+y)*R,r[2]=(p-S)*R,r[3]=0,r[4]=(h-y)*E,r[5]=(1-(f+m))*E,r[6]=(g+b)*E,r[7]=0,r[8]=(p+S)*C,r[9]=(g-b)*C,r[10]=(1-(f+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Qi.set(r[0],r[1],r[2]).length();const l=Qi.set(r[4],r[5],r[6]).length(),o=Qi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),hn.copy(this);const c=1/a,u=1/l,d=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,t.setFromRotationMatrix(hn),i.x=a,i.y=l,i.z=o,this}makePerspective(e,t,i,r,s,a,l=Dn,o=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let p,v;if(o)p=s/(a-s),v=a*s/(a-s);else if(l===Dn)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(l===ls)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,l=Dn,o=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r);let p,v;if(o)p=1/(a-s),v=a/(a-s);else if(l===Dn)p=-2/(a-s),v=-(a+s)/(a-s);else if(l===ls)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Qi=new F,hn=new dt,Ph=new F(0,0,0),Ih=new F(1,1,1),ai=new F,Ts=new F,Qt=new F,Mc=new dt,yc=new Ir;class xi{constructor(e=0,t=0,i=0,r=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],l=r[8],o=r[1],c=r[5],u=r[9],d=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,h),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(l,h));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Mc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yc.setFromEuler(this),this.setFromQuaternion(yc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Lh=0;const Sc=new F,ji=new Ir,kn=new dt,As=new F,Fr=new F,Dh=new F,Uh=new Ir,Ec=new F(1,0,0),wc=new F(0,1,0),Tc=new F(0,0,1),Ac={type:"added"},Nh={type:"removed"},er={type:"childadded",child:null},Da={type:"childremoved",child:null};class kt extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=Pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new F,t=new xi,i=new Ir,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new ke}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(Ec,e)}rotateY(e){return this.rotateOnAxis(wc,e)}rotateZ(e){return this.rotateOnAxis(Tc,e)}translateOnAxis(e,t){return Sc.copy(e).applyQuaternion(this.quaternion),this.position.add(Sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ec,e)}translateY(e){return this.translateOnAxis(wc,e)}translateZ(e){return this.translateOnAxis(Tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?As.copy(e):As.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Fr,As,this.up):kn.lookAt(As,Fr,this.up),this.quaternion.setFromRotationMatrix(kn),r&&(kn.extractRotation(r.matrixWorld),ji.setFromRotationMatrix(kn),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ac),er.child=e,this.dispatchEvent(er),er.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nh),Da.child=e,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ac),er.child=e,this.dispatchEvent(er),er.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,Dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,Uh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>({...l})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const o=l.shapes;if(Array.isArray(o))for(let c=0,u=o.length;c<u;c++){const d=o[c];s(e.shapes,d)}else s(e.shapes,o)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(s(e.materials,this.material[o]));r.material=l}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const o=this.animations[l];r.animations.push(s(e.animations,o))}}if(t){const l=a(e.geometries),o=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);l.length>0&&(i.geometries=l),o.length>0&&(i.materials=o),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(l){const o=[];for(const c in l){const u=l[c];delete u.metadata,o.push(u)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new F(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class et extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fh={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const l=this._targetRay,o=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;c.inputState.pinching&&f>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Fh)))}return l!==null&&(l.visible=r!==null),o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new et;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Na(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=Ll(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Na(a,s,e+1/3),this.g=Na(a,s,e),this.b=Na(a,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=Xt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],l=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=id[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=Mr(e.r),this.g=Mr(e.g),this.b=Mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ke.workingToColorSpace(Gt.copy(this),e),Math.round(Ye(Gt.r*255,0,255))*65536+Math.round(Ye(Gt.g*255,0,255))*256+Math.round(Ye(Gt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,r=Gt.g,s=Gt.b,a=Math.max(i,r,s),l=Math.min(i,r,s);let o,c;const u=(l+a)/2;if(l===a)o=0,c=0;else{const d=a-l;switch(c=u<=.5?d/(a+l):d/(2-a-l),a){case i:o=(r-s)/d+(r<s?6:0);break;case r:o=(s-i)/d+2;break;case s:o=(i-r)/d+4;break}o/=6}return e.h=o,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Xt){Ke.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,r=Gt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(Rs);const i=es(oi.h,Rs.h,t),r=es(oi.s,Rs.s,t),s=es(oi.l,Rs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Je;Je.NAMES=id;class Oh extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const pn=new F,Bn=new F,Fa=new F,zn=new F,tr=new F,nr=new F,Rc=new F,Oa=new F,ka=new F,Ba=new F,za=new xt,Ga=new xt,Ha=new xt;class _n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),pn.subVectors(e,t),r.cross(pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){pn.subVectors(r,t),Bn.subVectors(i,t),Fa.subVectors(e,t);const a=pn.dot(pn),l=pn.dot(Bn),o=pn.dot(Fa),c=Bn.dot(Bn),u=Bn.dot(Fa),d=a*c-l*l;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*o-l*u)*f,p=(a*u-l*o)*f;return s.set(1-h-p,p,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,i,r,s,a,l,o){return this.getBarycoord(e,t,i,r,zn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(s,zn.x),o.addScaledVector(a,zn.y),o.addScaledVector(l,zn.z),o)}static getInterpolatedAttribute(e,t,i,r,s,a){return za.setScalar(0),Ga.setScalar(0),Ha.setScalar(0),za.fromBufferAttribute(e,t),Ga.fromBufferAttribute(e,i),Ha.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(za,s.x),a.addScaledVector(Ga,s.y),a.addScaledVector(Ha,s.z),a}static isFrontFacing(e,t,i,r){return pn.subVectors(i,t),Bn.subVectors(e,t),pn.cross(Bn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),pn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,l;tr.subVectors(r,i),nr.subVectors(s,i),Oa.subVectors(e,i);const o=tr.dot(Oa),c=nr.dot(Oa);if(o<=0&&c<=0)return t.copy(i);ka.subVectors(e,r);const u=tr.dot(ka),d=nr.dot(ka);if(u>=0&&d<=u)return t.copy(r);const f=o*d-u*c;if(f<=0&&o>=0&&u<=0)return a=o/(o-u),t.copy(i).addScaledVector(tr,a);Ba.subVectors(e,s);const h=tr.dot(Ba),p=nr.dot(Ba);if(p>=0&&h<=p)return t.copy(s);const v=h*c-o*p;if(v<=0&&c>=0&&p<=0)return l=c/(c-p),t.copy(i).addScaledVector(nr,l);const g=u*p-h*d;if(g<=0&&d-u>=0&&h-p>=0)return Rc.subVectors(s,r),l=(d-u)/(d-u+(h-p)),t.copy(r).addScaledVector(Rc,l);const m=1/(g+v+f);return a=v*m,l=f*m,t.copy(i).addScaledVector(tr,a).addScaledVector(nr,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Vi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=s.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cs.copy(i.boundingBox)),Cs.applyMatrix4(e.matrixWorld),this.union(Cs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Or),Ps.subVectors(this.max,Or),ir.subVectors(e.a,Or),rr.subVectors(e.b,Or),sr.subVectors(e.c,Or),li.subVectors(rr,ir),ci.subVectors(sr,rr),Ei.subVectors(ir,sr);let t=[0,-li.z,li.y,0,-ci.z,ci.y,0,-Ei.z,Ei.y,li.z,0,-li.x,ci.z,0,-ci.x,Ei.z,0,-Ei.x,-li.y,li.x,0,-ci.y,ci.x,0,-Ei.y,Ei.x,0];return!Va(t,ir,rr,sr,Ps)||(t=[1,0,0,0,1,0,0,0,1],!Va(t,ir,rr,sr,Ps))?!1:(Is.crossVectors(li,ci),t=[Is.x,Is.y,Is.z],Va(t,ir,rr,sr,Ps))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Gn=[new F,new F,new F,new F,new F,new F,new F,new F],mn=new F,Cs=new Vi,ir=new F,rr=new F,sr=new F,li=new F,ci=new F,Ei=new F,Or=new F,Ps=new F,Is=new F,wi=new F;function Va(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){wi.fromArray(n,s);const l=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),o=e.dot(wi),c=t.dot(wi),u=i.dot(wi);if(Math.max(-Math.max(o,c,u),Math.min(o,c,u))>l)return!1}return!0}const Rt=new F,Ls=new Oe;let kh=0;class fn extends Hi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=hc,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ls.fromBufferAttribute(this,t),Ls.applyMatrix3(e),this.setXY(t,Ls.x,Ls.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=pr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class rd extends fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class sd extends fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ut extends fn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Bh=new Vi,kr=new F,Wa=new F;class ps{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Bh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kr.subVectors(e,this.center);const t=kr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(kr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kr.copy(e.center).add(Wa)),this.expandByPoint(kr.copy(e.center).sub(Wa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let zh=0;const an=new dt,Xa=new kt,ar=new F,jt=new Vi,Br=new Vi,Dt=new F;class rn extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=Pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ih(e)?sd:rd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return Xa.lookAt(e),Xa.updateMatrix(),this.applyMatrix4(Xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ut(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const l=t[s];Br.setFromBufferAttribute(l),this.morphTargetsRelative?(Dt.addVectors(jt.min,Br.min),jt.expandByPoint(Dt),Dt.addVectors(jt.max,Br.max),jt.expandByPoint(Dt)):(jt.expandByPoint(Br.min),jt.expandByPoint(Br.max))}jt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){const l=t[s],o=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)Dt.fromBufferAttribute(l,c),o&&(ar.fromBufferAttribute(e,c),Dt.add(ar)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new fn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const l=[],o=[];for(let x=0;x<i.count;x++)l[x]=new F,o[x]=new F;const c=new F,u=new F,d=new F,f=new Oe,h=new Oe,p=new Oe,v=new F,g=new F;function m(x,A,D){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,A),d.fromBufferAttribute(i,D),f.fromBufferAttribute(s,x),h.fromBufferAttribute(s,A),p.fromBufferAttribute(s,D),u.sub(c),d.sub(c),h.sub(f),p.sub(f);const P=1/(h.x*p.y-p.x*h.y);isFinite(P)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(P),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(P),l[x].add(v),l[A].add(v),l[D].add(v),o[x].add(g),o[A].add(g),o[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,A=b.length;x<A;++x){const D=b[x],P=D.start,O=D.count;for(let Z=P,j=P+O;Z<j;Z+=3)m(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const S=new F,y=new F,R=new F,E=new F;function C(x){R.fromBufferAttribute(r,x),E.copy(R);const A=l[x];S.copy(A),S.sub(R.multiplyScalar(R.dot(A))).normalize(),y.crossVectors(E,A);const P=y.dot(o[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,P)}for(let x=0,A=b.length;x<A;++x){const D=b[x],P=D.start,O=D.count;for(let Z=P,j=P+O;Z<j;Z+=3)C(e.getX(Z+0)),C(e.getX(Z+1)),C(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const r=new F,s=new F,a=new F,l=new F,o=new F,c=new F,u=new F,d=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){const p=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),l.fromBufferAttribute(i,p),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),l.add(u),o.add(u),c.add(u),i.setXYZ(p,l.x,l.y,l.z),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(l,o){const c=l.array,u=l.itemSize,d=l.normalized,f=new c.constructor(o.length*u);let h=0,p=0;for(let v=0,g=o.length;v<g;v++){l.isInterleavedBufferAttribute?h=o[v]*l.data.stride+l.offset:h=o[v]*u;for(let m=0;m<u;m++)f[p++]=c[h++]}return new fn(f,u,d)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,i=this.index.array,r=this.attributes;for(const l in r){const o=r[l],c=e(o,i);t.setAttribute(l,c)}const s=this.morphAttributes;for(const l in s){const o=[],c=s[l];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);o.push(h)}t.morphAttributes[l]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,o=a.length;l<o;l++){const c=a[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const c in o)o[c]!==void 0&&(e[c]=o[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const o in i){const c=i[o];e.data.attributes[o]=c.toJSON(e.data)}const r={};let s=!1;for(const o in this.morphAttributes){const c=this.morphAttributes[o],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(r[o]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Gh=0;class ms extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Pr(),this.name="",this.type="Material",this.blending=xr,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_o,this.blendDst=xo,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xr&&(i.blending=this.blending),this.side!==_i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_o&&(i.blendSrc=this.blendSrc),this.blendDst!==xo&&(i.blendDst=this.blendDst),this.blendEquation!==Ci&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==yr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const l in s){const o=s[l];delete o.metadata,a.push(o)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Hn=new F,$a=new F,Ds=new F,ui=new F,qa=new F,Us=new F,Ya=new F;class ad{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){$a.copy(e).add(t).multiplyScalar(.5),Ds.copy(t).sub(e).normalize(),ui.copy(this.origin).sub($a);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ds),l=ui.dot(this.direction),o=-ui.dot(Ds),c=ui.lengthSq(),u=Math.abs(1-a*a);let d,f,h,p;if(u>0)if(d=a*o-l,f=a*l-o,p=s*u,d>=0)if(f>=-p)if(f<=p){const v=1/u;d*=v,f*=v,h=d*(d+a*f+2*l)+f*(a*d+f+2*o)+c}else f=s,d=Math.max(0,-(a*f+l)),h=-d*d+f*(f+2*o)+c;else f=-s,d=Math.max(0,-(a*f+l)),h=-d*d+f*(f+2*o)+c;else f<=-p?(d=Math.max(0,-(-a*s+l)),f=d>0?-s:Math.min(Math.max(-s,-o),s),h=-d*d+f*(f+2*o)+c):f<=p?(d=0,f=Math.min(Math.max(-s,-o),s),h=f*(f+2*o)+c):(d=Math.max(0,-(a*s+l)),f=d>0?s:Math.min(Math.max(-s,-o),s),h=-d*d+f*(f+2*o)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+l)),h=-d*d+f*(f+2*o)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy($a).addScaledVector(Ds,f),h}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const i=Hn.dot(this.direction),r=Hn.dot(Hn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),l=i-a,o=i+a;return o<0?null:l<0?this.at(o,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,l,o;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(l=(e.min.z-f.z)*d,o=(e.max.z-f.z)*d):(l=(e.max.z-f.z)*d,o=(e.min.z-f.z)*d),i>o||l>r)||((l>i||i!==i)&&(i=l),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,i,r,s){qa.subVectors(t,e),Us.subVectors(i,e),Ya.crossVectors(qa,Us);let a=this.direction.dot(Ya),l;if(a>0){if(r)return null;l=1}else if(a<0)l=-1,a=-a;else return null;ui.subVectors(this.origin,e);const o=l*this.direction.dot(Us.crossVectors(ui,Us));if(o<0)return null;const c=l*this.direction.dot(qa.cross(ui));if(c<0||o+c>a)return null;const u=-l*ui.dot(Ya);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wi extends ms{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Cc=new dt,Ti=new ad,Ns=new ps,Pc=new F,Fs=new F,Os=new F,ks=new F,Za=new F,Bs=new F,Ic=new F,zs=new F;class _t extends kt{constructor(e=new rn,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(s&&l){Bs.set(0,0,0);for(let o=0,c=s.length;o<c;o++){const u=l[o],d=s[o];u!==0&&(Za.fromBufferAttribute(d,e),a?Bs.addScaledVector(Za,u):Bs.addScaledVector(Za.sub(t),u))}t.add(Bs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ns.copy(i.boundingSphere),Ns.applyMatrix4(s),Ti.copy(e.ray).recast(e.near),!(Ns.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(Ns,Pc)===null||Ti.origin.distanceToSquared(Pc)>(e.far-e.near)**2))&&(Cc.copy(s).invert(),Ti.copy(e.ray).applyMatrix4(Cc),!(i.boundingBox!==null&&Ti.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ti)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,l=s.index,o=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(l!==null)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=a[g.materialIndex],b=Math.max(g.start,h.start),S=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let y=b,R=S;y<R;y+=3){const E=l.getX(y),C=l.getX(y+1),x=l.getX(y+2);r=Gs(this,m,e,i,c,u,d,E,C,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),v=Math.min(l.count,h.start+h.count);for(let g=p,m=v;g<m;g+=3){const b=l.getX(g),S=l.getX(g+1),y=l.getX(g+2);r=Gs(this,a,e,i,c,u,d,b,S,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(o!==void 0)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=a[g.materialIndex],b=Math.max(g.start,h.start),S=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let y=b,R=S;y<R;y+=3){const E=y,C=y+1,x=y+2;r=Gs(this,m,e,i,c,u,d,E,C,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),v=Math.min(o.count,h.start+h.count);for(let g=p,m=v;g<m;g+=3){const b=g,S=g+1,y=g+2;r=Gs(this,a,e,i,c,u,d,b,S,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Hh(n,e,t,i,r,s,a,l){let o;if(e.side===Kt?o=i.intersectTriangle(a,s,r,!0,l):o=i.intersectTriangle(r,s,a,e.side===_i,l),o===null)return null;zs.copy(l),zs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(zs);return c<t.near||c>t.far?null:{distance:c,point:zs.clone(),object:n}}function Gs(n,e,t,i,r,s,a,l,o,c){n.getVertexPosition(l,Fs),n.getVertexPosition(o,Os),n.getVertexPosition(c,ks);const u=Hh(n,e,t,i,Fs,Os,ks,Ic);if(u){const d=new F;_n.getBarycoord(Ic,Fs,Os,ks,d),r&&(u.uv=_n.getInterpolatedAttribute(r,l,o,c,d,new Oe)),s&&(u.uv1=_n.getInterpolatedAttribute(s,l,o,c,d,new Oe)),a&&(u.normal=_n.getInterpolatedAttribute(a,l,o,c,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:l,b:o,c,normal:new F,materialIndex:0};_n.getNormal(Fs,Os,ks,f.normal),u.face=f,u.barycoord=d}return u}class ma extends $t{constructor(e=null,t=1,i=1,r,s,a,l,o,c=Ft,u=Ft,d,f){super(null,a,l,o,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lc extends fn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const or=new dt,Dc=new dt,Hs=[],Uc=new Vi,Vh=new dt,zr=new _t,Gr=new ps;class Er extends _t{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Vh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,or),Uc.copy(e.boundingBox).applyMatrix4(or),this.boundingBox.union(Uc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ps),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,or),Gr.copy(e.boundingSphere).applyMatrix4(or),this.boundingSphere.union(Gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let l=0;l<i.length;l++)i[l]=r[a+l]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gr.copy(this.boundingSphere),Gr.applyMatrix4(i),e.ray.intersectsSphere(Gr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,or),Dc.multiplyMatrices(i,or),zr.matrixWorld=Dc,zr.raycast(e,Hs);for(let a=0,l=Hs.length;a<l;a++){const o=Hs[a];o.instanceId=s,o.object=this,t.push(o)}Hs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new ma(new Float32Array(r*this.count),r,this.count,Tl,bn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const l=this.geometry.morphTargetsRelative?1:1-a,o=r*e;return s[o]=l,s.set(i,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ka=new F,Wh=new F,Xh=new ke;class Ri{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ka.subVectors(i,t).cross(Wh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ka),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Xh.getNormalMatrix(e),r=this.coplanarPoint(Ka).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new ps,$h=new Oe(.5,.5),Vs=new F;class Nl{constructor(e=new Ri,t=new Ri,i=new Ri,r=new Ri,s=new Ri,a=new Ri){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(r),l[4].copy(s),l[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Dn,i=!1){const r=this.planes,s=e.elements,a=s[0],l=s[1],o=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],p=s[8],v=s[9],g=s[10],m=s[11],b=s[12],S=s[13],y=s[14],R=s[15];if(r[0].setComponents(c-a,h-u,m-p,R-b).normalize(),r[1].setComponents(c+a,h+u,m+p,R+b).normalize(),r[2].setComponents(c+l,h+d,m+v,R+S).normalize(),r[3].setComponents(c-l,h-d,m-v,R-S).normalize(),i)r[4].setComponents(o,f,g,y).normalize(),r[5].setComponents(c-o,h-f,m-g,R-y).normalize();else if(r[4].setComponents(c-o,h-f,m-g,R-y).normalize(),t===Dn)r[5].setComponents(c+o,h+f,m+g,R+y).normalize();else if(t===ls)r[5].setComponents(o,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){Ai.center.set(0,0,0);const t=$h.distanceTo(e.center);return Ai.radius=.7071067811865476+t,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Vs.x=r.normal.x>0?e.max.x:e.min.x,Vs.y=r.normal.y>0?e.max.y:e.min.y,Vs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class od extends $t{constructor(e=[],t=Bi,i,r,s,a,l,o,c,u){super(e,t,i,r,s,a,l,o,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wr extends $t{constructor(e,t,i=Fn,r,s,a,l=Ft,o=Ft,c,u=Jn,d=1){if(u!==Jn&&u!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,l,o,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class qh extends wr{constructor(e,t=Fn,i=Bi,r,s,a=Ft,l=Ft,o,c=Jn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,l,o,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ld extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mi extends rn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const l=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const o=[],c=[],u=[],d=[];let f=0,h=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(o),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2));function p(v,g,m,b,S,y,R,E,C,x,A){const D=y/C,P=R/x,O=y/2,Z=R/2,j=E/2,z=C+1,Q=x+1;let W=0,ie=0;const ae=new F;for(let ue=0;ue<Q;ue++){const q=ue*P-Z;for(let Y=0;Y<z;Y++){const Se=Y*D-O;ae[v]=Se*b,ae[g]=q*S,ae[m]=j,c.push(ae.x,ae.y,ae.z),ae[v]=0,ae[g]=0,ae[m]=E>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(Y/C),d.push(1-ue/x),W+=1}}for(let ue=0;ue<x;ue++)for(let q=0;q<C;q++){const Y=f+q+z*ue,Se=f+q+z*(ue+1),De=f+(q+1)+z*(ue+1),Pe=f+(q+1)+z*ue;o.push(Y,Se,Pe),o.push(Se,De,Pe),ie+=6}l.addGroup(h,ie,A),h+=ie,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Lr extends rn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,l=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:l,thetaLength:o};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],h=[];let p=0;const v=[],g=i/2;let m=0;b(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Ut(d,3)),this.setAttribute("normal",new Ut(f,3)),this.setAttribute("uv",new Ut(h,2));function b(){const y=new F,R=new F;let E=0;const C=(t-e)/i;for(let x=0;x<=s;x++){const A=[],D=x/s,P=D*(t-e)+e;for(let O=0;O<=r;O++){const Z=O/r,j=Z*o+l,z=Math.sin(j),Q=Math.cos(j);R.x=P*z,R.y=-D*i+g,R.z=P*Q,d.push(R.x,R.y,R.z),y.set(z,C,Q).normalize(),f.push(y.x,y.y,y.z),h.push(Z,1-D),A.push(p++)}v.push(A)}for(let x=0;x<r;x++)for(let A=0;A<s;A++){const D=v[A][x],P=v[A+1][x],O=v[A+1][x+1],Z=v[A][x+1];(e>0||A!==0)&&(u.push(D,P,Z),E+=3),(t>0||A!==s-1)&&(u.push(P,O,Z),E+=3)}c.addGroup(m,E,0),m+=E}function S(y){const R=p,E=new Oe,C=new F;let x=0;const A=y===!0?e:t,D=y===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,g*D,0),f.push(0,D,0),h.push(.5,.5),p++;const P=p;for(let O=0;O<=r;O++){const j=O/r*o+l,z=Math.cos(j),Q=Math.sin(j);C.x=A*Q,C.y=g*D,C.z=A*z,d.push(C.x,C.y,C.z),f.push(0,D,0),E.x=z*.5+.5,E.y=Q*.5*D+.5,h.push(E.x,E.y),p++}for(let O=0;O<r;O++){const Z=R+O,j=P+O;y===!0?u.push(j,j+1,Z):u.push(j+1,j,Z),x+=3}c.addGroup(m,x,y===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ga extends Lr{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,l=Math.PI*2){super(0,e,t,i,r,s,a,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:l}}static fromJSON(e){return new ga(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fl extends rn{constructor(e=[new Oe(0,-.5),new Oe(.5,0),new Oe(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=Ye(r,0,Math.PI*2);const s=[],a=[],l=[],o=[],c=[],u=1/t,d=new F,f=new Oe,h=new F,p=new F,v=new F;let g=0,m=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:g=e[b+1].x-e[b].x,m=e[b+1].y-e[b].y,h.x=m*1,h.y=-g,h.z=m*0,v.copy(h),h.normalize(),o.push(h.x,h.y,h.z);break;case e.length-1:o.push(v.x,v.y,v.z);break;default:g=e[b+1].x-e[b].x,m=e[b+1].y-e[b].y,h.x=m*1,h.y=-g,h.z=m*0,p.copy(h),h.x+=v.x,h.y+=v.y,h.z+=v.z,h.normalize(),o.push(h.x,h.y,h.z),v.copy(p)}for(let b=0;b<=t;b++){const S=i+b*u*r,y=Math.sin(S),R=Math.cos(S);for(let E=0;E<=e.length-1;E++){d.x=e[E].x*y,d.y=e[E].y,d.z=e[E].x*R,a.push(d.x,d.y,d.z),f.x=b/t,f.y=E/(e.length-1),l.push(f.x,f.y);const C=o[3*E+0]*y,x=o[3*E+1],A=o[3*E+0]*R;c.push(C,x,A)}}for(let b=0;b<t;b++)for(let S=0;S<e.length-1;S++){const y=S+b*e.length,R=y,E=y+e.length,C=y+e.length+1,x=y+1;s.push(R,E,x),s.push(C,x,E)}this.setIndex(s),this.setAttribute("position",new Ut(a,3)),this.setAttribute("uv",new Ut(l,2)),this.setAttribute("normal",new Ut(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fl(e.points,e.segments,e.phiStart,e.phiLength)}}class Xi extends rn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,l=Math.floor(i),o=Math.floor(r),c=l+1,u=o+1,d=e/l,f=t/o,h=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const b=m*f-a;for(let S=0;S<c;S++){const y=S*d-s;p.push(y,-b,0),v.push(0,0,1),g.push(S/l),g.push(1-m/o)}}for(let m=0;m<o;m++)for(let b=0;b<l;b++){const S=b+c*m,y=b+c*(m+1),R=b+1+c*(m+1),E=b+1+c*m;h.push(S,y,E),h.push(y,R,E)}this.setIndex(h),this.setAttribute("position",new Ut(p,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.width,e.height,e.widthSegments,e.heightSegments)}}class us extends rn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:l},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const o=Math.min(a+l,Math.PI);let c=0;const u=[],d=new F,f=new F,h=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){const b=[],S=m/i,y=a+S*l,R=e*Math.cos(y),E=Math.sqrt(e*e-R*R);let C=0;m===0&&a===0?C=.5/t:m===i&&o===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){const A=x/t,D=r+A*s;d.x=-E*Math.cos(D),d.y=R,d.z=E*Math.sin(D),p.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),g.push(A+C,1-S),b.push(c++)}u.push(b)}for(let m=0;m<i;m++)for(let b=0;b<t;b++){const S=u[m][b+1],y=u[m][b],R=u[m+1][b],E=u[m+1][b+1];(m!==0||a>0)&&h.push(S,y,E),(m!==i-1||o<Math.PI)&&h.push(y,R,E)}this.setIndex(h),this.setAttribute("position",new Ut(p,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Tr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Nc(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Nc(r[0])){const s=[];for(let a=0,l=r.length;a<l;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Vt(n){const e={};for(let t=0;t<n.length;t++){const i=Tr(n[t]);for(const r in i)e[r]=i[r]}return e}function Nc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Yh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function cd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Zh={clone:Tr,merge:Vt};var Kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends ms{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kh,this.fragmentShader=Jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Tr(e.uniforms),this.uniformsGroups=Yh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(r.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new F().fromArray(r.value);break;case"v4":this.uniforms[i].value=new xt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(r.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Qh extends On{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ct extends ms{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rl,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jh extends ms{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ep extends ms{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ud extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class tp extends ud{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ja=new dt,Fc=new F,Oc=new F;class np{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nl,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),Ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ls||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ws=new F,Xs=new Ir,Tn=new F;class dd extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ws,Xs,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,Tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ws,Xs,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,Tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const di=new F,kc=new Oe,Bc=new Oe;class vn extends dd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,kc,Bc),t.subVectors(Bc,kc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(jr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/o,t-=a.offsetY*i/c,r*=a.width/o,i*=a.height/c}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class va extends dd{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,l=r+t,o=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,l-=u*this.view.offsetY,o=l-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ip extends np{constructor(){super(new va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rp extends ud{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new ip}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const lr=-90,cr=1;class sp extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new vn(lr,cr,e,t);r.layers=this.layers,this.add(r);const s=new vn(lr,cr,e,t);s.layers=this.layers,this.add(s);const a=new vn(lr,cr,e,t);a.layers=this.layers,this.add(a);const l=new vn(lr,cr,e,t);l.layers=this.layers,this.add(l);const o=new vn(lr,cr,e,t);o.layers=this.layers,this.add(o);const c=new vn(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,l,o]=t;for(const c of t)this.remove(c);if(e===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===ls)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,l,o,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class ap extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const zc=new dt;class op{constructor(e,t,i=0,r=1/0){this.ray=new ad(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return zc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zc),this}intersectObject(e,t=!0,i=[]){return sl(e,this,i,t),i.sort(Gc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)sl(e[r],this,i,t);return i.sort(Gc),i}}function Gc(n,e){return n.distance-e.distance}function sl(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,l=s.length;a<l;a++)sl(s[a],e,t,!0)}}class fd{static{fd.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Hc(n,e,t,i){const r=lp(i);switch(t){case ju:return n*e;case Tl:return n*e/r.components*r.byteLength;case Al:return n*e/r.components*r.byteLength;case zi:return n*e*2/r.components*r.byteLength;case Rl:return n*e*2/r.components*r.byteLength;case ed:return n*e*3/r.components*r.byteLength;case Mn:return n*e*4/r.components*r.byteLength;case Cl:return n*e*4/r.components*r.byteLength;case Js:case Qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case js:case ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Co:case Io:return Math.max(n,16)*Math.max(e,8)/4;case Ro:case Po:return Math.max(n,8)*Math.max(e,8)/2;case Lo:case Do:case No:case Fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Uo:case sa:case Oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case zo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Go:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case $o:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Yo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Qo:case jo:case el:return Math.ceil(n/4)*Math.ceil(e/4)*16;case tl:case nl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case aa:case il:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lp(n){switch(n){case tn:case Zu:return{byteLength:1,components:1};case as:case Ku:case Kn:return{byteLength:2,components:1};case El:case wl:return{byteLength:2,components:4};case Fn:case Sl:case bn:return{byteLength:4,components:1};case Ju:case Qu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ml}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ml);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function hd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function cp(n){const e=new WeakMap;function t(l,o){const c=l.array,u=l.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(o,f),n.bufferData(o,c,u),l.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:d}}function i(l,o,c){const u=o.array,d=o.updateRanges;if(n.bindBuffer(c,l),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){const p=d[f],v=d[h];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,d[f]=v)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){const v=d[h];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}o.clearUpdateRanges()}o.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const o=e.get(l);o&&(n.deleteBuffer(o.buffer),e.delete(l))}function a(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const u=e.get(l);(!u||u.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,o),c.version=l.version}}return{get:r,remove:s,update:a}}var up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dp=`#ifdef USE_ALPHAHASH
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
#endif`,fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gp=`#ifdef USE_AOMAP
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
#endif`,vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_p=`#ifdef USE_BATCHING
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
#endif`,xp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sp=`#ifdef USE_IRIDESCENCE
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
#endif`,Ep=`#ifdef USE_BUMPMAP
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
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Dp=`#define PI 3.141592653589793
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
} // validated`,Up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Np=`vec3 transformedNormal = objectNormal;
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
#endif`,Fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Op=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jp=`#ifdef USE_GRADIENTMAP
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
}`,Qp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,t0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,n0=`#ifdef USE_ENVMAP
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
#endif`,i0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,s0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o0=`PhysicalMaterial material;
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
#endif`,l0=`uniform sampler2D dfgLUT;
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
}`,c0=`
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
#endif`,u0=`#if defined( RE_IndirectDiffuse )
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
#endif`,d0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,f0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,h0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,x0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,b0=`#if defined( USE_POINTS_UV )
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
#endif`,M0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,S0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,E0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,w0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`#ifdef USE_MORPHTARGETS
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
#endif`,A0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,C0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,P0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,D0=`#ifdef USE_NORMALMAP
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
#endif`,U0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,N0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,F0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,O0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,k0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,z0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,G0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,V0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,W0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Z0=`float getShadowMask() {
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
}`,K0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,J0=`#ifdef USE_SKINNING
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
#endif`,Q0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j0=`#ifdef USE_SKINNING
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
#endif`,em=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,im=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rm=`#ifdef USE_TRANSMISSION
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const um=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dm=`uniform sampler2D t2D;
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
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`#include <common>
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
}`,vm=`#if DEPTH_PACKING == 3200
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
}`,_m=`#define DISTANCE
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
}`,xm=`#define DISTANCE
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
}`,bm=`varying vec3 vWorldDirection;
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
}`,ym=`uniform float scale;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,wm=`uniform vec3 diffuse;
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
}`,Rm=`#define MATCAP
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
}`,Cm=`#define MATCAP
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
}`,Pm=`#define NORMAL
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
}`,Im=`#define NORMAL
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
}`,Lm=`#define PHONG
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
}`,Dm=`#define PHONG
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
}`,Um=`#define STANDARD
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
}`,Nm=`#define STANDARD
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
}`,Fm=`#define TOON
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
}`,Om=`#define TOON
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
}`,km=`uniform float size;
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
}`,Bm=`uniform vec3 diffuse;
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
}`,zm=`#include <common>
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
}`,Gm=`uniform vec3 color;
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
}`,Hm=`uniform float rotation;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:up,alphahash_pars_fragment:dp,alphamap_fragment:fp,alphamap_pars_fragment:hp,alphatest_fragment:pp,alphatest_pars_fragment:mp,aomap_fragment:gp,aomap_pars_fragment:vp,batching_pars_vertex:_p,batching_vertex:xp,begin_vertex:bp,beginnormal_vertex:Mp,bsdfs:yp,iridescence_fragment:Sp,bumpmap_pars_fragment:Ep,clipping_planes_fragment:wp,clipping_planes_pars_fragment:Tp,clipping_planes_pars_vertex:Ap,clipping_planes_vertex:Rp,color_fragment:Cp,color_pars_fragment:Pp,color_pars_vertex:Ip,color_vertex:Lp,common:Dp,cube_uv_reflection_fragment:Up,defaultnormal_vertex:Np,displacementmap_pars_vertex:Fp,displacementmap_vertex:Op,emissivemap_fragment:kp,emissivemap_pars_fragment:Bp,colorspace_fragment:zp,colorspace_pars_fragment:Gp,envmap_fragment:Hp,envmap_common_pars_fragment:Vp,envmap_pars_fragment:Wp,envmap_pars_vertex:Xp,envmap_physical_pars_fragment:n0,envmap_vertex:$p,fog_vertex:qp,fog_pars_vertex:Yp,fog_fragment:Zp,fog_pars_fragment:Kp,gradientmap_pars_fragment:Jp,lightmap_pars_fragment:Qp,lights_lambert_fragment:jp,lights_lambert_pars_fragment:e0,lights_pars_begin:t0,lights_toon_fragment:i0,lights_toon_pars_fragment:r0,lights_phong_fragment:s0,lights_phong_pars_fragment:a0,lights_physical_fragment:o0,lights_physical_pars_fragment:l0,lights_fragment_begin:c0,lights_fragment_maps:u0,lights_fragment_end:d0,lightprobes_pars_fragment:f0,logdepthbuf_fragment:h0,logdepthbuf_pars_fragment:p0,logdepthbuf_pars_vertex:m0,logdepthbuf_vertex:g0,map_fragment:v0,map_pars_fragment:_0,map_particle_fragment:x0,map_particle_pars_fragment:b0,metalnessmap_fragment:M0,metalnessmap_pars_fragment:y0,morphinstance_vertex:S0,morphcolor_vertex:E0,morphnormal_vertex:w0,morphtarget_pars_vertex:T0,morphtarget_vertex:A0,normal_fragment_begin:R0,normal_fragment_maps:C0,normal_pars_fragment:P0,normal_pars_vertex:I0,normal_vertex:L0,normalmap_pars_fragment:D0,clearcoat_normal_fragment_begin:U0,clearcoat_normal_fragment_maps:N0,clearcoat_pars_fragment:F0,iridescence_pars_fragment:O0,opaque_fragment:k0,packing:B0,premultiplied_alpha_fragment:z0,project_vertex:G0,dithering_fragment:H0,dithering_pars_fragment:V0,roughnessmap_fragment:W0,roughnessmap_pars_fragment:X0,shadowmap_pars_fragment:$0,shadowmap_pars_vertex:q0,shadowmap_vertex:Y0,shadowmask_pars_fragment:Z0,skinbase_vertex:K0,skinning_pars_vertex:J0,skinning_vertex:Q0,skinnormal_vertex:j0,specularmap_fragment:em,specularmap_pars_fragment:tm,tonemapping_fragment:nm,tonemapping_pars_fragment:im,transmission_fragment:rm,transmission_pars_fragment:sm,uv_pars_fragment:am,uv_pars_vertex:om,uv_vertex:lm,worldpos_vertex:cm,background_vert:um,background_frag:dm,backgroundCube_vert:fm,backgroundCube_frag:hm,cube_vert:pm,cube_frag:mm,depth_vert:gm,depth_frag:vm,distance_vert:_m,distance_frag:xm,equirect_vert:bm,equirect_frag:Mm,linedashed_vert:ym,linedashed_frag:Sm,meshbasic_vert:Em,meshbasic_frag:wm,meshlambert_vert:Tm,meshlambert_frag:Am,meshmatcap_vert:Rm,meshmatcap_frag:Cm,meshnormal_vert:Pm,meshnormal_frag:Im,meshphong_vert:Lm,meshphong_frag:Dm,meshphysical_vert:Um,meshphysical_frag:Nm,meshtoon_vert:Fm,meshtoon_frag:Om,points_vert:km,points_frag:Bm,shadow_vert:zm,shadow_frag:Gm,sprite_vert:Hm,sprite_frag:Vm},ge={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},In={basic:{uniforms:Vt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Vt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Vt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Vt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Vt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Vt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Vt([ge.points,ge.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Vt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Vt([ge.common,ge.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Vt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Vt([ge.sprite,ge.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Vt([ge.common,ge.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Vt([ge.lights,ge.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};In.physical={uniforms:Vt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const $s={r:0,b:0,g:0},Wm=new dt,pd=new ke;pd.set(-1,0,0,0,1,0,0,0,1);function Xm(n,e,t,i,r,s){const a=new Je(0);let l=r===!0?0:1,o,c,u=null,d=0,f=null;function h(b){let S=b.isScene===!0?b.background:null;if(S&&S.isTexture){const y=b.backgroundBlurriness>0;S=e.get(S,y)}return S}function p(b){let S=!1;const y=h(b);y===null?g(a,l):y&&y.isColor&&(g(y,1),S=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(b,S){const y=h(S);y&&(y.isCubeTexture||y.mapping===pa)?(c===void 0&&(c=new _t(new Mi(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Tr(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Wm.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pd),c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==ut,(u!==y||d!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new _t(new Xi(2,2),new On({name:"BackgroundMaterial",uniforms:Tr(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=Ke.getTransfer(y.colorSpace)!==ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==n.toneMapping)&&(o.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),o.layers.enableAll(),b.unshift(o,o.geometry,o.material,0,0,null))}function g(b,S){b.getRGB($s,cd(n)),t.buffers.color.setClear($s.r,$s.g,$s.b,S,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,g(a,l)},render:p,addToRenderList:v,dispose:m}}function $m(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function l(P,O,Z,j,z){let Q=!1;const W=d(P,j,Z,O);s!==W&&(s=W,c(s.object)),Q=h(P,j,Z,z),Q&&p(P,j,Z,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,y(P,O,Z,j),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function o(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function d(P,O,Z,j){const z=j.wireframe===!0;let Q=i[O.id];Q===void 0&&(Q={},i[O.id]=Q);const W=P.isInstancedMesh===!0?P.id:0;let ie=Q[W];ie===void 0&&(ie={},Q[W]=ie);let ae=ie[Z.id];ae===void 0&&(ae={},ie[Z.id]=ae);let ue=ae[z];return ue===void 0&&(ue=f(o()),ae[z]=ue),ue}function f(P){const O=[],Z=[],j=[];for(let z=0;z<t;z++)O[z]=0,Z[z]=0,j[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:j,object:P,attributes:{},index:null}}function h(P,O,Z,j){const z=s.attributes,Q=O.attributes;let W=0;const ie=Z.getAttributes();for(const ae in ie)if(ie[ae].location>=0){const q=z[ae];let Y=Q[ae];if(Y===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),q===void 0||q.attribute!==Y||Y&&q.data!==Y.data)return!0;W++}return s.attributesNum!==W||s.index!==j}function p(P,O,Z,j){const z={},Q=O.attributes;let W=0;const ie=Z.getAttributes();for(const ae in ie)if(ie[ae].location>=0){let q=Q[ae];q===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));const Y={};Y.attribute=q,q&&q.data&&(Y.data=q.data),z[ae]=Y,W++}s.attributes=z,s.attributesNum=W,s.index=j}function v(){const P=s.newAttributes;for(let O=0,Z=P.length;O<Z;O++)P[O]=0}function g(P){m(P,0)}function m(P,O){const Z=s.newAttributes,j=s.enabledAttributes,z=s.attributeDivisors;Z[P]=1,j[P]===0&&(n.enableVertexAttribArray(P),j[P]=1),z[P]!==O&&(n.vertexAttribDivisor(P,O),z[P]=O)}function b(){const P=s.newAttributes,O=s.enabledAttributes;for(let Z=0,j=O.length;Z<j;Z++)O[Z]!==P[Z]&&(n.disableVertexAttribArray(Z),O[Z]=0)}function S(P,O,Z,j,z,Q,W){W===!0?n.vertexAttribIPointer(P,O,Z,z,Q):n.vertexAttribPointer(P,O,Z,j,z,Q)}function y(P,O,Z,j){v();const z=j.attributes,Q=Z.getAttributes(),W=O.defaultAttributeValues;for(const ie in Q){const ae=Q[ie];if(ae.location>=0){let ue=z[ie];if(ue===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(ue=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(ue=P.instanceColor)),ue!==void 0){const q=ue.normalized,Y=ue.itemSize,Se=e.get(ue);if(Se===void 0)continue;const De=Se.buffer,Pe=Se.type,X=Se.bytesPerElement,se=Pe===n.INT||Pe===n.UNSIGNED_INT||ue.gpuType===Sl;if(ue.isInterleavedBufferAttribute){const ne=ue.data,pe=ne.stride,Be=ue.offset;if(ne.isInstancedInterleavedBuffer){for(let Ue=0;Ue<ae.locationSize;Ue++)m(ae.location+Ue,ne.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ue=0;Ue<ae.locationSize;Ue++)g(ae.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,De);for(let Ue=0;Ue<ae.locationSize;Ue++)S(ae.location+Ue,Y/ae.locationSize,Pe,q,pe*X,(Be+Y/ae.locationSize*Ue)*X,se)}else{if(ue.isInstancedBufferAttribute){for(let ne=0;ne<ae.locationSize;ne++)m(ae.location+ne,ue.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ne=0;ne<ae.locationSize;ne++)g(ae.location+ne);n.bindBuffer(n.ARRAY_BUFFER,De);for(let ne=0;ne<ae.locationSize;ne++)S(ae.location+ne,Y/ae.locationSize,Pe,q,Y*X,Y/ae.locationSize*ne*X,se)}}else if(W!==void 0){const q=W[ie];if(q!==void 0)switch(q.length){case 2:n.vertexAttrib2fv(ae.location,q);break;case 3:n.vertexAttrib3fv(ae.location,q);break;case 4:n.vertexAttrib4fv(ae.location,q);break;default:n.vertexAttrib1fv(ae.location,q)}}}}b()}function R(){A();for(const P in i){const O=i[P];for(const Z in O){const j=O[Z];for(const z in j){const Q=j[z];for(const W in Q)u(Q[W].object),delete Q[W];delete j[z]}}delete i[P]}}function E(P){if(i[P.id]===void 0)return;const O=i[P.id];for(const Z in O){const j=O[Z];for(const z in j){const Q=j[z];for(const W in Q)u(Q[W].object),delete Q[W];delete j[z]}}delete i[P.id]}function C(P){for(const O in i){const Z=i[O];for(const j in Z){const z=Z[j];if(z[P.id]===void 0)continue;const Q=z[P.id];for(const W in Q)u(Q[W].object),delete Q[W];delete z[P.id]}}}function x(P){for(const O in i){const Z=i[O],j=P.isInstancedMesh===!0?P.id:0,z=Z[j];if(z!==void 0){for(const Q in z){const W=z[Q];for(const ie in W)u(W[ie].object),delete W[ie];delete z[Q]}delete Z[j],Object.keys(Z).length===0&&delete i[O]}}}function A(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:A,resetDefaultState:D,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:b}}function qm(n,e,t){let i;function r(o){i=o}function s(o,c){n.drawArrays(i,o,c),t.update(c,i,1)}function a(o,c,u){u!==0&&(n.drawArraysInstanced(i,o,c,u),t.update(c,i,u))}function l(o,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,o,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=l}function Ym(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==Mn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(C){const x=C===Kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==tn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==bn&&!x)}function o(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=o(c);u!==c&&(Fe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:y,maxSamples:R,samples:E}}function Zm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Ri,l=new ke,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const b=s?0:i,S=b*4;let y=m.clippingState||null;o.value=y,y=u(p,f,S,h);for(let R=0;R!==S;++R)y[R]=t[R];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){o.value!==t&&(o.value=t,o.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=o.value,p!==!0||g===null){const m=h+v*4,b=f.matrixWorldInverse;l.getNormalMatrix(b),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,y=h;S!==v;++S,y+=4)a.copy(d[S]).applyMatrix4(b,l),a.normal.toArray(g,y),g[y+3]=a.constant}o.value=g,o.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const gi=4,Vc=[.125,.215,.35,.446,.526,.582],Pi=20,Km=256,Hr=new va,Wc=new Je;let Qa=null,ja=0,eo=0,to=!1;const Jm=new F;class Xc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:l=Jm}=s;Qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o,l),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qa,ja,eo),this._renderer.xr.enabled=to,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Kn,format:Mn,colorSpace:oa,depthBuffer:!1},r=$c(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Qm(s)),this._blurMaterial=eg(s,e,t),this._ggxMaterial=jm(s,e,t)}return r}_compileMaterial(e){const t=new _t(new rn,e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,i,r,s){const o=new vn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Wc),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _t(new Mi,new Wi({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,m=!0):(g.color.copy(Wc),m=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(o.up.set(0,c[S],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x+u[S],s.y,s.z)):y===1?(o.up.set(0,0,c[S]),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y+u[S],s.z)):(o.up.set(0,c[S],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y,s.z+u[S]));const R=this._cubeSize;ur(r,y*R,S>2?R:0,R,R),d.setRenderTarget(r),m&&d.render(v,o),d.render(e,o)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Bi||e.mapping===Sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const l=s.uniforms;l.envMap.value=e;const o=this._cubeSize;ur(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(a,Hr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[i];l.material=a;const o=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,h=d*f,{_lodMax:p}=this,v=this._sizeLods[i],g=3*v*(i>p-gi?i-p+gi:0),m=4*(this._cubeSize-v);o.envMap.value=e.texture,o.roughness.value=h,o.mipInt.value=p-t,ur(s,g,m,3*v,2*v),r.setRenderTarget(s),r.render(l,Hr),o.envMap.value=s.texture,o.roughness.value=0,o.mipInt.value=p-i,ur(e,g,m,3*v,2*v),r.setRenderTarget(e),r.render(l,Hr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,l){const o=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&je("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,h=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Pi-1),v=s/p,g=isFinite(s)?1+Math.floor(u*v):Pi;g>Pi&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Pi}`);const m=[];let b=0;for(let C=0;C<Pi;++C){const x=C/v,A=Math.exp(-x*x/2);m.push(A),C===0?b+=A:C<g&&(b+=2*A)}for(let C=0;C<m.length;C++)m[C]=m[C]/b;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=a==="latitudinal",l&&(f.poleAxis.value=l);const{_lodMax:S}=this;f.dTheta.value=p,f.mipInt.value=S-i;const y=this._sizeLods[r],R=3*y*(r>S-gi?r-S+gi:0),E=4*(this._cubeSize-y);ur(t,R,E,3*y,2*y),o.setRenderTarget(t),o.render(d,Hr)}}function Qm(n){const e=[],t=[],i=[];let r=n;const s=n-gi+1+Vc.length;for(let a=0;a<s;a++){const l=Math.pow(2,r);e.push(l);let o=1/l;a>n-gi?o=Vc[a-n+gi-1]:a===0&&(o=0),t.push(o);const c=1/(l-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,p=6,v=3,g=2,m=1,b=new Float32Array(v*p*h),S=new Float32Array(g*p*h),y=new Float32Array(m*p*h);for(let E=0;E<h;E++){const C=E%3*2/3-1,x=E>2?0:-1,A=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];b.set(A,v*p*E),S.set(f,g*p*E);const D=[E,E,E,E,E,E];y.set(D,m*p*E)}const R=new rn;R.setAttribute("position",new fn(b,v)),R.setAttribute("uv",new fn(S,g)),R.setAttribute("faceIndex",new fn(y,m)),i.push(new _t(R,null)),r>gi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function $c(n,e,t){const i=new Nn(n,e,t);return i.texture.mapping=pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ur(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jm(n,e,t){return new On({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Km,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function eg(n,e,t){const i=new Float32Array(Pi),r=new F(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function qc(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Yc(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function _a(){return`

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
	`}class md extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new od(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mi(5,5,5),s=new On({name:"CubemapFromEquirect",uniforms:Tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:Yn});s.uniforms.tEquirect.value=t;const a=new _t(r,s),l=t.minFilter;return t.minFilter===mi&&(t.minFilter=Ot),new sp(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function tg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?a(f):s(f)}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===Ta||h===Aa)if(e.has(f)){const p=e.get(f).texture;return l(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const v=new md(p.height);return v.fromEquirectangularTexture(n,f),e.set(f,v),f.addEventListener("dispose",c),l(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const h=f.mapping,p=h===Ta||h===Aa,v=h===Bi||h===Sr;if(p||v){let g=t.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Xc(n)),g=p?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const b=f.image;return p&&b&&b.height>0||v&&b&&o(b)?(i===null&&(i=new Xc(n)),g=p?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function l(f,h){return h===Ta?f.mapping=Bi:h===Aa&&(f.mapping=Sr),f}function o(f){let h=0;const p=6;for(let v=0;v<p;v++)f[v]!==void 0&&h++;return h===p}function c(f){const h=f.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function ng(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&br("WebGLRenderer: "+i+" extension not supported."),r}}}function ig(n,e,t,i){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete r[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function l(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function o(d){const f=d.attributes;for(const h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,p=d.attributes.position;let v=0;if(p===void 0)return;if(h!==null){const b=h.array;v=h.version;for(let S=0,y=b.length;S<y;S+=3){const R=b[S+0],E=b[S+1],C=b[S+2];f.push(R,E,E,C,C,R)}}else{const b=p.array;v=p.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const R=S+0,E=S+1,C=S+2;f.push(R,E,E,C,C,R)}}const g=new(p.count>=65535?sd:rd)(f,1);g.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:l,update:o,getWireframeAttribute:u}}function rg(n,e,t){let i;function r(d){i=d}let s,a;function l(d){s=d.type,a=d.bytesPerElement}function o(d,f){n.drawElements(i,f,s,d*a),t.update(f,i,1)}function c(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*a,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let v=0;for(let g=0;g<h;g++)v+=f[g];t.update(v,i,1)}this.setMode=r,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=u}function sg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,l){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=l*(s/3);break;case n.LINES:t.lines+=l*(s/2);break;case n.LINE_STRIP:t.lines+=l*(s-1);break;case n.LINE_LOOP:t.lines+=l*s;break;case n.POINTS:t.points+=l*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ag(n,e,t){const i=new WeakMap,r=new xt;function s(a,l,o){const c=a.morphTargetInfluences,u=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(l);if(f===void 0||f.count!==d){let D=function(){x.dispose(),i.delete(l),l.removeEventListener("dispose",D)};var h=D;f!==void 0&&f.texture.dispose();const p=l.morphAttributes.position!==void 0,v=l.morphAttributes.normal!==void 0,g=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],b=l.morphAttributes.normal||[],S=l.morphAttributes.color||[];let y=0;p===!0&&(y=1),v===!0&&(y=2),g===!0&&(y=3);let R=l.attributes.position.count*y,E=1;R>e.maxTextureSize&&(E=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*E*4*d),x=new nd(C,R,E,d);x.type=bn,x.needsUpdate=!0;const A=y*4;for(let P=0;P<d;P++){const O=m[P],Z=b[P],j=S[P],z=R*E*4*P;for(let Q=0;Q<O.count;Q++){const W=Q*A;p===!0&&(r.fromBufferAttribute(O,Q),C[z+W+0]=r.x,C[z+W+1]=r.y,C[z+W+2]=r.z,C[z+W+3]=0),v===!0&&(r.fromBufferAttribute(Z,Q),C[z+W+4]=r.x,C[z+W+5]=r.y,C[z+W+6]=r.z,C[z+W+7]=0),g===!0&&(r.fromBufferAttribute(j,Q),C[z+W+8]=r.x,C[z+W+9]=r.y,C[z+W+10]=r.z,C[z+W+11]=j.itemSize===4?r.w:1)}}f={count:d,texture:x,size:new Oe(R,E)},i.set(l,f),l.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=l.morphTargetsRelative?1:1-p;o.getUniforms().setValue(n,"morphTargetBaseInfluence",v),o.getUniforms().setValue(n,"morphTargetInfluences",c)}o.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function og(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function l(){s=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:l}}const lg={[Hu]:"LINEAR_TONE_MAPPING",[Vu]:"REINHARD_TONE_MAPPING",[Wu]:"CINEON_TONE_MAPPING",[yl]:"ACES_FILMIC_TONE_MAPPING",[$u]:"AGX_TONE_MAPPING",[qu]:"NEUTRAL_TONE_MAPPING",[Xu]:"CUSTOM_TONE_MAPPING"};function cg(n,e,t,i,r,s){const a=new Nn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new wr(e,t):void 0}),l=new Nn(e,t,{type:Kn,depthBuffer:!1,stencilBuffer:!1}),o=new rn;o.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ut([0,2,0,0,2,0],2));const c=new Qh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new _t(o,c),d=new va(-1,1,1,-1,0,1);let f=null,h=null,p=!1,v,g=null,m=[],b=!1;this.setSize=function(S,y){a.setSize(S,y),l.setSize(S,y);for(let R=0;R<m.length;R++){const E=m[R];E.setSize&&E.setSize(S,y)}},this.setEffects=function(S){m=S,b=m.length>0&&m[0].isRenderPass===!0;const y=a.width,R=a.height;for(let E=0;E<m.length;E++){const C=m[E];C.setSize&&C.setSize(y,R)}},this.begin=function(S,y){if(p||S.toneMapping===Un&&m.length===0)return!1;if(g=y,y!==null){const R=y.width,E=y.height;(a.width!==R||a.height!==E)&&this.setSize(R,E)}return b===!1&&S.setRenderTarget(a),v=S.toneMapping,S.toneMapping=Un,!0},this.hasRenderPass=function(){return b},this.end=function(S,y){S.toneMapping=v,p=!0;let R=a,E=l;for(let C=0;C<m.length;C++){const x=m[C];if(x.enabled!==!1&&(x.render(S,E,R,y),x.needsSwap!==!1)){const A=R;R=E,E=A}}if(f!==S.outputColorSpace||h!==S.toneMapping){f=S.outputColorSpace,h=S.toneMapping,c.defines={},Ke.getTransfer(f)===ut&&(c.defines.SRGB_TRANSFER="");const C=lg[h];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,S.setRenderTarget(g),S.render(u,d),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),l.dispose(),o.dispose(),c.dispose()}}const gd=new $t,al=new wr(1,1),vd=new nd,_d=new Ch,xd=new od,Zc=[],Kc=[],Jc=new Float32Array(16),Qc=new Float32Array(9),jc=new Float32Array(4);function Dr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Zc[r];if(s===void 0&&(s=new Float32Array(r),Zc[r]=s),e!==0){i.toArray(s,0);for(let a=1,l=0;a!==e;++a)l+=t,n[a].toArray(s,l)}return s}function Pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function xa(n,e){let t=Kc[e];t===void 0&&(t=new Int32Array(e),Kc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ug(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function pg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,i))return;jc.set(i),n.uniformMatrix2fv(this.addr,!1,jc),It(t,i)}}function mg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,i))return;Qc.set(i),n.uniformMatrix3fv(this.addr,!1,Qc),It(t,i)}}function gg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,i))return;Jc.set(i),n.uniformMatrix4fv(this.addr,!1,Jc),It(t,i)}}function vg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function _g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Mg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function Eg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function wg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(al.compareFunction=t.isReversedDepthBuffer()?Il:Pl,s=al):s=gd,t.setTexture2D(e||s,r)}function Tg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||_d,r)}function Ag(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||xd,r)}function Rg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||vd,r)}function Cg(n){switch(n){case 5126:return ug;case 35664:return dg;case 35665:return fg;case 35666:return hg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return vg;case 35667:case 35671:return _g;case 35668:case 35672:return xg;case 35669:case 35673:return bg;case 5125:return Mg;case 36294:return yg;case 36295:return Sg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Rg}}function Pg(n,e){n.uniform1fv(this.addr,e)}function Ig(n,e){const t=Dr(e,this.size,2);n.uniform2fv(this.addr,t)}function Lg(n,e){const t=Dr(e,this.size,3);n.uniform3fv(this.addr,t)}function Dg(n,e){const t=Dr(e,this.size,4);n.uniform4fv(this.addr,t)}function Ug(n,e){const t=Dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Ng(n,e){const t=Dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Fg(n,e){const t=Dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Og(n,e){n.uniform1iv(this.addr,e)}function kg(n,e){n.uniform2iv(this.addr,e)}function Bg(n,e){n.uniform3iv(this.addr,e)}function zg(n,e){n.uniform4iv(this.addr,e)}function Gg(n,e){n.uniform1uiv(this.addr,e)}function Hg(n,e){n.uniform2uiv(this.addr,e)}function Vg(n,e){n.uniform3uiv(this.addr,e)}function Wg(n,e){n.uniform4uiv(this.addr,e)}function Xg(n,e,t){const i=this.cache,r=e.length,s=xa(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=al:a=gd;for(let l=0;l!==r;++l)t.setTexture2D(e[l]||a,s[l])}function $g(n,e,t){const i=this.cache,r=e.length,s=xa(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||_d,s[a])}function qg(n,e,t){const i=this.cache,r=e.length,s=xa(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||xd,s[a])}function Yg(n,e,t){const i=this.cache,r=e.length,s=xa(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||vd,s[a])}function Zg(n){switch(n){case 5126:return Pg;case 35664:return Ig;case 35665:return Lg;case 35666:return Dg;case 35674:return Ug;case 35675:return Ng;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return kg;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return Gg;case 36294:return Hg;case 36295:return Vg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Xg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}class Kg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Cg(t.type)}}class Jg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zg(t.type)}}class Qg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const l=r[s];l.setValue(e,t[l.id],i)}}}const no=/(\w+)(\])?(\[|\.)?/g;function eu(n,e){n.seq.push(e),n.map[e.id]=e}function jg(n,e,t){const i=n.name,r=i.length;for(no.lastIndex=0;;){const s=no.exec(i),a=no.lastIndex;let l=s[1];const o=s[2]==="]",c=s[3];if(o&&(l=l|0),c===void 0||c==="["&&a+2===r){eu(t,c===void 0?new Kg(l,n,e):new Jg(l,n,e));break}else{let d=t.map[l];d===void 0&&(d=new Qg(l),eu(t,d)),t=d}}}class ta{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const l=e.getActiveUniform(t,a),o=e.getUniformLocation(t,l.name);jg(l,o,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const l=t[s],o=i[l.id];o.needsUpdate!==!1&&l.setValue(e,o.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function tu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ev=37297;let tv=0;function nv(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const l=a+1;i.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return i.join(`
`)}const nu=new ke;function iv(n){Ke._getMatrix(nu,Ke.workingColorSpace,n);const e=`mat3( ${nu.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case la:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function iu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+nv(n.getShaderSource(e),l)}else return s}function rv(n,e){const t=iv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const sv={[Hu]:"Linear",[Vu]:"Reinhard",[Wu]:"Cineon",[yl]:"ACESFilmic",[$u]:"AgX",[qu]:"Neutral",[Xu]:"Custom"};function av(n,e){const t=sv[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qs=new F;function ov(){Ke.getLuminanceCoefficients(qs);const n=qs.x.toFixed(4),e=qs.y.toFixed(4),t=qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function cv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function uv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let l=1;s.type===n.FLOAT_MAT2&&(l=2),s.type===n.FLOAT_MAT3&&(l=3),s.type===n.FLOAT_MAT4&&(l=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:l}}return t}function qr(n){return n!==""}function ru(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function su(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(n){return n.replace(dv,hv)}const fv=new Map;function hv(n,e){let t=Ve[e];if(t===void 0){const i=fv.get(e);if(i!==void 0)t=Ve[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ol(t)}const pv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function au(n){return n.replace(pv,mv)}function mv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ou(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const gv={[Ks]:"SHADOWMAP_TYPE_PCF",[$r]:"SHADOWMAP_TYPE_VSM"};function vv(n){return gv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const _v={[Bi]:"ENVMAP_TYPE_CUBE",[Sr]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE_UV"};function xv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":_v[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const bv={[Sr]:"ENVMAP_MODE_REFRACTION"};function Mv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":bv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const yv={[Gu]:"ENVMAP_BLENDING_MULTIPLY",[$f]:"ENVMAP_BLENDING_MIX",[qf]:"ENVMAP_BLENDING_ADD"};function Sv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":yv[n.combine]||"ENVMAP_BLENDING_NONE"}function Ev(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function wv(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,l=t.fragmentShader;const o=vv(t),c=xv(t),u=Mv(t),d=Sv(t),f=Ev(t),h=lv(t),p=cv(s),v=r.createProgram();let g,m,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(qr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(qr).join(`
`),m.length>0&&(m+=`
`)):(g=[ou(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),m=[ou(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Un?av("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,rv("linearToOutputTexel",t.outputColorSpace),ov(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),a=ol(a),a=ru(a,t),a=su(a,t),l=ol(l),l=ru(l,t),l=su(l,t),a=au(a),l=au(l),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=b+g+a,y=b+m+l,R=tu(r,r.VERTEX_SHADER,S),E=tu(r,r.FRAGMENT_SHADER,y);r.attachShader(v,R),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(P){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(v)||"",Z=r.getShaderInfoLog(R)||"",j=r.getShaderInfoLog(E)||"",z=O.trim(),Q=Z.trim(),W=j.trim();let ie=!0,ae=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,R,E);else{const ue=iu(r,R,"vertex"),q=iu(r,E,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+ue+`
`+q)}else z!==""?Fe("WebGLProgram: Program Info Log:",z):(Q===""||W==="")&&(ae=!1);ae&&(P.diagnostics={runnable:ie,programLog:z,vertexShader:{log:Q,prefix:g},fragmentShader:{log:W,prefix:m}})}r.deleteShader(R),r.deleteShader(E),x=new ta(r,v),A=uv(r,v)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(v,ev)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=E,this}let Tv=0;class Av{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Rv(e),t.set(e,i)),i}}class Rv{constructor(e){this.id=Tv++,this.code=e,this.usedTimes=0}}function Cv(n){return n===zi||n===sa||n===aa}function Pv(n,e,t,i,r,s){const a=new Ul,l=new Av,o=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return o.add(x),x===0?"uv":`uv${x}`}function v(x,A,D,P,O,Z){const j=P.fog,z=O.geometry,Q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ie=e.get(x.envMap||Q,W),ae=ie&&ie.mapping===pa?ie.image.height:null,ue=h[x.type];x.precision!==null&&(f=i.getMaxPrecision(x.precision),f!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const q=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Y=q!==void 0?q.length:0;let Se=0;z.morphAttributes.position!==void 0&&(Se=1),z.morphAttributes.normal!==void 0&&(Se=2),z.morphAttributes.color!==void 0&&(Se=3);let De,Pe,X,se;if(ue){const Ee=In[ue];De=Ee.vertexShader,Pe=Ee.fragmentShader}else{De=x.vertexShader,Pe=x.fragmentShader;const Ee=l.getVertexShaderStage(x),Mt=l.getFragmentShaderStage(x);l.update(x,Ee,Mt),X=Ee.id,se=Mt.id}const ne=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),Be=O.isInstancedMesh===!0,Ue=O.isBatchedMesh===!0,St=!!x.map,Ze=!!x.matcap,ht=!!ie,at=!!x.aoMap,tt=!!x.lightMap,Tt=!!x.bumpMap&&x.wireframe===!1,Ct=!!x.normalMap,Lt=!!x.displacementMap,Nt=!!x.emissiveMap,bt=!!x.metalnessMap,At=!!x.roughnessMap,U=x.anisotropy>0,qt=x.clearcoat>0,lt=x.dispersion>0,w=x.iridescence>0,_=x.sheen>0,k=x.transmission>0,V=U&&!!x.anisotropyMap,K=qt&&!!x.clearcoatMap,oe=qt&&!!x.clearcoatNormalMap,ce=qt&&!!x.clearcoatRoughnessMap,J=w&&!!x.iridescenceMap,te=w&&!!x.iridescenceThicknessMap,de=_&&!!x.sheenColorMap,Ae=_&&!!x.sheenRoughnessMap,me=!!x.specularMap,fe=!!x.specularColorMap,Ie=!!x.specularIntensityMap,Ne=k&&!!x.transmissionMap,ze=k&&!!x.thicknessMap,L=!!x.gradientMap,le=!!x.alphaMap,ee=x.alphaTest>0,he=!!x.alphaHash,xe=!!x.extensions;let re=Un;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(re=n.toneMapping);const Te={shaderID:ue,shaderType:x.type,shaderName:x.name,vertexShader:De,fragmentShader:Pe,defines:x.defines,customVertexShaderID:X,customFragmentShaderID:se,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Ue,batchingColor:Ue&&O._colorsTexture!==null,instancing:Be,instancingColor:Be&&O.instanceColor!==null,instancingMorph:Be&&O.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:St,matcap:Ze,envMap:ht,envMapMode:ht&&ie.mapping,envMapCubeUVHeight:ae,aoMap:at,lightMap:tt,bumpMap:Tt,normalMap:Ct,displacementMap:Lt,emissiveMap:Nt,normalMapObjectSpace:Ct&&x.normalMapType===Kf,normalMapTangentSpace:Ct&&x.normalMapType===rl,packedNormalMap:Ct&&x.normalMapType===rl&&Cv(x.normalMap.format),metalnessMap:bt,roughnessMap:At,anisotropy:U,anisotropyMap:V,clearcoat:qt,clearcoatMap:K,clearcoatNormalMap:oe,clearcoatRoughnessMap:ce,dispersion:lt,iridescence:w,iridescenceMap:J,iridescenceThicknessMap:te,sheen:_,sheenColorMap:de,sheenRoughnessMap:Ae,specularMap:me,specularColorMap:fe,specularIntensityMap:Ie,transmission:k,transmissionMap:Ne,thicknessMap:ze,gradientMap:L,opaque:x.transparent===!1&&x.blending===xr&&x.alphaToCoverage===!1,alphaMap:le,alphaTest:ee,alphaHash:he,combine:x.combine,mapUv:St&&p(x.map.channel),aoMapUv:at&&p(x.aoMap.channel),lightMapUv:tt&&p(x.lightMap.channel),bumpMapUv:Tt&&p(x.bumpMap.channel),normalMapUv:Ct&&p(x.normalMap.channel),displacementMapUv:Lt&&p(x.displacementMap.channel),emissiveMapUv:Nt&&p(x.emissiveMap.channel),metalnessMapUv:bt&&p(x.metalnessMap.channel),roughnessMapUv:At&&p(x.roughnessMap.channel),anisotropyMapUv:V&&p(x.anisotropyMap.channel),clearcoatMapUv:K&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:oe&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:de&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&p(x.sheenRoughnessMap.channel),specularMapUv:me&&p(x.specularMap.channel),specularColorMapUv:fe&&p(x.specularColorMap.channel),specularIntensityMapUv:Ie&&p(x.specularIntensityMap.channel),transmissionMapUv:Ne&&p(x.transmissionMap.channel),thicknessMapUv:ze&&p(x.thicknessMap.channel),alphaMapUv:le&&p(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ct||U),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!z.attributes.uv&&(St||le),fog:!!j,useFog:x.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&Ct===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:Se,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:St&&x.map.isVideoTexture===!0&&Ke.getTransfer(x.map.colorSpace)===ut,decodeVideoTextureEmissive:Nt&&x.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(x.emissiveMap.colorSpace)===ut,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Xn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&x.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Te.vertexUv1s=o.has(1),Te.vertexUv2s=o.has(2),Te.vertexUv3s=o.has(3),o.clear(),Te}function g(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)A.push(D),A.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(m(A,x),b(A,x),A.push(n.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function m(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function b(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){const A=h[x.type];let D;if(A){const P=In[A];D=Zh.clone(P.uniforms)}else D=x.uniforms;return D}function y(x,A){let D=u.get(A);return D!==void 0?++D.usedTimes:(D=new wv(n,A,x,r),c.push(D),u.set(A,D)),D}function R(x){if(--x.usedTimes===0){const A=c.indexOf(x);c[A]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function E(x){l.remove(x)}function C(){l.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:S,acquireProgram:y,releaseProgram:R,releaseShaderCache:E,programs:c,dispose:C}}function Iv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function i(a){n.delete(a)}function r(a,l,o){n.get(a)[l]=o}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Lv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function lu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function cu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function l(f,h,p,v,g,m){let b=n[e];return b===void 0?(b={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:g,group:m},n[e]=b):(b.id=f.id,b.object=f,b.geometry=h,b.material=p,b.materialVariant=a(f),b.groupOrder=v,b.renderOrder=f.renderOrder,b.z=g,b.group=m),e++,b}function o(f,h,p,v,g,m){const b=l(f,h,p,v,g,m);p.transmission>0?i.push(b):p.transparent===!0?r.push(b):t.push(b)}function c(f,h,p,v,g,m){const b=l(f,h,p,v,g,m);p.transmission>0?i.unshift(b):p.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,h,p){t.length>1&&t.sort(f||Lv),i.length>1&&i.sort(h||lu),r.length>1&&r.sort(h||lu),p&&(t.reverse(),i.reverse(),r.reverse())}function d(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:d,sort:u}}function Dv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new cu,n.set(i,[a])):r>=s.length?(a=new cu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Uv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Je};break;case"SpotLight":t={position:new F,direction:new F,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function Nv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Fv=0;function Ov(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function kv(n){const e=new Uv,t=Nv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new dt,a=new dt;function l(c){let u=0,d=0,f=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let h=0,p=0,v=0,g=0,m=0,b=0,S=0,y=0,R=0,E=0,C=0;c.sort(Ov);for(let A=0,D=c.length;A<D;A++){const P=c[A],O=P.color,Z=P.intensity,j=P.distance;let z=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===zi?z=P.shadow.map.texture:z=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=O.r*Z,d+=O.g*Z,f+=O.b*Z;else if(P.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(P.sh.coefficients[Q],Z);C++}else if(P.isDirectionalLight){const Q=e.get(P);if(Q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const W=P.shadow,ie=t.get(P);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,i.directionalShadow[h]=ie,i.directionalShadowMap[h]=z,i.directionalShadowMatrix[h]=P.shadow.matrix,b++}i.directional[h]=Q,h++}else if(P.isSpotLight){const Q=e.get(P);Q.position.setFromMatrixPosition(P.matrixWorld),Q.color.copy(O).multiplyScalar(Z),Q.distance=j,Q.coneCos=Math.cos(P.angle),Q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Q.decay=P.decay,i.spot[v]=Q;const W=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,W.updateMatrices(P),P.castShadow&&E++),i.spotLightMatrix[v]=W.matrix,P.castShadow){const ie=t.get(P);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,i.spotShadow[v]=ie,i.spotShadowMap[v]=z,y++}v++}else if(P.isRectAreaLight){const Q=e.get(P);Q.color.copy(O).multiplyScalar(Z),Q.halfWidth.set(P.width*.5,0,0),Q.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=Q,g++}else if(P.isPointLight){const Q=e.get(P);if(Q.color.copy(P.color).multiplyScalar(P.intensity),Q.distance=P.distance,Q.decay=P.decay,P.castShadow){const W=P.shadow,ie=t.get(P);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,ie.shadowCameraNear=W.camera.near,ie.shadowCameraFar=W.camera.far,i.pointShadow[p]=ie,i.pointShadowMap[p]=z,i.pointShadowMatrix[p]=P.shadow.matrix,S++}i.point[p]=Q,p++}else if(P.isHemisphereLight){const Q=e.get(P);Q.skyColor.copy(P.color).multiplyScalar(Z),Q.groundColor.copy(P.groundColor).multiplyScalar(Z),i.hemi[m]=Q,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const x=i.hash;(x.directionalLength!==h||x.pointLength!==p||x.spotLength!==v||x.rectAreaLength!==g||x.hemiLength!==m||x.numDirectionalShadows!==b||x.numPointShadows!==S||x.numSpotShadows!==y||x.numSpotMaps!==R||x.numLightProbes!==C)&&(i.directional.length=h,i.spot.length=v,i.rectArea.length=g,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=y+R-E,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,x.directionalLength=h,x.pointLength=p,x.spotLength=v,x.rectAreaLength=g,x.hemiLength=m,x.numDirectionalShadows=b,x.numPointShadows=S,x.numSpotShadows=y,x.numSpotMaps=R,x.numLightProbes=C,i.version=Fv++)}function o(c,u){let d=0,f=0,h=0,p=0,v=0;const g=u.matrixWorldInverse;for(let m=0,b=c.length;m<b;m++){const S=c[m];if(S.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),d++}else if(S.isSpotLight){const y=i.spot[h];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),h++}else if(S.isRectAreaLight){const y=i.rectArea[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(S.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:l,setupView:o,state:i}}function uu(n){const e=new kv(n),t=[],i=[],r=[];function s(f){d.camera=f,t.length=0,i.length=0,r.length=0}function a(f){t.push(f)}function l(f){i.push(f)}function o(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:l,pushLightProbeGrid:o}}function Bv(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let l;return a===void 0?(l=new uu(n),e.set(r,[l])):s>=a.length?(l=new uu(n),a.push(l)):l=a[s],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const zv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gv=`uniform sampler2D shadow_pass;
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
}`,Hv=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Vv=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],du=new dt,Vr=new F,io=new F;function Wv(n,e,t){let i=new Nl;const r=new Oe,s=new Oe,a=new xt,l=new jh,o=new ep,c={},u=t.maxTextureSize,d={[_i]:Kt,[Kt]:_i,[Xn]:Xn},f=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:zv,fragmentShader:Gv}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const p=new rn;p.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _t(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ks;let m=this.type;this.render=function(E,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===zu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ks);const A=n.getRenderTarget(),D=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Yn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const Z=m!==this.type;Z&&C.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(z=>z.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,z=E.length;j<z;j++){const Q=E[j],W=Q.shadow;if(W===void 0){Fe("WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const ie=W.getFrameExtents();r.multiply(ie),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,W.mapSize.y=s.y));const ae=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=ae,W.map===null||Z===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===$r){if(Q.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Nn(r.x,r.y,{format:zi,type:Kn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),W.map.texture.name=Q.name+".shadowMap",W.map.depthTexture=new wr(r.x,r.y,bn),W.map.depthTexture.name=Q.name+".shadowMapDepth",W.map.depthTexture.format=Jn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ft,W.map.depthTexture.magFilter=Ft}else Q.isPointLight?(W.map=new md(r.x),W.map.depthTexture=new qh(r.x,Fn)):(W.map=new Nn(r.x,r.y),W.map.depthTexture=new wr(r.x,r.y,Fn)),W.map.depthTexture.name=Q.name+".shadowMap",W.map.depthTexture.format=Jn,this.type===Ks?(W.map.depthTexture.compareFunction=ae?Il:Pl,W.map.depthTexture.minFilter=Ot,W.map.depthTexture.magFilter=Ot):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ft,W.map.depthTexture.magFilter=Ft);W.camera.updateProjectionMatrix()}const ue=W.map.isWebGLCubeRenderTarget?6:1;for(let q=0;q<ue;q++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,q),n.clear();else{q===0&&(n.setRenderTarget(W.map),n.clear());const Y=W.getViewport(q);a.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),O.viewport(a)}if(Q.isPointLight){const Y=W.camera,Se=W.matrix,De=Q.distance||Y.far;De!==Y.far&&(Y.far=De,Y.updateProjectionMatrix()),Vr.setFromMatrixPosition(Q.matrixWorld),Y.position.copy(Vr),io.copy(Y.position),io.add(Hv[q]),Y.up.copy(Vv[q]),Y.lookAt(io),Y.updateMatrixWorld(),Se.makeTranslation(-Vr.x,-Vr.y,-Vr.z),du.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),W._frustum.setFromProjectionMatrix(du,Y.coordinateSystem,Y.reversedDepth)}else W.updateMatrices(Q);i=W.getFrustum(),y(C,x,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===$r&&b(W,x),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(A,D,P)};function b(E,C){const x=e.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Nn(r.x,r.y,{format:zi,type:Kn})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,x,f,v,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,x,h,v,null)}function S(E,C,x,A){let D=null;const P=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)D=P;else if(D=x.isPointLight===!0?o:l,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=D.uuid,Z=C.uuid;let j=c[O];j===void 0&&(j={},c[O]=j);let z=j[Z];z===void 0&&(z=D.clone(),j[Z]=z,C.addEventListener("dispose",R)),D=z}if(D.visible=C.visible,D.wireframe=C.wireframe,A===$r?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:d[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const O=n.properties.get(D);O.light=x}return D}function y(E,C,x,A,D){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===$r)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const Z=e.update(E),j=E.material;if(Array.isArray(j)){const z=Z.groups;for(let Q=0,W=z.length;Q<W;Q++){const ie=z[Q],ae=j[ie.materialIndex];if(ae&&ae.visible){const ue=S(E,ae,A,D);E.onBeforeShadow(n,E,C,x,Z,ue,ie),n.renderBufferDirect(x,null,Z,ue,E,ie),E.onAfterShadow(n,E,C,x,Z,ue,ie)}}}else if(j.visible){const z=S(E,j,A,D);E.onBeforeShadow(n,E,C,x,Z,z,null),n.renderBufferDirect(x,null,Z,z,E,null),E.onAfterShadow(n,E,C,x,Z,z,null)}}const O=E.children;for(let Z=0,j=O.length;Z<j;Z++)y(O[Z],C,x,A,D)}function R(E){E.target.removeEventListener("dispose",R);for(const x in c){const A=c[x],D=E.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function Xv(n,e){function t(){let L=!1;const le=new xt;let ee=null;const he=new xt(0,0,0,0);return{setMask:function(xe){ee!==xe&&!L&&(n.colorMask(xe,xe,xe,xe),ee=xe)},setLocked:function(xe){L=xe},setClear:function(xe,re,Te,Ee,Mt){Mt===!0&&(xe*=Ee,re*=Ee,Te*=Ee),le.set(xe,re,Te,Ee),he.equals(le)===!1&&(n.clearColor(xe,re,Te,Ee),he.copy(le))},reset:function(){L=!1,ee=null,he.set(-1,0,0,0)}}}function i(){let L=!1,le=!1,ee=null,he=null,xe=null;return{setReversed:function(re){if(le!==re){const Te=e.get("EXT_clip_control");re?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),le=re;const Ee=xe;xe=null,this.setClear(Ee)}},getReversed:function(){return le},setTest:function(re){re?ne(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!L&&(n.depthMask(re),ee=re)},setFunc:function(re){if(le&&(re=ah[re]),he!==re){switch(re){case bo:n.depthFunc(n.NEVER);break;case Mo:n.depthFunc(n.ALWAYS);break;case yo:n.depthFunc(n.LESS);break;case yr:n.depthFunc(n.LEQUAL);break;case So:n.depthFunc(n.EQUAL);break;case Eo:n.depthFunc(n.GEQUAL);break;case wo:n.depthFunc(n.GREATER);break;case To:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}he=re}},setLocked:function(re){L=re},setClear:function(re){xe!==re&&(xe=re,le&&(re=1-re),n.clearDepth(re))},reset:function(){L=!1,ee=null,he=null,xe=null,le=!1}}}function r(){let L=!1,le=null,ee=null,he=null,xe=null,re=null,Te=null,Ee=null,Mt=null;return{setTest:function(gt){L||(gt?ne(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(gt){le!==gt&&!L&&(n.stencilMask(gt),le=gt)},setFunc:function(gt,Sn,En){(ee!==gt||he!==Sn||xe!==En)&&(n.stencilFunc(gt,Sn,En),ee=gt,he=Sn,xe=En)},setOp:function(gt,Sn,En){(re!==gt||Te!==Sn||Ee!==En)&&(n.stencilOp(gt,Sn,En),re=gt,Te=Sn,Ee=En)},setLocked:function(gt){L=gt},setClear:function(gt){Mt!==gt&&(n.clearStencil(gt),Mt=gt)},reset:function(){L=!1,le=null,ee=null,he=null,xe=null,re=null,Te=null,Ee=null,Mt=null}}}const s=new t,a=new i,l=new r,o=new WeakMap,c=new WeakMap;let u={},d={},f={},h=new WeakMap,p=[],v=null,g=!1,m=null,b=null,S=null,y=null,R=null,E=null,C=null,x=new Je(0,0,0),A=0,D=!1,P=null,O=null,Z=null,j=null,z=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ie=0;const ae=n.getParameter(n.VERSION);ae.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(ae)[1]),W=ie>=1):ae.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),W=ie>=2);let ue=null,q={};const Y=n.getParameter(n.SCISSOR_BOX),Se=n.getParameter(n.VIEWPORT),De=new xt().fromArray(Y),Pe=new xt().fromArray(Se);function X(L,le,ee,he){const xe=new Uint8Array(4),re=n.createTexture();n.bindTexture(L,re),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<ee;Te++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,he,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(le+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return re}const se={};se[n.TEXTURE_2D]=X(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=X(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=X(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=X(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),l.setClear(0),ne(n.DEPTH_TEST),a.setFunc(yr),Tt(!1),Ct(lc),ne(n.CULL_FACE),at(Yn);function ne(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function pe(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Be(L,le){return f[L]!==le?(n.bindFramebuffer(L,le),f[L]=le,L===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=le),L===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=le),!0):!1}function Ue(L,le){let ee=p,he=!1;if(L){ee=h.get(le),ee===void 0&&(ee=[],h.set(le,ee));const xe=L.textures;if(ee.length!==xe.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Te=xe.length;re<Te;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=xe.length,he=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,he=!0);he&&n.drawBuffers(ee)}function St(L){return v!==L?(n.useProgram(L),v=L,!0):!1}const Ze={[Ci]:n.FUNC_ADD,[Cf]:n.FUNC_SUBTRACT,[Pf]:n.FUNC_REVERSE_SUBTRACT};Ze[If]=n.MIN,Ze[Lf]=n.MAX;const ht={[Df]:n.ZERO,[Uf]:n.ONE,[Nf]:n.SRC_COLOR,[_o]:n.SRC_ALPHA,[Gf]:n.SRC_ALPHA_SATURATE,[Bf]:n.DST_COLOR,[Of]:n.DST_ALPHA,[Ff]:n.ONE_MINUS_SRC_COLOR,[xo]:n.ONE_MINUS_SRC_ALPHA,[zf]:n.ONE_MINUS_DST_COLOR,[kf]:n.ONE_MINUS_DST_ALPHA,[Hf]:n.CONSTANT_COLOR,[Vf]:n.ONE_MINUS_CONSTANT_COLOR,[Wf]:n.CONSTANT_ALPHA,[Xf]:n.ONE_MINUS_CONSTANT_ALPHA};function at(L,le,ee,he,xe,re,Te,Ee,Mt,gt){if(L===Yn){g===!0&&(pe(n.BLEND),g=!1);return}if(g===!1&&(ne(n.BLEND),g=!0),L!==Rf){if(L!==m||gt!==D){if((b!==Ci||R!==Ci)&&(n.blendEquation(n.FUNC_ADD),b=Ci,R=Ci),gt)switch(L){case xr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cc:n.blendFunc(n.ONE,n.ONE);break;case uc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:je("WebGLState: Invalid blending: ",L);break}else switch(L){case xr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case uc:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dc:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",L);break}S=null,y=null,E=null,C=null,x.set(0,0,0),A=0,m=L,D=gt}return}xe=xe||le,re=re||ee,Te=Te||he,(le!==b||xe!==R)&&(n.blendEquationSeparate(Ze[le],Ze[xe]),b=le,R=xe),(ee!==S||he!==y||re!==E||Te!==C)&&(n.blendFuncSeparate(ht[ee],ht[he],ht[re],ht[Te]),S=ee,y=he,E=re,C=Te),(Ee.equals(x)===!1||Mt!==A)&&(n.blendColor(Ee.r,Ee.g,Ee.b,Mt),x.copy(Ee),A=Mt),m=L,D=!1}function tt(L,le){L.side===Xn?pe(n.CULL_FACE):ne(n.CULL_FACE);let ee=L.side===Kt;le&&(ee=!ee),Tt(ee),L.blending===xr&&L.transparent===!1?at(Yn):at(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const he=L.stencilWrite;l.setTest(he),he&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Nt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(L){P!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),P=L)}function Ct(L){L!==Tf?(ne(n.CULL_FACE),L!==O&&(L===lc?n.cullFace(n.BACK):L===Af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),O=L}function Lt(L){L!==Z&&(W&&n.lineWidth(L),Z=L)}function Nt(L,le,ee){L?(ne(n.POLYGON_OFFSET_FILL),(j!==le||z!==ee)&&(j=le,z=ee,a.getReversed()&&(le=-le),n.polygonOffset(le,ee))):pe(n.POLYGON_OFFSET_FILL)}function bt(L){L?ne(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function At(L){L===void 0&&(L=n.TEXTURE0+Q-1),ue!==L&&(n.activeTexture(L),ue=L)}function U(L,le,ee){ee===void 0&&(ue===null?ee=n.TEXTURE0+Q-1:ee=ue);let he=q[ee];he===void 0&&(he={type:void 0,texture:void 0},q[ee]=he),(he.type!==L||he.texture!==le)&&(ue!==ee&&(n.activeTexture(ee),ue=ee),n.bindTexture(L,le||se[L]),he.type=L,he.texture=le)}function qt(){const L=q[ue];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function lt(){try{n.compressedTexImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function k(){try{n.texSubImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function oe(){try{n.texStorage2D(...arguments)}catch(L){je("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){je("WebGLState:",L)}}function J(){try{n.texImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function te(){try{n.texImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function de(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function Ae(L,le){d[L]!==le&&(n.pixelStorei(L,le),d[L]=le)}function me(L){De.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),De.copy(L))}function fe(L){Pe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Pe.copy(L))}function Ie(L,le){let ee=c.get(le);ee===void 0&&(ee=new WeakMap,c.set(le,ee));let he=ee.get(L);he===void 0&&(he=n.getUniformBlockIndex(le,L.name),ee.set(L,he))}function Ne(L,le){const he=c.get(le).get(L);o.get(le)!==he&&(n.uniformBlockBinding(le,he,L.__bindingPointIndex),o.set(le,he))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ue=null,q={},f={},h=new WeakMap,p=[],v=null,g=!1,m=null,b=null,S=null,y=null,R=null,E=null,C=null,x=new Je(0,0,0),A=0,D=!1,P=null,O=null,Z=null,j=null,z=null,De.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),l.reset()}return{buffers:{color:s,depth:a,stencil:l},enable:ne,disable:pe,bindFramebuffer:Be,drawBuffers:Ue,useProgram:St,setBlending:at,setMaterial:tt,setFlipSided:Tt,setCullFace:Ct,setLineWidth:Lt,setPolygonOffset:Nt,setScissorTest:bt,activeTexture:At,bindTexture:U,unbindTexture:qt,compressedTexImage2D:lt,compressedTexImage3D:w,texImage2D:J,texImage3D:te,pixelStorei:Ae,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Ne,texStorage2D:oe,texStorage3D:ce,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:me,viewport:fe,reset:ze}}function $v(n,e,t,i,r,s,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,d=new Set;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,_){return p?new OffscreenCanvas(w,_):ca("canvas")}function g(w,_,k){let V=1;const K=lt(w);if((K.width>k||K.height>k)&&(V=k/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const oe=Math.floor(V*K.width),ce=Math.floor(V*K.height);f===void 0&&(f=v(oe,ce));const J=_?v(oe,ce):f;return J.width=oe,J.height=ce,J.getContext("2d").drawImage(w,0,0,oe,ce),Fe("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+oe+"x"+ce+")."),J}else return"data"in w&&Fe("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),w;return w}function m(w){return w.generateMipmaps}function b(w){n.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(w,_,k,V,K,oe=!1){if(w!==null){if(n[w]!==void 0)return n[w];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ce;V&&(ce=e.get("EXT_texture_norm16"),ce||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=_;if(_===n.RED&&(k===n.FLOAT&&(J=n.R32F),k===n.HALF_FLOAT&&(J=n.R16F),k===n.UNSIGNED_BYTE&&(J=n.R8),k===n.UNSIGNED_SHORT&&ce&&(J=ce.R16_EXT),k===n.SHORT&&ce&&(J=ce.R16_SNORM_EXT)),_===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(J=n.R8UI),k===n.UNSIGNED_SHORT&&(J=n.R16UI),k===n.UNSIGNED_INT&&(J=n.R32UI),k===n.BYTE&&(J=n.R8I),k===n.SHORT&&(J=n.R16I),k===n.INT&&(J=n.R32I)),_===n.RG&&(k===n.FLOAT&&(J=n.RG32F),k===n.HALF_FLOAT&&(J=n.RG16F),k===n.UNSIGNED_BYTE&&(J=n.RG8),k===n.UNSIGNED_SHORT&&ce&&(J=ce.RG16_EXT),k===n.SHORT&&ce&&(J=ce.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(J=n.RG8UI),k===n.UNSIGNED_SHORT&&(J=n.RG16UI),k===n.UNSIGNED_INT&&(J=n.RG32UI),k===n.BYTE&&(J=n.RG8I),k===n.SHORT&&(J=n.RG16I),k===n.INT&&(J=n.RG32I)),_===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(J=n.RGB8UI),k===n.UNSIGNED_SHORT&&(J=n.RGB16UI),k===n.UNSIGNED_INT&&(J=n.RGB32UI),k===n.BYTE&&(J=n.RGB8I),k===n.SHORT&&(J=n.RGB16I),k===n.INT&&(J=n.RGB32I)),_===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),k===n.UNSIGNED_INT&&(J=n.RGBA32UI),k===n.BYTE&&(J=n.RGBA8I),k===n.SHORT&&(J=n.RGBA16I),k===n.INT&&(J=n.RGBA32I)),_===n.RGB&&(k===n.UNSIGNED_SHORT&&ce&&(J=ce.RGB16_EXT),k===n.SHORT&&ce&&(J=ce.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),_===n.RGBA){const te=oe?la:Ke.getTransfer(K);k===n.FLOAT&&(J=n.RGBA32F),k===n.HALF_FLOAT&&(J=n.RGBA16F),k===n.UNSIGNED_BYTE&&(J=te===ut?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ce&&(J=ce.RGBA16_EXT),k===n.SHORT&&ce&&(J=ce.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function R(w,_){let k;return w?_===null||_===Fn||_===os?k=n.DEPTH24_STENCIL8:_===bn?k=n.DEPTH32F_STENCIL8:_===as&&(k=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fn||_===os?k=n.DEPTH_COMPONENT24:_===bn?k=n.DEPTH_COMPONENT32F:_===as&&(k=n.DEPTH_COMPONENT16),k}function E(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ft&&w.minFilter!==Ot?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function C(w){const _=w.target;_.removeEventListener("dispose",C),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(w){const _=w.target;_.removeEventListener("dispose",x),P(_)}function A(w){const _=i.get(w);if(_.__webglInit===void 0)return;const k=w.source,V=h.get(k);if(V){const K=V[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(w),Object.keys(V).length===0&&h.delete(k)}i.remove(w)}function D(w){const _=i.get(w);n.deleteTexture(_.__webglTexture);const k=w.source,V=h.get(k);delete V[_.__cacheKey],a.memory.textures--}function P(w){const _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let K=0;K<_.__webglFramebuffer[V].length;K++)n.deleteFramebuffer(_.__webglFramebuffer[V][K]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=w.textures;for(let V=0,K=k.length;V<K;V++){const oe=i.get(k[V]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(k[V])}i.remove(w)}let O=0;function Z(){O=0}function j(){return O}function z(w){O=w}function Q(){const w=O;return w>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),O+=1,w}function W(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function ie(w,_){const k=i.get(w);if(w.isVideoTexture&&U(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){const V=w.image;if(V===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(k,w,_);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+_)}function ae(w,_){const k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){pe(k,w,_);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+_)}function ue(w,_){const k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){pe(k,w,_);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+_)}function q(w,_){const k=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&k.__version!==w.version){Be(k,w,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+_)}const Y={[ss]:n.REPEAT,[Ln]:n.CLAMP_TO_EDGE,[Ao]:n.MIRRORED_REPEAT},Se={[Ft]:n.NEAREST,[Yf]:n.NEAREST_MIPMAP_NEAREST,[ws]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[Ra]:n.LINEAR_MIPMAP_NEAREST,[mi]:n.LINEAR_MIPMAP_LINEAR},De={[Jf]:n.NEVER,[nh]:n.ALWAYS,[Qf]:n.LESS,[Pl]:n.LEQUAL,[jf]:n.EQUAL,[Il]:n.GEQUAL,[eh]:n.GREATER,[th]:n.NOTEQUAL};function Pe(w,_){if(_.type===bn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ot||_.magFilter===Ra||_.magFilter===ws||_.magFilter===mi||_.minFilter===Ot||_.minFilter===Ra||_.minFilter===ws||_.minFilter===mi)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Y[_.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Y[_.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Y[_.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Se[_.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Se[_.minFilter]),_.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,De[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ft||_.minFilter!==ws&&_.minFilter!==mi||_.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function X(w,_){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",C));const V=_.source;let K=h.get(V);K===void 0&&(K={},h.set(V,K));const oe=W(_);if(oe!==w.__cacheKey){K[oe]===void 0&&(K[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),K[oe].usedTimes++;const ce=K[w.__cacheKey];ce!==void 0&&(K[w.__cacheKey].usedTimes--,ce.usedTimes===0&&D(_)),w.__cacheKey=oe,w.__webglTexture=K[oe].texture}return k}function se(w,_,k){return Math.floor(Math.floor(w/k)/_)}function ne(w,_,k,V){const oe=w.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,k,V,_.data);else{oe.sort((Ae,me)=>Ae.start-me.start);let ce=0;for(let Ae=1;Ae<oe.length;Ae++){const me=oe[ce],fe=oe[Ae],Ie=me.start+me.count,Ne=se(fe.start,_.width,4),ze=se(me.start,_.width,4);fe.start<=Ie+1&&Ne===ze&&se(fe.start+fe.count-1,_.width,4)===Ne?me.count=Math.max(me.count,fe.start+fe.count-me.start):(++ce,oe[ce]=fe)}oe.length=ce+1;const J=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ae=0,me=oe.length;Ae<me;Ae++){const fe=oe[Ae],Ie=Math.floor(fe.start/4),Ne=Math.ceil(fe.count/4),ze=Ie%_.width,L=Math.floor(Ie/_.width),le=Ne,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ze,L,le,ee,k,V,_.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function pe(w,_,k){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const K=X(w,_),oe=_.source;t.bindTexture(V,w.__webglTexture,n.TEXTURE0+k);const ce=i.get(oe);if(oe.version!==ce.__version||K===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ee=Ke.getPrimaries(Ke.workingColorSpace),he=_.colorSpace===hi?null:Ke.getPrimaries(_.colorSpace),xe=_.colorSpace===hi||ee===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let te=g(_.image,!1,r.maxTextureSize);te=qt(_,te);const de=s.convert(_.format,_.colorSpace),Ae=s.convert(_.type);let me=y(_.internalFormat,de,Ae,_.normalized,_.colorSpace,_.isVideoTexture);Pe(V,_);let fe;const Ie=_.mipmaps,Ne=_.isVideoTexture!==!0,ze=ce.__version===void 0||K===!0,L=oe.dataReady,le=E(_,te);if(_.isDepthTexture)me=R(_.format===Li,_.type),ze&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,de,Ae,null));else if(_.isDataTexture)if(Ie.length>0){Ne&&ze&&t.texStorage2D(n.TEXTURE_2D,le,me,Ie[0].width,Ie[0].height);for(let ee=0,he=Ie.length;ee<he;ee++)fe=Ie[ee],Ne?L&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe.width,fe.height,de,Ae,fe.data):t.texImage2D(n.TEXTURE_2D,ee,me,fe.width,fe.height,0,de,Ae,fe.data);_.generateMipmaps=!1}else Ne?(ze&&t.texStorage2D(n.TEXTURE_2D,le,me,te.width,te.height),L&&ne(_,te,de,Ae)):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,de,Ae,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ne&&ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,me,Ie[0].width,Ie[0].height,te.depth);for(let ee=0,he=Ie.length;ee<he;ee++)if(fe=Ie[ee],_.format!==Mn)if(de!==null)if(Ne){if(L)if(_.layerUpdates.size>0){const xe=Hc(fe.width,fe.height,_.format,_.type);for(const re of _.layerUpdates){const Te=fe.data.subarray(re*xe/fe.data.BYTES_PER_ELEMENT,(re+1)*xe/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,fe.width,fe.height,1,de,Te)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,te.depth,de,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,me,fe.width,fe.height,te.depth,0,fe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,te.depth,de,Ae,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,me,fe.width,fe.height,te.depth,0,de,Ae,fe.data)}else{Ne&&ze&&t.texStorage2D(n.TEXTURE_2D,le,me,Ie[0].width,Ie[0].height);for(let ee=0,he=Ie.length;ee<he;ee++)fe=Ie[ee],_.format!==Mn?de!==null?Ne?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,me,fe.width,fe.height,0,fe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?L&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe.width,fe.height,de,Ae,fe.data):t.texImage2D(n.TEXTURE_2D,ee,me,fe.width,fe.height,0,de,Ae,fe.data)}else if(_.isDataArrayTexture)if(Ne){if(ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,me,te.width,te.height,te.depth),L)if(_.layerUpdates.size>0){const ee=Hc(te.width,te.height,_.format,_.type);for(const he of _.layerUpdates){const xe=te.data.subarray(he*ee/te.data.BYTES_PER_ELEMENT,(he+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,he,te.width,te.height,1,de,Ae,xe)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Ae,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,de,Ae,te.data);else if(_.isData3DTexture)Ne?(ze&&t.texStorage3D(n.TEXTURE_3D,le,me,te.width,te.height,te.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Ae,te.data)):t.texImage3D(n.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,de,Ae,te.data);else if(_.isFramebufferTexture){if(ze)if(Ne)t.texStorage2D(n.TEXTURE_2D,le,me,te.width,te.height);else{let ee=te.width,he=te.height;for(let xe=0;xe<le;xe++)t.texImage2D(n.TEXTURE_2D,xe,me,ee,he,0,de,Ae,null),ee>>=1,he>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),d.add(_),ee.onpaint=he=>{const xe=he.changedElements;for(const re of d)xe.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const xe=n.RGBA,re=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,re,Te,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Ne&&ze){const ee=lt(Ie[0]);t.texStorage2D(n.TEXTURE_2D,le,me,ee.width,ee.height)}for(let ee=0,he=Ie.length;ee<he;ee++)fe=Ie[ee],Ne?L&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,de,Ae,fe):t.texImage2D(n.TEXTURE_2D,ee,me,de,Ae,fe);_.generateMipmaps=!1}else if(Ne){if(ze){const ee=lt(te);t.texStorage2D(n.TEXTURE_2D,le,me,ee.width,ee.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Ae,te)}else t.texImage2D(n.TEXTURE_2D,0,me,de,Ae,te);m(_)&&b(V),ce.__version=oe.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Be(w,_,k){if(_.image.length!==6)return;const V=X(w,_),K=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+k);const oe=i.get(K);if(K.version!==oe.__version||V===!0){t.activeTexture(n.TEXTURE0+k);const ce=Ke.getPrimaries(Ke.workingColorSpace),J=_.colorSpace===hi?null:Ke.getPrimaries(_.colorSpace),te=_.colorSpace===hi||ce===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const de=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,me=[];for(let re=0;re<6;re++)!de&&!Ae?me[re]=g(_.image[re],!0,r.maxCubemapSize):me[re]=Ae?_.image[re].image:_.image[re],me[re]=qt(_,me[re]);const fe=me[0],Ie=s.convert(_.format,_.colorSpace),Ne=s.convert(_.type),ze=y(_.internalFormat,Ie,Ne,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,le=oe.__version===void 0||V===!0,ee=K.dataReady;let he=E(_,fe);Pe(n.TEXTURE_CUBE_MAP,_);let xe;if(de){L&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,he,ze,fe.width,fe.height);for(let re=0;re<6;re++){xe=me[re].mipmaps;for(let Te=0;Te<xe.length;Te++){const Ee=xe[Te];_.format!==Mn?Ie!==null?L?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te,0,0,Ee.width,Ee.height,Ie,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te,ze,Ee.width,Ee.height,0,Ee.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te,0,0,Ee.width,Ee.height,Ie,Ne,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te,ze,Ee.width,Ee.height,0,Ie,Ne,Ee.data)}}}else{if(xe=_.mipmaps,L&&le){xe.length>0&&he++;const re=lt(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,he,ze,re.width,re.height)}for(let re=0;re<6;re++)if(Ae){L?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,me[re].width,me[re].height,Ie,Ne,me[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ze,me[re].width,me[re].height,0,Ie,Ne,me[re].data);for(let Te=0;Te<xe.length;Te++){const Mt=xe[Te].image[re].image;L?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te+1,0,0,Mt.width,Mt.height,Ie,Ne,Mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te+1,ze,Mt.width,Mt.height,0,Ie,Ne,Mt.data)}}else{L?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ie,Ne,me[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ze,Ie,Ne,me[re]);for(let Te=0;Te<xe.length;Te++){const Ee=xe[Te];L?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te+1,0,0,Ie,Ne,Ee.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Te+1,ze,Ie,Ne,Ee.image[re])}}}m(_)&&b(n.TEXTURE_CUBE_MAP),oe.__version=K.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ue(w,_,k,V,K,oe){const ce=s.convert(k.format,k.colorSpace),J=s.convert(k.type),te=y(k.internalFormat,ce,J,k.normalized,k.colorSpace),de=i.get(_),Ae=i.get(k);if(Ae.__renderTarget=_,!de.__hasExternalTextures){const me=Math.max(1,_.width>>oe),fe=Math.max(1,_.height>>oe);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,oe,te,me,fe,_.depth,0,ce,J,null):t.texImage2D(K,oe,te,me,fe,0,ce,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),At(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,K,Ae.__webglTexture,0,bt(_)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,K,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(w,_,k){if(n.bindRenderbuffer(n.RENDERBUFFER,w),_.depthBuffer){const V=_.depthTexture,K=V&&V.isDepthTexture?V.type:null,oe=R(_.stencilBuffer,K),ce=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;At(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,bt(_),oe,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,bt(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,w)}else{const V=_.textures;for(let K=0;K<V.length;K++){const oe=V[K],ce=s.convert(oe.format,oe.colorSpace),J=s.convert(oe.type),te=y(oe.internalFormat,ce,J,oe.normalized,oe.colorSpace);At(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,bt(_),te,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,bt(_),te,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,te,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ze(w,_,k){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,_.depthTexture);const de=s.convert(_.depthTexture.format),Ae=s.convert(_.depthTexture.type);let me;_.depthTexture.format===Jn?me=n.DEPTH_COMPONENT24:_.depthTexture.format===Li&&(me=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,me,_.width,_.height,0,de,Ae,null)}}else ie(_.depthTexture,0);const oe=K.__webglTexture,ce=bt(_),J=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,te=_.depthTexture.format===Li?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Jn)At(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,oe,0);else if(_.depthTexture.format===Li)At(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,J,oe,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,te,J,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ht(w){const _=i.get(w),k=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const V=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=V}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let V=0;V<6;V++)Ze(_.__webglFramebuffer[V],w,V);else{const V=w.texture.mipmaps;V&&V.length>0?Ze(_.__webglFramebuffer[0],w,0):Ze(_.__webglFramebuffer,w,0)}else if(k){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),St(_.__webglDepthbuffer[V],w,!1);else{const K=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,oe)}}else{const V=w.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),St(_.__webglDepthbuffer,w,!1);else{const K=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function at(w,_,k){const V=i.get(w);_!==void 0&&Ue(V.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&ht(w)}function tt(w){const _=w.texture,k=i.get(w),V=i.get(_);w.addEventListener("dispose",x);const K=w.textures,oe=w.isWebGLCubeRenderTarget===!0,ce=K.length>1;if(ce||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),oe){k.__webglFramebuffer=[];for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[J]=[];for(let te=0;te<_.mipmaps.length;te++)k.__webglFramebuffer[J][te]=n.createFramebuffer()}else k.__webglFramebuffer[J]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let J=0;J<_.mipmaps.length;J++)k.__webglFramebuffer[J]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ce)for(let J=0,te=K.length;J<te;J++){const de=i.get(K[J]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&At(w)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let J=0;J<K.length;J++){const te=K[J];k.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[J]);const de=s.convert(te.format,te.colorSpace),Ae=s.convert(te.type),me=y(te.internalFormat,de,Ae,te.normalized,te.colorSpace,w.isXRRenderTarget===!0),fe=bt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,me,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,k.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),St(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,_);for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)Ue(k.__webglFramebuffer[J][te],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,te);else Ue(k.__webglFramebuffer[J],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(_)&&b(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let J=0,te=K.length;J<te;J++){const de=K[J],Ae=i.get(de);let me=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,Ae.__webglTexture),Pe(me,de),Ue(k.__webglFramebuffer,w,de,n.COLOR_ATTACHMENT0+J,me,0),m(de)&&b(me)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,V.__webglTexture),Pe(J,_),_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)Ue(k.__webglFramebuffer[te],w,_,n.COLOR_ATTACHMENT0,J,te);else Ue(k.__webglFramebuffer,w,_,n.COLOR_ATTACHMENT0,J,0);m(_)&&b(J),t.unbindTexture()}w.depthBuffer&&ht(w)}function Tt(w){const _=w.textures;for(let k=0,V=_.length;k<V;k++){const K=_[k];if(m(K)){const oe=S(w),ce=i.get(K).__webglTexture;t.bindTexture(oe,ce),b(oe),t.unbindTexture()}}}const Ct=[],Lt=[];function Nt(w){if(w.samples>0){if(At(w)===!1){const _=w.textures,k=w.width,V=w.height;let K=n.COLOR_BUFFER_BIT;const oe=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(w),J=_.length>1;if(J)for(let de=0;de<_.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const te=w.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let de=0;de<_.length;de++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Ae=i.get(_[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,k,V,0,0,k,V,K,n.NEAREST),o===!0&&(Ct.length=0,Lt.length=0,Ct.push(n.COLOR_ATTACHMENT0+de),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ct.push(oe),Lt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Lt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let de=0;de<_.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const Ae=i.get(_[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&o){const _=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function bt(w){return Math.min(r.maxSamples,w.samples)}function At(w){const _=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(w){const _=a.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function qt(w,_){const k=w.colorSpace,V=w.format,K=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==oa&&k!==hi&&(Ke.getTransfer(k)===ut?(V!==Mn||K!==tn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",k)),_}function lt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Q,this.resetTextureUnits=Z,this.getTextureUnits=j,this.setTextureUnits=z,this.setTexture2D=ie,this.setTexture2DArray=ae,this.setTexture3D=ue,this.setTextureCube=q,this.rebindTextures=at,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=At,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function qv(n,e){function t(i,r=hi){let s;const a=Ke.getTransfer(r);if(i===tn)return n.UNSIGNED_BYTE;if(i===El)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ju)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zu)return n.BYTE;if(i===Ku)return n.SHORT;if(i===as)return n.UNSIGNED_SHORT;if(i===Sl)return n.INT;if(i===Fn)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===Kn)return n.HALF_FLOAT;if(i===ju)return n.ALPHA;if(i===ed)return n.RGB;if(i===Mn)return n.RGBA;if(i===Jn)return n.DEPTH_COMPONENT;if(i===Li)return n.DEPTH_STENCIL;if(i===Tl)return n.RED;if(i===Al)return n.RED_INTEGER;if(i===zi)return n.RG;if(i===Rl)return n.RG_INTEGER;if(i===Cl)return n.RGBA_INTEGER;if(i===Js||i===Qs||i===js||i===ea)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Js)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Js)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===js)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ea)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ro||i===Co||i===Po||i===Io)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Co)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Po)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Io)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lo||i===Do||i===Uo||i===No||i===Fo||i===sa||i===Oo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Lo||i===Do)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Uo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===No)return s.COMPRESSED_R11_EAC;if(i===Fo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===sa)return s.COMPRESSED_RG11_EAC;if(i===Oo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ko||i===Bo||i===zo||i===Go||i===Ho||i===Vo||i===Wo||i===Xo||i===$o||i===qo||i===Yo||i===Zo||i===Ko||i===Jo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ko)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Bo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Go)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ho)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Vo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$o)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ko)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qo||i===jo||i===el)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Qo)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===el)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===tl||i===nl||i===aa||i===il)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===tl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===nl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===il)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===os?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Yv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zv=`
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

}`;class Kv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ld(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new On({vertexShader:Yv,fragmentShader:Zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new Xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jv extends Hi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,l="local-floor",o=1,c=null,u=null,d=null,f=null,h=null,p=null;const v=typeof XRWebGLBinding<"u",g=new Kv,m={},b=t.getContextAttributes();let S=null,y=null;const R=[],E=[],C=new Oe;let x=null;const A=new vn;A.viewport=new xt;const D=new vn;D.viewport=new xt;const P=[A,D],O=new ap;let Z=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let se=R[X];return se===void 0&&(se=new Ua,R[X]=se),se.getTargetRaySpace()},this.getControllerGrip=function(X){let se=R[X];return se===void 0&&(se=new Ua,R[X]=se),se.getGripSpace()},this.getHand=function(X){let se=R[X];return se===void 0&&(se=new Ua,R[X]=se),se.getHandSpace()};function z(X){const se=E.indexOf(X.inputSource);if(se===-1)return;const ne=R[se];ne!==void 0&&(ne.update(X.inputSource,X.frame,c||a),ne.dispatchEvent({type:X.type,data:X.inputSource}))}function Q(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",W);for(let X=0;X<R.length;X++){const se=E[X];se!==null&&(E[X]=null,R[X].disconnect(se))}Z=null,j=null,g.reset();for(const X in m)delete m[X];e.setRenderTarget(S),h=null,f=null,d=null,r=null,y=null,Pe.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){l=X,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",W),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,pe=null,Be=null;b.depth&&(Be=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=b.stencil?Li:Jn,pe=b.stencil?os:Fn);const Ue={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Ue),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Nn(f.textureWidth,f.textureHeight,{format:Mn,type:tn,depthTexture:new wr(f.textureWidth,f.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ne={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new Nn(h.framebufferWidth,h.framebufferHeight,{format:Mn,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),c=null,a=await r.requestReferenceSpace(l),Pe.setContext(r),Pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(X){for(let se=0;se<X.removed.length;se++){const ne=X.removed[se],pe=E.indexOf(ne);pe>=0&&(E[pe]=null,R[pe].disconnect(ne))}for(let se=0;se<X.added.length;se++){const ne=X.added[se];let pe=E.indexOf(ne);if(pe===-1){for(let Ue=0;Ue<R.length;Ue++)if(Ue>=E.length){E.push(ne),pe=Ue;break}else if(E[Ue]===null){E[Ue]=ne,pe=Ue;break}if(pe===-1)break}const Be=R[pe];Be&&Be.connect(ne)}}const ie=new F,ae=new F;function ue(X,se,ne){ie.setFromMatrixPosition(se.matrixWorld),ae.setFromMatrixPosition(ne.matrixWorld);const pe=ie.distanceTo(ae),Be=se.projectionMatrix.elements,Ue=ne.projectionMatrix.elements,St=Be[14]/(Be[10]-1),Ze=Be[14]/(Be[10]+1),ht=(Be[9]+1)/Be[5],at=(Be[9]-1)/Be[5],tt=(Be[8]-1)/Be[0],Tt=(Ue[8]+1)/Ue[0],Ct=St*tt,Lt=St*Tt,Nt=pe/(-tt+Tt),bt=Nt*-tt;if(se.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(bt),X.translateZ(Nt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Be[10]===-1)X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const At=St+Nt,U=Ze+Nt,qt=Ct-bt,lt=Lt+(pe-bt),w=ht*Ze/U*At,_=at*Ze/U*At;X.projectionMatrix.makePerspective(qt,lt,w,_,At,U),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function q(X,se){se===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(se.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let se=X.near,ne=X.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(ne=g.depthFar)),O.near=D.near=A.near=se,O.far=D.far=A.far=ne,(Z!==O.near||j!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),Z=O.near,j=O.far),O.layers.mask=X.layers.mask|6,A.layers.mask=O.layers.mask&-5,D.layers.mask=O.layers.mask&-3;const pe=X.parent,Be=O.cameras;q(O,pe);for(let Ue=0;Ue<Be.length;Ue++)q(Be[Ue],pe);Be.length===2?ue(O,A,D):O.projectionMatrix.copy(A.projectionMatrix),Y(X,O,pe)};function Y(X,se,ne){ne===null?X.matrix.copy(se.matrixWorld):(X.matrix.copy(ne.matrixWorld),X.matrix.invert(),X.matrix.multiply(se.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=cs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&h===null))return o},this.setFoveation=function(X){o=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(X){return m[X]};let Se=null;function De(X,se){if(u=se.getViewerPose(c||a),p=se,u!==null){const ne=u.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let pe=!1;ne.length!==O.cameras.length&&(O.cameras.length=0,pe=!0);for(let Ze=0;Ze<ne.length;Ze++){const ht=ne[Ze];let at=null;if(h!==null)at=h.getViewport(ht);else{const Tt=d.getViewSubImage(f,ht);at=Tt.viewport,Ze===0&&(e.setRenderTargetTextures(y,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(y))}let tt=P[Ze];tt===void 0&&(tt=new vn,tt.layers.enable(Ze),tt.viewport=new xt,P[Ze]=tt),tt.matrix.fromArray(ht.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(ht.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(at.x,at.y,at.width,at.height),Ze===0&&(O.matrix.copy(tt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),pe===!0&&O.cameras.push(tt)}const Be=r.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Ze=d.getDepthInformation(ne[0]);Ze&&Ze.isValid&&Ze.texture&&g.init(Ze,r.renderState)}if(Be&&Be.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Ze=0;Ze<ne.length;Ze++){const ht=ne[Ze].camera;if(ht){let at=m[ht];at||(at=new ld,m[ht]=at);const tt=d.getCameraImage(ht);at.sourceTexture=tt}}}}for(let ne=0;ne<R.length;ne++){const pe=E[ne],Be=R[ne];pe!==null&&Be!==void 0&&Be.update(pe,se,c||a)}Se&&Se(X,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),p=null}const Pe=new hd;Pe.setAnimationLoop(De),this.setAnimationLoop=function(X){Se=X},this.dispose=function(){}}}const Qv=new dt,bd=new ke;bd.set(-1,0,0,0,1,0,0,0,1);function jv(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,cd(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,b,S,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),f(g,m),m.isMeshPhysicalMaterial&&h(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&l(g,m)):m.isPointsMaterial?o(g,m,b,S):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Kt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Kt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const b=e.get(m),S=b.envMap,y=b.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(Qv.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function l(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function o(g,m,b,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*b,g.scale.value=S*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,b){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Kt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const b=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function e_(n,e,t,i){let r={},s={},a=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function o(y,R){const E=R.program;i.uniformBlockBinding(y,E)}function c(y,R){let E=r[y.id];E===void 0&&(g(y),E=u(y),r[y.id]=E,y.addEventListener("dispose",b));const C=R.program;i.updateUBOMapping(y,C);const x=e.render.frame;s[y.id]!==x&&(f(y),s[y.id]=x)}function u(y){const R=d();y.__bindingPointIndex=R;const E=n.createBuffer(),C=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,E),E}function d(){for(let y=0;y<l;y++)if(a.indexOf(y)===-1)return a.push(y),y;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const R=r[y.id],E=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let x=0,A=E.length;x<A;x++){const D=E[x];if(Array.isArray(D))for(let P=0,O=D.length;P<O;P++)h(D[P],x,P,C);else h(D,x,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(y,R,E,C){if(v(y,R,E,C)===!0){const x=y.__offset,A=y.value;if(Array.isArray(A)){let D=0;for(let P=0;P<A.length;P++){const O=A[P],Z=m(O);p(O,y.__data,D),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(D+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(A,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function p(y,R,E){typeof y=="number"||typeof y=="boolean"?R[0]=y:y.isMatrix3?(R[0]=y.elements[0],R[1]=y.elements[1],R[2]=y.elements[2],R[3]=0,R[4]=y.elements[3],R[5]=y.elements[4],R[6]=y.elements[5],R[7]=0,R[8]=y.elements[6],R[9]=y.elements[7],R[10]=y.elements[8],R[11]=0):ArrayBuffer.isView(y)?R.set(new y.constructor(y.buffer,y.byteOffset,R.length)):y.toArray(R,E)}function v(y,R,E,C){const x=y.value,A=R+"_"+E;if(C[A]===void 0)return typeof x=="number"||typeof x=="boolean"?C[A]=x:ArrayBuffer.isView(x)?C[A]=x.slice():C[A]=x.clone(),!0;{const D=C[A];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return C[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(y){const R=y.uniforms;let E=0;const C=16;for(let A=0,D=R.length;A<D;A++){const P=Array.isArray(R[A])?R[A]:[R[A]];for(let O=0,Z=P.length;O<Z;O++){const j=P[O],z=Array.isArray(j.value)?j.value:[j.value];for(let Q=0,W=z.length;Q<W;Q++){const ie=z[Q],ae=m(ie),ue=E%C,q=ue%ae.boundary,Y=ue+q;E+=q,Y!==0&&C-Y<ae.storage&&(E+=C-Y),j.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=E,E+=ae.storage}}}const x=E%C;return x>0&&(E+=C-x),y.__size=E,y.__cache={},this}function m(y){const R={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(R.boundary=4,R.storage=4):y.isVector2?(R.boundary=8,R.storage=8):y.isVector3||y.isColor?(R.boundary=16,R.storage=12):y.isVector4?(R.boundary=16,R.storage=16):y.isMatrix3?(R.boundary=48,R.storage=48):y.isMatrix4?(R.boundary=64,R.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(R.boundary=16,R.storage=y.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",y),R}function b(y){const R=y.target;R.removeEventListener("dispose",b);const E=a.indexOf(R.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete s[R.id]}function S(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:o,update:c,dispose:S}}const t_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function n_(){return An===null&&(An=new ma(t_,16,16,zi,Kn),An.name="DFG_LUT",An.minFilter=Ot,An.magFilter=Ot,An.wrapS=Ln,An.wrapT=Ln,An.generateMipmaps=!1,An.needsUpdate=!0),An}class i_{constructor(e={}){const{canvas:t=rh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=tn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=h,g=new Set([Cl,Rl,Al]),m=new Set([tn,Fn,as,os,El,wl]),b=new Uint32Array(4),S=new Int32Array(4),y=new F;let R=null,E=null;const C=[],x=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,O=null,Z=null,j=null,z=null;this._outputColorSpace=Xt;let Q=0,W=0,ie=null,ae=-1,ue=null;const q=new xt,Y=new xt;let Se=null;const De=new Je(0);let Pe=0,X=t.width,se=t.height,ne=1,pe=null,Be=null;const Ue=new xt(0,0,X,se),St=new xt(0,0,X,se);let Ze=!1;const ht=new Nl;let at=!1,tt=!1;const Tt=new dt,Ct=new F,Lt=new xt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function At(){return ie===null?ne:1}let U=i;function qt(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ml}`),t.addEventListener("webglcontextlost",Mt,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",Sn,!1),U===null){const N="webgl2";if(U=qt(N,M),U===null)throw qt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw je("WebGLRenderer: "+M.message),M}let lt,w,_,k,V,K,oe,ce,J,te,de,Ae,me,fe,Ie,Ne,ze,L,le,ee,he,xe,re;function Te(){lt=new ng(U),lt.init(),he=new qv(U,lt),w=new Ym(U,lt,e,he),_=new Xv(U,lt),w.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),Z=U.createFramebuffer(),j=U.createFramebuffer(),z=U.createFramebuffer(),k=new sg(U),V=new Iv,K=new $v(U,lt,_,V,w,he,k),oe=new tg(D),ce=new cp(U),xe=new $m(U,ce),J=new ig(U,ce,k,xe),te=new og(U,J,ce,xe,k),L=new ag(U,w,K),Ie=new Zm(V),de=new Pv(D,oe,lt,w,xe,Ie),Ae=new jv(D,V),me=new Dv,fe=new Bv(lt),ze=new Xm(D,oe,_,te,p,o),Ne=new Wv(D,te,w),re=new e_(U,k,w,_),le=new qm(U,lt,k),ee=new rg(U,lt,k),k.programs=de.programs,D.capabilities=w,D.extensions=lt,D.properties=V,D.renderLists=me,D.shadowMap=Ne,D.state=_,D.info=k}Te(),v!==tn&&(A=new cg(v,t.width,t.height,l,r,s));const Ee=new Jv(D,U);this.xr=Ee,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=lt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=lt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(X,se,!1))},this.getSize=function(M){return M.set(X,se)},this.setSize=function(M,N,$=!0){if(Ee.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,se=N,t.width=Math.floor(M*ne),t.height=Math.floor(N*ne),$===!0&&(t.style.width=M+"px",t.style.height=N+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(X*ne,se*ne).floor()},this.setDrawingBufferSize=function(M,N,$){X=M,se=N,ne=$,t.width=Math.floor(M*$),t.height=Math.floor(N*$),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(v===tn){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(q)},this.getViewport=function(M){return M.copy(Ue)},this.setViewport=function(M,N,$,G){M.isVector4?Ue.set(M.x,M.y,M.z,M.w):Ue.set(M,N,$,G),_.viewport(q.copy(Ue).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(St)},this.setScissor=function(M,N,$,G){M.isVector4?St.set(M.x,M.y,M.z,M.w):St.set(M,N,$,G),_.scissor(Y.copy(St).multiplyScalar(ne).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(M){_.setScissorTest(Ze=M)},this.setOpaqueSort=function(M){pe=M},this.setTransparentSort=function(M){Be=M},this.getClearColor=function(M){return M.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,$=!0){let G=0;if(M){let H=!1;if(ie!==null){const _e=ie.texture.format;H=g.has(_e)}if(H){const _e=ie.texture.type,Me=m.has(_e),ve=ze.getClearColor(),we=ze.getClearAlpha(),Re=ve.r,Ge=ve.g,Xe=ve.b;Me?(b[0]=Re,b[1]=Ge,b[2]=Xe,b[3]=we,U.clearBufferuiv(U.COLOR,0,b)):(S[0]=Re,S[1]=Ge,S[2]=Xe,S[3]=we,U.clearBufferiv(U.COLOR,0,S))}else G|=U.COLOR_BUFFER_BIT}N&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),ze.dispose(),me.dispose(),fe.dispose(),V.dispose(),oe.dispose(),te.dispose(),xe.dispose(),re.dispose(),de.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Vl),Ee.removeEventListener("sessionend",Wl),yi.stop()};function Mt(M){M.preventDefault(),gc("WebGLRenderer: Context Lost."),P=!0}function gt(){gc("WebGLRenderer: Context Restored."),P=!1;const M=k.autoReset,N=Ne.enabled,$=Ne.autoUpdate,G=Ne.needsUpdate,H=Ne.type;Te(),k.autoReset=M,Ne.enabled=N,Ne.autoUpdate=$,Ne.needsUpdate=G,Ne.type=H}function Sn(M){je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function En(M){const N=M.target;N.removeEventListener("dispose",En),Ad(N)}function Ad(M){Rd(M),V.remove(M)}function Rd(M){const N=V.get(M).programs;N!==void 0&&(N.forEach(function($){de.releaseProgram($)}),M.isShaderMaterial&&de.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,$,G,H,_e){N===null&&(N=Nt);const Me=H.isMesh&&H.matrixWorld.determinantAffine()<0,ve=Id(M,N,$,G,H);_.setMaterial(G,Me);let we=$.index,Re=1;if(G.wireframe===!0){if(we=J.getWireframeAttribute($),we===void 0)return;Re=2}const Ge=$.drawRange,Xe=$.attributes.position;let Ce=Ge.start*Re,ft=(Ge.start+Ge.count)*Re;_e!==null&&(Ce=Math.max(Ce,_e.start*Re),ft=Math.min(ft,(_e.start+_e.count)*Re)),we!==null?(Ce=Math.max(Ce,0),ft=Math.min(ft,we.count)):Xe!=null&&(Ce=Math.max(Ce,0),ft=Math.min(ft,Xe.count));const Et=ft-Ce;if(Et<0||Et===1/0)return;xe.setup(H,G,ve,$,we);let yt,pt=le;if(we!==null&&(yt=ce.get(we),pt=ee,pt.setIndex(yt)),H.isMesh)G.wireframe===!0?(_.setLineWidth(G.wireframeLinewidth*At()),pt.setMode(U.LINES)):pt.setMode(U.TRIANGLES);else if(H.isLine){let Bt=G.linewidth;Bt===void 0&&(Bt=1),_.setLineWidth(Bt*At()),H.isLineSegments?pt.setMode(U.LINES):H.isLineLoop?pt.setMode(U.LINE_LOOP):pt.setMode(U.LINE_STRIP)}else H.isPoints?pt.setMode(U.POINTS):H.isSprite&&pt.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(lt.get("WEBGL_multi_draw"))pt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Bt=H._multiDrawStarts,be=H._multiDrawCounts,Jt=H._multiDrawCount,nt=we?ce.get(we).bytesPerElement:1,sn=V.get(G).currentProgram.getUniforms();for(let wn=0;wn<Jt;wn++)sn.setValue(U,"_gl_DrawID",wn),pt.render(Bt[wn]/nt,be[wn])}else if(H.isInstancedMesh)pt.renderInstances(Ce,Et,H.count);else if($.isInstancedBufferGeometry){const Bt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,be=Math.min($.instanceCount,Bt);pt.renderInstances(Ce,Et,be)}else pt.render(Ce,Et)};function Hl(M,N,$){M.transparent===!0&&M.side===Xn&&M.forceSinglePass===!1?(M.side=Kt,M.needsUpdate=!0,_s(M,N,$),M.side=_i,M.needsUpdate=!0,_s(M,N,$),M.side=Xn):_s(M,N,$)}this.compile=function(M,N,$=null){$===null&&($=M),E=fe.get($),E.init(N),x.push(E),$.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),M!==$&&M.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights();const G=new Set;return M.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const _e=H.material;if(_e)if(Array.isArray(_e))for(let Me=0;Me<_e.length;Me++){const ve=_e[Me];Hl(ve,$,H),G.add(ve)}else Hl(_e,$,H),G.add(_e)}),E=x.pop(),G},this.compileAsync=function(M,N,$=null){const G=this.compile(M,N,$);return new Promise(H=>{function _e(){if(G.forEach(function(Me){V.get(Me).currentProgram.isReady()&&G.delete(Me)}),G.size===0){H(M);return}setTimeout(_e,10)}lt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let ya=null;function Cd(M){ya&&ya(M)}function Vl(){yi.stop()}function Wl(){yi.start()}const yi=new hd;yi.setAnimationLoop(Cd),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(M){ya=M,Ee.setAnimationLoop(M),M===null?yi.stop():yi.start()},Ee.addEventListener("sessionstart",Vl),Ee.addEventListener("sessionend",Wl),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;O!==null&&O.renderStart(M,N);const $=Ee.enabled===!0&&Ee.isPresenting===!0,G=A!==null&&(ie===null||$)&&A.begin(D,ie);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(N),N=Ee.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,N,ie),E=fe.get(M,x.length),E.init(N),E.state.textureUnits=K.getTextureUnits(),x.push(E),Tt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ht.setFromProjectionMatrix(Tt,Dn,N.reversedDepth),tt=this.localClippingEnabled,at=Ie.init(this.clippingPlanes,tt),R=me.get(M,C.length),R.init(),C.push(R),Ee.enabled===!0&&Ee.isPresenting===!0){const Me=D.xr.getDepthSensingMesh();Me!==null&&Sa(Me,N,-1/0,D.sortObjects)}Sa(M,N,0,D.sortObjects),R.finish(),D.sortObjects===!0&&R.sort(pe,Be,N.reversedDepth),bt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,bt&&ze.addToRenderList(R,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),at===!0&&Ie.beginShadows();const H=E.state.shadowsArray;if(Ne.render(H,M,N),at===!0&&Ie.endShadows(),(G&&A.hasRenderPass())===!1){const Me=R.opaque,ve=R.transmissive;if(E.setupLights(),N.isArrayCamera){const we=N.cameras;if(ve.length>0)for(let Re=0,Ge=we.length;Re<Ge;Re++){const Xe=we[Re];$l(Me,ve,M,Xe)}bt&&ze.render(M);for(let Re=0,Ge=we.length;Re<Ge;Re++){const Xe=we[Re];Xl(R,M,Xe,Xe.viewport)}}else ve.length>0&&$l(Me,ve,M,N),bt&&ze.render(M),Xl(R,M,N)}ie!==null&&W===0&&(K.updateMultisampleRenderTarget(ie),K.updateRenderTargetMipmap(ie)),G&&A.end(D),M.isScene===!0&&M.onAfterRender(D,M,N),xe.resetDefaultState(),ae=-1,ue=null,x.pop(),x.length>0?(E=x[x.length-1],K.setTextureUnits(E.state.textureUnits),at===!0&&Ie.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?R=C[C.length-1]:R=null,O!==null&&O.renderEnd()};function Sa(M,N,$,G){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ht.intersectsSprite(M)){G&&Lt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Tt);const Me=te.update(M),ve=M.material;ve.visible&&R.push(M,Me,ve,$,Lt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ht.intersectsObject(M))){const Me=te.update(M),ve=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Lt.copy(M.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Lt.copy(Me.boundingSphere.center)),Lt.applyMatrix4(M.matrixWorld).applyMatrix4(Tt)),Array.isArray(ve)){const we=Me.groups;for(let Re=0,Ge=we.length;Re<Ge;Re++){const Xe=we[Re],Ce=ve[Xe.materialIndex];Ce&&Ce.visible&&R.push(M,Me,Ce,$,Lt.z,Xe)}}else ve.visible&&R.push(M,Me,ve,$,Lt.z,null)}}const _e=M.children;for(let Me=0,ve=_e.length;Me<ve;Me++)Sa(_e[Me],N,$,G)}function Xl(M,N,$,G){const{opaque:H,transmissive:_e,transparent:Me}=M;E.setupLightsView($),at===!0&&Ie.setGlobalState(D.clippingPlanes,$),G&&_.viewport(q.copy(G)),H.length>0&&vs(H,N,$),_e.length>0&&vs(_e,N,$),Me.length>0&&vs(Me,N,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function $l(M,N,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const Ce=lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Nn(1,1,{generateMipmaps:!0,type:Ce?Kn:tn,minFilter:mi,samples:Math.max(4,w.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const _e=E.state.transmissionRenderTarget[G.id],Me=G.viewport||q;_e.setSize(Me.z*D.transmissionResolutionScale,Me.w*D.transmissionResolutionScale);const ve=D.getRenderTarget(),we=D.getActiveCubeFace(),Re=D.getActiveMipmapLevel();D.setRenderTarget(_e),D.getClearColor(De),Pe=D.getClearAlpha(),Pe<1&&D.setClearColor(16777215,.5),D.clear(),bt&&ze.render($);const Ge=D.toneMapping;D.toneMapping=Un;const Xe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),at===!0&&Ie.setGlobalState(D.clippingPlanes,G),vs(M,$,G),K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e),lt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let ft=0,Et=N.length;ft<Et;ft++){const yt=N[ft],{object:pt,geometry:Bt,material:be,group:Jt}=yt;if(be.side===Xn&&pt.layers.test(G.layers)){const nt=be.side;be.side=Kt,be.needsUpdate=!0,ql(pt,$,G,Bt,be,Jt),be.side=nt,be.needsUpdate=!0,Ce=!0}}Ce===!0&&(K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e))}D.setRenderTarget(ve,we,Re),D.setClearColor(De,Pe),Xe!==void 0&&(G.viewport=Xe),D.toneMapping=Ge}function vs(M,N,$){const G=N.isScene===!0?N.overrideMaterial:null;for(let H=0,_e=M.length;H<_e;H++){const Me=M[H],{object:ve,geometry:we,group:Re}=Me;let Ge=Me.material;Ge.allowOverride===!0&&G!==null&&(Ge=G),ve.layers.test($.layers)&&ql(ve,N,$,we,Ge,Re)}}function ql(M,N,$,G,H,_e){M.onBeforeRender(D,N,$,G,H,_e),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),H.onBeforeRender(D,N,$,G,M,_e),H.transparent===!0&&H.side===Xn&&H.forceSinglePass===!1?(H.side=Kt,H.needsUpdate=!0,D.renderBufferDirect($,N,G,H,M,_e),H.side=_i,H.needsUpdate=!0,D.renderBufferDirect($,N,G,H,M,_e),H.side=Xn):D.renderBufferDirect($,N,G,H,M,_e),M.onAfterRender(D,N,$,G,H,_e)}function _s(M,N,$){N.isScene!==!0&&(N=Nt);const G=V.get(M),H=E.state.lights,_e=E.state.shadowsArray,Me=H.state.version,ve=de.getParameters(M,H.state,_e,N,$,E.state.lightProbeGridArray),we=de.getProgramCacheKey(ve);let Re=G.programs;G.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;const Ge=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;G.envMap=oe.get(M.envMap||G.environment,Ge),G.envMapRotation=G.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Re===void 0&&(M.addEventListener("dispose",En),Re=new Map,G.programs=Re);let Xe=Re.get(we);if(Xe!==void 0){if(G.currentProgram===Xe&&G.lightsStateVersion===Me)return Zl(M,ve),Xe}else ve.uniforms=de.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,$,ve),M.onBeforeCompile(ve,D),Xe=de.acquireProgram(ve,we),Re.set(we,Xe),G.uniforms=ve.uniforms;const Ce=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ce.clippingPlanes=Ie.uniform),Zl(M,ve),G.needsLights=Dd(M),G.lightsStateVersion=Me,G.needsLights&&(Ce.ambientLightColor.value=H.state.ambient,Ce.lightProbe.value=H.state.probe,Ce.directionalLights.value=H.state.directional,Ce.directionalLightShadows.value=H.state.directionalShadow,Ce.spotLights.value=H.state.spot,Ce.spotLightShadows.value=H.state.spotShadow,Ce.rectAreaLights.value=H.state.rectArea,Ce.ltc_1.value=H.state.rectAreaLTC1,Ce.ltc_2.value=H.state.rectAreaLTC2,Ce.pointLights.value=H.state.point,Ce.pointLightShadows.value=H.state.pointShadow,Ce.hemisphereLights.value=H.state.hemi,Ce.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ce.spotLightMatrix.value=H.state.spotLightMatrix,Ce.spotLightMap.value=H.state.spotLightMap,Ce.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Xe,G.uniformsList=null,Xe}function Yl(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=ta.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Zl(M,N){const $=V.get(M);$.outputColorSpace=N.outputColorSpace,$.batching=N.batching,$.batchingColor=N.batchingColor,$.instancing=N.instancing,$.instancingColor=N.instancingColor,$.instancingMorph=N.instancingMorph,$.skinning=N.skinning,$.morphTargets=N.morphTargets,$.morphNormals=N.morphNormals,$.morphColors=N.morphColors,$.morphTargetsCount=N.morphTargetsCount,$.numClippingPlanes=N.numClippingPlanes,$.numIntersection=N.numClipIntersection,$.vertexAlphas=N.vertexAlphas,$.vertexTangents=N.vertexTangents,$.toneMapping=N.toneMapping}function Pd(M,N){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(N.matrixWorld);for(let $=0,G=M.length;$<G;$++){const H=M[$];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function Id(M,N,$,G,H){N.isScene!==!0&&(N=Nt),K.resetTextureUnits();const _e=N.fog,Me=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,ve=ie===null?D.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ke.workingColorSpace,we=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Re=oe.get(G.envMap||Me,we),Ge=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Xe=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ce=!!$.morphAttributes.position,ft=!!$.morphAttributes.normal,Et=!!$.morphAttributes.color;let yt=Un;G.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(yt=D.toneMapping);const pt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Bt=pt!==void 0?pt.length:0,be=V.get(G),Jt=E.state.lights;if(at===!0&&(tt===!0||M!==ue)){const vt=M===ue&&G.id===ae;Ie.setState(G,M,vt)}let nt=!1;G.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Jt.state.version||be.outputColorSpace!==ve||H.isBatchedMesh&&be.batching===!1||!H.isBatchedMesh&&be.batching===!0||H.isBatchedMesh&&be.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&be.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&be.instancing===!1||!H.isInstancedMesh&&be.instancing===!0||H.isSkinnedMesh&&be.skinning===!1||!H.isSkinnedMesh&&be.skinning===!0||H.isInstancedMesh&&be.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&be.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&be.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&be.instancingMorph===!1&&H.morphTexture!==null||be.envMap!==Re||G.fog===!0&&be.fog!==_e||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Ie.numPlanes||be.numIntersection!==Ie.numIntersection)||be.vertexAlphas!==Ge||be.vertexTangents!==Xe||be.morphTargets!==Ce||be.morphNormals!==ft||be.morphColors!==Et||be.toneMapping!==yt||be.morphTargetsCount!==Bt||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,be.__version=G.version);let sn=be.currentProgram;nt===!0&&(sn=_s(G,N,H),O&&G.isNodeMaterial&&O.onUpdateProgram(G,sn,be));let wn=!1,ti=!1,$i=!1;const mt=sn.getUniforms(),wt=be.uniforms;if(_.useProgram(sn.program)&&(wn=!0,ti=!0,$i=!0),G.id!==ae&&(ae=G.id,ti=!0),be.needsLights){const vt=Pd(E.state.lightProbeGridArray,H);be.lightProbeGrid!==vt&&(be.lightProbeGrid=vt,ti=!0)}if(wn||ue!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),mt.setValue(U,"projectionMatrix",M.projectionMatrix),mt.setValue(U,"viewMatrix",M.matrixWorldInverse);const ii=mt.map.cameraPosition;ii!==void 0&&ii.setValue(U,Ct.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&mt.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&mt.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),ue!==M&&(ue=M,ti=!0,$i=!0)}if(be.needsLights&&(Jt.state.directionalShadowMap.length>0&&mt.setValue(U,"directionalShadowMap",Jt.state.directionalShadowMap,K),Jt.state.spotShadowMap.length>0&&mt.setValue(U,"spotShadowMap",Jt.state.spotShadowMap,K),Jt.state.pointShadowMap.length>0&&mt.setValue(U,"pointShadowMap",Jt.state.pointShadowMap,K)),H.isSkinnedMesh){mt.setOptional(U,H,"bindMatrix"),mt.setOptional(U,H,"bindMatrixInverse");const vt=H.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),mt.setValue(U,"boneTexture",vt.boneTexture,K))}H.isBatchedMesh&&(mt.setOptional(U,H,"batchingTexture"),mt.setValue(U,"batchingTexture",H._matricesTexture,K),mt.setOptional(U,H,"batchingIdTexture"),mt.setValue(U,"batchingIdTexture",H._indirectTexture,K),mt.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&mt.setValue(U,"batchingColorTexture",H._colorsTexture,K));const ni=$.morphAttributes;if((ni.position!==void 0||ni.normal!==void 0||ni.color!==void 0)&&L.update(H,$,sn),(ti||be.receiveShadow!==H.receiveShadow)&&(be.receiveShadow=H.receiveShadow,mt.setValue(U,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(wt.envMapIntensity.value=N.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=n_()),ti){if(mt.setValue(U,"toneMappingExposure",D.toneMappingExposure),be.needsLights&&Ld(wt,$i),_e&&G.fog===!0&&Ae.refreshFogUniforms(wt,_e),Ae.refreshMaterialUniforms(wt,G,ne,se,E.state.transmissionRenderTarget[M.id]),be.needsLights&&be.lightProbeGrid){const vt=be.lightProbeGrid;wt.probesSH.value=vt.texture,wt.probesMin.value.copy(vt.boundingBox.min),wt.probesMax.value.copy(vt.boundingBox.max),wt.probesResolution.value.copy(vt.resolution)}ta.upload(U,Yl(be),wt,K)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ta.upload(U,Yl(be),wt,K),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&mt.setValue(U,"center",H.center),mt.setValue(U,"modelViewMatrix",H.modelViewMatrix),mt.setValue(U,"normalMatrix",H.normalMatrix),mt.setValue(U,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const vt=G.uniformsGroups;for(let ii=0,qi=vt.length;ii<qi;ii++){const Kl=vt[ii];re.update(Kl,sn),re.bind(Kl,sn)}}return sn}function Ld(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Dd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(M,N,$){const G=V.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),V.get(M.texture).__webglTexture=N,V.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const $=V.get(M);$.__webglFramebuffer=N,$.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(M,N=0,$=0){ie=M,Q=N,W=$;let G=null,H=!1,_e=!1;if(M){const ve=V.get(M);if(ve.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,ve.__webglFramebuffer),q.copy(M.viewport),Y.copy(M.scissor),Se=M.scissorTest,_.viewport(q),_.scissor(Y),_.setScissorTest(Se),ae=-1;return}else if(ve.__webglFramebuffer===void 0)K.setupRenderTarget(M);else if(ve.__hasExternalTextures)K.rebindTextures(M,V.get(M.texture).__webglTexture,V.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ge=M.depthTexture;if(ve.__boundDepthTexture!==Ge){if(Ge!==null&&V.has(Ge)&&(M.width!==Ge.image.width||M.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(M)}}const we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(_e=!0);const Re=V.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Re[N])?G=Re[N][$]:G=Re[N],H=!0):M.samples>0&&K.useMultisampledRTT(M)===!1?G=V.get(M).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[$]:G=Re,q.copy(M.viewport),Y.copy(M.scissor),Se=M.scissorTest}else q.copy(Ue).multiplyScalar(ne).floor(),Y.copy(St).multiplyScalar(ne).floor(),Se=Ze;if($!==0&&(G=Z),_.bindFramebuffer(U.FRAMEBUFFER,G)&&_.drawBuffers(M,G),_.viewport(q),_.scissor(Y),_.setScissorTest(Se),H){const ve=V.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,ve.__webglTexture,$)}else if(_e){const ve=N;for(let we=0;we<M.textures.length;we++){const Re=V.get(M.textures[we]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+we,Re.__webglTexture,$,ve)}}else if(M!==null&&$!==0){const ve=V.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ve.__webglTexture,$)}ae=-1},this.readRenderTargetPixels=function(M,N,$,G,H,_e,Me,ve=0){if(!(M&&M.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we){_.bindFramebuffer(U.FRAMEBUFFER,we);try{const Re=M.textures[ve],Ge=Re.format,Xe=Re.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ve),!w.textureFormatReadable(Ge)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Xe)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-G&&$>=0&&$<=M.height-H&&U.readPixels(N,$,G,H,he.convert(Ge),he.convert(Xe),_e)}finally{const Re=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(M,N,$,G,H,_e,Me,ve=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we)if(N>=0&&N<=M.width-G&&$>=0&&$<=M.height-H){_.bindFramebuffer(U.FRAMEBUFFER,we);const Re=M.textures[ve],Ge=Re.format,Xe=Re.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ve),!w.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ce),U.bufferData(U.PIXEL_PACK_BUFFER,_e.byteLength,U.STREAM_READ),U.readPixels(N,$,G,H,he.convert(Ge),he.convert(Xe),0);const ft=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,ft);const Et=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await sh(U,Et,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ce),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,_e),U.deleteBuffer(Ce),U.deleteSync(Et),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,$=0){const G=Math.pow(2,-$),H=Math.floor(M.image.width*G),_e=Math.floor(M.image.height*G),Me=N!==null?N.x:0,ve=N!==null?N.y:0;K.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,Me,ve,H,_e),_.unbindTexture()},this.copyTextureToTexture=function(M,N,$=null,G=null,H=0,_e=0){let Me,ve,we,Re,Ge,Xe,Ce,ft,Et;const yt=M.isCompressedTexture?M.mipmaps[_e]:M.image;if($!==null)Me=$.max.x-$.min.x,ve=$.max.y-$.min.y,we=$.isBox3?$.max.z-$.min.z:1,Re=$.min.x,Ge=$.min.y,Xe=$.isBox3?$.min.z:0;else{const wt=Math.pow(2,-H);Me=Math.floor(yt.width*wt),ve=Math.floor(yt.height*wt),M.isDataArrayTexture?we=yt.depth:M.isData3DTexture?we=Math.floor(yt.depth*wt):we=1,Re=0,Ge=0,Xe=0}G!==null?(Ce=G.x,ft=G.y,Et=G.z):(Ce=0,ft=0,Et=0);const pt=he.convert(N.format),Bt=he.convert(N.type);let be;N.isData3DTexture?(K.setTexture3D(N,0),be=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(K.setTexture2DArray(N,0),be=U.TEXTURE_2D_ARRAY):(K.setTexture2D(N,0),be=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Jt=_.getParameter(U.UNPACK_ROW_LENGTH),nt=_.getParameter(U.UNPACK_IMAGE_HEIGHT),sn=_.getParameter(U.UNPACK_SKIP_PIXELS),wn=_.getParameter(U.UNPACK_SKIP_ROWS),ti=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,yt.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,yt.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,Re),_.pixelStorei(U.UNPACK_SKIP_ROWS,Ge),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Xe);const $i=M.isDataArrayTexture||M.isData3DTexture,mt=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const wt=V.get(M),ni=V.get(N),vt=V.get(wt.__renderTarget),ii=V.get(ni.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,vt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let qi=0;qi<we;qi++)$i&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(M).__webglTexture,H,Xe+qi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(N).__webglTexture,_e,Et+qi)),U.blitFramebuffer(Re,Ge,Me,ve,Ce,ft,Me,ve,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||M.isRenderTargetTexture||V.has(M)){const wt=V.get(M),ni=V.get(N);_.bindFramebuffer(U.READ_FRAMEBUFFER,j),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let vt=0;vt<we;vt++)$i?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.__webglTexture,H,Xe+vt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,wt.__webglTexture,H),mt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ni.__webglTexture,_e,Et+vt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ni.__webglTexture,_e),H!==0?U.blitFramebuffer(Re,Ge,Me,ve,Ce,ft,Me,ve,U.COLOR_BUFFER_BIT,U.NEAREST):mt?U.copyTexSubImage3D(be,_e,Ce,ft,Et+vt,Re,Ge,Me,ve):U.copyTexSubImage2D(be,_e,Ce,ft,Re,Ge,Me,ve);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else mt?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(be,_e,Ce,ft,Et,Me,ve,we,pt,Bt,yt.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(be,_e,Ce,ft,Et,Me,ve,we,pt,yt.data):U.texSubImage3D(be,_e,Ce,ft,Et,Me,ve,we,pt,Bt,yt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,_e,Ce,ft,Me,ve,pt,Bt,yt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,_e,Ce,ft,yt.width,yt.height,pt,yt.data):U.texSubImage2D(U.TEXTURE_2D,_e,Ce,ft,Me,ve,pt,Bt,yt);_.pixelStorei(U.UNPACK_ROW_LENGTH,Jt),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,nt),_.pixelStorei(U.UNPACK_SKIP_PIXELS,sn),_.pixelStorei(U.UNPACK_SKIP_ROWS,wn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,ti),_e===0&&N.generateMipmaps&&U.generateMipmap(be),_.unbindTexture()},this.initRenderTarget=function(M){V.get(M).__webglFramebuffer===void 0&&K.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?K.setTextureCube(M,0):M.isData3DTexture?K.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?K.setTexture2DArray(M,0):K.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Q=0,W=0,ie=null,_.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function Ol(n){const t=new Uint8Array(65536);for(let r=0;r<128;r++)for(let s=0;s<128;s++){const a=Math.sin(s*127.1+r*311.7)*43758.5453%1,l=n==="wood"?205+21*Math.sin(s*.5+Math.sin(r*.07)*2)+a*12:n==="cloth"?231+(s%2?7:-7)+(r%2?4:-4):228+12*Math.sin(s*.12+r*.075+Math.sin(r*.08)*3)+a*8,o=(r*128+s)*4;t[o]=t[o+1]=t[o+2]=Math.max(0,Math.min(255,l)),t[o+3]=255}const i=new ma(t,128,128);return i.wrapS=i.wrapT=ss,i.colorSpace=Xt,i.needsUpdate=!0,i}const ll=Ol("wood"),Md=Ol("stone"),Yr=Ol("cloth"),T={stone:new ct({color:ri.materials.stone,map:Md,roughness:.72}),wall:new ct({color:ri.materials.wall,roughness:.88}),wood:new ct({color:ri.materials.wood,map:ll,roughness:.52}),walnut:new ct({color:ri.materials.darkWood,map:ll,roughness:.5}),gold:new ct({color:ri.materials.metal,metalness:.7,roughness:.36}),navy:new ct({color:ri.materials.blue,roughness:.65}),white:new ct({color:ri.materials.linen,map:Yr,roughness:.93}),teal:new ct({color:ri.materials.accent,map:Yr,roughness:.83}),rust:new ct({color:9920067,map:Yr,roughness:.84}),carpet:new ct({color:6845561,map:Yr,roughness:1}),black:new ct({color:1449508,roughness:.6}),green:new ct({color:3495746,roughness:.86}),leaf:new ct({color:6651984,roughness:.8}),glass:new ct({color:9419727,metalness:.4,roughness:.22,transparent:!0,opacity:.25,depthWrite:!1}),window:new ct({color:4813696,metalness:.24,roughness:.27,emissive:3495527,emissiveIntensity:.25}),glow:new ct({color:16770738,emissive:16762729,emissiveIntensity:1.35,roughness:1}),shade:new ct({color:16771263,emissive:16763015,emissiveIntensity:.3,roughness:.8}),screen:new ct({color:1255988,emissive:2839907,emissiveIntensity:.3}),skin:new ct({color:14000506,roughness:.9}),hair:new ct({color:2433314,roughness:.9}),ao:new Wi({color:1906708,transparent:!0,opacity:.12,depthWrite:!1})},cl=new Map;function r_(n){let e=cl.get(n);return e||(e=new ct({color:n,roughness:.75}),cl.set(n,e)),e}function s_(){Object.values(T).forEach(n=>n.dispose()),cl.forEach(n=>n.dispose()),[ll,Md,Yr].forEach(n=>n.dispose())}const gs={box:new Mi(1,1,1),cylinder:new Lr(1,1,1,12),sphere:new us(1,12,8),leaf:new us(1,8,6),cone:new ga(1,1,16),plane:new Xi(1,1)};function I(n,e,t,i,r,s,a,l=T.wood){const o=new _t(gs.box,l);return o.position.set(e,t,i),o.scale.set(r,s,a),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function $e(n,e,t,i,r,s,a=T.gold){const l=new _t(gs.cylinder,a);return l.position.set(e,t,i),l.scale.set(r,s,r),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function Rn(n,e,t,i,r,s,a,l=T.leaf){const o=new _t(gs.sphere,l);return o.position.set(e,t,i),o.scale.set(r,s,a),o.castShadow=!0,n.add(o),o}function ba(n,e,t,i,r,s=.022){const a=new _t(gs.plane,T.ao);a.rotation.x=-Math.PI/2,a.position.set(e,s,t),a.scale.set(i,r,1),n.add(a)}function Wt(n,e,t,i=1,r=0){const s=new et;s.position.set(e,r,t),s.scale.setScalar(i),n.add(s),$e(s,0,.21,0,.21,.42,T.stone),$e(s,0,.76,0,.027,1.1,T.walnut);for(let a=0;a<9;a++){const l=a*2.4,o=.65+a*.073;Rn(s,Math.sin(l)*.2,o,Math.cos(l)*.17,.24,.095,.12,a%2?T.leaf:T.green).rotation.set(.3,l,Math.sin(l)*.65)}return ba(s,0,0,.7,.55),s}function Pn(n,e,t,i,r=1){const s=new et;return s.position.set(e,t,i),s.scale.setScalar(r),n.add(s),$e(s,0,.035,0,.11,.045,T.gold),$e(s,0,.21,0,.019,.36,T.gold),$e(s,0,.42,0,.16,.22,T.shade),$e(s,0,.315,0,.135,.015,T.glow),s}function Di(n,e,t,i=0,r=T.teal){const s=new et;s.position.set(e,0,t),s.rotation.y=i,n.add(s),I(s,0,.43,0,.55,.14,.56,r),I(s,0,.71,-.23,.55,.48,.1,r);for(const a of[-1,1])for(const l of[-1,1])$e(s,a*.2,.2,l*.2,.025,.4,T.walnut);return s}function Vn(n,e,t,i=0,r=1.5,s=T.teal){const a=new et;a.position.set(e,0,t),a.rotation.y=i,n.add(a),I(a,0,.32,0,r,.42,.64,s),I(a,0,.66,-.29,r,.65,.18,s);for(const l of[-1,1])I(a,l*(r/2-.08),.56,0,.16,.4,.7,s),I(a,l*r*.23,.55,-.17,.35,.28,.11,T.white);return I(a,0,.58,.04,r-.3,.11,.44,s),ba(a,0,0,r+.15,.95),a}function fi(n,e,t,i=.42){$e(n,e,.37,t,.055,.74,T.gold),$e(n,e,.75,t,i,.07,T.stone),$e(n,e,.04,t,i*.5,.06,T.walnut)}function ts(n,e,t,i){$e(n,e,t,i,.07,.13,T.white),$e(n,e,t-.065,i,.12,.018,T.white)}function Ui(n,e,t,i,r=1.15,s=.65,a=0){I(n,e,t,i,r+.07,s+.07,.06,T.gold),I(n,e,t,i+.04,r,s,.015,T.white),I(n,e,t-s*.14,i+.06,r*.93,s*.37,.012,a%2?T.teal:T.window),I(n,e-r*.2,t+s*.02,i+.07,r*.27,s*.25,.014,T.stone),Rn(n,e+r*.25,t+s*.19,i+.075,s*.13,s*.13,.006,T.rust)}function a_(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{if(!(t instanceof _t)||t instanceof Er||t.userData.diorama||t.userData.interactive||Array.isArray(t.material)||t.material.transparent)return;const i=t.geometry.uuid+t.material.uuid;let r=e.get(i);r||(r={geometry:t.geometry,material:t.material,matrices:[],meshes:[]},e.set(i,r)),r.matrices.push(t.matrixWorld.clone()),r.meshes.push(t)});for(const t of e.values()){const i=new Er(t.geometry,t.material,t.matrices.length);t.matrices.forEach((r,s)=>i.setMatrixAt(s,r)),i.castShadow=!0,i.receiveShadow=!0,i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),t.meshes.forEach(r=>r.removeFromParent()),n.add(i)}}function o_(n){const e=n.level??1,t=new et;t.name=n.id,t.userData.entityId=n.id,I(t,0,.04,0,4.7,.08,3.1,e>=4?T.stone:e>=2?T.walnut:T.wood),I(t,0,1.19,-1.51,4.7,2.38,.14,T.wall),I(t,2.35,1.14,-.1,.1,2.28,2.75,T.stone),I(t,1.6,1.25,-1.41,1.05,1.9,.035,T.window);for(const a of[1.1,1.6,2.1])I(t,a,1.25,-1.35,.035,1.94,.04,T.gold);I(t,1.6,1.25,-1.35,1.08,.04,.04,T.gold);for(let a=1.03;a<1.26;a+=.06)I(t,a,1.28,-1.23,.04,1.94,.13,T.white);if(I(t,0,2.27,-1.27,4.53,.06,.065,T.glow),n.construction){for(const a of[-1.8,0,1.8])I(t,a,1.05,1.5,.07,2.1,.07,T.gold),I(t,a,.4,.4,.65,.7,.7,T.stone);for(const a of[.5,1.4,2.15])I(t,0,a,1.5,4.5,.06,.06,T.gold);return I(t,0,.8,1.55,4.5,.48,.06,T.navy),t}if(n.status==="unbuilt")return I(t,0,.12,0,3.8,.08,2.5,T.stone),t;const i=bu(n),r=hl(n)==="twin";I(t,-.67,.078,.07,2.85,.02,2.66,T.carpet);const s=(a,l)=>{I(t,a,.28,-.03,l+.09,.39,1.9,T.walnut),I(t,a,.51,.02,l,.23,1.85,n.status==="dirty"?T.stone:T.white),I(t,a,.7,-.98,l+.13,1.22,.12,T.walnut),I(t,a,.82,-.89,l-.05,.63,.08,T.teal),I(t,a,.67,-.58,l*.82,.13,.36,T.white),e>=2&&(I(t,a,.78,-.72,l*.78,.12,.25,T.white),I(t,a,.655,.18,l,.045,.45,e>=4?T.white:T.teal)),I(t,a,.646,.54,l,.075,.39,e>=4?T.gold:i?T.rust:T.teal),I(t,a,.49,1,l,.28,.04,T.white),ba(t,a,0,l+.25,2.25)};r?(s(-1.36,.88),s(-.22,.88)):s(-.75,1.68);for(const a of[-1.94,.43])I(t,a,.35,-.76,.41,.58,.5,T.walnut),I(t,a,.66,-.76,.45,.06,.53,T.stone),Pn(t,a,.69,-.77,.8);if(Ui(t,-.75,1.79,-1.39,1.25,.54,Number(n.number)),e>=4)I(t,1.65,.38,-.4,.9,.65,.85,T.stone),I(t,1.65,.73,-.4,.85,.08,.8,T.white),$e(t,1.65,.83,-.65,.025,.22,T.gold),I(t,2.16,1.25,-.35,.025,1.8,1.5,T.glass),I(t,1.6,1.93,-1.14,.3,.04,.25,T.gold),Ui(t,1.5,1.6,-1.33,.8,.5,e),Vn(t,1.58,.76,-Math.PI/2,.75,T.white);else if(i)Vn(t,1.55,.22,-Math.PI/2,1.3,T.rust),fi(t,.97,.8,.25);else{I(t,1.61,.76,-.57,1.1,.1,.57,T.walnut);for(const a of[1.19,2.03])I(t,a,.37,-.57,.05,.75,.46,T.gold);I(t,1.59,.94,-.64,.35,.28,.04,T.screen),Di(t,1.65,.06,Math.PI),Pn(t,2,.82,-.62,.66)}if(qn(n)==="view"||qn(n)==="premium"){I(t,0,1.45,-1.4,4.15,1.65,.025,T.window);for(const a of[-2,0,2])I(t,a,1.45,-1.35,.045,1.7,.045,T.gold)}if(qn(n)==="premium"&&(I(t,0,2.1,-1.25,4.5,.08,.08,T.gold),Ui(t,-1.6,1.8,-1.3,.8,.4,99),Wt(t,1.95,.55,1.15)),n.extraBed&&(I(t,.5,.25,1.02,.8,.3,.8,T.walnut),I(t,.5,.43,1.02,.8,.08,.8,T.white)),Wt(t,2.05,1.05,.63),(n.level??1)>1&&(Ui(t,-2.05,1.6,-1.38,.38,.56,n.level),Wt(t,-2.05,.35,.55)),e>=3&&(Pn(t,-1.94,1.25,-.9,1.1),I(t,-.75,1.62,-1.25,2.1,.025,.03,T.glow)),e>=5){I(t,0,1.4,-1.42,4.3,1.9,.025,T.window);for(const a of[-2,-.8,.8,2])I(t,a,1.4,-1.35,.04,1.95,.06,T.gold);for(const a of[-1.8,0,1.8])I(t,a,.09,.15,.025,.02,2.9,T.gold);for(const a of[2.12,2.24])I(t,0,a,-1.1,4.5,.035,.035,T.glow)}if((n.level??1)>2&&I(t,0,2.12,-1.3,4.55,.035,.055,T.gold),I(t,-2.12,.52,.95,.22,1,.28,T.walnut),n.status==="reserved"&&(n.suaBookingId&&I(t,0,1.1,1.62,.38,.5,.05,T.rust),I(t,1.2,.48,1.48,.25,.29,.1,T.gold)),n.status==="cleaning"){I(t,1.05,.37,1.57,.55,.55,.35,T.navy);for(const a of[.83,1.27])$e(t,a,.09,1.57,.07,.07,T.black);I(t,1.05,.71,1.57,.6,.04,.41,T.gold),I(t,.95,.79,1.57,.3,.12,.22,T.white)}if(n.status==="occupied"&&I(t,0,2.23,.7,3.8,.035,.035,T.shade),n.status==="maintenance"){const a=I(t,.9,1.95,1.55,.17,.17,.08,T.glow);a.name="fault-lamp",a.userData.interactive=!0,I(t,.6,.33,.9,.8,.1,.8,T.rust),I(t,.6,.52,.9,.1,.6,.1,T.gold)}return t}function Ys(n,e,t,i=2.12){$e(n,e,i+.13,t,.012,.45,T.gold),$e(n,e,i-.08,t,.24,.18,T.gold),$e(n,e,i-.18,t,.21,.015,T.glow)}function l_(n,e){if(I(n,0,1.2,-1.54,14.65,2.4,.14,T.wall),e==="lobby")for(let t=-6.9;t<=6.9;t+=.42)I(n,t,1.2,-1.42,.035,2.38,.08,T.gold);else for(let t=-7;t<7;t+=.58)I(n,t,1.2,-1.43,.022,2.2,.04,T.wood)}function dr(n,e,t){I(n,(e+t)/2,1.23,-1.4,t-e,2.14,.04,T.window);for(let i=e;i<=t+.01;i+=.72)I(n,i,1.23,-1.32,.045,2.17,.06,T.gold);I(n,(e+t)/2,1.25,-1.31,t-e,.04,.06,T.gold)}function c_(n,e,t){fi(n,e,t,.44),Di(n,e-.63,t,Math.PI/2),Di(n,e+.63,t,-Math.PI/2),ts(n,e-.18,.87,t),ts(n,e+.18,.87,t),$e(n,e,.83,t,.065,.12,T.gold)}function ro(n,e,t){I(n,e,1.23,-1.35,t,1.86,.18,T.walnut);for(let i=.53;i<2;i+=.39){I(n,e,i,-1.14,t,.04,.42,T.gold),I(n,e,i+.035,-1.18,t-.1,.025,.05,T.glow);for(let r=0;r<Math.floor(t/.23);r++){const s=e-t/2+.16+r*.23;$e(n,s,i+.13,-1.08,.048,.23,r%3?T.green:T.rust),$e(n,s,i+.27,-1.08,.019,.07,T.gold)}}}function u_(n,e=1,t=100,i=!1){const r=new et;if(n!=="rooftop"&&(l_(r,n),I(r,0,.04,0,14.66,.08,3.15,n==="lobby"?T.stone:T.wood),I(r,0,2.31,-1.21,14.5,.04,.07,T.glow)),i){for(const s of[-6,-3,0,3,6])I(r,s,1.1,1.4,.08,2.2,.08,T.gold);for(const s of[.5,1.5,2.1])I(r,0,s,1.4,14,.08,.08,T.gold);return I(r,0,.8,1.5,14,.65,.04,T.navy),r}if(n==="lobby"){dr(r,4.3,7.2),I(r,0,1.35,-1.33,6.7,1.8,.11,T.stone),I(r,0,.48,.5,6.2,.84,.62,T.walnut),I(r,0,.94,.5,6.45,.12,.83,T.stone),I(r,0,.15,.86,6.08,.075,.035,T.glow);for(let s=-2.9;s<3;s+=.18)I(r,s,.5,.824,.035,.6,.025,T.gold);for(const s of[-1.8,1.7])I(r,s,1.12,.2,.42,.29,.045,T.screen),Pn(r,s+.55,1.02,.46,.72);Wt(r,-3.9,-.7,1.72),Wt(r,4,-.55,1.6),Vn(r,-5.75,.08,Math.PI/2,1.65,T.white),fi(r,-5.02,1,.47),Wt(r,-6.4,1.4,.55),I(r,5.8,.045,1.18,2.2,.03,1.25,T.navy);for(const s of[4.65,6.95])I(r,s,1.13,.85,.08,2.28,.08,T.gold),I(r,s,1.17,.79,.65,2.18,.025,T.glass);I(r,5.8,2.18,1.24,2.6,.16,1.72,T.navy),I(r,5.8,2.08,2.03,2.55,.035,.04,T.gold);for(const s of[3.5,4.1])$e(r,s,.67,1.8,.025,1.15,T.gold),$e(r,s,.09,1.8,.08,.1,T.black);I(r,3.8,1.27,1.8,.65,.035,.04,T.gold),I(r,3.8,.18,1.8,.78,.08,.51,T.gold),I(r,3.76,.43,1.8,.37,.45,.25,T.rust);for(const s of[-2.8,0,2.8])Ys(r,s,.1,2.02)}else if(n==="breakfast"){dr(r,4.3,7.2),ro(r,0,4.5),I(r,0,.52,-.15,5,.9,.8,T.walnut),I(r,0,1.01,-.15,5.2,.12,.97,T.stone);for(const s of t>0?[-1.7,-.7,.3]:[])I(r,s,1.14,-.17,.66,.14,.45,T.gold),I(r,s,1.24,-.17,.6,.08,.38,T.white);I(r,1.5,1.29,-.24,.43,.53,.38,T.black),$e(r,2.1,1.28,-.2,.15,.4,T.glass),$e(r,2.1,1.13,-.2,.145,.09,T.rust);for(const s of[-5.55,-3.4,3.8,6])c_(r,s,.68);for(const s of[-5.55,-3.4,0,3.8,6])Ys(r,s,.5);Wt(r,-6.9,-.87,1.1),Wt(r,6.8,-.8,1.1)}else if(n==="club"){dr(r,-7.2,-3.8),dr(r,3.8,7.2),ro(r,0,5.4),I(r,0,.58,-.24,5.55,1.02,.58,T.walnut),I(r,0,1.12,-.24,5.8,.11,.79,T.stone),I(r,0,.25,.071,5.5,.05,.035,T.glow);for(const s of[-1.8,-.6,.6,1.8])$e(r,s,.6,.6,.24,.12,T.teal),$e(r,s,.28,.6,.035,.58,T.gold),t>0&&ts(r,s,1.24,-.15),Ys(r,s,-.24);Vn(r,-5.6,-.54,0,2.05,T.teal),fi(r,-5.6,.57,.5),Di(r,-4.38,.75,-Math.PI/3,T.rust),Vn(r,5.25,-.54,0,2.1,T.rust),fi(r,5.25,.6,.52),Di(r,6.52,.7,-Math.PI/3,T.teal),Wt(r,-6.9,.68,1.2),Wt(r,6.9,-.8,1.25),Pn(r,-4.15,.05,-.8,1.6)}else if(n==="gym"){dr(r,-7.2,7.2),I(r,0,.093,0,14.4,.025,2.9,T.carpet);for(const s of[-5.65,-3.8,-1.95]){I(r,s,.16,.15,.92,.21,1.72,T.black),I(r,s,.28,.17,.68,.015,1.42,T.carpet);for(const a of[-1,1])I(r,s+a*.42,.7,-.51,.075,1.1,.08,T.black),I(r,s+a*.42,1.13,-.2,.06,.06,.75,T.black);I(r,s,1.26,-.5,.85,.23,.14,T.black),I(r,s,1.3,-.409,.43,.12,.012,T.screen)}for(const s of[.1,1.65]){const a=$e(r,s,.41,.1,.36,.12,T.black);a.rotation.z=Math.PI/2,I(r,s,.39,.2,.07,.69,.09,T.gold),I(r,s,.81,.47,.37,.09,.24,T.black),I(r,s,1.05,-.32,.07,.55,.07,T.black),I(r,s,1.27,-.32,.5,.06,.07,T.gold)}I(r,5.45,.68,-.8,2.8,.07,.58,T.black);for(let s=4.2;s<6.8;s+=.46)$e(r,s,.82,-.8,.13,.16,T.black);for(const s of[3.65,5.2])I(r,s,.12,.61,1.08,.025,1.68,T.teal);Wt(r,6.93,.82,1.2),I(r,2.76,.4,-.87,.6,.7,.53,T.walnut);for(let s=0;s<3;s++)I(r,2.76,.79+s*.065,-.87,.46,.065,.4,T.white)}else if(n==="spa"){dr(r,-7.2,7.2);for(const s of[-4.8,0,4.8]){I(r,s,.4,0,1.7,.6,2.05,T.walnut),I(r,s,.76,0,1.8,.14,2.1,T.white),I(r,s,.87,-.6,1.15,.12,.45,T.white),I(r,s,.86,.4,1.8,.03,.7,T.teal),Wt(r,s+1.2,-.9,1.1),Pn(r,s-1.2,.05,-.9,1.4);for(let a=0;a<3;a++)I(r,s+1.2,.15+a*.06,.75,.5,.06,.32,T.white)}}else{I(r,0,.03,0,15,.14,3.6,T.wood);for(let s=-7.3;s<7.4;s+=.24)I(r,s,.11,0,.017,.006,3.45,T.walnut);for(const s of[-6.65,-2.45,2.8,6.9])Wt(r,s,-.8,1.45);for(const s of[-4.4,3.5]){fi(r,s,.45,.66),Di(r,s-.9,.4,Math.PI/2,T.white),Di(r,s+.9,.4,-Math.PI/2,T.white),ts(r,s+.2,.88,.45),$e(r,s,1.07,.45,.026,2.05,T.gold);const a=new _t(new ga(1.55,.32,8),T.white);a.position.set(s,2.04,.45),a.rotation.y=Math.PI/8,a.castShadow=!0,r.add(a)}Vn(r,-.5,-.7,0,1.7,T.teal),fi(r,-.5,.45,.38);for(const s of[-7.35,7.35])I(r,s,.43,0,.055,.8,3.5,T.gold);for(let s=-7.3;s<=7.3;s+=1.46)$e(r,s,.43,1.7,.018,.8,T.gold);I(r,0,.8,1.7,14.7,.035,.035,T.gold),I(r,0,.46,1.7,14.7,.65,.014,T.glass)}if(e>=2){if(n==="lobby"&&(Vn(r,-5.6,.8,0,1.8,T.teal),fi(r,-4.25,.8,.35)),n==="breakfast"&&(I(r,2.8,1.1,-.6,.65,.5,.45,T.screen),ts(r,2.8,1.44,-.6)),n==="club"&&(ro(r,5.8,1.2),Pn(r,3.3,.05,-.8,1.8)),n==="gym")for(const s of[3.7,4.6,5.5])I(r,s,.15,.5,.6,.09,1.8,T.rust);if(n==="spa")for(const s of[-2.5,2.5])I(r,s,1.15,-.7,.06,2.1,1.3,T.wood);n==="rooftop"&&Vn(r,0,.55,0,2.2,T.rust)}if(e>=3){if(n==="lobby"&&(Ui(r,0,1.6,-1.17,3.5,.65,3),I(r,0,.94,.5,6.45,.12,.83,T.gold)),n==="breakfast"&&(I(r,0,.55,.05,5.4,1,.8,T.stone),t>0))for(const s of[-1.8,0,1.8])$e(r,s,1.12,.05,.25,.12,T.gold);if(n==="club"&&(Vn(r,-5.5,.4,0,2.8,T.white),Ui(r,0,1.85,-1.05,2.7,.45,2)),n==="gym"){I(r,4.9,1.15,-1.23,4,1.85,.05,T.glass);for(const s of[3.1,6.5])I(r,s,1,0,.08,1.8,.08,T.gold);I(r,4.8,1.85,0,3.6,.08,.08,T.gold)}if(n==="spa")for(const s of[-4.8,0,4.8])I(r,s,.88,.4,1.8,.04,.8,T.white),Pn(r,s+1.05,.75,.8,.8);if(n==="rooftop"){for(const s of[-6.8,6.8])I(r,s,1.3,-.9,.12,2.6,.12,T.walnut);for(let s=-6.8;s<=6.8;s+=.7)I(r,s,2.5,-.3,.12,.1,2.2,T.walnut)}}if(e>=4){I(r,0,.12,-.15,14,.03,2.9,T.stone);for(const s of[-6.6,6.6])Ui(r,s,1.55,-1.15,.7,1.1,4),Pn(r,s,.05,.85,1.7);if(n==="spa"&&(I(r,0,.4,.4,2.5,.55,1.5,T.white),I(r,0,.7,.4,2.1,.03,1.1,T.window)),n==="breakfast"||n==="club")for(const s of[-2,2])I(r,s,1.55,-.6,.025,.85,.025,T.gold),$e(r,s,1.95,-.6,.25,.06,T.gold);n==="gym"&&(I(r,0,.3,.3,1.4,.25,1.8,T.black),I(r,0,1.25,-.4,1.2,.6,.12,T.screen))}if(e>=5){if(n!=="rooftop"){for(const s of[-5,-2.5,0,2.5,5])Ys(r,s,.5,2.05),I(r,s,2.27,0,2.2,.045,2.6,T.walnut);I(r,0,2.23,1.2,14,.04,.04,T.glow)}else{I(r,0,.35,-.5,3.6,.5,1.1,T.stone),I(r,0,.62,-.5,3.3,.04,.9,T.window);for(const s of[-6,-3,3,6])Pn(r,s,.05,.8,1.3)}for(let s=-6.5;s<7;s+=1.3)I(r,s,.15,1.55,.5,.02,.2,T.gold)}return r}function d_(n,e,t){const i=new et,s=r_(e?{chill:10004873,road:2178391,family:13866066,points:5274231,hunter:6768230,forum:6714779,creator:14997172,proposal:7678782,planner:3495771,whale:12165767,auditplus:4541008}[e]:n),a=c=>{const u=new et;return u.position.set(c,.31,0),i.add(u),I(u,0,-.11,0,.085,.26,.1,T.navy),I(u,0,-.245,.035,.11,.07,.17,T.black),u},l=a(-.08),o=a(.08);I(i,0,.47,0,.27,.34,.17,s),I(i,0,.58,.093,.07,.13,.012,T.white),["chill","family","points","forum","creator"].includes(e??"")||I(i,0,.55,.108,.018,.095,.016,T.navy),Rn(i,0,.81,0,.185,.21,.16,T.skin),Rn(i,0,.94,-.024,.193,.102,.163,T.hair);for(const c of[-.069,.069])Rn(i,c,.84,.149,.021,.024,.01,T.black),(!e||["points","forum","auditplus","hunter"].includes(e))&&I(i,c,.856,.156,.09,.066,.012,T.navy);for(const c of[-1,1]){const u=I(i,c*.18,.45,0,.075,.26,.085,s);u.rotation.z=c*.15,Rn(i,c*.19,.303,.012,.047,.05,.045,T.skin)}if(e==="chill"&&($e(i,0,1,0,.23,.06,T.white),$e(i,0,1.06,0,.16,.1,T.white)),e==="road"&&(I(i,.29,.25,.04,.22,.3,.15,T.walnut),I(i,.29,.44,.04,.12,.035,.05,T.gold)),e==="family"&&(I(i,0,.46,-.17,.3,.34,.17,T.rust),I(i,.27,.38,.05,.07,.2,.07,T.teal)),e==="points"&&(I(i,-.26,.4,.09,.15,.23,.025,T.white),I(i,-.26,.44,.11,.11,.04,.01,T.teal)),e==="hunter"&&(I(i,.24,.48,.12,.1,.18,.025,T.black),I(i,.24,.49,.138,.07,.12,.01,T.screen)),e==="forum"&&(Rn(i,0,1.01,-.01,.21,.07,.18,T.navy),I(i,0,.99,.17,.2,.025,.16,T.navy),I(i,-.25,.42,.08,.15,.23,.04,T.black)),e==="creator"){I(i,0,.5,.16,.2,.13,.12,T.black);const c=$e(i,0,.5,.26,.065,.1,T.black);c.rotation.x=Math.PI/2,I(i,0,.63,.13,.025,.18,.02,T.walnut)}if(e==="proposal")for(const c of[-.07,0,.07])Rn(i,c+.23,.49,.08,.065,.08,.065,T.rust),I(i,c+.23,.35,.08,.015,.21,.015,T.green);if(e==="planner"&&(I(i,-.24,.47,.08,.19,.27,.04,T.teal),I(i,0,.54,.12,.08,.11,.015,T.white)),e==="whale"&&(I(i,0,.59,.12,.04,.09,.025,T.gold),I(i,.2,.36,.055,.08,.04,.09,T.gold),Rn(i,0,.96,-.04,.2,.075,.18,T.hair)),e==="auditplus"&&(I(i,-.24,.47,.09,.19,.26,.04,T.walnut),I(i,-.24,.49,.12,.14,.19,.012,T.white),I(i,.23,.45,.09,.012,.17,.012,T.gold)),t==="house"){I(i,.43,.36,.2,.4,.55,.4,T.navy),I(i,.43,.68,.2,.45,.05,.45,T.gold);for(let c=0;c<3;c++)I(i,.43,.75+c*.065,.2,.32,.06,.3,T.white);for(const c of[.28,.58])Rn(i,c,.08,.2,.07,.07,.07,T.black)}if(t==="engineering"&&(I(i,.3,.35,.05,.24,.2,.16,T.rust),I(i,.3,.5,.05,.13,.035,.04,T.gold),$e(i,0,1,0,.21,.07,T.gold)),t==="fnb"){I(i,.4,.35,.2,.4,.08,.5,T.gold),I(i,.4,.62,.2,.4,.08,.5,T.gold);for(const c of[.28,.5])$e(i,c,.73,.2,.09,.15,T.white);$e(i,0,1,0,.17,.15,T.white)}return ba(i,0,0,.47,.3),{group:i,left:l,right:o}}function f_(n,e,t=0){if(n.navigation){const l=n.navigation;l.elapsed=Math.min(l.duration,l.elapsed+t);const o=l.duration?l.elapsed/l.duration*(l.points.length-1):l.points.length-1,c=Math.min(l.points.length-1,Math.floor(o)),u=l.points[c],d=l.points[Math.min(c+1,l.points.length-1)],f=n.group.position.clone();n.group.position.lerpVectors(u,d,o-c);const h=n.group.position.x-f.x,p=n.group.position.z-f.z,v=Math.hypot(h,p)>1e-4;v&&(n.group.rotation.y=Math.atan2(h,p));const g=v?Math.sin(e*7+n.phase)*.28:0;n.left.rotation.x=g,n.right.rotation.x=-g;return}const i=n.end-n.start,r=(Math.sin(e*.28+n.phase)+1)/2,s=n.walking?n.start+r*i:n.start;n.group.position.set(s,n.floorY+(n.walking?Math.abs(Math.sin(e*3.5+n.phase))*.018:0),n.z),n.group.rotation.y=n.walking?Math.cos(e*.28+n.phase)>0?.32:-.32:0;const a=n.walking?Math.sin(e*4+n.phase)*.32:0;n.left.rotation.x=a,n.right.rotation.x=-a}function fu(n){const e=[],t=new Map;return n.floors.forEach((i,r)=>{const s=r*vr;t.set(i.id,s),i.entityIds.forEach((a,l)=>{const o=n.entities[a].kind==="room",c=o?mf[l]:0;e.push({id:a,floorId:i.id,position:new F(c,s,0),label:new F(o?c-1.97:-6.92,s+(i.role==="rooftop"?.37:2.02),1.81)})})}),{entities:e,floorY:t,height:(n.floors.length-1)*vr+3.6}}function h_(n,e,t){const i=new _t(new Xi(e,t),new Wi({visible:!1}));return i.position.set(0,1.15,1.98),i.userData={interactive:!0,entityId:n},i}function p_(n,e){return n.intersectObjects(e,!1)[0]?.object.userData.entityId??null}function m_(n){const e=new _t(new Mi(4.7,2.38,3.1),new Wi({visible:!1}));return e.position.y=1.25,e.userData={interactive:!0,entityId:n},e.layers.set(1),e}const yd="room-201",Zr={wall:.13,eye:[-6.5,7.1,8.5]};function g_(n,e){return e&&n.status!=="unbuilt"&&!n.construction}function Sd(n){const e=n.searchParams;return{enabled:e.get("visual")==="diorama"||n.pathname.includes("diorama")&&e.get("visual")!=="original",inspect:e.get("view")==="room",low:e.get("quality")==="low",diagnostics:e.get("diagnostics")==="1",inspectRoom:e.get("room")??yd}}function v_(n,e){if(n.pathname.includes("regency-preview"))return e+"_regency_p3";const t=Sd(n);return n.pathname.includes("diorama")||t.enabled?e+"_diorama_p1":e}const __={id:"hyatt-place-shenzhen-dongmen-king"},x_={id:"hyatt-regency-shenzhen-airport-regency-suite-84sqm"},ds=new Map;function hu(n){let e=ds.get(n);if(e)return e;const t=128,i=new Uint8Array(t*t*4);for(let r=0;r<t;r++)for(let s=0;s<t;s++){const a=(r*t+s)*4,l=Math.sin(s*12.9898+r*78.233)*43758.5453%1,o=n==="oak"?224+11*Math.sin(s*.23+Math.sin(r*.06)*.8)+l*7:n==="linen"?239+(s%3===0?-9:2)+(r%3===0?-6:2)+l*3:n==="rug"?224+(s%4===0||r%4===0?-19:8):244+l*7;i[a]=i[a+1]=i[a+2]=Math.max(0,Math.min(255,o));const c=Math.hypot((s-t/2)/(t/2),(r-t/2)/(t/2));i[a+3]=n==="contact"?Math.round(Math.pow(Math.max(0,1-c),2)*140):255}return e=new ma(i,t,t),e.colorSpace=Xt,e.wrapS=e.wrapT=n==="contact"?Ln:ss,e.magFilter=Ot,e.minFilter=mi,e.generateMipmaps=!0,e.needsUpdate=!0,ds.set(n,e),e}let na;function b_(){const n=(e,t=.8,i)=>new ct({color:e,roughness:t,...i?{map:hu(i)}:{}});return{oak:n(7623736,.73,"oak"),edge:n(6771265,.78,"oak"),walnut:n(4798508,.72,"oak"),wall:n(14934230,.94,"plaster"),sage:n(14144712,.94,"plaster"),linen:n(16250349,.97,"linen"),upholstery:n(11183770,.96,"linen"),throw:n(9206110,.97,"linen"),rug:n(11184287,1,"rug"),ceramic:n(15130575,.66),terracotta:n(12028269,.91),leaf:n(5732174,.92),leafLight:n(8230493,.95),soil:n(6772551,1),brass:new ct({color:11045461,metalness:.65,roughness:.48}),chrome:new ct({color:10922925,metalness:.72,roughness:.36}),headboard:n(7692370,.9,"linen"),darkFrame:n(2895921,.6),olive:n(7763022,.96,"linen"),stone:n(13025459,.56,"plaster"),suiteWall:n(15328476,.93,"plaster"),suiteTile:n(14143942,.76,"plaster"),suiteStone:n(13090737,.55,"plaster"),suiteWood:n(7031346,.67,"oak"),suiteCurtain:n(14274754,.96,"linen"),suiteUpholstery:n(10393483,.95,"linen"),suiteAccent:n(9204055,.93,"linen"),suiteGlass:new ct({color:13031383,roughness:.24,transparent:!0,opacity:.28,depthWrite:!1}),suiteMirror:new ct({color:12897998,metalness:.55,roughness:.22}),accentFabric:n(7959915,.96,"linen"),floralRed:n(10899501,.92),floralGold:n(12754002,.92),glass:new ct({color:11717840,roughness:.35,transparent:!0,opacity:.23,depthWrite:!1}),window:new ct({color:14279903,roughness:.7,emissive:11911857,emissiveIntensity:.16}),lamp:new ct({color:15916461,roughness:.95,emissive:15644536,emissiveIntensity:.32}),ink:n(3490620,.92),paper:n(15524559,.94),art:n(12098933,.9),book:n(9136212,.9),contact:new Wi({color:6708813,map:hu("contact"),transparent:!0,opacity:.45,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1})}}function Qn(){return na??=b_()}function M_(){na&&Object.values(na).forEach(n=>n.dispose()),ds.forEach(n=>n.dispose()),ds.clear(),na=void 0}function y_(){return ds.size*128*128*4*4/3}const Wr=new F;function on(n,e,t,i,r,s){const a=2*Math.PI*r/4,l=Math.max(s-2*r,0),o=Math.PI/4;Wr.copy(e),Wr[i]=0,Wr.normalize();const c=.5*a/(a+l),u=1-Wr.angleTo(n)/o;return Math.sign(Wr[t])===1?u*c:l/(a+l)+c+c*(1-u)}class kl extends Mi{constructor(e=1,t=1,i=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(e/2,t/2,i/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:r,radius:s},a===1)return;const l=this.toNonIndexed();this.index=null,this.attributes.position=l.attributes.position,this.attributes.normal=l.attributes.normal,this.attributes.uv=l.attributes.uv;const o=new F,c=new F,u=new F(e,t,i).divideScalar(2).subScalar(s),d=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,p=d.length/6,v=new F,g=.5/a;for(let m=0,b=0;m<d.length;m+=3,b+=2)switch(o.fromArray(d,m),c.copy(o),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[m+0]=u.x*Math.sign(o.x)+c.x*s,d[m+1]=u.y*Math.sign(o.y)+c.y*s,d[m+2]=u.z*Math.sign(o.z)+c.z*s,f[m+0]=c.x,f[m+1]=c.y,f[m+2]=c.z,Math.floor(m/p)){case 0:v.set(1,0,0),h[b+0]=on(v,c,"z","y",s,i),h[b+1]=1-on(v,c,"y","z",s,t);break;case 1:v.set(-1,0,0),h[b+0]=1-on(v,c,"z","y",s,i),h[b+1]=1-on(v,c,"y","z",s,t);break;case 2:v.set(0,1,0),h[b+0]=1-on(v,c,"x","z",s,e),h[b+1]=on(v,c,"z","x",s,i);break;case 3:v.set(0,-1,0),h[b+0]=1-on(v,c,"x","z",s,e),h[b+1]=1-on(v,c,"z","x",s,i);break;case 4:v.set(0,0,1),h[b+0]=1-on(v,c,"x","y",s,e),h[b+1]=1-on(v,c,"y","x",s,t);break;case 5:v.set(0,0,-1),h[b+0]=on(v,c,"x","y",s,e),h[b+1]=1-on(v,c,"y","x",s,t);break}}static fromJSON(e){return new kl(e.width,e.height,e.depth,e.segments,e.radius)}}const Ar=new Map;function Ur(n,e){let t=Ar.get(n);return t||(t=e(),Ar.set(n,t)),t}function Nr(n,e,t,i,r=0,s=0,a=0){const l=new _t(t,i);return l.name=e,l.position.set(r,s,a),l.castShadow=!0,l.receiveShadow=!0,l.userData.diorama=!0,l.layers.enable(1),n.add(l),l}function B(n,e,t,i,r,s,a,l,o,c=.045){const u=Math.min(c,Math.min(s,a,l)*.45),d=`round:${s}:${a}:${l}:${u}`;return Nr(n,e,Ur(d,()=>new kl(s,a,l,2,u)),o,t,i,r)}function Qe(n,e,t,i,r,s,a,l,o=s){return Nr(n,e,Ur(`cyl:${s}:${o}:${a}`,()=>new Lr(o,s,a,20)),l,t,i,r)}function Wn(n,e,t,i,r,s,a,l,o){const c=Nr(n,e,Ur("oval",()=>new us(1,16,10)),o,t,i,r);return c.scale.set(s,a,l),c}function ua(n,e,t,i,r,s=.103){const a=Nr(n,"soft-contact",Ur("plane",()=>new Xi(1,1)),Qn().contact,e,s,t);return a.rotation.x=-Math.PI/2,a.scale.set(i,r,1),a.castShadow=!1,a.receiveShadow=!1,a}function S_(n,e,t,i,r=.25){const s=Qn(),a=Ur("vase",()=>new Fl([new Oe(.2,0),new Oe(.38,.1),new Oe(.42,.45),new Oe(.24,.7),new Oe(.2,.9),new Oe(.23,.93)],20)),l=Nr(n,"ceramic-vase",a,s.ceramic,e,t,i);return l.scale.setScalar(r),l}function E_(n,e,t,i){const r=Qn();Qe(n,"lamp-foot",e,t+.018,i,.105,.035,r.brass),Qe(n,"lamp-stem",e,t+.15,i,.014,.28,r.brass);const s=Nr(n,"linen-lampshade",Ur("lamp-shade",()=>new Lr(.105,.17,.21,24,1,!0)),r.linen,e,t+.33,i);s.castShadow=!1,Qe(n,"warm-diffuser",e,t+.235,i,.14,.012,r.lamp)}function w_(n){n.updateMatrixWorld(!0);const e=n.matrixWorld.clone().invert(),t=new Map;n.traverse(i=>{if(!(i instanceof _t)||i instanceof Er||i.userData.interactive||Array.isArray(i.material)||i.material.transparent||i.userData.dynamic)return;let r=i.parent;for(;r&&r!==n;){if(r.userData.dynamic)return;r=r.parent}const s=i.geometry.uuid+i.material.uuid;let a=t.get(s);a||(a={g:i.geometry,m:i.material,items:[]},t.set(s,a)),a.items.push(i)});for(const i of t.values()){if(i.items.length<2)continue;const r=new Er(i.g,i.m,i.items.length);r.name="diorama-batch",r.userData.diorama=!0,r.layers.enable(1),i.items.forEach((s,a)=>r.setMatrixAt(a,new dt().multiplyMatrices(e,s.matrixWorld))),r.castShadow=!0,r.receiveShadow=!0,r.computeBoundingSphere(),i.items.forEach(s=>s.removeFromParent()),n.add(r)}}function T_(){Ar.forEach(n=>n.dispose()),Ar.clear()}function A_(){let n=0,e=0;return Ar.forEach(t=>{n+=(t.index?.count??t.attributes.position.count)/3,Object.values(t.attributes).forEach(i=>e+=i.array.byteLength),e+=t.index?.array.byteLength??0}),{unique:Ar.size,triangles:n,bytes:e}}function Bl(n){const e=qn(n),t=hl(n),i=Math.max(1,Math.min(5,Math.floor(n.level??1))),r=e==="suite"||e==="premium",s=e==="premium";return{category:e,bed:t,level:i,suite:r,premium:s,windowWidth:e==="standard"?1.8:2.3,features:["photo-led-base",...r?["regency-suite-84m2","separate-bathroom","entry-wardrobe","suite-zoning"]:[],t==="twin"?"twin-beds":"king-bed",e==="standard"?"window-chaise":"wide-view-window",...r?["suite-sofa","coffee-table","slatted-divider"]:[],...s?["premium-stonework","reading-lamp"]:[],...i>=2?["tailored-bedding","stitched-headboard"]:[],...i>=3?["reading-lamp","layered-upholstery","carpet-border"]:[],...i>=4?["stone-vanity","backlit-mirror"]:[],...i>=5?["ceiling-cove","gallery-pair","fluted-casework"]:[]]}}function R_(n){const e=Bl(n);return[e.category,e.bed,e.level,n.status==="dirty"?"dirty":"ready"].join(":")}function C_(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},l=n[0].morphTargetsRelative,o=new rn;let c=0;for(let u=0;u<n.length;++u){const d=n[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!i.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;s[h]===void 0&&(s[h]=[]),s[h].push(d.attributes[h]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(l!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!r.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;o.addGroup(c,h,u),c+=h}}if(t){let u=0;const d=[];for(let f=0;f<n.length;++f){const h=n[f].index;for(let p=0;p<h.count;++p)d.push(h.getX(p)+u);u+=n[f].attributes.position.count}o.setIndex(d)}for(const u in s){const d=pu(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;o.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d!==0){o.morphAttributes=o.morphAttributes||{},o.morphAttributes[u]=[];for(let f=0;f<d;++f){const h=[];for(let v=0;v<a[u].length;++v)h.push(a[u][v][f]);const p=pu(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;o.morphAttributes[u].push(p)}}}return o}function pu(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),l=new fn(a,t,i);let o=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const d=o/t;for(let f=0,h=u.count;f<h;f++)for(let p=0;p<t;p++){const v=u.getComponent(f,p);l.setComponent(f+d,p,v)}}else a.set(u.array,o);o+=u.count*t}return r!==void 0&&(l.gpuType=r),l}const bi=new Map;function mu(n){n.updateMatrixWorld(!0);const e=n.matrixWorld.clone().invert(),t=new Map;n.traverse(i=>{if(!(i instanceof _t)||Array.isArray(i.material)||i.userData.interactive)return;let r=i.parent;for(;r&&r!==n;){if(r.userData.dynamic)return;r=r.parent}const s=i.castShadow&&!i.material.transparent,a=i.material.uuid+":"+s+":"+i.receiveShadow;let l=t.get(a);l||(l={material:i.material,cast:s,receive:i.receiveShadow,items:[]},t.set(a,l)),l.items.push(i)});for(const i of t.values()){if(i.items.length<2)continue;const r=i.items.map(l=>{const o=l.geometry.index?l.geometry.toNonIndexed():l.geometry.clone();return o.applyMatrix4(new dt().multiplyMatrices(e,l.matrixWorld)),o}),s=C_(r,!1);if(r.forEach(l=>l.dispose()),!s)throw Error("Diorama geometry attributes must match");s.userData.templateOwned=!0;const a=new _t(s,i.material);a.name="room-material-batch",a.userData.diorama=!0,a.layers.enable(1),a.castShadow=i.cast,a.receiveShadow=i.receive,s.computeBoundingSphere(),i.items.forEach(l=>l.removeFromParent()),n.add(a)}}function P_(n,e){let t=bi.get(n);if(!t){t=e();for(const i of t.children)i instanceof et&&i.userData.dynamic&&mu(i);mu(t),t.userData.templateKey=n,bi.set(n,t)}return t.clone(!0)}function Ed(n){const e=new Set;n.traverse(t=>{t instanceof _t&&t.geometry.userData.templateOwned&&e.add(t.geometry)}),e.forEach(t=>t.dispose())}function I_(n){for(const[e,t]of bi)n.has(e)||(Ed(t),bi.delete(e))}function L_(){bi.forEach(Ed),bi.clear()}function D_(){const n=new Set;bi.forEach(t=>t.traverse(i=>{i instanceof _t&&n.add(i.geometry)}));let e=0;return n.forEach(t=>{Object.values(t.attributes).forEach(i=>e+=i.array.byteLength),e+=t.index?.array.byteLength??0}),{templates:bi.size,geometries:n.size,geometryBytes:e}}function fr(n,e,t){const i=new et;return i.name=e,i.userData.zone=t,n.add(i),i}function so(n,e,t,i,r,s){const a=Qn(),l=new et;l.name=s,l.position.set(1.12,0,t),l.rotation.y=-Math.PI/2,n.add(l),B(l,"regency-bed-base",0,.31,.05,i,.26,1.95,a.suiteWood,.045),B(l,"regency-mattress",0,.5,.06,i+.04,.17,1.9,a.linen,.055),B(l,"regency-duvet",0,.64,.28,i+.06,.13,1.55,e.status==="dirty"?a.rug:a.linen,.045),B(l,"regency-duvet-foot-drop",0,.52,1.03,i+.02,.28,.08,a.linen,.025);for(const u of[-i/2+.035,i/2-.035])B(l,"regency-duvet-side-drop",u,.48,.3,.07,.31,1.48,a.linen,.022);B(l,"regency-upholstered-headboard",0,.87,-.94,i+.1,1.17,.1,a.suiteUpholstery,.04),B(l,"regency-headboard-walnut-cap",0,1.46,-.94,i+.15,.055,.13,a.suiteWood,.018);const o=i>.95?.41:.17,c=i>.95?.32:.14;for(const u of[-o,o])Wn(l,"regency-rear-pillow",u,.78,-.59,c,.09,.22,a.linen),Wn(l,"regency-front-pillow",u,.85,-.49,c*.92,.085,.2,a.linen);if(B(l,"regency-folded-top-sheet",0,.755,-.17,i+.015,.045,.23,a.paper,.018),r>=2&&(B(l,"regency-tailored-bed-runner",0,.782,.7,i+.07,.035,.31,a.suiteAccent,.015),Wn(l,"regency-decorative-cushion",0,.88,-.31,i*.17,.095,.065,a.suiteUpholstery)),r>=5)for(let u=0;u<8;u++)B(l,"regency-fluted-bed-base",-i*.42+u*i*.84/7,.31,1.045,.025,.17,.02,a.suiteWood,.005);return ua(l,0,0,i+.28,2.2,.105),l}function U_(n){const e=new et,t=Qn(),i=Bl(n);e.name="hyatt-regency-regency-suite",e.userData={entityId:n.id,diorama:!0,reference:x_.id,suitePrototype:"regency-suite-84sqm",visual:i,bedCount:i.bed==="twin"?2:1},B(e,"architectural-plinth",0,.015,0,4.7,.14,3.1,t.edge,.025),B(e,"suite-stone-floor",0,.105,0,4.58,.04,2.98,t.suiteTile,.012),B(e,"suite-bedroom-carpet",1.1,.132,.28,2.25,.025,1.72,t.rug,.012),B(e,"suite-living-rug",-1,.132,.2,2.05,.025,1.86,t.suiteAccent,.012),B(e,"suite-living-rug-inlay",-1,.148,.2,1.95,.008,1.76,t.rug,.006),B(e,"suite-bathroom-floor-tile",1.25,.133,-1.08,1.9,.025,.78,t.suiteTile,.008);const r=new et;r.name="cutaway-rear-wall",r.userData.dynamic=!0,e.add(r);const s=-1.05,a=2.25,l=s-a/2,o=s+a/2;B(r,"suite-rear-wall-left",(-2.35+l)/2,1.25,-1.52,l+2.35,2.38,.13,t.suiteWall,.014),B(r,"suite-rear-wall-right",(o+2.35)/2,1.25,-1.52,2.35-o,2.38,.13,t.suiteWall,.014),B(r,"suite-rear-wall-header",s,2.31,-1.52,a,.14,.13,t.suiteWall,.012),B(r,"suite-rear-wall-low-sill",s,.22,-1.52,a,.2,.13,t.suiteWall,.012);const c=new et;c.name="suite-window-assembly",e.add(c),B(c,"suite-window-reveal",s,1.27,-1.465,a+.04,2.02,.07,t.darkFrame,.012),B(c,"suite-window-view",s,1.27,-1.425,a-.08,1.92,.018,t.window,.003),B(c,"suite-window-glazing",s,1.27,-1.405,a-.1,1.9,.012,t.suiteGlass,.003);for(const S of[l+.04,s,o-.04])B(c,"suite-window-mullion",S,1.27,-1.38,.04,1.98,.045,t.darkFrame,.006);B(c,"suite-window-crossbar",s,.96,-1.378,a-.04,.04,.045,t.darkFrame,.006),B(c,"suite-window-valance",s,2.22,-1.32,a+.08,.13,.14,t.suiteWall,.012);for(let S=0;S<5;S++)B(c,"suite-left-curtain-fold",l-.02+S*.045,1.25,-1.24,.035,1.82,.12,t.suiteCurtain,.012),B(c,"suite-right-curtain-fold",o+.02-S*.045,1.25,-1.24,.035,1.82,.12,t.suiteCurtain,.012);B(c,"suite-window-sill",s,.29,-1.25,a+.08,.06,.28,t.suiteWood,.012);const u=new et;u.name="cutaway-side-wall",u.userData.dynamic=!0,e.add(u),B(u,"suite-warm-side-wall",2.32,1.25,0,.13,2.38,3.1,t.suiteWall,.016),B(u,"suite-dark-timber-skirting",2.235,.18,0,.045,.12,2.97,t.suiteWood,.009);const d=fr(e,"suite-entry-wardrobe-zone","entry-and-wardrobe");B(d,"suite-entry-wardrobe-cabinet",-2.02,.84,.05,.45,1.45,.72,t.suiteWood,.02);for(const S of[-2.14,-1.93])B(d,"suite-wardrobe-door-panel",S,.84,.425,.18,1.28,.025,t.oak,.008),Qe(d,"suite-wardrobe-handle",S+.055,.84,.45,.009,.12,t.brass);B(d,"suite-entry-door-panel",-1.8,.98,1.42,.82,1.88,.04,t.walnut,.018);for(const S of[-2.26,-1.34])B(d,"suite-entry-door-jamb",S,1.02,1.42,.055,2.04,.08,t.suiteWood,.01);B(d,"suite-entry-door-header",-1.8,2.035,1.42,.98,.055,.08,t.suiteWood,.01),Qe(d,"suite-entry-door-handle",-1.48,.98,1.38,.018,.12,t.brass);const f=fr(e,"suite-living-zone","living-room");B(f,"suite-sofa-wooden-plinth",-1,.31,.16,1.5,.2,.68,t.suiteWood,.035),B(f,"suite-sofa-seat-cushion",-1,.46,.19,1.43,.16,.64,t.suiteUpholstery,.065),B(f,"suite-sofa-back-cushion",-1,.77,-.1,1.43,.48,.18,t.suiteUpholstery,.06);for(const S of[-1.65,-.35])B(f,"suite-sofa-arm",S,.59,.17,.18,.38,.7,t.suiteUpholstery,.055),B(f,"suite-sofa-back-panel",S,.78,-.08,.28,.42,.13,t.suiteUpholstery,.045);B(f,"suite-sofa-seat-seam",-1,.55,.2,.02,.015,.48,t.suiteAccent,.004);for(let S=0;S<3;S++){const y=-1.48+S*.46;B(f,"suite-sofa-throw-pillow",y,.74,-.005,.3,.23,.09,S===1?t.paper:t.suiteAccent,.035)}const h=new et;h.name="suite-window-chaise",h.position.set(-1.12,0,-.88),f.add(h),B(h,"suite-chaise-plinth",0,.23,0,1.28,.15,.5,t.suiteWood,.025),B(h,"suite-chaise-seat",0,.42,.02,1.24,.24,.48,t.suiteUpholstery,.055),B(h,"suite-chaise-back",0,.65,-.18,1.22,.35,.12,t.suiteUpholstery,.045),B(h,"suite-chaise-cushion",.22,.59,.02,.3,.12,.09,t.paper,.03),B(f,"suite-coffee-table-top",-.98,.43,.72,.84,.07,.44,t.suiteStone,.025);for(const S of[-1.28,-.68])for(const y of[.57,.87])Qe(f,"suite-coffee-table-leg",S,.27,y,.022,.31,t.brass);S_(f,-.99,.49,.7,.12),Qe(f,"suite-coffee-cup",-.69,.48,.69,.035,.07,t.linen,.038),B(f,"suite-side-table",-1.9,.4,-.25,.38,.07,.34,t.suiteWood,.018),E_(f,-1.9,.45,-.25),ua(f,-1,.15,1.75,1.25,.105);const p=fr(e,"suite-dining-zone","dining");Qe(p,"suite-round-dining-table-top",-1.76,.52,.79,.29,.055,t.suiteStone,.29),Qe(p,"suite-round-dining-table-pedestal",-1.76,.3,.79,.055,.42,t.suiteWood),B(p,"suite-dining-chair-left-seat",-2.04,.39,1.14,.36,.1,.34,t.suiteUpholstery,.035),B(p,"suite-dining-chair-left-back",-2.04,.65,1.29,.36,.42,.08,t.suiteUpholstery,.035),B(p,"suite-dining-chair-right-seat",-1.48,.39,1.14,.36,.1,.34,t.suiteUpholstery,.035),B(p,"suite-dining-chair-right-back",-1.48,.65,1.29,.36,.42,.08,t.suiteUpholstery,.035);const v=fr(e,"suite-bedroom-zone","bedroom");B(v,"suite-continuous-walnut-headwall",2.17,.9,.25,.14,1.45,2.56,t.suiteWood,.018),i.bed==="twin"?(so(v,n,-.42,.76,i.level,"suite-twin-bed-left"),so(v,n,.42,.76,i.level,"suite-twin-bed-right")):so(v,n,.28,1.72,i.level,"suite-king-bed");for(const S of[-1.02,1.28])B(v,"suite-bedside-table",1.95,.4,S,.4,.48,.34,t.suiteWood,.018),B(v,"suite-bedside-drawer",1.95,.48,S+.18,.32,.13,.025,t.oak,.008),Qe(v,"suite-bedside-lamp-base",1.95,.65,S,.095,.025,t.brass),Qe(v,"suite-bedside-lamp-stem",1.95,.77,S,.012,.23,t.brass),B(v,"suite-bedside-lamp-shade",1.95,.91,S,.18,.16,.17,t.lamp,.025);B(v,"suite-headboard-art-frame",2.15,1.93,.25,.055,.42,.72,t.suiteWood,.012),B(v,"suite-headboard-art-canvas",2.115,1.93,.25,.018,.35,.64,t.suiteAccent,.006);for(let S=0;S<5;S++)B(v,"suite-headboard-art-panel",2.101,1.88,.02+S*.115,.012,.18,.085,S%2?t.paper:t.brass,.004);const g=fr(e,"suite-slatted-divider-zone","open-divider");B(g,"suite-divider-bottom-rail",-.08,.32,.04,.07,.07,1,t.suiteWood,.012),B(g,"suite-divider-top-rail",-.08,1.72,.04,.07,.055,1,t.suiteWood,.01);for(let S=0;S<8;S++)B(g,"suite-divider-wood-slat",-.08,1.02,-.42+S*.13,.045,1.35,.045,t.suiteWood,.008);const m=fr(e,"suite-bathroom-zone","bathroom");B(m,"suite-vanity-cabinet",1,.43,-1.33,.68,.55,.26,t.suiteWood,.018),B(m,"suite-vanity-stone-counter",1,.73,-1.33,.75,.06,.32,t.suiteStone,.02),B(m,"suite-wash-basin",1,.78,-1.32,.34,.045,.19,t.linen,.04),Qe(m,"suite-vanity-faucet",1.2,.89,-1.34,.012,.2,t.brass),B(m,"suite-vanity-mirror-backlight",1,1.36,-1.46,.74,.84,.025,t.lamp,.025),B(m,"suite-vanity-mirror",1,1.36,-1.435,.64,.74,.018,t.suiteMirror,.018),B(m,"suite-bathtub-shell",1.58,.3,-.93,.83,.34,.46,t.linen,.06),B(m,"suite-bathtub-basin",1.58,.475,-.93,.67,.045,.33,t.suiteStone,.055),Qe(m,"suite-bathtub-faucet",1.94,.63,-1.02,.012,.25,t.brass),B(m,"suite-toilet-base",.45,.29,-.91,.31,.32,.39,t.linen,.07),B(m,"suite-toilet-seat",.45,.46,-.91,.32,.055,.4,t.suiteStone,.065),B(m,"suite-toilet-tank",.45,.5,-1.24,.29,.4,.13,t.linen,.02),B(m,"suite-bathroom-glass-partition",1.28,1.03,-.64,1.82,1.78,.022,t.suiteGlass,.008);for(const S of[.38,2.18])B(m,"suite-bathroom-glass-support",S,1.03,-.64,.025,1.82,.04,t.brass,.006);B(m,"suite-bathroom-glass-top-rail",1.28,1.95,-.64,1.84,.035,.04,t.brass,.008),Qe(m,"suite-shower-pipe",2.08,1.42,-1.04,.014,.44,t.brass);const b=Qe(m,"suite-shower-head",2,1.63,-1.04,.065,.025,t.brass);if(b.rotation.z=Math.PI/2,i.level>=4&&(B(m,"suite-upgraded-vanity-stone-inlay",1,.765,-1.33,.54,.018,.22,t.suiteAccent,.008),B(m,"suite-mirror-light-trim",1,1.36,-1.475,.79,.89,.018,t.lamp,.018)),i.level>=3){Qe(f,"suite-floor-lamp-base",-1.82,.16,-.57,.14,.035,t.brass),Qe(f,"suite-floor-lamp-stem",-1.82,.88,-.57,.016,1.4,t.brass),B(f,"suite-floor-lamp-shade",-1.82,1.62,-.57,.25,.18,.25,t.lamp,.045);for(const S of[-2.06,.06])B(e,"suite-carpet-edge-long",S,.15,.28,.018,.01,1.65,t.suiteAccent,.003);for(const S of[-.54,1.1])B(e,"suite-carpet-edge-short",-1,.15,S,1.95,.01,.018,t.suiteAccent,.003)}if(i.level>=5){for(const S of[-1.31,1.34])B(e,"suite-ceiling-cove-light",0,2.27,S,4.28,.028,.045,t.lamp,.009);for(let S=0;S<7;S++)B(d,"suite-fluted-wardrobe-panel",-2.25,.84,-.25+S*.09,.018,1.22,.025,t.oak,.004);for(const S of[-.4,.48])B(v,"suite-gallery-frame",2.15,1.83,S,.045,.32,.26,t.suiteWood,.008),B(v,"suite-gallery-art",2.12,1.83,S,.018,.25,.19,t.brass,.004)}return e}function N_(n){const e=P_(R_(n),()=>F_(n));return e.name=n.id,e.userData.entityId=n.id,e.userData.status=n.status,O_(e,n),e}function F_(n){const e=Bl(n);if(e.suite)return U_(n);const t=new et,i=Qn();t.name=n.id,t.userData={entityId:n.id,diorama:!0,reference:__.id,visual:e,bedCount:e.bed==="twin"?2:1},B(t,"architectural-plinth",0,.015,0,4.7,.14,3.1,i.edge,.025),B(t,"wall-to-wall-grey-carpet",0,.106,0,4.58,.04,2.98,i.rug,.012);const r=new et;r.name="cutaway-rear-wall",r.userData.dynamic=!0,t.add(r);const s=-1.05,a=e.windowWidth,l=s-a/2,o=s+a/2;B(r,"plaster-rear-wall",(o+2.35)/2,1.25,-1.52,2.35-o,2.38,Zr.wall,i.wall,.016),B(r,"window-side-pier",(-2.35+l)/2,1.25,-1.52,l+2.35,2.38,Zr.wall,i.wall,.014),B(r,"window-header",s,2.33,-1.52,a,.22,Zr.wall,i.wall,.014),B(r,"window-low-sill",s,.22,-1.52,a,.2,Zr.wall,i.wall,.014),B(r,"window-reveal",s,1.26,-1.47,a+.04,2.05,.09,i.darkFrame,.012),B(r,"daylit-window",s,1.26,-1.42,a-.08,1.94,.018,i.window,.003),B(r,"window-glazing",s,1.26,-1.399,a-.09,1.93,.012,i.glass,.003);for(const b of[l+.04,s,o-.04])B(r,"black-window-mullion",b,1.26,-1.368,.045,2,.05,i.darkFrame,.006);B(r,"window-crossbar",s,.92,-1.364,a-.03,.045,.055,i.darkFrame,.006),B(r,"roller-blind-valance",s,2.19,-1.31,a+.08,.16,.14,i.wall,.012);for(let b=0;b<5;b++)Qe(r,"neutral-curtain-fold",l+.02+b*.047,1.28,-1.23,.046,1.8,i.upholstery);B(r,"dark-window-sill",s,.29,-1.26,a+.08,.06,.29,e.premium?i.stone:i.walnut,.015);const c=new et;c.name="cutaway-side-wall",c.userData.dynamic=!0,t.add(c),B(c,"warm-plaster-side-wall",2.32,1.25,0,.13,2.38,3.1,i.wall,.016),B(c,"dark-timber-skirting",2.235,.18,0,.045,.12,2.97,i.walnut,.009);const u=new et;u.name=e.bed==="twin"?"hyatt-twin-sleep-zone":"hyatt-king-sleep-zone",u.position.set(1.19,0,.08),u.rotation.y=-Math.PI/2,t.add(u),B(u,"continuous-walnut-headwall",0,.87,-1.045,2.72,1.42,.16,i.walnut,.018);for(const b of e.bed==="twin"?[-.5,.5]:[0])B(u,"upholstered-headboard",b,.82,-.942,e.bed==="twin"?.9:1.9,1.22,.08,i.headboard,.035);B(u,"headboard-backlight",0,1.446,-.932,1.96,.025,.025,i.lamp,.006);for(const b of e.bed==="twin"?[-.5,.5]:[0]){const S=e.bed==="twin"?.82:1.82,y=new et;y.name="sleeping-bed",y.userData.bedWidth=S,y.position.x=b,u.add(y),B(y,"hotel-bed-base",0,.32,.08,S,.28,2.02,i.headboard,.055),ua(y,0,.08,S+.3,2.4),B(y,"mattress-piping",0,.49,.08,S+.03,.14,1.99,i.linen,.065),B(y,"soft-mattress",0,.56,.08,S+.02,.2,1.96,n.status==="dirty"?i.rug:i.linen,.075);const R=B(y,"white-hotel-duvet",0,.69,.29,S+.08,.14,1.65,i.linen,.058);n.status==="dirty"&&(R.rotation.y=.065);for(const E of[-S/2+.02,S/2-.02])B(y,"white-duvet-drop",E,.51,.31,.07,.33,1.61,i.linen,.025);B(y,"duvet-foot-drop",0,.51,1.05,S+.02,.3,.075,i.linen,.025);for(const E of e.bed==="twin"?[0]:[-.46,.46]){const C=e.bed==="twin"?.34:.43;Wn(y,"rear-stacked-pillow",E,.77,-.65,C,.095,.24,i.linen),Wn(y,"front-stacked-pillow",E,.85,-.57,C,.095,.23,i.linen)}if(B(y,"folded-white-top-sheet",0,.77,-.19,S+.01,.05,.22,i.linen,.02),e.level>=2&&(B(y,"tailored-bed-runner",0,.782,.7,S+.07,.035,.33,i.accentFabric,.015),Wn(y,"decorative-bed-cushion",0,.89,-.36,S*.19,.115,.075,i.upholstery)),e.level>=5)for(let E=0;E<8;E++)B(y,"fluted-bed-base",-S*.43+E*S*.86/7,.32,1.095,.025,.18,.02,i.oak,.006)}if(e.level>=2)for(const b of[.95,1.18])B(u,"stitched-headboard-band",0,b,-.895,1.87,.012,.013,i.upholstery,.004);for(const b of[-1.13,1.13])B(u,"walnut-nightstand",b,.4,-.75,.4,.5,.51,i.walnut,.018),B(u,"nightstand-open-shelf",b,.28,-.478,.33,.12,.015,i.ink,.006),B(u,"nightstand-drawer",b,.51,-.48,.34,.14,.025,i.oak,.009),B(u,"bedside-lamp-base",b,.682,-.75,.2,.025,.13,i.chrome,.008),Qe(u,"bedside-lamp-stem",b,.85,-.75,.013,.32,i.chrome),B(u,"rectangular-linen-lamp",b,1.06,-.75,.29,.2,.17,i.lamp,.018);B(u,"guest-telephone",1.13,.689,-.56,.23,.06,.15,i.darkFrame,.016),B(u,"telephone-handset",1.13,.733,-.57,.23,.04,.05,i.ink,.013);const d=new et;d.name="hyatt-floral-headwall-art",d.position.set(0,1.91,-.97),u.add(d),B(d,"walnut-art-frame",0,0,0,1.83,.53,.045,i.oak,.012),B(d,"warm-abstract-background",0,0,.03,1.74,.44,.012,i.floralRed,.003);for(let b=0;b<6;b++)B(d,"abstract-art-panel",-.72+b*.28,-.08+b%2*.06,.041,.29,.21,.008,b%2?i.floralGold:i.headboard,.003);for(const b of[-.56,-.05,.53]){const S=Qe(d,"floral-art-stem",b,-.02,.053,.007,.29,i.paper);S.rotation.z=-.14;for(let y=0;y<3;y++){const R=Wn(d,"floral-art-leaf",b+(y%2?-.055:.05),-.06+y*.06,.06,.045,.015,.004,i.paper);R.rotation.z=y%2?-.5:.5}}const f=new et;f.name="hyatt-window-chaise",f.position.set(-1.12,0,-.91),t.add(f),B(f,"chaise-timber-plinth",0,.22,0,1.55,.18,.57,i.walnut,.025),B(f,"chaise-upholstered-seat",0,.44,.01,1.54,.28,.59,i.upholstery,.065),B(f,"chaise-side-back",-.65,.73,-.02,.22,.66,.58,i.upholstery,.07);const h=Wn(f,"window-chaise-cushion",-.42,.71,0,.19,.2,.08,i.paper);h.rotation.z=-.18;for(let b=0;b<4;b++)B(f,"striped-accent-cushion",-.42,.6+b*.06,.085,.29,.025,.012,b%2?i.olive:i.headboard,.004);if(ua(t,-1.12,-.91,1.85,.85),e.suite){B(f,"suite-sofa-back",0,.75,-.24,1.54,.5,.17,i.upholstery,.065),B(f,"suite-sofa-arm",.68,.65,0,.17,.4,.58,i.upholstery,.055),B(f,"sofa-seat-seam",0,.586,.02,.018,.015,.45,i.headboard,.004),B(t,"suite-coffee-table",-.67,.49,-.29,.66,.07,.43,e.premium?i.stone:i.walnut,.035);for(const b of[-.92,-.42])Qe(t,"coffee-table-leg",b,.32,-.29,.025,.31,i.chrome);for(let b=0;b<4;b++)B(t,"suite-slat-divider",.3,1.02,-1.15+b*.12,.04,1.75,.045,i.walnut,.008)}const p=new et;p.name="hyatt-media-work-center",p.position.set(-2.02,0,.08),p.rotation.y=Math.PI/2,t.add(p),B(p,"continuous-media-worktop",0,.84,0,1.74,.085,.54,e.premium?i.stone:i.walnut,.018);for(const b of[-.77,.77])B(p,"desk-pedestal",b,.48,0,.16,.65,.47,i.walnut,.012);B(p,"mini-fridge-door",-.58,.5,-.018,.28,.48,.46,i.walnut,.012),B(p,"tv-stand-base",-.32,.908,-.1,.37,.035,.21,i.darkFrame,.009),Qe(p,"tv-stand-neck",-.32,1.02,-.1,.022,.22,i.chrome);const v=new et;v.name="swiveling-hotel-TV",v.position.set(-.32,0,-.11),v.rotation.y=-.85,p.add(v),B(v,"flat-screen-TV",0,1.3,0,.79,.49,.05,i.darkFrame,.015),B(v,"TV-screen",0,1.3,.031,.73,.42,.009,i.ink,.004),B(p,"hospitality-tray",.57,.9,-.1,.45,.035,.28,i.darkFrame,.009),Qe(p,"stainless-kettle",.66,1.025,-.12,.073,.21,i.chrome,.057),B(p,"kettle-handle",.75,1.045,-.12,.065,.14,.04,i.darkFrame,.015);for(const b of[.44,.53])Qe(p,"tea-cup",b,.96,-.03,.032,.08,i.linen,.039);B(p,"desk-lamp-foot",.13,.902,-.12,.14,.02,.11,i.chrome,.008),Qe(p,"desk-lamp-stem",.13,1.09,-.12,.012,.36,i.chrome),B(p,"desk-lamp-head",.13,1.28,-.08,.2,.045,.11,i.chrome,.01);const g=new et;g.name="white-ergonomic-work-chair",g.position.set(-1.27,0,.36),g.rotation.y=-Math.PI/2,t.add(g),Qe(g,"swivel-chair-gas-lift",0,.3,0,.035,.32,i.chrome),B(g,"white-work-chair-seat",0,.48,0,.46,.12,.47,i.linen,.05);const m=B(g,"white-ribbed-chair-back",0,.76,-.21,.45,.56,.095,i.linen,.035);m.rotation.x=-.1;for(let b=0;b<6;b++)B(g,"chair-upholstery-channel",0,.55+b*.075,-.151,.4,.012,.014,i.paper,.004);for(const b of[-.25,.25])B(g,"chrome-chair-arm",b,.62,0,.035,.025,.35,i.chrome,.009),Qe(g,"chair-arm-support",b,.55,-.1,.012,.15,i.chrome);for(let b=0;b<5;b++){const S=b*Math.PI*2/5,y=B(g,"five-star-chair-base",Math.cos(S)*.13,.18,Math.sin(S)*.13,.29,.035,.04,i.chrome,.009);y.rotation.y=-S;const R=Qe(g,"chair-caster",Math.cos(S)*.26,.15,Math.sin(S)*.26,.039,.043,i.darkFrame);R.rotation.z=Math.PI/2}if(e.level>=3||e.premium){Qe(t,"reading-lamp-base",-.3,.17,-.91,.15,.05,i.chrome),Qe(t,"reading-lamp-stem",-.3,.99,-.91,.014,1.65,i.chrome);const b=Qe(t,"reading-lamp-arm",-.45,1.8,-.91,.012,.3,i.chrome);b.rotation.z=Math.PI/2,Qe(t,"reading-lamp-shade",-.6,1.76,-.91,.12,.18,i.lamp,.09)}if(e.level>=3){for(const b of[-2.19,2.19])B(t,"carpet-side-border",b,.13,0,.03,.01,2.8,i.accentFabric,.003);for(const b of[-1.4,1.4])B(t,"carpet-end-border",0,.13,b,4.4,.01,.03,i.accentFabric,.003);Wn(f,"layered-sofa-cushion",.36,.7,-.05,.18,.19,.08,i.accentFabric)}if(e.level>=4&&(B(t,"stone-vanity-cabinet",.84,.45,-1.19,.66,.62,.36,i.walnut,.025),B(t,"stone-vanity-top",.84,.78,-1.19,.72,.065,.4,i.stone,.02),B(t,"wash-basin",.84,.825,-1.17,.35,.06,.23,i.linen,.04),Qe(t,"vanity-faucet",1.07,.91,-1.3,.014,.22,i.chrome),B(r,"backlit-vanity-mirror",.84,1.43,-1.415,.7,.85,.025,i.lamp,.03),B(r,"vanity-mirror-glass",.84,1.43,-1.391,.62,.76,.012,i.glass,.02)),e.level>=5){for(const b of[-1.3,1.35])B(t,"ceiling-cove-light",0,2.27,b,4.4,.03,.045,i.lamp,.01);for(let b=0;b<6;b++)B(p,"fluted-casework",-.65+b*.26,.51,.253,.025,.55,.02,i.oak,.005);for(const b of[-.69,.69])B(c,"gallery-frame",2.239,1.93,b,.045,.45,.42,i.oak,.01),B(c,"gallery-art",2.212,1.93,b,.01,.36,.33,i.floralGold,.004)}return t}function O_(n,e){const t=Qn();if(e.status==="occupied"&&(B(n,"guest-luggage",.74,.34,1.29,.33,.42,.25,t.headboard,.045),B(n,"luggage-handle",.74,.59,1.29,.14,.1,.05,t.chrome,.013)),e.extraBed&&(B(n,"actual-extra-bed",.25,.35,.91,.76,.3,.83,t.walnut,.025),B(n,"extra-bed-linen",.25,.54,.91,.76,.13,.83,t.linen,.045)),e.status==="reserved"&&B(n,"suite-reservation-marker",.8,.31,1.46,.18,.35,.055,e.suaBookingId?t.book:t.chrome,.015),e.status==="cleaning"){B(n,"housekeeping-cart",.66,.37,1.41,.46,.48,.28,t.ink,.03),B(n,"clean-towel-stack",.66,.65,1.41,.41,.12,.26,t.linen,.025);for(const i of[.49,.83])Qe(n,"cart-wheel",i,.13,1.41,.055,.07,t.walnut)}if(e.status==="maintenance"){const i=B(n,"fault-lamp",.79,1.84,1.55,.17,.17,.07,t.lamp,.02);i.userData.interactive=!0,B(n,"engineering-tool-case",.65,.26,.94,.38,.24,.28,t.book,.035)}}function ao(n,e){const t=n.getObjectByName("cutaway-side-wall"),i=n.getObjectByName("cutaway-rear-wall");t&&(t.visible=e.x<2.3),i&&(i.visible=e.z>-1.5)}function k_(n,e,t,i){const r=performance.now();let s,a=0,l=r,o=r;const c=[],u=t?document.createElement("output"):null;return u&&(u.className="diorama-diagnostics",u.setAttribute("aria-label","渲染性能诊断"),Object.assign(u.style,{position:"absolute",left:"8px",bottom:"8px",zIndex:"4",font:"10px/1.5 monospace",color:"#edf2df",background:"#243b32e6",borderRadius:"8px",padding:"8px",pointerEvents:"none",whiteSpace:"pre-line"}),n.append(u)),{tick(d){if(s??=d,a++,c.push(d-o),o=d,c.length>180&&c.shift(),d-l<1e3)return;const f=d-l,h=Math.round(a*1e3/f),p=[...c].sort((m,b)=>m-b),v=e.info,g={quality:i?"low":"standard",fps:h,frameP95Ms:Math.round((p[Math.floor(p.length*.95)]??0)*10)/10,drawCalls:v.render.calls,triangles:v.render.triangles,geometries:v.memory.geometries,textures:v.memory.textures,programs:v.programs?.length??0,sampleGeometry:A_(),roomTemplates:D_(),sampleTextureEstimateBytes:Math.round(y_()),firstFrameMs:Math.round(s-r),dpr:e.getPixelRatio(),gpuBytes:"unknown: WebGL exposes resource counts, not resident VRAM",deviceValidation:"not a substitute for physical-device measurements"};n.dataset.renderMetrics=JSON.stringify(g),u&&(u.textContent=`${h} FPS · p95 ${g.frameP95Ms} ms
${g.drawCalls} draws · ${g.triangles.toLocaleString()} tris
${g.geometries} geo · ${g.textures} tex · DPR ${g.dpr}
first frame ${g.firstFrameMs} ms · ${g.quality}`),a=0,l=d},dispose(){u?.remove(),delete n.dataset.renderMetrics}}}function B_(n,e,t){const i=new Map;let r=!1,s=0;const a=c=>{if(!(!e()||c.target.closest("button"))){if(i.size||(r=!1),i.set(c.pointerId,{x:c.clientX,y:c.clientY}),i.size>1){r=!0;const[u,d]=[...i.values()];s=Math.hypot(u.x-d.x,u.y-d.y)}n.setPointerCapture(c.pointerId)}},l=c=>{const u=i.get(c.pointerId);if(!e()||!u)return;const d=c.clientX-u.x,f=c.clientY-u.y;if(i.set(c.pointerId,{x:c.clientX,y:c.clientY}),Math.hypot(d,f)>.5&&(r=!0),i.size===2){const[h,p]=[...i.values()],v=Math.hypot(h.x-p.x,h.y-p.y);t(0,0,s>0?v/s:1),s=v}else i.size===1&&t(d,f,1)},o=c=>{i.delete(c.pointerId),i.size<2&&(s=0)};return n.addEventListener("pointerdown",a),n.addEventListener("pointermove",l),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o),{suppressTap:()=>r,dispose(){n.removeEventListener("pointerdown",a),n.removeEventListener("pointermove",l),n.removeEventListener("pointerup",o),n.removeEventListener("pointercancel",o),i.clear()}}}class z_{constructor(e,t,i={enabled:!1,inspect:!1,low:!1,diagnostics:!1}){this.host=e,this.store=t,this.options=i,this.lastUpgrade=t.getState().game?.upgradeEffect?.id??0,this.layout=fu(t.getState()),this.scroll=e.querySelector(".world-scroll"),this.spacer=e.querySelector(".world-spacer"),this.renderer=new i_({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,i.low?1:i.enabled||i.inspect||i.diagnostics?1.5:1.75)),this.renderer.shadowMap.enabled=!i.low,this.renderer.shadowMap.type=zu,this.diagnostics=k_(e,this.renderer,i.diagnostics,i.low),this.renderer.outputColorSpace=Xt,this.renderer.toneMapping=yl,this.renderer.toneMappingExposure=1.16,this.renderer.domElement.className="hotel-canvas",this.renderer.domElement.setAttribute("aria-hidden","true"),e.prepend(this.renderer.domElement),this.overlay=document.createElement("div"),this.overlay.className="world-labels",this.scroll.append(this.overlay),this.scene.add(this.root,this.light,this.ambient),this.light.castShadow=!0,this.light.position.set(-7,23,16),this.light.target.position.set(0,9,-.4),this.scene.add(this.light.target),Object.assign(this.light.shadow.camera,{left:-13,right:13,top:15,bottom:-15,near:.5,far:65});const r=i.low?512:i.enabled||i.inspect||i.diagnostics?1024:2048;this.light.shadow.mapSize.set(r,r),this.light.shadow.bias=-5e-4,this.light.shadow.normalBias=.018,this.light.layers.enable(1),this.ambient.layers.enable(1),this.build(),this.visualKey=this.key(t.getState()),this.scene.add(this.halo),this.bind(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this.update(t.getState()),this.cleanups.push(t.subscribe(s=>this.update(s))),this.raf=requestAnimationFrame(this.frame)}renderer;scene=new Oh;root=new et;camera=new va;light=new rp(16768942,3.1);ambient=new tp(12638184,10651490,2.15);raycaster=new op;colliders=[];actors=[];layout;overlay;labels=[];bubbles=[];floorLabels=[];halo=new et;scroll;spacer;scale=20;raf=0;ro;cleanups=[];time=0;last=0;lastPaint=0;paused=!1;visible=!0;faultLights=[];visualKey="";lastUpgrade=0;speechSlot=-1;speaker="";sample=null;inspecting=!1;inspectionZoom=1;inspectionPan=new Oe;cameraMoving=!1;roomModels=new Map;inspectionId=null;cameraTarget=new F;eyeTarget=new F;lookAt=new F;targetSpan=6;diagnostics;haloMaterial=new Wi({color:16766861,transparent:!0,opacity:.9,depthTest:!1});build(){const e=this.store.getState();this.sample=null,this.roomModels.clear();const t=new Set;this.light.position.y=this.layout.height+5,this.light.target.position.y=this.layout.height/2,this.light.shadow.camera.top=this.layout.height/2+5,this.light.shadow.camera.bottom=-this.layout.height/2-5,this.light.shadow.camera.far=this.layout.height+45,this.light.shadow.camera.updateProjectionMatrix();for(let a=0;a<18;a++){const l=-19+a*2.3,o=3+(Math.sin(a*7)+1)*3.3,c=-6-a%3*2.4;I(this.root,l,o/2-1,c,1.5,o,1.7,T.navy);for(let u=.4;u<o-1;u+=.55)for(let d=-.45;d<.6;d+=.45)(a+Math.round(u*10)+Math.round(d*10))%3!==0&&I(this.root,l+d,u,c+.87,.14,.24,.015,a%3===0?T.shade:T.window)}I(this.root,0,-.32,0,30,.35,15,T.navy),I(this.root,0,-.13,.7,17.6,.16,5.3,T.stone),I(this.root,0,-.06,2.95,17,.09,.55,T.stone);for(const a of[-8.1,8.4])Wt(this.root,a,1,2);e.floors.forEach(a=>{const l=this.layout.floorY.get(a.id),o=new et;if(o.name=a.id,o.position.y=l,this.root.add(o),a.role!=="rooftop"){I(o,0,-.085,0,15.05,.19,3.48,T.stone),I(o,0,-.12,1.77,15.2,.17,.19,T.navy),I(o,0,-.011,1.85,15.1,.025,.02,T.gold),I(o,0,2.405,-.02,15.05,.18,3.4,T.stone);for(const u of[-7.43,7.43])I(o,u,1.19,.18,.18,2.38,3.12,T.stone);I(o,7.94,1.19,-.24,.87,2.38,2.1,T.window);for(const u of[7.52,8.35])I(o,u,1.2,.84,.045,2.4,.06,T.gold);I(o,7.94,-.075,.1,.95,.19,2.85,T.navy),I(o,7.94,1.2,.87,.83,.025,.035,T.gold)}a.entityIds.forEach(u=>{const d=e.entities[u],f=this.layout.entities.find(g=>g.id===u),h=d.kind==="room"&&!a.construction&&g_(d,this.options.enabled),p=d.kind==="room"?h?N_(d):o_(a.construction?{...d,construction:a.construction}:d):u_(d.role,d.level??1,d.role==="breakfast"?e.game?.stock??100:d.role==="club"?e.game?.clubStock??100:100,!!d.construction);if(d.kind==="facility"&&(d.level??1)>1)for(let g=1;g<(d.level??1);g++)Wt(p,-6.8+g*.45,-.95,.5+g*.1);p.name=u,p.userData.entityId=u,p.position.x=f.position.x,o.add(p),p.userData.templateKey&&t.add(p.userData.templateKey);const v=h_(u,d.kind==="room"?4.65:14.6,a.role==="rooftop"?2.1:2.3);if(p.add(v),this.colliders.push(v),d.kind==="room"&&(this.options.enabled||this.options.inspect)){this.roomModels.set(u,p),h||w_(p),p.traverse(m=>{m instanceof _t&&(m.userData.diorama=!0)});const g=m_(u);p.add(g),this.colliders.push(g)}if(d.kind==="room"){const g=document.createElement("button");g.className="room-label status-"+d.status+(d.status==="maintenance"&&!d.construction?" fault":"")+(d.suaBookingId?" sua":""),g.textContent=a.construction?"施工":d.suaBookingId?d.number+" SUA":d.status==="unbuilt"?"＋":d.number,g.dataset.entityId=u,g.setAttribute("aria-label",d.number+" 房间"),g.onclick=()=>this.store.select(u),this.labels.push(g),this.overlay.append(g)}else{const g=document.createElement("button");g.className="facility-label"+(d.role==="breakfast"&&(e.game?.stock??1)<=0||d.role==="club"&&(e.game?.clubStock??1)<=0?" shortage":""),g.dataset.entityId=u,g.textContent=d.name+(d.construction?" · 施工中":d.role==="breakfast"&&(e.game?.stock??1)<=0?" · 缺货":d.role==="club"&&(e.game?.clubStock??1)<=0?" · 断菜":""),g.setAttribute("aria-label","查看"+d.name),g.onclick=()=>this.store.select(u),this.labels.push(g),this.overlay.append(g)}});const c=document.createElement("div");c.className="floor-marker",c.innerHTML=`<strong>${a.label}</strong><span>${a.name}</span>`,this.overlay.append(c),this.floorLabels.push({el:c,id:a.id})}),I_(t),a_(this.root),this.faultLights=[],this.root.traverse(a=>{a.name==="fault-lamp"&&this.faultLights.push(a)});const i=document.createElement("div");i.className="lobby-sign",i.innerHTML="<i><b></b><b></b><b></b><b></b><b></b><b></b></i><span>HYATT PLACE</span>",i.dataset.anchor="brand",this.overlay.append(i);const r=document.createElement("div");r.className="roof-sign",r.textContent="HYATT PLACE",r.dataset.anchor="roof",this.overlay.append(r);const s=this.haloMaterial;I(this.halo,0,0,0,4.7,.025,.025,s),I(this.halo,0,2.31,0,4.7,.025,.025,s),I(this.halo,-2.35,1.15,0,.025,2.31,.025,s),I(this.halo,2.35,1.15,0,.025,2.31,.025,s),this.halo.visible=!1}bind(){const e=()=>this.resizeCamera();this.scroll.addEventListener("scroll",e,{passive:!0}),this.cleanups.push(()=>this.scroll.removeEventListener("scroll",e));const t=B_(this.scroll,()=>this.inspecting,(o,c,u)=>{this.inspectionZoom=Math.max(.75,Math.min(1.8,this.inspectionZoom*u)),this.inspectionPan.x=Math.max(-1.3,Math.min(1.3,this.inspectionPan.x-o*5/this.host.clientWidth)),this.inspectionPan.y=Math.max(-.8,Math.min(.8,this.inspectionPan.y+c*5/this.host.clientWidth)),this.resizeCamera()});this.cleanups.push(()=>t.dispose());let i={x:0,y:0};const r=o=>{i={x:o.clientX,y:o.clientY}},s=o=>{if(this.inspecting&&t.suppressTap()||Math.hypot(o.clientX-i.x,o.clientY-i.y)>9||o.target.closest("button"))return;const c=this.host.getBoundingClientRect();this.raycaster.setFromCamera(new Oe((o.clientX-c.left)/c.width*2-1,-(o.clientY-c.top)/c.height*2+1),this.camera);const u=p_(this.raycaster,this.colliders);u&&this.store.select(u)};this.scroll.addEventListener("pointerdown",r),this.scroll.addEventListener("pointerup",s),this.cleanups.push(()=>{this.scroll.removeEventListener("pointerdown",r),this.scroll.removeEventListener("pointerup",s)});const a=()=>{this.visible=!document.hidden,this.last=0};document.addEventListener("visibilitychange",a),this.cleanups.push(()=>document.removeEventListener("visibilitychange",a));const l=o=>{o.preventDefault(),this.paused=!0,this.host.dispatchEvent(new CustomEvent("world-error",{detail:"画面连接中断，请重新载入恢复。"}))};this.renderer.domElement.addEventListener("webglcontextlost",l),this.cleanups.push(()=>this.renderer.domElement.removeEventListener("webglcontextlost",l))}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;e===0||t===0||(this.scale=e/19.4,this.renderer.setSize(e,t),this.spacer.style.height=Math.max(t,this.layout.height*this.scale+30)+"px",this.resizeCamera())}resizeCamera(){const e=this.host.clientWidth,t=this.host.clientHeight,i=t/this.scale,r=parseFloat(this.spacer.style.height)/this.scale;if(this.inspecting&&this.sample){const a=this.layout.entities.find(l=>l.id===this.inspectionId);this.cameraTarget.copy(a.position).add(new F(this.inspectionPan.x,1.14+this.inspectionPan.y,0)),this.eyeTarget.copy(this.cameraTarget).add(new F(...Zr.eye)),this.targetSpan=Math.max(5.9,5.5*e/t)/this.inspectionZoom,this.cameraMoving=!0;return}const s=r-i/2-this.scroll.scrollTop/this.scale-.85;this.camera.left=-e/this.scale/2,this.camera.right=e/this.scale/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.near=.1,this.camera.far=180,this.camera.position.set(3.4,s+6.4,46),this.camera.lookAt(-.3,s,0),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.placeLabels(),this.lookAt.set(-.3,s,0),this.cameraMoving=!1}project(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*this.host.clientWidth/2,y:(1-t.y)*this.host.clientHeight/2}}position(e,t){const i=this.project(t);e.style.transform=`translate(${i.x}px,${i.y+this.scroll.scrollTop}px)`,e.hidden=i.y<-30||i.y>this.host.clientHeight+30}placeLabels(){if(this.inspecting){this.labels.forEach(i=>i.hidden=!0),this.floorLabels.forEach(({el:i})=>i.hidden=!0),this.overlay.querySelectorAll("[data-anchor]").forEach(i=>i.hidden=!0);return}this.labels.forEach(i=>{const r=this.layout.entities.find(s=>s.id===i.dataset.entityId);this.position(i,r.label)}),this.floorLabels.forEach(({el:i,id:r})=>this.position(i,new F(-8.57,this.layout.floorY.get(r)+1.34,1.8)));const e=this.overlay.querySelector("[data-anchor=brand]");e&&this.position(e,new F(-1.55,1.85,-1.13));const t=this.overlay.querySelector("[data-anchor=roof]");t&&this.position(t,new F(3.2,this.layout.height-.85,-.9))}update(e){const t=this.key(e);if(t!==this.visualKey){this.visualKey=t,this.root.traverse(u=>{u instanceof Er&&u.dispose()}),this.scene.remove(this.root),this.colliders.forEach(u=>{u.geometry.dispose(),u.material.dispose()}),this.colliders=[],this.labels=[],this.floorLabels=[],this.overlay.replaceChildren(),this.halo.clear(),this.root=new et,this.scene.add(this.root);const o=[...this.layout.floorY.keys()],c=u=>{const d=Math.floor((u.y-.07)/vr+1e-5),f=o[d],h=e.floors.findIndex(p=>p.id===f);h>=0&&(u.y+=(h-d)*vr)};this.actors.forEach(u=>{c(u.group.position),u.navigation?.points.forEach(c)}),this.layout=fu(e),this.build(),this.bubbles.forEach(u=>this.overlay.append(u.el)),this.resize()}this.syncGuests(e),e.selectedId&&this.roomModels.has(e.selectedId)&&(this.options.inspectRoom=e.selectedId);const i=e.selectedId&&this.roomModels.has(e.selectedId)?e.selectedId:this.options.inspect&&e.selectedId===null?this.options.inspectRoom??yd:null,r=i?this.roomModels.get(i)??null:null,s=!!r;if(s!==this.inspecting||i!==this.inspectionId||r!==this.sample){i!==this.inspectionId&&(this.inspectionZoom=1,this.inspectionPan.set(0,0)),this.inspectionId=i,this.sample=r,this.inspecting=s;for(const[o,c]of this.roomModels)o!==i&&ao(c,new F(0,0,10)),c.traverse(u=>{o===i?u.layers.enable(1):u.layers.disable(1)});this.camera.layers.set(s?1:0),this.raycaster.layers.set(s?1:0),this.scene.background=s?new Je(15001566):null,this.scroll.style.touchAction=s?"none":"",this.resizeCamera(),this.placeLabels()}const a=e.game?.upgradeEffect;if(a&&a.id!==this.lastUpgrade){this.lastUpgrade=a.id;const o=this.labels.find(c=>c.dataset.entityId===a.entityId);if(o){const c=e.entities[a.entityId],u=e.floors.find(d=>d.id===c.floorId);o.dataset.feedback=c.construction||u?.construction?"施工开始":"竣工开放",o.classList.add("upgraded"),setTimeout(()=>o.classList.remove("upgraded"),3500)}}if(this.host.dataset.atmosphere=e.atmosphere,this.light.intensity=e.atmosphere==="night"?1.65:e.atmosphere==="day"?3.6:2.6,this.ambient.intensity=e.atmosphere==="night"?1.35:e.atmosphere==="day"?2.7:2.1,this.ambient.color.setHex(e.atmosphere==="night"?7051713:12441069),this.inspecting){const o=e.atmosphere==="night",c=e.game?.weather==="rain";this.renderer.toneMappingExposure=1.02,this.light.intensity=o?1.15:c?2:2.6,this.ambient.intensity=o?1.1:1.85,this.light.color.setHex(o?11978192:16772304),this.ambient.color.setHex(o?9283516:14805471),this.ambient.groundColor.setHex(11113854),Qn().lamp.emissiveIntensity=o?.65:.24,Qn().window.emissiveIntensity=o?.025:.16}else this.renderer.toneMappingExposure=1.16,this.light.color.setHex(16768942),this.ambient.groundColor.setHex(10651490);this.labels.forEach(o=>{const c=o.dataset.entityId===e.selectedId;o.classList.toggle("selected",c),o.setAttribute("aria-pressed",String(c))});const l=this.layout.entities.find(o=>o.id===(e.selectedId??e.game?.events[0]?.target));if(this.halo.visible=!!l,l){const o=e.entities[l.id];this.halo.scale.x=o.kind==="room"?1:3.1,this.halo.position.set(l.position.x,l.position.y,2.05)}}key(e){return e.floors.map(t=>t.id+":"+!!t.construction).join(",")+"|"+((e.game?.stock??1)>0)+":"+((e.game?.clubStock??1)>0)+"|"+Object.values(e.entities).map(t=>t.kind==="room"?t.status+":"+t.level+":"+t.category+":"+t.bed+":"+!!t.construction+":"+!!t.suaBookingId+":"+!!t.extraBed:(t.level??1)+":"+!!t.construction).join(",")}syncGuests(e){for(const t of[...this.actors])e.guests.some(i=>i.id===t.guestId)||(t.group.removeFromParent(),this.actors=this.actors.filter(i=>i!==t),this.bubbles.filter(i=>i.actor===t).forEach(i=>i.el.remove()),this.bubbles=this.bubbles.filter(i=>i.actor!==t));for(const t of e.guests){let i=this.actors.find(s=>s.guestId===t.id);if(!i){i={...d_(t.color,t.persona,t.staffRole),guestId:t.id,start:0,end:0,floorY:0,z:1.12,phase:this.actors.length*1.618,walking:!0,thought:t.thought},i.group.traverse(l=>l.layers.enable(1)),this.scene.add(i.group),this.actors.push(i);const a=document.createElement("button");a.className="thought",a.onclick=()=>this.store.select(t.roomId??"facility-lobby"),this.overlay.append(a),this.bubbles.push({el:a,actor:i,index:this.actors.length})}if(i.start=t.route[0],i.end=t.route[1],i.z=t.z??1.12,i.floorY=(this.layout.floorY.get(t.floorId)??0)+.07,i.walking=i.start!==i.end,i.thought=t.thought,t.movement){const s=t.movement;if(!i.navigation){const a=s.trail[0]??s.position;i.group.position.set(a.x,a.level*vr+.07,a.z)}if(i.navigation?.revision!==s.revision){const a=(s.trail.length?s.trail:[s.position]).map(l=>new F(l.x,l.level*vr+.07,l.z));if(i.navigation&&i.navigation.elapsed<i.navigation.duration){const l=i.navigation,o=l.elapsed/l.duration*(l.points.length-1);a.unshift(...l.points.slice(Math.floor(o)+1))}a.unshift(i.group.position.clone()),i.navigation={revision:s.revision,points:a,elapsed:0,duration:1}}}const r=this.bubbles.find(s=>s.actor===i);r&&(r.el.textContent=t.thought,r.el.setAttribute("aria-label","住客想法："+t.thought))}}focusFloor(e){this.inspecting&&(this.options.inspect=!1,this.inspecting=!1,this.camera.layers.set(0),this.raycaster.layers.set(0),this.scene.background=null,this.scroll.style.touchAction="",this.sample&&ao(this.sample,new F(0,0,10)),this.resizeCamera());const t=this.layout.floorY.get(e);if(t===void 0)return;const r=parseFloat(this.spacer.style.height)-(t+1.3)*this.scale-this.host.clientHeight/2;this.scroll.scrollTo({top:Math.max(0,r),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}frame=e=>{if(this.raf=requestAnimationFrame(this.frame),this.paused||!this.visible)return;const t=this.last?Math.min((e-this.last)/1e3,.05):0;this.last=e,this.time+=t*this.store.getState().speed;const i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(this.inspecting&&this.cameraMoving){const r=i?1:1-Math.exp(-t*9);this.camera.position.lerp(this.eyeTarget,r),this.lookAt.lerp(this.cameraTarget,r),this.camera.lookAt(this.lookAt);const s=Sh.lerp(this.camera.right-this.camera.left,this.targetSpan,r),a=s*this.host.clientHeight/this.host.clientWidth;if(this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=a/2,this.camera.bottom=-a/2,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.sample){const l=this.sample.worldToLocal(this.camera.position.clone());ao(this.sample,l)}this.placeLabels(),this.camera.position.distanceToSquared(this.eyeTarget)<1e-5&&Math.abs(s-this.targetSpan)<.001&&(this.cameraMoving=!1)}if(this.actors.forEach(r=>f_(r,i?0:this.time,t)),this.inspecting){const r=this.layout.entities.find(s=>s.id===this.inspectionId).position;this.actors.forEach(s=>{const a=s.group.position,l=Math.abs(a.x-r.x)<2.35&&Math.abs(a.y-r.y)<2.38&&a.z>=-1.55&&a.z<=1.55;s.group.traverse(o=>{l?o.layers.enable(1):o.layers.disable(1)})})}if(e-this.lastPaint>90){this.lastPaint=e;const r=this.store.getState(),s=Math.floor(e/8e3),a=this.bubbles.filter(({actor:l})=>{const o=r.guests.find(u=>u.id===l.guestId),c=this.project(l.group.position);return(!this.inspecting||o?.roomId===this.inspectionId&&o.movement?.position.phase==="room")&&!!l.thought&&o?.movement?.position.phase!=="elevator"&&l.group.position.x<7.2&&c.y>20&&c.y<this.host.clientHeight-25});s!==this.speechSlot&&(this.speechSlot=s,this.speaker=a.length?a[s%a.length].actor.guestId??"":""),this.bubbles.forEach(({el:l,actor:o})=>{const c=e%8e3<4200&&o.guestId===this.speaker&&a.some(u=>u.actor===o);if(l.style.display=c?"block":"none",c){const u=this.project(o.group.position.clone().add(new F(-.6,1.25,0)));l.hidden=!1;const d=Math.max(6,Math.min(this.host.clientWidth-l.offsetWidth-6,u.x)),f=Math.max(6,Math.min(this.host.clientHeight-l.offsetHeight-6,u.y));l.style.transform=`translate(${d}px,${f+this.scroll.scrollTop}px)`}})}this.faultLights.forEach(r=>{r.visible=Math.sin(e/140)>-.2}),this.renderer.render(this.scene,this.camera),this.diagnostics.tick(e)};dispose(){cancelAnimationFrame(this.raf),this.ro.disconnect(),this.cleanups.forEach(e=>e()),this.root.traverse(e=>{e instanceof Er&&e.dispose()}),this.renderer.dispose(),this.renderer.domElement.remove(),this.colliders.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),Object.values(gs).forEach(e=>e.dispose()),s_(),L_(),T_(),M_(),this.haloMaterial.dispose(),this.diagnostics.dispose(),this.overlay.remove()}}const zl="jinwanyoutao_v8_game_1";function G_(n=zl){try{const e=localStorage.getItem(n);if(!e)return ho();const t=JSON.parse(e);if(t.schemaVersion!==8||t.mode!=="game"||!t.game||!Array.isArray(t.floors)||!Array.isArray(t.guests)||!Array.isArray(t.game.logs)||!Array.isArray(t.game.events)||!Array.isArray(t.game.tasks)||!Array.isArray(t.game.reports)||!t.entities||!t.game.managers||!t.game.memory||!Number.isFinite(t.game.day)||!Number.isFinite(t.game.minute)||!Number.isFinite(t.metrics?.cash))throw Error("存档格式不兼容");for(const i of t.floors)for(const r of i.entityIds)if(t.entities[r]?.floorId!==i.id)throw Error("楼层数据不完整");return Cr(t),fa(t),vu(t,!0),ei(t),t.game.operations.day!==t.game.day&&gl(t,!t.game.reportOpen),t.game.plan||(hs(t),_l(t)),t.guests.forEach(i=>ha(t,i)),t.selectedId=null,t.focusedFloorId=null,t.game.notice="已恢复上次交班进度。",t}catch{const e=ho();return e.game.paused=!0,e.game.notice="存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。",e}}function wd(n,e=zl){try{return localStorage.setItem(e,JSON.stringify(n)),!0}catch{return!1}}const Td=new URL(location.href),H_=Sd(Td),da=v_(Td,zl),jn=hf(G_(da)),Xr=wf(document.querySelector("#app"),jn);Ud(document.querySelector("#app"),jn);let ul=!1,dl=jn.getState().game.notice.startsWith("存档读取失败");const Gl=()=>{!ul&&!dl&&!wd(jn.getState(),da)&&(dl=!0,alert("存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。"))};setInterval(()=>{!document.hidden&&!document.querySelector("dialog[open]")&&jn.advance(4*jn.getState().speed)},1e3);setInterval(Gl,5e3);document.addEventListener("visibilitychange",Gl);window.addEventListener("pagehide",Gl);document.addEventListener("new-game",()=>{if(confirm("新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？")){ul=!0;try{localStorage.removeItem(da),jn.reset(),dl=!1,wd(jn.getState(),da),location.reload()}catch{alert("无法重置存档。")}finally{ul=!1}}});function Ma(){const n=window.visualViewport;document.documentElement.style.setProperty("--viewport-height",(n?.height??innerHeight)+"px"),document.documentElement.style.setProperty("--viewport-top",(n?.offsetTop??0)+"px")}Ma();window.visualViewport?.addEventListener("resize",Ma);window.visualViewport?.addEventListener("scroll",Ma);window.addEventListener("resize",Ma);try{const n=new z_(Xr.stage,jn,H_);Xr.setFocusHandler(e=>n.focusFloor(e)),Xr.stage.addEventListener("world-error",e=>Xr.showError(e.detail)),window.addEventListener("pagehide",e=>{e.persisted||n.dispose()})}catch(n){console.error(n),Xr.showError("浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。")}
