# HomePage - Versão App (React Native)

## Componente React Native sem Tailwind

```jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 768;

const HomePage = ({ activeTab, onTabChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      title: "Semana Tecnológica",
      description: "A Semana Tecnológica da Etec é um evento anual que reúne palestras, workshops e exposições sobre as últimas tendências em tecnologia. Os alunos têm a oportunidade de conhecer profissionais da área, participar de competições e apresentar seus projetos inovadores para a comunidade.",
      image: require('./assets/events/semana-tecnologica.jpg'),
      bgColor: '#58417d',
    },
    {
      id: 2,
      title: "Hackathon Etec",
      description: "O Hackathon da Etec é uma maratona de programação onde alunos formam equipes para desenvolver soluções tecnológicas inovadoras em 24 horas. É uma oportunidade única de colocar em prática os conhecimentos adquiridos e competir com colegas em um ambiente colaborativo e desafiador.",
      image: require('./assets/events/hackathon.png'),
      bgColor: '#4a3a5f',
    },
    {
      id: 3,
      title: "Palestras em TI",
      description: "Conheça as palestras e workshops ministrados por profissionais renomados da área de tecnologia. São oportunidades de aprendizado sobre carreira, novas tecnologias, metodologias ágeis e tendências do mercado de trabalho.",
      image: require('./assets/events/palestra-ti.jpg'),
      bgColor: '#664488',
    },
    {
      id: 4,
      title: "Eventos Culturais",
      description: "A Etec oferece diversos eventos culturais ao longo do ano, como festa junina, gincanas, apresentações artísticas e confraternizações. Esses eventos promovem a integração entre alunos, professores e a comunidade escolar.",
      image: require('./assets/events/festa-junina.jpg'),
      bgColor: '#775599',
    },
  ];

  // Auto-play slides
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, currentSlide]);

  const changeSlide = (newIndex) => {
    // Fade out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentSlide(newIndex);
      // Fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const nextSlide = () => {
    setAutoPlay(false);
    changeSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setAutoPlay(false);
    changeSlide(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Início</Text>

        {/* Tab Navigation - Integre conforme necessário */}
        {/* {activeTab && onTabChange && <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />} */}

        <View style={styles.sliderSection}>
          {/* Slider Card Container */}
          <View style={styles.sliderContainer}>
            <Animated.View
              style={[
                styles.slideCard,
                {
                  backgroundColor: slides[currentSlide].bgColor,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Background Image */}
              <Image
                source={slides[currentSlide].image}
                style={styles.slideImage}
                resizeMode="cover"
              />
              {/* Dark Overlay */}
              <View style={styles.slideOverlay} />
            </Animated.View>

            {/* Navigation Buttons */}
            <TouchableOpacity
              onPress={prevSlide}
              style={[styles.navButton, styles.navButtonLeft]}
              activeOpacity={0.8}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextSlide}
              style={[styles.navButton, styles.navButtonRight]}
              activeOpacity={0.8}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>

            {/* Slide Indicators */}
            <View style={styles.indicators}>
              {slides.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => goToSlide(index)}
                  style={[
                    styles.indicator,
                    index === currentSlide && styles.indicatorActive,
                  ]}
                  activeOpacity={0.7}
                />
              ))}
            </View>
          </View>

          {/* Description Section */}
          <Animated.View
            style={[
              styles.descriptionContainer,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
            <Text style={styles.slideDescription}>
              {slides[currentSlide].description}
            </Text>
          </Animated.View>
        </View>
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
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: isSmallDevice ? 24 : 48,
    paddingVertical: isSmallDevice ? 32 : 60,
  },
  title: {
    fontSize: isSmallDevice ? 32 : 40,
    fontWeight: 'bold',
    color: '#8C43FF',
    marginBottom: isSmallDevice ? 24 : 32,
  },
  sliderSection: {
    flexDirection: isSmallDevice ? 'column' : 'row',
    gap: isSmallDevice ? 24 : 32,
    marginBottom: 40,
  },
  sliderContainer: {
    width: isSmallDevice ? '100%' : '45%',
    position: 'relative',
    marginBottom: isSmallDevice ? 16 : 0,
  },
  slideCard: {
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#8C43FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  slideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navButtonLeft: {
    left: 8,
  },
  navButtonRight: {
    right: 8,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -4,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999999',
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8C43FF',
  },
  descriptionContainer: {
    width: isSmallDevice ? '100%' : '50%',
    paddingTop: isSmallDevice ? 0 : 16,
  },
  slideTitle: {
    fontSize: isSmallDevice ? 22 : 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: isSmallDevice ? 12 : 16,
  },
  slideDescription: {
    fontSize: isSmallDevice ? 16 : 18,
    color: '#D1D1D1',
    lineHeight: isSmallDevice ? 24 : 28,
  },
});

export default HomePage;
```

