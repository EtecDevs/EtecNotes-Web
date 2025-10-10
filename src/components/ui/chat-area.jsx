"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Hash } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ChatArea({ course, currentUser, currentProfile, onProfileClick }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)
  const supabase = createClient()

  // Fetch messages
  useEffect(() => {
    if (!course) return

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*, profiles(*)")
        .eq("course_id", course.id)
        .order("created_at", { ascending: true })
        .limit(100)

      if (data) {
        setMessages(data)
      }
    }

    fetchMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages:${course.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `course_id=eq.${course.id}`,
        },
        async (payload) => {
          // Fetch the profile for the new message
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", payload.new.user_id).single()

          if (profile) {
            setMessages((prev) => [...prev, { ...payload.new, profiles: profile }])
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [course])

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !course || isLoading) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("messages").insert({
        content: newMessage.trim(),
        user_id: currentUser.id,
        course_id: course.id,
      })

      if (error) throw error
      setNewMessage("")
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Selecione um curso</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Course Header */}
      <div className="h-14 border-b px-4 flex items-center gap-2 bg-background">
        <Hash className="h-5 w-5 text-muted-foreground" />
        <div>
          <h2 className="font-semibold">{course.name}</h2>
          <p className="text-xs text-muted-foreground">{course.description}</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3 group">
              <button onClick={() => onProfileClick(message.profiles)} className="flex-shrink-0">
                <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={message.profiles.avatar_url || undefined} />
                  <AvatarFallback>{message.profiles.display_name[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <button
                    onClick={() => onProfileClick(message.profiles)}
                    className="font-semibold text-sm hover:underline"
                  >
                    {message.profiles.display_name}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <p className="text-sm break-words">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Mensagem em ${course.name}`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
