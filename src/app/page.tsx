"use client";

import { useEffect, useId, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useAnimationControls,
  type Variants,
  easeOut,
  easeInOut,
} from "framer-motion";
import { Mail, Github, Linkedin, ArrowLeft } from "lucide-react";

/* ---------------- Typewriter ---------------- */
function Typewriter({
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

/* ---------------- Intro ---------------- */
function Intro() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
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
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500"
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
          className={`${size === "large" ? "w-3 h-12" : "w-2 h-8"} bg-indigo-400 rounded`}
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
  // Page() içindeki state
  const [overlayView, setOverlayView] =
    useState<"list" | "about" | "contact" | "projects">("list");

  const prefersReducedMotion = useReducedMotion();
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  /* mouse takip */
  useEffect(() => {
    let frame = 0;
    const pos = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      pos.x = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      pos.y = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setMouse({ x: pos.x, y: pos.y });
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
    const t = setTimeout(() => setIntroDone(true), 2200);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  /* hue anim */
  const [hue, setHue] = useState(180);
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      const target = mouse.x * 360;
      setHue((prev) => prev + (target - prev) * 0.08);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mouse.x]);

  /* iletişim linkleri */
  const EMAIL = "mailto:eelifddikmen@gmail.com";
  const GITHUB_URL = "https://github.com/elifdikmn";
  const LINKEDIN_URL = "https://www.linkedin.com/in/elifdikmen/";

  /* ESC ile menüyü kapat */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* helper: dışarıdan About overlay'i aç */
  const openAboutOverlay = () => {
    setOverlayView("about");
    setMenuOpen(true);
  };
  // Page() içinde
  const openProjectsOverlay = () => {
    setOverlayView("projects");
    setMenuOpen(true);
  };

  return (
    <div id="home">
      <AnimatePresence>{!introDone && <Intro />}</AnimatePresence>

      <main className="relative min-h-screen overflow-hidden bg-black text-zinc-100 selection:bg-indigo-400/30 selection:text-white">
        {/* BG efekti daima görünür */}
        <BgFX mouse={mouse} hue={hue} windowSize={windowSize} hoveringButton={hoveringButton} />

        {/* Sağ üst ring grid buton */}
        <header className="absolute top-30 right-35 z-[70]">
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

        {/* Sayfa içeriği — menü açıkken tamamen kaybolur */}
        <motion.div
          key="pageContent"
          animate={menuOpen ? { opacity: 0, filter: "blur(14px)" } : { opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: easeOut }}
          className={menuOpen ? "pointer-events-none" : ""}
        >
          <section
            aria-label="Hero"
            className="relative z-20 mx-auto flex min-h-screen max-w-10xl flex-col items-center justify-center px-6 text-center"
          >
            <h1 className="text-[5rem] mb-3 font-bold font-hero italic tracking-[0.02em]">
              <span className="neon-soft-wrap">
                {introDone ? (
                  <Typewriter
                    text="HEY, I&apos;M ELIF DIKMEN"
                    startDelay={200}
                    speed={100}
                    ariaLabel="Headline"
                    className="neon-strong" // sadece glow
                  />
                ) : (
                  <span className="opacity-0">HEY, I'M ELIF DIKMEN</span>
                )}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={introDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: easeOut }}
              className="mb-12 w-full max-w-[80ch] text-xl sm:text-2xl md:text-3xl font-hero  leading-relaxed text-white "
            >
              I'm a new graduated computer engineer passionate about data science, machine learning, and modern web
              development. I enjoy creating user-centric solutions, working with data visualization, and building
              AI-powered applications.
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center justify-center font-hero gap-12 text-zinc-200 text-3xl md:text-4xl">
              {/* Hero butonu: Projects overlay'ini aç */}
              <button
                type="button"
                onClick={openProjectsOverlay}
                onMouseEnter={() => setHoveringButton(true)}
                onMouseLeave={() => setHoveringButton(false)}
                className="group inline-flex items-center gap-4 opacity-0 animate-[fadeInUp_0.6s_2.2s_forwards]"
              >
                <span>→</span>
                <WavyHoverText text="see my projects" className="link-underline" />
              </button>

              {/* Hero butonu: aynı About overlay'ini aç */}
              <button
                type="button"
                onClick={openAboutOverlay}
                onMouseEnter={() => setHoveringButton(true)}
                onMouseLeave={() => setHoveringButton(false)}
                className="group inline-flex items-center gap-4 opacity-0 animate-[fadeInUp_0.6s_2.4s_forwards]"
              >
                <span>→</span>
                <WavyHoverText text="more about me" className="link-underline" />
              </button>
            </div>
          </section>
        </motion.div>

        {/* Overlay Menü — list | about | contact */}
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
            background: currentColor;
            transition: width 0.4s ease;
          }
          .link-underline:hover::after {
            width: 100%;
          }

          /* ✨ Neon parlama */
          .neon-glow {
            text-shadow:
              0 0 6px rgba(236, 72, 153, 0.55),
              0 0 16px rgba(236, 72, 153, 0.45),
              0 0 28px rgba(147, 51, 234, 0.35),
              0 0 48px rgba(147, 51, 234, 0.25);
            filter: saturate(120%);
          }
        `}</style>
      </main>
    </div>
  );
}

/* ---------------- Menü + Paneller ---------------- */
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
  view: "list" | "about" | "contact" | "projects";
  setView: (v: "list" | "about" | "contact" | "projects") => void;
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
      ? "relative z-[66] mx-auto w-full max-w-[1400px] px-6 pt-[clamp(12vh,14vh,18vh)]"
      : "relative z-[66] w-screen max-w-none px-[clamp(24px,6vw,120px)] pt-[clamp(12vh,14vh,18vh)]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex  overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* dışa tıkla kapat */}
          <motion.div className="absolute inset-0" onClick={onClose} />

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
                <ContactPanel
                  key="contact"
                  email={email}
                  github={github}
                  linkedin={linkedin}
                  onBack={() => setView("list")}
                />
              )}
              {view === "projects" && <ProjectsPanel key="projects" onBack={() => setView("list")} />}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ——— Menü Liste Görünümü ——— */
function MenuList({
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
  const router = useRouter();
  const items: Array<{ n: string; label: string; onClick: () => void }> = [
    { n: "01", label: "HOME", onClick: onClose },
    { n: "02", label: "PROJECTS", onClick: onSelectProjects },
    { n: "03", label: "ABOUT", onClick: onSelectAbout }, // overlay ABOUT
    { n: "04", label: "CONTACT", onClick: onSelectContact }, // overlay CONTACT
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
    <motion.div variants={container} initial="hidden" animate="show" exit="exit" className="mt-55">
      <ul className="space-y-5 md:space-y-15">
        {items.map((it) => (
          <motion.li key={it.label} variants={item}>
            <button
              onClick={it.onClick}
              className="group flex items-baseline gap-6 font-hero text-left text-white"
            >
              <span className="w-8 shrink-0  md:text-3xl   font-bold text-white">{it.n}</span>
              <span className="font-extrabold leading-none tracking-tight text-[clamp(40px,8vw,110px)]">
                <WavyHoverText text={it.label} />
                <span className="block h-[2px] max-w-0 bg-white/80 transition-all duration-300 group-hover:max-w-full" />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---- Global variants (diğer paneller kullanıyor) ---- */
const container: Variants = {
  hidden: { opacity: 0, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.25, // çocukları sırayla getir
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/* ---------------- WavyHoverText ---------------- */
function WavyHoverText({
  text,
  className = "",
  waveOffset = 0.03, // dalga gecikmesi (saniye/harf)
  lift = 8, // her harfin yukarı kalkma miktarı (px)
  tilt = 6, // her harfin dönmesi (derece)
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
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ——— PROJECTS PANEL (Overlay) ——— */
function ProjectsPanel({ onBack }: { onBack: () => void }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" exit="hidden" className="relative w-full text-white">
      {/* Back */}
      <motion.button
        variants={item}
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 rounded-md px-3 py-2
                   text-[clamp(20px,3vw,36px)] font-bold opacity-90 hover:opacity-100"
      >
        <ArrowLeft className="w-8 h-8" />
        Back
      </motion.button>

      {/* Ortalanmış içerik */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-8">
        {/* Büyük COMING SOON */}
        <motion.h2 variants={item} className="text-7xl sm:text-8xl md:text-9xl font-extrabold mb-10 tracking-wide">
          COMING SOON
        </motion.h2>

        {/* Alt açıklama */}
        <motion.p variants={item} className="text-2xl text-gray-300 mb-12 max-w-2xl">
          But during that, you can check out my GitHub account or my resume:
        </motion.p>

        {/* Linkler */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-8 items-center">
          <a
            href="https://github.com/elifdikmn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[clamp(20px,2vw,32px)] font-bold text-indigo-300 hover:text-white transition"
          >
            ↗ GitHub
          </a>

          <a
            href="/ElifCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[clamp(20px,2vw,32px)] font-bold text-indigo-300 hover:text-white transition"
          >
            ↓ Resume
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ——— ABOUT PANEL (Overlay) ——— */
function AboutPanel({ onBack }: { onBack: () => void }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" exit="hidden" className="relative w-full text-white">
      {/* Back */}
      <motion.button
        variants={item}
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 rounded-md px-3 py-2
                   text-[clamp(20px,3vw,36px)] font-bold  opacity-90 hover:opacity-100"
      >
        <ArrowLeft className="w-8 h-8" />
        Back
      </motion.button>

      <div className="relative min-h-[70vh] lg:pr-[560px]">
        {/* SOL: Başlık + metin */}
        <motion.div variants={container} className="relative z-10 max-w-3xl px-8 lg:px-24 pt-32">
          <motion.h2 variants={item} className="text-7xl font-bold tracking-wide mb-2 -mt-30 ml-50">
            ABOUT ME
          </motion.h2>
          <motion.div variants={item} className="h-1 w-350 bg-white mb-6 ml-50" />

          <motion.p variants={item} className="text-2xl w-400 font-hero leading-relaxed text-white-700 mb-6 max-w-7xl ml-50">
            Hi, I’m Elif. Thanks for stopping by!
          </motion.p>

          <motion.p variants={item} className="text-2xl w-400 font-hero leading-relaxed text-white-700 mb-6 max-w-7xl ml-50">
            I recently graduated from a Yeditepe University where I majored in a Computer Science, 
            where I built a strong foundation in software, data, and modern web technologies. 
            I’m especially interested in data science, machine learning, and turning complex information 
            into clear, human-centered experiences
          </motion.p>

          <motion.p variants={item} className="text-2xl w-400 font-hero leading-relaxed text-white-700 max-w-7xl ml-50">
            More recently, I’ve been a Research Intern at the Università di Bologna in Italy, 
            contributing to collaborative CS research and broadening my perspective in an international 
            environment.I enjoy end-to-end problem solving: from data work (collecting, cleaning, modeling) to building 
            usable interfaces.Today, I’m looking to create products that are practical, performant, 
            and respectful of users—combining data, ML, and thoughtful design to make everyday experiences a little better.
          </motion.p>

          <motion.a
            variants={item}
            href="/ElifCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex ml-50 items-center gap-2 text-[clamp(18px,2.2vw,70px)] font-bold text-indigo-300 hover:text-white transition"
          >
            ↓ resume
          </motion.a>
        </motion.div>

        {/* SAĞ: Fotoğraf */}
        <motion.div
          variants={item}
          className="hidden lg:block fixed top-0 right-0 h-[600px] w-[350px]
                     overflow-hidden shadow-2xl ring-2 ring-white/15 z-50"
          style={{ borderRadius: "0 0 0 36px" }}
        >
          <motion.img
            src="/elfi.jpg"
            alt="Elif Dikmen portrait"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.25, opacity: 1 }}
            transition={{ duration: 1.2, ease: easeOut }}
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </motion.div>

        {/* Mobil fotoğraf */}
        <motion.div variants={item} className="lg:hidden mt-8 flex justify-center">
          <div className="relative h-52 w-52 overflow-hidden rounded-full ring-2 ring-white/20 shadow-xl">
            <img src="/elfi.jpg" alt="Elif Dikmen portrait" className="h-full w-full object-cover" draggable={false} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ——— CONTACT PANEL (Overlay) ——— */
function ContactPanel({
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="text-white w-full max-w-[900px] mx-auto px-6 text-center"
    >
      <button
        onClick={onBack}
        className="mb-10 inline-flex items-center gap-1 rounded-md px-4 py-3
                   text-[clamp(22px,3vw,36px)] font-bold opacity-90 hover:opacity-100"
      >
        <ArrowLeft className="w-[clamp(28px,4vw,44px)] h-[clamp(28px,4vw,44px)]" />
        Back
      </button>

      <h3 className="text-[clamp(36px,8vw,90px)] font-extrabold tracking-[0.15em] leading-none">CONTACT</h3>
      <div className="mt-5 mb-12 h-[2px] w-[72%] bg-white/75 mx-auto" />

      <div className="flex flex-col items-center gap-10">
        <motion.a
          href={email}
          className="inline-flex items-center gap-6 text-[clamp(32px,4.5vw,72px)] font-semibold no-underline"
          whileHover={{ x: [0, -4, 4, -2, 2, 0] }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <Mail className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
          <span>Mail</span>
        </motion.a>

        <motion.a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-6 text-[clamp(32px,4.5vw,72px)] font-semibold no-underline"
          whileHover={{ x: [0, -4, 4, -2, 2, 0] }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <Linkedin className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
          <span>LinkedIn</span>
        </motion.a>

        <motion.a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-6 text-[clamp(32px,4.5vw,72px)] font-semibold no-underline"
          whileHover={{ x: [0, -4, 4, -2, 2, 0] }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <Github className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
          <span>GitHub</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ---------------- Kare Menü Butonu ---------------- */
function SquareMenuButton({
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
      className="group relative grid h-20 w-20 md:h-24 md:w-24 place-items-center text-white"
    >
      <motion.div
        key="grid"
        initial={false}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.7 : 1, rotate: open ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="absolute inset-0 grid place-items-center"
      >
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-4 w-4 md:h-[18px] md:w-[18px] rounded-full border-2 border-white/85
                         bg-transparent opacity-90 transition
                         group-hover:scale-110 group-hover:opacity-100"
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        key="close"
        initial={false}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.6, rotate: open ? 0 : -10 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative"
      >
        <span className="absolute block h-[3px] w-10 md:w-12 -rotate-45 bg-white rounded-full" />
        <span className="absolute block h-[3px] w-10 md:w-12  rotate-45 bg-white rounded-full" />
        <span className="block h-12 w-12 md:h-14 md:w-14 opacity-0" />
      </motion.div>
    </button>
  );
}

/* ---------------- Background FX ---------------- */
function BgFX({
  mouse,
  hue,
  windowSize,
  hoveringButton,
}: {
  mouse: { x: number; y: number };
  hue: number;
  windowSize: { w: number; h: number };
  hoveringButton: boolean;
}) {
  const hueCool = 200 + Math.max(0, Math.min(1, mouse.x)) * 80;
  const s = 65 + (1 - Math.max(0, Math.min(1, mouse.y))) * 25;
  const l1 = 52 + (1 - Math.max(0, Math.min(1, mouse.y))) * 8;
  const l2 = 48 + (1 - Math.max(0, Math.min(1, mouse.y))) * 6;

  const h1 = hueCool;
  const h2 = (hueCool + 30) % 360;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {windowSize.w > 0 && windowSize.h > 0 && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border-2 border-indigo-400/80"
          style={{ width: 48, height: 48 }}
          animate={{
            x: mouse.x * windowSize.w - 24,
            y: mouse.y * windowSize.h - 24,
            scale: hoveringButton ? 1 : 0.5,
            backgroundColor: hoveringButton ? "#000000" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      )}

      <div
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{
          background: `radial-gradient(700px 500px at ${mouse.x * 100}% ${mouse.y * 100}%, hsl(${h1} ${s}% ${l1}% / 0.45), transparent 60%), radial-gradient(900px 700px at ${
            (1 - mouse.x) * 100
          }% ${(1 - mouse.y) * 100}%, hsl(${h2} ${s - 8}% ${l2}% / 0.35), transparent 65%)`,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-55"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: easeInOut }}
      >
        <div className="h-full w-full bg-[linear-gradient(-45deg,#0b0e14,#111826,#0f1b2d,#0c1220)] bg-[length:400%_400%]" />
      </motion.div>

      <div className="absolute -inset-20 opacity-[0.35]">
        <div className="h-full w-full bg-[radial-gradient(closest-side,transparent,rgba(0,0,0,0.38))]" />
      </div>

      <div className="absolute inset-0">
        <MorphBlob x={220} y={200} size={420} hue={`hsl(${h1} ${s}% ${l1}%)`} opacity={0.28} />
        <MorphBlob
          x={900}
          y={520}
          size={520}
          hue={`hsl(${h2} ${Math.max(55, s - 10)}% ${Math.max(46, l2 - 2)}%)`}
          opacity={0.22}
          reverse
        />
      </div>
    </div>
  );
}

function MorphBlob({
  x,
  y,
  size = 400,
  hue = "#7aa2ff",
  opacity = 0.22,
  reverse = false,
}: {
  x: number;
  y: number;
  size?: number;
  hue?: string;
  opacity?: number;
  reverse?: boolean;
}) {
  const gradientId = useId();
  const p1 =
    "M 0 -80 C 30 -70, 70 -50, 80 0 C 90 50, 40 80, 0 90 C -40 80, -90 50, -80 0 C -70 -50, -30 -70, 0 -80 Z";
  const p2 =
    "M 0 -90 C 50 -60, 90 -40, 80 0 C 70 50, 30 90, 0 80 C -30 90, -80 50, -90 0 C -80 -40, -50 -60, 0 -90 Z";
  const p3 =
    "M 0 -85 C 60 -40, 85 -30, 90 0 C 85 40, 60 85, 0 90 C -60 85, -85 40, -90 0 C -85 -30, -60 -40, 0 -85 Z";
  const seq = reverse ? [p3, p2, p1, p3] : [p1, p2, p3, p1];
  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      className="absolute"
      style={{ left: x, top: y, mixBlendMode: "screen" as any }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={hue} stopOpacity="0.9" />
          <stop offset="60%" stopColor={hue} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.path
        d={p1}
        fill={`url(#${gradientId})`}
        opacity={opacity}
        animate={{ d: seq, rotate: reverse ? -10 : 10 }}
        transition={{ repeat: Infinity, duration: 12, ease: easeInOut, repeatType: "reverse" }}
      />
    </svg>
  );
}
