# PatchNotesPage - Versão Mobile (React Native / App)

## Componente React sem Tailwind com CSS-in-JS

```jsx
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PatchNotesPage = ({ activeTab, onTabChange }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Início</Text>

        {/* Tab Navigation - Adaptar conforme seu sistema de navegação */}
        {/* <TabNavigation activeTab={activeTab} onTabChange={onTabChange} /> */}

        <View style={styles.cardsContainer}>
          {/* Left Card - Imagem de destaque */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Novas funcionalidades!</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/imagesGeneral/PatchNotes.png')}
                style={styles.featureImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Right List - Atualizações recentes */}
          <View style={styles.updatesList}>
            <Text style={styles.updatesTitle}>Atualizações Recentes</Text>
            <View style={styles.updateItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.updateText}>
                Novo estilo de personalização (Modo escuro)
              </Text>
            </View>
            <View style={styles.updateItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.updateText}>
                Redesign das Interfaces anteriores
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode
  },
  content: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: width < 768 ? 16 : 24,
    paddingVertical: width < 768 ? 20 : 40,
  },
  title: {
    fontSize: width < 768 ? 28 : 36,
    fontWeight: 'bold',
    color: '#8C43FF',
    marginBottom: width < 768 ? 20 : 32,
  },
  cardsContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: width < 768 ? 20 : 32,
    marginBottom: 40,
  },
  featureCard: {
    width: width < 768 ? '100%' : '45%',
    minHeight: 320,
    backgroundColor: '#58417d',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureImage: {
    width: '100%',
    maxHeight: 200,
    borderRadius: 12,
  },
  updatesList: {
    width: width < 768 ? '100%' : '50%',
    padding: 16,
  },
  updatesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bullet: {
    fontSize: 24,
    color: '#8C43FF',
    marginRight: 12,
    marginTop: -4,
  },
  updateText: {
    flex: 1,
    fontSize: 16,
    color: '#D1D1D1',
    lineHeight: 24,
  },
});

export default PatchNotesPage;
```

---

## Versão Web (React.js puro com CSS Modules)

### PatchNotesPage.jsx

```jsx
import React from 'react';
import styles from './PatchNotesPage.module.css';

const PatchNotesPage = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Início</h1>

        {/* Tab Navigation - integrar conforme necessário */}
        {/* <TabNavigation activeTab={activeTab} onTabChange={onTabChange} /> */}

        <div className={styles.cardsContainer}>
          {/* Card de destaque */}
          <div className={styles.featureCard}>
            <h2 className={styles.featureTitle}>Novas funcionalidades!</h2>
            <div className={styles.imageContainer}>
              <img
                src="/src/assets/imagesGeneral/PatchNotes.png"
                alt="Nova funcionalidade"
                className={styles.featureImage}
              />
            </div>
          </div>

          {/* Lista de atualizações */}
          <div className={styles.updatesList}>
            <h3 className={styles.updatesTitle}>Atualizações Recentes</h3>
            <ul className={styles.updatesItems}>
              <li className={styles.updateItem}>
                <span className={styles.bullet}>•</span>
                <span className={styles.updateText}>
                  Novo estilo de personalização (Modo escuro)
                </span>
              </li>
              <li className={styles.updateItem}>
                <span className={styles.bullet}>•</span>
                <span className={styles.updateText}>
                  Redesign das Interfaces anteriores
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchNotesPage;
```

### PatchNotesPage.module.css

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
}

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #8C43FF;
  margin-bottom: 32px;
}

.cardsContainer {
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-bottom: 40px;
}

