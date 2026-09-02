(()=>{
  const D=window.TRAVEL_DATA;
  const G=window.TRAVEL_GUIDE;
  if(!D||!Array.isArray(D.days)||!D.routes)return;

  const replaceDay=(n,next)=>{
    const i=D.days.findIndex(d=>d.n===n);
    if(i>=0) D.days[i]={...D.days[i],...next};
  };

  replaceDay(3,{
    title:'君悦 → Serangan → Nusa Penida｜精灵坠崖',
    desc:'中午前后从君悦退房，走更近的 Serangan；13:30 直达 Banjar Nyuh，下午只做 Kelingking，岛上住一晚。',
    level:'中高',
    timeline:[
      ['上午','Grand Hyatt Bali 早餐 + 最后半天 staycation；11:15 前把行李全部收好'],
      ['11:35–11:45','Grand Hyatt Bali 退房 → 预订车辆直接前往 Marina Office Serangan'],
      ['约12:15–12:30','抵达 Serangan，办理 Marina Fast Ferry check-in / 托运行李；官方建议提前到港，最晚不要压到 13:00 后'],
      ['13:30–14:30','Marina Group Fast Ferry：Serangan → Banjar Nyuh；海况可能让实际抵达前后浮动约 15 分钟'],
      ['14:30–15:00','Banjar Nyuh 下船 → 与岛上司机汇合 → 行李上车'],
      ['约15:00–15:45','Banjar Nyuh → Kelingking Beach 精灵坠崖'],
      ['约15:45–17:30','Kelingking：只看上方 viewpoint + 下午偏晚光线，不下到海滩'],
      ['约17:30–18:00','Kelingking → Māua Nusa Penida（首选，待预订）'],
      ['晚间','Māua 入住、晚餐、早睡；不再加西线景点']
    ],
    tags:[
      ['p0','锁 Marina Group 9/28 13:30 Serangan → Banjar Nyuh'],
      ['p0','Māua Nusa Penida 9/28 一晚（首选，待预订）'],
      ['p0','订 Nusa Penida 两天同一司机 / 私家车'],
      ['info','Serangan 去程比 Sanur 更适合君悦中午退房后的时间窗'],
      ['info','精灵坠崖只看上方 viewpoint，不安排下崖']
    ]
  });

  replaceDay(4,{
    title:'Māua → Diamond Beach → Sanur → Seminyak',
    desc:'正常早餐后约 9 点退房；上午只看 Diamond Beach，午后从 Banjar Nyuh 回 Sanur，再去 Seminyak。',
    level:'中',
    timeline:[
      ['07:30–08:30','Māua 正常早餐 + 酒店早晨，不安排 6 点起床'],
      ['08:45–09:00','Māua 退房，行李直接上司机车'],
      ['09:00–10:15','Māua → Diamond Beach；岛上道路弯多，按约 60–75 分钟留足缓冲'],
      ['10:15–11:30','Diamond Beach：高位全景 + 视体力走部分阶梯；不强求下到沙滩'],
      ['11:30–12:45','Diamond Beach → Banjar Nyuh Harbour'],
      ['12:45–13:45','码头午餐 / 休息 / check-in；不赶船'],
      ['首选14:30左右','Banjar Nyuh → Sanur；当前公开班表存在 14:30 左右返程选择，订票时锁定具体运营商与当天班次'],
      ['备选13:30或15:00','若 14:30 不可订，优先改相邻班次；不为了早半小时牺牲 Maua 早餐和 Diamond Beach'],
      ['约15:00–16:00','抵达 Sanur、取行李 → 预订车辆前往 Seminyak / Petitenget'],
      ['约16:00以后','KLEO Seminyak 或 Desa Potato Head 入住；下午只做酒店 / 海边 / 晚餐']
    ],
    tags:[
      ['p0','锁 9/29 Banjar Nyuh → Sanur 14:30 左右返程船'],
      ['p0','KLEO / Potato Head 二选一'],
      ['p0','提前48h复核海况、港口与实际船班'],
      ['info','9/29 约 9 点退房，不再安排清晨离店'],
      ['info','去程 Serangan、返程 Sanur：按行程方向优化，不要求同港往返']
    ]
  });

  replaceDay(5,{
    timeline:[
      ['按机票','Seminyak / Petitenget 酒店 → DPS → SUB'],
      ['抵达后','机场直接上预订车辆'],
      ['约3–4h','SUB → Bromo 区域'],
      ['晚间','Manis ae 入住、早睡']
    ]
  });

  D.routes.D3=[
    [-8.8034,115.2332,'Grand Hyatt Bali'],
    [-8.7216,115.2388,'Serangan Harbour'],
    [-8.67816,115.48845,'Banjar Nyuh Harbour'],
    [-8.7509,115.4748,'Kelingking Beach'],
    [-8.70255,115.4750,'Māua Nusa Penida']
  ];
  D.routes.D4=[
    [-8.70255,115.4750,'Māua Nusa Penida'],
    [-8.77615,115.61857,'Diamond Beach'],
    [-8.67816,115.48845,'Banjar Nyuh Harbour'],
    [-8.6722,115.2646,'Sanur Harbour'],
    [-8.6807,115.1524,'Seminyak / Petitenget']
  ];
  D.routes.D5=[
    [-8.6807,115.1524,'Seminyak / Petitenget'],
    [-8.7482,115.1673,'DPS'],
    [-7.3798,112.7869,'SUB'],
    [-7.9045,113.0108,'Manis ae']
  ];

  if(G){
    G.p0=[
      ['Nusa Penida 去程船','9/28 首选 Marina Group：Serangan 13:30 → Banjar Nyuh 14:30 左右。计划 11:35–11:45 离开君悦，约 12:15–12:30 到港。'],
      ['Nusa Penida 返程船','9/29 不早退房：约 09:00 离开 Māua，Diamond Beach 后首选 14:30 左右 Banjar Nyuh → Sanur；若该班售罄，再改 13:30 或 15:00 邻近班次。'],
      ['Nusa Penida 住宿','首选 Māua Nusa Penida：9/28 晚一晚，当前仍按待预订；可兼顾 World of Hyatt。'],
      ['Nusa Penida 司机','两天同一辆私家车：9/28 Banjar Nyuh → Kelingking → Māua；9/29 Māua → Diamond Beach → Banjar Nyuh。'],
      ['Seminyak 住宿','9/29 晚 KLEO Seminyak / Desa Potato Head 二选一；若 Hyatt 积分优先，KLEO 更直接。'],
      ...(G.p0||[]).filter(x=>!String(x?.[0]||'').includes('吴哥司机')),
      ['吴哥司机','10/4 核心路线：Angkor Wat → Ta Prohm → South Gate → Bayon。']
    ];

    const ubud=(G.places||[]).find(p=>p.id==='ubud');
    if(ubud){ubud.status='optional';ubud.day=null;ubud.tip='本版路线已从 D3 删除；如果后续重新腾出巴厘岛本岛自由时间再考虑。';}
    const penida=(G.places||[]).find(p=>p.id==='nusa-penida');
    if(penida){
      penida.day=3; penida.status='scheduled'; penida.duration='1 night / 2 half-days';
      penida.tip='9/28 Serangan 13:30 上岛后做 Kelingking，住一晚；9/29 正常早餐、约 9 点退房后做 Diamond Beach，再从 Banjar Nyuh 回 Sanur。';
      penida.photo='Kelingking 留给下午偏晚光线；Diamond Beach 放第二天上午。';
    }
    const addPlace=p=>{if(!(G.places||[]).some(x=>x.id===p.id))G.places.push(p)};
    addPlace({id:'serangan-marina',name:'Serangan Harbour',city:'Bali',type:'transport',status:'scheduled',day:3,duration:'check-in 1h',maps:'Serangan Harbour Bali',xhs:'Serangan 码头 佩尼达 快船',tip:'9/28 去程使用；目标 12:15–12:30 抵达，13:30 Marina Group 出发。'});
    addPlace({id:'kelingking',name:'Kelingking Beach · 精灵坠崖',city:'Nusa Penida',type:'attraction',status:'scheduled',day:3,duration:'1.5–2h',maps:'Kelingking Beach Nusa Penida',xhs:'佩尼达岛 精灵坠崖 日落',tip:'9/28 下午偏晚只做上方 viewpoint；不安排下到海滩。',photo:'下午偏晚拍 T-Rex 海岬；先用广角交代悬崖，再用人物做尺度。',risk:'中'});
    addPlace({id:'maua-penida',name:'Māua Nusa Penida',city:'Nusa Penida',type:'hotel',status:'optional',day:3,duration:'1 night',maps:'Maua Nusa Penida',xhs:'Maua Nusa Penida 酒店',tip:'9/28 住宿首选，World of Hyatt / Mr & Mrs Smith 渠道；当前仍按待预订。'});
    addPlace({id:'diamond-beach',name:'Diamond Beach · 钻石沙滩',city:'Nusa Penida',type:'attraction',status:'scheduled',day:4,duration:'1.25h',maps:'Diamond Beach Nusa Penida',xhs:'佩尼达岛 钻石沙滩 机位',tip:'9/29 10 点左右到；看完直接回 Banjar Nyuh，不塞完整东线。',photo:'上午从高处拍白崖与海湾；下阶梯只走到体力和路况都舒服的位置。',risk:'中'});
    addPlace({id:'kleo-seminyak',name:'KLEO Seminyak',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'KLEO Seminyak',xhs:'KLEO Seminyak',tip:'Hyatt 系、效率高；如果 9/30 航班较早或你要攒 Hyatt，优先级高。'});
    addPlace({id:'potato-head',name:'Desa Potato Head',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'Desa Potato Head Bali',xhs:'Potato Head Bali 酒店',tip:'酒店本身体验更强；如果 9/30 航班不早，住这里更能把这一晚变成完整体验。'});

    const transport=(G.checklist||[]).find(g=>g.group==='交通与预约');
    if(transport){
      transport.items=[
        'DPS 接机','Uluwatu 日落餐厅',
        '9/28 Marina Group：Serangan 13:30 → Banjar Nyuh','Māua Nusa Penida 9/28 一晚','Nusa Penida 两天私家车 / 司机','9/29 Banjar Nyuh → Sanur 14:30 左右返程船','9/29 Seminyak：KLEO / Potato Head',
        'SUB → Bromo 包车','Bromo Jeep / 日出团','SAI → Park Hyatt 接送','Angkor 1-day pass','10/4 吴哥司机','Jaya House SPA / late checkout','Larryta sleeper','夜巴到站 → KTI 车辆'
      ];
    }
  }

  setTimeout(()=>{
    const rows=document.querySelectorAll('#triptable tbody tr');
    if(rows[2]?.cells?.[2]) rows[2].cells[2].textContent='Māua Nusa Penida · preferred / TBD';
    if(rows[3]?.cells?.[2]) rows[3].cells[2].textContent='KLEO / Potato Head · TBD';
  },0);
})();