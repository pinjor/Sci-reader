import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import PaperCard from '../../components/ui/PaperCard'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import { useApp } from '../../context/AppContext'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [activeTab, setActiveTab] = useState('abstract')
  const [showFilters, setShowFilters] = useState(false)
  const [showListenOneByOne, setShowListenOneByOne] = useState(false)
  const [filters, setFilters] = useState({
    papers: true,
    users: false,
    citationHighToLow: true,
    publishDateNewToOld: true,
    citation: '',
    publishYear: '',
    articleType: '',
    openAccess: '',
  })
  const { papers, updatePaper } = useApp()

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(query.toLowerCase()) ||
      paper.authors.some((author) =>
        author.toLowerCase().includes(query.toLowerCase())
      )
  )

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <Header showSearch={false} />

      <div className="px-4">
        {/* Search Bar with Filter Button */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={query}
              readOnly
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search"
            />
            <button
              onClick={() => setShowFilters(true)}
              className="p-3 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50"
            >
              <FunnelIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content Type Filter */}
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.papers}
                onChange={(e) =>
                  setFilters({ ...filters, papers: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Papers</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.users}
                onChange={(e) =>
                  setFilters({ ...filters, users: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Users</span>
            </label>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Search result for "{query}"
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.citationHighToLow}
                onChange={(e) =>
                  setFilters({ ...filters, citationHighToLow: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300 text-primary"
              />
              <span className="text-gray-700">Citation (High to Low)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.publishDateNewToOld}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    publishDateNewToOld: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-gray-300 text-primary"
              />
              <span className="text-gray-700">Publish Date (New to Old)</span>
            </label>
          </div>
        </div>

        {/* Results */}
        {filteredPapers.length > 0 ? (
          <div className="space-y-4">
            {filteredPapers.map((paper) => (
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
                onSave={() =>
                  updatePaper(paper.id, { saved: !paper.saved })
                }
                onListen={() =>
                  updatePaper(paper.id, { listened: !paper.listened })
                }
                    onShare={() => {
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No results found for your search.</p>
            <Button variant="outline" onClick={() => navigate('/home')}>
              Browse All Papers
            </Button>
          </div>
        )}
      </div>

      {/* Filters Bottom Sheet */}
      <BottomSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        subtitle="Refine your search results"
      >
        <div className="space-y-6">
          {/* Citation */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Citation</h3>
            <div className="space-y-2">
              {['<= 100', '101 - 250', '251 - 500', '> 500'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, citation: option })
                  }
                >
                  <input
                    type="checkbox"
                    checked={filters.citation === option}
                    onChange={() =>
                      setFilters({ ...filters, citation: option })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Publish Year */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Publish Year</h3>
            <div className="space-y-2">
              {[
                '2025',
                '2021-2024',
                '2015-2020',
                'Before 2015',
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, publishYear: option })
                  }
                >
                  <input
                    type="checkbox"
                    checked={filters.publishYear === option}
                    onChange={() =>
                      setFilters({ ...filters, publishYear: option })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Article Type */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Article Type</h3>
            <div className="space-y-2">
              {['Review Paper', 'Original Paper', 'Thesis'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, articleType: option })
                  }
                >
                  <input
                    type="checkbox"
                    checked={filters.articleType === option}
                    onChange={() =>
                      setFilters({ ...filters, articleType: option })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Open Access */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Open Access</h3>
            <div className="space-y-2">
              {['Yes', 'No'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, openAccess: option })
                  }
                >
                  <input
                    type="checkbox"
                    checked={filters.openAccess === option}
                    onChange={() =>
                      setFilters({ ...filters, openAccess: option })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </div>
      </BottomSheet>

      {/* Listen One by One Bottom Sheet */}
      <BottomSheet
        isOpen={showListenOneByOne}
        onClose={() => setShowListenOneByOne(false)}
        title="Listen One by One"
        subtitle="Listen to papers sequentially"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You can listen to all search results one by one in sequence.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setShowListenOneByOne(false)
              // Start listening sequence
            }}
          >
            <MusicalNoteIcon className="w-5 h-5" />
            Start Listening
          </Button>
        </div>
      </BottomSheet>

      {/* Listen One by One Button */}
      {filteredPapers.length > 0 && (
        <button
          onClick={() => setShowListenOneByOne(true)}
          className="fixed bottom-20 left-0 right-0 mx-4 bg-gray-100 rounded-t-2xl p-4 text-gray-900 font-medium flex items-center justify-center gap-2 z-30"
        >
          <MusicalNoteIcon className="w-5 h-5" />
          Listen One by One
        </button>
      )}

      <BottomNav />
    </motion.div>
  )
}

