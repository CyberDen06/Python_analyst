// Data Academy — per-week enrichment: assignments, real-world deep dives, progress maps.
// Appended to each week's sections at boot. Each section has { id, title, blocks }.

export const ENRICHMENT = {
  "week-0": {
    sections: [
      {
        id: "w0-enrich-1",
        title: "Assignment — audit a real public list",
        blocks: [
          {
            type: "assignment",
            id: "w0a1",
            title: "Audit a public dataset",
            md:
              "Find a public table about something local (an open-data portal, Kaggle, or a government statistics site) — schools, clinics, market prices, or transport stops.\n\nWork through these questions in your notebook:\n\n1. What decision could a citizen or small business make with this table?\n2. What is one row? What does each row represent?\n3. What is one column, and what fact does it record?\n4. Name one data-quality problem you would expect in this data.\n5. Who would you trust more: this table or a rumor? Why?",
            deliverable:
              "A short note (half a page) answering the five questions. No code required — this is the thinking layer that every later week depends on.",
            criteria: [
              "I named a specific decision this data could support",
              "I correctly described what one row represents",
              "I identified a column and the fact it records",
              "I named at least one likely quality problem",
              "I explained my trust reasoning in one sentence",
            ],
          },
        ],
      },
      {
        id: "w0-enrich-2",
        title: "Real world — the same six steps in every field",
        blocks: [
          {
            type: "realworld",
            title: "Where data analysis shows up",
            md:
              "The client brief changes. The chain never does: **data → information → insight → decision.**\n\n| Field | What \"Ask\" looks like | One decision the data supports |\n|-------|------------------------|--------------------------------|\n| **Health** | A clinic reviews patient records | Which treatment has the best recovery rate? |\n| **Retail** | A Lagos phone shop tallies weekly sales | Which models to restock before Christmas? |\n| **Education** | A university studies exam results | Which topic needs re-teaching next term? |\n| **Agriculture** | A farmer logs harvest by plot | Which fertilizer gave the better yield? |\n| **Government** | A ministry tracks school enrollment | Where to build the next classroom block? |\n| **Sport** | A club tracks player performance | Which player to sign for the next season? |\n\nIn every row, the professional starts by naming the decision — not by opening a spreadsheet. That habit is what separates analysis from busywork.",
          },
        ],
      },
      {
        id: "w0-enrich-3",
        title: "Progress map — the capabilities of a data analyst",
        blocks: [
          {
            type: "progress-map",
            title: "The ten capabilities this course builds",
            intro:
              "A data analyst is not one skill — it is a stack. Here is the full map. You will see the same ten capabilities at the end of every week, with your current position marked. This week starts you at capability 1, 2, and 6.",
            columns: ["#", "Capability", "What it means", "Where you build it"],
            rows: [
              ["1", "Data literacy", "Understanding data, its types, and its quality", "Week 0 → 3"],
              ["2", "Problem framing", "Turning a vague worry into an answerable question", "Week 0 → 2"],
              ["3", "Tool fluency", "Writing and running Python reliably", "Week 1 → 7"],
              ["4", "Data preparation", "Cleaning, fixing, and shaping raw data", "Week 3"],
              ["5", "Analytical thinking", "Filtering, grouping, joining, aggregating", "Week 2 → 4"],
              ["6", "Statistical reasoning", "Means vs medians, trend vs noise", "Week 0 → 8"],
              ["7", "Visualization", "Choosing and building the right chart", "Week 5 → 8"],
              ["8", "Communication", "Explaining findings a client can act on", "Week 6 → 10"],
              ["9", "Production discipline", "Robust, documented, re-runnable work", "Week 7 → 9"],
              ["10", "Domain application", "Applying the stack in a real field", "Every week"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**You are here:** Week 0 starts capabilities **1 (data literacy)**, **2 (problem framing)**, and **6 (statistical reasoning)**. Every chart in Week 5 and every cleaning decision in Week 3 is built on the literacy you start today.",
          },
        ],
      },
    ],
  },

  "week-1": {
    sections: [
      {
        id: "w1-enrich-1",
        title: "Assignment — build a personal price tracker",
        blocks: [
          {
            type: "assignment",
            id: "w1a1",
            title: "A tracker for things you actually buy",
            md:
              "Pick three items you buy regularly (food, transport, data bundles — anything). For each item create four variables:\n\n- `item_name` — a string\n- `unit_price` — a whole number or decimal\n- `quantity` — an int\n- `in_stock` — True or False\n\nThen print one client-ready sentence per item using an f-string, with the price formatted with commas.\n\n**Bonus:** make a list of the three names and a dictionary for one item, then print the list's first element and the dictionary's price.\n\n**Why this is real work:** every analyst starts by getting values into named, typed variables before anything else can happen. This is the smallest complete unit of analysis.",
            deliverable:
              "A notebook cell that creates all variables, prints one f-string per item, and prints the bonus list/dictionary outputs.",
            criteria: [
              "I created variables with descriptive snake_case names",
              "I used the correct type for each value (str, int/float, bool)",
              "I printed a readable f-string per item with comma-formatted price",
              "I included the bonus list and dictionary",
              "No keyword was used as a variable name",
            ],
          },
        ],
      },
      {
        id: "w1-enrich-2",
        title: "Real world — the same data, many vocabularies",
        blocks: [
          {
            type: "realworld",
            title: "Rows and columns under different names",
            md:
              "Every field has its own word for the same two ideas. When you switch tools, you are switching dialects, not concepts.\n\n| Field / tool | A \"row\" is called… | A \"column\" is called… | Example |\n|--------------|----------------------|-------------------------|---------|\n| **Database** | record | field | customer_id, first_name |\n| **Statistics** | observation | variable | height_cm, weight_kg |\n| **Machine learning** | sample / instance | feature | age, income |\n| **Spreadsheets** | record | column | Order ID, Region |\n| **Health records** | encounter | measurement | visit_date, blood_pressure |\n| **pandas** | row | column / Series | df[\"price_ngn\"] |\n\n**Row = record = observation = sample.** **Column = field = variable = feature.** Knowing this stops you feeling lost the first time a new tool or research paper uses a different word.",
          },
        ],
      },
      {
        id: "w1-enrich-3",
        title: "Progress map — tool fluency begins",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 1",
            intro:
              "This week builds **capability 3 (tool fluency)** and strengthens **capability 1**. You are learning to hold any value in a named variable and print it clearly — the atomic unit of every analysis to come.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["3 · Tool fluency", "Variables, types, f-strings", "You can store and print any value cleanly"],
              ["1 · Data literacy", "Types as kinds of data", "You recognize str vs int the way others recognize words"],
              ["— Naming discipline", "snake_case, units in names", "price_ngn, not p — future-you can read it"],
              ["— Error literacy", "Reading NameError / TypeError", "You can diagnose your own first bugs"],
            ],
          },
          {
            type: "callout",
            variant: "note",
            md:
              "**Why this matters:** almost every beginner bug is a naming or typing mistake. The habits you form this week (descriptive names, units, no keywords) prevent most of them before they happen.",
          },
        ],
      },
    ],
  },

  "week-2": {
    sections: [
      {
        id: "w2-enrich-1",
        title: "Assignment — answer a question with a real table",
        blocks: [
          {
            type: "assignment",
            id: "w2a1",
            title: "Three questions, one table",
            md:
              "Load any CSV (a public dataset or one of the academy's own) and answer three questions in a notebook:\n\n1. How many rows and columns? What does one row represent?\n2. Filter to one category or region — how many rows remain?\n3. Sort by a numeric column (price, population, score) — what are the top 5?\n\nWrite one plain-language sentence per answer. A number without a sentence is not yet an answer.",
            deliverable:
              "A notebook with the code, the outputs, and three sentences in markdown.",
            criteria: [
              "I loaded the CSV with pd.read_csv and can state its shape",
              "I described what one row represents",
              "I filtered rows with a condition and reported the count",
              "I sorted a numeric column and identified the top 5",
              "Each answer has a plain-language sentence",
            ],
          },
        ],
      },
      {
        id: "w2-enrich-2",
        title: "Real world — filter and sort in every job",
        blocks: [
          {
            type: "realworld",
            title: "The two moves behind most analysis",
            md:
              "Filtering (keep rows that match a rule) and sorting (order the survivors) power almost every real analysis you will ever do.\n\n| Field | Filter example | Sort example |\n|-------|----------------|--------------|\n| **Retail** | Phones under ₦200,000 | Highest rated first |\n| **Healthcare** | Patients discharged this month | Longest stay first |\n| **Education** | Students in Grade 12 | Exam score, descending |\n| **Finance** | Transactions above ₦1M | Largest amount first |\n| **Agriculture** | Plots using fertilizer A | Highest yield per hectare |\n| **Sport** | Players in the first team | Goals per match |\n\nNotice that in every row, the filter answers *which rows matter*, and the sort answers *which ones to look at first*. That is the whole job in miniature.",
          },
        ],
      },
      {
        id: "w2-enrich-3",
        title: "Progress map — analytical thinking begins",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 2",
            intro:
              "This week builds **capability 5 (analytical thinking)** and deepens **capability 1 (data literacy)**. You can now profile a table, isolate a slice, and rank it.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["5 · Analytical thinking", "Filter + sort", "You can isolate and rank any slice in one or two lines"],
              ["1 · Data literacy", "head / shape / info / describe", "You can profile a new table in under a minute"],
              ["2 · Problem framing", "\"Where is revenue coming from?\"", "You turn a vague worry into a filter or group-by"],
              ["— Tool fluency", "pandas read_csv, selection", "You can load and inspect real data"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week you can answer **\"show me the top 5\"** for any numeric column — a request that comes up in almost every analytics job.",
          },
        ],
      },
    ],
  },

  "week-3": {
    sections: [
      {
        id: "w3-enrich-1",
        title: "Assignment — clean a messy file and justify it",
        blocks: [
          {
            type: "assignment",
            id: "w3a1",
            title: "The cleaning case file",
            md:
              "Find or create a messy CSV: missing values, duplicate rows, inconsistent categories, and text that should be numbers.\n\n1. List each problem with a count.\n2. Decide and apply a fix for each (drop, fill, correct, or flag).\n3. Write one sentence per decision explaining why.\n\nPut the log at the top of your notebook in a markdown cell. If someone asks \"why did the total change?\", the log is your answer.",
            deliverable:
              "The cleaned CSV and a cleaning log (problem → count → action → reason).",
            criteria: [
              "I counted missing values, duplicates, and inconsistent categories",
              "I converted text numbers to numeric",
              "I documented every decision with a reason",
              "I checked the row count before and after cleaning",
              "No value was silently guessed",
            ],
          },
        ],
      },
      {
        id: "w3-enrich-2",
        title: "Real world — where cleaning decides the answer",
        blocks: [
          {
            type: "realworld",
            title: "Cleaning is not busywork — it is the analysis",
            md:
              "Analysts in every field spend the majority of their time here. Cleaning decides whether the final number is true.\n\n| Field | What is dirty | How it is cleaned |\n|-------|--------------|-------------------|\n| **Health** | Dates in three formats; missing vitals | Parse each format explicitly; flag missing |\n| **Finance** | Amounts with ₦, commas, spaces | Strip symbols; convert with errors=\"coerce\" |\n| **Retail** | Category spelled five ways | `.str.strip().str.lower()` to standardize |\n| **Education** | Student IDs with lost leading zeros | Read as text; pad with zeros |\n| **Government** | District names in different languages | Map to one controlled vocabulary |\n| **Telecom** | Duplicate call records | Drop exact duplicates after checking |\n\n**The rule everywhere:** never silently guess. Drop, fill, or flag — and write down which and why.",
          },
        ],
      },
      {
        id: "w3-enrich-3",
        title: "Progress map — the most valuable analyst skill",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 3",
            intro:
              "This week builds **capability 4 (data preparation)** — the skill that most separates a coder from an analyst. You can now audit a table, fix it without inventing values, and defend every choice.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["4 · Data preparation", "Missing, duplicates, formats, outliers", "You can audit and fix any table without guessing"],
              ["5 · Analytical thinking", "Decide what to drop vs fill vs flag", "You balance accuracy against the client's decision"],
              ["8 · Communication", "A written cleaning log", "You can defend each choice to a non-technical client"],
              ["— Tool fluency", "str methods, to_numeric, dropna", "You can reshape text and types deliberately"],
            ],
          },
          {
            type: "callout",
            variant: "warn",
            md:
              "**\"Garbage in, garbage out\"** is the first rule of data work. Week 3 is where you stop trusting raw data blindly — and where clients start trusting your numbers.",
          },
        ],
      },
    ],
  },

  "week-4": {
    sections: [
      {
        id: "w4-enrich-1",
        title: "Assignment — a two-table profitability report",
        blocks: [
          {
            type: "assignment",
            id: "w4a1",
            title: "Merge, group, and compute a derived metric",
            md:
              "Take two CSVs that share a key (order IDs, product codes, customer IDs). Then:\n\n1. Merge them and prove the row count is unchanged.\n2. Group by one category and compute a summary (count, sum, mean).\n3. Create a derived metric that needs both tables — e.g., `profit = revenue − quantity × unit_cost`.\n4. Write a one-sentence recommendation from the result.\n\n**Why this is real work:** most business questions need more than one table. The join is where scattered data becomes a decision.",
            deliverable:
              "A notebook with the merge, the group-by table, the derived metric, and a recommendation sentence.",
            criteria: [
              "I merged two tables on a shared key",
              "I verified the row count before and after the merge",
              "I grouped and aggregated a metric",
              "I created a derived metric that uses both tables",
              "I wrote a recommendation backed by a number",
            ],
          },
        ],
      },
      {
        id: "w4-enrich-2",
        title: "Real world — joins that answer real questions",
        blocks: [
          {
            type: "realworld",
            title: "Two half-stories become one picture",
            md:
              "| Field | Table A | Table B | The join answers |\n|-------|---------|---------|------------------|\n| **Retail** | Orders | Product catalogue | Which products actually make money? |\n| **Healthcare** | Patients | Diagnoses | Which condition is most common by age? |\n| **Education** | Students | Exam results | Which school has the best pass rate? |\n| **Finance** | Transactions | Account holders | Which customer has the highest balance? |\n| **Government** | Schools | Enrollment | Which district has the most students per school? |\n| **Logistics** | Deliveries | Drivers | Which driver completes the most on-time trips? |\n\nA merge is also where mistakes hide: duplicate keys silently multiply rows. Always check the row count after joining — the skill you practiced this week.",
          },
        ],
      },
      {
        id: "w4-enrich-3",
        title: "Progress map — analysis at scale",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 4",
            intro:
              "This week deepens **capability 5 (analytical thinking)** and starts **capability 6 (statistical reasoning)**. You can now combine tables and summarize at the group level.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["5 · Analytical thinking", "groupby, agg, merge", "You answer \"which group is best\" with one number per group"],
              ["6 · Statistical reasoning", "Mean per group vs overall", "You notice when an average hides the story"],
              ["4 · Data preparation", "Join keys and row-count checks", "You never silently duplicate or lose rows"],
              ["— Tool fluency", "pivot_table, assign, merge", "You can reshape data into a report-ready table"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week you can take two raw tables and produce a profit or performance report — the core loop of business analytics.",
          },
        ],
      },
    ],
  },

  "week-5": {
    sections: [
      {
        id: "w5-enrich-1",
        title: "Assignment — tell a story in two charts",
        blocks: [
          {
            type: "assignment",
            id: "w5a1",
            title: "A two-chart argument",
            md:
              "Pick one dataset and one question. Produce exactly two charts:\n\n1. A comparison (bar) — which category is highest?\n2. A relationship or trend (scatter or line) — what pattern appears?\n\nEach chart needs a title, both axis labels, and one sentence of interpretation underneath. Save both as PNGs.\n\n**Why this is real work:** a chart without a sentence is a picture nobody acts on. The sentence is the analysis.",
            deliverable:
              "A notebook with two labeled charts, each saved as a PNG, and one interpretation sentence per chart.",
            criteria: [
              "I chose a bar chart for comparison and a line/scatter for relationship/trend",
              "Every chart has a title and axis labels with units",
              "I saved both charts as PNG files",
              "I wrote one interpretation sentence per chart",
              "Each chart answers a specific question, not just shows data",
            ],
          },
        ],
      },
      {
        id: "w5-enrich-2",
        title: "Real world — the chart that changes a decision",
        blocks: [
          {
            type: "realworld",
            title: "Charts in the room",
            md:
              "| Field | The question | The chart that answers it |\n|-------|--------------|---------------------------|\n| **Boardroom** | Are we growing? | Line chart of monthly revenue |\n| **Clinic** | Is recovery improving? | Bar chart of recovery rate by month |\n| **Classroom** | Which topic failed? | Bar chart of pass rate by topic |\n| **Farm** | Does fertilizer help? | Scatter plot of fertilizer vs yield |\n| **Newsroom** | Where is crime rising? | Bar chart or map by district |\n| **Marketing** | Which channel converts? | Bar chart of conversion rate |\n\n**Rule of thumb:** comparison → bar, trend → line, spread → histogram, relationship → scatter. The wrong chart type makes the audience draw the wrong conclusion — even from correct data.",
          },
        ],
      },
      {
        id: "w5-enrich-3",
        title: "Progress map — making data visible",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 5",
            intro:
              "This week builds **capability 7 (visualization)** and feeds **capability 8 (communication)**. You can now choose a chart from the question rather than from habit.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["7 · Visualization", "Bar, line, histogram, scatter", "You pick the right chart for the question"],
              ["8 · Communication", "Titles, labels, one-sentence insight", "You can explain a chart in a sentence a client repeats"],
              ["5 · Analytical thinking", "What to plot to answer the client", "You plot the answer, not the raw table"],
              ["— Tool fluency", "matplotlib, pandas plotting, savefig", "You can produce and export a labeled chart"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week you can walk into a meeting with a chart and a sentence — the two things a client actually remembers.",
          },
        ],
      },
    ],
  },

  "week-6": {
    sections: [
      {
        id: "w6-enrich-1",
        title: "Assignment — find the surprise and explain it",
        blocks: [
          {
            type: "assignment",
            id: "w6a1",
            title: "A mini EDA with a finding",
            md:
              "Take a dataset with at least two groups and a time or category column. Then:\n\n1. Profile it: shape, types, missing values, ranges.\n2. Summarize one group with `groupby`.\n3. Look for one surprise — an outlier, a spike, or a group behaving differently.\n4. Write a three-sentence readout: what you looked at, what you found, what it means.\n\n**Why this is real work:** EDA is not a step you skip. It is where the analyst decides what the real question is.",
            deliverable:
              "A notebook with the EDA cells and a three-sentence readout at the top.",
            criteria: [
              "I profiled shape, types, missing values, and ranges",
              "I summarized at least one group with groupby",
              "I identified a specific surprise and investigated it",
              "My readout has exactly what/found/means structure",
              "I named one limitation of the data",
            ],
          },
        ],
      },
      {
        id: "w6-enrich-2",
        title: "Real world — EDA before any model",
        blocks: [
          {
            type: "realworld",
            title: "What EDA catches",
            md:
              "| Field | What EDA looks like | What it catches |\n|-------|---------------------|------------------|\n| **Finance** | Distribution of transaction sizes | A cluster of impossible values (a glitch) |\n| **Healthcare** | Recovery rates by age band | A group the hospital forgot about |\n| **Retail** | Sales by week and region | A spike a promotion cannot explain |\n| **Education** | Scores by school and subject | One school inflating results |\n| **Agriculture** | Yield by plot and fertilizer | A plot that breaks the pattern |\n| **Product** | Weekly sessions by channel | Paid traffic that does not convert |\n\nThe point is not to \"look at data.\" It is to find the one thing that changes the decision — before you build anything on top of it.",
          },
        ],
      },
      {
        id: "w6-enrich-3",
        title: "Progress map — from analysis to narrative",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 6",
            intro:
              "This week builds **capability 8 (communication)** and completes the analytical loop. You can now take a raw dataset and produce a finding a client can act on.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["8 · Communication", "Three-sentence readout", "You can summarize a whole analysis in words a client repeats"],
              ["5 · Analytical thinking", "Group, summarize, spot surprises", "You know what to look at next, not just what to compute"],
              ["6 · Statistical reasoning", "Correlation vs causation language", "You say \"suggests\" when the data only suggests"],
              ["7 · Visualization", "One chart that shows the surprise", "The chart points at the anomaly, not at everything"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week you can take a raw dataset and produce a finding — the deliverable that makes an analyst worth hiring.",
          },
        ],
      },
    ],
  },

  "week-7": {
    sections: [
      {
        id: "w7-enrich-1",
        title: "Assignment — automate a decision",
        blocks: [
          {
            type: "assignment",
            id: "w7a1",
            title: "A small rules engine",
            md:
              "Build a rules engine for a decision you make regularly:\n\n1. Define three bands (price tiers, risk levels, priority levels) with `if / elif / else`.\n2. Write a function that takes a value and returns its band.\n3. Loop over 5–10 real values and print each with its band.\n4. Handle one edge case (zero, negative, or missing) explicitly.\n\n**Why this is real work:** once a rule is a function, it stops being a one-off calculation and becomes something a team can reuse and test.",
            deliverable:
              "A notebook with the function, the loop over real values, and a note on the edge case you handled.",
            criteria: [
              "My bands use if / elif / else with a clear order",
              "My function takes an input and returns the band",
              "I looped over 5–10 real values",
              "I handled one edge case explicitly",
              "I can explain what the function does in one sentence",
            ],
          },
        ],
      },
      {
        id: "w7-enrich-2",
        title: "Real world — rules that run themselves",
        blocks: [
          {
            type: "realworld",
            title: "Every automated decision is an if-statement",
            md:
              "| Field | The rule | The function that runs it |\n|-------|----------|---------------------------|\n| **Retail** | Flag a price change over 5% | price_alert(old, new) |\n| **Healthcare** | Escalate if vitals are out of range | triage(patient) |\n| **Finance** | Hold transactions above a threshold | review_required(amount) |\n| **Education** | Re-teach if pass rate under 60% | needs_intervention(score) |\n| **Logistics** | Route a delivery by zone and weight | route(zone, kg) |\n| **Insurance** | Flag a claim pattern for review | suspicious(claim) |\n\nFunctions make rules consistent. A rule buried in a spreadsheet is applied differently by every person who opens it; a rule in a function is applied the same way every time.",
          },
        ],
      },
      {
        id: "w7-enrich-3",
        title: "Progress map — code that makes decisions",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 7",
            intro:
              "This week deepens **capability 3 (tool fluency)** and starts **capability 9 (production discipline)**. Your analysis can now make decisions, not just describe them.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["3 · Tool fluency", "if / elif, loops, functions", "You can express any rule as reusable code"],
              ["9 · Production discipline", "Edge cases (zero, negative)", "You think about what breaks before the client does"],
              ["5 · Analytical thinking", "Which threshold matters?", "You translate a business rule into code and back"],
              ["— Testing mindset", "Try inputs, expect outputs", "You check the function against cases, not just once"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week your analysis can make decisions — the foundation of any automated report, alert, or scoring system.",
          },
        ],
      },
    ],
  },

  "week-8": {
    sections: [
      {
        id: "w8-enrich-1",
        title: "Assignment — forecast with humility",
        blocks: [
          {
            type: "assignment",
            id: "w8a1",
            title: "Trend plus caveat",
            md:
              "Take a dataset with a date column and a numeric measure. Produce:\n\n1. A time-series line chart with a title and both axis labels.\n2. A weekly or monthly resampled summary.\n3. A one-sentence next-period forecast that uses \"likely\" or \"suggests\" and names one reason it could be wrong.\n\n**Why this is real work:** \"up\" is a description; \"likely up\" is a forecast. The caveat is what makes the forecast honest.",
            deliverable:
              "A notebook with the chart, the resampled summary, and the cautious forecast sentence.",
            criteria: [
              "I parsed dates and resampled to a sensible period",
              "My line chart has a title and labeled axes",
              "My forecast sentence uses cautious language",
              "I named one thing that could make the forecast wrong",
              "I used at least one number to support the trend",
            ],
          },
        ],
      },
      {
        id: "w8-enrich-2",
        title: "Real world — planning with uncertainty",
        blocks: [
          {
            type: "realworld",
            title: "Where time-series questions come from",
            md:
              "| Field | The time-series question | The planning decision |\n|-------|--------------------------|-----------------------|\n| **Retail** | Are sales rising month over month? | Stock more of what is trending up |\n| **Healthcare** | Is patient volume growing? | Staff the clinic for the busy season |\n| **Finance** | Is cash flow improving? | Plan next quarter's spending |\n| **Agriculture** | Is yield per hectare stable? | Decide whether to change inputs |\n| **Transport** | Is ridership growing? | Add vehicles on the rising route |\n\nIn each case, the analyst is not asked for certainty. They are asked for a direction, a rough size, and an honest caveat. That is what a forecast is.",
          },
        ],
      },
      {
        id: "w8-enrich-3",
        title: "Progress map — describing and predicting",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 8",
            intro:
              "This week builds **capability 6 (statistical reasoning)** and deepens **capability 7**. You can now distinguish \"rose\" from \"will likely rise\" — a distinction clients pay for.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["6 · Statistical reasoning", "Trend vs noise, cautious forecast", "You separate description from prediction"],
              ["7 · Visualization", "Time-series line chart", "You show direction and magnitude together"],
              ["8 · Communication", "Forecast with a named caveat", "You give a direction without overpromising"],
              ["— Tool fluency", "to_datetime, resample, dt accessors", "You can turn timestamps into periods and summaries"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week you can answer \"what is likely next?\" — the question that turns analysis into planning.",
          },
        ],
      },
    ],
  },

  "week-9": {
    sections: [
      {
        id: "w9-enrich-1",
        title: "Assignment — make a notebook someone else can run",
        blocks: [
          {
            type: "assignment",
            id: "w9a1",
            title: "Productionize a notebook",
            md:
              "Take any notebook you have built and harden it:\n\n1. Add a parameter cell at the top (month, file name, region).\n2. Wrap file loading in `try / except` with a clear message.\n3. Add at least two assertions that protect your key numbers.\n4. Write a \"How to rerun this\" paragraph at the top.\n5. Restart the kernel and run every cell from top to bottom.\n\nIf it runs clean from top to bottom, it passes. If it needs a manual tweak, it is still a draft.",
            deliverable:
              "The hardened notebook, plus a note stating the parameter to change and the columns it expects.",
            criteria: [
              "I added a parameter cell and used those values below",
              "I wrapped file loading in try/except with a clear message",
              "I added at least two assertions",
              "I wrote a rerun instruction at the top",
              "The notebook runs clean after a kernel restart",
            ],
          },
        ],
      },
      {
        id: "w9-enrich-2",
        title: "Real world — the report that must not break",
        blocks: [
          {
            type: "realworld",
            title: "Why robustness is a professional requirement",
            md:
              "| Field | The recurring report | What breaks if it is fragile |\n|-------|----------------------|------------------------------|\n| **Finance** | Monthly close summary | A wrong number reaches the auditors |\n| **Healthcare** | Patient safety report | A missing file silently empties the report |\n| **Retail** | Weekly sales review | A new SKU format crashes the pipeline |\n| **Education** | Exam results by school | A typo in a school name splits a group |\n| **Government** | Budget utilization | A renamed column breaks the whole month |\n\nThe pattern is always the same: robust code fails loudly and early, with a message a human can act on. Fragile code fails silently, late, and expensively.",
          },
        ],
      },
      {
        id: "w9-enrich-3",
        title: "Progress map — from analysis to infrastructure",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 9",
            intro:
              "This week builds **capability 9 (production discipline)** — the line between a student and a professional. Your work can now survive a new file, a new month, and a new colleague.",
            columns: ["Capability", "This week's step", "What proficient looks like"],
            rows: [
              ["9 · Production discipline", "try/except, assertions, parameters", "Your code survives changing inputs"],
              ["8 · Communication", "Documentation and rerun instructions", "Someone else can run your analysis without asking you"],
              ["3 · Tool fluency", "Parameters, clean structure", "You separate \"what changes\" from \"how it works\""],
              ["— Testing mindset", "Assertions as data contracts", "You check assumptions before they become wrong numbers"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**Milestone:** after this week your work is institutional, not personal — which is exactly what makes an analyst trusted with recurring business-critical reports.",
          },
        ],
      },
    ],
  },

  "week-10": {
    sections: [
      {
        id: "w10-enrich-1",
        title: "Assignment — the capstone readout",
        blocks: [
          {
            type: "assignment",
            id: "w10a1",
            title: "Present it like a client is in the room",
            md:
              "Deliver your capstone the way a working analyst would:\n\n1. A 60-second readout: question, data, finding, recommendation.\n2. Two charts saved as PNGs, each with a one-sentence interpretation.\n3. A limitations paragraph naming one thing the data cannot answer.\n4. A next-step sentence: what you would collect or test next.\n\n**Why this is real work:** this is the portfolio piece. It is the page you show in an interview and the artifact you hand to a client.",
            deliverable:
              "One notebook plus one readout (written or recorded).",
            criteria: [
              "My readout covers question → data → finding → recommendation",
              "I included two labeled charts with one-sentence interpretations",
              "I named a real limitation of the data",
              "I stated a concrete next step",
              "The whole readout can be delivered in about five minutes",
            ],
          },
        ],
      },
      {
        id: "w10-enrich-2",
        title: "Real world — what hiring managers actually look for",
        blocks: [
          {
            type: "realworld",
            title: "Your portfolio is the interview",
            md:
              "Hiring managers rarely hire \"Python knowledge.\" They hire evidence that you can do the job. Your capstone is that evidence.\n\n| What they look for | Where it shows in your capstone |\n|--------------------|----------------------------------|\n| Can you frame a problem? | Your question and decision |\n| Can you prepare data? | Your cleaning log |\n| Can you find the answer? | Your filters, groups, and totals |\n| Can you show it? | Your two charts |\n| Can you explain it? | Your readout and limitations |\n| Can you hand it over? | Your rerun-ready notebook |\n\nKeep the notebook, the charts, and the readout. They are your first three portfolio pieces.",
          },
        ],
      },
      {
        id: "w10-enrich-3",
        title: "Progress map — the full analyst stack",
        blocks: [
          {
            type: "progress-map",
            title: "Where you are after Week 10",
            intro:
              "This week integrates all ten capabilities into one delivered project. This is the map of what you can now do — and the evidence you have for each capability.",
            columns: ["Capability", "Where you built it", "Capstone evidence"],
            rows: [
              ["1 · Data literacy", "Weeks 0, 1", "You profile and trust your data"],
              ["2 · Problem framing", "Weeks 0, 2", "You wrote a decision-grade question"],
              ["3 · Tool fluency", "Weeks 1, 7, 9", "Your code runs from top to bottom"],
              ["4 · Data preparation", "Week 3", "Your cleaning log is defensible"],
              ["5 · Analytical thinking", "Weeks 2, 4, 6", "Your groups answer the question"],
              ["6 · Statistical reasoning", "Weeks 0, 6, 8", "Your claims are cautious and correct"],
              ["7 · Visualization", "Weeks 5, 8", "Your charts argue clearly"],
              ["8 · Communication", "Weeks 6, 9, 10", "Your readout is five minutes, not fifty"],
              ["9 · Production discipline", "Weeks 7, 9", "Your notebook survives a restart"],
              ["10 · Domain application", "Every week", "Your capstone names a real client and decision"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            md:
              "**You are no longer a beginner.** You are an analyst with a portfolio. The next step is repetition — on your own datasets, in your own field, until the cycle feels routine.",
          },
        ],
      },
    ],
  },
};