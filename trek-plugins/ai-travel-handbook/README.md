# AI Travel Handbook for TREK

Trip-native Travel Mode for TREK. TREK is the source of truth for collaboration, itinerary, bookings, files, packing and budgets; this plugin turns that live data into a compact travel-day interface.

## What it adds

- `Today`: execution view for the selected TREK day, with time, stop order, key notes, photo guidance and shortcuts.
- `Explore`: all TREK places, clearly separated into scheduled and free-choice places.
- `Prepare`: packing, reservations, accommodations and files in one pre-departure view.
- Google Maps and Xiaohongshu actions through TREK's secure `openExternal` bridge.
- AI enrichment metadata per place (`duration`, `risk`, `photo`, `xhs`) stored with `ctx.meta` instead of forking TREK's schema.
- Native TREK place-detail rows for suggested duration, photo guidance and risk.
- Live refresh on TREK core trip events, plus foreground/periodic re-sync fallback.
- One-click `Project Bali` migration into an empty TREK trip: 11 days, route places, coordinates, itinerary assignments, day timing metadata and Angkor alternatives.

## Production install in this repository

The deployment shell in `../../trek-deploy/compose.yaml` bind-mounts this plugin directly into TREK's plugin directory:

```text
/app/data/plugins/ai-travel-handbook
```

After TREK starts:

1. Open **Admin → Plugins**.
2. Click **Rescan** if the plugin is not already listed.
3. Review the permissions and activate **AI Travel Handbook**.
4. Create one empty trip.
5. Open its **AI Travel Handbook** tab and click **一键导入 Project Bali**.
6. Add the second traveler as a TREK member/guest. All future Plan edits are stored in TREK and shared in real time.

The importer intentionally refuses non-empty trips to avoid duplicate days or places.

## Permissions

The plugin reads trip, packing and file data. For the one-time Bali importer it also requests write access to trip fields, places, days and itinerary assignments. All writes remain membership/permission checked by TREK and appear in TREK's plugin activity audit.

## Development and validation

```bash
cd trek-plugins/ai-travel-handbook
npm run dev
npm run validate
npm run pack
```

A repository workflow also runs `trek-plugin-sdk validate` whenever this plugin changes.

## Data contract

Core facts stay in TREK:

- trip dates and title
- days and day assignments
- places and coordinates
- accommodations and reservations
- packing, files and costs

Travel-handbook-specific presentation data is namespaced in TREK plugin metadata under the key `handbook`.

Example place metadata:

```json
{
  "duration": "1h",
  "risk": "低",
  "photo": "用门洞和树根做前景框架。",
  "xhs": "Ta Prohm 塔普伦寺 出片"
}
```

Day metadata can additionally hold an execution timeline and optional alternatives. This preserves arrival-time guidance without changing TREK core tables.

## Agent architecture

Enable TREK MCP and use scoped OAuth 2.1 or a machine client. The AI agent should update TREK's core trip data through MCP. This plugin renders those changes as Travel Mode; the legacy static `/bali/` site remains a fallback/reference during migration and is no longer the long-term source of truth.
