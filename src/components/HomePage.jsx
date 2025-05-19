"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const HomePage = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("Jornal Etec")

  // Função para mudar a aba e notificar o componente pai
  const handleTabChange = (tab) => {
    setActiveTab(tab)

    // Se a aba for "Patch Notes", navegar para essa página
    if (tab === "Patch Notes") {
      onTabChange("Patch Notes")
    }
  }

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white p-6">
      <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Início</h1>

      {/* Tabs */}
      <div className="flex border-b border-[#E6DFFF] mb-8">
        {["Jornal Etec", "Patch Notes", "Horários"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 mr-8 font-medium transition-all duration-300 ${
              activeTab === tab
                ? "text-[#8C43FF] border-b-2 border-[#8C43FF]"
                : "dark:text-[#D0B3FF] text-[#8C43FF]/70 hover:text-[#8C43FF] hover:border-b-2 hover:border-[#8C43FF]/50"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Left Card */}
        <motion.div
          className="w-full md:w-[45%] h-[320px] bg-[#8C43FF] rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,67,255,0.6)] hover:bg-[#9955FF] cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white text-xl font-semibold">Semana Tecnológica</h2>
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="w-full md:w-[50%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="dark:text-gray-300 text-gray-700 text-lg leading-relaxed">
            O Jornal Etec é um periódico voltado para a divulgação de notícias, eventos e atividades da Etec (Escola
            Técnica Estadual). Seu objetivo é manter alunos, professores e a comunidade escolar atualizados sobre o que
            acontece dentro da instituição, além de abordar temas relevantes para o ambiente educacional. O jornal traz
            reportagens, entrevistas, e informações sobre cursos, projetos, eventos e conquistas dos estudantes e
            professores da Etec, promovendo a integração e o engajamento entre todos os envolvidos na escola.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
