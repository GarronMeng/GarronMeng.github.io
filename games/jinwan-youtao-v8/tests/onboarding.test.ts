import { describe, it, expect } from 'vitest';
import { deriveOnboardingState } from '../src/core/onboarding';
import { buildEveningDigest } from '../src/core/evening';
import { evaluateOperationalAction } from '../src/ui/gameplay';

describe('Jinwan V8 onboarding, evening digest, and action guard', () => {
  it('progresses linearly across the 4 guided steps on Day 1', () => {
    const s0 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 0,
      servedOrdersCount: 0,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s0.currentStep.id).toBe('stock_supply');
    expect(s0.isCompleted).toBe(false);

    const s1 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 0,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s1.currentStep.id).toBe('serve_guest');

    const s2 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s2.currentStep.id).toBe('tune_operation');

    const s3 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 1,
      settledDaysCount: 0,
    });
    expect(s3.currentStep.id).toBe('settle_next_day');

    const s4 = deriveOnboardingState({
      day: 2,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 1,
      settledDaysCount: 1,
    });
    expect(s4.isCompleted).toBe(true);
  });

  it('builds a clear 3-line evening digest highlighting stockout bottlenecks', () => {
    const digest = buildEveningDigest({
      day: 1,
      netCashDelta: 420,
      servedCount: 5,
      missedOrStockoutCount: 2,
      avgSatisfaction: 78,
      isSettled: true,
    });
    expect(digest.headline).toContain('第 1 天结算');
    expect(digest.bottleneck).toContain('2 次缺货');
    expect(digest.canAdvanceDay).toBe(true);
  });

  it('explains why an action is blocked when day is settled or stock is short', () => {
    const settledGuard = evaluateOperationalAction({
      isDaySettled: true,
      currentCash: 1000,
      actionLabel: '补货',
    });
    expect(settledGuard.disabled).toBe(true);
    expect(settledGuard.reason).toContain('日结锁定');

    const stockGuard = evaluateOperationalAction({
      isDaySettled: false,
      currentCash: 1000,
      currentStock: 1,
      requiredStock: 3,
      actionLabel: '制作套餐',
    });
    expect(stockGuard.disabled).toBe(true);
    expect(stockGuard.reason).toContain('还差 2 份');
  });
});
