# 3DCodeVerse ×《今晚有套吗？》客房美术验证

**Status: opt-in development workflow only.** This adapter does not alter a production scene or install 3DCodeVerse as a game dependency. It is based on the experimental `visual-diorama-upgrade` branch and its maintained TypeScript source. Do not edit the published JS bundle.

## Why two separate gates

1. **Current game geometry:** `npm run diorama:audit` constructs the game's 40 live Room combinations (4 categories × 2 bed types × 5 finish levels) from `src/render/diorama/room.ts`. It prints a machine-readable JSON report, fails with a nonzero exit status for broken bounds/ID/materialized geometry, and warns on heavy triangle counts. It reads a new in-memory game state and never touches localStorage.
2. **New art candidate:** `npm run diorama:generate` passes the independent `room-spec.md` to the *external* 3DCodeVerse CLI as `--track scene --language scene_threejs`. 3DCodeVerse runs its own generate/execute/measure/render/VLM judge/refine loop. It does not automatically grade or modify the existing game's code.

A high harness score is not proof that the new scene is faster or better inside this game. Import only after visual approval, geometry QA and physical iPhone performance validation.

## Prerequisites

- This game: Node.js compatible with Vite 6 and the checked-in lockfile; `npm ci` in `games/jinwan-youtao-v8`.
- Upstream `https://github.com/gaoypeng/3dcodeverse`: separate Python 3.13 + Node 20.6+ Linux x86_64 environment, including the 3DCodeVerse harness and an authenticated supported model/agent. See its `harness/docs/INSTALL.md` and `harness/README.md`.
- Do **not** add the harness, its Chromium, Python, backend credentials or benchmark data to the mobile app bundle.

Install upstream in a separate directory (not inside this game's repository):

```bash
git clone https://github.com/gaoypeng/3dcodeverse.git
cd 3dcodeverse
bash harness/setup.sh
3dcode doctor
```

## Commands (from the game's root directory)

```bash
npm ci
npm run diorama:audit
npm run diorama:generate
# When a local, properly sourced real-room image is available:
npm run diorama:generate -- --image /absolute/path/king-room.jpg --rounds 2
```

The adapter inspects `3dcode make --help` and refuses unsupported optional flags rather than silently dropping a reference image. `THREEDCODE_BIN=/path/to/3dcode` selects another installed binary. The prompt is kept under source control; uploaded/reference photos are not bundled into the game.

Use `3dcode gallery serve` from the upstream 3DCodeVerse environment to inspect each run's source, measurements, 2×2 views, judge checklist and best candidate. Check the upstream run metadata for the exact model, prompts, costs, and passes. These outputs are *not* committed to the game's published `assets/`.

## A/B acceptance protocol

Keep the same paused experimental save, room, camera and device:

- Existing renderer: `/games/jinwan-youtao-diorama-preview/?visual=original&view=room&room=room-201&diagnostics=1`
- Current Diorama P2: `/games/jinwan-youtao-diorama-preview/?visual=diorama&view=room&room=room-201&diagnostics=1`
- Low-power comparison: add `&quality=low` to both routes.

Compare the upstream 3DCodeVerse candidate in its gallery separately until its art is explicitly integrated. For each game build capture (1) same-device photos/screenshots; (2) `[data-render-metrics]` JSON; (3) first frame, FPS, frame p95, draw calls, triangles, texture count; (4) any broken room selection, opaque cutaway walls, disappearing guests, or state overlay regressions.

**Acceptance gates:**
- Exact source and real-room photo references documented in `docs/diorama/HYATT-PLACE-REFERENCES.md`.
- `npm test`, `npm run build`, `npm run diorama:audit` pass.
- 40 variants remain correct; room IDs/colliders, geometry cache and save slots do not change.
- Visual approval of candidate by a human using the same camera and reference image.
- At least 30 FPS in the actual target iPhone/WebView at agreed quality settings, with a measured 95th-percentile frame interval; no fabricated performance numbers.

## Safe import after approval

Treat 3DCodeVerse output as *untrusted candidate code*. Review provenance, license, procedural geometry, texture paths and dependencies. Strip generated scripts/remote requests. Port only the accepted mesh/material factories into `src/render/diorama/` with the existing Y-up room coordinates, room-template cache ownership, per-room state overlay, raycast IDs and disposal semantics. Keep a query-switchable baseline, add regression tests, and build a separate preview before proposing a merge. **Never overwrite `jinwan-youtao-v8-preview` or the live game's save key for this experiment.**

## Limitations

The new deterministic audit is not a full spatial contact/semantic-collision solver. Furniture proximity and intentional mattress/bed overlap require tagged semantics or visual review. Upstream 3DCodeVerse judges its own standalone generated scene, not the game's runtime scene. No vendor tokens, 3DCodeVerse run or iPhone benchmark is performed by these committed files.
