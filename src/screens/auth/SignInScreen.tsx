import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'

export default function SignInScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    if (email && password) {
      // In real app, authenticate user here
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary text-right w-full"
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!email || !password}
        >
          Sign In
        </Button>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-primary font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.div>
  )
}

