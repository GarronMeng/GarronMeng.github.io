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
    desc:'中午从君悦退房后走更近的 Serangan；13:30 直达 Banjar Nyuh，下午只做 Kelingking，岛上住一晚。',
    level:'中高',
    timeline:[
      ['上午','Grand Hyatt Bali 早餐 + 最后半天 staycation；11:30 前把行李全部收好'],
      ['11:35–11:45','Grand Hyatt Bali 退房 → 预订车辆直接前往 Marina Office Serangan'],
      ['约12:15','抵达 Serangan，Marina Fast Ferry 办理 check-in / 托运行李；给 13:30 船预留约 1 小时'],
      ['13:30–14:30','Marina Fast Ferry：Serangan → Nusa Penida / Banjar Nyuh'],
      ['14:30–15:00','Banjar Nyuh 下船 → 与岛上司机汇合 → 行李上车'],
      ['约15:00–15:50','Banjar Nyuh → Kelingking Beach 精灵坠崖'],
      ['约15:50–17:45','Kelingking：只看上方 viewpoint + 傍晚光线，不下到海滩；若路况/司机允许可稍留到接近日落'],
      ['约17:45–18:20','Kelingking → Māua Nusa Penida（首选，待预订）'],
      ['晚间','Māua 入住、晚餐、早睡；不再加西线景点']
    ],
    tags:[
      ['p0','锁 Marina Fast Ferry 9/28 13:30 Serangan → Banjar Nyuh'],
      ['p0','Māua Nusa Penida 9/28 一晚（首选，待预订）'],
      ['p0','订 Nusa Penida 两天同一司机 / 私家车'],
      ['info','Marina 建议至少提前 1 小时到港；11:45 前离开君悦'],
      ['info','精灵坠崖只看上方 viewpoint，不安排下崖']
    ]
  });

  replaceDay(4,{
    title:'Māua → Diamond Beach → Sanur → Seminyak',
    desc:'清晨横穿到东线只看钻石沙滩；中午回 Banjar Nyuh，13:00 左右船回 Sanur，下午入住 KLEO 或 Potato Head。',
    level:'中高',
    timeline:[
      ['06:15–06:45','Māua 早餐 / 简单补给，06:45 前退房；行李直接上司机车'],
      ['06:45–08:00','Māua → Diamond Beach 东线'],
      ['08:00–09:30','Diamond Beach：先看高位全景；体力和路况舒服再走部分阶梯，不强求下到沙滩'],
      ['09:30–10:45','Diamond Beach → Banjar Nyuh Harbour'],
      ['10:45–12:15','码头午餐 / 休息 / check-in；把早到当作船班缓冲'],
      ['首选13:00','Banjar Nyuh → Sanur；当前 Angel Billabong 班次约 13:00–13:45'],
      ['备选13:30–14:00','若首选不可订，改同日下午相邻班次；不要为了早半小时压缩 Diamond Beach'],
      ['约14:00–14:20','Sanur 下船、取行李 → 预订车辆'],
      ['约14:20–15:15','Sanur → Seminyak / Petitenget；实际按当日拥堵预留 30–60 分钟'],
      ['15:00以后','KLEO Seminyak 或 Desa Potato Head 入住；下午只做酒店 / 海边 / 晚餐']
    ],
    tags:[
      ['p0','锁 9/29 Banjar Nyuh → Sanur 13:00 左右返程船'],
      ['p0','KLEO / Potato Head 二选一'],
      ['p0','提前48h复核海况、港口与实际船班'],
      ['info','去程 Serangan、返程 Sanur：按行程方向优化，不要求同港往返'],
      ['info','Diamond Beach 之后直接回本岛，不塞完整东线']
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
    [-8.7285,115.2415,'Serangan Harbour · Marina Office'],
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
      ['Nusa Penida 去程船','9/28 首选 Marina Fast Ferry：Serangan 13:30 → Banjar Nyuh 14:30。Marina 建议至少提前 1 小时到港，因此君悦应在约 11:45 前发车。'],
      ['Nusa Penida 返程船','9/29 首选 Banjar Nyuh 13:00 左右 → Sanur；当前有 13:00、13:30、14:00 等相邻班次，订票时以实际运营日为准。'],
      ['Nusa Penida 住宿','首选 Māua Nusa Penida：位置正好夹在 Kelingking 与次日东线路径之间，并可走 World of Hyatt；目前仍按待预订处理。'],
      ['Nusa Penida 司机','两天同一辆私家车：9/28 Banjar Nyuh → Kelingking → Māua；9/29 Māua → Diamond Beach → Banjar Nyuh。'],
      ['Seminyak 住宿','9/29 晚 KLEO Seminyak / Desa Potato Head 二选一；如果以 Hyatt 积分为优先，则 KLEO 更直接。'],
      ...(G.p0||[]).filter(x=>!String(x?.[0]||'').includes('吴哥司机')),
      ['吴哥司机','10/4 核心路线：Angkor Wat → Ta Prohm → South Gate → Bayon。']
    ];

    const ubud=(G.places||[]).find(p=>p.id==='ubud');
    if(ubud){ubud.status='optional';ubud.day=null;ubud.tip='本版路线已从 D3 删除；如果后续重新腾出巴厘岛本岛自由时间再考虑。';}
    const penida=(G.places||[]).find(p=>p.id==='nusa-penida');
    if(penida){
      penida.day=3; penida.status='scheduled'; penida.duration='1 night / 2 half-days';
      penida.tip='9/28 Serangan 13:30 上岛后做 Kelingking，住一晚；9/29 清晨做 Diamond Beach 后从 Banjar Nyuh 回 Sanur。';
      penida.photo='Kelingking 留给下午偏晚光线；Diamond Beach 留给第二天早晨，减少正午硬光和人流。';
    }
    const addPlace=p=>{if(!(G.places||[]).some(x=>x.id===p.id))G.places.push(p)};
    addPlace({id:'serangan-marina',name:'Serangan Harbour · Marina Office',city:'Bali',type:'transport',status:'scheduled',day:3,duration:'check-in 1h',maps:'Marina Office Fast Ferry Jl. Tukad Punggawa No.237 Serangan Bali',xhs:'Serangan 码头 佩尼达 快船',tip:'9/28 去程使用；目标 12:15 左右抵达，13:30 Marina Fast Ferry 出发。'});
    addPlace({id:'kelingking',name:'Kelingking Beach · 精灵坠崖',city:'Nusa Penida',type:'attraction',status:'scheduled',day:3,duration:'1.5–2h',maps:'Kelingking Beach Nusa Penida',xhs:'佩尼达岛 精灵坠崖 日落',tip:'9/28 下午偏晚只做上方 viewpoint；不安排下到海滩。',photo:'下午偏晚拍 T-Rex 海岬；先用广角交代悬崖，再用人物做尺度。',risk:'中'});
    addPlace({id:'maua-penida',name:'Māua Nusa Penida',city:'Nusa Penida',type:'hotel',status:'optional',day:3,duration:'1 night',maps:'Maua Nusa Penida',xhs:'Maua Nusa Penida 酒店',tip:'9/28 住宿首选，World of Hyatt / Mr & Mrs Smith 渠道；当前仍按待预订。'});
    addPlace({id:'diamond-beach',name:'Diamond Beach · 钻石沙滩',city:'Nusa Penida',type:'attraction',status:'scheduled',day:4,duration:'1.5h',maps:'Diamond Beach Nusa Penida',xhs:'佩尼达岛 钻石沙滩 机位',tip:'9/29 早上优先；看完直接回 Banjar Nyuh，不再把东线所有景点塞满。',photo:'早晨从高处拍白崖与海湾；下阶梯只走到体力和路况都舒服的位置。',risk:'中'});
    addPlace({id:'kleo-seminyak',name:'KLEO Seminyak',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'KLEO Seminyak',xhs:'KLEO Seminyak',tip:'Hyatt 系、效率高；如果 9/30 航班较早或你要攒 Hyatt，优先级高。'});
    addPlace({id:'potato-head',name:'Desa Potato Head',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'Desa Potato Head Bali',xhs:'Potato Head Bali 酒店',tip:'酒店本身体验更强；如果 9/30 航班不早，住这里更能把这一晚变成完整体验。'});

    const transport=(G.checklist||[]).find(g=>g.group==='交通与预约');
    if(transport){
      transport.items=[
        'DPS 接机','Uluwatu 日落餐厅',
        '9/28 Marina Fast Ferry：Serangan 13:30 → Banjar Nyuh','Māua Nusa Penida 9/28 一晚','Nusa Penida 两天私家车 / 司机','9/29 Banjar Nyuh → Sanur 13:00 左右返程船','9/29 Seminyak：KLEO / Potato Head',
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