import React, { ReactNode } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
  children: ReactNode
}

export default function Tabs({ tabs, activeTab, onTabChange, children }: TabsProps) {
  return (
    <View>
      {/* Tab Headers */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#0072FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    marginTop: 8,
  },
})
