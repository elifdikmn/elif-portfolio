// Grounded content for the GPT Plugin Privacy Risk Analysis & RAG Assistant case study.
// Every number here is read directly from elifdikmn/DataPrivacy's notebooks and
// backend/app/project_facts.json — nothing is invented for presentation purposes.

export const CHART_BASE = "/projects/gpt-privacy";

export const chatSuggestions: {
  q: string;
  a: string;
  chart?: string;
  chartAlt?: string;
}[] = [
  {
    q: "What data are collected by GPT Actions?",
    a: "Across 12,811 parameter records from 4,592 plugins, the distribution is skewed: App usage data (20.1%), Identifier (14.7%), and Other (13.4%) alone account for 48.2% of everything collected. The 25 categories come straight from the source dataset's own taxonomy.",
    chart: `${CHART_BASE}/rq1_category_distribution.png`,
    chartAlt: "Bar chart of the 25 data categories requested by GPT plugins, sorted by record count",
  },
  {
    q: "What percentage of collected data is sensitive?",
    a: "7.3% (931 of 12,811 records) falls into one of four sensitive categories — Security credentials, Personal information, Health information, and Finance information — defined using GDPR/HIPAA's 'special category data' concept.",
    chart: `${CHART_BASE}/rq1_category_distribution.png`,
    chartAlt: "Category distribution chart with the four sensitive categories highlighted in red",
  },
  {
    q: "Which sensitive data types appear most often?",
    a: "Personal information leads at 435 records (3.4%), then Security credentials at 276 (2.15%), Finance information at 138 (1.08%), and Health information at 82 (0.64%).",
    chart: `${CHART_BASE}/rq1_sensitive_breakdown.png`,
    chartAlt: "Bar chart ranking the four sensitive data categories by record count",
  },
  {
    q: "Do plugins write descriptions less often for sensitive parameters?",
    a: "Barely. 81.2% of sensitive parameters have a description vs. 84.7% of non-sensitive ones — a chi-square test says that gap is statistically significant (p ≈ 0.006), but the effect size is negligible (Cramér's V ≈ 0.024). In plain terms: significance isn't the same as importance here.",
    chart: `${CHART_BASE}/rq2_description_rate.png`,
    chartAlt: "Stacked bar chart comparing description-writing rates for sensitive vs non-sensitive parameters",
  },
  {
    q: "How accurately can a parameter's category be predicted from its name?",
    a: "The selected model is a word+character-balanced text classifier: 76.2% accuracy and 64.2% macro-F1 on the 25-class problem — beating the TF-IDF + Logistic Regression baseline (68.9% / 46.8%) by +7.3 and +17.5 points. The gain is concentrated where it matters most: recall on the four sensitive categories jumps from 14–76% under the baseline to 64–95% under the selected model. An earlier spaCy word-embedding variant trailed both at 54.8% accuracy / 42.5% macro-F1 and was dropped.",
    chart: `${CHART_BASE}/rq3_model_comparison.png`,
    chartAlt: "Grouped bar chart comparing accuracy, macro-F1 and weighted-F1 across the TF-IDF baseline, the dropped spaCy-embedding variant, and the selected word+character-balanced model",
  },
  {
    q: "Which words predict sensitive categories?",
    a: "Exactly the words you'd guess, which is reassuring: 'key', 'token', and 'password' drive Security credentials; 'email', 'gender', and 'age' drive Personal information; 'patient' dominates Health information; 'currency' and 'price' drive Finance information.",
    chart: `${CHART_BASE}/rq3_feature_importance.png`,
    chartAlt: "Four small bar charts of the top predictive words for each sensitive category",
  },
  {
    q: "Do natural risky vs. safe clusters emerge among plugins?",
    a: "No clean binary split. K-Means (K=10, chosen by silhouette score) surfaces functional groups instead — finance, travel, messaging, general-purpose — with sensitive-data share spread gradually from 0% to 16.1% across clusters rather than jumping between two tiers.",
    chart: `${CHART_BASE}/rq4_cluster_sensitivity.png`,
    chartAlt: "Bar chart of sensitive-data share by cluster, ranked highest to lowest",
  },
  {
    q: "Which plugin clusters have the highest sensitive-data share?",
    a: "Cluster 1 (83 plugins, market data / time / finance) at 16.1%, and Cluster 8 (891 plugins, identifier / other / app usage) at 12.5%. Together that's 974 plugins — about 32% of eligible plugins. That's a different ranking from 'largest clusters by plugin count,' which is dominated by low-sensitivity Clusters 0 and 8.",
    chart: `${CHART_BASE}/rq4_cluster_sensitivity.png`,
    chartAlt: "Bar chart of sensitive-data share by cluster, ranked highest to lowest",
  },
  {
    q: "Can mislabeled \"Other\" records be identified automatically?",
    a: "Only partially. Of 3,544 'Other' records, just 11.6% (411) get a high-confidence re-classification above the 0.5 threshold — most sit around 0.2 confidence. But that confident subset does catch real mislabeled sensitive data.",
    chart: `${CHART_BASE}/rq5_other_confidence_distribution.png`,
    chartAlt: "Histogram of model confidence scores for reclassifying Other records, with a threshold line at 0.5",
  },
  {
    q: "Which parameters collect passwords?",
    a: "18 records are explicitly typed as 'Password' (variants like password, setPassword, api_password, passcode), spanning 50 plugin instances — used for things like database credentials, SMPP accounts, and content-protection codes.",
    chart: `${CHART_BASE}/rq3_password_breakdown.png`,
    chartAlt: "Bar chart of Security credentials sub-types with Password highlighted",
  },
  {
    q: "Do plugins disclose what they collect in their privacy policies?",
    a: "Rarely. Of 308 comparable parameters audited against actual plugin privacy policies, 90.3% (278) are never disclosed at all. Only 5.2% are clearly disclosed — the rest are vague, ambiguous, or incorrectly described.",
    chart: `${CHART_BASE}/rq6_policy_disclosure.png`,
    chartAlt: "Bar chart of privacy policy disclosure status for 308 audited parameters",
  },
  {
    q: "What are the model performance confidence intervals?",
    a: "With 95% confidence intervals from a class-stratified paired bootstrap (2,000 resamples, n=2,563 test records): the baseline TF-IDF + Logistic Regression model scores 68.9% accuracy [67.3%, 70.7%] and 46.8% macro-F1 [42.8%, 49.6%]. The selected word-char-balanced model scores 76.2% accuracy [74.6%, 77.8%] and 64.2% macro-F1 [60.8%, 67.8%] — a paired gain of +7.3 points accuracy [+5.7, +8.8] and +17.5 points macro-F1 [+13.6, +22.3], so the improvement holds up and isn't just noise.",
  },
  {
    q: "Are sensitive parameters also the undisclosed ones?",
    a: "In a small hand-mapped sub-sample — 20 of the 308 audited parameters that map onto a sensitive category — 18 are undisclosed: 90.0% (Wilson 95% CI [69.9%, 97.2%]), essentially identical to the 90.3% undisclosed rate across all 308. Being sensitive doesn't make a plugin more or less likely to disclose it. The 20 break down as 16 Personal information, 3 Finance information, 1 Security credentials — small enough that this is suggestive, not conclusive.",
  },
  {
    q: "Are there hidden sensitive parameters mislabeled as \"Other\"?",
    a: "Of the 3,544 'Other' records, 411 (11.6%) clear the 0.5 confidence threshold for reclassification. Of those, 7 get flagged into a sensitive category: 4 Security credentials, 3 Personal information. These are model flags, not verified relabels — a review-priority signal for where to look first, not confirmed mislabeling.",
    chart: `${CHART_BASE}/rq5_other_confidence_distribution.png`,
    chartAlt: "Histogram of model confidence scores for reclassifying Other records, with a threshold line at 0.5",
  },
];

