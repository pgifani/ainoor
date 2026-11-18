// Templates 1–5: pediatrics, dentistry, gynecology, dermatology, ophthalmology.
// All names, numbers and addresses are fictional demo content.
import { esc, icon, img } from "./build.mjs";

const btns = (a, b) => `<div class="hero-cta"><a class="btn" href="#booking">${esc(a)}</a>${b ? `<a class="btn ghost" href="${b[1]}">${esc(b[0])}</a>` : ""}</div>`;

export default [
/* ============ 1. Pediatrics — «شکوفه» ============ */
{
  slug: "pediatrics", name: "شکوفه", specialtyLabel: "کودکان و نوزادان", look: "شاد و گرم؛ آبی آسمانی و نارنجی",
  features: ["جدول واکسن‌ها بر اساس سن", "نوبت فوری همان روز برای کودک بیمار", "نوبت آنلاین"],
  doctor: "دکتر مریم کیانی", title: "متخصص کودکان و نوزادان", mark: "م",
  tagline: "از اولین واکسن تا اولین روز مدرسه، کنار کودک شما.",
  fonts: { google: "family=Baloo+Bhaijaan+2:wght@600;800&family=Vazirmatn:wght@400;500;700", display: "'Baloo Bhaijaan 2',Vazirmatn,sans-serif", body: "Vazirmatn,sans-serif", displayWeight: 800 },
  colors: { bg: "#F2F9FF", surface: "#FFFFFF", ink: "#1E3557", muted: "#566B8A", primary: "#F2643F", primaryDeep: "#D9502D", accent: "#FFC93C", line: "#DCE9F7", lineStrong: "#C3D6EC" },
  vars: "--card-radius:26px;--img-radius:32px;--mint:#6FD3B8;",
  hero: (s) => `<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text"><p class="hero-kicker">${icon("baby")} مطب کودکان، تهران</p><h1>از اولین واکسن تا اولین روز مدرسه، کنار کودک شما هستیم.</h1>
    <p class="lead">معاینه‌ی آرام و با حوصله، کنترل رشد و واکسن‌ها، و اگر کودکتان بیمار شد، نوبت همان روز.</p>
    ${btns("نوبت بگیرید", ["برنامه‌ی واکسن", "#vaccines"])}</div>
  <div class="hero-art"><div class="blob"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></div>
    <span class="sticker st1">${icon("sun")} نوبت فوری برای کودک بیمار</span><span class="sticker st2">${icon("heart")} مشاوره‌ی شیردهی</span></div>
</div></section>`,
  css: `.t-pediatrics .hero{padding:48px 0 72px;overflow:hidden}
.t-pediatrics .hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:40px;align-items:center}
.t-pediatrics .hero-kicker{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1px solid var(--line);padding:6px 14px;border-radius:999px;font-weight:600;color:var(--muted);margin-bottom:18px}
.t-pediatrics .hero-kicker .ic{color:var(--primary);width:20px;height:20px}
.t-pediatrics .lead{font-size:1.12rem;color:var(--muted);margin:18px 0 28px;max-width:52ch}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px}
.t-pediatrics .hero-art{position:relative;padding:24px}
.t-pediatrics .hero-art::before{content:"";position:absolute;inset:6% 2% 10% 14%;background:var(--accent);border-radius:46% 54% 60% 40%/50% 42% 58% 50%}
.t-pediatrics .blob{position:relative;border-radius:58% 42% 52% 48%/46% 54% 46% 54%;overflow:hidden;aspect-ratio:4/5;border:8px solid #fff}
.t-pediatrics .blob img{width:100%;height:100%;object-fit:cover}
.t-pediatrics .sticker{position:absolute;display:inline-flex;gap:8px;align-items:center;background:#fff;padding:10px 16px;border-radius:18px;font-weight:700;font-size:.92rem;box-shadow:0 8px 24px rgba(30,53,87,.12)}
.t-pediatrics .sticker .ic{width:20px;height:20px;color:var(--primary)}
.t-pediatrics .st1{inset-inline-start:-4%;top:14%;transform:rotate(-4deg)}
.t-pediatrics .st2{inset-inline-end:2%;bottom:8%;transform:rotate(3deg)}
@media (max-width:860px){.t-pediatrics .hero-grid{grid-template-columns:1fr}.t-pediatrics .hero-art{max-width:420px;margin-inline:auto}}
.t-pediatrics .svc-cards article:nth-child(4n+1) .ic{color:var(--primary)}
.t-pediatrics .svc-cards article:nth-child(4n+2) .ic{color:#E0A300}
.t-pediatrics .svc-cards article:nth-child(4n+3) .ic{color:#2FAE8E}
.t-pediatrics .svc-cards article:nth-child(4n) .ic{color:#5B7BD5}
.t-pediatrics #services{background:#fff;border-block:1px solid var(--line)}`,
  alts: { hero: "پزشک کودکان در حال معاینه‌ی یک کودک خندان", clinic: "اتاق معاینه‌ی رنگارنگ مطب کودکان", detail: "گوشه‌ی بازی در اتاق انتظار" },
  about: { title: "درباره‌ی دکتر کیانی", text: "دکتر مریم کیانی بیش از دوازده سال است که نوزادان و کودکان را درمان می‌کند. معاینه‌ها با حوصله انجام می‌شود و به همه‌ی سؤال‌های پدر و مادرها جواب داده می‌شود.", creds: ["بورد تخصصی کودکان و نوزادان", "عضو انجمن پزشکان کودکان ایران", "دوره‌ی تکمیلی مشاوره‌ی شیردهی و تغذیه‌ی کودک"] },
  servicesTitle: "خدمات مطب", servicesIntro: "از روزهای اول تولد تا ۱۸ سالگی.",
  services: [
    { icon: "baby", t: "مراقبت نوزاد", d: "معاینه‌ی روزهای اول، زردی نوزاد و پیگیری وزن‌گیری." },
    { icon: "ruler", t: "کنترل رشد کودک", d: "کنترل قد و وزن، و بررسی رشد ذهنی و حرکتی کودک در هر سن." },
    { icon: "shield", t: "واکسیناسیون", d: "تزریق واکسن‌ها طبق برنامه‌ی کشوری و یادآوری نوبت بعدی." },
    { icon: "drop", t: "تغذیه و شیردهی", d: "مشاوره‌ی شیر مادر، شروع غذای کمکی و کم‌اشتهایی." },
    { icon: "steth", t: "بیماری‌های عفونی", d: "سرماخوردگی، تب، گوش‌درد و عفونت‌های شایع کودکان." },
    { icon: "leaf", t: "آلرژی و آسم", d: "اگزما، حساسیت غذایی و خس‌خس سینه." },
  ],
  sections: [{ id: "vaccines", html: (s) => `<section class="sec" id="vaccines"><div class="wrap vx">
    <div><div class="sec-head"><h2>برنامه‌ی واکسن، به ترتیب سن</h2><p>نوبت واکسن بعدی را از همین‌جا ببینید. در هر مراجعه، پزشک برنامه را با شما مرور می‌کند.</p></div>
    <ol class="vx-rail">${[["بدو تولد", "ب.ث.ژ، هپاتیت ب، فلج اطفال"], ["۲ ماهگی", "پنتاوالان، فلج اطفال"], ["۴ ماهگی", "پنتاوالان، فلج اطفال"], ["۶ ماهگی", "پنتاوالان، فلج اطفال"], ["۱۲ ماهگی", "ام‌ام‌آر"], ["۱۸ ماهگی", "سه‌گانه، فلج اطفال، ام‌ام‌آر"], ["۶ سالگی", "سه‌گانه، فلج اطفال"]].map(([a, v]) => `<li><b>${a}</b><span>${v}</span></li>`).join("")}</ol></div>
    <figure class="vx-img"><img src="${img(s, "detail")}" alt="${esc(s.alts.detail)}" loading="lazy" width="900" height="900"><figcaption>اتاق انتظار، با گوشه‌ی بازی برای بچه‌ها</figcaption></figure>
  </div></section>`, css: `.t-pediatrics .vx{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.6fr);gap:40px;align-items:start}
.t-pediatrics .vx-rail{list-style:none;margin:0;padding:0;display:grid;gap:0;position:relative}
.t-pediatrics .vx-rail::before{content:"";position:absolute;inset-block:14px;inset-inline-start:13px;border-inline-start:3px dashed var(--line-strong)}
.t-pediatrics .vx-rail li{position:relative;display:grid;grid-template-columns:130px 1fr;gap:16px;padding:14px 0 14px 0;padding-inline-start:44px}
.t-pediatrics .vx-rail li::before{content:"";position:absolute;inset-inline-start:4px;top:20px;width:21px;height:21px;border-radius:50%;background:var(--accent);border:4px solid #fff;box-shadow:0 0 0 2px var(--accent)}
.t-pediatrics .vx-rail li:nth-child(odd)::before{background:var(--primary);box-shadow:0 0 0 2px var(--primary)}
.t-pediatrics .vx-rail b{font-family:var(--font-display);font-size:1.1rem}
.t-pediatrics .vx-img img{border-radius:28px;aspect-ratio:1;object-fit:cover}
.t-pediatrics .vx-img figcaption{color:var(--muted);font-size:.9rem;margin-top:10px}
@media (max-width:860px){.t-pediatrics .vx{grid-template-columns:1fr}.t-pediatrics .vx-rail li{grid-template-columns:1fr;gap:2px}}` }],
  navExtra: [["#vaccines", "واکسن"]],
  hours: [16, 20], closedDays: [6], slotMinutes: 15,
  faq: [["کودکم امروز تب دارد؛ می‌توانم همین امروز بیاورمش؟", "بله. هر روز چند نوبت برای کودکان بیمار خالی نگه می‌داریم؛ در بخش نوبت‌دهی، نزدیک‌ترین ساعت را انتخاب کنید."], ["برای واکسن چه چیزی همراه بیاورم؟", "کارت واکسن کودک و اگر داروی خاصی مصرف می‌کند، نام داروها را همراه داشته باشید."], ["کودکان را تا چه سنی ویزیت می‌کنید؟", "از روزهای اول تولد تا ۱۸ سالگی."], ["امکان مشاوره‌ی آنلاین هست؟", "برای پیگیری و سؤال‌های تغذیه بله؛ ولی کودک بیمار باید حضوری معاینه شود."]],
  contact: { address: "تهران، سعادت‌آباد، بلوار پیامبر، ساختمان پزشکان سپید، طبقه‌ی دوم", phone: "۰۲۱-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا پنجشنبه، ۱۶ تا ۲۰" },
  prompts: {
    hero: "Photorealistic portrait photo of a warm, smiling Iranian female pediatrician in her late thirties wearing a light blue headscarf and white coat with a stethoscope, gently holding a toy stethoscope to a laughing toddler sitting on the mother's lap (mother partly out of frame), bright cheerful pediatric clinic with soft sky-blue walls and coral and sunflower-yellow accents, natural window light, shallow depth of field, editorial healthcare photography, no text, no logos",
    clinic: "Photorealistic wide photo of a modern, colorful pediatric examination room in an Iranian clinic, small exam bed with a sky-blue cover, playful wall decals of clouds and hot-air balloons, coral and sunflower-yellow cabinets, toys in a basket, height chart on the wall, bright daylight, clean and welcoming, no people, no text, no logos",
    detail: "Photorealistic photo of a cozy kids' play corner in a clinic waiting room: low wooden table with crayons and picture books, soft rug, small colorful chairs, sky-blue and coral palette, warm daylight, inviting, no people, no text, no logos",
  },
},

/* ============ 2. Dentistry — «لبخند» ============ */
{
  slug: "dentistry", name: "لبخند", specialtyLabel: "دندانپزشکی", look: "تمیز و روشن، سفید و فیروزه‌ای",
  features: ["مقایسه‌ی عکس قبل و بعد", "جدول قیمت خدمات", "بیمه‌های طرف قرارداد"],
  doctor: "دکتر آرش نیک‌نام", title: "متخصص دندانپزشکی ترمیمی و زیبایی", mark: "ن",
  tagline: "لبخند زیبا و سالم، بدون نگرانی.",
  fonts: { google: "family=IBM+Plex+Sans+Arabic:wght@400;500;600;700", display: "'IBM Plex Sans Arabic',sans-serif", body: "'IBM Plex Sans Arabic',sans-serif", displayWeight: 700 },
  colors: { bg: "#FFFFFF", surface: "#F1F8F8", ink: "#0B3440", muted: "#4F6B74", primary: "#0E8784", primaryDeep: "#0A6A67", accent: "#7FDCCB", line: "#DCEBEB", lineStrong: "#BFD9D9" },
  vars: "--card-radius:14px;--img-radius:14px;--btn-radius:12px;--mark-radius:12px;",
  hero: (s) => `<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text"><h1>لبخند زیبا و سالم، بدون نگرانی.</h1>
    <p class="lead">ترمیم، ایمپلنت و زیبایی دندان. قبل از شروع درمان، تعداد جلسه‌ها و هزینه‌ی کار را دقیق به شما می‌گوییم.</p>
    ${btns("نوبت معاینه", ["تعرفه‌ها", "#prices"])}
    <ul class="hero-facts"><li>${icon("check")} عکس رادیولوژی در خود مطب</li><li>${icon("check")} تزریق بی‌حسی بدون درد</li><li>${icon("check")} پرداخت اقساطی</li></ul></div>
  <div class="hero-photo"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000">
    <div class="float-card"><b>جلسه‌ی اول</b><span>معاینه، عکس و طرح درمان مکتوب</span></div></div>
</div></section>`,
  css: `.t-dentistry .hero{padding:40px 0 80px;background:linear-gradient(180deg,var(--surface),#fff 70%)}
.t-dentistry .hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:56px;align-items:center}
.t-dentistry h1{font-size:clamp(2.2rem,1.2rem + 3.8vw,4.1rem);line-height:1.2}
.t-dentistry .lead{font-size:1.1rem;color:var(--muted);margin:20px 0 30px;max-width:50ch}
.t-dentistry .hero-facts{list-style:none;padding:0;margin:32px 0 0;display:flex;flex-wrap:wrap;gap:10px 22px;color:var(--muted);font-weight:500}
.t-dentistry .hero-facts li{display:flex;gap:8px;align-items:center}
.t-dentistry .hero-facts .ic{color:var(--primary);width:20px;height:20px}
.t-dentistry .hero-photo{position:relative}
.t-dentistry .hero-photo img{border-radius:14px;aspect-ratio:4/5;object-fit:cover;width:100%;height:auto;max-height:min(620px,74vh)}
.t-dentistry .float-card{position:absolute;inset-inline-end:-24px;bottom:36px;background:#fff;border-radius:14px;padding:16px 20px;box-shadow:0 18px 40px rgba(11,52,64,.14);border-inline-start:4px solid var(--primary);display:grid;gap:2px;max-width:260px}
.t-dentistry .float-card span{color:var(--muted);font-size:.9rem}
@media (max-width:860px){.t-dentistry .hero-grid{grid-template-columns:1fr}.t-dentistry .float-card{inset-inline-end:12px}}`,
  alts: { hero: "دندانپزشک در کنار یونیت دندانپزشکی مدرن", clinic: "اتاق درمان روشن و تمیز دندانپزشکی", detail: "ابزار دندانپزشکی مرتب روی سینی" },
  about: { title: "درباره‌ی دکتر نیک‌نام", text: "دکتر آرش نیک‌نام پانزده سال است در زمینه‌ی ترمیم و زیبایی دندان کار می‌کند. هر درمان با معاینه‌ی دقیق و طرح درمان مکتوب شروع می‌شود تا از اول بدانید کار چطور پیش می‌رود.", creds: ["دکترای دندانپزشکی و دوره‌ی تکمیلی ایمپلنت", "عضو انجمن دندانپزشکی زیبایی", "استریل کامل ابزار با اتوکلاو کلاس B"] },
  servicesTitle: "درمان‌ها", servicesStyle: "list",
  services: [
    { icon: "tooth", t: "ایمپلنت دندان", d: "جایگزین دندانی که کشیده شده یا از دست رفته است." },
    { icon: "spark", t: "لمینت و کامپوزیت", d: "اصلاح شکل و رنگ دندان‌های جلو." },
    { icon: "sun", t: "بلیچینگ", d: "سفیدکردن دندان در مطب، در یک جلسه." },
    { icon: "shield", t: "عصب‌کشی و ترمیم", d: "درمان ریشه و پرکردن با مواد هم‌رنگ دندان." },
    { icon: "ruler", t: "ارتودنسی نامرئی", d: "مرتب کردن دندان‌ها با قالب‌های شفاف (الاینر)." },
    { icon: "baby", t: "دندانپزشکی کودکان", d: "معاینه، فلوراید تراپی و درمان دندان شیری." },
  ],
  sections: [
    { id: "smile", html: (s) => `<section class="sec" id="smile" style="background:var(--surface)"><div class="wrap ba-wrap">
      <div class="sec-head"><h2>قبل و بعد</h2><p>خط وسط تصویر را به چپ و راست بکشید تا تفاوت را ببینید. در سایت شما، اینجا عکس‌های واقعی بیمارانتان (با رضایت خودشان) قرار می‌گیرد.</p></div>
      <div class="ba" style="--pos:50%">
        <div class="ba-pane ba-after">${smileSvg("#FFFFFF", "#F4FBFB")}<span class="ba-tag">بعد</span></div>
        <div class="ba-pane ba-before">${smileSvg("#E9DDB8", "#F1E7C9")}<span class="ba-tag">قبل</span></div>
        <div class="ba-handle" aria-hidden="true"></div>
        <input type="range" min="0" max="100" value="50" aria-label="مقایسه‌ی قبل و بعد">
      </div><p class="muted" style="margin-top:12px;font-size:.9rem">تصویر نمونه (نقاشی، نه عکس واقعی)</p></div></section>`,
      css: `.t-dentistry .ba{position:relative;max-width:820px;aspect-ratio:16/8;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:#fff}
.t-dentistry .ba-pane{position:absolute;inset:0}.t-dentistry .ba-pane svg{width:100%;height:100%}
.t-dentistry .ba-before{clip-path:inset(0 0 0 var(--pos))}
.t-dentistry .ba-tag{position:absolute;top:14px;background:rgba(11,52,64,.78);color:#fff;font-size:.85rem;padding:4px 12px;border-radius:8px}
.t-dentistry .ba-after .ba-tag{inset-inline-end:14px}.t-dentistry .ba-before .ba-tag{inset-inline-start:14px}
.t-dentistry .ba-handle{position:absolute;top:0;bottom:0;left:var(--pos);width:3px;background:var(--primary);transform:translateX(-50%)}
.t-dentistry .ba-handle::after{content:"⇆";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:1.2rem}
.t-dentistry .ba input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;direction:ltr;margin:0}`,
      js: `(function(){var b=document.querySelector('.t-dentistry .ba');if(!b)return;var r=b.querySelector('input');r.addEventListener('input',function(){b.style.setProperty('--pos',r.value+'%')});})();` },
    { id: "prices", html: () => `<section class="sec" id="prices"><div class="wrap">
      <div class="sec-head"><h2>تعرفه‌ی خدمات</h2><p>قیمت دقیق بعد از معاینه مشخص می‌شود؛ این قیمت‌ها برای آشنایی اولیه است.</p></div>
      <div class="tbl-wrap"><table class="price-tbl"><thead><tr><th>درمان</th><th>تعداد جلسه</th><th>قیمت از</th></tr></thead><tbody>
      ${[["معاینه و عکس OPG", "۱", "۵۰۰٬۰۰۰"], ["پر کردن با کامپوزیت (هر دندان)", "۱", "۲٬۸۰۰٬۰۰۰"], ["عصب‌کشی دندان آسیا", "۱ تا ۲", "۶٬۵۰۰٬۰۰۰"], ["بلیچینگ در مطب", "۱", "۸٬۰۰۰٬۰۰۰"], ["لمینت سرامیکی (هر دندان)", "۲ تا ۳", "۱۸٬۰۰۰٬۰۰۰"], ["ایمپلنت (با روکش)", "۳ تا ۵", "۴۵٬۰۰۰٬۰۰۰"]].map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c} تومان</td></tr>`).join("")}
      </tbody></table></div>
      <div class="ins"><h3>بیمه‌ها</h3><div class="svc-chips"><span>${icon("shield")}بیمه‌های تکمیلی طرف قرارداد</span><span>${icon("check")}پرداخت اقساطی بدون ضامن</span><span>${icon("check")}فاکتور رسمی برای گرفتن هزینه از بیمه</span></div></div>
      <p class="muted" style="margin-top:14px;font-size:.88rem">قیمت‌ها نمونه است.</p></div></section>`,
      css: `.t-dentistry .tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:14px}
.t-dentistry .price-tbl{width:100%;border-collapse:collapse;min-width:520px}
@media (max-width:600px){.t-dentistry .price-tbl{min-width:0;font-size:.9rem}.t-dentistry .price-tbl th,.t-dentistry .price-tbl td{padding:10px 12px}}
.t-dentistry .price-tbl th{background:var(--surface);text-align:start;padding:14px 18px;font-size:.92rem;color:var(--muted)}
.t-dentistry .price-tbl td{padding:14px 18px;border-top:1px solid var(--line)}
.t-dentistry .price-tbl td:last-child{font-weight:700;color:var(--primary-deep);white-space:nowrap}
.t-dentistry .ins{margin-top:32px}.t-dentistry .ins h3{margin-bottom:12px}` },
  ],
  navExtra: [["#prices", "تعرفه‌ها"]],
  hours: [10, 18], closedDays: [6], slotMinutes: 30,
  faq: [["ایمپلنت درد دارد؟", "با بی‌حسی موضعی، حین کار دردی حس نمی‌کنید. یکی دو روز بعد ممکن است کمی درد یا ورم داشته باشید که با یک مسکن ساده خوب می‌شود."], ["هزینه را می‌توانم قسطی بپردازم؟", "بله، برای درمان‌های چندجلسه‌ای پرداخت اقساطی داریم."], ["بلیچینگ به مینای دندان آسیب می‌زند؟", "اگر زیر نظر دندانپزشک و با غلظت درست انجام شود، خیر. ممکن است چند روز دندان‌ها به سرما و گرما حساس شوند."], ["کودکان را هم درمان می‌کنید؟", "بله، از ۳ سالگی."]],
  contact: { address: "شیراز، خیابان ملاصدرا، ساختمان پزشکان آرین، طبقه‌ی سوم", phone: "۰۷۱-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا پنجشنبه، ۱۰ تا ۱۸" },
  prompts: {
    hero: "Photorealistic portrait of a confident, friendly Iranian male dentist in his early forties with a neat short beard, wearing teal scrubs, standing with arms relaxed beside a modern white dental chair, bright minimalist dental clinic with white and teal tones, large window daylight, clean editorial healthcare photography, shallow depth of field, no text, no logos",
    clinic: "Photorealistic wide photo of a bright, ultra-clean modern dental treatment room: white dental unit chair, overhead LED light, teal accent wall, glass cabinets, large monitor showing a panoramic x-ray silhouette (abstract, unreadable), daylight, minimalist, no people, no text, no logos",
    detail: "Photorealistic close-up of neatly arranged sterile dental instruments on a white tray with a teal napkin, dental mirror reflecting soft light, clean clinical aesthetic, shallow depth of field, no text, no logos",
  },
},

/* ============ 3. Gynecology — «نیلوفر» ============ */
{
  slug: "gynecology", name: "نیلوفر", specialtyLabel: "زنان و زایمان", look: "آرام و لطیف؛ صورتی ملایم و بادمجانی",
  features: ["مراحل مراقبت در دوران بارداری", "مشاوره‌ی محرمانه", "نوبت آنلاین"],
  doctor: "دکتر لیلا صدری", title: "متخصص زنان، زایمان و نازایی", mark: "ص",
  tagline: "از تصمیم برای بارداری تا روزهای بعد از زایمان، کنار شما هستیم.",
  fonts: { google: "family=Markazi+Text:wght@500;700&family=Vazirmatn:wght@400;500;700", display: "'Markazi Text',Vazirmatn,serif", body: "Vazirmatn,sans-serif", displayWeight: 700 },
  colors: { bg: "#FBF3F1", surface: "#FFFFFF", ink: "#3A1F33", muted: "#76566A", primary: "#A8466F", primaryDeep: "#8C375B", accent: "#E8C7B8", line: "#F0DDDA", lineStrong: "#E2C6C2" },
  vars: "--card-radius:28px;--img-radius:200px 200px 28px 28px;",
  hero: (s) => `<section class="hero"><div class="wrap">
  <div class="hero-text"><h1>از تصمیم برای بارداری تا روزهای بعد از زایمان، کنار شما هستیم.</h1>
    <p class="lead">وقت کافی برای شنیدن حرف‌هایتان، توضیح ساده‌ی هر آزمایش، و تصمیم‌گیری درباره‌ی درمان همراه با خود شما.</p>${btns("نوبت بگیرید", ["مراحل بارداری", "#pregnancy"])}</div>
  <div class="arch-row"><span class="pill">${icon("shield")} مشاوره‌ی کاملاً محرمانه</span>
    <div class="arch"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></div>
    <span class="pill">${icon("clock")} ویزیت فوری برای خانم‌های باردار</span></div>
</div></section>`,
  css: `.t-gynecology .hero{padding:56px 0 40px;text-align:center}
.t-gynecology .hero-text{max-width:780px;margin-inline:auto}
.t-gynecology h1{font-size:clamp(2.3rem,1.3rem + 3.6vw,4.2rem);line-height:1.3}
.t-gynecology .lead{font-size:1.12rem;color:var(--muted);margin:18px auto 28px;max-width:56ch}
.t-gynecology .hero-cta{justify-content:center}
.t-gynecology .arch-row{display:grid;grid-template-columns:1fr minmax(0,420px) 1fr;align-items:end;gap:24px;margin-top:48px}
.t-gynecology .arch{border-radius:220px 220px 28px 28px;overflow:hidden;aspect-ratio:4/5;border:10px solid #fff;box-shadow:0 30px 60px -30px rgba(58,31,51,.35)}
.t-gynecology .arch img{width:100%;height:100%;object-fit:cover}
.t-gynecology .pill{display:inline-flex;gap:8px;align-items:center;justify-self:center;background:#fff;padding:12px 18px;border-radius:999px;font-weight:600;margin-bottom:60px;border:1px solid var(--line)}
.t-gynecology .pill .ic{color:var(--primary);width:20px;height:20px}
@media (max-width:760px){.t-gynecology .arch-row{grid-template-columns:1fr}.t-gynecology .pill{margin:0}.t-gynecology .arch{order:-1}}
.t-gynecology .sec-head h2{font-size:clamp(1.9rem,1.2rem + 2.2vw,2.9rem)}
.t-gynecology .svc-cards article{background:var(--bg);border-color:transparent}
.t-gynecology #services{background:#fff;border-radius:48px 48px 0 0}
.t-gynecology .about .photo{border-radius:28px}`,
  alts: { hero: "پزشک زنان در مطبی آرام و روشن", clinic: "اتاق مشاوره‌ی دنج با مبل و گیاه", detail: "دستگاه سونوگرافی در اتاقی با نور ملایم" },
  about: { title: "درباره‌ی دکتر صدری", text: "دکتر لیلا صدری سال‌هاست در زمینه‌ی بارداری، درمان ناباروری و معاینه‌های دوره‌ای زنان کار می‌کند. به نظر او هر بیمار حق دارد بداند چرا یک آزمایش لازم است و چه راه‌های درمانی دارد.", creds: ["بورد تخصصی زنان و زایمان", "فلوشیپ ناباروری و آی‌وی‌اف", "پزشک بیمارستان‌های خصوصی اصفهان"] },
  servicesTitle: "خدمات", services: [
    { icon: "heart", t: "مراقبت‌های بارداری", d: "ویزیت‌های منظم، آزمایش‌های غربالگری و آمادگی برای زایمان." },
    { icon: "spark", t: "ناباروری", d: "بررسی علت، درمان دارویی و آی‌یو‌آی." },
    { icon: "shield", t: "چکاپ دوره‌ای زنان", d: "پاپ‌اسمیر، معاینه‌ی پستان و سونوگرافی." },
    { icon: "moon", t: "یائسگی", d: "کم کردن عوارض یائسگی و مراقبت از استخوان‌ها." },
    { icon: "drop", t: "مشکلات قاعدگی", d: "عادت ماهانه‌ی نامنظم، خونریزی زیاد و درد پریود." },
    { icon: "chat", t: "مشاوره‌ی پیش از بارداری", d: "آزمایش‌ها و مکمل‌هایی که قبل از بارداری لازم است." },
  ],
  sections: [{ id: "pregnancy", html: (s) => `<section class="sec" id="pregnancy"><div class="wrap preg">
    <div><div class="sec-head"><h2>مراحل بارداری، قدم به قدم</h2><p>در هر مرحله می‌دانید چه کارهایی باید انجام شود. برنامه‌ی دقیق شما را پزشک تعیین می‌کند.</p></div>
    <ol class="preg-steps">${[["قبل از بارداری", "آزمایش‌های اولیه، مصرف اسید فولیک و بررسی بیماری‌های زمینه‌ای"], ["سه‌ماهه‌ی اول", "تأیید بارداری، اولین سونوگرافی و غربالگری نوبت اول (هفته‌ی ۱۱ تا ۱۴)"], ["سه‌ماهه‌ی دوم", "سونوگرافی آنومالی و آزمایش قند بارداری"], ["سه‌ماهه‌ی سوم", "ویزیت‌های بیشتر، بررسی وضعیت جنین و تصمیم درباره‌ی نوع زایمان"], ["بعد از زایمان", "ویزیت ۶ هفته بعد از زایمان، شیردهی و حال روحی مادر"]].map(([a, b]) => `<li><h3>${a}</h3><p>${b}</p></li>`).join("")}</ol></div>
    <figure class="preg-img"><img src="${img(s, "detail")}" alt="${esc(s.alts.detail)}" loading="lazy" width="900" height="900"></figure>
  </div></section>`, css: `.t-gynecology .preg{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:48px;align-items:center}
.t-gynecology .preg-steps{list-style:none;margin:0;padding:0;counter-reset:st}
.t-gynecology .preg-steps li{counter-increment:st;position:relative;padding:0 0 26px;padding-inline-start:64px}
.t-gynecology .preg-steps li::before{content:counter(st,persian);position:absolute;inset-inline-start:0;top:0;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--accent);color:var(--ink);font-family:var(--font-display);font-size:1.3rem;font-weight:700}
.t-gynecology .preg-steps li:not(:last-child)::after{content:"";position:absolute;inset-inline-start:21px;top:48px;bottom:4px;border-inline-start:2px solid var(--line-strong)}
.t-gynecology .preg-steps h3{font-family:var(--font-display);font-size:1.45rem}
.t-gynecology .preg-steps p{color:var(--muted)}
.t-gynecology .preg-img img{border-radius:220px 220px 28px 28px;aspect-ratio:3/4;object-fit:cover}
@media (max-width:860px){.t-gynecology .preg{grid-template-columns:1fr}.t-gynecology .preg-img{max-width:360px}}` }],
  navExtra: [["#pregnancy", "بارداری"]],
  hours: [15, 20], closedDays: [5, 6], slotMinutes: 20,
  faq: [["در بارداری، اولین بار کی مراجعه کنم؟", "معمولاً بین هفته‌ی ۶ تا ۸ بارداری. اگر درد یا خونریزی دارید، زودتر مراجعه کنید."], ["می‌توانم همراه داشته باشم؟", "بله، همسر یا یکی از نزدیکانتان می‌تواند در جلسه‌ی مشاوره همراهتان باشد."], ["سونوگرافی در خود مطب انجام می‌شود؟", "سونوگرافی‌های معمول بله؛ برای سونوگرافی‌های تخصصی به یک مرکز معتبر معرفی می‌شوید."], ["اطلاعاتم محرمانه می‌ماند؟", "بله، پرونده‌ی شما فقط در اختیار پزشک است."]],
  contact: { address: "اصفهان، خیابان چهارباغ بالا، مجتمع پزشکی نیلوفر، طبقه‌ی چهارم", phone: "۰۳۱-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا چهارشنبه، ۱۵ تا ۲۰" },
  prompts: {
    hero: "Photorealistic portrait of a calm, kind Iranian female gynecologist in her mid forties wearing a soft blush-pink headscarf and a white coat, sitting in a warm, softly lit consultation room with plants and linen curtains, gentle reassuring smile, muted rose and plum tones, natural window light, editorial healthcare photography, no text, no logos",
    clinic: "Photorealistic wide photo of a cozy, elegant gynecology consultation room: two soft armchairs facing a light wooden desk, blush and sand-colored walls, linen curtains, a green plant, framed abstract botanical print, warm afternoon light, calm and private atmosphere, no people, no text, no logos",
    detail: "Photorealistic photo of a modern ultrasound machine beside an exam bed with a soft blush blanket in a dimly lit, calming clinic room, warm lamp glow, gentle and reassuring mood, no people, no readable screen text, no logos",
  },
},

/* ============ 4. Dermatology & cosmetic — «مخمل» ============ */
{
  slug: "dermatology", name: "مخمل", specialtyLabel: "پوست، مو و زیبایی", look: "لوکس و آرام؛ قهوه‌ای تیره، کرم و طلایی",
  features: ["فهرست خدمات با قیمت", "عکس‌های قبل و بعد", "نوبت مشاوره"],
  doctor: "دکتر نگار امیری", title: "متخصص پوست، مو و زیبایی", mark: "ا",
  tagline: "پوست سالم، زیبایی طبیعی.",
  fonts: { google: "family=El+Messiri:wght@500;700&family=Vazirmatn:wght@300;400;600", display: "'El Messiri',Vazirmatn,serif", body: "Vazirmatn,sans-serif", displayWeight: 600 },
  colors: { bg: "#F6F0EA", surface: "#FFFFFF", ink: "#2B221D", muted: "#76655A", primary: "#2B221D", primaryDeep: "#120E0B", onPrimary: "#F6F0EA", accent: "#B48A50", line: "#E5D9CD", lineStrong: "#D3C3B2" },
  vars: "--card-radius:4px;--img-radius:4px;--btn-radius:2px;--mark-radius:2px;--gold:#B48A50;",
  ctaShort: "نوبت مشاوره",
  hero: (s) => `<section class="hero"><img class="hero-bg" src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000">
  <div class="wrap hero-inner"><p class="gold-rule">کلینیک پوست و زیبایی دکتر امیری</p><h1>پوست سالم، زیبایی طبیعی.</h1>
    <p class="lead">درمان جوش، لک و ریزش مو، و زیبایی طبیعی و بدون اغراق. هر درمان با مشاوره و معاینه‌ی پوست شما شروع می‌شود.</p>
    ${btns("نوبت مشاوره", ["خدمات و قیمت‌ها", "#menu"])}</div></section>`,
  css: `.t-dermatology .hero{position:relative;min-height:min(88vh,760px);display:flex;align-items:flex-end;color:#F6F0EA;overflow:hidden;background:#2B221D}
.t-dermatology .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 25%}
.t-dermatology .hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(24,18,14,.15),rgba(24,18,14,.78) 75%),linear-gradient(0deg,rgba(24,18,14,.7),transparent 55%)}
.t-dermatology .hero-inner{position:relative;z-index:1;padding:80px 0 72px;max-width:720px;margin-inline-start:max(20px,calc((100% - 1160px)/2));margin-inline-end:auto}
.t-dermatology .gold-rule{display:flex;align-items:center;gap:14px;color:var(--gold);font-size:.95rem;margin-bottom:18px}
.t-dermatology .gold-rule::before{content:"";width:48px;height:1px;background:var(--gold)}
.t-dermatology h1{font-size:clamp(2.4rem,1.4rem + 3.8vw,4.4rem);font-weight:500}
.t-dermatology .lead{color:rgba(246,240,234,.86);margin:18px 0 30px;font-weight:300;font-size:1.12rem;max-width:52ch}
.t-dermatology .hero .btn{background:var(--gold);color:#1B140F}
.t-dermatology .hero .btn:hover{background:#C89C60}
.t-dermatology .hero .btn.ghost{background:transparent;color:#F6F0EA;box-shadow:inset 0 0 0 1px rgba(246,240,234,.6)}
.t-dermatology .sec-head h2{font-weight:500}
.t-dermatology .svc-chips span{border-radius:2px;background:transparent;border-color:var(--line-strong);font-weight:400}`,
  alts: { hero: "پزشک پوست در کلینیکی با نور گرم", clinic: "اتاق درمان کلینیک پوست با دکور کرم و چوب", detail: "محصولات مراقبت پوست روی سنگ مرمر" },
  about: { title: "درباره‌ی دکتر امیری", text: "دکتر نگار امیری معتقد است بهترین نتیجه، نتیجه‌ی طبیعی است؛ طوری که زیباتر شوید ولی کسی متوجه نشود کاری انجام داده‌اید. قبل از هر درمان، پوستتان معاینه می‌شود و روش‌های ممکن، هزینه و مدت بهبودی صادقانه به شما گفته می‌شود.", creds: ["بورد تخصصی پوست و مو", "دوره‌های بین‌المللی لیزر و تزریقات زیبایی", "استفاده فقط از مواد اصل با برچسب اصالت کالا"] },
  servicesTitle: "خدمات", servicesStyle: "chips",
  services: [{ icon: "drop", t: "آکنه و جای جوش" }, { icon: "sun", t: "لک صورت و ملاسما" }, { icon: "leaf", t: "ریزش مو" }, { icon: "spark", t: "جوان‌سازی پوست" }, { icon: "shield", t: "اگزما و پسوریازیس" }, { icon: "heart", t: "خال و زگیل" }, { icon: "moon", t: "لیزر موهای زائد" }],
  sections: [
    { id: "menu", html: () => `<section class="sec" id="menu" style="background:#fff"><div class="wrap menu-grid">
      <div class="sec-head"><h2>خدمات و قیمت‌ها</h2><p>این‌ها حداقل قیمت است؛ مبلغ دقیق بعد از مشاوره مشخص می‌شود.</p></div>
      ${[["تزریقات", [["بوتاکس صورت", "۴٬۵۰۰٬۰۰۰"], ["فیلر لب (هر سی‌سی)", "۸٬۰۰۰٬۰۰۰"], ["مزوتراپی صورت", "۳٬۲۰۰٬۰۰۰"]]], ["پوست", [["پاکسازی پوست", "۱٬۸۰۰٬۰۰۰"], ["پیلینگ شیمیایی", "۲٬۵۰۰٬۰۰۰"], ["میکرونیدلینگ", "۳٬۰۰۰٬۰۰۰"]]], ["لیزر و مو", [["لیزر موهای زائد (هر جلسه)", "۱٬۵۰۰٬۰۰۰"], ["پی‌آر‌پی مو", "۳٬۵۰۰٬۰۰۰"], ["مزوتراپی مو", "۲٬۸۰۰٬۰۰۰"]]]].map(([g, rows]) => `<div class="menu-col"><h3>${g}</h3><ul>${rows.map(([a, b]) => `<li><span>${a}</span><i aria-hidden="true"></i><b>${b}</b></li>`).join("")}</ul></div>`).join("")}
      <p class="muted menu-note">قیمت‌ها به تومان و نمونه است.</p></div></section>`,
      css: `.t-dermatology .menu-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 48px}
.t-dermatology .menu-grid .sec-head,.t-dermatology .menu-note{grid-column:1/-1}
.t-dermatology .menu-col h3{font-family:var(--font-display);font-weight:500;color:var(--gold);font-size:1.3rem;padding-bottom:10px;border-bottom:1px solid var(--line-strong)}
.t-dermatology .menu-col ul{list-style:none;padding:0;margin:0 0 32px}
.t-dermatology .menu-col li{display:flex;align-items:baseline;gap:10px;padding:14px 0}
.t-dermatology .menu-col i{flex:1;border-bottom:1px dotted var(--line-strong);transform:translateY(-4px)}
.t-dermatology .menu-col b{font-weight:600;white-space:nowrap}
@media (max-width:860px){.t-dermatology .menu-grid{grid-template-columns:1fr}}` },
    { id: "results", html: (s) => `<section class="sec" id="results"><div class="wrap">
      <div class="sec-head"><h2>قبل و بعد</h2><p>در سایت شما، اینجا عکس‌های قبل و بعد واقعی بیمارانتان (با رضایت کتبی آن‌ها) قرار می‌گیرد.</p></div>
      <div class="res-grid">${["آکنه", "لک", "جوان‌سازی"].map((t) => `<figure class="res"><div class="res-pair"><div class="res-ph">قبل</div><div class="res-ph after">بعد</div></div><figcaption>${t} (جای عکس واقعی)</figcaption></figure>`).join("")}
      <figure class="res wide"><img src="${img(s, "detail")}" alt="${esc(s.alts.detail)}" loading="lazy" width="900" height="900"></figure></div></div></section>`,
      css: `.t-dermatology .res-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.t-dermatology .res{margin:0}
.t-dermatology .res-pair{display:grid;grid-template-columns:1fr 1fr;gap:4px;aspect-ratio:1}
.t-dermatology .res-ph{display:grid;place-items:end center;padding-bottom:10px;background:repeating-linear-gradient(135deg,#EDE3D8 0 12px,#E6DACC 12px 24px);color:var(--muted);font-size:.85rem}
.t-dermatology .res-ph.after{background:repeating-linear-gradient(135deg,#F3EBE2 0 12px,#ECE2D6 12px 24px)}
.t-dermatology .res figcaption{font-size:.88rem;color:var(--muted);margin-top:10px}
.t-dermatology .res.wide img{width:100%;aspect-ratio:1;object-fit:cover}
@media (max-width:860px){.t-dermatology .res-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}` },
  ],
  navExtra: [["#menu", "قیمت‌ها"]],
  bookingTitle: "نوبت مشاوره", bookingIntro: "جلسه‌ی اول مشاوره و بررسی پوست است؛ درمان در جلسه‌های بعد انجام می‌شود.",
  hours: [11, 19], closedDays: [6], slotMinutes: 30,
  faq: [["نتیجه‌ی بوتاکس چقدر می‌ماند؟", "معمولاً ۴ تا ۶ ماه؛ در هر کس کمی فرق می‌کند."], ["از کجا بفهمم مواد اصل است؟", "بسته‌ی هر ماده جلوی خود شما باز می‌شود و برچسب اصالت آن را می‌بینید."], ["بعد از لیزر می‌توانم سر کار بروم؟", "بله، اغلب درمان‌های لیزر نیاز به استراحت ندارند؛ فقط چند روز از آفتاب مستقیم دوری کنید."], ["مشاوره هزینه دارد؟", "بله؛ اگر در همان ماه درمان را شروع کنید، این مبلغ از هزینه‌ی درمان کم می‌شود."]],
  contact: { address: "تهران، ولنجک، خیابان یکم، ساختمان مخمل، واحد ۵", phone: "۰۲۱-۲۳۴۵ ۶۷۸۹", hours: "شنبه تا پنجشنبه، ۱۱ تا ۱۹" },
  prompts: {
    hero: "Photorealistic elegant portrait of a poised Iranian female dermatologist in her late thirties wearing a cream silk headscarf and a tailored white coat, standing in a luxurious minimalist aesthetic clinic with warm travertine walls, soft golden side light, espresso brown and gold accents, magazine-quality beauty-editorial lighting, subject on the left third of the frame with calm space on the right, no text, no logos",
    clinic: "Photorealistic wide photo of a luxurious dermatology treatment room: cream leather treatment bed, travertine and walnut wood finishes, brass details, soft indirect warm lighting, a vase with dried pampas grass, serene spa-like clinical atmosphere, no people, no text, no logos",
    detail: "Photorealistic still life of premium unbranded skincare bottles and a glass serum dropper on a cream marble surface with soft golden light and gentle shadows, luxurious minimal aesthetic, no text, no logos",
  },
},

/* ============ 5. Ophthalmology — «نگاه» ============ */
{
  slug: "ophthalmology", name: "نگاه", specialtyLabel: "چشم‌پزشکی", look: "دقیق و حرفه‌ای؛ سرمه‌ای و نارنجی طلایی",
  features: ["تست ساده: لیزیک برای من مناسب است؟", "معاینه‌های تخصصی", "نوبت آنلاین"],
  doctor: "دکتر کاوه رستمی", title: "جراح و متخصص چشم، فلوشیپ قرنیه", mark: "ر",
  tagline: "خداحافظی با عینک، با معاینه‌ی دقیق قبل از عمل.",
  fonts: { google: "family=Readex+Pro:wght@400;500;700", display: "'Readex Pro',sans-serif", body: "'Readex Pro',sans-serif", displayWeight: 500 },
  colors: { bg: "#F4F8FF", surface: "#FFFFFF", ink: "#0A1F44", muted: "#4C6082", primary: "#0B4DA2", primaryDeep: "#083A7A", accent: "#F2A93B", line: "#DCE6F5", lineStrong: "#C2D2EA" },
  vars: "--card-radius:18px;--img-radius:18px;",
  hero: (s) => `<section class="hero"><div class="wrap hero-grid">
  <div class="iris" aria-hidden="false"><svg class="rings" viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="200" r="196" fill="none" stroke="#C2D2EA" stroke-width="1.5"/><circle cx="200" cy="200" r="176" fill="none" stroke="#F2A93B" stroke-width="3" stroke-dasharray="4 10"/>
      <circle cx="200" cy="200" r="158" fill="none" stroke="#0B4DA2" stroke-width="1.5" opacity=".35"/></svg>
    <div class="iris-img"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></div></div>
  <div class="hero-text"><h1>خداحافظی با عینک، با معاینه‌ی دقیق قبل از عمل.</h1>
    <p class="lead">لیزیک، لازک و درمان قوز قرنیه. قبل از هر عمل، نقشه و ضخامت قرنیه‌ی شما اندازه‌گیری می‌شود تا روش مناسب انتخاب شود.</p>
    ${btns("نوبت معاینه", ["آیا لیزیک برای من مناسب است؟", "#lasik"])}</div>
</div></section>`,
  css: `.t-ophthalmology .hero{padding:48px 0 80px}
.t-ophthalmology .hero-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;align-items:center}
.t-ophthalmology .iris{position:relative;aspect-ratio:1;max-width:460px;width:100%;justify-self:center}
.t-ophthalmology .rings{position:absolute;inset:0;width:100%;height:100%;animation:spin 60s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.t-ophthalmology .iris-img{position:absolute;inset:14%;border-radius:50%;overflow:hidden;box-shadow:0 0 0 10px #fff,0 30px 60px -20px rgba(10,31,68,.35)}
.t-ophthalmology .iris-img img{width:100%;height:100%;object-fit:cover}
.t-ophthalmology h1{font-size:clamp(2.1rem,1.2rem + 3.3vw,3.8rem);font-weight:500;line-height:1.3}
.t-ophthalmology .lead{color:var(--muted);margin:20px 0 30px;font-size:1.1rem;max-width:54ch}
@media (max-width:860px){.t-ophthalmology .hero-grid{grid-template-columns:1fr}.t-ophthalmology .iris{max-width:340px}}
.t-ophthalmology .svc-cards article{border-top:3px solid var(--accent)}`,
  alts: { hero: "چشم‌پزشک در کنار دستگاه معاینه‌ی چشم", clinic: "اتاق معاینه‌ی چشم با دستگاه‌های پیشرفته", detail: "دستگاه اسلیت‌لمپ برای معاینه‌ی چشم" },
  about: { title: "درباره‌ی دکتر رستمی", text: "دکتر کاوه رستمی فلوشیپ قرنیه دارد و هزاران عمل لیزیک و پیوند قرنیه انجام داده است. به نظر او مهم‌ترین مرحله معاینه‌ی قبل از عمل است، چون لیزیک برای همه مناسب نیست.", creds: ["فلوشیپ قرنیه و جراحی‌های رفع عیوب انکساری (لیزیک)", "عضو انجمن چشم‌پزشکی ایران", "دستگاه‌های توپوگرافی و پنتاکم در خود مطب"] },
  servicesTitle: "خدمات", services: [
    { icon: "eye", t: "لیزیک و فمتولیزیک", d: "اصلاح نزدیک‌بینی، دوربینی و آستیگمات." },
    { icon: "spark", t: "لازک و پی‌آر‌کی", d: "روش مناسب برای قرنیه‌های نازک." },
    { icon: "shield", t: "قوز قرنیه", d: "کراس‌لینکینگ و رینگ داخل قرنیه." },
    { icon: "sun", t: "آب مروارید", d: "عمل فیکو و کاشت لنز داخل چشم." },
    { icon: "drop", t: "خشکی چشم", d: "پیدا کردن علت و درمان مناسب." },
    { icon: "steth", t: "معاینه‌ی کامل چشم", d: "تعیین نمره‌ی چشم، اندازه‌گیری فشار چشم و معاینه‌ی ته چشم." },
  ],
  sections: [{ id: "lasik", html: () => `<section class="sec" id="lasik" style="background:var(--primary);color:#fff"><div class="wrap lasik">
    <div><h2>آیا لیزیک برای من مناسب است؟</h2><p class="lz-intro">به این پنج سؤال جواب دهید. این فقط یک تست ساده است و جای معاینه را نمی‌گیرد.</p></div>
    <form class="lz-form">${["بیشتر از ۱۸ سال سن دارید؟", "نمره‌ی چشمتان در یک سال گذشته تغییر نکرده است؟", "تا حالا پزشک به شما نگفته که قوز قرنیه یا بیماری دیگری در قرنیه دارید؟", "در حال حاضر باردار نیستید و به بچه شیر نمی‌دهید؟", "دیابت کنترل‌نشده یا بیماری خودایمنی (مثل روماتیسم) ندارید؟"].map((q, i) => `<fieldset><legend>${q}</legend><label><input type="radio" name="q${i}" value="1"> بله</label><label><input type="radio" name="q${i}" value="0"> خیر</label></fieldset>`).join("")}
      <button class="btn lz-btn" type="submit">نتیجه را ببینم</button><p class="lz-out" role="status" aria-live="polite"></p></form>
  </div></section>`, css: `.t-ophthalmology .lasik{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px}
.t-ophthalmology .lasik h2{color:#fff}.t-ophthalmology .lz-intro{color:rgba(255,255,255,.8);margin-top:14px}
.t-ophthalmology .lz-form{display:grid;gap:10px}
.t-ophthalmology .lz-form fieldset{border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:12px 16px;margin:0;display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center}
.t-ophthalmology .lz-form legend{float:right;width:100%;font-weight:500;margin-bottom:4px}
.t-ophthalmology .lz-form label{display:flex;gap:8px;align-items:center;cursor:pointer}
.t-ophthalmology .lz-form input{accent-color:var(--accent);width:18px;height:18px}
.t-ophthalmology .lz-btn{background:var(--accent);color:#1C1205;justify-self:start;margin-top:8px}
.t-ophthalmology .lz-btn:hover{background:#F7BD62}
.t-ophthalmology .lz-out{font-weight:500;min-height:1.6em}
@media (max-width:860px){.t-ophthalmology .lasik{grid-template-columns:1fr}}`,
    js: `(function(){var f=document.querySelector('.lz-form');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var o=f.querySelector('.lz-out'),a=0,n=0;for(var i=0;i<5;i++){var c=f.querySelector('input[name=q'+i+']:checked');if(c){a++;n+=+c.value}}
if(a<5){o.textContent='لطفاً به همه‌ی سؤال‌ها جواب دهید.';return}
o.textContent=n===5?'به نظر می‌رسد احتمالاً بتوانید لیزیک کنید. برای اندازه‌گیری ضخامت و نقشه‌ی قرنیه، نوبت معاینه بگیرید.':'برای تصمیم درباره‌ی لیزیک، معاینه‌ی کامل لازم است؛ ممکن است روش دیگری برای شما مناسب‌تر باشد. نوبت معاینه بگیرید.';});})();` }],
  navExtra: [["#lasik", "لیزیک"]],
  hours: [9, 14], closedDays: [5, 6], slotMinutes: 20,
  faq: [["معاینه‌ی پیش از لیزیک چقدر طول می‌کشد؟", "حدود یک ساعت. چون قطره‌ی گشادکننده‌ی مردمک زده می‌شود، تا چند ساعت بعد رانندگی نکنید."], ["لنز طبی را کی باید کنار بگذارم؟", "لنز نرم را یک هفته و لنز سخت را دو تا سه هفته پیش از معاینه استفاده نکنید."], ["بعد از لیزیک کی می‌توانم سر کار بروم؟", "اغلب بیماران یکی دو روز بعد به کار روزمره برمی‌گردند."], ["همراه لازم دارم؟", "برای روز عمل بله، یک همراه برای برگشت به خانه داشته باشید."]],
  contact: { address: "مشهد، بلوار سجاد، مرکز چشم نگاه، طبقه‌ی همکف", phone: "۰۵۱-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا چهارشنبه، ۹ تا ۱۴" },
  prompts: {
    hero: "Photorealistic portrait of a focused, approachable Iranian male ophthalmologist in his fifties with salt-and-pepper hair and glasses, white coat, seated beside a slit lamp examination microscope in a modern eye clinic, cool deep-blue tones with a warm amber accent light, centered composition suitable for a circular crop, crisp clinical editorial photography, no text, no logos",
    clinic: "Photorealistic wide photo of a high-tech ophthalmology examination room: slit lamp, autorefractor and corneal topography machines, examination chair, deep blue accent wall, subtle amber lighting strip, spotless and precise, no people, no readable text, no logos",
    detail: "Photorealistic close-up of an ophthalmic slit lamp microscope eyepieces and chin rest with dramatic blue and amber lighting, precise clinical detail, shallow depth of field, no text, no logos",
  },
},
];

// Stylised teeth for the dentistry before/after demo (an illustration, not a patient photo).
function smileSvg(tooth, gum) {
  const teeth = Array.from({ length: 8 }, (_, i) => `<rect x="${60 + i * 62}" y="${i === 0 || i === 7 ? 120 : 104}" width="54" height="${i === 0 || i === 7 ? 96 : 120}" rx="22" fill="${tooth}" stroke="#D7E3E3" stroke-width="2"/>`).join("");
  return `<svg viewBox="0 0 620 310" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="620" height="310" fill="${gum}"/><path d="M30 110 Q310 40 590 110 L590 70 Q310 0 30 70z" fill="#E7A6A6"/>${teeth}<path d="M30 230 Q310 300 590 230" stroke="#E7A6A6" stroke-width="26" fill="none"/></svg>`;
}
