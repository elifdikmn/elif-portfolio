"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({
  target,
  threshold = 480,
}: {
  target?: React.RefObject<HTMLElement | null>;
  threshold?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el: HTMLElement | Window = target?.current ?? window;
    const getScrollTop = () => (el instanceof Window ? el.scrollY : el.scrollTop);

    const onScroll = () => setVisible(getScrollTop() > threshold);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [target, threshold]);

  const handleClick = () => {
    const el = target?.current;
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[80] grid h-11 w-11 place-items-center rounded-full border shadow-lg backdrop-blur-sm transition hover:opacity-80 sm:bottom-8 sm:right-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--accent-strong)" }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
