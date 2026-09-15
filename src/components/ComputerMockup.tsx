"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ComputerMockup({
  src,
  title,
  addressLabel,
}: {
  src: string;
  title: string;
  addressLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full" style={{ maxWidth: 860 }}>
        {/* Laptop screen bezel */}
        <div
          className="overflow-hidden rounded-t-xl rounded-b-md border-[10px] pb-0 sm:border-[14px]"
          style={{ borderColor: "#1c1a17", background: "#1c1a17" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 rounded-t-[4px] bg-[#e7e5e1] px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#61c454]" />
            </div>
            <div className="mx-auto flex max-w-[70%] flex-1 items-center justify-center rounded-full bg-white/70 px-3 py-1 text-[11px] text-[#5c5a55]">
              {addressLabel}
            </div>
          </div>
          {/* Screen */}
          <motion.div
            animate={{ height: expanded ? 820 : 340 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden bg-black"
          >
            <iframe
              src={src}
              title={title}
              className="block h-full w-full border-0"
              loading="lazy"
            />
          </motion.div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-[10px] w-[104%] -translate-x-[2%] rounded-b-xl" style={{ background: "#2a2722" }} />
        <div className="mx-auto h-[4px] w-[30%] rounded-b-lg" style={{ background: "#1c1a17" }} />
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-70"
        style={{ borderColor: "var(--border)", color: "var(--accent-strong)", background: "var(--surface)" }}
      >
        {expanded ? (
          <>
            Show compact view <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            Show the full detailed dashboard <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
