import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useCursor } from "../context/CursorContext";

/* =========================================================================
   SOCIAL ICON
   ========================================================================= */

function SocialIcon({ label }) {
  const name = String(label || "").toLowerCase();

  /* -----------------------------------------------------------------------
     LINKEDIN
  ----------------------------------------------------------------------- */

  if (name.includes("linkedin")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.94 8.54H3.56V20h3.38V8.54ZM5.25 3A2 2 0 1 0 5.2 7a2 2 0 0 0 .05-4ZM20.44 13.43c0-3.45-1.84-5.05-4.3-5.05a3.72 3.72 0 0 0-3.36 1.84h-.05V8.54H9.5V20h3.23v-5.68c0-1.5.28-2.95 2.14-2.95 1.83 0 1.85 1.72 1.85 3.05V20H20v-6.57Z" />
      </svg>
    );
  }

  /* -----------------------------------------------------------------------
     INSTAGRAM
  ----------------------------------------------------------------------- */

  if (name.includes("instagram")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />

        <circle
          cx="12"
          cy="12"
          r="4"
        />

        <circle
          cx="17.4"
          cy="6.6"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  /* -----------------------------------------------------------------------
     YOUTUBE
  ----------------------------------------------------------------------- */

  if (name.includes("youtube")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M21.58 7.19a2.96 2.96 0 0 0-2.08-2.09C17.66 4.6 12 4.6 12 4.6s-5.66 0-7.5.5a2.96 2.96 0 0 0-2.08 2.09C1.92 9.04 1.92 12 1.92 12s0 2.96.5 4.81a2.96 2.96 0 0 0 2.08 2.09c1.84.5 7.5.5 7.5.5s5.66 0 7.5-.5a2.96 2.96 0 0 0 2.08-2.09c.5-1.85.5-4.81.5-4.81s0-2.96-.5-4.81ZM9.92 15.6V8.4L16.08 12l-6.16 3.6Z"
        />
      </svg>
    );
  }

  /* -----------------------------------------------------------------------
     FACEBOOK
  ----------------------------------------------------------------------- */

  if (name.includes("facebook")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.08c0-.87.24-1.46 1.5-1.46h1.6V3.94c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.03V10H7.82v3h2.62v8h3.16Z" />
      </svg>
    );
  }

  return (
    <span className="text-xs font-bold">
      ↗
    </span>
  );
}

/* =========================================================================
   CUSTOM CURSOR
   ========================================================================= */

