"use client"

import { useState, useEffect } from "react"
import { Home, Calendar, MessageCircle, User, Cloud, HelpCircle, Menu } from "lucide-react"
import CalendarPage from "./pages/calendar/CalendarPage"
import HomePage from "./pages/inicio/HomePage"
import PatchNotesPage from "./pages/inicio/PatchNotesPage"
import SchedulePage from "./pages/inicio/SchedulePage"
import ProfilePage from "./pages/profile/ProfilePage"
import ChatPage from "./pages/chat/ChatPage"
import ThemeToggle from "./ThemeToggle"
import { ThemeProvider } from "../context/ThemeContext"
import LogoEtecNotes from "../assets/LogoEtecNotes.png"
import CloudPage from "./pages/cloud/CloudPage"
import LandingPage from "./pages/landing/LandingPage"



function App() {
  const [activeTab, setActiveTab] = useState("Início")
  const [activeContentTab, setActiveContentTab] = useState("Jornal Etec")
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Função para lidar com a mudança de abas principais
  const handleMainTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "Início") {
      setActiveContentTab("Jornal Etec")
    }
  }

  // Função para lidar com a mudança de abas de conteúdo
   const handleContentTabChange = (tab) => {
    setActiveContentTab(tab)

    if (tab === "Patch Notes") {
      setActiveTab("Patch Notes")
    } else if (tab === "Horários") {
      setActiveTab("Horários")
    } else if (tab === "Jornal Etec") {
      setActiveTab("Início")
    }
  }

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false)
      }
      if (!event.target.closest(".mobile-menu-dropdown")) {
        setMobileMenuOpen(false)
      }
    }
    if (profileDropdownOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileDropdownOpen, mobileMenuOpen])

  // Renderizar a página correta com base na aba ativa
  const renderActivePage = () => {
    switch (activeTab) {
      case "Landing":
        return <LandingPage />
      case "Patch Notes":
        return <PatchNotesPage activeTab="Patch Notes" onTabChange={handleContentTabChange} />
      case "Horários":
        return <SchedulePage activeTab="Horários" onTabChange={handleContentTabChange} />
        case "Calendário":
        return <CalendarPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Chat":
        return <div>Chat Page em construção</div>
      case "Perfil":
        return <ProfilePage activeTab="Perfil" onTabChange={handleContentTabChange} />
      case "Cloud":
        return <CloudPage activeTab="Cloud" onTabChange={handleContentTabChange} />
      case "Início":
      default:
        return <HomePage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
    }
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen dark:bg-[#121212] bg-white transition-colors duration-300">
        {/* Header */}
        <header className="h-[60px] dark:bg-[#1E1E1E] bg-white border-b dark:border-[#333333] border-gray-200 flex items-center justify-between px-6 transition-colors duration-300">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleMainTabChange("Landing")}
            title="Ir para a landing page"
          >
            <img
              src={LogoEtecNotes}
              alt="Logo EtecNotes"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <span className="ml-2 dark:text-white text-gray-800 font-bold text-lg transition-colors duration-300">
              EtecNotes
            </span>
          </div>

          {/* Navigation Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                (activeTab === "Início" || activeTab === "Patch Notes" || activeTab === "Horários") ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500 cursor-pointer"
              }`}
              onClick={() => handleMainTabChange("Início")}
              aria-label="Página Inicial"
            >
              <Home size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Calendário" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500 cursor-pointer"
              }`}
              onClick={() => handleMainTabChange("Calendário")}
              aria-label="Calendário"
            >
              <Calendar size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Chat" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500 cursor-pointer"
              }`}
              onClick={() => handleMainTabChange("Chat")}
              aria-label="Chat"
            >
              <MessageCircle size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Perfil" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500 cursor-pointer"
              }`}
              onClick={() => handleMainTabChange("Perfil")}
              aria-label="Perfil"
            >
              <User size={28} />
            </button>
            <button
              className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333] ${
                activeTab === "Cloud" ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-500 cursor-pointer"
              }`}
              onClick={() => handleMainTabChange("Cloud")}
              aria-label="Cloud"
            >
              <Cloud size={28} />
            </button>
          </div>

          {/* Navigation Icons - Mobile Dropdown */}
          <div className="md:hidden flex items-center">
            <div className="relative mobile-menu-dropdown">
              <button
                className="p-1.5 rounded-full text-[#8C43FF] hover:bg-gray-100 dark:hover:bg-[#333333] transition-all"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Abrir menu"
                aria-haspopup="true"
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={28} />
              </button>
              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#333333] rounded-md shadow-lg z-50 py-2 text-sm">
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      (activeTab === "Início" || activeTab === "Patch Notes" || activeTab === "Horários") ? "text-[#8C43FF]" : "text-gray-700 dark:text-gray-200"
                    } hover:bg-gray-100 dark:hover:bg-[#333333]`}
                    onClick={() => { handleMainTabChange("Início"); setMobileMenuOpen(false); }}
                  >
                    <span className="inline-flex items-center gap-2"><Home size={22} /> Início</span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === "Calendário" ? "text-[#8C43FF]" : "text-gray-700 dark:text-gray-200"
                    } hover:bg-gray-100 dark:hover:bg-[#333333]`}
                    onClick={() => { handleMainTabChange("Calendário"); setMobileMenuOpen(false); }}
                  >
                    <span className="inline-flex items-center gap-2"><Calendar size={22} /> Calendário</span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === "Cloud" ? "text-[#8C43FF]" : "text-gray-700 dark:text-gray-200"
                    } hover:bg-gray-100 dark:hover:bg-[#333333]`}
                    onClick={() => { handleMainTabChange("Cloud"); setMobileMenuOpen(false); }}
                  >
                    <span className="inline-flex items-center gap-2"><Cloud size={22} /> Cloud</span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === "Perfil" ? "text-[#8C43FF]" : "text-gray-700 dark:text-gray-200"
                    } hover:bg-gray-100 dark:hover:bg-[#333333]`}
                    onClick={() => { handleMainTabChange("Perfil"); setMobileMenuOpen(false); }}
                  >
                    <span className="inline-flex items-center gap-2"><User size={22} /> Perfil</span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === "Cloud" ? "text-[#8C43FF]" : "text-gray-700 dark:text-gray-200"
                    } hover:bg-gray-100 dark:hover:bg-[#333333]`}
                    onClick={() => { handleMainTabChange("Cloud"); setMobileMenuOpen(false); }}
                  >
                    <span className="inline-flex items-center gap-2"><Cloud size={22} /> Cloud</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="p-1.5 rounded-full border dark:border-gray-600 border-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333]">
              <HelpCircle size={20} className="dark:text-gray-400 text-gray-500" />
            </button>
            
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto dark:bg-[#121212] bg-white transition-colors duration-300">
          {renderActivePage()}
        </main>

        {/* Footer */}
        <footer className="h-[60px] dark:bg-[#1E1E1E] bg-white border-t dark:border-[#333333] border-gray-200 px-6 transition-colors duration-300">
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
