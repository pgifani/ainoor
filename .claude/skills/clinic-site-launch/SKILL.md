---
name: clinic-site-launch
description: End-to-end launch of a new doctor/clinic website on the Ainoor stack — clone the template repo, rebrand & customize (name, schedule, services, chatbot facts, photos), create the Coolify app, point a domain, set up patient SMS (SMS.ir) + optional email (Resend), configure all env vars, connect the booking bots, and verify go-live. Use this when onboarding a NEW clinic customer or standing up a new client site. For just connecting staff to the bots, use clinic-bot-onboarding instead.
---

# New clinic site launch (Ainoor stack)

Guided checklist to take a new doctor from nothing to a live site with booking, email,
bots, online visits, and the AI chatbot. The template is the `website/` app
(`server.mjs` + `index.html`/`fa.html`), deployed on the Hostinger VPS via Coolify.
Full infra background: memory note `ainoor-vps-deployment`.

**Architecture in one line:** zero-dependency Node (`server.mjs`) serves the bilingual static
site AND the booking/email/bot/chat APIs; built on Coolify from GitHub via the **Dockerfile**
strategy (NOT Railpack — it fails, there's no package.json); port **3000**; bookings persist to a
volume mounted at **/app/data**.

> Before editing any frontend, follow `website/CLAUDE.md`: invoke the **frontend-design** skill,
> check `brand_assets/`. For research, Tavily first (workspace `CLAUDE.md`).

---

## Step 0 — collect from the client

- Doctor's full name (EN + FA), specialty, short bio.
- Services list; any highlighted service (e.g. ear piercing).
- **Weekly schedule** — open days + hours (per weekday).
- Clinic phone, address, and a real photo of the doctor (optional but ideal).
- Online visits? which types (video / text), the fee, and the **card number + card-holder name** for prepayment.
- Their **WhatsApp** number (for online visits).
- Domain: use an `*.ainoor.io` subdomain for a demo, or **their own domain** (register in the client's name).
- Who receives bookings (doctor / receptionist / shared group) and on which app (**Bale** = Iran default, Telegram = backup).

## Step 1 — repo

1. Clone the template repo (`pgifani/dr-foroogh-hashemi`) into a **new per-client GitHub repo**
   (one repo per client). Keep `Dockerfile`, `server.mjs`, `index.html`, `fa.html`, `serve.mjs`,
   `vercel.json`, `brand_assets/`.
2. Do NOT carry over the previous client's `bookings.json` / `blocks.json` (PII) or `.env`.

## Step 2 — rebrand & customize (the per-client edits)

| What | Where |
|---|---|
| **Doctor name** (EN) | `index.html` — ~5 spots; plus `CLINIC_INFO` in `server.mjs` |
| **Doctor name** (FA) | `fa.html` — ~5 spots |
| **Weekly schedule** | `HOURS` map — **both** `index.html` (~L776) and `fa.html` (~L748). Keep them identical. Format `{ getDay: [startHour, endHour] }`, Sat=6…Sun=0; a missing weekday = closed. `DAYS_AHEAD` = how far ahead to book. |
| **Services + highlighted card** | services/bento section in both HTML files |
| **Chatbot knowledge** | `CLINIC_INFO` string in `server.mjs` (~L102) — hours, services, address, phone, policies. `chatSystem()` (~L106) holds the guardrails; usually leave as-is. |
| **Colors / branding / photos** | both HTML `<style>` tokens + `brand_assets/`; invoke frontend-design for real design work |
| **Contact (phone/address/map)** | contact sections in both HTML files |

Keep EN and FA in sync. The `HOURS` map is client-side only (no server schedule to match).

## Step 3 — Coolify app

1. New Resource → from the client's **GitHub repo**.
2. Build pack = **Dockerfile** (not Nixpacks/Railpack). Port **3000**.
3. **Persistent Storage:** add a volume mounted at **`/app/data`** (the Dockerfile sets
   `DATA_DIR=/app/data`; bookings/blocks survive redeploys only with this mount).
4. Set env vars (Step 6), then Deploy.
5. **Auto-deploy:** a "Public Repository" source does NOT auto-deploy. For push-to-deploy, use a
   private repo connected via GitHub App, or add Coolify's deploy **webhook** to the repo. Else
   redeploy manually in Coolify after each push.

## Step 4 — domain & DNS (Hostinger)

- **Subdomain (demo):** add an **A record** `sub → 187.7.29.221`. In Coolify set the app domain to
  `https://sub.ainoor.io`. Coolify issues a Let's Encrypt cert and enables HTTP→HTTPS.
- **Client's own domain:** point its A record at the VPS IP (register the domain in the client's name).
- TTL: Hostinger rejects "Auto" — use a number (e.g. 14400).

## Step 5 — patient SMS (SMS.ir) + optional email (Resend)

**SMS is the primary patient channel** — most patients (parents) don't use email.
- Gateway: **SMS.ir** (Iranian; v1 REST API `POST /v1/send/bulk`, `X-API-KEY` header). Chosen over
  Kavenegar because its **dashboard is reachable from outside Iran**, so the agency can register and
  manage it directly. Account still needs an Iranian national ID (احراز هویت), an Iranian mobile
  (signup OTP), and Rial payment.
- Prefer a **dedicated line (خط اختصاصی)** — shared lines often block the cancel link. Keep the line
  topped up with credit (اعتبار) or sends fail silently.
- API reachable from the VPS (test: `node -e "fetch('https://api.sms.ir/v1/send').then(r=>console.log(r.status))"`).
  If only a shared line is available (link filtered), switch the confirm SMS to a no-link
  "call us to cancel" message.

**Multi-client SMS — reuse ONE agency account.** Do NOT register a new SMS.ir account per client.
One agency account (registered once under the agency's national ID) serves all clinics:
- **Simplest:** reuse the **same line for every client** — each SMS's text names its own clinic, so
  a shared sender number is fine. The free 15-digit dedicated line from SMS.ir's base panel (پنل پایه)
  can cover all clients; it can send links because it's a *dedicated* line.
- **Per-client line (optional):** add another line *under the same account* only when a clinic wants
  its own sender number or you want per-line billing reports. Many lines live under one account.
- **Per client it's just env:** set the **same `SMSIR_API_KEY`** in every client's Coolify app; only
  `SMSIR_LINE` differs if you went per-client. No code change.
- **Billing:** one account = one shared credit pool → charge each client a flat fee incl. an SMS
  allowance and keep credit topped up, or use per-client lines (easy per-line reports). At scale,
  SMS.ir's reseller/نمایندگی panel gives a sub-account per client.

**Email (Resend) is optional** — set it up only to also email patients who provide an address:
- **Demo:** reuse the verified **ainoor.io** sender — set `MAIL_FROM="Dr X <booking@ainoor.io>"`.
  (Resend free tier = **1 verified domain**.)
- **Client's own domain:** verify it in Resend, add the DNS records at the registrar:
  - DKIM: `resend._domainkey` TXT — value **must start with `p=`**.
  - Two sending CNAMEs: `rsend → rsend-euw1.forge.rmta.net`, `send → send.forge.rmta.net`.
  - `_dmarc` TXT.
  Then set `MAIL_FROM` to that domain (no code change). Verify at the authoritative nameserver,
  not 1.1.1.1 (caches up to the TTL).

## Step 6 — env vars (Coolify)

**Required for core function**
| Var | Purpose |
|---|---|
| `PUBLIC_BASE_URL` | e.g. `https://sub.ainoor.io` — builds the patient's cancel link (in the SMS) |
| `SMSIR_API_KEY` | patient SMS (primary channel) |
| `SMSIR_LINE` | SMS.ir line number; dedicated line recommended for links |

**Optional email (only to also email patients who gave an address)**
| `RESEND_API_KEY` | patient emails |
| `MAIL_FROM` | `Dr X <booking@domain>` |
| `MAIL_REPLY_TO` | reply address |

**Bots (at least one channel)** — see the **clinic-bot-onboarding** skill for how to get the chat IDs
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_STAFF_CHAT_ID` | Telegram alerts + Confirm/Decline |
| `BALE_BOT_TOKEN` + `BALE_STAFF_CHAT_ID` | Bale (Iran default) |

**Online visits + prepayment** (only if offering online visits)
| `CLINIC_WHATSAPP` | doctor's WhatsApp, e.g. `+98912…` |
| `CLINIC_CARD` | card number shown for card-to-card prepay |
| `CLINIC_CARD_NAME` | card-holder name |
| `ONLINE_FEE` | display string, e.g. `۳۰۰٬۰۰۰ تومان` |

**AI chatbot**
| `ANTHROPIC_API_KEY` | enables real Claude replies (else rule-based fallback) |
| `CHAT_MODEL` | optional; default `claude-haiku-4-5` (fast/cheap). `claude-opus-5-5` for more capability |

**Set by Dockerfile (don't override unless needed):** `PORT=3000`, `DATA_DIR=/app/data`.

Any env change needs a **Redeploy** to take effect.

## Step 7 — connect the bots

Run the **clinic-bot-onboarding** skill: get the staff chat ID (person or shared group, with the
invite-link trick for non-contacts), set the `*_STAFF_CHAT_ID` var, and send the Persian
instructions. Bale is the reliable default inside Iran.

## Step 8 — go-live verification

After the final Redeploy, check:
- [ ] `https://<domain>/` loads and redirects to the Persian page.
- [ ] `curl /api/config` shows the right fee/card (online visits).
- [ ] `curl -X POST /api/chat` returns `{"ok":true,...}` (chatbot key works).
- [ ] Submit a **test booking** (no email — it's optional) → patient **SMS** arrives AND the ✅/❌ card reaches the staff chat.
- [ ] Tap ✅ → confirmation **SMS with the cancel link** arrives; tapping the link cancels and reopens the slot.
- [ ] Online booking shows the payment panel and requires the tracking code.
- [ ] Mobile layout is clean (resize 375px, both languages).
- [ ] Clear any test rows: in Coolify Terminal `rm /app/data/bookings.json` (and `blocks.json`).

## Step 9 — handover

- Give the client the **Persian bot instructions** (from clinic-bot-onboarding).
- Explain how they confirm/decline and manage days off (bot commands / blocked dates).
- Note what's demo vs. their own (domain, email sender) and the plan to migrate later.

---

## Gotchas (learned the slow way)

- **Dockerfile strategy, not Railpack** — Railpack fails (no package.json).
- **No `/app/data` volume = lost bookings** on every redeploy.
- **Public repo → no auto-deploy;** redeploy manually or wire the webhook.
- **DKIM must start with `p=`;** verify DNS at the authoritative NS, not a cached resolver.
- **Bale bot ≠ Telegram bot** (separate tokens + usernames); **Bale is the Iran default**.
- **SMS.ir:** dashboard is reachable from outside Iran (so the agency self-manages); account needs an Iranian national ID + mobile + Rial payment. Links need a **dedicated line** (+ credit) or they're filtered.
- **National ID (کد ملی)** has a real checksum — a wrong digit is correctly rejected; that's not a bug.
- **Every env change requires Redeploy.**
- Keep `index.html` and `fa.html` **in sync** (schedule, services, name, design).
- Never commit/print `.env`, bot tokens, API keys, or `bookings.json` (PII).
