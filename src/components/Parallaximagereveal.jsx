import { useCallback, useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* =========================================================================
   PARALLAX IMAGE REVEAL

   Drop-in replacement for a plain <img>. Pairs with your existing
   TiltCard (tilt/spotlight stays untouched) and adds a second,
   independent layer of interaction ON TOP of the image itself:

     1. Depth parallax   — the image + a "ghost" duplicate drift at
                            different rates on mouse move, like two
                            planes of glass at different depths.
     2. Chromatic split  — on hover, the ghost layer separates into
                            cyan / orange channels (your brand accents)
                            for a brief lens-glitch moment, then settles.
     3. HUD scan reticle — a cursor-locked crosshair + coordinate
                            readout, awwwards-style "system is tracking
                            you" detail.
     4. Radial reveal    — a soft iris/mask that opens from the cursor
                            on enter, closes on leave.

   Nothing here replaces your existing hover states (grayscale filter,
   spotlight, corner brackets, tag, "View" badge) — it layers above
   them. Use it INSIDE TiltCard exactly where the current <img> sits:

     <TiltCard ...>
       <ParallaxImageReveal
         src={images[service.id]}
         alt={service.name}
         eager={index < 2}
       />
       ...the rest of your existing overlay JSX stays as-is...
     </TiltCard>

=========================================================================== */

const SPRING = {
  stiffness: 120,
  damping: 18,
  mass: 0.4,
};

const TIGHT_SPRING = {
  stiffness: 260,
  damping: 24,
  mass: 0.3,
};

export default function ParallaxImageReveal({
  src,
  alt,
  className = "",
  imageClassName = "",
  eager = false,
}) {
  const boundsRef = useRef(null);
  const wrapRef = useRef(null);

  /* ---------------------------------------------------------------------
     RAW POINTER (0..1 within the image bounds)
  --------------------------------------------------------------------- */

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const sActive = useSpring(active, TIGHT_SPRING);

  /* ---------------------------------------------------------------------
     DEPTH LAYERS
     Base image: subtle drift. Ghost layer: drifts ~2.4x further,
     reads as "further back" — classic two-plane parallax.
  --------------------------------------------------------------------- */

  const baseX = useTransform(sx, [0, 1], [-10, 10]);
  const baseY = useTransform(sy, [0, 1], [-8, 8]);

  const ghostX = useTransform(sx, [0, 1], [-24, 24]);
  const ghostY = useTransform(sy, [0, 1], [-18, 18]);

  const baseScale = useTransform(sActive, [0, 1], [1, 1.06]);
  const ghostScale = useTransform(sActive, [0, 1], [1.02, 1.14]);

  /* ---------------------------------------------------------------------
     CHROMATIC SPLIT
     Two colored ghost copies nudge apart from center on hover-in,
     then relax back toward alignment — a quick "lens breathing" beat
     rather than a constant glitch.
  --------------------------------------------------------------------- */

  const splitAmount = useTransform(sActive, [0, 1], [0, 3.5]);

  const cyanX = useTransform(
    [ghostX, splitAmount],
    ([gx, s]) => gx - s
  );

  const orangeX = useTransform(
    [ghostX, splitAmount],
    ([gx, s]) => gx + s
  );

  /* ---------------------------------------------------------------------
     REVEAL IRIS
  --------------------------------------------------------------------- */

  const irisX = useTransform(px, [0, 1], ["0%", "100%"]);
  const irisY = useTransform(py, [0, 1], ["0%", "100%"]);

  const irisMask = useTransform(
    [irisX, irisY, sActive],
    ([x, y, a]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(0,0,0,${a}) 0%, rgba(0,0,0,${
        a * 0.35
      }) 45%, rgba(0,0,0,0) 78%)`
  );

  /* ---------------------------------------------------------------------
     HUD READOUT TEXT (coordinates, cheap but reads as "instrumented")
  --------------------------------------------------------------------- */

  const coordX = useTransform(px, (v) => Math.round(v * 100));
  const coordY = useTransform(py, (v) => Math.round(v * 100));

  /* ---------------------------------------------------------------------
     POINTER HANDLERS
  --------------------------------------------------------------------- */

  const updateBounds = useCallback(() => {
    if (!wrapRef.current) return;
    boundsRef.current = wrapRef.current.getBoundingClientRect();
  }, []);

  const handleEnter = useCallback(
    (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      updateBounds();
      active.set(1);
    },
    [active, updateBounds]
  );

  const handleMove = useCallback(
    (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const rect = boundsRef.current;
      if (!rect || rect.width <= 0 || rect.height <= 0) return;

      const x = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
      );

      const y = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height)
      );

      px.set(x);
      py.set(y);
    },
    [px, py]
  );

  const handleLeave = useCallback(() => {
    active.set(0);
    px.set(0.5);
    py.set(0.5);
  }, [active, px, py]);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative h-full w-full overflow-hidden [transform-style:preserve-3d] ${className}`}
    >
      {/* =================================================================
          GHOST — CYAN CHANNEL
      ================================================================== */}

      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{
          x: cyanX,
          y: ghostY,
          scale: ghostScale,
          opacity: sActive,
          mixBlendMode: "screen",
          filter:
            "sepia(1) hue-rotate(150deg) saturate(4) brightness(0.9)",
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* =================================================================
          GHOST — ORANGE CHANNEL
      ================================================================== */}

      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{
          x: orangeX,
          y: ghostY,
          scale: ghostScale,
          opacity: sActive,
          mixBlendMode: "screen",
          filter:
            "sepia(1) hue-rotate(-10deg) saturate(4) brightness(0.85)",
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* =================================================================
          BASE IMAGE (the real one — everything above only ADDS light)
      ================================================================== */}

      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
        style={{
          x: baseX,
          y: baseY,
          scale: baseScale,
        }}
        className={`relative z-10 block h-full w-full select-none object-cover ${imageClassName}`}
      />

      {/* =================================================================
          IRIS REVEAL — darkens the frame, cursor "burns" it back open
      ================================================================== */}

      <motion.div
        aria-hidden="true"
        style={{ background: irisMask }}
        className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply"
      />

      {/* =================================================================
          HUD CROSSHAIR — follows the cursor inside the frame
      ================================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          left: irisX,
          top: irisY,
          opacity: sActive,
        }}
        className="
          pointer-events-none
          absolute
          z-30
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <div className="relative h-9 w-9">
          <span className="absolute inset-0 rounded-full border border-[#00A9E0]/60" />
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-[#00A9E0]/70" />
          <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-[#00A9E0]/70" />
          <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#00A9E0]/70" />
          <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#00A9E0]/70" />
        </div>
      </motion.div>

      {/* =================================================================
          HUD READOUT — coordinate label, bottom-right, brand mono type
      ================================================================== */}

      <motion.div
        aria-hidden="true"
        style={{ opacity: sActive }}
        className="
          pointer-events-none
          absolute
          bottom-4
          right-4
          z-40
          rounded-md
          border
          border-white/15
          bg-[#031B2E]/70
          px-2
          py-1
          font-mono
          text-[9px]
          tracking-[0.14em]
          text-[#00A9E0]/90
          backdrop-blur-sm
        "
      >
        <motion.span>{coordX}</motion.span>
        <span className="mx-1 opacity-50">/</span>
        <motion.span>{coordY}</motion.span>
      </motion.div>
    </div>
  );
}