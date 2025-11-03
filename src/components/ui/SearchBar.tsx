import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { MicrophoneIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import Input from './Input'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = 'Search' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }
    }
  }

  const handleVoiceSearch = () => {
    navigate('/voice-search')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-24 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => {
              // Navigate to search page with filter option
              if (query.trim()) {
                navigate(`/search?q=${encodeURIComponent(query)}&filter=true`)
              } else {
                navigate('/search')
              }
            }}
          >
            <FunnelIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={handleVoiceSearch}
          >
            <MicrophoneIcon className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </form>
  )
}

