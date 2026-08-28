import { useEffect, useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

import { asserts } from "../assets/asserts.mjs";

import {
  company,
  heroStats,
  waLink,
} from "../data/content";

import MagneticButton from "../components/MagneticButton";

/* =========================================================================
   HERO IMAGE
=========================================================================== */

const HERO_IMAGE = `${asserts.cloud1}`;

/* =========================================================================
   EASING
=========================================================================== */

const SMOOTH_EASE = [
  0.22,
  1,
  0.36,
  1,
];

/* =========================================================================
   PERFORMANCE MODE

   Full effects are reserved for higher-capability desktop hardware.
   Laptops, tablets, iPad and mobile use the same visual direction but
   remove the expensive continuous 3D/blur/parallax layers.
=========================================================================== */

function usePerformanceMode() {
  const [mode, setMode] = useState("touch");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const getMode = () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const width = window.innerWidth;
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 8;

      if (!fine) return "touch";

      if (width >= 1440 && cores >= 6 && memory >= 6) {
        return "full";
      }

      return "light";
    };

    const update = () => setMode(getMode());

    update();

    window.addEventListener("resize", update, { passive: true });

    const pointerQuery = window.matchMedia("(pointer: fine)");
    pointerQuery.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("resize", update);
      pointerQuery.removeEventListener?.("change", update);
    };
  }, []);

  return mode;
}

/* =========================================================================
   CONTENT ANIMATION
=========================================================================== */

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: SMOOTH_EASE,
    },
  },
};

/* =========================================================================
   HEADLINE
=========================================================================== */

const headlineContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.18,
    },
  },
};

const wordVariant = {
  hidden: {
    opacity: 0,
    y: "70%",
  },

  show: {
    opacity: 1,
    y: "0%",

    transition: {
      duration: 0.55,
      ease: SMOOTH_EASE,
    },
  },
};

/* =========================================================================
   ANIMATED WORDS
=========================================================================== */

function AnimatedWords({
  text,
  className = "",
}) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={headlineContainer}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="
            mr-[0.28em]
            inline-block
            overflow-hidden
            pb-1
            align-bottom
          "
        >
          <motion.span
            variants={wordVariant}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* =========================================================================
   HERO BACKGROUND
=========================================================================== */

