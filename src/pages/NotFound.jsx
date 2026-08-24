import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-display font-bold text-gradient"
      >
        404
      </motion.p>
      <p className="mt-4 text-base-muted dark:text-dark-muted">This page doesn&apos;t exist.</p>
      <Link to="/" className="mt-8 px-6 py-3 rounded-full bg-node-gradient text-teal-900 font-semibold">
        Back to Home
      </Link>
    </div>
  )
}
