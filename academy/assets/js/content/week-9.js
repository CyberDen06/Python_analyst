export default {
  id: "week-9",
  number: 9,
  title: "Robust, Shareable Notebooks",
  tagline: "Code that does not break when the data changes",
  duration: "4 hours",
  client: {
    name: "Bright Steps Tutoring (monthly report)",
    brief:
      "We want one monthly report notebook that can be rerun on a new file every month without anyone editing the code. If a file is missing or a column is wrong, we want a clear message — not a broken report that looks finished.",
    question: "How do we make the report safe to rerun every month?",
  },
  objectives: [
    "Handle expected errors with try / except",
    "Use assertions as data contracts",
    "Read and write files reliably",
    "Document a notebook so someone else can rerun it",
    "Use a parameter cell instead of editing code",
  ],
  sections: [
    {
      id: "w9s1",
      title: "Errors are information",
      blocks: [
        {
          type: "text",
          md:
            "A missing file should not crash a monthly report halfway through. **try / except** lets you decide what happens: log a clear message, skip the report, or fall back to a default.\n\nThe \`except\` clause names the error you expect. Catch only what you can handle; do not swallow every error.",
        },
        {
          type: "code",
          id: "w9c1",
          title: "A safe file loader",
          rows: 16,
          code:
            "import pandas as pd\n\n" +
            "def safe_load(path):\n" +
            "    try:\n" +
            "        return pd.read_csv(path)\n" +
            "    except FileNotFoundError:\n" +
            '        print("Could not load file:", path)\n' +
            "        return None\n\n" +
            'df = safe_load("shop_sales.csv")\n' +
            'print("Good file rows:", None if df is None else len(df))\n\n' +
            'missing = safe_load("does_not_exist.csv")\n' +
            'print("Missing file result:", missing)',
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Return None, do not guess.** If the data cannot be loaded, the caller must know. Returning an empty DataFrame can silently produce a zero-revenue report that looks plausible.",
        },
        {
          type: "exercise",
          id: "w9e1",
          title: "Write safe_load",
          prompt:
            "Define \`safe_load(path)\` that:\n\n- tries to read the CSV at \`path\` with pandas and returns the DataFrame\n- catches \`FileNotFoundError\`, prints a clear message, and returns \`None\`\n\nTest it on \`shop_sales.csv\` and on a file that does not exist.",
          starter:
            "import pandas as pd\n\n" +
            "def safe_load(path):\n" +
            "    # try to read, catch FileNotFoundError\n" +
            "    pass\n\n" +
            "print(safe_load(\"shop_sales.csv\"))\n" +
            "print(safe_load(\"no_such_file.csv\"))\n",
          hints: [
            "Wrap pd.read_csv(path) in try: and put the except FileNotFoundError: after it.",
            "Return the DataFrame from the try block.",
            "In the except block, print a message and return None.",
          ],
          solution:
            "import pandas as pd\n\n" +
            "def safe_load(path):\n" +
            "    try:\n" +
            "        return pd.read_csv(path)\n" +
            "    except FileNotFoundError:\n" +
            '        print("Could not load file:", path)\n' +
            "        return None\n\n" +
            "print(safe_load(\"shop_sales.csv\"))\n" +
            "print(safe_load(\"no_such_file.csv\"))",
          checks:
            'import pandas as pd\n' +
            'expect_defined("safe_load")\n' +
            'expect(callable(safe_load), "safe_load should be a function.")\n' +
            '_good = safe_load("shop_sales.csv")\n' +
            'expect(isinstance(_good, pd.DataFrame) and len(_good) == 96, "safe_load(\\"shop_sales.csv\\") should return the 96-row DataFrame.")\n' +
            '_bad = safe_load("this_file_does_not_exist.csv")\n' +
            'expect(_bad is None, "For a missing file, safe_load should return None, not raise or return an empty table.")',
        },
        {
          type: "quiz",
          id: "w9q1",
          title: "Check: error handling",
          questions: [
            {
              q: "What comes after try: in a try/except block?",
              options: ["except SomeError:", "else:", "finally:", "catch:"],
              answer: 0,
              why: "Python names the expected error in an except clause.",
            },
            {
              q: "Why catch FileNotFoundError specifically instead of every error?",
              options: [
                "Catching everything can hide bugs you need to see",
                "Specific errors run faster",
                "It changes the return type",
                "pandas requires it",
              ],
              answer: 0,
              why: "Broad catches mask real problems and make debugging harder.",
            },
            {
              q: "What should a loader return when the file is missing?",
              options: [
                "None, with a clear message",
                "An empty DataFrame that looks valid",
                "0",
                "The last file it read",
              ],
              answer: 0,
              why: "Returning None forces the caller to handle the failure explicitly.",
            },
          ],
        },
      ],
    },
    {
      id: "w9s2",
      title: "Assertions: data contracts",
      blocks: [
        {
          type: "text",
          md:
            "An **assertion** states a rule that must be true. If it is false, Python raises \`AssertionError\` immediately. Put assertions at the start of an analysis: prices must be positive, the expected columns must exist, the file must have rows.",
        },
        {
          type: "code",
          id: "w9c2",
          title: "Assertions catch bad data early",
          rows: 14,
          code:
            "import pandas as pd\n\n" +
            'prices = pd.Series([12500, 28000, 15000])\n\n' +
            'assert "unit_price" not in prices.name if prices.name else True\n' +
            'assert (prices > 0).all(), "Every price must be positive"\n' +
            'print("Price checks passed")\n\n' +
            'bad = pd.Series([12500, -5, 15000])\n' +
            'assert (bad > 0).all(), "Every price must be positive"\n',
        },
        {
          type: "callout",
          variant: "note",
          md:
            "A good assertion message tells the next analyst **what rule broke** — \"Every price must be positive\" is far more useful than no message at all.",
        },
        {
          type: "exercise",
          id: "w9e2",
          title: "Validate a price column",
          prompt:
            "Define \`validate_prices(df)\` that:\n\n1. Asserts \`unit_price\` is a column in df\n2. Asserts every \`unit_price\` value is greater than 0\n\nIf both pass, the function returns quietly (return True or nothing). If a rule fails, it must raise \`AssertionError\` with a helpful message.",
          starter:
            "def validate_prices(df):\n" +
            "    # assert the column exists\n" +
            "    # assert all prices > 0\n" +
            "    pass\n\n" +
            "import pandas as pd\n" +
            "validate_prices(pd.DataFrame({\"unit_price\": [1, 2, 3]}))\n" +
            "print(\"valid table accepted\")\n",
          hints: [
            "Check the column first: assert \"unit_price\" in df.columns, \"…\"",
            "Then: assert (df[\"unit_price\"] > 0).all(), \"Every price must be positive\"",
            "Use assert, not if/raise, so the error type is AssertionError.",
          ],
          solution:
            "def validate_prices(df):\n" +
            '    assert "unit_price" in df.columns, "unit_price column is missing"\n' +
            '    assert (df["unit_price"] > 0).all(), "Every price must be positive"\n' +
            "    return True",
          checks:
            "import pandas as pd\n" +
            'expect_defined("validate_prices")\n' +
            "_good = pd.DataFrame({\"unit_price\": [1.0, 2.0, 3.0]})\n" +
            "try:\n" +
            "    validate_prices(_good)\n" +
            "except Exception as _e:\n" +
            '    raise CheckFailure("Valid prices should be accepted, but validate_prices raised: " + str(_e))\n' +
            "_bad = pd.DataFrame({\"unit_price\": [1.0, -2.0, 3.0]})\n" +
            "_raised = False\n" +
            "try:\n" +
            "    validate_prices(_bad)\n" +
            "except AssertionError:\n" +
            "    _raised = True\n" +
            "except Exception as _e:\n" +
            '    raise CheckFailure("Use assert so a negative price raises AssertionError. Got: " + type(_e).__name__)\n' +
            'expect(_raised, "validate_prices should raise AssertionError when a price is not positive.")\n' +
            "_missing = pd.DataFrame({\"price\": [1.0, 2.0]})\n" +
            "_raised2 = False\n" +
            "try:\n" +
            "    validate_prices(_missing)\n" +
            "except AssertionError:\n" +
            "    _raised2 = True\n" +
            'expect(_raised2, "validate_prices should raise AssertionError when unit_price is missing.")',
        },
      ],
    },
    {
      id: "w9s3",
      title: "Parameterize, document, rerun",
      blocks: [
        {
          type: "text",
          md:
            "A monthly report should not require code edits. Put the things that change — month, input file, output name — in a **parameter cell** at the top. Everything below reads those values.",
        },
        {
          type: "code",
          id: "w9c3",
          title: "One parameter cell at the top",
          rows: 10,
          code:
            'REPORT_MONTH = "2026-03"          # change this each month\nINPUT_FILE = "shop_sales.csv"\n\n' +
            "import pandas as pd\n\n" +
            'sales = pd.read_csv(INPUT_FILE)\n' +
            'sales["order_date"] = pd.to_datetime(sales["order_date"], errors="coerce")\n' +
            'sales["month"] = sales["order_date"].dt.to_period("M").astype(str)\n' +
            "this_month = sales[sales[\"month\"] == REPORT_MONTH]\n\n" +
            'print("Rows in", REPORT_MONTH + ":", len(this_month))\n' +
            'this_month[["order_id", "product", "region", "unit_price"]].head()',
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Before you share a notebook:** restart the kernel and run every cell from top to bottom. If the result changes or a cell fails, the notebook was relying on hidden state.",
        },
        {
          type: "notes",
          id: "w9n1",
          prompt:
            "Write the \"How to rerun this report\" section you would put at the top of the notebook: the parameter to change, the expected input columns, and what the output should look like.",
          placeholder:
            "To rerun: change REPORT_MONTH to … . The input must contain the columns … . The notebook produces … .",
        },
        {
          type: "quiz",
          id: "w9q2",
          title: "Exit ticket",
          questions: [
            {
              q: "Why put the month and file name in a parameter cell?",
              options: [
                "So the report can be rerun without editing analysis code",
                "Because variables cannot be long",
                "To make the notebook shorter",
                "pandas requires it",
              ],
              answer: 0,
              why: "Parameters separate 'what changes' from 'how the analysis works'.",
            },
            {
              q: "What does assert (df[\"price\"] > 0).all() do?",
              options: [
                "Raises AssertionError if any price is not positive",
                "Deletes negative prices",
                "Prints the prices",
                "Converts prices to text",
              ],
              answer: 0,
              why: "The assertion enforces the rule; a False result stops the notebook.",
            },
            {
              q: "What is the 'rerun from top to bottom' test for?",
              options: [
                "Checking that the notebook does not depend on hidden state",
                "Making charts prettier",
                "Testing the internet connection",
                "Cleaning the data",
              ],
              answer: 0,
              why: "A fresh run reproduces the result only if cells are self-consistent.",
            },
            {
              q: "A file the notebook needs is missing. Best behavior?",
              options: [
                "Catch the specific error, log it clearly, and stop or return None",
                "Ignore it and continue with an empty table",
                "Delete the notebook",
                "Print a random number",
              ],
              answer: 0,
              why: "Fail visibly and specifically; never let a broken report look successful.",
            },
            {
              q: "Which document should every shared notebook include?",
              options: [
                "Purpose, inputs, assumptions, and how to rerun it",
                "Only the code cells",
                "All raw data pasted inside",
                "A list of every library version only",
              ],
              answer: 0,
              why: "A reader needs to know what it does and what it expects before running it.",
            },
          ],
        },
      ],
    },
  ],
};
