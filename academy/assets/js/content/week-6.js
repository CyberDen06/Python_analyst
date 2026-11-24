export default {
  id: "week-6",
  number: 6,
  title: "Exploratory Data Analysis & Storytelling",
  tagline: "Run a full investigation and tell the client what you found",
  duration: "5 hours",
  client: {
    name: "Bright Steps Online",
    brief:
      "We spend money on five marketing channels: Organic, Paid, Social, Email, and Referral. We have twelve weeks of traffic and signup data. We think Paid is our best channel, but nobody has actually checked. We need to know where the signups really come from — and whether anything strange happened.",
    question: "Which marketing channel deserves more of next quarter's budget?",
  },
  objectives: [
    "Follow an exploratory data analysis (EDA) workflow",
    "Profile a dataset: shape, types, missingness, ranges",
    "Summarize performance by group and compute a rate",
    "Find an anomaly and investigate it",
    "Write findings with evidence, limitations, and next steps",
    "Deliver a three-minute client readout",
  ],
  sections: [
    {
      id: "w6s1",
      title: "The EDA checklist",
      blocks: [
        {
          type: "text",
          md:
            "**Exploratory data analysis (EDA)** is what you do before you know what the answer is. You look at the data from several angles until a trustworthy story emerges.\n\nThe checklist for any new dataset:\n\n1. **Shape and columns** — how many rows, what does each row mean?\n2. **Types and missingness** — are values stored as the right type? What is blank?\n3. **Ranges and distributions** — any impossible values or outliers?\n4. **Groups and relationships** — how does the measure differ by category?\n5. **Surprises** — anything that does not fit, and needs a second look?",
        },
        {
          type: "code",
          id: "w6c1",
          title: "Profile the traffic data",
          rows: 16,
          code:
            'import pandas as pd\n\n' +
            'traffic = pd.read_csv("website_traffic.csv")\n\n' +
            'print("Shape:", traffic.shape)\n' +
            'print("\\nMissing values:")\n' +
            'print(traffic.isna().sum())\n' +
            'print("\\nWeeks:", traffic["week_start"].nunique())\n' +
            'print("Channels:", list(traffic["channel"].unique()))\n' +
            "traffic.describe()",
        },
        {
          type: "callout",
          variant: "note",
          md:
            "**What one row means here:** one row = one channel's performance in one week. The unit of analysis is *channel-week*, not the customer. Every summary must respect that.",
        },
        {
          type: "table",
          headers: ["Column", "Meaning", "Type"],
          rows: [
            ["week_start", "Monday starting that week", "date"],
            ["channel", "Marketing channel", "categorical"],
            ["sessions", "Website visits", "numeric (count)"],
            ["signups", "New accounts created", "numeric (count)"],
            ["bounce_rate", "Share of visits that left immediately", "numeric (0–1)"],
            ["avg_duration_sec", "Average visit length in seconds", "numeric"],
          ],
        },
        {
          type: "quiz",
          id: "w6q1",
          title: "Check: EDA and metrics",
          questions: [
            {
              q: "What is the unit of analysis in website_traffic.csv?",
              options: ["One customer", "One channel-week", "One day", "One page"],
              answer: 1,
              why: "Each row combines one channel with one week, so it is a channel-week.",
            },
            {
              q: "Which summary best compares channels fairly when they receive different traffic volumes?",
              options: [
                "Total signups only",
                "Signups ÷ sessions (conversion rate)",
                "Average sessions",
                "Maximum signups",
              ],
              answer: 1,
              why: "A rate normalizes for volume: 50 signups from 100 visits beats 60 from 1,000.",
            },
            {
              q: "What does signal that a value needs investigation?",
              options: [
                "It is far from the rest of the column",
                "It is stored as text",
                "It appears in the first row",
                "It has decimals",
              ],
              answer: 0,
              why: "Outliers and unusual patterns are the signals EDA is designed to catch.",
            },
            {
              q: "Which is NOT part of profiling a new dataset?",
              options: [
                "Checking shape and column types",
                "Counting missing values",
                "Writing the final recommendation",
                "Looking at ranges and outliers",
              ],
              answer: 2,
              why: "The recommendation comes after investigation, not before.",
            },
          ],
        },
      ],
    },
    {
      id: "w6s2",
      title: "Summarize by channel — and compute a rate",
      blocks: [
        {
          type: "text",
          md:
            "Total signups alone will always favor the channel with the most traffic. The fair comparison is **conversion rate**: signups divided by sessions.",
        },
        {
          type: "code",
          id: "w6c2",
          title: "Channel totals and conversion rate",
          rows: 13,
          code:
            "by_channel = traffic.groupby(\"channel\").agg(\n" +
            '    sessions=("sessions", "sum"),\n' +
            '    signups=("signups", "sum"),\n' +
            ")\n\n" +
            'by_channel["conversion_rate"] = (by_channel["signups"] / by_channel["sessions"]).round(4)\n' +
            'by_channel.sort_values("conversion_rate", ascending=False)',
        },
        {
          type: "exercise",
          id: "w6e1",
          title: "Build the channel scorecard",
          prompt:
            "Create \`channel_summary\`, a DataFrame with one row per channel and columns:\n\n- \`sessions\` — total sessions\n- \`signups\` — total signups\n- \`conversion_rate\` — signups ÷ sessions\n\nSort the table by \`conversion_rate\`, highest first. Decimals are fine; no need to round.",
          starter:
            "import pandas as pd\n" +
            'traffic = pd.read_csv("website_traffic.csv")\n\n' +
            "# channel_summary = ...\n",
          hints: [
            "Start with traffic.groupby(\"channel\").agg(...) for sessions and signups.",
            "After the groupby, assign channel_summary[\"conversion_rate\"] = channel_summary[\"signups\"] / channel_summary[\"sessions\"].",
            "Sort with .sort_values(\"conversion_rate\", ascending=False).",
          ],
          solution:
            "import pandas as pd\n" +
            'traffic = pd.read_csv("website_traffic.csv")\n\n' +
            "channel_summary = traffic.groupby(\"channel\").agg(\n" +
            '    sessions=("sessions", "sum"),\n' +
            '    signups=("signups", "sum"),\n' +
            ")\n" +
            'channel_summary["conversion_rate"] = channel_summary["signups"] / channel_summary["sessions"]\n' +
            'channel_summary = channel_summary.sort_values("conversion_rate", ascending=False)\n\n' +
            "channel_summary",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("website_traffic.csv")\n' +
            '_expected = _src.groupby("channel").agg(sessions=("sessions", "sum"), signups=("signups", "sum"))\n' +
            '_expected["conversion_rate"] = _expected["signups"] / _expected["sessions"]\n' +
            '_expected = _expected.sort_values("conversion_rate", ascending=False)\n' +
            'expect_defined("channel_summary")\n' +
            'expect(isinstance(channel_summary, pd.DataFrame), "channel_summary should be a DataFrame.")\n' +
            'expect({"sessions", "signups", "conversion_rate"} <= set(channel_summary.columns), "channel_summary needs sessions, signups, and conversion_rate columns.")\n' +
            'expect(set(channel_summary.index) == set(_expected.index), "The index should contain all five channels.")\n' +
            'expect(list(channel_summary.index) == list(_expected.index), "Sort channel_summary by conversion rate, highest first.")\n' +
            '_actual = channel_summary.reindex(_expected.index)\n' +
            'expect((_actual["sessions"].astype(int).values == _expected["sessions"].values).all(), "The session totals are off.")\n' +
            'expect((_actual["signups"].astype(int).values == _expected["signups"].values).all(), "The signup totals are off.")\n' +
            'expect(((_actual["conversion_rate"] - _expected["conversion_rate"]).abs() < 0.0005).all(), "conversion_rate should be signups divided by sessions.")',
        },
      ],
    },
    {
      id: "w6s3",
      title: "Find the surprise",
      blocks: [
        {
          type: "text",
          md:
            "A good EDA always looks at the data over time, not just totals. A spike that lasts one week is a very different story from a channel that is consistently strong.",
        },
        {
          type: "code",
          id: "w6c3",
          title: "Sessions by week and channel",
          rows: 9,
          code:
            "weekly_sessions = traffic.pivot_table(\n" +
            '    values="sessions",\n' +
            '    index="week_start",\n' +
            '    columns="channel",\n' +
            '    aggfunc="sum",\n' +
            "    fill_value=0,\n" +
            ")\n\n" +
            "weekly_sessions",
        },
        {
          type: "code",
          id: "w6c4",
          title: "Zoom in on Paid",
          rows: 7,
          code:
            'paid = traffic[traffic["channel"] == "Paid"].sort_values("week_start")\n' +
            'paid[["week_start", "sessions", "signups", "bounce_rate"]]',
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**There it is.** Paid sessions jump to 3,600 in one week while signups stay around 50 and the bounce rate rises. That is not a normal good week — it looks like a traffic source that did not convert. Always investigate spikes before celebrating them.",
        },
        {
          type: "exercise",
          id: "w6e2",
          title: "Isolate the spike",
          prompt:
            "Investigate the Paid channel:\n\n1. Create \`paid\` — the rows where channel is \`Paid\`\n2. Create \`spike_week\` — the \`week_start\` value of the Paid week with the **most sessions**\n3. Create \`spike_sessions\` — that week's session count (an int)\n\nDo not guess: derive the values from the data.",
          starter:
            "import pandas as pd\n" +
            'traffic = pd.read_csv("website_traffic.csv")\n\n' +
            "# paid = ...\n" +
            "# spike_week = ...\n" +
            "# spike_sessions = ...\n\n" +
            "# print(spike_week, spike_sessions)\n",
          hints: [
            "Filter with traffic[traffic[\"channel\"] == \"Paid\"].",
            "paid.loc[paid[\"sessions\"].idxmax()] gives the whole row with the most sessions.",
            "Read the week_start from that row, and cast the sessions value with int(...).",
          ],
          solution:
            "import pandas as pd\n" +
            'traffic = pd.read_csv("website_traffic.csv")\n\n' +
            'paid = traffic[traffic["channel"] == "Paid"]\n' +
            'best_row = paid.loc[paid["sessions"].idxmax()]\n' +
            'spike_week = best_row["week_start"]\n' +
            "spike_sessions = int(best_row[\"sessions\"])\n\n" +
            "print(spike_week, spike_sessions)",
          checks:
            'import pandas as pd\n' +
            '_src = pd.read_csv("website_traffic.csv")\n' +
            '_paid = _src[_src["channel"] == "Paid"]\n' +
            '_week = _paid.loc[_paid["sessions"].idxmax(), "week_start"]\n' +
            "_max = int(_paid[\"sessions\"].max())\n" +
            'expect_defined("paid", "spike_week", "spike_sessions")\n' +
            'expect(isinstance(paid, pd.DataFrame) and set(paid["channel"].unique()) == {"Paid"}, "paid should contain only Paid rows.")\n' +
            'expect(spike_week == _week, "spike_week should be the week_start of the Paid week with the most sessions.")\n' +
            'expect(int(spike_sessions) == _max, "spike_sessions should be the highest session count in the Paid channel.")',
        },
        {
          type: "notes",
          id: "w6n1",
          prompt:
            "The Paid spike had 3,600 sessions but did not bring a corresponding jump in signups. Write two plausible hypotheses for what happened, and say what data you would request to test each one.",
          placeholder:
            "Hypothesis 1: … Data I would request: …\nHypothesis 2: … Data I would request: …",
        },
      ],
    },
    {
      id: "w6s4",
      title: "Findings, limitations, and the readout",
      blocks: [
        {
          type: "text",
          md:
            "A finding is not \"Paid had 3,600 sessions\". A finding answers the client's question with evidence and a limitation:\n\n**Structure:** what we looked at → what we found → what it means → what we recommend → what we still need.",
        },
        {
          type: "table",
          headers: ["Weak statement", "Stronger statement"],
          rows: [
            ["Paid is the best channel", "Email converts best at about 12% of sessions, compared with about 3% for Paid"],
            ["Something weird happened", "Paid sessions spiked to 3,600 in the week of 2026-02-23 while signups stayed near 50 — likely non-converting traffic"],
            ["We should spend more on Email", "Email warrants a larger share of next quarter's budget, but 12 weeks is a small sample"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          md:
            "**Correlation, not proof.** A high-converting channel may attract visitors who already intended to sign up. The data suggests a direction; it does not prove that spending more will cause more signups. Say \"suggests\" and name the limitation.",
        },
        {
          type: "notes",
          id: "w6n2",
          prompt:
            "Write your three-sentence client readout: which channel converts best, what the spike was, and what you recommend — with one limitation.",
          placeholder:
            "Looking at 12 weeks of data, … converts best at …%. Paid had a one-week spike to … sessions that did not convert, which suggests …. I recommend …, with the caveat that ….",
        },
        {
          type: "quiz",
          id: "w6q2",
          title: "Exit ticket",
          questions: [
            {
              q: "Which order describes a good EDA?",
              options: [
                "Profile → summarize groups → inspect surprises → recommend",
                "Recommend → collect → chart → delete",
                "Chart → publish → clean → check",
                "Sort → merge → delete → guess",
              ],
              answer: 0,
              why: "Investigation comes before recommendation, with surprises checked along the way.",
            },
            {
              q: "A channel has the most total signups but a low conversion rate. What does that mean?",
              options: [
                "It may simply receive much more traffic, not convert better",
                "It is definitely the best channel",
                "Its data is wrong",
                "Conversion rate does not matter",
              ],
              answer: 0,
              why: "Total signups scale with traffic volume; conversion rate compares like with like.",
            },
            {
              q: "A one-week traffic spike with flat signups is best treated as…",
              options: [
                "A pattern to investigate before including in a recommendation",
                "Proof that the channel works",
                "A reason to delete all data",
                "A normal week",
              ],
              answer: 0,
              why: "Spikes can be bots, a campaign experiment, or a tracking error; investigate first.",
            },
            {
              q: "Which sentence is appropriately cautious?",
              options: [
                "Email proves our marketing strategy works",
                "Email converted best in this sample, suggesting it deserves a larger share — though 12 weeks is a short window",
                "Email caused every signup",
                "Email is the worst channel",
              ],
              answer: 1,
              why: "It states the evidence, the suggestion, and the limitation.",
            },
            {
              q: "What should every client readout end with?",
              options: [
                "A recommendation and the next question or limitation",
                "A list of every column",
                "A copy of the code",
                "An apology",
              ],
              answer: 0,
              why: "The client needs a decision path, plus honesty about what the data does not cover.",
            },
          ],
        },
      ],
    },
  ],
};
