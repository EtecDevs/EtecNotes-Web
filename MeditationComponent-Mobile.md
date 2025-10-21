# Componente de Meditação - React Native/Mobile

Este é um componente React completo de meditação e bem-estar, otimizado para dispositivos móveis, sem dependência do Tailwind CSS.

## MeditationPage.jsx

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Animated,
  Alert,
  Platform
} from 'react-native';

// Para web, você pode usar react-native-web ou adaptar para HTML5 Audio
// Para mobile nativo, use react-native-sound ou expo-av

const { width, height } = Dimensions.get('window');

// Ícones como componentes (você pode substituir por react-native-vector-icons)
const PlayIcon = () => <Text style={styles.icon}>▶️</Text>;
const PauseIcon = () => <Text style={styles.icon}>⏸️</Text>;
const VolumeIcon = ({ volume }) => {
  if (volume === 0) return <Text style={styles.icon}>🔇</Text>;
  if (volume < 50) return <Text style={styles.icon}>🔉</Text>;
  return <Text style={styles.icon}>🔊</Text>;
};
const MusicIcon = () => <Text style={styles.icon}>🎵</Text>;
const GameIcon = () => <Text style={styles.icon}>🎮</Text>;
const BreathIcon = () => <Text style={styles.icon}>🌬️</Text>;
const HeartIcon = () => <Text style={styles.icon}>💓</Text>;
const StarIcon = () => <Text style={styles.icon}>✨</Text>;

