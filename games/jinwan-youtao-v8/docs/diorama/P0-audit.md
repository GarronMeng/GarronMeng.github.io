# P0 · Visual audit / 2026-10-17

## Source and rollback

- Repository: GarronMeng/GarronMeng.github.io; maintained app: `games/jinwan-youtao-v8`.
- Entry: `src/main.ts`; Vite + TypeScript + Three.js 0.185.1.
- Published `/games/jinwan-youtao-v8-preview/` is a compiled copy, not the source.
- Local starting branch: `refactor/jinwan-v8-visual-slice`, commit `a16e65f`.
- Baseline retained as `baseline/pre-diorama-a16e65f`; work branch: `visual-diorama-upgrade`.
- Remote master at audit: `c94f60a86b706c30eac3e4538df38254fb2326d9`. Comparison from published game commit `abb7ead` contains only rent-monitor/workflow edits; no intervening game changes.

## Rendering and state map

| Concern | Current code | P1 boundary |
| --- | --- | --- |
| Scene / renderer / camera / light / loop | `src/render/HotelWorld.ts` | Opt-in single-room replacement; keep hotel overview camera |
| Room / furniture | `src/render/room.ts`, `primitives.ts` | One standard king room, 201; other rooms unchanged |
| Public areas | `facilities.ts` | No changes |
| Material maps / PBR | `materials.ts` | Independent shared sample palette; no global recoloring |
| Guest geometry / animation | `actors.ts` | Keep actual guest and staff meshes and movements |
| Navigation data / animation trail | `core/guestMovement.ts`, `guestAI.ts` → `HotelWorld.syncGuests()` | Retain room anchors, elevator and movement trail |
| Raycast | `interaction.ts` entity collider → store.select(entityId) | Keep stable entity ID and collider |
| UI bridge | `state/store.ts` subscriptions, `ui/gameplay.ts` | No menu or business-rule redesign |
| Space anchors | `render/layout.ts`, `content/place.ts` | Keep room size, floor height and corridor access |
| Visual refresh | `HotelWorld.key()` observes status, level, category, bed, construction, SUA, extra bed, stock | Sample reads actual Room; runtime state overlays maintained |

The baseline uses a near-frontal orthographic cutaway, not an approximately 45° isometric camera. Switching the entire tall building now would occlude rooms and alter navigation. P1 will therefore add an optional local orthographic inspection view, leaving overview and HUD intact.

Geometry/material reuse and InstancedMesh batching already exist. Current rebuilds reconstruct the static hotel on visual-state changes. Sample assets must share cached geometry/maps, remain batchable, and dispose their cache on world teardown. Static batching currently uses world matrices: the sample must participate before batching or remain an explicitly excluded dynamic node.

## Baseline evidence and limitations

The published game was opened in the screenshot browser before editing. It displayed `浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。` The same failure occurs before any P1 code. This environment has no working Blender installation (`blender` / `bpy` absent). Do not describe generated concept art, offline images, or a blank canvas as game screenshots.

Browser GPU draw calls, resident GPU resources, startup time and FPS are **not measured**, not zero. Mobile / Xiaohongshu WebView 30 FPS remains a device acceptance gate. P1 provides runtime measurements and paired original/sample routes for reproducible capture on a WebGL-capable device.

## Implementation plan (P0 + P1 only)

1. Author one reusable standard-king diorama: molded/beveled furniture, layered bed textiles, oak boards, sage/plaster walls, window and draped curtains, task lighting, artwork, pottery, greenery and luggage.
2. Use deterministic small material maps, shared rounded geometry, inexpensive radial contact shadows, and no bloom/SSAO or refractive glass. Keep Blender-authored GLB as the preferred subsequent art pipeline; P1 uses editable parametric meshes because Blender is unavailable here.
3. Opt-in sample room 201 only; keep original factory as rollback and comparison. Add a local near-isometric inspection mode with camera easing, wall cutaway and two-finger zoom/pan without hijacking normal hotel scroll/taps.
4. Add diagnostics and low-quality mode, preserve real room-state feedback and all business/UI code.
5. Build and focused state/raycast/resource regression. Deliver an independent preview; do not overwrite the existing preview. Stop before P2–P4 and await visual acceptance.
