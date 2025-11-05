import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Clipboard } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import Header from '../../components/layout/Header'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function PaperDetails() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const { id } = route.params || {}
  const [activeTab, setActiveTab] = useState('abstract')
  const [playbackSpeed, setPlaybackSpeed] = useState(2.5)
  const { papers, updatePaper } = useApp()

  const paper = papers.find((p: any) => p.id === id)

  if (!paper) {
    return (
      <View style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Paper not found</Text>
        </View>
      </View>
    )
  }

  const handleShare = async () => {
    try {
      await Share.open({
        title: paper.title,
        message: paper.abstract,
      })
    } catch (error) {
      // Share cancelled or error
    }
  }

  const handleCopy = () => {
    Clipboard.setString(`${paper.title}\n\n${paper.abstract}`)
    Alert.alert('Success', 'Paper content copied to clipboard!')
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Your Feed</Text>

          {/* Paper Card */}
          <View style={styles.paperCard}>
            {/* Badges */}
            <View style={styles.badgesContainer}>
              {paper.badges.map((badge: string, index: number) => (
                <Badge
                  key={index}
                  label={badge}
                  variant={
                    badge === 'Open Access' || badge === 'Full Text'
                      ? 'success'
                      : badge === 'Listened'
                      ? 'info'
                      : 'default'
                  }
                />
              ))}
            </View>

            {/* Title */}
            <Text style={styles.paperTitle}>{paper.title}</Text>

            {/* Metadata */}
            <Text style={styles.metadata}>
              {paper.authors.join(', ')} • {paper.year} • {paper.source} • Cited by {paper.citations}
            </Text>

            {/* Tabs */}
            <Tabs
              tabs={[
                { id: 'abstract', label: 'Abstract' },
                { id: 'ai', label: 'AI' },
                { id: 'fullpaper', label: 'Full Paper' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              {activeTab === 'abstract' && (
                <View style={styles.tabContent}>
                  <Text style={styles.abstract}>{paper.abstract}</Text>
                  <View style={styles.controls}>
                    <View style={styles.controlButtons}>
                      <TouchableOpacity style={styles.controlButton}>
                        <Icon name="play" size={20} color="#4B5563" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => updatePaper(paper.id, { saved: !paper.saved })}
                      >
                        <Icon
                          name={paper.saved ? 'bookmark' : 'bookmark-outline'}
                          size={20}
                          color={paper.saved ? '#0072FF' : '#4B5563'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.controlButton} onPress={handleCopy}>
                        <Icon name="copy-outline" size={20} color="#4B5563" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
                        <Icon name="share-outline" size={20} color="#4B5563" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.sliderContainer}>
                      <View style={styles.slider} />
                    </View>
                    <Text style={styles.speedText}>{playbackSpeed}x</Text>
                  </View>
                </View>
              )}

              {activeTab === 'ai' && (
                <View style={styles.tabContent}>
                  <Button
                    variant="secondary"
                    fullWidth
                    onPress={() => {
                      Alert.alert('AI', 'AI explanation would be generated here')
                    }}
                    style={styles.aiButton}
                  >
                    <Icon name="sparkles" size={20} color="#111827" />
                    <Text style={styles.aiButtonText}>Explain the method</Text>
                  </Button>
                  <View style={styles.aiSummary}>
                    <Text style={styles.aiSummaryTitle}>Method Summary:</Text>
                    <Text style={styles.aiSummaryText}>{paper.abstract}</Text>
                    <View style={styles.controls}>
                      <View style={styles.controlButtons}>
                        <TouchableOpacity style={styles.controlButton}>
                          <Icon name="play" size={20} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.controlButton} onPress={handleCopy}>
                          <Icon name="copy-outline" size={20} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
                          <Icon name="share-outline" size={20} color="#4B5563" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.sliderContainer}>
                        <View style={styles.slider} />
                      </View>
                      <Text style={styles.speedText}>{playbackSpeed}x</Text>
                    </View>
                  </View>
                  <View style={styles.aiInputContainer}>
                    <Icon name="sparkles" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.aiInput}
                      placeholder="Explain the method"
                      placeholderTextColor="#9CA3AF"
                    />
                    <TouchableOpacity>
                      <Icon name="close" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {activeTab === 'fullpaper' && (
                <View style={styles.tabContent}>
                  <Text style={styles.fullPaperText}>
                    The full text of this paper is not available.
                  </Text>
                  <Button
                    variant="primary"
                    fullWidth
                    onPress={() => {
                      Alert.alert('Purchase', 'Redirecting to purchase page...')
                    }}
                    style={styles.purchaseButton}
                  >
                    <Icon name="sparkles" size={20} color="#FFFFFF" />
                    <Text style={styles.purchaseButtonText}>Purchase Full Paper</Text>
                  </Button>
                </View>
              )}
            </Tabs>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  paperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  metadata: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  tabContent: {
    marginTop: 16,
  },
  abstract: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 24,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  controlButton: {
    padding: 8,
    borderRadius: 8,
  },
  sliderContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  slider: {
    width: '50%',
    height: '100%',
    backgroundColor: '#0072FF',
    borderRadius: 2,
  },
  speedText: {
    fontSize: 14,
    color: '#6B7280',
  },
  aiButton: {
    marginBottom: 16,
  },
  aiButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  aiSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  aiSummaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  aiSummaryText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
  },
  aiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  aiInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  fullPaperText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  purchaseButton: {
    marginTop: 8,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
})
