# Data Academy — Python for Data Analysis

An interactive, beginner-friendly course that runs **real Python in the browser**.
No installation on the learner's machine: code cells execute on **Pyodide** (Python
compiled to WebAssembly), datasets are served from the local folder, and progress is
saved in `localStorage`.

## What is inside

```
academy/
├── index.html                 # app shell
├── server.js                  # zero-dependency Node static server
├── assets/
│   ├── css/app.css
│   └── js/
│       ├── app.js             # router, renderer, quiz/exercise logic
│       ├── markdown.js        # dependency-free markdown renderer
│       ├── runtime.worker.js  # Pyodide worker: runs code + hidden checks
│       └── content/           # course content (one file per week)
│           ├── index.js       # WEEKS + GLOSSARY
│           └── week-0.js … week-10.js
├── datasets/                  # 7 practice CSVs
└── tools/make_datasets.js     # regenerates datasets deterministically
```

## Run it

**Prerequisites:** Node.js (tested on v24).

- **Windows:** double-click `start.bat`.
- **Any platform:** `cd academy && npm start`, or `node server.js 8080`.

Open **http://localhost:8080**.

The first time a code cell runs, Pyodide downloads its runtime (~10 MB) from jsDelivr.
After that it is cached by the browser. If the network is unavailable, code cells will
show an error banner; everything else (lessons, quizzes, notes) still works.

## What a learner gets

- **11 weeks** of content: foundations → Python basics → pandas tables → cleaning →
  grouping/joins → visualization → EDA → control flow → dates/prediction → robust
  notebooks → capstone.
- **Code cells** with a Run button; variables persist between cells in a week.
- **Exercises** graded by hidden Python checks, with hints and a "passed" state.
- **Quizzes** marked instantly; 70% to pass; retry allowed.
- **Notes** and **checklists** saved locally per browser.
- **Progress tracking** across the whole course, shown in the sidebar and home page.
- **Glossary** with search.

## Editing the course

Each week is a single file in `assets/js/content/`. A block is one of:
`text`, `callout`, `table`, `details`, `code`, `exercise`, `notes`, `checklist`,
`quiz`. See any week file for examples. Datasets are regenerated with
`npm run datasets`.

## Notes on grading

Exercise `checks` blocks are Python code that runs in the same session as the learner's
code. `expect()` / `expect_defined()` raise `CheckFailure` with a learner-facing
message. Keep checks specific to the objective of the exercise (variable names,
values, dtypes) rather than stylistic.