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

      <motion.div variants={container} className="min-w-0">
        <motion.h2
          variants={item}
          className="font-hero text-[clamp(32px,6vw,52px)] font-semibold italic tracking-tight"
        >
          About me
        </motion.h2>
        <motion.div variants={item} className="mb-6 mt-3 h-[3px] w-24 rounded-full" style={{ background: "var(--accent)" }} />

        <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          Hi, I&apos;m Elif — thanks for stopping by!
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
          <strong style={{ color: "var(--text)" }}>Bachelor&apos;s in Computer Science Engineering from Yeditepe University</strong> in
          Istanbul, graduating in October 2025.
        </motion.p>

        <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          In between, I spent time as a{" "}
          <strong style={{ color: "var(--text)" }}>Quant Research Analyst intern at Pareto Technologies</strong> and an
          intern at the <strong style={{ color: "var(--text)" }}>Università di Bologna</strong>, building LLM-powered
          tools and interactive dashboards for data privacy research — that&apos;s where the GPT Plugin Privacy
          project on this site started.
        </motion.p>

        <motion.p variants={item} className="mb-5 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          My final project this past year — building a model to predict football match outcomes — is what really
          pulled me toward ML. I got hooked not just on building the model, but on the part most people skip:
          figuring out when and why it was wrong. That&apos;s what pushed me into{" "}
          <strong style={{ color: "var(--text)" }}>Georgia Tech&apos;s OMSA program</strong> — I wanted to actually
          understand the stats behind those questions instead of just poking at them from the outside.
        </motion.p>

        <motion.p variants={item} className="mb-8 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          Outside of work, I love coffee — thanks to my Turkish genes, I somehow drink espresso at 9pm and still
          fall asleep five minutes later. A superpower, really.
        </motion.p>

        <motion.p variants={item} className="mb-8 max-w-[62ch] text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-soft)" }}>
          Always happy to connect — feel free to reach out if you want to chat about any of this.
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

        <motion.div variants={item} className="mt-12">
          <h3 className="font-hero text-xl font-semibold italic tracking-tight">Skills &amp; tools</h3>
          <p className="mt-1 text-sm" style={{ color: "var(--text-faint)" }}>
            What I&apos;ve actually used to ship the projects on this site — not an aspirational list.
          </p>
          <div className="mt-6">
            <SkillGroups />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
