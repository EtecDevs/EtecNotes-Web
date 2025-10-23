import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  FileText, 
  Save, 
  Send, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Clock,
  User,
  Building,
  FileCheck,
  Edit,
  Archive
} from "lucide-react"
import DraftManager from "./DraftManager"

const RequerimentoFullPage = ({ onClose, requerimentoType = null, initialData = null }) => {
  const [currentStep, setCurrentStep] = useState(initialData ? 1 : 0) // 0: drafts, 1: form, 2: review, 3: confirmation
  const [formData, setFormData] = useState({
    nome: "",
    rg: "",
    matricula: "",
    tipoRequerimento: requerimentoType?.id === "geral" ? "" : "Justificativa de Falta",
    justificativaFalta: requerimentoType?.id === "justificativa",
    periodos: "",
    informacoesAdicionais: "",
    isDraft: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Carregar dados iniciais se fornecidos (para edição de rascunho)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Verificar se há alterações não salvas
  const hasUnsavedChanges = () => {
    const initialEmpty = {
      nome: "",
      rg: "",
      matricula: "",
      tipoRequerimento: "",
      justificativaFalta: false,
      periodos: "",
      informacoesAdicionais: "",
      isDraft: false
    }
    
    const currentData = { ...formData, isDraft: false }
    const compareData = initialData || initialEmpty
    
    return JSON.stringify(currentData) !== JSON.stringify(compareData)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nome.trim()) newErrors.nome = "Nome completo é obrigatório"
    if (!formData.rg.trim()) newErrors.rg = "RG é obrigatório"
    if (!formData.matricula.trim()) newErrors.matricula = "Matrícula é obrigatória"
    // Validar tipo apenas para requerimento geral
    if ((!requerimentoType || requerimentoType?.id === 'geral') && !formData.tipoRequerimento) {
      newErrors.tipoRequerimento = "Selecione o tipo de requerimento"
    }
    
    // Validar períodos apenas para justificativa de falta
    if (requerimentoType?.id === 'justificativa' && !formData.periodos) {
      newErrors.periodos = "Informe o período das faltas"
    }
    if (formData.justificativaFalta && !formData.periodos.trim()) {
      newErrors.periodos = "Períodos são obrigatórios para justificativa de falta"
    }
    if (!formData.informacoesAdicionais.trim()) {
      newErrors.informacoesAdicionais = "Informações adicionais são obrigatórias"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleSaveDraft = async () => {
    try {
      const draftData = { ...formData, isDraft: true, savedAt: new Date().toISOString() }
      // Aqui você salvaria no localStorage ou enviaria para o servidor
      localStorage.setItem(`requerimento_draft_${Date.now()}`, JSON.stringify(draftData))
      
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 500))
      
      alert("Rascunho salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error)
      alert("Erro ao salvar rascunho. Tente novamente.")
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Por favor, corrija os erros antes de continuar.")
      return
    }
    
    setCurrentStep(2)
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simular envio para o servidor
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        protocol: `RG-${Date.now()}`,
        status: "pendente"
      }
      
      console.log("Requerimento enviado:", submissionData)
      setCurrentStep(3)
    } catch (error) {
      console.error("Erro ao enviar requerimento:", error)
      alert("Erro ao enviar requerimento. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExit = () => {
    if (hasUnsavedChanges()) {
      setShowExitConfirm(true)
    } else {
      onClose()
    }
  }

  const confirmExit = () => {
    setShowExitConfirm(false)
    onClose()
  }

  const handleSelectDraft = (draft) => {
    setFormData(draft)
    setCurrentStep(1)
  }

  const handleCreateNew = () => {
    setCurrentStep(1)
  }

  const FormStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.nome 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
            placeholder="Seu nome completo"
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.nome}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            RG *
          </label>
          <input
            type="text"
            value={formData.rg}
            onChange={(e) => handleInputChange('rg', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.rg 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
            placeholder="XX.XXX.XXX-X"
          />
          {errors.rg && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.rg}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Matrícula *
          </label>
          <input
            type="text"
            value={formData.matricula}
            onChange={(e) => handleInputChange('matricula', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.matricula 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
            placeholder="Número de matrícula"
          />
          {errors.matricula && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.matricula}
            </p>
          )}
        </div>
      </div>

      {/* Campo de tipo - apenas para requerimento geral */}
      {(!requerimentoType || requerimentoType?.id === 'geral') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Requer: *
          </label>
          <div className="space-y-3">
            {['Declaração', 'Atestado', 'Outros (Especificar)'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRequerimento"
                  value={option}
                  checked={formData.tipoRequerimento === option}
                  onChange={(e) => handleInputChange('tipoRequerimento', e.target.value)}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
                />
                <span className="text-gray-900 dark:text-white">{option}</span>
              </label>
            ))}
          </div>
          {errors.tipoRequerimento && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.tipoRequerimento}
            </p>
          )}
        </div>
      )}

      {/* Campo de períodos - apenas para justificativa de falta */}
      {requerimentoType?.id === 'justificativa' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Período das Faltas: *
          </label>
          <input
            type="text"
            value={formData.periodos}
            onChange={(e) => handleInputChange('periodos', e.target.value)}
            placeholder="Ex: 15/10/2024 a 20/10/2024"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          {errors.periodos && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.periodos}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.justificativaFalta}
            onChange={(e) => handleInputChange('justificativaFalta', e.target.checked)}
            className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-gray-900 dark:text-white font-medium">
            Justificativa de Falta
          </span>
        </label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          (Indique os Períodos)
        </p>
      </div>

      {formData.justificativaFalta && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Períodos das Faltas *
          </label>
          <input
            type="text"
            value={formData.periodos}
            onChange={(e) => handleInputChange('periodos', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.periodos 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
            placeholder="Ex: 18/10/2025 a 20/10/2025"
          />
          {errors.periodos && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle size={14} />
              {errors.periodos}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Informações Adicionais *
        </label>
        <textarea
          value={formData.informacoesAdicionais}
          onChange={(e) => handleInputChange('informacoesAdicionais', e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.informacoesAdicionais 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all resize-none`}
          placeholder="Descreva detalhadamente sua solicitação..."
        />
        {errors.informacoesAdicionais && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle size={14} />
            {errors.informacoesAdicionais}
          </p>
        )}
      </div>
    </div>
  )

  const ReviewStep = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="text-yellow-600 dark:text-yellow-400" size={24} />
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
            Revisão do Requerimento
          </h3>
        </div>
        <p className="text-yellow-700 dark:text-yellow-400">
          Por favor, revise cuidadosamente todas as informações antes de enviar. 
          Após o envio, não será possível alterar os dados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome Completo</label>
            <p className="text-gray-900 dark:text-white font-medium">{formData.nome}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">RG</label>
            <p className="text-gray-900 dark:text-white font-medium">{formData.rg}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Matrícula</label>
            <p className="text-gray-900 dark:text-white font-medium">{formData.matricula}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo de Requerimento</label>
            <p className="text-gray-900 dark:text-white font-medium">
              {requerimentoType?.title || formData.tipoRequerimento}
            </p>
          </div>
          {requerimentoType?.id === 'geral' && formData.tipoRequerimento && (
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Requer</label>
              <p className="text-gray-900 dark:text-white font-medium">{formData.tipoRequerimento}</p>
            </div>
          )}
          {requerimentoType?.id === 'justificativa' && formData.periodos && (
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Períodos das Faltas</label>
              <p className="text-gray-900 dark:text-white font-medium">{formData.periodos}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Informações Adicionais</label>
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{formData.informacoesAdicionais}</p>
        </div>
      </div>
    </div>
  )

  const ConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Requerimento Enviado com Sucesso!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Seu requerimento foi enviado e está sendo processado.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <p className="text-green-800 dark:text-green-300 font-medium">
          Protocolo: <span className="font-mono">RG-{Date.now()}</span>
        </p>
        <p className="text-green-700 dark:text-green-400 text-sm mt-2">
          Você pode acompanhar o status do seu requerimento na seção "Meus Requerimentos".
        </p>
      </div>

      <button
        onClick={onClose}
        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-medium"
      >
        Voltar ao Chat
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleExit}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <FileText className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentStep === 0 ? 'Requerimentos' : 
                     currentStep === 1 ? (requerimentoType?.title || 'Novo Requerimento') : 
                     currentStep === 2 ? 'Revisão' : 'Confirmação'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentStep === 0 ? 'Rascunhos salvos' : 
                     currentStep === 1 ? (requerimentoType?.description || 'Preencha o formulário') : 
                     currentStep === 2 ? 'Revise as informações' : 'Requerimento enviado'}
                  </p>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                >
                  <Archive size={16} />
                  Salvar Rascunho
                </button>
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          {currentStep > 0 && (
            <div className="flex items-center mt-4 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step < currentStep ? <CheckCircle size={16} /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step < currentStep ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <DraftManager 
                onSelectDraft={handleSelectDraft}
                onCreateNew={handleCreateNew}
              />
            )}
            {currentStep === 1 && <FormStep />}
            {currentStep === 2 && <ReviewStep />}
            {currentStep === 3 && <ConfirmationStep />}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        {currentStep < 3 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                >
                  <Edit size={16} />
                  Editar
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep === 1 && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-medium"
                >
                  <Eye size={16} />
                  Revisar
                </button>
              )}
              
              {currentStep === 2 && (
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl transition-all duration-300 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Clock size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar Requerimento
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-orange-500" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Descartar alterações?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Você tem alterações não salvas. Deseja realmente sair sem salvar?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
                >
                  Salvar Rascunho
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all"
                >
                  Descartar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RequerimentoFullPage