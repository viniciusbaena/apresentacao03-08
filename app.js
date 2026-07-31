const firebaseConfig = {
  apiKey: "AIzaSyA_CezWFyTyS_ukNZVkVwm5yQdms1m_k2Y",
  authDomain: "apresentacao-copilot.firebaseapp.com",
  databaseURL: "https://apresentacao-copilot-default-rtdb.firebaseio.com",
  projectId: "apresentacao-copilot",
  storageBucket: "apresentacao-copilot.firebasestorage.app",
  messagingSenderId: "101027470679",
  appId: "1:101027470679:web:ed5078823ce9ffa0de7212"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const root = "culture-ai-v2";
const scenes = [...document.querySelectorAll(".scene")];
let current = 0;

const quizData = [
  {
    text: "“Toda segunda-feira, leia a base atualizada, priorize contratos com pendências e gere o mesmo resumo gerencial.”",
    answer: "agent",
    why: "Agente: é recorrente, previsível e segue regras que podem ser testadas."
  },
  {
    text: "“Resuma esta ata de reunião em cinco pontos e destaque as decisões tomadas.”",
    answer: "assist",
    why: "Assistente: é um pedido pontual sobre um conteúdo específico."
  },
  {
    text: "“Sempre que eu fornecer os documentos de uma nova reunião, produza um briefing no padrão definido e liste lacunas.”",
    answer: "agent",
    why: "Agente: há repetição, padrão de entrega e limites explícitos."
  },
  {
    text: "“Ajude-me a comparar três caminhos possíveis para este problema, questionando minhas premissas.”",
    answer: "assist",
    why: "Assistente: a tarefa é exploratória e muda conforme a conversa."
  }
];
let quizIndex = 0;

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const pad = n => String(n + 1).padStart(2, "0");

function showScene(next) {
  if (next < 0 || next >= scenes.length || next === current) return;
  const old = scenes[current];
  const direction = next > current ? 1 : -1;
  old.classList.remove("active");
  old.classList.toggle("exit-left", direction > 0);
  scenes[next].classList.remove("exit-left");
  if (direction < 0) scenes[next].classList.add("exit-left");
  requestAnimationFrame(() => {
    scenes[next].classList.add("active");
    scenes[next].classList.remove("exit-left");
  });
  current = next;
  updateChrome();
  pauseFinalVideo();
  resetPollForScene(scenes[current]);
  window.dispatchEvent(new CustomEvent("presentation:scenechange", {
    detail: { index: current, title: scenes[current].dataset.title }
  }));
}

function resetPollForScene(scene) {
  const type = scene.dataset.poll;
  if (type === "lab") {
    db.ref(`${root}/polls/labSteps`).remove();
    db.ref(`${root}/polls/lab`).remove();
    broadcastAudienceReset();
  } else if (type === "maturity" || type === "commitment") {
    db.ref(`${root}/polls/${type}`).remove();
    broadcastAudienceReset();
  }
  if (type === "quiz") {
    db.ref(`${root}/quiz`).remove();
    broadcastAudienceReset();
    syncQuiz();
  }
}

function resetAllPolls() {
  db.ref(`${root}/polls`).remove();
  db.ref(`${root}/quiz`).remove();
  broadcastAudienceReset();
}

function broadcastAudienceReset() {
  db.ref(`${root}/session/resetId`).set(String(Date.now()));
}

function updateChrome() {
  $("#currentScene").textContent = pad(current);
  $("#totalScenes").textContent = String(scenes.length).padStart(2, "0");
  $("#sceneTitle").textContent = scenes[current].dataset.title;
  $("#progressBar").style.width = `${((current + 1) / scenes.length) * 100}%`;
  history.replaceState(null, "", `#${current + 1}`);
}

$("#prevBtn").addEventListener("click", () => showScene(current - 1));
$("#nextBtn").addEventListener("click", () => showScene(current + 1));
$(".brand").addEventListener("click", () => showScene(0));
document.addEventListener("keydown", e => {
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); showScene(current + 1); }
  if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); showScene(current - 1); }
  if (e.key.toLowerCase() === "f") toggleFullscreen();
  if (e.key.toLowerCase() === "n") openNotes();
  if (e.key === "Escape") $$(".modal.open").forEach(closeModal);
});

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}
$("#fullscreenBtn").addEventListener("click", toggleFullscreen);

