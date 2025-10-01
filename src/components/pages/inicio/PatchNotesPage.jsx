"use client"

import { motion } from "framer-motion"
import TabNavigation from "../../navigation/TabNavigation"

const PatchNotesPage = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col h-full bg-[#f5ecff ] dark:bg-[#121212]">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Início</h1>

  {/* Tabs */}
  <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Left Card */}
          <motion.div
            className="w-full md:w-[45%] h-[320px] dark:bg-[#6B32C3] bg-[#8C43FF] rounded-3xl p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white text-xl font-semibold">Novas funcionalidades!</h2>
            <div className="mt-4 flex-grow flex items-center justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Nova funcionalidade"
                className="max-w-full max-h-[200px] rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right List */}
          <motion.div
            className="w-full md:w-[50%] p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="dark:text-white text-gray-800 text-xl font-semibold mb-6">Atualizações Recentes</h3>
            <ul className="space-y-4 dark:text-gray-300 text-gray-700 text-lg">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <span className="text-[#8C43FF] mr-2 text-xl">•</span>
                <span>Novo estilo de personalização (Modo escuro)</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span className="text-[#8C43FF] mr-2 text-xl">•</span>
                <span>Novas interfaces: Página de Cadastro e Login; Calculadora; Jornal Etec</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <span className="text-[#8C43FF] mr-2 text-xl">•</span>
                <span>Redesign das Interfaces anteriores</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PatchNotesPage
