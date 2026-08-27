import { useEffect, useRef } from "react";

/* =========================================================
   LIGHTWEIGHT BIDIRECTIONAL SCROLL REVEAL

   Optimized for:
   - Fast scrolling
   - Desktop
   - Laptop
   - iPad
   - Tablet
   - Mobile
   - Bidirectional reveal
   - Reduced motion
   - No React state updates
========================================================= */

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  amount = 0.01,
  once = false,
  as: Component = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reducedMotion) {
      element.dataset.revealVisible = "true";
      return undefined;
    }

    /* =====================================================
       DIRECTION
    ===================================================== */

    const directions = {
      up: {
        x: "0px",
        y: "22px",
        scale: "0.995",
      },

      down: {
        x: "0px",
        y: "-22px",
        scale: "0.995",
      },

      left: {
        x: "26px",
        y: "0px",
        scale: "0.995",
      },

      right: {
        x: "-26px",
        y: "0px",
        scale: "0.995",
      },

      fade: {
        x: "0px",
        y: "0px",
        scale: "1",
      },

      scale: {
        x: "0px",
        y: "8px",
        scale: "0.96",
      },
    };

    const selected =
      directions[direction] || directions.up;

    /* =====================================================
       CSS VARIABLES
    ===================================================== */

    element.style.setProperty(
      "--reveal-x",
      selected.x
    );

    element.style.setProperty(
      "--reveal-y",
      selected.y
    );

    element.style.setProperty(
      "--reveal-scale",
      selected.scale
    );

    element.style.setProperty(
      "--reveal-delay",
      `${delay}s`
    );

    element.style.setProperty(
      "--reveal-duration",
      `${duration}s`
    );

    /* =====================================================
       INITIAL STATE
    ===================================================== */

    element.dataset.revealVisible = "false";

    /* =====================================================
       INTERSECTION OBSERVER

       IMPORTANT:
       We don't use a huge 40% + 40% viewport area.

       A moderate preload area gives fast-scroll support
       without keeping many elements "active" at once.
    ===================================================== */

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target !== element) {
            continue;
          }

          if (entry.isIntersecting) {
            element.dataset.revealVisible = "true";

            if (once) {
              observer.unobserve(element);
            }

            break;
          }

          if (!once) {
            element.dataset.revealVisible = "false";
          }

          break;
        }
      },
      {
        root: null,

        /*
         * Preload slightly before entering viewport.
         * Enough for fast scrolling without activating
         * too many elements simultaneously.
         */
        rootMargin: "25% 0px 25% 0px",

        /*
         * Keep your very small amount behavior.
         */
        threshold: Math.max(
          0,
          Math.min(1, amount)
        ),
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    amount,
    delay,
    direction,
    duration,
    once,
  ]);

  return (
    <Component
      ref={ref}
      data-scroll-reveal="true"
      data-reveal-direction={direction}
      data-reveal-visible="false"
      className={className}
    >
      {children}
    </Component>
  );
}