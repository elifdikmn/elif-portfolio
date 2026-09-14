"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { SquareMenuButton } from "@/components/ui";
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
  const openContactOverlay = () => {
    setOverlayView("contact");
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
            className="relative z-20 mx-auto max-w-screen-xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 md:pt-40"
          >
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] md:gap-12">
              <div className="mx-auto max-w-[640px] text-center md:mx-0 md:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                  className="font-hero mb-1.5 text-lg italic"
                  style={{ color: "var(--accent-strong)" }}
                >
                  Hi, I&apos;m
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
                  className="font-hero mb-3.5 font-semibold tracking-tight text-[clamp(2.6rem,6vw,4.2rem)] leading-[1.05]"
                >
                  <span className="warm-glow-wrap">Elif Dikmen</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
                  className="font-hero mb-6 text-[clamp(1.2rem,2.4vw,1.5rem)] italic"
                  style={{ color: "var(--accent-strong)" }}
                >
                  Data Scientist &amp; ML Engineer, in progress
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
                  className="mx-auto mb-6 max-w-[62ch] text-base leading-relaxed sm:text-lg md:mx-0"
                  style={{ color: "var(--text-soft)" }}
                >
                  I&apos;m a Computer Science graduate who spent a research internship at the Università di
                  Bologna auditing how GPT plugins handle data privacy — the project that convinced me to go
                  deeper into this field. I&apos;m now pursuing an Online Master of Science in Analytics
                  (OMSA) at Georgia Tech, specializing in Computational Data Analysis, based in Philadelphia,
                  PA.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
                  className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium sm:text-sm md:mx-0"
                  style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text-soft)" }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 0 3px var(--accent-soft)" }}
                  />
                  Currently: OMSA @ Georgia Tech · Computational Data Analysis specialization
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
                  className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
                >
                  <button
                    type="button"
                    onClick={openProjectsOverlay}
                    onMouseEnter={() => setHoveringButton(true)}
                    onMouseLeave={() => setHoveringButton(false)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: "var(--accent)" }}
                  >
                    See my projects
                  </button>
                  <button
                    type="button"
                    onClick={openAboutOverlay}
                    onMouseEnter={() => setHoveringButton(true)}
                    onMouseLeave={() => setHoveringButton(false)}
                    className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    About me
                  </button>
                  <a
                    href="/ElifCV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    Resume ↗
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
                className="order-first mx-auto aspect-square w-[220px] overflow-hidden rounded-2xl border shadow-lg sm:aspect-[4/5] sm:w-full md:order-none"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <img
                  src="/elfi.jpg"
                  alt="Portrait of Elif Dikmen"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>
            </div>
          </section>

          <HomeHighlights onOpenAbout={openAboutOverlay} onOpenProjects={openProjectsOverlay} />
          <HomeClosingCta onOpenAbout={openAboutOverlay} onOpenProjects={openProjectsOverlay} onOpenContact={openContactOverlay} />
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

/* ---------------- Home highlights ---------------- */
function HomeHighlights({
  onOpenAbout,
  onOpenProjects,
}: {
  onOpenAbout: () => void;
  onOpenProjects: () => void;
}) {
  const cards = [
    {
      label: "Currently studying",
      title: "OMSA @ Georgia Tech",
      body: "An Online Master of Science in Analytics, specializing in Computational Data Analysis — going deeper into the statistics and machine learning behind every model I build.",
      linkText: "More about my path →",
      onClick: onOpenAbout,
    },
    {
      label: "What I love",
      title: "Machine Learning",
      body: "The process of teaching a model to find the signal in the noise. It's the thread running through every project on this site.",
      linkText: "See it in action →",
      onClick: onOpenProjects,
    },
    {
      label: "Recently completed",
      title: "Research Internship — Università di Bologna",
      body: "A research internship on data privacy that turned into the GPT Plugin Privacy project on this site — a full analysis pipeline plus a RAG chatbot to explore the results.",
      linkText: "Read the full story →",
      onClick: onOpenAbout,
    },
  ];

  return (
    <section
      aria-label="Quick introduction"
      className="relative z-20 border-y py-16 sm:py-20"
      style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <p className="font-hero mb-2 text-lg italic" style={{ color: "var(--accent-strong)" }}>
          Right now
        </p>
        <h2 className="font-hero mb-3 text-[clamp(28px,4vw,40px)] font-semibold tracking-tight">
          A quick introduction
        </h2>
        <p className="mb-10 max-w-[60ch] text-base" style={{ color: "var(--text-soft)" }}>
          Three things that sum up where I am and what I&apos;m chasing next.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: easeOut, delay: i * 0.08 }}
              className="rounded-[1.5rem] border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                {card.label}
              </p>
              <h3 className="font-hero mt-2 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                {card.body}
              </p>
              <button
                type="button"
                onClick={card.onClick}
                className="mt-4 text-sm font-semibold transition hover:opacity-70"
                style={{ color: "var(--accent-strong)" }}
              >
                {card.linkText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Home closing CTA ---------------- */
function HomeClosingCta({
  onOpenAbout,
  onOpenProjects,
  onOpenContact,
}: {
  onOpenAbout: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}) {
  return (
    <section aria-label="Get in touch" className="relative z-20 mx-auto max-w-screen-md px-4 py-20 text-center sm:px-6 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="font-hero mb-4 text-[clamp(26px,4vw,36px)] font-semibold tracking-tight"
      >
        Want the full story?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        className="mx-auto mb-9 max-w-[56ch] text-base leading-relaxed"
        style={{ color: "var(--text-soft)" }}
      >
        From my Computer Science degree, to Bologna, to Georgia Tech — here&apos;s how it all connects. Or
        skip ahead to see what I&apos;ve actually built.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={onOpenAbout}
          className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Read my About page
        </button>
        <button
          type="button"
          onClick={onOpenProjects}
          className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          View my projects
        </button>
        <button
          type="button"
          onClick={onOpenContact}
          className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          Get in touch
        </button>
      </motion.div>
    </section>
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
