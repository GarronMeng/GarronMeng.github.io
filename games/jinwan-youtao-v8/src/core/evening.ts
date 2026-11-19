export interface EveningDigest {
  headline: string;
  bottleneck: string;
  nextDayAdvice: string;
  canAdvanceDay: boolean;
}

export function buildEveningDigest(stats: {
  day: number;
  netCashDelta: number;
  servedCount: number;
  missedOrStockoutCount: number;
  avgSatisfaction: number;
  isSettled: boolean;
}): EveningDigest {
  const netLabel =
    stats.netCashDelta >= 0
      ? `净流入 +¥${stats.netCashDelta}`
      : `净流出 -¥${Math.abs(stats.netCashDelta)}`;

  const headline = `第 ${stats.day} 天结算：${netLabel}，成功履约 ${stats.servedCount} 单，平均满意度 ${Math.round(stats.avgSatisfaction)}%。`;

  let bottleneck = '本日整体运转平稳，暂无明显阻塞。';
  let nextDayAdvice =
    '建议维持当前备货节奏，适度提升高客流时段的服务响应速度。';

  if (stats.missedOrStockoutCount > 0) {
    bottleneck = `存在 ${stats.missedOrStockoutCount} 次缺货或未及时履约记录，直接拉低了营收与口碑。`;
    nextDayAdvice =
      '明日开局优先提高安全库存与备餐余量，避免高峰期断供。';
  } else if (stats.avgSatisfaction < 70) {
    bottleneck = '住客等待或体验得分偏低，满意度处于预警区间。';
    nextDayAdvice =
      '明日优先疏导高等待住客，或针对性升级核心接待/客房设施。';
  } else if (stats.netCashDelta < 0) {
    bottleneck = '当日支出高于营收，现金流承压。';
    nextDayAdvice =
      '明日控制非必要采购与固定成本，优先保障高毛利履约订单。';
  }

  return {
    headline,
    bottleneck,
    nextDayAdvice,
    canAdvanceDay: stats.isSettled,
  };
}
