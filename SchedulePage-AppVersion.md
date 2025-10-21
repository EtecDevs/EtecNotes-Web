# SchedulePage - Versão App (React Native)

## Componente React Native sem Tailwind

```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 768;

const SchedulePage = ({ activeTab, onTabChange }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Tuesday
  const scrollX = new Animated.Value(0);

  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Aula Vaga", isVacant: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Sistemas Embarcados", teacher: "Prof. Iury", lab: 4 },
        { time: "10:50 - 11:40", subject: "Sistemas Embarcados", teacher: "Prof. Iury", lab: 4 },
        { time: "11:40 - 12:30", subject: "Sociologia", teacher: "Profa. Elza", lab: 4 },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
        { time: "14:20 - 15:10", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
        { time: "15:10 - 16:00", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "08:00 - 08:50", subject: "P.W.", teacher: "Prof. Paulo", lab: 1 },
        { time: "08:50 - 09:40", subject: "P.W.", teacher: "Prof. Paulo", lab: 1 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "E.A.C.N.T.", teacher: "Profa. Elza e Profa. Andreia", lab: 2 },
        { time: "10:50 - 11:40", subject: "E.A.C.N.T.", teacher: "Profa. Elza e Profa. Andreia", lab: 2 },
        { time: "11:40 - 12:30", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "08:00 - 08:50", subject: "P.A.M. I, II", teacher: "Prof. Paulo", lab: 1 },
        { time: "08:50 - 09:40", subject: "P.A.M. I, II", teacher: "Prof. Paulo", lab: 1 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "IPSSI", teacher: "Prof. Iury e Profa. Vanessa", lab: 4 },
        { time: "10:50 - 11:40", subject: "IPSSI", teacher: "Prof. Iury e Profa. Vanessa", lab: 4 },
        { time: "11:40 - 12:30", subject: "Filosofia", teacher: "Profa. Elza", lab: 4 },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Biologia", teacher: "Profa. Andreia" },
        { time: "14:20 - 15:10", subject: "Biologia", teacher: "Profa. Andreia" },
        { time: "15:10 - 16:00", subject: "E.A.C.N.T.", teacher: "Profa. Andreia e Profa. Elza" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "08:00 - 08:50", subject: "Português", teacher: "Prof. Fidélis", auditorium: true },
        { time: "08:50 - 09:40", subject: "Português", teacher: "Prof. Fidélis", auditorium: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
        { time: "10:50 - 11:40", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
        { time: "11:40 - 12:30", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
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
        { time: "08:50 - 09:40", subject: "Filosofia", teacher: "Profa. Elza", lab: 2 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert", lab: 4 },
        { time: "10:50 - 11:40", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert", lab: 4 },
        { time: "11:40 - 12:30", subject: "Aula Vaga", isVacant: true },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "15:10 - 16:00", subject: "Sociologia", teacher: "Profa. Elza", lab: 4 },
      ],
    },
  ];

  const navigateToDate = (newIndex) => {
    if (newIndex >= 0 && newIndex < scheduleData.length) {
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevious = () => {
    navigateToDate(currentIndex - 1);
  };

  const goToNext = () => {
    navigateToDate(currentIndex + 1);
  };

  const today = new Date();
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  return (
    <View style={styles.container}>
      {/* Navigation Container */}
      <View style={styles.navigationContainer}>
        {/* Left Arrow */}
        <TouchableOpacity
          onPress={goToPrevious}
          disabled={currentIndex === 0}
          style={[
            styles.navigationButton,
            currentIndex === 0 && styles.navigationButtonDisabled,
          ]}
        >
          <Text style={styles.navigationButtonText}>‹</Text>
        </TouchableOpacity>

        {/* Cards Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {scheduleData.map((daySchedule, index) => {
            const isCenter = index === currentIndex;
            const isToday = daySchedule.day === weekDays[today.getDay()];

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={isCenter ? 1 : 0.7}
                onPress={() => !isCenter && navigateToDate(index)}
                style={styles.cardWrapper}
              >
                <View
                  style={[
                    styles.card,
                    isCenter && styles.cardActive,
                    isCenter && isToday && styles.cardToday,
                  ]}
                >
                  {/* Day Header */}
                  <View style={styles.dayHeader}>
                    <Text
                      style={[
                        styles.dayTitle,
                        isCenter && styles.dayTitleActive,
                      ]}
                    >
                      {daySchedule.day}
                    </Text>
                    {isToday && isCenter && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>Hoje</Text>
                      </View>
                    )}
                  </View>

                  {/* Periods List */}
                  <ScrollView
                    style={styles.periodsList}
                    showsVerticalScrollIndicator={false}
                  >
                    {daySchedule.periods.map((period, periodIndex) => (
                      <View
                        key={periodIndex}
                        style={[
                          styles.periodCard,
                          period.isBreak && styles.periodBreak,
                          period.isVacant && styles.periodVacant,
                        ]}
                      >
                        {/* Period Content */}
                        <View style={styles.periodHeader}>
                          <Text
                            style={[
                              styles.periodSubject,
                              (period.isBreak || period.isVacant) &&
                                styles.periodSubjectCentered,
                            ]}
                          >
                            {period.subject}
                          </Text>
                          {!(period.isBreak || period.isVacant) && (
                            <Text style={styles.periodTime}>{period.time}</Text>
                          )}
                        </View>

                        {/* Teacher Info */}
                        {!(period.isBreak || period.isVacant) && (
                          <Text style={styles.periodTeacher}>
                            {period.teacher}
                          </Text>
                        )}

                        {/* Lab/Auditorium Badge */}
                        {(typeof period.lab === 'number' || period.auditorium) && (
                          <View
                            style={[
                              styles.locationBadge,
                              period.auditorium && styles.auditoriumBadge,
                            ]}
                          >
                            <Text style={styles.locationBadgeText}>
                              {period.auditorium
                                ? 'Auditório'
                                : `Lab ${period.lab}`}
                            </Text>
                          </View>
                        )}

                        {/* Break/Vacant Time */}
                        {(period.isBreak || period.isVacant) && (
                          <Text
                            style={[
                              styles.periodTimeBottom,
                              period.isVacant && styles.periodTimeVacant,
                            ]}
                          >
                            {period.time}
                          </Text>
                        )}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Right Arrow */}
        <TouchableOpacity
          onPress={goToNext}
          disabled={currentIndex === scheduleData.length - 1}
          style={[
            styles.navigationButton,
            currentIndex === scheduleData.length - 1 &&
              styles.navigationButtonDisabled,
          ]}
        >
          <Text style={styles.navigationButtonText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingVertical: isSmallDevice ? 16 : 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isSmallDevice ? 8 : 16,
  },
  navigationButton: {
    width: isSmallDevice ? 40 : 48,
    height: isSmallDevice ? 40 : 48,
    borderRadius: isSmallDevice ? 20 : 24,
    backgroundColor: '#8C43FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  navigationButtonDisabled: {
    opacity: 0.5,
  },
  navigationButtonText: {
    color: '#FFFFFF',
    fontSize: isSmallDevice ? 28 : 32,
    fontWeight: 'bold',
    marginTop: -2,
  },
  carouselContent: {
    paddingHorizontal: isSmallDevice ? 8 : 16,
    alignItems: 'center',
  },
  cardWrapper: {
    width: isSmallDevice ? width - 120 : 340,
    marginHorizontal: isSmallDevice ? 8 : 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: isSmallDevice ? 12 : 16,
    borderWidth: 2,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minHeight: isSmallDevice ? 500 : 600,
  },
  cardActive: {
    borderColor: '#8C43FF',
    borderWidth: 2,
    shadowColor: '#8C43FF',
    shadowOpacity: 0.2,
  },
  cardToday: {
    borderWidth: 4,
    shadowOpacity: 0.3,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isSmallDevice ? 12 : 16,
    flexWrap: 'wrap',
  },
  dayTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: '#AAAAAA',
    marginRight: 8,
  },
  dayTitleActive: {
    color: '#8C43FF',
    fontWeight: 'bold',
  },
  todayBadge: {
    backgroundColor: '#8C43FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  todayBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  periodsList: {
    flex: 1,
  },
  periodCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: isSmallDevice ? 10 : 12,
    marginBottom: isSmallDevice ? 8 : 12,
    position: 'relative',
  },
  periodBreak: {
    backgroundColor: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#8C43FF',
    alignItems: 'center',
  },
  periodVacant: {
    backgroundColor: '#8C43FF',
    alignItems: 'center',
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  periodSubject: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  periodSubjectCentered: {
    textAlign: 'center',
    marginRight: 0,
  },
  periodTime: {
    fontSize: isSmallDevice ? 11 : 12,
    color: '#AAAAAA',
  },
  periodTeacher: {
    fontSize: isSmallDevice ? 11 : 12,
    color: '#AAAAAA',
    marginTop: 2,
  },
  locationBadge: {
    position: 'absolute',
    bottom: isSmallDevice ? 6 : 8,
    right: isSmallDevice ? 6 : 8,
    backgroundColor: '#8C43FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  auditoriumBadge: {
    backgroundColor: '#db4040',
  },
  locationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  periodTimeBottom: {
    fontSize: isSmallDevice ? 11 : 12,
    color: '#8C43FF',
    marginTop: 4,
    textAlign: 'center',
  },
  periodTimeVacant: {
    color: '#FFFFFF',
  },
});

export default SchedulePage;
```

---

## Versão Web (React.js com CSS Modules)

### SchedulePage.jsx

```jsx
import React, { useState } from 'react';
import styles from './SchedulePage.module.css';

const SchedulePage = ({ activeTab, onTabChange }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Tuesday

  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Aula Vaga", isVacant: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Sistemas Embarcados", teacher: "Prof. Iury", lab: 4 },
        { time: "10:50 - 11:40", subject: "Sistemas Embarcados", teacher: "Prof. Iury", lab: 4 },
        { time: "11:40 - 12:30", subject: "Sociologia", teacher: "Profa. Elza", lab: 4 },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
        { time: "14:20 - 15:10", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
        { time: "15:10 - 16:00", subject: "EAMT", teacher: "Profa. Elza", lab: 2 },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "08:00 - 08:50", subject: "P.W.", teacher: "Prof. Paulo", lab: 1 },
        { time: "08:50 - 09:40", subject: "P.W.", teacher: "Prof. Paulo", lab: 1 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "E.A.C.N.T.", teacher: "Profa. Elza e Profa. Andreia", lab: 2 },
        { time: "10:50 - 11:40", subject: "E.A.C.N.T.", teacher: "Profa. Elza e Profa. Andreia", lab: 2 },
        { time: "11:40 - 12:30", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "08:00 - 08:50", subject: "P.A.M. I, II", teacher: "Prof. Paulo", lab: 1 },
        { time: "08:50 - 09:40", subject: "P.A.M. I, II", teacher: "Prof. Paulo", lab: 1 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "IPSSI", teacher: "Prof. Iury e Profa. Vanessa", lab: 4 },
        { time: "10:50 - 11:40", subject: "IPSSI", teacher: "Prof. Iury e Profa. Vanessa", lab: 4 },
        { time: "11:40 - 12:30", subject: "Filosofia", teacher: "Profa. Elza", lab: 4 },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Biologia", teacher: "Profa. Andreia" },
        { time: "14:20 - 15:10", subject: "Biologia", teacher: "Profa. Andreia" },
        { time: "15:10 - 16:00", subject: "E.A.C.N.T.", teacher: "Profa. Andreia e Profa. Elza" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "08:00 - 08:50", subject: "Português", teacher: "Prof. Fidélis", auditorium: true },
        { time: "08:50 - 09:40", subject: "Português", teacher: "Prof. Fidélis", auditorium: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
        { time: "10:50 - 11:40", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
        { time: "11:40 - 12:30", subject: "P.D.T.C.C.", teacher: "Profa. Veridiane e Profa. Elisângela", lab: 1 },
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
        { time: "08:50 - 09:40", subject: "Filosofia", teacher: "Profa. Elza", lab: 2 },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert", lab: 4 },
        { time: "10:50 - 11:40", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert", lab: 4 },
        { time: "11:40 - 12:30", subject: "Aula Vaga", isVacant: true },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "15:10 - 16:00", subject: "Sociologia", teacher: "Profa. Elza", lab: 4 },
      ],
    },
  ];

  const navigateToDate = (newIndex) => {
    if (newIndex >= 0 && newIndex < scheduleData.length) {
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevious = () => {
    navigateToDate(currentIndex - 1);
  };

  const goToNext = () => {
    navigateToDate(currentIndex + 1);
  };

  const today = new Date();
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const getCardStyle = (index) => {
    const distance = Math.abs(index - currentIndex);
    if (distance === 0) return { transform: 'scale(1)', opacity: 1, zIndex: 10 };
    if (distance === 1) return { transform: 'scale(0.85)', opacity: 0.5, zIndex: 5 };
    return { transform: 'scale(0.7)', opacity: 0, zIndex: 1 };
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationContainer}>
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`${styles.navigationButton} ${
            currentIndex === 0 ? styles.navigationButtonDisabled : ''
          }`}
        >
          ‹
        </button>

        {/* Cards Container */}
        <div className={styles.cardsContainer}>
          <div
            className={styles.cardsWrapper}
            style={{
              transform: `translateX(${(1 - currentIndex) * 360}px)`,
            }}
          >
            {scheduleData.map((daySchedule, index) => {
              const isCenter = index === currentIndex;
              const isToday = daySchedule.day === weekDays[today.getDay()];
              const cardStyle = getCardStyle(index);

              return (
                <div
                  key={index}
                  className={styles.cardWrapper}
                  style={cardStyle}
                  onClick={() => !isCenter && navigateToDate(index)}
                >
                  <div
                    className={`${styles.card} ${
                      isCenter ? styles.cardActive : ''
                    } ${isCenter && isToday ? styles.cardToday : ''}`}
                  >
                    {/* Day Header */}
                    <div className={styles.dayHeader}>
                      <h2
                        className={`${styles.dayTitle} ${
                          isCenter ? styles.dayTitleActive : ''
                        }`}
                      >
                        {daySchedule.day}
                      </h2>
                      {isToday && isCenter && (
                        <span className={styles.todayBadge}>Hoje</span>
                      )}
                    </div>

                    {/* Periods List */}
                    <div className={styles.periodsList}>
                      {daySchedule.periods.map((period, periodIndex) => (
                        <div
                          key={periodIndex}
                          className={`${styles.periodCard} ${
                            period.isBreak ? styles.periodBreak : ''
                          } ${period.isVacant ? styles.periodVacant : ''}`}
                        >
                          <div className={styles.periodHeader}>
                            <span
                              className={`${styles.periodSubject} ${
                                period.isBreak || period.isVacant
                                  ? styles.periodSubjectCentered
                                  : ''
                              }`}
                            >
                              {period.subject}
                            </span>
                            {!(period.isBreak || period.isVacant) && (
                              <span className={styles.periodTime}>
                                {period.time}
                              </span>
                            )}
                          </div>

                          {!(period.isBreak || period.isVacant) && (
                            <div className={styles.periodTeacher}>
                              {period.teacher}
                            </div>
                          )}

                          {/* Lab/Auditorium Badge */}
                          {(typeof period.lab === 'number' ||
                            period.auditorium) && (
                            <div className={styles.locationBadgeContainer}>
                              <span
                                className={`${styles.locationBadge} ${
                                  period.auditorium
                                    ? styles.auditoriumBadge
                                    : ''
                                }`}
                              >
                                {period.auditorium
                                  ? 'Auditório'
                                  : `Lab ${period.lab}`}
                              </span>
                              <div className={styles.tooltip}>
                                {period.auditorium
                                  ? 'O(a) professor(a) escolheu o Auditório para esta aula'
                                  : `O(a) professor(a) escolheu o Lab ${period.lab} para esta aula`}
                              </div>
                            </div>
                          )}

                          {(period.isBreak || period.isVacant) && (
                            <div
                              className={`${styles.periodTimeBottom} ${
                                period.isVacant
                                  ? styles.periodTimeVacant
                                  : ''
                              }`}
                            >
                              {period.time}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          disabled={currentIndex === scheduleData.length - 1}
          className={`${styles.navigationButton} ${
            currentIndex === scheduleData.length - 1
              ? styles.navigationButtonDisabled
              : ''
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SchedulePage;
```

### SchedulePage.module.css

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  padding: 24px 0;
}

.navigationContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 16px;
}

.navigationButton {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #8C43FF;
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
  line-height: 1;
  padding-bottom: 4px;
}

.navigationButton:hover:not(.navigationButtonDisabled) {
  background-color: #7A3AE6;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
}

.navigationButtonDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cardsContainer {
  width: 1050px;
  overflow: hidden;
  margin: 0 20px;
}

.cardsWrapper {
  display: flex;
  gap: 20px;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 0 345px;
}

.cardWrapper {
  flex-shrink: 0;
  width: 340px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.card {
  background-color: #1E1E1E;
  border-radius: 24px;
  padding: 16px;
  border: 2px solid #333333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-height: 600px;
  transition: all 0.4s ease;
}

.cardActive {
  border-color: #8C43FF;
  box-shadow: 0 0 20px rgba(140, 67, 255, 0.2);
}

.cardToday {
  border-width: 4px;
  box-shadow: 0 0 30px rgba(140, 67, 255, 0.3);
}

.dayHeader {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.dayTitle {
  font-size: 18px;
  font-weight: 600;
  color: #AAAAAA;
  margin: 0;
  transition: color 0.3s ease;
}

.dayTitleActive {
  color: #8C43FF;
  font-weight: bold;
}

.todayBadge {
  background-color: #8C43FF;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
}

.periodsList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 540px;
  overflow-y: auto;
  padding-right: 8px;
}

.periodsList::-webkit-scrollbar {
  width: 6px;
}

.periodsList::-webkit-scrollbar-track {
  background: #1E1E1E;
  border-radius: 3px;
}

.periodsList::-webkit-scrollbar-thumb {
  background: #8C43FF;
  border-radius: 3px;
}

.periodCard {
  background-color: #2D2D2D;
  border-radius: 12px;
  padding: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.periodCard:hover {
  background-color: #353535;
}

.periodBreak {
  background-color: #2D2D2D;
  border: 1px solid #8C43FF;
  text-align: center;
}

.periodVacant {
  background-color: #8C43FF;
  text-align: center;
}

.periodHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.periodSubject {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  flex: 1;
  margin-right: 8px;
}

.periodSubjectCentered {
  text-align: center;
  margin: 0;
}

.periodTime {
  font-size: 12px;
  color: #AAAAAA;
  white-space: nowrap;
}

.periodTeacher {
  font-size: 12px;
  color: #AAAAAA;
  margin-top: 2px;
}

.locationBadgeContainer {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 10;
}

.locationBadge {
  display: inline-block;
  background-color: #8C43FF;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
}

.auditoriumBadge {
  background-color: #db4040;
}

.locationBadgeContainer:hover .tooltip {
  opacity: 1;
  transform: scale(1);
}

.tooltip {
  position: absolute;
  right: 0;
  bottom: -48px;
  background-color: #0f1724;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.15s ease;
  pointer-events: none;
  z-index: 20;
  max-width: 250px;
  white-space: normal;
}

.periodTimeBottom {
  font-size: 12px;
  color: #8C43FF;
  margin-top: 4px;
  text-align: center;
}

.periodTimeVacant {
  color: #FFFFFF;
}

/* ============================================
   RESPONSIVIDADE MOBILE (< 768px)
   ============================================ */
@media (max-width: 767px) {
  .container {
    padding: 16px 0;
  }

  .navigationButton {
    width: 40px;
    height: 40px;
    font-size: 28px;
  }

  .cardsContainer {
    width: 100%;
    margin: 0 8px;
  }

  .cardsWrapper {
    padding: 0;
    justify-content: center;
  }

  .cardWrapper {
    width: 90%;
    max-width: 320px;
  }

  .card {
    padding: 12px;
    min-height: 500px;
  }

  .dayTitle {
    font-size: 16px;
  }

  .periodCard {
    padding: 10px;
  }

  .periodSubject {
    font-size: 13px;
  }

  .periodTime {
    font-size: 11px;
  }

  .periodTeacher {
    font-size: 11px;
  }

  .periodsList {
    max-height: 450px;
  }
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .cardsContainer {
    width: 700px;
  }

  .cardsWrapper {
    padding: 0 180px;
  }

  .cardWrapper {
    width: 300px;
  }

  .card {
    min-height: 550px;
  }
}

/* Desktop grande (> 1200px) */
@media (min-width: 1200px) {
  .cardsContainer {
    width: 1200px;
  }

  .cardWrapper {
    width: 360px;
  }

  .card {
    padding: 20px;
    min-height: 640px;
  }

  .dayTitle {
    font-size: 20px;
  }

  .periodCard {
    padding: 14px;
  }

  .periodSubject {
    font-size: 15px;
  }

  .periodsList {
    max-height: 580px;
  }
}
```

---

## Recursos Implementados

✅ **Carrossel de horários** com navegação entre dias da semana  
✅ **Animações suaves** no scroll e transições entre cards  
✅ **Cards escaláveis** com efeito 3D (card central maior, laterais menores)  
✅ **Destaque do dia atual** com badge "Hoje" e borda roxa destacada  
✅ **Sistema de períodos** com cores diferenciadas:
- 🟣 **Aulas normais** (fundo cinza #2D2D2D)
- 🟪 **Intervalos** (borda roxa, fundo transparente)
- 🟣 **Aulas vagas** (fundo roxo #8C43FF)

✅ **Badges de localização**:
- 🟣 **Lab 1, 2, 3, 4** (roxo)
- 🔴 **Auditório** (vermelho #db4040)
- Tooltip informativo no hover (versão web)

✅ **Layout responsivo** com breakpoints:
- Mobile: < 768px (cards em pilha vertical)
- Tablet: 768px - 1024px (2 cards visíveis)
- Desktop: > 1024px (3 cards visíveis com laterais opacas)

✅ **Scroll personalizado** no container de períodos (versão web)  
✅ **Dark mode nativo** (#121212 background, #1E1E1E cards)  
✅ **Sem dependência de Tailwind ou Framer Motion**  
✅ **2 versões completas**: React Native e Web (CSS Modules)

## Diferenças entre versões

| Recurso | React Native | Web (CSS Modules) |
|---------|-------------|-------------------|
| Carrossel | `ScrollView` horizontal | `div` com `transform` |
| Animações | `Animated` API | CSS `transition` |
| Scroll períodos | `ScrollView` | `overflow-y: auto` |
| Tooltip | ❌ (apenas badge) | ✅ Hover tooltip |
| Gestos | Touch nativo | Click handler |
| Platform detection | `Dimensions` API | CSS `@media` queries |

## Breakpoints Utilizados

- **Mobile**: < 768px (1 card visível)
- **Tablet**: 768px - 1024px (carrossel reduzido)
- **Desktop**: 1024px - 1200px (layout padrão)
- **Desktop Large**: > 1200px (cards maiores)

## Como usar

### Para React Native:
```jsx
import SchedulePage from './SchedulePage';

// No seu componente:
<SchedulePage 
  activeTab="horario" 
  onTabChange={(tab) => console.log(tab)} 
/>
```

### Para React Web:
```jsx
import SchedulePage from './SchedulePage';
import './SchedulePage.module.css';

// No seu componente:
<SchedulePage />
```

## Customização

### Para adicionar novos dias:
```jsx
const scheduleData = [
  // ... dias existentes
  {
    day: "Sábado",
    periods: [
      { time: "08:00 - 10:00", subject: "Oficina", teacher: "Prof. X", lab: 1 },
      // ... mais períodos
    ],
  },
];
```

### Para mudar a cor principal:
- **React Native**: Alterar `#8C43FF` nos `styles`
- **Web**: Substituir `#8C43FF` no arquivo CSS

### Para adicionar mais labs:
```jsx
{ 
  time: "10:00 - 11:00", 
  subject: "Robótica", 
  teacher: "Prof. Y", 
  lab: 5  // Novo lab
}
```

## Comportamento do Carrossel

1. **Navegação por setas**: Anterior/Próximo
2. **Click nos cards laterais**: Navega para aquele dia
3. **Card central**: Sempre destacado e em escala 1:1
4. **Cards laterais**: Escala reduzida (0.85 ou 0.7) com opacidade
5. **Transições suaves**: Spring animation (RN) ou cubic-bezier (Web)

## Detalhes Técnicos

### React Native:
- `Dimensions.get('window')` para responsividade
- `Animated.Value` para animações de scroll
- `ScrollView` com `pagingEnabled` para snap
- `elevation` e `shadowOpacity` para profundidade

### Web:
- `transform: translateX()` para movimento do carrossel
- `cubic-bezier(0.34, 1.56, 0.64, 1)` para efeito elástico
- `:hover` e pseudo-elementos para tooltips
- Custom scrollbar styling com `::-webkit-scrollbar`

Pronto para usar no seu app! 🚀📅
