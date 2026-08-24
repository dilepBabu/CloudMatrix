import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { company, legalIntro } from "../data/content";

/* =========================================================================
   CONTENT
=========================================================================== */

const sections = [
  {
    number: "01",
    title: "Agreement to Terms",
    body: `By accessing this website or engaging ${company.name} for services, you agree to these Terms of Service. If you do not agree, please do not use this website or our services.`,
  },

  {
    number: "02",
    title: "Services",
    body: "We provide web development, mobile app development, ecommerce solutions, custom software, and digital marketing services. The specific scope, timeline and cost of any project are agreed separately with each client before work begins.",
  },

  {
    number: "03",
    title: "Website Use",
    list: [
      "Content on this website is for general information about our company and services.",
      "You agree not to misuse this website or attempt to disrupt its normal operation.",
      "We may update website content at any time without prior notice.",
    ],
  },

  {
    number: "04",
    title: "Intellectual Property",
    body: "Unless otherwise agreed in a project contract, the content, design and branding of this website belong to Cloud Matrix Technologies. Deliverables for client projects are governed by the terms of the individual project agreement.",
  },

  {
    number: "05",
    title: "Job Applications",
    body: "Information submitted through our Careers page is used solely to evaluate your application and contact you about opportunities at Cloud Matrix Technologies.",
  },

  {
    number: "06",
    title: "Support & Availability",
    body: "Lifetime support applies to projects delivered by Cloud Matrix Technologies under the terms agreed for that specific project, and covers updates, maintenance and assistance as outlined in the project agreement.",
  },

  {
    number: "07",
    title: "Limitation of Liability",
    body: "While we take care in everything we build, we are not liable for indirect or incidental losses arising from the use of this website or our services, except where prohibited by law.",
  },

  {
    number: "08",
    title: "Changes to These Terms",
    body: "We may revise these Terms from time to time. Continued use of this website after changes are posted means you accept the revised Terms.",
  },

  {
    number: "09",
    title: "Governing Law",
    body: "These Terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts in Salem, Tamil Nadu.",
  },
];

/* =========================================================================
   CONSTANTS
=========================================================================== */

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================================
   SMALL COMPONENTS
=========================================================================== */

