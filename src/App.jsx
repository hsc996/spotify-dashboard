import './App.css'
import { useSpotifyAuthContext } from './contexts/SpotifyAuthContextProvider';
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {
  
  // eslint-disable-next-line no-unused-vars
  const [ toggleTheme, setToSystem] = useThemeContext();
  const {redirectToAuthCodeFlow} = useSpotifyAuthContext();

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle theme
      </button>
      <button onClick={setToSystem}>
        Set to system theme
      </button>
      <button onClick={redirectToAuthCodeFlow}>
        Sign in via Spotify
      </button>
    </>
  )
}

export default App