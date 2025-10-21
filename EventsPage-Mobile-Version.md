# EventsPage - Versão Mobile (React Native / App)

## Componente React sem Tailwind com CSS-in-JS

```jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 768;

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [markedEvents, setMarkedEvents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToConfirm, setEventToConfirm] = useState(null);

  const events = [
    {
      id: 1,
      title: "Semana Tecnológica",
      image: require("./assets/events/semana-tecnologica.jpg"),
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais.",
      location: "Auditório Principal",
      isPaid: false,
      price: 0,
      allowPresence: true,
    },
    {
      id: 3,
      title: "Hopi-Hari",
      image: require("./assets/events/hopihari.webp"),
      shortDescription: "Profissionais da área compartilham experiências e dicas",
      date: "2025-09-28",
      time: "19:00",
      fullDescription:
        "Palestra com profissionais renomados do mercado de TI que compartilharão suas experiências, trajetórias de carreira e dicas valiosas.",
      location: "Auditório",
      isPaid: true,
      price: 200,
      allowPresence: false,
    },
    {
      id: 4,
      title: "Festa Junina",
      image: require("./assets/events/festa-junina.jpg"),
      shortDescription: "Equipes competem com seus robôs em desafios técnicos",
      date: "2025-10-05",
      time: "13:30",
      fullDescription:
        "Competição entre equipes de estudantes com seus robôs desenvolvidos durante o semestre. Os desafios incluem navegação autônoma.",
      location: "Quadra Poliesportiva",
      isPaid: true,
      price: 10.0,
      allowPresence: false,
    },
    {
      id: 6,
      title: "Hackathon Etec 2025",
      image: require("./assets/events/hackathon.png"),
      shortDescription: "Maratona de programação de 24 horas para resolver desafios",
      date: "2025-10-19",
      time: "18:00",
      fullDescription:
        "Hackathon de 24 horas onde equipes de estudantes desenvolverão soluções inovadoras. Premiação em dinheiro e oportunidades de estágio.",
      location: "Laboratórios de Informática",
      isPaid: false,
      price: 0,
      allowPresence: false,
    },
  ];

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter((id) => id !== eventId));
    } else {
      setMarkedEvents([...markedEvents, eventId]);
    }
  };

  const handleParticipate = (event) => {
    if (event.isPaid) {
      setEventToConfirm(event);
      setShowConfirmation(true);
    } else if (event.allowPresence) {
      handleMarkPresence(event.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Lista de Eventos */}
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image
              source={event.image}
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.isPaid && (
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>
                      PAGO - R$ {event.price.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.eventDescription}>
                {event.shortDescription}
              </Text>
              
              <View style={styles.eventDetails}>
                <Text style={styles.detailText}>
                  Data: {formatDate(event.date)}
                </Text>
                <Text style={styles.detailText}>
                  Horário: {event.time}
                </Text>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => setSelectedEvent(event)}
                >
                  <Text style={styles.infoButtonText}>Saber mais</Text>
                </TouchableOpacity>

                {(event.isPaid || event.allowPresence) && (
                  <TouchableOpacity
                    style={[
                      styles.participateButton,
                      markedEvents.includes(event.id) && styles.confirmedButton,
                      event.isPaid && !markedEvents.includes(event.id) && styles.paidButton
                    ]}
                    onPress={() => handleParticipate(event)}
                  >
                    <Text style={styles.participateButtonText}>
                      {markedEvents.includes(event.id)
                        ? "Participação Confirmada"
                        : event.isPaid
                        ? "Participar (Pago)"
                        : "Marcar Presença"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}

        {/* Modal de Detalhes */}
        <Modal
          visible={selectedEvent !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedEvent(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedEvent(null)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>

              {selectedEvent && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                  
                  <Image
                    source={selectedEvent.image}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />

                  <Text style={styles.modalDescription}>
                    {selectedEvent.fullDescription}
                  </Text>

                  <View style={styles.modalDetails}>
                    <Text style={styles.modalDetailText}>
                      Data: {formatDate(selectedEvent.date)}
                    </Text>
                    <Text style={styles.modalDetailText}>
                      Horário: {selectedEvent.time}
                    </Text>
                    <Text style={styles.modalDetailText}>
                      Local: {selectedEvent.location}
                    </Text>
                    {selectedEvent.isPaid && (
                      <Text style={styles.modalPriceText}>
                        💰 Valor: R$ {selectedEvent.price.toFixed(2)}
                      </Text>
                    )}
                  </View>

                  {(selectedEvent.isPaid || selectedEvent.allowPresence) && (
                    <TouchableOpacity
                      style={[
                        styles.modalParticipateButton,
                        markedEvents.includes(selectedEvent.id) && styles.modalConfirmedButton,
                        selectedEvent.isPaid && !markedEvents.includes(selectedEvent.id) && styles.modalPaidButton
                      ]}
                      onPress={() => {
                        setSelectedEvent(null);
                        handleParticipate(selectedEvent);
                      }}
                      disabled={markedEvents.includes(selectedEvent.id)}
                    >
                      <Text style={styles.modalParticipateButtonText}>
                        {markedEvents.includes(selectedEvent.id)
                          ? "✓ Participação Confirmada"
                          : selectedEvent.isPaid
                          ? `Participar - R$ ${selectedEvent.price.toFixed(2)}`
                          : "Confirmar Presença"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: isSmallDevice ? 16 : 24,
  },
  eventCard: {
    backgroundColor: '#58417d',
    borderRadius: 24,
    marginBottom: isSmallDevice ? 20 : 32,
    overflow: 'hidden',
    flexDirection: isSmallDevice ? 'column' : 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  eventImage: {
    width: isSmallDevice ? '100%' : 240,
    height: isSmallDevice ? 200 : 160,
  },
  eventContent: {
    flex: 1,
    padding: isSmallDevice ? 16 : 24,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  eventTitle: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  priceBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  eventDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: isSmallDevice ? 'column' : 'row',
    gap: 12,
  },
  infoButton: {
    backgroundColor: '#8C43FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: isSmallDevice ? 0 : 1,
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  participateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8C43FF',
    flex: isSmallDevice ? 0 : 1,
  },
  confirmedButton: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  paidButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  participateButtonText: {
    color: '#8C43FF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#58417d',
    borderRadius: 24,
    padding: isSmallDevice ? 20 : 32,
    maxWidth: 600,
    width: '100%',
    maxHeight: '90%',
    borderWidth: 2,
    borderColor: 'rgba(140, 67, 255, 0.4)',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#8C43FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: isSmallDevice ? 24 : 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 40,
  },
  modalImage: {
    width: '100%',
    height: isSmallDevice ? 200 : 256,
    borderRadius: 16,
    marginBottom: 20,
  },
  modalDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalDetails: {
    marginBottom: 20,
  },
  modalDetailText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    marginBottom: 6,
  },
  modalPriceText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalParticipateButton: {
    backgroundColor: '#8C43FF',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  modalConfirmedButton: {
    backgroundColor: '#22C55E',
  },
  modalPaidButton: {
    backgroundColor: '#FFA500',
  },
  modalParticipateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventsPage;
```

