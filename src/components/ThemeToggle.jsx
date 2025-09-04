"use client"

import { useTheme } from "../context/ThemeContext"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-[#333333]"
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? <Moon size={20} className="text-[#8C43FF]" /> : <Sun size={20} className="text-[#00B2FF]" />}
    </button>
  )
}

export default ThemeToggle
