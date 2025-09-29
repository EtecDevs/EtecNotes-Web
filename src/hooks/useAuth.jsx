import { useState, useEffect, useContext, createContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login com role
  const login = async (email, password, role, rm = null) => {
    setLoading(true);
    try {
      await authService.loginWithRole(email, password, role, rm);
      // Buscar usuário atualizado do localStorage
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
      setIsAuthenticated(!!updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Registro (não implementado)
  const register = async () => {
    throw new Error('Registro não implementado');
  };

  // Atualizar dados do usuário (não implementado)
  const refreshUserData = async () => {
    throw new Error('refreshUserData não implementado');
  };

  // Verificar status da API (não implementado)
  const checkAPIHealth = async () => {
    throw new Error('checkAPIHealth não implementado');
  };

  // Definir role do usuário (não implementado)
  const setUserRole = async () => {
    throw new Error('setUserRole não implementado');
  };

  // Remover observer para mudanças no estado de autenticação

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    // Funções utilitárias
    isAdmin: user?.role === 'ADM',
    isProfessor: user?.role === 'professor',
    isAluno: user?.role === 'aluno',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;