import React, { ReactNode } from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

interface CardProps {
  children: ReactNode
  style?: ViewStyle
  onPress?: () => void
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default function Card({ children, style, onPress }: CardProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(1.01)
    }
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  if (onPress) {
    return (
      <AnimatedTouchable
        style={[styles.card, style, animatedStyle]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {children}
      </AnimatedTouchable>
    )
  }

  return (
    <AnimatedTouchable style={[styles.card, style]} activeOpacity={1} disabled>
      {children}
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
})
