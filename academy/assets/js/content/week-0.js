export default {
  id: "week-0",
  number: 0,
  title: "Data Analysis Foundations",
  tagline: "Think like an analyst before you write a line of code",
  duration: "3 hours",
  client: {
    name: "Bright Steps Tutoring",
    brief:
      "We run an after-school tutoring company with 12 tutors. We want to partner with private secondary schools in Ibadan. We have no list. We do not know how many schools there are, where they are, what they charge, or which ones are large enough to be worth visiting. We want to begin visiting schools next month.",
    question: "Which private secondary schools in Ibadan should we visit first?",
  },
  objectives: [
    "Explain the difference between data, information, insight, and decision",
    "Describe the six steps of the data analysis process",
    "Name the parts of a dataset: row, column, cell, header, identifier",
    "Classify columns by data type",
    "Spot the five common data quality problems",
    "Explain mean, median, mode, range, and percentile in plain words",
    "Distinguish descriptive, diagnostic, predictive, and prescriptive analysis",
    "Explain correlation vs causation, and sample vs population",
  ],
  sections: [
    {
      id: "w0s1",
      title: "The client and the decision",
      blocks: [
        {
          type: "text",
          md:
            "Every week of this course starts with a **client brief** — a real-sounding request from someone who has to make a decision.\n\n" +
            "Read the brief above. Then answer this: *what decision does the client need to make?* Everything we do for the rest of the week exists to support that decision.",
        },
        {
          type: "callout",
          variant: "client",
          md:
            "**Your first analyst sentence:** \"To help the client decide, I need to find out ______.\"\n\nFill the blank with the facts you would need before choosing which schools to visit.",
        },
        {
          type: "table",
          headers: ["Term", "Meaning", "Example from this brief"],
          rows: [
            ["Data", "Raw facts, recorded", "\"Bodija International College, Ibadan North, 1,640 students\""],
            ["Information", "Data organized so it can be read", "A table of 30 schools with their student numbers"],
            ["Insight", "A pattern or meaning found in the information", "\"Most large schools are clustered in two local government areas\""],
            ["Decision", "An action chosen because of the insight", "\"Visit the 10 largest schools in those two areas first\""],
          ],
        },
        {
          type: "text",
          md:
            "### The data-to-decision chain\n\n" +
            "**Data → Information → Insight → Decision.** Data analysis is the work that moves a client along this chain. A spreadsheet of 200 schools is not yet useful on its own — it becomes useful when it answers the client's question.",
        },
        {
          type: "details",
          summary: "Try it: classify these statements (then reveal)",
          md:
            "1. \"School A: 650 students\"\n2. \"School A has 650 students and School B has 400\"\n3. \"Bigger schools tend to charge higher tuition\"\n4. \"We will begin with schools of more than 500 students\"\n\n" +
            "**Answers:** 1 = data, 2 = information (it is organized for reading), 3 = insight, 4 = decision.",
        },
        {
          type: "quiz",
          id: "w0q1",
          title: "Quick check: the decision chain",
          questions: [
            {
              q: "\"School C, Bodija, boarding, 900 students\" is best described as…",
              options: ["Data", "Information", "Insight", "Decision"],
              answer: 0,
              why: "It is a raw recorded fact. Nothing has been organized or interpreted yet.",
            },
            {
              q: "A table of 200 schools with student counts is best described as…",
              options: ["Data", "Information", "Insight", "Decision"],
              answer: 1,
              why: "The facts have been organized into rows and columns so they can be read.",
            },
            {
              q: "\"Large schools in Bodija charge more than small schools in Egbeda\" is best described as…",
              options: ["Data", "Information", "Insight", "Decision"],
              answer: 2,
              why: "It is a pattern found by comparing the information — something that can guide a decision.",
            },
            {
              q: "\"We will visit only schools with more than 500 students\" is best described as…",
              options: ["Data", "Information", "Insight", "Decision"],
              answer: 3,
              why: "It is an action chosen because of an insight.",
            },
          ],
        },
      ],
    },
    {
      id: "w0s2",
      title: "Anatomy of a dataset",
      blocks: [
        {
          type: "text",
          md:
            "A **dataset** is a collection of data organized in a table. In pandas — the Python library you will use from Week 2 — that table is called a **DataFrame**. Here is a small preview of the schools table we will work with later:",
        },
        {
          type: "table",
          headers: ["school_name", "lga", "annual_tuition_ngn", "student_population"],
          rows: [
            ["Bodija International College", "Ibadan North", "780000", "1640"],
            ["St. Anne's Secondary School", "Ibadan North", "420000", "980"],
            ["Ibadan Grammar School", "Ibadan North-East", "350000", "2210"],
            ["Oluyole Heights Academy", "Oluyole", "510000", "720"],
          ],
        },
        {
          type: "table",
          headers: ["Term", "Meaning", "In the schools table"],
          rows: [
            ["Row", "One item being studied (record, observation)", "One school"],
            ["Column", "One fact recorded about every item (variable, field)", "annual_tuition_ngn"],
            ["Cell", "One value at the crossing of a row and a column", "780000"],
            ["Header", "The name at the top of a column", "school_name"],
            ["Identifier", "A column that tells rows apart", "school_name (in this small table)"],
            ["Unit of analysis", "What one row represents", "One school"],
          ],
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**Why an identifier matters:** two schools can share a local government area and even a tuition price. Without a unique identifier, you cannot reliably tell rows apart when cleaning or joining tables.",
        },
        {
          type: "details",
          summary: "Try it: point and name (then reveal)",
          md:
            "In your own words, name one row, one column, one cell, one header, and the identifier in the preview table. State the unit of analysis.\n\n" +
            "**Model answer:** row = the Bodija International College record; column = annual_tuition_ngn; cell = 780000; header = school_name; identifier = school_name for this preview; unit of analysis = one school.",
        },
        {
          type: "quiz",
          id: "w0q2",
          title: "Quick check: dataset anatomy",
          questions: [
            {
              q: "In an orders table where each row is one order, the unit of analysis is…",
              options: ["One product", "One order", "One customer", "One day"],
              answer: 1,
              why: "The unit of analysis is whatever one row represents. Here it is one order.",
            },
            {
              q: "Which column is the most likely identifier?",
              options: ["region", "unit_price", "order_id", "quantity"],
              answer: 2,
              why: "An identifier is unique for each row. Many orders can share a region or price, but each order_id should identify one order.",
            },
            {
              q: "What does one column represent?",
              options: [
                "One item being studied",
                "One fact recorded for every item",
                "One value in one cell",
                "A whole dataset",
              ],
              answer: 1,
              why: "A column is one recorded fact for all rows, such as unit_price.",
            },
            {
              q: "A dataset has 96 rows and 8 columns. How many cells does it contain?",
              options: ["96", "104", "768", "8"],
              answer: 2,
              why: "Cells = rows × columns = 96 × 8 = 768.",
            },
          ],
        },
      ],
    },
    {
      id: "w0s3",
      title: "Data types: what kind of values?",
      blocks: [
        {
          type: "text",
          md:
            "The type of a column decides what you can sensibly do with it. You can average a numeric column; averaging a list of local government names makes no sense.",
        },
        {
          type: "table",
          headers: ["Type", "Meaning", "Examples", "Math allowed?"],
          rows: [
            ["Numeric, continuous", "A number that can take any value in a range", "annual_tuition_ngn, google_rating", "Yes"],
            ["Numeric, discrete", "A whole-number count", "student_population, review_count", "Yes"],
            ["Categorical, nominal", "A label with no order", "lga, curriculum", "No — group only"],
            ["Categorical, ordinal", "A label with a natural order", "price tier: low, mid, high", "Rank only"],
            ["Boolean", "True or false", "has_boarding", "Count only"],
            ["Date and time", "A point in time", "year_founded, order_date", "Differences only"],
            ["Text", "Free-form words", "street_address, review comments", "Search and count"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Rule of thumb:** if you can add a column up and get a meaningful number, it is numeric. If averaging it gives nonsense, it is categorical, boolean, or text.",
        },
        {
          type: "details",
          summary: "Try it: classify the school columns (then reveal)",
          md:
            "school_name, lga, school_type, annual_tuition_ngn, student_population, has_boarding, year_founded, google_rating\n\n" +
            "**Answers:** school_name = text/identifier; lga = categorical nominal; school_type = categorical nominal; annual_tuition_ngn = numeric continuous; student_population = numeric discrete; has_boarding = boolean; year_founded = date or discrete numeric; google_rating = numeric continuous.",
        },
        {
          type: "quiz",
          id: "w0q3",
          title: "Quick check: data types",
          questions: [
            {
              q: "Which column is boolean?",
              options: ["annual_tuition_ngn", "has_boarding", "lga", "year_founded"],
              answer: 1,
              why: "A boolean holds only True or False. has_boarding does exactly that.",
            },
            {
              q: "You want to average a column. Which type must it be?",
              options: ["Categorical", "Text", "Numeric", "Boolean"],
              answer: 2,
              why: "Averages only make sense for numeric values.",
            },
            {
              q: "A column contains the values 750, 1200, 980, 1640. This is…",
              options: [
                "Numeric, continuous",
                "Numeric, discrete",
                "Categorical, ordinal",
                "Text",
              ],
              answer: 1,
              why: "These are whole-number counts, so they are discrete numeric.",
            },
            {
              q: "A price tier column with values low, mid, high is…",
              options: [
                "Boolean",
                "Categorical, nominal",
                "Categorical, ordinal",
                "Numeric",
              ],
              answer: 2,
              why: "The labels have a natural order, so the column is ordinal (a ranked category).",
            },
          ],
        },
      ],
    },
    {
      id: "w0s4",
      title: "Data quality: five problems to catch early",
      blocks: [
        {
          type: "text",
          md:
            "Poor data leads to poor decisions. Before analyzing anything, run a quality check. These five problems appear again and again in real datasets:",
        },
        {
          type: "table",
          headers: ["Problem", "What it looks like", "Example in the schools table"],
          rows: [
            ["Missing values", "A cell is blank", "No student_population for a school"],
            ["Duplicates", "The same item appears more than once", "\"St. Anne's School\" and \"St Anne's School, Molete\""],
            ["Inconsistent formats", "The same fact written different ways", "\"N450,000\", \"450000\", \"450k\""],
            ["Outliers", "A value far from the rest", "Tuition of 45,000,000 naira — probably a typo"],
            ["Outdated data", "The value was true once but is no longer", "A fee copied from a three-year-old website"],
          ],
        },
        {
          type: "table",
          headers: ["Quality", "Question to ask"],
          rows: [
            ["Accuracy", "Is the value correct?"],
            ["Completeness", "Are values missing?"],
            ["Consistency", "Is the same fact written the same way?"],
            ["Timeliness", "Is the value current?"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Never silently guess.** If a value is missing, either drop the row, fill it with a documented rule, or flag it for follow-up. \"Leave blank if not found; do not guess\" is a rule you will see in every dataset prompt in this course.",
        },
        {
          type: "notes",
          id: "w0n1",
          prompt:
            "You are handed a directory of 200 private schools collected from websites. Write down two data-quality checks you would run first, and why.",
          placeholder: "Check 1: … because …\nCheck 2: … because …",
        },
        {
          type: "quiz",
          id: "w0q4",
          title: "Quick check: data quality",
          questions: [
            {
              q: "A cell with no value is best called…",
              options: ["An outlier", "A duplicate", "A missing value", "An identifier"],
              answer: 2,
              why: "A blank cell is a missing value. In pandas it usually appears as NaN.",
            },
            {
              q: "\"N450,000\" and \"450000\" in the same column are examples of…",
              options: [
                "Inconsistent formats",
                "Outdated data",
                "Duplicates",
                "Missing values",
              ],
              answer: 0,
              why: "The same fact is written in two different ways, so the column is inconsistent.",
            },
            {
              q: "Which quality asks whether a value is current?",
              options: ["Accuracy", "Timeliness", "Completeness", "Consistency"],
              answer: 1,
              why: "Timeliness is about whether the value is still true today.",
            },
            {
              q: "A tuition value of 45,000,000 naira when all other schools are below 1,200,000 is likely…",
              options: ["A missing value", "A duplicate", "An outlier", "A boolean"],
              answer: 2,
              why: "A value far from the rest is an outlier. It might be a typo, or a genuinely special school — investigate before deciding.",
            },
          ],
        },
      ],
    },
    {
      id: "w0s5",
      title: "Basic statistics in plain words",
      blocks: [
        {
          type: "text",
          md:
            "Use this small example. Five schools charge these annual fees in naira: **250,000; 300,000; 300,000; 450,000; 1,500,000**.",
        },
        {
          type: "table",
          headers: ["Term", "Meaning", "Value for the example"],
          rows: [
            ["Count", "How many values there are", "5"],
            ["Minimum", "The smallest value", "250,000"],
            ["Maximum", "The largest value", "1,500,000"],
            ["Range", "Maximum minus minimum", "1,250,000"],
            ["Sum", "All values added together", "2,800,000"],
            ["Mean", "Sum divided by count", "560,000"],
            ["Median", "The middle value when sorted", "300,000"],
            ["Mode", "The most common value", "300,000"],
            ["Percentile", "The value below which a given percent of the data falls", "The 50th percentile is the median"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**The mean is 560,000 but the median is 300,000.** One very expensive school pulls the mean upward. When a dataset has outliers, the median usually describes a \"typical\" value better.",
        },
        {
          type: "details",
          summary: "Try it: five student populations (then reveal)",
          md:
            "Values: 180, 220, 250, 300, 2,000. Calculate the mean and the median.\n\n" +
            "**Answers:** mean = 2,950 ÷ 5 = **590**; sorted values: 180, 220, 250, 300, 2,000, so the median is **250**. The outlier 2,000 pulls the mean far above the typical school.",
        },
        {
          type: "quiz",
          id: "w0q5",
          title: "Quick check: statistics",
          questions: [
            {
              q: "For the values 100, 120, 130, 140, 900, which is higher?",
              options: ["The mean", "The median", "They are equal", "Cannot tell"],
              answer: 0,
              why: "Mean = 1,390 ÷ 5 = 278; median = 130. The outlier 900 pulls the mean up.",
            },
            {
              q: "The median of 250,000; 300,000; 300,000; 450,000; 1,500,000 is…",
              options: ["250,000", "300,000", "450,000", "560,000"],
              answer: 1,
              why: "With five sorted values, the median is the third one: 300,000.",
            },
            {
              q: "The difference between the maximum and the minimum is called the…",
              options: ["Mean", "Mode", "Range", "Percentile"],
              answer: 2,
              why: "Range = maximum − minimum.",
            },
            {
              q: "The 50th percentile is the same as the…",
              options: ["Mean", "Mode", "Median", "Range"],
              answer: 2,
              why: "Half the data falls below the 50th percentile — the median.",
            },
          ],
        },
      ],
    },
    {
      id: "w0s6",
      title: "Types of analysis and thinking traps",
      blocks: [
        {
          type: "table",
          headers: ["Type", "Question", "Example for the client"],
          rows: [
            ["Descriptive", "What is happening?", "How many schools are in each local government area?"],
            ["Diagnostic", "Why did it happen?", "Why are tuition fees higher in some areas?"],
            ["Predictive", "What is likely to happen?", "Which areas are likely to have new schools opening?"],
            ["Prescriptive", "What should we do?", "Which 10 schools should we visit first?"],
          ],
        },
        {
          type: "text",
          md:
            "This course focuses on **descriptive and diagnostic** analysis, with a first look at prediction in Week 8. Prescriptive recommendations come at the end — after the evidence.",
        },
        {
          type: "table",
          headers: ["Term", "Meaning", "Example"],
          rows: [
            ["Correlation", "Two things move together", "Higher tuition tends to come with more students"],
            ["Causation", "One thing actually causes the other", "The pattern alone does not prove this"],
            ["Population", "Everything you want to study", "All private secondary schools in Ibadan"],
            ["Sample", "The part you actually have", "The 30 schools in our dataset"],
            ["Bias", "A systematic reason the sample is unrepresentative", "Only schools with websites appear"],
            ["Metric", "A number used to measure something", "Average tuition per school"],
            ["KPI", "A metric tied to a goal", "Schools visited per month"],
          ],
        },
        {
          type: "details",
          summary: "Try it: what could bias this sample? (then reveal)",
          md:
            "Our dataset only includes schools with an online presence. What kind of schools might be missing, and how could that change the client's decision?\n\n" +
            "**Model answer:** smaller or newer schools may not have websites, so the dataset may over-represent larger, more established schools. If the client visits only schools in the dataset, they may skip affordable schools that are still good partners. The recommendation should name this limitation.",
        },
        {
          type: "quiz",
          id: "w0q6",
          title: "Exit ticket",
          questions: [
            {
              q: "What is the difference between data and an insight?",
              options: [
                "Data is a number; an insight is a word",
                "Data is a raw fact; an insight is a pattern found by analyzing facts",
                "They are the same thing",
                "An insight is always a chart",
              ],
              answer: 1,
              why: "Data is raw. An insight is a meaningful pattern discovered in organized data.",
            },
            {
              q: "\"How many schools are in each area?\" is which type of analysis?",
              options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
              answer: 0,
              why: "It describes what is happening, without explaining why or suggesting an action.",
            },
            {
              q: "\"Which 10 schools should we visit first?\" is which type of analysis?",
              options: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
              answer: 3,
              why: "It recommends an action, which is prescriptive analysis.",
            },
            {
              q: "Two variables rise together. What can you conclude?",
              options: [
                "One causes the other",
                "They are correlated, but causation is not proven",
                "The data must be wrong",
                "They are both outliers",
              ],
              answer: 1,
              why: "Correlation is not causation. Another factor may drive both, or the pattern may be coincidence.",
            },
            {
              q: "You count only schools with websites. The main risk is…",
              options: [
                "The sample is biased toward schools with an online presence",
                "The population is too large",
                "The data is outdated",
                "The mean and median are identical",
              ],
              answer: 0,
              why: "Your sample systematically misses schools without websites, so it may not represent all private schools.",
            },
            {
              q: "Put the chain in the right order.",
              options: [
                "Decision → insight → information → data",
                "Data → information → insight → decision",
                "Information → data → decision → insight",
                "Insight → data → information → decision",
              ],
              answer: 1,
              why: "Raw data becomes readable information, which yields an insight, which supports a decision.",
            },
          ],
        },
      ],
    },
  ],
};
