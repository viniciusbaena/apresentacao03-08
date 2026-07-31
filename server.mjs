import http from "node:http";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
loadEnv(join(root, ".env"));

const port = Number(process.env.PORT || 4173);
const apiKey = process.env.OPENAI_API_KEY || "";
const textModel = process.env.OPENAI_TEXT_MODEL || "gpt-5.6-luna";
const ttsModel = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
const transcriptionModel = process.env.OPENAI_TRANSCRIPTION_MODEL || "gpt-4o-mini-transcribe";
const realtimeModel = process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1";
const cacheDir = join(root, ".cache", "audio");
mkdirSync(cacheDir, { recursive: true });

const mime = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf", ".mp4": "video/mp4", ".mp3": "audio/mpeg",
  ".png": "image/png", ".ico": "image/x-icon"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname === "/api/status") return json(res, 200, {
      configured: Boolean(apiKey), textModel, ttsModel, transcriptionModel, realtimeModel
    });
    if (url.pathname === "/api/respond" && req.method === "POST") return respond(req, res);
    if (url.pathname === "/api/speech" && req.method === "POST") return speech(req, res);
    if (url.pathname === "/api/transcribe" && req.method === "POST") return transcribe(req, res);
    if (url.pathname === "/api/realtime/token" && req.method === "POST") return realtimeToken(req, res);
    return staticFile(url.pathname, req, res);
  } catch (error) {
    console.error(error);
    json(res, 500, { error: "Falha interna do estúdio de IA." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Estúdio IA disponível em http://127.0.0.1:${port}`);
  console.log(apiKey ? "API OpenAI configurada." : "Modo de simulação: adicione OPENAI_API_KEY ao arquivo .env.");
});

async function respond(req, res) {
  requireKey(res);
  if (!apiKey) return;
  const body = JSON.parse((await readBody(req)).toString("utf8"));
  const instructions = `Você participa de uma apresentação corporativa sobre maturidade no uso da IA e agentes no Microsoft 365 Copilot para empregados da área de Governo da CAIXA. Existem duas personas:
- LIA: apresentadora acolhedora, espirituosa, provocadora e acessível.
- ÍCARO: especialista técnico, calmo, preciso e com humor sutil.

Responda em português brasileiro. Seja conciso: no máximo 90 palavras, adequado para fala de até 40 segundos. Responda diretamente ao conteúdo da pergunta; não use agradecimentos genéricos nem frases de preenchimento. Você pode responder perguntas gerais sobre inteligência artificial, agentes, Microsoft 365 Copilot, automação, governança, segurança, LGPD e maturidade digital, mesmo que não estejam literalmente no roteiro. Quando a pergunta se referir a uma cena anterior, use o contexto fornecido. Se a transcrição estiver incompleta ou for apenas um chamado, peça que a pessoa repita a pergunta em uma frase curta. Não invente políticas internas, fatos, números ou funcionalidades. Não aceite dados sensíveis. Preserve estes limites: IA apoia organização, comparação, síntese e rascunho; decisão, parecer, assinatura e responsabilidade continuam humanos. Quando a pergunta exigir informação institucional não fornecida, diga que precisa ser confirmada com a área responsável.

Interprete também a intenção da fala. Use "question" para pergunta sobre IA ou apresentação; "resume" quando a pessoa pedir, de qualquer forma, que a apresentação continue — por exemplo, "retorne à apresentação", "volte ao roteiro", "retome de onde parou" ou "pode seguir"; "handoff" quando a pessoa disser que vai assumir, apresentar ou conduzir; "clarify" quando a fala estiver incompleta e for necessário pedir que a pessoa repita; "conversation" para conversa paralela sem pedido dirigido às IAs. Para "conversation", deixe answer vazio. Retorne SOMENTE JSON válido neste formato: {"intent":"question|resume|handoff|clarify|conversation","speaker":"lia" ou "icaro","answer":"resposta"}. Escolha ÍCARO para questões técnicas, governança e riscos; LIA para aplicação prática, cultura e facilitação.`;
  const prompt = `Cena atual ${Number(body.scene) + 1}: ${body.sceneTitle || "não informada"}.
Contexto do roteiro (inclui cenas anteriores): ${String(body.scriptContext || "não informado").slice(0, 5000)}
Pergunta ou interrupção do público: ${String(body.question || "").slice(0, 2000)}`;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ model: textModel, instructions, input: prompt, reasoning: { effort: "none" }, max_output_tokens: 220 })
  });
  const data = await response.json();
  if (!response.ok) return json(res, response.status, { error: data.error?.message || "Falha ao gerar resposta." });
  const output = extractOutputText(data);
  let parsed;
  try { parsed = JSON.parse(output); }
  catch { parsed = { speaker: "icaro", answer: output }; }
  json(res, 200, { intent: ["question", "resume", "handoff", "clarify", "conversation"].includes(parsed.intent) ? parsed.intent : "question", speaker: parsed.speaker === "lia" ? "lia" : "icaro", answer: String(parsed.answer || "").slice(0, 1400) });
}

