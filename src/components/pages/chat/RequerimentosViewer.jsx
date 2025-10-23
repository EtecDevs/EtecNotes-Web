import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download,
  Filter,
  Search,
  Calendar,
  ChevronRight,
  ExternalLink
} from "lucide-react"

const RequerimentosViewer = () => {
  const [selectedFilter, setSelectedFilter] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequerimento, setSelectedRequerimento] = useState(null)
  
  // Mock data expandido com mais detalhes
  const [requerimentos] = useState([
    {
      id: 1,
      tipo: "Requerimento Geral",
      categoria: "Declaração",
      status: "aprovado",
      dataEnvio: "2025-10-15T14:30:00",
      dataResposta: "2025-10-16T09:15:00",
      protocolo: "RG-2025-001",
      descricao: "Solicitação de declaração de matrícula",
      detalhes: {
        nome: "Ana Silva Santos",
        rg: "12.345.678-9",
        matricula: "2025001234",
        curso: "Desenvolvimento de Sistemas",
        solicitacao: "Declaração de matrícula para comprovação de vínculo acadêmico",
        observacoes: "Documento aprovado e disponível para retirada na secretaria."
      },
      anexos: [
        { nome: "declaracao_matricula.pdf", tamanho: "245 KB" }
      ]
    },
    {
      id: 2,
      tipo: "Justificativa de Falta",
      categoria: "Justificativa",
      status: "em-analise",
      dataEnvio: "2025-10-20T16:45:00",
      dataResposta: null,
      protocolo: "JF-2025-032",
      descricao: "Falta nos dias 18/10 e 19/10 devido a consulta médica",
      detalhes: {
        nome: "Ana Silva Santos",
        rg: "12.345.678-9",
        matricula: "2025001234",
        curso: "Desenvolvimento de Sistemas",
        periodos: "18/10/2025 a 19/10/2025",
        motivo: "Consulta médica de urgência - cardiologista",
        observacoes: "Aguardando análise da coordenação pedagógica."
      },
      anexos: [
        { nome: "atestado_medico.pdf", tamanho: "180 KB" }
      ]
    },
    {
      id: 3,
      tipo: "Requerimento Geral", 
      categoria: "Atestado",
      status: "recusado",
      dataEnvio: "2025-10-12T10:20:00",
      dataResposta: "2025-10-13T11:00:00",
      protocolo: "RG-2025-002",
      descricao: "Solicitação de atestado de frequência",
      detalhes: {
        nome: "Ana Silva Santos",
        rg: "12.345.678-9", 
        matricula: "2025001234",
        curso: "Desenvolvimento de Sistemas",
        solicitacao: "Atestado de frequência para apresentação na empresa",
        observacoes: "Solicitação negada devido à frequência insuficiente (72%). Necessária frequência mínima de 75%."
      },
      anexos: []
    }
  ])

  const getStatusConfig = (status) => {
    switch (status) {
      case "aprovado":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          text: "Aprovado",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800"
        }
      case "em-analise":
        return {
          icon: <Clock className="w-5 h-5" />,
          text: "Em Análise", 
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800"
        }
      case "recusado":
        return {
          icon: <XCircle className="w-5 h-5" />,
          text: "Recusado",
          color: "text-red-600 dark:text-red-400", 
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800"
        }
      default:
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          text: "Indefinido",
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-50 dark:bg-gray-800",
          borderColor: "border-gray-200 dark:border-gray-700"
        }
    }
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredRequerimentos = requerimentos.filter(req => {
    const matchFilter = selectedFilter === "todos" || req.status === selectedFilter
    const matchSearch = !searchQuery || 
      req.protocolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.tipo.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchFilter && matchSearch
  })

  const RequerimentoDetail = ({ requerimento, onClose }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full flex flex-col"
    >
      {/* Header do Detalhe */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
          >
            ←
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {requerimento.tipo}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Protocolo: {requerimento.protocolo}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {requerimento.anexos.length > 0 && (
            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
              <Download size={18} />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusConfig(requerimento.status).bgColor} ${getStatusConfig(requerimento.status).borderColor} border`}>
            {getStatusConfig(requerimento.status).icon}
            <span className={`text-sm font-medium ${getStatusConfig(requerimento.status).color}`}>
              {getStatusConfig(requerimento.status).text}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Detalhe */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Timeline */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Enviado</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDateTime(requerimento.dataEnvio)}
                </p>
              </div>
            </div>
            {requerimento.dataResposta && (
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  requerimento.status === 'aprovado' ? 'bg-green-500' : 
                  requerimento.status === 'recusado' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {requerimento.status === 'aprovado' ? 'Aprovado' : 
                     requerimento.status === 'recusado' ? 'Recusado' : 'Respondido'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDateTime(requerimento.dataResposta)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dados do Requerimento */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Dados do Requerimento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Nome:</span>
              <p className="font-medium text-gray-900 dark:text-white">{requerimento.detalhes.nome}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">RG:</span>
              <p className="font-medium text-gray-900 dark:text-white">{requerimento.detalhes.rg}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Matrícula:</span>
              <p className="font-medium text-gray-900 dark:text-white">{requerimento.detalhes.matricula}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Curso:</span>
              <p className="font-medium text-gray-900 dark:text-white">{requerimento.detalhes.curso}</p>
            </div>
            {requerimento.detalhes.periodos && (
              <div className="md:col-span-2">
                <span className="text-gray-600 dark:text-gray-400">Períodos:</span>
                <p className="font-medium text-gray-900 dark:text-white">{requerimento.detalhes.periodos}</p>
              </div>
            )}
          </div>
        </div>

        {/* Descrição/Solicitação */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {requerimento.detalhes.solicitacao ? 'Solicitação' : 'Motivo'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {requerimento.detalhes.solicitacao || requerimento.detalhes.motivo || requerimento.descricao}
          </p>
        </div>

        {/* Observações */}
        {requerimento.detalhes.observacoes && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Observações</h3>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              {requerimento.detalhes.observacoes}
            </p>
          </div>
        )}

        {/* Anexos */}
        {requerimento.anexos.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Anexos</h3>
            <div className="space-y-2">
              {requerimento.anexos.map((anexo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{anexo.nome}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{anexo.tamanho}</p>
                    </div>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )

  if (selectedRequerimento) {
    return <RequerimentoDetail 
      requerimento={selectedRequerimento} 
      onClose={() => setSelectedRequerimento(null)} 
    />
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Meus Requerimentos
        </h1>
        
        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por protocolo ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="todos">Todos</option>
              <option value="aprovado">Aprovados</option>
              <option value="em-analise">Em Análise</option>
              <option value="recusado">Recusados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Requerimentos */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredRequerimentos.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhum requerimento encontrado'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Tente ajustar sua busca' : 'Você ainda não fez nenhum requerimento'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequerimentos.map((requerimento, index) => {
              const statusConfig = getStatusConfig(requerimento.status)
              
              return (
                <motion.div
                  key={requerimento.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedRequerimento(requerimento)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {requerimento.tipo}
                        </h3>
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {requerimento.protocolo}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {requerimento.descricao}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Enviado: {formatDateTime(requerimento.dataEnvio)}</span>
                        {requerimento.dataResposta && (
                          <span>Respondido: {formatDateTime(requerimento.dataResposta)}</span>
                        )}
                        {requerimento.anexos.length > 0 && (
                          <span className="flex items-center gap-1">
                            <FileText size={12} />
                            {requerimento.anexos.length} anexo{requerimento.anexos.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                        {statusConfig.icon}
                        <span className={`text-sm font-medium ${statusConfig.color}`}>
                          {statusConfig.text}
                        </span>
                      </div>
                      
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default RequerimentosViewer