export function findChatAnswer(question: string) {
  const q = question.trim().toLowerCase();
  if (!q) return null;
  const exact = chatSuggestions.find((s) => s.q.toLowerCase() === q);
  if (exact) return exact;

  const keywordSets: { keywords: string[]; index: number }[] = [
    { keywords: ["what data", "collected", "collect"], index: 0 },
    { keywords: ["percentage", "percent", "how much", "sensitive"], index: 1 },
    { keywords: ["which sensitive", "most often", "frequent"], index: 2 },
    { keywords: ["description", "write"], index: 3 },
    { keywords: ["accura", "predict", "category be"], index: 4 },
    { keywords: ["words", "predictive"], index: 5 },
    { keywords: ["cluster", "risky vs", "safe group"], index: 6 },
    { keywords: ["highest sensitive", "which cluster"], index: 7 },
    { keywords: ["other", "mislabel", "reclassif"], index: 8 },
    { keywords: ["password"], index: 9 },
    { keywords: ["disclos", "privacy polic"], index: 10 },
    { keywords: ["confidence interval"], index: 11 },
    { keywords: ["undisclosed ones", "also undisclosed", "also the undisclosed"], index: 12 },
    { keywords: ["hidden sensitive", "mislabeled as"], index: 13 },
  ];
  for (const { keywords, index } of keywordSets) {
    if (keywords.some((k) => q.includes(k))) return chatSuggestions[index];
  }
  return null;
}
