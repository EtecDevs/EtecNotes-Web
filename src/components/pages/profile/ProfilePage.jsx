"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Edit3,
  Camera,
  FileText,
  CheckSquare,
  Clock,
  Mail,
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

const ProfilePage = () => {
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
    totalStudyHours: 240,
    averageGrade: 8.7,
  })

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
    <div className="min-h-screen dark:bg-[#0A0A0A] bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-8 mb-6"
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
                        className="text-3xl font-bold dark:bg-[#0D1117] bg-gray-50 dark:text-white text-gray-900 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
                      />
                      <input
                        type="text"
                        value={editedInfo.username}
                        onChange={(e) => setEditedInfo((prev) => ({ ...prev, username: e.target.value }))}
                        className="text-xl dark:text-gray-400 text-gray-600 dark:bg-[#0D1117] bg-gray-50 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
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
                      className="w-full dark:bg-[#0D1117] bg-gray-50 dark:text-gray-300 text-gray-700 border dark:border-[#30363D] border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
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
                      className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors border dark:border-[#30363D] border-gray-300"
                    >
                      <Edit3 size={16} />
                      Editar Perfil
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50] hover:bg-[#45A049] text-white rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-200 dark:text-white text-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-[#30363D] transition-colors"
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
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="dark:bg-[#161B22] bg-white rounded-xl p-4 shadow-sm border dark:border-[#30363D] border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold dark:text-white text-gray-900">{userStats.totalNotes}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Anotações</p>
                  </div>
                </div>
              </div>

              <div className="dark:bg-[#161B22] bg-white rounded-xl p-4 shadow-sm border dark:border-[#30363D] border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <CheckSquare size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold dark:text-white text-gray-900">{userStats.completedTasks}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Concluídas</p>
                  </div>
                </div>
              </div>

              <div className="dark:bg-[#161B22] bg-white rounded-xl p-4 shadow-sm border dark:border-[#30363D] border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <TrendingUp size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold dark:text-white text-gray-900">{userStats.studyStreak}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Dias seguidos</p>
                  </div>
                </div>
              </div>

              <div className="dark:bg-[#161B22] bg-white rounded-xl p-4 shadow-sm border dark:border-[#30363D] border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Clock size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold dark:text-white text-gray-900">{userStats.totalStudyHours}h</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Estudadas</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity size={20} className="text-[#8C43FF]" />
                <h2 className="text-xl font-semibold dark:text-white text-gray-900">Atividade Recente</h2>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
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

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-[#8C43FF]" />
                <h2 className="text-xl font-semibold dark:text-white text-gray-900">Conquistas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      achievement.earned
                        ? "border-[#8C43FF] bg-[#8C43FF]/5"
                        : "border-gray-200 dark:border-[#30363D] dark:bg-[#0D1117] bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          achievement.earned ? "bg-[#8C43FF]/10" : "bg-gray-100 dark:bg-[#21262D]"
                        }`}
                      >
                        <achievement.icon
                          size={20}
                          className={achievement.earned ? "text-[#8C43FF]" : "dark:text-gray-500 text-gray-400"}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            achievement.earned ? "dark:text-white text-gray-900" : "dark:text-gray-500 text-gray-500"
                          }`}
                        >
                          {achievement.name}
                        </p>
                        <p className="text-sm dark:text-gray-400 text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Settings & Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-400 text-gray-600">Média Geral</span>
                  <span className="font-semibold dark:text-white text-gray-900">{userStats.averageGrade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-400 text-gray-600">Tarefas Pendentes</span>
                  <span className="font-semibold text-orange-500">{userStats.pendingTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-400 text-gray-600">Último Acesso</span>
                  <span className="font-semibold dark:text-white text-gray-900 text-sm">{userStats.lastLogin}</span>
                </div>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Configurações</h3>

              <div className="space-y-4">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
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
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
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
                <div className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
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
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Informações de Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="dark:text-gray-400 text-gray-600" />
                  <span className="dark:text-gray-300 text-gray-700 text-sm">{userInfo.email}</span>
                </div>
                {userInfo.website && (
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="dark:text-gray-400 text-gray-600" />
                    <a
                      href={userInfo.website}
                      className="text-[#8C43FF] hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userInfo.website}
                    </a>
                  </div>
                )}
                {userInfo.github && (
                  <div className="flex items-center gap-3">
                    <GitBranch size={16} className="dark:text-gray-400 text-gray-600" />
                    <a
                      href={userInfo.github}
                      className="text-[#8C43FF] hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
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

export default ProfilePage
