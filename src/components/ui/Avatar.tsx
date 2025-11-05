import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  imageUrl?: string
}

export default function Avatar({ name, size = 'md', imageUrl }: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 32
      case 'lg':
        return 64
      default:
        return 40
    }
  }

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 12
      case 'lg':
        return 24
      default:
        return 16
    }
  }

  const sizeValue = getSize()
  const fontSize = getFontSize()

  return (
    <View
      style={[
        styles.avatar,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
        },
      ]}
    >
      {imageUrl ? (
        <View style={styles.imagePlaceholder}>
          <Text style={[styles.text, { fontSize }]}>IMG</Text>
        </View>
      ) : (
        <Text style={[styles.text, { fontSize }]}>{getInitials(name)}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#0072FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
})
