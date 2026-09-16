// Grounded content for the GPT Plugin Privacy Risk Analysis & RAG Assistant case study.
// Every number here is read directly from elifdikmn/GPTDataPrivacy's notebooks and
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
    chart: `${CHART_BASE}/treemap_main_categories.html`,
    chartAlt: "Interactive treemap of the main data categories requested by GPT plugins, sized by record count",
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
    a: "A word-only TF-IDF + Logistic Regression baseline reaches 68.9% accuracy and 46.8% macro-F1 on the 25-class problem. A validated word + character n-gram model with balanced class weights, selected on a held-out split, does substantially better: 76.2% accuracy and 64.2% macro-F1 (95% CI [74.6%, 77.8%] / [0.608, 0.678]) — a confirmed +7.3-point improvement. Sensitive-category recall jumps the most: Finance information alone goes from 14.3% to 64.3%.",
    chart: `${CHART_BASE}/rq3_confusion_matrix.png`,
    chartAlt: "Confusion matrix heatmap for the TF-IDF + Logistic Regression category classifier",
  },
  {
    q: "What are the model performance confidence intervals?",
    a: "Using 2,000-resample paired bootstrap on a fixed test set: the baseline reaches 68.9% accuracy (95% CI [67.3%, 70.7%]), the validated word+character model 76.2% (95% CI [74.6%, 77.8%]). The paired improvement is +7.3 accuracy points (95% CI [5.7, 8.8]) — clear of zero, so it's not test-set luck. These intervals are conditional on this fixed split; most test-set plugins also appear in training, so a plugin-grouped evaluation is a natural next step.",
    chart: `${CHART_BASE}/rq3_validation_confidence_intervals.png`,
    chartAlt: "Point estimates with 95% confidence intervals for baseline vs. validated model, accuracy and macro-F1",
  },
  {
    q: "Which words predict sensitive categories?",
    a: "Exactly the words you'd guess, which is reassuring: 'key', 'token', and 'password' drive Security credentials; 'email', 'gender', and 'age' drive Personal information; 'patient' dominates Health information; 'currency' and 'price' drive Finance information.",
    chart: `${CHART_BASE}/rq3_feature_importance.png`,
    chartAlt: "Four small bar charts of the top predictive words for each sensitive category",
  },
  {
    q: "Do natural risky vs. safe clusters emerge among plugins?",
    a: "No clean binary split. K-Means (K=10, chosen by silhouette score) on 30,478 deduplicated parameter-plugin pairs surfaces functional groups instead — personal info & messaging, security credentials & app usage, general-purpose — with sensitive-data share spread from 0% to 35.1% across clusters rather than jumping between two tiers.",
    chart: `${CHART_BASE}/rq4_cluster_sensitivity.png`,
    chartAlt: "Bar chart of sensitive-data share by cluster, ranked highest to lowest",
  },
  {
    q: "Which plugin clusters have the highest sensitive-data share?",
    a: "Cluster 2 (162 plugins, personal information / message / identifier) at 35.1%, and Cluster 1 (198 plugins, security credentials / app usage / query) at 31.1%. Together that's 360 plugins — about 12.1% of eligible plugins. That's a very different ranking from 'largest clusters by plugin count,' which is dominated by low-sensitivity Clusters 4 and 0 (about 69.8% of eligible plugins combined).",
    chart: `${CHART_BASE}/rq4_cluster_sensitivity.png`,
    chartAlt: "Bar chart of sensitive-data share by cluster, ranked highest to lowest",
  },
  {
    q: "Can mislabeled \"Other\" records be identified automatically?",
    a: "Only partially. Of 3,544 'Other' records, just 11.6% (411) get a high-confidence re-classification above the 0.5 threshold — most sit around 0.2 confidence. But that confident subset does catch real mislabeled sensitive data: 7 records point to Security credentials or Personal information, including parameters literally named email, key, or token.",
    chart: `${CHART_BASE}/rq5_other_confidence_distribution.png`,
    chartAlt: "Histogram of model confidence scores for reclassifying Other records, with a threshold line at 0.5",
  },
  {
    q: "Which parameters collect passwords?",
    a: "18 records are explicitly typed as 'Password' (variants like password, setPassword, api_password, passcode), spanning 35 distinct parameter-plugin pairs across 29 unique plugins — used for things like database credentials, SMPP accounts, and content-protection codes.",
    chart: `${CHART_BASE}/rq3_password_breakdown.png`,
    chartAlt: "Bar chart of Security credentials sub-types with Password highlighted",
  },
  {
    q: "Do plugins disclose what they collect in their privacy policies?",
    a: "Rarely. Of 308 comparable parameters audited against actual plugin privacy policies, 90.3% (278) are never disclosed at all. Only 5.2% are clearly disclosed — the rest are vague (2.3%), ambiguous (0.3%), or incorrectly described (1.9%).",
    chart: `${CHART_BASE}/rq6_policy_disclosure.png`,
    chartAlt: "Bar chart of privacy policy disclosure status for 308 audited parameters",
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
    { keywords: ["confidence interval", "performance confidence"], index: 5 },
    { keywords: ["words", "predictive"], index: 6 },
    { keywords: ["cluster", "risky vs", "safe group"], index: 7 },
    { keywords: ["highest sensitive", "which cluster"], index: 8 },
    { keywords: ["other", "mislabel", "reclassif"], index: 9 },
    { keywords: ["password"], index: 10 },
    { keywords: ["disclos", "privacy polic"], index: 11 },
  ];
  for (const { keywords, index } of keywordSets) {
    if (keywords.some((k) => q.includes(k))) return chatSuggestions[index];
  }
  return null;
}
