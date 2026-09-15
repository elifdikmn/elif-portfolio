"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Screen = { src: string; alt: string; caption: string };
type Hotspot = { top: number; left: number; width: number; height: number; target: number; label: string };

// Real iOS app screenshots from the FootballMatchPrediction thesis report — not recreations.
const SCREENS: Screen[] = [
  { src: "/projects/football/app/home-finished-matches.png", alt: "iOS app home page showing finished matches with win/draw/loss probability bars", caption: "Home — Finished Matches" },
  { src: "/projects/football/app/filter-leagues.png", alt: "iOS app league filter menu with checkboxes", caption: "Filter Leagues" },
  { src: "/projects/football/app/detail-standings.png", alt: "iOS app match detail page showing league standings", caption: "Match Detail — Standings" },
  { src: "/projects/football/app/detail-events.png", alt: "iOS app match detail page showing a timeline of match events", caption: "Match Detail — Events" },
  { src: "/projects/football/app/live-matches.png", alt: "iOS app live matches list with real-time win/draw/loss probabilities", caption: "Live Matches" },
];

// Approximate real-button locations within each screenshot (% of the 1179x2556 image),
// so tapping the actual "Select Leagues" / "Detail" / tab / "Back" areas in the photo navigates
// like the real app would, instead of every tap just advancing to the next screenshot.
const HOTSPOTS: Record<number, Hotspot[]> = {
  0: [
    { top: 30.5, left: 4, width: 92, height: 4, target: 1, label: "Select Leagues" },
    { top: 43.5, left: 79, width: 12, height: 3, target: 2, label: "Detail (Everton vs Southampton)" },
    { top: 72, left: 79, width: 12, height: 3, target: 2, label: "Detail (West Ham vs Nottm Forest)" },
  ],
  1: [{ top: 30.5, left: 4, width: 92, height: 4, target: 0, label: "Collapse Select Leagues" }],
  2: [
    { top: 7.5, left: 3, width: 14, height: 2.5, target: 0, label: "Back" },
    { top: 34.5, left: 3, width: 46, height: 3.5, target: 3, label: "Events tab" },
  ],
  3: [
    { top: 7.5, left: 3, width: 14, height: 2.5, target: 0, label: "Back" },
    { top: 34.5, left: 50, width: 46, height: 3.5, target: 2, label: "Standings tab" },
  ],
  4: [],
};

export default function FootballAppPhone() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const screen = SCREENS[index];

  const jumpTo = (i: number) => {
    setIndex((i + SCREENS.length) % SCREENS.length);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => jumpTo(index - 1)}
          aria-label="Previous screen"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition hover:opacity-70"
          style={{ borderColor: "var(--border)", color: "var(--accent-strong)", background: "var(--surface)" }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          className="relative mx-auto flex flex-col overflow-hidden rounded-[2.75rem] border-[6px] shadow-2xl"
          style={{
            width: "min(360px, 86vw)",
            height: "min(720px, 78vh)",
            borderColor: "#2a2018",
            background: "#000",
            boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
          }}
        >
          <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />
          <div ref={scrollRef} className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="relative">
              <img src={screen.src} alt={screen.alt} className="block w-full" draggable={false} />
              {/* fallback: tapping anywhere else moves to the next screen */}
              <button type="button" onClick={() => jumpTo(index + 1)} aria-label="Next screen" className="absolute inset-0" />
              {(HOTSPOTS[index] ?? []).map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpTo(h.target)}
                  aria-label={h.label}
                  className="absolute"
                  style={{ top: `${h.top}%`, left: `${h.left}%`, width: `${h.width}%`, height: `${h.height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => jumpTo(index + 1)}
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
            onClick={() => jumpTo(i)}
            aria-label={`Go to ${s.caption}`}
            className="h-2 w-2 rounded-full transition"
            style={{ background: i === index ? "var(--accent)" : "var(--border)" }}
          />
        ))}
      </div>

      <p className="max-w-sm text-center text-xs" style={{ color: "var(--text-faint)" }}>
        Real screenshots from the actual iOS app. Scroll inside the screen to see the rest of it, and tap
        the visible buttons (Select Leagues, Detail, Back, Events/Standings) to navigate like in the real app.
      </p>
    </div>
  );
}
