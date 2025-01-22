/* eslint-disable react/prop-types */
import { useEffect, useContext, createContext, useState } from "react";

// Create theme context
export const ThemeContext = createContext("dark");

// Create custom hook to simplify access to ThemeContext
// Allows components access without having to call useContext() every time
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext(){
	return useContext(ThemeContext);
}

// Functional component -- "children" declared as it will wrap other component, thus act as a parent
export function ThemeContextProvider({children}){
	let [currentTheme, setCurrentTheme] = useState("dark");

	useEffect(() => {
		document.documentElement.style.setProperty("color-scheme", currentTheme);
	}, [currentTheme]);

	const toggleTheme = () => {
		if (currentTheme == "dark") {
			setCurrentTheme("light");
		} else {
			setCurrentTheme("dark");
		}
	}

	const setToSystem = () => {
		setCurrentTheme("light dark")
	}

	return (
		<ThemeContext.Provider value={[currentTheme, toggleTheme, setToSystem]} >
			{children}
		</ThemeContext.Provider>
	)
}