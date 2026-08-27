const { definePlugin } = require('trek-plugin-sdk');

const json = (status, body) => ({
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const asId = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
};

async function safe(fn, fallback) {
  try { return await fn(); } catch (_) { return fallback; }
}

async function handbookMeta(ctx, type, id) {
  return safe(async () => (await ctx.meta.get(type, Number(id), 'handbook')) || null, null);
}

const BALI_PLACES = {
  hkg: ['Hong Kong International Airport (HKG)', 22.3080, 113.9185],
  kul: ['Kuala Lumpur International Airport (KUL)', 2.7456, 101.7072],
  dps: ['I Gusti Ngurah Rai International Airport (DPS)', -8.7482, 115.1673],
  grandHyatt: ['Grand Hyatt Bali', -8.8034, 115.2332, { duration: '2–4h', risk: '低', photo: '清晨海边逆光、泳池与园林环境照；人物尽量放在建筑轴线或水面留白里。', xhs: 'Grand Hyatt Bali 出片 机位' }],
  uluwatu: ['Uluwatu', -8.8151, 115.0876, { duration: '2–3h', risk: '中', photo: '日落前 45 分钟开始拍；悬崖边使用广角，人物离边缘保持安全距离。', xhs: 'Uluwatu 悬崖 日落 出片' }],
  ubud: ['Ubud Palace & Ubud Market', -8.5064, 115.2630, { duration: '3–4h', risk: '低', photo: '老城与市场适合环境人像，避免正午硬光。', xhs: 'Ubud 乌布 出片 机位' }],
  kleo: ['KLEO Seminyak', -8.68065, 115.15235],
  sanur: ['Sanur Harbour', -8.6722, 115.2646],
  penida: ['Nusa Penida', -8.7389, 115.4872, { duration: '全天', risk: '中高', photo: '海崖点优先广角和纵深；风大时不要站临崖边。', xhs: 'Nusa Penida 佩尼达岛 出片' }],
  sub: ['Juanda International Airport (SUB)', -7.3798, 112.7869],
  manis: ['Manis ae', -7.9045, 113.0108],
  bromo: ['Mount Bromo', -7.9080, 112.9485, { duration: '5–7h', risk: '中高', photo: '日出前拍剪影，日出后再拍火山层次；沙海风尘大，镜头注意防尘。', xhs: 'Bromo 布罗莫 日出 出片' }],
  majapahit: ['Hotel Majapahit Surabaya MGallery', -7.259726, 112.740077],
  sin: ['Singapore Changi Airport (SIN)', 1.3644, 103.9915],
  dusit: ['Dusit Thani Laguna Singapore', 1.3540, 103.9659],
  sai: ['Siem Reap Angkor International Airport (SAI)', 13.3697, 104.2230],
  parkHyatt: ['Park Hyatt Siem Reap', 13.3595, 103.8566],
  museum: ['Angkor National Museum', 13.3743, 103.8568, { duration: '2h', risk: '低', photo: '以建筑与展览记录为主，馆内遵守现场拍摄规定。', xhs: 'Angkor National Museum 暹粒' }],
  oldMarket: ['Old Market Siem Reap', 13.3530, 103.8556, { duration: '1–1.5h', risk: '低', photo: '傍晚河边与市场适合生活感街拍。', xhs: 'Siem Reap Old Market 暹粒' }],
  angkorWat: ['Angkor Wat', 13.4125, 103.8667, { duration: '2–2.5h', risk: '中', photo: '日出先拍倒影和五塔轮廓，太阳升高后转到西参道和回廊拍人物。', xhs: 'Angkor Wat 吴哥窟 日出 出片' }],
  taProhm: ['Ta Prohm', 13.4347, 103.8898, { duration: '1h', risk: '低', photo: '利用巨树根与门洞做前景框架，人物不要挡住树根主体。', xhs: 'Ta Prohm 塔普伦寺 出片' }],
  southGate: ['Angkor Thom South Gate', 13.4129, 103.8588, { duration: '20min', risk: '低', photo: '下车步行过桥，利用石像队列做引导线，再拍四面城门。', xhs: 'Angkor Thom South Gate 吴哥通南门' }],
  bayon: ['Bayon Temple', 13.4414, 103.8590, { duration: '1h', risk: '低', photo: '用中长焦压缩巨大石脸与人物，避免只拍正面游客照。', xhs: 'Bayon 巴戎寺 高棉微笑 出片' }],
  jaya: ['Jaya House River Park', 13.37027, 103.86446, { duration: '半天', risk: '低', photo: '泳池、植被与建筑细节适合自然光生活感照片。', xhs: 'Jaya House River Park 酒店' }],
  apopo: ['APOPO Visitor Center', 13.3782, 103.8499, { duration: '1h', risk: '低', photo: '以记录体验为主，优先拍训练演示和展览环境。', xhs: 'APOPO Siem Reap 地雷鼠' }],
  phare: ['Phare, The Cambodian Circus', 13.3479, 103.8384, { duration: '1h', risk: '低', photo: '现场以观看为主，遵守演出方拍摄规定。', xhs: 'Phare Cambodian Circus 暹粒' }],
  larrytaSR: ['Larryta Siem Reap', 13.3630, 103.8817],
  larrytaPP: ['Larryta Phnom Penh', 11.5732, 104.9210],
  kti: ['Techo International Airport (KTI)', 11.35999, 104.92127],
  baphuon: ['Baphuon Temple', 13.4438, 103.8568, { duration: '30–45min', risk: '中', photo: '适合对称中轴构图；台阶较陡，体力一般就不爬最高处。', xhs: 'Baphuon 巴方寺 吴哥' }],
  elephant: ['Terrace of the Elephants', 13.4467, 103.8586, { duration: '20min', risk: '低', photo: '用长横构图表现阅兵台尺度，细节再拍大象浮雕。', xhs: 'Terrace of the Elephants 吴哥 象台' }],
  preahKhan: ['Preah Khan Temple', 13.4619, 103.8721, { duration: '60–90min', risk: '低', photo: '长廊、门框和半荒废空间很适合纵深构图。', xhs: 'Preah Khan 圣剑寺 出片' }],
  neakPean: ['Neak Pean', 13.4633, 103.8956, { duration: '40–60min', risk: '低', photo: '栈道和水面是主体，拍长焦压缩水面层次。', xhs: 'Neak Pean 龙蟠水池 出片' }],
  banteaySrei: ['Banteay Srei', 13.5989, 103.9631, { duration: '1h+', risk: '低', photo: '重点是红砂岩和精细雕刻，建议中近景而非只拍全景。', xhs: 'Banteay Srei 女王宫 出片' }],
  phnomBakheng: ['Phnom Bakheng', 13.4238, 103.8561, { duration: '1.5–2h', risk: '中', photo: '主要价值是高处日落；当天已看日出时优先考虑体力。', xhs: 'Phnom Bakheng 巴肯山 日落' }]
};

const BALI_DAYS = [
  { date: '2026-09-26', title: '香港 → 吉隆坡 → 巴厘岛', summary: '长途移动日，落地后只入住和恢复。', stops: [['08:00','hkg','香港出发'],['转机','kul','吉隆坡转机'],['抵达','dps','入境、电话卡/eSIM、接机'],['晚间','grandHyatt','入住、简餐、休息']] },
  { date: '2026-09-27', title: '君悦 staycation + Uluwatu', summary: '上午留酒店，下午悬崖线和日落。', stops: [['日出','grandHyatt','海边散步'],['上午','grandHyatt','早餐、泳池、海滩'],['15:00','uluwatu','悬崖公路、咖啡厅、日落'],['晚间','grandHyatt','返回酒店']] },
  { date: '2026-09-28', title: 'Nusa Dua → Ubud → Seminyak', summary: '行李随包车，直接去乌布再到 Seminyak。', stops: [['09:30','grandHyatt','退房，行李上包车'],['13:00','ubud','皇宫、市场、乌布中心'],['16:30','kleo','前往 Seminyak，入住和晚餐']] },
  { date: '2026-09-29', title: 'Nusa Penida 一日往返', summary: '西线陆地或浮潜二选一为主，提前看海况。', stops: [['05:45','kleo','出发去码头'],['06:45','sanur','码头 check-in'],['白天','penida','西线 / 浮潜二选一为主'],['傍晚','sanur','返程船'],['晚间','kleo','回酒店']] },
  { date: '2026-09-30', title: '巴厘岛 → 泗水 → Bromo', summary: '飞泗水后长车程进山，核心是尽早睡。', stops: [['按机票','dps','巴厘岛机场'],['抵达','sub','机场直接上车'],['约3–4h','manis','进 Bromo 区域，入住早睡']] },
  { date: '2026-10-01', title: 'Bromo 日出 → 泗水恢复', summary: '凌晨看日出，上午火山，下午回泗水降强度。', stops: [['02:30','manis','Jeep / 日出团接人'],['清晨','bromo','日出、沙海、火山口'],['下午','majapahit','回泗水入住恢复']] },
  { date: '2026-10-02', title: '泗水 → 新加坡', summary: '转场日，城市活动取决于抵达时间。', stops: [['按机票','sub','泗水机场'],['抵达','sin','新加坡樟宜'],['随后','dusit','入住；较晚到就直接 staycation']] },
  { date: '2026-10-03', title: '新加坡 → 暹粒｜先认识吴哥', summary: '抵达后不冲寺庙，用半天理解吴哥背景和暹粒。', stops: [['09:40','sai','抵达 SAI'],['11:45','parkHyatt','抵达酒店、寄存行李'],['13:30','museum','吴哥国家博物馆'],['16:00','parkHyatt','入住、泳池休息'],['17:45','oldMarket','老市场、河边、晚餐'],['21:30','parkHyatt','早睡，准备次日日出']] },
  { date: '2026-10-04', title: '吴哥核心日｜四个最值得看的东西', summary: '吴哥窟 → 大树废墟 → 古代王城 → 高棉微笑；其他点留作现场选择。', stops: [['04:40','parkHyatt','带早餐盒出发'],['05:10','angkorWat','日出、西参道、回廊、中央圣殿'],['08:00','taProhm','巨树和废墟'],['09:25','southGate','步行过桥和巨大城门'],['10:00','bayon','高棉微笑'],['13:30','jaya','入住 Jaya House，下午恢复']] , alternatives:['baphuon','elephant','preahKhan','neakPean','banteaySrei','phnomBakheng'] },
  { date: '2026-10-05', title: 'Jaya House 恢复日 + APOPO + 夜巴', summary: '你短暂去 APOPO，他留酒店；之后整天一起 staycation，晚上夜巴。', stops: [['08:30','jaya','一起慢早餐'],['09:45','apopo','你去 APOPO；他留酒店 SPA'],['11:30','jaya','重新汇合、泳池、午餐、SPA'],['20:00','phare','备选：有精神才去'],['22:00','larrytaSR','前往 Larryta'],['23:00','larrytaSR','Sleeper → Phnom Penh']] },
  { date: '2026-10-06', title: '夜巴抵金边 → KTI → 香港', summary: '金边只做换乘，不住宿、不游览。', stops: [['约05:00','larrytaPP','夜巴抵达'],['05:30','kti','直接前往 KTI'],['11:25','kti','CX608 起飞'],['15:15','hkg','抵达香港']] }
];

function placeMetaFromSeed(seed) {
  return seed && seed[3] ? seed[3] : null;
}

module.exports = definePlugin({
  routes: [
    {
      method: 'GET',
      path: '/snapshot',
      auth: true,
      async handler(req, ctx) {
        const tripId = asId(req.query?.tripId);
        if (!tripId) return json(400, { error: 'tripId required' });
        const [trip, days, places, reservations, accommodations, packing, files, tripMeta] = await Promise.all([
          ctx.trips.getById(tripId),
          ctx.trips.getDays(tripId),
          ctx.trips.getPlaces(tripId),
          safe(() => ctx.trips.getReservations(tripId), []),
          safe(() => ctx.trips.getAccommodations(tripId), []),
          safe(() => ctx.packing.list(tripId), []),
          safe(() => ctx.files.list(tripId), []),
          handbookMeta(ctx, 'trip', tripId),
        ]);
        const placeMetaEntries = await Promise.all((places || []).map(async (p) => [String(p.id), await handbookMeta(ctx, 'place', p.id)]));
        const dayMetaEntries = await Promise.all((days || []).map(async (d) => [String(d.id), await handbookMeta(ctx, 'day', d.id)]));
        return json(200, {
          trip,
          days: days || [],
          places: places || [],
          reservations: reservations || [],
          accommodations: accommodations || [],
          packing: packing || [],
          files: files || [],
          handbook: { trip: tripMeta, places: Object.fromEntries(placeMetaEntries), days: Object.fromEntries(dayMetaEntries) },
        });
      },
    },
    {
      method: 'POST',
      path: '/meta',
      auth: true,
      async handler(req, ctx) {
        const { entityType, entityId, value } = req.body || {};
        const id = asId(entityId);
        if (!['trip', 'place', 'day', 'reservation', 'accommodation'].includes(entityType) || !id) return json(400, { error: 'valid entityType and entityId required' });
        if (value == null) await ctx.meta.delete(entityType, id, 'handbook');
        else await ctx.meta.set(entityType, id, 'handbook', value);
        return json(200, { ok: true });
      },
    },
    {
      method: 'POST',
      path: '/seed-bali-meta',
      auth: true,
      async handler(req, ctx) {
        const tripId = asId(req.body?.tripId);
        if (!tripId) return json(400, { error: 'tripId required' });
        const places = await ctx.trips.getPlaces(tripId);
        let seeded = 0;
        for (const p of places || []) {
          const pair = Object.values(BALI_PLACES).find((x) => String(p.name || '').toLowerCase().includes(String(x[0]).toLowerCase()) || String(x[0]).toLowerCase().includes(String(p.name || '').toLowerCase()));
          const meta = placeMetaFromSeed(pair);
          if (!meta) continue;
          const current = await handbookMeta(ctx, 'place', p.id);
          await ctx.meta.set('place', Number(p.id), 'handbook', { ...(current || {}), ...meta });
          seeded += 1;
        }
        return json(200, { ok: true, seeded });
      },
    },
    {
      method: 'POST',
      path: '/import-bali',
      auth: true,
      async handler(req, ctx) {
        const tripId = asId(req.body?.tripId);
        if (!tripId) return json(400, { error: 'tripId required' });
        const [existingDays, existingPlaces] = await Promise.all([ctx.trips.getDays(tripId), ctx.trips.getPlaces(tripId)]);
        if ((existingDays || []).length || (existingPlaces || []).length) {
          return json(409, { error: '为了避免重复导入，请只在一个空白 TREK Trip 中执行 Project Bali 导入。' });
        }

        await ctx.trips.update(tripId, {
          title: 'Project Bali',
          start_date: '2026-09-26',
          end_date: '2026-10-06',
          currency: 'CNY',
        });

        const createdPlaces = {};
        for (const [key, seed] of Object.entries(BALI_PLACES)) {
          const p = await ctx.places.create(tripId, { name: seed[0], lat: seed[1], lng: seed[2] });
          createdPlaces[key] = p;
          const meta = placeMetaFromSeed(seed);
          if (meta) await ctx.meta.set('place', Number(p.id), 'handbook', meta);
        }

        let assignments = 0;
        for (const spec of BALI_DAYS) {
          const day = await ctx.days.create(tripId, { date: spec.date, notes: spec.summary });
          await ctx.days.update(tripId, day.id, { title: spec.title });
          const timeline = [];
          for (const [time, key, note] of spec.stops) {
            const place = createdPlaces[key];
            if (!place) continue;
            await ctx.itinerary.assign(tripId, day.id, place.id, `${time} · ${note}`);
            assignments += 1;
            timeline.push({ time, text: note, placeId: place.id });
          }
          await ctx.meta.set('day', Number(day.id), 'handbook', {
            summary: spec.summary,
            timeline,
            alternatives: (spec.alternatives || []).map((key) => createdPlaces[key]?.id).filter(Boolean),
          });
        }

        await ctx.meta.set('trip', tripId, 'handbook', {
          template: 'project-bali',
          version: 1,
          importedAt: new Date().toISOString(),
          source: 'AI Travel Handbook',
        });

        return json(200, {
          ok: true,
          days: BALI_DAYS.length,
          places: Object.keys(createdPlaces).length,
          assignments,
        });
      },
    },
  ],
  hooks: {
    warningProvider: {
      async getWarnings(tripId, ctx) {
        const places = await ctx.trips.getPlaces(tripId);
        const missing = (places || []).filter((p) => p.lat == null || p.lng == null);
        if (!missing.length) return [];
        return [{ level: 'warning', message: `${missing.length} 个地点还没有地图坐标，Travel Mode 的路线体验会受影响。` }];
      },
    },
    placeDetailProvider: {
      async getDetails(placeId, ctx) {
        const meta = await handbookMeta(ctx, 'place', placeId);
        if (!meta) return [];
        const out = [];
        if (meta.duration) out.push({ label: '建议停留', value: String(meta.duration) });
        if (meta.photo) out.push({ label: '出片建议', value: String(meta.photo) });
        if (meta.risk) out.push({ label: '风险', value: String(meta.risk) });
        return out.slice(0, 12);
      },
    },
  },
});
