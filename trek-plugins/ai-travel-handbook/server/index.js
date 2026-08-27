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

const BALI_META = [
  ['grand hyatt bali', { duration: '2–4h', risk: '低', photo: '清晨海边逆光、泳池与园林环境照；人物尽量放在建筑轴线或水面留白里。', xhs: 'Grand Hyatt Bali 出片 机位' }],
  ['uluwatu', { duration: '2–3h', risk: '中', photo: '日落前 45 分钟开始拍；悬崖边使用广角，人物离边缘保持安全距离。', xhs: 'Uluwatu 悬崖 日落 出片' }],
  ['ubud', { duration: '3–4h', risk: '低', photo: '老城与市场适合环境人像，避免正午硬光。', xhs: 'Ubud 乌布 出片 机位' }],
  ['nusa penida', { duration: '全天', risk: '中高', photo: '海崖点优先广角和纵深；风大时不要站临崖边。', xhs: 'Nusa Penida 佩尼达岛 出片' }],
  ['bromo', { duration: '5–7h', risk: '中高', photo: '日出前拍剪影，日出后再拍火山层次；沙海风尘大，镜头注意防尘。', xhs: 'Bromo 布罗莫 日出 出片' }],
  ['angkor wat', { duration: '2–2.5h', risk: '中', photo: '日出先拍倒影和五塔轮廓，太阳升高后转到西参道和回廊拍人物。', xhs: 'Angkor Wat 吴哥窟 日出 出片' }],
  ['ta prohm', { duration: '1h', risk: '低', photo: '利用巨树根与门洞做前景框架，人物不要挡住树根主体。', xhs: 'Ta Prohm 塔普伦寺 出片' }],
  ['bayon', { duration: '1h', risk: '低', photo: '用中长焦压缩巨大石脸与人物，避免只拍正面游客照。', xhs: 'Bayon 巴戎寺 高棉微笑 出片' }],
  ['south gate', { duration: '20min', risk: '低', photo: '下车步行过桥，利用石像队列做引导线，再拍四面城门。', xhs: 'Angkor Thom South Gate 吴哥通南门' }],
  ['angkor thom', { duration: '20min', risk: '低', photo: '下车步行过桥，利用石像队列做引导线，再拍四面城门。', xhs: 'Angkor Thom South Gate 吴哥通南门' }],
  ['elephant terrace', { duration: '20min', risk: '低', photo: '用长横构图表现阅兵台尺度，细节再拍大象浮雕。', xhs: 'Terrace of the Elephants 吴哥 象台' }],
  ['baphuon', { duration: '30–45min', risk: '中', photo: '适合对称中轴构图；台阶较陡，体力一般就不爬最高处。', xhs: 'Baphuon 巴方寺 吴哥' }],
  ['preah khan', { duration: '60–90min', risk: '低', photo: '长廊、门框和半荒废空间很适合纵深构图。', xhs: 'Preah Khan 圣剑寺 出片' }],
  ['neak pean', { duration: '40–60min', risk: '低', photo: '栈道和水面是主体，拍长焦压缩水面层次。', xhs: 'Neak Pean 龙蟠水池 出片' }],
  ['banteay srei', { duration: '1h+', risk: '低', photo: '重点是红砂岩和精细雕刻，建议中近景而非只拍全景。', xhs: 'Banteay Srei 女王宫 出片' }],
  ['apopo', { duration: '1h', risk: '低', photo: '以记录体验为主，优先拍训练演示和展览环境。', xhs: 'APOPO Siem Reap 地雷鼠' }],
  ['jaya house', { duration: '半天', risk: '低', photo: '泳池、植被与建筑细节适合自然光生活感照片。', xhs: 'Jaya House River Park 酒店' }],
  ['phare', { duration: '1h', risk: '低', photo: '现场以观看为主，遵守演出方拍摄规定。', xhs: 'Phare Cambodian Circus 暹粒' }]
];

function matchBaliMeta(name) {
  const key = String(name || '').toLowerCase();
  const hit = BALI_META.find(([needle]) => key.includes(needle));
  return hit ? hit[1] : null;
}

async function safe(fn, fallback) {
  try { return await fn(); } catch (_) { return fallback; }
}

async function handbookMeta(ctx, type, id) {
  return safe(async () => (await ctx.meta.get(type, Number(id), 'handbook')) || null, null);
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

        const [trip, days, places, reservations, accommodations, packing, files] = await Promise.all([
          ctx.trips.getById(tripId),
          ctx.trips.getDays(tripId),
          ctx.trips.getPlaces(tripId),
          safe(() => ctx.trips.getReservations(tripId), []),
          safe(() => ctx.trips.getAccommodations(tripId), []),
          safe(() => ctx.packing.list(tripId), []),
          safe(() => ctx.files.list(tripId), []),
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
          handbook: {
            places: Object.fromEntries(placeMetaEntries),
            days: Object.fromEntries(dayMetaEntries),
          },
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
        if (!['trip', 'place', 'day', 'reservation', 'accommodation'].includes(entityType) || !id) {
          return json(400, { error: 'valid entityType and entityId required' });
        }
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
          const meta = matchBaliMeta(p.name);
          if (!meta) continue;
          const current = await handbookMeta(ctx, 'place', p.id);
          await ctx.meta.set('place', Number(p.id), 'handbook', { ...(current || {}), ...meta });
          seeded += 1;
        }
        return json(200, { ok: true, seeded });
      },
    },
  ],
  hooks: {
    warningProvider: {
      async getWarnings(tripId, ctx) {
        const places = await ctx.trips.getPlaces(tripId);
        const missing = (places || []).filter((p) => p.lat == null || p.lng == null);
        if (!missing.length) return [];
        return [{
          level: 'warning',
          message: `${missing.length} 个地点还没有地图坐标，Travel Mode 的路线体验会受影响。`,
        }];
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
