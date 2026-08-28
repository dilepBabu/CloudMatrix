import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

import ScrollReveal from "../components/ScrollReveal";

import {
  vision,
  missionPoints,
} from "../data/content";

/* =========================================================
   STATIC VARIANTS
========================================================= */

const EASE = [
  0.22,
  1,
  0.36,
  1,
];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const foundationContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const foundationItem = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const missionContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const missionItem = {
  hidden: {
    opacity: 0,
    x: 18,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

/* =========================================================
   FOUNDATION CARD
========================================================= */

const foundationItems = [
  "Trusted Partner",
  "Brand Transformation",
  "Impactful Experiences",
];

/* =========================================================
   COMPANY INTRO
========================================================= */

export default function CompanyIntro() {
  const sectionRef =
    useRef(null);

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const shouldReduceMotion =
    useReducedMotion();

  /* =======================================================
     VIEWPORT TRACKING

     Used only to pause expensive decorative pointer/
     pulse effects when the section is completely off-screen.
  ======================================================= */

  const sectionInView =
    useInView(
      sectionRef,
      {
        once: false,
        amount: 0.05,
        margin:
          "15% 0px 15% 0px",
      }
    );

  /* =======================================================
     POINTER CAPABILITY
  ======================================================= */

  const canUsePointerRef =
    useRef(false);

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return undefined;
    }

    const finePointer =
      window.matchMedia(
        "(pointer: fine)"
      ).matches;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    canUsePointerRef.current =
      finePointer &&
      !reducedMotion;

    return undefined;
  }, []);

  /* =======================================================
     MOUSE MOTION
  ======================================================= */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothX =
    useSpring(
      mouseX,
      {
        stiffness: 90,
        damping: 24,
        mass: 0.35,
      }
    );

  const smoothY =
    useSpring(
      mouseY,
      {
        stiffness: 90,
        damping: 24,
        mass: 0.35,
      }
    );

  /* =======================================================
     3D CARD ROTATION
  ======================================================= */

  const rotateX =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [3, -3]
    );

  const rotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-3, 3]
    );

  /* =======================================================
     CARD PARALLAX
  ======================================================= */

  const cardX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-4, 4]
    );

  const cardY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [-3, 3]
    );

  /* =======================================================
     POINTER RAF
  ======================================================= */

  const pointerFrameRef =
    useRef(0);

  const latestPointerRef =
    useRef({
      x: 0,
      y: 0,
    });

  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  const handleMouseMove =
    (event) => {
      if (
        shouldReduceMotion
      ) {
        return;
      }

      if (
        !canUsePointerRef.current
      ) {
        return;
      }

      if (!sectionInView) {
        return;
      }

      if (
        event.pointerType &&
        event.pointerType !==
          "mouse"
      ) {
        return;
      }

      const rect =
        event.currentTarget.getBoundingClientRect();

      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }

      const x =
        Math.max(
          -0.5,
          Math.min(
            0.5,
            (event.clientX -
              rect.left) /
              rect.width -
              0.5
          )
        );

      const y =
        Math.max(
          -0.5,
          Math.min(
            0.5,
            (event.clientY -
              rect.top) /
              rect.height -
              0.5
          )
        );

      latestPointerRef.current.x =
        x;

      latestPointerRef.current.y =
        y;

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

            if (
              !sectionInView
            ) {
              return;
            }

            mouseX.set(
              latestPointerRef.current.x
            );

            mouseY.set(
              latestPointerRef.current.y
            );
          }
        );
    };

  /* =======================================================
     RESET MOUSE
  ======================================================= */

  const handleMouseLeave =
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

      mouseX.set(0);
      mouseY.set(0);
    };

  /* =======================================================
     STOP POINTER WORK WHEN OUTSIDE VIEWPORT
  ======================================================= */

  useEffect(() => {
    if (sectionInView) {
      return undefined;
    }

    if (
      pointerFrameRef.current
    ) {
      cancelAnimationFrame(
        pointerFrameRef.current
      );

      pointerFrameRef.current =
        0;
    }

    mouseX.set(0);
    mouseY.set(0);

    return undefined;
  }, [
    sectionInView,
    mouseX,
    mouseY,
  ]);

  /* =======================================================
     CLEANUP
  ======================================================= */

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

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        relative
        overflow-hidden

        /* ===================================================
           REDUCED OUTER SPACE
        =================================================== */

        py-12

        sm:py-14

        md:py-16

        lg:py-20

        xl:py-24

        transform-gpu

        bg-gradient-to-b
        from-white
        via-[#faf9ff]
        to-[#f5f7ff]

        dark:from-[#050914]
        dark:via-[#07111f]
        dark:to-[#030712]
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          overflow-hidden
        "
      >
        {/* LIGHT MODE PURPLE / BLUE GLOW */}

        <div
          className="
            absolute
            -left-28
            -top-24
            h-64
            w-64
            rounded-full
            bg-violet-400/[0.08]
            blur-[50px]
            dark:bg-cyan-400/[0.065]
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/2
            h-72
            w-72
            rounded-full
            bg-indigo-400/[0.065]
            blur-[55px]
            dark:bg-blue-400/[0.055]
          "
        />

        <div
          className="
            absolute
            bottom-[-80px]
            left-1/3
            h-56
            w-56
            rounded-full
            bg-purple-400/[0.05]
            blur-[50px]
            dark:bg-teal-500/[0.045]
          "
        />

        {/* LIGHT GRID */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.028]

            [background-image:linear-gradient(rgba(99,102,241,1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,1)_1px,transparent_1px)]

            [background-size:55px_55px]

            dark:opacity-[0.032]

            dark:[background-image:linear-gradient(rgba(34,211,238,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,1)_1px,transparent_1px)]
          "
        />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          container-x
          relative
          z-10

          grid
          items-start

          /* MOBILE */
          gap-8

          /* TABLET */
          sm:gap-10

          /* DESKTOP */
          lg:grid-cols-2
          lg:gap-12

          xl:gap-14
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            relative
            min-w-0
          "
        >
          {/* =================================================
              HEADING
          ================================================= */}

          <ScrollReveal
            direction="left"
          >
            <motion.div
              whileHover={
                shouldReduceMotion ||
                !canUsePointerRef.current
                  ? undefined
                  : {
                      x: 2,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* EYEBROW */}

              <p
                className="
                  eyebrow
                  mb-3

                  text-indigo-600

                  dark:text-cyan-300
                "
              >
                Our Foundation
              </p>

              {/* TITLE */}

              <h2
                className="
                  max-w-2xl

                  text-[2rem]

                  font-display
                  font-semibold

                  leading-[1.05]

                  tracking-[-0.035em]

                  text-slate-900
                  dark:text-white

                  sm:text-3xl

                  md:text-4xl

                  lg:text-[2.65rem]

                  xl:text-5xl
                "
              >
                Turn Your Business Into a{" "}

                <span
                  className="
                    relative
                    inline-block

                    bg-gradient-to-r

                    from-indigo-600
                    via-violet-600
                    to-cyan-500

                    bg-clip-text
                    text-transparent

                    dark:from-cyan-300
                    dark:via-blue-400
                    dark:to-violet-400
                  "
                >
                  Searchable Digital Brand

                  {/* ANIMATED UNDERLINE */}

                  {!shouldReduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="
                        absolute
                        -bottom-1
                        left-0
                        h-[2px]
                        w-full

                        origin-left

                        rounded-full

                        bg-gradient-to-r

                        from-indigo-500
                        via-violet-500
                        to-transparent

                        dark:from-cyan-400
                        dark:via-blue-400
                        dark:to-transparent
                      "
                      initial={{
                        scaleX: 0,
                      }}
                      whileInView={{
                        scaleX: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.35,
                        ease: EASE,
                      }}
                    />
                  )}
                </span>
              </h2>
            </motion.div>
          </ScrollReveal>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <ScrollReveal
            direction="left"
            delay={0.08}
          >
            <p
              className="
                mt-4

                max-w-xl

                text-[14px]
                leading-[1.7]

                text-slate-600

                dark:text-slate-300

                sm:text-[15px]

                md:text-base
              "
            >
              {vision}
            </p>
          </ScrollReveal>

          {/* =================================================
              FOUNDATION CARDS
          ================================================= */}

          <motion.div
            variants={
              foundationContainer
            }
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              mt-6

              grid
              grid-cols-1

              gap-2.5

              sm:grid-cols-3

              sm:gap-3
            "
          >
            {foundationItems.map(
              (
                title,
                index
              ) => (
                <motion.div
                  key={title}
                  variants={
                    foundationItem
                  }
                  whileHover={
                    shouldReduceMotion ||
                    !canUsePointerRef.current
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden

                    rounded-lg

                    border
                    border-indigo-100

                    bg-white/70

                    px-3
                    py-3

                    text-center

                    backdrop-blur-sm

                    shadow-[0_7px_24px_rgba(79,70,229,0.045)]

                    dark:border-slate-800
                    dark:bg-slate-900/50
                    dark:shadow-none

                    transform-gpu
                  "
                >
                  {/* HOVER GRADIENT */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0

                      bg-gradient-to-br
                      from-indigo-500/[0.07]
                      via-transparent
                      to-cyan-400/[0.05]

                      opacity-0

                      transition-opacity
                      duration-300

                      group-hover:opacity-100
                    "
                  />

                  {/* TOP LINE */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-0

                      h-px
                      w-9

                      -translate-x-1/2

                      bg-gradient-to-r
                      from-transparent
                      via-indigo-500/60
                      to-transparent

                      dark:via-cyan-400/70
                    "
                  />

                  {/* TITLE */}

                  <p
                    className="
                      relative
                      z-10

                      text-[11px]
                      font-mono
                      leading-snug

                      text-indigo-600
                      dark:text-cyan-300

                      sm:text-xs
                    "
                  >
                    {title}
                  </p>

                  {/* INDEX */}

                  <span
                    className="
                      absolute
                      bottom-1.5
                      right-2.5

                      text-[8px]
                      font-mono

                      text-slate-400/40

                      dark:text-slate-500/40
                    "
                  >
                    0{index + 1}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <motion.div
          onPointerMove={
            handleMouseMove
          }
          onPointerLeave={
            handleMouseLeave
          }
          style={{
            perspective: 1200,
          }}
          className="
            relative
            min-w-0

            lg:mt-1
          "
        >
          {/* =================================================
              OUTER GLOW
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-4

              rounded-[1.75rem]

              blur-2xl

              bg-indigo-500/[0.045]

              dark:bg-cyan-400/[0.045]
            "
          />

          {/* =================================================
              CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: EASE,
            }}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                    x: cardX,
                    y: cardY,

                    transformStyle:
                      "preserve-3d",
                  }
            }
            className="
              group
              relative

              overflow-hidden

              rounded-[1.5rem]

              border
              border-indigo-100

              bg-white

              /* REDUCED CARD PADDING */

              p-5

              shadow-[0_16px_50px_rgba(79,70,229,0.07)]

              transform-gpu

              will-change-transform

              sm:p-6

              md:p-7

              lg:p-8

              xl:p-9

              dark:border-slate-800

              dark:bg-[#091321]

              dark:shadow-[0_16px_60px_rgba(0,0,0,0.32)]
            "
          >
            {/* =================================================
                CARD BACKGROUND
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                bg-[radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.07),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(139,92,246,0.05),transparent_28%)]

                dark:bg-[radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(59,130,246,0.055),transparent_28%)]
              "
            />

            {/* =================================================
                SHINE
            ================================================= */}

            {!shouldReduceMotion &&
              sectionInView && (
                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute

                    -left-[120%]
                    top-0

                    h-full
                    w-[45%]

                    skew-x-12

                    bg-gradient-to-r

                    from-transparent
                    via-indigo-500/[0.055]
                    to-transparent

                    dark:via-white/[0.07]

                    transform-gpu
                  "
                  animate={{
                    x: [
                      "0%",
                      "480%",
                    ],
                  }}
                  transition={{
                    duration: 7,
                    repeat:
                      Infinity,
                    repeatDelay: 7,
                    ease: "easeInOut",
                  }}
                />
              )}

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative z-10">
              <p
                className="
                  eyebrow

                  mb-5

                  text-indigo-600
                  dark:text-cyan-300
                "
              >
                What We Deliver
              </p>

              {/* =================================================
                  MISSION LIST
              ================================================= */}

              <motion.ul
                variants={
                  missionContainer
                }
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className="
                  space-y-4
                "
              >
                {missionPoints.map(
                  (
                    point,
                    index
                  ) => (
                    <motion.li
                      key={`${point}-${index}`}
                      variants={
                        missionItem
                      }
                      whileHover={
                        shouldReduceMotion ||
                        !canUsePointerRef.current
                          ? undefined
                          : {
                              x: 4,
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                      className="
                        group/item

                        flex

                        cursor-default

                        gap-3

                        text-[13px]

                        leading-[1.65]

                        text-slate-700

                        dark:text-slate-300

                        sm:text-sm

                        md:text-[15px]
                      "
                    >
                      {/* DOT */}

                      <span
                        className="
                          relative

                          mt-1.5

                          h-2
                          w-2

                          shrink-0

                          rounded-full

                          bg-gradient-to-r
                          from-indigo-500
                          to-violet-500

                          dark:from-cyan-400
                          dark:to-blue-400
                        "
                      >
                        {/* PULSE */}

                        {!shouldReduceMotion &&
                          sectionInView && (
                            <motion.span
                              className="
                                absolute
                                inset-[-3px]

                                rounded-full

                                bg-indigo-400/20

                                dark:bg-cyan-400/20

                                transform-gpu
                              "
                              animate={{
                                scale: [
                                  1,
                                  1.5,
                                  1,
                                ],

                                opacity: [
                                  0.5,
                                  0,
                                  0.5,
                                ],
                              }}
                              transition={{
                                duration:
                                  2.8,

                                repeat:
                                  Infinity,

                                delay:
                                  index *
                                  0.25,

                                ease:
                                  "easeInOut",
                              }}
                            />
                          )}
                      </span>

                      {/* TEXT */}

                      <span
                        className="
                          text-slate-700

                          dark:text-slate-300
                        "
                      >
                        {point}
                      </span>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </div>

            {/* =================================================
                FUTURISTIC CORNER
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                right-4
                top-4

                h-9
                w-9

                rounded-tr-xl

                border-r
                border-t

                border-indigo-400/30

                dark:border-cyan-400/30
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                bottom-4
                left-4

                h-9
                w-9

                rounded-bl-xl

                border-b
                border-l

                border-violet-400/20

                dark:border-blue-400/20
              "
            />

            {/* =================================================
                STATUS
            ================================================= */}

            <div
              className="
                relative
                z-10

                mt-6

                flex
                items-center
                gap-2

                border-t

                border-indigo-100

                pt-4

                dark:border-slate-800

                sm:mt-7
                sm:pt-5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-indigo-500

                  shadow-[0_0_8px_rgba(99,102,241,0.7)]

                  dark:bg-cyan-400

                  dark:shadow-[0_0_8px_rgba(34,211,238,0.7)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-mono

                  uppercase

                  tracking-[0.16em]

                  text-slate-400

                  dark:text-slate-500
                "
              >
                Digital Transformation Active
              </span>
            </div>

            {/* =================================================
                FLOATING ORB
            ================================================= */}

            {!shouldReduceMotion &&
              sectionInView && (
                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute

                    -bottom-3
                    -left-3

                    h-6
                    w-6

                    rounded-full

                    blur-[2px]

                    bg-indigo-500/15

                    dark:bg-cyan-400/15

                    transform-gpu
                  "
                  animate={{
                    y: [
                      0,
                      -8,
                      0,
                    ],

                    opacity: [
                      0.4,
                      0.8,
                      0.4,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}