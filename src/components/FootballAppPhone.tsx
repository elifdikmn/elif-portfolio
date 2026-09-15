"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, ChevronDown, ChevronLeft, ChevronRight, Menu, Sun } from "lucide-react";

type MatchEvent = { minute: number; team: string; type: "Goal" | "Card" | "RedCard" | "subst"; player: string; assist?: string | null };
type StandingRow = [team: string, rank: number, points: number, played: number, win: number, draw: number, lose: number, gd: number];

type Match = {
  id: string;
  league: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  homeProb: number;
  drawProb: number;
  awayProb: number;
  scorers?: string;
};

// Real cached fixtures + predictions, from the FootballMatchPrediction repo's prediction_cache.json.
const MATCHES: Match[] = [
  { id: "1223953", league: "Serie A", home: "Udinese", away: "Monza", homeGoals: 1, awayGoals: 2, homeProb: 32.12, drawProb: 34.88, awayProb: 33.0, scorers: "L. Lucca '75" },
  { id: "1208378", league: "EPL", home: "Newcastle", away: "Chelsea", homeGoals: 2, awayGoals: 0, homeProb: 24.83, drawProb: 42.14, awayProb: 33.03, scorers: "S. Tonali '2, B. Guimarães '90" },
  { id: "1238155", league: "Turkish Süper Lig", home: "Sivasspor", away: "BB Bodrumspor", homeGoals: 0, awayGoals: 0, homeProb: 34.12, drawProb: 20.99, awayProb: 44.89 },
  { id: "1224264", league: "Bundesliga", home: "Stuttgart", away: "Augsburg", homeGoals: 4, awayGoals: 0, homeProb: 34.02, drawProb: 30.1, awayProb: 35.87, scorers: "A. Karazor '8, N. Woltemade '51" },
  { id: "1208802", league: "La Liga", home: "Betis", away: "Osasuna", homeGoals: 1, awayGoals: 1, homeProb: 30.77, drawProb: 36.51, awayProb: 32.73, scorers: "C. Hernández '64" },
];

