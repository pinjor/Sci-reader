import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated'

export default function SplashScreen() {
  const navigation = useNavigation<any>()
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 })
    scale.value = withTiming(1, { duration: 500 })

    const timer = setTimeout(() => {
      navigation.replace('Welcome')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.logo}>
          <Text style={styles.logoPart1}>Sci</Text>
          <Text style={styles.logoPart2}>Radar</Text>
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    letterSpacing: -0.02,
  },
  logoPart1: {
    color: '#0072FF',
    textShadowColor: '#0072FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  logoPart2: {
    color: '#00C6FF',
    textShadowColor: '#00C6FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
})
