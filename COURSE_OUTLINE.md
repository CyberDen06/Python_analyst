# Python for Data Analysis — Course Outline

**Audience:** Absolute beginners  
**Environment:** Interactive browser notebooks (Google Colab / JupyterLite)  
**Pace:** One theme per week; ~3–5 hours per week  
**Existing lessons:** Week 0 = `First_lesson.py`; Week 1 = `foundational_lesson.py`

---

## Week 0 — Data Analysis Foundations (no code yet)

**Theme:** Think like an analyst before you write a line of code  
**Client scenario:** After-school tutoring company choosing which private secondary schools in Ibadan to visit

**Learning outcomes**
1. Explain data → information → insight → decision
2. Describe the six steps of the data analysis process
3. Name row, column, cell, header, identifier, unit of analysis
4. Classify columns by data type (numeric continuous/discrete, categorical nominal/ordinal, boolean, date, text)
5. Spot missing values, duplicates, inconsistent formats, outliers, outdated data
6. Define count, min, max, range, mean, median, mode, percentile in plain words
7. Distinguish descriptive, diagnostic, predictive, prescriptive analysis
8. Explain correlation vs causation, and sample vs population vs bias

**Topics**
- Client brief: underline the decision, write the "I need to find out..." sentence
- Data-to-decision chain
- Dataset anatomy activity on a schools table
- Data types table with a "Why?" per column
- Five common data quality problems + four qualities of good data
- Basic statistics with a five-school tuition example (mean vs median with outliers)
- Types of analysis and thinking traps (correlation/causation, population/sample/bias)
- The six analysis steps and where each appears in the course
- Tool vocabulary: CSV, spreadsheet, database, API, Python, library, pandas, DataFrame, notebook, script, chart

**Interactive elements**
- Sort statements into data/information/insight/decision
- Build/enrich/monitor dataset prompts (Riveter-style)
- Label one row, column, cell, header, identifier in your own table
- Audit your table for the five data quality problems
- Mean vs median calculation by hand
- Match tasks to the six analysis steps

**Deliverable:** One-page document: client question, annotated dataset anatomy, data type table, data quality table, one-paragraph findings

**Assessment:** Exit ticket (definitions + mean vs median reasoning), data type table, data quality table, findings paragraph

---

## Week 1 — Python Basics: Types, Variables, Keywords

**Theme:** Your first Python code, taught through one real dataset  
**Client scenario:** Online phone retailer in Lagos comparing smartphone prices across Jumia, Konga, Slot

**Learning outcomes**
1. Identify Python types: `str`, `int`, `float`, `bool`, `None`, `list`, `dict`, `tuple`
2. Create, name, reassign variables; check type with `type()`, convert with `int()/float()/str()/bool()`
3. Follow naming rules and conventions (`snake_case`, descriptive, units, plurals for collections)
4. Explain keywords; avoid using them as variable names
5. Describe a dataset row with variables and print a client-ready f-string

**Topics**
- Core types and collections with phone listings as examples
- Type-along: `print(type(...))` for each value
- What each type lets you do (numbers add, strings join/repeat); what fails
- Type conversion: cleaning `"N185,000"` → `185000`
- Variables: store, reuse, reassign, update in place (`+=`), multiple assignment
- Naming rules (Python enforces) vs conventions (good habits)
- f-strings and number formatting (`{price_ngn:,}`, `{rating:.1f}`)
- Common errors: `NameError`, `SyntaxError`, `TypeError`
- Keywords: `import keyword`, `keyword.kwlist`, reserved words vs built-ins

**Interactive elements**
- Classify six values and check with `type()`
- Pick one row from `lagos_phones.csv`; make six variables; print one f-string sentence
- Valid/invalid variable name quiz
- Client readout: 3 volunteers read sentences; class checks types, names, units, keywords

**Deliverable:** `python_basics_phones.ipynb` — six-variable cell, type checks, list/dict/tuple, one conversion, `keyword.kwlist` output, f-string readout

**Assessment:** Exit ticket (types, `=` meaning, naming rules, keyword definition), variables/types cell, collections/conversion, client readout

---

## Week 2 — Your First Tables with pandas

**Theme:** Load, inspect, and answer questions from a table

**Client scenario:** Sales transactions for a small shop; question: "Which products and which days brought in the most money?"

