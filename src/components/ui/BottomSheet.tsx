import React, { ReactNode } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  subtitle?: string
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  subtitle,
}: BottomSheetProps) {
  const translateY = useSharedValue(500)
  const opacity = useSharedValue(0)

  React.useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 })
      opacity.value = withTiming(1, { duration: 200 })
    } else {
      translateY.value = withSpring(500, { damping: 20, stiffness: 90 })
      opacity.value = withTiming(0, { duration: 200 })
    }
  }, [isOpen])

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.sheet, sheetStyle]}>
        {/* Drag Handle */}
        <View style={styles.dragHandle}>
          <View style={styles.dragHandleBar} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 32,
  },
  dragHandle: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandleBar: {
    width: 48,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})
