import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Button from '../../components/ui/Button'

interface SettingItem {
  id: string
  label: string
  value?: string
  hasToggle?: boolean
  toggleValue?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

export default function Settings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'password',
      label: 'Change Password',
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      onClick: () => navigate('/settings/change-password'),
    },
    {
      id: 'voice',
      label: 'Reading Voice',
      value: 'Male - Smooth',
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      onClick: () => navigate('/settings/reading-voice'),
    },
    {
      id: 'language',
      label: 'Language',
      value: 'English',
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      onClick: () => navigate('/settings/language'),
    },
    {
      id: 'darkmode',
      label: 'Dark Mode',
      hasToggle: true,
      toggleValue: false,
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      id: 'listening',
      label: 'Listening Mode',
      hasToggle: true,
      toggleValue: false,
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      id: 'notification',
      label: 'Notification',
      hasToggle: true,
      toggleValue: true,
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      id: 'textsize',
      label: 'Text Size',
      value: 'Medium',
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      onClick: () => navigate('/settings/text-size'),
    },
  ])

  const helpItems = [
    { label: 'Contact Us', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { label: 'Get Help', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { label: 'FAQs', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    {
      label: 'Privacy Policy',
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      label: 'Terms & Conditions',
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
  ]

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((s) =>
        s.id === id ? { ...s, toggleValue: !s.toggleValue } : s
      )
    )
  }

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
          <h1 className="font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Settings List */}
        <div className="bg-white rounded-2xl shadow-soft mb-4">
          {settings.map((setting, index) => (
            <button
              key={setting.id}
              onClick={() =>
                setting.hasToggle
                  ? toggleSetting(setting.id)
                  : setting.onClick?.()
              }
              className={`w-full flex items-center gap-4 p-4 ${
                index !== settings.length - 1
                  ? 'border-b border-gray-100'
                  : ''
              }`}
            >
              {setting.icon && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                  {setting.icon}
                </div>
              )}
              <span className="flex-1 text-left text-gray-900 font-medium">
                {setting.label}
              </span>
              {setting.hasToggle ? (
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    setting.toggleValue ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      setting.toggleValue ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {setting.value && (
                    <span className="text-gray-500 text-sm">
                      {setting.value}
                    </span>
                  )}
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Help & More */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Help and More</h2>
          <div className="bg-white rounded-2xl shadow-soft">
            {helpItems.map((item, index, arr) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 ${
                  index !== arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                  {item.icon}
                </div>
                <span className="flex-1 text-left text-gray-900 font-medium">
                  {item.label}
                </span>
                <ArrowRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Delete Account */}
        <Button
          variant="secondary"
          fullWidth
          className="text-red-500 border-red-500 hover:bg-red-50"
          onClick={() => {
            if (confirm('Are you sure you want to delete your account?')) {
              // Handle account deletion
              navigate('/welcome')
            }
          }}
        >
          <ArrowRightIcon className="w-5 h-5" />
          Delete Account
        </Button>
      </div>
    </motion.div>
  )
}

