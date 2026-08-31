(()=>{
  const D=window.TRAVEL_DATA;
  const G=window.TRAVEL_GUIDE;
  if(!D||!Array.isArray(D.days)||!D.routes)return;

  const replaceDay=(n,next)=>{
    const i=D.days.findIndex(d=>d.n===n);
    if(i>=0) D.days[i]={...D.days[i],...next};
  };

  replaceDay(3,{
    title:'君悦 → Nusa Penida｜精灵坠崖日落',
    desc:'中午退房后直接上岛；下午只做西线 Kelingking，岛上住一晚，不再绕乌布。',
    level:'中高',
    timeline:[
      ['上午','Grand Hyatt Bali 早餐 + 最后半天 staycation'],
      ['12:00','Grand Hyatt Bali 退房 → 包车前往 Sanur Harbour'],
      ['12:45–13:15','抵达码头、寄运行李 / check-in；目标 14:15 船，15:00 作为备选'],
      ['约14:45–15:30','抵达 Nusa Penida（优先 Banjar Nyuh）→ 私家车直接去西线'],
      ['约16:00–17:45','Nusa Penida · Kelingking Beach 精灵坠崖：主看悬崖视角与傍晚光线，不下到海滩'],
      ['日落前后','离开 Kelingking → 北岸 Toyapakeh / Ped 一带酒店'],
      ['晚间','Nusa Penida 岛上入住、晚餐、早睡；行李全程跟车']
    ],
    tags:[
      ['p0','锁 9/28 Sanur → Banjar Nyuh 船票'],
      ['p0','订 Nusa Penida 1 晚酒店'],
      ['p0','订岛上两天私家车 / 司机'],
      ['info','精灵坠崖只看上方 viewpoint，不安排下崖']
    ]
  });

  replaceDay(4,{
    title:'Nusa Penida｜Diamond Beach → Seminyak',
    desc:'早起横穿东线看钻石沙滩，午后回巴厘岛本岛；晚上住 KLEO 或 Potato Head。',
    level:'中高',
    timeline:[
      ['06:30–07:00','Nusa Penida 酒店退房，行李上车 → 东线'],
      ['约08:00–10:00','Nusa Penida · Diamond Beach：观景台 + 视体力走部分阶梯；不额外塞完整东线'],
      ['10:00–11:30','Diamond Beach → Banjar Nyuh Harbour'],
      ['11:30以后','码头午餐 / check-in；优先目标 13:00–14:00 左右返程船'],
      ['约14:00–15:00','抵达 Sanur → 包车前往 Seminyak / Petitenget'],
      ['约16:00以后','KLEO Seminyak 或 Desa Potato Head 入住'],
      ['傍晚','只做酒店 / Petitenget 海边 / 晚餐，不再安排长距离项目']
    ],
    tags:[
      ['p0','锁 9/29 Nusa Penida → Sanur 返程船'],
      ['p0','KLEO / Potato Head 二选一'],
      ['p0','提前48h复核海况与船班'],
      ['info','Diamond Beach 之后直接回本岛']
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
    [-8.6722,115.2646,'Sanur Harbour'],
    [-8.67816,115.48845,'Banjar Nyuh Harbour'],
    [-8.7509,115.4748,'Kelingking Beach'],
    [-8.6735,115.5115,'Nusa Penida · north-coast stay TBD']
  ];
  D.routes.D4=[
    [-8.6735,115.5115,'Nusa Penida hotel'],
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
      ['Nusa Penida 船票','9/28 中午君悦退房后去 Sanur；优先找约 14:15 的去程，15:00 作为备选。9/29 回程优先 13:00–14:00 左右。'],
      ['Nusa Penida 住宿','只住 1 晚，优先 Toyapakeh–Ped 北岸，兼顾晚间入住、餐饮、第二天去 Diamond Beach 和返程码头。'],
      ['Nusa Penida 司机','两天同一辆私家车最好：9/28 港口 → Kelingking → 酒店；9/29 酒店 → Diamond Beach → 港口。'],
      ['Seminyak 住宿','9/29 晚 KLEO Seminyak / Desa Potato Head 二选一；先看 9/30 飞泗水的起飞时间再决定是否值得住 Potato Head。'],
      ...(G.p0||[]).filter(x=>!String(x?.[0]||'').includes('吴哥司机')),
      ['吴哥司机','10/4 核心路线：Angkor Wat → Ta Prohm → South Gate → Bayon。']
    ];

    const ubud=(G.places||[]).find(p=>p.id==='ubud');
    if(ubud){ubud.status='optional';ubud.day=null;ubud.tip='本版路线已从 D3 删除；如果后续重新腾出巴厘岛本岛自由时间再考虑。';}
    const penida=(G.places||[]).find(p=>p.id==='nusa-penida');
    if(penida){
      penida.day=3; penida.status='scheduled'; penida.duration='1 night / 2 half-days';
      penida.tip='9/28 下午做 Kelingking，岛上住一晚；9/29 清晨做 Diamond Beach 后回 Sanur。';
      penida.photo='Kelingking 留给傍晚侧光；Diamond Beach 留给第二天早晨，减少正午硬光和人流。';
    }
    const addPlace=p=>{if(!(G.places||[]).some(x=>x.id===p.id))G.places.push(p)};
    addPlace({id:'kelingking',name:'Kelingking Beach · 精灵坠崖',city:'Nusa Penida',type:'attraction',status:'scheduled',day:3,duration:'1.5–2h',maps:'Kelingking Beach Nusa Penida',xhs:'佩尼达岛 精灵坠崖 日落',tip:'9/28 傍晚只做上方 viewpoint；不安排下到海滩。',photo:'傍晚侧光拍 T-Rex 海岬；先用广角交代悬崖，再用人物做尺度。',risk:'中'});
    addPlace({id:'diamond-beach',name:'Diamond Beach · 钻石沙滩',city:'Nusa Penida',type:'attraction',status:'scheduled',day:4,duration:'1.5–2h',maps:'Diamond Beach Nusa Penida',xhs:'佩尼达岛 钻石沙滩 机位',tip:'9/29 早上优先；看完直接往港口，不再把东线所有景点塞满。',photo:'早晨从高处拍白崖与海湾；下阶梯只走到体力和路况都舒服的位置。',risk:'中'});
    addPlace({id:'penida-stay',name:'Nusa Penida 北岸酒店 · TBD',city:'Nusa Penida',type:'hotel',status:'optional',day:3,duration:'1 night',maps:'Toyapakeh Nusa Penida hotels',xhs:'佩尼达岛 住宿 Toyapakeh Ped',tip:'优先 Toyapakeh–Ped 北岸，不追求悬崖孤立酒店；这一晚的价值是降低两天往返赶船压力。'});
    addPlace({id:'kleo-seminyak',name:'KLEO Seminyak',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'KLEO Seminyak',xhs:'KLEO Seminyak',tip:'更偏高效、方便、Hyatt 系；适合 9/30 如果航班较早。'});
    addPlace({id:'potato-head',name:'Desa Potato Head',city:'Seminyak',type:'hotel',status:'optional',day:4,duration:'1 night',maps:'Desa Potato Head Bali',xhs:'Potato Head Bali 酒店',tip:'酒店本身体验更强；如果 9/30 航班不早，住这里更能把这一晚变成一次完整体验。'});

    const transport=(G.checklist||[]).find(g=>g.group==='交通与预约');
    if(transport){
      transport.items=[
        'DPS 接机','Uluwatu 日落餐厅',
        '9/28 Sanur → Nusa Penida 船票','Nusa Penida 岛上 1 晚酒店','Nusa Penida 两天私家车 / 司机','9/29 Nusa Penida → Sanur 船票','9/29 Seminyak：KLEO / Potato Head',
        'SUB → Bromo 包车','Bromo Jeep / 日出团','SAI → Park Hyatt 接送','Angkor 1-day pass','10/4 吴哥司机','Jaya House SPA / late checkout','Larryta sleeper','夜巴到站 → KTI 车辆'
      ];
    }
  }

  // app.js 目前住宿栏是固定文本；渲染完成后只校正 D3 / D4 两行。
  setTimeout(()=>{
    const rows=document.querySelectorAll('#triptable tbody tr');
    if(rows[2]?.cells?.[2]) rows[2].cells[2].textContent='Nusa Penida · hotel TBD';
    if(rows[3]?.cells?.[2]) rows[3].cells[2].textContent='KLEO / Potato Head · TBD';
  },0);
})();