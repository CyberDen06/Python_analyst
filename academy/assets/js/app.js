import { mdToHtml } from "./markdown.js";
import { WEEKS, GLOSSARY } from "./content/index.js";

/* ============================================================
   Data Academy — application logic
   Router, renderer, Pyodide worker bridge, exercise grading,
   quiz scoring, notes/checklist persistence, progress tracking.
   ============================================================ */

const STORAGE_KEY = "data-academy-v1";
const DATASETS = [
  { name: "lagos_phones.csv", url: "/datasets/lagos_phones.csv" },
  { name: "shop_sales.csv", url: "/datasets/shop_sales.csv" },
  { name: "shop_sales_messy.csv", url: "/datasets/shop_sales_messy.csv" },
  { name: "product_catalogue.csv", url: "/datasets/product_catalogue.csv" },
  { name: "website_traffic.csv", url: "/datasets/website_traffic.csv" },
  { name: "daily_sales.csv", url: "/datasets/daily_sales.csv" },
  { name: "ibadan_schools.csv", url: "/datasets/ibadan_schools.csv" },
];

const state = {
  currentWeek: null,
  progress: { exercises: {}, quizzes: {}, notes: {}, checklist: {}, detailsOpen: {} },
  runtime: { worker: null, ready: false, error: null, pending: {}, nextId: 1 },
};

const view = document.getElementById("view");
const weekNav = document.getElementById("week-nav");
const crumbs = document.getElementById("crumbs");
const sideProgress = document.getElementById("side-progress-pct");
const sideFill = document.getElementById("side-progress-fill");
const runtimeChip = document.getElementById("runtime-chip");
const runtimeDot = document.getElementById("runtime-dot");
const runtimeText = document.getElementById("runtime-text");
const runtimeBanner = document.getElementById("runtime-banner");
const toastRegion = document.getElementById("toast-region");

/* -------------------------- storage ------------------------- */

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state.progress = {
        exercises: p.exercises || {},
        quizzes: p.quizzes || {},
        notes: p.notes || {},
        checklist: p.checklist || {},
        detailsOpen: p.detailsOpen || {},
      };
    }
  } catch (e) {
    console.warn("load progress", e);
  }
}
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) {
    console.warn("save progress", e);
  }
}
const debouncedSave = (() => {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(saveProgress, 300);
  };
})();

/* -------------------------- progress math ------------------ */

function weekItems(week) {
  let total = 0;
  let passed = 0;
  for (const section of week.sections) {
    for (const block of section.blocks) {
      if (block.type === "exercise") {
        total += 1;
        if (state.progress.exercises[block.id]) passed += 1;
      } else if (block.type === "quiz") {
        total += 1;
        const q = state.progress.quizzes[block.id];
        if (q && q.passed) passed += 1;
      }
    }
  }
  return { total, passed };
}

function courseProgress() {
  let total = 0;
  let passed = 0;
  for (const week of WEEKS) {
    const { total: t, passed: p } = weekItems(week);
    total += t;
    passed += p;
  }
  return total === 0 ? 0 : Math.round((passed / total) * 100);
}

function weekProgressPct(week) {
  const { total, passed } = weekItems(week);
  return total === 0 ? 100 : Math.round((passed / total) * 100);
}

function isWeekDone(week) {
  return weekProgressPct(week) === 100;
}

/* -------------------------- runtime ------------------------ */

function runtimeStatus(status) {
  runtimeChip.className = "runtime-chip";
  switch (status) {
    case "loading-core":
    case "loading-packages":
    case "loading-data":
      runtimeChip.classList.add("loading");
      runtimeText.textContent = "Python: starting…";
      break;
    case "ready":
      runtimeChip.classList.add("ready");
      runtimeText.textContent = "Python: ready";
      break;
    case "error":
      runtimeChip.classList.add("error");
      runtimeText.textContent = "Python: error";
      break;
  }
  state.runtime.ready = status === "ready";
}

function runtimeError(message) {
  state.runtime.error = message;
  runtimeStatus("error");
  runtimeBanner.hidden = false;
  document.getElementById("runtime-banner-text").textContent = message;
}

function postWorker(msg) {
  if (state.runtime.worker) state.runtime.worker.postMessage(msg);
}

