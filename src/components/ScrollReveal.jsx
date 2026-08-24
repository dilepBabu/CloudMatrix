// ScrollReveal.jsx
import { motion } from 'framer-motion'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.45,
  className = '',
  amount = 0.15,
  as: Component = motion.div,
}) {
  const offsets = {
    up: { x: 0, y: 18 },
    down: { x: 0, y: -18 },
    left: { x: 18, y: 0 },
    right: { x: -18, y: 0 },
    fade: { x: 0, y: 0 },
    scale: { x: 0, y: 0, scale: 0.985 },
  }

  const offset = offsets[direction] || offsets.up

  return (
    <Component
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{
        once: true,
        amount,
        margin: '0px 0px -10% 0px',
      }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: 'translateZ(0)', willChange: 'opacity, transform' }}
      className={className}
    >
      {children}
    </Component>
  )
}