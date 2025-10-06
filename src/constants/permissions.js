// Sistema de Permissões Granulares do EtecNotes

/**
 * Definição de todas as permissões disponíveis no sistema
 * Cada permissão tem um código único e descrição
 */
export const PERMISSIONS = {
  // === LABORATÓRIOS ===
  LABS_VIEW: {
    code: 'LABS_VIEW',
    name: 'Visualizar Laboratórios',
    description: 'Ver a lista de laboratórios disponíveis',
    category: 'Laboratórios'
  },
  LABS_RESERVE: {
    code: 'LABS_RESERVE',
    name: 'Reservar Laboratório',
    description: 'Fazer reserva de laboratório para uso',
    category: 'Laboratórios'
  },
  LABS_MANAGE: {
    code: 'LABS_MANAGE',
    name: 'Gerenciar Laboratórios',
    description: 'Criar, editar e excluir laboratórios',
    category: 'Laboratórios'
  },
  LABS_CONTROL: {
    code: 'LABS_CONTROL',
    name: 'Controlar Laboratórios',
    description: 'Selecionar e controlar qual lab está sendo usado (Monitor)',
    category: 'Laboratórios'
  },
  LABS_APPROVE: {
    code: 'LABS_APPROVE',
    name: 'Aprovar Reservas',
    description: 'Aprovar ou rejeitar reservas de laboratório',
    category: 'Laboratórios'
  },

  // === USUÁRIOS ===
  USERS_VIEW: {
    code: 'USERS_VIEW',
    name: 'Visualizar Usuários',
    description: 'Ver lista de usuários do sistema',
    category: 'Usuários'
  },
  USERS_CREATE: {
    code: 'USERS_CREATE',
    name: 'Criar Usuários',
    description: 'Adicionar novos usuários ao sistema',
    category: 'Usuários'
  },
  USERS_EDIT: {
    code: 'USERS_EDIT',
    name: 'Editar Usuários',
    description: 'Modificar dados de usuários existentes',
    category: 'Usuários'
  },
  USERS_DELETE: {
    code: 'USERS_DELETE',
    name: 'Excluir Usuários',
    description: 'Remover usuários do sistema',
    category: 'Usuários'
  },
  USERS_PERMISSIONS: {
    code: 'USERS_PERMISSIONS',
    name: 'Gerenciar Permissões',
    description: 'Criar e atribuir permissões personalizadas',
    category: 'Usuários'
  },

  // === TURMAS ===
  CLASSES_VIEW: {
    code: 'CLASSES_VIEW',
    name: 'Visualizar Turmas',
    description: 'Ver turmas cadastradas',
    category: 'Turmas'
  },
  CLASSES_CREATE: {
    code: 'CLASSES_CREATE',
    name: 'Criar Turmas',
    description: 'Adicionar novas turmas',
    category: 'Turmas'
  },
  CLASSES_EDIT: {
    code: 'CLASSES_EDIT',
    name: 'Editar Turmas',
    description: 'Modificar turmas existentes',
    category: 'Turmas'
  },
  CLASSES_DELETE: {
    code: 'CLASSES_DELETE',
    name: 'Excluir Turmas',
    description: 'Remover turmas do sistema',
    category: 'Turmas'
  },

  // === EVENTOS ===
  EVENTS_VIEW: {
    code: 'EVENTS_VIEW',
    name: 'Visualizar Eventos',
    description: 'Ver eventos cadastrados',
    category: 'Eventos'
  },
  EVENTS_CREATE: {
    code: 'EVENTS_CREATE',
    name: 'Criar Eventos',
    description: 'Adicionar novos eventos',
    category: 'Eventos'
  },
  EVENTS_EDIT: {
    code: 'EVENTS_EDIT',
    name: 'Editar Eventos',
    description: 'Modificar eventos existentes',
    category: 'Eventos'
  },
  EVENTS_DELETE: {
    code: 'EVENTS_DELETE',
    name: 'Excluir Eventos',
    description: 'Remover eventos do sistema',
    category: 'Eventos'
  },

  // === NOTIFICAÇÕES ===
  NOTIFICATIONS_VIEW: {
    code: 'NOTIFICATIONS_VIEW',
    name: 'Visualizar Notificações',
    description: 'Ver notificações do sistema',
    category: 'Notificações'
  },
  NOTIFICATIONS_SEND: {
    code: 'NOTIFICATIONS_SEND',
    name: 'Enviar Notificações',
    description: 'Criar e enviar notificações para usuários',
    category: 'Notificações'
  },

  // === NOTAS E ANOTAÇÕES ===
  NOTES_VIEW_OWN: {
    code: 'NOTES_VIEW_OWN',
    name: 'Ver Próprias Anotações',
    description: 'Visualizar suas próprias anotações',
    category: 'Anotações'
  },
  NOTES_VIEW_ALL: {
    code: 'NOTES_VIEW_ALL',
    name: 'Ver Todas Anotações',
    description: 'Visualizar anotações de todos os usuários',
    category: 'Anotações'
  },
  NOTES_CREATE: {
    code: 'NOTES_CREATE',
    name: 'Criar Anotações',
    description: 'Adicionar novas anotações',
    category: 'Anotações'
  },
  NOTES_EDIT_OWN: {
    code: 'NOTES_EDIT_OWN',
    name: 'Editar Próprias Anotações',
    description: 'Modificar suas próprias anotações',
    category: 'Anotações'
  },
  NOTES_DELETE_OWN: {
    code: 'NOTES_DELETE_OWN',
    name: 'Excluir Próprias Anotações',
    description: 'Remover suas próprias anotações',
    category: 'Anotações'
  },

  // === CHAT ===
  CHAT_ACCESS: {
    code: 'CHAT_ACCESS',
    name: 'Acessar Chat',
    description: 'Usar o sistema de chat',
    category: 'Chat'
  },
  CHAT_MODERATE: {
    code: 'CHAT_MODERATE',
    name: 'Moderar Chat',
    description: 'Remover mensagens e gerenciar chat',
    category: 'Chat'
  },

  // === RELATÓRIOS ===
  REPORTS_VIEW: {
    code: 'REPORTS_VIEW',
    name: 'Visualizar Relatórios',
    description: 'Acessar relatórios do sistema',
    category: 'Relatórios'
  },
  REPORTS_GENERATE: {
    code: 'REPORTS_GENERATE',
    name: 'Gerar Relatórios',
    description: 'Criar novos relatórios personalizados',
    category: 'Relatórios'
  },

  // === CONFIGURAÇÕES ===
  SETTINGS_VIEW: {
    code: 'SETTINGS_VIEW',
    name: 'Ver Configurações',
    description: 'Visualizar configurações do sistema',
    category: 'Configurações'
  },
  SETTINGS_EDIT: {
    code: 'SETTINGS_EDIT',
    name: 'Editar Configurações',
    description: 'Modificar configurações do sistema',
    category: 'Configurações'
  },
}

/**
 * Perfis pré-definidos com conjuntos de permissões
 * Administradores podem criar novos perfis customizados
 */
export const DEFAULT_PROFILES = {
  ADMINISTRADOR: {
    name: 'Administrador Total',
    description: 'Acesso total ao sistema com todas as permissões',
    color: '#FF4444',
    icon: 'Shield',
    permissions: Object.keys(PERMISSIONS) // Todas as permissões
  },
  
  SECRETARIA: {
    name: 'Secretaria',
    description: 'Gestão operacional sem CRUD de usuários',
    color: '#8C43FF',
    icon: 'Briefcase',
    permissions: [
      'LABS_VIEW', 'LABS_RESERVE', 'LABS_APPROVE',
      'USERS_VIEW',
      'CLASSES_VIEW', 'CLASSES_CREATE', 'CLASSES_EDIT',
      'EVENTS_VIEW', 'EVENTS_CREATE', 'EVENTS_EDIT',
      'NOTIFICATIONS_VIEW', 'NOTIFICATIONS_SEND',
      'REPORTS_VIEW', 'REPORTS_GENERATE',
      'SETTINGS_VIEW'
    ]
  },
  
  PROFESSOR: {
    name: 'Professor',
    description: 'Acesso a turmas, eventos e laboratórios',
    color: '#00B2FF',
    icon: 'BookOpen',
    permissions: [
      'LABS_VIEW', 'LABS_RESERVE', 'LABS_MANAGE',
      'USERS_VIEW',
      'CLASSES_VIEW', 'CLASSES_EDIT',
      'EVENTS_VIEW', 'EVENTS_CREATE',
      'NOTIFICATIONS_VIEW',
      'NOTES_VIEW_OWN', 'NOTES_CREATE', 'NOTES_EDIT_OWN', 'NOTES_DELETE_OWN',
      'CHAT_ACCESS', 'CHAT_MODERATE',
      'REPORTS_VIEW'
    ]
  },
  
  ALUNO: {
    name: 'Aluno',
    description: 'Acesso básico para estudantes',
    color: '#4CAF50',
    icon: 'GraduationCap',
    permissions: [
      'LABS_VIEW',
      'CLASSES_VIEW',
      'EVENTS_VIEW',
      'NOTIFICATIONS_VIEW',
      'NOTES_VIEW_OWN', 'NOTES_CREATE', 'NOTES_EDIT_OWN', 'NOTES_DELETE_OWN',
      'CHAT_ACCESS'
    ]
  },
  
  MONITOR_LAB: {
    name: 'Monitor de Laboratório',
    description: 'Aluno com permissão para controlar laboratórios após 16h',
    color: '#FF9800',
    icon: 'Monitor',
    permissions: [
      'LABS_VIEW', 'LABS_CONTROL', 'LABS_RESERVE', // Permissão especial para controlar labs
      'CLASSES_VIEW',
      'EVENTS_VIEW',
      'NOTIFICATIONS_VIEW',
      'NOTES_VIEW_OWN', 'NOTES_CREATE', 'NOTES_EDIT_OWN', 'NOTES_DELETE_OWN',
      'CHAT_ACCESS'
    ]
  }
}

