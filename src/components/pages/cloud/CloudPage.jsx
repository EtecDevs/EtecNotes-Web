"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2, Trash2, Copy, Music, Play, Pause, Volume2, VolumeX, Volume1, GamepadIcon, Heart, Smile, Timer } from "lucide-react"

const CloudPage = ({ onOpenPomodoro }) => {
  const [activeTab, setActiveTab] = useState("iatec")
  
  // Estados da IATEC
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Olá! Eu sou a IATEC AI, sua assistente virtual da Etec. Como posso ajudá-lo hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const prevMessagesLengthRef = useRef(messages.length)

  // Estados da Meditação
  const [currentMusic, setCurrentMusic] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentGame, setCurrentGame] = useState(null)
  const [volume, setVolume] = useState(70) // Volume de 0 a 100
  const [audioError, setAudioError] = useState(false) // Estado de erro do áudio
  const audioRef = useRef(null) // Referência para o elemento de áudio

  // Do not autofocus when navigating to the page to avoid scrolling the viewport.
  // The user can click the input to focus when ready.

  // Only auto-scroll to bottom when new messages are added (i.e. messages length increases).
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages])

  const generateIATECResponse = async (userMessage) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = [
      `Entendo sua pergunta sobre "${userMessage}". Como assistente da Etec, posso ajudá-lo com informações sobre cursos, horários, eventos e muito mais.`,
      `Baseado na sua consulta, posso fornecer informações específicas sobre a Etec. Você gostaria de saber mais sobre algum curso técnico em particular?`,
      `Essa é uma excelente pergunta! Na Etec, temos diversos recursos disponíveis. Posso ajudá-lo a encontrar informações sobre laboratórios, biblioteca, ou atividades extracurriculares.`,
      `Como IATEC AI, tenho acesso a informações atualizadas sobre a escola. Você precisa de ajuda com matrículas, calendário acadêmico ou orientação sobre projetos?`,
      `Vejo que você está interessado em "${userMessage}". Posso explicar mais sobre os programas técnicos, oportunidades de estágio ou eventos da Semana Tecnológica.`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateIATECResponse(input.trim())

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? { ...msg, content: response, isLoading: false } : msg)),
      )
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes.",
                isLoading: false,
              }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Olá! Eu sou a IATEC AI, sua assistente virtual da Etec. Como posso ajudá-lo hoje?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const musicOptions = [
    { 
      id: 1, 
      name: "Chuva Relaxante", 
      duration: "Loop contínuo", 
      type: "nature",
      // Som de chuva relaxante (domínio público)
      url: "https://www.soundjay.com/nature/rain-03.mp3"
    },
    { 
      id: 2, 
      name: "Ruído de Cachoreira", 
      duration: "Loop contínuo", 
      type: "nature",
      // Sons de pássaros e natureza
      url: "https://www.soundjay.com/nature/waterfall-1.mp3"
    },
    { 
      id: 3, 
      name: "Piano Suave", 
      duration: "Loop contínuo", 
      type: "music",
      // Piano relaxante
      url: "https://cdn.pixabay.com/download/audio/2025/09/05/audio_6bf25415fa.mp3?filename=soft-piano-inspiration-399920.mp3"
    },
    { 
      id: 4, 
      name: "Ondas do Oceano", 
      duration: "Loop contínuo", 
      type: "nature",
      // Som de ondas do mar
      url: "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3"
    },
    { 
      id: 5, 
      name: "Vento Suave", 
      duration: "Loop contínuo", 
      type: "nature",
      // Som de vento suave
      url: "https://www.soundjay.com/nature/sounds/wind-1.mp3"
    },
  ]

  const miniGames = [
    { id: 1, name: "Respiração Consciente", description: "Exercício de respiração 4-7-8", icon: Heart },
    { id: 2, name: "Mindfulness", description: "Atenção plena por 5 minutos", icon: Smile },
    { id: 3, name: "Técnica Pomodoro", description: "Ciclos de foco e descanso", icon: Timer },
  ]

  const playMusic = (music) => {
    // Pausar áudio anterior se existir
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    setAudioError(false) // Resetar erro ao trocar de música
    setCurrentMusic(music)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const toggleMute = () => {
    if (volume > 0) {
      // Salvar volume atual e mutar
      setVolume(0)
      if (audioRef.current) {
        audioRef.current.volume = 0
      }
    } else {
      // Restaurar para 70% ou último volume não-zero
      setVolume(70)
      if (audioRef.current) {
        audioRef.current.volume = 0.7
      }
    }
  }

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if (volume < 50) return Volume1
    return Volume2
  }

  const startGame = (game) => {
    if (game.id === 3) {
      // Pomodoro - abrir modal global
      if (onOpenPomodoro) {
        onOpenPomodoro()
      }
    } else {
      setCurrentGame(game)
    }
  }

  // Efeito para carregar e preparar o áudio quando música muda
  useEffect(() => {
    if (currentMusic && audioRef.current) {
      // Configurar volume
      audioRef.current.volume = volume / 100
      
      // Tentar carregar o áudio
      audioRef.current.load()
      
      // Se isPlaying for true, tentar tocar após carregar
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('⚠️ Não foi possível reproduzir o áudio:', err.message)
            setIsPlaying(false)
          })
        }
      }
    }
  }, [currentMusic])

  // Efeito para atualizar volume
  useEffect(() => {
    if (audioRef.current && currentMusic) {
      audioRef.current.volume = volume / 100
    }
  }, [volume, currentMusic])

  // Efeito para controlar play/pause
  useEffect(() => {
    if (audioRef.current && currentMusic) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('⚠️ Erro ao reproduzir:', err.message)
            setIsPlaying(false)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentMusic])

  return (
    <div className="flex flex-col h-full bg-[#f3e8ff] dark:bg-[#121212]">
  <style>{`
        .custom-scrollbar {
          --sb-size: 8px;
        }
        
        /* Tema escuro */
        .dark .custom-scrollbar {
          --sb-track-color: #232E33;
          --sb-thumb-color: #8c43ff;
        }
        
        /* Tema claro */
        .custom-scrollbar {
          --sb-track-color: #f1f5f9;
          --sb-thumb-color: #8c43ff;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: var(--sb-size);
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--sb-track-color);
          border-radius: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--sb-thumb-color);
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9955ff;
        }

        /* Para Firefox */
        @supports not selector(::-webkit-scrollbar) {
          .dark .custom-scrollbar {
            scrollbar-color: #8c43ff #232E33;
            scrollbar-width: thin;
          }
          
          .custom-scrollbar {
            scrollbar-color: #8c43ff #f1f5f9;
            scrollbar-width: thin;
          }
        }

        /* Estilos do slider de volume - Compacto */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8C43FF;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          background: #9955FF;
          transform: scale(1.3);
          box-shadow: 0 2px 6px rgba(140, 67, 255, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8C43FF;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          background: #9955FF;
          transform: scale(1.3);
          box-shadow: 0 2px 6px rgba(140, 67, 255, 0.4);
        }

        /* Ajuste do background dinâmico para dark mode */
        .dark .slider {
          background: linear-gradient(to right, #8C43FF 0%, #8C43FF var(--volume), #4b5563 var(--volume), #4b5563 100%) !important;
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <div>
            <h1 className="text-4xl font-bold bg-[#58417d] bg-clip-text text-transparent mb-2">
              {activeTab === "iatec" ? "IATEC AI" : "Meditação & Bem-estar"}
            </h1>
            <p className="dark:text-gray-400 text-gray-600">
              {activeTab === "iatec" 
                ? "Assistente virtual inteligente da Etec" 
                : "Relaxe e recarregue suas energias"}
            </p>
          </div>
          <div className="flex gap-2">
            {activeTab === "iatec" && (
              <button
                onClick={clearChat}
                className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#3D3D3D] transition-colors"
                title="Limpar conversa"
              >
                <Trash2 size={20} className="dark:text-gray-400 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 flex-shrink-0">
          <button
            onClick={() => setActiveTab("iatec")}
            className={`px-6 py-3 rounded-t-2xl font-medium transition-colors ${
              activeTab === "iatec"
                ? "bg-[#8C43FF] text-white"
                : "dark:bg-[#2D2D2D] bg-gray-200 dark:text-gray-300 text-gray-700 hover:bg-[#8C43FF]/20"
            }`}
          >
            IATEC AI
          </button>
          <button
            onClick={() => setActiveTab("meditation")}
            className={`px-6 py-3 rounded-t-2xl font-medium transition-colors ${
              activeTab === "meditation"
                ? "bg-[#8C43FF] text-white"
                : "dark:bg-[#2D2D2D] bg-gray-200 dark:text-gray-300 text-gray-700 hover:bg-[#8C43FF]/20"
            }`}
          >
            Meditação
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          className="flex-1 min-h-0 dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl shadow-lg border dark:border-[#333333] border-gray-300 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "iatec" ? (
            <>
              {/* Chat Messages */}
              <div className="h-[400px] overflow-y-auto p-6 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8C43FF] flex items-center justify-center">
                          <Bot size={16} className="text-white" />
                        </div>
                      )}

                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-[#8C43FF] text-white"
                            : "dark:bg-[#2D2D2D] bg-gray-100 dark:text-white text-gray-800"
                        }`}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-sm">IATEC AI está pensando...</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                              {message.role === "assistant" && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => copyMessage(message.content)}
                                    className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                    title="Copiar mensagem"
                                  >
                                    <Copy size={12} className="opacity-70" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {message.role === "user" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full dark:bg-[#2D2D2D] bg-gray-200 flex items-center justify-center">
                          <User size={16} className="dark:text-gray-400 text-gray-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex-shrink-0 border-t dark:border-[#333333] border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem para a IATEC AI..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-2xl dark:bg-[#2D2D2D] bg-[#d5bbff] dark:text-white text-gray-800 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-[#8C43FF] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 bg-[#8C43FF] hover:bg-[#9955FF] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-2xl transition-colors flex items-center gap-2"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </form>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "Quais cursos técnicos estão disponíveis?",
                    "Como funciona o processo de matrícula?",
                    "Informações sobre a Semana Tecnológica",
                    "Horários da biblioteca",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-1 text-xs rounded-full dark:bg-[#2D2D2D] bg-gray-100 dark:text-gray-300 text-gray-600 hover:bg-[#8C43FF] hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {/* Music Player */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-4 flex items-center gap-2">
                  <Music size={20} />
                  Músicas Relaxantes
                </h3>
                
                {currentMusic && (
                  <div className="dark:bg-[#2D2D2D] bg-gray-100 rounded-2xl p-4 mb-4">
                    {/* Elemento de áudio oculto */}
                    <audio
                      ref={audioRef}
                      src={currentMusic.url}
                      loop
                      preload="auto"
                      onError={(e) => {
                        console.error('❌ Erro ao carregar áudio:', e.target.error)
                        setAudioError(true)
                        setIsPlaying(false)
                      }}
                      onCanPlay={() => {
                        setAudioError(false)
                      }}
                      onEnded={() => setIsPlaying(false)}
                    />
                    
                    <div className="space-y-3">
                      {audioError && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mb-2">
                          <p className="text-xs text-red-600 dark:text-red-400">
                            ⚠️ Erro ao carregar o áudio. Tente outra música.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium dark:text-white text-gray-800">{currentMusic.name}</h4>
                          <p className="text-sm dark:text-gray-400 text-gray-600">{currentMusic.duration}</p>
                        </div>
                        <button
                          onClick={togglePlay}
                          disabled={audioError}
                          className={`p-3 rounded-full transition-colors ${
                            audioError 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-[#8C43FF] hover:bg-[#9955FF] text-white'
                          }`}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                      </div>
                      
                      {/* Controle de Volume - Compacto e Estilizado */}
                      <div className="flex items-center gap-2 bg-gray-200 dark:bg-[#3D3D3D] rounded-full px-3 py-2 w-fit mx-auto">
                        <button
                          onClick={toggleMute}
                          className="p-1.5 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors"
                          title={volume === 0 ? "Ativar som" : "Silenciar"}
                        >
                          {(() => {
                            const VolumeIcon = getVolumeIcon()
                            return <VolumeIcon size={16} className="dark:text-gray-300 text-gray-700" />
                          })()}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-24 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8C43FF 0%, #8C43FF ${volume}%, #d1d5db ${volume}%, #d1d5db 100%)`
                          }}
                        />
                        <span className="text-xs dark:text-gray-300 text-gray-700 w-8 text-center font-medium tabular-nums">
                          {volume}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {musicOptions.map((music) => {
                    const isActive = currentMusic?.id === music.id
                    return (
                      <button
                        key={music.id}
                        onClick={() => playMusic(music)}
                        className={`p-4 rounded-2xl transition-all text-left border-2 ${
                          isActive
                            ? 'bg-[#8C43FF] text-white border-[#8C43FF] shadow-lg'
                            : 'dark:bg-[#2D2D2D] bg-gray-100 border-transparent hover:bg-[#8C43FF] hover:text-white hover:border-[#8C43FF]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1">{music.name}</h4>
                            <p className="text-sm opacity-70">{music.duration}</p>
                          </div>
                          {isActive && isPlaying && (
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                              <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                              <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Mini Games */}
              <div>
                <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-4 flex items-center gap-2">
                  <GamepadIcon size={20} />
                  Exercícios de Relaxamento
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {miniGames.map((game) => {
                    const IconComponent = game.icon
                    return (
                      <button
                        key={game.id}
                        onClick={() => startGame(game)}
                        className="p-4 dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white rounded-2xl transition-colors text-left flex items-center gap-3"
                      >
                        <div className="p-2 dark:bg-[#3D3D3D] bg-gray-200 rounded-full">
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{game.name}</h4>
                          <p className="text-sm opacity-70">{game.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {currentGame && (
                  <div className="mt-6 p-6 dark:bg-[#2D2D2D] bg-gray-100 rounded-2xl">
                    <h4 className="text-lg font-medium dark:text-white text-gray-800 mb-4">
                      {currentGame.name}
                    </h4>
                    <p className="dark:text-gray-300 text-gray-600 mb-4">
                      {currentGame.description}
                    </p>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-[#8C43FF] mb-4">
                        4
                      </div>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        Inspire por 4 segundos
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-4 text-center flex-shrink-0">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            {activeTab === "iatec" 
              ? "IATEC AI é uma assistente virtual desenvolvida para auxiliar estudantes da Etec"
              : "Cuide do seu bem-estar mental e emocional"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CloudPage