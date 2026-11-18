// Builds the 10 specialty demo sites (Persian, RTL) into ainoor/templates/<slug>/index.html
// plus the gallery data. Each template = shared base (header, booking preview, FAQ, contact,
// demo ribbon) + its own palette, fonts, hero variant, service layout and signature sections
// (defined in specs-*.mjs). Images: img/<name>.webp when generated (images.py), else an SVG
// placeholder in the template's colours.
//
//   node tools/templates/build.mjs          # writes templates/*/index.html (+ placeholders)
//
import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import specsA from "./specs-1.mjs";
import specsB from "./specs-2.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "templates");
export const SPECS = [...specsA, ...specsB];

export const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const fa = (s) => String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

/* ---------- icons (stroke, currentColor) ---------- */
const P = {
  baby: '<circle cx="12" cy="8" r="4"/><path d="M9.5 7.5h.01M14.5 7.5h.01M10.5 10c.8.6 2.2.6 3 0M5 21c1-4 4-6 7-6s6 2 7 6"/>',
  tooth: '<path d="M7 3c-2 0-3.5 1.6-3.5 4 0 3 1.5 4.5 2 7.5.4 2.5.8 6.5 2.3 6.5 1.6 0 1.4-5 4.2-5s2.6 5 4.2 5c1.5 0 1.9-4 2.3-6.5.5-3 2-4.5 2-7.5 0-2.4-1.5-4-3.5-4-2 0-3 1-5 1s-3-1-5-1z"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  bone: '<path d="M17 3a3 3 0 0 0-2.8 4.1L7.1 14.2A3 3 0 1 0 9.8 18a3 3 0 1 0 4-2.7l7.1-7.1A3 3 0 1 0 17 3z"/>',
  brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-2zM15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  ear: '<path d="M6 9a6 6 0 1 1 12 0c0 3-2 4-3 5.5S14 18 12.5 20 8 21 8 18"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3.5"/>',
  leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z"/><path d="M5 19l8-8"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  home: '<path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  ruler: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  pin: '<path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  steth: '<path d="M6 3v5a4 4 0 0 0 8 0V3M5 3h2M13 3h2M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 15A8 8 0 1 1 9 4a6.5 6.5 0 0 0 11 11z"/>',
  scale: '<path d="M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM8 21h8"/>',
  run: '<circle cx="14" cy="4.5" r="2"/><path d="M5 21l4-6 3 2 2-5 4 2M9 9l3-2 3 1"/>',
};
export const icon = (name, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.spark}</svg>`;

/* ---------- images: generated webp, else a placeholder svg in theme colours ---------- */
const IMG_SIZE = { hero: [800, 1000], clinic: [1200, 800], detail: [900, 900] };
export function img(spec, name) {
  const dir = join(OUT, spec.slug, "img");
  if (existsSync(join(dir, `${name}.webp`))) { rmSync(join(dir, `${name}.svg`), { force: true }); return `img/${name}.webp`; }
  mkdirSync(dir, { recursive: true });
  const [w, h] = IMG_SIZE[name] || [1000, 800];
  const c = spec.colors;
  writeFileSync(join(dir, `${name}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.primary}"/><stop offset="1" stop-color="${c.accent}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)" opacity=".85"/>
