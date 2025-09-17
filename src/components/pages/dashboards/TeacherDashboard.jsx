"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  BookOpen,
  Calendar,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  CalendarDays,
  Home,
  X,
  Trash2,
  Bell,
  GraduationCap,
} from "lucide-react"

const TeacherDashboard = ({ teacherData }) => {
  const [activeSection, setActiveSection] = useState("home")
  const [expandedClass, setExpandedClass] = useState(null)
  const [selectedClassCalendar, setSelectedClassCalendar] = useState(null)
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Estados para eventos
  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("teacher-events")
      return savedEvents ? JSON.parse(savedEvents) : {}
    }
    return {}
  })

  // Form state para novo evento
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "aula",
    classId: null,
  })

  // Dados mockados do professor
  const [teacherInfo] = useState({
    name: "Prof. João Santos",
    email: "joao.santos@etec.sp.gov.br",
    avatar: "/placeholder.svg?height=80&width=80&text=JS",
    subjects: ["Programação Web", "Banco de Dados", "Desenvolvimento Mobile"],
  })

  // Classes do professor
  const [teacherClasses] = useState([
    {
      id: 1,
      name: "3º DS A",
      subject: "Programação Web III",
      course: "Desenvolvimento de Sistemas",
      students: 28,
      schedule: "Seg/Qua 08:00-09:40",
      room: "Lab 01",
      students_list: [
        { id: 1, name: "Ana Silva", avatar: "/placeholder.svg?height=40&width=40&text=AS", rm: "12345" },
        { id: 2, name: "Bruno Costa", avatar: "/placeholder.svg?height=40&width=40&text=BC", rm: "12346" },
        { id: 3, name: "Carla Oliveira", avatar: "/placeholder.svg?height=40&width=40&text=CO", rm: "12347" },
        { id: 4, name: "Daniel Santos", avatar: "/placeholder.svg?height=40&width=40&text=DS", rm: "12348" },
        { id: 5, name: "Elena Rodrigues", avatar: "/placeholder.svg?height=40&width=40&text=ER", rm: "12349" },
        { id: 6, name: "Felipe Lima", avatar: "/placeholder.svg?height=40&width=40&text=FL", rm: "12350" },
        { id: 7, name: "Gabriela Ferreira", avatar: "/placeholder.svg?height=40&width=40&text=GF", rm: "12351" },
        { id: 8, name: "Hugo Almeida", avatar: "/placeholder.svg?height=40&width=40&text=HA", rm: "12352" },
      ],
    },
    {
      id: 2,
      name: "2º DS B",
      subject: "Banco de Dados II",
      course: "Desenvolvimento de Sistemas",
      students: 32,
      schedule: "Ter/Qui 10:00-11:40",
      room: "Lab 02",
      students_list: [
        { id: 9, name: "Igor Pereira", avatar: "/placeholder.svg?height=40&width=40&text=IP", rm: "12353" },
        { id: 10, name: "Julia Martins", avatar: "/placeholder.svg?height=40&width=40&text=JM", rm: "12354" },
        { id: 11, name: "Kevin Souza", avatar: "/placeholder.svg?height=40&width=40&text=KS", rm: "12355" },
        { id: 12, name: "Larissa Gomes", avatar: "/placeholder.svg?height=40&width=40&text=LG", rm: "12356" },
        { id: 13, name: "Marcos Ribeiro", avatar: "/placeholder.svg?height=40&width=40&text=MR", rm: "12357" },
        { id: 14, name: "Natália Castro", avatar: "/placeholder.svg?height=40&width=40&text=NC", rm: "12358" },
      ],
    },
    {
      id: 3,
      name: "1º DS A",
      subject: "Programação Web I",
      course: "Desenvolvimento de Sistemas",
      students: 35,
      schedule: "Sex 13:30-16:00",
      room: "Lab 03",
      students_list: [
        { id: 15, name: "Otávio Dias", avatar: "/placeholder.svg?height=40&width=40&text=OD", rm: "12359" },
        { id: 16, name: "Patrícia Lopes", avatar: "/placeholder.svg?height=40&width=40&text=PL", rm: "12360" },
        { id: 17, name: "Rafael Torres", avatar: "/placeholder.svg?height=40&width=40&text=RT", rm: "12361" },
        { id: 18, name: "Sofia Mendes", avatar: "/placeholder.svg?height=40&width=40&text=SM", rm: "12362" },
      ],
    },
  ])

  // Salvar eventos no localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("teacher-events", JSON.stringify(events))
    }
  }, [events])

  // Função para adicionar evento
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && selectedClassCalendar) {
      const eventId = Date.now()
      const classId = selectedClassCalendar.id

      setEvents((prev) => ({
        ...prev,
        [classId]: [
          ...(prev[classId] || []),
          {
            id: eventId,
            ...newEvent,
            classId,
            createdBy: teacherInfo.name,
            createdAt: new Date().toISOString(),
          },
        ],
      }))

      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "aula",
        classId: null,
      })
      setShowAddEventModal(false)
    }
  }

  // Função para deletar evento
  const handleDeleteEvent = (classId, eventId) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      setEvents((prev) => ({
        ...prev,
        [classId]: prev[classId]?.filter((event) => event.id !== eventId) || [],
      }))
    }
  }

  // Função para obter eventos de uma classe
  const getClassEvents = (classId) => {
    return events[classId] || []
  }

  // Função para obter eventos do mês atual
  const getCurrentMonthEvents = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const allEvents = []

    Object.values(events).forEach((classEvents) => {
      classEvents.forEach((event) => {
        const eventDate = new Date(event.date)
        if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
          allEvents.push(event)
        }
      })
    })

    return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full ${sizeClasses[size]} dark:bg-[#161B22] bg-white rounded-2xl shadow-xl border dark:border-[#30363D] border-gray-200 max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b dark:border-[#30363D] border-gray-200">
              <h2 className="text-xl font-semibold dark:text-white text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#21262D] rounded-lg transition-colors"
              >
                <X size={20} className="dark:text-gray-400 text-gray-600" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Modal para adicionar evento
  const AddEventModal = () => (
    <Modal
      isOpen={showAddEventModal}
      onClose={() => setShowAddEventModal(false)}
      title={`Adicionar Evento - ${selectedClassCalendar?.name}`}
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Título do Evento</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Ex: Prova de JavaScript, Apresentação de Projeto..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Data</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Horário</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Tipo de Evento</label>
          <input
            type="text"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Ex: Prova, Trabalho, Apresentação, Seminário..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            Descrição (Opcional)
          </label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            rows="3"
            placeholder="Detalhes adicionais sobre o evento..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddEventModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddEvent}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Evento
          </button>
        </div>
      </div>
    </Modal>
  )

  // Renderizar Home do Professor
  const renderHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={teacherInfo.avatar || "/placeholder.svg"}
            alt={teacherInfo.name}
            className="w-16 h-16 rounded-full border-2 border-[#8C43FF]"
          />
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">Bem-vindo, {teacherInfo.name}!</h1>
            <p className="dark:text-gray-400 text-gray-600">{teacherInfo.email}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white text-gray-900">{teacherClasses.length}</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Turmas</p>
              </div>
            </div>
          </div>

          <div className="p-4 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white text-gray-900">
                  {teacherClasses.reduce((total, cls) => total + cls.students, 0)}
                </p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Alunos</p>
              </div>
            </div>
          </div>

          <div className="p-4 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white text-gray-900">{getCurrentMonthEvents().length}</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Eventos este mês</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Próximos Eventos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
      >
        <div className="flex items-center gap-2 mb-6">
          <Bell size={20} className="text-[#8C43FF]" />
          <h2 className="text-xl font-semibold dark:text-white text-gray-900">Próximos Eventos</h2>
        </div>

        <div className="space-y-3">
          {getCurrentMonthEvents()
            .slice(0, 5)
            .map((event) => {
              const eventClass = teacherClasses.find((cls) => cls.id === event.classId)
              return (
                <div key={event.id} className="flex items-center gap-4 p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
                  <div className="p-2 bg-[#8C43FF]/10 rounded-lg">
                    <Calendar size={16} className="text-[#8C43FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium dark:text-white text-gray-900">{event.title}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">
                      {eventClass?.name} • {new Date(event.date).toLocaleDateString("pt-BR")}
                      {event.time && ` às ${event.time}`}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                    {event.type}
                  </span>
                </div>
              )
            })}

          {getCurrentMonthEvents().length === 0 && (
            <div className="text-center py-8 dark:text-gray-500 text-gray-400">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum evento programado para este mês</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Minhas Disciplinas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
      >
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap size={20} className="text-[#8C43FF]" />
          <h2 className="text-xl font-semibold dark:text-white text-gray-900">Minhas Disciplinas</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {teacherInfo.subjects.map((subject, index) => (
            <span key={index} className="px-3 py-2 bg-[#8C43FF]/10 text-[#8C43FF] rounded-full text-sm font-medium">
              {subject}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )

  // Renderizar Minhas Salas
  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Minhas Salas</h2>
        <span className="text-sm dark:text-gray-400 text-gray-600">{teacherClasses.length} turmas</span>
      </div>

      <div className="space-y-4">
        {teacherClasses.map((classItem) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 overflow-hidden"
          >
            {/* Header da Classe */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0D1117] transition-colors"
              onClick={() => setExpandedClass(expandedClass === classItem.id ? null : classItem.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#8C43FF]/10 rounded-xl">
                    <BookOpen size={24} className="text-[#8C43FF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white text-gray-900">{classItem.name}</h3>
                    <p className="dark:text-gray-400 text-gray-600">{classItem.subject}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm dark:text-gray-500 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{classItem.students} alunos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{classItem.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedClassCalendar(classItem)
                      setActiveSection("calendar")
                    }}
                    className="px-3 py-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    Ver Calendário
                  </button>
                  {expandedClass === classItem.id ? (
                    <ChevronUp size={20} className="dark:text-gray-400 text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="dark:text-gray-400 text-gray-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Lista de Alunos (Expandida) */}
            <AnimatePresence>
              {expandedClass === classItem.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t dark:border-[#30363D] border-gray-200"
                >
                  <div className="p-6">
                    <h4 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
                      Lista de Alunos ({classItem.students_list.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {classItem.students_list.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-3 p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl"
                        >
                          <img
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                            className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-[#30363D]"
                          />
                          <div>
                            <p className="font-medium dark:text-white text-gray-900">{student.name}</p>
                            <p className="text-sm dark:text-gray-400 text-gray-600">RM: {student.rm}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Renderizar Calendário
  const renderCalendar = () => {
    const currentClass = selectedClassCalendar || teacherClasses[0]
    const classEvents = getClassEvents(currentClass.id)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold dark:text-white text-gray-900">Calendário</h2>
            <p className="dark:text-gray-400 text-gray-600">
              {currentClass.name} - {currentClass.subject}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={currentClass.id}
              onChange={(e) => {
                const selectedClass = teacherClasses.find((cls) => cls.id === Number.parseInt(e.target.value))
                setSelectedClassCalendar(selectedClass)
              }}
              className="px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            >
              {teacherClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.subject}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSelectedClassCalendar(currentClass)
                setShowAddEventModal(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              Adicionar Evento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário Simples */}
          <div className="lg:col-span-2 dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">Janeiro 2025</h3>
              <div className="flex gap-2">
                <button className="p-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
                  ←
                </button>
                <button className="p-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="text-center p-2 text-sm font-medium dark:text-gray-400 text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5 + 1
                const isCurrentMonth = day > 0 && day <= 31
                const hasEvent = classEvents.some((event) => {
                  const eventDate = new Date(event.date)
                  return eventDate.getDate() === day
                })

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${
                      isCurrentMonth
                        ? hasEvent
                          ? "bg-[#8C43FF] text-white"
                          : "dark:text-white text-gray-900 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                        : "dark:text-gray-600 text-gray-400"
                    }`}
                  >
                    {isCurrentMonth ? day : ""}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6">Eventos da Turma</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {classEvents.length > 0 ? (
                classEvents.map((event) => (
                  <div key={event.id} className="p-3 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarDays size={16} className="text-[#8C43FF]" />
                          <h4 className="font-medium dark:text-white text-gray-900">{event.title}</h4>
                        </div>
                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">
                          {new Date(event.date).toLocaleDateString("pt-BR")}
                          {event.time && ` às ${event.time}`}
                        </p>
                        {event.description && (
                          <p className="text-sm dark:text-gray-300 text-gray-700">{event.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                            {event.type}
                          </span>
                          <span className="text-xs dark:text-gray-500 text-gray-500">por {event.createdBy}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(currentClass.id, event.id)}
                        className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 dark:text-gray-500 text-gray-400">
                  <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhum evento cadastrado</p>
                  <button
                    onClick={() => {
                      setSelectedClassCalendar(currentClass)
                      setShowAddEventModal(true)
                    }}
                    className="mt-3 text-[#8C43FF] hover:underline text-sm"
                  >
                    Adicionar primeiro evento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark:bg-[#0A0A0A] bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 dark:bg-[#161B22] bg-white border-r dark:border-[#30363D] border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#8C43FF] rounded-xl">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold dark:text-white text-gray-900">Professor</h1>
                <p className="text-sm dark:text-gray-400 text-gray-600">Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("home")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "home"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>

              <button
                onClick={() => setActiveSection("classes")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "classes"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <BookOpen size={20} />
                <span>Minhas Salas</span>
              </button>

              <button
                onClick={() => setActiveSection("calendar")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === "calendar"
                    ? "bg-[#8C43FF] text-white"
                    : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                }`}
              >
                <Calendar size={20} />
                <span>Calendário</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "home" && renderHome()}
            {activeSection === "classes" && renderClasses()}
            {activeSection === "calendar" && renderCalendar()}
          </motion.div>
        </div>
      </div>

      {/* Modal para adicionar evento */}
      <AddEventModal />
    </div>
  )
}

export default TeacherDashboard
