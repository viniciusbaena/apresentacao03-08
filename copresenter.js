(() => {
  "use strict";

  const script = [
    [
      ["lia", "Prontos? Então vamos começar por uma pergunta simples: onde a IA já aparece no trabalho de vocês — mesmo sem ninguém chamar isso de IA?"],
      ["icaro", "Enquanto vocês pensam, fica uma provocação: maturidade não é usar a ferramenta mais sofisticada. É saber quando usar, como conferir e quando parar."],
      ["lia", "É por aí que a nossa conversa começa."]
    ],
    [
    ],
    [
    ],
    [
      ["lia", "Antes dos agentes, vamos ao motivo desta conversa. Tem trabalho importante demais sendo gasto em tarefa repetitiva."],
      ["icaro", "E quando a IA assume o mecânico, o humano não desaparece. Ele ganha tempo para analisar, julgar e decidir melhor. É essa mudança de postura que vamos explorar agora."]
    ],
    [
      ["lia", "Antes de abrir as próximas portas, uma provocação: a próxima profissão talvez ainda não tenha nome."],
      ["icaro", "A tecnologia muda tarefas, competências e, às vezes, a própria profissão. Por isso, mais importante que adivinhar o futuro é aprender a aprender — e decidir com responsabilidade."]
    ],
    [
      ["lia", "E quando faltar palavra para começar? Não espere pelo prompt perfeito. Conte o problema."],
      ["icaro", "Diga o que aconteceu, o que você tentou e onde travou. A IA pode fazer perguntas e ajudar a transformar a frustração em um próximo passo. Daí nasce a primeira porta: conversar."]
    ],
    [
      ["lia", "O e-book propõe quatro portas para essa jornada: conversar, raciocinar, delegar e escalar."],
      ["icaro", "Não é uma prova, nem uma fila. São formas de trabalhar com IA — e cada uma prepara a próxima. Vamos descobrir onde esta sala se reconhece hoje."],
      ["lia", "Na primeira porta, você pede ajuda. Na segunda, explora e organiza ideias. Na terceira, começa a delegar uma rotina — e na quarta, transforma o que funcionou em capacidade da equipe."],
      ["icaro", "O importante não é atravessar todas de uma vez. É reconhecer a próxima porta útil para o trabalho que você precisa fazer."]
    ],
    [
      ["lia", "Agora é com vocês. Escaneiem o QR Code e respondam: em qual dessas portas vocês estão hoje?"],
      ["lia", "Não tem resposta certa. Queremos só uma fotografia honesta desta sala. Depois, vamos comparar essa fotografia com o próximo salto: delegar uma rotina."]
    ],
    [
      ["lia", "O resultado da votação nos dá um ponto de partida. Aqui acontece o salto principal do nosso encontro: com o assistente, você inicia cada conversa."],
      ["icaro", "Com o agente, você transforma seu modo de trabalhar em um combinado explícito: instruções, fontes, limites e validação."],
      ["lia", "Em outras palavras: você deixa de repetir o pedido e começa a delegar a rotina."]
    ],
    [
      ["lia", "Vamos testar essa diferença. Leiam o cenário no celular e escolham: assistente ou agente?"],
      ["icaro", "A pista está menos na sofisticação da tarefa e mais na recorrência, na clareza das regras e na possibilidade de verificar o resultado. Guardem essa pista; ela volta quando formos construir o nosso agente."]
    ],
    [
      ["lia", "Nem toda tarefa merece um agente. Uma boa candidata costuma responder sim a quatro perguntas."],
      ["icaro", "Ela é recorrente? As regras podem ser explicadas? O resultado é verificável? E existem fontes e limites seguros? Quatro respostas positivas indicam um ótimo ponto de partida — e nos levam ao combinado do próximo slide."]
    ],
    [
      ["icaro", "Um agente confiável nasce de um combinado explícito. Papel, meta, contexto, expectativa e fontes formam o PMCEF."],
      ["lia", "E, para uma rotina recorrente, acrescentamos algo essencial: os limites. O agente precisa saber não apenas o que fazer, mas também onde deve parar. É esse combinado que vamos testar no laboratório."]
    ],
    [
      ["lia", "Chegou o laboratório. Vocês vão escolher qual agente construiremos juntos."],
      ["icaro", "Depois da votação, vamos transformar a opção vencedora em papel, meta, contexto, formato, fontes e limites. E, na sequência, veremos como esse combinado vira um protótipo no Copilot."]
    ],
    [
      ["lia", "No Microsoft 365 Copilot, esse primeiro protótipo pode ser criado sem código, usando linguagem natural."],
      ["icaro", "O caminho é curto: criar, descrever, configurar e testar. O botão Criar é fácil; difícil — e necessário — é testar casos reais, exceções e pedidos indevidos antes de compartilhar."]
    ],
    [
      ["icaro", "Um teste bem-sucedido não é suficiente. Antes de confiar, tente fazer o agente falhar."],
      ["lia", "Caso normal, dado ausente, exceção, fonte conflitante e pedido indevido. Cinco testes simples revelam muito mais do que uma demonstração perfeita. É aqui que confiança vira prática."]
    ],
    [
      ["lia", "A inteligência artificial pode organizar, comparar, resumir, sinalizar e rascunhar."],
      ["icaro", "Mas contexto, exceção, parecer, decisão e responsabilidade permanecem humanos. Governança não é o freio da inovação; é o que permite que ela ganhe escala sem perder confiança."]
    ],
    [
      ["lia", "Quando uma prática individual é testada, ajustada e validada pela equipe, o conhecimento deixa de morar em uma pessoa."],
      ["icaro", "O agente vira um ponto de partida comum. Ele reduz variações desnecessárias, sem apagar a experiência de quem precisa interpretar e decidir. O próximo passo é levar uma pequena prática para a semana."]
    ],
    [
      ["lia", "Agora, uma escolha pequena e concreta. Qual porta você vai abrir nos próximos sete dias?"],
      ["lia", "Registre seu compromisso. A maturidade não aparece quando a tecnologia existe; aparece quando o uso passa a fazer sentido no trabalho. E é com essa escolha que vamos encerrar."]
    ],
    [
      ["lia", "A tecnologia já está disponível. O que transforma possibilidade em valor é uma decisão simples."],
      ["icaro", "Começar."],
      ["lia", "Obrigada pela conversa. E lembrem-se: esta foi uma apresentação conduzida com vozes de inteligência artificial."]
    ]
  ];

  const persona = {
    lia: {
      name: "LIA",
      voice: "marin",
      speed: 1.08,
      instructions: "Fale em português brasileiro como uma apresentadora conversando ao vivo, não como quem lê um texto. Seja acolhedora, confiante e espirituosa. Varie levemente o ritmo, faça pausas naturais entre ideias, use ênfase espontânea e mantenha dicção clara."
    },
    icaro: {
      name: "ÍCARO",
      voice: "cedar",
      speed: 0.96,
      instructions: "Fale em português brasileiro como um especialista participando de uma conversa ao vivo, não como quem lê um texto. Seja calmo, técnico e preciso, com humor sutil, ritmo variado, pausas naturais e dicção clara."
    }
  };

  const savedAudio = (() => {
    try {
      return JSON.parse(localStorage.getItem("culturaIaAudio") || "{}");
    } catch {
      return {};
    }
  })();

  const state = {
    open: false,
    running: false,
    paused: false,
    listening: false,
    answering: false,
    scene: window.presentationControl?.current || 0,
    line: 0,
    runId: 0,
    backend: false,
    mock: savedAudio.mock ?? true,
    stream: null,
    recorder: null,
    chunks: [],
    audioContext: null,
    analyser: null,
    meterTimer: null,
    silenceTimer: null,
    speechStartedAt: 0,
    bargeIn: true,
    bargeInSince: 0,
    lastBargeIn: 0,
    bargeInPending: false,
    bargeInWasRunning: false,
    audienceActive: false,
    audienceSilenceSince: 0,
    audienceText: "",
    interactiveHold: false,
    manualHold: false,
    introDone: false,
    closingDone: false,
    inputDevice: savedAudio.inputDevice || "",
    outputDevice: savedAudio.outputDevice || "",
    currentAudio: null
  };

  const html = `
    <button class="studio-launch" id="studioLaunch"><i></i> ESTÚDIO IA</button>
    <aside class="studio" id="studio" aria-label="Controles do estúdio de inteligência artificial">
      <header class="studio-head">
        <span class="studio-status-dot" id="studioDot"></span>
        <div><strong>Estúdio IA</strong><small id="studioStatus">verificando sistema...</small></div>
        <button class="studio-close" id="studioClose" aria-label="Fechar">×</button>
      </header>
      <div class="studio-body">
        <div class="persona-row">
          <div class="persona lia" data-persona="lia"><span class="persona-orb">L</span><span><strong>LIA</strong><small>apresentadora</small></span></div>
          <div class="persona icaro" data-persona="icaro"><span class="persona-orb">I</span><span><strong>ÍCARO</strong><small>especialista</small></span></div>
        </div>
        <div class="studio-now"><span>AGORA</span><p id="studioNow">Pronto para assumir após sua abertura.</p></div>
        <div class="studio-primary">
          <button class="studio-btn primary" id="studioStart">▶ Assumir apresentação</button>
          <button class="studio-btn" id="studioPause">Ⅱ Pausar IA</button>
          <button class="studio-btn" id="studioResume">↻ Retomar roteiro</button>
          <button class="studio-btn danger" id="studioSilence">■ Silenciar tudo</button>
        </div>
        <div class="studio-divider"></div>
        <div class="studio-section-title"><span>ESCUTA DA SALA</span><button id="studioSettingsBtn">configurar</button></div>
        <div class="studio-meter"><i id="studioMeter"></i></div>
        <div class="studio-caption" id="listenerStatus">Escuta desligada.</div>
        <div class="studio-settings" id="studioSettings">
          <label>Entrada de áudio<select id="inputDevice"><option value="">Padrão do sistema</option></select></label>
          <label>Saída das vozes<select id="outputDevice"><option value="">Padrão do sistema</option></select></label>
          <label class="studio-check"><input type="checkbox" id="mockMode" checked> Modo de simulação sem API</label>
          <button class="studio-btn" id="enableListening" style="width:100%">Ativar escuta</button>
        </div>
        <div class="studio-divider"></div>
        <div class="studio-section-title"><span>TRANSCRIÇÃO / TESTE</span><button id="clearTranscript">limpar</button></div>
        <div class="studio-transcript" id="studioTranscript"><em>Nenhuma fala capturada.</em></div>
        <div class="studio-input"><input id="questionInput" placeholder="Simule uma pergunta do público"><button id="sendQuestion">↵</button></div>
        <p class="studio-disclosure">As vozes são geradas por IA. O modo ao vivo processa somente o áudio encaminhado ao dispositivo selecionado.</p>
      </div>
    </aside>
    <div class="studio-banner" id="studioBanner"><b id="bannerPersona">LIA</b><span id="bannerText">Preparando...</span></div>
    <div class="ai-caption" id="aiCaption"><b>LIA</b><span></span></div>
    <div class="studio-confirm" id="studioConfirm">
      <div class="studio-confirm-card">
        <h2>Antes de entregar o palco</h2>
        <p>Confirme que todos foram avisados sobre as vozes de IA, que não haverá dados sensíveis e que o áudio do notebook pessoal está roteado corretamente.</p>
        <div class="studio-confirm-actions">
          <button class="studio-btn" id="cancelStart">Voltar</button>
          <button class="studio-btn primary" id="confirmStart">Tudo certo — iniciar</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  const $ = s => document.querySelector(s);
  const el = {
    studio: $("#studio"), dot: $("#studioDot"), status: $("#studioStatus"),
    now: $("#studioNow"), transcript: $("#studioTranscript"), meter: $("#studioMeter"),
    listener: $("#listenerStatus"), settings: $("#studioSettings"), mock: $("#mockMode"),
    input: $("#inputDevice"), output: $("#outputDevice"), caption: $("#aiCaption"),
    banner: $("#studioBanner"), bannerPersona: $("#bannerPersona"), bannerText: $("#bannerText"),
    confirm: $("#studioConfirm")
  };
  el.mock.checked = state.mock;

  function saveAudioSettings() {
    localStorage.setItem("culturaIaAudio", JSON.stringify({
      inputDevice: state.inputDevice,
      outputDevice: state.outputDevice,
      mock: state.mock
    }));
  }

  async function checkBackend() {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      state.backend = true;
      state.mock = !data.configured;
      el.mock.checked = state.mock;
      setStatus(data.configured ? "API conectada · modo ao vivo" : "servidor local · falta chave", data.configured ? "ready" : "");
      if (data.configured && state.listening && !state.recorder) startRecorder();
    } catch {
      state.backend = false;
      state.mock = true;
      el.mock.checked = true;
      setStatus("modo local · voz do Windows", "");
    }
  }

  function setStatus(text, kind = "") {
    el.status.textContent = text;
    el.dot.className = `studio-status-dot ${kind}`;
  }

  function setNow(text) { el.now.textContent = text; }
  function setPersona(who, active) {
    document.querySelectorAll(".persona").forEach(p => p.classList.remove("speaking"));
    if (active) document.querySelector(`[data-persona="${who}"]`)?.classList.add("speaking");
  }
  function showCaption(who, text) {
    el.caption.className = `ai-caption show ${who}`;
    el.caption.querySelector("b").textContent = persona[who].name;
    el.caption.querySelector("span").textContent = text;
  }
  function hideCaption() { el.caption.classList.remove("show"); }
  function banner(who, text, ms = 2500) {
    el.bannerPersona.textContent = persona[who]?.name || "SISTEMA";
    el.bannerText.textContent = text;
    el.banner.classList.add("show");
    setTimeout(() => el.banner.classList.remove("show"), ms);
  }

  function presenterPrompt() {
    const prompts = [
      "Vinícius, é com você.",
      "Agora é contigo, Vinícius.",
      "A palavra é sua, Vinícius.",
      "Vinícius, pode conduzir."
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  async function apiSpeech(who, text) {
    if (!state.backend || state.mock) return null;
    const res = await fetch("/api/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: persona[who].voice, speed: persona[who].speed, instructions: persona[who].instructions })
    });
    if (!res.ok) throw new Error(`Falha de voz (${res.status})`);
    return URL.createObjectURL(await res.blob());
  }

  function browserSpeech(who, text) {
    return new Promise(resolve => {
      if (!("speechSynthesis" in window)) return resolve();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const pt = voices.filter(v => /^pt(-|_)/i.test(v.lang));
      utterance.voice = pt[who === "lia" ? 0 : Math.min(1, pt.length - 1)] || voices[0];
      utterance.lang = "pt-BR";
      utterance.rate = who === "lia" ? 1.02 : .94;
      utterance.pitch = who === "lia" ? 1.06 : .88;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      speechSynthesis.speak(utterance);
    });
  }

  async function speak(who, text, runId = state.runId) {
    if (runId !== state.runId || state.paused) return;
    setPersona(who, true);
    setNow(`${persona[who].name}: ${text}`);
    showCaption(who, text);
    try {
      const source = await apiSpeech(who, text);
      if (source) {
        await new Promise((resolve, reject) => {
          const audio = new Audio(source);
          state.currentAudio = audio;
          if (state.outputDevice && audio.setSinkId) audio.setSinkId(state.outputDevice).catch(() => {});
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play().catch(reject);
        });
        URL.revokeObjectURL(source);
      } else {
        await browserSpeech(who, text);
      }
    } catch (error) {
      appendTranscript("sistema", `Voz online indisponível: ${error.message}. Usando voz local.`);
      await browserSpeech(who, text);
    } finally {
      state.currentAudio = null;
      setPersona(who, false);
      hideCaption();
    }
  }

  async function runScene(sceneIndex = state.scene, startLine = state.line) {
    if (!state.running || state.paused || state.answering) return;
    const lines = script[sceneIndex] || [];
    const myRun = state.runId;
    for (let i = startLine; i < lines.length; i++) {
      if (myRun !== state.runId || !state.running || state.paused || state.answering) {
        state.line = i;
        return;
      }
      state.line = i;
      await speak(lines[i][0], lines[i][1], myRun);
      state.line = i + 1;
      if (state.listening && !state.answering) await wait(180);
    }
    if (myRun !== state.runId || !state.running || state.paused) return;
    state.line = 0;
    if (sceneIndex < script.length - 1) {
      await wait(600);
      window.presentationControl?.next();
    }
  }

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  function pause(reason = "Apresentação pausada.") {
    state.paused = true;
    state.runId++;
    state.currentAudio?.pause();
    speechSynthesis?.cancel();
    setPersona("", false);
    hideCaption();
    setNow(reason);
    setStatus("IA pausada · controle humano", "");
    document.body.classList.remove("studio-running");
  }

  function resume() {
    if (!state.running) state.running = true;
    state.paused = false;
    state.runId++;
    setStatus(state.listening ? "apresentando · escuta ativa" : "apresentando", "live");
    document.body.classList.add("studio-running");
    banner("lia", "Retomando a apresentação.");
    runScene(state.scene, state.line);
  }

  function silence() {
    pause("Tudo silenciado. Você está no controle.");
    state.running = false;
    state.line = 0;
    stopListening();
    setStatus("silêncio de emergência", "");
  }

  async function startPresentation() {
    el.confirm.classList.remove("open");
    state.running = true;
    state.paused = false;
    state.scene = window.presentationControl?.current || 0;
    state.line = 0;
    state.runId++;
    document.body.classList.add("studio-running");
    setStatus(state.listening ? "apresentando · escuta ativa" : "apresentando", "live");
    if (!state.introDone) {
      await speak("lia", "Oi, pessoal! Eu sou a LIA, uma inteligência artificial criada pelo Vinícius para conduzir esta conversa. Vou facilitar a jornada, conectar as ideias e provocar algumas reflexões.", state.runId);
      await speak("icaro", "E eu sou o ÍCARO. Sou o especialista técnico desta dupla: vou ajudar a traduzir maturidade, agentes, governança e uso responsável da IA para a realidade do trabalho de vocês.", state.runId);
      state.introDone = true;
    }
    if (window.presentationControl?.presenterOnly) {
      state.manualHold = true;
      if (!window.presentationControl?.presenterCall) {
        pause("Slide conduzido pelo apresentador.");
        return;
      }
      state.paused = false;
      await speak("lia", "Vinícius, é com você. Apresente esta etapa e, quando quiser, avance para continuarmos.", state.runId);
      pause("Slide conduzido pelo apresentador.");
      return;
    }
    if (window.presentationControl?.presenterHandoff) {
      state.manualHold = true;
      state.paused = false;
      await speak("lia", presenterPrompt(), state.runId);
      pause("Aguardando a participação do Vinícius.");
      return;
    }
    runScene(state.scene, 0);
  }

  function appendTranscript(speaker, text) {
    if (el.transcript.querySelector("em")) el.transcript.innerHTML = "";
    const line = document.createElement("div");
    const label = speaker === "publico" ? "PÚBLICO" : speaker === "sistema" ? "SISTEMA" : persona[speaker]?.name || speaker.toUpperCase();
    line.innerHTML = `<b>${label}:</b> `;
    line.append(document.createTextNode(text));
    el.transcript.append(line);
    el.transcript.scrollTop = el.transcript.scrollHeight;
  }

  async function askAI(question) {
    const clean = question.trim();
    if (!clean || state.answering) return;
    appendTranscript("publico", clean);
    const localSpeech = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const localResume = /\b(continu|retom|retorn|volta|prossegu|seguir)\w*\b.{0,55}\b(apresent|roteiro|slide|daqui|dai|ponto|parou)\w*\b|\b(apresent|roteiro)\w*\b.{0,35}\b(continu|retom|seguir)\w*\b/i.test(localSpeech) || (state.manualHold && /\b(continu|retom|retorn|volta|prossegu|seguir)\w*\b|\b(com voce|contigo|pode seguir)\b/i.test(localSpeech));
    const localHandoff = /\b(posso|vou|deixa|assum|apresent|conduz)\w*\b.{0,45}\b(apresent|daqui|deste ponto|eu)\w*\b/i.test(localSpeech) && !/pergunta|duvida|saber/i.test(localSpeech);
    if (localResume || localHandoff) {
      state.bargeInPending = false;
      state.bargeInWasRunning = false;
      state.answering = false;
      if (localHandoff) {
        state.interactiveHold = true;
        state.manualHold = true;
        pause("Combinado. O palco é seu. Quando quiser, peça para continuarmos.");
      } else {
        state.interactiveHold = false;
        state.manualHold = false;
        state.paused = false;
        state.running = true;
        state.runId++;
        setStatus(state.listening ? "apresentando · escuta ativa" : "apresentando", "live");
        document.body.classList.add("studio-running");
        await speak("lia", "Ok.", state.runId);
        runScene(state.scene, state.line);
      }
      return;
    }
    if (!state.closingDone && /\b(tem algo para dizer|algo a dizer|mensagem final|encerramento|agradecer|considerações finais)\b/i.test(clean)) {
      state.answering = true;
      state.bargeInPending = false;
      state.bargeInWasRunning = false;
      pause("Preparando o encerramento...");
      state.paused = false;
      state.runId++;
      await speak("lia", "Vinícius, obrigada por nos convidar para esta conversa e por abrir espaço para a experimentação. E a vocês, muito obrigada pela escuta, pelas perguntas e pela disposição para aprender juntos.", state.runId);
      await speak("icaro", "A maturidade em IA não termina neste encontro. Ela continua em cada tarefa bem escolhida, cada teste bem feito e cada decisão que preserva a responsabilidade humana. Obrigado a todos — e até a próxima evolução.", state.runId);
      state.closingDone = true;
      state.answering = false;
      state.running = false;
      pause("Encerramento concluído.");
      return;
    }
    state.answering = true;
    const wasRunning = state.running && !state.paused;
    const resumeAfterAnswer = wasRunning || state.bargeInWasRunning;
    state.bargeInWasRunning = false;
    state.bargeInPending = false;
    pause("Pergunta detectada. Preparando resposta...");
    let answer, who = "icaro", intent = "question";
    try {
      if (state.backend && !state.mock) {
        const res = await fetch("/api/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: clean,
            scene: state.scene,
            sceneTitle: window.presentationControl?.title,
            scriptPosition: state.line,
            scriptContext: script.slice(Math.max(0, state.scene - 4), state.scene + 1)
              .flatMap((sceneLines, index) => sceneLines.map(([who, text]) => `Cena ${Math.max(0, state.scene - 4) + index + 1} · ${who.toUpperCase()}: ${text}`))
              .join("\\n")
          })
        });
        if (!res.ok) throw new Error(`Falha da IA (${res.status})`);
        const data = await res.json();
        intent = data.intent || "question";
        answer = data.answer;
        who = data.speaker === "lia" ? "lia" : "icaro";
        // Fallback local para intenções muito claras caso a transcrição/modelo retorne classificação ambígua.
        const normalized = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (/\b(continu|retom|retorn|volta|prossegu|seguir).{0,45}\b(apresent|roteiro|slide|dai|daqui|parou)|\b(apresent|roteiro).{0,30}\b(continu|retom|seguir)/i.test(normalized)) intent = "resume";
        if (/\b(posso|vou|deixa|assum|apresent|conduz).{0,35}\b(a partir|daqui|deste ponto|eu)|\b(eu assumo|deixa comigo)\b/i.test(normalized) && !/pergunta|duvida|saber/i.test(normalized)) intent = "handoff";
      } else {
        who = /como|exemplo|prático|começar/i.test(clean) ? "lia" : "icaro";
        answer = mockAnswer(clean, who);
      }
      if (intent === "conversation") {
        state.paused = false;
        if (resumeAfterAnswer) resume();
        return;
      }
      if (intent === "handoff") {
        state.interactiveHold = true;
        state.bargeInPending = false;
        state.bargeInWasRunning = false;
        pause("Combinado. O palco é seu. Quando quiser, peça para continuarmos.");
        return;
      }
      if (intent === "resume") {
        state.interactiveHold = false;
        state.manualHold = false;
        state.bargeInPending = false;
        state.bargeInWasRunning = false;
        state.paused = false;
        state.running = true;
        state.runId++;
        setStatus(state.listening ? "apresentando · escuta ativa" : "apresentando", "live");
        document.body.classList.add("studio-running");
        await speak("lia", "Ok.", state.runId);
        runScene(state.scene, state.line);
        return;
      }
      appendTranscript(who, answer);
      state.paused = false;
      state.runId++;
      await speak(who, answer, state.runId);
    } catch (error) {
      appendTranscript("sistema", `Não consegui responder: ${error.message}`);
      banner("lia", "Vinícius, pode assumir esta pergunta?");
    } finally {
      state.answering = false;
      if (intent === "conversation" || intent === "handoff" || intent === "resume") return;
      if (intent === "clarify") {
        state.interactiveHold = true;
        pause("Estou ouvindo. Faça a pergunta quando quiser.");
        return;
      }
      if (resumeAfterAnswer) resume();
      else pause("Pergunta concluída. Aguardando seu comando.");
    }
  }

  function mockAnswer(question, who) {
    if (/decid|parecer|responsab|aprova/i.test(question)) return "A inteligência artificial pode organizar evidências, sinalizar inconsistências e preparar um rascunho. A decisão, o parecer e a responsabilidade técnica continuam sendo humanos.";
    if (/agente|criar|começar/i.test(question)) return "Eu começaria por uma rotina pequena, recorrente e fácil de verificar. Escreva o papel, o resultado esperado, as fontes e os limites; depois teste com casos normais e exceções antes de compartilhar.";
    if (/segur|dado|lgpd|confiden/i.test(question)) return "O primeiro critério é usar somente dados autorizados e respeitar as políticas da organização. Um agente nunca amplia permissões por conta própria, e conteúdos sensíveis exigem controles e validação adequados.";
    return who === "lia"
      ? "Boa pergunta. O ponto central é começar pequeno, explicitar o combinado e manter a validação humana em cada entrega."
      : "Eu separaria a questão em três partes: a tarefa que pode ser apoiada, os limites que precisam ser explícitos e a validação humana antes de qualquer uso do resultado.";
  }

  async function refreshDevices() {
    try {
      const temp = await navigator.mediaDevices.getUserMedia({ audio: true });
      temp.getTracks().forEach(t => t.stop());
      const devices = await navigator.mediaDevices.enumerateDevices();
      fillSelect(el.input, devices.filter(d => d.kind === "audioinput"), "Entrada");
      fillSelect(el.output, devices.filter(d => d.kind === "audiooutput"), "Saída");
    } catch (error) {
      el.listener.textContent = "Permissão de áudio necessária para listar dispositivos.";
    }
  }

  function fillSelect(select, devices, fallback) {
    const old = select.value || (select === el.input ? state.inputDevice : state.outputDevice);
    select.innerHTML = `<option value="">Padrão do sistema</option>`;
    devices.forEach((d, i) => {
      const option = document.createElement("option");
      option.value = d.deviceId;
      option.textContent = d.label || `${fallback} ${i + 1}`;
      select.append(option);
    });
    if (select === el.output && !old) {
      const virtual = devices.find(d => /Voicemeeter Input|VB-Audio Voicemeeter VAIO/i.test(d.label || ""));
      if (virtual) {
        select.value = virtual.deviceId;
        state.outputDevice = virtual.deviceId;
        saveAudioSettings();
      }
    }
    if ([...select.options].some(o => o.value === old)) select.value = old;
  }

  async function startListening() {
    stopListening();
    try {
      state.stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: el.input.value ? { exact: el.input.value } : undefined, echoCancellation: false, noiseSuppression: true, autoGainControl: true }
      });
      state.audioContext = new AudioContext();
      const source = state.audioContext.createMediaStreamSource(state.stream);
      state.analyser = state.audioContext.createAnalyser();
      state.analyser.fftSize = 1024;
      source.connect(state.analyser);
      state.listening = true;
      $("#enableListening").textContent = "Desativar escuta";
      $("#enableListening").classList.add("active");
      el.listener.textContent = state.mock ? "Escuta ativa · transcrição simulada" : "Escuta ativa · aguardando fala";
      monitorLevel();
      if (!state.mock && state.backend) startRecorder();
    } catch (error) {
      el.listener.textContent = `Não foi possível abrir a entrada: ${error.message}`;
    }
  }

  function stopListening() {
    state.listening = false;
    clearInterval(state.meterTimer);
    clearTimeout(state.silenceTimer);
    if (state.recorder?.state !== "inactive") state.recorder?.stop();
    state.stream?.getTracks().forEach(t => t.stop());
    state.audioContext?.close().catch(() => {});
    state.stream = state.recorder = state.audioContext = state.analyser = null;
    el.meter.style.width = "0";
    $("#enableListening").textContent = "Ativar escuta";
    $("#enableListening").classList.remove("active");
    el.listener.textContent = "Escuta desligada.";
  }

  function monitorLevel() {
    const data = new Uint8Array(state.analyser.fftSize);
    state.meterTimer = setInterval(() => {
      if (!state.analyser) return;
      state.analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const n of data) { const v = (n - 128) / 128; sum += v * v; }
      const rms = Math.sqrt(sum / data.length);
      el.meter.style.width = `${Math.min(100, rms * 700)}%`;
      if (state.bargeIn && state.running && !state.paused && !state.answering && rms > 0.04) {
        if (!state.bargeInSince) state.bargeInSince = performance.now();
        if (performance.now() - state.bargeInSince > 180 && performance.now() - state.lastBargeIn > 1500) {
          state.lastBargeIn = performance.now();
          state.bargeInSince = 0;
          state.bargeInPending = true;
          state.bargeInWasRunning = true;
          state.audienceActive = true;
          state.audienceSilenceSince = 0;
          state.audienceText = "";
          pause("Interrupção detectada. Ouvindo a pergunta...");
        }
      } else if (state.audienceActive && state.paused && !state.answering) {
        if (rms > 0.04) {
          state.audienceSilenceSince = 0;
        } else {
          if (!state.audienceSilenceSince) state.audienceSilenceSince = performance.now();
          if (performance.now() - state.audienceSilenceSince > 1700) {
            state.audienceSilenceSince = 0;
            finishAudienceTurn();
          }
        }
      } else if (rms <= 0.04) {
        state.bargeInSince = 0;
      }
    }, 90);
  }

  function finishAudienceTurn() {
    if (!state.audienceActive) return;
    state.audienceActive = false;
    const utterance = state.audienceText.trim();
    state.audienceText = "";
    if (utterance.length > 2) {
      askAI(utterance);
    } else {
      state.bargeInPending = false;
      state.bargeInWasRunning = false;
      resume();
    }
  }

  function startRecorder() {
    if (!state.stream || !window.MediaRecorder) return;
    const mime = ["audio/webm;codecs=opus", "audio/webm"].find(MediaRecorder.isTypeSupported) || "";
    state.recorder = new MediaRecorder(state.stream, mime ? { mimeType: mime } : undefined);
    state.chunks = [];
    state.recorder.ondataavailable = e => { if (e.data.size) state.chunks.push(e.data); };
    state.recorder.onstop = async () => {
      const blob = new Blob(state.chunks, { type: state.recorder?.mimeType || "audio/webm" });
      state.chunks = [];
      if (blob.size > 5000 && state.listening) await transcribe(blob);
      if (state.listening && !state.mock) {
        await wait(150);
        startRecorder();
      }
    };
    state.recorder.start();
    // Blocos curtos reduzem o tempo entre a interrupção e a transcrição.
    setTimeout(() => { if (state.recorder?.state === "recording") state.recorder.stop(); }, 800);
  }

  async function transcribe(blob) {
    el.listener.textContent = "Transcrevendo trecho...";
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": blob.type || "audio/webm" },
        body: blob
      });
      if (!res.ok) throw new Error(`falha ${res.status}`);
      const data = await res.json();
      const text = (data.text || "").trim();
      el.listener.textContent = "Escuta ativa · aguardando fala";
      const isBargeIn = state.bargeInPending;
      if (isBargeIn) {
        state.audienceText = `${state.audienceText} ${text}`.trim();
      } else if (text && /[?]|como|por que|por quê|qual|pode|explica|dúvida|pergunta|quero saber|gostaria de saber/i.test(text)) {
        askAI(text);
      } else if (text) {
        appendTranscript("publico", text);
      }
    } catch (error) {
      el.listener.textContent = `Transcrição indisponível: ${error.message}`;
    }
  }

  $("#studioLaunch").onclick = () => { state.open = true; el.studio.classList.add("open"); if (!state.listening) startListening(); };
  $("#studioClose").onclick = () => { state.open = false; el.studio.classList.remove("open"); };
  $("#studioStart").onclick = () => el.confirm.classList.add("open");
  $("#cancelStart").onclick = () => el.confirm.classList.remove("open");
  $("#confirmStart").onclick = startPresentation;
  $("#studioPause").onclick = () => pause();
  $("#studioResume").onclick = resume;
  $("#studioSilence").onclick = silence;
  $("#studioSettingsBtn").onclick = () => { el.settings.classList.toggle("open"); if (el.settings.classList.contains("open")) refreshDevices(); };
  $("#enableListening").onclick = () => state.listening ? stopListening() : startListening();
  $("#clearTranscript").onclick = () => el.transcript.innerHTML = "<em>Nenhuma fala capturada.</em>";
  $("#sendQuestion").onclick = () => { const input = $("#questionInput"); askAI(input.value); input.value = ""; };
  $("#questionInput").onkeydown = e => { if (e.key === "Enter") $("#sendQuestion").click(); };
  el.input.onchange = () => { state.inputDevice = el.input.value; saveAudioSettings(); };
  el.output.onchange = () => { state.outputDevice = el.output.value; saveAudioSettings(); };
  el.mock.onchange = () => {
    state.mock = el.mock.checked;
    saveAudioSettings();
    if (state.listening) { stopListening(); startListening(); }
  };

  window.addEventListener("presentation:scenechange", event => {
    state.scene = event.detail.index;
    state.line = 0;
    const interactive = window.presentationControl?.interactive;
    const presenterOnly = window.presentationControl?.presenterOnly;
    const presenterCall = window.presentationControl?.presenterCall;
    const presenterHandoff = window.presentationControl?.presenterHandoff;
    if (state.running && !state.answering) {
      state.runId++;
      state.currentAudio?.pause();
      speechSynthesis?.cancel();
      if (!presenterOnly && state.manualHold) {
        state.interactiveHold = true;
        pause("Slide pronto. Diga que podemos continuar.");
        return;
      }
      if (presenterHandoff) {
        state.interactiveHold = true;
        state.manualHold = true;
        state.paused = false;
        speak("lia", presenterPrompt(), state.runId)
          .then(() => pause("Aguardando a participação do Vinícius."));
        return;
      }
      if (presenterOnly) {
        state.interactiveHold = true;
        state.manualHold = true;
        if (!presenterCall) {
          pause("Slide conduzido pelo apresentador.");
          return;
        }
        state.paused = false;
        speak("lia", "Vinícius, é com você. Apresente esta etapa e, quando quiser, avance para continuarmos.", state.runId)
          .then(() => pause("Slide conduzido pelo apresentador."));
      } else if (interactive) {
        state.interactiveHold = true;
        state.paused = false;
        speak("lia", presenterPrompt(), state.runId)
          .then(() => pause("Momento do apresentador. Diga: continue a apresentação."));
      } else {
        state.interactiveHold = false;
        state.paused = false;
        runScene(state.scene, 0);
      }
    }
  });

  window.addEventListener("keydown", event => {
    if (event.altKey && event.key.toLowerCase() === "p") pause();
    if (event.altKey && event.key.toLowerCase() === "r") resume();
    if (event.altKey && event.key.toLowerCase() === "s") silence();
    if (event.altKey && event.key.toLowerCase() === "i") el.studio.classList.toggle("open");
  });

  checkBackend();
})();
