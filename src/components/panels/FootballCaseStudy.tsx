"use client";

import { motion, easeOut, type Variants } from "framer-motion";
import { ArrowUpRight, FileText, Github, ArrowLeft } from "lucide-react";
import FootballAppPhone from "@/components/FootballAppPhone";

const CHART_BASE = "/projects/football";
const PAPER_URL = `${CHART_BASE}/FootballMatchPrediction-Thesis.pdf`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

function SectionShell({
  index,
  total = 5,
  eyebrow,
  title,
  children,
  tone = "bg",
}: {
  index: string;
  total?: number;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "bg" | "surface";
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className="rounded-[2rem] border px-5 py-10 sm:px-10 sm:py-14"
      style={{
        borderColor: "var(--border)",
        background: tone === "surface" ? "var(--surface)" : "var(--bg-soft)",
      }}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="font-hero text-sm font-semibold tracking-[0.2em]" style={{ color: "var(--accent-strong)" }}>
          {index} / {String(total).padStart(2, "0")}
        </span>
        <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          {eyebrow}
        </span>
      </div>
      <h3 className="font-hero mb-6 text-[clamp(24px,4vw,38px)] font-semibold italic tracking-tight">{title}</h3>
      {children}
    </motion.section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-hero text-[clamp(36px,6vw,56px)] font-bold leading-none" style={{ color: "var(--accent-strong)" }}>
        {value}
      </p>
      <p className="mt-2 max-w-[28ch] text-sm" style={{ color: "var(--text-soft)" }}>
        {label}
      </p>
    </div>
  );
}

function Chart({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
      <img src={src} alt={alt} className="w-full object-contain" />
      {caption && (
        <figcaption className="border-t px-4 py-3 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function FeaturePills({ features }: { features: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {features.map((f) => (
        <code
          key={f}
          className="rounded-full border px-2.5 py-1 text-[11px]"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-soft)" }}
        >
          {f}
        </code>
      ))}
    </div>
  );
}

const PREMATCH_FEATURES = [
  "WinRateDiff", "DrawRateDiff", "Last5_WinRate_Home", "Last5_DrawRate_Home", "Last5_LossRate_Home",
  "Last5_WinRate_Away", "Last5_DrawRate_Away", "Last5_LossRate_Away", "Last5_Goals_Home", "Last5_Goals_Away",
  "HomeProb", "AwayProb", "DrawProb", "EloChange60_Away", "HxG", "AxG", "xG_diff", "HomeRecentGoalDiff",
  "AwayRecentGoalDiff", "Home_Wins", "Away_Wins", "Home_Draws", "Away_Draws", "EloChange60_Home",
  "EloChange30_Home", "EloChange30_Away", "EloDiff",
];

const LIVE_FEATURES = ["HTR_code", "HTHG", "HTAG", "AwayProb", "HomeProb", "DrawProb", "HY", "AY", "AR", "HR"];

