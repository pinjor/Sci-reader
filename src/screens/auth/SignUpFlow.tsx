import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

type Step = 'email' | 'name' | 'occupation' | 'interests'

const occupations = [
  'Graduate Student (Master\'s/PhD)',
  'Academic/Professor/Lecturer',
  'Researcher/Scientist',
  'Industry R&D Professional',
  'Data Scientist/Engineer',
  'Healthcare/Clinical Researcher',
  'Policy/Government Researcher',
  'Independent/Self-learner',
  'Other',
]

const interestCategories = [
  {
    category: 'Business, Economics & Management',
    interests: [
      'Marketing',
      'Game Theory',
      'Strategic Management',
      'International Business',
      'Taxation',
      'Emergency Management',
      'Development Economics',
      'Economic Policy',
      'Economic History',
      'Educational Administration',
      'Other',
    ],
  },
  {
    category: 'Health & Medical Sciences',
    interests: [
      'Pharmacy',
      'Diabetes',
      'Psychology',
      'Ophthalmology',
      'Nursing',
      'Oncology',
      'Rheumatology',
      'Obesity',
      'Addiction',
      'Radiology',
      'Nephrology',
      'Surgery',
      'Endocrinology',
      'Other',
    ],
  },
  {
    category: 'Physics & Mathematics',
    interests: [
      'Geometry',
      'Semiconductor',
      'Spectroscopy',
      'Fluid Mechanics',
      'Applied Mathematics',
      'Photonics',
      'Mathematical Physics',
      'Molecular Physics',
      'Thermal Science',
      'Other',
    ],
  },
  {
    category: 'Social Sciences',
    interests: [
      'Anthropology',
      'Education',
      'History',
      'Architecture',
      'Sociology',
      'Military Studies',
      'Political Science',
      'Environmental Studies',
      'Criminology',
      'Higher Education',
      'Criminal Law',
      'Other',
    ],
  },
  {
    category: 'Humanities, Literature & Arts',
    interests: [
      'Music',
      'English Language',
      'Communication',
      'Film Studies',
      'Philosophy',
      'Religion',
      'Literature',
      'Visual Arts',
      'Gender Studies',
      'American Literature',
      'Islamic Studies',
      'African Studies',
      'Asian Studies',
      'Other',
    ],
  },
  {
    category: 'Life & Earth Sciences',
    interests: [
      'Birds',
      'Pest Control',
      'Sustainable Development',
      'Microbiology',
      'Arthropods',
      'Environmental Science',
      'Peptides',
      'Pesticides',
      'Bioinformatics',
      'Life Sciences',
      'Other',
    ],
  },
  {
    category: 'Engineering & Computer Science',
    interests: [
      'Artificial Intelligence',
      'Architecture',
      'Civil Engineering',
      'Mechanical Engineering',
      'Navigation',
      'Multimedia',
      'Combustion',
      'Nanotechnology',
      'Computer Hardware',
      'Computer Vision',
      'Other',
    ],
  },
  {
    category: 'Chemistry & Material Sciences',
    interests: [
      'Organic Chemistry',
      'Composite Materials',
      'Medicinal Chemistry',
      'Catalysis',
      'Structural Chemistry',
      'Other',
    ],
  },
]

export default function SignUpFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    occupation: '',
    interests: [] as string[],
  })

  const handleNext = () => {
    if (step === 'email') {
      if (formData.email) setStep('name')
    } else if (step === 'name') {
      if (formData.name) setStep('occupation')
    } else if (step === 'occupation') {
      if (formData.occupation) setStep('interests')
    } else if (step === 'interests') {
      if (formData.interests.length > 0) {
        navigate('/otp')
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              What is your email?
            </h1>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )
      case 'name':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Hey, what's your name?
            </h1>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )
      case 'occupation':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              What's your occupation?
            </h1>
            <div className="space-y-3">
              {occupations.map((occ) => {
                const isOther = occ === 'Other'
                const isSelected = formData.occupation === occ
                return (
                  <div key={occ}>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, occupation: occ })
                      }
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
                        <span className="font-medium text-gray-900">{occ}</span>
                      </div>
                    </button>
                    {isOther && isSelected && (
                      <input
                        type="text"
                        placeholder="Enter your occupation"
                        className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        onChange={(e) => {
                          // Handle custom occupation
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 'interests':
        return (
          <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold text-gray-900">
              Select your interests
            </h1>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {interestCategories.map((category) => (
                <div key={category.category}>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.interests.map((interest) => {
                      const selected = formData.interests.includes(interest)
                      const isOther = interest === 'Other'
                      return (
                        <div key={interest}>
                          <button
                            onClick={() => {
                              if (selected) {
                                setFormData({
                                  ...formData,
                                  interests: formData.interests.filter(
                                    (i) => i !== interest
                                  ),
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  interests: [...formData.interests, interest],
                                })
                              }
                            }}
                            className={`w-full p-3 rounded-2xl border-2 text-left transition-all ${
                              selected
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  selected
                                    ? 'border-primary bg-primary'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                {selected && (
                                  <CheckIcon className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="font-medium text-gray-900">
                                {interest}
                              </span>
                            </div>
                          </button>
                          {isOther && selected && (
                            <Input
                              placeholder="Add manually"
                              className="mt-2"
                              onChange={(e) => {
                                // Handle manual input
                              }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-white px-6 py-12"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          {step !== 'interests' && (
            <button
              onClick={() => navigate('/home')}
              className="text-gray-400"
            >
              Skip
            </button>
          )}
        </div>

        {/* Step Content */}
        <div className="mb-8">{renderStep()}</div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
          <Button
            variant="primary"
            fullWidth
            onClick={handleNext}
            disabled={
              (step === 'email' && !formData.email) ||
              (step === 'name' && !formData.name) ||
              (step === 'occupation' && !formData.occupation) ||
              (step === 'interests' && formData.interests.length === 0)
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

