import { describe, it, expect } from 'vitest';
import {
  buildActorModelConfig,
  resolveActorVisualState,
  computeActorAnimationPose,
  STATE_BADGE_COLORS,
} from '../src/render/actorVisuals';

describe('Jinwan V8 3D actor archetypes, walk pose, and overhead status indicator', () => {
  it('distinguishes staff and guest archetypes with distinct colors and trim', () => {
    const staff = buildActorModelConfig('staff', 0, 'concierge_staff');
    const vip = buildActorModelConfig('guest', 2, 'vip_guest');
    const leisure = buildActorModelConfig('guest', 0, 'leisure_guest');

    expect(staff.role).toBe('staff');
    expect(staff.hatOrTrim).toBe('cap');
    expect(vip.hatOrTrim).toBe('crown_pin');
    expect(leisure.hatOrTrim).toBe('sun_hat');
    expect(staff.outfitColorHex).not.toBe(vip.outfitColorHex);
  });

  it('prioritizes alert over waiting, serving, walking, and idle states', () => {
    expect(resolveActorVisualState({ isMoving: true, satisfaction: 30 })).toBe(
      'alert'
    );
    expect(
      resolveActorVisualState({ isMoving: true, isWaiting: true, satisfaction: 80 })
    ).toBe('waiting');
    expect(
      resolveActorVisualState({ isMoving: false, isServing: true, satisfaction: 85 })
    ).toBe('serving');
    expect(resolveActorVisualState({ isMoving: true, satisfaction: 90 })).toBe(
      'walking'
    );
    expect(resolveActorVisualState({ isMoving: false, satisfaction: 90 })).toBe(
      'idle'
    );
  });

  it('animates walk cadence and pulses overhead indicator on waiting or alert', () => {
    const walkPose = computeActorAnimationPose({
      currentYaw: 0,
      targetYaw: Math.PI / 2,
      elapsed: 0.25,
      state: 'walking',
    });
    expect(walkPose.yaw).toBeGreaterThan(0);
    expect(walkPose.bobY).toBeGreaterThan(0);
    expect(Math.abs(walkPose.armSwing)).toBeGreaterThan(0);
    expect(Math.abs(walkPose.legSwing)).toBeGreaterThan(0);
    expect(walkPose.badgeColorHex).toBe(STATE_BADGE_COLORS.walking);
    expect(walkPose.badgeVisible).toBe(true);

    const idlePose = computeActorAnimationPose({
      currentYaw: 0,
      elapsed: 1,
      state: 'idle',
    });
    expect(idlePose.bobY).toBe(0);
    expect(idlePose.badgeVisible).toBe(false);
  });
});
