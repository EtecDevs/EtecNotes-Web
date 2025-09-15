"use client"

import { useState } from "react"

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: "Show de Talentos",
      image: "/show-de-talentos-estudantes-apresentando.jpg",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor felis a consectetur sollicitudin.",
      date: "2025-08-25",
      time: "19:00",
      fullDescription:
        "Uma noite especial onde os estudantes da ETEC demonstram seus talentos em música, dança, teatro e outras artes. Venha prestigiar e se surpreender com a criatividade dos nossos alunos.",
      location: "Auditório Principal",
    },
    {
      id: 2,
      title: "Feira Tecnológica",
      image: "/feira-tecnol-gica-com-projetos-de-estudantes.jpg",
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais. Uma oportunidade única de ver de perto o talento dos nossos estudantes.",
      location: "Auditório Principal",
    },
    {
      id: 3,
      title: "Workshop de Programação",
      image: "/workshop-de-programa--o-com-computadores.jpg",
      shortDescription: "Aprenda as bases da programação com professores especialistas",
      date: "2025-09-22",
      time: "09:00",
      fullDescription:
        "Workshop intensivo de programação para iniciantes. Abordaremos conceitos fundamentais de lógica de programação, estruturas de dados básicas e desenvolvimento de pequenos projetos práticos. Ideal para quem está começando na área de tecnologia.",
      location: "Laboratório de Informática 1",
    },
    {
      id: 4,
      title: "Palestra: Mercado de Trabalho em TI",
      image: "/palestra-profissional-mercado-trabalho-tecnologia.jpg",
      shortDescription: "Profissionais da área compartilham experiências e dicas",
      date: "2025-09-28",
      time: "19:00",
      fullDescription:
        "Palestra com profissionais renomados do mercado de TI que compartilharão suas experiências, trajetórias de carreira e dicas valiosas para quem está ingressando na área. Haverá sessão de perguntas e respostas ao final.",
      location: "Auditório Principal",
    },
    {
      id: 5,
      title: "Competição de Robótica",
      image: "/competi--o-rob-tica-estudantes-rob-s.jpg",
      shortDescription: "Equipes competem com seus robôs em desafios técnicos",
      date: "2025-10-05",
      time: "13:30",
      fullDescription:
        "Competição entre equipes de estudantes com seus robôs desenvolvidos durante o semestre. Os desafios incluem navegação autônoma, manipulação de objetos e resolução de problemas complexos. Premiação para os três primeiros colocados.",
      location: "Quadra Poliesportiva",
    },
    {
      id: 6,
      title: "Semana da Sustentabilidade",
      image: "/sustentabilidade-meio-ambiente-projetos-ecol-gicos.jpg",
      shortDescription: "Projetos e iniciativas focados em sustentabilidade ambiental",
      date: "2025-10-12",
      time: "08:00",
      fullDescription:
        "Uma semana dedicada à conscientização ambiental com exposição de projetos sustentáveis, oficinas de reciclagem, palestras sobre energias renováveis e ações práticas para preservação do meio ambiente. Participação de ONGs e empresas do setor.",
      location: "Pátio Central",
    },
    {
      id: 7,
      title: "Hackathon Etec 2025",
      image: "/hackathon-programa--o-competi--o-estudantes.jpg",
      shortDescription: "Maratona de programação de 24 horas para resolver desafios",
      date: "2025-10-19",
      time: "18:00",
      fullDescription:
        "Hackathon de 24 horas onde equipes de estudantes desenvolverão soluções inovadoras para problemas reais da comunidade. Mentoria de profissionais da área, premiação em dinheiro e oportunidades de estágio para os vencedores.",
      location: "Laboratórios de Informática",
    },
    {
      id: 8,
      title: "Mostra Cultural",
      image: "/mostra-cultural-arte-m-sica-teatro-estudantes.jpg",
      shortDescription: "Apresentações artísticas e culturais dos estudantes",
      date: "2025-10-26",
      time: "19:30",
      fullDescription:
        "Noite cultural com apresentações de teatro, música, dança e artes visuais produzidas pelos estudantes. Uma celebração da diversidade cultural e do talento artístico da nossa comunidade escolar.",
      location: "Teatro da Escola",
    },
  ]

  const [selectedEvent, setSelectedEvent] = useState(events[0])
  const [markedEvents, setMarkedEvents] = useState([])
  const [activeTab, setActiveTab] = useState("Eventos")

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter((id) => id !== eventId))
    } else {
      setMarkedEvents([...markedEvents, eventId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <h1 className="text-xl font-semibold text-gray-800">EtecNotes</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm2 3a1 1 0 100 2h6a1 1 0 100-2H7a1 1 0 010-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Início</h2>

        <div className="flex gap-8 mb-8">
          <button
            className={`pb-2 px-1 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "Jornal Etec"
                ? "text-gray-600 border-gray-300"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            onClick={() => setActiveTab("Jornal Etec")}
          >
            Jornal Etec
          </button>
          <button
            className={`pb-2 px-1 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "Patch Notes"
                ? "text-gray-600 border-gray-300"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            onClick={() => setActiveTab("Patch Notes")}
          >
            Patch Notes
          </button>
          <button
            className={`pb-2 px-1 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "Eventos"
                ? "text-purple-600 border-purple-600"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            onClick={() => setActiveTab("Eventos")}
          >
            Eventos
          </button>
        </div>

        {activeTab === "Eventos" && (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border-2 border-purple-200 p-6 hover:border-purple-300 transition-colors"
              >
                <div className="flex gap-6">
                  <div className="w-48 h-32 flex-shrink-0">
                    <img
                      src={event.image || "/placeholder.svg?height=128&width=192"}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-xl bg-gray-200"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {new Date(event.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{event.shortDescription}</p>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      onClick={() => {
                        alert(
                          `${event.title}\n\n${event.fullDescription}\n\nData: ${new Date(event.date).toLocaleDateString("pt-BR")}\nHorário: ${event.time}\nLocal: ${event.location}`,
                        )
                      }}
                    >
                      Saber mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Jornal Etec" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Conteúdo do Jornal Etec em breve...</p>
          </div>
        )}

        {activeTab === "Patch Notes" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Patch Notes em breve...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage
