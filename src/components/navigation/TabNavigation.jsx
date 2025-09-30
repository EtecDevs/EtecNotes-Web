"use client"

import { useEffect } from "react"

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = ["Jornal Etec", "Patch Notes", "Eventos"]

  // Efeito para garantir que as abas sejam exibidas corretamente
  useEffect(() => {
    // Verificar se a aba ativa é válida
    if (!tabs.includes(activeTab)) {
      onTabChange("Jornal Etec")
    }
  }, [activeTab, onTabChange])

  return (
    <div className="flex border-b border-[#E6DFFF] mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 mr-8 font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
            activeTab === tab
              ? "text-[#8C43FF] border-b-2 border-[#8C43FF]"
              : "dark:text-[#D0B3FF] text-[#8C43FF]/70 hover:text-[#8C43FF] hover:border-b-2 hover:border-[#8C43FF]/50"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
