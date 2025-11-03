import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import Button from './Button'
import Badge from './Badge'

interface PaperCardProps {
  id?: string
  title: string
  authors: string[]
  year: number
  source: string
  citations: number
  abstract: string
  badges: string[]
  saved?: boolean
  listened?: boolean
  onSave?: () => void
  onListen?: () => void
  onShare?: () => void
  onClick?: () => void
}

export default function PaperCard({
  id,
  title,
  authors,
  year,
  source,
  citations,
  abstract,
  badges,
  saved = false,
  listened = false,
  onSave,
  onListen,
  onShare,
  onClick,
}: PaperCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else if (id) {
      navigate(`/paper/${id}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      {/* Badges */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {badges.map((badge, index) => (
          <Badge key={index} label={badge} variant={getBadgeVariant(badge)} />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Metadata */}
      <p className="text-sm text-gray-500 mb-2">
        {authors.join(', ')} • {year} • {source} • Cited by {citations}
      </p>

      {/* Abstract */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{abstract}</p>

      {/* Actions */}
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant={saved ? 'primary' : 'outline'}
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation()
            onSave?.()
          }}
        >
          <BookmarkIcon className="w-5 h-5" />
          {saved ? 'Saved' : 'Save'}
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation()
            onListen?.()
          }}
        >
          {listened ? (
            <MusicalNoteIcon className="w-5 h-5 text-purple-500" />
          ) : (
            <MusicalNoteIcon className="w-5 h-5" />
          )}
          Listen
        </Button>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation()
            onShare?.()
          }}
        >
          <ShareIcon className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  )
}

function getBadgeVariant(badge: string): 'success' | 'warning' | 'info' {
  if (badge === 'Open Access' || badge === 'Full Text') return 'success'
  if (badge === 'Listened') return 'info'
  return 'warning'
}

