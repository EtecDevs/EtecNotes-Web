"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Criando o contexto do tema
const ThemeContext = createContext()

// Hook personalizado para usar o tema
export const useTheme = () => useContext(ThemeContext)

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  // Verificar se há uma preferência salva no localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("etecnotes-theme")
      return savedTheme || "light" // Padrão é modo claro
    }
    return "light"
  })

  // Atualizar o tema no localStorage e no DOM quando ele mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("etecnotes-theme", theme)

      // Atualizar a classe no elemento html
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
