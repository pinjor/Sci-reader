import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

type Step = 'email' | 'name' | 'occupation' | 'interests'

const occupations = [
  'Graduate Student (Master\'s/PhD)',
  'Academic/Professor/Lecturer',
  'Researcher/Scientist',
  'Industry R&D Professional',
  'Data Scientist/Engineer',
  'Healthcare/Clinical Researcher',
  'Policy/Government Researcher',
  'Independent/Self-learner',
  'Other',
]

const interestCategories = [
  {
    category: 'Business, Economics & Management',
    interests: [
      'Marketing',
      'Game Theory',
      'Strategic Management',
      'International Business',
      'Taxation',
      'Emergency Management',
      'Development Economics',
      'Economic Policy',
      'Economic History',
      'Educational Administration',
      'Other',
    ],
  },
  {
    category: 'Health & Medical Sciences',
    interests: [
      'Pharmacy',
      'Diabetes',
      'Psychology',
      'Ophthalmology',
      'Nursing',
      'Oncology',
      'Rheumatology',
      'Obesity',
      'Addiction',
      'Radiology',
      'Nephrology',
      'Surgery',
      'Endocrinology',
      'Other',
    ],
  },
  {
    category: 'Physics & Mathematics',
    interests: [
      'Geometry',
      'Semiconductor',
      'Spectroscopy',
      'Fluid Mechanics',
      'Applied Mathematics',
      'Photonics',
      'Mathematical Physics',
      'Molecular Physics',
      'Thermal Science',
      'Other',
    ],
  },
  {
    category: 'Social Sciences',
    interests: [
      'Anthropology',
      'Education',
      'History',
      'Architecture',
      'Sociology',
      'Military Studies',
      'Political Science',
      'Environmental Studies',
      'Criminology',
      'Higher Education',
      'Criminal Law',
      'Other',
    ],
  },
  {
    category: 'Humanities, Literature & Arts',
    interests: [
      'Music',
      'English Language',
      'Communication',
      'Film Studies',
      'Philosophy',
      'Religion',
      'Literature',
      'Visual Arts',
      'Gender Studies',
      'American Literature',
      'Islamic Studies',
      'African Studies',
      'Asian Studies',
      'Other',
    ],
  },
  {
    category: 'Life & Earth Sciences',
    interests: [
      'Birds',
      'Pest Control',
      'Sustainable Development',
      'Microbiology',
      'Arthropods',
      'Environmental Science',
      'Peptides',
      'Pesticides',
      'Bioinformatics',
      'Life Sciences',
      'Other',
    ],
  },
  {
    category: 'Engineering & Computer Science',
    interests: [
      'Artificial Intelligence',
      'Architecture',
      'Civil Engineering',
      'Mechanical Engineering',
      'Navigation',
      'Multimedia',
      'Combustion',
      'Nanotechnology',
      'Computer Hardware',
      'Computer Vision',
      'Other',
    ],
  },
  {
    category: 'Chemistry & Material Sciences',
    interests: [
      'Organic Chemistry',
      'Composite Materials',
      'Medicinal Chemistry',
      'Catalysis',
      'Structural Chemistry',
      'Other',
    ],
  },
]

