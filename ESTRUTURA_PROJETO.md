# 📁 Estrutura do Projeto EtecNotes-Web

## 📋 Visão Geral
Sistema web educacional desenvolvido em React + Vite com Firebase, focado em gestão acadêmica da ETEC.

---

## 🗂️ Estrutura de Diretórios

```
EtecNotes-Web/
│
├── 📄 Arquivos de Configuração (Raiz)
│   ├── package.json                          # Dependências e scripts NPM
│   ├── vite.config.cjs                       # Configuração do Vite (bundler)
│   ├── eslint.config.js                      # Configuração do ESLint
│   ├── postcss.config.js                     # Configuração do PostCSS
│   ├── tailwind.config.js                    # Configuração do Tailwind CSS
│   ├── jsconfig.json                         # Configuração do JavaScript/IntelliSense
│   └── etecnotes-firebase-adminsdk.json     # Chave privada Firebase Admin SDK
│
├── 📄 Arquivos de Documentação (Raiz)
│   ├── README.md                             # Documentação principal do projeto
│   ├── FIREBASE_SETUP_COMPLETO.md           # Tutorial de setup do Firebase
│   ├── FORUM_FIREBASE_SETUP.md              # Configuração do Fórum com Firebase
│   ├── FORUM_README.md                      # Documentação do sistema de Fórum
│   ├── PERMISSIONS_SYSTEM.md                # Sistema de permissões e roles
│   ├── SISTEMA_PAGAMENTOS_README.md         # Sistema de pagamentos de eventos
│   ├── ACESSO_COMPROVANTES.md               # Acesso aos comprovantes de pagamento
│   └── COMPARACAO_ARQUIVOS.md               # Comparações de código
│
├── 📄 Scripts Utilitários (Raiz)
│   ├── create-auth-users.js                 # Script para criar usuários no Firebase Auth
│   ├── seed-forum-data.js                   # Script para popular dados do fórum
│   ├── test-firebase-connection.js          # Testa conexão com Firebase
│   ├── test.mjs                             # Testes gerais
│   └── test2.mjs                            # Testes adicionais
│
├── 📄 Arquivos HTML (Raiz)
│   └── index.html                           # HTML principal (entry point)
│
├── 📁 public/                               # Arquivos públicos estáticos
│   ├── imagens/                             # Imagens públicas
│   ├── icons/                               # Ícones da aplicação
│   └── assets/                              # Outros assets públicos
│
└── 📁 src/                                  # Código fonte da aplicação
    │
    ├── 📄 main.jsx                          # Entry point do React
    │
    ├── 📁 assets/                           # Assets importados no código
    │   ├── etecNotesTeam/                   # Fotos da equipe EtecNotes
    │   ├── events/                          # Imagens de eventos
    │   ├── features/                        # Imagens de funcionalidades
    │   └── imagesGeneral/                   # Imagens gerais
    │
    ├── 📁 components/                       # Componentes React
    │   │
    │   ├── 📄 App.jsx                       # Componente principal da aplicação
    │   ├── 📄 App.css                       # Estilos do App
    │   ├── 📄 index.css                     # Estilos globais + Tailwind
    │   ├── 📄 globals-min.css               # Estilos globais minificados
    │   ├── 📄 Header.jsx                    # Cabeçalho da aplicação
    │   ├── 📄 Footer.jsx                    # Rodapé da aplicação
    │   ├── 📄 ThemeToggle.jsx               # Botão de alternar tema dark/light
    │   ├── 📄 BootstrapPage.jsx             # Página de bootstrap inicial
    │   ├── 📄 BootstrapAdmin.jsx            # Bootstrap para admin
    │   └── 📄 vite-env.d.ts                 # Tipos TypeScript do Vite
    │   │
    │   ├── 📁 accessibility/                # Componentes de Acessibilidade
    │   │   ├── AccessibilityMenu.jsx        # Menu de acessibilidade (WCAG)
    │   │   └── accessibility.css            # Estilos de acessibilidade
    │   │
    │   ├── 📁 auth/                         # Componentes de Autenticação
    │   │   └── ProtectedRoute.jsx           # HOC para rotas protegidas
    │   │
    │   ├── 📁 dev/                          # Ferramentas de Desenvolvimento
    │   │   ├── DevUserCreator.jsx           # Criar usuários (dev mode)
    │   │   ├── QuickUserSetup.jsx           # Setup rápido de usuários
    │   │   └── SetUserRole.jsx              # Definir roles de usuários
    │   │
    │   ├── 📁 navigation/                   # Componentes de Navegação
    │   │   └── TabNavigation.jsx            # Navegação por abas
    │   │
    │   ├── 📁 pages/                        # Páginas da Aplicação
    │   │   │
    │   │   ├── 📁 about/                    # Página Sobre
    │   │   │   └── AboutPage.jsx
    │   │   │
    │   │   ├── 📁 admin/                    # Páginas Administrativas
    │   │   │   ├── AdminDashboard.jsx       # Dashboard do administrador
    │   │   │   ├── ComprovantesPage.jsx     # Gestão de comprovantes
    │   │   │   ├── CreateStudent.jsx        # Criar alunos
    │   │   │   ├── CreateTeacher.jsx        # Criar professores
    │   │   │   ├── EventPaymentsManager.jsx # Gerenciar pagamentos de eventos
    │   │   │   ├── ImportUsers.jsx          # Importar usuários em lote
    │   │   │   ├── PermissionsManager.jsx   # Gerenciar permissões
    │   │   │   └── UsersList.jsx            # Lista de usuários
    │   │   │
    │   │   ├── 📁 calendar/                 # Sistema de Calendário
    │   │   │   ├── CalendarPage.jsx         # Página principal do calendário
    │   │   │   ├── SchedulePage.jsx         # Página de horários
    │   │   │   ├── AddEventModal.jsx        # Modal para adicionar eventos
    │   │   │   ├── AddNoteModal.jsx         # Modal para adicionar notas
    │   │   │   └── Modal.jsx                # Modal genérico
    │   │   │
    │   │   ├── 📁 chat/                     # Sistema de Chat
    │   │   │   └── ChatPage.jsx             # Página de chat em tempo real
    │   │   │
    │   │   ├── 📁 cloud/                    # Armazenamento na Nuvem
    │   │   │   └── CloudPage.jsx            # Página de arquivos na nuvem
    │   │   │
    │   │   ├── 📁 dashboards/               # Dashboards por Tipo de Usuário
    │   │   │   ├── AdminDashboard.jsx       # Dashboard do Admin
    │   │   │   ├── EtecDashboard.jsx        # Dashboard da ETEC
    │   │   │   ├── TeacherDashboard.jsx     # Dashboard do Professor
    │   │   │   └── UserDashboard.jsx        # Dashboard do Aluno
    │   │   │
    │   │   ├── 📁 forum/                    # Sistema de Fórum Estudantil
    │   │   │   ├── forum.jsx                # Página principal do fórum
    │   │   │   ├── ForumChatArea.jsx        # Área de chat do fórum
    │   │   │   ├── ForumSidebar.jsx         # Sidebar esquerda (cursos)
    │   │   │   ├── ForumMembersSidebar.jsx  # Sidebar direita (membros)
    │   │   │   └── [outros componentes]     # Outros componentes do fórum
    │   │   │
    │   │   ├── 📁 inicio/                   # Página Inicial
    │   │   │   └── [componentes home]
    │   │   │
    │   │   ├── 📁 labs/                     # Laboratórios
    │   │   │   └── [componentes labs]
    │   │   │
    │   │   ├── 📁 landing/                  # Landing Page
    │   │   │   └── [componentes landing]
    │   │   │
    │   │   └── 📁 login/                    # Sistema de Login
    │   │       └── [componentes login]
    │   │
    │   └── 📁 ui/                           # Componentes UI Reutilizáveis
    │       ├── button.jsx                   # Botão personalizado
    │       ├── card.jsx                     # Card personalizado
    │       ├── chat-area.jsx                # Área de chat reutilizável
    │       ├── ConfirmDialog.jsx            # Diálogo de confirmação
    │       ├── course-sidebar.jsx           # Sidebar de cursos
    │       ├── forum-layout.jsx             # Layout do fórum
    │       ├── input.jsx                    # Input personalizado
    │       ├── label.jsx                    # Label personalizado
    │       ├── Loading.jsx                  # Componente de loading
    │       ├── LoadingSpinner.jsx           # Spinner de carregamento
    │       ├── members-sidebar.jsx          # Sidebar de membros
    │       ├── Modal.jsx                    # Modal reutilizável
    │       └── Toast.jsx                    # Notificações toast
    │
    ├── 📁 config/                           # Configurações
    │   └── firebase.js                      # Configuração do Firebase
    │
    ├── 📁 constants/                        # Constantes da Aplicação
    │   ├── index.js                         # Constantes gerais
    │   └── permissions.js                   # Constantes de permissões
    │
    ├── 📁 context/                          # Context API do React
    │   └── ThemeContext.jsx                 # Context para tema dark/light
    │
    ├── 📁 examples/                         # Exemplos de Uso
    │   └── PermissionsUsageExamples.jsx     # Exemplos de uso de permissões
    │
    ├── 📁 hooks/                            # Custom Hooks
    │   ├── useApi.js                        # Hook para chamadas API
    │   ├── useAuth.jsx                      # Hook de autenticação
    │   ├── useNavigation.js                 # Hook de navegação
    │   ├── usePermissions.js                # Hook de permissões
    │   └── useSystemStatus.js               # Hook de status do sistema
    │
    ├── 📁 services/                         # Serviços/API
    │   ├── authService.js                   # Serviço de autenticação
    │   └── socketService.js                 # Serviço de WebSocket
    │
    ├── 📁 styles/                           # Estilos Globais
    │   └── tailwind.css                     # Configuração do Tailwind
    │
    └── 📁 utils/                            # Utilitários
        └── index.js                         # Funções auxiliares

```

