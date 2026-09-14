"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useAnimationControls, easeOut } from "framer-motion";

/* ---------------- Typewriter ---------------- */
export function Typewriter({
  text,
  speed = 60,
  startDelay = 0,
  className = "",
  cursorClassName = "",
  ariaLabel,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
  ariaLabel?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [shown, setShown] = useState(prefersReducedMotion ? text : "");
  const [started, setStarted] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      setStarted(true);
      let i = 0;
      const intervalId = window.setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) window.clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion, speed, startDelay, text]);

  const done = shown.length >= text.length;
  return (
    <span className={className} aria-label={ariaLabel ?? text} aria-live="polite" role="text">
      {shown}
      {!prefersReducedMotion && started && !done && (
        <span
          className={
            cursorClassName ||
            "inline-block translate-y-[0.1em] w-[0.6ch] h-[1.1em] align-baseline bg-current animate-[blink_1s_step-end_infinite]"
          }
          aria-hidden="true"
        />
      )}
    </span>
  );
}

/* ---------------- WavyHoverText ---------------- */
export function WavyHoverText({
  text,
  className = "",
  waveOffset = 0.03,
  lift = 6,
  tilt = 4,
}: {
  text: string;
  className?: string;
  waveOffset?: number;
  lift?: number;
  tilt?: number;
}) {
  const controls = useAnimationControls();

  return (
    <motion.span
      className={className}
      onHoverStart={() =>
        controls.start((i: number) => ({
          y: [0, -lift, 0],
          rotate: [0, tilt, 0],
          transition: { duration: 0.5, ease: easeOut, delay: i * waveOffset },
        }))
      }
      onHoverEnd={() =>
        controls.start((i: number) => ({
          y: 0,
          rotate: 0,
          transition: { duration: 0.3, ease: easeOut, delay: i * 0.01 },
        }))
      }
      aria-label={text}
      role="text"
    >
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          custom={i}
          animate={controls}
          initial={{ y: 0, rotate: 0 }}
          className="inline-block will-change-transform"
          style={{ display: "inline-block" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ---------------- Square menu button ---------------- */
export function SquareMenuButton({
  open,
  onToggle,
  onHoverChange,
}: {
  open: boolean;
  onToggle: () => void;
  onHoverChange: (v: boolean) => void;
}) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="group relative grid h-11 w-11 sm:h-12 sm:w-12 md:h-16 md:w-16 place-items-center rounded-full transition-colors"
      style={{ color: "var(--text)" }}
    >
      {/* Grid dots */}
      <motion.div
        key="grid"
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
          scale: open ? 0.7 : 1,
          rotate: open ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="absolute inset-0 grid place-items-center"
      >
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2 md:w-2 rounded-full transition group-hover:scale-110"
              style={{ background: "var(--accent)", opacity: 0.85 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Close (x) */}
      <motion.div
        key="close"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.6,
          rotate: open ? 0 : -10,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative"
      >
        <span
          className="absolute block h-[2px] w-5 sm:w-6 -rotate-45 rounded-full"
          style={{ background: "var(--text)" }}
        />
        <span
          className="absolute block h-[2px] w-5 sm:w-6 rotate-45 rounded-full"
          style={{ background: "var(--text)" }}
        />
        <span className="block h-7 w-7 opacity-0" />
      </motion.div>
    </button>
  );
}
