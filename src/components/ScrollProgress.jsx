import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div
      className="
        pointer-events-none
        fixed
        left-0
        right-0
        top-0
        z-[60]
        h-[2px]
      "
      aria-hidden="true"
    >
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0% 50%',
        }}
        className="h-full w-full bg-node-gradient"
      />
    </div>
  )
}