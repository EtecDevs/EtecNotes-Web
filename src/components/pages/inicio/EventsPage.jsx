import React, { useState } from 'react';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [markedEvents, setMarkedEvents] = useState([]);

  // Sample events data - você pode substituir isso por dados reais depois
  const events = [
    {
      id: 1,
      title: 'Feira Tecnológica',
      image: '/placeholder.jpg',
      shortDescription: 'Exposição de projetos tecnológicos desenvolvidos pelos alunos',
      date: '2025-09-15',
      time: '14:00',
      fullDescription: 'Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais. Uma oportunidade única de ver de perto o talento dos nossos estudantes.',
      location: 'Auditório Principal'
    },
    // Adicione mais eventos aqui
  ];

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter(id => id !== eventId));
    } else {
      setMarkedEvents([...markedEvents, eventId]);
    }
  };

  return (
    <div className="p-6">
      {/* Lista de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-gradient-to-br from-[#8C43FF]/80 to-[#CCA9DD]/80 dark:from-[#2D2D2D] dark:to-[#8C43FF]/40 rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center hover:scale-[1.02] transition-transform duration-300">
            <img
              src={event.image}
              alt={event.title}
              className="w-60 h-32 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-[#232E33]"
            />
            <div className="md:ml-6 mt-4 md:mt-0 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white drop-shadow mb-2">
                {event.title}
              </h3>
              <p className="text-white/80 dark:text-gray-300 mb-2">
                {event.shortDescription}
              </p>
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
                      ? 'bg-green-500 text-white'
                      : 'bg-white/80 dark:bg-gray-700 text-[#8C43FF] dark:text-white border border-[#8C43FF] dark:border-gray-600'
                  }`}
                >
                  {markedEvents.includes(event.id) ? 'Presença Marcada' : 'Marcar Presença'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#8C43FF]/90 to-[#CCA9DD]/90 dark:from-[#232E33] dark:to-[#8C43FF]/60 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-[#8C43FF]/40 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg shadow transition-colors"
            >
              Fechar
            </button>
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow">
              {selectedEvent.title}
            </h2>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg border-4 border-white dark:border-[#232E33]"
            />
            <p className="text-white/90 dark:text-gray-300 mb-4 text-lg">
              {selectedEvent.fullDescription}
            </p>
            <div className="text-md text-white/80 dark:text-gray-400 mb-4">
              <p>Data: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Horário: {selectedEvent.time}</p>
              <p>Local: {selectedEvent.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
