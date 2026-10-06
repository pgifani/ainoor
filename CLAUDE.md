# CLAUDE.md — Ainoor (agency)

This folder is **Ainoor**, the agency that builds AI-powered websites + booking systems for
doctors. It is self-contained and **separate from any client site** (e.g. the Dr. Hashemi site
lives in a different repo, `pgifani/dr-foroogh-hashemi`). Don't mix client work into this folder.

## What's here
- `index.html` — the **Ainoor sales landing page** (bilingual: Persian default + English toggle;
  plans, features, request form).
- `server.mjs` — zero-dependency Node server: serves the site **and** `POST /api/lead`, which
  **emails each request** (via Resend) to `LEAD_TO` with `reply_to` = the customer, and keeps a
  `leads.json` backup. Runs in safe **mock mode** (prints to console) until env vars are set.
- `Dockerfile` — Coolify build (Dockerfile strategy, port **3000**, data volume `/app/data`).
- `client-intake.html` — the **detailed client-onboarding form** you send a doctor *after* they
  reply to a lead. Served at **`/intake`** (and `/client-intake.html`); its **Submit** button POSTs
  to **`POST /api/intake`**, which emails the full submission to `LEAD_TO` (and saves `intake.json`).
  Download/copy/print remain as fallbacks.
- `.claude/skills/` — the agency's reusable skills:
  - **clinic-site-launch** — end-to-end launch of a new client site (repo → Coolify → domain →
    SMS/email → bots → verify). Start here for a new doctor.
  - **clinic-bot-onboarding** — connect a clinic's staff to the Telegram/Bale booking bots.

## Stack & deploy (same pattern as the client sites)
- **Zero npm dependencies** — Node built-in `http` + `fetch` only. No `package.json`; Coolify must
  use the **Dockerfile** build strategy (NOT Railpack).
- Deploys on the **Hostinger VPS + Coolify** (IP `187.7.29.221`). Intended domain: **`ainoor.io`**
  (root). Add an A record `@ → 187.7.29.221`, set the Coolify domain to `https://ainoor.io`, mount
  a volume at `/app/data`.
- **Env vars (Coolify):** `RESEND_API_KEY` (the verified `ainoor.io` sender — same key as the
  client sites), `MAIL_FROM="Ainoor <hello@ainoor.io>"`, `LEAD_TO=gifani.codes@gmail.com`,
  optional `MAIL_REPLY_FALLBACK`. `PORT`/`DATA_DIR` come from the Dockerfile.
- Full agency infrastructure notes (VPS, Coolify, Resend, SMS.ir, per-client model) are in the
  persistent memory note **`ainoor-vps-deployment`**.

## Frontend rules
- **Invoke the `frontend-design` skill** before writing/reshaping any frontend here.
- **Serve on localhost for previews** — `node server.mjs` (set `PORT` to change), or `preview_start`.
  Never screenshot a `file://` URL.
- Placeholder prices in the plans (`۰۰۰٬۰۰۰`) live in `index.html`: Persian in the
  `data-i18n="p1_price/p1_monthly"…"p3_*"` spans, English in the `EN = {…}` dictionary (same keys).
- Keep the Persian (inline, default) and English (`EN` dict) copy in sync.

## General tools (inherited from the workspace)
Tavily-first for web research; `gws` CLI for Google Workspace — see the workspace `../CLAUDE.md`.
Never commit or print `.env`, API keys, or `leads.json` (contains lead PII).
