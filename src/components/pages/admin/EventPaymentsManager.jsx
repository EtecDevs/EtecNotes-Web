"use client"

import { useState } from "react"
import { Check, X, Eye, Download, Calendar, User, Mail, Hash, DollarSign, Clock, Search, Filter } from "lucide-react"

const EventPaymentsManager = () => {
  const [receipts, setReceipts] = useState([
    // Dados de exemplo - substituir por dados reais do banco de dados
    {
      id: 1,
      eventId: 2,
      eventTitle: "Workshop de Programação",
      eventDate: "2025-09-22",
      eventPrice: 25.00,
      userId: "test_aluno_1",
      userName: "João Santos",
      userEmail: "aluno@teste.com",
      userRm: "12345",
      receiptFile: "comprovante_joao_workshop.jpg",
      receiptUrl: "/placeholder.svg",
      submittedAt: "2025-10-05T14:30:00",
      status: "pending", // pending, approved, rejected
      reviewedAt: null,
      reviewedBy: null,
      notes: ""
    },
    {
      id: 2,
      eventId: 4,
      eventTitle: "Competição de Robótica",
      eventDate: "2025-10-05",
      eventPrice: 15.00,
      userId: "test_aluno_2",
      userName: "Ana Costa",
      userEmail: "estudante@etec.com",
      userRm: "67890",
      receiptFile: "comprovante_ana_robotica.pdf",
      receiptUrl: null,
      submittedAt: "2025-10-04T10:15:00",
      status: "approved",
      reviewedAt: "2025-10-04T15:20:00",
      reviewedBy: "Secretaria",
      notes: "Comprovante válido"
    },
    {
      id: 3,
      eventId: 6,
      eventTitle: "Hackathon Etec 2025",
      eventDate: "2025-10-19",
      eventPrice: 50.00,
      userId: "test_aluno_1",
      userName: "João Santos",
      userEmail: "aluno@teste.com",
      userRm: "12345",
      receiptFile: "comprovante_joao_hackathon.jpg",
      receiptUrl: "/placeholder.svg",
      submittedAt: "2025-10-03T09:45:00",
      status: "pending",
      reviewedAt: null,
      reviewedBy: null,
      notes: ""
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all") // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")

  const handleApprove = (receiptId) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? {
            ...receipt,
            status: "approved",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "Secretaria",
            notes: reviewNotes || "Aprovado"
          }
        : receipt
    ))
    setShowReviewModal(false)
    setSelectedReceipt(null)
    setReviewNotes("")
  }

  const handleReject = (receiptId) => {
    if (!reviewNotes.trim()) {
      alert("Por favor, adicione uma justificativa para a rejeição")
      return
    }
    
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? {
            ...receipt,
            status: "rejected",
            reviewedAt: new Date().toISOString(),
            reviewedBy: "Secretaria",
            notes: reviewNotes
          }
        : receipt
    ))
    setShowReviewModal(false)
    setSelectedReceipt(null)
    setReviewNotes("")
  }

  const openReviewModal = (receipt) => {
    setSelectedReceipt(receipt)
    setReviewNotes(receipt.notes || "")
    setShowReviewModal(true)
  }

  // Filtrar comprovantes
  const filteredReceipts = receipts.filter(receipt => {
    const matchesStatus = filterStatus === "all" || receipt.status === filterStatus
    const matchesSearch = 
      receipt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.userRm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: receipts.length,
    pending: receipts.filter(r => r.status === "pending").length,
    approved: receipts.filter(r => r.status === "approved").length,
    rejected: receipts.filter(r => r.status === "rejected").length,
    totalValue: receipts.reduce((sum, r) => sum + r.eventPrice, 0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "approved": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending": return "Pendente"
      case "approved": return "Aprovado"
      case "rejected": return "Rejeitado"
      default: return status
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gerenciar Comprovantes de Pagamento
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Validação de comprovantes de eventos pagos
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Total de Comprovantes</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Pendentes</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Aprovados</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Rejeitados</p>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Valor Total</p>
          <p className="text-3xl font-bold">R$ {stats.totalValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email, RM ou evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro de Status */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Aprovados
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterStatus === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Rejeitados
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Comprovantes */}
      <div className="space-y-4">
        {filteredReceipts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhum comprovante encontrado
            </p>
          </div>
        ) : (
          filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Informações Principais */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {receipt.eventTitle}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(receipt.status)}`}>
                        {getStatusLabel(receipt.status)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        R$ {receipt.eventPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4" />
                      <span className="text-sm"><strong>Aluno:</strong> {receipt.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Hash className="w-4 h-4" />
                      <span className="text-sm"><strong>RM:</strong> {receipt.userRm}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm"><strong>Email:</strong> {receipt.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm"><strong>Evento:</strong> {new Date(receipt.eventDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm"><strong>Enviado em:</strong> {new Date(receipt.submittedAt).toLocaleString("pt-BR")}</span>
                    </div>
                    {receipt.reviewedAt && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Check className="w-4 h-4" />
                        <span className="text-sm"><strong>Revisado em:</strong> {new Date(receipt.reviewedAt).toLocaleString("pt-BR")}</span>
                      </div>
                    )}
                  </div>

                  {receipt.notes && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Observações:</strong> {receipt.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-3 lg:w-48">
                  {receipt.receiptUrl && (
                    <a
                      href={receipt.receiptUrl}
                      download={receipt.receiptFile}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Baixar
                    </a>
                  )}
                  
                  <button
                    onClick={() => openReviewModal(receipt)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Revisar
                  </button>
                  
                  {receipt.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          openReviewModal(receipt)
                        }}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Aprovar
                      </button>
                      <button
                        onClick={() => {
                          openReviewModal(receipt)
                        }}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Rejeitar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Revisão */}
      {showReviewModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Revisar Comprovante
              </h2>
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setSelectedReceipt(null)
                  setReviewNotes("")
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Preview do Comprovante */}
            <div className="mb-6">
              {selectedReceipt.receiptUrl ? (
                <div className="relative">
                  <img
                    src={selectedReceipt.receiptUrl}
                    alt="Comprovante"
                    className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600"
                  />
                  <a
                    href={selectedReceipt.receiptUrl}
                    download={selectedReceipt.receiptFile}
                    className="absolute top-2 right-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Baixar
                  </a>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    📄 Arquivo PDF - {selectedReceipt.receiptFile}
                  </p>
                  <a
                    href="#"
                    download={selectedReceipt.receiptFile}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Baixar PDF
                  </a>
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Aluno:</strong> {selectedReceipt.userName} (RM: {selectedReceipt.userRm})
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Evento:</strong> {selectedReceipt.eventTitle}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Valor:</strong> R$ {selectedReceipt.eventPrice.toFixed(2)}
              </p>
            </div>

            {/* Observações */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Observações {selectedReceipt.status === "pending" && "(Opcional para aprovação, obrigatório para rejeição)"}
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white resize-none"
                rows="4"
                placeholder="Adicione observações sobre a revisão..."
              />
            </div>

            {/* Botões de Ação */}
            {selectedReceipt.status === "pending" && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(selectedReceipt.id)}
                  className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
                >
                  ✓ Aprovar Comprovante
                </button>
                <button
                  onClick={() => handleReject(selectedReceipt.id)}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
                >
                  ✗ Rejeitar Comprovante
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventPaymentsManager
