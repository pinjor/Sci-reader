import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../../components/layout/Header'
import PaperCard from '../../components/ui/PaperCard'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function HomeFeed() {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const insets = useSafeAreaInsets()
  const { papers, updatePaper, projects, addProject } = useApp()
  const [showSaveToLibrary, setShowSaveToLibrary] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [currentPaperId, setCurrentPaperId] = useState<string | null>(null)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProjectTitle, setNewProjectTitle] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private')

  const handleShare = async (paper: any) => {
    try {
      await Share.open({
        title: paper.title,
        message: paper.abstract,
      })
    } catch (error) {
      Alert.alert('Share', 'Paper link copied to clipboard!')
    }
  }

  const renderPaper = ({ item: paper }: { item: any }) => (
    <PaperCard
      id={paper.id}
      title={paper.title}
      authors={paper.authors}
      year={paper.year}
      source={paper.source}
      citations={paper.citations}
      abstract={paper.abstract}
      badges={paper.badges}
      saved={paper.saved}
      listened={paper.listened}
      onSave={() => {
        if (!paper.saved) {
          setCurrentPaperId(paper.id)
          setShowSaveToLibrary(true)
          setSelectedProjects(['visual-design-trend'])
        } else {
          updatePaper(paper.id, { saved: false })
        }
      }}
      onListen={() =>
        updatePaper(paper.id, { listened: !paper.listened })
      }
      onShare={() => handleShare(paper)}
    />
  )

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Carousel Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
              style={styles.bannerImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>FRONTIERS OF DISCOVERY</Text>
                <Text style={styles.bannerSubtitle}>
                  Propelling Knowledge Beyond Horizons
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.bannerDots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* Feed Section */}
        <View style={styles.feedContainer}>
          <Text style={styles.feedTitle}>Feed for You</Text>

          {papers.length > 0 ? (
            <FlatList
              data={papers}
              renderItem={renderPaper}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.papersContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No new papers found.</Text>
              <Button
                variant="outline"
                onPress={() => navigation.navigate('Search')}
                style={styles.exploreButton}
              >
                Explore Papers
              </Button>
            </View>
          )}

          {/* Advertisement Banner */}
          <View style={styles.adContainer}>
            <LinearGradient
              colors={['#F97316', '#EF4444']}
              style={styles.adBanner}
            >
              <Text style={styles.adTitle}>LIMITED TIME OFFER</Text>
              <Text style={styles.adSubtitle}>BLACK FRIDAY MEGA SALE</Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Save to Library Bottom Sheet */}
      <BottomSheet
        isOpen={showSaveToLibrary}
        onClose={() => {
          setShowSaveToLibrary(false)
          setSelectedProjects([])
          setCurrentPaperId(null)
        }}
        title="Paper Saved"
        subtitle="Paper saved to default."
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetSection}>
            <Text style={styles.bottomSheetTitle}>Save to Library</Text>
            <ScrollView style={styles.projectsList} showsVerticalScrollIndicator={false}>
              {projects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={styles.projectOption}
                  onPress={() => {
                    if (selectedProjects.includes(project.id)) {
                      setSelectedProjects(
                        selectedProjects.filter((id) => id !== project.id)
                      )
                    } else {
                      setSelectedProjects([...selectedProjects, project.id])
                    }
                  }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedProjects.includes(project.id) && styles.checkboxSelected,
                    ]}
                  >
                    {selectedProjects.includes(project.id) && (
                      <Icon name="checkmark" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.projectText}>{project.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => setShowCreateProject(true)}
            style={styles.createProjectButton}
          >
            <Icon name="add" size={20} color="#0072FF" />
            <Text style={styles.createProjectText}>Create New Project</Text>
          </TouchableOpacity>
          <Button
            variant="primary"
            fullWidth
            onPress={() => {
              if (currentPaperId) {
                updatePaper(currentPaperId, { saved: true })
              }
              setShowSaveToLibrary(false)
              setSelectedProjects([])
              setCurrentPaperId(null)
            }}
          >
            Done
          </Button>
        </View>
      </BottomSheet>

      {/* Create Project Bottom Sheet */}
      <BottomSheet
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false)
          setNewProjectTitle('')
        }}
        title="Create New Project"
        subtitle="Start a new project to organize your research."
      >
        <View style={styles.bottomSheetContent}>
          <Input
            placeholder="Project Title"
            value={newProjectTitle}
            onChangeText={setNewProjectTitle}
            style={styles.input}
          />
          <View style={styles.privacyContainer}>
            <Text style={styles.privacyLabel}>Privacy:</Text>
            <View style={styles.privacyOptions}>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={() => setPrivacy('private')}
              >
                <View style={[styles.radio, privacy === 'private' && styles.radioSelected]}>
                  {privacy === 'private' && (
                    <Icon name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.privacyText}>Private</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={() => setPrivacy('public')}
              >
                <View style={[styles.radio, privacy === 'public' && styles.radioSelected]}>
                  {privacy === 'public' && (
                    <Icon name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.privacyText}>Public</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            variant="primary"
            fullWidth
            onPress={() => {
              if (newProjectTitle.trim()) {
                const newProject = {
                  id: Date.now().toString(),
                  title: newProjectTitle,
                  papers: currentPaperId ? [currentPaperId] : [],
                  members: ['john-doe'],
                  privacy,
                  createdAt: new Date().toISOString(),
                }
                addProject(newProject)
                if (currentPaperId) {
                  setSelectedProjects([...selectedProjects, newProject.id])
                }
                setShowCreateProject(false)
                setNewProjectTitle('')
              }
            }}
            disabled={!newProjectTitle.trim()}
          >
            Create Project
          </Button>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  banner: {
    height: 192,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 24,
  },
  bannerContent: {
    gap: 8,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bannerDots: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    marginLeft: -24,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  feedContainer: {
    paddingHorizontal: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  papersContainer: {
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  exploreButton: {
    marginTop: 8,
  },
  adContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  adBanner: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  adSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottomSheetContent: {
    gap: 16,
  },
  bottomSheetSection: {
    marginBottom: 8,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  projectsList: {
    maxHeight: 200,
  },
  projectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
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
  projectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  createProjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  createProjectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0072FF',
  },
  input: {
    marginBottom: 16,
  },
  privacyContainer: {
    marginBottom: 16,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  privacyText: {
    fontSize: 14,
    color: '#374151',
  },
})
