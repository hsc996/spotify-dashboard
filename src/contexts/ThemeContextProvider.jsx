import { useEffect, useContext, createContext, useState } from "react";

export const ThemeContext = createContext("dark");

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

	return (
		<ThemeContext.Provider value={[currentTheme, toggleTheme]} >
			{children}

		</ThemeContext.Provider>
	)
}