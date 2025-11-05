import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import Header from '../../components/layout/Header'
import PaperCard from '../../components/ui/PaperCard'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import BottomSheet from '../../components/ui/BottomSheet'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

export default function Search() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const query = route.params?.query || ''
  const [activeTab, setActiveTab] = useState('abstract')
  const [showFilters, setShowFilters] = useState(false)
  const [showListenOneByOne, setShowListenOneByOne] = useState(false)
  const [filters, setFilters] = useState({
    papers: true,
    users: false,
    citationHighToLow: true,
    publishDateNewToOld: true,
    citation: '',
    publishYear: '',
    articleType: '',
    openAccess: '',
  })
  const { papers, updatePaper } = useApp()

  const filteredPapers = papers.filter(
    (paper: any) =>
      paper.title.toLowerCase().includes(query.toLowerCase()) ||
      paper.authors.some((author: string) =>
        author.toLowerCase().includes(query.toLowerCase())
      )
  )

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
      onSave={() => updatePaper(paper.id, { saved: !paper.saved })}
      onListen={() => updatePaper(paper.id, { listened: !paper.listened })}
      onShare={() => handleShare(paper)}
    />
  )

  return (
    <View style={styles.container}>
      <Header showSearch={false} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Search Bar with Filter Button */}
          <View style={styles.searchContainer}>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                value={query}
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
                editable={false}
              />
              <TouchableOpacity
                onPress={() => setShowFilters(true)}
                style={styles.filterButton}
              >
                <Icon name="filter" size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {/* Content Type Filter */}
            <View style={styles.contentTypeFilter}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setFilters({ ...filters, papers: !filters.papers })}
              >
                <View style={[styles.checkbox, filters.papers && styles.checkboxChecked]}>
                  {filters.papers && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxLabel}>Papers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setFilters({ ...filters, users: !filters.users })}
              >
                <View style={[styles.checkbox, filters.users && styles.checkboxChecked]}>
                  {filters.users && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxLabel}>Users</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.searchResultTitle}>
              Search result for "{query}"
            </Text>

            <View style={styles.sortOptions}>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => setFilters({ ...filters, citationHighToLow: !filters.citationHighToLow })}
              >
                <View style={[styles.smallCheckbox, filters.citationHighToLow && styles.smallCheckboxChecked]}>
                  {filters.citationHighToLow && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.sortOptionText}>Citation (High to Low)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => setFilters({ ...filters, publishDateNewToOld: !filters.publishDateNewToOld })}
              >
                <View style={[styles.smallCheckbox, filters.publishDateNewToOld && styles.smallCheckboxChecked]}>
                  {filters.publishDateNewToOld && <Icon name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.sortOptionText}>Publish Date (New to Old)</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Results */}
          {filteredPapers.length > 0 ? (
            <FlatList
              data={filteredPapers}
              renderItem={renderPaper}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.papersContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found for your search.</Text>
              <Button
                variant="outline"
                onPress={() => navigation.navigate('MainTabs', { screen: 'HomeFeed' })}
                style={styles.browseButton}
              >
                Browse All Papers
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Listen One by One Button */}
      {filteredPapers.length > 0 && (
        <TouchableOpacity
          onPress={() => setShowListenOneByOne(true)}
          style={styles.listenButton}
        >
          <Icon name="musical-notes" size={20} color="#111827" />
          <Text style={styles.listenButtonText}>Listen One by One</Text>
        </TouchableOpacity>
      )}

      {/* Filters Bottom Sheet */}
      <BottomSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        subtitle="Refine your search results"
      >
        <View style={styles.filterContent}>
          {/* Citation */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Citation</Text>
            {['<= 100', '101 - 250', '251 - 500', '> 500'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setFilters({ ...filters, citation: option })}
              >
                <View style={[styles.checkbox, filters.citation === option && styles.checkboxChecked]}>
                  {filters.citation === option && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.filterOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Publish Year */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Publish Year</Text>
            {['2025', '2021-2024', '2015-2020', 'Before 2015'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setFilters({ ...filters, publishYear: option })}
              >
                <View style={[styles.checkbox, filters.publishYear === option && styles.checkboxChecked]}>
                  {filters.publishYear === option && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.filterOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Article Type */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Article Type</Text>
            {['Review Paper', 'Original Paper', 'Thesis'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setFilters({ ...filters, articleType: option })}
              >
                <View style={[styles.checkbox, filters.articleType === option && styles.checkboxChecked]}>
                  {filters.articleType === option && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.filterOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Open Access */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Open Access</Text>
            {['Yes', 'No'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setFilters({ ...filters, openAccess: option })}
              >
                <View style={[styles.checkbox, filters.openAccess === option && styles.checkboxChecked]}>
                  {filters.openAccess === option && <Icon name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.filterOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            variant="primary"
            fullWidth
            onPress={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </View>
      </BottomSheet>

      {/* Listen One by One Bottom Sheet */}
      <BottomSheet
        isOpen={showListenOneByOne}
        onClose={() => setShowListenOneByOne(false)}
        title="Listen One by One"
        subtitle="Listen to papers sequentially"
      >
        <View style={styles.listenContent}>
          <Text style={styles.listenText}>
            You can listen to all search results one by one in sequence.
          </Text>
          <Button
            variant="primary"
            fullWidth
            onPress={() => {
              setShowListenOneByOne(false)
              // Start listening sequence
            }}
          >
            <Icon name="musical-notes" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Start Listening</Text>
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
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contentTypeFilter: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  checkboxChecked: {
    borderColor: '#0072FF',
    backgroundColor: '#0072FF',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  searchResultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: '45%',
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCheckboxChecked: {
    borderColor: '#0072FF',
    backgroundColor: '#0072FF',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#374151',
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
  browseButton: {
    marginTop: 8,
  },
  listenButton: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 30,
  },
  listenButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  filterContent: {
    gap: 24,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  listenContent: {
    gap: 16,
  },
  listenText: {
    fontSize: 14,
    color: '#4B5563',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
})
