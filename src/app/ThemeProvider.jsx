import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import useLocalStorage from "../shared/hooks/useLocalStorage";
import { STORAGE_KEYS } from "../shared/constants";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.DARK_MODE, false);

  useEffect(() => {
    document.body.classList.toggle("darkBody", darkMode);
    document.body.style.background = darkMode ? "#121212" : "";
    document.body.style.color = darkMode ? "white" : "";
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode((v) => !v), [setDarkMode]);
  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme requires ThemeProvider");
  return ctx;
}
