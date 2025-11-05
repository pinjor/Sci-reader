import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'info'
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return styles.success
      case 'warning':
        return styles.warning
      case 'info':
        return styles.info
      default:
        return styles.default
    }
  }

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'success':
        return styles.successText
      case 'warning':
        return styles.warningText
      case 'info':
        return styles.infoText
      default:
        return styles.defaultText
    }
  }

  return (
    <View style={[styles.badge, getVariantStyles()]}>
      <Text style={[styles.text, getTextVariantStyles()]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#F3F4F6',
  },
  success: {
    backgroundColor: '#D1FAE5',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  info: {
    backgroundColor: '#DBEAFE',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  defaultText: {
    color: '#374151',
  },
  successText: {
    color: '#065F46',
  },
  warningText: {
    color: '#92400E',
  },
  infoText: {
    color: '#1E40AF',
  },
})
