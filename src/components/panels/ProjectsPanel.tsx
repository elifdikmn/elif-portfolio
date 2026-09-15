"use client";

import { useState } from "react";
import { motion, type Variants, easeOut } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import ComputerMockup from "@/components/ComputerMockup";
import AppShowcasePhone from "@/components/AppShowcasePhone";

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
type AppScreen = { src: string; alt: string; caption: string };

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
  moreCharts,
  appScreens,
  dashboardUrl,
  dashboardAddress,
  githubUrl,
  background = "var(--surface)",
  children,
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
  moreCharts?: Chart[];
  appScreens?: AppScreen[];
  dashboardUrl?: string;
  dashboardAddress?: string;
  githubUrl?: string;
  background?: string;
  children?: React.ReactNode;
}) {
  const [showMore, setShowMore] = useState(false);
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

      {charts.length > 0 && (
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
      )}

      {dashboardUrl && (
        <div className="relative mt-10">
          <SubLabel>Plots</SubLabel>
          <ComputerMockup src={dashboardUrl} title={`${title} — interactive dashboard`} addressLabel={dashboardAddress ?? dashboardUrl} />
          <p className="mt-3 text-center text-xs" style={{ color: "var(--text-faint)" }}>
            Live prototype of the actual dashboard, running right here — click through its own nav to explore other sections.
          </p>
        </div>
      )}

      {moreCharts && moreCharts.length > 0 && (
        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)", background: "var(--surface)" }}
          >
            {showMore ? "Hide" : "Show"} more visualizations from the project
            {showMore ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {showMore && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {moreCharts.map((c) => (
                <figure key={c.src} className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "var(--border)" }}>
                  <img src={c.src} alt={c.alt} className="w-full object-contain" />
                  <figcaption className="px-3 py-2 text-xs" style={{ color: "var(--text-faint)" }}>
                    {c.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      )}

      {appScreens && appScreens.length > 0 && (
        <div className="relative mt-10">
          <SubLabel>The app</SubLabel>
          <AppShowcasePhone screens={appScreens} />
        </div>
      )}

      {githubUrl && (
        <div className="relative mt-10 flex flex-wrap items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            <Github className="h-4 w-4" /> View on GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
          {children}
        </div>
      )}
      {!githubUrl && children && <div className="relative mt-10 flex flex-wrap items-center gap-3">{children}</div>}
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
            "The iOS app includes a \"Check Out Why\" explainability view, surfacing the top features behind each individual prediction instead of a black-box percentage.",
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
          moreCharts={[
            {
              src: "/projects/football/live_feature_importance.png",
              alt: "Feature importance ranking for the live in-play match prediction model",
              caption: "Live-match model feature importance — half-time result code and score dominate.",
            },
            {
              src: "/projects/football/system_architecture.png",
              alt: "System architecture pipeline diagram, from web scraping to prediction",
              caption: "End-to-end pipeline: web scraping → data collection → preprocessing → feature engineering → ML → prediction.",
            },
            {
              src: "/projects/football/random_forest_illustration.png",
              alt: "Illustration of how a Random Forest classifier aggregates multiple decision trees",
              caption: "Random Forest — the model selected for 6 of 8 leagues.",
            },
            {
              src: "/projects/football/logistic_regression_sigmoid.png",
              alt: "Sigmoid function curve used in logistic regression",
              caption: "The sigmoid function — Logistic Regression, selected for the EPL and Turkish Süper Lig.",
            },
          ]}
          appScreens={[
            {
              src: "/projects/football/app/home-finished-matches.png",
              alt: "iOS app home page showing finished matches with win/draw/loss probability bars",
              caption: "Home — Finished Matches",
            },
            {
              src: "/projects/football/app/filter-leagues.png",
              alt: "iOS app league filter menu",
              caption: "Filter Leagues",
            },
            {
              src: "/projects/football/app/detail-standings.png",
              alt: "iOS app match detail page showing league standings",
              caption: "Match Detail — Standings",
            },
            {
              src: "/projects/football/app/detail-events.png",
              alt: "iOS app match detail page showing a timeline of match events",
              caption: "Match Detail — Events",
            },
            {
              src: "/projects/football/app/live-matches.png",
              alt: "iOS app live matches list with real-time win/draw/loss probabilities",
              caption: "Live Matches",
            },
          ]}
          githubUrl="https://github.com/elifdikmn/FootballMatchPrediction"
        />

        {/* ---------------- MNQ Tick Data ---------------- */}
        <ProjectDeepDive
          index="02"
          tag="Quantitative finance · Time series"
          title="MNQ & MES Tick Data Statistical Analysis"
          description="A statistical breakdown of intraday futures market structure, built from tick-level data — how much price rotates each session, when volume spikes, whether one session's direction predicts the next, and how the Initial Balance range classifies a day's volatility regime."
          highlight="NY Opening Hour rotations run 58–78% larger than the rest of the session, on both instruments"
          problem="Most 'what usually happens during the trading day' advice is anecdotal. This project quantifies actual intraday futures market structure straight from tick data — rotation size by session, volume timing, cross-session directional edge, and volatility regime — for MNQ (Jun 23–Sep 7, 2025, 56 days) and MES (Aug 11–Sep 7, 2025, ~20 days)."
          approach={[
            "Resampled tick-level OHLCV into 1-min, 30-min, and 5-second bars per instrument (75,218 1-min bars / 881,393 5-second bars for MNQ alone).",
            "Measured harmonic rotations (confirmed swing high-to-low moves) and 1-minute fractal pivots per session — Asia / London / NY, full session vs. opening hour — computing mean, median, P75, and P90.",
            "Classified each day's Initial Balance (first 60 min after NYSE open) as Compressed / Normal / Expanded using ±1 standard deviation cutoffs, and tracked VPOC (Volume Point of Control) crossings per day type.",
            "Computed conditional probabilities (e.g. P(NY up | London up)) and Pearson correlations for both returns and volatility across every session pair.",
          ]}
          flow={[
            { label: "Data Collection", detail: "Tick-level OHLCV for MNQ & MES, resampled to 1-min/30-min/5s" },
            { label: "Rotation Analysis", detail: "Harmonic swings + 1-min fractal pivots, per session" },
            { label: "IB & VPOC Regime", detail: "Compressed/Normal/Expanded via ±1σ on Initial Balance range" },
            { label: "Cross-Session Stats", detail: "Conditional probabilities + return/volatility correlations" },
            { label: "Interactive Dashboard", detail: "Chart.js app for exploring every finding by session" },
          ]}
          tools={["Python", "pandas", "NumPy", "Tick-level OHLCV data", "Chart.js", "Correlation & conditional-probability analysis"]}
          results={[
            "NY Opening Hour rotations are the standout edge on both instruments: MNQ median 24.5 pts (78% larger than the full NY session's 13.75 pts); MES median 4.75 pts (58% larger than 3.00 pts).",
            "80.4% of MNQ days classify as Normal Initial Balance (55–207 pt range, ~29 VPOC crosses/day) — the dominant regime, vs. only 5.4% Compressed and 14.3% Expanded.",
            "Return correlations between sessions sit near zero (0.01–0.09) — one session's direction barely predicts the next. Volatility correlations are the real signal: Asia→London r=0.51, London→NY r=0.47 for MNQ.",
            "09:30 (NYSE open) volume is ~40× the overnight baseline for MNQ and ~23× for MES — by a wide margin the single highest-liquidity minute of the day.",
          ]}
          charts={[]}
          dashboardUrl="/projects/mnq/pareto-stat-dashboard.html"
          dashboardAddress="pareto-stat.local/mnq-mes"
          background="var(--bg-soft)"
        />

        {/* ---------------- GPT Plugin Privacy ---------------- */}
        <ProjectDeepDive
          index="03"
          tag="Data privacy · NLP · RAG"
          title="GPT Plugin Privacy Risk Analysis & RAG Assistant"
          description="What do GPT plugins actually collect — and would you ever find out from reading their privacy policy? A statistics + ML analysis of 12,811 real plugin parameters, turned into a Retrieval-Augmented Generation chatbot you can question yourself."
          highlight="90.3% of audited parameters were never disclosed in the plugin's own privacy policy"
          problem="GPT plugins (Actions) can request almost anything from a user, but there's no standard way to see what a plugin actually collects in aggregate, or whether its privacy policy is honest about it. This project set out to quantify that gap across thousands of real plugins instead of a handful of manual reads."
          approach={[
            "Sourced 12,811 parameter-level records from 4,592 real GPT plugins (Wu et al. 2025, IMC '25), labeled across 25 data categories.",
            "Defined 4 categories as 'sensitive' using a GDPR/HIPAA-style 'special category data' definition, then ran a chi-square test on whether plugins document sensitive parameters less often.",
            "Trained two independent classifiers (TF-IDF+LogReg vs. spaCy embeddings+LogReg) to predict a parameter's category from its name alone, and K-Means clustered plugins by their category mix.",
            "Built a RAG chatbot on top: FAISS retrieval over three indices (records, findings, policy audit), Claude Haiku for phrasing, and a verified facts table that a post-hoc checker cross-references against every generated number.",
          ]}
          flow={[
            { label: "EDA", detail: "Category distribution + sensitive-data taxonomy" },
            { label: "Statistical test", detail: "Chi-square + Cramér's V on description-writing rates" },
            { label: "Classification", detail: "TF-IDF+LogReg vs. spaCy embeddings, 25-class" },
            { label: "Clustering", detail: "K-Means (K=2–10) profiled by category mix" },
            { label: "RAG assistant", detail: "FAISS + Claude Haiku, grounded in a facts table" },
          ]}
          tools={["Python", "pandas", "NumPy", "scikit-learn", "spaCy", "FAISS", "sentence-transformers", "Anthropic Claude API", "FastAPI", "React"]}
          results={[
            "Only 7.3% of all 12,811 records (931) fall into a sensitive category — but 90.3% of a separate, audited sample were never disclosed in the plugin's actual privacy policy at all.",
            "TF-IDF + Logistic Regression predicts a parameter's category from its name alone at 68.9% accuracy (46.8% macro-F1) on the 25-class problem.",
            "Clustering surfaces functional groups (finance, travel, messaging) with sensitive-data share spread gradually from 0% to 16.1% — no clean 'risky vs. safe' split.",
          ]}
          charts={[
            {
              src: "/projects/gpt-privacy/rq1_category_distribution.png",
              alt: "Bar chart of the 25 data categories requested by GPT plugins, sensitive ones highlighted",
              caption: "All 25 data categories, sorted by record count — four sensitive categories highlighted.",
            },
            {
              src: "/projects/gpt-privacy/rq3_confusion_matrix.png",
              alt: "Confusion matrix for the category classifier",
              caption: "Confusion matrix for the TF-IDF + Logistic Regression classifier.",
            },
          ]}
          githubUrl="https://github.com/elifdikmn/DataPrivacy"
        >
          <button
            type="button"
            onClick={onOpenGptCaseStudy}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            Open the full 6-part case study <ArrowUpRight className="h-4 w-4" />
          </button>
        </ProjectDeepDive>

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
