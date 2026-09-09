# Reel Wardens — v0.11 Architecture Refactor

## Intent
Preserve the current v0.10 Slotbound-replica behavior while replacing the accumulated v05→v10 global override chain with the architecture prescribed by `threejs-game-skills`.

## Hard constraints
- v0.10 remains frozen and runnable.
- No gameplay/content tuning in this refactor.
- Mobile 390×844 remains a first-class target.
- Three.js is render-only: combat rules never depend on renderer state.
- All gameplay randomness routes through one seeded RNG.

## Ownership
- `game/Game.ts`: sole lifecycle owner, update order, test hooks, diagnostics.
- `systems/ReelSystem.ts`: reel state machine, paylines, Nudge, Jackpot, RNG Cores.
- `systems/UnitSystem.ts`: unit creation, Random Stats, Imprints, Lock, Absorption, Evolution.
- `systems/ShopSystem.ts`: Shop, Items, Cores, milestone rewards.
- `systems/CombatSystem.ts`: auto-battle and wave progression; update(dt), no independent interval.
- `ui/UiRenderer.ts`: state → DOM only; event delegation emits intents.
- `render/ThreeBattlefield.ts`: state/events → Three.js only; owns and disposes GPU resources.

## Behavior baseline retained
Warrior/Cavalry/Archer/Mage reels; 3×3/8 paylines; 1 Nudge/wave; escalating Gold spin cost; Random Stats; Imprints; Lock; Absorption + Level; Warrior/Mage evolution; Advanced rolls; 5→6 field slots; Shop; Items; unlimited Core stack; Second Chance; Jester; Golden Relic; Formation; Judgement Wave 6; Beholder Wave 12; 2D/3D toggle.

## Verification
- Local TypeScript structural check using dependency stubs: PASS.
- Pure-system deterministic smoke: `V11_LOGIC_SMOKE_OK`.
- Required next gate: GitHub CI `npm install`, `npm run build`, Playwright mobile+desktop smoke.

## Three.js Game Skills adoption
- Director: scope preserved; refactor only, no content tuning.
- Gameplay systems: single `Game` owner, explicit update order, seeded gameplay RNG, no system-owned intervals.
- UI: state-driven renderer with delegated intents; mobile remains first-class.
- QA/release: deterministic hooks, diagnostics, mobile+desktop Playwright smoke, visual evidence captures, production build artifact.
- Dependency policy: top-level versions pinned exactly. A generated lockfile will be committed after CI verifies the dependency graph; until then CI uses `npm install` rather than pretending `npm ci` is available.
- Visual baseline policy: v0.11 imports the frozen v0.10 repo-local CSS sources; Vite bundles them at build time, so there is no runtime CDN dependency and no visual redesign hidden inside the architecture refactor.
