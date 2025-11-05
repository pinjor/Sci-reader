import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

const voiceOptions = [
  { id: 'male-excited', label: 'Male - Excited' },
  { id: 'male-smooth', label: 'Male - Smooth' },
  { id: 'male-slow', label: 'Male - Slow' },
  { id: 'female-excited', label: 'Female - Excited' },
  { id: 'female-smooth', label: 'Female - Smooth' },
  { id: 'female-slow', label: 'Female - Slow' },
]

export default function ReadingVoiceSettings() {
  const navigation = useNavigation<any>()
  const [selectedVoice, setSelectedVoice] = useState('male-smooth')

  const handleSave = () => {
    // In real app, save voice preference
    navigation.navigate('Settings')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
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
            <Text style={styles.currentPage}>Reading Voice</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={styles.title}>Reading Voice</Text>

        <View style={styles.optionsContainer}>
          {voiceOptions.map((option) => {
            const isSelected = selectedVoice === option.id
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedVoice(option.id)}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                <View style={styles.optionContent}>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Save Button */}
        <Button variant="primary" fullWidth onPress={handleSave}>
          Save Changes
        </Button>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  option: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  optionSelected: {
    borderColor: '#0072FF',
    backgroundColor: '#E8F0FE',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0072FF',
    backgroundColor: '#0072FF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
})
