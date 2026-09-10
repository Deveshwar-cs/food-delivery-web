import {useState, useEffect} from "react";

/**
 * useDarkMode
 *
 * - Reads localStorage("theme") on first mount.
 * - Falls back to the OS/browser prefers-color-scheme when nothing is saved.
 * - Writes the `dark` class on <html> (Tailwind's class strategy).
 * - Persists the user's choice in localStorage("theme").
 *
 * Returns [isDark, toggleDark]
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  console.log(isDark);
  const toggleDark = () => setIsDark((prev) => !prev);

  return [isDark, toggleDark];
}
