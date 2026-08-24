import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { testimonials } from "../data/content";

const stats = [
  { value: "100+", label: "Happy Clients" },
  { value: "4.9", label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
  { value: "95%", label: "Client Retention" },
];

/* =========================================================
   TESTIMONIAL CARD
========================================================= */

function Card({ t }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.015,
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

        w-[300px]
        md:w-[360px]

        mx-2

        overflow-hidden
        rounded-2xl

        border
        border-[#D6E6F2]
        dark:border-[#183F63]

        bg-[#F8FBFE]
        dark:bg-[#071F35]

        p-6
        select-none

        shadow-[0_8px_30px_rgba(20,90,140,0.07)]
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]

        transition-shadow
        duration-300

        hover:shadow-[0_14px_40px_rgba(20,100,160,0.12)]
        dark:hover:shadow-[0_14px_40px_rgba(0,80,140,0.20)]
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
          -right-16
          -top-16

          h-32
          w-32

          rounded-full

          bg-[#38BDF8]/[0.07]
          dark:bg-[#38BDF8]/[0.08]

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

          mb-4

          flex

          text-[#E5A93D]
          text-sm
          tracking-wide
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

          text-sm
          md:text-[15px]

          leading-relaxed

          text-[#183B55]
          dark:text-[#D9ECFA]
        "
      >
        “{t.quote}”
      </p>

      {/* =====================================================
          USER
      ===================================================== */}

      <div className="relative z-10 mt-6 flex items-center gap-3">
        {/* Avatar */}

        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.06,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="
            relative

            flex
            h-10
            w-10
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
            font-semibold
            text-white

            shadow-[0_4px_16px_rgba(14,165,233,0.22)]
          "
        >
          {t.name[0]}
        </motion.div>

        <div className="min-w-0">
          <p
            className="
              truncate

              text-sm
              font-semibold

              text-[#153B57]
              dark:text-[#F1F8FF]
            "
          >
            {t.name}
          </p>

          <p
            className="
              truncate

              text-xs

              text-[#6B8498]
              dark:text-[#83A7C2]
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
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  /*
   * Motion value.
   * Does not trigger React re-renders.
   */

  const x = useMotionValue(0);

  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTimeRef = useRef(null);
  const halfWidthRef = useRef(0);

  /*
   * Duplicate testimonials for seamless loop.
   */

  const loop = useMemo(
    () => [...testimonials, ...testimonials],
    []
  );

  /* =========================================================
     MEASURE TRACK
  ========================================================= */

  const measureWidth = () => {
    const track = trackRef.current;

    if (!track) return;

    const width = track.scrollWidth / 2;

    if (width > 0) {
      halfWidthRef.current = width;
    }
  };

  /* =========================================================
     CONTINUOUS MARQUEE
  ========================================================= */

  const animate = (time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
    }

    const delta =
      time - lastTimeRef.current;

    lastTimeRef.current = time;

    if (!pausedRef.current) {
      /*
       * Slower movement for better readability.
       */

      const speed = 62;

      positionRef.current -=
        (speed * delta) / 1000;

      const halfWidth =
        halfWidthRef.current;

      /*
       * Seamless reset.
       */

      if (
        halfWidth > 0 &&
        positionRef.current <= -halfWidth
      ) {
        positionRef.current += halfWidth;
      }

      x.set(positionRef.current);
    }

    animationRef.current =
      requestAnimationFrame(animate);
  };

  /* =========================================================
     START / CLEANUP
  ========================================================= */

  useEffect(() => {
    measureWidth();

    animationRef.current =
      requestAnimationFrame(animate);

    const handleResize = () => {
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
      if (animationRef.current) {
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

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  /* =========================================================
     RESUME
  ========================================================= */

  const handleMouseLeave = () => {
    lastTimeRef.current = null;
    pausedRef.current = false;
  };

  return (
    <section
      className="
        relative
        overflow-hidden

        py-20
        md:py-28

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
        {/* Left glow */}

        <div
          className="
            absolute
            -left-32
            top-10

            h-72
            w-72

            rounded-full

            bg-[#38BDF8]/[0.045]
            dark:bg-[#2563EB]/[0.07]

            blur-[70px]
          "
        />

        {/* Right glow */}

        <div
          className="
            absolute
            -right-40
            bottom-0

            h-80
            w-80

            rounded-full

            bg-[#0EA5E9]/[0.035]
            dark:bg-[#06B6D4]/[0.06]

            blur-[75px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.018]
            dark:opacity-[0.025]

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
          className="mb-12 max-w-2xl"
        >
          <p
            className="
              eyebrow
              mb-4

              text-[#1769AA]
              dark:text-[#38BDF8]
            "
          >
            Client Feedback
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl

              font-display
              font-semibold

              text-[#123A57]
              dark:text-[#E8F5FF]
            "
          >
            What our clients say
          </h2>

          {/* Accent */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 70,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5
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

            FIX:
            - Grid owns the width
            - Every card uses w-full
            - min-w-0 prevents overflow
            - Equal min-height
            - Labels don't affect card height
        =================================================== */}

        <ScrollReveal
          delay={0.05}
          className="mb-12 w-full"
        >
          <div
            className="
              grid
              w-full

              grid-cols-2
              gap-3

              md:grid-cols-4
              md:gap-4

              items-stretch
            "
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{
                  y: -4,
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
                  min-h-[100px]
                  w-full

                  flex-col
                  items-center
                  justify-center

                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#D6E6F2]
                  dark:border-[#183F63]

                  bg-white
                  dark:bg-[#071F35]

                  px-2
                  py-5

                  text-center

                  shadow-[0_6px_24px_rgba(20,90,140,0.05)]
                  dark:shadow-[0_6px_24px_rgba(0,0,0,0.18)]

                  transition-all
                  duration-300

                  hover:border-[#93C5FD]
                  dark:hover:border-[#2563EB]

                  hover:shadow-[0_12px_32px_rgba(37,99,235,0.10)]
                  dark:hover:shadow-[0_12px_32px_rgba(14,165,233,0.12)]
                "
              >
                {/* Hover glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-gradient-to-br
                    from-[#38BDF8]/[0.08]
                    via-transparent
                    to-[#2563EB]/[0.05]

                    opacity-0

                    transition-opacity
                    duration-300

                    group-hover:opacity-100
                  "
                />

                {/* Top small indicator */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    top-0
                    left-1/2

                    h-[2px]
                    w-8

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

                    text-2xl
                    md:text-3xl

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
                  "
                >
                  {s.value}
                </p>

                {/* LABEL */}

                <p
                  className="
                    relative
                    z-10

                    mt-1

                    whitespace-nowrap

                    text-[10px]
                    sm:text-xs

                    text-[#68849A]
                    dark:text-[#86A8C2]
                  "
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
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

          [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
        "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={trackRef}
          style={{
            x,
            willChange: "transform",
          }}
          className="
            flex
            w-max
            py-4
          "
        >
          {loop.map((t, i) => (
            <Card
              key={`${t.name}-${i}`}
              t={t}
            />
          ))}
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