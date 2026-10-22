import type { Facility, PreviewState } from '../state/types';

export type FacilityPriority =
  | 'construction'
  | 'maintenance'
  | 'supply'
  | 'expand'
  | 'positioning'
  | 'observe'
  | 'capacity-limit';

export interface FacilityInsight {
  utilization: number;
  waiting: number;
  fitScore: number;
  fitLabel: '强匹配' | '一般匹配' | '弱匹配';
  fitReason: string;
  recommendation: string;
  explanation: string;
  priority: FacilityPriority;
  upgradeCost: number;
  capacityGain: number;
  qualityGain: number;
  constructionMinutes: number;
}

type Positioning = 'business' | 'resort' | 'urban';
type FacilityRole = Facility['role'];

const FIT: Record<Positioning, Record<FacilityRole, number>> = {
  business: { lobby: 3, breakfast: 3, club: 2, gym: 1, spa: 1, rooftop: 1 },
  resort:   { lobby: 2, breakfast: 2, club: 2, gym: 3, spa: 3, rooftop: 3 },
  urban:    { lobby: 3, breakfast: 3, club: 2, gym: 2, spa: 2, rooftop: 2 },
};

const FIT_REASON: Record<Positioning, Record<FacilityRole, string>> = {
  business: {
    lobby: '商务客更看重高效接待与顺畅的到店动线。',
    breakfast: '稳定、快速的早餐服务更符合商务客的出行节奏。',
    club: '酒廊有一定会员需求，扩容前应核对高等级会员占比。',
    gym: '健身房可补充服务，但商务定位本身不足以证明扩容需求。',
    spa: '商务定位下水疗需求较弱，先验证真实到访。',
    rooftop: '商务定位下屋顶休闲需求较弱，天气也会影响使用。',
  },
  resort: {
    lobby: '度假客仍依赖顺畅接待，扩容价值取决于到店高峰。',
    breakfast: '度假客早餐需求明显，应同时关注早高峰和备货。',
    club: '酒廊可增强度假体验，但仍需观察会员结构与库存。',
    gym: '健身是度假住客可在酒店内完成的体验项目。',
    spa: '水疗与度假定位高度匹配，需结合实际使用率判断扩容。',
    rooftop: '屋顶休闲与度假定位高度匹配，晴雨会显著改变需求。',
  },
  urban: {
    lobby: '城市混合定位需要兼顾接待效率与客流周转。',
    breakfast: '早餐能覆盖商务与休闲客，重点观察早高峰。',
    club: '酒廊价值取决于实际会员结构和高峰使用率。',
    gym: '健身房可补充体验，先验证高峰利用率。',
    spa: '水疗能补充休闲消费，但应先观察真实到访。',
    rooftop: '屋顶休闲能提供差异化体验，雨天需调整预期。',
  },
};

const money = (value: number) => '¥' + Math.round(value).toLocaleString('en-US');

