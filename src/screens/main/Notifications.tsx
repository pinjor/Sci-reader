import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Card from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'

const notifications = [
  {
    id: '1',
    type: 'invitation',
    title: 'Invitation to a Project',
    message: "John Doe has invited you as a member of the 'Website Re-design UI/UX' project.",
    image: '',
  },
  {
    id: '2',
    type: 'follower',
    title: 'New Follower!',
    message: 'James Smith just followed you.',
    image: '',
  },
  {
    id: '3',
    type: 'paper',
    title: 'New paper has been published',
    message: "A paper titled 'Website Re-design UI/UX' has been published on ResearchGate.",
    image: '',
  },
]

export default function Notifications() {
  const navigate = useNavigate()

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
          <h1 className="font-semibold text-gray-900">Notifications</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className="flex gap-4 p-4 cursor-pointer"
            onClick={() => {}}
          >
            <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

