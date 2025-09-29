import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const QuickUserSetup = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const createAndSetupUsers = async () => {
    setLoading(true);
    setResults([]);
    setError('');

    const users = [
      { email: 'admin@etec.com', password: '123456', role: 'ADM' },
      { email: 'professor@etec.com', password: '123456', role: 'Professor' },
      { email: 'aluno@etec.com', password: '123456', role: 'Aluno' }
    ];

    try {
      const newResults = [];

      for (const userData of users) {
        try {
          // Tentar criar usuário
          const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
          
          newResults.push({
            email: userData.email,
            uid: userCredential.user.uid,
            role: userData.role,
            status: 'created',
            message: '✅ Criado com sucesso'
          });

          // Fazer logout imediato
          await auth.signOut();

        } catch (createError) {
          if (createError.code === 'auth/email-already-in-use') {
            // Se já existe, tentar fazer login para pegar UID
            try {
              const loginCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
              
              newResults.push({
                email: userData.email,
                uid: loginCredential.user.uid,
                role: userData.role,
                status: 'exists',
                message: '⚠️ Já existe (UID obtido)'
              });

              // Fazer logout imediato
              await auth.signOut();

            } catch (loginError) {
              newResults.push({
                email: userData.email,
                role: userData.role,
                status: 'error',
                message: '❌ Erro: ' + loginError.message
              });
            }
          } else {
            newResults.push({
              email: userData.email,
              role: userData.role,
              status: 'error',
              message: '❌ Erro: ' + createError.message
            });
          }
        }
      }

      setResults(newResults);

    } catch (error) {
      setError('Erro geral: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyUID = (uid) => {
    navigator.clipboard.writeText(uid);
    alert('UID copiado para área de transferência!');
  };

  const copyCredentials = (email) => {
    navigator.clipboard.writeText(`${email} / 123456`);
    alert('Credenciais copiadas!');
  };

  return (
    <div className="fixed top-4 left-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-2xl p-4">
        <div className="text-center mb-3">
          <h3 className="font-bold text-sm">🚀 Setup Rápido</h3>
          <p className="text-xs opacity-90">Criar usuários de teste</p>
        </div>

        <button
          onClick={createAndSetupUsers}
          disabled={loading}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white font-medium py-2 px-4 rounded mb-3 transition-all disabled:opacity-50"
        >
          {loading ? 'Criando...' : '🎯 Criar ADM + Prof + Aluno'}
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-400 rounded p-2 mb-3">
            <p className="text-red-200 text-xs">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{result.role}</span>
                  <span className="text-xs opacity-75">{result.message}</span>
                </div>
                
                <div className="text-xs space-y-1">
                  <button
                    onClick={() => copyCredentials(result.email)}
                    className="block w-full text-left hover:bg-white/10 p-1 rounded"
                  >
                    📧 {result.email}
                  </button>
                  
                  {result.uid && (
                    <button
                      onClick={() => copyUID(result.uid)}
                      className="block w-full text-left hover:bg-white/10 p-1 rounded text-xs font-mono break-all"
                    >
                      🆔 {result.uid.substring(0, 20)}...
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-xs text-center opacity-75 mb-2">
              📋 Próximos passos:
            </p>
            <ol className="text-xs space-y-1 opacity-90">
              <li>1. Copie os UIDs acima</li>
              <li>2. Use o widget à esquerda para definir roles</li>
              <li>3. Faça login com as credenciais</li>
            </ol>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-white/20 text-center">
          <p className="text-xs opacity-75">Senha padrão: <strong>123456</strong></p>
          <p className="text-yellow-300 text-xs mt-1">⚠️ Só desenvolvimento</p>
        </div>
      </div>
    </div>
  );
};

export default QuickUserSetup;