export function facilityInsights(s: Readonly<PreviewState>, f: Facility): FacilityInsight {
  const game = s.game;
  const level = f.level ?? 1;
  const capacity = Math.max(1, f.capacity);
  const usage = Math.max(0, f.usage);
  const utilization = Math.min(100, Math.round((usage / capacity) * 100));
  const waiting = s.guests.filter(
    guest => !guest.staff && !guest.departing && guest.waitingFor === f.id,
  ).length;
  const positioning: Positioning = game?.positioning ?? 'urban';
  let fitScore = FIT[positioning][f.role];
  let fitReason = FIT_REASON[positioning][f.role];

  if (f.role === 'club') {
    const premiumGuests = s.guests.filter(
      guest =>
        !guest.staff &&
        !guest.departing &&
        !!guest.roomId &&
        (guest.tier === 'Globalist' || guest.tier === 'Explorist'),
    ).length;
    if (premiumGuests === 0) {
      fitScore = Math.min(fitScore, 1);
      fitReason += ' 当前在住高等级会员较少。';
    } else if (premiumGuests >= 3) {
      fitScore = Math.min(3, fitScore + 1);
      fitReason += ' 当前有多位高等级会员在住。';
    }
  }

  if (f.role === 'rooftop' && game?.weather === 'rain') {
    fitScore = Math.max(0, fitScore - 1);
    fitReason += ' 当前有雨，屋顶需求会受到压制。';
  }

  const fitLabel: FacilityInsight['fitLabel'] =
    fitScore >= 3 ? '强匹配' : fitScore === 2 ? '一般匹配' : '弱匹配';
  const upgradeCost = level * 3500;
  const constructionMinutes = 120;
  const capacityGain = 4;
  const qualityGain = 5;

  let priority: FacilityPriority = 'observe';
  let recommendation = '继续观察高峰时段';
  let explanation = `当前使用 ${usage}/${capacity}（${utilization}%），排队 ${waiting} 位。暂时没有充分的扩容信号；观察高峰后再决定是否投入 ${money(upgradeCost)}。`;

  if (f.construction) {
    priority = 'construction';
    recommendation = '先完成当前施工';
    explanation = `设施正在施工，剩余 ${Math.max(0, f.construction.remaining)} 游戏分钟。施工结束后再观察容量、品质和维护度变化。`;
  } else if (f.maintenance < 45) {
    priority = 'maintenance';
    recommendation = '先维护，再考虑扩容';
    explanation = `维护度仅 ${Math.round(f.maintenance)}%。先恢复设备状态，避免把维护问题误判为容量不足；维护费用 ¥200。`;
  } else if (
    (f.role === 'breakfast' && (game?.stock ?? 0) < 10) ||
    (f.role === 'club' && (game?.clubStock ?? 0) < 8)
  ) {
    priority = 'supply';
    recommendation = '先保障服务库存';
    const stock = f.role === 'breakfast' ? game?.stock ?? 0 : game?.clubStock ?? 0;
    explanation = `当前可用库存仅 ${stock} 份。先补货，避免住客因缺货等待或降低满意度，再判断是否需要扩容。`;
  } else if ((waiting > 0 || utilization >= 85) && fitScore >= 2 && level < 5) {
    priority = 'expand';
    recommendation = '需求接近容量上限，可评估扩容';
    explanation = `当前使用 ${usage}/${capacity}（${utilization}%），排队 ${waiting} 位。升级需 ${money(upgradeCost)}，可增加 ${capacityGain} 个容量、品质提升 ${qualityGain} 点；施工约 ${constructionMinutes} 游戏分钟，期间需考虑服务承载。`;
  } else if (waiting > 0 || utilization >= 85) {
    priority = level >= 5 ? 'capacity-limit' : 'positioning';
    recommendation = level >= 5 ? '设施已满级，优先分流需求' : '先验证客群匹配，再决定扩容';
    explanation = level >= 5
      ? `当前使用 ${usage}/${capacity}（${utilization}%），排队 ${waiting} 位，设施已达 5 级。可通过时段安排、活动或替代服务分流。`
      : `当前使用 ${usage}/${capacity}（${utilization}%），排队 ${waiting} 位，但该设施与当前定位的匹配度为「${fitLabel}」。先调整定位或活动，再判断高需求是否持续。`;
  } else if (utilization <= 35 && fitScore <= 1) {
    priority = 'positioning';
    recommendation = '当前需求偏弱，暂缓扩容';
    explanation = `当前使用 ${usage}/${capacity}（${utilization}%），且定位匹配度为「${fitLabel}」。先用定位、活动或营销验证需求，不建议立即投入 ${money(upgradeCost)} 扩容。`;
  } else if (utilization <= 35) {
    priority = 'observe';
    recommendation = '先提升使用率，再考虑扩容';
    explanation = `当前使用 ${usage}/${capacity}（${utilization}%），暂无排队。优先吸引匹配客群并观察高峰，不建议仅因设施等级低就扩容。`;
  }

  return {
    utilization,
    waiting,
    fitScore,
    fitLabel,
    fitReason,
    recommendation,
    explanation,
    priority,
    upgradeCost,
    capacityGain,
    qualityGain,
    constructionMinutes,
  };
}
