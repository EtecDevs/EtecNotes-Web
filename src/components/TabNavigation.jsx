import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TabContent({ activeTab }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (activeTab === 'Patch Notes') {
      setContent(
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Caixa roxa à esquerda */}
          <motion.div 
            className="w-full md:w-[45%] h-[320px] bg-[#6B32C3] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,67,255,0.6)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
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

          {/* Lista de novidades à direita */}
          <motion.div 
            className="w-full md:w-[50%] p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="text-[#2D2E37] text-xl font-semibold mb-6">Atualizações Recentes</h3>
            <ul className="space-y-4 text-[#3A3B45] text-lg">
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
        </motion.div>
      );
    } else if (activeTab === 'Início') {
      // Conteúdo da aba Início (mantenha o conteúdo original)
      setContent(
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Left Card */}
          <div className="w-full md:w-[45%] h-[320px] bg-[#8C43FF] rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,67,255,0.6)] hover:bg-[#9955FF] cursor-pointer">
            <h2 className="text-white text-xl font-semibold">Semana Tecnológica</h2>
          </div>

          {/* Right Text */}
          <div className="w-full md:w-[50%]">
            <p className="text-[#3A3B45] text-lg leading-relaxed">
              O Jornal Etec é um periódico voltado para a divulgação de notícias, eventos e atividades da Etec (Escola
              Técnica Estadual). Seu objetivo é manter alunos, professores e a comunidade escolar atualizados sobre o que
              acontece dentro da instituição, além de abordar temas relevantes para o ambiente educacional. O jornal traz
              reportagens, entrevistas, e informações sobre cursos, projetos, eventos e conquistas dos estudantes e
              professores da Etec, promovendo a integração e o engajamento entre todos os envolvidos na escola.
            </p>
          </div>
        </motion.div>
      );
    } else if (activeTab === 'Eventos') {
      // Conteúdo da aba Eventos (exemplo)
      setContent(
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full bg-[#D0B3FF]/20 rounded-3xl p-6">
            <h2 className="text-[#2D2E37] text-xl font-semibold mb-4">Próximos Eventos</h2>
            <p className="text-[#3A3B45] text-lg">Conteúdo da página de Eventos...</p>
          </div>
        </motion.div>
      );
    } else if (activeTab === 'Horários') {
      // Conteúdo da aba Horários (exemplo)
      setContent(
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full bg-[#D0B3FF]/20 rounded-3xl p-6">
            <h2 className="text-[#2D2E37] text-xl font-semibold mb-4">Horários de Aula</h2>
            <p className="text-[#3A3B45] text-lg">Conteúdo da página de Horários...</p>
          </div>
        </motion.div>
      );
    }
  }, [activeTab]);

  return (
    <AnimatePresence mode="wait">
      <div key={activeTab}>
        {content}
      </div>
    </AnimatePresence>
  );
}

export default TabContent;