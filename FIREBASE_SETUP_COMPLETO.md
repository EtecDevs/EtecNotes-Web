# 🔥 Firebase Setup Completo - EtecNotes

## 📋 Passo 1: Configurar Firestore Rules (DESENVOLVIMENTO)

Vá para **Firebase Console → Firestore Database → Rules** e cole o código abaixo:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // ========================================
    // ⚠️ REGRAS ABERTAS PARA DESENVOLVIMENTO
    // ========================================
    // Qualquer usuário AUTENTICADO pode ler/escrever TUDO
    // ========================================
    
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // ========================================
    // 📝 REGRAS DETALHADAS (USE EM PRODUÇÃO)
    // ========================================
    // Descomente as regras abaixo quando for para produção
    
    // Cursos - Todos podem ler, apenas admin pode criar/editar
    // match /courses/{courseId} {
    //   allow read: if request.auth != null;
    //   allow write: if request.auth != null && 
    //     (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
    //      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'dev');
    // }
    
    // Mensagens - Todos podem ler, apenas membros do curso podem escrever
    // match /messages/{messageId} {
    //   allow read: if request.auth != null;
    //   allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    //   allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    // }
    
    // Perfis de usuários - Apenas o próprio usuário pode editar
    // match /users/{userId} {
    //   allow read: if request.auth != null;
    //   allow write: if request.auth != null && request.auth.uid == userId;
    // }
  }
}
```

**⚠️ IMPORTANTE:** Clique em **"Publish"** para salvar as regras!

---

## 👥 Passo 2: Criar 4 Usuários no Firebase Authentication

Vá para **Firebase Console → Authentication → Users → Add user**

Crie os seguintes usuários **UM POR VEZ**:

### 1️⃣ ALUNO
```
Email: aluno@teste.com
Password: 123456
```

### 2️⃣ PROFESSOR
```
Email: professor@teste.com
Password: 123456
```

### 3️⃣ ADMIN
```
Email: admin@teste.com
Password: 123456
```

### 4️⃣ DEV (Desenvolvedor)
```
Email: dev@teste.com
Password: 123456
```

---

## ✅ Passo 3: Verificar que tudo funciona

1. **Recarregue a página do EtecNotes** (Ctrl + Shift + R)
2. **Faça logout** se estiver logado
3. **Teste cada usuário**:

### Testar ALUNO
```
Email: aluno@teste.com
Senha: 123456
Role: Aluno
```
- ✅ Deve aparecer: "🔥 Firebase Auth State Changed: aluno@teste.com [UID]"
- ✅ Deve mostrar: "✅ Login completo: { uid: '...', nome: 'João Santos (Aluno)' }"

### Testar PROFESSOR
```
Email: professor@teste.com
Senha: 123456
Role: Professor
```
- ✅ Deve aparecer: "🔥 Firebase Auth State Changed: professor@teste.com [UID]"
- ✅ Deve mostrar: "✅ Login completo: { uid: '...', nome: 'Maria Silva (Professor)' }"

### Testar ADMIN
```
Email: admin@teste.com
Senha: 123456
Role: Admin
```
- ✅ Deve aparecer: "🔥 Firebase Auth State Changed: admin@teste.com [UID]"
- ✅ Deve mostrar: "✅ Login completo: { uid: '...', nome: 'Admin Master' }"

### Testar DEV
```
Email: dev@teste.com
Senha: 123456
Role: Dev
```
- ✅ Deve aparecer: "🔥 Firebase Auth State Changed: dev@teste.com [UID]"
- ✅ Deve mostrar: "✅ Login completo: { uid: '...', nome: 'Dev EtecNotes' }"

---

## 🎯 Passo 4: Testar o Fórum

Após fazer login com qualquer um dos 4 usuários:

1. **Clique no botão "Fórum"** (ícone 👥) no header
2. **Verifique no console**:
   - ✅ "✅ Cursos carregados: 8"
   - ✅ UID não deve ser undefined
3. **Veja os 8 cursos** aparecerem na barra lateral esquerda:
   - Desenvolvimento de Sistemas
   - Administração
   - Recursos Humanos
   - Informática para Internet
   - Logística
   - Contabilidade
   - Enfermagem
   - Mecânica
4. **Selecione um curso** e envie uma mensagem de teste
5. **Verifique** que a mensagem aparece em tempo real

---

## 📝 Resumo das Mudanças

### ✅ O que foi feito:

1. **Firestore Rules**: Configuradas para permitir acesso total durante desenvolvimento
2. **authService.js**: Modificado para usar Firebase Authentication REAL para os 4 tipos de usuários
3. **useAuth.jsx**: Já estava configurado com `onAuthStateChanged` para detectar login do Firebase

### 🔑 Credenciais dos 4 Usuários:

| Tipo | Email | Senha | Role |
|------|-------|-------|------|
| Aluno | `aluno@teste.com` | `123456` | `aluno` |
| Professor | `professor@teste.com` | `123456` | `professor` |
| Admin | `admin@teste.com` | `123456` | `admin` |
| Dev | `dev@teste.com` | `123456` | `dev` |

---

## 🐛 Troubleshooting

### ❌ Erro: "Missing or insufficient permissions"
- **Causa**: Firestore Rules não foram publicadas
- **Solução**: Volte ao Firebase Console → Firestore → Rules e clique em "Publish"

### ❌ Erro: "auth/user-not-found"
- **Causa**: Usuário não foi criado no Firebase Authentication
- **Solução**: Vá em Firebase Console → Authentication → Users e crie o usuário

### ❌ Erro: "UID: undefined"
- **Causa**: Usuário não está usando Firebase Auth real
- **Solução**: Verifique se o email está na lista: aluno@teste.com, professor@teste.com, admin@teste.com ou dev@teste.com

### ❌ Cursos não aparecem no fórum
- **Causa 1**: UID está undefined (veja solução acima)
- **Causa 2**: Firestore Rules bloqueando acesso (veja primeira solução)
- **Causa 3**: Cursos não foram criados (execute `node seed-forum-data.js`)

---

## 🚀 Próximos Passos (Opcional)

Depois que tudo estiver funcionando, você pode:

1. **Adicionar fotos de perfil** para cada usuário no Firestore
2. **Criar mais cursos** personalizados
3. **Implementar emoji picker** nas mensagens
4. **Adicionar notificações** de novas mensagens
5. **Configurar regras de produção** (descomentar no arquivo de rules)

---

## 📞 Suporte

Se encontrar algum problema:
1. Verifique o console do navegador (F12)
2. Procure por mensagens começando com 🔥, ✅ ou ❌
3. Confira se todos os passos acima foram seguidos

**Desenvolvido por EtecNotes Team** 💜
