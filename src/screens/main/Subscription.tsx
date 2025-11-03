import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'

const plans = {
  free: {
    name: 'Free Plan',
    price: 'Free',
    period: 'Forever',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
    ],
    excluded: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
    ],
    badge: "You're using -",
    badgeColor: 'purple',
  },
  pro: {
    name: 'Pro Plan',
    price: '$9.99',
    period: '/Month',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
      'Lorem Ipsum is simply text of the printing.',
    ],
    excluded: ['Contrary to popular belief, Lorem Ipsum is not.'],
    badge: 'Most Popular',
    badgeColor: 'green',
  },
  plus: {
    name: 'Plus Plan',
    price: '$19.99',
    period: '/Month',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
    ],
    excluded: [],
    badge: 'Best for You',
    badgeColor: 'green',
  },
}

export default function Subscription() {
  const navigate = useNavigate()
  const [activePlan, setActivePlan] = useState<'free' | 'pro' | 'plus'>('free')
  const [billing, setBilling] = useState<'monthly' | 'annually'>('monthly')

  const plan = plans[activePlan]

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Subscription</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Plan Tabs */}
        <Tabs
          tabs={[
            { id: 'free', label: 'Free Plan' },
            { id: 'pro', label: 'Pro Plan' },
            { id: 'plus', label: 'Plus Plan' },
          ]}
          activeTab={activePlan}
          onTabChange={(id) => setActivePlan(id as typeof activePlan)}
        />

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 my-6">
          <span
            className={`text-sm font-medium ${
              billing === 'monthly' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBilling(billing === 'monthly' ? 'annually' : 'monthly')
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              billing === 'monthly' ? 'bg-gray-200' : 'bg-primary'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                billing === 'monthly' ? 'translate-x-0.5' : 'translate-x-6'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              billing === 'annually' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Annually
          </span>
        </div>

        {/* Plan Card */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-soft mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              {plan.badge && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    plan.badgeColor === 'purple'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {plan.badge}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
            </div>
          </div>

          <div className="space-y-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
            {plan.excluded.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 opacity-50">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs">×</span>
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button variant="primary" fullWidth className="shadow-lg">
          {activePlan === 'pro' && (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          )}
          {activePlan === 'plus' && (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          )}
          Get {plan.name}
        </Button>
      </div>
    </motion.div>
  )
}

