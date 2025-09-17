"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Search,
  Phone,
  Video,
  Info,
  MoreHorizontal,
  Paperclip,
  Smile,
  Plus,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  Building,
  Archive,
  Star,
  FileText,
  ImageIcon,
  X,
  Users,
  Settings,
  Zap,
} from "lucide-react"

const ChatPage = () => {
  // Estados principais
  const [activeConversation, setActiveConversation] = useState(null)
  const [userType] = useState("student") // student, teacher, secretaria
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [activeTab, setActiveTab] = useState("chat") // chat, files, media
  const [isTyping, setIsTyping] = useState(false)

  // Estados do formulário de ticket
  const [ticketForm, setTicketForm] = useState({
    category: "",
    subcategory: "",
    campus: "",
    course: "",
    priority: "normal",
    description: "",
    attachments: [],
  })

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Mock data baseado no sistema especificado
  const currentUser = {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@etec.sp.gov.br",
    role: userType,
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    course: "Desenvolvimento de Sistemas",
    turma: "3º DS A",
    campus: "Etec Albert Einstein",
    status: "online",
  }

  // Professores vinculados ao aluno (baseado em matrículas e atribuições)
  const availableTeachers = [
    {
      id: 2,
      name: "Prof. João Santos",
      email: "joao.santos@etec.sp.gov.br",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      subject: "Programação Web III",
      status: "online",
      lastSeen: null,
    },
    {
      id: 3,
      name: "Prof. Maria Costa",
      email: "maria.costa@etec.sp.gov.br",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      subject: "Banco de Dados II",
      status: "away",
      lastSeen: "2 min atrás",
    },
    {
      id: 4,
      name: "Prof. Carlos Lima",
      email: "carlos.lima@etec.sp.gov.br",
      avatar: "/placeholder.svg?height=40&width=40&text=CL",
      subject: "Desenvolvimento Mobile",
      status: "offline",
      lastSeen: "1 hora atrás",
    },
  ]

  // Conversas existentes
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: "dm",
      participant: {
        id: 2,
        name: "Prof. João Santos",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        status: "online",
      },
      lastMessage: {
        content: "Boa tarde! Sobre o projeto final, você já escolheu o tema?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        sender: 2,
      },
      unreadCount: 2,
      subject: "Programação Web III",
      messages: [
        {
          id: 1,
          senderId: 2,
          content: "Olá Ana! Tudo bem?",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: "read",
        },
        {
          id: 2,
          senderId: 1,
          content: "Oi professor! Tudo sim, obrigada!",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
          status: "read",
        },
        {
          id: 3,
          senderId: 2,
          content: "Boa tarde! Sobre o projeto final, você já escolheu o tema?",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      type: "ticket",
      participant: {
        id: "secretaria",
        name: "Secretaria Acadêmica",
        avatar: "/placeholder.svg?height=40&width=40&text=SA",
        status: "online",
      },
      lastMessage: {
        content: "Seu protocolo #2024001 foi atualizado para 'Em Análise'",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        sender: "system",
      },
      unreadCount: 0,
      ticketInfo: {
        protocol: "2024001",
        category: "Documentos",
        subcategory: "Atestado de Matrícula",
        status: "em_analise",
        priority: "normal",
        sla: "2 dias úteis",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      messages: [
        {
          id: 1,
          senderId: 1,
          content: "Preciso de um atestado de matrícula para apresentar na empresa onde faço estágio.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: "read",
        },
        {
          id: 2,
          senderId: "secretaria",
          content:
            "Olá Ana! Recebemos sua solicitação. Protocolo #2024001 gerado. O documento ficará pronto em até 2 dias úteis.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
          status: "read",
        },
        {
          id: 3,
          senderId: "system",
          content: "Status alterado para: Em Análise",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: "read",
          isSystem: true,
        },
      ],
    },
  ])

  // Categorias de tickets
  const ticketCategories = [
    {
      id: "matricula",
      name: "Matrícula",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      subcategories: [
        { id: "nova_matricula", name: "Nova Matrícula" },
        { id: "renovacao", name: "Renovação de Matrícula" },
        { id: "trancamento", name: "Trancamento" },
        { id: "transferencia", name: "Transferência" },
      ],
    },
    {
      id: "documentos",
      name: "Documentos",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      subcategories: [
        { id: "atestado_matricula", name: "Atestado de Matrícula" },
        { id: "historico", name: "Histórico Escolar" },
        { id: "declaracao_conclusao", name: "Declaração de Conclusão" },
        { id: "carteirinha", name: "Carteirinha Estudantil" },
      ],
    },
    {
      id: "notas",
      name: "Notas e Avaliações",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      subcategories: [
        { id: "consulta_notas", name: "Consulta de Notas" },
        { id: "revisao_prova", name: "Revisão de Prova" },
        { id: "segunda_chamada", name: "Segunda Chamada" },
      ],
    },
    {
      id: "financeiro",
      name: "Financeiro",
      color: "from-purple-500 to-pink-500",
      icon: Building,
      subcategories: [
        { id: "bolsa_estudos", name: "Bolsa de Estudos" },
        { id: "auxilio_transporte", name: "Auxílio Transporte" },
        { id: "segunda_via_boleto", name: "Segunda Via de Boleto" },
      ],
    },
    {
      id: "ti",
      name: "Tecnologia da Informação",
      icon: Settings,
      color: "from-indigo-500 to-blue-500",
      subcategories: [
        { id: "acesso_portal", name: "Acesso ao Portal" },
        { id: "email_institucional", name: "E-mail Institucional" },
        { id: "wifi", name: "Problemas com Wi-Fi" },
      ],
    },
    {
      id: "outros",
      name: "Outros",
      icon: MoreHorizontal,
      color: "from-gray-500 to-slate-500",
      subcategories: [
        { id: "biblioteca", name: "Biblioteca" },
        { id: "laboratorios", name: "Laboratórios" },
        { id: "eventos", name: "Eventos" },
        { id: "outros_assuntos", name: "Outros Assuntos" },
      ],
    },
  ]

  // Funções utilitárias
  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp

    if (diff < 60 * 1000) return "agora"
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))} min`
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} h`
    return timestamp.toLocaleDateString("pt-BR")
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "online":
        return (
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
        )
      case "away":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50" />
      case "busy":
        return <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  const getTicketStatusColor = (status) => {
    switch (status) {
      case "aberto":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 border border-blue-200/50 shadow-lg shadow-blue-500/10"
      case "em_analise":
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 border border-yellow-200/50 shadow-lg shadow-yellow-500/10"
      case "pendente":
        return "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 border border-orange-200/50 shadow-lg shadow-orange-500/10"
      case "resolvido":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 border border-green-200/50 shadow-lg shadow-green-500/10"
      case "fechado":
        return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-600 border border-gray-200/50 shadow-lg shadow-gray-500/10"
      default:
        return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-600 border border-gray-200/50 shadow-lg shadow-gray-500/10"
    }
  }

  // Handlers
  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      content: message.trim(),
      timestamp: new Date(),
      status: "sent",
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: {
              content: message.trim(),
              timestamp: new Date(),
              sender: currentUser.id,
            },
          }
        }
        return conv
      }),
    )

    setMessage("")

    // Simular resposta automática em alguns casos
    if (activeConversation.type === "dm") {
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          senderId: activeConversation.participant.id,
          content: "Obrigado pela mensagem! Vou analisar e te respondo em breve.",
          timestamp: new Date(),
          status: "sent",
        }

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === activeConversation.id) {
              return {
                ...conv,
                messages: [...conv.messages, response],
                lastMessage: {
                  content: response.content,
                  timestamp: new Date(),
                  sender: response.senderId,
                },
              }
            }
            return conv
          }),
        )
      }, 2000)
    }
  }

  const handleStartNewChat = (teacher) => {
    // Verificar se já existe conversa
    let existingConv = conversations.find((conv) => conv.type === "dm" && conv.participant.id === teacher.id)

    if (!existingConv) {
      existingConv = {
        id: Date.now(),
        type: "dm",
        participant: teacher,
        lastMessage: null,
        unreadCount: 0,
        subject: teacher.subject,
        messages: [],
      }
      setConversations((prev) => [...prev, existingConv])
    }

    setActiveConversation(existingConv)
    setShowNewChatModal(false)
  }

  const handleCreateTicket = () => {
    if (!ticketForm.category || !ticketForm.subcategory || !ticketForm.description.trim()) {
      return
    }

    const protocol = `2024${String(Date.now()).slice(-3)}`
    const newTicket = {
      id: Date.now(),
      type: "ticket",
      participant: {
        id: "secretaria",
        name: "Secretaria Acadêmica",
        avatar: "/placeholder.svg?height=40&width=40&text=SA",
        status: "online",
      },
      lastMessage: {
        content: ticketForm.description,
        timestamp: new Date(),
        sender: currentUser.id,
      },
      unreadCount: 0,
      ticketInfo: {
        protocol,
        category: ticketCategories.find((c) => c.id === ticketForm.category)?.name,
        subcategory: ticketCategories
          .find((c) => c.id === ticketForm.category)
          ?.subcategories.find((s) => s.id === ticketForm.subcategory)?.name,
        status: "aberto",
        priority: ticketForm.priority,
        sla: "2 dias úteis",
        createdAt: new Date(),
      },
      messages: [
        {
          id: Date.now(),
          senderId: currentUser.id,
          content: ticketForm.description,
          timestamp: new Date(),
          status: "sent",
        },
      ],
    }

    setConversations((prev) => [...prev, newTicket])
    setActiveConversation(newTicket)
    setShowTicketModal(false)
    setTicketForm({
      category: "",
      subcategory: "",
      campus: "",
      course: "",
      priority: "normal",
      description: "",
      attachments: [],
    })

    // Simular resposta automática da secretaria
    setTimeout(() => {
      const autoResponse = {
        id: Date.now() + 1,
        senderId: "secretaria",
        content: `Olá ${currentUser.name}! Recebemos sua solicitação. Protocolo #${protocol} gerado. Analisaremos seu pedido e retornaremos em breve.`,
        timestamp: new Date(),
        status: "sent",
      }

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === newTicket.id) {
            return {
              ...conv,
              messages: [...conv.messages, autoResponse],
              lastMessage: {
                content: autoResponse.content,
                timestamp: new Date(),
                sender: "secretaria",
              },
            }
          }
          return conv
        }),
      )
    }, 1500)
  }

  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages])

  // Modal para nova conversa
  const NewChatModal = () => (
    <AnimatePresence>
      {showNewChatModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={() => setShowNewChatModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Nova Conversa
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Selecione um professor para conversar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {availableTeachers.map((teacher, index) => (
                  <motion.button
                    key={teacher.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleStartNewChat(teacher)}
                    className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-lg">
                        <img
                          src={teacher.avatar || "/placeholder.svg"}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-lg">
                        {getStatusIcon(teacher.status)}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {teacher.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{teacher.subject}</p>
                      {teacher.lastSeen && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Visto por último: {teacher.lastSeen}
                        </p>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <MessageCircle size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setShowTicketModal(true)}
                className="w-full group flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
              >
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <Building size={16} />
                </div>
                <span className="font-semibold">Contatar Secretaria</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap size={16} />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Modal para criação de ticket
  const TicketModal = () => (
    <AnimatePresence>
      {showTicketModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={() => setShowTicketModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Building size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Atendimento Secretaria
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Preencha os dados para abrir um chamado</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-2xl transition-all duration-300 hover:scale-110"
                >
                  <X size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* Categoria */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categoria *</label>
                <div className="grid grid-cols-2 gap-3">
                  {ticketCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setTicketForm((prev) => ({ ...prev, category: category.id, subcategory: "" }))}
                        className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                          ticketForm.category === category.id
                            ? `bg-gradient-to-br ${category.color} border-transparent shadow-lg text-white`
                            : "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              ticketForm.category === category.id
                                ? "bg-white/20"
                                : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"
                            }`}
                          >
                            <IconComponent
                              size={20}
                              className={
                                ticketForm.category === category.id ? "text-white" : "text-gray-600 dark:text-gray-400"
                              }
                            />
                          </div>
                          <span className="font-medium text-sm">{category.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Subcategoria */}
              {ticketForm.category && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Subcategoria *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {ticketCategories
                      .find((c) => c.id === ticketForm.category)
                      ?.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setTicketForm((prev) => ({ ...prev, subcategory: sub.id }))}
                          className={`p-3 rounded-xl text-left transition-all duration-300 hover:scale-[1.01] ${
                            ticketForm.subcategory === sub.id
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                              : "bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <span className="font-medium">{sub.name}</span>
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Prioridade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Prioridade</label>
                <div className="flex gap-4">
                  {[
                    { value: "normal", label: "Normal", color: "from-blue-500 to-cyan-500", icon: Clock },
                    { value: "urgente", label: "Urgente", color: "from-red-500 to-pink-500", icon: Zap },
                  ].map((priority) => {
                    const IconComponent = priority.icon
                    return (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => setTicketForm((prev) => ({ ...prev, priority: priority.value }))}
                        className={`flex-1 group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                          ticketForm.priority === priority.value
                            ? `bg-gradient-to-br ${priority.color} border-transparent shadow-lg text-white`
                            : "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              ticketForm.priority === priority.value
                                ? "bg-white/20"
                                : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"
                            }`}
                          >
                            <IconComponent
                              size={16}
                              className={
                                ticketForm.priority === priority.value
                                  ? "text-white"
                                  : "text-gray-600 dark:text-gray-400"
                              }
                            />
                          </div>
                          <span className="font-semibold">{priority.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Descrição do problema *
                </label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Descreva detalhadamente sua solicitação ou problema..."
                />
              </div>

              {/* Informações do usuário (readonly) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Campus</label>
                  <input
                    type="text"
                    value={currentUser.campus}
                    readOnly
                    className="w-full px-4 py-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Curso/Turma
                  </label>
                  <input
                    type="text"
                    value={`${currentUser.course} - ${currentUser.turma}`}
                    readOnly
                    className="w-full px-4 py-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-[1.02]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateTicket}
                  disabled={!ticketForm.category || !ticketForm.subcategory || !ticketForm.description.trim()}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                >
                  Abrir Chamado
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar de conversas */}
      <div className="w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col shadow-xl">
        {/* Header da sidebar */}
        <div className="p-6 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Chat
              </h1>
            </div>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-110"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Barra de pesquisa */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <Search
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
              <input
                type="text"
                placeholder="Pesquisar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lista de conversas */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                Recentes
              </h2>
            </div>

            <div className="space-y-2">
              {conversations
                .filter(
                  (conv) =>
                    !searchQuery ||
                    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (conv.type === "ticket" && conv.ticketInfo.protocol.includes(searchQuery)),
                )
                .map((conversation, index) => (
                  <motion.button
                    key={conversation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveConversation(conversation)}
                    className={`w-full group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left hover:scale-[1.02] ${
                      activeConversation?.id === conversation.id
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-l-4 border-purple-500 shadow-lg shadow-purple-500/10"
                        : "bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/5"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-lg">
                        <img
                          src={conversation.participant.avatar || "/placeholder.svg"}
                          alt={conversation.participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conversation.type === "dm" && (
                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-lg">
                          {getStatusIcon(conversation.participant.status)}
                        </div>
                      )}
                      {conversation.type === "ticket" && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
                          <FileText size={12} className="text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {conversation.participant.name}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>

                      {/* Contexto adicional */}
                      {conversation.type === "dm" && conversation.subject && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-lg inline-block">
                          {conversation.subject}
                        </p>
                      )}

                      {conversation.type === "ticket" && (
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-lg font-medium ${getTicketStatusColor(conversation.ticketInfo.status)}`}
                          >
                            #{conversation.ticketInfo.protocol}
                          </span>
                        </div>
                      )}

                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>

                    {conversation.unreadCount > 0 && (
                      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25">
                        <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                      </div>
                    )}
                  </motion.button>
                ))}
            </div>
          </div>
        </div>

        {/* Footer da sidebar */}
        <div className="p-4 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 border-t border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={() => setShowNewChatModal(true)}
            className="w-full group flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
          >
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <span className="font-semibold">Nova Conversa</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* Área principal do chat */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Header da conversa */}
            <div className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-8 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-lg">
                    <img
                      src={activeConversation.participant.avatar || "/placeholder.svg"}
                      alt={activeConversation.participant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeConversation.type === "dm" && (
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-lg">
                      {getStatusIcon(activeConversation.participant.status)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {activeConversation.participant.name}
                  </h2>
                  {activeConversation.type === "dm" && activeConversation.subject && (
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                      {activeConversation.subject}
                    </p>
                  )}
                  {activeConversation.type === "ticket" && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-lg font-medium ${getTicketStatusColor(activeConversation.ticketInfo.status)}`}
                      >
                        #{activeConversation.ticketInfo.protocol} -{" "}
                        {activeConversation.ticketInfo.status.replace("_", " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Abas */}
              <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                {["chat", "files", "media"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {tab === "chat" ? "Chat" : tab === "files" ? "Arquivos" : "Mídia"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {activeConversation.type === "dm" && (
                  <>
                    <button className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-green-500/10">
                      <Phone size={20} />
                    </button>
                    <button className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-blue-500/10">
                      <Video size={20} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg ${
                    showContactInfo
                      ? "bg-purple-500/20 text-purple-600 shadow-purple-500/10"
                      : "bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-purple-500/10 hover:text-purple-600 shadow-gray-500/10"
                  }`}
                >
                  <Info size={20} />
                </button>
                <button className="p-3 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-gray-500/10">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-1">
              {/* Área de mensagens */}
              <div className="flex-1 flex flex-col">
                {activeTab === "chat" && (
                  <>
                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50">
                      {activeConversation.messages?.length > 0 ? (
                        activeConversation.messages.map((msg, index) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex ${msg.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-xs lg:max-w-md ${msg.isSystem ? "w-full" : ""}`}>
                              {msg.isSystem ? (
                                <div className="text-center">
                                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 rounded-2xl text-sm font-medium border border-blue-200/50 shadow-lg shadow-blue-500/10">
                                    <AlertCircle size={16} />
                                    {msg.content}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div
                                    className={`rounded-3xl px-6 py-4 shadow-lg backdrop-blur-xl ${
                                      msg.senderId === currentUser.id
                                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/25"
                                        : "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/50 shadow-gray-500/10"
                                    }`}
                                  >
                                    <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                                  </div>
                                  <div
                                    className={`flex items-center gap-2 mt-2 ${
                                      msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                                    }`}
                                  >
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                      {msg.timestamp.toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                    {msg.senderId === currentUser.id && (
                                      <div className="text-xs">
                                        {msg.status === "sent" && <CheckCircle size={14} className="text-gray-400" />}
                                        {msg.status === "delivered" && (
                                          <CheckCircle size={14} className="text-blue-500" />
                                        )}
                                        {msg.status === "read" && <CheckCircle size={14} className="text-green-500" />}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-16">
                          <div className="w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                            <MessageCircle size={48} className="text-purple-500" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {activeConversation.type === "dm" ? "Iniciando conversa" : "Chamado criado"}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md leading-relaxed">
                            {activeConversation.type === "dm"
                              ? "Digite a primeira mensagem para iniciar a conversa com seu professor."
                              : "Seu chamado foi criado com sucesso. Nossa equipe responderá em breve."}
                          </p>
                        </div>
                      )}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="max-w-xs lg:max-w-md">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                  Digitando...
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input de mensagem */}
                    <div className="p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-end gap-4">
                        <button className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg">
                          <Paperclip size={20} />
                        </button>

                        <div className="flex-1 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl blur-xl" />
                          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault()
                                  handleSendMessage()
                                }
                              }}
                              placeholder="Digite uma mensagem..."
                              className="w-full px-6 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none"
                              rows={1}
                              style={{
                                minHeight: "56px",
                                maxHeight: "140px",
                                height: message
                                  ? `${Math.min(140, 56 + (message.split("\n").length - 1) * 24)}px`
                                  : "56px",
                              }}
                            />
                          </div>
                        </div>

                        <button className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg">
                          <Smile size={20} />
                        </button>

                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                        >
                          <Send size={20} />
                        </button>
                      </div>

                      {/* Indicadores de status */}
                      <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-6">
                          {activeConversation.type === "dm" && (
                            <span className="flex items-center gap-2 font-medium">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                              Pressione Enter para enviar, Shift+Enter para nova linha
                            </span>
                          )}
                        </div>

                        {activeConversation.type === "ticket" && activeConversation.ticketInfo && (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1 rounded-xl border border-blue-200/50">
                            <Clock size={14} className="text-blue-600" />
                            <span className="font-medium text-blue-600">SLA: {activeConversation.ticketInfo.sla}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Aba de Arquivos */}
                {activeTab === "files" && (
                  <div className="flex-1 p-8 bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50">
                    <div className="text-center py-16">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FileText size={48} className="text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Nenhum arquivo compartilhado
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Arquivos enviados nesta conversa aparecerão aqui
                      </p>
                    </div>
                  </div>
                )}

                {/* Aba de Mídia */}
                {activeTab === "media" && (
                  <div className="flex-1 p-8 bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50">
                    <div className="text-center py-16">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <ImageIcon size={48} className="text-pink-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Nenhuma mídia compartilhada
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Fotos e vídeos enviados nesta conversa aparecerão aqui
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Painel de informações (lateral direito) */}
              {showContactInfo && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 p-8 overflow-y-auto shadow-xl"
                >
                  <div className="space-y-8">
                    {/* Perfil do contato */}
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-xl">
                          <img
                            src={activeConversation.participant.avatar || "/placeholder.svg"}
                            alt={activeConversation.participant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {activeConversation.type === "dm" && (
                          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
                            {getStatusIcon(activeConversation.participant.status)}
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {activeConversation.participant.name}
                      </h3>

                      {activeConversation.type === "dm" && activeConversation.subject && (
                        <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-xl inline-block">
                          {activeConversation.subject}
                        </p>
                      )}

                      {activeConversation.type === "ticket" && (
                        <div className="space-y-3">
                          <span
                            className={`inline-block px-4 py-2 rounded-2xl text-sm font-semibold ${getTicketStatusColor(activeConversation.ticketInfo.status)}`}
                          >
                            #{activeConversation.ticketInfo.protocol}
                          </span>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                            <p>
                              <span className="font-semibold">Categoria:</span> {activeConversation.ticketInfo.category}
                            </p>
                            <p>
                              <span className="font-semibold">Subcategoria:</span>{" "}
                              {activeConversation.ticketInfo.subcategory}
                            </p>
                            <p>
                              <span className="font-semibold">Prioridade:</span>{" "}
                              {activeConversation.ticketInfo.priority}
                            </p>
                            <p>
                              <span className="font-semibold">Criado:</span>{" "}
                              {activeConversation.ticketInfo.createdAt.toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-2 mt-4">
                        {activeConversation.type === "dm" && getStatusIcon(activeConversation.participant.status)}
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium capitalize">
                          {activeConversation.participant.status}
                        </span>
                      </div>
                    </div>

                    {/* Ações rápidas */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                        Ações Rápidas
                      </h4>

                      {activeConversation.type === "dm" && (
                        <>
                          <button className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:scale-[1.02] text-left">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                              <Phone size={20} className="text-white" />
                            </div>
                            <span className="font-semibold text-green-700 dark:text-green-400">Iniciar chamada</span>
                          </button>
                          <button className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 border border-blue-200/50 dark:border-blue-700/50 transition-all duration-300 hover:scale-[1.02] text-left">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                              <Video size={20} className="text-white" />
                            </div>
                            <span className="font-semibold text-blue-700 dark:text-blue-400">Videochamada</span>
                          </button>
                        </>
                      )}

                      <button className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-[1.02] text-left">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-500/25">
                          <Archive size={20} className="text-white" />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Arquivar conversa</span>
                      </button>

                      <button className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 border border-yellow-200/50 dark:border-yellow-700/50 transition-all duration-300 hover:scale-[1.02] text-left">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                          <Star size={20} className="text-white" />
                        </div>
                        <span className="font-semibold text-yellow-700 dark:text-yellow-400">Marcar como favorito</span>
                      </button>
                    </div>

                    {/* Arquivos compartilhados */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                        Arquivos Recentes
                      </h4>
                      <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <FileText size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum arquivo compartilhado</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          /* Estado vazio - nenhuma conversa selecionada */
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50">
            <div className="w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
              <MessageCircle size={64} className="text-purple-500" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Bem-vindo ao Chat EtecNotes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 leading-relaxed text-lg">
              Selecione uma conversa à esquerda ou inicie uma nova conversa com seus professores ou com a secretaria.
            </p>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.05] font-semibold text-lg"
            >
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <Plus size={18} />
              </div>
              Iniciar Nova Conversa
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={18} />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Modais */}
      <NewChatModal />
      <TicketModal />
    </div>
  )
}

export default ChatPage
