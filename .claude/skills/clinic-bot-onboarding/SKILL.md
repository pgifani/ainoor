---
name: clinic-bot-onboarding
description: Connect a clinic's staff to the booking bots (Telegram and/or Bale) so they receive new bookings and can tap Confirm/Decline. Use this when onboarding a new doctor/customer, when someone can't see bookings, or when asked how the doctor/receptionist gets access to the bot. Produces the right chat-ID steps, the Coolify env vars, and a ready-to-send Persian message.
---

# Clinic booking-bot onboarding

Use this to hook a clinic's staff (the doctor, a receptionist, or a shared group) up to the
booking bots built into `server.mjs`, so every website booking reaches them with
**✅ تأیید / ❌ رد** buttons.

## How the routing actually works (facts to rely on)

- Each channel sends every new booking to **one configured "staff chat"**:
  - Telegram → env `TELEGRAM_BOT_TOKEN` + `TELEGRAM_STAFF_CHAT_ID`
  - Bale → env `BALE_BOT_TOKEN` + `BALE_STAFF_CHAT_ID`
- **Telegram and Bale are two separate bots**, each created in its own BotFather, each with its
  own token AND its own @username. A username from one is NOT valid on the other.
- Only the configured staff chat can tap the buttons or use the list commands
  (`/bookings`, `/pending`, `/today`) — gated for patient privacy.
- `/id`, `/start`, `/help` all reply with the current **chat ID** plus the command list.
  This is how you discover any chat ID — DM or group.
- A bot **cannot message a person first.** The person must open the bot and press **Start**
  once before it can send them anything.
- The staff chat ID can be a **person's ID** (positive number) OR a **group ID**
  (negative, often `-100…`). A group ID means every member sees bookings and any member can
  confirm/decline.
- Changing who receives bookings is **env-only** — no code change. Set the env var in Coolify,
  then **Redeploy**.

## Step 0 — pick the model

Ask / decide which fits the customer:

- **Shared group (recommended default):** doctor + receptionist + you all see bookings; anyone
  can confirm. Uses a group chat ID.
- **Single person:** bookings go to one phone (e.g. the doctor alone). Uses that person's chat ID.

And which channel(s): **Bale is the reliable default for clinics inside Iran** (Telegram is often
filtered there). Telegram is a good secondary / your-own backup. Set up whichever they'll use —
you can leave the other token unset.

## Step 1 — confirm the real bot usernames

Never assume the username. Get it from the customer or read it:
- Open the bot chat → tap its name at the top → copy the `@…` line, **or**
- BotFather (`@botfather` on Telegram; Bale's own `@botfather` inside Bale) → `/mybots`.

Remember: get the **Bale** username from Bale, the **Telegram** username from Telegram.

## Step 2 — get the chat ID

### A) Shared group
1. New group → add the bot (it's in the chat list; no need to type the username).
   (Telegram/Bale let you create a group with just the bot as the first member.)
2. Add the staff. **If they're not a mutual contact**, use an **invite link**:
   group name → Add Members → *Invite to Group via Link* → Copy Link → send it to them over
   WhatsApp/Bale/SMS/email. A link works for anyone; no mutual-contact needed.
3. In the group send **`/id`** → bot replies with the group ID (negative number).
   - No reply in a Telegram group? BotFather → `/setprivacy` → the bot → **Disable**, retry.

### B) Single person
1. They search the bot by its `@username`, open it, press **Start**.
2. They send **`/id`** → bot replies with their personal chat ID.
3. They send that number back.

## Step 3 — set env + redeploy (Coolify)

Put the number in the matching var, then **Redeploy**:

| Channel | Token var | Staff-chat var |
|---|---|---|
| Telegram | `TELEGRAM_BOT_TOKEN` | `TELEGRAM_STAFF_CHAT_ID` |
| Bale | `BALE_BOT_TOKEN` | `BALE_STAFF_CHAT_ID` |

## Step 4 — verify

After redeploy, submit a test booking on the site (or have them send `/pending`). A card with
✅/❌ should arrive in the staff chat, and tapping a button should update the booking.

---

## Ready-to-send Persian templates

Fill the `{{…}}` placeholders. Swap تلگرام↔بله and the app name per channel.

### Single person — Telegram
```
سلام دکتر 🌸

برای اینکه نوبت‌های ثبت‌شده در سایت را مستقیم در تلگرام دریافت کنید و بتوانید هر نوبت را تأیید یا رد کنید، لطفاً این مراحل را انجام دهید:

۱. در تلگرام این ربات را جست‌وجو کنید:
{{@bot_username}} (با نام «{{bot_display_name}}»)

۲. وارد ربات شوید و روی دکمه‌ی Start (شروع) بزنید.

۳. در همان چت این دستور را بفرستید:
‎/id

۴. ربات یک شماره برایتان می‌فرستد. لطفاً آن شماره را برای من بفرستید.

همین! بعد از آن، هر نوبت جدید با دکمه‌های ✅ تأیید و ❌ رد همین‌جا به دستتان می‌رسد. 🙏
```

### Single person — Bale
```
سلام دکتر 🌸

برای اینکه نوبت‌های ثبت‌شده در سایت را مستقیم در بله (Bale) دریافت کنید و بتوانید هر نوبت را تأیید یا رد کنید، لطفاً این مراحل را انجام دهید:

۱. در اپ بله این ربات را جست‌وجو کنید:
{{@bale_bot_username}} (با نام «{{bot_display_name}}»)

۲. وارد ربات شوید و روی دکمه‌ی شروع (Start) بزنید.

۳. در همان چت این دستور را بفرستید:
‎/id

۴. ربات یک شماره برایتان می‌فرستد. لطفاً آن شماره را برای من بفرستید.

همین! بعد از آن، هر نوبت جدید با دکمه‌های ✅ تأیید و ❌ رد همین‌جا به دستتان می‌رسد. 🙏
```

### Shared group — invite link (person is not a contact)
```
سلام دکتر 🌸

برای دریافت نوبت‌های سایت، لطفاً با این لینک وارد گروه «{{group_name}}» شوید:
{{invite_link}}

بعد از ورود، داخل گروه فقط این دستور را بفرستید:
‎/id

نوبت‌های جدید همین‌جا در گروه با دکمه‌های ✅ تأیید و ❌ رد نمایش داده می‌شوند و شما می‌توانید هر کدام را تأیید یا رد کنید. 🙏
```

---

## Gotchas (don't skip)

- **Wrong-app username** — the #1 mistake. The Bale bot ≠ the Telegram bot; confirm each separately.
- **Right env var** — the group/person ID goes in that channel's `*_STAFF_CHAT_ID` only.
- **Press Start first** — a DM won't deliver until the person has started the bot.
- **Not a contact?** → invite link, never "add member".
- **Group `/id` silent on Telegram** → disable BotFather privacy mode.
- **Always Redeploy** in Coolify after changing env; nothing takes effect until then.
- See the memory note `ainoor-vps-deployment` for the full per-client infra (Coolify, Dockerfile, data volume, Resend, etc.).
