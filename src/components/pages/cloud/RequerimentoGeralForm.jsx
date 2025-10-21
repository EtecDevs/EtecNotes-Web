import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"

const RequerimentoGeralForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tipo: "geral",
    nome: "",
    rg: "",
    matricula: "",
    tipoRequerimento: "",
    justificativaFalta: false,
    periodoInicio: "",
    periodoFim: "",
    informacoesAdicionais: "",
    descricao: ""
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Gerar descrição automática
    const descricao = formData.tipoRequerimento === "declaracao"
      ? "Solicitação de Declaração"
      : formData.tipoRequerimento === "atestado"
      ? "Solicitação de Atestado"
      : formData.tipoRequerimento === "outros"
      ? formData.informacoesAdicionais.substring(0, 50)
      : "Requerimento Geral"

    onSubmit({ ...formData, descricao })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 dark:text-gray-400 text-gray-600 hover:text-[#8C43FF] transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-2">
          Requerimento Geral
        </h2>
        <p className="dark:text-gray-400 text-gray-600">
          Professor - Administrativo
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#333333] border-gray-200 space-y-6">
          {/* Dados do Aluno */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                RG *
              </label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                required
                className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                placeholder="XX.XXX.XXX-X"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Matrícula *
              </label>
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                required
                className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                placeholder="Número de matrícula"
              />
            </div>
          </div>

          {/* Tipo de Requerimento */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-3">
              Requer: *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRequerimento"
                  value="declaracao"
                  checked={formData.tipoRequerimento === "declaracao"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Declaração</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRequerimento"
                  value="atestado"
                  checked={formData.tipoRequerimento === "atestado"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Atestado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRequerimento"
                  value="outros"
                  checked={formData.tipoRequerimento === "outros"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Outros (Especificar)</span>
              </label>
            </div>
          </div>

          {/* Justificativa de Falta */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="justificativaFalta"
              checked={formData.justificativaFalta}
              onChange={handleChange}
              className="w-5 h-5 text-[#8C43FF] rounded focus:ring-[#8C43FF] mt-1"
            />
            <div>
              <label className="font-medium dark:text-white text-gray-800 cursor-pointer">
                Justificativa de Falta
              </label>
              <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
                (Indique os Períodos)
              </p>
            </div>
          </div>

          {/* Período (se justificativa de falta marcada) */}
          {formData.justificativaFalta && (
            <div className="grid grid-cols-2 gap-4 pl-8">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Início
                </label>
                <input
                  type="date"
                  name="periodoInicio"
                  value={formData.periodoInicio}
                  onChange={handleChange}
                  className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Fim
                </label>
                <input
                  type="date"
                  name="periodoFim"
                  value={formData.periodoFim}
                  onChange={handleChange}
                  className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                />
              </div>
            </div>
          )}

          {/* Informações Adicionais */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Informações Adicionais
            </label>
            <textarea
              name="informacoesAdicionais"
              value={formData.informacoesAdicionais}
              onChange={handleChange}
              rows={6}
              className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] resize-none"
              placeholder="Descreva detalhadamente sua solicitação..."
            />
          </div>

          {/* Botão de Enviar */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Cancelar
            </button>
            <motion.button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-[#8C43FF] hover:bg-[#7A3AE6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              Avançar para Revisão
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default RequerimentoGeralForm
