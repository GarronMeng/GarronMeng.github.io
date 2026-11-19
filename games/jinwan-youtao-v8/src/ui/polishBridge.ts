import {
  deriveOnboardingState,
  type OnboardingProgressInput,
  type OnboardingProgressResult,
  type OnboardingTargetTab,
} from '../core/onboardingLoop';
import {
  buildEveningDigest,
  type EveningDigest,
  type EveningDigestInput,
} from '../core/eveningDigest';
import {
  evaluateOperationalAction,
  type ActionGuardInput,
  type ActionGuardResult,
} from './actionGuard';

export interface PolishLoopSnapshot {
  onboarding: OnboardingProgressInput;
  evening?: EveningDigestInput | null;
  pendingActions?: Record<string, ActionGuardInput>;
}

export interface PolishLoopViewModel {
  onboarding: OnboardingProgressResult;
  eveningDigest: EveningDigest | null;
  actionGuards: Record<string, ActionGuardResult>;
}

export interface PolishBridgeCallbacks {
  onNavigateTab?: (tab: OnboardingTargetTab) => void;
  onAdvanceNextDay?: () => void;
  onSkipOnboarding?: () => void;
}

/**
 * Computes a single unified view model for the 4-step onboarding bar,
 * 3-line evening digest card, and operational button guard tooltips.
 */
export function buildPolishLoopViewModel(
  snapshot: PolishLoopSnapshot
): PolishLoopViewModel {
  const onboarding = deriveOnboardingState(snapshot.onboarding);
  const eveningDigest = snapshot.evening
    ? buildEveningDigest(snapshot.evening)
    : null;

  const actionGuards: Record<string, ActionGuardResult> = {};
  if (snapshot.pendingActions) {
    for (const [actionId, guardInput] of Object.entries(snapshot.pendingActions)) {
      actionGuards[actionId] = evaluateOperationalAction(guardInput);
    }
  }

  return {
    onboarding,
    eveningDigest,
    actionGuards,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders a compact top-level onboarding guide strip HTML string.
 */
export function renderOnboardingBannerHtml(
  onboarding: OnboardingProgressResult
): string {
  if (onboarding.isCompleted) {
    return '';
  }

  const { currentStep, completedCount } = onboarding;
  const targetAttr = currentStep.targetTab
    ? ` data-polish-nav="${escapeHtml(currentStep.targetTab)}"`
    : '';

  return `
<aside class="jw-polish-guide" role="region" aria-label="新手引导进度">
  <div class="jw-polish-guide__meta">
    <span class="jw-polish-guide__badge">新手引导 ${completedCount}/${currentStep.totalSteps}</span>
    <strong class="jw-polish-guide__title">${escapeHtml(currentStep.title)}</strong>
  </div>
  <p class="jw-polish-guide__hint">${escapeHtml(currentStep.actionHint)}</p>
  <div class="jw-polish-guide__actions">
    ${
      currentStep.targetTab
        ? `<button type="button" class="jw-polish-btn jw-polish-btn--primary"${targetAttr}>前往处理</button>`
        : ''
    }
    <button type="button" class="jw-polish-btn jw-polish-btn--ghost" data-polish-skip="true">跳过引导</button>
  </div>
</aside>`.trim();
}

/**
 * Renders the 3-line end-of-day review panel HTML string.
 */
export function renderEveningDigestHtml(digest: EveningDigest | null): string {
  if (!digest) {
    return '';
  }

  return `
<section class="jw-polish-digest" role="region" aria-label="日终经营复盘">
  <h3 class="jw-polish-digest__heading">今日经营三行复盘</h3>
  <ul class="jw-polish-digest__list">
    <li class="jw-polish-digest__item jw-polish-digest__item--headline">${escapeHtml(digest.headline)}</li>
    <li class="jw-polish-digest__item jw-polish-digest__item--bottleneck">${escapeHtml(digest.bottleneck)}</li>
    <li class="jw-polish-digest__item jw-polish-digest__item--advice">${escapeHtml(digest.nextDayAdvice)}</li>
  </ul>
  ${
    digest.canAdvanceDay
      ? '<button type="button" class="jw-polish-btn jw-polish-btn--primary" data-polish-next-day="true">开启下一天</button>'
      : '<p class="jw-polish-digest__pending">完成今日结算后可开启下一天。</p>'
  }
</section>`.trim();
}

/**
 * Applies guard state, aria-disabled/disabled attributes, and readable reason tooltip
 * onto an operational button element.
 */
export function applyActionGuardToButton(
  button: {
    disabled: boolean;
    title: string;
    setAttribute: (name: string, value: string) => void;
    removeAttribute: (name: string) => void;
  },
  guard: ActionGuardResult
): void {
  button.disabled = guard.disabled;
  if (guard.disabled && guard.message) {
    button.title = guard.message;
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('data-guard-reason', guard.reason ?? guard.message);
  } else {
    button.title = '';
    button.removeAttribute('aria-disabled');
    button.removeAttribute('data-guard-reason');
  }
}

/**
 * Mounts and updates the onboarding + evening digest overlay inside a host container.
 * Safe to call repeatedly whenever the game state updates.
 */
export function mountPolishOverlay(
  container: HTMLElement,
  snapshot: PolishLoopSnapshot,
  callbacks: PolishBridgeCallbacks = {}
): PolishLoopViewModel {
  const vm = buildPolishLoopViewModel(snapshot);
  const guideHtml = renderOnboardingBannerHtml(vm.onboarding);
  const digestHtml = renderEveningDigestHtml(vm.eveningDigest);

  container.innerHTML = [guideHtml, digestHtml].filter(Boolean).join('\n');

  const navBtn = container.querySelector<HTMLButtonElement>('[data-polish-nav]');
  if (navBtn && callbacks.onNavigateTab) {
    const tab = navBtn.getAttribute('data-polish-nav') as OnboardingTargetTab;
    navBtn.addEventListener('click', () => callbacks.onNavigateTab?.(tab));
  }

  const skipBtn = container.querySelector<HTMLButtonElement>('[data-polish-skip]');
  if (skipBtn && callbacks.onSkipOnboarding) {
    skipBtn.addEventListener('click', () => callbacks.onSkipOnboarding?.());
  }

  const nextDayBtn = container.querySelector<HTMLButtonElement>(
    '[data-polish-next-day]'
  );
  if (nextDayBtn && callbacks.onAdvanceNextDay) {
    nextDayBtn.addEventListener('click', () => callbacks.onAdvanceNextDay?.());
  }

  return vm;
}
