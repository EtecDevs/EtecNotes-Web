import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

class AuthService {
  constructor() {
    // Removido o API_BASE pois vamos usar apenas Firebase
  }

  async loginWithRole(email, password, role, rm = null) {
    try {
      console.log('Iniciando login Firebase:', { email, role });

      // Lógica especial para administrador (sem senha ou senha vazia)
      if (role === 'ADMINISTRADOR' && email === 'adm@teste.com' && (!password || password.trim() === '')) {
        console.log('Login de administrador sem senha detectado');
        return await this.loginAdminWithoutPassword(email, role);
      }

      // Para usuários da secretaria, verificar se existe no Firestore primeiro
      if (role === 'SECRETARIA' && email === 'secretaria@teste.com') {
        console.log('Login de secretaria detectado');
        return await this.loginSecretariaWithPassword(email, password, role);
      }

      // ========================================
      // 🔥 LOGIN REAL FIREBASE PARA 4 TIPOS DE USUÁRIOS
      // ========================================
      // Mapear emails e roles para os 4 tipos de usuários
      const firebaseTestUsers = {
        'aluno@teste.com': { role: 'aluno', nome: 'João Santos (Aluno)' },
        'professor@teste.com': { role: 'professor', nome: 'Maria Silva (Professor)' },
        'admin@teste.com': { role: 'admin', nome: 'Admin Master' },
        'dev@teste.com': { role: 'dev', nome: 'Dev EtecNotes' }
      };

      const userConfig = firebaseTestUsers[email];
      
      // Se o email está na lista de usuários Firebase E o role bate, fazer login REAL
      if (userConfig && userConfig.role === role) {
        console.log(`🔥 Login REAL de ${role} no Firebase Auth`);
        
        // Fazer login no Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        console.log('✅ Firebase Auth OK:', firebaseUser.uid, firebaseUser.email);
        
        // Criar objeto de usuário completo
        const user = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          nome: userConfig.nome,
          email: firebaseUser.email,
          role: role,
          displayName: userConfig.nome,
          active: true
        };
        
        // Salvar no localStorage
        const token = await firebaseUser.getIdToken();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('token', token);
        
        console.log('✅ Login completo:', user);
        return user;
      }

      // Login normal com Firebase Auth (para outros usuários)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('Firebase Auth OK:', firebaseUser.uid);

      // Buscar dados do usuário no Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        const error = new Error('Usuário não encontrado no banco de dados');
        error.suggestion = 'Entre em contato com a administração.';
        throw error;
      }

      const userData = userDocSnap.data();
      console.log('Dados do Firestore:', userData);

      // Verificar se o role bate
      if (userData.role !== role) {
        const error = new Error(`Você não tem permissão para acessar como ${role}`);
        error.suggestion = `Sua conta está registrada como "${userData.role}". Use a área de login correta.`;
        error.code = 'ROLE_MISMATCH';
        error.userRole = userData.role;
        error.attemptedRole = role;
        throw error;
      }

      // Verificar se a conta está ativa
      if (userData.active === false) {
        const error = new Error('Sua conta está desativada');
        error.suggestion = 'Entre em contato com a administração para reativar sua conta.';
        throw error;
      }

      // Montar objeto do usuário
      const user = {
        id: firebaseUser.uid,
        nome: userData.nome || userData.name || firebaseUser.email,
        email: firebaseUser.email,
        role: userData.role,
        active: userData.active !== false,
        isBootstrap: userData.isBootstrap || false,
        rm: userData.rm || null,
      };

      // Obter token do Firebase
      const token = await firebaseUser.getIdToken();
      
      console.log('Login completo:', user);
      
      // Salvar no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('token', token);

