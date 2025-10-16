"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Loader2, Trash2, Copy, Music, Play, Pause, Volume2, VolumeX, Volume1, GamepadIcon, Heart, Smile, Timer, Mic, Image as ImageIcon, Settings } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const CloudPage = ({ onOpenPomodoro }) => {
  const [activeTab, setActiveTab] = useState("iatec")
  
  // Configuração do Gemini API
  const API_KEY = "AIzaSyCF2Fbxlumv1qC3PRH1oMsS0tM8jKctabM"
  
  // Inicialização do Gemini
  const [genAI, setGenAI] = useState(null)
  const [model, setModel] = useState(null)
  const [apiReady, setApiReady] = useState(false)
  
  // Estados da IATEC
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Olá! Eu sou a IAtec, sua assistente virtual oficial do EtecNotes. Como posso ajudá-lo hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [additionalContext, setAdditionalContext] = useState("") // Campo para alimentar a IA
  const [showContextDialog, setShowContextDialog] = useState(false) // Modal de configuração
  const [isRecording, setIsRecording] = useState(false) // Estado de gravação de voz
  const [selectedImage, setSelectedImage] = useState(null) // Imagem selecionada
  const [imagePreview, setImagePreview] = useState(null) // Preview da imagem
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const prevMessagesLengthRef = useRef(messages.length)
  const recognitionRef = useRef(null) // Referência para Speech Recognition
  const fileInputRef = useRef(null) // Referência para input de arquivo

  // Estados da Meditação
  const [currentMusic, setCurrentMusic] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentGame, setCurrentGame] = useState(null)
  const [volume, setVolume] = useState(70) // Volume de 0 a 100
  const [audioError, setAudioError] = useState(false) // Estado de erro do áudio
  const audioRef = useRef(null) // Referência para o elemento de áudio

  // Estados da Respiração Box Breathing
  const [breathingPhase, setBreathingPhase] = useState('inhale') // 'inhale', 'hold1', 'exhale', 'hold2'
  const [breathingCount, setBreathingCount] = useState(4)
  const [breathingActive, setBreathingActive] = useState(false)
  const breathingIntervalRef = useRef(null)

  // Do not autofocus when navigating to the page to avoid scrolling the viewport.
  // The user can click the input to focus when ready.

  // Carregar API do Gemini
  useEffect(() => {
    const loadGeminiAPI = async () => {
      try {
        const genAIInstance = new GoogleGenerativeAI(API_KEY)
        const modelInstance = genAIInstance.getGenerativeModel({ 
          model: "gemini-1.5-pro"
        })
        
        setGenAI(genAIInstance)
        setModel(modelInstance)
        setApiReady(true)
        console.log("✅ Gemini API carregada com sucesso!")
        console.log("📊 Estados:", { isLoading, showContextDialog, apiReady: true })
      } catch (error) {
        console.error("❌ Erro ao carregar Gemini API:", error)
        setApiReady(false)
      }
    }
    
    loadGeminiAPI()
  }, [])

  // Only auto-scroll to bottom when new messages are added (i.e. messages length increases).
  // Fixed: scroll apenas o container do chat, não a página inteira
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current && messagesEndRef.current) {
      // Scroll apenas dentro do container de mensagens
      const chatContainer = messagesEndRef.current.parentElement
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages])

  const generateIATECResponse = async (userMessage, imageData = null) => {
    try {
      // Verifica se a API está pronta
      if (!apiReady || !model) {
        throw new Error("API do Gemini ainda não foi carregada. Aguarde alguns segundos e tente novamente.")
      }

      // Contexto fixo sobre a Etec
      const etecInfo = `
Você é o assistente oficial da EtecNotes, chamado IAtec.

INFORMAÇÕES DA ETEC DE PERUÍBE:
- Horário de funcionamento: 7h às 22h
- Secretaria fecha aos domingos
- Aulas: Segunda a sexta-feira

PRÓXIMOS EVENTOS:
- Feira Tecnológica: 20 de outubro de 2025
- Entrega de notas: 28 de outubro de 2025
- Semana do TCC: 4 a 8 de novembro de 2025

${additionalContext ? `INFORMAÇÕES ADICIONAIS:\n${additionalContext}\n` : ''}

INSTRUÇÃO: Responda de forma clara, amigável e educacional. Seja sempre prestativo e forneça informações precisas sobre a Etec.
      `.trim()

      const fullPrompt = `${etecInfo}\n\nPERGUNTA DO ALUNO: ${userMessage}`

      console.log("📤 Enviando para Gemini:", userMessage)

      let result
      if (imageData) {
        // Envio com imagem
        const imagePart = {
          inlineData: {
            data: imageData.base64,
            mimeType: imageData.mimeType
          }
        }
        result = await model.generateContent([fullPrompt, imagePart])
      } else {
        // Envio apenas texto
        result = await model.generateContent(fullPrompt)
      }

      const response = await result.response
      const text = response.text()
      
      console.log("✅ Resposta recebida:", text.substring(0, 100) + "...")
      return text

    } catch (error) {
      console.error("❌ Erro ao conectar com o IAtec:", error)
      throw new Error("Erro ao conectar com o IAtec 😢")
    }
  }

  const handleSubmit = async (e, messageText = null) => {
    e?.preventDefault()
    const messageToSend = messageText || input.trim()
    if (!messageToSend && !selectedImage) return
    if (isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      content: messageToSend || "(Imagem enviada)",
      role: "user",
      timestamp: new Date(),
      image: imagePreview // Adiciona preview da imagem se existir
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
      // Prepara dados da imagem se existir
      let imageData = null
      if (selectedImage) {
        imageData = {
          base64: selectedImage.base64,
          mimeType: selectedImage.mimeType
        }
      }

      const response = await generateIATECResponse(messageToSend || "Analise esta imagem", imageData)

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? { ...msg, content: response, isLoading: false } : msg)),
      )
      
      // Limpa a imagem após enviar
      setSelectedImage(null)
      setImagePreview(null)
      
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: "Erro ao conectar com o IAtec 😢",
                isLoading: false,
              }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Função para iniciar gravação de voz
  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'pt-BR'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript
      setInput(voiceText)
      // Envia automaticamente após reconhecer
      setTimeout(() => {
        handleSubmit(null, voiceText)
      }, 100)
    }

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento de voz:', event.error)
      setIsRecording(false)
      if (event.error === 'no-speech') {
        alert('Nenhuma fala detectada. Tente novamente.')
      } else if (event.error === 'not-allowed') {
        alert('Permissão de microfone negada. Verifique as configurações do navegador.')
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  // Função para processar upload de imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (event) => {
      const base64String = event.target.result.split(',')[1]
      setSelectedImage({
        base64: base64String,
        mimeType: file.type
      })
      setImagePreview(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  // Função para remover imagem selecionada
  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Olá! Eu sou a IAtec, sua assistente virtual oficial do EtecNotes. Como posso ajudá-lo hoje?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    removeImage()
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
    { id: 1, name: "Box Breathing", description: "Técnica 4-4-4-4 para ansiedade", icon: Heart },
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
    } else if (game.id === 1) {
      // Respiração Consciente
      setCurrentGame(game)
      setBreathingActive(true)
      setBreathingPhase('inhale')
      setBreathingCount(4)
    } else {
      setCurrentGame(game)
    }
  }

  // Efeito para controlar a animação de respiração Box Breathing (4-4-4-4)
  useEffect(() => {
    if (breathingActive && currentGame?.id === 1) {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            // Mudar de fase no padrão Box Breathing
            setBreathingPhase(currentPhase => {
              if (currentPhase === 'inhale') {
                return 'hold1'
              } else if (currentPhase === 'hold1') {
                return 'exhale'
              } else if (currentPhase === 'exhale') {
                return 'hold2'
              } else {
                return 'inhale'
              }
            })
            // Box Breathing: todas as fases têm 4 segundos
            return 4
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current)
      }
    }
  }, [breathingActive, breathingPhase, currentGame])

  const stopBreathing = () => {
    setBreathingActive(false)
    setCurrentGame(null)
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current)
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
              <>
                <button
                  onClick={() => setShowContextDialog(true)}
                  className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white dark:hover:bg-[#8C43FF] transition-colors"
                  title="Alimentar IA com contexto"
                >
                  <Settings size={20} className="dark:text-gray-400 text-gray-600" />
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-full dark:bg-[#2D2D2D] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#3D3D3D] transition-colors"
                  title="Limpar conversa"
                >
                  <Trash2 size={20} className="dark:text-gray-400 text-gray-600" />
                </button>
              </>
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
              {/* Status da API */}
              {!apiReady && (
                <div className="p-3 bg-yellow-500/20 border-l-4 border-yellow-500 dark:text-yellow-200 text-yellow-800 text-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Carregando API do Gemini... Aguarde alguns segundos.</span>
                </div>
              )}
              
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
                            {message.image && (
                              <img 
                                src={message.image} 
                                alt="Imagem enviada" 
                                className="max-w-full h-auto rounded-2xl mb-2"
                              />
                            )}
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
                {/* Preview da imagem selecionada */}
                {imagePreview && (
                  <div className="mb-3 relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-20 w-20 object-cover rounded-2xl border-2 border-[#8C43FF]"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Remover imagem"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  {/* Botão de Configuração */}
                  <button
                    type="button"
                    onClick={() => setShowContextDialog(true)}
                    className="p-3 rounded-2xl dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white dark:text-gray-400 text-gray-600 transition-colors"
                    title="Configurar contexto da IA"
                  >
                    <Settings size={18} />
                  </button>

                  {/* Botão de Voz */}
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    disabled={isLoading || isRecording}
                    className={`p-3 rounded-2xl transition-colors ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white dark:text-gray-400 text-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={isRecording ? "Gravando..." : "Enviar por voz"}
                  >
                    <Mic size={18} />
                  </button>

                  {/* Botão de Imagem */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="p-3 rounded-2xl dark:bg-[#2D2D2D] bg-gray-100 hover:bg-[#8C43FF] hover:text-white dark:text-gray-400 text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Enviar imagem"
                  >
                    <ImageIcon size={18} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      console.log("✏️ Digitando:", e.target.value)
                      setInput(e.target.value)
                    }}
                    onClick={() => console.log("🖱️ Input clicado!")}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    placeholder="Digite sua mensagem para a IAtec..."
                    className="flex-1 px-4 py-3 rounded-2xl dark:bg-[#2D2D2D] bg-[#d5bbff] dark:text-white text-gray-800 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-[#8C43FF]"
                    autoComplete="off"
                    style={{
                      pointerEvents: 'auto',
                      userSelect: 'text',
                      cursor: 'text',
                      zIndex: 1
                    }}
                  />
                  <button
                    type="submit"
                    disabled={(!input.trim() && !selectedImage) || isLoading}
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
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 dark:bg-[#2D2D2D] bg-gray-100 rounded-2xl relative overflow-hidden"
                  >
                    {currentGame.id === 1 ? (
                      // Animação de Respiração Consciente
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-medium dark:text-white text-gray-800">
                            {currentGame.name}
                          </h4>
                          <button
                            onClick={stopBreathing}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-colors text-sm"
                          >
                            Parar
                          </button>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-12">
                          {/* Círculo de Respiração Animado */}
                          <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Círculo externo decorativo */}
                            <motion.div
                              className="absolute w-full h-full rounded-full border-4 border-[#8C43FF]/20"
                              animate={{
                                scale: breathingPhase === 'inhale' || breathingPhase === 'exhale' ? [1, 1.2, 1] : 1.2,
                              }}
                              transition={{
                                duration: 4,
                                ease: "easeInOut",
                                repeat: 0,
                              }}
                            />
                            
                            {/* Círculo principal animado */}
                            <motion.div
                              className="absolute rounded-full bg-gradient-to-br from-[#8C43FF] to-[#CCA9DD] shadow-2xl"
                              animate={{
                                scale: breathingPhase === 'inhale' ? 1.5 : 
                                       (breathingPhase === 'hold1' || breathingPhase === 'hold2') ? 1.5 : 0.8,
                                opacity: (breathingPhase === 'hold1' || breathingPhase === 'hold2') ? [1, 0.8, 1] : 1,
                              }}
                              transition={{
                                duration: 4,
                                ease: "easeInOut",
                              }}
                              style={{
                                width: '180px',
                                height: '180px',
                                boxShadow: '0 0 60px rgba(140, 67, 255, 0.6)',
                              }}
                            />
                            
                            {/* Partículas ao redor */}
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full bg-[#8C43FF]"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transformOrigin: '0 0',
                                }}
                                animate={{
                                  x: breathingPhase === 'inhale' ? 
                                    Math.cos((i * Math.PI * 2) / 8) * 140 : 
                                    Math.cos((i * Math.PI * 2) / 8) * 80,
                                  y: breathingPhase === 'inhale' ? 
                                    Math.sin((i * Math.PI * 2) / 8) * 140 : 
                                    Math.sin((i * Math.PI * 2) / 8) * 80,
                                  scale: (breathingPhase === 'hold1' || breathingPhase === 'hold2') ? [1, 1.5, 1] : 1,
                                  opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                  duration: 4,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                            
                            {/* Texto central */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                              <motion.div
                                key={breathingCount}
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-7xl font-bold text-white drop-shadow-lg"
                              >
                                {breathingCount}
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Instrução */}
                          <motion.div
                            key={breathingPhase}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 text-center"
                          >
                            <p className="text-2xl font-semibold dark:text-white text-gray-800 mb-2">
                              {breathingPhase === 'inhale' && '🌬️ Inspire profundamente'}
                              {(breathingPhase === 'hold1' || breathingPhase === 'hold2') && '⏸️ Segure a respiração'}
                              {breathingPhase === 'exhale' && '😮‍💨 Expire lentamente'}
                            </p>
                            <p className="text-sm dark:text-gray-400 text-gray-600">
                              Técnica Box Breathing (4-4-4-4) para ansiedade
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      // Outros exercícios
                      <div>
                        <h4 className="text-lg font-medium dark:text-white text-gray-800 mb-4">
                          {currentGame.name}
                        </h4>
                        <p className="dark:text-gray-300 text-gray-600 mb-4">
                          {currentGame.description}
                        </p>
                        <div className="text-center">
                          <div className="text-6xl font-bold text-[#8C43FF] mb-4">
                            ✨
                          </div>
                          <p className="text-sm dark:text-gray-400 text-gray-600">
                            Exercício em desenvolvimento
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-4 text-center flex-shrink-0">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            {activeTab === "iatec" 
              ? "IAtec é uma assistente virtual desenvolvida para auxiliar estudantes da Etec"
              : "Cuide do seu bem-estar mental e emocional"}
          </p>
        </div>
      </div>

      {/* Modal de Configuração de Contexto */}
      {showContextDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 max-w-2xl w-full shadow-2xl border dark:border-[#333333] border-gray-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold dark:text-white text-gray-800 flex items-center gap-2">
                <Settings size={24} className="text-[#8C43FF]" />
                Alimentar a IA com Contexto
              </h2>
              <button
                onClick={() => setShowContextDialog(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2D2D2D] transition-colors"
              >
                <Trash2 size={20} className="dark:text-gray-400 text-gray-600" />
              </button>
            </div>

            <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
              Digite informações importantes para personalizar as respostas da IAtec. 
              Exemplos: avisos de professores, datas de provas, eventos especiais, etc.
            </p>

            <textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Exemplos:&#10;- Professor de biologia pediu resumo sobre genética&#10;- Prova de física na sexta-feira&#10;- Reunião de pais dia 22&#10;- Prazo de entrega do TCC: 15 de novembro"
              className="w-full h-64 px-4 py-3 rounded-2xl dark:bg-[#2D2D2D] bg-gray-100 dark:text-white text-gray-800 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-[#8C43FF] resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setAdditionalContext("")
                }}
                className="flex-1 px-4 py-3 rounded-2xl dark:bg-[#2D2D2D] bg-gray-200 dark:text-white text-gray-800 hover:bg-gray-300 dark:hover:bg-[#3D3D3D] transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={() => setShowContextDialog(false)}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#8C43FF] text-white hover:bg-[#9955FF] transition-colors"
              >
                Salvar
              </button>
            </div>

            <div className="mt-4 p-4 rounded-2xl dark:bg-[#2D2D2D] bg-gray-100">
              <p className="text-xs dark:text-gray-400 text-gray-600">
                💡 <strong>Dica:</strong> Essas informações serão enviadas junto com todas as suas perguntas, 
                ajudando a IAtec a fornecer respostas mais precisas e contextualizadas.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CloudPage