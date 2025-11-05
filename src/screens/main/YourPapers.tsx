import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import BottomSheet from '../../components/ui/BottomSheet'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function YourPapers() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [showAddPaper, setShowAddPaper] = useState(false)
  const [paperLink, setPaperLink] = useState('')
  const { papers, updatePaper, addPaper } = useApp()

  const handleAddPaper = () => {
    if (paperLink.trim()) {
      // In real app, validate and fetch paper metadata from link
      const newPaper = {
        id: Date.now().toString(),
        title: 'New Paper from Link',
        authors: ['Unknown'],
        year: new Date().getFullYear(),
        source: 'External',
        citations: 0,
        abstract: 'Paper added from link.',
        badges: ['Open Access'],
        saved: true,
        listened: false,
      }
      addPaper(newPaper)
      setPaperLink('')
      setShowAddPaper(false)
    }
  }

  const handleShare = async (paper: any) => {
    try {
      await Share.open({
        title: paper.title,
        message: paper.abstract,
      })
    } catch (error) {
      // Share cancelled or error
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
      onSave={() => updatePaper(paper.id, { saved: !paper.saved })}
      onListen={() => updatePaper(paper.id, { listened: !paper.listened })}
      onShare={() => handleShare(paper)}
    />
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Papers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Papers</Text>
            <TouchableOpacity
              onPress={() => setShowAddPaper(true)}
              style={styles.addButton}
            >
              <Icon name="add" size={20} color="#0072FF" />
              <Text style={styles.addButtonText}>Add Your Paper</Text>
            </TouchableOpacity>
          </View>

          {/* Papers List */}
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
              <Text style={styles.emptyText}>No papers saved yet.</Text>
              <Button
                variant="outline"
                onPress={() => setShowAddPaper(true)}
                style={styles.addFirstButton}
              >
                Add Your First Paper
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Paper Bottom Sheet */}
      <BottomSheet
        isOpen={showAddPaper}
        onClose={() => {
          setShowAddPaper(false)
          setPaperLink('')
        }}
        title="Add Your Paper"
        subtitle="Share the link to your paper."
      >
        <View style={styles.bottomSheetContent}>
          <Input
            placeholder="Paper Link"
            value={paperLink}
            onChangeText={setPaperLink}
            icon={<Icon name="link" size={20} color="#9CA3AF" />}
            style={styles.input}
          />
          <Button
            variant="primary"
            fullWidth
            onPress={handleAddPaper}
            disabled={!paperLink.trim()}
          >
            Add Paper
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0072FF',
  },
  papersContainer: {
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  addFirstButton: {
    marginTop: 8,
  },
  bottomSheetContent: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
})
