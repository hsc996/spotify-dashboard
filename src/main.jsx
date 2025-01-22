import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ThemeContextProvider } from './contexts/ThemeContextProvider.jsx'
import { SpotifyAuthProvider } from './contexts/SpotifyAuthProvider.jsx'
import { SpotifyProfileProvider } from './contexts/SpotifyProfileProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeContextProvider> */}
      <SpotifyAuthProvider>
        <SpotifyProfileProvider>
          <App />
        </SpotifyProfileProvider>
      </SpotifyAuthProvider>
    {/* </ThemeContextProvider> */}
  </StrictMode>,
)
