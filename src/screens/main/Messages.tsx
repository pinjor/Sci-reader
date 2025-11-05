import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/layout/Header'
import Avatar from '../../components/ui/Avatar'

const mockMessages = [
  {
    id: '1',
    name: 'James Smith',
    avatar: '',
    lastMessage: 'Yes, everything is going fantastic.',
    time: '04:15 PM',
  },
  {
    id: '2',
    name: 'James Reynolds',
    avatar: '',
    lastMessage: 'Great! Thanks, Man!',
    time: '12:05 PM',
  },
  {
    id: '3',
    name: 'James Smith',
    avatar: '',
    lastMessage: 'Yeah, everything is going smoothly.',
    time: '12/10/2025',
  },
]

export default function Messages() {
  const navigation = useNavigation<any>()

  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('MessageDetails', { id: item.id })}
    >
      <Avatar name={item.name} size="lg" />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={styles.messageText} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <FlatList
          data={mockMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
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
  listContent: {
    gap: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageText: {
    fontSize: 14,
    color: '#4B5563',
  },
})
