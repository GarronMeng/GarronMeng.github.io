# TREK deployment for AI Travel Handbook

This directory is the deployment shell for a self-hosted TREK instance. TREK must run on a host that supports a long-running Docker container, persistent volumes and WebSocket connections. GitHub Pages and Vercel static/serverless hosting are not suitable for the TREK core service.

## Start

```bash
cd trek-deploy
cp .env.example .env
openssl rand -hex 32
# paste the 64-char result into ENCRYPTION_KEY in .env
# set APP_URL to the final HTTPS origin
# set a strong ADMIN_PASSWORD

docker compose up -d --build
```

TREK listens on port 3000. Put it behind HTTPS with a reverse proxy and set `APP_URL` to the final public HTTPS origin before configuring OAuth/MCP.

## How the handbook plugin is installed

The Compose stack has a one-shot `handbook-build` service. Before TREK starts it:

1. mounts `../trek-plugins/ai-travel-handbook` read-only;
2. runs the official `trek-plugin-sdk pack` command;
3. expands `<!-- trek:ui -->` into TREK's production design kit and iframe bridge;
4. unpacks the built plugin into `./data/plugins/ai-travel-handbook`;
5. exits successfully, after which the TREK container starts.

This avoids running raw plugin source in production and keeps the deployed plugin equivalent to a normal sideloaded TREK package.

After first boot:

1. Sign in with the admin account from `.env`.
2. Open **Admin → Plugins** and click **Rescan** if needed.
3. Review and activate **AI Travel Handbook**.
4. Open **Admin → Addons** and enable MCP. Keep Packing, Budget, Documents and Collab enabled.
5. Create one empty Trip.
6. Open its **AI Travel Handbook** tab and click **一键导入 Project Bali**.
7. Add the second traveler as a trip member or guest.

The importer creates 11 dated days, route places and coordinates, itinerary assignments, Travel Mode timing metadata, photo guidance and the current Angkor alternatives. It refuses a non-empty Trip to prevent duplicate imports.

When the plugin source changes, run:

```bash
docker compose up -d --build --force-recreate handbook-build
docker compose restart trek
```

Then use **Admin → Plugins → Rescan** if TREK has not detected the updated files automatically. Permission expansions require explicit re-activation/re-consent by design.

## MCP recommendation

Use a machine client for unattended agent work. Restrict scopes to the trip operations the agent actually needs. Avoid deprecated static full-access tokens for the final setup.

TREK exposes the MCP endpoint at:

```text
https://<your-trek-host>/mcp
```

`APP_URL` must be correct for OAuth discovery. The reverse proxy must pass `Mcp-Session-Id` unchanged.

## Persistent data

- `./data` → TREK database, built plugin code, plugin state, backups and application data
- `./uploads` → trip documents and attachments
- `../trek-plugins/ai-travel-handbook` → version-controlled plugin source

Back up `data` and `uploads`. Do not store real secrets in this Git repository.

## Reverse proxy requirements

The proxy must support WebSocket upgrade headers for realtime collaboration. It must also pass the `Mcp-Session-Id` header unchanged for MCP sessions.

If Cloudflare is used in front of TREK, Bot Fight modes can block MCP requests from ChatGPT; configure the WAF accordingly before connecting the agent.

## Migration state

The existing GitHub Pages `/bali/` handbook stays online as a fallback during migration. Once the TREK instance is live and Project Bali has been imported, TREK becomes the source of truth for collaborative changes. The static site should then be treated as a read-only reference unless intentionally retired.
