// Hook personalizado para verificar permissões do usuário

import { useAuth } from '../hooks/useAuth'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../constants/permissions'

/**
 * Hook para verificar permissões do usuário autenticado
 * @returns {Object} Objeto com funções de verificação de permissão
 */
export const usePermissions = () => {
  const { user } = useAuth()

  /**
   * Verifica se o usuário tem uma permissão específica
   * @param {string} permissionCode - Código da permissão (ex: 'LABS_CONTROL')
   * @returns {boolean}
   */
  const can = (permissionCode) => {
    return hasPermission(user, permissionCode)
  }

  /**
   * Verifica se o usuário tem pelo menos uma das permissões listadas
   * @param {string[]} permissionCodes - Array de códigos de permissão
   * @returns {boolean}
   */
  const canAny = (permissionCodes) => {
    return hasAnyPermission(user, permissionCodes)
  }

  /**
   * Verifica se o usuário tem todas as permissões listadas
   * @param {string[]} permissionCodes - Array de códigos de permissão
   * @returns {boolean}
   */
  const canAll = (permissionCodes) => {
    return hasAllPermissions(user, permissionCodes)
  }

  /**
   * Verifica se o usuário é um administrador total
   * @returns {boolean}
   */
  const isAdmin = () => {
    return user?.role === 'ADMINISTRADOR'
  }

  /**
   * Retorna o perfil/role do usuário
   * @returns {string}
   */
  const getRole = () => {
    return user?.role || 'guest'
  }

  /**
   * Retorna as permissões do usuário
   * @returns {string[]}
   */
  const getPermissions = () => {
    return user?.permissions || []
  }

  return {
    can,
    canAny,
    canAll,
    isAdmin,
    getRole,
    getPermissions,
    user
  }
}

export default usePermissions