**Learning outcomes**
1. Import pandas and read a CSV into a DataFrame
2. Inspect a DataFrame: `.head()`, `.info()`, `.shape`, `.columns`, `.dtypes`
3. Select one column and several columns; select rows by position and by condition
4. Filter rows (keep only rows matching a rule) and sort rows
5. Add a new column (transform), e.g., `total = quantity * unit_price`
6. Write a short readout cell answering the client question with two numbers

**Topics**
- `import pandas as pd`; `pd.read_csv()`
- DataFrame anatomy: index, columns, values
- Selection: `df["column"]`, `df[["a", "b"]]`, `df.loc`, `df.iloc`
- Filtering: `df[df.price > 1000]`, combining conditions with `&`, `|`, `~`
- Sorting: `sort_values()`
- Creating/changing columns: `df["total"] = ...`
- Renaming columns: `rename(columns={...})`
- Saving results: `to_csv()`

**Interactive elements**
- Predict-then-run: what does `df.head(3)` show?
- Fill-in-the-blank filter cells
- Modify the readout sentence from Week 1 using real DataFrame values

**Deliverable:** `week-2-shop-sales.ipynb` — loaded DataFrame, three filtered views, one sorted view, one new column, readout cell

**Assessment:** Exit ticket (selection vs filtering vs sorting), notebook deliverable, readout accuracy

---

## Week 3 — Cleaning Real-World Data

**Theme:** Dirty data leads to wrong decisions; fix it before you analyze it

**Client scenario:** Same shop data, now messy: missing prices, duplicate rows, `"N450,000"` / `450000` / `450k` formats, one absurd price

**Learning outcomes**
1. Find missing values: `.isna().sum()`
2. Decide and apply a handling rule: drop, fill, or flag (no guessing)
3. Find and remove duplicates: `.duplicated()`, `drop_duplicates()`
4. Standardize inconsistent text formats: `.str.lower()`, `.str.replace()`, `.str.strip()`
5. Convert text numbers to real numbers and spot outliers with min/max
6. Document every cleaning decision in a markdown cell

**Topics**
- Missing values and the four qualities of good data (accuracy, completeness, consistency, timeliness)
- `dropna()` vs `fillna()` vs keeping a `missing_price` flag column
- Duplicates: exact vs near-duplicates ("St. Anne's" vs "St Anne's")
- String cleaning pipeline for currency and categories
- Outliers: min/max review, decide fix vs keep vs investigate
- Dates: `pd.to_datetime()` with `errors="coerce"`
- Cleaning audit table: check, what I found, row(s), action taken

**Interactive elements**
- Audit-your-table activity (carried from Week 0, now coded)
- Cleaning race: first to produce a table with zero missing prices and no duplicates
- "Defend your decision": explain why you filled vs dropped

**Deliverable:** `week-3-cleaning.ipynb` — raw profile, cleaning audit table, cleaned DataFrame, saved `cleaned.csv`

**Assessment:** Exit ticket (missing/duplicate/outlier handling), cleaning audit completeness, cleaned dataset passes a spot-check

---

## Week 4 — Grouping, Aggregating, and Joining

**Theme:** Summarize groups and combine tables

**Client scenario:** Shop sales by product category and by region; plus a separate product catalogue table

**Learning outcomes**
1. Group by one column and aggregate: `.groupby(...).agg()` / `.mean()`, `.sum()`, `.count()`
2. Sort and slice group results: `.sort_values()`, `.head()`
3. Create pivot-style summaries: `.pivot_table()`
4. Join two tables on a shared column: `pd.merge()`
5. Add derived columns: `transform()`, `.assign()`
6. Answer "which group is best/worst" questions with one number per group

**Topics**
- Split-apply-combine in plain words
- Grouping by one and by two columns
- Multiple aggregations at once: `agg(["min", "max", "mean", "count"])`
- Pivot tables: rows × columns with values in the middle
- Merge types: inner, left, right, outer (taught with a Venn-style diagram, no jargon overload)
- Join keys: matching column names, typos that break joins (case, spaces)
- `assign()` for derived metrics (e.g., profit margin)

**Interactive elements**
- "Rank the categories" challenge
- Join puzzle: two tables with one messy key; fix and merge
- Build a one-page summary table for the client

**Deliverable:** `week-4-grouping-joins.ipynb` — grouped summary, pivot table, merged table, one derived metric, client summary

**Assessment:** Exit ticket (group vs aggregate vs join), notebook correctness, merged table row count sanity check

---

## Week 5 — Visualizing Data

**Theme:** Show the answer in a picture the client can understand in ten seconds

