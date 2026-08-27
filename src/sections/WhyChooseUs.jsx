import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { whyChooseUs } from "../data/content";

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================================
   MOBILE
========================================================================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/* =========================================================================
   WHY CHOOSE US — "SIGNAL SCAN"
   -------------------------------------------------------------------------
   Why this concept (and not another vertical stack):
   The Process section already tells a *sequence* — step 1 leads to step 2.
   "Why choose us" isn't sequential, it's a set of parallel proof points a
   visitor scans and compares. A vertical slide implies "next chapter."
   A horizontal, edge-to-edge track implies "here is the whole shelf of
   reasons, keep scanning" — which better matches how the content actually
   works, and reads distinctly from the section above/below it.

   Mechanics:
   - The track moves HORIZONTALLY as the user scrolls vertically (classic
     Awwards "scroll-jacked filmstrip"), but the panel transition itself is
     a diagonal SCAN WIPE (clip-path) rather than a slide/opacity swap —
     the incoming panel is cut in by a moving diagonal edge, like a light
     sweeping across a display.
   - A single oversized outline numeral sits behind each panel and
     dissolves into the next, anchoring the "which one am I on" cue instead
     of a numbered list sidebar.
   - The scrubber at the bottom is a live waveform built from scroll
     VELOCITY, not a static progress bar — it visibly reacts to how fast
     the person is scrolling, so it reads as instrumentation, not chrome.
   - Reduced motion / mobile both get honest, non-gimmicky fallbacks.
========================================================================= */
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const count = Math.max(whyChooseUs.length, 1);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  const velocity = useVelocity(progress);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 300,
    damping: 40,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const next = count <= 1 ? 0 : Math.round(value * (count - 1));
    const safe = Math.max(0, Math.min(count - 1, next));
    setActive((current) => (current === safe ? current : safe));
  });

  if (reduceMotion) {
    return <ReducedWhyUs />;
  }

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="
        relative w-full
        bg-[#F5FAFD] text-[#102A43]
        dark:bg-[#061A2B] dark:text-[#EAF7FF]
      "
      style={{ height: `${count * 100}vh` }}
    >
      <ScanViewport
        progress={progress}
        velocity={smoothVelocity}
        active={active}
        count={count}
        isMobile={isMobile}
      />
    </section>
  );
}

/* =========================================================================
   FIXED VIEWPORT
========================================================================= */
function ScanViewport({ progress, velocity, active, count, isMobile }) {
  const opacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="
        fixed inset-0 z-[40] h-[100dvh] min-h-[100dvh] w-full
        overflow-hidden bg-[#F5FAFD] dark:bg-[#061A2B]
      "
    >
      <ScanAtmosphere progress={progress} />
      <ScanHeader active={active} count={count} />

      {isMobile ? (
        <MobileScan progress={progress} count={count} />
      ) : (
        <DesktopScan progress={progress} count={count} />
      )}

      <SignalWaveform
        velocity={velocity}
        progress={progress}
        active={active}
        count={count}
      />
    </motion.div>
  );
}

/* =========================================================================
   ATMOSPHERE
========================================================================= */
function ScanAtmosphere({ progress }) {
  const sweepX = useTransform(progress, [0, 1], ["-20%", "120%"]);
  const glowOpacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.2, 0.4, 0.3, 0.4, 0.2],
  );

  return (
    <>
      {/* A literal scanning beam that travels the full width once per section */}
      <motion.div
        aria-hidden
        style={{ left: sweepX, opacity: glowOpacity }}
        className="
          pointer-events-none absolute top-0 h-full w-[26vw] -translate-x-1/2
          bg-gradient-to-r from-transparent via-[#18B7DC]/[0.06] to-transparent
          blur-[40px]
          dark:via-[#48D9F2]/[0.05]
        "
      />
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 opacity-[0.014]
          [background-image:linear-gradient(#0878B8_1px,transparent_1px),linear-gradient(90deg,#0878B8_1px,transparent_1px)]
          [background-size:70px_70px]
          dark:opacity-[0.025]
        "
      />
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(245,250,253,0.55)_100%)]
          dark:bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(6,26,43,0.75)_100%)]
        "
      />
    </>
  );
}