export default function FootballCaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl pb-24" style={{ color: "var(--text)" }}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold opacity-80 transition hover:opacity-100"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to projects
        </button>
        <div className="flex flex-wrap gap-2">
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            <FileText className="h-4 w-4" /> Read the paper <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/elifdikmn/FootballMatchPrediction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            <Github className="h-4 w-4" /> Repository <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--text-faint)" }}>
          Case study
        </p>
        <h2 className="font-hero text-[clamp(30px,6vw,54px)] font-semibold italic leading-[1.05] tracking-tight">
          Football Match Prediction
        </h2>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          A machine learning system that predicts Home Win / Draw / Away Win outcomes across eight major
          football leagues, backed by an iOS app — evaluated strictly on matches the models had never seen.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 01 — Hook */}
        <SectionShell index="01" eyebrow="The hook" title="How hard is this, really?" tone="surface">
          <div className="grid items-center gap-8 sm:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="font-hero text-[clamp(64px,14vw,140px)] font-bold leading-[0.9]" style={{ color: "var(--accent-strong)" }}>
                57.5%
              </p>
              <p className="mt-4 max-w-[50ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
                accuracy on 153 real matches the models had <strong style={{ color: "var(--text)" }}>never seen</strong> —
                trained only on pre-2023 matches, tested only on 2023 and later.
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text-soft)" }}>
              That is the honest, harder number. A separate live in-play model — which can also see the
              half-time score and live odds once a match has started — reaches <strong style={{ color: "var(--text)" }}>67.8%</strong>.
              Both beat a random guess across three outcomes (33%), but football stays genuinely noisy: form,
              injuries, market sentiment, and plain chance all blend together.
            </div>
          </div>
        </SectionShell>

        {/* 02 — Data, pipeline & features */}
        <SectionShell index="02" eyebrow="Data & features" title="Eight leagues, one pipeline">
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            Historical match data (2014–2025) was collected across eight competitions — Premier League, La
            Liga, Serie A, Bundesliga, Ligue 1, Turkish Süper Lig, plus FIFA Club World Cup &amp; World Cup
            qualifiers — via web scraping, APIs, and open datasets. Because every league&apos;s source data used
            different column names and formats, each dataset went through the same standardization pass:
            date formatting into a uniform <code>datetime</code>, team-name mapping so the same club matches
            across sources, label encoding, and column/data-type normalization — before any feature was
            engineered.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Pre-match model — 27 features
              </p>
              <FeaturePills features={PREMATCH_FEATURES} />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Live in-play model — 10 features
              </p>
              <FeaturePills features={LIVE_FEATURES} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                <code>HTR_code</code>, <code>HTHG</code>, and <code>HTAG</code> (half-time result, home/away
                goals) are the strongest live predictors, alongside real-time odds converted to normalized
                probabilities and disciplinary counts (yellow/red cards).
              </p>
            </div>
          </div>
        </SectionShell>

        {/* 03 — System architecture */}
        <SectionShell index="03" eyebrow="System architecture" title="How the app talks to the database and the model" tone="surface">
          <p className="mb-8 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            The iOS app leans on a cache-first design: every screen checks the database before ever calling
            the ML model or a live API, so repeat views stay fast and cheap.
          </p>
          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Opening a match&apos;s <strong style={{ color: "var(--text)" }}>Detail</strong> page fetches
                standings directly, then branches: if events for that fixture are already cached, they&apos;re
                shown immediately; otherwise they&apos;re pulled from the live API and saved back for next time.
              </p>
              <Chart
                src={`${CHART_BASE}/sequence_diagram_detail.png`}
                alt="UML sequence diagram for the match detail page, showing UI Controller, MatchDetailController, Database, and API interactions"
                caption="Sequence diagram — viewing a match's Detail page (standings + events)."
              />
            </div>
            <div>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Predictions follow the same cache-first pattern: on launch, the app loads upcoming fixtures and
                checks whether a prediction already exists per <code>FixtureID</code>. If not, the ML model
                generates one on the spot, and it&apos;s saved to the database immediately after.
              </p>
              <Chart
                src={`${CHART_BASE}/sequence_diagram_prediction.png`}
                alt="UML sequence diagram for match prediction, showing UI Controller, Database, and ML Model interactions"
                caption="Sequence diagram — generating (or reusing) a pre-match prediction."
              />
            </div>
            <div>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Four tables back all of this: <code>fixtures</code> is the primary table (teams, goals, odds,
                predicted label, status); <code>events</code> and <code>prediction_info</code> both link to it
                by <code>FixtureID</code>; <code>standings</code> is independent, used only to display league
                tables on the frontend.
              </p>
              <Chart
                src={`${CHART_BASE}/er_diagram.png`}
                alt="Entity-relationship diagram of the database schema, showing fixtures, events, prediction_info, and standings tables"
                caption="Entity-Relationship diagram of the database schema."
              />
            </div>
          </div>
        </SectionShell>

        {/* 04 — Model training & results */}
        <SectionShell index="04" eyebrow="Model training & results" title="Three models, evaluated per league">
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            Logistic Regression, Random Forest, and XGBoost were each tuned per league with GridSearchCV, then
            validated on a strictly temporal split — trained on pre-2023 matches, tested only on 2023 and
            later, so no model ever saw the future during training.
          </p>
          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            <Stat value="6 / 8" label="leagues where Random Forest won on macro-F1" />
            <Stat value="2 / 8" label="leagues won by Logistic Regression: EPL & Turkish Süper Lig" />
            <Stat value="0 / 8" label="leagues where XGBoost was selected — it underperformed on the Draw class and was dropped" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Chart
              src={`${CHART_BASE}/confusion_matrix_all_leagues.png`}
              alt="Confusion matrix of match outcome predictions across all leagues"
              caption="Confusion matrix, all leagues combined — “Draw” remains the hardest class."
            />
            <Chart
              src={`${CHART_BASE}/feature_importance.png`}
              alt="Feature importance ranking for the pre-match prediction model"
              caption="Pre-match model feature importance — market-implied probabilities and xG differentials dominate."
            />
            <Chart
              src={`${CHART_BASE}/live_feature_importance.png`}
              alt="Feature importance ranking for the live in-play match prediction model"
              caption="Live-match model feature importance — half-time result code and score dominate."
            />
          </div>
        </SectionShell>

        {/* 05 — Try it yourself */}
        <SectionShell index="05" eyebrow="Try it yourself" title="The app" tone="surface">
          <p className="mx-auto mb-8 max-w-[60ch] text-center text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            Real screenshots from the actual iOS app — scroll and tap through it below, from browsing
            finished matches to live in-play predictions.
          </p>
          <FootballAppPhone />
        </SectionShell>
      </div>
    </div>
  );
}
