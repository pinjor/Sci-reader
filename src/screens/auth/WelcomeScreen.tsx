import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'

export default function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0072FF 0%, #007AFF 30%, #E3F2FD 70%, #F5F5F5 100%)',
      }}
    >
      {/* Decorative bubbles/spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-white/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#0072FF' }}>Sci</span>
            <span style={{ color: '#00C6FF' }}>Radar</span>
          </h1>
          <p className="text-gray-900 text-lg font-medium">Welcome to SciRadar</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm space-y-4"
        >
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/signup')}
            className="bg-primary text-white hover:bg-primary/90 shadow-lg"
          >
            Sign Up
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/signin')}
            className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm"
          >
            Sign In
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-white/80 text-center max-w-sm"
        >
          By continuing, you agree to SciRadar's{' '}
          <button
            onClick={() => {
              // Navigate to terms
            }}
            className="underline hover:text-white"
          >
            Terms and Conditions
          </button>{' '}
          and acknowledge you've read our{' '}
          <button
            onClick={() => {
              // Navigate to privacy
            }}
            className="underline hover:text-white"
          >
            Privacy Policy
          </button>
          .
        </motion.p>
      </div>
    </motion.div>
  )
}

