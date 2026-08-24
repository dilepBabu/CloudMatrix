import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  spotlight = true,
  max = 7,
}) {
  const ref = useRef(null)
  const frameRef = useRef(null)

  const rectRef = useRef({
    left: 0,
    top: 0,
    width: 1,
    height: 1,
  })

  const targetX = useRef(0.5)
  const targetY = useRef(0.5)

  const isHovering = useRef(false)

  /*
   * ----------------------------------------------------
   * CORE MOTION VALUES
   * ----------------------------------------------------
   */

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  /*
   * 3D rotation
   */

  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    {
      stiffness: 260,
      damping: 25,
      mass: 0.28,
    }
  )

  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    {
      stiffness: 260,
      damping: 25,
      mass: 0.28,
    }
  )

  /*
   * Slight magnetic movement
   */

  const translateX = useSpring(
    useTransform(px, [0, 1], [-3, 3]),
    {
      stiffness: 220,
      damping: 26,
      mass: 0.3,
    }
  )

  const translateY = useSpring(
    useTransform(py, [0, 1], [-3, 3]),
    {
      stiffness: 220,
      damping: 26,
      mass: 0.3,
    }
  )

  /*
   * Hover scale
   */

  const scale = useSpring(1, {
    stiffness: 260,
    damping: 24,
    mass: 0.35,
  })

  /*
   * Spotlight position
   */

  const spotX = useTransform(
    px,
    [0, 1],
    ['0%', '100%']
  )

  const spotY = useTransform(
    py,
    [0, 1],
    ['0%', '100%']
  )

  /*
   * Shine angle
   */

  const shineX = useTransform(
    px,
    [0, 1],
    ['-120%', '120%']
  )

  /*
   * Dynamic spotlight
   */

  const spotlightBackground = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(
        260px circle at ${x} ${y},
        rgba(20,166,162,0.22),
        rgba(20,166,162,0.08) 28%,
        transparent 68%
      )`
  )

  /*
   * ----------------------------------------------------
   * CACHE RECT
   * ----------------------------------------------------
   */

  const updateRect = useCallback(() => {
    const element = ref.current

    if (!element) return

    const rect = element.getBoundingClientRect()

    rectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    }
  }, [])

  /*
   * ----------------------------------------------------
   * MOUSE MOVE
   * ----------------------------------------------------
   */

  const handleMove = useCallback(
    (event) => {
      if (!ref.current) return

      targetX.current =
        (event.clientX - rectRef.current.left) /
        rectRef.current.width

      targetY.current =
        (event.clientY - rectRef.current.top) /
        rectRef.current.height

      if (frameRef.current) return

      frameRef.current = requestAnimationFrame(() => {
        const x = Math.max(
          0,
          Math.min(1, targetX.current)
        )

        const y = Math.max(
          0,
          Math.min(1, targetY.current)
        )

        px.set(x)
        py.set(y)

        frameRef.current = null
      })
    },
    [px, py]
  )

  /*
   * ----------------------------------------------------
   * ENTER
   * ----------------------------------------------------
   */

  const handleEnter = useCallback(() => {
    isHovering.current = true

    scale.set(1.025)

    updateRect()
  }, [scale, updateRect])

  /*
   * ----------------------------------------------------
   * EXIT
   * ----------------------------------------------------
   */

  const reset = useCallback(() => {
    isHovering.current = false

    px.set(0.5)
    py.set(0.5)

    scale.set(1)
  }, [px, py, scale])

  /*
   * ----------------------------------------------------
   * RESIZE
   * ----------------------------------------------------
   */

  useEffect(() => {
    updateRect()

    const handleResize = () => {
      updateRect()
    }

    window.addEventListener(
      'resize',
      handleResize,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [updateRect])

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,

        x: translateX,
        y: translateY,

        scale,

        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={`
        group
        relative
        [transform-style:preserve-3d]
        will-change-transform
        ${className}
      `}
    >
      {/*
       * ------------------------------------------------
       * DEPTH SHADOW
       * ------------------------------------------------
       */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-1
          rounded-[inherit]
          opacity-0
          blur-xl
          transition-opacity
          duration-500
          group-hover:opacity-40
        "
        style={{
          background:
            'linear-gradient(135deg, rgba(20,166,162,0.45), transparent 55%, rgba(120,80,255,0.3))',
          transform: 'translateZ(-25px)',
        }}
      />

      {/*
       * ------------------------------------------------
       * MAIN CONTENT
       * ------------------------------------------------
       */}

      <motion.div
        className="
          relative
          z-[2]
          h-full
          w-full
          overflow-hidden
          rounded-[inherit]
        "
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/*
         * Spotlight
         */}

        {spotlight && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              rounded-[inherit]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
            style={{
              background:
                spotlightBackground,
            }}
          />
        )}

        {/*
         * ------------------------------------------------
         * PREMIUM SHINE SWEEP
         * ------------------------------------------------
         */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-[-50%]
            z-30
            w-[25%]
            rotate-[20deg]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            opacity-0
            blur-sm
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
          style={{
            left: shineX,
          }}
        />

        {/*
         * ------------------------------------------------
         * EDGE LIGHT
         * ------------------------------------------------
         */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            rounded-[inherit]
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 45px rgba(20,166,162,0.08)',
          }}
        />

        {/*
         * ------------------------------------------------
         * NEW — RADAR SWEEP (additive, futuristic hover accent)
         *
         * A single line rotates continuously via CSS keyframes
         * (see .tilt-radar-sweep in index.css); it's only ever
         * visible because the wrapper's opacity is gated by
         * group-hover, so it costs nothing while idle.
         * ------------------------------------------------
         */}

        {spotlight && (
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-[22]
              overflow-hidden
              rounded-[inherit]
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          >
            <div
              className="
                tilt-radar-sweep
                absolute
                left-1/2
                top-1/2
                h-[140%]
                w-px
                origin-top
                -translate-x-1/2
                bg-gradient-to-b
                from-[#14A6A2]/50
                via-[#14A6A2]/10
                to-transparent
              "
            />
          </div>
        )}

        {/*
         * ------------------------------------------------
         * NEW — HUD CORNER PULSE (additive)
         *
         * A small pulsing ring in the top-left, the kind of
         * "system online" detail seen on awwwards showcase
         * sites. Purely decorative, gated by group-hover.
         * ------------------------------------------------
         */}

        <div
          aria-hidden="true"
          className="
            tilt-hud-corner
            pointer-events-none
            absolute
            left-3
            top-3
            z-[23]
            h-3
            w-3
            rounded-full
            border
            border-[#14A6A2]/70
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-70
          "
        />

        {/*
         * Actual card content
         */}

        <div
          className="
            relative
            z-10
            h-full
            w-full
          "
          style={{
            transform: 'translateZ(18px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}