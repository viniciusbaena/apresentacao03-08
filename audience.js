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
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

function showTab(name) {
  $$(".activity-tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  $$(".activity").forEach(s => s.classList.toggle("active", s.dataset.activity === name));
}
$$(".activity-tabs button").forEach(btn => btn.addEventListener("click", () => showTab(btn.dataset.tab)));

function vote(type, index, button) {
  const key = `culture-ai-v2:${type}`;
  if (localStorage.getItem(key) !== null) return;
  db.ref(`${root}/polls/${type}/${index}`).transaction(v => (v || 0) + 1);
  localStorage.setItem(key, String(index));
  const activity = button.closest(".activity");
  $$("[data-vote]", activity).forEach(b => b.disabled = true);
  button.classList.add("selected");
  $(".vote-feedback", activity).textContent = "✓ Resposta registrada. Obrigado!";
}
$$("[data-vote]").forEach(btn => {
  const [type, index] = btn.dataset.vote.split(":");
  const previous = localStorage.getItem(`culture-ai-v2:${type}`);
  if (previous !== null) {
    btn.closest(".activity").querySelectorAll("[data-vote]").forEach(b => b.disabled = true);
    if (String(index) === previous) btn.classList.add("selected");
    $(".vote-feedback", btn.closest(".activity")).textContent = "✓ Sua resposta já está registrada.";
  }
  btn.addEventListener("click", () => vote(type, Number(index), btn));
});

let activeQuiz = 0;
db.ref(`${root}/activeQuiz`).on("value", snap => {
  const data = snap.val();
  if (!data) return;
  activeQuiz = Number(data.index || 0);
  $("#mobileScenario").textContent = data.text;
  const key = `culture-ai-v2:quiz:${activeQuiz}`;
  const previous = localStorage.getItem(key);
  const activity = $('[data-activity="quiz"]');
  $$("[data-quizvote]", activity).forEach(btn => {
    btn.disabled = previous !== null;
    btn.classList.toggle("selected", btn.dataset.quizvote === previous);
  });
  $(".vote-feedback", activity).textContent = previous !== null ? "✓ Sua resposta já está registrada." : "";
});
$$("[data-quizvote]").forEach(btn => btn.addEventListener("click", () => {
  const key = `culture-ai-v2:quiz:${activeQuiz}`;
  if (localStorage.getItem(key) !== null) return;
  const answer = btn.dataset.quizvote;
  db.ref(`${root}/quiz/${activeQuiz}/${answer}`).transaction(v => (v || 0) + 1);
  localStorage.setItem(key, answer);
  const activity = btn.closest(".activity");
  $$("[data-quizvote]", activity).forEach(b => b.disabled = true);
  btn.classList.add("selected");
  $(".vote-feedback", activity).textContent = "✓ Resposta registrada. Aguarde a revelação!";
}));

window.addEventListener("online", () => $(".connected").textContent = "conectado");
window.addEventListener("offline", () => $(".connected").textContent = "sem conexão");
