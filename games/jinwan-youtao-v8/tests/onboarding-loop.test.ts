import { describe, it, expect } from 'vitest';
import { deriveOnboardingState } from '../src/core/onboardingLoop';
import { buildEveningDigest } from '../src/core/eveningDigest';
import { evaluateOperationalAction } from '../src/ui/actionGuard';

describe('Jinwan V8 onboarding, evening digest, and action guard', () => {
  it('advances sequentially through all 4 micro-steps on Day 1', () => {
    const s0 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 0,
      servedOrdersCount: 0,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s0.currentStep.id).toBe('stock_supply');
    expect(s0.completedCount).toBe(0);
    expect(s0.isCompleted).toBe(false);

    const s1 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 0,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s1.currentStep.id).toBe('serve_guest');
    expect(s1.completedCount).toBe(1);

    const s2 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 0,
      settledDaysCount: 0,
    });
    expect(s2.currentStep.id).toBe('tune_operation');
    expect(s2.completedCount).toBe(2);

    const s3 = deriveOnboardingState({
      day: 1,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 1,
      settledDaysCount: 0,
    });
    expect(s3.currentStep.id).toBe('settle_next_day');
    expect(s3.completedCount).toBe(3);

    const s4 = deriveOnboardingState({
      day: 2,
      restockOrPrepCount: 1,
      servedOrdersCount: 1,
      operationAdjustCount: 1,
      settledDaysCount: 1,
    });
    expect(s4.isCompleted).toBe(true);
    expect(s4.completedCount).toBe(4);
  });

  it('produces a 3-line evening digest highlighting stockout bottlenecks', () => {
    const digest = buildEveningDigest({
      day: 1,
      netCashDelta: 420,
      servedCount: 5,
      missedOrStockoutCount: 2,
      avgSatisfaction: 82,
      isSettled: true,
    });
    expect(digest.lines).toHaveLength(3);
    expect(digest.bottleneck).toContain('2');
    expect(digest.canAdvanceDay).toBe(true);
  });

  it('explains why an action is disabled and suggests a remedy', () => {
    const locked = evaluateOperationalAction({
      actionLabel: '接待晚餐订单',
      isDaySettled: true,
      currentCash: 1000,
    });
    expect(locked.disabled).toBe(true);
    expect(locked.reason).toContain('日结锁定');

    const lowStock = evaluateOperationalAction({
      actionLabel: '出餐履约',
      isDaySettled: false,
      currentCash: 1000,
      currentStock: 1,
      requiredStock: 3,
    });
    expect(lowStock.disabled).toBe(true);
    expect(lowStock.reason).toContain('2');
    expect(lowStock.suggestion).toBeTruthy();
  });
});
