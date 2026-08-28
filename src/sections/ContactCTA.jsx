import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { Link } from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { waLink } from "../data/content";

/* ============================================================================
   CONFIG
============================================================================ */

const EASE = [
  0.16,
  1,
  0.3,
  1,
];

const EXPERT_PATH =
  "/talk-to-expert";

/* ============================================================================
   PERFORMANCE MODE

   IMPORTANT:

   Mobile / touch / small laptop:
   - no pointer tracking
   - no 3D transforms
   - no continuous particle animations
   - no continuous light beam
   - no animated moving glow

   Desktop:
   - pointer interaction
   - subtle 3D
   - subtle continuous effects
============================================================================ */

function usePerformanceMode() {
  const [
    mode,
    setMode,
  ] = useState("mobile");

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return undefined;
    }

    const update = () => {
      const width =
        window.innerWidth;

      const fine =
        window.matchMedia(
          "(pointer: fine)"
        ).matches;

      const coarse =
        window.matchMedia(
          "(pointer: coarse)"
        ).matches;

      /*
       * Full effects ONLY on larger desktop screens.
       */

      if (
        fine &&
        !coarse &&
        width >= 1200
      ) {
        setMode("desktop");
        return;
      }

      /*
       * Everything else gets lightweight rendering.
       */

      setMode("light");
    };

    update();

    window.addEventListener(
      "resize",
      update,
      {
        passive: true,
      }
    );

    const pointerQuery =
      window.matchMedia(
        "(pointer: fine)"
      );

    const coarseQuery =
      window.matchMedia(
        "(pointer: coarse)"
      );

    pointerQuery.addEventListener?.(
      "change",
      update
    );

    coarseQuery.addEventListener?.(
      "change",
      update
    );

    return () => {
      window.removeEventListener(
        "resize",
        update
      );

      pointerQuery.removeEventListener?.(
        "change",
        update
      );

      coarseQuery.removeEventListener?.(
        "change",
        update
      );
    };
  }, []);

  return mode;
}

/* ============================================================================
   CONTACT CTA
============================================================================ */

