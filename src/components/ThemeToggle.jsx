import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`relative flex h-8 w-16 items-center rounded-full border border-base-line dark:border-dark-line bg-base-surface dark:bg-dark-surface px-1 transition-colors ${className}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-node-gradient text-[11px] shadow-glow"
        style={{ marginLeft: isDark ? '32px' : '0px' }}
      >
        {isDark ? '\u{1F319}' : '\u2600\uFE0F'}
      </motion.span>
    </button>
  )
}
