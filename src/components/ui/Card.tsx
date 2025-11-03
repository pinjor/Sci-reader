import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.01 } : undefined}
      className={`bg-white rounded-2xl shadow-soft p-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

