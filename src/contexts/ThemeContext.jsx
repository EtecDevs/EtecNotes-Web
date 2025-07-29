"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { THEME_STORAGE_KEY } from "../constants"

// Criando o contexto do tema
const ThemeContext = createContext()

// Hook personalizado para usar o tema
export const useTheme = () => useContext(ThemeContext)

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme
      }
      // Se não houver tema salvo, usa preferência do sistema
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  // Atualiza classe do html e localStorage sempre que o tema mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme)
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
      return newTheme
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
