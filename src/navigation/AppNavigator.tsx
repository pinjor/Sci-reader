import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import SignUpFlow from '../screens/auth/SignUpFlow'
import SignInScreen from '../screens/auth/SignInScreen'
import OTPVerification from '../screens/auth/OTPVerification'
import PasswordScreen from '../screens/auth/PasswordScreen'

// Main App Screens
import HomeFeed from '../screens/main/HomeFeed'
import Search from '../screens/main/Search'
import Messages from '../screens/main/Messages'
import MessageDetails from '../screens/main/MessageDetails'
import MyLibrary from '../screens/main/MyLibrary'
import MyProjectDetails from '../screens/main/MyProjectDetails'
import Profile from '../screens/main/Profile'
import OtherProfile from '../screens/main/OtherProfile'
import Notifications from '../screens/main/Notifications'
import Settings from '../screens/main/Settings'
import Subscription from '../screens/main/Subscription'
import VoiceSearch from '../screens/main/VoiceSearch'
import YourPapers from '../screens/main/YourPapers'
import ChangePassword from '../screens/main/ChangePassword'
import LanguageSettings from '../screens/main/LanguageSettings'
import PaperDetails from '../screens/main/PaperDetails'
import ReadingVoiceSettings from '../screens/main/ReadingVoiceSettings'
import ProfileList from '../screens/main/ProfileList'
import TextSizeSettings from '../screens/main/TextSizeSettings'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 16,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#0072FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeFeed"
        component={HomeFeed}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyLibrary"
        component={MyLibrary}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'library' : 'library-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Routes */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpFlow} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="OTP" component={OTPVerification} />
        <Stack.Screen name="Password" component={PasswordScreen} />

        {/* Main App Routes */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MessageDetails" component={MessageDetails} />
        <Stack.Screen name="MyProjectDetails" component={MyProjectDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OtherProfile" component={OtherProfile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
        <Stack.Screen name="ReadingVoiceSettings" component={ReadingVoiceSettings} />
        <Stack.Screen name="TextSizeSettings" component={TextSizeSettings} />
        <Stack.Screen name="ProfileList" component={ProfileList} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="VoiceSearch" component={VoiceSearch} />
        <Stack.Screen name="YourPapers" component={YourPapers} />
        <Stack.Screen name="PaperDetails" component={PaperDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

