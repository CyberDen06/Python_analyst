# Python for Data Analysis — Course Plan

**Audience:** Absolute beginners. No prior coding, statistics, or data-analysis experience is assumed.
**Environment:** Interactive, browser-based learning (zero installation on the learner's machine).
**Length:** 10 weeks + capstone showcase (one theme per week, roughly 3–5 hours per week).

---

## 1. Purpose

By the end of the course, a beginner should be able to take a real-world client question, find or build a small dataset, clean it in Python with pandas, explore it with statistics and charts, and communicate a plain-language answer — all inside an interactive notebook they can rerun and share.

The course does not aim to train software engineers. It trains **data analysts who happen to use Python**: ask first, compute second, communicate always.

---

## 2. Learning philosophy

| Principle | What it means in practice |
|-----------|---------------------------|
| **Client first** | Every week opens with a short, realistic client brief (a tutoring company in Ibadan, a phone retailer in Lagos, etc.). Learners never ask "why am I learning this?" — they ask "what does the client need to decide?" |
| **Interactive, not passive** | Concepts are taught through live code-along in notebooks, "type-along" blocks, fill-in-the-blank cells, and exit tickets. No long lecture blocks without code. |
| **One dataset per theme** | Each week works with one realistic dataset so skills compound: schools → phones → sales transactions → website traffic → survey responses. |
| **Deliverable every week** | Each week ends with a small notebook deliverable and a 2–3 minute "client readout" (spoken or written summary). |
| **Safe to break** | Notebooks run in the browser; learners can reset, copy, and experiment without breaking anything on their own computers. |

---

## 3. Interactive learning environment

### 3.1 Where learners work
**Google Colab** (or JupyterLite as a local fallback):
- Runs in the browser; nothing to install.
- Mixes code cells, output, charts, and plain-language notes in one document.
- Easy to share with instructors and peers via link.
- Free tier is sufficient for the course datasets (hundreds to low thousands of rows).

Each learner keeps a personal course folder:
```
my-data-analysis-course/
├── week-0-foundations/
├── week-1-python-basics/
├── ...
└── capstone/
```

### 3.2 Weekly rhythm (suggested)

| Day | Activity | Time |
|-----|----------|------|
| Monday | Client brief + live code-along (new concepts) | 60–90 min |
| Wednesday | Guided lab: learners modify and extend the code | 60–90 min |
| Friday | Independent practice + client readout + exit ticket | 30–45 min |

Every session follows the same arc: **brief → concept → type-along → tinker → readout → exit ticket.**

### 3.3 Tools stack

| Tool | Role |
|------|------|
| Google Colab / Jupyter notebook | Interactive code + notes |
| Python 3 | Language |
| pandas | Tables (DataFrames) |
| matplotlib / seaborn | Charts |
| built-in `csv`, `datetime` | Supporting stdlib |
| GitHub (optional, Week 6+) | Portfolio of notebooks |

---

## 4. Course arc (five phases)

| Phase | Weeks | Focus |
|-------|-------|-------|
| Phase 1 — Foundations | 0–1 | Think like an analyst; write first Python (no pandas yet) |
| Phase 2 — Tables | 2–4 | Load, inspect, filter, sort, group, aggregate, join with pandas |
| Phase 3 — See the data | 5–7 | Clean messy data, visualize, run a full exploratory analysis |
| Phase 4 — Explain & predict | 8–9 | Dates/time, robust notebooks, first look at prediction, communicate |
| Phase 5 — Capstone | 10 | End-to-end project from client brief to client readout |

---

## 5. Assessment strategy

| Component | Weight | What it checks |
|-----------|--------|----------------|
| Weekly exit tickets | 30% | Concept vocabulary (types, rows vs columns, mean vs median, etc.) |
| Weekly notebook deliverables | 40% | Working code: correct operations, clean names, a readable readout cell |
| Capstone notebook + presentation | 30% | Full analysis cycle on a dataset the learner chooses or is assigned |

Pass mark: 70% overall, with every weekly deliverable submitted. Resubmission is allowed once per week with instructor feedback.

---

## 6. Instructor / facilitator guidance

- **Demo first, explain after.** Run the code, show the output, then name the concept.
- **Keep cells small.** One concept per cell so errors are easy to locate.
- **Naming matters from day one.** Enforce `snake_case`, units in names (`price_ngn`), and no keywords as variable names — these habits prevent 80% of beginner bugs.
- **Common beginner failure modes:** confusing `=` with maths equals, adding strings to numbers, forgetting `import pandas as pd`, unquoted strings, case-sensitive names. Keep an error cheat sheet handy (`NameError`, `SyntaxError`, `TypeError`, `KeyError`, `FileNotFoundError`).
- **Timing cue:** protect the lab time. If a code-along runs long, trim the concept explanation, not the hands-on time.

---

## 7. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Learners fall behind on setup | Zero-install browser environment; backup CSV datasets distributed in advance |
| Copy-paste without understanding | Type-along required; every lab asks learners to change one variable and predict the output |
| Maths anxiety | Statistics taught with five-number examples before any formula |
| "It works on my notebook" | Shared environment; deliverables are notebook links, not files emailed around |

---

## 8. Relationship to existing materials

This plan builds on two lessons already in this folder:
- `First_lesson.py` — Week 0: Data Analysis Essentials (data vs information vs insight, the six analysis steps, dataset anatomy, data types, data quality, basic statistics, analysis types, thinking traps, exit ticket).
- `foundational_lesson.py` — Week 1: Python Basics (data types, variables, keywords, collections, f-strings, client readout).

Both lessons are written as runnable lesson scripts and can be converted directly into Week 0 and Week 1 notebooks.

## 9. Interactive implementation

A working version of this plan lives in `academy/`:

- **Run it:** double-click `academy/start.bat` (Windows) or run `cd academy && npm start`, then open http://localhost:8080.
- **What it includes:** all 11 weeks as interactive lessons, real Python execution in the browser via Pyodide, auto-graded exercises with hints and hidden checks, instant-scored quizzes, saved notes/checklists, glossary search, and course-wide progress tracking.
- **Environment requirement:** a modern browser and internet access on first code run (Pyodide is fetched from a CDN and cached by the browser). No Python or pip install is needed on the learner's machine.
- **Structure:** `academy/README.md` documents the layout and how to edit or add weeks.

---

*Prepared for: Python_4_Data_Analysis course development. Working directory: `C:\Users\SMTIH-CEST_24\Documents\Python_4_Data_Analysis`.*