async function speech(req, res) {
  requireKey(res);
  if (!apiKey) return;
  const body = JSON.parse((await readBody(req)).toString("utf8"));
  const text = String(body.text || "").slice(0, 4096);
  const voice = ["marin", "cedar"].includes(body.voice) ? body.voice : "marin";
  const instructions = String(body.instructions || "").slice(0, 800);
  const speed = Math.min(4, Math.max(0.25, Number(body.speed) || 1));
  const key = createHash("sha256").update(`${ttsModel}|${voice}|${speed}|${instructions}|${text}`).digest("hex");
  const cached = join(cacheDir, `${key}.mp3`);
  if (existsSync(cached)) return stream(cached, "audio/mpeg", res);
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ model: ttsModel, voice, input: text, instructions, speed, response_format: "mp3" })
  });
  if (!response.ok) {
    const data = await response.text();
    return json(res, response.status, { error: safeApiError(data) });
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  writeFileSync(cached, bytes);
  res.writeHead(200, { "Content-Type": "audio/mpeg", "Content-Length": bytes.length, "Cache-Control": "private, max-age=31536000" });
  res.end(bytes);
}

async function transcribe(req, res) {
  requireKey(res);
  if (!apiKey) return;
  const bytes = await readBody(req, 12 * 1024 * 1024);
  const type = req.headers["content-type"] || "audio/webm";
  const form = new FormData();
  form.append("file", new Blob([bytes], { type }), "meeting.webm");
  form.append("model", transcriptionModel);
  form.append("language", "pt");
  form.append("prompt", "Reunião em português brasileiro sobre inteligência artificial, Microsoft 365 Copilot, agentes e Rede Governo.");
  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });
  const data = await response.json();
  if (!response.ok) return json(res, response.status, { error: data.error?.message || "Falha na transcrição." });
  json(res, 200, { text: data.text || "" });
}

async function realtimeToken(req, res) {
  requireKey(res);
  if (!apiKey) return;
  const body = JSON.parse((await readBody(req, 64 * 1024)).toString("utf8") || "{}");
  const instructions = String(body.instructions || "Você é um copresentador natural de uma apresentação sobre maturidade em IA e agentes. Responda em português brasileiro, seja conciso e aguarde a vez do público.").slice(0, 12000);
  const voice = ["marin", "cedar", "coral", "sage", "verse"].includes(body.voice) ? body.voice : "marin";
  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ session: { type: "realtime", model: realtimeModel, instructions, audio: { output: { voice } } } })
  });
  const data = await response.json();
  if (!response.ok) return json(res, response.status, { error: data.error?.message || "Falha ao criar sessão Realtime." });
  json(res, 200, { client_secret: data.value || data.client_secret?.value || data.client_secret, model: realtimeModel });
}

function staticFile(pathname, req, res) {
  let relative = decodeURIComponent(pathname === "/" ? "index.html" : pathname).replace(/^[/\\]+/, "");
  const candidate = normalize(join(root, relative));
  if (!candidate.startsWith(root) || !existsSync(candidate)) return json(res, 404, { error: "Não encontrado." });
  if (statSync(candidate).isDirectory()) relative = join(relative, "index.html");
  const file = normalize(join(root, relative));
  if (!file.startsWith(root) || !existsSync(file)) return json(res, 404, { error: "Não encontrado." });
  const headers = { "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream" };
  if (extname(file).toLowerCase() === ".mp4" && req.headers.range) return rangeStream(file, req.headers.range, headers, res);
  stream(file, headers["Content-Type"], res);
}

async function readBody(req, limit = 2 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error("Corpo da requisição excedeu o limite.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function stream(file, contentType, res) {
  const { size } = statSync(file);
  res.writeHead(200, { "Content-Type": contentType, "Content-Length": size, "Accept-Ranges": "bytes" });
  createReadStream(file).pipe(res);
}

function rangeStream(file, range, headers, res) {
  const { size } = statSync(file);
  const [startText, endText] = range.replace(/bytes=/, "").split("-");
  const start = Number(startText);
  const end = endText ? Number(endText) : Math.min(start + 1024 * 1024, size - 1);
  res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
  createReadStream(file, { start, end }).pipe(res);
}

function authHeaders() { return { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }; }
function requireKey(res) { if (!apiKey) json(res, 503, { error: "OPENAI_API_KEY não configurada." }); }
function json(res, status, data) { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); res.end(JSON.stringify(data)); }
function safeApiError(text) { try { return JSON.parse(text).error?.message || "Falha na API."; } catch { return "Falha na API."; } }
function extractOutputText(data) {
  if (data.output_text) return data.output_text;
  return (data.output || []).flatMap(item => item.content || []).filter(c => c.type === "output_text").map(c => c.text).join("");
}
function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}
