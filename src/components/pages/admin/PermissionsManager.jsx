"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  User,
  Check,
  X,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Lock,
  Unlock,
  Users,
  Monitor,
  Briefcase,
  GraduationCap,
  BookOpen,
  Copy,
} from "lucide-react"
import { PERMISSIONS, DEFAULT_PROFILES, getPermissionsByCategory } from "../../../constants/permissions.js"

const PermissionsManager = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("profiles") // 'profiles' ou 'custom'
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isCreatingProfile, setIsCreatingProfile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState({})

  // Formulário para novo perfil
  const [newProfile, setNewProfile] = useState({
    id: '',
    name: '',
    description: '',
    color: '#8C43FF',
    icon: 'User',
    permissions: []
  })

  const permissionsByCategory = getPermissionsByCategory()

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const togglePermission = (permissionCode) => {
    setNewProfile(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionCode)
        ? prev.permissions.filter(p => p !== permissionCode)
        : [...prev.permissions, permissionCode]
    }))
  }

  const selectAllInCategory = (category) => {
    const categoryPermissions = permissionsByCategory[category].map(p => p.code)
    const allSelected = categoryPermissions.every(p => newProfile.permissions.includes(p))

    setNewProfile(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !categoryPermissions.includes(p))
        : [...new Set([...prev.permissions, ...categoryPermissions])]
    }))
  }

  const handleCreateProfile = () => {
    if (!newProfile.name || !newProfile.id) {
      alert("Por favor, preencha o nome e ID do perfil")
      return
    }

    const profileData = {
      ...newProfile,
      id: newProfile.id.toUpperCase().replace(/\s+/g, '_')
    }

    setProfiles(prev => ({
      ...prev,
      [profileData.id]: profileData
    }))

    setIsCreatingProfile(false)
    setNewProfile({
      id: '',
      name: '',
      description: '',
      color: '#8C43FF',
      icon: 'User',
      permissions: []
    })
  }

  const handleDuplicateProfile = (profileKey) => {
    const profile = profiles[profileKey]
    setNewProfile({
      id: `${profileKey}_COPY`,
      name: `${profile.name} (Cópia)`,
      description: profile.description,
      color: profile.color,
      icon: profile.icon,
      permissions: [...profile.permissions]
    })
    setIsCreatingProfile(true)
    setActiveTab("custom")
  }

  const handleDeleteProfile = (profileKey) => {
    if (confirm(`Tem certeza que deseja excluir o perfil "${profiles[profileKey].name}"?`)) {
      const newProfiles = { ...profiles }
      delete newProfiles[profileKey]
      setProfiles(newProfiles)
    }
  }

  const getIconComponent = (iconName) => {
    const icons = {
      Shield,
      Briefcase,
      BookOpen,
      GraduationCap,
      Monitor,
      User,
      Users
    }
    return icons[iconName] || User
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-[#30363D] border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">
                Gerenciador de Permissões
              </h2>
              <p className="text-sm dark:text-gray-400 text-gray-600">
                Crie perfis personalizados e gerencie permissões de usuários
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#21262D] rounded-lg transition-colors"
          >
            <X size={20} className="dark:text-gray-400 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-[#30363D] border-gray-200 px-6">
          <button
            onClick={() => setActiveTab("profiles")}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === "profiles"
                ? "text-purple-600 dark:text-purple-400"
                : "dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Perfis Existentes
            {activeTab === "profiles" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === "custom"
                ? "text-purple-600 dark:text-purple-400"
                : "dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Criar Perfil Customizado
            {activeTab === "custom" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "profiles" ? (
            /* Lista de Perfis Existentes */
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-400 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Buscar perfil..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsCreatingProfile(true)
                    setActiveTab("custom")
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  Novo Perfil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profiles)
                  .filter(([key, profile]) => 
                    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(([key, profile]) => {
                    const IconComponent = getIconComponent(profile.icon)
                    const isDefault = ['ADMINISTRADOR', 'SECRETARIA', 'PROFESSOR', 'ALUNO', 'MONITOR_LAB'].includes(key)
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-4 border-2 dark:border-[#30363D] border-gray-200 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${profile.color}20` }}
                            >
                              <IconComponent size={20} style={{ color: profile.color }} />
                            </div>
                            <div>
                              <h3 className="font-semibold dark:text-white text-gray-900">
                                {profile.name}
                              </h3>
                              {isDefault && (
                                <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                                  Padrão
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDuplicateProfile(key)}
                              className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#21262D] rounded-lg transition-colors"
                              title="Duplicar perfil"
                            >
                              <Copy size={14} className="dark:text-gray-400 text-gray-600" />
                            </button>
                            {!isDefault && (
                              <>
                                <button
                                  onClick={() => {
                                    setNewProfile(profiles[key])
                                    setIsCreatingProfile(true)
                                    setActiveTab("custom")
                                  }}
                                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#21262D] rounded-lg transition-colors"
                                >
                                  <Edit size={14} className="dark:text-gray-400 text-gray-600" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProfile(key)}
                                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                  <Trash2 size={14} className="text-red-500" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-3">
                          {profile.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-gray-500 text-gray-500">
                            {profile.permissions.length} permissões
                          </span>
                          <button
                            onClick={() => setSelectedProfile(selectedProfile === key ? null : key)}
                            className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                          >
                            {selectedProfile === key ? 'Ocultar' : 'Ver detalhes'}
                            {selectedProfile === key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>

                        <AnimatePresence>
                          {selectedProfile === key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 pt-3 border-t dark:border-[#30363D] border-gray-200"
                            >
                              <div className="flex flex-wrap gap-1">
                                {profile.permissions.map(permCode => {
                                  const perm = PERMISSIONS[permCode]
                                  return perm ? (
                                    <span
                                      key={permCode}
                                      className="text-xs px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md"
                                      title={perm.description}
                                    >
                                      {perm.name}
                                    </span>
                                  ) : null
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          ) : (
            /* Criação/Edição de Perfil Customizado */
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
                  Informações do Perfil
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      ID do Perfil *
                    </label>
                    <input
                      type="text"
                      value={newProfile.id}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, id: e.target.value }))}
                      placeholder="MONITOR_LAB"
                      className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#1E1E1E] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Nome do Perfil *
                    </label>
                    <input
                      type="text"
                      value={newProfile.name}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Monitor de Laboratório"
                      className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#1E1E1E] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={newProfile.description}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva as responsabilidades deste perfil..."
                      rows={2}
                      className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#1E1E1E] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Cor do Perfil
                    </label>
                    <input
                      type="color"
                      value={newProfile.color}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Ícone
                    </label>
                    <select
                      value={newProfile.icon}
                      onChange={(e) => setNewProfile(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#1E1E1E] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="User">Usuário</option>
                      <option value="Shield">Escudo</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Briefcase">Maleta</option>
                      <option value="BookOpen">Livro</option>
                      <option value="GraduationCap">Formatura</option>
                      <option value="Users">Usuários</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seleção de Permissões */}
              <div className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-6 border dark:border-[#30363D] border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                    Permissões ({newProfile.permissions.length} selecionadas)
                  </h3>
                  <button
                    onClick={() => {
                      const allPerms = Object.keys(PERMISSIONS)
                      setNewProfile(prev => ({
                        ...prev,
                        permissions: prev.permissions.length === allPerms.length ? [] : allPerms
                      }))
                    }}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {newProfile.permissions.length === Object.keys(PERMISSIONS).length 
                      ? 'Desmarcar Todas' 
                      : 'Selecionar Todas'}
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.entries(permissionsByCategory).map(([category, permissions]) => {
                    const categorySelected = permissions.every(p => newProfile.permissions.includes(p.code))
                    const someCategorySelected = permissions.some(p => newProfile.permissions.includes(p.code))

                    return (
                      <div key={category} className="border dark:border-[#30363D] border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-3 dark:bg-[#1E1E1E] bg-white hover:bg-gray-50 dark:hover:bg-[#21262D] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              categorySelected 
                                ? 'bg-purple-600 border-purple-600' 
                                : someCategorySelected
                                ? 'bg-purple-600/50 border-purple-600'
                                : 'dark:border-gray-600 border-gray-300'
                            }`}>
                              {(categorySelected || someCategorySelected) && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="font-medium dark:text-white text-gray-900">
                              {category}
                            </span>
                            <span className="text-xs dark:text-gray-500 text-gray-500">
                              ({permissions.filter(p => newProfile.permissions.includes(p.code)).length}/{permissions.length})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                selectAllInCategory(category)
                              }}
                              className="text-xs text-purple-600 dark:text-purple-400 hover:underline mr-2"
                            >
                              {categorySelected ? 'Desmarcar' : 'Selecionar'} categoria
                            </button>
                            {expandedCategories[category] ? (
                              <ChevronUp size={16} className="dark:text-gray-400 text-gray-600" />
                            ) : (
                              <ChevronDown size={16} className="dark:text-gray-400 text-gray-600" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedCategories[category] && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 space-y-2 dark:bg-[#0D1117] bg-gray-50">
                                {permissions.map(permission => (
                                  <label
                                    key={permission.code}
                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1E1E] cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={newProfile.permissions.includes(permission.code)}
                                      onChange={() => togglePermission(permission.code)}
                                      className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium dark:text-white text-gray-900 text-sm">
                                        {permission.name}
                                      </p>
                                      <p className="text-xs dark:text-gray-400 text-gray-600">
                                        {permission.description}
                                      </p>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setIsCreatingProfile(false)
                    setNewProfile({
                      id: '',
                      name: '',
                      description: '',
                      color: '#8C43FF',
                      icon: 'User',
                      permissions: []
                    })
                  }}
                  className="px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Save size={18} />
                  Salvar Perfil
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t dark:border-[#30363D] border-gray-200 dark:bg-[#0D1117] bg-gray-50">
          <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
            <AlertCircle size={16} />
            <span>Perfis personalizados permitem controle granular de acesso</span>
          </div>
          <button
            onClick={() => {
              onSave && onSave(profiles)
              onClose()
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Aplicar Alterações
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default PermissionsManager