export default function SignUpFlow() {
  const navigation = useNavigation<any>()
  const [step, setStep] = useState<Step>('email')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    occupation: '',
    interests: [] as string[],
    otherOccupation: '',
    otherInterest: '',
  })

  const handleNext = () => {
    if (step === 'email') {
      if (formData.email) setStep('name')
    } else if (step === 'name') {
      if (formData.name) setStep('occupation')
    } else if (step === 'occupation') {
      if (formData.occupation) setStep('interests')
    } else if (step === 'interests') {
      if (formData.interests.length > 0) {
        navigation.navigate('OTP')
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What is your email?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
        )
      case 'name':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Hey, what's your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#9CA3AF"
              value={formData.name}
              onChangeText={(value) =>
                setFormData({ ...formData, name: value })
              }
              autoCapitalize="words"
            />
          </View>
        )
      case 'occupation':
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, styles.centeredTitle]}>
              What's your occupation?
            </Text>
            <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
              {occupations.map((occ) => {
                const isOther = occ === 'Other'
                const isSelected = formData.occupation === occ
                return (
                  <View key={occ} style={styles.optionWrapper}>
                    <TouchableOpacity
                      onPress={() =>
                        setFormData({ ...formData, occupation: occ })
                      }
                      style={[
                        styles.option,
                        isSelected && styles.optionSelected,
                      ]}
                    >
                      <View style={styles.optionContent}>
                        <View
                          style={[
                            styles.radio,
                            isSelected && styles.radioSelected,
                          ]}
                        >
                          {isSelected && (
                            <Icon name="checkmark" size={12} color="#FFFFFF" />
                          )}
                        </View>
                        <Text style={styles.optionText}>{occ}</Text>
                      </View>
                    </TouchableOpacity>
                    {isOther && isSelected && (
                      <TextInput
                        style={[styles.input, styles.otherInput]}
                        placeholder="Enter your occupation"
                        placeholderTextColor="#9CA3AF"
                        value={formData.otherOccupation}
                        onChangeText={(value) =>
                          setFormData({ ...formData, otherOccupation: value })
                        }
                      />
                    )}
                  </View>
                )
              })}
            </ScrollView>
          </View>
        )
      case 'interests':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select your interests</Text>
            <ScrollView style={styles.interestsContainer} showsVerticalScrollIndicator={false}>
              {interestCategories.map((category) => (
                <View key={category.category} style={styles.categoryContainer}>
                  <Text style={styles.categoryTitle}>{category.category}</Text>
                  {category.interests.map((interest) => {
                    const selected = formData.interests.includes(interest)
                    const isOther = interest === 'Other'
                    return (
                      <View key={interest} style={styles.interestWrapper}>
                        <TouchableOpacity
                          onPress={() => {
                            if (selected) {
                              setFormData({
                                ...formData,
                                interests: formData.interests.filter(
                                  (i) => i !== interest
                                ),
                              })
                            } else {
                              setFormData({
                                ...formData,
                                interests: [...formData.interests, interest],
                              })
                            }
                          }}
                          style={[
                            styles.interestOption,
                            selected && styles.interestOptionSelected,
                          ]}
                        >
                          <View style={styles.optionContent}>
                            <View
                              style={[
                                styles.checkbox,
                                selected && styles.checkboxSelected,
                              ]}
                            >
                              {selected && (
                                <Icon name="checkmark" size={12} color="#FFFFFF" />
                              )}
                            </View>
                            <Text style={styles.optionText}>{interest}</Text>
                          </View>
                        </TouchableOpacity>
                        {isOther && selected && (
                          <Input
                            placeholder="Add manually"
                            style={styles.otherInput}
                            value={formData.otherInterest}
                            onChangeText={(value) =>
                              setFormData({ ...formData, otherInterest: value })
                            }
                          />
                        )}
                      </View>
                    )
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
        )
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
            {step !== 'interests' && (
              <TouchableOpacity
                onPress={() => navigation.replace('MainTabs')}
                style={styles.skipButton}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Step Content */}
          <View style={styles.stepContent}>{renderStep()}</View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <Button
          variant="primary"
          fullWidth
          onPress={handleNext}
          disabled={
            (step === 'email' && !formData.email) ||
            (step === 'name' && !formData.name) ||
            (step === 'occupation' && !formData.occupation) ||
            (step === 'interests' && formData.interests.length === 0)
          }
        >
          Continue
        </Button>
      </View>
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
    paddingTop: 48,
    paddingBottom: 100,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#4B5563',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  stepContent: {
    marginBottom: 32,
  },
  stepContainer: {
    gap: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  centeredTitle: {
    textAlign: 'center',
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
  optionsContainer: {
    maxHeight: 400,
  },
  optionWrapper: {
    marginBottom: 12,
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: '#0072FF',
    backgroundColor: '#0072FF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  otherInput: {
    marginTop: 8,
  },
  interestsContainer: {
    maxHeight: 500,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 12,
  },
  interestWrapper: {
    marginBottom: 8,
  },
  interestOption: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  interestOptionSelected: {
    borderColor: '#0072FF',
    backgroundColor: '#E8F0FE',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    paddingBottom: 32,
  },
})
