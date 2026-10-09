"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Radio,
  Shield,
  Trophy,
} from "lucide-react";

type Screen = "fixtures" | "filter" | "detail" | "prediction" | "live";
type DetailTab = "events" | "standings";

const COLORS = {
  bg: "#000000",
  card: "#1B1B32",
  cardAlt: "#171B24",
  line: "#31353E",
  text: "#F4F1ED",
  muted: "#B8B8C7",
  faint: "#8F9CAF",
  red: "#FF3B45",
  redSoft: "#4A1720",
  yellow: "#FFD600",
  green: "#28E878",
  blue: "#168BFF",
};

const leagues = ["Premier League", "Bundesliga", "La Liga", "Serie A", "Ligue 1", "Süper Lig"];

type Fixture = {
  league: string;
  home: string;
  away: string;
  homeCode: string;
  awayCode: string;
  homePct: number;
  drawPct: number;
  awayPct: number;
  status: string;
  score?: string;
};

const FIXTURES_BY_DAY: Fixture[][] = [
  [
    { league: "Premier League", home: "Liverpool", away: "Chelsea", homeCode: "LIV", awayCode: "CHE", homePct: 51.8, drawPct: 25.6, awayPct: 22.6, status: "FULL TIME", score: "2 – 2" },
    { league: "La Liga", home: "Barcelona", away: "Sevilla", homeCode: "BAR", awayCode: "SEV", homePct: 64.1, drawPct: 21.4, awayPct: 14.5, status: "FULL TIME", score: "3 – 1" },
  ],
  [
    { league: "Bundesliga", home: "Dortmund", away: "Leverkusen", homeCode: "BVB", awayCode: "B04", homePct: 42.3, drawPct: 27.8, awayPct: 29.9, status: "FULL TIME", score: "1 – 0" },
    { league: "Süper Lig", home: "Galatasaray", away: "Trabzonspor", homeCode: "GS", awayCode: "TS", homePct: 59.6, drawPct: 24.1, awayPct: 16.3, status: "FULL TIME", score: "2 – 0" },
  ],
  [
    { league: "Premier League", home: "Arsenal", away: "Manchester City", homeCode: "ARS", awayCode: "MCI", homePct: 48.7, drawPct: 25.1, awayPct: 26.2, status: "FULL TIME", score: "2 – 1" },
    { league: "La Liga", home: "Real Madrid", away: "Real Sociedad", homeCode: "RMA", awayCode: "RSO", homePct: 61.2, drawPct: 22.3, awayPct: 16.5, status: "FULL TIME", score: "1 – 1" },
  ],
  [
    { league: "Premier League", home: "Chelsea", away: "Nottingham Forest", homeCode: "CHE", awayCode: "NFO", homePct: 55.4, drawPct: 24.8, awayPct: 19.8, status: "FULL TIME", score: "2 – 1" },
    { league: "Premier League", home: "Arsenal", away: "Manchester City", homeCode: "ARS", awayCode: "MCI", homePct: 48.7, drawPct: 25.1, awayPct: 26.2, status: "20:00" },
    { league: "La Liga", home: "Real Madrid", away: "Real Sociedad", homeCode: "RMA", awayCode: "RSO", homePct: 61.2, drawPct: 22.3, awayPct: 16.5, status: "21:00" },
  ],
  [
    { league: "Premier League", home: "Liverpool", away: "Tottenham", homeCode: "LIV", awayCode: "TOT", homePct: 54.6, drawPct: 24.0, awayPct: 21.4, status: "15:00" },
    { league: "La Liga", home: "Barcelona", away: "Valencia", homeCode: "BAR", awayCode: "VAL", homePct: 66.8, drawPct: 20.1, awayPct: 13.1, status: "20:00" },
  ],
  [
    { league: "Bundesliga", home: "Bayern Munich", away: "Dortmund", homeCode: "FCB", awayCode: "BVB", homePct: 57.3, drawPct: 23.9, awayPct: 18.8, status: "17:30" },
    { league: "Serie A", home: "Juventus", away: "Inter Milan", homeCode: "JUV", awayCode: "INT", homePct: 35.2, drawPct: 29.8, awayPct: 35.0, status: "19:45" },
  ],
  [
    { league: "Süper Lig", home: "Galatasaray", away: "Fenerbahçe", homeCode: "GS", awayCode: "FB", homePct: 41.7, drawPct: 28.2, awayPct: 30.1, status: "18:00" },
    { league: "Ligue 1", home: "PSG", away: "Monaco", homeCode: "PSG", awayCode: "ASM", homePct: 62.4, drawPct: 21.7, awayPct: 15.9, status: "20:00" },
  ],
];

