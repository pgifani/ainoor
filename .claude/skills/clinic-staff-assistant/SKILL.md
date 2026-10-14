---
name: clinic-staff-assistant
description: Enable, explain, test and troubleshoot the conversational staff assistant in a clinic's Telegram/Bale bot — staff talk to it (text or Persian voice notes) to update patient-facing answers, weekly hours, days off/blocked times, visit prices, the website announcement banner, phone/WhatsApp, pronunciations, and to ask about appointments. Use when onboarding a clinic's staff to the assistant, when "the bot doesn't answer", when a change "didn't happen", or when extending what staff can change.
---

# Staff assistant (Telegram/Bale) — Ainoor clinic sites

The doctor and staff chat with the clinic bot like a secretary. Claude (tools + guardrails) reads/changes the
clinic's data; every change is shown **old → new**, needs a clear **«آره»**, gets a ✅ receipt and an **↩️ undo** button.
Changes reach the **website**, the **website chatbot** and the **voice agent** immediately (voice agent: next call, ≤60 s cache).

All code lives in the clinic site's `server.mjs` (template repo `pgifani/dr-foroogh-hashemi`). Doctor-facing Persian guide:
`../clinic-bot-onboarding/staff-assistant-guide.fa.md`. Bot basics (tokens, chat IDs, ✅/❌ bookings): **clinic-bot-onboarding**.

## What staff can do
| Area | Examples (Persian) | Stored in (`DATA_DIR`) |
|---|---|---|
| Patient-facing answers ("knowledge") | «دستیار، برای چکاپ کارت واکسن بیارن» · «چی‌ها رو بلدی؟» · «اون جمله رو پاک کن» | `knowledge.json` (facts) |
| Weekly working hours | «از این به بعد پنجشنبه‌ها ۴ تا ۷» | `schedule.json` |
| Days off / blocked times | «فردا رو ببند» · «چهارشنبه ۳ تا ۴ رو ببند» · «۲۲ مهر رو باز کن» | `blocks.json` |
| Appointments (read-only) | «امروز کیا نوبت دارن؟» · «کدوم‌ها تأیید نشدن؟» | `bookings.json` |
| Visit prices (in-person / online voice / online text) | «حضوری ۴۵۰، آنلاین صوتی ۳۵۰، متنی ۲۵۰» | `settings.json` |
| Announcement banner (fa + auto en) | «یه اطلاعیه بذار: دکتر ۱ تا ۱۰ آبان مرخصی‌اند» · «اطلاعیه رو بردار» | `settings.json` |
| Clinic phone / WhatsApp | «شماره واتس‌اپ جدید ۰۹۱۲…» | `settings.json` |
| Voice pronunciation (+ STT key terms) | «بگو هاشِمی» or `/say هاشمی = هاشِمی` | `knowledge.json` (say) |

**Never changeable from chat:** the payment **card number** (`CLINIC_CARD` env; the assistant explains it's set in Coolify).
**Never saved:** medical / medication / dosing instructions (stripped with a warning). Closing a day does **not** cancel its bookings —
the assistant names the booked patients so staff call them and cancel with the 🚫 button.

Commands still work too: `/learn` (text, or `/learn` then a voice note), `/knowledge`, `/forget n`, `/say w = p`, `/unsay w`, `/teach`,
`/availability`, `/off`, `/on 1405/07/22`, `/block`, `/unblock`, `/blocked`, `/bookings`, `/pending`, `/today`, `/id`.

## Where it answers (addressing rules)
- **Private chat** with the bot (the staff chat ID is a person, positive number): every text/voice message goes to the assistant.
- **Group** (staff chat ID is the group, negative `-100…`) — answers only when:
  1. the message **starts with «دستیار»** (also «سلام دستیار…», «خب دستیار…», «ربات», «بات») — typed **or spoken** in a voice note, or
  2. it's a **Reply** to the bot, or **@mentions** the bot, or
  3. it's from the **same person within 3 minutes** after the bot answered them (the follow-up window — people answer «بله»
     without tapping Reply; if such a message is clearly chat between staff the model replies `SKIP` and the bot stays silent).
  Other staff chatter is ignored. Commands accept `/cmd@botname`.
- **Telegram groups need Group Privacy OFF** (@BotFather → Bot Settings → Group Privacy → Turn off, then **remove and re-add** the bot),
  otherwise Telegram never delivers non-reply messages / voice notes to the bot. Bale may refuse bots in groups → use private chats.

