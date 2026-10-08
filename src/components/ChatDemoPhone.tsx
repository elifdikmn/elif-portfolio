"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { chatSuggestions, findChatAnswer } from "@/lib/gptPrivacyContent";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  chart?: string;
  chartAlt?: string;
};

type Theme = "light" | "dark";
type Audience = "general" | "researcher";

// Colors copied from elifdikmn/DataPrivacy's frontend/src/App.css — the actual deployed
// interface at dataprivacy-1.onrender.com — not the portfolio's own theme tokens, so this
// demo looks like the real app rather than a portfolio-recolored version of it.
const PALETTE: Record<Theme, Record<string, string>> = {
  light: {
    page: "#f9f9f7",
    card: "#fcfcfb",
    user: "#b4232e",
    textPrimary: "#0b0b0b",
    textSecondary: "#52514e",
    textMuted: "#898781",
    textOnAccent: "#ffffff",
    border: "#e1e0d9",
    borderStrong: "#c3c2b7",
    accent: "#b4232e",
    accentWash: "#fff0f1",
    sensitive: "#d03b3b",
    sensitiveWash: "#fbeaea",
  },
  dark: {
    page: "#0d0d0d",
    card: "#1a1a19",
    user: "#9f1c2b",
    textPrimary: "#ffffff",
    textSecondary: "#c3c2b7",
    textMuted: "#898781",
    textOnAccent: "#ffffff",
    border: "#2c2c2a",
    borderStrong: "#383835",
    accent: "#ff7b86",
    accentWash: "#351a20",
    sensitive: "#e66767",
    sensitiveWash: "#2e1a1a",
  },
};

// Friendly chip label -> canonical query already answered in gptPrivacyContent.ts.
// Only questions with a real grounded answer are listed here; the live app has a
// few more chips (confidence intervals, two Other/undisclosed cross-questions) that
// don't have a canned answer yet, so they're left out rather than faked.
const GENERAL_CHIPS = [
  { label: "What information can GPT Actions ask for?", query: "What data are collected by GPT Actions?" },
  { label: "How much of that information is sensitive?", query: "What percentage of collected data is sensitive?" },
  { label: "Which sensitive details appear most often?", query: "Which sensitive data types appear most often?" },
  { label: "Are sensitive requests explained as often as other requests?", query: "Do plugins write descriptions less often for sensitive parameters?" },
  { label: "Where do password requests appear?", query: "Which parameters collect passwords?" },
  { label: "Do privacy policies explain what these tools ask for?", query: "Do plugins disclose what they collect in their privacy policies?" },
];

const RESEARCHER_CHIPS = [
  { label: "How accurately can a parameter's category be predicted from its name?", query: "How accurately can a parameter's category be predicted from its name?" },
  { label: "Which words predict sensitive categories?", query: "Which words predict sensitive categories?" },
  { label: "Do natural risky vs. safe clusters emerge among plugins?", query: "Do natural risky vs. safe clusters emerge among plugins?" },
  { label: "Which plugin clusters have the highest sensitive-data share?", query: "Which plugin clusters have the highest sensitive-data share?" },
  { label: "Can mislabeled \"Other\" records be identified automatically?", query: "Can mislabeled \"Other\" records be identified automatically?" },
];

function TypingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-0 py-0.5">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.1, delay: d * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

