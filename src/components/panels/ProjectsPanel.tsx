"use client";

import { motion, type Variants, easeOut } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Github } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-2xl border px-4 py-3 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <p className="font-hero text-2xl font-semibold" style={{ color: "var(--accent-strong)" }}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
        {label}
      </p>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
    >
      {children}
    </span>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
      {children}
    </p>
  );
}

type FlowStep = { label: string; detail: string };
type Chart = { src: string; alt: string; caption: string };

/* ---------------- Full project deep-dive ---------------- */
function ProjectDeepDive({
  index,
  tag,
  title,
  description,
  highlight,
  problem,
  approach,
  flow,
  tools,
  results,
  charts,
  githubUrl,
  background = "var(--surface)",
}: {
  index: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;
  problem: string;
  approach: string[];
  flow: FlowStep[];
  tools: string[];
  results: string[];
  charts: Chart[];
  githubUrl: string;
  background?: string;
}) {
  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-8 md:p-10"
      style={{ borderColor: "var(--border)", background }}
    >
      <span
        className="font-hero pointer-events-none absolute -top-3 right-4 select-none text-[clamp(64px,10vw,120px)] font-bold leading-none sm:right-6"
        style={{ color: "var(--accent-soft)" }}
        aria-hidden="true"
      >
        {index}
      </span>

      <div className="relative mb-4 flex flex-wrap items-center gap-3">
        <SectionTag>{tag}</SectionTag>
      </div>

      <h3 className="font-hero relative max-w-[80%] text-2xl font-semibold sm:text-3xl">{title}</h3>
      <p className="relative mt-3 max-w-[70ch] text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--text-soft)" }}>
        {description}
      </p>

      <div className="relative my-6 h-px w-full" style={{ background: "var(--border)" }} />

      <p className="font-hero relative mb-8 max-w-[70ch] text-lg italic leading-snug sm:text-xl" style={{ color: "var(--accent-strong)" }}>
        {highlight}
      </p>

      <div className="relative grid gap-8 md:grid-cols-2">
        <div>
          <SubLabel>The problem</SubLabel>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
            {problem}
          </p>
        </div>
        <div>
          <SubLabel>The approach</SubLabel>
          <ul className="flex flex-col gap-2">
            {approach.map((a) => (
              <li key={a} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                <span style={{ color: "var(--accent)" }}>—</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-10">
        <SubLabel>How it works</SubLabel>
        <div className="flex flex-wrap items-stretch gap-3">
          {flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className="w-[180px] rounded-2xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}
              >
                <p className="font-hero text-sm italic" style={{ color: "var(--accent-strong)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-semibold">{step.label}</p>
                <p className="mt-1 text-xs leading-snug" style={{ color: "var(--text-faint)" }}>
                  {step.detail}
                </p>
              </div>
              {i < flow.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 sm:block" style={{ color: "var(--text-faint)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-10">
        <SubLabel>Tools</SubLabel>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-soft)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-10">
        <SubLabel>The results</SubLabel>
        <ul className="flex flex-col gap-2">
          {results.map((r) => (
            <li key={r} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
              <span style={{ color: "var(--accent)" }}>—</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10">
        <SubLabel>Plots</SubLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          {charts.map((c) => (
            <figure key={c.src} className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <img src={c.src} alt={c.alt} className="w-full object-contain" />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                {c.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-10 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ background: "var(--accent)" }}
      >
        <Github className="h-4 w-4" /> View on GitHub <ArrowUpRight className="h-4 w-4" />
      </a>
    </motion.article>
  );
}

export default function ProjectsPanel({
  onBack,
  onOpenGptCaseStudy,
}: {
  onBack: () => void;
  onOpenGptCaseStudy: () => void;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="relative w-full pb-16"
      style={{ color: "var(--text)" }}
    >
      <motion.button
        variants={item}
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold opacity-80 transition hover:opacity-100"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </motion.button>

      <motion.h2 variants={item} className="font-hero text-[clamp(32px,6vw,52px)] font-semibold italic tracking-tight">
        Projects
      </motion.h2>
      <motion.div variants={item} className="mb-10 mt-3 h-[3px] w-24 rounded-full" style={{ background: "var(--accent)" }} />

      <div className="flex flex-col gap-8">
        {/* ---------------- Football Match Prediction ---------------- */}
        <ProjectDeepDive
          index="01"
          tag="Sports analytics · Classical ML"
          title="Football Match Prediction"
          description="A machine learning system that predicts Home Win / Draw / Away Win outcomes across eight major football leagues, evaluated strictly on matches the models had never seen."
          highlight="57.5% accuracy · 54.3% macro-F1 on 153 held-out matches — 67.8% / 65.7% for the live in-play model"
          problem="Football outcomes are noisy and multi-causal — form, injuries, betting-market sentiment, and plain chance all blend together. Most casual predictions lean on gut feel or a single stat, so this project set out to see how far a properly engineered ML pipeline could push real accuracy, end to end, evaluated only on matches that happened after training ended."
          approach={[
            'Collected historical match data (2014–2025) across eight leagues — Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Turkish Süper Lig, plus FIFA Club World Cup & World Cup qualifiers — via web scraping, APIs, and open datasets.',
            "Engineered recent-form ratios (last-5 win/draw/loss rate), comparative Elo and xG deltas, 30/60-day Elo momentum, and odds-implied win/draw/away probabilities.",
            "Tuned Logistic Regression, Random Forest, and XGBoost per league with GridSearchCV, then validated on a strictly temporal split — trained on pre-2023 matches, tested only on 2023+ matches.",
            "Built a separate live-match model that layers in half-time score, cards, and live odds, refreshing predictions every minute during in-play matches.",
          ]}
          flow={[
            { label: "Data Collection", detail: "Web scraping + APIs + open datasets across 8 leagues" },
            { label: "Feature Engineering", detail: "Elo, xG, form ratios, odds-implied probabilities" },
            { label: "Model Training", detail: "LogReg / Random Forest / XGBoost, GridSearchCV, temporal split" },
            { label: "Live Match Engine", detail: "Half-time score, cards, live odds refresh predictions in-play" },
            { label: "iOS App", detail: "Swift client: match list, standings, pre-match & live predictions" },
          ]}
          tools={["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Flask", "SQLite", "Matplotlib", "Seaborn", "GridSearchCV", "Swift / Xcode"]}
          results={[
            "57.5% accuracy and 54.3% macro-F1 on 153 real matches the models had never seen (future-match test).",
            "67.8% accuracy and 65.7% macro-F1 for the live in-play model, using half-time and live-odds features.",
            "Random Forest won on macro-F1 in 6 of 8 leagues; Logistic Regression was selected for the English Premier League and Turkish Süper Lig; XGBoost underperformed on the Draw class and was dropped from the final deployment.",
          ]}
          charts={[
            {
              src: "/projects/football/confusion_matrix_all_leagues.png",
              alt: "Confusion matrix of match outcome predictions across all leagues",
              caption: "Confusion matrix, all leagues combined — “Draw” remains the hardest class.",
            },
            {
              src: "/projects/football/feature_importance.png",
              alt: "Feature importance ranking for the match prediction model",
              caption: "Feature importance — market-implied probabilities and xG differentials dominate.",
            },
          ]}
          githubUrl="https://github.com/elifdikmn/FootballMatchPrediction"
        />

        {/* ---------------- MNQ Tick Data ---------------- */}
        <motion.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="overflow-hidden rounded-[1.75rem] border p-6 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <SectionTag>Quantitative finance · Time series</SectionTag>
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--text-faint)" }}
            >
              <Clock3 className="h-4 w-4" /> Write-up in progress
            </span>
          </div>

          <h3 className="font-hero text-2xl font-semibold sm:text-3xl">MNQ Tick Data Analysis</h3>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--text-soft)" }}>
            A tick-level analysis of Micro E-mini Nasdaq-100 (MNQ) futures data. I&apos;m still finishing the
            full methodology write-up and pulling the final charts together, so this card is intentionally
            light for now — full results, visualizations, and code will replace this placeholder soon.
          </p>
        </motion.article>

        {/* ---------------- GPT Plugin Privacy ---------------- */}
        <motion.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="overflow-hidden rounded-[1.75rem] border p-6 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <SectionTag>Data privacy · NLP · RAG</SectionTag>
            <a
              href="https://github.com/elifdikmn/DataPrivacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
              style={{ color: "var(--accent-strong)" }}
            >
              <Github className="h-4 w-4" /> View repository <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <h3 className="font-hero text-2xl font-semibold sm:text-3xl">
            GPT Plugin Privacy Risk Analysis &amp; RAG Assistant
          </h3>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--text-soft)" }}>
            What do GPT plugins actually collect? I analyzed 12,811 parameter records from 4,592 real GPT
            plugins — statistics, classification models, and clustering — then built a Retrieval-Augmented
            Generation chatbot on top so anyone can ask the findings a question and get a grounded,
            chart-backed answer.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatPill value="7.3%" label="Sensitive data" />
            <StatPill value="68.9%" label="Model accuracy" />
            <StatPill value="90.3%" label="Never disclosed" />
            <StatPill value="12,811" label="Records analyzed" />
          </div>

          <button
            type="button"
            onClick={onOpenGptCaseStudy}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Open the full case study <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.article>

        {/* ---------------- SQL Job Market Analysis ---------------- */}
        <ProjectDeepDive
          index="04"
          tag="SQL · Job market analytics"
          title="Data Analyst Job Market Analysis"
          description="A SQL-only deep dive into 2023 remote Data Analyst job postings — no pandas, no notebooks, just CTEs, multi-table joins, and GROUP BY aggregations run directly in PostgreSQL."
          highlight="$184K–$256K top-10 salary range · SQL required in 8 of the 10 highest-paying postings"
          problem="Everyone has an opinion about which skills you 'need' for a data job. This project set out to answer that with real 2023 job-posting data instead of anecdotes — which roles pay the most, which skills actually show up in those roles, and where demand and pay genuinely overlap."
          approach={[
            "Queried a 2023 job-postings dataset directly in PostgreSQL — no pandas, no notebooks, just SQL end to end.",
            "Used CTEs, multi-table joins, and GROUP BY aggregations to isolate remote Data Analyst roles with disclosed salaries.",
            "Cross-referenced skill frequency against average salary to separate “in-demand” from “high-paying” — they turned out not to be the same list.",
          ]}
          flow={[
            { label: "Job Postings DB", detail: "2023 remote Data Analyst postings loaded into PostgreSQL" },
            { label: "SQL Analysis", detail: "CTEs, multi-table joins, GROUP BY aggregations" },
            { label: "Two Rankings", detail: "Skill demand (frequency) vs. skill pay (avg. salary)" },
            { label: "Insights", detail: "Where high demand and high pay actually overlap" },
          ]}
          tools={["SQL", "PostgreSQL", "VS Code", "Git / GitHub"]}
          results={[
            "Top 10 highest-paying remote Data Analyst postings ranged from $184K to $255,830.",
            "SQL was the most-requested skill among those top-paying postings, appearing in 8 of 10; Python and Tableau followed closely.",
            "By overall demand, SQL, Excel, Python, Tableau, and Power BI led — but the highest average salaries went to less common tools like PySpark ($208K), Bitbucket ($189K), and Couchbase ($160.5K), pointing toward cloud and engineering-adjacent skills as the real premium.",
          ]}
          charts={[
            {
              src: "/projects/sql-job-market/top_paying_roles.png",
              alt: "Bar chart of average salary for the top 10 highest-paying remote Data Analyst postings",
              caption: "Top 10 highest-paying remote Data Analyst postings, by average yearly salary.",
            },
            {
              src: "/projects/sql-job-market/top_skills_demand.png",
              alt: "Bar chart of the most frequently requested skills among those top-paying postings",
              caption: "Most-requested skills among the top 10 highest-paying postings — SQL leads at 8 of 10.",
            },
          ]}
          githubUrl="https://github.com/elifdikmn/SQL_Analyze_Job"
          background="var(--bg-soft)"
        />
      </div>
    </motion.div>
  );
}
