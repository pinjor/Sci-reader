import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function ChangePassword() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')

  const handleContinue = () => {
    if (email.trim() && email.includes('@')) {
      // In real app, send OTP to email
      navigation.navigate('OTP')
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
              <Text style={styles.backText}>Settings</Text>
              <Text style={styles.separator}>›</Text>
              <Text style={styles.currentPage}>Change Password</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentSection}>
            <Text style={styles.title}>Want to change your password?</Text>

            <View style={styles.inputSection}>
              <Text style={styles.hint}>
                Enter your email like this:{' '}
                <Text style={styles.underline}>ui..........id@gmail.com</Text>
              </Text>

              <Input
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                icon={<Icon name="mail" size={20} color="#9CA3AF" />}
                style={styles.input}
              />

              <Text style={styles.description}>
                We will send an OTP to this email address.
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <Button
            variant="primary"
            fullWidth
            onPress={handleContinue}
            disabled={!email.trim() || !email.includes('@')}
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
  separator: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  currentPage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  contentSection: {
    marginBottom: 32,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  inputSection: {
    gap: 8,
  },
  hint: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  input: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
})