---

## Versão Web (React.js puro com CSS Modules)

### EventsPage.jsx

```jsx
import React, { useState } from 'react';
import styles from './EventsPage.module.css';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [markedEvents, setMarkedEvents] = useState([]);

  const events = [
    {
      id: 1,
      title: "Semana Tecnológica",
      image: "/src/assets/events/semana-tecnologica.jpg",
      shortDescription: "Exposição de projetos tecnológicos desenvolvidos pelos alunos",
      date: "2025-09-15",
      time: "14:00",
      fullDescription:
        "Venha conhecer os projetos inovadores desenvolvidos pelos alunos da Etec. A feira contará com demonstrações práticas, apresentações e muito mais.",
      location: "Auditório Principal",
      isPaid: false,
      price: 0,
      allowPresence: true,
    },
    {
      id: 3,
      title: "Hopi-Hari",
      image: "/src/assets/events/hopihari.webp",
      shortDescription: "Profissionais da área compartilham experiências e dicas",
      date: "2025-09-28",
      time: "19:00",
      fullDescription:
        "Palestra com profissionais renomados do mercado de TI que compartilharão suas experiências.",
      location: "Auditório",
      isPaid: true,
      price: 200,
      allowPresence: false,
    },
    {
      id: 4,
      title: "Festa Junina",
      image: "/src/assets/events/festa-junina.jpg",
      shortDescription: "Equipes competem com seus robôs em desafios técnicos",
      date: "2025-10-05",
      time: "13:30",
      fullDescription:
        "Competição entre equipes de estudantes com seus robôs desenvolvidos durante o semestre.",
      location: "Quadra Poliesportiva",
      isPaid: true,
      price: 10.0,
      allowPresence: false,
    },
    {
      id: 6,
      title: "Hackathon Etec 2025",
      image: "/src/assets/events/hackathon.png",
      shortDescription: "Maratona de programação de 24 horas para resolver desafios",
      date: "2025-10-19",
      time: "18:00",
      fullDescription:
        "Hackathon de 24 horas onde equipes desenvolverão soluções inovadoras.",
      location: "Laboratórios de Informática",
      isPaid: false,
      price: 0,
      allowPresence: false,
    },
  ];

  const handleMarkPresence = (eventId) => {
    if (markedEvents.includes(eventId)) {
      setMarkedEvents(markedEvents.filter((id) => id !== eventId));
    } else {
      setMarkedEvents([...markedEvents, eventId]);
    }
  };

  const handleParticipate = (event) => {
    if (event.isPaid) {
      // Lógica de pagamento aqui
      alert(`Redirecionando para pagamento de R$ ${event.price.toFixed(2)}`);
    } else if (event.allowPresence) {
      handleMarkPresence(event.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Lista de Eventos */}
        <div className={styles.eventsList}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <img
                src={event.image}
                alt={event.title}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  {event.isPaid && (
                    <span className={styles.priceBadge}>
                      PAGO - R$ {event.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className={styles.eventDescription}>
                  {event.shortDescription}
                </p>
                
                <div className={styles.eventDetails}>
                  <p>Data: {formatDate(event.date)}</p>
                  <p>Horário: {event.time}</p>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={styles.infoButton}
                    onClick={() => setSelectedEvent(event)}
                  >
                    Saber mais
                  </button>

                  {(event.isPaid || event.allowPresence) && (
                    <button
                      className={`${styles.participateButton} ${
                        markedEvents.includes(event.id) ? styles.confirmed : ''
                      } ${event.isPaid && !markedEvents.includes(event.id) ? styles.paid : ''}`}
                      onClick={() => handleParticipate(event)}
                    >
                      {markedEvents.includes(event.id)
                        ? "Participação Confirmada"
                        : event.isPaid
                        ? "Participar (Pago)"
                        : "Marcar Presença"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes */}
        {selectedEvent && (
          <div className={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedEvent(null)}
              >
                Fechar
              </button>

              <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
              
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className={styles.modalImage}
              />

              <p className={styles.modalDescription}>
                {selectedEvent.fullDescription}
              </p>

              <div className={styles.modalDetails}>
                <p>Data: {formatDate(selectedEvent.date)}</p>
                <p>Horário: {selectedEvent.time}</p>
                <p>Local: {selectedEvent.location}</p>
                {selectedEvent.isPaid && (
                  <p className={styles.modalPrice}>
                    💰 Valor: R$ {selectedEvent.price.toFixed(2)}
                  </p>
                )}
              </div>

              {(selectedEvent.isPaid || selectedEvent.allowPresence) && (
                <button
                  className={`${styles.modalParticipateButton} ${
                    markedEvents.includes(selectedEvent.id) ? styles.modalConfirmed : ''
                  } ${selectedEvent.isPaid && !markedEvents.includes(selectedEvent.id) ? styles.modalPaid : ''}`}
                  onClick={() => {
                    setSelectedEvent(null);
                    handleParticipate(selectedEvent);
                  }}
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
    </div>
  );
};

export default EventsPage;
```

