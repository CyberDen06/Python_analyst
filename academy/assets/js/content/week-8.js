export default {
  id: "week-8",
  number: 8,
  title: "Dates, Time, and a First Look at Prediction",
  tagline: "Answer \"when\" and \"what is likely\" questions",
  duration: "4 hours",
  client: {
    name: "Mama Ada's Stores (seasonal planning)",
    brief:
      "We have six months of daily sales. We want to know which day of the week is busiest, how monthly revenue compares, and whether we should expect next month to be busier than last month.",
    question: "Is our sales trend up, down, or flat — and what can we cautiously expect next month?",
  },
  objectives: [
    "Parse date columns with pd.to_datetime()",
    "Extract year, month, and weekday with .dt",
    "Resample daily data to weekly or monthly totals",
    "Plot a time series line chart",
    "Describe a trend with evidence (up, down, flat)",
    "Make a cautious prediction and state its limits",
  ],
  sections: [
    {
      id: "w8s1",
      title: "Dates as numbers",
      blocks: [
        {
          type: "text",
          md:
            "A date column stored as text is almost useless for analysis. **pd.to_datetime()** parses it into real dates, and **errors=\"coerce\"** turns anything unreadable into NaT instead of crashing.\n\nThe file \`daily_sales.csv\` holds 181 days of orders and revenue. Let us load it and parse the date column.",
        },
        {
          "type": "code",
          id: "w8c1",
          title: "Parse dates and extract parts",
          rows: 14,
          code:
            "import pandas as pd\n\n" +
            'sales = pd.read_csv("daily_sales.csv")\n' +
            'sales["date"] = pd.to_datetime(sales["date"], errors="coerce")\n\n' +
            'sales["weekday"] = sales["date"].dt.day_name()\n' +
            'sales["month"] = sales["date"].dt.month\n' +
            'sales["is_weekend"] = sales["date"].dt.dayofweek.isin([5, 6])\n\n' +
            'sales[["date", "orders", "revenue_ngn", "weekday", "is_weekend"]].head(8)',
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**dayofweek counts Monday as 0 and Sunday as 6.** Saturday (5) and Sunday (6) are the weekend. This bit of Python lore trips up almost everyone once.",
        },
        {
          type: "exercise",
          id: "w8e1",
          title: "Parse the date column",
          prompt:
            "Load \`daily_sales.csv\` into \`sales\`. Create:\n\n- \`sales[\"date\"]` as real dates with \`pd.to_datetime(sales[\"date\"], errors=\"coerce\`)\n- \`sales[\"weekday\"]` as weekday names with \`.dt.day_name()\`\n- \`sales[\"is_weekend\"]` — True when dayofweek is 5 or 6\n\nThen print how many weekend rows there are.",
          starter:
            "import pandas as pd\n\n" +
            "sales = pd.read_csv(\"daily_sales.csv\")\n\n" +
            "# sales[\"date\"] = ...\n" +
            "# sales[\"weekday\"] = ...\n" +
            "# sales[\"is_weekend\"] = ...\n\n" +
            "# print(sales[\"is_weekend\"].sum())\n",
          hints: [
            "pd.to_datetime(sales[\"date\"], errors=\"coerce\") converts the text column.",
            "Access date parts with .dt: .dt.day_name(), .dt.dayofweek.",
            "isin([5, 6]) checks whether dayofweek is Saturday or Sunday.",
          ],
          solution:
            "import pandas as pd\n\n" +
            'sales = pd.read_csv("daily_sales.csv")\n' +
            'sales["date"] = pd.to_datetime(sales["date"], errors="coerce")\n' +
            'sales["weekday"] = sales["date"].dt.day_name()\n' +
            'sales["is_weekend"] = sales["date"].dt.dayofweek.isin([5, 6])\n\n' +
            'print("Weekend rows:", int(sales["is_weekend"].sum()))\n',
          checks:
            'import pandas as pd\n' +
            'expect_defined("sales")\n' +
            'expect(str(sales["date"].dtype).startswith("datetime64"), "sales[\\"date\\"] should be real datetime values — use pd.to_datetime.")\n' +
            'expect(isinstance(sales["weekday"].iloc[0], str), "weekday should contain day names as strings.")\n' +
            'expect(isinstance(sales["is_weekend"].iloc[0], bool), "is_weekend should be booleans.")\n' +
            'expect(int(sales["is_weekend"].sum()) > 0, "There should be at least one weekend row.")\n' +
            'expect(sales["date"].notna().sum() == len(sales), "Every row should have parsed to a real date.")',
        },
        {
          type: "quiz",
          id: "w8q1",
          title: "Check: parsing dates",
          questions: [
            {
              q: "What does pd.to_datetime(..., errors=\"coerce\") do with a bad date?",
              options: ["Raises an error", "Turns it into NaT", "Deletes the row", "Skips the whole file"],
              answer: 1,
              why: "NaT means \"not a time\" — pandas marks it as missing instead of stopping.",
            },
            {
              q: "In pandas, dayofweek counts Monday as which number?",
              options: ["0", "1", "5", "7"],
              answer: 0,
              why: "Monday is 0; Saturday is 5 and Sunday is 6.",
            },
            {
              q: "Which property gives the name of the weekday?",
              options: [".dt.day_name()", ".dt.weekday_name", ".dt.name()", ".dt.dayofweek_name()"],
              answer: 0,
              why: ".dt.day_name() returns strings like \"Monday\".",
            },
          ],
        },
      ],
    },
    {
      id: "w8s2",
      title: "Aggregate by week and month",
      blocks: [
        {
          "type": "text",
          md:
            "Daily data is noisy — one rainy Thursday tells you little. Resampling rolls the data up into bigger buckets: weekly totals, monthly revenue, average orders per day.",
        },
        {
          "type": "code",
          id: "w8c2",
          title: "Resample to weekly totals",
          rows: 11,
          code:
            'daily = sales.set_index("date")\n' +
            'weekly = daily["revenue_ngn"].resample("W").sum()\n\n' +
            'print("Weeks:", len(weekly))\n' +
            "weekly.head(4)",
        },
        {
          "type": "code",
          id: "w8c3",
          title: "Monthly revenue",
          rows: 8,
          code:
            'monthly = daily["revenue_ngn"].resample("ME").sum()\n' +
            'monthly.index = monthly.index.to_period("M")\n' +
            "monthly",
        },
        {
          "type": "exercise",
          id: "w8e2",
          title: "Which month earned the most?",
          prompt:
            "Compute total revenue per calendar month from \`sales\`. Create:\n\n- \`monthly_revenue\` — a Series indexed by month (period \"M\"), total revenue per month\n- \`best_month\` — the month with the highest revenue (a Period object)\n\nPrint both.",
          starter:
            'sales["date"] = pd.to_datetime(sales["date"], errors="coerce")\n' +
            "daily = sales.set_index(\"date\")\n\n" +
            "# monthly_revenue = ...\n" +
            "# best_month = ...\n\n" +
            "# print(monthly_revenue)\n" +
            "# print(best_month)\n",
          hints: [
            "Set the date as the index first: sales.set_index(\"date\").",
            "Use .resample(\"ME\").sum() to sum each month-end bucket.",
            "Convert the index with .to_period(\"M\") so it labels months cleanly.",
            "best_month = monthly_revenue.idxmax() gives the top month.",
          ],
          solution:
            'sales["date"] = pd.to_datetime(sales["date"], errors="coerce")\n' +
            "daily = sales.set_index(\"date\")\n\n" +
            'monthly_revenue = daily["revenue_ngn"].resample("ME").sum()\n' +
            'monthly_revenue.index = monthly_revenue.index.to_period("M")\n' +
            "best_month = monthly_revenue.idxmax()\n\n" +
            "print(monthly_revenue)\n" +
            "print(best_month)\n",
          checks:
            'import pandas as pd\n' +
            'expect_defined("monthly_revenue", "best_month")\n' +
            'expect(isinstance(monthly_revenue, pd.Series), "monthly_revenue should be a Series.")\n' +
            'expect(len(monthly_revenue) == 6, "There should be six months of daily data.")\n' +
            'expect(monthly_revenue.sum() > 0, "monthly_revenue should contain the resampled revenue totals.")\n' +
            'expect(best_month == monthly_revenue.idxmax(), "best_month should be the month with the highest revenue.")',
        },
        {
          "type": "callout",
          variant: "warn",
          md:
            "**Averages hide days.** \"Average daily revenue\" can be much lower than a busy Saturday. When you describe a trend, mention which days or weeks drive it.",
        },
        {
          "type": "quiz",
          id: "w8q2",
          title: "Check: resampling",
          questions: [
            {
              q: "What does resample(\"ME\").sum() do?",
              options: [
                "Groups daily rows into month-end buckets and sums each month",
                "Takes the mean of every row",
                "Deletes weekends",
                "Sorts by month",
              ],
              answer: 0,
              why: "Resampling buckets time series rows; ME means month-end.",
            },
            {
              q: "Why set the date column as the index before resampling?",
              options: ["pandas needs a datetime index to bucket by time", "To delete the date column", "To sort by revenue", "To convert text to numbers"],
              answer: 0,
              why: "Resample works on a datetime index.",
            },
            {
              q: "Which property gives a clean monthly label like \"2026-01\"?",
              options: [".to_period(\"M\")", ".to_month()", ".month_name()", ".strftime(\"%M\")"],
              answer: 0,
              why: "to_period(\"M\") normalizes to month granularity.",
            },
          ],
        },
      ],
    },
    {
      id: "w8s3",
      title: "Plot the trend and describe it",
      blocks: [
        {
          "type": "text",
          md:
            "A time series is a line chart where the x-axis is time. Rise = up; fall = down; roughly level = flat. The client needs plain words, not just a chart.",
        },
        {
          "type": "code",
          id: "w8c4",
          title: "Monthly revenue line chart",
          rows: 14,
          code:
            "import matplotlib.pyplot as plt\n\n" +
            'monthly.index = monthly.index.astype(str)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4))\n" +
            'monthly.plot(kind="line", marker="o", ax=ax, color="#14b8a6")\n' +
            'ax.set_title("Monthly revenue — Jan to Jun 2026")\n' +
            'ax.set_xlabel("Month")\n' +
            'ax.set_ylabel("Revenue (NGN)")\n' +
            "fig.tight_layout()\n" +
            "monthly",
        },
        {
          "type": "exercise",
          id: "w8e3",
          title: "Chart and describe the trend",
          prompt:
            "Plot monthly revenue as a line chart. Add:\n\n- a title mentioning revenue\n- x-axis and y-axis labels\n- marker points on the line\n\nThen answer in the cell below: is the trend up, down, or flat? Use one number to support your answer.",
          starter:
            "import matplotlib.pyplot as plt\n\n" +
            'monthly.index = monthly.index.astype(str)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4))\n" +
            "# monthly.plot(kind=\"line\", ...)\n" +
            "# add title and labels\n" +
            "# your one-sentence answer below\n",
          hints: [
            "Use kind=\"line\", marker=\"o\", ax=ax.",
            "ax.set_title(\"Monthly revenue\"), ax.set_xlabel(\"Month\"), ax.set_ylabel(\"Revenue (NGN)\").",
            "Compare monthly_revenue.iloc[0] with monthly_revenue.iloc[-1] for your sentence.",
          ],
          solution:
            "import matplotlib.pyplot as plt\n\n" +
            'monthly.index = monthly.index.astype(str)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4))\n" +
            'monthly.plot(kind="line", marker="o", ax=ax, color="#14b8a6")\n' +
            'ax.set_title("Monthly revenue — Jan to Jun 2026")\n' +
            'ax.set_xlabel("Month")\n' +
            'ax.set_ylabel("Revenue (NGN)")\n' +
            "fig.tight_layout()",
          checks:
            "import matplotlib.pyplot as plt\n" +
            'expect(plt.get_fignums(), "Create a line chart first.")\n' +
            "_ax = plt.gcf().axes[0]\n" +
            'expect(len(_ax.lines) >= 1, "Plot a line.")\n' +
            'expect(_ax.get_title().strip() != "", "Add a title with ax.set_title(...).")\n' +
            'expect(_ax.get_xlabel().strip() != "", "Add an x-axis label.")\n' +
            'expect(_ax.get_ylabel().strip() != "", "Add a y-axis label.")',
        },
        {
          "type": "quiz",
          id: "w8q3",
          title: "Check: trends",
          questions: [
            {
              q: "Revenue rose from January to June, but March dipped. The overall trend is…",
              options: ["Up", "Down", "Flat", "Random"],
              answer: 0,
              why: "Start-to-end movement determines the overall direction.",
            },
            {
              q: "Which statement is appropriately cautious?",
              options: [
                "Next month will definitely be higher",
                "Next month will be lower because March dipped",
                "The last three months have risen, so next month will likely rise — but that is not guaranteed",
                "Prediction is impossible, so never say anything",
              ],
              answer: 2,
              why: "A cautious prediction states the evidence and names its own limit.",
            },
            {
              q: "What does a rising line over months mean?",
              options: ["The measured value increased over time", "The data is clean", "The file is large", "The chart is beautiful"],
              answer: 0,
              why: "Upward position over time means growth.",
            },
          ],
        },
      ],
    },
    {
      id: "w8s4",
      title: "A first look at prediction",
      blocks: [
        {
          "type": "text",
          md:
            "Prediction means \"what is likely\". A beginner-friendly first guess: assume the recent trend continues. That is honest only if you say so, and only for the very near future.\n\n**Confidence language:** \"Based on the last three months, revenue is trending up. Next month will likely be higher — but a new competitor or a holiday could change that.\"",
        },
        {
          "type": "code",
          id: "w8c5",
          title: "A naive next-month estimate",
          rows: 9,
          code:
            'last3 = monthly.tail(3).mean()\n' +
            'print("Average monthly revenue (last 3 months):", round(last3, 2))\n' +
            'print("Cautious next-month expectation: roughly", round(last3, 2))\n',
        },
        {
          "type": "notes",
          id: "w8n1",
          prompt:
            "Write your client forecast in two sentences: what the trend shows, what you expect next month, and one thing that could make you wrong.",
          placeholder:
            "Monthly revenue has been … from … to … naira. Based on the last few months, next month will likely be …, unless ….",
        },
        {
          "type": "quiz",
          id: "w8q4",
          title: "Exit ticket",
          questions: [
            {
              q: "What is resampling?",
              options: [
                "Aggregating time-series rows into bigger time buckets",
                "Sorting the table",
                "Merging two tables",
                "Deleting old rows",
              ],
              answer: 0,
              why: "Resampling buckets a time series into daily/weekly/monthly summaries.",
            },
            {
              q: "Which line best predicts next month cautiously?",
              options: [
                "Next month will be exactly last month",
                "The trend is up, so next month will likely be higher — but not guaranteed",
                "Prediction is useless",
                "Next month will double",
              ],
              answer: 1,
              why: "Cautious prediction states evidence plus uncertainty.",
            },
            {
              q: "What does NaT mean in pandas?",
              options: ["Not a Time — a missing date", "A very small number", "A new type of table", "Not a Table"],
              answer: 0,
              why: "NaT is pandas' missing-value marker for dates.",
            },
            {
              q: "Why is \"average daily revenue\" sometimes misleading?",
              options: [
                "Busy and quiet days get mixed together",
                "It requires too many rows",
                "It only works on weekdays",
                "It ignores revenue",
              ],
              answer: 0,
              why: "An average flattens out the days that actually drive the business.",
            },
            {
              q: "Which is NOT confidence language?",
              options: ["Will definitely", "Likely", "Suggests", "Could change"],
              answer: 0,
              why: "Definitely overstates what a first prediction can justify.",
            },
          ],
        },
      ],
    },
  ],
};
