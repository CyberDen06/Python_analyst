export default {
  id: "week-4",
  number: 4,
  title: "Grouping, Aggregating, and Joining",
  tagline: "Summarize groups, then combine tables to get the full picture",
  duration: "5 hours",
  client: {
    name: "Mama Ada's Stores (growing)",
    brief:
      "The sales table now lives next to a product catalogue that holds our cost price for each product. We want to know which categories and regions earn the most, and which products actually make a profit after costs.",
    question: "Which category and region should we focus on, and which products make the most profit?",
  },
  objectives: [
    "Group rows and aggregate with sum, count, and mean",
    "Sort group results and find the best and worst groups",
    "Build a pivot table with two dimensions",
    "Merge two tables on a shared key",
    "Compute a derived metric after a join (profit)",
    "Make a recommendation from grouped evidence",
  ],
  sections: [
    {
      id: "w4s1",
      title: "Split, apply, combine",
      blocks: [
        {
          type: "text",
          md:
            "A **group-by** splits rows into categories, applies a summary to each category, and combines the results. \"Revenue by category\" and \"orders by region\" are both group-bys. It is the workhorse of descriptive analysis.",
        },
        {
          type: "table",
          headers: ["Step", "What happens", "pandas expression"],
          rows: [
            ["Split", "Rows are divided by the values of a column", "df.groupby(\"category\")"],
            ["Apply", "A summary is computed for each group", "\"revenue_ngn\"].sum()"],
            ["Combine", "One row per group is returned", "A Series indexed by category"],
          ],
        },
        {
          type: "code",
          id: "w4c1",
          title: "Revenue by category",
          rows: 10,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            'by_category = df.groupby("category")["revenue_ngn"].sum()\n' +
            'by_category.sort_values(ascending=False)',
        },
        {
          type: "code",
          id: "w4c2",
          title: "Several summaries at once",
          rows: 13,
          code:
            'summary = df.groupby("category").agg(\n' +
            '    orders=("order_id", "count"),\n' +
            '    revenue_ngn=("revenue_ngn", "sum"),\n' +
            '    avg_order=("revenue_ngn", "mean"),\n' +
            ")\n\n" +
            'summary["avg_order"] = summary["avg_order"].round(0)\n' +
            'summary.sort_values("revenue_ngn", ascending=False)',
        },
        {
          type: "exercise",
          id: "w4e1",
          title: "Rank the categories by revenue",
          prompt:
            "Load \`shop_sales.csv\`, create a \`revenue_ngn\` column, then build \`category_revenue\`:\n\n- a pandas Series\n- indexed by \`category\`\n- containing total revenue per category\n- sorted **highest first**\n\nPrint it at the end.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            "# category_revenue = ...\n",
          hints: [
            "df.groupby(\"category\")[\"revenue_ngn\"].sum() returns a Series.",
            "Chain .sort_values(ascending=False) to rank it.",
            "Make sure the last line shows the Series so you can inspect it.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            'category_revenue = df.groupby("category")["revenue_ngn"].sum().sort_values(ascending=False)\n\n' +
            "category_revenue",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            '_src["revenue_ngn"] = _src["quantity"] * _src["unit_price"]\n' +
            '_expected = _src.groupby("category")["revenue_ngn"].sum().sort_values(ascending=False)\n' +
            'expect_defined("category_revenue")\n' +
            'expect(isinstance(category_revenue, pd.Series), "category_revenue should be a Series from a groupby.")\n' +
            'expect(set(category_revenue.index) == set(_expected.index), "The index should contain all four categories.")\n' +
            'expect(list(category_revenue.index) == list(_expected.index), "Sort the categories by revenue, highest first.")\n' +
            '_actual = category_revenue.reindex(_expected.index)\n' +
            'expect(((_actual - _expected).abs() < 1).all(), "At least one category total is off. Sum quantity * unit_price per category.")\n' +
            'expect(abs(float(_actual.sum()) - float(_expected.sum())) < 1, "The category totals should add up to the full revenue.")',
        },
        {
          type: "quiz",
          id: "w4q1",
          title: "Check: grouping",
          questions: [
            {
              q: "What does df.groupby(\"category\")[\"revenue_ngn\"].sum() return?",
              options: [
                "One row per category with the total revenue",
                "One row per order",
                "A single number",
                "A pivot table",
              ],
              answer: 0,
              why: "Group-by + sum collapses each category to its total, indexed by category.",
            },
            {
              q: "Which step comes first in split-apply-combine?",
              options: ["Split rows into groups", "Sort the result", "Merge two tables", "Filter rows"],
              answer: 0,
              why: "You split by a key, apply a summary, then combine.",
            },
            {
              q: "Which summary would answer \"how many orders per region?\"",
              options: ["groupby region .count()", "groupby product .mean()", "merge on region", "sort_values"],
              answer: 0,
              why: "Counting order_id per region gives the number of orders per region.",
            },
            {
              q: "A group-by result is sorted by revenue and the first row is Accessories. What does that mean?",
              options: [
                "Accessories has the highest revenue",
                "Accessories has the most rows in the file",
                "Accessories is alphabetically first",
                "The data is wrong",
              ],
              answer: 0,
              why: "Sorting descending puts the highest total first.",
            },
          ],
        },
      ],
    },
    {
      id: "w4s2",
      title: "Two dimensions: pivot tables",
      blocks: [
        {
          type: "text",
          md:
            "A **pivot table** summarizes one value across two categories at once — for example, revenue by region (rows) and category (columns). It is the fastest way to see where the business is strong and weak.",
        },
        {
          type: "code",
          id: "w4c3",
          title: "Revenue by region and category",
          rows: 12,
          code:
            "region_category = df.pivot_table(\n" +
            '    values="revenue_ngn",\n' +
            '    index="region",\n' +
            '    columns="category",\n' +
            '    aggfunc="sum",\n' +
            "    fill_value=0,\n" +
            ")\n\n" +
            "region_category",
        },
        {
          type: "code",
          id: "w4c4",
          title: "Best region overall",
          rows: 5,
          code:
            'by_region = df.groupby("region")["revenue_ngn"].sum().sort_values(ascending=False)\n' +
            "by_region",
        },
        {
          type: "exercise",
          id: "w4e2",
          title: "Build a region summary table",
          prompt:
            "Create \`region_summary\`, a DataFrame with one row per \`region\` (sorted by revenue, highest first) and these columns:\n\n- \`orders\` — number of order rows\n- \`revenue_ngn\` — total revenue\n- \`avg_order\` — mean revenue per order\n\nUse \`groupby\` and \`agg\`, or \`groupby\` then assign columns. Rounding is optional.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            "# region_summary = ...\n",
          hints: [
            "Start with df.groupby(\"region\").agg(...).",
            "Count orders with (\"order_id\", \"count\"); sum revenue with (\"revenue_ngn\", \"sum\"); mean with (\"revenue_ngn\", \"mean\").",
            "Sort with .sort_values(\"revenue_ngn\", ascending=False).",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            "region_summary = df.groupby(\"region\").agg(\n" +
            '    orders=("order_id", "count"),\n' +
            '    revenue_ngn=("revenue_ngn", "sum"),\n' +
            '    avg_order=("revenue_ngn", "mean"),\n' +
            ").sort_values(\"revenue_ngn\", ascending=False)\n\n" +
            "region_summary",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            '_src["revenue_ngn"] = _src["quantity"] * _src["unit_price"]\n' +
            '_expected = (_src.groupby("region")\n' +
            '    .agg(orders=("order_id", "count"), revenue_ngn=("revenue_ngn", "sum"), avg_order=("revenue_ngn", "mean"))\n' +
            '    .sort_values("revenue_ngn", ascending=False))\n' +
            'expect_defined("region_summary")\n' +
            'expect(isinstance(region_summary, pd.DataFrame), "region_summary should be a DataFrame.")\n' +
            'expect({"orders", "revenue_ngn", "avg_order"} <= set(region_summary.columns), "region_summary needs orders, revenue_ngn, and avg_order columns.")\n' +
            'expect(set(region_summary.index) == set(_expected.index), "Every region should appear once.")\n' +
            'expect(list(region_summary.index) == list(_expected.index), "Sort region_summary by revenue, highest first.")\n' +
            '_actual = region_summary.reindex(_expected.index)\n' +
            'expect((_actual["orders"].astype(int).values == _expected["orders"].values).all(), "The orders counts are off — count order_id per region.")\n' +
            'expect(((_actual["revenue_ngn"] - _expected["revenue_ngn"]).abs() < 1).all(), "The revenue totals are off.")\n' +
            'expect(((_actual["avg_order"] - _expected["avg_order"]).abs() < 1).all(), "avg_order should be the mean revenue per order.")',
        },
        {
          type: "quiz",
          id: "w4q2",
          title: "Check: pivot tables",
          questions: [
            {
              q: "A pivot table with index=region and columns=category shows…",
              options: [
                "One number per region–category combination",
                "One row per order",
                "Only the total revenue",
                "A chart",
              ],
              answer: 0,
              why: "The pivot places categories across the top and regions down the side, with a summary in each cell.",
            },
            {
              q: "Why use fill_value=0 in a pivot table?",
              options: [
                "To show zero instead of blank when a combination has no rows",
                "To delete empty regions",
                "To convert text to numbers",
                "To sort the table",
              ],
              answer: 0,
              why: "A combination with no orders is genuinely zero revenue, not missing information.",
            },
            {
              q: "Which question is a pivot table best at answering?",
              options: [
                "Which region–category pairs earn the most?",
                "Which order is the newest?",
                "What is the name of the first customer?",
                "How many columns are there?",
              ],
              answer: 0,
              why: "Pivot tables compare a measure across two dimensions at once.",
            },
          ],
        },
      ],
    },
    {
      id: "w4s3",
      title: "Joining tables",
      blocks: [
        {
          type: "text",
          md:
            "Our sales table has revenue but no costs. The catalogue has costs but no orders. A **merge** combines them using a shared column — here, \`product\`. This is also called a join.",
        },
        {
          type: "code",
          id: "w4c5",
          title: "Merge orders with the catalogue",
          rows: 12,
          code:
            'catalogue = pd.read_csv("product_catalogue.csv")\n' +
            "print(catalogue)\n\n" +
            'merged = df.merge(catalogue, on="product", how="left")\n' +
            'print("Order rows:", len(df), "→ merged rows:", len(merged))\n' +
            'merged[["product", "category_official", "unit_cost_ngn", "revenue_ngn"]].head()',
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Always check the row count after a merge.** If the catalogue had two rows for the same product, a left merge would duplicate orders and inflate revenue. Here 96 orders stay 96 rows — good.",
        },
        {
          type: "code",
          id: "w4c6",
          title: "Profit after costs",
          rows: 8,
          code:
            'merged["profit_ngn"] = merged["revenue_ngn"] - merged["quantity"] * merged["unit_cost_ngn"]\n\n' +
            'profit_by_product = merged.groupby("product")["profit_ngn"].sum().sort_values(ascending=False)\n' +
            "profit_by_product",
        },
        {
          type: "exercise",
          id: "w4e3",
          title: "Which product makes the most profit?",
          prompt:
            "Build the full picture:\n\n1. Load \`shop_sales.csv\` and \`product_catalogue.csv\`\n2. Create \`revenue_ngn\` = quantity × unit_price\n3. Merge the catalogue onto the orders with \`how=\"left\"\` and a shared \`product\` column; call the result \`merged\`\n4. Create \`profit_ngn\` = revenue_ngn − quantity × unit_cost_ngn\n5. Create \`top_product\` — the product name with the highest **total** profit\n\nCheck that \`merged\` still has 96 rows.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'catalogue = pd.read_csv("product_catalogue.csv")\n\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            "# merged = ...\n" +
            "# merged[\"profit_ngn\"] = ...\n" +
            "# top_product = ...\n\n" +
            "# print(len(merged), top_product)\n",
          hints: [
            "Merge with df.merge(catalogue, on=\"product\", how=\"left\").",
            "Profit per row is revenue_ngn minus quantity * unit_cost_ngn.",
            "Group merged by product, sum profit_ngn, sort descending, and take .idxmax() or the first index.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales.csv")\n' +
            'catalogue = pd.read_csv("product_catalogue.csv")\n\n' +
            'df["revenue_ngn"] = df["quantity"] * df["unit_price"]\n\n' +
            'merged = df.merge(catalogue, on="product", how="left")\n' +
            'merged["profit_ngn"] = merged["revenue_ngn"] - merged["quantity"] * merged["unit_cost_ngn"]\n\n' +
            'profit_by_product = merged.groupby("product")["profit_ngn"].sum().sort_values(ascending=False)\n' +
            "top_product = profit_by_product.index[0]\n\n" +
            "print(len(merged), top_product)",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("shop_sales.csv")\n' +
            '_cat = pd.read_csv("product_catalogue.csv")\n' +
            '_expected = _src.merge(_cat, on="product", how="left")\n' +
            '_expected["revenue_ngn"] = _expected["quantity"] * _expected["unit_price"]\n' +
            '_expected["profit_ngn"] = _expected["revenue_ngn"] - _expected["quantity"] * _expected["unit_cost_ngn"]\n' +
            '_top = _expected.groupby("product")["profit_ngn"].sum().idxmax()\n' +
            'expect_defined("merged", "top_product")\n' +
            'expect("unit_cost_ngn" in merged.columns, "Merge the catalogue so merged contains unit_cost_ngn.")\n' +
            'expect(len(merged) == len(_expected), "The merge should keep exactly 96 order rows — one per order.")\n' +
            'expect("profit_ngn" in merged.columns, "Create a profit_ngn column.")\n' +
            'expect(abs(merged["profit_ngn"].sum() - _expected["profit_ngn"].sum()) < 1, "Profit should be revenue_ngn minus quantity * unit_cost_ngn.")\n' +
            'expect(top_product == _top, "top_product should be the product with the highest total profit.")',
        },
        {
          type: "notes",
          id: "w4n1",
          prompt:
            "Make a recommendation to the client in three sentences: which category earns the most, which region is strongest, and which product is most profitable. Use actual numbers from your notebook.",
          placeholder:
            "Audio earns the most at … naira. The strongest region is … with … naira. The most profitable product is … at … naira.",
        },
        {
          type: "quiz",
          id: "w4q3",
          title: "Exit ticket",
          questions: [
            {
              q: "What does a merge require to combine two tables?",
              options: [
                "A shared column to match rows on",
                "The same number of rows",
                "The same column order",
                "Identical file names",
              ],
              answer: 0,
              why: "The join key is what links rows between the tables.",
            },
            {
              q: "After merging 96 orders with a product catalogue, you get 192 rows. Most likely…",
              options: [
                "The catalogue has duplicate product keys",
                "The merge is correct",
                "pandas doubled the revenue intentionally",
                "The orders table had 192 rows",
              ],
              answer: 0,
              why: "Duplicate keys on the right table multiply matching rows. Check the key for duplicates.",
            },
            {
              q: "Profit per order is best computed as…",
              options: [
                "revenue_ngn − quantity × unit_cost_ngn",
                "unit_price − unit_cost_ngn",
                "quantity × unit_price",
                "total revenue ÷ number of products",
              ],
              answer: 0,
              why: "Each order contains quantity units; cost applies per unit.",
            },
            {
              q: "Which operation turns 96 order rows into 5 region rows?",
              options: ["groupby", "merge", "read_csv", "head"],
              answer: 0,
              why: "Grouping by region and aggregating collapses orders into one row per region.",
            },
            {
              q: "Which is the best first check after any join?",
              options: [
                "Confirm the row count and key values",
                "Make a chart",
                "Drop duplicates immediately",
                "Sort by date",
              ],
              answer: 0,
              why: "A join can silently duplicate or lose rows; compare counts and keys first.",
            },
          ],
        },
      ],
    },
  ],
};
