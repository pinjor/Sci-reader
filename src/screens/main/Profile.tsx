import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import { useApp } from '../../context/AppContext'

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('about')
  const { user, papers } = useApp()

  if (!user) return null

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
          <Avatar name={user.name} size="lg" className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.occupation}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              // Handle follow/unfollow
            }}
          >
            <UserPlusIcon className="w-5 h-5" />
            Following
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/messages')}
          >
            <EnvelopeIcon className="w-5 h-5" />
            Message
          </Button>
        </div>

        <Tabs
          tabs={[
            { id: 'about', label: 'About' },
            { id: 'papers', label: 'Papers' },
            { id: 'library', label: 'Library' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {activeTab === 'about' && (
            <div className="space-y-4 mt-4">
              <ProfileItem
                icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                label="Occupation"
                value={user.occupation}
              />
              {user.orcid && (
                <ProfileItem
                  icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  label="ORCID"
                  value={user.orcid}
                />
              )}
              <ProfileItem
                icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                label="Email (Privacy: Private)"
                value={user.email}
              />
              {user.institution && (
                <ProfileItem
                  icon={<BuildingOfficeIcon className="w-5 h-5" />}
                  label="Institution"
                  value={user.institution}
                />
              )}
              <ProfileItem
                icon={<Cog6ToothIcon className="w-5 h-5" />}
                label="Interests"
                value={user.interests.join(', ')}
              />
            </div>
          )}

          {activeTab === 'papers' && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {user.name}'s Papers
              </h3>
              <div className="space-y-4">
                {papers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    id={paper.id}
                    title={paper.title}
                    authors={paper.authors}
                    year={paper.year}
                    source={paper.source}
                    citations={paper.citations}
                    abstract={paper.abstract}
                    badges={paper.badges}
                    saved={paper.saved}
                    listened={paper.listened}
                    onSave={() => {}}
                    onListen={() => {}}
                    onShare={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {user.name}'s Projects
              </h3>
              <p className="text-gray-500">No projects yet.</p>
            </div>
          )}
        </Tabs>
      </div>

      <BottomNav />
    </motion.div>
  )
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft flex items-start gap-3">
      {icon && (
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

