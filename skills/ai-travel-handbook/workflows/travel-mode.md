# Travel Mode Workflow

Use this workflow when the trip date is today or when the user previews a travel day.

## 1. Resolve current day
- Prefer the device/local date while traveling.
- Match the date to the trip's structured day record.
- If the trip has not started, show preview mode rather than pretending it is live.
- If the trip has ended, keep the view available for review.

## 2. Build the live sequence
For every timeline stop, show only:
1. time / suggested arrival
2. stop name
3. suggested duration
4. what matters at this stop
5. caution or dependency
6. photo tip if useful
7. Google Maps action
8. Xiaohongshu search action if useful
9. next-step context

Do not reproduce the full planning rationale inside Travel Mode.

## 3. Handle changes
When a stop is delayed or removed:
- protect fixed transport first
- protect hotel check-in/out and reservations second
- remove low-priority optional stops before compressing essential transfer buffers
- recalculate the remaining finish time

## 4. Suggest nearby options
Only show optional places that are geographically coherent with the current day. Avoid suggestions that create a major detour unless the user explicitly asks for them.

## 5. Offline fallback
The page must still expose:
- route order
- place names
- critical addresses / identifiers
- cached checklist state
when external map tiles or third-party content fail.

## 6. End-of-day handoff
At night, surface only the next day's critical checks:
- weather / sea condition when relevant
- first departure time
- tickets / booking confirmations
- clothing / equipment
- charging and connectivity
