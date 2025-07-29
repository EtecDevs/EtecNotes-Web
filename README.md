# 📰 EtecNotes

> Plataforma web moderna para notícias, eventos e recursos da ETEC.

## 🚀 Tecnologias

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **TypeScript** - Tipagem estática

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Imagens, logos e recursos estáticos
├── components/       # Componentes React
│   ├── pages/        # Páginas da aplicação
│   └── navigation/   # Componentes de navegação
├── contexts/         # React Contexts (Theme, etc.)
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── constants/       # Constantes da aplicação
├── styles/          # Arquivos de estilo globais
└── main.jsx         # Ponto de entrada da aplicação
```

## 🏃‍♂️ Como executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Funcionalidades

- ✅ **Sistema de Temas** (Claro/Escuro)
- ✅ **Navegação por Abas**
- ✅ **Responsividade Completa**
- ✅ **Página de Calendário**
- ✅ **Sistema de Chat**
- ✅ **Jornal ETEC**
- ✅ **Patch Notes**
- ✅ **Horários**

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Análise de código

## 📱 Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis e tablets
- Suporte a temas do sistema operacional

## 🎯 Próximas Melhorias

- [ ] Sistema de autenticação
- [ ] Notificações push
- [ ] Cache offline (PWA)
- [ ] API REST integration
- [ ] Testes automatizados
