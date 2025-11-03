import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FolderIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  UserPlusIcon,
  PaperAirplaneIcon,
  PencilIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'

export default function MyProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, papers, updateProject } = useApp()
  const [activeTab, setActiveTab] = useState('papers')
  const [showAddPaper, setShowAddPaper] = useState(false)
  const [showCollaborate, setShowCollaborate] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private')
  const [paperLink, setPaperLink] = useState('')

  const project = projects.find((p) => p.id === id)
  const projectPapers = papers.filter((p) => project?.papers.includes(p.id))

  if (!project) {
    return <div>Project not found</div>
  }

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (project) {
      setProjectTitle(project.title)
      setPrivacy(project.privacy)
    }
  }, [project])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <Header />

      <div className="px-4 py-4">
        {/* Project Header */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FolderIcon className="w-6 h-6 text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900">
                {project.title}
              </h2>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
              </button>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-soft border border-gray-100 min-w-[180px] z-20"
                >
                  <button
                    onClick={() => {
                      setShowEditProject(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-2xl text-sm font-medium text-gray-900 transition-colors"
                  >
                    Edit Project
                  </button>
                  <button
                    onClick={() => {
                      setShowCollaborate(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-900 transition-colors"
                  >
                    Collaborate
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-red-500 transition-colors"
                  >
                    Delete Project
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('notes')
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-2xl text-sm font-medium text-gray-900 transition-colors"
                  >
                    Notes
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <DocumentIcon className="w-4 h-4" />
              {project.papers.length} Papers
            </span>
            <span className="flex items-center gap-1">
              <DocumentIcon className="w-4 h-4" />
              1 Unlisten
            </span>
            <span className="flex items-center gap-1">
              <PencilIcon className="w-4 h-4" />
              2 days ago
            </span>
            <span className="flex items-center gap-1">
              <LockClosedIcon className="w-4 h-4" />
              <span className="capitalize">{project.privacy}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <PencilIcon className="w-4 h-4" />
            <span>John Doe (Admin), Sara Johnson, James Smith</span>
          </div>
        </div>

        <Tabs
          tabs={[
            { id: 'papers', label: 'Papers' },
            { id: 'ai', label: 'AI' },
            { id: 'notes', label: 'Notes' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {activeTab === 'papers' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Saved Papers
                </h3>
                <button
                  onClick={() => setShowAddPaper(true)}
                  className="text-primary font-medium"
                >
                  + Add Paper Manually
                </button>
              </div>

              <div className="space-y-4">
                {projectPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white rounded-2xl p-4 shadow-soft relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-gray-500">Added by John Doe</p>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <EllipsisVerticalIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div
                      onClick={() => navigate(`/paper/${paper.id}`)}
                      className="cursor-pointer"
                    >
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {paper.badges.map((badge, index) => (
                          <Badge
                            key={index}
                            label={badge}
                            variant={
                              badge === 'Open Access' || badge === 'Full Text'
                                ? 'success'
                                : badge === 'Listened'
                                ? 'info'
                                : 'warning'
                            }
                          />
                        ))}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {paper.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {paper.authors.join(', ')} • {paper.year} •{' '}
                        {paper.source} • Cited by {paper.citations}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>
                      <div className="flex justify-center">
                        <Button variant="secondary" onClick={(e) => e.stopPropagation()}>
                          <MusicalNoteIcon className="w-5 h-5" />
                          Listen
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Chat with AI</h3>
              <div className="bg-white rounded-2xl p-4 shadow-soft">
                <p className="text-sm text-gray-700">
                  Write a literature review by combining all the research
                  papers.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-soft">
                <p className="text-sm text-gray-700 mb-4">
                  The purpose of the study was to implement an approach of user
                  experience for a website design. Mostly, I concentrated on
                  revealing and understanding the concepts of UX design which
                  include usability, visual design and human factors affecting
                  the user experience.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Ask anything to AI..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="p-3 bg-primary text-white rounded-2xl">
                  Send
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Member's Comments
              </h3>
              <div className="space-y-4 mb-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 shadow-soft flex gap-3 relative"
                  >
                    <Avatar name={i === 1 ? 'John Doe' : 'James Smith'} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {i === 1 ? 'John Doe' : 'James Smith'}
                        </h4>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <EllipsisVerticalIcon className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Fumigation website is a website owned by PT. Prana
                        Argentum which is used as a platform for disseminating
                        information related to pest control.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Leave a comment"
                    className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <DocumentIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">0/160</span>
                <button className="p-3 bg-primary text-white rounded-2xl">
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </Tabs>
      </div>

      {/* Add Paper Bottom Sheet */}
      <BottomSheet
        isOpen={showAddPaper}
        onClose={() => setShowAddPaper(false)}
        title="Add Paper Manually"
        subtitle="Add a paper by uploading the pdf of the paper."
      >
        <div className="space-y-4">
          <Input placeholder="Paper Title" />
          <Input placeholder="Authors' Name (Separated by comma)" />
          <Input placeholder="Journal Name" />
          <Input placeholder="Publish Year" type="number" />
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
            <DocumentIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="font-medium text-gray-900 mb-2">Upload Paper</p>
            <p className="text-sm text-gray-500">PDF (Max Size: 2 MB)</p>
          </div>
          <Button variant="primary" fullWidth onClick={() => {
            // In a real app, create paper and add to project
            alert('Paper added to project!')
            setShowAddPaper(false)
          }}>
            Add Paper
          </Button>
        </div>
      </BottomSheet>

      {/* Edit Project Bottom Sheet */}
      <BottomSheet
        isOpen={showEditProject}
        onClose={() => setShowEditProject(false)}
        title="Edit Project"
        subtitle="Change project title and privacy very easily."
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
            onClick={() => {
              updateProject(project.id, { title: projectTitle, privacy })
              setShowEditProject(false)
            }}
          >
            Save Changes
          </Button>
        </div>
      </BottomSheet>

      {/* Collaborate Bottom Sheet */}
      <BottomSheet
        isOpen={showCollaborate}
        onClose={() => setShowCollaborate(false)}
        title="Collaborate"
        subtitle="Members can view and add papers in this project."
      >
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Email address"
                icon={<UserIcon className="w-5 h-5 text-gray-400" />}
                className="flex-1"
              />
              <select className="px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Member</option>
                <option>Admin</option>
              </select>
            </div>
            <Button variant="primary" fullWidth>
              Invite to Project
            </Button>
          </div>
      </BottomSheet>

      <BottomNav />
    </motion.div>
  )
}

