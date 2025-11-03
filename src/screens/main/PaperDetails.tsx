import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  PlayIcon,
  BookmarkIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'

export default function PaperDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('abstract')
  const [playbackSpeed, setPlaybackSpeed] = useState(2.5)
  const { papers, updatePaper } = useApp()

  const paper = papers.find((p) => p.id === id)

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Paper not found</p>
      </div>
    )
  }

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <Header />

      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Feed</h2>

        {/* Paper Card */}
        <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {paper.badges.map((badge, index) => (
              <Badge
                key={index}
                label={badge}
                variant={
                  badge === 'Open Access' || badge === 'Full Text'
                    ? 'success'
                    : badge === 'Listened'
                    ? 'info'
                    : 'default'
                }
              />
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {paper.title}
          </h3>

          {/* Metadata */}
          <p className="text-sm text-gray-500 mb-4">
            {paper.authors.join(', ')} • {paper.year} • {paper.source} • Cited
            by {paper.citations}
          </p>

          {/* Tabs */}
          <Tabs
            tabs={[
              { id: 'abstract', label: 'Abstract' },
              { id: 'ai', label: 'AI' },
              { id: 'fullpaper', label: 'Full Paper' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === 'abstract' && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {paper.abstract}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex flex-col gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <PlayIcon className="w-5 h-5 text-gray-600" />
                    </button>
                      <button 
                        onClick={() => {
                          // Toggle save functionality
                          updatePaper(paper.id, { saved: !paper.saved })
                        }}
                        className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${paper.saved ? 'text-primary' : ''}`}
                      >
                        <BookmarkIcon className={`w-5 h-5 ${paper.saved ? 'fill-primary' : ''}`} />
                      </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${paper.title}\n\n${paper.abstract}`)
                        alert('Paper content copied to clipboard!')
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <DocumentDuplicateIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: paper.title,
                            text: paper.abstract,
                            url: window.location.href,
                          })
                        } else {
                          navigator.clipboard.writeText(`${paper.title}\n${window.location.href}`)
                          alert('Paper link copied to clipboard!')
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ShareIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-gray-500">2.5x</span>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="mt-4 space-y-4">
                <Button 
                  variant="secondary" 
                  fullWidth
                  onClick={() => {
                    // In a real app, call AI API to explain method
                    alert('AI explanation would be generated here')
                  }}
                >
                  <SparklesIcon className="w-5 h-5" />
                  Explain the method
                </Button>
                <div className="bg-white rounded-2xl p-4 shadow-soft">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Method Summary:
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">
                    {paper.abstract}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <PlayIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${paper.title}\n\n${paper.abstract}`)
                          alert('Paper content copied to clipboard!')
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <DocumentDuplicateIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: paper.title,
                              text: paper.abstract,
                              url: window.location.href,
                            })
                          } else {
                            navigator.clipboard.writeText(`${paper.title}\n${window.location.href}`)
                            alert('Paper link copied to clipboard!')
                          }
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ShareIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm text-gray-500">2.5x</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50">
                    <SparklesIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Explain the method"
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <span className="text-gray-400">×</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fullpaper' && (
              <div className="mt-4 text-center py-8">
                <p className="text-gray-500 italic mb-4">
                  The full text of this paper is not available.
                </p>
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => {
                    // In a real app, navigate to purchase page
                    alert('Redirecting to purchase page...')
                  }}
                >
                  <SparklesIcon className="w-5 h-5" />
                  Purchase Full Paper
                </Button>
              </div>
            )}
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </motion.div>
  )
}

