import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Upload } from "lucide-react"

const JustificativaFaltaForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tipo: "justificativa",
    aluno: "",
    endereco: "",
    bairro: "",
    cidade: "",
    telefone: "",
    celular: "",
    turma: "",
    rm: "",
    periodoFaltaInicio: "",
    periodoFaltaFim: "",
    motivo: "",
    motivoOutros: "",
    documentoAnexo: "",
    tipoProva: "",
    disciplinas: "",
    professores: "",
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
    const dataInicio = new Date(formData.periodoFaltaInicio).toLocaleDateString("pt-BR")
    const dataFim = new Date(formData.periodoFaltaFim).toLocaleDateString("pt-BR")
    const descricao = `Falta nos dias ${dataInicio} a ${dataFim} - ${formData.motivo}`

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
          Justificativa de Faltas / Prova Substitutiva
        </h2>
        <p className="dark:text-gray-400 text-gray-600 text-sm">
          Ato de Criação: Decreto 58.447 – DOE de 10/10/2012
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#333333] border-gray-200 space-y-6">
          {/* Dados do Aluno */}
          <div>
            <h3 className="font-semibold dark:text-white text-gray-800 mb-4 text-lg">
              Dados do Aluno
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Nome do Aluno *
                  </label>
                  <input
                    type="text"
                    name="aluno"
                    value={formData.aluno}
                    onChange={handleChange}
                    required
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Turma *
                    </label>
                    <input
                      type="text"
                      name="turma"
                      value={formData.turma}
                      onChange={handleChange}
                      required
                      className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                      placeholder="3°DS"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      RM *
                    </label>
                    <input
                      type="text"
                      name="rm"
                      value={formData.rm}
                      onChange={handleChange}
                      required
                      className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                      placeholder="RM"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Endereço *
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="Rua, número"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="Bairro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="Cidade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="(11) 1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                    className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    placeholder="(11) 91234-5678"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Período de Falta */}
          <div>
            <h3 className="font-semibold dark:text-white text-gray-800 mb-4 text-lg">
              Período da(s) Falta(s)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Data Início *
                </label>
                <input
                  type="date"
                  name="periodoFaltaInicio"
                  value={formData.periodoFaltaInicio}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Data Fim *
                </label>
                <input
                  type="date"
                  name="periodoFaltaFim"
                  value={formData.periodoFaltaFim}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
                />
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-3">
              Motivo: *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="motivo"
                  value="Saúde"
                  checked={formData.motivo === "Saúde"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Saúde</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="motivo"
                  value="Viagem"
                  checked={formData.motivo === "Viagem"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Viagem</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="motivo"
                  value="Outros"
                  checked={formData.motivo === "Outros"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Outros (especifique abaixo)</span>
              </label>
            </div>

            {formData.motivo === "Outros" && (
              <textarea
                name="motivoOutros"
                value={formData.motivoOutros}
                onChange={handleChange}
                rows={3}
                className="w-full mt-3 dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] resize-none"
                placeholder="Especifique o motivo..."
              />
            )}
          </div>

          {/* Documento em Anexo */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-3">
              Documento em Anexo:
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="documentoAnexo"
                  value="Atestado"
                  checked={formData.documentoAnexo === "Atestado"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Atestado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="documentoAnexo"
                  value="Declaração"
                  checked={formData.documentoAnexo === "Declaração"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Declaração</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="documentoAnexo"
                  value="Outros"
                  checked={formData.documentoAnexo === "Outros"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Outros</span>
              </label>
            </div>

            {formData.documentoAnexo && (
              <div className="mt-4">
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed dark:border-[#444444] border-gray-300 rounded-xl cursor-pointer hover:border-[#8C43FF] transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 dark:text-gray-400 text-gray-600" />
                    <p className="text-sm dark:text-gray-400 text-gray-600">
                      Clique para anexar documento
                    </p>
                    <p className="text-xs dark:text-gray-500 text-gray-500 mt-1">
                      PDF, JPG ou PNG (máx. 5MB)
                    </p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </label>
              </div>
            )}
          </div>

          {/* Solicitação de Prova */}
          <div>
            <h3 className="font-semibold dark:text-white text-gray-800 mb-3 text-lg">
              Requer respeitosamente a vossa senhoria a oportunidade de fazer:
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoProva"
                  value="Prova"
                  checked={formData.tipoProva === "Prova"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Prova</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoProva"
                  value="Trabalho"
                  checked={formData.tipoProva === "Trabalho"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Trabalho</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoProva"
                  value="Atividade"
                  checked={formData.tipoProva === "Atividade"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Atividade</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoProva"
                  value="Outros"
                  checked={formData.tipoProva === "Outros"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8C43FF] focus:ring-[#8C43FF]"
                />
                <span className="dark:text-white text-gray-800">Outros</span>
              </label>
            </div>
          </div>

          {/* Disciplinas e Professores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Disciplina(s)
              </label>
              <textarea
                name="disciplinas"
                value={formData.disciplinas}
                onChange={handleChange}
                rows={3}
                className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] resize-none"
                placeholder="Liste as disciplinas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Professor(es)
              </label>
              <textarea
                name="professores"
                value={formData.professores}
                onChange={handleChange}
                rows={3}
                className="w-full dark:bg-[#2D2D2D] bg-gray-50 border dark:border-[#444444] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] resize-none"
                placeholder="Liste os professores..."
              />
            </div>
          </div>

          {/* Botões de Ação */}
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

export default JustificativaFaltaForm
