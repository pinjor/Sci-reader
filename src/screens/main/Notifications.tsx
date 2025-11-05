import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Card from '../../components/ui/Card'

const notifications = [
  {
    id: '1',
    type: 'invitation',
    title: 'Invitation to a Project',
    message: "John Doe has invited you as a member of the 'Website Re-design UI/UX' project.",
    image: '',
  },
  {
    id: '2',
    type: 'follower',
    title: 'New Follower!',
    message: 'James Smith just followed you.',
    image: '',
  },
  {
    id: '3',
    type: 'paper',
    title: 'New paper has been published',
    message: "A paper titled 'Website Re-design UI/UX' has been published on ResearchGate.",
    image: '',
  },
]

export default function Notifications() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <Card
      style={styles.notificationCard}
      onPress={() => {
        // Navigate based on notification type
        if (item.type === 'invitation') {
          navigation.navigate('MainTabs', { screen: 'MyLibrary' })
        } else if (item.type === 'follower') {
          navigation.navigate('ProfileList')
        } else if (item.type === 'paper') {
          navigation.navigate('YourPapers')
        }
      }}
    >
      <View style={styles.notificationImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </Card>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.notificationsList}
        />
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
  notificationsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  notificationImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#4B5563',
  },
})