// Real match events, deduplicated, from events_cache.json.
const EVENTS: Record<string, MatchEvent[]> = {
  "1223953": [
    { minute: 13, team: "Monza", type: "Card", player: "Jean-Daniel Akpa Akpro" },
    { minute: 46, team: "Udinese", type: "subst", player: "Oier Zarraga", assist: "S. Lovrić" },
    { minute: 50, team: "Udinese", type: "Card", player: "Arthur Atta" },
    { minute: 52, team: "Monza", type: "Goal", player: "G. Caprari" },
    { minute: 65, team: "Monza", type: "subst", player: "G. Castrovilli", assist: "K. Zeroli" },
    { minute: 75, team: "Udinese", type: "Goal", player: "L. Lucca", assist: "J. Karlström" },
    { minute: 90, team: "Monza", type: "Goal", player: "K. Baldé", assist: "K. Zeroli" },
    { minute: 90, team: "Udinese", type: "Card", player: "Lorenzo Lucca" },
  ],
  "1208378": [
    { minute: 2, team: "Newcastle", type: "Goal", player: "S. Tonali", assist: "J. Murphy" },
    { minute: 36, team: "Chelsea", type: "RedCard", player: "Nicolas Jackson" },
    { minute: 45, team: "Chelsea", type: "Card", player: "Enzo Fernández" },
    { minute: 53, team: "Newcastle", type: "Card", player: "Fabian Schär" },
    { minute: 64, team: "Newcastle", type: "Card", player: "Jacob Murphy" },
    { minute: 84, team: "Newcastle", type: "Card", player: "Bruno Guimarães" },
    { minute: 90, team: "Newcastle", type: "Goal", player: "Bruno Guimarães", assist: "D. Burn" },
  ],
  "1238155": [
    { minute: 20, team: "BB Bodrumspor", type: "Card", player: "Ahmet Aslan" },
    { minute: 67, team: "BB Bodrumspor", type: "Card", player: "Jonathan Okita" },
    { minute: 72, team: "Sivasspor", type: "Card", player: "Tolga Ciğerci" },
    { minute: 87, team: "BB Bodrumspor", type: "Card", player: "Taulant Seferi" },
    { minute: 90, team: "Sivasspor", type: "Card", player: "Uroš Radaković" },
  ],
  "1224264": [
    { minute: 8, team: "VfB Stuttgart", type: "Goal", player: "A. Karazor" },
    { minute: 11, team: "FC Augsburg", type: "RedCard", player: "Samuel Essende" },
    { minute: 45, team: "VfB Stuttgart", type: "Card", player: "Enzo Millot" },
    { minute: 51, team: "VfB Stuttgart", type: "Goal", player: "N. Woltemade", assist: "E. Millot" },
    { minute: 80, team: "VfB Stuttgart", type: "Goal", player: "E. Millot" },
    { minute: 86, team: "FC Augsburg", type: "Card", player: "Dimitrios Giannoulis" },
    { minute: 87, team: "VfB Stuttgart", type: "Goal", player: "E. Demirović", assist: "C. Führich" },
  ],
  "1208802": [
    { minute: 9, team: "Osasuna", type: "Card", player: "Alejandro Catena" },
    { minute: 23, team: "Real Betis", type: "Card", player: "Romain Perraud" },
    { minute: 45, team: "Osasuna", type: "Card", player: "Ante Budimir" },
    { minute: 64, team: "Real Betis", type: "Goal", player: "C. Hernández", assist: "Isco" },
    { minute: 75, team: "Osasuna", type: "Goal", player: "A. Budimir", assist: "Aimar Oroz" },
    { minute: 77, team: "Real Betis", type: "Card", player: "Sergi Altimira" },
    { minute: 90, team: "Real Betis", type: "Card", player: "Antony" },
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

const LEAGUES = ["Serie A", "EPL", "Turkish Süper Lig", "Bundesliga", "La Liga"];
const DATES = ["18 May", "19 May", "20 May", "21 May", "22 May", "23 May", "24 May"];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Crest({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
      style={{ background: color }}
    >
      {initials(name)}
    </div>
  );
}

const TEAM_COLORS: Record<string, string> = {
  Udinese: "#000000",
  Monza: "#c8102e",
  Newcastle: "#241f20",
  Chelsea: "#034694",
  Sivasspor: "#8b0000",
  "BB Bodrumspor": "#1c1c1c",
  Stuttgart: "#e30613",
  Augsburg: "#bb372f",
  Betis: "#00954c",
  Osasuna: "#0a3775",
};

function eventIcon(type: MatchEvent["type"]) {
  if (type === "Goal") return <span className="text-[13px]">⚽</span>;
  if (type === "RedCard") return <span className="h-3 w-2.5 rounded-[2px]" style={{ background: "#ef4444", display: "inline-block" }} />;
  if (type === "Card") return <span className="h-3 w-2.5 rounded-[2px]" style={{ background: "#eab308", display: "inline-block" }} />;
  return <span className="text-[12px] text-blue-400">⇄</span>;
}

function ProbRow({ home, draw, away }: { home: number; draw: number; away: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/60">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ef4444" }} /> home: {home.toFixed(2)}%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22c55e" }} /> draw: {draw.toFixed(2)}%
        </span>
        <span className="flex items-center gap-1">
          away: {away.toFixed(2)}% <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#eab308" }} />
        </span>
      </div>
      <div className="flex gap-1">
        <div className="h-2 rounded-full" style={{ width: `${home}%`, background: "#ef4444" }} />
        <div className="h-2 rounded-full" style={{ width: `${draw}%`, background: "#22c55e" }} />
        <div className="h-2 rounded-full" style={{ width: `${away}%`, background: "#eab308" }} />
      </div>
    </div>
  );
}

