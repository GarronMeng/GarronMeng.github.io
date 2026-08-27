---
name: ai-travel-handbook
description: Build and continuously maintain an interactive travel handbook that supports pre-trip planning and in-trip execution. Use for itinerary planning, destination research, trip updates, travel-mode interfaces, route maps, checklists, food/shopping/experience guides, destination focus pages, and TREK-backed collaborative trips.
---

# AI Travel Handbook

## Goal
Create a living travel system, not a one-off攻略. The handbook must remain useful before departure, during the trip, and after itinerary changes.

## TREK-first architecture
When a TREK instance is available, TREK is the system of record.

Use TREK for:
- trip identity, dates and members
- realtime collaboration
- days and itinerary ordering
- places, coordinates and route planning
- reservations and accommodations
- packing, to-dos, files and budgets
- member permissions and public/private sharing
- offline/PWA state

Use the AI Travel Handbook layer for:
- Today / Travel Mode
- destination research and recommendations
- scheduled vs optional decision support
- photo/shot guidance
- Xiaohongshu and Google Maps shortcuts
- risk and visit-duration guidance
- complex destination focus pages
- AI reasoning about changes, conflicts and alternatives

Do not duplicate TREK core collaboration, budget, file, packing, booking or realtime systems in custom frontend code.

When TREK is not yet available, structured local data may be used as a temporary fallback. The fallback must remain migratable into TREK and must never become the long-term source of truth.

## Source of truth
Never treat rendered HTML as the primary data source.

Priority order:
1. TREK core entities through MCP / plugin host APIs.
2. TREK plugin metadata for handbook-only enrichment.
3. Structured fallback trip data before TREK migration.
4. Rendered HTML only as a presentation layer.

Core facts belong in TREK. Handbook-only enrichment such as `duration`, `risk`, `photo`, and `xhs` may live in the `AI Travel Handbook` plugin metadata namespace.

## Agent connection
Use TREK MCP for AI reads and writes.

Preferred auth:
- OAuth 2.1 for interactive assistants.
- Machine client (`client_credentials`) for unattended agents and scripts.
- Do not build new automation around deprecated static full-access tokens.

An agent should request only the scopes needed for the task. Normal trip-maintenance work usually needs scoped access to trips, days, places, itinerary, reservations, packing, to-dos and trip-summary resources.

## Required workflow
1. Read the current TREK trip summary and affected entities before changing anything.
2. Separate confirmed, planned, optional, cancelled, and unresolved items.
3. Research only missing or time-sensitive information.
4. Normalize new destinations into TREK place records.
5. Build or update daily assignments including travel time and realistic buffers.
6. Detect conflicts between transport, opening hours, hotel check-in/out, and activity duration.
7. Preserve free time and recovery after high-intensity activities.
8. Write changes to TREK first.
9. Write handbook-only enrichment to plugin metadata when needed.
10. Verify links, maps, dates, critical transport nodes and downstream affected days.
11. Let TREK realtime sync propagate the change to collaborators; do not maintain a second collaborative state.

## Product views

### Trip
TREK native Plan is the primary planning view. Do not rebuild drag/drop itinerary editing in the handbook plugin.

The handbook may provide compact summaries and focus-page links but should defer itinerary editing, bookings, costs, files and collaboration to TREK.

### Today / Travel Mode
If the current local date falls within the trip dates, open Travel Mode by default.

Show only execution-critical information:
- current day and ordered route
- suggested arrival time
- stop duration
- what to do at the stop
- key caution
- photo suggestion when useful
- Google Maps action
- Xiaohongshu search action when useful
- next stop

Before the trip, Today acts as a day-by-day preview selector.

### Explore
Read the trip's TREK places and assignments, then separate scheduled and optional places.

Support destination-specific categories such as:
- attractions
- experiences
- food
- shopping
- hotels
- free-time options

Each place should expose direct search/navigation actions instead of forcing the traveler to manually copy names.

### Prepare
Read and summarize TREK native packing, to-dos, reservations and files. Do not create a second independent checklist if TREK already owns the same item.

Add only handbook-specific layers such as:
- language shortcuts
- destination tips
- entry-rule reminders
- final contextual checks

## Destination focus pages
Create a focus page only when a destination/day is complex enough to justify one. Examples: Angkor, Bromo, Nusa Penida.

A focus page should explain:
- why the selected stops were chosen
- exact visit order
- what to see at each stop
- what can be skipped
- optional alternatives
- route trade-offs
- realistic finish time

## Change handling
When the user says things like:
- “删掉这个景点”
- “这个改备选”
- “酒店同意 late checkout”
- “加一个新餐厅”

first update TREK core trip data through MCP. Then update any affected handbook metadata or focus page.

Example:
`delete place → re-evaluate day timing → recommend replacement/free time → update itinerary → update Travel Mode → collaborators receive TREK realtime sync`.

## Data quality rules
- Never invent live ratings, opening hours, prices, transport schedules, or entry requirements.
- Time-sensitive facts require a source and a last-verified date.
- If a live value is not verified, link to the live source instead of displaying a fabricated number.
- Preserve critical airport/station identifiers exactly.
- Keep offline/fallback content for route and address information when third-party maps fail.

## UI principles
- Mobile first, desktop supported.
- Travel Mode must be usable one-handed on a phone.
- Hide planning detail when it is not needed in the moment.
- Use progressive disclosure rather than one long攻略 page.
- User-facing copy should read like a finished travel product, not implementation notes.
- Prefer TREK-native UI and plugin design tokens when running as a TREK plugin.

## Implementation
TREK plugin reference implementation:
`/trek-plugins/ai-travel-handbook/`

Current pre-migration demo/fallback:
`/bali/`

Project Bali migration source:
`/trek-migration/project-bali.json`
