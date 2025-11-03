import { ReactNode, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownProps {
  isOpen: boolean
  onClose: () => void
  trigger: ReactNode
  children: ReactNode
}

export default function Dropdown({
  isOpen,
  onClose,
  trigger,
  children,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div className="relative" ref={dropdownRef}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-soft border border-gray-100 min-w-[180px] z-20"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

