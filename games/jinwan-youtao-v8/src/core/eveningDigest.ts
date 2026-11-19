export interface EveningDigestInput {
  day: number;
  netCashDelta: number;
  servedCount: number;
  missedOrStockoutCount: number;
  avgSatisfaction: number;
  isSettled: boolean;
}

export interface EveningDigest {
  headline: string;
  bottleneck: string;
  nextDayAdvice: string;
  canAdvanceDay: boolean;
  lines: [string, string, string];
}

/**
 * Build a concise 3-line end-of-day review for post-settlement clarity and next-day planning.
 */
export function buildEveningDigest(input: EveningDigestInput): EveningDigest {
  const cashSign = input.netCashDelta >= 0 ? '+' : '-';
  const formattedCash = `${cashSign}¥${Math.abs(Math.round(input.netCashDelta))}`;
  const satisfactionPct = Math.round(input.avgSatisfaction);

  const headline = `第 ${input.day} 天复盘：净现金流 ${formattedCash}，完成履约 ${input.servedCount} 单，平均满意度 ${satisfactionPct}%。`;

  let bottleneck = '今日供需衔接顺畅，无明显缺口或拥堵。';
  let nextDayAdvice = '建议保持现有备货余量，重点盯紧高峰时段的住客等待时长。';

  if (input.missedOrStockoutCount > 0) {
    bottleneck = `出现 ${input.missedOrStockoutCount} 次缺货或未及时履约，直接损失了潜在收入与口碑。`;
    nextDayAdvice = '明日开局优先补足核心供给与安全库存，避免高峰断供。';
  } else if (input.avgSatisfaction < 70) {
    bottleneck = `住客平均满意度为 ${satisfactionPct}%（低于 70% 警戒线），体验承压。`;
    nextDayAdvice = '明日优先疏导高等待住客，或针对性提升客房/服务设施等级。';
  } else if (input.netCashDelta < 0) {
    bottleneck = `当日净现金流为 ${formattedCash}，支出高于回款。`;
    nextDayAdvice = '明日控制非必要开支与冗余成本，优先保障高回报履约单量。';
  }

  return {
    headline,
    bottleneck,
    nextDayAdvice,
    canAdvanceDay: input.isSettled,
    lines: [headline, bottleneck, nextDayAdvice],
  };
}
