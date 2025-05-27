"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2, Trash2, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

const ChatPage = () => {
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

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Simulate IATEC AI response
  const generateIATECResponse = async (userMessage) => {
    // Simulate API delay
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

  const formatTime = (date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-2">IATEC AI</h1>
            <p className="dark:text-gray-400 text-gray-600">Assistente virtual inteligente da Etec</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#3D3D3D] transition-colors"
              title="Limpar conversa"
            >
              <Trash2 size={20} className="dark:text-gray-400 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <motion.div
          className="flex-1 dark:bg-[#1E1E1E]/80 bg-white backdrop-blur-md rounded-3xl shadow-lg border dark:border-[#333333] border-gray-200 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                              <button
                                className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                title="Útil"
                              >
                                <ThumbsUp size={12} className="opacity-70" />
                              </button>
                              <button
                                className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                title="Não útil"
                              >
                                <ThumbsDown size={12} className="opacity-70" />
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
          <div className="border-t dark:border-[#333333] border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem para a IATEC AI..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-2xl dark:bg-[#2D2D2D] bg-gray-100 dark:text-white text-gray-800 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-[#8C43FF] disabled:opacity-50"
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
        </motion.div>

        {/* Footer Info */}
        <div className="mt-4 text-center">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            IATEC AI é uma assistente virtual desenvolvida para auxiliar estudantes da Etec
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
