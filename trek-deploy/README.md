# TREK deployment for AI Travel Handbook

This directory is the deployment shell for a self-hosted TREK instance. TREK must run on a host that supports a long-running Docker container, persistent volumes and WebSocket connections. GitHub Pages and Vercel static/serverless hosting are not suitable for the TREK core service.

## Start

```bash
cd trek-deploy
cp .env.example .env
openssl rand -hex 32
# paste the 64-char result into ENCRYPTION_KEY in .env

docker compose up -d
```

TREK listens on port 3000. Put it behind HTTPS with a reverse proxy and set `APP_URL` to the final public HTTPS origin before configuring OAuth/MCP.

## First boot

1. Sign in with the admin account from `.env`.
2. Admin → Addons: enable MCP. Keep Packing, Budget, Documents and Collab enabled.
3. Admin → Plugins: install `AI Travel Handbook` from `../trek-plugins/ai-travel-handbook` after packing it with the TREK Plugin SDK.
4. Create/import the Project Bali trip.
5. Add the second traveler as a trip member or guest.
6. Settings → Integrations → MCP: create a scoped OAuth client or a machine client for the AI agent.

## MCP recommendation

Use a machine client for unattended agent work. Required scopes should be limited to the trip operations the agent actually needs, typically trips/days/places/itinerary/reservations/packing/todos read-write plus trip-summary read access. Do not use deprecated static full-access tokens for the final setup.

TREK exposes the MCP endpoint at:

```text
https://<your-trek-host>/mcp
```

`APP_URL` must be set correctly for OAuth discovery.

## Persistent data

- `./data` → TREK database, backups and application data
- `./uploads` → trip documents and attachments

Back up both directories. Do not store secrets in this Git repository.

## Reverse proxy requirements

The proxy must support WebSocket upgrade headers for realtime collaboration. It must also pass the `Mcp-Session-Id` header unchanged for MCP sessions.

If Cloudflare is used in front of TREK, its Bot Fight modes can block MCP requests from ChatGPT; configure the WAF accordingly before connecting the agent.
