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
      <div className="flex-1 flex items-center justify-center dark:bg-[#121212] bg-[#f3e8ff]">
        <div className="text-center p-8">
          <Hash size={48} className="dark:text-gray-600 text-gray-400 mx-auto mb-4" />
          <p className="dark:text-gray-400 text-gray-600 text-lg font-medium mb-1">
            Selecione um curso para começar
          </p>
          <p className="dark:text-gray-500 text-gray-500 text-sm">
            Escolha um curso na barra lateral
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden dark:bg-[#121212] bg-[#f3e8ff]">
      {/* Course Header */}
      <div className="h-16 border-b dark:border-[#30363D] border-gray-200 px-6 flex items-center gap-3 flex-shrink-0 dark:bg-[#1E1E1E] bg-white shadow-sm">
        {/* Ícone do curso */}
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#8C43FF]">
          {getCourseIcon() ? (
            <span className="text-2xl">{getCourseIcon()}</span>
          ) : (
            <Hash className="h-7 w-7 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold dark:text-white text-gray-900 text-lg">
            {course.name}
          </h2>
          {course.description && (
            <p className="text-xs dark:text-gray-400 text-gray-600 truncate">
              {course.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-2xl dark:bg-[#0D1117] bg-gray-50">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium dark:text-gray-400 text-gray-600">{messages.length} mensagens</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-2xl dark:bg-[#1E1E1E] bg-white border dark:border-[#30363D] border-gray-200 shadow-sm">
              <div className="mb-3">
                <span className="text-5xl">💬</span>
              </div>
              <p className="dark:text-gray-300 text-gray-700 font-medium text-base mb-1">
                Nenhuma mensagem ainda
              </p>
              <p className="dark:text-gray-500 text-gray-500 text-sm">
                Seja o primeiro a enviar uma mensagem!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex gap-3 group hover:bg-gray-50 dark:hover:bg-[#1E1E1E]/50 p-2.5 rounded-2xl transition-colors">
              <button 
                onClick={() => onProfileClick({
                  name: message.userName,
                  email: message.userEmail,
                  photo: message.userPhoto
                })}
                className="flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#8C43FF] flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                  {message.userPhoto ? (
                    <img
                      src={message.userPhoto}
                      alt={message.userName}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-sm">
                      {message.userName?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <button
                    onClick={() => onProfileClick({
                      name: message.userName,
                      email: message.userEmail,
                      photo: message.userPhoto
                    })}
                    className="font-semibold text-sm dark:text-white text-gray-900 hover:text-[#8C43FF] transition-colors cursor-pointer"
                  >
                    {message.userName}
                  </button>
                  <span className="text-xs dark:text-gray-500 text-gray-500">
                    {message.createdAt
                      ? formatDistanceToNow(message.createdAt.toDate(), {
                          addSuffix: true,
                          locale: ptBR,
                        })
                      : "agora"}
                  </span>
                </div>
                <div className="dark:bg-[#0D1117] bg-gray-50 p-3 rounded-2xl border dark:border-[#30363D] border-gray-200">
                  <p className="text-sm dark:text-gray-300 text-gray-700 break-words whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-[#30363D] border-gray-200 flex-shrink-0 dark:bg-[#1E1E1E] bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Mensagem em ${course.name}`}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-3xl dark:bg-[#0D1117] bg-gray-50 dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 border dark:border-[#30363D] border-gray-200 focus:border-[#8C43FF] focus:outline-none focus:ring-2 focus:ring-[#8C43FF] transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="px-4 py-3 rounded-3xl bg-[#8C43FF] text-white hover:bg-[#9955FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[50px]"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs dark:text-gray-500 text-gray-500 mt-2 flex items-center gap-1.5">
          <span>Pressione</span>
          <kbd className="px-1.5 py-0.5 rounded-lg dark:bg-[#0D1117] bg-gray-100 font-mono text-xs dark:text-gray-400 text-gray-600 border dark:border-[#30363D] border-gray-200">Enter</kbd>
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
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9955ff;
        }
      `}</style>
    </div>
  )
}

export default ForumChatArea
