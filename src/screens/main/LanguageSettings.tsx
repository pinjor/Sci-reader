import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'

const languages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
]

export default function LanguageSettings() {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState('es')

  const handleSave = () => {
    // In real app, save language preference and restart app
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
            <span className="font-semibold text-gray-900">Language</span>
          </button>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Language
        </h1>

        <div className="space-y-3 mb-8">
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.id
            return (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
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
                  <span className="font-medium text-gray-900">
                    {language.name}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Save Button */}
        <Button variant="primary" fullWidth onClick={handleSave}>
          Save Changes & Restart App
        </Button>
      </div>
    </motion.div>
  )
}

