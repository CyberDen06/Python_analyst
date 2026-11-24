export default {
  id: "week-3",
  number: 3,
  title: "Cleaning Real-World Data",
  tagline: "Dirty data leads to wrong decisions. Fix it before you analyze it.",
  duration: "5 hours",
  client: {
    name: "Mama Ada's Stores (again)",
    brief:
      "The sales file is back from the shop assistants, and it is a mess: some prices are blank, some are written as \"N12,500\", some rows appear twice, and at least one price looks like a typing error. Before anyone reports revenue, we need a version of this file we can trust.",
    question: "What is the true revenue picture once the sales data is cleaned?",
  },
  objectives: [
    "Profile a messy dataset: missing values, duplicates, types, ranges",
    "Choose and justify a handling rule for missing values",
    "Remove exact duplicate rows",
    "Standardize inconsistent text categories",
    "Convert currency text into real numbers",
    "Investigate and handle outliers",
    "Document every cleaning decision",
  ],
  sections: [
    {
      id: "w3s1",
      title: "Meet the mess",
      blocks: [
        {
          type: "text",
          md:
            "The file \`shop_sales_messy.csv\` is a realistic export: 84 rows with five kinds of problems mixed together. Your first job is not to fix anything — it is to **profile** the data and write down what is wrong.",
        },
        {
          type: "code",
          id: "w3c1",
          title: "Profile the raw file",
          rows: 14,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales_messy.csv")\n' +
            'print("Shape:", df.shape)\n' +
            'print("\\nMissing values per column:")\n' +
            'print(df.isna().sum())\n' +
            'print("\\nDuplicate rows:", df.duplicated().sum())\n' +
            'print("\\nColumn types:")\n' +
            "print(df.dtypes)\n" +
            'df["unit_price"].head(12)',
        },
        {
          type: "table",
          headers: ["Problem", "How to detect it", "What you will find here"],
          rows: [
            ["Missing values", "df.isna().sum()", "8 blank unit_price cells"],
            ["Duplicates", "df.duplicated().sum()", "4 exact duplicate rows"],
            ["Inconsistent text", "df[\"category\"].unique()", "audio, AUDIO, Audio with trailing spaces"],
            ["Mixed formats", "df[\"unit_price\"].dtype", "unit_price is text (object), not a number"],
            ["Outliers", "df[\"unit_price\"].str… then max", "Two prices of 4,200,000 — a clear typo"],
            ["Mixed dates", "df[\"order_date\"].head()", "Mostly 2026-03-15, a few 15/03/2026"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Why unit_price is text:** one currency string in a column forces the whole column to become text. You cannot compute a sum until every value is a number. Mixed types are one of the most common causes of wrong totals.",
        },
        {
          type: "notes",
          id: "w3n1",
          prompt:
            "Write your audit findings: name at least three problems you found in the raw file and one example row or value for each.",
          placeholder: "1. Missing values in …\n2. Duplicates: …\n3. Inconsistent category spellings, e.g. …\n4. Outlier: …",
        },
      ],
    },
    {
      id: "w3s2",
      title: "Missing values and duplicates",
      blocks: [
        {
          type: "text",
          md:
            "For missing values there are three honest choices: **drop** the row, **fill** the cell with a documented rule, or **flag** it in a new column and keep it. What you must not do is silently invent a value.\n\nFor duplicates, always look before you delete — two orders can legitimately look similar; exact duplicate rows (same order_id and everything else) are safe to remove.",
        },
        {
          type: "code",
          id: "w3c2",
          title: "Drop missing prices, then exact duplicates",
          rows: 12,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            'print("Rows before:", len(df))\n' +
            'no_missing = df.dropna(subset=["unit_price"])\n' +
            'print("After dropping blank prices:", len(no_missing))\n\n' +
            'deduped = no_missing.drop_duplicates()\n' +
            'print("After removing exact duplicates:", len(deduped))\n' +
            'print("Duplicates left:", deduped.duplicated().sum())',
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Document the rule.** If you drop blank prices, write \"dropped 8 rows with no price\" in your notebook. Future-you (and the client) needs to know what changed.",
        },
        {
          type: "exercise",
          id: "w3e1",
          title: "Remove blanks and exact duplicates",
          prompt:
            "Load \`shop_sales_messy.csv\` and produce \`df_clean\` where:\n\n- there are no missing \`unit_price\` values\n- there are no exact duplicate rows\n\nKeep the other columns unchanged for now. Run the cell before checking.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            "# df_clean = ...\n\n" +
            "# print(len(df), len(df_clean))\n",
          hints: [
            "df.dropna(subset=[\"unit_price\"]) removes rows whose price is blank.",
            "Chain .drop_duplicates() afterwards.",
            "Print len(df_clean) to confirm the row count changed.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            'df_clean = df.dropna(subset=["unit_price"]).drop_duplicates()\n\n' +
            "print(len(df), len(df_clean))",
          checks:
            'import pandas as pd\n' +
            'expect_defined("df_clean")\n' +
            'expect(isinstance(df_clean, pd.DataFrame), "df_clean should be a DataFrame.")\n' +
            'expect(df_clean["unit_price"].isna().sum() == 0, "There are still missing unit_price values. Drop or fill them.")\n' +
            'expect(df_clean.duplicated().sum() == 0, "There are still exact duplicate rows. Use drop_duplicates().")\n' +
            'expect(len(df_clean) >= 70, "You removed too many rows. Keep every row that has a price.")',
        },
        {
          type: "quiz",
          id: "w3q1",
          title: "Check: missing values and duplicates",
          questions: [
            {
              q: "Which command counts missing values in each column?",
              options: ["df.isna().sum()", "df.missing()", "df.dropna()", "df.fillna(0)"],
              answer: 0,
              why: "isna() returns True/False per cell; sum() counts the Trues per column.",
            },
            {
              q: "A row is missing unit_price. Which of these is NOT acceptable without documentation?",
              options: [
                "Drop the row",
                "Fill the price with the median and write down the rule",
                "Guess a plausible price",
                "Flag the row and exclude it from revenue",
              ],
              answer: 2,
              why: "Guessing silently creates false data. Any fill rule must be documented.",
            },
            {
              q: "What does df.drop_duplicates() do?",
              options: [
                "Removes rows whose values are identical across all columns",
                "Removes duplicate column names",
                "Fills duplicate cells",
                "Sorts the table",
              ],
              answer: 0,
              why: "It keeps the first occurrence of each identical row and drops later copies.",
            },
            {
              q: "Why check duplicates before deleting them?",
              options: [
                "Because pandas might crash",
                "Because similar-looking rows can be genuinely different orders",
                "Because duplicates always have different order_ids",
                "Because duplicates are always valid",
              ],
              answer: 1,
              why: "Only exact duplicates are safe to remove; near-duplicates may be real transactions.",
            },
          ],
        },
      ],
    },
    {
      id: "w3s3",
      title: "Fix text, numbers, categories — and the typo",
      blocks: [
        {
          type: "text",
          md:
            "To turn currency text into numbers, strip away everything that is not part of the number, then convert. The string methods below work on a whole column at once.",
        },
        {
          type: "code",
          id: "w3c3",
          title: "A small currency-cleaning example",
          rows: 12,
          code:
            "import pandas as pd\n\n" +
            'prices = pd.Series(["N12,500", "8,000", "\\u20a67,500", "15000"])\n\n' +
            'cleaned = (prices\n' +
            '    .str.replace("\\u20a6", "", regex=False)\n' +
            '    .str.replace("N", "", regex=False)\n' +
            '    .str.replace(",", "", regex=False))\n\n' +
            "numbers = pd.to_numeric(cleaned, errors=\"coerce\")\n" +
            "print(numbers)",
        },
        {
          type: "text",
          md:
            "**errors=\"coerce\"** is important: anything that still cannot be converted becomes NaN instead of crashing the notebook. You then treat those as missing values.",
        },
        {
          type: "code",
          id: "w3c4",
          title: "Clean prices on the real table",
          rows: 14,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            'price_text = df["unit_price"].astype(str)\n' +
            'price_clean = (price_text\n' +
            '    .str.replace("\\u20a6", "", regex=False)\n' +
            '    .str.replace("N", "", regex=False)\n' +
            '    .str.replace(",", "", regex=False))\n\n' +
            'df["unit_price"] = pd.to_numeric(price_clean, errors="coerce")\n' +
            'print("Type now:", df["unit_price"].dtype)\n' +
            'print("Missing after conversion:", df["unit_price"].isna().sum())\n' +
            'print("Max price:", df["unit_price"].max())\n' +
            "df[[\"order_id\", \"product\", \"unit_price\"]].head(8)",
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Look at that maximum.** 4,200,000 naira for a phone case is not a real price — it is a typo. An outlier is a signal to investigate, not a number to average. Decide: correct it, drop it, or keep it with a note.",
        },
        {
          type: "exercise",
          id: "w3e2",
          title: "Produce the clean revenue table",
          prompt:
            "Load \`shop_sales_messy.csv\` and build \`df_clean\` that satisfies **all** of these rules:\n\n1. \`unit_price\` is numeric (not text)\n2. No missing \`unit_price\` values remain\n3. No exact duplicate rows remain\n4. \`category\` values are lowercase with no extra spaces (audio, accessories, power, wearables)\n5. No \`unit_price\` is above 1,000,000 — remove or correct the two typos\n\nAim to keep at least 70 rows. In your own notebook, add a markdown note explaining each decision.",
          starter:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            "# 1. clean the currency text\n" +
            "# 2. convert to numeric\n" +
            "# 3. drop blanks and duplicates\n" +
            "# 4. standardize category\n" +
            "# 5. handle the outliers\n" +
            "# df_clean = ...\n\n" +
            "# print(len(df_clean))\n" +
            "# print(df_clean[\"unit_price\"].describe())\n",
          hints: [
            "The conversion recipe: astype(str) → remove ₦, N, and commas → pd.to_numeric(..., errors=\"coerce\").",
            "Standardize categories with df[\"category\"].str.strip().str.lower().",
            "Filter out the typos: df_clean[df_clean[\"unit_price\"] < 1_000_000]. Then dropna and drop_duplicates.",
            "Order matters: convert to numeric first, then drop missing prices, then remove duplicates and outliers.",
          ],
          solution:
            "import pandas as pd\n" +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            'price_text = df["unit_price"].astype(str)\n' +
            'price_clean = (price_text\n' +
            '    .str.replace("\\u20a6", "", regex=False)\n' +
            '    .str.replace("N", "", regex=False)\n' +
            '    .str.replace(",", "", regex=False))\n' +
            'df["unit_price"] = pd.to_numeric(price_clean, errors="coerce")\n' +
            'df["category"] = df["category"].str.strip().str.lower()\n\n' +
            'df_clean = (df\n' +
            '    .dropna(subset=["unit_price"])\n' +
            '    .drop_duplicates()\n' +
            '    .query("unit_price < 1000000"))\n\n' +
            "print(len(df_clean))\n" +
            'df_clean["unit_price"].describe()',
          checks:
            'import pandas as pd\n' +
            'expect_defined("df_clean")\n' +
            'expect(isinstance(df_clean, pd.DataFrame), "df_clean should be a DataFrame.")\n' +
            'expect(df_clean["unit_price"].dtype.kind in "fi", "unit_price should be numeric. Convert the currency text with pd.to_numeric.")\n' +
            'expect(df_clean["unit_price"].isna().sum() == 0, "There are still missing unit_price values. Drop or fill them.")\n' +
            'expect(df_clean.duplicated().sum() == 0, "There are still exact duplicate rows.")\n' +
            '_cats = set(df_clean["category"].astype(str).str.strip().str.lower().unique())\n' +
            'expect(_cats <= {"audio", "accessories", "power", "wearables"}, "Standardize category to lowercase with no extra spaces.")\n' +
            "expect(df_clean['unit_price'].max() < 1000000, \"There is still a 4,200,000 typo. Remove or correct prices above 1,000,000.\")\n" +
            'expect(len(df_clean) >= 70, "You removed too many rows. Aim to keep at least 70.")',
        },
      ],
    },
    {
      id: "w3s4",
      title: "Dates: two formats in one column",
      blocks: [
        {
          type: "text",
          md:
            "A few rows use \`15/03/2026\` while most use \`2026-03-15\`. Python cannot guess which numbers are days. Parse each format explicitly, then combine the results.",
        },
        {
          type: "code",
          id: "w3c5",
          title: "Parse both date formats",
          rows: 12,
          code:
            'import pandas as pd\n\n' +
            'df = pd.read_csv("shop_sales_messy.csv")\n\n' +
            'iso = pd.to_datetime(df["order_date"], format="%Y-%m-%d", errors="coerce")\n' +
            'dmy = pd.to_datetime(df["order_date"], format="%d/%m/%Y", errors="coerce")\n' +
            'dates = iso.fillna(dmy)\n\n' +
            'print("Parsed:", dates.notna().sum(), "of", len(df))\n' +
            "print(dates.head(10))",
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**Never let pandas guess dates in a real project.** \`errors=\"coerce\"\` turns unparseable values into NaT (not-a-time) instead of crashing — but you must then inspect how many NaT values remain.",
        },
        {
          type: "quiz",
          id: "w3q2",
          title: "Check: formats and outliers",
          questions: [
            {
              q: "A column contains \"N12,500\" and 8000. Why can't you sum it as-is?",
              options: [
                "The column is text, not numeric",
                "The column is boolean",
                "The values are too large",
                "pandas cannot sum columns",
              ],
              answer: 0,
              why: "Mixed text and numbers make the column object dtype; conversion is required first.",
            },
            {
              q: "What does pd.to_numeric(cleaned, errors=\"coerce\") do with \"abc\"?",
              options: ["Raises an error", "Turns it into NaN", "Turns it into 0", "Deletes the row"],
              answer: 1,
              why: "errors=\"coerce\" converts unparseable values to NaN so you can handle them as missing.",
            },
            {
              q: "Which is the best response to a price of 4,200,000 when every other price is under 50,000?",
              options: [
                "Average it in — it is data",
                "Investigate: it is probably a typo; remove or correct it and document the choice",
                "Replace it with 0",
                "Delete the whole column",
              ],
              answer: 1,
              why: "Outliers need a decision, not blind inclusion. Document what you did.",
            },
            {
              q: "Why parse dates with an explicit format?",
              options: [
                "Because 03/04 could mean 3 April or 4 March",
                "Because dates are always text",
                "Because pandas cannot store dates",
                "Because it makes the file smaller",
              ],
              answer: 0,
              why: "Ambiguous day/month order can silently swap dates without an explicit format.",
            },
          ],
        },
        {
          type: "notes",
          id: "w3n2",
          prompt:
            "Write your cleaning log for the client: three decisions you made and the reason for each (for example: dropped 8 rows with no price because revenue cannot be computed without one).",
          placeholder:
            "1. Decision: … Reason: …\n2. Decision: … Reason: …\n3. Decision: … Reason: …",
        },
        {
          type: "quiz",
          id: "w3q3",
          title: "Exit ticket",
          questions: [
            {
              q: "Which check counts exact duplicate rows?",
              options: ["df.duplicated().sum()", "df.isna().sum()", "df.shape", "df.dtypes"],
              answer: 0,
              why: "duplicated() flags repeated rows; sum() counts them.",
            },
            {
              q: "Why is a documented cleaning decision important?",
              options: [
                "It makes the notebook prettier",
                "It lets someone else understand and challenge how the data was changed",
                "It speeds up pandas",
                "It removes the need for charts",
              ],
              answer: 1,
              why: "Cleaning changes the meaning of the data, so the choices must be transparent.",
            },
            {
              q: "After cleaning, df_clean has 70 rows from 84. What should you report?",
              options: [
                "Nothing — just the final answer",
                "That 14 rows were removed and why",
                "That the file was corrupt",
                "That the data is perfect now",
              ],
              answer: 1,
              why: "Row drops affect totals and should be disclosed.",
            },
            {
              q: "Which of these is NOT a data quality problem?",
              options: ["Duplicate rows", "Missing prices", "Consistent category labels", "Outliers"],
              answer: 2,
              why: "Consistent labels are a sign of good data, not a problem.",
            },
            {
              q: "What does .str.strip() do?",
              options: [
                "Removes spaces from the start and end of text",
                "Deletes the column",
                "Converts text to numbers",
                "Removes duplicate characters",
              ],
              answer: 0,
              why: "strip() trims leading and trailing whitespace — useful before comparing categories.",
            },
          ],
        },
      ],
    },
  ],
};
