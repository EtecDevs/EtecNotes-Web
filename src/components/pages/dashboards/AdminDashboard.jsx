"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  TrendingUp,
  Activity,
  Shield,
  Database,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  Lock,
  Key,
} from "lucide-react"
import PermissionsManager from "../admin/PermissionsManager"

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1247,
    totalStudents: 980,
    totalTeachers: 45,
    totalStaff: 12,
    activeUsers: 856,
    pendingApprovals: 8,
    systemHealth: 98.5,
    storageUsed: 67.3,
  })

  const [showPermissionsManager, setShowPermissionsManager] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5ecff] dark:bg-[#121212] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold dark:text-white text-gray-900">
                    Painel do Administrador
                  </h1>
                  <p className="dark:text-gray-400 text-gray-600">
                    Controle total do sistema - CRUD e configurações
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  🔒 Acesso Total
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-blue-500" />
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
              {stats.totalUsers}
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600">Total de Usuários</p>
          </div>

          <div className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <GraduationCap size={24} className="text-green-500" />
              </div>
              <Activity size={16} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
              {stats.totalStudents}
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600">Alunos Cadastrados</p>
          </div>

          <div className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-purple-500" />
              </div>
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
              {stats.totalTeachers}
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600">Professores Ativos</p>
          </div>

          <div className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Shield size={24} className="text-orange-500" />
              </div>
              <AlertCircle size={16} className="text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
              {stats.pendingApprovals}
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600">Pendentes Aprovação</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CRUD Operations */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-900">
                  Operações CRUD
                </h2>
                <Database size={20} className="text-purple-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserPlus size={20} className="text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold dark:text-white text-gray-900">Criar Usuário</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        Adicionar novo usuário ao sistema
                      </p>
                    </div>
                  </div>
                </button>

                <button className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Edit size={20} className="text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold dark:text-white text-gray-900">Editar Usuário</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        Modificar dados de usuários
                      </p>
                    </div>
                  </div>
                </button>

                <button className="p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trash2 size={20} className="text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold dark:text-white text-gray-900">Excluir Usuário</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        Remover usuários do sistema
                      </p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowPermissionsManager(true)}
                  className="p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Key size={20} className="text-purple-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold dark:text-white text-gray-900">Gerenciar Permissões</p>
                      <p className="text-xs dark:text-gray-400 text-gray-600">
                        Criar perfis e atribuir permissões
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* System Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-900">
                  Logs do Sistema
                </h2>
                <FileText size={20} className="text-blue-500" />
              </div>
              <div className="space-y-3">
                {[
                  { action: "Usuário criado", user: "João Silva (Aluno)", time: "há 5 min", type: "success" },
                  { action: "Permissões alteradas", user: "Maria Santos", time: "há 15 min", type: "warning" },
                  { action: "Backup realizado", user: "Sistema", time: "há 1 hora", type: "info" },
                  { action: "Tentativa de acesso negada", user: "IP: 192.168.1.100", time: "há 2 horas", type: "error" },
                ].map((log, index) => (
                  <div
                    key={index}
                    className="p-3 dark:bg-[#0D1117] bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.type === "success"
                            ? "bg-green-500"
                            : log.type === "warning"
                            ? "bg-yellow-500"
                            : log.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium dark:text-white text-gray-900">{log.action}</p>
                        <p className="text-xs dark:text-gray-400 text-gray-600">{log.user}</p>
                      </div>
                    </div>
                    <span className="text-xs dark:text-gray-500 text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* System Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
                Saúde do Sistema
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm dark:text-gray-400 text-gray-600">Status Geral</span>
                    <span className="text-sm font-semibold text-green-500">{stats.systemHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${stats.systemHealth}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm dark:text-gray-400 text-gray-600">Armazenamento</span>
                    <span className="text-sm font-semibold text-blue-500">{stats.storageUsed}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${stats.storageUsed}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700 border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="dark:text-gray-400 text-gray-600">Usuários Ativos</span>
                    <span className="font-semibold dark:text-white text-gray-900">{stats.activeUsers}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="dark:bg-[#1E1E1E] bg-white rounded-xl p-6 border dark:border-[#30363D] border-gray-200"
            >
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
                Acesso Rápido
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 dark:bg-[#0D1117] bg-gray-50 hover:bg-gray-100 dark:hover:bg-[#21262D] rounded-lg transition-all">
                  <p className="text-sm font-medium dark:text-white text-gray-900">Backup Manual</p>
                </button>
                <button className="w-full text-left p-3 dark:bg-[#0D1117] bg-gray-50 hover:bg-gray-100 dark:hover:bg-[#21262D] rounded-lg transition-all">
                  <p className="text-sm font-medium dark:text-white text-gray-900">Relatórios</p>
                </button>
                <button className="w-full text-left p-3 dark:bg-[#0D1117] bg-gray-50 hover:bg-gray-100 dark:hover:bg-[#21262D] rounded-lg transition-all">
                  <p className="text-sm font-medium dark:text-white text-gray-900">Auditoria</p>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Permissions Manager Modal */}
        {showPermissionsManager && (
          <PermissionsManager 
            onClose={() => setShowPermissionsManager(false)}
            onSave={(profiles) => {
              console.log('Perfis salvos:', profiles)
              // Aqui você salvaria os perfis no backend
            }}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
