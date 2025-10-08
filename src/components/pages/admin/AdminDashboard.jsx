import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Upload, List, Activity, BarChart3 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import authService from '../../../services/authService';
import CreateStudent from './CreateStudent';
import CreateTeacher from './CreateTeacher';
import ImportUsers from './ImportUsers';
import UsersList from './UsersList';

const AdminDashboard = ({ onLogout }) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    alunos: 0,
    professores: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

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
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Painel da Secretaria
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('create-student')}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Criar Aluno
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('create-teacher')}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Criar Professor
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('import-users')}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Importar Usuários
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('users-list')}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <List className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Listar Usuários
                  </span>
                </button>
              </div>
            </div>

            {/* Atividades Recentes */}
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
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e8ff] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;