import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FolderIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Badge from '../../components/ui/Badge'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import { useApp } from '../../context/AppContext'

export default function MyLibrary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private')
  const { projects, addProject } = useApp()

  const stats = {
    projects: projects.length,
    papersSaved: 5,
    papersListened: 2,
    projectsCollaborated: 0,
  }

  const handleCreateProject = () => {
    if (projectTitle.trim()) {
      addProject({
        id: Date.now().toString(),
        title: projectTitle,
        papers: [],
        members: ['john-doe'],
        privacy,
        createdAt: new Date().toISOString(),
      })
      setProjectTitle('')
      setShowCreateProject(false)
    }
  }

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <Header />

      <div className="px-4 py-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Library</h2>

        <Tabs
          tabs={[
            { id: 'projects', label: 'My Projects' },
            { id: 'history', label: 'Listen History' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {activeTab === 'projects' && (
            <>
              {/* Quick View */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick View
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-soft text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {String(stats.projects).padStart(2, '0')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Projects in Library
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-soft text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {String(stats.papersSaved).padStart(2, '0')}
                    </p>
                    <p className="text-xs text-gray-500">Paper Saved</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-soft text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {String(stats.papersListened).padStart(2, '0')}
                    </p>
                    <p className="text-xs text-gray-500">Paper Listened</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-soft text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {String(stats.projectsCollaborated).padStart(2, '0')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Project Collaborated
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">My Projects</h3>
                  <button
                    onClick={() => setShowCreateProject(true)}
                    className="text-primary font-medium"
                  >
                    + Create New Project
                  </button>
                </div>

                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <FolderIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{project.papers.length} Papers</span>
                            <span>2 Unlisten</span>
                            <span className="capitalize">{project.privacy}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-500 mb-4">
                      Your project list is empty. Create projects to save papers
                      in an organized way.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowCreateProject(true)}
                    >
                      Create New Project
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Listen History
              </h3>
              <div className="space-y-4">
                {papers
                  .filter((p) => p.listened)
                  .map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-white rounded-2xl p-4 shadow-soft relative"
                    >
                      <p className="text-xs text-gray-500 mb-2">
                        01/10/2025 • 10:10 AM
                      </p>
                      <div className="flex gap-2 mb-2">
                        <Badge label="Open Access" variant="success" />
                        <Badge label="Full Text" variant="success" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {paper.title}
                      </h4>
                      <button
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          // Show context menu
                        }}
                      >
                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                {papers.filter((p) => p.listened).length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-500">No listen history yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Tabs>
      </div>

      {/* Create Project Bottom Sheet */}
      <BottomSheet
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        title="Create New Project"
        subtitle="Just set the project title and privacy."
      >
        <div className="space-y-4">
          <Input
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privacy:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  checked={privacy === 'private'}
                  onChange={() => setPrivacy('private')}
                  className="w-5 h-5 text-primary"
                />
                <span className="text-sm text-gray-700">Private</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  checked={privacy === 'public'}
                  onChange={() => setPrivacy('public')}
                  className="w-5 h-5 text-primary"
                />
                <span className="text-sm text-gray-700">Public</span>
              </label>
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={handleCreateProject}
            disabled={!projectTitle.trim()}
          >
            Create Project
          </Button>
        </div>
      </BottomSheet>

      <BottomNav />
    </motion.div>
  )
}

