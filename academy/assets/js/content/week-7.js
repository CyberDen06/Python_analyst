export default {
  id: "week-7",
  number: 7,
  title: "Making Choices and Repeating Actions",
  tagline: "Write logic that adapts to the data",
  duration: "4 hours",
  client: {
    name: "PhoneHub Lagos (weekly watch)",
    brief:
      "We want a weekly alert: whenever a competitor's listing changes price by more than 5 percent, or goes out of stock, we want it flagged. We also want each phone sorted into a price tier so the weekly list is easy to scan.",
    question: "Which listings need our attention this week, and how should we bucket them?",
  },
  objectives: [
    "Write if / elif / else decisions",
    "Combine conditions with and, or, and not",
    "Loop over a list of values",
    "Write a function with def and return",
    "Apply a function to a table",
    "Decide when to loop and when to let pandas do the work",
  ],
  sections: [
    {
      id: "w7s1",
      title: "Decisions with if, elif, else",
      blocks: [
        {
          type: "text",
          md:
            "An \`if\` statement runs code only when a condition is true. Conditions produce booleans: \`price > 30000\` is either True or False. \`elif\` checks a second condition only when the first was false; \`else\` catches everything left over.\n\nOrder matters. Python stops at the first true branch, so check the most specific condition first.",
        },
        {
          type: "code",
          id: "w7c1",
          title: "Bucket prices into tiers",
          rows: 16,
          code:
            "def price_tier(price_ngn):\n" +
            "    if price_ngn < 15000:\n" +
            '        return "budget"\n' +
            "    elif price_ngn < 30000:\n" +
            '        return "mid"\n' +
            "    else:\n" +
            '        return "premium"\n\n' +
            "for price in [8000, 12500, 28000, 42000]:\n" +
            "    print(price, \"→\", price_tier(price))",
        },
        {
          type: "table",
          headers: ["Comparison", "Meaning"],
          rows: [
            ["==", "Equal to (not the same as =)"],
            ["!=", "Not equal to"],
            [">, >=", "Greater than, greater than or equal"],
            ["<, <=", "Less than, less than or equal"],
            ["and", "Both conditions must be true"],
            ["or", "At least one condition must be true"],
            ["not", "Reverses True/False"],
          ],
        },
        {
          type: "exercise",
          id: "w7e1",
          title: "Write the price tier function",
          prompt:
            "Define a function \`price_tier(price_ngn)\` that returns:\n\n- \`\"budget\"\` when the price is **below 15,000**\n- \`\"mid\"\` when the price is **15,000 up to but not including 30,000**\n- \`\"premium\"\` when the price is **30,000 or more**\n\nCheck the boundaries: 15000 must return \"mid\" and 30000 must return \"premium\".",
          starter:
            "def price_tier(price_ngn):\n" +
            "    # your if / elif / else here\n" +
            "    pass\n\n" +
            "for p in [10000, 15000, 29999, 30000, 50000]:\n" +
            "    print(p, price_tier(p))\n",
          hints: [
            "First branch: if price_ngn < 15000: return \"budget\".",
            "Second branch: elif price_ngn < 30000: return \"mid\".",
            "Everything else is premium; use else.",
          ],
          solution:
            "def price_tier(price_ngn):\n" +
            "    if price_ngn < 15000:\n" +
            '        return "budget"\n' +
            "    elif price_ngn < 30000:\n" +
            '        return "mid"\n' +
            "    else:\n" +
            '        return "premium"\n\n' +
            "for p in [10000, 15000, 29999, 30000, 50000]:\n" +
            "    print(p, price_tier(p))",
          checks:
            'expect_defined("price_tier")\n' +
            'expect(callable(price_tier), "price_tier should be a function.")\n' +
            '_cases = [(10000, "budget"), (14999, "budget"), (15000, "mid"), (29999, "mid"), (30000, "premium"), (50000, "premium")]\n' +
            "for _value, _wanted in _cases:\n" +
            "    _got = price_tier(_value)\n" +
            '    expect(_got == _wanted, "price_tier(" + str(_value) + ") should return \\"" + _wanted + "\\", but returned " + str(_got) + ".")',
        },
        {
          type: "quiz",
          id: "w7q1",
          title: "Check: decisions",
          questions: [
            {
              q: "What does elif mean?",
              options: [
                "Run this branch only if the previous conditions were false",
                "Run this branch always",
                "End the program",
                "Repeat the previous branch",
              ],
              answer: 0,
              why: "elif is a second condition evaluated after the earlier branches fail.",
            },
            {
              q: "price = 15000 and the code says if price < 15000: budget; elif price < 30000: mid. Which tier?",
              options: ["budget", "mid", "premium", "No tier"],
              answer: 1,
              why: "15000 is not below 15000, so the first branch is skipped and the second applies.",
            },
            {
              q: "Which operator checks equality?",
              options: ["=", "==", "=>", "!="],
              answer: 1,
              why: "== compares; = assigns.",
            },
            {
              q: "Which condition means \"in stock AND on discount\"?",
              options: [
                "in_stock and has_discount",
                "in_stock or has_discount",
                "not in_stock",
                "in_stock == has_discount",
              ],
              answer: 0,
              why: "and requires both booleans to be true.",
            },
          ],
        },
      ],
    },
    {
      id: "w7s2",
      title: "Repeat with for loops",
      blocks: [
        {
          type: "text",
          md:
            "A \`for\` loop runs the same block once for each item in a collection. A **running total** is the classic pattern: start at zero, add each value, print the result at the end.",
        },
        {
          type: "code",
          id: "w7c2",
          title: "Running total",
          rows: 10,
          code:
            "prices = [12500, 28000, 15000, 42000]\n\n" +
            "total = 0\n" +
            "for price in prices:\n" +
            "    total += price\n" +
            "    print(\"Added\", price, \"→ running total\", total)\n\n" +
            'print("Final total:", total)',
        },
        {
          type: "code",
          id: "w7c3",
          title: "Count with a condition",
          rows: 10,
          code:
            "count_over_20000 = 0\n" +
            "for price in prices:\n" +
            "    if price > 20000:\n" +
            "        count_over_20000 += 1\n\n" +
            'print("Prices above 20,000:", count_over_20000)',
        },
        {
          type: "exercise",
          id: "w7e2",
          title: "Total and count in a loop",
          prompt:
            "Using the list \`prices = [12500, 28000, 15000, 42000]\` and a \`for\` loop, compute:\n\n- \`total\` — the sum of all prices\n- \`count_over_20000\` — how many prices are greater than 20,000\n\nBoth values must come from the loop, not from \`sum()\` or manual counting.",
          starter:
            "prices = [12500, 28000, 15000, 42000]\n\n" +
            "total = 0\n" +
            "count_over_20000 = 0\n\n" +
            "# for price in prices: ...\n\n" +
            "# print(total, count_over_20000)\n",
          hints: [
            "Add each price to total inside the loop: total += price.",
            "Put an if price > 20000 inside the loop and add 1 to the count when it is true.",
            "Keep the increments inside the loop body — indentation matters.",
          ],
          solution:
            "prices = [12500, 28000, 15000, 42000]\n\n" +
            "total = 0\n" +
            "count_over_20000 = 0\n\n" +
            "for price in prices:\n" +
            "    total += price\n" +
            "    if price > 20000:\n" +
            "        count_over_20000 += 1\n\n" +
            "print(total, count_over_20000)",
          checks:
            'expect_defined("total", "count_over_20000")\n' +
            'expect(total == 97500, "total should be the sum of all four prices (97,500).")\n' +
            'expect(count_over_20000 == 2, "count_over_20000 should count the prices above 20,000 (there are two).")',
        },
        {
          type: "quiz",
          id: "w7q2",
          title: "Check: loops",
          questions: [
            {
              q: "What does for price in prices: do?",
              options: [
                "Runs the loop body once for each item in prices",
                "Runs the loop once",
                "Sorts prices",
                "Creates a new list",
              ],
              answer: 0,
              why: "The loop variable takes each value in turn.",
            },
            {
              q: "Where must the line total += price be placed?",
              options: [
                "Inside the loop, indented under the for line",
                "Before the loop only",
                "After the loop",
                "On the same line as for",
              ],
              answer: 0,
              why: "Code that repeats with the loop must be indented inside it.",
            },
            {
              q: "What is a running total?",
              options: [
                "A variable that accumulates each new value",
                "The final print statement",
                "A list of all values",
                "A chart",
              ],
              answer: 0,
              why: "You start at zero and add values one by one.",
            },
            {
              q: "You need to compute a column of revenue for 100,000 rows. What is usually better than a Python loop?",
              options: [
                "A vectorized pandas column operation",
                "A longer loop",
                "Deleting rows",
                "A scatter plot",
              ],
              answer: 0,
              why: "pandas operations on whole columns are much faster and simpler than row loops.",
            },
          ],
        },
      ],
    },
    {
      id: "w7s3",
      title: "Functions you can reuse",
      blocks: [
        {
          type: "text",
          md:
            "A **function** takes inputs, does one job, and returns a result. Give it a clear name and document what it expects. Functions make analysis rules testable and reusable across files.",
        },
        {
          type: "code",
          id: "w7c4",
          title: "Apply a function to every row",
          rows: 12,
          code:
            "import pandas as pd\n\n" +
            'df = pd.read_csv("shop_sales.csv")\n\n' +
            "def line_total(row):\n" +
            '    return row["quantity"] * row["unit_price"]\n\n' +
            'df["revenue_ngn"] = df.apply(line_total, axis=1)\n' +
            'df[["quantity", "unit_price", "revenue_ngn"]].head()',
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**axis=1** means \"pass each row to the function\". The function receives one row at a time and returns one value. pandas then assembles those values into a new column.",
        },
        {
          type: "code",
          id: "w7c5",
          title: "The price-alert rule",
          rows: 15,
          code:
            "def price_alert(old_price, new_price, threshold=0.05):\n" +
            "    if old_price == 0:\n" +
            "        return False\n" +
            "    change = abs(new_price - old_price) / old_price\n" +
            "    return change > threshold\n\n" +
            "print(price_alert(100, 106))   # 6% change → True\n" +
            "print(price_alert(100, 104))   # 4% change → False\n" +
            "print(price_alert(100, 94))    # 6% drop   → True\n" +
            "print(price_alert(100, 95))    # exactly 5% → False",
        },
        {
          type: "exercise",
          id: "w7e3",
          title: "Write the alert function",
          prompt:
            "Define \`price_alert(old_price, new_price, threshold=0.05)\` that returns:\n\n- \`True\` when the absolute percentage change is **strictly greater** than the threshold\n- \`False\` otherwise\n- \`False\` when \`old_price\` is 0 (never divide by zero)\n\nThe percentage change is \`abs(new_price - old_price) / old_price\`.",
          starter:
            "def price_alert(old_price, new_price, threshold=0.05):\n" +
            "    # guard against old_price == 0\n" +
            "    # compute the change\n" +
            "    # return True or False\n" +
            "    pass\n\n" +
            "print(price_alert(100, 106))\n" +
            "print(price_alert(100, 104))\n",
          hints: [
            "Start with if old_price == 0: return False.",
            "change = abs(new_price - old_price) / old_price",
            "Return the boolean itself: return change > threshold.",
          ],
          solution:
            "def price_alert(old_price, new_price, threshold=0.05):\n" +
            "    if old_price == 0:\n" +
            "        return False\n" +
            "    change = abs(new_price - old_price) / old_price\n" +
            "    return change > threshold\n\n" +
            "print(price_alert(100, 106))\n" +
            "print(price_alert(100, 104))",
          checks:
            'expect_defined("price_alert")\n' +
            'expect(callable(price_alert), "price_alert should be a function.")\n' +
            'expect(price_alert(100, 106) is True, "A 6% rise should alert: True.")\n' +
            'expect(price_alert(100, 94) is True, "A 6% drop should alert: True.")\n' +
            'expect(price_alert(100, 104) is False, "A 4% change should not alert.")\n' +
            'expect(price_alert(100, 105) is False, "Exactly a 5% change should not alert — the threshold is strict.")\n' +
            'expect(price_alert(0, 500) is False, "When old_price is 0, return False instead of dividing by zero.")',
        },
        {
          type: "notes",
          id: "w7n1",
          prompt:
            "Translate the client's rule into plain logic: \"flag a listing when its price changes by more than 5 percent OR it goes out of stock.\" Write the conditions you would code, in words.",
          placeholder:
            "Calculate … . If … or …, set the flag to … . Edge case: …",
        },
        {
          type: "quiz",
          id: "w7q3",
          title: "Exit ticket",
          questions: [
            {
              q: "What are the three parts of a useful function?",
              options: [
                "A name, inputs, and a returned result",
                "A color, a title, and a legend",
                "A loop, a print, and a file",
                "A list, a dict, and a tuple",
              ],
              answer: 0,
              why: "A function has a clear name, takes inputs, and returns an output.",
            },
            {
              q: "What does df.apply(my_function, axis=1) do?",
              options: [
                "Calls the function once per row",
                "Calls the function once per column",
                "Sorts the DataFrame",
                "Deletes a column",
              ],
              answer: 0,
              why: "axis=1 applies the function across each row.",
            },
            {
              q: "Why guard against old_price == 0 before dividing?",
              options: [
                "Division by zero raises an error",
                "Zero is not a number",
                "It changes the sign",
                "pandas requires it",
              ],
              answer: 0,
              why: "Python raises ZeroDivisionError if you divide by zero.",
            },
            {
              q: "Which is better for adding a revenue column to 100,000 rows?",
              options: [
                "df[\"revenue\"] = df[\"quantity\"] * df[\"unit_price\"]",
                "A Python for loop over every row",
                "A scatter plot",
                "A pivot table",
              ],
              answer: 0,
              why: "Vectorized column arithmetic is faster and less error-prone than a row loop.",
            },
            {
              q: "A function returns True for a 6% change and False for 4%. What should it return for exactly 5%?",
              options: [
                "Depends on the rule; this lesson's rule says False because the threshold is strict",
                "Always True",
                "It should crash",
                "It should print a warning",
              ],
              answer: 0,
              why: "The rule says strictly greater than 5%, so exactly 5% is False.",
            },
          ],
        },
      ],
    },
  ],
};
