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
      
      // Parse da resposta sempre, independente do status
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('❌ Erro ao fazer parse da resposta:', parseError);
        const error = new Error(`Erro de comunicação com o servidor (${response.status})`);
        error.suggestion = 'Verifique sua conexão com a internet e tente novamente.';
        throw error;
      }
      
      if (!response.ok || !responseData.success) {
        console.error('❌ Erro do backend:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        
        // Criar objeto de erro detalhado
        const error = new Error();
        error.message = responseData.error || responseData.message || 'Erro desconhecido';
        error.suggestion = responseData.suggestion || '';
        error.code = responseData.code || '';
        error.userRole = responseData.userRole;
        error.attemptedRole = responseData.attemptedRole;
        
        console.log('🔍 AUTHSERVICE - Erro sendo criado:', {
          originalResponse: responseData,
          createdError: {
            message: error.message,
            suggestion: error.suggestion,
            code: error.code,
            userRole: error.userRole,
            attemptedRole: error.attemptedRole
          }
        });
        
        // Fallback para mensagens padrão se não houver mensagem do backend
        if (!error.message) {
          switch (response.status) {
            case 400:
              error.message = 'Dados inválidos. Verifique suas credenciais.';
              error.suggestion = 'Certifique-se de preencher todos os campos corretamente.';
              break;
            case 401:
              error.message = 'Credenciais inválidas ou usuário não autorizado para este tipo de acesso.';
              error.suggestion = 'Verifique se você está usando a área de login correta para seu tipo de usuário.';
              break;
            case 403:
              error.message = 'Acesso negado. Você não tem permissão para acessar como este tipo de usuário.';
              error.suggestion = 'Verifique se está tentando acessar a área correta para seu perfil.';
              break;
            case 404:
              error.message = 'Usuário não encontrado no sistema.';
              error.suggestion = 'Verifique se o email está correto ou entre em contato com a administração.';
              break;
            case 500:
              error.message = 'Erro interno do servidor. Tente novamente em alguns momentos.';
              error.suggestion = 'Se o problema persistir, entre em contato com o suporte técnico.';
              break;
            default:
              error.message = `Erro no servidor (${response.status}). Tente novamente.`;
              error.suggestion = 'Verifique sua conexão e tente novamente em alguns minutos.';
          }
        }
        
        throw error;
      }
      
      const result = responseData;
      
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
      console.error('❌ Erro no login:', {
        message: error.message,
        email: email,
        role: role,
        fullError: error
      });
      
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