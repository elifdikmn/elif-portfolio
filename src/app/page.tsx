"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { SquareMenuButton, Typewriter, WavyHoverText } from "@/components/ui";
import MenuList from "@/components/panels/MenuList";
import AboutPanel from "@/components/panels/AboutPanel";
import ContactPanel from "@/components/panels/ContactPanel";
import ProjectsPanel from "@/components/panels/ProjectsPanel";
import GptPrivacyCaseStudy from "@/components/panels/GptPrivacyCaseStudy";

type View = "list" | "about" | "contact" | "projects" | "project-gpt";

/* ---------------- Intro ---------------- */
function Intro() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: easeInOut }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex flex-col items-center gap-8"
      >
        <LoaderBars size="large" />
        <motion.h3
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-hero text-3xl sm:text-4xl md:text-5xl font-semibold italic tracking-wide"
          style={{ color: "var(--accent-strong)" }}
        >
          Welcome
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}

function LoaderBars({ size = "medium" }: { size?: "medium" | "large" }) {
  return (
    <div className="flex gap-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`${size === "large" ? "w-3 h-10" : "w-2 h-7"} rounded`}
          style={{ background: "var(--accent)" }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1, ease: easeInOut, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function Page() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [introDone, setIntroDone] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayView, setOverlayView] = useState<View>("list");

  const prefersReducedMotion = useReducedMotion();
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      const nx = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      const ny = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setMouse({ x: nx, y: ny });
          frame = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroDone(true);
      return;
    }
    const t = setTimeout(() => setIntroDone(true), 1500);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  const EMAIL = "mailto:eelifddikmen@gmail.com";
  const GITHUB_URL = "https://github.com/elifdikmn";
  const LINKEDIN_URL = "https://www.linkedin.com/in/elifdikmen";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openAboutOverlay = () => {
    setOverlayView("about");
    setMenuOpen(true);
  };
  const openProjectsOverlay = () => {
    setOverlayView("projects");
    setMenuOpen(true);
  };

  return (
    <div id="home">
      <AnimatePresence>{!introDone && <Intro />}</AnimatePresence>

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        <BgFX mouse={mouse} windowSize={windowSize} hoveringButton={hoveringButton} />

        <header className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 z-[70]">
          <SquareMenuButton
            open={menuOpen}
            onToggle={() => {
              if (!menuOpen) {
                setOverlayView("list");
                setMenuOpen(true);
              } else {
                setMenuOpen(false);
              }
            }}
            onHoverChange={setHoveringButton}
          />
        </header>

        <motion.div
          key="pageContent"
          animate={menuOpen ? { opacity: 0, filter: "blur(14px)" } : { opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: easeOut }}
          className={menuOpen ? "pointer-events-none" : ""}
        >
          <section
            aria-label="Hero"
            className="relative z-20 mx-auto flex min-h-[calc(100vh-60px)] max-w-screen-2xl flex-col items-center justify-center px-4 sm:px-6 text-center"
          >
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: "var(--text-faint)" }}
            >
              Data Science &amp; Machine Learning
            </p>

            <h1 className="mb-6 font-hero italic tracking-[0.01em] text-[clamp(2.5rem,9vw,4.5rem)] leading-[1.02]">
              <span className="warm-glow-wrap">
                {introDone ? (
                  <Typewriter
                    text="Welcome, I'm Elif"
                    startDelay={200}
                    speed={70}
                    ariaLabel="Headline"
                    className="font-semibold"
                    cursorClassName="inline-block translate-y-[0.1em] w-[0.5ch] h-[0.9em] align-baseline"
                  />
                ) : (
                  <span className="opacity-0">Welcome, I&apos;m Elif</span>
                )}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
              className="mb-8 w-full max-w-[62ch] text-base sm:text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--text-soft)" }}
            >
              I&apos;m a Master of Science in Analytics student at Georgia Tech, specializing in Computational
              Data Analysis. Based in Philadelphia, PA, I spend my days turning messy datasets into stories
              worth telling — fueled by an amount of coffee I&apos;d rather not put a number on. Take a look
              around, and thanks for stopping by.
            </motion.p>

            <div className="mt-2 flex flex-wrap items-center justify-center font-hero gap-6 sm:gap-8 text-lg md:text-xl">
              <button
                type="button"
                onClick={openProjectsOverlay}
                onMouseEnter={() => setHoveringButton(true)}
                onMouseLeave={() => setHoveringButton(false)}
                className="group inline-flex items-center gap-3 opacity-0 animate-[fadeInUp_0.6s_1.8s_forwards]"
                style={{ color: "var(--text)" }}
              >
                <span style={{ color: "var(--accent)" }}>→</span>
                <WavyHoverText text="see my projects" className="link-underline" />
              </button>

              <button
                type="button"
                onClick={openAboutOverlay}
                onMouseEnter={() => setHoveringButton(true)}
                onMouseLeave={() => setHoveringButton(false)}
                className="group inline-flex items-center gap-3 opacity-0 animate-[fadeInUp_0.6s_2s_forwards]"
                style={{ color: "var(--text)" }}
              >
                <span style={{ color: "var(--accent)" }}>→</span>
                <WavyHoverText text="more about me" className="link-underline" />
              </button>
            </div>
          </section>
        </motion.div>

        <OverlayMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          view={overlayView}
          setView={setOverlayView}
          email={EMAIL}
          github={GITHUB_URL}
          linkedin={LINKEDIN_URL}
        />

        <style jsx global>{`
          html:focus-within {
            scroll-behavior: smooth;
          }
          @keyframes blink {
            0%,
            50% {
              opacity: 1;
            }
            50.01%,
            100% {
              opacity: 0;
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .link-underline {
            position: relative;
            display: inline-block;
          }
          .link-underline::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background: var(--accent);
            transition: width 0.4s ease;
          }
          .link-underline:hover::after {
            width: 100%;
          }
        `}</style>
      </main>
    </div>
  );
}

