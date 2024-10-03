import './App.css'
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {
  
  const [currentTheme, toggleTheme] = useThemeContext();

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle theme
      </button>
    </>
  )
}

export default App
