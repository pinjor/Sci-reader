import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { pageTransition } from '../../utils/animations'
import Avatar from '../../components/ui/Avatar'

const mockConversation = [
  {
    id: '1',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:15 PM',
  },
  {
    id: '2',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:15 PM',
  },
  {
    id: '3',
    sender: 'You',
    message: 'Lorem is simply dummy text the printing typesetting industry. Lorem.',
    isMe: true,
    time: '04:16 PM',
  },
  {
    id: '4',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:16 PM',
  },
  {
    id: '5',
    sender: 'You',
    message: 'Lorem is simply dummy text the printing typesetting industry. Lorem.',
    isMe: true,
    time: '04:17 PM',
  },
]

export default function MessageDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-sm text-gray-500">Messages</span>
          <span className="text-gray-400">›</span>
          <h1 className="font-semibold text-gray-900">James Smith</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Avatars */}
        <div className="flex justify-center gap-4 mb-6">
          <Avatar name="James Smith" size="lg" />
          <Avatar name="You" size="lg" />
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">
          12/10/2025 - 04:15 PM
        </p>

        {mockConversation.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMe && <Avatar name={msg.sender} size="sm" />}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.isMe ? 'bg-gray-100' : 'bg-gray-100'
              }`}
            >
              <p className="text-sm text-gray-900">{msg.message}</p>
            </div>
          </motion.div>
        ))}

        <p className="text-right text-xs text-gray-400">Just Seen</p>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            onClick={() => {
              if (message.trim()) {
                // Send message
                setMessage('')
              }
            }}
            className="p-3 bg-primary text-white rounded-2xl"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

