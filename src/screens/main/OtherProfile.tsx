import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import Header from '../../components/layout/Header'
import Avatar from '../../components/ui/Avatar'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import PaperCard from '../../components/ui/PaperCard'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <View style={styles.profileItem}>
      {icon && (
        <View style={styles.profileIcon}>
          {icon}
        </View>
      )}
      <View style={styles.profileContent}>
        <Text style={styles.profileLabel}>{label}</Text>
        <Text style={styles.profileValue}>{value}</Text>
      </View>
    </View>
  )
}

export default function OtherProfile() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const { id } = route.params || {}
  const [activeTab, setActiveTab] = useState('about')
  const [isFollowing, setIsFollowing] = useState(false)
  const { papers } = useApp()

  // Mock user data - in real app, fetch by id
  const user = {
    id: id || '1',
    name: 'James Smith',
    occupation: 'Scientist',
    orcid: 'https://orcid.org/0000-0001-2345-6789',
    email: 'johndoe@email.com',
    institution: 'Bangladesh University',
    interests: [
      'UI/UX',
      'Product Design',
      'Product Research',
      'Visual Design',
      'App Design',
      'Software Design',
    ],
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
      onSave={() => {}}
      onListen={() => {}}
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
        <Text style={styles.headerTitle}>{user.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Avatar name={user.name} size="lg" />
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileOccupation}>{user.occupation}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              variant={isFollowing ? 'outline' : 'primary'}
              style={styles.actionButton}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Icon name="person-add" size={20} color={isFollowing ? '#0072FF' : '#FFFFFF'} />
              <Text style={[styles.actionButtonText, isFollowing && styles.actionButtonTextOutline]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Button>
            <Button
              variant="secondary"
              style={styles.actionButton}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Messages' })}
            >
              <Icon name="mail" size={20} color="#111827" />
              <Text style={styles.actionButtonText}>Message</Text>
            </Button>
          </View>

          <Tabs
            tabs={[
              { id: 'about', label: 'About' },
              { id: 'papers', label: 'Papers' },
              { id: 'library', label: 'Library' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === 'about' && (
              <View style={styles.tabContent}>
                <ProfileItem
                  icon={<Icon name="briefcase" size={20} color="#0072FF" />}
                  label="Occupation"
                  value={user.occupation}
                />
                {user.orcid && (
                  <ProfileItem
                    icon={<Icon name="link" size={20} color="#0072FF" />}
                    label="ORCID"
                    value={user.orcid}
                  />
                )}
                <ProfileItem
                  icon={<Icon name="mail" size={20} color="#0072FF" />}
                  label="Email (Privacy: Private)"
                  value={user.email}
                />
                {user.institution && (
                  <ProfileItem
                    icon={<Icon name="business" size={20} color="#0072FF" />}
                    label="Institution"
                    value={user.institution}
                  />
                )}
                <ProfileItem
                  icon={<Icon name="settings" size={20} color="#0072FF" />}
                  label="Interests"
                  value={user.interests.join(', ')}
                />
              </View>
            )}

            {activeTab === 'papers' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>{user.name}'s Papers</Text>
                <FlatList
                  data={papers}
                  renderItem={renderPaper}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.papersContainer}
                />
              </View>
            )}

            {activeTab === 'library' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>{user.name}'s Projects</Text>
                <Text style={styles.emptyText}>No projects yet.</Text>
              </View>
            )}
          </Tabs>
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
    paddingTop: 24,
    paddingBottom: 80,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 4,
  },
  profileOccupation: {
    fontSize: 16,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actionButtonTextOutline: {
    color: '#0072FF',
  },
  tabContent: {
    marginTop: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
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
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContent: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  papersContainer: {
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 24,
  },
})