.featureCard {
  width: 45%;
  min-height: 320px;
  background: linear-gradient(135deg, #58417d 0%, #6B32C3 100%);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featureCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(140, 67, 255, 0.3);
}

.featureTitle {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.imageContainer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featureImage {
  max-width: 100%;
  max-height: 200px;
  border-radius: 12px;
  object-fit: contain;
}

.updatesList {
  width: 50%;
  padding: 16px;
}

.updatesTitle {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
}

.updatesItems {
  list-style: none;
  padding: 0;
  margin: 0;
}

.updateItem {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.bullet {
  font-size: 24px;
  color: #8C43FF;
  margin-right: 12px;
  line-height: 1.5;
}

.updateText {
  flex: 1;
  font-size: 16px;
  color: #D1D1D1;
  line-height: 1.5;
}

/* ============================================
   RESPONSIVIDADE MOBILE (< 768px)
   ============================================ */
@media (max-width: 767px) {
  .content {
    padding: 20px 16px;
  }

  .title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .cardsContainer {
    flex-direction: column;
    gap: 20px;
  }

  .featureCard {
    width: 100%;
    min-height: 280px;
  }

  .featureTitle {
    font-size: 18px;
  }

  .featureImage {
    max-height: 160px;
  }

  .updatesList {
    width: 100%;
    padding: 0;
  }

  .updatesTitle {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .updateItem {
    margin-bottom: 12px;
  }

  .bullet {
    font-size: 20px;
    margin-right: 8px;
  }

  .updateText {
    font-size: 14px;
  }
}

/* Tablets e dispositivos pequenos (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content {
    padding: 32px 20px;
  }

  .title {
    font-size: 32px;
  }

  .cardsContainer {
    gap: 24px;
  }

  .featureCard {
    width: 48%;
  }

  .updatesList {
    width: 48%;
  }
}
```

---

## Versão com Styled Components (React.js)

```jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;

  @media (max-width: 767px) {
    padding: 20px 16px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #8C43FF;
  margin-bottom: 32px;

  @media (max-width: 767px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 24px;
  }
`;

const FeatureCard = styled.div`
  width: 45%;
  min-height: 320px;
  background: linear-gradient(135deg, #58417d 0%, #6B32C3 100%);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(140, 67, 255, 0.3);
  }

  @media (max-width: 767px) {
    width: 100%;
    min-height: 280px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 12px;
  object-fit: contain;

  @media (max-width: 767px) {
    max-height: 160px;
  }
`;

const UpdatesList = styled.div`
  width: 50%;
  padding: 16px;

  @media (max-width: 767px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
`;

const UpdatesTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const UpdateItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 767px) {
    margin-bottom: 12px;
  }
`;

const Bullet = styled.span`
  font-size: 24px;
  color: #8C43FF;
  margin-right: 12px;
  line-height: 1.5;

  @media (max-width: 767px) {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const UpdateText = styled.span`
  flex: 1;
  font-size: 16px;
  color: #D1D1D1;
  line-height: 1.5;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const PatchNotesPage = ({ activeTab, onTabChange }) => {
  return (
    <Container>
      <Content>
        <Title>Início</Title>

        {/* Tab Navigation */}
        {/* <TabNavigation activeTab={activeTab} onTabChange={onTabChange} /> */}

        <CardsContainer>
          <FeatureCard>
            <FeatureTitle>Novas funcionalidades!</FeatureTitle>
            <ImageContainer>
              <FeatureImage
                src="/src/assets/imagesGeneral/PatchNotes.png"
                alt="Nova funcionalidade"
              />
            </ImageContainer>
          </FeatureCard>

          <UpdatesList>
            <UpdatesTitle>Atualizações Recentes</UpdatesTitle>
            <UpdateItem>
              <Bullet>•</Bullet>
              <UpdateText>Novo estilo de personalização (Modo escuro)</UpdateText>
            </UpdateItem>
            <UpdateItem>
              <Bullet>•</Bullet>
              <UpdateText>Redesign das Interfaces anteriores</UpdateText>
            </UpdateItem>
          </UpdatesList>
        </CardsContainer>
      </Content>
    </Container>
  );
};

export default PatchNotesPage;
```

---

## Breakpoints utilizados

- **Mobile**: < 768px (celulares)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Recursos de responsividade

✅ Flexbox responsivo (column em mobile, row em desktop)  
✅ Tamanhos de fonte adaptativos  
✅ Espaçamentos otimizados por breakpoint  
✅ Imagens com `max-width: 100%` e `object-fit: contain`  
✅ Cards empilhados verticalmente em mobile  
✅ Hover effects (apenas desktop)  
✅ Suporte a React Native e Web

## Instruções de uso

1. **Para React Native**: Use a primeira versão com `StyleSheet`
2. **Para React Web (CSS Modules)**: Use a segunda versão com arquivo `.module.css`
3. **Para Styled Components**: Use a terceira versão

Escolha a que melhor se adequa à sua stack tecnológica!
