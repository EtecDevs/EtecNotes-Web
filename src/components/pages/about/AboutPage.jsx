"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Target,
  Lightbulb,
  Code,
  Calendar,
  FileText,
  Github,
  Linkedin,
  Mail,
  Star,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronDown,
} from "lucide-react"

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Dados dos integrantes da equipe
  const teamMembers = [
      {
        name: "Gustavo Silva",
        role: "Full Stack Developer & Project Lead",
        image: "/src/assets/EtecNotesTeam/GustavoSilva.jpeg",
        description:
          "Especialista em React e Node.js, responsável pela arquitetura do sistema e liderança técnica do projeto.",
        skills: ["React", "Node.js", "TypeScript", "Firebase"],
        social: {
          github: "https://github.com/DevGusta5",
          linkedin: "https://linkedin.com/in/danie",
          email: "gusta.gu.112007.55@gmail.com",
        },
      },
      {
        name: "Daniel Pereira",
        role: "Full Stack Developer & Designer",
        image: "/src/assets/EtecNotesTeam/Daniel.jpeg",
        description:
          "Programador full stack com paixão por design, focado em criar soluções web eficientes e visualmente atraentes.",
        skills: ["React", "Firebase", "Figma", "Node.js", "JavaScript", "Trello"],
        social: {
          github: "https://github.com/zKingDragon",
          linkedin: "https://linkedin.com/in/ana",
          email: "daniel10.fine@gmail.com",
        },
      },
      {
        name: "Pedro Cruz",
        role: "Documentation & DevOps",
        image: "/src/assets/EtecNotesTeam/PedroCruz.jpeg",
        description: "Documentador do projeto, focado em garantir que todas as funcionalidades sejam bem documentadas e compreendidas.",
        skills: ["Word", "Dia"],
        social: {
          github: "https://github.com/Pedro-Crouss",
          linkedin: "https://linkedin.com/in/carlos",
          email: "pedro.a17009@gmail.com",
        },
      },
      {
        name: "Gustavo Paes",
        role: "Documentation Lead",
        image: "/src/assets/EtecNotesTeam/GustavoPaes.jpeg",
        description: "Principal documentador do projeto, garantindo clareza e acessibilidade nas informações técnicas.",
        skills: ["Word, Trello"],
        social: {
          github: "https://github.com/GustavooRPaes",
          linkedin: "https://linkedin.com/in/maria",
          email: "Gustavo.rodrigues.paes12@gmail.com",
        },
      },
      {
        name: "Maykon Sullyvan",
        role: "Design & Content Creator",
        image: "/src/assets/EtecNotesTeam/Maykon.jpeg",
        description: "Designer gráfico e criador de conteúdo, responsável pela identidade visual do EtecNotes e de nossas redes sociais.",
        skills: ["Figma", "Design Systems"],
        social: {
          github: "https://github.com/SucoDeCaju1239",
          linkedin: "https://linkedin.com/in/maria",
          email: "maykonsullyvan12@gmail.com",
        },
      },
      {
        name: "Leandro Silva",
        role: "AI Developer & Documentation",
        image: "/src/assets/EtecNotesTeam/Leandro.jpeg",
        description: "Responsável pelo desenvolvimento da IATEC AI, machine learning e análise de dados educacionais.",
        skills: ["Dia", "Word", "AI"],
        social: {
          github: "https://github.com/maria",
          linkedin: "https://linkedin.com/in/maria",
          email: "maria@etecnotes.com",
        },
      },
      {
        name: "Pedro Victor",
        role: "Support",
        image: "/src/assets/EtecNotesTeam/PedroVictor.jpg",
        description: "Suporte e documentação, auxiliando na criação de tutoriais para os usuários.",
        skills: ["Word"],
        social: {
          github: "https://github.com/maria",
          linkedin: "https://linkedin.com/in/maria",
          email: "maria@etecnotes.com",
        },
      },
    ]
  
    // Funcionalidades principais
    const features = [
      {
        icon: Calendar,
        title: "Calendário Inteligente",
        description:
          "Organize seu calendário acadêmico com provas, tarefas e apresentações registradas diretamente pelos professores.",
        color: "bg-gradient-to-r from-[#CCA9DD] to-[#CCA9DD]",
        image: "/src/assets/features/calendario.png",
      },
      {
        icon: Brain,
        title: "IATEC AI",
        description:
          "Assistente virtual inteligente que responde dúvidas acadêmicas, ajuda com estudos e oferece suporte 24/7.",
        color: "bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD]",
        image: "/src/assets/features/iatec.png",
      },
      {
        icon: FileText,
        title: "Jornal Etec Digital",
        description: "Fique por dentro das últimas notícias, eventos e oportunidades da sua escola em tempo real.",
        color: "bg-gradient-to-r from-[#CCA9DD] to-[#CCA9DD]",
        image: "/src/assets/features/jornal.png",
      },
      {
        icon: Users,
        title: "Chat",
        description: "Conecte-se com professores, tire dúvidas, e contate a secretaria.",
        color: "bg-gradient-to-r from-[#CCA9DD] to-[#CCA9DD]",
        image: "/src/assets/features/calendario.png",
      },
    ]
  
    // Processo de criação
    const creationProcess = [
      {
        step: "01",
        title: "Pesquisa & Descoberta",
        description:
          "Realizamos entrevistas com mais de 200 estudantes da Etec para identificar suas principais dificuldades e necessidades no ambiente acadêmico.",
        icon: Target,
        details: ["Entrevistas com estudantes", "Análise de concorrentes", "Mapeamento de jornada do usuário"],
      },
      {
        step: "02",
        title: "Design & Prototipação",
        description:
          "Criamos wireframes, protótipos interativos e testamos diferentes abordagens de interface focando na experiência do usuário.",
        icon: Lightbulb,
        details: ["Wireframes e mockups", "Prototipagem interativa", "Testes de usabilidade"],
      },
      {
        step: "03",
        title: "Desenvolvimento Ágil",
        description:
          "Implementamos a solução usando metodologias ágeis, tecnologias modernas e práticas de desenvolvimento colaborativo.",
        icon: Code,
        details: ["Desenvolvimento em sprints", "Code review contínuo", "Testes automatizados"],
      },
      {
        step: "04",
        title: "Testes & Otimização",
        description:
          "Realizamos testes extensivos, coletamos feedback dos usuários e implementamos melhorias baseadas em dados reais.",
        icon: Zap,
        details: ["Testes beta com usuários", "Análise de métricas", "Otimização contínua"],
      },
    ]

  const stats = [
    { number: "1,200+", label: "Estudantes Ativos", icon: Users },
    { number: "25", label: "Escolas Parceiras", icon: BookOpen },
    { number: "98%", label: "Satisfação", icon: Star },
    { number: "24/7", label: "Suporte IA", icon: Brain },
  ]

  const testimonials = [
    {
      name: "João Silva",
      role: "Estudante - 3º Informática",
      content: "O EtecNotes revolucionou minha organização acadêmica. Nunca mais perdi uma prova ou entrega!",
      avatar: "/placeholder.svg?height=60&width=60&text=JS",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Estudante - 2º Administração",
      content: "A IATEC AI me ajuda muito com dúvidas de estudo. É como ter um tutor pessoal disponível sempre.",
      avatar: "/placeholder.svg?height=60&width=60&text=MS",
      rating: 5,
    },
    {
      name: "Pedro Costa",
      role: "Estudante - 1º Mecânica",
      content: "Interface super intuitiva e funcionalidades que realmente fazem diferença no dia a dia.",
      avatar: "/placeholder.svg?height=60&width=60&text=PC",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f3e8ff] dark:bg-[#121212] overflow-x-hidden">
      {/* Hero Section */}
      <section id="início" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#58417d]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CCA9DD]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#CCA9DD]/10 to-[#CCA9DD]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 dark:bg-[#1A1A1A]/50 bg-gray-100/50 backdrop-blur-sm rounded-full border dark:border-gray-700 border-gray-200 mb-6">
              <Zap size={16} className="text-[#8C43FF]" />
              <span className="text-sm dark:text-gray-300 text-gray-600">Plataforma educacional do futuro</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-800 mb-6 leading-tight">
              Sobre o
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8C43FF] via-[#CCA9DD] to-[#8C43FF] animate-pulse">
                EtecNotes
              </span>
            </h1>

            <p className="text-xl md:text-2xl dark:text-gray-300 text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conheça a história, a equipe e a visão por trás da plataforma que está transformando a experiência educacional dos estudantes da Etec.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon size={24} className="text-[#8C43FF] mr-2" />
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD]">
                    {stat.number}
                  </div>
                </div>
                <div className="text-sm dark:text-gray-400 text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm dark:text-gray-400 text-gray-600 mb-2">Descubra mais</span>
              <ChevronDown size={24} className="text-[#8C43FF] animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Project Section */}
      <section id="sobre" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 mb-6">
                A ideia por trás do projeto
              </h2>
              <div className="space-y-6">
                <p className="text-lg dark:text-gray-300 text-gray-600 leading-relaxed">
                  O EtecNotes nasceu da observação direta das dificuldades enfrentadas pelos estudantes das Escolas
                  Técnicas Estaduais. Percebemos que havia uma lacuna entre as ferramentas disponíveis e as necessidades
                  específicas do ensino técnico.
                </p>
                <p className="text-lg dark:text-gray-300 text-gray-600 leading-relaxed">
                  Nossa missão é democratizar o acesso a tecnologias educacionais de qualidade, criando uma plataforma
                  que não apenas organiza a vida acadêmica, mas também potencializa o aprendizado através da
                  inteligência artificial e colaboração.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      icon: Target,
                      title: "Foco no Usuário",
                      desc: "Desenvolvido com base em feedback real de estudantes",
                    },
                    { icon: Zap, title: "Tecnologia Avançada", desc: "IA e automação para simplificar tarefas" },
                    { icon: Shield, title: "Segurança", desc: "Proteção total dos dados acadêmicos" },
                    { icon: Globe, title: "Acessibilidade", desc: "Disponível para todos, em qualquer dispositivo" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-[#58417d]/20 rounded-lg">
                        <item.icon size={20} className="text-[#8C43FF]" />
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-sm dark:text-gray-400 text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="src/assets/etecNotesTeam/fotoTerceiraPrevia.jpg"
                  alt="Visão do Projeto"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8C43FF]/20 to-transparent rounded-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 dark:bg-[#0F0F0F] bg-[#f8f4ff]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 mb-6">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              Descubra as ferramentas inteligentes que tornam o EtecNotes a escolha ideal para sua jornada acadêmica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeFeature === index
                      ? "dark:bg-[#1A1A1A] bg-white shadow-xl scale-105"
                      : "dark:bg-[#151515] bg-gray-100 hover:shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${feature.color}`}>
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-2">{feature.title}</h3>
                      <p className="dark:text-gray-400 text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Preview */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative dark:bg-[#1A1A1A] bg-white rounded-3xl p-8 shadow-2xl">
                <img
                  src={features[activeFeature].image || "/placeholder.svg"}
                  alt={features[activeFeature].title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8C43FF]/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{features[activeFeature].title}</h4>
                  <p className="text-gray-200">{features[activeFeature].description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creation Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 mb-6">
              Nosso processo de criação
            </h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              Conheça as etapas metodológicas que seguimos para desenvolver uma solução que realmente atende às
              necessidades dos estudantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creationProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {process.step}
                    </div>
                    <process.icon size={28} className="text-[#8C43FF]" />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-3">{process.title}</h3>
                  <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-4">{process.description}</p>

                  <div className="space-y-2">
                    {process.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#4CAF50]" />
                        <span className="text-sm dark:text-gray-300 text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Line */}
                {index < creationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] transform -translate-y-1/2 z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-20 dark:bg-[#0F0F0F] bg-[#f8f4ff]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 mb-6">Conheça nossa equipe</h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              Desenvolvedores apaixonados por educação e tecnologia que tornaram o EtecNotes realidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                  <div className="relative mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl mx-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8C43FF]/20 to-transparent rounded-2xl"></div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-[#8C43FF] font-medium mb-3 text-sm">{member.role}</p>
                    <p className="dark:text-gray-400 text-gray-600 text-xs leading-relaxed mb-4">
                      {member.description}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs dark:bg-[#2D2D2D] bg-gray-100 dark:text-gray-300 text-gray-600 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.github}
                      className="p-2 dark:bg-[#2D2D2D] bg-gray-100 rounded-lg hover:bg-[#58417d] hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="p-2 dark:bg-[#2D2D2D] bg-gray-100 rounded-lg hover:bg-[#58417d] hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 dark:bg-[#2D2D2D] bg-gray-100 rounded-lg hover:bg-[#58417d] hover:text-white transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-800 mb-6">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              Depoimentos reais de estudantes que transformaram sua experiência acadêmica com o EtecNotes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="dark:text-gray-300 text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold dark:text-white text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm dark:text-gray-400 text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage