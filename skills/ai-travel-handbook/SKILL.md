---
name: ai-travel-handbook
description: Build and continuously maintain an interactive travel handbook that supports pre-trip planning and in-trip execution. Use for itinerary planning, destination research, trip updates, travel-mode interfaces, route maps, checklists, food/shopping/experience guides, destination focus pages, and TREK-backed collaborative trips.
---

# AI Travel Handbook

## Goal
Create a living travel system that remains useful before departure, during the trip, and after itinerary changes. The output is an executable travel product, not a one-off article.

## TREK-first architecture
When a TREK instance is available, TREK is the system of record.

Use TREK for trip identity/dates/members, realtime collaboration, days and itinerary ordering, places and coordinates, reservations/accommodations, packing/to-dos/files/budgets, permissions/sharing and offline/PWA state.

Use the AI Travel Handbook layer for Today / Travel Mode, destination research, scheduled-vs-optional decision support, photography guidance, Xiaohongshu/Google Maps shortcuts, practical risk/duration guidance, complex destination focus pages, and AI reasoning about changes and conflicts.

Do not duplicate TREK core collaboration, budget, file, packing, booking or realtime systems in custom frontend code. When TREK is unavailable, structured local data is a temporary fallback and must remain migratable into TREK.

## Source of truth
Never treat rendered HTML as primary trip data.

Priority:
1. TREK core entities through MCP / plugin host APIs.
2. TREK plugin metadata for handbook-only enrichment.
3. Structured fallback trip data before TREK migration.
4. Rendered HTML only as a presentation layer.

Core facts belong in TREK. Handbook enrichment such as `suggestedDurationMinutes`, `practicalNote`, `timeGuard`, `shootingPlan`, `riskLevel`, `xiaohongshuQuery` and verified live facts belongs in the handbook metadata namespace.

When data changes, repair the structured source and rerender. Do not patch only the final HTML to hide a data defect.

## Selection order
Apply planning inputs in this order:
1. explicit must-go, avoid, mobility/health, dietary and time constraints;
2. stated interests and loyalty/value preferences;
3. first-visit destination identity;
4. geographic fit, opening hours, recovery, weather and transport resilience;
5. mainstream defaults only when the user delegates the choice.

Never override an explicit preference with a generic traveler assumption.

## Candidate qualification and freeze
Shortlist before deep research. Judge every candidate on five reusable dimensions:
- preference match
- destination distinctiveness
- route fit
- practical confidence
- time cost

Reject early when a place fails two of the first four dimensions or consumes disproportionate travel time for weak incremental value.

Before a place becomes a scheduled stop, qualify and freeze it with:
- exact entity / branch identity
- verified coordinate pair or exact map pin
- realistic visit duration
- route compatibility
- operating / reservation facts when relevant
- at least one credible source for any time-sensitive fact
- exact-place image feasibility when the UI requires imagery

Do not build a polished day around an unqualified place and later force it into the route.

## Day construction
Build a full day around one geographic cluster and one primary anchor. Add one or two compatible secondary places, a meal/rest window and at most one optional evening extension.

Rules:
- arrival and departure days stay lighter;
- avoid more than two same-type attractions in one day unless explicitly requested;
- avoid cross-city backtracking for one weak stop;
- alternate dense and lighter periods;
- preserve a realistic meal/rest/transport buffer in each half day;
- place shopping, cafes and optional experiences only when already on route;
- protect fixed transport before optional sightseeing;
- do not lengthen a viewpoint stop merely because the traveler has arrived there.

Before publishing an itinerary, run one coherence pass for preference coverage, repetition, backtracking, opening-hour conflicts, meal/rest gaps and late-to-early transitions.

## Truthfulness and evidence
Never invent a venue, branch, address, coordinate, opening time, ticket, rating, review count, reservation rule, transfer time, ferry/flight schedule or exact price.

Evidence order:
1. official venue / operator / government source;
2. reliable booking, map or established destination source;
3. community reviews only for recurring experience patterns, never as sole evidence for legal, safety or operating status.

For changing facts record `source` and `lastVerified`. If a live value cannot be verified, link to the live source or mark it pending instead of displaying a fabricated value.

A Google rating is optional. Never delay a useful itinerary solely because a rating is unavailable.

## Stop-level execution contract
Every important scheduled stop should contain:
- suggested arrival/time window
- realistic duration
- `practicalNote`: an action-changing instruction for what to do on site
- `timeGuard`: measurable latest departure, queue limit, shortening rule or transfer buffer
- next-step context
- map action
- Xiaohongshu action when useful
- `shootingPlan` with two or three route-specific moments when photography matters

`practicalNote` must be specific enough to change behavior. Avoid filler such as “根据体力调整” or “注意安全” unless paired with a concrete decision.

A shooting-plan card should give a beginner a usable position/camera height, lens or framing choice, subject action, and a crowd/safety/etiquette check. It must be derived from the existing route research and should not trigger a second broad research pass.

## Agent connection
Use TREK MCP for AI reads and writes.

Preferred auth:
- OAuth 2.1 for interactive assistants.
- Machine client (`client_credentials`) for unattended agents/scripts.
- Request only the scopes needed for the task.

## Required change workflow
1. Read the current TREK trip summary / structured fallback and affected entities.
2. Separate confirmed, scheduled, optional, cancelled and unresolved items.
3. Research only missing or time-sensitive information.
4. Qualify new place candidates and freeze the selected records.
5. Normalize them into place records with exact coordinates.
6. Build/update daily assignments, transfer time and buffers.
7. Detect conflicts between transport, opening hours, hotel check-in/out and activity duration.
8. Preserve free time and recovery after high-intensity activities.
9. Write changes to TREK first, or the structured fallback while migration is pending.
10. Write handbook-only enrichment to metadata.
11. Recompute affected Today/Explore/focus pages.
12. Verify dates, links, coordinates, critical transport identifiers and downstream days.
13. Let TREK realtime sync propagate collaborator changes; do not maintain a second collaborative state.

## Product views
### Trip
TREK native Plan is the primary planning view when available. The handbook provides compact summaries, maps and focus links but does not rebuild core drag/drop editing, budgets, files or collaboration.

### Today / Travel Mode
If the local date is inside the trip, open Travel Mode by default. Before the trip, use a day preview selector.

Phone-first card sequence should show only execution-critical information: time, stop, duration, what to do, time guard, photo guidance, next step, Google Maps and Xiaohongshu. Every day retains an offline coordinate-based mini route even when map tiles fail.

### Explore
Separate scheduled and optional places. Support destination-specific categories such as attractions, experiences, food, shopping, hotels, transport and free-time alternatives. Named cards expose direct map/search actions.

### Prepare
Read TREK packing, to-dos, reservations and files when available. Do not create a second copy of the same checklist. Add only handbook-specific language, local notes, entry reminders and final contextual checks.

## Destination focus pages
Create a focus page when a destination/day has enough routing or decision complexity to justify one, for example Angkor, Bromo or Nusa Penida.

A focus page should explain:
- why the selected stops were chosen
- exact visit order
- what to do and what can be skipped
- practical note and time guard for each important stop
- photography moments
- optional alternatives
- route trade-offs
- realistic finish time
- time-sensitive sources with verification dates

Focus pages must read from the same structured data wherever practical so an itinerary change does not create a stale duplicate guide.

## Reference-photo contract
Travel Mode reference photos are local-device utilities. Support compressed local persistence, large tappable/full-screen viewing, per-photo deletion and clear-all for each day. Never upload a private reference photo to a public repository unless the user explicitly requests that.

## Release gate
Before declaring a handbook update complete, check:
- all scheduled place identities are unambiguous;
- required scheduled places have coordinates;
- all fixed transport identifiers/dates match the current itinerary;
- no stale cancelled route remains in Trip/Today/focus pages;
- time-sensitive facts have a source and verification date or are clearly pending;
- daily timing contains realistic transfer/rest buffers;
- practical notes/time guards exist for complex scheduled stops;
- map and navigation links are non-empty;
- mobile Travel Mode remains readable and one-handed;
- external map failure still leaves route order and critical addresses usable;
- JavaScript/data files parse successfully after changes.

Do not call a partially rendered or structurally invalid page “done”. Fix the source record, rerender and recheck.

## UI principles
- Mobile first, desktop supported.
- Travel Mode must be usable one-handed.
- Use progressive disclosure instead of a long article.
- Hide planning rationale when the traveler only needs execution.
- User-facing copy should read like a finished travel product, not implementation notes.
- Prefer TREK-native design tokens inside a TREK plugin.

## Implementation
TREK plugin reference: `/trek-plugins/ai-travel-handbook/`

Current pre-migration demo/fallback: `/bali/`

Project Bali migration source: `/trek-migration/project-bali.json`

Workflow references:
- `/skills/ai-travel-handbook/workflows/travel-mode.md`
- `/skills/ai-travel-handbook/workflows/research-and-release.md`
