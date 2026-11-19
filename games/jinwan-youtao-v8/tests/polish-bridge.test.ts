import { describe, it, expect } from 'vitest';
import {
  buildPolishLoopViewModel,
  renderOnboardingBannerHtml,
  renderEveningDigestHtml,
  applyActionGuardToButton,
} from '../src/ui/polishBridge';

describe('Jinwan V8 polishBridge UI adapter', () => {
  it('builds unified view model for onboarding, evening digest, and action guards', () => {
    const vm = buildPolishLoopViewModel({
      onboarding: {
        day: 1,
        restockOrPrepCount: 1,
        servedOrdersCount: 0,
        operationAdjustCount: 0,
        settledDaysCount: 0,
      },
      evening: {
        day: 1,
        netCashDelta: 300,
        servedCount: 4,
        missedOrStockoutCount: 1,
        avgSatisfaction: 78,
        isSettled: true,
      },
      pendingActions: {
        serveMeal: {
          actionLabel: '出餐履约',
          isDaySettled: false,
          currentCash: 500,
          currentStock: 0,
          requiredStock: 1,
        },
      },
    });

    expect(vm.onboarding.currentStep.id).toBe('serve_guest');
    expect(vm.eveningDigest?.lines).toHaveLength(3);
    expect(vm.actionGuards.serveMeal.disabled).toBe(true);

    const guideHtml = renderOnboardingBannerHtml(vm.onboarding);
    expect(guideHtml).toContain('新手引导 1/4');
    expect(guideHtml).toContain('data-polish-nav="guests"');

    const digestHtml = renderEveningDigestHtml(vm.eveningDigest);
    expect(digestHtml).toContain('今日经营三行复盘');
    expect(digestHtml).toContain('开启下一天');
  });

  it('applies disabled reason and clears attributes when action becomes available', () => {
    const attrs = new Map<string, string>();
    const fakeBtn = {
      disabled: false,
      title: '',
      setAttribute: (k: string, v: string) => {
        attrs.set(k, v);
      },
      removeAttribute: (k: string) => {
        attrs.delete(k);
      },
    };

    applyActionGuardToButton(fakeBtn, {
      disabled: true,
      reason: '今日已完成日结锁定，无法继续执行日间操作。',
      suggestion: '点击「开启下一天」进入新一日经营。',
      message: '今日已完成日结锁定，无法继续执行日间操作。 点击「开启下一天」进入新一日经营。',
    });

    expect(fakeBtn.disabled).toBe(true);
    expect(fakeBtn.title).toContain('日结锁定');
    expect(attrs.get('aria-disabled')).toBe('true');

    applyActionGuardToButton(fakeBtn, { disabled: false });
    expect(fakeBtn.disabled).toBe(false);
    expect(fakeBtn.title).toBe('');
    expect(attrs.has('aria-disabled')).toBe(false);
  });
});
