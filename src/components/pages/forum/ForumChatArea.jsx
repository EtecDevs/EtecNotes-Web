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

  // Buscar mensagens do curso selecionado
  useEffect(() => {
    if (!course) {
      setMessages([])
      return
    }

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

  // Auto scroll para o final quando novas mensagens chegam
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
        <div className="text-center">
          <Hash size={48} className="dark:text-gray-600 text-gray-400 mx-auto mb-4" />
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            Selecione um curso para começar
          </p>
          <p className="dark:text-gray-500 text-gray-500 text-sm mt-2">
            Escolha um curso na barra lateral
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col dark:bg-[#121212] bg-[#f3e8ff]">
      {/* Course Header */}
      <div className="h-16 border-b dark:border-gray-700 border-gray-300 px-6 flex items-center gap-3 dark:bg-[#1E1E1E] bg-white shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#8C43FF]">
          <Hash className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold dark:text-white text-gray-900 text-lg">
            {course.name}
          </h2>
          {course.description && (
            <p className="text-xs dark:text-gray-400 text-gray-600">
              {course.description}
            </p>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="dark:text-gray-400 text-gray-600">
                Nenhuma mensagem ainda
              </p>
              <p className="dark:text-gray-500 text-gray-500 text-sm mt-1">
                Seja o primeiro a enviar uma mensagem!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex gap-3 group hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
              <button 
                onClick={() => onProfileClick({
                  name: message.userName,
                  email: message.userEmail,
                  photo: message.userPhoto
                })}
                className="flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-[#8C43FF] transition-all">
                  {message.userPhoto ? (
                    <img
                      src={message.userPhoto}
                      alt={message.userName}
                      className="w-full h-full rounded-full object-cover"
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
                    className="font-semibold text-sm dark:text-white text-gray-900 hover:underline cursor-pointer"
                  >
                    {message.userName}
                  </button>
                  <span className="text-xs dark:text-gray-500 text-gray-600">
                    {message.createdAt
                      ? formatDistanceToNow(message.createdAt.toDate(), {
                          addSuffix: true,
                          locale: ptBR,
                        })
                      : "agora"}
                  </span>
                </div>
                <p className="text-sm dark:text-gray-300 text-gray-700 break-words whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 border-gray-300 dark:bg-[#1E1E1E] bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Mensagem em ${course.name}`}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg dark:bg-[#2D2D2D] bg-gray-100 dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 border-2 border-transparent focus:border-[#8C43FF] focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="px-4 py-3 rounded-lg bg-[#8C43FF] text-white hover:bg-[#7A3DE6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[48px]"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs dark:text-gray-500 text-gray-600 mt-2">
          Pressione <kbd className="px-1 py-0.5 rounded dark:bg-[#2D2D2D] bg-gray-200 font-mono text-xs">Enter</kbd> para enviar
        </p>
      </div>
    </div>
  )
}

export default ForumChatArea