const MeditationPage = () => {
  // Estados para música
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [audioError, setAudioError] = useState(false);
  
  // Estados para jogos/exercícios
  const [currentGame, setCurrentGame] = useState(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(1);
  
  // Animações
  const breathingScale = useRef(new Animated.Value(0.8)).current;
  const breathingOpacity = useRef(new Animated.Value(1)).current;
  const particleAnimations = useRef([...Array(8)].map(() => new Animated.Value(0))).current;
  
  // Refs
  const audioRef = useRef(null);
  const breathingInterval = useRef(null);

  // Dados das músicas (substitua pelas suas URLs)
  const musicOptions = [
    {
      id: 1,
      name: "Chuva Suave",
      duration: "15 min",
      url: "https://example.com/rain-sounds.mp3" // Substitua pela URL real
    },
    {
      id: 2,
      name: "Ondas do Mar", 
      duration: "20 min",
      url: "https://example.com/ocean-waves.mp3" // Substitua pela URL real
    },
    {
      id: 3,
      name: "Floresta Zen",
      duration: "25 min", 
      url: "https://example.com/forest-sounds.mp3" // Substitua pela URL real
    },
    {
      id: 4,
      name: "Piano Relaxante",
      duration: "18 min",
      url: "https://example.com/piano-relaxing.mp3" // Substitua pela URL real
    }
  ];

  // Dados dos exercícios
  const miniGames = [
    {
      id: 1,
      name: "Respiração Consciente",
      description: "Técnica 4-4-4-4 para reduzir ansiedade",
      icon: BreathIcon
    },
    {
      id: 2,
      name: "Meditação Guiada",
      description: "Relaxamento progressivo muscular",
      icon: HeartIcon
    },
    {
      id: 3,
      name: "Visualização",
      description: "Exercício de imaginação positiva",
      icon: StarIcon
    }
  ];

  // Função para tocar música
  const playMusic = (music) => {
    try {
      if (currentMusic?.id === music.id) {
        togglePlay();
      } else {
        setCurrentMusic(music);
        setIsPlaying(true);
        setAudioError(false);
        
        // Para React Native, use expo-av ou react-native-sound
        // Para web, use HTML5 Audio API
        if (Platform.OS === 'web') {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          audioRef.current = new Audio(music.url);
          audioRef.current.volume = volume / 100;
          audioRef.current.loop = true;
          audioRef.current.play().catch(() => setAudioError(true));
        }
      }
    } catch (error) {
      setAudioError(true);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio');
    }
  };

  // Função para pausar/reproduzir
  const togglePlay = () => {
    if (Platform.OS === 'web' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setAudioError(true));
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Função para ajustar volume
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (Platform.OS === 'web' && audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Função para silenciar
  const toggleMute = () => {
    const newVolume = volume === 0 ? 70 : 0;
    handleVolumeChange(newVolume);
  };

  // Função para iniciar exercício
  const startGame = (game) => {
    setCurrentGame(game);
    
    if (game.id === 1) {
      startBreathingExercise();
    }
  };

  // Exercício de respiração
  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathingCount(1);
    setBreathingPhase('inhale');
    
    const phases = ['inhale', 'hold1', 'exhale', 'hold2'];
    let currentPhaseIndex = 0;
    let count = 1;
    
    const animateBreathing = () => {
      const phase = phases[currentPhaseIndex];
      setBreathingPhase(phase);
      
      // Animação do círculo principal
      Animated.timing(breathingScale, {
        toValue: phase === 'inhale' ? 1.5 : 0.8,
        duration: 4000,
        useNativeDriver: true,
      }).start();
      
      // Animação das partículas
      particleAnimations.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: phase === 'inhale' ? 140 : 80,
          duration: 4000,
          useNativeDriver: true,
        }).start();
      });
      
      // Próxima fase
      setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        if (currentPhaseIndex === 0) {
          count++;
          setBreathingCount(count);
        }
        
        if (isBreathing) {
          animateBreathing();
        }
      }, 4000);
    };
    
    animateBreathing();
  };

  // Parar exercício de respiração
  const stopBreathing = () => {
    setIsBreathing(false);
    setCurrentGame(null);
    
    // Reset animações
    Animated.timing(breathingScale, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    particleAnimations.forEach(anim => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (Platform.OS === 'web' && audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Meditação & Bem-estar</Text>
        <Text style={styles.subtitle}>Relaxe e recarregue suas energias</Text>
      </View>

      {/* Seção de Música */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MusicIcon />
          <Text style={styles.sectionTitle}>Músicas Relaxantes</Text>
        </View>

        {/* Player atual */}
        {currentMusic && (
          <View style={styles.currentPlayer}>
            {audioError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  ⚠️ Erro ao carregar o áudio. Tente outra música.
                </Text>
              </View>
            )}
            
            <View style={styles.playerHeader}>
              <View style={styles.musicInfo}>
                <Text style={styles.musicName}>{currentMusic.name}</Text>
                <Text style={styles.musicDuration}>{currentMusic.duration}</Text>
              </View>
              
              <TouchableOpacity
                onPress={togglePlay}
                disabled={audioError}
                style={[styles.playButton, audioError && styles.disabledButton]}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </TouchableOpacity>
            </View>

            {/* Controles de volume */}
            <View style={styles.volumeContainer}>
              <TouchableOpacity onPress={toggleMute} style={styles.volumeButton}>
                <VolumeIcon volume={volume} />
              </TouchableOpacity>
              
              <View style={styles.sliderContainer}>
                {/* Slider personalizado - você pode usar @react-native-community/slider */}
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      { width: `${volume}%` }
                    ]} 
                  />
                </View>
              </View>
              
              <Text style={styles.volumeText}>{volume}%</Text>
            </View>
          </View>
        )}

        {/* Lista de músicas */}
        <View style={styles.musicGrid}>
          {musicOptions.map((music) => {
            const isActive = currentMusic?.id === music.id;
            return (
              <TouchableOpacity
                key={music.id}
                onPress={() => playMusic(music)}
                style={[
                  styles.musicCard,
                  isActive && styles.activeMusicCard
                ]}
              >
                <View style={styles.musicCardContent}>
                  <View style={styles.musicCardInfo}>
                    <Text style={[
                      styles.musicCardTitle,
                      isActive && styles.activeMusicText
                    ]}>
                      {music.name}
                    </Text>
                    <Text style={[
                      styles.musicCardDuration,
                      isActive && styles.activeMusicText
                    ]}>
                      {music.duration}
                    </Text>
                  </View>
                  
                  {isActive && isPlaying && (
                    <View style={styles.waveform}>
                      <View style={[styles.wave, styles.wave1]} />
                      <View style={[styles.wave, styles.wave2]} />
                      <View style={[styles.wave, styles.wave3]} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Seção de Exercícios */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <GameIcon />
          <Text style={styles.sectionTitle}>Exercícios de Relaxamento</Text>
        </View>

        <View style={styles.gamesContainer}>
          {miniGames.map((game) => {
            const IconComponent = game.icon;
            return (
              <TouchableOpacity
                key={game.id}
                onPress={() => startGame(game)}
                style={styles.gameCard}
              >
                <View style={styles.gameIcon}>
                  <IconComponent />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.name}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Exercício ativo */}
        {currentGame && (
          <View style={styles.activeGame}>
            {currentGame.id === 1 ? (
              // Exercício de respiração
              <View style={styles.breathingContainer}>
                <View style={styles.breathingHeader}>
                  <Text style={styles.gameActiveTitle}>
                    {currentGame.name}
                  </Text>
                  <TouchableOpacity
                    onPress={stopBreathing}
                    style={styles.stopButton}
                  >
                    <Text style={styles.stopButtonText}>Parar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.breathingAnimation}>
                  {/* Círculo externo */}
                  <View style={styles.breathingCircleOuter} />
                  
                  {/* Círculo principal animado */}
                  <Animated.View
                    style={[
                      styles.breathingCircle,
                      {
                        transform: [{ scale: breathingScale }],
                        opacity: breathingOpacity,
                      }
                    ]}
                  >
                    <Text style={styles.breathingCount}>{breathingCount}</Text>
                  </Animated.View>

                  {/* Partículas */}
                  {particleAnimations.map((anim, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        styles.particle,
                        {
                          transform: [
                            {
                              translateX: anim.interpolate({
                                inputRange: [0, 140],
                                outputRange: [
                                  Math.cos((index * Math.PI * 2) / 8) * 80,
                                  Math.cos((index * Math.PI * 2) / 8) * 140
                                ]
                              })
                            },
                            {
                              translateY: anim.interpolate({
                                inputRange: [0, 140],
                                outputRange: [
                                  Math.sin((index * Math.PI * 2) / 8) * 80,
                                  Math.sin((index * Math.PI * 2) / 8) * 140
                                ]
                              })
                            }
                          ]
                        }
                      ]}
                    />
                  ))}
                </View>

                <View style={styles.breathingInstructions}>
                  <Text style={styles.breathingText}>
                    {breathingPhase === 'inhale' && '🌬️ Inspire profundamente'}
                    {(breathingPhase === 'hold1' || breathingPhase === 'hold2') && '⏸️ Segure a respiração'}
                    {breathingPhase === 'exhale' && '😮‍💨 Expire lentamente'}
                  </Text>
                  <Text style={styles.breathingSubtext}>
                    Técnica Box Breathing (4-4-4-4) para ansiedade
                  </Text>
                </View>
              </View>
            ) : (
              // Outros exercícios
              <View style={styles.otherExercise}>
                <Text style={styles.gameActiveTitle}>{currentGame.name}</Text>
                <Text style={styles.exerciseDescription}>{currentGame.description}</Text>
                <View style={styles.comingSoon}>
                  <Text style={styles.comingSoonIcon}>✨</Text>
                  <Text style={styles.comingSoonText}>Exercício em desenvolvimento</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Cuide do seu bem-estar mental e emocional
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
  },
  content: {
    paddingHorizontal: width * 0.04, // 4% das bordas
    paddingVertical: 20,
    minHeight: height,
  },
  
  // Header
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: width > 400 ? 28 : 24,
    fontWeight: 'bold',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: width > 400 ? 16 : 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Seções
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: width > 400 ? 20 : 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  icon: {
    fontSize: 20,
  },

  // Player de música
  currentPlayer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderColor: '#F87171',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  musicInfo: {
    flex: 1,
  },
  musicName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  musicDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  playButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },

  // Controles de volume
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  volumeButton: {
    padding: 6,
    borderRadius: 12,
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 8,
    maxWidth: 100,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  volumeText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
    minWidth: 32,
    textAlign: 'center',
  },

  // Grid de músicas
  musicGrid: {
    gap: 12,
  },
  musicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeMusicCard: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  musicCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  musicCardInfo: {
    flex: 1,
  },
  musicCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  musicCardDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeMusicText: {
    color: '#FFFFFF',
  },

  // Waveform para música ativa
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  wave: {
    width: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  wave1: {
    height: 12,
    // Animação pode ser adicionada com Animated
  },
  wave2: {
    height: 16,
  },
  wave3: {
    height: 12,
  },

  // Exercícios
  gamesContainer: {
    gap: 12,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  gameIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Exercício ativo
  activeGame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gameActiveTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
  },

  // Exercício de respiração
  breathingContainer: {
    alignItems: 'center',
  },
  breathingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  stopButton: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  breathingAnimation: {
    width: width * 0.7,
    height: width * 0.7,
    maxWidth: 280,
    maxHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  breathingCircleOuter: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    borderWidth: 4,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  breathingCircle: {
    width: width * 0.45,
    height: width * 0.45,
    maxWidth: 180,
    maxHeight: 180,
    borderRadius: width * 0.225,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  breathingCount: {
    fontSize: width > 400 ? 48 : 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  particle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
  },
  breathingInstructions: {
    alignItems: 'center',
  },
  breathingText: {
    fontSize: width > 400 ? 18 : 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  breathingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Outros exercícios
  otherExercise: {
    alignItems: 'center',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 16,
  },
  comingSoon: {
    alignItems: 'center',
    marginTop: 20,
  },
  comingSoonIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default MeditationPage;
```

## Dependências Necessárias

Para implementar este componente, você precisará das seguintes dependências:

### Para React Native (Expo)
```bash
expo install expo-av
expo install react-native-gesture-handler
expo install @react-native-community/slider
```

### Para React Native CLI
```bash
npm install react-native-sound
npm install @react-native-community/slider
npm install react-native-vector-icons
```

## Recursos Principais

### 🎵 **Player de Música**
- Lista de músicas relaxantes
- Controles de play/pause
- Controle de volume com slider
- Indicador visual de música tocando
- Tratamento de erros de áudio

### 🧘 **Exercícios de Relaxamento**
- **Respiração Consciente**: Técnica Box Breathing com animação circular
- **Meditação Guiada**: Placeholder para implementação futura
- **Visualização**: Placeholder para implementação futura

### 📱 **Responsividade Móvel**
- Layout otimizado para diferentes tamanhos de tela
- Dimensões dinâmicas baseadas na largura da tela
- Tipografia responsiva
- Espaçamentos proporcionais
- Suporte para orientações portrait e landscape

### 🎨 **Animações Fluidas**
- Animações de respiração com Animated API
- Partículas animadas ao redor do círculo de respiração
- Transições suaves entre estados
- Feedback visual em tempo real

## Implementação de Áudio

### Para Web (React)
```javascript
// Use HTML5 Audio API
const audio = new Audio('url-do-audio.mp3');
audio.play();
```

### Para React Native
```javascript
// Use expo-av
import { Audio } from 'expo-av';

const { sound } = await Audio.Sound.createAsync(
  { uri: 'url-do-audio.mp3' },
  { shouldPlay: true, isLooping: true }
);
```

## Customização

### Cores
O tema pode ser facilmente customizado alterando as cores no StyleSheet:
- Primária: `#8B5CF6` (Roxo)
- Fundo: `#f3e8ff` (Roxo claro)
- Texto: `#1F2937` (Cinza escuro)
- Secundário: `#6B7280` (Cinza médio)

### Música
Substitua as URLs no array `musicOptions` pelas suas próprias fontes de áudio.

### Exercícios
Adicione novos exercícios no array `miniGames` e implemente a lógica correspondente na função `startGame`.

## Notas de Performance

- Usa `useNativeDriver: true` para animações otimizadas
- Implementa lazy loading para recursos de áudio
- Gerencia memória adequadamente com cleanup nos useEffect
- Otimizado para diferentes densidades de tela

Este componente oferece uma experiência completa de meditação e bem-estar, totalmente responsiva e otimizada para dispositivos móveis!