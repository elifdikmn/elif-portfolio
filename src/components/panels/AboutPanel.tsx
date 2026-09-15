"use client";

import { motion, easeOut, type Variants } from "framer-motion";
import { ArrowLeft, Download, GraduationCap, MapPin } from "lucide-react";
import SkillGroups from "@/components/SkillGroups";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function AboutPanel({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="relative mx-auto w-full max-w-[100vw] overflow-x-hidden pb-16"
      style={{ color: "var(--text)" }}
    >
      <motion.button
        variants={item}
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold opacity-80 transition hover:opacity-100"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </motion.button>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <motion.div variants={container} className="min-w-0">
          <motion.h2
            variants={item}
            className="font-hero text-[clamp(32px,6vw,52px)] font-semibold italic tracking-tight"
          >
            About me
          </motion.h2>
          <motion.div variants={item} className="mb-6 mt-3 h-[3px] w-24 rounded-full" style={{ background: "var(--accent)" }} />

          <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
            Hi, I&apos;m Elif — thanks for stopping by! I&apos;m a data scientist in training with a habit of
            turning messy, real-world datasets into stories that actually hold up under scrutiny. I like
            problems that sit at the intersection of statistics, machine learning, and plain human curiosity.
          </motion.p>

          <motion.div variants={item} className="mb-5 flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <GraduationCap className="h-4 w-4" style={{ color: "var(--accent)" }} />
              Georgia Tech · MS Analytics
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <MapPin className="h-4 w-4" style={{ color: "var(--accent)" }} />
              Philadelphia, PA
            </span>
          </motion.div>

          <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
            I&apos;m currently pursuing a <strong style={{ color: "var(--text)" }}>Master of Science in Analytics</strong> at{" "}
            <strong style={{ color: "var(--text)" }}>Georgia Tech</strong>, specializing in{" "}
            <strong style={{ color: "var(--text)" }}>Computational Data Analysis</strong>, since August 2026. Before that, I earned my{" "}
            <strong style={{ color: "var(--text)" }}>Bachelor&apos;s in Computer Engineering from Yeditepe University</strong> in
            Istanbul, graduating in October 2025 — where I built the foundation in software engineering, statistics, and systems
            thinking that everything since has built on.
          </motion.p>

          <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
            In between, I spent time as a{" "}
            <strong style={{ color: "var(--text)" }}>Research Intern at the Università di Bologna</strong>, building
            LLM-powered tools and interactive dashboards for data privacy research — that&apos;s where the GPT
            Plugin Privacy project on this site started. I also picked up{" "}
            <strong style={{ color: "var(--text)" }}>GTx ISYE6501x (Analytics Modeling)</strong> and{" "}
            <strong style={{ color: "var(--text)" }}>GTx CSE6040x (Computing for Data Analysis)</strong> certifications
            along the way, which is part of what convinced me to go all in on the full OMSA.
          </motion.p>

          <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
            My interests sit squarely in <strong style={{ color: "var(--text)" }}>data science and machine learning</strong>: predictive
            modeling, statistical inference, and the less glamorous but equally important work of figuring out
            whether a model&apos;s numbers can actually be trusted. I&apos;m drawn to projects that force me to be
            honest about a model&apos;s limitations rather than just its headline accuracy — you&apos;ll see that
            thread running through the projects on this site.
          </motion.p>

          <motion.p variants={item} className="mb-8 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
            I&apos;m looking for <strong style={{ color: "var(--text)" }}>data science / machine learning engineering roles</strong> where
            I can work close to real data pipelines and real decisions — ideally on a team that cares as much
            about rigor and reproducibility as it does about shipping. If that sounds like your team, I&apos;d
            love to talk.
          </motion.p>

          <motion.a
            variants={item}
            href="/ElifCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            <Download className="h-4 w-4" />
            Download resume
          </motion.a>

          <motion.div variants={item} className="mt-12 max-w-[70ch]">
            <h3 className="font-hero text-xl font-semibold italic tracking-tight">Skills &amp; tools</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--text-faint)" }}>
              What I&apos;ve actually used to ship the projects on this site — not an aspirational list.
            </p>
            <div className="mt-6">
              <SkillGroups />
            </div>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div variants={item} className="hidden lg:block">
          <div
            className="sticky top-10 overflow-hidden rounded-[2rem] shadow-xl"
            style={{ boxShadow: "0 25px 50px -20px rgba(58,47,39,0.35)" }}
          >
            <img
              src="/elfi.jpg"
              alt="Elif Dikmen portrait"
              className="h-[420px] w-full object-cover"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center lg:hidden">
          <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg ring-4" style={{ boxShadow: "0 15px 30px -12px rgba(58,47,39,0.35)" }}>
            <img src="/elfi.jpg" alt="Elif Dikmen portrait" className="h-full w-full object-cover" draggable={false} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
