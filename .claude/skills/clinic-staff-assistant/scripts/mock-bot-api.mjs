// Fake Bot API on :3999 (Telegram/Bale-compatible). Test drivers queue updates via POST /_push and read replies via GET /_sent.
// Voice notes the bot sends (sendVoice, multipart) are saved to VOICE_OUT so they can be listened to.
import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
const VOICE_FILE = process.env.VOICE_FILE, VOICE_DIR = process.env.VOICE_DIR, VOICE_OUT = process.env.VOICE_OUT;
const queue = [], sent = [];
let msgId = 1000, updateId = 1, voiceN = 0;
const raw = (req) => new Promise((r) => { const c = []; req.on("data", (d) => c.push(d)); req.on("end", () => r(Buffer.concat(c))); });
const ok = (res, result) => { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: true, result })); };
// Minimal multipart parser: text fields + the first file.
function multipart(buf, ctype) {
  const boundary = Buffer.from("--" + ctype.split("boundary=")[1]);
  const out = { fields: {}, file: null };
  let pos = buf.indexOf(boundary);
  while (pos !== -1) {
    const next = buf.indexOf(boundary, pos + boundary.length);
    if (next === -1) break;
    const part = buf.slice(pos + boundary.length + 2, next - 2);
    const sep = part.indexOf("\r\n\r\n");
    const head = part.slice(0, sep).toString(), body = part.slice(sep + 4);
    const name = (head.match(/name="([^"]+)"/) || [])[1];
    if (/filename=/.test(head)) out.file = { name, data: body }; else if (name) out.fields[name] = body.toString();
    pos = next;
  }
  return out;
}
createServer(async (req, res) => {
  const url = req.url;
  const buf = await raw(req);
  if (url === "/_push") { queue.push({ update_id: updateId++, ...JSON.parse(buf.toString()) }); return ok(res, true); }
  if (url === "/_sent") return ok(res, sent);
  if (url.startsWith("/file/")) { const id = url.split("/").pop(); res.writeHead(200, { "content-type": "audio/mpeg" }); return res.end(readFileSync(VOICE_DIR ? `${VOICE_DIR}/${id}.mp3` : VOICE_FILE)); }
  const method = url.split("/").pop();
  const ctype = req.headers["content-type"] || "";
  const p = ctype.startsWith("multipart/") ? multipart(buf, ctype) : { fields: buf.length ? JSON.parse(buf.toString()) : {} };
  const f = p.fields;
  if (method === "getUpdates") {
    const t0 = Date.now();
    while (!queue.length && Date.now() - t0 < 1500) await new Promise((r) => setTimeout(r, 100));
    return ok(res, queue.splice(0));
  }
  if (method === "getMe") return ok(res, { id: 999, is_bot: true, first_name: "Clinic", username: "clinic_bot", can_read_all_group_messages: true });
  if (method === "getFile") return ok(res, { file_id: f.file_id, file_path: `voice/${f.file_id}` });
  if (method === "sendMessage" || method === "sendVoice") {
    const m = { message_id: ++msgId, chat: { id: f.chat_id }, text: f.text || f.caption, reply_markup: typeof f.reply_markup === "string" ? JSON.parse(f.reply_markup) : f.reply_markup };
    if (method === "sendVoice" && p.file) { m.voiceBytes = p.file.data.length; m.voiceMagic = p.file.data.slice(0, 4).toString("latin1"); if (VOICE_OUT) writeFileSync(`${VOICE_OUT}/bot-reply-${++voiceN}.ogg`, p.file.data); }
    sent.push({ method, ...m }); return ok(res, m);
  }
  sent.push({ method, ...f });
  return ok(res, true);
}).listen(3999, () => console.log("mock bot api on :3999"));