const fixtures = FIXTURES_BY_DAY[3];

function Crest({ code, tone = COLORS.red }: { code: string; tone?: string }) {
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border text-[10px] font-black tracking-tight"
      style={{ color: COLORS.text, borderColor: `${tone}88`, background: `${tone}22` }}
      aria-hidden="true"
    >
      {code}
    </span>
  );
}

function ProbabilityBar({ home, draw, away }: { home: number; draw: number; away: number }) {
  return (
    <div>
      <div className="flex h-1.5 gap-1.5 overflow-hidden rounded-full">
        <span className="rounded-full" style={{ width: `${home}%`, background: COLORS.red }} />
        <span className="rounded-full" style={{ width: `${draw}%`, background: COLORS.yellow }} />
        <span className="rounded-full" style={{ width: `${away}%`, background: COLORS.green }} />
      </div>
      <div className="mt-2.5 grid grid-cols-3 text-[10px] font-bold">
        <span><b className="text-[14px] text-white">{home.toFixed(1)}%</b><br /><span style={{ color: COLORS.faint }}>HOME</span></span>
        <span className="text-center"><b className="text-[14px] text-white">{draw.toFixed(1)}%</b><br /><span style={{ color: COLORS.faint }}>DRAW</span></span>
        <span className="text-right"><b className="text-[14px] text-white">{away.toFixed(1)}%</b><br /><span style={{ color: COLORS.faint }}>AWAY</span></span>
      </div>
    </div>
  );
}

function FixtureCard({ fixture, onDetails, onPrediction }: { fixture: Fixture; onDetails: () => void; onPrediction: () => void }) {
  const isFinished = fixture.status === "FULL TIME";
  return (
    <div className="rounded-2xl border p-3.5" style={{ borderColor: COLORS.line, background: COLORS.cardAlt }}>
      <div className="flex items-center justify-between gap-2 text-[10px] font-bold" style={{ color: COLORS.muted }}>
        <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: isFinished ? COLORS.green : COLORS.faint }} />{fixture.status}</span>
        <button type="button" onClick={onDetails} className="flex min-h-8 items-center gap-1 text-white">Match details <ChevronRight className="h-3 w-3" /></button>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_58px_1fr] items-start gap-2 text-center">
        <div className="flex flex-col items-center gap-1.5"><Crest code={fixture.homeCode} /><span className="text-[11px] font-semibold leading-tight">{fixture.home}</span><span className="text-[8px] font-bold tracking-wider" style={{ color: COLORS.faint }}>HOME</span></div>
        <span className="pt-4 text-lg font-black">{fixture.score ?? "VS"}</span>
        <div className="flex flex-col items-center gap-1.5"><Crest code={fixture.awayCode} tone={COLORS.green} /><span className="text-[11px] font-semibold leading-tight">{fixture.away}</span><span className="text-[8px] font-bold tracking-wider" style={{ color: COLORS.faint }}>AWAY</span></div>
      </div>
      <div className="mt-3"><ProbabilityBar home={fixture.homePct} draw={fixture.drawPct} away={fixture.awayPct} /></div>
      <button type="button" onClick={onPrediction} className="mt-3 flex min-h-9 w-full items-center gap-2 border-t pt-2.5 text-left text-[11px] font-semibold" style={{ borderColor: COLORS.line }}>
        <BarChart3 className="h-3.5 w-3.5" style={{ color: COLORS.red }} /> {isFinished ? "View Saved Prediction" : "Show Prediction"} <ArrowUpRight className="ml-auto h-3.5 w-3.5" style={{ color: COLORS.faint }} />
      </button>
    </div>
  );
}

function FixturesScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [day, setDay] = useState(3);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const visibleFixtures = FIXTURES_BY_DAY[day];
  const visibleLeagues = leagues.filter((league) => visibleFixtures.some((fixture) => fixture.league === league));
  const dateMode = day < 3 ? "Past results" : day === 3 ? "Today" : "Upcoming predictions";
  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b px-4" style={{ background: COLORS.card, borderColor: COLORS.line }}>
        <span className="w-8" /><h3 className="text-sm font-bold">Matchday</h3>
        <button type="button" aria-label="Filter leagues" onClick={() => onNavigate("filter")} className="grid h-8 w-8 place-items-center"><Filter className="h-4 w-4" /></button>
      </header>
      <div className="m-3 rounded-2xl p-3" style={{ background: "#11151C" }}>
        <div className="flex items-center justify-between gap-2">
          <button type="button" className="flex min-h-8 items-center gap-2 text-[12px] font-bold"><CalendarDays className="h-4 w-4" /> October 2026 <ChevronRight className="h-3 w-3 rotate-90" /></button>
          {day !== 3 && <button type="button" onClick={() => setDay(3)} className="rounded-full border px-2.5 py-1 text-[9px] font-bold" style={{ color: COLORS.red, borderColor: COLORS.red }}>Today</button>}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <button type="button" onClick={() => setDay(Math.max(0, day - 1))} className="grid h-11 w-6 place-items-center"><ChevronLeft className="h-3.5 w-3.5" /></button>
          {days.map((label, i) => (
            <button key={`${label}-${i}`} type="button" onClick={() => setDay(i)} className="flex h-12 flex-1 flex-col items-center justify-center rounded-xl text-[9px] font-bold" style={{ color: i === day ? "#000" : COLORS.muted, background: i === day ? "#fff" : "transparent" }}>
              <span>{label}</span><span className="mt-1 text-sm">{5 + i}</span><i className="mt-1 h-1 w-1 rounded-full" style={{ background: i === day ? "#000" : i > 1 && i < 6 ? "#fff" : "transparent" }} />
            </button>
          ))}
          <button type="button" onClick={() => setDay(Math.min(6, day + 1))} className="grid h-11 w-6 place-items-center"><ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="space-y-3 px-3">
        <div className="flex items-center justify-between rounded-xl border px-3 py-2" style={{ color: COLORS.muted, borderColor: COLORS.line, background: COLORS.card }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.16em]">{dateMode}</span>
          <span className="text-[10px]">Oct {5 + day} · {visibleFixtures.length} matches</span>
        </div>
        {visibleLeagues.map((league, leagueIndex) => {
          const leagueFixtures = visibleFixtures.filter((fixture) => fixture.league === league);
          return (
            <div key={league} className="space-y-3">
              <div className="flex items-center gap-2 pt-1">
                <Trophy className="h-4 w-4" style={{ color: leagueIndex % 2 === 0 ? COLORS.yellow : COLORS.red }} />
                <span className="text-xs font-semibold">{league}</span>
                <span className="ml-auto text-[10px]" style={{ color: COLORS.faint }}>{leagueFixtures.length} {leagueFixtures.length === 1 ? "match" : "matches"}</span>
              </div>
              {leagueFixtures.map((fixture) => <FixtureCard key={`${fixture.home}-${fixture.away}`} fixture={fixture} onDetails={() => onNavigate("detail")} onPrediction={() => onNavigate("prediction")} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((x) => x !== name) : [...current, name]);
  return (
    <div className="flex min-h-full flex-col pb-4">
      <header className="flex h-12 items-center justify-between border-b px-4" style={{ background: COLORS.card, borderColor: COLORS.line }}><button type="button" onClick={onBack} className="text-[11px]">Cancel</button><h3 className="text-sm font-bold">Leagues</h3><span className="w-10" /></header>
      <div className="flex-1 space-y-2 p-3">
        {["All Leagues", ...leagues].map((league) => {
          const active = league === "All Leagues" ? selected.length === 0 : selected.includes(league);
          return <button key={league} type="button" onClick={() => league === "All Leagues" ? setSelected([]) : toggle(league)} className="flex min-h-14 w-full items-center gap-3 rounded-xl border px-3 text-left text-[12px] font-medium" style={{ background: COLORS.card, borderColor: COLORS.line }}><Shield className="h-6 w-6" style={{ color: league === "All Leagues" ? COLORS.muted : COLORS.yellow }} />{league}<span className="ml-auto grid h-5 w-5 place-items-center rounded-full border" style={{ color: active ? "#fff" : COLORS.faint, background: active ? COLORS.red : "transparent", borderColor: active ? COLORS.red : COLORS.faint }}>{active && <Check className="h-3 w-3" />}</span></button>;
        })}
      </div>
      <button type="button" onClick={onBack} className="mx-3 min-h-11 rounded-xl text-xs font-bold text-white" style={{ background: COLORS.red }}>Show Matches</button>
    </div>
  );
}

const events = [
  ["18'", "Goal", "Bukayo Saka", "Assist: Martin Ødegaard", true],
  ["34'", "Card", "Rodri", "Yellow card", false],
  ["52'", "Goal", "Erling Haaland", "Assist: Phil Foden", false],
  ["71'", "Sub", "Gabriel Martinelli", "Leandro Trossard", true],
] as const;

function EventMark({ type }: { type: string }) {
  return (
    <span style={{ color: type === "Card" ? COLORS.yellow : COLORS.green }}>
      {type === "Sub" ? <ArrowLeftRight className="h-4 w-4" /> : type === "Card" ? "▮" : "⚽"}
    </span>
  );
}

function DetailScreen({ onBack, onPrediction }: { onBack: () => void; onPrediction: () => void }) {
  const [tab, setTab] = useState<DetailTab>("events");
  return (
    <div className="pb-8">
      <header className="flex h-12 items-center border-b px-3" style={{ background: COLORS.card, borderColor: COLORS.line }}><button type="button" onClick={onBack} className="flex items-center gap-1 text-[11px]"><ChevronLeft className="h-4 w-4" /> Matchday</button><h3 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold">Match Detail</h3></header>
      <section className="m-3 rounded-[24px] border p-4 text-center" style={{ background: COLORS.card, borderColor: COLORS.line }}>
        <Trophy className="mx-auto h-7 w-7" style={{ color: COLORS.yellow }} /><p className="mt-1 text-[9px] font-semibold tracking-widest" style={{ color: COLORS.muted }}>PREMIER LEAGUE</p><p className="mt-2 text-[10px] font-bold" style={{ color: COLORS.red }}>MATCH</p>
        <div className="mt-3 grid grid-cols-[1fr_50px_1fr] items-start gap-2"><div className="flex flex-col items-center gap-2"><Crest code="ARS" /><span className="text-xs font-semibold">Arsenal</span></div><span className="pt-5 text-sm italic" style={{ color: COLORS.faint }}>vs</span><div className="flex flex-col items-center gap-2"><Crest code="MCI" tone={COLORS.green} /><span className="text-xs font-semibold">Manchester City</span></div></div>
        <button type="button" onClick={onPrediction} className="mt-4 min-h-10 rounded-xl px-5 text-[11px] font-semibold text-white" style={{ background: COLORS.red }}>Show Prediction</button>
      </section>
      <div className="mx-3 flex rounded-xl p-1" style={{ background: "#202024" }}>{(["events", "standings"] as DetailTab[]).map((item) => <button key={item} type="button" onClick={() => setTab(item)} className="min-h-9 flex-1 rounded-lg text-xs font-bold capitalize" style={{ background: tab === item ? "#55555E" : "transparent" }}>{item}</button>)}</div>
      {tab === "events" ? <div className="px-5 pt-3"><p className="py-2 text-xs font-bold tracking-wider">MATCH EVENTS</p>{events.map(([minute, type, player, detail, home]) => <div key={`${minute}-${player}`} className="flex min-h-14 items-center gap-2 border-b text-[11px]" style={{ borderColor: COLORS.line }}>{home ? <><b style={{ color: COLORS.muted }}>{minute}</b><EventMark type={type} /><span><b>{player}</b><br /><small style={{ color: COLORS.faint }}>{detail}</small></span></> : <><span className="ml-auto text-right"><b>{player}</b><br /><small style={{ color: COLORS.faint }}>{detail}</small></span><EventMark type={type} /><b style={{ color: COLORS.muted }}>{minute}</b></>}</div>)}</div> : <Standings />}
    </div>
  );
}

function Standings() {
  const rows = [[1, "Arsenal", 7, 17], [2, "Manchester City", 7, 16], [3, "Liverpool", 7, 15], [4, "Chelsea", 7, 13], [5, "Tottenham", 7, 12], [6, "Aston Villa", 7, 11]];
  return <div className="m-3 rounded-2xl p-3" style={{ background: "#13223E" }}><div className="grid grid-cols-[22px_1fr_28px_30px] border-b pb-2 text-[9px] font-bold" style={{ borderColor: COLORS.line }}><span>#</span><span>Club</span><span>P</span><span>Pts</span></div>{rows.map(([pos, name, played, pts]) => <div key={name} className="grid min-h-10 grid-cols-[22px_1fr_28px_30px] items-center rounded-lg px-0.5 text-[10px]" style={{ background: name === "Arsenal" ? `${COLORS.red}24` : name === "Manchester City" ? `${COLORS.yellow}1c` : "transparent" }}><b>{pos}</b><b>{name}</b><span style={{ color: COLORS.muted }}>{played}</span><b>{pts}</b></div>)}</div>;
}

function PredictionScreen({ onBack }: { onBack: () => void }) {
  const metrics = [["Elo rating", "1887", "1841", 72, 58], ["Expected goals", "1.82", "1.41", 82, 63], ["Last-five win rate", "80%", "60%", 80, 60]] as const;
  return <div className="pb-8"><header className="flex h-12 items-center border-b px-3" style={{ background: COLORS.card, borderColor: COLORS.line }}><button type="button" onClick={onBack} className="flex items-center gap-1 text-[11px]"><ChevronLeft className="h-4 w-4" /> Matchday</button><h3 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold">Prediction</h3></header><div className="space-y-3 p-4"><div><p className="text-[9px] font-bold tracking-[.2em]" style={{ color: COLORS.red }}>THE MATCH, EXPLAINED</p><h4 className="mt-1 text-2xl font-black">Why this prediction?</h4><p className="text-[11px]" style={{ color: COLORS.muted }}>Probabilities, recent form and the factors to watch.</p></div><div className="rounded-[22px] border p-4" style={{ background: COLORS.card, borderColor: COLORS.line }}><div className="grid grid-cols-[1fr_34px_1fr] items-center text-center"><div className="flex flex-col items-center gap-1"><Crest code="ARS" /><b className="text-xs">Arsenal</b></div><span className="text-[10px]" style={{ color: COLORS.faint }}>VS</span><div className="flex flex-col items-center gap-1"><Crest code="MCI" tone={COLORS.green} /><b className="text-xs">Man City</b></div></div><div className="mt-4 border-t pt-4" style={{ borderColor: COLORS.line }}><ProbabilityBar home={48.7} draw={25.1} away={26.2} /></div></div><div className="rounded-xl p-4" style={{ background: COLORS.redSoft }}><p className="text-[9px] font-bold tracking-wider" style={{ color: COLORS.red }}>MOST LIKELY OUTCOME</p><p className="mt-1 text-lg font-black">Arsenal · 49%</p><p className="mt-1 text-[10px]" style={{ color: COLORS.muted }}>Estimated probabilities; every outcome remains possible.</p></div><div className="rounded-2xl p-4" style={{ background: COLORS.card }}><p className="text-[10px] font-bold tracking-wider" style={{ color: COLORS.faint }}>RECENT FORM · LAST FIVE MATCHES</p>{[["Arsenal", "W", "W", "D", "W", "W"], ["Manchester City", "W", "L", "W", "D", "W"]].map((row) => <div key={row[0]} className="mt-3"><b className="text-[11px]">{row[0]}</b><div className="mt-1.5 flex gap-1.5">{row.slice(1).map((letter, i) => <span key={i} className="grid h-7 w-7 place-items-center rounded-md border text-[10px] font-bold" style={{ color: letter === "W" ? COLORS.green : letter === "D" ? COLORS.blue : COLORS.red, borderColor: letter === "W" ? COLORS.green : letter === "D" ? COLORS.blue : COLORS.red }}>{letter}</span>)}</div></div>)}</div><div className="rounded-2xl p-4" style={{ background: COLORS.card }}><p className="text-[10px] font-bold">BEHIND THE PREDICTION</p><div className="mt-3 space-y-4">{metrics.map(([label, home, away, h, a]) => <div key={label}><div className="flex items-end justify-between text-xs"><b>{home}</b><span className="text-[10px]" style={{ color: COLORS.muted }}>{label}</span><b>{away}</b></div><div className="mt-1.5 flex gap-1.5"><span className="h-1.5 rounded-full" style={{ width: `${h}%`, background: COLORS.red }} /><span className="h-1.5 rounded-full" style={{ width: `${a}%`, background: COLORS.green }} /></div></div>)}</div></div></div></div>;
}

function LiveScreen({ onDetails, onPrediction }: { onDetails: () => void; onPrediction: () => void }) {
  const liveFixture = { ...fixtures[0], status: "67'", score: "1 – 1", homePct: 34.2, drawPct: 40.6, awayPct: 25.2 };
  return <div className="pb-20"><header className="flex h-12 items-center justify-center border-b" style={{ background: COLORS.card, borderColor: COLORS.line }}><h3 className="text-sm font-bold">Live</h3></header><div className="p-3"><div className="mb-3 flex items-center gap-2"><Radio className="h-4 w-4" style={{ color: COLORS.red }} /><b className="text-xs">Premier League</b><span className="ml-auto text-[10px]" style={{ color: COLORS.faint }}>1 match</span></div><FixtureCard fixture={liveFixture} onDetails={onDetails} onPrediction={onPrediction} /><p className="mt-2 text-center text-[9px]" style={{ color: COLORS.muted }}>Prediction updated: 20:47 UTC</p></div></div>;
}

export default function FootballAppPhone() {
  const [screen, setScreen] = useState<Screen>("fixtures");
  const [history, setHistory] = useState<Screen[]>([]);
  const navigate = (next: Screen) => { setHistory((current) => [...current, screen]); setScreen(next); };
  const back = () => { const previous = history.at(-1) ?? "fixtures"; setHistory((current) => current.slice(0, -1)); setScreen(previous); };
  const title = useMemo(() => ({ fixtures: "Matchday", filter: "League filters", detail: "Match detail", prediction: "Why this prediction?", live: "Live matches" })[screen], [screen]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full max-w-[760px] rounded-3xl border p-4 sm:p-6" style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}>
        <div className="grid items-center gap-6 md:grid-cols-[minmax(250px,330px)_1fr]">
          <div className="relative mx-auto h-[650px] w-full max-w-[330px] overflow-hidden rounded-[2.8rem] border-[7px] shadow-2xl" style={{ borderColor: "#18181b", background: COLORS.bg, color: COLORS.text }}>
            <div className="absolute left-1/2 top-0 z-30 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#18181b]" />
            <div className="h-full overflow-y-auto overscroll-contain pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {screen === "fixtures" && <FixturesScreen onNavigate={navigate} />}
              {screen === "filter" && <FilterScreen onBack={back} />}
              {screen === "detail" && <DetailScreen onBack={back} onPrediction={() => navigate("prediction")} />}
              {screen === "prediction" && <PredictionScreen onBack={back} />}
              {screen === "live" && <LiveScreen onDetails={() => navigate("detail")} onPrediction={() => navigate("prediction")} />}
            </div>
            {(screen === "fixtures" || screen === "live") && <nav className="absolute inset-x-0 bottom-0 z-20 flex h-16 border-t" style={{ background: `${COLORS.card}f5`, borderColor: COLORS.line }}><button type="button" onClick={() => setScreen("fixtures")} className="flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-semibold" style={{ color: screen === "fixtures" ? COLORS.red : COLORS.muted }}><CalendarDays className="h-5 w-5" />Fixtures</button><button type="button" onClick={() => setScreen("live")} className="flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-semibold" style={{ color: screen === "live" ? COLORS.red : COLORS.muted }}><Radio className="h-5 w-5" />Live</button></nav>}
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>Interactive iOS demo</p>
            <h4 className="font-hero mt-2 text-2xl font-semibold italic">{title}</h4>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>Built directly from the current SwiftUI interface in the repository. Choose dates, filter leagues, open match details, switch between events and standings, and inspect the model&apos;s prediction evidence.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {[{ id: "fixtures", label: "Fixtures" }, { id: "filter", label: "Filters" }, { id: "detail", label: "Match detail" }, { id: "prediction", label: "Prediction" }, { id: "live", label: "Live" }].map((item) => <button key={item.id} type="button" onClick={() => { setHistory([]); setScreen(item.id as Screen); }} className="rounded-full border px-3 py-2 text-xs font-semibold transition hover:opacity-70" style={{ borderColor: screen === item.id ? "var(--accent)" : "var(--border)", color: screen === item.id ? "var(--accent-strong)" : "var(--text-soft)", background: "var(--surface)" }}>{item.label}</button>)}
            </div>
            <button type="button" onClick={() => { setHistory([]); setScreen("fixtures"); }} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--text-faint)" }}><ArrowLeft className="h-3.5 w-3.5" /> Reset demo</button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs" style={{ color: "var(--text-faint)" }}>Demo data is illustrative; the layout and interactions mirror the current MatchdayLedger SwiftUI app.</p>
    </div>
  );
}
