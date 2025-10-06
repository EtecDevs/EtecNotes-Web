/**
 * EXEMPLO DE USO DO SISTEMA DE PERMISSÕES
 * 
 * Este arquivo demonstra como usar o sistema de permissões granulares
 * no componente LabsControl e em outros componentes.
 */

// ============================================
// EXEMPLO 1: LabsControl com Permissões
// ============================================

import { usePermissions } from '../hooks/usePermissions'

const LabsControl = () => {
  const { can, canAny } = usePermissions()

  return (
    <div>
      {/* Qualquer um com LABS_VIEW pode ver a lista */}
      {can('LABS_VIEW') && (
        <div>
          <h2>Laboratórios Disponíveis</h2>
          {/* Lista de laboratórios */}
        </div>
      )}

      {/* Apenas quem tem LABS_RESERVE pode fazer reserva */}
      {can('LABS_RESERVE') && (
        <button>Reservar Laboratório</button>
      )}

      {/* FUNCIONALIDADE ESPECIAL: Monitor de Lab */}
      {/* Apenas usuários com LABS_CONTROL podem selecionar qual lab usar */}
      {can('LABS_CONTROL') && (
        <div className="monitor-controls">
          <h3>🎯 Controles de Monitor</h3>
          <p>Selecione qual laboratório você está utilizando agora:</p>
          
          <select>
            <option>Lab 1 - Informática</option>
            <option>Lab 2 - Programação</option>
            <option>Lab 3 - Redes</option>
          </select>
          
          <button>Iniciar Uso do Lab</button>
          <button>Finalizar Uso</button>
        </div>
      )}

      {/* Apenas professores e admins podem gerenciar labs */}
      {can('LABS_MANAGE') && (
        <div className="admin-section">
          <button>Criar Novo Lab</button>
          <button>Editar Lab</button>
          <button>Excluir Lab</button>
        </div>
      )}

      {/* Aprovar reservas - Secretaria e Admin */}
      {can('LABS_APPROVE') && (
        <div className="approval-section">
          <h3>Reservas Pendentes de Aprovação</h3>
          {/* Lista de aprovações */}
        </div>
      )}
    </div>
  )
}

// ============================================
// EXEMPLO 2: Criando Usuário com Perfil Customizado
// ============================================

/*
  Quando o ADMINISTRADOR cria um novo usuário, ele pode:
  
  1. Escolher um perfil pré-definido (Aluno, Professor, Monitor de Lab, etc.)
  2. Criar um perfil customizado com permissões específicas
  
  Exemplo de criação de usuário Monitor de Lab:
*/

const createLabMonitor = async (userData) => {
  const newUser = {
    name: "João Silva",
    email: "joao.silva@etec.sp.gov.br",
    role: "aluno",  // Base role ainda é aluno
    profile: "MONITOR_LAB",  // Mas tem perfil especial
    permissions: [
      'LABS_VIEW',
      'LABS_CONTROL',     // 🎯 PERMISSÃO ESPECIAL
      'LABS_RESERVE',
      'CLASSES_VIEW',
      'EVENTS_VIEW',
      'NOTIFICATIONS_VIEW',
      'NOTES_VIEW_OWN',
      'NOTES_CREATE',
      'NOTES_EDIT_OWN',
      'NOTES_DELETE_OWN',
      'CHAT_ACCESS'
    ],
    schedule: {
      // Monitor só pode usar após 16h
      allowedHours: {
        start: "16:00",
        end: "22:00"
      },
      daysOfWeek: [1, 2, 3, 4, 5] // Segunda a sexta
    }
  }
  
  // Salvar no backend
  await authService.createUser(newUser)
}

// ============================================
// EXEMPLO 3: Perfis Personalizados Diversos
// ============================================

