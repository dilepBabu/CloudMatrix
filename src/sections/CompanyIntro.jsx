import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { vision, missionPoints } from "../data/content";

/* =========================================================
   STATIC VARIANTS
========================================================= */

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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
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
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  /* =======================================================
     MOUSE MOTION
  ======================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  /* =======================================================
     3D CARD ROTATION
  ======================================================= */

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [3, -3]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-3, 3]
  );

  /* =======================================================
     CARD PARALLAX
  ======================================================= */

  const cardX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-4, 4]
  );

  const cardY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-3, 3]
  );

  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  const handleMouseMove = (event) => {
    if (shouldReduceMotion) return;

    if (
      event.pointerType &&
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(
      Math.max(-0.5, Math.min(0.5, x))
    );

    mouseY.set(
      Math.max(-0.5, Math.min(0.5, y))
    );
  };

  /* =======================================================
     RESET MOUSE
  ======================================================= */

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
        py-24
        md:py-32
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
            -left-32
            -top-32
            h-72
            w-72
            rounded-full

            bg-violet-400/[0.10]
            blur-[55px]

            dark:bg-cyan-400/[0.07]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-1/2
            h-80
            w-80
            rounded-full

            bg-indigo-400/[0.08]
            blur-[60px]

            dark:bg-blue-400/[0.06]
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-1/3
            h-64
            w-64
            rounded-full

            bg-purple-400/[0.06]
            blur-[55px]

            dark:bg-teal-500/[0.05]
          "
        />

        {/* LIGHT GRID */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.035]

            [background-image:linear-gradient(rgba(99,102,241,1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,1)_1px,transparent_1px)]

            [background-size:55px_55px]

            dark:opacity-[0.035]

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
          gap-14
          lg:grid-cols-2
          lg:gap-16
        "
      >

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="relative">

          {/* HEADING */}

          <ScrollReveal direction="left">

            <motion.div
              whileHover={
                shouldReduceMotion
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

              <p
                className="
                  eyebrow
                  mb-4

                  text-indigo-600
                  dark:text-cyan-300
                "
              >
                Our Foundation
              </p>

              <h2
                className="
                  text-3xl
                  font-display
                  font-semibold
                  leading-tight
                  tracking-tight
                  md:text-4xl

                  text-slate-900
                  dark:text-white
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
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}

                </span>

              </h2>

            </motion.div>

          </ScrollReveal>

          {/* DESCRIPTION */}

          <ScrollReveal
            direction="left"
            delay={0.08}
          >

            <p
              className="
                mt-6
                max-w-xl
                text-[15px]
                leading-relaxed
                md:text-base

                text-slate-600

                dark:text-slate-300
              "
            >
              {vision}
            </p>

          </ScrollReveal>

          {/* =================================================
              FOUNDATION CARDS
          ================================================= */}

          <motion.div
            variants={foundationContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35,
            }}
            className="
              mt-8
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >

            {foundationItems.map(
              (title, index) => (

                <motion.div
                  key={title}
                  variants={foundationItem}

                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
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
                    rounded-xl
                    border

                    border-indigo-100
                    bg-white/70

                    px-4
                    py-4
                    text-center

                    backdrop-blur-sm

                    shadow-[0_8px_30px_rgba(79,70,229,0.05)]

                    dark:border-slate-800
                    dark:bg-slate-900/50
                    dark:shadow-none
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
                      from-indigo-500/[0.08]
                      via-transparent
                      to-cyan-400/[0.06]

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
                      absolute
                      left-1/2
                      top-0
                      h-px
                      w-10
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
                      text-xs
                      font-mono
                      leading-snug

                      text-indigo-600

                      dark:text-cyan-300
                    "
                  >
                    {title}
                  </p>

                  {/* INDEX */}

                  <span
                    className="
                      absolute
                      bottom-2
                      right-3
                      text-[9px]
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
          onPointerMove={handleMouseMove}
          onPointerLeave={handleMouseLeave}

          style={{
            perspective: 1200,
          }}

          className="
            relative
            min-w-0
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
              -inset-5
              rounded-[2rem]
              blur-2xl

              bg-indigo-500/[0.05]

              dark:bg-cyan-400/[0.05]
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
              amount: 0.3,
            }}

            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}

            style={
              shouldReduceMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                    x: cardX,
                    y: cardY,
                    transformStyle: "preserve-3d",
                  }
            }

            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border

              border-indigo-100
              bg-white

              p-7

              shadow-[0_20px_60px_rgba(79,70,229,0.08)]

              transform-gpu
              md:p-10

              dark:border-slate-800
              dark:bg-[#091321]
              dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
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

                bg-[radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.08),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(139,92,246,0.06),transparent_28%)]

                dark:bg-[radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.09),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(59,130,246,0.06),transparent_28%)]
              "
            />

            {/* =================================================
                SHINE
            ================================================= */}

            {!shouldReduceMotion && (
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
                  via-indigo-500/[0.06]
                  to-transparent

                  dark:via-white/[0.08]
                "

                animate={{
                  x: ["0%", "480%"],
                }}

                transition={{
                  duration: 7,
                  repeat: Infinity,
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
                  mb-6

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
                variants={missionContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                className="space-y-5"
              >

                {missionPoints.map(
                  (point, index) => (

                    <motion.li
                      key={`${point}-${index}`}
                      variants={missionItem}

                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: 5,
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
                        text-sm
                        leading-relaxed
                        md:text-[15px]

                        text-slate-700
                        dark:text-slate-300
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

                        {!shouldReduceMotion && (
                          <motion.span
                            className="
                              absolute
                              inset-[-3px]
                              rounded-full

                              bg-indigo-400/20

                              dark:bg-cyan-400/20
                            "

                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [
                                0.5,
                                0,
                                0.5,
                              ],
                            }}

                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              delay:
                                index * 0.25,
                              ease: "easeInOut",
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
                right-5
                top-5
                h-10
                w-10
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
                bottom-5
                left-5
                h-10
                w-10
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
                mt-8
                flex
                items-center
                gap-2

                border-t
                border-indigo-100

                pt-5

                dark:border-slate-800
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
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-[0.18em]

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

            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-3
                  -left-3
                  h-7
                  w-7
                  rounded-full
                  blur-[2px]

                  bg-indigo-500/15

                  dark:bg-cyan-400/15
                "

                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4],
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