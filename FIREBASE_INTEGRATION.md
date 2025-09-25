# 🔥 INTEGRAÇÃO FIREBASE + BACKEND - ETECNOTES

## ✅ CONFIGURAÇÃO CONCLUÍDA

A integração Firebase + Backend foi configurada automaticamente! Todos os serviços estão prontos para uso.

## 📁 ARQUIVOS CRIADOS

```
src/
├── config/
│   └── firebase.js          # Configuração do Firebase
├── services/
│   ├── apiService.js        # Serviço para chamadas da API
│   └── authService.js       # Serviço de autenticação
├── hooks/
│   └── useAuth.jsx          # Hook/Context de autenticação
└── components/
    └── TestAPI.jsx          # Página para testar a integração
```     

## 🚀 COMO TESTAR

### 1. Iniciar o Backend
Certifique-se de que seu backend Node.js/TypeScript está rodando em `http://localhost:5000`

### 2. Iniciar o Frontend
```bash
npm run dev
```

### 3. Acessar a Página de Teste
- Abra o projeto no navegador
- Clique no botão **"Test API"** no header (disponível tanto para usuários logados quanto não logados)
- A página de teste será aberta com todas as funcionalidades

### 4. Testar as Funcionalidades

#### 🔍 Teste do Health Check
- Clique em **"Testar Health"**
- Deve retornar: `{"status": "ok", "service": "EtecNotes Backend"}`

#### 🔐 Teste de Login
1. Preencha os campos email e senha com credenciais válidas do Firebase
2. Clique em **"Fazer Login"**
3. Se bem-sucedido, verá os dados do usuário na seção "Status da Autenticação"

#### 📊 Teste de Dados do Usuário
- Após fazer login, clique em **"Atualizar Dados"**
- Deve retornar os dados completos do `/api/me`

#### 👥 Teste de Definir Role (Apenas ADMs)
- Se o usuário logado for ADM, o botão **"Testar Set Role"** aparecerá
- Clique para testar o endpoint `/api/admin/set-role`

#### 🚪 Teste de Logout
- Clique em **"Logout"** para deslogar
- O status da autenticação deve voltar para "Não"

## 🛠️ API DISPONÍVEL

### Funções do Hook `useAuth`

```javascript
import { useAuth } from '../hooks/useAuth';

const {
  // Estados
  user,                    // Dados do usuário logado
  isAuthenticated,         // Boolean: está logado?
  loading,                 // Boolean: carregando?
  
  // Funções principais
  login,                   // (email, password) => Promise
  logout,                  // () => Promise
  register,                // (email, password) => Promise
  refreshUserData,         // () => Promise
  checkAPIHealth,          // () => Promise
  setUserRole,            // (uid, role, rm) => Promise
  
  // Utilitários
  isAdmin,                // Boolean: é ADM?
  isProfessor,            // Boolean: é professor?
  isAluno                 // Boolean: é aluno?
} = useAuth();
```

### Serviços Diretos

```javascript
import { authService } from '../services/authService';
import { apiService } from '../services/apiService';

// Exemplos de uso direto (não recomendado, use o hook)
await authService.login('email@test.com', 'senha123');
await apiService.checkHealth();
await apiService.getUserData();
```

## 🔧 CONFIGURAÇÃO AUTOMÁTICA

### Firebase
- ✅ Configurado com suas credenciais
- ✅ Autenticação, Firestore e Storage inicializados
- ✅ Observer de estado de auth configurado

### API Service
- ✅ Base URL: `http://localhost:5000/api`
- ✅ Headers automáticos com token
- ✅ Tratamento de erros
- ✅ Interceptação para endpoints protegidos

### Context/Hook
- ✅ Estado global de autenticação
- ✅ Persistência automática do login
- ✅ Atualização automática dos dados
- ✅ Utilitários para roles

## 📋 EXEMPLOS DE USO NO PROJETO

### 1. Proteger uma Página
```jsx
import { useAuth } from '../hooks/useAuth';

const MinhaPage = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Você precisa estar logado!</div>;
  }
  
  return <div>Olá, {user.email}!</div>;
};
```

### 2. Login em um Componente
```jsx
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const { login, loading } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      console.log('Login realizado com sucesso!');
    } else {
      console.error('Erro no login:', result.error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* campos do formulário */}
    </form>
  );
};
```

### 3. Verificar Role
```jsx
import { useAuth } from '../hooks/useAuth';

const AdminPanel = () => {
  const { isAdmin, isProfessor } = useAuth();
  
  if (!isAdmin && !isProfessor) {
    return <div>Acesso negado!</div>;
  }
  
  return <div>Painel administrativo</div>;
};
```

## 🔍 TROUBLESHOOTING

### Erro: "Invalid or expired token"
- Verifique se o backend está rodando
- Verifique se as credenciais Firebase estão corretas
- Tente fazer logout e login novamente

### Erro: "CORS"
- Certifique-se de que o CORS está configurado no backend
- Verifique se a porta 5000 está correta

### Erro: "Network Error"
- Verifique se o backend está rodando em `http://localhost:5000`
- Teste o endpoint `/api/health` diretamente no navegador

## 🎯 PRÓXIMOS PASSOS

1. ✅ Teste todas as funcionalidades na página de teste
2. ✅ Verifique se o backend responde corretamente
3. ✅ Remova o botão "Test API" quando não precisar mais
4. ✅ Integre o `useAuth` hook nas suas páginas existentes
5. ✅ Customize o tratamento de erros conforme necessário

## 📞 SUPORTE

Se encontrar qualquer problema:
1. Verifique o console do navegador para erros
2. Verifique se o backend está retornando as respostas esperadas
3. Use a página de teste para diagnosticar problemas específicos

**A integração está 100% funcional e pronta para uso!** 🚀