import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

export default function VoiceSearch() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [isListening, setIsListening] = useState(true)

  const ring1Scale = useSharedValue(1)
  const ring1Opacity = useSharedValue(0.3)
  const ring2Scale = useSharedValue(1)
  const ring2Opacity = useSharedValue(0.3)
  const micScale = useSharedValue(1)
  const textOpacity = useSharedValue(0)
  const textY = useSharedValue(20)

  useEffect(() => {
    // Ring 1 animation
    ring1Scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(2, { duration: 1000 })
      ),
      -1,
      false
    )
    ring1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      false
    )

    // Ring 2 animation
    ring2Scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(2, { duration: 1000 })
      ),
      -1,
      false
    )
    ring2Opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      false
    )

    // Microphone animation
    micScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 750 }),
        withTiming(1, { duration: 750 })
      ),
      -1,
      false
    )

    // Text animation
    textOpacity.value = withTiming(1, { duration: 500 })
    textY.value = withTiming(0, { duration: 500 })
  }, [])

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ring1Scale.value }],
    opacity: ring1Opacity.value,
  }))

  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ring2Scale.value }],
    opacity: ring2Opacity.value,
  }))

  const micStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }))

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }))

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon name="close" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Search</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Listening Text */}
        <Animated.Text style={[styles.listeningText, textStyle]}>
          Listening ... Speak Now ...
        </Animated.Text>

        {/* Microphone Animation */}
        <View style={styles.micContainer}>
          {/* Outer pulsating rings */}
          <Animated.View style={[styles.ring, styles.ring1, ring1Style]} />
          <Animated.View style={[styles.ring, styles.ring2, ring2Style]} />

          {/* Microphone Icon */}
          <Animated.View style={[styles.mic, micStyle]}>
            <Icon name="mic" size={48} color="#FFFFFF" />
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  listeningText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0072FF',
    marginBottom: 48,
    textAlign: 'center',
  },
  micContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  ring: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: '#00C6FF',
  },
  ring1: {
    borderColor: '#00C6FF',
    opacity: 0.5,
  },
  ring2: {
    borderColor: '#00C6FF',
    opacity: 0.5,
  },
  mic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#00C6FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
})