export default function CustomCursor() {
  const { cursor } = useCursor() || {};

  const [enabled, setEnabled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [pressed, setPressed] = useState(false);

  /* =========================================================================
     POINTER POSITION
  ========================================================================= */

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  /* =========================================================================
     MAIN CURSOR
  ========================================================================= */

  const mainX = useSpring(x, {
    stiffness: 1800,
    damping: 85,
    mass: 0.035,
  });

  const mainY = useSpring(y, {
    stiffness: 1800,
    damping: 85,
    mass: 0.035,
  });

  /* =========================================================================
     OUTER CURSOR
  ========================================================================= */

  const ringX = useSpring(x, {
    stiffness: 520,
    damping: 42,
    mass: 0.08,
  });

  const ringY = useSpring(y, {
    stiffness: 520,
    damping: 42,
    mass: 0.08,
  });

  /* =========================================================================
     CURSOR STATE
  ========================================================================= */

  const label = cursor?.label || "";
  const variant = cursor?.variant || "default";
  const color = cursor?.color;

  const isSocial = variant === "social";
  const isLabel = Boolean(label);

  /* =========================================================================
     COLORS
  ========================================================================= */

  const brandColor =
    color ||
    (isDark
      ? "#67E8F9"
      : "#0E7C86");

  const primaryColor = isSocial
    ? brandColor
    : isDark
      ? "#DFFFFB"
      : "#0E7C86";

  const ringColor = isSocial
    ? brandColor
    : isDark
      ? "#79F2E5"
      : "#0E7C86";

  /* =========================================================================
     CURSOR SIZE
  ========================================================================= */

  const cursorSize = useMemo(() => {
    if (isSocial) {
      return {
        width: 142,
        height: 52,
      };
    }

    if (isLabel) {
      return {
        width: 118,
        height: 46,
      };
    }

    return {
      width: 10,
      height: 10,
    };
  }, [isSocial, isLabel]);

  /* =========================================================================
     INITIALIZE
  ========================================================================= */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return undefined;
    }

    const pointerFine =
      window.matchMedia(
        "(pointer: fine)"
      );

    /*
     * Do not render custom cursor
     * on touch devices.
     */

    if (!pointerFine.matches) {
      return undefined;
    }

    setEnabled(true);

    const root =
      document.documentElement;

    /* -----------------------------------------------------------------------
       THEME
    ----------------------------------------------------------------------- */

    const updateTheme = () => {
      setIsDark(
        root.classList.contains("dark")
      );
    };

    updateTheme();

    const observer =
      new MutationObserver(
        updateTheme
      );

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* -----------------------------------------------------------------------
       POINTER
    ----------------------------------------------------------------------- */

    const handlePointerMove = (
      event
    ) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
      {
        passive: true,
      }
    );

    /*
     * Hide native cursor.
     */

    root.classList.add(
      "signal-cursor-active"
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      observer.disconnect();

      root.classList.remove(
        "signal-cursor-active"
      );
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  /* =========================================================================
     RENDER
  ========================================================================= */

  return (
    <>
      {/* =====================================================================
          MAIN CURSOR
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99999]
        "
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          initial={false}
          animate={{
            width: cursorSize.width,
            height: cursorSize.height,

            borderRadius: isSocial
              ? 18
              : isLabel
                ? 14
                : 999,

            scale: pressed
              ? 0.88
              : 1,

            backgroundColor:
              isSocial || isLabel
                ? primaryColor
                : primaryColor,

            boxShadow: isSocial
              ? `
                0 0 25px ${brandColor}55,
                0 0 65px ${brandColor}22
              `
              : isLabel
                ? `
                  0 0 20px ${primaryColor}44,
                  0 0 45px ${primaryColor}18
                `
                : `
                  0 0 18px ${primaryColor}55
                `,
          }}
          transition={{
            type: "spring",
            stiffness: 480,
            damping: 28,
            mass: 0.16,
          }}
          className="
            relative
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >
          {/* ===============================================================
              NORMAL DOT
          ================================================================ */}

          {!isLabel &&
            !isSocial && (
              <>
                <motion.span
                  className="
                    absolute
                    h-[3px]
                    w-[3px]
                    rounded-full
                  "
                  animate={{
                    scale: [
                      1,
                      1.7,
                      1,
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundColor:
                      isDark
                        ? "#063F45"
                        : "#FFFFFF",
                  }}
                />

                <motion.span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                  "
                  style={{
                    borderColor:
                      isDark
                        ? "#DFFFFB55"
                        : "#FFFFFF55",
                  }}
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
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </>
            )}

          {/* ===============================================================
              NORMAL LABEL
          ================================================================ */}

          {isLabel &&
            !isSocial && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  px-4
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: isDark
                    ? "#063F45"
                    : "#FFFFFF",
                }}
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-current
                  "
                />

                <span>
                  {label}
                </span>

                <span
                  className="
                    text-[11px]
                    opacity-60
                  "
                >
                  ↗
                </span>
              </motion.div>
            )}

          {/* ===============================================================
              SOCIAL LABEL
          ================================================================ */}

          {isSocial && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                x: -5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                flex
                items-center
                gap-2.5
                whitespace-nowrap
                px-4
                font-mono
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              {/* Social icon */}

              <motion.span
                className="
                  relative
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  backdrop-blur-sm
                "
                animate={{
                  scale: [
                    1,
                    1.08,
                    1,
                  ],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <SocialIcon
                  label={label}
                />

                {/* tiny glow */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-white/20
                  "
                />
              </motion.span>

              <span>
                {label || "Social"}
              </span>

              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  text-white/60
                "
              >
                ↗
              </motion.span>
            </motion.div>
          )}

          {/* ===============================================================
              SOCIAL SHINE
          ================================================================ */}

          {isSocial && (
            <motion.span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                -translate-x-full
                skew-x-[-20deg]
                bg-white/20
              "
              animate={{
                x: [
                  "-120%",
                  "180%",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
          )}

          {/* ===============================================================
              LABEL BORDER
          ================================================================ */}

          {(isLabel || isSocial) && (
            <motion.span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[inherit]
                border
              "
              style={{
                borderColor:
                  isSocial
                    ? `${brandColor}99`
                    : `${primaryColor}66`,
              }}
              animate={{
                opacity: [
                  0.7,
                  1,
                  0.7,
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* =====================================================================
          LARGE FLUID RING
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99998]
        "
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          initial={false}
          animate={{
            width: isSocial
              ? 76
              : isLabel
                ? 62
                : 36,

            height: isSocial
              ? 76
              : isLabel
                ? 62
                : 36,

            borderRadius: isSocial
              ? 24
              : isLabel
                ? 20
                : 999,

            scale: pressed
              ? 1.25
              : 1,

            rotate: isSocial
              ? [0, 360]
              : 0,
          }}
          transition={{
            width: {
              type: "spring",
              stiffness: 360,
              damping: 28,
            },

            height: {
              type: "spring",
              stiffness: 360,
              damping: 28,
            },

            scale: {
              type: "spring",
              stiffness: 420,
              damping: 25,
            },

            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="
            relative
            border
          "
          style={{
            borderColor:
              `${ringColor}99`,

            boxShadow: isSocial
              ? `
                0 0 25px ${brandColor}25,
                inset 0 0 20px ${brandColor}10
              `
              : `
                0 0 14px ${ringColor}22
              `,
          }}
        >
          {/* ===============================================================
              ROTATING DASH
          ================================================================ */}

          <motion.span
            className="
              absolute
              left-1/2
              top-[-3px]
              h-2
              w-2
              -translate-x-1/2
              rounded-full
            "
            style={{
              backgroundColor:
                ringColor,

              boxShadow:
                `0 0 12px ${ringColor}`,
            }}
            animate={{
              rotate: 360,
              scale: [
                1,
                1.35,
                1,
              ],
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },

              scale: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* ===============================================================
              INNER CIRCLE
          ================================================================ */}

          <motion.span
            className="
              absolute
              left-1/2
              top-1/2
              h-1.5
              w-1.5
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              backgroundColor:
                ringColor,
            }}
            animate={{
              scale: [
                0.8,
                1.5,
                0.8,
              ],
              opacity: [
                0.3,
                0.8,
                0.3,
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* ===============================================================
              SOCIAL EXTRA MARKERS
          ================================================================ */}

          {isSocial && (
            <>
              <motion.span
                className="
                  absolute
                  bottom-[-4px]
                  left-1/2
                  h-1.5
                  w-1.5
                  -translate-x-1/2
                  rounded-full
                  bg-white
                "
                animate={{
                  opacity: [
                    0.2,
                    1,
                    0.2,
                  ],
                  scale: [
                    1,
                    1.5,
                    1,
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.span
                className="
                  absolute
                  left-[-4px]
                  top-1/2
                  h-1
                  w-1
                  -translate-y-1/2
                  rounded-full
                  bg-white/70
                "
                animate={{
                  opacity: [
                    0.2,
                    0.9,
                    0.2,
                  ],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                }}
              />

              <motion.span
                className="
                  absolute
                  right-[-4px]
                  top-1/2
                  h-1
                  w-1
                  -translate-y-1/2
                  rounded-full
                  bg-white/70
                "
                animate={{
                  opacity: [
                    0.2,
                    0.9,
                    0.2,
                  ],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: 0.4,
                }}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* =====================================================================
          TRAILING GLOW
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99997]
        "
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.span
          className="
            block
            rounded-full
            blur-md
          "
          animate={{
            width: isSocial
              ? 90
              : isLabel
                ? 70
                : 42,

            height: isSocial
              ? 90
              : isLabel
                ? 70
                : 42,

            opacity:
              isSocial
                ? 0.14
                : isLabel
                  ? 0.1
                  : 0.06,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            backgroundColor:
              ringColor,
          }}
        />
      </motion.div>

      {/* =====================================================================
          CLICK RIPPLE
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99996]
          rounded-full
          border
        "
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: ringColor,
        }}
        animate={{
          width: pressed
            ? 58
            : 20,

          height: pressed
            ? 58
            : 20,

          scale: pressed
            ? 1.35
            : 0.6,

          opacity: pressed
            ? 0.8
            : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* =====================================================================
          CLICK CROSSHAIR
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99995]
        "
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: pressed
            ? 1
            : 0,
          scale: pressed
            ? 1
            : 0.6,
        }}
        transition={{
          duration: 0.18,
        }}
      >
        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-px
            w-10
            -translate-x-1/2
            -translate-y-1/2
          "
          style={{
            backgroundColor:
              ringColor,
          }}
        />

        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-10
            w-px
            -translate-x-1/2
            -translate-y-1/2
          "
          style={{
            backgroundColor:
              ringColor,
          }}
        />
      </motion.div>
    </>
  );
}