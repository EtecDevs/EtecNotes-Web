"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Edit3,
  Camera,
  FileText,
  CheckSquare,
  Clock,
  Mail,
  Info,
  GraduationCap,
  BookOpen,
  Sun,
  Moon,
  Bell,
  BellOff,
  Globe,
  LogOut,
  Save,
  X,
  MapPin,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Activity,
  Star,
  GitBranch,
  Users,
  Zap,
  Brain,
  Coffee,
} from "lucide-react"
import { useTheme } from "../../../context/ThemeContext"

const UserDashboard = () => {
  const { theme, toggleTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("pt-BR")
  const fileInputRef = useRef(null)

  // Dados do usuário (normalmente viriam de uma API)
  const [userStats] = useState({
    totalNotes: 47,
    pendingTasks: 8,
    completedTasks: 156,
    studyStreak: 12,
    lastLogin: "Hoje às 14:30",
    joinDate: "Setembro 2024",
    totalStudyHours: 230,
    // Horas de aulas semanais do aluno (editar conforme necessário)
    weeklyClassHours: 20,
    averageGrade: 8.7,
  })

  // Estimativas baseadas nas aulas semanais
  const estimatedWeeklyLoad = userStats.weeklyClassHours
  const estimatedMonthlyLoad = Math.round(estimatedWeeklyLoad * 4)

  const [userInfo, setUserInfo] = useState({
    name: "Daniel Pereira",
    username: "daniel.pereira",
    email: "danie.pereira@etec.sp.gov.br",
    class: "3º DS",
    course: "Desenvolvimento de Sistemas",
    school: "Etec de Peruíbe",
    location: "Peruíbe, SP",
    bio: "Estudante apaixonado por tecnologia e desenvolvimento. Focado em criar soluções inovadoras e aprender constantemente. Atualmente desenvolvendo projetos em React e Node.js.",
    profileImage: "/placeholder.svg?height=280&width=280&text=DP",
    website: "https://danie.dev",
    github: "https://github.com/zKingDragon",
  })

  const [editedInfo, setEditedInfo] = useState(userInfo)

  // Aba do cartão de contato: 'pessoal' ou 'etec'
  const [contactTab, setContactTab] = useState("pessoal")
  // tooltip / popover state for personal info notice
  const [contactInfoHover, setContactInfoHover] = useState(false)
  const [contactInfoOpen, setContactInfoOpen] = useState(false)
  const contactInfoRef = useRef(null)

  // close tooltip on outside click or Escape
  useEffect(() => {
    if (!contactInfoOpen) return

    function handleOutside(e) {
      if (contactInfoRef.current && !contactInfoRef.current.contains(e.target)) {
        setContactInfoOpen(false)
        setContactInfoHover(false)
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setContactInfoOpen(false)
        setContactInfoHover(false)
      }
    }

    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [contactInfoOpen])

  

  // Dados de atividade recente
  const recentActivity = [
    {
      type: "note",
      title: "Criou uma nova anotação",
      description: "Algoritmos de Ordenação - Bubble Sort",
      time: "2 horas atrás",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      type: "task",
      title: "Completou uma tarefa",
      description: "Exercícios de Matemática - Capítulo 5",
      time: "1 dia atrás",
      icon: CheckSquare,
      color: "text-green-500",
    },
    {
      type: "study",
      title: "Sessão de estudo",
      description: "2h 30min estudando JavaScript",
      time: "2 dias atrás",
      icon: Brain,
      color: "text-purple-500",
    },
    {
      type: "achievement",
      title: "Conquista desbloqueada",
      description: "Streak de 10 dias consecutivos",
      time: "3 dias atrás",
      icon: Award,
      color: "text-yellow-500",
    },
  ]

  // Conquistas/Badges
  const achievements = [
    { name: "Estudante Dedicado", description: "10 dias consecutivos", icon: Target, earned: true },
    { name: "Organizador", description: "50+ anotações criadas", icon: FileText, earned: true },
    { name: "Colaborativo", description: "Participou de 5 grupos", icon: Users, earned: true },
    { name: "Inovador", description: "Usou IA 20+ vezes", icon: Zap, earned: false },
    { name: "Mentor", description: "Ajudou 10 colegas", icon: Star, earned: false },
    { name: "Maratonista", description: "100h de estudo", icon: Coffee, earned: false },
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUserInfo((prev) => ({ ...prev, profileImage: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    setEditedInfo(userInfo)
  }

  const handleSaveProfile = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair da sua conta?")) {
      console.log("Usuário deslogado")
    }
  }

  return (
    <div className="min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-8 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={userInfo.profileImage || "/placeholder.svg?height=280&width=280&text=User"}
                  alt="Foto de perfil"
                  className="w-72 h-72 rounded-2xl object-cover border-4 border-[#8C43FF] shadow-lg"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-4 right-4 p-3 bg-[#8C43FF] hover:bg-[#9955FF] rounded-full text-white transition-colors shadow-lg"
                >
                  <Camera size={20} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editedInfo.name}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, name: e.target.value }))}
                        className="text-3xl font-bold dark:bg-[#0D1117] bg-gray-100 dark:text-white text-gray-900 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
                      />
                      <input
                        type="text"
                        value={editedInfo.username}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, username: e.target.value }))}
                        className="text-xl dark:text-gray-400 text-gray-600 dark:bg-[#0D1117] bg-gray-100 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
                        placeholder="@username"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">{userInfo.name}</h1>
                      <p className="text-xl dark:text-gray-400 text-gray-600 mb-4">@{userInfo.username}</p>
                    </>
                  )}

                  {isEditing ? (
                    <textarea
                      value={editedInfo.bio}
                      onChange={(e) => setEditedInfo((prev) => ({ ...prev, bio: e.target.value }))}
                      className="w-full dark:bg-[#0D1117] bg-gray-100 dark:text-gray-300 text-gray-700 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                      placeholder="Conte um pouco sobre você..."
                    />
                  ) : (
                    <p className="dark:text-gray-300 text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl">
                      {userInfo.bio}
                    </p>
                  )}

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-6 text-sm dark:text-gray-400 text-gray-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>
                        {userInfo.course} - {userInfo.class}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>{userInfo.school}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{userInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Ingressou em {userStats.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 sm:mt-0">
                  {!isEditing ? (
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors border dark:border-[#30363D] border-gray-300"
                    >
                      <Edit3 size={16} />
                      Editar Perfil
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-[#8c43ff] hover:bg-[#21262D] text-white rounded-full transition-colors"
                      >
                        <Save size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-200 dark:text-white text-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-[#30363D] transition-colors"
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {/* Streak (mantido) */}
              <div className="dark:bg-[#0D1117] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#2a2a2a] border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all min-h-[160px] flex flex-col justify-between group hover:border-[#8C43FF] dark:hover:border-[#8C43FF]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/20 group-hover:scale-110 transition-transform">
                      <TrendingUp size={24} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold dark:text-gray-300 text-gray-600 mb-1">Dias seguidos</p>
                      <p className="text-4xl font-extrabold dark:text-white text-gray-900">{userStats.studyStreak}</p>
                    </div>
                  </div>
                  <div className="text-2xl">🔥</div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Mantenha a sequência!</p>
              </div>

              {/* Carga Horária Estimada (novo cartão) */}
              <div className="dark:bg-[#0D1117] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#2a2a2a] border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all min-h-[160px] flex flex-col justify-between group hover:border-[#8C43FF] dark:hover:border-[#8C43FF]">
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#8C43FF]/20 to-[#6B28E6]/10 group-hover:scale-110 transition-transform">
                      <Calendar size={24} className="text-[#8C43FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold dark:text-gray-300 text-gray-600 mb-1">Eventos neste mês</p>
                      <p className="text-4xl font-extrabold dark:text-white text-gray-900">{estimatedWeeklyLoad}<span className="text-sm font-medium text-gray-500 ml-1">/sem</span></p>
                    </div>
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 px-1.5 py-[1px] text-[8px] font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full shadow-sm">ESTIMADA</span>

                </div>
              </div>

              {/* Total de Horas Estudadas (mantido) */}
              <div className="dark:bg-[#0D1117] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#2a2a2a] border-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all min-h-[160px] flex flex-col justify-between group hover:border-[#8C43FF] dark:hover:border-[#8C43FF]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/20 group-hover:scale-110 transition-transform">
                      <Clock size={24} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold dark:text-gray-300 text-gray-600 mb-1">Notas Totais</p>
                      <p className="text-4xl font-extrabold dark:text-white text-gray-900">{userStats.totalNotes}</p>
                    </div>
                  </div>
                  <div className="text-2xl">⏱️</div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Total acumulado desde que você começou a usar o EtecNotes.</p>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity size={20} className="text-[#8C43FF]" />
                <h2 className="text-xl font-semibold dark:text-white text-gray-900">Atividade Recente</h2>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 dark:bg-[#0D1117] bg-gray-100 rounded-xl">
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-[#21262D]`}>
                      <activity.icon size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium dark:text-white text-gray-900">{activity.title}</p>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">{activity.description}</p>
                      <p className="dark:text-gray-500 text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements removed as requested */}
          </div>

          {/* Right Column - Settings & Info */}
          <div className="space-y-6">
            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Configurações</h3>

              <div className="space-y-4">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    {theme === "light" ? (
                      <Sun size={18} className="text-[#8C43FF]" />
                    ) : (
                      <Moon size={18} className="text-[#8C43FF]" />
                    )}
                    <div>
                      <p className="dark:text-white text-gray-900 font-medium">Tema</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        {theme === "light" ? "Modo Claro" : "Modo Escuro"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      theme === "dark" ? "bg-[#8C43FF]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        theme === "dark" ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    {notifications ? (
                      <Bell size={18} className="text-[#8C43FF]" />
                    ) : (
                      <BellOff size={18} className="text-[#8C43FF]" />
                    )}
                    <div>
                      <p className="dark:text-white text-gray-900 font-medium">Notificações</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        {notifications ? "Ativadas" : "Desativadas"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications ? "bg-[#8C43FF]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Language Selection */}
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-[#8C43FF]" />
                    <div>
                      <p className="dark:text-white text-gray-900 font-medium">Idioma</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Português (Brasil)</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="dark:bg-[#21262D] bg-white dark:text-white text-gray-900 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="pt-BR">Português</option>
                    <option value="en-US">English</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900">Informações de Contato</h3>

                <div className="pill-switch">
                  <button
                    role="tab"
                    aria-selected={contactTab === "pessoal"}
                    onClick={() => setContactTab("pessoal")}
                    className={`px-4 py-1.5 text-sm font-medium h-8 flex items-center justify-center ${
                      contactTab === "pessoal" ? "active" : ""
                    }`}
                  >
                    Pessoal
                  </button>

                  <button
                    role="tab"
                    aria-selected={contactTab === "etec"}
                    onClick={() => setContactTab("etec")}
                    className={`px-4 py-1.5 text-sm font-medium h-8 flex items-center justify-center ${
                      contactTab === "etec" ? "active" : ""
                    }`}
                  >
                    Etec
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {contactTab === 'pessoal' ? (
                  <div>
                    <div
                      ref={contactInfoRef}
                      className="relative inline-flex items-center gap-3 mb-2"
                      onMouseLeave={() => {
                        setContactInfoHover(false)
                        setContactInfoOpen(false)
                      }}
                    >
                      <Mail size={16} className="dark:text-gray-400 text-gray-600" />
                      <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{userInfo.email}</span>

                      {/* discreet info 'i' button */}
                      <button
                        onClick={() => setContactInfoOpen(!contactInfoOpen)}
                        onMouseEnter={() => setContactInfoHover(true)}
                        onFocus={() => setContactInfoHover(true)}
                        className="ml-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-[#161616] dark:text-gray-300 transition-colors"
                        aria-label="Informação sobre edição de dados pessoais"
                        aria-expanded={contactInfoOpen}
                        aria-controls="contact-info-tooltip"
                      >
                        <Info size={14} />
                      </button>

                      {(contactInfoHover || contactInfoOpen) && (
                        <div
                          id="contact-info-tooltip"
                          role="tooltip"
                          className="absolute right-0 top-full mt-2 w-72 p-3 rounded-md bg-white border shadow-lg dark:bg-[#0D1117] dark:border-[#30363D] text-sm text-gray-700 dark:text-gray-300 transform origin-top-right animate-show"
                        >
                          <div className="absolute -top-2 right-3 w-3 h-3 rotate-45 bg-white border-l border-t dark:bg-[#0D1117] dark:border-[#30363D]" />
                          <p>
                            Se as informações pessoais estiverem incorretas (nome, turma, escola, etc.), procure a
                            secretaria da sua Etec ou envie uma mensagem no chat solicitando a correção. Essas
                            informações não são editáveis pelo aluno.
                          </p>
                        </div>
                      )}
                    </div>

                    {userInfo.website && (
                      <div className="flex items-center gap-3 mb-2">
                        <Globe size={16} className="dark:text-gray-400 text-gray-600" />
                        <a
                          href={userInfo.website}
                          className="text-[#8C43FF] hover:underline text-sm font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}

                    {userInfo.github && (
                      <div className="flex items-center gap-3">
                        <GitBranch size={16} className="dark:text-gray-400 text-gray-600" />
                        <a
                          href={userInfo.github}
                          className="text-[#8C43FF] hover:underline text-sm font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3">
                      <GraduationCap size={16} className="dark:text-gray-400 text-gray-600" />
                      <div className="text-sm">
                        <div className="font-medium dark:text-white text-gray-900">{userInfo.school}</div>
                        <div className="text-xs dark:text-gray-400 text-gray-600">{userInfo.class} — {userInfo.course}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <MapPin size={16} className="dark:text-gray-400 text-gray-600" />
                      <span className="dark:text-gray-300 text-gray-700 text-sm">{userInfo.location}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <Mail size={16} className="dark:text-gray-400 text-gray-600" />
                      <span className="dark:text-gray-300 text-gray-700 text-sm">secretaria@{userInfo.school.replace(/\s+/g, "").toLowerCase()}.edu.br</span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm dark:text-gray-300 text-gray-700">Telefone:</span>
                      <span className="text-sm dark:text-gray-300 text-gray-700">(13) 1234-5678</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 bg-[#FF4D4D] hover:bg-[#E63946] text-white rounded-2xl font-medium transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={20} />
              Sair da Conta
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
