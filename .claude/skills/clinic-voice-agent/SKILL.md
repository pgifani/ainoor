---
name: clinic-voice-agent
description: Set up, customize, deploy and tune the Persian AI voice receptionist (web "call" page that books appointments by voice) for a clinic on the Ainoor stack. Use when a customer wants a voice/phone receptionist, when cloning the voice agent for a new doctor, when the agent mishears numbers, sounds slow or foreign, or when asked about phone-line options in Iran. Requires the clinic site (clinic-site-launch) to be live first.
---

# Persian voice receptionist (Ainoor)

A web page where a parent taps a big button and **talks in Persian**; the agent finds a free time, collects
the child's name, national ID and mobile **by voice** (with natural read-back), and books through the clinic
site's existing API — so voice bookings get the same SMS + staff ✅/❌ as web bookings (tagged `📞 Voice agent`).

- Template repo: **`pgifani/dr-hashemi-voice-agent`** (zero-dependency Node, Dockerfile, port **3100**).
- First live instance: `https://voice.ainoor.io/?k=<ACCESS_CODE>` for Dr. Hashemi (booking via `https://demo.ainoor.io`).
- Full project history/decisions: memory note `voice-agent-booking`.

```
phone browser ─ mic, one utterance per POST /api/turn ─▶ voice agent (Node, Coolify)
                                                          ├─ STT  ElevenLabs Scribe v2 (language fas, key terms)
                                                          ├─ numbers.mjs  spoken Persian numbers → exact digits
                                                          ├─ brain Claude Sonnet 5.5 + tools: get_open_slots, book_appointment, end_call
                                                          └─ TTS  ElevenLabs Eleven v4 turbo, streamed (GET /api/tts/<id>)
                                                               │ server-to-server
                                                               ▼
                         clinic site: GET /api/slots · POST /api/book (strict) · GET /api/knowledge
```

