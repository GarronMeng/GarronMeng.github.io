# Research and Release Workflow

Use this workflow for a new destination, a materially changed day, or any update that introduces new scheduled places or time-sensitive transport.

## Phase 1 — Frame the affected trip segment
Read existing confirmed trip facts first. Identify:
- fixed transport and reservations;
- confirmed accommodation;
- explicit must-go / avoid / loyalty / comfort constraints;
- the geographic area and time window being changed;
- the downstream fixed event that the day must still reach.

Do not reopen unaffected days merely because one segment changed.

## Phase 2 — Shortlist before deep research
Create a small candidate pool. Judge candidates on:
- preference match;
- destination distinctiveness;
- route fit;
- practical confidence;
- time cost.

Reject repetitive filler, weak remote photo spots, generic activities available anywhere and candidates whose travel-time burden is disproportionate to their value.

## Phase 3 — Qualify and freeze selected places
Before scheduling a candidate, verify:
1. exact entity / branch identity;
2. coordinate pair or exact map pin;
3. route access and realistic transfer time;
4. opening / reservation / ticket rule when it matters;
5. realistic visit duration;
6. at least one source for time-sensitive facts;
7. exact-place image feasibility when the product requires an image.

Freeze qualified records before writing final daily prose. If a required field cannot be established, replace the candidate or mark it unresolved; never infer a coordinate, rating, schedule or exact price.

## Phase 4 — Assemble the day
Build around one geographic cluster and one primary anchor. Add compatible secondary stops, meal/rest space and at most one optional evening extension.

For each important scheduled stop write:
- suggested time/window;
- duration;
- `practicalNote`;
- `timeGuard`;
- next-step context;
- photography moments when useful.

Then run a coherence check for repetition, backtracking, opening conflicts, meal/rest gaps and late-to-early fatigue.

## Phase 5 — Propagate structured changes
Update the system of record first:
- TREK core entities when available;
- TREK handbook metadata for enrichment;
- otherwise the structured fallback trip data.

Then regenerate or update Trip, Today, Explore, Prepare and any affected focus page from those records. Do not leave a stale route in a migration file or a second copy of the itinerary.

## Phase 6 — Truthfulness and provenance check
For every time-sensitive displayed fact, verify that the record contains a source and `lastVerified` date. This includes ferry/flight schedules, admission, operating hours, prices, ratings and reservation rules.

Ratings are optional. Missing optional enrichment never justifies guessing.

## Phase 7 — Release audit
Before handoff verify:
- scheduled place identities are unambiguous;
- coordinates exist for routed places;
- trip dates and fixed transport identifiers agree across all views;
- cancelled/replaced stops are removed from downstream views;
- travel durations and buffers are plausible;
- complex stops contain actionable practical notes and time guards;
- map/navigation links are usable;
- external-map failure leaves an offline route/order fallback;
- reference-photo interactions remain local-device and functional;
- mobile Travel Mode remains readable;
- JavaScript and JSON parse successfully;
- the public page loads the newest asset versions rather than a stale browser cache.

If one of these structural checks fails, fix the structured source and rerun the affected render/audit before calling the update complete.
