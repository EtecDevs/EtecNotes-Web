# 🔥 Guia de Resolução: Erro auth/network-request-failed

## 📋 Diagnóstico do Problema

O erro `auth/network-request-failed` ocorre quando o Firebase Authentication não consegue conectar aos servidores do Google. Você está vendo este erro ao tentar fazer login com `aluno@teste.com`.

## 🎯 Causas Possíveis (em ordem de probabilidade)

### 1. **Usuário não existe no Firebase Authentication** ⚠️ MAIS PROVÁVEL
- O usuário `aluno@teste.com` pode não existir no Firebase Auth
- Você precisa criar os usuários de teste primeiro

### 2. **Problemas de Rede**
- Firewall bloqueando conexões ao Firebase
- VPN ou proxy interferindo
- Antivírus bloqueando requests
- DNS não resolvendo corretamente

### 3. **Configuração do Firebase**
- credenciais incorretas no `firebase.js`
- AuthDomain não autorizado no Firebase Console

### 4. **Problemas do AdminSDK**
- Chave do Service Account (`etecnotes-firebase-adminsdk.json`) está revogada ou inválida
- Este é o problema que identificamos ao rodar `verify-users.js`

---

## ✅ SOLUÇÕES

### Solução 1: Criar os Usuários de Teste no Firebase Console (RECOMENDADO)

1. Acesse: https://console.firebase.google.com/project/etecnotes/authentication/users

2. Clique em "Add user" e crie os seguintes usuários:

   **Aluno:**
   - Email: `aluno@teste.com`
   - Senha: `123456`
   
   **Professor:**
   - Email: `professor@teste.com`
   - Senha: `123456`
   
   **Admin:**
   - Email: `admin@teste.com`
   - Senha: `123456`
   
   **Dev:**
   - Email: `dev@teste.com`
   - Senha: `123456`

3. Após criar, tente fazer login novamente!

---

### Solução 2: Gerar Nova Chave do AdminSDK

Se você quiser usar scripts de backend para criar usuários automaticamente, precisa gerar uma nova chave:

1. Acesse: https://console.firebase.google.com/project/etecnotes/settings/serviceaccounts/adminsdk

2. Clique em "Generate new private key"

3. Baixe o arquivo JSON

4. Substitua o arquivo `etecnotes-firebase-adminsdk.json` no projeto

5. Execute novamente: `node verify-users.js`

---

### Solução 3: Testar Conexão com Firebase

Abra o arquivo de teste que criei:

**Via VS Code:**
1. Abra o arquivo: `public/test-firebase-connection.html`
2. Clique com botão direito > "Open with Live Server" (se tiver a extensão)
3. OU simplesmente arraste o arquivo para o navegador

**Via Terminal:**
```bash
start public\test-firebase-connection.html
```

Este teste vai:
- ✅ Verificar se o Firebase está inicializado
- ✅ Testar conectividade com os servidores
- ✅ Tentar fazer login com aluno@teste.com
- ✅ Mostrar erros detalhados se algo falhar

---

### Solução 4: Verificar Firewall/Antivírus

Se o teste de conexão falhar:

1. **Desabilite temporariamente o antivírus** e tente novamente
2. **Desabilite VPN** se estiver usando
3. **Verifique o Firewall do Windows:**
   - Configurações > Atualização e Segurança > Segurança do Windows > Firewall
   - Adicione exceção para `node.exe` e seu navegador

4. **Limpe o cache DNS:**
   ```powershell
   ipconfig /flushdns
   ```

---

### Solução 5: Verificar Configuração do Firebase

Confira se as credenciais em `src/config/firebase.js` estão corretas:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBTwYLOnCJAEqDAxxJGn_Yb1XnD0u1XWl0",
    authDomain: "etecnotes.firebaseapp.com",
    projectId: "etecnotes",
    storageBucket: "etecnotes.firebasestorage.app",
    messagingSenderId: "268058028102",
    appId: "1:268058028102:web:4d953d3a48b7f2e6dff8bf"
};
```

Verifique no Firebase Console se correspondem:
https://console.firebase.google.com/project/etecnotes/settings/general

---

## 🧪 Testes Rápidos

### Teste 1: Ping aos servidores
```powershell
ping firebaseapp.com
ping googleapis.com
```
✅ Ambos devem responder!

### Teste 2: Verificar se o projeto existe
Acesse: https://etecnotes.firebaseapp.com
- Se mostrar página do Firebase = ✅ OK
- Se der erro 404 = ❌ Projeto não existe ou está desativado

### Teste 3: Verificar hora do sistema
```powershell
w32tm /resync
```
O Firebase usa JWT que depende da hora estar correta!

---

## 📊 Resultados dos Testes que Fizemos

✅ **Ping ao firebaseapp.com:** OK (tempo médio: 103ms)
✅ **Ping ao googleapis.com:** OK (tempo médio: 164ms)
❌ **Verificação de usuários:** FALHOU (AdminSDK inválido)
❌ **Login no navegador:** FALHOU (auth/network-request-failed)

---

## 🎯 PRÓXIMOS PASSOS RECOMENDADOS

### Passo 1: Criar usuários manualmente no Firebase Console
👉 **Esta é a solução mais rápida!**
1. Vá em: https://console.firebase.google.com/project/etecnotes/authentication/users
2. Crie o usuário `aluno@teste.com` com senha `123456`
3. Tente fazer login novamente no seu app

### Passo 2: Se ainda der erro, use o teste de conexão
1. Abra: `public/test-firebase-connection.html` no navegador
2. Clique em "Testar Login"
3. Veja os erros detalhados
4. Compartilhe comigo os resultados

### Passo 3: Se precisar de AdminSDK
1. Gere nova chave no Firebase Console
2. Substitua `etecnotes-firebase-adminsdk.json`
3. Execute: `node verify-users.js`

---

## 💡 Dica Extra

Se você quiser **pular** o Firebase Authentication temporariamente para testar o resto do app:

1. Edite `src/services/authService.js`
2. Comente a linha do `signInWithEmailAndPassword`
3. Retorne um usuário mock:

```javascript
// Temporário - apenas para desenvolvimento
if (email === 'aluno@teste.com' && password === '123456') {
  const mockUser = {
    id: 'mock-aluno-123',
    uid: 'mock-aluno-123',
    nome: 'João Santos (Aluno)',
    email: 'aluno@teste.com',
    role: 'aluno',
    active: true
  };
  
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('userRole', mockUser.role);
  localStorage.setItem('token', 'mock-token-123');
  
  return mockUser;
}
```

---

## 🆘 Se Nada Funcionar

Entre em contato e compartilhe:
1. Screenshot do console do navegador (F12)
2. Resultado do teste: `public/test-firebase-connection.html`
3. Output de: `ping firebaseapp.com`

---

## 📚 Links Úteis

- Firebase Console: https://console.firebase.google.com/project/etecnotes
- Usuários: https://console.firebase.google.com/project/etecnotes/authentication/users
- Configurações: https://console.firebase.google.com/project/etecnotes/settings/general
- Service Accounts: https://console.firebase.google.com/project/etecnotes/settings/serviceaccounts/adminsdk

---

**Boa sorte! 🚀**
