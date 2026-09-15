"use client";

import { motion, easeOut } from "framer-motion";
import { SKILL_GROUPS } from "@/lib/skills";

export default function SkillGroups() {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group, i) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOut, delay: i * 0.05 }}
        >
          <p className="font-hero mb-3 text-lg font-semibold" style={{ color: "var(--heading-alt)" }}>
            {group.name}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {group.items.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
