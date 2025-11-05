import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

export default function OTPVerification() {
  const navigation = useNavigation<any>()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    if (otp.every((digit) => digit !== '')) {
      // In real app, verify OTP here
      navigation.navigate('Password')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={20} color="#4B5563" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              Enter the OTP sent via email to{' '}
              <Text style={styles.emailText}>youremail@email.com</Text>
            </Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleChange(index, value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend */}
          <View style={styles.resendContainer}>
            <TouchableOpacity>
              <Text style={styles.resendText}>Didn't receive OTP? Resend.</Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>00:28</Text>
          </View>

          {/* Continue Button */}
          <Button
            variant="primary"
            fullWidth
            onPress={handleSubmit}
            disabled={!otp.every((digit) => digit !== '')}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    color: '#4B5563',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  emailText: {
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 56,
    height: 56,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: '#4B5563',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 14,
    color: '#6B7280',
  },
})
