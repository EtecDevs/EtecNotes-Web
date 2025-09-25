import { useState, useEffect, useContext, createContext } from 'react';
import { authService } from '../services/authService';
import { apiService } from '../services/apiService';

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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      const result = await authService.logout();
      
      if (result.success) {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const register = async (email, password) => {
    try {
      setLoading(true);
      return await authService.register(email, password);
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dados do usuário
  const refreshUserData = async () => {
    try {
      const result = await authService.getUserData();
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Refresh user data error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  // Verificar status da API
  const checkAPIHealth = async () => {
    try {
      return await apiService.checkHealth();
    } catch (error) {
      console.error('API Health check error:', error);
      throw error;
    }
  };

  // Definir role do usuário
  const setUserRole = async (uid, role, rm) => {
    try {
      return await authService.setUserRole(uid, role, rm);
    } catch (error) {
      console.error('Set user role error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  // Observer para mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Usuário logado, buscar dados completos
          const result = await authService.getUserData();
          if (result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
          } else {
            // Erro ao buscar dados, fazer logout
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          // Usuário não logado
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    refreshUserData,
    checkAPIHealth,
    setUserRole,
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