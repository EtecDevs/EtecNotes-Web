# 💬 Fórum Estudantil - EtecNotes

## ✅ O que foi criado

Adaptei completamente o código do v0 (Next.js + Supabase) para funcionar no **EtecNotes** (React + Firebase)!

### 📁 Arquivos Criados

1. **`ForumPage.jsx`** - Componente principal que gerencia o fórum
2. **`ForumSidebar.jsx`** - Barra lateral com lista de cursos
3. **`ForumChatArea.jsx`** - Área central de mensagens em tempo real
4. **`ForumMembersSidebar.jsx`** - Barra lateral com membros e modal de perfil
5. **`FORUM_FIREBASE_SETUP.md`** - Guia completo de configuração do Firebase

### 🎨 Integração no App.jsx

✅ Adicionado ícone **Users** no header  
✅ Rota "Fórum" no switch case  
✅ Atalho de teclado **F** para acessar o fórum  
✅ Navegação por setas funcional  
✅ Tema roxo (#8C43FF) e dark mode aplicados  

---

## 🚀 Como Usar

### 1️⃣ Configurar Firebase

Siga o arquivo **`FORUM_FIREBASE_SETUP.md`** para:
- Criar coleções `courses` e `messages` no Firestore
- Configurar regras de segurança
- Adicionar cursos iniciais

### 2️⃣ Acessar o Fórum

Depois de configurar o Firebase:

1. Faça login no EtecNotes
2. Clique no ícone **Users** (👥) no header OU pressione **F**
3. Selecione um curso na sidebar esquerda
4. Digite mensagens e pressione Enter ou clique em Enviar

### 3️⃣ Funcionalidades

✅ **Mensagens em tempo real** - Atualizações instantâneas com Firebase onSnapshot  
✅ **Organizado por cursos** - Conversas separadas por área (DS, ADM, etc.)  
✅ **Perfis clicáveis** - Clique em um nome/avatar para ver informações  
✅ **Lista de membros** - Veja quem está online/offline  
✅ **Dark mode** - Alterna automaticamente com o tema  
✅ **Acessibilidade** - Navegação por teclado, ARIA labels, etc.  

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| **F** | Abrir Fórum |
| **Enter** | Enviar mensagem |
| **ESC** | Fechar modal de perfil |
| **← →** | Navegar entre ícones do header |

---

## 📊 Estrutura do Fórum

```
┌─────────────────┬──────────────────────┬─────────────────┐
│  CURSOS         │    CHAT DO CURSO     │    MEMBROS      │
│  (Sidebar)      │    (Mensagens)       │   (Sidebar)     │
├─────────────────┼──────────────────────┼─────────────────┤
│ 📢 Geral        │ # Desenvolvimento... │ ONLINE - 5      │
│ 💻 DS           │ ┌──────────────────┐ │ • João Silva    │
│ 📊 ADM          │ │ João Silva       │ │ • Maria Santos  │
│ 📦 Logística    │ │ há 2 minutos     │ │                 │
│ 👥 RH           │ │ Olá pessoal!     │ │ OFFLINE - 12    │
│ 🩺 Enfermagem   │ └──────────────────┘ │ • Pedro Costa   │
│                 │                      │ • Ana Oliveira  │
│ [Usuário]       │ [Digite mensagem...] │                 │
└─────────────────┴──────────────────────┴─────────────────┘
```

---

## 🔥 Tecnologias Utilizadas

- **React 18+** - Hooks (useState, useEffect, useRef)
- **Firebase Firestore** - Banco de dados em tempo real
- **date-fns** - Formatação de datas ("há 5 minutos")
- **Lucide React** - Ícones (Users, Send, Hash, etc.)
- **Tailwind CSS** - Estilização responsiva

---

## 🛠️ Próximas Melhorias (Opcional)

### Já implementado:
✅ Chat em tempo real  
✅ Organização por cursos  
✅ Perfis de usuários  
✅ Lista de membros  
✅ Dark mode  
✅ Acessibilidade  

### Para implementar depois:
- [ ] **Emojis** - Picker de emojis (emoji-picker-react)
- [ ] **GIFs** - Integração com Giphy API
- [ ] **Notificações** - Badge com contador de mensagens não lidas
- [ ] **Menções** - @usuario para notificar
- [ ] **Reações** - 👍 ❤️ 😂 nas mensagens
- [ ] **Status online/offline** - Via Firebase Realtime Database
- [ ] **Buscar mensagens** - Filtro por conteúdo ou autor
- [ ] **Anexar arquivos** - Upload de imagens/PDFs
- [ ] **Moderação** - Sistema de report/flag

---

## 📝 Exemplo de Uso

### Adicionar um Curso Manualmente

1. Firebase Console → Firestore Database
2. Coleção: `courses`
3. Adicionar documento:
```javascript
{
  name: "Desenvolvimento de Sistemas",
  description: "Programação e algoritmos",
  icon: "💻",
  createdAt: <Timestamp>,
  updatedAt: <Timestamp>
}
```

### Enviar Mensagem via Código
```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config/firebase'

await addDoc(collection(db, 'messages'), {
  content: "Olá pessoal!",
  userId: user.uid,
  userEmail: user.email,
  userName: user.displayName,
  userPhoto: user.photoURL,
  courseId: "curso-id",
  courseName: "Desenvolvimento de Sistemas",
  createdAt: serverTimestamp()
})
```

---

## 🎯 Resultado Final

Você agora tem um **Fórum Estudantil estilo Discord** totalmente integrado ao EtecNotes!

- Interface moderna e responsiva
- Mensagens em tempo real
- Perfis de usuários
- Organização por cursos
- 100% adaptado ao tema do EtecNotes

**Basta configurar o Firebase e está pronto para usar!** 🚀

---

## 📞 Suporte

Se tiver dúvidas sobre:
- Configuração do Firebase → Ver `FORUM_FIREBASE_SETUP.md`
- Estrutura dos componentes → Ver código fonte com comentários
- Adicionar funcionalidades → Consultar seção "Próximas Melhorias"

**Desenvolvido para EtecNotes by AI Assistant** 🤖✨
