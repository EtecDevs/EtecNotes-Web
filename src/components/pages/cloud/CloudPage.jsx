"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2, Trash2, Copy, Music, Play, Pause, Volume2, GamepadIcon, Heart, Smile } from "lucide-react"

const CloudPage = () => {
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
    { id: 1, name: "Chuva Relaxante", duration: "30 min", type: "nature" },
    { id: 2, name: "Sons da Floresta", duration: "45 min", type: "nature" },
    { id: 3, name: "Meditação Guiada", duration: "15 min", type: "guided" },
    { id: 4, name: "Ondas do Mar", duration: "60 min", type: "nature" },
    { id: 5, name: "Música Instrumental", duration: "25 min", type: "music" },
  ]

  const miniGames = [
    { id: 1, name: "Respiração Consciente", description: "Exercício de respiração 4-7-8", icon: Heart },
    { id: 2, name: "Mindfulness", description: "Atenção plena por 5 minutos", icon: Smile },
    { id: 3, name: "Contagem Reversa", description: "Relaxamento progressivo", icon: GamepadIcon },
  ]

  const playMusic = (music) => {
    setCurrentMusic(music)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const startGame = (game) => {
    setCurrentGame(game)
  }

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <style jsx>{`
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
      `}</style>

      <div className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <div>
            <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-2">
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
          className="flex-1 min-h-0 dark:bg-[#1E1E1E]/80 bg-purple-100 backdrop-blur-md rounded-3xl shadow-lg border dark:border-[#333333] border-gray-300 flex flex-col overflow-hidden"
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium dark:text-white text-gray-800">{currentMusic.name}</h4>
                        <p className="text-sm dark:text-gray-400 text-gray-600">{currentMusic.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="p-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-full transition-colors"
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <Volume2 size={16} className="dark:text-gray-400 text-gray-600" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {musicOptions.map((music) => (
                    <button
                      key={music.id}
                      onClick={() => playMusic(music)}
                      className="p-4 dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white rounded-2xl transition-colors text-left"
                    >
                      <h4 className="font-medium mb-1">{music.name}</h4>
                      <p className="text-sm opacity-70">{music.duration}</p>
                    </button>
                  ))}
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