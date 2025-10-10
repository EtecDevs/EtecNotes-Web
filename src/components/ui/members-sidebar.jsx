"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function MembersSidebar({ courseId, selectedProfile, onClose, onProfileClick }) {
  const [members, setMembers] = useState([])
  const supabase = createClient()

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase.from("profiles").select("*, online_status(*)").order("display_name")

      if (data) {
        setMembers(data)
      }
    }

    fetchMembers()

    // Subscribe to online status changes
    const channel = supabase
      .channel("online-status")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "online_status",
        },
        () => {
          fetchMembers()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [courseId])

  const onlineMembers = members.filter((m) => m.online_status?.is_online)
  const offlineMembers = members.filter((m) => !m.online_status?.is_online)

  return (
    <>
      <div className="w-60 border-l bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Membros</h3>
            <Badge variant="secondary" className="ml-auto">
              {members.length}
            </Badge>
          </div>
        </div>

        {/* Members List */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-4">
            {/* Online Members */}
            {onlineMembers.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">ONLINE — {onlineMembers.length}</p>
                <div className="space-y-1">
                  {onlineMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar_url || undefined} />
                          <AvatarFallback>{member.display_name[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      </div>
                      <span className="text-sm font-medium truncate">{member.display_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Members */}
            {offlineMembers.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">
                  OFFLINE — {offlineMembers.length}
                </p>
                <div className="space-y-1">
                  {offlineMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors opacity-60"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar_url || undefined} />
                        <AvatarFallback>{member.display_name[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">{member.display_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Profile Modal */}
      <Dialog open={!!selectedProfile} onOpenChange={() => onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil do Usuário</DialogTitle>
          </DialogHeader>
          {selectedProfile && (
            <div className="flex flex-col items-center gap-4 py-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={selectedProfile.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">{selectedProfile.display_name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">{selectedProfile.display_name}</h3>
                {selectedProfile.bio && <p className="text-sm text-muted-foreground mt-2">{selectedProfile.bio}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
