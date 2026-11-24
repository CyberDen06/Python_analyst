""" 
# Python Basics: Data Types, Variables, and Keywords

Brief: 
**Client:** An online phone retailer in Lagos tracking competitor smartphone prices
**Client Question:** How are popular smartphones priced across Lagos online marketplaces, and which models are in stock?
**Dataset:** Lagos smartphone listings (`lagos_phones.csv`)

## Learning Outcomes
By the end of this lesson, you'd be able to:
1. Identify the Python data type of a value: `str`, `int`, `float`, `bool`, `None`, `list`, `dict`, `tuple`
2. Create, name, and reassign variables
3. Follow the rules and conventions for naming variables
4. Check a type with `type()` and change a type with `int()`, `float()`, `str()`, `bool()`
5. Explain what a keyword is, list common ones, and avoid using them as variable names
6. Describe a row of a real dataset using variables and an f-string

---

## Client Brief 
> "We sell smartphones online from Lagos. Customers compare us with Jumia, Konga, and a few other stores before they buy. We want to know how popular models are priced across those stores, and whether competitors have them in stock. We want a clear list we can check every week." 

**Activity**
1. Underline the decision the client has to make
2. Write one sentence: "To help the client, I need to find out ______."
3. List 5 facts about each listing, and mark each as a word, a whole number, a decimal number, or a yes/no

**Model Answer:** "To help the client, I need to find out the price, rating, and stock status of popular smartphones across Lagos marketplaces."

---

## Dataset Build, Enrich, Monitor (15 min)

**Dataset Build Prompt**
> Build a dataset of 40 popular smartphones (Tecno Spark, Tecno Camon, Infinix Hot, Infinix Note, Samsung Galaxy A series, iPhone 13, iPhone 14, Redmi Note, itel, Nokia) listed on Jumia Nigeria, Konga, and Slot Nigeria. One row per product-retailer listing. Columns in snake_case: product_name, brand, retailer, price_ngn (number only), in_stock (true/false), product_url.

**Activity** Run the Build. Count the rows and columns. Pick one row for the lab.

**Dataset Enrich Prompt**
> For each listing, find: average_rating (number), review_count (number), storage_gb (number), ram_gb (number), has_discount (true/false), and delivery_days (number). Add a source_url column for each value. Leave blank if not found; do not guess.

**Activity (5 min):** Run the Enrich. Export as `lagos_phones.csv`. Spot-check one row against its source URL.

**Dataset Monitor Prompt**
> Monitor these product pages daily. Alert when price_ngn changes by more than 5 percent or when in_stock changes.

**Activity (3 min):** Write the client action for a price-drop alert and for an out-of-stock alert.

---

## Block 1: Data Types (15 min)

**Concept:** Every value in Python has a type. The type decides what you can do with the value. You can add two numbers, but you cannot add a number to a name.

### The Core Types

| Type | Name in Python | What It Holds | Example from the Phone Data |

| String | `str` | Text, written in quotes | `"Tecno Spark 20"` |
| Integer | `int` | A whole number | `128` (storage_gb) |
| Float | `float` | A number with a decimal | `4.3` (average_rating) |
| Boolean | `bool` | `True` or `False` | `True` (in_stock) |
| None | `NoneType` | The absence of a value | A blank cell, such as a missing rating |

### Collections

| Type | Written With | What It Holds | Example |
|------|--------------|---------------|---------|
| List | `[ ]` | An ordered, changeable group of values | `["Jumia", "Konga", "Slot"]` |
| Dictionary | `{ }` | Pairs of a key and a value | `{"brand": "Tecno", "price_ngn": 185000}` |
| Tuple | `( )` | An ordered group that cannot be changed | `(128, 4)` |

### Type Along

product_name = "Tecno Spark 20"
storage_gb = 128
average_rating = 4.3
in_stock = True
discount_code = None

print(type(product_name))
print(type(storage_gb))
print(type(average_rating))
print(type(in_stock))
print(type(discount_code))
```

**Collections:**

retailers = ["Jumia", "Konga", "Slot"]
listing = {"brand": "Tecno", "price_ngn": 185000, "in_stock": True}
specs = (128, 4)

print(type(retailers))
print(type(listing))
print(type(specs))

print(retailers[0])
print(listing["price_ngn"])
print(specs[1])
```

### What the Type Lets You Do

price_ngn = 185000
delivery_fee_ngn = 3500
print(price_ngn + delivery_fee_ngn)          # numbers add: 188500

brand = "Tecno"
model = "Spark 20"
print(brand + " " + model)                    # strings join: Tecno Spark 20
print(brand * 3)                              # strings repeat: TecnoTecnoTecno
```

**What fails:**
```python
print(price_ngn + brand)    # TypeError: you cannot add a number and a string
```

### Changing Types

| Function | Does | Example | Result |
|----------|------|---------|--------|
| `int()` | Makes a whole number | `int("128")` | `128` |
| `float()` | Makes a decimal number | `float("4.3")` | `4.3` |
| `str()` | Makes text | `str(185000)` | `"185000"` |
| `bool()` | Makes True or False | `bool(0)` | `False` |

**Real-World Note:** Data from the web often arrives as text, even when it looks like a number ("N185,000"). Converting it to a number is the first step of cleaning

price_text = "185,000"
price_clean = price_text.replace(",", "")
price_number = int(price_clean)
print(price_number + 3500)
```

### Task (5 min)
Classify each value and check with `type()`.

| Value | Your Type Guess | Actual Type |
|-------|------------------|-------------|
| `"Infinix Hot 40"` | | |
| `64` | | |
| `4.0` | | |
| `False` | | |
| `"4.3"` | | |
| `["Tecno", "Infinix"]` | | |

**Answer Key:** `str`, `int`, `float`, `bool`, `str` (it is in quotes), `list`.

---

## Block 2: Variables (15 min)

**Concept:** A variable is a name attached to a value, so you can use the value later. The equals sign (`=`) means "store this value under this name." It does not mean "equals" in the maths sense.

```python
price_ngn = 185000
```

**Reading it:** the name `price_ngn` now points to the value `185000`.

### Reusing and Reassigning

```python
price_ngn = 185000
print(price_ngn)

price_ngn = 172000          # reassign: the name now holds a new value
print(price_ngn)

discount_ngn = 10000
final_price_ngn = price_ngn - discount_ngn
print(final_price_ngn)
```

**Updating in place:**
```python
review_count = 120
review_count = review_count + 5
review_count += 5            # shorthand for the same thing
print(review_count)
```

### Multiple Assignment

```python
brand, storage_gb, ram_gb = "Tecno", 128, 4
```

### Naming Rules (Python enforces these)

| Rule | Valid | Invalid |
|------|-------|---------|
| Start with a letter or underscore: e.g., `price_ngn`, `_temp` 
| A variable can contain only letters, numbers, underscores | `ram_gb4` | `ram-gb`, `ram gb` |
| Cannot be a keyword | `product_class` | `class` |
| Case matters | `Price` and `price` are different | |

### Naming Conventions (good habits)

| Habit | Good | Poor |
|-------|------|------|
| Use `snake_case`: lowercase with underscores | 
| Use descriptive names | `delivery_days` | `d` |
| Include the unit when it matters | `price_ngn`, `storage_gb` | 
| Use plural names for collections | `retailers` 

### Using Variables in Sentences (f-strings)

```python
product_name = "Tecno Spark 20"
retailer = "Jumia"
price_ngn = 185000
average_rating = 4.3
in_stock = True

print(f"{product_name} is listed on {retailer} for {price_ngn} naira, rated {average_rating}, in stock: {in_stock}.")
```

Formatting numbers:
```python
print(f"Price: {price_ngn:,} naira")                  
# The colon followed by a comma tells python to add a comma after every 3 figures ->+ Price: 185,000 naira
print(f"Rating: {average_rating:.1f} out of 5")        # Rating: 4.3 out of 5
```

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `NameError: name 'price_ngn' is not defined` | Used a variable before creating it, or misspelled it | Create it first; check spelling and capitals |
| `SyntaxError: invalid syntax` | Invalid variable name (space, hyphen, starts with a number, or is a keyword) | Rename it |
| `TypeError` | Combined incompatible types | Convert with `int()`, `float()`, or `str()` |

### Task (6 min)
Pick one row from your `lagos_phones.csv`. Create one variable for each of six columns, using good names and units. Print one sentence with an f-string.

---

## Block 3: Keywords (10 min)

**Concept:** Keywords are words Python reserves for its own use. Each one has a special meaning in the language. You cannot use them as variable names.

### List Them in Python

```python
import keyword
print(keyword.kwlist)
print(len(keyword.kwlist))
```

### The Keywords You Will Meet in This Course

| Keyword | Purpose | Introduced |
|---------|---------|------------|
| `True`, `False`, `None` | Built-in values | Today |
| `if`, `elif`, `else` | Make decisions | Week 1 |
| `for`, `while`, `in` | Repeat actions | Week 1 |
| `and`, `or`, `not` | Combine conditions | Week 2 |
| `import`, `from`, `as` | Bring in libraries | Week 1 |
| `def`, `return` | Create functions | Week 2 |
| `break`, `continue`, `pass` | Control loops | Later |
| `try`, `except`, `finally` | Handle errors | Week 9 |
| `with` | Manage files | Week 9 |
| `class`, `lambda` | Advanced structure | Later |
| `is` | Check identity | Later |
| `assert` | Check a rule | Week 9 |

### Complete List of Python Keywords

`False`, `None`, `True`, `and`, `as`, `assert`, `async`, `await`, `break`, `class`, `continue`, `def`, `del`, `elif`, `else`, `except`, `finally`, `for`, `from`, `global`, `if`, `import`, `in`, `is`, `lambda`, `nonlocal`, `not`, `or`, `pass`, `raise`, `return`, `try`, `while`, `with`, `yield`

### Soft Keywords
`match`, `case`, `_`, and `type` act as keywords only in certain places. They can still be used as variable names, but avoiding them is safer.

### Keywords Cannot Be Variable Names

```python
class = "Tecno"       # SyntaxError
for = 185000          # SyntaxError
```

**Fix it with a descriptive name:**
```python
phone_class = "Tecno"
for_sale = True
```

### Keywords vs. Built-in Functions

| Category | Examples | Can You Reuse the Name? |
|----------|----------|--------------------------|
| Keywords | `if`, `for`, `class`, `True` | No (causes an error) |
| Built-in functions | `print`, `type`, `len`, `sum`, `max`, `min`, `list`, `str` | Yes, but do not. It hides the function |

```python
max = 185000
print(max(10, 20))      # TypeError: 'int' object is not callable
```

**Rule:** Never use `list`, `str`, `sum`, `max`, `min`, `type`, or `id` as variable names.

### Task (4 min)
Which of these are valid variable names? Explain each answer.

| Name | Valid? | Why |
|------|--------|-----|
| `price_ngn` | | |
| `2nd_listing` | | |
| `in_stock` | | |
| `in` | | |
| `Average Rating` | | |
| `list` | | |
| `rating-score` | | |
| `_cache` | | |

**Answer Key:** valid; invalid (starts with a number); valid (contains `in` but is not the keyword); invalid (`in` is a keyword); invalid (contains a space); valid but poor (hides the built-in `list`); invalid (hyphen); valid.

---

## Client Readout (7 min)

**Task:** In a code cell, describe one listing from your own dataset using at least 5 variables of at least 4 different types, then print a client-ready sentence.

```python
product_name = "Tecno Spark 20"          # str
retailer = "Jumia"                        # str
price_ngn = 185000                        # int
average_rating = 4.3                      # float
in_stock = True                           # bool

print(f"{product_name} at {retailer}: {price_ngn:,} naira, rated {average_rating}, in stock: {in_stock}.")
```

Activity: 3 volunteers read their sentences. The class checks: right types, clear names with units, no keyword used as a name.

---

## Exit 

1. What is the data type of 4.3 and "4.3"
2. What does `price_ngn = 185000` do?
3. Name two rules for a valid variable name.
4. What is a keyword? Give two examples.
5. Why is `class = "Tecno"` an error?









**Answers** 
1. `float`; `str`.
2. Stores the value 185000 under the name `price_ngn`.
3. Any two of: starts with a letter or underscore; only letters, numbers, underscores; cannot be a keyword; case matters.
4. A word Python reserves for its own use, such as `if` and `for`.
5. `class` is a keyword, so it cannot be used as a variable name.

---

## Homework

1. Choose three more rows from `lagos_phones.csv` and create variables for each, then print a sentence for each
2. Create a list of the three retailers and a dictionary for one listing; print the first retailer and the dictionary's price
3. Convert the string `"N185,000"` to an integer using `.replace()` and `int()`
4. Run `import keyword` and `keyword.kwlist`; write down 5 keywords you have not seen before

## Deliverable
`python_basics_phones.ipynb` containing: the six-column variable cell, a type check for each, a list, a dictionary, a tuple, one type conversion, the `keyword.kwlist` output, and the f-string readout.

## Assessment

| Component | Weight | Criteria |
|-----------|--------|----------|
| Exit ticket | 30% | Correct types, variable rules, keyword definition |
| Variables and types cell | 30% | Correct types, good names, units included, no keywords as names |
| Collections and conversion | 20% | List, dictionary, tuple, and one conversion run correctly |
| Client readout | 20% | Clear f-string using at least 5 variables of 4 types |

---

# Quick Reference Sheet

| Concept | Remember |
|---------|----------|
| Types | `str`, `int`, `float`, `bool`, `None`, `list`, `dict`, `tuple` |
| Check a type | `type(value)` |
| Change a type | `int()`, `float()`, `str()`, `bool()` |
| Create a variable | `name = value` |
| Naming style | `snake_case`, descriptive, include units |
| Variable name cannot | start with a number, contain spaces or hyphens, be a keyword |
| Keywords | Reserved words such as `if`, `for`, `class`, `True` |
| List all keywords | `import keyword` then `keyword.kwlist` |
| Sentences with variables | `f"{name} costs {price:,} naira"` |

# Instructor Checklist

- [] s have Colab and Dataset accounts ready
- [ ] Datasetcredits for 1 Build, 1 Enrich, 1 Monitor per 
- [ ] Backup copy of `lagos_phones.csv` prepared in case a Dataset run fails
- [ ] Notebook template shared with a "Make a copy" link
- [ ] Printed quick reference sheet

"""