"use client";

import { motion, type Variants, easeOut } from "framer-motion";
import { WavyHoverText } from "@/components/ui";

export default function MenuList({
  onSelectAbout,
  onSelectContact,
  onSelectProjects,
  onClose,
}: {
  onSelectAbout: () => void;
  onSelectContact: () => void;
  onSelectProjects: () => void;
  onClose: () => void;
}) {
  const items: Array<{ n: string; label: string; onClick: () => void }> = [
    { n: "01", label: "HOME", onClick: onClose },
    { n: "02", label: "PROJECTS", onClick: onSelectProjects },
    { n: "03", label: "ABOUT", onClick: onSelectAbout },
    { n: "04", label: "CONTACT", onClick: onSelectContact },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
    exit: { opacity: 0 },
  };
  const item: Variants = {
    hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: easeOut } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit="exit" className="mt-16">
      <ul className="space-y-6 md:space-y-10">
        {items.map((it) => (
          <motion.li key={it.label} variants={item}>
            <button
              onClick={it.onClick}
              className="group flex items-baseline gap-4 sm:gap-6 font-hero text-left"
              style={{ color: "var(--text)" }}
            >
              <span className="w-8 shrink-0 text-lg md:text-2xl font-bold" style={{ color: "var(--accent)" }}>
                {it.n}
              </span>
              <span className="font-semibold italic leading-none tracking-tight text-[clamp(28px,7vw,72px)]">
                <WavyHoverText text={it.label} />
                <span
                  className="block h-[2px] max-w-0 transition-all duration-300 group-hover:max-w-full"
                  style={{ background: "var(--accent)" }}
                />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
