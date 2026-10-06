// Ainoor — agency landing page + lead capture.
// Zero npm dependencies: Node's built-in http + fetch only. Serves the static site and
// exposes POST /api/lead, which emails the request to you (Resend) and keeps a JSON backup.
//
// Env (Coolify):
//   PORT=3000
//   DATA_DIR=/app/data                         (mount a volume here so leads.json survives redeploys)
//   RESEND_API_KEY=re_...                       (enables the lead email — resend.com)
//   MAIL_FROM=Ainoor <hello@ainoor.io>          (a verified Resend sender on ainoor.io)
//   LEAD_TO=gifani.codes@gmail.com              (where request emails are delivered)
//   MAIL_REPLY_FALLBACK=hello@ainoor.io         (optional reply-to when the lead left no email)

import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ENV = process.env;
const PORT = Number(ENV.PORT) || 3000;
const ROOT = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = ENV.DATA_DIR || ROOT;
const LEADS_DB = join(DATA_DIR, "leads.json");

const MAIL = {
  key: (ENV.RESEND_API_KEY || "").trim(),
  from: (ENV.MAIL_FROM || "Ainoor <hello@ainoor.io>").trim(),
  to: (ENV.LEAD_TO || "gifani.codes@gmail.com").trim(),
  replyFallback: (ENV.MAIL_REPLY_FALLBACK || "").trim(),
};
const MAIL_ON = !!(MAIL.key && MAIL.from && MAIL.to);

const PLANS = { basic: "پایه / Basic", pro: "حرفه‌ای / Pro", premium: "ویژه / Premium" };

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
};

const json = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json; charset=utf-8" }); res.end(JSON.stringify(obj)); };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function readBody(req) {
  return new Promise((resolve) => {
    let d = ""; req.on("data", (c) => { d += c; if (d.length > 1e5) req.destroy(); });
    req.on("end", () => resolve(d));
  });
}

async function loadLeads() { try { return JSON.parse(await readFile(LEADS_DB, "utf8")); } catch { return []; } }
async function saveLead(lead) {
  try {
    await mkdir(DATA_DIR, { recursive: true }).catch(() => {});
    const all = await loadLeads(); all.push(lead);
    await writeFile(LEADS_DB, JSON.stringify(all, null, 2));
  } catch (e) { console.error("lead save failed:", e.message); }
}

async function sendLeadEmail(lead) {
  if (!MAIL_ON) { console.log(`[MOCK lead email -> ${MAIL.to}]`, lead); return; }
  const rows = [
    ["نام / Name", lead.name], ["مطب/تخصص / Clinic", lead.clinic], ["تلفن / Phone", lead.phone],
    ["ایمیل / Email", lead.email], ["پلن / Plan", PLANS[lead.plan] || lead.plan || "—"],
    ["زبان صفحه / Page lang", lead.lang], ["زمان / Time", lead.at],
  ].filter(([, v]) => v);
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="color:#3F31A6;margin:0 0 4px">درخواست جدید — Ainoor</h2>
    <p style="color:#5B5878;margin:0 0 16px">A new request came in from the Ainoor site.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="padding:7px 10px;color:#5B5878;border-bottom:1px solid #eee;white-space:nowrap">${esc(k)}</td><td style="padding:7px 10px;color:#191733;border-bottom:1px solid #eee"><strong>${esc(v)}</strong></td></tr>`).join("")}
    </table>
    ${lead.message ? `<div style="margin-top:16px"><div style="color:#5B5878;font-size:13px;margin-bottom:6px">پیام / Message</div><div style="background:#FAF9FF;border:1px solid #eee;border-radius:10px;padding:12px 14px;color:#191733;white-space:pre-wrap">${esc(lead.message)}</div></div>` : ""}
    <p style="margin-top:18px;color:#8a88a0;font-size:12px">${lead.email ? `برای پاسخ، کافی است Reply بزنید (به ${esc(lead.email)} می‌رسد).` : "این درخواست ایمیل نداشت؛ از طریق تلفن تماس بگیرید."}</p>
  </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (lead.message ? `\n\nMessage:\n${lead.message}` : "");
  const replyTo = lead.email || MAIL.replyFallback;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${MAIL.key}`, "content-type": "application/json" },
      body: JSON.stringify({ from: MAIL.from, to: [MAIL.to], subject: `درخواست جدید Ainoor — ${lead.name}`, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!r.ok) console.error("lead email error:", ((await r.json().catch(() => ({}))).message) || r.status);
  } catch (e) { console.error("lead email failed:", e.message); }
}

// simple per-IP rate limit
const hits = new Map();
function rateOk(ip) {
  const now = Date.now(), WIN = 600000, MAX = 8; // 8 leads / 10 min / IP
  const arr = (hits.get(ip) || []).filter((t) => now - t < WIN);
  if (arr.length >= MAX) { hits.set(ip, arr); return false; }
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}

async function handleLead(req, res) {
  const ip = String(req.headers["x-forwarded-for"] || (req.socket && req.socket.remoteAddress) || "").split(",")[0].trim();
  if (!rateOk(ip)) return json(res, 429, { ok: false, error: "too many requests" });
  let b;
  try { b = JSON.parse(await readBody(req)); } catch { return json(res, 400, { ok: false, error: "bad json" }); }
  const name = String(b.name || "").trim().slice(0, 120);
  const clinic = String(b.clinic || "").trim().slice(0, 160);
  const phone = String(b.phone || "").trim().slice(0, 40);
  const email = String(b.email || "").trim().slice(0, 160);
  const message = String(b.message || "").trim().slice(0, 2000);
  const plan = ["basic", "pro", "premium"].includes(b.plan) ? b.plan : "";
  const lang = b.lang === "en" ? "en" : "fa";
  if (b.company) return json(res, 200, { ok: true }); // honeypot: pretend success, drop
  const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || (!phone && !email) || !emailOk)
    return json(res, 400, { ok: false, error: "name and a phone or valid email are required" });
  const lead = { name, clinic, phone, email, message, plan, lang, at: new Date().toISOString(), ip };
  await saveLead(lead);
  await sendLeadEmail(lead);
  json(res, 200, { ok: true });
}

async function serveStatic(req, res) {
  let rel = decodeURIComponent((req.url || "/").split("?")[0]);
  if (rel === "/" || rel.endsWith("/")) rel = "/index.html";
  const full = normalize(join(ROOT, rel));
  if (!full.startsWith(ROOT.replace(/[\\/]$/, ""))) { res.writeHead(403); return res.end("403"); }
  try {
    const s = await stat(full);
    const file = s.isDirectory() ? join(full, "index.html") : full;
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file).toLowerCase()] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch { res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }); res.end("404 Not Found"); }
}

createServer(async (req, res) => {
  const path = (req.url || "/").split("?")[0];
  if (req.method === "POST" && path === "/api/lead") return handleLead(req, res);
  if (req.method === "GET" && path === "/api/leads") return json(res, 200, await loadLeads()); // local convenience
  if (req.method === "GET") return serveStatic(req, res);
  res.writeHead(405); res.end("405");
}).listen(PORT, () => {
  console.log(`Ainoor site on http://localhost:${PORT}`);
  console.log(MAIL_ON ? `Lead email: Resend configured (to ${MAIL.to}).` : "Lead email: MOCK (set RESEND_API_KEY + MAIL_FROM + LEAD_TO to send real emails). Leads still saved to leads.json.");
});