function MatchCard({ m, onDetail }: { m: Match; onDetail: (id: string) => void }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "#171a24" }}>
      <div className="mb-2.5 flex items-center justify-between text-[10px] font-medium text-white/40">
        <span>Home</span>
        <button type="button" onClick={() => onDetail(m.id)} className="rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: "#2563eb" }}>
          Detail
        </button>
        <span>Away</span>
      </div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Crest name={m.home} color={TEAM_COLORS[m.home] ?? "#374151"} />
          <span className="truncate text-[13px] font-semibold text-white">{m.home}</span>
        </div>
        <span className="font-hero shrink-0 px-2 text-[15px] font-bold" style={{ color: "#4ade80" }}>
          {m.homeGoals} - {m.awayGoals}
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <span className="truncate text-right text-[13px] font-semibold text-white">{m.away}</span>
          <Crest name={m.away} color={TEAM_COLORS[m.away] ?? "#374151"} />
        </div>
      </div>
      {m.scorers && <p className="mb-3 truncate text-[10px] text-white/35">{m.scorers}</p>}
      {!m.scorers && <div className="mb-3" />}
      <ProbRow home={m.homeProb} draw={m.drawProb} away={m.awayProb} />
      <button type="button" onClick={() => onDetail(m.id)} className="mt-3 w-full rounded-xl py-2.5 text-[12px] font-bold text-white" style={{ background: "#dc2626" }}>
        Check Out Why
      </button>
    </div>
  );
}