## Setup (per clinic, website app in Coolify)
| Env | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | the assistant (also the website chatbot) |
| `ELEVENLABS_API_KEY` | transcribing voice notes (Scribe v2, key needs Speech-to-Text) — **the website app needs its own copy** |
| `TELEGRAM_STAFF_CHAT_ID` / `BALE_STAFF_CHAT_ID` | person or **group** ID (from `/id` sent *in that chat*; groups are negative — keep the minus, no quotes) |
| `STAFF_MODEL` (opt.) | default `claude-sonnet-5-5`, effort medium |
| `KNOWLEDGE_MODEL` (opt.) | default `claude-sonnet-5-5` (cleans `/learn` text into facts) |
| `ONLINE_FEE` (opt.) | fallback online price until staff set prices |
| `CLINIC_WHATSAPP` (opt.) | initial WhatsApp; afterwards `settings.json` wins |
| `ELEVENLABS_VOICE_ID` / `STAFF_VOICE_ID` | **only if the customer wants voice-note replies** (voice in → voice out, OGG/Opus, text as caption). Leave unset for text replies (first customer chose text) |

Then **Deploy** (purple button). Verify with **`GET https://<site>/api/status`** (yes/no only, no secrets):
`staffAssistant`, `voiceNotes`, `voiceReplies`, and per channel `staffChatSet`, `staffChatIsGroup`, `groupPrivacyOff`, `bot`.

## Troubleshooting (all happened with the first clinic)
| Symptom | Cause → fix |
|---|---|
| Bot answers `/help` but ignores everything else in the group | staff chat ID isn't this group (`staffChatIsGroup:false`) → `/id` in the group, set the negative ID, Deploy |
| Voice notes ignored silently | `voiceNotes:false` (website lacks `ELEVENLABS_API_KEY`) — the bot now says so once/hour; or Group Privacy on; or note didn't start with «دستیار» / wasn't a reply |
| "I said open 22 Mehr but nothing happened" | staff answered the bot's question as a plain message before the follow-up window existed → now handled; otherwise Reply «آره» or `/on 1405/07/22` |
| One grey tick on Telegram | normal — bots never show "read" |
| Undo refused | something changed in that store after it (versioned undo); fix by asking the assistant |
| Phone agent still says old info | it loads knowledge at call start (≤60 s cache) — new call |

## How it's built (for extending)
- `staffAssistant()` keeps one conversation per chat (reset after 2 h idle or >60 messages — never trimmed mid-way),
  calls Claude with `STAFF_TOOLS`; `runStaffTool()` executes; `change(store,label,fn)` snapshots the store for undo
  (`undo:<id>` buttons, refused if `storeVersion` moved). Tools return phone numbers/times **pre-converted to Persian digits**
  (the model mis-copied digits when converting itself).
- Hours: `schedule.hours` (decimal hours, `getUTCDay` keys) drives `/api/slots`, strict booking, `/api/availability`
  (`hours` + generated `hoursText` fa/en for the pages), both prompts (`hoursSentence()`).
- Site settings: `settings.json` → `/api/config` (`fees` per type fa/en, `announcement`, `contact`) → pages fill `#siteNotice`,
  `#feeNote`, `#payFee`, every `[data-contact]` and the chatbot's `CLINIC` links; `clinicInfo()` fills `{{CONTACT}}/{{FEES}}` in prompts.
- To add a new editable thing: store field → tool in `STAFF_TOOLS` + case in `runStaffTool` using `change()` → expose via
  `/api/config` and/or `knowledgePayload()` → page hook. Add a line to `STAFF_SYSTEM` describing it.

## Testing without a real bot
`scripts/mock-bot-api.mjs` (this folder) is a fake Telegram/Bale Bot API on :3999 (getUpdates, sendMessage, sendVoice multipart,
getFile/voice files, getMe). Run the site with `BALE_API_BASE=http://localhost:3999 BALE_BOT_TOKEN=test BALE_STAFF_CHAT_ID=-100555`
plus real `ANTHROPIC_API_KEY`/`ELEVENLABS_API_KEY` and a scratch `DATA_DIR`; push updates with `POST /_push {message:{…}}`,
read replies from `GET /_sent`. Env for the mock: `VOICE_DIR` (folder of `<file_id>.mp3` voice notes), `VOICE_OUT` (saves bot voice replies).
