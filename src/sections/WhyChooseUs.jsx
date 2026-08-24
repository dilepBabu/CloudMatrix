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
import { whyChooseUs } from "../data/content";

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================================
   MOBILE
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
   WHY CHOOSE US

   NEW ANIMATION:
   -------------------------------------------------------------------------

   "KINETIC SPOTLIGHT"

   The section behaves like an editorial presentation.

   Left:
      large statement + active content

   Right:
      stable vertical index

   Scroll:
      active item changes
      title enters vertically
      description reveals
      right index highlights
      background accent shifts

   Scroll up:
      everything reverses naturally.

   This is intentionally DIFFERENT from the Process section.
=========================================================================== */

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const count = Math.max(
    whyChooseUs.length,
    1
  );

  const [active, setActive] = useState(0);

  /* =======================================================================
     SCROLL PROGRESS
  ======================================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 115,
      damping: 30,
      mass: 0.25,
    }
  );

  /* =======================================================================
     ACTIVE ITEM
  ======================================================================= */

  useMotionValueEvent(
    progress,
    "change",
    (value) => {
      const next =
        count <= 1
          ? 0
          : Math.round(
              value * (count - 1)
            );

      const safe = Math.max(
        0,
        Math.min(
          count - 1,
          next
        )
      );

      setActive((current) =>
        current === safe
          ? current
          : safe
      );
    }
  );

  /* =======================================================================
     REDUCED MOTION
  ======================================================================= */

  if (reduceMotion) {
    return <ReducedWhyUs />;
  }

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="
        relative
        w-full
        bg-[#F5FAFD]
        text-[#102A43]
        dark:bg-[#061A2B]
        dark:text-[#EAF7FF]
      "
      style={{
        /*
         * One viewport per reason.
         *
         * The visual presentation stays pinned
         * until every benefit has been shown.
         */
        height: `${count * 100}vh`,
      }}
    >
      <WhyUsViewport
        progress={progress}
        active={active}
        count={count}
        isMobile={isMobile}
      />
    </section>
  );
}

/* =========================================================================
   FIXED VIEWPORT
=========================================================================== */

function WhyUsViewport({
  progress,
  active,
  count,
  isMobile,
}) {
  const opacity = useTransform(
    progress,
    [0, 0.015, 0.985, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        opacity,
      }}
      className="
        fixed
        inset-0
        z-[40]
        h-[100dvh]
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-[#F5FAFD]
        dark:bg-[#061A2B]
      "
    >
      {/* ==============================================================
          ATMOSPHERE
      ============================================================== */}

      <SpotlightBackground
        progress={progress}
        active={active}
      />

      {/* ==============================================================
          HEADER
      ============================================================== */}

      <WhyHeader
        active={active}
        count={count}
      />

      {/* ==============================================================
          MAIN CONTENT
      ============================================================== */}

      {isMobile ? (
        <MobileSpotlight
          progress={progress}
          active={active}
          count={count}
        />
      ) : (
        <DesktopSpotlight
          progress={progress}
          active={active}
          count={count}
        />
      )}

      {/* ==============================================================
          BOTTOM
      ============================================================== */}

      <SpotlightFooter
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

function SpotlightBackground({
  progress,
  active,
}) {
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    ["-7%", "0%", "7%"]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.9, 1.08, 0.92]
  );

  const glowOpacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.25, 0.5, 0.32, 0.5, 0.25]
  );

  const accentX = useTransform(
    progress,
    [0, 0.5, 1],
    ["0%", "8%", "-5%"]
  );

  return (
    <>
      {/* Main glow */}

      <motion.div
        style={{
          x,
          scale,
          opacity: glowOpacity,
        }}
        className="
          pointer-events-none
          absolute
          left-[48%]
          top-[54%]
          h-[60vh]
          w-[60vh]
          min-h-[450px]
          min-w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#18B7DC]/[0.055]
          blur-[120px]
          dark:bg-[#18B7DC]/[0.035]
        "
      />

      {/* Moving accent glow */}

      <motion.div
        style={{
          x: accentX,
        }}
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-[30%]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#0878B8]/[0.025]
          blur-[110px]
          dark:bg-[#0878B8]/[0.025]
        "
      />

      {/* Grid */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.014]
          [background-image:linear-gradient(#0878B8_1px,transparent_1px),linear-gradient(90deg,#0878B8_1px,transparent_1px)]
          [background-size:70px_70px]
          dark:opacity-[0.025]
        "
      />

      {/* Vignette */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_55%_55%,transparent_25%,rgba(245,250,253,0.5)_100%)]
          dark:bg-[radial-gradient(circle_at_55%_55%,transparent_25%,rgba(6,26,43,0.72)_100%)]
        "
      />
    </>
  );
}

/* =========================================================================
   HEADER
=========================================================================== */

function WhyHeader({
  active,
  count,
}) {
  return (
    <header
      className="
        pointer-events-none
        absolute
        left-6
        right-6
        top-[135px]
        z-[100]
        md:left-[7vw]
        md:right-[7vw]
        md:top-[145px]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              className="
                h-px
                w-9
                bg-[#1687D9]
                dark:bg-[#48D9F2]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#0878B8]
                dark:text-[#48D9F2]
                md:text-[10px]
              "
            >
              Our Strengths
            </span>
          </div>

          <h2
            className="
              mt-4
              max-w-[760px]
              font-display
              text-[clamp(2.2rem,4.7vw,5rem)]
              font-semibold
              leading-[0.92]
              tracking-[-0.06em]
              text-[#102A43]
              dark:text-[#EAF7FF]
            "
          >
            Why businesses choose{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#1268B3]
                via-[#1BB7DD]
                to-[#18A88A]
                bg-clip-text
                text-transparent
              "
            >
              Cloud Matrix
            </span>
          </h2>
        </div>

        <div
          className="
            pt-1
            font-mono
            text-[10px]
            tracking-[0.2em]
            text-[#0878B8]
            dark:text-[#48D9F2]
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
   DESKTOP SPOTLIGHT
=========================================================================== */

function DesktopSpotlight({
  progress,
  active,
  count,
}) {
  return (
    <div
      className="
        absolute
        inset-x-0
        bottom-[90px]
        top-[255px]
        z-20
      "
    >
      <div
        className="
          mx-auto
          grid
          h-full
          w-[86vw]
          max-w-[1450px]
          grid-cols-[minmax(0,1fr)_320px]
          gap-14
          xl:grid-cols-[minmax(0,1fr)_360px]
        "
      >
        {/* ==============================================================
            LEFT STORY
        ============================================================== */}

        <div
          className="
            relative
            flex
            min-w-0
            items-center
          "
        >
          <StoryPanel
            progress={progress}
            active={active}
            count={count}
          />
        </div>

        {/* ==============================================================
            RIGHT INDEX
        ============================================================== */}

        <BenefitIndex
          active={active}
          count={count}
        />
      </div>
    </div>
  );
}

/* =========================================================================
   STORY PANEL
=========================================================================== */

function StoryPanel({
  progress,
  active,
  count,
}) {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
    >
      {whyChooseUs.map(
        (item, index) => (
          <StoryItem
            key={item.title ?? index}
            item={item}
            index={index}
            count={count}
            active={active}
            progress={progress}
          />
        )
      )}
    </div>
  );
}

/* =========================================================================
   STORY ITEM
=========================================================================== */

function StoryItem({
  item,
  index,
  count,
  active,
  progress,
}) {
  const total = Math.max(
    count - 1,
    1
  );

  const center =
    index / total;

  const before =
    Math.max(
      0,
      (index - 1) / total
    );

  const after =
    Math.min(
      1,
      (index + 1) / total
    );

  const local = useTransform(
    progress,
    [
      before,
      center,
      after,
    ],
    [
      -1,
      0,
      1,
    ]
  );

  const direction =
    index % 2 === 0
      ? 1
      : -1;

  /* -----------------------------------------------------------------------
     Vertical slide
  ----------------------------------------------------------------------- */

  const y = useTransform(
    local,
    [-1, -0.5, 0, 0.5, 1],
    [
      "95%",
      "35%",
      "0%",
      "-35%",
      "-95%",
    ]
  );

  /* -----------------------------------------------------------------------
     Clip reveal
  ----------------------------------------------------------------------- */

  const clipPath = useTransform(
    local,
    [-1, -0.4, 0, 0.4, 1],
    [
      "inset(100% 0% 0% 0%)",
      "inset(25% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 25% 0%)",
      "inset(0% 0% 100% 0%)",
    ]
  );

  /* -----------------------------------------------------------------------
     Opacity
  ----------------------------------------------------------------------- */

  const opacity = useTransform(
    local,
    [
      -1,
      -0.6,
      -0.15,
      0,
      0.15,
      0.6,
      1,
    ],
    [
      0,
      0.25,
      0.85,
      1,
      0.85,
      0.25,
      0,
    ]
  );

  /* -----------------------------------------------------------------------
     Small horizontal movement
  ----------------------------------------------------------------------- */

  const x = useTransform(
    local,
    [-1, 0, 1],
    [
      direction * -35,
      0,
      direction * 35,
    ]
  );

  /* -----------------------------------------------------------------------
     Rotation
  ----------------------------------------------------------------------- */

  const rotate = useTransform(
    local,
    [-1, 0, 1],
    [
      direction * -2,
      0,
      direction * 2,
    ]
  );

  /* -----------------------------------------------------------------------
     Scale
  ----------------------------------------------------------------------- */

  const scale = useTransform(
    local,
    [-1, -0.5, 0, 0.5, 1],
    [
      0.9,
      0.97,
      1,
      0.97,
      0.9,
    ]
  );

  /* -----------------------------------------------------------------------
     Blur
  ----------------------------------------------------------------------- */

  const blur = useTransform(
    local,
    [-1, -0.4, 0, 0.4, 1],
    [
      10,
      2,
      0,
      2,
      10,
    ]
  );

  const filter = useTransform(
    blur,
    (value) =>
      `blur(${value}px)`
  );

  /* -----------------------------------------------------------------------
     Giant chapter number
  ----------------------------------------------------------------------- */

  const numberX = useTransform(
    local,
    [-1, 0, 1],
    [
      direction * -120,
      0,
      direction * 120,
    ]
  );

  const numberOpacity =
    useTransform(
      local,
      [
        -1,
        -0.25,
        0,
        0.25,
        1,
      ],
      [
        0,
        0.02,
        0.055,
        0.02,
        0,
      ]
    );

  /* -----------------------------------------------------------------------
     Progress line
  ----------------------------------------------------------------------- */

  const lineScale = useTransform(
    local,
    [-1, 0, 1],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        scale,
        opacity,
        clipPath,
        filter,
      }}
      className="
        absolute
        inset-0
        flex
        items-center
      "
    >
      {/* ==================================================================
          GIANT CHAPTER NUMBER
      =================================================================== */}

      <motion.div
        aria-hidden
        style={{
          x: numberX,
          opacity: numberOpacity,
        }}
        className="
          pointer-events-none
          absolute
          right-[3%]
          top-1/2
          -translate-y-1/2
          select-none
          font-display
          text-[22vw]
          font-bold
          leading-none
          tracking-[-0.1em]
          text-[#1687D9]
          dark:text-[#48D9F2]
        "
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* ==================================================================
          CONTENT
      =================================================================== */}

      <div className="relative z-20 max-w-4xl">
        {/* small label */}

        <motion.div
          initial={false}
          className="flex items-center gap-4"
        >
          <span
            className="
              font-mono
              text-xs
              font-semibold
              tracking-[0.2em]
              text-[#0878B8]
              dark:text-[#48D9F2]
              md:text-sm
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className="
              h-px
              w-12
              bg-[#1BB7DD]/40
              dark:bg-[#48D9F2]/40
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#0878B8]
              dark:text-[#48D9F2]
            "
          >
            Advantage
          </span>
        </motion.div>

        {/* active title */}

        <h3
          className="
            mt-7
            max-w-4xl
            font-display
            text-[clamp(3.5rem,7vw,7.5rem)]
            font-semibold
            leading-[0.83]
            tracking-[-0.065em]
            text-[#102A43]
            dark:text-[#EAF7FF]
          "
        >
          {item.title}
        </h3>

        {/* description */}

        <p
          className="
            mt-7
            max-w-2xl
            text-sm
            leading-[1.85]
            text-[#58738A]
            dark:text-[#9BC0D4]
            md:text-base
            lg:text-lg
          "
        >
          {item.description}
        </p>

        {/* bottom accent */}

        <div
          className="
            mt-8
            flex
            max-w-xl
            items-center
            gap-4
          "
        >
          <div className="h-px flex-1 bg-[#D0E2EB] dark:bg-[#163B55]" />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#0878B8]
              dark:text-[#48D9F2]
            "
          >
            0{index + 1}
          </span>
        </div>

        {/* active indicator */}

        <motion.div
          style={{
            scaleX: lineScale,
            transformOrigin: "left",
          }}
          className="
            mt-3
            h-1
            w-28
            rounded-full
            bg-gradient-to-r
            from-[#1268B3]
            via-[#1BB7DD]
            to-[#18A88A]
          "
        />
      </div>
    </motion.div>
  );
}

/* =========================================================================
   RIGHT INDEX
=========================================================================== */

function BenefitIndex({
  active,
  count,
}) {
  return (
    <div
      className="
        flex
        h-full
        items-center
      "
    >
      <div className="w-full">
        <div
          className="
            mb-8
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-[#6D8799]
            dark:text-[#6C8798]
          "
        >
          What makes us different
        </div>

        <div className="space-y-1">
          {whyChooseUs.map(
            (item, index) => (
              <BenefitIndexItem
                key={item.title ?? index}
                item={item}
                index={index}
                active={active}
              />
            )
          )}
        </div>

        {/* Vertical line */}

        <div className="mt-8 h-px w-full bg-[#D5E5ED] dark:bg-[#163B55]" />

        <div className="mt-4 flex items-center justify-between">
          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.18em]
              text-[#6D8799]
              dark:text-[#70889A]
            "
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-[#0878B8]
              dark:text-[#48D9F2]
            "
          >
            Explore
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   INDEX ITEM
=========================================================================== */

function BenefitIndexItem({
  item,
  index,
  active,
}) {
  const isActive =
    index === active;

  return (
    <motion.div
      animate={{
        x: isActive ? 8 : 0,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{
        duration: 0.35,
        ease: EASE,
      }}
      className="
        group
        flex
        cursor-default
        items-center
        gap-4
        py-3
      "
    >
      {/* number */}

      <motion.span
        animate={{
          color: isActive
            ? undefined
            : undefined,
          scale: isActive ? 1.1 : 1,
        }}
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          font-mono
          text-[9px]
          font-semibold
          transition-colors
          duration-300
          ${
            isActive
              ? "border-[#1BB7DD] bg-[#1BB7DD]/10 text-[#0878B8] dark:border-[#48D9F2] dark:bg-[#48D9F2]/10 dark:text-[#48D9F2]"
              : "border-[#C9DCE6] text-[#78909F] dark:border-[#1C4259] dark:text-[#647F91]"
          }
        `}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* title */}

      <span
        className={`
          font-display
          text-lg
          font-semibold
          leading-none
          tracking-[-0.025em]
          transition-colors
          duration-300
          ${
            isActive
              ? "text-[#102A43] dark:text-white"
              : "text-[#718799] dark:text-[#668094]"
          }
        `}
      >
        {item.title}
      </span>

      {/* active line */}

      <motion.span
        animate={{
          width: isActive ? 42 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="
          ml-auto
          h-px
          bg-gradient-to-r
          from-[#1268B3]
          via-[#1BB7DD]
          to-[#18A88A]
        "
      />
    </motion.div>
  );
}

/* =========================================================================
   MOBILE
=========================================================================== */

function MobileSpotlight({
  progress,
  active,
  count,
}) {
  return (
    <div
      className="
        absolute
        inset-x-0
        bottom-[70px]
        top-[275px]
        z-20
        px-5
      "
    >
      <div
        className="
          relative
          h-full
          overflow-hidden
        "
      >
        {whyChooseUs.map(
          (item, index) => (
            <MobileStoryItem
              key={
                item.title ?? index
              }
              item={item}
              index={index}
              count={count}
              progress={progress}
            />
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   MOBILE STORY ITEM
=========================================================================== */

function MobileStoryItem({
  item,
  index,
  count,
  progress,
}) {
  const total = Math.max(
    count - 1,
    1
  );

  const center =
    index / total;

  const before =
    Math.max(
      0,
      (index - 1) / total
    );

  const after =
    Math.min(
      1,
      (index + 1) / total
    );

  const local = useTransform(
    progress,
    [before, center, after],
    [-1, 0, 1]
  );

  const y = useTransform(
    local,
    [-1, 0, 1],
    [
      "110%",
      "0%",
      "-110%",
    ]
  );

  const scale = useTransform(
    local,
    [-1, 0, 1],
    [
      0.9,
      1,
      0.9,
    ]
  );

  const opacity = useTransform(
    local,
    [-1, -0.25, 0, 0.25, 1],
    [
      0,
      0.8,
      1,
      0.8,
      0,
    ]
  );

  const blur = useTransform(
    local,
    [-1, 0, 1],
    [7, 0, 7]
  );

  const filter = useTransform(
    blur,
    (value) =>
      `blur(${value}px)`
  );

  return (
    <motion.article
      style={{
        y,
        scale,
        opacity,
        filter,
      }}
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          overflow-hidden
          rounded-[26px]
          border
          border-[#D6E7F0]
          bg-white/95
          p-7
          shadow-[0_25px_70px_rgba(18,104,179,0.08)]
          backdrop-blur-xl
          dark:border-[#163B55]
          dark:bg-[#0A263B]/95
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-[#18A88A]
              via-[#1BB7DD]
              to-[#1268B3]
              font-bold
              text-white
            "
          >
            {index + 1}
          </div>

          <p
            className="
              mt-5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#0878B8]
              dark:text-[#48D9F2]
            "
          >
            Advantage {String(index + 1).padStart(2, "0")}
          </p>

          <h3
            className="
              mt-4
              font-display
              text-4xl
              font-semibold
              leading-[0.9]
              tracking-[-0.05em]
              text-[#102A43]
              dark:text-white
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-5
              text-sm
              leading-[1.75]
              text-[#58738A]
              dark:text-[#9BC0D4]
            "
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================================
   FOOTER
=========================================================================== */

function SpotlightFooter({
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
        bottom-5
        left-6
        right-6
        z-[100]
        md:left-[7vw]
        md:right-[7vw]
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {whyChooseUs.map(
            (_, index) => (
              <motion.span
                key={index}
                animate={{
                  width:
                    active === index
                      ? 40
                      : 6,
                  opacity:
                    active === index
                      ? 1
                      : 0.25,
                }}
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
                className="
                  h-1.5
                  rounded-full
                  bg-[#1BB7DD]
                  dark:bg-[#48D9F2]
                "
              />
            )
          )}
        </div>

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.28em]
            text-[#6D8799]
            dark:text-[#8198A8]
            md:block
          "
        >
          {active === count - 1
            ? "Why us / complete"
            : "Scroll to continue"}
        </span>
      </div>

      <div
        className="
          mt-3
          h-[2px]
          w-full
          overflow-hidden
          rounded-full
          bg-black/[0.06]
          dark:bg-white/[0.08]
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
            from-[#1268B3]
            via-[#1BB7DD]
            to-[#18A88A]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================================
   REDUCED MOTION
=========================================================================== */

function ReducedWhyUs() {
  return (
    <section
      id="why-us"
      className="
        bg-[#F5FAFD]
        px-5
        py-24
        text-[#102A43]
        dark:bg-[#061A2B]
        dark:text-[#EAF7FF]
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
                bg-[#1687D9]
                dark:bg-[#48D9F2]
              "
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#0878B8]
                dark:text-[#48D9F2]
              "
            >
              Our Strengths
            </p>
          </div>

          <h2
            className="
              mt-4
              max-w-3xl
              font-display
              text-4xl
              font-semibold
              leading-[0.95]
              tracking-[-0.05em]
              md:text-6xl
            "
          >
            Why businesses choose{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#1268B3]
                via-[#1BB7DD]
                to-[#18A88A]
                bg-clip-text
                text-transparent
              "
            >
              Cloud Matrix
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          {whyChooseUs.map(
            (item, index) => (
              <article
                key={
                  item.title ?? index
                }
                className="
                  border-t
                  border-[#D6E7F0]
                  py-8
                  dark:border-[#163B55]
                "
              >
                <div className="flex gap-5">
                  <span
                    className="
                      font-mono
                      text-xs
                      text-[#0878B8]
                      dark:text-[#48D9F2]
                    "
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <div>
                    <h3
                      className="
                        font-display
                        text-3xl
                        font-semibold
                        tracking-[-0.04em]
                        text-[#102A43]
                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-[1.8]
                        text-[#58738A]
                        dark:text-[#9BC0D4]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}