<circle cx="${w * .7}" cy="${h * .3}" r="${Math.min(w, h) * .28}" fill="${c.surface}" opacity=".25"/>
<text x="50%" y="52%" text-anchor="middle" font-family="Tahoma,sans-serif" font-size="${Math.round(w / 22)}" fill="${c.surface}" opacity=".9">تصویر نمونه — ${esc(name)}</text></svg>`);
  return `img/${name}.svg`;
}

/* ---------- shared base CSS (themes set the variables) ---------- */
const BASE_CSS = `
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:17px;line-height:1.85;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit}
:focus-visible{outline:3px solid var(--focus,var(--primary));outline-offset:3px;border-radius:6px}
.skip{position:absolute;inset-inline-start:-999px;top:8px;background:var(--ink);color:var(--bg);padding:8px 14px;border-radius:8px;z-index:99}
.skip:focus{inset-inline-start:12px}
.wrap{width:min(1160px,100% - 40px);margin-inline:auto}
.ic{width:24px;height:24px;flex:none}
h1,h2,h3{font-family:var(--font-display);font-weight:var(--display-weight,700);line-height:1.35;margin:0;letter-spacing:0}
h1{font-size:clamp(2.1rem,1.2rem + 3.6vw,3.9rem);line-height:1.25}
h2{font-size:clamp(1.6rem,1.1rem + 1.9vw,2.5rem)}
h3{font-size:1.15rem}
p{margin:0}
.muted{color:var(--muted)}
.sec{padding-block:clamp(64px,5vw + 40px,120px)}
.sec-head{max-width:660px;margin-bottom:clamp(28px,3vw,48px)}
.sec-head p{margin-top:12px;color:var(--muted)}
.btn{display:inline-flex;align-items:center;gap:10px;font:inherit;font-weight:700;text-decoration:none;border:0;cursor:pointer;padding:14px 26px;border-radius:var(--btn-radius,999px);background:var(--primary);color:var(--on-primary,#fff);transition:transform .15s ease,background-color .15s ease}
.btn:hover{background:var(--primary-deep)}
.btn:active{transform:translateY(1px)}
.btn.ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--line-strong,var(--line))}
.btn.ghost:hover{background:var(--surface)}
/* header */
.site-head{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.site-head .wrap{display:flex;align-items:center;gap:20px;min-height:72px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;min-width:0}
.brand .mark{width:42px;height:42px;display:grid;place-items:center;background:var(--primary);color:var(--on-primary,#fff);border-radius:var(--mark-radius,50%);font-family:var(--font-display);font-size:1.15rem;flex:none}
.brand b{display:block;font-family:var(--font-display);font-weight:var(--display-weight,700);font-size:1.05rem;line-height:1.3;white-space:nowrap}
.brand small{display:block;color:var(--muted);font-size:.8rem;line-height:1.3}
.site-nav{display:flex;gap:4px;margin-inline-start:auto}
.site-nav a{text-decoration:none;padding:8px 12px;border-radius:10px;font-size:.95rem;color:var(--muted)}
.site-nav a:hover{color:var(--ink);background:var(--surface)}
.site-head .btn{padding:10px 20px}
@media (max-width:900px){.site-nav{display:none}.site-head .btn{margin-inline-start:auto}}
@media (max-width:420px){.brand small{display:none}.site-head .btn{padding:9px 14px;font-size:.92rem}}
/* about */
.about{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,5vw,72px);align-items:center}
.about .photo{border-radius:var(--img-radius,24px);overflow:hidden;aspect-ratio:3/2}
.about .photo img{width:100%;height:100%;object-fit:cover}
.creds{list-style:none;padding:0;margin:22px 0 0;display:grid;gap:12px}
.creds li{display:flex;gap:12px;align-items:flex-start}
.creds .ic{color:var(--primary);margin-top:4px}
@media (max-width:820px){.about{grid-template-columns:1fr}}
/* services */
.svc-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px}
.svc-cards article{background:var(--surface);border-radius:var(--card-radius,20px);padding:26px;border:1px solid var(--line)}
.svc-cards .ic{color:var(--primary);width:30px;height:30px;margin-bottom:14px}
.svc-cards p{color:var(--muted);margin-top:8px;font-size:.96rem}
.svc-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 48px;border-top:1px solid var(--line)}
.svc-list article{display:flex;gap:16px;padding:22px 0;border-bottom:1px solid var(--line)}
.svc-list .ic{color:var(--primary);margin-top:6px}
.svc-list p{color:var(--muted);margin-top:4px;font-size:.96rem}
@media (max-width:720px){.svc-list{grid-template-columns:1fr}}
.svc-chips{display:flex;flex-wrap:wrap;gap:12px}
.svc-chips span{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;background:var(--surface);border:1px solid var(--line);font-weight:600}
.svc-chips .ic{color:var(--primary);width:20px;height:20px}
/* booking preview */
.booking{background:var(--surface);border-radius:var(--card-radius,28px);padding:clamp(22px,4vw,44px);border:1px solid var(--line)}
.bk-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(20px,4vw,48px)}
@media (max-width:860px){.bk-grid{grid-template-columns:1fr}}
.bk-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}
.bk-days button,.bk-times button{font:inherit;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:14px;cursor:pointer;transition:background-color .15s,border-color .15s}
.bk-days button{padding:10px 2px;font-size:.82rem;line-height:1.5}
.bk-days button b{display:block;font-size:1.05rem}
.bk-days button[disabled]{opacity:.38;cursor:not-allowed;text-decoration:line-through}
.bk-days button[aria-pressed=true],.bk-times button[aria-pressed=true]{background:var(--primary);color:var(--on-primary,#fff);border-color:var(--primary)}
.bk-days button:not([disabled]):hover,.bk-times button:not([disabled]):hover{border-color:var(--primary)}
.bk-times{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:8px;margin-top:18px}
.bk-times button{padding:9px 4px}
.bk-times button[disabled]{opacity:.35;cursor:not-allowed}
.bk-label{font-weight:700;margin:0 0 10px}
.bk-form{display:grid;gap:12px;align-content:start}
.bk-form label{display:grid;gap:6px;font-size:.92rem;font-weight:600}
.bk-form input{font:inherit;padding:12px 14px;border-radius:12px;border:1px solid var(--line-strong,var(--line));background:var(--bg);color:var(--ink)}
.bk-sum{padding:14px 16px;border-radius:14px;background:var(--bg);border:1px dashed var(--line-strong,var(--line));font-size:.95rem}
.bk-done{display:none;padding:16px;border-radius:14px;background:var(--primary);color:var(--on-primary,#fff)}
.bk-done.show{display:block}
.bk-note{font-size:.82rem;color:var(--muted)}
/* faq */
.faq{display:grid;gap:12px;max-width:820px}
.faq details{background:var(--surface);border:1px solid var(--line);border-radius:var(--card-radius,18px);padding:4px 22px}
.faq summary{cursor:pointer;list-style:none;padding:16px 0;font-weight:700;display:flex;justify-content:space-between;gap:16px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font-size:1.4rem;line-height:1;color:var(--primary)}
.faq details[open] summary::after{content:"−"}
.faq details p{padding-bottom:18px;color:var(--muted)}
/* contact */
.contact{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:stretch}
@media (max-width:820px){.contact{grid-template-columns:1fr}}
.c-list{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:18px}
.c-list li{display:flex;gap:14px}
.c-list .ic{color:var(--primary);margin-top:4px}
.map{min-height:300px;border-radius:var(--card-radius,24px);border:1px solid var(--line);overflow:hidden;position:relative;background:var(--surface)}
.map svg{position:absolute;inset:0;width:100%;height:100%}
.map .pinbox{position:absolute;inset:auto 18px 18px auto;display:flex;gap:10px}
/* footer + demo ribbon */
.site-foot{border-top:1px solid var(--line);padding:28px 0 110px;color:var(--muted);font-size:.9rem}
.site-foot .wrap{display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:space-between}
.demo-pill{position:fixed;inset-block-end:16px;inset-inline-start:16px;z-index:50;display:flex;align-items:center;gap:12px;padding:10px 10px 10px 16px;background:#16131F;color:#fff;border-radius:999px;box-shadow:0 10px 30px rgba(10,8,20,.28);font-size:.86rem;max-width:calc(100% - 32px)}
.demo-pill span{opacity:.82}
.demo-pill a{background:#FF8A5B;color:#16131F;text-decoration:none;font-weight:800;padding:8px 14px;border-radius:999px;white-space:nowrap}
.demo-pill a:hover{background:#FFB84D}
@media (max-width:520px){.demo-pill span{display:none}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

/* ---------- shared sections ---------- */
function header(s) {
  const nav = [["#about", "درباره‌ی پزشک"], ["#services", "خدمات"], ...(s.navExtra || []), ["#booking", "نوبت"], ["#faq", "سؤالات متداول"], ["#contact", "تماس"]];
  return `<header class="site-head"><div class="wrap">
  <a class="brand" href="#top"><span class="mark" aria-hidden="true">${esc(s.mark)}</span><span><b>${esc(s.doctor)}</b><small>${esc(s.title)}</small></span></a>
  <nav class="site-nav" aria-label="بخش‌های صفحه">${nav.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join("")}</nav>
  <a class="btn" href="#booking">${esc(s.ctaShort || "نوبت بگیرید")}</a>
</div></header>`;
}

function about(s) {
  return `<section class="sec" id="about"><div class="wrap about">
  <div class="photo"><img src="${img(s, "clinic")}" alt="${esc(s.alts.clinic)}" loading="lazy" width="1200" height="800"></div>
  <div><h2>${esc(s.about.title)}</h2><p style="margin-top:16px">${esc(s.about.text)}</p>
    <ul class="creds">${s.about.creds.map((c) => `<li>${icon("check")}<span>${esc(c)}</span></li>`).join("")}</ul></div>
</div></section>`;
}

function services(s) {
  const items = s.services;
  let body;
  if (s.servicesStyle === "list") body = `<div class="svc-list">${items.map((x) => `<article>${icon(x.icon)}<div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div></article>`).join("")}</div>`;
  else if (s.servicesStyle === "chips") body = `<div class="svc-chips">${items.map((x) => `<span>${icon(x.icon)}${esc(x.t)}</span>`).join("")}</div>`;
  else body = `<div class="svc-cards">${items.map((x) => `<article>${icon(x.icon)}<h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></article>`).join("")}</div>`;
  return `<section class="sec${s.servicesTint ? " tint" : ""}" id="services"><div class="wrap">
  <div class="sec-head"><h2>${esc(s.servicesTitle || "خدمات")}</h2>${s.servicesIntro ? `<p>${esc(s.servicesIntro)}</p>` : ""}</div>${body}
</div></section>`;
}

function booking(s) {
  return `<section class="sec" id="booking"><div class="wrap">
  <div class="sec-head"><h2>${esc(s.bookingTitle || "نوبت آنلاین")}</h2><p>${esc(s.bookingIntro || "روز و ساعت را انتخاب کنید؛ پیامک تأیید برایتان ارسال می‌شود.")}</p></div>
  <div class="booking" data-closed="${(s.closedDays || [4, 5]).join(",")}" data-hours="${s.hours.join(",")}" data-step="${s.slotMinutes || 20}">
    <div class="bk-grid">
      <div><p class="bk-label">روز</p><div class="bk-days" role="group" aria-label="روز نوبت"></div>
        <p class="bk-label" style="margin-top:22px">ساعت</p><div class="bk-times" role="group" aria-label="ساعت نوبت"><p class="muted">ابتدا یک روز را انتخاب کنید.</p></div></div>
      <form class="bk-form" novalidate>
        <div class="bk-sum" aria-live="polite">هنوز زمانی انتخاب نشده است.</div>
        <label>نام و نام خانوادگی<input name="n" autocomplete="name" placeholder="مثلاً سارا محمدی"></label>
        <label>شماره موبایل<input name="m" inputmode="tel" dir="ltr" placeholder="0912 000 0000"></label>
        <button class="btn" type="submit">ثبت نوبت</button>
        <div class="bk-done" role="status"></div>
        <p class="bk-note">این فقط نمونه است. در سایت واقعی، نوبت ثبت می‌شود و پیامک تأیید و لینک لغو نوبت برای بیمار فرستاده می‌شود.</p>
      </form>
    </div>
  </div>
</div></section>`;
}

function faq(s) {
  return `<section class="sec" id="faq"><div class="wrap">
  <div class="sec-head"><h2>سؤالات متداول</h2></div>
  <div class="faq">${s.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
</div></section>`;
}

function contact(s) {
  const c = s.contact, col = s.colors;
  return `<section class="sec" id="contact"><div class="wrap contact">
  <div><h2>${esc(c.title || "آدرس و تماس")}</h2>
    <ul class="c-list">
      <li>${icon("pin")}<span>${esc(c.address)}</span></li>
      <li>${icon("phone")}<span dir="ltr">${esc(c.phone)}</span></li>
      <li>${icon("clock")}<span>${esc(c.hours)}</span></li>
    </ul></div>
  <div class="map" role="img" aria-label="نقشه‌ی محل مطب (نمونه)">
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill="${col.surface}"/>
      <g stroke="${col.line}" stroke-width="10" fill="none" stroke-linecap="round">
        <path d="M-10 90 Q120 70 200 120 T410 110"/><path d="M60 -10 L110 310"/><path d="M-10 220 L410 190"/><path d="M290 -10 Q260 140 330 310"/></g>
      <g stroke="${col.line}" stroke-width="3" fill="none" opacity=".7"><path d="M-10 40 L410 30"/><path d="M180 -10 L170 310"/><path d="M-10 270 L410 255"/></g>
      <circle cx="205" cy="150" r="34" fill="${col.primary}" opacity=".18"/>
      <path d="M205 172s-20-18-20-34a20 20 0 0 1 40 0c0 16-20 34-20 34z" fill="${col.primary}"/><circle cx="205" cy="137" r="7" fill="${col.surface}"/>
    </svg>
    <div class="pinbox"><a class="btn" href="#contact">مسیریابی با نشان</a></div>
  </div>
</div></section>`;
}

/* ---------- booking preview (client JS, shared) ---------- */
const BOOKING_JS = `
(function(){
  var root=document.querySelector('.booking'); if(!root) return;
  var closed=root.dataset.closed.split(',').map(Number), hours=root.dataset.hours.split(',').map(Number), step=+root.dataset.step;
  var days=root.querySelector('.bk-days'), times=root.querySelector('.bk-times'), sum=root.querySelector('.bk-sum'), form=root.querySelector('form'), done=root.querySelector('.bk-done');
  var fmtW=new Intl.DateTimeFormat('fa-IR',{weekday:'short'}), fmtD=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{day:'numeric'}), fmtL=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{weekday:'long',day:'numeric',month:'long'});
  var pick={};
  function fa(n){return String(n).replace(/\\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
  function hm(m){return fa(String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'))}
  for(var i=0;i<7;i++){
    var d=new Date(); d.setDate(d.getDate()+i);
    var jsDay=d.getDay(), iran=(jsDay+1)%7; // 0 = Saturday
    var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-pressed','false');
    b.innerHTML=fmtW.format(d)+'<b>'+fmtD.format(d)+'</b>';
    if(closed.indexOf(iran)>-1){b.disabled=true;b.title='تعطیل';}
    (function(d,b){b.addEventListener('click',function(){
      days.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')}); b.setAttribute('aria-pressed','true');
      pick={day:fmtL.format(d)}; renderTimes(d.getDate()); update();
    })})(d,b);
    days.appendChild(b);
  }
  function renderTimes(seed){
    times.innerHTML='';
    for(var m=hours[0]*60;m<hours[1]*60;m+=step){
      var t=document.createElement('button'); t.type='button'; t.textContent=hm(m); t.setAttribute('aria-pressed','false');
      if(((m/step)+seed)%4===1){t.disabled=true;t.title='پر شده';}
      (function(t,label){t.addEventListener('click',function(){
        times.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')}); t.setAttribute('aria-pressed','true');
        pick.time=label; update();
      })})(t,hm(m));
      times.appendChild(t);
    }
  }
  function update(){ sum.textContent = pick.day ? (pick.day + (pick.time ? '، ساعت '+pick.time : ' — ساعت را انتخاب کنید')) : 'هنوز زمانی انتخاب نشده است.'; done.classList.remove('show'); }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!pick.time){ sum.textContent='لطفاً روز و ساعت نوبت را انتخاب کنید.'; return; }
    var n=(form.n.value||'').trim()||'شما';
    done.textContent='✅ '+n+'، نوبت '+pick.day+' ساعت '+pick.time+' ثبت شد. (این نمونه است؛ در سایت واقعی پیامک تأیید فرستاده می‌شود.)';
    done.classList.add('show');
  });
})();`;

/* ---------- page ---------- */
function themeVars(s) {
  const c = s.colors;
  return `:root{--bg:${c.bg};--surface:${c.surface};--ink:${c.ink};--muted:${c.muted};--primary:${c.primary};--primary-deep:${c.primaryDeep};--on-primary:${c.onPrimary || "#fff"};--accent:${c.accent};--line:${c.line};--line-strong:${c.lineStrong || c.line};--font-display:${s.fonts.display};--font-body:${s.fonts.body};--display-weight:${s.fonts.displayWeight || 700};${s.vars || ""}}`;
}

function page(s) {
  const parts = { hero: s.hero(s), about: about(s), services: services(s), booking: booking(s), faq: faq(s), contact: contact(s), ...Object.fromEntries((s.sections || []).map((x) => [x.id, x.html(s)])) };
  const order = s.order || ["hero", "about", "services", ...(s.sections || []).map((x) => x.id), "booking", "faq", "contact"];
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.doctor)} — ${esc(s.title)} | نمونه قالب آینور</title>
<meta name="description" content="${esc(s.tagline)}">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${s.fonts.google}&display=swap" rel="stylesheet">
<style>${themeVars(s)}${BASE_CSS}${s.css || ""}${(s.sections || []).map((x) => x.css || "").join("")}</style>
</head>
<body class="t-${s.slug}" id="top">
<a class="skip" href="#main">رفتن به محتوای اصلی</a>
${header(s)}
<main id="main">
${order.map((k) => parts[k]).join("\n")}
</main>
<footer class="site-foot"><div class="wrap"><span>© ${esc(s.doctor)} — ${esc(s.title)}</span><span>طراحی و ساخت: <a href="/">آینور</a></span></div></footer>
<div class="demo-pill" role="note"><span>قالب «${esc(s.name)}» (نمونه؛ نام‌ها و اطلاعات واقعی نیستند)</span><a href="/intake?template=${s.slug}">این قالب را می‌خواهم</a></div>
<script>${BOOKING_JS}${(s.sections || []).map((x) => x.js || "").join("\n")}</script>
</body>
</html>
`;
}

/* ---------- gallery (/templates/) in the Ainoor brand ---------- */
function gallery(cards) {
  // Each template's name is set in its own display face; text= subsets the fonts to just those letters.
  const fams = [...new Set(SPECS.map((s) => s.fonts.google.split("&")[0]))].join("&");
  const letters = encodeURIComponent([...new Set(SPECS.map((s) => s.name).join(""))].join(""));
  const card = (c, i) => `<li class="tpl" style="--p:${c.colors[0]};--a:${c.colors[1]};--b:${c.colors[2]};--k:${c.colors[3]}">
  <a class="shot" href="/templates/${c.slug}/" aria-label="دیدن نمونه‌ی قالب ${esc(c.name)}">
    <span class="bar" aria-hidden="true"><i></i><i></i><i></i></span>
    <img src="${c.image}" alt="" loading="${i < 3 ? "eager" : "lazy"}" width="800" height="1000">
  </a>
  <div class="meta">
    <p class="spec">${esc(c.specialty)}</p>
    <h2 style="font-family:${esc(c.font)};font-weight:${c.weight}">${esc(c.name)}</h2>
    <p class="look">${esc(c.look)}</p>
    <ul class="feat">${c.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
    <span class="sw" aria-hidden="true">${c.colors.map((x) => `<b style="background:${x}"></b>`).join("")}</span>
    <div class="act"><a class="btn btn-ghost btn-sm" href="/templates/${c.slug}/">دیدن نمونه</a><a class="btn btn-noor btn-sm" href="/intake?template=${c.slug}">انتخاب این قالب</a></div>
  </div></li>`;
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قالب‌های سایت پزشکی | آینور</title>
<meta name="description" content="ده قالب آماده‌ی سایت و نوبت‌دهی آنلاین برای پزشکان متخصص؛ یکی را انتخاب کنید تا با اطلاعات مطب شما ساخته شود.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;800&family=Instrument+Serif&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?${fams}&text=${letters}&display=swap" rel="stylesheet">
<style>
:root{--canvas:#FDF8F3;--panel:#fff;--sand:#F3EBE1;--accent:#FF8A5B;--gold:#FFB84D;--teal:#0E7C7B;--t1:#141A21;--t2:#5A6472;--ink:#0B0F14;--line:rgba(20,26,33,.12);--line-strong:#7A8491;--noor:linear-gradient(90deg,#FFB84D,#FF8A5B);--ease:cubic-bezier(.22,1,.36,1)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;overflow-x:clip}
body{margin:0;background:var(--canvas);color:var(--t1);font:17px/1.85 Vazirmatn,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}a{color:inherit}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:8px}
.wrap{width:min(1180px,100% - 32px);margin-inline:auto}
.skip{position:absolute;inset-inline-start:16px;top:-60px;background:var(--t1);color:#fff;padding:10px 16px;border-radius:10px;z-index:9}.skip:focus{top:12px}
header{padding:18px 0;border-bottom:1px solid var(--line)}
header .wrap{display:flex;align-items:center;gap:16px}
.brand{display:inline-flex;align-items:baseline;gap:10px;text-decoration:none;font-weight:800;font-size:1.4rem}
.brand i{font-style:normal;font-family:'Instrument Serif',serif;font-weight:400;font-size:1.2rem;color:var(--t2)}
.brand .dot{width:10px;height:10px;border-radius:50%;background:var(--noor);box-shadow:0 0 14px rgba(255,184,77,.9);align-self:center}
header nav{margin-inline-start:auto;display:flex;gap:10px;align-items:center}
header nav a.home{color:var(--t2);text-decoration:none;font-size:.95rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;font:600 1rem Vazirmatn,sans-serif;border-radius:999px;padding:12px 22px;border:1px solid transparent;cursor:pointer;transition:transform .3s var(--ease),box-shadow .3s var(--ease),background .3s var(--ease)}
.btn:active{transform:translateY(1px)}
.btn-noor{background:var(--noor);color:var(--ink);box-shadow:0 8px 24px -12px rgba(255,138,91,.8)}
.btn-noor:hover{transform:translateY(-2px);box-shadow:0 14px 30px -14px rgba(255,138,91,.95)}
.btn-ghost{background:#fff;border-color:var(--line-strong);color:var(--t1)}
.btn-ghost:hover{transform:translateY(-2px)}
.btn-sm{padding:8px 16px;font-size:.9rem}
.intro{padding:56px 0 32px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:40px;align-items:end}
.intro h1{font-weight:800;font-size:clamp(2rem,1.2rem + 3vw,3.3rem);line-height:1.35;margin:0}
.intro p{margin:0;color:var(--t2);max-width:46ch}
.steps{list-style:none;margin:0;padding:0;display:grid;gap:8px;counter-reset:s}
.steps li{counter-increment:s;display:flex;gap:12px;align-items:baseline;color:var(--t2)}
.steps li::before{content:counter(s,persian);flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--sand);color:var(--t1);font-weight:800;font-size:.9rem}
.grid{list-style:none;margin-block:0;padding:24px 0 72px;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:28px 24px}
.tpl{display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:22px;overflow:hidden}
.shot{display:block;position:relative;background:var(--b);padding:12px 12px 0;text-decoration:none;border-bottom:4px solid var(--p)}
.shot .bar{display:flex;gap:5px;padding:0 4px 8px}.shot .bar i{width:8px;height:8px;border-radius:50%;background:var(--k);opacity:.25}
.shot img{width:100%;height:auto;aspect-ratio:16/11;object-fit:cover;object-position:center 20%;border-radius:12px 12px 0 0;transition:transform .5s var(--ease)}
.shot:hover img{transform:translateY(-4px)}
.meta{padding:20px 22px 22px;display:flex;flex-direction:column;gap:6px;flex:1}
.spec{margin:0;color:var(--teal);font-weight:500;font-size:.92rem}
.meta h2{margin:0;font-size:2.1rem;line-height:1.3;color:var(--k)}
.look{margin:0;color:var(--t2);font-size:.95rem}
.feat{margin:6px 0 0;padding:0;list-style:none;display:grid;gap:2px;font-size:.93rem}
.feat li{display:flex;gap:8px;align-items:baseline}.feat li::before{content:"";flex:none;width:6px;height:6px;border-radius:50%;background:var(--p);transform:translateY(-2px)}
.sw{display:flex;gap:6px;margin-top:10px}.sw b{width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)}
.act{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto;padding-top:16px}
.custom{background:var(--sand);border:1px dashed var(--line-strong);border-radius:22px;padding:28px;display:flex;flex-direction:column;justify-content:center;gap:10px}
.custom h2{margin:0;font-size:1.6rem;font-weight:800}.custom p{margin:0;color:var(--t2)}
.custom .btn{align-self:flex-start;margin-top:8px}
.note{color:var(--t2);font-size:.9rem;padding-bottom:48px;margin-block:0}
footer{background:var(--sand);padding:28px 0;color:var(--t2);font-size:.92rem}
footer .wrap{display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:space-between}footer a{text-decoration:none}
@media (max-width:820px){.intro{grid-template-columns:1fr;padding-top:36px}}
@media (max-width:420px){header nav a.home{display:none}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<a class="skip" href="#list">رفتن به قالب‌ها</a>
<header><div class="wrap"><a class="brand" href="/" aria-label="آینور، صفحه‌ی اصلی"><span class="dot" aria-hidden="true"></span>آینور<i>ainoor</i></a>
<nav><a class="home" href="/">صفحه‌ی اصلی</a><a class="btn btn-noor btn-sm" href="/intake">درخواست سرویس</a></nav></div></header>
<main>
<section class="wrap intro">
  <div><h1>قالب سایت مطبتان را انتخاب کنید</h1>
  <p>ده طرح آماده برای ده تخصص. هر کدام یک سایت کامل یک‌صفحه‌ای با نوبت‌دهی آنلاین است. نمونه را ببینید و قالبی را که می‌پسندید انتخاب کنید؛ ما آن را با نام، عکس‌ها، خدمات و ساعت کاری مطب شما می‌سازیم.</p></div>
  <ol class="steps"><li>نمونه‌ها را ببینید</li><li>«انتخاب این قالب» را بزنید و فرم اطلاعات مطب را پر کنید</li><li>ما نسخه‌ی اول سایت را می‌سازیم و تغییرات را با هم انجام می‌دهیم</li></ol>
</section>
<ul class="wrap grid" id="list">
${cards.map(card).join("\n")}
<li class="custom"><h2>طرح اختصاصی</h2><p>هیچ‌کدام را نپسندیدید، یا لوگو و رنگ‌های خودتان را دارید؟ یک طرح کاملاً جدید برایتان می‌سازیم.</p><a class="btn btn-ghost btn-sm" href="/intake?template=custom">درخواست طرح اختصاصی</a></li>
</ul>
<p class="wrap note">رنگ، فونت و بخش‌های هر قالب را می‌شود تغییر داد. نام پزشکان، شماره‌ها و آدرس‌ها در نمونه‌ها واقعی نیستند و عکس‌ها با هوش مصنوعی ساخته شده‌اند.</p>
</main>
<footer><div class="wrap"><span>© آینور، سایت و نوبت‌دهی هوشمند برای پزشکان</span><a href="/">ainoor.io</a></div></footer>
</body>
</html>
`;
}

if (process.argv[1] && process.argv[1].endsWith("build.mjs")) {
  mkdirSync(OUT, { recursive: true });
  for (const s of SPECS) {
    mkdirSync(join(OUT, s.slug), { recursive: true });
    writeFileSync(join(OUT, s.slug, "index.html"), page(s));
    console.log("built", s.slug);
  }
  const cards = SPECS.map((s) => ({ slug: s.slug, name: s.name, specialty: s.specialtyLabel, look: s.look, features: s.features,
    font: s.fonts.display, weight: s.fonts.displayWeight || 700,
    colors: [s.colors.primary, s.colors.accent, s.colors.bg, s.colors.ink], image: `/templates/${s.slug}/${img(s, "hero")}` }));
  writeFileSync(join(OUT, "index.html"), gallery(cards));
  // The intake form's template picker reads this (.json isn't served, so it's a script).
  writeFileSync(join(OUT, "cards.js"), `window.AINOOR_TEMPLATES=${JSON.stringify(cards.map(({ slug, name, specialty, colors, image }) => ({ slug, name, specialty, colors, image })))};\n`);
  // images.py reads the photo prompts from here (tools/ is never deployed).
  writeFileSync(join(HERE, "prompts.json"), JSON.stringify(Object.fromEntries(SPECS.map((s) => [s.slug, s.prompts])), null, 2));
  console.log("wrote templates/index.html + cards.js + tools/templates/prompts.json");
}