**Iran constraint (why it's built this way):** ElevenLabs, Anthropic, Twilio/Vapi/Retell and WhatsApp
Calling all block or exclude Iran, so the patient's browser only ever talks to *our* VPS (UK); every AI call is
server-side. Serving Iranian end-users via US APIs is a terms risk the customer accepts (same as the chatbot).

## Prerequisites on the clinic site (website `server.mjs`)
The site must be a version that has (all in the current template):
- `GET /api/slots` (open slots, Tehran time), `POST /api/book` accepting `strict:true` (409 on taken/closed) and `source:"voice"`.
- `GET /api/knowledge` → staff-taught facts, `/say` pronunciations, plus `hours`, `contact`, `fees`, `notice` sentences
  (so hours, prices, phone/WhatsApp and the banner the staff set in the bot reach the phone agent automatically).
Check: `curl https://<site>/api/slots` and `/api/knowledge` return JSON.

## Step 1 — repo & per-clinic edits
Clone `pgifani/dr-hashemi-voice-agent` into a new per-client repo, then edit:

| What | Where |
|---|---|
| Greeting (spoken first; keep it short — a 10 s greeting made calls feel slow) | `agent.mjs` → `GREETING` |
| Clinic identity in the prompt (doctor, specialty, city, "callers are usually parents…") | `agent.mjs` → top of `SYSTEM` |
| Static clinic facts (address, services, online-visit rule) | `agent.mjs` → `CLINIC_INFO` (keep `{{HOURS}}`, `{{CONTACT}}`, `{{FEES}}` placeholders — they're filled live from the site) |
| Words the recognizer should expect (doctor's surname, district, city) | `server.mjs` → `BASE_TERMS` |
| Page header text (doctor name, specialty/city) and `<title>` | `public/index.html` |

Everything else (hours, prices, phone/WhatsApp, banner, facts, pronunciations) comes from the site at call time.

## Step 2 — Coolify + domain
1. DNS (Hostinger): A record `voice` (or `voice-<clinic>`) → `187.7.29.221`. HTTPS is mandatory (browsers block the mic on http).
2. Coolify → same project as the clinic site → **+ New Resource → Public Repository** → branch `main` →
   **Build pack: Dockerfile** → Ports exposes **3100** (the "Exposed ports 3000" box in *Internal access* is read-only; ignore it; leave Port mappings empty).
3. Domains: `https://voice.<domain>`; delete a `www.voice…` row if Coolify adds one (DNS mismatch → cert failures).
4. Env vars (Step 3), then the purple **Deploy** button ("Restart" keeps old code).

## Step 3 — env vars
| Var | Value / notes |
|---|---|
| `ANTHROPIC_API_KEY` | brain |
| `VOICE_MODEL` | `claude-sonnet-5-5` (tested best: ~2 s/reply, natural Persian). Opus 5.5 = 2–12 s; Haiku 4.5 = weaker Persian |
| `VOICE_EFFORT` | `low` |
| `ELEVENLABS_API_KEY` | key permissions: **Text to Speech = Access, Speech to Text = Access (easy to forget!), Voices = Read**; everything else No Access; optional credit cap |
| `ELEVENLABS_VOICE_ID` | the voice (see Step 4) |
| `TTS_MODEL` | `eleven_v4_turbo` (fastest Persian-capable, ~1.4 s). `eleven_v3` also works. **Flash/Turbo v2.5 do NOT speak Persian** |
| `STT_MODEL` / `STT_LANGUAGE` | `scribe_v2` / `fas` |
| `BOOKING_API_BASE` | the clinic site URL, e.g. `https://demo.ainoor.io` (bookings are REAL: SMS + staff messages) |
| `ACCESS_CODE` | random code while testing → only `https://voice…/?k=<code>` can start calls (stops strangers spending credit). Remove for public launch |

## Step 4 — voice (ElevenLabs)
- **Free plan cannot use Voice Library voices via the API** (402 `paid_plan_required`) and has **no commercial licence** —
  fine for testing with a premade voice (e.g. "Sarah" `EXAVITQu4vr4xnSDxMaL`), but a clinic needs a paid plan.
  Starter (~$6/mo, 30k credits ≈ 30 booking calls at ~1,000 chars/call) unlocks library voices + commercial use; Creator (~$22) ≈ 120 calls.
- Native **Persian** library voices (filter Language: Persian): **Roya** (warm Tehrani narrator, `ndcUYGFbbd96WXiZVVaQ` — top pick for a children's clinic),
  Niloofar & Setareh (Tehrani), Farideh (Isfahani), plus male Kaveh/Kourosh/Hooman. Add to "My voices", copy the ID.
  A voice with a Persian *name* may be tagged English (e.g. "Nazy Entezari" = en-CA) → foreign accent.
- Free native alternative researched (not built): **Azure Speech F0** — fa-IR **Dilara**/Farid, 500k chars/month free, commercial OK.

## Step 5 — verify
Use Node, not curl, for Persian text on Windows (Git-Bash curl turns Persian into `???` → the agent "doesn't understand").
- `GET /healthz` 200; `POST /api/start` without `?k=` → `{"error":"access"}`; with it → greeting + `audio`.
- A typed turn: `POST /api/turn?sid=…` JSON `{"text":"سلام، ساعت کاری مطب چیه؟"}` → reply uses the site's live hours; response has `audioUrl`, `timing`.
- `/?debug=1` gives a typed chat on the page (or automatic when no ElevenLabs key).
- Then a real phone call (Android Chrome / iPhone Safari): full booking, numbers said the Iranian way, a medical question (must refuse + 115).

## How it works / tuning lessons (keep these)
- **Numbers:** Iranians say numbers in groups («صفر نهصد و دوازده، سیصد و چهل و پنج…»), STT drops the pauses.
  `numbers.mjs` converts spoken Persian number words to exact digits in code («و» joins inside a group; otherwise a new group),
  checks mobile format + national-ID checksum, and builds a natural grouped read-back; the model gets it as a
  `[Number parser …]` note. Never let the model convert long numbers itself (it drops/adds digits).
- **End of turn:** silence **1.0 s** (2 s right after the agent asks for a number). 0.8 s cut people off mid-sentence → "please repeat" loops.
- **Latency:** streamed TTS (synthesis starts when the reply text exists; page plays `/api/tts/<id>` while it downloads) saved ~0.6–1.7 s/reply;
  fixed phrases (greeting, "didn't catch that", error) are cached. Typical reply ≈ 3–5 s total (hear ~0.5 s, think ~1.5–4 s, first audio ~0.15 s).
- **Pronunciation & recognition:** staff `/say word = pronunciation` (bot) → applied to whole words before TTS and sent as STT `keyterms`
  (repeated form fields; a JSON array → 400).
- **Goodbye:** when the model calls `end_call`, the call ends without another model turn (otherwise it narrates "I ended the call").
- **Safety:** ≤3 bookings/call (siblings), 40 turns, per-IP limits; `book_appointment` needs `caller_confirmed` + valid checksum; site rejects bad slots (409).
- **Privacy:** transcripts in memory only (20 min), logs carry tool names only.

## Phone line later (Iran)
International telephony can't serve Iranian numbers. Options: an **Iranian AI phone provider** (e.g. Poshtyar — 021 numbers, custom tools,
Asterisk/Issabel; ~9.9M toman/yr base) calling our booking API, or **Iranian SIP trunk** (Asiatech/Telina/Shatel/Nexfon) → Asterisk
**AudioSocket** (8 kHz PCM over TCP) → this same brain. Clinic forwards its line on busy/no-answer. Iranian STT/TTS (Nevisa, iotype, Avasho)
can replace ElevenLabs inside `speech.mjs` only.
