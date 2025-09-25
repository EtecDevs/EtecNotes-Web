import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { apiService } from './apiService';

export const authService = {
  // Login com email e senha
  login: async (email, password) => {
    try {
      console.log('🔍 Tentando login com:', { email, password: '***' });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('✅ Firebase login successful:', { uid: user.uid, email: user.email });
      
      // Obter dados completos do usuário da API
      try {
        const userData = await apiService.getUserData();
        console.log('✅ API getUserData successful:', userData);
        
        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            ...userData.user
          }
        };
      } catch (apiError) {
        console.warn('⚠️ API getUserData failed, but Firebase login worked:', apiError);
        // Retorna apenas os dados do Firebase se a API falhar
        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            role: null,
            rm: null
          }
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error.code, error.message);
      return {
        success: false,
        error: `${error.code}: ${error.message}`
      };
    }
  },

  // Criar conta (registro)
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email
        }
      };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Reset de senha
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Verificar se usuário está logado
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Obter dados completos do usuário
  getUserData: async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está logado');
      }
      
      const userData = await apiService.getUserData();
      return {
        success: true,
        user: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          ...userData.user
        }
      };
    } catch (error) {
      console.error('Get user data error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Definir role do usuário (apenas ADMs)
  setUserRole: async (uid, role, rm) => {
    try {
      const result = await apiService.setUserRole(uid, role, rm);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Set user role error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Observer para mudanças no estado de autenticação
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  // Verificar se o token ainda é válido
  checkTokenValidity: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true); // Force refresh
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
};

export default authService;