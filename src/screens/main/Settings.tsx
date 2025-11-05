import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/ui/Button'

interface SettingItem {
  id: string
  label: string
  value?: string
  hasToggle?: boolean
  toggleValue?: boolean
  onPress?: () => void
  icon: string
}

export default function Settings() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'password',
      label: 'Change Password',
      icon: 'lock-closed',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      id: 'voice',
      label: 'Reading Voice',
      value: 'Male - Smooth',
      icon: 'volume-high',
      onPress: () => navigation.navigate('ReadingVoiceSettings'),
    },
    {
      id: 'language',
      label: 'Language',
      value: 'English',
      icon: 'language',
      onPress: () => navigation.navigate('LanguageSettings'),
    },
    {
      id: 'darkmode',
      label: 'Dark Mode',
      hasToggle: true,
      toggleValue: false,
      icon: 'moon',
    },
    {
      id: 'listening',
      label: 'Listening Mode',
      hasToggle: true,
      toggleValue: false,
      icon: 'headset',
    },
    {
      id: 'notification',
      label: 'Notification',
      hasToggle: true,
      toggleValue: true,
      icon: 'notifications',
    },
    {
      id: 'textsize',
      label: 'Text Size',
      value: 'Medium',
      icon: 'text',
      onPress: () => navigation.navigate('TextSizeSettings'),
    },
  ])

  const helpItems = [
    { label: 'Contact Us', icon: 'mail' },
    { label: 'Get Help', icon: 'help-circle' },
    { label: 'FAQs', icon: 'chatbubbles' },
    { label: 'Privacy Policy', icon: 'shield' },
    { label: 'Terms & Conditions', icon: 'document-text' },
  ]

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((s) =>
        s.id === id ? { ...s, toggleValue: !s.toggleValue } : s
      )
    )
  }

  const renderSetting = (setting: SettingItem, index: number, isLast: boolean) => (
    <TouchableOpacity
      key={setting.id}
      onPress={() => {
        if (setting.hasToggle) {
          toggleSetting(setting.id)
        } else {
          setting.onPress?.()
        }
      }}
      style={[styles.settingItem, !isLast && styles.settingItemBorder]}
    >
      <View style={styles.settingIcon}>
        <Icon name={setting.icon} size={20} color="#4B5563" />
      </View>
      <Text style={styles.settingLabel}>{setting.label}</Text>
      {setting.hasToggle ? (
        <Switch
          value={setting.toggleValue}
          onValueChange={() => toggleSetting(setting.id)}
          trackColor={{ false: '#D1D5DB', true: '#0072FF' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.settingRight}>
          {setting.value && (
            <Text style={styles.settingValue}>{setting.value}</Text>
          )}
          <Icon name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      )}
    </TouchableOpacity>
  )

  const renderHelpItem = (item: { label: string; icon: string }, index: number, isLast: boolean) => (
    <TouchableOpacity
      key={item.label}
      style={[styles.settingItem, !isLast && styles.settingItemBorder]}
    >
      <View style={styles.settingIcon}>
        <Icon name={item.icon} size={20} color="#4B5563" />
      </View>
      <Text style={styles.settingLabel}>{item.label}</Text>
      <Icon name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Settings List */}
          <View style={styles.settingsCard}>
            {settings.map((setting, index) =>
              renderSetting(setting, index, index === settings.length - 1)
            )}
          </View>

          {/* Help & More */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Help and More</Text>
            <View style={styles.settingsCard}>
              {helpItems.map((item, index) =>
                renderHelpItem(item, index, index === helpItems.length - 1)
              )}
            </View>
          </View>

          {/* Delete Account */}
          <Button
            variant="secondary"
            fullWidth
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                      // Handle account deletion
                      navigation.replace('Welcome')
                    },
                  },
                ]
              )
            }}
            style={styles.deleteButton}
          >
            <Icon name="trash" size={20} color="#EF4444" />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
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
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  helpSection: {
    marginBottom: 16,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 8,
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
})
