import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

/**
 * Lightweight animated service spine.
 *
 * Optimizations:
 * - One scroll listener through Framer Motion.
 * - GPU-friendly pathLength animation.
 * - Bidirectional naturally follows scrollYProgress.
 * - No continuously animated blur/filter.
 */
export default function NodeSpine({ nodeCount = 4 }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 15%'],
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        bottom-0
        hidden
        w-[3px]
        -translate-x-1/2
        lg:block
      "
    >
      <svg
        width="3"
        height="100%"
        className="absolute inset-0 overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Static base line */}
        <line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2="100%"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-base-line dark:text-dark-line"
        />

        {/* Animated line */}
        <motion.line
          x1="1.5"
          y1="0"
          x2="1.5"
          y2="100%"
          stroke="url(#spine-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            pathLength,
          }}
        />

        <defs>
          <linearGradient
            id="spine-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#F2994A" />
            <stop offset="50%" stopColor="#F2C94C" />
            <stop offset="100%" stopColor="#6FCF97" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {Array.from({ length: nodeCount }).map((_, i) => (
        <span
          key={i}
          className="
            absolute
            left-1/2
            h-3
            w-3
            -translate-x-1/2
            rounded-full
            bg-node-gradient
            shadow-glow
          "
          style={{
            top:
              nodeCount > 1
                ? `${(100 / (nodeCount - 1)) * i}%`
                : '0%',
          }}
        />
      ))}
    </div>
  )
}