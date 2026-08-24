import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import ScrollReveal from "../components/ScrollReveal";
import { process } from "../data/content";

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================================
   MOBILE DETECTION
=========================================================================== */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

/* =========================================================================
   PROCESS SECTION
=========================================================================== */

export default function Process() {
  const sectionRef = useRef(null);

  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const count = Math.max(process.length, 1);

  const [active, setActive] = useState(0);

  /* =======================================================================
     SCROLL PROGRESS

     Every process item receives one viewport of scrolling.
  ======================================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.25,
  });

  /* =======================================================================
     ACTIVE STEP
  ======================================================================= */

  useMotionValueEvent(progress, "change", (value) => {
    const next =
      count <= 1
        ? 0
        : Math.round(value * (count - 1));

    const safeIndex = Math.max(
      0,
      Math.min(count - 1, next)
    );

    setActive((current) =>
      current === safeIndex ? current : safeIndex
    );
  });

  /* =======================================================================
     REDUCED MOTION
  ======================================================================= */

  if (reduceMotion) {
    return <ReducedProcess />;
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        bg-[#F5F7FA]
        text-[#071827]
        dark:bg-[#07131F]
        dark:text-white
      "
      style={{
        height: `${count * 100}vh`,
      }}
    >
      <ProcessViewport
        progress={progress}
        active={active}
        count={count}
        isMobile={isMobile}
      />
    </section>
  );
}

/* =========================================================================
   FIXED FULLSCREEN VIEWPORT
=========================================================================== */

function ProcessViewport({
  progress,
  active,
  count,
  isMobile,
}) {
  const opacity = useTransform(
    progress,
    [0, 0.012, 0.988, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [0, 0.02, 0.98, 1],
    [0.985, 1, 1, 0.985]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
      }}
      className="
        pointer-events-none
        fixed
        inset-0
        z-[50]
        h-[100dvh]
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-[#F5F7FA]
        dark:bg-[#07131F]
      "
    >
      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <ProcessBackground progress={progress} />

      {/* ================================================================
          HEADER
      ================================================================= */}

      <ProcessHeader
        active={active}
        count={count}
      />

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}

      <ProcessStage
        progress={progress}
        count={count}
        isMobile={isMobile}
      />

      {/* ================================================================
          BOTTOM PROGRESS ONLY

          No left-side rail.
      ================================================================= */}

      <ProcessFooter
        progress={progress}
        active={active}
        count={count}
      />
    </motion.div>
  );
}

/* =========================================================================
   BACKGROUND
=========================================================================== */

function ProcessBackground({ progress }) {
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    ["-10%", "0%", "10%"]
  );

  const y = useTransform(
    progress,
    [0, 0.5, 1],
    ["5%", "-5%", "5%"]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.84, 1.08, 0.9]
  );

  const opacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.25, 0.45, 0.35, 0.45, 0.25]
  );

  return (
    <>
      {/* Main glow */}

      <motion.div
        aria-hidden
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[70vh]
          w-[70vh]
          min-h-[480px]
          min-w-[480px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#00A9E0]/[0.045]
          blur-[130px]
          dark:bg-[#00D9FF]/[0.035]
        "
      />

      {/* Secondary glow */}

      <motion.div
        aria-hidden
        style={{
          x: useTransform(
            progress,
            [0, 1],
            ["15%", "-15%"]
          ),
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          right-[-10%]
          z-0
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#00A878]/[0.025]
          blur-[130px]
        "
      />

      {/* Subtle grid */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.018]
          [background-image:linear-gradient(#0089BA_1px,transparent_1px),linear-gradient(90deg,#0089BA_1px,transparent_1px)]
          [background-size:48px_48px]
          dark:opacity-[0.028]
        "
      />

      {/* Top line */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]/20
          to-transparent
          dark:via-[#5DDBFF]/20
        "
      />
    </>
  );
}

/* =========================================================================
   HEADER
=========================================================================== */

function ProcessHeader({
  active,
  count,
}) {
  return (
    <header
      className="
        pointer-events-none
        absolute
        left-5
        right-5
        top-0
        z-[100]
        pt-7
        md:left-[6vw]
        md:right-[6vw]
        md:pt-9
      "
    >
      <div className="flex items-start justify-between">
        {/* Left */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="
                h-px
                w-8
                bg-[#00A9E0]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#0089BA]
                dark:text-[#5DDBFF]
                md:text-[10px]
              "
            >
              How We Work
            </span>
          </div>

          <h2
            className="
              mt-4
              font-display
              text-3xl
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]
              text-[#071827]
              dark:text-white
              md:text-5xl
            "
          >
            Our process
          </h2>
        </motion.div>

        {/* Counter */}

        <div
          className="
            pt-1
            font-mono
            text-[10px]
            tracking-[0.2em]
            text-[#0089BA]
            dark:text-[#8BEAFF]
            md:text-xs
          "
        >
          {String(active + 1).padStart(2, "0")}

          <span className="mx-2 opacity-30">
            /
          </span>

          {String(count).padStart(2, "0")}
        </div>
      </div>
    </header>
  );
}

/* =========================================================================
   PROCESS STAGE
=========================================================================== */

function ProcessStage({
  progress,
  count,
  isMobile,
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-20
      "
    >
      {process.map((item, index) => (
        <ProcessScene
          key={item.step ?? index}
          item={item}
          index={index}
          count={count}
          progress={progress}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

/* =========================================================================
   PROCESS SCENE
=========================================================================== */

function ProcessScene({
  item,
  index,
  count,
  progress,
  isMobile,
}) {
  const total = Math.max(count - 1, 1);

  const center = index / total;

  const before = Math.max(
    0,
    (index - 1) / total
  );

  const after = Math.min(
    1,
    (index + 1) / total
  );

  /* =======================================================================
     LOCAL STEP PROGRESS

     -1 = before
      0 = active
     +1 = after
  ======================================================================= */

  const local = useTransform(
    progress,
    [before, center, after],
    [-1, 0, 1]
  );

  /*
   * Alternating vertical direction.
   */
  const direction =
    index % 2 === 0 ? 1 : -1;

  /* =======================================================================
     VERTICAL MOVEMENT
  ======================================================================= */

  const y = useTransform(
    local,
    [-1, -0.5, 0, 0.5, 1],
    [
      `${-direction * 90}%`,
      `${-direction * 35}%`,
      "0%",
      `${direction * 35}%`,
      `${direction * 90}%`,
    ]
  );

  /* =======================================================================
     SCALE
  ======================================================================= */

  const scale = useTransform(
    local,
    [-1, -0.5, 0, 0.5, 1],
    [0.96, 0.985, 1, 0.985, 0.96]
  );

  /* =======================================================================
     OPACITY
  ======================================================================= */

  const opacity = useTransform(
    local,
    [
      -1,
      -0.7,
      -0.2,
      0,
      0.2,
      0.7,
      1,
    ],
    [
      0,
      0.12,
      0.82,
      1,
      0.82,
      0.12,
      0,
    ]
  );

  /* =======================================================================
     BLUR
  ======================================================================= */

  const blur = useTransform(
    local,
    [-1, -0.45, 0, 0.45, 1],
    [6, 1.5, 0, 1.5, 6]
  );

  const filter = useTransform(
    blur,
    (value) => `blur(${value}px)`
  );

  /* =======================================================================
     CONTENT PARALLAX
  ======================================================================= */

  const contentY = useTransform(
    local,
    [-1, 0, 1],
    [
      direction * -18,
      0,
      direction * 18,
    ]
  );

  /* =======================================================================
     BACKGROUND NUMBER
  ======================================================================= */

  const numberY = useTransform(
    local,
    [-1, 0, 1],
    [
      direction * 110,
      0,
      direction * -110,
    ]
  );

  const numberOpacity = useTransform(
    local,
    [-1, -0.3, 0, 0.3, 1],
    [0, 0.008, 0.018, 0.008, 0]
  );

  return (
    <motion.article
      style={{
        y,
        opacity,
        scale,
        filter,
      }}
      className="
        absolute
        inset-0
        h-full
        w-full
        overflow-hidden
      "
    >
      {/* ==================================================================
          BACKGROUND NUMBER

          Almost invisible.
      =================================================================== */}

      <motion.div
        aria-hidden
        style={{
          y: numberY,
          opacity: numberOpacity,
        }}
        className="
          pointer-events-none
          absolute
          right-[-1vw]
          top-1/2
          z-0
          -translate-y-1/2
          select-none
          font-display
          text-[30vw]
          font-bold
          leading-none
          tracking-[-0.1em]
          text-[#00A9E0]
          dark:text-[#5DDBFF]
          md:text-[22vw]
        "
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* ==================================================================
          CONTENT

          NO SIDE RAIL.
          NO SIDE DOT.
          NO EXTRA CROSS LINE.
      =================================================================== */}

      <motion.div
        style={{
          y: contentY,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[60]
        "
      >
        <div
          className="
            container-x
            relative
            z-[70]
            flex
            h-full
            min-h-0
            flex-col
            pt-[108px]
            pb-[82px]
            md:pt-[118px]
            md:pb-[88px]
          "
        >
          {/* ==============================================================
              STEP META
          ============================================================== */}

          <div className="flex items-center gap-3">
            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                tracking-[0.2em]
                text-[#00A9E0]
                dark:text-[#8BEAFF]
                md:text-xs
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className="
                h-px
                w-8
                bg-[#00A9E0]/40
                dark:bg-[#8BEAFF]/40
                md:w-12
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#0089BA]
                dark:text-[#5DDBFF]
                md:text-[10px]
              "
            >
              {item.step}
            </span>
          </div>

          {/* ==============================================================
              MAIN CONTENT GRID
          ============================================================== */}

          <div
            className="
              mt-12
              grid
              min-h-0
              flex-1
              grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_260px]
              lg:gap-16
            "
          >
            {/* ==========================================================
                LEFT CONTENT
            =========================================================== */}

            <div
              className="
                flex
                min-w-0
                flex-col
                justify-center
                pb-6
                lg:pb-10
              "
            >
              {/* ========================================================
                  TITLE
              ========================================================= */}

              <h3
                className="
                  relative
                  z-[80]
                  max-w-[940px]
                  font-display
                  text-[clamp(3.1rem,6.5vw,7rem)]
                  font-semibold
                  leading-[0.88]
                  tracking-[-0.06em]
                  text-[#071827]
                  dark:text-white
                "
              >
                {item.title}
              </h3>

              {/* ========================================================
                  DESCRIPTION
              ========================================================= */}

              <p
                className="
                  relative
                  z-[80]
                  mt-7
                  max-w-[620px]
                  text-[13px]
                  leading-[1.75]
                  text-[#526477]
                  dark:text-[#A8BAC8]
                  sm:text-sm
                  md:mt-8
                  md:text-base
                  lg:text-lg
                "
              >
                {item.description}
              </p>

              {/* ========================================================
                  PHASE
              ========================================================= */}

              <div
                className="
                  relative
                  z-[80]
                  mt-7
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#00A9E0]
                    shadow-[0_0_14px_rgba(0,169,224,.65)]
                    dark:bg-[#5DDBFF]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-[#637587]
                    dark:text-[#8198A8]
                    md:text-[9px]
                  "
                >
                  Phase {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* ==========================================================
                RIGHT PHASE VISUAL

                Kept subtle and away from the text.
            =========================================================== */}

            <div
              className="
                pointer-events-none
                hidden
                items-center
                justify-end
                lg:flex
              "
            >
              <div
                className="
                  relative
                  flex
                  h-44
                  w-44
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#00A9E0]/15
                  bg-[#00A9E0]/[0.012]
                  dark:border-[#5DDBFF]/15
                  dark:bg-[#5DDBFF]/[0.012]
                  xl:h-48
                  xl:w-48
                "
              >
                <div
                  className="
                    absolute
                    inset-3
                    rounded-full
                    border
                    border-dashed
                    border-[#00A9E0]/10
                    dark:border-[#5DDBFF]/10
                  "
                />

                <div className="relative z-10 text-center">
                  <span
                    className="
                      block
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-[#0089BA]
                      dark:text-[#5DDBFF]
                    "
                  >
                    Phase
                  </span>

                  <span
                    className="
                      mt-2
                      block
                      font-mono
                      text-5xl
                      font-semibold
                      leading-none
                      tracking-[-0.08em]
                      text-[#071827]
                      dark:text-white
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      mt-2
                      block
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      text-[#78909F]
                      dark:text-[#8198A8]
                    "
                  >
                    Process
                  </span>
                </div>

                <span
                  className="
                    absolute
                    right-1
                    top-1/2
                    h-2
                    w-2
                    -translate-y-1/2
                    rounded-full
                    bg-[#00A9E0]
                    shadow-[0_0_14px_rgba(0,169,224,.65)]
                    dark:bg-[#5DDBFF]
                  "
                />
              </div>
            </div>
          </div>

          {/* ==============================================================
              BOTTOM INFORMATION
          ============================================================== */}

          <div className="mt-8">
            <div
              className="
                h-px
                w-full
                bg-black/[0.07]
                dark:bg-white/[0.07]
              "
            />

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#78909F]
                  dark:text-[#8198A8]
                  md:text-[9px]
                "
              >
                Process /{" "}
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#78909F]
                  dark:text-[#8198A8]
                  md:text-[9px]
                "
              >
                {index === count - 1
                  ? "Process complete"
                  : "Continue"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* =========================================================================
   BOTTOM PROGRESS

   This is the only process navigation remaining.
=========================================================================== */

function ProcessFooter({
  progress,
  active,
  count,
}) {
  const width = useTransform(
    progress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-4
        left-5
        right-5
        z-[100]
        md:bottom-5
        md:left-[6vw]
        md:right-[6vw]
      "
    >
      <div className="flex items-center justify-between">
        {/* Dots */}

        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map(
            (_, index) => (
              <motion.span
                key={index}
                animate={{
                  width:
                    active === index
                      ? 38
                      : 6,
                  opacity:
                    active === index
                      ? 1
                      : 0.25,
                }}
                transition={{
                  duration: 0.25,
                  ease: EASE,
                }}
                className="
                  h-1.5
                  rounded-full
                  bg-[#00A9E0]
                  dark:bg-[#5DDBFF]
                "
              />
            )
          )}
        </div>

        {/* Status */}

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.28em]
            text-[#78909F]
            dark:text-white/30
            md:block
          "
        >
          {active === count - 1
            ? "Process complete"
            : "Scroll to continue"}
        </span>
      </div>

      {/* Progress bar */}

      <div
        className="
          mt-3
          h-[2px]
          w-full
          overflow-hidden
          rounded-full
          bg-black/[0.07]
          dark:bg-white/[0.07]
        "
      >
        <motion.div
          style={{
            width,
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-[#0066B3]
            via-[#00A9E0]
            to-[#00A878]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================================
   REDUCED MOTION
=========================================================================== */

function ReducedProcess() {
  return (
    <section
      className="
        bg-[#F5F7FA]
        px-5
        py-24
        text-[#071827]
        dark:bg-[#07131F]
        dark:text-white
        md:py-32
      "
    >
      <div className="container-x">
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <span
              className="
                h-px
                w-8
                bg-[#00A9E0]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#0089BA]
                dark:text-[#5DDBFF]
              "
            >
              How We Work
            </span>
          </div>

          <h2
            className="
              mt-4
              font-display
              text-4xl
              font-semibold
              tracking-tight
              md:text-6xl
            "
          >
            Our development process
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-relaxed
              text-[#526477]
              dark:text-[#A8BAC8]
              md:text-base
            "
          >
            From the first idea to the final product,
            we turn complex requirements into elegant,
            scalable digital experiences.
          </p>
        </ScrollReveal>

        <div className="mt-16">
          {process.map((item, index) => (
            <article
              key={item.step ?? index}
              className="
                flex
                min-h-[70vh]
                flex-col
                justify-center
                border-l
                border-[#00A9E0]/25
                pl-6
                md:pl-10
              "
            >
              <span
                className="
                  font-mono
                  text-sm
                  text-[#00A9E0]
                  dark:text-[#8BEAFF]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="
                  mt-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#0089BA]
                  dark:text-[#5DDBFF]
                "
              >
                {item.step}
              </span>

              <h3
                className="
                  mt-3
                  max-w-5xl
                  font-display
                  text-4xl
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.05em]
                  md:text-6xl
                  lg:text-7xl
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-[1.8]
                  text-[#526477]
                  dark:text-[#9FB1BF]
                  md:text-base
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}