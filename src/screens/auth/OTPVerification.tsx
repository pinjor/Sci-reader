import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function OTPVerification() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newOtp = pastedData.split('')
    while (newOtp.length < 6) newOtp.push('')
    setOtp(newOtp.slice(0, 6))
  }

  const handleSubmit = () => {
    if (otp.every((digit) => digit !== '')) {
      // In real app, verify OTP here
      navigate('/password')
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h1>
          <p className="text-gray-600">
            Enter the OTP sent via email to{' '}
            <span className="underline">youremail@email.com</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div
          className="flex gap-3 mb-6 justify-center"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="flex items-center justify-between mb-8">
          <button className="text-sm text-gray-600 underline">
            Didn't receive OTP? Resend.
          </button>
          <span className="text-sm text-gray-500">00:28</span>
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!otp.every((digit) => digit !== '')}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

