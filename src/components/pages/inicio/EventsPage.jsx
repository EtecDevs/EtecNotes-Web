"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EventConfirmationPage from "./EventConfirmationPage"
import { useAuth } from "../../../hooks/useAuth"

const EventsPage = () => {
  const { user } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [markedEvents, setMarkedEvents] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [eventToConfirm, setEventToConfirm] = useState(null)

  // Sample events data - você pode substituir isso por dados reais depois
  const events = [
    {
      id: 1,
      title: "Semana Tecnológica",
      image: "src/assets/events/semana-tecnologica.jpg",
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais. Uma oportunidade única de ver de perto o talento dos nossos estudantes.",
      location: "Auditório Principal",
      isPaid: false,
      price: 0,
    },
    {
      id: 3,
      title: "Hopi-Hari",
      image: "src/assets/events/hopihari.webp",
      shortDescription: "Profissionais da área compartilham experiências e dicas",
      date: "2025-09-28",
      time: "19:00",
      fullDescription:
        "Palestra com profissionais renomados do mercado de TI que compartilharão suas experiências, trajetórias de carreira e dicas valiosas para quem está ingressando na área. Haverá sessão de perguntas e respostas ao final.",
      location: "Auditório",
      isPaid: true,
      price: 200,
    },
    {
      id: 4,
      title: "Festa Junina",
      image: "src/assets/events/festa-junina.jpg",
      shortDescription: "Equipes competem com seus robôs em desafios técnicos",
      date: "2025-10-05",
      time: "13:30",
      fullDescription:
        "Competição entre equipes de estudantes com seus robôs desenvolvidos durante o semestre. Os desafios incluem navegação autônoma, manipulação de objetos e resolução de problemas complexos. Premiação para os três primeiros colocados.",
      location: "Quadra Poliesportiva",
      isPaid: true,
      price: 10.00,
    },
    {
      id: 6,
      title: "Hackathon Etec 2025",
      image: "src/assets/events/hackathon.png",
      shortDescription: "Maratona de programação de 24 horas para resolver desafios",
      date: "2025-10-19",
      time: "18:00",
      fullDescription:
        "Hackathon de 24 horas onde equipes de estudantes desenvolverão soluções inovadoras para problemas reais da comunidade. Mentoria de profissionais da área, premiação em dinheiro e oportunidades de estágio para os vencedores.",
      location: "Laboratórios de Informática",
      isPaid: false,
      price: 0,
    },
  ]

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter((id) => id !== eventId))
    } else {
      setMarkedEvents([...markedEvents, eventId])
    }
  }

  const handleParticipate = (event) => {
    if (event.isPaid) {
      // Se for pago, redirecionar para página de confirmação
      setEventToConfirm(event)
      setShowConfirmation(true)
    } else {
      // Se for gratuito, apenas marcar presença
      handleMarkPresence(event.id)
    }
  }

  const handleConfirmationBack = () => {
    setShowConfirmation(false)
    setEventToConfirm(null)
  }

  const handleConfirmationSuccess = (eventId) => {
    // Adicionar à lista de eventos confirmados
    setMarkedEvents([...markedEvents, eventId])
  }

  // Se estiver na página de confirmação, mostrar apenas ela
  if (showConfirmation && eventToConfirm) {
    return (
      <EventConfirmationPage
        event={eventToConfirm}
        onBack={handleConfirmationBack}
        onConfirm={handleConfirmationSuccess}
      />
    )
  }

  return (
    <div className="p-6">
      {/* Lista de Eventos */}
      <motion.div className="grid grid-cols-1 md:grid-cols-1 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-br bg-[#58417d] dark:bg-[#58417d] rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-60 h-40 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-[#232E33]"
            />
            <div className="md:ml-6 mt-4 md:mt-0 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-white drop-shadow">{event.title}</h3>
                {event.isPaid && (
                  <span className="ml-2 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex-shrink-0">
                    PAGO - R$ {event.price.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-white/80 dark:text-gray-300 mb-2">{event.shortDescription}</p>
              <div className="mb-2 text-sm text-white/70 dark:text-gray-400">
                <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                <p>Horário: {event.time}</p>
              </div>
              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-5 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white font-semibold rounded-xl shadow transition-colors"
                >
                  Saber mais
                </button>
                <button
                  onClick={() => handleParticipate(event)}
                  className={`px-5 py-2 rounded-xl font-semibold shadow transition-colors ${
                    markedEvents.includes(event.id)
                      ? "bg-green-500 text-white"
                      : event.isPaid
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
                      : "bg-white/80 dark:bg-gray-700 text-[#8C43FF] dark:text-white border border-[#8C43FF] dark:border-gray-600"
                  }`}
                >
                  {markedEvents.includes(event.id) 
                    ? "Participação Confirmada" 
                    : event.isPaid 
                    ? "Participar (Pago)" 
                    : "Marcar Presença"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal de Detalhes */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#58417d] dark:bg-[#58417d] rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-[#8C43FF]/40 relative">
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 px-3 py-1 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg shadow transition-colors z-50"
          >
            Fechar
          </button>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow">{selectedEvent.title}</h2>
          <img
            src={selectedEvent.image || "/placeholder.svg"}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg border-4 border-white dark:border-[#232E33]"
          />
          <p className="text-white/90 dark:text-gray-300 mb-4 text-lg">{selectedEvent.fullDescription}</p>
          <div className="text-md text-white/80 dark:text-gray-400 mb-4">
            <p>Data: {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p>Horário: {selectedEvent.time}</p>
            <p>Local: {selectedEvent.location}</p>
            {selectedEvent.isPaid && (
              <p className="mt-2 text-yellow-300 font-bold text-lg">
            💰 Valor: R$ {selectedEvent.price.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Botão de participação no modal */}
            {user?.role === 'aluno' && (
              <button
                onClick={() => {
                  setSelectedEvent(null)
                  handleParticipate(selectedEvent)
                }}
                className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all ${
                  markedEvents.includes(selectedEvent.id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : selectedEvent.isPaid
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transform hover:scale-[1.02]"
                    : "bg-[#8C43FF] hover:bg-[#9955FF] text-white transform hover:scale-[1.02]"
                }`}
                disabled={markedEvents.includes(selectedEvent.id)}
              >
                {markedEvents.includes(selectedEvent.id)
                  ? "✓ Participação Confirmada"
                  : selectedEvent.isPaid
                  ? `Participar - R$ ${selectedEvent.price.toFixed(2)}`
                  : "Confirmar Presença"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage
