import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  DocumentIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'

export default function ProfileList() {
  const navigate = useNavigate()
  const { user, papers, projects } = useApp()

  if (!user) return null

  const profileItems = [
    {
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      label: 'Occupation',
      value: user.occupation,
    },
    {
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      label: 'ORCID',
      value: user.orcid || 'Not set',
    },
    {
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      label: 'Email (Privacy: Private)',
      value: user.email,
    },
    {
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      label: 'Institution',
      value: user.institution || 'Not set',
    },
    {
      icon: <DocumentIcon className="w-5 h-5" />,
      label: 'Papers',
      value: `${papers.length} Papers`,
    },
    {
      icon: <DocumentIcon className="w-5 h-5" />,
      label: 'Library',
      value: `${projects.length} Folders, ${papers.length} Papers, ${papers.filter(p => !p.listened).length} Unlisten`,
    },
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      label: 'Settings',
      value: 'Lang: EN; Mode: Light; Text: Medium',
      onClick: () => navigate('/settings'),
    },
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      label: 'Interests',
      value: user.interests.join(', '),
    },
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      label: 'Subscription',
      value: 'Free',
    },
  ]

  const littleMoreItems = [
    {
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      label: 'Rate Us',
      onClick: () => {
        // In a real app, open app store rating
        alert('Opening app store for rating...')
      },
    },
    {
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      label: 'Invite Friends',
      onClick: () => {
        // Share functionality
        if (navigator.share) {
          navigator.share({
            title: 'Join me on SciRadar',
            text: 'Discover and collaborate on research papers!',
            url: window.location.origin,
          })
        } else {
          navigator.clipboard.writeText(`${window.location.origin} - Join me on SciRadar!`)
          alert('Invite link copied to clipboard!')
        }
      },
    },
  ]

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
          <h1 className="font-semibold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <Avatar name={user.name} size="lg" className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.occupation}</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-3 mb-6">
          {profileItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">
                  {item.value}
                </p>
              </div>
              {item.onClick && (
                <ArrowRightIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {/* Little More Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Little More</h3>
          <div className="space-y-3">
            {littleMoreItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="secondary"
          fullWidth
          className="bg-gray-100 text-gray-900 hover:bg-gray-200"
          onClick={() => {
            if (confirm('Are you sure you want to logout?')) {
              navigate('/welcome')
            }
          }}
        >
          <ArrowRightIcon className="w-5 h-5 rotate-180" />
          Logout
        </Button>
      </div>

      <BottomNav />
    </motion.div>
  )
}

