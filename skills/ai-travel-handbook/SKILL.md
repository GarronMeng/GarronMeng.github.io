---
name: ai-travel-handbook
description: Build and continuously maintain an interactive travel handbook that supports pre-trip planning and in-trip execution. Use for itinerary planning, destination research, trip updates, travel-mode interfaces, route maps, checklists, food/shopping/experience guides, and destination focus pages.
---

# AI Travel Handbook

## Goal
Create a living travel system, not a one-off攻略. The handbook must remain useful before departure, during the trip, and after itinerary changes.

## Source of truth
Never treat rendered HTML as the primary data source. Maintain structured trip data first, then render all views from that data.

The source of truth should contain:
- trip metadata: destination sequence, dates, travelers, confirmed bookings
- days: ordered itinerary, timing, transport, lodging
- places: status, category, duration, map query, visit notes, photo notes, risk
- alternatives: optional places and replacement logic
- checklist: preparation items with persistent completion state
- guide modules: food, shopping, experiences, language, tips
- source metadata for time-sensitive facts

## Required workflow
1. Read existing trip facts and confirmed bookings.
2. Separate confirmed, planned, optional, cancelled, and unresolved items.
3. Research only missing or time-sensitive information.
4. Normalize destinations into structured place records.
5. Build or update daily routes including travel time and realistic buffers.
6. Detect conflicts between transport, opening hours, hotel check-in/out, and activity duration.
7. Preserve free time and recovery after high-intensity activities.
8. Render the handbook views from structured data.
9. Verify links, maps, dates, and critical transport nodes after every update.
10. When the user changes one item, update the source data and every affected view consistently.

## Product views

### Trip
Show the full itinerary by date with:
- lodging
- transport
- stop order
- suggested duration
- route map
- confirmed vs unresolved items
- focus-page links for complex days

### Today / Travel Mode
If the current local date falls within the trip dates, open Travel Mode by default.

Show only execution-critical information:
- current day and route
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
Separate scheduled and optional places. Support destination-specific categories such as:
- attractions
- experiences
- food
- shopping
- hotels
- free-time options

Each place should expose direct search/navigation actions instead of forcing the traveler to manually copy names.

### Prepare
Provide persistent checklists for:
- entry requirements
- reservations
- transport
- packing
- final pre-departure checks

Also include language shortcuts and practical travel tips.

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

## Data quality rules
- Never invent live ratings, opening hours, prices, transport schedules, or entry requirements.
- Time-sensitive facts require a source and a last-verified date.
- If a live value is not verified, link to the live source instead of displaying a fabricated number.
- Preserve critical airport/station identifiers exactly.
- Keep offline/fallback content for route and address information when third-party maps fail.

## Update behavior
When the user says things like:
- “删掉这个景点”
- “这个改备选”
- “酒店同意 late checkout”
- “加一个新餐厅”

update structured data first. Then regenerate affected itinerary, Travel Mode, Explore, checklist, route map, and focus pages. Do not make isolated HTML edits that cause data drift.

## UI principles
- Mobile first, desktop supported.
- Travel Mode must be usable one-handed on a phone.
- Hide planning detail when it is not needed in the moment.
- Use progressive disclosure rather than one long攻略 page.
- User-facing copy should read like a finished travel product, not implementation notes.

## Demo
Reference implementation: `/bali/` in the same repository.
