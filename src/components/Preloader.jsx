import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const ease = [0.22, 1, 0.36, 1];

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;

    try {
      seen =
        window.sessionStorage.getItem("cmatrix-preloaded") === "1";
    } catch {
      // Ignore storage errors
    }

    const reducedMotion = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (seen || reducedMotion) {
      return;
    }

    setVisible(true);

    let startTime = null;
    let animationFrame;

    /*
    |--------------------------------------------------------------------------
    | SLOWER 0 → 100% LOADING
    |--------------------------------------------------------------------------
    */

    const duration = 2800;

    const animateProgress = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed = time - startTime;

      const rawProgress = Math.min(
        elapsed / duration,
        1
      );

      /*
       * Smooth ease-out.
       */
      const easedProgress =
        1 - Math.pow(1 - rawProgress, 2.25);

      const currentProgress = Math.min(
        100,
        Math.round(easedProgress * 100)
      );

      setProgress(currentProgress);

      if (rawProgress < 1) {
        animationFrame =
          requestAnimationFrame(animateProgress);
      } else {
        /*
         * Small pause after reaching 100%.
         */
        window.setTimeout(() => {
          setVisible(false);

          try {
            window.sessionStorage.setItem(
              "cmatrix-preloaded",
              "1"
            );
          } catch {
            // Ignore storage errors
          }
        }, 450);
      }
    };

    animationFrame =
      requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        overflow-hidden

        bg-[#FAF9FF]
        dark:bg-[#041716]

        text-slate-900
        dark:text-white
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_50%_42%,rgba(139,92,246,0.12),transparent_34%)]

          dark:bg-[radial-gradient(circle_at_50%_42%,rgba(20,184,166,0.12),transparent_34%)]
        "
      />

      {/* =====================================================
          SECONDARY AMBIENT LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full

          bg-violet-400/[0.035]

          dark:bg-cyan-400/[0.035]
        "
      />

      {/* =====================================================
          FUTURISTIC GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.022]
          dark:opacity-[0.032]

          [background-image:linear-gradient(rgba(124,58,237,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.8)_1px,transparent_1px)]

          [background-size:60px_60px]

          dark:[background-image:linear-gradient(rgba(45,212,191,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.8)_1px,transparent_1px)]
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 14,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease,
        }}
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
        style={{
          willChange: "transform, opacity",
        }}
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.82,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          {/* Logo glow */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[-24px]
              rounded-full

              bg-violet-500/[0.07]

              dark:bg-teal-400/[0.07]
            "
            animate={{
              scale: [0.92, 1.06, 0.92],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              willChange: "transform, opacity",
            }}
          />

          {/* Logo */}

          <motion.img
            src={logo}
            alt="Cloud Matrix"
            width={72}
            height={72}
            fetchPriority="high"
            decoding="async"
            initial={{
              opacity: 0,
              scale: 0.88,
              rotate: -3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="
              relative
              z-10
              h-[72px]
              w-[72px]
              object-contain
            "
            style={{
              willChange: "transform, opacity",
            }}
          />
        </motion.div>

        {/* ===================================================
            BRAND
        =================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.55,
            ease,
          }}
          className="
            mt-5

            font-mono
            text-[10px]
            tracking-[0.32em]
            uppercase
            text-center

            text-violet-700/60

            dark:text-teal-100/60
          "
        >
          Cloud Matrix Technologies
        </motion.p>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <div className="mt-9 flex flex-col items-center">
          {/* Progress bar */}

          <div
            className="
              relative
              h-[3px]
              w-52
              overflow-hidden
              rounded-full

              bg-violet-100

              dark:bg-teal-950/70
            "
          >
            {/* Main progress */}

            <motion.div
              className="
                absolute
                inset-y-0
                left-0

                rounded-full

                bg-gradient-to-r

                from-violet-500
                via-purple-500
                to-indigo-500

                dark:from-emerald-400
                dark:via-teal-400
                dark:to-cyan-400
              "
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.08,
                ease: "linear",
              }}
              style={{
                willChange: "width",
              }}
            />

            {/* Moving shine */}

            {progress < 100 && (
              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  w-12

                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent

                  dark:via-white/40
                "
                animate={{
                  x: ["-60px", "260px"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>

          {/* =================================================
              PERCENTAGE
          ================================================= */}

          <div className="mt-3 flex items-center gap-2">
            <span
              className="
                font-mono
                text-[11px]
                font-medium
                tabular-nums

                text-violet-600

                dark:text-teal-300
              "
            >
              {progress}%
            </span>

            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.18em]
                uppercase

                text-slate-400

                dark:text-slate-500
              "
            >
              Loading
            </span>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          TOP LEFT CORNER
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.6,
        }}
        className="
          pointer-events-none
          absolute
          left-6
          top-6

          h-9
          w-9

          border-l
          border-t

          border-violet-400/20

          dark:border-teal-400/20
        "
      />

      {/* =====================================================
          BOTTOM RIGHT CORNER
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.65,
          duration: 0.6,
        }}
        className="
          pointer-events-none
          absolute
          bottom-6
          right-6

          h-9
          w-9

          border-b
          border-r

          border-violet-400/20

          dark:border-teal-400/20
        "
      />

      {/* =====================================================
          STATUS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2

          whitespace-nowrap

          font-mono
          text-[8px]
          tracking-[0.25em]
          uppercase

          text-slate-400/60

          dark:text-teal-100/30
        "
      >
        Initializing Experience
      </div>
    </motion.div>
  );
}