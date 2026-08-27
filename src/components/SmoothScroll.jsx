import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
  enabled = true,
}) {
  const lenisRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const location = useLocation();

  /* =========================================================
     LENIS INITIALIZATION
  ========================================================= */

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    if (typeof window === "undefined") {
      return undefined;
    }

    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion = window
      .matchMedia(
        "(prefers-reduced-motion: reduce)"
      )
      .matches;

    if (reducedMotion) {
      return undefined;
    }

    /* =====================================================
       FINE POINTER ONLY

       Desktop / laptop:
       Lenis smooth scrolling.

       Touch / iPad / mobile:
       Keep native browser scrolling.

       This is intentional.
    ===================================================== */

    const finePointer = window
      .matchMedia("(pointer: fine)")
      .matches;

    if (!finePointer) {
      return undefined;
    }

    /* =====================================================
       HISTORY
    ===================================================== */

    const previousRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration =
        "manual";
    }

    /* =====================================================
       LENIS

       KEEP YOUR CURRENT FEEL
       - lerp
       - wheelMultiplier
       - smoothWheel
       - no touch interpolation
    ===================================================== */

    const lenis = new Lenis({
      lerp: 0.2,

      smoothWheel: true,

      wheelMultiplier: 0.88,

      syncTouch: false,

      touchMultiplier: 1,

      anchors: true,

      stopInertiaOnNavigate: true,

      autoRaf: true,

      /*
       * ResizeObserver below handles resize.
       */
      autoResize: false,
    });

    lenisRef.current = lenis;

    /* =====================================================
       RESIZE OBSERVER

       Much better than repeatedly scanning all images.
    ===================================================== */

    let resizeFrame = 0;

    const resizeLenis = () => {
      if (!lenisRef.current) {
        return;
      }

      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }

        resizeFrame = 0;
      });
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current =
        new ResizeObserver(() => {
          resizeLenis();
        });

      resizeObserverRef.current.observe(
        document.documentElement
      );
    } else {
      window.addEventListener(
        "resize",
        resizeLenis,
        {
          passive: true,
        }
      );
    }

    /* =====================================================
       INITIAL SIZE
    ===================================================== */

    const initialFrame =
      requestAnimationFrame(() => {
        lenis.resize();
      });

    /* =====================================================
       FONTS
    ===================================================== */

    let disposed = false;

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed && lenisRef.current) {
          resizeLenis();
        }
      });
    }

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      disposed = true;

      cancelAnimationFrame(initialFrame);

      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      } else {
        window.removeEventListener(
          "resize",
          resizeLenis
        );
      }

      if (lenisRef.current) {
        lenisRef.current.stop();
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      if (
        previousRestoration !== null &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration =
          previousRestoration;
      }
    };
  }, [enabled]);

  /* =========================================================
     ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    /* =====================================================
       DESKTOP / LENIS
    ===================================================== */

    if (lenisRef.current) {
      const lenis = lenisRef.current;

      /*
       * Stop current inertia.
       */
      lenis.stop();

      /*
       * Immediately reset page position.
       */
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });

      /*
       * Restart on next frame.
       */
      const frame =
        requestAnimationFrame(() => {
          if (!lenisRef.current) {
            return;
          }

          lenisRef.current.start();
          lenisRef.current.resize();
        });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    /* =====================================================
       MOBILE / TABLET / IPAD
       Native scrolling.
    ===================================================== */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [location.pathname]);

  return children;
}