function HeroBackground({
  scrollYProgress,
  performance = "light",
}) {
  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothMouseX =
    useSpring(mouseX, {
      stiffness: 45,
      damping: 22,
      mass: 0.5,
    });

  const smoothMouseY =
    useSpring(mouseY, {
      stiffness: 45,
      damping: 22,
      mass: 0.5,
    });

  /* -----------------------------------------------------------------------
     PARALLAX
  ----------------------------------------------------------------------- */

  const orb1X =
    useTransform(
      smoothMouseX,
      [-0.5, 0.5],
      [-35, 35]
    );

  const orb1Y =
    useTransform(
      smoothMouseY,
      [-0.5, 0.5],
      [-25, 25]
    );

  const orb2X =
    useTransform(
      smoothMouseX,
      [-0.5, 0.5],
      [25, -25]
    );

  const orb2Y =
    useTransform(
      smoothMouseY,
      [-0.5, 0.5],
      [20, -20]
    );

  const centerX =
    useTransform(
      smoothMouseX,
      [-0.5, 0.5],
      [-18, 18]
    );

  const centerY =
    useTransform(
      smoothMouseY,
      [-0.5, 0.5],
      [-18, 18]
    );

  /* -----------------------------------------------------------------------
     SCROLL
  ----------------------------------------------------------------------- */

  const gridY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 35]
    );

  const atmosphereY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, -45]
    );

  /* -----------------------------------------------------------------------
     LIGHTWEIGHT BACKGROUND

     The scroll-linked/pointer-driven layers remain only on full mode.
     This prevents dozens of animated blur/compositing layers from
     competing with the scroll frame on laptops and touch devices.
  ----------------------------------------------------------------------- */

  if (performance !== "full") {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden bg-[#031B2E]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[#031B2E]" />

        <div
          className="pointer-events-none absolute inset-[-10%] hero-tech-grid opacity-[0.12]"
        />

        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0066B3]/10 blur-[55px]"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-[#00A9E0]/8 blur-[50px]"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#031B2E] via-[#031B2E]/35 to-transparent"
        />
      </div>
    );
  }

  /* -----------------------------------------------------------------------
     POINTER
  ----------------------------------------------------------------------- */

  const handlePointerMove = (
    event
  ) => {
    if (
      event.pointerType &&
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return;
    }

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(
      Math.max(
        -0.5,
        Math.min(0.5, x)
      )
    );

    mouseY.set(
      Math.max(
        -0.5,
        Math.min(0.5, y)
      )
    );
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className="
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >
      {/* BASE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#031B2E]
        "
      />

      {/* BLUE ORB */}

      <motion.div
        style={{
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [
            1,
            1.08,
            1,
          ],

          opacity: [
            0.16,
            0.24,
            0.16,
          ],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[620px]
          w-[620px]
          rounded-full
          bg-[#0066B3]/20
          blur-[90px]
          transform-gpu
        "
      />

      {/* CYAN ORB */}

      <motion.div
        style={{
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [
            1,
            1.06,
            0.98,
            1,
          ],

          opacity: [
            0.12,
            0.2,
            0.12,
            0.12,
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-[200px]
          -left-[180px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#00A9E0]/12
          blur-[90px]
          transform-gpu
        "
      />

      {/* CENTER LIGHT */}

      <motion.div
        style={{
          x: centerX,
          y: centerY,
        }}
        animate={{
          scale: [
            0.95,
            1.08,
            0.95,
          ],

          opacity: [
            0.08,
            0.18,
            0.08,
          ],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-[28%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#00A9E0]/10
          blur-[80px]
          transform-gpu
        "
      />

      {/* HORIZONTAL LIGHT */}

      <motion.div
        animate={{
          x: [
            "-20%",
            "20%",
            "-20%",
          ],

          opacity: [
            0.04,
            0.11,
            0.04,
          ],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-[20%]
          top-[48%]
          h-[2px]
          w-[140%]
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]/30
          to-transparent
          blur-[5px]
        "
      />

      {/* DIAGONAL BEAM */}

      <motion.div
        animate={{
          x: [
            "-120%",
            "180%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatDelay: 7,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-[30%]
          -top-[60%]
          h-[220%]
          w-[100px]
          rotate-[24deg]
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]/[0.045]
          to-transparent
          blur-[8px]
        "
      />

      {/* SECOND BEAM */}

      <motion.div
        animate={{
          x: [
            "120%",
            "-180%",
          ],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-[30%]
          -top-[70%]
          h-[230%]
          w-[70px]
          rotate-[-28deg]
          bg-gradient-to-r
          from-transparent
          via-[#0066B3]/[0.05]
          to-transparent
          blur-[8px]
        "
      />

      {/* GRID */}

      <motion.div
        style={{
          y: gridY,
        }}
        className="
          pointer-events-none
          hero-tech-grid
          absolute
          inset-[-10%]
          opacity-[0.16]
        "
      />

      {/* PARTICLES */}

      <motion.span
        animate={{
          x: [
            0,
            45,
            10,
            0,
          ],

          y: [
            0,
            -35,
            15,
            0,
          ],

          opacity: [
            0.15,
            0.5,
            0.2,
            0.15,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[12%]
          top-[22%]
          h-1
          w-1
          rounded-full
          bg-[#00A9E0]
          shadow-[0_0_14px_#00A9E0]
        "
      />

      <motion.span
        animate={{
          x: [
            0,
            -35,
            20,
            0,
          ],

          y: [
            0,
            40,
            -15,
            0,
          ],

          opacity: [
            0.1,
            0.45,
            0.18,
            0.1,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[17%]
          top-[27%]
          h-1.5
          w-1.5
          rounded-full
          bg-[#0066B3]
          shadow-[0_0_16px_#0066B3]
        "
      />

      <motion.span
        animate={{
          x: [
            0,
            25,
            -15,
            0,
          ],

          y: [
            0,
            -25,
            30,
            0,
          ],

          opacity: [
            0.08,
            0.35,
            0.12,
            0.08,
          ],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          left-[48%]
          h-1
          w-1
          rounded-full
          bg-[#00A9E0]
          shadow-[0_0_12px_#00A9E0]
        "
      />

      <motion.span
        animate={{
          x: [
            0,
            -20,
            15,
            0,
          ],

          y: [
            0,
            30,
            -20,
            0,
          ],

          opacity: [
            0.1,
            0.3,
            0.12,
            0.1,
          ],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[22%]
          right-[8%]
          h-1
          w-1
          rounded-full
          bg-[#00A878]
          shadow-[0_0_12px_#00A878]
        "
      />

      {/* DATA LINES */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[18%]
          h-px
          w-[18%]
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]/20
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[6%]
          top-[70%]
          h-px
          w-[20%]
          bg-gradient-to-r
          from-transparent
          via-[#0066B3]/20
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[13%]
          left-[28%]
          h-px
          w-[14%]
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]/15
          to-transparent
        "
      />

      {/* VIGNETTE */}

      <motion.div
        style={{
          y: atmosphereY,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,27,46,0.18)_72%,rgba(3,27,46,0.55)_100%)]
        "
      />

      {/* BOTTOM FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[25%]
          bg-gradient-to-t
          from-[#031B2E]
          via-[#031B2E]/30
          to-transparent
        "
      />
    </div>
  );
}

/* =========================================================================
   HERO IMAGE
=========================================================================== */

function AnimatedHeroImage({
  scrollYProgress,
  performance = "light",
}) {
  const imageRef =
    useRef(null);

  const boundsRef =
    useRef(null);

  const pointerX =
    useMotionValue(0);

  const pointerY =
    useMotionValue(0);

  const pointerActive =
    useMotionValue(0);

  const smoothX =
    useSpring(pointerX, {
      stiffness: 110,
      damping: 25,
      mass: 0.35,
    });

  const smoothY =
    useSpring(pointerY, {
      stiffness: 110,
      damping: 25,
      mass: 0.35,
    });

  const smoothActive =
    useSpring(pointerActive, {
      stiffness: 190,
      damping: 28,
      mass: 0.25,
    });

  /* -----------------------------------------------------------------------
     ROTATION
  ----------------------------------------------------------------------- */

  const rotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-7, 7]
    );

  const rotateX =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [7, -7]
    );

  const rotateZ =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-0.45, 0.45]
    );

  /* -----------------------------------------------------------------------
     IMAGE MOVEMENT
  ----------------------------------------------------------------------- */

  const imageX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-14, 14]
    );

  const imageY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [10, -10]
    );

  const imageRotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-2, 2]
    );

  /* -----------------------------------------------------------------------
     DEPTH
  ----------------------------------------------------------------------- */

  const depthX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-18, 18]
    );

  const depthY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [12, -12]
    );

  /* -----------------------------------------------------------------------
     GLOW
  ----------------------------------------------------------------------- */

  const glowX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      ["-10%", "10%"]
    );

  const glowY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      ["10%", "-10%"]
    );

  /* -----------------------------------------------------------------------
     SCALE
  ----------------------------------------------------------------------- */

  const imageScale =
    useTransform(
      smoothActive,
      [0, 1],
      [1, 1.035]
    );

  const cardScale =
    useTransform(
      smoothActive,
      [0, 1],
      [1, 1.012]
    );

  /* -----------------------------------------------------------------------
     ENERGY
  ----------------------------------------------------------------------- */

  const energyX =
    useSpring(
      useTransform(
        smoothX,
        [-0.5, 0.5],
        [-35, 35]
      ),
      {
        stiffness: 80,
        damping: 18,
        mass: 0.4,
      }
    );

  const energyY =
    useSpring(
      useTransform(
        smoothY,
        [-0.5, 0.5],
        [35, -35]
      ),
      {
        stiffness: 80,
        damping: 18,
        mass: 0.4,
      }
    );

  const energyScale =
    useTransform(
      smoothActive,
      [0, 1],
      [0.92, 1.08]
    );

  const pulseOpacity =
    useTransform(
      smoothActive,
      [0, 1],
      [0.08, 0.22]
    );

  const inverseEnergyX =
    useTransform(
      energyX,
      (value) => value * -0.55
    );

  const inverseEnergyY =
    useTransform(
      energyY,
      (value) => value * -0.55
    );

  const coreX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-20, 20]
    );

  const coreY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [20, -20]
    );

  /* -----------------------------------------------------------------------
     GHOST
  ----------------------------------------------------------------------- */

  const ghostX =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-24, 24]
    );

  const ghostY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [-18, 18]
    );

  const splitAmount =
    useTransform(
      smoothActive,
      [0, 1],
      [0, 4]
    );

  const cyanGhostX =
    useTransform(
      [ghostX, splitAmount],
      ([gx, s]) => gx - s
    );

  const orangeGhostX =
    useTransform(
      [ghostX, splitAmount],
      ([gx, s]) => gx + s
    );

  /* -----------------------------------------------------------------------
     HUD
  ----------------------------------------------------------------------- */

  const hudLeft =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      ["0%", "100%"]
    );

  const hudTop =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      ["0%", "100%"]
    );

  const hudCoordX =
    useTransform(
      smoothX,
      (value) =>
        Math.round(
          (value + 0.5) * 100
        )
    );

  const hudCoordY =
    useTransform(
      smoothY,
      (value) =>
        Math.round(
          (value + 0.5) * 100
        )
    );

  /* -----------------------------------------------------------------------
     SCROLL
  ----------------------------------------------------------------------- */

  const scrollY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 28]
    );

  /* -----------------------------------------------------------------------
     LIGHTWEIGHT IMAGE MODE
  ----------------------------------------------------------------------- */

  if (performance !== "full") {
    return (
      <div
        className="relative w-full max-w-[760px] select-none aspect-[16/10] transform-gpu"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[8%] rounded-[36px] bg-[#0066B3]/12 blur-[35px]"
        />

        <motion.div
          style={{ y: performance === "light" ? scrollY : 0 }}
          className="relative z-10 h-full w-full overflow-hidden rounded-[30px] border border-[#00A9E0]/20 bg-[#031B2E] shadow-[0_25px_65px_rgba(0,0,0,0.30)] transform-gpu"
        >
          <img
            src={HERO_IMAGE}
            alt="Cloud Matrix Technologies AI Cloud Solutions"
            draggable="false"
            loading="eager"
            decoding="async"

            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(3,27,46,0.04),transparent_38%,rgba(0,102,179,0.10)_72%,rgba(3,27,46,0.30))]"
          />
        </motion.div>
      </div>
    );
  }

  /* -----------------------------------------------------------------------
     POINTER MOVE
  ----------------------------------------------------------------------- */

  const updatePointer = (
    event
  ) => {
    if (
      event.pointerType &&
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      boundsRef.current;

    if (
      !rect ||
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return;
    }

    const nextX =
      Math.max(
        -0.5,
        Math.min(
          0.5,
          (event.clientX -
            rect.left) /
            rect.width -
            0.5
        )
      );

    const nextY =
      Math.max(
        -0.5,
        Math.min(
          0.5,
          (event.clientY -
            rect.top) /
            rect.height -
            0.5
        )
      );

    pointerX.set(nextX);
    pointerY.set(nextY);
    pointerActive.set(1);
  };

  /* -----------------------------------------------------------------------
     ENTER
  ----------------------------------------------------------------------- */

  const handlePointerEnter = (
    event
  ) => {
    if (
      event.pointerType &&
      event.pointerType !== "mouse"
    ) {
      return;
    }

    if (!imageRef.current) {
      return;
    }

    boundsRef.current =
      imageRef.current.getBoundingClientRect();

    pointerActive.set(1);
  };

  /* -----------------------------------------------------------------------
     LEAVE
  ----------------------------------------------------------------------- */

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    pointerActive.set(0);

    boundsRef.current = null;
  };

  return (
    <motion.div
      ref={imageRef}
      onPointerEnter={
        handlePointerEnter
      }
      onPointerMove={
        updatePointer
      }
      onPointerLeave={
        handlePointerLeave
      }
      style={{
        y: scrollY,
        rotateX,
        rotateY,
        rotateZ,
        scale: cardScale,
        transformPerspective: 1400,
        transformStyle:
          "preserve-3d",
      }}
      className="
        relative
        w-full
        max-w-[760px]
        select-none
        aspect-[16/10]
        transform-gpu
        [perspective:1400px]
      "
    >
      {/* OUTER GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[8%]
          rounded-[36px]
          bg-[#0066B3]/16
          blur-[52px]
        "
      />

      {/* MOVING GLOW */}

      <motion.div
        aria-hidden="true"
        style={{
          x: glowX,
          y: glowY,
        }}
        className="
          pointer-events-none
          absolute
          left-[16%]
          top-[10%]
          h-[52%]
          w-[52%]
          rounded-full
          bg-[#00A9E0]/12
          blur-[44px]
          transform-gpu
        "
      />

      {/* ENERGY FIELD */}

      <motion.div
        aria-hidden="true"
        style={{
          x: energyX,
          y: energyY,
          scale: energyScale,
          opacity: pulseOpacity,
        }}
        animate={{
          rotateZ: [
            0,
            8,
            -5,
            0,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[76%]
          w-[76%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#00A9E0]/20
          [box-shadow:0_0_70px_rgba(0,169,224,0.12),inset_0_0_70px_rgba(0,169,224,0.05)]
          transform-gpu
        "
      />

      <motion.div
        aria-hidden="true"
        style={{
          x: inverseEnergyX,
          y: inverseEnergyY,
        }}
        animate={{
          rotateZ: [
            0,
            -10,
            7,
            0,
          ],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[58%]
          w-[88%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[50%]
          border
          border-[#00A878]/15
          transform-gpu
        "
      />

      {/* PULSE RINGS */}

      {[0, 1, 2].map(
        (index) => (
          <motion.div
            key={`pulse-${index}`}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-[1]
              h-[42%]
              w-[42%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#00A9E0]/20
              transform-gpu
            "
            initial={{
              scale: 0.55,
              opacity: 0,
            }}
            animate={{
              scale: [
                0.55,
                1.35,
                1.65,
              ],
              opacity: [
                0,
                0.22,
                0,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay:
                index * 1.65,
              ease: "easeOut",
            }}
          />
        )
      )}

      {/* ORBITAL PARTICLES */}

      {[
        {
          top: "8%",
          left: "50%",
          duration: 7,
        },
        {
          top: "50%",
          left: "92%",
          duration: 9,
        },
        {
          top: "90%",
          left: "50%",
          duration: 8,
        },
        {
          top: "50%",
          left: "8%",
          duration: 11,
        },
      ].map(
        (particle, index) => (
          <motion.span
            key={`energy-${index}`}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              z-[3]
              h-2
              w-2
              rounded-full
              bg-[#00A9E0]
              shadow-[0_0_18px_#00A9E0]
              transform-gpu
            "
            style={{
              top: particle.top,
              left: particle.left,
              x: energyX,
              y: energyY,
            }}
            animate={{
              scale: [
                0.6,
                1.4,
                0.6,
              ],
              opacity: [
                0.3,
                1,
                0.3,
              ],
            }}
            transition={{
              duration:
                particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay:
                index * 0.8,
            }}
          />
        )
      )}

      {/* ENERGY CORE */}

      <motion.div
        aria-hidden="true"
        style={{
          x: coreX,
          y: coreY,
        }}
        animate={{
          scale: [
            0.9,
            1.08,
            0.9,
          ],
          opacity: [
            0.18,
            0.32,
            0.18,
          ],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[2]
          h-[32%]
          w-[32%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#00A9E0]/20
          blur-[55px]
          transform-gpu
        "
      />

      {/* ==============================================================
          MAIN CARD
      ============================================================== */}

      <motion.div
        style={{
          transformStyle:
            "preserve-3d",
        }}
        className="
          relative
          z-10
          h-full
          w-full
          overflow-hidden
          rounded-[30px]
          border
          border-[#00A9E0]/25
          bg-[#031B2E]
          shadow-[0_30px_90px_rgba(0,0,0,0.42)]
          transform-gpu
        "
      >
        {/* DEPTH */}

        <motion.div
          aria-hidden="true"
          style={{
            x: depthX,
            y: depthY,
          }}
          className="
            pointer-events-none
            absolute
            -inset-[5%]
            z-0
            rounded-[34px]
            bg-[radial-gradient(circle_at_32%_28%,rgba(0,169,224,0.26),transparent_34%),radial-gradient(circle_at_76%_74%,rgba(0,102,179,0.22),transparent_34%)]
            blur-[10px]
            transform-gpu
          "
        />

        {/* MAIN IMAGE */}

        <motion.img
          src={HERO_IMAGE}
          alt="Cloud Matrix Technologies AI Cloud Solutions"
          draggable="false"
          initial={{
            opacity: 0,
            scale: 1.045,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            opacity: {
              duration: 0.7,
              ease: SMOOTH_EASE,
            },
          }}
          style={{
            x: imageX,
            y: imageY,
            scale: imageScale,
            rotateY:
              imageRotateY,
            transformStyle:
              "preserve-3d",
          }}
          className="
            pointer-events-none
            absolute
            inset-[-2.5%]
            z-10
            h-[105%]
            w-[105%]
            max-w-none
            object-cover
            object-center
            transform-gpu
          "
        />

        {/* CYAN GHOST */}

        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          draggable="false"
          style={{
            x: cyanGhostX,
            y: ghostY,
            scale: imageScale,
            opacity: smoothActive,
            mixBlendMode:
              "screen",
            filter:
              "sepia(1) hue-rotate(150deg) saturate(4) brightness(0.9)",
          }}
          className="
            pointer-events-none
            absolute
            inset-[-2.5%]
            z-[11]
            h-[105%]
            w-[105%]
            max-w-none
            object-cover
            object-center
            transform-gpu
          "
        />

        {/* ORANGE GHOST */}

        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          draggable="false"
          style={{
            x: orangeGhostX,
            y: ghostY,
            scale: imageScale,
            opacity: smoothActive,
            mixBlendMode:
              "screen",
            filter:
              "sepia(1) hue-rotate(-10deg) saturate(4) brightness(0.85)",
          }}
          className="
            pointer-events-none
            absolute
            inset-[-2.5%]
            z-[11]
            h-[105%]
            w-[105%]
            max-w-none
            object-cover
            object-center
            transform-gpu
          "
        />

        {/* SCAN */}

        <motion.div
          aria-hidden="true"
          animate={{
            y: [
              "-120%",
              "220%",
            ],
            opacity: [
              0,
              0.5,
              0,
            ],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            z-40
            h-[18%]
            bg-gradient-to-b
            from-transparent
            via-[#00A9E0]/10
            to-transparent
            blur-md
          "
        />

        {/* MICRO PARTICLES */}

        {[
          {
            left: "18%",
            top: "28%",
            size: 3,
            duration: 7,
          },
          {
            left: "72%",
            top: "22%",
            size: 2,
            duration: 9,
          },
          {
            left: "82%",
            top: "68%",
            size: 3,
            duration: 8,
          },
          {
            left: "28%",
            top: "76%",
            size: 2,
            duration: 11,
          },
        ].map(
          (particle, index) => (
            <motion.span
              key={`micro-${index}`}
              aria-hidden="true"
              animate={{
                x: [
                  0,
                  18,
                  -10,
                  0,
                ],
                y: [
                  0,
                  -15,
                  12,
                  0,
                ],
                opacity: [
                  0.15,
                  0.7,
                  0.25,
                  0.15,
                ],
                scale: [
                  1,
                  1.5,
                  0.8,
                  1,
                ],
              }}
              transition={{
                duration:
                  particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay:
                  index * 0.8,
              }}
              style={{
                left: particle.left,
                top: particle.top,
                width:
                  particle.size,
                height:
                  particle.size,
              }}
              className="
                pointer-events-none
                absolute
                z-40
                rounded-full
                bg-[#00A9E0]
                shadow-[0_0_12px_#00A9E0]
              "
            />
          )
        )}

        {/* COLOR GRADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-[linear-gradient(135deg,rgba(3,27,46,0.06),transparent_38%,rgba(0,102,179,0.14)_72%,rgba(3,27,46,0.34))]
          "
        />

        {/* ATMOSPHERE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-[radial-gradient(circle_at_75%_25%,rgba(0,169,224,0.16),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(0,168,120,0.10),transparent_24%)]
          "
        />

        {/* LIGHT */}

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [
              0.16,
              0.32,
              0.16,
            ],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-[42%]
            top-[8%]
            z-30
            h-[34%]
            w-[34%]
            rounded-full
            bg-[#00A9E0]/10
            blur-[32px]
          "
        />

        {/* SWEEP */}

        <motion.div
          aria-hidden="true"
          animate={{
            x: [
              "0%",
              "900%",
            ],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -left-[30%]
            -top-[35%]
            z-30
            h-[170%]
            w-[60px]
            rotate-[20deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.11]
            to-transparent
            blur-[5px]
          "
        />

        {/* TOP EDGE */}

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [
              0.22,
              0.62,
              0.22,
            ],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-[10%]
            right-[10%]
            top-0
            z-40
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#00A9E0]/55
            to-transparent
          "
        />

        {/* HUD */}

        <motion.div
          aria-hidden="true"
          style={{
            left: hudLeft,
            top: hudTop,
            opacity: smoothActive,
          }}
          className="
            pointer-events-none
            absolute
            z-40
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <div className="relative h-8 w-8">
            <span
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#00A9E0]/60
              "
            />

            <span
              className="
                absolute
                left-1/2
                top-0
                h-2
                w-px
                -translate-x-1/2
                bg-[#00A9E0]/70
              "
            />

            <span
              className="
                absolute
                bottom-0
                left-1/2
                h-2
                w-px
                -translate-x-1/2
                bg-[#00A9E0]/70
              "
            />

            <span
              className="
                absolute
                left-0
                top-1/2
                h-px
                w-2
                -translate-y-1/2
                bg-[#00A9E0]/70
              "
            />

            <span
              className="
                absolute
                right-0
                top-1/2
                h-px
                w-2
                -translate-y-1/2
                bg-[#00A9E0]/70
              "
            />
          </div>
        </motion.div>

        {/* COORDINATES */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: smoothActive,
          }}
          className="
            pointer-events-none
            absolute
            bottom-16
            right-5
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
          <motion.span>
            {hudCoordX}
          </motion.span>

          <span className="mx-1 opacity-50">
            /
          </span>

          <motion.span>
            {hudCoordY}
          </motion.span>
        </motion.div>

        {/* BOTTOM */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-30
            h-[30%]
            bg-gradient-to-t
            from-[#031B2E]/58
            via-[#031B2E]/12
            to-transparent
          "
        />

        {/* STATUS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.65,
            duration: 0.5,
            ease: SMOOTH_EASE,
          }}
          className="
            absolute
            bottom-5
            left-5
            z-50
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-[#031B2E]/78
            px-3.5
            py-2
            backdrop-blur-md
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#00A878]
              shadow-[0_0_10px_#00A878]
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/80
            "
          >
            AI CLOUD SYSTEM
          </span>
        </motion.div>

        {/* CORNER */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-4
            top-4
            z-50
            h-10
            w-10
            rounded-tr-xl
            border-r
            border-t
            border-[#00A9E0]/35
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-4
            left-4
            z-50
            h-10
            w-10
            rounded-bl-xl
            border-b
            border-l
            border-[#F2B632]/30
          "
        />
      </motion.div>

      {/* OUTER FRAME */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[4%]
          z-20
          rounded-[38px]
          border
          border-[#00A9E0]/10
        "
      />
    </motion.div>
  );
}

/* =========================================================================
   HERO
=========================================================================== */

export default function Hero() {
  const performance = usePerformanceMode();

  const ref = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,
    offset: [
      "start start",
      "end start",
    ],
  });

  /* -----------------------------------------------------------------------
     SCROLL MOTION
  ----------------------------------------------------------------------- */

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 20]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.82],
    [1, 0]
  );

  return (
    <section
      ref={ref}
      id="home"
      className="
        relative
        flex
        w-full
        items-center
        overflow-hidden
        bg-[#031B2E]

        /* ===============================================================
           MOBILE
        =============================================================== */
        min-h-[100svh]
        pt-24
        pb-10

        /* ===============================================================
           SMALL TABLET / IPAD MINI
        =============================================================== */
        sm:pt-28
        sm:pb-10

        /* ===============================================================
           IPAD / IPAD PRO PORTRAIT

           Keep the iPad Pro composition compact instead of allowing the
           tall 1024x1366 viewport to create a large empty area.
        =============================================================== */
        [@media(min-width:800px)_and_(orientation:portrait)]:!min-h-0
        [@media(min-width:800px)_and_(orientation:portrait)]:!h-[740px]
        [@media(min-width:800px)_and_(orientation:portrait)]:!pt-14
        [@media(min-width:800px)_and_(orientation:portrait)]:!pb-4

        /* ===============================================================
           LANDSCAPE TABLET / DESKTOP
        =============================================================== */
        lg:min-h-[100svh]
        lg:h-auto
        lg:pt-24
        lg:pb-8

        [overscroll-behavior-x:none]
      "
    >
      {/* ============================================================== 
          BACKGROUND
      ============================================================== */}

      <HeroBackground
        scrollYProgress={scrollYProgress}
        performance={performance}
      />

      {/* ============================================================== 
          GRAIN
      ============================================================== */}

      <div
        aria-hidden="true"
        className="
          grain-overlay
          pointer-events-none
          absolute
          inset-0
          z-[1]
        "
      />

      {/* ============================================================== 
          MAIN CONTENT
      ============================================================== */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          container-x
          relative
          z-10
          mx-auto
          w-full

          [@media(min-width:800px)_and_(orientation:portrait)]:-translate-y-7
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center

            /* MOBILE */
            gap-8

            /* TABLET / IPAD MINI */
            sm:gap-9

            /* IPAD / IPAD PRO */
            min-[800px]:grid-cols-[0.92fr_1.08fr]
            min-[800px]:gap-6

            /* DESKTOP */
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-8

            xl:grid-cols-[0.88fr_1.12fr]
            xl:gap-12
            2xl:gap-16
          "
        >
          {/* ============================================================
              LEFT CONTENT
          ============================================================= */}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="
              relative
              z-20
              w-full
              max-w-3xl

              min-[800px]:max-w-[485px]

              lg:max-w-[520px]
              xl:max-w-[620px]
              2xl:max-w-3xl
            "
          >
            {/* EYEBROW */}

            <motion.p
              variants={item}
              className="
                eyebrow
                mb-3
                text-[#F2B632]

                sm:mb-4

                min-[800px]:mb-3

                xl:mb-5
              "
            >
              {company.tagline}
            </motion.p>

            {/* TITLE */}

            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="
                relative
                font-display
                font-semibold
                tracking-[-0.035em]
                text-white

                text-[2.25rem]
                leading-[1.02]

                sm:text-[2.8rem]

                min-[800px]:text-[2.85rem]
                min-[800px]:leading-[1.01]

                lg:text-[3.2rem]
                xl:text-6xl
                2xl:text-7xl
              "
            >
              <AnimatedWords text="Turn Your Ideas Into" />

              <span className="mt-0.5 block sm:mt-1">
                <AnimatedWords
                  text="Smart AI Solutions."
                  className="animated-gradient-text"
                />
              </span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              variants={item}
              className="
                mt-4
                max-w-xl
                text-[14px]
                leading-6
                text-slate-300

                sm:mt-5
                sm:text-base
                sm:leading-7

                min-[800px]:mt-4
                min-[800px]:max-w-[480px]
                min-[800px]:text-[13px]
                min-[800px]:leading-[1.5]

                lg:text-sm

                xl:mt-5
                xl:text-base
              "
            >
              Explore AI solutions, web development,
              mobile apps, and custom software designed
              to make work smarter and simpler.
            </motion.p>

            {/* STATS */}

            <motion.div
              variants={item}
              className="
                mt-5
                grid
                w-full
                grid-cols-1
                gap-2

                sm:mt-7
                sm:grid-cols-3
                sm:gap-3

                min-[800px]:mt-5
                min-[800px]:grid-cols-3
                min-[800px]:gap-2

                lg:gap-2.5

                xl:mt-7
                xl:gap-3
              "
            >
              {heroStats.map((stat, index) => {
                const themes = [
                  {
                    border: "border-[#0066B3]/35",
                    glow: "bg-[#0066B3]/10",
                    number: "text-[#00A9E0]",
                    line: "from-[#0066B3] to-[#00A9E0]",
                  },
                  {
                    border: "border-[#00A878]/30",
                    glow: "bg-[#00A878]/10",
                    number: "text-[#00A878]",
                    line: "from-[#00A878] to-[#00A9E0]",
                  },
                  {
                    border: "border-[#F2B632]/25",
                    glow: "bg-[#F2B632]/10",
                    number: "text-[#F2B632]",
                    line: "from-[#F47B20] to-[#F2B632]",
                  },
                ];

                const theme = themes[index % themes.length];

                return (
                  <motion.div
                    key={stat.label ?? index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      duration: 0.45,
                      ease: SMOOTH_EASE,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      ${theme.border}
                      bg-[#031B2E]/85
                      px-2.5
                      py-2.5
                      backdrop-blur-md

                      sm:rounded-2xl
                      sm:px-3.5
                      sm:py-3.5

                      min-[800px]:rounded-xl
                      min-[800px]:px-2.5
                      min-[800px]:py-2

                      lg:px-3.5
                      lg:py-3

                      xl:rounded-2xl
                      xl:px-4
                      xl:py-3.5

                      transition-shadow
                      duration-300
                      hover:shadow-[0_0_22px_rgba(0,169,224,0.08)]
                    `}
                  >
                    <div
                      aria-hidden="true"
                      className={`
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-20
                        w-20
                        rounded-full
                        ${theme.glow}
                        blur-xl
                      `}
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/15
                        to-transparent
                      "
                    />

                    <div className="relative">
                      <div
                        className={`
                          text-xl
                          font-bold
                          tracking-tight

                          min-[800px]:text-[17px]
                          lg:text-xl
                          xl:text-2xl

                          ${theme.number}
                        `}
                      >
                        {stat.value ||
                          stat.stat ||
                          stat.number ||
                          ""}
                      </div>

                      <div
                        className="
                          mt-0.5
                          text-[11px]
                          font-semibold
                          leading-5
                          text-white

                          min-[800px]:text-[9px]
                          lg:text-[11px]
                          xl:text-sm
                        "
                      >
                        {stat.label}
                      </div>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-[9px]
                          leading-4
                          text-slate-400

                          min-[800px]:text-[7px]
                          lg:text-[9px]
                          xl:text-xs
                          xl:leading-5
                        "
                      >
                        {stat.description ||
                          "Professional solutions for your business."}
                      </p>
                    </div>

                    <div
                      className={`
                        absolute
                        bottom-0
                        left-3
                        h-[2px]
                        w-7
                        rounded-full
                        bg-gradient-to-r
                        ${theme.line}
                      `}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT IMAGE
          ============================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: SMOOTH_EASE,
            }}
            className="
              relative
              z-10
              flex
              w-full
              items-center
              justify-center
              mt-0
            "
          >
            <div
              className="
                w-full
                max-w-[560px]
                sm:max-w-[640px]
                min-[800px]:max-w-[490px]
                lg:max-w-[560px]
                xl:max-w-[680px]
                2xl:max-w-[760px]
              "
            >
              <AnimatedHeroImage
                scrollYProgress={scrollYProgress}
                performance={performance}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ============================================================== 
          SCROLL INDICATOR
      ============================================================== */}
{/* 
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
        }}
        className="
          pointer-events-none
          absolute
          bottom-3
          left-1/2
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-1
          text-white/50

          md:flex
          xl:bottom-5
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.3em]

            xl:text-[10px]
          "
        >
          Scroll
        </span>

        <motion.span
          animate={{
            y: [
              0,
              6,
              0,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          className="
            h-5
            w-[1px]
            bg-gradient-to-b
            from-[#00A9E0]
            to-transparent

            xl:h-8
          "
        />
      </motion.div> */}
    </section>
  );
}