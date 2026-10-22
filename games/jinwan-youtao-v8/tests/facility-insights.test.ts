import test from 'node:test';
import assert from 'node:assert/strict';
import { newGame, updateUsage } from '../src/core/game';
import { facilityInsights } from '../src/core/facilityInsights';
import type { Facility, PreviewState } from '../src/state/types';

function facility(s: PreviewState, id: string): Facility {
  const entity = s.entities[id];
  if (!entity || entity.kind !== 'facility') throw new Error(`Missing facility: ${id}`);
  return entity;
}

test('facility investment insight prioritizes maintenance over expansion', () => {
  const s = newGame({ guided: false });
  const f = facility(s, 'facility-breakfast');
  f.capacity = 10;
  f.usage = 9;
  f.maintenance = 30;

  const insight = facilityInsights(s, f);
  assert.equal(insight.utilization, 90);
  assert.equal(insight.priority, 'maintenance');
  assert.match(insight.recommendation, /维护/);
  assert.match(insight.explanation, /维护度仅 30%/);
});

test('high usage and a real queue make a well-matched facility eligible for expansion', () => {
  const s = newGame({ guided: false });
  const f = facility(s, 'facility-breakfast');
  f.capacity = 10;
  f.usage = 9;
  f.maintenance = 96;
  const guest = s.guests.find(g => !g.staff && !g.departing);
  if (!guest) throw new Error('Expected a live guest');
  guest.waitingFor = f.id;

  const insight = facilityInsights(s, f);
  assert.equal(insight.utilization, 90);
  assert.equal(insight.waiting, 1);
  assert.equal(insight.fitLabel, '强匹配');
  assert.equal(insight.priority, 'expand');
  assert.match(insight.explanation, /容量 \+4/);
  assert.match(insight.explanation, /施工约 120 游戏分钟/);
});

test('low usage and weak positioning fit recommend validating demand before investing', () => {
  const s = newGame({ guided: false });
  const f = facility(s, 'facility-spa');
  f.capacity = 10;
  f.usage = 1;
  f.maintenance = 96;
  s.game!.positioning = 'business';

  const insight = facilityInsights(s, f);
  assert.equal(insight.utilization, 10);
  assert.equal(insight.fitLabel, '弱匹配');
  assert.equal(insight.priority, 'positioning');
  assert.match(insight.recommendation, /暂缓扩容/);
});

test('facility usage counts guests actually at that facility, not everyone on its floor', () => {
  const s = newGame({ guided: false });
  const f = facility(s, 'facility-gym');
  const guest = s.guests.find(g => !g.staff && !g.departing && !!g.roomId);
  if (!guest?.roomId) throw new Error('Expected an in-house guest');
  const roomId = guest.roomId;
  guest.floorId = f.floorId;
  guest.waitingFor = undefined;
  guest.movement = {
    position: { x: 0, z: 0, level: 1, phase: 'public' },
    steps: [],
    destination: f.id,
    arrived: true,
    nextDecision: 0,
    trail: [],
    revision: 0,
  };

  updateUsage(s);
  assert.equal(f.usage, 1);

  guest.movement.destination = roomId;
  updateUsage(s);
  assert.equal(f.usage, 0);
});