/* =========================================================================
   HEADER
========================================================================= */
function ScanHeader({ active, count }) {
  return (
    <header
      className="
        pointer-events-none absolute left-6 right-6 top-[135px] z-[100]
        md:left-[7vw] md:right-[7vw] md:top-[145px]
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#1687D9] dark:bg-[#48D9F2]" />
            <span
              className="
                text-[9px] font-semibold uppercase tracking-[0.3em]
                text-[#0878B8] dark:text-[#48D9F2] md:text-[10px]
              "
            >
              Our Strengths
            </span>
          </div>
          <h2
            className="
              mt-4 max-w-[760px] font-display text-[clamp(2.2rem,4.7vw,5rem)]
              font-semibold leading-[0.92] tracking-[-0.06em]
              text-[#102A43] dark:text-[#EAF7FF]
            "
          >
            Why businesses choose{" "}
            <span
              className="
                bg-gradient-to-r from-[#1268B3] via-[#1BB7DD] to-[#18A88A]
                bg-clip-text text-transparent
              "
            >
              Cloud Matrix
            </span>
          </h2>
        </div>
        <div
          className="
            pt-1 font-mono text-[10px] tracking-[0.2em]
            text-[#0878B8] dark:text-[#48D9F2] md:text-xs
          "
        >
          {String(active + 1).padStart(2, "0")}
          <span className="mx-2 opacity-30">/</span>
          {String(count).padStart(2, "0")}
        </div>
      </div>
    </header>
  );
}

/* =========================================================================
   DESKTOP — horizontal track + diagonal scan wipe
========================================================================= */
function DesktopScan({ progress, count }) {
  // Progress [0,1] maps to a horizontal track shift across all panels.
  const trackX = useTransform(
    progress,
    [0, 1],
    ["0%", `-${(count - 1) * 100}%`],
  );

  return (
    <div className="absolute inset-x-0 bottom-[90px] top-[255px] z-20 overflow-hidden">
      <motion.div style={{ x: trackX }} className="flex h-full">
        {whyChooseUs.map((item, index) => (
          <ScanPanel
            key={item.title ?? index}
            item={item}
            index={index}
            count={count}
            progress={progress}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ScanPanel({ item, index, count, progress }) {
  const total = Math.max(count - 1, 1);
  const center = index / total;
  const before = Math.max(0, (index - 1) / total);
  const after = Math.min(1, (index + 1) / total);

  const local = useTransform(progress, [before, center, after], [-1, 0, 1]);

  // Diagonal scan wipe: the panel is cut in by a moving diagonal edge
  // instead of sliding or fading in.
  const clipPath = useTransform(
    local,
    [-1, -0.35, 0, 0.35, 1],
    [
      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      "polygon(0% 0%, 65% 0%, 35% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(65% 0%, 100% 0%, 100% 100%, 35% 100%)",
      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    ],
  );

  const opacity = useTransform(local, [-1, -0.5, 0, 0.5, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(local, [-1, 0, 1], [1.04, 1, 1.04]);
  const numberOpacity = useTransform(
    local,
    [-1, -0.3, 0, 0.3, 1],
    [0, 0.03, 0.06, 0.03, 0],
  );
  const numberX = useTransform(local, [-1, 0, 1], [-60, 0, 60]);

  return (
    <div className="relative h-full w-full shrink-0 basis-full">
      <motion.div
        style={{ clipPath, opacity, scale }}
        className="absolute inset-0 flex items-center"
      >
        {/* giant ghost numeral, unique to this panel's slot */}
        <motion.div
          aria-hidden
          style={{ opacity: numberOpacity, x: numberX }}
          className="
            pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2
            select-none font-display text-[24vw] font-bold leading-none
            tracking-[-0.1em] text-[#1687D9] dark:text-[#48D9F2]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        <div className="relative z-20 mx-auto w-[86vw] max-w-[1450px]">
          <div className="max-w-3xl mt-10">
            <div className="flex items-center gap-4">
              <span
                className="
                  font-mono text-xs font-semibold tracking-[0.2em]
                  text-[#0878B8] dark:text-[#48D9F2] md:text-sm
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-12 bg-[#1BB7DD]/40 dark:bg-[#48D9F2]/40" />
              <span
                className="
                  text-[9px] font-semibold uppercase tracking-[0.28em]
                  text-[#0878B8] dark:text-[#48D9F2]
                "
              >
                Advantage
              </span>
            </div>

            <h3
              className="
                mt-7 font-display text-[clamp(3rem,6.4vw,6.8rem)]
                font-semibold leading-[0.85] tracking-[-0.06em]
                text-[#102A43] dark:text-[#EAF7FF]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-7 max-w-2xl text-sm leading-[1.85]
                text-[#58738A] dark:text-[#9BC0D4] md:text-base lg:text-lg
              "
            >
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   MOBILE — vertical stack kept simple, but with an iris (radial) reveal
   instead of a slide, so it doesn't just re-run the desktop wipe rotated.
========================================================================= */
function MobileScan({ progress, count }) {
  return (
    <div className="absolute inset-x-0 bottom-[70px] top-[275px] z-20 px-5">
      <div className="relative h-full overflow-hidden">
        {whyChooseUs.map((item, index) => (
          <MobileScanItem
            key={item.title ?? index}
            item={item}
            index={index}
            count={count}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function MobileScanItem({ item, index, count, progress }) {
  const total = Math.max(count - 1, 1);
  const center = index / total;
  const before = Math.max(0, (index - 1) / total);
  const after = Math.min(1, (index + 1) / total);
  const local = useTransform(progress, [before, center, after], [-1, 0, 1]);

  const clipPath = useTransform(
    local,
    [-1, -0.3, 0, 0.3, 1],
    [
      "circle(0% at 50% 50%)",
      "circle(45% at 50% 50%)",
      "circle(75% at 50% 50%)",
      "circle(45% at 50% 50%)",
      "circle(0% at 50% 50%)",
    ],
  );
  const opacity = useTransform(local, [-1, -0.4, 0, 0.4, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(local, [-1, 0, 1], [0.92, 1, 0.92]);

  return (
    <motion.article
      style={{ clipPath, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="
          w-full overflow-hidden rounded-[26px] border border-[#D6E7F0]
          bg-white/95 p-7 shadow-[0_25px_70px_rgba(18,104,179,0.08)]
          backdrop-blur-xl dark:border-[#163B55] dark:bg-[#0A263B]/95
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto flex h-12 w-12 items-center justify-center rounded-full
              bg-gradient-to-br from-[#18A88A] via-[#1BB7DD] to-[#1268B3]
              font-bold text-white
            "
          >
            {index + 1}
          </div>
          <p
            className="
              mt-5 text-[8px] font-semibold uppercase tracking-[0.3em]
              text-[#0878B8] dark:text-[#48D9F2]
            "
          >
            Advantage {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            className="
              mt-4 font-display text-4xl font-semibold leading-[0.9]
              tracking-[-0.05em] text-[#102A43] dark:text-white
            "
          >
            {item.title}
          </h3>
          <p className="mt-5 text-sm leading-[1.75] text-[#58738A] dark:text-[#9BC0D4]">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================================
   SIGNAL WAVEFORM — live scroll-velocity oscilloscope instead of a
   static progress bar. Replaces the old footer dots + bar entirely.
========================================================================= */
function SignalWaveform({ velocity, progress, active, count }) {
  const [path, setPath] = useState("M0,20 L400,20");
  const historyRef = useRef(Array(48).fill(0));

  useMotionValueEvent(velocity, "change", (v) => {
    const clamped = Math.max(-4, Math.min(4, v));
    const history = historyRef.current;
    history.push(clamped);
    history.shift();

    const width = 400;
    const step = width / (history.length - 1);
    const points = history.map((value, i) => {
      const x = i * step;
      const y = 20 - value * 6;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    });
    setPath(points.join(" "));
  });

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="
        pointer-events-none absolute bottom-5 left-6 right-6 z-[100]
        md:left-[7vw] md:right-[7vw]
      "
    >
      <div className="flex items-center justify-between gap-6">
        <span
          className="
            hidden shrink-0 text-[8px] uppercase tracking-[0.25em]
            text-[#6D8799] dark:text-[#8198A8] md:block
          "
        >
          {active === count - 1 ? "Signal / complete" : "Scanning"}
        </span>

        <svg
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          className="h-6 w-full max-w-[220px] text-[#1BB7DD] dark:text-[#48D9F2]"
          aria-hidden
        >
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        </svg>

        <span
          className="
            shrink-0 font-mono text-[9px] tracking-[0.18em]
            text-[#6D8799] dark:text-[#70889A]
          "
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
        <motion.div
          style={{ width: barWidth }}
          className="h-full rounded-full bg-gradient-to-r from-[#1268B3] via-[#1BB7DD] to-[#18A88A]"
        />
      </div>
    </div>
  );
}

/* =========================================================================
   REDUCED MOTION
========================================================================= */
function ReducedWhyUs() {
  return (
    <section
      id="why-us"
      className="
        bg-[#F5FAFD] px-5 py-24 text-[#102A43]
        dark:bg-[#061A2B] dark:text-[#EAF7FF] md:py-32
      "
    >
      <div className="container-x">
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#1687D9] dark:bg-[#48D9F2]" />
            <p
              className="
                text-[10px] font-semibold uppercase tracking-[0.28em]
                text-[#0878B8] dark:text-[#48D9F2]
              "
            >
              Our Strengths
            </p>
          </div>
          <h2
            className="
              mt-4 max-w-3xl font-display text-4xl font-semibold
              leading-[0.95] tracking-[-0.05em] md:text-6xl
            "
          >
            Why businesses choose{" "}
            <span
              className="
                bg-gradient-to-r from-[#1268B3] via-[#1BB7DD] to-[#18A88A]
                bg-clip-text text-transparent 
              "
            >
              Cloud Matrix
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-8 ">
          {whyChooseUs.map((item, index) => (
            <article
              key={item.title ?? index}
              className="border-t border-[#D6E7F0] py-8 dark:border-[#163B55]"
            >
              <div className="flex gap-5">
                <div>
                    <span className="font-mono text-xs text-[#0878B8] dark:text-[#48D9F2]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                  <h3
                    className="
                      font-display text-5xl font-semibold tracking-[-0.04em]
                      text-[#102A43] dark:text-white
                    "
                  >
                    
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-[#58738A] dark:text-[#9BC0D4]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
