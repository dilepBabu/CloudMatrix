import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { waLink } from "../data/content";

const ease = [0.16, 1, 0.3, 1];

const EXPERT_PATH = "/talk-to-expert";

export default function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  /* ============================================================
     MOUSE
  ============================================================ */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 55,
    damping: 24,
    mass: 0.35,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 55,
    damping: 24,
    mass: 0.35,
  });

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["15%", "85%"]
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["15%", "85%"]
  );

  /* ============================================================
     POINTER TRACKING
  ============================================================ */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const section = sectionRef.current;

    if (!section) return;

    const pointerFine = window.matchMedia(
      "(pointer: fine)"
    );

    if (!pointerFine.matches) return;

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(
        Math.max(-0.5, Math.min(0.5, x))
      );

      mouseY.set(
        Math.max(-0.5, Math.min(0.5, y))
      );
    };

    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave,
      { passive: true }
    );

    return () => {
      section.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, [
    mouseX,
    mouseY,
    shouldReduceMotion,
  ]);

  /* ============================================================
     WHATSAPP
  ============================================================ */

  const whatsappUrl = waLink(
    "Hello! I came across your website and I’d like to know more about your services."
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#F5FAFF]
        py-24
        md:py-32
        lg:py-40
        dark:bg-[#041522]
      "
    >
      {/* ==========================================================
          MOUSE GLOW
      =========================================================== */}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-0
            h-[460px]
            w-[460px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#38BDF8]/10
            blur-[100px]
            dark:bg-[#0EA5E9]/12
          "
          style={{
            left: glowX,
            top: glowY,
          }}
        />
      )}

      {/* ==========================================================
          AMBIENT LIGHT
      =========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          z-0
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-[#2563EB]/8
          blur-[100px]
          dark:bg-[#2563EB]/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-48
          -right-40
          z-0
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-[#06B6D4]/8
          blur-[110px]
          dark:bg-[#06B6D4]/8
        "
      />

      {/* ==========================================================
          GRID
      =========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)]
          [background-size:60px_60px]
          dark:opacity-[0.035]
          dark:[background-image:linear-gradient(rgba(56,189,248,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.8)_1px,transparent_1px)]
        "
      />

      {/* ==========================================================
          LIGHT BEAM
      =========================================================== */}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[-30%]
            top-[-20%]
            z-0
            h-[140%]
            w-[15%]
            rotate-[14deg]
            bg-gradient-to-r
            from-transparent
            via-[#38BDF8]/10
            to-transparent
            blur-2xl
          "
          animate={{
            x: ["0%", "900%"],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ==========================================================
          CORNERS
      =========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-6
          top-6
          z-0
          h-20
          w-20
          border-l
          border-t
          border-[#2563EB]/20
          dark:border-[#38BDF8]/20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-6
          right-6
          z-0
          h-20
          w-20
          border-b
          border-r
          border-[#06B6D4]/20
          dark:border-[#38BDF8]/20
        "
      />

      {/* ==========================================================
          CONTENT
      =========================================================== */}

      <div
        className="
          container-x
          relative
          z-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.85,
            ease,
          }}
          className="
            relative
            mx-auto
            max-w-5xl
          "
        >
          {/* ========================================================
              CARD
          ========================================================= */}

          <div
            className="
              group
              relative
              z-20
              overflow-hidden
              rounded-[2rem]
              border
              border-[#D8E8F5]
              bg-white/90
              px-6
              py-16
              shadow-[0_25px_90px_rgba(30,64,175,0.08)]
              backdrop-blur-xl
              dark:border-[#153A52]
              dark:bg-[#061C2D]/90
              dark:shadow-[0_25px_90px_rgba(0,0,0,0.35)]
              md:px-12
              md:py-20
            "
          >
            {/* ======================================================
                HOVER GLOW
            ======================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                opacity-0
                transition-opacity
                duration-700
                group-hover:opacity-100
              "
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(56,189,248,0.10), transparent 45%)",
              }}
            />

            {/* ======================================================
                MOVING TOP BORDER
            ======================================================= */}

            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  z-0
                  h-px
                  w-32
                  bg-gradient-to-r
                  from-transparent
                  via-[#38BDF8]
                  to-transparent
                  shadow-[0_0_15px_rgba(56,189,248,0.7)]
                "
                animate={{
                  x: ["-10%", "800%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear",
                }}
              />
            )}

            {/* ======================================================
                LABEL
            ======================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
              className="
                relative
                z-10
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-r
                  from-transparent
                  to-[#38BDF8]
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
                Let's Create
              </span>

              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-l
                  from-transparent
                  to-[#38BDF8]
                "
              />
            </motion.div>

            {/* ======================================================
                HEADING
            ======================================================= */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 55,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
              className="
                relative
                z-10
                mt-8
                text-center
                font-display
                text-4xl
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                text-[#102A43]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                dark:text-[#EFFAFF]
              "
            >
              <span className="block">
                Ready to build
              </span>

              <motion.span
                className="
                  mt-2
                  inline-block
                  cursor-default
                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-[#06B6D4]
                  bg-clip-text
                  text-transparent
                "
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.02,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                }}
              >
                something remarkable?
              </motion.span>
            </motion.h2>

            {/* ======================================================
                DESCRIPTION
            ======================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
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
                delay: 0.2,
                ease,
              }}
              className="
                relative
                z-10
                mx-auto
                mt-8
                max-w-2xl
                text-center
                text-sm
                leading-relaxed
                text-[#587087]
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

            {/* ======================================================
                BUTTONS
            ======================================================= */}

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
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease,
              }}
              className="
                relative
                z-[50]
                mt-10
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
              "
            >
              {/* ==================================================
                  START A CONVERSATION
              =================================================== */}

             
            </motion.div>

            {/* ======================================================
                STATUS
            ======================================================= */}

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
                duration: 0.7,
                delay: 0.55,
              }}
              className="
                relative
                z-10
                mt-8
                flex
                items-center
                justify-center
                gap-2
                text-center
                font-mono
                text-[9px]
                uppercase
                tracking-[0.24em]
                text-[#71879B]
                dark:text-[#688BA2]
              "
            >
              <motion.span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#06B6D4]
                  shadow-[0_0_12px_rgba(6,182,212,0.8)]
                "
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.5, 1],
                        opacity: [0.35, 1, 0.35],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span>
                Let's make your next move count
              </span>
            </motion.div>

            {/* ======================================================
                BOTTOM ACCENT
            ======================================================= */}

            <motion.div
              aria-hidden="true"
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
                duration: 1,
                delay: 0.6,
                ease,
              }}
              className="
                pointer-events-none
                absolute
                bottom-0
                left-1/2
                z-0
                h-[2px]
                w-1/3
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#38BDF8]
                to-transparent
              "
            />
          </div>
        </motion.div>
      </div>

      {/* ==========================================================
          PARTICLES
      =========================================================== */}

      {!shouldReduceMotion && (
        <>
          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[8%]
              top-1/2
              z-0
              h-1
              w-1
              rounded-full
              bg-[#38BDF8]
            "
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[8%]
              top-[45%]
              z-0
              h-1.5
              w-1.5
              rounded-full
              bg-[#2563EB]
            "
            animate={{
              x: [0, -25, 0],
              y: [0, 20, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </section>
  );
}