# Scene candidate: Hyatt Place Shenzhen Dongmen-inspired standard king room

Generate a complete, editable scene as raw Three.js scene code (scene_threejs).
This is one ISOLATED asset candidate for a hotel simulation game. It must not modify the game, its saves, UI, economy, or published previews.

## Provenance and purpose
Use the user's photographed real-room reference (if supplied via the harness image option) as the primary appearance and furniture-relationship anchor.
The researched reference is the Hyatt Place Shenzhen Dongmen King (No Sofa Bed) guest room. This is an artistic adaptation, not a measured architectural replica.
Do not download copyrighted guest-room photographs as runtime textures. Use original procedural geometry and authored material values.

## Non-negotiable coordinate and spatial contract
- World coordinates are right-handed, Y up, metres.
- Room envelope: X width 4.70 m; Z depth 3.10 m; Y architectural height 2.38 m.
- Hotel corridor is outside the front cutaway face (+Z). Keep an unobstructed plausible entrance/walkway.
- Bed against the right-side headwall (+X), facing the TV/media work counter on the left (-X).
- A single king bed, four pillows, white layered duvet, dark continuous walnut headboard.
- Black-framed picture window, neutral upholstery chaise/bench next to the window, beige-grey wall-to-wall carpet.
- Work/media counter with TV, hospitality tray, kettle and a white wheeled office chair.
- Warm off-white plaster walls, muted dark timber, no glossy oversized decorative props.
- Rear and side cutaway walls must be separate named scene nodes so that the gameplay inspector can hide them.
- Do not add a sofa bed to this regular King room.
- Preserve proportion: realistic human-scale furniture with enough negative space to perceive movement and access.

## Visual target
Isometric miniature hotel diorama, warm muted light, softly rounded bevels, plausible PBR roughness, layered fabrics, soft contact shadows, gentle daylight from the window, museum-quality precise joinery.
Avoid floating/penetrating furniture, cartoonishly thick walls, stretched beds, excessive detail or bloom-heavy game effects.
Produce useful 3/4 orthographic/isometric, front, side and plan-view renders for geometry criticism.

## Art-to-code requirements
- Every mesh, material, light and camera is authored as editable code.
- Use explicit named nodes for: king sleep zone, media desk, ergonomic chair, window chaise, rear wall, side wall.
- Keep meshes and draw calls modest; instancing or static merges are welcome.
- Geometry and materials should be suitable for conversion into reusable game assets.
- Output is a standalone reference candidate. The existing game's room-state overlays, dynamic guest actors, stable entity IDs, raycasts, batching and culling are implemented in the maintained repository and MUST NOT be simulated here.
- Prefer deterministic output; no network image requests, no asset CDNs, no external copyrighted texture packs.

## Critique and acceptance
Automatic measurements must flag out-of-envelope shapes, NaN geometry, disconnected floating furniture, obvious intersection, poor silhouette and wrong placement.
The VLM visual judge should compare against the provided reference image if attached, paying special attention to:
1. actual furniture positions and room proportion;
2. bed/headboard/media counter alignment;
3. window seat, work chair and window framing;
4. fabric/walnut material and warm neutral lighting;
5. readable miniature scene at an iPhone landscape viewport.
Iterate to repair failures; do not claim generated results have been incorporated into the game.

The game's separate quality gate is `npm run diorama:audit`, which checks all 40 existing combinations and structural invariants. iPhone FPS and visual likeness still require device testing and human acceptance.
