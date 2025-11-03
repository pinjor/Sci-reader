import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MicrophoneIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'

export default function VoiceSearch() {
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(true)

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative"
    >
      {/* Header */}
      <div className="absolute top-12 left-0 right-0 px-6 flex items-center justify-between z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Voice Search</h1>
        <div className="w-10" />
      </div>

      {/* Listening Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-medium text-[#0072FF] mb-12 text-center"
      >
        Listening ... Speak Now ...
      </motion.p>

      {/* Microphone Animation */}
      <div className="relative flex items-center justify-center mb-auto">
        {/* Outer pulsating rings */}
        {[1, 2].map((ring) => (
          <motion.div
            key={ring}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.3, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ring * 0.3,
              ease: 'easeOut',
            }}
            className="absolute w-32 h-32 rounded-full border-2 border-[#00C6FF]/50"
          />
        ))}

        {/* Microphone Icon */}
        <motion.div
          animate={{
            scale: isListening ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: isListening ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 rounded-full bg-[#00C6FF] flex items-center justify-center relative z-10 shadow-lg"
        >
          <MicrophoneIcon className="w-12 h-12 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
}

