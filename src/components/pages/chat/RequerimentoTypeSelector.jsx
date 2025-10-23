import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Calendar, 
  X, 
  ArrowRight, 
  User, 
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react"

const RequerimentoTypeSelector = ({ onClose, onSelectType }) => {
  const [selectedType, setSelectedType] = useState(null)

  const requerimentoTypes = [
    {
      id: "geral",
      title: "Requerimento Geral",
      description: "Para solicitações acadêmicas diversas como declarações, atestados, histórico escolar e outros documentos",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      examples: [
        "Declaração de matrícula",
        "Histórico escolar",
        "Atestado de frequência", 
        "Carteirinha estudantil",
        "Segunda via de documentos"
      ],
      estimatedTime: "2-5 dias úteis"
    },
    {
      id: "justificativa",
      title: "Justificativa de Falta",
      description: "Para justificar ausências em aulas por motivos médicos, pessoais ou outras situações previstas em regimento",
      icon: Calendar,
      color: "from-purple-500 to-pink-500", 
      examples: [
        "Atestado médico",
        "Consulta médica",
        "Exames laboratoriais",
        "Compromissos judiciais",
        "Falecimento familiar"
      ],
      estimatedTime: "1-3 dias úteis"
    }
  ]

  const handleSelectType = (type) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    if (selectedType) {
      onSelectType(selectedType)
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-4xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <FileText size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Novo Requerimento
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Escolha o tipo de requerimento que deseja fazer
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {requerimentoTypes.map((type) => {
              const IconComponent = type.icon
              const isSelected = selectedType?.id === type.id
              
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleSelectType(type)}
                  className={`group p-6 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? `bg-gradient-to-br ${type.color} border-transparent shadow-lg shadow-purple-500/25 text-white`
                      : "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300 hover:shadow-lg"
                  }`}
                >
                  {/* Header do Card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isSelected
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"
                        }`}
                      >
                        <IconComponent
                          size={24}
                          className={isSelected ? "text-white" : "text-gray-600 dark:text-gray-400"}
                        />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}`}>
                          {type.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={14} className={isSelected ? "text-white/80" : "text-gray-500"} />
                          <span className={`text-sm ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                            {type.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle size={20} className="text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Descrição */}
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isSelected ? "text-white/90" : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {type.description}
                  </p>

                  {/* Exemplos */}
                  <div className="space-y-2">
                    <h4 className={`text-sm font-semibold ${
                      isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
                    }`}>
                      Exemplos de uso:
                    </h4>
                    <ul className="space-y-1">
                      {type.examples.slice(0, 3).map((example, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-white/60" : "bg-purple-500"
                          }`} />
                          <span className={isSelected ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>
                            {example}
                          </span>
                        </li>
                      ))}
                      {type.examples.length > 3 && (
                        <li className="flex items-center gap-2 text-xs">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-white/60" : "bg-purple-500"
                          }`} />
                          <span className={`font-medium ${isSelected ? "text-white/80" : "text-purple-600 dark:text-purple-400"}`}>
                            E outros...
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Informações Importantes
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Todos os requerimentos são analisados pela secretaria acadêmica</li>
                  <li>• Documentos comprobatórios podem ser solicitados conforme o tipo</li>
                  <li>• Você receberá atualizações do status por meio do sistema</li>
                  <li>• Prazos podem variar conforme a complexidade da solicitação</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-[1.02]"
            >
              Cancelar
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedType}
              className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${
                selectedType
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Continuar</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RequerimentoTypeSelector