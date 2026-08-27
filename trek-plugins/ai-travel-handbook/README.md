# AI Travel Handbook for TREK

Trip-native Travel Mode for TREK. TREK remains the source of truth for collaboration, itinerary, bookings, files, packing and budgets; this plugin turns that live data into a compact travel-day interface.

## What it adds

- `Today`: renders the selected TREK day as an execution view instead of a planning table.
- `Explore`: shows all TREK places and distinguishes scheduled vs free-choice places.
- `Prepare`: summarizes packing, reservations, accommodations and files.
- Google Maps and Xiaohongshu shortcuts per place.
- Optional AI metadata per place (`duration`, `risk`, `photo`, `xhs`) stored with `ctx.meta`.
- Native TREK place-detail rows for suggested duration, photo guidance and risk.
- A Project Bali metadata seeder that matches known places without modifying TREK core tables.

## Install

1. Run TREK >= 4.0.0 with plugins enabled.
2. From this directory run `npm run validate` and then `npm run pack`.
3. Upload the generated plugin ZIP in TREK Admin → Plugins, or use a dev-link on a non-production TREK instance.
4. Activate the plugin and approve the requested read/meta/provider permissions.
5. Open any trip. A `AI Travel Handbook` trip-page tab appears inside the planner.

## Development

```bash
cd trek-plugins/ai-travel-handbook
npm run dev
```

The TREK Plugin SDK dev server exposes a themed preview without requiring a full TREK instance.

## Data contract

Core facts must stay in TREK:

- trip dates and title
- days and day assignments
- places and coordinates
- accommodations and reservations
- packing, files and costs

The plugin only stores presentation/enrichment metadata in the plugin namespace under the key `handbook`.

Example place metadata:

```json
{
  "duration": "1h",
  "risk": "低",
  "photo": "用门洞和树根做前景框架。",
  "xhs": "Ta Prohm 塔普伦寺 出片"
}
```

## Agent architecture

For AI writes, enable TREK MCP and use OAuth 2.1 or a machine client. The AI agent should mutate TREK's core trip data through MCP. This plugin reads those changes immediately from TREK and renders the updated Travel Mode; do not make the static `/bali/` HTML the source of truth once migration is complete.
