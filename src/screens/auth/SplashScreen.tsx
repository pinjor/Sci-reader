import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <motion.h1
          className="text-6xl font-bold mb-4 relative inline-block"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            WebkitTextStroke: '3px',
            WebkitTextStrokeColor: '#0072FF',
            color: 'transparent',
          }}
        >
          Sci
          <motion.span
            style={{
              color: '#00C6FF',
              WebkitTextStroke: '3px',
              WebkitTextStrokeColor: '#00C6FF',
            }}
          >
            Radar
          </motion.span>
        </motion.h1>
      </motion.div>
    </motion.div>
  )
}

