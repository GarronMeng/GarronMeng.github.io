export type ActorRole = 'staff' | 'guest';

export type ActorVisualState =
  | 'idle'
  | 'walking'
  | 'serving'
  | 'waiting'
  | 'alert';

export type ActorArchetypeId =
  | 'concierge_staff'
  | 'housekeeping_staff'
  | 'dining_staff'
  | 'business_guest'
  | 'leisure_guest'
  | 'vip_guest';

export interface ActorVisualSpec {
  id: string;
  role: ActorRole;
  archetype: ActorArchetypeId;
  variantIndex: number;
  state: ActorVisualState;
  satisfaction?: number; // 0 - 100
  targetYaw?: number;
}

export interface ActorAnimationPose {
  yaw: number;
  bobY: number;
  leanZ: number;
  armSwing: number;
  legSwing: number;
  badgeScale: number;
  badgeColorHex: number;
  badgeVisible: boolean;
}

export interface ActorModelConfig {
  archetype: ActorArchetypeId;
  role: ActorRole;
  label: string;
  headRadius: number;
  torsoRadiusTop: number;
  torsoRadiusBottom: number;
  torsoHeight: number;
  accentColorHex: number;
  outfitColorHex: number;
  hatOrTrim: 'cap' | 'apron' | 'badge_sash' | 'briefcase_accent' | 'sun_hat' | 'crown_pin';
}

const STAFF_PALETTES = [0x1e4d6b, 0x1f6f78, 0x2b5876];
const GUEST_PALETTES = [0xd97706, 0x059669, 0x7c3aed, 0xdb2777, 0x2563eb];

export const STATE_BADGE_COLORS: Record<ActorVisualState, number> = {
  idle: 0x94a3b8,     // slate - calm / idle
  walking: 0x38bdf8,  // sky - en route
  serving: 0x10b981,  // emerald - fulfilling / served
  waiting: 0xf59e0b,  // amber - waiting for service
  alert: 0xef4444,    // red - low satisfaction / urgent
};

export function resolveActorVisualState(params: {
  isMoving: boolean;
  isServing?: boolean;
  isWaiting?: boolean;
  satisfaction?: number;
}): ActorVisualState {
  if (typeof params.satisfaction === 'number' && params.satisfaction < 45) {
    return 'alert';
  }
  if (params.isWaiting) {
    return 'waiting';
  }
  if (params.isServing) {
    return 'serving';
  }
  if (params.isMoving) {
    return 'walking';
  }
  return 'idle';
}

export function buildActorModelConfig(
  role: ActorRole,
  variantIndex: number,
  archetype?: ActorArchetypeId
): ActorModelConfig {
  const safeIdx = Math.abs(Math.trunc(variantIndex));

  if (role === 'staff') {
    const resolvedArchetype: ActorArchetypeId =
      archetype ??
      (['concierge_staff', 'housekeeping_staff', 'dining_staff'][
        safeIdx % 3
      ] as ActorArchetypeId);

    if (resolvedArchetype === 'housekeeping_staff') {
      return {
        archetype: resolvedArchetype,
        role: 'staff',
        label: '客房服务员',
        headRadius: 0.22,
        torsoRadiusTop: 0.24,
        torsoRadiusBottom: 0.28,
        torsoHeight: 0.72,
        outfitColorHex: STAFF_PALETTES[1],
        accentColorHex: 0x34d399,
        hatOrTrim: 'apron',
      };
    }

    if (resolvedArchetype === 'dining_staff') {
      return {
        archetype: resolvedArchetype,
        role: 'staff',
        label: '餐饮服务员',
        headRadius: 0.22,
        torsoRadiusTop: 0.23,
        torsoRadiusBottom: 0.27,
        torsoHeight: 0.72,
        outfitColorHex: STAFF_PALETTES[2],
        accentColorHex: 0xfbbf24,
        hatOrTrim: 'badge_sash',
      };
    }

    return {
      archetype: 'concierge_staff',
      role: 'staff',
      label: '礼宾接待员',
      headRadius: 0.23,
      torsoRadiusTop: 0.25,
      torsoRadiusBottom: 0.29,
      torsoHeight: 0.75,
      outfitColorHex: STAFF_PALETTES[0],
      accentColorHex: 0x60a5fa,
      hatOrTrim: 'cap',
    };
  }

  const resolvedGuestArchetype: ActorArchetypeId =
    archetype ??
    (['leisure_guest', 'business_guest', 'vip_guest'][
      safeIdx % 3
    ] as ActorArchetypeId);
  const outfitColorHex = GUEST_PALETTES[safeIdx % GUEST_PALETTES.length];

  if (resolvedGuestArchetype === 'vip_guest') {
    return {
      archetype: 'vip_guest',
      role: 'guest',
      label: '尊享住客',
      headRadius: 0.23,
      torsoRadiusTop: 0.25,
      torsoRadiusBottom: 0.28,
      torsoHeight: 0.74,
      outfitColorHex,
      accentColorHex: 0xf59e0b,
      hatOrTrim: 'crown_pin',
    };
  }

  if (resolvedGuestArchetype === 'business_guest') {
    return {
      archetype: 'business_guest',
      role: 'guest',
      label: '商旅住客',
      headRadius: 0.22,
      torsoRadiusTop: 0.25,
      torsoRadiusBottom: 0.27,
      torsoHeight: 0.74,
      outfitColorHex,
      accentColorHex: 0x38bdf8,
      hatOrTrim: 'briefcase_accent',
    };
  }

  return {
    archetype: 'leisure_guest',
    role: 'guest',
    label: '度假住客',
    headRadius: 0.22,
    torsoRadiusTop: 0.23,
    torsoRadiusBottom: 0.29,
    torsoHeight: 0.7,
    outfitColorHex,
    accentColorHex: 0xfb7185,
    hatOrTrim: 'sun_hat',
  };
}

