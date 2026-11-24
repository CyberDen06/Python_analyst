// Generates the practice datasets for the academy.
// Deterministic (seeded) so exercise checks and lesson numbers stay stable.
// Run: node tools/make_datasets.js

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "datasets");
fs.mkdirSync(OUT, { recursive: true });

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260124);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const round100 = (n) => Math.round(n / 100) * 100;

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function writeCsv(name, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(path.join(OUT, name), lines.join("\n") + "\n", "utf8");
  console.log(`${name}: ${rows.length} rows x ${headers.length} cols`);
}
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

/* ------------------------------------------------------------------ */
/* 1. lagos_phones.csv                                                 */
/* ------------------------------------------------------------------ */
const phones = [
  ["Tecno Spark 20", "Tecno", 118000, 128, 4],
  ["Tecno Camon 30", "Tecno", 285000, 256, 8],
  ["Tecno Pova 6", "Tecno", 215000, 256, 8],
  ["Infinix Hot 40i", "Infinix", 112000, 128, 4],
  ["Infinix Note 40", "Infinix", 245000, 256, 8],
  ["Infinix Zero 30", "Infinix", 315000, 256, 12],
  ["Samsung Galaxy A05", "Samsung", 105000, 64, 4],
  ["Samsung Galaxy A15", "Samsung", 189000, 128, 6],
  ["Samsung Galaxy A35", "Samsung", 335000, 256, 8],
  ["iPhone 13", "Apple", 720000, 128, 4],
  ["iPhone 14", "Apple", 880000, 128, 6],
  ["Redmi Note 13", "Xiaomi", 198000, 128, 8],
  ["Redmi 13C", "Xiaomi", 98000, 128, 4],
  ["itel A70", "itel", 72000, 128, 4],
  ["Nokia C32", "Nokia", 85000, 64, 3],
  ["Google Pixel 7a", "Google", 615000, 128, 8],
];
const retailers = [
  ["Jumia", 1.0],
  ["Konga", 0.98],
  ["Slot", 1.03],
];
const phoneRows = [];
for (const [pname, brand, base, storage, ram] of phones) {
  const ratingBase = 3.6 + (base / 900000) * 1.1;
  for (const [retailer, factor] of retailers) {
    const price = round100(base * factor * (0.97 + rand() * 0.06));
    phoneRows.push({
      product_name: pname,
      brand,
      retailer,
      price_ngn: price,
      in_stock: rand() > 0.15 ? "True" : "False",
      average_rating: (Math.min(4.9, ratingBase + rand() * 0.3)).toFixed(1),
      review_count: int(18, 950),
      storage_gb: storage,
      ram_gb: ram,
      has_discount: rand() < 0.32 ? "True" : "False",
      delivery_days: int(1, 6),
    });
  }
}
writeCsv("lagos_phones.csv",
  ["product_name", "brand", "retailer", "price_ngn", "in_stock", "average_rating",
   "review_count", "storage_gb", "ram_gb", "has_discount", "delivery_days"],
  phoneRows);

/* ------------------------------------------------------------------ */
/* 2. shop_sales.csv (clean)                                           */
/* ------------------------------------------------------------------ */
const products = [
  ["Headphones", "Audio", 12500],
  ["Bluetooth Speaker", "Audio", 28000],
  ["Power Bank", "Power", 15000],
  ["Smart Watch", "Wearables", 42000],
  ["Phone Case", "Accessories", 3500],
  ["USB Cable", "Accessories", 2500],
  ["Charger", "Power", 7500],
  ["Laptop Sleeve", "Accessories", 9000],
];
const regions = ["Ikeja", "Lekki", "Yaba", "Surulere", "Ikorodu"];
const start = new Date("2026-01-03T00:00:00Z");
const salesRows = [];
for (let i = 0; i < 96; i++) {
  const [product, category, base] = products[i % products.length];
  const unit = round100(base * (0.92 + rand() * 0.16));
  const dayOffset = Math.floor((i * 173) / 96);
  salesRows.push({
    order_id: "ORD-" + (2001 + i),
    order_date: isoDate(addDays(start, dayOffset)),
    product,
    category,
    region: pick(regions),
    quantity: int(1, 4),
    unit_price: unit,
    customer_type: rand() < 0.62 ? "Returning" : "New",
  });
}
salesRows.sort((a, b) => a.order_date.localeCompare(b.order_date));
writeCsv("shop_sales.csv",
  ["order_id", "order_date", "product", "category", "region", "quantity", "unit_price", "customer_type"],
  salesRows);

