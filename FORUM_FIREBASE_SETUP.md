# Estrutura Firebase para o Fórum Estudantil

## 📊 Coleções do Firestore

### 1. **courses** (Cursos Disponíveis)
Armazena os cursos da Etec para organizar o fórum por área.

```javascript
{
  id: "auto-generated-id",
  name: "Desenvolvimento de Sistemas",  // Nome do curso
  description: "Discussões sobre programação, algoritmos e projetos",  // Descrição
  icon: "💻",  // Emoji do curso
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Exemplos de cursos para adicionar:**
- Desenvolvimento de Sistemas (💻)
- Administração (📊)
- Logística (📦)
- Recursos Humanos (👥)
- Enfermagem (🩺)
- Geral (📢) - Para conversas gerais

### 2. **messages** (Mensagens do Fórum)
Armazena todas as mensagens enviadas nos cursos.

```javascript
{
  id: "auto-generated-id",
  content: "Olá pessoal! Alguém sabe resolver este algoritmo?",  // Conteúdo da mensagem
  userId: "user-firebase-uid",  // ID do usuário que enviou
  userEmail: "aluno@etec.sp.gov.br",  // Email do usuário
  userName: "João Silva",  // Nome de exibição
  userPhoto: "https://...",  // URL da foto (opcional)
  courseId: "course-id",  // ID do curso
  courseName: "Desenvolvimento de Sistemas",  // Nome do curso
  type: "text",  // Tipo: "text", "gif", "emoji"
  gifUrl: null,  // URL do GIF (se type === "gif")
  createdAt: Timestamp,  // Quando foi enviada
}
```

### 3. **users** (Perfis dos Usuários - OPCIONAL)
Se você quiser dados extras além do Firebase Auth.

```javascript
{
  id: "user-firebase-uid",
  displayName: "João Silva",
  email: "aluno@etec.sp.gov.br",
  photoURL: "https://...",
  course: "Desenvolvimento de Sistemas",  // Curso do aluno
  school: "ETEC de São Paulo",  // Etec de origem
  bio: "Estudante de DS, apaixonado por tecnologia",  // Bio opcional
  role: "aluno",  // ou "professor", "SECRETARIA", "ADMINISTRADOR"
  isOnline: false,  // Status online (gerenciado via Realtime DB)
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔐 Regras de Segurança do Firestore

Adicione estas regras em **Firebase Console > Firestore > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Função helper para verificar autenticação
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Função para verificar se é o próprio usuário
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // COURSES - Leitura pública, escrita apenas admin
    match /courses/{courseId} {
      allow read: if true;  // Todos podem ver os cursos
      allow write: if isAuthenticated() && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMINISTRADOR';
    }
    
    // MESSAGES - Autenticados podem ler e criar
    match /messages/{messageId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
                      request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAuthenticated() && 
                               resource.data.userId == request.auth.uid;
    }
    
    // USERS - Leitura por todos autenticados, escrita apenas próprio usuário
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAuthenticated() && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMINISTRADOR';
    }
  }
}
```

---

## 🚀 Como Adicionar Cursos Iniciais

Você pode adicionar cursos manualmente no Firebase Console ou usar este código:

### Opção 1: Firebase Console (Manual)
1. Acesse Firebase Console
2. Firestore Database
3. Clique em "Start Collection"
4. Nome: `courses`
5. Adicione documentos com os campos acima

### Opção 2: Script JavaScript (Automático)

Crie um arquivo `setup-forum.js` e execute uma vez:

```javascript
import { db } from './src/config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const initialCourses = [
  {
    name: "Geral",
    description: "Conversas gerais sobre a Etec",
    icon: "📢"
  },
  {
    name: "Desenvolvimento de Sistemas",
    description: "Programação, algoritmos e projetos",
    icon: "💻"
  },
  {
    name: "Administração",
    description: "Gestão, finanças e empreendedorismo",
    icon: "📊"
  },
  {
    name: "Logística",
    description: "Supply chain e operações",
    icon: "📦"
  },
  {
    name: "Recursos Humanos",
    description: "Gestão de pessoas e talentos",
    icon: "👥"
  },
  {
    name: "Enfermagem",
    description: "Saúde e cuidados",
    icon: "🩺"
  }
]

async function setupCourses() {
  const coursesRef = collection(db, 'courses')
  
  for (const course of initialCourses) {
    try {
      await addDoc(coursesRef, {
        ...course,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log(`✅ Curso "${course.name}" criado!`)
    } catch (error) {
      console.error(`❌ Erro ao criar "${course.name}":`, error)
    }
  }
}

setupCourses()
```

---

## 📡 Status Online/Offline (OPCIONAL)

Para implementar o indicador de online/offline em tempo real, use o **Realtime Database**:

### Estrutura no Realtime Database:
```json
{
  "onlineStatus": {
    "user-uid-1": {
      "isOnline": true,
      "lastSeen": 1699999999999
    },
    "user-uid-2": {
      "isOnline": false,
      "lastSeen": 1699999888888
    }
  }
}
```

### Código para gerenciar status:
```javascript
import { ref, onDisconnect, set, serverTimestamp } from 'firebase/database'
import { rtdb } from './src/config/firebase'  // Realtime Database instance

function setUserOnlineStatus(userId, isOnline) {
  const userStatusRef = ref(rtdb, `onlineStatus/${userId}`)
  
  set(userStatusRef, {
    isOnline,
    lastSeen: serverTimestamp()
  })
  
  // Automaticamente marcar como offline ao desconectar
  if (isOnline) {
    onDisconnect(userStatusRef).set({
      isOnline: false,
      lastSeen: serverTimestamp()
    })
  }
}

// Chamar quando usuário faz login
setUserOnlineStatus(user.uid, true)

// Chamar quando usuário faz logout
setUserOnlineStatus(user.uid, false)
```

---

## ✅ Checklist de Setup

- [ ] Criar coleção `courses` no Firestore
- [ ] Adicionar cursos iniciais (pelo menos "Geral" e "Desenvolvimento de Sistemas")
- [ ] Configurar regras de segurança do Firestore
- [ ] (Opcional) Criar coleção `users` para perfis estendidos
- [ ] (Opcional) Configurar Realtime Database para status online
- [ ] Testar envio de mensagens
- [ ] Verificar que apenas autenticados podem acessar
- [ ] Testar visualização de perfis

---

## 🎨 Próximos Passos

1. **Adicionar Emojis**: Integrar `emoji-picker-react`
2. **Suporte a GIFs**: Integrar API do Giphy ou Tenor
3. **Notificações**: Badge de contador de mensagens não lidas
4. **Menções**: Usar @ para mencionar usuários
5. **Reações**: Permitir reagir a mensagens com emojis
6. **Moderação**: Sistema de report/flag de mensagens
7. **Busca**: Buscar mensagens por conteúdo ou autor

---

Criado para **EtecNotes** - Fórum Estudantil 🎓
