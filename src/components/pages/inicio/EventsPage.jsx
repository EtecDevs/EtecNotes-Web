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
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex">
            <img
              src={event.image}
              alt={event.title}
              className="w-48 h-32 object-cover rounded-lg"
            />
            <div className="ml-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {event.shortDescription}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                <p>Horário: {event.time}</p>
              </div>
              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Saber mais
                </button>
                <button
                  onClick={() => handleMarkPresence(event.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    markedEvents.includes(event.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {selectedEvent.title}
            </h2>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedEvent.fullDescription}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <p>Data: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Horário: {selectedEvent.time}</p>
              <p>Local: {selectedEvent.location}</p>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
