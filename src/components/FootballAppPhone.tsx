"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, Menu, Sun } from "lucide-react";

type MatchEvent = { minute: number; team: string; type: "Goal" | "Card" | "subst" | "Var"; detail: string; player: string; assist?: string | null };
type StandingRow = [team: string, rank: number, points: number, played: number, win: number, draw: number, lose: number, gd: number];

type Match = {
  id: string;
  league: string;
  date: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  homeProb: number;
  drawProb: number;
  awayProb: number;
};

// Real cached fixtures + predictions from the FootballMatchPrediction repo (prediction_cache.json).
const MATCHES: Match[] = [
  { id: "1223953", league: "Serie A", date: "11 May", home: "Udinese", away: "Monza", homeGoals: 1, awayGoals: 2, homeProb: 32.12, drawProb: 34.88, awayProb: 33.0 },
  { id: "1208378", league: "EPL", date: "11 May", home: "Newcastle", away: "Chelsea", homeGoals: 2, awayGoals: 0, homeProb: 24.83, drawProb: 42.14, awayProb: 33.03 },
  { id: "1238155", league: "Turkish Süper Lig", date: "11 May", home: "Sivasspor", away: "BB Bodrumspor", homeGoals: 0, awayGoals: 0, homeProb: 34.12, drawProb: 20.99, awayProb: 44.89 },
  { id: "1224264", league: "Bundesliga", date: "11 May", home: "Stuttgart", away: "Augsburg", homeGoals: 4, awayGoals: 0, homeProb: 34.02, drawProb: 30.1, awayProb: 35.87 },
  { id: "1208802", league: "La Liga", date: "11 May", home: "Betis", away: "Osasuna", homeGoals: 1, awayGoals: 1, homeProb: 30.77, drawProb: 36.51, awayProb: 32.73 },
];

