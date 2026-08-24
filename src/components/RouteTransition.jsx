import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Signature route change: a "Signal Wipe" — a solid panel shutters away
 * from the top on every navigation, with a thin gradient line leading the
 * edge, like a signal sweeping across the screen. Purely a reveal overlay,
 * so it never delays actual navigation.
 */
export default function RouteTransition() {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ transformOrigin: 'top' }}
      className="fixed inset-0 z-[150] pointer-events-none bg-teal-900"
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-node-gradient"
      />
    </motion.div>
  )
}
