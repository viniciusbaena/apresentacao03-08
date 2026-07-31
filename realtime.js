(() => {
  "use strict";
  let pc = null;
  let dc = null;
  let remoteAudio = null;
  let pending = null;
  let connected = false;

  function send(event) { if (dc?.readyState === "open") dc.send(JSON.stringify(event)); }
  function finish(event) { if (pending && event.type === "response.done") { const resolve = pending; pending = null; resolve(); } }

  async function connect({ instructions, inputDeviceId, outputDeviceId } = {}) {
    if (connected) return;
    const tokenRes = await fetch("/api/realtime/token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ instructions, voice: "marin" }) });
    const token = await tokenRes.json();
    if (!tokenRes.ok || !token.client_secret) throw new Error(token.error || "Não foi possível criar a sessão Realtime.");
    pc = new RTCPeerConnection();
    remoteAudio = document.createElement("audio");
    remoteAudio.autoplay = true;
    remoteAudio.setAttribute("aria-hidden", "true");
    document.body.append(remoteAudio);
    if (outputDeviceId && remoteAudio.setSinkId) await remoteAudio.setSinkId(outputDeviceId).catch(() => {});
    pc.ontrack = event => { remoteAudio.srcObject = event.streams[0]; };
    const stream = await navigator.mediaDevices.getUserMedia({ audio: inputDeviceId ? { deviceId: { exact: inputDeviceId } } : true });
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    dc = pc.createDataChannel("oai-events");
    dc.onmessage = event => { try { finish(JSON.parse(event.data)); } catch {} };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const answer = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(token.model || "gpt-realtime-2.1")}`, { method: "POST", body: offer.sdp, headers: { Authorization: `Bearer ${token.client_secret}`, "Content-Type": "application/sdp" } });
    if (!answer.ok) throw new Error(`Falha na negociação Realtime (${answer.status}).`);
    await pc.setRemoteDescription({ type: "answer", sdp: await answer.text() });
    await new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error("Tempo esgotado ao conectar ao Realtime.")), 10000); dc.addEventListener("open", () => { clearTimeout(timer); resolve(); }, { once: true }); });
    send({ type: "session.update", session: { turn_detection: { type: "server_vad", create_response: true, interrupt_response: true, silence_duration_ms: 650 }, instructions: instructions || "Responda em português brasileiro, com naturalidade e concisão." } });
    connected = true;
    return { model: token.model };
  }

  async function speak(text) {
    if (!connected) throw new Error("Modo Realtime ainda não conectado.");
    send({ type: "response.create", response: { instructions: `Fale exatamente este trecho, com tom natural de apresentação. Não acrescente comentários nem introdução:\n${text}` } });
    await new Promise(resolve => { pending = resolve; setTimeout(resolve, 30000); });
  }

  function disconnect() {
    connected = false;
    pending?.(); pending = null;
    dc?.close(); pc?.close();
    if (remoteAudio) remoteAudio.remove();
    dc = null; pc = null; remoteAudio = null;
  }

  window.realtimeCopresenter = { connect, speak, disconnect, get connected() { return connected; } };
})();
