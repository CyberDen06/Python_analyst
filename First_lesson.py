# Foundations Lesson: Data Analysis Essentials

## Learning Outcomes
By the end of this lesson, you'd be able to:
1. Explain the difference between data, information, and insight
2. Describe the six steps of the data analysis process
3. Identify the rows, columns, and cells of a dataset, and name the terms for each
4. Classify variables by data type (numeric, categorical, boolean, date, text)
5. Spot five common data quality problems
6. Define count, mean, median, mode, minimum, maximum, range, and percentile in plain words
7. Distinguish descriptive, diagnostic, predictive, and prescriptive analysis
8. Explain the difference between correlation and causation, and between a sample and a population
9. Read the vocabulary used for Riveter and Python in later lessons


---

## Client Brief (10 min)

> "We run an after-school tutoring company with 12 tutors. We want to partner with private secondary schools in Ibadan. We have no list. We do not know how many schools there are, where they are, what they charge, or which ones are large enough to be worth visiting. We want to begin visiting schools next month."

Brainstorm: 
1. Underline the decision the client must make
2. Write one sentence: "To help the client decide, I need to find out ______."
3. List 5 facts you would want about each school


Example Answer: "To help the client decide, I need to find out how many private secondary schools are in Ibadan, where they are, how large they are, and what they charge."

## Key Terms in Data Analytics

| Term        |  Meaning    | Example of data we need from the Client Brief |
|------|------------------------|-------------------------------|
| Data | Raw facts, recorded | "Government College, Ibadan LGA, 1,200 students" |
| Information | Data that is organized so it can be read | A table of schools with their student numbers |
| Insight | A pattern or meaning found in the information | "Most large schools are clustered in two local governments" |
| Decision | An action chosen because of the insight | "Visit the 10 largest schools in those two areas first" |
| Question | What the analysis is meant to answer | "Which schools should we approach first?" |

**The Data-to-Decision Chain**
Data, then information, then insight, then decision. Data analysis is the work that moves a client along this chain. 
Data -> Information -> Insight -> Decision

Activity: 
From our guide on the key terms in Data Analytics, Sort these statements into data, information, insight, or decision.

| Statement | Category |
|-----------|----------|
| "School A: 650" | 
| "School A has 650 students and School B has 400" |  |
| "Bigger schools tend to charge higher tuition" | |
| "We will begin with schools of more than 500 students" | |
| "School C, Bodija, boarding, 900" | |

**Discussion**
Why is a spreadsheet of 200 schools not yet useful to the client? 

A spreadsheet of 200 schools is not yet useful to the client because it is data, not an insight, and it does not help the client make any decision. 

---

## Block 2: Riveter Build, Enrich, Monitor with Dataset Terms

 A dataset is built in three stages. 

Stage: Step. 
What it does: The thing you do to achieve that stage. 
Term: Data Analytics Term

| Stage | What it does | Term |
|-------|--------------|------|
| Build | Collects the list of things you want to study | Data collection |
| Enrich | Adds more facts about each thing | Data enrichment |
| Monitor | Re-checks the facts over time | Monitoring, tracking, refreshing | 

**Key Terms** 

