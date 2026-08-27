import {
  useEffect,
  useRef,
} from "react";

/* =========================================================
   LIGHTWEIGHT BIDIRECTIONAL SCROLL REVEAL

   Features:
   - Up
   - Down
   - Left
   - Right
   - Fade
   - Scale
   - Bidirectional
   - Fast-scroll friendly
   - Desktop
   - Laptop
   - Tablet
   - Mobile
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

    /*
     * Reduced motion.
     */
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      element.dataset.revealVisible = "true";

      return undefined;
    }

    /*
     * Configure direction as CSS variables.
     */
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
      directions[direction] ||
      directions.up;

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

    /*
     * Start hidden.
     */
    element.dataset.revealVisible =
      "false";

    /*
     * =======================================================
     * INTERSECTION OBSERVER
     * =======================================================
     *
     * Large rootMargin means the animation is triggered
     * before the element is actually visible.
     *
     * This is especially important for FAST SCROLL.
     */
    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry) {
            return;
          }

          if (entry.isIntersecting) {
            element.dataset.revealVisible =
              "true";

            if (once) {
              observer.unobserve(
                element
              );
            }

            return;
          }

          /*
           * Bidirectional mode.
           */
          if (!once) {
            element.dataset.revealVisible =
              "false";
          }
        },
        {
          root: null,

          /*
           * Detect before/after the viewport.
           */
          rootMargin:
            "40% 0px 40% 0px",

          /*
           * Very small threshold is intentional.
           * This prevents fast-scroll jumps from skipping
           * the trigger.
           */
          threshold: Math.max(
            0,
            Math.min(
              1,
              amount
            )
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