**Client scenario:** Same sales data; question: "Are sales growing, and which region should we expand into next?"

**Learning outcomes**
1. Choose the right chart for the question (bar, line, histogram, scatter)
2. Plot with pandas `.plot()` and/or matplotlib: bar chart, line chart, histogram, scatter
3. Label axes, add a title, rotate crowded labels, set figure size
4. Save a chart as PNG/PDF
5. Embed the chart in the notebook and interpret it in one sentence

**Topics**
- Chart-question matching: comparison → bar, trend over time → line, distribution → histogram, relationship → scatter
- `df.plot(kind="bar/line/hist/scatter")`
- Matplotlib basics: `plt.xlabel`, `plt.title`, `plt.tight_layout()`, `plt.savefig()`
- Color and readability (no rainbow charts, text big enough to project)
- Common traps: truncated y-axis, misleading averages, plotting dirty data

**Interactive elements**
- "Pick the chart" quiz: five questions, five chart types
- Improve-a-chart activity: fix labels, title, and axis on a messy chart
- Chart + one-sentence insight pairing

**Deliverable:** `week-5-charts.ipynb` — four chart types, all labeled, one saved PNG, one insight sentence per chart

**Assessment:** Exit ticket (chart choice reasoning), chart quality rubric (labels, title, readability), insight sentence quality

---

## Week 6 — Exploratory Data Analysis (EDA) & Storytelling

**Theme:** Run a complete, unstructured investigation and tell the client what you found

**Client scenario:** A new dataset (e.g., website traffic or survey responses) with no predefined question

**Learning outcomes**
1. Follow an EDA workflow: overview → columns → relationships → surprises → hypothesis
2. Profile a dataset automatically (missingness, unique values, ranges)
3. Find one unexpected pattern and investigate it
4. Structure findings: what we looked at, what we found, what it means, what we recommend, what we still need
5. Deliver a 3-minute client readout from the notebook

**Topics**
- EDA checklist: shape, dtypes, missing values, duplicates, outliers, correlations
- `.describe()` for all numeric columns at once
- Correlation heatmap or scatter matrix (light touch)
- Hypothesis vs evidence language ("the data suggests", not "proves")
- Story arc for data: client question → data → analysis → answer → next step

**Interactive elements**
- Mystery dataset: learners propose their own first three questions
- Surprise-finding badge: first to document an unexpected pattern
- Peer readout: pairs listen and ask one clarifying question

**Deliverable:** `week-6-eda.ipynb` — full EDA notebook with markdown narrative, at least one chart, findings + recommendations

**Assessment:** Readout rubric (clarity, numbers used, limitations named), notebook completeness

---

## Week 7 — Making Choices and Repeating Actions

**Theme:** Write logic that adapts to the data (control flow and functions)

**Client scenario:** Automatic weekly price alert: flag listings where price changed >5% or stock changed

**Learning outcomes**
1. Write `if / elif / else` blocks
2. Loop over rows or values with `for ... in`
3. Combine conditions with `and`, `or`, `not`
4. Write a small function with `def` and `return`
5. Apply a function to a column: `.apply()` or a loop
6. Decide when to use a loop vs pandas vectorized operation

**Topics**
- Comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Truthiness and `True`/`False`
- `if/elif/else` with real data rules (price tiers, stock flags)
- `for item in collection:` pattern
- Functions: inputs, outputs, docstrings, one job per function
- `.apply(my_function, axis=1)` intro
- Vectorization idea: pandas does loops for you (`df.price > threshold`)

**Interactive elements**
- Tier calculator: build price tiers (`budget` / `mid` / `premium`) with if-elif
- Loop vs apply race on the same task
- Write the alert rule from the client brief as a function

**Deliverable:** `week-7-control-flow.ipynb` — tier logic, one loop example, one function, `.apply()` usage, alert flags column

**Assessment:** Exit ticket (if vs elif vs else, loop purpose, function parts), function correctness, alert flags match manual check

---

## Week 8 — Dates, Time, and a First Look at Prediction

**Theme:** Answer "when" and "what is likely" questions

**Client scenario:** Monthly sales trend; question: "Will next month be busier than last month?"

**Learning outcomes**
1. Parse dates with `pd.to_datetime()` and extract year/month/day
2. Resample by week/month: `.resample("M").sum()`
3. Plot a time series line chart
4. Describe trend in plain words (up, down, flat, seasonal)
5. Explain prediction vs description with one example (linear trend idea, no math required)
6. State the limits of a prediction honestly

