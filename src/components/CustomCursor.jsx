import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useCursor } from "../context/CursorContext";

/* =========================================================================
   PREMIUM DIRECTION CURSOR
   =========================================================================
   Design preserved:
   - No circles
   - No rings
   - No orbit
   - No ripple
   - Sharp directional arrow
   - Small trailing accent
   - Compact interaction label
   - High contrast light/dark
   ========================================================================= */

export default function CustomCursor() {
  const cursorContext = useCursor();

  const cursor = cursorContext?.cursor;

  const reducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [pressed, setPressed] = useState(false);

  /* =========================================================================
     RAW POINTER
  ========================================================================= */

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* =========================================================================
     MAIN CURSOR SPRING
  ========================================================================= */

  const x = useSpring(mouseX, {
    stiffness: 1600,
    damping: 80,
    mass: 0.025,
  });

  const y = useSpring(mouseY, {
    stiffness: 1600,
    damping: 80,
    mass: 0.025,
  });

  /* =========================================================================
     TRAIL SPRING
  ========================================================================= */

  const trailX = useSpring(mouseX, {
    stiffness: 480,
    damping: 48,
    mass: 0.06,
  });

  const trailY = useSpring(mouseY, {
    stiffness: 480,
    damping: 48,
    mass: 0.06,
  });

  /* =========================================================================
     CURSOR STATE
  ========================================================================= */

  const label = cursor?.label || "";
  const variant = cursor?.variant || "default";
  const customColor = cursor?.color;

  const hasLabel = Boolean(label);
  const isSocial = variant === "social";

  /* =========================================================================
     COLORS
  ========================================================================= */

  const arrowColor =
    customColor ||
    (isDark ? "#FFFFFF" : "#0B1220");

  const accentColor =
    customColor ||
    (isDark ? "#22D3EE" : "#2563EB");

  const labelBg =
    isDark
      ? "#07131C"
      : "#FFFFFF";

  const labelColor =
    isDark
      ? "#FFFFFF"
      : "#0B1220";

  const labelBorder =
    isDark
      ? "#22D3EE"
      : "#2563EB";

  /* =========================================================================
     POINTER / THEME INITIALIZATION
  ========================================================================= */

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.documentElement;

    const finePointerQuery = window.matchMedia(
      "(pointer: fine)"
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    /* -----------------------------------------------------------------------
       THEME
    ----------------------------------------------------------------------- */

    const updateTheme = () => {
      setIsDark(
        root.classList.contains("dark")
      );
    };

    updateTheme();

    const themeObserver =
      new MutationObserver(updateTheme);

    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* -----------------------------------------------------------------------
       CURSOR ENABLE STATE
    ----------------------------------------------------------------------- */

    const updateCursorAvailability = () => {
      const canRun =
        finePointerQuery.matches &&
        !reducedMotionQuery.matches;

      setEnabled(canRun);

      if (canRun) {
        root.classList.add(
          "signal-cursor-active"
        );
      } else {
        root.classList.remove(
          "signal-cursor-active"
        );
      }
    };

    updateCursorAvailability();

    /* -----------------------------------------------------------------------
       POINTER MOVE
    ----------------------------------------------------------------------- */

    const handlePointerMove = (event) => {
      /*
       * Only a real mouse / fine pointer should
       * drive this cursor.
       */
      if (
        event.pointerType &&
        event.pointerType !== "mouse"
      ) {
        return;
      }

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    /* -----------------------------------------------------------------------
       POINTER DOWN
    ----------------------------------------------------------------------- */

    const handlePointerDown = (event) => {
      if (
        event.pointerType &&
        event.pointerType !== "mouse"
      ) {
        return;
      }

      setPressed(true);
    };

    /* -----------------------------------------------------------------------
       POINTER UP
    ----------------------------------------------------------------------- */

    const handlePointerUp = () => {
      setPressed(false);
    };

    /* -----------------------------------------------------------------------
       POINTER ENTER
    ----------------------------------------------------------------------- */

    const handlePointerCancel = () => {
      setPressed(false);
    };

    /* -----------------------------------------------------------------------
       LISTENERS
    ----------------------------------------------------------------------- */

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

    window.addEventListener(
      "pointercancel",
      handlePointerCancel,
      {
        passive: true,
      }
    );

    /* -----------------------------------------------------------------------
       MEDIA QUERY CHANGES
    ----------------------------------------------------------------------- */

    finePointerQuery.addEventListener(
      "change",
      updateCursorAvailability
    );

    reducedMotionQuery.addEventListener(
      "change",
      updateCursorAvailability
    );

    /* -----------------------------------------------------------------------
       CLEANUP
    ----------------------------------------------------------------------- */

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

      window.removeEventListener(
        "pointercancel",
        handlePointerCancel
      );

      finePointerQuery.removeEventListener(
        "change",
        updateCursorAvailability
      );

      reducedMotionQuery.removeEventListener(
        "change",
        updateCursorAvailability
      );

      themeObserver.disconnect();

      root.classList.remove(
        "signal-cursor-active"
      );
    };
  }, [mouseX, mouseY]);

  /* =========================================================================
     NOTHING ON TOUCH / REDUCED MOTION
  ========================================================================= */

  if (!enabled) {
    return null;
  }

  /* =========================================================================
     DIMENSIONS
  ========================================================================= */

  const arrowWidth =
    hasLabel || isSocial
      ? 30
      : 25;

  const arrowHeight =
    hasLabel || isSocial
      ? 36
      : 30;

  return (
    <>
      {/* =====================================================================
          TRAILING ACCENT
      ===================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          signal-cursor-layer
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99996]
        "
        style={{
          x: trailX,
          y: trailY,
          translateX: "-2px",
          translateY: "-1px",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            width: hasLabel
              ? 25
              : 16,

            opacity: hasLabel
              ? 0.85
              : 0.5,

            scaleX: pressed
              ? 0.75
              : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
          className="
            h-[2px]
            origin-left
            rounded-full
          "
          style={{
            backgroundColor:
              accentColor,

            transform:
              "translate(-7px, 8px) rotate(-45deg)",

            boxShadow:
              `0 0 8px ${accentColor}55`,
          }}
        />
      </motion.div>

      {/* =====================================================================
          MAIN CURSOR
      ===================================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          signal-cursor-layer
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99999]
        "
        style={{
          x,
          y,
          translateX: "-2px",
          translateY: "-2px",
          willChange: "transform",
        }}
      >
        {/* ===================================================================
            ARROW
        =================================================================== */}

        <motion.div
          animate={{
            scale: pressed
              ? 0.84
              : hasLabel || isSocial
                ? 1.08
                : 1,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 650,
                  damping: 30,
                  mass: 0.12,
                }
          }
          className="
            relative
            flex
            items-start
            justify-start
          "
          style={{
            width: arrowWidth,
            height: arrowHeight,
          }}
        >
          <svg
            width={arrowWidth}
            height={arrowHeight}
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              overflow: "visible",
              filter:
                `drop-shadow(0 2px 4px ${arrowColor}45)`,
            }}
          >
            {/* MAIN ARROW */}

            <path
              d="
                M3 2
                L27 17
                L17.5 18.8
                L23 30
                L18.8 32
                L13.2 20.5
                L6.2 27
                Z
              "
              fill={arrowColor}
            />

            {/* INTERNAL CUT */}

            <path
              d="
                M7.1 7
                L21.5 16.1
                L15.3 17.2
                L18.9 24.7
                L16.7 25.8
                L12.7 17.9
                L8.3 21.8
                Z
              "
              fill={
                isDark
                  ? "#07131C"
                  : "#FFFFFF"
              }
            />

            {/* ACCENT EDGE */}

            <path
              d="
                M3 2
                L27 17
                L17.5 18.8
              "
              stroke={accentColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
          </svg>
        </motion.div>

        {/* ===================================================================
            INTERACTION LABEL
        =================================================================== */}

        <AnimatePresence
          mode="wait"
          initial={false}
        >
          {(hasLabel || isSocial) && (
            <motion.div
              key={
                label || "social"
              }
              initial={{
                opacity: 0,
                x: -5,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                x: 12,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -4,
                scale: 0.94,
              }}
              transition={{
                duration:
                  reducedMotion
                    ? 0
                    : 0.18,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                absolute
                left-full
                top-[4px]
                whitespace-nowrap
                rounded-md
                border
                px-3
                py-2
                backdrop-blur-xl
              "
              style={{
                backgroundColor:
                  labelBg,

                color:
                  labelColor,

                borderColor:
                  `${labelBorder}45`,

                boxShadow: `
                  0 8px 25px rgba(0,0,0,0.10),
                  0 0 0 1px ${labelBorder}10
                `,
              }}
            >
              <span
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                "
              >
                <span
                  className="
                    block
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      accentColor,

                    boxShadow:
                      `0 0 7px ${accentColor}80`,
                  }}
                />

                <span>
                  {label ||
                    "Social"}
                </span>

                <span
                  className="
                    text-[12px]
                    font-normal
                  "
                  style={{
                    color:
                      accentColor,
                  }}
                >
                  ↗
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* =====================================================================
          SECONDARY ACCENT
      ===================================================================== */}

      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="
            signal-cursor-layer
            pointer-events-none
            fixed
            left-0
            top-0
            z-[99997]
          "
          style={{
            x,
            y,
            translateX: 18,
            translateY: 19,
            willChange: "transform",
          }}
        >
          <motion.span
            animate={{
              opacity: hasLabel
                ? 1
                : 0.55,

              scale: pressed
                ? 0.7
                : 1,
            }}
            transition={{
              duration: 0.15,
            }}
            className="
              block
              h-1
              w-1
              rotate-45
            "
            style={{
              backgroundColor:
                accentColor,

              boxShadow:
                `0 0 8px ${accentColor}88`,
            }}
          />
        </motion.div>
      )}
    </>
  );
}