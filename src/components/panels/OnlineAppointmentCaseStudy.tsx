"use client";

import { motion, easeOut, type Variants } from "framer-motion";
import { ArrowUpRight, FileText, Github, ArrowLeft } from "lucide-react";
import OnlineAppointmentPhone from "@/components/OnlineAppointmentPhone";

const CHART_BASE = "/projects/online-appointment";
const DESIGN_REPORT_URL = `${CHART_BASE}/Online-Appointment-Design-Report.pdf`;
const ANALYSIS_REPORT_URL = `${CHART_BASE}/Online-Appointment-Analysis-Report.pdf`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

function SectionShell({
  index,
  total = 5,
  eyebrow,
  title,
  children,
  tone = "bg",
}: {
  index: string;
  total?: number;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "bg" | "surface";
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className="rounded-[2rem] border px-5 py-10 sm:px-10 sm:py-14"
      style={{
        borderColor: "var(--border)",
        background: tone === "surface" ? "var(--surface)" : "var(--bg-soft)",
      }}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="font-hero text-sm font-semibold tracking-[0.2em]" style={{ color: "var(--accent-strong)" }}>
          {index} / {String(total).padStart(2, "0")}
        </span>
        <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          {eyebrow}
        </span>
      </div>
      <h3 className="font-hero mb-6 text-[clamp(24px,4vw,38px)] font-semibold italic tracking-tight">{title}</h3>
      {children}
    </motion.section>
  );
}

function Chart({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
      <img src={src} alt={alt} className="w-full object-contain" />
      {caption && (
        <figcaption className="border-t px-4 py-3 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function OnlineAppointmentCaseStudy({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl pb-24" style={{ color: "var(--text)" }}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold opacity-80 transition hover:opacity-100"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to projects
        </button>
        <div className="flex flex-wrap gap-2">
          <a
            href={DESIGN_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            <FileText className="h-4 w-4" /> Design report <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={ANALYSIS_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            <FileText className="h-4 w-4" /> Analysis report <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/elifdikmn/Online-Appointment-System"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--accent-strong)" }}
          >
            <Github className="h-4 w-4" /> Repository <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--text-faint)" }}>
          Case study
        </p>
        <h2 className="font-hero text-[clamp(30px,6vw,54px)] font-semibold italic leading-[1.05] tracking-tight">
          Online Appointment System
        </h2>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          A 5-person software-engineering course project: a mobile appointment-scheduling platform for
          university students and professors, built requirements-first, architecture-second, code-third.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 01 — Hook */}
        <SectionShell index="01" eyebrow="The hook" title="Requirements and architecture, before a screen existed" tone="surface">
          <div className="grid items-center gap-8 sm:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="font-hero text-[clamp(64px,14vw,140px)] font-bold leading-[0.9]" style={{ color: "var(--accent-strong)" }}>
                40,000
              </p>
              <p className="mt-4 max-w-[50ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
                concurrent users — the non-functional spec&apos;s scale target, written down before a single
                Flutter screen was built.
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-sm leading-relaxed" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text-soft)" }}>
              This is a course project, not a deployed, load-tested system — that number was never verified
              against real traffic. It&apos;s here because it&apos;s what the process actually produced: a full
              requirements-analysis and UML design pass, done properly, before writing any UI.
            </div>
          </div>
        </SectionShell>

        {/* 02 — Requirements & Domain Analysis */}
        <SectionShell index="02" eyebrow="Requirements & domain analysis" title="Why email-based scheduling breaks down">
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            Before any design work, the team documented the actual domain: how students and professors currently
            schedule meetings (mostly email), where that breaks (missed messages, double-bookings, no visibility
            into real availability), who the customers and users are, and what competing software already exists
            for other domains (healthcare, beauty, tutoring) but not universities.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Functional requirements (high priority)
              </p>
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                <li>— Log in, entering school/staff ID and password</li>
                <li>— Schedule an appointment, viewing professor availability</li>
                <li>— Request an instant appointment</li>
                <li>— Set instant availability (professor side)</li>
                <li>— Edit calendar, select professor, view calendar</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Non-functional requirements
              </p>
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                <li>— Login within 30 seconds; up to 40,000 concurrent users</li>
                <li>— 24/7 availability, with 3 years of activity-log retention</li>
                <li>— Cross-platform: iOS and Android</li>
                <li>— Integration-ready with the university&apos;s own systems (OBS)</li>
              </ul>
            </div>
          </div>
        </SectionShell>

        {/* 03 — UML System Design */}
        <SectionShell index="03" eyebrow="System design" title="Modeled in UML before a line of Flutter code">
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            Five UML views define the system: what the classes are and how they relate, how the app behaves
            over time, and how responsibilities are split across packages and components.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Chart
              src={`${CHART_BASE}/class_diagram.png`}
              alt="UML class diagram for the appointment system"
              caption="Class diagram — User, Student, Professor, Appointment, Notification, Appointment Calendar."
            />
            <Chart
              src={`${CHART_BASE}/state_diagram.png`}
              alt="UML state diagram showing screen-to-screen transitions in the app"
              caption="State diagram — every screen transition, from login to confirming an appointment."
            />
            <Chart
              src={`${CHART_BASE}/activity_diagram.png`}
              alt="UML activity diagram showing the login and appointment-scheduling activity flow"
              caption="Activity diagram — login validation through scheduling and confirming an appointment."
            />
            <Chart
              src={`${CHART_BASE}/package_diagram.png`}
              alt="UML package diagram separating User Management, Appointment Management, Notifications, Database Access, and UI/UX"
              caption="Package diagram — User Management, Appointment Management, Notifications, Database Access, UI/UX."
            />
          </div>
          <div className="mt-6">
            <Chart
              src={`${CHART_BASE}/component_diagram.png`}
              alt="UML component diagram showing UI, Authentication, Appointment Management, and Database Management components"
              caption="Component diagram — how UI, Authentication, Appointment Management, and Database Management talk to each other."
            />
          </div>
        </SectionShell>

        {/* 04 — Database & Key Flows */}
        <SectionShell index="04" eyebrow="Database & key flows" title="What's actually stored, and how a booking happens" tone="surface">
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            The relational schema centers on Student and Professor as subtypes of User, with Appointment,
            AppointmentCalendar, InstantMeeting, and Notification each owned by the professor or student that
            created them.
          </p>
          <Chart
            src={`${CHART_BASE}/er_diagram.png`}
            alt="Entity-relationship diagram for the appointment system's database"
            caption="Entity-relationship diagram — Student/Professor, Appointment, Notification, Instant Meeting."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Login
              </p>
              <Chart
                src={`${CHART_BASE}/sequence_login.png`}
                alt="Sequence diagram for logging into the app as a student or professor"
                caption="User selects their type, enters credentials, and is either logged in or denied."
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--accent-strong)" }}>
                Schedule Appointment
              </p>
              <Chart
                src={`${CHART_BASE}/sequence_schedule.png`}
                alt="Sequence diagram for a student scheduling an appointment with a professor"
                caption="Student picks a calendar slot, adds a comment, and confirms the appointment."
              />
            </div>
          </div>
        </SectionShell>

        {/* 05 — Try it yourself */}
        <SectionShell index="05" eyebrow="Try it yourself" title="The app">
          <p className="mx-auto mb-8 max-w-[60ch] text-center text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
            These are the real Figma screens from the design report — tap or use the arrows to step through the
            full flow, from logging in to confirming an appointment.
          </p>
          <OnlineAppointmentPhone />
        </SectionShell>
      </div>
    </div>
  );
}
