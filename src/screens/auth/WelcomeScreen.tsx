import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from 'react-native-reanimated'
import Button from '../../components/ui/Button'

export default function WelcomeScreen() {
  const navigation = useNavigation<any>()

  const bubble1Y = useSharedValue(0)
  const bubble1X = useSharedValue(0)
  const bubble2Y = useSharedValue(0)
  const bubble2X = useSharedValue(0)
  const bubble3Y = useSharedValue(0)
  const bubble4Scale = useSharedValue(1)
  const bubble4Opacity = useSharedValue(0.1)

  React.useEffect(() => {
    bubble1Y.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    )
    bubble1X.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    )
    bubble2Y.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      false
    )
    bubble2X.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      false
    )
    bubble3Y.value = withRepeat(
      withSequence(
        withTiming(-25, { duration: 3500 }),
        withTiming(0, { duration: 3500 })
      ),
      -1,
      false
    )
    bubble4Scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2500 }),
        withTiming(1, { duration: 2500 })
      ),
      -1,
      false
    )
    bubble4Opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 2500 }),
        withTiming(0.1, { duration: 2500 })
      ),
      -1,
      false
    )
  }, [])

  const bubble1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: bubble1Y.value }, { translateX: bubble1X.value }],
  }))
  const bubble2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: bubble2Y.value }, { translateX: bubble2X.value }],
  }))
  const bubble3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: bubble3Y.value }],
  }))
  const bubble4Style = useAnimatedStyle(() => ({
    transform: [{ scale: bubble4Scale.value }],
    opacity: bubble4Opacity.value,
  }))

  return (
    <LinearGradient
      colors={['#0072FF', '#007AFF', '#E3F2FD', '#F5F5F5']}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative bubbles */}
        <View style={styles.bubblesContainer} pointerEvents="none">
          <Animated.View style={[styles.bubble, styles.bubble1, bubble1Style]} />
          <Animated.View style={[styles.bubble, styles.bubble2, bubble2Style]} />
          <Animated.View style={[styles.bubble, styles.bubble3, bubble3Style]} />
          <Animated.View style={[styles.bubble, styles.bubble4, bubble4Style]} />
        </View>

        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              <Text style={styles.logoPart1}>Sci</Text>
              <Text style={styles.logoPart2}>Radar</Text>
            </Text>
            <Text style={styles.welcomeText}>Welcome to SciRadar</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              variant="primary"
              fullWidth
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onPress={() => navigation.navigate('SignIn')}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </Button>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to SciRadar's{' '}
              <Text
                style={styles.link}
                onPress={() => Alert.alert('Terms and Conditions', 'Terms and Conditions would be displayed here')}
              >
                Terms and Conditions
              </Text>
              {' '}and acknowledge you've read our{' '}
              <Text
                style={styles.link}
                onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy would be displayed here')}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  bubble1: {
    width: 128,
    height: 128,
    top: 80,
    left: 40,
  },
  bubble2: {
    width: 96,
    height: 96,
    top: 160,
    right: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bubble3: {
    width: 160,
    height: 160,
    bottom: 80,
    left: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bubble4: {
    width: 240,
    height: 240,
    top: '50%',
    left: '50%',
    marginLeft: -120,
    marginTop: -120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    letterSpacing: -0.02,
    marginBottom: 16,
  },
  logoPart1: {
    color: '#0072FF',
  },
  logoPart2: {
    color: '#00C6FF',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  signUpButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signInButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  signInButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
})
