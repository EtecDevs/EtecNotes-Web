"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TabNavigation from "../../navigation/TabNavigation"
import EventsPage from "./EventsPage"

// Importar imagens
import semanaTecnologica from "../../../assets/events/semana-tecnologica.jpg"
import hackathon from "../../../assets/events/hackathon.png"
import palestra from "../../../assets/events/palestra-ti.jpg"
import festaJunina from "../../../assets/events/festa-junina.jpg"

// Dados dos slides
const slides = [
  {
    id: 1,
    title: "Semana Tecnológica",
    description: "A Semana Tecnológica da Etec é um evento anual que reúne palestras, workshops e exposições sobre as últimas tendências em tecnologia. Os alunos têm a oportunidade de conhecer profissionais da área, participar de competições e apresentar seus projetos inovadores para a comunidade.",
    image: semanaTecnologica,
    bgColor: "bg-[#58417d] dark:bg-[#6B32C3]",
    hoverColor: "hover:bg-[#9955FF]"
  },
  {
    id: 2,
    title: "Hackathon Etec",
    description: "O Hackathon da Etec é uma maratona de programação onde alunos formam equipes para desenvolver soluções tecnológicas inovadoras em 24 horas. É uma oportunidade única de colocar em prática os conhecimentos adquiridos e competir com colegas em um ambiente colaborativo e desafiador.",
    image: hackathon,
    bgColor: "bg-[#4a3a5f] dark:bg-[#5527A3]",
    hoverColor: "hover:bg-[#8844EE]"
  },
  {
    id: 3,
    title: "Palestras em TI",
    description: "Conheça as palestras e workshops ministrados por profissionais renomados da área de tecnologia. São oportunidades de aprendizado sobre carreira, novas tecnologias, metodologias ágeis e tendências do mercado de trabalho.",
    image: palestra,
    bgColor: "bg-[#664488] dark:bg-[#7B3FD7]",
    hoverColor: "hover:bg-[#AA66FF]"
  },
  {
    id: 4,
    title: "Eventos Culturais",
    description: "A Etec oferece diversos eventos culturais ao longo do ano, como festa junina, gincanas, apresentações artísticas e confraternizações. Esses eventos promovem a integração entre alunos, professores e a comunidade escolar.",
    image: festaJunina,
    bgColor: "bg-[#775599] dark:bg-[#9352EB]",
    hoverColor: "hover:bg-[#BB77FF]"
  }
]

const HomePage = ({ activeTab, onTabChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto avançar slides a cada 5 segundos
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const nextSlide = () => {
    setAutoPlay(false)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setAutoPlay(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setAutoPlay(false)
    setCurrentSlide(index)
  }

  return (
    <div className="flex flex-col h-full bg-[#f3e8ff] dark:bg-[#121212]">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold bg-[#58417d] dark:bg-[#58417d] bg-clip-text text-transparent mb-8">Início</h1>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {activeTab === "Eventos" ? (
          <EventsPage />
        ) : (
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Left Card - Slider */}
              <div className="w-full md:w-[45%] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className={`h-[320px] ${slides[currentSlide].bgColor} rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,67,255,0.6)] ${slides[currentSlide].hoverColor} cursor-pointer flex items-center justify-center overflow-hidden relative`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Imagem de fundo */}
                    {slides[currentSlide].image && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                      >
                        {/* Overlay escuro para legibilidade do texto */}
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    )}
                    
                  </motion.div>
                </AnimatePresence>

                {/* Botões de Navegação */}
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                  aria-label="Slide anterior"
                  whileHover={{ scale: 1.20 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                  aria-label="Próximo slide"
                  whileHover={{ scale: 1.20 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ChevronRight size={24} />
                </motion.button>

                {/* Indicadores */}
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-[#8C43FF]"
                          : "w-2 bg-gray-400 hover:bg-gray-500"
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Text - Descrição do Slide */}
              <div className="w-full md:w-[50%]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-4">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-700 text-lg leading-relaxed">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
