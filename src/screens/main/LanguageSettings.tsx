import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

const languages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
]

export default function LanguageSettings() {
  const navigation = useNavigation<any>()
  const [selectedLanguage, setSelectedLanguage] = useState('es')

  const handleSave = () => {
    // In real app, save language preference and restart app
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
            <Text style={styles.currentPage}>Language</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={styles.title}>Language</Text>

        <View style={styles.optionsContainer}>
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.id
            return (
              <TouchableOpacity
                key={language.id}
                onPress={() => setSelectedLanguage(language.id)}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                <View style={styles.optionContent}>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.optionText}>{language.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Save Button */}
        <Button variant="primary" fullWidth onPress={handleSave}>
          Save Changes & Restart App
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
