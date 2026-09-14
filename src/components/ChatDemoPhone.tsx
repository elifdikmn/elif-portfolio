"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { chatSuggestions, findChatAnswer } from "@/lib/gptPrivacyContent";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  chart?: string;
  chartAlt?: string;
};

const INTRO: ChatMessage = {
  role: "assistant",
  text: "Hi! I'm a demo of the GPT Plugin Privacy Assistant. Ask me about what GPT plugins collect, or tap a suggestion below — every answer here is grounded in the real analysis.",
};

export default function ChatDemoPhone() {
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO]);
  const [input, setInput] = useState("");
  const [visibleCharts, setVisibleCharts] = useState<Set<number>>(new Set());
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phone frame */}
      <div
        className="relative mx-auto flex flex-col overflow-hidden rounded-[2.75rem] border-[6px] shadow-2xl"
        style={{
          width: "min(360px, 86vw)",
          height: "min(720px, 78vh)",
          borderColor: "#2a2018",
          background: "var(--surface)",
          boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-[var(--text)]">
          <span>9:41</span>
          <span className="flex items-center gap-1 text-[var(--text-faint)]">● ● ●</span>
        </div>

        {/* Header */}
        <div
          className="flex items-center gap-2 border-b px-4 py-3"
          style={{ borderColor: "var(--border)", background: "var(--accent-soft)" }}
        >
          <div
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
            style={{ background: "var(--accent)" }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[var(--text)]">GPT Privacy Assistant</p>
            <p className="truncate text-[11px] text-[var(--text-soft)]">Demo · grounded in the real analysis</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
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
                      ? { background: "var(--accent)", color: "#fff", borderBottomRightRadius: 4 }
                      : {
                          background: "var(--bg-soft)",
                          color: "var(--text)",
                          borderBottomLeftRadius: 4,
                        }
                  }
                >
                  <p>{m.text}</p>
                  {m.chart && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => toggleChart(i)}
                        className="rounded-full border px-2.5 py-1 text-[11px] font-semibold transition"
                        style={{ borderColor: "var(--accent-soft-2)", color: "var(--accent-strong)" }}
                      >
                        {visibleCharts.has(i) ? "Hide chart" : "Show supporting chart"}
                      </button>
                      {visibleCharts.has(i) && (
                        <motion.img
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          src={m.chart}
                          alt={m.chartAlt ?? "Supporting chart"}
                          className="mt-2 w-full rounded-lg border bg-white object-contain"
                          style={{ borderColor: "var(--border)" }}
                        />
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
                  className="flex gap-1 rounded-2xl px-4 py-3"
                  style={{ background: "var(--bg-soft)", borderBottomLeftRadius: 4 }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--text-faint)" }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestion chips */}
        <div
          className="flex gap-2 overflow-x-auto border-t px-3 py-2"
          style={{ borderColor: "var(--border)" }}
        >
          {chatSuggestions.slice(0, 6).map((s) => (
            <button
              key={s.q}
              type="button"
              onClick={() => ask(s.q)}
              disabled={typing}
              className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium transition hover:opacity-80 disabled:opacity-50"
              style={{ borderColor: "var(--accent-soft-2)", color: "var(--accent-strong)", background: "var(--surface)" }}
            >
              {s.q}
            </button>
          ))}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-2 border-t px-3 py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the analysis…"
            disabled={typing}
            className="min-w-0 flex-1 rounded-full border px-3.5 py-2 text-[13px] outline-none"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition disabled:opacity-40"
            style={{ background: "var(--accent)" }}
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <p className="max-w-sm text-center text-xs text-[var(--text-faint)]">
        This is a static demo of the interface — the real project runs on FastAPI + Claude Haiku with FAISS
        retrieval. Every answer above is copied verbatim from the actual project’s grounded facts, not
        generated live.
      </p>
    </div>
  );
}
