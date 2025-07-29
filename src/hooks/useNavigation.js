import { useState } from 'react'
import { NAVIGATION_TABS, CONTENT_TABS } from '../constants'

export const useNavigation = () => {
  const [activeTab, setActiveTab] = useState(NAVIGATION_TABS.INICIO)
  const [activeContentTab, setActiveContentTab] = useState(CONTENT_TABS.JORNAL)

  const handleMainTabChange = (tab) => {
    setActiveTab(tab)
    
    // Resetar a aba de conteúdo para a padrão quando mudar para a página inicial
    if (tab === NAVIGATION_TABS.INICIO) {
      setActiveContentTab(CONTENT_TABS.JORNAL)
    }
  }

  const handleContentTabChange = (tab) => {
    setActiveContentTab(tab)

    if (tab === CONTENT_TABS.PATCH_NOTES) {
      setActiveTab('Patch Notes')
    } else if (tab === CONTENT_TABS.HORARIOS) {
      setActiveTab('Horários')
    } else if (tab === CONTENT_TABS.JORNAL) {
      setActiveTab(NAVIGATION_TABS.INICIO)
    }
  }

  return {
    activeTab,
    activeContentTab,
    handleMainTabChange,
    handleContentTabChange
  }
}
