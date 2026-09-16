"use client";

import { motion, easeOut, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Quote } from "lucide-react";
import ChatDemoPhone from "@/components/ChatDemoPhone";
import { CHART_BASE } from "@/lib/gptPrivacyContent";

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
        <span
          className="font-hero text-sm font-semibold tracking-[0.2em]"
          style={{ color: "var(--accent-strong)" }}
        >
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
      <p className="mt-2 max-w-[24ch] text-sm" style={{ color: "var(--text-soft)" }}>
        {label}
      </p>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 text-center sm:text-left">
      <p
        className="font-hero truncate text-xl font-bold leading-tight sm:text-2xl md:text-3xl"
        style={{ color: "var(--accent-strong)" }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs leading-snug sm:text-sm" style={{ color: "var(--text-soft)" }}>
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

export default function GptPrivacyCaseStudy({ onBack }: { onBack: () => void }) {
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
        <a
          href="https://github.com/elifdikmn/GPTDataPrivacy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
          style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
        >
          <Github className="h-4 w-4" /> Repository <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--text-faint)" }}>
          Case study
        </p>
        <h2 className="font-hero text-[clamp(30px,6vw,54px)] font-semibold italic leading-[1.05] tracking-tight">
          GPT Plugin Privacy Risk Analysis &amp; RAG Assistant
        </h2>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          What data do GPT plugins actually collect — and would you ever find out from reading their privacy
          policy? A data science analysis of 12,811 real plugin parameters, turned into a chatbot you can
          question yourself.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 01 — Hook */}
        <SectionShell index="01" eyebrow="The hook" title="One number to start with" tone="surface">
          <div className="grid items-center gap-8 sm:grid-cols-[1.1fr_1fr]">
            <div>
              <p
                className="font-hero text-[clamp(64px,14vw,140px)] font-bold leading-[0.9]"
                style={{ color: "var(--accent-strong)" }}
              >
                90.3%
              </p>
              <p className="mt-4 max-w-[50ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
                of the GPT-plugin data parameters audited against their maker&apos;s own privacy policy were{" "}
                <strong style={{ color: "var(--text)" }}>never disclosed at all</strong> — even though the plugin
                was actively collecting that data from users.
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text-soft)" }}>
              <Quote className="mb-2 h-5 w-5" style={{ color: "var(--accent)" }} />
              That figure comes from a smaller, separate audit of 308 comparable parameters — one of six
              findings in this project, not the headline dataset. The other 12,811-record analysis is where
              the rest of this case study lives, starting below.
            </div>
          </div>
        </SectionShell>

        {/* 02 — Dataset & Taxonomy */}
        <SectionShell index="02" eyebrow="Dataset & taxonomy" title="12,811 parameters, 4,592 plugins, 25 categories">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="mb-5 max-w-[55ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
                The dataset comes from{" "}
                <a
                  href="https://doi.org/10.1145/3730567.3732912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-2"
                  style={{ color: "var(--accent-strong)" }}
                >
                  Wu et al. (2025), &ldquo;An In-Depth Investigation of Data Collection in LLM App Ecosystems,&rdquo;
                  IMC &apos;25
                </a>{" "}
                — 12,811 parameter-level records collected by 4,592 unique GPT plugins (Actions), each labeled
                with one of 25 <code>main_data_type</code> categories.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <MiniStat value="12,811" label="parameter records" />
                <MiniStat value="4,592" label="unique plugins" />
                <MiniStat value="25" label="data categories" />
              </div>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Four of those 25 categories — Security credentials, Personal information, Health information,
                and Finance information — are treated as <strong style={{ color: "var(--text)" }}>&ldquo;sensitive&rdquo;</strong>{" "}
                in this project, a methodological choice modeled on GDPR/HIPAA&apos;s &ldquo;special category
                data&rdquo; concept rather than a label present in the source data.
              </p>
            </div>
            <Chart
              src={`${CHART_BASE}/rq1_category_distribution.png`}
              alt="Bar chart of all 25 data categories requested by GPT plugins, sensitive ones highlighted in red"
              caption="Full category breakdown — the four sensitive categories are highlighted in red."
            />
          </div>
        </SectionShell>

        {/* 03 — Methodology */}
        <SectionShell index="03" eyebrow="Methodology" title="EDA → statistics → two models → clustering" tone="surface">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Step 1 — EDA
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Category distribution, missing-value handling, and identifying which categories count as
                sensitive under the GDPR/HIPAA-inspired definition.
              </p>
              <Chart src={`${CHART_BASE}/rq1_category_distribution.png`} alt="Category distribution chart" />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Step 2 — Statistical test
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                A chi-square test of independence (with Cramér&apos;s V for effect size) comparing how often
                sensitive vs. non-sensitive parameters get a written description.
              </p>
              <Chart src={`${CHART_BASE}/rq2_description_rate.png`} alt="Description rate comparison chart" />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Step 3 — Classification, then validated
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                TF-IDF + Logistic Regression baseline vs. spaCy word-embedding vectors, then a held-out
                validation split selects a stronger word + character, class-balanced model — confirmed with
                2,000-resample bootstrap confidence intervals.
              </p>
              <Chart src={`${CHART_BASE}/rq3_validation_confidence_intervals.png`} alt="Confidence-interval chart comparing baseline and validated model" />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Step 4 — Clustering
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                Plugins profiled by the proportion of each category they collect (deduplicated
                parameter-plugin pairs), then K-Means clustered — K chosen by silhouette score across K=2 to
                K=10.
              </p>
              <Chart src={`${CHART_BASE}/rq4_silhouette_scores.png`} alt="Silhouette score chart used to choose K" />
            </div>
          </div>
        </SectionShell>

        {/* 04 — Key Findings (largest section) */}
        <SectionShell index="04" eyebrow="Key findings" title="Five research questions, five grounded answers">
          <div className="flex flex-col gap-10">
            {/* RQ1 */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                  RQ1 — Category distribution
                </p>
                <Stat value="7.3%" label="of all 12,811 records fall into a sensitive category (931 records)" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  The distribution is heavily skewed — the top 3 categories (App usage data, Identifier,
                  Other) make up 48.2% of everything collected, while sensitive data is a thin but real
                  slice underneath.
                </p>
              </div>
              <Chart
                src={`${CHART_BASE}/rq1_sensitive_breakdown.png`}
                alt="Bar chart ranking sensitive data categories by frequency"
                caption="Personal information (435) and Security credentials (276) dominate the sensitive share."
              />
            </div>

            {/* RQ2 */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="lg:order-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                  RQ2 — Description-writing rate
                </p>
                <Stat value="p ≈ 0.006" label="statistically significant — but Cramér's V ≈ 0.024 means the effect is negligible" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  81.2% of sensitive parameters have a description, vs. 84.7% of non-sensitive ones. The gap
                  is real by the test, but far too small to say sensitivity meaningfully predicts whether a
                  plugin bothers documenting a parameter.
                </p>
              </div>
              <div className="lg:order-1">
                <Chart
                  src={`${CHART_BASE}/rq2_description_rate.png`}
                  alt="Stacked bar chart comparing description rates"
                  caption="A 3.5-point gap that's statistically significant but practically tiny."
                />
              </div>
            </div>

            {/* RQ3 */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                  RQ3 — Predicting category from text
                </p>
                <Stat value="76.2%" label="validated accuracy · 64.2% macro-F1 (95% CI) — up from a 68.9% / 46.8% baseline" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  A held-out validation split selects a word + character, class-balanced model over the
                  original word-only baseline and a spaCy-embedding comparison — a confirmed +7.3-point
                  accuracy gain (bootstrap 95% CI clear of zero). Sensitive-category recall improves the
                  most: Finance information alone goes from 14.3% to 64.3%. Both models still fall back on
                  &ldquo;Other&rdquo; a lot when uncertain — visible as the bright column in the confusion
                  matrix below.
                </p>
                <p className="mt-3 text-xs" style={{ color: "var(--text-faint)" }}>
                  Aside: of the 276 Security credentials records, only 18 are literally typed
                  &ldquo;Password&rdquo; — spanning 35 distinct parameter-plugin pairs across 29 plugins,
                  mostly database and SMPP credentials.
                </p>
              </div>
              <Chart
                src={`${CHART_BASE}/rq3_confusion_matrix.png`}
                alt="Confusion matrix for the category classifier"
                caption="Row-normalized confusion matrix — the bright 'Other' column shows where the model hedges."
              />
            </div>

            {/* RQ4 */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="lg:order-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                  RQ4 — Clustering
                </p>
                <Stat value="0%–35.1%" label="sensitive-data share spread gradually across 10 clusters — no clean binary split" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  Clustering (on 30,478 deduplicated parameter-plugin pairs) surfaces functional groups —
                  personal info &amp; messaging, security credentials &amp; app usage, general-purpose —
                  instead of a tidy &ldquo;risky vs. safe&rdquo; divide. The two highest-share clusters (2 and
                  1) cover 360 plugins — about 12.1% of eligible plugins — which is a very different ranking
                  from the two largest clusters by plugin count (about 69.8% combined).
                </p>
              </div>
              <div className="lg:order-1">
                <Chart
                  src={`${CHART_BASE}/rq4_cluster_sensitivity.png`}
                  alt="Bar chart of sensitive-data share by cluster"
                  caption="Clusters ranked by sensitive-data share — a gradient, not a binary split."
                />
              </div>
            </div>

            {/* RQ5 */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                  RQ5 — Reclassifying &ldquo;Other&rdquo;
                </p>
                <Stat value="11.6%" label="of 3,544 'Other' records get a high-confidence re-classification (411 records)" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  Most &ldquo;Other&rdquo; records sit around 0.2 confidence — the model genuinely doesn&apos;t
                  know. But the confident subset does catch real mislabeled sensitive data: parameters
                  literally named <code>email</code>, <code>key</code>, or <code>token</code>.
                </p>
              </div>
              <Chart
                src={`${CHART_BASE}/rq5_other_confidence_distribution.png`}
                alt="Histogram of model confidence for reclassifying Other records"
                caption="Confidence scores cluster near 0.2 — well below the 0.5 threshold for reclassification."
              />
            </div>

            {/* Bonus RQ6 */}
            <div
              className="grid gap-6 rounded-2xl border p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
              style={{ borderColor: "var(--accent-soft-2)", background: "var(--accent-soft)" }}
            >
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                  Bonus finding — RQ6, privacy policy audit
                </p>
                <Stat value="90.3%" label="of 308 audited parameters are never disclosed in the plugin's actual privacy policy" />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  Using a separate audit dataset from the same source paper, only 5.2% are clearly disclosed;
                  the rest are vague (2.3%), ambiguous (0.3%), or incorrectly described (1.9%). This sample
                  is smaller and not directly comparable to the 12,811-record dataset above.
                </p>
              </div>
              <Chart
                src={`${CHART_BASE}/rq6_policy_disclosure.png`}
                alt="Bar chart of privacy policy disclosure status"
                caption="308 audited parameters, by disclosure status."
              />
            </div>
          </div>
        </SectionShell>

        {/* 05 — Try it yourself */}
        <SectionShell index="05" eyebrow="Try it yourself" title="Ask the assistant" tone="surface">
          <p className="mx-auto mb-8 max-w-[60ch] text-center text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            The real project pairs this analysis with a Retrieval-Augmented Generation chatbot — FAISS
            retrieval over the notebooks&apos; findings, Claude Haiku for phrasing, and a verified facts table
            where every number in the answer is inserted from that table by code, never typed by the model.
            Below is an interactive demo of that interface.
          </p>
          <ChatDemoPhone />
        </SectionShell>
      </div>
    </div>
  );
}
