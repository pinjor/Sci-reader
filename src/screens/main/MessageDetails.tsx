import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Avatar from '../../components/ui/Avatar'
import Icon from 'react-native-vector-icons/Ionicons'

const mockConversation = [
  {
    id: '1',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:15 PM',
  },
  {
    id: '2',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:15 PM',
  },
  {
    id: '3',
    sender: 'You',
    message: 'Lorem is simply dummy text the printing typesetting industry. Lorem.',
    isMe: true,
    time: '04:16 PM',
  },
  {
    id: '4',
    sender: 'James Smith',
    message: 'Lorem is simply dummy text of the printing typesetting industry. Lorem Ipsum has been.',
    isMe: false,
    time: '04:16 PM',
  },
  {
    id: '5',
    sender: 'You',
    message: 'Lorem is simply dummy text the printing typesetting industry. Lorem.',
    isMe: true,
    time: '04:17 PM',
  },
]

export default function MessageDetails() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const { id } = route.params || {}
  const [message, setMessage] = useState('')

  const renderMessage = ({ item: msg }: { item: typeof mockConversation[0] }) => (
    <View
      key={msg.id}
      style={[
        styles.messageContainer,
        msg.isMe ? styles.messageContainerRight : styles.messageContainerLeft,
      ]}
    >
      {!msg.isMe && <Avatar name={msg.sender} size="sm" />}
      <View
        style={[
          styles.messageBubble,
          msg.isMe ? styles.messageBubbleRight : styles.messageBubbleLeft,
        ]}
      >
        <Text style={styles.messageText}>{msg.message}</Text>
      </View>
    </View>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerBreadcrumb}>Messages</Text>
          <Text style={styles.headerSeparator}>›</Text>
          <Text style={styles.headerTitle}>James Smith</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatars */}
        <View style={styles.avatarsContainer}>
          <Avatar name="James Smith" size="lg" />
          <Avatar name="You" size="lg" />
        </View>

        <Text style={styles.dateText}>12/10/2025 - 04:15 PM</Text>

        <FlatList
          data={mockConversation}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.conversationContainer}
        />

        <Text style={styles.seenText}>Just Seen</Text>
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if (message.trim()) {
              // Send message
              setMessage('')
            }
          }}
        >
          <Icon name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBreadcrumb: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerSeparator: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  conversationContainer: {
    gap: 16,
    marginBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  messageContainerLeft: {
    justifyContent: 'flex-start',
  },
  messageContainerRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
  },
  messageBubbleLeft: {
    backgroundColor: '#F3F4F6',
  },
  messageBubbleRight: {
    backgroundColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 14,
    color: '#111827',
  },
  seenText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0072FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
