import { Link } from 'react-router-dom'
import { BellIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import SearchBar from '../ui/SearchBar'

interface HeaderProps {
  showSearch?: boolean
}

export default function Header({ showSearch = true }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 bg-white z-20 border-b border-gray-100">
      <div className="px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <Link to="/home" className="text-2xl font-bold text-primary">
            SciRadar
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <button
              onClick={() => navigate('/papers')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookmarkIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button onClick={() => navigate('/profile')}>
              <Avatar name="John Doe" size="md" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && <SearchBar />}
      </div>
    </header>
  )
}