---

## 🎯 Principais Módulos do Sistema

### 1. **Autenticação e Autorização**
- **Localização:** `src/services/authService.js`, `src/hooks/useAuth.jsx`
- **Função:** Login com Firebase Auth, gestão de sessões, controle de roles
- **Tipos de usuário:** Aluno, Professor, Admin, Dev

### 2. **Sistema de Fórum**
- **Localização:** `src/components/pages/forum/`
- **Função:** Fórum estudantil com chat em tempo real por curso
- **Tecnologias:** Firebase Firestore (real-time), React hooks
- **Features:** 
  - Sidebars redimensionáveis (drag-to-resize)
  - Chat com mensagens em tempo real
  - Perfis de membros
  - Visual moderno com tema roxo (#8C43FF)

### 3. **Sistema de Calendário**
- **Localização:** `src/components/pages/calendar/`
- **Função:** Calendário acadêmico com eventos e notas
- **Features:** Adicionar eventos, notas, visualização mensal/semanal

### 4. **Sistema de Pagamentos**
- **Localização:** `src/components/pages/admin/EventPaymentsManager.jsx`
- **Função:** Gestão de pagamentos de eventos escolares
- **Features:** Upload de comprovantes, validação, histórico

### 5. **Dashboards por Tipo de Usuário**
- **Localização:** `src/components/pages/dashboards/`
- **Tipos:**
  - **AdminDashboard:** Gestão completa do sistema
  - **TeacherDashboard:** Gestão de turmas e notas
  - **UserDashboard:** Visualização de notas e frequência
  - **EtecDashboard:** Informações institucionais

### 6. **Sistema de Permissões**
- **Localização:** `src/constants/permissions.js`, `src/hooks/usePermissions.js`
- **Função:** Controle granular de acesso baseado em roles
- **Features:** Verificação de permissões, proteção de rotas

### 7. **Acessibilidade (WCAG)**
- **Localização:** `src/components/accessibility/`
- **Função:** Menu de acessibilidade com ajustes visuais
- **Features:** Alto contraste, tamanho de fonte, leitor de tela

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18+** - Biblioteca UI
- **Vite** - Build tool e bundler
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações
- **date-fns** - Manipulação de datas

### Backend/Serviços
- **Firebase Authentication** - Autenticação de usuários
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Firebase Storage** - Armazenamento de arquivos
- **Firebase Admin SDK** - Operações administrativas

### Ferramentas de Desenvolvimento
- **ESLint** - Linter JavaScript
- **PostCSS** - Processador CSS
- **Node.js** - Runtime para scripts

---

## 📝 Convenções do Projeto

### Nomenclatura de Arquivos
- **Componentes React:** PascalCase (ex: `ForumPage.jsx`)
- **Hooks:** camelCase com prefixo `use` (ex: `useAuth.jsx`)
- **Serviços:** camelCase com sufixo `Service` (ex: `authService.js`)
- **Utilitários:** camelCase (ex: `index.js`)
- **Constantes:** camelCase (ex: `permissions.js`)

### Estrutura de Componentes
```jsx
// Imports
import React, { useState, useEffect } from 'react'
import { Icon } from 'lucide-react'

// Componente
function ComponentName({ prop1, prop2 }) {
  // States
  const [state, setState] = useState()
  
  // Effects
  useEffect(() => {}, [])
  
  // Handlers
  const handleAction = () => {}
  
  // Render
  return (
    <div>Content</div>
  )
}

export default ComponentName
```

### Estilização
- **Tailwind CSS** para estilos utilitários
- **CSS Modules** para estilos específicos
- **Tema customizado:** Roxo (#8C43FF) como cor primária
- **Dark Mode:** Suporte completo via ThemeContext

---

## 🚀 Scripts Disponíveis

```json
{
  "dev": "vite",                    // Servidor de desenvolvimento
  "build": "vite build",            // Build para produção
  "preview": "vite preview",        // Preview do build
  "lint": "eslint .",               // Verificar código
}
```

### Scripts Utilitários
```bash
node create-auth-users.js          # Criar usuários de teste no Firebase
node seed-forum-data.js            # Popular dados do fórum
node test-firebase-connection.js   # Testar conexão Firebase
```

---

## 🔐 Sistema de Roles e Permissões

### Hierarquia de Usuários
1. **Dev** - Acesso total (desenvolvimento)
2. **Admin** - Gestão completa do sistema
3. **Professor** - Gestão de turmas e conteúdo
4. **Aluno** - Acesso a conteúdo educacional

### Permissões por Módulo
- **Fórum:** Todos podem ler e escrever
- **Calendário:** Todos leem, apenas admin/professor criam eventos
- **Comprovantes:** Alunos enviam, admin valida
- **Usuários:** Apenas admin pode criar/editar

---

## 📦 Principais Dependências

```json
{
  "react": "^18.x",
  "firebase": "^10.x",
  "tailwindcss": "^3.x",
  "lucide-react": "^0.x",
  "framer-motion": "^11.x",
  "date-fns": "^3.x"
}
```

---

## 🎨 Design System

### Cores
- **Primária:** #8C43FF (Roxo)
- **Secundária:** #6B32C3 (Roxo escuro)
- **Sucesso:** #10B981 (Verde)
- **Erro:** #EF4444 (Vermelho)
- **Aviso:** #F59E0B (Laranja)

### Bordas Arredondadas
- **Pequeno:** rounded-lg (8px)
- **Médio:** rounded-xl (12px)
- **Grande:** rounded-2xl (16px)
- **Muito grande:** rounded-3xl (24px)

### Espaçamento
- **Padding:** p-3 (12px), p-4 (16px), p-6 (24px)
- **Gap:** gap-2 (8px), gap-3 (12px), gap-4 (16px)

---

## 📱 Responsividade

- **Mobile First:** Design pensado primeiro para mobile
- **Breakpoints Tailwind:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

---

## 🔒 Segurança

- **Firebase Rules:** Regras de segurança no Firestore
- **Protected Routes:** HOC ProtectedRoute para rotas privadas
- **Validação de Permissões:** Hook usePermissions
- **Sanitização:** Validação de inputs do usuário

---

## 📚 Documentação Adicional

Consulte os arquivos MD na raiz do projeto:
- `FIREBASE_SETUP_COMPLETO.md` - Setup completo do Firebase
- `FORUM_README.md` - Documentação do fórum
- `PERMISSIONS_SYSTEM.md` - Sistema de permissões
- `SISTEMA_PAGAMENTOS_README.md` - Sistema de pagamentos

---

**Última atualização:** 11 de outubro de 2025
**Versão:** 1.0.0
**Equipe:** EtecNotes Team
