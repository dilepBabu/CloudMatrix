import { useEffect, useMemo, useRef } from "react";

import {
  motion,
  useMotionValue,
} from "framer-motion";

import ScrollReveal from "../components/ScrollReveal";

import { testimonials } from "../data/content";

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    value: "100+",
    label: "Happy Clients",
  },
  {
    value: "4.9",
    label: "Average Rating",
  },
  {
    value: "24/7",
    label: "Support Available",
  },
  {
    value: "95%",
    label: "Client Retention",
  },
];

/* =========================================================
   TESTIMONIAL CARD
========================================================= */

function Card({ t }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.012,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
      className="
        group
        relative
        shrink-0

        w-[285px]
        md:w-[350px]

        mx-1.5

        overflow-hidden
        rounded-2xl

        border
        border-[#D6E6F2]
        dark:border-[#183F63]

        bg-[#F8FBFE]
        dark:bg-[#071F35]

        px-5
        py-5

        md:px-6
        md:py-5

        select-none

        shadow-[0_7px_26px_rgba(20,90,140,0.06)]
        dark:shadow-[0_7px_26px_rgba(0,0,0,0.22)]

        transition-shadow
        duration-300

        hover:shadow-[0_12px_34px_rgba(20,100,160,0.10)]
        dark:hover:shadow-[0_12px_34px_rgba(0,80,140,0.18)]
      "
    >
      {/* =====================================================
          CARD AMBIENT GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14

          h-28
          w-28

          rounded-full

          bg-[#38BDF8]/[0.065]
          dark:bg-[#38BDF8]/[0.075]

          blur-2xl
        "
      />

      {/* =====================================================
          TOP ACCENT LINE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-6
          right-6
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-[#38BDF8]/60
          to-transparent

          dark:via-[#38BDF8]/70
        "
      />

      {/* =====================================================
          STARS
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mb-3

          flex

          text-sm
          tracking-wide
          text-[#E5A93D]

          md:mb-3.5
        "
      >
        ★★★★★
      </div>

      {/* =====================================================
          REVIEW
      ===================================================== */}

      <p
        className="
          relative
          z-10

          text-[13px]
          leading-[1.65]

          text-[#183B55]
          dark:text-[#D9ECFA]

          md:text-[14px]
          md:leading-[1.7]
        "
      >
        “{t.quote}”
      </p>

      {/* =====================================================
          USER
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mt-5

          flex
          items-center
          gap-3

          md:mt-5
        "
      >
        {/* AVATAR */}

        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.05,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="
            relative

            flex
            h-9
            w-9
            shrink-0

            items-center
            justify-center

            overflow-hidden

            rounded-full

            bg-gradient-to-br
            from-[#2563EB]
            via-[#0EA5E9]
            to-[#14B8A6]

            font-display
            text-sm
            font-semibold

            text-white

            shadow-[0_4px_14px_rgba(14,165,233,0.20)]

            md:h-10
            md:w-10
            md:text-base
          "
        >
          {t.name[0]}
        </motion.div>

        {/* USER INFO */}

        <div className="min-w-0">
          <p
            className="
              truncate

              text-[13px]
              font-semibold

              text-[#153B57]
              dark:text-[#F1F8FF]

              md:text-sm
            "
          >
            {t.name}
          </p>

          <p
            className="
              truncate

              text-[11px]

              text-[#6B8498]
              dark:text-[#83A7C2]

              md:text-xs
            "
          >
            {t.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

export default function Testimonials() {
  const trackRef =
    useRef(null);

  const animationRef =
    useRef(null);

  /*
   * Motion value.
   * Does not trigger React renders.
   */

  const x =
    useMotionValue(0);

  const positionRef =
    useRef(0);

  const pausedRef =
    useRef(false);

  const lastTimeRef =
    useRef(null);

  const halfWidthRef =
    useRef(0);

  /*
   * Duplicate testimonials for seamless loop.
   */

  const loop =
    useMemo(
      () => [
        ...testimonials,
        ...testimonials,
      ],
      []
    );

  /* =========================================================
     MEASURE TRACK
  ========================================================= */

  const measureWidth = () => {
    const track =
      trackRef.current;

    if (!track) {
      return;
    }

    const width =
      track.scrollWidth / 2;

    if (width > 0) {
      halfWidthRef.current =
        width;
    }
  };

  /* =========================================================
     CONTINUOUS MARQUEE
  ========================================================= */

  const animate = (
    time
  ) => {
    if (
      lastTimeRef.current === null
    ) {
      lastTimeRef.current =
        time;
    }

    const delta =
      time -
      lastTimeRef.current;

    lastTimeRef.current =
      time;

    if (!pausedRef.current) {
      /*
       * Smooth readable speed.
       */

      const speed = 56;

      positionRef.current -=
        (speed * delta) /
        1000;

      const halfWidth =
        halfWidthRef.current;

      /*
       * Seamless reset.
       */

      if (
        halfWidth > 0 &&
        positionRef.current <=
          -halfWidth
      ) {
        positionRef.current +=
          halfWidth;
      }

      x.set(
        positionRef.current
      );
    }

    animationRef.current =
      requestAnimationFrame(
        animate
      );
  };

  /* =========================================================
     START / CLEANUP
  ========================================================= */

  useEffect(() => {
    measureWidth();

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    const handleResize =
      () => {
        measureWidth();
      };

    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );

    return () => {
      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =========================================================
     PAUSE
  ========================================================= */

  const handleMouseEnter =
    () => {
      pausedRef.current =
        true;
    };

  /* =========================================================
     RESUME
  ========================================================= */

  const handleMouseLeave =
    () => {
      lastTimeRef.current =
        null;

      pausedRef.current =
        false;
    };

  return (
    <section
      className="
        relative
        overflow-hidden

        /* ===================================================
           REDUCED SECTION HEIGHT
        =================================================== */

        py-12

        sm:py-14

        md:py-16

        lg:py-18

        xl:py-20

        bg-[#F8FBFE]
        dark:bg-[#061A2D]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* LEFT GLOW */}

        <div
          className="
            absolute

            -left-28
            top-8

            h-64
            w-64

            rounded-full

            bg-[#38BDF8]/[0.04]
            dark:bg-[#2563EB]/[0.065]

            blur-[65px]
          "
        />

        {/* RIGHT GLOW */}

        <div
          className="
            absolute

            -right-32
            bottom-0

            h-72
            w-72

            rounded-full

            bg-[#0EA5E9]/[0.03]
            dark:bg-[#06B6D4]/[0.055]

            blur-[70px]
          "
        />

        {/* GRID */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.016]

            dark:opacity-[0.022]

            [background-image:linear-gradient(rgba(37,99,235,1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,1)_1px,transparent_1px)]

            [background-size:60px_60px]

            dark:[background-image:linear-gradient(rgba(56,189,248,1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,1)_1px,transparent_1px)]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="container-x relative z-10">
        <ScrollReveal
          className="
            mb-7
            max-w-2xl

            sm:mb-8

            md:mb-9
          "
        >
          {/* EYEBROW */}

          <p
            className="
              eyebrow
              mb-3

              text-[#1769AA]
              dark:text-[#38BDF8]
            "
          >
            Client Feedback
          </p>

          {/* HEADING */}

          <h2
            className="
              font-display

              text-[1.85rem]
              font-semibold

              leading-[1.05]

              tracking-[-0.035em]

              text-[#123A57]
              dark:text-[#E8F5FF]

              sm:text-3xl

              md:text-4xl
            "
          >
            What our clients say
          </h2>

          {/* ACCENT */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 66,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              mt-4
              h-[2px]
              rounded-full

              bg-gradient-to-r
              from-[#2563EB]
              via-[#0EA5E9]
              to-transparent

              dark:from-[#38BDF8]
              dark:via-[#22D3EE]
            "
          />
        </ScrollReveal>

        {/* ===================================================
            STATS
        =================================================== */}

        <ScrollReveal
          delay={0.05}
          className="
            mb-8
            w-full

            sm:mb-9

            md:mb-10
          "
        >
          <div
            className="
              grid
              w-full

              grid-cols-2

              gap-2.5

              sm:gap-3

              md:grid-cols-4
              md:gap-4

              items-stretch
            "
          >
            {stats.map(
              (s) => (
                <motion.div
                  key={s.label}
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  className="
                    group
                    relative
                    flex
                    min-w-0

                    min-h-[88px]
                    w-full

                    flex-col
                    items-center
                    justify-center

                    overflow-hidden
                    rounded-xl

                    border
                    border-[#D6E6F2]

                    dark:border-[#183F63]

                    bg-white
                    dark:bg-[#071F35]

                    px-2
                    py-3.5

                    text-center

                    shadow-[0_5px_20px_rgba(20,90,140,0.045)]
                    dark:shadow-[0_5px_20px_rgba(0,0,0,0.16)]

                    transition-all
                    duration-300

                    hover:border-[#93C5FD]
                    dark:hover:border-[#2563EB]

                    hover:shadow-[0_10px_28px_rgba(37,99,235,0.08)]
                    dark:hover:shadow-[0_10px_28px_rgba(14,165,233,0.10)]

                    sm:min-h-[94px]
                    sm:rounded-2xl
                    sm:py-4
                  "
                >
                  {/* HOVER GLOW */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0

                      bg-gradient-to-br
                      from-[#38BDF8]/[0.07]
                      via-transparent
                      to-[#2563EB]/[0.04]

                      opacity-0

                      transition-opacity
                      duration-300

                      group-hover:opacity-100
                    "
                  />

                  {/* TOP INDICATOR */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-1/2
                      top-0

                      h-[2px]
                      w-7

                      -translate-x-1/2

                      rounded-full

                      bg-gradient-to-r
                      from-[#2563EB]
                      to-[#38BDF8]

                      opacity-70
                    "
                  />

                  {/* VALUE */}

                  <p
                    className="
                      relative
                      z-10

                      whitespace-nowrap

                      text-xl
                      font-display
                      font-bold

                      bg-gradient-to-r
                      from-[#2563EB]
                      via-[#0EA5E9]
                      to-[#0891B2]

                      bg-clip-text
                      text-transparent

                      dark:from-[#60A5FA]
                      dark:via-[#38BDF8]
                      dark:to-[#22D3EE]

                      sm:text-2xl

                      md:text-3xl
                    "
                  >
                    {s.value}
                  </p>

                  {/* LABEL */}

                  <p
                    className="
                      relative
                      z-10

                      mt-0.5

                      whitespace-nowrap

                      text-[9px]

                      text-[#68849A]
                      dark:text-[#86A8C2]

                      sm:text-[10px]

                      md:text-xs
                    "
                  >
                    {s.label}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div
        className="
          relative
          z-10
          w-full

          overflow-hidden

          [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]

          /* tighter gap around marquee */
          py-2
        "
        onMouseEnter={
          handleMouseEnter
        }
        onMouseLeave={
          handleMouseLeave
        }
      >
        <motion.div
          ref={trackRef}
          style={{
            x,
            willChange:
              "transform",
          }}
          className="
            flex
            w-max

            py-2
          "
        >
          {loop.map(
            (t, i) => (
              <Card
                key={`${t.name}-${i}`}
                t={t}
              />
            )
          )}
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2

          h-px
          w-1/2

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-[#38BDF8]/20
          to-transparent

          dark:via-[#38BDF8]/25
        "
      />
    </section>
  );
}