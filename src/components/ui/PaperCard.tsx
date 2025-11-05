import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
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
  onPress?: () => void
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
  onPress,
}: PaperCardProps) {
  const navigation = useNavigation<any>()

  const handleCardPress = () => {
    if (onPress) {
      onPress()
    } else if (id) {
      navigation.navigate('PaperDetails', { id })
    }
  }

  return (
    <Pressable
      style={styles.card}
      onPress={handleCardPress}
    >
      {/* Badges */}
      <View style={styles.badgesContainer}>
        {badges.map((badge, index) => (
          <Badge key={index} label={badge} variant={getBadgeVariant(badge)} />
        ))}
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {/* Metadata */}
      <Text style={styles.metadata}>
        {authors.join(', ')} • {year} • {source} • Cited by {citations}
      </Text>

      {/* Abstract */}
      <Text style={styles.abstract} numberOfLines={3}>
        {abstract}
      </Text>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, saved ? styles.actionButtonPrimary : styles.actionButtonOutline]}
          onPress={(e) => {
            e?.stopPropagation?.()
            onSave?.()
          }}
        >
          <Icon name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? '#FFFFFF' : '#0072FF'} />
          <Text style={[styles.actionText, saved && styles.actionTextPrimary]}>
            {saved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={(e) => {
            e?.stopPropagation?.()
            onListen?.()
          }}
        >
          <Icon name="musical-notes" size={20} color={listened ? '#9333EA' : '#111827'} />
          <Text style={styles.actionText}>Listen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButtonIcon, styles.actionButtonSecondary]}
          onPress={(e) => {
            e?.stopPropagation?.()
            onShare?.()
          }}
        >
          <Icon name="share-outline" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

function getBadgeVariant(badge: string): 'success' | 'warning' | 'info' {
  if (badge === 'Open Access' || badge === 'Full Text') return 'success'
  if (badge === 'Listened') return 'info'
  return 'warning'
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  metadata: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  abstract: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  actionButtonPrimary: {
    backgroundColor: '#0072FF',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0072FF',
  },
  actionButtonSecondary: {
    backgroundColor: '#F3F4F6',
  },
  actionButtonIcon: {
    width: 48,
    height: 48,
    flex: 0,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  actionTextPrimary: {
    color: '#FFFFFF',
  },
})