export default function ContactCTA() {
  const shouldReduceMotion =
    useReducedMotion();

  const performance =
    usePerformanceMode();

  const isDesktop =
    performance === "desktop";

  const sectionRef =
    useRef(null);

  /* ============================================================
     MOUSE VALUES

     These are only used on large desktop.
  ============================================================ */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothX =
    useSpring(
      mouseX,
      {
        stiffness: 80,
        damping: 28,
        mass: 0.25,
      }
    );

  const smoothY =
    useSpring(
      mouseY,
      {
        stiffness: 80,
        damping: 28,
        mass: 0.25,
      }
    );

  /* ============================================================
     DESKTOP 3D
  ============================================================ */

  const rotateX =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [2.2, -2.2]
    );

  const rotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-2.2, 2.2]
    );

  const cardX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-3, 3]
    );

  const cardY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [-2, 2]
    );

  const glowX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      ["25%", "75%"]
    );

  const glowY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      ["25%", "75%"]
    );

  /* ============================================================
     POINTER RAF
  ============================================================ */

  const pointerFrameRef =
    useRef(0);

  const latestPointerRef =
    useRef({
      x: 0,
      y: 0,
    });

  const lastAppliedRef =
    useRef({
      x: 0,
      y: 0,
    });

  /* ============================================================
     POINTER MOVE

     ONLY ACTIVE ON LARGE DESKTOP.
  ============================================================ */

  const handlePointerMove =
    (event) => {
      if (
        !isDesktop ||
        shouldReduceMotion
      ) {
        return;
      }

      if (
        event.pointerType &&
        event.pointerType !==
          "mouse"
      ) {
        return;
      }

      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }

      const x = Math.max(
        -0.5,
        Math.min(
          0.5,
          (event.clientX -
            rect.left) /
            rect.width -
            0.5
        )
      );

      const y = Math.max(
        -0.5,
        Math.min(
          0.5,
          (event.clientY -
            rect.top) /
            rect.height -
            0.5
        )
      );

      const previous =
        latestPointerRef.current;

      /*
       * Ignore tiny movements.
       */

      if (
        Math.abs(
          x - previous.x
        ) < 0.004 &&
        Math.abs(
          y - previous.y
        ) < 0.004
      ) {
        return;
      }

      latestPointerRef.current = {
        x,
        y,
      };

      /*
       * One MotionValue update per frame.
       */

      if (
        pointerFrameRef.current
      ) {
        return;
      }

      pointerFrameRef.current =
        requestAnimationFrame(
          () => {
            pointerFrameRef.current =
              0;

            const {
              x: nextX,
              y: nextY,
            } =
              latestPointerRef.current;

            const previousApplied =
              lastAppliedRef.current;

            if (
              Math.abs(
                nextX -
                  previousApplied.x
              ) < 0.002 &&
              Math.abs(
                nextY -
                  previousApplied.y
              ) < 0.002
            ) {
              return;
            }

            lastAppliedRef.current =
              {
                x: nextX,
                y: nextY,
              };

            mouseX.set(nextX);
            mouseY.set(nextY);
          }
        );
    };

  /* ============================================================
     POINTER LEAVE
  ============================================================ */

  const handlePointerLeave =
    () => {
      if (
        pointerFrameRef.current
      ) {
        cancelAnimationFrame(
          pointerFrameRef.current
        );

        pointerFrameRef.current =
          0;
      }

      latestPointerRef.current = {
        x: 0,
        y: 0,
      };

      lastAppliedRef.current = {
        x: 0,
        y: 0,
      };

      mouseX.set(0);
      mouseY.set(0);
    };

  /* ============================================================
     CLEANUP
  ============================================================ */

  useEffect(() => {
    return () => {
      if (
        pointerFrameRef.current
      ) {
        cancelAnimationFrame(
          pointerFrameRef.current
        );

        pointerFrameRef.current =
          0;
      }
    };
  }, []);

  /* ============================================================
     WHATSAPP
  ============================================================ */

  const whatsappUrl =
    waLink(
      "Hello! I came across your website and I’d like to know more about your services."
    );

  /* ============================================================
     MOTION SETTINGS

     Keep reveal animations simple.
  ============================================================ */

  const revealInitial =
    shouldReduceMotion
      ? undefined
      : {
          opacity: 0,
          y: 18,
        };

  const revealVisible =
    shouldReduceMotion
      ? undefined
      : {
          opacity: 1,
          y: 0,
        };

  return (
    <section
      ref={sectionRef}
      onPointerMove={
        isDesktop
          ? handlePointerMove
          : undefined
      }
      onPointerLeave={
        isDesktop
          ? handlePointerLeave
          : undefined
      }
      className="
        relative
        isolate
        w-full
        overflow-hidden

        bg-[#F5FAFF]
        text-[#102A43]

        /* =====================================================
           COMPACT SECTION HEIGHT
        ===================================================== */

        py-8
        sm:py-10
        md:py-12
        lg:py-14
        xl:py-16

        dark:bg-[#041522]
      "
    >
      {/* =========================================================
          STATIC BACKGROUND
          
          Used on mobile / tablet / laptop.
          No animation.
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
      >
        {/* LEFT LIGHT */}

        <div
          className="
            absolute
            -left-32
            -top-32

            h-[22rem]
            w-[22rem]

            rounded-full

            bg-[#2563EB]/[0.045]

            blur-[65px]

            dark:bg-[#2563EB]/[0.065]
          "
        />

        {/* RIGHT LIGHT */}

        <div
          className="
            absolute
            -bottom-32
            -right-28

            h-[24rem]
            w-[24rem]

            rounded-full

            bg-[#06B6D4]/[0.045]

            blur-[70px]

            dark:bg-[#06B6D4]/[0.055]
          "
        />

        {/* GRID */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.015]

            [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)]

            [background-size:60px_60px]

            dark:opacity-[0.022]

            dark:[background-image:linear-gradient(rgba(56,189,248,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.8)_1px,transparent_1px)]
          "
        />
      </div>

      {/* =========================================================
          DESKTOP INTERACTIVE GLOW

          Completely absent on mobile/tablet/laptop.
      ========================================================= */}

      {isDesktop &&
        !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{
              left: glowX,
              top: glowY,
            }}
            className="
              pointer-events-none

              absolute
              z-0

              h-[320px]
              w-[320px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-[#38BDF8]/[0.06]

              blur-[75px]

              transform-gpu
            "
          />
        )}

      {/* =========================================================
          DESKTOP LIGHT BEAM

          Only large desktop.
      ========================================================= */}

      {isDesktop &&
        !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute

              left-[-25%]
              top-[-20%]

              z-0

              h-[140%]
              w-[9%]

              rotate-[14deg]

              bg-gradient-to-r
              from-transparent
              via-[#38BDF8]/[0.06]
              to-transparent

              blur-xl

              transform-gpu
            "
            animate={{
              x: [
                "0%",
                "900%",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatDelay: 7,
              ease: "easeInOut",
            }}
          />
        )}

      {/* =========================================================
          CORNER DETAILS
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          left-4
          top-4

          z-0

          h-12
          w-12

          border-l
          border-t

          border-[#2563EB]/15

          sm:left-6
          sm:top-6

          sm:h-16
          sm:w-16

          dark:border-[#38BDF8]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          bottom-4
          right-4

          z-0

          h-12
          w-12

          border-b
          border-r

          border-[#06B6D4]/15

          sm:right-6
          sm:bottom-6

          sm:h-16
          sm:w-16

          dark:border-[#38BDF8]/15
        "
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div
        className="
          container-x
          relative
          z-20
        "
      >
        <motion.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 0.55,
            ease: EASE,
          }}
          className="
            relative
            mx-auto
            max-w-5xl
          "
        >
          {/* =======================================================
              CARD
          ======================================================== */}

          <div
            className="
              group
              relative
              z-20

              overflow-hidden

              rounded-[1.25rem]

              border
              border-[#D8E8F5]

              bg-white/90

              /* MOBILE */

              px-5
              py-7

              /* TABLET */

              sm:px-7
              sm:py-8

              md:px-9
              md:py-9

              /* DESKTOP */

              lg:rounded-[1.75rem]
              lg:px-12
              lg:py-10

              xl:px-16
              xl:py-11

              shadow-[0_15px_50px_rgba(30,64,175,0.055)]

              dark:border-[#153A52]
              dark:bg-[#061C2D]/90

              dark:shadow-[0_15px_50px_rgba(0,0,0,0.25)]
            "
          >
            {/* ===================================================
                STATIC CARD GLOW
            ==================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.055),transparent_45%)]
              "
            />

            {/* ===================================================
                DESKTOP HOVER GLOW
            ==================================================== */}

            {isDesktop && (
              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0
                  z-0

                  opacity-0

                  bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.08),transparent_48%)]

                  transition-opacity
                  duration-500

                  group-hover:opacity-100
                "
              />
            )}

            {/* ===================================================
                DESKTOP MOVING TOP LINE
            ==================================================== */}

            {isDesktop &&
              !shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute

                    left-0
                    top-0

                    z-0

                    h-px
                    w-24

                    bg-gradient-to-r
                    from-transparent
                    via-[#38BDF8]
                    to-transparent

                    shadow-[0_0_9px_rgba(56,189,248,0.5)]

                    transform-gpu
                  "
                  animate={{
                    x: [
                      "-10%",
                      "900%",
                    ],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear",
                  }}
                />
              )}

            {/* ===================================================
                LABEL
            ==================================================== */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 7,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.45,
                ease: EASE,
              }}
              className="
                relative
                z-10

                flex
                items-center
                justify-center
                gap-2.5
              "
            >
              <span
                className="
                  h-px
                  w-6

                  bg-gradient-to-r
                  from-transparent
                  to-[#38BDF8]

                  sm:w-9
                "
              />

              <span
                className="
                  font-mono

                  text-[9px]

                  font-semibold

                  uppercase

                  tracking-[0.28em]

                  text-[#2563EB]

                  dark:text-[#67E8F9]
                "
              >
                Let's Create
              </span>

              <span
                className="
                  h-px
                  w-6

                  bg-gradient-to-l
                  from-transparent
                  to-[#38BDF8]

                  sm:w-9
                "
              />
            </motion.div>

            {/* ===================================================
                HEADING
            ==================================================== */}

            <motion.h2
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.6,
                ease: EASE,
              }}
              className="
                relative
                z-10

                mt-4

                text-center

                font-display

                text-[2rem]

                font-semibold

                leading-[0.98]

                tracking-[-0.045em]

                text-[#102A43]

                sm:mt-5
                sm:text-5xl

                md:text-6xl

                lg:mt-6
                lg:text-7xl

                xl:text-8xl

                dark:text-[#EFFAFF]
              "
            >
              <span className="block">
                Ready To Build
              </span>

              <span
                className="
                  mt-1

                  inline-block

                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-[#06B6D4]

                  bg-clip-text

                  text-transparent

                  sm:mt-1.5
                "
              >
                Something Remarkable?
              </span>
            </motion.h2>

            {/* ===================================================
                DESCRIPTION
            ==================================================== */}

            <motion.p
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.5,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.08,
                ease: EASE,
              }}
              className="
                relative
                z-10

                mx-auto

                mt-4

                max-w-2xl

                text-center

                text-[13px]

                leading-[1.6]

                text-[#587087]

                sm:mt-5
                sm:text-sm

                md:text-base

                dark:text-[#9DBACD]
              "
            >
              Bring us your idea, challenge,
              or digital vision. We'll
              transform it into a practical
              solution built around your
              business.
            </motion.p>

            {/* ===================================================
                BUTTONS
            ==================================================== */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.5,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.15,
                ease: EASE,
              }}
              className="
                relative
                z-[50]

                mt-6

                flex
                flex-col
                items-center
                justify-center

                gap-2.5

                sm:mt-7
                sm:flex-row
                sm:gap-3
              "
            >
              {/* =================================================
                  START A CONVERSATION
              ================================================== */}

              <Link
                to={EXPERT_PATH}
                className="
                  group/button

                  relative

                  inline-flex

                  min-h-[44px]

                  w-full
                  max-w-[245px]

                  items-center
                  justify-center

                  overflow-hidden

                  rounded-full

                  border
                  border-[#0EA5E9]/30

                  bg-gradient-to-r

                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-[#06B6D4]

                  px-5

                  text-[12px]

                  font-semibold

                  text-white

                  shadow-[0_7px_20px_rgba(14,165,233,0.14)]

                  transition-transform
                  duration-300

                  hover:-translate-y-1

                  sm:w-auto
                "
              >
                <span className="relative z-10">
                  Start a Conversation
                </span>

                <span
                  aria-hidden="true"
                  className="
                    relative
                    z-10

                    ml-2

                    transition-transform
                    duration-300

                    group-hover/button:translate-x-1
                  "
                >
                  →
                </span>

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    -translate-x-full

                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent

                    transition-transform
                    duration-700

                    group-hover/button:translate-x-full
                  "
                />
              </Link>

              {/* =================================================
                  WHATSAPP
              ================================================== */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  group/button

                  inline-flex

                  min-h-[44px]

                  w-full
                  max-w-[245px]

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#CFE1EC]

                  bg-white/60

                  px-5

                  text-[12px]

                  font-semibold

                  text-[#1B5875]

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  hover:border-[#38BDF8]/50

                  hover:bg-white

                  sm:w-auto

                  dark:border-[#24516A]

                  dark:bg-[#0A2638]/70

                  dark:text-[#BFEFFF]

                  dark:hover:bg-[#0C3045]
                "
              >
                <span>
                  WhatsApp Us
                </span>

                <span
                  aria-hidden="true"
                  className="
                    ml-2

                    transition-transform
                    duration-300

                    group-hover/button:translate-x-1
                  "
                >
                  →
                </span>
              </a>
            </motion.div>

            {/* ===================================================
                STATUS
            ==================================================== */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                    }
              }
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.45,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.25,
              }}
              className="
                relative
                z-10

                mt-5

                flex

                items-center
                justify-center

                gap-2

                text-center

                font-mono

                text-[7px]

                uppercase

                tracking-[0.2em]

                text-[#71879B]

                sm:mt-6
                sm:text-[8px]

                dark:text-[#688BA2]
              "
            >
              {/* Static on lightweight devices */}

              {isDesktop &&
              !shouldReduceMotion ? (
                <motion.span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-[#06B6D4]

                    shadow-[0_0_9px_rgba(6,182,212,0.7)]
                  "
                  animate={{
                    scale: [
                      1,
                      1.35,
                      1,
                    ],
                    opacity: [
                      0.4,
                      0.9,
                      0.4,
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-[#06B6D4]
                  "
                />
              )}

              <span>
                Let's make your next move count
              </span>
            </motion.div>

            {/* ===================================================
                BOTTOM ACCENT
            ==================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                bottom-0
                left-1/2

                z-0

                h-[2px]

                w-1/4

                -translate-x-1/2

                bg-gradient-to-r

                from-transparent
                via-[#38BDF8]/70
                to-transparent

                sm:w-1/3
              "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}