function openNotes() {
  const notes = scenes.map((s, i) => `<article class="${i === current ? "active" : ""}"><b>${pad(i)} · ${s.dataset.title} <em>${s.dataset.time || ""}</em></b><p>${$(".speaker-note", s)?.textContent || ""}</p></article>`).join("");
  const win = window.open("", "presenter-notes", "width=620,height=760");
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>Notas do apresentador</title><style>body{font:16px system-ui;background:#070b16;color:#eef3ff;margin:0;padding:24px}h1{font-size:22px}article{padding:16px;border-left:3px solid #263354;margin:10px 0;background:#0e162b}article.active{border-color:#35d7ff;background:#13213d}b{color:#35d7ff}em{float:right;color:#9caaca;font-style:normal;font-size:12px}p{color:#c1cae1;line-height:1.45}</style></head><body><h1>Roteiro · 38 minutos</h1>${notes}</body></html>`);
  win.document.close();
}
$("#notesBtn").addEventListener("click", openNotes);

function openModal(el) { el.classList.add("open"); el.setAttribute("aria-hidden", "false"); }
function closeModal(el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); }
$("#sourcesBtn").addEventListener("click", () => openModal($("#sourcesModal")));
$("#resetLive").addEventListener("click", async () => {
  if (!confirm("Zerar todas as respostas ao vivo desta apresentação?")) return;
  await db.ref(root).remove();
  syncQuiz();
  $("#resetLive").textContent = "Respostas zeradas ✓";
  setTimeout(() => $("#resetLive").textContent = "Zerar respostas antes da sessão", 2200);
});
$$("[data-close]").forEach(btn => btn.addEventListener("click", () => closeModal(btn.closest(".modal"))));
$$(".modal").forEach(modal => modal.addEventListener("click", e => { if (e.target === modal) closeModal(modal); }));

const isLocalPreview = ["localhost", "127.0.0.1"].includes(location.hostname);
const baseUrl = isLocalPreview
  ? new URL("https://viniciusbaena.github.io/apresentacao03-08/")
  : new URL(".", location.href);
const voteUrl = new URL("votar.html", baseUrl).href;
const bookUrl = new URL("assets/ebook-modulo-2.pdf", baseUrl).href;
$$("[data-vote-url]").forEach(el => el.textContent = voteUrl.replace(/^https?:\/\//, ""));
$$("[data-qr]").forEach(el => new QRCode(el, { text: el.dataset.qr === "book" ? bookUrl : voteUrl, width: 150, height: 150, colorDark: "#071026", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M }));

function valuesOf(snapshot, length) {
  const raw = snapshot.val() || {};
  return Array.from({ length }, (_, i) => Number(raw[i] || 0));
}
function updateBars(type, values) {
  const total = values.reduce((a, b) => a + b, 0);
  const max = Math.max(...values, 1);
  if (type === "maturity") {
    values.forEach((v, i) => {
      $(`[data-bar="${i}"]`).style.width = `${(v / max) * 100}%`;
      $(`[data-count="${i}"]`).textContent = v;
    });
    $("[data-total]").textContent = total;
  }
  if (type === "lab") {
    values.forEach((v, i) => {
      $(`[data-labbar="${i}"]`).style.width = `${(v / max) * 100}%`;
      $(`[data-labcount="${i}"]`).textContent = v;
    });
  }
  if (type === "commitment") values.forEach((v, i) => $(`[data-commit="${i}"]`).textContent = v);
}
["maturity", "lab", "commitment"].forEach(type => db.ref(`${root}/polls/${type}`).on("value", snap => updateBars(type, valuesOf(snap, 4))));

function renderQuizResults(snapshot) {
  const raw = snapshot.val() || {};
  const a = Number(raw.assist || 0), g = Number(raw.agent || 0), total = a + g || 1;
  $("#quizAssist").textContent = `${Math.round(a / total * 100)}%`;
  $("#quizAgent").textContent = `${Math.round(g / total * 100)}%`;
}
let quizListener = null;
function syncQuiz() {
  const item = quizData[quizIndex];
  $("#quizScenario span").textContent = `CENÁRIO ${quizIndex + 1} DE ${quizData.length}`;
  $("#quizScenario p").textContent = item.text;
  $("#answerReveal").textContent = "";
  db.ref(`${root}/activeQuiz`).set({ index: quizIndex, text: item.text });
  if (quizListener) db.ref(`${root}/quiz/${quizIndex}`).off("value", quizListener);
  quizListener = snap => renderQuizResults(snap);
  db.ref(`${root}/quiz/${quizIndex}`).on("value", quizListener);
}
$("#prevScenario").addEventListener("click", () => { quizIndex = (quizIndex - 1 + quizData.length) % quizData.length; syncQuiz(); });
$("#nextScenario").addEventListener("click", () => { quizIndex = (quizIndex + 1) % quizData.length; syncQuiz(); });
$("#revealQuiz").addEventListener("click", () => $("#answerReveal").textContent = quizData[quizIndex].why);

const agentBuildSteps = [
  { title: "Caso de uso", question: "Que rotina merece virar nosso primeiro agente?", options: [["Radar de Pendências", "Priorizar contratos e itens que exigem atenção"], ["Briefing Governo", "Reunir contexto, riscos e perguntas para reuniões"], ["Pulso de Projetos", "Consolidar avanços, pontos críticos e próximos passos"], ["Redator Institucional", "Criar rascunhos seguindo padrão e critérios"]] },
  { title: "Papel", question: "Como o agente deve atuar?", options: [["Analista criterioso", "Organizar evidências antes de sugerir qualquer ação"], ["Facilitador objetivo", "Transformar informação dispersa em próximos passos"], ["Revisor cuidadoso", "Encontrar lacunas, inconsistências e riscos"]] },
  { title: "Meta", question: "Qual resultado define que o agente cumpriu seu papel?", options: [["Síntese priorizada", "Entregar uma visão curta, ordenada e acionável"], ["Decisão preparada", "Evidenciar o que falta para uma decisão humana"], ["Rascunho verificável", "Produzir uma primeira versão pronta para revisão"]] },
  { title: "Contexto", question: "Que contexto deve orientar o raciocínio?", options: [["Rede Governo", "Realidade operacional, regulatória e institucional da Caixa"], ["Público técnico", "Linguagem para engenheiros, arquitetos e equipes operacionais"], ["Cenário fornecido", "Usar somente documentos, datas e premissas da demanda"]] },
  { title: "Expectativa", question: "Como a resposta deve chegar para a equipe?", options: [["Tabela + síntese", "Evidências em tabela e conclusão executiva curta"], ["Passo a passo", "Critérios, achados e recomendação em sequência"], ["Alerta + fonte", "Prioridade, justificativa e origem de cada ponto"]] },
  { title: "Fontes", question: "Onde o agente deve buscar a verdade?", options: [["Base fornecida", "Somente arquivos e links indicados na tarefa"], ["Fontes oficiais", "Documentos institucionais e referências verificáveis"], ["Base + oficiais", "Cruzar a base com fontes oficiais, sinalizando diferenças"]] },
  { title: "Limites", question: "O que o agente nunca deve fazer sozinho?", options: [["Não decidir", "Não aprovar, contratar, classificar risco ou substituir julgamento"], ["Não inventar", "Não preencher lacunas com suposições; declarar incertezas"], ["Não expor", "Não usar nem reproduzir dados fora do escopo autorizado"]] },
];
let labStep = 0;
let labValues = [];
let labListener = null;
let labListenerPath = null;
const labSelections = {};
function labPrompt() {
  return agentBuildSteps.map((step, i) => { const option = step.options[labSelections[i] ?? 0]; return `${step.title}: ${option[0]} — ${option[1]}`; }).join("\n") + "\n\nTrabalhe com clareza, cite as fontes usadas, sinalize incertezas e peça validação humana antes de qualquer decisão.";
}
function renderLabPrompt() {
  const step = agentBuildSteps[labStep];
  const complete = Object.keys(labSelections).length === agentBuildSteps.length;
  $("#labStepLabel").textContent = `ETAPA ${labStep + 1} DE ${agentBuildSteps.length} · ${step.title.toUpperCase()}`;
  $("#labQuestion").textContent = step.question;
  $("#labChoices").innerHTML = step.options.map((option, i) => `<div class="choice"><span>${option[0]}</span><i data-labbar="${i}"></i><b data-labcount="${i}">0</b></div>`).join("");
  $("#agentName").textContent = complete ? "Prompt da sala" : `${step.title} em votação`;
  $("#agentPurpose").textContent = complete ? labPrompt() : "A opção vencedora entra no combinado do agente.";
  $("#labCardKicker").textContent = complete ? "AGENTE PRONTO PARA VALIDAR" : "AGENTE EM CONSTRUÇÃO";
  $("#labSelections").innerHTML = agentBuildSteps.map((s, i) => `<span><b>${s.title.toUpperCase()}</b>${labSelections[i] === undefined ? "Aguardando votação" : s.options[labSelections[i]][0]}</span>`).join("");
  $("#nextLabStep").textContent = complete ? "Prompt completo definido pela sala" : labStep === agentBuildSteps.length - 1 ? "Revelar prompt completo" : "Abrir votação da próxima etapa";
  db.ref(`${root}/activeLab`).set({ step: labStep, title: step.title, question: step.question, options: step.options.map(o => o[0]) });
}
function syncLabStep() {
  const step = agentBuildSteps[labStep];
  if (labListener && labListenerPath) db.ref(labListenerPath).off("value", labListener);
  labListener = snap => {
    labValues = valuesOf(snap, step.options.length);
    const max = Math.max(...labValues, 1);
    step.options.forEach((_, i) => { const bar = $(`[data-labbar="${i}"]`); const count = $(`[data-labcount="${i}"]`); if (bar) bar.style.width = `${labValues[i] / max * 100}%`; if (count) count.textContent = labValues[i]; });
    const total = labValues.reduce((a, b) => a + b, 0);
    $("#labProgress").textContent = total ? `${total} voto${total === 1 ? "" : "s"} nesta etapa · a liderança entra no prompt` : "Ainda não votamos nesta etapa.";
  };
  labListenerPath = `${root}/polls/labSteps/${labStep}`;
  db.ref(labListenerPath).on("value", labListener);
  renderLabPrompt();
}
$("#nextLabStep").addEventListener("click", () => { const winner = labValues.indexOf(Math.max(...labValues)); labSelections[labStep] = winner < 0 ? 0 : winner; if (labStep < agentBuildSteps.length - 1) { labStep += 1; syncLabStep(); } else { renderLabPrompt(); $("#nextLabStep").disabled = true; } });
syncLabStep();

const finalVideo = $("#finalVideo");
function pauseFinalVideo() {
  if (current !== scenes.length - 1) {
    finalVideo.pause();
    $(".scene-finale").classList.remove("playing");
  }
}
$("#playFinal").addEventListener("click", async () => {
  $(".scene-finale").classList.add("playing");
  finalVideo.muted = false;
  finalVideo.currentTime = 0;
  try { await finalVideo.play(); } catch { finalVideo.controls = true; }
});
finalVideo.addEventListener("ended", () => $(".scene-finale").classList.remove("playing"));

const initial = Math.min(Math.max(parseInt(location.hash.slice(1), 10) || 1, 1), scenes.length) - 1;
if (initial) { scenes[0].classList.remove("active"); scenes[initial].classList.add("active"); current = initial; }
updateChrome();
resetAllPolls();
resetPollForScene(scenes[current]);
syncQuiz();

window.presentationControl = {
  get current() { return current; },
  get total() { return scenes.length; },
  get title() { return scenes[current].dataset.title; },
  get interactive() { return Boolean(scenes[current].dataset.poll || scenes[current].querySelector("[data-qr]")); },
  get presenterOnly() { return scenes[current].dataset.presenterOnly === "true"; },
  get presenterCall() { return scenes[current].dataset.presenterCall === "true"; },
  get presenterHandoff() { return scenes[current].dataset.presenterHandoff === "true"; },
  goTo(index) { showScene(index); },
  next() { showScene(current + 1); },
  previous() { showScene(current - 1); }
};