export default function FootballAppPhone() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<"events" | "standings">("events");
  const [activeLeagues, setActiveLeagues] = useState<string[]>(LEAGUES);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeDate, setActiveDate] = useState("18 May");

  const match = MATCHES.find((m) => m.id === selectedId) ?? null;
  const grouped = LEAGUES.filter((l) => activeLeagues.includes(l)).map((l) => ({
    league: l,
    matches: MATCHES.filter((m) => m.league === l),
  }));

  const toggleLeague = (l: string) => {
    setActiveLeagues((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  };

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
          background: "#000",
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
            <div className="flex items-center gap-2 px-4 pb-2 pt-2">
              <button type="button" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ background: "#2563eb" }}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-semibold text-white" style={{ background: "#2563eb" }}>
                <Calendar className="h-3.5 w-3.5" /> Pick A Date
              </div>
              <button type="button" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ background: "#2563eb" }}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto px-4 pb-2 text-center">
              {DATES.map((d) => {
                const [day, mon] = d.split(" ");
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDate(d)}
                    className="shrink-0"
                    style={{ color: d === activeDate ? "#3b82f6" : "rgba(255,255,255,0.4)" }}
                  >
                    <div className="text-[15px] font-bold leading-tight">{day}</div>
                    <div className="text-[11px] leading-tight">{mon}</div>
                  </button>
                );
              })}
            </div>

            <div className="px-4 pb-2 pt-2">
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[13px] font-semibold text-white"
                style={{ background: "#2563eb" }}
              >
                Select Leagues
                <ChevronDown className={`h-4 w-4 transition ${filterOpen ? "rotate-180" : ""}`} />
              </button>
              {filterOpen && (
                <div className="mt-1.5 overflow-hidden rounded-xl" style={{ background: "#171a24" }}>
                  {LEAGUES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => toggleLeague(l)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[12px] text-white/85 transition hover:bg-white/5"
                    >
                      {l}
                      <span
                        className="grid h-4 w-4 place-items-center rounded border text-[9px]"
                        style={{ borderColor: "rgba(255,255,255,0.3)", background: activeLeagues.includes(l) ? "#2563eb" : "transparent" }}
                      >
                        {activeLeagues.includes(l) && "✓"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-1">
              {grouped.map(({ league, matches }) => (
                <div key={league}>
                  <div className="mb-2 flex items-center gap-2">
                    <Crest name={league} color="#374151" />
                    <span className="text-[14px] font-bold text-white">{league}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {matches.map((m) => (
                      <MatchCard key={m.id} m={m} onDetail={openDetail} />
                    ))}
                  </div>
                </div>
              ))}
              {grouped.length === 0 && <p className="pt-10 text-center text-[12px] text-white/40">No leagues selected.</p>}
            </div>
          </>
        ) : match ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 pb-3 pt-1">
              <button type="button" onClick={() => setView("list")} className="flex items-center gap-1 text-[13px] font-medium" style={{ color: "#3b82f6" }}>
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="mx-auto pr-10 text-[14px] font-bold text-white">Match Detail</span>
            </div>

            <div className="mx-4 mb-3 rounded-2xl p-4" style={{ background: "#171a24" }}>
              <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-white/40">
                <span>Home</span>
                <span>Away</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Crest name={match.home} color={TEAM_COLORS[match.home] ?? "#374151"} />
                  <span className="truncate text-[13px] font-semibold text-white">{match.home}</span>
                </div>
                <span className="font-hero shrink-0 px-2 text-[16px] font-bold" style={{ color: "#4ade80" }}>
                  {match.homeGoals} - {match.awayGoals}
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                  <span className="truncate text-right text-[13px] font-semibold text-white">{match.away}</span>
                  <Crest name={match.away} color={TEAM_COLORS[match.away] ?? "#374151"} />
                </div>
              </div>
              <button type="button" className="mt-3 w-full rounded-xl py-2.5 text-[12px] font-bold text-white" style={{ background: "#dc2626" }}>
                Check Out Why
              </button>
            </div>

            <div className="mx-4 mb-3 flex overflow-hidden rounded-xl" style={{ background: "#171a24" }}>
              {(["events", "standings"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDetailTab(t)}
                  className="flex-1 py-2.5 text-[12px] font-semibold capitalize"
                  style={{ background: detailTab === t ? "#374151" : "transparent", color: detailTab === t ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {detailTab === "events" ? (
                <div className="flex flex-col gap-4">
                  {[1, 2].map((half) => {
                    const halfEvents = (EVENTS[match.id] ?? []).filter((e) => (half === 1 ? e.minute <= 45 : e.minute > 45));
                    if (halfEvents.length === 0) return null;
                    return (
                      <div key={half}>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-white">{half === 1 ? "First Half" : "Second Half"}</p>
                        <ul className="flex flex-col gap-2.5">
                          {halfEvents.map((e, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-[12px] text-white/85">
                              <span className="w-7 shrink-0 text-white/40">{e.minute}&apos;</span>
                              {eventIcon(e.type)}
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-medium text-white">{e.player}</span>
                                {e.assist && <span className="block truncate text-[10px] text-white/40">Assist: {e.assist}</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl">
                  <table className="w-full text-left text-[11px] text-white/85">
                    <thead>
                      <tr style={{ background: "#1e2a4a" }} className="text-white">
                        <th className="px-2 py-2 font-medium">#</th>
                        <th className="px-2 py-2 font-medium">Club</th>
                        <th className="px-2 py-2 text-right font-medium">P</th>
                        <th className="px-2 py-2 text-right font-medium">GD</th>
                        <th className="px-2 py-2 text-right font-medium">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(STANDINGS[match.league] ?? []).map((row, i) => {
                        const [team, rank, points, played, , , , gd] = row;
                        const isMatchTeam = team === match.home || team === match.away;
                        return (
                          <tr key={team} style={{ background: i < 4 ? "rgba(34,197,94,0.12)" : "#171a24" }}>
                            <td className="px-2 py-2" style={isMatchTeam ? { color: "#4ade80" } : undefined}>
                              {rank}
                            </td>
                            <td className="truncate px-2 py-2" style={isMatchTeam ? { color: "#4ade80" } : undefined}>
                              {team}
                            </td>
                            <td className="px-2 py-2 text-right">{played}</td>
                            <td className="px-2 py-2 text-right">{gd}</td>
                            <td className="px-2 py-2 text-right font-semibold text-white">{points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <p className="max-w-sm text-center text-xs" style={{ color: "var(--text-faint)" }}>
        A real, scrollable prototype matching the actual app&apos;s design — matches, scores, events, and
        standings come straight from the project&apos;s own cached prediction and fixture data.
      </p>
    </div>
  );
}
