import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

export default function SignInScreen() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    if (email && password) {
      // In real app, authenticate user here
      navigation.replace('MainTabs')
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
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>
              Enter your credentials to access your account
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                // Navigate to forgot password
                // navigation.navigate('ForgotPassword')
              }}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <Button
            variant="primary"
            fullWidth
            onPress={handleSubmit}
            disabled={!email || !password}
          >
            Sign In
          </Button>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
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
  form: {
    marginBottom: 32,
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    color: '#111827',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -12,
    padding: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotText: {
    fontSize: 14,
    color: '#0072FF',
  },
  signUpContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#4B5563',
  },
  signUpLink: {
    color: '#0072FF',
    fontWeight: '500',
  },
})
