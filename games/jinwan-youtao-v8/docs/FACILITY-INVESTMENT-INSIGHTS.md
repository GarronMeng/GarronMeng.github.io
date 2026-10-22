# Facility Investment Insights · v8

## Purpose

Help the player decide whether to expand, maintain, restock, or first improve demand. The facility panel should explain the current operating signal instead of treating the next level as an automatic improvement.

## Live signals

- **Instant utilization:** seated guests at the selected facility divided by its capacity. Guests waiting outside, staff, departing guests, and guests travelling elsewhere are excluded.
- **Queue:** non-staff guests whose `waitingFor` points to the selected facility.
- **Positioning fit:** a transparent heuristic for the current business / resort / urban positioning. Club Lounge fit is adjusted by the number of in-house Globalist / Explorist guests; rooftop fit is reduced in rainy weather.
- **Service readiness:** low breakfast / lounge stock and low maintenance take priority over expansion.
- **Construction:** while a facility is under construction, the panel recommends finishing the current work first.

## Decision order

1. Finish active construction.
2. If maintenance is below 45%, maintain the facility before adding capacity.
3. If breakfast stock is below 10 portions or lounge stock below 8 portions, restock before evaluating expansion.
4. If queueing exists or instantaneous utilization reaches 85%, consider expansion only when positioning fit is at least “一般匹配” and the facility is below level 5.
5. If utilization is low and positioning fit is weak, validate demand through positioning or activities before investing.
6. Otherwise, observe peak-period utilization before spending.

These thresholds are initial gameplay heuristics and should be rebalanced from playtest data.

## Current upgrade economics

A facility upgrade currently costs `¥3,500 × current level`, takes 120 game minutes, adds 4 capacity, increases quality by 5, and restores maintenance to 100. The insight panel surfaces these costs and effects beside live usage signals.

The panel intentionally does **not** claim a guaranteed revenue forecast. Current occupancy is an instantaneous snapshot, not a full-day utilization history; any future ROI estimate should be based on measured visits, spend, queue time, and lost demand across multiple days.

## Acceptance

- `npm test` covers maintenance priority, queue-driven expansion, low-demand / weak-fit deferral, and exact facility occupancy.
- `npm run build` must pass.
- Visual review should confirm the panel remains readable on narrow mobile viewports and does not cause the management sheet to overflow.
