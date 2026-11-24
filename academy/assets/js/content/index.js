import week0 from "./week-0.js";
import week1 from "./week-1.js";
import week2 from "./week-2.js";
import week3 from "./week-3.js";
import week4 from "./week-4.js";
import week5 from "./week-5.js";
import week6 from "./week-6.js";
import week7 from "./week-7.js";
import week8 from "./week-8.js";
import week9 from "./week-9.js";
import week10 from "./week-10.js";

export const WEEKS = [week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10];

export const GLOSSARY = [
  { term: "Aggregate", def: "To summarize many values with one number, such as the sum or mean of a column." },
  { term: "API", def: "A way for one program to request data from another program." },
  { term: "Bias", def: "A systematic reason a sample does not represent the population it came from." },
  { term: "Boolean", def: "A value that is either True or False." },
  { term: "Categorical", def: "A column of labels rather than numbers, such as region or category." },
  { term: "Cell", def: "One value at the crossing of a row and a column." },
  { term: "Column", def: "One fact recorded for every item in a dataset. Also called a variable, field, or feature." },
  { term: "Correlation", def: "Two things that move together. Correlation alone does not prove causation." },
  { term: "CSV", def: "A plain-text file that stores a table: each line is a row, commas separate columns." },
  { term: "Data", def: "Raw recorded facts, before they are organized or interpreted." },
  { term: "DataFrame", def: "A table inside pandas: rows, named columns, and an index." },
  { term: "Data cleaning", def: "Finding and fixing missing, duplicate, inconsistent, or wrong values." },
  { term: "Data type", def: "The kind of value a column holds: number, text, boolean, date, and so on." },
  { term: "Dimension", def: "A category column you group or filter by, such as region." },
  { term: "Duplicate", def: "The same item appearing more than once in a dataset." },
  { term: "Filter", def: "Keep only the rows that match a rule." },
  { term: "f-string", def: "A Python string prefixed with f that inserts variable values inside braces." },
  { term: "Group by", def: "Split rows into categories, then summarize each category." },
  { term: "Identifier", def: "A column that tells rows apart, such as order_id." },
  { term: "Information", def: "Data that has been organized so it can be read, such as a table." },
  { term: "Insight", def: "A meaningful pattern found in information that can guide a decision." },
  { term: "Join / merge", def: "Combine two tables using a shared column." },
  { term: "Keyword", def: "A word Python reserves for its own use, such as if, for, or class. It cannot be a variable name." },
  { term: "Library", def: "A pack of ready-made code you can import, such as pandas." },
  { term: "Mean", def: "The sum of values divided by how many values there are. Pulled up or down by outliers." },
  { term: "Median", def: "The middle value when the values are sorted. Often a better 'typical' value with outliers." },
  { term: "Metric", def: "A number used to measure something, such as revenue per order." },
  { term: "Missing value", def: "A blank cell. In pandas it appears as NaN." },
  { term: "Mode", def: "The most common value in a column." },
  { term: "Notebook", def: "A document that mixes code, output, and notes, like a lab workbook." },
  { term: "Outlier", def: "A value far away from the rest of the data, often a typo or a special case." },
  { term: "pandas", def: "The Python library for working with tables (DataFrames)." },
  { term: "Percentile", def: "The value below which a given percentage of the data falls." },
  { term: "Population", def: "Everything or everyone you want to study." },
  { term: "Pyodide", def: "A version of Python compiled to WebAssembly, which lets Python run inside a web browser." },
  { term: "Range", def: "The maximum value minus the minimum value." },
  { term: "Row", def: "One item being studied, such as one school or one order. Also called a record or observation." },
  { term: "Sample", def: "The part of the population you actually have data for." },
  { term: "Series", def: "A single labeled column of values in pandas." },
  { term: "Vectorized", def: "An operation applied to a whole column at once, without writing a loop." }
];
