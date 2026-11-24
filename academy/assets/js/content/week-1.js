export default {
  id: "week-1",
  number: 1,
  title: "Python Basics: Types, Variables, Keywords",
  tagline: "Your first real code, on real phone-price data",
  duration: "4 hours",
  client: {
    name: "PhoneHub Lagos",
    brief:
      "We sell smartphones online from Lagos. Customers compare us with Jumia, Konga, and a few other stores before they buy. We want to know how popular models are priced across those stores, and whether competitors have them in stock. We want a clear list we can check every week.",
    question:
      "How are popular smartphones priced across Lagos marketplaces, and which models are in stock?",
  },
  objectives: [
    "Identify Python types: str, int, float, bool, None, list, dict, tuple",
    "Create, name, and reassign variables",
    "Check a value's type with type() and convert values",
    "Explain what a keyword is and avoid using one as a name",
    "Describe a dataset row with variables and an f-string",
  ],
  sections: [
    {
      id: "w1s1",
      title: "Values have types",
      blocks: [
        {
          type: "text",
          md:
            "Every value in Python has a **type**. The type decides what you can do with the value: you can add two numbers, but adding a number to a name makes no sense.\n\nThe dataset for this week, \`lagos_phones.csv\`, is already loaded in your Python workspace. A CSV is a plain-text table: each line is a row, commas separate the columns.",
        },
        {
          type: "table",
          headers: ["Type", "Python name", "What it holds", "Example from the phone data"],
          rows: [
            ["String", "str", "Text, written in quotes", "\"Tecno Spark 20\""],
            ["Integer", "int", "A whole number", "128 (storage_gb)"],
            ["Float", "float", "A number with a decimal point", "4.3 (average_rating)"],
            ["Boolean", "bool", "True or False", "True (in_stock)"],
            ["None", "NoneType", "The absence of a value", "A blank cell with no rating"],
          ],
        },
        {
          type: "table",
          headers: ["Collection", "Written with", "What it holds", "Example"],
          rows: [
            ["List", "[ ]", "An ordered, changeable group", "[\"Jumia\", \"Konga\", \"Slot\"]"],
            ["Dictionary", "{ }", "Pairs of a key and a value", "{\"brand\": \"Tecno\", \"price_ngn\": 185000}"],
            ["Tuple", "( )", "An ordered group that cannot change", "(128, 4)"],
          ],
        },
        {
          type: "code",
          id: "w1c1",
          title: "Type along: five values and their types",
          rows: 12,
          code:
            'product_name = "Tecno Spark 20"\n' +
            "storage_gb = 128\n" +
            "average_rating = 4.3\n" +
            "in_stock = True\n" +
            "discount_code = None\n\n" +
            "print(type(product_name))\n" +
            "print(type(storage_gb))\n" +
            "print(type(average_rating))\n" +
            "print(type(in_stock))\n" +
            "print(type(discount_code))",
        },
        {
          type: "callout",
          variant: "tip",
          md:
            "**Read the output out loud:** \`<class 'str'>\` means \"this value is a string\". The word after the dot is the type name you will use when we convert values later.",
        },
        {
          type: "code",
          id: "w1c2",
          title: "What each type lets you do",
          rows: 12,
          code:
            "price_ngn = 185000\n" +
            "delivery_fee_ngn = 3500\n" +
            'print(price_ngn + delivery_fee_ngn)      # numbers add\n\n' +
            'brand = "Tecno"\n' +
            'model = "Spark 20"\n' +
            'print(brand + " " + model)               # strings join\n' +
            "print(brand * 3)                         # strings repeat\n\n" +
            '# print(price_ngn + brand)               # uncomment to see a TypeError',
        },
        {
          type: "exercise",
          id: "w1e1",
          title: "Describe one phone listing",
          prompt:
            "Create variables for one phone listing. Use these names exactly:\n\n- \`product_name\` — a string\n- \`price_ngn\` — a whole number (int), greater than 0\n- \`rating\` — a decimal number (float)\n- \`in_stock\` — True or False\n- \`retailers\` — a list of at least 3 retailer names\n- \`specs\` — a tuple with 2 numbers, e.g. (storage_gb, ram_gb)\n- \`listing\` — a dictionary with at least the keys \`brand\` and \`price_ngn\`\n\nThen print \`listing\` to see it.",
          starter:
            "# Create the seven variables below.\n" +
            "# product_name = ...  (a string, in quotes)\n" +
            "# price_ngn = ...     (a whole number, no quotes)\n" +
            "# rating = ...        (a decimal number)\n" +
            "# in_stock = ...      (True or False, no quotes)\n" +
            "# retailers = ...     (a list)\n" +
            "# specs = ...         (a tuple)\n" +
            "# listing = ...       (a dictionary)\n\n" +
            "# print(listing)\n",
          hints: [
            "Strings need quotes: \"Infinix Hot 40i\". A number without quotes is already a number.",
            "A list uses square brackets: [\"Jumia\", \"Konga\", \"Slot\"]. A tuple uses parentheses: (128, 4).",
            "A dictionary uses curly braces with key: value pairs: {\"brand\": \"Infinix\", \"price_ngn\": 112000}.",
          ],
          solution:
            'product_name = "Infinix Hot 40i"\n' +
            "price_ngn = 112000\n" +
            "rating = 4.3\n" +
            "in_stock = True\n" +
            'retailers = ["Jumia", "Konga", "Slot"]\n' +
            "specs = (128, 4)\n" +
            'listing = {"brand": "Infinix", "price_ngn": price_ngn, "in_stock": in_stock}\n\n' +
            "print(listing)",
          checks:
            'expect_defined("product_name", "price_ngn", "rating", "in_stock", "retailers", "specs", "listing")\n' +
            'expect(isinstance(product_name, str) and product_name.strip() != "", "product_name should be a non-empty string.")\n' +
            'expect(isinstance(price_ngn, int) and not isinstance(price_ngn, bool), "price_ngn should be an int — a whole number with no quotes.")\n' +
            "expect(price_ngn > 0, \"price_ngn should be greater than 0.\")\n" +
            'expect(isinstance(rating, float), "rating should be a float, like 4.3.")\n' +
            'expect(isinstance(in_stock, bool), "in_stock should be True or False — no quotes.")\n' +
            'expect(isinstance(retailers, list) and len(retailers) >= 3, "retailers should be a list with at least 3 names.")\n' +
            'expect(isinstance(specs, tuple) and len(specs) == 2, "specs should be a tuple with two numbers, like (128, 4).")\n' +
            'expect(isinstance(listing, dict) and "brand" in listing and "price_ngn" in listing, "listing should be a dict with keys brand and price_ngn.")',
        },
        {
          type: "quiz",
          id: "w1q1",
          title: "Check: values and types",
          questions: [
            {
              q: "What is the type of the value 4.3?",
              options: ["str", "int", "float", "bool"],
              answer: 2,
              why: "A number with a decimal point is a float.",
            },
            {
              q: "What is the type of \"4.3\"?",
              options: ["str", "int", "float", "bool"],
              answer: 0,
              why: "It is in quotes, so Python treats it as text — a string.",
            },
            {
              q: "Which value is a boolean?",
              options: ["\"True\"", "1", "True", "None"],
              answer: 2,
              why: "True without quotes is a boolean. \"True\" with quotes is a string.",
            },
            {
              q: "Which collection uses curly braces with key: value pairs?",
              options: ["list", "tuple", "dict", "str"],
              answer: 2,
              why: "A dictionary maps keys to values, e.g. {\"brand\": \"Tecno\"}.",
            },
            {
              q: "What does type(\"128\") print?",
              options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "128"],
              answer: 1,
              why: "Quotes make it text, so it is a str — even though it looks like a number.",
            },
          ],
        },
      ],
    },
    {
      id: "w1s2",
      title: "Variables: names that stick",
      blocks: [
        {
          type: "text",
          md:
            "A **variable** is a name attached to a value so you can use the value later. The equals sign means **\"store this value under this name\"**. It does not mean \"equals\" in the maths sense.",
        },
        {
          type: "code",
          id: "w1c3",
          title: "Create, reuse, reassign",
          rows: 14,
          code:
            "price_ngn = 185000\n" +
            "print(price_ngn)\n\n" +
            "price_ngn = 172000          # reassign: the name now points to a new value\n" +
            "print(price_ngn)\n\n" +
            "discount_ngn = 10000\n" +
            "final_price_ngn = price_ngn - discount_ngn\n" +
            "print(final_price_ngn)\n\n" +
            "review_count = 120\n" +
            "review_count += 5           # shorthand for review_count = review_count + 5\n" +
            "print(review_count)",
        },
        {
          type: "table",
          headers: ["Rule", "Valid", "Invalid"],
          rows: [
            ["Start with a letter or underscore", "price_ngn, _temp", "2nd_listing"],
            ["Only letters, numbers, underscores", "ram_gb4", "ram-gb, ram gb"],
            ["Cannot be a keyword", "phone_class", "class"],
            ["Case matters", "Price and price are different", "Price used where price was created"],
          ],
        },
        {
          type: "table",
          headers: ["Good habit", "Good", "Poor"],
          rows: [
            ["snake_case (lowercase + underscores)", "delivery_days", "DeliveryDays"],
            ["Descriptive, not cryptic", "price_ngn", "p"],
            ["Include the unit", "price_ngn, storage_gb", "price, storage"],
            ["Plural name for collections", "retailers", "retailer"],
          ],
        },
        {
          type: "exercise",
          id: "w1e2",
          title: "Create clean, well-named variables",
          prompt:
            "Create these variables with **exactly** these names and values:\n\n- \`brand\` = \"Tecno\" (string)\n- \`storage_gb\` = 128 (int)\n- \`delivery_days\` = 3 (int)\n- \`is_5g\` = False (boolean)\n- \`order_count\` = 125 — start with nothing, set it to 120, then increase it by 5 using \`+=\`\n\nPrint each value.",
          starter:
            "# Write the five variables.\n" +
            "# Notice: no spaces, no hyphens, no keywords.\n\n" +
            "# brand = ...\n" +
            "# storage_gb = ...\n" +
            "# delivery_days = ...\n" +
            "# is_5g = ...\n\n" +
            "# order_count = 120\n" +
            "# order_count += ...\n",
          hints: [
            "A boolean is written True or False, without quotes.",
            "The shorthand += adds to the existing value: order_count += 5.",
            "Names are case-sensitive: is_5g and Is_5G are different names.",
          ],
          solution:
            'brand = "Tecno"\n' +
            "storage_gb = 128\n" +
            "delivery_days = 3\n" +
            "is_5g = False\n\n" +
            "order_count = 120\n" +
            "order_count += 5\n\n" +
            "print(brand, storage_gb, delivery_days, is_5g, order_count)",
          checks:
            'expect_defined("brand", "storage_gb", "delivery_days", "is_5g", "order_count")\n' +
            'expect(brand == "Tecno", "brand should be the string \\"Tecno\\".")\n' +
            'expect(isinstance(storage_gb, int) and not isinstance(storage_gb, bool) and storage_gb == 128, "storage_gb should be the int 128.")\n' +
            'expect(isinstance(delivery_days, int) and delivery_days == 3, "delivery_days should be the int 3.")\n' +
            'expect(isinstance(is_5g, bool) and is_5g is False, "is_5g should be False — a boolean, no quotes.")\n' +
            'expect(order_count == 125, "order_count should end at 125. Start at 120 and add 5.")',
        },
        {
          type: "quiz",
          id: "w1q2",
          title: "Check: variables and names",
          questions: [
            {
              q: "What does price_ngn = 185000 do?",
              options: [
                "Checks whether price_ngn equals 185000",
                "Stores the value 185000 under the name price_ngn",
                "Prints 185000",
                "Creates a list",
              ],
              answer: 1,
              why: "The equals sign assigns a value to a name. Comparison uses == instead.",
            },
            {
              q: "Which variable name is invalid?",
              options: ["price_ngn", "2nd_listing", "_cache", "in_stock"],
              answer: 1,
              why: "A name cannot start with a number.",
            },
            {
              q: "Which name is invalid because it is a keyword?",
              options: ["phone_class", "for", "for_sale", "class_name"],
              answer: 1,
              why: "for is reserved by Python for loops, so it cannot be a variable name.",
            },
            {
              q: "review_count = 120, then review_count += 5. What is the value now?",
              options: ["120", "5", "125", "1205"],
              answer: 2,
              why: "+= adds 5 to the existing value: 120 + 5 = 125.",
            },
            {
              q: "Which name follows the units habit best?",
              options: ["price", "p", "price_ngn", "PriceNGN"],
              answer: 2,
              why: "price_ngn is snake_case and states the unit (naira).",
            },
          ],
        },
      ],
    },
    {
      id: "w1s3",
      title: "Collections: lists, dictionaries, tuples",
      blocks: [
        {
          type: "text",
          md:
            "Real data is rarely one value at a time. A list holds an ordered group, a dictionary holds named pairs, and a tuple holds a fixed group. You will meet all three in pandas later.",
        },
        {
          type: "code",
          id: "w1c4",
          title: "Index into a list, a dict, and a tuple",
          rows: 12,
          code:
            'retailers = ["Jumia", "Konga", "Slot"]\n' +
            'listing = {"brand": "Tecno", "price_ngn": 185000, "in_stock": True}\n' +
            "specs = (128, 4)\n\n" +
            "print(retailers[0])       # first item: counting starts at 0\n" +
            'print(listing["price_ngn"])  # look up by key\n' +
            "print(specs[1])           # second item",
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**Indexes start at 0.** \`retailers[0]\` is the first retailer, \`retailers[1]\` is the second. This trips up almost everyone once.",
        },
        {
          type: "exercise",
          id: "w1e3",
          title: "Pull values out of a collection",
          prompt:
            "Build on the three collections, then extract values:\n\n- \`retailers\` — a list of at least 3 names\n- \`listing\` — a dict with keys \`brand\` and \`price_ngn\`\n- \`specs\` — a tuple of 2 numbers\n- \`first_retailer\` — the first item of \`retailers\`\n- \`listing_price\` — the value stored at key \`price_ngn\`\n- \`ram_gb\` — the second item of \`specs\`",
          starter:
            'retailers = ["Jumia", "Konga", "Slot"]\n' +
            'listing = {"brand": "Tecno", "price_ngn": 185000, "in_stock": True}\n' +
            "specs = (128, 4)\n\n" +
            "# first_retailer = ...\n" +
            "# listing_price = ...\n" +
            "# ram_gb = ...\n\n" +
            "# print(first_retailer, listing_price, ram_gb)\n",
          hints: [
            "A list index goes in square brackets: retailers[0].",
            "A dictionary value is looked up by key: listing[\"price_ngn\"].",
            "The second tuple item is at index 1: specs[1].",
          ],
          solution:
            'retailers = ["Jumia", "Konga", "Slot"]\n' +
            'listing = {"brand": "Tecno", "price_ngn": 185000, "in_stock": True}\n' +
            "specs = (128, 4)\n\n" +
            "first_retailer = retailers[0]\n" +
            'listing_price = listing["price_ngn"]\n' +
            "ram_gb = specs[1]\n\n" +
            "print(first_retailer, listing_price, ram_gb)",
          checks:
            'expect_defined("retailers", "listing", "specs", "first_retailer", "listing_price", "ram_gb")\n' +
            'expect(isinstance(retailers, list) and len(retailers) >= 3, "retailers should be a list with at least 3 names.")\n' +
            'expect(first_retailer == retailers[0], "first_retailer should be retailers[0].")\n' +
            'expect(isinstance(listing, dict) and "price_ngn" in listing, "listing should be a dict with a price_ngn key.")\n' +
            'expect(listing_price == listing["price_ngn"], "listing_price should be listing[\\"price_ngn\\"].")\n' +
            'expect(isinstance(specs, tuple) and len(specs) == 2, "specs should be a tuple of 2 numbers.")\n' +
            'expect(ram_gb == specs[1], "ram_gb should be specs[1] — the second tuple item.")',
        },
        {
          type: "quiz",
          id: "w1q3",
          title: "Check: collections",
          questions: [
            {
              q: "retailers = [\"Jumia\", \"Konga\", \"Slot\"]. What is retailers[0]?",
              options: ["\"Konga\"", "\"Jumia\"", "\"Slot\"", "0"],
              answer: 1,
              why: "Indexes start at 0, so retailers[0] is the first item: Jumia.",
            },
            {
              q: "How do you read the price from listing = {\"brand\": \"Tecno\", \"price_ngn\": 185000}?",
              options: ["listing[0]", "listing(\"price_ngn\")", "listing[\"price_ngn\"]", "listing.price_ngn[0]"],
              answer: 2,
              why: "A dictionary is read by key, in square brackets.",
            },
            {
              q: "What is the main difference between a list and a tuple?",
              options: [
                "A tuple cannot be changed after creation",
                "A list cannot hold numbers",
                "A tuple uses square brackets",
                "They are identical",
              ],
              answer: 0,
              why: "Tuples are fixed (immutable); lists can be changed.",
            },
            {
              q: "Which value is a list?",
              options: ["(128, 4)", "{\"a\": 1}", "[\"Jumia\", \"Konga\"]", "\"Jumia\""],
              answer: 2,
              why: "Square brackets create a list.",
            },
          ],
        },
      ],
    },
    {
      id: "w1s4",
      title: "f-strings: client-ready sentences",
      blocks: [
        {
          type: "text",
          md:
            "An **f-string** is a string with an \`f\` in front. Anything inside curly braces is replaced by the variable's value. This is how you turn variables into a sentence a client can read.",
        },
        {
          type: "code",
          id: "w1c5",
          title: "Format numbers inside a sentence",
          rows: 11,
          code:
            'product_name = "Tecno Spark 20"\n' +
            'retailer = "Jumia"\n' +
            "price_ngn = 185000\n" +
            "average_rating = 4.3\n" +
            "in_stock = True\n\n" +
            'print(f"{product_name} is listed on {retailer} for {price_ngn:,} naira, rated {average_rating}, in stock: {in_stock}.")\n' +
            'print(f"Rating: {average_rating:.1f} out of 5")',
        },
        {
          type: "table",
          headers: ["Formatting", "Meaning", "Output for 185000 / 4.3"],
          rows: [
            ["{price_ngn:,}", "Add a comma every three digits", "185,000"],
            ["{average_rating:.1f}", "One digit after the decimal point", "4.3"],
            ["{in_stock}", "Insert the value as text", "True"],
          ],
        },
        {
          type: "exercise",
          id: "w1e4",
          title: "Write the client-ready sentence",
          prompt:
            "The variables below are already created. Build a string called \`sentence\` with an f-string. It must contain:\n\n- the product name\n- the price **with a comma**: 112,000\n- the rating **to one decimal place**: 4.3\n- the stock value: True\n\nAim for a sentence a client can read without any other context.",
          starter:
            'product_name = "Infinix Hot 40i"\n' +
            "price_ngn = 112000\n" +
            "average_rating = 4.3\n" +
            "in_stock = True\n\n" +
            "sentence = \n\n" +
            "# print(sentence)\n",
          hints: [
            "Start the string with f: f\"{product_name} ...\"",
            "Format the price with :, → {price_ngn:,}",
            "Format the rating with :.1f → {average_rating:.1f}",
          ],
          solution:
            'product_name = "Infinix Hot 40i"\n' +
            "price_ngn = 112000\n" +
            "average_rating = 4.3\n" +
            "in_stock = True\n\n" +
            'sentence = f"{product_name} costs {price_ngn:,} naira, is rated {average_rating:.1f}, and in stock: {in_stock}."\n\n' +
            "print(sentence)",
          checks:
            'expect_defined("sentence", "product_name", "price_ngn")\n' +
            'expect(isinstance(sentence, str), "sentence should be a string.")\n' +
            'expect(len(sentence) > 30, "Make the sentence longer and more complete.")\n' +
            'expect(product_name in sentence, "The sentence should include the product name.")\n' +
            'expect("112,000" in sentence, "Format the price with a comma: use {price_ngn:,}.")\n' +
            'expect("4.3" in sentence, "The rating should appear as 4.3 — use {average_rating:.1f}.")\n' +
            'expect("True" in sentence, "Include the stock value in the sentence.")',
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Common errors you will meet:**\n\n- \`NameError: name 'price' is not defined\` — the name was never created, or it is misspelled or has different capitals.\n- \`SyntaxError\` — an invalid variable name, a missing quote, or a missing parenthesis.\n- \`TypeError\` — you tried to combine incompatible types, such as a number plus a string.",
        },
        {
          type: "quiz",
          id: "w1q4",
          title: "Exit ticket",
          questions: [
            {
              q: "What does f\"{price_ngn:,} naira\" print when price_ngn is 185000?",
              options: ["{185000} naira", "185000 naira", "185,000 naira", "185.000 naira"],
              answer: 2,
              why: "The comma format adds separators every three digits.",
            },
            {
              q: "What is a keyword?",
              options: [
                "Any long variable name",
                "A word Python reserves for its own use",
                "A word in quotes",
                "A number Python calculated",
              ],
              answer: 1,
              why: "Keywords such as if, for, and class have special meaning and cannot be used as names.",
            },
            {
              q: "Why is class = \"Tecno\" an error?",
              options: [
                "class is a keyword",
                "class is too short",
                "Tecno should be lowercase",
                "Strings cannot be assigned",
              ],
              answer: 0,
              why: "class is reserved for defining Python classes, so it cannot be a variable name.",
            },
            {
              q: "Which line correctly describes one listing using an f-string?",
              options: [
                "print(\"f{product_name} costs {price_ngn}\")",
                "print(f\"{product_name} costs {price_ngn:,} naira\")",
                "print(f\"product_name costs price_ngn naira\")",
                "print(\"{product_name} costs {price_ngn}\")",
              ],
              answer: 1,
              why: "The f must come before the opening quote, and braces insert values.",
            },
            {
              q: "What is the type of the value True?",
              options: ["str", "int", "bool", "NoneType"],
              answer: 2,
              why: "True and False are booleans.",
            },
          ],
        },
      ],
    },
  ],
};
