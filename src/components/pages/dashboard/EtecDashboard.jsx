"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"

const EtecDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")

  // Dados mockados da ETEC
  const etecInfo = {
    name: "Etec Albert Einstein",
    location: "São Paulo, SP",
    totalClasses: 24,
    totalTeachers: 45,
    totalStudents: 680,
    director: "Prof. Maria Silva",
  }

  const classesData = [
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
  ]

  const teachersData = [
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
  ]

  const studentsData = [
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
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Reunião Pedagógica",
      date: "2025-01-20",
      time: "14:00",
      type: "meeting",
    },
    {
      id: 2,
      title: "Semana Tecnológica",
      date: "2025-01-25",
      time: "08:00",
      type: "event",
    },
    {
      id: 3,
      title: "Avaliação Institucional",
      date: "2025-02-01",
      time: "09:00",
      type: "evaluation",
    },
  ]

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
          value={etecInfo.totalClasses}
          subtitle="Turmas ativas"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend="+2"
        />
        <StatCard
          icon={Users}
          title="Professores"
          value={etecInfo.totalTeachers}
          subtitle="Docentes ativos"
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend="+3"
        />
        <StatCard
          icon={GraduationCap}
          title="Alunos"
          value={etecInfo.totalStudents}
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
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors">
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
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors text-sm">
                <UserPlus size={16} />
                Atribuir Alunos
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors text-sm">
                <Upload size={16} />
                Upload Horário
              </button>
              {classItem.hasSchedule && (
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors text-sm">
                  <Eye size={16} />
                </button>
              )}
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
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors">
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
                      <button className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Eye size={16} />
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
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors">
          <Plus size={18} />
          Adicionar Aluno
        </button>
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
              {studentsData.map((student) => (
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
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm dark:text-gray-400 text-gray-600">{student.email}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Eye size={16} />
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
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-xl transition-colors">
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
                    <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
                      <Clock size={14} />
                      <span>
                        {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <button className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
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
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="dark:bg-[#161B22] bg-white border-t dark:border-[#30363D] border-gray-200 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="dark:text-gray-400 text-gray-600">© 2025 EtecNotes - Sistema de Gestão Educacional</p>
        </div>
      </footer>
    </div>
  )
}

export default EtecDashboard
