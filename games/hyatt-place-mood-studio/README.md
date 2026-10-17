# PLACE / STUDIO — Hyatt Regency Shenzhen Airport Suite V2

Online demo: https://garronmeng.github.io/games/hyatt-place-mood-studio/

## Current target

Independent Three.js scene inspired by the executive-suite feeling of Hyatt Regency Shenzhen Airport. This is a visual interpretation, not an official hotel asset or an exact measured floor plan.

The scene emphasizes a separate lounge and sleeping zone, expanded sofa area, accent chair, minibar / hospitality console, entry bench, luggage rack, timber divider, and an airport-terminal / city view rather than a waterfront.

## Runtime reliability fix

The previous deployment used a split Three.js module whose `three.core.js` file was empty, and the older standalone HTML also retained CDN fallback logic. That caused the import chain to fail before the scene could render.

The current page uses:
- `vendor/three.umd.js`: self-hosted Three.js r160 browser bundle.
- `vendor/three.module.js`: a tiny ES-module bridge exposing the local `window.THREE`.
- `vendor/addons/controls/OrbitControls.js` and `vendor/addons/geometries/RoundedBoxGeometry.js`: local addon modules adapted to the bridge.
- Explicit relative imports; no runtime CDN or import-map dependency.

## iPhone use

Open the HTTPS URL in Safari. If an older error remains visible, use a cache-busting URL such as `?v=20261018-suitefix2` or fully reload the page.

## Validation

- GitHub repository contains the page and all referenced local runtime assets.
- No CDN references remain in the deployed HTML or addon modules.
- Main scene script and both addon modules passed syntax checks.
- Live Safari/WebGL rendering has not been directly verified in this environment; the cache-busting URL should be used for the next device check.

Three.js is distributed under the MIT license. This demo is not affiliated with Hyatt.
