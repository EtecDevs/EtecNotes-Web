"use client"

import { useTheme } from "../context/ThemeContext"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-purple-500 dark:hover:bg-[#333333]"
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? <Moon size={20} className="text-[#ded7f1]" /> : <Sun size={20} className="text-[#f4e300]" />}
    </button>
  )
}

export default ThemeToggle
