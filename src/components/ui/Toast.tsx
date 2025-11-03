import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const variants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`${variants[type]} text-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-[300px]`}>
            {type === 'success' && (
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="flex-1">{message}</p>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