**Topics**
- Date columns and `errors="coerce"`
- `.dt.year`, `.dt.month`, `.dt.dayofweek`
- Time series aggregation and plotting
- Simple prediction: extend the last trend; "likely" vs "certain"
- Confidence language: "based on the last three months, we expect..."

**Interactive elements**
- Trend-spotting: three line charts, label each up/down/flat
- Prediction promise: learners write one cautious forecast sentence

**Deliverable:** `week-8-dates-prediction.ipynb` — date parsing, monthly resample, line chart, trend sentence, cautious prediction sentence

**Assessment:** Exit ticket (resample meaning, prediction limits), time-series chart quality, prediction language caution

---

## Week 9 — Robust, Shareable Notebooks

**Theme:** Code that doesn't break when the data changes

**Client scenario:** Monthly report that must run on a new file each month without manual edits

**Learning outcomes**
1. Handle expected errors: `try / except` (file missing, bad column, empty data)
2. Assert data rules: `assert df["price"].min() >= 0`
3. Read and write files reliably: paths, encodings, `to_csv(index=False)`
4. Document with markdown: purpose, assumptions, how to rerun
5. Parameterize one value (e.g., month name) at the top of the notebook

**Topics**
- `try / except / finally` patterns for file loading
- Common failure modes: `FileNotFoundError`, `KeyError`, empty DataFrame
- Assertions as data contracts
- Markdown headers, bold, code formatting, image embedding
- Notebook hygiene: cell order, restart-and-run-all check, no hidden state

**Interactive elements**
- Break-it-fix-it: instructor breaks a notebook; learners find and fix the error
- Rerun-all challenge: fresh notebook, run from top, same results?
- Write the "how to rerun this" paragraph

**Deliverable:** `week-9-robust-notebook.ipynb` — one end-to-end notebook with try/except, assertions, markdown docs, parameter cell, passes rerun-all

**Assessment:** Rerun-all pass/fail, error-handling coverage, documentation clarity

---

## Week 10 — Capstone Project

**Theme:** Run a full analysis cycle on your own dataset

**Structure**
1. Choose or receive a client brief and dataset (~200–2,000 rows, mixed types, some messiness)
2. Week-long project: ask → collect/load → clean → analyze → visualize → communicate
3. Milestones: proposal (Day 2), cleaning checkpoint (Day 4), draft readout (Day 6), final notebook + 5-minute readout (Day 10)

**Capstone deliverable**
- A notebook with: client question, data profile, cleaning log, analysis (filters, groups, aggregations), at least two charts, findings paragraph, limitations, next steps
- A 5-minute client readout (live or recorded)

**Assessment rubric**
| Criteria | Weight |
|----------|--------|
| Question and data fit the client brief | 15% |
| Cleaning is documented and sensible | 25% |
| Analysis answers the question with correct operations | 25% |
| Charts are correct, labeled, and interpreted | 15% |
| Findings are specific, use numbers, name limitations | 15% |
| Readout clarity and timing | 5% |

**Showcase:** Learners present notebooks to peers/instructor; optional GitHub portfolio upload.

---

## How the two existing lessons fit

- **`First_lesson.py`** → Week 0 in full (convert lesson script to notebook; keep client brief, tables, activities, exit ticket, glossary)
- **`foundational_lesson.py`** → Week 1 in full (convert to `python_basics_phones.ipynb`; keep type-along blocks, collections, keywords, client readout, quick reference)

Weeks 2–10 build directly on these: Week 1 variables and types become DataFrame columns; Week 0's six analysis steps recur in every week; the client-brief/readout rhythm continues through the capstone.

---

## Interactive implementation

A runnable version of this outline is in `academy/`:

- **Launch:** double-click `academy/start.bat` (Windows), or `cd academy && npm start`, then open http://localhost:8080.
- **Includes:** every week as a rendered lesson with live Python code cells, auto-graded exercises, quizzes, notes, checklists, glossary, and progress tracking.
- **First code run** downloads the Python runtime (Pyodide) from a CDN; it is cached afterwards. See `academy/README.md` for details and editing instructions.

---

*Prepared for: Python_4_Data_Analysis course development. Working directory: `C:\Users\SMTIH-CEST_24\Documents\Python_4_Data_Analysis`. See `COURSE_PLAN.md` for the teaching philosophy, environment setup, assessment weights, and facilitator guidance.*
