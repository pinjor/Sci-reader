import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import PaperCard from '../../components/ui/PaperCard'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useApp } from '../../context/AppContext'

export default function HomeFeed() {
  const navigate = useNavigate()
  const { papers, updatePaper, projects, addProject } = useApp()
  const [showSaveToLibrary, setShowSaveToLibrary] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [currentPaperId, setCurrentPaperId] = useState<string | null>(null)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProjectTitle, setNewProjectTitle] = useState('')

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <Header />

      {/* Carousel Banner */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden h-48"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"
            alt="Discovery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              FRONTIERS OF DISCOVERY
            </h2>
            <p className="text-white/90">
              Propelling Knowledge Beyond Horizons
            </p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </div>

      {/* Feed Section */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Feed for You</h2>

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
                onSave={() => {
                  if (!paper.saved) {
                    setCurrentPaperId(paper.id)
                    setShowSaveToLibrary(true)
                    setSelectedProjects(['visual-design-trend'])
                  } else {
                    updatePaper(paper.id, { saved: false })
                  }
                }}
                onListen={() =>
                  updatePaper(paper.id, { listened: !paper.listened })
                }
                onShare={() => {
                  // Share functionality
                  if (navigator.share) {
                    navigator.share({
                      title: paper.title,
                      text: paper.abstract,
                      url: window.location.href,
                    })
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(`${paper.title}\n${window.location.href}`)
                    alert('Paper link copied to clipboard!')
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No new papers found.</p>
            <Button variant="outline" onClick={() => navigate('/search')}>
              Explore Papers
            </Button>
          </div>
        )}

        {/* Advertisement Banner */}
        <div className="mt-6 mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white text-center"
          >
            <p className="font-bold text-lg">LIMITED TIME OFFER</p>
            <p className="text-sm">BLACK FRIDAY MEGA SALE</p>
          </motion.div>
        </div>
      </div>

      {/* Save to Library Bottom Sheet */}
      <BottomSheet
        isOpen={showSaveToLibrary}
        onClose={() => {
          setShowSaveToLibrary(false)
          setSelectedProjects([])
          setCurrentPaperId(null)
        }}
        title="Paper Saved"
        subtitle="Paper saved to default."
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Save to Library
            </h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <label
                  key={project.id}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    if (selectedProjects.includes(project.id)) {
                      setSelectedProjects(
                        selectedProjects.filter((id) => id !== project.id)
                      )
                    } else {
                      setSelectedProjects([...selectedProjects, project.id])
                    }
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedProjects.includes(project.id)
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {selectedProjects.includes(project.id) && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">
                    {project.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setShowCreateProject(true)}
            className="flex items-center gap-2 text-primary font-medium mb-4 hover:text-primary/80 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Create New Project
          </button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              if (currentPaperId) {
                updatePaper(currentPaperId, { saved: true })
              }
              setShowSaveToLibrary(false)
              setSelectedProjects([])
              setCurrentPaperId(null)
            }}
          >
            Done
          </Button>
        </div>
      </BottomSheet>

      {/* Create Project Bottom Sheet */}
      <BottomSheet
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false)
          setNewProjectTitle('')
        }}
        title="Create New Project"
        subtitle="Start a new project to organize your research."
      >
        <div className="space-y-4">
          <Input
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Privacy:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  defaultChecked
                  className="w-5 h-5 text-primary"
                />
                <span className="text-sm text-gray-700">Private</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  className="w-5 h-5 text-primary"
                />
                <span className="text-sm text-gray-700">Public</span>
              </label>
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              if (newProjectTitle.trim()) {
                const newProject = {
                  id: Date.now().toString(),
                  title: newProjectTitle,
                  papers: currentPaperId ? [currentPaperId] : [],
                  members: ['john-doe'],
                  privacy: (document.querySelector('input[name="privacy"]:checked') as HTMLInputElement)?.value === 'public' ? 'public' : 'private',
                  createdAt: new Date().toISOString(),
                }
                addProject(newProject)
                if (currentPaperId) {
                  setSelectedProjects([...selectedProjects, newProject.id])
                }
                setShowCreateProject(false)
                setNewProjectTitle('')
              }
            }}
            disabled={!newProjectTitle.trim()}
          >
            Create Project
          </Button>
        </div>
      </BottomSheet>

      <BottomNav />
    </motion.div>
  )
}

