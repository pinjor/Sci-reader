import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-3 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90 active:scale-95',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:scale-95',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