/*
  O administrador pode criar perfis para diferentes situações:

  1. MONITOR_LAB - Aluno que cuida do laboratório após 16h
     - LABS_VIEW, LABS_CONTROL, LABS_RESERVE
  
  2. REPRESENTANTE_TURMA - Aluno que coordena a turma
     - CLASSES_VIEW, EVENTS_CREATE, NOTIFICATIONS_SEND (para a turma)
  
  3. PROFESSOR_COORDENADOR - Professor com poderes extras
     - Todas permissões de professor + USERS_VIEW, CLASSES_CREATE
  
  4. BIBLIOTECARIO - Funcionário da biblioteca
     - USERS_VIEW, EVENTS_VIEW, NOTIFICATIONS_SEND
  
  5. TI_SUPORTE - Equipe de TI
     - SETTINGS_VIEW, SETTINGS_EDIT, REPORTS_VIEW, USERS_VIEW
*/

// ============================================
// EXEMPLO 4: Validação de Horário para Monitor
// ============================================

const LabMonitorControl = () => {
  const { can } = usePermissions()
  const currentHour = new Date().getHours()
  
  // Verificar se tem permissão E se está no horário permitido
  const canControlNow = can('LABS_CONTROL') && currentHour >= 16
  
  if (!can('LABS_CONTROL')) {
    return <p>Você não tem permissão para controlar laboratórios</p>
  }
  
  if (!canControlNow) {
    return (
      <div className="warning">
        <p>⏰ Controle de laboratório disponível apenas após 16h</p>
        <p>Horário atual: {currentHour}:00</p>
      </div>
    )
  }
  
  return (
    <div className="lab-monitor-dashboard">
      <h2>Painel do Monitor de Laboratório</h2>
      {/* Controles do monitor */}
    </div>
  )
}

// ============================================
// EXEMPLO 5: Menu Dinâmico Baseado em Permissões
// ============================================

const DynamicMenu = () => {
  const { can, canAny } = usePermissions()
  
  const menuItems = [
    {
      label: 'Início',
      path: '/home',
      permission: null // Todos podem ver
    },
    {
      label: 'Laboratórios',
      path: '/labs',
      permission: 'LABS_VIEW'
    },
    {
      label: 'Controle de Labs',
      path: '/labs/control',
      permission: 'LABS_CONTROL', // Apenas monitores
      highlight: true // Destacar no menu
    },
    {
      label: 'Usuários',
      path: '/users',
      permission: 'USERS_VIEW'
    },
    {
      label: 'Gerenciar Permissões',
      path: '/permissions',
      permission: 'USERS_PERMISSIONS' // Apenas admin total
    }
  ]
  
  return (
    <nav>
      {menuItems.map(item => {
        // Se não tem permissão exigida, não mostrar
        if (item.permission && !can(item.permission)) {
          return null
        }
        
        return (
          <a 
            key={item.path} 
            href={item.path}
            className={item.highlight ? 'menu-highlight' : ''}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}

// ============================================
// EXEMPLO 6: Componente de Proteção de Rota
// ============================================

const ProtectedRoute = ({ children, requiredPermission, fallback }) => {
  const { can } = usePermissions()
  
  if (!can(requiredPermission)) {
    return fallback || (
      <div className="access-denied">
        <h2>🔒 Acesso Negado</h2>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    )
  }
  
  return children
}

// Uso:
/*
  <ProtectedRoute requiredPermission="LABS_CONTROL">
    <LabMonitorDashboard />
  </ProtectedRoute>
*/

// ============================================
// EXEMPLO 7: Fluxo Completo de Criação de Monitor
// ============================================

/*
  PASSO 1: Admin acessa AdminDashboard
  PASSO 2: Clica em "Gerenciar Permissões"
  PASSO 3: Cria perfil "Monitor de Lab" com permissões:
    - LABS_VIEW
    - LABS_CONTROL
    - LABS_RESERVE
  
  PASSO 4: Admin cria novo usuário:
    - Nome: João Silva
    - Email: joao.silva@etec.sp.gov.br
    - Tipo: Aluno
    - Perfil: Monitor de Lab
    - Horário: 16h-22h
  
  PASSO 5: João faz login
  PASSO 6: Sistema detecta que João tem LABS_CONTROL
  PASSO 7: Menu mostra opção "Controle de Labs"
  PASSO 8: João acessa e seleciona qual lab está usando
  PASSO 9: Sistema registra uso do laboratório
*/

export default {
  LabsControl,
  createLabMonitor,
  LabMonitorControl,
  DynamicMenu,
  ProtectedRoute
}