function AnimatedWord({ children, delay = 0, className = "" }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{
          opacity: 0,
          y: "110%",
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.85,
          delay,
          ease: EASE,
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function SectionNumber({ number }) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className="
        flex
        items-center
        gap-3
        font-mono
        text-[10px]
        uppercase
        tracking-[0.22em]
        text-[#2563EB]
        dark:text-[#67E8F9]
      "
    >
      <span
        className="
          inline-flex
          h-8
          min-w-8
          items-center
          justify-center
          rounded-full
          border
          border-[#BFDBFE]
          bg-[#EFF6FF]
          px-2
          text-[9px]
          font-semibold
          dark:border-[#20546C]
          dark:bg-[#08283A]
        "
      >
        {number}
      </span>

      <span
        className="
          hidden
          h-px
          w-8
          bg-gradient-to-r
          from-[#38BDF8]
          to-transparent
          md:block
        "
      />

      <span>Clause</span>
    </motion.div>
  );
}

/* =========================================================================
   PAGE
=========================================================================== */

export default function TermsOfService() {
  const pageRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  /* =========================================================================
     SCROLL PROGRESS
  ========================================================================== */

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.2,
  });

  /* =========================================================================
     MOUSE POSITION
  ========================================================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 45,
    damping: 25,
    mass: 0.4,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 45,
    damping: 25,
    mass: 0.4,
  });

  const orbX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-35, 35]
  );

  const orbY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [-25, 25]
  );

  const heroParallaxY = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0, -60]
  );

  const sideRailY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 120]
  );

  /* =========================================================================
     MOUSE TRACKING
  ========================================================================== */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const pointerFine = window.matchMedia("(pointer: fine)");

    if (!pointerFine.matches) return;

    const handlePointerMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      mouseX.set(
        Math.max(-0.5, Math.min(0.5, x))
      );

      mouseY.set(
        Math.max(-0.5, Math.min(0.5, y))
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, [
    mouseX,
    mouseY,
    shouldReduceMotion,
  ]);

  /* =========================================================================
     RENDER
  ========================================================================== */

  return (
    <main
      ref={pageRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F7FAFC]
        text-slate-900
        dark:bg-[#03131F]
        dark:text-white
      "
    >
      {/* ====================================================================
          TOP READING PROGRESS
      ===================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          fixed
          left-0
          right-0
          top-0
          z-[9999]
          h-[3px]
          origin-left
          bg-gradient-to-r
          from-[#2563EB]
          via-[#0EA5E9]
          to-[#06B6D4]
        "
        style={{
          scaleX: progress,
        }}
      />

      {/* ====================================================================
          AMBIENT BACKGROUND
      ===================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Large orb */}

        <motion.div
          style={{
            x: shouldReduceMotion
              ? 0
              : orbX,
            y: shouldReduceMotion
              ? 0
              : orbY,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 0.96, 1],
                  opacity: [
                    0.09,
                    0.15,
                    0.11,
                    0.09,
                  ],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-[260px]
            -top-[220px]
            h-[680px]
            w-[680px]
            rounded-full
            bg-[#2563EB]/10
            blur-[130px]
            dark:bg-[#2563EB]/14
          "
        />

        {/* Cyan orb */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -40, 25, 0],
                  y: [0, 25, -10, 0],
                  scale: [1, 0.96, 1.05, 1],
                  opacity: [
                    0.06,
                    0.12,
                    0.08,
                    0.06,
                  ],
                }
          }
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-[280px]
            -right-[220px]
            h-[680px]
            w-[680px]
            rounded-full
            bg-[#06B6D4]/8
            blur-[130px]
            dark:bg-[#06B6D4]/11
          "
        />

        {/* Center glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [0.92, 1.08, 0.92],
                  opacity: [
                    0.025,
                    0.07,
                    0.025,
                  ],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[50%]
            top-[43%]
            h-[440px]
            w-[440px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0EA5E9]/6
            blur-[120px]
            dark:bg-[#38BDF8]/8
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)]
            [background-size:64px_64px]
            dark:opacity-[0.038]
            dark:[background-image:linear-gradient(rgba(56,189,248,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.65)_1px,transparent_1px)]
          "
        />

        {/* Fade */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_30%,rgba(247,250,252,0.88)_100%)]
            dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,19,31,0.82)_100%)]
          "
        />
      </div>

      {/* ====================================================================
          HERO
      ===================================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-24
          pt-32
          md:px-10
          md:pb-32
          md:pt-44
        "
      >
        <div className="container-x">
          <motion.div
            style={{
              y: shouldReduceMotion
                ? 0
                : heroParallaxY,
            }}
            className="
              mx-auto
              max-w-7xl
            "
          >
            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="
                mb-7
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-14
                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-transparent
                  dark:from-[#38BDF8]
                "
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#2563EB]
                  dark:text-[#67E8F9]
                "
              >
                Legal / Terms
              </span>
            </motion.div>

            {/* Main title */}

            <h1
              className="
                max-w-6xl
                font-display
                text-[clamp(3.4rem,9vw,9rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.065em]
              "
            >
              <AnimatedWord delay={0.05}>
                Terms
              </AnimatedWord>

              <span className="block">
                <AnimatedWord delay={0.13}>
                  of
                </AnimatedWord>{" "}

                <AnimatedWord
                  delay={0.21}
                  className="
                    bg-gradient-to-r
                    from-[#2563EB]
                    via-[#0EA5E9]
                    to-[#06B6D4]
                    bg-clip-text
                    text-transparent
                  "
                >
                  Service.
                </AnimatedWord>
              </span>
            </h1>

            {/* Hero lower row */}

            <div
              className="
                mt-14
                grid
                gap-8
                lg:grid-cols-[1fr_0.55fr]
                lg:items-end
              "
            >
              {/* Description */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease: EASE,
                }}
              >
                <p
                  className="
                    max-w-2xl
                    text-base
                    leading-8
                    text-slate-600
                    md:text-lg
                    dark:text-slate-300
                  "
                >
                  A clear framework for using our
                  website and working with{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {company.name}
                  </span>
                  .
                </p>

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      rounded-full
                      border
                      border-[#BFDBFE]
                      bg-white/75
                      px-4
                      py-2
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-slate-500
                      backdrop-blur-md
                      dark:border-[#20546C]
                      dark:bg-[#08283A]/70
                      dark:text-slate-400
                    "
                  >
                    Effective
                  </span>

                  <span
                    className="
                      font-mono
                      text-xs
                      font-semibold
                      text-[#2563EB]
                      dark:text-[#67E8F9]
                    "
                  >
                    {legalIntro.effectiveDate}
                  </span>
                </div>
              </motion.div>

              {/* Right metadata */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                  ease: EASE,
                }}
                className="
                  lg:justify-self-end
                "
              >
                <div
                  className="
                    border-l
                    border-slate-300
                    pl-5
                    dark:border-slate-700
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.24em]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Issued by
                  </span>

                  <p
                    className="
                      mt-2
                      font-display
                      text-xl
                      font-semibold
                      text-slate-900
                      dark:text-[#EFFAFF]
                    "
                  >
                    {company.shortName}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {company.location}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          CONTENT AREA
      ===================================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-32
          md:px-10
          md:pb-40
        "
      >
        <div className="container-x">
          <div
            className="
              mx-auto
              grid
              max-w-7xl
              gap-12
              lg:grid-cols-[110px_minmax(0,1fr)]
            "
          >
            {/* ================================================================
                SIDE RAIL
            ================================================================= */}

            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <motion.div
                  style={{
                    y: shouldReduceMotion
                      ? 0
                      : sideRailY,
                  }}
                  className="
                    relative
                    flex
                    flex-col
                    items-center
                  "
                >
                  <span
                    className="
                      mb-5
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-slate-400
                      [writing-mode:vertical-rl]
                      dark:text-slate-500
                    "
                  >
                    Read
                  </span>

                  <div
                    className="
                      relative
                      h-[520px]
                      w-px
                      bg-slate-200
                      dark:bg-slate-800
                    "
                  >
                    <motion.div
                      style={{
                        scaleY: progress,
                      }}
                      className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-px
                        origin-top
                        bg-gradient-to-b
                        from-[#2563EB]
                        via-[#0EA5E9]
                        to-[#06B6D4]
                      "
                    />

                    {sections.map(
                      (section, index) => (
                        <motion.div
                          key={section.number}
                          whileHover={{
                            scale: 1.35,
                          }}
                          className="
                            absolute
                            left-1/2
                            h-2
                            w-2
                            -translate-x-1/2
                            rounded-full
                            border
                            border-[#0EA5E9]/40
                            bg-[#F7FAFC]
                            dark:bg-[#03131F]
                          "
                          style={{
                            top: `${
                              (index /
                                Math.max(
                                  sections.length -
                                    1,
                                  1
                                )) *
                              100
                            }%`,
                          }}
                        />
                      )
                    )}
                  </div>

                  <span
                    className="
                      mt-5
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-slate-400
                      [writing-mode:vertical-rl]
                      dark:text-slate-500
                    "
                  >
                    {sections.length} clauses
                  </span>
                </motion.div>
              </div>
            </aside>

            {/* ================================================================
                DOCUMENT
            ================================================================= */}

            <div
              className="
                divide-y
                divide-slate-200/80
                dark:divide-slate-800/80
              "
            >
              {sections.map(
                (section, index) => (
                  <motion.article
                    key={section.number}
                    initial={{
                      opacity: 0,
                      y: 45,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.02,
                      ease: EASE,
                    }}
                    className="
                      group
                      relative
                      py-12
                      md:py-16
                      lg:py-20
                    "
                  >
                    {/* Background hover light */}

                    <motion.div
                      aria-hidden="true"
                      initial={{
                        opacity: 0,
                      }}
                      whileHover={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="
                        pointer-events-none
                        absolute
                        -right-28
                        top-1/2
                        h-64
                        w-64
                        -translate-y-1/2
                        rounded-full
                        bg-[#38BDF8]/8
                        blur-[90px]
                      "
                    />

                    <div
                      className="
                        relative
                        grid
                        gap-8
                        md:grid-cols-[110px_minmax(0,1fr)]
                        lg:grid-cols-[150px_minmax(0,1fr)]
                      "
                    >
                      {/* Number */}

                      <div>
                        <SectionNumber
                          number={section.number}
                        />
                      </div>

                      {/* Main text */}

                      <div className="max-w-4xl">
                        {/* Heading */}

                        <motion.h2
                          whileHover={{
                            x: 5,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: EASE,
                          }}
                          className="
                            font-display
                            text-2xl
                            font-semibold
                            leading-tight
                            tracking-[-0.025em]
                            text-slate-900
                            md:text-3xl
                            lg:text-4xl
                            dark:text-[#EFFAFF]
                          "
                        >
                          {section.title}
                        </motion.h2>

                        {/* Accent */}

                        <motion.div
                          initial={{
                            width: "24px",
                          }}
                          whileInView={{
                            width: "68px",
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.7,
                            delay: 0.12,
                            ease: EASE,
                          }}
                          className="
                            mt-5
                            h-[2px]
                            bg-gradient-to-r
                            from-[#2563EB]
                            via-[#0EA5E9]
                            to-[#06B6D4]
                          "
                        />

                        {/* Body */}

                        {section.body && (
                          <motion.p
                            initial={{
                              opacity: 0,
                              y: 18,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.7,
                              delay: 0.18,
                              ease: EASE,
                            }}
                            className="
                              mt-7
                              max-w-3xl
                              text-base
                              leading-8
                              text-slate-600
                              md:text-lg
                              dark:text-slate-300
                            "
                          >
                            {section.body}
                          </motion.p>
                        )}

                        {/* List */}

                        {section.list && (
                          <ul
                            className="
                              mt-7
                              max-w-3xl
                              space-y-4
                            "
                          >
                            {section.list.map(
                              (
                                item,
                                itemIndex
                              ) => (
                                <motion.li
                                  key={item}
                                  initial={{
                                    opacity: 0,
                                    x: -14,
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  viewport={{
                                    once: true,
                                  }}
                                  transition={{
                                    duration:
                                      0.55,
                                    delay:
                                      0.12 +
                                      itemIndex *
                                        0.08,
                                    ease: EASE,
                                  }}
                                  whileHover={{
                                    x: 5,
                                  }}
                                  className="
                                    flex
                                    items-start
                                    gap-4
                                    text-base
                                    leading-8
                                    text-slate-600
                                    md:text-lg
                                    dark:text-slate-300
                                  "
                                >
                                  <span
                                    className="
                                      mt-[13px]
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      bg-[#0EA5E9]
                                      shadow-[0_0_12px_rgba(14,165,233,0.35)]
                                    "
                                  />

                                  <span>
                                    {item}
                                  </span>
                                </motion.li>
                              )
                            )}
                          </ul>
                        )}

                        {/* Clause footer */}

                        <div
                          className="
                            mt-8
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className="
                              font-mono
                              text-[9px]
                              uppercase
                              tracking-[0.2em]
                              text-slate-400
                              dark:text-slate-500
                            "
                          >
                            Cloud Matrix
                          </span>

                          <span
                            className="
                              h-px
                              w-8
                              bg-slate-200
                              dark:bg-slate-700
                            "
                          />

                          <span
                            className="
                              font-mono
                              text-[9px]
                              uppercase
                              tracking-[0.2em]
                              text-slate-400
                              dark:text-slate-500
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              )}

              {/* =============================================================
                  CONTACT / END PANEL
              ============================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                }}
                className="
                  relative
                  overflow-hidden
                  pt-14
                  md:pt-20
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-slate-200
                    bg-white/70
                    p-7
                    backdrop-blur-xl
                    md:p-10
                    lg:p-12
                    dark:border-slate-800
                    dark:bg-[#071D2C]/70
                  "
                >
                  {/* Glow */}

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: [0, 40, 0],
                            y: [0, -25, 0],
                            scale: [
                              1,
                              1.08,
                              1,
                            ],
                          }
                    }
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-56
                      w-56
                      rounded-full
                      bg-[#0EA5E9]/10
                      blur-[80px]
                      dark:bg-[#06B6D4]/10
                    "
                  />

                  <div className="relative z-10">
                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-[#2563EB]
                        dark:text-[#67E8F9]
                      "
                    >
                      Questions?
                    </span>

                    <h2
                      className="
                        mt-4
                        max-w-2xl
                        font-display
                        text-3xl
                        font-semibold
                        leading-tight
                        tracking-[-0.03em]
                        text-slate-900
                        md:text-4xl
                        dark:text-[#EFFAFF]
                      "
                    >
                      Need clarification before
                      you move forward?
                    </h2>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-slate-600
                        md:text-base
                        dark:text-slate-300
                      "
                    >
                      Reach out to{" "}
                      {company.name} at{" "}
                      <a
                        href={`mailto:${company.email}`}
                        className="
                          font-medium
                          text-[#2563EB]
                          underline
                          decoration-[#93C5FD]
                          underline-offset-4
                          transition-colors
                          hover:text-[#06B6D4]
                          dark:text-[#67E8F9]
                          dark:hover:text-white
                        "
                      >
                        {company.email}
                      </a>{" "}
                      or{" "}
                      <a
                        href={company.phoneHref}
                        className="
                          font-medium
                          text-[#2563EB]
                          underline
                          decoration-[#93C5FD]
                          underline-offset-4
                          transition-colors
                          hover:text-[#06B6D4]
                          dark:text-[#67E8F9]
                          dark:hover:text-white
                        "
                      >
                        {company.phone}
                      </a>
                      .
                    </p>

                  </div>
                </div>
              </motion.section>

              {/* =============================================================
                  FOOTER SIGNATURE
              ============================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-4
                  py-12
                "
              >
                <span
                  className="
                    h-px
                    w-14
                    bg-gradient-to-r
                    from-transparent
                    to-slate-300
                    dark:to-slate-700
                  "
                />

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  {company.shortName}
                </span>

                <span
                  className="
                    h-px
                    w-14
                    bg-gradient-to-l
                    from-transparent
                    to-slate-300
                    dark:to-slate-700
                  "
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}