# Architecture delta

Before: browser globals + repeated monkey-patching (`spin=function...`, `render=function...`) across v06/v07/v08/v09/v10, multiple timers owning simulation, `Math.random()` spread through systems, Three.js reading global DOM/state.

After: one `Game` owner; one RAF loop; system classes with explicit state ownership; seeded RNG injection; event bus for VFX; UI state rendering without rules; Three.js renderer isolated from gameplay; deterministic hooks and renderer diagnostics.

Update order per frame:
1. Reel state machine
2. Combat state machine
3. Throttled DOM reconciliation
4. Three.js visual sync/VFX
5. Diagnostics

No system starts its own long-lived interval. During reel motion and auto-battle, the UI patches only live regions instead of replacing the `.stage` node, so the WebGL canvas keeps a stable owner.
