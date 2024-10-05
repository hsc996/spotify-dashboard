/* eslint-disable react/prop-types */
import { useEffect, useContext, createContext, useState } from "react";

export const ThemeContext = createContext("dark");

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext(){
	return useContext(ThemeContext);
}

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