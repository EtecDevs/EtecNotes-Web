import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Clock, Trash2, Edit, AlertCircle } from "lucide-react"

const DraftManager = ({ onSelectDraft, onCreateNew }) => {
  const [drafts, setDrafts] = useState([])

  useEffect(() => {
    // Carregar rascunhos do localStorage
    const loadDrafts = () => {
      const savedDrafts = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('requerimento_draft_')) {
          try {
            const draftData = JSON.parse(localStorage.getItem(key))
            savedDrafts.push({
              id: key,
              ...draftData
            })
          } catch (error) {
            console.error('Erro ao carregar rascunho:', error)
          }
        }
      }
      
      // Ordenar por data de salvamento (mais recente primeiro)
      savedDrafts.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
      setDrafts(savedDrafts)
    }

    loadDrafts()
  }, [])

  const handleDeleteDraft = (draftId) => {
    if (confirm('Tem certeza que deseja excluir este rascunho?')) {
      localStorage.removeItem(draftId)
      setDrafts(drafts.filter(draft => draft.id !== draftId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTipoDisplay = (tipoRequerimento, justificativaFalta) => {
    let tipo = tipoRequerimento || "Não especificado"
    if (justificativaFalta) {
      tipo += " + Justificativa de Falta"
    }
    return tipo
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <FileText className="text-gray-400" size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhum rascunho encontrado
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Seus rascunhos salvos aparecerão aqui.
        </p>
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-medium"
        >
          Criar Novo Requerimento
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Rascunhos Salvos ({drafts.length})
        </h2>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 font-medium text-sm"
        >
          Novo Requerimento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {drafts.map((draft, index) => (
          <motion.div
            key={draft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-purple-600 dark:text-purple-400" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {draft.nome || "Rascunho sem nome"}
                  </h3>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Tipo:</strong> {getTipoDisplay(draft.tipoRequerimento, draft.justificativaFalta)}</p>
                  <p><strong>Matrícula:</strong> {draft.matricula || "Não informada"}</p>
                  {draft.informacoesAdicionais && (
                    <p className="line-clamp-2">
                      <strong>Descrição:</strong> {draft.informacoesAdicionais.substring(0, 100)}
                      {draft.informacoesAdicionais.length > 100 && "..."}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={14} />
                  <span>Salvo em {formatDate(draft.savedAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onSelectDraft(draft)}
                  className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300"
                  title="Continuar editando"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteDraft(draft.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                  title="Excluir rascunho"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
          <AlertCircle size={16} />
          <p className="text-sm">
            <strong>Dica:</strong> Os rascunhos são salvos localmente no seu navegador. 
            Lembre-se de enviar seus requerimentos antes de limpar os dados do navegador.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DraftManager