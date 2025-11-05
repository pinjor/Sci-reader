import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/layout/Header'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function MyLibrary() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState('projects')
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private')
  const { projects, addProject, papers } = useApp()

  const stats = {
    projects: projects.length,
    papersSaved: 5,
    papersListened: 2,
    projectsCollaborated: 0,
  }

  const handleCreateProject = () => {
    if (projectTitle.trim()) {
      addProject({
        id: Date.now().toString(),
        title: projectTitle,
        papers: [],
        members: ['john-doe'],
        privacy,
        createdAt: new Date().toISOString(),
      })
      setProjectTitle('')
      setShowCreateProject(false)
    }
  }

  const renderProject = ({ item: project }: { item: any }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('MyProjectDetails', { id: project.id })}
    >
      <Icon name="folder" size={32} color="#9CA3AF" />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <View style={styles.projectMeta}>
          <Text style={styles.projectMetaText}>{project.papers.length} Papers</Text>
          <Text style={styles.projectMetaText}>2 Unlisten</Text>
          <Text style={styles.projectMetaText} style={{ textTransform: 'capitalize' }}>
            {project.privacy}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation()
          // Show context menu
        }}
        style={styles.moreButton}
      >
        <Icon name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  const renderHistoryItem = ({ item: paper }: { item: any }) => (
    <View style={styles.historyCard}>
      <Text style={styles.historyDate}>01/10/2025 • 10:10 AM</Text>
      <View style={styles.badgesContainer}>
        <Badge label="Open Access" variant="success" />
        <Badge label="Full Text" variant="success" />
      </View>
      <Text style={styles.historyTitle} numberOfLines={2}>
        {paper.title}
      </Text>
      <TouchableOpacity
        style={styles.historyMoreButton}
        onPress={() => {
          // Show context menu
        }}
      >
        <Icon name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>My Library</Text>

          <Tabs
            tabs={[
              { id: 'projects', label: 'My Projects' },
              { id: 'history', label: 'Listen History' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === 'projects' && (
              <>
                {/* Quick View */}
                <View style={styles.quickView}>
                  <Text style={styles.quickViewTitle}>Quick View</Text>
                  <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>
                        {String(stats.projects).padStart(2, '0')}
                      </Text>
                      <Text style={styles.statLabel}>Projects in Library</Text>
                    </View>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>
                        {String(stats.papersSaved).padStart(2, '0')}
                      </Text>
                      <Text style={styles.statLabel}>Paper Saved</Text>
                    </View>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>
                        {String(stats.papersListened).padStart(2, '0')}
                      </Text>
                      <Text style={styles.statLabel}>Paper Listened</Text>
                    </View>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>
                        {String(stats.projectsCollaborated).padStart(2, '0')}
                      </Text>
                      <Text style={styles.statLabel}>Project Collaborated</Text>
                    </View>
                  </View>
                </View>

                {/* Projects */}
                <View style={styles.projectsSection}>
                  <View style={styles.projectsHeader}>
                    <Text style={styles.projectsTitle}>My Projects</Text>
                    <TouchableOpacity
                      onPress={() => setShowCreateProject(true)}
                      style={styles.createButton}
                    >
                      <Text style={styles.createButtonText}>+ Create New Project</Text>
                    </TouchableOpacity>
                  </View>

                  {projects.length > 0 ? (
                    <FlatList
                      data={projects}
                      renderItem={renderProject}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                      contentContainerStyle={styles.projectsList}
                    />
                  ) : (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        Your project list is empty. Create projects to save papers
                        in an organized way.
                      </Text>
                      <Button
                        variant="primary"
                        onPress={() => setShowCreateProject(true)}
                        style={styles.createProjectButton}
                      >
                        Create New Project
                      </Button>
                    </View>
                  )}
                </View>
              </>
            )}

            {activeTab === 'history' && (
              <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Listen History</Text>
                {papers.filter((p: any) => p.listened).length > 0 ? (
                  <FlatList
                    data={papers.filter((p: any) => p.listened)}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.historyList}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No listen history yet.</Text>
                  </View>
                )}
              </View>
            )}
          </Tabs>
        </View>
      </ScrollView>

      {/* Create Project Bottom Sheet */}
      <BottomSheet
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        title="Create New Project"
        subtitle="Just set the project title and privacy."
      >
        <View style={styles.bottomSheetContent}>
          <Input
            placeholder="Project Title"
            value={projectTitle}
            onChangeText={setProjectTitle}
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
                  {privacy === 'private' && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.privacyText}>Private</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.privacyOption}
                onPress={() => setPrivacy('public')}
              >
                <View style={[styles.radio, privacy === 'public' && styles.radioSelected]}>
                  {privacy === 'public' && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.privacyText}>Public</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            variant="primary"
            fullWidth
            onPress={handleCreateProject}
            disabled={!projectTitle.trim()}
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  quickView: {
    marginBottom: 24,
  },
  quickViewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  projectsSection: {
    marginBottom: 16,
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  createButton: {
    padding: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0072FF',
  },
  projectsList: {
    gap: 16,
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  projectMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  createProjectButton: {
    marginTop: 8,
  },
  historySection: {
    marginTop: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  historyList: {
    gap: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  historyMoreButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  bottomSheetContent: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
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
