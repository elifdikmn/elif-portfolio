"use client";

import { motion, easeOut } from "framer-motion";
import { ArrowLeft, Mail, Github, Linkedin } from "lucide-react";

export default function ContactPanel({
  email,
  github,
  linkedin,
  onBack,
}: {
  email: string;
  github: string;
  linkedin: string;
  onBack: () => void;
}) {
  const links = [
    { href: email, label: "eelifddikmen@gmail.com", sub: "Email", Icon: Mail, external: false },
    { href: linkedin, label: "linkedin.com/in/elifdikmen", sub: "LinkedIn", Icon: Linkedin, external: true },
    { href: github, label: "github.com/elifdikmn", sub: "GitHub", Icon: Github, external: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="mx-auto w-full max-w-2xl px-2 pb-16 text-center sm:px-4"
      style={{ color: "var(--text)" }}
    >
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold opacity-80 transition hover:opacity-100"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <h3 className="font-hero text-[clamp(30px,7vw,56px)] font-semibold italic tracking-tight">Let&apos;s talk</h3>
      <p className="mx-auto mt-3 max-w-md text-base" style={{ color: "var(--text-soft)" }}>
        Whether it&apos;s about a role, a project, or just data science things — my inbox is open.
      </p>
      <div className="mx-auto mb-10 mt-6 h-[2px] w-20 rounded-full" style={{ background: "var(--accent)" }} />

      <div className="flex flex-col items-stretch gap-4">
        {links.map(({ href, label, sub, Icon, external }) => (
          <motion.a
            key={sub}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="flex items-center gap-4 rounded-2xl border px-5 py-4 text-left no-underline transition"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
              style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                {sub}
              </span>
              <span className="block truncate text-base font-semibold sm:text-lg">{label}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