      return user;

    } catch (error) {
      console.error('Erro no login:', error);
      
      // Tratar erros específicos do Firebase
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        error.message = 'Email ou senha incorretos';
        error.suggestion = 'Verifique suas credenciais e tente novamente.';
      } else if (error.code === 'auth/too-many-requests') {
        error.message = 'Muitas tentativas de login';
        error.suggestion = 'Aguarde alguns minutos antes de tentar novamente.';
      } else if (error.code === 'auth/user-disabled') {
        error.message = 'Conta desativada';
        error.suggestion = 'Entre em contato com a administração.';
      } else if (error.code === 'auth/invalid-email') {
        error.message = 'Email inválido';
        error.suggestion = 'Digite um endereço de email válido.';
      } else if (error.code === 'auth/network-request-failed') {
        error.message = 'Erro de conexão';
        error.suggestion = 'Verifique sua conexão com a internet.';
      } else if (error.code === 'permission-denied') {
        error.message = 'Permissões insuficientes no banco de dados';
        error.suggestion = 'Entre em contato com o administrador do sistema.';
      }
      
      throw error;
    }
  }

  // Login especial para administrador sem senha
  async loginAdminWithoutPassword(email, role) {
    try {
      console.log('Processando login de administrador sem senha');

      // Verificar se é o email do administrador cadastrado
      if (email !== 'adm@teste.com') {
        const error = new Error('Email de administrador não reconhecido');
        error.suggestion = 'Verifique se o email está correto. Use adm@teste.com';
        throw error;
      }

      // Dados do administrador baseados no Firestore fornecido
      // Document ID: XbL499e4XVZm4iGA2hyIcmZWioq2
      const adminUser = {
        id: 'XbL499e4XVZm4iGA2hyIcmZWioq2',
        nome: 'Adm God',
        email: 'adm@teste.com',
        role: 'ADMINISTRADOR',
        active: true,
        isBootstrap: true,
        uid: 'XbL499e4XVZm4iGA2hyIcmZWioq2'
      };

      console.log('✅ Administrador autenticado sem senha:', adminUser);

      // Gerar um token simulado para o admin
      const token = `admin-token-${Date.now()}`;

      // Salvar no localStorage
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('userRole', adminUser.role);
      localStorage.setItem('token', token);

      return adminUser;

    } catch (error) {
      console.error('❌ Erro no login de administrador:', error);
      throw error;
    }
  }

  // Login para secretaria com senha
  async loginSecretariaWithPassword(email, password, role) {
    try {
      console.log('Processando login de secretaria');

      // Verificar se é o email da secretaria cadastrado
      if (email !== 'secretaria@teste.com') {
        const error = new Error('Email de secretaria não reconhecido');
        error.suggestion = 'Verifique se o email está correto. Use secretaria@teste.com';
        throw error;
      }

      // Verificar senha
      if (password !== '123456' && password !== 'secretaria123' && password !== 'etec2024') {
        const error = new Error('Senha incorreta');
        error.suggestion = 'Verifique sua senha e tente novamente. (Dica: tente 123456)';
        throw error;
      }

      // Dados da secretaria baseados no Firestore fornecido
      // Document ID: zOT1HpKQFc3mHcsJKGYh
      const secretariaUser = {
        id: 'zOT1HpKQFc3mHcsJKGYh',
        nome: 'Secretaria',
        email: 'secretaria@teste.com',
        role: 'SECRETARIA',
        active: true,
        isBootstrap: true
      };

      console.log('✅ Secretaria autenticada:', secretariaUser);

      // Gerar um token simulado
      const token = `secretaria-token-${Date.now()}`;

      // Salvar no localStorage
      localStorage.setItem('user', JSON.stringify(secretariaUser));
      localStorage.setItem('userRole', secretariaUser.role);
      localStorage.setItem('token', token);

      return secretariaUser;

    } catch (error) {
      console.error('❌ Erro no login de secretaria:', error);
      throw error;
    }
  }

  // Login para usuários de teste (aluno e professor)
  async loginTestUser(email, password, role, rm = null) {
    try {
      console.log(`Processando login de ${role} de teste`);

      // Usuários de teste predefinidos
      const testUsers = {
        // Professores de teste
        'prof@teste.com': {
          id: 'test_prof_1',
          nome: 'Professor Teste',
          email: 'prof@teste.com',
          role: 'professor',
          active: true,
          isBootstrap: false,
          senha: '123456'
        },
        // Alunos de teste
        'user@teste.com': {
          id: 'test_aluno_1',
          nome: 'João Santos',
          email: 'aluno@teste.com',
          role: 'aluno',
          active: true,
          isBootstrap: false,
          rm: '00000',
          senha: '123456'
        },
      };

      // Verificar se o usuário existe
      const testUser = testUsers[email];
      if (!testUser) {
        const error = new Error('Usuário de teste não encontrado');
        error.suggestion = `Tente: prof@teste.com, professor@etec.com, aluno@teste.com ou estudante@etec.com`;
        throw error;
      }

      // Verificar se o role bate
      if (testUser.role !== role) {
        const error = new Error(`Este email é para ${testUser.role}, não ${role}`);
        error.suggestion = `Use a área de login correta para ${testUser.role}.`;
        error.code = 'ROLE_MISMATCH';
        error.userRole = testUser.role;
        error.attemptedRole = role;
        throw error;
      }

      // Verificar senha
      if (testUser.senha !== password) {
        const error = new Error('Senha incorreta');
        error.suggestion = 'Tente: 123456, professor123 ou aluno123';
        throw error;
      }

      // Para alunos, verificar RM se fornecido
      if (role === 'aluno' && rm && testUser.rm !== rm) {
        const error = new Error('RM incorreto');
        error.suggestion = `RM correto para ${testUser.nome}: ${testUser.rm}`;
        throw error;
      }

      // Remover senha do objeto retornado
      const { senha, ...userWithoutPassword } = testUser;

      console.log(`✅ ${role} de teste autenticado:`, userWithoutPassword);

      // Gerar um token simulado
      const token = `${role}-token-${Date.now()}`;

      // Salvar no localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('userRole', userWithoutPassword.role);
      localStorage.setItem('token', token);

      return userWithoutPassword;

    } catch (error) {
      console.error(`❌ Erro no login de ${role}:`, error);
      throw error;
    }
  }

  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async checkTokenValidity() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    // Para tokens simulados (admin, secretaria, professor, aluno), verificar se ainda são válidos
    if (token && user && (token.startsWith('admin-token-') || token.startsWith('secretaria-token-') || token.startsWith('professor-token-') || token.startsWith('aluno-token-'))) {
      // Token simulado é válido se foi criado nas últimas 24 horas
      const timestamp = parseInt(token.split('-').pop());
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      return (now - timestamp) < twentyFourHours;
    }
    
    // Para tokens do Firebase, verificar com o Firebase
    if (token && auth.currentUser) {
      try {
        await auth.currentUser.getIdToken(true);
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return false;
  }

  logout() {
    // Fazer logout do Firebase se estiver logado
    if (auth.currentUser) {
      auth.signOut();
    }
    
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
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
