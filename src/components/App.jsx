"use client"

import { useState, useEffect } from "react"
import BootstrapPage from "./BootstrapPage"
import { useSystemStatus } from "../hooks/useSystemStatus"
import { Home, Calendar, MessageCircle, User, Cloud, HelpCircle, Menu } from "lucide-react"
import CalendarPage from "./pages/calendar/CalendarPage"
import HomePage from "./pages/inicio/HomePage"
import PatchNotesPage from "./pages/inicio/PatchNotesPage"
import SchedulePage from "./pages/calendar/SchedulePage"
import UserDashboard from "./pages/dashboards/UserDashboard"
import ChatPage from "./pages/chat/ChatPage"
import AboutPage from "./pages/about/AboutPage"
import ThemeToggle from "./ThemeToggle"
import { ThemeProvider } from "../context/ThemeContext"
import { AuthProvider, useAuth } from "../hooks/useAuth"
import LogoEtecNotes from "../assets/LuaEtecNotes.png"
import CloudPage from "./pages/cloud/CloudPage"
import LandingPage from "./pages/landing/LandingPage"
import LoginPage from "./pages/login/LoginPage"
import Footer from "./Footer"
import EtecDashboard from "./pages/dashboards/EtecDashboard"
import TeacherDashboard from "./pages/dashboards/TeacherDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
function AppContent() {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const { checkingSystem, systemNeedsBootstrap, checkSystemStatus } = useSystemStatus()

  const [activeTab, setActiveTab] = useState("Landing")
  const [activeContentTab, setActiveContentTab] = useState("Jornal Etec")
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Redirecionar automaticamente após login bem-sucedido
  useEffect(() => {
    if (user && user.role && activeTab === "Login") {
      setActiveTab("Início");
    }
  }, [user, activeTab]);

  // Função para lidar com a mudança de abas principais
  const handleMainTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "Início") {
      setActiveContentTab("Jornal Etec")
    }
  }

  const handleGetStarted = () => {
    if (user) {
      setActiveTab("AdminDashboard")
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
    } else if (tab === "Jornal Etec") {
      setActiveTab("Início")
    } else if (tab === "Eventos") {
      setActiveTab("Eventos")
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

  // Mostrar loading enquanto verifica autenticação ou status do sistema
  if (loading || checkingSystem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5ecff ] dark:bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando sistema...</p>
        </div>
      </div>
    )
  }

  // Se usuário não está logado ou não tem role definida, mostra LoginPage
  if (!user || !user?.role) {
    // Mostra LandingPage primeiro, depois LoginPage ao clicar em 'Começar'
    if (activeTab === 'Login') {
      return <LoginPage onCancel={() => setActiveTab('Landing')} />;
    }
    return <LandingPage onGetStarted={() => setActiveTab('Login')} />;
  }

  // Roteamento normal por role
  // Para ADM, navegação padrão entre páginas, mas Perfil abre EtecDashboard
  // Para professor, navegação padrão entre páginas, mas Perfil abre TeacherDashboard
  // Para alunos, segue navegação normal pelas páginas já existentes
  // (Home, Calendário, Chat, Perfil, Cloud/Relaxar)
  // Não retorna dashboard, apenas mantém navegação padrão

  // Renderizar a página correta com base na aba ativa (fallback)
  const renderActivePage = () => {
    switch (activeTab) {
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
          />
        )

      case "Eventos":
        return <HomePage activeTab="Eventos" onTabChange={handleContentTabChange} />
      case "Sobre Nós":
        return <AboutPage />
      case "Calendário":
        return <CalendarPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Chat":
        return <ChatPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Perfil":
        if (user?.role === "professor") {
          return <TeacherDashboard onLogout={handleLogout} />
        }
        if (user?.role === "ADM") {
          return <EtecDashboard onLogout={handleLogout} />
        }
        return <UserDashboard activeTab="Perfil" onTabChange={handleContentTabChange} />
      case "Cloud":
        return <CloudPage activeTab="Cloud" onTabChange={handleContentTabChange} />
      case "Início":
      default:
        return <HomePage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5ecff ] dark:bg-[#121212] transition-colors duration-300">
        {/* Header */}
        <header className="h-[60px] dark:bg-[#1E1E1E] bg-[#5b38ba] border-b dark:border-[#333333] border-gray-200 flex items-center justify-between px-6 transition-colors duration-300">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleMainTabChange(isAuthenticated ? "Início" : "Landing")}
            title={isAuthenticated ? "Ir para o início" : "Ir para a landing page"}
          >
            <img
              src={LogoEtecNotes}
              alt="Logo EtecNotes"
              className="w-8 h-8 rounded-full object-contain flex-shrink-0"
              style={{ 
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
                filter: 'contrast(1.1) saturate(1.1)'
              }}
            />
            <span className="ml-2 text-white font-bold text-lg transition-colors duration-300">
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
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    (activeTab === "Início" || activeTab === "Patch Notes") ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  }`}
                  onClick={() => handleMainTabChange("Início")}
                  aria-label="Página Inicial"
                >
                  <Home size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Calendário" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  }`}
                  onClick={() => handleMainTabChange("Calendário")}
                  aria-label="Calendário"
                >
                  <Calendar size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Chat" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  }`}
                  onClick={() => handleMainTabChange("Chat")}
                  aria-label="Chat"
                >
                  <MessageCircle size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    (user?.role === "professor" && activeTab === "Perfil") ||
                    (user?.role === "ADM" && activeTab === "AdminDashboard") ||
                    (user?.role === "aluno" && activeTab === "Perfil")
                      ? "text-purple-500"
                      : "text-white/80 hover:text-white cursor-pointer"
                  }`}
                  onClick={() => {
                    if (user?.role === "professor") {
                      setActiveTab("Perfil")
                    } else if (user?.role === "ADM") {
                      setActiveTab("Perfil")
                    } else {
                      setActiveTab("Perfil")
                    }
                  }}
                  aria-label="Perfil"
                >
                  <User size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Cloud" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
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
                  className="p-1.5 rounded-full border border-white/30 dark:border-gray-600 transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333]"
                  aria-label="Ajuda"
                  title="Ajuda"
                >
                  <HelpCircle size={20} className="text-white/80 hover:text-white dark:text-gray-400" />
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
        <main className="flex-1 overflow-auto bg-[#f5ecff ] dark:bg-[#121212] transition-colors duration-300">
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

export default App;
