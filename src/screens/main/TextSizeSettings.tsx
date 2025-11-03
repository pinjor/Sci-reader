import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'

const textSizes = ['Small', 'Medium', 'Large']

export default function TextSizeSettings() {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState('Medium')

  const handleSave = () => {
    // In real app, save text size preference
    navigate('/settings')
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
            <span className="font-semibold text-gray-900">Text Size</span>
          </button>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Text Size
        </h1>

        <div className="space-y-3 mb-8">
          {textSizes.map((size) => {
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{size}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Save Button */}
        <Button variant="primary" fullWidth onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </motion.div>
  )
}

