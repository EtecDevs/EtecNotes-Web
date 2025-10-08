import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Edit, UserX, Users, GraduationCap, User, Mail, Hash } from 'lucide-react';
import authService from '../../../services/authService';

const UsersList = ({ onBack }) => {
  const [users, setUsers] = useState({ alunos: [], professores: [] });
  const [filteredUsers, setFilteredUsers] = useState({ alunos: [], professores: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos'); // todos, alunos, professores
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmDeactivate, setShowConfirmDeactivate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, filter, search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await authService.listUsers();
      
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setError('Erro ao carregar usuários: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let alunos = users.alunos;
    let professores = users.professores;

    // Aplicar filtro de busca
    if (search) {
      const searchLower = search.toLowerCase();
      alunos = alunos.filter(user => 
        user.nome?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.rm?.toString().includes(searchLower) ||
        user.turma?.toLowerCase().includes(searchLower) ||
        user.curso?.toLowerCase().includes(searchLower)
      );
      
      professores = professores.filter(user =>
        user.nome?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.departamento?.toLowerCase().includes(searchLower) ||
        user.disciplinas?.some(d => d.toLowerCase().includes(searchLower))
      );
    }

    setFilteredUsers({ alunos, professores });
  };

  const handleEditUser = (user, type) => {
    setEditingUser({ ...user, type });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const { type, ...userData } = editingUser;
      await authService.updateUser(editingUser.id, userData);
      
      setSuccess('Usuário atualizado com sucesso!');
      setEditingUser(null);
      loadUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Erro ao atualizar usuário: ' + error.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeactivateUser = async (uid) => {
    try {
      await authService.deactivateUser(uid);
      
      setSuccess('Usuário desativado com sucesso!');
      setShowConfirmDeactivate(null);
      loadUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Erro ao desativar usuário: ' + error.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const renderUserRow = (user, type) => (
    <tr key={user.id} className={`border-t border-gray-200 dark:border-gray-600 ${!user.active ? 'opacity-50' : ''}`}>
      <td className="px-4 py-3">
        <div className="flex items-center">
          {type === 'aluno' ? (
            <GraduationCap className="w-4 h-4 text-blue-500 mr-2" />
          ) : (
            <User className="w-4 h-4 text-green-500 mr-2" />
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {user.nome}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        {type === 'aluno' ? user.rm : '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        {type === 'aluno' ? (
          <div>
            <div>{user.turma || '-'}</div>
            <div className="text-xs text-gray-500">{user.curso || '-'}</div>
          </div>
        ) : (
          <div>
            <div>{user.departamento || '-'}</div>
            <div className="text-xs text-gray-500">
              {user.disciplinas?.join(', ') || '-'}
            </div>
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
          user.active 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {user.active ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
      </td>
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditUser(user, type)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          {user.active && (
            <button
              onClick={() => setShowConfirmDeactivate(user)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              title="Desativar"
            >
              <UserX className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  const renderEditModal = () => {
    if (!editingUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Editar {editingUser.type === 'aluno' ? 'Aluno' : 'Professor'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={editingUser.nome || ''}
                onChange={(e) => setEditingUser(prev => ({ ...prev, nome: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editingUser.email || ''}
                onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {editingUser.type === 'aluno' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    RM
                  </label>
                  <input
                    type="text"
                    value={editingUser.rm || ''}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, rm: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Turma
                  </label>
                  <input
                    type="text"
                    value={editingUser.turma || ''}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, turma: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Curso
                  </label>
                  <input
                    type="text"
                    value={editingUser.curso || ''}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, curso: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </>
            )}

            {editingUser.type === 'professor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={editingUser.departamento || ''}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, departamento: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Disciplinas (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={editingUser.disciplinas?.join(', ') || ''}
                    onChange={(e) => setEditingUser(prev => ({ 
                      ...prev, 
                      disciplinas: e.target.value.split(',').map(d => d.trim()).filter(d => d)
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setEditingUser(null)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmModal = () => {
    if (!showConfirmDeactivate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirmar Desativação
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tem certeza que deseja desativar o usuário <strong>{showConfirmDeactivate.nome}</strong>?
            Esta ação pode ser revertida posteriormente.
          </p>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmDeactivate(null)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDeactivateUser(showConfirmDeactivate.uid)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Desativar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gerenciar Usuários
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Total: {users.alunos.length + users.professores.length} usuários
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email, RM, turma..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('todos')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                filter === 'todos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Todos ({users.alunos.length + users.professores.length})
            </button>
            
            <button
              onClick={() => setFilter('alunos')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                filter === 'alunos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Alunos ({users.alunos.length})
            </button>
            
            <button
              onClick={() => setFilter('professores')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                filter === 'professores'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Professores ({users.professores.length})
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Usuário
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  RM
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Informações
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Criado em
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {(filter === 'todos' || filter === 'alunos') && 
                filteredUsers.alunos.map(user => renderUserRow(user, 'aluno'))
              }
              {(filter === 'todos' || filter === 'professores') && 
                filteredUsers.professores.map(user => renderUserRow(user, 'professor'))
              }
            </tbody>
          </table>
        </div>

        {filteredUsers.alunos.length === 0 && filteredUsers.professores.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {search ? 'Tente ajustar os filtros de busca' : 'Nenhum usuário cadastrado ainda'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderEditModal()}
      {renderConfirmModal()}
    </div>
  );
};

export default UsersList;