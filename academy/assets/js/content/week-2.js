export default {
  id: "week-2",
  number: 2,
  title: "Your First Tables with pandas",
  tagline: "Load, inspect, filter, sort — and answer a client question",
  duration: "4 hours",
  client: {
    name: "Mama Ada's Stores",
    brief:
      "We sell phone accessories online and in three shops across Lagos. We record every order in a spreadsheet, but nobody has time to read it. We want to know which products and which areas bring in the most money, and which single order was our biggest.",
    question: "Where is our revenue coming from, and what should we look at first?",
  },
  objectives: [
    "Import pandas and read a CSV into a DataFrame",
    "Inspect a table with head(), shape, columns, info(), and describe()",
    "Select columns and rows",
    "Filter rows with conditions and sort the result",
    "Create a new column from existing columns",
    "Answer a client question with two numbers",
  ],
  sections: [
    {
      id: "w2s1",
      title: "Load and inspect a table",
      blocks: [
        {
          type: "text",
          md:
            "**pandas** is the Python library for tables. A table inside pandas is called a **DataFrame**. We will use the dataset \`shop_sales.csv\`: 96 orders from January to June 2026, with columns for product, category, region, quantity, unit price, and customer type.",
        },
        {
          type: "code",
          id: "w2c1",
          title: "Read the CSV and look at the first rows",
          rows: 8,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'print("Rows and columns:", df.shape)\n' +
            'print("Columns:", list(df.columns))\n' +
            'df.head()',
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "The last line, \`df.head()\`, shows the first five rows as a table. In a notebook, a bare DataFrame expression displays like this automatically — no need to print it.",
        },
        {
          type: "table",
          headers: ["Command", "What it tells you"],
          rows: [
            ["df.shape", "How many rows and columns: (rows, columns)"],
            ["df.columns", "The column names"],
            ["df.head()", "The first 5 rows"],
            ["df.tail()", "The last 5 rows"],
            ["df.info()", "Column names, non-missing counts, and types"],
            ["df.describe()", "Count, mean, min, quartiles, max for numeric columns"],
          ],
        },
        {
          type: "code",
          id: "w2c2",
          title: "Column types and summary statistics",
          rows: 6,
          code:
            "df.info()\n" +
            "df.describe()",
        },
        {
          type: "exercise",
          id: "w2e1",
          title: "Load it yourself",
          prompt:
            "Load \`shop_sales.csv\` into a DataFrame called \`df\`. Then create:\n\n- \`row_count\` — the number of rows as an int\n- \`column_count\` — the number of columns as an int\n- \`column_names\` — a list of the column names\n\nRun the cell before checking.",
          starter:
            "import pandas as pd\n\n" +
            "# df = pd.read_csv(...)\n\n" +
            "# row_count = ...\n" +
            "# column_count = ...\n" +
            "# column_names = ...\n\n" +
            "# print(row_count, column_count)\n" +
            "# print(column_names)\n",
          hints: [
            "df.shape is a tuple: index 0 is rows, index 1 is columns.",
            "list(df.columns) turns the column index into a plain list.",
            "Use int(df.shape[0]) if the value looks unusual when printed.",
          ],
          solution:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales.csv")\n' +
            "row_count = int(df.shape[0])\n" +
            "column_count = int(df.shape[1])\n" +
            "column_names = list(df.columns)\n\n" +
            "print(row_count, column_count)\n" +
            "print(column_names)",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            'expect_defined("df", "row_count", "column_count", "column_names")\n' +
            'expect(isinstance(df, pd.DataFrame), "df should be a pandas DataFrame loaded with pd.read_csv.")\n' +
            'expect(isinstance(row_count, int) and not isinstance(row_count, bool), "row_count should be an int.")\n' +
            "expect(row_count == len(_src), \"row_count should equal the number of rows in shop_sales.csv.\")\n" +
            'expect(isinstance(column_count, int) and column_count == _src.shape[1], "column_count should equal the number of columns.")\n' +
            'expect(isinstance(column_names, list) and set(column_names) == set(_src.columns), "column_names should be a list of all column names.")\n' +
            "expect(len(df) == len(_src), \"df should contain all rows from shop_sales.csv.\")",
        },
      ],
    },
    {
      id: "w2s2",
      title: "Select, filter, and sort",
      blocks: [
        {
          type: "text",
          md:
            "Most analysis questions are a combination of three moves: **select** the columns you care about, **filter** to the rows that matter, and **sort** to find the top or bottom.",
        },
        {
          type: "code",
          id: "w2c3",
          title: "Select columns and rows",
          rows: 12,
          code:
            'print(df["product"].head())\n' +
            'df[["order_id", "product", "unit_price"]].head(3)\n\n' +
            "df.loc[0]        # row by label\n" +
            "# df.iloc[0]     # row by position",
        },
        {
          type: "code",
          id: "w2c4",
          title: "Filter and sort",
          rows: 12,
          code:
            'expensive = df[df["unit_price"] > 20000]\n' +
            'print("Orders above 20,000:", len(expensive))\n\n' +
            'top5 = df.sort_values("unit_price", ascending=False).head(5)\n' +
            'top5[["product", "region", "unit_price"]]',
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**One condition at a time.** \`df[df[\"unit_price\"] > 20000]\` means \"keep the rows where this condition is True\". To combine conditions, wrap each one in parentheses and join them with \`&\` (and) or \`|\` (or).",
        },
        {
          type: "code",
          id: "w2c5",
          title: "Combine two conditions",
          rows: 6,
          code:
            'audio_lekki = df[(df["category"] == "Audio") & (df["region"] == "Lekki")]\n' +
            'print("Audio orders in Lekki:", len(audio_lekki))\n' +
            'audio_lekki[["product", "quantity", "unit_price"]]',
        },
        {
          type: "exercise",
          id: "w2e2",
          title: "Find a specific slice of orders",
          prompt:
            "Starting from \`shop_sales.csv\`, create:\n\n- \`headphones\` — every order where \`product\` is \`Headphones\`\n- \`headphones_lekki\` — those orders filtered to \`region\` equal to \`Lekki\`\n- \`count\` — the number of rows in \`headphones_lekki\`\n\nUse the exact product spelling from the data.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "# headphones = ...\n" +
            "# headphones_lekki = ...\n" +
            "# count = ...\n\n" +
            "# print(count)\n",
          hints: [
            "Filter with square brackets and a condition: df[df[\"product\"] == \"Headphones\"].",
            "Filter the already-filtered table again, using its own name.",
            "len(headphones_lekki) gives the row count.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            'headphones = df[df["product"] == "Headphones"]\n' +
            'headphones_lekki = headphones[headphones["region"] == "Lekki"]\n' +
            "count = len(headphones_lekki)\n\n" +
            "print(count)",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            '_h = _src[_src["product"] == "Headphones"]\n' +
            '_hl = _h[_h["region"] == "Lekki"]\n' +
            'expect_defined("headphones", "headphones_lekki", "count")\n' +
            'expect(len(headphones) == len(_h), "headphones should contain every Headphones order.")\n' +
            'expect(set(headphones["product"].unique()) == {"Headphones"}, "headphones should only contain Headphones rows.")\n' +
            'expect(len(headphones_lekki) == len(_hl), "headphones_lekki should also filter for region == \\"Lekki\\".")\n' +
            'expect(count == len(_hl), "count should be the number of rows in headphones_lekki.")',
        },
        {
          type: "quiz",
          id: "w2q1",
          title: "Check: selecting and filtering",
          questions: [
            {
              q: "Which expression keeps only rows where unit_price is above 20000?",
              options: [
                "df[df.unit_price > 20000]",
                "df.unit_price > 20000",
                "df[\"unit_price\"]",
                "df > 20000",
              ],
              answer: 0,
              why: "The condition goes inside the square brackets and acts like a row mask.",
            },
            {
              q: "What does df[\"product\"] return?",
              options: ["The product column as a Series", "The product rows", "A sorted table", "The number of products"],
              answer: 0,
              why: "Selecting one column with a single pair of brackets returns a Series.",
            },
            {
              q: "Which line shows the 5 most expensive orders first?",
              options: [
                "df.sort_values(\"unit_price\").head(5)",
                "df.sort_values(\"unit_price\", ascending=False).head(5)",
                "df.head(5).sort_values(\"unit_price\")",
                "df[df.unit_price > 5]",
              ],
              answer: 1,
              why: "ascending=False puts the largest values first; head(5) keeps five rows.",
            },
            {
              q: "How do you combine two filter conditions?",
              options: [
                "Join them with & and wrap each in parentheses",
                "Join them with +",
                "Use two separate square brackets",
                "Join them with >",
              ],
              answer: 0,
              why: "Use & (and) or | (or), with parentheses around each condition.",
            },
            {
              q: "df.shape for a table with 96 rows and 8 columns is…",
              options: ["(8, 96)", "(96, 8)", "768", "\"96 x 8\""],
              answer: 1,
              why: "shape is (rows, columns).",
            },
          ],
        },
      ],
    },
    {
      id: "w2s3",
      title: "Create a column and answer the question",
      blocks: [
        {
          type: "text",
          md:
            "Our client wants to know where revenue comes from. Revenue is not stored in the file — we must **create** it: \`revenue = quantity × unit_price\`. Creating a new column from existing ones is one of the most common moves in analysis.",
        },
        {
          type: "code",
          id: "w2c6",
          title: "Add a revenue column",
          rows: 9,
          code:
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            'print("Total revenue:", df["revenue_ngn"].sum())\n' +
            'df[["order_id", "quantity", "unit_price", "revenue_ngn"]].head()',
        },
        {
          type: "code",
          id: "w2c7",
          title: "The biggest order",
          rows: 5,
          code:
            'biggest = df.sort_values("revenue_ngn", ascending=False).head(1)\n' +
            'biggest[["order_id", "product", "region", "revenue_ngn"]]',
        },
        {
          type: "exercise",
          id: "w2e3",
          title: "Total revenue and biggest order",
          prompt:
            "Starting from a fresh load of \`shop_sales.csv\`:\n\n1. Create a column \`revenue_ngn\` = \`quantity\` × \`unit_price\`\n2. Create \`total_revenue\` — the sum of \`revenue_ngn\`\n3. Create \`biggest_order\` — a one-row DataFrame for the order with the highest revenue\n\nUse the same column names as the prompt.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "# df[\"revenue_ngn\"] = ...\n" +
            "# total_revenue = ...\n" +
            "# biggest_order = ...\n\n" +
            "# print(total_revenue)\n" +
            "# biggest_order[[\"order_id\", \"revenue_ngn\"]]\n",
          hints: [
            "Create a column with df[\"revenue_ngn\"] = df[\"quantity\"] * df[\"unit_price\"].",
            "Sum a column with df[\"revenue_ngn\"].sum().",
            "Sort by revenue_ngn descending, then take .head(1) to get one row.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n' +
            'total_revenue = int(df["revenue_ngn"].sum())\n' +
            'biggest_order = df.sort_values("revenue_ngn", ascending=False).head(1)\n\n' +
            "print(total_revenue)\n" +
            'biggest_order[["order_id", "product", "region", "revenue_ngn"]]',
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            '_expected = int((_src["quantity"] * _src["unit_price"]).sum())\n' +
            'expect_defined("df", "total_revenue", "biggest_order")\n' +
            'expect("revenue_ngn" in df.columns, "Create a revenue_ngn column on df.")\n' +
            'expect(abs(df["revenue_ngn"].sum() - _expected) < 1, "Revenue per row should be quantity * unit_price for every row.")\n' +
            'expect(total_revenue == _expected, "total_revenue should equal the sum of the revenue_ngn column.")\n' +
            'expect(len(biggest_order) == 1, "biggest_order should be a one-row DataFrame.")\n' +
            'expect(int(biggest_order["revenue_ngn"].iloc[0]) == int(df["revenue_ngn"].max()), "biggest_order should contain the order with the highest revenue.")',
        },
        {
          type: "notes",
          id: "w2n1",
          prompt:
            "Write a one-sentence client readout: use your \`total_revenue\` and the biggest order to answer \"Where is our revenue coming from?\" Mention the product or region of the biggest order.",
          placeholder: "Between January and June, Mama Ada's Stores made … naira. The biggest single order was …",
        },
        {
          type: "quiz",
          id: "w2q2",
          title: "Exit ticket",
          questions: [
            {
              q: "Which line reads a CSV into a DataFrame?",
              options: [
                "pd.read_csv(\"shop_sales.csv\")",
                "pd.read(\"shop_sales.csv\")",
                "open_csv(\"shop_sales.csv\")",
                "df.csv(\"shop_sales.csv\")",
              ],
              answer: 0,
              why: "pd.read_csv is the pandas function for reading a CSV file.",
            },
            {
              q: "You created df[\"revenue_ngn\"]. What is the fastest way to see its total?",
              options: [
                "df[\"revenue_ngn\"].sum()",
                "df.revenue_ngn.total()",
                "sum(df)",
                "df.shape",
              ],
              answer: 0,
              why: "Series.sum() adds up every value in the column.",
            },
            {
              q: "What does df.info() show?",
              options: [
                "Only the first five rows",
                "Column names, non-missing counts, and data types",
                "The biggest value in each column",
                "A chart",
              ],
              answer: 1,
              why: "info() is a structural overview of the table.",
            },
            {
              q: "Why is filtering by product and region useful?",
              options: [
                "It hides missing values automatically",
                "It narrows the rows to the part of the business you are asking about",
                "It sorts the table",
                "It converts text to numbers",
              ],
              answer: 1,
              why: "Filters answer questions about a specific slice, such as Headphones in Lekki.",
            },
            {
              q: "Which values are numeric in shop_sales.csv?",
              options: [
                "quantity and unit_price",
                "product and region",
                "order_id and order_date",
                "customer_type and category",
              ],
              answer: 0,
              why: "quantity and unit_price hold numbers you can do maths on.",
            },
            {
              q: "What is the difference between df.head() and df.describe()?",
              options: [
                "head() shows rows; describe() summarizes numeric columns",
                "head() summarizes columns; describe() shows rows",
                "They are the same",
                "describe() only works on text",
              ],
              answer: 0,
              why: "head() previews rows; describe() computes summary statistics.",
            },
          ],
        },
      ],
    },
  ],
};
