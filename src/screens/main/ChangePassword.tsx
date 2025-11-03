import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function ChangePassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleContinue = () => {
    if (email.trim()) {
      // In real app, send OTP to email
      navigate('/otp')
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
            <span>Settings</span>
            <span className="text-gray-400">›</span>
            <span className="font-semibold text-gray-900">Change Password</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Want to change your password?
          </h1>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Enter your email like this:{' '}
              <span className="underline">ui..........id@gmail.com</span>
            </p>

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<EnvelopeIcon className="w-5 h-5" />}
            />

            <p className="text-sm text-gray-500 mt-2">
              We will send an OTP to this email address.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <Button
            variant="primary"
            fullWidth
            onClick={handleContinue}
            disabled={!email.trim() || !email.includes('@')}
          >
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

