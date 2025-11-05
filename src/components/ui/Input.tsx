import React, { forwardRef } from 'react'
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  icon?: React.ReactNode
  style?: ViewStyle
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, icon, style, ...props }, ref) => {
    return (
      <View style={[styles.container, style]}>
        {label && (
          <Text style={styles.label}>{label}</Text>
        )}
        <View style={styles.inputContainer}>
          {icon && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              icon && styles.inputWithIcon,
              error && styles.inputError,
            ]}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
        </View>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    )
  }
)

Input.displayName = 'Input'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputWithIcon: {
    paddingLeft: 40,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    color: '#EF4444',
  },
})

export default Input
