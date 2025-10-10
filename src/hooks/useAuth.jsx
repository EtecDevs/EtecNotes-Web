import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
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
  const [loading, setLoading] = useState(true); // Mudado para true inicialmente
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 Observer do Firebase Auth para pegar o usuário autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseAuthUser) => {
      console.log('🔥 Firebase Auth State Changed:', firebaseAuthUser?.email, firebaseAuthUser?.uid);
      
      if (firebaseAuthUser) {
        // Usuário autenticado no Firebase
        const localUser = authService.getCurrentUser();
        
        if (localUser) {
          // Mesclar dados do localStorage com Firebase Auth
          const mergedUser = {
            ...localUser,
            uid: firebaseAuthUser.uid,
            email: firebaseAuthUser.email,
            displayName: localUser.nome || firebaseAuthUser.displayName,
          };
          setUser(mergedUser);
          setFirebaseUser(firebaseAuthUser);
          setIsAuthenticated(true);
        } else {
          // Criar usuário básico a partir do Firebase Auth
          const basicUser = {
            uid: firebaseAuthUser.uid,
            email: firebaseAuthUser.email,
            displayName: firebaseAuthUser.displayName,
          };
          setUser(basicUser);
          setFirebaseUser(firebaseAuthUser);
          setIsAuthenticated(true);
        }
      } else {
        // Não autenticado
        setUser(null);
        setFirebaseUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      console.error('❌ Erro de login capturado:', {
        message: error.message,
        suggestion: error.suggestion,
        code: error.code,
        userRole: error.userRole,
        attemptedRole: error.attemptedRole
      });
      return { 
        success: false, 
        error: error.message,
        suggestion: error.suggestion,
        code: error.code,
        userRole: error.userRole,
        attemptedRole: error.attemptedRole
      };
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
    isAdmin: user?.role === 'ADMINISTRADOR',
    isSecretaria: user?.role === 'SECRETARIA',
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