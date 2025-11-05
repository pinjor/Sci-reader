import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

const textSizes = ['Small', 'Medium', 'Large']

export default function TextSizeSettings() {
  const navigation = useNavigation<any>()
  const [selectedSize, setSelectedSize] = useState('Medium')

  const handleSave = () => {
    // In real app, save text size preference
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
            <Text style={styles.currentPage}>Text Size</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={styles.title}>Text Size</Text>

        <View style={styles.optionsContainer}>
          {textSizes.map((size) => {
            const isSelected = selectedSize === size
            return (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                <View style={styles.optionContent}>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.optionText}>{size}</Text>
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
