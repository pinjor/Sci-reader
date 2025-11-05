import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider } from './context/AppContext'
import AppNavigator from './navigation/AppNavigator'

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
