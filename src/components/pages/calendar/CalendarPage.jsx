"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, Edit, Trash2, Bell, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "../../../hooks/useAuth"
import AddEventModal from "./AddEventModal"
import AddNoteModal from "./AddNoteModal"
import SchedulePage from "./SchedulePage"

const CalendarPage = ({ activeTab, onTabChange }) => {
  const { user, isProfessor, isAluno } = useAuth()
  
  // Estado para controle das abas internas do calendário
  const [activeCalendarTab, setActiveCalendarTab] = useState("Calendário")
  
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [events, setEvents] = useState(() => {
    // Carregar eventos do localStorage
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("etecnotes-events")
      return savedEvents ? JSON.parse(savedEvents) : []
    }
    return []
  })

  // Modais
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)

  // Salvar eventos no localStorage quando mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("etecnotes-events", JSON.stringify(events))
    }
  }, [events])

  // Função para obter os dias do mês atual
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const days = []

    // Dias do mês anterior para preencher o início do calendário
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = new Date(year, month, 0 - (firstDayOfMonth - i - 1))
      days.push({ date: prevMonthDay, isCurrentMonth: false })
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i)

      // Verificar se há eventos para este dia
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        )
      })

      days.push({
        date: day,
        isCurrentMonth: true,
        hasEvent: dayEvents.some((e) => e.type === "event"),
        hasReminder: dayEvents.some((e) => e.type === "reminder"),
        hasExam: dayEvents.some((e) => e.type === "exam"),
        hasNote: dayEvents.some((e) => e.type === "note"),
      })
    }

    // Dias do próximo mês para preencher o final do calendário
    const remainingDays = 42 - days.length // 6 linhas x 7 dias = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i)
      days.push({ date: nextMonthDay, isCurrentMonth: false })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  // Função para navegar entre os meses
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)

    newMonth.setMonth(newMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  // Formatar o nome do mês e ano
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  }

  // Verificar se um dia é o dia atual
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Verificar se um dia é o dia selecionado
  const isSelected = (date) => {
    return (
      date.getDate() === selectedDay.getDate() &&
      date.getMonth() === selectedDay.getMonth() &&
      date.getFullYear() === selectedDay.getFullYear()
    )
  }

  // Obter eventos do dia selecionado
  const getSelectedDayEvents = () => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === selectedDay.getDate() &&
        eventDate.getMonth() === selectedDay.getMonth() &&
        eventDate.getFullYear() === selectedDay.getFullYear()
      )
    })
  }

  const selectedDayEvents = getSelectedDayEvents()

  // Adicionar novo evento
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent])
  }

  // Excluir evento
  const handleDeleteEvent = (eventId) => {
    const event = events.find(e => e.id === eventId)
    
    // Verificar se aluno está tentando deletar um evento
    if (isAluno && event?.type === 'event') {
      alert('Apenas professores podem excluir eventos. Você só pode excluir suas próprias notas.')
      return
    }
    
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  // Abrir modal de adicionar evento
  const openAddEventModal = () => {
    setIsAddEventModalOpen(true)
  }

  // Abrir modal de adicionar nota
  const openAddNoteModal = () => {
    setIsAddNoteModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full bg-[#f3e8ff] dark:bg-[#121212] text-gray-800 dark:text-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold bg-[#58417d] bg-clip-text text-transparent mb-8">Calendário</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E6DFFF] mb-8 overflow-x-auto">
          {["Calendário", "Horários"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 mr-8 font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeCalendarTab === tab
                  ? "text-[#8C43FF] border-b-2 border-[#8C43FF]"
                  : "dark:text-[#D0B3FF] text-[#8C43FF]/70 hover:text-[#8C43FF] hover:border-b-2 hover:border-[#8C43FF]/50"
              }`}
              onClick={() => setActiveCalendarTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Renderizar conteúdo baseado na aba ativa */}
        {activeCalendarTab === "Calendário" ? (
          <div className="transform scale-90 origin-top">
          <div className="flex flex-col lg:flex-row gap-6 h-full">

          {/* Calendário */}
          <motion.div
            className="flex-1 dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cabeçalho do calendário */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold capitalize dark:text-white text-gray-800">
                {formatMonthYear(currentMonth)}
              </h2>
                {/* Legenda */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm dark:text-gray-400 text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#00B2FF]"></div>
                  <span>Evento</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#58417d]"></div>
                  <span>Lembrete</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#FF4D4D]"></div>
                  <span>Prova</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  <span>Nota</span>
                </div>
              </div>
              <div className="flex gap-2">               
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#3D3D3D] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} className="text-[#8C43FF]" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#3D3D3D] transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} className="text-[#8C43FF]" />
                </button>
              </div>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 mb-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
                <div key={index} className="text-center py-2 text-sm font-medium dark:text-gray-400 text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedDay(day.date)}
            className={`relative h-20 p-2 rounded-xl cursor-pointer transition-all
              ${day.isCurrentMonth ? "dark:bg-[#2D2D2D] bg-[#E1E1E1]" : "dark:bg-[#252525] bg-[#f3e8ff] opacity-40"}
              ${isToday(day.date) ? "border border-[#046087] dark:border-[#00B2FF]" : ""}
              ${isSelected(day.date) ? "border-2 border-[#8C43FF] dark:border-[#8C43FF] shadow-[0_0_15px_rgba(140,67,255,0.3)]" : ""}
            `}
                >
                  <span
                    className={`
                    text-sm font-medium
                    ${isToday(day.date) ? "text-[#00B2FF]": ""}
                    ${isSelected(day.date) ? "dark:text-white text-[#8C43FF]" : "dark:text-gray-300 text-gray-700"}
                    ${!day.isCurrentMonth ? "dark:text-gray-600 text-gray-400" : ""}
                  `}
                  >
                    {day.date.getDate()}
                  </span>

                  {/* Indicadores de eventos */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {day.hasEvent && <div className="w-2 h-2 rounded-full bg-[#00B2FF]"></div>}
                    {day.hasReminder && <div className="w-2 h-2 rounded-full bg-[#58417d]"></div>}
                    {day.hasExam && <div className="w-2 h-2 rounded-full bg-[#FF4D4D]"></div>}
                    {day.hasNote && <div className="w-2 h-2 rounded-full bg-[#4CAF50]"></div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Painel lateral */}
          <motion.div
            className="w-full lg:w-96 dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold dark:text-white text-gray-800">
                {selectedDay.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              </h2>
            </div>

            {/* Lista de anotações */}
            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-1">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 dark:bg-[#2D2D2D] bg-gray-100 rounded-xl dark:hover:bg-[#333333] hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          {item.type === "event" && <CalendarIcon size={16} className="text-[#00B2FF]" />}
                          {item.type === "reminder" && <Bell size={16} className="text-[#8C43FF]" />}
                          {item.type === "exam" && <BookOpen size={16} className="text-[#FF4D4D]" />}
                          {item.type === "note" && <Edit size={16} className="text-[#4CAF50]" />}
                          <h3 className="font-medium dark:text-white text-gray-800">{item.title}</h3>
                        </div>
                        {item.time && (
                          <div className="flex items-center gap-1 mt-1 text-sm dark:text-gray-400 text-gray-500">
                            <Clock size={14} />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.content && (
                          <p className="mt-2 text-sm dark:text-gray-300 text-gray-600 line-clamp-2">{item.content}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {/* Mostrar botão de deletar apenas se: 
                            - For professor (pode deletar tudo)
                            - For aluno mas item for nota (pode deletar apenas suas notas)
                        */}
                        {(isProfessor || (isAluno && item.type !== 'event')) && (
                          <button
                            className="p-1 rounded-full dark:hover:bg-[#3D3D3D] hover:bg-gray-200 transition-colors cursor-pointer"
                            onClick={() => handleDeleteEvent(item.id)}
                            title={isAluno && item.type === 'event' ? 'Apenas professores podem excluir eventos' : 'Excluir'}
                          >
                            <Trash2 size={16} className="dark:text-gray-400 text-gray-500" />
                          </button>
                        )}
                        
                        {/* Indicador visual para alunos em eventos */}
                        {isAluno && item.type === 'event' && (
                          <div 
                            className="p-1 rounded-full opacity-30"
                            title="Apenas professores podem excluir eventos"
                          >
                            <Trash2 size={16} className="dark:text-gray-600 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 dark:text-gray-500 text-gray-400">
                  Sem anotações ou eventos neste dia
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <button
                onClick={openAddNoteModal}
                className="w-full py-3 px-4 bg-[#58417d] hover:bg-[#9955FF] rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-white cursor-pointer"
              >
                <Edit size={18} />
                <span>Adicionar nova nota</span>
              </button>
              
              {/* Botão de adicionar evento - apenas para professores */}
              {isProfessor && (
                <button
                  onClick={openAddEventModal}
                  className="w-full py-3 px-4 dark:bg-[#2D2D2D] bg-gray-100 dark:hover:bg-[#3D3D3D] hover:bg-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors dark:text-white text-gray-800 cursor-pointer"
                >
                  <CalendarIcon size={18} className="text-[#00B2FF]" />
                  <span>Adicionar evento</span>
                </button>
              )}
            </div>
          </motion.div>
          </div>
          </div>
        ) : (
          /* Renderizar SchedulePage quando a aba Horários estiver ativa */
          <div className="mt-6">
            <SchedulePage 
              activeTab={activeCalendarTab} 
              onTabChange={setActiveCalendarTab}
            />
          </div>
        )}

        {/* Modais - apenas renderizar quando estiver na aba Calendário */}
        {activeCalendarTab === "Calendário" && (
          <>
            <AddEventModal
              isOpen={isAddEventModalOpen}
              onClose={() => setIsAddEventModalOpen(false)}
              onSave={handleAddEvent}
              selectedDate={selectedDay}
            />

            <AddNoteModal
              isOpen={isAddNoteModalOpen}
              onClose={() => setIsAddNoteModalOpen(false)}
              onSave={handleAddEvent}
              selectedDate={selectedDay}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default CalendarPage
