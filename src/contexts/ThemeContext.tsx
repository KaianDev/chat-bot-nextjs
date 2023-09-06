import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const STORAGE_KEY = "themeContextContent";

type ThemeContext = {
    theme: string;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEY) || "light"
            : "light"
    );
    
    useEffect(() => {
        setIsMounted(true);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    if (!isMounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
