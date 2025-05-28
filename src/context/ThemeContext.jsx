"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Criando o contexto do tema
const ThemeContext = createContext()

// Hook personalizado para usar o tema
export const useTheme = () => useContext(ThemeContext)

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  // Carregar tema salvo ou preferência do sistema na montagem
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("etecnotes-theme")
      if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark")
        document.documentElement.classList.add("dark")
      } else {
        setTheme("light")
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  // Atualizar localStorage e classe do html sempre que o tema mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("etecnotes-theme", theme)
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
