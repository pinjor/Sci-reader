import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

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

function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignUpFlow />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/password" element={<PasswordScreen />} />

        {/* Main App Routes */}
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<MessageDetails />} />
        <Route path="/library" element={<MyLibrary />} />
        <Route path="/project/:id" element={<MyProjectDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<OtherProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
        <Route path="/settings/language" element={<LanguageSettings />} />
        <Route path="/settings/reading-voice" element={<ReadingVoiceSettings />} />
        <Route path="/settings/text-size" element={<TextSizeSettings />} />
        <Route path="/profile-list" element={<ProfileList />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/voice-search" element={<VoiceSearch />} />
        <Route path="/papers" element={<YourPapers />} />
        <Route path="/paper/:id" element={<PaperDetails />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRouter

