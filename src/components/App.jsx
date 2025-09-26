"use client"

import { useState, useEffect } from "react"
import { Home, Calendar, MessageCircle, User, Cloud, HelpCircle, Menu } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import CalendarPage from "./pages/calendar/CalendarPage"
import HomePage from "./pages/inicio/HomePage"
import PatchNotesPage from "./pages/inicio/PatchNotesPage"
import SchedulePage from "./pages/inicio/SchedulePage"
import ProfilePage from "./pages/profile/ProfilePage"
import ChatPage from "./pages/chat/ChatPage"
import ThemeToggle from "./ThemeToggle"
import { ThemeProvider } from "../context/ThemeContext"
import { AuthProvider } from "../hooks/useAuth"
import LogoEtecNotes from "../assets/LogoEtecNotes.png"
import CloudPage from "./pages/cloud/CloudPage"
import LandingPage from "./pages/landing/LandingPage"
import LoginPage from "./pages/login/LoginPage"
import Footer from "./Footer"
import EtecDashboard from "./pages/dashboards/EtecDashboard"
import TeacherDashboard from "./pages/dashboards/TeacherDashboard"



function AppContent() {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("Landing")
  const [activeContentTab, setActiveContentTab] = useState("Jornal Etec")
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  // Função para lidar com a mudança de abas principais
  const handleMainTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "Início") {
      setActiveContentTab("Jornal Etec")
    }
  }

   // Função para entrar na aplicação
  const handleGetStarted = () => {
    if (user) {
      if (user.role === "ADM") {
        setActiveTab("Dashboard")
      } else {
        setActiveTab("Início")
      }
    } else {
      setActiveTab("Login")
    }
  }

  // Função para lidar com a mudança de abas de conteúdo
  const handleContentTabChange = (tab) => {
    setActiveContentTab(tab)
    // Mapeia cada tab para o activeTab correto
    if (tab === "Patch Notes") {
      setActiveTab("Patch Notes")
    } else if (tab === "Horários") {
      setActiveTab("Horários")
    } else if (tab === "Eventos") {
      setActiveTab("Eventos")
    } else if (tab === "Jornal Etec") {
      setActiveTab("Início")
    }
  }

  // Função para logout
  const handleLogout = async () => {
    await logout()
    setActiveTab("Landing")
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

  // Scroll to top when changing main tabs so pages always start at the top
  useEffect(() => {
    // try to scroll the app's main container first (it's the one with overflow-auto)
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mainEl.scrollTop = 0
    }
    // also ensure window scroll is at top as a fallback
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [activeTab])

  // Renderizar a página correta com base na aba ativa
  const renderActivePage = () => {
    switch (activeTab) {

      case "TeacherDashboard":
        return <TeacherDashboard onLogout={handleLogout} />
      case "Dashboard":
        return <EtecDashboard onLogout={handleLogout} />
      case "Landing":
        return <LandingPage onGetStarted={() => setActiveTab("Login")} />
      case "Login":
        return (
          <LoginPage
            onLogin={() => {
              setActiveTab("Início")
            }}
            onCancel={() => setActiveTab("Landing")}
          />
        )
      case "Patch Notes":
        return (
          <PatchNotesPage
            activeTab="Patch Notes"
            onTabChange={handleContentTabChange}
            navigateToEvents={() => {
              setActiveTab("Eventos")
              setActiveContentTab("Eventos")
            }}
          />
        )
      case "Horários":
        return (
          <SchedulePage
            activeTab="Horários"
            onTabChange={handleContentTabChange}
            navigateToEvents={() => {
              setActiveTab("Eventos")
              setActiveContentTab("Eventos")
            }}
          />
        )
      case "Eventos":
        // Renderiza HomePage com activeTab = "Eventos" para mostrar EventsPage
        return <HomePage activeTab="Eventos" onTabChange={handleContentTabChange} />
      case "Calendário":
        return <CalendarPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Chat":
        return <ChatPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
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

          {/* If not authenticated, show only Login button */}
                {!isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <ThemeToggle />

                  <button
                  onClick={() => setActiveTab("Login")}
                  className="px-4 py-2 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] text-white rounded-full font-medium"
                  >
                  Login
                  </button>
                </div>
                ) : (
            /* Authenticated header (original full navigation) */
            <>
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
                    (user?.role === "professor" && activeTab === "TeacherDashboard") ||
                    (user?.role === "ADM" && activeTab === "Dashboard") ||
                    (user?.role === "aluno" && activeTab === "Perfil")
                      ? "text-[#8C43FF]"
                      : "dark:text-gray-400 text-gray-500 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (user?.role === "professor") {
                      setActiveTab("TeacherDashboard")
                    } else if (user?.role === "ADM") {
                      setActiveTab("Dashboard")
                    } else {
                      setActiveTab("Perfil")
                    }
                  }}
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

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <ThemeToggle />

                <button
                  className="p-1.5 rounded-full border dark:border-gray-600 border-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#333333]"
                  aria-label="Ajuda"
                  title="Ajuda"
                >
                  <HelpCircle size={20} className="dark:text-gray-400 text-gray-500" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                  title="Sair"
                >
                  Sair
                </button>
              </div>
            </>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto dark:bg-[#121212] bg-white transition-colors duration-300">
          {renderActivePage()}
        </main>

  {/* Footer component (renders differently for guest vs auth) */}
        {activeTab !== "Login" && (
          <Footer isAuthenticated={isAuthenticated} onNavigate={(tab) => {
            // Map footer navigation names to app tabs
            const map = {
              "Login": "Login",
              "Início": "Início",
              "Calendário": "Calendário",
              "Chat": "Chat",
              "Perfil": "Perfil",
              "Cloud": "Cloud"
            }
            const target = map[tab] || tab
            setActiveTab(target)
          }} />
        )}
    </div>
  )
}

// Componente principal que envolve tudo com os providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
