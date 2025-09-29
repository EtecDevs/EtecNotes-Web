// Nova versão: apenas classe AuthService
class AuthService {
  constructor() {
    this.API_BASE = 'http://localhost:5001/api';
  }

  // Login com validação de role
  async loginWithRole(email, password, role, rm = null) {
    try {
      const body = {
        email,
        password,
        role
      };
      if (role === 'aluno' && rm) {
        body.rm = rm;
      }
      const response = await fetch(`${this.API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }
      
      // Debug: verificar se o token existe na resposta
      console.log('✅ Login response:', { success: result.success, hasToken: !!result.token, user: result.user });
      
      // Salvar dados do usuário com estrutura atualizada (id, nome, etc.)
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('userRole', result.user.role);
      
      if (result.token) {
        localStorage.setItem('token', result.token);
        console.log('✅ Token JWT salvo no localStorage');
      } else {
        // Se não há token, é um erro crítico agora
        console.error('❌ ERRO CRÍTICO: Token JWT não retornado pelo backend');
        throw new Error('Token de autenticação não fornecido pelo servidor');
      }
      
      return result.user;
    } catch (error) {
      console.error('❌ Erro no login:', error.message);
      
      // Fallback para usuários de teste locais
      const testUsers = {
        'prof@teste.com': {
          id: 'test_prof_1',
          nome: 'Professor Teste',
          email: 'prof@teste.com',
          role: 'professor',
          status: 'ativo'
        },
        'user@teste.com': {
          id: 'test_aluno_1', 
          nome: 'Aluno Teste',
          email: 'user@teste.com',
          role: 'aluno',
          rm: '00001',
          status: 'ativo'
        }
      };
      
      // Verificar se é um usuário de teste
      const testUser = testUsers[email];
      if (testUser && password === '123456') {
        console.log('🧪 Login de teste realizado:', testUser.nome);
        
        // Salvar dados do usuário de teste
        localStorage.setItem('user', JSON.stringify(testUser));
        localStorage.setItem('userRole', testUser.role);
        localStorage.setItem('token', 'test-token-' + Date.now());
        
        return testUser;
      }
      
      throw error;
    }
  }

  // Login tradicional Firebase (casos especiais)
  // async loginFirebase(email, password) {
  //   // ...implementar se necessário...
  // }

  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Verificar se o token está válido
  async checkTokenValidity() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${this.API_BASE}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token'); // Remover o token JWT
    // Opcional: também fazer logout do Firebase
    // signOut(auth);
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    return user && user.role === requiredRole;
  }
}

const authService = new AuthService();
export default authService;