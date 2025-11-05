import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Modal, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/layout/Header'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function MyProjectDetails() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const { id } = route.params || {}
  const { projects, papers, updateProject, addPaper } = useApp()
  const [activeTab, setActiveTab] = useState('papers')
  const [showAddPaper, setShowAddPaper] = useState(false)
  const [showCollaborate, setShowCollaborate] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private')
  const [paperLink, setPaperLink] = useState('')
  const [paperTitle, setPaperTitle] = useState('')
  const [paperAuthors, setPaperAuthors] = useState('')
  const [paperJournal, setPaperJournal] = useState('')
  const [paperYear, setPaperYear] = useState('')
  const [collaborateEmail, setCollaborateEmail] = useState('')
  const [collaborateRole, setCollaborateRole] = useState('Member')
  const [noteText, setNoteText] = useState('')

  const project = projects.find((p: any) => p.id === id)
  const projectPapers = papers.filter((p: any) => project?.papers.includes(p.id))

  useEffect(() => {
    if (project) {
      setProjectTitle(project.title)
      setPrivacy(project.privacy)
    }
  }, [project])

  if (!project) {
    return (
      <View style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Project not found</Text>
        </View>
      </View>
    )
  }

  const handleAddPaper = () => {
    if (paperTitle.trim() && paperAuthors.trim()) {
      const newPaper = {
        id: Date.now().toString(),
        title: paperTitle,
        authors: paperAuthors.split(',').map((a: string) => a.trim()),
        year: parseInt(paperYear) || new Date().getFullYear(),
        source: paperJournal || 'Unknown',
        citations: 0,
        abstract: 'Paper added manually.',
        badges: ['Open Access'],
        saved: true,
        listened: false,
      }
      addPaper(newPaper)
      updateProject(project.id, {
        papers: [...project.papers, newPaper.id],
      })
      setPaperTitle('')
      setPaperAuthors('')
      setPaperJournal('')
      setPaperYear('')
      setShowAddPaper(false)
      Alert.alert('Success', 'Paper added to project!')
    }
  }

  const renderPaper = ({ item: paper }: { item: any }) => (
    <TouchableOpacity
      style={styles.paperCard}
      onPress={() => navigation.navigate('PaperDetails', { id: paper.id })}
    >
      <View style={styles.paperHeader}>
        <Text style={styles.paperAddedBy}>Added by John Doe</Text>
        <TouchableOpacity style={styles.paperMore}>
          <Icon name="ellipsis-vertical" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <View style={styles.paperContent}>
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
                  : 'warning'
              }
            />
          ))}
        </View>
        <Text style={styles.paperTitle} numberOfLines={2}>
          {paper.title}
        </Text>
        <Text style={styles.paperMetadata}>
          {paper.authors.join(', ')} • {paper.year} • {paper.source} • Cited by {paper.citations}
        </Text>
        <Text style={styles.paperAbstract} numberOfLines={3}>
          {paper.abstract}
        </Text>
        <View style={styles.paperActions}>
          <Button variant="secondary" onPress={(e) => {
            e?.stopPropagation?.()
            // Handle listen
          }}>
            <Icon name="musical-notes" size={20} color="#111827" />
            <Text style={styles.listenText}>Listen</Text>
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderNote = (index: number) => {
    const name = index === 0 ? 'John Doe' : 'James Smith'
    return (
      <View key={index} style={styles.noteCard}>
        <Avatar name={name} size="md" />
        <View style={styles.noteContent}>
          <View style={styles.noteHeader}>
            <Text style={styles.noteName}>{name}</Text>
            <TouchableOpacity style={styles.noteMore}>
              <Icon name="ellipsis-vertical" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.noteText}>
            Fumigation website is a website owned by PT. Prana
            Argentum which is used as a platform for disseminating
            information related to pest control.
          </Text>
        </View>
      </View>
    )
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
          {/* Project Header */}
          <View style={styles.projectHeader}>
            <View style={styles.projectHeaderTop}>
              <View style={styles.projectHeaderLeft}>
                <Icon name="folder" size={24} color="#9CA3AF" />
                <Text style={styles.projectTitle}>{project.title}</Text>
              </View>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  onPress={() => setShowMenu(!showMenu)}
                  style={styles.menuButton}
                >
                  <Icon name="ellipsis-vertical" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {showMenu && (
                  <View style={styles.menu}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        setShowEditProject(true)
                        setShowMenu(false)
                      }}
                    >
                      <Text style={styles.menuItemText}>Edit Project</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        setShowCollaborate(true)
                        setShowMenu(false)
                      }}
                    >
                      <Text style={styles.menuItemText}>Collaborate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        Alert.alert('Delete Project', 'Are you sure?', [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => {
                            // Handle delete
                            navigation.goBack()
                          }},
                        ])
                        setShowMenu(false)
                      }}
                    >
                      <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                        Delete Project
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        setActiveTab('notes')
                        setShowMenu(false)
                      }}
                    >
                      <Text style={styles.menuItemText}>Notes</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.projectMeta}>
              <View style={styles.projectMetaItem}>
                <Icon name="document-text" size={16} color="#6B7280" />
                <Text style={styles.projectMetaText}>{project.papers.length} Papers</Text>
              </View>
              <View style={styles.projectMetaItem}>
                <Icon name="document-text" size={16} color="#6B7280" />
                <Text style={styles.projectMetaText}>1 Unlisten</Text>
              </View>
              <View style={styles.projectMetaItem}>
                <Icon name="pencil" size={16} color="#6B7280" />
                <Text style={styles.projectMetaText}>2 days ago</Text>
              </View>
              <View style={styles.projectMetaItem}>
                <Icon name="lock-closed" size={16} color="#6B7280" />
                <Text style={[styles.projectMetaText, { textTransform: 'capitalize' }]}>
                  {project.privacy}
                </Text>
              </View>
            </View>
            <View style={styles.projectMembers}>
              <Icon name="pencil" size={16} color="#6B7280" />
              <Text style={styles.projectMembersText}>
                John Doe (Admin), Sara Johnson, James Smith
              </Text>
            </View>
          </View>

          <Tabs
            tabs={[
              { id: 'papers', label: 'Papers' },
              { id: 'ai', label: 'AI' },
              { id: 'notes', label: 'Notes' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === 'papers' && (
              <View style={styles.tabContent}>
                <View style={styles.papersHeader}>
                  <Text style={styles.sectionTitle}>Saved Papers</Text>
                  <TouchableOpacity
                    onPress={() => setShowAddPaper(true)}
                    style={styles.addPaperButton}
                  >
                    <Text style={styles.addPaperText}>+ Add Paper Manually</Text>
                  </TouchableOpacity>
                </View>

                {projectPapers.length > 0 ? (
                  <FlatList
                    data={projectPapers}
                    renderItem={renderPaper}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.papersContainer}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No papers in this project yet.</Text>
                  </View>
                )}
              </View>
            )}

            {activeTab === 'ai' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>Chat with AI</Text>
                <View style={styles.aiCard}>
                  <Text style={styles.aiText}>
                    Write a literature review by combining all the research
                    papers.
                  </Text>
                </View>
                <View style={styles.aiCard}>
                  <Text style={styles.aiText}>
                    The purpose of the study was to implement an approach of user
                    experience for a website design. Mostly, I concentrated on
                    revealing and understanding the concepts of UX design which
                    include usability, visual design and human factors affecting
                    the user experience.
                  </Text>
                </View>
                <View style={styles.aiInputContainer}>
                  <TextInput
                    style={styles.aiInput}
                    placeholder="Ask anything to AI..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                  />
                  <TouchableOpacity style={styles.aiSendButton}>
                    <Text style={styles.aiSendText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {activeTab === 'notes' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>Member's Comments</Text>
                <View style={styles.notesContainer}>
                  {[0, 1].map((i) => renderNote(i))}
                </View>
                <View style={styles.noteInputContainer}>
                  <View style={styles.noteInputWrapper}>
                    <Icon name="document-text" size={20} color="#9CA3AF" style={styles.noteInputIcon} />
                    <TextInput
                      style={styles.noteInput}
                      placeholder="Leave a comment"
                      placeholderTextColor="#9CA3AF"
                      value={noteText}
                      onChangeText={setNoteText}
                      multiline
                      maxLength={160}
                    />
                  </View>
                  <Text style={styles.noteCharCount}>{noteText.length}/160</Text>
                  <TouchableOpacity style={styles.noteSendButton}>
                    <Icon name="send" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Tabs>
        </View>
      </ScrollView>

      {/* Add Paper Bottom Sheet */}
      <BottomSheet
        isOpen={showAddPaper}
        onClose={() => {
          setShowAddPaper(false)
          setPaperTitle('')
          setPaperAuthors('')
          setPaperJournal('')
          setPaperYear('')
        }}
        title="Add Paper Manually"
        subtitle="Add a paper by uploading the pdf of the paper."
      >
        <View style={styles.bottomSheetContent}>
          <Input
            placeholder="Paper Title"
            value={paperTitle}
            onChangeText={setPaperTitle}
            style={styles.input}
          />
          <Input
            placeholder="Authors' Name (Separated by comma)"
            value={paperAuthors}
            onChangeText={setPaperAuthors}
            style={styles.input}
          />
          <Input
            placeholder="Journal Name"
            value={paperJournal}
            onChangeText={setPaperJournal}
            style={styles.input}
          />
          <Input
            placeholder="Publish Year"
            value={paperYear}
            onChangeText={setPaperYear}
            keyboardType="number-pad"
            style={styles.input}
          />
          <TouchableOpacity style={styles.uploadArea}>
            <Icon name="document" size={64} color="#9CA3AF" />
            <Text style={styles.uploadTitle}>Upload Paper</Text>
            <Text style={styles.uploadSubtitle}>PDF (Max Size: 2 MB)</Text>
          </TouchableOpacity>
          <Button
            variant="primary"
            fullWidth
            onPress={handleAddPaper}
            disabled={!paperTitle.trim() || !paperAuthors.trim()}
          >
            Add Paper
          </Button>
        </View>
      </BottomSheet>

      {/* Edit Project Bottom Sheet */}
      <BottomSheet
        isOpen={showEditProject}
        onClose={() => setShowEditProject(false)}
        title="Edit Project"
        subtitle="Change project title and privacy very easily."
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
            onPress={() => {
              updateProject(project.id, { title: projectTitle, privacy })
              setShowEditProject(false)
            }}
            disabled={!projectTitle.trim()}
          >
            Save Changes
          </Button>
        </View>
      </BottomSheet>

      {/* Collaborate Bottom Sheet */}
      <BottomSheet
        isOpen={showCollaborate}
        onClose={() => {
          setShowCollaborate(false)
          setCollaborateEmail('')
          setCollaborateRole('Member')
        }}
        title="Collaborate"
        subtitle="Members can view and add papers in this project."
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.collaborateRow}>
            <Input
              placeholder="Email address"
              value={collaborateEmail}
              onChangeText={setCollaborateEmail}
              icon={<Icon name="person" size={20} color="#9CA3AF" />}
              style={styles.collaborateInput}
            />
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={styles.roleButton}
                onPress={() => setCollaborateRole(collaborateRole === 'Member' ? 'Admin' : 'Member')}
              >
                <Text style={styles.roleText}>{collaborateRole}</Text>
                <Icon name="chevron-down" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            variant="primary"
            fullWidth
            onPress={() => {
              if (collaborateEmail.trim()) {
                // Handle invite
                Alert.alert('Success', 'Invitation sent!')
                setShowCollaborate(false)
                setCollaborateEmail('')
              }
            }}
            disabled={!collaborateEmail.trim()}
          >
            Invite to Project
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
  projectHeader: {
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
  projectHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  projectHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  menuItemTextDanger: {
    color: '#EF4444',
  },
  projectMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  projectMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  projectMetaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  projectMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  projectMembersText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabContent: {
    marginTop: 16,
  },
  papersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  addPaperButton: {
    padding: 8,
  },
  addPaperText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0072FF',
  },
  papersContainer: {
    gap: 16,
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
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paperAddedBy: {
    fontSize: 12,
    color: '#6B7280',
  },
  paperMore: {
    padding: 4,
    borderRadius: 8,
  },
  paperContent: {
    gap: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  paperMetadata: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  paperAbstract: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  paperActions: {
    alignItems: 'center',
  },
  listenText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  aiCard: {
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
  aiText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  aiInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  aiInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  aiSendButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#0072FF',
  },
  aiSendText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  notesContainer: {
    gap: 16,
    marginBottom: 16,
  },
  noteCard: {
    flexDirection: 'row',
    gap: 12,
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
  noteContent: {
    flex: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  noteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  noteMore: {
    padding: 4,
    borderRadius: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#4B5563',
  },
  noteInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  noteInputWrapper: {
    flex: 1,
    position: 'relative',
  },
  noteInputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  noteInput: {
    width: '100%',
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingLeft: 40,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  noteCharCount: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  noteSendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0072FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
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
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginTop: 16,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  collaborateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  collaborateInput: {
    flex: 1,
  },
  roleSelector: {
    minWidth: 120,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  roleText: {
    fontSize: 16,
    color: '#111827',
  },
})
