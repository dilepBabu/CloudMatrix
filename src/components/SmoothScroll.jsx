import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
  enabled = true,
}) {
  const lenisRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return undefined;

    if (typeof window === "undefined") {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    /*
     * Lenis is used on fine-pointer devices only.
     * Mobile/tablet keeps native scrolling.
     */
    const finePointer = window.matchMedia(
      "(pointer: fine)"
    ).matches;

    if (!finePointer) {
      return undefined;
    }

    const previousRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    /*
     * =======================================================
     * LENIS
     * =======================================================
     *
     * lerp is intentionally higher than before so fast
     * wheel/trackpad movement catches up quickly.
     */
    const lenis = new Lenis({
      lerp: 0.2,

      smoothWheel: true,

      wheelMultiplier: 0.88,

      /*
       * Do not add touch interpolation.
       */
      syncTouch: false,

      touchMultiplier: 1,

      anchors: true,

      /*
       * Prevent old page inertia from continuing during
       * navigation.
       */
      stopInertiaOnNavigate: true,

      /*
       * Lenis owns its own animation loop.
       */
      autoRaf: true,

      /*
       * We manually resize only when required.
       */
      autoResize: false,
    });

    lenisRef.current = lenis;

    /* =====================================================
       RESIZE
    ===================================================== */

    const resizeLenis = () => {
      if (!lenisRef.current) {
        return;
      }

      lenisRef.current.resize();
    };

    const scheduleResize = () => {
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(
          resizeTimerRef.current
        );
      }

      resizeTimerRef.current =
        window.setTimeout(() => {
          resizeLenis();
          resizeTimerRef.current = null;
        }, 100);
    };

    window.addEventListener(
      "resize",
      scheduleResize,
      {
        passive: true,
      }
    );

    const initialResizeTimer =
      window.setTimeout(() => {
        resizeLenis();
      }, 100);

    let disposed = false;

    /* =====================================================
       FONTS
    ===================================================== */

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          resizeLenis();
        }
      });
    }

    /* =====================================================
       IMAGES
    ===================================================== */

    const images = Array.from(
      document.querySelectorAll("img")
    );

    const handleImageLoad = () => {
      scheduleResize();
    };

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener(
          "load",
          handleImageLoad,
          {
            once: true,
            passive: true,
          }
        );
      }
    });

    const settleResizeTimer =
      window.setTimeout(() => {
        resizeLenis();
      }, 700);

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      disposed = true;

      window.removeEventListener(
        "resize",
        scheduleResize
      );

      images.forEach((image) => {
        image.removeEventListener(
          "load",
          handleImageLoad
        );
      });

      window.clearTimeout(
        initialResizeTimer
      );

      window.clearTimeout(
        settleResizeTimer
      );

      if (resizeTimerRef.current !== null) {
        window.clearTimeout(
          resizeTimerRef.current
        );

        resizeTimerRef.current = null;
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

  /* =======================================================
     ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    /*
     * Desktop / Lenis
     */
    if (lenisRef.current) {
      const lenis = lenisRef.current;

      /*
       * Kill previous inertia.
       */
      lenis.stop();

      /*
       * New page starts at top immediately.
       */
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });

      const restartFrame =
        window.requestAnimationFrame(() => {
          if (!lenisRef.current) {
            return;
          }

          lenisRef.current.start();
          lenisRef.current.resize();
        });

      return () => {
        window.cancelAnimationFrame(
          restartFrame
        );
      };
    }

    /*
     * Mobile/tablet native scroll.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [location.pathname]);

  return children;
}