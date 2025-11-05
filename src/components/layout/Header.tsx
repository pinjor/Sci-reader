import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Avatar from '../ui/Avatar'
import SearchBar from '../ui/SearchBar'

interface HeaderProps {
  showSearch?: boolean
}

export default function Header({ showSearch = true }: HeaderProps) {
  const navigation = useNavigation<any>()

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => {
            // Navigate to MainTabs if not already there
            if (navigation.canGoBack()) {
              navigation.navigate('MainTabs', { screen: 'HomeFeed' })
            } else {
              navigation.navigate('MainTabs')
            }
          }}>
            <Text style={styles.logo}>SciRadar</Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={styles.iconButton}
            >
              <Icon name="notifications-outline" size={24} color="#4B5563" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('YourPapers')}
              style={styles.iconButton}
            >
              <Icon name="bookmark-outline" size={24} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar name="John Doe" size="md" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        {showSearch && <SearchBar />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingTop: 8,
    paddingBottom: 8,
  },
  container: {
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0072FF',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: '#F97316',
    borderRadius: 4,
  },
})
