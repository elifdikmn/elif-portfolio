"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Screen = { src: string; alt: string; caption: string };

// Real iOS app screenshots from the FootballMatchPrediction thesis report — not recreations.
const SCREENS: Screen[] = [
  { src: "/projects/football/app/home-finished-matches.png", alt: "iOS app home page showing finished matches with win/draw/loss probability bars", caption: "Home — Finished Matches" },
  { src: "/projects/football/app/filter-leagues.png", alt: "iOS app league filter menu with checkboxes", caption: "Filter Leagues" },
  { src: "/projects/football/app/detail-standings.png", alt: "iOS app match detail page showing league standings", caption: "Match Detail — Standings" },
  { src: "/projects/football/app/detail-events.png", alt: "iOS app match detail page showing a timeline of match events", caption: "Match Detail — Events" },
  { src: "/projects/football/app/live-matches.png", alt: "iOS app live matches list with real-time win/draw/loss probabilities", caption: "Live Matches" },
];

export default function FootballAppPhone() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const screen = SCREENS[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + SCREENS.length) % SCREENS.length);
    scrollRef.current?.scrollTo({ top: 0 });
  };

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
            width: "min(300px, 74vw)",
            height: "min(440px, 56vh)",
            borderColor: "#2a2018",
            background: "#000",
            boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
          }}
        >
          <div className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />
          <div ref={scrollRef} className="h-full w-full overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin" }}>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screen"
              className="block w-full"
            >
              <img src={screen.src} alt={screen.alt} className="block w-full" draggable={false} />
            </button>
          </div>
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
        {SCREENS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setIndex(i);
              scrollRef.current?.scrollTo({ top: 0 });
            }}
            aria-label={`Go to ${s.caption}`}
            className="h-2 w-2 rounded-full transition"
            style={{ background: i === index ? "var(--accent)" : "var(--border)" }}
          />
        ))}
      </div>

      <p className="max-w-sm text-center text-xs" style={{ color: "var(--text-faint)" }}>
        Real screenshots from the actual iOS app — scroll inside the screen to see the rest of it, tap the
        screen (or the arrows) to move to the next one.
      </p>
    </div>
  );
}
