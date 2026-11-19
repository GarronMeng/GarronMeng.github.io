(() => {
  'use strict';

  const SAVE_KEY = 'jinwan_youtao_v9_state';
  const DAY_START_HOUR = 8;
  const DAY_END_HOUR = 21; // 13 in-game hours per day

  // --- Lightweight Web Audio Chimes (zero external files) ---
  class SoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }
    ensure() {
      if (!this.enabled) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }
    tone(freq, dur = 0.12, type = 'sine', gainVal = 0.06, delay = 0) {
      const ctx = this.ensure();
      if (!ctx) return;
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    }
    coin() {
      this.tone(784, 0.09, 'triangle', 0.07, 0);
      this.tone(1046, 0.14, 'triangle', 0.07, 0.06);
    }
    bell() {
      this.tone(880, 0.22, 'sine', 0.05, 0);
    }
    warn() {
      this.tone(240, 0.16, 'sawtooth', 0.04, 0);
    }
    upgrade() {
      this.tone(523, 0.09, 'triangle', 0.06, 0);
      this.tone(659, 0.09, 'triangle', 0.06, 0.07);
      this.tone(784, 0.15, 'triangle', 0.06, 0.14);
    }
  }
  const sfx = new SoundFX();

  // --- Initial State Factory ---
  function createInitialState() {
    return {
      day: 1,
      hour: DAY_START_HOUR,
      speed: 1,
      paused: false,
      isDaySettled: false,
      cash: 1200,
      mealStock: 2,
      satisfaction: 85,
      rooms: [
        { id: '101', name: '101 观海大床房', unlocked: true, status: 'ready', guestId: null, gx: 1.5, gy: 1.4 },
        { id: '102', name: '102 听涛双床房', unlocked: true, status: 'ready', guestId: null, gx: 4.5, gy: 1.4 },
        { id: '103', name: '103 悠桃露台套房', unlocked: false, status: 'ready', guestId: null, gx: 7.5, gy: 1.4, unlockCost: 650 },
        { id: '104', name: '104 行政湾景套房', unlocked: false, status: 'ready', guestId: null, gx: 10.2, gy: 1.4, unlockCost: 980 },
      ],
      upgrades: {
        lobby: 1,
        kitchen: 1,
        rooms: 1,
      },
      staff: [
        {
          id: 'staff-1',
          name: '林晨',
          role: 'concierge',
          label: '礼宾接待',
          wage: 80,
          x: 2.6,
          y: 5.5,
          tx: 2.6,
          ty: 5.5,
          yaw: 0,
          state: 'idle',
          busyTimer: 0,
        },
      ],
      guests: [],
      nextGuestSeq: 1,
      spawnTimer: 1.8,
      onboarding: {
        restockCount: 0,
        servedCount: 0,
        tunedCount: 0,
        settledCount: 0,
        skipped: false,
      },
      ledger: createEmptyLedger(1200),
    };
  }

  function createEmptyLedger(openingCash) {
    return {
      openingCash,
      roomRevenue: 0,
      diningRevenue: 0,
      milestoneBonus: 0,
      restockCost: 0,
      upgradeCost: 0,
      staffWage: 0,
      servedOrders: 0,
      missedOrders: 0,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return createInitialState();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.day !== 'number' || !Array.isArray(parsed.rooms)) {
        return createInitialState();
      }
      return parsed;
    } catch {
      return createInitialState();
    }
  }

  let state = loadState();
  let activeDrawer = null;
  const floatTexts = [];
  let elapsedTime = 0;

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {}
  }

  // --- Economy & Invariant Helpers ---
  function getNetCashDelta() {
    const l = state.ledger;
    return (
      l.roomRevenue +
      l.diningRevenue +
      l.milestoneBonus -
      l.restockCost -
      l.upgradeCost -
      l.staffWage
    );
  }

  function evaluateActionGuard({ actionLabel, requiredCash = 0, requiredStock = 0 }) {
    if (state.isDaySettled) {
      return {
        disabled: true,
        reason: '今日已完成日结锁定，无法执行日间操作，请先开启下一天。',
      };
    }
    if (requiredStock > 0 && state.mealStock < requiredStock) {
      return {
        disabled: true,
        reason: `餐食库存不足（还差 ${requiredStock - state.mealStock} 份），请先前往「备货补餐」。`,
      };
    }
    if (requiredCash > 0 && state.cash < requiredCash) {
      return {
        disabled: true,
        reason: `现金不足（还差 ¥${Math.ceil(requiredCash - state.cash)}），先接待住客回笼资金。`,
      };
    }
    return { disabled: false, reason: '' };
  }

  function deriveOnboarding() {
    const ob = state.onboarding;
    const s1 = ob.restockCount >= 1;
    const s2 = s1 && ob.servedCount >= 1;
    const s3 = s2 && ob.tunedCount >= 1;
    const s4 = s3 && (ob.settledCount >= 1 || state.day >= 2);
    const steps = [
      {
        id: 'restock',
        title: '备齐首批餐食供给',
        hint: '点击下方「备货补餐」补充食材，确保住客点餐有真实库存可履约。',
        targetPanel: 'restock',
        done: s1,
      },
      {
        id: 'serve',
        title: '完成首单住客接待或出餐',
        hint: '点击大堂或餐吧里带气泡的住客，完成入住登记或端出餐食。',
        targetPanel: null,
        done: s2,
      },
      {
        id: 'tune',
        title: '做 1 次设施升级或员工增派',
        hint: '打开「设施与扩建」或「员工排班」，提升接待速度与单价收益。',
        targetPanel: 'facilities',
        done: s3,
      },
      {
        id: 'settle',
        title: '体验日终结算并开启第 2 天',
        hint: '等待营业结束或点击右下角「提前日结」，查看今日三行复盘。',
        targetPanel: 'settle',
        done: s4,
      },
    ];
    const completedCount = steps.filter((s) => s.done).length;
    const isCompleted = ob.skipped || s4;
    const current = steps.find((s) => !s.done) || steps[steps.length - 1];
    return { steps, current, completedCount, isCompleted };
  }

  function buildEveningDigest() {
    const net = getNetCashDelta();
    const sign = net >= 0 ? '+' : '-';
    const sat = Math.round(state.satisfaction);
    const headline = `第 ${state.day} 天结算：净现金流 ${sign}¥${Math.abs(net)}，完成履约 ${state.ledger.servedOrders} 单，平均满意度 ${sat}%。`;

    let bottleneck = '今日供需衔接顺畅，客房与餐饮运转平稳。';
    let advice = '明日可考虑扩建新客房或增派餐饮/客房员工，进一步放大单日营收。';

    if (state.ledger.missedOrders > 0) {
      bottleneck = `今日出现 ${state.ledger.missedOrders} 次超时流失或缺货未履约，直接损失了收入与口碑。`;
      advice = '明日开局优先补足餐食安全库存，并及时点击或增派员工分担高峰接待。';
    } else if (sat < 72) {
      bottleneck = `平均满意度 ${sat}% 偏低，住客等待时间过长。`;
      advice = '明日优先升级大堂/餐吧效率，或增派礼宾与餐饮员工自动服务。';
    } else if (net < 0) {
      bottleneck = `今日支出高于营收（净流出 ¥${Math.abs(net)}），现金流承压。`;
      advice = '明日减少大额固定扩建，先靠稳定入住与出餐积累现金储备。';
    }

    return { headline, bottleneck, advice };
  }

  // --- UI Notifications & Floating Text ---
  const toastStack = document.getElementById('toast-stack');
  function showToast(text, kind = 'info') {
    const el = document.createElement('div');
    el.className = `toast ${kind === 'good' ? 'toast--good' : kind === 'warn' ? 'toast--warn' : ''}`;
    el.textContent = text;
    toastStack.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function addFloatText(gx, gy, text, color = '#f6d58e') {
    floatTexts.push({ gx, gy, text, color, life: 1.35, maxLife: 1.35 });
  }

  // --- Guest & Staff Simulation ---
  const GUEST_ARCHETYPES = [
    { key: 'leisure', label: '度假住客', color: '#e07a5f', accent: '#f4d35e', roomRate: 240, mealRate: 95, patience: 26 },
    { key: 'business', label: '商旅住客', color: '#3b82f6', accent: '#93c5fd', roomRate: 300, mealRate: 120, patience: 21 },
    { key: 'vip', label: '尊享住客', color: '#8b5cf6', accent: '#fbbf24', roomRate: 420, mealRate: 165, patience: 23 },
  ];

  function spawnGuest() {
    if (state.isDaySettled || state.guests.length >= 6) return;
    const readyRooms = state.rooms.filter((r) => r.unlocked && r.status === 'ready');
    const wantCheckin = readyRooms.length > 0 && Math.random() < 0.65;
    const archIdx = state.day >= 2 && Math.random() < 0.25 ? 2 : Math.random() < 0.45 ? 1 : 0;
    const arch = GUEST_ARCHETYPES[archIdx];

    const slotOffset = (state.guests.length % 3) * 0.7;
    const targetX = wantCheckin ? 2.5 + slotOffset : 7.6 + slotOffset;
    const targetY = wantCheckin ? 6.6 : 6.4;

    state.guests.push({
      id: `g-${state.nextGuestSeq++}`,
      archetype: arch.key,
      label: arch.label,
      color: arch.color,
      accent: arch.accent,
      need: wantCheckin ? 'checkin' : 'meal', // checkin | meal | staying | leaving
      x: 5.5,
      y: 9.4,
      tx: targetX,
      ty: targetY,
      yaw: 0,
      patience: arch.patience + state.upgrades.lobby * 2,
      maxPatience: arch.patience + state.upgrades.lobby * 2,
      stayTimer: 0,
      roomId: null,
      roomRate: Math.round(arch.roomRate * (1 + (state.upgrades.rooms - 1) * 0.22)),
      mealRate: Math.round(arch.mealRate * (1 + (state.upgrades.kitchen - 1) * 0.2)),
    });
    sfx.bell();
  }

  function fulfillGuest(guest, byStaff = false) {
    if (state.isDaySettled) {
      showToast('今日已日结锁定，请先开启下一天。', 'warn');
      return false;
    }

    if (guest.need === 'checkin') {
      const room = state.rooms.find((r) => r.unlocked && r.status === 'ready');
      if (!room) {
        if (!byStaff) showToast('暂无空净房！请点击待清洁客房或扩建新房。', 'warn');
        sfx.warn();
        return false;
      }
      room.status = 'occupied';
      room.guestId = guest.id;
      guest.roomId = room.id;
      guest.need = 'staying';
      guest.stayTimer = 9 + Math.random() * 4;
      guest.tx = room.gx;
      guest.ty = room.gy + 0.5;

      state.cash += guest.roomRate;
      state.ledger.roomRevenue += guest.roomRate;
      state.ledger.servedOrders += 1;
      state.onboarding.servedCount += 1;
      state.satisfaction = Math.min(100, state.satisfaction + 2.5);

      addFloatText(guest.x, guest.y, `+¥${guest.roomRate} 入住`, '#34d399');
      sfx.coin();
      saveState();
      updateUI();
      return true;
    }

    if (guest.need === 'meal') {
      if (state.mealStock < 1) {
        if (!byStaff) {
          showToast('餐食库存不足！请先点击「备货补餐」补充食材。', 'warn');
          sfx.warn();
        }
        return false;
      }
      state.mealStock -= 1;
      state.cash += guest.mealRate;
      state.ledger.diningRevenue += guest.mealRate;
      state.ledger.servedOrders += 1;
      state.onboarding.servedCount += 1;
      state.satisfaction = Math.min(100, state.satisfaction + 2);

      guest.need = 'leaving';
      guest.tx = 5.5;
      guest.ty = 9.8;

      addFloatText(guest.x, guest.y, `+¥${guest.mealRate} 出餐`, '#f6d58e');
      sfx.coin();
      saveState();
      updateUI();
      return true;
    }

    return false;
  }

  function cleanRoom(room, byStaff = false) {
    if (state.isDaySettled || room.status !== 'dirty') return false;
    room.status = 'ready';
    room.guestId = null;
    addFloatText(room.gx, room.gy, '✨ 已打扫', '#38bdf8');
    if (!byStaff) sfx.tone(660, 0.08, 'sine', 0.05);
    saveState();
    updateUI();
    return true;
  }

  // --- Player Management Actions ---
  function buyStock(amount, cost) {
    const guard = evaluateActionGuard({ actionLabel: '备货补餐', requiredCash: cost });
    if (guard.disabled) {
      showToast(guard.reason, 'warn');
      sfx.warn();
      return;
    }
    state.cash -= cost;
    state.mealStock += amount;
    state.ledger.restockCost += cost;
    state.onboarding.restockCount += 1;
    addFloatText(8.2, 5.2, `+${amount} 餐食`, '#34d399');
    showToast(`已补货 ${amount} 份餐食（支出 ¥${cost}）`, 'good');
    sfx.coin();
    saveState();
    updateUI();
    renderDrawer();
  }

  function upgradeFacility(key) {
    const level = state.upgrades[key];
    const cost = Math.round(320 * Math.pow(1.65, level - 1));
    const guard = evaluateActionGuard({ actionLabel: '升级设施', requiredCash: cost });
    if (guard.disabled) {
      showToast(guard.reason, 'warn');
      sfx.warn();
      return;
    }
    state.cash -= cost;
    state.upgrades[key] += 1;
    state.ledger.upgradeCost += cost;
    state.onboarding.tunedCount += 1;
    showToast(`设施升级至 Lv.${state.upgrades[key]}！服务与收益已提升`, 'good');
    sfx.upgrade();
    saveState();
    updateUI();
    renderDrawer();
  }

  function unlockRoom(roomId) {
    const room = state.rooms.find((r) => r.id === roomId);
    if (!room || room.unlocked) return;
    const guard = evaluateActionGuard({ actionLabel: `扩建 ${room.name}`, requiredCash: room.unlockCost });
    if (guard.disabled) {
      showToast(guard.reason, 'warn');
      sfx.warn();
      return;
    }
    state.cash -= room.unlockCost;
    room.unlocked = true;
    room.status = 'ready';
    state.ledger.upgradeCost += room.unlockCost;
    state.onboarding.tunedCount += 1;
    addFloatText(room.gx, room.gy, '新房开业!', '#f6d58e');
    showToast(`${room.name} 已正式投入营业！`, 'good');
    sfx.upgrade();
    saveState();
    updateUI();
    renderDrawer();
  }

  function hireStaff(role, name, label, hireCost, wage) {
    const guard = evaluateActionGuard({ actionLabel: `雇佣${label}`, requiredCash: hireCost });
    if (guard.disabled) {
      showToast(guard.reason, 'warn');
      sfx.warn();
      return;
    }
    state.cash -= hireCost;
    state.ledger.upgradeCost += hireCost;
    state.onboarding.tunedCount += 1;
    const spawnPos =
      role === 'dining' ? { x: 8.2, y: 5.5 } : role === 'housekeeping' ? { x: 5.2, y: 3.4 } : { x: 3.4, y: 5.5 };
    state.staff.push({
      id: `staff-${Date.now()}`,
      name,
      role,
      label,
      wage,
      x: spawnPos.x,
      y: spawnPos.y,
      tx: spawnPos.x,
      ty: spawnPos.y,
      yaw: 0,
      state: 'idle',
      busyTimer: 0,
    });
    showToast(`${name}（${label}）已上岗！将自动分担对应服务`, 'good');
    sfx.upgrade();
    saveState();
    updateUI();
    renderDrawer();
  }

  // --- Settlement & Next Day ---
  function settleCurrentDay() {
    if (state.isDaySettled) {
      openSettlementModal();
      return;
    }
    state.isDaySettled = true;
    state.paused = true;

    // Deduct daily staff wages
    const totalWages = state.staff.reduce((sum, st) => sum + st.wage, 0);
    state.cash -= totalWages;
    state.ledger.staffWage += totalWages;

    // Day 1 milestone reward for completing first day
    if (state.day === 1 && state.ledger.servedOrders >= 1) {
      state.cash += 180;
      state.ledger.milestoneBonus += 180;
    }

    state.onboarding.settledCount += 1;
    closeDrawer();
    saveState();
    updateUI();
    openSettlementModal();
  }

  function startNextDay() {
    if (!state.isDaySettled) return;
    state.day += 1;
    state.hour = DAY_START_HOUR;
    state.isDaySettled = false;
    state.paused = false;
    state.guests = [];
    state.rooms.forEach((r) => {
      if (r.unlocked) {
        r.status = 'ready';
        r.guestId = null;
      }
    });
    state.ledger = createEmptyLedger(state.cash);
    state.spawnTimer = 1.5;

    document.getElementById('settlement-modal').classList.add('hidden');
    showToast(`欢迎来到第 ${state.day} 天，酒店开始营业！`, 'good');
    sfx.bell();
    saveState();
    updateUI();
  }

  function openSettlementModal() {
    const modal = document.getElementById('settlement-modal');
    const net = getNetCashDelta();
    const digest = buildEveningDigest();

    document.getElementById('settle-heading').textContent = `第 ${state.day} 天经营复盘`;
    document.getElementById('settle-metrics').innerHTML = `
      <div class="settle-stat"><span>客房 + 餐饮营收</span><strong style="color:#34d399">+¥${state.ledger.roomRevenue + state.ledger.diningRevenue}</strong></div>
      <div class="settle-stat"><span>补货 + 人力 + 建设</span><strong style="color:#f87171">-¥${state.ledger.restockCost + state.ledger.staffWage + state.ledger.upgradeCost}</strong></div>
      <div class="settle-stat"><span>里程碑奖励</span><strong style="color:#f6d58e">+¥${state.ledger.milestoneBonus}</strong></div>
      <div class="settle-stat"><span>当日净现金流</span><strong style="color:${net >= 0 ? '#34d399' : '#f87171'}">${net >= 0 ? '+' : '-'}¥${Math.abs(net)}</strong></div>
    `;

    document.getElementById('digest-headline').textContent = digest.headline;
    document.getElementById('digest-bottleneck').textContent = digest.bottleneck;
    document.getElementById('digest-advice').textContent = digest.advice;
    document.getElementById('btn-next-day').textContent = `开启第 ${state.day + 1} 天经营 →`;
    modal.classList.remove('hidden');
  }

  // --- Simulation Tick ---
  function stepSimulation(dt) {
    if (state.paused || state.isDaySettled) return;
    const simDt = dt * state.speed;

    // Advance clock (~75 real seconds at 1x per full 13h day)
    state.hour += simDt * (13 / 75);
    if (state.hour >= DAY_END_HOUR) {
      state.hour = DAY_END_HOUR;
      settleCurrentDay();
      return;
    }

    // Guest spawn cadence scales smoothly by day & lobby level
    state.spawnTimer -= simDt;
    if (state.spawnTimer <= 0) {
      spawnGuest();
      const baseGap = Math.max(3.6, 6.8 - state.day * 0.45 - state.upgrades.lobby * 0.35);
      state.spawnTimer = baseGap + Math.random() * 2.2;
    }

    // Move & update guests
    for (let i = state.guests.length - 1; i >= 0; i--) {
      const g = state.guests[i];
      const dx = g.tx - g.x;
      const dy = g.ty - g.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.08) {
        const move = Math.min(dist, 2.2 * simDt);
        g.x += (dx / dist) * move;
        g.y += (dy / dist) * move;
        g.yaw = Math.atan2(dy, dx);
        g.moving = true;
      } else {
        g.moving = false;
      }

      if (g.need === 'checkin' || g.need === 'meal') {
        if (!g.moving) {
          g.patience -= simDt;
          if (g.patience <= 0) {
            state.ledger.missedOrders += 1;
            state.satisfaction = Math.max(20, state.satisfaction - 6);
            addFloatText(g.x, g.y, '等待超时 -口碑', '#f87171');
            g.need = 'leaving';
            g.tx = 5.5;
            g.ty = 9.8;
            sfx.warn();
          }
        }
      } else if (g.need === 'staying' && !g.moving) {
        g.stayTimer -= simDt;
        if (g.stayTimer <= 0) {
          const room = state.rooms.find((r) => r.id === g.roomId);
          if (room) {
            room.status = 'dirty';
            room.guestId = null;
          }
          g.need = 'leaving';
          g.tx = 5.5;
          g.ty = 9.8;
        }
      } else if (g.need === 'leaving' && !g.moving) {
        state.guests.splice(i, 1);
      }
    }

    // Staff AI automation
    for (const st of state.staff) {
      if (st.busyTimer > 0) {
        st.busyTimer -= simDt;
        if (st.busyTimer <= 0) st.state = 'idle';
        continue;
      }

      let targetGuest = null;
      let targetRoom = null;

      if (st.role === 'concierge') {
        targetGuest = state.guests.find((g) => g.need === 'checkin' && !g.moving);
      } else if (st.role === 'dining') {
        if (state.mealStock >= 1) {
          targetGuest = state.guests.find((g) => g.need === 'meal' && !g.moving);
        }
      } else if (st.role === 'housekeeping') {
        targetRoom = state.rooms.find((r) => r.unlocked && r.status === 'dirty');
      }

      if (targetGuest) {
        st.tx = targetGuest.x;
        st.ty = targetGuest.y - 0.65;
        const d = Math.hypot(st.tx - st.x, st.ty - st.y);
        if (d > 0.25) {
          const mv = Math.min(d, 2.7 * simDt);
          st.x += ((st.tx - st.x) / d) * mv;
          st.y += ((st.ty - st.y) / d) * mv;
          st.state = 'walking';
        } else {
          if (fulfillGuest(targetGuest, true)) {
            st.state = 'serving';
            st.busyTimer = Math.max(0.8, 1.8 - state.upgrades.lobby * 0.2);
          }
        }
      } else if (targetRoom) {
        st.tx = targetRoom.gx;
        st.ty = targetRoom.gy + 0.6;
        const d = Math.hypot(st.tx - st.x, st.ty - st.y);
        if (d > 0.25) {
          const mv = Math.min(d, 2.8 * simDt);
          st.x += ((st.tx - st.x) / d) * mv;
          st.y += ((st.ty - st.y) / d) * mv;
          st.state = 'walking';
        } else {
          cleanRoom(targetRoom, true);
          st.state = 'serving';
          st.busyTimer = 1.2;
        }
      } else {
        st.state = 'idle';
      }
    }
  }

  // --- 2.5D Isometric Canvas Renderer ---
  const canvas = document.getElementById('hotel-canvas');
  const ctx = canvas.getContext('2d');
  let cw = 800;
  let ch = 500;
  let tileW = 54;
  let tileH = 27;
  let originX = 400;
  let originY = 120;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = rect.width;
    ch = rect.height;
    canvas.width = Math.floor(cw * dpr);
    canvas.height = Math.floor(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = Math.min(cw / 780, ch / 470);
    tileW = Math.max(32, Math.min(62, 54 * scale));
    tileH = tileW * 0.5;
    originX = cw * 0.5;
    originY = Math.max(62, ch * 0.22);
  }

  function toIso(gx, gy) {
    return {
      x: originX + (gx - gy) * (tileW * 0.5),
      y: originY + (gx + gy) * (tileH * 0.5),
    };
  }

  function drawIsoQuad(gx, gy, w, h, fill, stroke = null) {
    const p1 = toIso(gx, gy);
    const p2 = toIso(gx + w, gy);
    const p3 = toIso(gx + w, gy + h);
    const p4 = toIso(gx, gy + h);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawIsoBox(gx, gy, w, h, zH, topColor, leftColor, rightColor) {
    const p1 = toIso(gx, gy);
    const p2 = toIso(gx + w, gy);
    const p3 = toIso(gx + w, gy + h);
    const p4 = toIso(gx, gy + h);

    // Left face
    ctx.beginPath();
    ctx.moveTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p3.x, p3.y - zH);
    ctx.lineTo(p4.x, p4.y - zH);
    ctx.closePath();
    ctx.fillStyle = leftColor;
    ctx.fill();

    // Right face
    ctx.beginPath();
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p2.x, p2.y - zH);
    ctx.lineTo(p3.x, p3.y - zH);
    ctx.closePath();
    ctx.fillStyle = rightColor;
    ctx.fill();

    // Top face
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y - zH);
    ctx.lineTo(p2.x, p2.y - zH);
    ctx.lineTo(p3.x, p3.y - zH);
    ctx.lineTo(p4.x, p4.y - zH);
    ctx.closePath();
    ctx.fillStyle = topColor;
    ctx.fill();
  }

  function drawActor(actor, isStaff) {
    const pos = toIso(actor.x, actor.y);
    const moving = isStaff ? actor.state === 'walking' : Boolean(actor.moving);
    const bob = moving ? Math.abs(Math.sin(elapsedTime * 10)) * 3.5 : 0;
    const stride = moving ? Math.sin(elapsedTime * 10) * 3 : 0;

    // Ground shadow
    ctx.fillStyle = 'rgba(4, 10, 20, 0.36)';
    ctx.beginPath();
    ctx.ellipse(pos.x, pos.y + 2, 11, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pos.x - 3, pos.y - 6 - bob);
    ctx.lineTo(pos.x - 3 - stride * 0.4, pos.y + 1);
    ctx.moveTo(pos.x + 3, pos.y - 6 - bob);
    ctx.lineTo(pos.x + 3 + stride * 0.4, pos.y + 1);
    ctx.stroke();

    // Torso
    const outfit = isStaff
      ? actor.role === 'dining'
        ? '#1f6f78'
        : actor.role === 'housekeeping'
          ? '#0f766e'
          : '#1e3a5f'
      : actor.color;
    ctx.fillStyle = outfit;
    ctx.beginPath();
    ctx.roundRect(pos.x - 7, pos.y - 22 - bob, 14, 16, 5);
    ctx.fill();

    // Role accent sash / tie
    ctx.fillStyle = isStaff ? '#f6d58e' : actor.accent;
    ctx.fillRect(pos.x - 2, pos.y - 20 - bob, 4, 10);

    // Head
    ctx.fillStyle = '#fde2c8';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y - 28 - bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Distinct headwear / accessory
    if (isStaff && actor.role === 'concierge') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pos.x - 6, pos.y - 35 - bob, 12, 3.5);
      ctx.fillStyle = '#e2b86b';
      ctx.fillRect(pos.x - 4, pos.y - 32.5 - bob, 8, 1.5);
    } else if (!isStaff && actor.archetype === 'vip') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y - 36 - bob, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (!isStaff && actor.archetype === 'leisure') {
      ctx.fillStyle = '#f5d08a';
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y - 33 - bob, 9, 2.8, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overhead status bubble for guests waiting
    if (!isStaff && (actor.need === 'checkin' || actor.need === 'meal')) {
      const ratio = Math.max(0, actor.patience / actor.maxPatience);
      const urgent = ratio < 0.35;
      const pulse = urgent ? 1 + Math.sin(elapsedTime * 8) * 0.1 : 1;
      const bx = pos.x;
      const by = pos.y - 52 - bob;

      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(pulse, pulse);

      ctx.fillStyle = urgent ? 'rgba(239, 68, 68, 0.94)' : 'rgba(15, 29, 46, 0.94)';
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fill();

      // Patience ring
      ctx.strokeStyle = urgent ? '#fecaca' : ratio < 0.6 ? '#fbbf24' : '#34d399';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.arc(0, 0, 13, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
      ctx.stroke();

      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(actor.need === 'checkin' ? '🔑' : '🍽', 0, 1);
      ctx.restore();
    }
  }

  function renderScene() {
    ctx.clearRect(0, 0, cw, ch);

    // Day-to-evening lighting atmosphere
    const progress = (state.hour - DAY_START_HOUR) / (DAY_END_HOUR - DAY_START_HOUR);
    const skyTop = progress > 0.72 ? '#141e33' : progress > 0.45 ? '#1b3554' : '#1f3f63';
    const skyBot = progress > 0.72 ? '#0b1220' : '#0f2035';
    const grad = ctx.createLinearGradient(0, 0, 0, ch);
    grad.addColorStop(0, skyTop);
    grad.addColorStop(1, skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // Coastal sea deck backdrop
    drawIsoQuad(-1, -1, 13.5, 11.5, '#12314a', 'rgba(56,189,248,0.12)');
    // Main hotel marble floor
    drawIsoQuad(0, 0, 11.8, 9.5, '#e8dfd1', 'rgba(180,155,120,0.35)');
    // Lobby carpet
    drawIsoQuad(0.8, 4.2, 4.4, 3.6, '#233b56', 'rgba(226,184,107,0.5)');
    // Dining bistro wood floor
    drawIsoQuad(6.2, 4.2, 4.8, 3.6, '#caa57c', 'rgba(120,85,50,0.35)');

    // 4 Guest Suites along top wing
    for (const room of state.rooms) {
      const rx = room.gx - 1.1;
      const ry = room.gy - 0.9;
      if (!room.unlocked) {
        drawIsoQuad(rx, ry, 2.3, 2.1, 'rgba(30, 41, 59, 0.55)', 'rgba(148,163,184,0.35)');
        const c = toIso(room.gx, room.gy);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`🔒 ${room.id} 待扩建`, c.x, c.y);
        continue;
      }

      const floorCol =
        room.status === 'dirty'
          ? '#d6c1a5'
          : room.status === 'occupied'
            ? '#f3e5c7'
            : '#f5efe6';
      drawIsoQuad(rx, ry, 2.3, 2.1, floorCol, 'rgba(130,100,65,0.45)');
      // Bed
      drawIsoBox(rx + 0.35, ry + 0.35, 1.0, 1.25, 10, '#ffffff', '#cbd5e1', '#94a3b8');
      drawIsoBox(rx + 0.35, ry + 0.35, 1.0, 0.35, 13, '#e2b86b', '#b8893c', '#9a6d2a');

      const labelPos = toIso(room.gx, room.gy + 1.1);
      ctx.font = '700 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1e293b';
      ctx.fillText(room.id, labelPos.x, labelPos.y);

      if (room.status === 'dirty') {
        const bp = toIso(room.gx, room.gy - 0.1);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.95)';
        ctx.beginPath();
        ctx.arc(bp.x, bp.y - 22, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0b1624';
        ctx.font = '12px sans-serif';
        ctx.fillText('🧹', bp.x, bp.y - 18);
      }
    }

    // Front Desk Counter
    drawIsoBox(1.6, 4.7, 2.4, 0.8, 16, '#f6d58e', '#1e3a5f', '#132742');
    const deskLabel = toIso(2.8, 5.1);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`大堂前台 Lv.${state.upgrades.lobby}`, deskLabel.x, deskLabel.y - 22);

    // Dining Bistro Counter
    drawIsoBox(7.0, 4.7, 2.8, 0.8, 16, '#f3d5a5', '#7c4a27', '#5c3418');
    const barLabel = toIso(8.4, 5.1);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`海景餐吧 Lv.${state.upgrades.kitchen} (余${state.mealStock})`, barLabel.x, barLabel.y - 22);

    // Depth-sorted characters (staff + guests)
    const renderables = [
      ...state.staff.map((st) => ({ actor: st, isStaff: true, depth: st.x + st.y })),
      ...state.guests.map((g) => ({ actor: g, isStaff: false, depth: g.x + g.y })),
    ].sort((a, b) => a.depth - b.depth);

    for (const item of renderables) {
      drawActor(item.actor, item.isStaff);
    }

    // Floating feedback texts
    for (let i = floatTexts.length - 1; i >= 0; i--) {
      const f = floatTexts[i];
      f.life -= 0.016;
      if (f.life <= 0) {
        floatTexts.splice(i, 1);
        continue;
      }
      const p = toIso(f.gx, f.gy);
      const lift = (1 - f.life / f.maxLife) * 34;
      ctx.save();
      ctx.globalAlpha = Math.max(0, f.life / f.maxLife);
      ctx.font = '700 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, p.x, p.y - 44 - lift);
      ctx.restore();
    }
  }

  // --- Direct Canvas Interaction (Click/Tap Guest or Dirty Room) ---
  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // 1. Check waiting guests first
    for (const g of state.guests) {
      if (g.need !== 'checkin' && g.need !== 'meal') continue;
      const p = toIso(g.x, g.y);
      if (Math.hypot(px - p.x, py - (p.y - 34)) < 34) {
        fulfillGuest(g, false);
        return;
      }
    }

    // 2. Check dirty rooms
    for (const r of state.rooms) {
      if (!r.unlocked || r.status !== 'dirty') continue;
      const p = toIso(r.gx, r.gy);
      if (Math.hypot(px - p.x, py - p.y) < 38) {
        cleanRoom(r, false);
        return;
      }
    }
  });

  // --- HUD & Drawer Rendering ---
  function formatTime(hourFloat) {
    const h = Math.floor(hourFloat);
    const m = Math.floor((hourFloat - h) * 60);
    const phase = h < 11 ? '晨间筹备' : h < 17 ? '日间高峰' : '晚间接待';
    return `第 ${state.day} 天 · ${phase} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  function updateUI() {
    document.getElementById('hud-day-phase').textContent = state.isDaySettled
      ? `第 ${state.day} 天 · 已日结锁定`
      : formatTime(state.hour);
    document.getElementById('hud-cash').textContent = Math.round(state.cash).toLocaleString();
    document.getElementById('hud-stock').textContent = String(state.mealStock);

    const unlocked = state.rooms.filter((r) => r.unlocked);
    const ready = unlocked.filter((r) => r.status === 'ready');
    document.getElementById('hud-rooms').textContent = `${ready.length}/${unlocked.length}`;
    document.getElementById('hud-sat').textContent = `${Math.round(state.satisfaction)}%`;

    document.getElementById('dock-stock-badge').textContent = `余 ${state.mealStock}`;
    document.getElementById('dock-fac-badge').textContent = `Lv.${state.upgrades.lobby}`;
    document.getElementById('dock-staff-badge').textContent = `${state.staff.length} 人`;
    const net = getNetCashDelta();
    document.getElementById('dock-net-badge').textContent = `${net >= 0 ? '+' : '-'}¥${Math.abs(net)}`;

    // Onboarding strip & dock highlight
    const ob = deriveOnboarding();
    const banner = document.getElementById('onboarding-banner');
    document.querySelectorAll('.dock-btn').forEach((b) => b.classList.remove('pulse-guide'));

    if (ob.isCompleted) {
      banner.classList.add('hidden');
    } else {
      banner.classList.remove('hidden');
      document.getElementById('ob-badge').textContent = `新手引导 ${ob.completedCount}/4`;
      document.getElementById('ob-title').textContent = ob.current.title;
      document.getElementById('ob-hint').textContent = ob.current.hint;
      if (ob.current.targetPanel === 'restock') {
        document.getElementById('dock-restock').classList.add('pulse-guide');
      } else if (ob.current.targetPanel === 'facilities') {
        document.getElementById('dock-facilities').classList.add('pulse-guide');
      } else if (ob.current.targetPanel === 'settle') {
        document.getElementById('dock-settle').classList.add('pulse-guide');
      }
    }

    document.getElementById('btn-speed').textContent = `${state.speed}x`;
    document.getElementById('btn-pause').textContent = state.paused ? '▶' : '⏸';
    document.getElementById('btn-sound').textContent = sfx.enabled ? '🔊' : '🔇';
  }

  function openDrawer(panel) {
    if (activeDrawer === panel) {
      closeDrawer();
      return;
    }
    activeDrawer = panel;
    document.querySelectorAll('.dock-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.panel === panel);
    });
    const drawer = document.getElementById('drawer');
    drawer.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    renderDrawer();
  }

  function closeDrawer() {
    activeDrawer = null;
    document.querySelectorAll('.dock-btn').forEach((btn) => btn.classList.remove('active'));
    const drawer = document.getElementById('drawer');
    drawer.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function renderActionCard({ title, desc, buttonText, guard, onClick }) {
    const row = document.createElement('div');
    row.className = 'card-row';

    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `<div class="card-title">${title}</div><div class="card-desc">${desc}</div>${
      guard.disabled ? `<div class="card-guard">⚠ ${guard.reason}</div>` : ''
    }`;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'action-btn';
    btn.textContent = buttonText;
    btn.disabled = guard.disabled;
    if (!guard.disabled) btn.addEventListener('click', onClick);

    row.appendChild(info);
    row.appendChild(btn);
    return row;
  }

  function renderDrawer() {
    if (!activeDrawer) return;
    const titleEl = document.getElementById('drawer-title');
    const subEl = document.getElementById('drawer-sub');
    const body = document.getElementById('drawer-body');
    body.innerHTML = '';

    if (activeDrawer === 'restock') {
      titleEl.textContent = '备货补餐 · 餐吧库存管理';
      subEl.textContent = `当前库存 ${state.mealStock} 份；每笔餐饮订单必须有真实库存方可履约`;

      body.appendChild(
        renderActionCard({
          title: '轻量补货（+5 份精品餐食）',
          desc: '单份成本 ¥28，适合 Day 1 起步与补缺',
          buttonText: '¥140 补货',
          guard: evaluateActionGuard({ actionLabel: '轻量补货', requiredCash: 140 }),
          onClick: () => buyStock(5, 140),
        })
      );
      body.appendChild(
        renderActionCard({
          title: '批量采购（+12 份海湾套餐）',
          desc: '单份成本降至 ¥25，避免午间与晚间高峰断供',
          buttonText: '¥300 采购',
          guard: evaluateActionGuard({ actionLabel: '批量采购', requiredCash: 300 }),
          onClick: () => buyStock(12, 300),
        })
      );
    } else if (activeDrawer === 'facilities') {
      titleEl.textContent = '设施升级与客房扩建';
      subEl.textContent = '升级直接提升客流耐心、单价收益与接待上限';

      const facDefs = [
        { key: 'lobby', name: '大堂礼宾区', desc: '提升客流频率、住客耐心与员工接待速度' },
        { key: 'kitchen', name: '海景餐吧厨房', desc: '每级提升 20% 餐饮客单价' },
        { key: 'rooms', name: '客房软装品质', desc: '每级提升 22% 房费收益' },
      ];
      for (const f of facDefs) {
        const lv = state.upgrades[f.key];
        const cost = Math.round(320 * Math.pow(1.65, lv - 1));
        body.appendChild(
          renderActionCard({
            title: `${f.name}（当前 Lv.${lv}）`,
            desc: f.desc,
            buttonText: `¥${cost} 升级`,
            guard: evaluateActionGuard({ actionLabel: `升级${f.name}`, requiredCash: cost }),
            onClick: () => upgradeFacility(f.key),
          })
        );
      }

      for (const r of state.rooms) {
        if (r.unlocked) continue;
        body.appendChild(
          renderActionCard({
            title: `扩建 ${r.name}`,
            desc: '解锁全新海景客房，扩大同时接待与日营收上限',
            buttonText: `¥${r.unlockCost} 扩建`,
            guard: evaluateActionGuard({ actionLabel: `扩建${r.name}`, requiredCash: r.unlockCost }),
            onClick: () => unlockRoom(r.id),
          })
        );
      }
    } else if (activeDrawer === 'staff') {
      titleEl.textContent = '员工排班 · 自动履约团队';
      subEl.textContent = `当前在岗 ${state.staff.length} 人，每日日结结算薪资`;

      const candidates = [
        { role: 'dining', name: '苏晴', label: '餐饮专员', cost: 280, wage: 90, desc: '自动为餐吧等待住客出餐（有库存时自动履约）' },
        { role: 'housekeeping', name: '周明', label: '客房管家', cost: 260, wage: 85, desc: '自动打扫退房后的待清洁客房，提高翻台率' },
        { role: 'concierge', name: '陈宇', label: '资深礼宾', cost: 320, wage: 100, desc: '协助前台快速办理入住，分担高峰排队压力' },
      ];

      for (const c of candidates) {
        const hired = state.staff.some((s) => s.name === c.name);
        body.appendChild(
          renderActionCard({
            title: `${c.name} · ${c.label}（日薪 ¥${c.wage}）`,
            desc: c.desc,
            buttonText: hired ? '已上岗' : `¥${c.cost} 雇佣`,
            guard: hired
              ? { disabled: true, reason: '该员工已在岗工作。' }
              : evaluateActionGuard({ actionLabel: `雇佣${c.name}`, requiredCash: c.cost }),
            onClick: () => hireStaff(c.role, c.name, c.label, c.cost, c.wage),
          })
        );
      }
    } else if (activeDrawer === 'ledger') {
      titleEl.textContent = `第 ${state.day} 天实时经营账本`;
      subEl.textContent = '所有收支实时核平，日终结算后自动锁定';
      const l = state.ledger;
      const net = getNetCashDelta();
      body.innerHTML = `
        <div class="settle-grid">
          <div class="settle-stat"><span>客房收入</span><strong style="color:#34d399">+¥${l.roomRevenue}</strong></div>
          <div class="settle-stat"><span>餐饮收入</span><strong style="color:#34d399">+¥${l.diningRevenue}</strong></div>
          <div class="settle-stat"><span>备货与建设支出</span><strong style="color:#f87171">-¥${l.restockCost + l.upgradeCost}</strong></div>
          <div class="settle-stat"><span>当前净现金流</span><strong style="color:${net >= 0 ? '#34d399' : '#f87171'}">${net >= 0 ? '+' : '-'}¥${Math.abs(net)}</strong></div>
          <div class="settle-stat"><span>已履约订单</span><strong>${l.servedOrders} 单</strong></div>
          <div class="settle-stat"><span>超时/流失单</span><strong style="color:${l.missedOrders > 0 ? '#f87171' : '#9db2c8'}">${l.missedOrders} 单</strong></div>
        </div>
      `;
    }
  }

  // --- Wire Controls ---
  document.querySelectorAll('.dock-btn[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => openDrawer(btn.dataset.panel));
  });
  document.getElementById('dock-settle').addEventListener('click', settleCurrentDay);
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);
  document.getElementById('btn-next-day').addEventListener('click', startNextDay);

  document.getElementById('ob-go-btn').addEventListener('click', () => {
    const ob = deriveOnboarding();
    if (ob.current.targetPanel === 'settle') {
      settleCurrentDay();
    } else if (ob.current.targetPanel) {
      openDrawer(ob.current.targetPanel);
    } else {
      showToast('直接点击场景中带气泡的住客即可完成接待或出餐！', 'good');
    }
  });
  document.getElementById('ob-skip-btn').addEventListener('click', () => {
    state.onboarding.skipped = true;
    saveState();
    updateUI();
  });

  document.getElementById('btn-speed').addEventListener('click', () => {
    state.speed = state.speed === 1 ? 2 : 1;
    updateUI();
  });
  document.getElementById('btn-pause').addEventListener('click', () => {
    if (state.isDaySettled) return;
    state.paused = !state.paused;
    updateUI();
  });
  document.getElementById('btn-sound').addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    updateUI();
  });
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!window.confirm('确定清空当前存档并重新开局吗？')) return;
    state = createInitialState();
    closeDrawer();
    document.getElementById('settlement-modal').classList.add('hidden');
    saveState();
    updateUI();
    showToast('已重置为第 1 天全新开局！', 'good');
  });

  // --- Main Loop ---
  let lastTs = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - lastTs) / 1000);
    lastTs = now;
    elapsedTime += dt;

    stepSimulation(dt);
    renderScene();
    updateUI();
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  updateUI();
  if (state.isDaySettled) openSettlementModal();
  requestAnimationFrame(frame);
})();