/* ------------------------------------------------------------------ */
/* 3. shop_sales_messy.csv (week 3 cleaning)                           */
/* ------------------------------------------------------------------ */
const messy = [];
for (let i = 0; i < 80; i++) {
  messy.push({ ...salesRows[i] });
}
// Missing prices
for (const idx of [3, 11, 19, 27, 36, 44, 53, 61]) messy[idx].unit_price = "";
// Currency / formatted strings
for (const idx of [5, 9, 14, 22, 31, 47]) {
  const v = Number(messy[idx].unit_price) || 10000;
  const styles = [
    "N" + v.toLocaleString("en-NG"),
    "\u20a6" + v.toLocaleString("en-NG"),
    v.toLocaleString("en-NG"),
  ];
  messy[idx].unit_price = pick(styles);
}
// Category spelling variants
for (const idx of [2, 8, 16, 25, 34, 43, 52, 60, 68, 74]) {
  const c = String(messy[idx].category);
  messy[idx].category = pick([c.toLowerCase(), c.toUpperCase(), c + " "]);
}
// Obvious price typos (outliers)
for (const idx of [40, 66]) messy[idx].unit_price = 4200000;
// Mixed date formats
for (const idx of [6, 18, 29, 50, 70]) {
  const [y, m, d] = String(messy[idx].order_date).split("-");
  messy[idx].order_date = `${d}/${m}/${y}`;
}
// Exact duplicate rows
for (const idx of [10, 20, 30, 45]) messy.push({ ...messy[idx] });
writeCsv("shop_sales_messy.csv",
  ["order_id", "order_date", "product", "category", "region", "quantity", "unit_price", "customer_type"],
  messy);

/* ------------------------------------------------------------------ */
/* 4. product_catalogue.csv (week 4 join)                              */
/* ------------------------------------------------------------------ */
const suppliers = {
  "Headphones": "Lagos Gadgets Ltd",
  "Bluetooth Speaker": "SoundHouse NG",
  "Power Bank": "VoltMart",
  "Smart Watch": "WearTech Imports",
  "Phone Case": "Casely Lagos",
  "USB Cable": "VoltMart",
  "Charger": "VoltMart",
  "Laptop Sleeve": "Casely Lagos",
};
const costFactor = {
  "Headphones": 0.5, "Bluetooth Speaker": 0.55, "Power Bank": 0.52,
  "Smart Watch": 0.57, "Phone Case": 0.4, "USB Cable": 0.36,
  "Charger": 0.43, "Laptop Sleeve": 0.47,
};
const catalogueRows = products.map(([product, category, base]) => ({
  product,
  category_official: category,
  supplier: suppliers[product],
  unit_cost_ngn: round100(base * costFactor[product]),
}));
writeCsv("product_catalogue.csv",
  ["product", "category_official", "supplier", "unit_cost_ngn"],
  catalogueRows);

/* ------------------------------------------------------------------ */
/* 5. website_traffic.csv (week 6 EDA)                                 */
/* ------------------------------------------------------------------ */
const channels = {
  Organic: { sessions: [1850, 2600], signups: [85, 140], bounce: [0.32, 0.45], duration: [150, 240] },
  Paid: { sessions: [1200, 1600], signups: [38, 62], bounce: [0.55, 0.68], duration: [70, 120] },
  Social: { sessions: [600, 950], signups: [18, 36], bounce: [0.5, 0.66], duration: [55, 110] },
  Email: { sessions: [300, 480], signups: [38, 58], bounce: [0.2, 0.32], duration: [180, 280] },
  Referral: { sessions: [250, 420], signups: [10, 22], bounce: [0.3, 0.44], duration: [120, 200] },
};
const trafficRows = [];
const trafficStart = new Date("2026-01-05T00:00:00Z");
for (let w = 0; w < 12; w++) {
  for (const [channel, cfg] of Object.entries(channels)) {
    let sessions = int(cfg.sessions[0], cfg.sessions[1]);
    let signups = int(cfg.signups[0], cfg.signups[1]);
    let bounce = cfg.bounce[0] + rand() * (cfg.bounce[1] - cfg.bounce[0]);
    let duration = int(cfg.duration[0], cfg.duration[1]);
    if (channel === "Paid" && w === 7) {
      sessions = 3600;      // suspicious spike
      signups = 52;         // but conversion stayed flat
      bounce = 0.76;
      duration = 48;
    }
    trafficRows.push({
      week_start: isoDate(addDays(trafficStart, w * 7)),
      channel,
      sessions,
      signups,
      bounce_rate: bounce.toFixed(2),
      avg_duration_sec: duration,
    });
  }
}
writeCsv("website_traffic.csv",
  ["week_start", "channel", "sessions", "signups", "bounce_rate", "avg_duration_sec"],
  trafficRows);

/* ------------------------------------------------------------------ */
/* 6. daily_sales.csv (week 8 dates)                                   */
/* ------------------------------------------------------------------ */
const dailyRows = [];
const dailyStart = new Date("2026-01-01T00:00:00Z");
for (let d = 0; d < 181; d++) {
  const date = addDays(dailyStart, d);
  const dow = date.getUTCDay(); // 0 Sun .. 6 Sat
  const weekend = dow === 0 || dow === 5 || dow === 6 ? int(6, 14) : 0;
  const orders = Math.max(20, Math.round(38 + 0.1 * d + weekend + (rand() * 10 - 5)));
  const basket = 9200 + rand() * 900 - 450;
  const revenue = round100(orders * basket + (rand() * 3000 - 1500));
  dailyRows.push({ date: isoDate(date), orders, revenue_ngn: revenue });
}
writeCsv("daily_sales.csv", ["date", "orders", "revenue_ngn"], dailyRows);

/* ------------------------------------------------------------------ */
/* 7. ibadan_schools.csv (week 0 examples, extra practice)             */
/* ------------------------------------------------------------------ */
const schools = [
  ["Bodija International College", "Ibadan North", "Both", 780000, 1640, "True", 1998, "4.6"],
  ["St. Anne's Secondary School", "Ibadan North", "Day", 420000, 980, "False", 1985, "4.2"],
  ["Ibadan Grammar School", "Ibadan North-East", "Boarding", 350000, 2210, "True", 1913, "4.4"],
  ["Oluyole Heights Academy", "Oluyole", "Day", 510000, 720, "False", 2006, "4.1"],
  ["Victory Standard College", "Egbeda", "Both", 300000, 1150, "True", 1992, "3.9"],
  ["Hillcrest Model School", "Ibadan South-West", "Day", 650000, 860, "False", 2001, "4.5"],
  ["Adegoke Memorial College", "Ibadan South-East", "Day", 280000, 1340, "False", 1979, "3.7"],
  ["Royal Ambassadors College", "Ibadan North", "Both", 890000, 540, "True", 2010, "4.7"],
  ["Sacred Heart Secondary School", "Ibadan South-West", "Boarding", 460000, 1010, "True", 1962, "4.0"],
  ["Greenfield Academy", "Ibadan North", "Day", 1200000, 610, "False", 2014, "4.8"],
  ["Molete Community College", "Ibadan South-East", "Day", 190000, 1750, "False", 1971, "3.4"],
  ["Agbowo Tutors College", "Ibadan North", "Day", 260000, 890, "False", 1995, "3.8"],
  ["Oke-Ado High School", "Ibadan South-West", "Day", 210000, 1980, "False", 1968, "3.5"],
  ["Basorun International School", "Ibadan North-East", "Both", 560000, 1120, "True", 2003, "4.3"],
  ["Eleyele College of Arts", "Ibadan North-West", "Day", 240000, 960, "False", 1988, "3.6"],
  ["Apata Premier Academy", "Ibadan South-West", "Day", 480000, 780, "False", 2008, "4.2"],
  ["Challenge Grammar School", "Ibadan South-East", "Day", 175000, 2100, "False", 1974, "3.2"],
  ["Jericho Model College", "Ibadan North", "Both", 720000, 940, "True", 1999, "4.5"],
  ["Alalubosa Heights School", "Ibadan South-West", "Day", 680000, 650, "False", 2012, "4.6"],
  ["Sango Community High School", "Ibadan North-East", "Day", 150000, 2300, "False", 1977, "3.1"],
  ["Ring Road College", "Ibadan South-West", "Day", 320000, 1420, "False", 1983, "3.9"],
  ["Akobo International Academy", "Egbeda", "Both", 540000, 810, "True", 2005, "4.4"],
  ["Alakia Standard College", "Egbeda", "Day", 230000, 1230, "False", 1991, "3.6"],
  ["New Bodija College", "Ibadan North", "Day", 410000, 700, "False", 1986, "4.0"],
  ["Iyana Church Grammar School", "Oluyole", "Day", 200000, 1560, "False", 1965, "3.3"],
  ["Idi-Ishin Model School", "Oluyole", "Both", 390000, 680, "True", 2009, "4.2"],
  ["Onireke Girls College", "Ibadan South-West", "Boarding", 370000, 1180, "True", 1959, "4.1"],
  ["Ojoo High School", "Ibadan North-West", "Day", 165000, 1890, "False", 1972, "3.0"],
  ["Kute International School", "Oluyole", "Day", 610000, 590, "False", 2015, "4.7"],
  ["Eleyele Community Secondary School", "Ibadan North-West", "Day", 140000, 2010, "False", 1980, "3.2"],
];
const schoolRows = schools.map(([school_name, lga, school_type, annual_tuition_ngn,
  student_population, has_boarding, year_founded, google_rating]) => ({
  school_name, lga, school_type, annual_tuition_ngn, student_population,
  has_boarding, year_founded, google_rating,
}));
// A couple of genuinely missing ratings (discussion material; do not guess).
schoolRows[4].google_rating = "";
schoolRows[19].google_rating = "";
writeCsv("ibadan_schools.csv",
  ["school_name", "lga", "school_type", "annual_tuition_ngn", "student_population",
   "has_boarding", "year_founded", "google_rating"],
  schoolRows);

console.log("\nDatasets written to", OUT);
