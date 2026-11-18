// Templates 6–10: cardiology, orthopedics/physio, psychology, ENT, nutrition.
// All names, numbers and addresses are fictional demo content.
import { esc, icon, img } from "./build.mjs";

const btns = (a, b) => `<div class="hero-cta"><a class="btn" href="#booking">${esc(a)}</a>${b ? `<a class="btn ghost" href="${b[1]}">${esc(b[0])}</a>` : ""}</div>`;

export default [
/* ============ 6. Cardiology — «تپش» ============ */
{
  slug: "cardiology", name: "تپش", specialtyLabel: "قلب و عروق", look: "جدی و مطمئن، سرمه‌ای و قرمز",
  features: ["آمادگی‌های لازم قبل از هر تست", "علائمی که باید فوراً به اورژانس بروید", "نوبت آنلاین"],
  doctor: "دکتر بهرام فرهادی", title: "متخصص قلب و عروق، فلوشیپ اکوکاردیوگرافی", mark: "ف",
  tagline: "مراقبت دقیق از قلب شما، بدون عجله.",
  fonts: { google: "family=Noto+Kufi+Arabic:wght@600;800&family=Vazirmatn:wght@400;500;700", display: "'Noto Kufi Arabic',Vazirmatn,sans-serif", body: "Vazirmatn,sans-serif", displayWeight: 800 },
  colors: { bg: "#F5F7FA", surface: "#FFFFFF", ink: "#0F1E3D", muted: "#55627A", primary: "#C21A30", primaryDeep: "#9E1225", accent: "#0F1E3D", line: "#DFE4EC", lineStrong: "#C7CFDC" },
  vars: "--card-radius:10px;--img-radius:10px;--btn-radius:8px;--mark-radius:8px;",
  hero: (s) => `<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text"><h1>مراقبت دقیق از قلب شما، بدون عجله.</h1>
    <p class="lead">نوار قلب، اکو و تست ورزش در خود مطب انجام می‌شود. جواب را همان روز برایتان توضیح می‌دهیم و دستور درمان را مکتوب می‌گیرید.</p>
    ${btns("نوبت ویزیت", ["آمادگی برای تست‌ها", "#tests"])}</div>
  <div class="hero-photo"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></div>
</div>
<svg class="ecg" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 H360 L380 70 L395 40 L410 95 L430 10 L452 110 L470 70 H640 L655 58 L672 70 H1200" fill="none" stroke="#C21A30" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>
</section>`,
  css: `.t-cardiology .hero{background:var(--accent);color:#fff;padding:56px 0 0;position:relative;overflow:hidden}
.t-cardiology .hero-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:56px;align-items:end}
.t-cardiology .hero-text{padding-bottom:96px}
.t-cardiology h1{color:#fff;font-size:clamp(2rem,1.1rem + 3.2vw,3.6rem);line-height:1.4}
.t-cardiology .lead{color:rgba(255,255,255,.78);margin:20px 0 30px;font-size:1.08rem;max-width:54ch}
.t-cardiology .hero .btn.ghost{color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.45)}
.t-cardiology .hero .btn.ghost:hover{background:rgba(255,255,255,.08)}
.t-cardiology .hero-photo img{border-radius:10px 10px 0 0;aspect-ratio:4/5;object-fit:cover;width:100%;height:auto;max-height:min(600px,70vh);border:6px solid #fff;border-bottom:0}
.t-cardiology .ecg{position:absolute;inset-inline:0;bottom:34px;width:100%;height:90px;pointer-events:none}
.t-cardiology .ecg path{stroke-dasharray:1600;stroke-dashoffset:1600;animation:draw 2.4s .4s ease-out forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@media (max-width:860px){.t-cardiology .hero-grid{grid-template-columns:1fr}.t-cardiology .hero-text{padding-bottom:32px}.t-cardiology .ecg{bottom:auto;top:52%}}
.t-cardiology .svc-list article .ic{color:var(--primary)}`,
  alts: { hero: "متخصص قلب با گوشی پزشکی در مطب", clinic: "اتاق اکوکاردیوگرافی", detail: "گوشی پزشکی کنار مانیتور نوار قلب" },
  about: { title: "درباره‌ی دکتر فرهادی", text: "دکتر بهرام فرهادی بیش از بیست سال سابقه در تشخیص و درمان بیماری‌های قلب دارد. تست‌های اصلی قلب در خود مطب انجام می‌شود تا برای هر کدام مجبور نباشید جای دیگری بروید.", creds: ["بورد تخصصی قلب و عروق", "فلوشیپ اکوکاردیوگرافی", "عضو انجمن قلب ایران"] },
  servicesTitle: "خدمات", servicesStyle: "list",
  services: [
    { icon: "pulse", t: "نوار قلب (ECG)", d: "بررسی ضربان و ریتم قلب، در چند دقیقه." },
    { icon: "heart", t: "اکوکاردیوگرافی", d: "سونوگرافی قلب برای بررسی دریچه‌ها و کار قلب." },
    { icon: "run", t: "تست ورزش", d: "بررسی کار قلب هنگام راه رفتن روی تردمیل." },
    { icon: "clock", t: "هولتر ۲۴ ساعته", d: "ثبت نوار قلب یا فشار خون در طول یک شبانه‌روز." },
    { icon: "drop", t: "کنترل فشار خون", d: "تنظیم دارو و پیگیری منظم." },
    { icon: "shield", t: "چکاپ قلب", d: "بررسی کامل برای افراد بالای ۴۰ سال و کسانی که سابقه‌ی خانوادگی بیماری قلبی دارند." },
  ],
  sections: [{ id: "tests", html: () => `<section class="sec" id="tests"><div class="wrap">
    <div class="sec-head"><h2>آمادگی قبل از تست‌ها</h2><p>اگر آماده بیایید، تست دقیق‌تر و سریع‌تر انجام می‌شود. این توضیحات را هنگام گرفتن نوبت هم برایتان پیامک می‌کنیم.</p></div>
    <div class="prep">${[["نوار قلب", "۱۰ دقیقه", ["آمادگی خاصی لازم نیست", "لباس راحت و دوتکه بپوشید"]], ["اکوکاردیوگرافی", "۳۰ دقیقه", ["ناشتا بودن لازم نیست", "داروهایتان را طبق معمول مصرف کنید"]], ["تست ورزش", "۴۵ دقیقه", ["از ۳ ساعت پیش غذای سنگین نخورید", "کفش ورزشی همراه بیاورید", "اگر دارو مصرف می‌کنید، از قبل از پزشک بپرسید کدام را قطع کنید"]], ["هولتر", "۲۴ ساعت", ["پیش از نصب دوش بگیرید", "تا وقتی دستگاه وصل است، حمام نروید"]]].map(([t, d, l]) => `<article><header><h3>${t}</h3><span>${icon("clock")} ${d}</span></header><ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("")}</div>
    <div class="alarm" role="note">${icon("phone")}<div><b>درد قفسه‌ی سینه، تنگی نفس ناگهانی یا بی‌حسی یک سمت بدن؟</b><p>منتظر نوبت نمانید؛ همین حالا با اورژانس ۱۱۵ تماس بگیرید.</p></div></div>
  </div></section>`, css: `.t-cardiology .prep{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.t-cardiology .prep article{background:#fff;border:1px solid var(--line);border-radius:10px;padding:22px;border-top:4px solid var(--accent)}
.t-cardiology .prep header{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px}
.t-cardiology .prep header span{display:inline-flex;gap:4px;align-items:center;color:var(--muted);font-size:.85rem;white-space:nowrap}
.t-cardiology .prep header .ic{width:18px;height:18px}
.t-cardiology .prep ul{margin:0;padding-inline-start:18px;color:var(--muted);font-size:.95rem;display:grid;gap:6px}
.t-cardiology .alarm{margin-top:28px;display:flex;gap:16px;align-items:flex-start;background:#FDECEE;border:1px solid #F4C3CA;border-radius:10px;padding:20px 22px}
.t-cardiology .alarm .ic{color:var(--primary);width:28px;height:28px}
.t-cardiology .alarm p{color:#7A1422;margin-top:4px}
@media (max-width:960px){.t-cardiology .prep{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.t-cardiology .prep{grid-template-columns:1fr}}` }],
  navExtra: [["#tests", "تست‌ها"]],
  hours: [16, 21], closedDays: [5, 6], slotMinutes: 20,
  faq: [["برای ویزیت اول چه همراه بیاورم؟", "آزمایش‌ها، نوارهای قلب قبلی و فهرست داروهایتان را همراه داشته باشید."], ["جواب اکو را همان روز می‌گیرم؟", "بله، جواب را همان موقع برایتان توضیح می‌دهیم و گزارش آن را تحویل می‌گیرید."], ["چند وقت یک بار چکاپ قلب لازم است؟", "برای افراد بالای ۴۰ سال یا با سابقه‌ی خانوادگی، معمولاً سالی یک بار؛ پزشک برنامه را تعیین می‌کند."], ["بیمه قبول می‌کنید؟", "بله، بیمه‌ی تأمین اجتماعی و بیمه‌های تکمیلی طرف قرارداد را قبول می‌کنیم."]],
  contact: { address: "تبریز، خیابان ولیعصر، ساختمان پزشکان تپش، طبقه‌ی دوم", phone: "۰۴۱-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا چهارشنبه، ۱۶ تا ۲۱" },
  prompts: {
    hero: "Photorealistic portrait of a trustworthy, experienced Iranian male cardiologist in his late fifties with grey hair and a calm expression, white coat over a navy shirt, stethoscope around his neck, standing in a modern cardiology clinic with a deep navy wall, subtle crimson accent, soft directional light, serious yet warm editorial healthcare photography, vertical composition, no text, no logos",
    clinic: "Photorealistic wide photo of a modern echocardiography room: ultrasound machine beside an exam bed, ECG monitor, navy and white interior with a subtle crimson accent stripe, dimmed professional lighting, spotless, no people, no readable text, no logos",
    detail: "Photorealistic close-up of a stethoscope resting beside an ECG monitor showing an abstract green heartbeat line, navy background, crisp clinical detail, shallow depth of field, no readable text, no logos",
  },
},

/* ============ 7. Orthopedics & physio — «پویا» ============ */
{
  slug: "orthopedics", name: "پویا", specialtyLabel: "ارتوپدی و فیزیوتراپی", look: "پرانرژی و ورزشی، سبز و نارنجی",
  features: ["انتخاب محل درد روی تصویر بدن", "درمان در چهار مرحله", "نوبت آنلاین"],
  doctor: "دکتر سینا مرادی", title: "متخصص ارتوپدی و طب ورزشی", mark: "پ",
  tagline: "دوباره بدون درد بدوید.",
  fonts: { google: "family=Lalezar&family=Vazirmatn:wght@400;500;700", display: "Lalezar,Vazirmatn,sans-serif", body: "Vazirmatn,sans-serif", displayWeight: 400 },
  colors: { bg: "#F1F6F2", surface: "#FFFFFF", ink: "#14261C", muted: "#4E6356", primary: "#16894C", primaryDeep: "#106B3B", accent: "#FF7A2F", line: "#D9E6DC", lineStrong: "#BED3C3" },
  vars: "--card-radius:16px;--img-radius:16px;--btn-radius:10px;--mark-radius:10px;",
  hero: (s) => `<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text"><h1>دوباره بدون درد بدوید.</h1>
    <p class="lead">درمان آسیب‌های ورزشی، زانودرد و کمردرد؛ پزشک ارتوپد و فیزیوتراپ در یک مرکز. هدف ما این است که دوباره سراغ ورزش و کارهایی که دوست دارید بروید.</p>
    ${btns("نوبت بگیرید", ["کجا درد دارید؟", "#bodymap"])}</div>
  <div class="hero-photo"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></div>
</div></section>`,
  css: `.t-orthopedics .hero{position:relative;padding:56px 0 88px;overflow:hidden}
.t-orthopedics .hero::before{content:"";position:absolute;inset:0;background:var(--primary);clip-path:polygon(0 0,100% 0,100% 62%,0 100%);z-index:-1}
.t-orthopedics .hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:48px;align-items:center}
.t-orthopedics h1{font-size:clamp(3rem,1.6rem + 5.4vw,6rem);line-height:1.1;color:#fff}
.t-orthopedics .lead{color:rgba(255,255,255,.88);margin:18px 0 30px;font-size:1.1rem;max-width:50ch}
.t-orthopedics .hero .btn{background:var(--accent);color:#2A1204}
.t-orthopedics .hero .btn:hover{background:#FF9455}
.t-orthopedics .hero .btn.ghost{background:#fff;color:var(--ink);box-shadow:none}
.t-orthopedics .hero-photo{position:relative}
.t-orthopedics .hero-photo::before{content:"";position:absolute;inset:18px -18px -18px 18px;border:4px solid var(--accent);border-radius:16px}
.t-orthopedics .hero-photo img{position:relative;border-radius:16px;aspect-ratio:4/5;object-fit:cover;width:100%;height:auto;max-height:min(600px,70vh)}
@media (max-width:860px){.t-orthopedics .hero-grid{grid-template-columns:1fr}.t-orthopedics .hero::before{clip-path:polygon(0 0,100% 0,100% 45%,0 60%)}}
.t-orthopedics .sec-head h2{font-size:clamp(2rem,1.2rem + 2.6vw,3.1rem);font-weight:400}`,
  alts: { hero: "پزشک طب ورزشی در حال تمرین درمانی با یک ورزشکار", clinic: "سالن فیزیوتراپی با تجهیزات تمرینی", detail: "تمرین درمانی زانو با کش ورزشی" },
  about: { title: "درباره‌ی دکتر مرادی", text: "دکتر سینا مرادی پزشک تیم‌های ورزشی بوده و تا جایی که بشود، درمان را بدون جراحی شروع می‌کند. فیزیوتراپیست‌ها در همین مرکز کنار پزشک کار می‌کنند.", creds: ["بورد تخصصی ارتوپدی", "فلوشیپ طب ورزشی و آرتروسکوپی", "پزشک سابق تیم ملی دوومیدانی جوانان"] },
  servicesTitle: "خدمات", services: [
    { icon: "bone", t: "آسیب‌های ورزشی", d: "رباط صلیبی، مینیسک و پیچ‌خوردگی." },
    { icon: "run", t: "فیزیوتراپی", d: "تمرین درمانی، الکتروتراپی و شاک‌ویو." },
    { icon: "spark", t: "درد کمر و گردن", d: "دیسک کمر و گردن، تنگی کانال نخاع و دردهای طولانی." },
    { icon: "shield", t: "آرتروسکوپی", d: "جراحی بسته‌ی زانو و شانه با دوربین." },
    { icon: "drop", t: "تزریق پی‌آر‌پی", d: "برای التهاب تاندون و آرتروز (ساییدگی) خفیف." },
    { icon: "ruler", t: "اصلاح ناهنجاری‌ها", d: "بررسی نحوه‌ی راه رفتن، صافی کف پا و قوز پشت." },
  ],
  sections: [
    { id: "bodymap", html: () => `<section class="sec" id="bodymap" style="background:#fff"><div class="wrap bm">
      <div><div class="sec-head"><h2>کجا درد دارید؟</h2><p>روی جایی که درد دارد بزنید تا علت‌های رایج و راه‌های درمانش را ببینید.</p></div>
        <div class="bm-out" aria-live="polite"><h3>یک نقطه را انتخاب کنید</h3><p class="muted">گردن، شانه، کمر، مچ دست، زانو یا مچ پا.</p></div></div>
      <div class="bm-figure">
        <svg viewBox="0 0 200 420" aria-hidden="true"><g fill="#E3EDE6" stroke="#BED3C3" stroke-width="2"><circle cx="100" cy="42" r="28"/><path d="M68 84 Q100 74 132 84 L150 200 Q142 206 134 200 L126 128 L124 236 L134 400 Q122 410 110 400 L100 260 L90 400 Q78 410 66 400 L76 236 L74 128 L66 200 Q58 206 50 200z"/></g></svg>
        ${[["neck", "گردن", 50, 18.5], ["shoulder", "شانه", 64, 21], ["back", "کمر", 50, 41], ["wrist", "مچ دست", 77, 47], ["knee", "زانو", 39, 73], ["ankle", "مچ پا", 61, 92]].map(([k, t, x, y]) => `<button type="button" class="bm-dot" data-k="${k}" style="inset-inline-start:${x}%;top:${y}%" aria-label="${t}"><span>${t}</span></button>`).join("")}
      </div></div></section>`,
      css: `.t-orthopedics .bm{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:center}
.t-orthopedics .bm-out{background:var(--bg);border-radius:16px;padding:24px;min-height:200px;border-inline-start:5px solid var(--accent)}
.t-orthopedics .bm-out h3{font-family:var(--font-display);font-weight:400;font-size:1.6rem;margin-bottom:8px}
.t-orthopedics .bm-out ul{margin:10px 0 0;padding-inline-start:20px;color:var(--muted)}
.t-orthopedics .bm-figure{position:relative;max-width:300px;width:100%;justify-self:center}
.t-orthopedics .bm-figure svg{width:100%;height:auto;display:block}
.t-orthopedics .bm-dot{position:absolute;transform:translate(50%,-50%);width:30px;height:30px;border-radius:50%;border:0;background:var(--accent);cursor:pointer;box-shadow:0 0 0 6px rgba(255,122,47,.22)}
[dir=rtl] .t-orthopedics .bm-dot{transform:translate(50%,-50%)}
.t-orthopedics .bm-dot[aria-pressed=true]{background:var(--primary);box-shadow:0 0 0 8px rgba(22,137,76,.25)}
.t-orthopedics .bm-dot span{position:absolute;inset-inline-start:36px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:.85rem;font-weight:700;background:#fff;padding:2px 8px;border-radius:6px;box-shadow:0 2px 8px rgba(20,38,28,.12)}
@media (max-width:860px){.t-orthopedics .bm{grid-template-columns:1fr}}`,
      js: `(function(){var D={neck:['گردن',['گردن‌درد به خاطر بد نشستن','دیسک گردن','گرفتگی عضلات'],'ورزش درمانی، درست نشستن پشت کامپیوتر و در صورت نیاز دارو.'],shoulder:['شانه',['التهاب یا پارگی تاندون‌های شانه','شانه‌ی منجمد (خشکی شانه)','دررفتگی شانه'],'فیزیوتراپی، در بعضی موارد تزریق، و اگر تاندون پاره شده باشد آرتروسکوپی.'],back:['کمر',['کمردرد عضلانی','دیسک کمر','تنگی کانال نخاع'],'بیشتر وقت‌ها بدون جراحی: ورزش درمانی، فیزیوتراپی و اصلاح عادت‌های روزمره.'],wrist:['مچ دست',['سندرم تونل کارپال (خواب رفتن دست)','التهاب تاندون','آسیب‌های ورزشی'],'آتل، فیزیوتراپی و در صورت نیاز جراحی سرپایی.'],knee:['زانو',['آسیب رباط صلیبی','پارگی مینیسک','آرتروز زانو'],'ورزش‌های تقویتی، تزریق پی‌آر‌پی و در صورت نیاز آرتروسکوپی.'],ankle:['مچ پا',['پیچ‌خوردگی','التهاب تاندون آشیل','خار پاشنه'],'استراحت، کفی طبی، شاک‌ویو و تمرین‌های تعادلی.']};
var o=document.querySelector('.bm-out');document.querySelectorAll('.bm-dot').forEach(function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){document.querySelectorAll('.bm-dot').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');var d=D[b.dataset.k];o.innerHTML='<h3>'+d[0]+'</h3><p class="muted">علت‌های رایج:</p><ul>'+d[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><p style="margin-top:10px">'+d[2]+'</p>';});});})();` },
    { id: "program", html: () => `<section class="sec" id="program"><div class="wrap">
      <div class="sec-head"><h2>مراحل درمان</h2><p>از اولین ویزیت تا برگشتن به ورزش، در چهار مرحله.</p></div>
      <ol class="prog">${[["معاینه", "معاینه، بررسی حرکت مفصل و در صورت نیاز ام‌آر‌آی."], ["برنامه‌ی درمان", "تعیین هدف درمان و تعداد جلسه‌ها."], ["فیزیوتراپی و ورزش", "جلسه‌های فیزیوتراپی در مرکز، همراه با ورزش در خانه."], ["برگشت به ورزش", "برگشت تدریجی به ورزش، بعد از اطمینان از آمادگی بدن."]].map(([a, b]) => `<li><h3>${a}</h3><p>${b}</p></li>`).join("")}</ol></div></section>`,
      css: `.t-orthopedics .prog{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;counter-reset:p}
.t-orthopedics .prog li{counter-increment:p;background:#fff;border-radius:16px;padding:24px;border:1px solid var(--line);position:relative}
.t-orthopedics .prog li::before{content:counter(p,persian);font-family:var(--font-display);font-size:3rem;line-height:1;color:var(--accent);display:block;margin-bottom:10px}
.t-orthopedics .prog h3{font-family:var(--font-display);font-weight:400;font-size:1.4rem}
.t-orthopedics .prog p{color:var(--muted);margin-top:6px;font-size:.95rem}
@media (max-width:860px){.t-orthopedics .prog{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){.t-orthopedics .prog{grid-template-columns:1fr}}` },
  ],
  navExtra: [["#bodymap", "محل درد"]],
  hours: [9, 19], closedDays: [6], slotMinutes: 30,
  faq: [["حتماً باید جراحی کنم؟", "بیشتر آسیب‌ها با فیزیوتراپی و تمرین بهتر می‌شوند. جراحی فقط وقتی پیشنهاد می‌شود که لازم باشد."], ["فیزیوتراپی در همین مرکز انجام می‌شود؟", "بله، فیزیوتراپیست‌ها در کنار پزشک کار می‌کنند و برنامه‌ی شما را دنبال می‌کنند."], ["برای ویزیت چه بپوشم؟", "لباس ورزشی یا گشاد، تا معاینه‌ی جای درد راحت باشد."], ["ام‌آر‌آی قبلی را بیاورم؟", "بله، عکس‌ها و جواب‌های قبلی را حتماً همراه بیاورید."]],
  contact: { address: "رشت، خیابان معلم، مرکز طب ورزشی پویا، طبقه‌ی اول", phone: "۰۱۳-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا پنجشنبه، ۹ تا ۱۹" },
  prompts: {
    hero: "Photorealistic action-portrait of an energetic Iranian male sports-medicine orthopedic doctor in his late thirties wearing a green polo shirt with a stethoscope, guiding a young athlete through a knee rehabilitation exercise on a training mat in a bright modern physiotherapy gym, green and orange accents, dynamic natural light, vertical composition, sporty editorial photography, no text, no logos",
    clinic: "Photorealistic wide photo of a modern physiotherapy and sports-rehab gym: treatment tables, resistance bands, balance balls, parallel bars, green rubber floor and orange accent wall, large windows with daylight, energetic and clean, no people, no text, no logos",
    detail: "Photorealistic close-up of a physiotherapist's hands guiding a patient's knee exercise with an orange resistance band on a green mat, motion and care, shallow depth of field, no text, no logos",
  },
},

/* ============ 8. Psychology — «آرامش» ============ */
{
  slug: "psychology", name: "آرامش", specialtyLabel: "روانشناسی و مشاوره", look: "آرام و دلنشین؛ سبز ملایم و یاسی",
  features: ["انواع جلسه (حضوری، آنلاین، زوج)", "جلسه‌ی اول چطور است؟", "شماره‌های کمک فوری"],
  doctor: "دکتر رها شریفی", title: "روانشناس بالینی", mark: "ش",
  tagline: "اگر این روزها حالتان خوب نیست، لازم نیست تنهایی با آن کنار بیایید.",
  fonts: { google: "family=Noto+Naskh+Arabic:wght@500;700&family=Vazirmatn:wght@400;500", display: "'Noto Naskh Arabic',Vazirmatn,serif", body: "Vazirmatn,sans-serif", displayWeight: 700 },
  colors: { bg: "#EEF2EE", surface: "#F8FAF7", ink: "#23362E", muted: "#58695F", primary: "#3E6B57", primaryDeep: "#2F5444", accent: "#B8A6D9", line: "#D8E1DA", lineStrong: "#C2CFC5" },
  vars: "--card-radius:22px;--img-radius:999px;",
  ctaShort: "نوبت مشاوره",
  hero: (s) => `<section class="hero"><div class="wrap">
  <div class="quiet"><img class="q-img" src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000">
    <h1>اگر این روزها حالتان خوب نیست، لازم نیست تنهایی با آن کنار بیایید.</h1>
    <p class="lead">مشاوره و روان‌درمانی برای اضطراب، افسردگی، مشکلات رابطه و سوگ؛ در فضایی امن و بدون قضاوت، حضوری یا آنلاین.</p>
    ${btns("نوبت مشاوره", ["جلسه‌ی اول چطور است؟", "#first"])}</div>
</div></section>`,
  css: `.t-psychology .hero{padding:80px 0 72px}
.t-psychology .quiet{max-width:780px}
.t-psychology .q-img{width:112px;height:112px;border-radius:50%;object-fit:cover;margin-bottom:28px;border:6px solid var(--surface);box-shadow:0 0 0 2px var(--accent)}
.t-psychology h1{font-size:clamp(2.1rem,1.2rem + 3.2vw,3.7rem);line-height:1.55;font-weight:700}
.t-psychology .lead{color:var(--muted);margin:22px 0 32px;font-size:1.12rem;line-height:2;max-width:56ch}
.t-psychology .btn{box-shadow:none}
.t-psychology body,.t-psychology p{line-height:2}
.t-psychology .about .photo{border-radius:28px}
.t-psychology .svc-list article{border-color:var(--line)}`,
  alts: { hero: "روانشناس با چهره‌ای آرام", clinic: "اتاق مشاوره‌ی آرام با دو مبل و گیاه", detail: "فنجان چای و دفترچه کنار پنجره" },
  about: { title: "درباره‌ی دکتر شریفی", text: "دکتر رها شریفی روانشناس بالینی است و با روش‌های شناختی‌رفتاری (CBT) و درمان مبتنی بر پذیرش و تعهد (ACT) کار می‌کند. هدف جلسه‌ها این است که راهکارهای عملی یاد بگیرید که در زندگی روزمره به کارتان بیاید.", creds: ["دکترای روانشناسی بالینی", "عضو سازمان نظام روانشناسی و مشاوره", "دوره‌های تخصصی زوج‌درمانی و درمان سوگ"] },
  servicesTitle: "زمینه‌های مشاوره", servicesStyle: "list",
  services: [
    { icon: "brain", t: "اضطراب و حمله‌ی پانیک", d: "شناختن عوامل اضطراب و یاد گرفتن راه‌های آرام شدن." },
    { icon: "moon", t: "افسردگی و بی‌انگیزگی", d: "برگشتن تدریجی به زندگی عادی و کارهای روزمره." },
    { icon: "heart", t: "زوج‌درمانی", d: "بهتر حرف زدن با هم و حل کردن دعواهای تکراری." },
    { icon: "leaf", t: "سوگ و از دست دادن عزیزان", d: "کمک در روزهای سخت بعد از فوت یک عزیز یا جدایی." },
    { icon: "sun", t: "استرس کار و خستگی شغلی", d: "یاد گرفتن «نه» گفتن و پیدا کردن دوباره‌ی انرژی." },
    { icon: "chat", t: "اعتماد به نفس", d: "شناختن فکرهای منفی درباره‌ی خودتان و نگاه مهربان‌تر به خود." },
  ],
  sections: [
    { id: "sessions", html: (s) => `<section class="sec" id="sessions"><div class="wrap">
      <div class="sec-head"><h2>انواع جلسه</h2></div>
      <div class="ses">${[["video", "جلسه‌ی آنلاین", "۵۰ دقیقه", "تماس تصویری امن، از هر جایی که راحت هستید."], ["home", "جلسه‌ی حضوری", "۵۰ دقیقه", "در مطب، با فضایی آرام و خصوصی."], ["heart", "زوج‌درمانی", "۷۵ دقیقه", "حضوری یا آنلاین، با حضور هر دو نفر."]].map(([i, t, d, p]) => `<article>${icon(i)}<h3>${t}</h3><span class="dur">${d}</span><p>${p}</p></article>`).join("")}</div>
    </div></section>`,
      css: `.t-psychology .ses{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.t-psychology .ses article{background:var(--surface);border-radius:22px;padding:28px;border:1px solid var(--line)}
.t-psychology .ses .ic{color:var(--primary);width:30px;height:30px;margin-bottom:14px}
.t-psychology .ses .dur{display:inline-block;margin:8px 0;padding:2px 12px;border-radius:999px;background:color-mix(in srgb,var(--accent) 35%,transparent);font-size:.88rem}
.t-psychology .ses p{color:var(--muted)}
@media (max-width:860px){.t-psychology .ses{grid-template-columns:1fr}}` },
    { id: "first", html: (s) => `<section class="sec" id="first" style="background:var(--surface)"><div class="wrap first">
      <div><div class="sec-head"><h2>جلسه‌ی اول چطور است؟</h2><p>خیلی‌ها قبل از جلسه‌ی اول نگران هستند. جلسه این‌طور پیش می‌رود:</p></div>
      <ol class="fs">${[["قبل از جلسه", "یک فرم کوتاه پر می‌کنید؛ فقط هر چه دوست دارید بنویسید."], ["در جلسه‌ی اول", "با هم آشنا می‌شویم و درباره‌ی مشکلتان و چیزی که دوست دارید تغییر کند صحبت می‌کنیم."], ["بعد از جلسه", "به شما می‌گویم حدوداً چند جلسه لازم است و هر چند وقت یک بار؛ تصمیم با خودتان است."]].map(([a, b]) => `<li><h3>${a}</h3><p>${b}</p></li>`).join("")}</ol>
      <p class="conf">${icon("shield")} همه‌ی صحبت‌ها محرمانه می‌ماند.</p></div>
      <figure><img src="${img(s, "detail")}" alt="${esc(s.alts.detail)}" loading="lazy" width="900" height="900"></figure>
      <div class="crisis" role="note"><b>اگر به آسیب زدن به خودتان فکر می‌کنید یا در خطر هستید،</b> همین حالا با اورژانس ۱۱۵ تماس بگیرید. صدای مشاور بهزیستی هم با شماره‌ی ۱۴۸۰ در دسترس است.</div>
    </div></section>`,
      css: `.t-psychology .first{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:48px;align-items:center}
.t-psychology .fs{list-style:none;margin:0;padding:0;counter-reset:f;display:grid;gap:18px}
.t-psychology .fs li{counter-increment:f;padding-inline-start:52px;position:relative}
.t-psychology .fs li::before{content:counter(f,persian);position:absolute;inset-inline-start:0;top:2px;width:36px;height:36px;border-radius:50%;border:1.5px solid var(--primary);display:grid;place-items:center;color:var(--primary);font-weight:500}
.t-psychology .fs h3{font-family:var(--font-display)}.t-psychology .fs p{color:var(--muted)}
.t-psychology .conf{display:flex;gap:10px;align-items:center;margin-top:24px;color:var(--primary);font-weight:500}
.t-psychology .first figure{margin:0}.t-psychology .first figure img{border-radius:999px 999px 24px 24px;aspect-ratio:3/4;object-fit:cover}
.t-psychology .crisis{grid-column:1/-1;background:#fff;border:1px solid var(--line-strong);border-radius:18px;padding:18px 22px;line-height:1.9}
@media (max-width:860px){.t-psychology .first{grid-template-columns:1fr}.t-psychology .first figure{max-width:300px}}` },
  ],
  navExtra: [["#first", "جلسه‌ی اول"]],
  bookingTitle: "نوبت مشاوره", bookingIntro: "زمان دلخواه را انتخاب کنید. برای جلسه‌ی آنلاین، لینک جلسه پیامک می‌شود.",
  hours: [10, 20], closedDays: [5], slotMinutes: 60,
  faq: [["از کجا بفهمم به مشاوره نیاز دارم؟", "اگر مدتی است حالتان یا رابطه‌هایتان روی کار و زندگی روزمره اثر گذاشته، یک جلسه کمک می‌کند بفهمید چه چیزی لازم دارید."], ["جلسه‌ی آنلاین به اندازه‌ی حضوری مؤثر است؟", "برای بیشتر موضوع‌ها بله. مهم این است که جای آرام و خصوصی داشته باشید."], ["چند جلسه لازم است؟", "بسته به مشکل فرق می‌کند؛ بعد از جلسه‌ی اول بهتر می‌توانم بگویم."], ["اگر نتوانم بیایم چه کنم؟", "تا ۲۴ ساعت قبل، با لینکی که برایتان پیامک شده می‌توانید جلسه را لغو کنید یا زمانش را تغییر دهید."]],
  contact: { address: "کرج، عظیمیه، میدان مهران، ساختمان آرامش، واحد ۸", phone: "۰۲۶-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا پنجشنبه، ۱۰ تا ۲۰" },
  prompts: {
    hero: "Photorealistic soft portrait of a gentle, empathetic Iranian female clinical psychologist in her thirties wearing a sage-green headscarf and a cream knit cardigan, warm attentive smile, seated in a calm therapy room with plants and soft natural light, muted sage and lavender tones, centered head-and-shoulders composition suitable for a circular crop, no text, no logos",
    clinic: "Photorealistic wide photo of a calm, cozy therapy room: two comfortable armchairs angled toward each other, small side table with a box of tissues and a glass of water, sage-green walls, lavender cushion, large leafy plant, linen curtains with soft daylight, quiet and safe atmosphere, no people, no text, no logos",
    detail: "Photorealistic still life of a cup of tea and an open notebook with a pen on a wooden windowsill beside a small plant, soft morning light, sage and lavender tones, peaceful mood, no readable text, no logos",
  },
},

/* ============ 9. ENT — «آوا» ============ */
{
  slug: "ent", name: "آوا", specialtyLabel: "گوش، حلق و بینی", look: "گرم و روشن؛ زرد طلایی و سبزآبی",
  features: ["سه بخش گوش، حلق و بینی", "شنوایی‌سنجی در مطب", "نوبت آنلاین"],
  doctor: "دکتر حمید طاهری", title: "متخصص گوش، حلق، بینی و جراحی سر و گردن", mark: "ط",
  tagline: "راحت بشنوید، راحت نفس بکشید.",
  fonts: { google: "family=Reem+Kufi:wght@500;700&family=Vazirmatn:wght@400;500;700", display: "'Reem Kufi',Vazirmatn,sans-serif", body: "Vazirmatn,sans-serif", displayWeight: 700 },
  colors: { bg: "#FFF8EC", surface: "#FFFFFF", ink: "#3B2A14", muted: "#735E46", primary: "#E39A0B", primaryDeep: "#C98500", onPrimary: "#2A1C08", accent: "#1F8F82", line: "#F0E2C8", lineStrong: "#E3CFA8" },
  vars: "--card-radius:20px;--img-radius:20px;--focus:#1F8F82;",
  hero: (s) => `<section class="hero"><div class="wrap">
  <div class="hero-top"><h1>راحت بشنوید، راحت نفس بکشید.</h1>
    <p class="lead">درمان سینوزیت، کم‌شنوایی، خروپف و مشکلات گلو؛ شنوایی‌سنجی و آندوسکوپی بینی در خود مطب انجام می‌شود.</p>${btns("نوبت بگیرید", ["مشکل شما کجاست؟", "#areas"])}</div>
  <div class="triad">
    <a class="tri" href="#areas" data-tab="ear">${icon("ear")}<b>گوش</b><span>کم‌شنوایی، وزوز، عفونت</span></a>
    <figure class="tri-img"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></figure>
    <a class="tri" href="#areas" data-tab="throat">${icon("chat")}<b>حلق</b><span>گلودرد مزمن، لوزه، گرفتگی صدا</span></a>
    <a class="tri" href="#areas" data-tab="nose">${icon("leaf")}<b>بینی</b><span>سینوزیت، انحراف بینی، خروپف</span></a>
  </div>
</div></section>`,
  css: `.t-ent .hero{padding:52px 0 72px}
.t-ent .hero-top{max-width:760px;margin-bottom:40px}
.t-ent h1{font-size:clamp(2.1rem,1.2rem + 3.4vw,3.9rem);line-height:1.35}
.t-ent .lead{color:var(--muted);margin:18px 0 28px;font-size:1.1rem;max-width:56ch}
.t-ent .triad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) minmax(0,1.3fr);grid-template-rows:auto;gap:16px}
.t-ent .tri{display:flex;flex-direction:column;justify-content:flex-end;gap:6px;min-height:220px;padding:24px;border-radius:20px;background:var(--surface);border:1px solid var(--line);text-decoration:none;transition:transform .2s ease,border-color .2s}
.t-ent .tri:hover{transform:translateY(-4px);border-color:var(--primary)}
.t-ent .tri .ic{width:40px;height:40px;color:var(--accent);margin-bottom:auto}
.t-ent .tri b{font-family:var(--font-display);font-size:1.5rem}
.t-ent .tri span{color:var(--muted);font-size:.92rem}
.t-ent .tri:nth-child(1){background:var(--primary);border-color:var(--primary)}.t-ent .tri:nth-child(1) .ic{color:var(--ink)}.t-ent .tri:nth-child(1) span{color:#4A3612}
.t-ent .tri-img{grid-column:4;grid-row:1;margin:0;border-radius:20px;overflow:hidden}
.t-ent .tri-img{position:relative;min-height:220px}.t-ent .tri-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
@media (max-width:900px){.t-ent .triad{grid-template-columns:repeat(3,minmax(0,1fr))}.t-ent .tri-img{grid-column:1/-1;grid-row:auto;order:-1;max-height:340px}}
@media (max-width:560px){.t-ent .triad{grid-template-columns:1fr}.t-ent .tri{min-height:0}}`,
  alts: { hero: "پزشک گوش و حلق و بینی با ابزار معاینه", clinic: "اتاق معاینه‌ی گوش و حلق و بینی", detail: "ابزار اتوسکوپ و آندوسکوپ روی میز" },
  about: { title: "درباره‌ی دکتر طاهری", text: "دکتر حمید طاهری جراح گوش، حلق و بینی است و درمان را از ساده‌ترین روش شروع می‌کند. شنوایی‌سنجی و آندوسکوپی در خود مطب انجام می‌شود تا در همان جلسه‌ی اول علت مشکل مشخص شود.", creds: ["بورد تخصصی گوش، حلق، بینی و جراحی سر و گردن", "فلوشیپ جراحی آندوسکوپیک سینوس", "دارای اتاق شنوایی‌سنجی استاندارد"] },
  servicesTitle: "خدمات", servicesStyle: "chips",
  services: [{ icon: "ear", t: "شنوایی‌سنجی (ادیومتری)" }, { icon: "spark", t: "آندوسکوپی بینی" }, { icon: "leaf", t: "جراحی سینوس" }, { icon: "moon", t: "درمان خروپف" }, { icon: "chat", t: "گرفتگی و مشکلات صدا" }, { icon: "baby", t: "لوزه و آدنوئید کودکان" }, { icon: "shield", t: "وزوز گوش" }],
  sections: [{ id: "areas", html: (s) => `<section class="sec" id="areas" style="background:var(--surface)"><div class="wrap">
    <div class="sec-head"><h2>مشکل شما در کدام بخش است؟</h2></div>
    <div class="tabs" role="tablist" aria-label="بخش‌ها">${[["ear", "گوش"], ["throat", "حلق"], ["nose", "بینی"]].map(([k, t], i) => `<button role="tab" id="tab-${k}" aria-controls="pan-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t}</button>`).join("")}</div>
    ${[["ear", [["کم‌شنوایی", "شنوایی‌سنجی کامل و در صورت نیاز تجویز سمعک."], ["وزوز گوش", "پیدا کردن علت و راه‌های کم کردن صدای وزوز."], ["عفونت و درد گوش", "درمان دارویی و پیگیری عفونت‌های مکرر."]]], ["throat", [["گلودرد مزمن", "پیدا کردن علت، از ریفلاکس معده تا عفونت‌های پشت سر هم."], ["لوزه", "بررسی اینکه لوزه باید برداشته شود یا نه."], ["گرفتگی صدا", "معاینه‌ی تارهای صوتی با آندوسکوپ."]]], ["nose", [["سینوزیت", "درمان با دارو و در صورت نیاز جراحی بسته‌ی سینوس."], ["انحراف تیغه‌ی بینی", "جراحی سپتوپلاستی برای نفس کشیدن راحت‌تر."], ["خروپف", "پیدا کردن علت خروپف و درمان مناسب."]]]].map(([k, items], i) => `<div class="pane" role="tabpanel" id="pan-${k}" aria-labelledby="tab-${k}"${i ? " hidden" : ""}>${items.map(([a, b]) => `<article><h3>${a}</h3><p>${b}</p></article>`).join("")}</div>`).join("")}
    <svg class="wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q30 10 60 40 T120 40 T180 40 T240 40 Q270 0 300 40 T360 40 T420 40 Q450 70 480 40 T540 40 T600 40 Q630 5 660 40 T720 40 T780 40 Q810 65 840 40 T900 40 T960 40 Q990 15 1020 40 T1080 40 T1140 40 T1200 40" fill="none" stroke="#1F8F82" stroke-width="2.5" opacity=".5"/></svg>
  </div></section>`, css: `.t-ent .tabs{display:inline-flex;gap:6px;padding:6px;background:var(--bg);border-radius:999px;border:1px solid var(--line);margin-bottom:24px}
.t-ent .tabs button{font:inherit;font-family:var(--font-display);font-size:1.15rem;border:0;background:transparent;padding:8px 26px;border-radius:999px;cursor:pointer;color:var(--muted)}
.t-ent .tabs button[aria-selected=true]{background:var(--primary);color:var(--on-primary)}
.t-ent .pane{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.t-ent .pane[hidden]{display:none}
.t-ent .pane article{background:var(--bg);border-radius:20px;padding:24px;border-top:4px solid var(--accent)}
.t-ent .pane p{color:var(--muted);margin-top:6px}
.t-ent .wave{width:100%;height:60px;margin-top:28px}
@media (max-width:760px){.t-ent .pane{grid-template-columns:1fr}}`,
    js: `(function(){var tabs=[].slice.call(document.querySelectorAll('.t-ent [role=tab]'));function show(k,focus){tabs.forEach(function(t){var on=t.id==='tab-'+k;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on;if(on&&focus)t.focus();});}
tabs.forEach(function(t,i){t.addEventListener('click',function(){show(t.id.slice(4))});t.addEventListener('keydown',function(e){var d=e.key==='ArrowLeft'?1:e.key==='ArrowRight'?-1:0;if(!d)return;e.preventDefault();var n=tabs[(i+d+tabs.length)%tabs.length];show(n.id.slice(4),true);});});
document.querySelectorAll('.t-ent .tri[data-tab]').forEach(function(a){a.addEventListener('click',function(){show(a.dataset.tab)});});})();` }],
  navExtra: [["#areas", "مشکلات شایع"]],
  hours: [15, 20], closedDays: [5, 6], slotMinutes: 20,
  faq: [["شنوایی‌سنجی چقدر طول می‌کشد؟", "حدود ۲۰ دقیقه، در اتاق مخصوص و بدون درد."], ["سینوزیت همیشه جراحی لازم دارد؟", "خیر. بیشتر موارد با دارو و شست‌وشوی بینی بهتر می‌شوند."], ["کودکان را هم ویزیت می‌کنید؟", "بله، به‌خصوص برای لوزه، آدنوئید و عفونت‌های گوش."], ["برای خروپف چه آزمایشی لازم است؟", "اول بینی و حلق معاینه می‌شود؛ اگر لازم باشد، برای تست خواب معرفی می‌شوید."]],
  contact: { address: "کرمان، بلوار جمهوری، ساختمان پزشکان آوا، طبقه‌ی سوم", phone: "۰۳۴-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا چهارشنبه، ۱۵ تا ۲۰" },
  prompts: {
    hero: "Photorealistic portrait of a friendly, attentive Iranian male ENT specialist in his forties with a head mirror pushed up on his forehead and an otoscope in hand, white coat, warm amber-lit modern ENT clinic with teal accents, soft natural light, approachable expression, editorial healthcare photography, no text, no logos",
    clinic: "Photorealistic wide photo of a modern ENT examination room: ENT treatment chair, endoscopy tower, otoscope station, warm amber wall with teal cabinets, sound-proof audiometry booth window in the background, clean and bright, no people, no readable text, no logos",
    detail: "Photorealistic close-up of an otoscope and a slim nasal endoscope on a clean amber-toned tray with a teal cloth, soft warm light, precise clinical detail, shallow depth of field, no text, no logos",
  },
},

/* ============ 10. Nutrition — «سبزینه» ============ */
{
  slug: "nutrition", name: "سبزینه", specialtyLabel: "تغذیه و رژیم‌درمانی", look: "شاداب؛ سبز روشن و نارنجی",
  features: ["محاسبه‌ی BMI", "بسته‌های رژیم غذایی", "مشاوره‌ی آنلاین"],
  doctor: "دکتر سارا رضوانی", title: "متخصص تغذیه و رژیم‌درمانی", mark: "ر",
  tagline: "رژیمی که از آن خسته نمی‌شوید.",
  fonts: { google: "family=Vazirmatn:wght@400;500;700;900", display: "Vazirmatn,sans-serif", body: "Vazirmatn,sans-serif", displayWeight: 900 },
  colors: { bg: "#FBFFF4", surface: "#FFFFFF", ink: "#213516", muted: "#5A6C4F", primary: "#4F8A16", primaryDeep: "#3D6E10", accent: "#FF8C42", line: "#E4EED6", lineStrong: "#CDDFB6" },
  vars: "--card-radius:24px;--img-radius:24px;",
  hero: (s) => `<section class="hero"><div class="wrap bento">
  <div class="b-main"><h1>رژیمی که از آن خسته نمی‌شوید.</h1><p class="lead">برنامه‌ی غذایی بر اساس ذائقه، شرایط کاری و بدن خودتان؛ برای لاغری، دیابت، دوران بارداری و ورزشکاران.</p>${btns("نوبت مشاوره", ["محاسبه‌ی BMI", "#bmi"])}</div>
  <figure class="b-img"><img src="${img(s, "hero")}" alt="${esc(s.alts.hero)}" width="800" height="1000"></figure>
  <a class="b-tile b-bmi" href="#bmi"><b>BMI</b><span>شاخص توده‌ی بدنی‌تان را در چند ثانیه حساب کنید</span></a>
  <a class="b-tile b-plan" href="#plans"><b>۱۲ هفته</b><span>برنامه‌ی کامل با پیگیری هفتگی</span></a>
</div></section>`,
  css: `.t-nutrition .hero{padding:40px 0 64px}
.t-nutrition .bento{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);grid-template-rows:auto auto;gap:16px}
.t-nutrition .b-main{grid-row:1/3;background:var(--surface);border:1px solid var(--line);border-radius:24px;padding:clamp(28px,4vw,56px);display:flex;flex-direction:column;justify-content:center}
.t-nutrition h1{font-size:clamp(2.4rem,1.3rem + 4.4vw,5rem);line-height:1.15;font-weight:900}
.t-nutrition .lead{color:var(--muted);margin:20px 0 30px;font-size:1.1rem;max-width:48ch}
.t-nutrition .b-img{margin:0;border-radius:24px;overflow:hidden;min-height:260px;position:relative}
.t-nutrition .b-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.t-nutrition .b-tile{display:grid;align-content:center;gap:4px;padding:24px;border-radius:24px;text-decoration:none}
.t-nutrition .b-tile b{font-size:2.2rem;font-weight:900;line-height:1.1}
.t-nutrition .b-bmi{background:var(--accent);color:#2E1506}
.t-nutrition .b-plan{background:var(--primary);color:#fff}
.t-nutrition .b-tiles{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.t-nutrition .bento{grid-template-areas:"main img" "main tiles"}
.t-nutrition .b-main{grid-area:main}.t-nutrition .b-img{grid-area:img}
.t-nutrition .b-bmi,.t-nutrition .b-plan{grid-area:tiles}
.t-nutrition .b-bmi{margin-inline-end:calc(50% + 8px)}.t-nutrition .b-plan{margin-inline-start:calc(50% + 8px)}
@media (max-width:860px){.t-nutrition .bento{grid-template-columns:1fr;grid-template-areas:"main" "img" "tiles"}.t-nutrition .b-img{max-height:320px}}
.t-nutrition .svc-chips span{background:var(--surface)}`,
  alts: { hero: "متخصص تغذیه با بشقاب‌های غذای سالم و رنگارنگ", clinic: "اتاق مشاوره‌ی تغذیه با ترازو و میز", detail: "کاسه‌های غذای سالم با سبزیجات و میوه" },
  about: { title: "درباره‌ی دکتر رضوانی", text: "دکتر سارا رضوانی معتقد است رژیمی که با زندگی شما جور نباشد، ادامه پیدا نمی‌کند. برنامه‌ها با غذاهای ایرانی و سلیقه‌ی خانواده نوشته می‌شود، نه با یک لیست بلند از غذاهای ممنوع.", creds: ["دکترای تخصصی علوم تغذیه", "عضو انجمن تغذیه‌ی ایران", "مشاور تغذیه‌ی تیم‌های ورزشی"] },
  servicesTitle: "خدمات", servicesStyle: "chips",
  services: [{ icon: "scale", t: "رژیم لاغری و چاقی" }, { icon: "drop", t: "دیابت و قند خون" }, { icon: "heart", t: "چربی و فشار خون" }, { icon: "baby", t: "تغذیه‌ی بارداری و شیردهی" }, { icon: "run", t: "رژیم ورزشکاران" }, { icon: "leaf", t: "رژیم گیاهخواری" }, { icon: "spark", t: "تغذیه‌ی کودکان" }],
  sections: [
    { id: "bmi", html: (s) => `<section class="sec" id="bmi"><div class="wrap bmi">
      <div><div class="sec-head"><h2>محاسبه‌ی BMI</h2><p>BMI (شاخص توده‌ی بدنی) فقط یک عدد کلی است و مقدار چربی و عضله را نشان نمی‌دهد؛ در جلسه‌ی مشاوره، بدن شما با دستگاه آنالیز دقیق‌تر بررسی می‌شود.</p></div>
        <form class="bmi-f"><label>قد (سانتی‌متر)<input name="h" inputmode="numeric" placeholder="۱۶۵"></label><label>وزن (کیلوگرم)<input name="w" inputmode="decimal" placeholder="۶۸"></label><button class="btn" type="submit">حساب کن</button></form>
        <div class="bmi-out" aria-live="polite"></div></div>
      <figure><img src="${img(s, "detail")}" alt="${esc(s.alts.detail)}" loading="lazy" width="900" height="900"></figure>
    </div></section>`,
      css: `.t-nutrition .bmi{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:center}
.t-nutrition .bmi-f{display:grid;grid-template-columns:1fr 1fr auto;gap:12px;align-items:end}
.t-nutrition .bmi>*{min-width:0}
.t-nutrition .bmi-f label{display:grid;gap:6px;font-weight:700;font-size:.92rem;min-width:0}
.t-nutrition .bmi-f input{width:100%;min-width:0;font:inherit;padding:13px 14px;border-radius:14px;border:1px solid var(--line-strong);background:#fff}
.t-nutrition .bmi-out{margin-top:20px;min-height:84px}
.t-nutrition .bmi-out .n{font-size:3rem;font-weight:900;line-height:1;color:var(--primary)}
.t-nutrition .bmi-bar{position:relative;height:12px;border-radius:999px;margin-top:14px;background:linear-gradient(90deg,#7BB8E8 0 22%,#7CC04A 22% 50%,#FFB347 50% 72%,#F06A4A 72%)}
[dir=rtl] .t-nutrition .bmi-bar{background:linear-gradient(-90deg,#7BB8E8 0 22%,#7CC04A 22% 50%,#FFB347 50% 72%,#F06A4A 72%)}
.t-nutrition .bmi-bar i{position:absolute;top:-6px;width:4px;height:24px;background:var(--ink);border-radius:2px}
.t-nutrition .bmi figure{margin:0}.t-nutrition .bmi figure img{border-radius:24px;aspect-ratio:1;object-fit:cover}
@media (max-width:860px){.t-nutrition .bmi{grid-template-columns:1fr}.t-nutrition .bmi-f{grid-template-columns:1fr 1fr}.t-nutrition .bmi-f .btn{grid-column:1/-1}}`,
      js: `(function(){var f=document.querySelector('.bmi-f');if(!f)return;function n(v){return parseFloat(String(v).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٫,]/,'.'))}function fa(x){return String(x).replace(/\\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]}).replace('.','٫')}
f.addEventListener('submit',function(e){e.preventDefault();var o=document.querySelector('.bmi-out'),h=n(f.h.value)/100,w=n(f.w.value);if(!(h>1&&h<2.5&&w>20&&w<300)){o.textContent='قد را به سانتی‌متر و وزن را به کیلوگرم وارد کنید.';return}
var b=w/(h*h),c=b<18.5?'کمبود وزن':b<25?'وزن طبیعی':b<30?'اضافه وزن':'چاقی';var p=Math.max(0,Math.min(100,(b-14)/(40-14)*100));
o.innerHTML='<div class="n">'+fa(b.toFixed(1))+'</div><p>'+c+'</p><div class="bmi-bar"><i style="inset-inline-start:'+p+'%"></i></div>';});})();` },
    { id: "plans", html: () => `<section class="sec" id="plans" style="background:var(--surface)"><div class="wrap">
      <div class="sec-head"><h2>بسته‌های مشاوره</h2><p>همه‌ی بسته‌ها به صورت حضوری و آنلاین وجود دارد.</p></div>
      <div class="plans">${[["یک جلسه", "۱٬۲۰۰٬۰۰۰", ["معاینه و آنالیز بدن", "برنامه‌ی غذایی یک‌ماهه"], false], ["۴ هفته", "۳٬۹۰۰٬۰۰۰", ["۲ جلسه‌ی حضوری", "پیگیری هفتگی در پیام‌رسان", "تغییر برنامه در وسط دوره"], true], ["۱۲ هفته", "۹٬۵۰۰٬۰۰۰", ["۴ جلسه‌ی حضوری", "پیگیری هفتگی", "برنامه‌ی ورزشی هماهنگ با رژیم"], false]].map(([t, p, l, hot]) => `<article class="${hot ? "hot" : ""}"><h3>${t}</h3><p class="price">${p}<small> تومان</small></p><ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul><a class="btn${hot ? "" : " ghost"}" href="#booking">انتخاب این بسته</a></article>`).join("")}</div>
      <p class="muted" style="margin-top:14px;font-size:.88rem">قیمت‌ها نمونه است.</p></div></section>`,
      css: `.t-nutrition .plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:stretch}
.t-nutrition .plans article{background:var(--bg);border:1px solid var(--line);border-radius:24px;padding:28px;display:flex;flex-direction:column;gap:12px}
.t-nutrition .plans article.hot{background:var(--primary);color:#fff;border-color:var(--primary)}
.t-nutrition .plans h3{font-size:1.4rem;font-weight:900}
.t-nutrition .price{font-size:1.9rem;font-weight:900}.t-nutrition .price small{font-size:.9rem;font-weight:500}
.t-nutrition .plans ul{margin:0;padding-inline-start:18px;display:grid;gap:6px;flex:1}
.t-nutrition .plans .hot .btn{background:var(--accent);color:#2E1506}
.t-nutrition .plans .btn{justify-content:center}
@media (max-width:860px){.t-nutrition .plans{grid-template-columns:1fr}}` },
  ],
  navExtra: [["#plans", "بسته‌ها"]],
  bookingTitle: "نوبت مشاوره",
  hours: [9, 17], closedDays: [5, 6], slotMinutes: 30,
  faq: [["با این رژیم گرسنه می‌مانم؟", "خیر. برنامه طوری نوشته می‌شود که سیر بمانید و غذاهای خانواده را کنار نگذارید."], ["مشاوره‌ی آنلاین چطور انجام می‌شود؟", "با تماس تصویری؛ برنامه‌ی غذایی هم به صورت فایل برایتان فرستاده می‌شود."], ["برای جلسه‌ی اول چه بیاورم؟", "آزمایش خون اخیر و فهرست داروها و مکمل‌هایی که مصرف می‌کنید."], ["برای دیابت هم برنامه می‌نویسید؟", "بله، با هماهنگی پزشک معالج شما."]],
  contact: { address: "یزد، بلوار جمهوری، ساختمان سلامت سبزینه، طبقه‌ی دوم", phone: "۰۳۵-۱۲۳۴ ۵۶۷۸", hours: "شنبه تا چهارشنبه، ۹ تا ۱۷" },
  prompts: {
    hero: "Photorealistic bright portrait of a cheerful Iranian female nutritionist in her thirties wearing a lime-green headscarf and a white coat, standing at a light wooden counter with colorful bowls of fresh vegetables, fruits, herbs and Persian bread, fresh green and tangerine accents, airy daylight, lifestyle-editorial photography, no text, no logos",
    clinic: "Photorealistic wide photo of a bright nutrition consultation room: light wooden desk, body composition analyzer scale, bowl of fresh fruit, lime-green accent wall with a large plant, tangerine chairs, airy daylight, friendly and fresh, no people, no text, no logos",
    detail: "Photorealistic overhead photo of colorful healthy bowls with fresh salad, lentils, pomegranate seeds, herbs, yogurt and citrus on a light wooden table, fresh green and orange palette, natural daylight, no text, no logos",
  },
},
];
