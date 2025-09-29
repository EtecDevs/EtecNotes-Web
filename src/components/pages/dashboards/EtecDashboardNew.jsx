"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { useApi, useApiPost } from "../../../hooks/useApi"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Plus,
  UserPlus,
  Bell,
  Search,
  Edit,
  Trash2,
  Key,
  Eye,
  School,
  BarChart3,
  Settings,
  Home,
  Filter,
  AlertTriangle,
  FileText,
  Download,
  Upload,
  X
} from "lucide-react"
import LoadingSpinner from "../../ui/LoadingSpinner"
import ConfirmDialog from "../../ui/ConfirmDialog"
import Modal from "../../ui/Modal"
import Card from "../../ui/card"

const EtecDashboard = ({ onLogout }) => {
  const { logout } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  
  // Estados para modais
  const [showUserModal, setShowUserModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)

  // Estados para formulários
  const [userForm, setUserForm] = useState({
    nome: '',
    email: '',
    tipo: 'aluno',
    rm: '',
    turma: '',
    senha: ''
  })

  const [notificationForm, setNotificationForm] = useState({
    titulo: '',
    mensagem: '',
    publicoAlvo: 'todos',
    turmaId: '',
    urgente: false
  })

  const [searchFilters, setSearchFilters] = useState({
    tipo: '',
    busca: '',
    status: 'ativo',
    turma: ''
  })

  // APIs
  const { data: stats, loading: statsLoading, refetch: refetchStats } = useApi('/admin/dashboard/stats')
  const { data: usersData, loading: usersLoading, refetch: refetchUsers } = useApi('/admin/users/search', searchFilters)
  const { post: createUser, loading: createUserLoading } = useApiPost()
  const { post: sendNotification, loading: sendNotificationLoading } = useApiPost()

  // Combinar usuários de todos os tipos
  const allUsers = usersData?.results ? [
    ...(usersData.results.alunos || []),
    ...(usersData.results.professores || []),
    ...(usersData.results.administradores || [])
  ] : []

  // Handlers
  const handleCreateUser = async () => {
    try {
      let endpoint = ''
      const userData = { ...userForm }
      
      switch (userForm.tipo) {
        case 'aluno':
          endpoint = '/admin/create-student'
          break
        case 'professor':
          endpoint = '/admin/create-teacher'
          break
        default:
          throw new Error('Tipo de usuário inválido')
      }

      await createUser(endpoint, userData)
      setShowUserModal(false)
      setUserForm({ nome: '', email: '', tipo: 'aluno', rm: '', turma: '', senha: '' })
      refetchUsers()
      refetchStats()
      alert('Usuário criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar usuário: ' + error.message)
    }
  }

  const handleSendNotification = async () => {
    try {
      await sendNotification('/admin/notifications/send', notificationForm)
      setShowNotificationModal(false)
      setNotificationForm({ titulo: '', mensagem: '', publicoAlvo: 'todos', turmaId: '', urgente: false })
      alert('Notificação enviada com sucesso!')
    } catch (error) {
      alert('Erro ao enviar notificação: ' + error.message)
    }
  }

  const handleDeactivateUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/deactivate-user/${user.uid}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        refetchUsers()
        alert('Usuário desativado com sucesso!')
      } else {
        throw new Error('Erro ao desativar usuário')
      }
    } catch (error) {
      alert('Erro: ' + error.message)
    }
  }

  const handleResetPassword = async (user) => {
    const novaSenha = prompt('Digite a nova senha:')
    if (!novaSenha) return

    try {
      const response = await fetch(`http://localhost:5001/api/admin/users/${user.uid}/reset-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novaSenha })
      })

      if (response.ok) {
        alert('Senha redefinida com sucesso!')
      } else {
        throw new Error('Erro ao redefinir senha')
      }
    } catch (error) {
      alert('Erro: ' + error.message)
    }
  }

  // Componente de Estatísticas
  const DashboardStats = () => {
    if (statsLoading) return <LoadingSpinner />

    const statCards = [
      {
        title: 'Alunos Cadastrados',
        value: stats?.stats?.alunos?.total || 0,
        subtitle: `${stats?.stats?.alunos?.ativos || 0} ativos`,
        icon: <GraduationCap className="text-2xl text-blue-600" />,
        color: 'blue'
      },
      {
        title: 'Professores Ativos',
        value: stats?.stats?.professores?.ativos || 0,
        subtitle: `${stats?.stats?.professores?.total || 0} total`,
        icon: <Users className="text-2xl text-green-600" />,
        color: 'green'
      },
      {
        title: 'Turmas',
        value: stats?.stats?.turmas?.ativas || 0,
        subtitle: `${stats?.stats?.turmas?.total || 0} criadas`,
        icon: <School className="text-2xl text-purple-600" />,
        color: 'purple'
      },
      {
        title: 'Eventos Próximos',
        value: stats?.stats?.eventos?.proximos || 0,
        subtitle: `${stats?.stats?.eventos?.total || 0} programados`,
        icon: <Calendar className="text-2xl text-orange-600" />,
        color: 'orange'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard da Secretaria</h2>
          <button
            onClick={refetchStats}
            className="px-4 py-2 bg-[#8C43FF] text-white rounded-lg hover:bg-[#9955FF] transition-colors"
          >
            Atualizar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <Card key={index} className={`border-l-4 border-${card.color}-500 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</h3>
                  <p className={`text-3xl font-bold text-${card.color}-600`}>
                    {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Componente de Ações Rápidas
  const QuickActions = () => {
    const actions = [
      {
        title: 'Cadastrar Aluno',
        description: 'Adicionar novo aluno ao sistema',
        icon: <UserPlus className="text-2xl text-blue-600" />,
        color: 'blue',
        action: () => {
          setUserForm({ ...userForm, tipo: 'aluno' })
          setShowUserModal(true)
        }
      },
      {
        title: 'Cadastrar Professor',
        description: 'Adicionar novo professor',
        icon: <Users className="text-2xl text-green-600" />,
        color: 'green',
        action: () => {
          setUserForm({ ...userForm, tipo: 'professor' })
          setShowUserModal(true)
        }
      },
      {
        title: 'Enviar Notificação',
        description: 'Notificar usuários do sistema',
        icon: <Bell className="text-2xl text-orange-600" />,
        color: 'orange',
        action: () => setShowNotificationModal(true)
      },
      {
        title: 'Relatórios',
        description: 'Gerar relatórios do sistema',
        icon: <BarChart3 className="text-2xl text-purple-600" />,
        color: 'purple',
        action: () => setActiveSection('reports')
      }
    ]

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ações Rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-lg transition-all border-l-4 border-${action.color}-500`}
              onClick={action.action}
            >
              <div className="flex items-center p-2">
                <div className="flex-shrink-0 mr-4">
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{action.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Componente de Busca de Usuários
  const UserManagement = () => {
    return (
      <div className="space-y-6">
        {/* Filtros de Busca */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
            <Filter className="mr-2" />
            Filtros de Busca
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchFilters.busca}
                onChange={(e) => setSearchFilters({...searchFilters, busca: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={searchFilters.tipo}
              onChange={(e) => setSearchFilters({...searchFilters, tipo: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
            >
              <option value="">Todos os tipos</option>
              <option value="alunos">Alunos</option>
              <option value="professores">Professores</option>
              <option value="administradores">Administradores</option>
            </select>
            
            <select
              value={searchFilters.status}
              onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
            
            <button
              onClick={refetchUsers}
              disabled={usersLoading}
              className="px-4 py-2 bg-[#8C43FF] text-white rounded-lg hover:bg-[#9955FF] disabled:opacity-50"
            >
              {usersLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </Card>

        {/* Tabela de Usuários */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">
              Usuários Encontrados ({allUsers.length})
            </h3>
            <button
              onClick={() => {
                setUserForm({ nome: '', email: '', tipo: 'aluno', rm: '', turma: '', senha: '' })
                setShowUserModal(true)
              }}
              className="px-4 py-2 bg-[#8C43FF] text-white rounded-lg hover:bg-[#9955FF] flex items-center"
            >
              <Plus className="mr-2" size={16} />
              Novo Usuário
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-[#2D2D2D]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Info</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#333333]">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-[#2D2D2D]">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#8C43FF] flex items-center justify-center text-white text-sm font-medium">
                          {user.nome?.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.nome}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.tipo === 'aluno' ? 'bg-blue-100 text-blue-800' :
                        user.tipo === 'professor' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {user.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.rm && `RM: ${user.rm}`}
                      {user.turma && ` - ${user.turma}`}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.active !== false ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Redefinir Senha"
                        >
                          <Key size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setConfirmAction(() => () => handleDeactivateUser(user))
                            setShowConfirmDialog(true)
                          }}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Desativar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allUsers.length === 0 && !usersLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Nenhum usuário encontrado</p>
            </div>
          )}
        </Card>
      </div>
    )
  }

  // Renderizar página ativa
  const renderActivePage = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <DashboardStats />
            <QuickActions />
          </div>
        )
      case "users":
        return <UserManagement />
      default:
        return (
          <div className="space-y-8">
            <DashboardStats />
            <QuickActions />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen dark:bg-[#0A0A0A] bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 dark:bg-[#161B22] bg-white border-r dark:border-[#30363D] border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#8C43FF] rounded-xl">
                <School size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold dark:text-white text-gray-900">Secretaria</h1>
                <p className="text-sm dark:text-gray-400 text-gray-600">Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "dashboard"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveSection("users")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "users"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <Users size={20} />
                <span>Usuários</span>
              </button>

              <button
                onClick={() => setActiveSection("events")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "events"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <Calendar size={20} />
                <span>Eventos</span>
              </button>

              <button
                onClick={() => setActiveSection("reports")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "reports"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <BarChart3 size={20} />
                <span>Relatórios</span>
              </button>

              {/* Logout button */}
              <button
                onClick={async () => {
                  await logout()
                  if (onLogout) onLogout()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all dark:text-gray-400 text-gray-600 hover:bg-red-100 dark:hover:bg-red-900/20 mt-8"
              >
                <X size={20} className="text-red-500" />
                <span className="text-red-500">Sair</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderActivePage()}
        </div>
      </div>

      {/* Modal de Usuário */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title={`Cadastrar ${userForm.tipo === 'aluno' ? 'Aluno' : 'Professor'}`}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Usuário
            </label>
            <select
              value={userForm.tipo}
              onChange={(e) => setUserForm({...userForm, tipo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={userForm.nome}
              onChange={(e) => setUserForm({...userForm, nome: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              required
            />
          </div>

          {userForm.tipo === 'aluno' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  RM *
                </label>
                <input
                  type="text"
                  value={userForm.rm}
                  onChange={(e) => setUserForm({...userForm, rm: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Turma
                </label>
                <input
                  type="text"
                  value={userForm.turma}
                  onChange={(e) => setUserForm({...userForm, turma: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Senha *
            </label>
            <input
              type="password"
              value={userForm.senha}
              onChange={(e) => setUserForm({...userForm, senha: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowUserModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-[#333333] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateUser}
              disabled={createUserLoading}
              className="px-4 py-2 bg-[#8C43FF] text-white rounded-lg hover:bg-[#9955FF] disabled:opacity-50"
            >
              {createUserLoading ? 'Criando...' : 'Criar Usuário'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Notificação */}
      <Modal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        title="Enviar Notificação"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="urgente"
              checked={notificationForm.urgente}
              onChange={(e) => setNotificationForm({...notificationForm, urgente: e.target.checked})}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="urgente" className="ml-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <AlertTriangle className="mr-1 text-red-500" size={16} />
              Notificação Urgente
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Público-alvo
            </label>
            <select
              value={notificationForm.publicoAlvo}
              onChange={(e) => setNotificationForm({...notificationForm, publicoAlvo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
            >
              <option value="todos">Todos os usuários</option>
              <option value="alunos">Apenas alunos</option>
              <option value="professores">Apenas professores</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={notificationForm.titulo}
              onChange={(e) => setNotificationForm({...notificationForm, titulo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              placeholder="Título da notificação..."
              maxLength="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mensagem *
            </label>
            <textarea
              value={notificationForm.mensagem}
              onChange={(e) => setNotificationForm({...notificationForm, mensagem: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-[#333333] rounded-lg bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white"
              rows="4"
              placeholder="Mensagem da notificação..."
              maxLength="500"
            />
            <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
              {notificationForm.mensagem.length}/500 caracteres
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowNotificationModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-[#333333] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              Cancelar
            </button>
            <button
              onClick={handleSendNotification}
              disabled={sendNotificationLoading}
              className="px-4 py-2 bg-[#8C43FF] text-white rounded-lg hover:bg-[#9955FF] disabled:opacity-50"
            >
              {sendNotificationLoading ? 'Enviando...' : 'Enviar Notificação'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Dialog de Confirmação */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmAction}
        title="Desativar Usuário"
        message={`Tem certeza que deseja desativar o usuário ${selectedUser?.nome}?`}
        type="danger"
      />
    </div>
  )
}

export default EtecDashboard