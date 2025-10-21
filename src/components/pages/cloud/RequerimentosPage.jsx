import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Send, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import RequerimentoGeralForm from "./RequerimentoGeralForm"
import JustificativaFaltaForm from "./JustificativaFaltaForm"

const RequerimentosPage = () => {
  const [activeView, setActiveView] = useState("list") // list, createGeneral, createJustificativa, review
  const [requerimentos, setRequerimentos] = useState([
    {
      id: 1,
      tipo: "Requerimento Geral",
      status: "aprovado",
      data: "2025-10-15",
      protocolo: "RG-2025-001",
      descricao: "Solicitação de declaração de matrícula"
    },
    {
      id: 2,
      tipo: "Justificativa de Falta",
      status: "pendente",
      data: "2025-10-20",
      protocolo: "JF-2025-032",
      descricao: "Falta nos dias 18/10 e 19/10"
    }
  ])
  const [currentForm, setCurrentForm] = useState(null)

  const getStatusIcon = (status) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pendente":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "recusado":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "aprovado":
        return "Aprovado"
      case "pendente":
        return "Em Análise"
      case "recusado":
        return "Recusado"
      default:
        return "Indefinido"
    }
  }

  const handleCreateNew = (tipo) => {
    if (tipo === "geral") {
      setActiveView("createGeneral")
    } else {
      setActiveView("createJustificativa")
    }
  }

  const handleFormSubmit = (formData) => {
    setCurrentForm(formData)
    setActiveView("review")
  }

  const handleConfirmSubmit = () => {
    // Gerar protocolo
    const tipo = currentForm.tipo === "geral" ? "RG" : "JF"
    const ano = new Date().getFullYear()
    const numero = String(requerimentos.length + 1).padStart(3, "0")
    const protocolo = `${tipo}-${ano}-${numero}`

    // Criar novo requerimento
    const novoRequerimento = {
      id: requerimentos.length + 1,
      tipo: currentForm.tipo === "geral" ? "Requerimento Geral" : "Justificativa de Falta",
      status: "pendente",
      data: new Date().toISOString().split("T")[0],
      protocolo: protocolo,
      descricao: currentForm.descricao || "Sem descrição",
      dados: currentForm
    }

    setRequerimentos([novoRequerimento, ...requerimentos])
    setCurrentForm(null)
    setActiveView("list")

    // Aqui você enviaria para o backend
    console.log("Requerimento enviado:", novoRequerimento)
  }

  const handleCancelReview = () => {
    setActiveView(currentForm?.tipo === "geral" ? "createGeneral" : "createJustificativa")
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {/* Lista de Requerimentos */}
        {activeView === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">
                Meus Requerimentos
              </h2>
              <p className="dark:text-gray-400 text-gray-600">
                Envie requerimentos e acompanhe o status de suas solicitações
              </p>
            </div>

            {/* Botões de Criar Novo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <motion.button
                onClick={() => handleCreateNew("geral")}
                className="flex items-center justify-center gap-3 bg-[#8C43FF] hover:bg-[#7A3AE6] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5" />
                Novo Requerimento Geral
              </motion.button>

              <motion.button
                onClick={() => handleCreateNew("justificativa")}
                className="flex items-center justify-center gap-3 bg-[#6B32C3] hover:bg-[#5927A3] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5" />
                Nova Justificativa de Falta
              </motion.button>
            </div>

            {/* Lista de Requerimentos */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {requerimentos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 dark:text-gray-400 text-gray-600">
                  <FileText className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium">Nenhum requerimento enviado</p>
                  <p className="text-sm">Crie seu primeiro requerimento acima</p>
                </div>
              ) : (
                requerimentos.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-5 shadow-lg border dark:border-[#333333] border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(req.status)}
                        <div>
                          <h3 className="font-semibold dark:text-white text-gray-800">
                            {req.tipo}
                          </h3>
                          <p className="text-sm dark:text-gray-400 text-gray-600">
                            Protocolo: {req.protocolo}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          req.status === "aprovado"
                            ? "bg-green-500/20 text-green-500"
                            : req.status === "pendente"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {getStatusText(req.status)}
                      </span>
                    </div>
                    <p className="dark:text-gray-300 text-gray-700 text-sm mb-3">
                      {req.descricao}
                    </p>
                    <div className="flex items-center justify-between text-xs dark:text-gray-500 text-gray-500">
                      <span>Enviado em {new Date(req.data).toLocaleDateString("pt-BR")}</span>
                      <button className="flex items-center gap-1 hover:text-[#8C43FF] transition-colors">
                        <Eye className="w-4 h-4" />
                        Ver detalhes
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Formulário Requerimento Geral */}
        {activeView === "createGeneral" && (
          <motion.div
            key="createGeneral"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RequerimentoGeralForm
              onSubmit={handleFormSubmit}
              onCancel={() => setActiveView("list")}
            />
          </motion.div>
        )}

        {/* Formulário Justificativa de Falta */}
        {activeView === "createJustificativa" && (
          <motion.div
            key="createJustificativa"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <JustificativaFaltaForm
              onSubmit={handleFormSubmit}
              onCancel={() => setActiveView("list")}
            />
          </motion.div>
        )}

        {/* Tela de Revisão */}
        {activeView === "review" && currentForm && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-xl border dark:border-[#333333] border-gray-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold dark:text-white text-gray-800">
                  Revise seu Requerimento
                </h2>
              </div>
              <p className="dark:text-gray-300 text-gray-700 mb-4">
                Por favor, revise cuidadosamente todas as informações antes de enviar. Após o envio,
                não será possível editar o requerimento.
              </p>

              {/* Preview do Formulário */}
              <div className="dark:bg-[#2D2D2D] bg-gray-50 rounded-xl p-4 mb-6 max-h-96 overflow-y-auto">
                <h3 className="font-semibold dark:text-white text-gray-800 mb-3">
                  Dados do Requerimento:
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(currentForm).map(([key, value]) => {
                    if (key === "tipo") return null
                    return (
                      <div key={key} className="flex">
                        <span className="font-medium dark:text-gray-400 text-gray-600 min-w-[150px]">
                          {key}:
                        </span>
                        <span className="dark:text-white text-gray-800">{value || "-"}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleCancelReview}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Voltar e Editar
                </motion.button>
                <motion.button
                  onClick={handleConfirmSubmit}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#8C43FF] hover:bg-[#7A3AE6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Confirmar e Enviar
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RequerimentosPage
