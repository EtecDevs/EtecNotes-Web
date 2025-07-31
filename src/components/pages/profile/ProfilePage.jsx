"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Edit3,
  Camera,
  FileText,
  CheckSquare,
  Clock,
  User,
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
} from "lucide-react"

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
    lastLogin: "Hoje às 14:30",
  })

  const [userInfo, setUserInfo] = useState({
    name: "Danie Pereira",
    email: "danie.pereira@etec.sp.gov.br",
    class: "3º DS",
    course: "Desenvolvimento de Sistemas",
    profileImage: "/placeholder.svg?height=120&width=120&text=DP",
  })

  const [editedInfo, setEditedInfo] = useState(userInfo)

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
      // Aqui você implementaria a lógica de logout
      console.log("Usuário deslogado")
    }
  }

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      className="dark:bg-[#2D2D2D] bg-white rounded-2xl p-4 shadow-sm border dark:border-[#333333] border-gray-200"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold dark:text-white text-gray-800">{value}</p>
          <p className="text-sm dark:text-gray-400 text-gray-600">{title}</p>
        </div>
      </div>
    </motion.div>
  )

  const InfoField = ({ icon: Icon, label, value, isEditing, onChange, name }) => (
    <div className="flex items-center gap-3 p-3 dark:bg-[#2D2D2D] bg-gray-50 rounded-xl">
      <Icon size={18} className="text-[#8C43FF]" />
      <div className="flex-1">
        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">{label}</p>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full bg-transparent dark:text-white text-gray-800 font-medium outline-none border-b border-[#8C43FF] pb-1"
          />
        ) : (
          <p className="dark:text-white text-gray-800 font-medium">{value}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-2">
            {userInfo.name} - {userInfo.class}
          </h1>
          <p className="dark:text-gray-400 text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              className="dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start gap-6 mb-6">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={userInfo.profileImage || "/placeholder.svg"}
                    alt="Foto de perfil"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#8C43FF]"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-[#8C43FF] hover:bg-[#9955FF] rounded-full text-white transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Welcome Message */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">
                    Bem-vindo de volta, {userInfo.name.split(" ")[0]}!
                  </h2>
                  <p className="dark:text-gray-400 text-gray-600">
                    Você está logado como estudante do curso de {userInfo.course}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  icon={FileText}
                  title="Total de Anotações"
                  value={userStats.totalNotes}
                  color="bg-[#00B2FF]"
                />
                <StatCard
                  icon={CheckSquare}
                  title="Tarefas Pendentes"
                  value={userStats.pendingTasks}
                  color="bg-[#FF4D4D]"
                />
                <StatCard icon={Clock} title="Último Login" value={userStats.lastLogin} color="bg-[#4CAF50]" />
              </div>
            </motion.div>

            {/* About You Section */}
            <motion.div
              className="dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold dark:text-white text-gray-800">Sobre você</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
                  >
                    <Edit3 size={16} />
                    Editar Perfil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50] hover:bg-[#45A049] text-white rounded-xl transition-colors"
                    >
                      <Save size={16} />
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 dark:bg-[#2D2D2D] bg-gray-200 dark:text-white text-gray-700 rounded-xl transition-colors"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <InfoField
                  icon={User}
                  label="Nome Completo"
                  value={isEditing ? editedInfo.name : userInfo.name}
                  isEditing={isEditing}
                  onChange={(name, value) => setEditedInfo((prev) => ({ ...prev, [name]: value }))}
                  name="name"
                />
                <InfoField
                  icon={Mail}
                  label="Email"
                  value={isEditing ? editedInfo.email : userInfo.email}
                  isEditing={isEditing}
                  onChange={(name, value) => setEditedInfo((prev) => ({ ...prev, [name]: value }))}
                  name="email"
                />
                <InfoField
                  icon={GraduationCap}
                  label="Turma"
                  value={isEditing ? editedInfo.class : userInfo.class}
                  isEditing={isEditing}
                  onChange={(name, value) => setEditedInfo((prev) => ({ ...prev, [name]: value }))}
                  name="class"
                />
                <InfoField
                  icon={BookOpen}
                  label="Curso"
                  value={isEditing ? editedInfo.course : userInfo.course}
                  isEditing={isEditing}
                  onChange={(name, value) => setEditedInfo((prev) => ({ ...prev, [name]: value }))}
                  name="course"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-6">
            {/* Preferences Section */}
            <motion.div
              className="dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Preferências</h3>

              <div className="space-y-4">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 dark:bg-[#2D2D2D] bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {theme === "light" ? (
                      <Sun size={18} className="text-[#8C43FF]" />
                    ) : (
                      <Moon size={18} className="text-[#8C43FF]" />
                    )}
                    <div>
                      <p className="dark:text-white text-gray-800 font-medium">Tema</p>
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
                <div className="flex items-center justify-between p-3 dark:bg-[#2D2D2D] bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {notifications ? (
                      <Bell size={18} className="text-[#8C43FF]" />
                    ) : (
                      <BellOff size={18} className="text-[#8C43FF]" />
                    )}
                    <div>
                      <p className="dark:text-white text-gray-800 font-medium">Notificações</p>
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
                <div className="flex items-center justify-between p-3 dark:bg-[#2D2D2D] bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-[#8C43FF]" />
                    <div>
                      <p className="dark:text-white text-gray-800 font-medium">Idioma</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Português (Brasil)</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="dark:bg-[#3D3D3D] bg-white dark:text-white text-gray-800 border dark:border-[#4D4D4D] border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="pt-BR">Português</option>
                    <option value="en-US">English</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 bg-[#FF4D4D] hover:bg-[#E63946] text-white rounded-2xl font-medium transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
