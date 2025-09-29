import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar mensagem
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Acesso Restrito
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Você precisa fazer login para acessar esta área.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verificar role específica se fornecida
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Acesso Negado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Você não tem permissão para acessar esta área.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Role necessária: <span className="font-medium">{requiredRole}</span><br/>
              Sua role: <span className="font-medium">{user.role || 'Não definida'}</span>
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verificar roles permitidas se fornecidas
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Acesso Negado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Você não tem permissão para acessar esta área.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Roles permitidas: <span className="font-medium">{allowedRoles.join(', ')}</span><br/>
              Sua role: <span className="font-medium">{user.role || 'Não definida'}</span>
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Se passou por todas as verificações, renderizar o conteúdo
  return children;
};

export default ProtectedRoute;