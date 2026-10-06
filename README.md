# Ainoor — agency site

The marketing + lead-capture site for **Ainoor**: AI-powered websites and booking systems for
doctors. Bilingual (Persian default, English toggle), zero-dependency Node backend.

## What it does
- A landing page: hero, features, 3 plans (Basic / Pro / Premium), request form, FAQ.
- **Request form → your inbox:** `POST /api/lead` emails each request (via Resend) to `LEAD_TO`
  with `reply_to` set to the customer, and saves a `leads.json` backup. A hidden honeypot drops bots.

## Run locally
```bash
node server.mjs            # http://localhost:3000  (PORT=4000 to change)
```
Without env vars it runs in **mock mode** — the lead email is printed to the console and still
saved to `leads.json`.

## Environment (Coolify)
| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend key for the verified `ainoor.io` domain (enables the lead email) |
| `MAIL_FROM` | `Ainoor <hello@ainoor.io>` |
| `LEAD_TO` | where requests are delivered (e.g. `gifani.codes@gmail.com`) |
| `MAIL_REPLY_FALLBACK` | optional reply-to when a lead left no email |
| `PORT` / `DATA_DIR` | set by the Dockerfile (`3000`, `/app/data`) |

## Deploy
GitHub repo → Coolify **Dockerfile** build → port **3000** → persistent volume at `/app/data` →
domain `https://ainoor.io` (A record `@ → 187.7.29.221`) → set env vars → Deploy.

## The customer funnel
1. Visitor submits the request form → email reaches you (reply-to = customer).
2. You reply and, once they're in, send them **`client-intake.html`** to collect full details.
3. Use the **clinic-site-launch** skill (`.claude/skills/`) to build their site.

Prices in the plans are placeholders — edit them in `index.html` (Persian spans + the `EN` dict).

*Built with Claude Code.*
