"use client"

import { useState } from "react"

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [markedEvents, setMarkedEvents] = useState([])

  // Sample events data - você pode substituir isso por dados reais depois
  const events = [
    {
      id: 1,
      title: "Feira Tecnológica",
      image: "",
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais. Uma oportunidade única de ver de perto o talento dos nossos estudantes.",
      location: "Auditório Principal",
    },
    {
      id: 2,
      title: "Workshop de Programação",
      image: "",
      shortDescription: "Aprenda as bases da programação com professores especialistas",
      date: "2025-09-22",
      time: "09:00",
      fullDescription:
        "Workshop intensivo de programação para iniciantes. Abordaremos conceitos fundamentais de lógica de programação, estruturas de dados básicas e desenvolvimento de pequenos projetos práticos. Ideal para quem está começando na área de tecnologia.",
      location: "Laboratório de Informática 1",
    },
    {
      id: 3,
      title: "Palestra: Mercado de Trabalho em TI",
      image: "",
      shortDescription: "Profissionais da área compartilham experiências e dicas",
      date: "2025-09-28",
      time: "19:00",
      fullDescription:
        "Palestra com profissionais renomados do mercado de TI que compartilharão suas experiências, trajetórias de carreira e dicas valiosas para quem está ingressando na área. Haverá sessão de perguntas e respostas ao final.",
      location: "Auditório Principal",
    },
    {
      id: 4,
      title: "Competição de Robótica",
      image: "",
      shortDescription: "Equipes competem com seus robôs em desafios técnicos",
      date: "2025-10-05",
      time: "13:30",
      fullDescription:
        "Competição entre equipes de estudantes com seus robôs desenvolvidos durante o semestre. Os desafios incluem navegação autônoma, manipulação de objetos e resolução de problemas complexos. Premiação para os três primeiros colocados.",
      location: "Quadra Poliesportiva",
    },
    {
      id: 5,
      title: "Semana da Sustentabilidade",
      image: "",
      shortDescription: "Projetos e iniciativas focados em sustentabilidade ambiental",
      date: "2025-10-12",
      time: "08:00",
      fullDescription:
        "Uma semana dedicada à conscientização ambiental com exposição de projetos sustentáveis, oficinas de reciclagem, palestras sobre energias renováveis e ações práticas para preservação do meio ambiente. Participação de ONGs e empresas do setor.",
      location: "Pátio Central",
    },
    {
      id: 6,
      title: "Hackathon Etec 2025",
      image: "",
      shortDescription: "Maratona de programação de 24 horas para resolver desafios",
      date: "2025-10-19",
      time: "18:00",
      fullDescription:
        "Hackathon de 24 horas onde equipes de estudantes desenvolverão soluções inovadoras para problemas reais da comunidade. Mentoria de profissionais da área, premiação em dinheiro e oportunidades de estágio para os vencedores.",
      location: "Laboratórios de Informática",
    },
    {
      id: 7,
      title: "Mostra Cultural",
      image: "",
      shortDescription: "Apresentações artísticas e culturais dos estudantes",
      date: "2025-10-26",
      time: "19:30",
      fullDescription:
        "Noite cultural com apresentações de teatro, música, dança e artes visuais produzidas pelos estudantes. Uma celebração da diversidade cultural e do talento artístico da nossa comunidade escolar.",
      location: "Teatro da Escola",
    },
    {
      id: 8,
      title: "Feira de Profissões",
      image: "",
      shortDescription: "Orientação vocacional e apresentação de diferentes carreiras",
      date: "2025-11-02",
      time: "14:00",
      fullDescription:
        "Evento de orientação vocacional com profissionais de diversas áreas apresentando suas carreiras, requisitos de formação e perspectivas do mercado de trabalho. Inclui testes vocacionais e sessões de orientação individual.",
      location: "Ginásio",
    },
  ]

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter((id) => id !== eventId))
    } else {
      setMarkedEvents([...markedEvents, eventId])
    }
  }

  return (
    <div className="p-6">
      {/* Lista de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-1    gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-br bg-[#5b38ba] dark:bg-[#5b38ba] rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-60 h-40 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-[#232E33]"
            />
            <div className="md:ml-6 mt-4 md:mt-0 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white drop-shadow mb-2">{event.title}</h3>
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
                  onClick={() => handleMarkPresence(event.id)}
                  className={`px-5 py-2 rounded-xl font-semibold shadow transition-colors ${
                    markedEvents.includes(event.id)
                      ? "bg-green-500 text-white"
                      : "bg-white/80 dark:bg-gray-700 text-[#8C43FF] dark:text-white border border-[#8C43FF] dark:border-gray-600"
                  }`}
                >
                  {markedEvents.includes(event.id) ? "Presença Marcada" : "Marcar Presença"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#5b38ba] dark:bg-[#5b38ba] rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-[#8C43FF]/40 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg shadow transition-colors"
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage
