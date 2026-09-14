"use client";

import { motion, type Variants, easeOut } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock3, Github } from "lucide-react";

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
        <motion.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="overflow-hidden rounded-[1.75rem] border p-6 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <SectionTag>Sports analytics · Classical ML</SectionTag>
            <a
              href="https://github.com/elifdikmn/FootballMatchPrediction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
              style={{ color: "var(--accent-strong)" }}
            >
              <Github className="h-4 w-4" /> View repository <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <h3 className="font-hero text-2xl font-semibold sm:text-3xl">Football Match Prediction</h3>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--text-soft)" }}>
            A machine learning system that predicts Home Win / Draw / Away Win outcomes across eight major
            football leagues, using Elo ratings, rolling form, and expected-goals (xG) differentials as
            features. Logistic Regression, Random Forest, and XGBoost were each tuned per league with
            GridSearchCV, then evaluated on a strictly temporal train/test split — trained on pre-2023
            matches, tested only on matches that happened afterward.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatPill value="57.5%" label="Accuracy · 153 matches" />
            <StatPill value="54.3%" label="Macro F1 · 153 matches" />
            <StatPill value="67.8%" label="Accuracy · live model" />
            <StatPill value="65.7%" label="Macro F1 · live model" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <img
                src="/projects/football/confusion_matrix_all_leagues.png"
                alt="Confusion matrix of match outcome predictions across all leagues"
                className="w-full object-contain"
              />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                Confusion matrix, all leagues combined — “Draw” remains the hardest class.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <img
                src="/projects/football/feature_importance.png"
                alt="Feature importance ranking for the match prediction model"
                className="w-full object-contain"
              />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                Feature importance — market-implied probabilities and xG differentials dominate.
              </figcaption>
            </figure>
          </div>

          <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
            <strong style={{ color: "var(--text)" }}>Methodology:</strong> web-scraped + API-sourced match
            data (2014–2025) was engineered into recent-form ratios, comparative Elo/xG deltas, and
            odds-implied probabilities; Random Forest won in 6 of 8 leagues on macro-F1, Logistic Regression
            in 2 (EPL, Turkish Süper Lig), and XGBoost underperformed on the Draw class and was dropped. A
            separate live-match model layers in half-time score, cards, and live odds for in-play prediction.
          </p>
        </motion.article>

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
        <motion.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="overflow-hidden rounded-[1.75rem] border p-6 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <SectionTag>SQL · Job market analytics</SectionTag>
            <a
              href="https://github.com/elifdikmn/SQL_Analyze_Job"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
              style={{ color: "var(--accent-strong)" }}
            >
              <Github className="h-4 w-4" /> View repository <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <h3 className="font-hero text-2xl font-semibold sm:text-3xl">Data Analyst Job Market Analysis</h3>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--text-soft)" }}>
            A SQL-only deep dive into 2023 remote Data Analyst job postings — no pandas, no notebooks, just
            CTEs, multi-table joins, and GROUP BY aggregations run directly in PostgreSQL — to find where
            skill demand and skill pay actually overlap.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatPill value="$184K–$256K" label="Top 10 salary range" />
            <StatPill value="8 / 10" label="Top postings requiring SQL" />
            <StatPill value="$208K" label="Highest-paying skill · PySpark" />
            <StatPill value="7,291" label="SQL job-posting mentions" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <img
                src="/projects/sql-job-market/top_paying_roles.png"
                alt="Bar chart of average salary for the top 10 highest-paying remote Data Analyst postings"
                className="w-full object-contain"
              />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                Top 10 highest-paying remote Data Analyst postings, by average yearly salary.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <img
                src="/projects/sql-job-market/top_skills_demand.png"
                alt="Bar chart of the most frequently requested skills among those top-paying postings"
                className="w-full object-contain"
              />
              <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                Most-requested skills among the top 10 highest-paying postings — SQL leads at 8 of 10.
              </figcaption>
            </figure>
          </div>

          <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
            <strong style={{ color: "var(--text)" }}>Methodology:</strong> queried a 2023 job-postings dataset
            directly in PostgreSQL to isolate remote Data Analyst roles with disclosed salaries, joined
            against their listed skills, then cross-referenced skill frequency against average salary —
            demand leaders (SQL, Excel, Python, Tableau, Power BI) turned out not to be the same list as the
            highest-paying skills (PySpark $208K, Bitbucket $189K, Couchbase $160.5K), which skew toward
            cloud and engineering-adjacent tools.
          </p>
        </motion.article>
      </div>
    </motion.div>
  );
}
