import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function PasswordScreen() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    if (password.length >= 8) {
      // In real app, validate and save password
      navigate('/home')
    }
  }

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-white px-6 py-12"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create your password
          </h1>
        </div>

        {/* Password Input */}
        <div className="relative mb-8">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a new password"
            className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={password.length < 8}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

