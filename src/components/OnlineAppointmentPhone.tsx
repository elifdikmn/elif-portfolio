"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Screen = { src: string; alt: string; caption: string };

// Real Figma mockup screens from the Online Appointment System design report — not recreations.
const SCREENS: Screen[] = [
  { src: "/projects/online-appointment/app/1_login_splash.png", alt: "Login splash screen with Yeditepe University branding and Professors/Students buttons", caption: "Log In — Welcome" },
  { src: "/projects/online-appointment/app/2_login_form.png", alt: "Login form with email and password fields", caption: "Log In — Credentials" },
  { src: "/projects/online-appointment/app/3_main_professors.png", alt: "Main page listing professors with their current availability", caption: "Main Page — Professor List" },
  { src: "/projects/online-appointment/app/4_main_faculty.png", alt: "Main page menu for selecting a faculty and major", caption: "Main Page — Select Faculty" },
  { src: "/projects/online-appointment/app/5_professor_profile.png", alt: "Professor profile page with instant meeting request and weekly schedule buttons", caption: "Professor Profile" },
  { src: "/projects/online-appointment/app/6_schedule_booking.png", alt: "Calendar screen for a student to pick an available appointment time", caption: "Schedule an Appointment" },
  { src: "/projects/online-appointment/app/7_details_confirm.png", alt: "Appointment confirmation screen with booking details", caption: "Confirm Appointment" },
  { src: "/projects/online-appointment/app/8_all_appointments.png", alt: "List of all upcoming appointments with edit and cancel actions", caption: "All Appointments" },
  { src: "/projects/online-appointment/app/9_schedule_save.png", alt: "Professor's weekly schedule editor with a Save Changes button", caption: "Professor — Weekly Schedule" },
];

export default function OnlineAppointmentPhone() {
  const [index, setIndex] = useState(0);
  const screen = SCREENS[index];

  const jumpTo = (i: number) => setIndex((i + SCREENS.length) % SCREENS.length);

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
            background: "#fff",
            boxShadow: "0 30px 60px -20px rgba(58, 47, 39, 0.35)",
          }}
        >
          <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#2a2018]" />
          <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="relative">
              <img src={screen.src} alt={screen.alt} className="block w-full" draggable={false} />
              <button type="button" onClick={() => jumpTo(index + 1)} aria-label="Next screen" className="absolute inset-0" />
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

      <div className="flex flex-wrap justify-center gap-2">
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
    </div>
  );
}
