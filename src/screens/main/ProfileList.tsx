import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Share from 'react-native-share'
import Header from '../../components/layout/Header'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../context/AppContext'

function ProfileItem({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string
  label: string
  value: string
  onPress?: () => void
}) {
  return (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileIcon}>
        <Icon name={icon} size={20} color="#0072FF" />
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.profileLabel}>{label}</Text>
        <Text style={styles.profileValue}>{value}</Text>
      </View>
      {onPress && (
        <Icon name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  )
}

export default function ProfileList() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const { user, papers, projects } = useApp()

  if (!user) return null

  const profileItems = [
    {
      icon: 'briefcase',
      label: 'Occupation',
      value: user.occupation,
    },
    {
      icon: 'link',
      label: 'ORCID',
      value: user.orcid || 'Not set',
    },
    {
      icon: 'mail',
      label: 'Email (Privacy: Private)',
      value: user.email,
    },
    {
      icon: 'business',
      label: 'Institution',
      value: user.institution || 'Not set',
    },
    {
      icon: 'document-text',
      label: 'Papers',
      value: `${papers.length} Papers`,
    },
    {
      icon: 'folder',
      label: 'Library',
      value: `${projects.length} Folders, ${papers.length} Papers, ${papers.filter((p: any) => !p.listened).length} Unlisten`,
    },
    {
      icon: 'settings',
      label: 'Settings',
      value: 'Lang: EN; Mode: Light; Text: Medium',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: 'heart',
      label: 'Interests',
      value: user.interests.join(', '),
    },
    {
      icon: 'card',
      label: 'Subscription',
      value: 'Free',
      onPress: () => navigation.navigate('Subscription'),
    },
  ]

  const littleMoreItems = [
    {
      icon: 'star',
      label: 'Rate Us',
      onPress: () => {
        Alert.alert('Rate Us', 'Opening app store for rating...')
      },
    },
    {
      icon: 'share-social',
      label: 'Invite Friends',
      onPress: async () => {
        try {
          await Share.open({
            title: 'Join me on SciRadar',
            message: 'Discover and collaborate on research papers!',
          })
        } catch (error) {
          Alert.alert('Invite', 'Invite link copied to clipboard!')
        }
      },
    },
  ]

  const renderProfileItem = ({ item }: { item: typeof profileItems[0] }) => (
    <ProfileItem
      icon={item.icon}
      label={item.label}
      value={item.value}
      onPress={item.onPress}
    />
  )

  const renderLittleMoreItem = ({ item }: { item: typeof littleMoreItems[0] }) => (
    <TouchableOpacity
      style={styles.littleMoreItem}
      onPress={item.onPress}
    >
      <View style={styles.littleMoreIcon}>
        <Icon name={item.icon} size={20} color="#0072FF" />
      </View>
      <Text style={styles.littleMoreLabel}>{item.label}</Text>
      <Icon name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
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
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>

          {/* Profile Items */}
          <View style={styles.profileSection}>
            <FlatList
              data={profileItems}
              renderItem={renderProfileItem}
              keyExtractor={(item) => item.label}
              scrollEnabled={false}
              contentContainerStyle={styles.profileItemsContainer}
            />
          </View>

          {/* Little More */}
          <View style={styles.littleMoreSection}>
            <Text style={styles.sectionTitle}>Little More</Text>
            <View style={styles.littleMoreCard}>
              <FlatList
                data={littleMoreItems}
                renderItem={renderLittleMoreItem}
                keyExtractor={(item) => item.label}
                scrollEnabled={false}
                contentContainerStyle={styles.littleMoreContainer}
              />
            </View>
          </View>

          {/* Logout Button */}
          <Button
            variant="secondary"
            fullWidth
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                      navigation.replace('Welcome')
                    },
                  },
                ]
              )
            }}
            style={styles.logoutButton}
          >
            <Icon name="log-out" size={20} color="#111827" />
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
  },
  profileSection: {
    marginBottom: 24,
  },
  profileItemsContainer: {
    gap: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
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
  littleMoreSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  littleMoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  littleMoreContainer: {
    gap: 0,
  },
  littleMoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  littleMoreIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  littleMoreLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
})
