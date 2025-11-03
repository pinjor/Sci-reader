import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import { useApp } from '../../context/AppContext'

export default function YourPapers() {
  const navigate = useNavigate()
  const [showAddPaper, setShowAddPaper] = useState(false)
  const [paperLink, setPaperLink] = useState('')
  const { papers, updatePaper, addPaper } = useApp()

  const handleAddPaper = () => {
    if (paperLink.trim()) {
      // In real app, validate and fetch paper metadata from link
      const newPaper = {
        id: Date.now().toString(),
        title: 'New Paper from Link',
        authors: ['Unknown'],
        year: new Date().getFullYear(),
        source: 'External',
        citations: 0,
        abstract: 'Paper added from link.',
        badges: ['Open Access'],
        saved: true,
        listened: false,
      }
      addPaper(newPaper)
      setPaperLink('')
      setShowAddPaper(false)
    }
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
          <h1 className="font-semibold text-gray-900">Papers</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Papers</h2>
          <button
            onClick={() => setShowAddPaper(true)}
            className="flex items-center gap-1 text-primary font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            Add Your Paper
          </button>
        </div>

        {/* Papers List */}
        {papers.length > 0 ? (
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
                onSave={() => updatePaper(paper.id, { saved: !paper.saved })}
                onListen={() =>
                  updatePaper(paper.id, { listened: !paper.listened })
                }
                onShare={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-soft">
            <p className="text-gray-500 mb-4">No papers saved yet.</p>
            <Button variant="outline" onClick={() => setShowAddPaper(true)}>
              Add Your First Paper
            </Button>
          </div>
        )}
      </div>

      {/* Add Paper Bottom Sheet */}
      <BottomSheet
        isOpen={showAddPaper}
        onClose={() => {
          setShowAddPaper(false)
          setPaperLink('')
        }}
        title="Add Your Paper"
        subtitle="Share the link to your paper."
      >
        <div className="space-y-4">
          <Input
            placeholder="Paper Link"
            value={paperLink}
            onChange={(e) => setPaperLink(e.target.value)}
            icon={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddPaper}
            disabled={!paperLink.trim()}
          >
            Add Paper
          </Button>
        </div>
      </BottomSheet>
    </motion.div>
  )
}

