import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserContextProvider from './contextApi/UserContextProvider.tsx'
import { ThemeProvider } from './contextApi/themeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
