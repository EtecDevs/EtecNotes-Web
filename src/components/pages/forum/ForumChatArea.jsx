"use client"

import { useState, useEffect, useRef } from "react"
import { db } from "../../../config/firebase"
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  addDoc,
  serverTimestamp 
} from "firebase/firestore"
import { Send, Hash, Smile } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

const ForumChatArea = ({ course, currentUser, onProfileClick }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)
  const messagesEndRef = useRef(null)
  const isFirstLoad = useRef(true) // Rastrear se é a primeira carga

  // 🎨 Mapeamento de ícones como fallback (caso o curso não tenha icon no Firestore)
  const courseIconsFallback = {
    "ds": "💻",
    "adm": "📊",
    "rh": "👥",
    "info": "🌐",
    "log": "📦",
    "contabilidade": "💰",
    "enfermagem": "🏥",
    "mecanica": "⚙️"
  }

  // Função para obter o ícone do curso
  const getCourseIcon = () => {
    // 1. Prioridade: ícone do banco de dados
    if (course?.icon) {
      return course.icon
    }
    // 2. Fallback: mapeamento local por ID
    if (course?.id && courseIconsFallback[course.id]) {
      return courseIconsFallback[course.id]
    }
    // 3. Fallback final: hashtag
    return null
  }

  // Buscar mensagens do curso selecionado
  useEffect(() => {
    if (!course) {
      setMessages([])
      isFirstLoad.current = true // Reset ao mudar de curso
      return
    }

    isFirstLoad.current = true // Reset ao mudar de curso
    const messagesRef = collection(db, "messages")
    const q = query(
      messagesRef,
      where("courseId", "==", course.id),
      orderBy("createdAt", "asc"),
      limit(100)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      
      setMessages(messagesData)
    })

    return () => unsubscribe()
  }, [course])

  // Auto scroll REMOVIDO - usuário controla o scroll manualmente
  // Scroll automático só acontece ao enviar uma nova mensagem (ver handleSendMessage)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !course || isLoading || !currentUser) return

    setIsLoading(true)
    try {
      await addDoc(collection(db, "messages"), {
        content: newMessage.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email?.split('@')[0] || "Anônimo",
        userPhoto: currentUser.photoURL || null,
        courseId: course.id,
        courseName: course.name,
        createdAt: serverTimestamp(),
      })

      setNewMessage("")
      
      // Scroll suave apenas quando o usuário envia uma mensagem
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:to-[#121212] bg-gradient-to-br from-[#f3e8ff] to-[#e8d5ff]">
        <div className="text-center p-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-[#8C43FF]/10 rounded-full animate-pulse" />
            </div>
            <Hash size={64} className="dark:text-gray-600 text-gray-400 mx-auto relative z-10" />
          </div>
          <p className="dark:text-gray-300 text-gray-700 text-xl font-semibold mb-2">
            Selecione um curso para começar
          </p>
          <p className="dark:text-gray-500 text-gray-500 text-sm">
            Escolha um curso na barra lateral esquerda
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:to-[#121212] bg-gradient-to-br from-[#f3e8ff] to-[#e8d5ff]">
      {/* Course Header com gradiente moderno */}
      <div className="h-20 border-b dark:border-gray-700/50 border-gray-300/50 px-6 flex items-center gap-4 flex-shrink-0 dark:bg-gradient-to-r dark:from-[#1a1a1a] dark:to-[#1E1E1E] bg-gradient-to-r from-white to-gray-50 shadow-lg backdrop-blur-lg">
        {/* Ícone do curso (emoji ou ícone padrão) */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] shadow-lg shadow-[#8C43FF]/30">
          {getCourseIcon() ? (
            <span className="text-3xl">{getCourseIcon()}</span>
          ) : (
            <Hash className="h-7 w-7 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-bold dark:text-white text-gray-900 text-xl tracking-tight">
            {course.name}
          </h2>
          {course.description && (
            <p className="text-sm dark:text-gray-400 text-gray-600 mt-0.5">
              {course.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium">{messages.length} mensagens</span>
        </div>
      </div>

      {/* Messages Area com scroll customizado */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-3xl dark:bg-[#1a1a1a]/50 bg-white/50 backdrop-blur-sm border dark:border-gray-700/50 border-gray-200">
              <div className="mb-4">
                <span className="text-6xl">;-;</span>
              </div>
              <p className="dark:text-gray-300 text-gray-700 font-semibold text-lg mb-2">
                Nenhuma mensagem ainda
              </p>
              <p className="dark:text-gray-500 text-gray-500 text-sm">
                Seja o primeiro a enviar uma mensagem!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex gap-4 group dark:hover:bg-white/5 hover:bg-black/5 p-3 rounded-2xl transition-all duration-200">
              <button 
                onClick={() => onProfileClick({
                  name: message.userName,
                  email: message.userEmail,
                  photo: message.userPhoto
                })}
                className="flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold cursor-pointer hover:ring-4 hover:ring-[#8C43FF]/30 transition-all hover:scale-110 shadow-lg shadow-[#8C43FF]/20">
                  {message.userPhoto ? (
                    <img
                      src={message.userPhoto}
                      alt={message.userName}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-base">
                      {message.userName?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <button
                    onClick={() => onProfileClick({
                      name: message.userName,
                      email: message.userEmail,
                      photo: message.userPhoto
                    })}
                    className="font-bold text-sm dark:text-white text-gray-900 hover:text-[#8C43FF] dark:hover:text-[#8C43FF] transition-colors cursor-pointer"
                  >
                    {message.userName}
                  </button>
                  <span className="text-xs dark:text-gray-500 text-gray-600 font-medium">
                    {message.createdAt
                      ? formatDistanceToNow(message.createdAt.toDate(), {
                          addSuffix: true,
                          locale: ptBR,
                        })
                      : "agora"}
                  </span>
                </div>
                <div className="dark:bg-[#252525]/70 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border dark:border-gray-700/30 border-gray-200/50 shadow-sm">
                  <p className="text-sm dark:text-gray-200 text-gray-800 break-words whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input modernizado - FIXO EMBAIXO */}
      <div className="p-6 border-t dark:border-gray-700/50 border-gray-300/50 flex-shrink-0 dark:bg-gradient-to-r dark:from-[#1a1a1a] dark:to-[#1E1E1E] bg-gradient-to-r from-white to-gray-50 backdrop-blur-lg">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Mensagem em ${course.name}`}
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-2xl dark:bg-[#252525] bg-white dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 border-2 border-transparent focus:border-[#8C43FF] focus:outline-none focus:ring-4 focus:ring-[#8C43FF]/20 transition-all disabled:opacity-50 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#8C43FF] to-[#6B32C3] text-white hover:shadow-lg hover:shadow-[#8C43FF]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center justify-center min-w-[60px] font-semibold"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs dark:text-gray-500 text-gray-600 mt-3 flex items-center gap-2">
          <span>💡 Pressione</span>
          <kbd className="px-2 py-1 rounded-lg dark:bg-[#252525] bg-gray-200 font-mono text-xs font-semibold dark:text-gray-300 text-gray-700 border dark:border-gray-700 border-gray-300 shadow-sm">Enter</kbd>
          <span>para enviar</span>
        </p>
      </div>

      {/* CSS para scrollbar customizada */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8C43FF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B32C3;
        }
      `}</style>
    </div>
  )
}

export default ForumChatArea
