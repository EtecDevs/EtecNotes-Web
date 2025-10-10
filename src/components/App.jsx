"use client"

import { useState, useEffect } from "react"
import BootstrapPage from "./BootstrapPage"
import { useSystemStatus } from "../hooks/useSystemStatus"
import { Home, Calendar, MessageCircle, User, Cloud, Menu, Monitor, Building2, Keyboard, Users } from "lucide-react"
import CalendarPage from "./pages/calendar/CalendarPage"
import HomePage from "./pages/inicio/HomePage"
import PatchNotesPage from "./pages/inicio/PatchNotesPage"
import SchedulePage from "./pages/calendar/SchedulePage"
import UserDashboard from "./pages/dashboards/UserDashboard"
import ChatPage from "./pages/chat/ChatPage"
import AboutPage from "./pages/about/AboutPage"
import ThemeToggle from "./ThemeToggle"
import AccessibilityMenu from "./accessibility/AccessibilityMenu"
import { ThemeProvider } from "../context/ThemeContext"
import LabsControlPage from "./pages/labs/LabNotes"
import { AuthProvider, useAuth } from "../hooks/useAuth"
import LogoEtecNotes from "../assets/LuaEtecNotes.png"
import CloudPage from "./pages/cloud/CloudPage"
import LandingPage from "./pages/landing/LandingPage"
import LoginPage from "./pages/login/LoginPage"
import Footer from "./Footer"
import EtecDashboard from "./pages/dashboards/EtecDashboard"
import TeacherDashboard from "./pages/dashboards/TeacherDashboard"
import AdminDashboard from "./pages/dashboards/AdminDashboard"
import ForumPage from "./pages/forum/ForumPage"

function AppContent() {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const { checkingSystem, systemNeedsBootstrap, checkSystemStatus } = useSystemStatus()

  const [activeTab, setActiveTab] = useState("Landing")
  const [activeContentTab, setActiveContentTab] = useState("Jornal Etec")
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [focusedNavIndex, setFocusedNavIndex] = useState(-1)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [navigationMode, setNavigationMode] = useState(false) // Modo de navegação por setas
  const [focusedElementIndex, setFocusedElementIndex] = useState(-1)

  // Determinar o userType baseado no role do usuário
  // ADMINISTRADOR = controle total com CRUD
  // SECRETARIA/ETEC = secretária (visualização e gestão operacional, sem CRUD de usuários)
  const userType = user?.role === "ADMINISTRADOR" ? "admin" : user?.role === "SECRETARIA" ? "etec" : user?.role === "professor" ? "teacher" : "student"

  // Navegação por teclado global
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ignorar se estiver digitando em input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // N para ativar/desativar Modo de Navegação
      if (e.key === 'n' || e.key === 'N') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated) {
          e.preventDefault()
          setNavigationMode(prev => {
            const newMode = !prev
            if (newMode) {
              setFocusedElementIndex(0) // Começa no primeiro elemento
            } else {
              setFocusedElementIndex(-1) // Limpa foco
            }
            return newMode
          })
        }
      }

      // Se Modo de Navegação estiver ativo, usar setas para navegar por TODOS os elementos
      if (navigationMode && isAuthenticated) {
        const focusableElements = document.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        
        if (focusableElements.length > 0) {
          // Seta para baixo - próximo elemento
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setFocusedElementIndex(prev => {
              const newIndex = prev + 1 >= focusableElements.length ? 0 : prev + 1
              focusableElements[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              focusableElements[newIndex]?.focus()
              return newIndex
            })
          }
          
          // Seta para cima - elemento anterior
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            setFocusedElementIndex(prev => {
              const newIndex = prev - 1 < 0 ? focusableElements.length - 1 : prev - 1
              focusableElements[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              focusableElements[newIndex]?.focus()
              return newIndex
            })
          }

          // Enter ativa o elemento focado
          if (e.key === 'Enter' && focusedElementIndex >= 0) {
            e.preventDefault()
            focusableElements[focusedElementIndex]?.click()
          }
        }
        
        // Bloqueia scroll com setas quando navegação está ativa
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault()
        }
        return // Não executa outros atalhos quando modo navegação está ativo
      }

      // Navegação horizontal pelos ícones do header (← →) - apenas se modo navegação estiver DESATIVADO
      if (!navigationMode && isAuthenticated && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        
        const navItems = []
        navItems.push({ name: 'Início', action: () => handleMainTabChange('Início') })
        navItems.push({ name: 'Calendário', action: () => handleMainTabChange('Calendário') })
        
        if (userType === "teacher" || userType === "etec" || userType === "admin") {
          navItems.push({ name: 'Laboratórios', action: () => handleMainTabChange('Laboratórios') })
        }
        
        navItems.push({ name: 'Chat', action: () => handleMainTabChange('Chat') })
        navItems.push({ name: 'Fórum', action: () => handleMainTabChange('Fórum') })
        navItems.push({ name: 'Perfil', action: () => {
          if (user?.role === "ADMINISTRADOR") {
            setActiveTab("AdminDashboard")
          } else {
            setActiveTab("Perfil")
          }
        }})
        navItems.push({ name: 'Cloud', action: () => handleMainTabChange('Cloud') })

        setFocusedNavIndex(prev => {
          let newIndex = prev
          if (e.key === 'ArrowRight') {
            newIndex = prev + 1
            if (newIndex >= navItems.length) newIndex = 0
          } else {
            newIndex = prev - 1
            if (newIndex < 0) newIndex = navItems.length - 1
          }
          return newIndex
        })
      }

      // Enter para ativar item focado do header
      if (e.key === 'Enter' && focusedNavIndex >= 0 && isAuthenticated && !navigationMode) {
        e.preventDefault()
        
        const navItems = []
        navItems.push({ name: 'Início', action: () => handleMainTabChange('Início') })
        navItems.push({ name: 'Calendário', action: () => handleMainTabChange('Calendário') })
        
        if (userType === "teacher" || userType === "etec" || userType === "admin") {
          navItems.push({ name: 'Laboratórios', action: () => handleMainTabChange('Laboratórios') })
        }
        
        navItems.push({ name: 'Chat', action: () => handleMainTabChange('Chat') })
        navItems.push({ name: 'Fórum', action: () => handleMainTabChange('Fórum') })
        navItems.push({ name: 'Perfil', action: () => {
          if (user?.role === "ADMINISTRADOR") {
            setActiveTab("AdminDashboard")
          } else {
            setActiveTab("Perfil")
          }
        }})
        navItems.push({ name: 'Cloud', action: () => handleMainTabChange('Cloud') })

        if (navItems[focusedNavIndex]) {
          navItems[focusedNavIndex].action()
          setFocusedNavIndex(-1) // Reset após ativar
        }
      }

      // ESC para limpar foco ou desativar modo navegação
      if (e.key === 'Escape') {
        if (navigationMode) {
          setNavigationMode(false)
          setFocusedElementIndex(-1)
        }
        setFocusedNavIndex(-1)
        setProfileDropdownOpen(false)
        setMobileMenuOpen(false)
      }

      // H para ir para Home/Início
      if (e.key === 'h' || e.key === 'H') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated && !navigationMode) {
          e.preventDefault()
          handleMainTabChange('Início')
        }
      }

      // C para ir para Calendário
      if (e.key === 'c' || e.key === 'C') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated && !navigationMode) {
          e.preventDefault()
          handleMainTabChange('Calendário')
        }
      }

      // M para ir para Chat (Messages)
      if (e.key === 'm' || e.key === 'M') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated && !navigationMode) {
          e.preventDefault()
          handleMainTabChange('Chat')
        }
      }

      // F para ir para Fórum
      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated && !navigationMode) {
          e.preventDefault()
          handleMainTabChange('Fórum')
        }
      }

      // P para ir para Perfil
      if (e.key === 'p' || e.key === 'P') {
        if (!e.ctrlKey && !e.altKey && isAuthenticated && !navigationMode) {
          e.preventDefault()
          if (user?.role === "ADMINISTRADOR") {
            setActiveTab("AdminDashboard")
          } else {
            setActiveTab("Perfil")
          }
        }
      }

      // ? para mostrar ajuda de teclado
      if (e.key === '?' && isAuthenticated) {
        e.preventDefault()
        setShowKeyboardHelp(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isAuthenticated, focusedNavIndex, focusedElementIndex, navigationMode, user, userType])

  // Redirecionar automaticamente após login bem-sucedido
  useEffect(() => {
    if (user && user.role && activeTab === "Login") {
      // ADMINISTRADOR vai direto para AdminDashboard, outros vão para Início
      if (user.role === "ADMINISTRADOR") {
        setActiveTab("AdminDashboard");
      } else {
        setActiveTab("Início");
      }
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

  // Fecha dropdowns ao clicar fora e remove marcação de navegação por teclado
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false)
      }
      if (!event.target.closest(".mobile-menu-dropdown")) {
        setMobileMenuOpen(false)
      }
      // Remove marcação amarela de navegação ao clicar em qualquer lugar
      setFocusedNavIndex(-1)
    }
    if (profileDropdownOpen || mobileMenuOpen || focusedNavIndex >= 0) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileDropdownOpen, mobileMenuOpen, focusedNavIndex])

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
      <div className="flex items-center justify-center min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
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
  // Para SECRETARIA, navegação padrão entre páginas, mas Perfil abre EtecDashboard
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
      case "Laboratórios":
        return <LabsControlPage userType={userType} userData={user} />
      case "Calendário":
        return <CalendarPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Chat":
        return <ChatPage activeTab={activeContentTab} onTabChange={handleContentTabChange} />
      case "Fórum":
        return <ForumPage />
      case "AdminDashboard":
        return <AdminDashboard onLogout={handleLogout} />
      case "Perfil":
        if (user?.role === "professor") {
          return <TeacherDashboard onLogout={handleLogout} />
        }
        if (user?.role === "SECRETARIA") {
          return <EtecDashboard onLogout={handleLogout} />
        }
        if (user?.role === "ADMINISTRADOR") {
          return <AdminDashboard onLogout={handleLogout} />
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
    <div className="flex flex-col min-h-screen bg-[#f3e8ff] dark:bg-[#121212] transition-colors duration-300">
        {/* Header */}
        <header className="h-[60px] dark:bg-[#1E1E1E] bg-[#58417d] border-b dark:border-[#333333] border-gray-200 flex items-center justify-between px-6 transition-colors duration-300">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleMainTabChange(isAuthenticated ? "Início" : "Landing")}
            title={isAuthenticated ? "Ir para o início" : "Ir para a landing page"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleMainTabChange(isAuthenticated ? "Início" : "Landing")
              }
            }}
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
                    (activeTab === "Início" || activeTab === "Patch Notes" || activeTab === "Eventos") ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === 0 ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => handleMainTabChange("Início")}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleMainTabChange("Início")
                    }
                  }}
                  aria-label="Página Inicial (Atalho: H)"
                  title="H - Início"
                >
                  <Home size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Calendário" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === 1 ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => handleMainTabChange("Calendário")}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleMainTabChange("Calendário")
                    }
                  }}
                  aria-label="Calendário (Atalho: C)"
                  title="C - Calendário"
                >
                  <Calendar size={28} />
                </button>
                {(userType === "teacher" || userType === "etec" || userType === "admin") && (
                  <button
                    className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                      activeTab === "Laboratórios" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                    } ${focusedNavIndex === 2 ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                    onClick={() => handleMainTabChange("Laboratórios")}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleMainTabChange("Laboratórios")
                      }
                    }}
                    aria-label="Laboratórios"
                  >
                    <Monitor size={28} />
                  </button>
                )}
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Chat" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === (userType === "teacher" || userType === "etec" || userType === "admin" ? 3 : 2) ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => handleMainTabChange("Chat")}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleMainTabChange("Chat")
                    }
                  }}
                  aria-label="Chat (Atalho: M)"
                  title="M - Mensagens"
                >
                  <MessageCircle size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Fórum" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === (userType === "teacher" || userType === "etec" || userType === "admin" ? 4 : 3) ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => handleMainTabChange("Fórum")}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleMainTabChange("Fórum")
                    }
                  }}
                  aria-label="Fórum Estudantil (Atalho: F)"
                  title="F - Fórum"
                >
                  <Users size={28} />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    (user?.role === "professor" && activeTab === "Perfil") ||
                    (user?.role === "SECRETARIA" && activeTab === "Perfil") ||
                    (user?.role === "ADMINISTRADOR" && activeTab === "AdminDashboard") ||
                    (user?.role === "aluno" && activeTab === "Perfil")
                      ? "text-purple-500"
                      : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === (userType === "teacher" || userType === "etec" || userType === "admin" ? 5 : 4) ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => {
                    if (user?.role === "ADMINISTRADOR") {
                      setActiveTab("AdminDashboard")
                    } else if (user?.role === "professor") {
                      setActiveTab("Perfil")
                    } else if (user?.role === "SECRETARIA") {
                      setActiveTab("Perfil")
                    } else {
                      setActiveTab("Perfil")
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (user?.role === "ADMINISTRADOR") {
                        setActiveTab("AdminDashboard")
                      } else {
                        setActiveTab("Perfil")
                      }
                    }
                  }}
                  aria-label={user?.role === "SECRETARIA" || user?.role === "ADMINISTRADOR" ? "Painel Administrativo (Atalho: P)" : "Perfil (Atalho: P)"}
                  title="P - Perfil"
                >
                  {user?.role === "SECRETARIA" || user?.role === "ADMINISTRADOR" ? (
                    <Building2 size={28} />
                  ) : (
                    <User size={28} />
                  )}
                </button>
                <button
                  className={`p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-[#333333] ${
                    activeTab === "Cloud" ? "text-purple-500" : "text-white/80 hover:text-white cursor-pointer"
                  } ${focusedNavIndex === (userType === "teacher" || userType === "etec" || userType === "admin" ? 6 : 5) ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-[#58417d]' : ''}`}
                  onClick={() => handleMainTabChange("Cloud")}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleMainTabChange("Cloud")
                    }
                  }}
                  aria-label="Cloud"
                  title="Cloud/Relaxar"
                >
                  <Cloud size={28} />
                </button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <AccessibilityMenu />
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

        {/* Painel de Ajuda de Teclado */}
        {showKeyboardHelp && isAuthenticated && (
          <div className="fixed bottom-4 right-4 z-50 dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-2xl border dark:border-[#333333] border-gray-200 p-4 w-80 max-h-[500px] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Keyboard size={20} className="text-[#8C43FF]" />
                <h3 className="font-bold dark:text-white text-gray-900">Atalhos de Teclado</h3>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="dark:text-gray-400 text-gray-600 hover:text-[#8C43FF] transition-colors"
                aria-label="Fechar ajuda"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="border-b dark:border-gray-700 border-gray-200 pb-2">
                <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 mb-2">NAVEGAÇÃO PRINCIPAL</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ir para Início</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">H</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ir para Calendário</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">C</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ir para Chat</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">M</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ir para Fórum</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">F</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ir para Perfil</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">P</kbd>
                  </div>
                </div>
              </div>

              <div className="border-b dark:border-gray-700 border-gray-200 pb-2">
                <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 mb-2">NAVEGAÇÃO COM SETAS</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Navegar pelos ícones header</span>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">←</kbd>
                      <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">→</kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Ativar item selecionado</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">Enter</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Cancelar/Fechar</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">ESC</kbd>
                  </div>
                </div>
              </div>

              <div className="border-b dark:border-gray-700 border-gray-200 pb-2">
                <p className="text-xs font-semibold text-[#8C43FF] mb-2 flex items-center gap-1">
                  <Keyboard size={14} />
                  MODO DE NAVEGAÇÃO TOTAL
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700 font-semibold">Ativar/Desativar Modo</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs font-bold">N</kbd>
                  </div>
                  <div className="text-xs dark:text-gray-400 text-gray-600 bg-purple-50 dark:bg-[#8C43FF]/10 p-2 rounded">
                    <p className="mb-1">Quando ativo:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs">
                      <li>↑ ↓ navega por TODOS os elementos</li>
                      <li>Scroll bloqueado (sem rolar página)</li>
                      <li>Enter ativa elemento focado</li>
                      <li>ESC ou N para sair</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 mb-2">OUTROS</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Pular para conteúdo</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">Tab</kbd>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="dark:text-gray-300 text-gray-700">Mostrar esta ajuda</span>
                    <kbd className="px-2 py-1 rounded dark:bg-[#2D2D2D] bg-gray-100 border dark:border-gray-600 border-gray-300 font-mono text-xs">?</kbd>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 rounded-lg dark:bg-[#8C43FF]/10 bg-purple-50 border dark:border-[#8C43FF]/30 border-purple-200">
                <p className="text-xs dark:text-gray-300 text-gray-700 text-center">
                  💡 Use <kbd className="px-1 py-0.5 rounded dark:bg-[#2D2D2D] bg-white font-mono text-xs">Tab</kbd> para navegação completa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main 
          id="main-content" 
          className="flex-1 overflow-auto bg-[#f3e8ff] dark:bg-[#121212] transition-colors duration-300"
          tabIndex={-1}
          aria-label="Conteúdo principal"
        >
          {renderActivePage()}
        </main>

        {/* Indicador de Modo de Navegação */}
        {navigationMode && isAuthenticated && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-pulse">
            <Keyboard size={20} />
            <div>
              <p className="font-bold text-sm">Modo de Navegação Ativo</p>
              <p className="text-xs opacity-90">Use ↑ ↓ para navegar • Enter para selecionar • N ou ESC para sair</p>
            </div>
          </div>
        )}

  {/* Footer component (renders differently for guest vs auth) */}
        {/* Não mostrar Footer em: Login, Fórum, Chat e Calendário */}
        {activeTab !== "Login" && 
         activeTab !== "Fórum" && 
         activeTab !== "Chat" && 
         activeTab !== "Iatec" &&
         activeTab !== "Calendário" && (
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