export default function ChatDemoPhone() {
  const [theme, setTheme] = useState<Theme>("light");
  const [audience, setAudience] = useState<Audience>("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [visibleCharts, setVisibleCharts] = useState<Set<number>>(new Set());
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const c = PALETTE[theme];
  const chips = audience === "general" ? GENERAL_CHIPS : [...GENERAL_CHIPS, ...RESEARCHER_CHIPS];

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const ask = (query: string, displayLabel: string) => {
    if (!query.trim() || typing) return;
    setMessages((prev) => [...prev, { role: "user", text: displayLabel }]);
    setInput("");
    setTyping(true);
    scrollToBottom();

    window.setTimeout(() => {
      const match = chatSuggestions.find((s) => s.q === query) ?? findChatAnswer(query);
      const reply: ChatMessage = match
        ? { role: "assistant", text: match.a, chart: match.chart, chartAlt: match.chartAlt }
        : {
            role: "assistant",
            text: "I don't have a canned answer for that in this demo — try one of the suggested questions above, or read the full case study for the complete analysis.",
          };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
      scrollToBottom();
    }, 650 + Math.random() * 500);
  };

  const toggleChart = (i: number) => {
    setVisibleCharts((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const clearChat = () => {
    setMessages([]);
    setVisibleCharts(new Set());
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phone frame */}
      <div
        className="relative mx-auto flex flex-col overflow-hidden rounded-[2.75rem] border-[6px] shadow-2xl"
        style={{
          width: "min(380px, 88vw)",
          height: "min(760px, 80vh)",
          borderColor: "#2a2018",
          background: c.page,
          boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />

        {/* Hardware status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold" style={{ color: c.textPrimary }}>
          <span>9:41</span>
          <span className="flex items-center gap-1" style={{ color: c.textMuted }}>● ● ●</span>
        </div>

        {/* App header — mirrors the real app's centered header exactly */}
        <div className="relative px-8 pb-3 pt-1 text-center" style={{ borderBottom: `1px solid ${c.border}` }}>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="absolute right-2 top-0 grid h-7 w-7 place-items-center rounded-full text-sm"
            style={{ border: `1px solid ${c.border}`, background: c.card }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <h3 className="text-[15px] font-bold leading-tight" style={{ color: c.textPrimary }}>
            GPT Plugin Privacy Assistant
          </h3>
          <p className="mx-auto mt-1 max-w-[220px] text-[11px] leading-snug" style={{ color: c.textSecondary }}>
            Ask about what data GPT plugins collect and the privacy risks involved.
          </p>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1 text-[10px]"
              style={{ border: `1px solid ${c.border}`, background: c.card, color: c.textSecondary }}
            >
              Explain for
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as Audience)}
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold outline-none"
                style={{ background: c.accentWash, color: c.accent }}
              >
                <option value="general">General audience</option>
                <option value="researcher">Researcher</option>
              </select>
            </span>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="rounded-full px-2.5 py-1 text-[10px]"
                style={{ border: `1px solid ${c.border}`, background: c.card, color: c.textMuted }}
              >
                Clear chat
              </button>
            )}
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex flex-wrap justify-center gap-1.5 px-3 py-2.5" style={{ borderBottom: `1px solid ${c.border}` }}>
          {chips.slice(0, 6).map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => ask(s.query, s.label)}
              disabled={typing}
              className="rounded-full px-2.5 py-1 text-left text-[10.5px] leading-snug transition disabled:opacity-50"
              style={{ border: `1px solid ${c.border}`, background: c.card, color: c.textPrimary }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
          {messages.length === 0 && !typing && (
            <p className="mt-6 text-center text-[12px]" style={{ color: c.textMuted }}>
              Pick a question above, or type your own below.
            </p>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug"
                  style={
                    m.role === "user"
                      ? { background: c.user, color: c.textOnAccent, borderBottomRightRadius: 4 }
                      : { background: c.card, border: `1px solid ${c.border}`, color: c.textPrimary, borderBottomLeftRadius: 4 }
                  }
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.chart && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => toggleChart(i)}
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition"
                        style={{ border: `1px solid ${c.accent}`, background: c.accentWash, color: c.accent }}
                      >
                        {visibleCharts.has(i) ? "Hide visualization" : "Show visualization"}
                      </button>
                      {visibleCharts.has(i) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 overflow-hidden rounded-[10px] p-1.5"
                          style={{ background: c.page, border: `1px solid ${c.border}` }}
                        >
                          <img
                            src={m.chart}
                            alt={m.chartAlt ?? "Supporting chart"}
                            className="w-full rounded-md object-contain"
                          />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl px-4 py-3" style={{ background: c.card, border: `1px solid ${c.border}`, borderBottomLeftRadius: 4 }}>
                  <TypingDots color={c.textMuted} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input, input);
          }}
          className="flex items-center gap-2 px-3 py-3"
          style={{ borderTop: `1px solid ${c.border}` }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Or type your own question…"
            disabled={typing}
            className="min-w-0 flex-1 rounded-[10px] px-3.5 py-2 text-[13px] outline-none"
            style={{ border: `1px solid ${c.borderStrong}`, background: c.card, color: c.textPrimary }}
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            className="shrink-0 rounded-[10px] px-4 py-2 text-[13px] font-semibold transition disabled:opacity-40"
            style={{ background: c.accent, color: c.textOnAccent }}
          >
            Send
          </button>
        </form>
      </div>

      <p className="max-w-sm text-center text-xs text-[var(--text-faint)]">
        This is a static demo of the interface — the real project runs on FastAPI + Claude Haiku with FAISS
        retrieval. Every answer above is copied verbatim from the actual project&apos;s grounded facts, not
        generated live.
      </p>
    </div>
  );
}
