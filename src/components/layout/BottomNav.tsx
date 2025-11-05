import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

interface NavItem {
  path: string
  label: string
  iconOutline: string
  iconSolid: string
}

const navItems: NavItem[] = [
  {
    path: 'Messages',
    label: 'Message',
    iconOutline: 'chatbubbles-outline',
    iconSolid: 'chatbubbles',
  },
  {
    path: 'HomeFeed',
    label: 'Home',
    iconOutline: 'home-outline',
    iconSolid: 'home',
  },
  {
    path: 'MyLibrary',
    label: 'My Library',
    iconOutline: 'library-outline',
    iconSolid: 'library',
  },
]

export default function BottomNav() {
  const navigation = useNavigation<any>()
  const route = useRoute()

  const isActive = (path: string) => {
    // Check if current route name matches
    const currentRoute = route.name
    // For tab navigator, check parent state
    if (route.state?.index !== undefined) {
      const tabRoutes = ['Messages', 'HomeFeed', 'MyLibrary']
      const currentIndex = route.state.index
      return tabRoutes[currentIndex] === path
    }
    return currentRoute === path
  }

  return (
    <View style={styles.nav}>
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const active = isActive(item.path)
          const iconName = active ? item.iconSolid : item.iconOutline

          return (
            <TouchableOpacity
              key={item.path}
              onPress={() => navigation.navigate(item.path)}
              style={styles.navItem}
            >
              <Icon
                name={iconName}
                size={24}
                color={active ? '#0072FF' : '#9CA3AF'}
              />
              <Text
                style={[
                  styles.navLabel,
                  active && styles.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 16,
    paddingTop: 8,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  navLabelActive: {
    color: '#0072FF',
  },
})
