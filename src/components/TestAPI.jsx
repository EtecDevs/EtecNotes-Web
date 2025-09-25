import React from 'react';
import { useAuth } from '../hooks/useAuth';

const TestAPI = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    login, 
    logout,
    register,
    checkAPIHealth, 
    refreshUserData,
    setUserRole,
    isAdmin,
    isProfessor,
    isAluno
  } = useAuth();

  const [testResults, setTestResults] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const addTestResult = (test, result, error = null) => {
    setTestResults(prev => [...prev, {
      test,
      result,
      error,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleTestHealth = async () => {
    try {
      const result = await checkAPIHealth();
      addTestResult('API Health Check', 'SUCCESS', JSON.stringify(result, null, 2));
    } catch (error) {
      addTestResult('API Health Check', 'ERROR', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('🔍 Dados do formulário:', { email, password });
      const result = await login(email, password);
      if (result.success) {
        addTestResult('Login', 'SUCCESS', `Logado como: ${result.user.email}`);
      } else {
        addTestResult('Login', 'ERROR', result.error);
      }
    } catch (error) {
      addTestResult('Login', 'ERROR', error.message);
    }
  };

  const handleCreateTestUser = async () => {
    try {
      const testEmail = 'teste@etecnotes.com';
      const testPassword = '123456789';
      
      const result = await register(testEmail, testPassword);
      if (result.success) {
        addTestResult('Criar Usuário Teste', 'SUCCESS', `Usuário criado: ${testEmail}`);
        setEmail(testEmail);
        setPassword(testPassword);
      } else {
        addTestResult('Criar Usuário Teste', 'ERROR', result.error);
      }
    } catch (error) {
      addTestResult('Criar Usuário Teste', 'ERROR', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        addTestResult('Logout', 'SUCCESS', 'Deslogado com sucesso');
      } else {
        addTestResult('Logout', 'ERROR', result.error);
      }
    } catch (error) {
      addTestResult('Logout', 'ERROR', error.message);
    }
  };

  const handleRefreshUserData = async () => {
    try {
      const result = await refreshUserData();
      if (result.success) {
        addTestResult('Refresh User Data', 'SUCCESS', JSON.stringify(result.user, null, 2));
      } else {
        addTestResult('Refresh User Data', 'ERROR', result.error);
      }
    } catch (error) {
      addTestResult('Refresh User Data', 'ERROR', error.message);
    }
  };

  const handleSetRole = async (uid, role, rm) => {
    try {
      const result = await setUserRole(uid, role, rm);
      if (result.success) {
        addTestResult('Set User Role', 'SUCCESS', `Role ${role} definida para ${uid}`);
      } else {
        addTestResult('Set User Role', 'ERROR', result.error);
      }
    } catch (error) {
      addTestResult('Set User Role', 'ERROR', error.message);
    }
  };

  const handleTestToken = async () => {
    try {
      // Importar diretamente do Firebase Auth
      const { auth } = await import('../config/firebase');
      const user = auth.currentUser;
      
      if (!user) {
        addTestResult('Test Token', 'ERROR', 'Usuário não está logado');
        return;
      }

      const token = await user.getIdToken();
      const tokenPreview = token ? token.substring(0, 50) + '...' : 'null';
      
      addTestResult('Test Token', 'SUCCESS', `Token obtido: ${tokenPreview}`);
      
      // Teste manual da requisição
      const response = await fetch('http://localhost:5000/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addTestResult('Test Manual API Call', 'SUCCESS', JSON.stringify(data, null, 2));
      } else {
        addTestResult('Test Manual API Call', 'ERROR', `${response.status}: ${data.error || data.message}`);
      }
      
    } catch (error) {
      addTestResult('Test Token', 'ERROR', error.message);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Teste de Integração API</h1>

        {/* Status do usuário */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status da Autenticação</h2>
          <div className="space-y-2">
            <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sim' : 'Não'}</p>
            {user && (
              <>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>UID:</strong> {user.uid}</p>
                <p><strong>Role:</strong> {user.role || 'Não definida'}</p>
                <p><strong>RM:</strong> {user.rm || 'Não definido'}</p>
                <p><strong>É Admin:</strong> {isAdmin ? 'Sim' : 'Não'}</p>
                <p><strong>É Professor:</strong> {isProfessor ? 'Sim' : 'Não'}</p>
                <p><strong>É Aluno:</strong> {isAluno ? 'Sim' : 'Não'}</p>
              </>
            )}
          </div>
        </div>

        {/* Formulário de Login */}
        {!isAuthenticated && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            
            {/* Botão para criar usuário de teste */}
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-700 mb-2">
                💡 <strong>Dica:</strong> Crie um usuário de teste primeiro para garantir que funciona
              </p>
              <button
                onClick={handleCreateTestUser}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm"
              >
                🚀 Criar Usuário de Teste
              </button>
              <p className="text-xs text-blue-600 mt-1">
                Criará: teste@etecnotes.com / 123456789
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="teste@etecnotes.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="123456789"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Fazer Login
              </button>
            </form>
          </div>
        )}

        {/* Botões de teste */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testes da API</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={handleTestHealth}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Testar Health
            </button>
            
            <button
              onClick={() => {
                addTestResult('Firebase Config', 'INFO', JSON.stringify({
                  projectId: 'etecnotes',
                  authDomain: 'etecnotes.firebaseapp.com',
                  apiKey: 'AIzaSyBTwYLOnCJAEqDAxxJGn_Yb1XnD0u1XWl0'
                }, null, 2));
              }}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              Ver Config Firebase
            </button>
            
            {isAuthenticated && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Logout
                </button>
                
                <button
                  onClick={handleRefreshUserData}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Atualizar Dados
                </button>
                
                <button
                  onClick={handleTestToken}
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
                  Testar Token
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleSetRole(user.uid, 'professor', 'RM123')}
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    Testar Set Role
                  </button>
                )}
              </>
            )}
            
            <button
              onClick={clearResults}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Limpar Resultados
            </button>
          </div>
        </div>

        {/* Resultados dos testes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Resultados dos Testes</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Nenhum teste executado ainda.</p>
            ) : (
              testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.result === 'SUCCESS'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{result.test}</h3>
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                  </div>
                  <div className={`text-sm font-medium mb-2 ${
                    result.result === 'SUCCESS' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.result}
                  </div>
                  {result.error && (
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {result.error}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAPI;