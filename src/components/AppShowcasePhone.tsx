"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Screen = { src: string; alt: string; caption: string };

export default function AppShowcasePhone({ screens }: { screens: Screen[] }) {
  const [index, setIndex] = useState(0);
  const screen = screens[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + screens.length) % screens.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition hover:opacity-70"
          style={{ borderColor: "var(--border)", color: "var(--accent-strong)", background: "var(--surface)" }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          className="relative mx-auto overflow-hidden rounded-[2.75rem] border-[6px] shadow-2xl"
          style={{
            width: "min(280px, 70vw)",
            height: "min(580px, 66vh)",
            borderColor: "#2a2018",
            background: "#000",
            boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
          }}
        >
          <div className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />
          <img src={screen.src} alt={screen.alt} className="h-full w-full object-cover object-top" />
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screen"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition hover:opacity-70"
          style={{ borderColor: "var(--border)", color: "var(--accent-strong)", background: "var(--surface)" }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
        {screen.caption}
      </p>

      <div className="flex gap-2">
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to ${s.caption}`}
            className="h-2 w-2 rounded-full transition"
            style={{ background: i === index ? "var(--accent)" : "var(--border)" }}
          />
        ))}
      </div>
    </div>
  );
}
