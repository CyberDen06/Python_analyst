export default {
  id: "week-10",
  number: 10,
  title: "Capstone: Run the Whole Analysis Cycle",
  tagline: "From a client question to a client readout, on your own",
  duration: "1 week",
  client: {
    name: "Your own client",
    brief:
      "Choose one dataset and one decision-maker. You will ask the question, profile and clean the data, analyze it, chart it, and deliver a short readout. This is the same cycle as Weeks 0–9 — now you run it end to end.",
    question: "What decision does your client need to make, and what does the data say?",
  },
  objectives: [
    "Scope a client question and choose the right data",
    "Profile and clean a dataset with a documented audit trail",
    "Answer the question with filters, groups, and aggregations",
    "Present two charts that support the answer",
    "Write findings with numbers, limitations, and next steps",
    "Deliver a five-minute client readout",
  ],
  sections: [
    {
      id: "w10s1",
      title: "Scope the project",
      blocks: [
        {
          type: "text",
          md:
            "Pick **one** client and one decision. Good scopes are small enough to finish and specific enough to answer. Choose one of these options or bring your own:\n\n- **Bright Steps Tutoring** — which Ibadan schools to visit first? Use \`ibadan_schools.csv\`.\n- **PhoneHub Lagos** — which phone models and retailers should we watch weekly? Use \`lagos_phones.csv\`.\n- **Mama Ada's Stores** — which category and region should get more stock? Use \`shop_sales.csv\` and \`product_catalogue.csv\`.\n- **Bright Steps Online** — which marketing channel deserves more budget? Use \`website_traffic.csv\`.\n\nThe deliverable is one notebook plus a five-minute readout.",
        },
        {
          type: "table",
          headers: ["Rubric area", "Weight", "What good looks like"],
          rows: [
            ["Question and data fit", "15%", "The question names a decision; the dataset can actually answer it"],
            ["Cleaning documentation", "25%", "Problems found, decisions made, and why"],
            ["Analysis correctness", "25%", "Filters, groups, and totals are right and match the question"],
            ["Charts", "15%", "Two correct, labeled charts with a sentence of interpretation each"],
            ["Findings and limits", "15%", "Specific numbers, a recommendation, and named limitations"],
            ["Readout", "5%", "Clear, timed, and pitched to a non-technical listener"],
          ],
        },
        {
          type: "code",
          id: "w10c1",
          title: "Starter: load and profile your dataset",
          rows: 12,
          code:
            'import pandas as pd\n\n' +
            'DATA_FILE = "shop_sales.csv"   # change to your chosen dataset\n\n' +
            "df = pd.read_csv(DATA_FILE)\n\n" +
            'print("Shape:", df.shape)\n' +
            'print("\\nColumns:")\n' +
            "print(df.dtypes)\n" +
            'print("\\nMissing values:")\n' +
            "print(df.isna().sum())\n" +
            "df.head()",
        },
        {
          type: "notes",
          id: "w10n1",
          prompt:
            "Write your project proposal: the client, the decision, the dataset, the three questions you will answer, and what you will not be able to answer from this data.",
          placeholder:
            "Client: …\nDecision: …\nDataset: …\nQuestions: 1) … 2) … 3) …\nOut of scope: …",
        },
        {
          type: "exercise",
          id: "w10e1",
          title: "Write the project plan as a dict",
          prompt:
            "Create a dictionary \`project_plan\` with these keys:\n\n- \`question\` — the client question as a string (at least 15 characters)\n- \`dataset\` — the file name you will use\n- \`decision\` — the decision the client must make\n- \`metrics\` — a list of at least 2 metrics you will compute (for example, \"total revenue\")\n- \`charts\` — a list of at least 2 chart types or chart titles you will produce\n\nThis plan becomes the top of your capstone notebook.",
          starter:
            "project_plan = {\n" +
            "    # \"question\": ...,\n" +
            "    # \"dataset\": ...,\n" +
            "    # \"decision\": ...,\n" +
            "    # \"metrics\": [...],\n" +
            "    # \"charts\": [...],\n" +
            "}\n\n" +
            "print(project_plan)\n",
          hints: [
            "A dictionary uses curly braces with key: value pairs.",
            "metrics and charts must be lists, e.g. [\"total revenue\", \"average order value\"].",
            "Write the question exactly as you would ask it of the data — specific and answerable.",
          ],
          solution:
            "project_plan = {\n" +
            '    "question": "Which product category and region should Mama Ada stock more of next quarter?",\n' +
            '    "dataset": "shop_sales.csv",\n' +
            '    "decision": "Where to increase stock and focus marketing next quarter",\n' +
            '    "metrics": ["total revenue by category", "average order value by region"],\n' +
            '    "charts": ["bar chart of revenue by category", "bar chart of revenue by region"],\n' +
            "}\n\n" +
            "print(project_plan)",
          checks:
            'expect_defined("project_plan")\n' +
            'expect(isinstance(project_plan, dict), "project_plan should be a dictionary.")\n' +
            '_keys = {"question", "dataset", "decision", "metrics", "charts"}\n' +
            'expect(_keys <= set(project_plan.keys()), "project_plan needs question, dataset, decision, metrics, and charts keys.")\n' +
            'expect(isinstance(project_plan.get("question"), str) and len(project_plan["question"]) >= 15, "The question should be a specific sentence of at least 15 characters.")\n' +
            'expect(isinstance(project_plan.get("dataset"), str) and project_plan["dataset"].strip() != "", "dataset should name the file you will use.")\n' +
            'expect(isinstance(project_plan.get("decision"), str) and project_plan["decision"].strip() != "", "decision should state what the client will decide.")\n' +
            'expect(isinstance(project_plan.get("metrics"), list) and len(project_plan["metrics"]) >= 2, "metrics should be a list of at least two things you will compute.")\n' +
            'expect(isinstance(project_plan.get("charts"), list) and len(project_plan["charts"]) >= 2, "charts should be a list of at least two charts you will produce.")',
        },
      ],
    },
    {
      id: "w10s2",
      title: "Do the analysis",
      blocks: [
        {
          type: "text",
          md:
            "Work through the cycle in your notebook. Keep your **cleaning audit** and your **analysis cells** separate: a reader should be able to see what was fixed before any numbers were computed.",
        },
        {
          type: "checklist",
          id: "w10k1",
          title: "Analysis checklist",
          items: [
            "Profile the raw data (shape, types, missing values, duplicates)",
            "Write down the cleaning decisions and why",
            "Produce a cleaned DataFrame and save it (for example, cleaned.csv)",
            "Answer each question with a filter, group, or aggregation",
            "Compute at least two metrics that directly support the decision",
            "Create two labeled charts that support the answer",
            "Write a markdown cell explaining each chart in one sentence",
            "State at least one limitation of the data or analysis",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Keep a decision log.** For every cleaning choice, write one line: what you changed, how many rows it affected, and why. That log is worth marks — and it protects you if the client asks \"why did the total change?\".",
        },
      ],
    },
    {
      id: "w10s3",
      title: "Tell the story",
      blocks: [
        {
          type: "text",
          md:
            "Your readout has five beats: **question → data → what you found → what it means → recommendation and limits.** Five minutes, no code shown on screen, at most two charts.",
        },
        {
          type: "notes",
          id: "w10n2",
          prompt:
            "Write your readout script: five short sentences, one per beat. Include at least two numbers and name one limitation.",
          placeholder:
            "We asked: … . We used … rows from … . We found … . That means … . We recommend …, with the caveat that … .",
        },
        {
          type: "checklist",
          id: "w10k2",
          title: "Final submission checklist",
          items: [
            "Notebook runs from top to bottom without errors",
            "Cleaning decisions are documented and the row impact is stated",
            "All totals and group results have been spot-checked against a second method",
            "Charts have titles, axis labels, and units",
            "Findings use at least two specific numbers",
            "A limitation and a next step are stated",
            "Readout is prepared and timed at five minutes",
          ],
        },
        {
          type: "quiz",
          id: "w10q1",
          title: "Exit ticket: process check",
          questions: [
            {
              q: "Which order is correct for the capstone?",
              options: [
                "Question → profile → clean → analyze → visualize → communicate",
                "Visualize → question → clean → delete → analyze",
                "Clean → question → publish → analyze",
                "Collect → recommend → profile → clean",
              ],
              answer: 0,
              why: "The analysis cycle runs from question to communication, in that order.",
            },
            {
              q: "Why document cleaning decisions in a separate section?",
              options: [
                "So the reader can see what changed before the numbers were computed",
                "To make the notebook longer",
                "Because pandas requires markdown",
                "To hide the data problems",
              ],
              answer: 0,
              why: "Transparency about data changes is a core analyst responsibility.",
            },
            {
              q: "A chart has no title or axis labels. Why does that cost marks?",
              options: [
                "The reader cannot tell what is being shown or in what units",
                "Matplotlib will crash",
                "The data becomes invalid",
                "It makes the file too large",
              ],
              answer: 0,
              why: "A chart shared outside the notebook must be self-explanatory.",
            },
            {
              q: "Your total revenue differs from a colleague's by 8%. What is the best next step?",
              options: [
                "Compare cleaning choices and row counts, then recompute both ways",
                "Pick the larger number",
                "Ignore it",
                "Delete the column",
              ],
              answer: 0,
              why: "Differences usually come from cleaning or filtering choices; find the divergence.",
            },
            {
              q: "Which sentence is a finding rather than a method?",
              options: [
                "Audio earns 38% of revenue, so it should keep the largest stock share",
                "We used pandas",
                "We loaded a CSV",
                "We created a chart",
              ],
              answer: 0,
              why: "A finding states evidence and what it means for the decision.",
            },
          ],
        },
      ],
    },
  ],
};
