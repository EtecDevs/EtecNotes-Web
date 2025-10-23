import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Upload, 
  List, 
  Activity, 
  BarChart3, 
  FileText, 
  Home,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import authService from '../../../services/authService';
import CreateStudent from './CreateStudent';
import CreateTeacher from './CreateTeacher';
import ImportUsers from './ImportUsers';
import UsersList from './UsersList';
import RequerimentosManager from './RequerimentosManager';

const AdminDashboard = ({ onLogout }) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    alunos: 0,
    professores: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  // Itens de navegação da sidebar
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      description: 'Visão geral do sistema'
    },
    {
      id: 'requerimentos',
      name: 'Requerimentos',
      icon: FileText,
      description: 'Gerenciar solicitações'
    },
    {
      id: 'users-list',
      name: 'Usuários',
      icon: Users,
      description: 'Listar usuários'
    },
    {
      id: 'create-student',
      name: 'Criar Aluno',
      icon: UserPlus,
      description: 'Adicionar novo aluno'
    },
    {
      id: 'create-teacher',
      name: 'Criar Professor',
      icon: UserPlus,
      description: 'Adicionar novo professor'
    },
    {
      id: 'import-users',
      name: 'Importar Usuários',
      icon: Upload,
      description: 'Importação em lote'
    }
  ];

  // Carregar estatísticas ao montar componente
  useEffect(() => {
    if (isAdmin) {
      loadStats();
    }
  }, [isAdmin]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await authService.listUsers();
      
      if (response.success) {
        const { alunos, professores } = response.users;
        setStats({
          totalUsers: alunos.length + professores.length,
          alunos: alunos.length,
          professores: professores.length,
          recentActivities: [
            `${alunos.length} alunos cadastrados`,
            `${professores.length} professores cadastrados`,
            'Sistema funcionando normalmente'
          ]
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Se não for admin, não mostrar
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Acesso Negado
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Você não tem permissão para acessar esta área.
          </p>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'create-student':
        return <CreateStudent onBack={() => setActiveTab('dashboard')} onSuccess={loadStats} />;
      case 'create-teacher':
        return <CreateTeacher onBack={() => setActiveTab('dashboard')} onSuccess={loadStats} />;
      case 'import-users':
        return <ImportUsers onBack={() => setActiveTab('dashboard')} onSuccess={loadStats} />;
      case 'users-list':
        return <UsersList onBack={() => setActiveTab('dashboard')} />;
      case 'requerimentos':
        return <RequerimentosManager onBack={() => setActiveTab('dashboard')} />;
      case 'dashboard':
      default:
        return <DashboardContent stats={stats} loading={loading} setActiveTab={setActiveTab} />;
    }
  };

  // Componente do conteúdo do dashboard
  const DashboardContent = ({ stats, loading, setActiveTab }) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Painel Administrativo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bem-vindo, {user?.nome || user?.email}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sistema EtecNotes
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total de Usuários
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {loading ? '...' : stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Alunos
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {loading ? '...' : stats.alunos}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Professores
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {loading ? '...' : stats.professores}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('requerimentos')}
            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
              <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-3 text-left">
              <span className="text-sm font-medium text-gray-900 dark:text-white block">
                Gerenciar Requerimentos
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Aprovar ou rejeitar solicitações
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('users-list')}
            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <List className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3 text-left">
              <span className="text-sm font-medium text-gray-900 dark:text-white block">
                Visualizar Usuários
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Lista completa de usuários
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('create-student')}
            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
              <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3 text-left">
              <span className="text-sm font-medium text-gray-900 dark:text-white block">
                Criar Novo Aluno
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Adicionar aluno ao sistema
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Status do Sistema */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Status do Sistema
        </h2>
        <div className="space-y-2">
          {stats.recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header da Sidebar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">EtecNotes</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navegação */}
        <div className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={!sidebarOpen ? item.name : ''}
              >
                <Icon size={20} className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && (
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer da Sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {(user?.nome || user?.email || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.nome || 'Admin'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Administrador
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={onLogout}
            className={`w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
            title={!sidebarOpen ? 'Sair' : ''}
          >
            <LogOut size={20} className={sidebarOpen ? 'mr-3' : ''} />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;