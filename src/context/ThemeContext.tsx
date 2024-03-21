import React, { ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{children?: ReactNode}> = ({children}) => {

    const [theme, setTheme] = useState('light');
    const rootElement = document.getElementById('root');


    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
       
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        const isDark = newTheme === 'dark';
        rootElement?.classList.remove(isDark ? 'light' : 'dark');
        rootElement?.classList.add(newTheme);
    }

    useEffect(()=>{
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
        const isDark = theme === 'dark';
        rootElement?.classList.remove(isDark ? 'light' : 'dark');
        rootElement?.classList.add(theme);
        console.log(theme);
    }, [theme, rootElement])


    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);