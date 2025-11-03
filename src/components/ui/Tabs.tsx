import { ReactNode } from 'react'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
  children: ReactNode
}

export default function Tabs({ tabs, activeTab, onTabChange, children }: TabsProps) {
  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-soft'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{children}</div>
    </div>
  )
}

