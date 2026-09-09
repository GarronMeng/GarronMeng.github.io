# Travel Mode Workflow

Use this workflow when the trip date is today or when the user previews a travel day.

## 1. Resolve current day
- Prefer the device/local date while traveling.
- Match the date to the structured day record.
- Before departure, show preview mode rather than pretending it is live.
- After the trip, keep the view available for review.

## 2. Build the phone-first live sequence
For each ordered stop show, in this order:
1. time / suggested arrival window
2. stop name
3. realistic suggested duration
4. `practicalNote`: what the traveler should actually do on arrival
5. `timeGuard`: latest departure, queue limit, shortening rule or transfer buffer
6. risk/dependency when material
7. route-specific photography guidance when useful
8. next-step context
9. Google Maps action
10. exact-place Xiaohongshu search action when useful

Do not reproduce full planning rationale in Travel Mode. Use progressive disclosure for shooting guidance and secondary details.

## 3. Practical-note quality
A practical note must change an on-site decision. Good examples:
- enter through the west side, finish the main gallery before climbing the tower;
- complete the upper viewpoint first, then decide whether to descend part of the stairs;
- check in and hand over luggage before taking a meal break.

Reject filler such as “注意安全”, “根据体力调整”, “拍照打卡” unless it is paired with a specific action.

## 4. Time-guard quality
Every complex or transport-dependent stop needs a measurable stop-loss. Examples:
- leave by 16:45 even if sunset light improves;
- if the queue exceeds 25 minutes, skip the tower;
- if arrival is after 10:30, keep only the upper viewpoint;
- after 13:00 do not leave the ferry waiting area.

When a traveler explicitly does not want an exhausting schedule, prefer shortening a viewpoint/optional stop over moving hotel breakfast or checkout dramatically earlier.

## 5. Photography card
For visually important stops, provide two or three compact moments. Each should identify:
- usable standing position or camera height;
- lens/framing suggestion;
- what the subject should do;
- one crowd, exposure, safety or etiquette check.

Do not trigger a separate broad research pass only to write photography advice; derive it from the same verified stop and route research.

## 6. Handle delays and changes
When a stop is delayed or removed:
1. protect fixed transport first;
2. protect hotel check-in/out and reservations second;
3. protect realistic transfer buffers;
4. remove or shorten low-priority optional stops;
5. recalculate remaining finish time.

Never compress every buffer just to preserve the original sightseeing list.

## 7. Nearby options
Only show optional places geographically coherent with the current day. Reject a suggestion that creates a major detour unless the user explicitly asks for it.

## 8. Navigation and route fallback
The day should have a coordinate-backed mini route generated from the same structured data as the itinerary.

Travel Mode must still expose route order, place names, critical addresses/identifiers and cached checklist state when map tiles or third-party content fail. Google Maps remains the primary external navigation action; do not draw false geography when coordinates are missing—fix the source record instead.

## 9. Reference photos
Reference photos are local-device utilities:
- compress before local persistence;
- allow large tappable/full-screen preview;
- allow per-photo deletion;
- allow clear-all per day;
- do not upload private reference images to the public project without explicit user instruction.

## 10. Time-sensitive facts
Display a live fact only when its source is recorded. When useful, show a compact `lastVerified` date. A stale or unavailable value should be marked pending or linked out for live checking rather than guessed.

## 11. End-of-day handoff
At night surface only the next day's critical checks:
- weather / sea condition when relevant;
- first fixed departure and latest leave-hotel time;
- tickets / booking confirmations;
- clothing / equipment;
- charging and connectivity.
