export type OnboardingStepId =
  | 'stock_supply'
  | 'serve_guest'
  | 'tune_operation'
  | 'settle_next_day'
  | 'completed';

export type OnboardingTargetTab =
  | 'operations'
  | 'guests'
  | 'facilities'
  | 'finance'
  | 'dayLoop';

export interface OnboardingStepView {
  id: OnboardingStepId;
  stepNumber: number;
  totalSteps: number;
  title: string;
  actionHint: string;
  targetTab?: OnboardingTargetTab;
  done: boolean;
  rewardText: string;
}

export interface OnboardingProgressInput {
  day: number;
  restockOrPrepCount: number;
  servedOrdersCount: number;
  operationAdjustCount: number;
  settledDaysCount: number;
  skipped?: boolean;
}

export interface OnboardingProgressResult {
  currentStep: OnboardingStepView;
  steps: OnboardingStepView[];
  completedCount: number;
  isCompleted: boolean;
}

/**
 * Derive the 4-step Day 1 micro-loop onboarding state from core progress counters.
 */
export function deriveOnboardingState(
  input: OnboardingProgressInput
): OnboardingProgressResult {
  const step1Done = input.restockOrPrepCount >= 1;
  const step2Done = step1Done && input.servedOrdersCount >= 1;
  const step3Done = step2Done && input.operationAdjustCount >= 1;
  const step4Done = step3Done && (input.settledDaysCount >= 1 || input.day >= 2);

  const steps: OnboardingStepView[] = [
    {
      id: 'stock_supply',
      stepNumber: 1,
      totalSteps: 4,
      title: '备齐首批经营供给',
      actionHint:
        '前往运营/库存面板完成 1 次补货或备餐，确保后续住客需求有真实库存可履约。',
      targetTab: 'operations',
      done: step1Done,
      rewardText: '打通“库存前提”并解锁稳定接待',
    },
    {
      id: 'serve_guest',
      stepNumber: 2,
      totalSteps: 4,
      title: '完成首单住客履约',
      actionHint:
        '接待并完成 1 位住客的餐食或住宿/服务需求，观察库存扣减、现金入账与满意度变化。',
      targetTab: 'guests',
      done: step2Done,
      rewardText: '跑通“履约 → 收益 → 口碑”核心闭环',
    },
    {
      id: 'tune_operation',
      stepNumber: 3,
      totalSteps: 4,
      title: '做 1 次经营微调或疏导',
      actionHint:
        '调整设施/服务/排班策略，或优先处理等待中的住客，建立配置与效率的因果感知。',
      targetTab: 'facilities',
      done: step3Done,
      rewardText: '掌握关键杠杆调节，降低高峰期排队与断供风险',
    },
    {
      id: 'settle_next_day',
      stepNumber: 4,
      totalSteps: 4,
      title: '完成当日结算并开启次日',
      actionHint:
        '推进至日终完成账本结算，查看三行式经营复盘与明日建议，然后点击开启下一天。',
      targetTab: 'dayLoop',
      done: step4Done,
      rewardText: '完成完整日循环，进入常规经营与战役节奏',
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const isCompleted = Boolean(input.skipped) || step4Done;

  const currentStep: OnboardingStepView =
    steps.find((s) => !s.done) ?? {
      id: 'completed',
      stepNumber: 4,
      totalSteps: 4,
      title: '新手引导循环已完成',
      actionHint:
        '已走通备货、履约、微调与日结全链路，可自由统筹库存、设施、人力与战役目标。',
      done: true,
      rewardText: '常规经营模式已就绪',
    };

  return {
    currentStep,
    steps,
    completedCount,
    isCompleted,
  };
}