// Real match events, deduplicated, from events_cache.json.
const EVENTS: Record<string, MatchEvent[]> = {
  "1223953": [
    { minute: 13, team: "Monza", type: "Card", detail: "Yellow Card", player: "Jean-Daniel Akpa Akpro" },
    { minute: 46, team: "Udinese", type: "subst", detail: "Substitution", player: "Oier Zarraga", assist: "S. Lovrić" },
    { minute: 50, team: "Udinese", type: "Card", detail: "Yellow Card", player: "Arthur Atta" },
    { minute: 52, team: "Monza", type: "Goal", detail: "Goal", player: "G. Caprari" },
    { minute: 65, team: "Monza", type: "subst", detail: "Substitution", player: "G. Castrovilli", assist: "K. Zeroli" },
    { minute: 75, team: "Udinese", type: "Goal", detail: "Goal", player: "L. Lucca", assist: "J. Karlström" },
    { minute: 90, team: "Monza", type: "Goal", detail: "Goal", player: "K. Baldé", assist: "K. Zeroli" },
    { minute: 90, team: "Udinese", type: "Card", detail: "Yellow Card", player: "Lorenzo Lucca" },
  ],
  "1208378": [
    { minute: 2, team: "Newcastle", type: "Goal", detail: "Goal", player: "S. Tonali", assist: "J. Murphy" },
    { minute: 36, team: "Chelsea", type: "Card", detail: "Red Card", player: "Nicolas Jackson" },
    { minute: 45, team: "Chelsea", type: "Card", detail: "Yellow Card", player: "Enzo Fernández" },
    { minute: 53, team: "Newcastle", type: "Card", detail: "Yellow Card", player: "Fabian Schär" },
    { minute: 64, team: "Newcastle", type: "Card", detail: "Yellow Card", player: "Jacob Murphy" },
    { minute: 84, team: "Newcastle", type: "Card", detail: "Yellow Card", player: "Bruno Guimarães" },
    { minute: 90, team: "Newcastle", type: "Goal", detail: "Goal", player: "Bruno Guimarães", assist: "D. Burn" },
  ],
  "1238155": [
    { minute: 20, team: "BB Bodrumspor", type: "Card", detail: "Yellow Card", player: "Ahmet Aslan" },
    { minute: 67, team: "BB Bodrumspor", type: "Card", detail: "Yellow Card", player: "Jonathan Okita" },
    { minute: 72, team: "Sivasspor", type: "Card", detail: "Yellow Card", player: "Tolga Ciğerci" },
    { minute: 87, team: "BB Bodrumspor", type: "Card", detail: "Yellow Card", player: "Taulant Seferi" },
    { minute: 90, team: "Sivasspor", type: "Card", detail: "Yellow Card", player: "Uroš Radaković" },
  ],
  "1224264": [
    { minute: 8, team: "VfB Stuttgart", type: "Goal", detail: "Goal", player: "A. Karazor" },
    { minute: 11, team: "FC Augsburg", type: "Card", detail: "Red Card", player: "Samuel Essende" },
    { minute: 45, team: "VfB Stuttgart", type: "Card", detail: "Yellow Card", player: "Enzo Millot" },
    { minute: 51, team: "VfB Stuttgart", type: "Goal", detail: "Goal", player: "N. Woltemade", assist: "E. Millot" },
    { minute: 80, team: "VfB Stuttgart", type: "Goal", detail: "Goal", player: "E. Millot" },
    { minute: 86, team: "FC Augsburg", type: "Card", detail: "Yellow Card", player: "Dimitrios Giannoulis" },
    { minute: 87, team: "VfB Stuttgart", type: "Goal", detail: "Goal", player: "E. Demirović", assist: "C. Führich" },
  ],
  "1208802": [
    { minute: 9, team: "Osasuna", type: "Card", detail: "Yellow Card", player: "Alejandro Catena" },
    { minute: 23, team: "Real Betis", type: "Card", detail: "Yellow Card", player: "Romain Perraud" },
    { minute: 45, team: "Osasuna", type: "Card", detail: "Yellow Card", player: "Ante Budimir" },
    { minute: 64, team: "Real Betis", type: "Goal", detail: "Goal", player: "C. Hernández", assist: "Isco" },
    { minute: 75, team: "Osasuna", type: "Goal", detail: "Goal", player: "A. Budimir", assist: "Aimar Oroz" },
    { minute: 77, team: "Real Betis", type: "Card", detail: "Yellow Card", player: "Sergi Altimira" },
    { minute: 90, team: "Real Betis", type: "Card", detail: "Yellow Card", player: "Antony" },
  ],
};

// Real top-6 standings per league, from the repo's matches.db.
const STANDINGS: Record<string, StandingRow[]> = {
  "Serie A": [
    ["Napoli", 1, 82, 38, 24, 10, 4, 32],
    ["Inter", 2, 81, 38, 24, 9, 5, 44],
    ["Atalanta", 3, 74, 38, 22, 8, 8, 41],
    ["Juventus", 4, 70, 38, 18, 16, 4, 23],
    ["AS Roma", 5, 69, 38, 20, 9, 9, 21],
    ["Fiorentina", 6, 65, 38, 19, 8, 11, 19],
  ],
  EPL: [
    ["Liverpool", 1, 84, 38, 25, 9, 4, 45],
    ["Arsenal", 2, 74, 38, 20, 14, 4, 35],
    ["Manchester City", 3, 71, 38, 21, 8, 9, 28],
    ["Chelsea", 4, 69, 38, 20, 9, 9, 21],
    ["Newcastle", 5, 66, 38, 20, 6, 12, 21],
    ["Aston Villa", 6, 66, 38, 19, 9, 10, 7],
  ],
  "Turkish Süper Lig": [
    ["Galatasaray", 1, 95, 36, 30, 5, 1, 60],
    ["Fenerbahce", 2, 84, 36, 26, 6, 4, 51],
    ["Samsunspor", 3, 64, 36, 19, 7, 10, 14],
    ["Besiktas", 4, 62, 36, 17, 11, 8, 23],
    ["Istanbul Basaksehir", 5, 54, 36, 16, 6, 14, 4],
    ["Eyüpspor", 6, 53, 36, 15, 8, 13, 5],
  ],
  Bundesliga: [
    ["Bayern München", 1, 82, 34, 25, 7, 2, 67],
    ["Bayer Leverkusen", 2, 69, 34, 19, 12, 3, 29],
    ["Eintracht Frankfurt", 3, 60, 34, 17, 9, 8, 22],
    ["Borussia Dortmund", 4, 57, 34, 17, 6, 11, 20],
    ["SC Freiburg", 5, 55, 34, 16, 7, 11, -4],
    ["FSV Mainz 05", 6, 52, 34, 14, 10, 10, 12],
  ],
  "La Liga": [
    ["Barcelona", 1, 88, 38, 28, 4, 6, 63],
    ["Real Madrid", 2, 84, 38, 26, 6, 6, 40],
    ["Atletico Madrid", 3, 76, 38, 22, 10, 6, 38],
    ["Athletic Club", 4, 70, 38, 19, 13, 6, 25],
    ["Villarreal", 5, 70, 38, 20, 10, 8, 20],
    ["Real Betis", 6, 60, 38, 16, 12, 10, 7],
  ],
};

