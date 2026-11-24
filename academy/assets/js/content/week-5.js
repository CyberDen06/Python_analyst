export default {
  id: "week-5",
  number: 5,
  title: "Visualizing Data",
  tagline: "Show the answer in a picture the client understands in ten seconds",
  duration: "4 hours",
  client: {
    name: "Mama Ada's Stores (board meeting)",
    brief:
      "We have a board meeting next week. The numbers are in the notebook, but nobody reads tables in a meeting. We need three clear charts: where revenue comes from, how prices are spread, and whether sales are growing over the first half of the year.",
    question: "Which charts tell the revenue story clearly enough for a board?",
  },
  objectives: [
    "Match a chart type to the question being asked",
    "Plot a bar chart, histogram, line chart, and scatter plot",
    "Add a title, axis labels, and readable sizing",
    "Save a chart as a PNG file",
    "Write a one-sentence interpretation for each chart",
  ],
  sections: [
    {
      id: "w5s1",
      title: "Choose the chart before you plot",
      blocks: [
        {
          type: "text",
          md:
            "A chart is an answer, not decoration. The question decides the chart:\n\n- Compare categories → **bar chart**\n- Show a trend over time → **line chart**\n- Show how values are spread → **histogram**\n- Show the relationship between two numbers → **scatter plot**",
        },
        {
          type: "table",
          headers: ["Question", "Chart", "Why"],
          rows: [
            ["Which category earns most?", "Bar", "Lengths are easy to compare across labels"],
            ["Are sales rising over time?", "Line", "Position over time shows trend and seasonality"],
            ["How spread are order values?", "Histogram", "Groups numeric values into bins"],
            ["Do expensive orders contain more items?", "Scatter", "One dot per order shows the relationship"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Three chart traps:** a truncated y-axis that exaggerates small differences; a pie chart with ten slices nobody can compare; and an average line that hides outliers. Label honestly and keep it simple.",
        },
        {
          type: "quiz",
          id: "w5q1",
          title: "Check: chart choice",
          questions: [
            {
              q: "You need to compare revenue across four categories. Best chart?",
              options: ["Bar chart", "Line chart", "Histogram", "Scatter plot"],
              answer: 0,
              why: "Bar charts compare a measure across categories.",
            },
            {
              q: "You need to show monthly revenue from January to June. Best chart?",
              options: ["Line chart", "Pie chart", "Histogram", "Bar chart with 96 bars"],
              answer: 0,
              why: "A line shows direction and change over time.",
            },
            {
              q: "You need to show how unit prices are distributed. Best chart?",
              options: ["Histogram", "Line chart", "Stacked bar", "Scatter plot"],
              answer: 0,
              why: "A histogram groups numeric values into bins and shows the shape of the distribution.",
            },
            {
              q: "A bar chart's y-axis starts at 9,000 instead of 0. Why is this risky?",
              options: [
                "It exaggerates small differences",
                "It makes the chart too tall",
                "It hides the labels",
                "It changes the data",
              ],
              answer: 0,
              why: "Truncating the axis visually magnifies differences and can mislead the reader.",
            },
          ],
        },
      ],
    },
    {
      id: "w5s2",
      title: "Your first bar chart, done properly",
      blocks: [
        {
          type: "text",
          md:
            "We use **matplotlib**, Python's standard chart library. pandas can draw directly from a Series or DataFrame, and matplotlib finishes the job: title, labels, size, and saving.",
        },
        {
          type: "code",
          id: "w5c1",
          title: "Revenue by category, labeled and saved",
          rows: 16,
          code:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n' +
            'category_revenue = df.groupby("category")["revenue_ngn"].sum().sort_values(ascending=False)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4.5))\n" +
            'category_revenue.plot(kind="bar", ax=ax, color="#14b8a6")\n' +
            'ax.set_title("Revenue by product category — Jan to Jun 2026")\n' +
            'ax.set_xlabel("Category")\n' +
            'ax.set_ylabel("Revenue (NGN)")\n' +
            'ax.tick_params(axis="x", rotation=0)\n' +
            "fig.tight_layout()\n" +
            'fig.savefig("revenue_by_category.png")',
        },
        {
          type: "callout",
          variant: "note",
          md:
            "In this academy the figure appears automatically below the cell. In a Jupyter notebook you would also call \`plt.show()\`. The saved PNG is written to your workspace, so it can go straight into a slide deck.",
        },
        {
          type: "exercise",
          id: "w5e1",
          title: "Fix and save the category chart",
          prompt:
            "Build a bar chart of total revenue by category, sorted highest first, and make it board-ready:\n\n- a title that mentions revenue\n- an x-axis label\n- a y-axis label\n- saved as \`revenue_by_category.png\` using \`fig.savefig(...)\`\n\nAll four categories must appear as bars.",
          starter:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n' +
            'category_revenue = df.groupby("category")["revenue_ngn"].sum().sort_values(ascending=False)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4.5))\n" +
            'category_revenue.plot(kind="bar", ax=ax)\n' +
            "# add title and labels\n" +
            "# save the figure\n",
          hints: [
            "Set a title with ax.set_title(\"Revenue by category\").",
            "Add labels with ax.set_xlabel(\"Category\") and ax.set_ylabel(\"Revenue (NGN)\").",
            "Save with fig.savefig(\"revenue_by_category.png\") before the cell ends.",
          ],
          solution:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n' +
            'category_revenue = df.groupby("category")["revenue_ngn"].sum().sort_values(ascending=False)\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4.5))\n" +
            'category_revenue.plot(kind="bar", ax=ax, color="#14b8a6")\n' +
            'ax.set_title("Revenue by product category")\n' +
            'ax.set_xlabel("Category")\n' +
            'ax.set_ylabel("Revenue (NGN)")\n' +
            "fig.tight_layout()\n" +
            'fig.savefig("revenue_by_category.png")',
          checks:
            "import os\n" +
            "import matplotlib.pyplot as plt\n" +
            'expect(plt.get_fignums(), "Create a bar chart first.")\n' +
            "_ax = plt.gcf().axes[0]\n" +
            'expect(len(_ax.patches) >= 4, "The chart should show all four categories as bars.")\n' +
            'expect(_ax.get_title().strip() != "", "Add a title with ax.set_title(...).")\n' +
            'expect(_ax.get_xlabel().strip() != "", "Add an x-axis label with ax.set_xlabel(...).")\n' +
            'expect(_ax.get_ylabel().strip() != "", "Add a y-axis label with ax.set_ylabel(...).")\n' +
            'expect(os.path.exists("revenue_by_category.png"), "Save the chart with fig.savefig(\\"revenue_by_category.png\\").")\n' +
            'expect(os.path.getsize("revenue_by_category.png") > 1000, "The saved PNG looks empty. Save the figure after plotting.")',
        },
      ],
    },
    {
      id: "w5s3",
      title: "Histograms, lines, and scatter plots",
      blocks: [
        {
          type: "code",
          id: "w5c2",
          title: "Histogram: the shape of order prices",
          rows: 14,
          code:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "fig, ax = plt.subplots(figsize=(7.5, 4))\n" +
            'df["unit_price"].plot(kind="hist", bins=10, ax=ax, color="#60a5fa", edgecolor="white")\n' +
            'ax.set_title("Distribution of unit prices")\n' +
            'ax.set_xlabel("Unit price (NGN)")\n' +
            'ax.set_ylabel("Number of orders")\n' +
            "fig.tight_layout()",
        },
        {
          type: "code",
          id: "w5c3",
          title: "Line: monthly revenue trend",
          rows: 16,
          code:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n' +
            'df["month"] = pd.to_datetime(df["order_date"]).dt.to_period("M")\n' +
            'monthly = df.groupby("month")["revenue_ngn"].sum()\n\n' +
            "fig, ax = plt.subplots(figsize=(8, 4))\n" +
            'monthly.plot(kind="line", marker="o", ax=ax, color="#14b8a6")\n' +
            'ax.set_title("Monthly revenue, Jan to Jun 2026")\n' +
            'ax.set_xlabel("Month")\n' +
            'ax.set_ylabel("Revenue (NGN)")\n' +
            "fig.tight_layout()\n" +
            'monthly',
        },
        {
          type: "code",
          id: "w5c4",
          title: "Scatter: items per order vs unit price",
          rows: 12,
          code:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "fig, ax = plt.subplots(figsize=(7, 4.5))\n" +
            'df.plot(kind="scatter", x="quantity", y="unit_price", ax=ax, alpha=0.6, color="#a78bfa")\n' +
            'ax.set_title("Order quantity vs unit price")\n' +
            'ax.set_xlabel("Quantity in the order")\n' +
            'ax.set_ylabel("Unit price (NGN)")\n' +
            "fig.tight_layout()",
        },
        {
          type: "exercise",
          id: "w5e2",
          title: "Make a readable histogram",
          prompt:
            "Plot a histogram of \`unit_price\` with **exactly 12 bins**. Add:\n\n- a title that mentions price (for example, \"Distribution of unit prices\")\n- an x-axis label\n\nUse \`df[\"unit_price\"].plot(kind=\"hist\", bins=12, ...)\` or \`ax.hist(...)\`.",
          starter:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "fig, ax = plt.subplots(figsize=(7.5, 4))\n" +
            '# df["unit_price"].plot(kind="hist", ...)\n' +
            "# add a title and an x-axis label\n",
          hints: [
            "Use bins=12 in the plot call.",
            "Set the title with ax.set_title(\"Distribution of unit prices\").",
            "Add ax.set_xlabel(\"Unit price (NGN)\").",
          ],
          solution:
            "import pandas as pd\n" +
            "import matplotlib.pyplot as plt\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "fig, ax = plt.subplots(figsize=(7.5, 4))\n" +
            'df["unit_price"].plot(kind="hist", bins=12, ax=ax, color="#60a5fa", edgecolor="white")\n' +
            'ax.set_title("Distribution of unit prices")\n' +
            'ax.set_xlabel("Unit price (NGN)")\n' +
            "fig.tight_layout()",
          checks:
            "import matplotlib.pyplot as plt\n" +
            'expect(plt.get_fignums(), "Create a histogram first.")\n' +
            "_ax = plt.gcf().axes[0]\n" +
            'expect(len(_ax.patches) == 12, "Use exactly 12 bins in the histogram.")\n' +
            'expect("price" in _ax.get_title().lower(), "Set a title that mentions price.")\n' +
            'expect(_ax.get_xlabel().strip() != "", "Add an x-axis label.")',
        },
        {
          type: "notes",
          id: "w5n1",
          prompt:
            "For the board: in one sentence, what does the monthly line chart say about the first half of 2026? Use a direction word (rising, falling, flat) and one number.",
          placeholder: "Monthly revenue is …: it moved from … naira in January to … naira in June.",
        },
        {
          type: "quiz",
          id: "w5q2",
          title: "Exit ticket",
          questions: [
            {
              q: "Which function creates a figure and axes together?",
              options: [
                "plt.subplots()",
                "plt.chart()",
                "df.plot()",
                "plt.figure_axes()",
              ],
              answer: 0,
              why: "fig, ax = plt.subplots() is the standard starting point.",
            },
            {
              q: "Which call saves the current figure to a file?",
              options: [
                "fig.savefig(\"chart.png\")",
                "plt.save()",
                "ax.export(\"chart.png\")",
                "df.to_png()",
              ],
              answer: 0,
              why: "savefig writes the figure; the extension determines the format.",
            },
            {
              q: "What does bins=12 mean in a histogram?",
              options: [
                "The values are grouped into 12 intervals",
                "Only 12 rows are plotted",
                "The chart is 12 inches wide",
                "There are 12 colors",
              ],
              answer: 0,
              why: "Bins are the numeric intervals the data is counted into.",
            },
            {
              q: "Why do axis labels matter?",
              options: [
                "Without them a reader has to guess the units and meaning",
                "They make the file smaller",
                "They change the data",
                "They are required by pandas",
              ],
              answer: 0,
              why: "A chart without labels is ambiguous, especially when shared outside the notebook.",
            },
            {
              q: "Which chart best shows whether revenue is growing over six months?",
              options: ["Line chart", "Pie chart", "Histogram", "Bar chart of products"],
              answer: 0,
              why: "A line chart is built for change over time.",
            },
          ],
        },
      ],
    },
  ],
};