| Term | Meaning |
|------|---------|
| Source | The place a fact came from (a website, a report, a database, or manual collection) |
| Primary data | Data you collect yourself (a survey you run) |
| Secondary data | Data someone else collected and published (a school's website, a government list) |
| Web data | Data found on public websites |
| Snapshot | A copy of the data at one moment in time |
| Refresh | Re-collecting the data to bring it up to date |

**Dataset Build Prompt**
> Build a list of private secondary schools in Ibadan, Oyo State, Nigeria, from school directories, government education lists, and school websites. One row per school. Columns in snake_case: school_name, local_government_area, street_address, website_url, school_type (day, boarding, or both), annual_tuition_ngn (number only), source_url.

**Our Activity :** 
1. Run the Build
2. Count the rows and the columns
3. Note: What is one thing the client needs that this table does not have yet?



**Dataset Enrich Prompt**
> For each school, find: year_founded (number), student_population (number), curriculum (Nigerian, British, or both), google_rating (number), review_count (number), and has_boarding (true/false). Add a source_url column for each value. Leave blank if not found; do not guess.

**Our Activity (5 min):**
1. Run the Enrich
2. Open one source URL and confirm one value yourself

**Dataset Monitor Prompt**
> Monitor each school's website and directory listing monthly. Flag any change in annual_tuition_ngn, any new private secondary school in Ibadan, and any school marked closed. 

**Discussion** Why do we ask for a source URL for each value? 

---

## Block 3: Breakdown of a Dataset and Data Types 

**Breakdown**
| Term | Meaning | Also Called | Example |
|------|---------|-------------|---------|
| Dataset | A collection of data organized in a table | Table, data frame (in Python) | The Ibadan schools table |
| Row | One item being studied | Record, observation | One school |
| Column | One fact recorded about every item | Field (SQL), variable (Python), attribute, feature | `annual_tuition_ngn` |
| Cell | One value at the crossing of a row and a column | Value, data point | `450000` |
| Header | The name at the top of each column | Column name, label | `student_population` |
| Identifier | A column that tells rows apart | ID, key | `school_name` |
| Unit of analysis | What one row represents | | One school |

**Activity** In your own table, point to and name one row, one column, one cell, one header, and the identifier. State the unit of analysis.

**Data Types**

| Type | Meaning | Examples from the Dataset | Can We Do Math on It? |
|------|---------|--------------------------|-----------------------|
| Numeric, continuous | A number that can take any value in a range | `annual_tuition_ngn`, `google_rating` | Yes |
| Numeric, discrete | A whole-number count | `student_population`, `review_count` | Yes |
| Categorical, nominal | A label with no order | `local_government_area`, `curriculum` | No |
| Categorical, ordinal | A label with a natural order | `price_tier` ($, $$, $$$) | Rank only |
| Boolean | Yes or no, true or false | `has_boarding` | Count only |
| Date and time | A point in time | `year_founded`, `snapshot_date` | Differences only |
| Text | Free-form words | `street_address`, review comments | Search and count words |

**Activity** Classify every column in your Ibadan schools table.

| Column | Data Type | Why? |
|--------|-----------|------|
| school_name | | |
| local_government_area | | |
| website_url | | |
| school_type | | |
| annual_tuition_ngn | | |
| year_founded | | |
| student_population | | |
| curriculum | | |
| google_rating | | |
| review_count | | |
| has_boarding | | |
| source_url | | |

**Answer Key:** school_name (text, identifier); local_government_area (categorical nominal); website_url (text); school_type (categorical nominal); annual_tuition_ngn (numeric continuous); year_founded (date or discrete numeric); student_population (numeric discrete); curriculum (categorical nominal); google_rating (numeric continuous); review_count (numeric discrete); has_boarding (boolean); source_url (text).

**Two More Useful Terms**

| Term | Meaning | Example |
|------|---------|---------|
| Measure | A numeric column you summarize | `annual_tuition_ngn` |
| Dimension | A category column you group or filter by | `local_government_area` |

**Quick Check (5 min):** "Average tuition by local government area" uses which measure and which dimension? (Answer: measure is `annual_tuition_ngn`, dimension is `local_government_area`.)

---

## Break (10 min)

---

## Block 4: Data Quality Audit (15 min)

**Concept (3 min):** Poor data leads to poor decisions. Before analyzing anything, check the quality.

**The Five Common Problems**

| Problem | Meaning | Example in the Schools Table |
|---------|---------|------------------------------|
| Missing values | A cell is blank | No `student_population` for a school |
| Duplicates | The same item appears more than once | "St. Anne's School" and "St Anne's School, Molete" |
| Inconsistent formats | The same fact written in different ways | "N450,000", "450000", "450k" |
| Outliers | A value far from the rest | A school with tuition of 45,000,000 naira (a typing error) or 12 students |
| Outdated data | The value was true once but is no longer | A fee from three years ago |

**The Four Qualities of Good Data**

| Quality | Question to Ask |
|---------|-----------------|
| Accuracy | Is the value correct? |
| Completeness | Are values missing? |
| Consistency | Is the same fact written the same way? |
| Timeliness | Is the value current? |

**Learner Activity (10 min):** Audit your own table.
1. Count blank cells in three columns
2. Find at least one possible duplicate
3. Find at least one inconsistent format
4. Find the highest and lowest `annual_tuition_ngn` and decide if either looks wrong
5. Check the date or source of one value
6. Record findings in a table

| Check | What I found | Row(s) |
|-------|--------------|--------|
| Missing values | | |
| Duplicates | | |
| Inconsistent formats | | |
| Outliers | | |
| Outdated | | |

**Discussion (2 min):** Which problem could most change the client's decision? (There is no single answer. Learners explain their reasoning.)

---

## Block 5: Basic Statistics, Types of Analysis, and Thinking Traps (15 min)

### Basic Statistics (6 min)

**Use this small example. Five schools have these annual tuition fees (naira): 250,000; 300,000; 300,000; 450,000; 1,500,000**

| Term | Meaning | Value for the Example |
|------|---------|-----------------------|
| Count | How many values | 5 |
| Minimum | Smallest value | 250,000 |
| Maximum | Largest value | 1,500,000 |
| Range | Maximum minus minimum | 1,250,000 |
| Mean | Add all values, divide by the count | 560,000 |
| Median | The middle value when sorted | 300,000 |
| Mode | The most common value | 300,000 |
| Percentile | The value below which a given percent of the data falls | The 50th percentile is the median |

**Key Idea:** The mean (560,000) is far above the median (300,000) because one very expensive school pulls it up. When a dataset has outliers, the median usually describes a "typical" value better.

**Learner Activity (3 min):** Calculate the mean and median for these five student populations: 180, 220, 250, 300, 2,000. (Answer: mean 590, median 250.)

### Types of Analysis (4 min)

| Type | Question | Example for the Client |
|------|----------|------------------------|
| Descriptive | What is happening? | How many schools are in each local government area? |
| Diagnostic | Why did it happen? | Why are tuition fees higher in some areas? |
| Predictive | What is likely to happen? | Which areas are likely to have new schools opening? |
| Prescriptive | What should we do? | Which 10 schools should we visit first? |

**This course focuses on descriptive and diagnostic analysis, with a first look at prediction in Week 8.**

### Thinking Traps (5 min)

| Term | Meaning | Example |
|------|---------|---------|
| Correlation | Two things move together | Schools with higher tuition tend to have more students |
| Causation | One thing causes the other | Higher tuition causes more students (not proven by the pattern alone) |
| Population | Everything you want to study | All private secondary schools in Ibadan |
| Sample | A part of the population you actually have | The 85 schools Riveter found |
| Bias | A systematic reason the sample is not representative | Only schools with websites appear, so schools without websites are missing |
| Metric | A number used to measure something | Average tuition per school |
| KPI | A metric tied to a goal | Number of schools visited per month |

**Discussion (2 min):** Our dataset only includes schools with an online presence. What kind of schools might be missing? How could that change the client's decision?

---

## Block 6: The Analysis Process and the Tools Ahead (10 min)

### The Six Steps of Data Analysis

| Step | Name | What Happens | Where It Appears in This Course |
|------|------|--------------|---------------------------------|
| 1 | Ask | Define the client's question | Client Brief |
| 2 | Collect | Gather the data | Riveter Build and Enrich |
| 3 | Clean | Fix missing, duplicate, and inconsistent data | Week 3 |
| 4 | Analyze | Find patterns with filters, groups, statistics | Weeks 2, 4, 7, 8 |
| 5 | Visualize and Communicate | Show the answer in charts and plain words | Week 5 and every Client Readout |
| 6 | Monitor | Keep the answer current | Riveter Monitor |

**Learner Activity (3 min):** Match each task to a step.

| Task | Step |
|------|------|
| Remove the duplicate school | |
| Draw a bar chart of schools per area | |
| Write "How should we prioritize schools?" | |
| Get an alert when a school changes its fees | |
| Calculate median tuition | |
| Run a Riveter Build | |

**Answer Key:** Clean, Visualize, Ask, Monitor, Analyze, Collect.

### Tool Vocabulary

| Term | Meaning |
|------|---------|
| CSV file | A plain-text table file; each line is a row and commas separate columns |
| Spreadsheet | A tool like Excel or Google Sheets for tables |
| Database | A system that stores large tables and links them together |
| API | A way for one program to ask another for data |
| Python | A programming language used for data analysis |
| Library | A pack of ready-made Python tools |
| pandas | The Python library for working with tables |
| DataFrame | A table inside pandas |
| Notebook | A document where you write code, run it, and write notes together |
| Script | A saved file of Python code that can be run again |
| Chart or visualization | A picture of the data |

### Core Actions on Data (used throughout the course)

| Action | Meaning | Example |
|--------|---------|---------|
| Filter | Keep only the rows that match a rule | Schools with more than 500 students |
| Sort | Put rows in order | Cheapest tuition first |
| Group | Split rows into categories | Schools by local government area |
| Aggregate | Summarize each group with one number | Average tuition per area |
| Join (merge) | Combine two tables using a shared column | Schools table plus population table |
| Transform | Create or change a column | Tuition in dollars |

---

## Exit Ticket (5 min)

1. What is the difference between data and an insight?
2. In a table of schools, what is a row, and what is a column?
3. Is `has_boarding` numeric, categorical, or boolean?
4. Name two data quality problems.
5. A dataset has these values: 100, 120, 130, 140, 900. Which is higher, the mean or the median, and why?

**Answer Key**
1. Data is a raw fact. An insight is a pattern or meaning found by analyzing facts.
2. A row is one item (one school). A column is one fact recorded about every item.
3. Boolean.
4. Any two of: missing values, duplicates, inconsistent formats, outliers, outdated data.
5. The mean (278) is higher than the median (130), because the outlier 900 pulls the mean up.

---

## Homework

1. Finish the data quality table for your Ibadan schools dataset
2. Complete the data type table with a "Why?" for every column
3. Write a one-paragraph answer: "What would you tell the tutoring company so far, and what more do you need to know?"
4. Study the glossary below for a short quiz at the start of Week 1

## Deliverable
A one-page document containing: the client question, the annotated dataset anatomy (row, column, cell, identifier), the data type table, the data quality table, and one paragraph of findings.

## Assessment

| Component | Weight | Criteria |
|-----------|--------|----------|
| Exit ticket | 30% | Correct definitions and the mean vs. median reasoning |
| Data type table | 25% | Every column classified with a reason |
| Data quality table | 25% | At least four checks completed with specific rows cited |
| Findings paragraph | 20% | Specific, uses at least two numbers, names what is missing |

---

# Glossary (Reference Sheet)

| Term | Definition |
|------|------------|
| Accuracy | Whether a value is correct |
| Aggregate | To summarize many values with one number |
| API | A way for programs to request data from each other |
| Bias | A systematic reason a sample does not represent the population |
| Boolean | A value that is true or false |
| Categorical | A column of labels rather than numbers |
| Cell | One value in a table |
| Column | One fact recorded for every item in a dataset |
| Correlation | Two things that move together |
| Count | The number of values |
| CSV | A plain-text file that stores a table |
| Data | Raw recorded facts |
| Data cleaning | Fixing errors and inconsistencies in data |
| Data type | The kind of value a column holds |
| Dataset | A collection of data organized in a table |
| DataFrame | A table in pandas |
| Dimension | A category column used to group or filter |
| Duplicate | The same item appearing more than once |
| Enrichment | Adding new facts to items you already have |
| Filter | Keep only rows that match a rule |
| Group | Split rows into categories |
| Identifier | A column that tells rows apart |
| Information | Organized data that can be read |
| Insight | A meaningful pattern found in data |
| Join | Combine two tables using a shared column |
| KPI | A metric tied to a goal |
| Library | A pack of ready-made code |
| Mean | The sum of values divided by the count |
| Measure | A numeric column that is summarized |
| Median | The middle value when values are sorted |
| Metric | A number that measures something |
| Missing value | A blank cell |
| Mode | The most common value |
| Monitoring | Re-checking data over time |
| Notebook | A document that mixes code, results, and notes |
| Numeric | A column of numbers |
| Observation | One row in a dataset; one item studied |
| Outlier | A value far from the others |
| Percentile | The value below which a given percent of the data falls |
| Population | Everything you want to study |
| Primary data | Data you collect yourself |
| Range | Maximum minus minimum |
| Record | Another word for a row |
| Row | One item in a dataset |
| Sample | The part of the population you actually have |
| Secondary data | Data someone else collected |
| Snapshot | Data as it was at one moment |
| Source | Where a fact came from |
| Structured data | Data in rows and columns |
| Unstructured data | Data without a table shape, such as free text, images, audio |
| Variable | Another word for a column |
| Visualization | A chart or picture of the data |
| Web data | Data found on public websites |

# Instructor Checklist

- [ ] Learners have Riveter accounts and credits for 1 Build, 1 Enrich, 1 Monitor
- [ ] Backup copy of `ibadan_schools.csv` prepared in case a Riveter run fails
- [ ] Printed or shared copies of the glossary
- [ ] Printed tables for the sorting and matching activities
- [ ] Time cues set: Block 2 must end by 0:45 to protect the break