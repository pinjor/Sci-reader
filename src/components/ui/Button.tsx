import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  fullWidth?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  style,
  textStyle,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.98)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primary
      case 'secondary':
        return styles.secondary
      case 'outline':
        return styles.outline
      default:
        return styles.primary
    }
  }

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText
      case 'secondary':
        return styles.secondaryText
      case 'outline':
        return styles.outlineText
      default:
        return styles.primaryText
    }
  }

  return (
    <AnimatedTouchable
      style={[
        styles.base,
        getVariantStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#0072FF'} />
      ) : (
        typeof children === 'string' ? (
          <Text style={[styles.text, getTextVariantStyles(), textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primary: {
    backgroundColor: '#0072FF',
  },
  secondary: {
    backgroundColor: '#F3F4F6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0072FF',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#111827',
  },
  outlineText: {
    color: '#0072FF',
  },
})