/* ---------------- Overlay + Panels ---------------- */
function OverlayMenu({
  open,
  onClose,
  view,
  setView,
  email,
  github,
  linkedin,
}: {
  open: boolean;
  onClose: () => void;
  view: View;
  setView: (v: View) => void;
  email: string;
  github: string;
  linkedin: string;
}) {
  useEffect(() => {
    const el = document.documentElement;
    if (open) el.classList.add("overflow-hidden");
    else el.classList.remove("overflow-hidden");
    return () => el.classList.remove("overflow-hidden");
  }, [open]);

  const containerClass =
    view === "list"
      ? "relative z-[66] mx-auto w-full max-w-6xl px-4 sm:px-6 pt-[clamp(10vh,12vh,16vh)]"
      : "relative z-[66] w-full max-w-none px-4 sm:px-8 md:px-16 pt-[clamp(8vh,10vh,14vh)]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex overflow-y-auto overflow-x-hidden backdrop-blur-sm"
          style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0" onClick={view === "list" ? onClose : undefined} />

          <div className={containerClass}>
            <AnimatePresence mode="wait">
              {view === "list" && (
                <MenuList
                  key="list"
                  onSelectAbout={() => setView("about")}
                  onSelectContact={() => setView("contact")}
                  onSelectProjects={() => setView("projects")}
                  onClose={onClose}
                />
              )}
              {view === "about" && <AboutPanel key="about" onBack={() => setView("list")} />}
              {view === "contact" && (
                <ContactPanel key="contact" email={email} github={github} linkedin={linkedin} onBack={() => setView("list")} />
              )}
              {view === "projects" && (
                <ProjectsPanel key="projects" onBack={() => setView("list")} onOpenGptCaseStudy={() => setView("project-gpt")} />
              )}
              {view === "project-gpt" && (
                <motion.div
                  key="project-gpt"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <GptPrivacyCaseStudy onBack={() => setView("projects")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Background FX (soft & warm) ---------------- */
function BgFX({
  mouse,
  windowSize,
  hoveringButton,
}: {
  mouse: { x: number; y: number };
  windowSize: { w: number; h: number };
  hoveringButton: boolean;
}) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {windowSize.w > 0 && windowSize.h > 0 && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border-2"
          style={{ width: 36, height: 36, borderColor: "var(--accent)" }}
          animate={{
            x: mouse.x * windowSize.w - 18,
            y: mouse.y * windowSize.h - 18,
            scale: hoveringButton ? 1 : 0.5,
            backgroundColor: hoveringButton ? "var(--accent-soft-2)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      )}

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(700px 500px at ${mouse.x * 100}% ${mouse.y * 100}%, var(--accent-soft), transparent 65%)`,
        }}
      />

      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-3xl" style={{ background: "var(--accent-soft)", opacity: 0.6 }} />
      <div className="absolute -bottom-32 -right-16 h-[480px] w-[480px] rounded-full blur-3xl" style={{ background: "var(--accent-soft-2)", opacity: 0.5 }} />
      <div className="absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full blur-3xl" style={{ background: "var(--bg-soft)", opacity: 0.7 }} />
    </div>
  );
}