/**
 * Agrupa permissões por categoria para facilitar visualização
 */
export const getPermissionsByCategory = () => {
  const categorized = {}
  
  Object.values(PERMISSIONS).forEach(permission => {
    if (!categorized[permission.category]) {
      categorized[permission.category] = []
    }
    categorized[permission.category].push(permission)
  })
  
  return categorized
}

/**
 * Verifica se um usuário tem uma permissão específica
 */
export const hasPermission = (user, permissionCode) => {
  if (!user || !user.permissions) return false
  
  // ADMINISTRADOR sempre tem todas as permissões
  if (user.role === 'ADMINISTRADOR') return true
  
  return user.permissions.includes(permissionCode)
}

/**
 * Verifica se um usuário tem pelo menos uma das permissões listadas
 */
export const hasAnyPermission = (user, permissionCodes) => {
  if (!user || !permissionCodes) return false
  
  // ADMINISTRADOR sempre tem todas as permissões
  if (user.role === 'ADMINISTRADOR') return true
  
  return permissionCodes.some(code => user.permissions?.includes(code))
}

/**
 * Verifica se um usuário tem todas as permissões listadas
 */
export const hasAllPermissions = (user, permissionCodes) => {
  if (!user || !permissionCodes) return false
  
  // ADMINISTRADOR sempre tem todas as permissões
  if (user.role === 'ADMINISTRADOR') return true
  
  return permissionCodes.every(code => user.permissions?.includes(code))
}

export default {
  PERMISSIONS,
  DEFAULT_PROFILES,
  getPermissionsByCategory,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions
}
