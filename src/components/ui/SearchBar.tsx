import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = 'Search' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigation = useNavigation<any>()

  const handleSubmit = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        navigation.navigate('Search', { query: query.trim() })
      }
    }
  }

  const handleVoiceSearch = () => {
    navigation.navigate('VoiceSearch')
  }

  const handleFilter = () => {
    if (query.trim()) {
      navigation.navigate('Search', { query: query.trim(), filter: true })
    } else {
      navigation.navigate('Search')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <Icon name="search" size={20} color="#9CA3AF" />
      </View>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleFilter} style={styles.actionButton}>
          <Icon name="filter" size={20} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVoiceSearch} style={styles.actionButton}>
          <Icon name="mic" size={20} color="#0072FF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    padding: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    padding: 4,
  },
})
