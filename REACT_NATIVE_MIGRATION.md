# React Native Migration Guide

## Overview
This project has been migrated from React Web to React Native. This document outlines what has been completed and what remains.

## ✅ Completed

### Core Setup
- ✅ React Native project structure
- ✅ Package.json with React Native dependencies
- ✅ Babel configuration
- ✅ Metro bundler configuration
- ✅ TypeScript configuration
- ✅ App entry points (index.js, App.tsx)

### Navigation
- ✅ React Navigation setup
- ✅ Stack Navigator for auth screens
- ✅ Tab Navigator for main app
- ✅ All routes defined

### UI Components
- ✅ Button component
- ✅ Card component
- ✅ Input component
- ✅ Badge component
- ✅ Avatar component
- ✅ BottomSheet component
- ✅ SearchBar component
- ✅ Tabs component
- ✅ PaperCard component

### Layout Components
- ✅ Header component
- ✅ BottomNav component

### Context
- ✅ AppContext (compatible as-is, no changes needed)

### Auth Screens
- ✅ SplashScreen
- ✅ WelcomeScreen
- ⏳ SignUpFlow (needs conversion)
- ⏳ SignInScreen (needs conversion)
- ⏳ OTPVerification (needs conversion)
- ⏳ PasswordScreen (needs conversion)

### Main Screens
- ⏳ All main screens need conversion (HomeFeed, Search, Messages, etc.)

## 🔄 Conversion Patterns

### Key Changes from Web to React Native

1. **HTML Elements → React Native Components**
   - `<div>` → `<View>`
   - `<button>` → `<TouchableOpacity>` or `<Pressable>`
   - `<input>` → `<TextInput>`
   - `<p>`, `<h1>`, etc. → `<Text>`
   - `<img>` → `<Image>`
   - `<a>` → `<TouchableOpacity>` with navigation

2. **Styling**
   - Remove Tailwind CSS classes
   - Use `StyleSheet.create()` instead
   - Convert Tailwind utilities:
     - `flex` → `flex: 1`
     - `flex-row` → `flexDirection: 'row'`
     - `items-center` → `alignItems: 'center'`
     - `justify-center` → `justifyContent: 'center'`
     - `p-4` → `padding: 16`
     - `px-4` → `paddingHorizontal: 16`
     - `py-3` → `paddingVertical: 12`
     - `rounded-2xl` → `borderRadius: 16`
     - `bg-white` → `backgroundColor: '#FFFFFF'`
     - `text-primary` → `color: '#0072FF'`
     - `shadow-soft` → Use `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`

3. **Navigation**
   - `useNavigate()` → `useNavigation()` from `@react-navigation/native`
   - `navigate('/path')` → `navigation.navigate('ScreenName')`
   - `useLocation()` → `useRoute()` from `@react-navigation/native`

4. **Icons**
   - `@heroicons/react` → `react-native-vector-icons/Ionicons`
   - Replace icon names with Ionicons equivalents

5. **Animations**
   - `framer-motion` → `react-native-reanimated`
   - Use `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring`, etc.

6. **Forms**
   - Remove `<form>` tags
   - Use `onSubmitEditing` on TextInput instead of form `onSubmit`
   - Use `Alert.alert()` instead of `alert()`

7. **Gradients**
   - Use `react-native-linear-gradient` instead of CSS gradients

8. **Layout**
   - Use `ScrollView` or `FlatList` for scrollable content
   - Use `SafeAreaView` for safe area insets
   - Remove fixed positioning (use absolute positioning instead)

## 📝 Remaining Tasks

### High Priority Screens
1. **HomeFeed** - Main feed screen with papers
2. **Search** - Search results screen
3. **Messages** - Messages list
4. **MyLibrary** - Library screen
5. **Profile** - User profile screen

### Medium Priority Screens
6. **SignUpFlow** - Multi-step signup
7. **SignInScreen** - Sign in screen
8. **PaperDetails** - Paper detail view
9. **Settings** - Settings screen
10. **Notifications** - Notifications list

### Lower Priority Screens
- All other screens (MessageDetails, MyProjectDetails, OtherProfile, etc.)

## 🛠️ How to Convert a Screen

### Step 1: Replace Imports
```typescript
// Remove
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ...Icon } from '@heroicons/react/24/outline'

// Add
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { ... } from 'react-native-reanimated'
```

### Step 2: Replace Navigation
```typescript
// Before
const navigate = useNavigate()
navigate('/path')

// After
const navigation = useNavigation<any>()
navigation.navigate('ScreenName')
```

### Step 3: Convert HTML to React Native
```typescript
// Before
<div className="container">
  <button onClick={handleClick}>Click</button>
  <p>Text</p>
</div>

// After
<View style={styles.container}>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click</Text>
  </TouchableOpacity>
  <Text>Text</Text>
</View>
```

### Step 4: Convert Styling
```typescript
// Before
className="px-4 py-3 bg-white rounded-2xl"

// After
style={styles.card}
// In StyleSheet:
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
})
```

### Step 5: Convert Animations
```typescript
// Before (framer-motion)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>

// After (reanimated)
const opacity = useSharedValue(0)
React.useEffect(() => {
  opacity.value = withTiming(1, { duration: 500 })
}, [])
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}))
<Animated.View style={animatedStyle}>
  <Text>Content</Text>
</Animated.View>
```

## 📦 Dependencies

All required dependencies are already in package.json:
- `react-native` - Core framework
- `@react-navigation/native` - Navigation
- `react-native-reanimated` - Animations
- `react-native-vector-icons` - Icons
- `react-native-linear-gradient` - Gradients
- `react-native-safe-area-context` - Safe areas
- `react-native-gesture-handler` - Gestures

## 🚀 Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## 📌 Notes

- All screens should use `SafeAreaView` or wrap content in `ScrollView` for proper layout
- Use `FlatList` for long lists instead of mapping arrays to Views
- Test on both iOS and Android as styles may differ
- Use `Platform.select()` for platform-specific code when needed

