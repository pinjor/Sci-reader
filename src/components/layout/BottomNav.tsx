import { Link, useLocation } from 'react-router-dom'
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import {
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
} from '@heroicons/react/24/solid'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  iconSolid: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    path: '/messages',
    label: 'Message',
    icon: ChatBubbleLeftRightIcon,
    iconSolid: ChatBubbleLeftRightIconSolid,
  },
  {
    path: '/home',
    label: 'Home',
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
  },
  {
    path: '/library',
    label: 'My Library',
    icon: BookOpenIcon,
    iconSolid: BookOpenIconSolid,
  },
]

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const Icon = active ? item.iconSolid : item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-4 transition-colors"
            >
              <Icon
                className={`w-6 h-6 ${
                  active ? 'text-primary' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  active ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

