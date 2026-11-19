export interface ActionGuardInput {
  actionLabel: string;
  isDaySettled: boolean;
  currentCash: number;
  requiredCash?: number;
  currentStock?: number;
  requiredStock?: number;
}

export interface ActionGuardResult {
  disabled: boolean;
  reason?: string;
  suggestion?: string;
  message?: string;
}

/**
 * Evaluate whether an operational button can execute and return a human-readable
 * explanation plus next-step remedy when blocked.
 */
export function evaluateOperationalAction(
  input: ActionGuardInput
): ActionGuardResult {
  if (input.isDaySettled) {
    const reason = '今日已完成日结锁定，无法继续执行日间操作。';
    const suggestion = '点击「开启下一天」进入新一日经营。';
    return {
      disabled: true,
      reason,
      suggestion,
      message: `${reason} ${suggestion}`,
    };
  }

  if (
    typeof input.requiredStock === 'number' &&
    typeof input.currentStock === 'number' &&
    input.currentStock < input.requiredStock
  ) {
    const deficit = input.requiredStock - input.currentStock;
    const reason = `库存不足（还差 ${deficit} 份），无法执行「${input.actionLabel}」。`;
    const suggestion = '先前往运营/备货区补充库存。';
    return {
      disabled: true,
      reason,
      suggestion,
      message: `${reason} ${suggestion}`,
    };
  }

  if (
    typeof input.requiredCash === 'number' &&
    input.currentCash < input.requiredCash
  ) {
    const shortage = Math.ceil(input.requiredCash - input.currentCash);
    const reason = `可用资金不足（还差 ¥${shortage}），无法执行「${input.actionLabel}」。`;
    const suggestion = '先完成住客履约回笼资金，或选择更低成本选项。';
    return {
      disabled: true,
      reason,
      suggestion,
      message: `${reason} ${suggestion}`,
    };
  }

  return { disabled: false };
}
