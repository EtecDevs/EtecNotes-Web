import { auth } from '../config/firebase';

const API_BASE_URL = 'http://localhost:5000/api';

// Função para obter o token do usuário atual
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log('🔑 Token obtido:', token ? 'Token válido' : 'Token nulo');
    console.log('🔑 Token preview:', token ? token.substring(0, 50) + '...' : 'null');
    return token;
  }
  console.log('❌ Usuário não está logado para obter token');
  return null;
};

// Função genérica para fazer requisições
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Headers padrão
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Adicionar token de autorização se não for endpoint público
  if (!endpoint.includes('/health')) {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token adicionado ao header Authorization');
    } else {
      console.log('❌ Nenhum token disponível para adicionar');
    }
  }

  try {
    console.log('🌐 Fazendo requisição:', { url, headers: { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : 'N/A' } });
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('📡 Resposta recebida:', { status: response.status, statusText: response.statusText });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Erro na resposta:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    console.log('✅ Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error(`❌ API Error (${endpoint}):`, error);
    throw error;
  }
};

export const apiService = {
  // Verificar status da API
  checkHealth: async () => {
    return await apiRequest('/health');
  },

  // Obter dados do usuário logado
  getUserData: async () => {
    return await apiRequest('/me');
  },

  // Definir role do usuário (apenas ADMs)
  setUserRole: async (uid, role, rm) => {
    return await apiRequest('/admin/set-role', {
      method: 'POST',
      body: JSON.stringify({ uid, role, rm }),
    });
  },

  // Função genérica para outros endpoints futuros
  request: apiRequest,
};

export default apiService;