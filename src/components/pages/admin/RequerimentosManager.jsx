import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare, 
  Calendar,
  User,
  School,
  AlertTriangle,
  Download,
  Printer,
  RefreshCw,
  MoreHorizontal,
  Send,
  Archive,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RequerimentosManager = ({ onBack }) => {
  const [requerimentos, setRequerimentos] = useState([]);
  const [filteredRequerimentos, setFilteredRequerimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [selectedRequerimento, setSelectedRequerimento] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responseType, setResponseType] = useState('aprovado'); // aprovado, rejeitado, pendente

  // Simular dados de requerimentos (em produção, viria de uma API)
  useEffect(() => {
    const mockRequerimentos = [
      {
        id: 1,
        protocolo: 'REQ-2024-001',
        tipo: 'Requerimento Geral',
        titulo: 'Solicitação de Transferência de Turno',
        aluno: {
          nome: 'João Silva Santos',
          email: 'joao.silva@etec.sp.gov.br',
          ra: '123456789',
          curso: 'Desenvolvimento de Sistemas',
          turma: '3º DS A',
          campus: 'ETEC Professor Basilides de Godoy'
        },
        conteudo: 'Solicito transferência do turno vespertino para o matutino devido a nova oportunidade de trabalho que requer horário comercial.',
        status: 'pendente',
        prioridade: 'normal',
        dataEnvio: new Date('2024-10-20'),
        dataResposta: null,
        resposta: null,
        anexos: [],
        historico: [
          {
            data: new Date('2024-10-20'),
            acao: 'Requerimento enviado',
            usuario: 'João Silva Santos',
            detalhes: 'Requerimento criado pelo aluno'
          }
        ]
      },
      {
        id: 2,
        protocolo: 'REQ-2024-002',
        tipo: 'Justificativa de Falta',
        titulo: 'Justificativa de Ausência - Consulta Médica',
        aluno: {
          nome: 'Maria Oliveira Costa',
          email: 'maria.oliveira@etec.sp.gov.br',
          ra: '987654321',
          curso: 'Administração',
          turma: '2º ADM B',
          campus: 'ETEC Professor Basilides de Godoy'
        },
        conteudo: 'Solicito justificativa de falta do dia 18/10/2024 devido a consulta médica de emergência.',
        dataAusencia: new Date('2024-10-18'),
        status: 'aprovado',
        prioridade: 'urgente',
        dataEnvio: new Date('2024-10-19'),
        dataResposta: new Date('2024-10-20'),
        resposta: 'Falta justificada. Apresentar atestado médico na secretaria.',
        anexos: ['atestado_medico.pdf'],
        historico: [
          {
            data: new Date('2024-10-19'),
            acao: 'Requerimento enviado',
            usuario: 'Maria Oliveira Costa',
            detalhes: 'Justificativa de falta enviada'
          },
          {
            data: new Date('2024-10-20'),
            acao: 'Requerimento aprovado',
            usuario: 'Admin Sistema',
            detalhes: 'Falta justificada com apresentação de atestado'
          }
        ]
      },
      {
        id: 3,
        protocolo: 'REQ-2024-003',
        tipo: 'Requerimento Geral',
        titulo: 'Solicitação de Segunda Chamada',
        aluno: {
          nome: 'Pedro Henrique Lima',
          email: 'pedro.lima@etec.sp.gov.br',
          ra: '456789123',
          curso: 'Informática para Internet',
          turma: '1º IPI A',
          campus: 'ETEC Professor Basilides de Godoy'
        },
        conteudo: 'Solicito segunda chamada para a prova de Programação Web do dia 15/10/2024, pois estava enfermo conforme atestado médico anexo.',
        status: 'rejeitado',
        prioridade: 'normal',
        dataEnvio: new Date('2024-10-16'),
        dataResposta: new Date('2024-10-21'),
        resposta: 'Solicitação negada. O prazo para solicitação de segunda chamada é de até 48h após a prova.',
        anexos: ['atestado_medico_pedro.pdf'],
        historico: [
          {
            data: new Date('2024-10-16'),
            acao: 'Requerimento enviado',
            usuario: 'Pedro Henrique Lima',
            detalhes: 'Solicitação de segunda chamada'
          },
          {
            data: new Date('2024-10-21'),
            acao: 'Requerimento rejeitado',
            usuario: 'Admin Sistema',
            detalhes: 'Prazo para solicitação expirado'
          }
        ]
      }
    ];

    setTimeout(() => {
      setRequerimentos(mockRequerimentos);
      setFilteredRequerimentos(mockRequerimentos);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar requerimentos
  useEffect(() => {
    let filtered = requerimentos;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.aluno.ra.includes(searchTerm)
      );
    }

    // Filtro por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filtro por tipo
    if (tipoFilter !== 'todos') {
      filtered = filtered.filter(req => req.tipo === tipoFilter);
    }

    setFilteredRequerimentos(filtered);
  }, [searchTerm, statusFilter, tipoFilter, requerimentos]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejeitado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente':
        return <Clock size={16} className="text-yellow-600" />;
      case 'aprovado':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejeitado':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (prioridade) => {
    switch (prioridade) {
      case 'urgente':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'alta':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'baixa':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleViewDetails = (requerimento) => {
    setSelectedRequerimento(requerimento);
    setShowDetails(true);
  };

  const handleRespond = (requerimento) => {
    setSelectedRequerimento(requerimento);
    setResponseText('');
    setResponseType('aprovado');
    setShowResponseModal(true);
  };

  const handleSendResponse = () => {
    if (!responseText.trim()) return;

    const updatedRequerimento = {
      ...selectedRequerimento,
      status: responseType,
      resposta: responseText,
      dataResposta: new Date(),
      historico: [
        ...selectedRequerimento.historico,
        {
          data: new Date(),
          acao: `Requerimento ${responseType}`,
          usuario: 'Admin Sistema',
          detalhes: responseText
        }
      ]
    };

    setRequerimentos(prev => 
      prev.map(req => req.id === selectedRequerimento.id ? updatedRequerimento : req)
    );

    setShowResponseModal(false);
    setSelectedRequerimento(null);
    setResponseText('');
  };

  const stats = {
    total: requerimentos.length,
    pendentes: requerimentos.filter(r => r.status === 'pendente').length,
    aprovados: requerimentos.filter(r => r.status === 'aprovado').length,
    rejeitados: requerimentos.filter(r => r.status === 'rejeitado').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/25">
            <RefreshCw className="w-8 h-8 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent mb-2">
            Carregando requerimentos...
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Por favor, aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="p-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent">
                Gerenciamento de Requerimentos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Gerencie todas as solicitações dos alunos de forma eficiente
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white rounded-2xl hover:from-[#7A3BE6] hover:to-[#5927A3] transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30">
              <Download size={16} />
              Exportar
            </button>
            <button className="p-3 bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 backdrop-blur-xl">
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {stats.total}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendentes}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aprovados</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.aprovados}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejeitados</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.rejeitados}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por aluno, protocolo, RA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
            >
              <option value="todos">Todos os Status</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovado">Aprovados</option>
              <option value="rejeitado">Rejeitados</option>
            </select>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-6 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="Requerimento Geral">Requerimento Geral</option>
              <option value="Justificativa de Falta">Justificativa de Falta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Requerimentos */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Requerimentos ({filteredRequerimentos.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          {filteredRequerimentos.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum requerimento encontrado</h3>
              <p className="text-gray-500 dark:text-gray-400">Tente ajustar os filtros ou verificar novamente mais tarde</p>
            </div>
          ) : (
            filteredRequerimentos.map((requerimento) => (
              <motion.div
                key={requerimento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent">
                        {requerimento.protocolo}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-2xl border flex items-center gap-1 ${getStatusColor(requerimento.status)}`}>
                        {getStatusIcon(requerimento.status)}
                        <span className="capitalize">{requerimento.status}</span>
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-2xl border flex items-center gap-1 ${getPriorityColor(requerimento.prioridade)}`}>
                        {requerimento.prioridade === 'urgente' && <AlertTriangle size={12} />}
                        {requerimento.prioridade}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {requerimento.titulo}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span className="font-medium">{requerimento.aluno.nome}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School size={16} />
                        <span>{requerimento.aluno.curso} - {requerimento.aluno.turma}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{requerimento.dataEnvio.toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                      {requerimento.conteudo}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => handleViewDetails(requerimento)}
                      className="p-3 text-gray-600 dark:text-gray-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300 hover:scale-110"
                      title="Ver detalhes"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {requerimento.status === 'pendente' && (
                      <button
                        onClick={() => handleRespond(requerimento)}
                        className="p-3 text-[#8C43FF] hover:bg-purple-100/50 dark:hover:bg-purple-900/20 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="Responder"
                      >
                        <MessageSquare size={18} />
                      </button>
                    )}
                    
                    <button
                      className="p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 rounded-2xl transition-all duration-300 hover:scale-110"
                      title="Mais opções"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {showDetails && selectedRequerimento && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-4xl h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 bg-gradient-to-br from-[#8C43FF]/10 via-[#6B32C3]/10 to-cyan-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText size={28} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent">
                        {selectedRequerimento.protocolo}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Detalhes completos do requerimento
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 hover:scale-110"
                  >
                    <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#8C43FF] scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Informações do Aluno
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 space-y-3">
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Nome:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.nome}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Email:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.email}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">RA:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.ra}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Curso:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.curso}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Turma:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.turma}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Campus:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.aluno.campus}</span></p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Detalhes do Requerimento
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 space-y-3">
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Tipo:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.tipo}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Título:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.titulo}</span></p>
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Data de Envio:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.dataEnvio.toLocaleDateString('pt-BR')}</span></p>
                        {selectedRequerimento.dataAusencia && (
                          <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Data da Ausência:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.dataAusencia.toLocaleDateString('pt-BR')}</span></p>
                        )}
                        <p className="flex justify-between"><span className="font-medium text-gray-600 dark:text-gray-400">Prioridade:</span> <span className="text-gray-900 dark:text-white">{selectedRequerimento.prioridade}</span></p>
                        <p className="flex justify-between items-center">
                          <span className="font-medium text-gray-600 dark:text-gray-400">Status:</span> 
                          <span className={`px-3 py-1 text-xs font-medium rounded-2xl border ${getStatusColor(selectedRequerimento.status)}`}>
                            {selectedRequerimento.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Conteúdo da Solicitação
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedRequerimento.conteudo}
                        </p>
                      </div>
                    </div>
                    
                    {selectedRequerimento.resposta && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          Resposta da Administração
                        </h3>
                        <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedRequerimento.resposta}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-blue-200/30 dark:border-blue-700/30">
                            Respondido em: {selectedRequerimento.dataResposta?.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Histórico
                      </h3>
                      <div className="space-y-4">
                        {selectedRequerimento.historico.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] rounded-full mt-2 shadow-lg"></div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 dark:text-white">{item.acao}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detalhes}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {item.data.toLocaleDateString('pt-BR')} - {item.usuario}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedRequerimento.status === 'pendente' && (
                <div className="p-8 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium"
                    >
                      Fechar
                    </button>
                    <button
                      onClick={() => {
                        setShowDetails(false);
                        handleRespond(selectedRequerimento);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white rounded-2xl hover:from-[#7A3BE6] hover:to-[#5927A3] transition-all duration-300 font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                    >
                      Responder
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Resposta */}
      <AnimatePresence>
        {showResponseModal && selectedRequerimento && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            onClick={() => setShowResponseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 bg-gradient-to-br from-[#8C43FF]/10 via-[#6B32C3]/10 to-cyan-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <MessageSquare size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] bg-clip-text text-transparent">
                      Responder Requerimento
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedRequerimento.protocolo} - {selectedRequerimento.aluno.nome}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Status da Resposta
                  </label>
                  <select
                    value={responseType}
                    onChange={(e) => setResponseType(e.target.value)}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300"
                  >
                    <option value="aprovado">Aprovar</option>
                    <option value="rejeitado">Rejeitar</option>
                    <option value="pendente">Manter Pendente</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Resposta/Justificativa
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Digite sua resposta ou justificativa..."
                    rows={6}
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent backdrop-blur-xl transition-all duration-300 resize-none"
                  />
                </div>
              </div>
              
              <div className="p-8 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-300 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendResponse}
                    disabled={!responseText.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white rounded-2xl hover:from-[#7A3BE6] hover:to-[#5927A3] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 flex items-center gap-2"
                  >
                    <Send size={16} />
                    Enviar Resposta
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequerimentosManager;