# P1 · Single-room diorama candidate

**Current revision:** the generic sage/oak prototype has been replaced by a photo-led Hyatt Place Shenzhen Dongmen King room. See `HYATT-PLACE-REFERENCES.md` for the actual viewed images, source provenance, feature mapping and dimensional adaptations.

## Scope and acceptance status

This is a complete-game experimental build, **not an accepted visual upgrade**. Only ordinary king room 201, level 1, receives the new asset. Public areas, other room types/levels, staff/guest models, menu styles and business rules are unchanged. Room 201 intentionally falls back to the original room renderer when renovated, reconfigured, or under construction: expanding the art system is P2, which is not authorized yet.

The source work is on `visual-diorama-upgrade`; the original published preview is not replaced. An independent static preview uses a separate save key (`jinwanyoutao_v8_game_1_diorama_p1`). Existing saves are neither migrated nor overwritten by the experiment.

## How to compare

Open the independent preview folder with these query strings:

- Original room, local view: `?visual=original&view=room&diagnostics=1`
- Diorama room, **same local camera**: `?visual=diorama&view=room&diagnostics=1`
- Complete hotel with sample 201: `?visual=diorama&diagnostics=1`
- Mobile fallback: add `&quality=low` (DPR 1, no real-time shadows; contact shadows remain).

Close the initial morning sheet to see the model. In normal overview, selecting 201 eases into its inspection camera. A floor-rail button returns to the hotel. In inspection, drag to pan and pinch to zoom; gestures do not dispatch room selections. Existing room management, front desk and all business menus remain available. Before and after screenshots must use the same experimental save, viewport, time of day, camera query and zoom. Because this is a full simulation, pause it before comparing.

Local: `npm install` (if dependencies are missing), `npm run dev`, open the local Vite address with `?visual=diorama&view=room&diagnostics=1`. The production copy uses relative asset URLs and does not need a backend.

## Asset and render design

- `render/diorama/config.ts`: feature boundary / sample-room identity / preview options.
- `assets.ts`: shared rounded geometry, lathed pottery, turned lamps, sculpted chair and plants, local-coordinate InstancedMesh batches. Architecture cutaway groups remain independently hideable.
- `materials.ts`: shared dark walnut / warm plaster / white linen / greige carpet / chrome / glass palette; deterministic 128×128 sRGB maps, no external imagery or expensive transmission.
- `room.ts`: photo-led bed facing the media/work counter, black-framed window, neutral chaise, white ergonomic chair, stacked bedding, hospitality tray and real-state feedback.
- `reference.ts`: traceable hotel, room type and actual photo source URLs; no runtime image requests.
- `gestures.ts`: inspection-only pointer tracking; native overview scroll remains intact.
- `diagnostics.ts`: actual renderer metrics, frame timing and first rendered frame timing exposed in an optional small overlay and `.world-stage[data-render-metrics]`.
- `HotelWorld.ts`: actual entity/room factory integration, layered local section camera, actual guest transforms, light presets and disposal.
- `interaction.ts`: additional local-view volume collider; existing overview collider remains intact.
- `main.ts`, `core/save.ts`: optional save-slot parameter only; no change to economic commands, prices or simulation timing.
- `tests/diorama.test.ts`: opt-in scope, state immutability, bounds, raycasting, batching, cache reuse/disposal and save isolation.

Blender and `bpy` are unavailable in this environment. These assets are editable Three.js parametric models, **not Blender-authored GLBs**. No nonexistent GLB/lightmap/bake is claimed. A subsequent Blender pipeline can replace asset factories while preserving room dimensions, Y-up coordinates, stable entity IDs, collider ownership and state hooks. No texture or model downloads are needed by this build.

## Performance: measured vs unmeasured

Node geometry inspection of the current available-room candidate: approximately 30k rendered mesh triangles, 66 cached unique geometries, approximately 1.6 MB of geometry attributes, 5 small maps (~0.42 MB including estimated mipmaps), and approximately 70 room-level mesh submissions before camera culling and shadow passes. These are **structural model counts**, not measured GPU draw calls or resident VRAM. Original and sample full-game comparison must use the live renderer overlay.

The sample intentionally increases detail in one room only. Its present mesh submissions are not suitable for blindly cloning across every hotel room. P2 must evaluate material-level merging / GLB instancing / LOD before rollout. Standard preview DPR is capped at 1.5 and shadow map at 1024²; low mode turns off live shadows. The unchanged normal game path retains its previous DPR/shadow settings.

FPS, first-frame time, actual draw calls, WebView compatibility and 30 FPS on a midrange phone: **pending physical-device validation**. GPU memory reports are approximate resource sizes only; WebGL does not expose reliable resident VRAM.

## Evidence / known issues / stop point

- Photo-led revision: **8 / 8 targeted checks passed** (`diorama` + `game`); TypeScript and production build passed. This supplements the earlier P1 regression below. Only the single-room art, palette, reference provenance and corresponding tests changed.

- Targeted regression: **19 / 19 passed** (`diorama`, `game`, `navigation-shell`, `guest-ai`, `onboarding`); TypeScript / production build passed. The old guest-AI fixture was explicitly changed to `guided:false` so its Spa test exercises the pre-existing veteran business flow rather than being blocked by onboarding. No guest-AI or economic behavior was modified.
- Vite reports the complete-game JavaScript chunk is ~719 KB raw / ~208 KB gzip, exceeding its advisory 700 KB raw warning threshold. The bundle is not hand-edited. Splitting / broader asset rollout is deferred until visual acceptance.

- The baseline public game fails WebGL initialization in the available cloud screenshot browser. That failure screen was captured before modifying source. Thus no reliable before/after rendered-game screenshots could be captured here. The paired routes above are provided for capture on a WebGL-capable device; no fabricated comparison images are included.
- No game-world screenshot or physical-device performance acceptance is claimed. Model placement, lighting, camera easing and pinch behavior need visual review.
- Room status, extra bed, SUA marker, cleaning equipment, maintenance lamp and occupied-room luggage read real Room data. People are not staged or spawned for the shot; actual guests/staff remain in the original simulation. The inspection layer includes only actors physically inside the visible room section; overview retains every actor.
- Existing room behavior is walking / movement and status feedback. No new sleeping, eating, seated interaction or skeleton animation has been implemented or implied.
- The sample has geometric soft contact decals and a shadowed key light, **not baked GI, baked lightmaps or ray-traced AO**. No bloom/SSAO dependency.
- The local inspector is the isometric test surface. The overall tall-hotel camera, city, lobby and public-area lighting are intentionally not restyled in P1.
- Stop after P1 candidate delivery. Do not advance to P2–P4 or replace the active preview before visual approval.
