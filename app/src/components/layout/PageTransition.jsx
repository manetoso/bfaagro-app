import { motion } from 'framer-motion'

/**
 *
 * @param {{children: JSX.Element}} props
 * @returns {JSX.Element} PageTransition component
 */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transitions={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