const LEAGUES = ["All Leagues", "Serie A", "EPL", "Turkish Süper Lig", "Bundesliga", "La Liga"];

function eventIcon(type: MatchEvent["type"]) {
  if (type === "Goal") return "⚽";
  if (type === "Card") return "🟨";
  return "🔁";
}

function ProbBar({ home, draw, away }: { home: number; draw: number; away: number }) {
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full">
      <div style={{ width: `${home}%`, background: "#ef4444" }} />
      <div style={{ width: `${draw}%`, background: "#22c55e" }} />
      <div style={{ width: `${away}%`, background: "#eab308" }} />
    </div>
  );
}

export default function FootballAppPhone() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<"events" | "standings">("events");
  const [league, setLeague] = useState("All Leagues");
  const [filterOpen, setFilterOpen] = useState(false);

  const match = MATCHES.find((m) => m.id === selectedId) ?? null;
  const visibleMatches = league === "All Leagues" ? MATCHES : MATCHES.filter((m) => m.league === league);

  const openDetail = (id: string) => {
    setSelectedId(id);
    setDetailTab("events");
    setView("detail");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative mx-auto flex flex-col overflow-hidden rounded-[2.75rem] border-[6px] shadow-2xl"
        style={{
          width: "min(360px, 86vw)",
          height: "min(720px, 78vh)",
          borderColor: "#2a2018",
          background: "#0b0b0f",
          boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
        }}
      >
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />

        <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-white">
          <span>10:44</span>
          <div className="flex items-center gap-2 text-white/70">
            <Menu className="h-3.5 w-3.5" />
            <Sun className="h-3.5 w-3.5" />
          </div>
        </div>

        {view === "list" ? (
          <>
            <div className="px-4 pb-2 pt-2">
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "#2563eb" }}
              >
                {league}
                <ChevronDown className={`h-4 w-4 transition ${filterOpen ? "rotate-180" : ""}`} />
              </button>
              {filterOpen && (
                <div className="mt-1.5 overflow-hidden rounded-xl" style={{ background: "#15151c" }}>
                  {LEAGUES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLeague(l);
                        setFilterOpen(false);
                      }}
                      className="block w-full px-3.5 py-2 text-left text-[12px] text-white/85 transition hover:bg-white/5"
                      style={l === league ? { color: "#60a5fa" } : undefined}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
              {visibleMatches.map((m) => (
                <div key={m.id} className="rounded-2xl p-3.5" style={{ background: "#15151c" }}>
                  <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-white/40">
                    <span>{m.league}</span>
                    <span>{m.date}</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-[13px] text-white">
                    <span className="max-w-[38%] truncate font-medium">{m.home}</span>
                    <span className="font-hero font-bold" style={{ color: "#4ade80" }}>
                      {m.homeGoals} - {m.awayGoals}
                    </span>
                    <span className="max-w-[38%] truncate text-right font-medium">{m.away}</span>
                  </div>
                  <div className="mb-2.5 flex justify-between text-[10px] text-white/50">
                    <span>home {m.homeProb.toFixed(1)}%</span>
                    <span>draw {m.drawProb.toFixed(1)}%</span>
                    <span>away {m.awayProb.toFixed(1)}%</span>
                  </div>
                  <ProbBar home={m.homeProb} draw={m.drawProb} away={m.awayProb} />
                  <button
                    type="button"
                    onClick={() => openDetail(m.id)}
                    className="mt-3 w-full rounded-full py-2 text-[12px] font-semibold text-white"
                    style={{ background: "#2563eb" }}
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : match ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 pb-2 pt-1">
              <button type="button" onClick={() => setView("list")} className="flex items-center gap-1 text-[12px] font-medium" style={{ color: "#60a5fa" }}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <span className="mx-auto pr-8 text-[13px] font-semibold text-white">Match Detail</span>
            </div>

            <div className="mx-4 mb-3 rounded-2xl p-3.5" style={{ background: "#15151c" }}>
              <div className="flex items-center justify-between text-[12px] text-white">
                <span className="max-w-[38%] truncate">{match.home}</span>
                <span className="font-hero font-bold" style={{ color: "#4ade80" }}>
                  {match.homeGoals} - {match.awayGoals}
                </span>
                <span className="max-w-[38%] truncate text-right">{match.away}</span>
              </div>
            </div>

            <div className="mx-4 mb-3 flex overflow-hidden rounded-xl" style={{ background: "#15151c" }}>
              {(["events", "standings"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDetailTab(t)}
                  className="flex-1 py-2 text-[12px] font-semibold capitalize"
                  style={{ background: detailTab === t ? "#2563eb" : "transparent", color: detailTab === t ? "#fff" : "rgba(255,255,255,0.5)" }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {detailTab === "events" ? (
                <ul className="flex flex-col gap-2.5">
                  {(EVENTS[match.id] ?? []).map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12px] text-white/85">
                      <span className="w-7 shrink-0 text-white/40">{e.minute}&apos;</span>
                      <span>{eventIcon(e.type)}</span>
                      <span>
                        <span className="font-medium text-white">{e.player}</span>{" "}
                        <span className="text-white/40">
                          ({e.team} — {e.detail}
                          {e.assist ? `, assist ${e.assist}` : ""})
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <table className="w-full text-left text-[11px] text-white/85">
                  <thead>
                    <tr className="text-white/40">
                      <th className="pb-1.5 font-medium">#</th>
                      <th className="pb-1.5 font-medium">Club</th>
                      <th className="pb-1.5 text-right font-medium">P</th>
                      <th className="pb-1.5 text-right font-medium">GD</th>
                      <th className="pb-1.5 text-right font-medium">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(STANDINGS[match.league] ?? []).map((row) => {
                      const [team, rank, points, played, , , , gd] = row;
                      const isMatchTeam = team === match.home || team === match.away;
                      return (
                        <tr key={team} style={isMatchTeam ? { color: "#4ade80" } : undefined}>
                          <td className="py-1">{rank}</td>
                          <td className="truncate py-1 pr-2">{team}</td>
                          <td className="py-1 text-right">{played}</td>
                          <td className="py-1 text-right">{gd}</td>
                          <td className="py-1 text-right font-semibold">{points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <p className="max-w-sm text-center text-xs" style={{ color: "var(--text-faint)" }}>
        A real, scrollable prototype — not a screenshot. Matches, scores, events, and standings above are
        pulled straight from the project&apos;s own cached prediction and fixture data.
      </p>
    </div>
  );
}
