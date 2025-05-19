"use client"

import { useState } from "react"
import { Home, Calendar, MessageCircle, User, Cloud, Plus, HelpCircle, Menu } from "lucide-react"
import CalendarPage from "./components/Calendar/CalendarPage"
import HomePage from "./components/HomePage"
import PatchNotesPage from "./components/PatchNotesPage"
import SchedulePage from "./components/SchedulePage"
import ThemeToggle from "./components/ThemeToggle"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  const [activeTab, setActiveTab] = useState("Início")

  // Renderizar a página correta com base na aba ativa
  const renderActivePage = () => {
    switch (activeTab) {
      case "Calendário":
        return <CalendarPage />
      case "Patch Notes":
        return <PatchNotesPage />
      case "Horários":
        return <SchedulePage />
      case "Início":
      default:
        return <HomePage onTabChange={setActiveTab} />
    }
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen dark:bg-[#121212] bg-white">
        {/* Header */}
        <header className="h-[60px] dark:bg-[#1E1E1E] bg-white border-b dark:border-[#333333] border-gray-200 flex items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <div className="flex h-full">
                <div className="w-1/2 bg-[#8C43FF]"></div>
                <div className="w-1/2 bg-[#00B2FF]"></div>
              </div>
            </div>
            <span className="ml-2 dark:text-white text-gray-800 font-bold text-lg">EtecNotes</span>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Início" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500"
              }`}
              onClick={() => setActiveTab("Início")}
              aria-label="Página Inicial"
            >
              <Home size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Calendário" ? "text-[#00B2FF]" : "dark:text-gray-400 text-gray-500"
              }`}
              onClick={() => setActiveTab("Calendário")}
              aria-label="Calendário"
            >
              <Calendar size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Chat" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500"
              }`}
              onClick={() => setActiveTab("Chat")}
              aria-label="Chat"
            >
              <MessageCircle size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Perfil" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500"
              }`}
              onClick={() => setActiveTab("Perfil")}
              aria-label="Perfil"
            >
              <User size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Cloud" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500"
              }`}
              onClick={() => setActiveTab("Cloud")}
              aria-label="Cloud"
            >
              <Cloud size={28} />
            </button>
            <button
              className="p-1.5 rounded-md dark:text-gray-400 text-gray-500 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333]"
              aria-label="Adicionar"
            >
              <Plus size={28} />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="p-1.5 rounded-full border dark:border-gray-600 border-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333]">
              <HelpCircle size={20} className="dark:text-gray-400 text-gray-500" />
            </button>
            <button className="p-1.5 dark:text-gray-400 text-gray-500 transition-all duration-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] hover:rounded-md">
              <Menu size={28} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{renderActivePage()}</main>

        {/* Footer */}
        <footer className="h-[60px] dark:bg-[#1E1E1E] bg-white border-t dark:border-[#333333] border-gray-200 px-6">
          <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
            <div className="dark:text-gray-500 text-gray-500 text-sm">© 2025 EtecNotes</div>
            <div className="flex space-x-4">
              <a href="#" className="dark:text-gray-500 text-gray-500 text-sm hover:text-[#8C43FF] transition-colors">
                Privacidade
              </a>
              <a href="#" className="dark:text-gray-500 text-gray-500 text-sm hover:text-[#8C43FF] transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
