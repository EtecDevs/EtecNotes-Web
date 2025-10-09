"use client"

import { motion } from "framer-motion"
import TabNavigation from "../../navigation/TabNavigation"
import EventsPage from "./EventsPage"

const HomePage = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col h-full bg-[#f3e8ff] dark:bg-[#121212]">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold bg-[#58417d] dark:bg-[#58417d] bg-clip-text text-transparent mb-8">Início</h1>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {activeTab === "Eventos" ? (
          <EventsPage />
        ) : (
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Left Card */}
            <motion.div
              className="w-full md:w-[45%] h-[320px] bg-[#58417d] dark:bg-[#6B32C3] rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,67,255,0.6)] hover:bg-[#9955FF] cursor-pointer"
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
                Técnica Estadual). Seu objetivo é manter alunos, professores e a comunidade escolar atualizados sobre o
                que acontece dentro da instituição, além de abordar temas relevantes para o ambiente educacional. O jornal
                traz reportagens, entrevistas, e informações sobre cursos, projetos, eventos e conquistas dos estudantes e
                professores da Etec, promovendo a integração e o engajamento entre todos os envolvidos na escola.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
