interface BadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'info' | 'default'
  icon?: React.ReactNode
}

export default function Badge({ label, variant = 'default', icon }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    info: 'bg-purple-100 text-purple-700',
    default: 'bg-gray-100 text-gray-700',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${variants[variant]}`}>
      {icon && <span className="w-3 h-3">{icon}</span>}
      {label}
    </span>
  )
}

