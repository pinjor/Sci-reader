import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App