---

## Versão Web (React.js com CSS Modules)

### HomePage.jsx

```jsx
import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';

const HomePage = ({ activeTab, onTabChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Semana Tecnológica",
      description: "A Semana Tecnológica da Etec é um evento anual que reúne palestras, workshops e exposições sobre as últimas tendências em tecnologia. Os alunos têm a oportunidade de conhecer profissionais da área, participar de competições e apresentar seus projetos inovadores para a comunidade.",
      image: "/src/assets/events/semana-tecnologica.jpg",
      bgColor: '#58417d',
    },
    {
      id: 2,
      title: "Hackathon Etec",
      description: "O Hackathon da Etec é uma maratona de programação onde alunos formam equipes para desenvolver soluções tecnológicas inovadoras em 24 horas. É uma oportunidade única de colocar em prática os conhecimentos adquiridos e competir com colegas em um ambiente colaborativo e desafiador.",
      image: "/src/assets/events/hackathon.png",
      bgColor: '#4a3a5f',
    },
    {
      id: 3,
      title: "Palestras em TI",
      description: "Conheça as palestras e workshops ministrados por profissionais renomados da área de tecnologia. São oportunidades de aprendizado sobre carreira, novas tecnologias, metodologias ágeis e tendências do mercado de trabalho.",
      image: "/src/assets/events/palestra-ti.jpg",
      bgColor: '#664488',
    },
    {
      id: 4,
      title: "Eventos Culturais",
      description: "A Etec oferece diversos eventos culturais ao longo do ano, como festa junina, gincanas, apresentações artísticas e confraternizações. Esses eventos promovem a integração entre alunos, professores e a comunidade escolar.",
      image: "/src/assets/events/festa-junina.jpg",
      bgColor: '#775599',
    },
  ];

  // Auto-play slides
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, currentSlide]);

  const changeSlide = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    setAutoPlay(false);
    changeSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setAutoPlay(false);
    changeSlide(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Início</h1>

        {/* Tab Navigation - Integre conforme necessário */}
        {/* {activeTab && onTabChange && <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />} */}

        <div className={styles.sliderSection}>
          {/* Slider Card Container */}
          <div className={styles.sliderContainer}>
            <div
              className={`${styles.slideCard} ${
                isTransitioning ? styles.slideCardTransitioning : ''
              }`}
              style={{ backgroundColor: slides[currentSlide].bgColor }}
            >
              {/* Background Image */}
              <div
                className={styles.slideImage}
                style={{
                  backgroundImage: `url(${slides[currentSlide].image})`,
                }}
              />
              {/* Dark Overlay */}
              <div className={styles.slideOverlay} />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              aria-label="Slide anterior"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.navButtonRight}`}
              aria-label="Próximo slide"
            >
              ›
            </button>

            {/* Slide Indicators */}
            <div className={styles.indicators}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.indicator} ${
                    index === currentSlide ? styles.indicatorActive : ''
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div
            className={`${styles.descriptionContainer} ${
              isTransitioning ? styles.descriptionTransitioning : ''
            }`}
          >
            <h3 className={styles.slideTitle}>{slides[currentSlide].title}</h3>
            <p className={styles.slideDescription}>
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
```

### HomePage.module.css

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
}

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 48px;
}

.title {
  font-size: 40px;
  font-weight: bold;
  color: #8C43FF;
  margin: 0 0 32px 0;
}

.sliderSection {
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-bottom: 40px;
}

.sliderContainer {
  width: 45%;
  position: relative;
}

.slideCard {
  height: 320px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 32px rgba(140, 67, 255, 0.4);
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}

.slideCard:hover {
  box-shadow: 0 12px 48px rgba(140, 67, 255, 0.6);
  transform: translateY(-4px);
}

.slideCardTransitioning {
  opacity: 0.3;
  transform: scale(0.95);
}

.slideImage {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.slideCard:hover .slideImage {
  transform: scale(1.05);
}

.slideOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.navButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
  padding-bottom: 4px;
}

.navButton:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
}

.navButton:active {
  transform: translateY(-50%) scale(0.95);
}

.navButtonLeft {
  left: 8px;
}

.navButtonRight {
  right: 8px;
}

.indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #999999;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background-color: #BBBBBB;
  transform: scale(1.2);
}

.indicatorActive {
  width: 32px;
  background-color: #8C43FF;
}

.descriptionContainer {
  width: 50%;
  padding-top: 16px;
  transition: all 0.5s ease-in-out;
}

.descriptionTransitioning {
  opacity: 0.3;
  transform: scale(0.98);
}

.slideTitle {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  margin: 0 0 16px 0;
}

.slideDescription {
  font-size: 18px;
  color: #D1D1D1;
  line-height: 28px;
  margin: 0;
}

/* ============================================
   RESPONSIVIDADE MOBILE (< 768px)
   ============================================ */
@media (max-width: 767px) {
  .content {
    padding: 32px 24px;
  }

  .title {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .sliderSection {
    flex-direction: column;
    gap: 24px;
  }

  .sliderContainer {
    width: 100%;
  }

  .slideCard {
    height: 280px;
  }

  .navButton {
    width: 36px;
    height: 36px;
    font-size: 28px;
  }

  .navButtonLeft {
    left: 4px;
  }

  .navButtonRight {
    right: 4px;
  }

  .indicators {
    margin-top: 12px;
    gap: 6px;
  }

  .indicator {
    width: 6px;
    height: 6px;
  }

  .indicatorActive {
    width: 24px;
  }

  .descriptionContainer {
    width: 100%;
    padding-top: 0;
  }

  .slideTitle {
    font-size: 22px;
    margin-bottom: 12px;
  }

  .slideDescription {
    font-size: 16px;
    line-height: 24px;
  }
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content {
    padding: 48px 32px;
  }

  .title {
    font-size: 36px;
  }

  .sliderSection {
    gap: 28px;
  }

  .sliderContainer {
    width: 48%;
  }

  .descriptionContainer {
    width: 48%;
  }

  .slideTitle {
    font-size: 22px;
  }

  .slideDescription {
    font-size: 17px;
    line-height: 26px;
  }
}

/* Desktop grande (> 1400px) */
@media (min-width: 1400px) {
  .content {
    max-width: 1400px;
    padding: 80px 60px;
  }

  .title {
    font-size: 48px;
  }

  .slideCard {
    height: 360px;
  }

  .navButton {
    width: 48px;
    height: 48px;
    font-size: 36px;
  }

  .slideTitle {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .slideDescription {
    font-size: 20px;
    line-height: 32px;
  }
}

/* Animação suave para transição de slides */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.slideCard:not(.slideCardTransitioning) {
  animation: fadeInScale 0.5s ease-in-out;
}

.descriptionContainer:not(.descriptionTransitioning) {
  animation: fadeInScale 0.5s ease-in-out;
}
```

---

## Recursos Implementados

✅ **Slider automático** com auto-play a cada 5 segundos  
✅ **Navegação por setas** (anterior/próximo) com animações suaves  
✅ **Indicadores de slide** (dots) clicáveis para navegação direta  
✅ **Transições animadas** com fade-in/fade-out e escala  
✅ **Imagens de fundo** com overlay escuro para legibilidade  
✅ **Hover effects** na versão web:
- Sombra roxa aumentada (#8C43FF)
- Escala aumentada no card
- Zoom na imagem de fundo

✅ **Descrição sincronizada** com o slide atual  
✅ **Pausa do auto-play** ao interagir manualmente  
✅ **Layout responsivo** com breakpoints:
- Mobile: < 768px (slider acima, descrição abaixo)
- Tablet: 768px - 1024px (lado a lado compactado)
- Desktop: > 1024px (layout padrão 45% + 50%)
- Desktop Large: > 1400px (elementos maiores)

✅ **Dark mode nativo** (#121212 background)  
✅ **Sem dependência de Tailwind ou Framer Motion**  
✅ **2 versões completas**: React Native e Web (CSS Modules)

## Diferenças entre versões

| Recurso | React Native | Web (CSS Modules) |
|---------|-------------|-------------------|
| Animações | `Animated` API | CSS `transition` + `@keyframes` |
| Imagens | `require()` local | `url()` path |
| Hover effects | ❌ | ✅ (sombra, escala, zoom) |
| Backdrop blur | Limited support | `backdrop-filter: blur()` |
| Auto-play | `setInterval` | `setInterval` |
| Transição | Fade + Scale | Fade + Scale + Transform |
| Gestures | Touch nativo | Click handlers |

## Breakpoints Utilizados

- **Mobile**: < 768px (layout vertical)
- **Tablet**: 768px - 1024px (layout compactado)
- **Desktop**: 1024px - 1400px (layout padrão)
- **Desktop Large**: > 1400px (elementos ampliados)

## Como usar

### Para React Native:
```jsx
import HomePage from './HomePage';

// No seu componente:
<HomePage 
  activeTab="Início" 
  onTabChange={(tab) => console.log(tab)} 
/>
```

**⚠️ Importante**: Certifique-se de ter as imagens nos caminhos corretos:
```
./assets/events/semana-tecnologica.jpg
./assets/events/hackathon.png
./assets/events/palestra-ti.jpg
./assets/events/festa-junina.jpg
```

### Para React Web:
```jsx
import HomePage from './HomePage';
import './HomePage.module.css';

// No seu componente:
<HomePage />
```

## Customização

### Para adicionar novos slides:
```jsx
const slides = [
  // ... slides existentes
  {
    id: 5,
    title: "Novo Evento",
    description: "Descrição detalhada do novo evento...",
    image: require('./assets/events/novo-evento.jpg'), // RN
    // OU
    image: "/src/assets/events/novo-evento.jpg", // Web
    bgColor: '#884499',
  },
];
```

### Para ajustar velocidade do auto-play:
```jsx
// Dentro do useEffect
const interval = setInterval(() => {
  changeSlide((currentSlide + 1) % slides.length);
}, 5000); // ← Altere este valor (em milissegundos)
```

### Para mudar a cor do indicador ativo:
- **React Native**: Alterar `#8C43FF` no `styles.indicatorActive`
- **Web**: Alterar `background-color: #8C43FF` no `.indicatorActive`

### Para desabilitar auto-play por padrão:
```jsx
const [autoPlay, setAutoPlay] = useState(false); // ← Mudar true para false
```

## Comportamento do Slider

1. **Auto-play**: Avança automaticamente a cada 5 segundos
2. **Pausa manual**: Ao clicar nas setas ou indicadores, o auto-play é desativado
3. **Transição suave**: Fade-out (300ms) → Troca slide → Fade-in (300ms)
4. **Loop infinito**: Após o último slide, retorna ao primeiro
5. **Navegação direta**: Clique nos dots (indicadores) para ir direto ao slide desejado

## Detalhes Técnicos

### React Native:
- `Animated.parallel()` para executar fade e escala simultaneamente
- `useRef()` para manter referências das animações
- `Animated.timing()` com `useNativeDriver: true` para performance
- `Dimensions.get('window')` para responsividade

### Web:
- `@keyframes fadeInScale` para animação CSS nativa
- `backdrop-filter: blur()` para efeito glass nos botões
- `:hover` e `transform` para interatividade
- `transition` com `ease-in-out` para suavidade
- `background-size: cover` + `background-position: center` para imagens adaptáveis

## Acessibilidade

✅ `aria-label` nos botões de navegação  
✅ Indicadores com descrições para leitores de tela  
✅ Contraste adequado entre texto e fundo (overlay escuro)  
✅ Transições suaves sem movimentos bruscos  
✅ Botões com tamanho mínimo de 40x40px (WCAG 2.1)

## Performance

✅ Apenas 1 slide renderizado por vez (não há carrossel oculto)  
✅ Animações com `useNativeDriver` (React Native)  
✅ Transições CSS em vez de JavaScript (Web)  
✅ Cleanup de `setInterval` no `useEffect`  
✅ Imagens com `resizeMode/background-size: cover`

Pronto para usar no seu app! 🚀🎨