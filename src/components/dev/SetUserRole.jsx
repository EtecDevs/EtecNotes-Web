import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import { auth } from '../../config/firebase';

const SetUserRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [uid, setUid] = useState('');
  const [role, setRole] = useState('SECRETARIA');
  const [rm, setRm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSetRole = async (e) => {
    e.preventDefault();
    
    if (!uid.trim()) {
      setError('UID é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResult(null);

      // Primeiro tentar obter um token se o usuário estiver logado
      const API_BASE_URL = 'http://localhost:5001/api';
      const headers = {
        'Content-Type': 'application/json'
      };

      // Tentar obter token se houver usuário logado
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          headers.Authorization = `Bearer ${token}`;
        }
      } catch (tokenError) {
        console.warn('Não foi possível obter token:', tokenError);
      }
      
      const response = await fetch(`${API_BASE_URL}/admin/set-role`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          uid: uid.trim(),
          role: role,
          rm: rm.trim() || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }
      
      setResult(`✅ Role "${role}" definida com sucesso para o usuário!`);
      setUid('');
      setRm('');
      
    } catch (err) {
      setError(`❌ Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Mostrar sempre (helper de desenvolvimento)
  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4">
        <h3 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">
          🛠️ Definir Role de Usuário
        </h3>
        
        <form onSubmit={handleSetRole} className="space-y-3">
          {/* UID do usuário */}
          <div>
            <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
              UID do Firebase *
            </label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="Cole o UID aqui..."
              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
              Role *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="SECRETARIA">👑 Administrador</option>
              <option value="professor">👨‍🏫 Professor</option>
              <option value="aluno">🎓 Aluno</option>
            </select>
          </div>

          {/* RM (apenas para alunos) */}
          {role === 'aluno' && (
            <div>
              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
                RM (para alunos)
              </label>
              <input
                type="text"
                value={rm}
                onChange={(e) => setRm(e.target.value)}
                placeholder="12345"
                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-medium disabled:opacity-50"
          >
            {loading ? 'Definindo...' : 'Definir Role'}
          </button>
        </form>

        {/* Resultado */}
        {result && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2">
            <p className="text-green-800 dark:text-green-200 text-xs">{result}</p>
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
            <p className="text-red-800 dark:text-red-200 text-xs">{error}</p>
          </div>
        )}

        {/* Instruções */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
            ⚠️ <strong>Erro 403: Precisa ser SECRETARIA para definir roles</strong>
          </p>
          
          <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs">
            <p className="text-red-800 dark:text-red-200 mb-2">
              <strong>📋 Soluções:</strong>
            </p>
            <ol className="text-red-700 dark:text-red-300 space-y-1">
              <li>1. <strong>Desabilite autenticação</strong> temporariamente no backend</li>
              <li>2. <strong>Crie endpoint /setup/admin</strong> sem auth</li>
              <li>3. <strong>Defina role direto no Firestore</strong></li>
            </ol>
          </div>
          
          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
            <p className="text-blue-800 dark:text-blue-200 mb-1">
              <strong>🔧 Firestore direto:</strong>
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              Vá no Firebase Console → Firestore → users → [UID] → role: "SECRETARIA"
            </p>
          </div>

          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              <strong>PowerShell (se backend permitir):</strong>
            </p>
            <code className="text-gray-800 dark:text-gray-200 break-all block">
              $body = @&#123;uid="SEU_UID"; role="SECRETARIA"&#125; | ConvertTo-Json
              <br />
              Invoke-RestMethod -Uri "http://localhost:5001/api/admin/set-role" -Method POST -Body $body -ContentType "application/json"
            </code>
          </div>
        </div>

        <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-3 text-center">
          ⚠️ Helper temporário
        </p>
      </div>
    </div>
  );
};

export default SetUserRole;