/**
 * Pure pose solver for smooth rotation, walk cadence, limb swing, and overhead
 * status indicator pulse so both Three.js runtime and unit tests stay deterministic.
 */
export function computeActorAnimationPose(params: {
  currentYaw: number;
  targetYaw?: number;
  elapsed: number;
  state: ActorVisualState;
  turnLerp?: number;
}): ActorAnimationPose {
  const lerp = Math.min(1, Math.max(0, params.turnLerp ?? 0.2));
  let yaw = params.currentYaw;

  if (typeof params.targetYaw === 'number') {
    const shortestDelta = Math.atan2(
      Math.sin(params.targetYaw - yaw),
      Math.cos(params.targetYaw - yaw)
    );
    yaw += shortestDelta * lerp;
  }

  const isWalking = params.state === 'walking';
  const walkPhase = params.elapsed * 9.5;
  const bobY = isWalking ? Math.abs(Math.sin(walkPhase)) * 0.065 : 0;
  const leanZ = isWalking ? Math.sin(walkPhase) * 0.055 : 0;
  const armSwing = isWalking
    ? Math.sin(walkPhase) * 0.42
    : params.state === 'serving'
      ? Math.sin(params.elapsed * 6) * 0.18
      : 0;
  const legSwing = isWalking ? -Math.sin(walkPhase) * 0.38 : 0;

  const isUrgent = params.state === 'waiting' || params.state === 'alert';
  const badgeScale = isUrgent
    ? 1 + Math.sin(params.elapsed * 6.5) * 0.16
    : params.state === 'serving'
      ? 1 + Math.sin(params.elapsed * 4) * 0.06
      : 1;

  return {
    yaw,
    bobY,
    leanZ,
    armSwing,
    legSwing,
    badgeScale,
    badgeColorHex: STATE_BADGE_COLORS[params.state],
    badgeVisible: params.state !== 'idle',
  };
}

/**
 * Applies a computed pose onto a Three.js-like actor rig and overhead indicator.
 */
export function applyActorRigPose(
  rig: {
    rotation?: { y: number; z: number };
    position?: { y: number };
    leftArm?: { rotation?: { x: number } };
    rightArm?: { rotation?: { x: number } };
    leftLeg?: { rotation?: { x: number } };
    rightLeg?: { rotation?: { x: number } };
    badge?: {
      visible?: boolean;
      material?: { color?: { setHex?: (hex: number) => void } };
      scale?: { setScalar?: (v: number) => void };
    } | null;
  },
  pose: ActorAnimationPose
): void {
  if (rig.rotation) {
    rig.rotation.y = pose.yaw;
    rig.rotation.z = pose.leanZ;
  }
  if (rig.position) {
    rig.position.y = pose.bobY;
  }
  if (rig.leftArm?.rotation) {
    rig.leftArm.rotation.x = pose.armSwing;
  }
  if (rig.rightArm?.rotation) {
    rig.rightArm.rotation.x = -pose.armSwing;
  }
  if (rig.leftLeg?.rotation) {
    rig.leftLeg.rotation.x = pose.legSwing;
  }
  if (rig.rightLeg?.rotation) {
    rig.rightLeg.rotation.x = -pose.legSwing;
  }
  if (rig.badge) {
    rig.badge.visible = pose.badgeVisible;
    rig.badge.material?.color?.setHex?.(pose.badgeColorHex);
    rig.badge.scale?.setScalar?.(pose.badgeScale);
  }
}
