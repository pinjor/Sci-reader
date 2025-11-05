import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

export default function PasswordScreen() {
  const navigation = useNavigation<any>()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    if (password.length >= 8) {
      // In real app, validate and save password
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
            <Text style={styles.title}>Create your password</Text>
          </View>

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Create a new password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password-new"
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

          {/* Continue Button */}
          <Button
            variant="primary"
            fullWidth
            onPress={handleSubmit}
            disabled={password.length < 8}
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
  passwordContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -12,
    padding: 8,
  },
})