function initRuntime() {
  runtimeStatus("loading-core");
  const worker = new Worker(new URL("./runtime.worker.js", import.meta.url));
  state.runtime.worker = worker;

  worker.onmessage = (event) => {
    const msg = event.data;
    switch (msg.type) {
      case "status":
        runtimeStatus(msg.status);
        break;
      case "ready":
        runtimeStatus("ready");
        break;
      case "init-error":
        runtimeError(msg.message);
        break;
      case "result":
        handleResult(msg);
        break;
    }
  };
  worker.onerror = (err) => {
    runtimeError("Worker failed to load: " + (err && err.message));
  };

  postWorker({ type: "init", indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/", datasets: DATASETS });
}

function sendRun(id, code, checks) {
  return new Promise((resolve, reject) => {
    if (!state.runtime.ready) {
      reject(new Error("Python is still starting up. Wait a moment and try again."));
      return;
    }
    state.runtime.nextId += 1;
    const msgId = id || "run-" + state.runtime.nextId;
    state.runtime.pending[msgId] = { resolve, reject };
    postWorker({ type: "run", id: msgId, code, checks });
  });
}

function handleResult(msg) {
  const pending = state.runtime.pending[msg.id];
  if (!pending) return;
  delete state.runtime.pending[msg.id];

  const cell = document.getElementById("cell-out-" + msg.id);
  const statusRow = document.getElementById("cell-status-" + msg.id);
  if (statusRow) statusRow.style.display = "none";

  if (cell) {
    cell.innerHTML = "";
    const hasContent = !!(msg.stdout || msg.stderr || (msg.figures && msg.figures.length) || msg.message);
    cell.style.display = hasContent ? "block" : "none";
  }

  if (msg.stdout) {
    const pre = document.createElement("div");
    pre.className = "out-text";
    pre.textContent = msg.stdout;
    cell.appendChild(pre);
  }
  if (msg.stderr) {
    const pre = document.createElement("div");
    pre.className = "out-err";
    pre.textContent = msg.stderr;
    cell.appendChild(pre);
  }
  for (const b64 of msg.figures || []) {
    const img = document.createElement("img");
    img.src = "data:image/png;base64," + b64;
    cell.appendChild(img);
  }

  if (msg.isCheck) {
    const passBanner = document.getElementById("pass-banner-" + msg.id);
    const status = document.getElementById("exercise-status-" + msg.id);
    const blockId = msg.id.split("-").slice(2).join("-");
    if (msg.ok) {
      state.progress.exercises[blockId] = true;
      saveProgress();
      if (passBanner) passBanner.classList.add("show");
      if (status) {
        status.textContent = "Passed";
        status.className = "exercise-status pass";
      }
      toast("Exercise passed ✅");
    } else {
      state.progress.exercises[blockId] = false;
      saveProgress();
      if (passBanner) passBanner.classList.remove("show");
      if (status) {
        status.textContent = "Not yet";
        status.className = "exercise-status try";
      }
      const out = document.createElement("div");
      out.className = "out-message error";
      out.textContent = msg.message || "Check did not pass. Read the hints and try again.";
      if (cell) {
        cell.appendChild(out);
        cell.style.display = "block";
      }
    }
  } else if (msg.message && !msg.ok) {
    const out = document.createElement("div");
    out.className = "out-message error";
    out.textContent = msg.message;
    if (cell) {
      cell.appendChild(out);
      cell.style.display = "block";
    }
  }

  refreshUI();
  pending.resolve(msg);
}

/* -------------------------- UI helpers --------------------- */

function toast(message, kind = "good") {
  const el = document.createElement("div");
  el.className = "toast " + kind;
  el.textContent = message;
  toastRegion.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function esc(s) {
  return String(s ?? "");
}
function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function $sel(selector, root = document) {
  return root.querySelector(selector);
}
function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function refreshUI() {
  const pct = courseProgress();
  sideProgress.textContent = pct + "%";
  sideFill.style.width = pct + "%";
  for (const item of $all(".week-link[data-week], .week-card[data-week]")) {
    const week = WEEKS.find((w) => w.id === item.dataset.week);
    if (!week) continue;
    const done = isWeekDone(week);
    const wp = weekProgressPct(week);
    item.classList.toggle("done", done);
    item.classList.toggle("active", state.currentWeek === week.id && item.classList.contains("week-link"));
    const pctEl = item.querySelector(".week-pct, .week-card-pct");
    if (pctEl) pctEl.textContent = wp + "%";
    const bar = item.querySelector(".week-card-bar i");
    if (bar) bar.style.width = wp + "%";
    const numEl = item.querySelector(".week-num, .week-card-num");
    if (numEl && item.classList.contains("week-card")) numEl.textContent = done ? "✓" : "W" + week.number;
  }
}

/* -------------------------- rendering ---------------------- */

function renderHome() {
  state.currentWeek = null;
  crumbs.innerHTML = "<strong>Home</strong>";
  let html = `
    <section class="hero">
      <div class="hero-kicker">Data Academy · Interactive</div>
      <h1>Python for <span class="accent">Data Analysis</span></h1>
      <p class="lede">A beginner-friendly, fully interactive course. Every lesson runs real Python in your browser — no installation, no setup. Work through client briefs, write code, get instant feedback, and build a portfolio of notebooks.</p>
      <div class="hero-actions">
        <a href="#/week-0" class="btn">Start with Week 0</a>
        <a href="#/glossary" class="btn outline">Glossary</a>
      </div>
      <div class="hero-side">
        <div class="ring" style="--pct:${courseProgress()}">
          <div class="ring-inner"><strong>${courseProgress()}%</strong><span>complete</span></div>
        </div>
      </div>
    </section>
    <div class="stats-row">
      <div class="stat-card"><strong>${WEEKS.length}</strong><span>weeks</span></div>
      <div class="stat-card"><strong>${WEEKS.reduce((s, w) => s + w.sections.length, 0)}</strong><span>lesson sections</span></div>
      <div class="stat-card"><strong>${WEEKS.reduce((s, w) => s + weekItems(w).total, 0)}</strong><span>interactive checks</span></div>
      <div class="stat-card"><strong>Browser</strong><span>Python (Pyodide)</span></div>
    </div>
    <h2>Course path</h2>
    <div class="week-grid">
      ${WEEKS.map((week) => {
        const wp = weekProgressPct(week);
        const done = isWeekDone(week);
        return `
          <a href="#/${week.id}" class="week-card${done ? " done" : ""}" data-week="${week.id}">
            <div class="week-card-top">
              <span class="week-card-num">${done ? "✓" : "W" + week.number}</span>
              <span class="week-card-pct week-pct">${wp}%</span>
            </div>
            <h3>${escapeHtml(week.title)}</h3>
            <p>${escapeHtml(week.tagline)}</p>
            <div class="week-card-bar"><i style="width:${wp}%"></i></div>
          </a>
        `;
      }).join("")}
    </div>
    <div class="home-note">
      <span class="big">💡</span>
      <div>
        <strong>No installation required.</strong> Code cells run on Pyodide — Python compiled to WebAssembly — inside this browser tab. Your progress, notes, and answers are saved on this device only.
      </div>
    </div>
  `;
  view.innerHTML = html;
}

function renderClientCard(week) {
  const c = week.client;
  return `
    <div class="client-card">
      <div class="client-label">📬 Client brief — ${esc(c.name)}</div>
      <div class="client-brief">${esc(c.brief)}</div>
      <div class="client-question"><strong>Question:</strong> ${esc(c.question)}</div>
    </div>
  `;
}

function renderObjectives(week) {
  return `
    <div class="objectives">
      <summary>What you'll be able to do after this week</summary>
      <ul>
        ${week.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderBlock(block, weekId) {
  const cid = block.id;
  const fullId = `${weekId}-${cid}`;
  switch (block.type) {
    case "text":
      return `<div class="block text">${mdToHtml(block.md)}</div>`;
    case "callout":
      return `<div class="block callout ${block.variant || "note"}"><span class="ico">ℹ️</span><div class="callout-body">${mdToHtml(block.md)}</div></div>`;
    case "table":
      return `<div class="block text">${mdToHtml(
        "| " + block.headers.join(" | ") + " |\n" +
        "| " + block.headers.map(() => "---").join(" | ") + " |\n" +
        block.rows.map((r) => "| " + r.join(" | ") + " |").join("\n")
      )}</div>`;
    case "details":
      return `
        <div class="block">
          <details class="reveal" id="reveal-${fullId}">
            <summary>${esc(block.summary)}</summary>
            <div class="reveal-body">${mdToHtml(block.md)}</div>
          </details>
        </div>
      `;
    case "code":
      return `
        <div class="block code-card" id="card-${fullId}">
          <div class="code-head">
            <span class="code-title">${esc(block.title)}</span>
            <span class="code-tag">code</span>
            <div class="code-actions">
              <button class="btn ghost small" type="button" data-action="run" data-cell="${fullId}">Run ▶</button>
            </div>
          </div>
          <textarea class="code-editor" id="editor-${fullId}" rows="${block.rows || 8}" spellcheck="false" placeholder="Type Python code here…">${esc(block.code || "")}</textarea>
          <div class="code-out" id="cell-out-${fullId}"></div>
        </div>
      `;
    case "exercise": {
      const passed = !!state.progress.exercises[cid];
      return `
        <div class="block exercise">
          <div class="exercise-head">
            <span class="exercise-label">Exercise</span>
            <span class="exercise-title">${esc(block.title)}</span>
            <span class="exercise-status ${passed ? "pass" : ""}" id="exercise-status-${fullId}">${passed ? "Passed" : "Not yet"}</span>
          </div>
          <div class="exercise-prompt">${mdToHtml(block.prompt)}</div>
          <div class="code-card">
            <div class="code-head">
              <span class="code-title">Your code</span>
              <span class="code-tag">exercise</span>
              <div class="code-actions">
                <button class="btn ghost small" type="button" data-action="check" data-cell="${fullId}">Check my work ▶</button>
              </div>
            </div>
            <textarea class="code-editor" id="editor-${fullId}" rows="${block.rows || 8}" spellcheck="false" placeholder="Write your solution…">${esc(block.starter || "")}</textarea>
            <div class="code-out" id="cell-out-${fullId}"></div>
          </div>
          <div class="exercise-pass-banner" id="pass-banner-${fullId}">
            ✅ Correct! Move on when you're ready.
          </div>
          ${block.hints && block.hints.length ? `
            <div class="exercise-hints">
              ${block.hints.map((h) => `<div class="hint">${esc(h)}</div>`).join("")}
            </div>` : ""}
        </div>
      `;
    }
    case "notes":
      return `
        <div class="block notes-card">
          <div class="notes-head">
            <span class="notes-label">📝 Notes</span>
            <span>Your answer</span>
            <span class="notes-saved" id="notes-saved-${fullId}">saved</span>
          </div>
          <div class="notes-prompt">${mdToHtml(block.prompt)}</div>
          <textarea class="notes-area" id="notes-${fullId}" placeholder="${esc(block.placeholder || "")}" spellcheck="false">${esc(state.progress.notes[cid] || "")}</textarea>
        </div>
      `;
    case "checklist": {
      const checks = state.progress.checklist[cid] || block.items.map(() => false);
      return `
        <div class="block checklist">
          <div class="checklist-head">
            <span class="checklist-label">✅ ${esc(block.title)}</span>
          </div>
          <div class="checklist-body">
            ${block.items.map((item, i) => `
              <div class="check-item${checks[i] ? " done" : ""}" id="checklist-${fullId}-${i}">
                <input type="checkbox" ${checks[i] ? "checked" : ""} data-action="checklist" data-cell="${fullId}" data-index="${i}">
                ${esc(item)}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
    case "quiz": {
      const qstate = state.progress.quizzes[cid] || {};
      const answered = qstate.passed !== undefined || qstate.score !== undefined;
      const chosen = Array.isArray(qstate.chosen) ? qstate.chosen : null;
      const qs = block.questions.map((q, qi) => {
        const userChoice = answered && chosen ? chosen[qi] : null;
        const opts = q.options
          .map((opt, oi) => {
            let cls = "quiz-option";
            let extra = "";
            if (answered) {
              if (oi === q.answer) cls += " correct";
              else if (oi === userChoice) cls += " incorrect";
              cls += " locked";
              extra += " disabled";
            }
            const checked = answered && oi === userChoice ? " checked" : "";
            return `<label class="${cls}">
              <input type="radio" name="quiz-${fullId}-q${qi}" value="${oi}"${checked}${extra}> ${esc(opt)}
            </label>`;
          })
          .join("");
        const why = answered
          ? `<div class="quiz-why show">${esc(q.why)}</div>`
          : "";
        return `<div class="quiz-q"><p><span class="q-num">Q${qi + 1}</span>${esc(q.q)}</p><div class="quiz-options">${opts}</div>${why}</div>`;
      }).join("");

      let foot = "";
      if (answered) {
        const pct = Math.round((qstate.score || 0) * 100);
        foot = `<div class="quiz-foot"><span class="quiz-result ${qstate.passed ? "pass" : "fail"}">${
          qstate.passed ? "✅ Passed — " + pct + "%" : "❌ " + pct + "% — need 70% to pass"
        }</span><button class="btn ghost small" type="button" data-action="quiz-retry" data-cell="${fullId}">Retry quiz</button></div>`;
      } else {
        foot = `<div class="quiz-foot"><button class="btn small" type="button" data-action="quiz-submit" data-cell="${fullId}">Submit quiz</button></div>`;
      }

      return `
        <div class="block quiz" id="quiz-${fullId}">
          <div class="quiz-head">
            <span class="quiz-label">Quiz</span>
            <span class="quiz-title">${esc(block.title)}</span>
          </div>
          <div class="quiz-body">${qs}</div>
          ${foot}
        </div>
      `;
    }
    default:
      return `<div class="block text">${mdToHtml(String(block.md || ""))}</div>`;
  }
}

function renderSection(section, weekId) {
  let blocksHtml = "";
  for (const block of section.blocks) {
    blocksHtml += renderBlock(block, weekId);
  }
  return `
    <div class="lesson-section" id="section-${weekId}-${section.id}">
      <div class="section-head">
        <span class="section-index">${section.number || ""}</span>
        <h2>${esc(section.title)}</h2>
      </div>
      ${blocksHtml}
    </div>
  `;
}

function renderWeek(weekNumber) {
  const week = WEEKS.find((w) => w.number === weekNumber);
  if (!week) {
    view.innerHTML = `<div class="callout warn"><div class="callout-body"><strong>Week not found.</strong> Pick a week from the sidebar.</div></div>`;
    return;
  }
  state.currentWeek = week.id;
  const wp = weekProgressPct(week);
  crumbs.innerHTML = `<a href="#/">Home</a> <span class="sep">›</span> <strong>${esc(week.title)}</strong>`;

  let sectionsHtml = "";
  let sectionNum = 0;
  for (const section of week.sections) {
    sectionNum += 1;
    sectionsHtml += renderSection({ ...section, number: sectionNum }, week.id);
  }

  view.innerHTML = `
    <div class="week-head">
      <div class="week-head-top">
        <span class="week-badge">Week ${week.number}</span>
        <span class="meta-chip">${week.duration}</span>
      </div>
      <h1>${esc(week.title)}</h1>
      <div class="week-tagline">${esc(week.tagline)}</div>
      ${renderClientCard(week)}
    </div>
    ${renderObjectives(week)}
    ${sectionsHtml}
    <div class="callout tip" style="margin-top:30px">
      <span class="ico">🎯</span>
      <div class="callout-body">
        <strong>Week progress:</strong> ${wp}% complete.
        ${isWeekDone(week) ? "All interactive checks passed — you're ready for the next week." : "Finish every exercise and quiz to mark the week complete."}
      </div>
    </div>
  `;

  wireUp(week);
  refreshUI();
}

function wireUp(week) {
  // Notes auto-save
  for (const section of week.sections) {
    for (const block of section.blocks) {
      if (block.type === "notes") {
        const ta = $sel("#notes-" + week.id + "-" + block.id);
        if (ta) {
          ta.addEventListener("input", () => {
            state.progress.notes[block.id] = ta.value;
            const saved = $sel("#notes-saved-" + week.id + "-" + block.id);
            if (saved) { saved.textContent = "saving…"; saved.style.color = "#fbbf24"; }
            debouncedSave();
          });
          ta.addEventListener("blur", () => {
            const saved = $sel("#notes-saved-" + week.id + "-" + block.id);
            if (saved) { saved.textContent = "saved"; saved.style.color = "#647798"; }
            saveProgress();
          });
        }
      }
    }
  }

  // Delegate actions
  for (const btn of $all('[data-action="run"]')) {
    btn.addEventListener("click", () => runCell(btn.dataset.cell));
  }
  for (const btn of $all('[data-action="check"]')) {
    btn.addEventListener("click", () => checkExercise(btn.dataset.cell));
  }
  for (const btn of $all('[data-action="quiz-submit"]')) {
    btn.addEventListener("click", () => submitQuiz(btn.dataset.cell));
  }
  for (const btn of $all('[data-action="quiz-retry"]')) {
    btn.addEventListener("click", () => {
      // clear the quiz state and re-render
      const weekId = btn.dataset.cell.split("-").slice(0, 2).join("-");
      const blockId = btn.dataset.cell.split("-").slice(2).join("-");
      delete state.progress.quizzes[blockId];
      saveProgress();
      renderWeek(parseInt(weekId.replace("week-", ""), 10));
      toast("Quiz reset. Try again.");
    });
  }
  for (const cb of $all('[data-action="checklist"]')) {
    cb.addEventListener("change", () => toggleChecklist(cb));
  }
}

function toggleChecklist(cb) {
  const fullId = cb.dataset.cell;
  const index = parseInt(cb.dataset.index, 10);
  const blockId = fullId.split("-").slice(2).join("-");
  let arr = state.progress.checklist[blockId] || [];
  arr[index] = cb.checked;
  state.progress.checklist[blockId] = arr;
  saveProgress();
  const row = document.getElementById("checklist-" + fullId + "-" + index);
  if (row) row.classList.toggle("done", cb.checked);
  refreshUI();
}

function findBlock(fullId) {
  const weekId = fullId.split("-").slice(0, 2).join("-");
  const blockId = fullId.split("-").slice(2).join("-");
  for (const week of WEEKS) {
    for (const section of week.sections) {
      for (const block of section.blocks) {
        if (block.id === blockId) return block;
      }
    }
  }
  return null;
}

function renderWeekForBlock(fullId) {
  const weekId = fullId.split("-").slice(0, 2).join("-");
  const week = WEEKS.find((w) => w.id === weekId);
  if (week) renderWeek(week.number);
}

async function runCell(fullId) {
  const editor = $sel("#editor-" + fullId);
  const code = editor ? editor.value : "";
  try {
    await sendRun(fullId, code);
  } catch (err) {
    toast(err.message, "bad");
  }
}

async function checkExercise(fullId) {
  const editor = $sel("#editor-" + fullId);
  const code = editor ? editor.value : "";
  const block = findBlock(fullId);
  const checks = block && block.checks ? block.checks : "";
  try {
    await sendRun(fullId, code, checks);
  } catch (err) {
    toast(err.message, "bad");
  }
}

async function submitQuiz(fullId) {
  const block = findBlock(fullId);
  if (!block) return;
  const chosen = [];
  let correct = 0;
  const total = block.questions.length;

  for (let qi = 0; qi < total; qi++) {
    const selected = $sel(`input[name="quiz-${fullId}-q${qi}"]:checked`);
    if (selected) {
      chosen[qi] = Number(selected.value);
      if (Number(selected.value) === block.questions[qi].answer) correct += 1;
    } else {
      chosen[qi] = null;
    }
  }

  const score = correct / total;
  const passed = score >= 0.7;
  const blockId = fullId.split("-").slice(2).join("-");
  state.progress.quizzes[blockId] = { passed, score, chosen };
  saveProgress();

  renderWeekForBlock(fullId);
  refreshUI();
  toast(passed ? "Quiz passed ✅" : "Keep going — you need 70% to pass.", passed ? "good" : "bad");
}

function renderGlossary() {
  state.currentWeek = null;
  crumbs.innerHTML = "<strong>Glossary</strong>";
  let html = `<div class="page-head"><h1>Glossary</h1><p>Reference terms used across the course.</p><input type="text" class="search-input" id="glossary-search" placeholder="Search terms…"></div><div class="glossary-grid" id="glossary-grid">`;
  for (const g of GLOSSARY) {
    html += `<div class="gloss-item"><strong>${esc(g.term)}</strong>${esc(g.def)}</div>`;
  }
  html += "</div>";
  view.innerHTML = html;
  const search = $sel("#glossary-search");
  const grid = $sel("#glossary-grid");
  const items = $all(".gloss-item", grid);
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    for (const it of items) {
      it.style.display = it.textContent.toLowerCase().includes(term) ? "" : "none";
    }
  });
}

/* -------------------------- navigation helpers ------------- */

function renderSidebar() {
  weekNav.innerHTML = "";
  for (const week of WEEKS) {
    const link = document.createElement("a");
    link.className = "week-link";
    link.href = "#/" + week.id;
    link.dataset.week = week.id;
    link.innerHTML = `
      <span class="week-num">${week.number}</span>
      <div class="week-link-body">
        <span class="week-link-title">${esc(week.title)}</span>
        <span class="week-link-meta"><span>${esc(week.duration)}</span><em class="week-card-pct">0%</em></span>
      </div>
    `;
    weekNav.appendChild(link);
  }
}

function renderSidebarProgress() {
  const pct = courseProgress();
  sideProgress.textContent = pct + "%";
  sideFill.style.width = pct + "%";
  for (const link of $all(".week-link")) {
    const week = WEEKS.find((w) => w.id === link.dataset.week);
    if (!week) continue;
    const wp = weekProgressPct(week);
    link.classList.toggle("done", isWeekDone(week));
    link.classList.toggle("active", state.currentWeek === week.id);
    const pctEl = link.querySelector(".week-card-pct");
    if (pctEl) pctEl.textContent = wp + "%";
  }
}

/* -------------------------- router ------------------------- */

function route(hash) {
  const path = (hash || "").replace(/^#\/?/, "");
  if (path === "" || path === "home") {
    renderHome();
  } else if (path === "glossary") {
    renderGlossary();
  } else if (path.startsWith("week-")) {
    const n = parseInt(path.replace("week-", ""), 10);
    renderWeek(n);
  } else {
    renderHome();
  }
  renderSidebarProgress();
}

/* -------------------------- boot --------------------------- */

window.addEventListener("hashchange", () => route(location.hash));
window.addEventListener("load", () => {
  loadProgress();
  renderSidebar();
  initRuntime();
  route(location.hash);
  // close mobile nav when navigating
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      document.body.classList.remove("nav-open");
      document.getElementById("scrim").hidden = true;
    }
  });
});

/* -------------------------- dialogs ------------------------ */

document.getElementById("btn-help").addEventListener("click", () => {
  document.getElementById("help-dialog").showModal();
});
document.getElementById("btn-restart-kernel").addEventListener("click", () => {
  if (state.runtime.worker) state.runtime.worker.terminate();
  state.runtime.worker = null;
  state.runtime.ready = false;
  initRuntime();
  toast("Python restarted — all variables were cleared.");
});
document.getElementById("btn-reset").addEventListener("click", () => {
  document.getElementById("reset-dialog").showModal();
});
document.getElementById("btn-confirm-reset").addEventListener("click", () => {
  state.progress = { exercises: {}, quizzes: {}, notes: {}, checklist: {}, detailsOpen: {} };
  saveProgress();
  document.getElementById("reset-dialog").close();
  toast("Progress reset. Starting fresh.");
  route(location.hash);
});

// close dialogs on [data-close-dialog]
for (const btn of $all("[data-close-dialog]")) {
  btn.addEventListener("click", () => {
    const dlg = btn.closest("dialog");
    if (dlg) dlg.close();
  });
}

// runtime banner dismiss
document.getElementById("btn-dismiss-banner").addEventListener("click", () => {
  runtimeBanner.hidden = true;
});
document.getElementById("btn-retry-runtime").addEventListener("click", () => {
  runtimeBanner.hidden = true;
  if (state.runtime.worker) state.runtime.worker.terminate();
  state.runtime.worker = null;
  initRuntime();
});

// mobile nav
document.getElementById("btn-menu").addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  document.getElementById("scrim").hidden = !open;
});
document.getElementById("scrim").addEventListener("click", () => {
  document.body.classList.remove("nav-open");
  document.getElementById("scrim").hidden = true;
});

// keyboard: Ctrl+Enter runs the code cell being edited
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const ta = document.activeElement;
    if (ta && ta.classList.contains("code-editor")) {
      e.preventDefault();
      const card = ta.closest(".code-card");
      if (!card) return;
      const actionBtn = card.querySelector('[data-action="run"], [data-action="check"]');
      if (actionBtn) actionBtn.click();
    }
  }
});

/* expose for inline handlers if needed */
window.app = {
  runCell,
  checkExercise,
  submitQuiz,
  toggleChecklist,
  renderWeekForBlock,
};