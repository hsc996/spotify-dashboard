import './App.css'
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {
  
  // eslint-disable-next-line no-unused-vars
  const [currentTheme, toggleTheme, setToSystem] = useThemeContext();

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle theme
      </button>
      <button onClick={setToSystem}>
        Set to system theme
      </button>
    </>
  )
}

export default App