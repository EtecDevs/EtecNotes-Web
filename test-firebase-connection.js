// Script de teste para verificar a conexão com Firebase
// Execute com: node test-firebase-connection.js

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/config/firebase.js';

// Função de teste
const testFirebaseConnection = async () => {
  console.log('🔥 Testando conexão com Firebase...');
  
  try {
    // Teste básico de inicialização
    console.log('✅ Firebase Auth inicializado:', auth.app.name);
    console.log('✅ Projeto ID:', auth.app.options.projectId);
    console.log('✅ Auth Domain:', auth.app.options.authDomain);
    
    // Teste de conexão com API (opcional - descomente se quiser testar login)
    /*
    const testLogin = await signInWithEmailAndPassword(auth, 'test@test.com', 'password123');
    console.log('✅ Login teste funcionou:', testLogin.user.uid);
    */
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.code, error.message);
  }
};

// Teste de conexão com backend
const testBackendConnection = async () => {
  console.log('🚀 Testando conexão com Backend...');
  
  try {
    const response = await fetch('http://localhost:5001/api/health');
    const data = await response.json();
    console.log('✅ Backend respondeu:', data);
    
    const adminCheck = await fetch('http://localhost:5001/api/check-admin');
    const adminData = await adminCheck.json();
    console.log('✅ Status admin:', adminData);
    
  } catch (error) {
    console.error('❌ Erro na conexão com backend:', error.message);
    console.log('⚠️  Certifique-se de que o backend está rodando na porta 5001');
  }
};

// Executar testes
testFirebaseConnection();
testBackendConnection();

console.log(`
🔧 CONFIGURAÇÕES APLICADAS:
📡 URL da API: http://localhost:5001/api (corrigida de 5000 para 5001)
🔑 Firebase Config: Atualizada com credenciais corretas
🎯 Arquivos corrigidos:
   - src/services/authService.js
   - src/services/authService.js
   - src/config/firebase.js
   - src/hooks/useSystemStatus.js
   - src/constants/index.js
   - src/components/BootstrapPage.jsx
   - src/components/BootstrapAdmin.jsx
   - src/components/dev/SetUserRole.jsx

✅ PRÓXIMOS PASSOS PARA TESTAR:
1. Certifique-se de que o backend está rodando na porta 5001
2. Verifique se existe um usuário no Firebase Authentication
3. Teste o login com credenciais válidas
4. Se der erro 403, o usuário precisa de role de SECRETARIA no banco

🆘 SE AINDA DER ERRO:
- Verifique o console do navegador para detalhes do erro
- Confirme que o backend está respondendo em http://localhost:5001/api/health
- Verifique se o usuário existe no Firebase Console > Authentication > Users
`);