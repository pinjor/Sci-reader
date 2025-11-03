import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'
import Header from '../../components/layout/Header'
import BottomNav from '../../components/layout/BottomNav'
import Avatar from '../../components/ui/Avatar'

const mockMessages = [
  {
    id: '1',
    name: 'James Smith',
    avatar: '',
    lastMessage: 'Yes, everything is going fantastic.',
    time: '04:15 PM',
  },
  {
    id: '2',
    name: 'James Reynolds',
    avatar: '',
    lastMessage: 'Great! Thanks, Man!',
    time: '12:05 PM',
  },
  {
    id: '3',
    name: 'James Smith',
    avatar: '',
    lastMessage: 'Yeah, everything is going smoothly.',
    time: '12/10/2025',
  },
]

export default function Messages() {
  const navigate = useNavigate()

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-white pb-20"
    >
      <Header />

      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>

        <div className="space-y-4">
          {mockMessages.map((message) => (
            <motion.button
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/messages/${message.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <Avatar name={message.name} size="lg" />
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {message.name}
                  </h3>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {message.lastMessage}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </motion.div>
  )
}