### EventsPage.module.css

```css
.container {
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.eventsList {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.eventCard {
  background: linear-gradient(135deg, #58417d 0%, #6B32C3 100%);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.eventCard:hover {
  transform: scale(1.02);
}

.eventImage {
  width: 240px;
  height: 160px;
  object-fit: cover;
}

.eventContent {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.eventHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.eventTitle {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  flex: 1;
}

.priceBadge {
  background-color: #FFA500;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
}

.eventDescription {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.eventDetails {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin-bottom: 16px;
}

.eventDetails p {
  margin: 4px 0;
}

.buttonGroup {
  display: flex;
  gap: 16px;
  margin-top: auto;
}

.infoButton {
  background-color: #8C43FF;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
}

.infoButton:hover {
  background-color: #9955FF;
}

.participateButton {
  background-color: rgba(255, 255, 255, 0.8);
  color: #8C43FF;
  border: 1px solid #8C43FF;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.participateButton:hover {
  background-color: #ffffff;
}

.participateButton.confirmed {
  background-color: #22C55E;
  color: #ffffff;
  border-color: #22C55E;
  cursor: default;
}

.participateButton.paid {
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
  color: #ffffff;
  border: none;
}

.participateButton.paid:hover {
  background: linear-gradient(135deg, #FFB700 0%, #FFA500 100%);
}

/* Modal Styles */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
}

.modalContent {
  background: linear-gradient(135deg, #58417d 0%, #6B32C3 100%);
  border-radius: 24px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid rgba(140, 67, 255, 0.4);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #8C43FF;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.closeButton:hover {
  background-color: #9955FF;
}

.modalTitle {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  margin-top: 40px;
}

.modalImage {
  width: 100%;
  height: 256px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 24px;
}

.modalDescription {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.modalDetails {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  margin-bottom: 24px;
}

.modalDetails p {
  margin: 6px 0;
}

.modalPrice {
  color: #FFD700;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
}

.modalParticipateButton {
  width: 100%;
  background-color: #8C43FF;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modalParticipateButton:hover {
  background-color: #9955FF;
  transform: scale(1.02);
}

.modalParticipateButton.modalConfirmed {
  background-color: #22C55E;
  cursor: not-allowed;
}

.modalParticipateButton.modalConfirmed:hover {
  transform: none;
}

.modalParticipateButton.modalPaid {
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
}

.modalParticipateButton.modalPaid:hover {
  background: linear-gradient(135deg, #FFB700 0%, #FFA500 100%);
}

.modalParticipateButton:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ============================================
   RESPONSIVIDADE MOBILE (< 768px)
   ============================================ */
@media (max-width: 767px) {
  .content {
    padding: 16px;
  }

  .eventsList {
    gap: 20px;
  }

  .eventCard {
    flex-direction: column;
  }

  .eventImage {
    width: 100%;
    height: 200px;
  }

  .eventContent {
    padding: 16px;
  }

  .eventTitle {
    font-size: 20px;
  }

  .priceBadge {
    font-size: 10px;
    padding: 4px 10px;
  }

  .eventDescription {
    font-size: 13px;
  }

  .buttonGroup {
    flex-direction: column;
    gap: 12px;
  }

  .infoButton,
  .participateButton {
    width: 100%;
  }

  .modalContent {
    padding: 20px;
    max-height: 85vh;
  }

  .modalTitle {
    font-size: 24px;
    margin-top: 32px;
  }

  .modalImage {
    height: 200px;
  }

  .modalDescription {
    font-size: 14px;
  }

  .modalDetails {
    font-size: 13px;
  }

  .closeButton {
    top: 12px;
    right: 12px;
    padding: 6px 14px;
    font-size: 13px;
  }
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .eventImage {
    width: 200px;
  }

  .eventTitle {
    font-size: 22px;
  }

  .buttonGroup {
    flex-direction: column;
  }
}
```

---

## Recursos implementados

✅ **Lista de eventos responsiva** com cards horizontais (desktop) e verticais (mobile)  
✅ **Sistema de marcação de presença** (estado local)  
✅ **Badges de eventos pagos** com preço destacado  
✅ **Modal de detalhes** com overlay e backdrop blur  
✅ **Botões contextuais** (gratuito, pago, confirmado)  
✅ **Formatação de datas** em português brasileiro  
✅ **Imagens responsivas** com object-fit  
✅ **Gradientes vibrantes** no tema roxo (#58417d)  
✅ **Animações de hover** e transições suaves  
✅ **Suporte completo mobile/tablet/desktop**  

## Breakpoints

- **Mobile**: < 768px (celulares)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Próximos passos recomendados

Para integrar na versão app:
1. Conectar com backend real para buscar eventos
2. Implementar sistema de pagamento (Stripe, PagSeguro, etc.)
3. Adicionar autenticação de usuário
4. Sincronizar presenças confirmadas com servidor
5. Notificações push para lembretes de eventos

Escolha a versão que melhor se adapta à sua stack! 🚀
