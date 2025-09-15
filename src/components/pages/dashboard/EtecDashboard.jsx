"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Plus,
  Upload,
  Eye,
  Edit,
  UserPlus,
  BarChart3,
  Clock,
  MapPin,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Activity,
  School,
  ChevronRight,
  Settings,
  X,
  Trash2,
  Download,
  Search,
  Newspaper,
  FileText,
} from "lucide-react"

const EtecDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")

  // Modal states
  const [showAddClassModal, setShowAddClassModal] = useState(false)
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false)
  const [showAddStudentModal, setShowAddStudentModal] = useState(false)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [showAssignStudentsModal, setShowAssignStudentsModal] = useState(false)
  const [showUploadScheduleModal, setShowUploadScheduleModal] = useState(false)
  const [showViewScheduleModal, setShowViewScheduleModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddNewsModal, setShowAddNewsModal] = useState(false)
  const [showEditNewsModal, setShowEditNewsModal] = useState(false)
  const [showAddPatchNoteModal, setShowAddPatchNoteModal] = useState(false)
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false)

  // Selected items for modals
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Form states
  const [newClass, setNewClass] = useState({
    name: "",
    course: "",
    year: "",
    teacher: "",
  })

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: [],
    classes: [],
  })

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    rm: "",
    class: "",
    status: "Ativo",
  })

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting",
    description: "",
    location: "",
    image: "",
    shortDescription: "",
  })

  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    image: "",
    category: "geral",
  })

  const [newPatchNote, setNewPatchNote] = useState({
    title: "",
    description: "",
    version: "",
    image: "",
  })

  // Content Management Data
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: "Feira Tecnológica",
      image: "/placeholder.svg?height=200&width=300&text=Feira+Tecnológica",
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais.",
      location: "Auditório Principal",
    },
    {
      id: 2,
      title: "Semana Tecnológica",
      image: "/placeholder.svg?height=200&width=300&text=Semana+Tecnológica",
      shortDescription: "Uma semana dedicada à tecnologia e inovação",
      date: "2025-10-20",
      time: "08:00",
      fullDescription: "Evento anual que reúne palestras, workshops e demonstrações tecnológicas.",
      location: "Campus Principal",
    },
  ])

  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "Semana Tecnológica",
      content:
        "O Jornal Etec é um periódico voltado para a divulgação de notícias, eventos e atividades da Etec (Escola Técnica Estadual). Seu objetivo é manter alunos, professores e a comunidade escolar atualizados sobre o que acontece dentro da instituição, além de abordar temas relevantes para o ambiente educacional.",
      image: "/placeholder.svg?height=320&width=400&text=Semana+Tecnológica",
      category: "eventos",
      date: new Date().toISOString(),
    },
  ])

  const [patchNotesData, setPatchNotesData] = useState([
    {
      id: 1,
      title: "Novo estilo de personalização (Modo escuro)",
      description: "Implementação do modo escuro para melhor experiência do usuário",
      version: "2.1.0",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Novas interfaces: Página de Cadastro e Login; Calculadora; Jornal Etec",
      description: "Adição de novas funcionalidades e interfaces",
      version: "2.0.0",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Redesign das Interfaces anteriores",
      description: "Melhoria visual e de usabilidade das interfaces existentes",
      version: "1.9.0",
      date: new Date().toISOString(),
    },
  ])

  const [scheduleData, setScheduleData] = useState([
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Aula Vaga", isVacant: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Sistemas Embarcados", teacher: "Prof. Iury" },
        { time: "10:50 - 11:40", subject: "Sistemas Embarcados", teacher: "Prof. Iury" },
        { time: "11:40 - 12:30", subject: "Sociologia", teacher: "Prof. Elza" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "EAMT", teacher: "Prof. Elza" },
        { time: "14:20 - 15:10", subject: "EAMT", teacher: "Prof. Elza" },
        { time: "15:10 - 16:00", subject: "EAMT", teacher: "Prof. Elza" },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "08:00 - 08:50", subject: "P.W. I, II, III", teacher: "Prof. Paulo e William G." },
        { time: "08:50 - 09:40", subject: "Programação Web I, II e III", teacher: "Prof. Paulo e William G." },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "E.A.C.N.T.", teacher: "Prof. Elza e Prof. Andreia" },
        { time: "10:50 - 11:40", subject: "E.A.C.N.T.", teacher: "Prof. Elza e Prof. Andreia" },
        { time: "11:40 - 12:30", subject: "Matematica", teacher: "Prof. Santos" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "08:00 - 08:50", subject: "P.A.M. I, II", teacher: "Prof. Paulo" },
        { time: "08:50 - 09:40", subject: "P.A.M. I, II", teacher: "Prof. Paulo" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "IPSSI", teacher: "Prof. Iury e Prof. Vanessa" },
        { time: "10:50 - 11:40", subject: "IPSSI", teacher: "Prof. Iury e Prof. Vanessa" },
        { time: "11:40 - 12:30", subject: "Filosofia", teacher: "Prof. Silva" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Biologia", teacher: "Prof. Andreia" },
        { time: "14:20 - 15:10", subject: "Biologia", teacher: "Prof. Andreia" },
        { time: "15:10 - 16:00", subject: "E.A.C.N.T.", teacher: "Prof. Andreia e Prof. Elza" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "08:00 - 08:50", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "08:50 - 09:40", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "10:50 - 11:40", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "11:40 - 12:30", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Sexta",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Filosofia", teacher: "Prof. Elza" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert" },
        { time: "10:50 - 11:40", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert" },
        { time: "11:40 - 12:30", subject: "Aula Vaga", isVacant: true },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "15:10 - 16:00", subject: "Sociologia", teacher: "Prof. Elza" },
      ],
    },
  ])

  // Existing data states
  const [classesData, setClassesData] = useState([
    {
      id: 1,
      name: "1º DS A",
      course: "Desenvolvimento de Sistemas",
      year: "1º Ano",
      students: 35,
      teacher: "Prof. João Santos",
      hasSchedule: true,
    },
    {
      id: 2,
      name: "2º DS A",
      course: "Desenvolvimento de Sistemas",
      year: "2º Ano",
      students: 32,
      teacher: "Prof. Ana Costa",
      hasSchedule: true,
    },
    {
      id: 3,
      name: "3º DS A",
      course: "Desenvolvimento de Sistemas",
      year: "3º Ano",
      students: 28,
      teacher: "Prof. Carlos Lima",
      hasSchedule: false,
    },
    {
      id: 4,
      name: "1º ADM A",
      course: "Administração",
      year: "1º Ano",
      students: 40,
      teacher: "Prof. Lucia Pereira",
      hasSchedule: true,
    },
  ])

  const [teachersData, setTeachersData] = useState([
    {
      id: 1,
      name: "Prof. João Santos",
      subjects: ["Programação", "Banco de Dados"],
      classes: ["1º DS A", "2º DS B"],
      email: "joao.santos@etec.sp.gov.br",
      phone: "(11) 99999-1111",
    },
    {
      id: 2,
      name: "Prof. Ana Costa",
      subjects: ["Matemática", "Física"],
      classes: ["2º DS A", "3º DS A"],
      email: "ana.costa@etec.sp.gov.br",
      phone: "(11) 99999-2222",
    },
    {
      id: 3,
      name: "Prof. Carlos Lima",
      subjects: ["Português", "Literatura"],
      classes: ["3º DS A", "1º ADM A"],
      email: "carlos.lima@etec.sp.gov.br",
      phone: "(11) 99999-3333",
    },
  ])

  const [studentsData, setStudentsData] = useState([
    {
      id: 1,
      name: "Maria Oliveira",
      class: "1º DS A",
      rm: "12345",
      status: "Ativo",
      email: "maria.oliveira@etec.sp.gov.br",
    },
    {
      id: 2,
      name: "Pedro Silva",
      class: "2º DS A",
      rm: "12346",
      status: "Ativo",
      email: "pedro.silva@etec.sp.gov.br",
    },
    {
      id: 3,
      name: "Ana Santos",
      class: "3º DS A",
      rm: "12347",
      status: "Ativo",
      email: "ana.santos@etec.sp.gov.br",
    },
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Reunião Pedagógica",
      date: "2025-01-20",
      time: "14:00",
      type: "meeting",
      description: "Reunião mensal com todos os professores",
    },
    {
      id: 2,
      title: "Semana Tecnológica",
      date: "2025-01-25",
      time: "08:00",
      type: "event",
      description: "Evento anual de tecnologia e inovação",
    },
    {
      id: 3,
      title: "Avaliação Institucional",
      date: "2025-02-01",
      time: "09:00",
      type: "evaluation",
      description: "Avaliação semestral da instituição",
    },
  ])

  // Dados mockados da ETEC
  const etecInfo = {
    name: "Etec Albert Einstein",
    location: "São Paulo, SP",
    totalClasses: 24,
    totalTeachers: 45,
    totalStudents: 680,
    director: "Prof. Maria Silva",
  }

  // Utility functions
  const generateId = () => Math.floor(Math.random() * 10000)

  const resetForms = () => {
    setNewClass({ name: "", course: "", year: "", teacher: "" })
    setNewTeacher({ name: "", email: "", phone: "", subjects: [], classes: [] })
    setNewStudent({ name: "", email: "", rm: "", class: "", status: "Ativo" })
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "meeting",
      description: "",
      location: "",
      image: "",
      shortDescription: "",
    })
    setNewNews({ title: "", content: "", image: "", category: "geral" })
    setNewPatchNote({ title: "", description: "", version: "", image: "" })
  }

  // Content Management Functions
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const eventToAdd = {
        id: generateId(),
        ...newEvent,
        fullDescription: newEvent.description,
      }
      setEventsData([...eventsData, eventToAdd])
      setShowCreateEventModal(false)
      resetForms()
    }
  }

  const handleAddNews = () => {
    if (newNews.title && newNews.content) {
      const newsToAdd = {
        id: generateId(),
        ...newNews,
        date: new Date().toISOString(),
      }
      setNewsData([...newsData, newsToAdd])
      setShowAddNewsModal(false)
      resetForms()
    }
  }

  const handleEditNews = () => {
    if (selectedNews && newNews.title && newNews.content) {
      setNewsData(
        newsData.map((news) =>
          news.id === selectedNews.id ? { ...newNews, id: selectedNews.id, date: selectedNews.date } : news,
        ),
      )
      setShowEditNewsModal(false)
      setSelectedNews(null)
      resetForms()
    }
  }

  const handleAddPatchNote = () => {
    if (newPatchNote.title && newPatchNote.description) {
      const patchNoteToAdd = {
        id: generateId(),
        ...newPatchNote,
        date: new Date().toISOString(),
      }
      setPatchNotesData([...patchNotesData, patchNoteToAdd])
      setShowAddPatchNoteModal(false)
      resetForms()
    }
  }

  // CRUD Functions (existing ones)
  const handleAddClass = () => {
    if (newClass.name && newClass.course && newClass.year) {
      const classToAdd = {
        id: generateId(),
        ...newClass,
        students: 0,
        hasSchedule: false,
      }
      setClassesData([...classesData, classToAdd])
      setShowAddClassModal(false)
      resetForms()
    }
  }

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email) {
      const teacherToAdd = {
        id: generateId(),
        ...newTeacher,
      }
      setTeachersData([...teachersData, teacherToAdd])
      setShowAddTeacherModal(false)
      resetForms()
    }
  }

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.rm) {
      const studentToAdd = {
        id: generateId(),
        ...newStudent,
      }
      setStudentsData([...studentsData, studentToAdd])
      setShowAddStudentModal(false)
      resetForms()
    }
  }

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const eventToAdd = {
        id: generateId(),
        ...newEvent,
      }
      setUpcomingEvents([...upcomingEvents, eventToAdd])
      setShowCreateEventModal(false)
      resetForms()
    }
  }

  const handleDeleteItem = (type, id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      switch (type) {
        case "class":
          setClassesData(classesData.filter((item) => item.id !== id))
          break
        case "teacher":
          setTeachersData(teachersData.filter((item) => item.id !== id))
          break
        case "student":
          setStudentsData(studentsData.filter((item) => item.id !== id))
          break
        case "event":
          setUpcomingEvents(upcomingEvents.filter((item) => item.id !== id))
          break
        case "news":
          setNewsData(newsData.filter((item) => item.id !== id))
          break
        case "patchnote":
          setPatchNotesData(patchNotesData.filter((item) => item.id !== id))
          break
        case "studentevent":
          setEventsData(eventsData.filter((item) => item.id !== id))
          break
      }
    }
  }

  const handleAssignStudents = (classItem) => {
    setSelectedClass(classItem)
    setShowAssignStudentsModal(true)
  }

  const handleUploadSchedule = (classItem) => {
    setSelectedClass(classItem)
    setShowUploadScheduleModal(true)
  }

  const handleViewSchedule = (classItem) => {
    setSelectedClass(classItem)
    setShowViewScheduleModal(true)
  }

  const handleEditItem = (type, item) => {
    switch (type) {
      case "teacher":
        setSelectedTeacher(item)
        setNewTeacher(item)
        break
      case "student":
        setSelectedStudent(item)
        setNewStudent(item)
        break
      case "news":
        setSelectedNews(item)
        setNewNews(item)
        setShowEditNewsModal(true)
        return
      case "event":
        setSelectedEvent(item)
        setNewEvent(item)
        setShowCreateEventModal(true)
        return
    }
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (selectedTeacher) {
      setTeachersData(
        teachersData.map((teacher) =>
          teacher.id === selectedTeacher.id ? { ...newTeacher, id: selectedTeacher.id } : teacher,
        ),
      )
    }
    if (selectedStudent) {
      setStudentsData(
        studentsData.map((student) =>
          student.id === selectedStudent.id ? { ...newStudent, id: selectedStudent.id } : student,
        ),
      )
    }
    setShowEditModal(false)
    setSelectedTeacher(null)
    setSelectedStudent(null)
    resetForms()
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

  // Content Management Modals
  const AddEventModal = () => (
    <Modal
      isOpen={showCreateEventModal}
      onClose={() => setShowCreateEventModal(false)}
      title={selectedEvent ? "Editar Evento" : "Criar Evento"}
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
            placeholder="Nome do evento"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Descrição Curta</label>
          <input
            type="text"
            value={newEvent.shortDescription}
            onChange={(e) => setNewEvent({ ...newEvent, shortDescription: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Descrição breve para o card"
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
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Local</label>
          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Local do evento"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">URL da Imagem</label>
          <input
            type="url"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Descrição Completa</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            rows="4"
            placeholder="Descrição detalhada do evento..."
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => {
              setShowCreateEventModal(false)
              setSelectedEvent(null)
              resetForms()
            }}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={
              selectedEvent
                ? () => {
                    setEventsData(
                      eventsData.map((event) =>
                        event.id === selectedEvent.id
                          ? { ...newEvent, id: selectedEvent.id, fullDescription: newEvent.description }
                          : event,
                      ),
                    )
                    setShowCreateEventModal(false)
                    setSelectedEvent(null)
                    resetForms()
                  }
                : handleAddEvent
            }
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            {selectedEvent ? "Salvar Alterações" : "Criar Evento"}
          </button>
        </div>
      </div>
    </Modal>
  )

  const AddNewsModal = () => (
    <Modal
      isOpen={showAddNewsModal}
      onClose={() => setShowAddNewsModal(false)}
      title="Adicionar Conteúdo do Jornal"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Título da notícia"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Categoria</label>
          <select
            value={newNews.category}
            onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="geral">Geral</option>
            <option value="eventos">Eventos</option>
            <option value="academico">Acadêmico</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">URL da Imagem</label>
          <input
            type="url"
            value={newNews.image}
            onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Conteúdo</label>
          <textarea
            value={newNews.content}
            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            rows="6"
            placeholder="Conteúdo da notícia..."
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddNewsModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddNews}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Conteúdo
          </button>
        </div>
      </div>
    </Modal>
  )

  const EditNewsModal = () => (
    <Modal
      isOpen={showEditNewsModal}
      onClose={() => setShowEditNewsModal(false)}
      title="Editar Conteúdo do Jornal"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Título da notícia"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Categoria</label>
          <select
            value={newNews.category}
            onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="geral">Geral</option>
            <option value="eventos">Eventos</option>
            <option value="academico">Acadêmico</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">URL da Imagem</label>
          <input
            type="url"
            value={newNews.image}
            onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Conteúdo</label>
          <textarea
            value={newNews.content}
            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            rows="6"
            placeholder="Conteúdo da notícia..."
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => {
              setShowEditNewsModal(false)
              setSelectedNews(null)
              resetForms()
            }}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleEditNews}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  )

  const AddPatchNoteModal = () => (
    <Modal
      isOpen={showAddPatchNoteModal}
      onClose={() => setShowAddPatchNoteModal(false)}
      title="Adicionar Atualização"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            Título da Atualização
          </label>
          <input
            type="text"
            value={newPatchNote.title}
            onChange={(e) => setNewPatchNote({ ...newPatchNote, title: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Ex: Nova funcionalidade de chat"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Versão</label>
          <input
            type="text"
            value={newPatchNote.version}
            onChange={(e) => setNewPatchNote({ ...newPatchNote, version: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Ex: 2.1.0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            URL da Imagem (Opcional)
          </label>
          <input
            type="url"
            value={newPatchNote.image}
            onChange={(e) => setNewPatchNote({ ...newPatchNote, image: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Descrição</label>
          <textarea
            value={newPatchNote.description}
            onChange={(e) => setNewPatchNote({ ...newPatchNote, description: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            rows="4"
            placeholder="Descrição detalhada da atualização..."
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddPatchNoteModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddPatchNote}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Atualização
          </button>
        </div>
      </div>
    </Modal>
  )

  const EditScheduleModal = () => (
    <Modal
      isOpen={showEditScheduleModal}
      onClose={() => setShowEditScheduleModal(false)}
      title="Editar Horários"
      size="xl"
    >
      <div className="space-y-6">
        <div className="text-sm dark:text-gray-400 text-gray-600 mb-4">
          Edite os horários de cada dia da semana. Deixe em branco para aulas vagas.
        </div>

        {scheduleData.map((day, dayIndex) => (
          <div key={dayIndex} className="border dark:border-[#30363D] border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">{day.day}</h3>
            <div className="space-y-3">
              {day.periods.map((period, periodIndex) => (
                <div key={periodIndex} className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-400 text-gray-600 mb-1">Horário</label>
                    <input
                      type="text"
                      value={period.time}
                      onChange={(e) => {
                        const newSchedule = [...scheduleData]
                        newSchedule[dayIndex].periods[periodIndex].time = e.target.value
                        setScheduleData(newSchedule)
                      }}
                      className="w-full px-2 py-1 text-sm border dark:border-[#30363D] border-gray-300 rounded dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-1 focus:ring-[#8C43FF] focus:border-transparent"
                      placeholder="08:00 - 08:50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-400 text-gray-600 mb-1">Matéria</label>
                    <input
                      type="text"
                      value={period.isBreak ? period.subject : period.isVacant ? "" : period.subject}
                      onChange={(e) => {
                        const newSchedule = [...scheduleData]
                        const value = e.target.value
                        if (value === "") {
                          newSchedule[dayIndex].periods[periodIndex] = {
                            ...period,
                            subject: "Aula Vaga",
                            isVacant: true,
                            isBreak: false,
                            teacher: undefined,
                          }
                        } else if (
                          value.toLowerCase().includes("intervalo") ||
                          value.toLowerCase().includes("almoço")
                        ) {
                          newSchedule[dayIndex].periods[periodIndex] = {
                            ...period,
                            subject: value,
                            isBreak: true,
                            isVacant: false,
                            teacher: undefined,
                          }
                        } else {
                          newSchedule[dayIndex].periods[periodIndex] = {
                            ...period,
                            subject: value,
                            isBreak: false,
                            isVacant: false,
                          }
                        }
                        setScheduleData(newSchedule)
                      }}
                      className="w-full px-2 py-1 text-sm border dark:border-[#30363D] border-gray-300 rounded dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-1 focus:ring-[#8C43FF] focus:border-transparent"
                      placeholder="Matemática"
                      disabled={period.isBreak}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-400 text-gray-600 mb-1">Professor</label>
                    <input
                      type="text"
                      value={period.teacher || ""}
                      onChange={(e) => {
                        const newSchedule = [...scheduleData]
                        newSchedule[dayIndex].periods[periodIndex].teacher = e.target.value
                        setScheduleData(newSchedule)
                      }}
                      className="w-full px-2 py-1 text-sm border dark:border-[#30363D] border-gray-300 rounded dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-1 focus:ring-[#8C43FF] focus:border-transparent"
                      placeholder="Prof. Silva"
                      disabled={period.isBreak || period.isVacant}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4 border-t dark:border-[#30363D] border-gray-200">
          <button
            onClick={() => setShowEditScheduleModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setShowEditScheduleModal(false)
              // Here you would typically save to a backend
            }}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Salvar Horários
          </button>
        </div>
      </div>
    </Modal>
  )

  // Existing modals (keeping the same structure)
  const AddClassModal = () => (
    <Modal isOpen={showAddClassModal} onClose={() => setShowAddClassModal(false)} title="Adicionar Nova Classe">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome da Classe</label>
          <input
            type="text"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Ex: 1º DS A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Curso</label>
          <select
            value={newClass.course}
            onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="">Selecione o curso</option>
            <option value="Desenvolvimento de Sistemas">Desenvolvimento de Sistemas</option>
            <option value="Administração">Administração</option>
            <option value="Logística">Logística</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Ano</label>
          <select
            value={newClass.year}
            onChange={(e) => setNewClass({ ...newClass, year: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="">Selecione o ano</option>
            <option value="1º Ano">1º Ano</option>
            <option value="2º Ano">2º Ano</option>
            <option value="3º Ano">3º Ano</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            Professor Responsável
          </label>
          <select
            value={newClass.teacher}
            onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="">Selecione o professor</option>
            {teachersData.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddClassModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddClass}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Classe
          </button>
        </div>
      </div>
    </Modal>
  )

  const AddTeacherModal = () => (
    <Modal isOpen={showAddTeacherModal} onClose={() => setShowAddTeacherModal(false)} title="Adicionar Professor">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome Completo</label>
          <input
            type="text"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Prof. João Silva"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="professor@etec.sp.gov.br"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Telefone</label>
          <input
            type="tel"
            value={newTeacher.phone}
            onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            Disciplinas (separadas por vírgula)
          </label>
          <input
            type="text"
            value={newTeacher.subjects.join(", ")}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subjects: e.target.value.split(", ").filter((s) => s.trim()) })
            }
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Matemática, Física, Química"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddTeacherModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddTeacher}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Professor
          </button>
        </div>
      </div>
    </Modal>
  )

  const AddStudentModal = () => (
    <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} title="Adicionar Aluno">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome Completo</label>
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="Maria Silva"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="aluno@etec.sp.gov.br"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            RM (Registro do Aluno)
          </label>
          <input
            type="text"
            value={newStudent.rm}
            onChange={(e) => setNewStudent({ ...newStudent, rm: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            placeholder="12345"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Classe</label>
          <select
            value={newStudent.class}
            onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="">Selecione a classe</option>
            {classesData.map((classItem) => (
              <option key={classItem.id} value={classItem.name}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowAddStudentModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddStudent}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Adicionar Aluno
          </button>
        </div>
      </div>
    </Modal>
  )

  const AssignStudentsModal = () => (
    <Modal
      isOpen={showAssignStudentsModal}
      onClose={() => setShowAssignStudentsModal(false)}
      title={`Atribuir Alunos - ${selectedClass?.name}`}
      size="lg"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar alunos..."
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors">
            <Plus size={18} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {studentsData
              .filter((student) => student.class !== selectedClass?.name)
              .map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 dark:bg-[#0D1117] bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-[#8C43FF] rounded" />
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white text-gray-900">{student.name}</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">RM: {student.rm}</p>
                    </div>
                  </div>
                  <span className="text-sm dark:text-gray-400 text-gray-600">{student.class || "Sem classe"}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t dark:border-[#30363D] border-gray-200">
          <button
            onClick={() => setShowAssignStudentsModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              // Logic to assign selected students
              setShowAssignStudentsModal(false)
            }}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Atribuir Selecionados
          </button>
        </div>
      </div>
    </Modal>
  )

  const UploadScheduleModal = () => (
    <Modal
      isOpen={showUploadScheduleModal}
      onClose={() => setShowUploadScheduleModal(false)}
      title={`Upload Horário - ${selectedClass?.name}`}
    >
      <div className="space-y-4">
        <div className="border-2 border-dashed dark:border-[#30363D] border-gray-300 rounded-lg p-8 text-center">
          <Upload size={48} className="mx-auto dark:text-gray-400 text-gray-500 mb-4" />
          <p className="dark:text-gray-300 text-gray-700 mb-2">
            Arraste e solte o arquivo aqui ou clique para selecionar
          </p>
          <p className="text-sm dark:text-gray-400 text-gray-600">Formatos aceitos: PDF, XLSX, CSV</p>
          <input type="file" accept=".pdf,.xlsx,.csv" className="hidden" id="schedule-upload" />
          <label
            htmlFor="schedule-upload"
            className="inline-block mt-4 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg cursor-pointer transition-colors"
          >
            Selecionar Arquivo
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowUploadScheduleModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              // Logic to upload schedule
              const updatedClasses = classesData.map((c) =>
                c.id === selectedClass.id ? { ...c, hasSchedule: true } : c,
              )
              setClassesData(updatedClasses)
              setShowUploadScheduleModal(false)
            }}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Fazer Upload
          </button>
        </div>
      </div>
    </Modal>
  )

  const ViewScheduleModal = () => (
    <Modal
      isOpen={showViewScheduleModal}
      onClose={() => setShowViewScheduleModal(false)}
      title={`Horário - ${selectedClass?.name}`}
      size="xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">{selectedClass?.name}</h3>
            <p className="dark:text-gray-400 text-gray-600">{selectedClass?.course}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
              <Download size={16} />
              Baixar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
              <Edit size={16} />
              Editar
            </button>
          </div>
        </div>

        {/* Mock Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full border dark:border-[#30363D] border-gray-200 rounded-lg">
            <thead className="dark:bg-[#0D1117] bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Horário</th>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Segunda</th>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Terça</th>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Quarta</th>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Quinta</th>
                <th className="p-3 text-left font-semibold dark:text-white text-gray-900">Sexta</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "07:30 - 08:20", subjects: ["Matemática", "Português", "Física", "Química", "História"] },
                { time: "08:20 - 09:10", subjects: ["Programação", "BD", "Redes", "Sistemas", "Projeto"] },
                { time: "09:30 - 10:20", subjects: ["Inglês", "Ed. Física", "Artes", "Filosofia", "Sociologia"] },
                { time: "10:20 - 11:10", subjects: ["Matemática", "Português", "Física", "Química", "História"] },
              ].map((period, index) => (
                <tr key={index} className="border-t dark:border-[#30363D] border-gray-200">
                  <td className="p-3 font-medium dark:text-white text-gray-900">{period.time}</td>
                  {period.subjects.map((subject, i) => (
                    <td key={i} className="p-3 dark:text-gray-300 text-gray-700">
                      {subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )

  const SettingsModal = () => (
    <Modal
      isOpen={showSettingsModal}
      onClose={() => setShowSettingsModal(false)}
      title="Configurações da ETEC"
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Informações Gerais</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome da ETEC</label>
              <input
                type="text"
                defaultValue={etecInfo.name}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Localização</label>
              <input
                type="text"
                defaultValue={etecInfo.location}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Diretor</label>
              <input
                type="text"
                defaultValue={etecInfo.director}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Configurações do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 dark:bg-[#0D1117] bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium dark:text-white text-gray-900">Notificações por Email</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Enviar notificações para professores e alunos
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C43FF] rounded" />
            </div>
            <div className="flex items-center justify-between p-4 dark:bg-[#0D1117] bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium dark:text-white text-gray-900">Backup Automático</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Fazer backup dos dados diariamente</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C43FF] rounded" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t dark:border-[#30363D] border-gray-200">
          <button
            onClick={() => setShowSettingsModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => setShowSettingsModal(false)}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </Modal>
  )

  const EditModal = () => (
    <Modal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      title={selectedTeacher ? "Editar Professor" : "Editar Aluno"}
    >
      <div className="space-y-4">
        {selectedTeacher ? (
          <>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Status</label>
              <select
                value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Transferido">Transferido</option>
              </select>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowEditModal(false)}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveEdit}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  )

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold dark:text-white text-gray-900 mb-1">{value}</p>
        <p className="text-lg font-medium dark:text-gray-300 text-gray-700 mb-1">{title}</p>
        {subtitle && <p className="text-sm dark:text-gray-400 text-gray-600">{subtitle}</p>}
      </div>
    </motion.div>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Classes"
          value={classesData.length}
          subtitle="Turmas ativas"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend="+2"
        />
        <StatCard
          icon={Users}
          title="Professores"
          value={teachersData.length}
          subtitle="Docentes ativos"
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend="+3"
        />
        <StatCard
          icon={GraduationCap}
          title="Alunos"
          value={studentsData.length}
          subtitle="Estudantes matriculados"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          trend="+15"
        />
        <StatCard
          icon={Award}
          title="Taxa de Aprovação"
          value="94%"
          subtitle="Último semestre"
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend="+2%"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students by Class Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Alunos por Classe</h3>
          </div>
          <div className="space-y-4">
            {classesData.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium dark:text-white text-gray-900">{classItem.name}</p>
                  <p className="text-sm dark:text-gray-400 text-gray-600">{classItem.course}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-[#21262D] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8C43FF] rounded-full"
                      style={{ width: `${(classItem.students / 40) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium dark:text-white text-gray-900 w-8">{classItem.students}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Atividade Recente</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <UserPlus size={16} className="text-green-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Novo aluno matriculado</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">João Silva - 1º DS A</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">2 horas atrás</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Upload size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Horário atualizado</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">2º DS A - Horário de aulas</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">1 dia atrás</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar size={16} className="text-purple-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Evento criado</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Semana Tecnológica 2025</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">2 dias atrás</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Classes</h2>
        <button
          onClick={() => setShowAddClassModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
        >
          <Plus size={18} />
          Adicionar Nova Classe
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classesData.map((classItem) => (
          <motion.div
            key={classItem.id}
            whileHover={{ scale: 1.02 }}
            className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-1">{classItem.name}</h3>
                <p className="dark:text-gray-400 text-gray-600">{classItem.course}</p>
                <p className="text-sm dark:text-gray-500 text-gray-500">{classItem.year}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#8C43FF]">{classItem.students}</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">alunos</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Professor Responsável</p>
              <p className="font-medium dark:text-white text-gray-900">{classItem.teacher}</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  classItem.hasSchedule ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                }`}
              >
                {classItem.hasSchedule ? "Horário Cadastrado" : "Sem Horário"}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAssignStudents(classItem)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors text-sm"
              >
                <UserPlus size={16} />
                Atribuir Alunos
              </button>
              <button
                onClick={() => handleUploadSchedule(classItem)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors text-sm"
              >
                <Upload size={16} />
                Upload Horário
              </button>
              {classItem.hasSchedule && (
                <button
                  onClick={() => handleViewSchedule(classItem)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors text-sm"
                >
                  <Eye size={16} />
                </button>
              )}
              <button
                onClick={() => handleDeleteItem("class", classItem.id)}
                className="flex items-center justify-center gap-2 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Professores</h2>
        <button
          onClick={() => setShowAddTeacherModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
        >
          <Plus size={18} />
          Adicionar Professor
        </button>
      </div>

      <div className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="dark:bg-[#0D1117] bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Professor</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Disciplinas</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Classes</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Contato</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher) => (
                <tr key={teacher.id} className="border-t dark:border-[#30363D] border-gray-200">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8C43FF] rounded-full flex items-center justify-center text-white font-semibold">
                        {teacher.name.split(" ")[1]?.charAt(0) || teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium dark:text-white text-gray-900">{teacher.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((className, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium"
                        >
                          {className}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
                        <Mail size={14} />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
                        <Phone size={14} />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditItem("teacher", teacher)}
                        className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("teacher", teacher.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Alunos</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search size={18} className="dark:text-gray-400 text-gray-600" />
            <input
              type="text"
              placeholder="Buscar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-lg dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
          >
            <Plus size={18} />
            Adicionar Aluno
          </button>
        </div>
      </div>

      <div className="dark:bg-[#161B22] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="dark:bg-[#0D1117] bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Aluno</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">RM</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Classe</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Email</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {studentsData
                .filter(
                  (student) =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.rm.includes(searchTerm) ||
                    student.class.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((student) => (
                  <tr key={student.id} className="border-t dark:border-[#30363D] border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white text-gray-900">{student.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm dark:text-gray-300 text-gray-700">{student.rm}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-[#8C43FF]/10 text-[#8C43FF] rounded-full text-sm font-medium">
                        {student.class}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          student.status === "Ativo"
                            ? "bg-green-500/10 text-green-500"
                            : student.status === "Inativo"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm dark:text-gray-400 text-gray-600">{student.email}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem("student", student)}
                          className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("student", student.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Agenda Escolar</h2>
        <button
          onClick={() => setShowCreateEventModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
        >
          <Plus size={18} />
          Criar Evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Janeiro 2025</h3>
            <div className="flex gap-2">
              <button className="p-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
                <ChevronRight size={16} className="rotate-180 dark:text-white text-gray-800" />
              </button>
              <button className="p-2 dark:bg-[#21262D] bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
                <ChevronRight size={16} className="dark:text-white text-gray-800" />
              </button>
            </div>
          </div>

          {/* Simple Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center p-2 text-sm font-medium dark:text-gray-400 text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 5 + 1
              const isCurrentMonth = day > 0 && day <= 31
              const hasEvent = [15, 20, 25].includes(day)

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

        {/* Upcoming Events */}
        <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6">Próximos Eventos</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 dark:bg-[#0D1117] bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#8C43FF]/10 rounded-lg">
                    <Calendar size={16} className="text-[#8C43FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium dark:text-white text-gray-900 mb-1">{event.title}</p>
                    <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600 mb-2">
                      <Clock size={14} />
                      <span>
                        {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                      </span>
                    </div>
                    <p className="text-sm dark:text-gray-400 text-gray-600">{event.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem("event", event.id)}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Conteúdo</h2>
      </div>

      {/* Events Management */}
      <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Eventos dos Alunos</h3>
          </div>
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
          >
            <Plus size={18} />
            Adicionar Evento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData.map((event) => (
            <div key={event.id} className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-4">
              <div className="flex gap-4">
                <img
                  src={event.image || "/placeholder.svg?height=80&width=120&text=Evento"}
                  alt={event.title}
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold dark:text-white text-gray-900 mb-1">{event.title}</h4>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">{event.shortDescription}</p>
                  <div className="text-xs dark:text-gray-500 text-gray-500">
                    {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditItem("event", event)}
                    className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem("studentevent", event.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Management */}
      <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Newspaper size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Jornal ETEC</h3>
          </div>
          <button
            onClick={() => setShowAddNewsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
          >
            <Plus size={18} />
            Adicionar Conteúdo
          </button>
        </div>

        <div className="space-y-4">
          {newsData.map((news) => (
            <div key={news.id} className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-4">
              <div className="flex gap-4">
                <img
                  src={news.image || "/placeholder.svg?height=80&width=120&text=Notícia"}
                  alt={news.title}
                  className="w-24 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold dark:text-white text-gray-900">{news.title}</h4>
                    <span className="px-2 py-1 bg-[#8C43FF]/10 text-[#8C43FF] rounded-full text-xs font-medium">
                      {news.category}
                    </span>
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2 line-clamp-2">{news.content}</p>
                  <div className="text-xs dark:text-gray-500 text-gray-500">
                    {new Date(news.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditItem("news", news)}
                    className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem("news", news.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patch Notes Management */}
      <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Atualizações do Sistema</h3>
          </div>
          <button
            onClick={() => setShowAddPatchNoteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
          >
            <Plus size={18} />
            Adicionar Atualização
          </button>
        </div>

        <div className="space-y-4">
          {patchNotesData.map((patchNote) => (
            <div key={patchNote.id} className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8C43FF] mr-2 text-xl">•</span>
                    <h4 className="font-semibold dark:text-white text-gray-900">{patchNote.title}</h4>
                    {patchNote.version && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                        v{patchNote.version}
                      </span>
                    )}
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">{patchNote.description}</p>
                  <div className="text-xs dark:text-gray-500 text-gray-500">
                    {new Date(patchNote.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNewPatchNote(patchNote)
                      setShowAddPatchNoteModal(true)
                    }}
                    className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem("patchnote", patchNote.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Management */}
      <div className="dark:bg-[#161B22] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-[#8C43FF]" />
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">Horários das Aulas</h3>
          </div>
          <button
            onClick={() => setShowEditScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors"
          >
            <Edit size={18} />
            Editar Horários
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduleData.map((day, index) => (
            <div key={index} className="dark:bg-[#0D1117] bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold dark:text-white text-gray-900 mb-3">{day.day}</h4>
              <div className="space-y-2">
                {day.periods.slice(0, 3).map((period, periodIndex) => (
                  <div key={periodIndex} className="text-sm">
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium ${
                          period.isBreak
                            ? "text-[#8C43FF]"
                            : period.isVacant
                              ? "text-yellow-600"
                              : "dark:text-white text-gray-900"
                        }`}
                      >
                        {period.subject}
                      </span>
                      <span className="text-xs dark:text-gray-400 text-gray-600">{period.time}</span>
                    </div>
                    {period.teacher && <div className="text-xs dark:text-gray-500 text-gray-500">{period.teacher}</div>}
                  </div>
                ))}
                {day.periods.length > 3 && (
                  <div className="text-xs dark:text-gray-400 text-gray-600 text-center pt-2">
                    +{day.periods.length - 3} mais aulas
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const sections = [
    { id: "overview", name: "Visão Geral", icon: BarChart3 },
    { id: "classes", name: "Classes", icon: BookOpen },
    { id: "teachers", name: "Professores", icon: Users },
    { id: "students", name: "Alunos", icon: GraduationCap },
    { id: "calendar", name: "Agenda", icon: Calendar },
    { id: "content", name: "Conteúdo", icon: Newspaper },
  ]

  return (
    <div className="min-h-screen dark:bg-[#0A0A0A] bg-gray-50">
      {/* Header with ETEC Info */}
      <div className="dark:bg-[#161B22] bg-white border-b dark:border-[#30363D] border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#8C43FF] rounded-xl">
              <School size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold dark:text-white text-gray-900">{etecInfo.name}</h1>
              <div className="flex items-center gap-4 text-sm dark:text-gray-400 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{etecInfo.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>Diretor: {etecInfo.director}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors"
          >
            <Settings size={18} />
            Configurações
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 dark:bg-[#161B22] bg-white rounded-2xl border dark:border-[#30363D] border-gray-200">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeSection === section.id
                  ? "bg-[#8C43FF] text-white shadow-lg"
                  : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
              }`}
            >
              <section.icon size={18} />
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === "overview" && renderOverview()}
          {activeSection === "classes" && renderClasses()}
          {activeSection === "teachers" && renderTeachers()}
          {activeSection === "students" && renderStudents()}
          {activeSection === "calendar" && renderCalendar()}
          {activeSection === "content" && renderContentManagement()}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="dark:bg-[#161B22] bg-white border-t dark:border-[#30363D] border-gray-200 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="dark:text-gray-400 text-gray-600">© 2025 EtecNotes - Sistema de Gestão Educacional</p>
        </div>
      </footer>

      {/* All Modals */}
      <AddClassModal />
      <AddTeacherModal />
      <AddStudentModal />
      <AddEventModal />
      <AddNewsModal />
      <EditNewsModal />
      <AddPatchNoteModal />
      <EditScheduleModal />
      <AssignStudentsModal />
      <UploadScheduleModal />
      <ViewScheduleModal />
      <SettingsModal />
      <EditModal />
    </div>
  )
}

export default EtecDashboard
