"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { chatSuggestions, findChatAnswer } from "@/lib/gptPrivacyContent";

// Colors copied 1:1 from the real DataPrivacy project's frontend (App.css),
// so this demo actually looks like the live app rather than a reskin.
const THEMES = {
  light: {
    page: "#f9f9f7",
    card: "#fcfcfb",
    user: "#2a78d6",
    text: "#0b0b0b",
    textSoft: "#52514e",
    textFaint: "#898781",
    onAccent: "#ffffff",
    border: "#e1e0d9",
    borderStrong: "#c3c2b7",
    accent: "#2a78d6",
    accentWash: "#eaf2fc",
  },
  dark: {
    page: "#0d0d0d",
    card: "#1a1a19",
    user: "#3987e5",
    text: "#ffffff",
    textSoft: "#c3c2b7",
    textFaint: "#898781",
    onAccent: "#ffffff",
    border: "#2c2c2a",
    borderStrong: "#383835",
    accent: "#3987e5",
    accentWash: "#162236",
  },
} as const;

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  chart?: string;
  chartAlt?: string;
};

export default function ChatDemoPhone() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [visibleCharts, setVisibleCharts] = useState<Set<number>>(new Set());
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = THEMES[theme];

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    scrollToBottom();

    window.setTimeout(() => {
      const match = findChatAnswer(trimmed);
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
          width: "min(360px, 86vw)",
          height: "min(720px, 78vh)",
          borderColor: "#2a2018",
          background: t.page,
          boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold" style={{ color: t.text }}>
          <span>9:41</span>
          <span className="flex items-center gap-1" style={{ color: t.textFaint }}>● ● ●</span>
        </div>

        {/* Header — mirrors the real app's app-header, with its own light/dark toggle */}
        <div className="relative px-8 pb-3 pt-1 text-center" style={{ background: t.page }}>
          <button
            type="button"
            onClick={() => setTheme((cur) => (cur === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="absolute right-3 top-0 grid h-7 w-7 place-items-center rounded-full border text-xs"
            style={{ borderColor: t.border, background: t.card, color: t.textSoft }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <p className="truncate text-sm font-bold" style={{ color: t.text }}>
            GPT Plugin Privacy Assistant
          </p>
          <p className="mt-0.5 truncate text-[11px]" style={{ color: t.textSoft }}>
            Ask about what GPT plugins collect and the privacy risks involved.
          </p>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              disabled={typing}
              className="mt-2 rounded-full border px-3 py-0.5 text-[10px] font-medium disabled:opacity-50"
              style={{ borderColor: t.border, background: t.card, color: t.textFaint }}
            >
              Clear chat
            </button>
          )}
        </div>

        {/* Suggestion chips — same pill style as the real app's .suggestion-chip, scrollable to fit a phone */}
        <div className="flex gap-2 overflow-x-auto px-3 pb-2" style={{ background: t.page }}>
          {chatSuggestions.map((s) => (
            <button
              key={s.q}
              type="button"
              onClick={() => ask(s.q)}
              disabled={typing}
              className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium transition disabled:opacity-50"
              style={{ borderColor: t.border, color: t.text, background: t.card }}
            >
              {s.q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto px-3 py-3" style={{ background: t.page }}>
          {messages.length === 0 && !typing && (
            <p className="mt-6 text-center text-[12px]" style={{ color: t.textFaint }}>
              Pick a question above, or type your own below.
            </p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl border px-3.5 py-2.5 text-[13px] leading-snug"
                  style={
                    m.role === "user"
                      ? { background: t.user, borderColor: t.user, color: t.onAccent, borderBottomRightRadius: 4 }
                      : { background: t.card, borderColor: t.border, color: t.text, borderBottomLeftRadius: 4 }
                  }
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.chart && (
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => toggleChart(i)}
                        className="rounded-full border px-2.5 py-1 text-[11px] font-semibold transition"
                        style={{ borderColor: t.accent, color: t.accent, background: t.accentWash }}
                      >
                        {visibleCharts.has(i) ? "Hide visualization" : "Show visualization"}
                      </button>
                      {visibleCharts.has(i) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 overflow-hidden rounded-[10px] border p-1.5"
                          style={{ borderColor: t.border, background: t.page }}
                        >
                          <img
                            src={m.chart}
                            alt={m.chartAlt ?? "Supporting chart"}
                            className="block w-full rounded-md"
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
                <div
                  className="flex items-center gap-1 rounded-2xl border px-4 py-3.5"
                  style={{ background: t.card, borderColor: t.border, borderBottomLeftRadius: 4 }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: t.textFaint }}
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: d * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer — text "Send" button, matching the real app's .composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-2 border-t px-3 py-3"
          style={{ borderColor: t.border, background: t.page }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Or type your own question…"
            disabled={typing}
            className="min-w-0 flex-1 rounded-[10px] border px-3.5 py-2 text-[13px] outline-none"
            style={{ borderColor: t.borderStrong, background: t.card, color: t.text }}
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            className="shrink-0 rounded-[10px] px-4 py-2 text-[13px] font-semibold transition disabled:opacity-50"
            style={{ background: t.accent, color: t.onAccent }}
          >
            Send
          </button>
        </form>
      </div>

      <p className="max-w-sm text-center text-xs" style={{ color: "var(--text-faint)" }}>
        Recreated from the real project&apos;s frontend (same colors, bubbles, and light/dark toggle). The
        actual app runs on FastAPI + Claude Haiku with FAISS retrieval — answers here are the project&apos;s
        verified facts, not generated live.
      </p>
    </div>
  );
}
