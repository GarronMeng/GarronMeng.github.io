// @ts-nocheck
import assert from 'node:assert/strict';
import { createSeededRandom } from '../src/core/rng';
import { EventBus } from '../src/core/EventBus';
import { createState } from '../src/game/createState';
import { UnitSystem } from '../src/systems/UnitSystem';
import { ShopSystem } from '../src/systems/ShopSystem';
import { ReelSystem } from '../src/systems/ReelSystem';
import { CombatSystem } from '../src/systems/CombatSystem';

let rng=createSeededRandom(4242);const state=createState(rng);const bus=new EventBus();const getRng=()=>rng;
const units=new UnitSystem(state,getRng,bus),shop=new ShopSystem(state,getRng),reel=new ReelSystem(state,getRng,units,bus),combat=new CombatSystem(state,getRng,units,shop,bus);
shop.roll(true);assert.equal(state.shopOffers.length,3,'shop should have 3 offers');
let rA=createSeededRandom(99),rB=createSeededRandom(99);const sA=createState(rA),sB=createState(rB),uA=new UnitSystem(sA,()=>rA,new EventBus()).create('guard'),uB=new UnitSystem(sB,()=>rB,new EventBus()).create('guard');assert.deepEqual(uA.randomStats,uB.randomStats,'seeded stats should be deterministic');
reel.armNudge();assert.equal(state.nudge,0);assert.equal(reel.begin(0),true);reel.update(2500);assert.ok(state.lines.length>=1,'nudge should guarantee at least one line');assert.ok(state.units.length>=1,'winning line recruits');
const locked=state.units[0]!;units.toggleLock(locked.id);units.select(locked.id);assert.equal(state.selected,null,'locked unit cannot become absorb source');units.toggleLock(locked.id);
const a=units.create('guard'),b=units.create('guard');state.units=[a,b];units.select(a.id);units.select(b.id);assert.ok(state.absorb,'absorb preview should exist');const oldLevel=b.level,oldAtk=b.atk;units.confirmAbsorb();assert.equal(state.units.length,1);assert.ok(b.level>oldLevel&&b.atk>oldAtk,'absorption should transfer growth and level');
assert.equal(state.fieldCap,5);
state.units=[];for(let i=0;i<5;i++){const u=units.create(i===0?'guard':i===1?'mage':'ranger');u.atk*=5;u.hp*=4;state.units.push(u)}state.screen='game';state.phase='prep';state.wave=1;assert.equal(combat.start(),true);for(let i=0;i<4000&&state.phase==='battle';i++)combat.update(.05);assert.notEqual(state.phase,'battle','battle should resolve through update(dt)');assert.equal(state.wave,2,'winning test squad should advance wave');assert.equal(state.nudge,1,'nudge restores after wave');
console.log('V11_LOGIC_SMOKE_OK',JSON.stringify({wave:state.wave,gold:state.gold,heart:state.base,units:state.units.length,shop:state.shopOffers.length}));
