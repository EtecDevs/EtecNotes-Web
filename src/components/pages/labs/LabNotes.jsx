"use client"

import React, { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Plus, Check, X, Edit, Search, Monitor, Users, AlertCircle, CheckCircle, XCircle } from "lucide-react"

// Constantes fora do componente para evitar re-criações
const MODAL_SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

// Modal Component fora do componente principal
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full ${MODAL_SIZE_CLASSES[size]} bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const LabsControlPage = ({ userType = "teacher", userData }) => {
  // Estados
  const [selectedView, setSelectedView] = useState("grid") // grid ou list
  const [selectedLab, setSelectedLab] = useState(null)
  const [selectedDay, setSelectedDay] = useState("segunda")
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - Laboratórios
  const [labs] = useState([
    { id: "lab1", nome: "Laboratório 1", tipo: "Informática", status: "ativo" },
    { id: "lab2", nome: "Laboratório 2", tipo: "Informática", status: "ativo" },
    { id: "lab3", nome: "Laboratório 3", tipo: "Informática", status: "ativo" },
    { id: "lab4", nome: "Laboratório 4", tipo: "Informática", status: "ativo" },
    { id: "aud1", nome: "Auditório", tipo: "Auditório", status: "ativo" },
  ])

  // Mock data - Horários do professor
  const teacherSchedule = {
    segunda: ["1", "2", "3"],
    terca: ["4", "5"],
    quarta: ["2", "3", "4"],
    quinta: ["1", "5", "6"],
    sexta: ["7", "8"],
  }

  // Estado dos agendamentos
  const [agendamentos, setAgendamentos] = useState([
    {
      id: "ag_001",
      professor_id: "prof_elza",
      professor_nome: "Prof. Elza Ferreira",
      lab_id: "lab4",
      lab_nome: "Laboratório 4",
      dia_semana: "segunda",
      aula_inicio: 1,
      aula_fim: 3,
      recorrente: true,
      status: "aprovado",
      descricao: "Aula prática de sociologia - 3º DS",
      criado_em: "2025-01-05T12:00:00Z",
      turma: "3º DS A",
    },
    {
      id: "ag_002",
      professor_id: "prof_santos",
      professor_nome: "Prof. William Santos",
      lab_id: "lab2",
      lab_nome: "Laboratório 2",
      dia_semana: "terca",
      aula_inicio: 4,
      aula_fim: 5,
      recorrente: true,
      status: "aprovado",
      descricao: "Aula de Matemática - Exercícios com software",
      criado_em: "2025-01-04T10:00:00Z",
      turma: "2º DS B",
    },
    {
      id: "ag_003",
      professor_id: "prof_paulo",
      professor_nome: "Prof. Paulo Silva",
      lab_id: "lab1",
      lab_nome: "Laboratório 1",
      dia_semana: "quarta",
      aula_inicio: 2,
      aula_fim: 4,
      recorrente: false,
      status: "pendente",
      descricao: "Desenvolvimento de projeto final - PAM",
      criado_em: "2025-01-06T14:00:00Z",
      turma: "3º DS A",
    },
    {
      id: "ag_004",
      professor_id: "prof_iury",
      professor_nome: "Prof. Iury Gomes",
      lab_id: "lab3",
      lab_nome: "Laboratório 3",
      dia_semana: "quinta",
      aula_inicio: 1,
      aula_fim: 2,
      recorrente: true,
      status: "pendente",
      descricao: "Sistemas Embarcados - Prática com Arduino",
      criado_em: "2025-01-06T16:00:00Z",
      turma: "2º DS A",
    },
  ])

  // Estado do formulário de solicitação
  const [requestForm, setRequestForm] = useState({
    lab_id: "",
    dia_semana: "segunda",
    aula_inicio: "",
    aula_fim: "",
    recorrente: false,
    descricao: "",
    turma: "",
  })

  // Dias da semana
  const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta"]
  const diasSemanaLabel = {
    segunda: "Segunda",
    terca: "Terça",
    quarta: "Quarta",
    quinta: "Quinta",
    sexta: "Sexta",
  }

  // Aulas
  const aulas = Array.from({ length: 8 }, (_, i) => i + 1)

  // Funções memoizadas com useCallback
  const isSlotAvailable = useCallback((labId, dia, aula) => {
    const agendamento = agendamentos.find(
      (ag) =>
        ag.lab_id === labId &&
        ag.dia_semana === dia &&
        aula >= ag.aula_inicio &&
        aula <= ag.aula_fim &&
        ag.status === "aprovado",
    )
    return !agendamento
  }, [agendamentos])

  const getSlotStatus = useCallback((labId, dia, aula) => {
    const agendamento = agendamentos.find(
      (ag) => ag.lab_id === labId && ag.dia_semana === dia && aula >= ag.aula_inicio && aula <= ag.aula_fim,
    )

    if (!agendamento) return { status: "livre", color: "bg-green-500/10 border-green-500/20" }
    if (agendamento.status === "pendente")
      return { status: "pendente", color: "bg-yellow-500/10 border-yellow-500/20", agendamento }
    if (agendamento.status === "aprovado")
      return { status: "reservado", color: "bg-red-500/10 border-red-500/20", agendamento }
    return { status: "livre", color: "bg-green-500/10 border-green-500/20" }
  }, [agendamentos])

  const canTeacherRequest = useCallback((dia, aula) => {
    return teacherSchedule[dia]?.includes(String(aula))
  }, [teacherSchedule])

  const handleSubmitRequest = useCallback(() => {
    if (!requestForm.lab_id || !requestForm.aula_inicio || !requestForm.aula_fim || !requestForm.descricao) {
      alert("Preencha todos os campos obrigatórios!")
      return
    }

    const newRequest = {
      id: `ag_${Date.now()}`,
      professor_id: userData?.id || "current_user",
      professor_nome: userData?.name || "Professor Atual",
      lab_id: requestForm.lab_id,
      lab_nome: labs.find((l) => l.id === requestForm.lab_id)?.nome,
      dia_semana: requestForm.dia_semana,
      aula_inicio: Number.parseInt(requestForm.aula_inicio),
      aula_fim: Number.parseInt(requestForm.aula_fim),
      recorrente: requestForm.recorrente,
      status: "pendente",
      descricao: requestForm.descricao,
      turma: requestForm.turma,
      criado_em: new Date().toISOString(),
    }

    setAgendamentos([...agendamentos, newRequest])
    setShowRequestModal(false)
    setRequestForm({
      lab_id: "",
      dia_semana: "segunda",
      aula_inicio: "",
      aula_fim: "",
      recorrente: false,
      descricao: "",
      turma: "",
    })
  }, [requestForm, agendamentos, labs, userData])

  const handleApprove = useCallback((id) => {
    setAgendamentos(agendamentos.map((ag) => (ag.id === id ? { ...ag, status: "aprovado" } : ag)))
    setShowApprovalModal(false)
  }, [agendamentos])

  const handleReject = useCallback((id) => {
    if (window.confirm("Tem certeza que deseja rejeitar esta solicitação?")) {
      setAgendamentos(agendamentos.map((ag) => (ag.id === id ? { ...ag, status: "rejeitado" } : ag)))
      setShowApprovalModal(false)
    }
  }, [agendamentos])

  const handleDelete = useCallback((id) => {
    if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      setAgendamentos(agendamentos.filter((ag) => ag.id !== id))
      setShowApprovalModal(false)
    }
  }, [agendamentos])

  const handleRequestFormChange = useCallback((field, value) => {
    setRequestForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSlotClick = useCallback((dia, aula, slotInfo, canRequest) => {
    if (userType === "teacher" && canRequest && slotInfo.status === "livre") {
      setRequestForm({
        lab_id: selectedLab,
        dia_semana: dia,
        aula_inicio: String(aula),
        aula_fim: String(aula),
        recorrente: false,
        descricao: "",
        turma: "",
      })
      setShowRequestModal(true)
    } else if (userType === "etec" && slotInfo.agendamento) {
      setSelectedRequest(slotInfo.agendamento)
      setShowApprovalModal(true)
    }
  }, [userType, selectedLab])

  // Filtrar agendamentos com useMemo
  const filteredAgendamentos = useMemo(() => {
    return agendamentos.filter((ag) => {
      const matchStatus = filterStatus === "all" || ag.status === filterStatus
      const matchSearch =
        ag.professor_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ag.lab_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ag.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [agendamentos, filterStatus, searchTerm])

  // Renderizar view de grade semanal
  const renderWeeklyGrid = () => (
    <div className="space-y-6">
      {/* Seletor de laboratório */}
      <div className="flex flex-wrap gap-3">
        {labs.map((lab) => (
          <button
            key={lab.id}
            onClick={() => setSelectedLab(lab.id)}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              selectedLab === lab.id
                ? "bg-[#58417d] text-white shadow-lg shadow-purple-500/30"
                : "dark:bg-[#161B22] bg-white border dark:border-[#30363D] border-gray-200 dark:text-gray-300 text-gray-700 hover:border-[#8C43FF]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Monitor size={18} />
              <span>{lab.nome}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Grade de horários */}
      {selectedLab && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dark:bg-[#161B22] bg-white rounded-2xl shadow-lg border dark:border-[#30363D] border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b dark:border-[#30363D] border-gray-200">
            <h3 className="text-xl font-bold dark:text-white text-gray-900">
              {labs.find((l) => l.id === selectedLab)?.nome}
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
              Visualização Semanal • {labs.find((l) => l.id === selectedLab)?.capacidade} lugares
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="dark:bg-[#0D1117] bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold dark:text-white text-gray-900 sticky left-0 dark:bg-[#0D1117] bg-gray-100 z-10">
                    Aula
                  </th>
                  {diasSemana.map((dia) => (
                    <th key={dia} className="p-4 text-center font-semibold dark:text-white text-gray-900 min-w-[180px]">
                      {diasSemanaLabel[dia]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aulas.map((aula) => (
                  <tr key={aula} className="border-t dark:border-[#30363D] border-gray-200">
                    <td className="p-4 font-medium dark:text-white text-gray-900 sticky left-0 dark:bg-[#161B22] bg-white z-10">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="dark:text-gray-400 text-gray-600" />
                        <span>{aula}ª aula</span>
                      </div>
                    </td>
                    {diasSemana.map((dia) => {
                      const slotInfo = getSlotStatus(selectedLab, dia, aula)
                      const canRequest = userType === "teacher" && canTeacherRequest(dia, aula)

                      return (
                        <td key={dia} className="p-2">
                          <button
                            onClick={() => handleSlotClick(dia, aula, slotInfo, canRequest)}
                            disabled={userType === "teacher" && !canRequest}
                            className={`w-full min-h-[80px] p-3 rounded-xl border-2 transition-all ${slotInfo.color} ${
                              userType === "teacher" && !canRequest
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:scale-105 hover:shadow-lg cursor-pointer"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center gap-1 text-center">
                              {slotInfo.status === "livre" && (
                                <>
                                  <CheckCircle size={20} className="text-green-500" />
                                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                    Disponível
                                  </span>
                                  {userType === "teacher" && canRequest && (
                                    <span className="text-xs text-green-600 dark:text-green-400">
                                      Clique para solicitar
                                    </span>
                                  )}
                                </>
                              )}
                              {slotInfo.status === "pendente" && slotInfo.agendamento && (
                                <>
                                  <AlertCircle size={20} className="text-yellow-500" />
                                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                                    Pendente
                                  </span>
                                  <span className="text-xs text-yellow-600 dark:text-yellow-400 truncate max-w-full">
                                    {slotInfo.agendamento.professor_nome}
                                  </span>
                                </>
                              )}
                              {slotInfo.status === "reservado" && slotInfo.agendamento && (
                                <>
                                  <XCircle size={20} className="text-red-500" />
                                  <span className="text-xs font-medium text-red-600 dark:text-red-400">Reservado</span>
                                  <span className="text-xs text-red-600 dark:text-red-400 truncate max-w-full">
                                    {slotInfo.agendamento.professor_nome}
                                  </span>
                                  {slotInfo.agendamento.turma && (
                                    <span className="text-xs text-red-600 dark:text-red-400">
                                      {slotInfo.agendamento.turma}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t dark:border-[#30363D] border-gray-200 bg-gray-100 dark:bg-[#0D1117]">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500/40" />
                <span className="dark:text-gray-300 text-gray-700">Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500/20 border-2 border-yellow-500/40" />
                <span className="dark:text-gray-300 text-gray-700">Pendente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500/20 border-2 border-red-500/40" />
                <span className="dark:text-gray-300 text-gray-700">Reservado</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )

  // Renderizar lista de solicitações (apenas para Etec)
  const renderRequestsList = () => (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar por professor, laboratório ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
        >
          <option value="all">Todos os Status</option>
          <option value="pendente">Pendentes</option>
          <option value="aprovado">Aprovados</option>
          <option value="rejeitado">Rejeitados</option>
        </select>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {filteredAgendamentos.length === 0 ? (
          <div className="text-center py-12 dark:bg-[#161B22] bg-white rounded-2xl border dark:border-[#30363D] border-gray-200">
            <AlertCircle size={48} className="mx-auto mb-4 dark:text-gray-400 text-gray-500 opacity-50" />
            <p className="dark:text-gray-400 text-gray-600">Nenhuma solicitação encontrada</p>
          </div>
        ) : (
          filteredAgendamentos.map((ag) => (
            <motion.div
              key={ag.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dark:bg-[#161B22] bg-white rounded-2xl shadow-lg border dark:border-[#30363D] border-gray-200 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#58417d] rounded-lg">
                      <Monitor size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold dark:text-white text-gray-900">{ag.lab_nome}</h3>
                      <p className="text-sm dark:text-gray-400 text-gray-600">{ag.professor_nome}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Dia</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">
                        {diasSemanaLabel[ag.dia_semana]}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Horário</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">
                        {ag.aula_inicio}ª - {ag.aula_fim}ª aula
                      </p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Tipo</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">
                        {ag.recorrente ? "Recorrente" : "Único"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Turma</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">{ag.turma || "-"}</p>
                    </div>
                  </div>

                  <p className="text-sm dark:text-gray-300 text-gray-700 mb-4">{ag.descricao}</p>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ag.status === "pendente"
                          ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          : ag.status === "aprovado"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {ag.status === "pendente"
                        ? "⏳ Pendente"
                        : ag.status === "aprovado"
                          ? "✓ Aprovado"
                          : "✗ Rejeitado"}
                    </span>
                    <span className="text-xs dark:text-gray-500 text-gray-500">
                      {new Date(ag.criado_em).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                {(userType === "etec" || userType === "admin") && (
                  <div className="flex flex-col gap-2 ml-4">
                    {ag.status === "pendente" && (
                      <>
                        <button
                          onClick={() => handleApprove(ag.id)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="Aprovar"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => handleReject(ag.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          title="Rejeitar"
                        >
                          <X size={20} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setSelectedRequest(ag)
                        setShowApprovalModal(true)
                      }}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      title="Ver detalhes"
                    >
                      <Edit size={20} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen dark:bg-[#0A0A0A] bg-[#f3e8ff] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold dark:bg-[#58417d] bg-[#58417d] bg-clip-text text-transparent mb-2">
                LabNotes
              </h1>
              <p className="dark:text-gray-400 text-gray-600">
                {userType === "teacher"
                  ? "Visualize e solicite agendamentos de laboratórios e auditórios"
                  : "Gerencie todos os agendamentos e solicitações"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {userType === "etec" && (
                <div className="flex gap-0 bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden transition-colors duration-300">
                  <button
                    onClick={() => setSelectedView("grid")}
                    className={`px-6 py-2.5 font-semibold transition-all duration-300 focus:outline-none
                      ${selectedView === "grid"
                        ? "bg-[#58417d] text-white shadow-lg"
                        : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-[var(--muted)]"}
                    `}
                  >
                    Grade
                  </button>
                  <button
                    onClick={() => setSelectedView("list")}
                    className={`px-6 py-2.5 font-semibold transition-all duration-300 focus:outline-none
                      ${selectedView === "list"
                        ? "bg-[#58417d] text-white shadow-lg"
                        : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-[var(--muted)]"}
                    `}
                  >
                    Lista
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards (apenas para Etec e Administrador) */}
        {(userType === "etec" || userType === "admin") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#30363D] border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Monitor size={24} className="text-blue-500" />
                </div>
                <span className="text-2xl font-bold dark:text-white text-gray-900">{labs.length}</span>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-600">Total de Labs</p>
            </div>

            <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#30363D] border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl">
                  <Clock size={24} className="text-yellow-500" />
                </div>
                <span className="text-2xl font-bold dark:text-white text-gray-900">
                  {agendamentos.filter((ag) => ag.status === "pendente").length}
                </span>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-600">Pendentes</p>
            </div>

            <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#30363D] border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <CheckCircle size={24} className="text-green-500" />
                </div>
                <span className="text-2xl font-bold dark:text-white text-gray-900">
                  {agendamentos.filter((ag) => ag.status === "aprovado").length}
                </span>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-600">Aprovados</p>
            </div>

            <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-lg border dark:border-[#30363D] border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Users size={24} className="text-purple-500" />
                </div>
                <span className="text-2xl font-bold dark:text-white text-gray-900">
                  {new Set(agendamentos.map((ag) => ag.professor_id)).size}
                </span>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-600">Professores Ativos</p>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {userType === "teacher" || selectedView === "grid" ? renderWeeklyGrid() : renderRequestsList()}

        {/* Modal de Solicitação (Professor) */}
        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          title="Nova Solicitação de Laboratório"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Laboratório *</label>
                <select
                  value={requestForm.lab_id}
                  onChange={(e) => handleRequestFormChange('lab_id', e.target.value)}
                  className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                >
                  <option value="">Selecione um laboratório</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.nome} ({lab.capacidade} lugares)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Dia da Semana *
                </label>
                <select
                  value={requestForm.dia_semana}
                  onChange={(e) => handleRequestFormChange('dia_semana', e.target.value)}
                  className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                >
                  {diasSemana.map((dia) => (
                    <option key={dia} value={dia}>
                      {diasSemanaLabel[dia]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Aula Início *</label>
                <select
                  value={requestForm.aula_inicio}
                  onChange={(e) => handleRequestFormChange('aula_inicio', e.target.value)}
                  className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  {aulas
                    .filter((aula) => canTeacherRequest(requestForm.dia_semana, aula))
                    .map((aula) => (
                      <option key={aula} value={aula}>
                        {aula}ª aula
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Aula Fim *</label>
                <select
                  value={requestForm.aula_fim}
                  onChange={(e) => handleRequestFormChange('aula_fim', e.target.value)}
                  className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  {aulas
                    .filter(
                      (aula) =>
                        canTeacherRequest(requestForm.dia_semana, aula) &&
                        aula >= Number.parseInt(requestForm.aula_inicio || "0"),
                    )
                    .map((aula) => (
                      <option key={aula} value={aula}>
                        {aula}ª aula
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Turma</label>
              <input
                type="text"
                value={requestForm.turma}
                onChange={(e) => handleRequestFormChange('turma', e.target.value)}
                className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="Ex: 3º DS A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Descrição *</label>
              <textarea
                value={requestForm.descricao}
                onChange={(e) => handleRequestFormChange('descricao', e.target.value)}
                className="w-full px-3 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                rows="4"
                placeholder="Descreva brevemente o motivo do agendamento..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recorrente"
                checked={requestForm.recorrente}
                onChange={(e) => handleRequestFormChange('recorrente', e.target.checked)}
                className="w-5 h-5 text-[#8C43FF] rounded focus:ring-2 focus:ring-[#8C43FF]"
              />
              <label htmlFor="recorrente" className="text-sm dark:text-gray-300 text-gray-700">
                Agendamento recorrente (todas as semanas)
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t dark:border-[#30363D] border-gray-200">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-3 border dark:border-[#30363D] border-gray-300 rounded-xl dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitRequest}
                className="flex-1 px-4 py-3 bg-[#58417d] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
              >
                Enviar Solicitação
              </button>
            </div>
          </div>
        </Modal>

        {/* Modal de Aprovação/Detalhes (Etec) */}
        {selectedRequest && (
          <Modal
            isOpen={showApprovalModal}
            onClose={() => {
              setShowApprovalModal(false)
              setSelectedRequest(null)
            }}
            title="Detalhes da Solicitação"
            size="lg"
          >
            <div className="space-y-6">
              <div className="p-6 dark:bg-[#0D1117] bg-gray-100 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Professor</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">
                      {selectedRequest.professor_nome}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Laboratório</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">{selectedRequest.lab_nome}</p>
                  </div>
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Dia da Semana</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">
                      {diasSemanaLabel[selectedRequest.dia_semana]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Horário</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">
                      {selectedRequest.aula_inicio}ª - {selectedRequest.aula_fim}ª aula
                    </p>
                  </div>
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Tipo</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">
                      {selectedRequest.recorrente ? "Recorrente (Toda semana)" : "Único"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Turma</p>
                    <p className="text-lg font-medium dark:text-white text-gray-900">{selectedRequest.turma || "-"}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t dark:border-[#30363D] border-gray-200">
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">Descrição</p>
                  <p className="dark:text-white text-gray-900">{selectedRequest.descricao}</p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedRequest.status === "pendente"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : selectedRequest.status === "aprovado"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {selectedRequest.status === "pendente"
                      ? "Pendente"
                      : selectedRequest.status === "aprovado"
                        ? "Aprovado"
                        : "Rejeitado"}
                  </span>
                  <span className="text-sm dark:text-gray-500 text-gray-500">
                    Solicitado em {new Date(selectedRequest.criado_em).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              {selectedRequest.status === "pendente" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
                  >
                    <X size={20} />
                    Rejeitar
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-medium"
                  >
                    <Check size={20} />
                    Aprovar
                  </button>
                </div>
              )}

              {selectedRequest.status !== "pendente" && (
                <button
                  onClick={() => handleDelete(selectedRequest.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
                >
                  <X size={20} />
                  Excluir Agendamento
                </button>
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default LabsControlPage
